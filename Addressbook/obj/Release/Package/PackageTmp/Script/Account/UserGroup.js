function GetAllData() {
    var MaxOrder = 0;
    var colNames = ['USERGROUPID', 'User Group', 'Display Order', 'Active'];
    var colModel = [
            { name: "USERGROUPID", index: "USERGROUPID", xmlmap: xmlvars.common_colmap + "USERGROUPID", hidden: true },
            { name: "USERGROUPNAME", index: "USERGROUPNAME", width: 70, xmlmap: xmlvars.common_colmap + "USERGROUPNAME", searchoptions: jqGridVariables.stringSearchOption },
            { name: "DISPLAYORDER", index: "DISPLAYORDER", width: 12, xmlmap: xmlvars.common_colmap + "DISPLAYORDER", align: "center", search: false },
            {
                name: "ISACTIVE", index: "ISACTIVE", width: 7, xmlmap: xmlvars.common_colmap + "ISACTIVE",
                align: "center", formatter: jqGridVariables.chkFmatter, stype: 'select'
            },
    ];
    if (isU()) {
        colNames.push('Chart Permission');
        colModel.push({
            name: 'edit', index: 'edit', width: 30, sortable: false, align: "center", search: false, formatter: function (cv, op, ro) {
                return "<a style=\"cursor:pointer\" title=\"Manage Charts\" onclick=\"ManageCharts(" + op.rowId + ");\">Charts</a>";
            }
        });
    }           
    if (isU()) {
        colNames.push('Edit');
        colModel.push({ name: 'EDIT', index: 'EDIT', width: 5, sortable: false, align: "center", search: false, formatter:editBtnFmatter });
    } else if (isV()) {
        colNames.push('Edit');
        colModel.push({ name: 'EDIT', index: 'EDIT', width: 5, sortable: false, align: "center", search: false, formatter:editBtnFmatter });
    }
    if (isD()) {
        colNames.push('Delete');
        colModel.push( { name: 'DELETE', index: 'DELETE', width: 6, sortable: false, align: "center", search: false, formatter:deleteBtnFmatter });
    }
    $("#table_list_UserGroup").jqGrid({
        url: getDomain() + "/Common/BindMastersDetails?ServiceName=SECURITY_USERACCESSGROUPS_GET",
        datatype: "xml",
        height: "100%",
        autowidth: true,
        shrinkToFit: true,
        rowNum: 25,
        rowList: [25, 50, 100],
        colNames: colNames,
        colModel: colModel,
        pager: "#pager_list_UserGroup",
        xmlReader: {
            root: xmlvars.common_root,
            row: xmlvars.common_row,
            page: xmlvars.common_response + "CURRENTPAGE",
            total: xmlvars.common_response + "TOTALPAGES",
            records: xmlvars.common_response + "TOTALRECORDS",
            repeatitems: false,
            id: "USERGROUPID"
        },
        loadComplete: function () {
            // Hide column headers and top pager if no records were returned
            $("#table_list_UserGroup").jqGrid('setGridHeight', $(window).innerHeight() - 150 - ($("#gbox_table_list_UserGroup").height() - $('#gbox_table_list_UserGroup .ui-jqgrid-bdiv').height()));

            if ($('#table_list_UserGroup').getGridParam('records') === 0)
                $('.ui-jqgrid-htable').hide();
            else
                $('.ui-jqgrid-htable').show();
                    
            if ($('.jqGrid_wrapper').width() == 0)
                $('#table_list_UserGroup').setGridWidth(1098);
            else
                $('#table_list_UserGroup').setGridWidth($('.jqGrid_wrapper').width());
        },
        loadError: OnJqloadError,
        beforeProcessing: function (data, status, xhr) {
            //MaxOrder = jqGridVariables.getMaxOrder(data);
        },
        viewrecords: true,
        hidegrid: false,
        sortname: 'DISPLAYORDER',
        sortorder: 'desc',
    });
    function editBtnFmatter(cellvalue, options, rowObject, view, oper) 
    {
        if (isU()) {
            return "<div onclick=\"triggerId('" + options.rowId + "','edit');\"><i  style=\"cursor:pointer;  color:#1cbac8;\" title=\"Edit\" class=\"fa fa-pencil fa-lg\"></i></div>";
        }
        else {
            return "<div onclick=\"triggerId('" + options.rowId + "','view');\"><i style=\"cursor:pointer\" title=\"View\" class=\"hr-font-green fa fa-eye\"></i></div>";
        }
       
    }
    function deleteBtnFmatter(cellvalue, options, rowObject, view) {
        if (isD()) {
            return "<div  onclick=\"deleteRow('" + options.rowId + "');\"><i style=\"cursor:pointer; color:red;\" title=\"Delete\" class=\"fa fa-trash-o fa-lg\"></i></div>";
        }
        else {
            return '';
        }
       
    }
    // Setup buttons
    $("#table_list_UserGroup").jqGrid('navGrid', '#pager_list_UserGroup',
           { edit: false, add: false, del: false, search: true },
           { height: 320 }
   );
    $("#pager_list_UserGroup_left").css("width", "");
    AlignJqGridHeader('table_list_UserGroup', ['ISACTIVE', 'EDIT', 'DELETE', 'DISPLAYORDER']);
}

