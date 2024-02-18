var AccountMasterView = {
    variables: {
        BindGroupListUrl: "/Common/BindMastersDetails?ServiceName=ACCOUNTMASTER_GET",
        PerformMasterOperationUrl: "/Common/OpeartionsOnMaster?ServiceName=ACCOUNTMASTER_CRUD",
        BindStaticDataUrl: "/Common/BindMastersDetails?ServiceName=STATIC_MASTER_GET",
        BindFileListUrl: "/Common/BindMastersDetails?ServiceName=ACCOUNTMASTERFILES_GET",
        BindOtherInfo: "/Common/BindMastersDetails?ServiceName=ACCOUNTMASTER_OTHERINFO_GET",
        BindStaticPrice: "/Common/BindMastersDetails?ServiceName=STATIC_PRICELIST_GET",
        BindGroupListUrl_ShipmentInfo: "/Common/BindMastersDetails?ServiceName=ACCOUNTMASTER_SHIPINGINFO_GET",
        BindGroupListUrl_ReferenceDetails: "/Common/BindMastersDetails?ServiceName=ACCOUNTMASTER_REFERENCEDETAILS_GET",
        BindGroupListUrl_STAFFINFO: "/Common/BindMastersDetails?ServiceName=ACCOUNTMASTER_STAFFINFO_GET",
        BindTaxProfile: "/Common/BindMastersDetails?ServiceName=ACC_TAXPROFILE_GET",
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
        dx_ddlCurrency:"",
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
                    $("<p>Account Name: <span><b>" + AccountMasterView.variables.DeleteDataObj.accountname + "</b></span></p>")
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
                            "ACCID": AccountMasterView.variables.Masterid,
                            "oper": AccountMasterView.variables.Oper,
                            "TYPE": "AccountInfo"
                        }
                        $("#hdnMainImg").val("");
                        $("#hdnMainImg").val(AccountMasterView.variables.DeleteDataObj.imgvirtualname);
                        AccountMasterView.savedata(data);
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

    savedata: function (data) {
        AccountMasterView.variables.deletedFiles += $("#hdnMainImg").val() + ',';
        $.ajax({
            type: 'POST',
            async: false,
            cache: false,
            url: getDomain() + "/Common/SaveImageWithThumb",
            data: {
                ImgPath: getDesignImgPhysicalPath() + "UploadFiles/PartyFile/",
                deletedfiles: AccountMasterView.variables.deletedFiles,
                savefiles: '',
                width: 200,
                height: 200
            },
            success: function (result) {

            },
            error: OnError
        });
        $.ajax({
            url: getDomain() + AccountMasterView.variables.PerformMasterOperationUrl,
            data: data,
            async: true,
            cache: false,
            type: 'POST',
            beforeSend: function () {
                dx_LoaderTrinity.show();
            },
            success: function (result) {
                if ($(result).find('RESPONSECODE').text() == "0") {
                    DevExVariables.Toaster("success", 'Record is Deleted successfully');
                    AccountMasterView.clearControls();
                }
                else {
                    DevExVariables.InvalidResponseCode(result);
                }
            },
            complete: function () {
                dx_LoaderTrinity.hide();
            },
            error: OnError
        });
    },

    FormInitialize: function () {
        /*------------------------Account Info-----------------------*/
        AccountMasterView.variables.dx_txtAccountName = $("#dx_txtAccountName").dxTextBox({
            placeholder: "Enter Account Name...",
        }).dxValidator({
            validationGroup: "AccountInfo",
            validationRules: [{
                type: "required",
                message: "Account Name is required"
            }]
        }).dxTextBox("instance");

        AccountMasterView.variables.dx_txtAccCode = $("#dx_txtAccCode").dxTextBox({
            readOnly: true,
        }).dxValidator({
            validationGroup: "AccountInfo",
            validationRules: []
        }).dxTextBox("instance");

        AccountMasterView.variables.dx_ddlSubHeadName = $("#dx_ddlSubHeadName").dxSelectBox({
            placeholder: "Select Group...",
            searchEnabled: true
            //items: ["EMPLOYEE", "BUYER", "OTHER", "SUPPLYER", "MANUFACTURER", "ACCOUNT", "SALER", "BROKER", "DESIGNER"],
        }).dxValidator({
            validationGroup: "AccountInfo",
            validationRules: []
        }).dxSelectBox("instance");

        AccountMasterView.variables.dx_txtHead = $("#dx_txtHead").dxAutocomplete({
            placeholder: "Type Account Head...",
            dataSource: new DevExpress.data.CustomStore({
                load: function (loadOptions) {
                    var deferred = $.Deferred();

                    var myfilter = { rules: [] };
                    myfilter.rules.push({ field: "SEARCH", op: "eq", data: loadOptions.searchValue });
                    myfilter.rules.push({ field: "TYPE", op: "eq", data: "AccHead" });

                    var result;
                    $.ajax({
                        url: getDomain() + AccountMasterView.variables.BindStaticDataUrl + "&myfilters=" + JSON.stringify(myfilter),
                        async: false,
                        cache: false,
                        type: 'POST',
                        success: function (data) {
                            if ($(data).find('RESPONSECODE').text() == "0") {
                                result = xml2json.parser(data);
                            }
                            else {
                                DevExVariables.InvalidResponseCode(data);
                            }
                        },
                        error: OnError
                    });

                    if (result != "Error") {
                        if (result.serviceresponse.detailslist)
                            deferred.resolve(result.serviceresponse.detailslist.details);
                        else
                            deferred.reject("No Records Found");
                    }
                    else {
                        deferred.reject("Data Loading Error");
                    }

                    return deferred.promise();
                },
                key: "headid",
            }),
            valueExpr: "headname",
            onSelectionChanged: function (data) {
                if (data.selectedItem)
                    AccountMasterView.GetSubHeadList(data.selectedItem.headid);
                else
                    AccountMasterView.variables.dx_ddlSubHeadName.option({
                        dataSource: [],
                        displayExpr: "subhead",
                        valueExpr: "subheadid",
                    });
            },
            onFocusOut: function (data) {
                if (!data.component.option().selectedItem) {
                    AccountMasterView.variables.dx_txtHead.option("value", "");
                }
            }
        }).dxValidator({
            validationGroup: "AccountInfo",
            validationRules: [{
                type: "required",
                message: "Head is required"
            }]
        }).dxAutocomplete("instance");

        AccountMasterView.variables.dx_txtDepartment = $("#dx_txtDepartment").dxAutocomplete({
            placeholder: "Type Department...",
            dataSource: new DevExpress.data.CustomStore({
                load: function (loadOptions) {
                    var deferred = $.Deferred();

                    var myfilter = { rules: [] };
                    myfilter.rules.push({ field: "SEARCH", op: "eq", data: loadOptions.searchValue });
                    myfilter.rules.push({ field: "TYPE", op: "eq", data: "Department" });

                    var result;
                    $.ajax({
                        url: getDomain() + AccountMasterView.variables.BindStaticDataUrl + "&myfilters=" + JSON.stringify(myfilter),
                        async: false,
                        cache: false,
                        type: 'POST',
                        success: function (data) {
                            if ($(data).find('RESPONSECODE').text() == "0") {
                                result = xml2json.parser(data);
                            }
                            else {
                                DevExVariables.InvalidResponseCode(data);
                            }
                        },
                        error: OnError
                    });

                    if (result != "Error") {
                        if (result.serviceresponse.detailslist)
                            deferred.resolve(result.serviceresponse.detailslist.details);
                        else
                            deferred.reject("No Records Found");
                    }
                    else {
                        deferred.reject("Data Loading Error");
                    }

                    return deferred.promise();
                },
                key: "departmentid",
            }),
            valueExpr: "department",
            onSelectionChanged: function (data) {

            },
            onFocusOut: function (data) {
                if (!data.component.option().selectedItem) {
                    AccountMasterView.variables.dx_txtDepartment.option("value", "");
                }
            }
        }).dxValidator({
            validationGroup: "AccountInfo",
            validationRules: []
        }).dxAutocomplete("instance");

        AccountMasterView.variables.dx_txtGroup = $("#dx_txtGroup").dxAutocomplete({
            placeholder: "Select Group Name...",
            visible: true,
            dataSource: new DevExpress.data.CustomStore({
                load: function (loadOptions) {
                    var deferred = $.Deferred();
                  
                    var myfilter = { rules: [] };
                    myfilter.rules.push({ field: "GROUPNAME", op: "eq", data: "Creditors/Debitors" });
                    var result;

                    $.ajax({
                        url: getDomain() + AccountMasterView.variables.BindGroupListUrl + "&_search=true&searchField=ACCOUNTNAME&searchOper=cn&searchString=" + loadOptions.searchValue + "&myfilters=" + JSON.stringify(myfilter),
                        async: false,
                        cache: false,
                        type: 'POST',
                        success: function (data) {
                            if ($(data).find('RESPONSECODE').text() == "0") {
                                result = xml2json.parser(data);
                            }
                            else {
                                DevExVariables.InvalidResponseCode(data);
                            }
                        },
                        error: OnError
                    });

                    if (result != "Error" && result) {
                        if (result.serviceresponse.detailslist)
                            deferred.resolve(result.serviceresponse.detailslist.details);
                        else
                            deferred.reject("No Records Found");
                    }
                    else {
                        deferred.reject("Data Loading Error");
                    }

                    return deferred.promise();
                },
                key: "accid",
            }),
            valueExpr: "accountname",
            itemTemplate: function (data) {
                return $("<div class='product-name'>" + "(" + data.partycode + ")&nbsp;" + data.accountname + "</div>");
            },
            onFocusOut: function (data) {
                if (!data.component.option().selectedItem) {
                    AccountMasterView.variables.dx_txtGroup.option("value", "");
                }
            }
            //itemTemplate: function (data) {
            //    return $("<div>" + data.accountname + "</div>");
            //},
        }).dxValidator({
            validationGroup: "AccountInfo",
            validationRules: []
        }).dxAutocomplete("instance");

        AccountMasterView.variables.dx_txtMobile1 = $("#dx_txtMobile1").dxTextBox({
            mode: "tel",
            placeholder: "Enter Mobile number1...",
        }).dxValidator({
            validationGroup: "AccountInfo",
            validationRules: []
        }).dxTextBox("instance");

        AccountMasterView.variables.dx_txtMobile2 = $("#dx_txtMobile2").dxTextBox({
            mode: "tel",
            placeholder: "Enter Mobile number2...",
        }).dxValidator({
            validationGroup: "AccountInfo",
            validationRules: []
        }).dxTextBox("instance");

        AccountMasterView.variables.dx_txtEmailId = $("#dx_txtEmailId").dxTextBox({
            mode: "email",
            placeholder: "Enter Email Id...",
        }).dxValidator({
            validationGroup: "AccountInfo",
            validationRules: []
        }).dxTextBox("instance");

        AccountMasterView.variables.dx_txtFaxNo = $("#dx_txtFaxNo").dxTextBox({
            mode: "number",
            placeholder: "Enter Fax No...",
        }).dxValidator({
            validationGroup: "AccountInfo",
            validationRules: []
        }).dxTextBox("instance");

        AccountMasterView.variables.dx_txtcreditLimit = $("#dx_txtcreditLimit").dxTextBox({
            mode: "number",
            placeholder: "Enter Credit Limit...",
        }).dxValidator({
            validationGroup: "AccountInfo",
            validationRules: []
        }).dxTextBox("instance");

        AccountMasterView.variables.dx_txtCreditDays = $("#dx_txtCreditDays").dxTextBox({
            mode: "number",
            placeholder: "Enter Credit Days...",
        }).dxValidator({
            validationGroup: "AccountInfo",
            validationRules: []
        }).dxTextBox("instance");

        var now = new Date();
        AccountMasterView.variables.dx_dtdoj = $("#dx_dtdoj").dxDateBox({
            type: "date",
            value: now,
            showClearButton: true,
            useMaskBehavior: true,
            displayFormat: "dd MMM yyyy",
        }).dxValidator({
            validationGroup: "AccountInfo",
            validationRules: []
        }).dxDateBox("instance");

        AccountMasterView.variables.dx_txtTaxPro = $("#dx_txtTaxPro").dxSelectBox({
            placeholder: "Select Tax Profile...",
            searchEnabled: true
        }).dxValidator({
            validationGroup: "AccountInfo",
            validationRules: [{
                type: "required",
                message: "Tax Profile is required"
            }]
        }).dxSelectBox("instance");

        AccountMasterView.variables.dx_ddlCountry = $("#dx_ddlCountry").dxSelectBox({
            placeholder: "Select Country...",
            searchEnabled: true,
            onValueChanged: function (data) {
                if (data.value)
                    AccountMasterView.GetStatesList(data.value);
            }
        }).dxValidator({
            validationGroup: "AccountInfo",
            validationRules: [{
                type: "required",
                message: "Country is required"
            }]
        }).dxSelectBox("instance");

        AccountMasterView.variables.dx_ddlState = $("#dx_ddlState").dxSelectBox({
            placeholder: "Select State...",
            searchEnabled: true,
            onValueChanged: function (data) {
                if (data.value)
                    AccountMasterView.GetCityList(data.value);
            }
        }).dxValidator({
            validationGroup: "AccountInfo",
            validationRules: [{
                type: "required",
                message: "State is required"
            }]
        }).dxSelectBox("instance");

        AccountMasterView.variables.dx_ddlCity = $("#dx_ddlCity").dxSelectBox({
            placeholder: "Select City...",
            searchEnabled: true,
        }).dxValidator({
            validationGroup: "AccountInfo",
            validationRules: [{
                type: "required",
                message: "City is required"
            }]
        }).dxSelectBox("instance");

        AccountMasterView.variables.dx_ddlCurrency = $("#dx_ddlCurrency").dxSelectBox({
            //value: AccountMasterView.variables.dx_ddlCurrency.selecteditem[1],
            placeholder: "Select Currency...",
            searchEnabled: true,
        }).dxValidator({
            validationGroup: "AccountInfo",
            validationRules: [{
                type: "required",
                message: "Currency is required"
            }]
        }).dxSelectBox("instance");

        AccountMasterView.variables.dx_swAllowLogin = $("#dx_swAllowLogin").dxSwitch({
            value: false,
            disabled : isAU() ? false : true
        }).dxValidator({
            validationGroup: "AccountInfo",
            validationRules: []
        }).dxSwitch("instance");

        AccountMasterView.variables.dx_btnSubmit_AccountInfo = $("#dx_btnSubmit_AccountInfo").dxButton({
            icon: "arrowright",
            text: "Save & Next",
            type: "success",
            validationGroup: "AccountInfo",
            onClick: function (e) {
                //var validation = e.validationGroup.validate();
                var validation = DevExpress.validationEngine.validateGroup("AccountInfo");
                if (!validation.isValid) {
                    DevExVariables.Toaster("warning", "Please fill all required fields before submit.");
                    return;
                }

                AccountMasterView.variables.Type = 'AccountInfo';
                AccountMasterView.btnMasterSubmit_AccountInfo();

                //e.validationGroup.reset();
            }
        }).dxButton("instance");
        /*------------------------/Account Info-----------------------*/

        /*------------------------Personal Detail-----------------------*/
        AccountMasterView.variables.dx_txtPerson_Name = $("#dx_txtPerson_Name").dxTextBox({
            placeholder: "Enter Person Name...",
        }).dxValidator({
            validationGroup: "PersonalDetail",
            validationRules: []
        }).dxTextBox("instance");

        AccountMasterView.variables.dx_txtPerson_No = $("#dx_txtPerson_No").dxTextBox({
            placeholder: "Enter Person Mobile No...",
        }).dxValidator({
            validationGroup: "PersonalDetail",
            validationRules: []
        }).dxTextBox("instance");

        AccountMasterView.variables.dx_rdGender = $("#dx_rdGender").dxRadioGroup({
            items: ['Male', 'Female'],
            value: "Male",
            layout: 'horizontal',
        }).dxValidator({
            validationGroup: "PersonalDetail",
            validationRules: []
        }).dxRadioGroup("instance");

        AccountMasterView.variables.dx_txtPersonAddress = $("#dx_txtPersonAddress").dxTextBox({
            placeholder: "Enter Person Address...",
        }).dxValidator({
            validationGroup: "PersonalDetail",
            validationRules: []
        }).dxTextBox("instance");

        AccountMasterView.variables.dx_PersonBirthDate = $("#dx_PersonBirthDate").dxDateBox({
            type: "date",
            //value: now,
            showClearButton: true,
            useMaskBehavior: true,
            displayFormat: "dd/M/yyyy",
        }).dxValidator({
            validationGroup: "PersonalDetail",
            validationRules: []
        }).dxDateBox("instance");

        AccountMasterView.variables.dx_PersonAnniversary = $("#dx_PersonAnniversary").dxDateBox({
            type: "date",
            //value: now,
            showClearButton: true,
            useMaskBehavior: true,
            displayFormat: "dd/M/yyyy",
        }).dxValidator({
            validationGroup: "PersonalDetail",
            validationRules: []
        }).dxDateBox("instance");

        AccountMasterView.variables.dx_txtPersonRelligion = $("#dx_txtPersonRelligion").dxTextBox({
            placeholder: "Enter Person Relligion...",
        }).dxValidator({
            validationGroup: "PersonalDetail",
            validationRules: []
        }).dxTextBox("instance");

        AccountMasterView.variables.dx_txtPerson_profession = $("#dx_txtPerson_profession").dxTextBox({
            placeholder: "Enter Person Profession...",
        }).dxValidator({
            validationGroup: "PersonalDetail",
            validationRules: []
        }).dxTextBox("instance");

        AccountMasterView.variables.dx_btnSubmit_PersonalInfo = $("#dx_btnSubmit_PersonalInfo").dxButton({
            icon: "arrowright",
            text: "Save & Next",
            type: "success",
            validationGroup: "PersonalDetail",
            onClick: function (e) {
                AccountMasterView.variables.Type = "PersonalDetails";
                AccountMasterView.variables.Oper = "Edit";
                AccountMasterView.btnMasterSubmit_PersonalDetails();
            }
        }).dxButton("instance");

        AccountMasterView.variables.dx_btnCancel_PersonalInfo = $("#dx_btnCancel_PersonalInfo").dxButton({
            icon: "arrowleft",
            text: "previous",
            type: "default",
            validationGroup: "PersonalDetail",
            onClick: function (e) {
                AccountMasterView.variables.Type = 'AccountInfo';
                $("#tbl_AccountInfo").trigger("click");
            }
        }).dxButton("instance");
        /*------------------------/Personal Detail-----------------------*/

        /*------------------------Bank Detail-----------------------*/
        AccountMasterView.variables.dx_txtBankName = $("#dx_txtBankName").dxTextBox({
            placeholder: "Enter bank Name...",
        }).dxValidator({
            validationGroup: "BankDetail",
            validationRules: []
        }).dxTextBox("instance");

        AccountMasterView.variables.dx_txtBranchName = $("#dx_txtBranchName").dxTextBox({
            placeholder: "Enter branch Name...",
        }).dxValidator({
            validationGroup: "BankDetail",
            validationRules: []
        }).dxTextBox("instance");

        AccountMasterView.variables.dx_txtBankAccount = $("#dx_txtBankAccount").dxTextBox({
            placeholder: "Enter Bank Account...",
        }).dxValidator({
            validationGroup: "BankDetail",
            validationRules: []
        }).dxTextBox("instance");

        AccountMasterView.variables.dx_txtBankAccType = $("#dx_txtBankAccType").dxTextBox({
            placeholder: "Enter Bank Account Type...",
        }).dxValidator({
            validationGroup: "BankDetail",
            validationRules: []
        }).dxTextBox("instance");

        AccountMasterView.variables.dx_txtAccNo = $("#dx_txtAccNo").dxTextBox({
            mode: "number",
            placeholder: "Enter Account No...",
        }).dxValidator({
            validationGroup: "BankDetail",
            validationRules: []
        }).dxTextBox("instance");

        AccountMasterView.variables.dx_txtIFSC = $("#dx_txtIFSC").dxTextBox({
            mode: "number",
            placeholder: "Enter IFSC Code...",
        }).dxValidator({
            validationGroup: "BankDetail",
            validationRules: []
        }).dxTextBox("instance");

        AccountMasterView.variables.dx_btnSubmit_BankDeatils = $("#dx_btnSubmit_BankDeatils").dxButton({
            icon: "arrowright",
            text: "Save&Next",
            type: "success",
            validationGroup: "BankDetail",
            onClick: function (e) {
                AccountMasterView.btnMasterSubmit_BankDetails();
            }
        }).dxButton("instance");

        AccountMasterView.variables.dx_btnprevious_BankDeatils = $("#dx_btnprevious_BankDeatils").dxButton({
            icon: "arrowleft",
            text: "previous",
            type: "default",
            validationGroup: "BankDetail",
            onClick: function (e) {
                AccountMasterView.variables.Oper = 'edit';
                AccountMasterView.variables.Type = 'PersonalDetails';

                $("#tbl_Personal").trigger("click");
            }
        }).dxButton("instance");
        /*------------------------/Bank Detail-----------------------*/

        /*------------------------Address Info-----------------------*/
        AccountMasterView.variables.dx_btnAddNew_ShipmentInfo = $("#dx_btnAddNew_ShipmentInfo").dxButton({
            icon: "plus",
            text: "Add New",
            type: "default",
            onClick: function (e) {
                $("#hdn_accountmaster_shipinginfoid").html("");

                AccountMasterView.variables.Oper = 'Add';
                AccountMasterView.variables.Type = 'ShipmentInfo';
                $("#shipmentEdit").show();
                $("#Addressfrom").hide();
            }
        }).dxButton("instance");

        AccountMasterView.variables.dx_btnNext_ShipmentInfo = $("#dx_btnNext_ShipmentInfo").dxButton({
            icon: "arrowright",
            text: "Next",
            type: "success",
            //useSubmitBehavior: true,
            onClick: function (e) {
                AccountMasterView.variables.Oper = 'edit';
                AccountMasterView.variables.Type = 'ReferenceDetails';
                $("#tbl_ReferenceDetails").trigger("click");
            }
        }).dxButton("instance");

        AccountMasterView.variables.dx_btnPrevious_ShipmentInfo = $("#dx_btnPrevious_ShipmentInfo").dxButton({
            icon: "arrowleft",
            text: "previous",
            type: "default",
            //useSubmitBehavior: true,
            onClick: function (e) {
                AccountMasterView.variables.Oper = 'edit';
                AccountMasterView.variables.Type = 'BankDetails';
                $("#tbl_BankDetails").trigger("click");
            }
        }).dxButton("instance");

        AccountMasterView.variables.dx_txtShipName = $("#dx_txtShipName").dxTextBox({
            placeholder: "Enter Name...",
        }).dxValidator({
            validationGroup: "AddressInfo",
            validationRules: [{
                type: "required",
                message: "Name is required"
            }]
        }).dxTextBox("instance");

        AccountMasterView.variables.dx_txtShipMobile = $("#dx_txtShipMobile").dxTextBox({
            mode: "tel",
            placeholder: "Enter Mobile number...",
        }).dxValidator({
            validationGroup: "AddressInfo",
            validationRules: [{
                type: "required",
                message: "Mobile No is required"
            }]
        }).dxTextBox("instance");

        AccountMasterView.variables.dx_ddlShipCountry = $("#dx_ddlShipCountry").dxSelectBox({
            placeholder: "Select Country...",
            searchEnabled: true,
            onValueChanged: function (data) {
                if (data.value)
                    AccountMasterView.GetStatesList_ShipmentInfo(data.value);
            }
        }).dxValidator({
            validationGroup: "AddressInfo",
            validationRules: [{
                type: "required",
                message: "Country is required"
            }]
        }).dxSelectBox("instance");

        AccountMasterView.variables.dx_ddlShipState = $("#dx_ddlShipState").dxSelectBox({
            placeholder: "Select State...",
            searchEnabled: true,
            onValueChanged: function (data) {
                if (data.value)
                    AccountMasterView.GetCityList_ShipmentInfo(data.value);
            }
        }).dxValidator({
            validationGroup: "AddressInfo",
            validationRules: [{
                type: "required",
                message: "State is required"
            }]
        }).dxSelectBox("instance");

        AccountMasterView.variables.dx_ddlShipCity = $("#dx_ddlShipCity").dxSelectBox({
            placeholder: "Select City...",
            searchEnabled: true,
        }).dxValidator({
            validationGroup: "AddressInfo",
            validationRules: [{
                type: "required",
                message: "City is required"
            }]
        }).dxSelectBox("instance");

        AccountMasterView.variables.dx_txtZipCode = $("#dx_txtZipCode").dxTextBox({
            mode: "number",
            placeholder: "Enter Zip Code...",
        }).dxValidator({
            validationGroup: "AddressInfo",
            validationRules: [{
                type: "required",
                message: "Zip Code is required"
            }]
        }).dxTextBox("instance");

        AccountMasterView.variables.dx_txtShipAddress = $("#dx_txtShipAddress").dxTextArea({
            height: 50
        }).dxValidator({
            validationGroup: "AddressInfo",
            validationRules: [{
                type: "required",
                message: "Address is required"
            }]
        }).dxTextArea("instance");

        AccountMasterView.variables.dx_txtAddressType = $("#dx_txtAddressType").dxSelectBox({
            placeholder: "Select Address Type...",
            searchEnabled: true,
        }).dxValidator({
            validationGroup: "AddressInfo",
            validationRules: [{
                type: "required",
                message: "Country is required"
            }]
        }).dxSelectBox("instance");

        AccountMasterView.variables.dx_GST_AddressInfo = $("#dx_GST_AddressInfo").dxTextBox({
            placeholder: "Enter GST No...",
        }).dxValidator({
            validationGroup: "AddressInfo",
            validationRules: []
        }).dxTextBox("instance");

        AccountMasterView.variables.dx_PANCARD_AddressInfo = $("#dx_PANCARD_AddressInfo").dxTextBox({
            placeholder: "Enter PAN No...",
        }).dxValidator({
            validationGroup: "AddressInfo",
            validationRules: []
        }).dxTextBox("instance");

        AccountMasterView.variables.dx_TANNO_AddressInfo = $("#dx_TANNO_AddressInfo").dxTextBox({
            placeholder: "Enter TAN No...",
        }).dxValidator({
            validationGroup: "AddressInfo",
            validationRules: []
        }).dxTextBox("instance");

        AccountMasterView.variables.dx_CINNO_Addressinfo = $("#dx_CINNO_Addressinfo").dxTextBox({
            placeholder: "Enter CIN No...",
        }).dxValidator({
            validationGroup: "AddressInfo",
            validationRules: []
        }).dxTextBox("instance");

        AccountMasterView.variables.dx_btnCancel__ShipmentInfo = $("#dx_btnCancel__ShipmentInfo").dxButton({
            icon: "close",
            text: "Cancel",
            type: "danger",
            validationGroup: "AddressInfo",
            onClick: function (e) {
                $("#hdn_accountmaster_shipinginfoid").html("");

                DevExpress.validationEngine.resetGroup("AddressInfo");

                $("#shipmentEdit").hide();
                $("#Addressfrom").show();
                AccountMasterView.variables.Oper = 'edit';

                //e.validationGroup.reset();
            }
        }).dxButton("instance");

        AccountMasterView.variables.dx_btnSave_ShipmentInfo = $("#dx_btnSave_ShipmentInfo").dxButton({
            icon: "check",
            text: "Submit",
            type: "success",
            validationGroup: "AddressInfo",
            onClick: function (e) {
                //var validation = e.validationGroup.validate();
                var validation = DevExpress.validationEngine.validateGroup("AddressInfo");
                if (!validation.isValid) {
                    DevExVariables.Toaster("warning", "Please fill all required fields before submit.");
                    return;
                }

                AccountMasterView.btnMasterSubmit_ShipmentInfo();
                //e.validationGroup.reset();
                DevExpress.validationEngine.resetGroup("AddressInfo");
            }
        }).dxButton("instance");
        /*------------------------/Address Info-----------------------*/

        /*------------------------Reference Details-----------------------*/
        AccountMasterView.variables.dx_btnAddNew_Reference = $("#dx_btnAddNew_Reference").dxButton({
            icon: "plus",
            text: "Add New",
            type: "default",
            onClick: function (e) {
                $("#hdn_accountmaster_ReferenceId").html("");

                AccountMasterView.variables.Oper = 'Add';
                AccountMasterView.variables.Type = 'ReferenceDetails';
                $("#ReferenceEdit").show();
                $("#ReferenceDetailsfrom").hide();
            }
        }).dxButton("instance");

        AccountMasterView.variables.dx_btnNext_ReferenceDetails = $("#dx_btnNext_ReferenceDetails").dxButton({
            icon: "arrowright",
            text: "Next",
            type: "success",
            //useSubmitBehavior: true,
            onClick: function (e) {
                AccountMasterView.variables.Oper = 'edit';
                AccountMasterView.variables.Type = 'Document_Upload';
                $("#tbl_Document_Upload").trigger("click");
            }
        }).dxButton("instance");

        AccountMasterView.variables.dx_btnPrevious_ReferenceDetails = $("#dx_btnPrevious_ReferenceDetails").dxButton({
            icon: "arrowleft",
            text: "previous",
            type: "default",
            //useSubmitBehavior: true,
            onClick: function (e) {
                AccountMasterView.variables.Oper = 'edit';
                AccountMasterView.variables.Type = 'ShipmentInfo';
                $("#tbl_AddressInfo").trigger("click");
            }
        }).dxButton("instance");

        AccountMasterView.variables.dx_rdReference = $("#dx_rdReference").dxRadioGroup({
            items: ['Good', 'Best', 'Great'],
            value: "Good",
            layout: 'horizontal',
        }).dxValidator({
            validationGroup: "ReferenceDetail",
            validationRules: []
        }).dxRadioGroup("instance");

        AccountMasterView.variables.dx_txtReferenceBy = $("#dx_txtReferenceBy").dxTextBox({
            placeholder: "Enter Reference Person Name...",
        }).dxValidator({
            validationGroup: "ReferenceDetail",
            validationRules: [{
                type: "required",
                message: "Reference Name is required"
            }]
        }).dxTextBox("instance");

        AccountMasterView.variables.dx_txtReferenceNotes = $("#dx_txtReferenceNotes").dxTextBox({
            placeholder: "Enter Reference Notes...",
        }).dxValidator({
            validationGroup: "ReferenceDetail",
            validationRules: []
        }).dxTextBox("instance");

        AccountMasterView.variables.dx_swAddFavList = $("#dx_swAddFavList").dxSwitch({
            value: false,
        }).dxValidator({
            validationGroup: "ReferenceDetail",
            validationRules: []
        }).dxSwitch("instance");

        AccountMasterView.variables.dx_btnCancel_ReferenceDetails = $("#dx_btnCancel_ReferenceDetails").dxButton({
            icon: "close",
            text: "Cancel",
            type: "danger",
            validationGroup: "ReferenceDetail",
            onClick: function (e) {
                $("#hdn_accountmaster_ReferenceId").html("");

                DevExpress.validationEngine.resetGroup("ReferenceDetail");
                AccountMasterView.variables.dx_rdReference.option({ value: "Good" });


                $("#ReferenceEdit").hide();
                $("#ReferenceDetailsfrom").show();
                AccountMasterView.variables.Oper = 'edit';

                //e.validationGroup.reset();
            }
        }).dxButton("instance");

        AccountMasterView.variables.dx_btnSave_ReferenceDetails = $("#dx_btnSave_ReferenceDetails").dxButton({
            icon: "check",
            text: "Submit",
            type: "success",
            validationGroup: "ReferenceDetail",
            onClick: function (e) {
                //var validation = e.validationGroup.validate();
                var validation = DevExpress.validationEngine.validateGroup("ReferenceDetail");
                if (!validation.isValid) {
                    DevExVariables.Toaster("warning", "Please fill all required fields before submit.");
                    return;
                }

                AccountMasterView.btnMasterSubmit_ReferenceDetails();
                //e.validationGroup.reset();
                DevExpress.validationEngine.resetGroup("ReferenceDetail");
                AccountMasterView.variables.dx_rdReference.option({ value: "Good" });

            }
        }).dxButton("instance");
        /*------------------------/Reference Details-----------------------*/

        /*------------------------Document Upload-----------------------*/
        AccountMasterView.variables.dx_btnprevious_Document_Upload = $("#dx_btnprevious_Document_Upload").dxButton({
            icon: "arrowleft",
            text: "previous",
            type: "default",
            onClick: function (e) {
                AccountMasterView.variables.Type = 'ReferenceDetails';
                $("#tbl_ReferenceDetails").trigger("click");
            }
        }).dxButton("instance");

        AccountMasterView.variables.dx_btnSave_Document_Upload = $("#dx_btnSave_Document_Upload").dxButton({
            icon: "arrowright",
            text: "Save & Next",
            type: "success",
            onClick: function (e) {
                var rowCount = +$('#FilePreviewList tr').length;
                if (rowCount == 0) {
                    AccountMasterView.variables.Oper = 'edit';
                    AccountMasterView.variables.Type = 'StaffInfo';
                    $("#tbl_StaffInfo").trigger("click");
                }
                else {
                    AccountMasterView.variables.Oper = 'edit';
                    AccountMasterView.variables.Type = 'Document_Upload';
                    AccountMasterView.btnMasterSubmit_Document_Upload();
                }
            }
        }).dxButton("instance");
        /*------------------------/Document Upload-----------------------*/

        /*------------------------Staff Detail-----------------------*/
        AccountMasterView.variables.dx_previous_StaffInfo = $("#dx_previous_StaffInfo").dxButton({
            icon: "arrowleft",
            text: "previous",
            type: "default",
            onClick: function (e) {
                AccountMasterView.variables.Type = 'Document_Upload';
                $("#tbl_Document_Upload").trigger("click");
            }
        }).dxButton("instance");

        AccountMasterView.variables.dx_SAVE_AND_NEXT_StaffInfo = $("#dx_SAVE_AND_NEXT_StaffInfo").dxButton({
            icon: "arrowright",
            text: "Next",
            type: "success",
            onClick: function (e) {
                AccountMasterView.variables.Oper = 'edit';
                AccountMasterView.variables.Type = 'OtherInfo';
                $("#tbl_Other_Info").trigger("click");
            }
        }).dxButton("instance");

        AccountMasterView.variables.dx_AddNew_StaffInfo = $("#dx_AddNew_StaffInfo").dxButton({
            icon: "plus",
            text: "Add New",
            type: "default",
            onClick: function (e) {
                $("#hdn_accountmaster_staffinfoid").html("");

                AccountMasterView.variables.Oper = 'Add';
                AccountMasterView.variables.Type = 'StaffInfo';
                $("#staffEdit").show();
                $("#stafffrom").hide();
            }
        }).dxButton("instance");

        AccountMasterView.variables.dx_txtStaffName = $("#dx_txtStaffName").dxTextBox({
            placeholder: "Enter Name...",
        }).dxValidator({
            validationGroup: "StaffDetail",
            validationRules: [{
                type: "required",
                message: "Name is required"
            }]
        }).dxTextBox("instance");

        AccountMasterView.variables.dx_ddlStaffRelation = $("#dx_ddlStaffRelation").dxTextBox({
            placeholder: "Enter Relation...",
        }).dxValidator({
            validationGroup: "StaffDetail",
            validationRules: [{
                type: "required",
                message: "Relation is required"
            }]
        }).dxTextBox("instance");

        AccountMasterView.variables.dx_ddtstaffBirthdate = $("#dx_ddtstaffBirthdate").dxDateBox({
            type: "date",
            showClearButton: true,
            useMaskBehavior: true,
            displayFormat: "dd/M/yyyy",
        }).dxValidator({
            validationGroup: "StaffDetail",
            validationRules: [{
                type: "required",
                message: "Birthdate is required"
            }]
        }).dxDateBox("instance");

        AccountMasterView.variables.dx_txtAge = $("#dx_txtAge").dxTextBox({
            mode: "number",
            placeholder: "Enter Age...",
        }).dxValidator({
            validationGroup: "StaffDetail",
            validationRules: [{
                type: "required",
                message: "Age is required"
            }]
        }).dxTextBox("instance");

        AccountMasterView.variables.dx_ddtAnniversaryDate = $("#dx_ddtAnniversaryDate").dxDateBox({
            type: "date",
            showClearButton: true,
            useMaskBehavior: true,
            displayFormat: "dd/M/yyyy",
        }).dxValidator({
            validationGroup: "StaffDetail",
            validationRules: []
        }).dxDateBox("instance");

        AccountMasterView.variables.dx_ddlStaffCountry = $("#dx_ddlStaffCountry").dxSelectBox({
            placeholder: "Select Country...",
            searchEnabled: true,
            onValueChanged: function (data) {
                if (data.value)
                    AccountMasterView.GetStatesList_staffinfo(data.value);
            }
        }).dxValidator({
            validationGroup: "StaffDetail",
            validationRules: [{
                type: "required",
                message: "Country is required"
            }]
        }).dxSelectBox("instance");

        AccountMasterView.variables.dx_ddlStaffState = $("#dx_ddlStaffState").dxSelectBox({
            placeholder: "Select State...",
            searchEnabled: true,
            onValueChanged: function (data) {
                if (data.value)
                    AccountMasterView.GetCityList_staffinfo(data.value);
            }
        }).dxValidator({
            validationGroup: "StaffDetail",
            validationRules: [{
                type: "required",
                message: "State is required"
            }]
        }).dxSelectBox("instance");

        AccountMasterView.variables.dx_ddlStaffCity = $("#dx_ddlStaffCity").dxSelectBox({
            placeholder: "Select City...",
            searchEnabled: true,
        }).dxValidator({
            validationGroup: "StaffDetail",
            validationRules: [{
                type: "required",
                message: "City is required"
            }]
        }).dxSelectBox("instance");

        AccountMasterView.variables.dx_txtStaffMobile = $("#dx_txtStaffMobile").dxTextBox({
            mode: "number",
            placeholder: "Enter Mobile...",
        }).dxValidator({
            validationGroup: "StaffDetail",
            validationRules: []
        }).dxTextBox("instance");

        AccountMasterView.variables.dx_txtStaffEmail = $("#dx_txtStaffEmail").dxTextBox({
            placeholder: "Enter Email...",
        }).dxValidator({
            validationGroup: "StaffDetail",
            validationRules: []
        }).dxTextBox("instance");

        AccountMasterView.variables.dx_btnStaffCancel = $("#dx_btnStaffCancel").dxButton({
            icon: "close",
            text: "cancel",
            type: "danger",
            validationGroup: "StaffDetail",
            onClick: function (e) {
                $("#hdn_accountmaster_staffinfoid").html("");

                DevExpress.validationEngine.resetGroup("StaffDetail");

                AccountMasterView.variables.Oper = 'edit';
                AccountMasterView.variables.Type = 'StaffInfo';

                $("#staffEdit").hide();
                $("#stafffrom").show();
                //e.validationGroup.reset();
            }
        }).dxButton("instance");

        AccountMasterView.variables.dx_btnStaffSave_staffinfo = $("#dx_btnStaffSave_staffinfo").dxButton({
            icon: "check",
            text: "Submit",
            type: "success",
            validationGroup: "StaffDetail",
            onClick: function (e) {
                //var validation = e.validationGroup.validate();
                var validation = DevExpress.validationEngine.validateGroup("StaffDetail");
                if (!validation.isValid) {
                    DevExVariables.Toaster("warning", "Please fill all required fields before submit.");
                    return;
                }

                AccountMasterView.variables.Type = 'staffinfo';
                AccountMasterView.btnMasterSubmit_staffinfo();
                //e.validationGroup.reset();
                DevExpress.validationEngine.resetGroup("StaffDetail");
            }
        }).dxButton("instance");
        /*------------------------/Staff Detail-----------------------*/

        /*------------------------Other Info-----------------------*/
        AccountMasterView.variables.dx_SwitchHallMark = $("#dx_SwitchHallMark").dxSwitch({
            value: false,
            switchedOnText: "Yes",
            switchedOffText: "No"
        }).dxValidator({
            validationGroup: "OtherInfo",
            validationRules: []
        }).dxSwitch("instance");

        AccountMasterView.variables.dx_SwitchDiamond = $("#dx_SwitchDiamond").dxSwitch({
            value: false,
            switchedOnText: "Yes",
            switchedOffText: "No"
        }).dxValidator({
            validationGroup: "OtherInfo",
            validationRules: []
        }).dxSwitch("instance");

        AccountMasterView.variables.dx_SwitchStamping = $("#dx_SwitchStamping").dxSwitch({
            value: false,
            switchedOnText: "Yes",
            switchedOffText: "No"
        }).dxValidator({
            validationGroup: "OtherInfo",
            validationRules: []
        }).dxSwitch("instance");

        AccountMasterView.variables.dx_ddlCertification = $("#dx_ddlCertification").dxTextBox({
            placeholder: "Enter Certification...",
        }).dxValidator({
            validationGroup: "OtherInfo",
            validationRules: []
        }).dxTextBox("instance");

        AccountMasterView.variables.dx_txtOfficeIns = $("#dx_txtOfficeIns").dxTextBox({
            placeholder: "Enter Office Instruction.",
        }).dxValidator({
            validationGroup: "OtherInfo",
            validationRules: []
        }).dxTextBox("instance");

        AccountMasterView.variables.dx_txtCustomerIns = $("#dx_txtCustomerIns").dxTextBox({
            placeholder: "Enter Customer Instruction...",
        }).dxValidator({
            validationGroup: "OtherInfo",
            validationRules: []
        }).dxTextBox("instance");

        AccountMasterView.variables.dx_txtUser = $("#dx_txtUser").dxTextBox({
            placeholder: "Enter User...",
        }).dxValidator({
            validationGroup: "OtherInfo",
            validationRules: []
        }).dxTextBox("instance");

        AccountMasterView.variables.dx_txtAdmin = $("#dx_txtAdmin").dxTextBox({
            placeholder: "Enter Admin...",
        }).dxValidator({
            validationGroup: "OtherInfo",
            validationRules: []
        }).dxTextBox("instance");

        AccountMasterView.variables.dx_txtInstruction = $("#dx_txtInstruction").dxTextBox({
            placeholder: "Enter Instruction...",
        }).dxValidator({
            validationGroup: "OtherInfo",
            validationRules: []
        }).dxTextBox("instance");

        AccountMasterView.variables.dx_btnCancel_OtherInfo = $("#dx_btnCancel_OtherInfo").dxButton({
            icon: "arrowleft",
            text: "previous",
            type: "default",
            validationGroup: "OtherInfo",
            onClick: function (e) {
                AccountMasterView.variables.Type = 'StaffInfo';
                $("#tbl_StaffInfo").trigger("click");
            }
        }).dxButton("instance");

        AccountMasterView.variables.dx_btnSave_OtherInfo = $("#dx_btnSave_OtherInfo").dxButton({
            icon: "arrowright",
            text: "Save & Next",
            type: "success",
            validationGroup: "OtherInfo",
            onClick: function (e) {
                AccountMasterView.variables.Type = "OtherInfo";
                AccountMasterView.variables.Oper = "Edit";
                AccountMasterView.btnMasterSubmit_OtherInfo();
            }
        }).dxButton("instance");
        /*------------------------/Other Info-----------------------*/

        /*------------------------price policy-----------------------*/
        AccountMasterView.variables.dx_txtMaterialPrice = $("#dx_txtMaterialPrice").dxSelectBox({
            placeholder: "Select Material Price List...",
            searchEnabled: true,
            onValueChanged: function (data) {
            }
        }).dxValidator({
            validationGroup: "PricePolicy",
            validationRules: []
        }).dxSelectBox("instance");

        AccountMasterView.variables.dx_txtLabourPrice = $("#dx_txtLabourPrice").dxSelectBox({
            placeholder: "Select Labour Price List...",
            searchEnabled: true,
            onValueChanged: function (data) {
            }
        }).dxValidator({
            validationGroup: "PricePolicy",
            validationRules: []
        }).dxSelectBox("instance");

        AccountMasterView.variables.dx_ddlSettingPrice = $("#dx_ddlSettingPrice").dxSelectBox({
            placeholder: "Select Setting Price...",
            searchEnabled: true,
            onValueChanged: function (data) {
            }
        }).dxValidator({
            validationGroup: "PricePolicy",
            validationRules: []
        }).dxSelectBox("instance");

        AccountMasterView.variables.dx_ddtPolicyDueDate = $("#dx_ddtPolicyDueDate").dxDateBox({
            type: "date",
            showClearButton: true,
            useMaskBehavior: true,
            displayFormat: "dd/M/yyyy",
        }).dxValidator({
            validationGroup: "PricePolicy",
            validationRules: []
        }).dxDateBox("instance");

        AccountMasterView.variables.dx_txtDiscount = $("#dx_txtDiscount").dxTextBox({
            placeholder: "Enter Discount ...",
        }).dxValidator({
            validationGroup: "PricePolicy",
            validationRules: []
        }).dxTextBox("instance");

        AccountMasterView.variables.dx_btnCancel_Price = $("#dx_btnCancel_Price").dxButton({
            icon: "arrowleft",
            text: "previous",
            type: "default",
            validationGroup: "PricePolicy",
            onClick: function (e) {
                AccountMasterView.variables.Oper = 'edit';
                AccountMasterView.variables.Type = 'OtherInfo';

                $("#tbl_Other_Info").trigger("click");
            }
        }).dxButton("instance");

        AccountMasterView.variables.dx_btnSave_Price = $("#dx_btnSave_Price").dxButton({
            icon: "check",
            text: "Save",
            type: "success",
            validationGroup: "PricePolicy",
            onClick: function (e) {
                if (!AccountMasterView.variables.dx_txtMaterialPrice.option().value
                    && !AccountMasterView.variables.dx_txtLabourPrice.option().value
                    && !AccountMasterView.variables.dx_ddlSettingPrice.option().value
                    && !AccountMasterView.variables.dx_ddtPolicyDueDate.option().value
                    && !AccountMasterView.variables.dx_txtDiscount.option().value
                ) {
                    DevExVariables.Toaster("warning", "Please enter value in atleast one field for submit.");
                    return;
                }

                AccountMasterView.btnMasterSubmit_PricePolicy();
            }
        }).dxButton("instance");
        /*------------------------/price policy-----------------------*/

        /*------------------------Login Settings-----------------------*/
        AccountMasterView.variables.dx_txtUserName = $("#dx_txtUserName").dxTextBox({
            placeholder: "Enter Username ...",
        }).dxValidator({
            validationGroup: "LoginSetting",
            validationRules: []
        }).dxTextBox("instance");

        AccountMasterView.variables.dx_txtPassword = $("#dx_txtPassword").dxTextBox({
            placeholder: "Enter Password ...",
            mode: 'password',
            stylingMode: 'filled',
            buttons: [{
                name: 'password',
                location: 'after',
                options: {
                    icon: 'fa fa-eye',
                    type: 'default',
                    onClick() {
                        AccountMasterView.variables.dx_txtPassword.option('mode', AccountMasterView.variables.dx_txtPassword.option('mode') === 'text' ? 'password' : 'text');
                    },
                },
            }],
        }).dxValidator({
            validationGroup: "LoginSetting",
            validationRules: []
        }).dxTextBox("instance");

        AccountMasterView.variables.dx_ddlUserGroup = $("#dx_ddlUserGroup").dxTagBox({
            placeholder: "Select User Group...",
            searchEnabled: true,
            onValueChanged: function (data) {
            }
        }).dxValidator({
            validationGroup: "LoginSetting",
            validationRules: []
        }).dxTagBox("instance");

        AccountMasterView.variables.dx_ddlBranchAccess = $("#dx_ddlBranchAccess").dxTagBox({
            placeholder: "Select Branch to allow access...",
            searchEnabled: true,
            onValueChanged: function (data) {
            }
        }).dxValidator({
            validationGroup: "LoginSetting",
            validationRules: []
        }).dxTagBox("instance");

        AccountMasterView.variables.dx_ddlLockerAccess = $("#dx_ddlLockerAccess").dxTagBox({
            placeholder: "Select Lockers to allow access...",
            searchEnabled: true,
            onValueChanged: function (data) {
            }
        }).dxValidator({
            validationGroup: "LoginSetting",
            validationRules: []
        }).dxTagBox("instance");

        AccountMasterView.variables.dx_ddlSubbookAccess = $("#dx_ddlSubbookAccess").dxTagBox({
            placeholder: "Select Subbook to allow access...",
            searchEnabled: true,
            showSelectionControls: true,
            applyValueMode: 'useButtons',
            onValueChanged: function (data) {
            }
        }).dxValidator({
            validationGroup: "LoginSetting",
            validationRules: []
        }).dxTagBox("instance");

        AccountMasterView.variables.dx_swAllowedVerify = $("#dx_swAllowedVerify").dxSwitch({
            value: false,
        }).dxValidator({
            validationGroup: "LoginSetting",
            validationRules: []
        }).dxSwitch("instance");

        AccountMasterView.variables.dx_ddlDefDiaColor = $("#dx_ddlDefDiaColor").dxSelectBox({
            placeholder: "Select Default Diamond Color...",
            searchEnabled: true,
            onValueChanged: function (data) {
            }
        }).dxValidator({
            validationGroup: "LoginSetting",
            validationRules: []
        }).dxSelectBox("instance");

        AccountMasterView.variables.dx_ddlDefDiaClarity = $("#dx_ddlDefDiaClarity").dxSelectBox({
            placeholder: "Select Default Diamond Clarity...",
            searchEnabled: true,
            onValueChanged: function (data) {
            }
        }).dxValidator({
            validationGroup: "LoginSetting",
            validationRules: []
        }).dxSelectBox("instance");

        AccountMasterView.variables.dx_numStockMonthFrom = $("#dx_numStockMonthFrom").dxNumberBox({
            showSpinButtons: true,
        }).dxValidator({
            validationGroup: "LoginSetting",
            validationRules: []
        }).dxNumberBox("instance");

        AccountMasterView.variables.dx_numStockMonthTo = $("#dx_numStockMonthTo").dxNumberBox({
            showSpinButtons: true,
        }).dxValidator({
            validationGroup: "LoginSetting",
            validationRules: []
        }).dxNumberBox("instance");

        AccountMasterView.variables.dx_ddlConsInGWgt = $("#dx_ddlConsInGWgt").dxTagBox({
            placeholder: "Select...",
            searchEnabled: true,
            items: ["AD DIAMOND", "CS", "BELT", "DIAMOND"],
            onValueChanged: function (data) {
            }
        }).dxValidator({
            validationGroup: "LoginSetting",
            validationRules: []
        }).dxTagBox("instance");

        AccountMasterView.variables.dx_dtAppActiveDate = $("#dx_dtAppActiveDate").dxDateBox({
            type: "datetime",
            showClearButton: true,
            useMaskBehavior: true,
            displayFormat: "dd/MMM/yyyy hh:mm aa",
        }).dxValidator({
            validationGroup: "LoginSetting",
            validationRules: []
        }).dxDateBox("instance");

        AccountMasterView.variables.dx_dtWebActiveDate = $("#dx_dtWebActiveDate").dxDateBox({
            type: "datetime",
            showClearButton: true,
            useMaskBehavior: true,
            displayFormat: "dd/MMM/yyyy hh:mm aa",
        }).dxValidator({
            validationGroup: "LoginSetting",
            validationRules: []
        }).dxDateBox("instance");

        AccountMasterView.variables.dx_ddlDesignConcept = $("#dx_ddlDesignConcept").dxTagBox({
            placeholder: "Select Concept...",
            searchEnabled: true,
            onValueChanged: function (data) {
            }
        }).dxValidator({
            validationGroup: "LoginSetting",
            validationRules: []
        }).dxTagBox("instance");

        AccountMasterView.variables.dx_ddlPolicy = $("#dx_ddlPolicy").dxTagBox({
            placeholder: "Select Concept...",
            searchEnabled: true,
            items: ["Jobwork", "Business"],
            onValueChanged: function (data) {
            }
        }).dxValidator({
            validationGroup: "LoginSetting",
            validationRules: []
        }).dxTagBox("instance");

        AccountMasterView.variables.dx_btnCancel_LoginSetting = $("#dx_btnCancel_LoginSetting").dxButton({
            icon: "arrowleft",
            text: "previous",
            type: "default",
            validationGroup: "LoginSetting",
            onClick: function (e) {
                AccountMasterView.variables.Oper = 'edit';
                AccountMasterView.variables.Type = 'Price_Policy';

                $("#tbl_Price_Policy").trigger("click");
            }
        }).dxButton("instance");

        AccountMasterView.variables.dx_btnSave_LoginSetting = $("#dx_btnSave_LoginSetting").dxButton({
            icon: "check",
            text: "Save",
            type: "success",
            validationGroup: "LoginSetting",
            onClick: function (e) {
                AccountMasterView.btnMasterSubmit_LoginSetting();
            }
        }).dxButton("instance");
        /*------------------------/Login Settings-----------------------*/


        AccountMasterView.variables.dx_btnCancel_AccountInfo = $("#dx_btnCancel_AccountInfo").dxButton({
            icon: "arrowleft",
            text: "Back",
            type: "danger",
            onClick: function (e) {
                AccountMasterView.clearControls();
                //e.validationGroup.reset();
            }
        }).dxButton("instance");

        AccountMasterView.variables.dx_btnAddNew = $("#dx_btnAddNew").dxButton({
            stylingMode: "outlined",
            icon: "plus",
            text: "Add New",
            type: "default",
            onClick: function (e) {
                e.validationGroup.reset();

                $("#AccountMaster").show();
                $("#pnlView").hide();

                AccountMasterView.variables.dx_txtAccountName.focus();
            }
        }).dxButton("instance");
    },

    initializeDevExgrid: function () {
        AccountMasterView.variables.dx_dataGrid = $("#dx_dataGrid").dxDataGrid({
            dataSource: new DevExpress.data.CustomStore({
                key: "accid",
                load: function (loadOptions) {
                    var deferred = $.Deferred();

                    var result = DevExVariables.GetDataList(loadOptions, AccountMasterView.variables.BindGroupListUrl);

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
                {
                    dataField: "isactive", caption: "Active", dataType: "string", alignment: "center", filterOperations: ["contains"],
                    allowSorting: false, allowFiltering: false, allowHeaderFiltering: true, allowGrouping: false,
                    headerFilter: {
                        dataSource: [{
                            text: "Yes",
                            value: ["isactive", "equals", 1]
                        }, {
                            text: "No",
                            value: ["isactive", "equals", 0]
                        }]
                    },
                    cellTemplate: function (container, options) {
                        if (isU()) {
                            $("<div>").dxSwitch({
                                value: options.value,
                                switchedOnText: "Yes",
                                switchedOffText: "No",
                                onValueChanged: function (data) {
                                    AccountMasterView.ActiveDeactiveFromGrid(data.value, options.key);
                                }
                            }).appendTo(container);
                        }
                        else
                            DevExVariables.LabelTemplate(container, options);
                    }
                },
                {
                    dataField: "isloginallowed", caption: "Login", dataType: "string", alignment: "center", filterOperations: ["contains"],
                    allowSorting: false, allowFiltering: false, allowHeaderFiltering: true, allowGrouping: false,
                    headerFilter: {
                        dataSource: [{
                            text: "Yes",
                            value: ["isloginallowed", "equals", 1]
                        }, {
                            text: "No",
                            value: ["isloginallowed", "equals", 0]
                        }]
                    },
                    cellTemplate: function (container, options) {
                        if (isAU()) {
                            $("<div>").dxSwitch({
                                value: options.value,
                                switchedOnText: "Yes",
                                switchedOffText: "No",
                                onValueChanged: function (data) {
                                    AccountMasterView.ActiveDeactiveFromGrid(data.value, options.key, "Login");
                                } 
                            }).appendTo(container);
                       
                        }
                        else
                            DevExVariables.LabelTemplate(container, options);

                    }
                  
                },
                {
                    dataField: "isroamingallowed", caption: "Roaming", dataType: "string", alignment: "center", filterOperations: ["contains"],
                    allowSorting: false, allowFiltering: false, allowHeaderFiltering: true, allowGrouping: false,
                    headerFilter: {
                        dataSource: [{
                            text: "Yes",
                            value: ["isroamingallowed", "equals", 1]
                        }, {
                            text: "No",
                            value: ["isroamingallowed", "equals", 0]
                        }]
                    },
                    cellTemplate: function (container, options) {
                        if (isAU()) {
                            $("<div>").dxSwitch({
                                value: options.value,
                                switchedOnText: "Yes",
                                switchedOffText: "No",
                                onValueChanged: function (data) {
                                    AccountMasterView.ActiveDeactiveFromGrid(data.value, options.key, "Roaming");
                                }
                            }).appendTo(container);
                        }
                     
                        else
                            DevExVariables.LabelTemplate(container, options);
                    }
                     
                },
                { dataField: "purity", caption: "Purity", dataType: "string", filterOperations: ["contains"], allowSorting: false, allowFiltering: true, allowHeaderFiltering: false, allowGrouping: false },
                {
                    dataField: "entryfrom", caption: "Entry From", dataType: "string", filterOperations: ["contains"],
                    allowSorting: false, allowFiltering: false, allowHeaderFiltering: true, allowGrouping: false,
                    headerFilter: {
                        dataSource: [{
                            text: "ERP",
                            value: ["entryfrom", "equals", "ERP"]
                        }, {
                            text: "WEB",
                            value: ["entryfrom", "equals", "WEB"]
                        }, {
                             text: "APP",
                             value: ["entryfrom", "equals", "APP"]
                         }]
                    },
                },

               {
                   dataField: "Action", caption: "Action", alignment: "center", allowFiltering: false, allowSorting: false, fixed: true, fixedPosition: "right", allowGrouping: false
                    ,cellTemplate: function (container, options) {
                        DevExVariables.ActionTemplate(container, options, true, true, "AccountMasterView" );
                    }
                },
            ]
        }).dxDataGrid("instance");
    },

    initializeDevExgrid_ShipmentInfo: function (id) {
        $("#tbl_ShipmentInfo_tbody").html("");

        var myfilter = { rules: [] };
        myfilter.rules.push({ field: "ACCID", op: "eq", data: id });

        $.ajax({
            url: getDomain() + AccountMasterView.variables.BindGroupListUrl_ShipmentInfo + "&myfilters=" + JSON.stringify(myfilter),
            async: true,
            cache: false,
            type: 'POST',
            beforeSend: function () {
                dx_LoaderTrinity.show();
            },
            complete: function () {
                dx_LoaderTrinity.hide();
            },
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    var JsonObject = xml2json.parser(data);
                    if (JsonObject.serviceresponse.detailslist) {

                        var List = [];
                        if (JsonObject.serviceresponse.detailslist.details.length)
                            List = JsonObject.serviceresponse.detailslist.details;
                        else
                            List.push(JsonObject.serviceresponse.detailslist.details);

                        $("#tbl_ShipmentInfo_tbody").html($("#RenderFileList_ShipmentInfo").render(List));
                    }
                }
                else {
                    DevExVariables.InvalidResponseCode(data);
                }
            },
            error: OnError
        });
    },

    initializeDevExgrid_ReferenceDetails: function (id) {
        $("#tbl_ReferenceDetails_tbody").html("");

        var myfilter = { rules: [] };
        myfilter.rules.push({ field: "ACCID", op: "eq", data: id });

        $.ajax({
            url: getDomain() + AccountMasterView.variables.BindGroupListUrl_ReferenceDetails + "&myfilters=" + JSON.stringify(myfilter),
            async: true,
            cache: false,
            type: 'POST',
            beforeSend: function () {
                dx_LoaderTrinity.show();
            },
            complete: function () {
                dx_LoaderTrinity.hide();
            },
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    var JsonObject = xml2json.parser(data);
                    if (JsonObject.serviceresponse.detailslist) {

                        var List = [];
                        if (JsonObject.serviceresponse.detailslist.details.length)
                            List = JsonObject.serviceresponse.detailslist.details;
                        else
                            List.push(JsonObject.serviceresponse.detailslist.details);

                        $("#tbl_ReferenceDetails_tbody").html($("#RenderFileList_ReferenceDetails").render(List));
                    }
                }
                else {
                    DevExVariables.InvalidResponseCode(data);
                }
            },
            error: OnError
        });
    },

    initializeDevExgrid_StaffInfo: function (id) {
        $("#tbl_StaffInfo_tbody").html("");

        var myfilter = { rules: [] };
        myfilter.rules.push({ field: "ACCID", op: "eq", data: id });

        $.ajax({
            url: getDomain() + AccountMasterView.variables.BindGroupListUrl_STAFFINFO + "&myfilters=" + JSON.stringify(myfilter),
            async: true,
            cache: false,
            type: 'POST',
            beforeSend: function () {
                dx_LoaderTrinity.show();
            },
            complete: function () {
                dx_LoaderTrinity.hide();
            },
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    var JsonObject = xml2json.parser(data);
                    if (JsonObject.serviceresponse.detailslist) {

                        var List = [];
                        if (JsonObject.serviceresponse.detailslist.details.length)
                            List = JsonObject.serviceresponse.detailslist.details;
                        else
                            List.push(JsonObject.serviceresponse.detailslist.details);

                        $("#tbl_StaffInfo_tbody").html($("#RenderList_StaffInfo").render(List));
                    }
                }
                else {
                    DevExVariables.InvalidResponseCode(data);
                }
            },
            error: OnError
        });
    },

    triggerId_ShipmentInfo: function (id, oper) {
        var myfilter = { rules: [] };
        myfilter.rules.push({ field: "ACCOUNTMASTER_SHIPINGINFOID", op: "eq", data: id });

        $.ajax({
            url: getDomain() + AccountMasterView.variables.BindGroupListUrl_ShipmentInfo + "&myfilters=" + JSON.stringify(myfilter),
            async: true,
            cache: false,
            type: 'POST',
            beforeSend: function () {
                dx_LoaderTrinity.show();
            },
            complete: function () {
                dx_LoaderTrinity.hide();
            },
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    var JsonObject = xml2json.parser(data);
                    if (JsonObject.serviceresponse.detailslist) {
                        var List = [];
                        List = JsonObject.serviceresponse.detailslist.details;
                        $("#hdn_accountmaster_shipinginfoid").html(List.accountmaster_shipinginfoid);
                        AccountMasterView.variables.dx_txtShipName.option({ value: List.shipname });
                        AccountMasterView.variables.dx_txtShipMobile.option({ value: List.shipmobileno });
                        AccountMasterView.variables.dx_ddlShipCountry.option({ value: List.shipcountry });
                        AccountMasterView.variables.dx_ddlShipState.option({ value: List.shipstate });
                        AccountMasterView.variables.dx_ddlShipCity.option({ value: List.shipcity });
                        AccountMasterView.variables.dx_txtZipCode.option({ value: List.shipzipecode });
                        AccountMasterView.variables.dx_txtShipAddress.option({ value: List.shipaddress });
                        AccountMasterView.variables.dx_txtAddressType.option({ value: List.address_type_id });
                        AccountMasterView.variables.dx_GST_AddressInfo.option({ value: List.gstno });
                        AccountMasterView.variables.dx_PANCARD_AddressInfo.option({ value: List.panno });
                        if (List.tanno != 0) {
                            AccountMasterView.variables.dx_TANNO_AddressInfo.option({ value: List.tanno });
                        }
                        if (List.cinno != 0) {
                            AccountMasterView.variables.dx_CINNO_Addressinfo.option({ value: List.cinno });
                        }

                        AccountMasterView.variables.Oper = 'edit';
                        $("#shipmentEdit").show();
                        $("#Addressfrom").hide();


                    }
                }
                else {
                    DevExVariables.InvalidResponseCode(data);
                }
            },
            error: OnError
        });
    },

    triggerId_ReferenceDetails: function (id, oper) {
        var myfilter = { rules: [] };
        myfilter.rules.push({ field: "REFERENCEID", op: "eq", data: id });

        $.ajax({
            url: getDomain() + AccountMasterView.variables.BindGroupListUrl_ReferenceDetails + "&myfilters=" + JSON.stringify(myfilter),
            async: true,
            cache: false,
            type: 'POST',
            beforeSend: function () {
                dx_LoaderTrinity.show();
            },
            complete: function () {
                dx_LoaderTrinity.hide();
            },
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    var JsonObject = xml2json.parser(data);
                    if (JsonObject.serviceresponse.detailslist) {
                        var List = [];
                        List = JsonObject.serviceresponse.detailslist.details;
                        $("#hdn_accountmaster_ReferenceId").html(List.referenceid);
                        AccountMasterView.variables.dx_rdReference.option({ value: List.reference });
                        AccountMasterView.variables.dx_txtReferenceBy.option({ value: List.referenceby });
                        AccountMasterView.variables.dx_txtReferenceNotes.option({ value: List.notes });
                        AccountMasterView.variables.dx_swAddFavList.option({ value: List.addfavlist });

                        AccountMasterView.variables.Oper = 'edit';
                        $("#ReferenceEdit").show();
                        $("#ReferenceDetailsfrom").hide();
                    }
                }
                else {
                    DevExVariables.InvalidResponseCode(data);
                }
            },
            error: OnError
        });
    },

    triggerId_StaffInfo: function (id, oper) {
        var myfilter = { rules: [] };
        myfilter.rules.push({ field: "ACCOUNTMASTER_STAFFINFOID", op: "eq", data: id });

        $.ajax({
            url: getDomain() + AccountMasterView.variables.BindGroupListUrl_STAFFINFO + "&myfilters=" + JSON.stringify(myfilter),
            async: true,
            cache: false,
            type: 'POST',
            beforeSend: function () {
                dx_LoaderTrinity.show();
            },
            complete: function () {
                dx_LoaderTrinity.hide();
            },
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    var JsonObject = xml2json.parser(data);
                    if (JsonObject.serviceresponse.detailslist) {
                        var List = [];
                        List = JsonObject.serviceresponse.detailslist.details;
                        $("#hdn_accountmaster_staffinfoid").html(List.accountmaster_staffinfoid);
                        AccountMasterView.variables.dx_txtStaffName.option({ value: List.staffname });
                        AccountMasterView.variables.dx_ddlStaffRelation.option({ value: List.staffrelation });
                        AccountMasterView.variables.dx_ddtstaffBirthdate.option({ value: List.birthdate });
                        AccountMasterView.variables.dx_txtAge.option({ value: List.age });
                        AccountMasterView.variables.dx_ddtAnniversaryDate.option({ value: List.anniversarydate });
                        AccountMasterView.variables.dx_txtStaffEmail.option({ value: List.staffemail });
                        AccountMasterView.variables.dx_ddlStaffCountry.option({ value: List.staffcountry });
                        AccountMasterView.variables.dx_ddlStaffState.option({ value: List.staffstate });
                        AccountMasterView.variables.dx_ddlStaffCity.option({ value: List.staffcity });
                        AccountMasterView.variables.dx_txtStaffMobile.option({ value: List.staffmobile });
                        AccountMasterView.variables.Oper = 'edit';
                        $("#staffEdit").show();
                        $("#stafffrom").hide();


                    }
                }
                else {
                    DevExVariables.InvalidResponseCode(data);
                }
            },
            error: OnError
        });
    },

    triggerId: function (id) {
        var rowData = AccountMasterView.variables.dx_dataGrid.getVisibleRows()[AccountMasterView.variables.dx_dataGrid.getRowIndexByKey(+id)].data;
        AccountMasterView.variables.Masterid = id;
        AccountMasterView.variables.dx_txtGroup.option({
            items: [{ accid: rowData.groupcompanyid, accountname: rowData.groupaccountname }],
            selecteditem: { accid: rowData.groupcompanyid, accountname: rowData.groupaccountname },
            value: rowData.groupaccountname
        });

        /*-------------------------Account Info------------------------------*/
        AccountMasterView.variables.dx_txtAccountName.option({ value: rowData.accountname });
        AccountMasterView.variables.dx_txtAccCode.option({ value: rowData.partycode });
        AccountMasterView.variables.dx_txtHead.option({
            items: [{
                headid: rowData.headid,
                headname: rowData.headname,
            }],
            selectedItem: {
                headid: rowData.headid,
                headname: rowData.headname,
            },
            value: rowData.headname,
            readOnly: true
        });
        AccountMasterView.variables.dx_ddlSubHeadName.option({ 
            items: [{
                subheadid: rowData.subheadid,
                subhead: rowData.subhead,
            }],
            selectedItem: {
                subheadid: rowData.subheadid,
                subhead: rowData.subhead,
            },
            value: rowData.subheadid,
        });
        AccountMasterView.variables.dx_txtDepartment.option({
            items: [{
                departmentid: rowData.departmentid,
                department: rowData.department,
            }],
            selectedItem: {
                departmentid: rowData.departmentid,
                department: rowData.department,
            },
            value: rowData.department
        });
        AccountMasterView.variables.dx_txtMobile1.option({ value: rowData.mobile1 });
        AccountMasterView.variables.dx_txtMobile2.option({ value: rowData.mobile2 });
        AccountMasterView.variables.dx_txtEmailId.option({ value: rowData.emailid });
        AccountMasterView.variables.dx_txtFaxNo.option({ value: rowData.faxno });
        AccountMasterView.variables.dx_ddlCountry.option({ value: rowData.countryid });
        AccountMasterView.variables.dx_ddlState.option({ value: rowData.stateid });
        AccountMasterView.variables.dx_ddlCity.option({ value: rowData.cityid });
        AccountMasterView.variables.dx_ddlCurrency.option({ value: rowData.currencyid });
        AccountMasterView.variables.dx_swAllowLogin.option({ value: rowData.isloginallowed });
        AccountMasterView.variables.dx_txtcreditLimit.option({ value: rowData.creditlimit });
        AccountMasterView.variables.dx_txtCreditDays.option({ value: rowData.creditdays });
        AccountMasterView.variables.dx_dtdoj.option({ value: rowData.dateofjoining });
        AccountMasterView.variables.dx_txtTaxPro.option({ value: rowData.taxprofileid });
        AccountMasterView.variables.dx_ddlCurrency.option({ disabled: true });

        if (rowData.imgvirtualname) {
            $("#ItemimgPreview").attr("src", getDesignImgVirtualPath() + "/UploadFiles/PartyFile/" + rowData.imgvirtualname);
            $("#hdnMainImg").val(getDesignImgVirtualPath() + "/UploadFiles/PartyFile/" + rowData.imgvirtualname);
        }

        /*-------------------------/Account Info------------------------------*/

        /*-------------------------Personal Detail------------------------------*/
        AccountMasterView.variables.dx_txtPerson_Name.option({ value: rowData.personname || "" });
        AccountMasterView.variables.dx_txtPerson_No.option({ value: rowData.personemobileno || "" });
        AccountMasterView.variables.dx_rdGender.option({ value: rowData.persongender || "" });
        AccountMasterView.variables.dx_txtPersonAddress.option({ value: rowData.personaddress || "" });
        AccountMasterView.variables.dx_PersonBirthDate.option({ value: rowData.personbirthdate || "" });
        AccountMasterView.variables.dx_PersonAnniversary.option({ value: rowData.personeanniversarydate || "" });
        AccountMasterView.variables.dx_txtPersonRelligion.option({ value: rowData.personrelligin || "" });
        AccountMasterView.variables.dx_txtPerson_profession.option({ value: rowData.personprofession || "" });
        /*-------------------------/Personal Detail------------------------------*/

        /*-------------------------Bank Detail------------------------------*/
        AccountMasterView.variables.dx_txtBankName.option({ value: rowData.bankname || "" });
        AccountMasterView.variables.dx_txtBranchName.option({ value: rowData.branchname || "" });
        AccountMasterView.variables.dx_txtBankAccount.option({ value: rowData.bankaccount || "" });
        AccountMasterView.variables.dx_txtBankAccType.option({ value: rowData.bankacctype || "" });
        AccountMasterView.variables.dx_txtAccNo.option({ value: rowData.accno || "" });
        AccountMasterView.variables.dx_txtIFSC.option({ value: rowData.ifsc || "" });
        /*-------------------------/Bank Detail------------------------------*/

        /*-------------------------Address Info------------------------------*/
        AccountMasterView.initializeDevExgrid_ShipmentInfo(id);
        /*-------------------------/Address Info------------------------------*/

        /*-------------------------Reference Details------------------------------*/
        AccountMasterView.initializeDevExgrid_ReferenceDetails(id);
        /*-------------------------/Reference Details------------------------------*/

        /*-------------------------Documents------------------------------*/
        AccountMasterView.GetFilesDetails(id);
        /*-------------------------/Documents------------------------------*/

        /*-------------------------Staff Info------------------------------*/
        AccountMasterView.initializeDevExgrid_StaffInfo(id);
        /*-------------------------/Staff Info------------------------------*/

        /*-------------------------Other Info------------------------------*/
        AccountMasterView.GetOtherInfoDetails(id);
        /*-------------------------/Other Info------------------------------*/

        /*-------------------------Price Policy------------------------------*/
        $("#hdn_PPM_ID").html(rowData.ppm_id);
        AccountMasterView.variables.dx_txtLabourPrice.option({ value: rowData.lbrpriceid });
        AccountMasterView.variables.dx_txtMaterialPrice.option({ value: rowData.rmpriceid });

        AccountMasterView.variables.dx_ddtPolicyDueDate.option({ value: rowData.policyexpdate });
        AccountMasterView.variables.dx_txtDiscount.option({ value: rowData.discount });
        /*-------------------------/Price Policy------------------------------*/

        /*-------------------------Login Setting------------------------------*/
        AccountMasterView.variables.dx_txtUserName.option({ value: rowData.username });
        AccountMasterView.variables.dx_txtPassword.option({ value: rowData.password });

        if (rowData.empusergroup) {
            AccountMasterView.variables.dx_ddlUserGroup.option({
                value: rowData.empusergroup.toString().split(",").map(element => {
                    return Number(element);
                })
            });
        }

        if (rowData.empallowedlockers) {
            AccountMasterView.variables.dx_ddlLockerAccess.option({
                value: rowData.empallowedlockers.toString().split(",").map(element => {
                    return Number(element);
                })
            });
        }

        if (rowData.empallowedsubbook) {
            AccountMasterView.variables.dx_ddlSubbookAccess.option({
                value: rowData.empallowedsubbook.toString().split(",").map(element => {
                    return Number(element);
                })
            });
        }

        if (rowData.empallowedbranch) {
            AccountMasterView.variables.dx_ddlBranchAccess.option({
                value: rowData.empallowedbranch.toString().split(",").map(element => {
                    return Number(element);
                })
            });
        }

        AccountMasterView.variables.dx_swAllowedVerify.option({ value: rowData.empisallowedverify });
        AccountMasterView.variables.dx_ddlDefDiaColor.option({ value: rowData.defaultdiacolor });
        AccountMasterView.variables.dx_ddlDefDiaClarity.option({ value: rowData.defaultdiaclarity });
        AccountMasterView.variables.dx_numStockMonthFrom.option({ value: rowData.custstockfrommonth });
        AccountMasterView.variables.dx_numStockMonthTo.option({ value: rowData.custstocktomonth });

        if (rowData.custconsideringrosswgt)
            AccountMasterView.variables.dx_ddlConsInGWgt.option({ value: rowData.custconsideringrosswgt.toString().split(",") });

        AccountMasterView.variables.dx_dtAppActiveDate.option({ value: rowData.custappactivetilldate });
        AccountMasterView.variables.dx_dtWebActiveDate.option({ value: rowData.custwebactivetilldate });

        if (rowData.custdesignconcept) {
            AccountMasterView.variables.dx_ddlDesignConcept.option({
                value: rowData.custdesignconcept.toString().split(",").map(element => {
                    return Number(element);
                })
            });
        }

        if (rowData.custpolicy)
            AccountMasterView.variables.dx_ddlPolicy.option({ value: rowData.custpolicy.toString().split(",") });

        /*-------------------------/Login Setting------------------------------*/


        $("#tbl_AccountInfo").css('pointer-events', "");
        $("#tbl_Personal").css('pointer-events', "");
        $("#tbl_AddressInfo").css('pointer-events', "");
        $("#tbl_BankDetails").css('pointer-events', "");
        $("#tbl_ReferenceDetails").css('pointer-events', "");
        $("#tbl_Document_Upload").css('pointer-events', "");
        $("#tbl_StaffInfo").css('pointer-events', "");
        $("#tbl_Other_Info").css('pointer-events', "");
        $("#tbl_Price_Policy").css('pointer-events', "");
        if (rowData.isloginallowed)
            $("#tablink_LoginSetting").show();

        $("#AccountMaster").show();
        $("#pnlView").hide();

        //if (isU()) {
        //    AccountMasterView.variables.dx_btnSubmit.option({ visible: true });
        //}
        //else {
        //    AccountMasterView.variables.dx_btnSubmit.option({ visible: false });
        //}

    },

    deleteRow: function (id) {
        var rowData = AccountMasterView.variables.dx_dataGrid.getVisibleRows()[AccountMasterView.variables.dx_dataGrid.getRowIndexByKey(+id)].data;
        AccountMasterView.variables.Masterid = id;
        AccountMasterView.variables.DeleteDataObj = rowData;
        AccountMasterView.variables.Oper = "Delete";

        if (AccountMasterView.variables.dx_popupRecordDelete) {
            AccountMasterView.variables.dx_popupRecordDelete.option("contentTemplate", AccountMasterView.variables.DeletePopUpOptions.contentTemplate(AccountMasterView.variables.DeleteDataObj).bind(this));
        }
        else {
            AccountMasterView.variables.dx_popupRecordDelete = $("#dx_popupRecordDelete").dxPopup(AccountMasterView.variables.DeletePopUpOptions).dxPopup("instance");
        }

        AccountMasterView.variables.dx_popupRecordDelete.show();
    },

    deleteFile_ShipmentInfo: function (id, name) {

        $("#del_Name_ShipmentInfo").html(name);
        $("#del_id_ShipmentInfo").html(id);
        $("#myModal_Delete_ShipmentInfo").modal("show");
    },

    deleteFile_ReferenceDetails: function (id, name) {
        $("#del_Name_ReferenceDetails").html(name);
        $("#del_id_ReferenceDetails").html(id);
        $("#myModal_Delete_ReferenceDetails").modal("show");
    },

    deleteFile_StaffInfo: function (id, name) {

        $("#del_Name_StaffInfo").html(name);
        $("#del_id_StaffInfo").html(id);
        $("#myModal_Delete_StaffInfo").modal("show");
    },

    btnMasterSubmit_OtherInfo: function () {
        AccountMasterView.variables.Oper = 'Add';
        AccountMasterView.variables.addedit = "added";

        if (+$("#hdn_AccountMaster_OtherInfo_id").html() != "" && +$("#hdn_AccountMaster_OtherInfo_id").html() > 0) {
            AccountMasterView.variables.Oper = 'Edit';
            AccountMasterView.variables.addedit = 'updated';
        }
        AccountMasterView.variables.dx_btnSave_OtherInfo.option({ disabled: true });

        var data = {
            "ACCID": AccountMasterView.variables.Masterid,
            "ACCOUNTMASTER_OTHERINFO_ID": $("#hdn_AccountMaster_OtherInfo_id").html(),
            "HALLMARK": AccountMasterView.variables.dx_SwitchHallMark.option().value,
            "STAMPING": AccountMasterView.variables.dx_SwitchStamping.option().value,
            "DIAMONDDETAIL": AccountMasterView.variables.dx_SwitchDiamond.option().value,
            "TYPE": AccountMasterView.variables.Type,
            "oper": AccountMasterView.variables.Oper,
        }

        if (AccountMasterView.variables.dx_ddlCertification.option().value)
            data.CERTIFICATION = AccountMasterView.variables.dx_ddlCertification.option().value;

        if (AccountMasterView.variables.dx_txtOfficeIns.option().value)
            data.OFFICEINSTRUCTION = AccountMasterView.variables.dx_txtOfficeIns.option().value;

        if (AccountMasterView.variables.dx_txtCustomerIns.option().value)
            data.CUSTOMERINSTRUCTION = AccountMasterView.variables.dx_txtCustomerIns.option().value;

        if (AccountMasterView.variables.dx_txtUser.option().value)
            data.USER = AccountMasterView.variables.dx_txtUser.option().value;

        if (AccountMasterView.variables.dx_txtAdmin.option().value)
            data.ADMIN = AccountMasterView.variables.dx_txtAdmin.option().value;

        if (AccountMasterView.variables.dx_txtInstruction.option().value)
            data.INSTRUCTION = AccountMasterView.variables.dx_txtInstruction.option().value;

        $.ajax({
            url: getDomain() + AccountMasterView.variables.PerformMasterOperationUrl,
            data: data,
            async: true,
            cache: false,
            type: 'POST',
            beforeSend: function () {
                dx_LoaderTrinity.show();
            },
            complete: function () {
                dx_LoaderTrinity.hide();
                AccountMasterView.variables.dx_btnSave_OtherInfo.option({ disabled: false });
            },
            success: function (result) {
                if ($(result).find('RESPONSECODE').text() == "0") {
                    $("#hdn_AccountMaster_OtherInfo_id").html($(result).find('ACCOUNTMASTER_OTHERINFO_ID').text());
                    DevExVariables.Toaster("success", 'Record is ' + AccountMasterView.variables.addedit + ' successfully');

                    AccountMasterView.variables.Type = "Price_Policy";
                    AccountMasterView.variables.Oper = "Edit";
                    $("#tbl_Price_Policy").trigger("click");
                }
                else {
                    DevExVariables.InvalidResponseCode(result);
                }
            },
            error: OnError,
        });
    },

    btnMasterSubmit_PersonalDetails: function () {

        AccountMasterView.variables.dx_btnSubmit_PersonalInfo.option({ disabled: true });

        var data = {
            "ACCID": AccountMasterView.variables.Masterid,
            "TYPE": AccountMasterView.variables.Type,
            "oper": AccountMasterView.variables.Oper,
            "PERSONGENDER": AccountMasterView.variables.dx_rdGender.option().value
        }

        var Date1 = '', AnniversaryDate = '';

        if (AccountMasterView.variables.dx_txtPerson_Name.option().value) {
            data.PERSON_NAME = AccountMasterView.variables.dx_txtPerson_Name.option().value;
        }
        if (AccountMasterView.variables.dx_txtPerson_No.option().value) {
            data.PERSON_MOBILENO = AccountMasterView.variables.dx_txtPerson_No.option().value;
        }
        if (AccountMasterView.variables.dx_txtPersonAddress.option().value) {
            data.PERSON_ADDRESS = AccountMasterView.variables.dx_txtPersonAddress.option().value;
        }
        if (AccountMasterView.variables.dx_PersonBirthDate.option().value) {
            Date1 = AccountMasterView.variables.dx_PersonBirthDate.option().text.split("/");
            Date1 = Date1[2] + '-' + Date1[1] + '-' + Date1[0];
            data.PERSON_BIRTHDATE = Date1;
        }
        if (AccountMasterView.variables.dx_PersonAnniversary.option().value) {
            AnniversaryDate = AccountMasterView.variables.dx_PersonAnniversary.option().text.split("/");
            AnniversaryDate = AnniversaryDate[2] + '-' + AnniversaryDate[1] + '-' + AnniversaryDate[0];
            data.PERSON_ANNIVERSARYDATE = AnniversaryDate;
        }
        if (AccountMasterView.variables.dx_txtPersonRelligion.option().value) {
            data.PERSON_RELLIGION = AccountMasterView.variables.dx_txtPersonRelligion.option().value;
        }
        if (AccountMasterView.variables.dx_txtPerson_profession.option().value) {
            data.PERSON_PROFESSION = AccountMasterView.variables.dx_txtPerson_profession.option().value;
        }

        $.ajax({
            url: getDomain() + AccountMasterView.variables.PerformMasterOperationUrl,
            data: data,
            async: true,
            cache: false,
            type: 'POST',
            beforeSend: function () {
                dx_LoaderTrinity.show();
            },
            complete: function () {
                dx_LoaderTrinity.hide();
            },
            success: function (result) {
                if ($(result).find('RESPONSECODE').text() == "0") {
                    DevExVariables.Toaster("success", 'Record is ' + AccountMasterView.variables.addedit + ' successfully');

                    AccountMasterView.variables.Type = "BankDetails";
                    AccountMasterView.variables.Oper = "Edit";
                    $("#tbl_BankDetails").trigger("click");

                    AccountMasterView.variables.dx_btnSubmit_PersonalInfo.option({ disabled: false });
                }
                else {
                    DevExVariables.InvalidResponseCode(result);
                }

                AccountMasterView.variables.dx_btnSubmit_PersonalInfo.option({ disabled: false });
            },
            error: OnError,
        });
    },

    btnMasterSubmit_AccountInfo: function () {
        AccountMasterView.variables.Oper = 'Add';
        AccountMasterView.variables.addedit = "added";

        if (AccountMasterView.variables.Masterid != "0" && parseInt(AccountMasterView.variables.Masterid) > 0) {
            AccountMasterView.variables.Oper = 'Edit';
            AccountMasterView.variables.addedit = 'updated';
        }

        AccountMasterView.variables.dx_btnSubmit_AccountInfo.option({ disabled: true });

        var bannerImage = $('#ItemimgPreview').attr('src');
        if (bannerImage.indexOf('upimg.png') > -1)
            bannerImage = '';

        var saveFiles = "";
        if (bannerImage && bannerImage != $("#hdnMainImg").val()) {
            saveFiles += bannerImage + ',';
            AccountMasterView.variables.deletedFiles += $("#hdnMainImg").val() + ',';
        }

        var data = {
            "ACCID": AccountMasterView.variables.Masterid,
            //"GROUPCOMPANYID": AccountMasterView.variables.dx_txtGroup.option().selectedItem.accid,
            "DATEOFJOINING": AccountMasterView.variables.dx_dtdoj.option().text,
            "ACCOUNTNAME": AccountMasterView.variables.dx_txtAccountName.option().value,
            "HEADID": AccountMasterView.variables.dx_txtHead.option().selectedItem.headid,
            //"SUBHEADID": AccountMasterView.variables.dx_ddlSubHeadName.option().selectedItem.subheadid,
            "MOBILE1": AccountMasterView.variables.dx_txtMobile1.option().value,
            "MOBILE2": AccountMasterView.variables.dx_txtMobile2.option().value,
            "EMAILID": AccountMasterView.variables.dx_txtEmailId.option().value,
            "TAXPROFILEID": AccountMasterView.variables.dx_txtTaxPro.option().value,
            "FAXNO": AccountMasterView.variables.dx_txtFaxNo.option().value,
            "ISLOGINALLOWED": AccountMasterView.variables.dx_swAllowLogin.option().value,
            "CURRENCYID": AccountMasterView.variables.dx_ddlCurrency.option().value,
            "CITYID": AccountMasterView.variables.dx_ddlCity.option().value,
            "STATEID": AccountMasterView.variables.dx_ddlState.option().value,
            "COUNTRYID": AccountMasterView.variables.dx_ddlCountry.option().value,
            "IMGVIRTUALNAME": bannerImage.substring(bannerImage.lastIndexOf("/") + 1),
            "TYPE": AccountMasterView.variables.Type,
            "oper": AccountMasterView.variables.Oper,
        }

        if (AccountMasterView.variables.dx_txtGroup.option().selectedItem){
            data.GROUPCOMPANYID = AccountMasterView.variables.dx_txtGroup.option().selectedItem.accid;
        }
        if (AccountMasterView.variables.dx_ddlSubHeadName.option().selectedItem){
            data.SUBHEADID = AccountMasterView.variables.dx_ddlSubHeadName.option().selectedItem.subheadid;
        }
        if (AccountMasterView.variables.dx_txtDepartment.option().selectedItem) {
            data.DEPARTMENTID = AccountMasterView.variables.dx_txtDepartment.option().selectedItem.departmentid;
        }
        if (AccountMasterView.variables.dx_txtcreditLimit.option().value) {
            data.CREDITLIMIT = AccountMasterView.variables.dx_txtcreditLimit.option().value;
        }

        if (AccountMasterView.variables.dx_txtCreditDays.option().value) {
            data.CREDITDAYS = AccountMasterView.variables.dx_txtCreditDays.option().value;
        }

        //var Date2 = '';

        //if (AccountMasterView.variables.dx_dtdoj.option().value) {
        //    Date2 = AccountMasterView.variables.dx_dtdoj.option().text.split("/");
        //    Date2 = Date2[2] + '-' + Date2[1] + '-' + Date2[0];
        //    data.DATEOFJOINING = Date2;
        //}

        $.ajax({
            type: 'POST',
            async: false,
            cache: false,
            url: getDomain() + "/Common/SaveImageWithThumb",
            data: {
                ImgPath: getDesignImgPhysicalPath() + "UploadFiles/PartyFile/",
                deletedfiles: AccountMasterView.variables.deletedFiles,
                savefiles: saveFiles,
                width: 200,
                height: 200
            },
            success: function (result) {

            },
            error: OnError
        });
        $.ajax({
            url: getDomain() + AccountMasterView.variables.PerformMasterOperationUrl,
            data: data,
            async: true,
            cache: false,
            type: 'POST',
            beforeSend: function () {
                dx_LoaderTrinity.show();
            },
            complete: function () {
                dx_LoaderTrinity.hide();
                AccountMasterView.variables.dx_btnSubmit_AccountInfo.option({ disabled: false });
            },
            success: function (result) {
                if ($(result).find('RESPONSECODE').text() == "0") {
                    AccountMasterView.variables.Masterid = +$(result).find('ACCOUNTID').text();
                    DevExVariables.Toaster("success", 'Record is ' + AccountMasterView.variables.addedit + ' successfully');

                    $("#tbl_AccountInfo").css('pointer-events', "");
                    $("#tbl_Personal").css('pointer-events', "");
                    $("#tbl_AddressInfo").css('pointer-events', "");
                    $("#tbl_BankDetails").css('pointer-events', "");
                    $("#tbl_ReferenceDetails").css('pointer-events', "");
                    $("#tbl_Document_Upload").css('pointer-events', "");
                    $("#tbl_StaffInfo").css('pointer-events', "");
                    $("#tbl_Other_Info").css('pointer-events', "");
                    $("#tbl_Price_Policy").css('pointer-events', "");
                    if (AccountMasterView.variables.dx_swAllowLogin.option().value == true)
                        $("#tablink_LoginSetting").show();
                    else
                        $("#tablink_LoginSetting").hide();

                    AccountMasterView.variables.Type = "PersonalDetails";
                    AccountMasterView.variables.Oper = "Edit";
                    $("#tbl_Personal").trigger("click");

                }
                else {
                    DevExVariables.InvalidResponseCode(result);
                }

            },
            error: OnError,
        });
    },

    btnMasterSubmit_staffinfo: function () {
        AccountMasterView.variables.dx_btnStaffSave_staffinfo.option({ disabled: true });

        var data = {
            "ACCID": AccountMasterView.variables.Masterid,
            "STAFFNAME": AccountMasterView.variables.dx_txtStaffName.option().value,
            "STAFFRELATION": AccountMasterView.variables.dx_ddlStaffRelation.option().value,
            "AGE": AccountMasterView.variables.dx_txtAge.option().value,
            "STAFFEMAIL": AccountMasterView.variables.dx_txtStaffEmail.option().value,
            "STAFFCOUNTRY": AccountMasterView.variables.dx_ddlStaffCountry.option().value,
            "STAFFSTATE": AccountMasterView.variables.dx_ddlStaffState.option().value,
            "STAFFCITY": AccountMasterView.variables.dx_ddlStaffCity.option().value,
            "STAFFMOBILE": AccountMasterView.variables.dx_txtStaffMobile.option().value,
            "TYPE": AccountMasterView.variables.Type,
            "oper": AccountMasterView.variables.Oper,
        }

        if ($("#hdn_accountmaster_staffinfoid").html())
            data.ACCOUNTMASTER_STAFFINFOID = $("#hdn_accountmaster_staffinfoid").html();

        var Date = '', AnniversaryDate = '';
        if (AccountMasterView.variables.dx_ddtstaffBirthdate.option().value) {
            Date = AccountMasterView.variables.dx_ddtstaffBirthdate.option().text.split("/");
            Date = Date[2] + '-' + Date[1] + '-' + Date[0];
            data.BIRTHDATE = Date;
        }

        if (AccountMasterView.variables.dx_ddtAnniversaryDate.option().value) {
            AnniversaryDate = AccountMasterView.variables.dx_ddtAnniversaryDate.option().text.split("/");
            AnniversaryDate = AnniversaryDate[2] + '-' + AnniversaryDate[1] + '-' + AnniversaryDate[0];
            data.ANNIVERSARYDATE = AnniversaryDate;
        }

        $.ajax({
            url: getDomain() + AccountMasterView.variables.PerformMasterOperationUrl,
            data: data,
            async: true,
            cache: false,
            type: 'POST',
            beforeSend: function () {
                dx_LoaderTrinity.show();
            },
            complete: function () {
                dx_LoaderTrinity.hide();
            },
            success: function (result) {
                if ($(result).find('RESPONSECODE').text() == "0") {
                    DevExVariables.Toaster("success", 'Record is ' + AccountMasterView.variables.addedit + ' successfully');

                    $("#staffEdit").hide();
                    $("#stafffrom").show();

                    AccountMasterView.initializeDevExgrid_StaffInfo(AccountMasterView.variables.Masterid);


                }
                else {
                    DevExVariables.InvalidResponseCode(result);
                }

                AccountMasterView.variables.dx_btnStaffSave_staffinfo.option({ disabled: false });
            },
            error: OnError,
        });
    },

    btnMasterSubmit_Document_Upload: function () {
        var saveFiles = "";
        var result = AccountMasterView.makeMultiImgXmlNodes();

        var DetailsNodeList = result.xmlsaveFiles;
        saveFiles += result.saveFiles;

        var data = {
            "ACCID": AccountMasterView.variables.Masterid,
            XMLPARAM: escape(DetailsNodeList),
            "TYPE": AccountMasterView.variables.Type,
            "oper": AccountMasterView.variables.Oper,
        }

        $.ajax({
            type: 'POST',
            async: false,
            cache: false,
            url: getDomain() + "/Common/SaveImage",
            data: {
                category: 'AccountMaster',
                deletedfiles: AccountMasterView.variables.deletedFiles,
                savefiles: saveFiles
            },
            success: function (result) {
                $.ajax({
                    url: getDomain() + AccountMasterView.variables.PerformMasterOperationUrl,
                    data: data,
                    async: true,
                    cache: false,
                    type: 'POST',
                    beforeSend: function () {
                        dx_LoaderTrinity.show();
                    },
                    complete: function () {
                        dx_LoaderTrinity.hide();
                    },
                    success: function (result) {
                        if ($(result).find('RESPONSECODE').text() == "0") {

                            DevExVariables.Toaster("success", 'Record is ' + AccountMasterView.variables.addedit + ' successfully');

                            AccountMasterView.variables.Type = "StaffInfo";
                            AccountMasterView.variables.Oper = "Edit";
                            $("#tbl_StaffInfo").trigger("click");


                        }
                        else {
                            DevExVariables.InvalidResponseCode(result);
                        }

                        AccountMasterView.variables.dx_btnSubmit_AccountInfo.option({ disabled: false });
                    },
                    error: OnError,
                });
            },
            error: OnError
        });


    },

    btnMasterSubmit_PricePolicy: function () {

        AccountMasterView.variables.Oper = 'Add';
        AccountMasterView.variables.addedit = "added";

        if ($("#hdn_PPM_ID").html() != "0" && $("#hdn_PPM_ID").html() != "" && +$("#hdn_PPM_ID").html() > 0) {
            AccountMasterView.variables.Oper = 'Edit';
            AccountMasterView.variables.addedit = 'updated';
        }

        AccountMasterView.variables.dx_btnSave_Price.option({ disabled: true });

        var Date1 = '', AnniversaryDate = '';

        var data = {
            "PPM_ID": $("#hdn_PPM_ID").html(),
            "ACCID": AccountMasterView.variables.Masterid,
            "TYPE": AccountMasterView.variables.Type,
            "oper": AccountMasterView.variables.Oper,
        }

        if (AccountMasterView.variables.dx_txtMaterialPrice.option().value)
            data.DIAMONDPRICE = AccountMasterView.variables.dx_txtMaterialPrice.option().value;

        if (AccountMasterView.variables.dx_txtLabourPrice.option().value)
            data.LABOURPRICE = AccountMasterView.variables.dx_txtLabourPrice.option().value;

        if (AccountMasterView.variables.dx_ddlSettingPrice.option().value)
            data.SETPRICEID = AccountMasterView.variables.dx_ddlSettingPrice.option().value;

        if (AccountMasterView.variables.dx_ddtPolicyDueDate.option().value) {
            Date1 = AccountMasterView.variables.dx_ddtPolicyDueDate.option().text.split("/");
            Date1 = Date1[2] + '-' + Date1[1] + '-' + Date1[0];
            data.POLICYDUEDATE = Date1;
        }

        if (AccountMasterView.variables.dx_txtDiscount.option().value)
            data.DISCOUNT = AccountMasterView.variables.dx_txtDiscount.option().value;


        $.ajax({
            url: getDomain() + AccountMasterView.variables.PerformMasterOperationUrl,
            data: data,
            async: true,
            cache: false,
            type: 'POST',
            beforeSend: function () {
                dx_LoaderTrinity.show();
            },
            complete: function () {
                dx_LoaderTrinity.hide();
                AccountMasterView.variables.dx_btnSave_Price.option({ disabled: false });
            },
            success: function (result) {
                if ($(result).find('RESPONSECODE').text() == "0") {
                    DevExVariables.Toaster("success", 'Record is ' + AccountMasterView.variables.addedit + ' successfully');

                    if (AccountMasterView.variables.dx_swAllowLogin.option().value == true) {
                        AccountMasterView.variables.Type = "Login_Setting";
                        AccountMasterView.variables.Oper = "Edit";
                        $("#tbl_LoginSetting").trigger("click");
                    }
                    else
                        AccountMasterView.clearControls();

                }
                else {
                    DevExVariables.InvalidResponseCode(result);
                }
            },
            error: OnError,
        });
    },

    btnMasterSubmit_LoginSetting: function () {

        AccountMasterView.variables.dx_btnSave_LoginSetting.option({ disabled: true });

        var data = {
            "ACCID": AccountMasterView.variables.Masterid,
            "TYPE": AccountMasterView.variables.Type,
            "oper": AccountMasterView.variables.Oper,
            "EMPISALLOWEDVERIFY": AccountMasterView.variables.dx_swAllowedVerify.option().value
        }

        if (AccountMasterView.variables.dx_txtUserName.option().value)
            data.USERNAME = AccountMasterView.variables.dx_txtUserName.option().value;

        if (AccountMasterView.variables.dx_txtPassword.option().value)
            data.PASSWORD = AccountMasterView.variables.dx_txtPassword.option().value;

        if (AccountMasterView.variables.dx_ddlUserGroup.option().selectedItems.length > 0)
            data.EMPUSERGROUP = AccountMasterView.variables.dx_ddlUserGroup.option().value.toString();

        if (AccountMasterView.variables.dx_ddlLockerAccess.option().selectedItems.length > 0)
            data.EMPALLOWEDLOCKERS = AccountMasterView.variables.dx_ddlLockerAccess.option().value.toString();

        if (AccountMasterView.variables.dx_ddlSubbookAccess.option().selectedItems.length > 0)
            data.EMPALLOWEDSUBBOOK = AccountMasterView.variables.dx_ddlSubbookAccess.option().value.toString();

        if (AccountMasterView.variables.dx_ddlBranchAccess.option().selectedItems.length > 0)
            data.EMPALLOWEDBRANCH = AccountMasterView.variables.dx_ddlBranchAccess.option().value.toString();

        if (AccountMasterView.variables.dx_ddlDefDiaColor.option().value)
            data.DEFAULTDIACOLOR = AccountMasterView.variables.dx_ddlDefDiaColor.option().value;

        if (AccountMasterView.variables.dx_ddlDefDiaClarity.option().value)
            data.DEFAULTDIACLARITY = AccountMasterView.variables.dx_ddlDefDiaClarity.option().value;

        if (AccountMasterView.variables.dx_numStockMonthFrom.option().value)
            data.CUSTSTOCKFROMMONTH = AccountMasterView.variables.dx_numStockMonthFrom.option().value;

        if (AccountMasterView.variables.dx_numStockMonthTo.option().value)
            data.CUSTSTOCKTOMONTH = AccountMasterView.variables.dx_numStockMonthTo.option().value;

        if (AccountMasterView.variables.dx_ddlConsInGWgt.option().selectedItems.length > 0)
            data.CUSTCONSIDERINGROSSWGT = AccountMasterView.variables.dx_ddlConsInGWgt.option().value.toString();

        if (AccountMasterView.variables.dx_dtAppActiveDate.option().text)
            data.CUSTAPPACTIVETILLDATE = AccountMasterView.variables.dx_dtAppActiveDate.option().text;

        if (AccountMasterView.variables.dx_dtWebActiveDate.option().text)
            data.CUSTWEBACTIVETILLDATE = AccountMasterView.variables.dx_dtWebActiveDate.option().text;

        if (AccountMasterView.variables.dx_ddlDesignConcept.option().selectedItems.length > 0)
            data.CUSTDESIGNCONCEPT = AccountMasterView.variables.dx_ddlDesignConcept.option().value.toString();

        if (AccountMasterView.variables.dx_ddlPolicy.option().selectedItems.length > 0)
            data.CUSTPOLICY = AccountMasterView.variables.dx_ddlPolicy.option().value.toString();

        $.ajax({
            url: getDomain() + AccountMasterView.variables.PerformMasterOperationUrl,
            data: data,
            async: true,
            cache: false,
            type: 'POST',
            beforeSend: function () {
                dx_LoaderTrinity.show();
            },
            complete: function () {
                dx_LoaderTrinity.hide();
                AccountMasterView.variables.dx_btnSave_LoginSetting.option({ disabled: false });
            },
            success: function (result) {
                if ($(result).find('RESPONSECODE').text() == "0") {
                    DevExVariables.Toaster("success", 'Record is ' + AccountMasterView.variables.addedit + ' successfully');

                    AccountMasterView.clearControls();

                }
                else {
                    DevExVariables.InvalidResponseCode(result);
                }
            },
            error: OnError,
        });
    },

    btnMasterSubmit_BankDetails: function () {
        AccountMasterView.variables.Oper = 'Add';
        AccountMasterView.variables.addedit = "added";

        if (AccountMasterView.variables.Masterid != "0" && parseInt(AccountMasterView.variables.Masterid) > 0) {
            AccountMasterView.variables.Oper = 'Edit';
            AccountMasterView.variables.addedit = 'updated';
        }

        AccountMasterView.variables.dx_btnSubmit_BankDeatils.option({ disabled: true });


        var data = {
            "ACCID": AccountMasterView.variables.Masterid,
            "TYPE": AccountMasterView.variables.Type,
            "oper": AccountMasterView.variables.Oper,
        }

        if (AccountMasterView.variables.dx_txtBankName.option().value)
            data.BANKNAME = AccountMasterView.variables.dx_txtBankName.option().value;

        if (AccountMasterView.variables.dx_txtBranchName.option().value)
            data.BRANCHNAME = AccountMasterView.variables.dx_txtBranchName.option().value;

        if (AccountMasterView.variables.dx_txtBankAccount.option().value)
            data.BANKACCOUNT = AccountMasterView.variables.dx_txtBankAccount.option().value;

        if (AccountMasterView.variables.dx_txtBankAccType.option().value)
            data.BANKACCTYPE = AccountMasterView.variables.dx_txtBankAccType.option().value;

        if (AccountMasterView.variables.dx_txtAccNo.option().value)
            data.ACCNO = AccountMasterView.variables.dx_txtAccNo.option().value;

        if (AccountMasterView.variables.dx_txtIFSC.option().value)
            data.IFSC = AccountMasterView.variables.dx_txtIFSC.option().value;

        $.ajax({
            url: getDomain() + AccountMasterView.variables.PerformMasterOperationUrl,
            data: data,
            async: true,
            cache: false,
            type: 'POST',
            beforeSend: function () {
                dx_LoaderTrinity.show();
            },
            complete: function () {
                dx_LoaderTrinity.hide();
                AccountMasterView.variables.dx_btnSubmit_BankDeatils.option({ disabled: false });
            },
            success: function (result) {
                if ($(result).find('RESPONSECODE').text() == "0") {
                    DevExVariables.Toaster("success", 'Record is ' + AccountMasterView.variables.addedit + ' successfully');

                    AccountMasterView.variables.Type = "ShipmentInfo";
                    AccountMasterView.variables.Oper = "Edit";
                    $("#tbl_AddressInfo").trigger("click");
                }
                else {
                    DevExVariables.InvalidResponseCode(result);
                }
            },
            error: OnError,
        });
    },

    btnMasterSubmit_ShipmentInfo: function () {

        AccountMasterView.variables.dx_btnSave_ShipmentInfo.option({ disabled: true });

        var data = {
            "ACCOUNTMASTER_SHIPINGINFOID": $("#hdn_accountmaster_shipinginfoid").html(),
            "ACCID": AccountMasterView.variables.Masterid,
            "SHIPNAME": AccountMasterView.variables.dx_txtShipName.option().value,
            "SHIPMOBILENO": AccountMasterView.variables.dx_txtShipMobile.option().value,
            "SHIPCOUNTRY": AccountMasterView.variables.dx_ddlShipCountry.option().value,
            "SHIPSTATE": AccountMasterView.variables.dx_ddlShipState.option().value,
            "SHIPCITY": AccountMasterView.variables.dx_ddlShipCity.option().value,
            "SHIPZIPECODE": AccountMasterView.variables.dx_txtZipCode.option().value,
            "SHIPADDRESS": AccountMasterView.variables.dx_txtShipAddress.option().value,
            "SHIPADDRESSTYPE": AccountMasterView.variables.dx_txtAddressType.option().value,
            "TYPE": AccountMasterView.variables.Type,
            "oper": AccountMasterView.variables.Oper,
        }

        if (AccountMasterView.variables.dx_GST_AddressInfo.option().value) {
            data.GST_ADDRESS = AccountMasterView.variables.dx_GST_AddressInfo.option().value
        }
        if (AccountMasterView.variables.dx_PANCARD_AddressInfo.option().value) {
            data.PAN_ADDRESS = AccountMasterView.variables.dx_PANCARD_AddressInfo.option().value
        }
        if (AccountMasterView.variables.dx_TANNO_AddressInfo.option().value) {
            data.TAN_ADDRESS = AccountMasterView.variables.dx_TANNO_AddressInfo.option().value
        }
        if (AccountMasterView.variables.dx_CINNO_Addressinfo.option().value) {
            data.CIN_ADDRESS = AccountMasterView.variables.dx_CINNO_Addressinfo.option().value
        }
        $.ajax({
            url: getDomain() + AccountMasterView.variables.PerformMasterOperationUrl,
            data: data,
            async: true,
            cache: false,
            type: 'POST',
            beforeSend: function () {
                dx_LoaderTrinity.show();
            },
            complete: function () {
                dx_LoaderTrinity.hide();
                AccountMasterView.variables.dx_btnSave_ShipmentInfo.option({ disabled: false });
            },
            success: function (result) {
                if ($(result).find('RESPONSECODE').text() == "0") {
                    DevExVariables.Toaster("success", 'Record is ' + AccountMasterView.variables.addedit + ' successfully');

                    $("#shipmentEdit").hide();
                    $("#Addressfrom").show();

                    AccountMasterView.initializeDevExgrid_ShipmentInfo(AccountMasterView.variables.Masterid);
                }
                else {
                    DevExVariables.InvalidResponseCode(result);
                }
            },
            error: OnError,
        });
    },

    btnMasterSubmit_ReferenceDetails: function () {

        AccountMasterView.variables.dx_btnSave_ReferenceDetails.option({ disabled: true });

        var data = {
            "ACCOUNTMASTER_REFERENCEID": $("#hdn_accountmaster_ReferenceId").html(),
            "ACCID": AccountMasterView.variables.Masterid,
            "REFERENCE": AccountMasterView.variables.dx_rdReference.option().value,
            "REFERENCEBY": AccountMasterView.variables.dx_txtReferenceBy.option().value,
            //"NOTES": AccountMasterView.variables.dx_txtReferenceNotes.option().value,
            "ADDFAVLIST": AccountMasterView.variables.dx_swAddFavList.option().value,
            "TYPE": AccountMasterView.variables.Type,
            "oper": AccountMasterView.variables.Oper,
        }

        if (AccountMasterView.variables.dx_txtReferenceNotes.option().value) {
            data.NOTES = AccountMasterView.variables.dx_txtReferenceNotes.option().value
        }
        
        $.ajax({
            url: getDomain() + AccountMasterView.variables.PerformMasterOperationUrl,
            data: data,
            async: true,
            cache: false,
            type: 'POST',
            beforeSend: function () {
                dx_LoaderTrinity.show();
            },
            complete: function () {
                dx_LoaderTrinity.hide();
                AccountMasterView.variables.dx_btnSave_ReferenceDetails.option({ disabled: false });
            },
            success: function (result) {
                if ($(result).find('RESPONSECODE').text() == "0") {
                    DevExVariables.Toaster("success", 'Record is ' + AccountMasterView.variables.addedit + ' successfully');

                    $("#ReferenceEdit").hide();
                    $("#ReferenceDetailsfrom").show();

                    AccountMasterView.initializeDevExgrid_ReferenceDetails(AccountMasterView.variables.Masterid);
                }
                else {
                    DevExVariables.InvalidResponseCode(result);
                }
            },
            error: OnError,
        });
    },

    btnMasterDelete: function () {
        $('#btnDelete').attr('disabled', true);
        var data = {
            "oper": AccountMasterView.variables.Oper,
            "GROUPID": $("#hdngroup").val()
        }
        AccountMasterView.savedata(data);
    },

    clearControls: function () {
        /*------------------Clear Account Info Tab----------------*/
        DevExpress.validationEngine.resetGroup("AccountInfo");
        AccountMasterView.variables.dx_txtHead.option({ readOnly: false });
        //AccountMasterView.variables.dx_ddlSubHeadName.option({ readOnly: false });
        AccountMasterView.variables.dx_ddlCurrency.option({ disabled: false });
        AccountMasterView.variables.dx_dtdoj.option({ value: new Date() });

        $("#ItemimgPreview").attr("src", getDomain() + "/Content/images/upimg.png");
        $("#hdnMainImg").val("");
        /*------------------/Clear Account Info Tab----------------*/

        /*------------------Clear Personal Detail Tab----------------*/
        DevExpress.validationEngine.resetGroup("PersonalDetail");
        /*------------------/Clear Personal Detail Tab----------------*/

        /*------------------Clear Bank Detail Tab----------------*/
        DevExpress.validationEngine.resetGroup("BankDetail");
        /*------------------/Clear Bank Detail Tab----------------*/

        /*------------------Clear Address Info Tab----------------*/
        DevExpress.validationEngine.resetGroup("AddressInfo");
        $("#hdn_accountmaster_shipinginfoid").html("");
        $("#shipmentEdit").hide();
        $("#Addressfrom").show();
        /*------------------/Clear Address Info Tab----------------*/

        /*------------------Clear Reference Details Tab----------------*/
        DevExpress.validationEngine.resetGroup("ReferenceDetail");
        AccountMasterView.variables.dx_rdReference.option({ value: "Good" });
        $("#hdn_accountmaster_ReferenceId").html("");
        $("#ReferenceEdit").hide();
        $("#ReferenceDetailsfrom").show();
        /*------------------/Clear Reference Details Tab----------------*/

        /*------------------Clear Staff Info Tab----------------*/
        DevExpress.validationEngine.resetGroup("StaffDetail");
        /*------------------/Clear Staff Info Tab----------------*/

        /*------------------Clear Other Info Tab----------------*/
        DevExpress.validationEngine.resetGroup("OtherInfo");
        $("#hdn_AccountMaster_OtherInfo_id").html("");
        /*------------------/Clear Other Info Tab----------------*/

        /*------------------Clear Price Policy Tab----------------*/
        DevExpress.validationEngine.resetGroup("PricePolicy");
        $("#hdn_PPM_ID").html("");
        /*------------------/Clear Price Policy Tab----------------*/

        /*------------------Clear Login Setting Tab----------------*/
        DevExpress.validationEngine.resetGroup("LoginSetting");
        /*------------------/Clear Login Setting Tab----------------*/

        AccountMasterView.variables.Type = 'AccountInfo',
        AccountMasterView.variables.Oper = 'Add';
        AccountMasterView.variables.addedit = "added";
        AccountMasterView.variables.Masterid = "";
        AccountMasterView.variables.DetailsControlsList = [];
        AccountMasterView.variables.MultiImgControlsList = [];
        AccountMasterView.variables.DeleteDataObj = "";

        $("#tbl_AccountInfo").trigger("click");
        $("#tbl_AccountInfo").css('pointer-events', "");
        $("#tbl_Personal").css('pointer-events', "none");
        $("#tbl_BankDetails").css('pointer-events', "none");
        $("#tbl_AddressInfo").css('pointer-events', "none");
        $("#tbl_ReferenceDetails").css('pointer-events', "none");
        $("#tbl_Document_Upload").css('pointer-events', "none");
        $("#tbl_StaffInfo").css('pointer-events', "none");
        $("#tbl_Other_Info").css('pointer-events', "none");
        $("#tbl_Price_Policy").css('pointer-events', "none");
        $("#tablink_LoginSetting").hide();

        if (AccountMasterView.variables.dx_popupRecordDelete)
            AccountMasterView.variables.dx_popupRecordDelete.hide();

        $('#AccountMaster').hide();
        $('#pnlView').show();
        AccountMasterView.variables.dx_dataGrid.refresh();
    },

    BindAddressType: function () {
        $.ajax({
            url: getDomain() + "/Common/BindMastersDetails?ServiceName=STATIC_ADDRESS_TYPE_GET&ColumnRequested=COUNTRY&ISRECORDALL=true&sidx=COUNTRYNAME&sord=asc",
            async: true,
            cache: false,
            type: 'POST',
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    var JsonObject = xml2json.parser(data);
                    if (JsonObject.serviceresponse.detailslist) {
                        AccountMasterView.variables.dx_txtAddressType.option({
                            dataSource: new DevExpress.data.ArrayStore({
                                data: JsonObject.serviceresponse.detailslist.details,
                                key: "static_address_type_id"
                            }),
                            displayExpr: "address_type",
                            valueExpr: "static_address_type_id",
                        });
                    }
                }
                else {
                    DevExVariables.InvalidResponseCode(data);
                }
            },
            error: OnError
        });
    },

    GetCountryList: function () {
        $.ajax({
            url: getDomain() + "/Common/BindMastersDetails?ServiceName=MASTER_COUNTRY_STATE_CITY_GET&ColumnRequested=COUNTRY&ISRECORDALL=true&sidx=COUNTRYNAME&sord=asc",
            async: true,
            cache: false,
            type: 'POST',
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    var JsonObject = xml2json.parser(data);
                    if (JsonObject.serviceresponse.detailslist) {
                        var List = [];
                        if (JsonObject.serviceresponse.detailslist.details.length > 0)
                            List = JsonObject.serviceresponse.detailslist.details;
                        else
                            List.push(JsonObject.serviceresponse.detailslist.details);

                        AccountMasterView.variables.dx_ddlCountry.option({
                            dataSource: new DevExpress.data.ArrayStore({
                                data: List,
                                key: "countryid"
                            }),
                            displayExpr: "countryname",
                            valueExpr: "countryid",
                        });

                        AccountMasterView.variables.dx_ddlShipCountry.option({
                            dataSource: new DevExpress.data.ArrayStore({
                                data: List,
                                key: "countryid"
                            }),
                            displayExpr: "countryname",
                            valueExpr: "countryid",
                        });

                        AccountMasterView.variables.dx_ddlStaffCountry.option({
                            dataSource: new DevExpress.data.ArrayStore({
                                data: List,
                                key: "countryid"
                            }),
                            displayExpr: "countryname",
                            valueExpr: "countryid",
                        });
                    }
                }
                else {
                    DevExVariables.InvalidResponseCode(data);
                }
            },
            error: OnError
        });
    },

    GetStatesList: function (countryid) {
        $.ajax({
            url: getDomain() + "/Common/BindMastersDetails?ServiceName=MASTER_COUNTRY_STATE_CITY_GET&ColumnRequested=STATE&ISRECORDALL=true&sidx=STATENAME&sord=asc&_search=true&searchField=COUNTRYID&searchOper=eq&searchString=" + countryid,
            async: false,
            cache: false,
            type: 'POST',
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    var JsonObject = xml2json.parser(data);
                    var List = [];
                    AccountMasterView.variables.dx_ddlState.option({ value: "" });
                    if (JsonObject.serviceresponse.detailslist) {
                        if (JsonObject.serviceresponse.detailslist.details.length > 0)
                            List = JsonObject.serviceresponse.detailslist.details;
                        else
                            List.push(JsonObject.serviceresponse.detailslist.details);
                    }

                    AccountMasterView.variables.dx_ddlState.option({
                        dataSource: new DevExpress.data.ArrayStore({
                            data: List,
                            key: "stateid"
                        }),
                        displayExpr: "statename",
                        valueExpr: "stateid",
                    });
                }
                else {
                    DevExVariables.InvalidResponseCode(data);
                }
            },
            error: OnError
        });
    },

    GetCityList: function (stateid) {
        $.ajax({
            url: getDomain() + "/Common/BindMastersDetails?ServiceName=MASTER_COUNTRY_STATE_CITY_GET&ColumnRequested=CITY&ISRECORDALL=true&sidx=CITYNAME&sord=asc&_search=true&searchField=STATEID&searchOper=eq&searchString=" + stateid,
            async: false ,
            cache: false,
            type: 'POST',
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    var JsonObject = xml2json.parser(data);
                    var List = [];
                    AccountMasterView.variables.dx_ddlCity.option({ value: "" });
                    if (JsonObject.serviceresponse.detailslist) {
                        if (JsonObject.serviceresponse.detailslist.details.length > 0)
                            List = JsonObject.serviceresponse.detailslist.details;
                        else
                            List.push(JsonObject.serviceresponse.detailslist.details);
                    }
                    AccountMasterView.variables.dx_ddlCity.option({
                        dataSource: new DevExpress.data.ArrayStore({
                            data: List,
                            key: "cityid"
                        }),
                        displayExpr: "cityname",
                        valueExpr: "cityid",
                    });
                }
                else {
                    DevExVariables.InvalidResponseCode(data);
                }
            },
            error: OnError
        });
    },

    GetCurrencyList: function () {
        $.ajax({
            url: getDomain() + "/Common/BindMastersDetails?ServiceName=MASTER_COUNTRY_STATE_CITY_GET&ColumnRequested=CURRENCY&ISRECORDALL=true&sidx=CURRENCYID&sord=asc",
            async: true,
            cache: false,
            type: 'POST',
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    var JsonObject = xml2json.parser(data);
                    if (JsonObject.serviceresponse.detailslist) {
                        var List = [];
                        if (JsonObject.serviceresponse.detailslist.details.length > 0)
                            List = JsonObject.serviceresponse.detailslist.details;
                        else
                            List.push(JsonObject.serviceresponse.detailslist.details);

                        AccountMasterView.variables.dx_ddlCurrency.option({
                            dataSource: new DevExpress.data.ArrayStore({
                                data: List,
                                key: "currencyid"
                            }),
                            displayExpr: "currencycode",
                            valueExpr: "currencyid",
                            value: List.filter(function (x) { return x.currencycode.toLowerCase() == "inr" })[0].currencyid
                        });
                    }
                }
                else {
                    DevExVariables.InvalidResponseCode(data);
                }
            },
            error: OnError
        });
    },

    makeMultiImgXmlNodes: function () {
        var xmlsaveFiles = '<FILELIST>', saveFiles = '', strHref = [];

        $("#FilePreviewList tr").each(function (key, obj) {
            strHref.push($(obj).find('.label-click').attr('href'));
            xmlsaveFiles += '<FILE>';
            xmlsaveFiles += '<ACTUALNAME><![CDATA[' + $(obj).find('.label-click').html() + ']]></ACTUALNAME>';
            var temp_chkdata = '0'
            if ($(obj).find(".chk_isVerified").prop("checked")) {
                temp_chkdata = '1'
            }
            else {
                temp_chkdata = '0'
            }
            xmlsaveFiles += '<CHKVERIFIED><![CDATA[' + +temp_chkdata + ']]></CHKVERIFIED>';
            xmlsaveFiles += '<VIRTUALNAME><![CDATA[' + $(obj).find('.label-click').attr('href').substr($(obj).find('.label-click').attr('href').lastIndexOf('/') + 1) + ']]></VIRTUALNAME>';
            if ($(obj).find('.Description').val())
                xmlsaveFiles += '<DESCRIPTION><![CDATA[' + $(obj).find('.Description').val() + ']]></DESCRIPTION>';
            xmlsaveFiles += '</FILE>';
        });

        xmlsaveFiles += '</FILELIST>';
        saveFiles = strHref.join(",");

        return { xmlsaveFiles: xmlsaveFiles, saveFiles: saveFiles };
    },

    GetFilesDetails: function (AccId) {
        var myfilter = { rules: [] };
        myfilter.rules.push({ field: "ACCID", op: "eq", data: AccId });

        $.ajax({
            url: getDomain() + AccountMasterView.variables.BindFileListUrl + "&myfilters=" + JSON.stringify(myfilter),
            async: true,
            cache: false,
            type: 'POST',
            beforeSend: function () {
                dx_LoaderTrinity.show();
            },
            complete: function () {
                dx_LoaderTrinity.hide();
            },
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    var JsonObject = xml2json.parser(data);
                    if (JsonObject.serviceresponse.detailslist) {
                        $("#FilePreviewList").html($("#RenderFileList").render(JsonObject.serviceresponse.detailslist.details));
                    }
                }
                else {
                    DevExVariables.InvalidResponseCode(data);
                }
            },
            error: OnError
        });
    },

    GetOtherInfoDetails: function (AccId) {
        var myfilter = { rules: [] };
        myfilter.rules.push({ field: "ACCID", op: "eq", data: AccId });

        $.ajax({
            url: getDomain() + AccountMasterView.variables.BindOtherInfo + "&myfilters=" + JSON.stringify(myfilter),
            async: true,
            cache: false,
            type: 'POST',
            beforeSend: function () {
                dx_LoaderTrinity.show();
            },
            complete: function () {
                dx_LoaderTrinity.hide();
            },
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    var JsonObject = xml2json.parser(data);
                    if (JsonObject.serviceresponse.detailslist) {
                        $("#hdn_AccountMaster_OtherInfo_id").html(JsonObject.serviceresponse.detailslist.details.accountmaster_otherinfo_id);
                        AccountMasterView.variables.dx_SwitchHallMark.option({ value: JsonObject.serviceresponse.detailslist.details.hallmark });
                        AccountMasterView.variables.dx_SwitchStamping.option({ value: JsonObject.serviceresponse.detailslist.details.stamping });
                        AccountMasterView.variables.dx_SwitchDiamond.option({ value: JsonObject.serviceresponse.detailslist.details.diamonddetail });
                        AccountMasterView.variables.dx_ddlCertification.option({ value: JsonObject.serviceresponse.detailslist.details.certification });
                        AccountMasterView.variables.dx_txtOfficeIns.option({ value: JsonObject.serviceresponse.detailslist.details.officeinstruction });
                        AccountMasterView.variables.dx_txtCustomerIns.option({ value: JsonObject.serviceresponse.detailslist.details.customerinstruction });
                        AccountMasterView.variables.dx_txtUser.option({ value: JsonObject.serviceresponse.detailslist.details.other_user });
                        AccountMasterView.variables.dx_txtAdmin.option({ value: JsonObject.serviceresponse.detailslist.details.other_admin });
                        AccountMasterView.variables.dx_txtInstruction.option({ value: JsonObject.serviceresponse.detailslist.details.instruction });

                    }
                }
                else {
                    DevExVariables.InvalidResponseCode(data);
                }
            },
            error: OnError
        });
    },

    deleteFile: function (rid, file) {
        AccountMasterView.variables.deletedFiles += file + ',';
        $('#' + rid).remove();
    },

    GetStatesList_ShipmentInfo: function (countryid) {
        $.ajax({
            url: getDomain() + "/Common/BindMastersDetails?ServiceName=MASTER_COUNTRY_STATE_CITY_GET&ColumnRequested=STATE&ISRECORDALL=true&sidx=STATENAME&sord=asc&_search=true&searchField=COUNTRYID&searchOper=eq&searchString=" + countryid,
            async: true,
            cache: false,
            type: 'POST',
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    var JsonObject = xml2json.parser(data);
                    if (JsonObject.serviceresponse.detailslist) {
                        var List = [];
                        if (JsonObject.serviceresponse.detailslist.details.length > 0)
                            List = JsonObject.serviceresponse.detailslist.details;
                        else
                            List.push(JsonObject.serviceresponse.detailslist.details);

                        AccountMasterView.variables.dx_ddlShipState.option({
                            dataSource: new DevExpress.data.ArrayStore({
                                data: List,
                                key: "stateid"
                            }),
                            displayExpr: "statename",
                            valueExpr: "stateid",
                        });
                    }
                }
                else {
                    DevExVariables.InvalidResponseCode(data);
                }
            },
            error: OnError
        });
    },

    GetCityList_ShipmentInfo: function (stateid) {
        $.ajax({
            url: getDomain() + "/Common/BindMastersDetails?ServiceName=MASTER_COUNTRY_STATE_CITY_GET&ColumnRequested=CITY&ISRECORDALL=true&sidx=CITYNAME&sord=asc&_search=true&searchField=STATEID&searchOper=eq&searchString=" + stateid,
            async: true,
            cache: false,
            type: 'POST',
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    var JsonObject = xml2json.parser(data);
                    if (JsonObject.serviceresponse.detailslist) {
                        var List = [];
                        if (JsonObject.serviceresponse.detailslist.details.length > 0)
                            List = JsonObject.serviceresponse.detailslist.details;
                        else
                            List.push(JsonObject.serviceresponse.detailslist.details);
                        AccountMasterView.variables.dx_ddlShipCity.option({
                            dataSource: new DevExpress.data.ArrayStore({
                                data: List,
                                key: "cityid"
                            }),
                            displayExpr: "cityname",
                            valueExpr: "cityid",
                        });
                    }
                }
                else {
                    DevExVariables.InvalidResponseCode(data);
                }
            },
            error: OnError
        });
    },

    GetStatesList_staffinfo: function (countryid) {
        $.ajax({
            url: getDomain() + "/Common/BindMastersDetails?ServiceName=MASTER_COUNTRY_STATE_CITY_GET&ColumnRequested=STATE&ISRECORDALL=true&sidx=STATENAME&sord=asc&_search=true&searchField=COUNTRYID&searchOper=eq&searchString=" + countryid,
            async: true,
            cache: false,
            type: 'POST',
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    var JsonObject = xml2json.parser(data);
                    if (JsonObject.serviceresponse.detailslist) {
                        var List = [];
                        if (JsonObject.serviceresponse.detailslist.details.length > 0)
                            List = JsonObject.serviceresponse.detailslist.details;
                        else
                            List.push(JsonObject.serviceresponse.detailslist.details);


                        AccountMasterView.variables.dx_ddlStaffState.option({
                            dataSource: new DevExpress.data.ArrayStore({
                                data: List,
                                key: "stateid"
                            }),
                            displayExpr: "statename",
                            valueExpr: "stateid",
                        });
                    }
                }
                else {
                    DevExVariables.InvalidResponseCode(data);
                }
            },
            error: OnError
        });
    },

    GetCityList_staffinfo: function (stateid) {
        $.ajax({
            url: getDomain() + "/Common/BindMastersDetails?ServiceName=MASTER_COUNTRY_STATE_CITY_GET&ColumnRequested=CITY&ISRECORDALL=true&sidx=CITYNAME&sord=asc&_search=true&searchField=STATEID&searchOper=eq&searchString=" + stateid,
            async: true,
            cache: false,
            type: 'POST',
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    var JsonObject = xml2json.parser(data);
                    if (JsonObject.serviceresponse.detailslist) {
                        var List = [];
                        if (JsonObject.serviceresponse.detailslist.details.length > 0)
                            List = JsonObject.serviceresponse.detailslist.details;
                        else
                            List.push(JsonObject.serviceresponse.detailslist.details);

                        AccountMasterView.variables.dx_ddlStaffCity.option({
                            dataSource: new DevExpress.data.ArrayStore({
                                data: List,
                                key: "cityid"
                            }),
                            displayExpr: "cityname",
                            valueExpr: "cityid",
                        });
                    }
                }
                else {
                    DevExVariables.InvalidResponseCode(data);
                }
            },
            error: OnError
        });
    },

    RegisterFileUploadWithCropper: function (btnId, CanvasId, CropPreviewId, CropperModalId) {
        $('#' + btnId).fileupload({
            url: getDomain() + '/Helpers/Handler/FileUploadHandler.ashx',
            add: function (e, data) {
                if (checkIsValidFile(e.target.accept, data.files[0].type))
                    data.submit();
                else
                    notificationMessage('Invalid File', 'Please select only ' + e.target.accept + ' files', 'warning');
            },
            success: function (res, status) {
                var ext = $(this)[0].files[0].name.split(".")[1];
                if (ext.toLowerCase() != "mp4") {
                    //$("#CustomerimgCrop").cropper('clear');
                    $('#' + CropperModalId).modal();
                    $("#" + CanvasId).html('');
                    $("#" + CropPreviewId).cropper("replace", res);
                    $('#hdnCropperImgName').val($(this)[0].files[0].name);
                }
            },
            error: OnError
        });
    },

    GetSubHeadList: function (HeadId) {
        var myfilter = { rules: [] };
        myfilter.rules.push({ field: "TYPE", op: "eq", data: "AccSubHead" });
        myfilter.rules.push({ field: "HEADID", op: "eq", data: HeadId });

        $.ajax({
            url: getDomain() + AccountMasterView.variables.BindStaticDataUrl + "&myfilters=" + JSON.stringify(myfilter),
            async: false,
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
                        AccountMasterView.variables.dx_ddlSubHeadName.option({
                            dataSource: new DevExpress.data.ArrayStore({
                                data: List,
                                key: "subheadid"
                            }),
                            displayExpr: "subhead",
                            valueExpr: "subheadid",
                            value : ""
                        });
                    }
                    else {
                        AccountMasterView.variables.dx_ddlSubHeadName.option({
                            dataSource: [],
                            displayExpr: "subhead",
                            valueExpr: "subheadid",
                            value: ""
                        });
                    }
                }
                else {
                    DevExVariables.InvalidResponseCode(data);
                }
            },
            error: OnError
        });
    },

    GetStaticPriceLists: function () {
        $.ajax({
            url: getDomain() + AccountMasterView.variables.BindStaticPrice + "&ColumnRequested=Labour,Material",
            async: true,
            cache: false,
            type: 'POST',
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    var JsonObject = xml2json.parser(data);
                    if (JsonObject.serviceresponse.labourpricelist) {
                        AccountMasterView.variables.dx_txtLabourPrice.option({
                            dataSource: new DevExpress.data.ArrayStore({
                                data: JsonObject.serviceresponse.labourpricelist.details,
                                key: "lpid"
                            }),
                            displayExpr: "lppricelist",
                            valueExpr: "lpid",
                        });
                    }
                    if (JsonObject.serviceresponse.materialpricelist) {
                        AccountMasterView.variables.dx_txtMaterialPrice.option({
                            dataSource: new DevExpress.data.ArrayStore({
                                data: JsonObject.serviceresponse.materialpricelist.details,
                                key: "rmplid"
                            }),
                            displayExpr: "rmpricelist",
                            valueExpr: "rmplid",
                        });
                    }
                   
                }
                else {
                    DevExVariables.InvalidResponseCode(data);
                }
            },
            error: OnError
        });
    },

    ActiveDeactiveFromGrid: function (val, Acc_id, type) {
        var data = {
            oper: "Edit",
            "ACCID": Acc_id,
        }

        if (type == "Login") {
            data.TYPE = "Allow_Login";
            data.ISLOGINALLOWED = val;
        }
        else if (type == "Roaming") {
            data.TYPE = "Allow_Roaming";
            data.ISROAMINGALLOWED = val;
        }
        else {
            data.TYPE = "Active_Deactive";
            data.ISACTIVE = val;
        }

        $.ajax({
            url: getDomain() + AccountMasterView.variables.PerformMasterOperationUrl,
            data: data,
            async: false,
            cache: false,
            type: 'POST',
            beforeSend: function () {
                dx_LoaderTrinity.show();
            },
            success: function (data) {
                if ($(data).find("RESPONSECODE").text() == 0) {
                    DevExVariables.Toaster("success", 'Record is Updated successfully.');
                    AccountMasterView.variables.dx_dataGrid.refresh();
                }
                else {
                    DevExVariables.InvalidResponseCode(data);
                }
            },
            complete: function () {
                dx_LoaderTrinity.hide();
            },
            error: OnError
        });
    },

    GetUserGroupList: function () {
        $.ajax({
            url: getDomain() + "/Common/BindMastersDetails?ServiceName=SECURITY_USERACCESSGROUPS_GET&IsRecordAll=true",
            async: true,
            cache: false,
            type: 'POST',
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    var JsonObject = xml2json.parser(data);
                    if (JsonObject.serviceresponse.detailslist) {
                        var List = [];

                        if (JsonObject.serviceresponse.detailslist.details.length)
                            List = JsonObject.serviceresponse.detailslist.details;
                        else
                            List.push(JsonObject.serviceresponse.detailslist.details);

                        AccountMasterView.variables.dx_ddlUserGroup.option({
                            dataSource: new DevExpress.data.ArrayStore({
                                data: List,
                                key: "usergroupid"
                            }),
                            displayExpr: "usergroupname",
                            valueExpr: "usergroupid",
                        });
                    }
                    else {
                        AccountMasterView.variables.dx_ddlUserGroup.option({
                            dataSource: new DevExpress.data.ArrayStore({ data: [] })
                        });
                    }
                }
                else {
                    DevExVariables.InvalidResponseCode(data);
                }
            },
            error: OnError
        });
    },

    GetLockerList: function () {

        $.ajax({
            url: getDomain() + "/Common/BindMastersDetails?ServiceName=LOCKERMASTER_GET&IsRecordAll=true",
            async: true,
            cache: false,
            type: 'POST',
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    var JsonObject = xml2json.parser(data);
                    if (JsonObject.serviceresponse.detailslist) {
                        var List = [];

                        if (JsonObject.serviceresponse.detailslist.details.length)
                            List = JsonObject.serviceresponse.detailslist.details;
                        else
                            List.push(JsonObject.serviceresponse.detailslist.details);

                        AccountMasterView.variables.dx_ddlLockerAccess.option({
                            dataSource: new DevExpress.data.ArrayStore({
                                data: List,
                                key: "lockermasterid"
                            }),
                            displayExpr: "lockername",
                            valueExpr: "lockermasterid",
                        });
                    }
                    else {
                        AccountMasterView.variables.dx_ddlLockerAccess.option({
                            dataSource: new DevExpress.data.ArrayStore({ data: [] })
                        });
                    }
                }
                else {
                    DevExVariables.InvalidResponseCode(data);
                }
            },
            error: OnError
        });
    },

    GetSubbookList: function () {
        var myfilter = { rules: [] };
        myfilter.rules.push({ field: "TYPE", op: "eq", data: "AccSubBook" });

        $.ajax({
            url: getDomain() + AccountMasterView.variables.BindStaticDataUrl + "&myfilters=" + JSON.stringify(myfilter),
            async: true,
            cache: false,
            type: 'POST',
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    var JsonObject = xml2json.parser(data);
                    if (JsonObject.serviceresponse.detailslist) {
                        var List = [];

                        if (JsonObject.serviceresponse.detailslist.details.length)
                            List = JsonObject.serviceresponse.detailslist.details;
                        else
                            List.push(JsonObject.serviceresponse.detailslist.details);

                        AccountMasterView.variables.dx_ddlSubbookAccess.option({
                            dataSource: new DevExpress.data.ArrayStore({
                                data: List,
                                key: "sbookid"
                            }),
                            displayExpr: "subbook",
                            valueExpr: "sbookid",
                        });
                    }
                    else {
                        AccountMasterView.variables.dx_ddlSubbookAccess.option({
                            dataSource: new DevExpress.data.ArrayStore({ data: [] })
                        });
                    }
                }
                else {
                    DevExVariables.InvalidResponseCode(data);
                }
            },
            error: OnError
        });
    },

    GetBranchList: function () {
        $.ajax({
            url: getDomain() + "/Common/BindMastersDetails?ServiceName=COMPANY_BRANCH_MASTER_GET&IsRecordAll=true",
            async: true,
            cache: false,
            type: 'POST',
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    var JsonObject = xml2json.parser(data);
                    if (JsonObject.serviceresponse.detailslist) {
                        var List = [];

                        if (JsonObject.serviceresponse.detailslist.details.length)
                            List = JsonObject.serviceresponse.detailslist.details;
                        else
                            List.push(JsonObject.serviceresponse.detailslist.details);

                        AccountMasterView.variables.dx_ddlBranchAccess.option({
                            dataSource: new DevExpress.data.ArrayStore({
                                data: List,
                                key: "branchid"
                            }),
                            displayExpr: "branchname",
                            valueExpr: "branchid",
                        });
                    }
                    else {
                        AccountMasterView.variables.dx_ddlBranchAccess.option({
                            dataSource: new DevExpress.data.ArrayStore({ data: [] })
                        });
                    }
                }
                else {
                    DevExVariables.InvalidResponseCode(data);
                }
            },
            error: OnError
        });
    },

    GetConceptOfList: function () {
        var myfilter = { rules: [] };
        myfilter.rules.push({ field: "TYPE", op: "eq", data: "ConceptOf" });

        $.ajax({
            url: getDomain() + AccountMasterView.variables.BindStaticDataUrl + "&myfilters=" + JSON.stringify(myfilter),
            async: true,
            cache: false,
            type: 'POST',
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    var JsonObject = xml2json.parser(data);
                    if (JsonObject.serviceresponse.detailslist) {
                        AccountMasterView.variables.dx_ddlDesignConcept.option({
                            dataSource: new DevExpress.data.ArrayStore({
                                data: JsonObject.serviceresponse.detailslist.details,
                                key: "conceptofid"
                            }),
                            displayExpr: "conceptofname",
                            valueExpr: "conceptofid",
                        });
                    }
                }
                else {
                    DevExVariables.InvalidResponseCode(data);
                }
            },
            error: OnError
        });
    },

    GetDiamondColorList: function () {
        var myfilter = { rules: [] };
        myfilter.rules.push({ field: "TYPE", op: "eq", data: "Colour" });
        //myfilter.rules.push({ field: "RMSUBCATE", op: "eq", data: "DIAMOND" });
        myfilter.rules.push({ field: "ISUSEINJEWELLERY", op: "eq", data: true });

        $.ajax({
            url: getDomain() + AccountMasterView.variables.BindStaticDataUrl + "&myfilters=" + JSON.stringify(myfilter),
            async: true,
            cache: false,
            type: 'POST',
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    var JsonObject = xml2json.parser(data);
                    if (JsonObject.serviceresponse.detailslist) {
                        AccountMasterView.variables.dx_ddlDefDiaColor.option({
                            dataSource: new DevExpress.data.ArrayStore({
                                data: JsonObject.serviceresponse.detailslist.details,
                                key: "colourid"
                            }),
                            displayExpr: "colour",
                            valueExpr: "colourid",
                        });
                    }
                }
                else {
                    DevExVariables.InvalidResponseCode(data);
                }
            },
            error: OnError
        });
    },

    GetDiamondClarityList: function () {
        var myfilter = { rules: [] };
        myfilter.rules.push({ field: "TYPE", op: "eq", data: "Purity" });
        myfilter.rules.push({ field: "ISUSEINJEWELLERY", op: "eq", data: true });
        
        $.ajax({
            url: getDomain() + AccountMasterView.variables.BindStaticDataUrl + "&myfilters=" + JSON.stringify(myfilter),
            async: true,
            cache: false,
            type: 'POST',
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    var JsonObject = xml2json.parser(data);
                    if (JsonObject.serviceresponse.detailslist) {
                        AccountMasterView.variables.dx_ddlDefDiaClarity.option({
                            dataSource: new DevExpress.data.ArrayStore({
                                data: JsonObject.serviceresponse.detailslist.details,
                                key: "purityid"
                            }),
                            displayExpr: "purity",
                            valueExpr: "purityid",
                        });
                    }
                }
                else {
                    DevExVariables.InvalidResponseCode(data);
                }
            },
            error: OnError
        });
    },

    GetMacAddressDetails: function () {
        $("#tbl_MacPermission tbody").html("");

        var myfilter = { rules: [] };
        myfilter.rules.push({ field: "ACCID", op: "eq", data: AccountMasterView.variables.Masterid });

        $.ajax({
            url: getDomain() + "/Common/BindMastersDetails?ServiceName=ACCOUNTMASTER_MACPERMISSION_GET&myfilters=" + JSON.stringify(myfilter),
            async: true,
            cache: false,
            type: 'POST',
            beforeSend: function () {
                dx_LoaderTrinity.show();
            },
            complete: function () {
                dx_LoaderTrinity.hide();
            },
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    var JsonObject = xml2json.parser(data);
                    if (JsonObject.serviceresponse.detailslist) {

                        var List = [];
                        if (JsonObject.serviceresponse.detailslist.details.length)
                            List = JsonObject.serviceresponse.detailslist.details;
                        else
                            List.push(JsonObject.serviceresponse.detailslist.details);

                        $.each(List, function (key, obj) {
                            $("#tbl_MacPermission tbody").append(
                                '<tr RecordId="' + obj.id + '">'
                                    + '<td>' + obj.macaddress + '</td>'
                                    + '<td>' + obj.ipaddress + '</td>'
                                    + '<td>' + obj.devicename + '</td>'
                                    + '<td style="text-align:center;"><div id="dx_swIsActiveMac' + key + '"></div></td>'
                                    + '<td style="text-align:center;"><button type="button" class="btn btn-danger" style="padding: 2px 6px !important;" onclick="AccountMasterView.OnClickBtnDeleteMac(' + obj.id + ')"><i class="fa fa-trash"></i></button></div></td>'
                                + '<tr>'
                                );

                            $("#dx_swIsActiveMac" + key).dxSwitch({
                                value: obj.isactive,
                                switchedOnText: "Yes",
                                switchedOffText: "No",
                                onValueChanged: function (data) {
                                    AccountMasterView.variables.currentMacList = {
                                        Value: data.value,
                                        Id: obj.id
                                    }
                                    AccountMasterView.variables.dx_popupConfirmMac.show();
                                    //AccountMasterView.AllowMacAddress(data.value, obj.id);
                                }
                            })
                        });
                    }
                }
                else {
                    DevExVariables.InvalidResponseCode(data);
                }
            },
            error: OnError
        });
    },

    OnClickBtnDeleteMac: function (id) {
        AccountMasterView.variables.currentMacList = {
            Id: id
        }
        AccountMasterView.variables.dx_popupConfirmMacDelete.show();
    },

    AllowMacAddress: function (Value, Id) {
        var data = {
            "ID": Id,
            "oper": "edit",
            "ISACTIVE": Value
        }

        $.ajax({
            url: getDomain() + "/Common/OpeartionsOnMaster?ServiceName=ACCOUNTMASTER_MACPERMISSION_CRUD",
            data: data,
            async: true,
            cache: false,
            type: 'POST',
            beforeSend: function () {
                dx_LoaderTrinity.show();
            },
            complete: function () {
                dx_LoaderTrinity.hide();
                AccountMasterView.variables.dx_popupConfirmMac.hide();
                AccountMasterView.GetMacAddressDetails();
            },
            success: function (result) {
                if ($(result).find('RESPONSECODE').text() == "0") {
                    DevExVariables.Toaster("success", 'Record is updated successfully');
                }
                else {
                    DevExVariables.InvalidResponseCode(result);
                }
            },
            error: OnError,
        });
    },

    DeleteMacAddress: function (Id) {
        var data = {
            "ID": Id,
            "oper": "delete"
        }

        $.ajax({
            url: getDomain() + "/Common/OpeartionsOnMaster?ServiceName=ACCOUNTMASTER_MACPERMISSION_CRUD",
            data: data,
            async: true,
            cache: false,
            type: 'POST',
            beforeSend: function () {
                dx_LoaderTrinity.show();
            },
            complete: function () {
                dx_LoaderTrinity.hide();
                AccountMasterView.variables.dx_popupConfirmMacDelete.hide();
                AccountMasterView.GetMacAddressDetails();
            },
            success: function (result) {
                if ($(result).find('RESPONSECODE').text() == "0") {
                    DevExVariables.Toaster("success", 'Record is deleted successfully');
                }
                else {
                    DevExVariables.InvalidResponseCode(result);
                }
            },
            error: OnError,
        });
    },

    BindTaxProfile: function () {
        var myfilter = { rules: [] };
        myfilter.rules.push({ field: "ISACTIVE", op: "eq", data: true });

        $.ajax({
            url: getDomain() + AccountMasterView.variables.BindTaxProfile + "&IsRecordAll=true&myfilters=" + JSON.stringify(myfilter),
            async: true,
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

                        AccountMasterView.variables.dx_txtTaxPro.option({
                            dataSource: new DevExpress.data.ArrayStore({
                                data: List,
                                key: "taxprofileid"
                            }),
                            displayExpr: "taxprofilename",
                            valueExpr: "taxprofileid"
                        });
                    }
                }
                else {
                    DevExVariables.InvalidResponseCode(data);
                }
            },
            error: OnError
        });
    },
};

