var NewsLetterEmailView = {
    variables: {
        BindMasterurl: "/Common/BindMastersDetails?ServiceName=EMAILDEMO_GET",
        PerformMasterurl: "/Common/OpeartionsOnMaster?ServiceName=EMAILDEMO_CRUDOPERATIONS",
        GetSateIdFromCityIdUrl: "/Common/BindMastersDetails?ServiceName=MASTER_COUNTRY_STATE_CITY_GET&ColumnRequested=ID",
        Oper: 'Add',
        EmaiURL: "/Account/SendMail",
        addedit: "added",
        Masterid: "",
        EmailHistory: null,
        processclicks: 1,
    },
    initializeJqgrid: function () {
        var colNames = ['EmailId', 'Template Name', 'Subject Name', 'Email Body', 'Publish', 'Preview'];
        var colModel = [
                { name: "EMAILID", index: "EMAILID", xmlmap: xmlvars.common_colmap + "EMAILID", stype: 'int', sortable: false, hidden: true },
                { name: "TEMPLATENAME", index: "TEMPLATENAME", width: 15, xmlmap: xmlvars.common_colmap + "TEMPLATENAME", stype: "text", sortable: true },
                { name: "SUBJECTNAME", index: "SUBJECTNAME", width: 50, xmlmap: xmlvars.common_colmap + "SUBJECTNAME", search: false, stype: "text", sortable: true },
                { name: "EMAILBODY", index: "EMAILBODY", xmlmap: xmlvars.common_colmap + "EMAILBODY", search: false, stype: "text", sortable: true, hidden: true },
                {
                    name: 'PUBLISH', index: 'PUBLISH', width: 5, sortable: false, align: "center", search: false,
                    formatter: function (cv, op, ro) {
                        return '<div data-id="' + op.rowId + '" '
                            + 'data-toggle="modal" data-from="Email" data-target="#modalPublish"><i style=\"cursor:pointer; color:royalblue;\"  title=\"Publish\" class="fa fa-paper-plane fa-lg"></i></div>';
                    } //class="btn btn-edit btn-quaternary" 
                },
                {
                    name: 'PREVIEW', index: 'PREVIEW', width: 5, sortable: false, align: "center", search: false,
                    formatter: function (cv, op, ro) {
                        return '<div data-id="' + op.rowId + '" data-toggle="modal" ' +
                        'data-target="#modalPreview" ><i style=\"cursor:pointer\" title=\"Preview\" class=\"hr-font-green fa fa-eye\"></i></div>';
                    } //class="btn btn-edit btn-quaternary" 
                },

        ];
        //colNames.push('History');
        //colModel.push({
        //    name: 'History', index: 'History', width: 5, sortable: false, align: "center", search: false, formatter: function (cv, op, ro) {
        //        return '<div data-id="' + op.rowId + '" data-toggle="modal" ' +
        //                  'data-target="#modalPublishHistory" ><i style=\"cursor:pointer\" title=\"Preview\" class=\"hr-font-green fa fa-history\"></i></div>';
        //    }
        //});
        colNames.push('Edit');
        colModel.push({ name: 'edit', index: 'edit', width: 5, sortable: false, align: "center", search: false, formatter: function (cv, op, ro) { return jqGridVariables.editBtnFmatter(cv, op, ro, 'NewsLetterEmailView', 'edit') } });
        colNames.push('Delete');
        colModel.push({ name: 'act', index: 'act', width: 5, sortable: false, align: "center", search: false, formatter: function (cv, op, ro) { return jqGridVariables.deleteBtnFmatter(cv, op, ro, 'NewsLetterEmailView') } });

        $("#table_list_Email").jqGrid({
            url: getDomain() + NewsLetterEmailView.variables.BindMasterurl,
            datatype: "xml",
            height: '100%',
            autowidth: true,
            shrinkToFit: true,
            rowNum: 25,
            rowList: [25, 50, 100],
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
        $("#pager_list_Email").css("width", "");
        AlignJqGridHeader('table_list_Email', ['edit', 'act', 'PUBLISH', 'PREVIEW', 'History']);
    },
    triggerInitialClick: function () {
        NewsLetterEmailView.clearControls();
        NewsLetterEmailView.initializeJqgrid();
        NewsLetterEmailView.Bindimage();
        NewsLetterEmailView.BindEmailPubishHistory();
    },
    triggerId: function (id, oper) {
        NewsLetterEmailView.clearControls();
        var rowData = jQuery("#table_list_Email").getRowData(id);
        NewsLetterEmailView.variables.Masterid = id;
        $("#txtEmail").val(rowData['TEMPLATENAME']);
        $("#txtEmailSub").val(rowData['SUBJECTNAME']);
        $('.summernote').code(rowData['EMAILBODY']),
        $("#hdnEmailId").val(id);
        $("#pnlHistoryEmail").hide();
        $("#gridhistoryemaildiv").hide();
        $("#pnlEditEmail").show();
        $("#pnlViewEMail").hide();
        $("#pnldeleteEmail").hide();
        NewsLetterEmailView.showTitlePermissionWise(oper);
    },
    deleteRow: function (id) {
        NewsLetterEmailView.variables.addedit = "deleted";
        NewsLetterEmailView.variables.Oper = "Delete";
        $("#pnlHistoryEmail").hide();
        $("#gridhistoryemaildiv").hide();
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
        var isValid = $("#frmemail").valid();
        if (!isValid)
            return;

        var isvalid = 0;
        if ($('#txtEmailBody').code() != "" && $("#txtEmailBody").code() != null) {
            isvalid = 1;
        }
        if (isvalid != 0) {
            $("#EmailBody_error").hide();

            NewsLetterEmailView.variables.Oper = 'Add';
            NewsLetterEmailView.variables.addedit = "added";
            NewsLetterEmailView.variables.Masterid = $("#hdnEmailId").val();

            if (NewsLetterEmailView.variables.Masterid != "0" && parseInt(NewsLetterEmailView.variables.Masterid) > 0) {
                NewsLetterEmailView.variables.Oper = 'Edit';
                NewsLetterEmailView.variables.addedit = 'updated';
            }

            $('#btnSaveEmail').attr('disabled', true);

            var data = {
                "oper": NewsLetterEmailView.variables.Oper,
                "TEMPLATENAME": $("#txtEmail").val(),
                "SUBJECTNAME": $("#txtEmailSub").val(),
                "EMAILBODY": $('.summernote').code(),//$("#txtEmailBody").html(),
                "EMAILID": NewsLetterEmailView.variables.Masterid
            }

            NewsLetterEmailView.savedata(NewsLetterEmailView.variables.Oper, data);
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
            "oper": NewsLetterEmailView.variables.Oper,
            "EMAILID": $("#hdnEmailId").val()
        }
        NewsLetterEmailView.savedata(NewsLetterEmailView.variables.Oper, data);
    },
    btnMasterSubmitOnSuccess: function (data) {
        if (NewsLetterEmailView.variables.Oper == 'Delete')
            $('#btnDeleteEmail').attr('disabled', false);
        else
            $('#btnSaveEmail').attr('disabled', false);

        if ($(data).find('RESPONSECODE').text() == "0") {
            notificationMessage(NewsLetterEmailView.variables.Oper + ' Operation', 'Record is ' + NewsLetterEmailView.variables.addedit + ' successfully', 'success');
            NewsLetterEmailView.clearControls();
            $("#table_list_Email").trigger("reloadGrid", [{ current: true }]);
        }
        else {
            InvalidResponseCode(data);
        }
    },
    btnMasterShowAddPanel: function () {
        NewsLetterEmailView.clearControls();
        NewsLetterEmailView.variables.Masterid = 0;
        $("#pnlEditEmail").show();
        $("#pnlViewEMail").hide();
        $("#pnldeleteEmail").hide();

    },
    btnMasterCancel: function () {
        NewsLetterEmailView.clearControls();
        jQuery("#table_list_Email").jqGrid('resetSelection');
    },
    clearControls: function () {
        $("#pnlHistoryEmail").hide();
        $("#gridhistoryemaildiv").show();
        $("#iEmailProcessDetail").addClass("fa-caret-down");
        $("#iEmailProcessDetail").removeClass("fa-caret-up");
        $("#spEmailProcessDetail").html("Show Email Publish History");
        $("#pnlEditEmail").hide();
        $("#pnlViewEMail").show();
        $("#pnldeleteEmail").hide();
        $("#txtEmail").val("");
        $("#txtEmailSub").val("");
        $("#hdnEmailId").val("");
        $('#txtEmailBody').code("");
        $("#frmemail").validate().resetForm();
        NewsLetterEmailView.variables.Oper = 'Add';
        NewsLetterEmailView.variables.addedit = "added";
        NewsLetterEmailView.variables.Masterid = "";
    },
    savedata: function (oper, data) {
        $.ajax({
            url: getDomain() + NewsLetterEmailView.variables.PerformMasterurl,
            data: data,
            async: true,
            cache: false,
            type: 'POST',
            success: NewsLetterEmailView.btnMasterSubmitOnSuccess,
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
                        NewsLetterEmailView.Bindimage();
                    },
                    error: OnError,
                });
            },
            error: OnError
        });
    },
    CityChange: function (val) {
        var myfilter = { groupOp: "AND", rules: [] };
        myfilter.rules.push({ field: "CITYID", op: "eq", data: val })
        $.ajax({
            url: getDomain() + NewsLetterEmailView.variables.GetSateIdFromCityIdUrl + "&myfilters=" + JSON.stringify(myfilter),
            async: true,
            cache: false,
            type: 'POST',
            success: function (data) {
                $("#ddlState").val($(data).find('STATEID').text());
                $("#ddlCountry").val($(data).find('COUNTRYID').text());
            },
            error: OnError,
        });
    },
    OnUserTypeChange: function (Element) {
        if ($(Element).val() == 'AddressBook') {
            $('#ddlUserGroups').val('').trigger("change");
            $("#ddlUserGroups").addClass('required');
            $("#Email1").prop('checked', true);
            if ($("#hdnPublishFrom").val() == 'SMS') {
                $("#lblUserGroups").show();
                $("#divUserGroups").show();
                $("#lblSMSMailTo").hide();
                $("#DivSMSMailTo").hide();
            }
            else {
                $("#lblUserGroups").show();
                $("#divUserGroups").show();
                $("#lblSMSMailTo").show();
                $("#DivSMSMailTo").show();
            }
        }
        else {
            $("#ddlUserGroups").removeClass('required');
            $("#lblUserGroups").hide();
            $("#divUserGroups").hide();
            $("#lblSMSMailTo").hide();
            $("#DivSMSMailTo").hide();
        }
    },
    BindStateData: function () {
        BindDropdownState('ddlState', 'DdlStateList', "/Common/BindMastersDetails?ServiceName=MASTER_COUNTRY_STATE_CITY_GET&ColumnRequested=STATE&ISRECORDALL=true&_search=true&searchField=COUNTRYID&searchOper=eq&searchString=" + $("#ddlCountry").val(), 'Select State');
    },
    BindCityData: function () {
        BindDropdownCity('ddlCity', 'DdlcityList', "/Common/BindMastersDetails?ServiceName=MASTER_COUNTRY_STATE_CITY_GET&ColumnRequested=CITY&ISRECORDALL=true&_search=true&searchField=STATEID&searchOper=eq&searchString=" + $("#ddlState").val(), 'Select City');
    },
    clearPublishvalue: function () {
        $("#ddlUserGroups").removeClass('required');
        $('#ddlUserGroups').val('').trigger("change");
        $("#Email1").prop('checked', true);
        $("#DivAddressBook").hide();
        $("#DivPublishSubject").hide();
        $("#ddlEmailProfile").val("");
        $("#ddlUserType").val("");
        $("#ddlCountry").val("");
        $("#ddlState").val("");
        $("#ddlCity").val("");
        $("#ddlState").html("");
        $("#ddlCity").html("");
        $('#hdnPublishTemplateId').val("");
        $("#hdnPublishFrom").val("");
    },
    PublishEamil: function () {
        var isValid = $("#FrmPublishEmail").valid();
        if (!isValid)
            return;

        data = {
            "EMAILTEMPLATEID": $("#hdnPublishTemplateId").val(),
            "EMAILPROFILEID": $("#ddlEmailProfile").val(),
            "EMAILUSERTYPE": $("#ddlUserType").val(),
        };

        if ($("#ddlUserType").val() == 'AddressBook') {
            var UserGroup = ''
            UserGroup = $("#ddlUserGroups").select2('val');
            if (UserGroup.length > 0)
                UserGroup = UserGroup.toString();

            data.USERGROUPS = UserGroup;

            if ($("#Email1").prop('checked') == true) {
                data.EMAIL1 = 1;
                data.EMAIL2 = 0;
            }
            else if ($("#Email2").prop('checked') == true) {
                data.EMAIL2 = 1;
                data.EMAIL1 = 0;
            }
        }

        if ($("#ddlCountry").val() != '' && $("#ddlCountry").val() != null) {
            data.COUNTRY = $("#ddlCountry").val()
        }
        if ($("#ddlState").val() != '' && $("#ddlState").val() != null) {
            data.STATE = $("#ddlState").val()
        }
        if ($("#ddlCity").val() != '' && $("#ddlCity").val() != null) {
            data.CITY = $("#ddlCity").val()
        }

        $.ajax({
            url: getDomain() + "/Common/OpeartionsOnMaster?ServiceName=EMAILDEMO_PUBLISH",
            data: data,
            async: true,
            cache: false,
            type: 'POST',
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    $("#modalPublish").modal('hide');
                    notificationMessage('Publish Email Template', $(data).find('RESPONSEMESSAGE').text(), 'success');
                }
                else {
                    InvalidResponseCode(data);
                }
            },
            error: OnError,
        });
    },
    ShowProcessDetail: function () {
        if ($("#pnlHistoryEmail").css('display') == 'block') {
            $("#pnlHistoryEmail").hide();
            $("#iEmailProcessDetail").removeClass("fa-caret-up");
            $("#iEmailProcessDetail").addClass("fa-caret-down");
            $("#spEmailProcessDetail").html("Show Email Publish History");
        }
        else {
            $("#iEmailProcessDetail").removeClass("fa-caret-down");
            $("#iEmailProcessDetail").addClass("fa-caret-up");
            $("#spEmailProcessDetail").html("Hide Email Publish History");
            $("#pnlHistoryEmail").show();
            var width = $('#jqGridEmailHistory').width();
            if (width <= 430) {
                width = 700;
            }
            $('#tableEmailHistory').setGridWidth(width);
        }
    },
    BindEmailPubishHistory: function (Id) {
        var Url = getDomain() + "/Common/BindMastersDetails?ServiceName=EMAILDEMO_PUBLISH_HISTORY_GET";
        var colNames = ['NEWSLETTERSENDID', 'Email Profile', 'Usertype', 'PublishBy', 'Date', 'User Groups', 'City', 'State', 'Country', 'To Emailid', 'Total', 'Sent', 'Failed'];
        var colModel = [
                { name: "NEWSLETTERSENDID", index: "NEWSLETTERSENDID", xmlmap: xmlvars.common_colmap + "NEWSLETTERSENDID", stype: "text", search: false, sortable: false, hidden: true },
                { name: "EMAILPROFILE", index: "EMAILPROFILE", width: 11, xmlmap: xmlvars.common_colmap + "EMAILPROFILE", stype: "text", search: false, sortable: false },
                { name: "EMAILUSERTYPE", index: "EMAILUSERTYPE", width: 8, xmlmap: xmlvars.common_colmap + "EMAILUSERTYPE", stype: "text", search: false, sortable: false },
                { name: "PUBLISHBY", index: "PUBLISHBY", width: 10, xmlmap: xmlvars.common_colmap + "PUBLISHBY", stype: "text", search: false, sortable: false },
                { name: "PUBLISHDATE", index: "PUBLISHDATE", width: 10, xmlmap: xmlvars.common_colmap + "PUBLISHDATE", search: false, stype: "text", search: false, sortable: false, align: "center" },
                { name: "USERGROUPS", index: "USERGROUPS", width: 12, xmlmap: xmlvars.common_colmap + "USERGROUPS", stype: "text", search: false, sortable: false },
                { name: "CITY", index: "CITY", width: 8, xmlmap: xmlvars.common_colmap + "CITY", search: false, stype: "text", search: false, sortable: false, align: "center" },
                { name: "STATE", index: "STATE", width: 8, xmlmap: xmlvars.common_colmap + "STATE", search: false, stype: "text", search: false, sortable: false, align: "center" },
                { name: "COUNTRY", index: "COUNTRY", width: 8, xmlmap: xmlvars.common_colmap + "COUNTRY", search: false, stype: "text", search: false, sortable: false, align: "center" },
                { name: "TOEMAILID", index: "TOEMAILID", width: 7, xmlmap: xmlvars.common_colmap + "TOEMAILID", search: false, stype: "text", search: false, sortable: false, align: "center" },
                { name: "TOTALCOUNT", index: "TOTALCOUNT", width: 5, xmlmap: xmlvars.common_colmap + "TOTALCOUNT", search: false, stype: "text", search: false, sortable: false, align: "center" },
                {
                    name: "SENTCOUNT", index: "SENTCOUNT", width: 5, xmlmap: xmlvars.common_colmap + "SENTCOUNT", search: false, stype: "text", search: false, sortable: false, align: "center"
                     , formatter: function (cv, op, ro) {
                         if (cv != undefined && cv != '' && cv != null && cv > 0) {
                             return '<a href="javascript:void(0)" data-id="' + op.rowId + '" data-toggle="modal" data-Status="sent" data-target="#modalPublishHistory">' + cv + '</a>'
                         }
                         else {
                             return '';
                         }
                     }
                },
                {
                    name: "FAILEDCOUNT", index: "FAILEDCOUNT", width: 5, xmlmap: xmlvars.common_colmap + "FAILEDCOUNT", search: false, stype: "text", search: false, sortable: false, align: "center"
                    , formatter: function (cv, op, ro) {
                        if (cv != undefined && cv != '' && cv != null && cv > 0) {
                            return '<a href="javascript:void(0)" data-id="' + op.rowId + '" data-toggle="modal" data-Status="failed" data-target="#modalPublishHistory">' + cv + '</a>'
                        }
                        else {
                            return '';
                        }
                    }
                },

        ];
        if (NewsLetterEmailView.variables.EmailHistory == null) {
            NewsLetterEmailView.variables.EmailHistory = $("#tableEmailHistory").jqGrid({
                url: Url,
                datatype: "xml",
                height: '100%',
                autowidth: true,
                shrinkToFit: true,
                rowNum: 10,
                rowList: [10, 20, 30],
                colNames: colNames,
                colModel: colModel,
                pager: "#pagerEmailHistory",
                xmlReader: {
                    root: xmlvars.common_root,
                    row: xmlvars.common_row,
                    page: xmlvars.common_response + "CURRENTPAGE",
                    total: xmlvars.common_response + "TOTALPAGES",
                    records: xmlvars.common_response + "TOTALRECORDS",
                    repeatitems: false,
                    id: "NEWSLETTERSENDID"
                },
                loadComplete: function () {
                    $("tr.jqgrow:even").addClass('myAltRowClass');
                    if ($('#tableEmailHistory').getGridParam('records') === 0)
                        $('#jqGridEmailHistory .ui-jqgrid-htable').hide();
                    else
                        $('#jqGridEmailHistory .ui-jqgrid-htable').show();

                    //var width = $('#jqGrid_Email').width();
                    //if (width <= 430) {
                    //    width = 700;
                    //}
                    $('#tableEmailHistory').setGridWidth(1110);
                },
                loadError: OnJqloadError,
                beforeProcessing: OnJqbeforeProcessingErrorcheck,
                viewrecords: true,
                sortname: 'PUBLISHDATE',
                sortorder: 'desc',

            });

            // Setup buttons
            $("#tableEmailHistory").jqGrid('navGrid', '#pagerEmailHistory',
                    { edit: false, add: false, del: false, search: false },
                    { height: 200, reloadAfterSubmit: true }
            );
            $("#pagerEmailHistory").css("width", "");
            AlignJqGridHeader('tableEmailHistory', ['TOTALCOUNT', 'TOEMAILID', 'CITY', 'STATE', 'COUNTRY', 'PUBLISHDATE', 'FAILEDCOUNT', 'SENTCOUNT']);
        }
        else {
            $("#tableEmailHistory").jqGrid('setGridParam', { url: Url, page: 1 }).trigger("reloadGrid");
        }
    },
    BindEmailList: function () {
        $("#tableEmailList").html("");
        var ID = $("#hdnEmailNEwsLetterId").val();
        var Status = $("#hdnEmailNEwsLetterStatus").val();

        var myfilter = { groupOp: "AND", rules: [] };
        myfilter.rules.push({ field: "STATUS", op: "eq", data: Status });
        $.ajax({
            url: getDomain() + "/Common/BindMastersDetails?ServiceName=EMAILSENTLIST_GET" + "&page=" + NewsLetterEmailView.variables.processclicks + "&rows=10&myfilters=" + JSON.stringify(myfilter) + "&_search=true&searchField=NEWSLETTEREMAILID&searchOper=eq&searchString=" + ID,
            async: false,
            cache: false,
            type: 'POST',
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    var JsonObject = xml2json.parser(data);

                    if (JsonObject.serviceresponse.detailslist != undefined) {
                        $("#tableEmailList").html($("#EmailListDetail").render(JsonObject.serviceresponse.detailslist.details));
                    }

                    /* For pagination */
                    var view, totRecords = (JsonObject.serviceresponse != undefined) ? parseInt(JsonObject.serviceresponse.totalrecords) : 0,
                    pageSize = 10;
                    totPages = (JsonObject.serviceresponse != undefined) ? parseInt(JsonObject.serviceresponse.totalpages) : 0;

                    if (totRecords <= pageSize) {
                        $("#backwardEmailProcessDetail").attr('disabled', true);
                        $("#forwardEmailProcessDetail").attr('disabled', true);
                        $("#backwardEmailProcessDetail").hide();
                        $("#forwardEmailProcessDetail").hide();
                    }
                    else if (NewsLetterEmailView.variables.processclicks == totPages) {
                        $("#backwardEmailProcessDetail").attr('disabled', false);
                        $("#forwardEmailProcessDetail").attr('disabled', true);
                        $("#backwardEmailProcessDetail").show();
                        $("#forwardEmailProcessDetail").show();
                    }
                    else if (NewsLetterEmailView.variables.processclicks > 1 && NewsLetterEmailView.variables.processclicks < totPages) {
                        $("#backwardEmailProcessDetail").attr('disabled', false);
                        $("#forwardEmailProcessDetail").attr('disabled', false);
                        $("#backwardEmailProcessDetail").show();
                        $("#forwardEmailProcessDetail").show();
                    }
                    else {
                        $("#backwardEmailProcessDetail").attr('disabled', true);
                        $("#forwardEmailProcessDetail").attr('disabled', false);
                        $("#backwardEmailProcessDetail").show();
                        $("#forwardEmailProcessDetail").show();
                    }

                    if (totRecords < (pageSize * NewsLetterEmailView.variables.processclicks))
                        view = (parseInt(pageSize * (NewsLetterEmailView.variables.processclicks - 1)) + 1) + ' - ' + totRecords;
                    else
                        view = (parseInt(pageSize * (NewsLetterEmailView.variables.processclicks - 1)) + 1) + ' - ' + (pageSize * NewsLetterEmailView.variables.processclicks);

                    $("#EmailRecordsProcessDetail").html(view);
                    $("#TotalEmailRecordProcessDetail").html(totRecords);
                }
                else {
                    InvalidResponseCode(data);
                }
            },
            error: OnError
        });

        if ($("#tableEmailList").html() == "") {
            $("#DivEmailList").hide();
            $("#ProcessEmailDetailPager").hide();
            $("#lblEmailPCDGridMsg").show();
        }
        else {
            $("#DivEmailList").show();
            $("#ProcessEmailDetailPager").show();
            $("#lblEmailPCDGridMsg").hide();
        }
    },
}

