var b2csettingview = {
    variables: {
        Count: 1,
    },
    btncrudgold: function () {

        var data = {
            "CHARGEID": $("#hdnchargeid").val(),
            "GOLDMELTPER": $("#txtaddongoldrate").val() || 0,
            "GIFTWRAPPERCHARGE": $("#txtgiftcharges").val() || 0,
        }
        $.ajax({
            url: getDomain() + "/Common/OpeartionsOnMaster?ServiceName=B2C_CHARGES_SETTINGS_CRUD",
            data: data,
            async: true,
            cache: false,
            type: 'POST',
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    notificationMessage('', "Charges save successfully", 'success');
                    b2csettingview.Bindgoldrate();
                }
                else {
                    InvalidResponseCode(data);
                }
            },
            error: OnError
        });
    },
    Bindgoldrate: function () {
        $.ajax({
            url: getDomain() + "/Common/BindMastersDetails?ServiceName=B2C_CHARGES_SETTINGS_GET",
            async: false,
            cache: false,
            type: 'POST',
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    var JsonObject = xml2json.parser(data);
                    if (JsonObject.serviceresponse.detailslist != undefined) {
                        $("#hdnchargeid").val(JsonObject.serviceresponse.detailslist.details.chargeid);
                        $("#txtaddongoldrate").val(JsonObject.serviceresponse.detailslist.details.goldmeltper);
                        $("#txtgiftcharges").val(JsonObject.serviceresponse.detailslist.details.giftwrappercharge);
                    }
                }
                else {
                    InvalidResponseCode(data);
                }
            },
            error: OnError
        });
    },
    savedata: function () {
        var isValid = $("#formextradaysdiv").valid();
        var i;
        if ($("#txtalreadymakingdesigns").val() == "" || $("#txtalreadymakingdesigns").val() == null) {
            $("#txtalreadymakingdesigns").addClass("tablerror");
            isValid = false;
        }
        else {
            $("#txtalreadymakingdesigns").removeClass("tablerror");
            isValid = true;
        }
        for (i = 1; i <= $('#extradaysdiv tr').length ; i++) {
            if ($("#ddlstatedrop" + i).val() == "" || $("#ddlstatedrop" + i).val() == null) {
                $("#ddlstatedrop" + i).addClass("tablerror");
                isValid = false;
            }
            else {
                $("#ddlstatedrop" + i).removeClass("tablerror");
            }
            if ($("#ddlextra" + i).val() == "" || $("#ddlextra" + i).val() == null) {
                $("#ddlextra" + i).addClass("tablerror");
                isValid = false;
            }
            else {
                $("#ddlextra" + i).removeClass("tablerror");
            }

        }
        if (!isValid)
            return;
        var xmlsaveFiles = "<DETAILLIST>";
        var typeselect, disonperorrs;
        var resultXml = makeFileXml('#extradaysdiv');
        xmlsaveFiles += resultXml.xmlsaveFiles;
        xmlsaveFiles += "</DETAILLIST>";

        var dataP = {
            "ITEMMAKINGDAYS": $("#txtalreadymakingdesigns").val(),
            "XMLPARAM": escape(xmlsaveFiles)
        };
        $.ajax({
            url: getDomain() + "/Common/OpeartionsOnMaster?ServiceName=B2C_DELIVERY_DAYS_CRUD",
            data: dataP,
            async: true,
            cache: false,
            type: 'POST',
            success: b2csettingview.btnMasterSubmitOnSuccess,
            error: OnError,
        });
    },
    btnMasterSubmitOnSuccess: function (data) {
        if ($(data).find('RESPONSECODE').text() == "0") {
            OperationMessage("", 'This detail saved successfully', 'success');
        }
        else {
            InvalidResponseCode(data);
        }
    },
    BindDeliveryDays: function () {
        $.ajax({
            url: getDomain() + "/Common/BindMastersDetails?ServiceName=B2C_DELIVERY_DAYS_GET",
            async: false,
            cache: false,
            type: 'POST',
            success: function (data) {
                $("#extradaysdiv").html("");
                if ($(data).find('RESPONSECODE').text() == "0") {
                    var JsonObject = xml2json.parser(data);
                    if (JsonObject.serviceresponse.totalrecords > 0) {
                        if (JsonObject.serviceresponse.detailslist != undefined) {
                            var list;
                            if (JsonObject.serviceresponse.detailslist.details.length > 1)
                                list = JsonObject.serviceresponse.detailslist.details;
                            else
                                list = JsonObject.serviceresponse.detailslist;
                            $.each(list, function (key, innerjsonDetails) {
                                var cnt = $('#extradaysdiv').find('tr').length + 1;
                                $("#extradaysdiv").append(" <tr id=''>" +
                                    "<td class='col-sm-1 text-center' id='rownum" + b2csettingview.variables.Count + "'>" + innerjsonDetails.rowno + "</td>" +
                                    "<td class='col-sm-3'>" +
                                    "   <select id='ddlstatedrop" + b2csettingview.variables.Count + "' class='ddlstatedrop form-control txtstatename'>" +
                                    "   </select>" +
                                    "</td>" +
                                    "<td class='col-sm-1'>" +
                                    "    <input  id='ddlextra" + b2csettingview.variables.Count + "' type='text' class='ddlextra form-control title' value='" + innerjsonDetails.extradays + "' placeholder='Days' />" +
                                    "</td>" +
                                    "<td class='col-sm-1 permissiondltmacbtn text-center'>" +
                                    "    <a href='javascript:void(0);' onclick='deletethisdays(this);'" +
                                    "       data-original-title='delete record' class='btn btn-danger tooltip1'><i class='fa fa-trash'></i></a>" +
                                    "</td>" +
                                "</tr>");
                                BindDropdownListState('ddlstatedrop' + b2csettingview.variables.Count + '', 'DdlStateList', "/Common/BindMastersDetails?ServiceName=MASTER_COUNTRY_STATE_CITY_GET&ColumnRequested=STATE&ISRECORDALL=true&sidx=STATENAME&sord=asc", 'Select State');
                                $('#ddlstatedrop' + b2csettingview.variables.Count).val(innerjsonDetails.stateid);
                                $("#txtalreadymakingdesigns").val(innerjsonDetails.itemmakingdays);
                                b2csettingview.variables.Count++;

                            });
                        }
                    }
                    else {
                        var cnt = $('#extradaysdiv').find('tr').length + 1;
                        $("#extradaysdiv").append(" <tr id=''>" +
                                        "<td class='col-sm-1 text-center' id='rownum" + b2csettingview.variables.Count + "'>" + cnt + "</td>" +
                                        "<td class='col-sm-3'>" +
                                        "   <select id='ddlstatedrop" + b2csettingview.variables.Count + "' class='ddlstatedrop form-control txtstatename'>" +
                                        "   </select>" +
                                        "</td>" +
                                        "<td class='col-sm-1'>" +
                                        "    <input  id='ddlextra" + b2csettingview.variables.Count + "' type='text' class='ddlextra form-control title' value='' placeholder='Days' />" +
                                        "</td>" +
                                        "<td class='col-sm-1 permissiondltmacbtn text-center'>" +
                                        "    <a href='javascript:void(0);' onclick='deletethisdays(this);'" +
                                        "       data-original-title='delete record' class='btn btn-danger tooltip1'><i class='fa fa-trash'></i></a>" +
                                        "</td>" +
                                    "</tr>");
                        BindDropdownListState('ddlstatedrop' + b2csettingview.variables.Count + '', 'DdlStateList', "/Common/BindMastersDetails?ServiceName=MASTER_COUNTRY_STATE_CITY_GET&ColumnRequested=STATE&ISRECORDALL=true&sidx=STATENAME&sord=asc", 'Select State');
                        b2csettingview.variables.Count++;
                    }



                }
                else {
                    InvalidResponseCode(data);
                }
            },
            error: OnError
        });
    },

    GetCurrencyList: function () {
        $.ajax({
            url: getDomain() + "/Common/BindMastersDetails?ServiceName=B2C_CURRENCYWISE_CHARGES_GET",
            async: true,
            cache: false,
            type: 'POST',
            success: function (data) {
                if ($(data).find("RESPONSECODE").text() == "0") {
                    var jsonObject = xml2json.parser(data);
                    if (jsonObject.serviceresponse.detailslist) {
                        $("#tbl_ExtraCharge tbody").html($("#render_CurrencyList").render(jsonObject.serviceresponse.detailslist.details));

                        $(".number").keypress(function () {
                            return numbersOnly(this, event, true, false);
                        });
                    }
                    if (jsonObject.serviceresponse.defualtdiamond) {
                        $("#txt_DiaColor").val(jsonObject.serviceresponse.defualtdiamond.defaultdiamondcolor);
                        $("#txt_DiaClarity").val(jsonObject.serviceresponse.defualtdiamond.defaultdiamondpurity);
                        $("#txt_PartyCode").val($(data).find("PRICEPARTYCODE").text());
                    }
                }
            },
            error: OnError
        });
    },
    SaveExtraCharges: function () {
        var IsValid = $("#frmaddgoldrate").valid();
        if (!IsValid)
            return;

        var XMLList = "<DETAILLIST>";
        XMLList += b2csettingview.MakeXMLNode();
        XMLList += "</DETAILLIST>";
        var data = {
            DEFAULTDIAMONDCOLOR: $("#txt_DiaColor").val(),
            DEFAULTDIAMONDPURITY: $("#txt_DiaClarity").val(),
            PRICEPARTYCODE: $("#txt_PartyCode").val(),
            XMLPARAM: escape(XMLList)
        }

        $.ajax({
            url: getDomain() + "/Common/OpeartionsOnMaster?ServiceName=B2C_CURRENCYWISE_CHARGES_CRUD",
            data: data,
            async: true,
            cache: false,
            type: 'POST',
            success: function (data) {
                if ($(data).find("RESPONSECODE").text() == "0") {
                    notificationMessage('', $(data).find('RESPONSEMESSAGE').text(), 'success');
                }
                else {
                    InvalidResponseCode(data);
                }
            },
            error: OnError
        });
    },

    MakeXMLNode: function () {
        var XMLNode = "";
        $("#tbl_ExtraCharge tbody tr").each(function (key, obj) {
            XMLNode += '<DETAILS>';
            XMLNode += '<CURRENCYID>' + $(obj).attr("currencyid") + '</CURRENCYID>';
            XMLNode += '<EXTRACHARGEPER>' + $(obj).find(".ExCharge").val() + '</EXTRACHARGEPER>';
            XMLNode += '<GIFTCHARGE>' + $(obj).find(".GiftCharge").val() + '</GIFTCHARGE>';
            XMLNode += '<DELIVERYCHARGE>' + $(obj).find(".DelCharge").val() + '</DELIVERYCHARGE>';
            XMLNode += '</DETAILS>'
        });

        return XMLNode;
    },
}
var B2C_Main_OrderActionView = {
    variables: {
        BindMasterUrl: "/Common/BindMastersDetails?ServiceName=B2C_MAIN_ORDERACTION_GET",
        PerformMasterOperationUrl: "/Common/OpeartionsOnMaster?ServiceName=B2C_MAIN_ORDERACTION_CRUD",
        Oper: 'Add',
        addedit: "added",
        Masterid: "",
        //frmvalidator: $("#frmB2C_Main_OrderAction").validate({
        //    rules: {
        //        OrderStaticStatusId: {
        //            required: true
        //        },
        //        ActionName: {
        //            required: true
        //        },
        //        ActionDescription: {
        //            required: true
        //        }
        //    },
        //})
    },
    initializeJqgrid: function () {
        var colNames = ['ActionId', 'OrderStaticStatusId', 'Status Type', 'ActionName', 'ActionDescription'];
        var colModel = [
             { name: "ACTIONID", index: "ACTIONID", xmlmap: xmlvars.common_colmap + "ACTIONID", stype: 'int', sortable: false, hidden: true, search: false },
             { name: "ORDERSTATICSTATUSID", index: "ORDERSTATICSTATUSID", xmlmap: xmlvars.common_colmap + "ORDERSTATICSTATUSID", stype: 'int', hidden: true, sortable: false, search: false },
             { name: "STATICSTATUSNAME", width: 8, index: "STATICSTATUSNAME", xmlmap: xmlvars.common_colmap + "STATICSTATUSNAME", sortable: true, search: true, searchoptions: jqGridVariables.stringSearchOption },
             { name: "ACTIONNAME", width: 8, index: "ACTIONNAME", xmlmap: xmlvars.common_colmap + "ACTIONNAME", stype: 'text', sortable: true, search: true, searchoptions: jqGridVariables.stringSearchOption },
             { name: "ACTIONDESCRIPTION", width: 25, index: "ACTIONDESCRIPTION", xmlmap: xmlvars.common_colmap + "ACTIONDESCRIPTION", stype: 'text', sortable: false, search: false },
        ];
        if (isU()) {
            colNames.push('Edit');
            colModel.push({ name: 'edit', index: 'edit', width: 3, sortable: false, align: "center", search: false, formatter: function (cv, op, ro) { return jqGridVariables.editBtnFmatter(cv, op, ro, 'B2C_Main_OrderActionView', 'edit') } });
        }
        else {
            colNames.push('View');
            colModel.push({ name: 'edit', index: 'edit', width: 3, sortable: false, align: "center", search: false, formatter: function (cv, op, ro) { return jqGridVariables.editBtnFmatter(cv, op, ro, 'B2C_Main_OrderActionView', 'view') } });
        }
        if (isD()) {
            colNames.push('Delete');
            colModel.push({ name: 'delete', index: 'delete', width: 3, sortable: false, align: "center", search: false, formatter: function (cv, op, ro) { return jqGridVariables.deleteBtnFmatter(cv, op, ro, 'B2C_Main_OrderActionView') } });
        }
        $("#table_B2C_Main_OrderAction").jqGrid({
            //data: mydata,
            url: getDomain() + B2C_Main_OrderActionView.variables.BindMasterUrl,
            datatype: "xml",
            height: "100%",
            autowidth: true,
            shrinkToFit: true,
            rowNum: 25,
            rowList: [25, 50, 100],
            colNames: colNames,
            colModel: colModel,
            pager: "#pager_B2C_Main_OrderAction",
            xmlReader: {
                root: xmlvars.common_root,
                row: xmlvars.common_row,
                page: xmlvars.common_response + "CURRENTPAGE",
                total: xmlvars.common_response + "TOTALPAGES",
                records: xmlvars.common_response + "TOTALRECORDS",
                repeatitems: false,
                id: "ACTIONID"
            },
            loadComplete: function () {
                $("tr.jqgrow:even").addClass('myAltRowClass');
                $("#table_B2C_Main_OrderAction").jqGrid('setGridHeight', $(window).innerHeight() - 225 - ($("#gbox_table_B2C_Main_OrderAction").height() - $('#gbox_table_B2C_Main_OrderAction .ui-jqgrid-bdiv').height()));

                // Hide column headers and top pager if no records were returned
                if ($('#table_B2C_Main_OrderAction').getGridParam('records') === 0) {
                    $('.ui-jqgrid-htable').hide();
                }
                else
                    $('.ui-jqgrid-htable').show();

                var width = $('#jqGrid_B2C_Main_OrderAction').width();
                if (width <= 430) {
                    width = 595;
                }
                $('#table_B2C_Main_OrderAction').setGridWidth(width);
            },
            loadError: OnJqloadError,
            beforeProcessing: OnJqbeforeProcessingErrorcheck,
            viewrecords: true,
            hidegrid: false,
            sortname: 'ACTIONID',
            sortorder: 'asc',
        });

        // Setup buttons
        $("#table_B2C_Main_OrderAction").jqGrid('navGrid', '#pager_B2C_Main_OrderAction',
                { edit: false, add: false, del: false, search: true },
                { height: 200 }
        );

        $("#pager_B2C_Main_OrderAction_left").css("width", "");
        AlignJqGridHeader('table_B2C_Main_OrderAction', ['edit', 'delete']);
    },
    triggerInitialClick: function () {
        B2C_Main_OrderActionView.initializeJqgrid();
        B2C_Main_OrderActionView.clearControls();
    },
    triggerId: function (id, oper) {
        BindDropdown('statusdropdown', 'DdlStatustype', "/Common/BindMastersDetails?ServiceName=B2C_MAIN_STATIC_ORDERSTATUS_GET", 'Select Status Type');
        var rowData = jQuery("#table_B2C_Main_OrderAction").getRowData(id);
        $("#hdnActionId").val(rowData['ACTIONID']);
        $("#statusdropdown").val(rowData['ORDERSTATICSTATUSID']);
        $("#statusdropdown  option:selected").text(rowData['STATICSTATUSNAME']);
        $("#txtActionName").val(rowData['ACTIONNAME']);
        $("#txtActionDescription").val(rowData['ACTIONDESCRIPTION']);
        $("#panelB2C_Main_OrderActionEdit").show();
        $("#panelB2C_Main_OrderActionDelete").hide();
        $("#panelB2C_Main_OrderActionList").hide();
        B2C_Main_OrderActionView.showTitlePermissionWise(oper);
    },
    deleteRow: function (id) {
        $.confirm({
            'title': 'Delete Action Details',
            'message': 'You are about to delete this Action Detail. It can not be restored at a later time! Continue? ',
            'buttons': {
                'Yes': {
                    'class': 'yes',
                    'action': function () {
                        var dataP = {
                            ACTIONID: id,
                            oper: 'delete'
                        };
                        $.ajax({
                            url: getDomain() + "/Common/OpeartionsOnMaster?ServiceName=B2C_MAIN_ORDERACTION_CRUD",
                            type: "POST",
                            data: dataP,
                            async: false,
                            cache: false,
                            success: function (result) {
                                if ($(result).find('RESPONSECODE').text() == "0") {
                                    notificationMessage('Save Operation', 'Record is deleted successfully', 'success');
                                    $("#table_B2C_Main_OrderAction").trigger("reloadGrid", [{ current: true }]);
                                }
                                else
                                    notificationMessage('Error', $(result).find('RESPONSEMESSAGE').text(), 'error');
                            },
                            error: OnError
                        });
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
    btnMasterShowAddPanel: function () {
        B2C_Main_OrderActionView.clearControls();
        $("#panelB2C_Main_OrderActionEdit").show();
        $("#panelB2C_Main_OrderActionDelete").hide();
        $("#panelB2C_Main_OrderActionList").hide();
        BindDropdown('statusdropdown', 'DdlStatustype', "/Common/BindMastersDetails?ServiceName=B2C_MAIN_STATIC_ORDERSTATUS_GET", 'Select Status Type');
        B2C_Main_OrderActionView.showTitlePermissionWise('add');
    },
    btnMasterSubmit: function () {
        var isValid = $("#frmB2C_Main_OrderAction").valid();
        if (!isValid)
            return;

        B2C_Main_OrderActionView.variables.Oper = 'Add';
        B2C_Main_OrderActionView.variables.addedit = "added";
        B2C_Main_OrderActionView.variables.Masterid = $("#hdnActionId").val();

        if (B2C_Main_OrderActionView.variables.Masterid != "0" && parseInt(B2C_Main_OrderActionView.variables.Masterid) > 0) {
            B2C_Main_OrderActionView.variables.Oper = 'Edit';
            B2C_Main_OrderActionView.variables.addedit = 'updated';
        }
        if (B2C_Main_OrderActionView.variables.Oper == 'Add' && isA() == 0) {
            notificationMessage('Response', permissionvars.unauthorized, 'error');
            return;
        }
        if (B2C_Main_OrderActionView.variables.Oper == 'Edit' && isU() == 0) {
            notificationMessage('Response', permissionvars.unauthorized, 'error');
            return;
        }
        $('#btnSaveB2C_Main_OrderAction').attr('disabled', true);
        var data = {
            "ORDERSTATICSTATUSID": $("#statusdropdown").val(),
            "ACTIONNAME": $("#txtActionName").val(),
            "ACTIONDESCRIPTION": $("#txtActionDescription").val(),
            "oper": B2C_Main_OrderActionView.variables.Oper,
            "ACTIONID": B2C_Main_OrderActionView.variables.Masterid
        }
        B2C_Main_OrderActionView.savedata(data);
    },
    btnMasterSubmitOnSuccess: function (data) {
        if (B2C_Main_OrderActionView.variables.Oper == 'Delete')
            $('#btnDeleteB2C_Main_OrderAction').attr('disabled', false);
        else
            $('#btnSaveB2C_Main_OrderAction').attr('disabled', false);

        if ($(data).find('RESPONSECODE').text() == "0") {
            notificationMessage(B2C_Main_OrderActionView.variables.Oper + ' Operation', 'Record is ' + B2C_Main_OrderActionView.variables.addedit + ' successfully', 'success');
            B2C_Main_OrderActionView.clearControls();
            $("#table_B2C_Main_OrderAction").trigger("reloadGrid", [{ current: true }]);
        }
        else {
            InvalidResponseCode(data);
        }
    },
    clearControls: function () {
        $("#panelB2C_Main_OrderActionEdit").hide();
        $("#panelB2C_Main_OrderActionDelete").hide();
        $("#panelB2C_Main_OrderActionList").show();
        $("#hdnActionId").val("");
        $("#statusdropdown").html("");
        $("#statusdropdown").text("");
        $("#txtOrderStaticStatusId").val("");
        $("#txtActionName").val("");
        $("#txtActionDescription").val("");
        $("#frmB2C_Main_OrderAction").validate().resetForm();
        B2C_Main_OrderActionView.variables.Oper = 'Add';
        B2C_Main_OrderActionView.variables.addedit = "added";
        jQuery("#table_list_B2C_Main_OrderAction").jqGrid('resetSelection');
    },
    savedata: function (data) {
        $.ajax({
            url: getDomain() + B2C_Main_OrderActionView.variables.PerformMasterOperationUrl,
            data: data,
            async: true,
            cache: false,
            type: 'POST',
            success: B2C_Main_OrderActionView.btnMasterSubmitOnSuccess,
            error: OnError
        });
    },
    showTitlePermissionWise: function (oper) {
        if (oper == 'edit' || oper == 'add') {
            $("#btnSaveB2C_Main_OrderAction").show();
            $("#dB2C_Main_OrderActionTitle").show();
            $("#dViewB2C_Main_OrderActionTitle").hide();
        }
        else {
            if ($("#btnSaveB2C_Main_OrderAction").length > 0) {
                $("#btnSaveB2C_Main_OrderAction").hide();
            }
            $("#dViewB2C_Main_OrderActionTitle").show();
            $("#dB2C_Main_OrderActionTitle").hide();
        }
    },
    ClearTab: function () {
        $("#taborderaction").hide();
        $("#tabextracharges").hide();
        $("#tabdelivery").hide();
        $("#tabprivacypolicy").hide();
        $("#tabTermsCondition").hide();
        $("#tabFAQ").hide();
    }
};
var B2C_PrivacyPolicy = {
    variables: {
        BindMasterUrl: "/Common/BindMastersDetails?ServiceName=B2C_PRIVACYPOLICY_GET",
        PerformMasterOperationUrl: "/Common/OpeartionsOnMaster?ServiceName=B2C_PRIVACYPOLICY_CRUD",
        Oper: '',
        addedit: "added",
        Masterid: "",
        Count: 1,
    },
    initializeJqgrid: function () {
        var colNames = ['Policy Name', 'Order By Name'];
        var colModel = [
             { name: "POLICYNAME", index: "POLICYNAME", width: 70, xmlmap: 'POLICYLIST>POLICYDETAILS>' + "POLICYNAME", stype: 'text', sortable: false, search: false },
             { name: "ORDERBYNAME", index: "ORDERBYNAME", width: 10, align: "center", xmlmap: 'POLICYLIST>POLICYDETAILS>' + "ORDERBYNAME", stype: 'text', sortable: false, search: false },
        ];
        if (isU()) {
            colNames.push('Edit');
            colModel.push({ name: 'edit', index: 'edit', width: 3, sortable: false, align: "center", search: false, formatter: function (cv, op, ro) { return jqGridVariables.editBtnFmatter(cv, op, ro, 'B2C_PrivacyPolicy', 'edit') } });
        }
        else {
            colNames.push('View');
            colModel.push({ name: 'edit', index: 'edit', width: 3, sortable: false, align: "center", search: false, formatter: function (cv, op, ro) { return jqGridVariables.editBtnFmatter(cv, op, ro, 'B2C_PrivacyPolicy', 'view') } });
        }
        if (isD()) {
            colNames.push('Delete');
            colModel.push({ name: 'delete', index: 'delete', width: 5, sortable: false, align: "center", search: false, formatter: function (cv, op, ro) { return jqGridVariables.deleteBtnFmatter(cv, op, ro, 'B2C_PrivacyPolicy') } });
        }
        $("#table_B2C_privacypolicy").jqGrid({
            //data: mydata,
            url: getDomain() + B2C_PrivacyPolicy.variables.BindMasterUrl,
            datatype: "xml",
            height: "100%",
            autowidth: true,
            shrinkToFit: true,
            rowNum: 25,
            rowList: [25, 50, 100],
            colNames: colNames,
            colModel: colModel,
            pager: "#pager_B2C_privacypolicy",
            xmlReader: {
                root: 'POLICYLIST',
                row: 'POLICYDETAILS',
                page: xmlvars.common_response + "CURRENTPAGE",
                total: xmlvars.common_response + "TOTALPAGES",
                records: xmlvars.common_response + "TOTALRECORDS",
                repeatitems: false,
                id: "POLICYNAME"
            },
            loadComplete: function () {
                $("tr.jqgrow:even").addClass('myAltRowClass');
                $("#table_B2C_privacypolicy").jqGrid('setGridHeight', $(window).innerHeight() - 225 - ($("#gbox_table_B2C_privacypolicy").height() - $('#gbox_table_B2C_privacypolicy .ui-jqgrid-bdiv').height()));

                // Hide column headers and top pager if no records were returned
                if ($('#table_B2C_privacypolicy').getGridParam('records') === 0) {
                    $('.ui-jqgrid-htable').hide();
                }
                else
                    $('.ui-jqgrid-htable').show();

                var width = $('#jqGrid_B2C_privacypolicy').width();
                if (width <= 430) {
                    width = 595;
                }
                $('#table_B2C_privacypolicy').setGridWidth(width);
            },
            loadError: OnJqloadError,
            beforeProcessing: OnJqbeforeProcessingErrorcheck,
            viewrecords: true,
            hidegrid: false,
            sortname: 'ORDERBYNAME',
            sortorder: 'asc',
        });

        // Setup buttons
        $("#table_B2C_privacypolicy").jqGrid('navGrid', '#pager_B2C_privacypolicy',
                { edit: false, add: false, del: false, search: false },
                { height: 200 }
        );

        $("#pager_B2C_privacypolicy_left").css("width", "");
        AlignJqGridHeader('table_B2C_privacypolicy', ['edit', 'delete', 'ORDERBYNAME']);
    },
    triggerInitialClick: function () {

        B2C_PrivacyPolicy.initializeJqgrid();
        B2C_PrivacyPolicy.clearControls();

    },
    triggerId: function (id, oper) {
        B2C_PrivacyPolicy.variables.Oper = 'Edit';
        var rowData = jQuery("#table_B2C_privacypolicy").getRowData(id);
        $("#hdnprivacypolicyid").val(rowData['POLICYNAME']);
        $("#txtdisplayorderpolicy").val(rowData['ORDERBYNAME']);
        $("#txtpolicyname").val(rowData['POLICYNAME']);

        var myfilter = { rules: [] };
        myfilter.rules.push({ field: "ORDERBYNAME", op: "eq", data: id });
        $.ajax({
            url: getDomain() + "/Common/BindMastersDetails?ServiceName=B2C_PRIVACYPOLICY_GET&myfilters=" + JSON.stringify(myfilter),
            async: false,
            cache: false,
            type: 'POST',
            success: function (data) {
                $("#dispolicydiv").html("");
                if ($(data).find('RESPONSECODE').text() == "0") {
                    var JsonObject = xml2json.parser(data);
                    if (JsonObject.serviceresponse.policylist.policydetails.details != undefined) {
                        var list;
                        if (JsonObject.serviceresponse.policylist.policydetails.details.detailsprivacy.length > 1)
                            list = JsonObject.serviceresponse.policylist.policydetails.details.detailsprivacy;
                        else
                            list = JsonObject.serviceresponse.policylist.policydetails.details;
                        $.each(list, function (key, innerjsonDetails) {
                            var cnt = $('#dispolicydiv').find('tr').length + 1;
                            $("#dispolicydiv").append(" <tr id=''>" +
                                            "<td class='col-sm-1 text-center' id='rownum" + B2C_PrivacyPolicy.variables.Count + "'>" + innerjsonDetails.orderbydescription + "</td>" +
                                            "<td class='col-sm-6'>" +
                                            "<textarea rows='2' id='ddlprivacydesc" + B2C_PrivacyPolicy.variables.Count + "' class='ddlprivacydesc form-control' value='" + innerjsonDetails.description + "'>" + innerjsonDetails.description +
                                            "</textarea>" +
                                            "</td>" +
                                            "<td class='col-sm-1 permissiondltprivacybtn text-center'>" +
                                            "    <a href='javascript:void(0);' onclick='deletethisprivacy(this);'" +
                                            "       data-original-title='delete record' class='btn btn-danger tooltip1'><i class='fa fa-trash'></i></a>" +
                                            "</td>" +
                                     "</tr>");

                            //$("#txtalreadymakingdesigns").val(innerjsonDetails.itemmakingdays);
                            B2C_PrivacyPolicy.variables.Count++;

                        });
                    }
                }
                else {
                    InvalidResponseCode(data);
                }
            },
            error: OnError
        });
        $("#panelB2C_privacypolicyEdit").show();
        $("#panelB2C_privacypolicyList").hide();
        B2C_PrivacyPolicy.showTitlePermissionWise(oper);
    },
    deleteRow: function (id) {
        $.confirm({
            'title': 'Delete Policy Details',
            'message': 'You are about to delete this Policy Detail. It can not be restored at a later time! Continue? ',
            'buttons': {
                'Yes': {
                    'class': 'yes',
                    'action': function () {
                        var dataP = {
                            NAME: id,
                            oper: 'delete'
                        };
                        $.ajax({
                            url: getDomain() + "/Common/OpeartionsOnMaster?ServiceName=B2C_PRIVACYPOLICY_CRUD",
                            type: "POST",
                            data: dataP,
                            async: false,
                            cache: false,
                            success: function (result) {
                                if ($(result).find('RESPONSECODE').text() == "0") {
                                    notificationMessage('Save Operation', 'Record is deleted successfully', 'success');
                                    $("#table_B2C_privacypolicy").trigger("reloadGrid", [{ current: true }]);
                                }
                                else
                                    notificationMessage('Error', $(result).find('RESPONSEMESSAGE').text(), 'error');
                            },
                            error: OnError
                        });
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
    btnMasterShowAddPanel: function () {
        B2C_PrivacyPolicy.clearControls();
        $("#panelB2C_privacypolicyEdit").show();
        $("#panelB2C_privacypolicyList").hide();

        B2C_PrivacyPolicy.showTitlePermissionWise('add');
    },
    btnMasterSubmit: function () {
        var isValid = $("#frmB2C_privacypolicy").valid();
        var i;

        for (i = 1; i <= $('#dispolicydiv tr').length ; i++) {
            if ($("#ddlprivacydesc" + i).val() == "" || $("#ddlprivacydesc" + i).val() == null) {
                $("#ddlprivacydesc" + i).addClass("tablerror");
                isValid = false;
            }
            else {
                $("#ddlprivacydesc" + i).removeClass("tablerror");
            }
        }
        if (!isValid)
            return;
        var xmlsaveFiles = "<DETAILLIST>";
        var typeselect, disonperorrs;
        var resultXml = makeFileXmlPrivacy('#dispolicydiv');
        xmlsaveFiles += resultXml.xmlsaveFiles;
        xmlsaveFiles += "</DETAILLIST>";

        var data = {
            "oper": B2C_PrivacyPolicy.variables.Oper,
            "NAME": $("#txtpolicyname").val(),
            "ORDERBYNAME": $("#txtdisplayorderpolicy").val(),
            "OLDNAME": $("#hdnprivacypolicyid").val(),
            "XMLPARAM": escape(xmlsaveFiles)
        }
        B2C_PrivacyPolicy.savedata(data);
    },
    clearControls: function () {
        $("#panelB2C_privacypolicyEdit").hide();
        $("#panelB2C_privacypolicyList").show();
        $("#hdnprivacypolicyid").val("");
        $("#dispolicydiv").html("");
        $("#txtpolicyname").val("");
        $("#txtdisplayorderpolicy").val("");
        B2C_PrivacyPolicy.variables.Oper = "";
        $("#frmB2C_privacypolicy").validate().resetForm();
        B2C_PrivacyPolicy.variables.Count = "1";
        jQuery("#table_B2C_privacypolicy").jqGrid('resetSelection');
    },
    savedata: function (data) {
        $.ajax({
            url: getDomain() + B2C_PrivacyPolicy.variables.PerformMasterOperationUrl,
            data: data,
            async: true,
            cache: false,
            type: 'POST',
            success: B2C_PrivacyPolicy.btnMasterSubmitOnSuccess,
            error: OnError
        });
    },
    btnMasterSubmitOnSuccess: function (data) {
        if ($(data).find('RESPONSECODE').text() == "0") {
            notificationMessage('', 'Record is saved successfully', 'success');
            B2C_PrivacyPolicy.clearControls();
            $("#table_B2C_privacypolicy").trigger("reloadGrid", [{ current: true }]);
        }
        else if ($(data).find('RESPONSECODE').text() == "-4") {
            notificationMessage('', $(data).find('RESPONSEMESSAGE').text(), 'error');
        }
        else {
            InvalidResponseCode(data);
        }
    },
    showTitlePermissionWise: function (oper) {
        if (oper == 'edit' || oper == 'add') {
            $("#btnSaveprivacypolicy").show();
            //$("#dB2C_Main_OrderActionTitle").show();
            //$(".permissiondltprivacybtn").hide();
        }
        else {
            if ($("#btnSaveprivacypolicy").length > 0) {
                $("#btnSaveprivacypolicy").hide();
            }
            // $(".permissiondltprivacybtn").show();
            //$("#dB2C_Main_OrderActionTitle").hide();
        }
    },
};
var B2C_TermsCondition = {
    variables: {
        BindMasterUrl: "/Common/BindMastersDetails?ServiceName=B2C_TERMSANDCONDITION_GET",
        PerformMasterOperationUrl: "/Common/OpeartionsOnMaster?ServiceName=B2C_TERMSANDCONDITION_CRUD",
        Oper: '',
        addedit: "added",
        Masterid: "",
        Count: 1,
    },
    initializeJqgrid: function () {
        var colNames = ['Name', 'Order By Name'];
        var colModel = [
             { name: "NAME", index: "NAME", width: 70, xmlmap: 'TERMSLIST>TERMSDETAILS>' + "NAME", stype: 'text', sortable: false, search: false },
             { name: "ORDERBYNAME", index: "ORDERBYNAME", width: 15, align: "center", xmlmap: 'TERMSLIST>TERMSDETAILS>' + "ORDERBYNAME", stype: 'text', sortable: false, search: false },
        ];
        if (isU()) {
            colNames.push('Edit');
            colModel.push({ name: 'edit', index: 'edit', width: 5, sortable: false, align: "center", search: false, formatter: function (cv, op, ro) { return jqGridVariables.editBtnFmatter(cv, op, ro, 'B2C_TermsCondition', 'edit') } });
        }
        else {
            colNames.push('View');
            colModel.push({ name: 'edit', index: 'edit', width: 5, sortable: false, align: "center", search: false, formatter: function (cv, op, ro) { return jqGridVariables.editBtnFmatter(cv, op, ro, 'B2C_TermsCondition', 'view') } });
        }
        if (isD()) {
            colNames.push('Delete');
            colModel.push({ name: 'delete', index: 'delete', width: 10, sortable: false, align: "center", search: false, formatter: function (cv, op, ro) { return jqGridVariables.deleteBtnFmatter(cv, op, ro, 'B2C_TermsCondition') } });
        }
        $("#table_B2C_TermsCondition").jqGrid({
            //data: mydata,
            url: getDomain() + B2C_TermsCondition.variables.BindMasterUrl,
            datatype: "xml",
            height: "100%",
            autowidth: true,
            shrinkToFit: true,
            rowNum: 25,
            rowList: [25, 50, 100],
            colNames: colNames,
            colModel: colModel,
            pager: "#pager_B2C_TermsCondition",
            xmlReader: {
                root: 'TERMSLIST',
                row: 'TERMSDETAILS',
                page: xmlvars.common_response + "CURRENTPAGE",
                total: xmlvars.common_response + "TOTALPAGES",
                records: xmlvars.common_response + "TOTALRECORDS",
                repeatitems: false,
                id: "NAME"
            },
            loadComplete: function () {
                $("tr.jqgrow:even").addClass('myAltRowClass');
                $("#table_B2C_TermsCondition").jqGrid('setGridHeight', $(window).innerHeight() - 225 - ($("#gbox_table_B2C_TermsCondition").height() - $('#gbox_table_B2C_TermsCondition .ui-jqgrid-bdiv').height()));

                // Hide column headers and top pager if no records were returned
                if ($('#table_B2C_TermsCondition').getGridParam('records') === 0) {
                    $('.ui-jqgrid-htable').hide();
                }
                else
                    $('.ui-jqgrid-htable').show();

                var width = $('#jqGrid_B2C_TermsCondition').width();
                if (width <= 430) {
                    width = 595;
                }
                $('#table_B2C_TermsCondition').setGridWidth(width);
            },
            loadError: OnJqloadError,
            beforeProcessing: OnJqbeforeProcessingErrorcheck,
            viewrecords: true,
            hidegrid: false,
            sortname: 'ORDERBYNAME',
            sortorder: 'asc',
        });

        // Setup buttons
        $("#table_B2C_TermsCondition").jqGrid('navGrid', '#pager_B2C_TermsCondition',
                { edit: false, add: false, del: false, search: false },
                { height: 200 }
        );

        $("#pager_B2C_TermsCondition_left").css("width", "");
        AlignJqGridHeader('table_B2C_TermsCondition', ['edit', 'delete', 'ORDERBYNAME']);
    },
    triggerInitialClick: function () {

        B2C_TermsCondition.initializeJqgrid();
        B2C_TermsCondition.clearControls();

    },
    triggerId: function (id, oper) {
        B2C_TermsCondition.variables.Oper = 'Edit';
        var rowData = jQuery("#table_B2C_TermsCondition").getRowData(id);
        $("#hdnTermsConditionid").val(rowData['NAME']);
        $("#txtdisplayorderTermsCondition").val(rowData['ORDERBYNAME']);
        $("#txtTermsConditionname").val(rowData['NAME']);

        var myfilter = { rules: [] };
        myfilter.rules.push({ field: "ORDERBYNAME", op: "eq", data: id });
        $.ajax({
            url: getDomain() + "/Common/BindMastersDetails?ServiceName=B2C_TERMSANDCONDITION_GET&myfilters=" + JSON.stringify(myfilter),
            async: false,
            cache: false,
            type: 'POST',
            success: function (data) {
                $("#disTermsConditiondiv").html("");
                if ($(data).find('RESPONSECODE').text() == "0") {
                    var JsonObject = xml2json.parser(data);
                    if (JsonObject.serviceresponse.termslist.termsdetails.details != undefined) {
                        var list;
                        if (JsonObject.serviceresponse.termslist.termsdetails.details.detailsterms.length > 1)
                            list = JsonObject.serviceresponse.termslist.termsdetails.details.detailsterms;
                        else
                            list = JsonObject.serviceresponse.termslist.termsdetails.details;
                        $.each(list, function (key, innerjsonDetails) {
                            var cnt = $('#disTermsConditiondiv').find('tr').length + 1;
                            $("#disTermsConditiondiv").append(" <tr id=''>" +
                                            "<td class='col-sm-1 text-center' id='rownum" + B2C_TermsCondition.variables.Count + "'>" + innerjsonDetails.orderbydescription + "</td>" +
                                            "<td class='col-sm-6'>" +
                                            "<textarea rows='2' id='ddlTermsConditiondesc" + B2C_TermsCondition.variables.Count + "' class='ddlTermsConditiondesc form-control' value='" + innerjsonDetails.description + "'>" + innerjsonDetails.description +
                                            "</textarea>" +
                                            "</td>" +
                                            "<td class='col-sm-1 permissiondltTermsConditionbtn text-center'>" +
                                            "    <a href='javascript:void(0);' onclick='deletethisTermsCondition(this);'" +
                                            "       data-original-title='delete record' class='btn btn-danger tooltip1'><i class='fa fa-trash'></i></a>" +
                                            "</td>" +
                                     "</tr>");

                            //$("#txtalreadymakingdesigns").val(innerjsonDetails.itemmakingdays);
                            B2C_TermsCondition.variables.Count++;

                        });
                    }
                }
                else {
                    InvalidResponseCode(data);
                }
            },
            error: OnError
        });
        $("#panelB2C_TermsConditionEdit").show();
        $("#panelB2C_TermsConditionList").hide();
        B2C_TermsCondition.showTitlePermissionWise(oper);
    },
    deleteRow: function (id) {
        $.confirm({
            'title': 'Delete Terms & Condition Details',
            'message': 'You are about to delete this Terms & Condition Detail. It can not be restored at a later time! Continue? ',
            'buttons': {
                'Yes': {
                    'class': 'yes',
                    'action': function () {
                        var dataP = {
                            NAME: id,
                            oper: 'delete'
                        };
                        $.ajax({
                            url: getDomain() + "/Common/OpeartionsOnMaster?ServiceName=B2C_TERMSANDCONDITION_CRUD",
                            type: "POST",
                            data: dataP,
                            async: false,
                            cache: false,
                            success: function (result) {
                                if ($(result).find('RESPONSECODE').text() == "0") {
                                    notificationMessage('Save Operation', 'Record is deleted successfully', 'success');
                                    $("#table_B2C_TermsCondition").trigger("reloadGrid", [{ current: true }]);
                                }
                                else
                                    notificationMessage('Error', $(result).find('RESPONSEMESSAGE').text(), 'error');
                            },
                            error: OnError
                        });
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
    btnMasterShowAddPanel: function () {
        B2C_TermsCondition.clearControls();
        $("#panelB2C_TermsConditionEdit").show();
        $("#panelB2C_TermsConditionList").hide();

        B2C_TermsCondition.showTitlePermissionWise('add');
    },
    btnMasterSubmit: function () {
        var isValid = $("#frmB2C_TermsCondition").valid();
        var i;

        for (i = 1; i <= $('#disTermsConditiondiv tr').length ; i++) {
            if ($("#ddlTermsConditiondesc" + i).val() == "" || $("#ddlTermsConditiondesc" + i).val() == null) {
                $("#ddlTermsConditiondesc" + i).addClass("tablerror");
                isValid = false;
            }
            else {
                $("#ddlTermsConditiondesc" + i).removeClass("tablerror");
            }
        }
        if (!isValid)
            return;
        var xmlsaveFiles = "<DETAILLIST>";
        var typeselect, disonperorrs;
        var resultXml = makeFileXmlTermsCondition('#disTermsConditiondiv');
        xmlsaveFiles += resultXml.xmlsaveFiles;
        xmlsaveFiles += "</DETAILLIST>";

        var data = {
            "oper": B2C_TermsCondition.variables.Oper,
            "NAME": $("#txtTermsConditionname").val(),
            "ORDERBYNAME": $("#txtdisplayorderTermsCondition").val(),
            "OLDNAME": $("#hdnTermsConditionid").val(),
            "XMLPARAM": escape(xmlsaveFiles)
        }
        B2C_TermsCondition.savedata(data);
    },
    clearControls: function () {
        $("#panelB2C_TermsConditionEdit").hide();
        $("#panelB2C_TermsConditionList").show();
        $("#hdnTermsConditionid").val("");
        $("#disTermsConditiondiv").html("");
        $("#txtTermsConditionname").val("");
        $("#txtdisplayorderTermsCondition").val("");
        B2C_TermsCondition.variables.Oper = "";
        $("#frmB2C_TermsCondition").validate().resetForm();
        B2C_TermsCondition.variables.Count = "1";
        jQuery("#table_B2C_TermsCondition").jqGrid('resetSelection');
    },
    savedata: function (data) {
        $.ajax({
            url: getDomain() + B2C_TermsCondition.variables.PerformMasterOperationUrl,
            data: data,
            async: true,
            cache: false,
            type: 'POST',
            success: B2C_TermsCondition.btnMasterSubmitOnSuccess,
            error: OnError
        });
    },
    btnMasterSubmitOnSuccess: function (data) {
        if ($(data).find('RESPONSECODE').text() == "0") {
            notificationMessage('', 'Record is saved successfully', 'success');
            B2C_TermsCondition.clearControls();
            $("#table_B2C_TermsCondition").trigger("reloadGrid", [{ current: true }]);
        }
        else if ($(data).find('RESPONSECODE').text() == "-4") {
            notificationMessage('', $(data).find('RESPONSEMESSAGE').text(), 'error');
        }
        else {
            InvalidResponseCode(data);
        }
    },
    showTitlePermissionWise: function (oper) {
        if (oper == 'edit' || oper == 'add') {
            $("#btnSaveTermsCondition").show();
            //$("#dB2C_Main_OrderActionTitle").show();
            // $(".permissiondltTermsConditionbtn").hide();
        }
        else {
            if ($("#btnSaveTermsCondition").length > 0) {
                $("#btnSaveTermsCondition").hide();
            }
            // $(".permissiondltTermsConditionbtn").show();
            //$("#dB2C_Main_OrderActionTitle").hide();
        }
    },
};
var B2C_FAQ = {
    variables: {
        BindMasterUrl: "/Common/BindMastersDetails?ServiceName=B2C_FAQ_GET",
        PerformMasterOperationUrl: "/Common/OpeartionsOnMaster?ServiceName=B2C_FAQ_CRUD",
        Oper: '',
        addedit: "added",
        Masterid: "",
        Count: 1,
    },
    initializeJqgrid: function () {
        var colNames = ['Name', 'Order By Name'];
        var colModel = [
             { name: "TITLE", index: "TITLE", width: 70, xmlmap: 'FAQLIST>FAQDETAIL>' + "TITLE", stype: 'text', sortable: false, search: false },
             { name: "ORDERBYTITLE", index: "ORDERBYTITLE", width: 10, align: "center", xmlmap: 'FAQLIST>FAQDETAIL>' + "ORDERBYTITLE", stype: 'text', sortable: false, search: false },
        ];
        if (isU()) {
            colNames.push('Edit');
            colModel.push({ name: 'edit', index: 'edit', width: 3, sortable: false, align: "center", search: false, formatter: function (cv, op, ro) { return jqGridVariables.editBtnFmatter(cv, op, ro, 'B2C_FAQ', 'edit') } });
        }
        else {
            colNames.push('View');
            colModel.push({ name: 'edit', index: 'edit', width: 3, sortable: false, align: "center", search: false, formatter: function (cv, op, ro) { return jqGridVariables.editBtnFmatter(cv, op, ro, 'B2C_FAQ', 'view') } });
        }
        if (isD()) {
            colNames.push('Delete');
            colModel.push({ name: 'delete', index: 'delete', width: 5, sortable: false, align: "center", search: false, formatter: function (cv, op, ro) { return jqGridVariables.deleteBtnFmatter(cv, op, ro, 'B2C_FAQ') } });
        }
        $("#table_B2C_FAQ").jqGrid({
            //data: mydata,
            url: getDomain() + B2C_FAQ.variables.BindMasterUrl,
            datatype: "xml",
            height: "100%",
            autowidth: true,
            shrinkToFit: true,
            rowNum: 25,
            rowList: [25, 50, 100],
            colNames: colNames,
            colModel: colModel,
            pager: "#pager_B2C_FAQ",
            xmlReader: {
                root: 'FAQLIST',
                row: 'FAQDETAIL',
                page: xmlvars.common_response + "CURRENTPAGE",
                total: xmlvars.common_response + "TOTALPAGES",
                records: xmlvars.common_response + "TOTALRECORDS",
                repeatitems: false,
                id: "TITLE"
            },
            loadComplete: function () {
                $("tr.jqgrow:even").addClass('myAltRowClass');
                $("#table_B2C_FAQ").jqGrid('setGridHeight', $(window).innerHeight() - 225 - ($("#gbox_table_B2C_FAQ").height() - $('#gbox_table_B2C_FAQ .ui-jqgrid-bdiv').height()));

                // Hide column headers and top pager if no records were returned
                if ($('#table_B2C_FAQ').getGridParam('records') === 0) {
                    $('.ui-jqgrid-htable').hide();
                }
                else
                    $('.ui-jqgrid-htable').show();

                var width = $('#jqGrid_B2C_FAQ').width();
                if (width <= 430) {
                    width = 595;
                }
                $('#table_B2C_FAQ').setGridWidth(width);
            },
            loadError: OnJqloadError,
            beforeProcessing: OnJqbeforeProcessingErrorcheck,
            viewrecords: true,
            hidegrid: false,
            sortname: 'ORDERBYTITLE',
            sortorder: 'asc',
        });

        // Setup buttons
        $("#table_B2C_FAQ").jqGrid('navGrid', '#pager_B2C_FAQ',
                { edit: false, add: false, del: false, search: false },
                { height: 200 }
        );

        $("#pager_B2C_FAQ_left").css("width", "");
        AlignJqGridHeader('table_B2C_FAQ', ['edit', 'delete', 'ORDERBYTITLE']);
    },
    triggerInitialClick: function () {

        B2C_FAQ.initializeJqgrid();
        B2C_FAQ.clearControls();

    },
    triggerId: function (id, oper) {
        B2C_FAQ.variables.Oper = 'Edit';
        var rowData = jQuery("#table_B2C_FAQ").getRowData(id);
        $("#hdnFAQid").val(rowData['TITLE']);
        $("#txtdisplayorderFAQ").val(rowData['ORDERBYTITLE']);
        $("#txtFAQname").val(rowData['TITLE']);

        var myfilter = { rules: [] };
        myfilter.rules.push({ field: "ORDERBYTITLE", op: "eq", data: id });
        $.ajax({
            url: getDomain() + "/Common/BindMastersDetails?ServiceName=B2C_FAQ_GET&myfilters=" + JSON.stringify(myfilter),
            async: false,
            cache: false,
            type: 'POST',
            success: function (data) {
                $("#disFAQdiv").html("");
                if ($(data).find('RESPONSECODE').text() == "0") {
                    var JsonObject = xml2json.parser(data);
                    if (JsonObject.serviceresponse.faqlist.faqdetail.details != undefined) {
                        var list;
                        if (JsonObject.serviceresponse.faqlist.faqdetail.details.detailsfaq.length > 1)
                            list = JsonObject.serviceresponse.faqlist.faqdetail.details.detailsfaq;
                        else
                            list = JsonObject.serviceresponse.faqlist.faqdetail.details;
                        $.each(list, function (key, innerjsonDetails) {
                            var cnt = $('#disFAQdiv').find('tr').length + 1;
                            $("#disFAQdiv").append(" <tr id=''>" +
                                            "<td class='col-sm-1 text-center' id='rownum" + B2C_FAQ.variables.Count + "'>" + innerjsonDetails.orderbyques + "</td>" +
                                            "<td class='col-sm-4'>" +
                                            "<textarea rows='2' id='ddlFAQdesc" + B2C_FAQ.variables.Count + "' class='ddlFAQdesc form-control' value='" + innerjsonDetails.question + "'>" + innerjsonDetails.question +
                                            "</textarea>" +
                                            "</td>" +
                                            "<td class='col-sm-4'>" +
                                            "<textarea rows='2' id='ddlFAQans" + B2C_FAQ.variables.Count + "' class='ddlFAQans form-control' value='" + innerjsonDetails.answer + "'>" + innerjsonDetails.answer +
                                            "</textarea>" +
                                            "</td>" +
                                            "<td class='col-sm-1 permissiondltFAQbtn text-center'>" +
                                            "    <a href='javascript:void(0);' onclick='deletethisFAQ(this);'" +
                                            "       data-original-title='delete record' class='btn btn-danger tooltip1'><i class='fa fa-trash'></i></a>" +
                                            "</td>" +
                                     "</tr>");

                            //$("#txtalreadymakingdesigns").val(innerjsonDetails.itemmakingdays);
                            B2C_FAQ.variables.Count++;

                        });
                    }
                }
                else {
                    InvalidResponseCode(data);
                }
            },
            error: OnError
        });
        $("#panelB2C_FAQEdit").show();
        $("#panelB2C_FAQList").hide();
        B2C_FAQ.showTitlePermissionWise(oper);
    },
    deleteRow: function (id) {
        $.confirm({
            'title': 'Delete FAQ Details',
            'message': 'You are about to delete this FAQ Detail. It can not be restored at a later time! Continue? ',
            'buttons': {
                'Yes': {
                    'class': 'yes',
                    'action': function () {
                        var dataP = {
                            TITLE: id,
                            oper: 'delete'
                        };
                        $.ajax({
                            url: getDomain() + "/Common/OpeartionsOnMaster?ServiceName=B2C_FAQ_CRUD",
                            type: "POST",
                            data: dataP,
                            async: false,
                            cache: false,
                            success: function (result) {
                                if ($(result).find('RESPONSECODE').text() == "0") {
                                    notificationMessage('Save Operation', 'Record is deleted successfully', 'success');
                                    $("#table_B2C_FAQ").trigger("reloadGrid", [{ current: true }]);
                                }
                                else
                                    notificationMessage('Error', $(result).find('RESPONSEMESSAGE').text(), 'error');
                            },
                            error: OnError
                        });
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
    btnMasterShowAddPanel: function () {
        B2C_FAQ.clearControls();
        $("#panelB2C_FAQEdit").show();
        $("#panelB2C_FAQList").hide();

        B2C_FAQ.showTitlePermissionWise('add');
    },
    btnMasterSubmit: function () {
        var isValid = $("#frmB2C_FAQ").valid();
        var i;

        for (i = 1; i <= $('#disFAQdiv tr').length ; i++) {
            if ($("#ddlFAQdesc" + i).val() == "" || $("#ddlFAQdesc" + i).val() == null) {
                $("#ddlFAQdesc" + i).addClass("tablerror");
                isValid = false;
            }
            else {
                $("#ddlFAQdesc" + i).removeClass("tablerror");
            }
            if ($("#ddlFAQans" + i).val() == "" || $("#ddlFAQans" + i).val() == null) {
                $("#ddlFAQans" + i).addClass("tablerror");
                isValid = false;
            }
            else {
                $("#ddlFAQans" + i).removeClass("tablerror");
            }
        }
        if (!isValid)
            return;
        var xmlsaveFiles = "<DETAILLIST>";
        var typeselect, disonperorrs;
        var resultXml = makeFileXmlFAQ('#disFAQdiv');
        xmlsaveFiles += resultXml.xmlsaveFiles;
        xmlsaveFiles += "</DETAILLIST>";

        var data = {
            "oper": B2C_FAQ.variables.Oper,
            "TITLE": $("#txtFAQname").val(),
            "ORDERBYTITLE": $("#txtdisplayorderFAQ").val(),
            "OLDTITLE": $("#hdnFAQid").val(),
            "XMLPARAM": escape(xmlsaveFiles)
        }
        B2C_FAQ.savedata(data);
    },
    clearControls: function () {
        $("#panelB2C_FAQEdit").hide();
        $("#panelB2C_FAQList").show();
        $("#hdnFAQid").val("");
        $("#disFAQdiv").html("");
        $("#txtFAQname").val("");
        $("#txtdisplayorderFAQ").val("");
        B2C_FAQ.variables.Oper = "";
        $("#frmB2C_FAQ").validate().resetForm();
        B2C_FAQ.variables.Count = "1";
        jQuery("#table_B2C_FAQ").jqGrid('resetSelection');
    },
    savedata: function (data) {
        $.ajax({
            url: getDomain() + B2C_FAQ.variables.PerformMasterOperationUrl,
            data: data,
            async: true,
            cache: false,
            type: 'POST',
            success: B2C_FAQ.btnMasterSubmitOnSuccess,
            error: OnError
        });
    },
    btnMasterSubmitOnSuccess: function (data) {
        if ($(data).find('RESPONSECODE').text() == "0") {
            notificationMessage('', 'Record is saved successfully', 'success');
            B2C_FAQ.clearControls();
            $("#table_B2C_FAQ").trigger("reloadGrid", [{ current: true }]);
        }
        else if ($(data).find('RESPONSECODE').text() == "-4") {
            notificationMessage('', $(data).find('RESPONSEMESSAGE').text(), 'error');
        }
        else {
            InvalidResponseCode(data);
        }
    },
    showTitlePermissionWise: function (oper) {
        if (oper == 'edit' || oper == 'add') {
            $("#btnSaveFAQ").show();
            //$("#dB2C_Main_OrderActionTitle").show();
            // $(".permissiondltFAQbtn").hide();
        }
        else {
            if ($("#btnSaveFAQ").length > 0) {
                $("#btnSaveFAQ").hide();
            }
            // $(".permissiondltFAQbtn").show();
            //$("#dB2C_Main_OrderActionTitle").hide();
        }
    },
};
function makeFileXml(saveDiv) {
    var i = 1;
    var xmlsaveFiles = '';
    $(saveDiv).find('tr').each(function (key, obj) {
        xmlsaveFiles += '<DETAILS>';
        xmlsaveFiles += '<ROWNO>' + i + '</ROWNO>';
        xmlsaveFiles += '<STATEID>' + $(obj).find('.ddlstatedrop').val() + '</STATEID>';
        xmlsaveFiles += '<EXTRADAYS>' + $(obj).find('.ddlextra').val() + '</EXTRADAYS>';
        xmlsaveFiles += '</DETAILS>';
        i++;
    });
    return { xmlsaveFiles: xmlsaveFiles };
}
function makeFileXmlPrivacy(saveDiv) {
    var i = 1;
    var xmlsaveFiles = '';
    $(saveDiv).find('tr').each(function (key, obj) {
        xmlsaveFiles += '<DETAILS>';
        xmlsaveFiles += '<ROWNO>' + i + '</ROWNO>';
        xmlsaveFiles += '<DESCRIPTION>' + $(obj).find('.ddlprivacydesc').val() + '</DESCRIPTION>';
        xmlsaveFiles += '</DETAILS>';
        i++;
    });
    return { xmlsaveFiles: xmlsaveFiles };
}
function makeFileXmlFAQ(saveDiv) {
    var i = 1;
    var xmlsaveFiles = '';
    $(saveDiv).find('tr').each(function (key, obj) {
        xmlsaveFiles += '<DETAILS>';
        xmlsaveFiles += '<ROWNO>' + i + '</ROWNO>';
        xmlsaveFiles += '<QUESTION>' + $(obj).find('.ddlFAQdesc').val() + '</QUESTION>';
        xmlsaveFiles += '<ANSWER>' + $(obj).find('.ddlFAQans').val() + '</ANSWER>';
        xmlsaveFiles += '</DETAILS>';
        i++;
    });
    return { xmlsaveFiles: xmlsaveFiles };
}
function makeFileXmlTermsCondition(saveDiv) {
    var i = 1;
    var xmlsaveFiles = '';
    $(saveDiv).find('tr').each(function (key, obj) {
        xmlsaveFiles += '<DETAILS>';
        xmlsaveFiles += '<ROWNO>' + i + '</ROWNO>';
        xmlsaveFiles += '<DESCRIPTION>' + $(obj).find('.ddlTermsConditiondesc').val() + '</DESCRIPTION>';
        xmlsaveFiles += '</DETAILS>';
        i++;
    });
    return { xmlsaveFiles: xmlsaveFiles };
}
function BindDropdownListState(ddl, optionList, url, selectText) {
    $.ajax({
        url: getDomain() + url,
        async: false,
        cache: false,
        type: 'POST',
        success: function (data) {

            if ($(data).find('RESPONSECODE').text() == "0") {
                if (selectText != '')
                    $("#" + ddl).html("<option value=''>" + selectText + "</option>");
                else
                    $("#" + ddl).html("");
                var JsonObject = xml2json.parser(data);
                if (JsonObject.serviceresponse.detailslist != undefined) {
                    $.each(JsonObject.serviceresponse.detailslist, function (key, innerjsonDetails) {
                        $("#" + ddl).append("<option value='0'>Other</option>");
                        $("#" + ddl).append($("#" + optionList).render(innerjsonDetails));
                    });
                }
            }
            else {
                InvalidResponseCode(data);
            }
        },
        error: OnError
    });
}
function deletethisdays(e) {
    $(e).parent().parent().remove();
}
function deletethisprivacy(e) {
    $(e).parent().parent().remove();
}
function deletethisTermsCondition(e) {
    $(e).parent().parent().remove();
}
function deletethisFAQ(e) {
    $(e).parent().parent().remove();
}

$(document).ready(function () {
    B2C_Main_OrderActionView.triggerInitialClick();

    $("#btnAddnewdays").click(function () {
        var cnt = $('#extradaysdiv').find('tr').length + 1;
        $("#extradaysdiv").append(" <tr id=''>" +
                                            "<td class='col-sm-1 text-center' id='rownum" + b2csettingview.variables.Count + "'>" + cnt + "</td>" +
                                            "<td class='col-sm-3'>" +
                                            "   <select id='ddlstatedrop" + b2csettingview.variables.Count + "' class='ddlstatedrop form-control txtstatename'>" +
                                            "   </select>" +
                                            "</td>" +
                                            "<td class='col-sm-1'>" +
                                            "    <input  id='ddlextra" + b2csettingview.variables.Count + "' type='text' class='ddlextra form-control title' value='' placeholder='Days' />" +
                                            "</td>" +
                                            "<td class='col-sm-1 permissiondltmacbtn text-center'>" +
                                            "    <a href='javascript:void(0);' onclick='deletethisdays(this);'" +
                                            "       data-original-title='delete record' class='btn btn-danger tooltip1'><i class='fa fa-trash'></i></a>" +
                                            "</td>" +
                                     "</tr>");
        BindDropdownListState('ddlstatedrop' + b2csettingview.variables.Count + '', 'DdlStateList', "/Common/BindMastersDetails?ServiceName=MASTER_COUNTRY_STATE_CITY_GET&ColumnRequested=STATE&ISRECORDALL=true&sidx=STATENAME&sord=asc", 'Select State');
        b2csettingview.variables.Count++;
    });
    $("#btnAddnewpolicydes").click(function () {
        var cnt = $('#dispolicydiv').find('tr').length + 1;
        $("#dispolicydiv").append(" <tr id=''>" +
                                            "<td class='col-sm-1 text-center' id='rownum" + B2C_PrivacyPolicy.variables.Count + "'>" + cnt + "</td>" +
                                            "<td class='col-sm-6'>" +
                                            "<textarea rows='2' id='ddlprivacydesc" + B2C_PrivacyPolicy.variables.Count + "' value='' class='ddlprivacydesc form-control'>" +
                                            "</textarea>" +
                                            "</td>" +
                                            "<td class='col-sm-1 permissiondltprivacybtn text-center'>" +
                                            "    <a href='javascript:void(0);' onclick='deletethisprivacy(this);'" +
                                            "       data-original-title='delete record' class='btn btn-danger tooltip1'><i class='fa fa-trash'></i></a>" +
                                            "</td>" +
                                     "</tr>");

        B2C_PrivacyPolicy.variables.Count++;
    });
    $("#btnAddnewTermsConditiondes").click(function () {
        var cnt = $('#disTermsConditiondiv').find('tr').length + 1;
        $("#disTermsConditiondiv").append(" <tr id=''>" +
                                            "<td class='col-sm-1 text-center' id='rownum" + B2C_TermsCondition.variables.Count + "'>" + cnt + "</td>" +
                                            "<td class='col-sm-6'>" +
                                            "<textarea rows='2' id='ddlTermsConditiondesc" + B2C_TermsCondition.variables.Count + "' value='' class='ddlTermsConditiondesc form-control'>" +
                                            "</textarea>" +
                                            "</td>" +
                                            "<td class='col-sm-1 permissiondltTermsConditionbtn text-center'>" +
                                            "    <a href='javascript:void(0);' onclick='deletethisTermsCondition(this);'" +
                                            "       data-original-title='delete record' class='btn btn-danger tooltip1'><i class='fa fa-trash'></i></a>" +
                                            "</td>" +
                                     "</tr>");

        B2C_TermsCondition.variables.Count++;
    });
    $("#navtaborderaction").click(function () {
        B2C_Main_OrderActionView.ClearTab();
        $("#taborderaction").show();
        BindDropdown('statusdropdown', 'DdlStatustype', "/Common/BindMastersDetails?ServiceName=B2C_MAIN_STATIC_ORDERSTATUS_GET", 'Select Status Type');
        B2C_Main_OrderActionView.triggerInitialClick();
    });
    $("#navdatasettinggold").click(function () {
        B2C_Main_OrderActionView.ClearTab();
        $("#tabextracharges").show();
        //b2csettingview.Bindgoldrate();
        b2csettingview.GetCurrencyList();
    });
    $("#navtabdeliverydays").click(function () {
        B2C_Main_OrderActionView.ClearTab();
        $("#tabdelivery").addClass("active");
        $("#tabdelivery").show();
        $("#tabextracharges").hide();
        b2csettingview.BindDeliveryDays();
        if ($('#extradaysdiv').find('tr').length == 0) {

        }
        else {

        }

    });
    $("#navtabprivacypolicy").click(function () {
        B2C_Main_OrderActionView.ClearTab();
        $("#tabprivacypolicy").show();
        B2C_PrivacyPolicy.triggerInitialClick()
    });
    $("#navtabTermsCondition").click(function () {
        B2C_Main_OrderActionView.ClearTab();
        $("#tabTermsCondition").show();
        B2C_TermsCondition.triggerInitialClick()
    });
    $("#navtabFAQ").click(function () {
        B2C_Main_OrderActionView.ClearTab();
        $("#tabFAQ").show();
        B2C_FAQ.triggerInitialClick()
    });
    $("#buttonsettinggold").click(function () {
        //if ($("#txtaddongoldrate").val() == "" && $("#txtgiftcharges").val() == "") {
        //    notificationMessage('Please Select Add on Gold Rate Or Gift Charges', '', 'warning');
        //} else {
        //    b2csettingview.btncrudgold();
        //}
        b2csettingview.SaveExtraCharges();
    });
    $("#buttondeliverydays").click(function () {
        b2csettingview.savedata();
    });
    /*--------------------------------*/
    $("#btnAddB2C_Main_OrderAction").click(function () {
        B2C_Main_OrderActionView.btnMasterShowAddPanel();
    });

    $("#btnSaveB2C_Main_OrderAction").click(function () {
        B2C_Main_OrderActionView.btnMasterSubmit(B2C_Main_OrderActionView.btnMasterSubmitOnSuccess);
    });

    $('#CancelB2C_Main_OrderAction').click(function () {
        B2C_Main_OrderActionView.clearControls();
        $("#frmB2C_Main_OrderAction").validate().resetForm();
    });
    $('#CancelB2C_privacypolicy').click(function () {
        B2C_PrivacyPolicy.clearControls();
    });
    $("#btnSaveprivacypolicy").click(function () {
        B2C_PrivacyPolicy.btnMasterSubmit();
    });
    $("#btnAddB2C_privacypolicy").click(function () {
        B2C_PrivacyPolicy.btnMasterShowAddPanel();
        B2C_PrivacyPolicy.variables.Oper = 'Add';
        var cnt = $('#dispolicydiv').find('tr').length + 1;
        $("#dispolicydiv").append(" <tr id=''>" +
                                            "<td class='col-sm-1 text-center' id='rownum" + B2C_PrivacyPolicy.variables.Count + "'>" + cnt + "</td>" +
                                            "<td class='col-sm-6'>" +
                                            "<textarea rows='2' id='ddlprivacydesc" + B2C_PrivacyPolicy.variables.Count + "' class='ddlprivacydesc form-control'>" +
                                            "</textarea>" +
                                            "</td>" +
                                            "<td class='col-sm-1 permissiondltprivacybtn text-center'>" +
                                            "    <a href='javascript:void(0);' onclick='deletethisprivacy(this);'" +
                                            "       data-original-title='delete record' class='btn btn-danger tooltip1'><i class='fa fa-trash'></i></a>" +
                                            "</td>" +
                                     "</tr>");

        B2C_PrivacyPolicy.variables.Count++;
    });
    $('#CancelB2C_TermsCondition').click(function () {
        B2C_TermsCondition.clearControls();
    });
    $("#btnSaveTermsCondition").click(function () {
        B2C_TermsCondition.btnMasterSubmit();
    });
    $("#btnAddB2C_TermsCondition").click(function () {
        B2C_TermsCondition.btnMasterShowAddPanel();
        B2C_TermsCondition.variables.Oper = 'Add';
        var cnt = $('#dispolicydiv').find('tr').length + 1;
        $("#disTermsConditiondiv").append(" <tr id=''>" +
                                             "<td class='col-sm-1 text-center' id='rownum" + B2C_TermsCondition.variables.Count + "'>" + cnt + "</td>" +
                                             "<td class='col-sm-6'>" +
                                             "<textarea rows='2' id='ddlTermsConditiondesc" + B2C_TermsCondition.variables.Count + "' value='' class='ddlTermsConditiondesc form-control'>" +
                                             "</textarea>" +
                                             "</td>" +
                                             "<td class='col-sm-1 permissiondltTermsConditionbtn text-center'>" +
                                             "    <a href='javascript:void(0);' onclick='deletethisTermsCondition(this);'" +
                                             "       data-original-title='delete record' class='btn btn-danger tooltip1'><i class='fa fa-trash'></i></a>" +
                                             "</td>" +
                                      "</tr>");

        B2C_TermsCondition.variables.Count++;
    });

    /*-------------FAQ START-----------------*/
    $("#btnAddnewFAQdes").click(function () {
        var cnt = $('#disFAQdiv').find('tr').length + 1;
        $("#disFAQdiv").append(" <tr id=''>" +
                                            "<td class='col-sm-1 text-center' id='rownum" + B2C_FAQ.variables.Count + "'>" + cnt + "</td>" +
                                            "<td class='col-sm-4'>" +
                                            "<textarea rows='2' id='ddlFAQdesc" + B2C_FAQ.variables.Count + "' value='' class='ddlFAQdesc form-control'>" +
                                            "</textarea>" +
                                            "</td>" +
                                            "<td class='col-sm-4'>" +
                                            "<textarea rows='2' id='ddlFAQans" + B2C_FAQ.variables.Count + "' value='' class='ddlFAQans form-control'>" +
                                            "</textarea>" +
                                            "</td>" +
                                            "<td class='col-sm-1 permissiondltFAQbtn text-center'>" +
                                            "    <a href='javascript:void(0);' onclick='deletethisFAQ(this);'" +
                                            "       data-original-title='delete record' class='btn btn-danger tooltip1'><i class='fa fa-trash'></i></a>" +
                                            "</td>" +
                                     "</tr>");

        B2C_FAQ.variables.Count++;
    });
    $('#CancelB2C_FAQ').click(function () {
        B2C_FAQ.clearControls();
    });
    $("#btnSaveFAQ").click(function () {
        B2C_FAQ.btnMasterSubmit();
    });
    $("#btnAddB2C_FAQ").click(function () {
        B2C_FAQ.btnMasterShowAddPanel();
        B2C_FAQ.variables.Oper = 'Add';
        var cnt = $('#dispolicydiv').find('tr').length + 1;
        $("#disFAQdiv").append(" <tr id=''>" +
                                             "<td class='col-sm-1 text-center' id='rownum" + B2C_FAQ.variables.Count + "'>" + cnt + "</td>" +
                                             "<td class='col-sm-4'>" +
                                             "<textarea rows='2' id='ddlFAQdesc" + B2C_FAQ.variables.Count + "' value='' class='ddlFAQdesc form-control'>" +
                                             "</textarea>" +
                                             "</td>" +
                                              "<td class='col-sm-4'>" +
                                            "<textarea rows='2' id='ddlFAQans" + B2C_FAQ.variables.Count + "' value='' class='ddlFAQans form-control'>" +
                                            "</textarea>" +
                                            "</td>" +
                                             "<td class='col-sm-1 permissiondltFAQbtn text-center'>" +
                                             "    <a href='javascript:void(0);' onclick='deletethisFAQ(this);'" +
                                             "       data-original-title='delete record' class='btn btn-danger tooltip1'><i class='fa fa-trash'></i></a>" +
                                             "</td>" +
                                      "</tr>");

        B2C_FAQ.variables.Count++;
    });
    /*-------------FAQ END-----------------*/
});