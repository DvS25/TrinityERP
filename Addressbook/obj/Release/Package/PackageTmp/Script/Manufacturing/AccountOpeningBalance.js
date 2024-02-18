var AccOpeningBalview = {
    variables: {
        BindAccListUrl: "/Common/BindMastersDetails?ServiceName=ACCOUNTMASTER_GET",
        BindGroupListUrl: "/Common/BindMastersDetails?ServiceName=ACC_ACCOUNT_OPENING_BALANCE_GET",
        PerformMasterOperationUrl: "/Common/OpeartionsOnMaster?ServiceName=ACC_ACCOUNTOPENINGBALANCE_CRUD",
        BindStaticDataUrl: "/Common/BindMastersDetails?ServiceName=STATIC_MASTER_GET&IsActive=true",
        BindCurrencyList: "/Common/BindMastersDetails?ServiceName=CURRENCY_EXCHANGERATE_DETAILS_GET",
        BindDetailListUrl: "/Common/BindMastersDetails?ServiceName=ACC_ACCOUNTOPENINGBALANCE_DETAILS_GET",


        Oper: 'Add',
        addedit: "added",
        Masterid: "",
        dx_btnAddNew: "",
        dx_txtaccname: "",
        dx_txtAmount: "",
        dx_ddlbaltype: "",
        dx_txtRemarks: "",
        dx_btnSubmit: "",
        dx_btnCancel: "",
        dx_dataGrid: "",
        dx_ddlBroker:"",
        DetailsControlsList: [],
        RowCount: 1,
        dx_popupRecordDelete: "",
        DeleteDataObj: "",
        DeletePopUpOptions: {
            width: 300,
            height: 200,
            contentTemplate: function () {
                return $("<div />").append(
                    $("<p>OP_ID: <span>" + AccOpeningBalview.variables.DeleteDataObj.op_id + "</span></p>"),
                    $("<p>ACCOUNTNAME: <span>" + AccOpeningBalview.variables.DeleteDataObj.accountname + "</span></p>")
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
                            "OP_ID": AccOpeningBalview.variables.Masterid,
                            "oper": AccOpeningBalview.variables.Oper,
                        }

                        $.ajax({
                            url: getDomain() + AccOpeningBalview.variables.PerformMasterOperationUrl,
                            data: data,
                            async: true,
                            cache: false,
                            type: 'POST',
                            success: function (data) {
                                if ($(data).find('RESPONSECODE').text() == "0") {
                                    DevExVariables.Toaster("success", 'Record is deleted successfully');

                                    AccOpeningBalview.variables.dx_popupRecordDelete.hide();
                                    AccOpeningBalview.variables.dx_dataGrid.refresh();
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
        AccOpeningBalview.variables.dx_txtaccname = $("#dx_txtaccname").dxAutocomplete({
            placeholder: "Select Account Name...",
            mode: "search",
            dataSource: new DevExpress.data.CustomStore({
                load: function (loadOptions) {
                    var deferred = $.Deferred();

                    var myfilter = { rules: [] };
                    myfilter.rules.push({ field: "GROUPNAME", op: "eq", data: "Creditors/Debitors" });

                    $.ajax({
                        url: getDomain() + AccOpeningBalview.variables.BindAccListUrl + "&_search=true&searchField=ACCOUNTNAME&searchOper=cn&searchString=" + loadOptions.searchValue + "&myfilters=" + JSON.stringify(myfilter),
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
                    if (e.component.option().selectedItem) {
                        //AccOpeningBalview.variables.DetailsControlsList[postfix].dx_exrate.option({ value: e.component.option().selectedItem.exchangerate });
                        AccOpeningBalview.variables.dx_txtaccname.option().selectedItem.accid;
                        //AccOpeningBalview.variables.dx_duedays.option({ value: e.component.option().selectedItem.creditdays });
                        $("#spanCashBankCurr").html(e.component.option().selectedItem.currencycode);
                    }
                    else {
                        $("#spanCashBankCurr").html('');
                        AccOpeningBalview.variables.dx_txtaccname = "";
                        AccOpeningBalview.variables.dx_txtDueDays.option("value", "");
                        AccOpeningBalview.variables.dx_txtExchangeRate.option("value", "");
                    }
                }
            },
            itemTemplate: function (data) {
                return $("<div class='product-name'>" + "(" + data.partycode + ")&nbsp;" + data.accountname + "</div>");
            },
        }).dxValidator({
            validationGroup: "AccOpeningBal",
            validationRules: [{
                type: "required",
                message: "Accountname is required"
            }]
        }).dxAutocomplete("instance");

        AccOpeningBalview.variables.dx_txtAmount = $("#dx_txtAmount").dxNumberBox({
            readOnly: true,
        }).dxValidator({
            validationGroup: "AccOpeningBal",
            validationRules: []
        }).dxNumberBox("instance");

        AccOpeningBalview.variables.dx_VchrNo = $("#dx_VchrNo").dxTextBox({
            readOnly: true,
        }).dxValidator({
            validationGroup: [],
            validationRules: []
        }).dxTextBox("instance");

        AccOpeningBalview.variables.dx_ddlbaltype = $("#dx_ddlbaltype").dxSelectBox({
            dataSource: ['Credit','Debit'],
            placeholder: "Select Balance Type...",
            searchEnabled: true,
        }).dxValidator({
            validationGroup: "AccOpeningBal",
            validationRules: []
        }).dxSelectBox("instance");

        AccOpeningBalview.variables.dx_txtRemarks = $("#dx_txtRemarks").dxTextArea({
            height: 110
        }).dxTextArea("instance");

        //AccOpeningBalview.variables.dx_ddlBroker = $("#dx_ddlBroker").dxSelectBox({
        //    placeholder: "Select Broker Name...",
        //    searchEnabled: true,
        //}).dxValidator({
        //    validationGroup: "AccOpeningBal",
        //    validationRules: []
        //}).dxSelectBox("instance");

        AccOpeningBalview.variables.dx_txtVoucherDate = $("#dx_txtVoucherDate").dxDateBox({
            type: "date",
            value: new Date(),
            showClearButton: true,
            useMaskBehavior: true,
            displayFormat: "dd MMM yyyy",
        }).dxValidator({
            validationGroup: "AccOpeningBal",
            validationRules: [{
                type: "required",
                message: "Voucher Date is required"
            }]
        }).dxDateBox("instance");

        AccOpeningBalview.variables.dx_txtDueDays = $("#dx_txtDueDays").dxTextBox({
            mode: "number",
            value: 0,
        }).dxValidator({
            validationGroup: "AccOpeningBal",
            validationRules: []
        }).dxTextBox("instance");

        AccOpeningBalview.variables.dx_ddlCurrencyName = $("#dx_ddlCurrencyName").dxSelectBox({
            placeholder: "Select Currency...",
            searchEnabled: true,
            onValueChanged: function (data) {
                if (AccOpeningBalview.variables.dx_ddlCurrencyName.option().selectedItem) {
                    AccOpeningBalview.variables.dx_txtExchangeRate.option({ value: AccOpeningBalview.variables.dx_ddlCurrencyName.option().selectedItem.exchangerate });
                }
            }
        }).dxValidator({
            validationGroup: "AccOpeningBal",
            validationRules: [{
                type: "required",
                message: "Currency is required"
            }]
        }).dxSelectBox("instance");

        //AccOpeningBalview.variables.dx_txtExchangeRate = $("#dx_txtExchangeRate").dxNumberBox({
        //    value: 1,
        //    min: 1,
        //    onFocusOut: function (data) {
        //        AccOpeningBalview.CalcAmount(postfix);
        //    },
        //}).dxValidator({
        //    validationGroup: "AccOpeningBal",
        //    validationRules: [{
        //        type: "required",
        //        message: "Exchange rate is required"
        //    }]
        //}).dxNumberBox("instance");

        AccOpeningBalview.variables.txtTotalAmountInRs = $("#txtTotalAmountInRs").dxNumberBox({
            readOnly: true,
        }).dxValidator({
            validationGroup: "AccOpeningBal",
            validationRules: []
        }).dxNumberBox("instance");

        AccOpeningBalview.variables.dx_btnSubmit = $("#dx_btnSubmit").dxButton({
            icon: "check",
            text: "Submit",
            type: "success",
            validationGroup: "AccOpeningBal",
            onClick: function (e) {
                var validation = DevExpress.validationEngine.validateGroup("AccOpeningBal");
                if (!validation.isValid) {
                    DevExVariables.Toaster("warning", "Please fill all required fields before submit.");
                    return;
                }

                AccOpeningBalview.btnMasterSubmit();
                AccOpeningBalview.variables.dx_dataGrid.refresh();
            }
        }).dxButton("instance");

        AccOpeningBalview.variables.dx_btnCancel = $("#dx_btnCancel").dxButton({
            icon: "close",
            text: "Cancel",
            type: "danger",
            validationGroup: "AccOpeningBal",
            onClick: function (e) {
                AccOpeningBalview.ClearValues();
            }
        }).dxButton("instance");

        AccOpeningBalview.variables.dx_btnAddNew = $("#dx_btnAddNew").dxButton({
            stylingMode: "outlined",
            icon: "plus",
            text: "Add New",
            type: "default",
            validationGroup: "AccOpeningBal",
            onClick: function (e) {
                AccOpeningBalview.AddNewLineDetails();
                $("#frm_AccountOpeningBalance").show();
                $("#pnlView").hide();
                AccOpeningBalview.variables.Masterid = "";

                AccOpeningBalview.variables.dx_txtaccname.focus();
            }
        }).dxButton("instance");
    },

    ClearValues: function () {
        AccOpeningBalview.variables.Masterid = "";
        AccOpeningBalview.variables.Oper = 'Add';
        AccOpeningBalview.variables.addedit = "added";
        AccOpeningBalview.variables.DeleteDataObj = "";
        DevExpress.validationEngine.resetGroup("AccOpeningBal");

        //AccOpeningBalview.variables.dx_txtVoucherDate.option({ value: new Date() });
        //AccOpeningBalview.variables.dx_txtDueDays.option({ value: 0 });
        AccOpeningBalview.variables.dx_txtRemarks.option({ value: "" });
        AccOpeningBalview.variables.dx_VchrNo.option({ value: "" });
        AccOpeningBalview.variables.DetailsControlsList = [],
        AccOpeningBalview.variables.RowCount = 1;
        $("#tbl_DesignDetails tbody").html("");

        $("#spanCashBankCurr").html("");
        $('#frm_AccountOpeningBalance').hide();
        $('#pnlView').show();
        AccOpeningBalview.variables.dx_dataGrid.refresh();

    },

    initializeDevExgrid: function () {
        AccOpeningBalview.variables.dx_dataGrid = $("#dx_dataGrid").dxDataGrid({
            dataSource: new DevExpress.data.CustomStore({
                key: "op_id",
                load: function (loadOptions) {
                    var deferred = $.Deferred();

                    var result = DevExVariables.GetDataList(loadOptions, AccOpeningBalview.variables.BindGroupListUrl);

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
            columns: [{ dataField: "op_id", allowFiltering: false, allowSorting: true, sortIndex: 1, sortOrder: "desc", visible: false },
                { dataField: "accountname", caption: "Account Name", dataType: "string", filterOperations: ["contains"], allowSorting: true, allowFiltering: true, allowHeaderFiltering: false },
                  //{
                  //    dataField: "balancetype", caption: "Balance Type", dataType: "string", alignment: "center", filterOperations: ["contains"],
                  //    allowSorting: false, allowFiltering: false, allowHeaderFiltering: true,
                  //    headerFilter: {
                  //        dataSource: [{
                  //            text: "Credit",
                  //            value: ["isactive", "equals", "Credit"]
                  //        }, {

                  //            text: "Debit",
                  //            value: ["isactive", "equals", "Debit"]
                  //        }]
                  //    },
                  //},
                { dataField: "voucherno", caption: "Voucher No", dataType: "string", filterOperations: ["contains"], allowSorting: true, allowFiltering: false, allowHeaderFiltering: false },
                { dataField: "amount", caption: "Amount", dataType: "string", filterOperations: ["contains"], allowSorting: true, allowFiltering: false, allowHeaderFiltering: false },
                //{ dataField: "voucherdate", caption: "Voucher Date", dataType: "string", filterOperations: ["contains"], allowSorting: true, allowFiltering: false, allowHeaderFiltering: false },
                //{ dataField: "duedays", caption: "Due Days", dataType: "string", filterOperations: ["contains"], allowSorting: true, allowFiltering: false, allowHeaderFiltering: false },
                //{ dataField: "exchangerate", caption: "Exchange Rate", dataType: "string", filterOperations: ["contains"], allowSorting: true, allowFiltering: true, allowHeaderFiltering: false },
                { dataField: "currencycode", caption: "Currency Code", dataType: "string", filterOperations: ["contains"], allowSorting: true, allowFiltering: true, allowHeaderFiltering: false },
                { dataField: "remarks", caption
                    : "Remarks", dataType: "string", filterOperations: ["contains"], allowSorting: true, allowFiltering: false, allowHeaderFiltering: false },
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
                                      AccOpeningBalview.EditFromGrid(data.value, options.key, 'Verify');
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
                        DevExVariables.ActionTemplate(container, options, true, true, "AccOpeningBalview");
                    }
                },
            ]
        }).dxDataGrid("instance");
    },

    btnMasterSubmit: function () {
        AccOpeningBalview.variables.Oper = 'Add';
        AccOpeningBalview.variables.addedit = "added";

        if (AccOpeningBalview.variables.Masterid != "0" && parseInt(AccOpeningBalview.variables.Masterid) > 0) {
            AccOpeningBalview.variables.Oper = 'Edit';
            AccOpeningBalview.variables.addedit = 'updated';
        }

        var xmlNodeList = '<DETAILSLIST>';
        $.each(AccOpeningBalview.variables.DetailsControlsList, function (key, obj) {
            if (obj) {

                if (obj.dx_billDate.option().value)
                        xmlNodeList += '<DETAILS>';
                        xmlNodeList += '<SRNO>' + obj.srno + '</SRNO>';
                        xmlNodeList += '<BILLDATE>' + obj.dx_billDate.option().text + '</BILLDATE>';

                if (obj.dx_billno.option().value)
                        xmlNodeList += '<BILLNO>' + obj.dx_billno.option().value + '</BILLNO>';

                if (obj.dx_billtype.option().value)
                        xmlNodeList += '<BILLTYPE>' + obj.dx_billtype.option().value + '</BILLTYPE>';

                if (obj.dx_duedays.option().value)
                    xmlNodeList += '<DUEDAYS>' + obj.dx_duedays.option().value + '</DUEDAYS>';

                if (obj.dx_ddlBroker.option().value)
                    xmlNodeList += '<BROKERID>' + obj.dx_ddlBroker.option().value + '</BROKERID>';

                if (obj.dx_amount.option().value)
                    xmlNodeList += '<AMOUNT>' + obj.dx_amount.option().value + '</AMOUNT>';

                if (obj.dx_exrate.option().value)
                    xmlNodeList += '<EXCHANGERATE>' + obj.dx_exrate.option().value + '</EXCHANGERATE>';

                if (obj.dx_amountinrs.option().value)
                    xmlNodeList += '<AMOUNTINRS>' + obj.dx_amountinrs.option().value + '</AMOUNTINRS>';

                if (obj.dx_txtRemarks1.option().value)
                    xmlNodeList += '<REMARKS>' + obj.dx_txtRemarks1.option().value + '</REMARKS>';

                    xmlNodeList += '</DETAILS>';
                }
            
        });

            xmlNodeList += '</DETAILSLIST>';

        AccOpeningBalview.variables.dx_btnSubmit.option({ disabled: true });

        var data = {
            "OP_ID": AccOpeningBalview.variables.Masterid,
            "ACCID": AccOpeningBalview.variables.dx_txtaccname.option().selectedItem.accid,
            "AMOUNT": AccOpeningBalview.variables.dx_txtAmount.option().value,
            "AMOUNTINRS": AccOpeningBalview.variables.txtTotalAmountInRs.option().value,
            //"BALANCETYPE": AccOpeningBalview.variables.dx_ddlbaltype.option().value,
            //"VOUCHERDATE": AccOpeningBalview.variables.dx_txtVoucherDate.option().text,
            //"DUEDAYS": AccOpeningBalview.variables.dx_txtDueDays.option().value,
            "CURRENCYID": AccOpeningBalview.variables.dx_txtaccname.option().selectedItem.currencyid,
            //"TOTALAMTINRS": (AccOpeningBalview.variables.dx_txtAmount.option().value * AccOpeningBalview.variables.dx_txtExchangeRate.option().value).toFixed(2),
            //"EXCHANGERATE": AccOpeningBalview.variables.dx_txtExchangeRate.option().value,
            XMLPARAM: escape(xmlNodeList),
            "oper": AccOpeningBalview.variables.Oper,
        }

        if (AccOpeningBalview.variables.dx_txtRemarks.option().value)
            data.REMARKS = AccOpeningBalview.variables.dx_txtRemarks.option().value;

        //if (AccOpeningBalview.variables.dx_ddlBroker.option().value)
        //    data.BROKERID = AccOpeningBalview.variables.dx_ddlBroker.option().value;

        AccOpeningBalview.savedata(data);
    },

    savedata: function (data) {
        $.ajax({
            url: getDomain() + AccOpeningBalview.variables.PerformMasterOperationUrl,
            data: data,
            async: true,
            cache: false,
            type: 'POST',
            beforeSend: function () {
                dx_LoaderTrinity.show();
            },
            complete: function () {
                dx_LoaderTrinity.hide();
                AccOpeningBalview.variables.dx_btnSubmit.option({ disabled: false });
                AccOpeningBalview.variables.dx_dataGrid.refresh();
            },
            success: AccOpeningBalview.btnMasterSubmitOnSuccess,
            error: OnError,
        });
    },

    btnMasterSubmitOnSuccess: function (data) {
        if ($(data).find('RESPONSECODE').text() == "0") {
            DevExVariables.Toaster("success", 'Record is ' + AccOpeningBalview.variables.addedit + ' successfully');
            $('#frm_AccountOpeningBalance').hide();
            $('#pnlView').show();
            if (AccOpeningBalview.variables.dx_popupRecordDelete)
                AccOpeningBalview.variables.dx_popupRecordDelete.hide();

            AccOpeningBalview.ClearValues();
        }
        else {
            DevExVariables.InvalidResponseCode(data);
        }
    },

    deleteRow: function (id) {
        var rowData = AccOpeningBalview.variables.dx_dataGrid.getVisibleRows()[AccOpeningBalview.variables.dx_dataGrid.getRowIndexByKey(+id)].data;
        AccOpeningBalview.variables.Masterid = id;
        AccOpeningBalview.variables.DeleteDataObj = rowData;
        AccOpeningBalview.variables.Oper = "Delete";

        if (AccOpeningBalview.variables.dx_popupRecordDelete) {
            AccOpeningBalview.variables.dx_popupRecordDelete.option("contentTemplate", AccOpeningBalview.variables.DeletePopUpOptions.contentTemplate(AccOpeningBalview.variables.DeleteDataObj).bind(this));
        }
        else {
            AccOpeningBalview.variables.dx_popupRecordDelete = $("#dx_popupRecordDelete").dxPopup(AccOpeningBalview.variables.DeletePopUpOptions).dxPopup("instance");
        }

        AccOpeningBalview.variables.dx_popupRecordDelete.show();
    },

    triggerId: function (id) {
        var rowData = AccOpeningBalview.variables.dx_dataGrid.getVisibleRows()[AccOpeningBalview.variables.dx_dataGrid.getRowIndexByKey(+id)].data;
        AccOpeningBalview.variables.Masterid = id;
        AccOpeningBalview.variables.dx_txtaccname.option({
            items: [{ accid: rowData.accid, accountname: rowData.accountname, currencycode: rowData.currencycode, currencyid: rowData.currencyid, creditdays: rowData.duedays }],
            selectedItem: { accid: rowData.accid, accountname: rowData.accountname, currencycode: rowData.currencycode, currencyid: rowData.currencyid, creditdays: rowData.duedays},
            value: rowData.accountname
        });
        $("#spanCashBankCurr").html(AccOpeningBalview.variables.dx_txtaccname.option().selectedItem.currencycode);
        AccOpeningBalview.variables.dx_txtAmount.option({ value: rowData.amount });
        AccOpeningBalview.variables.txtTotalAmountInRs.option({ value: rowData.amountinrs });
        //AccOpeningBalview.variables.dx_ddlbaltype.option({ value: rowData.balancetype });
        AccOpeningBalview.variables.dx_txtRemarks.option({ value: rowData.remarks });
        //AccOpeningBalview.variables.dx_ddlBroker.option({ value: rowData.brokerid });
        //AccOpeningBalview.variables.dx_txtVoucherDate.option({ value: rowData.voucherdate });
        //AccOpeningBalview.variables.dx_txtDueDays.option({ value: rowData.duedays });
        //AccOpeningBalview.variables.dx_txtExchangeRate.option({ value: rowData.exchangerate });
        AccOpeningBalview.variables.dx_VchrNo.option({ value: rowData.voucherno });

        //---------------------------------------------Get OpeningBalance Details----------------------------------------------------

        var myfilter = { rules: [] };
        myfilter.rules.push({ field: "OP_ID", op: "eq", data: id });
        $.ajax({
            url: getDomain() + "/Common/BindMastersDetails?ServiceName=ACC_ACCOUNTOPENINGBALANCE_DETAILS_GET&myfilters=" + JSON.stringify(myfilter),
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
                        $.each(List, function (key, obj) {
                            AccOpeningBalview.AddNewLineDetails(obj);
                        });
                      
                    }
                }
                else {
                    DevExVariables.InvalidResponseCode(data);
                }
            },
            error: OnError
        });
        //---------------------------------------------/Get OpeningBalance Details----------------------------------------------------

        $("#frm_AccountOpeningBalance").show();
        $("#pnlView").hide();

        AccOpeningBalview.TotalAmount();

        if (isU()) {
            AccOpeningBalview.variables.dx_btnSubmit.option({ visible: true });
        }
        else {
            AccOpeningBalview.variables.dx_btnSubmit.option({ visible: false });
        }
    },
    
    GetBrokerAndCourierList: function () {
        var myfilter = { rules: [] };
        myfilter.rules.push({ field: "ISACTIVE", op: "eq", data: true });
        myfilter.rules.push({ field: "SUBHEAD", op: "eq", data: "Broker" });
        $.ajax({
            url: getDomain() + AccOpeningBalview.variables.BindAccListUrl + "&ColumnRequested=ACCID,ACCOUNTNAME,PARTYCODE,SUBHEAD&myfilters=" + JSON.stringify(myfilter),
            async: true,
            cache: false,
            type: 'POST',
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    var JsonObject = xml2json.parser(data);
                    if (JsonObject.serviceresponse.detailslist) {
                        var List = [];
                        if (JsonObject.serviceresponse.detailslist.details.length) {
                            AccOpeningBalview.variables.ItemList = JsonObject.serviceresponse.detailslist.details;
                        }
                        else {
                            AccOpeningBalview.variables.ItemList.push(JsonObject.serviceresponse.detailslist.details);
                        }
                    }
                }

                //        AccOpeningBalview.variables.DetailsControlsList[postfix].dx_ddlBroker.option({
                //            dataSource: new DevExpress.data.ArrayStore({
                //                data: List,
                //                key: "accid"
                //            }),
                //            displayExpr: "accountname",
                //            valueExpr: "accid"
                //        });
                //    }
                //}
                else {
                    DevExVariables.InvalidResponseCode(data);
                }
            },
            error: OnError
        });
    },

    CalcAmount: function (postfix) {
      
        var Amt = 0, Amtrs = 0, Exrate = 0, PlusAmt = 0,MinAmt = 0;
        
        Amt = +AccOpeningBalview.variables.DetailsControlsList[postfix].dx_amount.option().value;
        Exrate = +AccOpeningBalview.variables.DetailsControlsList[postfix].dx_exrate.option().value;

        Amtrs = Amt * Exrate

        AccOpeningBalview.variables.DetailsControlsList[postfix].dx_amountinrs.option({ value: (Amtrs.toFixed(2)) });
        AccOpeningBalview.TotalAmount();
    },

    TotalAmount: function () {

        var TotalAmt = 0, PlusAmt = 0, MinAmt = 0;

        $.each(AccOpeningBalview.variables.DetailsControlsList, function (key, obj) {
            if (obj) {
                if (obj.dx_billtype.option().value == 'Credit')
                    PlusAmt += +obj.dx_amountinrs.option().value;
                else
                    MinAmt += +obj.dx_amountinrs.option().value;
            }
        });

        TotalAmt = PlusAmt - MinAmt;

        AccOpeningBalview.variables.txtTotalAmountInRs.option({ value: (TotalAmt.toFixed(2)) });
        AccOpeningBalview.variables.dx_txtAmount.option({ value: (TotalAmt.toFixed(2)) });
    },

    EditFromGrid: function (val, id, type) {
        var data = {
            "OP_ID": id,
            "OPER_TYPE": "EditFromGrid",
            "oper": "Edit"
        }
        if (type == "Verify")
            data.ISVERIFY = val;
        $.ajax({
            url: getDomain() + AccOpeningBalview.variables.PerformMasterOperationUrl,
            data: data,
            async: true,
            cache: false,
            type: 'POST',
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    DevExVariables.Toaster("success", 'Record is updated successfully.');
                    AccOpeningBalview.variables.dx_dataGrid.refresh();
                }
            },
            error: OnError,
        });
    },

    AddNewLineDetails: function (obj) {
        var postfix = AccOpeningBalview.variables.RowCount;

        $("#OpeningBalanceTBody").append(
                '<tr rowno="' + postfix + '">'
                    + '<td class="TableRowNo"></td>'
                    + '<td>'
                        + '<div id="dx_billDate' + postfix + '" ></div>'
                    + '</td>'
                    + '<td>'
                        + '<div id="dx_billno' + postfix + '" ></div>'
                    + '</td>'
                    + '<td>'
                        + '<div id="dx_billtype' + postfix + '" ></div>'
                    + '</td>'
                    + '<td>'
                        + '<div id="dx_duedays' + postfix + '" ></div>'
                    + '</td>'
                    + '<td>'
                    + '<div id="dx_ddlBroker' + postfix + '" ></div>'
                    + '</td>'
                     + '<td>'
                       + '<div id="dx_amount' + postfix + '" ></div>'
                    + '</td>'
                    + '<td>'
                        + '<div id="dx_exrate' + postfix + '" ></div>'
                    + '</td>'
                      + '<td>'
                       + '<div id="dx_amountinrs' + postfix + '" ></div>'
                    + '</td>'
                      + '<td>'
                       + '<div id="dx_txtRemarks1' + postfix + '" ></div>'
                    + '</td>'
                    + '<td class="text-center">'
                        + '<span class="btn btn-danger" onClick="AccOpeningBalview.RemoveDetailRow(this)"><i class="fa fa-trash-o"></i></span>'
                    + '</td>'
                + '</tr>'
            );

        /*----------------------Registration of Detail table controls---------------------*/
        AccOpeningBalview.DetailTableFormInit(postfix, obj);
        /*----------------------Registration of Detail table controls---------------------*/

        AccOpeningBalview.variables.RowCount = postfix + 1
    },

    DetailTableFormInit: function (postfix, obj) {
        /*----------------------Registration of Detail table controls---------------------*/
        var tmp = [];
        tmp[postfix] = { srno: postfix, dx_billno: "", dx_billtype: "", dx_billDate: "", dx_duedays: "", dx_exrate: "", dx_amount: "", dx_amountinrs: "", dx_ddlBroker: "", dx_txtRemarks1 :""};

        AccOpeningBalview.variables.DetailsControlsList = Object.assign(AccOpeningBalview.variables.DetailsControlsList, tmp);

        AccOpeningBalview.variables.DetailsControlsList[postfix].dx_billDate = $("#dx_billDate" + postfix).dxDateBox({
            type: "date",
            //value: now,
            showClearButton: true,
            useMaskBehavior: true,
            displayFormat: "dd MMM yyyy"
        }).dxValidator({
            validationGroup: "AccOpeningBal",
            validationRules: [{
                type: "required",
                message: "Bill Date is required"
            }]
        }).dxDateBox("instance");

        AccOpeningBalview.variables.DetailsControlsList[postfix].dx_billno = $("#dx_billno" + postfix).dxTextBox({
            mode: "number",
        }).dxValidator({
            validationGroup: "AccOpeningBal",
            validationRules: [{
                type: "required",
                message: "Bill No is required"
            }]
        }).dxTextBox("instance");

        AccOpeningBalview.variables.DetailsControlsList[postfix].dx_billtype = $("#dx_billtype" + postfix).dxSelectBox({
            dataSource: ['Credit', 'Debit'],
            placeholder: "Select Bill Type...",
            onFocusOut: function (data) {
                AccOpeningBalview.CalcAmount(postfix);
            },
        }).dxValidator({
            validationGroup: "AccOpeningBal",
            validationRules: [{
                type: "required",
                message: "Bill Type is required"
            }]
        }).dxSelectBox("instance");

        AccOpeningBalview.variables.DetailsControlsList[postfix].dx_exrate = $("#dx_exrate" + postfix).dxTextBox({
            mode: "number",
            onFocusOut: function (data) {
                AccOpeningBalview.CalcAmount(postfix);
            },
        }).dxValidator({
            validationGroup: "AccOpeningBal",
            validationRules: [{
                type: "required",
                message: "Ex Rate is required"
            }]
        }).dxTextBox("instance");

        AccOpeningBalview.variables.DetailsControlsList[postfix].dx_duedays = $("#dx_duedays" + postfix).dxTextBox({
            mode: "number",
        }).dxValidator({
            validationGroup: "AccOpeningBal",
            validationRules: [{
                type: "required",
                message: "Due Days is required"
            }]
        }).dxTextBox("instance");

        AccOpeningBalview.variables.DetailsControlsList[postfix].dx_amount = $("#dx_amount" + postfix).dxTextBox({
            mode: "number",
            onFocusOut: function (data) {
                AccOpeningBalview.CalcAmount(postfix);
            },
        }).dxValidator({
            validationGroup: "AccOpeningBal",
            validationRules: [{
                type: "required",
                message: "Amount is required"
            }]
        }).dxTextBox("instance");

        AccOpeningBalview.variables.DetailsControlsList[postfix].dx_amountinrs = $("#dx_amountinrs" + postfix).dxTextBox({
            readOnly: true,
        }).dxValidator({
            validationGroup: "AccOpeningBal",
            validationRules: []
        }).dxTextBox("instance");

        AccOpeningBalview.variables.DetailsControlsList[postfix].dx_ddlBroker = $("#dx_ddlBroker" + postfix ).dxSelectBox({
            placeholder: "Select Broker Name...",
            dataSource: AccOpeningBalview.variables.ItemList,
            displayExpr: "accountname",
            valueExpr: "accid",
            searchEnabled: true,
        }).dxValidator({
            validationGroup: "AccOpeningBal",
            validationRules: [{
                type: "required",
        message: "Broker Name is required",
            }]
        }).dxSelectBox("instance");

        AccOpeningBalview.variables.DetailsControlsList[postfix].dx_txtRemarks1 = $("#dx_txtRemarks1" + postfix).dxTextBox({
        }).dxTextBox("instance");

        /*----------------------Registration of Detail table controls---------------------*/

        /*----------------------Set Value of Detail table controls while Edit---------------------*/
        if (obj) {
            AccOpeningBalview.variables.DetailsControlsList[postfix].dx_billDate.option({ value: obj.billdate })
            AccOpeningBalview.variables.DetailsControlsList[postfix].dx_billno.option({ value: obj.billno })
            AccOpeningBalview.variables.DetailsControlsList[postfix].dx_billtype.option({ value: obj.billtype });
            AccOpeningBalview.variables.DetailsControlsList[postfix].dx_duedays.option({ value: obj.duedays });
            AccOpeningBalview.variables.DetailsControlsList[postfix].dx_ddlBroker.option({ value: obj.brokerid });
            AccOpeningBalview.variables.DetailsControlsList[postfix].dx_amount.option({ value: obj.amount });
            AccOpeningBalview.variables.DetailsControlsList[postfix].dx_exrate.option({ value: obj.exchangerate });
            AccOpeningBalview.variables.DetailsControlsList[postfix].dx_amountinrs.option({ value: obj.amountinrs });
        }
        /*----------------------Set Value of Detail table controls while Edit---------------------*/

    },

    RemoveDetailRow: function (obj) {
        delete AccOpeningBalview.variables.DetailsControlsList[$(obj).closest("tr").attr("rowno")];
        $(obj).closest("tr").remove();

        //AccOpeningBalview.CalcAmount($(obj).closest("tr").attr("rowno"));
        AccOpeningBalview.TotalAmount();
    },

}

$(document).ready(function () {
    AccOpeningBalview.FormInitialize();
    AccOpeningBalview.initializeDevExgrid();
    AccOpeningBalview.GetBrokerAndCourierList();
    $("#lnk_AddNewRow").click(function () {
        AccOpeningBalview.AddNewLineDetails();
    });
}); 