function ManageCharts(id) {
    var rowData = jQuery("#table_list_UserGroup").getRowData(id);
   
    $("#hdnUserGroupId").val(id);
    $("#panelView").hide();
    $("#panelEdit").hide();
    $("#panelChartPermission").show();

    $('#tbChartList').html('');
    var myfilter = { rules: [] };
    myfilter.rules.push({ field: "USERGROUPID", data: id });
    $.ajax({
        url: getDomain() + "/Common/BindMastersDetails?ServiceName=SECURITY_CHARTSPERMISSION_GET" + "&myfilters=" + JSON.stringify(myfilter),
        async: false,
        cache: false,
        type: 'POST',
        success: function (data) {
            if ($(data).find('RESPONSECODE').text() == "0") {
                var JsonObject = xml2json.parser(data);                
                if (JsonObject.serviceresponse.detaillist.detail != undefined) {
                    $("#tbChartList").append($("#ChartsPermissionList").render(JsonObject.serviceresponse.detaillist.detail));
                }
            }
            else {
                notificationMessage('Error', $(result).find('RESPONSEMESSAGE').text(), 'error');
            }
        },
        error: OnError
    });
}

function GenerateChartsPermissionNode () {
    var xmlDocument = "";
    xmlDocument += "<CHARTLIST>";
    var chartid;
    $('#tbChartList tr').each(function (key, obj) {
        chartid = $(obj).data('id');
        if (chartid != undefined) {
            xmlDocument += "<PERMISSION>";
            xmlDocument += "<CHARTID>" + chartid + "</CHARTID>";
            xmlDocument += "<ISVIEW>" + $('#chkChartsView' + chartid).prop("checked") + "</ISVIEW>";
            xmlDocument += "</PERMISSION>";
        }
    });
    xmlDocument += "</CHARTLIST>";
    return xmlDocument;
}

function SaveManageCharts() {
    var xmlDocument = GenerateChartsPermissionNode();
    data = {
        "OPER": 'edit',
        "XMLPARAM": escape(xmlDocument),
        "USERGROUPID": $("#hdnUserGroupId").val()
    }
    $.ajax({
        url: getDomain() + "/Common/OpeartionsOnMaster?ServiceName=SECURITY_USERACCESSGROUPS_CRUDOPERATIONS",
        data: data,
        async: false,
        cache: false,
        type: 'POST',
        success: function (result) {
            if ($(result).find('RESPONSECODE').text() == "0") {
                notificationMessage('Edit Operation', 'Record is updated successfully', 'success');
                $("#hdnUserGroupId").val("");
                $("#panelView").show();
                $("#panelEdit").hide();
                $("#panelChartPermission").hide();
                $("#table_list_UserGroup").trigger("reloadGrid", [{ current: true }]);
            }
            else {
                notificationMessage('Error', $(result).find('RESPONSEMESSAGE').text(), 'error');
            }
        },
        error: OnError
    });
}

function generatePermissionNode() {

    var xmlDocument = "";

    $('#tabcontent_menupermissions tbody tr').each(function (key, obj) {
        mid = $(obj).data('id');
        if (mid != undefined) {
            xmlDocument += "<MENU>";
            xmlDocument += "<MENUID>" + mid + "</MENUID>";
            xmlDocument += "<ISVIEW>" + $('#chkView' + mid).prop("checked") + "</ISVIEW>";
            xmlDocument += "<ISADD>" + $('#chkAdd' + mid).prop("checked") + "</ISADD>";
            xmlDocument += "<ISUPDATE>" + $('#chkUpdate' + mid).prop("checked") + "</ISUPDATE>";
            xmlDocument += "<ALLOWDAYS>" + $('#txtAllowDays' + mid).val() + "</ALLOWDAYS>";
            xmlDocument += "<AUTHORIZE>" + $('#chkAuthorize' + mid).prop("checked") + "</AUTHORIZE>";
            xmlDocument += "<ISDELETE>" + $('#chkDelete' + mid).prop("checked") + "</ISDELETE>";
            xmlDocument += "<ISDOWNLOAD>" + $('#chkDownload' + mid).prop("checked") + "</ISDOWNLOAD>";
            xmlDocument += "</MENU>";
        }
    });

    return xmlDocument;
}

