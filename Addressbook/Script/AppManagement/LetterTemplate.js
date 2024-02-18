var Main_LetterTemplatesView = {
    variables: {
        BindMasterUrl: "/Common/BindMastersDetails?ServiceName=MAIN_LETTER_TEMPLATE_GET",
        PerformMasterOperationUrl: "/Common/OpeartionsOnMaster?ServiceName=MAIN_LETTER_TEMPLATE_CRUD",
        BindActivityTypeUrl: "/Common/BindMastersDetails?ServiceName=MAIN_LETTERTYPE_GET",
        Oper: 'Add',
        addedit: "added",
        Masterid: "",
        Imageid: "",
        SubjectLength: 0,
        EmailLength: 0,
        SMSLength: 0,
        Subjectbody: "",

    },
    initializeJqgrid: function () {
        var colNames = ['Letter Template Id', 'Category', 'Letter Type Id', 'Letter Type Name', 'Letter Name', 'Email Subject', 'Email Body', 'Sms Body', 'Employee Name', 'Employee Id'];
        var colModel = [
             { name: "LETTERTEMPLATEID", index: "LETTERTEMPLATEID", xmlmap: xmlvars.common_colmap + "LETTERTEMPLATEID", stype: 'int', sortable: false, hidden: true, search: false },
             { name: "LETTERCATEGORY", index: "LETTERCATEGORY", xmlmap: xmlvars.common_colmap + "LETTERCATEGORY", width: 10, sortable: true, search: true },
             { name: "LETTERTYPEID", index: "LETTERTYPEID", xmlmap: xmlvars.common_colmap + "LETTERTYPEID", stype: 'int', sortable: false, hidden: true, search: false },
             { name: "LETTERTYPENAME", index: "LETTERTYPENAME", xmlmap: xmlvars.common_colmap + "LETTERTYPENAME", width: 15, stype: 'text', sortable: true, searchoptions: jqGridVariables.stringSearchOption },
             { name: "LETTERNAME", index: "LETTERNAME", xmlmap: xmlvars.common_colmap + "LETTERNAME", width: 15, stype: 'text', sortable: true, searchoptions: jqGridVariables.stringSearchOption },
             { name: "SUBJECT", index: "SUBJECT", xmlmap: xmlvars.common_colmap + "SUBJECT", width: 15, stype: 'text', search: true, sortable: true, searchoptions: jqGridVariables.stringSearchOption },
             { name: "EMAILBODY", index: "EMAILBODY", xmlmap: xmlvars.common_colmap + "EMAILBODY", stype: 'text', sortable: false, search: false, hidden: true },
             { name: "SMSBODY", index: "SMSBODY", xmlmap: xmlvars.common_colmap + "SMSBODY", width: 25, stype: 'text', search: false, sortable: false, searchoptions: jqGridVariables.stringSearchOption },
             { name: "EMPLOYEENAME", width: 8, index: "EMPLOYEENAME", xmlmap: xmlvars.common_colmap + "EMPLOYEENAME", search: false, hidden: true },
             { name: "EMPLOYEEID", index: "EMPLOYEEID", xmlmap: xmlvars.common_colmap + "EMPLOYEEID", search: false, hidden: true, sortable: false },
        ];
        if (isU()) {
            colNames.push('Edit');
            colModel.push({ name: 'edit', index: 'edit', width: 5, sortable: false, align: "center", search: false, formatter: function (cv, op, ro) { return jqGridVariables.editBtnFmatter(cv, op, ro, 'Main_LetterTemplatesView', 'edit') } });
        } else if (isV()) {
            colNames.push('Edit');
            colModel.push({ name: 'edit', index: 'edit', width: 5, sortable: false, align: "center", search: false, formatter: function (cv, op, ro) { return jqGridVariables.editBtnFmatter(cv, op, ro, 'Main_LetterTemplatesView', 'view') } });
        }
        if (isD()) {
            colNames.push('Delete');
            colModel.push({ name: 'act', index: 'act', width: 5, sortable: false, align: "center", search: false, formatter: function (cv, op, ro) { return jqGridVariables.deleteBtnFmatter(cv, op, ro, 'Main_LetterTemplatesView') } });
        }

        $("#table_Main_LetterTemplates").jqGrid({
            //data: mydata,
            url: getDomain() + Main_LetterTemplatesView.variables.BindMasterUrl,
            datatype: "xml",
            height: '100%',
            autowidth: true,
            shrinkToFit: true,
            rowNum: 25,
            rowList: [25, 50, 100],
            colNames: colNames,
            colModel: colModel,
            pager: "#pager_Main_LetterTemplates",
            xmlReader: {
                root: xmlvars.common_root,
                row: xmlvars.common_row,
                page: xmlvars.common_response + "CURRENTPAGE",
                total: xmlvars.common_response + "TOTALPAGES",
                records: xmlvars.common_response + "TOTALRECORDS",
                repeatitems: false,
                id: "LETTERTEMPLATEID"
            },
            loadComplete: function () {
                $("tr.jqgrow:even").addClass('myAltRowClass');
                $("#table_Main_LetterTemplates").jqGrid('setGridHeight', $(window).innerHeight() - 190 - ($("#gbox_table_Main_LetterTemplates").height() - $('#gbox_table_Main_LetterTemplates .ui-jqgrid-bdiv').height()));

                // Hide column headers and top pager if no records were returned
                if ($('#table_Main_LetterTemplates').getGridParam('records') === 0) {
                    $('.ui-jqgrid-htable').hide();
                }
                else
                    $('.ui-jqgrid-htable').show();


                var width = $('#jqGrid_list_NotificationTemplates').width();
                if (width <= 630) {
                    width = 500;
                }
                $('#table_Main_LetterTemplates').setGridWidth(width);

            },
            loadError: OnJqloadError,
            beforeProcessing: OnJqbeforeProcessingErrorcheck,
            viewrecords: true,
            hidegrid: false,
            sortname: 'LETTERTEMPLATEID',
            sortorder: 'desc',
        });

        // Setup buttons
        $("#table_Main_LetterTemplates").jqGrid('navGrid', '#pager_Main_LetterTemplates',
                { edit: false, add: false, del: false, search: true },
                { height: 200 }
        );

        $("#pager_Main_LetterTemplates_left").css("width", "");
        AlignJqGridHeader('table_Main_LetterTemplates', ['edit', 'act']);
    },
    triggerInitialClick: function () {
        var selectedcategory = 'Admin';
        Main_LetterTemplatesView.initializeJqgrid();
        Main_LetterTemplatesView.BindNotificationType(selectedcategory);
        Main_LetterTemplatesView.clearControls();
    },
    triggerId: function (id, oper) {
        $("input[name=radioparty]").attr('disabled', true);
        $("#ddlActivityType").attr("disabled", true);
        $("#ddlActivityType").css("cursor", "no-drop");
        $(".radiocategory").css("cursor", "no-drop");
        BindDropdown('txt_employeename', 'Dataemployeename', "/Common/BindMastersDetails?ServiceName=USERDETAILS_GET&IsRecordAll=true&ColumnRequested=SAL_EMPFULLNAME,USERID&sidx=EMPLOYEE_NAME&sord=asc", '');
        var rowData = jQuery("#table_Main_LetterTemplates").getRowData(id);
        if (rowData['LETTERCATEGORY'] == "Admin") {
            var categoryradio = $("input[name=radioparty][value=" + rowData['LETTERCATEGORY'] + "]").prop('checked', true);
            $("#employeediv").show();
        }
        else if (rowData['LETTERCATEGORY'] == "Party") {
            categoryradio = $("input[name=radioparty][value=" + rowData['LETTERCATEGORY'] + "]").prop('checked', true);
            $("#employeediv").hide();
        }
        else if (rowData['LETTERCATEGORY'] == "Outlet") {
            categoryradio = $("input[name=radioparty][value=" + rowData['LETTERCATEGORY'] + "]").prop('checked', true);
            $("#employeediv").hide();
        }
        else if (rowData['LETTERCATEGORY'] == "Sales") {
            categoryradio = $("input[name=radioparty][value=" + rowData['LETTERCATEGORY'] + "]").prop('checked', true);
            $("#employeediv").hide();
        }
        else if (rowData['LETTERCATEGORY'] == "B2C") {
            categoryradio = $("input[name=radioparty][value=" + rowData['LETTERCATEGORY'] + "]").prop('checked', true);
            $("#employeediv").hide();
        }
        $("#hdnTemplatesID").val(id);
        $("#typeofcategory").val(categoryradio);
        $("#lettername").val(rowData['LETTERNAME']);
        $("#txtEmailSubject").val(rowData['SUBJECT']);
        $("#txtEmailBody").code(rowData['EMAILBODY']);
        $("#txtSMSBody").val(rowData['SMSBODY']);
        var selectedcategory = rowData['LETTERCATEGORY'];
        Main_LetterTemplatesView.BindNotificationType(selectedcategory);
        $("#ddlActivityType").val(rowData['LETTERTYPEID']);
        var selectedValuesTest = rowData["EMPLOYEEID"].split(',');
        $('#txt_employeename').val(selectedValuesTest).trigger("change");
        Main_LetterTemplatesView.updateCount();
        Main_LetterTemplatesView.variables.EmailLength = rowData['EMAILBODY'].length;
        Main_LetterTemplatesView.variables.SubjectLength = rowData['SUBJECT'].length;
        Main_LetterTemplatesView.variables.SMSLength = rowData['SMSBODY'].length;
        $("#panelEditTemplates").show();
        $("#panelListTemplates").hide();
        Main_LetterTemplatesView.showTitlePermissionWise(oper);
    },
    showTitlePermissionWise: function (oper) {
        if (oper == 'edit' || oper == 'add') {
            $("#btnSaveTemplates").show();
            $("#btnimageUpload").show();
            $(".permissionaddimage").show();
            $(".permissiondlt").hide();
        }
        else {
            if ($("#btnSaveTemplates").length > 0) {
                $("#btnSaveTemplates").hide();
            }
            if ($("#btnimageUpload").length > 0) {
                $("#btnimageUpload").hide();
            }
            if ($(".permissionaddimage").length > 0) {
                $(".permissionaddimage").hide();
            }
            if ($(".permissiondlt").length > 0) {
                $(".permissiondlt").show();
            }
        }
    },
    deleteRow: function (id) {
        $.confirm({
            'title': 'Delete Thiis Letter',
            'message': 'You are about to delete this Letter Detail. It can not be restored at a later time! Continue? ',
            'buttons': {
                'Yes': {
                    'class': 'yes',
                    'action': function () {
                        // delete data to DB
                        var dataP = {
                            LETTERTEMPLATEID: id,
                            oper: 'delete'
                        };
                        $.ajax({
                            url: getDomain() + Main_LetterTemplatesView.variables.PerformMasterOperationUrl,
                            type: "POST",
                            data: dataP,
                            async: false,
                            cache: false,
                            success: function (result) {
                                if ($(result).find('RESPONSECODE').text() == "0") {
                                    notificationMessage('Delete Operation', 'Record is deleted successfully', 'success');
                                    $("#table_Main_LetterTemplates").trigger("reloadGrid", [{ current: true }]);
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
        Main_LetterTemplatesView.clearControls();
        $("#panelEditTemplates").show();
        $("#panelListTemplates").hide();
        $("#spanTemplatesoper").text("Add New Notifiaction Template");
    },
    btnMasterSubmit: function () {

        var isValid = $("#frmLetterTemplates").valid();
        if ($('#txtEmailBody').code() == "" || $("#txtEmailBody").code() == null) {
            isValid = false;
        }
        if (!isValid) {

            $("#EmailBody_error").attr('style', 'display:block !important');
            $('#EmailBody_error').html("This field is required.");
            return;
        }

        Main_LetterTemplatesView.variables.Oper = 'Add';
        Main_LetterTemplatesView.variables.addedit = "added";
        Main_LetterTemplatesView.variables.Masterid = $("#hdnTemplatesID").val();

        if (Main_LetterTemplatesView.variables.Masterid != "0" && parseInt(Main_LetterTemplatesView.variables.Masterid) > 0) {
            Main_LetterTemplatesView.variables.Oper = 'Edit';
            Main_LetterTemplatesView.variables.addedit = 'updated';
        }
        var SMSBody = $('#txtSMSBody').val().substr(0, 159);
        var allemplyeename = [];
        $.each($(".allemplyeename option:selected"), function () {
            allemplyeename.push($(this).val());
        });

        if ($('input[name=radioparty]:checked').val() == 'Admin') {
            var emp = allemplyeename.join(",");
        }
        else {
            emp = '';
        }
        var data = {
            "LETTERTYPEID": $("#ddlActivityType").val(),
            "LETTERNAME": $("#lettername").val(),
            "SUBJECT": $("#txtEmailSubject").val(),
            "EMAILBODY": htmlEncode($('#txtEmailBody').code()),
            "SMSBODY": htmlEncode(SMSBody), //htmlEncode($('#txtSMSBody').val()),
            "oper": Main_LetterTemplatesView.variables.Oper,
            "LETTERTEMPLATEID": Main_LetterTemplatesView.variables.Masterid,
            "LETTERCATEGORY": $('input[name=radioparty]:checked').val(),
            "EMPLOYEEID": emp,
        }
        Main_LetterTemplatesView.savedata(data);

    },
    btnMasterSubmitOnSuccess: function (data) {
        if (Main_LetterTemplatesView.variables.Oper == 'Delete') {
            $('#btnDeleteTemplates').attr('disabled', false);
            $('#deleteTemplates').modal('hide');
        }
        else
            $('#btnSaveTemplates').attr('disabled', false);

        if ($(data).find('RESPONSECODE').text() == "0") {
            notificationMessage(Main_LetterTemplatesView.variables.Oper + ' Operation', 'Record is ' + Main_LetterTemplatesView.variables.addedit + ' successfully', 'success');
            Main_LetterTemplatesView.clearControls();
            $("#table_Main_LetterTemplates").trigger("reloadGrid", [{ current: true }]);
        }
        else {
            InvalidResponseCode(data);
        }
    },
    clearControls: function () {
        $("#panelEditTemplates").hide();
        $("#panelListTemplates").show();
        // $("#btnSaveTemplates").attr('disabled', true);
        $("#hdnTemplatesID").val("");
        $("#ddlActivityType").val("");
        $("#txtEmailSubject").val("");
        $("#ddlActivityType").val("");
        $("#txtEmailBody").code("");
        $("#txtSMSBody").val("");
        $("#lettername").val("");
        $("#txt_employeename").val("");
        $("#typeadmin").prop('checked', true);
        $("#litabSms a").removeClass("active");
        $("#litabEmail a").addClass("active");
        $("#tabSms").removeClass("active");
        $("#tabEmail").addClass("active");
        Main_LetterTemplatesView.updateCount();
        Main_LetterTemplatesView.variables.Oper = 'Add';
        Main_LetterTemplatesView.variables.addedit = "added";
        jQuery("#table_Main_LetterTemplates").jqGrid('resetSelection');
    },
    savedata: function (data) {
        $.ajax({
            url: getDomain() + Main_LetterTemplatesView.variables.PerformMasterOperationUrl,
            data: data,
            async: true,
            cache: false,
            type: 'POST',
            success: Main_LetterTemplatesView.btnMasterSubmitOnSuccess,
            error: OnError
        });
    },
    BindNotificationType: function (selectedcategory) {
        var myfilter = { rules: [] };
        myfilter.rules.push({ field: "LETTERCATEGORY", op: "eq", data: selectedcategory });
        $.ajax({
            url: getDomain() + Main_LetterTemplatesView.variables.BindActivityTypeUrl + "&myfilters=" + JSON.stringify(myfilter),
            async: false,
            cache: false,
            type: 'POST',
            success: function (data) {
                $("#ddlActivityType").html("");
                $("#ddlettervalue").html("");
                if ($(data).find('RESPONSECODE').text() == "0") {
                    var JsonObject = xml2json.parser(data);
                    if (JsonObject.serviceresponse.detailslist != undefined) {
                        $("#ddlActivityType").html("<option value='' selected disabled hidden >Select Type</option>");
                        $("#ddlActivityType").append($("#ActivityTypeList").render(JsonObject.serviceresponse.detailslist.details));
                    }
                    if (JsonObject.serviceresponse.detailsvaluelist != undefined) {
                        $("#ddlettervalue").append($("#DDLettervaluediv").render(JsonObject.serviceresponse.detailsvaluelist.detailsvalue));
                    }
                }
                else {
                    InvalidResponseCode(data);
                }
            },
            error: OnError
        });
    },
    updateCount: function () {
        var cs = $('#txtSMSBody').val().length;
        $('#TotalSMSchars').text(160 - cs);
    },
    saveimagedata: function (oldsrc, data, originalname) {
        var foldername = 'Letter Template';
        var originalfile = oldsrc;
        var newfile = $("#ItemimgPreview").attr('src');
        var data = {
            "LETTERTEMPLATEIMAGENAME": originalname,
            "oper": 'add',
        }
        $.ajax({
            type: 'POST',
            async: false,
            cache: false,
            url: getDomain() + "/Common/SaveSingleImage",
            data: { originalfile: originalfile, newfile: newfile, oper: 'Add', isResize: false, module: foldername },
            success: function (result) {
                data.LETTERTEMPLATEPATH = result;
                $.ajax({
                    url: getDomain() + "/Common/OpeartionsOnMaster?ServiceName=MAIN_LETTERTEMPLATEIMAGE_CRUD",
                    data: data,
                    async: true,
                    cache: false,
                    type: 'POST',
                    success: function () {
                        Main_LetterTemplatesView.Bindimage();
                    },
                    error: OnError,
                });
            },
            error: OnError
        });
    },
    Bindimage: function () {
        $.ajax({
            url: getDomain() + "/Common/BindMastersDetails?ServiceName=MAIN_LETTERTEMPLATEIMAGE_GET",
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
};
function Addimage(id) {
    var url;
    if (getDomain() == "/Trinity") {
        url = $("#hdndomainfirstpath").val() + $("#image" + id).attr('src');
    }
    else {
        url = $("#hdndomainfirstpath").val() + $("#image" + id).attr('src');
        //url = "http://www.trinityjewells.in" + $("#image" + id).attr('src');
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
                        data: { originalfile: originalfile, newfile: originalfile, oper: 'Delete', isResize: false, module: 'Letter Template' },
                        success: function (result) {
                            $.ajax({
                                url: getDomain() + "/Common/OpeartionsOnMaster?ServiceName=MAIN_LETTERTEMPLATEIMAGE_CRUD",
                                data: {
                                    LETTERTEMPLATEID: id,
                                    oper: 'delete'
                                },
                                async: true,
                                cache: false,
                                type: 'POST',
                                success: function (result) {
                                    if ($(result).find('RESPONSECODE').text() == "0") {
                                        notificationMessage('Delete Operation', 'Picture is deleted successfully', 'success');
                                        Main_LetterTemplatesView.Bindimage();
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
function htmlEncode(value) {
    return $('<div/>').text(value).html();
}
function htmlDecode(value) {
    return $('<div/>').html(value).text();
}
function linkvalue(text) {
    if ($("#tabEmail").hasClass("active")) {
        if (Main_LetterTemplatesView.variables.Subjectbody == "0") {
            var cursorPos = $('#txtEmailSubject').prop('selectionStart');
            var v = $('#txtEmailSubject').val();
            var textBefore = v.substring(0, cursorPos);
            var textAfter = v.substring(cursorPos, v.length);
            $('#txtEmailSubject').val(textBefore + '{' + text + '}' + textAfter);
        }
        else if (Main_LetterTemplatesView.variables.Subjectbody == "1") {
            $("#txtEmailBody").summernote("insertText", '{' + text + '}');
        }
    }
    else if ($("#tabSms").hasClass("active")) {
        var cursorPos = $('#txtSMSBody').prop('selectionStart');
        var v = $('#txtSMSBody').val();
        var textBefore = v.substring(0, cursorPos);
        var textAfter = v.substring(cursorPos, v.length);
        $('#txtSMSBody').val(textBefore + '{' + text + '}' + textAfter);
        Main_LetterTemplatesView.updateCount();
    }
}

$(document).ready(function () {
    $("#employeediv").show();
    var oldsrc, originalname;
    $('#txtEmailBody').summernote({
        height: 300,                 // set editor height
        minHeight: null,             // set minimum height of editor
        maxHeight: null,             // set maximum height of editor
        focus: true,
        onBlur: function () {
            Main_LetterTemplatesView.variables.Subjectbody = 1;
        },
    });
    Main_LetterTemplatesView.triggerInitialClick();
    $('#txt_employeename').select2({
        multiple: true,
    });
    $("#litabSms").click(function () {
        $("#litabSms a").addClass("active");
        $("#litabEmail a").removeClass("active");
        $("#litabEmail").removeClass("active");
        $("#tabSms").addClass("active");
        $("#tabEmail").removeClass("active");
    });
    $("#litabEmail").click(function () {
        $("#litabSms a").removeClass("active");
        $("#litabSms").removeClass("active");
        $("#litabEmail a").addClass("active");
        $("#tabSms").removeClass("active");
        $("#tabEmail").addClass("active");
    });
    $("#txtEmailSubject").click(function () {
        Main_LetterTemplatesView.variables.Subjectbody = 0;
    });
    $("#typeofcategory").click(function () {
        var selectedcategory = $('input[name=radioparty]:checked').val()
        Main_LetterTemplatesView.BindNotificationType(selectedcategory);
        if ($('input[name=radioparty]:checked').val() == 'Admin') {
            $("#employeediv").show();
        }
        else {
            $("#employeediv").hide();
        }
    })
    $("#btnAddTemplates").click(function () {
        BindDropdown('txt_employeename', 'Dataemployeename', "/Common/BindMastersDetails?ServiceName=USERDETAILS_GET&IsRecordAll=true&ColumnRequested=SAL_EMPFULLNAME,USERID&sidx=EMPLOYEE_NAME&sord=asc", '');
        $("#employeediv").show();
        $("input[name=radioparty]").attr('disabled', false);
        $(".radiocategory").css("cursor", "pointer");
        $("#ddlActivityType").attr("disabled", false);
        $("#ddlActivityType").css("cursor", "pointer");
        var selectedcategory = 'Admin';
        Main_LetterTemplatesView.BindNotificationType(selectedcategory);
        Main_LetterTemplatesView.btnMasterShowAddPanel();
    });
    $("#btnSaveTemplates").click(function () {
        Main_LetterTemplatesView.btnMasterSubmit(Main_LetterTemplatesView.btnMasterSubmitOnSuccess);
    });
    $("#btnsmsTemplates").click(function () {
        Main_LetterTemplatesView.btnMasterSubmit(Main_LetterTemplatesView.btnMasterSubmitOnSuccess);
    });
    $('#btnCancelletter').click(function () {
        Main_LetterTemplatesView.clearControls();
        $("#frmLetterTemplates").validate().resetForm();
    });
    $('#txtSMSBody').on('keyup keydown change', function () {
        Main_LetterTemplatesView.updateCount();
    });
    $("#emailcontent").click(function () {
        $("#legendvalue").show();
        $("#picturevalue").hide();
    });
    $("#emailpicture").click(function () {
        $("#picturevalue").show();
        $("#legendvalue").hide();
        Main_LetterTemplatesView.Bindimage();
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
            Main_LetterTemplatesView.saveimagedata(oldsrc, response, originalname);
            if ($(lblError).length > 0) {
                $(lblError).hide();
                $(lblError).html("");
            }
        },
        error: OnError
    });

});