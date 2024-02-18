var EmailDemoView = {
    variables: {
        BindMasterurl: "/Common/BindMastersDetails?ServiceName=EMAILDEMO_GET",
        PerformMasterurl: "/Common/OpeartionsOnMaster?ServiceName=EMAILDEMO_CRUDOPERATIONS",
        Oper: 'Add',
        EmaiURL: "/Account/SendMail",
        addedit: "added",
        Masterid: "",
    },
    initializeJqgrid: function () {
        var colNames = ['EmailId', 'Template Name', 'Subject Name', 'Email Body'];
        var colModel = [
                { name: "EMAILID", index: "EMAILID", xmlmap: xmlvars.common_colmap + "EMAILID", stype: 'int', sortable: false, hidden: true },
                { name: "TEMPLATENAME", index: "TEMPLATENAME", width: 10, xmlmap: xmlvars.common_colmap + "TEMPLATENAME", stype: "text", sortable: true },
                { name: "SUBJECTNAME", index: "SUBJECTNAME", width: 25, xmlmap: xmlvars.common_colmap + "SUBJECTNAME", search: false, stype: "text", sortable: true },
                { name: "EMAILBODY", index: "EMAILBODY", xmlmap: xmlvars.common_colmap + "EMAILBODY", search: false, stype: "text", sortable: true, hidden: true },
                //{ name: 'edit', index: 'edit', width: 5, sortable: false, align: "center", search: false, formatter: function (cv, op, ro) { return jqGridVariables.editBtnFmatter(cv, op, ro, 'EmailDemoView', 'edit') } },
                //{ name: 'act', index: 'act', width: 11, sortable: false, align: "center", search: false, formatter: function (cv, op, ro) { return jqGridVariables.deleteBtnFmatter(cv, op, ro, 'EmailDemoView') } }
        ];
        colNames.push('Publish');
        colModel.push({ name: 'act', index: 'act', width: 3, sortable: false, align: "center", search: false, formatter: function (cv, op, ro) { return jqGridVariables.PublishBTnFmatter(cv, op, ro, 'EmailDemoView') } });
        colNames.push('Edit');
        colModel.push({ name: 'edit', index: 'edit', width: 2, sortable: false, align: "center", search: false, formatter: function (cv, op, ro) { return jqGridVariables.editBtnFmatter(cv, op, ro, 'EmailDemoView', 'edit') } });
        colNames.push('Delete');
        colModel.push({ name: 'act', index: 'act', width: 3, sortable: false, align: "center", search: false, formatter: function (cv, op, ro) { return jqGridVariables.deleteBtnFmatter(cv, op, ro, 'EmailDemoView') } });
        

        $("#table_list_Email").jqGrid({
            url: getDomain() + EmailDemoView.variables.BindMasterurl,
            datatype: "xml",
            height: '100%',
            autowidth: true,
            shrinkToFit: true,
            rowNum: 10,
            rowList: [10, 20, 30],
            colNames: colNames,
            colModel: colModel,
            pager: "#pager_list_Email",
            xmlReader: {
                root: xmlvars.common_root,
                row: xmlvars.common_row,
                page: xmlvars.common_response + "CURRENTPAGE",
                total: xmlvars.common_response + "TOTALPAGES",
                records: xmlvars.common_response + "TOTALRECORDS",
                repeatitems: false,
                id: "EMAILID"
            },
            loadComplete: function () {
                $("tr.jqgrow:even").addClass('myAltRowClass');
                if ($('#table_list_Email').getGridParam('records') === 0)
                    $('.ui-jqgrid-htable').hide();
                else
                    $('.ui-jqgrid-htable').show();

                //var width = $('#jqGrid_JobFun').width();
                //$('#table_list_Email').setGridWidth(width);
                //$('#table_list_Email').setGridWidth(1100);

                var width = $('#jqGrid_Email').width();
              
                if (width <= 430) {
                    width = 900;
                }
                $('#table_list_Email').setGridWidth(width);
            },
            loadError: OnJqloadError,
            beforeProcessing: OnJqbeforeProcessingErrorcheck,
            viewrecords: true,
            sortname: 'TEMPLATENAME',
            sortorder: 'asc',

        });

        // Setup buttons
        $("#table_list_Email").jqGrid('navGrid', '#pager_list_Email',
                { edit: false, add: false, del: false, search: false },
                { height: 200, reloadAfterSubmit: true }
        );

    },
    Publishsmsoremail: function (id) {
        
        var rowData = jQuery("#table_list_Email").getRowData(id);
        var mobilenumber = $("#hdnBEmail1").val();
        if (mobilenumber == "" || mobilenumber == null) {
            OperationMessage("", 'Some Mail not sended please check data.', 'error');
        }
        else {
            $(".cd-overlay").toggleClass("show-loder");
            $("#loder").toggleClass("show-loder");
            var i = 0;
            var EmailList;
            
            EmailList = mobilenumber.split(',');
            for (i = 0; i < EmailList.length; i++) {
                
                if (EmailList[i] != "") {
                    $.ajax({
                        url: getDomain() + EmailDemoView.variables.EmaiURL,
                        data: { Emailids: EmailList[i], subject: rowData['SUBJECTNAME'], body: rowData['EMAILBODY'] },
                        async: true,
                        cache: false,
                        type: 'POST',
                        success: function (data) {

                            if (data == "scucess") {
                                $("#hdnBEmail1").val("");
                                OperationMessage("", 'Mail sent Successfully', 'success');
                            }
                            else {
                                OperationMessage("", data, 'error');
                            }
                        },
                        error: OnError,
                    });
                }
              
            }
            $(".cd-overlay").toggleClass("show-loder");
            $("#loder").toggleClass("show-loder");
            $('#Email-Modal').modal('toggle');
            
        }
    },
    triggerInitialClick: function () {
        EmailDemoView.clearControls();
        EmailDemoView.initializeJqgrid();
        
    },
    triggerId: function (id, oper) {        
        var rowData = jQuery("#table_list_Email").getRowData(id);
        EmailDemoView.variables.Masterid = id;
        $("#txtEmail").val(rowData['TEMPLATENAME']);
        $("#txtEmailSub").val(rowData['SUBJECTNAME']);
        $('.summernote').code(rowData['EMAILBODY']),
        $("#hdnEmailId").val(id);      
        $("#pnlEditEmail").show();
        $("#pnlViewEMail").hide();
        $("#pnldeleteEmail").hide();
        EmailDemoView.showTitlePermissionWise(oper);
    },
    deleteRow: function (id) {
        EmailDemoView.variables.addedit = "deleted";
        EmailDemoView.variables.Oper = "Delete";
        
        if (id > 0) {
            var rowData = jQuery("#table_list_Email").getRowData(id);

            $("#delTemplateNameEmail").html(rowData['TEMPLATENAME']);
            $("#delSubjectName").html(rowData['SUBJECTNAME']);
            $("#delEmailBody").html(rowData['EMAILBODY']);
            $("#hdnEmailId").val(rowData['EMAILID']);
            $("#pnlEditEmail").hide();
            $("#pnlViewEMail").hide();
            $("#pnldeleteEmail").show();
        }
    },
    btnMasterSubmit: function (successFun) {        
        var isvalid = 0;
        if ($('#txtEmailBody').code() != "" && $("#txtEmailBody").code() != null) {
            isvalid = 1;
        }
        if (isvalid != 0) {
            $("#EmailBody_error").hide();

            EmailDemoView.variables.Oper = 'Add';
            EmailDemoView.variables.addedit = "added";
            EmailDemoView.variables.Masterid = $("#hdnEmailId").val();

            if (EmailDemoView.variables.Masterid != "0" && parseInt(EmailDemoView.variables.Masterid) > 0) {
                EmailDemoView.variables.Oper = 'Edit';
                EmailDemoView.variables.addedit = 'updated';
            }

            $('#btnSaveEmail').attr('disabled', true);

            var data = {
                "oper": EmailDemoView.variables.Oper,
                "TEMPLATENAME": $("#txtEmail").val(),
                "SUBJECTNAME": $("#txtEmailSub").val(),
                "EMAILBODY": $('.summernote').code(),//$("#txtEmailBody").html(),
                "EMAILID": EmailDemoView.variables.Masterid
            }

            EmailDemoView.savedata(EmailDemoView.variables.Oper, data);
        }
        else {
            $("#EmailBody_error").show();
            return;
        }
    },
    btnMasterDelete: function () {
        //if (isD() == 0) {
        //    notificationMessage('Response', permissionvars.delete, 'error');
        //    return;
        //}
        $('#btnDeleteEmail').attr('disabled', true);
        var data = {
            "oper": EmailDemoView.variables.Oper,
            "EMAILID": $("#hdnEmailId").val()
        }
        EmailDemoView.savedata(EmailDemoView.variables.Oper, data);
    },
    btnMasterSubmitOnSuccess: function (data) {
        if (EmailDemoView.variables.Oper == 'Delete')
            $('#btnDeleteEmail').attr('disabled', false);
        else
            $('#btnSaveEmail').attr('disabled', false);

        if ($(data).find('RESPONSECODE').text() == "0") {
            notificationMessage(EmailDemoView.variables.Oper + ' Operation', 'Record is ' + EmailDemoView.variables.addedit + ' successfully', 'success');
            EmailDemoView.clearControls();
            $("#table_list_Email").trigger("reloadGrid", [{ current: true }]);
        }
        else {
            InvalidResponseCode(data);
        }
    },
    btnMasterShowAddPanel: function () {
        EmailDemoView.clearControls();
        EmailDemoView.variables.Masterid = 0;
        $("#pnlEditEmail").show();
        $("#pnlViewEMail").hide();
        $("#pnldeleteEmail").hide();

    },
    btnMasterCancel: function () {
        EmailDemoView.clearControls();
        jQuery("#table_list_Email").jqGrid('resetSelection');
    },
    clearControls: function () {
        $("#pnlEditEmail").hide();
        $("#pnlViewEMail").show();
        $("#pnldeleteEmail").hide();   
        $("#txtEmail").val("");
        $("#txtEmailSub").val("");
        $("#hdnEmailId").val("");
        $('#txtEmailBody').code('');
        EmailDemoView.variables.Oper = 'Add';
        EmailDemoView.variables.addedit = "added";
        EmailDemoView.variables.Masterid = "";
    },
    savedata: function (oper, data) {
        $.ajax({
            url: getDomain() + EmailDemoView.variables.PerformMasterurl,
            data: data,
            async: true,
            cache: false,
            type: 'POST',
            success: EmailDemoView.btnMasterSubmitOnSuccess,
            error: OnError
        });
    },
    showTitlePermissionWise: function (oper) {
        if (oper == 'edit' || oper == 'add') {
            $("#btnSaveEmail").show();
            $(".permissionaddimage").show();
            $(".permissiondlt").hide();
        }
        else {
            if ($("#btnSaveEmail").length > 0) {
                $("#btnSaveEmail").hide();
            }
            if ($(".permissionaddimage").length > 0) {
                $(".permissionaddimage").hide();
            }
            if ($(".permissiondlt").length > 0) {
                $(".permissiondlt").show();
            }
        }
    },
    Bindimage: function () {
        $.ajax({
            url: getDomain() + "/Common/BindMastersDetails?ServiceName=EMAILDEMOIMAGE_GET",
            async: false,
            cache: false,
            type: 'GET',
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    var JsonObject = xml2json.parser(data);
                    $('#dataimagelist').html("");
                    if (JsonObject.serviceresponse.detailslist != undefined) {
                        $("#dataimagelist").html($("#Getimagedata").render(JsonObject.serviceresponse.detailslist.details));
                    }
                }
                else {
                    InvalidResponseCode(data);
                }
            },
            error: OnError
        });
    },
    saveimagedata: function (oldsrc, data, originalname) {
        var foldername = 'EmailDemoTemplate';
        var originalfile = oldsrc;
        var newfile = $("#ItemimgPreview").attr('src');
        var data = {
            "EMAILDEMOIMAGENAME": originalname,
            "oper": 'add',
        }
        $.ajax({
            type: 'POST',
            async: false,
            cache: false,
            url: getDomain() + "/Common/SaveSingleImage",
            data: { originalfile: originalfile, newfile: newfile, oper: 'Add', isResize: false, module: foldername },
            success: function (result) {
                data.EMAILDEMOPATH = result;
                $.ajax({
                    url: getDomain() + "/Common/OpeartionsOnMaster?ServiceName=EMAILDEMOIMAGE_CRUD",
                    data: data,
                    async: true,
                    cache: false,
                    type: 'POST',
                    success: function () {
                        EmailDemoView.Bindimage();
                    },
                    error: OnError,
                });
            },
            error: OnError
        });
    },
}
function Addimage(id) {
    var url;
    if (getDomain() == "/Trinity") {
        url = $("#hdndomainfirstpath").val() + $("#image" + id).attr('src');
    }
    else {
        url = $("#hdndomainfirstpath").val() + $("#image" + id).attr('src');
    }
    $("#txtEmailBody").summernote("editor.insertImage", url);
}
function dltimage(id) {
    $.confirm({
        'title': 'Delete Letter Picture',
        'message': 'You are about to delete this Picture. It can not be restored at a later time! Continue? ',
        'buttons': {
            'Yes': {
                'class': 'yes',
                'action': function () {
                    var originalfile = getDomain() + $("#image" + id).attr('src');
                    $.ajax({
                        type: 'POST',
                        async: false,
                        cache: false,
                        url: getDomain() + "/Common/SaveSingleImage",
                        data: { originalfile: originalfile, newfile: originalfile, oper: 'Delete', isResize: false, module: 'EmailDemoTemplate' },
                        success: function (result) {
                            $.ajax({
                                url: getDomain() + "/Common/OpeartionsOnMaster?ServiceName=EMAILDEMOIMAGE_CRUD",
                                data: {
                                    EMAILDEMOID: id,
                                    oper: 'delete'
                                },
                                async: true,
                                cache: false,
                                type: 'POST',
                                success: function (result) {
                                    if ($(result).find('RESPONSECODE').text() == "0") {
                                        notificationMessage('Delete Operation', 'Picture is deleted successfully', 'success');
                                        EmailDemoView.Bindimage();
                                    }
                                    else
                                        notificationMessage('Error', $(result).find('RESPONSEMESSAGE').text(), 'error');
                                },
                                error: OnError,
                            });

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
}
function btnaddnewemail() {
    
    //$('#Email-Modal').attr('data-add', 'add');
    //$('#btnSaveEmailSend').hide();
    EmailDemoView.btnMasterShowAddPanel();
}
$(document).ready(function () {
   
    $('#Email-Modal').on('shown.bs.modal', function () {
        EmailDemoView.initializeJqgrid();
        EmailDemoView.clearControls();
        EmailDemoView.Bindimage();
    })
    //EmailDemoView.initializeJqgrid();
    //$("#emaildemotab").click(function () {
    //    EmailDemoView.initializeJqgrid();
    //})
    
    EmailDemoView.clearControls();
    $('#txtEmailBody').summernote({
        height: 300,                 // set editor height
        dialogsInBody: true,
        minHeight: null,             // set minimum height of editor
        maxHeight: null,             // set maximum height of editor

        focus: true,                 // set focus to editable area after initializing summernote
    });
    //$("#btnAddNewEmail").click(function () {
       
    //});

    $("#btnSaveEmail").click(function () {
        EmailDemoView.btnMasterSubmit();
    });

    $("#btnDeleteEmail").click(function () {
        EmailDemoView.btnMasterDelete();
        jQuery("#table_list_Email").jqGrid('resetSelection');
    });

    $('button[name="cancelEmail"]').click(function () {
        EmailDemoView.btnMasterCancel();
        //$("#frmSmsDemo").validate().resetForm();
    });
    $("#btnimageUpload").fileupload({
        url: getDomain() + '/Helpers/Handler/FileUploadHandler.ashx',
        add: function (e, data) {
            oldsrc = $("#ItemimgPreview").attr('src');
            originalname = data.originalFiles[0].name;
            if (checkIsValidFile(e.target.accept, data.files[0].type))
                data.submit();
            else
                notificationMessage('Invalid File', 'Please select only ' + e.target.accept + ' files', 'warning');
        },
        success: function (response, status) {
            $("#ItemimgPreview").attr('src', response);
            EmailDemoView.saveimagedata(oldsrc, response, originalname);
            //if ($(lblError).length > 0) {
            //    $(lblError).hide();
            //    $(lblError).html("");
            //}
        },
        error: OnError
    });
});