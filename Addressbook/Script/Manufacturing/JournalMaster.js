var JournalMasterView = {
    variables: {
        BindAccListUrl: "/Common/BindMastersDetails?ServiceName=ACCOUNTMASTER_GET",
        BindAccountbalancelist: "/Common/BindMastersDetails?ServiceName=ACC_BALANCE_GET",
        BindMainGridListUrl: "/Common/BindMastersDetails?ServiceName=ACC_JOURNAL_MASTER_GET",
        PerformMasterOperationUrl: "/Common/OpeartionsOnMaster?ServiceName=ACC_JOURNAL_MASTER_CRUD",
        dx_btnAddNew: "",
        dx_VchrNo: "",
        dx_txtVoucherDate: "",
        dx_txtamt: "",
        dx_txtdebitacc: "",
        dx_txtExchangeRate: "",
        dx_txtcreditacc: "",
        txtAmountInRs: "",
        dx_txtRemarks: "",
        dx_btnSubmit: "",
        dx_btnCancel: "",
        dx_dataGrid: "",
        dx_popupRecordDelete: "",
        DeleteDataObj: "",
        DeletePopUpOptions: {
            width: 300,
            height: 200,
            contentTemplate: function () {
                return $("<div />").append(
                    $("<p>Voucher No: <span>" + JournalMasterView.variables.DeleteDataObj.voucherno + "</span></p>"
                     + "<p>Amount: <span>" + JournalMasterView.variables.DeleteDataObj.amount + "</span></p>"
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
                            "JM_ID": JournalMasterView.variables.Masterid,
                            "oper": JournalMasterView.variables.Oper,
                        }
                        $.ajax({
                            url: getDomain() + JournalMasterView.variables.PerformMasterOperationUrl,
                            data: data,
                            async: true,
                            cache: false,
                            type: 'POST',
                            success: function (data) {
                                if ($(data).find('RESPONSECODE').text() == "0") {
                                    DevExVariables.Toaster("success", 'Record is deleted successfully');

                                    JournalMasterView.variables.dx_popupRecordDelete.hide();
                                    JournalMasterView.variables.dx_dataGrid.refresh();
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

    },

    FormInitialize: function () {
        var now = new Date();

        JournalMasterView.variables.dx_btnAddNew = $("#dx_btnAddNew").dxButton({
            stylingMode: "outlined",
            icon: "plus",
            text: "Add New",
            type: "default",
            validationGroup: "CashbankBook",
            onClick: function (e) {
                $("#frm_JournalBook").show();
                $("#pnlView").hide();
                JournalMasterView.variables.Masterid = "";
            }
        }).dxButton("instance");

        JournalMasterView.variables.dx_VchrNo = $("#dx_VchrNo").dxTextBox({
            readOnly: true,
        }).dxValidator({
            validationGroup: "JournalMaster",
            validationRules: []
        }).dxTextBox("instance");

        JournalMasterView.variables.dx_txtVoucherDate = $("#dx_txtVoucherDate").dxDateBox({
            type: "date",
            value: now,
            showClearButton: true,
            useMaskBehavior: true,
            displayFormat: "dd MMM yyyy",
        }).dxValidator({
            validationGroup: "JournalMaster",
            validationRules: [{
                type: "required",
                message: "Select Voucher Date."
            }]
        }).dxDateBox("instance");

        JournalMasterView.variables.dx_txtamt = $("#dx_txtamt").dxTextBox({
            mode: "text",
            onItemClick: function (e) { },
            onFocusOut: function (data) {
                var amt = 0;
                amt = (JournalMasterView.variables.dx_txtamt.option().value * JournalMasterView.variables.dx_txtExchangeRate.option().value)
                JournalMasterView.variables.txtAmountInRs.option({ value: amt.toFixed(2) });
            },
            placeholder: "Enter Amount...",
        }).dxValidator({
            validationGroup: "JournalMaster",
            validationRules: [{
                type: "required",
                message: "Add Bill Total Amount."
            }]
        }).dxTextBox("instance");

        JournalMasterView.variables.dx_txtdebitacc = $("#dx_txtdebitacc").dxAutocomplete({
            placeholder: "Select Account...",
            mode: "search",
            dataSource: new DevExpress.data.CustomStore({
                load: function (loadOptions) {
                    var deferred = $.Deferred();

                    var myfilter = { rules: [] };
                    //myfilter.rules.push({ field: "GROUPNAME", op: "eq", data: "Creditors/Debitors" });
                    myfilter.rules.push({ field: "GROUPNAME", op: "eq", data: "Creditors/Debitors,Current Liabilities,Direct Expense,Indirect Expense,Capital Account,Fixed Assets,Loans And Advances,Duties And Taxes,Investments,Loans And Liabilities" });

                    $.ajax({
                        url: getDomain() + JournalMasterView.variables.BindAccListUrl + "&_search=true&searchField=ACCOUNTNAME&searchOper=cn&searchString=" + loadOptions.searchValue + "&myfilters=" + JSON.stringify(myfilter),
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
                        JournalMasterView.BindAccountReceiveBalance();
                        JournalMasterView.variables.dx_txtdebitacc.option().selectedItem.accid;
                        $("#spanDebitCurr").html(e.component.option().selectedItem.currencycode);
                    }
                    else {
                        JournalMasterView.variables.dx_txtdebitacc = "";
                        $("#spanDebitCurr").html('');
                    }
                }
            },
            itemTemplate: function (data) {
                return $("<div class='product-name'>" + "(" + data.partycode + ")&nbsp;" + data.accountname + "</div>");
            },
        }).dxValidator({
            validationGroup: "JournalMaster",
            validationRules: [{
                type: "required",
                message: "Fill Debitor Account."
            }]
        }).dxAutocomplete("instance");

        JournalMasterView.variables.dx_txtExchangeRate = $("#dx_txtExchangeRate").dxNumberBox({
            value: 1,
            min: 1,
            onFocusOut: function (data) {
                var amt = 0;
                amt = (JournalMasterView.variables.dx_txtamt.option().value * JournalMasterView.variables.dx_txtExchangeRate.option().value)
                JournalMasterView.variables.txtAmountInRs.option({ value: amt.toFixed(2) });
            },
        }).dxValidator({
            validationGroup: "JournalMaster",
            validationRules: [{
                type: "required",
                message: "Exchange rate is required"
            }]
        }).dxNumberBox("instance");

        JournalMasterView.variables.dx_txtcreditacc = $("#dx_txtcreditacc").dxAutocomplete({
            placeholder: "Select Account...",
            mode: "search",
            dataSource: new DevExpress.data.CustomStore({
                load: function (loadOptions) {
                    var deferred = $.Deferred();

                    var myfilter = { rules: [] };
                    //myfilter.rules.push({ field: "GROUPNAME", op: "eq", data: "Creditors/Debitors" });
                    myfilter.rules.push({ field: "GROUPNAME", op: "eq", data: "Creditors/Debitors,Current Liabilities,Direct Expense,Indirect Expense,Capital Account,Fixed Assets,Loans And Advances,Duties And Taxes,Investments,Loans And Liabilities" });

                    $.ajax({
                        url: getDomain() + JournalMasterView.variables.BindAccListUrl + "&_search=true&searchField=ACCOUNTNAME&searchOper=cn&searchString=" + loadOptions.searchValue + "&myfilters=" + JSON.stringify(myfilter),
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
                        JournalMasterView.BindAccountBalance();
                        JournalMasterView.variables.dx_txtcreditacc.option().selectedItem.accid;
                        $("#spanCreditCurr").html(e.component.option().selectedItem.currencycode);
                        JournalMasterView.variables.dx_txtExchangeRate.option({ value: e.component.option().selectedItem.exchangerate });
                    }
                    else {
                        JournalMasterView.variables.dx_txtcreditacc = "";
                        $("#spanCreditCurr").html('');
                        JournalMasterView.variables.dx_txtExchangeRate.option("value", "");
                    }
                }
            },
            onFocusOut: function (data) {
                var amt = 0;
                amt = (JournalMasterView.variables.dx_txtamt.option().value * JournalMasterView.variables.dx_txtExchangeRate.option().value)
                JournalMasterView.variables.txtAmountInRs.option({ value: amt.toFixed(2) });
            },
            itemTemplate: function (data) {
                return $("<div class='product-name'>" + "(" + data.partycode + ")&nbsp;" + data.accountname + "</div>");
            },
        }).dxValidator({
            validationGroup: "JournalMaster",
            validationRules: [{
                type: "required",
                message: "fill Creditor Sccount."
            }]
        }).dxAutocomplete("instance");

        JournalMasterView.variables.txtAmountInRs = $("#txtAmountInRs").dxNumberBox({
            readOnly: true,
            inputAttr: {
                class: "text-right"
            },
        }).dxValidator({
            validationGroup: "JournalMaster",
            validationRules: []
        }).dxNumberBox("instance");

        JournalMasterView.variables.dx_txtRemarks = $("#dx_txtRemarks").dxTextArea({
            height: 110,
            placeholder: "Enter Remark"

        }).dxTextArea("instance");

        //--------------------------------------- Submit button---------------------------------------

        JournalMasterView.variables.dx_btnSubmit = $("#dx_btnSubmit").dxButton({
            icon: "check",
            text: "Submit",
            type: "success",
            //useSubmitBehavior: true,
            onClick: function (e) {
                var validation = DevExpress.validationEngine.validateGroup("JournalMaster");
                if (!validation.isValid) {
                    DevExVariables.Toaster("warning", "Please fill all required fields before submit.");
                    return;
                }
                JournalMasterView.btnMasterSubmit();
            }
        }).dxButton("instance");

        //--------------------------------------- Cancle button---------------------------------------

        JournalMasterView.variables.dx_btnCancel = $("#dx_btnCancel").dxButton({
            icon: "close",
            text: "Cancel",
            type: "danger",
            onClick: function (e) {
                JournalMasterView.ClearValues();
            }
        }).dxButton("instance");
    },

    initializeDevExgrid: function () {
        JournalMasterView.variables.dx_dataGrid = $("#dx_dataGrid").dxDataGrid({
            dataSource: new DevExpress.data.CustomStore({
                key: "jm_id",
                load: function (loadOptions) {
                    var deferred = $.Deferred();

                    var result = DevExVariables.GetDataList(loadOptions, JournalMasterView.variables.BindMainGridListUrl);

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
            columns: [{ dataField: "jm_id", allowFiltering: false, allowSorting: true, sortIndex: 1, sortOrder: "desc", visible: false },
                { dataField: "voucherno", caption: "Voucher No", dataType: "string", filterOperations: ["contains"], allowSorting: true, allowFiltering: true, allowHeaderFiltering: false },
                { dataField: "voucherdate", caption: "payment Date", dataType: "string", filterOperations: ["contains"], allowSorting: true, allowFiltering: true, allowHeaderFiltering: false },
                { dataField: "debitoraccname", caption: "Debitor Acc", dataType: "string", filterOperations: ["contains"], allowSorting: true, allowFiltering: true, allowHeaderFiltering: false },
                { dataField: "creditoraccname", caption: "Creditor Acc", dataType: "string", filterOperations: ["contains"], allowSorting: true, allowFiltering: true, allowHeaderFiltering: false },
                { dataField: "creditorcurcode", caption: "Currency", dataType: "string", filterOperations: ["contains"], allowSorting: true, allowFiltering: true, allowHeaderFiltering: false },
                { dataField: "exchangerate", caption: "Exchange Rate", dataType: "number", filterOperations: ["contains"], allowSorting: true, allowFiltering: true, allowHeaderFiltering: false },
                { dataField: "remark", caption: "Remark", dataType: "number", filterOperations: ["contains"], allowSorting: false, allowFiltering: false, allowHeaderFiltering: false },
                { dataField: "amount", caption: "Amount", dataType: "number", filterOperations: ["contains"], allowSorting: false, allowFiltering: false, allowHeaderFiltering: false },
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
                                    JournalMasterView.EditFromGrid(data.value, options.key, 'Verify');
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
                        DevExVariables.ActionTemplate(container, options, true, true, "JournalMasterView");
                    }
                },
            ]
        }).dxDataGrid("instance");
    },

    btnMasterSubmit: function () {
        //if (JournalMasterView.variables.dx_txtdebitacc.option().selectedItem.currencyid != JournalMasterView.variables.dx_txtcreditacc.option().selectedItem.currencyid) {
        //    DevExVariables.Toaster("warning", "cash/bank account currency and voucher account currency is not same.");
        //    return;
        //}

        JournalMasterView.variables.dx_btnSubmit.option({ disabled: true });

        JournalMasterView.variables.Oper = 'Add';
        JournalMasterView.variables.addedit = "added";
        if (JournalMasterView.variables.Masterid != "0" && parseInt(JournalMasterView.variables.Masterid) > 0) {
            JournalMasterView.variables.Oper = 'Edit';
            JournalMasterView.variables.addedit = 'updated';
        }

        var data = {
            "JM_ID": JournalMasterView.variables.Masterid,
            "VOUCHERDATE": JournalMasterView.variables.dx_txtVoucherDate.option().text,
            "CREDITORACCID": JournalMasterView.variables.dx_txtcreditacc.option().selectedItem.accid,
            "DEBITORACCID": JournalMasterView.variables.dx_txtdebitacc.option().selectedItem.accid,
            "CREDITORCURRENCYID": JournalMasterView.variables.dx_txtcreditacc.option().selectedItem.currencyid,
            "DEBITORCURRENCYID": JournalMasterView.variables.dx_txtdebitacc.option().selectedItem.currencyid,
            "EXCHANGERATE": JournalMasterView.variables.dx_txtExchangeRate.option().value,
            "AMOUNT": JournalMasterView.variables.dx_txtamt.option().value,
            "AMOUNTINRS": JournalMasterView.variables.txtAmountInRs.option().value,
            "oper": JournalMasterView.variables.Oper,
        }

        if (JournalMasterView.variables.dx_txtRemarks.option().value)
            data.REMARK = JournalMasterView.variables.dx_txtRemarks.option().value;

        JournalMasterView.savedata(data);
    },

    savedata: function (data) {
        $.ajax({
            url: getDomain() + JournalMasterView.variables.PerformMasterOperationUrl,
            data: data,
            async: true,
            cache: false,
            type: 'POST',
            beforeSend: function () {
                dx_LoaderTrinity.show();
            },
            complete: function () {
                dx_LoaderTrinity.hide();
                JournalMasterView.variables.dx_btnSubmit.option({ disabled: false });
            },
            success: JournalMasterView.btnMasterSubmitOnSuccess,
            error: OnError,
        });
    },

    btnMasterSubmitOnSuccess: function (data) {
        if ($(data).find('RESPONSECODE').text() == "0") {
            DevExVariables.Toaster("success", 'Record is Added successfully.');
            $("#frm_JournalBook").hide();
            $("#pnlView").show();
            DevExpress.validationEngine.resetGroup("JournalMaster");
            JournalMasterView.ClearValues();
            JournalMasterView.variables.dx_dataGrid.refresh();
        }
        else {
            DevExVariables.InvalidResponseCode(data);
        }
    },

    triggerId: function (id) {
        var rowData = JournalMasterView.variables.dx_dataGrid.getVisibleRows()[JournalMasterView.variables.dx_dataGrid.getRowIndexByKey(+id)].data;
        JournalMasterView.variables.Masterid = id;
        JournalMasterView.variables.dx_txtVoucherDate.option({ value: rowData.voucherdate });
        JournalMasterView.variables.dx_txtdebitacc.option({
            items: [{ accid: rowData.debitoraccid, accountname: rowData.debitoraccname, currencycode: rowData.debitorcurcode, currencyid: rowData.debitorcurrencyid }],
            selectedItem: { accid: rowData.debitoraccid, accountname: rowData.debitoraccname, currencycode: rowData.debitorcurcode, currencyid: rowData.debitorcurrencyid },
            value: rowData.debitoraccname
        });
        JournalMasterView.variables.dx_txtcreditacc.option({
            items: [{ accid: rowData.creditoraccid, accountname: rowData.creditoraccname, currencycode: rowData.creditorcurcode, currencyid: rowData.creditorcurrencyid }],
            selectedItem: { accid: rowData.creditoraccid, accountname: rowData.creditoraccname, currencycode: rowData.creditorcurcode, currencyid: rowData.creditorcurrencyid },
            value: rowData.creditoraccname
        });
        JournalMasterView.BindAccountBalance();
        JournalMasterView.BindAccountReceiveBalance();
        JournalMasterView.variables.dx_VchrNo.option({ value: rowData.voucherno });
        JournalMasterView.variables.dx_txtamt.option({ value: rowData.amount });
        $("#spanDebitCurr").html(JournalMasterView.variables.dx_txtdebitacc.option().selectedItem.currencycode);
        $("#spanCreditCurr").html(JournalMasterView.variables.dx_txtcreditacc.option().selectedItem.currencycode);
        JournalMasterView.variables.dx_txtExchangeRate.option({ value: rowData.exchangerate });
        JournalMasterView.variables.txtAmountInRs.option({ value: rowData.amountinrs });
        JournalMasterView.variables.dx_txtRemarks.option({ value: rowData.remark });
        $("#frm_JournalBook").show();
        $("#pnlView").hide();
        if (isU()) {
            JournalMasterView.variables.dx_btnSubmit.option({ visible: true });
        }
        else {
            JournalMasterView.variables.dx_btnSubmit.option({ visible: false });
        }
    },

    ClearValues: function () {
        JournalMasterView.variables.Masterid = "";
        JournalMasterView.variables.Oper = 'Add';
        JournalMasterView.variables.addedit = "added";
        JournalMasterView.variables.DeleteDataObj = "";
        DevExpress.validationEngine.resetGroup("JournalMaster");
        JournalMasterView.variables.dx_txtVoucherDate.option({ value: new Date() });
        JournalMasterView.variables.dx_txtdebitacc.option("value", "");
        JournalMasterView.variables.dx_txtcreditacc.option("value", "");
        JournalMasterView.variables.dx_txtamt.option("value", "");
        JournalMasterView.variables.dx_txtExchangeRate.option("value", "");
        JournalMasterView.variables.txtAmountInRs.option("value", "");
        JournalMasterView.variables.dx_txtRemarks.option("value", "");
        JournalMasterView.variables.dx_btnSubmit.option({ visible: true });
        $("#spanDebitCurr").html("");
        $("#spanCreditCurr").html("");
        $("#btnAddSelectionList").html("0.00");
        $("#btnAddSelectionRecieveList").html("0.00");
        $("#frm_JournalBook").hide();
        $("#pnlView").show();
        $("#tbl_DesignDetails tbody").html("");
        $("#btnAddSelectionList").html("");
        $("#btnAddSelectionRecieveList").html("");
    },

    deleteRow: function (id) {
        var rowData = JournalMasterView.variables.dx_dataGrid.getVisibleRows()[JournalMasterView.variables.dx_dataGrid.getRowIndexByKey(+id)].data;
        JournalMasterView.variables.Masterid = id;
        JournalMasterView.variables.DeleteDataObj = rowData;
        JournalMasterView.variables.Oper = "Delete";

        if (JournalMasterView.variables.dx_popupRecordDelete) {
            JournalMasterView.variables.dx_popupRecordDelete.option("contentTemplate", JournalMasterView.variables.DeletePopUpOptions.contentTemplate(JournalMasterView.variables.DeleteDataObj).bind(this));
        }
        else {
            JournalMasterView.variables.dx_popupRecordDelete = $("#dx_popupRecordDelete").dxPopup(JournalMasterView.variables.DeletePopUpOptions).dxPopup("instance");
        }

        JournalMasterView.variables.dx_popupRecordDelete.show();
    },

    EditFromGrid: function (val, id, type) {
        var data = {
            "JM_ID": id,
            "OPER_TYPE": "EditFromGrid",
            "oper": "Edit"
        }
        if (type == "Verify")
            data.ISVERIFY = val;
        $.ajax({
            url: getDomain() + JournalMasterView.variables.PerformMasterOperationUrl,
            data: data,
            async: true,
            cache: false,
            type: 'POST',
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    DevExVariables.Toaster("success", 'Record is updated successfully.');
                    JournalMasterView.variables.dx_dataGrid.refresh();
                }
            },
            error: OnError,
        });
    },

    BindAccountBalance: function () {
        var myfilter = { rules: [] };
        myfilter.rules.push({ field: "ACCID", op: "eq", data: JournalMasterView.variables.dx_txtcreditacc.option().selectedItem.accid });
        myfilter.rules.push({ field: "ASONDATE", op: "eq", data: JournalMasterView.variables.dx_txtVoucherDate.option().text });

        $.ajax({
            url: getDomain() + JournalMasterView.variables.BindAccountbalancelist + "&myfilters=" + JSON.stringify(myfilter),
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
        myfilter.rules.push({ field: "ACCID", op: "eq", data: JournalMasterView.variables.dx_txtdebitacc.option().selectedItem.accid });
        myfilter.rules.push({ field: "ASONDATE", op: "eq", data: JournalMasterView.variables.dx_txtVoucherDate.option().text });

        $.ajax({
            url: getDomain() + JournalMasterView.variables.BindAccountbalancelist + "&myfilters=" + JSON.stringify(myfilter),
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
    JournalMasterView.FormInitialize();
    JournalMasterView.initializeDevExgrid();
});