var NewsLetterSMSView = {
    variables: {
        BindMasterurl: "/Common/BindMastersDetails?ServiceName=SMSDEMO_GET",
        PerformMasterurl: "/Common/OpeartionsOnMaster?ServiceName=SMSDEMO_CRUDOPERATIONS",
        Oper: 'Add',
        SMSURL: "/Account/SendSMS",
        addedit: "added",
        Masterid: "",
        SMSHistory: null,
        ProcessVar: [],
        TimerCounterVar: [],
        TotalRec: 0,
        IsAnyRunning: 0,
        processclicks: 1,
        FileView: function (cellvalue, options, rowObject) {
            if (cellvalue != null && cellvalue != undefined && cellvalue != '') {
                return "<a class='label-click' target='_self' href='javascript:void(0)' onclick=\'NewsLetterSMSView.ViewError('" + cellvalue + "');\'>View</div>";
            }
            else {
                return '';
            }
        }
    },
    initializeJqgrid: function () {
        var colNames = ['SmsId', 'Template Name', 'Language', 'Sms Body', 'Publish'];
        var colModel = [
                { name: "SMSID", index: "SMSID", xmlmap: xmlvars.common_colmap + "SMSID", stype: 'int', sortable: false, hidden: true },
                { name: "TEMPLATENAME", index: "TEMPLATENAME", width: 25, xmlmap: xmlvars.common_colmap + "TEMPLATENAME", stype: "text", sortable: true },
                { name: "LANGUAGE", index: "LANGUAGE", width: 10, xmlmap: xmlvars.common_colmap + "LANGUAGE", stype: "text", sortable: false },
                { name: "SMSBODY", index: "SMSBODY", width: 50, xmlmap: xmlvars.common_colmap + "SMSBODY", search: false, stype: "text", sortable: false },
                {
                    name: 'PUBLISH', index: 'PUBLISH', width: 5, sortable: false, align: "center", search: false,
                    formatter: function (cv, op, ro) {
                        return '<div data-id="' + op.rowId + '" '
                            + 'data-toggle="modal" data-from="SMS" data-target="#modalPublish"><i style=\"cursor:pointer; color:royalblue;\"  title=\"Publish\" class="fa fa-paper-plane fa-lg"></i></div>';
                    }
                },
        ];
        colNames.push('Edit');
        colModel.push({ name: 'edit', index: 'edit', width: 5, sortable: false, align: "center", search: false, formatter: function (cv, op, ro) { return jqGridVariables.editBtnFmatter(cv, op, ro, 'NewsLetterSMSView', 'edit') } });
        colNames.push('Delete');
        colModel.push({ name: 'act', index: 'act', width: 5, sortable: false, align: "center", search: false, formatter: function (cv, op, ro) { return jqGridVariables.deleteBtnFmatter(cv, op, ro, 'NewsLetterSMSView') } });

        $("#table_list_SMS").jqGrid({
            url: getDomain() + NewsLetterSMSView.variables.BindMasterurl,
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
        AlignJqGridHeader('table_list_SMS', ['edit', 'act', 'PUBLISH']);
    },
    triggerInitialClick: function () {
        NewsLetterSMSView.clearControls();
        NewsLetterSMSView.initializeJqgrid();
        NewsLetterSMSView.SMSTemplateHistory();
    },
    triggerId: function (id, oper) {
        $("#pnlHistorySMS").hide();
        $("#gridhistorysmsdiv").hide();
        var rowData = jQuery("#table_list_SMS").getRowData(id);
        NewsLetterSMSView.variables.Masterid = id;
        $("#txtSmsName").val(rowData['TEMPLATENAME']);
        $("#text_languages").val(rowData['LANGUAGE']);
        $("#txtSmsBody").val(rowData['SMSBODY']);
        $("#hdnSmsID").val(id);
        $("#pnlAddSMS").show();
        $("#pnlViewSMS").hide();
        $("#pnlDeleteSMS").hide();
        NewsLetterSMSView.showTitlePermissionWise(oper);
    },
    deleteRow: function (id) {
        $("#pnlHistorySMS").hide();
        $("#gridhistorysmsdiv").hide();
        NewsLetterSMSView.variables.addedit = "deleted";
        NewsLetterSMSView.variables.Oper = "Delete";
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
        NewsLetterSMSView.variables.Oper = 'Add';
        NewsLetterSMSView.variables.addedit = "added";
        NewsLetterSMSView.variables.Masterid = $("#hdnSmsID").val();
        if (NewsLetterSMSView.variables.Masterid != "0" && parseInt(NewsLetterSMSView.variables.Masterid) > 0) {
            NewsLetterSMSView.variables.Oper = 'Edit';
            NewsLetterSMSView.variables.addedit = 'updated';
        }
        $('#btnSaveSms').attr('disabled', true);
        var data = {
            "oper": NewsLetterSMSView.variables.Oper,
            "TEMPLATENAME": $("#txtSmsName").val(),
            "LANGUAGE": $("#text_languages").val(),
            "SMSBODY": $("#txtSmsBody").val(),
            "SMSID": NewsLetterSMSView.variables.Masterid
        }
        NewsLetterSMSView.savedata(NewsLetterSMSView.variables.Oper, data);
    },
    btnMasterDelete: function () {
        $('#btnDeleteSMS').attr('disabled', true);
        var data = {
            "oper": NewsLetterSMSView.variables.Oper,
            "SMSID": $("#hdnSmsID").val()
        }
        NewsLetterSMSView.savedata(NewsLetterSMSView.variables.Oper, data);
    },
    btnMasterSubmitOnSuccess: function (data) {
        if (NewsLetterSMSView.variables.Oper == 'Delete')
            $('#btnDeleteSMS').attr('disabled', false);
        else
            $('#btnSaveSms').attr('disabled', false);

        if ($(data).find('RESPONSECODE').text() == "0") {
            notificationMessage(NewsLetterSMSView.variables.Oper + ' Operation', 'Record is ' + NewsLetterSMSView.variables.addedit + ' successfully', 'success');
            NewsLetterSMSView.clearControls();
            $("#table_list_SMS").trigger("reloadGrid", [{ current: true }]);
        }
        else {
            InvalidResponseCode(data);
        }
    },
    btnMasterShowAddPanel: function () {
        NewsLetterSMSView.clearControls();
        NewsLetterSMSView.variables.Masterid = 0;

        $("#pnlAddSMS").show();
        $("#pnlViewSMS").hide();
        $("#pnlDeleteSMS").modal("hide");
    },
    btnMasterCancel: function () {
        NewsLetterSMSView.clearControls();
        jQuery("#table_list_SMS").jqGrid('resetSelection');
    },
    clearControls: function () {
        $("#pnlHistorySMS").hide();
        $("#gridhistorysmsdiv").show();
        $("#iProcessDetail").addClass("fa-caret-down");
        $("#iProcessDetail").removeClass("fa-caret-up");
        $("#spProcessDetail").html("Show SMS Publish History");
        $("#pnlAddSMS").hide();
        $("#pnlViewSMS").show();
        $("#pnlDeleteSMS").modal("hide");
        $("#text_languages").val("EN");
        $("#txtSmsName").val("");
        $("#txtSmsBody").val("");
        $("#hdnSmsID").val("");
        $("#frmSmsDemo").validate().resetForm();
        NewsLetterSMSView.variables.Oper = 'Add';
        NewsLetterSMSView.variables.addedit = "added";
        NewsLetterSMSView.variables.Masterid = "";
    },
    savedata: function (oper, data) {
        $.ajax({
            url: getDomain() + NewsLetterSMSView.variables.PerformMasterurl,
            data: data,
            async: true,
            cache: false,
            type: 'POST',
            success: NewsLetterSMSView.btnMasterSubmitOnSuccess,
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
    PublishSMS: function () {
        var isValid = $("#FrmPublishEmail").valid();
        if (!isValid)
            return;

        data = {
            "EMAILTEMPLATEID": $("#hdnPublishTemplateId").val(),
            "EMAILUSERTYPE": $("#ddlUserType").val(),
            "ISCOMPLETE": 0,
            "oper": "add"
        };

        if ($("#ddlUserType").val() == 'AddressBook') {
            var UserGroup = ''
            UserGroup = $("#ddlUserGroups").select2('val');
            if (UserGroup.length > 0)
                UserGroup = UserGroup.toString();
            data.USERGROUPS = UserGroup;
        }

        if ($("#ddlCountry").val() != '' && $("#ddlCountry").val() != null) {
            data.COUNTRY = $("#ddlCountry").val()
        }
        if ($("#ddlState").val() != '' && $("#ddlState").val() != null) {
            data.STATE = $("#ddlState").val()
        }
        if ($("#ddlCity").val() != '' && $("#ddlCity").val() != null) {
            data.CITY = $("#ddlCity").val()
        }

        $.ajax({
            url: getDomain() + "/Common/OpeartionsOnMaster?ServiceName=SMSPUBLISH",
            data: data,
            async: true,
            cache: false,
            type: 'POST',
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    $("#modalPublish").modal('hide');
                    notificationMessage('Publish SMS Template', $(data).find('RESPONSEMESSAGE').text(), 'success');
                    $('#rbtnPCDRunning').prop("checked", true)
                    $("#chkAutoRefresh").prop('checked', true);
                    var ProcessVar = setInterval(function () {
                        NewsLetterSMSView.SMSTemplateHistory();
                        $("#lblTimerCounter").html('10');
                        if (NewsLetterSMSView.variables.IsAnyRunning == 0) {
                            NewsLetterSMSView.clearProcess();
                        }
                    }, 1000);

                    var TimerCounterVar = setInterval(function () {
                        var counter = parseInt($("#lblTimerCounter").html());
                        if (counter > 0) { counter = counter - 1; };
                        $("#lblTimerCounter").html(counter);
                    }, 900);

                    if ($.inArray(ProcessVar, NewsLetterSMSView.variables.ProcessVar) == -1)
                        NewsLetterSMSView.variables.ProcessVar.push(ProcessVar);

                    if ($.inArray(TimerCounterVar, NewsLetterSMSView.variables.TimerCounterVar) == -1)
                        NewsLetterSMSView.variables.TimerCounterVar.push(TimerCounterVar);
                }
                else {
                    InvalidResponseCode(data);
                }
            },
            error: OnError,
        });
    },
    ShowProcessDetail: function () {
        if ($("#pnlHistorySMS").css('display') == 'block') {
            $("#pnlHistorySMS").hide();
            $("#iProcessDetail").removeClass("fa-caret-up");
            $("#iProcessDetail").addClass("fa-caret-down");
            $("#spProcessDetail").html("Show SMS Publish History");
        }
        else {
            $("#iProcessDetail").removeClass("fa-caret-down");
            $("#iProcessDetail").addClass("fa-caret-up");
            $("#spProcessDetail").html("Hide SMS Publish History");
            $("#pnlHistorySMS").show();
            var width = $('#jqGridSMSHistory').width();
            if (width <= 430) {
                width = 700;
            }
            $('#tableSMSHistory').setGridWidth(width);
        }
    },
    clearProcess: function () {
        var totProcessVar = NewsLetterSMSView.variables.ProcessVar.length, totTimerCounterVar = NewsLetterSMSView.variables.TimerCounterVar.length;
        if (totProcessVar > 0 && totTimerCounterVar > 0) {
            var i;
            for (i = 0; i < totProcessVar; i++) {
                clearInterval(NewsLetterSMSView.variables.ProcessVar[i]);
            }

            for (i = 0; i < totTimerCounterVar; i++) {
                clearInterval(NewsLetterSMSView.variables.TimerCounterVar[i]);
            }

            NewsLetterSMSView.variables.ProcessVar = [];
            NewsLetterSMSView.variables.TimerCounterVar = [];

            $("#lblTimerCounter").html('');
            $("#chkAutoRefresh").prop('checked', false);
        }
    },
    SMSTemplateHistory: function () {
        var status = '', isProcessStop = 0;
        NewsLetterSMSView.variables.IsAnyRunning = 0;

        if ($('#rbtnPCDAll').prop("checked"))
            status = 'ALL';
        else if ($('#rbtnPCDRunning').prop("checked"))
            status = 'Pending';
        else if ($('#rbtnPCDCompleted').prop("checked"))
            status = 'Completed';

        var myfilter = { groupOp: "AND", rules: [] };
        myfilter.rules.push({ field: "STATUS", op: "eq", data: status });

        var Url = getDomain() + "/Common/BindMastersDetails?ServiceName=SMSDEMO_PUBLISH_HISTORY_GET" + "&myfilters=" + JSON.stringify(myfilter);
        var colNames = ['NEWSLETTERSMSID', 'Template Name', 'PublishBy', 'Date', 'User Type', 'User Groups', 'City', 'State', 'Country', 'Lang', 'Total', 'Sent', 'Fail', 'Error']; //'Sms Body',
        var colModel = [
                { name: "NEWSLETTERSMSID", index: "NEWSLETTERSMSID", xmlmap: xmlvars.common_colmap + "NEWSLETTERSMSID", stype: "text", search: false, sortable: false, hidden: true },
                { name: "TEMPLATENAME", index: "TEMPLATENAME", width: 12, xmlmap: xmlvars.common_colmap + "TEMPLATENAME", stype: "text", sortable: true },
                { name: "PUBLISHBY", index: "PUBLISHBY", width: 12, xmlmap: xmlvars.common_colmap + "PUBLISHBY", stype: "text", search: false, sortable: false },
                { name: "PUBLISHDATE", index: "PUBLISHDATE", width: 8, xmlmap: xmlvars.common_colmap + "PUBLISHDATE", search: false, stype: "text", search: false, sortable: false, align: "center" },
                { name: "SMSUSERTYPE", index: "SMSUSERTYPE", width: 8, xmlmap: xmlvars.common_colmap + "SMSUSERTYPE", stype: "text", search: false, sortable: false },
                { name: "USERGROUPS", index: "USERGROUPS", width: 12, xmlmap: xmlvars.common_colmap + "USERGROUPS", stype: "text", search: false, sortable: false },
                { name: "CITY", index: "CITY", width: 8, xmlmap: xmlvars.common_colmap + "CITY", search: false, stype: "text", search: false, sortable: false, align: "center" },
                { name: "STATE", index: "STATE", width: 8, xmlmap: xmlvars.common_colmap + "STATE", search: false, stype: "text", search: false, sortable: false, align: "center" },
                { name: "COUNTRY", index: "COUNTRY", width: 8, xmlmap: xmlvars.common_colmap + "COUNTRY", search: false, stype: "text", search: false, sortable: false, align: "center" },
                { name: "LANGUAGES", index: "LANGUAGES", width: 4, xmlmap: xmlvars.common_colmap + "LANGUAGES", search: false, stype: "text", search: false, sortable: false, align: "center" },
                {
                    name: "TOTALCOUNT", index: "TOTALCOUNT", width: 5, xmlmap: xmlvars.common_colmap + "TOTALCOUNT", search: false, stype: "text", search: false, sortable: false, align: "center"
                    //, formatter: function (cv, op, ro) {
                    //    if (cv != undefined && cv != '' && cv != null) {
                    //        return '<a href="javascript:void(0)" data-id="' + op.rowId + '" data-toggle="modal" data-Status="" data-target="#modalSMSPublishHistory">' + cv + '</a>'
                    //    }
                    //    else
                    //    {
                    //        return '';
                    //    }
                    //}
                },
                {
                    name: "SENDCOUNT", index: "SENDCOUNT", width: 5, xmlmap: xmlvars.common_colmap + "SENDCOUNT", search: false, stype: "text", search: false, sortable: false, align: "center"
                    , formatter: function (cv, op, ro) {
                        if (cv != undefined && cv != '' && cv != null) {
                            return '<a href="javascript:void(0)" data-id="' + op.rowId + '" data-toggle="modal" data-Status="Send" data-target="#modalSMSPublishHistory">' + cv + '</a>'
                        }
                        else {
                            return '';
                        }
                    }
                },
                {
                    name: "FAILCOUNT", index: "FAILCOUNT", width: 5, xmlmap: xmlvars.common_colmap + "FAILCOUNT", search: false, stype: "text", search: false, sortable: false, align: "center"
                    , formatter: function (cv, op, ro) {
                        if (cv != undefined && cv != '' && cv != null) {
                            return '<a href="javascript:void(0)" data-id="' + op.rowId + '" data-toggle="modal" data-Status="Not Send" data-target="#modalSMSPublishHistory">' + cv + '</a>'
                        }
                        else {
                            return '';
                        }
                    }
                },
                {
                    name: "ERRORMEASSGE", index: "ERRORMEASSGE", width: 5, xmlmap: xmlvars.common_colmap + "ERRORMEASSGE", search: false, stype: "text", search: false, sortable: false, align: "center"
                    , formatter: function (cv, op, ro) {
                        if (cv != undefined && cv != '' && cv != null) {
                            return "<a target='_self' href='javascript:void(0)' onclick=\"NewsLetterSMSView.ViewError('" + cv + "');\">View</div>";
                        } else {
                            return '';
                        }
                    }
                },
        ];

        if (NewsLetterSMSView.variables.SMSHistory == null) {
            NewsLetterSMSView.variables.SMSHistory = $("#tableSMSHistory").jqGrid({
                url: Url,
                datatype: "xml",
                height: '100%',
                autowidth: true,
                shrinkToFit: true,
                rowNum: 10,
                rowList: [10, 20, 30],
                colNames: colNames,
                colModel: colModel,
                pager: "#pagerSMSHistory",
                xmlReader: {
                    root: xmlvars.common_root,
                    row: xmlvars.common_row,
                    page: xmlvars.common_response + "CURRENTPAGE",
                    total: xmlvars.common_response + "TOTALPAGES",
                    records: xmlvars.common_response + "TOTALRECORDS",
                    repeatitems: false,
                    id: "NEWSLETTERSMSID"
                },
                loadComplete: function () {
                    $("tr.jqgrow:even").addClass('myAltRowClass');
                    if ($('#tableSMSHistory').getGridParam('records') === 0)
                        $('#jqGridSMSHistory .ui-jqgrid-htable').hide();
                    else
                        $('#jqGridSMSHistory .ui-jqgrid-htable').show();

                    var width = $('#jqGridSMSHistory').width();
                    if (width <= 430) {
                        width = 700;
                    }
                    $('#tableSMSHistory').setGridWidth(width);

                    NewsLetterSMSView.GetRunningstatus();
                },
                loadError: OnJqloadError,
                beforeProcessing: OnJqbeforeProcessingErrorcheck,
                viewrecords: true,
                sortname: 'PUBLISHDATE',
                sortorder: 'desc',

            });
            // Setup buttons
            $("#tableSMSHistory").jqGrid('navGrid', '#pagerSMSHistory',
                    { edit: false, add: false, del: false, search: false },
                    { height: 200, reloadAfterSubmit: true }
            );
            AlignJqGridHeader('tableSMSHistory', ['TOTALCOUNT', 'LANGUAGES', 'CITY', 'STATE', 'COUNTRY', 'PUBLISHDATE', 'SENDCOUNT', 'FAILCOUNT']);
        }
        else {
            $("#tableSMSHistory").jqGrid('setGridParam', { url: Url, page: 1 }).trigger("reloadGrid");
        }

    },
    ViewError: function (ErrorDetail) {
        $("#TxtErrorDetail").text("");
        $("#TxtErrorDetail").text(ErrorDetail);
        $("#modalSMSError").modal('show');
    },
    BindSMSList: function () {
        $("#tableSMSList").html("");
        var ID = $("#hdnSMSNEwsLetterId").val();
        var Status = $("#hdnSMSNEwsLetterStatus").val();

        var myfilter = { groupOp: "AND", rules: [] };
        myfilter.rules.push({ field: "STATUS", op: "eq", data: Status });
        $.ajax({
            url: getDomain() + "/Common/BindMastersDetails?ServiceName=SMSSENTLIST_GET" + "&page=" + NewsLetterSMSView.variables.processclicks + "&rows=10&myfilters=" + JSON.stringify(myfilter) + "&_search=true&searchField=NEWSLETTERSMSID&searchOper=eq&searchString=" + ID,
            async: false,
            cache: false,
            type: 'POST',
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    var JsonObject = xml2json.parser(data);
                    if (JsonObject.serviceresponse.detailslist != undefined) {
                        $("#tableSMSList").html($("#SMSListDetail").render(JsonObject.serviceresponse.detailslist.details));
                    }

                    /* For pagination */
                    var view, totRecords = (JsonObject.serviceresponse != undefined) ? parseInt(JsonObject.serviceresponse.totalrecords) : 0,
                    pageSize = 10;
                    totPages = (JsonObject.serviceresponse != undefined) ? parseInt(JsonObject.serviceresponse.totalpages) : 0;

                    if (totRecords <= pageSize) {
                        $("#backwardProcessDetail").attr('disabled', true);
                        $("#forwardProcessDetail").attr('disabled', true);
                        $("#backwardProcessDetail").hide();
                        $("#forwardProcessDetail").hide();
                    }
                    else if (NewsLetterSMSView.variables.processclicks == totPages) {
                        $("#backwardProcessDetail").attr('disabled', false);
                        $("#forwardProcessDetail").attr('disabled', true);
                        $("#backwardProcessDetail").show();
                        $("#forwardProcessDetail").show();
                    }
                    else if (NewsLetterSMSView.variables.processclicks > 1 && NewsLetterSMSView.variables.processclicks < totPages) {
                        $("#backwardProcessDetail").attr('disabled', false);
                        $("#forwardProcessDetail").attr('disabled', false);
                        $("#backwardProcessDetail").show();
                        $("#forwardProcessDetail").show();
                    }
                    else {
                        $("#backwardProcessDetail").attr('disabled', true);
                        $("#forwardProcessDetail").attr('disabled', false);
                        $("#backwardProcessDetail").show();
                        $("#forwardProcessDetail").show();
                    }

                    if (totRecords < (pageSize * NewsLetterSMSView.variables.processclicks))
                        view = (parseInt(pageSize * (NewsLetterSMSView.variables.processclicks - 1)) + 1) + ' - ' + totRecords;
                    else
                        view = (parseInt(pageSize * (NewsLetterSMSView.variables.processclicks - 1)) + 1) + ' - ' + (pageSize * NewsLetterSMSView.variables.processclicks);

                    $("#RecordsProcessDetail").html(view);
                    $("#TotalRecordProcessDetail").html(totRecords);
                }
                else {
                    InvalidResponseCode(data);
                }
            },
            error: OnError
        });

        if ($("#tableSMSList").html() == "") {
            $("#DivSMSList").hide();
            $("#ProcessDetailPager").hide();
            $("#lblPCDGridMsg").show();
        }
        else {
            $("#DivSMSList").show();
            $("#ProcessDetailPager").show();
            $("#lblPCDGridMsg").hide();
        }
    },
    GetRunningstatus: function () {
        var myfilter = { groupOp: "AND", rules: [] };
        myfilter.rules.push({ field: "ISRUNNINGCHECK", op: "eq", data: 1 });
        $.ajax({
            url: getDomain() + "/Common/OpeartionsOnMaster?ServiceName=SMSDEMO_PUBLISH_HISTORY_GET" + "&myfilters=" + JSON.stringify(myfilter),
            async: true,
            cache: false,
            type: 'POST',
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    var isrunning = $(data).find('ISRUNNINGCHECK').text();
                    if (isrunning == undefined || isrunning == '1') {
                        NewsLetterSMSView.variables.IsAnyRunning = 1;
                    }
                    else {
                        NewsLetterSMSView.variables.IsAnyRunning = 0;
                    }
                }
                else {
                    InvalidResponseCode(data);
                }
            },
            error: OnError,
        });
    }
}

