var Contraview = {
    variables: {
        BindAccListUrl: "/Common/BindMastersDetails?ServiceName=ACCOUNTMASTER_GET",
        BindAccountbalancelist: "/Common/BindMastersDetails?ServiceName=ACC_BALANCE_GET",
        BindMainGridListUrl: "/Common/BindMastersDetails?ServiceName=ACC_CASHBANK_TRANSACTION_GET",
        PerformMasterOperationUrl: "/Common/OpeartionsOnMaster?ServiceName=ACC_CONTRAENTRY_CRUD",
        BindTaxProfile: "/Common/BindMastersDetails?ServiceName=ACC_TAXPROFILE_GET",
        BindItemMaster: "/Common/BindMastersDetails?ServiceName=ACC_ITEMMASTER_GET",
        BindDetailListUrl: "/Common/BindMastersDetails?ServiceName=ACC_CONTRA_CHARGE_DETAIL_GET",
        BindAmtListUrl: "/Common/OpeartionsOnMaster?ServiceName=ACC_CONTRA_CHARGE_AMT_GET",
        GlobalTotal: [],
        taxlist: [],
        taxprofilelist: [],
        dx_txtcreditacc: "",
        dx_txtdebitacc: "",
        dx_ddlCurrencyName: "",
        dx_ddlCashBankCurr: "",
        dx_txtExchangeRate: "",
        dx_VchrNo: "",
        PartyList_accid: "",
        RowCount: 1,
        itemList: "",
        GetItemList: [],
        GetTypeList: [],

        dx_txtRemarks: '',
        ddlHsnCode: '',
        txtTotal: '',
        txtTotalBillAmount: '',
        txtRemainingAmount: '',
        dx_txtPaymentDate: '',
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
                    $("<p>Voucher No: <span>" + Contraview.variables.DeleteDataObj.voucherno + "</span></p>"
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
                            "CBT_ID": Contraview.variables.Masterid,
                            "oper": Contraview.variables.Oper,
                        }
                        Contraview.savedata(data);
                        Contraview.variables.dx_popupRecordDelete.hide();
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

        dx_btnSubmit: "",
        dx_btnCancel: "",

        dx_txtsize: "",
        dx_dataGrid: "",

        dx_txtItemName: "",
        dx_txtType: "",
        dx_txtHSNCode: "",
        dx_txtAmt: "",
        dx_txtTaxAmt: "",
        dx_txtTaxableAmt: ""
        /*------------------------variables for main form Controls-----------------------*/

    },

    FormInitialize: function () {

        //---------------------------------add new button ---------------------------------
        Contraview.variables.dx_btnAddNew = $("#dx_btnAddNew").dxButton({
            stylingMode: "outlined",
            icon: "plus",
            text: "Add New",
            type: "default",
            validationGroup: "Contra",
            onClick: function (e) {

                Contraview.AddNewLineDetails();

                $("#frm_ContraEntry").show();
                $("#pnlView").hide();
                Contraview.variables.Masterid = "";
            }
        }).dxButton("instance");

        //------------------------------- Start bottom left contanct--------------------------------------

        Contraview.variables.dx_txtRemarks = $("#dx_txtRemarks").dxTextArea({
            height: 110,
            placeholder: "Enter Remark"

        }).dxTextArea("instance");

        //------------------------------- End bottom left contanct--------------------------------------


        //------------------------------- Start bottom Right contanct--------------------------------------

        Contraview.variables.txtTotalBillAmount = $("#txtTotalBillAmount").dxTextBox({
            readOnly: true,
            inputAttr: {
                class: "text-right"
            },
        }).dxTextBox("instance");

        //------------------------------- End bottom Right contanct--------------------------------------

        Contraview.variables.dx_ddlCreditors = $("#dx_ddlCreditors").dxAutocomplete({
            dataSource: new DevExpress.data.CustomStore({
                load: function (loadOptions) {
                    var deferred = $.Deferred();

                    var myfilter = { rules: [] };
                    myfilter.rules.push({ field: "GROUPNAME", op: "eq", data: "Creditors/Debitors" });
                    if (Contraview.variables.dx_txtcreditacc.option().selectedItem)
                        myfilter.rules.push({ field: "ACCID", op: "eq", data: Contraview.variables.dx_txtcreditacc.option().selectedItem.groupcompanyid });

                    $.ajax({
                        url: getDomain() + Contraview.variables.BindAccListUrl + "&_search=true&searchField=ACCOUNTNAME&searchOper=cn&searchString=" + loadOptions.searchValue + "&myfilters=" + JSON.stringify(myfilter),
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
            onItemClick: function (e) {

                Contraview.GetTaxProfileDetails(e.component.option().selectedItem.taxprofileid);

                $.each(Contraview.variables.DetailsControlsList, function (key, obj) {
                    if (obj) {
                        if (obj.dx_txtItemName.option().selectedItem)
                            Contraview.CalcItemwiseAmt(obj.srno);
                    }
                });
            },
            onFocusOut: function (data) {

            },
            placeholder: "Select Creditors...",
            searchEnabled: true,
            itemTemplate: function (data) {
                return $("<div class='product-name'>" + "(" + data.partycode + ")&nbsp;" + data.accountname + "</div>");
            },
        }).dxAutocomplete("instance");

        Contraview.variables.dx_ddlDebitors = $("#dx_ddlDebitors").dxAutocomplete({
            dataSource: new DevExpress.data.CustomStore({
                load: function (loadOptions) {
                    var deferred = $.Deferred();

                    var myfilter = { rules: [] };
                    myfilter.rules.push({ field: "HEADNAME", op: "eq", data: "Financial Expense" });

                    $.ajax({
                        url: getDomain() + Contraview.variables.BindAccListUrl + "&_search=true&searchField=ACCOUNTNAME&searchOper=cn&searchString=" + loadOptions.searchValue + "&myfilters=" + JSON.stringify(myfilter),
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
            onItemClick: function (e) {
                if (e.component.option().selectedItem) {
                }
                else {
                    Contraview.variables.dx_txtExchangeRate.option("value", "");
                    Contraview.variables.dx_txtdebitacc = "";
                }
            },
            placeholder: "Select Debitors...",
            searchEnabled: true,
            itemTemplate: function (data) {
                return $("<div class='product-name'>" + "(" + data.partycode + ")&nbsp;" + data.accountname + "</div>");
            },
        }).dxAutocomplete("instance");

        //--------------------------------------- Submit button---------------------------------------

        Contraview.variables.dx_btnSubmit = $("#dx_btnSubmit").dxButton({
            icon: "check",
            text: "Submit",
            type: "success",
            onClick: function (e) {
                var validation = DevExpress.validationEngine.validateGroup("Contra");
                if (!validation.isValid) {
                    DevExVariables.Toaster("warning", "Please fill all required fields before submit.");
                    return;
                }
                Contraview.btnMasterSubmit();
            }
        }).dxButton("instance");

        //--------------------------------------- Cancle button---------------------------------------

        Contraview.variables.dx_btnCancel = $("#dx_btnCancel").dxButton({
            icon: "close",
            text: "Cancel",
            type: "danger",
            onClick: function (e) {
                Contraview.ClearValues();
            }
        }).dxButton("instance");

        //-----------------------------start top left controls---------------------------------
        Contraview.variables.dx_txtPaymentDate = $("#dx_txtPaymentDate").dxDateBox({
            type: "date",
            value: new Date(),
            showClearButton: true,
            useMaskBehavior: true,
            displayFormat: "dd MMM yyyy",
        }).dxDateBox("instance");

        Contraview.variables.dx_txtcreditacc = $("#dx_txtcreditacc").dxAutocomplete({
            placeholder: "Select Account...",
            mode: "search",
            dataSource: new DevExpress.data.CustomStore({
                load: function (loadOptions) {
                    var deferred = $.Deferred();

                    var myfilter = { rules: [] };
                    //myfilter.rules.push({ field: "HEADNAME", op: "eq", data: "Bank Account" });
                    myfilter.rules.push({ field: "GROUPNAME", op: "eq", data: "Current Assets" });

                    $.ajax({
                        url: getDomain() + Contraview.variables.BindAccListUrl + "&_search=true&searchField=ACCOUNTNAME&searchOper=cn&searchString=" + loadOptions.searchValue + "&myfilters=" + JSON.stringify(myfilter),
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
                        Contraview.BindAccountBalance();
                        Contraview.variables.dx_txtExchangeRate.option({ value: e.component.option().selectedItem.exchangerate });
                        Contraview.variables.dx_txtcreditacc.option().selectedItem.accid;
                        $("#spanCashBankCurr").html(e.component.option().selectedItem.currencycode);
                    }
                    else {
                        $("#spanCashBankCurr").html('');
                        Contraview.variables.dx_txtcreditacc = "";
                        Contraview.variables.dx_txtExchangeRate.option("value", "");
                        Contraview.variables.dx_ddlCashBankCurr.option("value", "");
                    }
                    $.each(Contraview.variables.DetailsControlsList, function (key, obj) {
                        if (obj)
                            Contraview.GetTaxableAmt();
                    });

                }
            },
            valueExpr: "accountname",
        }).dxValidator({
            validationGroup: "Contra",
            validationRules: [{
                type: "required",
                message: "Creditor Name is required"
            }]
        }).dxAutocomplete("instance");

        Contraview.variables.dx_txtdebitacc = $("#dx_txtdebitacc").dxAutocomplete({
            placeholder: "Select Account...",
            mode: "search",
            dataSource: new DevExpress.data.CustomStore({
                load: function (loadOptions) {
                    var deferred = $.Deferred();

                    var myfilter = { rules: [] };
                    //myfilter.rules.push({ field: "HEADNAME", op: "eq", data: "Bank Account" });
                    myfilter.rules.push({ field: "GROUPNAME", op: "eq", data: "Current Assets" });

                    $.ajax({
                        url: getDomain() + Contraview.variables.BindAccListUrl + "&_search=true&searchField=ACCOUNTNAME&searchOper=cn&searchString=" + loadOptions.searchValue + "&myfilters=" + JSON.stringify(myfilter),
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
                        Contraview.BindAccountReceiveBalance();
                        Contraview.variables.dx_txtdebitacc.option().selectedItem.accid;
                        $("#spanCurrencyName").html(e.component.option().selectedItem.currencycode);
                    }
                    else {
                        Contraview.variables.dx_txtdebitacc = "";
                        $("#spanCurrencyName").html('');
                        Contraview.variables.dx_ddlCashBankCurr.option("value", "");
                    }
                }
            },
            valueExpr: "accountname",
        }).dxValidator({
            validationGroup: "Contra",
            validationRules: [{
                type: "required",
                message: "Debitor Name is required"
            }]
        }).dxAutocomplete("instance");

        Contraview.variables.dx_txtExchangeRate = $("#dx_txtExchangeRate").dxNumberBox({
            value: 1,
            min: 1,
            onFocusOut: function (data) {

                $.each(Contraview.variables.DetailsControlsList, function (key, obj) {
                    if (obj)
                        Contraview.GetTaxableAmt(obj.srno);
                });

                Contraview.CalcAmount();
            },
        }).dxValidator({
            validationGroup: "Contra",
            validationRules: [{
                type: "required",
                message: "Exchange rate is required"
            }]
        }).dxNumberBox("instance");

        Contraview.variables.dx_VchrNo = $("#dx_VchrNo").dxTextBox({
            readOnly: true,
        }).dxValidator({
            validationGroup: [],
            validationRules: []
        }).dxTextBox("instance");

        //-----------------------------/End top left controls---------------------------------
        Contraview.variables.txtAutoDebit = $("#txtAutoDebit").dxNumberBox({
            readOnly: true,
            inputAttr: {
                class: "text-right"
            },
        }).dxValidator({
            validationGroup: "Contra",
            validationRules: []
        }).dxNumberBox("instance");

        Contraview.variables.txtTaxableAmount = $("#txtTaxableAmount").dxNumberBox({
            readOnly: true,
            inputAttr: {
                class: "text-right"
            },
        }).dxValidator({
            validationGroup: "Contra",
            validationRules: []
        }).dxNumberBox("instance");

        Contraview.variables.dx_txtamt = $("#dx_txtamt").dxTextBox({
            mode: "text",
            placeholder: "Enter Amount...",
            onItemClick: function (data) {
            },
            onFocusOut: function (data) {
                $.each(Contraview.variables.DetailsControlsList, function (key, obj) {
                    if (obj)
                        Contraview.GetTaxableAmt(obj.srno);
                });

                Contraview.CalcAmount();
            },
            onValueChanged: function (data) {
                var amt = 0;
                amt = (Contraview.variables.dx_txtamt.option().value * Contraview.variables.dx_txtExchangeRate.option().value)
                Contraview.variables.txtFinalAmount.option({ value: amt.toFixed(2) });
            },
        }).dxValidator({
            validationGroup: "Contra",
            validationRules: [{
                type: "required",
                message: "Select Amount"
            }]
        }).dxTextBox("instance");

        Contraview.variables.txtTotalAmount = $("#txtTotalAmount").dxNumberBox({
            readOnly: true,
            inputAttr: {
                class: "text-right"
            },
        }).dxValidator({
            validationGroup: "Contra",
            validationRules: []
        }).dxNumberBox("instance");

        Contraview.variables.txtTotalAmountInRs = $("#txtTotalAmountInRs").dxNumberBox({
            readOnly: true,
            inputAttr: {
                class: "text-right"
            },
        }).dxValidator({
            validationGroup: "Contra",
            validationRules: []
        }).dxNumberBox("instance");

        Contraview.variables.txtAmountWithTax = $("#txtAmountWithTax").dxNumberBox({
            readOnly: true,
            inputAttr: {
                class: "text-right"
            }
        }).dxNumberBox("instance");

        Contraview.variables.txtFinalAmount = $("#txtFinalAmount").dxNumberBox({
            readOnly: true,
            inputAttr: {
                class: "text-right"
            }
        }).dxNumberBox("instance");

    },

    initializeDevExgrid: function () {
        Contraview.variables.dx_dataGrid = $("#dx_dataGrid").dxDataGrid({
            dataSource: new DevExpress.data.CustomStore({
                key: "cbt_id",
                load: function (loadOptions) {
                    var deferred = $.Deferred();

                    var myfilter = { rules: [] };
                    myfilter.rules.push({ field: "TYPE", op: "eq", data: 'CONTRA BOOK' });

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
                        url: getDomain() + Contraview.variables.BindMainGridListUrl + "&" + parameters.join("&") + "&myfilters=" + JSON.stringify(myfilter),
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
                { dataField: "voucherdate", caption: "payment Date", dataType: "string", filterOperations: ["contains"], allowSorting: true, allowFiltering: true, allowHeaderFiltering: false },
                { dataField: "accountname", caption: "Creditor Acc", dataType: "string", filterOperations: ["contains"], allowSorting: true, allowFiltering: true, allowHeaderFiltering: false },
                { dataField: "receiveaccname", caption: "Debitor Acc", dataType: "string", filterOperations: ["contains"], allowSorting: true, allowFiltering: true, allowHeaderFiltering: false },
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
                                    Contraview.EditFromGrid(data.value, options.key, 'Verify');
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
                        DevExVariables.ActionTemplate(container, options, true, true, "Contraview");
                        //DevExVariables.ActionMoreTools(container, options, true, true, true, "Contraview");

                    }
                },
            ]
        }).dxDataGrid("instance");
    },

    btnMasterSubmit: function () {

        if ((Contraview.variables.dx_txtdebitacc.option().selectedItem.currencycode) != 'INR' || (Contraview.variables.dx_txtcreditacc.option().selectedItem.currencycode) != 'INR') {
            if (!(Contraview.variables.dx_ddlCreditors.option().selectedItem) || !(Contraview.variables.dx_ddlDebitors.option().selectedItem)) {
                DevExVariables.Toaster("warning", "Creditor And Debitor Are Required.");
                return;
            }
        }

        Contraview.variables.dx_btnSubmit.option({ disabled: true });

        Contraview.variables.Oper = 'Add';
        Contraview.variables.addedit = "added";
        if (Contraview.variables.Masterid != "0" && parseInt(Contraview.variables.Masterid) > 0) {
            Contraview.variables.Oper = 'Edit';
            Contraview.variables.addedit = 'updated';
        }

        var xmlNodeList = '<DETAILSLIST>';
        $.each(Contraview.variables.DetailsControlsList, function (key, obj) {
            if (obj) {
                if (obj.dx_txtItemName.option().value) {
                    xmlNodeList += '<DETAILS>';
                    xmlNodeList += '<SRNO>' + obj.srno + '</SRNO>';
                    xmlNodeList += '<ITEMID>' + obj.dx_txtItemName.option().selectedItem.itemid + '</ITEMID>';
                    xmlNodeList += '<RMSUBCATEID>' + obj.dx_txtItemName.option().selectedItem.rmsubcateid + '</RMSUBCATEID>';
                    xmlNodeList += '<HSNCODE>' + obj.dx_txtItemName.option().selectedItem.hsncode + '</HSNCODE>';

                    if (obj.dx_ddlUnit.option().value)
                        xmlNodeList += '<UNIT>' + obj.dx_ddlUnit.option().value + '</UNIT>';

                    if (obj.dx_txtAmount.option().value)
                        xmlNodeList += '<TOTALTAXABLE>' + obj.dx_txtAmount.option().value + '</TOTALTAXABLE>';

                    if (obj.dx_txtTaxAmt.option().value)
                        xmlNodeList += '<TOTALTAX>' + obj.dx_txtTaxAmt.option().value + '</TOTALTAX>';

                    if (obj.dx_txtTaxableAmt.option().value)
                        xmlNodeList += '<TOTALAMTWITHTAX>' + obj.dx_txtTaxableAmt.option().value + '</TOTALAMTWITHTAX>';

                    if (obj.dx_ddlPaymentMode.option().value)
                        xmlNodeList += '<PAYMENTMODE>' + obj.dx_ddlPaymentMode.option().value + '</PAYMENTMODE>';

                    xmlNodeList += '</DETAILS>';
                }
            }
        }
       )
        xmlNodeList += '</DETAILSLIST>';

        xmlNodeList += '<TAXDETAILLIST>';
        $.each(Contraview.variables.taxlist, function (key, obj) {
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

        var data = {
            "CBT_ID": Contraview.variables.Masterid,
            "VOUCHERDATE": Contraview.variables.dx_txtPaymentDate.option().text,
            "CREDITORACCID": Contraview.variables.dx_txtcreditacc.option().selectedItem.accid,
            "DEBITORACCID": Contraview.variables.dx_txtdebitacc.option().selectedItem.accid,
            "CREDITORCURRENCYID": Contraview.variables.dx_txtcreditacc.option().selectedItem.currencyid,
            "DEBITORCURRENCYID": Contraview.variables.dx_txtdebitacc.option().selectedItem.currencyid,
            //"CHARGECREDITORID": Contraview.variables.dx_ddlCreditors.option().selectedItem.accid,
            //"CHARGEDEBITORID": Contraview.variables.dx_ddlDebitors.option().selectedItem.accid,
            //"TAXPROFILEID": Contraview.variables.dx_ddlCreditors.option().selectedItem.taxprofileid,
            "EXCHANGERATE": Contraview.variables.dx_txtExchangeRate.option().value,
            //"TOTALDEBIT": Contraview.variables.txtAutoDebit.option().value,
            "TOTALAMT": Contraview.variables.dx_txtamt.option().value,
            "TOTALTAXABLEAMT": Contraview.variables.txtTaxableAmount.option().value,
            "TOTALAMTINRS": (Contraview.variables.txtTotalAmountInRs.option().value * Contraview.variables.dx_txtExchangeRate.option().value).toFixed(2),
            "TOTALAMTWITHTAX": Contraview.variables.txtAmountWithTax.option().value,
            "TOTALBILLAMTINRS": Contraview.variables.txtTotalAmountInRs.option().value,
            "TOTALFINALAMOUNT": Contraview.variables.txtFinalAmount.option().value,
            "NETAMOUNT": Contraview.variables.dx_txtamt.option().value - Contraview.variables.txtAutoDebit.option().value,
            "NETAMOUNTINRS": ((Contraview.variables.txtTotalAmountInRs.option().value - Contraview.variables.txtAutoDebit.option().value) * Contraview.variables.dx_txtExchangeRate.option().value).toFixed(2),
            XMLPARAM: escape(xmlNodeList),
            //XMLPARAM: escape(DetailsNodeList),
            "oper": Contraview.variables.Oper,
        }

        if (Contraview.variables.dx_txtRemarks.option().value)
            data.REMARK = Contraview.variables.dx_txtRemarks.option().value;

        if (Contraview.variables.dx_ddlCreditors.option().selectedItem)
            data.CHARGECREDITORID = Contraview.variables.dx_ddlCreditors.option().selectedItem.accid;

        if (Contraview.variables.dx_ddlDebitors.option().selectedItem)
            data.CHARGEDEBITORID = Contraview.variables.dx_ddlDebitors.option().selectedItem.accid;

        if (Contraview.variables.dx_ddlCreditors.option().selectedItem)
            data.TAXPROFILEID = Contraview.variables.dx_ddlCreditors.option().selectedItem.taxprofileid;

        Contraview.savedata(data);
    },

    savedata: function (data) {
        $.ajax({
            url: getDomain() + Contraview.variables.PerformMasterOperationUrl,
            data: data,
            async: true,
            cache: false,
            type: 'POST',
            beforeSend: function () {
                dx_LoaderTrinity.show();
            },
            complete: function () {
                dx_LoaderTrinity.hide();
                Contraview.variables.dx_btnSubmit.option({ disabled: false });
            },
            success: Contraview.btnMasterSubmitOnSuccess,
            error: OnError,
        });
    },

    btnMasterSubmitOnSuccess: function (data) {
        if ($(data).find('RESPONSECODE').text() == "0") {
            DevExVariables.Toaster("success", 'Record is Added successfully.');
            $("#frm_ContraEntry").hide();
            $("#pnlView").show();
            DevExpress.validationEngine.resetGroup("Contra");
            Contraview.ClearValues();
            Contraview.variables.dx_dataGrid.refresh();
        }
        else {
            DevExVariables.InvalidResponseCode(data);
        }
    },

    triggerId: function (id) {
        var rowData = Contraview.variables.dx_dataGrid.getVisibleRows()[Contraview.variables.dx_dataGrid.getRowIndexByKey(+id)].data;
        Contraview.variables.Masterid = id;
        Contraview.variables.EditDataList = rowData;

        Contraview.variables.dx_txtPaymentDate.option({ value: rowData.voucherdate });
        Contraview.variables.dx_txtcreditacc.option({
            items: [{ accid: rowData.cashbankaccid, accountname: rowData.accountname, currencycode: rowData.cashbankcurcode, currencyid: rowData.cashbankcurrencyid, exchangerate: rowData.exchangerate }],
            selectedItem: { accid: rowData.cashbankaccid, accountname: rowData.accountname, currencycode: rowData.cashbankcurcode, currencyid: rowData.cashbankcurrencyid, exchangerate: rowData.exchangerate },
            value: rowData.accountname
        });
        Contraview.variables.dx_txtdebitacc.option({
            items: [{ accid: rowData.payerrecieveraccid, accountname: rowData.receiveaccname, currencycode: rowData.currencycode, currencyid: rowData.currencyid }],
            selectedItem: { accid: rowData.payerrecieveraccid, accountname: rowData.receiveaccname, currencycode: rowData.currencycode, currencyid: rowData.currencyid },
            value: rowData.receiveaccname
        });
        Contraview.variables.dx_VchrNo.option({ value: rowData.voucherno });
        Contraview.variables.dx_txtamt.option({ value: rowData.totalamt });
        Contraview.BindAccountBalance();
        Contraview.BindAccountReceiveBalance();
        $("#spanCashBankCurr").html(Contraview.variables.dx_txtcreditacc.option().selectedItem.currencycode);
        $("#spanCurrencyName").html(Contraview.variables.dx_txtdebitacc.option().selectedItem.currencycode);
        Contraview.variables.dx_txtExchangeRate.option({ value: rowData.exchangerate });
        Contraview.variables.txtTotalAmountInRs.option({ value: rowData.totalamtinrs });
        Contraview.variables.txtAmountWithTax.option({ value: rowData.totalamtwithtax });
        Contraview.variables.txtTaxableAmount.option({ value: rowData.totaltaxable });
        Contraview.variables.dx_txtRemarks.option({ value: rowData.remark });

        Contraview.variables.dx_ddlCreditors.option({
            items: [{ accid: rowData.creditoraccid, accountname: rowData.creditoraccname, taxprofileid: rowData.creditortaxprofileid }],
            selectedItem: { accid: rowData.creditoraccid, accountname: rowData.creditoraccname, taxprofileid: rowData.creditortaxprofileid },
            value: rowData.creditoraccname
        });
        Contraview.variables.dx_ddlDebitors.option({
            items: [{ accid: rowData.debitoraccid, accountname: rowData.debitoraccname }],
            selectedItem: { accid: rowData.debitoraccid, accountname: rowData.debitoraccname },
            value: rowData.debitoraccname
        });

        Contraview.GetItemDetails(id);

        Contraview.GetTaxProfileDetails(rowData.creditortaxprofileid);

        Contraview.CalcAmount();

        $("#frm_ContraEntry").show();
        $("#pnlView").hide();
        if (isU()) {
            Contraview.variables.dx_btnSubmit.option({ visible: true });
        }
        else {
            Contraview.variables.dx_btnSubmit.option({ visible: false });
        }
    },

    ClearValues: function () {
        Contraview.variables.Masterid = "";
        Contraview.variables.Oper = 'Add';
        Contraview.variables.addedit = "added";
        Contraview.variables.DeleteDataObj = "";
        DevExpress.validationEngine.resetGroup("Contra");
        $('.DiscType').prop('disabled', false);
        Contraview.variables.dx_txtcreditacc.option("value", "");
        Contraview.variables.dx_txtPaymentDate.option({ value: new Date() });
        Contraview.variables.dx_VchrNo.option("value", "");
        Contraview.variables.dx_txtdebitacc.option("value", "");
        Contraview.variables.dx_txtamt.option("value", "");
        Contraview.variables.dx_txtExchangeRate.option("value", "");
        Contraview.variables.txtTotalAmountInRs.option("value", "");
        Contraview.variables.dx_txtRemarks.option("value", "");
        Contraview.variables.txtTaxableAmount.option("value", "");
        Contraview.variables.dx_ddlCreditors.option("value", "");
        Contraview.variables.dx_ddlDebitors.option("value", "");
        Contraview.variables.txtAmountWithTax.option("value", "");
        Contraview.variables.txtAutoDebit.option("value", "");
        Contraview.variables.txtFinalAmount.option("value", "");
        Contraview.variables.dx_btnSubmit.option({ visible: true });
        Contraview.variables.dx_btnSubmit.option({ disabled: false });

        $("#tfoot_Amt").html("");
        $("#tfoot_TaxAmt").html("");
        $("#tfoot_TotalAmt").html("");

        Contraview.variables.taxlist = [];
        //Contraview.variables.tempTaxLists = [];
        //Contraview.variables.taxprofilelist = [];
        Contraview.variables.RowCount = 1;
        $("#spanCashBankCurr").html("");
        $("#spanCurrencyName").html("");
        $("#frm_ContraEntry").hide();
        $("#pnlView").show();
        $("#tbl_DesignDetails tbody").html("");
        $(".divTax").remove();
        $("#btnAddSelectionList").html("0.00");
        $("#btnAddSelectionRecieveList").html("0.00");

    },

    AddNewLineDetails: function (obj) {
        var postfix = Contraview.variables.RowCount;
        $("#tbl_DesignDetails tbody").append(
                '<tr rowno="' + postfix + '">'
                    + '<td class="TableRowNo"></td>'
                    + '<td>'
                        + '<div id="dx_txtItemName' + postfix + '" ></div>'
                    + '</td>'
                    + '<td class="ItemType">' + (obj ? obj.servicetype_name : "") + '</td>'
                    + '<td class="HSNCode">' + (obj ? obj.hsncode : "") + '</td>'
                     + '<td>'
                       + '<div id="dx_ddlUnit' + postfix + '" ></div>'
                    + '</td>'
                    + '<td>'
                       + '<div id="dx_txtAmount' + postfix + '" ></div>'
                    + '</td>'
                    + '<td>'
                        + '<div id="dx_txtTaxAmt' + postfix + '" ></div>'
                    + '</td>'
                    + '<td>'
                       + '<div id="dx_txtTaxableAmt' + postfix + '" ></div>'
                    + '</td>'
                    + '<td>'
                       + '<div id="dx_ddlPaymentMode' + postfix + '" ></div>'
                    + '</td>'
                    + '<td class="text-center">'
                        + '<span class="btn btn-danger" onClick="Contraview.RemoveDetailRow(this)"><i class="fa fa-trash-o"></i></span>'
                    + '</td>'
                + '</tr>'
            );

        /*----------------------Registration of Detail table controls---------------------*/
        Contraview.DetailTableFormInit(postfix, obj);
        /*----------------------Registration of Detail table controls---------------------*/

        Contraview.variables.RowCount = postfix + 1;
    },

    GetItemList: function () {

        var myfilter = { rules: [] };
        //myfilter.rules.push({ field: "CATEGORY", op: "eq", data: "GENERAL" });
        myfilter.rules.push({ field: "GROUPNAME", op: "eq", data: 'GENERAL' });
        myfilter.rules.push({ field: "RMSUBCATE", op: "eq", data: "FINANCIAL CHARGES" });
        $.ajax({
            url: getDomain() + Contraview.variables.BindItemMaster + "&myfilters=" + JSON.stringify(myfilter),
            async: true,
            cache: false,
            type: 'POST',
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    var JsonObject = xml2json.parser(data);
                    if (JsonObject.serviceresponse.detailslist) {
                        if (JsonObject.serviceresponse.detailslist.details.length) {
                            Contraview.variables.ItemList = JsonObject.serviceresponse.detailslist.details;
                        }
                        else {
                            Contraview.variables.ItemList.push(JsonObject.serviceresponse.detailslist.details);
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

    DetailTableFormInit: function (postfix, obj) {
        /*----------------------Registration of Detail table controls---------------------*/
        var tmp = [];
        tmp[postfix] = { srno: postfix, dx_txtItemName: "", dx_txtAmount: "", dx_txtTaxAmt: "", dx_txtTaxableAmt: "" };

        Contraview.variables.DetailsControlsList = Object.assign(Contraview.variables.DetailsControlsList, tmp);

        Contraview.variables.DetailsControlsList[postfix].dx_txtItemName = $("#dx_txtItemName" + postfix).dxAutocomplete({
            dataSource: Contraview.variables.ItemList,
            placeholder: "Select Item Name...",
            valueExpr: "itemname",
            onItemClick: function (data) {
                if (data.component.option().selectedItem) {
                    $("[rowno='" + postfix + "']").find('.ItemType').html(data.component.option().selectedItem.rmsubcate);
                    $("[rowno='" + postfix + "']").find('.HSNCode').html(data.component.option().selectedItem.hsncode);

                    $.each(Contraview.variables.DetailsControlsList, function (key, obj) {
                        if (obj) {
                            Contraview.GetTaxableAmt(obj.srno);
                        }
                    });
                }
            },
            //onFocusOut: function (data) {
            //    if (!data.component.option().selectedItem) {
            //        Contraview.variables.DetailsControlsList[postfix].dx_txtItemName.focus();
            //    }
            //}
        }).dxValidator({
            validationGroup: "Contra",
            validationRules: [{
                type: "required",
                message: "Category is required"
            }]
        }).dxAutocomplete("instance");

        Contraview.variables.DetailsControlsList[postfix].dx_ddlUnit = $("#dx_ddlUnit" + postfix).dxSelectBox({
            dataSource: ['Total Amount', 'Only GST'],
            placeholder: "Select Unit...",
            searchEnabled: true,
            onItemClick: function (data) {
                $.each(Contraview.variables.DetailsControlsList, function (key, obj) {
                    if (obj) {
                        Contraview.GetTaxableAmt(obj.srno);
                    }
                });
            },
            //onFocusOut: function (data) {
            //    if (!data.component.option().selectedItem) {
            //        Contraview.variables.DetailsControlsList[postfix].dx_ddlUnit.focus();
            //    }
            //}
        }).dxValidator({
            validationGroup: "Contra",
            validationRules: [{
                type: "required",
                message: "Unit is required"
            }]
        }).dxSelectBox("instance");

        Contraview.variables.DetailsControlsList[postfix].dx_ddlPaymentMode = $("#dx_ddlPaymentMode" + postfix).dxSelectBox({
            dataSource: ['Debit', 'Auto Debit'],
            placeholder: "Select PaymentMode...",
            searchEnabled: true,
            onItemClick: function (data) {
                Contraview.CalcAmount();
            },
            onFocusOut: function (data) {
                //if (!data.component.option().selectedItem) {
                //    Contraview.variables.DetailsControlsList[postfix].dx_ddlPaymentMode.focus();
                //}
            }
        }).dxValidator({
            validationGroup: "Contra",
            validationRules: [{
                type: "required",
                message: "PaymentMode is required"
            }]
        }).dxSelectBox("instance");

        Contraview.variables.DetailsControlsList[postfix].dx_txtAmount = $("#dx_txtAmount" + postfix).dxTextBox({
            mode: "text",
            onKeyDown: function (e) {
            },
            onFocusOut: function (data) {
                if (!data.component.option().value) {
                    Contraview.variables.DetailsControlsList[postfix].dx_txtAmount.focus();
                }
                Contraview.CalcItemwiseAmt(postfix);
            },
            onValueChanged: function (data) {
            },
            onItemClick: function (data) {
            },
            inputAttr: {
                class: "text-right"
            },
        }).dxValidator({
            validationGroup: "Contra",
            validationRules: [{
                type: "required",
                message: "Amount is required"
            }]
        }).dxTextBox("instance");

        Contraview.variables.DetailsControlsList[postfix].dx_txtTaxAmt = $("#dx_txtTaxAmt" + postfix).dxTextBox({
            readOnly: true,
            mode: "text",
            onKeyDown: function (e) {
            },
            onFocusOut: function (data) {
            },
            inputAttr: {
                class: "text-right"
            },
        }).dxValidator({
            validationRules: [{
                type: "required",
                message: "Tax Amount is required"
            }]
        }).dxTextBox("instance");

        Contraview.variables.DetailsControlsList[postfix].dx_txtTaxableAmt = $("#dx_txtTaxableAmt" + postfix).dxTextBox({
            readOnly: true,
            mode: "text",
            onFocusOut: function (data) {
            },
            inputAttr: {
                class: "text-right"
            },
        }).dxValidator({
            validationRules: [{
                type: "required",
                message: "Taxable Amount is required"
            }]
        }).dxTextBox("instance");

        /*----------------------Registration of Detail table controls---------------------*/

        /*----------------------Set Value of Detail table controls while Edit---------------------*/
        if (obj) {
            Contraview.variables.DetailsControlsList[postfix].dx_txtItemName.option({
                items: [{
                    itemid: obj.service_id,
                    itemname: obj.service_name,
                    rmsubcateid: obj.service_type,
                    rmsubcate: obj.servicetype_name,
                    hsncode: obj.hsncode,
                    taxdetaillist: obj.taxdetaillist
                }],
                selectedItem: {
                    itemid: obj.service_id,
                    itemname: obj.service_name,
                    rmsubcateid: obj.service_type,
                    rmsubcate: obj.servicetype_name,
                    hsncode: obj.hsncode,
                    taxdetaillist: obj.taxdetaillist
                },
                value: obj.service_name
            });

            //Contraview.variables.dx_txtType.option({ value: obj.servicetype_name });
            //Contraview.variables.DetailsControlsList[postfix].dx_txtHSNCode.option({ value: obj.hsncode });
            Contraview.variables.DetailsControlsList[postfix].dx_ddlUnit.option({ value: obj.unit });
            Contraview.variables.dx_ddlCreditors.option({ value: obj.creditorname });
            Contraview.variables.dx_ddlDebitors.option({ value: obj.debitorname });
            Contraview.variables.DetailsControlsList[postfix].dx_ddlPaymentMode.option({ value: obj.paymentmode });
            Contraview.variables.DetailsControlsList[postfix].dx_txtTaxAmt.option({ value: obj.taxamount });
            Contraview.variables.DetailsControlsList[postfix].dx_txtAmount.option({ value: obj.amount });
            Contraview.variables.DetailsControlsList[postfix].dx_txtTaxableAmt.option({ value: obj.amountwithtax });
        }
        /*----------------------Set Value of Detail table controls while Edit---------------------*/

    },

    RemoveDetailRow: function (obj) {
        $(obj).closest("tr").remove();
        delete Contraview.variables.DetailsControlsList[$(obj).closest("tr").attr("rowno")];

        Contraview.variables.txtTaxableAmount.option("value", "");
        Contraview.variables.txtAmountWithTax.option("value", "");
        Contraview.variables.txtFinalAmount.option("value", "");
        Contraview.variables.txtAutoDebit.option("value", "");

        $("#tfoot_Amt").html("");
        $("#tfoot_TaxAmt").html("");
        $("#tfoot_TotalAmt").html("");

        Contraview.variables.taxlist = Contraview.variables.taxlist.filter(function (x) { return x.rownum != $(obj).closest("tr").attr("rowno") });
        Contraview.CalcAmount();
    },

    CalcItemwiseAmt: function (postfix) {

        var TotalTaxableAmt = 0, TotalTax = 0, AmtWithTax = 0, FinalAmt = 0, Amt = 0;

        TotalTaxableAmt = +Contraview.variables.DetailsControlsList[postfix].dx_txtAmount.option().value;

        Contraview.variables.taxlist = Contraview.variables.taxlist.filter(function (x) { return x.rownum != postfix });

        var tempTaxProfileList = [];
        if (Contraview.variables.taxprofilelist.length > 0) {
            tempTaxProfileList = Contraview.variables.taxprofilelist;
        }
        else {
            tempTaxProfileList.push(Contraview.variables.taxprofilelist);
        }

        $.each(tempTaxProfileList, function (key, obj) {
            var temptax = 0;
            
            var ItemTaxList = [];
            if (Contraview.variables.DetailsControlsList[postfix].dx_txtItemName.option().selectedItem.taxdetaillist.taxdetails.length > 0) {
                ItemTaxList = Contraview.variables.DetailsControlsList[postfix].dx_txtItemName.option().selectedItem.taxdetaillist.taxdetails;
            }
            else {
                ItemTaxList.push(Contraview.variables.DetailsControlsList[postfix].dx_txtItemName.option().selectedItem.taxdetaillist.taxdetails);
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

                var temptaxlist = Contraview.variables.taxlist.filter(function (x) { return calcOnList.indexOf(x.TaxId.toString()) !== -1 && x.rownum == postfix; });
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
                DevExVariables.Toaster("warning", "Tax Name " + '"' + obj.taxname + '"' +" In " + "Item Name " + '"' + Contraview.variables.DetailsControlsList[postfix].dx_txtItemName.option().selectedItem.itemname + '"' + " Is Not Added Properly");
                Contraview.variables.DetailsControlsList[postfix].dx_txtItemName.option("value", "");
                Contraview.variables.DetailsControlsList[postfix].dx_ddlUnit.option("value", "");
                Contraview.variables.DetailsControlsList[postfix].dx_txtAmount.option("value", 0);
                Contraview.variables.DetailsControlsList[postfix].dx_ddlPaymentMode.option("value", "");
                return;
            }

            Contraview.variables.taxlist.push({
                rownum: postfix,
                HSNCodeId: Contraview.variables.DetailsControlsList[postfix].dx_txtItemName.option().selectedItem.itemid,
                HSNCode: Contraview.variables.DetailsControlsList[postfix].dx_txtItemName.option().selectedItem.hsncode,
                TaxableAmt: TotalTaxableAmt,
                TaxId: obj.taxid,
                TaxName: obj.taxname,
                TaxValue: List[0].taxvalue,
                TaxValueIn: List[0].taxvaluein,
                TaxAmt: temptax
            });
          });

        Contraview.variables.DetailsControlsList[postfix].dx_txtTaxAmt.option({ value: (TotalTax).toFixed(2) });

        if (Contraview.variables.DetailsControlsList[postfix].dx_ddlUnit.option().value == 'Total Amount')
            AmtWithTax = TotalTaxableAmt + TotalTax;
        else
            AmtWithTax = TotalTax;

        Contraview.variables.DetailsControlsList[postfix].dx_txtTaxableAmt.option({ value: (AmtWithTax.toFixed(2)) });

        Contraview.CalcAmount();
    },

    CalcAmount: function () {
        var Autodebit = 0, TaxableAmt = 0, TotalTax = 0, TotalTaxWithAmt = 0, FinalAmt = 0, Amt = 0, Amtrs = 0, Exrate = 0;
        $.each(Contraview.variables.DetailsControlsList, function (key, obj) {
            if (Contraview.variables.DetailsControlsList[key]) {
                TaxableAmt += +Contraview.variables.DetailsControlsList[key].dx_txtAmount.option().value;
                TotalTaxWithAmt += +Contraview.variables.DetailsControlsList[key].dx_txtTaxableAmt.option().value;
                TotalTax += +Contraview.variables.DetailsControlsList[key].dx_txtTaxAmt.option().value;

                if (Contraview.variables.DetailsControlsList[key].dx_ddlPaymentMode.option().value == 'Auto Debit')
                    Autodebit += +Contraview.variables.DetailsControlsList[key].dx_txtTaxableAmt.option().value;
            }

        });

        Contraview.variables.txtTaxableAmount.option({ value: TaxableAmt.toFixed(2) });
        Contraview.variables.txtAmountWithTax.option({ value: TotalTaxWithAmt.toFixed(2) });
        Contraview.variables.txtAutoDebit.option({ value: (Autodebit.toFixed(2)) });

        $("#tfoot_Amt").html(TaxableAmt);
        $("#tfoot_TaxAmt").html(TotalTax);
        $("#tfoot_TotalAmt").html(TotalTaxWithAmt);

        Amt = +Contraview.variables.dx_txtamt.option().value;
        FinalAmt = Amt - TotalTaxWithAmt
        Contraview.variables.txtFinalAmount.option({ value: (FinalAmt.toFixed(2)) });

        Exrate = +Contraview.variables.dx_txtExchangeRate.option().value;
        Amtrs = Amt * Exrate
        Contraview.variables.txtTotalAmountInRs.option({ value: (Amtrs.toFixed(2)) });


        $(".divTax").remove();
        if (Contraview.variables.taxlist) {
            var tempTaxList = "";
            var temparray = [];
            var index = 0;
            $.each(Contraview.variables.taxlist, function (key, obj) {
                if (temparray.filter(function (x) { return x.taxname == obj.TaxName }).length == 0) {
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
        }

    },

    deleteRow: function (id) {
        var rowData = Contraview.variables.dx_dataGrid.getVisibleRows()[Contraview.variables.dx_dataGrid.getRowIndexByKey(+id)].data;
        Contraview.variables.Masterid = id;
        Contraview.variables.DeleteDataObj = rowData;
        Contraview.variables.Oper = "Delete";

        if (Contraview.variables.dx_popupRecordDelete) {
            Contraview.variables.dx_popupRecordDelete.option("contentTemplate", Contraview.variables.DeletePopUpOptions.contentTemplate(Contraview.variables.DeleteDataObj).bind(this));
        }
        else {
            Contraview.variables.dx_popupRecordDelete = $("#dx_popupRecordDelete").dxPopup(Contraview.variables.DeletePopUpOptions).dxPopup("instance");
        }

        Contraview.variables.dx_popupRecordDelete.show();
    },

    GetItemDetails: function (CBT_ID) {
        var myfilter = { rules: [] };
        myfilter.rules.push({ field: "CBT_ID", op: "eq", data: CBT_ID });

        $.ajax({
            url: getDomain() + Contraview.variables.BindDetailListUrl + "&myfilters=" + JSON.stringify(myfilter),
            async: false,
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
                        if (JsonObject.serviceresponse.detailslist.details.length) {
                            List = JsonObject.serviceresponse.detailslist.details;
                        }
                        else {
                            List.push(JsonObject.serviceresponse.detailslist.details);
                        }

                        $.each(List, function (key, obj) {
                            Contraview.AddNewLineDetails(obj);

                            if (obj.taxdetaillist) {
                                var tempTaxLists = [];
                                if (obj.taxdetaillist.taxdetails.length) {
                                    tempTaxLists = obj.taxdetaillist.taxdetails;
                                }
                                else {
                                    tempTaxLists.push(obj.taxdetaillist.taxdetails);
                                }

                                $.each(tempTaxLists, function (key1, obj1) {
                                    Contraview.variables.taxlist.push({
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
                    }
                }
                else {
                    DevExVariables.InvalidResponseCode(data);
                }
            },
            error: OnError
        });
    },

    GetTaxProfileDetails: function (TaxProfileId) {
        Contraview.variables.taxprofilelist = [];

        var myfilter = { rules: [] };
        myfilter.rules.push({ field: "ISACTIVE", op: "eq", data: true });
        myfilter.rules.push({ field: "TAXPROFILEID", op: "eq", data: TaxProfileId });
        $.ajax({
            url: getDomain() + Contraview.variables.BindTaxProfile + "&IsRecordAll=true&myfilters=" + JSON.stringify(myfilter),
            async: false,
            cache: false,
            type: 'POST',
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    var JsonObject = xml2json.parser(data);
                    if (JsonObject.serviceresponse.detailslist) {
                        //var List = [];
                        if (JsonObject.serviceresponse.detailslist.details.taxdetaillist.taxdetails.length) {
                            Contraview.variables.taxprofilelist = JsonObject.serviceresponse.detailslist.details.taxdetaillist.taxdetails;
                        }
                        else {
                            Contraview.variables.taxprofilelist.push(JsonObject.serviceresponse.detailslist.details.taxdetaillist.taxdetails);
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

    EditFromGrid: function (val, id, type) {
        var data = {
            "CBT_ID": id,
            "OPER_TYPE": "EditFromGrid",
            "oper": "Edit"
        }
        if (type == "Verify")
            data.ISVERIFY = val;
        $.ajax({
            url: getDomain() + Contraview.variables.PerformMasterOperationUrl,
            data: data,
            async: true,
            cache: false,
            type: 'POST',
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    DevExVariables.Toaster("success", 'Record is updated successfully.');
                    Contraview.variables.dx_dataGrid.refresh();
                }
            },
            error: OnError,
        });
    },

    GetTaxableAmt: function (postfix) {
        if (!Contraview.variables.dx_txtcreditacc.option().selectedItem
            || !Contraview.variables.DetailsControlsList[postfix].dx_txtItemName.option().selectedItem
            )
            return;

        if (Contraview.variables.dx_txtcreditacc.option().selectedItem.accid == ""
            || Contraview.variables.dx_txtExchangeRate.option().value == ""
            || Contraview.variables.dx_txtamt.option().value == ""
            || Contraview.variables.DetailsControlsList[postfix].dx_txtItemName.option().selectedItem.itemid == ""
            || Contraview.variables.DetailsControlsList[postfix].dx_ddlUnit.option().value == "") {
            return;
        }

        var data = {
            "AMOUNT": Contraview.variables.dx_txtamt.option().value,
            "EXRATE": Contraview.variables.dx_txtExchangeRate.option().value,
            "ACCID": Contraview.variables.dx_txtcreditacc.option().selectedItem.accid,
            "ITEMID": Contraview.variables.DetailsControlsList[postfix].dx_txtItemName.option().selectedItem.itemid,
            "UNIT": Contraview.variables.DetailsControlsList[postfix].dx_ddlUnit.option().value,
        }
        $.ajax({
            url: getDomain() + Contraview.variables.BindAmtListUrl,
            async: false,
            cache: false,
            data: data,
            type: 'POST',
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    if ($(data).find('TAXABLEAMT').text() != 0) {
                        Contraview.variables.DetailsControlsList[postfix].dx_txtAmount.option({ value: $(data).find('TAXABLEAMT').text() });
                    }
                }
                else {
                    DevExVariables.InvalidResponseCode(data);
                }
            },
            error: OnError
        });

        Contraview.CalcItemwiseAmt(postfix);
    },

    BindAccountBalance: function () {
        var myfilter = { rules: [] };
        myfilter.rules.push({ field: "ACCID", op: "eq", data: Contraview.variables.dx_txtcreditacc.option().selectedItem.accid });
        myfilter.rules.push({ field: "ASONDATE", op: "eq", data: Contraview.variables.dx_txtPaymentDate.option().text });

        $.ajax({
            url: getDomain() + Contraview.variables.BindAccountbalancelist + "&myfilters=" + JSON.stringify(myfilter),
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
        myfilter.rules.push({ field: "ACCID", op: "eq", data: Contraview.variables.dx_txtdebitacc.option().selectedItem.accid });
        myfilter.rules.push({ field: "ASONDATE", op: "eq", data: Contraview.variables.dx_txtPaymentDate.option().text });

        $.ajax({
            url: getDomain() + Contraview.variables.BindAccountbalancelist + "&myfilters=" + JSON.stringify(myfilter),
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
}

$(document).ready(function () {
    Contraview.FormInitialize();
    Contraview.initializeDevExgrid();
    Contraview.GetItemList();

    $("#lnk_AddNewRow").click(function () {
        Contraview.AddNewLineDetails();
    });
});

  