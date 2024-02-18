var ChartView = {
    variables: {
        BindChartListUrl: "/Common/BindMastersDetails?ServiceName=COMMON_PERMISSIONWISE_CHARTLIST_GET",//&sidx=ChartDISPLAYORDER&sord=asc",
        BindChartFieldUrl: "/Common/BindMastersDetails?ServiceName=COMMON_CHARTFILTERFIELD_GET",
        SaveFilterCriteriaUrl: "/Common/OpeartionsOnMaster?ServiceName=COMMON_CHART_FILTERCRITERIA_CRUDOPERATIONS",
        FilterCriteriaUrl: "/Common/BindMastersDetails?ServiceName=COMMON_CHART_FILTERCRITERIA_GET",
        BindChartDataUrl: "/Common/BindMastersDetails?ServiceName=COMMON_CHARTDATA_GET",
        SaveDashboardSettingUrl: "/Common/OpeartionsOnMaster?ServiceName=COMMON_USER_CHARTVIEWERSETTING_CRUD",
        PageIndex: 1,
        GridFilterCriteriaObj: null,
        FilterOper: 'Add',
        Filteraddedit: "added",
        FilterMasterid: "",
        FilterCriteriaCount: 0,
    },
    AddNewChart: function () {        
        $("#PanelAllChartList").html('');        
        var myfilter = { groupOp: "AND", rules: [] };
        myfilter.rules.push({ field: "USEFOR", op: "eq", data: $("#hdnPageType").val() });
        $.ajax({
            url: getDomain() + ChartView.variables.BindChartListUrl + "&myfilters=" + JSON.stringify(myfilter),
            async: false,
            cache: false,
            type: 'POST',
            success: function (data) {                
                if ($(data).find('RESPONSECODE').text() == "0") {
                    $("#panelChartResult").hide();
                    $("#btnAddNewWidgetSubmit").show();
                    $("#PanelAllChartList").show();
                    var JsonObject = xml2json.parser(data);
                    if (JsonObject.serviceresponse.detailslist != undefined) {
                        $("#PanelAllChartList").append($("#JSChartList").render(JsonObject.serviceresponse.detailslist.details));
                    }
                    else {
                        $("#btnAddNewChartSubmit").hide();
                        $("#PanelAllChartList").hide();
                    }
                }
                else {
                    notificationMessage('Error', $(data).find('RESPONSECODE').text(), 'error');
                }
            }
        });
    },
    CharttriggerId: function (ChartId, IsFilterField, IsDefaultFilter, ChartTitle, ChartType, IsMultiValuedChart) {
        $("#hdnCriteriaSummaryId").val("");
        $("#PanelAllChartList").hide();
        $("#panelChartResult").show();
        $("#hdnChartId").val(ChartId);
        $("#hdnIsFilterField").val(IsFilterField);
        $("#hdnIsMultiValuedChart").val(IsMultiValuedChart);
        $("#lblChartName").html(ChartTitle);      
        ChartView.BindChartTypeRadio(ChartType, 'divChartType', 'Radio');

        if (IsFilterField == 1 && IsDefaultFilter == 0) {
            $("#DivGenerateNewChart").hide();
            $("#btnFilterListCancel").hide();
            $('#ChkDisplayonDashboard').prop('checked', true);

            $("#txtChartWidthXval").val(12);
            $("#txtChartWidthYval").val(6);

            ChartView.BindChartFilterUI(ChartId, 1, 0, '');
            $("#frmChartResult").show();
            $("#FilterList").hide();
        }
        else if (IsDefaultFilter == 1 && (IsFilterField == 1 || IsFilterField == 0)) {            
            $("#DivGenerateNewChart").show();
            $("#frmChartResult").hide();
            $("#btnFilterListCancel").show();
            $("#FilterList").show();
            ChartView.initializeDefaultFilterJqgrid();
            $("#tableDefaultSettingList").trigger("reloadGrid", [{ current: true }]);
        }
        else if (IsDefaultFilter == 0 && IsFilterField == 0) {
            $("#frmChartResult").validate().resetForm();
            $('#ChkDisplayonDashboard').prop('checked', true);
            $("#txtChartWidthXval").val(12);
            $("#txtChartWidthYval").val(6);
            $("#hdnCriteriaSummaryId").val("");
            $("#frmChartResult").show();
            $("#FilterList").hide();
            $("#txtRemark").val("");
            $("#txtCaption").val("");
            $("#txtCaption").val("");
            $("#txtCaption").removeClass("required");
            $("#DivGenerateNewChart").hide();
        }
    },
    BindChartTypeRadio: function (ChartType, DivId, NameLbl) {        
        $("#" + DivId).html('');
        if (ChartType.length > 0) {
            var Type = ChartType.split(',');
            var html = '';
            for (var i = 0; i < Type.length; i++) {

                html += '<span id="span' + Type[i] + '" style="position: relative;margin-right: 10px;">' +
                           '<input type="radio" name="ChartType' + NameLbl + '" id="' + NameLbl + Type[i] + '"  class="Radio">' +
                            '<label for="' + NameLbl + Type[i] + '">';

                if (Type[i] == 'StackedColumn') {
                    html += 'Stacked Column';
                }
                else if (Type[i] == 'StackedLine') {
                    html += 'Stacked Line';
                }
                else if (Type[i] == 'Pie3D') {
                    html += 'Pie 3D';
                }
                else if (Type[i] == 'Donut3D') {
                    html += 'Donut 3D';
                }
                else {
                    html += Type[i];
                }
                html += '</label></span>';
            }

            $("#" + DivId).html(html);

            if (DivId == 'divChartType') {
                $("#" + DivId).find('input[type=radio]:first').prop('checked', true);
            }
        }
    },
    BindChartFilterUI: function (ChartId, IsFilterField, FromDefaultFilter, CriteriaSummaryId) {
        $('#divFilterElements').html("");
        var myfilter = { groupOp: "AND", rules: [] };
        myfilter.rules.push({ field: "CHARTID", op: "eq", data: ChartId });

        if (IsFilterField == 1) {
            myfilter.rules.push({ field: "GETFILTERDATA", op: "eq", data: 1 });
        }
        else if (FromDefaultFilter == 1 && CriteriaSummaryId != '') {
            myfilter.rules.push({ field: "GETDEFAULTFILTERDATA", op: "eq", data: 1 });
            myfilter.rules.push({ field: "CRITERIASUMMARYID", op: "eq", data: CriteriaSummaryId });
        }
        else {
            myfilter.rules.push({ field: "GETFILTERDATA", op: "eq", data: 0 });
            myfilter.rules.push({ field: "GETDEFAULTFILTERDATA", op: "eq", data: 0 });
            myfilter.rules.push({ field: "CRITERIASUMMARYID", op: "eq", data: '' });
        }        
        $.ajax({
            url: getDomain() + ChartView.variables.BindChartFieldUrl + "&myfilters=" + JSON.stringify(myfilter),
            async: false,
            cache: false,
            type: 'POST',
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    $("#panelChartResult").show();
                    var JsonObject = xml2json.parser(data);
                    if (JsonObject.serviceresponse.detailslist != undefined) {
                        $('#divFilterElements').html($("#FilterFields").render(JsonObject.serviceresponse.detailslist.details));
                        $('.input-group.date').datepicker({
                            format: 'dd/M/yyyy',
                            autoclose: true,
                        });
                        $(".SelectedDateValue").each(function () {
                            if ($(this).val() != '' && $(this).val() != undefined) {
                                var Id = ($(this).attr('id')).split('hdn');
                                if ($("#ddlOperator" + Id[1]).attr('DefaultOperator') == 'CustomRange') {
                                    var SelectedDateValue = $(this).val();
                                    if (SelectedDateValue.indexOf(';') != -1) {
                                        var selectDates = SelectedDateValue.split(';');
                                        $("#From" + Id[1]).parent().datepicker('setDate', selectDates[0]);
                                        $("#To" + Id[1]).parent().datepicker('setDate', selectDates[1]);
                                    }
                                    else {
                                        $("#From" + Id[1]).parent().datepicker('setDate', SelectedDateValue);
                                        $("#To" + Id[1]).parent().datepicker('setDate', SelectedDateValue);
                                    }
                                }
                            }
                        });

                        $('.numbertype').keypress(function (event) {
                            return numbersOnly(this, event, true, false);
                        });
                        $('.numbertype').on('copy paste cut', function (e) {
                            e.preventDefault(); //disable cut,copy,paste
                            return false;
                        });
                        $('#divFilterElements .AutoSuggest').each(function () {                            
                            ChartView.RegisterAutocomplete($(this).attr('id'));
                        });

                        $('#divFilterElements .AutoSuggestMultiSelect').each(function () {                            
                            ChartView.RegisterMultiSelectAutoSuggest($(this).attr('id'));
                        });

                        $('#divFilterElements .MultiCombobox').each(function () {
                            $('#' + $(this).attr('id')).select2({
                                tags: true,
                                escapeMarkup: function (text) { return text; },
                                tokenSeparators: [',', ''],
                                newOption: false
                            });

                            if ($(this).attr('selecteddata') != '' && $(this).attr('selecteddata') != undefined) {
                                var Values = $(this).attr('selecteddata');
                                var Selectedvalue = Values.split(',');
                                //$(this).select2("val", Selectedvalue);
                                $(this).val(Selectedvalue).trigger("change");
                            }
                        });

                        $("#divFilterElements .OperatorSelect").each(function () {                            
                            var id = this.id;
                            var FieldId = id.split('ddlOperator');
                            var defaultOpr = $(this).attr('DefaultOperator');
                            if (defaultOpr != undefined && defaultOpr != '') {
                                $('#' + this.id).val(defaultOpr);
                                if (defaultOpr == 'CustomRange') {
                                    $("#divdateRange" + FieldId[1]).show();
                                }
                            }
                            else
                                $('#' + id).val($('#' + id + " option:first").val());
                        });
                    }
                }
                else {
                    InvalidResponseCode(data);
                }
            },
            error: OnError
        });

        $('#divFilterElements .AutoSuggestMultiSelect').each(function () {
            if ($(this).attr('selecteddata') != '' && $(this).attr('selecteddata') != undefined) {
                var Selectedvalue;
                var Values = $(this).attr('selecteddata');
                Selectedvalue = Values.split(',');                
                ChartView.AutoCompleteBlankData($(this).attr('id'), Values);
                $("#" + $(this).attr('id')).val(Selectedvalue).trigger("change");
            }
        });
    },
    RegisterAutocomplete: function (autocompleteId) {
        $("#" + autocompleteId).autocomplete({
            source: function (request, response) {
                var myfilter = { groupOp: "AND", rules: [] };
                myfilter.rules.push({ field: "CHARTID", op: "eq", data: $("#hdnChartId").val() });
                myfilter.rules.push({ field: "FILTERFIELDID", op: "eq", data: autocompleteId });
                myfilter.rules.push({ field: "ISAUTOSUGGEST", op: "eq", data: 1 });
                myfilter.rules.push({ field: "FILTERVALUE", op: "eq", data: request.term });
                $.ajax({
                    url: getDomain() + ChartView.variables.BindChartFieldUrl + "&Loader=false&myfilters=" + JSON.stringify(myfilter),
                    type: "POST",
                    async: false,
                    cache: false,
                    success: function (data) {
                        $("#hdn" + autocompleteId).val("");
                        if ($(data).find('RESPONSECODE').text() == "0") {
                            var JsonObject = xml2json.parser(data);
                            if (JsonObject.serviceresponse.detailslist != undefined) {
                                var List;
                                if (JsonObject.serviceresponse.detailslist.details.length > 1)
                                    List = JsonObject.serviceresponse.detailslist.details;
                                else
                                    List = JsonObject.serviceresponse.detailslist;
                                response(
                               $.map(List, function (item) {
                                   if (jQuery.type(item) == "object") {
                                       return {
                                           label: item.valuefield,
                                           value: item.valuefield,
                                       }
                                   }
                                   else {
                                       return {
                                           label: item.valuefield,
                                           value: item.valuefield,
                                       }
                                   }
                               }))
                            }
                            else {
                                response([{ label: 'No Records Found', value: '' }]);
                                $("#hdn" + autocompleteId).val("");
                            }
                        }
                        else {
                            response([{ label: 'No Records Found', value: '' }]);
                            $("#hdn" + autocompleteId).val("");
                        }
                    }
                })
            },
            messages: {
                noResults: "No Results Found"
            },
            focus: function (event, ui) {
                event.preventDefault();
                $("#hdn" + autocompleteId).val("");
            },
            create: function () {
                $(".ui-autocomplete").css({ "z-index": "1000", "list-style": "none", "background": "#fff" });
                $(".ui-widget-content").css({ "border-left": "1px solid #e9e9e9", "border-right": "1px solid #e9e9e9", "border-bottom": "1px solid #e9e9e9", " box-shadow": " 0 6px 6px rgba(0,0,0,.175) !important", "max-height": "240px", "overflow-x": "hidden", "overflow-y": "scroll" });
            },
            minLength: 1,
            select: function (event, ui) {
                event.preventDefault();
                var id = '';
                id = ui.item.value;
                if (ui.item.value != 'No Records Found' || ui.item.label != 'No Records Found') {
                    $("#hdn" + autocompleteId).val(id);
                    $(this).val(ui.item.label);
                }
                else {
                    $("#hdn" + autocompleteId).val('');
                    $(this).val('');
                }
            }
        }).data("ui-autocomplete")._renderItem = function (ul, item) {
            var inner_html = '<div class="list_item_container p-l-5"><div class="autodescription"><p><span >' + item.label + '</span><br/></p></div>';
            var listItem = $("<li></li>")
            .data("item.autocomplete", item)
            .append(inner_html)
            .appendTo(ul);
            return listItem;
        };
    },
    RegisterMultiSelectAutoSuggest: function (autocompleteId) {
        $("#" + autocompleteId).select2({
            placeholder: 'Search using position code',
            minimumInputLength: 3,
            maximumSelectionSize: 1,
            multiple: true,
            ajax: {
                url: getDomain() + ChartView.variables.BindChartFieldUrl + "&Loader=false",
                dataType: 'xml',
                type: "GET",
                async: false,
                data: function (term, page) {
                    var sfilter = { rules: [] };
                    sfilter.rules.push({ field: "CHARTID", op: "eq", data: $("#hdnChartId").val() });
                    sfilter.rules.push({ field: "FILTERFIELDID", op: "eq", data: autocompleteId });
                    sfilter.rules.push({ field: "ISAUTOSUGGEST", op: "eq", data: 1 });
                    if (term.term != undefined) {
                        sfilter.rules.push({ field: "FILTERVALUE", op: "eq", data: term.term });
                    }
                    else
                        sfilter.rules.push({ field: "FILTERVALUE", op: "eq", data: '' });
                    return { myfilters: JSON.stringify(sfilter) };
                },
                processResults: function (data) {
                    var push = [];
                    if ($(data).find('RESPONSECODE').text() == "0") {
                        if ($(data).find(xmlvars.common_root).text() != '') {
                            var list = $(data).find(xmlvars.common_root).find(xmlvars.common_row);
                            $.each(list, function (index, obj) {
                                push.push({
                                    id: $(obj).find('ValueField').text(),
                                    text: $(obj).find('ValueField').text()
                                });
                            });
                        }
                    }
                    return { results: push };
                }
            }
        });
    },
    AutoCompleteBlankData: function (Id, Selectedvalue) {
        var myfilter = { rules: [] };
        myfilter.rules.push({ field: "CHARTID", op: "eq", data: $("#hdnChartId").val() });
        myfilter.rules.push({ field: "FILTERFIELDID", op: "eq", data: Id });
        myfilter.rules.push({ field: "ISBINDBLANKDATA", op: "eq", data: 1 });
        myfilter.rules.push({ field: "FILTERVALUE", op: "eq", data: Selectedvalue });
        $.ajax({
            url: getDomain() + ChartView.variables.BindChartFieldUrl + "&Loader=false&myfilters=" + JSON.stringify(myfilter),
            type: "POST",
            async: false,
            cache: false,
            success: function (result) {
                if ($(result).find('RESPONSECODE').text() == "0") {
                    var JsonObject = xml2json.parser(result);
                    $("#" + Id).empty().append($("#AutoCompleteList").render(JsonObject.serviceresponse.detailslist.details));
                }
                else
                    notificationMessage('Error', $(result).find('RESPONSEMESSAGE').text(), 'error');
            },
            error: OnError
        });
    },
    SaveFilterCriteriaData: function () {        
        Isvalid = $("#frmChartResult").valid();
        if (!Isvalid)
            return false;

        var ChartType;
        if ($("#hdnIsMultiValuedChart").val() == 0) {

            if ($("#RadioColumn").prop("checked") == true) {
                ChartType = 'Column';
            }
            else if ($("#RadioLine").prop("checked") == true) {
                ChartType = 'Line';
            }
            else if ($("#RadioArea").prop("checked") == true) {
                ChartType = 'Area';
            }
            else if ($("#RadioPie").prop("checked") == true) {
                ChartType = 'Pie';
            }
            else if ($("#RadioPie3D").prop("checked") == true) {
                ChartType = 'Pie3D';
            }
            else if ($("#RadioDonut").prop("checked") == true) {
                ChartType = 'Donut';
            }
            else if ($("#RadioDonut3D").prop("checked") == true) {
                ChartType = 'Donut3D';
            }
        }
        else if ($("#hdnIsMultiValuedChart").val() == 1) {
            if ($("#RadioStackedColumn").prop("checked") == true) {
                ChartType = 'StackedColumn';
            }
            else if ($("#RadioStackedLine").prop("checked") == true) {
                ChartType = 'StackedLine';
            }
        }

        if (ChartType != '' && ChartType != undefined) {
            $("#ChartType-error").html("");
            $("#ChartType-error").hide();
        }
        else {
            $("#ChartType-error").html("This field is required.");
            $("#ChartType-error").show();
            return false;
        }

        ChartView.variables.FilterOper = 'Add';
        ChartView.variables.Filteraddedit = "added";
        ChartView.variables.FilterMasterid = $("#hdnCriteriaSummaryId").val();

        if (ChartView.variables.FilterMasterid != '00000000-0000-0000-0000-000000000000' && ChartView.variables.FilterMasterid != '') {
            ChartView.variables.FilterOper = 'Edit';
            ChartView.variables.Filteraddedit = 'updated';
        }

        var xmlRootDocuments = '';
        var Isvalid = true, IsToFilter = 0;

        IsToFilter = $("#hdnIsFilterField").val();
        if (IsToFilter == 1) {
            Isvalid = true;
            $('#divFilterElements .AutoSuggest').each(function () {
                if ($(this).hasClass('required') == true) {
                    if ($("#hdn" + $(this).attr('id')).val() == undefined || $("#hdn" + $(this).attr('id')).val() == '') {
                        Isvalid = false;
                        $(this).addClass("Red-Border");
                        return false;
                    }
                    else {
                        $(this).removeClass("Red-Border");
                    }
                }
                else {
                    $(this).removeClass("Red-Border");
                }
            });

            $('#divFilterElements .FromDate').each(function () {
                var Id = this.id;
                var FieldId = Id.split('From');
                if ($("#ddlOperator" + FieldId[1]).val() == 'CustomRange') {
                    if ($(this).val() == '' || $(this).val() == null || $(this).val() == undefined) {
                        Isvalid = false;
                        $("#From" + FieldId[1]).addClass("Red-Border");
                        return false;
                    }
                    else {
                        $("#From" + FieldId[1]).removeClass("Red-Border");
                    }

                    if ($("#To" + FieldId[1]).val() == '' || $("#To" + FieldId[1]).val() == null || $("#To" + FieldId[1]).val() == undefined) {
                        Isvalid = false;
                        $("#To" + FieldId[1]).addClass("Red-Border");
                        return false;
                    }
                    else {
                        $("#To" + FieldId[1]).removeClass("Red-Border");
                    }
                }
                else {
                    $("#From" + FieldId[1]).removeClass("Red-Border");
                    $("#To" + FieldId[1]).removeClass("Red-Border");
                }
            });

            if (Isvalid != false) {
                var xmlDocuments = '';
                var InputId = '', InputValue = '';
                $("#divFilterElements .inputbox").each(function () {
                    if ($(this).hasClass("FromDate")) {
                        var DateInput = $(this).attr('id');
                        InputId = DateInput.split('From');
                        if ($("#ddlOperator" + InputId[1]).val() == 'CustomRange') {
                            xmlDocuments += "<FILTERNODE>";
                            xmlDocuments += "<FIELDID>" + InputId[1] + "</FIELDID>";
                            xmlDocuments += "<OPR><![CDATA[" + $("#ddlOperator" + InputId[1]).val() + "]]></OPR>";
                            if ($(this).val() != '' && $(this).val() != undefined && $("#To" + InputId[1]).val() != '' && $("#To" + InputId[1]).val() != undefined) {
                                xmlDocuments += "<FIELDVALUE><![CDATA[" + ($(this).val()) + ';' + ($("#To" + InputId[1]).val()) + "]]></FIELDVALUE>";
                            }
                            else {
                                xmlDocuments += "<FIELDVALUE></FIELDVALUE>";
                            }
                            xmlDocuments += "</FILTERNODE>";
                        }
                        else if ($("#ddlOperator" + InputId[1]).val() != 'CustomRange') {
                            xmlDocuments += "<FILTERNODE>";
                            xmlDocuments += "<FIELDID>" + InputId[1] + "</FIELDID>";
                            xmlDocuments += "<OPR><![CDATA[" + $("#ddlOperator" + InputId[1]).val() + "]]></OPR>";
                            xmlDocuments += "<FIELDVALUE><![CDATA[-]]></FIELDVALUE>";
                            xmlDocuments += "</FILTERNODE>";
                        }
                    }
                    else {
                        if ($(this).val() != '' && $(this).val() != undefined) {
                            InputId = $(this).attr('id');
                            xmlDocuments += "<FILTERNODE>";
                            xmlDocuments += "<FIELDID>" + InputId + "</FIELDID>";
                            xmlDocuments += "<OPR><![CDATA[" + $("#ddlOperator" + InputId).val() + "]]></OPR>";
                            if ($(this).hasClass("MultiCombobox")) {
                                var InputValue = $(this).select2("val");
                                InputValue = (InputValue == null) ? '' : InputValue.join();

                                xmlDocuments += "<FIELDVALUE><![CDATA[" + InputValue + "]]></FIELDVALUE>";
                            }
                            else {
                                xmlDocuments += "<FIELDVALUE><![CDATA[" + $(this).val() + "]]></FIELDVALUE>";
                            }
                            xmlDocuments += "</FILTERNODE>";
                        }
                    }
                });

                if (xmlDocuments != undefined && xmlDocuments != '' && xmlDocuments != null) {
                    xmlRootDocuments = "<FILTERNODELIST>" + xmlDocuments + "</FILTERNODELIST>";
                }
            }
            else {
                return false;
            }
        }
        var Filterdata = {
            "CHARTID": $("#hdnChartId").val(),
            "CRITERIASUMMARYID": ChartView.variables.FilterMasterid,
            "CAPTION": $("#txtCaption").val(),
            "CHARTTYPE": ChartType,
            "XWIDTH": $("#txtChartWidthXval").val(),
            "YWIDTH": $("#txtChartWidthYval").val(),
            "REMARK": $("#txtRemark").val(),
            "ISDISPLAYONDASHBOARD": $("#ChkDisplayonDashboard").prop("checked"),
            "XMLPARAM": escape(xmlRootDocuments),
            "oper": ChartView.variables.FilterOper
        };

        $.ajax({
            url: getDomain() + ChartView.variables.SaveFilterCriteriaUrl,
            data: Filterdata,
            async: false,
            cache: false,
            type: 'POST',
            success: function (data) {                
                if ($(data).find('RESPONSECODE').text() == "0") {
                    $("#hdnCriteriaSummaryId").val($(data).find('CRITERIASUMMARYID').text());
                    notificationMessage(ChartView.variables.FilterOper + ' Operation', 'Record is ' + ChartView.variables.Filteraddedit + ' successfully', 'success');
                    $("#DivGenerateNewChart").show();
                    $("#frmChartResult").hide();
                    $("#btnFilterListCancel").show();
                    $("#FilterList").show();
                    ChartView.initializeDefaultFilterJqgrid();
                }
                else {
                    InvalidResponseCode(data);
                }
            },
            error: OnError
        });
    },
    initializeDefaultFilterJqgrid: function () {
        ChartView.variables.FilterCriteriaCount = 0;
        var myfilter = { groupOp: "AND", rules: [] };
        myfilter.rules.push({ field: "CALLFROM", op: "eq", data: 'ChartCriteriaList' });
        myfilter.rules.push({ field: "CHARTID", op: "eq", data: $("#hdnChartId").val() });

        var URL = ChartView.variables.FilterCriteriaUrl + "&COLUMNREQUESTED=CRITERIASUMMARYID,CHARTID,EMPID,CAPTION,FILTERCRITERIA,CHARTTYPE,ISDISPLAYONDASHBOARD,XWIDTH,YWIDTH,REMARK,CREATEDDATE" + "&myfilters=" + JSON.stringify(myfilter);
        if (ChartView.variables.GridFilterCriteriaObj == null) {
            var colNames = ['CRITERIASUMMARYID', 'CHARTID', 'EMPID', 'Caption', 'Chart Type', 'Filter', 'XWIDTH', 'YWIDTH', 'Remark', 'Is Display', 'Edit', 'Delete'];
            var colModel = [
                    { name: "CRITERIASUMMARYID", index: "CRITERIASUMMARYID", xmlmap: xmlvars.common_colmap + "CRITERIASUMMARYID", stype: 'text', sortable: false, hidden: true, search: false },
                    { name: "CHARTID", index: "CHARTID", xmlmap: xmlvars.common_colmap + "CHARTID", stype: 'int', sortable: false, hidden: true, search: false },
                    { name: "EMPID", index: "EMPID", xmlmap: xmlvars.common_colmap + "EMPID", stype: 'int', sortable: false, hidden: true, search: false },
                    { name: "CAPTION", index: "CAPTION", width: 15, xmlmap: xmlvars.common_colmap + "CAPTION", stype: 'text', searchoptions: jqGridVariables.stringSearchOption },
                    { name: "CHARTTYPE", index: "CHARTTYPE", xmlmap: xmlvars.common_colmap + "CHARTTYPE", stype: 'text', sortable: false, width: 8, search: false, align: "center" },
                    { name: "FILTERCRITERIA", index: "FILTERCRITERIA", xmlmap: xmlvars.common_colmap + "FILTERCRITERIA", width: 38, stype: 'text', sortable: false, search: false },                    
                    { name: "XWIDTH", index: "XWIDTH", xmlmap: xmlvars.common_colmap + "XWIDTH", stype: 'text', sortable: false, search: false, hidden: true },
                    { name: "YWIDTH", index: "YWIDTH", xmlmap: xmlvars.common_colmap + "YWIDTH", stype: 'text', sortable: false, search: false, hidden: true },
                    { name: "REMARK", index: "REMARK", xmlmap: xmlvars.common_colmap + "REMARK", stype: 'text', sortable: false, width: 22, search: false },
                    { name: "ISDISPLAYONDASHBOARD", index: "ISDISPLAYONDASHBOARD", xmlmap: xmlvars.common_colmap + "ISDISPLAYONDASHBOARD", width: 8, align: "center", stype: 'text', sortable: true, searchoptions: jqGridVariables.ActiveSearchOption, formatter: function (cv, op, ro) { return jqGridVariables.chkFmatter(cv, op, ro, 'ChartView') } },
                    { name: 'edit', index: 'edit', width: 4, sortable: false, align: "center", search: false, formatter: function (cv, op, ro) { return jqGridVariables.editBtnFmatter(cv, op, ro, 'ChartView', 'edit') } },
                    { name: 'delete', index: 'delete', width: 5, sortable: false, align: "center", search: false,formatter: function (cv, op, ro) { return jqGridVariables.deleteBtnFmatter(cv, op, ro, 'ChartView') }}
            ];
            
            ChartView.variables.GridFilterCriteriaObj = $("#tableDefaultSettingList").jqGrid({
                url: getDomain() + URL,
                datatype: "xml",
                height: '100%',
                autowidth: true,
                shrinkToFit: true,
                rowNum: 5,
                rowList: [5, 10, 20, 50],
                colNames: colNames,
                colModel: colModel,
                pager: "#pagerDefaultSettingList",
                xmlReader: {
                    root: xmlvars.common_root,
                    row: xmlvars.common_row,
                    page: xmlvars.common_response + "CURRENTPAGE",
                    total: xmlvars.common_response + "TOTALPAGES",
                    records: xmlvars.common_response + "TOTALRECORDS",
                    repeatitems: false,
                    id: "CRITERIASUMMARYID"
                },
                loadComplete: function () {
                    $("tr.jqgrow:even").addClass('myAltRowClass');
                    // Hide column headers and top pager if no records were returned
                    if ($('#tableDefaultSettingList').getGridParam('records') === 0) {
                        $('.ui-jqgrid-htable').hide();
                    }
                    else {
                        $('.ui-jqgrid-htable').show();
                    }

                    var width = $('#jqGrid_DefaultSettingList').width();
                    if (width <= 750) {
                        width = 1170;
                    }
                    $('#tableDefaultSettingList').setGridWidth(width);
                },
                loadError: OnJqloadError,
                beforeProcessing: function (data, status, xhr) {
                    OnJqbeforeProcessingErrorcheck(data, status, xhr);
                    ChartView.variables.FilterCriteriaCount = parseInt($(data).find('TOTALRECORDS').text());
                },
                viewrecords: true,
                hidegrid: false,
                sortname: 'CREATEDDATE',
                sortorder: 'desc',
            });

            // Setup buttons
            $("#tableDefaultSettingList").jqGrid('navGrid', '#pagerDefaultSettingList',
                    { edit: false, add: false, del: false, search: true },
                    { height: 320 }
            );
            $("#pagerDefaultSettingList_left").css("width", "");
            AlignJqGridHeader('tableDefaultSettingList', ['CHARTTYPE', 'edit', 'delete', 'ISDISPLAYONDASHBOARD']);
        }
        else {
            $("#tableDefaultSettingList").jqGrid('setGridParam', { url: getDomain() + URL, page: 1 }).trigger("reloadGrid", [{ current: true }]);
        }
    },
    triggerId: function (id, oper) {
        var rowData = jQuery("#tableDefaultSettingList").getRowData(id);
        $("#hdnCriteriaSummaryId").val(id);

        if (rowData['CHARTTYPE'] == 'Column') {
            $("#RadioColumn").prop('checked', true);
        }
        else if (rowData['CHARTTYPE'] == 'Line') {
            $("#RadioLine").prop('checked', true);
        }
        else if (rowData['CHARTTYPE'] == 'Area') {
            $("#RadioArea").prop('checked', true);
        }
        else if (rowData['CHARTTYPE'] == 'Pie') {
            $("#RadioPie").prop('checked', true);
        }
        else if (rowData['CHARTTYPE'] == 'Pie3D') {
            $("#RadioPie3D").prop('checked', true);
        }
        else if (rowData['CHARTTYPE'] == 'Donut') {
            $("#RadioDonut").prop('checked', true);
        }
        else if (rowData['CHARTTYPE'] == 'Donut3D') {
            $("#RadioDonut3D").prop('checked', true);
        }

        $("#txtChartWidthXval").val(rowData['XWIDTH']);
        $("#txtChartWidthYval").val(rowData['YWIDTH']);

        $("#txtCaption").val(rowData['CAPTION']);
        $("#txtCaption").addClass("required");
        $("#txtRemark").val(rowData['REMARK']);

        if ($(rowData['ISDISPLAYONDASHBOARD']).html() == 'Yes') {
            $("#ChkDisplayonDashboard").prop('checked', true);
        }
        else {
            $("#ChkDisplayonDashboard").prop('checked', true);
        }

        ChartView.BindChartFilterUI(rowData['CHARTID'], 0, 1, id);
        $("#frmChartResult").show();
        $("#FilterList").hide();
        $("#DivGenerateNewChart").hide();
    },
    deleteRow: function (id) {
        var rowData = jQuery("#tableDefaultSettingList").getRowData(id);
        if (id != '00000000-0000-0000-0000-000000000000' && id != '') {
            $.confirm({
                'title': 'Delete Default Filter Criteria',
                'async': false,
                'message': "Are you sure want to Delete " + rowData['CAPTION'] + " Default Filter ! Continue?",
                'buttons': {
                    'Yes': {
                        'class': 'yes',
                        'action': function () {
                            var data = {
                                "oper": "delete",
                                "CRITERIASUMMARYID": id,
                            }
                            ChartView.variables.Filteraddedit = "deleted";
                            ChartView.variables.FilterOper = "Delete";

                            $.ajax({
                                url: getDomain() + ChartView.variables.SaveFilterCriteriaUrl,
                                data: data,
                                async: true,
                                cache: false,
                                type: 'POST',
                                success: function (data) {
                                    if ($(data).find('RESPONSECODE').text() == "0") {
                                        notificationMessage(ChartView.variables.FilterOper + ' Operation', 'Record is ' + ChartView.variables.Filteraddedit + ' successfully', 'success');
                                        $("#tableDefaultSettingList").trigger("reloadGrid", [{ current: true }]);
                                    }
                                    else {
                                        InvalidResponseCode(data);
                                    }
                                },
                                error: OnError
                            });
                        }
                    },
                    'No': {
                        'class': 'no'
                    }
                },
            });
        }
    },
    BackFromEditPanel: function () {
        $("#panelChartResult").hide();
        $("#PanelAllChartList").show();
        $("#hdnChartId").val("");
        $("#lblChartName").html("");
        $("#txtRemark").val("");
        $("#ChkDisplayonDashboard").prop("checked");
        $("#divFilterElements").html("");
        ChartView.AddNewChart();
    },
    OnChangeDateOperator: function (Element) {
        var id = '';
        id = $(Element).attr('id').split('ddlOperator');
        $("#From" + id[1]).val("");
        $("#To" + id[1]).val("");
        $("#To" + id[1] + "-error").hide();
        $("#To" + id[1]).removeClass("Red-Border");
        if ($(Element).val() == 'CustomRange') {
            if ($("#ddlOperator" + id[1]).hasClass('required')) {
                $("#From" + id[1]).addClass('required');
                $("#To" + id[1]).addClass('required');
            }
            else {
                $("#From" + id[1]).removeClass('required');
                $("#To" + id[1]).removeClass('required');
            }
            $("#divdateRange" + id[1]).show();
        }
        else {
            $("#From" + id[1]).removeClass('required');
            $("#To" + id[1]).removeClass('required');
            $("#divdateRange" + id[1]).hide();
        }
    },
    SaveDashboardDisplaySettingsdata: function () {
        var xmldata = "<DASHBOARDSETTING>";
        var resultXml = ChartView.makeFileXml();
        xmldata += resultXml.xmldata;
        xmldata += "</DASHBOARDSETTING>";

        var data = {
            EMPID: $("#hdnChartEmpId").val(),
            XMLPARAM: escape(xmldata)
        }
        $.ajax({
            url: getDomain() + ChartView.variables.SaveDashboardSettingUrl,
            data: data,
            async: true,
            cache: false,
            type: 'POST',
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    notificationMessage('Response', "Data saved successfully.", 'success');
                } else {
                    InvalidResponseCode(data);
                }
            },
            error: OnError
        });
    },
    makeFileXml: function () {
        var xmldata = '';
        $('.grid-stack').find('.grid-stack-item').each(function (key, obj) {
            xmldata += '<DETAILS>';
            xmldata += '<SECTIONNAME>' + $(obj).attr('SectionName') + '</SECTIONNAME>';
            xmldata += '<XDIM>' + $(obj).attr('data-gs-x') + '</XDIM>';
            xmldata += '<YDIM>' + $(obj).attr('data-gs-y') + '</YDIM>';
            xmldata += '</DETAILS>';
        });

        return { xmldata: xmldata };
    },

    /*--------ChartDataBind and filter to modal--------------------------*/
    GetChartListOfEmployee: function () {        
        var myfilter = { groupOp: "AND", rules: [] };
        myfilter.rules.push({ field: "CALLFROM", op: "eq", data: 'ChartData' });
        $.ajax({
            url: getDomain() + ChartView.variables.FilterCriteriaUrl + "&COLUMNREQUESTED=CRITERIASUMMARYID,CHARTID,CAPTION,CHARTTITLE,FILTERCRITERIA,XWIDTH,YWIDTH,XDIM,YDIM,MODULEID" + "&myfilters=" + JSON.stringify(myfilter) + "&_gridsearch=true&searchField=USEFOR&searchOper=eq&searchString=" + $("#hdnPageType").val(),
            async: false,
            cache: false,
            type: 'POST',
            success: function (data) {                
                if ($(data).find('RESPONSECODE').text() == "0") {
                    var JsonObject = xml2json.parser(data);
                    var ChartId, CriteriaSummaryId, XWidth, YWidth, PanelClass, FilterCriteria = '', ChartTitle = '', ChartFilterCaption = '';
                    var PanelHtml = '', XDim, YDim;
                    if (JsonObject.serviceresponse.detailslist != undefined) {
                        var totRec = JsonObject.serviceresponse.detailslist.details.length;
                        if (totRec > 1) {
                            for (var i = 0; i < JsonObject.serviceresponse.detailslist.details.length; i++) {
                                ChartId = JsonObject.serviceresponse.detailslist.details[i].chartid;
                                CriteriaSummaryId = JsonObject.serviceresponse.detailslist.details[i].criteriasummaryid;
                                XWidth = JsonObject.serviceresponse.detailslist.details[i].xwidth;
                                YWidth = JsonObject.serviceresponse.detailslist.details[i].ywidth;
                                FilterCriteria = JsonObject.serviceresponse.detailslist.details[i].filtercriteria;
                                ChartFilterCaption = JsonObject.serviceresponse.detailslist.details[i].caption;
                                ChartTitle = JsonObject.serviceresponse.detailslist.details[i].charttitle;
                                XDim = JsonObject.serviceresponse.detailslist.details[i].xdim;
                                YDim = JsonObject.serviceresponse.detailslist.details[i].ydim;

                                if ((XDim == '' || XDim == undefined) && (YDim == '' || YDim == undefined)) {
                                    XDim = 0;
                                    YDim = i * 5;
                                }

                                PanelHtml = '<div id="MainDivChart' + CriteriaSummaryId + '" SectionName="' + CriteriaSummaryId + '" class="grid-stack-item" data-gs-x="' + XDim + '" data-gs-y="' + YDim + '" data-gs-width="' + XWidth + '" data-gs-height="' + YWidth + '">';
                                PanelHtml += '<div class="grid-stack-item-content Hr-scroll" style="top:0px !important;bottom:0px !important;">';
                                PanelHtml += '<div class="" style="margin:5px;">';
                                PanelHtml += '<div class="font-common-sharp uppercase blue col-md-11" style="font-weight:600;font-size:14px;">';
                                PanelHtml += '<i id="DivChatIcon' + CriteriaSummaryId + '" class="fa fa-bar-chart"></i> <span id="DivChatTitle' + CriteriaSummaryId + '"></span>';
                                PanelHtml += '<span style="font-size:12px !important;font-weight: normal;    text-transform: none;"> (' + ChartTitle + ') </span>';
                                PanelHtml += '</div>';
                                if (FilterCriteria != '' && FilterCriteria != undefined) {
                                    PanelHtml += '<div class="col-md-1">';
                                    PanelHtml += "<a class=\"hr-font-green Hr-suite-iconset pull-right\" onclick=\"ChartView.GetDefaultFilterUIToModal('" + ChartId + "','" + CriteriaSummaryId + "','" + ChartFilterCaption + "',1,'" + XWidth + "','" + YWidth + "');\" href=\"javascript:void(0)\"><i class=\"fa fa-edit fa-lg\"></i></a>";
                                    PanelHtml += '</div>';
                                }
                                else {
                                    PanelHtml += '<div class="col-md-1">';
                                    PanelHtml += "<a class=\"hr-font-green Hr-suite-iconset pull-right\" onclick=\"ChartView.GetDefaultFilterUIToModal('" + ChartId + "','" + CriteriaSummaryId + "','" + ChartFilterCaption + "',0,'" + XWidth + "','" + YWidth + "');\" href=\"javascript:void(0)\"><i class=\"fa fa-edit fa-lg\"></i></a>";
                                    PanelHtml += '</div>';
                                }
                                PanelHtml += '</div>';
                                PanelHtml += '<div class="col-sm-12" id="DivChartUserFilter' + CriteriaSummaryId + '" style="margin:10px 5px;"></div>';
                                PanelHtml += '<div class="col-sm-12" id="chartdiv' + CriteriaSummaryId + '" style="border-top: 1px solid #eee;"></div>';
                                PanelHtml += '</div>';
                                PanelHtml += '</div>';

                                if (i == 0) {
                                    $("#DivChartDataList").html('<div class="grid-stack dashbourd-top" id="TestDivchartList">' + PanelHtml + '</div>');
                                }
                                else {
                                    $("#TestDivchartList").append(PanelHtml);
                                }
                                ChartView.GetChartData(ChartId, CriteriaSummaryId, XWidth, YWidth);
                            }
                        }
                        else {
                            ChartId = JsonObject.serviceresponse.detailslist.details.chartid;
                            CriteriaSummaryId = JsonObject.serviceresponse.detailslist.details.criteriasummaryid;
                            XWidth = JsonObject.serviceresponse.detailslist.details.xwidth;
                            YWidth = JsonObject.serviceresponse.detailslist.details.ywidth;
                            FilterCriteria = JsonObject.serviceresponse.detailslist.details.filtercriteria;
                            ChartFilterCaption = JsonObject.serviceresponse.detailslist.details.caption;
                            ChartTitle = JsonObject.serviceresponse.detailslist.details.charttitle;

                            XDim = JsonObject.serviceresponse.detailslist.details.xdim;
                            YDim = JsonObject.serviceresponse.detailslist.details.ydim;


                            if ((XDim == '' || XDim == undefined) && (YDim == '' || YDim == undefined)) {
                                XDim = 0;
                                YDim = 0;
                            }

                            PanelHtml = '<div id="MainDivChart' + CriteriaSummaryId + '" SectionName="' + CriteriaSummaryId + '" class="grid-stack-item" data-gs-x="' + XDim + '" data-gs-y="' + YDim + '" data-gs-width="' + XWidth + '" data-gs-height="' + YWidth + '">';
                            PanelHtml += '<div class="grid-stack-item-content Hr-scroll" style="top:0px !important;bottom:0px !important;">';
                            PanelHtml += '<div class="" style="margin:5px;">';
                            PanelHtml += '<div class="font-common-sharp uppercase blue col-md-11" style="font-weight:600;font-size:14px;">';
                            PanelHtml += '<i id="DivChatIcon' + CriteriaSummaryId + '" class="fa fa-bar-chart"></i> <span id="DivChatTitle' + CriteriaSummaryId + '"></span>';
                            PanelHtml += '<span style="font-size:12px !important;font-weight: normal;    text-transform: none;"> (' + ChartTitle + ') </span>';
                            PanelHtml += '</div>';
                            if (FilterCriteria != '' && FilterCriteria != undefined) {
                                PanelHtml += '<div class="col-md-1">';
                                PanelHtml += "<a class=\"hr-font-green Hr-suite-iconset pull-right\" onclick=\"ChartView.GetDefaultFilterUIToModal('" + ChartId + "','" + CriteriaSummaryId + "','" + ChartFilterCaption + "',1,'" + XWidth + "','" + YWidth + "');\" href=\"javascript:void(0)\"><i class=\"fa fa-edit fa-lg\"></i></a>";
                                PanelHtml += '</div>';
                            }
                            else {
                                PanelHtml += '<div class="col-md-1">';
                                PanelHtml += "<a class=\"hr-font-green Hr-suite-iconset pull-right\" onclick=\"ChartView.GetDefaultFilterUIToModal('" + ChartId + "','" + CriteriaSummaryId + "','" + ChartFilterCaption + "',0,'" + XWidth + "','" + YWidth + "');\" href=\"javascript:void(0)\"><i class=\"fa fa-edit fa-lg\"></i></a>";
                                PanelHtml += '</div>';
                            }
                            PanelHtml += '</div>';
                            PanelHtml += '<div class="col-sm-12" id="DivChartUserFilter' + CriteriaSummaryId + '" style="margin:10px 5px;"></div>';
                            PanelHtml += '<div class="col-sm-12" id="chartdiv' + CriteriaSummaryId + '" style="border-top: 1px solid #eee;"></div>';
                            PanelHtml += '</div>';
                            PanelHtml += '</div>';

                            $("#DivChartDataList").html('<div class="grid-stack dashbourd-top" id="TestDivchartList">' + PanelHtml + '</div>');
                            ChartView.GetChartData(ChartId, CriteriaSummaryId, XWidth, YWidth);
                        }

                        var options = {
                            cellHeight: 80,
                            verticalMargin: 5
                        };
                        var options = {
                            disableDrag: true,
                            disableResize: true,
                            float: false,
                            removeTimeout: 100,
                            acceptWidgets: '.grid-stack-item'
                        };
                        $('.grid-stack').gridstack(options);
                    }
                    else {
                        ChartView.AddNewChart();
                        $("#ChartListSidePanel").addClass("is-visible")
                    }
                }
                else {
                    InvalidResponseCode(data);
                }
            },
            error: OnError
        });
    },
    GetChartData: function (ChartId, CriteriaSummaryId, XWidth, YWidth) {
        var SeriesData = [], Header = [];
        var ChartFilterCaption = '', ChartType = ''
            , FilterCriteria = '', FilterToolTip = '', FilterHTML = ''
            , FilterLenth = (parseInt(XWidth) * 12) - 3;

        var myfilter = { groupOp: "AND", rules: [] };
        myfilter.rules.push({ field: "CHARTID", op: "eq", data: ChartId });
        myfilter.rules.push({ field: "CRITERIASUMMARYID", op: "eq", data: CriteriaSummaryId });
        $.ajax({
            url: getDomain() + ChartView.variables.BindChartDataUrl + "&myfilters=" + JSON.stringify(myfilter),
            async: false,
            cache: false,
            type: 'POST',
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    data = data.replace(/&amp;/g, '&');
                    var ChartDataJson = xml2json.parser(data);

                    ChartFilterCaption = ChartDataJson.serviceresponse.chartfiltercaption;
                    ChartType = ChartDataJson.serviceresponse.charttype;
                    $("#DivChatTitle" + CriteriaSummaryId).html(ChartFilterCaption);
                    FilterCriteria = ChartView.replaceSpecialHtml(ChartDataJson.serviceresponse.filtercriteria);

                    if (FilterCriteria != '' && FilterCriteria != undefined) {
                        FilterToolTip = FilterCriteria;
                        if (FilterCriteria.length > FilterLenth) {
                            FilterCriteria = FilterCriteria.substring(0, FilterLenth) + '...';
                        }
                        FilterHTML = '<div data-toggle="tooltip" data-original-title="' + FilterToolTip + '"><span style="color: #736d6d;"><b>User Filter : </b></span><span>' + FilterCriteria + '</span></div>';
                    }
                    else {
                        FilterHTML = '<div><span style="color: #736d6d;visibility: hidden;"><b>User Filter : </b></span></div>';
                    }

                    $("#DivChartUserFilter" + CriteriaSummaryId).html(FilterHTML);

                    $('[data-toggle="tooltip"]').tooltip({
                        html: true,
                        container: 'body',
                        placement: 'bottom',
                        template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'
                    });

                    $("#DivChatIcon" + CriteriaSummaryId).removeClass();
                    if (ChartType == 'Column') {
                        $("#DivChatIcon" + CriteriaSummaryId).addClass('fa fa-bar-chart');
                    }
                    else if (ChartType == 'Pie' || ChartType == 'Pie3D' || ChartType == 'Donut' || ChartType == 'Donut3D') {
                        $("#DivChatIcon" + CriteriaSummaryId).addClass('fa fa-pie-chart');
                    }
                    else if (ChartType == 'Area') {
                        $("#DivChatIcon" + CriteriaSummaryId).addClass('fa fa-area-chart');
                    }
                    else if (ChartType == 'Line') {
                        $("#DivChatIcon" + CriteriaSummaryId).addClass('fa fa-line-chart');
                    }
                    else if (ChartType == 'StackedLine') {
                        $("#DivChatIcon" + CriteriaSummaryId).addClass('fa fa-line-chart');
                    }
                    else if (ChartType == 'StackedColumn') {
                        $("#DivChatIcon" + CriteriaSummaryId).addClass('fa fa-bar-chart');
                    }

                    if (ChartDataJson.serviceresponse.detaillist != undefined) {
                        var SeriesData = [];
                        var totData = ChartDataJson.serviceresponse.detaillist.details.length;
                        if (totData > 1) {
                            SeriesData = ChartDataJson.serviceresponse.detaillist.details;
                        }
                        else {

                            SeriesData[0] = ChartDataJson.serviceresponse.detaillist.details;
                        }

                        var graphsData = [];
                        var xaxiscollist = ChartDataJson.serviceresponse.xaxiscollist;
                        var yaxiscollist = ChartDataJson.serviceresponse.yaxiscollist;

                        if (ChartType == 'Column') {
                            graphsData.push({
                                "balloonText": "[[category]]:<b>[[value]]</b>",
                                "fillAlphas": 0.8,
                                "lineAlpha": 0.2,
                                "type": "column",
                                "title": (yaxiscollist.colname.caption),
                                "valueField": (yaxiscollist.colname.colheader).toLowerCase()
                            });
                            ChartView.BindChart("chartdiv" + CriteriaSummaryId, SeriesData, graphsData, ChartType, (xaxiscollist.colname.colheader).toLowerCase(), xaxiscollist.colname.caption, yaxiscollist.colname.caption, YWidth);
                        }
                        else if (ChartType == 'Pie' || ChartType == 'Pie3D' || ChartType == 'Donut' || ChartType == 'Donut3D') {
                            var valuefield = (yaxiscollist.colname.colheader).toLowerCase();
                            ChartView.BindChart("chartdiv" + CriteriaSummaryId, SeriesData, valuefield, ChartType, (xaxiscollist.colname.colheader).toLowerCase(), xaxiscollist.colname.caption, yaxiscollist.colname.caption, YWidth);
                        }
                        else if (ChartType == 'Area') {
                            graphsData.push({
                                "id": "g" + (j + 1),
                                "fillAlphas": 0.4,
                                "valueField": (yaxiscollist.colname.colheader).toLowerCase(),
                                "balloonText": "<div style='margin:5px; font-size:19px;'>[[category]]:<b>[[value]]</b></div>"
                            });
                            ChartView.BindChart("chartdiv" + CriteriaSummaryId, SeriesData, graphsData, ChartType, (xaxiscollist.colname.colheader).toLowerCase(), xaxiscollist.colname.caption, yaxiscollist.colname.caption, YWidth);
                        }
                        else if (ChartType == 'Line') {
                            graphsData.push({
                                "id": "g1",
                                "balloonText": "[[category]]<br><b><span style='font-size:14px;'>[[value]]</span></b>",
                                "bullet": "round",
                                "bulletSize": 8,
                                "type": "smoothedLine",
                                "title": (yaxiscollist.colname.caption),
                                "valueField": (yaxiscollist.colname.colheader).toLowerCase()
                            });
                            ChartView.BindChart("chartdiv" + CriteriaSummaryId, SeriesData, graphsData, ChartType, (xaxiscollist.colname.colheader).toLowerCase(), xaxiscollist.colname.caption, yaxiscollist.colname.caption, YWidth);
                        }
                        else if (ChartType == 'StackedLine') {
                            for (var j = 0; j < yaxiscollist.colname.length; j++) {
                                graphsData.push({
                                    "balloonText": "[[title]] of [[category]]:<b>[[value]]</b>",
                                    "bullet": "round",
                                    "id": "AmGraph-" + (j + 1),
                                    "title": (yaxiscollist.colname[j].caption),
                                    "valueField": (yaxiscollist.colname[j].colheader).toLowerCase()
                                });
                            }
                            ChartView.BindChart("chartdiv" + CriteriaSummaryId, SeriesData, graphsData, ChartType, (xaxiscollist.colname.colheader).toLowerCase(), xaxiscollist.colname.caption, '', YWidth);
                        }
                        else if (ChartType == 'StackedColumn') {
                            for (var j = 0; j < yaxiscollist.colname.length; j++) {
                                graphsData.push({
                                    "balloonText": "[[title]] of [[category]]:[[value]]",
                                    "fillAlphas": 1,
                                    "id": "AmGraph-" + (j + 1),
                                    "title": (yaxiscollist.colname[j].caption),
                                    "type": "column",
                                    "valueField": (yaxiscollist.colname[j].colheader).toLowerCase()
                                });
                            }
                            ChartView.BindChart("chartdiv" + CriteriaSummaryId, SeriesData, graphsData, ChartType, (xaxiscollist.colname.colheader).toLowerCase(), xaxiscollist.colname.caption, '', YWidth);
                        }
                    }
                    else {
                        $("#chartdiv" + CriteriaSummaryId).html("<div style='margin: 150px 0px;text-align: center;'>No details available.</div>");
                        $("#chartdiv" + CriteriaSummaryId).css("width", '100%');
                        $("#chartdiv" + CriteriaSummaryId).css("font-size", '15px');
                    }
                }
                else {
                    InvalidResponseCode(data);
                }
            },
            error: OnError
        });
    },
    BindChart: function (DivId, SeriesData, GraphsData, ChartType, xaxiscolname, xaxisCaption, yaxiscolname, YWidth) {
        var ChartHeight = parseInt(YWidth) * 60;
        var Radius = (parseInt(YWidth) * 4) + "%";
        var InnerRadius = ((parseInt(YWidth) * 4) + 20) + "%";
        if (ChartType == 'Column') {
            AmCharts.makeChart(DivId, {
                "type": "serial",
                "theme": "light",
                "dataProvider": SeriesData,
                "gridAboveGraphs": true,
                "startDuration": 1,
                "valueAxes": [{
                    "position": "left",
                    "title": yaxiscolname
                }],
                "graphs": GraphsData,
                "chartCursor": {
                    "categoryBalloonEnabled": false,
                    "cursorAlpha": 0,
                    "zoomable": false
                },
                "categoryField": xaxiscolname,
                "categoryAxis": {
                    "gridPosition": "start",
                    "gridAlpha": 0,
                    "tickPosition": "start",
                    "tickLength": 20,
                    "labelRotation": 20,
                    "position": "bottom",
                    "title": xaxisCaption
                },
            });
        }
        else if (ChartType == 'Pie') {
            AmCharts.makeChart(DivId, {
                "type": "pie",
                "theme": "light",
                "angle": 30,
                "dataProvider": SeriesData,
                "valueField": GraphsData,
                "titleField": xaxiscolname,
                "radius": Radius, //can change
                "balloon": {
                    "fixedPosition": true
                },
            });
        }
        else if (ChartType == 'Pie3D') {
            AmCharts.makeChart(DivId, {
                "type": "pie",
                "theme": "light",
                "depth3D": 15,
                "angle": 30,
                "dataProvider": SeriesData,
                "valueField": GraphsData,
                "titleField": xaxiscolname,
                "radius": Radius, //can change
                "balloon": {
                    "fixedPosition": true
                },
            });
        }
        else if (ChartType == 'Donut') {
            AmCharts.makeChart(DivId, {
                "type": "pie",
                "theme": "light",
                "dataProvider": SeriesData,
                "valueField": GraphsData,
                "titleField": xaxiscolname,
                "labelRadius": 5,
                "radius": Radius, //can change
                "innerRadius": InnerRadius, //can change               
            });
        }
        else if (ChartType == 'Donut3D') {
            AmCharts.makeChart(DivId, {
                "type": "pie",
                "theme": "light",
                "depth3D": 15,
                "dataProvider": SeriesData,
                "valueField": GraphsData,
                "titleField": xaxiscolname,
                "labelRadius": 5,
                "radius": Radius, //can change
                "innerRadius": InnerRadius, //can change               
            });
        }
        else if (ChartType == 'Area') {
            AmCharts.makeChart(DivId, {
                "type": "serial",
                "theme": "light",
                "marginRight": 80,
                "dataProvider": SeriesData,
                "valueAxes": [{
                    "position": "left",
                    "title": yaxiscolname
                }],
                "graphs": GraphsData,
                "chartScrollbar": {
                    "graph": "g1",
                    "scrollbarHeight": 80,
                    "backgroundAlpha": 0,
                    "selectedBackgroundAlpha": 0.1,
                    "selectedBackgroundColor": "#888888",
                    "graphFillAlpha": 0,
                    "graphLineAlpha": 0.5,
                    "selectedGraphFillAlpha": 0,
                    "selectedGraphLineAlpha": 1,
                    "autoGridCount": true,
                    "color": "#AAAAAA"
                },
                "chartCursor": {
                    "cursorPosition": "mouse"
                },
                "categoryField": xaxiscolname,
                "categoryAxis": {
                    "minPeriod": "mm",
                    "position": "bottom",
                    "title": xaxisCaption,
                    "labelRotation": 20,
                },
            });
        }
        else if (ChartType == 'Line') {
            AmCharts.makeChart(DivId, {
                "type": "serial",
                "theme": "light",
                "marginTop": 0,
                "marginRight": 80,
                "dataProvider": SeriesData,
                "valueAxes": [{
                    "axisAlpha": 0,
                    "position": "left",
                    "title": yaxiscolname
                }],
                "graphs": GraphsData,
                //"chartScrollbar": {
                //    "graph": "g1",
                //    "gridAlpha": 0,
                //    "color": "#888888",
                //    "scrollbarHeight": 55,
                //    "backgroundAlpha": 0,
                //    "selectedBackgroundAlpha": 0.1,
                //    "selectedBackgroundColor": "#888888",
                //    "graphFillAlpha": 0,
                //    "autoGridCount": true,
                //    "selectedGraphFillAlpha": 0,
                //    "graphLineAlpha": 0.2,
                //    "graphLineColor": "#c2c2c2",
                //    "selectedGraphLineColor": "#888888",
                //    "selectedGraphLineAlpha": 1
                //},
                "chartCursor": {
                    "cursorAlpha": 0,
                    "valueLineEnabled": true,
                    "valueLineBalloonEnabled": true,
                    "valueLineAlpha": 0.5,
                    "fullWidth": true
                },
                "categoryField": xaxiscolname,
                "categoryAxis": {
                    "minPeriod": "mm",
                    "minorGridAlpha": 0.1,
                    "minorGridEnabled": true,
                    "position": "bottom",
                    "title": xaxisCaption,
                    "labelRotation": 20,
                },
            });
        }
        else if (ChartType == 'StackedLine') {
            AmCharts.makeChart(DivId, {
                "type": "serial",
                "theme": "light",
                "categoryField": xaxiscolname,
                "categoryAxis": {
                    "gridPosition": "start",
                    "autoRotateAngle": 20,
                    "autoRotateCount": 1,
                    "title": xaxisCaption,
                },
                "chartCursor": {
                    "enabled": true,
                    "animationDuration": 0,
                    // "categoryBalloonDateFormat": "YYYY"
                },
                "chartScrollbar": {
                    "enabled": true
                },
                "trendLines": [],
                "graphs": GraphsData,
                "guides": [],
                "valueAxes": [
                    {
                        "id": "ValueAxis-1",
                    }
                ],
                "allLabels": [],
                "balloon": {},
                "legend": {
                    "enabled": true,
                    "useGraphSettings": true,
                },
                "dataProvider": SeriesData
            });
        }
        else if (ChartType == 'StackedColumn') {
            AmCharts.makeChart(DivId, {
                "type": "serial",
                "theme": "light",
                "dataProvider": SeriesData,
                "categoryField": xaxiscolname,
                "startDuration": 1,
                "categoryAxis": {
                    "gridPosition": "start",
                    "labelRotation": 20,
                    "title": xaxisCaption,
                },
                "trendLines": [],
                "graphs": GraphsData,
                "guides": [],
                "valueAxes": [
                    {
                        "id": "ValueAxis-1",
                        "stackType": "regular",
                    }
                ],
                "allLabels": [],
                "balloon": {},
                "legend": {
                    "enabled": true,
                    "useGraphSettings": true
                },
            });
        }

        $("#" + DivId).css("width", '100%');
        $("#" + DivId).css("min-height", ChartHeight + 'px');
        $("#" + DivId).css("font-size", '11px');
    },
    GetDefaultFilterUIToModal: function (ChartId, CriteriaSummaryId, ChartTitle, IsFilter, XWidth, YWidth) {
        $("#divModalChartType").html('');
        $('#divFilterElementList').html("");
        $("#hdnModalIsFilter").val(IsFilter);
        $("#hdnModalChartId").val(ChartId);
        $("#hdnModalCriteriaSummaryId").val(CriteriaSummaryId);
        $("#CaptionChart").text(ChartTitle);

        $("#hdnModalOldX").val(XWidth);
        $("#hdnModalOldY").val(YWidth);

        $("#txtModalChartWidthXval").val(XWidth);
        $("#txtModalChartWidthYval").val(YWidth);

        $("#ModalChartType").show();
        var myfilter = { groupOp: "AND", rules: [] };
        myfilter.rules.push({ field: "CALLFROM", op: "eq", data: 'ChartCriteriaList' });
        myfilter.rules.push({ field: "CHARTID", op: "eq", data: ChartId });
        $.ajax({
            url: getDomain() + ChartView.variables.FilterCriteriaUrl + "&_gridsearch=true&searchField=CRITERIASUMMARYID&searchOper=eq&searchString=" + CriteriaSummaryId + "&myfilters=" + JSON.stringify(myfilter) + '&Loader=false',
            async: false,
            cache: false,
            type: 'POST',
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    var JsonObject = xml2json.parser(data);
                    if (JsonObject.serviceresponse.detailslist != undefined) {
                        var ChartData = JsonObject.serviceresponse.detailslist.details;

                        var AllChartType = ChartData.allcharttype;
                        var ChartType = ChartData.charttype;

                        if (AllChartType.length > 0) {
                            ChartView.BindChartTypeRadio(AllChartType, 'divModalChartType', 'ModalRadio');
                            if (ChartType == 'Column') {
                                $("#ModalRadioColumn").prop("checked", true);
                            }
                            else if (ChartType == 'Line') {
                                $("#ModalRadioLine").prop("checked", true);
                            }
                            else if (ChartType == 'Area') {
                                $("#ModalRadioArea").prop("checked", true);
                            }
                            else if (ChartType == 'Pie') {
                                $("#ModalRadioPie").prop("checked", true);
                            }
                            else if (ChartType == 'Pie3D') {
                                $("#ModalRadioPie3D").prop("checked", true);
                            }
                            else if (ChartType == 'Donut') {
                                $("#ModalRadioDonut").prop("checked", true);
                            }
                            else if (ChartType == 'Donut3D') {
                                $("#ModalRadioDonut3D").prop("checked", true);
                            }
                            else if (ChartType == 'StackedColumn') {
                                $("#ModalRadioStackedColumn").prop("checked", true);
                            }
                            else if (ChartType == 'StackedLine') {
                                $("#ModalRadioStackedLine").prop("checked", true);
                            }
                        }

                        var myfilter = { groupOp: "AND", rules: [] };
                        myfilter.rules.push({ field: "CHARTID", op: "eq", data: ChartId });

                        if (CriteriaSummaryId != '') {
                            myfilter.rules.push({ field: "GETDEFAULTFILTERDATA", op: "eq", data: 1 });
                            myfilter.rules.push({ field: "CRITERIASUMMARYID", op: "eq", data: CriteriaSummaryId });
                        }

                        if (IsFilter == 1) {
                            $.ajax({
                                url: getDomain() + ChartView.variables.BindChartFieldUrl + "&myfilters=" + JSON.stringify(myfilter),
                                async: false,
                                cache: false,
                                type: 'POST',
                                success: function (data) {
                                    if ($(data).find('RESPONSECODE').text() == "0") {
                                        var JsonObject = xml2json.parser(data);
                                        if (JsonObject.serviceresponse.detailslist != undefined) {
                                            $('#divFilterElementList').html($("#ModalFilterFields").render(JsonObject.serviceresponse.detailslist.details));
                                            $('.input-group.date').datepicker({
                                                format: 'dd/M/yyyy',
                                                autoclose: true,
                                            });

                                            $('#divFilterElementList .OperatorSelect').each(function () {
                                                var id = this.id;
                                                var FieldId = id.split('ddlOperator');
                                                var defaultOpr = $(this).attr('DefaultOperator');
                                                if (defaultOpr != undefined && defaultOpr != '') {
                                                    $('#' + this.id).val(defaultOpr);
                                                    if (defaultOpr == 'CustomRange') {
                                                        $("#divdateRange" + FieldId[1]).show();
                                                    }
                                                    else {
                                                        $("#divdateRange" + FieldId[1]).hide();
                                                    }
                                                }
                                                else
                                                    $('#' + id).val($('#' + id + " option:first").val());
                                            });

                                            $(".SelectedDateValue").each(function () {
                                                if ($(this).val() != '' && $(this).val() != undefined) {
                                                    var Id = ($(this).attr('id')).split('hdn');

                                                    if ($("#ddlOperator" + Id[1]).attr('DefaultOperator') == 'CustomRange') {
                                                        var SelectedDateValue = $(this).val();
                                                        if (SelectedDateValue.indexOf(';') != -1) {
                                                            var selectDates = SelectedDateValue.split(';');
                                                            $("#From" + Id[1]).parent().datepicker('setDate', selectDates[0]);
                                                            $("#To" + Id[1]).parent().datepicker('setDate', selectDates[1]);
                                                        }
                                                        else {
                                                            $("#From" + Id[1]).parent().datepicker('setDate', SelectedDateValue);
                                                            $("#To" + Id[1]).parent().datepicker('setDate', SelectedDateValue);
                                                        }
                                                    }
                                                }
                                            });

                                            $('.numbertype').keypress(function (event) {
                                                return numbersOnly(this, event, true, false);
                                            });
                                            $('.numbertype').on('copy paste cut', function (e) {
                                                e.preventDefault(); //disable cut,copy,paste
                                                return false;
                                            });
                                            $('#divFilterElementList .AutoSuggest').each(function () {
                                                ChartView.RegisterAutocomplete($(this).attr('id'));
                                            });

                                            $('#divFilterElementList .AutoSuggestMultiSelect').each(function () {                                                
                                                ChartView.RegisterMultiSelectAutoSuggest($(this).attr('id'));
                                            });

                                            $('#divFilterElementList .MultiCombobox').each(function () {                                                
                                                $('#' + $(this).attr('id')).select2({
                                                    tags: true,
                                                    escapeMarkup: function (text) { return text; },
                                                    tokenSeparators: [',', ''],
                                                    newOption: false
                                                });
                                                
                                                if ($(this).attr('selecteddata') != '' && $(this).attr('selecteddata') != undefined) {                                                    
                                                    var Values = $(this).attr('selecteddata');
                                                    var Selectedvalue = Values.split(',');
                                                    $(this).val(Selectedvalue).trigger("change");
                                                }
                                            });
                                        }
                                    }
                                    else {
                                        InvalidResponseCode(data);
                                    }
                                },
                                error: OnError
                            });

                            $('#divFilterElementList .AutoSuggestMultiSelect').each(function () {
                                if ($(this).attr('selecteddata') != '' && $(this).attr('selecteddata') != undefined) {
                                    var Selectedvalue;
                                    var Values = $(this).attr('selecteddata');
                                    Selectedvalue = Values.split(',');
                                    ChartView.AutoCompleteBlankData($(this).attr('id'), Values);
                                    $("#" + $(this).attr('id')).val(Selectedvalue).trigger("change");
                                }
                            });
                        }
                    }
                }
                else {
                    InvalidResponseCode(data);
                }
            },
            error: OnError
        });

        $("#FilterElementModal").modal('show');
    },
    replaceSpecialHtml: function (str) {
        if (str != undefined && str != '') {
            str = str.toString().replace(/&lt;/g, '<');
            str = str.toString().replace(/&gt;/g, '>')
            str = str.toString().replace(/&amp;/g, '&');
        }
        else {
            str = '';
        }
        return str;
    },
    SaveFilterCriteriaFromChartModal: function () {
        var xmlRootDocuments = '', Isvalid = true, ChartType, XWidth, YWidth, Filterdata = '';
        Isvalid = $("#FrmChartFilter").valid();
        if (!Isvalid)
            return false;

        if ($("#ModalRadioColumn").prop("checked") == true) {
            ChartType = 'Column';
        }
        else if ($("#ModalRadioLine").prop("checked") == true) {
            ChartType = 'Line';
        }
        else if ($("#ModalRadioArea").prop("checked") == true) {
            ChartType = 'Area';
        }
        else if ($("#ModalRadioPie").prop("checked") == true) {
            ChartType = 'Pie';
        }
        else if ($("#ModalRadioPie3D").prop("checked") == true) {
            ChartType = 'Pie3D';
        }
        else if ($("#ModalRadioDonut").prop("checked") == true) {
            ChartType = 'Donut';
        }
        else if ($("#ModalRadioDonut3D").prop("checked") == true) {
            ChartType = 'Donut3D';
        }
        else if ($("#ModalRadioStackedColumn").prop("checked") == true) {
            ChartType = 'StackedColumn';
        }
        else if ($("#ModalRadioStackedLine").prop("checked") == true) {
            ChartType = 'StackedLine';
        }

        if (ChartType != '' && ChartType != undefined) {
            $("#ModalChartType-error").html("");
            $("#ModalChartType-error").hide();
        }
        else {
            $("#ModalChartType-error").html("This field is required.");
            $("#ModalChartType-error").show();
            return false;
        }

        XWidth = $("#txtModalChartWidthXval").val();
        YWidth = $("#txtModalChartWidthYval").val();

        if ($('#hdnModalIsFilter').val() == 0) {
            Filterdata = {
                "CHARTID": $("#hdnModalChartId").val(),
                "CHARTTYPE": ChartType,
                "CRITERIASUMMARYID": $("#hdnModalCriteriaSummaryId").val(),
                "XWIDTH": XWidth,
                "YWIDTH": YWidth,
                "EDITFROMMODAL": 1,
                "oper": 'Edit'
            };
        }
        else if ($('#hdnModalIsFilter').val() == 1) {
            $('#divFilterElementList .AutoSuggest').each(function () {
                if ($(this).hasClass('required') == true) {
                    if ($("#hdn" + $(this).attr('id')).val() == undefined || $("#hdn" + $(this).attr('id')).val() == '') {
                        Isvalid = false;
                        $(this).addClass("Red-Border");
                        return false;
                    }
                    else {
                        $(this).removeClass("Red-Border");
                    }
                }
                else {
                    $(this).removeClass("Red-Border");
                }
            });

            $('#divFilterElementList .FromDate').each(function () {
                var Id = this.id;
                var FieldId = Id.split('From');
                if ($("#ddlOperator" + FieldId[1]).val() == 'CustomRange') {
                    if ($(this).val() == '' || $(this).val() == null || $(this).val() == undefined) {
                        Isvalid = false;
                        $("#From" + FieldId[1]).addClass("Red-Border");
                        return false;
                    }
                    else {
                        $("#From" + FieldId[1]).removeClass("Red-Border");
                    }

                    if ($("#To" + FieldId[1]).val() == '' || $("#To" + FieldId[1]).val() == null || $("#To" + FieldId[1]).val() == undefined) {
                        Isvalid = false;
                        $("#To" + FieldId[1]).addClass("Red-Border");
                        return false;
                    }
                    else {
                        $("#To" + FieldId[1]).removeClass("Red-Border");
                    }
                }
                else {
                    $("#From" + FieldId[1]).removeClass("Red-Border");
                    $("#To" + FieldId[1]).removeClass("Red-Border");
                }
            });

            if (Isvalid != false) {
                var xmlDocuments = '';
                var InputId = '', InputValue = '';

                $("#divFilterElementList .inputbox").each(function () {
                    if ($(this).hasClass("FromDate")) {
                        var DateInput = $(this).attr('id');
                        InputId = DateInput.split('From');
                        if ($("#ddlOperator" + InputId[1]).val() == 'CustomRange') {
                            xmlDocuments += "<FILTERNODE>";
                            xmlDocuments += "<FIELDID>" + InputId[1] + "</FIELDID>";
                            xmlDocuments += "<OPR><![CDATA[" + $("#ddlOperator" + InputId[1]).val() + "]]></OPR>";
                            if ($(this).val() != '' && $(this).val() != undefined && $("#To" + InputId[1]).val() != '' && $("#To" + InputId[1]).val() != undefined) {
                                xmlDocuments += "<FIELDVALUE><![CDATA[" + ($(this).val()) + ';' + ($("#To" + InputId[1]).val()) + "]]></FIELDVALUE>";
                            }
                            else {
                                xmlDocuments += "<FIELDVALUE></FIELDVALUE>";
                            }
                            xmlDocuments += "</FILTERNODE>";
                        }
                        else if ($("#ddlOperator" + InputId[1]).val() != 'CustomRange') {
                            xmlDocuments += "<FILTERNODE>";
                            xmlDocuments += "<FIELDID>" + InputId[1] + "</FIELDID>";
                            xmlDocuments += "<OPR><![CDATA[" + $("#ddlOperator" + InputId[1]).val() + "]]></OPR>";
                            xmlDocuments += "<FIELDVALUE><![CDATA[-]]></FIELDVALUE>";
                            xmlDocuments += "</FILTERNODE>";
                        }
                    }
                    else {
                        if ($(this).val() != '' && $(this).val() != undefined) {
                            InputId = $(this).attr('id');
                            xmlDocuments += "<FILTERNODE>";
                            xmlDocuments += "<FIELDID>" + InputId + "</FIELDID>";
                            xmlDocuments += "<OPR><![CDATA[" + $("#ddlOperator" + InputId).val() + "]]></OPR>";
                            if ($(this).hasClass("MultiCombobox")) {
                                var InputValue = $(this).select2("val");
                                InputValue = (InputValue == null) ? '' : InputValue.join();

                                xmlDocuments += "<FIELDVALUE><![CDATA[" + InputValue + "]]></FIELDVALUE>";
                            }
                            else {
                                xmlDocuments += "<FIELDVALUE><![CDATA[" + $(this).val() + "]]></FIELDVALUE>";
                            }
                            xmlDocuments += "</FILTERNODE>";
                        }
                    }
                });

                if (xmlDocuments != undefined && xmlDocuments != '' && xmlDocuments != null) {
                    xmlRootDocuments = "<FILTERNODELIST>" + xmlDocuments + "</FILTERNODELIST>";
                }
            }
            else {
                return false;
            }

            Filterdata = {
                "CHARTID": $("#hdnModalChartId").val(),
                "CRITERIASUMMARYID": $("#hdnModalCriteriaSummaryId").val(),
                "CHARTTYPE": ChartType,
                "XWIDTH": $("#txtModalChartWidthXval").val(),
                "YWIDTH": $("#txtModalChartWidthYval").val(),
                "EDITFROMMODAL": 1,
                "XMLPARAM": escape(xmlRootDocuments),
                "oper": 'Edit'
            };
        }

        $.ajax({
            url: getDomain() + ChartView.variables.SaveFilterCriteriaUrl,
            data: Filterdata,
            async: false,
            cache: false,
            type: 'POST',
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    if ((XWidth != $("#hdnModalOldX").val()) || (YWidth != $("#hdnModalOldY").val())) {
                        location.reload();
                    }
                    else {

                        $("#chartdiv" + $("#hdnModalCriteriaSummaryId").val()).html("");

                        $("#MainDivChart" + $("#hdnModalCriteriaSummaryId").val()).attr('data-gs-width', XWidth);
                        $("#MainDivChart" + $("#hdnModalCriteriaSummaryId").val()).attr('data-gs-height', YWidth);

                        ChartView.GetChartData($("#hdnModalChartId").val(), $("#hdnModalCriteriaSummaryId").val(), XWidth, YWidth);
                        $("#FilterElementModal").modal('hide');
                    }
                }
                else {
                    InvalidResponseCode(data);
                }
            },
            error: OnError
        });
    },
    /*------------------------------------------------------------------*/
}