var B2C_SignalNotificationView = {
    variables: {
        BindMasterUrl: "/Common/BindMastersDetails?ServiceName=B2C_SIGNALNOTIFICATION_GET",
        BindHistoryMasterUrl: "/Common/BindMastersDetails?ServiceName=B2C_SIGNALNOTIFICATION_HISTORY_GET",
        PerformMasterOperationUrl: "/Common/OpeartionsOnMaster?ServiceName=B2C_SIGNALNOTIFICATION_CRUD",
        Oper: 'Add',
        addedit: "added",
        Masterid: "",
        // for form validation
        frmvalidator: $("#frmB2C_SignalNotification").validate({
            rules: {
                Header: {
                    required: true
                },
                Content: {
                    required: true
                }
            },
            messages: {
                Header: {
                    required: 'Header is required'
                },
                Content: {
                    required: 'Content is required'
                }
            }
        })
    },
    initializeJqgrid: function () {
        var colNames = ['SignalNotificationId', 'Header', 'Content', 'Image', 'Publish'];
        var colModel = [
             { name: "SIGNALNOTIFICATIONID", index: "SIGNALNOTIFICATIONID", xmlmap: xmlvars.common_colmap + "SIGNALNOTIFICATIONID", stype: 'int', sortable: false, hidden: true, search: false },
             { name: "HEADER", index: "HEADER", width: 25, xmlmap: xmlvars.common_colmap + "HEADER", stype: 'text', sortable: true, searchoptions: jqGridVariables.stringSearchOption },
             { name: "CONTENT", index: "CONTENT", width: 55, xmlmap: xmlvars.common_colmap + "CONTENT", stype: 'text', sortable: false, search: false },
             { name: "IMAGE", index: "IMAGE", xmlmap: xmlvars.common_colmap + "IMAGE", stype: 'text', sortable: false, search: false, formatter: imageFormat, hidden: true },
              {
                  name: 'PUBLISH', index: 'PUBLISH', width: 5, sortable: false, align: "center", search: false,
                  formatter: function (cv, op, ro) {
                      return '<div data-id="' + op.rowId + '" '
                          + 'data-from="Notification" onclick="B2C_SignalNotificationView.Showmodalnotification(' + op.rowId + ')"><i style=\"cursor:pointer; color:royalblue;\"  title=\"Publish\" class="fa fa-paper-plane fa-lg"></i></div>';
                  }
              },
        ];
        if (isU()) {
            colNames.push('Edit');
            colModel.push({ name: 'edit', index: 'edit', width: 5, sortable: false, align: "center", search: false, formatter: function (cv, op, ro) { return jqGridVariables.editBtnFmatter(cv, op, ro, 'B2C_SignalNotificationView', 'edit') } });
        }
        else {
            colNames.push('View');
            colModel.push({ name: 'edit', index: 'edit', width: 5, sortable: false, align: "center", search: false, formatter: function (cv, op, ro) { return jqGridVariables.editBtnFmatter(cv, op, ro, 'B2C_SignalNotificationView', 'view') } });
        }
        if (isD()) {
            colNames.push('Delete');
            colModel.push({ name: 'delete', index: 'delete', width: 5, sortable: false, align: "center", search: false, formatter: function (cv, op, ro) { return jqGridVariables.deleteBtnFmatter(cv, op, ro, 'B2C_SignalNotificationView') } });
        }
        function imageFormat(cellvalue, options, rowObject) {
            return '<img style="width:25px !important; height=25px !important;" src="' + getDomain() + '/UploadFiles/Notification/' + cellvalue + '" />';
        }
        $("#table_B2C_SignalNotification").GridUnload();
        $("#table_B2C_SignalNotification").jqGrid({
            //data: mydata,
            url: getDomain() + B2C_SignalNotificationView.variables.BindMasterUrl,
            datatype: "xml",
            height: "100%",
            autowidth: true,
            shrinkToFit: true,
            rowNum: 10,
            rowList: [10, 20, 30],
            colNames: colNames,
            colModel: colModel,
            pager: "#pager_B2C_SignalNotification",
            xmlReader: {
                root: xmlvars.common_root,
                row: xmlvars.common_row,
                page: xmlvars.common_response + "CURRENTPAGE",
                total: xmlvars.common_response + "TOTALPAGES",
                records: xmlvars.common_response + "TOTALRECORDS",
                repeatitems: false,
                id: "SIGNALNOTIFICATIONID"
            },
            loadComplete: function () {
                $("tr.jqgrow:even").addClass('myAltRowClass');

                // Hide column headers and top pager if no records were returned
                if ($('#table_B2C_SignalNotification').getGridParam('records') === 0) {
                    $('.ui-jqgrid-htable').hide();
                }
                else
                    $('.ui-jqgrid-htable').show();

                var width = $('#jqGrid_notification').width();
                if (width <= 430) {
                    width = 595;
                }
                $('#table_B2C_SignalNotification').setGridWidth(width);
            },
            loadError: OnJqloadError,
            beforeProcessing: OnJqbeforeProcessingErrorcheck,
            viewrecords: true,
            hidegrid: false,
            sortname: "SIGNALNOTIFICATIONID",
            sortorder: 'desc',
        });

        // Setup buttons
        $("#table_B2C_SignalNotification").jqGrid('navGrid', '#pager_B2C_SignalNotification',
                { edit: false, add: false, del: false, search: true },
                { height: 200 }
        );

        $("#pager_B2C_SignalNotification_left").css("width", "");
        AlignJqGridHeader('table_B2C_SignalNotification', ['edit', 'delete']);
    },
    initializehistoryJqgrid: function () {
        var colNames = ['SignalNotificationId', 'Header', 'Send By', 'Send Date'];
        var colModel = [
             { name: "SIGNALNOTIFICATIONHISTORYID", index: "SIGNALNOTIFICATIONHISTORYID", xmlmap: xmlvars.common_colmap + "SIGNALNOTIFICATIONHISTORYID", stype: 'int', sortable: false, hidden: true, search: false },
             { name: "HEADER", index: "HEADER", width: 30, xmlmap: xmlvars.common_colmap + "HEADER", stype: 'text', sortable: true, searchoptions: jqGridVariables.stringSearchOption },
             { name: "EMPLOYEE_NAME", index: "EMPLOYEE_NAME", width: 50, xmlmap: xmlvars.common_colmap + "EMPLOYEE_NAME", stype: 'text', sortable: true, search: true, searchoptions: jqGridVariables.stringSearchOption },
             { name: "CREATEDDATE", index: "CREATEDDATE", width: 20, xmlmap: xmlvars.common_colmap + "CREATEDDATE", stype: 'text', sortable: true, search: true, searchoptions: jqGridVariables.stringSearchOption, hidden: false },

        ];
        $("#tablenotHistory").GridUnload();
        $("#tablenotHistory").jqGrid({
            //data: mydata,
            url: getDomain() + B2C_SignalNotificationView.variables.BindHistoryMasterUrl,
            datatype: "xml",
            height: "100%",
            autowidth: true,
            shrinkToFit: true,
            rowNum: 10,
            rowList: [10, 20, 30],
            colNames: colNames,
            colModel: colModel,
            pager: "#pager_B2C_SignalNotification",
            xmlReader: {
                root: xmlvars.common_root,
                row: xmlvars.common_row,
                page: xmlvars.common_response + "CURRENTPAGE",
                total: xmlvars.common_response + "TOTALPAGES",
                records: xmlvars.common_response + "TOTALRECORDS",
                repeatitems: false,
                id: "SIGNALNOTIFICATIONHISTORYID"
            },
            loadComplete: function () {
                $("tr.jqgrow:even").addClass('myAltRowClass');

                // Hide column headers and top pager if no records were returned
                if ($('#tablenotHistory').getGridParam('records') === 0) {
                    $('.ui-jqgrid-htable').hide();
                }
                else
                    $('.ui-jqgrid-htable').show();

                var width = $('#jqGridnotHistory').width();
                if (width <= 430) {
                    width = 595;
                }
                $('#tablenotHistory').setGridWidth(width);
            },
            loadError: OnJqloadError,
            beforeProcessing: OnJqbeforeProcessingErrorcheck,
            viewrecords: true,
            hidegrid: false,
            sortname: "SIGNALNOTIFICATIONHISTORYID",
            sortorder: 'desc',
        });

        // Setup buttons
        $("#tablenotHistory").jqGrid('navGrid', '#pagernotHistory',
                { edit: false, add: false, del: false, search: true },
                { height: 200 }
        );

        $("#pagernotHistory_left").css("width", "");
        AlignJqGridHeader('tablenotHistory', ['edit', 'delete']);
    },
    Showmodalnotification: function (id) {
        var rowData = jQuery("#table_B2C_SignalNotification").getRowData(id);
        $("#lblhidennotifyid").val(id);
        $("#lbltitle").html(rowData['HEADER']);
        $("#lblcontent").html(rowData['CONTENT']);
        $('#lblimage').attr('src', $(rowData['IMAGE']).attr('src'));
        $("#modalnotification").modal("show");
    },
    ShowProcessDetail: function () {
        if ($("#pnlHistorynotification").css('display') == 'block') {
            $("#pnlHistorynotification").hide();
            $("#inotProcessDetail").removeClass("fa-caret-up");
            $("#inotProcessDetail").addClass("fa-caret-down");
            $("#spnotProcessDetail").html("Show Notification History");
        }
        else {
            $("#inotProcessDetail").removeClass("fa-caret-down");
            $("#inotProcessDetail").addClass("fa-caret-up");
            $("#spnotProcessDetail").html("Hide Notification History");
            $("#pnlHistorynotification").show();
            var width = $('#jqGridSMSHistory').width();
            if (width <= 430) {
                width = 700;
            }
            B2C_SignalNotificationView.initializehistoryJqgrid();
            $('#tableSMSHistory').setGridWidth(width);
        }
    },
    triggerInitialClick: function () {
        B2C_SignalNotificationView.initializeJqgrid();
        B2C_SignalNotificationView.initializehistoryJqgrid();
        B2C_SignalNotificationView.clearControls();
    },
    triggerId: function (id, oper) {
        $("#pnlHistorynotification").hide();
        $("#inotProcessDetail").removeClass("fa-caret-up");
        $("#inotProcessDetail").addClass("fa-caret-down");
        $("#spnotProcessDetail").html("Show Notification History");
        $("#gridshowhidedivnotification").hide();
        var rowData = jQuery("#table_B2C_SignalNotification").getRowData(id);
        $("#hdnSignalNotificationId").val(rowData['SIGNALNOTIFICATIONID']);
        $("#txtHeader").val(rowData['HEADER']);
        $("#txtContent").val(rowData['CONTENT']);
        $('#imgempprofileimg').attr('src', $(rowData['IMAGE']).attr('src'));
        $('#imgempprofileimg').data('oldurl', $(rowData['IMAGE']).attr('src'));
        $("#panelB2C_SignalNotificationEdit").show();
        $("#panelB2C_SignalNotificationDelete").hide();
        $("#panelB2C_SignalNotificationList").hide();
        $("#spanB2C_SignalNotificationoper").text("Edit SignalNotification");
        B2C_SignalNotificationView.showTitlePermissionWise(oper);
    },
    deleteRow: function (id) {
        B2C_SignalNotificationView.variables.addedit = "deleted";
        B2C_SignalNotificationView.variables.Oper = "Delete";
        $("#pnlHistorynotification").hide();
        $("#inotProcessDetail").removeClass("fa-caret-up");
        $("#inotProcessDetail").addClass("fa-caret-down");
        $("#spnotProcessDetail").html("Show Notification History");
        $("#gridshowhidedivnotification").hide();
        var rowData = jQuery("#table_B2C_SignalNotification").getRowData(id);
        $("#delblHeader").html(rowData['HEADER']);
        $("#delblContent").html(rowData['CONTENT']);
        $("#delblImage").html(rowData['IMAGE']);
        $("#hdnSignalNotificationId").val(id);
        $("#panelB2C_SignalNotificationEdit").hide();
        $("#panelB2C_SignalNotificationDelete").show();
        $("#panelB2C_SignalNotificationList").hide();
    },
    btnMasterShowAddPanel: function () {
        B2C_SignalNotificationView.clearControls();

        $("#panelB2C_SignalNotificationEdit").show();
        $("#panelB2C_SignalNotificationDelete").hide();
        $("#panelB2C_SignalNotificationList").hide();
        $("#spanSignalNotificationIdoper").text("Add New SignalNotification");
        B2C_SignalNotificationView.showTitlePermissionWise('add');
    },
    btnMasterDelete: function () {
        if (isD() == 0) {
            notificationMessage('Response', permissionvars.unauthorized, 'error');
            return;
        }
        $('#btnDeleteB2C_SignalNotification').attr('disabled', true);
        var data = {
            "oper": B2C_SignalNotificationView.variables.Oper,
            "SIGNALNOTIFICATIONID": $("#hdnSignalNotificationId").val()
        }
        B2C_SignalNotificationView.savedata(data);
    },
    btnMasterSubmit: function () {
        var isValid = $("#frmB2C_SignalNotification").valid();
        if (!isValid)
            return;

        B2C_SignalNotificationView.variables.Oper = 'Add';
        B2C_SignalNotificationView.variables.addedit = "added";
        B2C_SignalNotificationView.variables.Masterid = $("#hdnSignalNotificationId").val();

        if (B2C_SignalNotificationView.variables.Masterid != "0" && parseInt(B2C_SignalNotificationView.variables.Masterid) > 0) {
            B2C_SignalNotificationView.variables.Oper = 'Edit';
            B2C_SignalNotificationView.variables.addedit = 'updated';
        }
        if (B2C_SignalNotificationView.variables.Oper == 'Add' && isA() == 0) {
            notificationMessage('Response', permissionvars.unauthorized, 'error');
            return;
        }
        if (B2C_SignalNotificationView.variables.Oper == 'Edit' && isU() == 0) {
            notificationMessage('Response', permissionvars.unauthorized, 'error');
            return;
        }

        $('#btnSaveB2C_SignalNotification').attr('disabled', true);

        var NotiImage = $('#imgempprofileimg').attr('src');

        if (NotiImage.indexOf('noImage.png') > -1)
            NotiImage = '';


        //if (EmployeeImage != '')
        NotiImage = NotiImage.substr(NotiImage.lastIndexOf('/') + 1);

        var data = {
            "HEADER": $("#txtHeader").val(),
            "CONTENT": $("#txtContent").val(),
            "oper": B2C_SignalNotificationView.variables.Oper,
            "IMAGE": NotiImage,
            "SIGNALNOTIFICATIONID": B2C_SignalNotificationView.variables.Masterid
        }
        B2C_SignalNotificationView.savedata(data, NotiImage);
    },
    btnMasterSubmitOnSuccess: function (data) {
        if (B2C_SignalNotificationView.variables.Oper == 'Delete')
            $('#btnDeleteB2C_SignalNotification').attr('disabled', false);
        else
            $('#btnSaveB2C_SignalNotification').attr('disabled', false);

        if ($(data).find('RESPONSECODE').text() == "0") {
            notificationMessage(B2C_SignalNotificationView.variables.Oper + ' Operation', 'Record is ' + B2C_SignalNotificationView.variables.addedit + ' successfully', 'success');
            B2C_SignalNotificationView.clearControls();
            $("#table_B2C_SignalNotification").trigger("reloadGrid", [{ current: true }]);
        }
        else {
            InvalidResponseCode(data);
        }
    },
    clearControls: function () {
        $("#panelB2C_SignalNotificationEdit").hide();
        $("#panelB2C_SignalNotificationDelete").hide();
        $("#panelB2C_SignalNotificationList").show();
        $("#gridshowhidedivnotification").show();
        $("#inotProcessDetail").addClass("fa-caret-down");
        $("#inotProcessDetail").removeClass("fa-caret-up");
        $("#spnotProcessDetail").html("Show Notification History");
        $("#hdnSignalNotificationId").val("");
        $("#txtHeader").val("");
        $("#txtContent").val("");
        $('#imgempprofileimg').attr('src', '');
        $("#frmB2C_SignalNotification").validate().resetForm();
        B2C_SignalNotificationView.variables.Oper = 'Add';
        B2C_SignalNotificationView.variables.addedit = "added";
        jQuery("#table_list_B2C_SignalNotification").jqGrid('resetSelection');
    },
    savedata: function (data, NotiImage) {
        var originalfile = '';
        var newfile = '';
        var foldername = 'Notification';

        if (B2C_SignalNotificationView.variables.Oper == 'Delete') {
            originalfile = $('#hdnDeletedImg').data('oldurl');
            newfile = $("#hdnDeletedImg").val();
        }
        else {
            originalfile = $('#imgempprofileimg').data('oldurl');
            newfile = $('#imgempprofileimg').attr('src');
        }
        $.ajax({
            type: 'POST',
            async: false,
            cache: false,
            url: getDomain() + "/Common/SaveSingleImage",
            data: {
                originalfile: originalfile, newfile: newfile, oper: B2C_SignalNotificationView.variables.Oper, isResize: false, module: foldername
            },
            success: function (result) {
                $.ajax({
                    url: getDomain() + B2C_SignalNotificationView.variables.PerformMasterOperationUrl,
                    data: data,
                    async: true,
                    cache: false,
                    type: 'POST',
                    success: B2C_SignalNotificationView.btnMasterSubmitOnSuccess,
                    error: OnError
                });
            },
            error: OnError
        });
    },
    showTitlePermissionWise: function (oper) {
        if (oper == 'edit' || oper == 'add') {
            $("#btnSaveB2C_SignalNotification").show();
            $("#dB2C_SignalNotificationTitle").show();
            $("#dViewB2C_SignalNotificationTitle").hide();
        }
        else {
            if ($("#btnSaveB2C_SignalNotification").length > 0) {
                $("#btnSaveB2C_SignalNotification").hide();
            }
            $("#dViewB2C_SignalNotificationTitle").show();
            $("#dB2C_SignalNotificationTitle").hide();
        }
    },
    Publishnotification: function () {
        var data = {
            "HEADER": $("#lbltitle").html(),
            "CONTENT": $("#lblcontent").html(),
            "IMAGE": $('#lblimage').attr('src'),
            "SIGNALNOTIFICATIONID": $("#lblhidennotifyid").val()
        }
        $.ajax({
            url: getDomain() + "/Common/OpeartionsOnMaster?ServiceName=SEND_NOTIFICATION",
            data: data,
            async: true,
            cache: false,
            type: 'POST',
            success: B2C_SignalNotificationView.btnMasterSubmitOnSuccessNotification,
            error: OnError
        });
    },
    btnMasterSubmitOnSuccessNotification: function (data) {
        if ($(data).find('RESPONSECODE').text() == "0") {
            $("#modalnotification").modal("hide");
            B2C_SignalNotificationView.initializehistoryJqgrid();
            notificationMessage('', 'Notification Send Successfully', 'success');
        }
        else {
            $("#modalnotification").modal("hide");
            InvalidResponseCode(data);
        }
    },
};
$(document).ready(function () {
    /*----email--------------------*/
    NewsLetterEmailView.triggerInitialClick();
    $('#txtEmailBody').summernote({
        height: 300,                 // set editor height
        dialogsInBody: true,
        minHeight: null,             // set minimum height of editor
        maxHeight: null,             // set maximum height of editor

        focus: true,                 // set focus to editable area after initializing summernote
    });

    $("#btnSaveEmail").click(function () {
        NewsLetterEmailView.btnMasterSubmit();
    });

    $("#btnAddNewEmail").click(function () {
        NewsLetterEmailView.clearControls();
        NewsLetterEmailView.btnMasterShowAddPanel();
    });

    $("#btnDeleteEmail").click(function () {
        NewsLetterEmailView.btnMasterDelete();
        jQuery("#table_list_Email").jqGrid('resetSelection');
    });

    $('button[name="cancelEmail"]').click(function () {
        NewsLetterEmailView.btnMasterCancel();
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
            NewsLetterEmailView.saveimagedata(oldsrc, response, originalname);
        },
        error: OnError
    });

    $('#ddlUserGroups').select2({
        multiple: true,
    });

    //triggered when modal is about to be shown
    $('#modalPublish').on('show.bs.modal', function (e) {
        NewsLetterEmailView.clearPublishvalue();
        $('#hdnPublishTemplateId').val(e.relatedTarget.dataset.id);
        var rowData = jQuery("#table_list_Email").getRowData(e.relatedTarget.dataset.id);
        $("#hdnPublishFrom").val(e.relatedTarget.dataset.from);
        $("#lblUserGroups").hide();
        $("#divUserGroups").hide();
        $("#lblSMSMailTo").hide();
        $("#DivSMSMailTo").hide();
        if ($("#hdnPublishFrom").val() == 'SMS') {
            $('#lblPublishSubject').html("");
            $("#DivPublishSubject").hide();
            $("#lblEmailProfile").hide();
            $("#DivEmailProfile").hide();
        }
        else {
            $('#lblPublishSubject').html(rowData["SUBJECTNAME"]);
            $("#DivPublishSubject").show();
            $("#lblEmailProfile").show();
            $("#DivEmailProfile").show();
        }

        BindDropdown('ddlEmailProfile', 'DivProfileList', "/Common/BindMastersDetails?ServiceName=EMAILSERVER_SETTINGS_GET&IsRecordAll=true&ColumnRequested=EMAILPROFILEID,PROFILE", 'Select Profile');
        BindUserGroup();
        BindDropdownCountry('ddlCountry', 'DdlCountryList', "/Common/BindMastersDetails?ServiceName=MASTER_COUNTRY_STATE_CITY_GET&ColumnRequested=COUNTRY&ISRECORDALL=true", 'Select Country');
    });

    $('#modalPreview').on('show.bs.modal', function (e) {
        var strHtml = '';
        if (e.relatedTarget.dataset.id != '0') {
            var rowData = jQuery("#table_list_Email").getRowData(e.relatedTarget.dataset.id);
            $('#lblSubject').html(rowData["SUBJECTNAME"]);
            strHtml = rowData["EMAILBODY"];
        }

        $('#lblEmail').html(strHtml);
    });

    $('#modalPublishHistory').on('show.bs.modal', function (e) {
        NewsLetterEmailView.variables.processclicks = 1;
        $("#hdnEmailNEwsLetterId").val(e.relatedTarget.dataset.id);
        $("#hdnEmailNEwsLetterStatus").val(e.relatedTarget.dataset.status);
        NewsLetterEmailView.BindEmailList();
    });

    $("#btnPublish").click(function () {
        var isValid = $("#FrmPublishEmail").valid();
        if (!isValid)
            return;

        $.confirm({
            'title': 'Publish Template',
            'content': 'Are you sure want to publish this template! Continue? ',
            'buttons': {
                'Yes': {
                    'class': 'yes',
                    'action': function () {
                        SubmitPublish();
                    }
                },
                'No': {
                    'class': 'no',
                    'action': function () {

                    }
                }
            }
        });
    });

    /*-----sms-------------------*/

    $("#chkAutoRefresh").click(function () {
        if ($(this).is(":checked")) {
            NewsLetterSMSView.clearProcess();
        }
        else {
            NewsLetterSMSView.SMSTemplateHistory();
        }
    });

    $("#btnAddNewSMS").click(function () {
        NewsLetterSMSView.btnMasterShowAddPanel();
    });

    $("#btnSaveSms").click(function () {
        NewsLetterSMSView.btnMasterSubmit();
    });

    $("#btnDeleteSMS").click(function () {
        NewsLetterSMSView.btnMasterDelete();
        $("#pnlDeleteSMS").hide();
    });

    $('button[name="cancelSMS"]').click(function () {
        NewsLetterSMSView.btnMasterCancel();
    });

    $('#modalSMSPublishHistory').on('show.bs.modal', function (e) {
        NewsLetterSMSView.variables.processclicks = 1;
        $("#hdnSMSNEwsLetterId").val(e.relatedTarget.dataset.id);
        $("#hdnSMSNEwsLetterStatus").val(e.relatedTarget.dataset.status);
        NewsLetterSMSView.BindSMSList();
    });

    /* ProcessDetail pager */
    $("#backwardProcessDetail").click(function () {
        NewsLetterSMSView.variables.processclicks -= 1;
        NewsLetterSMSView.BindSMSList();
    });
    $("#forwardProcessDetail").click(function () {
        NewsLetterSMSView.variables.processclicks += 1;
        NewsLetterSMSView.BindSMSList();
    });

    $('input[type=radio][name=PCDRadio]').change(function () {
        if ($(event.target).prop("checked")) {
            NewsLetterSMSView.SMSTemplateHistory();
        }
    });
    /*----------------Notification-----------*/
    $("#btnAddB2C_SignalNotification").click(function () {
        B2C_SignalNotificationView.btnMasterShowAddPanel();
    });
    $("#btnSaveB2C_SignalNotification").click(function () {
        B2C_SignalNotificationView.btnMasterSubmit(B2C_SignalNotificationView.btnMasterSubmitOnSuccess);
    });

    $("#btnDeleteB2C_SignalNotification").click(function () {
        B2C_SignalNotificationView.btnMasterDelete();
    });

    $('button[name="CancelB2C_SignalNotification"]').click(function () {
        B2C_SignalNotificationView.clearControls();
    });
    $("#btnnotifyPublish").click(function () {
        B2C_SignalNotificationView.Publishnotification();
    });
    RegisterFileUpload('btnUploadfile', 'imgempprofileimg', "");

    $("#backwardEmailProcessDetail").click(function () {
        NewsLetterEmailView.variables.processclicks -= 1;
        NewsLetterEmailView.BindEmailList();
    });
    $("#forwardEmailProcessDetail").click(function () {
        NewsLetterEmailView.variables.processclicks += 1;
        NewsLetterEmailView.BindEmailList();
    });
});
function Addimage(id) {
    //var url;
    //if (getDomain() == "/Trinity") {
    //    url = $("#hdndomainfirstpath").val() + $("#image" + id).attr('src');
    //}
    //else {
    //    url = $("#hdndomainfirstpath").val() + $("#image" + id).attr('src');
    //}
    //$("#txtEmailBody").summernote("editor.insertImage", url);
    $("#txtEmailBody").summernote("editor.insertImage", getDomain() + $("#image" + id).attr('src'));
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
                                        NewsLetterEmailView.Bindimage();
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
function BindUserGroup() {
    $("#ddlUserGroups").html("");
    $.ajax({
        url: getDomain() + "/Common/BindMastersDetails?ServiceName=GROUP_GET&ISRECORDALL=true",
        async: false,
        cache: false,
        type: 'POST',
        success: function (data) {
            if ($(data).find('RESPONSECODE').text() == "0") {
                var JsonObject = xml2json.parser(data.replace('&amp;','&'));
                if (JsonObject.serviceresponse.detailslist != undefined) {
                    $("#ddlUserGroups").html("<option value='All'>All</option>");
                    $("#ddlUserGroups").append($("#ddlGroupList").render(JsonObject.serviceresponse.detailslist.details));
                }
            }
            else {
                InvalidResponseCode(data);
            }
        },
        error: OnError
    });
}
function SubmitPublish() {
    if ($("#hdnPublishFrom").val() == 'SMS') {
        NewsLetterSMSView.PublishSMS();
        if ($("#pnlHistorySMS").css('display') != 'block') {
            $("#iProcessDetail").removeClass("fa-caret-down");
            $("#iProcessDetail").addClass("fa-caret-up");
            $("#spProcessDetail").html("Hide Report History");
            $("#pnlHistorySMS").show();
            var width = $('#jqGridSMSHistory').width();
            if (width <= 430) {
                width = 700;
            }
            $('#tableSMSHistory').setGridWidth(width);
        }
    }
    else {
        NewsLetterEmailView.PublishEamil();
        if ($("#pnlHistoryEmail").css('display') != 'block') {
            $("#iEmailProcessDetail").removeClass("fa-caret-down");
            $("#iEmailProcessDetail").addClass("fa-caret-up");
            $("#spEmailProcessDetail").html("Hide Report History");
            $("#pnlHistoryEmail").show();
            var width = $('#jqGridEmailHistory').width();
            if (width <= 430) {
                width = 700;
            }
            $('#tableEmailHistory').setGridWidth(width);
        }
    }
}