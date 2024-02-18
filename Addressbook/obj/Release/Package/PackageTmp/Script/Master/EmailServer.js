var EmailSettingView = {
    variables: {
        BindEmailMasterUrl: "/Common/BindMastersDetails?ServiceName=EMAILSERVER_SETTINGS_GET&ColumnRequested=EMAILPROFILEID,DISPLAYNAME,MAILPASSWORD,ALWAYSUSEDEFAULTMAIL,SERVERNAME,PORTNO,USERNAME,AUTHENTICATIONTYPE,DEFAULTMAILFROM",
        PerformMasterOperationurl: "/Common/OpeartionsOnMaster?ServiceName=EMAILSERVER_SETTINGS_CRUD",
        TestEmailUrl: "/Common/TestEmail",
        Oper: 'Add',
        addedit: "added",
        Masterid: "",
        chkDefaulMailFmatter: function (cellvalue, options, rowObject) {
            if (cellvalue == '0' || cellvalue == undefined)
                return '<span class="label label-danger" style="font-size: 100%; !important">No</span>';
            else if (cellvalue == '1')
                return '<span class="label label-success" style="font-size: 100%; !important">Yes</span>';
        },
    },
    initializeJqgrid: function () {
        var colNames = ['EMAILPROFILEID', 'Display Name', 'MAILPASSWORD', 'Server Name', 'Port', 'User Name', 'Authentication', 'Default Mail From', 'Use as Default Mail'];
        var colModel = [
                { name: "EMAILPROFILEID", index: "EMAILPROFILEID", xmlmap: xmlvars.common_colmap + "EMAILPROFILEID", hidden: true },
                { name: "DISPLAYNAME", index: "DISPLAYNAME", width: 10, xmlmap: xmlvars.common_colmap + "DISPLAYNAME", sortable: true, search: false },
                { name: "MAILPASSWORD", index: "MAILPASSWORD", xmlmap: xmlvars.common_colmap + "MAILPASSWORD", hidden: true },
                { name: 'SERVERNAME', index: 'SERVERNAME', width: 15, xmlmap: xmlvars.common_colmap + "SERVERNAME", stype: "text", searchoptions: jqGridVariables.stringSearchOption },
                { name: 'PORTNO', index: 'PORTNO', width: 10, xmlmap: xmlvars.common_colmap + "PORTNO", align: "center", searchoptions: jqGridVariables.stringSearchOption },
                { name: 'USERNAME', index: 'USERNAME', width: 15, xmlmap: xmlvars.common_colmap + "USERNAME", searchoptions: jqGridVariables.stringSearchOption },
                { name: 'AUTHENTICATIONTYPE', index: 'AUTHENTICATIONTYPE', width: 10, xmlmap: xmlvars.common_colmap + "AUTHENTICATIONTYPE", align: "center", sortable: true, search: false },
                { name: 'DEFAULTMAILFROM', index: 'DEFAULTMAILFROM', width: 20, xmlmap: xmlvars.common_colmap + "DEFAULTMAILFROM", sortable: true, search: false },
                { name: "ALWAYSUSEDEFAULTMAIL", index: "ALWAYSUSEDEFAULTMAIL", width: 10, xmlmap: xmlvars.common_colmap + "ALWAYSUSEDEFAULTMAIL", align: "center", sortable: true, search: false, formatter: function (cv, op, ro) { return EmailSettingView.variables.chkDefaulMailFmatter(cv, op, ro) } },
        ];

        if (isU()) {
            colNames.push('Edit');
            colModel.push({ name: 'edit', index: 'edit', width: 5, sortable: false, align: "center", search: false, formatter: function (cv, op, ro) { return jqGridVariables.editBtnFmatter(cv, op, ro, 'EmailSettingView', 'edit') } });
        }
        else {
            colNames.push('View');
            colModel.push({ name: 'edit', index: 'edit', width: 5, sortable: false, align: "center", search: false, formatter: function (cv, op, ro) { return jqGridVariables.editBtnFmatter(cv, op, ro, 'EmailSettingView', 'view') } });
        }

        if (isD()) {
            colNames.push('Delete');
            colModel.push({ name: 'delete', index: 'delete', width: 5, sortable: false, align: "center", search: false, formatter: function (cv, op, ro) { return jqGridVariables.deleteBtnFmatter(cv, op, ro, 'EmailSettingView') } });
        }

        $("#tableEmailSetting").jqGrid({
            url: getDomain() + EmailSettingView.variables.BindEmailMasterUrl,
            datatype: "xml",
            height: '100%',
            autowidth: true,
            shrinkToFit: true,
            rowNum: 25,
            rowList: [25, 50, 100],
            colNames: colNames,
            colModel: colModel,
            pager: "#pagerEmailSetting",
            xmlReader: {
                root: xmlvars.common_root,
                row: xmlvars.common_row,
                page: xmlvars.common_response + "CURRENTPAGE",
                total: xmlvars.common_response + "TOTALPAGES",
                records: xmlvars.common_response + "TOTALRECORDS",
                repeatitems: false,
                id: "EMAILPROFILEID"
            },
            loadComplete: function () {
                $("tr.jqgrow:even").addClass('myAltRowClass');
                $("#tableEmailSetting").jqGrid('setGridHeight', $(window).innerHeight() - 160 - ($("#gbox_tableEmailSetting").height() - $('#gbox_tableEmailSetting .ui-jqgrid-bdiv').height()));

                // Hide column headers and top pager if no records were returned
                if ($('#tableEmailSetting').getGridParam('records') === 0)
                    $('.ui-jqgrid-htable').hide();
                else
                    $('.ui-jqgrid-htable').show();

                var width = $('#jqGrid_EmailSetting').width();
                if (width <= 715) {
                    width = 1000;
                }
                $('#tableEmailSetting').setGridWidth(width);
            },
            loadError: OnJqloadError,
            beforeProcessing: OnJqbeforeProcessingErrorcheck,
            viewrecords: true,
            sortname: 'EMAILPROFILEID',
            sortorder: 'asc',
        });
        // Setup buttons
        $("#tableEmailSetting").jqGrid('navGrid', '#pagerEmailSetting', { edit: false, add: false, del: false, search: true }, { height: 320 });
        $("#pagerEmailSetting_left").css("width", "");
        AlignJqGridHeader('tableEmailSetting', ['edit', 'delete', 'PORTNO', 'ALWAYSUSEDEFAULTMAIL', 'AUTHENTICATIONTYPE']);
    },
    triggerId: function (id, oper) {
        var rowData = jQuery("#tableEmailSetting").getRowData(id);
        EmailSettingView.variables.Masterid = id;
        $('#txtDisplayName').val(rowData['DISPLAYNAME']);
        $("#txtSeverName").val(rowData['SERVERNAME']);
        $("#txtPortNo").val(rowData['PORTNO']);
        $("#txtUserName").val(rowData['USERNAME']);
        $("#txtPassword").val(rowData['MAILPASSWORD']);
        if (rowData['AUTHENTICATIONTYPE'] == 'None') {
            $('#RdNone').prop("checked", true);
        }
        else if (rowData['AUTHENTICATIONTYPE'] == 'Basic') {
            $('#RdBasic').prop("checked", true);
        }
        else if (rowData['AUTHENTICATIONTYPE'] == 'Secure') {
            $('#RdSecure').prop("checked", true);
        }
        else if (rowData['AUTHENTICATIONTYPE'] == 'SSL') {
            $('#RdSSL').prop("checked", true);
        }

        $("#txtDefaultMailFrom").val(rowData['DEFAULTMAILFROM']);

        if ($(rowData['ALWAYSUSEDEFAULTMAIL']).html() == 'Yes')
            $('#chkEmailAlwaysDef').bootstrapToggle('on');
        else
            $('#chkEmailAlwaysDef').bootstrapToggle('off');

        $("#hdnEmailProfileId").val(id);
        $("#panelEmailEdit").show();
        $("#panelEmailSettingList").hide();
    },
    deleteRow: function (id) {        
        $.confirm({
            'title': 'Delete Email Server Details',
            'message': 'You are about to delete this email server Detail. It can not be restored at a later time! Continue? ',
            'buttons': {
                'Yes': {
                    'class': 'yes',
                    'action': function () {                        
                        // delete data to DB
                        var dataP = {
                            'EMAILPROFILEID': id,
                            oper: 'delete'
                        };
                        $.ajax({
                            url: getDomain() + EmailSettingView.variables.PerformMasterOperationurl,
                            type: "POST",
                            data: dataP,
                            async: false,
                            cache: false,
                            success: function (result) {                                
                                if ($(result).find('RESPONSECODE').text() == "0") {
                                    notificationMessage('Save Operation', 'Record is deleted successfully', 'success');
                                    $("#tableEmailSetting").trigger("reloadGrid", [{ current: true }]);
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
    btnMasterSubmit: function () {
        var isValid = $("#FrmEmailSetting").valid();
        if (!isValid)
            return;
        EmailSettingView.variables.Oper = 'Add';
        EmailSettingView.variables.addedit = "added";
        EmailSettingView.variables.Masterid = $("#hdnEmailProfileId").val();

        if ($("#hdnEmailProfileId").val() != "0" && parseInt($("#hdnEmailProfileId").val()) > 0) {
            EmailSettingView.variables.Oper = 'Edit';
            EmailSettingView.variables.addedit = 'updated';
            EmailSettingView.variables.Masterid = $("#hdnEmailProfileId").val();
        }

        if (EmailSettingView.variables.Oper == 'Add' && isA() == 0) {
            notificationMessage('Response', permissionvars.add, 'error');
            return;
        }
        if (EmailSettingView.variables.Oper == 'Edit' && isU() == 0) {
            notificationMessage('Response', permissionvars.edit, 'error');
            return;
        }

        $('#btnSaveEmail').attr('disabled', true);

        var Authentication = '';
        if ($('#RdSSL').prop("checked") == true)
            Authentication = 'SSL';
        else if ($('#RdNone').prop("checked") == true)
            Authentication = 'None';
        else if ($('#RdBasic').prop("checked") == true)
            Authentication = 'Basic';
        else if ($('#RdSecure').prop("checked") == true)
            Authentication = 'Secure';

        var activetoggle = 0;
        if ($("#chkEmailAlwaysDef").prop("checked") == true) {
            activetoggle = 1;
        } else {
            activetoggle = 0;
        }

        var data = {
            "oper": EmailSettingView.variables.Oper,
            "DISPLAYNAME": $("#txtDisplayName").val(),
            "SERVERNAME": $("#txtSeverName").val(),
            "PORTNO": $("#txtPortNo").val(),
            "USERNAME": $("#txtUserName").val(),
            "MAILPASSWORD": $("#txtPassword").val(),
            "AUTHENTICATIONTYPE": Authentication,
            "DEFAULTMAILFROM": $("#txtDefaultMailFrom").val(),
            "ALWAYSUSEDEFAULTMAIL": activetoggle,
            "EMAILPROFILEID": EmailSettingView.variables.Masterid
        }
        EmailSettingView.savedata(EmailSettingView.variables.Oper, data);
    },
    btnMasterDelete: function () {
        if (isD() == 0) {
            notificationMessage('Response', permissionvars.delete, 'error');
            return;
        }

        $('#btnDeleteEmail').attr('disabled', true);

        var data = {
            "oper": EmailSettingView.variables.Oper,
            "RULEID": $("#hdnRuleId").val()
        }
        EmailSettingView.savedata(EmailSettingView.variables.Oper, data);
    },
    btnMasterSubmitOnSuccess: function (data) {
        if (EmailSettingView.variables.Oper == 'Delete')
            $('#btnDeleteEmail').attr('disabled', false);
        else
            $('#btnSaveEmail').attr('disabled', false);

        if ($(data).find('RESPONSECODE').text() == "0") {
            notificationMessage(EmailSettingView.variables.Oper + ' Operation', 'Record is ' + EmailSettingView.variables.addedit + ' successfully', 'success');
            $("#panelEmailEdit").hide();
            $("#panelEmailDelete").hide();
            $("#panelEmailSettingList").show();
            EmailSettingView.clearControls();
            $("#tableEmailSetting").trigger("reloadGrid", [{ current: true }]);
        }
        else {
            InvalidResponseCode(data);
        }
    },
    btnMasterShowAddPanel: function () {
        EmailSettingView.clearControls();
        EmailSettingView.variables.Masterid = 0;
        $("#panelEmailEdit").show();
        $("#panelEmailDelete").hide();
        $("#panelEmailSettingList").hide();
    },
    btnMasterCancel: function () {
        $("#panelEmailEdit").hide();
        $("#panelEmailDelete").hide();
        $("#panelEmailSettingList").show();
        EmailSettingView.clearControls();
        jQuery("#tableEmailSetting").jqGrid('resetSelection');
    },
    clearControls: function () {
        $("#FrmEmailSetting").validate().resetForm();
        $("#hdnEmailProfileId").val("");
        $("#dtpEffectiveFrom").parent().datepicker('setDate', '');
        $("#txtSeverName").val("");
        $("#txtDisplayName").val("");
        $("#txtPortNo").val("");
        $("#txtUserName").val("");
        $("#txtPassword").val("");
        $("#RdNone").prop('checked', true);
        $('#chkEmailAlwaysDef').bootstrapToggle('off');
        $("#txtDefaultMailFrom").val("");
        EmailSettingView.variables.Oper = 'Add';
        EmailSettingView.variables.addedit = "added";
        EmailSettingView.variables.Masterid = "";
    },
    savedata: function (oper, data) {
        $.ajax({
            url: getDomain() + EmailSettingView.variables.PerformMasterOperationurl,
            data: data,
            async: true,
            cache: false,
            type: 'POST',
            success: EmailSettingView.btnMasterSubmitOnSuccess,
            error: OnError
        });
    },
    TestEmail: function () {
        var isValid = $("#FrmEmailSetting").valid();
        if (!isValid)
            return;

        $('#btnTestEmail').attr('disabled', true);
        $.ajax({
            url: getDomain() + EmailSettingView.variables.TestEmailUrl,
            data: {
                "SERVERNAME": $("#txtSeverName").val(),
                "PORTNO": $("#txtPortNo").val(),
                "USERNAME": $("#txtUserName").val(),
                "PASSWORD": $("#txtPassword").val(),
                "DEFAULTMAIL": $("#txtDefaultMailFrom").val()
            },
            async: true,
            cache: false,
            type: 'POST',
            success: function (result) {
                if (result == 'Mail sent')
                    notificationMessage('Response', result, 'success');
                else
                    notificationMessage('Response', result, 'error');
                $('#btnTestEmail').attr('disabled', false);
            },
            error: OnError
        });
    },
}

$(document).ready(function () {
    $('#chkEmailAlwaysDef').bootstrapToggle({
        on: 'Yes',
        off: 'No',
        size: 'small'
    });

    EmailSettingView.initializeJqgrid();

    $("#btnTestEmail").click(function () {
        EmailSettingView.TestEmail();
    });

    $("#btnAddEmailSetting").click(function () {
        EmailSettingView.btnMasterShowAddPanel();
    });

    $("#btnBack").click(function () {
        EmailSettingView.btnMasterCancel();
    });

    $("#btnSaveEmail").click(function () {
        EmailSettingView.btnMasterSubmit();
    });

    $("#btnDeleteEmail").click(function () {
        EmailSettingView.btnMasterDelete();
    });
});