function setRights(tbody, ddlRight) {
    var rightType = $('#' + ddlRight).val();
    var chkList;

    if (rightType == 0) {
        $('#' + tbody).find('input:checkbox').each(function (key, obj) {
            $(obj).prop('checked', false);
        });
    }
    else if (rightType == 1) {
        $('#' + tbody).find('input:checkbox').each(function (key, obj) {
            $(obj).prop('checked', true);
        });
    }
    else if (rightType == 2) {
        $('#' + tbody).find('input:checkbox').each(function (key, obj) {
            if ($(obj).attr('id').indexOf('chkView') == 0)
                $(obj).prop('checked', true);
            else
                $(obj).prop('checked', false);
        });
    }
    else if (rightType == 3) {
        $('#' + tbody).find('input:checkbox').each(function (key, obj) {
            if ($(obj).attr('id').indexOf('chkView') == 0 || $(obj).attr('id').indexOf('chkAdd') == 0)
                $(obj).prop('checked', true);
            else
                $(obj).prop('checked', false);
        });
    }
    else if (rightType == 4) {
        $('#' + tbody).find('input:checkbox').each(function (key, obj) {
            if ($(obj).attr('id').indexOf('chkView') == 0 || $(obj).attr('id').indexOf('chkAdd') == 0 || $(obj).attr('id').indexOf('chkUpdate') == 0)
                $(obj).prop('checked', true);
            else
                $(obj).prop('checked', false);
        });
    }
    else if (rightType == 5) {
        $('#' + tbody).find('input:checkbox').each(function (key, obj) {
            if ($(obj).attr('id').indexOf('chkView') == 0 || $(obj).attr('id').indexOf('chkAdd') == 0 || $(obj).attr('id').indexOf('chkDelete') == 0)
                $(obj).prop('checked', true);
            else
                $(obj).prop('checked', false);
        });
    }
    else if (rightType == 6) {
        $('#' + tbody).find('input:checkbox').each(function (key, obj) {
            if ($(obj).attr('id').indexOf('chkAuthorize') == 0 || $(obj).attr('id').indexOf('chkAdd') == 0 || $(obj).attr('id').indexOf('chkAuthorize') == 0)
                $(obj).prop('checked', true);
            else
                $(obj).prop('checked', false);
        });
    }
}

function bindPermission(id) {
        var myfilter = { rules: [] };
        myfilter.rules.push({ field: "USERGROUPID", data: id });
        $.ajax({
            url: getDomain() + "/Common/BindMastersDetails?ServiceName=USERACCESSGROUPS_PERMISSION_GET&myfilters=" + JSON.stringify(myfilter),
            async: false,
            cache: false,
            type: 'POST',
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    var JsonObject = xml2json.parser(data);
                    $("#tabheader_menupermissions").html($("#JSRMenuPermissionTabsHeader").render(JsonObject.serviceresponse.detailslist.details));
                    $("#tabcontent_menupermissions").html($("#JSRMenuPermissionTabsContent").render(JsonObject.serviceresponse.detailslist.details));
                    $("#tabheader_menupermissions li:first-child a").trigger("click");

                    $(".icheckminimal").iCheck({
                        checkboxClass: 'icheckbox_minimal-blue',
                        radioClass: 'iradio_minimal-blue',
                        labelHover: true,
                        cursor: true,
                        increaseArea: '15%',
                        tap: true
                    });
                    //Header checkbox's click event
                    $('[name=chkHead]').on('ifClicked', function (event) {
                        var oper = this.getAttribute('data-oper');
                        var module = this.getAttribute('data-module');
                        if ($(event.target).prop("checked"))
                            $('#' + module + ' [data-oper=' + oper + ']').iCheck('uncheck');
                        else
                            $('#' + module + ' [data-oper=' + oper + ']').iCheck('check');
                    });
                }
                else {
                    notificationMessage('Error', $(result).find('RESPONSEMESSAGE').text(), 'error');
                }
            },
            error: OnError
        });
}

function bindipaddress(url) {
    $.ajax({
        url: url,
        async: false,
        cache: false,
        type: 'POST',
        success: function (data) {
            if ($(data).find('RESPONSECODE').text() == "0") {
                if ($(data).find("DETAILSLIST").text() != '') {
                    var JsonObject = xml2json.parser(data);
                    if ($(data).find("DETAILS").text() != '') {
                        $("#text_ipaddfrom").val(JsonObject.serviceresponse.detailslist.details.ip_address_from);
                        $("#text_ipaddto").val(JsonObject.serviceresponse.detailslist.details.ip_address_to);
                        $("#text_individualip").val(JsonObject.serviceresponse.detailslist.details.individual_ips);
                    }
                }
            }
            else {
                InvalidResponseCode(data);
            }
        },
        error: OnError
    });
}

