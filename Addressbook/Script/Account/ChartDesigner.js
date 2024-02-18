var ChartDesignerView = {
    variables: {       
        BindQueryMasterurl: "/Common/BindMastersDetails?ServiceName=COMMON_CHARTQUERY_GET",
        BindFieldMasterurl: "/Common/BindMastersDetails?ServiceName=COMMON_CHARTFIELDLIST_GET",
        PerformMasterOperationurl: "/Common/OpeartionsOnMaster?ServiceName=COMMON_CHARTDESIGN_CRUD",
        BindMasterurl: "/Common/BindMastersDetails?ServiceName=COMMON_CHARTDESIGN_GET",
        BindFieldListUrl: "/Common/BindMastersDetails?ServiceName=COMMON_CHARTDESIGNDETAIL_GET",
        Oper: 'Add',
        addedit: "added",
        Masterid: "",
        ChartType: '',
        frmValidator: false,
    },
    initializeJqgrid: function () {
        colNames = ['CHARTID', 'Title', 'Chart Type', 'Discription', 'Use For', 'IsMultivalued Chart', 'IsActive', 'Display Order', 'CHARTQUERYID'],
        colModel = [
                    { name: "CHARTID", index: "CHARTID", xmlmap: xmlvars.common_colmap + "CHARTID", search: false, searchoptions: jqGridVariables.stringSearchOption, hidden: true },
                    { name: "TITLE", width: 27, index: "TITLE", xmlmap: xmlvars.common_colmap + "TITLE", search: true, searchoptions: jqGridVariables.stringSearchOption },
                    { name: "CHARTTYPE", index: "CHARTTYPE", xmlmap: xmlvars.common_colmap + "CHARTTYPE", search: false, sortable: false, hidden: true },
                    { name: "DISCRIPTION", width: 30, index: "DISCRIPTION", xmlmap: xmlvars.common_colmap + "DISCRIPTION", search: false, sortable: false },
                    { name: "USEFOR", index: "USEFOR", width: 8, xmlmap: xmlvars.common_colmap + "USEFOR", sortable: false, align: "center", searchoptions: jqGridVariables.stringSearchOption },
                    { name: "ISMULTIVALUEDCHART", width: 12, index: "ISMULTIVALUEDCHART", xmlmap: xmlvars.common_colmap + "ISMULTIVALUEDCHART", align: "center", formatter: function (cv, op, ro) { return jqGridVariables.chkFmatter(cv, op, ro, 'ChartDesignerView') }, search: false, sortable: true },
                    { name: "ISACTIVE", width: 5, index: "ISACTIVE", xmlmap: xmlvars.common_colmap + "ISACTIVE", align: "center", formatter: function (cv, op, ro) { return jqGridVariables.chkFmatter(cv, op, ro, 'ChartDesignerView') }, search: false, sortable: true },
                    { name: "DISPLAYORDER", width: 9, index: "DISPLAYORDER", xmlmap: xmlvars.common_colmap + "DISPLAYORDER", align: "center", search: false },
                    { name: "CHARTQUERYID", index: "CHARTQUERYID", xmlmap: xmlvars.common_colmap + "CHARTQUERYID", search: false, hidden: true },
        ];
        if (isU()) {
            colNames.push('Edit');
            colModel.push({ name: 'edit', index: 'edit', width: 4, sortable: false, align: "center", search: false, formatter: function (cv, op, ro) { return jqGridVariables.editBtnFmatter(cv, op, ro, 'ChartDesignerView', 'edit') } });
        } else if (isV()) {
            colNames.push('View');
            colModel.push({ name: 'edit', index: 'edit', width: 4, sortable: false, align: "center", search: false, formatter: function (cv, op, ro) { return jqGridVariables.editBtnFmatter(cv, op, ro, 'ChartDesignerView', 'view') } });
        }
        if (isD()) {
            colNames.push('Delete');
            colModel.push({ name: 'act', index: 'act', width: 5, sortable: false, align: "center", search: false, formatter: function (cv, op, ro) { return jqGridVariables.deleteBtnFmatter(cv, op, ro, 'ChartDesignerView') } });
        }

        $("#tableChartList").jqGrid({
            url: getDomain() + ChartDesignerView.variables.BindMasterurl,
            datatype: "xml",
            height: '100%',
            autowidth: true,
            shrinkToFit: true,
            rowNum: 25,
            rowList: [25, 50, 100],
            colNames: colNames,
            colModel: colModel,
            pager: "#pagerChartList",
            xmlReader: {
                root: xmlvars.common_root,
                row: xmlvars.common_row,
                page: xmlvars.common_response + "CURRENTPAGE",
                total: xmlvars.common_response + "TOTALPAGES",
                records: xmlvars.common_response + "TOTALRECORDS",
                repeatitems: false,
                id: "CHARTID"
            },
            loadComplete: function () {
                $("tr.jqgrow:even").addClass('myAltRowClass');
                $("#tableChartList").jqGrid('setGridHeight', $(window).innerHeight() - 170 - ($("#gbox_tableChartList").height() - $('#gbox_tableChartList .ui-jqgrid-bdiv').height()));

                // Hide column headers and top pager if no records were returned
                if ($('#tableChartList').getGridParam('records') == 0)
                    $('.ui-jqgrid-htable').hide();
                else
                    $('.ui-jqgrid-htable').show();

                var width = $('#jqGridChartList').width();
                if (width <= 430) {
                    width = 595;
                }
                $('#tableChartList').setGridWidth(width);
            },
            loadError: OnJqloadError,
            beforeProcessing: OnJqbeforeProcessingErrorcheck,
            viewrecords: true,
            hidegrid: false,
            sortname: 'DISPLAYORDER',
            sortorder: 'desc',
        });

        // Setup buttons
        $("#tableChartList").jqGrid('navGrid', '#pagerChartList',
            { edit: false, add: false, del: false, search: true },
            { height: 320 });
        $("#pagerChartList_left").css("width", "");
        AlignJqGridHeader('tableChartList', ['edit', 'act', 'ISMULTIVALUEDCHART', 'ISACTIVE', 'DISPLAYORDER', 'USEFOR']);
    },
    triggerId: function (id, oper) {
        ChartDesignerView.ClearValues();
        var rowData = jQuery("#tableChartList").getRowData(id);
        $("#hdnChartId").val(id);
        $("#txtTitle").val(rowData['TITLE']);
        $("#txtDiscription").val(rowData['DISCRIPTION']);
        if ($(rowData['ISMULTIVALUEDCHART']).html() == 'Yes') {
            $("#RadioChartTypeMultiple").prop('checked', true);        
        }
        else {
            $("#RadioChartTypeSingle").prop('checked', true);        
        }

        var ChartType = rowData['CHARTTYPE'];
        if (ChartType.length > 0) {
            var ChartType = ChartType.split(',');
            for (var i = 0; i < ChartType.length; i++) {
                if ($(rowData['ISMULTIVALUEDCHART']).html() == 'Yes') {
                    $("#SingleValueChartList").hide();
                    $("#MultiValueChartList").show();

                    if (ChartType[i] == "StackedColumn") {
                        $('#ChkStackedColumn').prop("checked", true);
                    }
                    else if (ChartType[i] == "StackedLine") {
                        $('#ChkStackedLine').prop("checked", true);
                    }
                }
                else {
                    $("#SingleValueChartList").show();
                    $("#MultiValueChartList").hide();
                    if (ChartType[i] == "Column") {
                        $('#ChkColumn').prop("checked", true)
                    }
                    else if (ChartType[i] == "Line") {
                        $('#ChkColumn').prop("checked", true);
                    }
                    else if (ChartType[i] == "Area") {
                        $('#ChkArea').prop("checked", true);
                    }
                    else if (ChartType[i] == "Pie") {
                        $('#ChkPie').prop("checked", true);
                    }
                    else if (ChartType[i] == "Pie3D") {
                        $('#ChkPie3D').prop("checked", true);
                    }
                    else if (ChartType[i] == "Donut") {
                        $('#ChkDonut').prop("checked", true);
                    }
                    else if (ChartType[i] == "Donut3D") {
                        $('#ChkDonut3D').prop("checked", true);
                    }
                }
            }
        }

        $("#txtMainDisplayOrder").val(rowData['DISPLAYORDER']);
        if ($(rowData['ISACTIVE']).html() == 'Yes') {
            $('#ChkIsActive').prop('checked', true);
        }
        else {
            $('#ChkIsActive').prop('checked', false);
        }
        

        var Usefor = rowData['USEFOR'];        
        if (Usefor == "B2B") {
            $("#rdB2B").prop("checked",true);
        }
        else if (Usefor == "B2C") {            
            $("#rdB2C").prop("checked",true);
        }
        else if (Usefor = "Outlet") {            
            $("#rdOutlet").prop("checked",true);
        }

        BindDropdown('ddlChartQuery', 'ChartQueryList', ChartDesignerView.variables.BindQueryMasterurl + "&_gridsearch=true&searchField=USEFOR&searchOper=eq&searchString=" + Usefor, 'Select Chart Query');
        $("#ddlChartQuery").val(rowData['CHARTQUERYID']);

        ChartDesignerView.BindEditTableFields(id);

        $('#PanelEditChartDesigner').show();
        $('#PanelViewChartDesigner').hide();
    },
    BindTableFields: function () {
        $('#tableFieldList').html("");
        $.ajax({
            url: getDomain() + ChartDesignerView.variables.BindFieldMasterurl + "&_gridsearch=true&searchField=CHARTQUERYID&searchOper=eq&searchString=" + $("#ddlChartQuery").val(),
            async: true,
            cache: false,
            type: 'POST',
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {                    
                    var JsonObject = xml2json.parser(data);
                    $('#tableFieldList').html($("#FieldList").render(JsonObject.serviceresponse.detailslist.details));

                    $('.IsUse').change(function () {
                        var ChkId = $(this).attr("id");
                        var Id = ChkId.split('ChkUse');
                        if ($(this).is(":checked")) {
                            $("#txtCaption" + Id[1]).addClass("required");
                        }
                        else {
                            $("#txtCaption" + Id[1]).val("");
                            $("#ChkX" + Id[1]).prop("checked", false);
                            if ($("#ChkY" + Id[1]).length > 0) {
                                $("#ChkY" + Id[1]).prop("checked", false);
                            }

                            $("#ChkF" + Id[1]).prop("checked", false);

                            if ($("#ChkM" + Id[1]).length > 0) {
                                $("#ChkM" + Id[1]).prop("checked", false);
                            }

                            $("#ddlOperator" + Id[1]).val($("#ddlOperator" + Id[1] + " option:first").val());
                        }
                    });
                    
                    $('.XAxis').change(function () {
                        if ($(this).is(":checked")) {
                            $('.XAxis').prop("checked", false);
                            $(this).prop("checked", true);
                        }
                    });

                    $('.YAxis').change(function () {
                        if ($(this).is(":checked")) {
                            if ($('#RadioChartTypeSingle').prop("checked") == true) {
                                $('.YAxis').prop("checked", false);
                                $(this).prop("checked", true);
                            }
                            else if ($('#RadioChartTypeMultiple').prop("checked") == true) {
                                $(this).prop("checked", true);
                            }
                        }
                    });

                    
                }
                else {
                    InvalidResponseCode(data);
                }
            },
            error: OnError
        });
    },
    BtnSubmitData: function () {        
        ChartDesignerView.variables.frmValidator = $("#FrmChartDesigner").valid();
        if (!ChartDesignerView.variables.frmValidator)
            return;

        ChartDesignerView.variables.Oper = 'Add';
        ChartDesignerView.variables.addedit = "added";
        ChartDesignerView.variables.Masterid = $("#hdnChartId").val();

        if (ChartDesignerView.variables.Masterid != "" && ChartDesignerView.variables.Masterid != '00000000-0000-0000-0000-000000000000') {
            ChartDesignerView.variables.Oper = 'Edit';
            ChartDesignerView.variables.addedit = 'updated';
        }
        if (ChartDesignerView.variables.Oper == 'Add' && isA() == 0) {
            notificationMessage('Response', permissionvars.unauthorized, 'error');
            return;
        }
        if (ChartDesignerView.variables.Oper == 'Edit' && isU() == 0) {
            notificationMessage('Response', permissionvars.unauthorized, 'error');
            return;
        }

        var ChartValueType = "";
        ChartDesignerView.variables.ChartType = '';
        var TotalRows = 0, xmlDocuments = '', Divid = '', id = '', XaxisCol = '', YaxisCol = '';

        if ($('#RadioChartTypeSingle').prop("checked") == true) {
            ChartValueType = 0;
            $("#FrmChartDesigner .CheckType").each(function () {
                if ($(this).attr('id') == 'ChkColumn') {
                    if (($('#ChkColumn').prop("checked") == true)) {
                        ChartDesignerView.variables.ChartType = ChartDesignerView.variables.ChartType + 'Column' + ',';
                    }
                }
                else if ($(this).attr('id') == 'ChkLine') {
                    if (($('#ChkLine').prop("checked") == true)) {
                        ChartDesignerView.variables.ChartType = ChartDesignerView.variables.ChartType + 'Line' + ',';
                    }
                }
                else if ($(this).attr('id') == 'ChkArea') {
                    if (($('#ChkArea').prop("checked") == true)) {
                        ChartDesignerView.variables.ChartType = ChartDesignerView.variables.ChartType + 'Area' + ',';
                    }
                }
                else if ($(this).attr('id') == 'ChkPie') {
                    if (($('#ChkPie').prop("checked") == true)) {
                        ChartDesignerView.variables.ChartType = ChartDesignerView.variables.ChartType + 'Pie' + ',';
                    }
                }
                else if ($(this).attr('id') == "ChkPie3D") {
                    if (($('#ChkPie3D').prop("checked") == true)) {
                        ChartDesignerView.variables.ChartType = ChartDesignerView.variables.ChartType + 'Pie3D' + ',';
                    }
                }
                else if ($(this).attr('id') == 'ChkDonut') {
                    if (($('#ChkDonut').prop("checked") == true)) {
                        ChartDesignerView.variables.ChartType = ChartDesignerView.variables.ChartType + 'Donut' + ',';
                    }
                }
                else if ($(this).attr('id') == 'ChkDonut3D') {
                    if (($('#ChkDonut3D').prop("checked") == true)) {
                        ChartDesignerView.variables.ChartType = ChartDesignerView.variables.ChartType + 'Donut3D' + ',';
                    }
                }
            });
        }
        else if ($('#RadioChartTypeMultiple').prop("checked") == true) {
            ChartValueType = 1;
            $("#FrmChartDesigner .CheckType").each(function () {
                if ($(this).attr('id') == 'ChkStackedColumn') {
                    if (($('#ChkStackedColumn').prop("checked") == true)) {
                        ChartDesignerView.variables.ChartType = ChartDesignerView.variables.ChartType + 'StackedColumn' + ',';
                    }
                }
                else if ($(this).attr('id') == 'ChkStackedLine') {
                    if (($('#ChkStackedLine').prop("checked") == true)) {
                        ChartDesignerView.variables.ChartType = ChartDesignerView.variables.ChartType + 'StackedLine' + ',';
                    }
                }
            });
        }

        if (ChartDesignerView.variables.ChartType == undefined || ChartDesignerView.variables.ChartType == '') {
            $("#txtChartType-error").html("This field is required.");
            $("#txtChartType-error").show();
            ChartDesignerView.variables.frmValidator = false;
            return;
        }
        else {
            ChartDesignerView.variables.ChartType = ChartDesignerView.variables.ChartType.substring(0, ChartDesignerView.variables.ChartType.length - 1);
            $("#txtChartType-error").html("");
            $("#txtChartType-error").hide();
        }

        var checkboxid = '', id = '';
        $('.XAxis').each(function () {
            checkboxid = '', id = '';
            if ($(this).prop("checked") == true) {
                checkboxid = this.id;
                id = checkboxid.split('ChkX');
                XaxisCol = id[1];
                return false;
            }
        });

        $('.YAxis').each(function () {
            checkboxid = '', id = '';
            if ($(this).prop("checked") == true) {
                checkboxid = this.id;
                id = checkboxid.split('ChkY');
                YaxisCol = id[1];
                return false;
            }
        });
        var IsCompulsary = 0;
        if ($("#tableFieldList tr").length > 0) {
            $("#DisplayFieldsList-error").html('');
            $("#DisplayFieldsList-error").hide();

            if (XaxisCol == '' || XaxisCol == undefined || XaxisCol == null) {
                ChartDesignerView.variables.frmValidator = false;
                $("#DisplayFieldsList-error").html('Please Select X-Axis Column');
                $("#DisplayFieldsList-error").show();
                return false;
            }

            if (YaxisCol == '' || YaxisCol == undefined || YaxisCol == null) {
                ChartDesignerView.variables.frmValidator = false;
                $("#DisplayFieldsList-error").html('Please Select Y-Axis Column');
                $("#DisplayFieldsList-error").show();
                return false;
            }

            $('#btnSaveChartData').attr('disabled', false);

            $("#tableFieldList tr").each(function () {
                Divid = this.id;
                id = Divid.split('Row');
                xmlDocuments += "<FIELD>";
                xmlDocuments += "<FIELDID>" + id[1] + "</FIELDID>";

                if ($("#ChkUse" + id[1]).prop("checked") == true) {
                    xmlDocuments += "<ISINUSE>1</ISINUSE>";

                    xmlDocuments += "<CAPTION>" + $("#txtCaption" + id[1]).val() + "</CAPTION>";                    

                    if ($("#ChkX" + id[1]).prop("checked") == true) {
                        xmlDocuments += "<ISXAXISFIELD>1</ISXAXISFIELD>";
                    }
                    else {
                        xmlDocuments += "<ISXAXISFIELD>0</ISXAXISFIELD>";
                    }

                    if ($("#ChkY" + id[1]).prop("checked") == true) {
                        xmlDocuments += "<ISYAXISFIELD>1</ISYAXISFIELD>";
                    }
                    else {
                        xmlDocuments += "<ISYAXISFIELD>0</ISYAXISFIELD>";
                    }

                    if ($("#ChkF" + id[1]).prop("checked") == true) {
                        xmlDocuments += "<ISFILTER>1</ISFILTER>";
                        if ($("#Selection" + id[1]).val() == 'Compulsory') {
                            IsCompulsary = 1;
                        }
                        else if ($("#Selection" + id[1]).val() == 'Optional') {
                            IsCompulsary = 0;
                        }
                        xmlDocuments += "<ISCOMPULSARY>" + IsCompulsary + "</ISCOMPULSARY>";
                        if ($("#ChkM" + id[1]).length) {
                            if ($("#ChkM" + id[1]).prop("checked") == true) {
                                xmlDocuments += "<ISMULTISELECT>1</ISMULTISELECT>";
                            }
                            else {
                                xmlDocuments += "<ISMULTISELECT>0</ISMULTISELECT>";
                            }
                        }
                        else {
                            xmlDocuments += "<ISMULTISELECT>0</ISMULTISELECT>";
                        }
                        xmlDocuments += "<DEFAULTOPERATOR>" + $("#ddlOperator" + id[1]).val() + "</DEFAULTOPERATOR>";
                    }
                    else {
                        xmlDocuments += "<ISFILTER>0</ISFILTER>";
                        xmlDocuments += "<ISCOMPULSARY>0</ISCOMPULSARY>";
                        xmlDocuments += "<ISMULTISELECT>0</ISMULTISELECT>";
                        xmlDocuments += "<DEFAULTOPERATOR></DEFAULTOPERATOR>";
                    }
                }
                else {                    
                    xmlDocuments += "<ISINUSE>0</ISINUSE>";
                    xmlDocuments += "<CAPTION></CAPTION>";
                    xmlDocuments += "<ISXAXISFIELD>0</ISXAXISFIELD>";
                    xmlDocuments += "<ISYAXISFIELD>0</ISYAXISFIELD>";
                    xmlDocuments += "<ISFILTER>0</ISFILTER>";
                    xmlDocuments += "<ISCOMPULSARY>0</ISCOMPULSARY>";
                    xmlDocuments += "<ISMULTISELECT>0</ISMULTISELECT>";
                    xmlDocuments += "<DEFAULTOPERATOR></DEFAULTOPERATOR>";
                }

                xmlDocuments += "</FIELD>";
            });

            if (xmlDocuments != undefined && xmlDocuments != '') {
                xmlDocuments = '<FIELDLIST>' + xmlDocuments + '</FIELDLIST>'
            }
                      
            var UseFor = '';
            if ($('#rdB2B').prop("checked"))
                UseFor = 'B2B';
            else if ($('#rdB2C').prop("checked"))
                UseFor = 'B2C';
            else if ($('#rdOutlet').prop("checked"))
                UseFor = 'Outlet';

            var data = {
                "TITLE": $("#txtTitle").val(),
                "DISCRIPTION": $("#txtDiscription").val(),
                "DISPLAYORDER": $("#txtMainDisplayOrder").val(),               
                "ISMULTIVALUEDCHART": ChartValueType,
                "CHARTTYPE": ChartDesignerView.variables.ChartType,              
                "ISACTIVE": $("#ChkIsActive").prop('checked'),
                "CHARTQUERYID": $("#ddlChartQuery").val(),                
                "oper": ChartDesignerView.variables.Oper,
                "USEFOR" :UseFor,
                "CHARTID": ChartDesignerView.variables.Masterid,
                "XMLPARAM": escape(xmlDocuments),
            }
            ChartDesignerView.SaveData(data, ChartDesignerView.variables.Oper);
        }
        else {
            ChartDesignerView.variables.frmValidator = false;
            $("#DisplayFieldsList-error").html('Field Details are required.');
            $("#DisplayFieldsList-error").show();
            return false;
        }
    },
    SaveData: function (data,Oper) {
        $.ajax({
            url: getDomain() + ChartDesignerView.variables.PerformMasterOperationurl,
            data: data,
            async: false,
            cache: false,
            type: 'POST',
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    if (Oper == 'delete') {
                        OperationMessage("", 'Chart Designer Details Deleted successfully', 'success');                        
                        $("#tableChartList").trigger("reloadGrid", [{ current: true }]);
                    }
                    else {
                        $('#btnSaveChartData').attr('disabled', false);
                        OperationMessage("", 'Chart Designer Details Saved successfully', 'success');
                        ChartDesignerView.variables.frmValidator = true;
                        //ChartDesignerView.clearControls();
                        $("#PanelViewChartDesigner").show();
                        $("#PanelEditChartDesigner").hide();
                        $("#tableChartList").trigger("reloadGrid", [{ current: true }]);
                    }
                    ChartDesignerView.ClearValues();
                }
                else {
                    ChartDesignerView.variables.frmValidator = false;
                    InvalidResponseCode(data);
                    return false;
                }
            },
            error: OnError
        });
    },
    deleteRow: function (id) {
        var rowData = jQuery("#tableChartList").getRowData(id);
        $.confirm({
            'title': 'Delete Chart Design',
            'message': 'You are about to delete this Chart Design. It can not be restored at a later time! Continue? ',
            'buttons': {
                'Yes': {
                    'class': 'yes',
                    'action': function () {
                        ChartDesignerView.variables.Oper = "delete";
                        var data = {
                            "oper": ChartDesignerView.variables.Oper,
                            "CHARTID": id,
                        }
                        ChartDesignerView.SaveData(data, ChartDesignerView.variables.Oper);
                    }
                },
                'No': {
                    'class': 'no',
                    'action': function () {
                    }
                }
            }
        });
    },
    BindEditTableFields: function (Id) {
        $('#tableFieldList').html("");
        var myfilter = { rules: [] };
        myfilter.rules.push({ field: "CHARTID", op: "eq", data: Id });
        $.ajax({
            url: getDomain() + ChartDesignerView.variables.BindFieldListUrl + "&myfilters=" + JSON.stringify(myfilter),
            async: true,
            cache: false,
            type: 'POST',
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    var JsonObject = xml2json.parser(data);
                    $('#tableFieldList').html($("#EditFieldList").render(JsonObject.serviceresponse.detailslist.details));

                    $('.IsUse').change(function () {                        
                        var ChkId = $(this).attr("id");
                        var Id = ChkId.split('ChkUse');
                        if ($(this).is(":checked")) {
                            $("#txtCaption" + Id[1]).addClass("required");
                        }
                        else {
                            $("#txtCaption" + Id[1]).val("");
                            $("#ChkX" + Id[1]).prop("checked", false);
                            if ($("#ChkY" + Id[1]).length > 0) {
                                $("#ChkY" + Id[1]).prop("checked", false);
                            }

                            $("#ChkF" + Id[1]).prop("checked", false);

                            if ($("#ChkM" + Id[1]).length > 0) {
                                $("#ChkM" + Id[1]).prop("checked", false);
                            }

                            $("#ddlOperator" + Id[1]).val($("#ddlOperator" + Id[1] + " option:first").val());
                        }
                    });

                    $('.XAxis').change(function () {
                        if ($(this).is(":checked")) {
                            $('.XAxis').prop("checked", false);
                            $(this).prop("checked", true);
                        }
                    });

                    $('.YAxis').change(function () {
                        if ($(this).is(":checked")) {
                            if ($('#RadioChartTypeSingle').prop("checked") == true) {
                                $('.YAxis').prop("checked", false);
                                $(this).prop("checked", true);
                            }
                            else if ($('#RadioChartTypeMultiple').prop("checked") == true) {
                                $(this).prop("checked", true);
                            }
                        }
                    });

                    $(".FilterOper").each(function () {                        
                        if($(this).attr('selecteddata') != '' && $(this).attr('selecteddata') != undefined)
                        {
                            $(this).val($(this).attr('selecteddata'));
                        }
                    });
                }
                else {
                    InvalidResponseCode(data);
                }
            },
            error: OnError
        });
    },
    ClearValues:function()
    {
        $("#FrmChartDesigner").validate().resetForm();
        $("#hdnChartId").val("");
        $("#txtTitle").val("");
        $("#txtDiscription").val("");
        $("#RadioChartTypeSingle").prop('checked', true);
        $("#SingleValueChartList").show();
        $("#MultiValueChartList").hide();       
        $(".CheckType").prop("checked", false);
        $("#rdB2B").prop('checked', true);        
        $("#txtMainDisplayOrder").val("");
        $('#ChkIsActive').prop('checked', true);
        $("#ddlChartQuery").val("");
        $('#tableFieldList').html("");
    },
    OnMultiSelectCheckChange: function (element) {
        var optionlist = '';
        var Id = element.id;
        var FieldId = Id.split('ChkM');
        if ($(element).prop("checked") == true) {
            optionlist = '<option value="in">In</option><option value="notin">Not In</option>';
        }
        else {
            optionlist = '<option value="eq">=</option><option value="neq">!=</option><option value="Like">Like</option>';
        }
        $("#ddlOperator" + FieldId[1]).html(optionlist);
    },
}
$(document).ready(function () {   
    ChartDesignerView.initializeJqgrid();
    $('input[type=radio][name=ChartType]').change(function () {
        if (this.value == 'Single') {
            $("#SingleValueChartList").show();
            $("#MultiValueChartList").hide();
        }
        else if (this.value == 'Multiple') {
            $("#SingleValueChartList").hide();
            $("#MultiValueChartList").show();
        }
        $(".CheckType").prop("checked", false);
    });

    BindDropdown('ddlChartQuery', 'ChartQueryList', ChartDesignerView.variables.BindQueryMasterurl + "&_gridsearch=true&searchField=USEFOR&searchOper=eq&searchString=B2B", 'Select Chart Query');

    $('#btnAddNewChart').click(function () {
        ChartDesignerView.ClearValues();
        $("#PanelViewChartDesigner").hide();
        $("#PanelEditChartDesigner").show();
    });

    $('#btnSaveChartData').click(function () {
        ChartDesignerView.BtnSubmitData();
    });

    $("#BtnBack").click(function () {
        ChartDesignerView.ClearValues();
        $("#PanelViewChartDesigner").show();
        $("#PanelEditChartDesigner").hide();
    });

    $('input[type=radio]').change(function () {
        var Usefor = '';
        if ($("#rdB2B").prop("checked") == true) {
            Usefor = "B2B";
        }
        else if ($("#rdB2C").prop("checked") == true) {
            Usefor = "B2C";
        }
        else if ($("#rdOutlet").prop("checked") == true) {
            Usefor = "Outlet";
        }
        BindDropdown('ddlChartQuery', 'ChartQueryList', ChartDesignerView.variables.BindQueryMasterurl + "&_gridsearch=true&searchField=USEFOR&searchOper=eq&searchString=" + Usefor, 'Select Chart Query');
    });
});