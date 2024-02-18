var Outlet_DetailsView = {
    variables: {
        BindEmpDetailsUrl: "/Common/BindMastersDetails?ServiceName=OUTLET_SUPER_ADMIN_DETAILS_GET",
        PerformMasterOperationUrl: "/Common/OpeartionsOnMaster?ServiceName=OUTLET_SUPER_ADMIN_DETAILS_CRUD",
        Oper: 'Add',
        addedit: "added",
        SuperAdminId: ""
    },

    //====Bind PartnerProfile on pageload===========================================================//    
    initializeJqgrid: function () {

        colNames = ['SUPERADMINID', 'Employee Fullname', 'Email Id', 'Password', 'Salutation', 'Employee Name', 'User name', 'Birthdate', 'Gender', 'Mobile No', 'User Group','Is Active', 'Photo', 'DeletePhoto'],
        colModel = [
                    { name: "SUPERADMINID", index: "SUPERADMINID", xmlmap: xmlvars.common_colmap + "SUPERADMINID", search: false, searchoptions: jqGridVariables.stringSearchOption, hidden: true },

                     {
                         name: "SAL_EMPFULLNAME", index: "SAL_EMPFULLNAME", width: 5, xmlmap: xmlvars.common_colmap + "SAL_EMPFULLNAME", search: true, hidden: false,
                         formatter: function (cv, op, ro) {
                             return '<a href="javascript:void(0);" onclick="Outlet_DetailsView.triggerId(\'' + $(ro).find('SUPERADMINID').text() + '\',\'edit\');">' + cv + '</a>';
                         }, searchoptions: jqGridVariables.stringSearchOption
                     },
                    { name: "EMAIL", width: 8, index: "EMAIL", xmlmap: xmlvars.common_colmap + "EMAIL", search: true, searchoptions: jqGridVariables.stringSearchOption },
                    { name: "PASSWORD", width: 3, index: "PASSWORD", xmlmap: xmlvars.common_colmap + "PASSWORD", search: false, hidden: true, sortable: false },
                    { name: "EMP_SALUTATION", width: 3, index: "EMP_SALUTATION", xmlmap: xmlvars.common_colmap + "EMP_SALUTATION", hidden: true, search: false },
                    { name: "EMPLOYEE_NAME", width: 5, index: "EMPLOYEE_NAME", xmlmap: xmlvars.common_colmap + "EMPLOYEE_NAME", search: true, searchoptions: jqGridVariables.stringSearchOption, hidden: true },
                    { name: "USERNAME", index: "USERNAME", width: 3, xmlmap: xmlvars.common_colmap + "USERNAME", search: true, searchoptions: jqGridVariables.stringSearchOption },
                    { name: "BIRTHDATE", index: "BIRTHDATE", width: 3, xmlmap: xmlvars.common_colmap + "BIRTHDATE", search: false },
                    { name: "GENDER", width: 3, index: "GENDER", xmlmap: xmlvars.common_colmap + "GENDER", search: true, searchoptions: jqGridVariables.stringSearchOption },
                    { name: "MOBILENO", width: 4, index: "MOBILENO", xmlmap: xmlvars.common_colmap + "MOBILENO", search: false, sortable: false },
                    { name: "USERGROUPNAME", width: 8, index: "USERGROUPNAME", xmlmap: xmlvars.common_colmap + "USERGROUPNAME", search: false },
                    { name: "ISACTIVE", width: 3, index: "ISACTIVE", xmlmap: xmlvars.common_colmap + "ISACTIVE", formatter: function (cv, op, ro) { return jqGridVariables.chkFmatter(cv, op, ro, 'Outlet_DetailsView') }, search: false, sortable: true },
                    { name: "PICTURE", index: "PICTURE", xmlmap: xmlvars.common_colmap + "PICTURE", search: false, formatter: imageFormat, hidden: true },
                    { name: "DLTPICTURE", index: "PICTURE", xmlmap: xmlvars.common_colmap + "PICTURE", search: false, hidden: true },
        ];
        if (isU()) {
            colNames.push('Edit');
            colModel.push({ name: 'edit', index: 'edit', width: 2, sortable: false, align: "center", search: false, formatter: function (cv, op, ro) { return jqGridVariables.editBtnFmatter(cv, op, ro, 'Outlet_DetailsView', 'edit') } });
        } else if (isV()) {
            colNames.push('Edit');
            colModel.push({ name: 'edit', index: 'edit', width: 2, sortable: false, align: "center", search: false, formatter: function (cv, op, ro) { return jqGridVariables.editBtnFmatter(cv, op, ro, 'Outlet_DetailsView', 'view') } });
        }
        if (isD()) {
            colNames.push('Delete');
            colModel.push({ name: 'act', index: 'act', width: 2, sortable: false, align: "center", search: false, formatter: function (cv, op, ro) { return jqGridVariables.deleteBtnFmatter(cv, op, ro, 'Outlet_DetailsView') } });
        }
        function imageFormat(cellvalue, options, rowObject) {
            return '<img style="width:25px !important; height=25px !important;" src="' + getDomain() + '/UploadFiles/OutletEmployeeDetails/' + cellvalue + '" />';
        }
       
        $("#table_list_Employeedetails").jqGrid({

            url: getDomain() + Outlet_DetailsView.variables.BindEmpDetailsUrl,
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
                id: "SUPERADMINID"
            },
            loadComplete: function () {
                $("tr.jqgrow:even").addClass('myAltRowClass');
                $("#table_list_Employeedetails").jqGrid('setGridHeight', $(window).innerHeight() - 160 - ($("#gbox_table_list_Employeedetails").height() - $('#gbox_table_list_Employeedetails .ui-jqgrid-bdiv').height()));

                // Hide column headers and top pager if no records were returned
                if ($('#table_list_Employeedetails').getGridParam('records') == 0)
                    $('.ui-jqgrid-htable').hide();
                else
                    $('.ui-jqgrid-htable').show();

                var width = $('#jqGrid_Employeedetails').width();
                if (width <= 430) {
                    width = 595;
                }
                $('#table_list_Employeedetails').setGridWidth(1600);

            },
            loadError: OnJqloadError,
            beforeProcessing: OnJqbeforeProcessingErrorcheck,
            viewrecords: true,
            hidegrid: false,
            sortname: 'SUPERADMINID',
            sortorder: 'desc',
        });

        // Setup buttons
        $("#table_list_Employeedetails").jqGrid('navGrid', '#pager_list_Employeedetails',
            { edit: false, add: false, del: false, search: true },
            { height: 320 }
    );
        $("#pager_list_Employeedetails_left").css("width", "");
        AlignJqGridHeader('table_list_Employeedetails', ['edit', 'act']);

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
        $('#activeonoff').prop('checked', ($(rowData['ISACTIVE']).html() == 'Yes') ? $('#activeonoff').bootstrapToggle('on') : $('#activeonoff').bootstrapToggle('off'));
        $("#txt_Email").val(rowData['EMAIL']);
        $("#text_Userpassword").val(rowData['PASSWORD']);
        $("#text_b_salutation").val(rowData['EMP_SALUTATION']);
        $("#text_fullname").val(rowData['EMPLOYEE_NAME']);
        $("#text_username").val(rowData['USERNAME']);
        $('#txt_birthdate').datepicker('setDate', rowData['BIRTHDATE']);
        $("#gender").val(gendername);
        $("#txtmobileNo").val(rowData['MOBILENO']);
        $('#imgempprofileimg').attr('src', $(rowData['PICTURE']).attr('src'));
        $('#imgempprofileimg').data('oldurl', $(rowData['PICTURE']).attr('src'));
        Master_PartyView.initializeJqgrid();
    },
    btnMasterSubmit: function () {

        
        var activetoggle;
        //if ($('#imgempprofileimg').attr('src') == '') {
        //    $('#ItemimgError').show();
        //    $('#ItemimgError').html("This field is required.");
        //    isValid = false;

        //}
        
        Outlet_DetailsView.variables.Oper = 'Add';
        Outlet_DetailsView.variables.addedit = "added";
        Outlet_DetailsView.variables.SuperAdminId = $("#hdnemployeedetails").val();

        if (Outlet_DetailsView.variables.SuperAdminId != "0" && parseInt(Outlet_DetailsView.variables.SuperAdminId) > 0) {
            Outlet_DetailsView.variables.Oper = 'Edit';
            Outlet_DetailsView.variables.addedit = 'updated';
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


       var data = {
            "SUPERADMINID": Outlet_DetailsView.variables.SuperAdminId,
            "oper": Outlet_DetailsView.variables.Oper,
            "PICTURE": EmployeeImageTitle,
            "EMAIL": $("#txt_Email").val(),
            "EMP_SALUTATION": $("#text_b_salutation").val(),
            "PASSWORD": $("#text_Userpassword").val(),
            "EMPLOYEENAME": $("#text_fullname").val(),
            "USERNAME": $("#text_username").val(),
            "BIRTHDATE": $("#txt_birthdate").val(),
            "GENDER": $('input[name=radiogender]:checked').val(),
            "MOBILENO": $("#txtmobileNo").val(),
            "ISACTIVE": activetoggle,
        }

        Outlet_DetailsView.savedata(data, EmployeeImage);
    },

    savedata: function (data, EmployeeImage) {

        $.ajax({

            type: 'POST',
            async: false,
            cache: false,
            url: getDomain() + "/Common/SaveImage",
            data: {
                category: 'OutletEmployeeDetails',
                deletedfiles: '',
                savefiles: EmployeeImage
            },
            success: function (result) {

                $.ajax({

                    url: getDomain() + Outlet_DetailsView.variables.PerformMasterOperationUrl,
                    data: data,
                    async: true,
                    cache: false,
                    type: 'POST',
                    success: Outlet_DetailsView.btnMasterSubmitOnSuccess,
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
                                category: 'OutletEmployeeDetails',
                                deletedfiles: rowData['DLTPICTURE'],
                                savefiles: ''
                            },
                            success: function (result) {

                                $.ajax({

                                    url: getDomain() + Outlet_DetailsView.variables.PerformMasterOperationUrl,
                                    data: {
                                        SUPERADMINID: id,
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
            if (Outlet_DetailsView.variables.Oper == 'Delete') {
                OperationMessage("", 'Employee Details deleted successfully', 'success');
            } else {
                OperationMessage("", 'Employee Details saved successfully', 'success');
                //$('#editemployeedetails').hide();
                //$('#viewemployeedetails').show();
                //$("#deleteemployeemodal").modal("hide");

            }
            Master_PartyView.initializeJqgrid();
            
            //Outlet_DetailsView.ClearValues();
            //$("#table_list_Employeedetails").trigger("reloadGrid", [{ current: true }]);
        }
        else if ($(data).find('RESPONSECODE').text() == "-20") {
            window.location.href = 'LogOut';
        }
        else {
            InvalidResponseCode(data);
        }
        //$('#btnSave').attr('disabled', false);
        //$('#btnDelete').attr('disabled', false);

    },

    ClearValues: function () {
        $("#hdnemployeedetails").val("-1");
        $("#text_b_salutation").val("Mr.");
        $("#text_fullname").val("");
        $("#text_username").val("");
        $("#text_Userpassword").val("");
        $("#gendermale").prop('checked', true);
        $('#imgempprofileimg').attr('src', '');
        $("#txt_birthdate").val("");
        $("#txt_Email").val("");
        $("#txtmobileNo").val("");
        $('#activeonoff').bootstrapToggle('on');
        $('#editemployeedetails').hide();
        $('#viewemployeedetails').show();
        $("#deleteemployeemodal").modal("hide");
        Master_PartyView.initializeJqgrid();

    },
}

$(document).ready(function () {
    var StepWizard = '';
    Outlet_DetailsView.initializeJqgrid();

    StepWizard = $("#Wizard").stepFormWizard({
        showLegend: false,
        duration: 10,
        //linkNav: false,
        showButtons: true,
        startStep: 0,
        onNext: function (i, wizard) {
            if (i == 0) {
                var isValid = $("#formemployee").valid();
                if (!isValid)
                    return false;
                Outlet_DetailsView.btnMasterSubmit();
                
            }
            else if (i == 1) {
                Master_PartyView.btnMasterSubmit();
            }
        },
        onPrev: function (i, wizard) {
        },
        onFinish: function (i, wizard) {
            Outlet_DetailsView.ClearValues();
        }
    });
    $(".sf-wizard").parent().removeClass("sf-sea").addClass("sf-sky");

    $('#txt_birthdate').datepicker({ format: 'dd/M/yyyy' });
    $('#txt_birthdate').on('change', function () {
        $('.datepicker').hide();
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
        Outlet_DetailsView.ClearValues();
        $('#editemployeedetails').show();
        $('#viewemployeedetails').hide();
        $("#deleteemployeemodal").modal("hide");

    });
    $("#btn_b_cancle").click(function () {
        Outlet_DetailsView.ClearValues();
    })
    $("#btn_b_Csave").click(function () {
        Outlet_DetailsView.btnMasterSubmit();
    });

    $("#btnDeleteemployee").click(function () {
        Outlet_DetailsView.btnMasterDelete();
    });
    $("#dltcancelEmployee").click(function () {
        Outlet_DetailsView.ClearValues();
    });
    RegisterFileUploadwed("#btnEmployeeUpload", "#imgempprofileimg", "#hdnDeletedImg");   
});