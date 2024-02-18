var GeneralExpenceView = {
    variables: {
        BindAccListUrl: "/Common/BindMastersDetails?ServiceName=ACCOUNTMASTER_GET",
        BindAccountbalancelist: "/Common/BindMastersDetails?ServiceName=ACC_BALANCE_GET",
        BindExpenseACCListUrl: "/Common/BindMastersDetails?ServiceName=ACC_SUBHEAD_MASTER_GET",
        BindTaxProfile: "/Common/BindMastersDetails?ServiceName=ACC_TAXPROFILE_GET",
        BindItemMaster: "/Common/BindMastersDetails?ServiceName=ACC_ITEMMASTER_GET",
        PerformMasterOperationUrl: "/Common/OpeartionsOnMaster?ServiceName=ACC_GENERALEXPANSE_CRUD",
        BindStaticDataUrl: "/Common/BindMastersDetails?ServiceName=STATIC_MASTER_GET&IsActive=true",
        BindMainGridListUrl: "/Common/BindMastersDetails?ServiceName=ACC_GENERALEXPENSE_GET",
        BindDetailListUrl: "/Common/BindMastersDetails?ServiceName=ACC_GENERALEXPANSE_DETAIL_GET",

        GlobalTotal: [],
        VoucherTypeList: ["Retails Invoice", "Tax Invoice"],

        dx_bookType: '',
        dx_VchrNo: '',
        dx_txtVoucherDate: '',
        dx_ddlVoucherType: '',
        dx_txtDueDays: '',
        //dx_txtDueDate: '',
        dx_ExpenseAcc: "",
        dx_PartyAcc: "",
        dx_txtRemarks: '',
        dx_taxProfile: '',
        dx_txtBillNo: '',
        txtTaxableAmount: '',
        dx_txtSgst: '',
        dx_txtCgst: '',
        dx_txtIgst: '',
        txtAmountWithTax: '',
        txtRoundOff: '',
        txtTotalAmount: '',
        dx_txtExchangeRate: '',
        txtTotalAmountinRs: '',

        dx_txtItemName: '',
        dx_ddlUnit: '',
        dx_WarrantyDate: '',
        dx_Quantity: '',
        dx_Weight: '',
        dx_Rate: '',
        dx_Discount: '',
        dx_TotalAmt: '',
        dx_TotalTax: '',
        dx_AmtWithTax: '',
        DetailsControlsList: [],

        Oper: 'Add',
        addedit: "added",
        Masterid: "",
        DeleteDataObj: "",
        RowCount: 1,

        /*------------------------variables for main form Controls-----------------------*/
        dx_popupRecordDelete: "",
        DeleteDataObj: "",
        DeletePopUpOptions: {
            width: 300,
            height: 200,
            contentTemplate: function () {
                return $("<div />").append(
                    $("<p>Voucher No: <span>" + GeneralExpenceView.variables.DeleteDataObj.voucherno + "</span></p>"
                     + "<p>Voucher Type: <span>" + GeneralExpenceView.variables.DeleteDataObj.vouchertype + "</span></p>"
                     + "<p>Amount: <span>" + GeneralExpenceView.variables.DeleteDataObj.totaltaxableamt + "</span></p>"
                     )
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
                            "EXPENSEID": GeneralExpenceView.variables.Masterid,
                            "oper": GeneralExpenceView.variables.Oper,
                        }
                        $.ajax({
                            url: getDomain() + GeneralExpenceView.variables.PerformMasterOperationUrl,
                            data: data,
                            async: true,
                            cache: false,
                            type: 'POST',
                            success: function (data) {
                                if ($(data).find('RESPONSECODE').text() == "0") {
                                    DevExVariables.Toaster("success", 'Record is deleted successfully');

                                    GeneralExpenceView.variables.dx_popupRecordDelete.hide();
                                    GeneralExpenceView.variables.dx_dataGrid.refresh();
                                }
                                else {
                                    DevExVariables.InvalidResponseCode(data);
                                }
                            },
                            error: OnError,
                        });

                        //GeneralExpenceView.savedata(data);
                        //GeneralExpenceView.variables.dx_popupRecordDelete.hide();
                    },
                }
            }],
            showTitle: true,
            title: "Delete Record?",
            visible: false,
            dragEnabled: false,
            closeOnOutsideClick: true
        },
        dx_txtpaymentDate: "",
        dx_btnAddNew: "",
        dx_btnSubmit: "",
        dx_btnCancel: "",
        dx_txtsize: "",
        dx_dataGrid: "",

        /*------------------------variables for main form Controls-----------------------*/

        taxlist: [],
        taxprofilelist: [],
        deletedFiles: "",


        //------------------------------ share model tools---------------------------------
        dx_txtSharetoPartyList: "",
        dx_RadioSocial: "",
        dx_txtMobileNo: "",
        dx_txtShareMessage: "",
        dx_txtSharingEmailId: "",
        dx_txtSharingSubject: "",
        dx_txtSharingEmailBody: "",
        content: '<p>Dear Sir,</p>' +
                '<p>Kindly click on below URL to view shared Design.</p>' +
                '<p>{SHARE URL}</p>' +
                '<p>Kind Regards,<br/>' + $("#hdn_UserName").val() + '<br/>' +
                '<img src="https://docs.google.com/uc?id=174UudfEtxLzq6mnwIHcJNySMPRy6RnYg&revid=0B23A25FsmJHbeW1VdFQ5cWNDOFgwS05yTFdrL3phaFoyUHFNPQ" width="90" /><br/>' +
                '<span style="font-size:18px;"><strong>Trinity Jewells</strong></span><br/>' +
                '405, Princess Plaza,<br/>' +
                'Near Sardar Chowk,<br/>' +
                'Mini Bazar,<br/>' +
                'Varachha Road,<br/>' +
                'Surat. (Gujarat)India<br/>' +
                '0261-4000800<br/></p>',
    },

    FormInitialize: function () {
        //--------------------------------------- Add New button---------------------------------------

        GeneralExpenceView.variables.dx_btnAddNew = $("#dx_btnAddNew").dxButton({
            stylingMode: "outlined",
            icon: "plus",
            text: "Add New",
            type: "default",
            validationGroup: "GeneralExpence",
            onClick: function (e) {
                GeneralExpenceView.AddNewLineDetails();
                $("#frm_Purchase_Expence").show();
                $("#pnlView").hide();
                GeneralExpenceView.variables.Masterid = "";
            }
        }).dxButton("instance");

        //--------------------------------------- Start Top Left Content---------------------------------------
        GeneralExpenceView.variables.dx_bookType = $("#dx_bookType").dxSelectBox({
            placeholder: "Select Book Type...",
            searchEnabled: true,
        }).dxValidator({
            validationGroup: "GeneralExpence",
            validationRules: [{
                type: "required",
                message: "Select Book Type"
            }]
        }).dxSelectBox("instance");

        GeneralExpenceView.variables.dx_VchrNo = $("#dx_VchrNo").dxTextBox({
            readOnly: true,
        }).dxValidator({
            validationGroup: "GeneralExpence",
            validationRules: []
        }).dxTextBox("instance");

        var now = new Date();
        GeneralExpenceView.variables.dx_txtVoucherDate = $("#dx_txtVoucherDate").dxDateBox({
            type: "date",
            value: now,
            showClearButton: true,
            useMaskBehavior: true,
            displayFormat: "dd MMM yyyy",
        }).dxDateBox("instance");

        GeneralExpenceView.variables.dx_ddlVoucherType = $("#dx_ddlVoucherType").dxSelectBox({
            dataSource: GeneralExpenceView.variables.VoucherTypeList,
            value: GeneralExpenceView.variables.VoucherTypeList[1],
            placeholder: "Select Voucher Type...",
            searchEnabled: true,
        }).dxValidator({
            validationGroup: "GeneralExpence",
            validationRules: [{
                type: "required",
                message: "Select Voucher Type"
            }]
        }).dxSelectBox("instance");

        GeneralExpenceView.variables.dx_txtDueDays = $("#dx_txtDueDays").dxNumberBox({
            placeholder: "Enter Due Days...",
            searchEnabled: true,
        }).dxValidator({
        }).dxNumberBox("instance");

        //var now = new Date();
        //GeneralExpenceView.variables.dx_txtDueDate = $("#dx_txtDueDate").dxDateBox({
        //    type: "date",
        //    value: now,
        //    showClearButton: true,
        //    useMaskBehavior: true,
        //    displayFormat: "dd MMM yyyy",
        //}).dxDateBox("instance");

        GeneralExpenceView.variables.dx_ExpenseAcc = $("#dx_ExpenseAcc").dxAutocomplete({
            placeholder: "Select Account...",
            mode: "search",
            dataSource: new DevExpress.data.CustomStore({
                load: function (loadOptions) {
                    var deferred = $.Deferred();

                    var myfilter = { rules: [] };
                    myfilter.rules.push({ field: "GROUPNAME", op: "eq", data: "Indirect Expense,Direct Expense,Indirect Income" });

                    $.ajax({
                        url: getDomain() + GeneralExpenceView.variables.BindAccListUrl + "&_search=true&searchField=ACCOUNTNAME&searchOper=cn&searchString=" + loadOptions.searchValue + "&myfilters=" + JSON.stringify(myfilter),
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
            onItemClick: function (e) {
                if (e.component.option().selectedItem) {
                    if (e.component.option().selectedItem) {
                        GeneralExpenceView.BindAccountBalance();
                        GeneralExpenceView.variables.dx_ExpenseAcc.option().selectedItem.accid;
                        $("#spanExpenseCurr").html(e.component.option().selectedItem.currencycode);
                    }
                    else {
                        GeneralExpenceView.variables.dx_ExpenseAcc = "";
                        $("#spanExpenseCurr").html('');
                    }
                }
            },
            valueExpr: "accountname",
        }).dxValidator({
            validationGroup: "GeneralExpence",
            validationRules: [{
                type: "required",
                message: "Select Cash/Bank Account"
            }]
        }).dxAutocomplete("instance");

        GeneralExpenceView.variables.dx_PartyAcc = $("#dx_PartyAcc").dxAutocomplete({
            placeholder: "Select Account...",
            mode: "search",
            dataSource: new DevExpress.data.CustomStore({
                load: function (loadOptions) {
                    var deferred = $.Deferred();

                    var myfilter = { rules: [] };
                    myfilter.rules.push({ field: "GROUPNAME", op: "eq", data: "Creditors/Debitors" });

                    $.ajax({
                        url: getDomain() + GeneralExpenceView.variables.BindAccListUrl + "&_search=true&searchField=ACCOUNTNAME&searchOper=cn&searchString=" + loadOptions.searchValue + "&myfilters=" + JSON.stringify(myfilter),
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
                key: "accid"
            }),
            valueExpr: "accountname",
            onItemClick: function (e) {
                if (e.component.option().selectedItem) {

                    if (e.component.option().selectedItem) {
                        GeneralExpenceView.BindAccountReceiveBalance();
                        GeneralExpenceView.variables.dx_PartyAcc.option().selectedItem.accid;
                        $("#spanReceiveCurr").html(e.component.option().selectedItem.currencycode);
                        GeneralExpenceView.variables.dx_taxProfile.option({ value: e.component.option().selectedItem.taxprofileid });
                        GeneralExpenceView.variables.dx_txtDueDays.option({ value: e.component.option().selectedItem.creditdays });
                        GeneralExpenceView.variables.dx_txtExchangeRate.option({ value: e.component.option().selectedItem.exchangerate });

                    }
                    else {
                        GeneralExpenceView.variables.dx_PartyAcc = "";
                        $("#spanReceiveCurr").html('');
                        GeneralExpenceView.variables.dx_taxProfile.option("value", "");
                        GeneralExpenceView.variables.dx_txtDueDays.option("value", "");
                        GeneralExpenceView.variables.dx_txtExchangeRate.option("value", "");

                    }

                }
            },
            itemTemplate: function (data) {
                return $("<div class='product-name'>" + "(" + data.partycode + ")&nbsp;" + data.accountname + "</div>");
            },
        }).dxValidator({
            validationGroup: "GeneralExpence",
            validationRules: [{
                type: "required",
                message: "Select Receive Account"
            }]
        }).dxAutocomplete("instance");

        GeneralExpenceView.variables.dx_txtRemarks = $("#dx_txtRemarks").dxTextArea({
            height: 110,
            placeholder: "Enter Remark"

        }).dxTextArea("instance");

        GeneralExpenceView.variables.dx_taxProfile = $("#dx_taxProfile").dxSelectBox({
            placeholder: "Select Tax Profile...",
            searchEnabled: true,
            onValueChanged: function (data) {
                //if (data.value && GeneralExpenceView.variables.Masterid > 0) {
                //    GeneralExpenceView.updateTaxProfile();
                //}
            },
            onItemClick: function (e) {
                //if (e.component.option().value && GeneralExpenceView.variables.Masterid > 0) {
                //    GeneralExpenceView.BindTaxProfile();
                //}
            },
        }).dxValidator({
            validationGroup: "GeneralExpence",
            validationRules: [{
                type: "required",
                message: "Select tax Profile Type"
            }]
        }).dxSelectBox("instance");

        GeneralExpenceView.variables.dx_txtBillNo = $("#dx_txtBillNo").dxTextBox({
            mode: "text",
            placeholder: "Enter Bill No...",
        }).dxTextBox("instance");

        GeneralExpenceView.variables.dx_txtExchangeRate = $("#dx_txtExchangeRate").dxNumberBox({
            value: 1,
            min: 1,
            onValueChanged: function (data) {
                GeneralExpenceView.OnChangeExchangeRate();
            },
            //onFocusOut: function (data) {
            //    var TotalAmountInRs = 0;
            //    TotalAmountInRs += +GeneralExpenceView.variables.dx_txtamt.option().value * GeneralExpenceView.variables.dx_txtExchangeRate.option().value;
            //    GeneralExpenceView.variables.txtTotalAmountInRs.option({ value: (TotalAmountInRs.toFixed(2)) });
            //},
        }).dxValidator({
            validationGroup: "GeneralExpence",
            validationRules: [{
                type: "required",
                message: "Exchange rate is required"
            }]
        }).dxNumberBox("instance");

        //--------------------------------------- End Top Left Content---------------------------------------

        //--------------------------------------- Start Bottom Right Content---------------------------------------
        GeneralExpenceView.variables.txtTaxableAmount = $("#txtTaxableAmount").dxNumberBox({
            readOnly: true,
            inputAttr: {
                class: "text-right"
            }
        }).dxNumberBox("instance");

        GeneralExpenceView.variables.txtAmountWithTax = $("#txtAmountWithTax").dxNumberBox({
            readOnly: true,
            inputAttr: {
                class: "text-right"
            }
        }).dxNumberBox("instance");

        GeneralExpenceView.variables.txtRoundOff = $("#txtRoundOff").dxNumberBox({
            readOnly: true,
            inputAttr: {
                class: "text-right"
            }
        }).dxNumberBox("instance");

        GeneralExpenceView.variables.txtTotalAmount = $("#txtTotalAmount").dxNumberBox({
            readOnly: true,
            inputAttr: {
                class: "text-right"
            }
        }).dxNumberBox("instance");

        GeneralExpenceView.variables.txtTotalAmountinRs = $("#txtTotalAmountinRs").dxNumberBox({
            readOnly: true,
            inputAttr: {
                class: "text-right"
            }
        }).dxNumberBox("instance");
        //--------------------------------------- Start Bottom Left Content---------------------------------------

        /*-------Start Bottom Left controls-------------------------------------*/

        //GeneralExpenceView.RegisterFileUpload('inputCADFile', 'lnkCADFilePreview', "#ItemimgError");

        //--------------------------------------- Submit button---------------------------------------

        GeneralExpenceView.variables.dx_btnSubmit = $("#dx_btnSubmit").dxButton({
            icon: "check",
            text: "Submit",
            type: "success",
            onClick: function (e) {
                var validation = DevExpress.validationEngine.validateGroup("GeneralExpence");
                if (!validation.isValid) {
                    DevExVariables.Toaster("warning", "Please fill all required fields before submit.");
                    return;
                }
                GeneralExpenceView.btnMasterSubmit();
            }

        }).dxButton("instance");

        //--------------------------------------- Cancle button---------------------------------------

        GeneralExpenceView.variables.dx_btnCancel = $("#dx_btnCancel").dxButton({
            icon: "close",
            text: "Cancel",
            type: "danger",
            onClick: function (e) {
                GeneralExpenceView.ClearValues();
            }
        }).dxButton("instance");


        /*----------------------------Sharing Modal--------------------------*/
        GeneralExpenceView.variables.dx_txtSharetoPartyList = $("#dx_txtSharetoPartyList").dxAutocomplete({
            placeholder: "Select Party Name...",
            mode: "search",
            dataSource: new DevExpress.data.CustomStore({
                load: function (loadOptions) {
                    var deferred = $.Deferred();
                    $.ajax({
                        url: getDomain() + GeneralExpenceView.variables.BindAccListUrl + "&_search=true&searchField=ACCOUNTNAME&searchOper=cn&searchString=" + loadOptions.searchValue,
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
                return $("<div>" + data.accountname + "</div>");
            },
            onSelectionChanged: function (data) {
                if (data.selectedItem) {
                    GeneralExpenceView.variables.dx_txtSharingEmailId.option({ value: data.selectedItem.emailid });
                    GeneralExpenceView.variables.dx_txtMobileNo.option({ value: data.selectedItem.mobile1 });

                }
                else {
                    GeneralExpenceView.variables.dx_txtSharingEmailId.option("value", "");
                    GeneralExpenceView.variables.dx_txtMobileNo.option("value", "");
                }
            }
        }).dxAutocomplete("instance");
        GeneralExpenceView.variables.dx_btnSubmitShare = $("#dx_btnSubmitShare").dxButton({
            stylingMode: "outlined",
            icon: "fa fa-paper-plane",
            text: "Send",
            type: "default",
            useSubmitBehavior: false,
            visible: true,
            onClick: function (e) {
                GeneralExpenceView.SharingDetails();
            }
        }).dxButton("instance");
        GeneralExpenceView.variables.dx_RadioSocial = $("#dx_RadioSocial").dxRadioGroup({
            items: ["WhatsApp", "SMS", "E-Mail"],
            layout: "horizontal",
            value: "WhatsApp",
            onValueChanged: function (e) {
                if (e.value == "E-Mail") {
                    $(".MobileShare").hide();
                    $(".EmailSharing").show();
                }
                else {
                    $(".EmailSharing").hide();
                    $(".MobileShare").show();
                }
            }
        }).dxRadioGroup("instance");
        GeneralExpenceView.variables.dx_txtMobileNo = $("#dx_txtMobileNo").dxTextBox({ mode: "number" }).dxTextBox("instance");
        GeneralExpenceView.variables.dx_txtShareMessage = $("#dx_txtShareMessage").dxTextArea({
            height: 90,
            value: 'Dear Sir, ' + $("#hdn_UserName").val() + ' shared a design from TrinityJewells with you. Kindly click on below URL to view shared Design. {SHARE URL}',
        }).dxTextArea("instance");
        GeneralExpenceView.variables.dx_txtSharingSubject = $("#dx_txtSharingSubject").dxTextBox({
            value: "Jewellery Designs shared by TrinityJewells"
        }).dxTextBox("instance");
        GeneralExpenceView.variables.dx_txtSharingEmailId = $("#dx_txtSharingEmailId").dxTextBox({ placeholder: "Enter Email Id..." }).dxTextBox("instance");
        GeneralExpenceView.variables.dx_txtSharingEmailBody = $("#dx_txtSharingEmailBody").dxHtmlEditor({
            height: 350,
            toolbar: {
                items: [
                    "undo", "redo", "separator",
                    {
                        formatName: "size",
                        formatValues: ["8pt", "10pt", "12pt", "14pt", "18pt", "24pt", "36pt"]
                    },
                    {
                        formatName: "font",
                        formatValues: ["Arial", "Courier New", "Georgia", "Impact", "Lucida Console", "Tahoma", "Times New Roman", "Verdana"]
                    },
                    "separator",
                    "bold", "italic", "strike", "underline", "separator",
                    "alignLeft", "alignCenter", "alignRight", "alignJustify", "separator",
                    "color", "background"
                ]
            },
            mediaResizing: {
                enabled: true
            },
            value: GeneralExpenceView.variables.content,
            onValueChanged: function (e) {
                //$(".value-content").text(e.component.option("value"));
            }
        }).dxHtmlEditor("instance");
        /*----------------------------/ Sharing Modal--------------------------*/
    },

    initializeDevExgrid: function () {
        GeneralExpenceView.variables.dx_dataGrid = $("#dx_dataGrid").dxDataGrid({
            dataSource: new DevExpress.data.CustomStore({
                key: "expenseid",
                load: function (loadOptions) {
                    var deferred = $.Deferred();

                    var result = DevExVariables.GetDataList(loadOptions, GeneralExpenceView.variables.BindMainGridListUrl);

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
            columns: [{ dataField: "expenseid", allowFiltering: false, allowSorting: true, sortIndex: 1, sortOrder: "desc", visible: false },
                { dataField: "voucherno", caption: "Voucher No", dataType: "string", filterOperations: ["contains"], allowSorting: true, allowFiltering: true, allowHeaderFiltering: false },
                { dataField: "subbook", caption: "Sub Book", dataType: "string", filterOperations: ["contains"], allowSorting: true, allowFiltering: true, allowHeaderFiltering: false },
                { dataField: "vouchertype", caption: "Voucher Type", dataType: "string", filterOperations: ["contains"], allowSorting: true, allowFiltering: true, allowHeaderFiltering: false },
                { dataField: "voucherdate", caption: "payment Date", dataType: "string", filterOperations: ["contains"], allowSorting: true, allowFiltering: true, allowHeaderFiltering: false },
                { dataField: "accountname", caption: "Expense Acc", dataType: "string", filterOperations: ["contains"], allowSorting: true, allowFiltering: true, allowHeaderFiltering: false },
                { dataField: "partyaccname", caption: "Party Acc", dataType: "string", filterOperations: ["contains"], allowSorting: true, allowFiltering: true, allowHeaderFiltering: false },
                { dataField: "partybillno", caption: "PartyBill No", dataType: "string", filterOperations: ["contains"], allowSorting: true, allowFiltering: true, allowHeaderFiltering: false },
                { dataField: "partycurcode", caption: "ExpenseAcc Cur", dataType: "string", filterOperations: ["contains"], allowSorting: true, allowFiltering: true, allowHeaderFiltering: false },
                { dataField: "exchangerate", caption: "Exchange Rate", dataType: "number", filterOperations: ["contains"], allowSorting: true, allowFiltering: true, allowHeaderFiltering: false },
                { dataField: "remark", caption: "Remark", dataType: "number", filterOperations: ["contains"], allowSorting: false, allowFiltering: false, allowHeaderFiltering: false },
                { dataField: "totaltaxableamt", caption: "Amount", dataType: "number", filterOperations: ["contains"], allowSorting: false, allowFiltering: true, allowHeaderFiltering: false },
                {
                    dataField: "isverify", caption: "Is Verify", dataType: "string", alignment: "center", filterOperations: ["contains"],
                    allowSorting: false, allowFiltering: false, allowHeaderFiltering: true,
                    headerFilter: {
                        dataSource: [{
                            text: "Verified",
                            value: ["isverify", "equals", 1]
                        }, {
                            text: "Declined",
                            value: ["isverify", "equals", 0]
                        }]
                    },
                    cellTemplate: function (container, options) {
                        if (getIsAllowedVerify()) {
                            $("<div>").dxSwitch({
                                value: options.value,
                                switchedOnText: "Verified",
                                switchedOffText: "Declined",
                                width: '60px',
                                onValueChanged: function (data) {
                                    GeneralExpenceView.EditFromGrid(data.value, options.key, 'Verify');
                                }
                            }).appendTo(container);
                        }
                        else
                            DevExVariables.LabelTemplate(container, options);
                    }
                },
                {
                    dataField: "issignatured", caption: "Sign", dataType: "string", alignment: "center", allowSorting: false, allowFiltering: false, allowHeaderFiltering: false,
                    cellTemplate: function (container, options) {
                        var temp = "";
                        if (options.displayValue == "1") {
                            temp = '<i class="icon-checkmark4" style="color: #4caf50;"></i>';
                        }
                        $(temp).appendTo(container);
                    }
                },
                {
                    dataField: "Action", caption: "Action", alignment: "center", allowFiltering: false, allowSorting: false, fixed: true, fixedPosition: "right",
                    cellTemplate: function (container, options) {
                        DevExVariables.ActionTemplate(container, options, true, true, "GeneralExpenceView", "Attachments,Share,Pdf", "GeneralExpense");
                    }
                },
            ]
        }).dxDataGrid("instance");
    },

    btnMasterSubmit: function () {

        //---------------------- Cashbank Currency And Expense Acc Currency Same Condition-----------------------------------------------------
        //if (GeneralExpenceView.variables.dx_PartyAcc.option().selectedItem.currencyid != GeneralExpenceView.variables.dx_ExpenseAcc.option().selectedItem.currencyid) {
        //    DevExVariables.Toaster("warning", "cash/bank account currency and Expense account currency is not same.");
        //    return;
        //}
        //---------------------- /Cashbank Currency And Expense Acc Currency Same Condition-----------------------------------------------------


        GeneralExpenceView.variables.dx_btnSubmit.option({ disabled: true });

        GeneralExpenceView.variables.Oper = 'Add';
        GeneralExpenceView.variables.addedit = "added";
        if (GeneralExpenceView.variables.Masterid != "0" && parseInt(GeneralExpenceView.variables.Masterid) > 0) {
            GeneralExpenceView.variables.Oper = 'Edit';
            GeneralExpenceView.variables.addedit = 'updated';
        }

        var xmlNodeList = '<DETAILSLIST>';
        $.each(GeneralExpenceView.variables.DetailsControlsList, function (key, obj) {
            if (obj) {
                if (obj.dx_txtItemName.option().value) {
                    xmlNodeList += '<DETAILS>';
                    xmlNodeList += '<SRNO>' + obj.srno + '</SRNO>';
                    xmlNodeList += '<ITEMID>' + obj.dx_txtItemName.option().selectedItem.itemid + '</ITEMID>';
                    xmlNodeList += '<SUBCATEID>' + obj.dx_txtItemName.option().selectedItem.rmsubcateid + '</SUBCATEID>';
                    xmlNodeList += '<HSNCODE>' + obj.dx_txtItemName.option().selectedItem.hsncode + '</HSNCODE>';


                    if (obj.dx_WarrantyDate.option().value)
                        xmlNodeList += '<WARRANTYDATE>' + obj.dx_WarrantyDate.option().text + '</WARRANTYDATE>';

                    if (obj.dx_Quantity.option().value)
                        xmlNodeList += '<QUANTITY>' + obj.dx_Quantity.option().value + '</QUANTITY>';

                    if (obj.dx_Weight.option().value)
                        xmlNodeList += '<WEIGHT>' + obj.dx_Weight.option().value + '</WEIGHT>';

                    if (obj.dx_Rate.option().value)
                        xmlNodeList += '<RATE>' + obj.dx_Rate.option().value + '</RATE>';

                    if (obj.dx_ddlUnit.option().value)
                        xmlNodeList += '<UNIT>' + obj.dx_ddlUnit.option().value + '</UNIT>';

                    if (obj.dx_Discount.option().value)
                        xmlNodeList += '<DISCOUNT>' + obj.dx_Discount.option().value + '</DISCOUNT>';

                    if (obj.dx_TotalAmt.option().value)
                        xmlNodeList += '<TOTALTAXABLE>' + obj.dx_TotalAmt.option().value + '</TOTALTAXABLE>';

                    if (obj.dx_TotalTax.option().value)
                        xmlNodeList += '<TOTALTAX>' + obj.dx_TotalTax.option().value + '</TOTALTAX>';

                    if (obj.dx_AmtWithTax.option().value)
                        xmlNodeList += '<TOTALAMTWITHTAX>' + obj.dx_AmtWithTax.option().value + '</TOTALAMTWITHTAX>';

                    xmlNodeList += '</DETAILS>';
                }
            }
        });
        xmlNodeList += '</DETAILSLIST>';

        xmlNodeList += '<TAXDETAILLIST>';
        $.each(GeneralExpenceView.variables.taxlist, function (key, obj) {
            if (obj) {
                xmlNodeList += '<TAXDETAILS>';

                xmlNodeList += '<SRNO>' + obj.rownum + '</SRNO>';
                xmlNodeList += '<HSNCODEID>' + obj.HSNCodeId + '</HSNCODEID>';
                xmlNodeList += '<HSNCODE>' + obj.HSNCode + '</HSNCODE>';
                xmlNodeList += '<TAXABLEAMT>' + obj.TaxableAmt + '</TAXABLEAMT>';
                xmlNodeList += '<TAXID>' + obj.TaxId + '</TAXID>';
                xmlNodeList += '<TAXNAME>' + obj.TaxName + '</TAXNAME>';
                xmlNodeList += '<TAXVALUE>' + obj.TaxValue + '</TAXVALUE>';
                xmlNodeList += '<TAXVALUEIN>' + obj.TaxValueIn + '</TAXVALUEIN>';
                xmlNodeList += '<TAXAMT>' + obj.TaxAmt + '</TAXAMT>';

                xmlNodeList += '</TAXDETAILS>';
            }

        });
        xmlNodeList += '</TAXDETAILLIST>';

        xmlNodeList += "<FILELIST>";
        var saveFiles = "";
        $("#tbody_AttachmentsList tr").each(function (key, obj) {
            xmlNodeList += '<FILE>';
            var FilePath = $(obj).find(".FilePath a").attr("href");
            saveFiles += FilePath + ",";
            xmlNodeList += '<FILENAME>' + FilePath.substring(FilePath.lastIndexOf("/") + 1) + '</FILENAME>';
            xmlNodeList += '<DESCRIPTION>' + $(obj).find(".Description input").val() + '</DESCRIPTION>';
            xmlNodeList += '</FILE>';
        });
        xmlNodeList += "</FILELIST>";


        var data = {
            "EXPENSEID": GeneralExpenceView.variables.Masterid,
            "SBOOKID": GeneralExpenceView.variables.dx_bookType.option().selectedItem.sbookid,
            "VOUCHERNO": GeneralExpenceView.variables.dx_VchrNo.option().value,
            "VOUCHERDATE": GeneralExpenceView.variables.dx_txtVoucherDate.option().text,
            "VOUCHERTYPE": GeneralExpenceView.variables.dx_ddlVoucherType.option().value,
            "DUEDAYS": GeneralExpenceView.variables.dx_txtDueDays.option().value,
            //"DUEDATE": GeneralExpenceView.variables.dx_txtDueDate.option().text,
            "EXPENSEACCID": GeneralExpenceView.variables.dx_ExpenseAcc.option().selectedItem.accid,
            "EXPENSECURRENYID": GeneralExpenceView.variables.dx_ExpenseAcc.option().selectedItem.currencyid,
            "PARTYACCID": GeneralExpenceView.variables.dx_PartyAcc.option().selectedItem.accid,
            "PARTYCURRENCYID": GeneralExpenceView.variables.dx_PartyAcc.option().selectedItem.currencyid,
            "EXCHANGERATE": GeneralExpenceView.variables.dx_txtExchangeRate.option().value,
            "TAXPROFILEID": GeneralExpenceView.variables.dx_taxProfile.option().value,
            //"PARTYBILLNO": GeneralExpenceView.variables.dx_txtBillNo.option().value,
            //"REMARK": GeneralExpenceView.variables.dx_txtRemarks.option().value,
            "TOTALTAXABLEAMT": GeneralExpenceView.variables.txtTaxableAmount.option().value,
            "TOTALTAXABLEAMTINRS": (GeneralExpenceView.variables.txtTaxableAmount.option().value * GeneralExpenceView.variables.dx_txtExchangeRate.option().value).toFixed(2),
            "TOTALTAXAMT": GeneralExpenceView.variables.txtTotalAmount.option().value - GeneralExpenceView.variables.txtTaxableAmount.option().value,
            "TOTALAMTWITHTAX": GeneralExpenceView.variables.txtTotalAmount.option().value,
            "TOTALAMTWITHTAXINRS": (GeneralExpenceView.variables.txtTotalAmount.option().value * GeneralExpenceView.variables.dx_txtExchangeRate.option().value).toFixed(2),
            "ROUNDOFFTYPE": $("[name='rd_RoundOff']:checked").val(),
            "ROUNDOFFVALUE": GeneralExpenceView.variables.txtRoundOff.option().value,
            "TOTALBILLAMT": GeneralExpenceView.variables.txtTotalAmount.option().value,
            "TOTALBILLAMTINRS": GeneralExpenceView.variables.txtTotalAmountinRs.option().value,
            XMLPARAM: escape(xmlNodeList),
            "oper": GeneralExpenceView.variables.Oper,
        }

        $.ajax({
            type: 'POST',
            async: false,
            cache: false,
            url: getDomain() + "/Common/SaveImage",
            data: {
                category: "GeneralExpense",
                deletedfiles: GeneralExpenceView.variables.deletedFiles,
                savefiles: saveFiles
            },
            success: function (result) {
            },
            error: OnError
        });
        //-----------------------/save attachment-------------------------

        if (GeneralExpenceView.variables.dx_txtBillNo.option().value)
            data.PARTYBILLNO = GeneralExpenceView.variables.dx_txtBillNo.option().value;

        if (GeneralExpenceView.variables.dx_txtRemarks.option().value)
            data.REMARK = GeneralExpenceView.variables.dx_txtRemarks.option().value;

        GeneralExpenceView.savedata(data);

    },

    savedata: function (data) {
        $.ajax({
            url: getDomain() + GeneralExpenceView.variables.PerformMasterOperationUrl,
            data: data,
            async: true,
            cache: false,
            type: 'POST',
            beforeSend: function () {
                dx_LoaderTrinity.show();
            },
            complete: function () {
                dx_LoaderTrinity.hide();
                GeneralExpenceView.variables.dx_btnSubmit.option({ disabled: false });
            },
            success: GeneralExpenceView.btnMasterSubmitOnSuccess,
            error: OnError,
        });
    },

    btnMasterSubmitOnSuccess: function (data) {
        if ($(data).find('RESPONSECODE').text() == "0") {
            DevExVariables.Toaster("success", 'Record is Added successfully.');
            $("#frm_Purchase_Expence").hide();
            $("#pnlView").show();
            DevExpress.validationEngine.resetGroup("GeneralExpence");
            GeneralExpenceView.ClearValues();
            GeneralExpenceView.variables.dx_dataGrid.refresh();
        }
        else {
            DevExVariables.InvalidResponseCode(data);
        }
    },

    triggerId: function (id) {
        var rowData = GeneralExpenceView.variables.dx_dataGrid.getVisibleRows()[GeneralExpenceView.variables.dx_dataGrid.getRowIndexByKey(+id)].data;

        GeneralExpenceView.variables.Masterid = id;
        GeneralExpenceView.variables.dx_bookType.option({ value: rowData.sbookid });
        GeneralExpenceView.variables.dx_txtVoucherDate.option({ value: rowData.voucherdate });
        GeneralExpenceView.variables.dx_VchrNo.option({ value: rowData.voucherno });
        GeneralExpenceView.variables.dx_ddlVoucherType.option({ value: rowData.vouchertype });
        GeneralExpenceView.variables.dx_ddlVoucherType.option({ disabled: true });
        GeneralExpenceView.variables.dx_txtDueDays.option({ value: rowData.duedays });
        //GeneralExpenceView.variables.dx_txtDueDate.option({ value: rowData.duedate });
        GeneralExpenceView.variables.dx_ExpenseAcc.option({
            items: [{ accid: rowData.expenseaccid, accountname: rowData.accountname, currencycode: rowData.expensecurcode, currencyid: rowData.expensecurrenyid }],
            selectedItem: { accid: rowData.expenseaccid, accountname: rowData.accountname, currencycode: rowData.expensecurcode, currencyid: rowData.expensecurrenyid },
            value: rowData.accountname
        });
        GeneralExpenceView.variables.dx_PartyAcc.option({
            items: [{ accid: rowData.partyaccid, accountname: rowData.partyaccname, currencycode: rowData.partycurcode, currencyid: rowData.partycurrencyid }],
            selectedItem: { accid: rowData.partyaccid, accountname: rowData.partyaccname, currencycode: rowData.partycurcode, currencyid: rowData.partycurrencyid },
            value: rowData.partyaccname
        });
        GeneralExpenceView.BindAccountBalance();
        GeneralExpenceView.BindAccountReceiveBalance();
        $("#spanExpenseCurr").html(GeneralExpenceView.variables.dx_ExpenseAcc.option().selectedItem.currencycode);
        $("#spanReceiveCurr").html(GeneralExpenceView.variables.dx_PartyAcc.option().selectedItem.currencycode);
        GeneralExpenceView.variables.dx_txtExchangeRate.option({ value: rowData.exchangerate });
        GeneralExpenceView.variables.dx_taxProfile.option({ value: rowData.taxprofileid });
        GeneralExpenceView.variables.dx_txtBillNo.option({ value: rowData.partybillno });
        GeneralExpenceView.variables.dx_txtRemarks.option({ value: rowData.remark });
        GeneralExpenceView.variables.txtTaxableAmount.option({ value: rowData.totaltaxableamt.toFixed(2) });
        GeneralExpenceView.variables.txtAmountWithTax.option({ value: rowData.totalamtwithtax.toFixed(2) });
        GeneralExpenceView.variables.txtRoundOff.option({ value: rowData.roundoffvalue.toFixed(2) });
        GeneralExpenceView.variables.txtTotalAmount.option({ value: rowData.totalbillamt.toFixed(2) });
        GeneralExpenceView.variables.txtTotalAmountinRs.option({ value: rowData.totalamtwithtax.toFixed(2) });
        //if (rowData.virtualfilename) {
        //    $("#lnkAttachFilePreview").attr("FileName", "/UploadFiles/GeneralExpense/" + rowData.virtualfilename);
        //    $("#lnkAttachFilePreview").html(rowData.actualfilename);
        //    $("#hdnOldAttachFile").val("/UploadFiles/GeneralExpense/" + rowData.virtualfilename);
        //}
       
        if (GeneralExpenceView.variables.dx_PartyAcc.option().selectedItem.currencycode == "INR")
          GeneralExpenceView.variables.dx_txtExchangeRate.option({ disabled: true });

        if (rowData.roundofftype == "Add")
            $("#rd_Add").prop("checked", true);
        else
            $("#rd_Less").prop("checked", true);
        GeneralExpenceView.variables.dx_bookType.option({ disabled: true });


        //---------------------------------------------Get GeneralExpense Details----------------------------------------------------

        var myfilter = { rules: [] };
        myfilter.rules.push({ field: "ExpenseId", op: "eq", data: id });
        $.ajax({
            url: getDomain() + "/Common/BindMastersDetails?ServiceName=ACC_GENERALEXPANSE_DETAIL_GET&myfilters=" + JSON.stringify(myfilter),
            async: false,
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
                        //var TotalBillAmt = 0, TotalPaidAmt = 0, TotalPendingAmt = 0;
                        $.each(List, function (key, obj) {
                            GeneralExpenceView.AddNewLineDetails(obj);
                            if (obj.taxdetaillist) {
                                var tempTaxList = [];
                                if (obj.taxdetaillist.taxdetails.length) {
                                    tempTaxList = obj.taxdetaillist.taxdetails;
                                }
                                else {
                                    tempTaxList.push(obj.taxdetaillist.taxdetails);
                                }

                                $.each(tempTaxList, function (key1, obj1) {
                                    GeneralExpenceView.variables.taxlist.push({
                                        rownum: key + 1,
                                        HSNCodeId: obj1.hsncodeid,
                                        HSNCode: obj1.hsncode,
                                        TaxableAmt: obj1.taxableamt,
                                        TaxId: obj1.taxid,
                                        TaxName: obj1.taxname,
                                        TaxValue: obj1.taxvalue,
                                        TaxValueIn: obj1.taxvaluein,
                                        TaxAmt: obj1.taxamt
                                    });
                                });
                            }
                        });
                        //GeneralExpenceView.variables.txtTotalBillAmount.option({ value: TotalBillAmt.toFixed(2) });
                        //GeneralExpenceView.variables.txtPaidAmount.option({ value: TotalPaidAmt.toFixed(2) });
                        //GeneralExpenceView.variables.txtPandingAmount.option({ value: TotalPendingAmt.toFixed(2) });

                        //GeneralExpenceView.GetpaidAmount();
                    }
                }
                else {
                    DevExVariables.InvalidResponseCode(data);
                }
            },
            error: OnError
        });
        //---------------------------------------------/Get GeneralExpense Details----------------------------------------------------

        GeneralExpenceView.EndingTotalAmount();
        //GeneralExpenceView.CalcItemwiseAmt();

        //----------------------------------------------Get Attachment in Edit Time-------------------------------------------------
        $("#AttachmentsList").show();
        $('#tbody_AttachmentsList').html("");
        var myfilter = { rules: [] };
        myfilter.rules.push({ field: "ExpenseId", op: "eq", data: id });
        $.ajax({
            url: getDomain() + "/Common/BindMastersDetails?ServiceName=ACC_GENERALEXPANSE_FILES_GET&myfilters=" + JSON.stringify(myfilter),
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

                        $.each(List, function (key, obj) {
                            var file = (obj.filename).split(".")[0];
                            $('#tbody_AttachmentsList').append('<tr id="' + file + '" fileid="' + obj.fileid + '" >' +
                                '<td class="FilePath text-center">' +
                                    '<a class="btn btn-info" href="' + getDomain() + '/UploadFiles/GeneralExpense/' + obj.filename + '" target="blank"><i class="fa fa-eye"></i></a>' +
                                '</td>' +
                                '<td class="Description">' +
                                    '<input type="text" class="form-control" value="' + obj.description + '" placeholder="Description">' +
                                '</td>' +
                                '<td class="text-center">' +
                                    '<a href="javascript:void(0);" onclick="GeneralExpenceView.deleteAttachment(\'' + file + '\',\'' + obj.filename + '\');" class="btn btn-danger"><i class="fa fa-trash"></i></a>' +
                                '</td>' +
                            '</tr>');
                        });
                    }
                }
                else {
                    DevExVariables.InvalidResponseCode(data);
                }
            },
            error: OnError
        });
        //----------------------------------------------/Get Attachment in Edit Time-------------------------------------------------


        $("#frm_Purchase_Expence").show();
        $("#pnlView").hide();
        if (isU()) {
            GeneralExpenceView.variables.dx_btnSubmit.option({ visible: true });
        }
        else {
            GeneralExpenceView.variables.dx_btnSubmit.option({ visible: false });
        }

    },

    deleteRow: function (id) {
        var rowData = GeneralExpenceView.variables.dx_dataGrid.getVisibleRows()[GeneralExpenceView.variables.dx_dataGrid.getRowIndexByKey(+id)].data;
        GeneralExpenceView.variables.Masterid = id;
        GeneralExpenceView.variables.DeleteDataObj = rowData;
        GeneralExpenceView.variables.Oper = "Delete";

        if (GeneralExpenceView.variables.dx_popupRecordDelete) {
            GeneralExpenceView.variables.dx_popupRecordDelete.option("contentTemplate", GeneralExpenceView.variables.DeletePopUpOptions.contentTemplate(GeneralExpenceView.variables.DeleteDataObj).bind(this));
        }
        else {
            GeneralExpenceView.variables.dx_popupRecordDelete = $("#dx_popupRecordDelete").dxPopup(GeneralExpenceView.variables.DeletePopUpOptions).dxPopup("instance");
        }

        GeneralExpenceView.variables.dx_popupRecordDelete.show();
    },

    ClearValues: function () {
        GeneralExpenceView.variables.Masterid = "";
        GeneralExpenceView.variables.Oper = 'Add';
        GeneralExpenceView.variables.addedit = "added";
        GeneralExpenceView.variables.DeleteDataObj = "";
        GeneralExpenceView.variables.dx_bookType.option("value", "");
        GeneralExpenceView.variables.dx_bookType.option({ disabled: false });
        GeneralExpenceView.variables.dx_txtVoucherDate.option({ value: new Date() });
        GeneralExpenceView.variables.dx_VchrNo.option("value", "");
        //GeneralExpenceView.variables.dx_ddlVoucherType.option("value", "");
        GeneralExpenceView.variables.dx_txtDueDays.option("value", "");
        //GeneralExpenceView.variables.dx_txtDueDate.option("value", "");
        GeneralExpenceView.variables.dx_ExpenseAcc.option("value", "");
        GeneralExpenceView.variables.dx_PartyAcc.option("value", "");
        GeneralExpenceView.variables.dx_txtRemarks.option("value", "");
        GeneralExpenceView.variables.dx_taxProfile.option("value", "");
        GeneralExpenceView.variables.dx_txtBillNo.option("value", "");
        GeneralExpenceView.variables.dx_txtExchangeRate.option("value", "");
        GeneralExpenceView.variables.txtTaxableAmount.option("value", "");
        GeneralExpenceView.variables.txtAmountWithTax.option("value", "");
        GeneralExpenceView.variables.txtRoundOff.option("value", "");
        GeneralExpenceView.variables.txtTotalAmount.option("value", "");
        GeneralExpenceView.variables.txtTotalAmountinRs.option("value", "");
        GeneralExpenceView.variables.dx_btnSubmit.option({ visible: true });
        GeneralExpenceView.variables.dx_txtExchangeRate.option({ disabled: false });


        $("#spanExpenseCurr").html("");
        $("#spanReceiveCurr").html("");
        $("#dx_FooterTotalTaxable").html("");
        $("#dx_FooterTotaltax").html("");
        $("#dx_FooterTotalAmtWithtax").html("");

        DevExpress.validationEngine.resetGroup("GeneralExpence");
        GeneralExpenceView.variables.taxlist = [];
        GeneralExpenceView.variables.taxprofilelist = [];
        GeneralExpenceView.variables.DetailsControlsList = [],
        GeneralExpenceView.variables.RowCount = 1;
        GeneralExpenceView.variables.deletedFiles = "";
        $(".divTax").remove();
        $("#frm_Purchase_Expence").hide();
        $("#pnlView").show();
        $("#tbl_DesignDetails tbody").html("");
        $("#tbody_AttachmentsList").html("");
        GeneralExpenceView.variables.dx_ddlVoucherType.option({ value: GeneralExpenceView.variables.VoucherTypeList[1] });
        GeneralExpenceView.variables.dx_ddlVoucherType.option({ disabled: false });
        $("#btnAddSelectionList").html("0.00");
        $("#btnAddSelectionRecieveList").html("0.00");


        GeneralExpenceView.variables.dx_dataGrid.refresh();

    },

    BindTaxProfile: function () {
        var myfilter = { rules: [] };
        myfilter.rules.push({ field: "ISACTIVE", op: "eq", data: true });

        $.ajax({
            url: getDomain() + GeneralExpenceView.variables.BindTaxProfile + "&IsRecordAll=true&myfilters=" + JSON.stringify(myfilter),
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

                        GeneralExpenceView.variables.dx_taxProfile.option({
                            dataSource: new DevExpress.data.ArrayStore({
                                data: List,
                                key: "taxprofileid"
                            }),
                            displayExpr: "taxprofilename",
                            valueExpr: "taxprofileid",
                            value: List.filter(function (x) { return x.isdefault == 1 })
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

    BindSubBookList: function () {
        var myfilter = { rules: [] };
        myfilter.rules.push({ field: "TYPE", op: "eq", data: "AccSubBook" });
        myfilter.rules.push({ field: "SUBBOOKTYPE", op: "eq", data: 'GENERAL,SERVICES' });
        myfilter.rules.push({ field: "ONLYALLOWED", op: "eq", data: true });

        $.ajax({
            url: getDomain() + GeneralExpenceView.variables.BindStaticDataUrl + "&myfilters=" + JSON.stringify(myfilter),
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

                        GeneralExpenceView.variables.dx_bookType.option({
                            dataSource: new DevExpress.data.ArrayStore({
                                data: List,
                                key: "sbookid"
                            }),
                            displayExpr: "subbook",
                            valueExpr: "sbookid"
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

    AddNewLineDetails: function (obj) {
        var postfix = GeneralExpenceView.variables.RowCount;

        $("#GeneralExpenseTBody").append(
                '<tr rowno="' + postfix + '">'
                    + '<td class="TableRowNo"></td>'
                    + '<td>'
                        + '<div id="dx_txtItemName' + postfix + '" ></div>'
                    + '</td>'
                    + '<td class="ItemType">' + (obj ? obj.category : "") + '</td>'
                    + '<td class="HSNCode">' + (obj ? obj.hsncode : "") + '</td>'
                    + '<td>'
                        + '<div id="dx_WarrantyDate' + postfix + '" ></div>'
                    + '</td>'
                    + '<td>'
                        + '<div id="dx_Quantity' + postfix + '" ></div>'
                    + '</td>'
                    + '<td>'
                        + '<div id="dx_Weight' + postfix + '" ></div>'
                    + '</td>'
                    + '<td>'
                        + '<div id="dx_Rate' + postfix + '" ></div>'
                    + '</td>'
                    + '<td>'
                        + '<div id="dx_ddlUnit' + postfix + '" ></div>'
                    + '</td>'
                    + '<td>'
                       + '<div id="dx_Discount' + postfix + '" ></div>'
                    + '</td>'
                    + '<td>'
                        + '<div id="dx_TotalAmt' + postfix + '" ></div>'
                    + '</td>'
                    + '<td>'
                        + '<div id="dx_TotalTax' + postfix + '" ></div>'
                    + '</td>'
                    + '<td>'
                        + '<div id="dx_AmtWithTax' + postfix + '" ></div>'
                    + '</td>'
                    + '<td class="text-center">'
                        + '<span class="btn btn-danger" onClick="GeneralExpenceView.RemoveDetailRow(this)"><i class="fa fa-trash-o"></i></span>'
                    + '</td>'
                + '</tr>'
            );

        /*----------------------Registration of Detail table controls---------------------*/
        GeneralExpenceView.DetailTableFormInit(postfix, obj);
        /*----------------------Registration of Detail table controls---------------------*/

        GeneralExpenceView.variables.RowCount = postfix + 1;
    },

    DetailTableFormInit: function (postfix, obj) {
        /*----------------------Registration of Detail table controls---------------------*/
        var tmp = [];
        tmp[postfix] = { srno: postfix, dx_txtItemName: "", dx_ddlUnit: "", dx_WarrantyDate: "", dx_Quantity: "", dx_Weight: "", dx_Rate: "", dx_Discount: "", dx_TotalAmt: "", dx_TotalTax: "", dx_AmtWithTax: "" };

        GeneralExpenceView.variables.DetailsControlsList = Object.assign(GeneralExpenceView.variables.DetailsControlsList, tmp);

        GeneralExpenceView.variables.DetailsControlsList[postfix].dx_txtItemName = $("#dx_txtItemName" + postfix).dxAutocomplete({
            dataSource: GeneralExpenceView.variables.ItemList,
            placeholder: "Item Name...",
            valueExpr: "itemname",
            onItemClick: function (data) {
                //GeneralExpenceView.ToasterSelectTaxProfile();
                if (data.component.option().selectedItem) {
                    $("[rowno='" + postfix + "']").find('.ItemType').html(data.component.option().selectedItem.rmsubcate)
                    $("[rowno='" + postfix + "']").find('.HSNCode').html(data.component.option().selectedItem.hsncode)
                }
                GeneralExpenceView.CalcItemwiseAmt(postfix);
            },
        }).dxValidator({
            validationGroup: "GeneralExpence",
            validationRules: [{
                type: "required",
                message: "Item Name is required"
            }]
        }).dxAutocomplete("instance");

        GeneralExpenceView.variables.DetailsControlsList[postfix].dx_ddlUnit = $("#dx_ddlUnit" + postfix).dxSelectBox({
            dataSource: ['Kg', 'Gram', 'Meter', 'Feet', 'Pices', 'Dozen', 'Fix'],
            placeholder: "Select Unit...",
            searchEnabled: true,
            onItemClick: function (data) {
                GeneralExpenceView.CalcItemwiseAmt(postfix);
            },
            onFocusOut: function (data) {
            },
        }).dxValidator({
            validationGroup: "GeneralExpence",
            validationRules: [{
                type: "required",
                message: "Unit is required"
            }]
        }).dxSelectBox("instance");

        GeneralExpenceView.variables.DetailsControlsList[postfix].dx_WarrantyDate = $("#dx_WarrantyDate" + postfix).dxDateBox({
            type: "date",
            //value: now,
            showClearButton: true,
            useMaskBehavior: true,
            displayFormat: "dd MMM yyyy"
        }).dxValidator({
            validationGroup: "GeneralExpence",
            validationRules: [{
                type: "required",
                message: "WarrantyDate is required"
            }]
        }).dxDateBox("instance");

        GeneralExpenceView.variables.DetailsControlsList[postfix].dx_Quantity = $("#dx_Quantity" + postfix).dxTextBox({
            mode: "number",
            onKeyDown: function (e) {
            },
            onFocusOut: function (data) {
                GeneralExpenceView.CalcItemwiseAmt(postfix);
            },
        }).dxValidator({
            validationGroup: "GeneralExpence",
            validationRules: [{
                type: "required",
                message: "Quantity is required"
            }]
        }).dxTextBox("instance");

        GeneralExpenceView.variables.DetailsControlsList[postfix].dx_Weight = $("#dx_Weight" + postfix).dxTextBox({
            mode: "number",
            onKeyDown: function (e) {
            },
            onFocusOut: function (data) {
                GeneralExpenceView.CalcItemwiseAmt(postfix);
            },
        }).dxValidator({
            validationGroup: "GeneralExpence",
            validationRules: [{
                type: "required",
                message: "Weight is required"
            }]
        }).dxTextBox("instance");

        GeneralExpenceView.variables.DetailsControlsList[postfix].dx_Rate = $("#dx_Rate" + postfix).dxTextBox({
            mode: "number",
            onKeyDown: function (e) {
            },
            onFocusOut: function (data) {
                GeneralExpenceView.CalcItemwiseAmt(postfix);
            },
        }).dxValidator({
            validationGroup: "GeneralExpence",
            validationRules: [{
                type: "required",
                message: "Rate is required"
            }]
        }).dxTextBox("instance");

        GeneralExpenceView.variables.DetailsControlsList[postfix].dx_Discount = $("#dx_Discount" + postfix).dxTextBox({
            mode: "number",
            onKeyDown: function (e) {
            },
            onFocusOut: function (data) {
                GeneralExpenceView.CalcItemwiseAmt(postfix);
            },
        }).dxTextBox("instance");

        GeneralExpenceView.variables.DetailsControlsList[postfix].dx_TotalAmt = $("#dx_TotalAmt" + postfix).dxTextBox({
            readOnly: true,
            mode: "number",
        }).dxValidator({
            validationRules: [{
                type: "required",
                message: "Pcs is required"
            }]
        }).dxTextBox("instance");

        GeneralExpenceView.variables.DetailsControlsList[postfix].dx_TotalTax = $("#dx_TotalTax" + postfix).dxTextBox({
            readOnly: true,
            mode: "number",
            onKeyDown: function (e) {
            },
            onFocusOut: function (data) {
            },
        }).dxValidator({
            validationRules: [{
                type: "required",
                message: "Width is required"
            }]
        }).dxTextBox("instance");

        GeneralExpenceView.variables.DetailsControlsList[postfix].dx_AmtWithTax = $("#dx_AmtWithTax" + postfix).dxTextBox({
            readOnly: true,
            mode: "number",
            onKeyDown: function (e) {
            },
            onFocusOut: function (data) {
            },
        }).dxValidator({
            validationRules: [{
                type: "required",
                message: "Width is required"
            }]
        }).dxTextBox("instance");

        /*----------------------Registration of Detail table controls---------------------*/

        /*----------------------Set Value of Detail table controls while Edit---------------------*/
        if (obj) {
            GeneralExpenceView.variables.DetailsControlsList[postfix].dx_txtItemName.option({
                items: [{
                    itemid: obj.itemid,
                    itemname: obj.itemname,
                    rmsubcateid: obj.subcateid,
                    rmsubcate: obj.category,
                    hsncode: obj.hsncode,
                    taxdetaillist: obj.taxdetaillist
                }],
                selectedItem: {
                    itemid: obj.itemid,
                    itemname: obj.itemname,
                    rmsubcateid: obj.subcateid,
                    rmsubcate: obj.category,
                    hsncode: obj.hsncode,
                    taxdetaillist: obj.taxdetaillist
                },
                value: obj.itemname
            });
            GeneralExpenceView.variables.DetailsControlsList[postfix].dx_ddlUnit.option({ value: obj.unit })
            GeneralExpenceView.variables.DetailsControlsList[postfix].dx_WarrantyDate.option({ value: obj.warrantydate })
            GeneralExpenceView.variables.DetailsControlsList[postfix].dx_Quantity.option({ value: obj.quantity });
            GeneralExpenceView.variables.DetailsControlsList[postfix].dx_Weight.option({ value: obj.weight });
            GeneralExpenceView.variables.DetailsControlsList[postfix].dx_Rate.option({ value: obj.rate });
            GeneralExpenceView.variables.DetailsControlsList[postfix].dx_Discount.option({ value: obj.discount });
            GeneralExpenceView.variables.DetailsControlsList[postfix].dx_TotalAmt.option({ value: obj.totaltaxable });
            GeneralExpenceView.variables.DetailsControlsList[postfix].dx_TotalTax.option({ value: obj.totaltax });
            GeneralExpenceView.variables.DetailsControlsList[postfix].dx_AmtWithTax.option({ value: obj.totalamtwithtax });
        }
        /*----------------------Set Value of Detail table controls while Edit---------------------*/

    },

    RemoveDetailRow: function (obj) {
        $(obj).closest("tr").remove();
        delete GeneralExpenceView.variables.DetailsControlsList[$(obj).closest("tr").attr("rowno")];
        GeneralExpenceView.variables.taxlist = GeneralExpenceView.variables.taxlist.filter(function (x) { return x.rownum != $(obj).closest("tr").attr("rowno") });
        GeneralExpenceView.EndingTotalAmount();
        GeneralExpenceView.calcRoundOff();
    },

    GetItemList: function () {
        var myfilter = { rules: [] };
        myfilter.rules.push({ field: "ISACTIVE", op: "eq", data: true });
        myfilter.rules.push({ field: "GROUPNAME", op: "eq", data: 'GENERAL' });
        $.ajax({
            url: getDomain() + GeneralExpenceView.variables.BindItemMaster + "&myfilters=" + JSON.stringify(myfilter),
            async: true,
            cache: false,
            type: 'POST',
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    var JsonObject = xml2json.parser(data);
                    if (JsonObject.serviceresponse.detailslist) {
                        if (JsonObject.serviceresponse.detailslist.details.length) {
                            GeneralExpenceView.variables.ItemList = JsonObject.serviceresponse.detailslist.details;
                        }
                        else {
                            GeneralExpenceView.variables.ItemList.push(JsonObject.serviceresponse.detailslist.details);
                        }
                    }
                }
                else {
                    DevExVariables.InvalidResponseCode(data);
                }
            },
            error: OnError
        });
    },

    CalcItemwiseAmt: function (postfix) {

        var Rate = 0, Qty = 0, Weight = 0, Disc = 0, TotalTaxableAmt = 0, TotalTax = 0, AmtWithTax = 0, temptax = 0;
        Rate = +GeneralExpenceView.variables.DetailsControlsList[postfix].dx_Rate.option().value;
        Qty = +GeneralExpenceView.variables.DetailsControlsList[postfix].dx_Quantity.option().value;
        Weight = +GeneralExpenceView.variables.DetailsControlsList[postfix].dx_Weight.option().value;
        Disc = +GeneralExpenceView.variables.DetailsControlsList[postfix].dx_Discount.option().value;

        if (['Kg', 'Gram'].indexOf(GeneralExpenceView.variables.DetailsControlsList[postfix].dx_ddlUnit.option().value) !== -1) {

            TotalTaxableAmt = (Rate * Weight) - Disc;
            GeneralExpenceView.variables.DetailsControlsList[postfix].dx_TotalAmt.option({ value: (TotalTaxableAmt.toFixed(2)) });

        }
        else if (['Fix'].indexOf(GeneralExpenceView.variables.DetailsControlsList[postfix].dx_ddlUnit.option().value) !== -1) {

            TotalTaxableAmt = Rate - Disc;
            GeneralExpenceView.variables.DetailsControlsList[postfix].dx_TotalAmt.option({ value: (TotalTaxableAmt.toFixed(2)) });

        }
        else {

            TotalTaxableAmt = (Rate * Qty) - Disc;
            GeneralExpenceView.variables.DetailsControlsList[postfix].dx_TotalAmt.option({ value: (TotalTaxableAmt.toFixed(2)) });

        }

        GeneralExpenceView.variables.taxlist = GeneralExpenceView.variables.taxlist.filter(function (x) { return x.rownum != postfix });

        var tempTaxProfileList = [];
        if (GeneralExpenceView.variables.dx_taxProfile.option().selectedItem.taxdetaillist.taxdetails.length > 0) {
            tempTaxProfileList = GeneralExpenceView.variables.dx_taxProfile.option().selectedItem.taxdetaillist.taxdetails;
        }
        else {
            tempTaxProfileList.push(GeneralExpenceView.variables.dx_taxProfile.option().selectedItem.taxdetaillist.taxdetails);
        }

        $.each(tempTaxProfileList, function (key, obj) {
            var temptax = 0;

            var ItemTaxList = [];
            if (GeneralExpenceView.variables.DetailsControlsList[postfix].dx_txtItemName.option().selectedItem.taxdetaillist.taxdetails.length > 0) {
                ItemTaxList = GeneralExpenceView.variables.DetailsControlsList[postfix].dx_txtItemName.option().selectedItem.taxdetaillist.taxdetails;
            }
            else {
                ItemTaxList.push(GeneralExpenceView.variables.DetailsControlsList[postfix].dx_txtItemName.option().selectedItem.taxdetaillist.taxdetails);
            }

            var List = [];
            List = ItemTaxList.filter(function (x) { return x.taxid == obj.taxid });

            if (List.length > 0) {
                if (List[0].taxvaluein == "Percentage(%)") {
                    var tempTaxable = 0;
                    var calcOnList = [];
                    calcOnList = (obj.calculationon).toString().split("+");
                    if (calcOnList.indexOf("0") !== -1) {
                        tempTaxable += TotalTaxableAmt;
                    }

                    var temptaxlist = GeneralExpenceView.variables.taxlist.filter(function (x) { return calcOnList.indexOf(x.TaxId.toString()) !== -1 && x.rownum == postfix; });
                    $.each(temptaxlist, function (key, obj1) {
                        tempTaxable += obj1.TaxAmt;
                    });

                    temptax += (tempTaxable * List[0].taxvalue / 100);
                    TotalTax += temptax;

                }
                else {
                    temptax = List[0].taxvalue;
                    TotalTax += temptax;
                }
            }
            else {
                DevExVariables.Toaster("warning", "Item Name: " + GeneralExpenceView.variables.DetailsControlsList[postfix].dx_txtItemName.option().selectedItem.itemname + " Tax Name: " + obj.taxname + " Is Not Added Properly");
                GeneralExpenceView.variables.DetailsControlsList[postfix].dx_txtItemName.option("value", "");
                GeneralExpenceView.variables.DetailsControlsList[postfix].dx_ddlUnit.option("value", "");
                GeneralExpenceView.variables.DetailsControlsList[postfix].dx_WarrantyDate.option("value", "");
                GeneralExpenceView.variables.DetailsControlsList[postfix].dx_Quantity.option("value", 0);
                GeneralExpenceView.variables.DetailsControlsList[postfix].dx_Weight.option("value", 0);
                GeneralExpenceView.variables.DetailsControlsList[postfix].dx_Rate.option("value", 0);
                return;
            }

            GeneralExpenceView.variables.taxlist.push({
                rownum: postfix,
                HSNCodeId: GeneralExpenceView.variables.DetailsControlsList[postfix].dx_txtItemName.option().selectedItem.itemid,
                HSNCode: GeneralExpenceView.variables.DetailsControlsList[postfix].dx_txtItemName.option().selectedItem.hsncode,
                TaxableAmt: TotalTaxableAmt,
                TaxId: obj.taxid,
                TaxName: obj.taxname,
                TaxValue: List[0].taxvalue,
                TaxValueIn: List[0].taxvaluein,
                TaxAmt: temptax
            });
        });

        GeneralExpenceView.variables.DetailsControlsList[postfix].dx_TotalTax.option({ value: (TotalTax).toFixed(2) });
        AmtWithTax = TotalTaxableAmt + TotalTax;
        GeneralExpenceView.variables.DetailsControlsList[postfix].dx_AmtWithTax.option({ value: (AmtWithTax.toFixed(2)) });
        GeneralExpenceView.EndingTotalAmount();
        GeneralExpenceView.calcRoundOff();

    },

    EndingTotalAmount: function () {
        var TaxableAmt = 0, TotalTaxAmt = 0, TotalTaxWithAmt = 0;
        $.each(GeneralExpenceView.variables.DetailsControlsList, function (key, obj) {
            if (GeneralExpenceView.variables.DetailsControlsList[key]) {
                TaxableAmt += +GeneralExpenceView.variables.DetailsControlsList[key].dx_TotalAmt.option().value;
                TotalTaxAmt += +GeneralExpenceView.variables.DetailsControlsList[key].dx_TotalTax.option().value;
                TotalTaxWithAmt += +GeneralExpenceView.variables.DetailsControlsList[key].dx_AmtWithTax.option().value;
            }
        });

        GeneralExpenceView.variables.txtTaxableAmount.option({ value: TaxableAmt.toFixed(2) });
        //GeneralExpenceView.variables.DetailsControlsList[postfix].option({ value: TotalTaxAmt.toFixed(2) });
        GeneralExpenceView.variables.txtAmountWithTax.option({ value: TotalTaxWithAmt.toFixed(2) });

        $(".divTax").remove();
        if (GeneralExpenceView.variables.taxlist) {
            var tempTaxList = "";
            var temparray = [];
            var index = 0;
            $.each(GeneralExpenceView.variables.taxlist, function (key, obj) {
                if (temparray.filter(function (x) { return x.taxname == obj.TaxName }).length == 0) {
                    //temparray [obj.TaxName] = 0;
                    temparray.push({ taxname: obj.TaxName, taxamt: 0 });
                }
                index = temparray.findIndex(function (x) { return x.taxname == obj.TaxName });
                temparray[index].taxamt = temparray[index].taxamt + obj.TaxAmt;
            });

            $.each(temparray, function (key, obj) {
                tempTaxList += '<div class="form-group divTax">'
                                + '<label class="control-label col-lg-3 col-lg-offset-7">' + obj.taxname + '</label>'
                                + '<div class="col-lg-2">'
                                    + '<input type="text" class="form-control text-right" name="txt_' + obj.taxname + '" id="txt_' + obj.taxname + '" value="' + obj.taxamt.toFixed(2) + '" readonly />'
                                + '</div>'
                            + '</div>';
            });

            $(tempTaxList).insertBefore("#div_AmountWithTax");

            $("#dx_FooterTotalTaxable").html(TaxableAmt.toFixed(2));
            $("#dx_FooterTotaltax").html(TotalTaxAmt.toFixed(2));
            $("#dx_FooterTotalAmtWithtax").html(TotalTaxWithAmt.toFixed(2));
        }
    },

    calcRoundOff: function () {
        var Amt = GeneralExpenceView.variables.txtAmountWithTax.option().value;
        var FinalAmt = 0, RoundOff = 0, ExRate = 1;
        if ($("[name='rd_RoundOff']:checked").val() == "Add") {
            FinalAmt = Math.ceil(Amt);
        }
        else {
            FinalAmt = Math.floor(Amt);
        }

        RoundOff = Math.abs(Amt - FinalAmt);

        GeneralExpenceView.variables.txtRoundOff.option({ value: RoundOff.toFixed(2) });
        GeneralExpenceView.variables.txtTotalAmount.option({ value: FinalAmt.toFixed(2) });
        //GeneralExpenceView.variables.txtTotalAmountInRs.option({ value: (FinalAmt * GeneralExpenceView.variables.txtTotalAmountInRs.option.value()).toFixed(2) });

        GeneralExpenceView.OnChangeExchangeRate();
    },

    OnChangeExchangeRate: function () {
        var ExRate = GeneralExpenceView.variables.dx_txtExchangeRate.option().value;
        var FinalAmt = GeneralExpenceView.variables.txtTotalAmount.option().value || 0;
        GeneralExpenceView.variables.txtTotalAmountinRs.option({ value: (FinalAmt * ExRate).toFixed(2) });
    },

    RegisterFileUpload: function (btn, anchor, lblError) {

        $('#' + btn).fileupload({
            url: getDomain() + '/Helpers/Handler/FileUploadHandler.ashx',
            add: function (e, data) {

                if (checkIsValidFile(e.target.accept, data.files[0].type))
                    data.submit();
                else
                    notificationMessage('Invalid File', 'Please select only ' + e.target.accept + ' files', 'warning');
            },
            success: function (response, status) {

                //$('#' + anchor).attr('href', response);
                $('#' + anchor).attr('FileName', response);
                $('#' + anchor).html($(this)[0].files[0].name);
                if ($(lblError).length > 0) {
                    $(lblError).hide();
                    $(lblError).html("");
                }
            },
            error: OnError
        });
    },

    deleteAttachment: function (rid, file) {
        GeneralExpenceView.variables.deletedFiles += file + ',';
        $('#' + rid).remove();
        $('.tooltip').remove();
    },

    EditFromGrid: function (val, id, type) {
        var data = {
            "EXPENSEID": id,
            "OPER_TYPE": "EditFromGrid",
            "oper": "Edit"
        }
        if (type == "Verify")
            data.ISVERIFY = val;
        $.ajax({
            url: getDomain() + GeneralExpenceView.variables.PerformMasterOperationUrl,
            data: data,
            async: true,
            cache: false,
            type: 'POST',
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    DevExVariables.Toaster("success", 'Record is updated successfully.');
                    GeneralExpenceView.variables.dx_dataGrid.refresh();
                }
            },
            error: OnError,
        });
    },

    ClearShareItemControlls: function () {
        GeneralExpenceView.variables.dx_txtSharetoPartyList.option({ "value": "" }, { "items": "" }, { "selectedItem": "" });
        GeneralExpenceView.variables.dx_RadioSocial.option({ value: "WhatsApp" });
        GeneralExpenceView.variables.dx_txtMobileNo.option({ value: "" });
        GeneralExpenceView.variables.dx_txtShareMessage.option({ value: 'Dear Sir, ' + $("#hdn_UserName").val() + ' shared a design from TrinityJewells with you. Kindly click on below URL to view shared Design. {SHARE URL}' });
        GeneralExpenceView.variables.dx_txtSharingSubject.option({ value: "Jewellery Designs shared by TrinityJewells" });
        GeneralExpenceView.variables.dx_txtSharingEmailBody.option({ value: GeneralExpenceView.variables.content });
    },

    ShareSocialMedia: function (Type, Phone, msg, MailId, Subject) {
        var result = "";
        if (Type == "WhatsApp") {
            result = true;
            window.open('https://web.whatsapp.com/send?text=' + msg + '&phone=' + Phone, '_blank');
        }
        else if (Type == "SMS") {
            var data = {
                mobileNos: Phone,
                body: msg
            }
            $.ajax({
                url: getDomain() + "/Account/SendSMS",
                async: false,
                cache: false,
                type: 'POST',
                data: data,
                beforeSend: function () {
                    dx_LoaderTrinity.show();
                },
                success: function (data) {
                    if (data == "OK") {
                        result = true;
                        DevExVariables.Toaster("success", "SMS Send successfully.");
                    }
                    else {
                        result = false;
                        DevExVariables.Toaster("error", "Error to send SMS: " + data);
                    }
                },
                complete: function () {
                    dx_LoaderTrinity.hide();
                },
                error: OnError
            });
        }
        else if (Type == "E-Mail") {
            var data = {
                Emailids: MailId,
                subject: Subject,
                body: msg
            }
            $.ajax({
                url: getDomain() + "/Account/SendMail",
                async: false,
                cache: false,
                type: 'POST',
                data: data,
                beforeSend: function () {
                    dx_LoaderTrinity.show();
                },
                success: function (data) {
                    if (data == "success") {
                        result = true;
                        DevExVariables.Toaster("success", "Email Send successfully.");
                    }
                    else {
                        result = false;
                        DevExVariables.Toaster("error", "Error in send e-mail : " + data);
                    }
                },
                complete: function () {
                    dx_LoaderTrinity.hide();
                },
                error: OnError
            });
        }
        return result;
    },

    SharingDetails: function () {
        var Type = GeneralExpenceView.variables.dx_RadioSocial.option().value;
        if (Type == "E-Mail") {
            if (!GeneralExpenceView.variables.dx_txtSharingEmailId.option().value || !GeneralExpenceView.variables.dx_txtSharingSubject.option().value || !GeneralExpenceView.variables.dx_txtSharingEmailBody.option().value) {
                DevExVariables.Toaster("warning", "Email Id, Subject and Email Body are required.");
                return false;
            }
        }
        else {
            if (!GeneralExpenceView.variables.dx_txtMobileNo.option().value || !GeneralExpenceView.variables.dx_txtShareMessage.option().value) {
                DevExVariables.Toaster("warning", "Mobile No and Message are required.");
                return false;
            }
        }
        var SelectedDesignList = [], MobileNo = "", MSG = "", Mailbody = "", MailId = "", Suject = "";

        if (Type == "E-Mail") {
            MailId = GeneralExpenceView.variables.dx_txtSharingEmailId.option().value;
            Suject = GeneralExpenceView.variables.dx_txtSharingSubject.option().value;
            Mailbody = GeneralExpenceView.variables.dx_txtSharingEmailBody.option().value;
        }
        else if (Type == "SMS") {
            MobileNo = GeneralExpenceView.variables.dx_txtMobileNo.option().value;
            MSG = GeneralExpenceView.variables.dx_txtShareMessage.option().value;
        }
        else {
            MSG = GeneralExpenceView.variables.dx_txtShareMessage.option().value;
        }

        var ShareLink = getERPDomain() + "/Sharing/VoucherView?VoucherId=" + GeneralExpenceView.variables.Masterid + "/VoucherType=GeneralExpense";
        var message = "";
        if (Type == "E-Mail") {
            message = Mailbody.replace("{SHARE URL}", '<a href="' + ShareLink + '" target="_blank">Click here...</a>');
        }
        else {
            message = MSG.replace("{SHARE URL}", ShareLink);
        }
        var result = GeneralExpenceView.ShareSocialMedia(Type, MobileNo, message, MailId, Suject);

        GeneralExpenceView.ClearShareItemControlls();
        $("#ModalSharing").modal("hide");
    },

    BindAccountBalance: function () {
        var myfilter = { rules: [] };
        myfilter.rules.push({ field: "ACCID", op: "eq", data: GeneralExpenceView.variables.dx_ExpenseAcc.option().selectedItem.accid });
        myfilter.rules.push({ field: "ASONDATE", op: "eq", data: GeneralExpenceView.variables.dx_txtVoucherDate.option().text });

        $.ajax({
            url: getDomain() + GeneralExpenceView.variables.BindAccountbalancelist + "&myfilters=" + JSON.stringify(myfilter),
            async: false,
            cache: false,
            type: 'POST',
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    $("#btnAddSelectionList").html($(data).find('TOTALBALANCE').text());
                }
                else {
                    DevExVariables.InvalidResponseCode(data);
                }
            },
            error: OnError
        });
    },

    BindAccountReceiveBalance: function () {
        var myfilter = { rules: [] };
        myfilter.rules.push({ field: "ACCID", op: "eq", data: GeneralExpenceView.variables.dx_PartyAcc.option().selectedItem.accid });
        myfilter.rules.push({ field: "ASONDATE", op: "eq", data: GeneralExpenceView.variables.dx_txtVoucherDate.option().text });

        $.ajax({
            url: getDomain() + GeneralExpenceView.variables.BindAccountbalancelist + "&myfilters=" + JSON.stringify(myfilter),
            async: false,
            cache: false,
            type: 'POST',
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    $("#btnAddSelectionRecieveList").html($(data).find('TOTALBALANCE').text());
                }
                else {
                    DevExVariables.InvalidResponseCode(data);
                }
            },
            error: OnError
        });
    }
};

$(document).ready(function () {
    GeneralExpenceView.FormInitialize();
    GeneralExpenceView.initializeDevExgrid();
    GeneralExpenceView.BindSubBookList();
    GeneralExpenceView.GetItemList();
    GeneralExpenceView.BindTaxProfile();

    $("#lnk_AddNewRow").click(function () {
        GeneralExpenceView.AddNewLineDetails();
    });

    $("[name='rd_RoundOff']").change(function () {
        GeneralExpenceView.calcRoundOff();
    });
    //----------------------------attachment--------------------------------------------
    GeneralExpenceView.RegisterFileUpload('inputCADFile', 'lnkCADFilePreview', "#ItemimgError");

    $("#lnkCADFilePreview").click(function () {
        var url = $("#lnkCADFilePreview").attr("FileName")
        if (isDW())
            window.open(url);
    });

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
                $('#' + $('#hdnPreviewUploader').val()).append('<tr id="' + file + '" fileid="' + fileid + '" >' +
                    '<td class="FilePath text-center">' +
                        '<a class="btn btn-info" href="' + strHref + '" target="blank"><i class="fa fa-eye"></i></a>' +
                    '</td>' +
                    '<td class="Description">' +
                        '<input type="text" class="form-control" value="' + displayFile.split('.')[0] + '" placeholder="Description">' +
                    '</td>' +
                    '<td class="text-center">' +
                        '<a href="javascript:void(0);" onclick="GeneralExpenceView.deleteAttachment(\'' + file + '\',\'' + strHref + '\');" class="btn btn-danger"><i class="fa fa-trash"></i></a>' +
                    '</td>' +
                '</tr>');
            }
        });

        $('#modalUpload').modal('hide');
    });
    //----------------------------/attachment--------------------------------------------

    if (+$("#hdnSBOOKID").val()) {
        $("#pnlView").hide();
        $("#frm_Purchase_Expence").show();
        GeneralExpenceView.variables.Masterid = "";

        GeneralExpenceView.variables.dx_bookType.option({ value: +$("#hdnSBOOKID").val() });
        GeneralExpenceView.variables.dx_bookType.option({ disabled: true });
    }

    //---------------- Use in Share Model Print ---------------------------
    $.ajax({
        type: 'POST',
        async: false,
        cache: false,
        url: getDomain() + "/Sharing/VoucherPrintGet",
        data: {
            VoucherId: $("#hdnVoucherId").val(),
            VoucherType: $("#hdnVoucherType").val(),
        },
        success: function (result) {

            return "sucess";
        },
        error: OnError
    });
    //---------------- /Use in Share Model Print ---------------------------

});

function VoucherShare(id) {

    GeneralExpenceView.variables.Masterid = id;
    GeneralExpenceView.ClearShareItemControlls();

    $("#ModalSharing").modal('show');
}