$(document).ready(function () {    
    var options = {
        cellHeight: 80,
        verticalMargin: 5
    };
    var options = {
        disableDrag: true,
        disableResize: true,
        float: false,
        removeTimeout: 100,
        acceptWidgets: '.grid-stack-item'
    };
    $('.grid-stack').gridstack(options);

    ChartView.GetChartListOfEmployee();

    $('#btneditgridstack').click(function () {
        var grid = $('.grid-stack').data('gridstack');
        grid.movable('.grid-stack-item', true);
        $('.grid-stack-item-content.ui-draggable-handle').css({ 'box-shadow': '1px 7px 22px #DDD', 'cursor': 'move' });
        $('#btncancelgridstack').show();
        $('#btnSavegridstack').show();
        $('#btnAddNewCharticon').show();
        $('#btneditgridstack').hide();
    });
    $('#btncancelgridstack').click(function () {
        var grid = $('.grid-stack').data('gridstack');
        grid.movable('.grid-stack-item', false);
        $('.grid-stack-item-content.ui-draggable-handle').css({ 'box-shadow': '2px 2px 3px #dadada', 'cursor': 'default' });
        $('#btncancelgridstack').hide();
        $('#btnSavegridstack').hide();
        $('#btnAddNewCharticon').hide();
        $('#btneditgridstack').show();
    });
    $('#btnSavegridstack').click(function () {
        var grid = $('.grid-stack').data('gridstack');
        grid.movable('.grid-stack-item', false);
        $('.grid-stack-item-content.ui-draggable-handle').css({ 'box-shadow': '2px 2px 3px #dadada', 'cursor': 'default' });
        ChartView.SaveDashboardDisplaySettingsdata();
        $('#btncancelgridstack').hide();
        $('#btnSavegridstack').hide();
        $('#btnAddNewCharticon').hide();
        $('#btneditgridstack').show();
    });
    $("#BtnClosePnl").click(function () {
       ChartView.GetChartListOfEmployee();
    });

    $("#btnSaveChart").click(function () {
        ChartView.SaveFilterCriteriaData();
    });

    $("#btnFilterListCancel").click(function () {
        if (ChartView.variables.FilterCriteriaCount == 0) {
            ChartView.BackFromEditPanel();
        }
        else {
            $("#hdnCriteriaSummaryId").val("");
            $("#tableDefaultSettingList").trigger("reloadGrid", [{ current: true }]);
            $("#frmChartResult").hide();
            $("#DivGenerateNewChart").show();
            $("#FilterList").show();
        }
    });

    $("#btnGenerateNewChart").click(function () {
        $("#frmChartResult").validate().resetForm();
        $("#hdnCriteriaSummaryId").val("");
        $("#frmChartResult").show();
        $("#FilterList").hide();
        $("#txtRemark").val("");
        $("#ChkDisplayonDashboard").prop("checked", true);
        $("#txtChartWidthXval").val(12);
        $("#txtChartWidthYval").val(6);
        $("#txtCaption").val("");
        $("#txtCaption").val("");
        $("#txtCaption").removeClass("required");
        $("#DivGenerateNewChart").hide();
        if ($("#hdnIsFilterField").val() == 1) {
            ChartView.BindChartFilterUI($("#hdnChartId").val(), 1, 0, '');
        }

        if ($(".Radio").length > 0) {
            $("#divChartType").find('input[type=radio]:first').prop("checked",true);
        }
    });

    $("#btnApplyFilter").click(function () {
        $("#FrmChartFilter").validate().resetForm();
        ChartView.SaveFilterCriteriaFromChartModal();
    });
});