function triggerId(id,oper) {
    var rowData = jQuery("#table_list_UserGroup").getRowData(id);
    $("#txtUserGroupName").val(rowData['USERGROUPNAME']);
    $("#txtDisplayOrder").val(rowData['DISPLAYORDER']);
    $('#chkActive').prop('checked', ($(rowData['ISACTIVE']).html() == 'Yes') ? true : false);
    $("#hdnUserGroupId").val(id);

    //bind Permission
    bindPermission(id);
    bindipaddress(getDomain() + "/Common/BindMastersDetails?ServiceName=ALLOW_IP_LIST_GET&_search=true&searchField=USERGROUPID&searchOper=eq&searchString=" + id);

    $('#panelEdit').show();
    $('#panelView').hide();
    
    showTitlePermissionWise(oper);
}

function showTitlePermissionWise(oper) {
    
    if (oper == 'edit' || oper == 'add') {
        $("#permissionusergropdiv").show();

    }
    else {
        if ($("#permissionusergropdiv").length > 0) {
            $("#permissionusergropdiv").hide();
        }
       

    }
}

function deleteRow(id) {
    $.confirm({
        'title': 'Delete User Group',
        'message': 'You are about to delete this user group. It can not be restored at a later time! Continue? ',
        'buttons': {
            'Yes': {
                'class': 'yes',
                'action': function () {
                    // delete data to DB
                    var dataP = {
                        USERGROUPID: id,
                        OPER: 'delete'
                    };
                    $.ajax({
                        url: getDomain() + "/Common/OpeartionsOnMaster?ServiceName=SECURITY_USERACCESSGROUPS_CRUDOPERATIONS",
                        type: "POST",
                        data: dataP,
                        async: false,
                        cache: false,
                        success: function (result) {
                            if ($(result).find('RESPONSECODE').text() == "0") {
                                notificationMessage('Save Operation', 'Record is deleted successfully', 'success');
                                $("#table_list_UserGroup").trigger("reloadGrid", [{ current: true }]);
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
}

function clearvalues() {
    $("#hdnUserGroupId").val("");
    $("#txtUserGroupName").val("");
    $("#txtDisplayOrder").val("");
    $('#text_ipaddfrom').val("");
    $("#text_ipaddto").val("");
    $("#text_individualip").val("");
    $("#txtAllowDays").val("");
    $('#chkActive').prop('checked', true);
    $('[name=chkHead]').prop('checked', false);
    $('#userWizard').bootstrapWizard('first');
}

function parentCheckboxClick(type, menuid, tbmodule, obj) {
    var checkboxes = $('#' + tbmodule).find('input[data-menuid="' + type + menuid + '"]');
    if (checkboxes.length > 0) {
        checkboxes.prop('checked', $(obj).prop('checked'));
    }
}

function btnMasterSubmit(index) {
    
    var valid = $('#frmDetails').valid();
    if (!valid)
        return;

    var oper = 'Add';
    var masterid = $("#hdnUserGroupId").val();

    if (masterid != "0" && parseInt(masterid) > 0) {
        oper = 'Edit';
    }

    $("#btnSave").attr('disabled', true);
    var passdata = {};
    if (index == 1) {
        passdata = {
            "USERGROUPID": $("#hdnUserGroupId").val(),
            "USERGROUPNAME": $("#txtUserGroupName").val(),
            "DISPLAYORDER": $("#txtDisplayOrder").val(),
            "ALLOWDAYS": $("#txtAllowDays").val(),
            "ISACTIVE": $('#chkActive').prop('checked'),
            "USERID": $("#loginuserid").html(),
            "XMLPARAM": escape(xmlDocument),
            "OPER": oper
        }
        calltosavedata(passdata)
    }
   else if (index == 2) {
       var xmlDocument = generatePermissionNode();

       if (xmlDocument != "" && xmlDocument != undefined) {
           xmlDocument = "<MENULIST>" + xmlDocument + "</MENULIST>";
       }

        passdata = {
            "OPER": oper,
            "XMLPARAM": escape(xmlDocument),
            "USERGROUPID": masterid
        }
        calltosavedata(passdata)
    }
   else if (index == 3) {
       if ($("#text_ipaddfrom").val() == "" && $("#text_ipaddto").val() == "" && $("#text_individualip").val() == "") {
           notificationMessage('', 'Please enter IP address range or Individual IPs to save data', 'warning');
       }
       else if (($("#text_ipaddfrom").val() == "" || $("#text_ipaddto").val() == "") && $("#text_individualip").val() == "") {
           notificationMessage('', 'Please enter IP address range or Individual IPs to save data', 'warning');
       }
       else {
           passdata = {
               "OPER": oper,
               "USERGROUPID": masterid,
               "XMLPARAM": escape(xmlDocument),
               "IP_ADDRESS_FROM": $('#text_ipaddfrom').val(),
               "IP_ADDRESS_TO": $("#text_ipaddto").val(),
               "INDIVIDUAL_IPS": $("#text_individualip").val()
           }
           $("#hidenindex").val(index);
           calltosavedata(passdata, index);
         
       }
      
    }

   
}

function calltosavedata(passdata) {
    $.ajax({
        url: getDomain() + "/Common/OpeartionsOnMaster?ServiceName=SECURITY_USERACCESSGROUPS_CRUDOPERATIONS",
        type: "POST",
        data: passdata,
        async: false,
        cache: false,
        success: function (data) {
            if ($(data).find('RESPONSECODE').text() == "0") {
                notificationMessage('Save Operation', 'Record is saved successfully', 'success');
                $("#hdnUserGroupId").val($(data).find('USERGROUPID').text());
                if ($("#hidenindex").val() == "3") {
                    $("#table_list_UserGroup").trigger("reloadGrid", [{ current: true }]);
                    clearvalues();
                    $("#hidenindex").val("");
                    $('#panelView').show();
                    $('#panelEdit').hide();
                }
            } else {
                notificationMessage('Save Operation Fail', $(data).find('RESPONSEMESSAGE').text(), 'error');
            }

            $("#btnSave").attr('disabled', false);
        },
        error: function (xhr, errorType, exception) {
            notificationMessage('Save Operation Fail', xhr.responseText, 'error');
            $("#btnSave").attr('disabled', false);
        }
    });
}

$(document).ready(function () {

    GetAllData();

    $("#btnAdd").click(function () {
        clearvalues();
        bindPermission(getDomain() + "/Common/BindMastersDetails?ServiceName=SECURITY_USERPERMISSION_GET&ColumnRequested=MENUID,MENUNAME,ISVIEW,ISADD,ISUPDATE,ISDELETE,ISDOWNLOAD,SUBMENUNAME,SUBMENUID,HASSUBMENU");
        bindipaddress(getDomain() + "/Common/BindMastersDetails?ServiceName=ALLOW_IP_LIST_GET");
        $('#panelEdit').show();
        $('#panelView').hide();
    });

    $('button[name="CancelUserGroup"]').click(function () {
        
        clearvalues();
        $("#frmDetails").validate().resetForm();
        $('#panelEdit').hide();
        $('#panelChartPermission').hide();
        $('#panelView').show();
        $("#table_list_UserGroup").trigger("reloadGrid", [{ current: true }]);
    });

    $('#userWizard').bootstrapWizard({
        'tabClass': 'nav nav-tabs',
        onTabShow: function (tab, navigation, index) {
            
            var $total = navigation.find('li').length;
            var $current = index + 1;
            var $percent = ($current / $total) * 100;
            $('#userWizard').find('.progress-bar').css({ width: $percent + '%' });

            if (index == 1) {
                $('#userWizard .next a').html('Save');
                $('#userWizard .next').removeClass('disabled');
            }
            else
                $('#userWizard .next a').html('Save & Next');

            if (index == 2) {
                $('#userWizard .next a').html('Save');
                $('#userWizard .next').removeClass('disabled');
            }
            else
                $('#userWizard .next a').html('Save & Next');
        },
        'onNext': function (tab, navigation, index) {

            var $valid = $("#frmDetails").valid();
            if (!$valid) {
                $("#frmDetails").validate().focusInvalid();
                return false;
            }
            btnMasterSubmit(index);
            var userGroupId = parseInt($('#hdnUserGroupId').val());
            if (userGroupId == 0 || isNaN(userGroupId))
                return false;
        },
        'onTabClick': function (tab, navigation, index) {
            var $valid = $("#frmDetails").valid();
            var userGroupId = parseInt($('#hdnUserGroupId').val());
            if (!$valid) {
                $("#frmDetails").validate().focusInvalid();
                return false;
            }
            else if (userGroupId == 0 || isNaN(userGroupId)) {
                return false;
            }
        },
    });

    $("#btnSaveChartPermission").click(function () {
        SaveManageCharts();
    });
});

