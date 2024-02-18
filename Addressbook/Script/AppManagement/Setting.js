var PrivacyPolicyView = {
    variables: {
        BindMasterurl: "/Common/BindMastersDetails?ServiceName=PRIVACY_POLICY_GET",
        PerformMasterurl: "/Common/OpeartionsOnMaster?ServiceName=PRIVACY_POLICY_CRUD",
        emailnotificationoper: "",
        Oper: 'Add',
        addedit: "added",
        Masterid: "",
        Goldid: "",
        Iplistid: "",
        editgoldBtnFmatter: function (cellvalue, options, rowObject, view, oper) {
            if (isU()) {
                return "<div onclick=\"" + view + ".triggerGoldId('" + options.rowId + "','edit');\"><i  style=\"cursor:pointer;  color:#1cbac8;\" title=\"Edit\" class=\"fa fa-pencil fa-lg\"></i></div>";
            }
            else {
                return "<div onclick=\"" + view + ".triggerGoldId('" + options.rowId + "','view');\"><i style=\"cursor:pointer\" title=\"View\" class=\"hr-font-green fa fa-eye\"></i></div>";
            }
        },

        deletegoldBtnFmatter: function (cellvalue, options, rowObject, view) {
            if (isD()) {
                return "<div  onclick=\"" + view + ".deletegoldRow('" + options.rowId + "');\"><i style=\"cursor:pointer; color:red;\" title=\"Delete\" class=\"fa fa-trash-o fa-lg\"></i></div>";
            }
            else {
                return '';
            }


        },
        editiplistBtnFmatter: function (cellvalue, options, rowObject, view, oper) {
            return "<div onclick=\"" + view + ".triggerIplistId('" + options.rowId + "','edit');\"><i  style=\"cursor:pointer;  color:#1cbac8;\" title=\"Edit\" class=\"fa fa-pencil fa-lg\"></i></div>";
        },
        deleteiplistBtnFmatter: function (cellvalue, options, rowObject, view) {
            return "<div  onclick=\"" + view + ".deleteiplistRow('" + options.rowId + "');\"><i style=\"cursor:pointer; color:red;\" title=\"Delete\" class=\"fa fa-trash-o fa-lg\"></i></div>";
        },
    },

    clearControls: function () {
        $("#PrivacyPolicyBody_error").hide();
        $("#pnlViewPrivacyPolicy").show();
        $('#txtPrivacyPolicyBody').code('');
        $("#txtpolicyeffectivedate").val(""),

        PrivacyPolicyView.variables.Oper = 'Add';
        PrivacyPolicyView.variables.addedit = "added";
        PrivacyPolicyView.variables.Masterid = "";
    },

    /****************Gold Details******************************/

    initializegoldJqgrid: function () {
        var colNames = ['Sr No.', 'Gold Rate', 'Export Gold Rate', 'Effective Date'];
        var colModel = [
                { name: "ROWNUM", index: "ROWNUM", xmlmap: xmlvars.common_colmap + "ROWNUM", width: 5, stype: 'int', sortable: false, hidden: false },
                { name: "GOLD_RATE", index: "GOLD_RATE", width: 8, xmlmap: xmlvars.common_colmap + "GOLD_RATE", stype: "text", sortable: false },
                { name: "EXPORT_RATE", index: "EXPORT_RATE", width: 8, xmlmap: xmlvars.common_colmap + "EXPORT_RATE", stype: "text", sortable: false },
                { name: "GOLD_EFFECTIVE_DATE", index: "GOLD_EFFECTIVE_DATE", width: 20, xmlmap: xmlvars.common_colmap + "GOLD_EFFECTIVE_DATE", sortable: false },

        ];
        if (isU()) {
            colNames.push('Edit');
            colModel.push({ name: 'edit', index: 'edit', width: 2, sortable: false, align: "left", search: false, formatter: function (cv, op, ro) { return PrivacyPolicyView.variables.editgoldBtnFmatter(cv, op, ro, 'PrivacyPolicyView', 'edit') } });
        } else if (isV()) {
            colNames.push('Edit');
            colModel.push({ name: 'edit', index: 'edit', width: 2, sortable: false, align: "left", search: false, formatter: function (cv, op, ro) { return PrivacyPolicyView.variables.editgoldBtnFmatter(cv, op, ro, 'PrivacyPolicyView', 'view') } });
        }
        if (isD()) {
            colNames.push('Delete');
            colModel.push({ name: 'act', index: 'act', width: 2, sortable: false, align: "left", search: false, formatter: function (cv, op, ro) { return PrivacyPolicyView.variables.deletegoldBtnFmatter(cv, op, ro, 'PrivacyPolicyView') } });
        }

        $("#table_list_Gold").jqGrid({
            url: getDomain() + "/Common/BindMastersDetails?ServiceName=GOLD_DETAILS_GET",
            datatype: "xml",
            height: '100%',
            autowidth: true,
            shrinkToFit: true,
            rowNum: 25,
            rowList: [25, 50, 100],
            colNames: colNames,
            colModel: colModel,
            pager: "#pager_list_Gold",
            xmlReader: {
                root: xmlvars.common_root,
                row: xmlvars.common_row,
                page: xmlvars.common_response + "CURRENTPAGE",
                total: xmlvars.common_response + "TOTALPAGES",
                records: xmlvars.common_response + "TOTALRECORDS",
                repeatitems: false,
                id: "GOLD_ID"
            },
            loadComplete: function () {
                $("tr.jqgrow:even").addClass('myAltRowClass');
                $("#table_list_Gold").jqGrid('setGridHeight', $(window).innerHeight() - 250 - ($("#gbox_table_list_Gold").height() - $('#gbox_table_list_Gold .ui-jqgrid-bdiv').height()));

                if ($('#table_list_Gold').getGridParam('records') === 0)
                    $('.ui-jqgrid-htable').hide();
                else
                    $('.ui-jqgrid-htable').show();


                var width = $('#jqGrid_Gold').width();

                if (width <= 430) {
                    width = 900;
                }
                $('#table_list_Gold').setGridWidth(width);
            },
            loadError: OnJqloadError,
            beforeProcessing: OnJqbeforeProcessingErrorcheck,
            viewrecords: true,
            sortname: 'GOLD_ID',
            sortorder: 'desc',

        });

        // Setup buttons
        $("#table_list_Gold").jqGrid('navGrid', '#pager_list_Gold',
                { edit: false, add: false, del: false, search: false },
                { height: 200, reloadAfterSubmit: true }
        );
        $("#pager_list_Gold_left").css("width", "");
        AlignJqGridHeader('table_list_Employeedetails', ['edit']);

    },

    btnMasterSubmitGold: function () {
        PrivacyPolicyView.variables.Oper = 'Add';
        PrivacyPolicyView.variables.addedit = "added";
        PrivacyPolicyView.variables.Goldid = $("#hdngoldid").val();

        if (PrivacyPolicyView.variables.Goldid != "0" && parseInt(PrivacyPolicyView.variables.Goldid) > 0) {
            PrivacyPolicyView.variables.Oper = 'Edit';
            PrivacyPolicyView.variables.addedit = 'updated';
        }


        var data = {
            "oper": PrivacyPolicyView.variables.Oper,
            "GOLD_ID": PrivacyPolicyView.variables.Goldid,
            "GOLD_RATE": $('#txtgoldrate').val(),
            "EXPORT_RATE": $('#txtExportRate').val(),
            "GOLD_EFFECTIVE_DATE": $("#txteffectivedate").val(),
        }

        PrivacyPolicyView.savegolddata(PrivacyPolicyView.variables.Oper, data);
    },

    savegolddata: function (oper, data) {
        $.ajax({
            url: getDomain() + "/Common/OpeartionsOnMaster?ServiceName=GOLD_DETAILS_CRUD",
            data: data,
            async: true,
            cache: false,
            type: 'POST',
            success: PrivacyPolicyView.btnMasterGoldSubmitOnSuccess,
            error: OnError
        });
    },

    btnMasterGoldSubmitOnSuccess: function (data) {
        if ($(data).find('RESPONSECODE').text() == "0") {
            notificationMessage(PrivacyPolicyView.variables.Oper + ' Operation', 'Record is ' + PrivacyPolicyView.variables.addedit + ' successfully', 'success');
            PrivacyPolicyView.clearControls();
            $("#table_list_Gold").trigger("reloadGrid", [{ current: true }]);
            $("#pnlEditGold").hide();
            $("#pnlViewgold").show();
        }
        else {
            InvalidResponseCode(data);
        }
    },

    triggerGoldId: function (id, oper) {
        var rowData = jQuery("#table_list_Gold").getRowData(id);
        PrivacyPolicyView.variables.Goldid = id;
        $('#txtgoldrate').val(rowData['GOLD_RATE']),
        $('#txtExportRate').val(rowData['EXPORT_RATE']),
        $("#txteffectivedate").datepicker('setDate', rowData['GOLD_EFFECTIVE_DATE']);
        $("#hdngoldid").val(id);
        $("#pnlEditGold").show();
        $("#pnlViewgold").hide();
        PrivacyPolicyView.showTitlePermissionWise(oper);
    },
    showTitlePermissionWise: function (oper) {

        if (oper == 'edit' || oper == 'add') {
            $("#btnSavegold").show();

        }
        else {
            if ($("#btnSavegold").length > 0) {
                $("#btnSavegold").hide();
            }

        }
    },
    deletegoldRow: function (id) {
        PrivacyPolicyView.variables.addedit = "deleted";
        PrivacyPolicyView.variables.Oper = "Delete";

        $.confirm({
            'title': 'Delete Gold Details',
            'message': 'You are about to delete this privacy. It can not be restored at a later time! Continue? ',
            'buttons': {
                'Yes': {
                    'class': 'yes',
                    'action': function () {
                        var data = {
                            "oper": PrivacyPolicyView.variables.Oper,
                            "GOLD_ID": id
                        }

                        PrivacyPolicyView.savegolddata(PrivacyPolicyView.variables.Oper, data);

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

    /******************Currency Exchange Rate******************************************/
    GetCurrencyList: function () {
        $.ajax({
            url: getDomain() + "/Common/BindMastersDetails?ServiceName=CURRENCY_EXCHANGERATE_DETAILS_GET",
            async: true,
            cache: false,
            type: 'POST',
            success: function (data) {
                if ($(data).find("RESPONSECODE").text() == "0") {
                    var jsonObject = xml2json.parser(data);
                    if (jsonObject.serviceresponse.detailslist) {
                        $("#tbl_ExchangeRate tbody").html($("#render_CurrencyList").render(jsonObject.serviceresponse.detailslist.details))

                        $(".number").keypress(function () {
                            return numbersOnly(this, event, true, false);
                        })
                    }
                }
            },
            error: OnError
        });
    },
    SaveExchnageRate: function () {
        var IsValid = $("#frm_ExchangeRate").valid();
        if (!IsValid)
            return;

        var XMLList = "<DETAILLIST>";
        XMLList += PrivacyPolicyView.MakeXMLNode();
        XMLList += "</DETAILLIST>";
        var data = {
            XMLPARAM: escape(XMLList)
        }

        $.ajax({
            url: getDomain() + "/Common/OpeartionsOnMaster?ServiceName=CURRENCY_EXCHANGERATE_DETAILS_CRUD",
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
        $("#tbl_ExchangeRate tbody tr").each(function (key, obj) {
            XMLNode += '<DETAILS>';
            XMLNode += '<CURRENCYID>' + $(obj).attr("currencyid") + '</CURRENCYID>';
            XMLNode += '<EXCHANGERATE>' + $(obj).find(".ExRate").val() + '</EXCHANGERATE>';
            XMLNode += '<EXTRACHARGEPER>' + $(obj).find(".ExCharge").val() + '</EXTRACHARGEPER>';
            XMLNode += '</DETAILS>'
        });

        return XMLNode;
    },

    /******************Data Sync******************************************/
    initializedatasyncJqgrid: function () {
        var colNames = ['Data Migrate Id', 'Table Name', 'Sync By', 'Sync Date', 'Error Message'];
        var colModel = [
                { name: "DATAMIGRATEID", index: "DATAMIGRATEID", xmlmap: xmlvars.common_colmap + "DATAMIGRATEID", stype: 'int', sortable: false, hidden: true, search: false },
                { name: "TABLENAME", index: "TABLENAME", width: 50, xmlmap: xmlvars.common_colmap + "TABLENAME", stype: "text", sortable: true, search: true, searchoptions: jqGridVariables.stringSearchOption },
                { name: "CREATEDBYNAME", index: "CREATEDBYNAME", width: 10, xmlmap: xmlvars.common_colmap + "CREATEDBYNAME", sortable: true, search: true, searchoptions: jqGridVariables.stringSearchOption },
                { name: "CREATEDDATE", index: "CREATEDDATE", width: 10, xmlmap: xmlvars.common_colmap + "CREATEDDATE", sortable: true, search: true, searchoptions: jqGridVariables.stringSearchOption },
                { name: "ERRORMESSAGE", index: "ERRORMESSAGE", width: 20, xmlmap: xmlvars.common_colmap + "ERRORMESSAGE", align: 'center', sortable: false, search: false },

        ];

        $("#table_list_Datasync").jqGrid({
            url: getDomain() + "/Common/BindMastersDetails?ServiceName=DATAMIGRATE_GET",
            datatype: "xml",
            height: '100%',
            autowidth: true,
            shrinkToFit: true,
            rowNum: 25,
            rowList: [25, 50, 100],
            colNames: colNames,
            colModel: colModel,
            pager: "#pager_list_Datasync",
            xmlReader: {
                root: xmlvars.common_root,
                row: xmlvars.common_row,
                page: xmlvars.common_response + "CURRENTPAGE",
                total: xmlvars.common_response + "TOTALPAGES",
                records: xmlvars.common_response + "TOTALRECORDS",
                repeatitems: false,
                id: "DATAMIGRATEID"
            },
            loadComplete: function () {
                $("tr.jqgrow:even").addClass('myAltRowClass');
                $("#table_list_Datasync").jqGrid('setGridHeight', $(window).innerHeight() - 250 - ($("#gbox_table_list_Datasync").height() - $('#gbox_table_list_Datasync .ui-jqgrid-bdiv').height()));

                if ($('#table_list_Datasync').getGridParam('records') === 0)
                    $('.ui-jqgrid-htable').hide();
                else
                    $('.ui-jqgrid-htable').show();


                var width = $('#jqGrid_Datasync').width();

                if (width <= 430) {
                    width = 900;
                }
                $('#table_list_Datasync').setGridWidth(width);
            },
            loadError: OnJqloadError,
            beforeProcessing: OnJqbeforeProcessingErrorcheck,
            viewrecords: true,
            sortname: 'DATAMIGRATEID',
            sortorder: 'desc',

        });

        // Setup buttons
        $("#table_list_Datasync").jqGrid('navGrid', '#pager_list_Datasync',
                { edit: false, add: false, del: false, search: true },
                { height: 200, reloadAfterSubmit: true }
        );
        $("#table_list_Datasync_left").css("width", "");
        AlignJqGridHeader('table_list_Datasync', ['edit', 'ERRORMESSAGE']);

    },
    btndatasync: function () {

        var Datacheckvalue = [];
        $('[name="checkdata"]:checked').each(function (i, e) {
            Datacheckvalue.push(e.value);
        });
        Datacheckvalue = Datacheckvalue.join(',');
        if (Datacheckvalue != "") {
            $(".loadingtrinity").show();
            var data = {
                "DATASYNCTABLE": Datacheckvalue,
            }
            PrivacyPolicyView.savedatasync(data)
        }
        else {
            notificationMessage('', 'Please Select At least One Table Name', 'warning');
        }

    },
    savedatasync: function (data) {
        $.ajax({
            url: getDomain() + "/Common/OpeartionsOnMaster?ServiceName=DATA_MIGRATION_ERP_TO_TRINITY",
            data: data,
            async: true,
            cache: false,
            type: 'POST',
            success: PrivacyPolicyView.btnMasterdatasyncSubmitOnSuccess,
            error: OnError
        });
    },
    btnMasterdatasyncSubmitOnSuccess: function (data) {
        $(".loadingtrinity").hide();
        if ($(data).find('RESPONSECODE').text() == "0") {
            notificationMessage('', $(data).find('RESPONSEMESSAGE').text(), 'success');
        }
        else {
            InvalidResponseCode(data);
        }
    },

    /***********************Email Notification***************************************************/
    btnemailnotification: function () {
        var b2bregistration = [];
        $.each($(".b2bregistration option:selected"), function () {
            b2bregistration.push($(this).val());
        });
        var quotationgeneration = [];
        $.each($(".quotationgeneration option:selected"), function () {
            quotationgeneration.push($(this).val());
        });
        var data = {
            "EMAILNOTIFICATIONID": $("#hdnemailnotificationId").val(),
            "B2BNEWREGISTRATION": b2bregistration.join(","),
            "QUOTATIONGENERATION": quotationgeneration.join(","),
        }
        $.ajax({
            url: getDomain() + "/Common/OpeartionsOnMaster?ServiceName=EMAILNOTIFICATION_CRUD",
            data: data,
            async: true,
            cache: false,
            type: 'POST',
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    notificationMessage('', "Email Notification save successfully", 'success');
                }
                else {
                    InvalidResponseCode(data);
                }
            },
            error: OnError
        });
    },
    Bindemailnotification: function () {
        $.ajax({
            url: getDomain() + "/Common/BindMastersDetails?ServiceName=EMAILNOTIFICATION_GET",
            async: false,
            cache: false,
            type: 'POST',
            success: function (data) {

                if ($(data).find('RESPONSECODE').text() == "0") {
                    var JsonObject = xml2json.parser(data);
                    if (JsonObject.serviceresponse.detailslist != undefined) {
                        var b2bstring, quotationstring, b2bvalue, quotvalue;
                        $("#hdnemailnotificationId").val(JsonObject.serviceresponse.detailslist.details.emailnotificationid);
                        b2bstring = JsonObject.serviceresponse.detailslist.details.b2bnewregistration;
                        quotationstring = JsonObject.serviceresponse.detailslist.details.quotationgeneration;
                        if (b2bstring.toString().indexOf(',') > -1) {
                            b2bvalue = b2bstring.split(',');
                        }
                        else {
                            b2bvalue = "" + b2bstring + "".split(',');
                        }
                        if (quotationstring.toString().indexOf(',') > -1) {
                            quotvalue = quotationstring.split(',');
                        }
                        else {
                            quotvalue = "" + quotationstring + "".split(',');
                        }
                        $('#txt_b2bregistration').val(b2bvalue).trigger("change");
                        $('#txt_quotgeneration').val(quotvalue).trigger("change");
                    }
                }
                else {
                    InvalidResponseCode(data);
                }
            },
            error: OnError
        });
    },

    /***********************Email Notification***************************************************/
    SubmitNewDesignDays: function () {
        var IsValid = $("#frmNewDesignDays").valid();
        if (!IsValid)
            return;

        var data = {
            "NEW_DESIGN_DAYS": $("#txt_NewDesignDays").val()
        }

        $.ajax({
            url: getDomain() + "/Common/OpeartionsOnMaster?ServiceName=NEW_DESIGN_DAYS_CRUD",
            data: data,
            async: true,
            cache: false,
            type: 'POST',
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    notificationMessage('', "Days saved successfully", 'success');
                }
                else {
                    InvalidResponseCode(data);
                }
            },
            error: OnError
        });
    },
    BindNewDesignDays: function () {
        $.ajax({
            url: getDomain() + "/Common/BindMastersDetails?ServiceName=NEW_DESIGN_DAYS_GET",
            async: false,
            cache: false,
            type: 'POST',
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    var JsonObject = xml2json.parser(data);
                    if (JsonObject.serviceresponse.detailslist != undefined) {
                        $("#txt_NewDesignDays").val(JsonObject.serviceresponse.detailslist.details.days);
                    }
                }
                else {
                    InvalidResponseCode(data);
                }
            },
            error: OnError
        });
    }
}

function btnaddnewPrivacyPolicy() {
    PrivacyPolicyView.btnMasterShowAddPanel();
}
$(document).ready(function () {
    PrivacyPolicyView.initializegoldJqgrid();
    $("#navtabgold").click(function () {
        PrivacyPolicyView.initializegoldJqgrid();
        $("#tabeamilnotification").hide();
    });
    $("#navprivacypolicy").click(function () {
        PrivacyPolicyView.initializeJqgrid();
        PrivacyPolicyView.clearControls();
    });
    $("#navallowiplist").click(function () {
        PrivacyPolicyView.initializeiplistJqgrid();
    });
    /****************Gold Details******************************/

    $('#txteffectivedate').datepicker({ format: 'dd M yyyy' });
    $('#txteffectivedate').on('change', function () {
        $('.datepicker').hide();
    });

    $("#btnAddNewGold").click(function () {
        $('#txtgoldrate').val("");
        $('#txtExportRate').val("");
        $("#txteffectivedate").val("");
        $("#erroreffactivedate").hide();
        $("#errorgoldrate").hide();
        $("#hdngoldid").val("");
        $("#pnlEditGold").show();
        $("#pnlViewgold").hide();
    });

    $("#btnSavegold").click(function () {
        if (!$("#txtgoldrate").val()) {
            $("#errorgoldrate").show();
        }
        if (!$("#txtExportRate").val()) {
            $("#errorExportRate").show();
        }
        if (!$("#txteffectivedate").val()) {
            $("#erroreffactivedate").show();
        }
        if ($("#txteffectivedate").val() && $("#txtgoldrate").val() && $("#txtExportRate").val()) {
            PrivacyPolicyView.btnMasterSubmitGold();
            $("#erroreffactivedate").hide();
            $("#errorgoldrate").hide();
            $("#errorExportRate").hide();
        }

    });

    $("#btngoldback").click(function () {
        $("#hdngoldid").val("");
        $('#txtgoldrate').val("");
        $('#txtExportRate').val("");
        $("#pnlEditGold").hide();
        $("#pnlViewgold").show();
    });


    /****************Currency Exchange Rate******************************/
    $("#navExchangeRate").click(function () {
        $("#tabgold").hide();
        $("#erroreffactivedate").hide();
        $("#errorgoldrate").hide();
        $("#errorExportRate").hide();
        $("#hdngoldid").val("");
        $('#txtgoldrate').val("");
        $('#txtExportRate').val("");
        $("#pnlEditGold").hide();
        $("#pnlEditPrivacyPolicy").hide();
        $("#pnldatasync").hide();
        $("#tabdatasync").hide();
        $("#tabExchangeRate").addClass('active');
        $("#tabExchangeRate").show();
        $("#tabeamilnotification").hide();
        $("#tabNewDesignDays").hide();

        PrivacyPolicyView.GetCurrencyList();
    });
    $("#btnSaveExchangeRate").click(function () {
        PrivacyPolicyView.SaveExchnageRate();
    });
    /****************Data Sync******************************/

    $("#btn_datasync").click(function () {
        PrivacyPolicyView.btndatasync();
    });
    $("#navdatasync").click(function () {
        $("#tabgold").hide();
        $("#erroreffactivedate").hide();
        $("#errorgoldrate").hide();
        $("#hdngoldid").val("");
        $('#txtgoldrate').val("");
        $("#pnlEditGold").hide();
        $("#pnlEditPrivacyPolicy").hide();
        $("#pnldatasync").show();
        $("#tabdatasync").show();
        $("#tabdatasync").addClass('active');
        $("#tabeamilnotification").hide();
        $("#tabNewDesignDays").hide();
        PrivacyPolicyView.initializedatasyncJqgrid();

    });
    $("#btnAdddatasync").click(function () {
        $("#pnldatasync").hide();
        $("#pnlEditPrivacyPolicy").show();
    });
    $("#btndatasyncback").click(function () {
        $("#pnldatasync").show();
        $("#pnlEditPrivacyPolicy").hide();
    });
    $("#navtabgold").click(function () {
        $(".checkdataclass").prop('checked', '');
        $("#tabdatasync").hide();
        $("#tabNewDesignDays").hide();

        $("#tabgold").show();
    });

    /****************Email Notification ******************************/
    $('#txt_b2bregistration').select2({
        multiple: true,
    });
    $('#txt_quotgeneration').select2({
        multiple: true,
    });
    $("#navdataemailnotification").click(function () {
        $("#tabgold").hide();
        $("#erroreffactivedate").hide();
        $("#errorgoldrate").hide();
        $("#hdngoldid").val("");
        $('#txtgoldrate').val("");
        $("#pnlEditGold").hide();
        $("#pnlEditPrivacyPolicy").hide();
        $("#pnldatasync").hide();
        $("#tabdatasync").hide();
        $("#tabdatasync").remove('active');
        $("#pnldatasync").hide();
        $("#tabeamilnotification").show();
        $("#tabeamilnotification").add('active');
        $("#tabNewDesignDays").hide();

        BindDropdown('txt_b2bregistration', 'DataB2BNewregistration', "/Common/BindMastersDetails?ServiceName=USERDETAILS_GET&IsRecordAll=true&ColumnRequested=SAL_EMPFULLNAME,USERID&sidx=EMPLOYEE_NAME&sord=asc", '');
        BindDropdown('txt_quotgeneration', 'Dataquotationgeneration', "/Common/BindMastersDetails?ServiceName=USERDETAILS_GET&IsRecordAll=true&ColumnRequested=SAL_EMPFULLNAME,USERID&sidx=EMPLOYEE_NAME&sord=asc", '');
        PrivacyPolicyView.Bindemailnotification();

    });
    $("#buttonquotgeneration").click(function () {
        if ($("#txt_b2bregistration").val() == "" && $("#txt_quotgeneration").val() == "") {
            notificationMessage('Please Select B2B Registration Or New Quotation Generation Field', '', 'warning');
        } else {
            PrivacyPolicyView.btnemailnotification();
            BindDropdown('txt_b2bregistration', 'DataB2BNewregistration', "/Common/BindMastersDetails?ServiceName=USERDETAILS_GET&IsRecordAll=true&ColumnRequested=SAL_EMPFULLNAME,USERID&sidx=EMPLOYEE_NAME&sord=asc", '');
            BindDropdown('txt_quotgeneration', 'Dataquotationgeneration', "/Common/BindMastersDetails?ServiceName=USERDETAILS_GET&IsRecordAll=true&ColumnRequested=SAL_EMPFULLNAME,USERID&sidx=EMPLOYEE_NAME&sord=asc", '');
            PrivacyPolicyView.Bindemailnotification();
        }


    })

    /****************New Design Days******************************/
    $("#navNewDesignDays").click(function () {
        $("#tabgold").hide();
        $("#tabdatasync").hide();
        $("#tabNewDesignDays").addClass('active');
        $("#tabExchangeRate").hide();
        $("#tabeamilnotification").hide();
        $("#tabNewDesignDays").show();

        PrivacyPolicyView.BindNewDesignDays();
    });

    $("#btnSubmitNewDesignDays").click(function () {
        PrivacyPolicyView.SubmitNewDesignDays();
    })
});