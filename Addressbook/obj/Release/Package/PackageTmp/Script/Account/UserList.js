var UserListView = {
    variables: {
        BindGroupListUrl: "/Common/BindMastersDetails?ServiceName=USERLOGINHISTORY_GET",
        Logoutalluser: "/Common/OpeartionsOnMaster?ServiceName=LOGOUTMASTER_CRUD",
        Oper: 'Add',
        addedit: "added",
        Masterid: "",
        Type: 'AccountInfo',
        RowCount: 1,
        ImageUploadType: "",
        dx_txtAddressType: "",
        dx_GST_AddressInfo: "",
        dx_PANCARD_AddressInfo: "",
        dx_TANNO_AddressInfo: "",
        dx_CINNO_Addressinfo: "",
        /*------------------------variables for main form Controls-----------------------*/
        /*-----------------Account Info----------------*/
        dx_txtAccountName: "",
        dx_txtAccCode: "",
        dx_ddlSubHeadName: "",
        dx_txtHead: "",
        dx_txtDepartment: "",
        dx_txtGroup: "",
        dx_txtMobile1: "",
        dx_txtMobile2: "",
        dx_txtEmailId: "",
        dx_txtFaxNo: "",
        dx_ddlCountry: "",
        dx_ddlState: "",
        dx_ddlCity: "",
        dx_ddlCurrency: "",
        dx_swAllowLogin: "",
        dx_txtcreditLimit: "",
        dx_txtCreditDays: "",
        dx_dtdoj: "",
        dx_txtTaxPro: "",
        /*-----------------Account Info----------------*/
        /*------------------------ Person Info ----------------------------*/
        dx_txtPerson_Name: "",
        dx_txtPerson_No: "",
        dx_rdGender: "",
        dx_txtPersonAddress: "",
        dx_PersonBirthDate: "",
        dx_PersonAnniversary: "",
        dx_txtPersonRelligion: "",
        dx_txtPerson_profession: "",
        dx_btnSubmit_PersonalInfo: "",
        dx_btnCancel_PersonalInfo: "",
        dx_previous_StaffInfo: "",
        dx_SAVE_AND_NEXT_StaffInfo: "",
        /*------------------------ Person Info ----------------------------*/
        dx_AddNew_StaffInfo: "",
        dx_btnSubmit_AccountInfo: "",
        dx_btnSave_Document_Upload: "",
        dx_btnprevious_Document_Upload: "",
        dx_btnCancel_AccountInfo: "",
        dx_btnprevious_BankDeatils: '',
        dx_btnSubmit_BankDeatils: "",
        dx_btnNext_ShipmentInfo: "",
        dx_btnPrevious_ShipmentInfo: "",
        dx_btnAddNew_ShipmentInfo: '',
        dx_dataGrid_ShipmentInfo: '',
        dx_btnCancel_Price: "",
        dx_btnSave_Price: "",
        dx_txtBankName: "",
        dx_btnAddNew: "",
        dx_txtZipCode: "",
        dx_txtStaffName: "",
        dx_ddlStaffRelation: "",
        dx_ddtstaffBirthdate: "",
        dx_txtAge: "",
        dx_ddtAnniversaryDate: "",
        dx_ddlStaffCountry: "",
        dx_ddlStaffState: "",
        dx_ddlStaffCity: "",
        dx_txtStaffMobile: "",
        dx_txtStaffEmail: "",
        dx_btnStaffCancel: "",
        dx_btnStaffSave_staffinfo: "",
        dx_SwitchHallMark: "",
        dx_SwitchDiamond: "",
        dx_SwitchStamping: "",
        dx_txtStamping: "",
        dx_ddlCertification: "",
        dx_txtOfficeIns: "",
        dx_txtCustomerIns: "",
        dx_txtUser: "",
        dx_txtAdmin: "",
        dx_txtInstruction: "",
        dx_btnCancel_OtherInfo: "",
        dx_btnSave_OtherInfo: "",
        dx_txtMaterialPrice: "",
        dx_txtLabourPrice: '',
        dx_ddlSettingPrice: "",
        dx_ddtPolicyDueDate: "",
        dx_txtDiscount: "",
        //--------------------For Login Settings-------------------
        dx_txtUserName: "",
        dx_txtPassword: "",
        dx_ddlUserGroup: "",
        dx_ddlBranchAccess: "",
        dx_ddlLockerAccess: "",
        dx_ddlSubbookAccess: "",
        dx_swAllowedVerify: "",
        dx_ddlDefDiaColor: "",
        dx_ddlDefDiaClarity: "",
        dx_numStockMonthFrom: "",
        dx_numStockMonthTo: "",
        dx_ddlConsInGWgt: "",
        dx_dtAppActiveDate: "",
        dx_dtWebActiveDate: "",
        dx_ddlDesignConcept: "",
        dx_ddlPolicy: "",
        dx_btnCancel_LoginSetting: "",
        dx_btnSave_LoginSetting: "",
        /*------------------------variables for main form Controls-----------------------*/
        deletedFiles: "",
        /*------------------------variables for Delete Popup Controls-----------------------*/
        dx_popupRecordDelete: "",
        DeleteDataObj: "",
        DeletePopUpOptions: {
            width: 300,
            height: 270,
            contentTemplate: function () {
                return $("<div />").append(
                    $("<p>Account Name: <span><b>" + UserListView.variables.DeleteDataObj.accountname + "</b></span></p>")
                );
            },
            toolbarItems: [{
                widget: "dxButton",
                toolbar: "bottom",
                location: "after",
                options: {
                    icon: "trash",
                    text: "Yes, Delete It!",
                    type: "danger",
                    onClick: function (e) {
                        var data = {
                            "ACCID": UserListView.variables.Masterid,
                            "oper": UserListView.variables.Oper,
                            "TYPE": "AccountInfo"
                        }
                        $("#hdnMainImg").val("");
                        $("#hdnMainImg").val(UserListView.variables.DeleteDataObj.imgvirtualname);
                        UserListView.savedata(data);
                    },
                }
            }],
            showTitle: true,
            title: "Delete Account",
            visible: false,
            dragEnabled: false,
            closeOnOutsideClick: true
        },
        /*------------------------variables for Delete Popup Controls-----------------------*/
    },


    initializeDevExgrid: function () {
        UserListView.variables.dx_dataGrid = $("#dx_dataGrid").dxDataGrid({
            dataSource: new DevExpress.data.CustomStore({
                key: "accid",
                load: function (loadOptions) {
                    var deferred = $.Deferred();

                    var myfilter = { rules: [] };
                    myfilter.rules.push({ field: "ISLOGINALLOWED", op: "eq", data: 1 });

                    var result, parameters = [];

                    if (isNotEmpty(loadOptions["take"])) {
                        parameters.push("rows=" + loadOptions["take"]);
                    }
                    if (isNotEmpty(loadOptions["skip"])) {
                        parameters.push("page=" + ((loadOptions["skip"] / loadOptions["take"]) + 1));
                    }
                    if (isNotEmpty(loadOptions["sort"])) {
                        parameters.push("sidx=" + loadOptions["sort"][0].selector);
                        parameters.push("sord=" + (loadOptions["sort"][0].desc ? "desc" : "asc"));
                    }
                    if (isNotEmpty(loadOptions["filter"])) {
                        if (loadOptions["filter"].columnIndex >= 0) {
                            filterField = loadOptions["filter"][0].toUpperCase();
                            filterOp = GetOperationShortName(loadOptions["filter"][1]);
                            filterData = loadOptions["filter"][2];
                            myfilter.rules.push({ field: filterField, op: filterOp, data: filterData });
                        }
                        else {
                            $.each(loadOptions["filter"], function (key, obj) {
                                if (obj.length && obj != "!") {
                                    filterField = obj[0].toUpperCase();
                                    filterOp = GetOperationShortName(obj[1]);
                                    filterData = obj[2];
                                    myfilter.rules.push({ field: filterField, op: filterOp, data: filterData });
                                }
                            });
                        }
                    }

                    $.ajax({
                        url: getDomain() + UserListView.variables.BindGroupListUrl + "&" + parameters.join("&") + "&myfilters=" + JSON.stringify(myfilter),
                        async: false,
                        cache: false,
                        type: 'POST',
                        success: function (data) {
                            if ($(data).find("RESPONSECODE").text() == 0) {
                                result = xml2json.parser(data);
                            }
                            else {
                                result = "Error";
                            }
                        },
                        error: function () {
                            result = "Error";
                        }
                    });

                    if (result != "Error") {
                        if (result.serviceresponse.detailslist) {
                            var List = [];
                            if (result.serviceresponse.detailslist.details.length)
                                List = result.serviceresponse.detailslist.details;
                            else
                                List.push(result.serviceresponse.detailslist.details);
                        }

                        deferred.resolve(List, {
                            totalCount: result.serviceresponse.totalrecords
                        });
                    }
                    else {
                        deferred.reject("Data Loading Error");
                    }

                    return deferred.promise();
                }
            }),
            loadPanel: {
                enabled: true,
                indicatorSrc: "../Content/images/trinityloaderwhite.gif",
            },
            allowColumnResizing: true,
            columnResizingMode: "widget",
            columnAutoWidth: true,
            showBorders: true,
            showColumnLines: true,
            showRowLines: true,
            //grouping: {
            //    contextMenuEnabled: true

            //},
            //groupPanel: {
            //    visible: true,
            //    allowColumnDragging: true
            //},
            columnFixing: {
                enabled: true,
            },
            filterRow: {
                visible: true,
                applyFilter: "auto"
            },
            headerFilter: {
                visible: true
            },
            remoteOperations: true,
            paging: {
                pageSize: 15
            },
            pager: {
                visible: true,
                showInfo: true,
                showNavigationButtons: true,
                showPageSizeSelector: true,
                allowedPageSizes: [15, 30, 100]
            },
            columns: [{ dataField: "accid", allowFiltering: false, allowSorting: true, visible: false, sortIndex: 0, sortOrder: "desc", allowGrouping: false },
                { dataField: "partycode", caption: "Acc Code", dataType: "string", filterOperations: ["contains"], allowSorting: true, allowFiltering: true, allowHeaderFiltering: false, allowGrouping: false },
                {
                    dataField: "accountname", caption: "Account Name", dataType: "string", filterOperations: ["contains"], allowSorting: true, allowFiltering: true, allowHeaderFiltering: false,
                    cellTemplate: function (container, options) {
                        var temp = '<div>' + htmlDecode(options.value) + '</div>';
                        $(temp).appendTo(container);
                    }
                },
                { dataField: "personname", caption: "Name", dataType: "string", filterOperations: ["contains"], allowSorting: false, allowFiltering: true, allowHeaderFiltering: false, allowGrouping: false },
                { dataField: "username", caption: "User Name", dataType: "string", filterOperations: ["contains"], allowSorting: false, allowFiltering: true, allowHeaderFiltering: false, allowGrouping: false },
                {
                    dataField: "headname", caption: "Head", dataType: "string", filterOperations: ["contains"], allowSorting: false, allowFiltering: true, allowHeaderFiltering: false, allowGrouping: true
                },
                { dataField: "subhead", caption: "Sub Head", dataType: "string", filterOperations: ["contains"], allowSorting: false, allowFiltering: true, allowHeaderFiltering: false, allowGrouping: true },
                { dataField: "cityname", caption: "City", dataType: "string", filterOperations: ["contains"], allowSorting: false, allowFiltering: true, allowHeaderFiltering: false, allowGrouping: true },
                { dataField: "statename", caption: "State", dataType: "string", filterOperations: ["contains"], allowSorting: false, allowFiltering: true, allowHeaderFiltering: false, allowGrouping: true },
                { dataField: "mobile1", caption: "Mobile", dataType: "string", filterOperations: ["contains"], allowSorting: false, allowFiltering: true, allowHeaderFiltering: false, allowGrouping: false },
                { dataField: "dateofjoining", caption: "DOJ", dataType: "date", format: 'dd/MMM/yyyy', allowSorting: false, allowFiltering: false, allowHeaderFiltering: false, allowGrouping: false },
                { dataField: "logincount", caption: "Count", dataType: "number", allowSorting: false, allowFiltering: false, allowHeaderFiltering: false, allowGrouping: false },
                  {
                      dataField: "isonline", caption: "Active", dataType: "string", alignment: "center", filterOperations: ["contains"],
                      allowSorting: false, allowFiltering: false, allowHeaderFiltering: false,
                      //headerFilter: {
                      //    dataSource: [{
                      //        text: "ONLINE",
                      //        value: ["isonline", "equals", 0]
                      //    }, {

                      //        text: "OFFLINE",
                      //        value: ["isonline", "equals", 1]
                      //    }]
                      //},
                      cellTemplate: function (container, options) {
                          var temp;
                          if (options.displayValue == "1") {
                              temp = '<span class="label label-success">ONLINE</span>';
                          }
                          else {
                              temp = '<span class="label label-danger">OFFLINE</span>';
                          }
                          $(temp).appendTo(container);
                      }

                  },
                    {
                        dataField: "Action", caption: "Logout", alignment: "center", allowFiltering: false, allowSorting: false, fixed: true, fixedPosition: "right",visible : isAU() ? true : false,
                        cellTemplate: function (container, options) {
                            var temp;
                            temp = '<button class="btn btn-danger" style="padding: 2px 4px !important;"   onClick="UserListView.Logoutuser(' + options.key + ')" ><i class="icon-switch2"></i></button>';
                            $(temp).appendTo(container);
                        }
                    },
            ]
        }).dxDataGrid("instance");
    },

    Logoutuser: function (accid) {

        $.ajax({
            url: getDomain() + UserListView.variables.Logoutalluser,
            async: true,
            data: { "DELETELOGINID": accid },
            cache: false,
            type: 'POST',
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    var JsonObject = xml2json.parser(data);
                    if (JsonObject.serviceresponse.detailslist) {
                        var List = [];
                        if (JsonObject.serviceresponse.detailslist.details.length) {
                            List = JsonObject.serviceresponse.detailslist.details;
                        }
                        else {
                            List.push(JsonObject.serviceresponse.detailslist.details);
                        }
                    
                    }
                }
                else {
                    DevExVariables.InvalidResponseCode(data);
                }
            },
            error: OnError
        });

    }

}

$(document).ready(function () {
    UserListView.initializeDevExgrid();
    $().click(function () {

    });
});