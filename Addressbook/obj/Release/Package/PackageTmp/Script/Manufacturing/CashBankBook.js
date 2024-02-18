var CashBankBookView = {
    variables: {
        BindCashBankBooklist: "/Common/BindMastersDetails?ServiceName=OUTLET_CASHBANKBOOK_GET",
        BindAccountbalancelist: "/Common/BindMastersDetails?ServiceName=ACC_BALANCE_GET",
        BindAccListUrl: "/Common/BindMastersDetails?ServiceName=ACCOUNTMASTER_GET",
        BindPendingvchr: "/Common/BindMastersDetails?ServiceName=ACC_PENDING_VOUCHER_GET",
        BindMainGridListUrl: "/Common/BindMastersDetails?ServiceName=ACC_CASHBANK_TRANSACTION_GET",
        PerformMasterOperationUrl: "/Common/OpeartionsOnMaster?ServiceName=ACC_CASHBANK_TRANSACTION_CRUD",
        BindProductMasterListUrl: "/Common/BindMastersDetails?ServiceName=PRODUCT_MASTER_GET",
        BindDetailListUrl: "/Common/BindMastersDetails?ServiceName=PRD_PRODUCT_DETAIL_GET",
        BindOrderByList: "/Common/BindMastersDetails?ServiceName=USERDETAILS_GET",
        Bind_HsncodeUrl: "/Common/BindMastersDetails?ServiceName=HSNCODEMASTER_GET",
        BindStaticDataUrl: "/Common/BindMastersDetails?ServiceName=STATIC_MASTER_GET&IsActive=true",
        BindMertrial_RmCodeList: "/Common/BindMastersDetails?ServiceName=PRD_MATERIAL_TRN_RMCODE_GET",
        BindHsnCodeData: "/Common/BindMastersDetails?ServiceName=HSNCODEMASTER_GET&IsActive=true",
        BindBookStaticDataUrl: "/Common/BindMastersDetails?ServiceName=STATIC_ACCBOOK_MASTER_GET",
        BindTaxProfile: "/Common/BindMastersDetails?ServiceName=ACC_TAXPROFILE_GET",

        GlobalTotal: [],
        dx_txtcashbankacc: "",
        dx_txtrecacc: "",
        dx_ddlCashBankCurr: "",
        dx_txtExchangeRate: "",
        dx_VchrNo: "",
        PartyList_accid: "",

        dx_txtTransactiontype: "",
        dx_txtRemarks: '',
        ddlHsnCode: '',
        txtTotal: '',
        txtTotalBillAmount: '',
        txtPandingAmount: '',
        txtPaidAmount: '',
        txtPayingAmount: '',
        txtRemainingAmount: '',
        dx_txtPaymentDate: '',
        DetailsControlsList: [],
        dx_ddlbankName: "",
        dx_txtcheque: "",
        dx_txtchequeDate: "",
        CBT_ID: "",

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
                    $("<p>Voucher No: <span>" + CashBankBookView.variables.DeleteDataObj.voucherno + "</span></p>"
                     + "<p>Voucher Type: <span>" + CashBankBookView.variables.DeleteDataObj.vouchertype + "</span></p>"
                     + "<p>Amount: <span>" + CashBankBookView.variables.DeleteDataObj.totalamt + "</span></p>"
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
                            "CBT_ID": CashBankBookView.variables.Masterid,
                            "oper": CashBankBookView.variables.Oper,
                        }
                        $.ajax({
                            url: getDomain() + CashBankBookView.variables.PerformMasterOperationUrl,
                            data: data,
                            async: true,
                            cache: false,
                            type: 'POST',
                            success: function (data) {
                                if ($(data).find('RESPONSECODE').text() == "0") {
                                    DevExVariables.Toaster("success", 'Record is deleted successfully');

                                    CashBankBookView.variables.dx_popupRecordDelete.hide();
                                    CashBankBookView.variables.dx_dataGrid.refresh();
                                }
                                else {
                                    DevExVariables.InvalidResponseCode(data);
                                }
                            },
                            error: OnError,
                        });
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
        dx_txtAcc_Name: "",
        dx_txtHeadName: "",
        dx_txtMobileNo: "",
        dx_ddlCountry: "",
        dx_ddlState: "",
        dx_ddlCity: "",

        dx_Party_btnSubmit: "",
        dx_Party_btnCancel: "",

        dx_btnSubmit: "",
        dx_btnCancel: "",

        dx_txtsize: "",
        dx_dataGrid: "",
        dx_dataGrid_IteamList: "",
        dx_dataGrid_Job_Detail: [],
        dx_dataGrid_Stock: "",
        dx_dataGrid_Stock_Deatil: [],
        selSortingColumn: "DESIGNCODE",
        selSortingOrder: "desc",
        MULTISEARCH: [],
        MULTISEARCH_STOCK: [],
        DataSoucres_Jobwork: "",
        /*------------------------/variables for main form Controls-----------------------*/


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
        //------------------------------ /share model tools---------------------------------

    },

    FormInitialize: function () {

        //---------------------------------add new button ---------------------------------
        CashBankBookView.variables.dx_btnAddNew = $("#dx_btnAddNew").dxButton({
            stylingMode: "outlined",
            icon: "plus",
            text: "Add New",
            type: "default",
            validationGroup: "CashbankBook",
            onClick: function (e) {
                $("#frm_Cashbank_Book").show();
                $("#pnlView").hide();
                CashBankBookView.variables.Masterid = "";
            }
        }).dxButton("instance");

        CashBankBookView.variables.dx_btnRefreshGrid = $("#dx_btnRefreshGrid").dxButton({
            stylingMode: "outlined",
            icon: "refresh",
            type: "default",
            validationGroup: "CashBankBook",
            onClick: function () {
                CashBankBookView.GetPendingVoucherList();
                $("#dx_FooterTotalAmount").html("0.00");
            }
        }).dxButton("instance");
        //-----------------------------------start top right controls--------------------------------------------
        CashBankBookView.variables.dx_txtTransactiontype = $("#dx_txtTransactiontype").dxSelectBox({
            placeholder: "Select Book Type...",
            searchEnabled: true,
            onItemClick: function (e) {
                if (e.component.option().selectedItem) {
                    if (e.component.option().selectedItem.subbook == "Cashbank Receive") {
                        $('#place').html('Receive From Acc')
                    }
                    else {
                        $('#place').html('Payment to Acc')
                    }
                    CashBankBookView.GetPendingVoucherList();
                }
            },
        }).dxValidator({
            validationGroup: "CashBankBook",
            validationRules: [{
                type: "required",
                message: "Select Book Type"
            }]
        }).dxSelectBox("instance");

        CashBankBookView.variables.dx_txtpaymenttype = $("#dx_txtpaymenttype").dxSelectBox({
            dataSource: ["Cash", "UPI", "IMPS", "NEFT", "RTGS", "Cheque", "Credit Card", "Debit Card", "Inward Remittance", "Internet Banking"],
            placeholder: "Select Payment Type...",
            searchEnabled: true,
        }).dxValidator({
            validationGroup: "CashBankBook",
            validationRules: [{
                type: "required",
                message: "Select Payment Type"
            }]
        }).dxSelectBox("instance");

        CashBankBookView.variables.dx_ddlbankName = $("#dx_ddlbankName").dxTextBox({
            mode: "text",
            placeholder: "Enter bank name..."
        }).dxTextBox("instance");

        CashBankBookView.variables.dx_txtcheque = $("#dx_txtcheque").dxTextBox({
            mode: "text",
            placeholder: "Enter cheque No..."
        }).dxTextBox("instance");

        var now = new Date();
        CashBankBookView.variables.dx_txtchequeDate = $("#dx_txtchequeDate").dxDateBox({
            type: "date",
            value: now,
            showClearButton: true,
            useMaskBehavior: true,
            displayFormat: "dd MMM yyyy",
        }).dxDateBox("instance");

        //-----------------------------------/End top right controls--------------------------------------------

        //------------------------------- Start bottom left contanct--------------------------------------

        CashBankBookView.variables.dx_txtRemarks = $("#dx_txtRemarks").dxTextArea({
            height: 110,
            placeholder: "Enter Remark"

        }).dxTextArea("instance");

        //------------------------------- End bottom left contanct--------------------------------------


        //------------------------------- Start bottom Right contanct--------------------------------------

        CashBankBookView.variables.txtTotalBillAmount = $("#txtTotalBillAmount").dxTextBox({
            readOnly: true,
            inputAttr: {
                class: "text-right"
            },
        }).dxTextBox("instance");

        CashBankBookView.variables.txtPandingAmount = $("#txtPandingAmount").dxTextBox({
            readOnly: true,
            inputAttr: {
                class: "text-right"
            },
        }).dxTextBox("instance");

        CashBankBookView.variables.txtPaidAmount = $("#txtPaidAmount").dxTextBox({
            readOnly: true,
            inputAttr: {
                class: "text-right"
            },
        }).dxTextBox("instance");

        CashBankBookView.variables.txtPayingAmount = $("#txtPayingAmount").dxTextBox({
            readOnly: true,
            inputAttr: {
                class: "text-right"
            },
            onChange: function (obj) {
                if (obj.value)
                    CashBankBookView.variables.txtPayingAmount.option({ value: PayingAmount.toFixed(2) });
            }
        }).dxTextBox("instance");

        CashBankBookView.variables.txtRemainingAmount = $("#txtRemainingAmount").dxTextBox({
            readOnly: true,
            inputAttr: {
                class: "text-right"
            },
            onChange: function (obj) {
                if (obj.value)
                    CashBankBookView.variables.txtRemainingAmount.option({ value: RemainingAmount.toFixed(2) });
            }
        }).dxTextBox("instance");

        //------------------------------- End bottom Right contanct--------------------------------------


        //--------------------------------------- Submit button---------------------------------------

        CashBankBookView.variables.dx_btnSubmit = $("#dx_btnSubmit").dxButton({
            icon: "check",
            text: "Submit",
            type: "success",
            //useSubmitBehavior: true,
            onClick: function (e) {
                var validation = DevExpress.validationEngine.validateGroup("CashBankBook");
                if (!validation.isValid) {
                    DevExVariables.Toaster("warning", "Please fill all required fields before submit.");
                    return;
                }
                CashBankBookView.btnMasterSubmit();
            }
        }).dxButton("instance");

        //--------------------------------------- Cancle button---------------------------------------

        CashBankBookView.variables.dx_btnCancel = $("#dx_btnCancel").dxButton({
            icon: "close",
            text: "Cancel",
            type: "danger",
            onClick: function (e) {
                //$('#tbl_DesignDetails').html('');
                //CashBankBookView.variables.dx_dataGrid.refresh();
                CashBankBookView.ClearValues();
                //e.validationGroup.reset();
            }
        }).dxButton("instance");

        //-----------------------------start top left controls---------------------------------
        var now = new Date();
        CashBankBookView.variables.dx_txtPaymentDate = $("#dx_txtPaymentDate").dxDateBox({
            type: "date",
            value: now,
            showClearButton: true,
            useMaskBehavior: true,
            displayFormat: "dd MMM yyyy",
        }).dxValidator({
            validationGroup: "CashBankBook",
            validationRules: [{
                type: "required",
                message: "Payment Date is required"
            }]
        }).dxDateBox("instance");

        CashBankBookView.variables.dx_txtcashbankacc = $("#dx_txtcashbankacc").dxAutocomplete({
            placeholder: "Select Account...",
            mode: "search",
            dataSource: new DevExpress.data.CustomStore({
                load: function (loadOptions) {
                    var deferred = $.Deferred();

                    var myfilter = { rules: [] };
                    //myfilter.rules.push({ field: "HEADNAME", op: "eq", data: "Bank Account,Cash Account" });
                    myfilter.rules.push({ field: "GROUPNAME", op: "eq", data: "Current Assets" });

                    $.ajax({
                        url: getDomain() + CashBankBookView.variables.BindAccListUrl + "&_search=true&searchField=ACCOUNTNAME&searchOper=cn&searchString=" + loadOptions.searchValue + "&myfilters=" + JSON.stringify(myfilter),
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
                //if (e.component.option().selectedItem) {
                if (e.component.option().selectedItem) {
                    CashBankBookView.BindAccountBalance();
                    CashBankBookView.variables.dx_txtcashbankacc.option().selectedItem.accid;
                    $("#spanCashBankCurr").html(e.component.option().selectedItem.currencycode);
                }
                else {
                    CashBankBookView.variables.dx_txtcashbankacc = "";
                    $("#spanCashBankCurr").html('');
                }
                //}
            },
            valueExpr: "accountname",
        }).dxValidator({
            validationGroup: "CashBankBook",
            validationRules: [{
                type: "required",
                message: "Cashbank Account is required"
            }]
        }).dxAutocomplete("instance");

        CashBankBookView.variables.dx_txtrecacc = $("#dx_txtrecacc").dxAutocomplete({
            placeholder: "Select Account...",
            mode: "search",
            dataSource: new DevExpress.data.CustomStore({
                load: function (loadOptions) {
                    var deferred = $.Deferred();

                    var myfilter = { rules: [] };
                    //myfilter.rules.push({ field: "HEADNAME", op: "eq" });
                    myfilter.rules.push({ field: "GROUPNAME", op: "eq", data: "Creditors/Debitors,Current Liabilities,Direct Expense,Indirect Expense,Capital Account,Fixed Assets,Loans And Advances,Duties And Taxes,Investments,Loans And Liabilities" });

                    $.ajax({
                        url: getDomain() + CashBankBookView.variables.BindAccListUrl + "&_search=true&searchField=ACCOUNTNAME&searchOper=cn&searchString=" + loadOptions.searchValue + "&myfilters=" + JSON.stringify(myfilter),
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
                    CashBankBookView.BindAccountReceiveBalance();
                    CashBankBookView.GetPendingVoucherList();
                    if ($('#tbl_DesignDetails tbody').find('tr').length == 0) {
                        CashBankBookView.variables.txtTotalBillAmount.option("value", 0);
                        CashBankBookView.variables.txtPandingAmount.option("value", 0);
                        CashBankBookView.variables.txtPaidAmount.option("value", 0);
                        CashBankBookView.variables.txtPayingAmount.option({ value: CashBankBookView.variables.dx_txtamt.option().value });
                        CashBankBookView.variables.txtRemainingAmount.option({ value: (CashBankBookView.variables.txtPandingAmount.option().value - CashBankBookView.variables.txtPayingAmount.option().value).toFixed(2) });
                    };

                    if (e.component.option().selectedItem) {
                        CashBankBookView.variables.dx_txtrecacc.option().selectedItem.accid;
                        $("#spanCurrencyName").html(e.component.option().selectedItem.currencycode);
                        CashBankBookView.variables.dx_txtExchangeRate.option({ value: e.component.option().selectedItem.exchangerate });
                    }
                    else {
                        CashBankBookView.variables.dx_txtrecacc = "";
                        $("#spanCurrencyName").html('');
                        CashBankBookView.variables.dx_txtExchangeRate.option("value", "");
                    }

                }
            },
            onFocusOut: function (e) {
                //CashBankBookView.GetpaidAmount();
            },
            itemTemplate: function (data) {
                return $("<div class='product-name'>" + "(" + data.partycode + ")&nbsp;" + data.accountname + "</div>");
            },
        }).dxValidator({
            validationGroup: "CashBankBook",
            validationRules: [{
                type: "required",
                message: "Receiver Account is required"
            }]
        }).dxAutocomplete("instance");

        CashBankBookView.variables.dx_txtamt = $("#dx_txtamt").dxTextBox({
            mode: "text",
            onItemClick: function (e) {

            },
            onFocusOut: function (data) {

                if ($('#tbl_DesignDetails tbody').find('tr').length == 0) {
                    CashBankBookView.variables.txtPayingAmount.option({ value: CashBankBookView.variables.dx_txtamt.option().value });
                    CashBankBookView.variables.txtRemainingAmount.option({ value: (CashBankBookView.variables.txtPandingAmount.option().value - CashBankBookView.variables.txtPayingAmount.option().value).toFixed(2) });
                };

                var TotalAmountInRs = 0;
                TotalAmountInRs += +CashBankBookView.variables.dx_txtamt.option().value * CashBankBookView.variables.dx_txtExchangeRate.option().value;
                CashBankBookView.variables.txtTotalAmountInRs.option({ value: (TotalAmountInRs.toFixed(2)) });
            },
            placeholder: "Enter Amount...",
        }).dxValidator({
            validationGroup: "CashBankBook",
            validationRules: [{
                type: "required",
                message: "Add Bill Total Amount."
            }]
        }).dxTextBox("instance");

        CashBankBookView.variables.dx_txtExchangeRate = $("#dx_txtExchangeRate").dxNumberBox({
            value: 1,
            min: 1,
            onFocusOut: function (data) {
                var TotalAmountInRs = 0;
                TotalAmountInRs += +CashBankBookView.variables.dx_txtamt.option().value * CashBankBookView.variables.dx_txtExchangeRate.option().value;
                CashBankBookView.variables.txtTotalAmountInRs.option({ value: (TotalAmountInRs.toFixed(2)) });
            },
        }).dxValidator({
            validationGroup: "CashBankBook",
            validationRules: [{
                type: "required",
                message: "Exchange rate is required"
            }]
        }).dxNumberBox("instance");

        CashBankBookView.variables.txtTotalAmountInRs = $("#txtTotalAmountInRs").dxNumberBox({
            readOnly: true,
            inputAttr: {
                class: "text-right"
            },
        }).dxValidator({
            validationGroup: "CashBankBook",
            validationRules: []
        }).dxNumberBox("instance");

        CashBankBookView.variables.dx_VchrNo = $("#dx_VchrNo").dxTextBox({
            readOnly: true,
        }).dxValidator({
            validationGroup: "CashBankBook",
            validationRules: []
        }).dxTextBox("instance");

        //-----------------------------/End top left controls---------------------------------

        /*----------------------------Sharing Modal--------------------------*/
        CashBankBookView.variables.dx_txtSharetoPartyList = $("#dx_txtSharetoPartyList").dxAutocomplete({
            placeholder: "Select Party Name...",
            mode: "search",
            dataSource: new DevExpress.data.CustomStore({
                load: function (loadOptions) {
                    var deferred = $.Deferred();
                    $.ajax({
                        url: getDomain() + CashBankBookView.variables.BindAccListUrl + "&_search=true&searchField=ACCOUNTNAME&searchOper=cn&searchString=" + loadOptions.searchValue,
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
                    CashBankBookView.variables.dx_txtSharingEmailId.option({ value: data.selectedItem.emailid });
                    CashBankBookView.variables.dx_txtMobileNo.option({ value: data.selectedItem.mobile1 });

                }
                else {
                    CashBankBookView.variables.dx_txtSharingEmailId.option("value", "");
                    CashBankBookView.variables.dx_txtMobileNo.option("value", "");
                }
            }
        }).dxAutocomplete("instance");

        CashBankBookView.variables.dx_btnSubmitShare = $("#dx_btnSubmitShare").dxButton({
            stylingMode: "outlined",
            icon: "fa fa-paper-plane",
            text: "Send",
            type: "default",
            useSubmitBehavior: false,
            visible: true,
            onClick: function (e) {
                CashBankBookView.SharingDetails();
            }
        }).dxButton("instance");

        CashBankBookView.variables.dx_RadioSocial = $("#dx_RadioSocial").dxRadioGroup({
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

        CashBankBookView.variables.dx_txtMobileNo = $("#dx_txtMobileNo").dxTextBox({ mode: "number" }).dxTextBox("instance");

        CashBankBookView.variables.dx_txtShareMessage = $("#dx_txtShareMessage").dxTextArea({
            height: 90,
            value: 'Dear Sir, ' + $("#hdn_UserName").val() + ' shared a design from TrinityJewells with you. Kindly click on below URL to view shared Design. {SHARE URL}',
        }).dxTextArea("instance");

        CashBankBookView.variables.dx_txtSharingSubject = $("#dx_txtSharingSubject").dxTextBox({
            value: "Jewellery Designs shared by TrinityJewells"
        }).dxTextBox("instance");

        CashBankBookView.variables.dx_txtSharingEmailId = $("#dx_txtSharingEmailId").dxTextBox({ placeholder: "Enter Email Id..." }).dxTextBox("instance");

        CashBankBookView.variables.dx_txtSharingEmailBody = $("#dx_txtSharingEmailBody").dxHtmlEditor({
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
            value: CashBankBookView.variables.content,
            onValueChanged: function (e) {
                //$(".value-content").text(e.component.option("value"));
            }
        }).dxHtmlEditor("instance");
        /*----------------------------/ Sharing Modal--------------------------*/

    },

    initializeDevExgrid: function () {
        CashBankBookView.variables.dx_dataGrid = $("#dx_dataGrid").dxDataGrid({
            dataSource: new DevExpress.data.CustomStore({
                key: "cbt_id",
                load: function (loadOptions) {
                    var deferred = $.Deferred();

                    var myfilter = { rules: [] };
                    myfilter.rules.push({ field: "SubBookType", op: "eq", data: "Transaction" });
                    myfilter.rules.push({ field: "TYPE", op: "eq", data: "Cashbank Receive,Cashbank Payment" });
                    //myfilter.rules.push({ field: "TYPE", op: "eq", data: "CASHBANK RECEIVE,CASHBANK PAYMENT" });

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
                        url: getDomain() + CashBankBookView.variables.BindMainGridListUrl + "&" + parameters.join("&") + "&myfilters=" + JSON.stringify(myfilter),
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
            columns: [{ dataField: "cbt_id", allowFiltering: false, allowSorting: true, sortIndex: 1, sortOrder: "desc", visible: false },
                { dataField: "voucherno", caption: "Voucher No", dataType: "string", filterOperations: ["contains"], allowSorting: true, allowFiltering: true, allowHeaderFiltering: false },
                {
                    dataField: "vouchertype", caption: "Voucher Type", dataType: "string", filterOperations: ["contains"], visible: true, allowSorting: true, allowFiltering: true, allowHeaderFiltering: true
                    , headerFilter: {
                        dataSource: [{
                            text: "Cashbank Receive",
                            value: ["VOUCHERTYPE", "equals", "Cashbank Receive"]
                        }, {
                            text: "Cashbank Payment",
                            value: ["VOUCHERTYPE", "equals", "Cashbank Payment"]
                        }]
                    },
                },
                { dataField: "voucherdate", caption: "payment Date", dataType: "string", filterOperations: ["contains"], allowSorting: true, allowFiltering: true, allowHeaderFiltering: false },
                { dataField: "accountname", caption: "Cash/Bank Acc", dataType: "string", filterOperations: ["contains"], allowSorting: true, allowFiltering: true, allowHeaderFiltering: false },
                { dataField: "receiveaccname", caption: "Voucher Acc", dataType: "string", filterOperations: ["contains"], allowSorting: true, allowFiltering: true, allowHeaderFiltering: false },
                { dataField: "paymentmode", caption: "Payment Type", dataType: "string", filterOperations: ["contains"], allowSorting: true, allowFiltering: true, allowHeaderFiltering: false },
                { dataField: "currencycode", caption: "Currency", dataType: "string", filterOperations: ["contains"], allowSorting: true, allowFiltering: true, allowHeaderFiltering: false },
                { dataField: "exchangerate", caption: "Exchange Rate", dataType: "number", filterOperations: ["contains"], allowSorting: true, allowFiltering: true, allowHeaderFiltering: false },
                { dataField: "remark", caption: "Remark", dataType: "number", filterOperations: ["contains"], allowSorting: false, allowFiltering: false, allowHeaderFiltering: false },
                { dataField: "totalamt", caption: "Amount", dataType: "number", filterOperations: ["contains"], allowSorting: false, allowFiltering: false, allowHeaderFiltering: false },
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
                                    CashBankBookView.EditFromGrid(data.value, options.key, 'Verify');
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
                        DevExVariables.ActionTemplate(container, options, true, true, "CashBankBookView", "Attachments,Share,Pdf", "CashBankBook");
                    }
                },
            ]
        }).dxDataGrid("instance");
    },

    btnMasterSubmit: function () {
        if (+CashBankBookView.variables.dx_txtamt.option().value != +CashBankBookView.variables.txtPayingAmount.option().value) {
            DevExVariables.Toaster("warning", "Amount should be same as billwise amount total.");
            return;
        }

        if (CashBankBookView.variables.dx_txtrecacc.option().selectedItem.currencyid != CashBankBookView.variables.dx_txtcashbankacc.option().selectedItem.currencyid) {
            DevExVariables.Toaster("warning", "cash/bank account currency and voucher account currency is not same.");
            return;
        }

        CashBankBookView.variables.dx_btnSubmit.option({ disabled: true });

        CashBankBookView.variables.Oper = 'Add';
        CashBankBookView.variables.addedit = "added";
        if (CashBankBookView.variables.Masterid != "0" && parseInt(CashBankBookView.variables.Masterid) > 0) {
            CashBankBookView.variables.Oper = 'Edit';
            CashBankBookView.variables.addedit = 'updated';
        }
        var xmlNodeList = '<DETAILSLIST>';
        $("#tbl_DesignDetails tbody tr").each(function (key, obj) {
            if (+$(obj).find('.Amt input').val() > 0) {
                xmlNodeList += '<DETAILS>';
                xmlNodeList += '<TRANSACTIONTYPE>' + $(obj).attr("TransactionType") + '</TRANSACTIONTYPE>';
                xmlNodeList += '<TRANSACTIONID>' + $(obj).attr("TransactionId") + '</TRANSACTIONID>';
                xmlNodeList += '<TRANSACTIONVOUCHERNO>' + $(obj).find('.travchrnno').text() + '</TRANSACTIONVOUCHERNO>';
                xmlNodeList += '<BILLAMT>' + $(obj).find('.BillAmt').text() + '</BILLAMT>';
                xmlNodeList += '<PAYMENTAMT>' + $(obj).find('.Amt input').val() + '</PAYMENTAMT>';
                xmlNodeList += '<KASAR>' + $(obj).find('.Kasar input').val() + '</KASAR>';
                xmlNodeList += '</DETAILS>';
            }
        });
        xmlNodeList += '</DETAILSLIST>';
        var data = {
            "CBT_ID": CashBankBookView.variables.Masterid,
            "SBOOKID": CashBankBookView.variables.dx_txtTransactiontype.option().selectedItem.sbookid,
            "VOUCHERTYPE": CashBankBookView.variables.dx_txtTransactiontype.option().selectedItem.subbook,
            "VOUCHERDATE": CashBankBookView.variables.dx_txtPaymentDate.option().text,
            "CASHBANKACCID": CashBankBookView.variables.dx_txtcashbankacc.option().selectedItem.accid,
            "PAYERRECIEVERACCID": CashBankBookView.variables.dx_txtrecacc.option().selectedItem.accid,
            "PAYMENTMODE": CashBankBookView.variables.dx_txtpaymenttype.option().value,
            "CASHBANKCURRENCYID": CashBankBookView.variables.dx_txtcashbankacc.option().selectedItem.currencyid,
            "CURRENCYID": CashBankBookView.variables.dx_txtrecacc.option().selectedItem.currencyid,
            "EXCHANGERATE": CashBankBookView.variables.dx_txtExchangeRate.option().value,
            //"BANKNAME": CashBankBookView.variables.dx_ddlbankName.option().value,
            //"CHEQUENO": CashBankBookView.variables.dx_txtcheque.option().value,
            //"CHEQUEDATE": CashBankBookView.variables.dx_txtchequeDate.option().text,
            //"REMARK": CashBankBookView.variables.dx_txtRemarks.option().value,
            "TOTALAMT": CashBankBookView.variables.dx_txtamt.option().value,
            "TOTALAMTINRS": CashBankBookView.variables.txtTotalAmountInRs.option().value,
            "FINALBILLAMOUNT": CashBankBookView.variables.txtTotalBillAmount.option().value,
            "PANDINGAMOUNT": CashBankBookView.variables.txtPandingAmount.option().value,
            "PAIDAMOUNT": CashBankBookView.variables.txtPaidAmount.option().value,
            "PAYINGAMOUNT": CashBankBookView.variables.txtPayingAmount.option().value,
            "REMAININGAMOUNT": CashBankBookView.variables.txtRemainingAmount.option().value,
            XMLPARAM: escape(xmlNodeList),
            "oper": CashBankBookView.variables.Oper,
        }

        if (CashBankBookView.variables.dx_ddlbankName.option().value)
            data.BANKNAME = CashBankBookView.variables.dx_ddlbankName.option().value;

        if (CashBankBookView.variables.dx_txtcheque.option().value)
            data.CHEQUENO = CashBankBookView.variables.dx_txtcheque.option().value;

        if (CashBankBookView.variables.dx_txtchequeDate.option().value)
            data.CHEQUEDATE = CashBankBookView.variables.dx_txtchequeDate.option().text;

        if (CashBankBookView.variables.dx_txtRemarks.option().value)
            data.REMARK = CashBankBookView.variables.dx_txtRemarks.option().value;

        CashBankBookView.savedata(data);
    },

    savedata: function (data) {
        $.ajax({
            url: getDomain() + CashBankBookView.variables.PerformMasterOperationUrl,
            data: data,
            async: true,
            cache: false,
            type: 'POST',
            beforeSend: function () {
                dx_LoaderTrinity.show();
            },
            complete: function () {
                dx_LoaderTrinity.hide();
                CashBankBookView.variables.dx_btnSubmit.option({ disabled: false });
            },
            success: CashBankBookView.btnMasterSubmitOnSuccess,
            error: OnError,
        });
    },

    btnMasterSubmitOnSuccess: function (data) {
        if ($(data).find('RESPONSECODE').text() == "0") {
            DevExVariables.Toaster("success", 'Record is Added successfully.');
            $("#frm_Cashbank_Book").hide();
            $("#pnlView").show();
            DevExpress.validationEngine.resetGroup("CashBankBook");
            CashBankBookView.ClearValues();
            CashBankBookView.variables.dx_dataGrid.refresh();
        }
        else {
            DevExVariables.InvalidResponseCode(data);
        }
    },

    triggerId: function (id) {
        var rowData = CashBankBookView.variables.dx_dataGrid.getVisibleRows()[CashBankBookView.variables.dx_dataGrid.getRowIndexByKey(+id)].data;
        CashBankBookView.variables.Masterid = id;
        if (rowData.vouchertype == "Cashbank Receive") {
            $('#place').html('Receive From Acc')
        }
        else {
            $('#place').html('Payment to Acc')
        }

        CashBankBookView.variables.dx_txtPaymentDate.option({ value: rowData.voucherdate });
        CashBankBookView.variables.dx_txtTransactiontype.option('disabled', true);
        CashBankBookView.variables.dx_txtpaymenttype.option({ value: rowData.paymentmode });
        CashBankBookView.variables.dx_txtcashbankacc.option({
            items: [{ accid: rowData.cashbankaccid, accountname: rowData.accountname, currencycode: rowData.cashbankcurcode, currencyid: rowData.currencyid }],
            selectedItem: { accid: rowData.cashbankaccid, accountname: rowData.accountname, currencycode: rowData.cashbankcurcode, currencyid: rowData.currencyid },
            value: rowData.accountname
        });
        CashBankBookView.variables.dx_txtrecacc.option({
            items: [{ accid: rowData.payerrecieveraccid, accountname: rowData.receiveaccname, currencycode: rowData.currencycode, currencyid: rowData.currencyid }],
            selectedItem: { accid: rowData.payerrecieveraccid, accountname: rowData.receiveaccname, currencycode: rowData.currencycode, currencyid: rowData.currencyid },
            value: rowData.receiveaccname
        });
        CashBankBookView.BindAccountBalance();
        CashBankBookView.BindAccountReceiveBalance();
        CashBankBookView.variables.dx_VchrNo.option({ value: rowData.voucherno });
        CashBankBookView.variables.dx_txtamt.option({ value: rowData.totalamt });
        $("#spanCashBankCurr").html(CashBankBookView.variables.dx_txtcashbankacc.option().selectedItem.currencycode);
        $("#spanCurrencyName").html(CashBankBookView.variables.dx_txtrecacc.option().selectedItem.currencycode);
        CashBankBookView.variables.dx_txtExchangeRate.option({ value: rowData.exchangerate });
        CashBankBookView.variables.txtTotalAmountInRs.option({ value: rowData.totalamtinrs });
        CashBankBookView.variables.dx_txtRemarks.option({ value: rowData.remark });
        CashBankBookView.variables.dx_ddlbankName.option({ value: rowData.bankname });
        CashBankBookView.variables.dx_txtcheque.option({ value: rowData.chequeno });
        CashBankBookView.variables.dx_txtchequeDate.option({ value: rowData.chequedate });
        CashBankBookView.variables.dx_txtTransactiontype.option({ value: rowData.sbookid });
        CashBankBookView.GetpaidAmount();

        if ($('#tbl_DesignDetails tbody').find('tr').length == 0) {
            CashBankBookView.variables.txtTotalBillAmount.option("value", 0);
            CashBankBookView.variables.txtPandingAmount.option("value", 0);
            CashBankBookView.variables.txtPaidAmount.option("value", 0);
            CashBankBookView.variables.txtPayingAmount.option({ value: CashBankBookView.variables.dx_txtamt.option().value });
            CashBankBookView.variables.txtRemainingAmount.option({ value: (CashBankBookView.variables.txtPandingAmount.option().value - CashBankBookView.variables.txtPayingAmount.option().value).toFixed(2) });
        };

        var myfilter = { rules: [] };
        myfilter.rules.push({ field: "CB_ID", op: "eq", data: id });
        $.ajax({
            url: getDomain() + "/Common/BindMastersDetails?ServiceName=ACC_CASHBANKBOOK_DETAILS_GET&myfilters=" + JSON.stringify(myfilter),
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
                        var TotalBillAmt = 0, TotalPaidAmt = 0, TotalPendingAmt = 0;
                        $.each(List, function (key, obj) {
                            $('#tbl_DesignDetails tbody').append(
                            '<tr rowno="' + key + '" TransactionId="' + obj.transactionid + '" TransactionType="' + obj.transactiontype + '">'
                               + '<td class="TableRowNo">' + (key + 1) + '</td>'
                               + '<td class="vchrtype">' + obj.vouchertype + '</td>'
                               + '<td class="travchrnno">' + obj.transactionvoucherno + '</td>'
                               + '<td class="vchrdate">' + obj.voucherdate + '</td>'
                               + '<td class="BillAmt" style="text-align:right;">' + obj.billamt.toFixed(2) + '</td>'
                               + '<td class="paidamt" style="text-align:right;">' + obj.paidamt.toFixed(2) + '</td>'
                               + '<td class="PendingAmt" style="text-align:right;">' + obj.pendingamount.toFixed(2) + '</td>'
                               + '<td class="Amt"><input type="text" class="form-control" style="text-align:right;" onFocusOut="CashBankBookView.GetpaidAmount();" value="' + obj.paymentamt.toFixed(2) + '"></td>'
                               + '<td class="Kasar"><input type="number" style="text-align:right;" class="form-control" onFocusOut="CashBankBookView.GetpaidAmount(); CashBankBookView.WrongAmountToster();" value="' + (obj.kasar || 0).toFixed(2) + '"/></td>'
                            + '</tr>'
                             );
                            TotalBillAmt += obj.billamt;
                            TotalPaidAmt += obj.paidamt;
                            TotalPendingAmt += obj.pendingamount;
                        });
                        CashBankBookView.variables.txtTotalBillAmount.option({ value: TotalBillAmt.toFixed(2) });
                        CashBankBookView.variables.txtPaidAmount.option({ value: TotalPaidAmt.toFixed(2) });
                        CashBankBookView.variables.txtPandingAmount.option({ value: TotalPendingAmt.toFixed(2) });

                        $("#dx_FooterTotalBillAmt").html(TotalBillAmt.toFixed(2));
                        $("#dx_FooterTotalPaidAmt").html(TotalPaidAmt.toFixed(2));
                        $("#dx_FooterTotalPandingAmt").html(TotalPendingAmt.toFixed(2));

                        CashBankBookView.GetpaidAmount();
                    }
                }
                else {
                    DevExVariables.InvalidResponseCode(data);
                }
            },
            error: OnError
        });
        $("#frm_Cashbank_Book").show();
        $("#pnlView").hide();
        if (isU()) {
            CashBankBookView.variables.dx_btnSubmit.option({ visible: true });
        }
        else {
            CashBankBookView.variables.dx_btnSubmit.option({ visible: false });
        }
    },

    ClearValues: function () {
        CashBankBookView.variables.Masterid = "";
        CashBankBookView.variables.Oper = 'Add';
        CashBankBookView.variables.addedit = "added";
        CashBankBookView.variables.DeleteDataObj = "";
        $('#place').html('Receive From Acc');
        DevExpress.validationEngine.resetGroup("CashBankBook");
        CashBankBookView.variables.dx_txtPaymentDate.option({ value: new Date() });
        CashBankBookView.variables.dx_txtTransactiontype.option('disabled', false);
        CashBankBookView.variables.dx_txtamt.option("value", "");
        CashBankBookView.variables.dx_txtExchangeRate.option("value", 1);
        CashBankBookView.variables.txtTotalAmountInRs.option("value", "");
        CashBankBookView.variables.dx_txtRemarks.option("value", "");
        CashBankBookView.variables.dx_ddlbankName.option("value", "");
        CashBankBookView.variables.dx_txtcheque.option("value", "");
        CashBankBookView.variables.dx_txtchequeDate.option({ value: new Date() });
        CashBankBookView.variables.txtTotalBillAmount.option("value", "");
        CashBankBookView.variables.txtPandingAmount.option("value", "");
        CashBankBookView.variables.txtPaidAmount.option("value", "");
        CashBankBookView.variables.txtPayingAmount.option("value", "");
        CashBankBookView.variables.txtRemainingAmount.option("value", "");
        CashBankBookView.variables.dx_btnSubmit.option({ visible: true });
        $("#dx_FooterTotalBillAmt").html("");
        $("#dx_FooterTotalPaidAmt").html("");
        $("#dx_FooterTotalPandingAmt").html("");
        $("#dx_FooterTotalAmount").html("");
        $("#dx_FooterTotalKasar").html("");
        $("#spanCashBankCurr").html("");
        $("#spanCurrencyName").html("");
        $("#btnAddSelectionList").html("0.00");
        $("#btnAddSelectionRecieveList").html("0.00");
        $("#frm_Cashbank_Book").hide();
        $("#pnlView").show();
        $("#tbl_DesignDetails tbody").html("");

    },

    deleteRow: function (id) {
        var rowData = CashBankBookView.variables.dx_dataGrid.getVisibleRows()[CashBankBookView.variables.dx_dataGrid.getRowIndexByKey(+id)].data;
        CashBankBookView.variables.Masterid = id;
        CashBankBookView.variables.DeleteDataObj = rowData;
        CashBankBookView.variables.Oper = "Delete";

        if (CashBankBookView.variables.dx_popupRecordDelete) {
            CashBankBookView.variables.dx_popupRecordDelete.option("contentTemplate", CashBankBookView.variables.DeletePopUpOptions.contentTemplate(CashBankBookView.variables.DeleteDataObj).bind(this));
        }
        else {
            CashBankBookView.variables.dx_popupRecordDelete = $("#dx_popupRecordDelete").dxPopup(CashBankBookView.variables.DeletePopUpOptions).dxPopup("instance");
        }

        CashBankBookView.variables.dx_popupRecordDelete.show();
    },

    /*------------------------- get Pending Voucher List -----------------------------*/
    GetPendingVoucherList: function () {
        if (CashBankBookView.variables.dx_txtrecacc.option().selectedItem) {
            $("#tbl_DesignDetails tbody").html('');

            var myfilter = { rules: [] };
            myfilter.rules.push({ field: "ACCID", op: "eq", data: CashBankBookView.variables.dx_txtrecacc.option().selectedItem.accid });

            if (CashBankBookView.variables.dx_txtTransactiontype.option().text == "Cashbank Receive")
                myfilter.rules.push({ field: "PAYMENTTYPE", op: "eq", data: "Receive" });
            else
                myfilter.rules.push({ field: "PAYMENTTYPE", op: "eq", data: "Payment" });

            $.ajax({
                url: getDomain() + CashBankBookView.variables.BindPendingvchr + "&myfilters=" + JSON.stringify(myfilter),
                async: false,
                cache: false,
                type: 'POST',
                success: function (data) {
                    if ($(data).find('RESPONSECODE').text() == "0") {
                        var jsonObject = xml2json.parser(data);
                        if (jsonObject.serviceresponse.detailslist) {
                            var List = [];
                            if (jsonObject.serviceresponse.detailslist.details.length > 0)
                                List = jsonObject.serviceresponse.detailslist.details;
                            else
                                List.push(jsonObject.serviceresponse.detailslist.details);


                            var TotalBillAmt = 0, TotalPaidAmt = 0, TotalPendingAmt = 0;
                            $.each(List, function (key, obj) {
                                CashBankBookView.AddNewLineDetails(key, obj);

                                TotalBillAmt += obj.billamount;
                                TotalPaidAmt += obj.paidamt;
                                TotalPendingAmt += obj.pendingamount;
                            });

                            CashBankBookView.variables.txtTotalBillAmount.option({ value: TotalBillAmt.toFixed(2) });
                            CashBankBookView.variables.txtPaidAmount.option({ value: TotalPaidAmt.toFixed(2) });
                            CashBankBookView.variables.txtPandingAmount.option({ value: TotalPendingAmt.toFixed(2) });

                            $("#dx_FooterTotalBillAmt").html(TotalBillAmt.toFixed(2));
                            $("#dx_FooterTotalPaidAmt").html(TotalPaidAmt.toFixed(2));
                            $("#dx_FooterTotalPandingAmt").html(TotalPendingAmt.toFixed(2));

                        }
                    }
                    else {
                        DevExVariables.InvalidResponseCode(data);
                    }
                },
                error: OnError
            });
        }
    },

    AddNewLineDetails: function (key, obj) {
        $("#tbl_DesignDetails tbody").append(

            '<tr rowno="' + key + '" TransactionId="' + obj.tran_id + '" TransactionType="' + obj.transactiontype + '">'
                + '<td class="TableRowNo">' + (key + 1) + '</td>'
                + '<td class="vchrtype">' + obj.vouchertype + '</td>'
                + '<td class="travchrnno">' + obj.voucherno + '</td>'
                + '<td class="vchrdate">' + obj.voucherdate + '</td>'
                + '<td style="text-align:right;" class="BillAmt">' + obj.billamount.toFixed(2) + '</td>'
                + '<td style="text-align:right;" class="PaidAmount">' + obj.paidamt.toFixed(2) + '</td>'
                + '<td style="text-align:right;" class="PendingAmt">' + obj.pendingamount.toFixed(2) + '</td>'
                + '<td class="Amt"><input type="number" style="text-align:right;" class="form-control" onFocusOut="CashBankBookView.GetpaidAmount(); CashBankBookView.WrongAmountToster();" id="dx_numAmt' + key + '" value="0.00" /></td>'
                + '<td class="Kasar"><input type="number" style="text-align:right;" class="form-control" onFocusOut="CashBankBookView.GetpaidAmount(); CashBankBookView.WrongAmountToster();" id="dx_numAmt' + key + '" value="0.00" /></td>'
            + '</tr>'

        );
    },

    GetpaidAmount: function (key, obj) {
        var PayingAmount = 0, TotalAmt = 0, TotalKasar = 0;
        $("#tbl_DesignDetails tbody tr").each(function (key, obj) {
            PayingAmount += +$(obj).find('.Amt input').val() + +$(obj).find('.Kasar input').val();
            TotalAmt += +$(obj).find('.Amt input').val()
            TotalKasar += +$(obj).find('.Kasar input').val();
        });
        CashBankBookView.variables.txtPayingAmount.option({ value: PayingAmount.toFixed(2) });
        CashBankBookView.variables.txtRemainingAmount.option({ value: (CashBankBookView.variables.txtPandingAmount.option().value - PayingAmount).toFixed(2) });

        $("#dx_FooterTotalAmount").html(TotalAmt.toFixed(2));
        $("#dx_FooterTotalKasar").html(TotalKasar.toFixed(2));
    },

    WrongAmountToster: function (key, obj) {
        $("#tbl_DesignDetails tbody tr").each(function (key, obj) {
            if ((+$(obj).find('.Amt input').val() + +$(obj).find('.Kasar input').val()) > +$(obj).find('.PendingAmt').html()) {
                DevExVariables.Toaster("warning", "You not Deposit Amount more than Panding Amount.");
                $(obj).find('.Amt input').val('');
                $(obj).find('.Kasar input').val('');
                return;
            }
        })
    },

    EditFromGrid: function (val, id, type) {
        var data = {
            "CBT_ID": id,
            "OPER_TYPE": "EditFromGrid",
            "oper": "Edit"
        }
        if (type == "Verify")
            data.ISVERIFY = val;
        $.ajax({
            url: getDomain() + CashBankBookView.variables.PerformMasterOperationUrl,
            data: data,
            async: true,
            cache: false,
            type: 'POST',
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    DevExVariables.Toaster("success", 'Record is updated successfully.');
                    CashBankBookView.variables.dx_dataGrid.refresh();
                }
            },
            error: OnError,
        });
    },

    BindSubBookList: function () {
        var myfilter = { rules: [] };
        myfilter.rules.push({ field: "TYPE", op: "eq", data: "AccSubBook" });
        myfilter.rules.push({ field: "SUBBOOKTYPE", op: "eq", data: "TRANSACTION" });
        myfilter.rules.push({ field: "ONLYALLOWED", op: "eq", data: true });

        $.ajax({
            url: getDomain() + CashBankBookView.variables.BindStaticDataUrl + "&myfilters=" + JSON.stringify(myfilter),
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

                        CashBankBookView.variables.dx_txtTransactiontype.option({
                            dataSource: new DevExpress.data.ArrayStore({
                                data: List.filter(function (x) { return ["Cashbank Receive", "Cashbank Payment"].indexOf(x.subbook) > -1 }),
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

    //---------------------------Share Model -------------------------------------
    ClearShareItemControlls: function () {
        CashBankBookView.variables.dx_txtSharetoPartyList.option({ "value": "" }, { "items": "" }, { "selectedItem": "" });
        CashBankBookView.variables.dx_RadioSocial.option({ value: "WhatsApp" });
        CashBankBookView.variables.dx_txtMobileNo.option({ value: "" });
        CashBankBookView.variables.dx_txtShareMessage.option({ value: 'Dear Sir, ' + $("#hdn_UserName").val() + ' shared a design from TrinityJewells with you. Kindly click on below URL to view shared Design. {SHARE URL}' });
        CashBankBookView.variables.dx_txtSharingSubject.option({ value: "Jewellery Designs shared by TrinityJewells" });
        CashBankBookView.variables.dx_txtSharingEmailBody.option({ value: CashBankBookView.variables.content });
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
        var Type = CashBankBookView.variables.dx_RadioSocial.option().value;
        if (Type == "E-Mail") {
            if (!CashBankBookView.variables.dx_txtSharingEmailId.option().value || !CashBankBookView.variables.dx_txtSharingSubject.option().value || !CashBankBookView.variables.dx_txtSharingEmailBody.option().value) {
                DevExVariables.Toaster("warning", "Email Id, Subject and Email Body are required.");
                return false;
            }
        }
        else {
            if (!CashBankBookView.variables.dx_txtMobileNo.option().value || !CashBankBookView.variables.dx_txtShareMessage.option().value) {
                DevExVariables.Toaster("warning", "Mobile No and Message are required.");
                return false;
            }
        }
        var SelectedDesignList = [], MobileNo = "", MSG = "", Mailbody = "", MailId = "", Suject = "";

        if (Type == "E-Mail") {
            MailId = CashBankBookView.variables.dx_txtSharingEmailId.option().value;
            Suject = CashBankBookView.variables.dx_txtSharingSubject.option().value;
            Mailbody = CashBankBookView.variables.dx_txtSharingEmailBody.option().value;
        }
        else if (Type == "SMS") {
            MobileNo = CashBankBookView.variables.dx_txtMobileNo.option().value;
            MSG = CashBankBookView.variables.dx_txtShareMessage.option().value;
        }
        else {
            MSG = CashBankBookView.variables.dx_txtShareMessage.option().value;
        }

        var ShareLink = getERPDomain() + "/Sharing/VoucherView?VoucherId=" + CashBankBookView.variables.Masterid + "/VoucherType=CashBankBook";
        var message = "";
        if (Type == "E-Mail") {
            message = Mailbody.replace("{SHARE URL}", '<a href="' + ShareLink + '" target="_blank">Click here...</a>');
        }
        else {
            message = MSG.replace("{SHARE URL}", ShareLink);
        }
        var result = CashBankBookView.ShareSocialMedia(Type, MobileNo, message, MailId, Suject);

        CashBankBookView.ClearShareItemControlls();
        $("#ModalSharing").modal("hide");
    },

    BindAccountBalance: function () {
        var myfilter = { rules: [] };
        myfilter.rules.push({ field: "ACCID", op: "eq", data: CashBankBookView.variables.dx_txtcashbankacc.option().selectedItem.accid });
        myfilter.rules.push({ field: "ASONDATE", op: "eq", data: CashBankBookView.variables.dx_txtPaymentDate.option().text });

        $.ajax({
            url: getDomain() + CashBankBookView.variables.BindAccountbalancelist + "&myfilters=" + JSON.stringify(myfilter),
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
        myfilter.rules.push({ field: "ACCID", op: "eq", data: CashBankBookView.variables.dx_txtrecacc.option().selectedItem.accid });
        myfilter.rules.push({ field: "ASONDATE", op: "eq", data: CashBankBookView.variables.dx_txtPaymentDate.option().text });

        $.ajax({
            url: getDomain() + CashBankBookView.variables.BindAccountbalancelist + "&myfilters=" + JSON.stringify(myfilter),
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
    CashBankBookView.FormInitialize();
    CashBankBookView.initializeDevExgrid();
    CashBankBookView.GetpaidAmount();
    CashBankBookView.BindSubBookList();

    if (+$("#hdnSBOOKID").val()) {
        $("#pnlView").hide();
        $("#frm_Cashbank_Book").show();
        CashBankBookView.variables.Masterid = "";


        CashBankBookView.variables.dx_txtTransactiontype.option({ value: +$("#hdnSBOOKID").val() });
        CashBankBookView.variables.dx_txtTransactiontype.option({ disabled: true });

        if (CashBankBookView.variables.dx_txtTransactiontype.option().selectedItem) {
            if (CashBankBookView.variables.dx_txtTransactiontype.option().selectedItem.subbook == "Cashbank Receive") {
                $('#place').html('Receive From Acc')
            }
            else {
                $('#place').html('Payment to Acc')
            }
        }
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
    CashBankBookView.variables.Masterid = id;
    CashBankBookView.ClearShareItemControlls();
    $("#ModalSharing").modal('show');
}