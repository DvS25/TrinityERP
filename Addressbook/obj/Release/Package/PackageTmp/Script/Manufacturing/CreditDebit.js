var CreditDebitView = {
    variables: {
        BindAccListUrl: "/Common/BindMastersDetails?ServiceName=ACCOUNTMASTER_GET",
        BindAccountbalancelist: "/Common/BindMastersDetails?ServiceName=ACC_BALANCE_GET",
        BindMainGridListUrl: "/Common/BindMastersDetails?ServiceName=ACC_CREDITDEBIT_GET",
        PerformMasterOperationUrl: "/Common/OpeartionsOnMaster?ServiceName=ACC_CREDITDEBIT_CRUD",
        BindPartyList: "/Common/BindMastersDetails?ServiceName=ACCOUNTMASTER_GET",
        BindStaticDataUrl: "/Common/BindMastersDetails?ServiceName=STATIC_MASTER_GET&IsActive=true",
        BindBookStaticDataUrl: "/Common/BindMastersDetails?ServiceName=STATIC_ACCBOOK_MASTER_GET",

        dx_VoucherType: "",
        Oper: 'Add',
        addedit: "added",
        Masterid: "",
        DeleteDataObj: "",
        RowCount: 1,

        /*------------------------variables for main form Controls-----------------------*/
        dx_txtTransactiontype: "",
        dx_popupRecordDelete: "",
        DeleteDataObj: "",
        DeletePopUpOptions: {
            width: 300,
            height: 200,
            contentTemplate: function () {
                return $("<div />").append(
                    $("<p>Voucher No: <span>" + CreditDebitView.variables.DeleteDataObj.voucherno + "</span></p>"
                     + "<p>Voucher Type: <span>" + CreditDebitView.variables.DeleteDataObj.vouchertype + "</span></p>"
                     + "<p>Amount: <span>" + CreditDebitView.variables.DeleteDataObj.totalamt + "</span></p>"
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
                            "CD_ID": CreditDebitView.variables.Masterid,
                            "oper": CreditDebitView.variables.Oper,
                        }
                        CreditDebitView.savedata(data);
                        CreditDebitView.variables.dx_popupRecordDelete.hide();
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

        dx_dataGrid: "",

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
        var now = new Date();

        //---------------------------------add new button ---------------------------------
        CreditDebitView.variables.dx_btnAddNew = $("#dx_btnAddNew").dxButton({
            stylingMode: "outlined",
            icon: "plus",
            text: "Add New",
            type: "default",
            validationGroup: "CreditDebit",
            onClick: function (e) {
                $("#frm_CreditDebit").show();
                $("#pnlView").hide();
                CreditDebitView.variables.Masterid = "";
            }
        }).dxButton("instance");

        //-----------------------------------start top right controls--------------------------------------------
        CreditDebitView.variables.dx_txtTransactiontype = $("#dx_txtTransactiontype").dxSelectBox({
            placeholder: "Select Book Type...",
            onItemClick: function (e) {
                if (e.component.option().selectedItem) {
                    if (e.component.option().selectedItem.showas == "Credit") {
                        $('#place').html('Receive From Acc')
                    }
                    else {
                        $('#place').html('Payment to Acc')
                    }
                }
            },
            searchEnabled: true,
        }).dxValidator({
            validationGroup: "CreditDebit",
            validationRules: [{
                type: "required",
                message: "Select Book Type"
            }]
        }).dxSelectBox("instance");

        CreditDebitView.variables.dx_txtcashbankacc = $("#dx_txtcashbankacc").dxAutocomplete({
            placeholder: "Select Account...",
            mode: "search",
            dataSource: new DevExpress.data.CustomStore({
                load: function (loadOptions) {
                    var deferred = $.Deferred();

                    var myfilter = { rules: [] };
                    myfilter.rules.push({ field: "GROUPNAME", op: "eq", data: "Current Assets" });

                    $.ajax({
                        url: getDomain() + CreditDebitView.variables.BindAccListUrl + "&_search=true&searchField=ACCOUNTNAME&searchOper=cn&searchString=" + loadOptions.searchValue + "&myfilters=" + JSON.stringify(myfilter),
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
                        CreditDebitView.BindAccountBalance();
                        CreditDebitView.variables.dx_txtcashbankacc.option().selectedItem.accid;
                        $("#spanCashBankCurr").html(e.component.option().selectedItem.currencycode);
                    }
                    else {
                        CreditDebitView.variables.dx_txtcashbankacc = "";
                        $("#spanCashBankCurr").html('');
                    }
                }
            },
            valueExpr: "accountname",
        }).dxValidator({
            validationGroup: "CreditDebit",
            validationRules: [{
                type: "required",
                message: "Select Bank Acc"
            }]
        }).dxAutocomplete("instance");

        CreditDebitView.variables.dx_txtrecacc = $("#dx_txtrecacc").dxAutocomplete({
            placeholder: "Select Account...",
            mode: "search",
            dataSource: new DevExpress.data.CustomStore({
                load: function (loadOptions) {
                    var deferred = $.Deferred();

                    var myfilter = { rules: [] };
                    myfilter.rules.push({ field: "GROUPNAME", op: "eq", data: "Loans And Advances,Loans And Liabilities,Investments" });

                    $.ajax({
                        url: getDomain() + CreditDebitView.variables.BindAccListUrl + "&_search=true&searchField=ACCOUNTNAME&searchOper=cn&searchString=" + loadOptions.searchValue + "&myfilters=" + JSON.stringify(myfilter),
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
                        CreditDebitView.BindAccountReceiveBalance();
                        CreditDebitView.variables.dx_txtrecacc.option().selectedItem.accid;
                        $("#spanCurrencyName").html(e.component.option().selectedItem.currencycode);
                    }
                    else {
                        CreditDebitView.variables.dx_txtrecacc = "";
                        $("#spanCurrencyName").html('');
                    }

                }
            },
            itemTemplate: function (data) {
                return $("<div class='product-name'>" + "(" + data.partycode + ")&nbsp;" + data.accountname + "</div>");
            },
        }).dxValidator({
            validationGroup: "CreditDebit",
            validationRules: [{
                type: "required",
                message: "Select Receive Acc"
            }]
        }).dxAutocomplete("instance");

        CreditDebitView.variables.dx_txtVoucherNo = $("#dx_txtVoucherNo").dxTextBox({
            readOnly: true,
        }).dxValidator({
            validationGroup: "CreditDebit",
            validationRules: []
        }).dxTextBox("instance");

        CreditDebitView.variables.dx_txtduedays = $("#dx_txtduedays").dxTextBox({
            mode: "number",
            value: 0,
        }).dxValidator({
            validationGroup: "CreditDebit",
            validationRules: [{
                type: "required",
                message : "Enter Due Days"
            }]
        }).dxTextBox("instance");

        CreditDebitView.variables.dx_txtVoucherDate = $("#dx_txtVoucherDate").dxDateBox({
            type: "date",
            value: now,
            showClearButton: true,
            useMaskBehavior: true,
            displayFormat: "dd MMM yyyy",
        }).dxValidator({
            validationGroup: "CreditDebit",
            validationRules: [{
                type: "required",
                message: "Select Voucher Date"
            }]
        }).dxDateBox("instance");

        CreditDebitView.variables.dx_txtcheque = $("#dx_txtcheque").dxTextBox({
            mode: "text",
            placeholder: "Enter cheque No..."
        }).dxTextBox("instance");

        CreditDebitView.variables.dx_VoucherType = $("#dx_VoucherType").dxSelectBox({
            //dataSource: ["Credit", "Debit"],
            placeholder: "Select Voucher Type...",
            searchEnabled: true,
        }).dxValidator({
            validationGroup: "CreditDebit",
            validationRules: [{
                type: "required",
                message: "Select Voucher Type"
            }]
        }).dxSelectBox("instance");

        CreditDebitView.variables.dx_txtBankName = $("#dx_txtBankName").dxTextBox({
            dataSource: [],
            placeholder: "Enter Bank Name...",
            searchEnabled: true,
        }).dxTextBox("instance");

        CreditDebitView.variables.dx_txtAmount = $("#dx_txtAmount").dxTextBox({
            mode: "text",
            onFocusOut: function (data) {
                var TotalAmountInRs = 0;
                TotalAmountInRs += +CreditDebitView.variables.dx_txtAmount.option().value;
                CreditDebitView.variables.txtTotalAmountInRs.option({ value: (TotalAmountInRs.toFixed(2)) });
            },
            placeholder: "Enter Amount..."
        }).dxValidator({
            validationGroup: "CreditDebit",
            validationRules: [{
                type : "required",
                message: "Enter Amount"
            }],
            onFocusOut: function (data) {
                var TotalAmountInRs = 0;
                TotalAmountInRs += +CreditDebitView.variables.dx_txtAmount.option().value * CreditDebitView.variables.dx_txtExchangeRate.option().value;
                CreditDebitView.variables.txtTotalAmountInRs.option({ value: (TotalAmountInRs.toFixed(2)) });
            },
        }).dxTextBox("instance");

        CreditDebitView.variables.dx_txtchequeDate = $("#dx_txtchequeDate").dxDateBox({
            type: "date",
            value: now,
            showClearButton: true,
            useMaskBehavior: true,
            displayFormat: "dd MMM yyyy",
        }).dxDateBox("instance");

        CreditDebitView.variables.txtTotalAmountInRs = $("#txtTotalAmountInRs").dxNumberBox({
            readOnly: true,
        }).dxValidator({
            validationGroup: "CreditDebit",
            validationRules: []
        }).dxNumberBox("instance");

        CreditDebitView.variables.dx_txtpaymenttype = $("#dx_txtpaymenttype").dxSelectBox({
            dataSource: ["Cash", "UPI", "IMPS", "NEFT", "RTGS", "Cheque", "Credit Card", "Debit Card", "Inward Remittance", "Internet Banking"],
            placeholder: "Select Payment Type...",
            searchEnabled: true,
        }).dxValidator({
            validationGroup: "CreditDebit",
            validationRules: [{
                type: "required",
                message: "Select Payment Type"
            }]
        }).dxSelectBox("instance");

        CreditDebitView.variables.dx_txtExchangeRate = $("#dx_txtExchangeRate").dxNumberBox({
            value: 1,
            min: 1,
            onFocusOut: function (data) {
                var TotalAmountInRs = 0;
                TotalAmountInRs += +CreditDebitView.variables.dx_txtAmount.option().value * CreditDebitView.variables.dx_txtExchangeRate.option().value;
                CreditDebitView.variables.txtTotalAmountInRs.option({ value: (TotalAmountInRs.toFixed(2)) });
            },
        }).dxValidator({
            validationGroup: "CreditDebit",
            validationRules: [{
                type: "required",
                message: "Exchange rate is required"
            }]
        }).dxNumberBox("instance");

        //-----------------------------------/End top right controls--------------------------------------------

        //------------------------------- Start bottom left contanct--------------------------------------

        CreditDebitView.variables.dx_txtRemarks = $("#dx_txtRemarks").dxTextArea({
            height: 110,
            placeholder: "Enter Remark"

        }).dxTextArea("instance");
        //--------------------------------------- Submit button---------------------------------------

        CreditDebitView.variables.dx_btnSubmit = $("#dx_btnSubmit").dxButton({
            icon: "check",
            text: "Submit",
            type: "success",
            //useSubmitBehavior: true,
            onClick: function (e) {
                var validation = DevExpress.validationEngine.validateGroup("CreditDebit");
                if (!validation.isValid) {
                    DevExVariables.Toaster("warning", "Please fill all required fields before submit.");
                    return;
                }
                CreditDebitView.btnMasterSubmit();
            }
        }).dxButton("instance");

        //--------------------------------------- Cancle button---------------------------------------

        CreditDebitView.variables.dx_btnCancel = $("#dx_btnCancel").dxButton({
            icon: "close",
            text: "Cancel",
            type: "danger",
            onClick: function (e) {
                //$('#tbl_DesignDetails').html('');
                //CreditDebitView.variables.dx_dataGrid.refresh();
                CreditDebitView.ClearValues();
                //e.validationGroup.reset();
            }
        }).dxButton("instance");

        /*----------------------------Sharing Modal--------------------------*/
        CreditDebitView.variables.dx_txtSharetoPartyList = $("#dx_txtSharetoPartyList").dxAutocomplete({
            placeholder: "Select Party Name...",
            mode: "search",
            dataSource: new DevExpress.data.CustomStore({
                load: function (loadOptions) {
                    var deferred = $.Deferred();
                    $.ajax({
                        url: getDomain() + CreditDebitView.variables.BindAccListUrl + "&_search=true&searchField=ACCOUNTNAME&searchOper=cn&searchString=" + loadOptions.searchValue,
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
                    CreditDebitView.variables.dx_txtSharingEmailId.option({ value: data.selectedItem.emailid });
                    CreditDebitView.variables.dx_txtMobileNo.option({ value: data.selectedItem.mobile1 });

                }
                else {
                    CreditDebitView.variables.dx_txtSharingEmailId.option("value", "");
                    CreditDebitView.variables.dx_txtMobileNo.option("value", "");
                }
            }
        }).dxAutocomplete("instance");

        CreditDebitView.variables.dx_btnSubmitShare = $("#dx_btnSubmitShare").dxButton({
            stylingMode: "outlined",
            icon: "fa fa-paper-plane",
            text: "Send",
            type: "default",
            useSubmitBehavior: false,
            visible: true,
            onClick: function (e) {
                CreditDebitView.SharingDetails();
            }
        }).dxButton("instance");

        CreditDebitView.variables.dx_RadioSocial = $("#dx_RadioSocial").dxRadioGroup({
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

        CreditDebitView.variables.dx_txtMobileNo = $("#dx_txtMobileNo").dxTextBox({ mode: "number" }).dxTextBox("instance");

        CreditDebitView.variables.dx_txtShareMessage = $("#dx_txtShareMessage").dxTextArea({
            height: 90,
            value: 'Dear Sir, ' + $("#hdn_UserName").val() + ' shared a design from TrinityJewells with you. Kindly click on below URL to view shared Design. {SHARE URL}',
        }).dxTextArea("instance");

        CreditDebitView.variables.dx_txtSharingSubject = $("#dx_txtSharingSubject").dxTextBox({
            value: "Jewellery Designs shared by TrinityJewells"
        }).dxTextBox("instance");

        CreditDebitView.variables.dx_txtSharingEmailId = $("#dx_txtSharingEmailId").dxTextBox({ placeholder: "Enter Email Id..." }).dxTextBox("instance");

        CreditDebitView.variables.dx_txtSharingEmailBody = $("#dx_txtSharingEmailBody").dxHtmlEditor({
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
            value: CreditDebitView.variables.content,
            onValueChanged: function (e) {
                //$(".value-content").text(e.component.option("value"));
            }
        }).dxHtmlEditor("instance");
        /*----------------------------/ Sharing Modal--------------------------*/

    },

    initializeDevExgrid: function () {
        CreditDebitView.variables.dx_dataGrid = $("#dx_dataGrid").dxDataGrid({
            dataSource: new DevExpress.data.CustomStore({
                key: "cd_id",
                load: function (loadOptions) {
                    var deferred = $.Deferred();

                    var myfilter = { rules: [] };
                    myfilter.rules.push({ field: "SUBBOOKTYPE", op: "eq", data: "LoanAndAdvance" });

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
                        url: getDomain() + CreditDebitView.variables.BindMainGridListUrl + "&" + parameters.join("&") + "&myfilters=" + JSON.stringify(myfilter),
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
            columns: [{ dataField: "cd_id", allowFiltering: false, allowSorting: true, sortIndex: 1, sortOrder: "desc", visible: false },
                { dataField: "voucherno", caption: "Voucher No", dataType: "string", filterOperations: ["contains"], allowSorting: true, allowFiltering: true, allowHeaderFiltering: false },
                { dataField: "vouchertype", caption: "Voucher Type", dataType: "string", filterOperations: ["contains"], visible: true, allowSorting: true, allowFiltering: true, allowHeaderFiltering: false},
                { dataField: "voucherdate", caption: "Voucher Date", dataType: "string", filterOperations: ["contains"], allowSorting: true, allowFiltering: true, allowHeaderFiltering: false },
                { dataField: "accountname", caption: "Cash/Bank Acc", dataType: "string", filterOperations: ["contains"], allowSorting: true, allowFiltering: true, allowHeaderFiltering: false },
                { dataField: "receiveaccname", caption: "Receive From Acc", dataType: "string", filterOperations: ["contains"], allowSorting: true, allowFiltering: true, allowHeaderFiltering: false },
                { dataField: "remark", caption: "Remark", dataType: "string", filterOperations: ["contains"], allowSorting: false, allowFiltering: false, allowHeaderFiltering: false, visible: false },
                { dataField: "bankname", caption: "Bank Name", dataType: "string", filterOperations: ["contains"], allowSorting: false, allowFiltering: false, allowHeaderFiltering: false},
                { dataField: "duedays", caption: "Due Days", dataType: "number", filterOperations: ["contains"], allowSorting: false, allowFiltering: false, allowHeaderFiltering: false },
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
                                     CreditDebitView.EditFromGrid(data.value, options.key, 'Verify');
                                 }
                             }).appendTo(container);
                         }
                         else
                             DevExVariables.LabelTemplate(container, options);
                     }
                 },
                {
                    dataField: "Action", caption: "Action", alignment: "center", allowFiltering: false, allowSorting: false, fixed: true, fixedPosition: "right",
                    cellTemplate: function (container, options) {
                        DevExVariables.ActionTemplate(container, options, true, true, "CreditDebitView", "Attachments,Share,Pdf");
                    }
                },
            ]
        }).dxDataGrid("instance");
    },

    btnMasterSubmit: function () {
        CreditDebitView.variables.Oper = 'Add';
        CreditDebitView.variables.addedit = "added";

        if (CreditDebitView.variables.Masterid != "0" && parseInt(CreditDebitView.variables.Masterid) > 0) {
            CreditDebitView.variables.Oper = 'Edit';
            CreditDebitView.variables.addedit = 'updated';
        }

        CreditDebitView.variables.dx_btnSubmit.option({ disabled: true });

        var data = {
            "CD_ID": CreditDebitView.variables.Masterid,
            "SBOOKID": CreditDebitView.variables.dx_txtTransactiontype.option().selectedItem.sbookid,
            "VOUCHERTYPE": CreditDebitView.variables.dx_txtTransactiontype.option().selectedItem.subbook,
            "VOUCHERDATE": CreditDebitView.variables.dx_txtVoucherDate.option().text,
            "CASHBANKACCID": CreditDebitView.variables.dx_txtcashbankacc.option().selectedItem.accid,
            "PAYERRECIEVERACCID": CreditDebitView.variables.dx_txtrecacc.option().selectedItem.accid,
            "CASHBANKCURRENCYID": CreditDebitView.variables.dx_txtcashbankacc.option().selectedItem.currencyid,
            "CURRENCYID": CreditDebitView.variables.dx_txtrecacc.option().selectedItem.currencyid,
            "EXCHANGERATE": CreditDebitView.variables.dx_txtExchangeRate.option().value,
            "DUEDAYS": CreditDebitView.variables.dx_txtduedays.option().value,
            "PAYMENTMODE": CreditDebitView.variables.dx_txtpaymenttype.option().value,
            "TOTALAMT": CreditDebitView.variables.dx_txtAmount.option().value,
            "TOTALAMTINRS": CreditDebitView.variables.txtTotalAmountInRs.option().value,
            "oper": CreditDebitView.variables.Oper,
        }

        if (CreditDebitView.variables.dx_txtBankName.option().value)
            data.BANKNAME = CreditDebitView.variables.dx_txtBankName.option().value;

        if (CreditDebitView.variables.dx_txtcheque.option().value)
            data.CHEQUENO = CreditDebitView.variables.dx_txtcheque.option().value;

        if (CreditDebitView.variables.dx_txtchequeDate.option().value)
            data.CHEQUEDATE = CreditDebitView.variables.dx_txtchequeDate.option().text;

        if (CreditDebitView.variables.dx_txtRemarks.option().value)
            data.REMARK = CreditDebitView.variables.dx_txtRemarks.option().value;

        CreditDebitView.savedata(data);
    },

    savedata: function (data) {
        $.ajax({
            url: getDomain() + CreditDebitView.variables.PerformMasterOperationUrl,
            data: data,
            async: true,
            cache: false,
            type: 'POST',
            beforeSend: function () {
                dx_LoaderTrinity.show();
            },
            complete: function () {
                dx_LoaderTrinity.hide();
                CreditDebitView.variables.dx_btnSubmit.option({ disabled: false });
            },
            success: CreditDebitView.btnMasterSubmitOnSuccess,
            error: OnError,
        });
    },

    btnMasterSubmitOnSuccess: function (data) {
        if ($(data).find('RESPONSECODE').text() == "0") {
            DevExVariables.Toaster("success", 'Record is ' + CreditDebitView.variables.addedit + ' successfully');
            $('#frm_CreditDebit').hide();
            $('#pnlView').show();
            if (CreditDebitView.variables.dx_popupRecordDelete)
                CreditDebitView.variables.dx_popupRecordDelete.hide();

            CreditDebitView.ClearValues();
            CreditDebitView.variables.dx_dataGrid.refresh();
        }
        else {
            DevExVariables.InvalidResponseCode(data);
        }
    },

    ClearValues: function () {
        CreditDebitView.variables.Masterid = "";
        CreditDebitView.variables.Oper = 'Add';
        CreditDebitView.variables.addedit = "added";
        CreditDebitView.variables.DeleteDataObj = "";
        $('#place').html('Receive From Acc');
        CreditDebitView.variables.dx_txtTransactiontype.option('disabled', false);
        CreditDebitView.variables.dx_txtTransactiontype.option("value", "");
        CreditDebitView.variables.dx_txtcashbankacc.option("value", "");
        CreditDebitView.variables.dx_txtrecacc.option("value", "");
        CreditDebitView.variables.dx_txtAmount.option("value", "");
        CreditDebitView.variables.txtTotalAmountInRs.option("value", "");
        CreditDebitView.variables.dx_txtRemarks.option("value", "");
        CreditDebitView.variables.dx_txtBankName.option("value", "");
        CreditDebitView.variables.dx_txtcheque.option("value", "");
        CreditDebitView.variables.dx_btnSubmit.option({ visible: true });

        DevExpress.validationEngine.resetGroup("CreditDebit");
        CreditDebitView.variables.dx_txtduedays.option("value", 0);
        CreditDebitView.variables.dx_txtVoucherDate.option({ value: new Date() });
        CreditDebitView.variables.dx_txtchequeDate.option({ value: new Date() });
        CreditDebitView.variables.dx_txtExchangeRate.option("value", 1);

        $("#frm_CreditDebit").hide();
        $("#pnlView").show();
        $("#spanCashBankCurr").html("");
        $("#spanCurrencyName").html("");
        $("#btnAddSelectionList").html("0.00");
        $("#btnAddSelectionRecieveList").html("0.00");
        //$("#tbl_DesignDetails tbody").html("");
    },

    deleteRow: function (id) {
        var rowData = CreditDebitView.variables.dx_dataGrid.getVisibleRows()[CreditDebitView.variables.dx_dataGrid.getRowIndexByKey(+id)].data;
        CreditDebitView.variables.Masterid = id;
        CreditDebitView.variables.DeleteDataObj = rowData;
        CreditDebitView.variables.Oper = "Delete";

        if (CreditDebitView.variables.dx_popupRecordDelete) {
            CreditDebitView.variables.dx_popupRecordDelete.option("contentTemplate", CreditDebitView.variables.DeletePopUpOptions.contentTemplate(CreditDebitView.variables.DeleteDataObj).bind(this));
        }
        else {
            CreditDebitView.variables.dx_popupRecordDelete = $("#dx_popupRecordDelete").dxPopup(CreditDebitView.variables.DeletePopUpOptions).dxPopup("instance");
        }

        CreditDebitView.variables.dx_popupRecordDelete.show();
    },

    triggerId: function (id) {
        var rowData = CreditDebitView.variables.dx_dataGrid.getVisibleRows()[CreditDebitView.variables.dx_dataGrid.getRowIndexByKey(+id)].data;
        CreditDebitView.variables.Masterid = id;

        if (rowData.showas == "Credit") {
            $('#place').html('Receive From Acc')
        }
        else {
            $('#place').html('Payment to Acc')
        }

        CreditDebitView.variables.dx_txtTransactiontype.option('disabled', true);
        CreditDebitView.variables.dx_txtTransactiontype.option({ value: rowData.sbookid });
        CreditDebitView.variables.dx_txtVoucherDate.option({ value: rowData.voucherdate });
        CreditDebitView.variables.dx_txtpaymenttype.option({ value: rowData.paymentmode });
        CreditDebitView.variables.dx_txtcashbankacc.option({
            items: [{ accid: rowData.cashbankaccid, accountname: rowData.accountname, currencycode1: rowData.cashbankcurcode, currencyid: rowData.cashbankcurrencyid }],
            selectedItem: { accid: rowData.cashbankaccid, accountname: rowData.accountname, currencycode1: rowData.cashbankcurcode, currencyid: rowData.cashbankcurrencyid },
            value: rowData.accountname
        });
        CreditDebitView.variables.dx_txtrecacc.option({
            items: [{ accid: rowData.payerrecieveraccid, accountname: rowData.receiveaccname, currencycode: rowData.currencycode, currencyid: rowData.currencyid }],
            selectedItem: { accid: rowData.payerrecieveraccid, accountname: rowData.receiveaccname, currencycode: rowData.currencycode, currencyid: rowData.currencyid },
            value: rowData.receiveaccname
        });
        CreditDebitView.BindAccountBalance();
        CreditDebitView.BindAccountReceiveBalance();
        CreditDebitView.variables.dx_txtVoucherNo.option({ value: rowData.voucherno });
        CreditDebitView.variables.dx_txtAmount.option({ value: rowData.totalamt });
        CreditDebitView.variables.dx_txtExchangeRate.option({ value: rowData.exchangerate });
        $("#spanCashBankCurr").html(CreditDebitView.variables.dx_txtcashbankacc.option().selectedItem.currencycode1);
        $("#spanCurrencyName").html(CreditDebitView.variables.dx_txtrecacc.option().selectedItem.currencycode);
        //CreditDebitView.variables.dx_ddlCurrencyName.option({ value: rowData.currencycode });
        //CreditDebitView.variables.dx_ddlCashBankCurr.option({ value: rowData.currencycode });
        CreditDebitView.variables.txtTotalAmountInRs.option({ value: rowData.totalamtinrs });
        CreditDebitView.variables.dx_txtduedays.option({ value: rowData.duedays });
        CreditDebitView.variables.dx_txtRemarks.option({ value: rowData.remark });
        CreditDebitView.variables.dx_txtBankName.option({ value: rowData.bankname });
        CreditDebitView.variables.dx_txtcheque.option({ value: rowData.chequeno });
        CreditDebitView.variables.dx_txtchequeDate.option({ value: rowData.chequedate });
        $("#frm_CreditDebit").show();
        $("#pnlView").hide();
        if (isU()) {
            CreditDebitView.variables.dx_btnSubmit.option({ visible: true });
        }
        else {
            CreditDebitView.variables.dx_btnSubmit.option({ visible: false });
        }
    },

    EditFromGrid: function (val, id, type) {
        var data = {
            "CD_ID": id,
            "OPER_TYPE": "EditFromGrid",
            "oper": "Edit"
        }
        if (type == "Verify")
            data.ISVERIFY = val;
        $.ajax({
            url: getDomain() + CreditDebitView.variables.PerformMasterOperationUrl,
            data: data,
            async: true,
            cache: false,
            type: 'POST',
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    DevExVariables.Toaster("success", 'Record is updated successfully.');
                    CreditDebitView.variables.dx_dataGrid.refresh();
                }
            },
            error: OnError,
        });
    },

    BindSubBookList: function () {
        var myfilter = { rules: [] };
        myfilter.rules.push({ field: "TYPE", op: "eq", data: "AccSubBook" });
        myfilter.rules.push({ field: "SUBBOOKTYPE", op: "eq", data: "LoanAndAdvance" });
        myfilter.rules.push({ field: "ONLYALLOWED", op: "eq", data: true });

        $.ajax({
            url: getDomain() + CreditDebitView.variables.BindStaticDataUrl + "&myfilters=" + JSON.stringify(myfilter),
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

                        CreditDebitView.variables.dx_txtTransactiontype.option({
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


    //---------------------------Share Model -------------------------------------
    ClearShareItemControlls: function () {
        CreditDebitView.variables.dx_txtSharetoPartyList.option({ "value": "" }, { "items": "" }, { "selectedItem": "" });
        CreditDebitView.variables.dx_RadioSocial.option({ value: "WhatsApp" });
        CreditDebitView.variables.dx_txtMobileNo.option({ value: "" });
        CreditDebitView.variables.dx_txtShareMessage.option({ value: 'Dear Sir, ' + $("#hdn_UserName").val() + ' shared a design from TrinityJewells with you. Kindly click on below URL to view shared Design. {SHARE URL}' });
        CreditDebitView.variables.dx_txtSharingSubject.option({ value: "Jewellery Designs shared by TrinityJewells" });
        CreditDebitView.variables.dx_txtSharingEmailBody.option({ value: CreditDebitView.variables.content });
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
        var Type = CreditDebitView.variables.dx_RadioSocial.option().value;
        if (Type == "E-Mail") {
            if (!CreditDebitView.variables.dx_txtSharingEmailId.option().value || !CreditDebitView.variables.dx_txtSharingSubject.option().value || !CreditDebitView.variables.dx_txtSharingEmailBody.option().value) {
                DevExVariables.Toaster("warning", "Email Id, Subject and Email Body are required.");
                return false;
            }
        }
        else {
            if (!CreditDebitView.variables.dx_txtMobileNo.option().value || !CreditDebitView.variables.dx_txtShareMessage.option().value) {
                DevExVariables.Toaster("warning", "Mobile No and Message are required.");
                return false;
            }
        }
        var SelectedDesignList = [], MobileNo = "", MSG = "", Mailbody = "", MailId = "", Suject = "";

        if (Type == "E-Mail") {
            MailId = CreditDebitView.variables.dx_txtSharingEmailId.option().value;
            Suject = CreditDebitView.variables.dx_txtSharingSubject.option().value;
            Mailbody = CreditDebitView.variables.dx_txtSharingEmailBody.option().value;
        }
        else if (Type == "SMS") {
            MobileNo = CreditDebitView.variables.dx_txtMobileNo.option().value;
            MSG = CreditDebitView.variables.dx_txtShareMessage.option().value;
        }
        else {
            MSG = CreditDebitView.variables.dx_txtShareMessage.option().value;
        }

        var ShareLink = getDomain() + "/Sharing/VoucherView?VoucherId=" + CreditDebitView.variables.Masterid + "/VoucherType=CreditDebit";
        var message = "";
        if (Type == "E-Mail") {
            message = Mailbody.replace("{SHARE URL}", '<a href="' + ShareLink + '" target="_blank">Click here...</a>');
        }
        else {
            message = MSG.replace("{SHARE URL}", ShareLink);
        }
        var result = CreditDebitView.ShareSocialMedia(Type, MobileNo, message, MailId, Suject);

        CreditDebitView.ClearShareItemControlls();
        $("#ModalSharing").modal("hide");
    },

    BindAccountBalance: function () {
        var myfilter = { rules: [] };
        myfilter.rules.push({ field: "ACCID", op: "eq", data: CreditDebitView.variables.dx_txtcashbankacc.option().selectedItem.accid });
        myfilter.rules.push({ field: "ASONDATE", op: "eq", data: CreditDebitView.variables.dx_txtVoucherDate.option().text });

        $.ajax({
            url: getDomain() + CreditDebitView.variables.BindAccountbalancelist + "&myfilters=" + JSON.stringify(myfilter),
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
        myfilter.rules.push({ field: "ACCID", op: "eq", data: CreditDebitView.variables.dx_txtrecacc.option().selectedItem.accid });
        myfilter.rules.push({ field: "ASONDATE", op: "eq", data: CreditDebitView.variables.dx_txtVoucherDate.option().text });

        $.ajax({
            url: getDomain() + CreditDebitView.variables.BindAccountbalancelist + "&myfilters=" + JSON.stringify(myfilter),
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
    CreditDebitView.FormInitialize();
    CreditDebitView.initializeDevExgrid();
    CreditDebitView.BindSubBookList();

    if (+$("#hdnSBOOKID").val()) {
        $("#pnlView").hide();
        $("#frm_CreditDebit").show();
        CreditDebitView.variables.Masterid = "";

        CreditDebitView.variables.dx_txtTransactiontype.option({ value: +$("#hdnSBOOKID").val() });
        CreditDebitView.variables.dx_txtTransactiontype.option({ disabled: true });

        if (CreditDebitView.variables.dx_txtTransactiontype.option().selectedItem) {
            if (CreditDebitView.variables.dx_txtTransactiontype.option().selectedItem.showas == "Credit") {
                $('#place').html('Receive From Acc')
            }
            else {
                $('#place').html('Payment to Acc')
            }
        }
    }
});

function VoucherShare(id) {
    CreditDebitView.variables.Masterid = id;
    CreditDebitView.ClearShareItemControlls();
    $("#ModalSharing").modal('show');
}