$(document).ready(function () {
   
    $("#tbl_Document_Upload").click(function () {
        AccountMasterView.variables.Oper = 'edit';
        AccountMasterView.variables.Type = 'Document_Upload';
    });
    $("#tbl_AccountInfo").click(function (key, obj) {
        AccountMasterView.variables.Oper = 'edit';
        AccountMasterView.variables.Type = 'AccountInfo';
    });
    $("#tbl_Personal").click(function (key, obj) {
        AccountMasterView.variables.Oper = 'edit';
        AccountMasterView.variables.Type = 'PersonalDetails';
    });
    $("#tbl_AddressInfo").click(function (key, obj) {
        AccountMasterView.variables.Oper = 'edit';
        AccountMasterView.variables.Type = 'ShipmentInfo';
    });
    $("#tbl_ReferenceDetails").click(function (key, obj) {
        AccountMasterView.variables.Oper = 'edit';
        AccountMasterView.variables.Type = 'ReferenceDetails';
    });
    $("#tbl_Other_Info").click(function (key, obj) {
        AccountMasterView.variables.Oper = 'edit';
        AccountMasterView.variables.Type = 'OtherInfo';
    });
    $("#tbl_BankDetails").click(function (key, obj) {
        AccountMasterView.variables.Oper = 'edit';
        AccountMasterView.variables.Type = 'BankDetails';
    });
    $("#btn_Delete_ShipmentInfo").click(function () {
        var data = {
            "oper": "Delete",
            "ACCOUNTMASTER_SHIPINGINFOID": $("#del_id_ShipmentInfo").html(),
            "TYPE": "ShipmentInfo"
        }

        $.ajax({
            url: getDomain() + AccountMasterView.variables.PerformMasterOperationUrl,
            data: data,
            async: true,
            cache: false,
            type: 'POST',
            beforeSend: function () {
                dx_LoaderTrinity.show();
            },
            complete: function () {
                dx_LoaderTrinity.hide();
            },
            success: function (result) {
                if ($(result).find('RESPONSECODE').text() == "0") {
                    $("#myModal_Delete_ShipmentInfo").modal('hide');
                    DevExVariables.Toaster("success", 'Record is Deleted successfully');
                    $("#shipmentEdit").hide();
                    $("#Addressfrom").show();
                    AccountMasterView.initializeDevExgrid_ShipmentInfo(AccountMasterView.variables.Masterid);
                }
                else {
                    DevExVariables.InvalidResponseCode(result);
                }
            },
            error: OnError,
        });
    });
    $("#btn_Delete_ReferenceDetails").click(function () {
        var data = {
            "oper": "Delete",
            "ACCOUNTMASTER_REFERENCEID": $("#del_id_ReferenceDetails").html(),
            "TYPE": "ReferenceDetails"
        }

        $.ajax({
            url: getDomain() + AccountMasterView.variables.PerformMasterOperationUrl,
            data: data,
            async: true,
            cache: false,
            type: 'POST',
            beforeSend: function () {
                dx_LoaderTrinity.show();
            },
            complete: function () {
                dx_LoaderTrinity.hide();
            },
            success: function (result) {
                if ($(result).find('RESPONSECODE').text() == "0") {
                    $("#myModal_Delete_ReferenceDetails").modal('hide');
                    DevExVariables.Toaster("success", 'Record is Deleted successfully');
                    $("#ReferenceEdit").hide();
                    $("#ReferenceDetailsfrom").show();
                    AccountMasterView.initializeDevExgrid_ReferenceDetails(AccountMasterView.variables.Masterid);
                }
                else {
                    DevExVariables.InvalidResponseCode(result);
                }
            },
            error: OnError,
        });
    });
    $("#btn_Delete_StaffInfo").click(function () {
        var data = {
            "oper": "Delete",
            "ACCOUNTMASTER_STAFFINFOID": $("#del_id_StaffInfo").html(),
            "TYPE": "staffinfo"
        }

        $.ajax({
            url: getDomain() + AccountMasterView.variables.PerformMasterOperationUrl,
            data: data,
            async: true,
            cache: false,
            type: 'POST',
            beforeSend: function () {
                dx_LoaderTrinity.show();
            },
            complete: function () {
                dx_LoaderTrinity.hide();
            },
            success: function (result) {
                if ($(result).find('RESPONSECODE').text() == "0") {
                    $("#myModal_Delete_StaffInfo").modal('hide');
                    DevExVariables.Toaster("success", 'Record is Deleted successfully');
                    $("#staffEdit").hide();
                    $("#stafffrom").show();
                    AccountMasterView.initializeDevExgrid_StaffInfo(AccountMasterView.variables.Masterid);
                }
                else {
                    DevExVariables.InvalidResponseCode(result);
                }
            },
            error: OnError,
        });
    });
    $("#tbl_ShipmentInfo").click(function (key, obj) {
        AccountMasterView.variables.Oper = 'edit';
        AccountMasterView.variables.Type = 'ShipmentInfo';
        $("#shipmentEdit").hide();
        $("#Addressfrom").show();
    });
    $("#tbl_Price_Policy").click(function (key, obj) {
        AccountMasterView.variables.Oper = 'edit';
        AccountMasterView.variables.Type = 'Price_Policy';
    });
    $("#tbl_LoginSetting").click(function (key, obj) {
        AccountMasterView.variables.Oper = 'edit';
        AccountMasterView.variables.Type = 'Login_Setting';
        AccountMasterView.GetMacAddressDetails();
    });

    $("#tbl_AccountInfo").css('pointer-events', "");
    $("#tbl_Personal").css('pointer-events', "none");
    $("#tbl_BankDetails").css('pointer-events', "none");
    $("#tbl_AddressInfo").css('pointer-events', "none");
    $("#tbl_ReferenceDetails").css('pointer-events', "none");
    $("#tbl_Document_Upload").css('pointer-events', "none");
    $("#tbl_StaffInfo").css('pointer-events', "none");
    $("#tbl_Other_Info").css('pointer-events', "none");
    $("#tbl_Price_Policy").css('pointer-events', "none");
    AccountMasterView.FormInitialize();

    AccountMasterView.initializeDevExgrid();

    AccountMasterView.BindAddressType();
    AccountMasterView.GetCountryList();
    AccountMasterView.GetCurrencyList();
    AccountMasterView.GetStaticPriceLists();
    AccountMasterView.GetUserGroupList();
    AccountMasterView.GetLockerList();
    AccountMasterView.GetSubbookList();
    AccountMasterView.GetBranchList();
    AccountMasterView.GetConceptOfList();
    AccountMasterView.GetDiamondColorList();
    AccountMasterView.GetDiamondClarityList();
    AccountMasterView.BindTaxProfile();

    $('#modalUpload').on('show.bs.modal', function (e) {
        $('#hdnPreviewUploader').val(e.relatedTarget.dataset.preview);
        $('#hdnExtUploader').val(e.relatedTarget.dataset.ext);
        RegisterMultipleFileUpload('#imgUploader', e.relatedTarget.dataset.ext);
        $("#spExtension").html(e.relatedTarget.dataset.ext);
    });

    $('#btnAddFile').click(function () {
        var strHref = '', file = '', fileid = '00000000-0000-0000-0000-000000000000', displayFile = '';
        $('#imgUploader .plupload_filelist').find('li').each(function (key, obj) {
            if ($(obj).find('.plupload_file_name a').length > 0) {
                strHref = $(obj).find('.plupload_file_name a').attr('href');
                file = strHref.substr(strHref.lastIndexOf('/') + 1).split('.')[0];
                displayFile = $(obj).find('.plupload_file_name a').html();
                //var x = displayFile;
                //var f = x.substr(0, x.lastIndexOf('.'));
                $('#' + $('#hdnPreviewUploader').val()).append(
                    '<tr id="' + file + '">' +
                        '<td style="text-align:center"><input type="checkbox" class="chk_isVerified" style="width:20px;height:10px"/></td>' +
                        '<td style="text-align:center"><a class="label-click" href="' + strHref + '" target="blank">' + displayFile + '</a></td>' +
                        '<td><input type="text" class="form-control Description" name="Description" value="' + displayFile.split('.')[0] + '" /></td>' +
                        '<td style="text-align: center;">' +
                            '<span class="btn btn-danger" style="padding: 2px 6px;" onclick="AccountMasterView.deleteFile(\'' + file + '\',\'' + strHref + '\');"><i class="fa fa-trash-o"></i></span>' +
                        '</td>' +
                    '</tr>');
            }

            $('#modalUpload').modal('hide');
        });
    });
    $("#inputItemImage").click(function () {
        AccountMasterView.variables.ImageUploadType = "Single";
    });
    /*----------------------------Code for Image Cropper----------------------------*/
    $("#imgCropPreview").cropper({
        aspectRatio: 1,
        preview: ".preview",
        background: false,
        minContainerWidth: 250,
        minContainerHeight: 250,
        data: {
            x: 208,
            y: 22
        }
    });

    $('.docs-buttons1').on('click', '[data-method]', function () {
        var $this = $(this);
        var data = $this.data();
        var $target;
        var result;

        result = $("#imgCropPreview").cropper(data.method, data.option, data.secondOption);
        switch (data.method) {
            case 'scaleX':
            case 'scaleY':
                $(this).data('option', -data.option);
                break;
            case 'getCroppedCanvas':
                if (result) {
                    $('#ModelImageCropper').modal().find('#divCropCanvas').html(result);
                    $("canvas").hide();
                    $('#ModelImageCropper').modal('hide');
                    var c = $("#divCropCanvas").find('canvas')[0];
                    if (c != undefined) {
                        var ctx = c.getContext("2d");
                        var img = $("#imgCropPreview")[0];
                        ctx.drawImage(c, 0, 0);
                        img.setAttribute('crossOrigin', 'anonymous');

                        //Setting image quality
                        //var fullQuality = canvas.toDataURL('image/jpeg', 1.0);
                        //var mediumQuality = canvas.toDataURL('image/jpeg', 0.5);
                        //var lowQuality = canvas.toDataURL('image/jpeg', 0.1);
                        var mydataURL = c.toDataURL('image/png', 1.0);
                        if (mydataURL != '')
                            setTimeout(function () {
                                $.ajax({
                                    url: getDomain() + "/Common/convertstring",
                                    data: { imagestring: mydataURL },
                                    async: false,
                                    cache: false,
                                    type: 'POST',
                                    success: function (res) {
                                        if (AccountMasterView.variables.ImageUploadType == "Single") {
                                            $('#ItemimgPreview').attr('src', res);
                                            //$('#profileimg').data('newurl', res);
                                        }
                                    },
                                    error: OnError
                                });
                            }, 10);
                    }
                }
                break;
        }
    });
    /*----------------------------Code for Image Cropper----------------------------*/

    AccountMasterView.RegisterFileUploadWithCropper('inputItemImage', 'divCropCanvas', 'imgCropPreview', 'ModelImageCropper');
     

    AccountMasterView.variables.dx_popupConfirmMac = $('#dx_popupConfirmMac').dxPopup({
        contentTemplate: function () {
            return $("<div>").append(
                $("<p>Are you sure to update this record?</p>")
            );
        },
        width: 300,
        height: 200,
        showTitle: true,
        title: 'Update Record',
        visible: false,
        dragEnabled: false,
        closeOnOutsideClick: true,
        showCloseButton: false,
        toolbarItems: [{
            widget: 'dxButton',
            toolbar: 'bottom',
            location: 'after',
            options: {
                icon: 'todo',
                text: 'Yes',
                type: 'success',
                onClick() {
                    AccountMasterView.AllowMacAddress(AccountMasterView.variables.currentMacList.Value, AccountMasterView.variables.currentMacList.Id);
                },
            },
        }, {
            widget: 'dxButton',
            toolbar: 'bottom',
            location: 'before',
            options: {
                icon: 'remove',
                text: 'Close',
                type: "danger",
                onClick() {
                    AccountMasterView.variables.dx_popupConfirmMac.hide();
                    AccountMasterView.GetMacAddressDetails();
                },
            },
        }],
    }).dxPopup('instance');

    AccountMasterView.variables.dx_popupConfirmMacDelete = $('#dx_popupConfirmMacDelete').dxPopup({
        contentTemplate: function () {
            return $("<div>").append(
                $("<p>Are you sure to delete this record?</p>")
            );
        },
        width: 300,
        height: 200,
        showTitle: true,
        title: 'Delete Record',
        visible: false,
        dragEnabled: false,
        closeOnOutsideClick: true,
        showCloseButton: false,
        toolbarItems: [{
            widget: 'dxButton',
            toolbar: 'bottom',
            location: 'after',
            options: {
                icon: 'todo',
                text: 'Yes',
                type: 'success',
                onClick() {
                    AccountMasterView.DeleteMacAddress(AccountMasterView.variables.currentMacList.Id);
                },
            },
        }, {
            widget: 'dxButton',
            toolbar: 'bottom',
            location: 'before',
            options: {
                icon: 'remove',
                text: 'Close',
                type: "danger",
                onClick() {
                    AccountMasterView.variables.dx_popupConfirmMacDelete.hide();
                    AccountMasterView.GetMacAddressDetails();
                },
            },
        }],
    }).dxPopup('instance');
});
