var CurrencyRateDifferenceView = {
    variables: {
        BindAccListUrl: "/Common/BindMastersDetails?ServiceName=ACCOUNTMASTER_GET",
        BindAccountbalancelist: "/Common/BindMastersDetails?ServiceName=ACC_BALANCE_GET",
        BindMainGridListUrl: "/Common/BindMastersDetails?ServiceName=ACC_CASHBANK_TRANSACTION_GET",
        PerformMasterOperationUrl: "/Common/OpeartionsOnMaster?ServiceName=ACC_CURRENCYRATEDIFFERENCE_CRUD",
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
        dx_popupRecordDelete: "",
        DeleteDataObj: "",
        DeletePopUpOptions: {
            width: 300,
            height: 200,
            contentTemplate: function () {
                return $("<div />").append(
                    $("<p>Voucher No: <span>" + CurrencyRateDifferenceView.variables.DeleteDataObj.voucherno + "</span></p>"
                     + "<p>Voucher Type: <span>" + CurrencyRateDifferenceView.variables.DeleteDataObj.vouchertype + "</span></p>"
                     + "<p>Amount: <span>" + CurrencyRateDifferenceView.variables.DeleteDataObj.totalamt + "</span></p>"
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
                    //$("<div style='float:right;' />").attr("id", "dx_btnDeleteConfirm").dxButton({
                    //    text: "Yes, Delete It!",
                    //    icon: "trash",
                    //    type: "danger",
                    onClick: function (e) {
                        var data = {
                            "CBT_ID": CurrencyRateDifferenceView.variables.Masterid,
                            "oper": CurrencyRateDifferenceView.variables.Oper,
                        }
                        CurrencyRateDifferenceView.savedata(data);
                        CurrencyRateDifferenceView.variables.dx_popupRecordDelete.hide();
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
        dx_txtExchangeRate: "",
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
    },

    FormInitialize: function () {
        var now = new Date();

        //---------------------------------add new button ---------------------------------
        CurrencyRateDifferenceView.variables.dx_btnAddNew = $("#dx_btnAddNew").dxButton({
            stylingMode: "outlined",
            icon: "plus",
            text: "Add New",
            type: "default",
            validationGroup: "CurrencyRateDifference",
            onClick: function (e) {
                $("#frm_CurrencyRateDifference").show();
                $("#pnlView").hide();
                CurrencyRateDifferenceView.variables.Masterid = "";
            }
        }).dxButton("instance");

        //-----------------------------------start top right controls--------------------------------------------
        CurrencyRateDifferenceView.variables.dx_txtcashbankacc = $("#dx_txtcashbankacc").dxAutocomplete({
            placeholder: "Select Account...",
            mode: "search",
            dataSource: new DevExpress.data.CustomStore({
                load: function (loadOptions) {
                    var deferred = $.Deferred();

                    var myfilter = { rules: [] };
                    myfilter.rules.push({ field: "GROUPNAME", op: "eq", data: "Creditors/Debitors,Indirect Income" });

                    $.ajax({
                        url: getDomain() + CurrencyRateDifferenceView.variables.BindAccListUrl + "&_search=true&searchField=ACCOUNTNAME&searchOper=cn&searchString=" + loadOptions.searchValue + "&myfilters=" + JSON.stringify(myfilter),
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
                        CurrencyRateDifferenceView.BindAccountBalance();

                        CurrencyRateDifferenceView.variables.dx_txtcashbankacc.option().selectedItem.accid;
                        $("#spanCashBankCurr").html(e.component.option().selectedItem.currencycode);
                    }
                    else {
                        CurrencyRateDifferenceView.variables.dx_txtcashbankacc = "";
                        $("#spanCashBankCurr").html('');
                    }
                }
            },
            onFocusOut: function (data) {
                var TotalAmountInRs = 0;
                TotalAmountInRs += +CurrencyRateDifferenceView.variables.dx_txtAmount.option().value * CurrencyRateDifferenceView.variables.dx_txtExchangeRate.option().value;
                CurrencyRateDifferenceView.variables.txtTotalAmountInRs.option({ value: (TotalAmountInRs.toFixed(2)) });
            },
            valueExpr: "accountname",
        }).dxValidator({
            validationGroup: "CurrencyRateDifference",
            validationRules: [{
                type: "required",
                message: "Select Bank Acc"
            }]
        }).dxAutocomplete("instance");

        CurrencyRateDifferenceView.variables.dx_txtrecacc = $("#dx_txtrecacc").dxAutocomplete({
            placeholder: "Select Account...",
            mode: "search",
            dataSource: new DevExpress.data.CustomStore({
                load: function (loadOptions) {
                    var deferred = $.Deferred();

                    var myfilter = { rules: [] };
                    myfilter.rules.push({ field: "GROUPNAME", op: "eq", data: "Creditors/Debitors,Indirect Income" });

                    $.ajax({
                        url: getDomain() + CurrencyRateDifferenceView.variables.BindAccListUrl + "&_search=true&searchField=ACCOUNTNAME&searchOper=cn&searchString=" + loadOptions.searchValue + "&myfilters=" + JSON.stringify(myfilter),
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
                        CurrencyRateDifferenceView.BindAccountReceiveBalance();

                        CurrencyRateDifferenceView.variables.dx_txtrecacc.option().selectedItem.accid;
                        $("#spanCurrencyName").html(e.component.option().selectedItem.currencycode);
                        CurrencyRateDifferenceView.variables.dx_txtExchangeRate.option({ value: e.component.option().selectedItem.exchangerate });
                    }
                    else {
                        CurrencyRateDifferenceView.variables.dx_txtrecacc = "";
                        $("#spanCurrencyName").html('');
                        CurrencyRateDifferenceView.variables.dx_txtExchangeRate.option("value", "");

                    }

                }
            },
            itemTemplate: function (data) {
                return $("<div class='product-name'>" + "(" + data.partycode + ")&nbsp;" + data.accountname + "</div>");
            },
        }).dxValidator({
            validationGroup: "CurrencyRateDifference",
            validationRules: [{
                type: "required",
                message: "Select Receive Acc"
            }]
        }).dxAutocomplete("instance");

        CurrencyRateDifferenceView.variables.dx_txtVoucherNo = $("#dx_txtVoucherNo").dxTextBox({
            readOnly: true,
        }).dxValidator({
            validationGroup: "CurrencyRateDifference",
            validationRules: []
        }).dxTextBox("instance");

        CurrencyRateDifferenceView.variables.dx_txtVoucherDate = $("#dx_txtVoucherDate").dxDateBox({
            type: "date",
            value: now,
            showClearButton: true,
            useMaskBehavior: true,
            displayFormat: "dd MMM yyyy",
        }).dxDateBox("instance");

        CurrencyRateDifferenceView.variables.dx_txtcheque = $("#dx_txtcheque").dxTextBox({
            mode: "text",
            placeholder: "Enter Ref No..."
        }).dxTextBox("instance");

       

        CurrencyRateDifferenceView.variables.dx_txtExchangeRate = $("#dx_txtExchangeRate").dxNumberBox({
            value: 1,
            min: 1,
            onFocusOut: function (data) {
                var TotalAmountInRs = 0;
                TotalAmountInRs += +CurrencyRateDifferenceView.variables.dx_txtAmount.option().value * CurrencyRateDifferenceView.variables.dx_txtExchangeRate.option().value;
                CurrencyRateDifferenceView.variables.txtTotalAmountInRs.option({ value: (TotalAmountInRs.toFixed(2)) });
            },
        }).dxValidator({
            validationGroup: "CurrencyRateDifference",
            validationRules: [{
                type: "required",
                message: "Exchange rate is required"
            }]
        }).dxNumberBox("instance");

        CurrencyRateDifferenceView.variables.dx_txtAmount = $("#dx_txtAmount").dxTextBox({
            mode: "text",
            onFocusOut: function (data) {

                var TotalAmountInRs = 0;
                TotalAmountInRs += +CurrencyRateDifferenceView.variables.dx_txtAmount.option().value * CurrencyRateDifferenceView.variables.dx_txtExchangeRate.option().value;
                CurrencyRateDifferenceView.variables.txtTotalAmountInRs.option({ value: (TotalAmountInRs.toFixed(2)) });
            },
            placeholder: "Enter Amount..."
        }).dxValidator({
            validationGroup: "CurrencyRateDifference",
            validationRules: [{
                type: "required",
                message: "Enter Amount"
            }]
        }).dxTextBox("instance");


        CurrencyRateDifferenceView.variables.txtTotalAmountInRs = $("#txtTotalAmountInRs").dxNumberBox({
            readOnly: true,
            inputAttr: {
                class: "text-right"
            },
        }).dxValidator({
            validationGroup: "CurrencyRateDifference",
            validationRules: []
        }).dxNumberBox("instance");

        //-----------------------------------/End top right controls--------------------------------------------

        //------------------------------- Start bottom left contanct--------------------------------------

        CurrencyRateDifferenceView.variables.dx_txtRemarks = $("#dx_txtRemarks").dxTextArea({
            height: 110,
            placeholder: "Enter Remark"

        }).dxTextArea("instance");
        //--------------------------------------- Submit button---------------------------------------

        CurrencyRateDifferenceView.variables.dx_btnSubmit = $("#dx_btnSubmit").dxButton({
            icon: "check",
            text: "Submit",
            type: "success",
            //useSubmitBehavior: true,
            onClick: function (e) {
                var validation = DevExpress.validationEngine.validateGroup("CurrencyRateDifference");
                if (!validation.isValid) {
                    DevExVariables.Toaster("warning", "Please fill all required fields before submit.");
                    return;
                }
                CurrencyRateDifferenceView.btnMasterSubmit();
            }
        }).dxButton("instance");

        //--------------------------------------- Cancle button---------------------------------------

        CurrencyRateDifferenceView.variables.dx_btnCancel = $("#dx_btnCancel").dxButton({
            icon: "close",
            text: "Cancel",
            type: "danger",
            onClick: function (e) {
                //$('#tbl_DesignDetails').html('');
                //CurrencyRateDifferenceView.variables.dx_dataGrid.refresh();
                CurrencyRateDifferenceView.ClearValues();
                //e.validationGroup.reset();
            }
        }).dxButton("instance");

    },

    initializeDevExgrid: function () {
        CurrencyRateDifferenceView.variables.dx_dataGrid = $("#dx_dataGrid").dxDataGrid({
            dataSource: new DevExpress.data.CustomStore({
                key: "cbt_id",
                load: function (loadOptions) {
                    var deferred = $.Deferred();

                    var myfilter = { rules: [] };
                    myfilter.rules.push({ field: "TYPE", op: "eq", data: 'Currency Rate Difference' });

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
                        url: getDomain() + CurrencyRateDifferenceView.variables.BindMainGridListUrl + "&" + parameters.join("&") + "&myfilters=" + JSON.stringify(myfilter),
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
                { dataField: "voucherdate", caption: "Voucher Date", dataType: "string", filterOperations: ["contains"], allowSorting: true, allowFiltering: true, allowHeaderFiltering: false },
                { dataField: "accountname", caption: "Cash/Bank Acc", dataType: "string", filterOperations: ["contains"], allowSorting: true, allowFiltering: true, allowHeaderFiltering: false },
                { dataField: "receiveaccname", caption: "Receive From Acc", dataType: "string", filterOperations: ["contains"], allowSorting: true, allowFiltering: true, allowHeaderFiltering: false },
                { dataField: "remark", caption: "Remark", dataType: "string", filterOperations: ["contains"], allowSorting: false, allowFiltering: false, allowHeaderFiltering: false },
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
                                     CurrencyRateDifferenceView.EditFromGrid(data.value, options.key, 'Verify');
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
                        DevExVariables.ActionTemplate(container, options, true, true, "CurrencyRateDifferenceView");
                        //DevExVariables.ActionMoreTools(container, options, true, true, true, "CurrencyRateDifferenceView");

                    }
                },
            ]
        }).dxDataGrid("instance");
    },

    btnMasterSubmit: function () {
        CurrencyRateDifferenceView.variables.Oper = 'Add';
        CurrencyRateDifferenceView.variables.addedit = "added";

        if (CurrencyRateDifferenceView.variables.dx_txtcashbankacc.option().selectedItem.currencyid == CurrencyRateDifferenceView.variables.dx_txtrecacc.option().selectedItem.currencyid) {
            DevExVariables.Toaster("warning", "cash/bank account currency and voucher account currency is same.");
            return;
        }

        if (CurrencyRateDifferenceView.variables.Masterid != "0" && parseInt(CurrencyRateDifferenceView.variables.Masterid) > 0) {
            CurrencyRateDifferenceView.variables.Oper = 'Edit';
            CurrencyRateDifferenceView.variables.addedit = 'updated';
        }

        CurrencyRateDifferenceView.variables.dx_btnSubmit.option({ disabled: true });

        var data = {
            "CBT_ID": CurrencyRateDifferenceView.variables.Masterid,
            "VOUCHERDATE": CurrencyRateDifferenceView.variables.dx_txtVoucherDate.option().text,
            "CASHBANKACCID": CurrencyRateDifferenceView.variables.dx_txtcashbankacc.option().selectedItem.accid,
            "PAYERRECIEVERACCID": CurrencyRateDifferenceView.variables.dx_txtrecacc.option().selectedItem.accid,
            "CASHBANKCURRENCYID": CurrencyRateDifferenceView.variables.dx_txtcashbankacc.option().selectedItem.currencyid,
            "CURRENCYID": CurrencyRateDifferenceView.variables.dx_txtrecacc.option().selectedItem.currencyid,
            "EXCHANGERATE": CurrencyRateDifferenceView.variables.dx_txtExchangeRate.option().value,
            "TOTALAMT": CurrencyRateDifferenceView.variables.dx_txtAmount.option().value,
            "TOTALAMTINRS": CurrencyRateDifferenceView.variables.txtTotalAmountInRs.option().value,
            "oper": CurrencyRateDifferenceView.variables.Oper,
        }

        if (CurrencyRateDifferenceView.variables.dx_txtcheque.option().value)
            data.CHEQUENO = CurrencyRateDifferenceView.variables.dx_txtcheque.option().value;

        if (CurrencyRateDifferenceView.variables.dx_txtRemarks.option().value)
            data.REMARK = CurrencyRateDifferenceView.variables.dx_txtRemarks.option().value;

        CurrencyRateDifferenceView.savedata(data);
    },

    savedata: function (data) {
        $.ajax({
            url: getDomain() + CurrencyRateDifferenceView.variables.PerformMasterOperationUrl,
            data: data,
            async: true,
            cache: false,
            type: 'POST',
            beforeSend: function () {
                dx_LoaderTrinity.show();
            },
            complete: function () {
                dx_LoaderTrinity.hide();
                CurrencyRateDifferenceView.variables.dx_btnSubmit.option({ disabled: false });
            },
            success: CurrencyRateDifferenceView.btnMasterSubmitOnSuccess,
            error: OnError,
        });
    },

    btnMasterSubmitOnSuccess: function (data) {
        if ($(data).find('RESPONSECODE').text() == "0") {
            DevExVariables.Toaster("success", 'Record is ' + CurrencyRateDifferenceView.variables.addedit + ' successfully');
            $('#frm_CreditDebit').hide();
            $('#pnlView').show();
            if (CurrencyRateDifferenceView.variables.dx_popupRecordDelete)
                CurrencyRateDifferenceView.variables.dx_popupRecordDelete.hide();

            CurrencyRateDifferenceView.ClearValues();
            CurrencyRateDifferenceView.variables.dx_dataGrid.refresh();
        }
        else {
            DevExVariables.InvalidResponseCode(data);
        }
    },

    ClearValues: function () {
        CurrencyRateDifferenceView.variables.Masterid = "";
        CurrencyRateDifferenceView.variables.Oper = 'Add';
        CurrencyRateDifferenceView.variables.addedit = "added";
        CurrencyRateDifferenceView.variables.DeleteDataObj = "";
        DevExpress.validationEngine.resetGroup("CurrencyRateDifference");
        CurrencyRateDifferenceView.variables.dx_txtVoucherDate.option({ value: new Date() });
        CurrencyRateDifferenceView.variables.dx_txtcashbankacc.option("value", "");
        CurrencyRateDifferenceView.variables.dx_txtrecacc.option("value", "");
        CurrencyRateDifferenceView.variables.dx_txtExchangeRate.option("value", "");
        CurrencyRateDifferenceView.variables.dx_txtAmount.option("value", "");
        CurrencyRateDifferenceView.variables.txtTotalAmountInRs.option("value", "");
        CurrencyRateDifferenceView.variables.dx_txtRemarks.option("value", "");
        CurrencyRateDifferenceView.variables.dx_txtcheque.option("value", "");
        CurrencyRateDifferenceView.variables.dx_btnSubmit.option({ visible: true });
        $("#frm_CurrencyRateDifference").hide();
        $("#pnlView").show();
        $("#spanCashBankCurr").html("");
        $("#spanCurrencyName").html("");
        $("#btnAddSelectionList").html("0.00");
        $("#btnAddSelectionRecieveList").html("0.00");
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
            url: getDomain() + CurrencyRateDifferenceView.variables.PerformMasterOperationUrl,
            data: data,
            async: true,
            cache: false,
            type: 'POST',
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    DevExVariables.Toaster("success", 'Record is updated successfully.');
                    CurrencyRateDifferenceView.variables.dx_dataGrid.refresh();
                }
            },
            error: OnError,
        });
    },

    deleteRow: function (id) {
        var rowData = CurrencyRateDifferenceView.variables.dx_dataGrid.getVisibleRows()[CurrencyRateDifferenceView.variables.dx_dataGrid.getRowIndexByKey(+id)].data;
        CurrencyRateDifferenceView.variables.Masterid = id;
        CurrencyRateDifferenceView.variables.DeleteDataObj = rowData;
        CurrencyRateDifferenceView.variables.Oper = "Delete";

        if (CurrencyRateDifferenceView.variables.dx_popupRecordDelete) {
            CurrencyRateDifferenceView.variables.dx_popupRecordDelete.option("contentTemplate", CurrencyRateDifferenceView.variables.DeletePopUpOptions.contentTemplate(CurrencyRateDifferenceView.variables.DeleteDataObj).bind(this));
        }
        else {
            CurrencyRateDifferenceView.variables.dx_popupRecordDelete = $("#dx_popupRecordDelete").dxPopup(CurrencyRateDifferenceView.variables.DeletePopUpOptions).dxPopup("instance");
        }

        CurrencyRateDifferenceView.variables.dx_popupRecordDelete.show();
    },

    triggerId: function (id) {
        var rowData = CurrencyRateDifferenceView.variables.dx_dataGrid.getVisibleRows()[CurrencyRateDifferenceView.variables.dx_dataGrid.getRowIndexByKey(+id)].data;
        CurrencyRateDifferenceView.variables.Masterid = id;
        CurrencyRateDifferenceView.variables.dx_txtExchangeRate.option({ value: rowData.exchangerate });
        CurrencyRateDifferenceView.variables.dx_txtVoucherDate.option({ value: rowData.voucherdate });
        CurrencyRateDifferenceView.variables.dx_txtcashbankacc.option({
            items: [{ accid: rowData.cashbankaccid, accountname: rowData.accountname, currencycode1: rowData.cashbankcurcode, currencyid: rowData.cashbankcurrencyid }],
            selectedItem: { accid: rowData.cashbankaccid, accountname: rowData.accountname, currencycode1: rowData.cashbankcurcode, currencyid: rowData.cashbankcurrencyid },
            value: rowData.accountname
        });
        CurrencyRateDifferenceView.variables.dx_txtrecacc.option({
            items: [{ accid: rowData.payerrecieveraccid, accountname: rowData.receiveaccname, currencycode: rowData.currencycode, currencyid: rowData.currencyid }],
            selectedItem: { accid: rowData.payerrecieveraccid, accountname: rowData.receiveaccname, currencycode: rowData.currencycode, currencyid: rowData.currencyid },
            value: rowData.receiveaccname
        });
        CurrencyRateDifferenceView.BindAccountBalance();
        CurrencyRateDifferenceView.BindAccountReceiveBalance();
        CurrencyRateDifferenceView.variables.dx_txtVoucherNo.option({ value: rowData.voucherno });
        CurrencyRateDifferenceView.variables.dx_txtAmount.option({ value: rowData.totalamt });
        $("#spanCashBankCurr").html(CurrencyRateDifferenceView.variables.dx_txtcashbankacc.option().selectedItem.currencycode1);
        $("#spanCurrencyName").html(CurrencyRateDifferenceView.variables.dx_txtrecacc.option().selectedItem.currencycode);
        //CurrencyRateDifferenceView.variables.dx_ddlCurrencyName.option({ value: rowData.currencycode });
        //CurrencyRateDifferenceView.variables.dx_ddlCashBankCurr.option({ value: rowData.currencycode });
        CurrencyRateDifferenceView.variables.txtTotalAmountInRs.option({ value: rowData.totalamtinrs });
        CurrencyRateDifferenceView.variables.dx_txtRemarks.option({ value: rowData.remark });
        CurrencyRateDifferenceView.variables.dx_txtcheque.option({ value: rowData.chequeno });
        $("#frm_CurrencyRateDifference").show();
        $("#pnlView").hide();
        if (isU()) {
            CurrencyRateDifferenceView.variables.dx_btnSubmit.option({ visible: true });
        }
        else {
            CurrencyRateDifferenceView.variables.dx_btnSubmit.option({ visible: false });
        }
    },

    BindAccountBalance: function () {
        var myfilter = { rules: [] };
        myfilter.rules.push({ field: "ACCID", op: "eq", data: CurrencyRateDifferenceView.variables.dx_txtcashbankacc.option().selectedItem.accid });
        myfilter.rules.push({ field: "ASONDATE", op: "eq", data: CurrencyRateDifferenceView.variables.dx_txtVoucherDate.option().text });

        $.ajax({
            url: getDomain() + CurrencyRateDifferenceView.variables.BindAccountbalancelist + "&myfilters=" + JSON.stringify(myfilter),
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
        myfilter.rules.push({ field: "ACCID", op: "eq", data: CurrencyRateDifferenceView.variables.dx_txtrecacc.option().selectedItem.accid });
        myfilter.rules.push({ field: "ASONDATE", op: "eq", data: CurrencyRateDifferenceView.variables.dx_txtVoucherDate.option().text });

        $.ajax({
            url: getDomain() + CurrencyRateDifferenceView.variables.BindAccountbalancelist + "&myfilters=" + JSON.stringify(myfilter),
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
    CurrencyRateDifferenceView.FormInitialize();
    CurrencyRateDifferenceView.initializeDevExgrid();
});