var Employee_DetailsView = {
    variables: {
        BindGroupListUrl: "/Common/BindMastersDetails?ServiceName=USERDETAILS_GET",
        PerformMasterOperationUrl: "/Common/OpeartionsOnMaster?ServiceName=USERDETAILS_CRUD",
        Oper: 'Add',
        addedit: "added",
        Employeeid: ""
    },

    //====Bind PartnerProfile on pageload===========================================================//    
    initializeJqgrid: function () {

        colNames = ['UserId', 'Employee Fullname', 'Email Id', 'Password', 'Salutation', 'Employee Name', 'User name', 'Birthdate', 'Joindate', 'Gender', 'Mobile No1', 'Mobile No2', 'User Group', 'assign_user_group', 'Is Active', 'Photo', 'DeletePhoto', 'Default Diamond Color', 'Default Diamond Purity'],
        colModel = [
                    { name: "USERID", index: "USERID", width: 3, xmlmap: xmlvars.common_colmap + "USERID", search: false, searchoptions: jqGridVariables.stringSearchOption, hidden: true },
                   
                     {
                         name: "SAL_EMPFULLNAME", index: "SAL_EMPFULLNAME", width: 5, xmlmap: xmlvars.common_colmap + "SAL_EMPFULLNAME", search: true, hidden: false,
                         formatter: function (cv, op, ro) {
                             return '<a href="javascript:void(0);" onclick="Employee_DetailsView.triggerId(\'' + $(ro).find('USERID').text() + '\',\'edit\');">' + cv + '</a>';
                         }, searchoptions: jqGridVariables.stringSearchOption
                     },
                    { name: "EMAIL", width: 8, index: "EMAIL", xmlmap: xmlvars.common_colmap + "EMAIL", search: true, searchoptions: jqGridVariables.stringSearchOption },
                    { name: "PASSWORD", width: 3, index: "PASSWORD", xmlmap: xmlvars.common_colmap + "PASSWORD", search: false, hidden: true, sortable: false },
                    { name: "EMP_SALUTATION", width: 3, index: "EMP_SALUTATION", xmlmap: xmlvars.common_colmap + "EMP_SALUTATION", hidden: true, search: false },
                    { name: "EMPLOYEE_NAME", width: 5, index: "EMPLOYEE_NAME", xmlmap: xmlvars.common_colmap + "EMPLOYEE_NAME", search: true, searchoptions: jqGridVariables.stringSearchOption,hidden:true },
                    { name: "UNAME", index: "UNAME", width: 3, xmlmap: xmlvars.common_colmap + "UNAME", search: true, searchoptions: jqGridVariables.stringSearchOption },
                    { name: "BIRTHDATE", index: "BIRTHDATE", width: 3, xmlmap: xmlvars.common_colmap + "BIRTHDATE", search: false},
                    { name: "JOINDATE", index: "JOINDATE", width: 3, xmlmap: xmlvars.common_colmap + "JOINDATE", search: false},
                    { name: "GENDER", width: 3, index: "GENDER", xmlmap: xmlvars.common_colmap + "GENDER", search: true, searchoptions: jqGridVariables.stringSearchOption },
                    { name: "MOBILE_NO1", width: 4, index: "MOBILE_NO1", xmlmap: xmlvars.common_colmap + "MOBILE_NO1", search: false, sortable: false },
                    { name: "MOBILE_NO2", width: 4, index: "MOBILE_NO2", xmlmap: xmlvars.common_colmap + "MOBILE_NO2", search: false, sortable: false },
                    { name: "USERGROUPNAME", width: 8, index: "USERGROUPNAME", xmlmap: xmlvars.common_colmap + "USERGROUPNAME", search: false },
                    { name: "ASSIGN_USER_GROUP", index: "ASSIGN_USER_GROUP", xmlmap: xmlvars.common_colmap + "ASSIGN_USER_GROUP", search: false, hidden: true, sortable: false },
                    { name: "ISACTIVE", width: 3, index: "ISACTIVE", xmlmap: xmlvars.common_colmap + "ISACTIVE", formatter: function (cv, op, ro) { return jqGridVariables.chkFmatter(cv, op, ro, 'Employee_DetailsView') }, search: false, sortable: true },
                    { name: "PICTURE", index: "PICTURE", xmlmap: xmlvars.common_colmap + "PICTURE", search: false, formatter: imageFormat, hidden: true },
                    { name: "DLTPICTURE", index: "PICTURE", xmlmap: xmlvars.common_colmap + "PICTURE", search: false, hidden: true },
                    { name: "DEFAULTDIAMONDCOLOR", index: "DEFAULTDIAMONDCOLOR", width: 3, xmlmap: xmlvars.common_colmap + "DEFAULTDIAMONDCOLOR", search: false, hidden: true },
                    { name: "DEFAULTDIAMONDPURITY", index: "DEFAULTDIAMONDPURITY", width: 3, xmlmap: xmlvars.common_colmap + "DEFAULTDIAMONDPURITY", search: false, hidden: true },
        ];
        if (isU()) {
            colNames.push('Edit');
            colModel.push({ name: 'edit', index: 'edit', width: 2, sortable: false, align: "center", search: false, formatter: function (cv, op, ro) { return jqGridVariables.editBtnFmatter(cv, op, ro, 'Employee_DetailsView', 'edit') } });
        } else if (isV()) {
             colNames.push('Edit');
             colModel.push({ name: 'edit', index: 'edit', width: 2, sortable: false, align: "center", search: false, formatter: function (cv, op, ro) { return jqGridVariables.editBtnFmatter(cv, op, ro, 'Employee_DetailsView', 'view') } });
        }
        if (isD()) {
            colNames.push('Delete');
            colModel.push({ name: 'act', index: 'act', width: 2, sortable: false, align: "center", search: false, formatter: function (cv, op, ro) { return jqGridVariables.deleteBtnFmatter(cv, op, ro, 'Employee_DetailsView') } });
        }
        function imageFormat(cellvalue, options, rowObject) {
            return '<img style="width:25px !important; height=25px !important;" src="' + getDomain() + '/UploadFiles/EmployeeDetails/' + cellvalue + '" />';
        }
        //function imageUnFormat(cellvalue, options, cell) {
        //    return $('img', cell).attr('#inputItemImage');
        //}


        $("#table_list_Employeedetails").jqGrid({

            url: getDomain() + Employee_DetailsView.variables.BindGroupListUrl,
            datatype: "xml",
            height: '100%',
            autowidth: true,
            shrinkToFit: true,
            rowNum: 25,
            rowList: [25, 50, 100],
            colNames: colNames,
            colModel: colModel,
            pager: "#pager_list_Employeedetails",
            xmlReader: {
                root: xmlvars.common_root,
                row: xmlvars.common_row,
                page: xmlvars.common_response + "CURRENTPAGE",
                total: xmlvars.common_response + "TOTALPAGES",
                records: xmlvars.common_response + "TOTALRECORDS",
                repeatitems: false,
                id: "USERID"
            },
            loadComplete: function () {
                $("tr.jqgrow:even").addClass('myAltRowClass');
                $("#table_list_Employeedetails").jqGrid('setGridHeight', $(window).innerHeight() - 150 - ($("#gbox_table_list_Employeedetails").height() - $('#gbox_table_list_Employeedetails .ui-jqgrid-bdiv').height()));

                // Hide column headers and top pager if no records were returned
                if ($('#table_list_Employeedetails').getGridParam('records') == 0)
                    $('.ui-jqgrid-htable').hide();
                else
                    $('.ui-jqgrid-htable').show();

                var width = $('#jqGrid_Employeedetails').width();
                if (width <= 1600) {
                    width = 1600;
                }
                $('#table_list_Employeedetails').setGridWidth(width);

            },
            loadError: OnJqloadError,
            beforeProcessing: OnJqbeforeProcessingErrorcheck,
            viewrecords: true,
            hidegrid: false,
            sortname: 'USERID',
            sortorder: 'desc',
        });

        // Setup buttons
        $("#table_list_Employeedetails").jqGrid('navGrid', '#pager_list_Employeedetails',
            { edit: false, add: false, del: false, search: true },
            { height: 320 }
    );
        $("#pager_list_Employeedetails_left").css("width", "");
        AlignJqGridHeader('table_list_Employeedetails', ['edit','act']);

    },

    triggerId: function (id, oper) {
        var rowData = jQuery("#table_list_Employeedetails").getRowData(id);
        $("#hdnemployeedetails").val(id);
        $('#editemployeedetails').show();
        $('#viewemployeedetails').hide();
        if (rowData['GENDER'] == "Male") {
            var gendername = $("input[name=radiogender][value=" + rowData['GENDER'] + "]").prop('checked', true);
        }
        else {
            gendername = $("input[name=radiogender][value=" + rowData['GENDER'] + "]").prop('checked', true);
        }
        BindDropdown('usergroupdrop', 'UserGroupDropdownList', "/Common/BindMastersDetails?ServiceName=SECURITY_USERACCESSGROUPS_GET&IsRecordAll=true", '');
        $('#activeonoff').prop('checked', ($(rowData['ISACTIVE']).html() == 'Yes') ? $('#activeonoff').bootstrapToggle('on') : $('#activeonoff').bootstrapToggle('off'));
        $("#txt_Email").val(rowData['EMAIL']);
        $("#text_Userpassword").val(rowData['PASSWORD']);
        $("#text_b_salutation").val(rowData['EMP_SALUTATION']);
        $("#text_fullname").val(rowData['EMPLOYEE_NAME']);
        $("#text_username").val(rowData['UNAME']);
        $('#txt_bridthdate').datepicker('setDate', rowData['BIRTHDATE']);
        $('#txt_joindate').datepicker('setDate', rowData['JOINDATE']);
        //$("#txt_joindate").val(rowData['JOINDATE']);
        $("#gender").val(gendername);
        $("#txt_mobile1").val(rowData['MOBILE_NO1']);
        $("#txt_mobile2").val(rowData['MOBILE_NO2']);
        var selectedValuesTest = rowData["ASSIGN_USER_GROUP"].split(',');
        $('#usergroupdrop').val(selectedValuesTest).trigger("change");
        $('#imgempprofileimg').attr('src', $(rowData['PICTURE']).attr('src'));
        $('#imgempprofileimg').data('oldurl', $(rowData['PICTURE']).attr('src'));
        $("#ddldiamoncolor").val(rowData['DEFAULTDIAMONDCOLOR']);
        $("#ddldiamondpurity").val(rowData['DEFAULTDIAMONDPURITY']);
        Employee_DetailsView.GetMacAddress(id);
        Employee_DetailsView.showTitlePermissionWise(oper);
      
    },
    showTitlePermissionWise: function (oper) {

        if (oper == 'edit' || oper == 'add') {
            $("#permissionbtndiv").show();
            $("#btn_b_Csave").show();
            $(".permissincheckbtn").show();
            $(".permissiondltmacbtn").show();
           
        }
        else {
            if ($("#permissionbtndiv").length > 0) {
                $("#permissionbtndiv").hide();
            }
            if ($("#btn_b_Csave").length > 0) {
                $("#btn_b_Csave").hide();
            }
            if ($(".permissincheckbtn").length > 0) {
                $(".permissincheckbtn").hide();
            }
            if ($(".permissiondltmacbtn").length > 0) {
                $(".permissiondltmacbtn").hide();
            }
        }
    },
    GetMacAddress: function (id) {
        var myfilter = { rules: [] };
        myfilter.rules.push({ field: "MACTYPE", op: "eq", data: 'MacAddress' });
        myfilter.rules.push({ field: "USERID", op: "eq", data: id });
        $.ajax({
            url: getDomain() + Employee_DetailsView.variables.BindGroupListUrl + "&myfilters=" + JSON.stringify(myfilter),
            async: false,
            cache: false,
            type: 'GET',
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    var JsonObject = xml2json.parser(data);
                    $("#allowmacipdata").html("");
                    if (JsonObject.serviceresponse.macdetailslist != undefined) {
                        $("#macaddressdiv").show();
                        $("#allowmacipdata").html($("#allowipList").render(JsonObject.serviceresponse.macdetailslist.macdetails));
                    }
                    else {
                        $("#macaddressdiv").hide();
                    }
                }
                else {
                    InvalidResponseCode(data);
                }
            },
            error: OnError
        });
    },
    btnMasterSubmit: function () {

        var isValid = $("#formemployee").valid();
        var activetoggle;
        //if ($('#imgempprofileimg').attr('src') == '') {
        //    $('#ItemimgError').show();
        //    $('#ItemimgError').html("This field is required.");
        //    isValid = false;

        //}
        if (!isValid)
            return;
        Employee_DetailsView.variables.Oper = 'Add';
        Employee_DetailsView.variables.addedit = "added";
        Employee_DetailsView.variables.Employeeid = $("#hdnemployeedetails").val();

        if (Employee_DetailsView.variables.Employeeid != "0" && parseInt(Employee_DetailsView.variables.Employeeid) > 0) {
            Employee_DetailsView.variables.Oper = 'Edit';
            Employee_DetailsView.variables.addedit = 'updated';
        }

        if ($("#activeonoff").prop("checked") == true) {

            activetoggle = "1";
            
        } else {
            activetoggle = "0";
        }
       
        var EmployeeImage = $('#imgempprofileimg').attr('src');

        if (EmployeeImage.indexOf('noImage.png') > -1)
            EmployeeImage = '';


        //if (EmployeeImage != '')
            EmployeeImageTitle = EmployeeImage.substr(EmployeeImage.lastIndexOf('/') + 1);


        var countries = [];
        $.each($(".assigngrp option:selected"), function () {
            countries.push($(this).val());
        });
      
        var data = {
            "USERLOGINID": $("#userloginid").val(),
            "USERID": Employee_DetailsView.variables.Employeeid,
            "oper": Employee_DetailsView.variables.Oper,
            "PICTURE": EmployeeImageTitle,
            "EMAIL": $("#txt_Email").val(),
            "EMP_SALUTATION": $("#text_b_salutation").val(),
            "PASSWORD": $("#text_Userpassword").val(),
            "EMPLOYEE_NAME": $("#text_fullname").val(),
            "UNAME": $("#text_username").val(),
            "BIRTHDATE": $("#txt_bridthdate").val(),
            "JOINDATE": $("#txt_joindate").val(),
            //"GENDER": $("input[type='radio'].ab:checked").val(),
            "GENDER": $('input[name=radiogender]:checked').val(),
            "MOBILE_NO1": $("#txt_mobile1").val(),
            "MOBILE_NO2": $("#txt_mobile2").val(),
            "ASSIGN_USER_GROUP": countries.join(","),
            "ISACTIVE": activetoggle,
            "DEFAULTDIAMONDCOLOR": $('#ddldiamoncolor').val(),
            "DEFAULTDIAMONDPURITY": $('#ddldiamondpurity').val(),
        }
        
        Employee_DetailsView.savedata(data, EmployeeImage);
    },

    savedata: function (data, EmployeeImage) {
       
        $.ajax({

            type: 'POST',
            async: false,
            cache: false,
            url: getDomain() + "/Common/SaveImage",
            data: {
                category: 'EmployeeDetails',
                deletedfiles: '',
                savefiles: EmployeeImage
            },
            success: function (result) {

                $.ajax({

                    url: getDomain() + Employee_DetailsView.variables.PerformMasterOperationUrl,
                    data: data,
                    async: true,
                    cache: false,
                    type: 'POST',
                    success: Employee_DetailsView.btnMasterSubmitOnSuccess,
                    error: OnError,
                });

            },
            error: OnError
        });
    },
    deleteRow: function (id) {
       
        var rowData = jQuery("#table_list_Employeedetails").getRowData(id);
        $.confirm({
            'title': 'Delete Employee Details',
            'message': 'You are about to delete this Employee Detail. It can not be restored at a later time! Continue? ',
            'buttons': {
                'Yes': {
                    'class': 'yes',
                    'action': function () {

                        $.ajax({

                            type: 'POST',
                            async: false,
                            cache: false,
                            url: getDomain() + "/Common/SaveImage",
                            data: {
                                category: 'EmployeeDetails',
                                deletedfiles: rowData['DLTPICTURE'],
                                savefiles: ''
                            },
                            success: function (result) {

                                $.ajax({

                                    url: getDomain() + Employee_DetailsView.variables.PerformMasterOperationUrl,
                                    data: {
                                        USERID: id,
                                        oper: 'delete'
                                    },
                                    async: true,
                                    cache: false,
                                    type: 'POST',
                                    success: function (result) {
                                        if ($(result).find('RESPONSECODE').text() == "0") {
                                            notificationMessage('Delete Operation', 'Record is deleted successfully', 'success');
                                            $("#table_list_Employeedetails").trigger("reloadGrid", [{ current: true }]);
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
    },
    
    btnMasterSubmitOnSuccess: function (data) {
        if ($(data).find('RESPONSECODE').text() == "0") {
            if (Employee_DetailsView.variables.Oper == 'Delete') {
                OperationMessage("", 'Employee Details deleted successfully', 'success');
            } else {
                OperationMessage("", 'Employee Details saved successfully', 'success');
                $('#editemployeedetails').hide();
                $('#viewemployeedetails').show();
                $("#deleteemployeemodal").modal("hide");

            }
            Employee_DetailsView.ClearValues();
            $("#table_list_Employeedetails").trigger("reloadGrid", [{ current: true }]);
        }
        else if ($(data).find('RESPONSECODE').text() == "-20") {
           window.location.href = 'LogOut';
        }
        else {
            InvalidResponseCode(data);
        }
        $('#btnSave').attr('disabled', false);
        $('#btnDelete').attr('disabled', false);

    },

    ClearValues: function () {
        $("#hdnemployeedetails").val("");
        $("#text_b_salutation").val("Mr.");
        $("#text_fullname").val("");
        $("#text_username").val("");
        $("#text_Userpassword").val("");
        $("#gendermale").prop('checked', true);
        $('#imgempprofileimg').attr('src', '');
        $("#txt_bridthdate").val("");
        $("#txt_joindate").val("");
        $("#txt_Email").val("");
        $("#txt_mobile1").val("");
        $("#txt_mobile2").val("");
        $("#txt_assignusergroup").val("");
        $('#activeonoff').bootstrapToggle('off');
        $("#allowmacipdata").html("");
        $("#ddldiamoncolor").val("");
        $("#ddldiamondpurity").val("");
        $("#macaddressdiv").hide();
        $('#editemployeedetails').hide();
        $('#viewemployeedetails').show();
        $("#deleteemployeemodal").modal("hide");
        
    },
    BindDiamondatalist: function () {
        url = "/Common/BindMastersDetails?ServiceName=APP_CUSTOMIZE_MASTER_GET";
        $.ajax({
            url: getDomain() + url,
            async: false,
            cache: false,
            type: 'POST',
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    var JsonObject = xml2json.parser(data);
                    if (JsonObject.serviceresponse.diamondcolorlist != undefined) {
                        $("#ddldiamoncolor").html("<option value='' selected disabled hidden >Select Diamond Color</option>");
                        $("#ddldiamoncolor").append($("#DataDiamondcolor").render(JsonObject.serviceresponse.diamondcolorlist.diamondcolor));
                    }
                    if (JsonObject.serviceresponse.diamondqualitylist != undefined) {
                        $("#ddldiamondpurity").html("<option value='' selected disabled hidden >Select Diamond Purity</option>");
                        $("#ddldiamondpurity").append($("#DataDiamondPurity").render(JsonObject.serviceresponse.diamondqualitylist.diamondquality));
                    }
                }
                else {
                    InvalidResponseCode(data);
                }
            },
            error: OnError
        });
    },
}
function checkclick(id) {
    $.confirm({
        'title': 'Mac Address Allowance',
        'message': 'You are about to change mac address allowance. Continue? ',
        'buttons': {
            'Yes': {
                'class': 'yes',
                'action': function () {
                    var data = {
                        "MACID": id,
                        "oper": 'editmacaddress',
                        "ISACTIVE": $("#check" + id).is(":checked"),
                    }
                    $.ajax({
                        type: 'POST',
                        url: getDomain() + "/Common/OpeartionsOnMaster?ServiceName=USERDETAILS_CRUD",
                        data: data,
                        async: true,
                        cache: false,
                        success: function (data) {
                            if ($(data).find('RESPONSECODE').text() == "0") {
                                OperationMessage("", 'Approval data change successfully', 'success');
                                $("#table_list_MacAddress").trigger("reloadGrid", [{ current: true }]);
                            }
                            else {
                                InvalidResponseCode(data);
                            }
                        }
                    });
                }
            },
            'No': {
                'class': 'no',
                'action': function () {
                    if ($("#check" + id).is(":checked")) {
                        $("#check" + id).prop('checked', false);
                    }
                    else {
                        $("#check" + id).prop('checked', true);
                    }
                }
            }
        }
    });

}
function deletemacaddress(id) {

    $.confirm({
        'title': 'Delete Mac Address',
        'message': 'You are delete this mac address. Continue? ',
        'buttons': {
            'Yes': {
                'class': 'yes',
                'action': function () {
                    var data = {
                        "MACID": id,
                        "oper": 'deletemacaddress',
                    }
                    $.ajax({
                        type: 'POST',
                        url: getDomain() + "/Common/OpeartionsOnMaster?ServiceName=USERDETAILS_CRUD",
                        data: data,
                        async: true,
                        cache: false,
                        success: function (data) {
                            if ($(data).find('RESPONSECODE').text() == "0") {
                                OperationMessage("", 'Data Delete successfully', 'success');
                                $('#' + id).remove();
                            }
                            else {
                                InvalidResponseCode(data);
                            }
                        }
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
$(document).ready(function () {

    Employee_DetailsView.initializeJqgrid();
    Employee_DetailsView.BindDiamondatalist();
    //$('#txt_bridthdate').datepicker();
    //$('#txt_bridthdate').on('change', function () {
    //    $('.datepicker').hide();
    //});
    //$('#txt_joindate').datepicker();
    //$('#txt_joindate').on('change', function () {
    //    $('.datepicker').hide();
    //});
    var date = new Date();
    var today = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    $('#txt_bridthdate').datepicker({
        format: 'dd M yyyy'
    });
    $('#txt_bridthdate').datepicker('setDate', 'now');
    $('#txt_bridthdate').on('change', function () {
        $('.datepicker').hide();
    });
    $('#txt_joindate').datepicker({ format: 'dd M yyyy' });
    $('#txt_joindate').datepicker('setDate', 'now');
    $('#txt_joindate').on('change', function () {
        $('.datepicker').hide();
    });
    $('#usergroupdrop').select2({
        multiple: true,
    });

    /********** mobile ******************/
    $('.mobilevalidation').keypress(function (event) {
        return numbersOnly(this, event, false, false);
    });
    $('.mobilevalidation').on('copy paste cut', function (e) {
        e.preventDefault(); //disable cut,copy,paste
        return false;
    });

    $(".toggle-on").css("margin-left", "-=11px")
    $("#showpasscheck").click(function () {
        if ($(this).is(":checked")) {
            $('#text_Userpassword').attr('type', 'text');
        }
        else {
            $('#text_Userpassword').attr('type', 'password');
        }
        
    })
    $("#btnAddNewEmployee").click(function () {
        Employee_DetailsView.ClearValues();
        BindDropdown('usergroupdrop', 'UserGroupDropdownList', "/Common/BindMastersDetails?ServiceName=SECURITY_USERACCESSGROUPS_GET&IsRecordAll=true", '');
        $('#editemployeedetails').show();
        $('#viewemployeedetails').hide();
        $("#deleteemployeemodal").modal("hide");

    });
    $("#btn_b_cancle").click(function () {
        Employee_DetailsView.ClearValues();
    })
    $("#btn_b_Csave").click(function () {


        $('#formemployee').validate({
            rules: {
                empfullname: "required",
                username: "required",
                userpassword: "required",
                assigngroup: "required",
                email: {
                    required: true,
                    email: true
                },
                mobile: {
                    required: true,
                    minlength: 9,
                    maxlength: 10,
                    number: true
                },
                messages: {
                    username: "Please enter your username..!",
                    email: "Please enter your email..!",
                    mobile: "Enter your mobile no"
                },
            },
            submitHandler: function (form) {

            }
        }),

        Employee_DetailsView.btnMasterSubmit();
    });

    $("#btnDeleteemployee").click(function () {
        Employee_DetailsView.btnMasterDelete();
    });
    $("#dltcancelEmployee").click(function () {
        Employee_DetailsView.ClearValues();
    });
    RegisterFileUploadwed("#btnEmployeeUpload", "#imgempprofileimg", "#hdnDeletedImg");
});