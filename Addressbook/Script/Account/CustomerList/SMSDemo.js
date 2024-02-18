var SMSDemoView = {
    variables: {
        BindMasterurl: "/Common/BindMastersDetails?ServiceName=SMSDEMO_GET",
        PerformMasterurl: "/Common/OpeartionsOnMaster?ServiceName=SMSDEMO_CRUDOPERATIONS",
        Oper: 'Add',
        SMSURL: "/Account/SendSMS",
        addedit: "added",
        Masterid: "",
    },
    initializeJqgrid: function () {
        var colNames = ['SmsId', 'Template Name', 'Language', 'Sms Body'];
        var colModel = [
                { name: "SMSID", index: "SMSID", xmlmap: xmlvars.common_colmap + "SMSID", stype: 'int', sortable: false, hidden: true },
                { name: "TEMPLATENAME", index: "TEMPLATENAME", width: 35, xmlmap: xmlvars.common_colmap + "TEMPLATENAME", stype: "text", sortable: true },
                { name: "LANGUAGE", index: "LANGUAGE", width: 10, xmlmap: xmlvars.common_colmap + "LANGUAGE", stype: "text", sortable: false },
                { name: "SMSBODY", index: "SMSBODY", width: 40, xmlmap: xmlvars.common_colmap + "SMSBODY", search: false, stype: "text", sortable: false },
                
        ];
        colNames.push('Publish');
        colModel.push({ name: 'act', index: 'act', width: 8, sortable: false, align: "center", search: false, formatter: function (cv, op, ro) { return jqGridVariables.PublishBTnFmatter(cv, op, ro, 'SMSDemoView') } });
        colNames.push('Edit');
        colModel.push({ name: 'edit', index: 'edit', width: 5, sortable: false, align: "center", search: false, formatter: function (cv, op, ro) { return jqGridVariables.editBtnFmatter(cv, op, ro, 'SMSDemoView', 'edit') } });
        colNames.push('Delete');
        colModel.push({ name: 'act', index: 'act', width: 8, sortable: false, align: "center", search: false, formatter: function (cv, op, ro) { return jqGridVariables.deleteBtnFmatter(cv, op, ro, 'SMSDemoView') } });
       
        
        $("#table_list_SMS").jqGrid({
            url: getDomain() + SMSDemoView.variables.BindMasterurl,
            datatype: "xml",
            height: '100%',
            autowidth: true,
            shrinkToFit: true,
            rowNum: 10,
            rowList: [10, 20, 30],
            colNames: colNames,
            colModel: colModel,
            pager: "#pager_list_SMS",
            xmlReader: {
                root: xmlvars.common_root,
                row: xmlvars.common_row,
                page: xmlvars.common_response + "CURRENTPAGE",
                total: xmlvars.common_response + "TOTALPAGES",
                records: xmlvars.common_response + "TOTALRECORDS",
                repeatitems: false,
                id: "SMSID"
            },
            loadComplete: function () {
                $("tr.jqgrow:even").addClass('myAltRowClass');
                if ($('#table_list_SMS').getGridParam('records') === 0)
                    $('.ui-jqgrid-htable').hide();
                else
                    $('.ui-jqgrid-htable').show();

                

                var width = $('#jqGrid_sms').width();
                if (width <= 430) {
                    width = 700;
                }
                $('#table_list_SMS').setGridWidth(width);
            },
            loadError: OnJqloadError,
            beforeProcessing: OnJqbeforeProcessingErrorcheck,
            viewrecords: true,
            sortname: 'TEMPLATENAME',
            sortorder: 'asc',

        });

        // Setup buttons
        $("#table_list_SMS").jqGrid('navGrid', '#pager_list_SMS',
                { edit: false, add: false, del: false, search: false },
                { height: 200, reloadAfterSubmit: true }
        );
        AlignJqGridHeader('table_list_SMS', ['edit','delete']);

    },
    Publishsmsoremail: function (id) {
        
        var rowData = jQuery("#table_list_SMS").getRowData(id);
        var mobilenumber = $("#hdnBEmail1").val();
        if (mobilenumber == "" || mobilenumber == null)
        {
            OperationMessage("", 'Some SMS not sended please check data.', 'error');
        }
        else {
            $(".cd-overlay").toggleClass("show-loder");
            $("#loder").toggleClass("show-loder");
            $.ajax({
                url: getDomain() + SMSDemoView.variables.SMSURL,
                data: { mobileNos: $("#hdnBEmail1").val(), lang: rowData['LANGUAGE'], body: rowData['SMSBODY'] },
                async: true,
                cache: false,
                type: 'POST',
                success: function (data) {
                    $(".cd-overlay").toggleClass("show-loder");
                    $("#loder").toggleClass("show-loder");

                    if (data == "OK") {
                        $("#hdnBEmail1").val("");
                        OperationMessage("", 'SMS sent Successfully', 'success');
                    }
                    else {
                        OperationMessage("", data, 'error');
                    }
                },
                error: OnError,
            });
        }

        
    },
    triggerInitialClick: function () {
        SMSDemoView.clearControls();
        SMSDemoView.initializeJqgrid();
    },

    triggerId: function (id, oper) {
        
        var rowData = jQuery("#table_list_SMS").getRowData(id);
        SMSDemoView.variables.Masterid = id;
        
        $("#txtSmsName").val(rowData['TEMPLATENAME']);
        $("#text_languages").val(rowData['LANGUAGE']);
        $("#txtSmsBody").val(rowData['SMSBODY']);
        $("#hdnSmsID").val(id);
        //$("#BtnsendSMS").show();

        $("#pnlAddSMS").show();
        $("#pnlViewSMS").hide();
        //$("#pnlDeleteSMS").modal("hide");
        $("#pnlDeleteSMS").hide();
        SMSDemoView.showTitlePermissionWise(oper);
    },

    deleteRow: function (id) {
        SMSDemoView.variables.addedit = "deleted";
        SMSDemoView.variables.Oper = "Delete";

        if (id > 0) {
            var rowData = jQuery("#table_list_SMS").getRowData(id);

            $("#delTemplateName").html(rowData['TEMPLATENAME']);
            $("#delSMSBody").html(rowData['SMSBODY']);
            $("#hdnSmsID").val(id);

            $("#pnlAddSMS").hide();
            $("#pnlViewSMS").hide();
            $("#pnlDeleteSMS").show();
        }
    },

    btnMasterSubmit: function (successFun) {
        
        var isValid = $("#frmSmsDemo").valid();
        if (!isValid)
            return;
        SMSDemoView.variables.Oper = 'Add';
        SMSDemoView.variables.addedit = "added";
        SMSDemoView.variables.Masterid = $("#hdnSmsID").val();

        if (SMSDemoView.variables.Masterid != "0" && parseInt(SMSDemoView.variables.Masterid) > 0) {
            SMSDemoView.variables.Oper = 'Edit';
            SMSDemoView.variables.addedit = 'updated';
        }

        //if (SMSDemoView.variables.Oper == 'Add' && isA() == 0) {
        //    notificationMessage('Response', permissionvars.add, 'error');
        //    return;
        //}
        //if (SMSDemoView.variables.Oper == 'Edit' && isU() == 0) {
        //    notificationMessage('Response', permissionvars.edit, 'error');
        //    return;
        //}
        $('#btnSaveSms').attr('disabled', true);

        var data = {
            "oper": SMSDemoView.variables.Oper,
            "TEMPLATENAME": $("#txtSmsName").val(),
            "LANGUAGE": $("#text_languages").val(),
            "SMSBODY": $("#txtSmsBody").val(),
            "SMSID": SMSDemoView.variables.Masterid
        }
        
        SMSDemoView.savedata(SMSDemoView.variables.Oper, data);
    },

    btnMasterDelete: function () {
        //if (isD() == 0) {
        //    notificationMessage('Response', permissionvars.delete, 'error');
        //    return;
        //}
        $('#btnDeleteSMS').attr('disabled', true);
        var data = {
            "oper": SMSDemoView.variables.Oper,
            "SMSID": $("#hdnSmsID").val()
        }
        SMSDemoView.savedata(SMSDemoView.variables.Oper, data);
    },

    btnMasterSubmitOnSuccess: function (data) {
        if (SMSDemoView.variables.Oper == 'Delete')
            $('#btnDeleteSMS').attr('disabled', false);
        else
            $('#btnSaveSms').attr('disabled', false);

        if ($(data).find('RESPONSECODE').text() == "0") {
            notificationMessage(SMSDemoView.variables.Oper + ' Operation', 'Record is ' + SMSDemoView.variables.addedit + ' successfully', 'success');
            SMSDemoView.clearControls();
            $("#table_list_SMS").trigger("reloadGrid", [{ current: true }]);
        }
        else {
            InvalidResponseCode(data);
        }
    },

    btnMasterShowAddPanel: function () {
        SMSDemoView.clearControls();
        SMSDemoView.variables.Masterid = 0;

        $("#pnlAddSMS").show();
        $("#pnlViewSMS").hide();
        $("#pnlDeleteSMS").modal("hide");
    },

    btnMasterCancel: function () {
        SMSDemoView.clearControls();
        jQuery("#table_list_SMS").jqGrid('resetSelection');
    },

    clearControls: function () {
        $("#pnlAddSMS").hide();
        $("#pnlViewSMS").show();
        $("#pnlDeleteSMS").modal("hide");
        $("#text_languages").val("EN");
        $("#txtSmsName").val("");
        $("#txtSmsBody").val("");
        $("#hdnSmsID").val("");

        SMSDemoView.variables.Oper = 'Add';
        SMSDemoView.variables.addedit = "added";
        SMSDemoView.variables.Masterid = "";
    },

    savedata: function (oper, data) {
        $.ajax({
            url: getDomain() + SMSDemoView.variables.PerformMasterurl,
            data: data,
            async: true,
            cache: false,
            type: 'POST',
            success: SMSDemoView.btnMasterSubmitOnSuccess,
            error: OnError
        });
    },
    showTitlePermissionWise: function (oper) {
        if (oper == 'edit' || oper == 'add') {
            $("#btnSaveSms").show();
        }
        else {
            if ($("#btnSaveSms").length > 0) {
                $("#btnSaveSms").hide();
            }
        }
    },
}
$(document).ready(function () {
    $('#SMS-modal').on('shown.bs.modal', function () {
        SMSDemoView.initializeJqgrid();
        SMSDemoView.clearControls();
    });

    //$("#smsdemotab").click(function () {
    //    SMSDemoView.initializeJqgrid();
    //});
    
    SMSDemoView.clearControls();
    $("#btnAddNewSMS").click(function () {
        
        //$("#BtnsendSMS").hide();
        SMSDemoView.btnMasterShowAddPanel();
    });

    $("#btnSaveSms").click(function () {
        SMSDemoView.btnMasterSubmit();
    });

    $("#btnDeleteSMS").click(function () {
        SMSDemoView.btnMasterDelete();
        $("#pnlDeleteSMS").hide();
    });

    $('button[name="cancelSMS"]').click(function () {
        SMSDemoView.btnMasterCancel();
        //$("#frmSmsDemo").validate().resetForm();
    });
});