var SalePurchaseview = {
    variables: {
        BindStaticDataUrl: "/Common/BindMastersDetails?ServiceName=STATIC_MASTER_GET&IsActive=true",
        BindAccountbalancelist: "/Common/BindMastersDetails?ServiceName=ACC_BALANCE_GET",
        BindAccListUrl: "/Common/BindMastersDetails?ServiceName=ACCOUNTMASTER_GET",
        BindMainGridListUrl: "/Common/BindMastersDetails?ServiceName=ACC_SALEPURCHASEJV_GET",
        BindTableGridListUrl: "/Common/BindMastersDetails?ServiceName=ACC_SALEPURCHASEJV_DETAIL_GET",
        PerformMasterOperationUrl: "/Common/OpeartionsOnMaster?ServiceName=ACC_SALEPURCHASEJV_CRUD",
        BindTaxProfile: "/Common/BindMastersDetails?ServiceName=ACC_TAXPROFILE_GET",
        BindPendingvchr: "/Common/BindMastersDetails?ServiceName=ACC_PENDING_VOUCHER_GET",

        GlobalTotal: [],
        DetailsControlsList: [],

        dx_txtRemarks: '',

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
                    $("<p>Voucher No: <span>" + SalePurchaseview.variables.DeleteDataObj.voucherno + "</span></p>"
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
                            "JV_ID": SalePurchaseview.variables.Masterid,
                            "oper": SalePurchaseview.variables.Oper,
                        }
                        SalePurchaseview.savedata(data);
                        SalePurchaseview.variables.dx_popupRecordDelete.hide();
                    },
                }
            }],
            showTitle: true,
            title: "Delete Record?",
            visible: false,
            dragEnabled: false,
            closeOnOutsideClick: true
        },

        dx_btnSubmit: "",
        dx_btnCancel: "",

        /*------------------------variables for main form Controls-----------------------*/

    },

    initializeDevExgrid: function () {
        SalePurchaseview.variables.dx_dataGrid = $("#dx_dataGrid").dxDataGrid({
            dataSource: new DevExpress.data.CustomStore({
                key: "jv_id",
                load: function (loadOptions) {
                    var deferred = $.Deferred();

                    var myfilter = { rules: [] };
                    myfilter.rules.push({ field: "SubBookType", op: "eq", data: "MATERIAL" });

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
                        url: getDomain() + SalePurchaseview.variables.BindMainGridListUrl + "&" + parameters.join("&") + "&myfilters=" + JSON.stringify(myfilter),
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
            columns: [{ dataField: "jv_id", allowFiltering: false, allowSorting: true, sortIndex: 1, sortOrder: "desc", visible: false },
                { dataField: "voucherno", caption: "Voucher No", dataType: "string", filterOperations: ["contains"], allowSorting: true, allowFiltering: true, allowHeaderFiltering: false },
                { dataField: "voucherdate", caption: "payment Date", dataType: "string", filterOperations: ["contains"], allowSorting: true, allowFiltering: true, allowHeaderFiltering: false },
                { dataField: "accountname", caption: "Party Name", dataType: "string", filterOperations: ["contains"], allowSorting: true, allowFiltering: true, allowHeaderFiltering: false },
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
                                    SalePurchaseview.EditFromGrid(data.value, options.key, 'Verify');
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
                        DevExVariables.ActionTemplate(container, options, true, true, "SalePurchaseview");
                    }
                },
            ]
        }).dxDataGrid("instance");
    },

    FormInitialize: function () {

        //---------------------------------add new button ---------------------------------
        SalePurchaseview.variables.dx_btnAddNew = $("#dx_btnAddNew").dxButton({
            stylingMode: "outlined",
            icon: "plus",
            text: "Add New",
            type: "default",
            validationGroup: "SalePurchaseJV",
            onClick: function (e) {

                $("#frm_SalePurchaseJV").show();
                $("#pnlView").hide();
                SalePurchaseview.variables.Masterid = "";
            }
        }).dxButton("instance");

        //------------------------------- Start bottom left contanct--------------------------------------

        SalePurchaseview.variables.dx_txtRemarks = $("#dx_txtRemarks").dxTextArea({
            height: 110,
            placeholder: "Enter Remark"

        }).dxTextArea("instance");

        //------------------------------- End bottom left contanct--------------------------------------

        SalePurchaseview.variables.dx_btnSubmit = $("#dx_btnSubmit").dxButton({
            icon: "check",
            text: "Submit",
            type: "success",
            onClick: function (e) {
                var validation = DevExpress.validationEngine.validateGroup("SalePurchaseJV");
                if (!validation.isValid) {
                    DevExVariables.Toaster("warning", "Please fill all required fields before submit.");
                    return;
                }
                SalePurchaseview.btnMasterSubmit();
            }
        }).dxButton("instance");

        //--------------------------------------- Cancle button---------------------------------------

        SalePurchaseview.variables.dx_btnCancel = $("#dx_btnCancel").dxButton({
            icon: "close",
            text: "Cancel",
            type: "danger",
            onClick: function (e) {
                SalePurchaseview.ClearValues();
            }
        }).dxButton("instance");

        //-----------------------------start top left controls---------------------------------
        SalePurchaseview.variables.dx_ddlSubBookMaster = $("#dx_ddlSubBookMaster").dxSelectBox({
            placeholder: "Select Sub Book...",
            searchEnabled: true,
            onItemClick: function () {
                SalePurchaseview.variables.txtTotalBillAmount.option("value", "");
                SalePurchaseview.variables.txtPandingAmount.option("value", "");
                $("#dx_FooterTotalBillAmt").html("");
                $("#dx_FooterTotalPaidAmt").html("");
                $("#dx_FooterTotalPandingAmt").html("");
                $("#dx_FooterTotalAmount").html("");
                $("#dx_FooterTotalKasar").html("");
                SalePurchaseview.GetPendingVoucherList();
            }
        }).dxValidator({
            validationGroup: "SalePurchaseview",
            validationRules: [{
                type: "required",
                message: "Sub Book is required"
            }]
        }).dxSelectBox("instance");

        SalePurchaseview.variables.dx_txtPaymentDate = $("#dx_txtPaymentDate").dxDateBox({
            type: "date",
            value: new Date(),
            showClearButton: true,
            useMaskBehavior: true,
            displayFormat: "dd MMM yyyy",
        }).dxDateBox("instance");

        SalePurchaseview.variables.dx_txtPartyName = $("#dx_txtPartyName").dxAutocomplete({
            placeholder: "Select Party...",
            mode: "search",
            dataSource: new DevExpress.data.CustomStore({
                load: function (loadOptions) {
                    var deferred = $.Deferred();

                    var myfilter = { rules: [] };
                    myfilter.rules.push({ field: "GROUPNAME", op: "eq", data: "Creditors/Debitors" });

                    $.ajax({
                        url: getDomain() + SalePurchaseview.variables.BindAccListUrl + "&_search=true&searchField=ACCOUNTNAME&searchOper=cn&searchString=" + loadOptions.searchValue + "&myfilters=" + JSON.stringify(myfilter),
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
                    SalePurchaseview.BindAccountReceiveBalance();
                    SalePurchaseview.GetPendingVoucherList();
                    if ($('#tbl_DesignDetails tbody').find('tr').length == 0) {
                        SalePurchaseview.variables.txtTotalBillAmount.option("value", 0);
                        SalePurchaseview.variables.txtPandingAmount.option("value", 0);
                        SalePurchaseview.variables.txtPaidAmount.option("value", 0);
                        SalePurchaseview.variables.txtPayingAmount.option({ value: SalePurchaseview.variables.dx_txtamt.option().value });
                        SalePurchaseview.variables.txtRemainingAmount.option({ value: (SalePurchaseview.variables.txtPandingAmount.option().value - SalePurchaseview.variables.txtPayingAmount.option().value).toFixed(2) });
                        $("#dx_FooterTotalBillAmt").html("");
                        $("#dx_FooterTotalPaidAmt").html("");
                        $("#dx_FooterTotalPandingAmt").html("");
                        $("#dx_FooterTotalAmount").html("");
                        $("#dx_FooterTotalKasar").html("");
                    };
                    if (e.component.option().selectedItem) {
                        SalePurchaseview.variables.dx_txtPartyName.option().selectedItem.accid;
                        SalePurchaseview.variables.dx_txtExchangeRate.option({ value: e.component.option().selectedItem.exchangerate });
                        $("#spanCashBankCurr").html(e.component.option().selectedItem.currencycode);
                    }
                    else {
                        $("#spanCashBankCurr").html('');
                        SalePurchaseview.variables.dx_txtExchangeRate.option("value", "");
                        SalePurchaseview.variables.dx_txtPartyName = "";
                    }
                }
            },
            itemTemplate: function (data) {
                return $("<div class='product-name'>" + "(" + data.partycode + ")&nbsp;" + data.accountname + "</div>");
            },
        }).dxValidator({
            validationGroup: "SalePurchaseJV",
            validationRules: [{
                type: "required",
                message: "Party Name is required"
            }]
        }).dxAutocomplete("instance");

        SalePurchaseview.variables.dx_txtamt = $("#dx_txtamt").dxTextBox({
            mode: "text",
            placeholder: "Enter Amount...",
            onFocusOut: function (data) {
                if ($('#tbl_DesignDetails tbody').find('tr').length == 0) {
                    SalePurchaseview.variables.txtPayingAmount.option({ value: SalePurchaseview.variables.dx_txtamt.option().value });
                    SalePurchaseview.variables.txtRemainingAmount.option({ value: (SalePurchaseview.variables.txtPandingAmount.option().value - SalePurchaseview.variables.txtPayingAmount.option().value).toFixed(2) });
                };

                var TotalAmountInRs = 0;
                TotalAmountInRs += +SalePurchaseview.variables.dx_txtamt.option().value * SalePurchaseview.variables.dx_txtExchangeRate.option().value;
                SalePurchaseview.variables.txtTotalAmountInRs.option({ value: (TotalAmountInRs.toFixed(2)) });
            },
        }).dxValidator({
            validationGroup: "SalePurchaseJV",
            validationRules: [{
                type: "required",
                message: "Amount is required"
            }]
        }).dxTextBox("instance");

        SalePurchaseview.variables.dx_VchrNo = $("#dx_VchrNo").dxTextBox({
            readOnly: true,
        }).dxValidator({
            validationGroup: "SalePurchaseJV",
            validationRules: []
        }).dxTextBox("instance");

        SalePurchaseview.variables.dx_txtExchangeRate = $("#dx_txtExchangeRate").dxNumberBox({
            value: 1,
            min: 1,
            onFocusOut: function (data) {
                var TotalAmountInRs = 0;
                TotalAmountInRs += +SalePurchaseview.variables.dx_txtamt.option().value * SalePurchaseview.variables.dx_txtExchangeRate.option().value;
                SalePurchaseview.variables.txtTotalAmountInRs.option({ value: (TotalAmountInRs.toFixed(2)) });
            },
        }).dxValidator({
            validationGroup: "SalePurchaseJV",
            validationRules: [{
                type: "required",
                message: "Exchange rate is required"
            }]
        }).dxNumberBox("instance");

        SalePurchaseview.variables.txtTotalAmountInRs = $("#txtTotalAmountInRs").dxNumberBox({
            readOnly: true,
        }).dxValidator({
            validationGroup: "SalePurchaseJV",
            validationRules: []
        }).dxNumberBox("instance");

        //------------------------------- Start bottom Right contanct--------------------------------------

        SalePurchaseview.variables.txtTotalBillAmount = $("#txtTotalBillAmount").dxTextBox({
            readOnly: true,
            inputAttr: {
                class: "text-right"
            },
        }).dxTextBox("instance");

        SalePurchaseview.variables.txtPandingAmount = $("#txtPandingAmount").dxTextBox({
            readOnly: true,
            inputAttr: {
                class: "text-right"
            },
        }).dxTextBox("instance");

        SalePurchaseview.variables.txtPaidAmount = $("#txtPaidAmount").dxTextBox({
            readOnly: true,
            inputAttr: {
                class: "text-right"
            },
        }).dxTextBox("instance");

        SalePurchaseview.variables.txtPayingAmount = $("#txtPayingAmount").dxTextBox({
            readOnly: true,
            inputAttr: {
                class: "text-right"
            },
            onChange: function (obj) {
                if (obj.value)
                    SalePurchaseview.variables.txtPayingAmount.option({ value: PayingAmount.toFixed(2) });
            }
        }).dxTextBox("instance");

        SalePurchaseview.variables.txtRemainingAmount = $("#txtRemainingAmount").dxTextBox({
            readOnly: true,
            inputAttr: {
                class: "text-right"
            },
            onChange: function (obj) {
                if (obj.value)
                    SalePurchaseview.variables.txtRemainingAmount.option({ value: RemainingAmount.toFixed(2) });
            }
        }).dxTextBox("instance");

        //------------------------------- End bottom Right contanct--------------------------------------

    },

    triggerId: function (id) {
        var rowData = SalePurchaseview.variables.dx_dataGrid.getVisibleRows()[SalePurchaseview.variables.dx_dataGrid.getRowIndexByKey(+id)].data;
        SalePurchaseview.variables.Masterid = id;

        $('.DiscType').prop('disabled', true);
        SalePurchaseview.variables.dx_txtPaymentDate.option({ value: rowData.voucherdate });
        SalePurchaseview.variables.dx_ddlSubBookMaster.option('disabled', true);
        SalePurchaseview.variables.dx_txtPartyName.option({
            items: [{ accid: rowData.accid, accountname: rowData.accountname, currencycode: rowData.currencycode, currencyid: rowData.currencyid }],
            selectedItem: { accid: rowData.accid, accountname: rowData.accountname, currencycode: rowData.currencycode, currencyid: rowData.currencyid },
            value: rowData.accountname
        });
        SalePurchaseview.BindAccountReceiveBalance();
        SalePurchaseview.variables.dx_ddlSubBookMaster.option({ value: rowData.sbookid });
        SalePurchaseview.variables.dx_VchrNo.option({ value: rowData.voucherno });
        SalePurchaseview.variables.dx_txtamt.option({ value: rowData.totalamt });
        $("#spanCashBankCurr").html(SalePurchaseview.variables.dx_txtPartyName.option().selectedItem.currencycode);
        SalePurchaseview.variables.dx_txtRemarks.option({ value: rowData.remark });
        SalePurchaseview.variables.txtTotalAmountInRs.option({ value: rowData.totalamtinrs });
        SalePurchaseview.variables.dx_txtExchangeRate.option({ value: rowData.exchangerate });
        SalePurchaseview.GetpaidAmount();

        if ($('#tbl_DesignDetails tbody').find('tr').length == 0) {
            SalePurchaseview.variables.txtTotalBillAmount.option("value", 0);
            SalePurchaseview.variables.txtPandingAmount.option("value", 0);
            SalePurchaseview.variables.txtPaidAmount.option("value", 0);
            SalePurchaseview.variables.txtPayingAmount.option({ value: SalePurchaseview.variables.dx_txtamt.option().value });
            SalePurchaseview.variables.txtRemainingAmount.option({ value: (SalePurchaseview.variables.txtPandingAmount.option().value - SalePurchaseview.variables.txtPayingAmount.option().value).toFixed(2) });
        };

        var myfilter = { rules: [] };
        myfilter.rules.push({ field: "JV_ID", op: "eq", data: id });
        $.ajax({
            url: getDomain() + "/Common/BindMastersDetails?ServiceName=ACC_SALEPURCHASEJV_DETAIL_GET&myfilters=" + JSON.stringify(myfilter),
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
                               + '<td class="Amt"><input type="text" class="form-control" style="text-align:right;" onFocusOut="SalePurchaseview.GetpaidAmount();" value="' + obj.paymentamt.toFixed(2) + '"></td>'
                               + '<td class="Kasar"><input type="number" style="text-align:right;" class="form-control" onFocusOut="SalePurchaseview.GetpaidAmount(); SalePurchaseview.WrongAmountToster();" value="' + (obj.kasar || 0).toFixed(2) + '"/></td>'
                            + '</tr>'
                             );
                            TotalBillAmt += obj.billamt;
                            TotalPaidAmt += obj.paidamt;
                            TotalPendingAmt += obj.pendingamount;
                        });
                        SalePurchaseview.variables.txtTotalBillAmount.option({ value: TotalBillAmt.toFixed(2) });
                        SalePurchaseview.variables.txtPaidAmount.option({ value: TotalPaidAmt.toFixed(2) });
                        SalePurchaseview.variables.txtPandingAmount.option({ value: TotalPendingAmt.toFixed(2) });

                        $("#dx_FooterTotalBillAmt").html(TotalBillAmt.toFixed(2));
                        $("#dx_FooterTotalPaidAmt").html(TotalPaidAmt.toFixed(2));
                        $("#dx_FooterTotalPandingAmt").html(TotalPendingAmt.toFixed(2));

                        SalePurchaseview.GetpaidAmount();
                    }
                }
                else {
                    DevExVariables.InvalidResponseCode(data);
                }
            },
            error: OnError
        });
        $("#frm_SalePurchaseJV").show();
        $("#pnlView").hide();
        if (isU()) {
            SalePurchaseview.variables.dx_btnSubmit.option({ visible: true });
        }
        else {
            SalePurchaseview.variables.dx_btnSubmit.option({ visible: false });
        }
    },

    BindSubBookList: function () {
        var myfilter = { rules: [] };
        myfilter.rules.push({ field: "TYPE", op: "eq", data: "AccSubBook" });
        myfilter.rules.push({ field: "SUBBOOKTYPE", op: "eq", data: "MATERIAL" });
        myfilter.rules.push({ field: "ONLYALLOWED", op: "eq", data: true });

        $.ajax({
            url: getDomain() + SalePurchaseview.variables.BindStaticDataUrl + "&myfilters=" + JSON.stringify(myfilter),
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

                        SalePurchaseview.variables.dx_ddlSubBookMaster.option({
                            dataSource: new DevExpress.data.ArrayStore({
                                data: List.filter(function (x) { return ["Journal Voucher Purchase", "Journal Voucher Sale"].indexOf(x.subbook) > -1 }),
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

    RemoveDetailRow: function (obj) {
        $(obj).closest("tr").remove();
        delete SalePurchaseview.variables.DetailsControlsList[$(obj).closest("tr").attr("rowno")];
    },

    ClearValues: function () {
        SalePurchaseview.variables.Masterid = "";
        SalePurchaseview.variables.Oper = 'Add';
        SalePurchaseview.variables.addedit = "added";
        SalePurchaseview.variables.DeleteDataObj = "";
        $('.DiscType').prop('disabled', false);
        SalePurchaseview.variables.dx_txtExchangeRate.option("value", "");
        SalePurchaseview.variables.txtTotalAmountInRs.option("value", "");
        SalePurchaseview.variables.dx_txtPaymentDate.option({ value: new Date() });
        SalePurchaseview.variables.dx_ddlSubBookMaster.option("value", "");
        SalePurchaseview.variables.dx_txtPartyName.option("value", "");
        SalePurchaseview.variables.dx_txtamt.option("value", "");
        SalePurchaseview.variables.dx_txtRemarks.option("value", "");
        SalePurchaseview.variables.txtTotalBillAmount.option("value", "");
        SalePurchaseview.variables.txtPandingAmount.option("value", "");
        SalePurchaseview.variables.txtPaidAmount.option("value", "");
        SalePurchaseview.variables.txtPayingAmount.option("value", "");
        SalePurchaseview.variables.txtRemainingAmount.option("value", "");
        SalePurchaseview.variables.dx_btnSubmit.option({ visible: true });
        $("#dx_FooterTotalBillAmt").html("");
        $("#dx_FooterTotalPaidAmt").html("");
        $("#dx_FooterTotalPandingAmt").html("");
        $("#dx_FooterTotalAmount").html("");
        $("#dx_FooterTotalKasar").html("");
        $("#spanCashBankCurr").html("");
        $("#spanCurrencyName").html("");
        DevExpress.validationEngine.resetGroup("SalePurchaseJV");
        $("#frm_SalePurchaseJV").hide();
        $("#pnlView").show();
        $("#tbl_DesignDetails tbody").html("");
        $("#btnAddSelectionRecieveList").html("0.00");

    },

    AddNewLineDetails: function (key, obj) {
        $("#tbl_DesignDetails tbody").append(

            '<tr rowno="' + key + '" TransactionId="' + obj.tran_id + '" + TransactionType="' + obj.transactiontype + '">'
                + '<td class="TableRowNo">' + (key + 1) + '</td>'
                + '<td class="vchrtype">' + obj.vouchertype + '</td>'
                + '<td class="travchrnno">' + obj.voucherno + '</td>'
                + '<td class="vchrdate">' + obj.voucherdate + '</td>'
                + '<td style="text-align:right;" class="BillAmt">' + obj.billamount.toFixed(2) + '</td>'
                + '<td style="text-align:right;" class="PaidAmount">' + obj.paidamt.toFixed(2) + '</td>'
                + '<td style="text-align:right;" class="PendingAmt">' + obj.pendingamount.toFixed(2) + '</td>'
                + '<td class="Amt"><input type="number" style="text-align:right;" class="form-control" onFocusOut="SalePurchaseview.GetpaidAmount(); SalePurchaseview.WrongAmountToster();" id="dx_numAmt' + key + '" value="0.00" /></td>'
                + '<td class="Kasar"><input type="number" style="text-align:right;" class="form-control" onFocusOut="SalePurchaseview.GetpaidAmount(); SalePurchaseview.WrongAmountToster();" id="dx_numAmt' + key + '" value="0.00" /></td>'
            + '</tr>'

        );
    },

    GetpaidAmount: function (key, obj) {
        var PayingAmount = 0, TotalAmt = 0, TotalKasar = 0, TotalPendingAmt = 0;
        $("#tbl_DesignDetails tbody tr").each(function (key, obj) {
            PayingAmount += +$(obj).find('.Amt input').val() + +$(obj).find('.Kasar input').val();
            TotalAmt += +$(obj).find('.Amt input').val()
            TotalKasar += +$(obj).find('.Kasar input').val();
            //TotalPendingAmt += +$(obj).find('.BillAmt input').val + +$(obj).find('.PaidAmount input').val();
        });
        SalePurchaseview.variables.txtPayingAmount.option({ value: PayingAmount.toFixed(2) });
        SalePurchaseview.variables.txtRemainingAmount.option({ value: (SalePurchaseview.variables.txtPandingAmount.option().value - PayingAmount).toFixed(2) });

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

    GetPendingVoucherList: function () {
        if (SalePurchaseview.variables.dx_txtPartyName.option().selectedItem){
        $("#tbl_DesignDetails tbody").html('');

        var myfilter = { rules: [] };
        myfilter.rules.push({ field: "ACCID", op: "eq", data: SalePurchaseview.variables.dx_txtPartyName.option().selectedItem.accid });

        if (SalePurchaseview.variables.dx_ddlSubBookMaster.option().text == "Journal Voucher Purchase") 
            myfilter.rules.push({ field: "PAYMENTTYPE", op: "eq", data: "PURCHASE" });
        else
            myfilter.rules.push({ field: "PAYMENTTYPE", op: "eq", data: "SALE" });

        $.ajax({
            url: getDomain() + SalePurchaseview.variables.BindPendingvchr + "&myfilters=" + JSON.stringify(myfilter),
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
                            SalePurchaseview.AddNewLineDetails(key, obj);

                            TotalBillAmt += obj.billamount;
                            TotalPaidAmt += obj.paidamt;
                            TotalPendingAmt += obj.pendingamount;
                        });

                        SalePurchaseview.variables.txtTotalBillAmount.option({ value: TotalBillAmt.toFixed(2) });
                        SalePurchaseview.variables.txtPaidAmount.option({ value: TotalPaidAmt.toFixed(2) });
                        SalePurchaseview.variables.txtPandingAmount.option({ value: TotalPendingAmt.toFixed(2) });

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

    btnMasterSubmit: function () {
        if (+SalePurchaseview.variables.dx_txtamt.option().value != +SalePurchaseview.variables.txtPayingAmount.option().value) {
            DevExVariables.Toaster("warning", "Amount should be same as billwise amount total.");
            return;
        }

        SalePurchaseview.variables.dx_btnSubmit.option({ disabled: true });

        SalePurchaseview.variables.Oper = 'Add';
        SalePurchaseview.variables.addedit = "added";
        if (SalePurchaseview.variables.Masterid != "0" && parseInt(SalePurchaseview.variables.Masterid) > 0) {
            SalePurchaseview.variables.Oper = 'Edit';
            SalePurchaseview.variables.addedit = 'updated';
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
            "JV_ID": SalePurchaseview.variables.Masterid,
            "SBOOKID": SalePurchaseview.variables.dx_ddlSubBookMaster.option().value,
            "VOUCHERDATE": SalePurchaseview.variables.dx_txtPaymentDate.option().text,
            "ACCID": SalePurchaseview.variables.dx_txtPartyName.option().selectedItem.accid,
            "CURRENCYID": SalePurchaseview.variables.dx_txtPartyName.option().selectedItem.currencyid,
            "EXCHANGERATE": SalePurchaseview.variables.dx_txtExchangeRate.option().value,
            "TOTALAMT": SalePurchaseview.variables.dx_txtamt.option().value,
            "FINALBILLAMOUNT": SalePurchaseview.variables.txtTotalBillAmount.option().value,
            "TOTALAMTINRS": SalePurchaseview.variables.txtTotalAmountInRs.option().value,
            "PANDINGAMOUNT": SalePurchaseview.variables.txtPandingAmount.option().value,
            "PAIDAMOUNT": SalePurchaseview.variables.txtPaidAmount.option().value,
            "PAYINGAMOUNT": SalePurchaseview.variables.txtPayingAmount.option().value,
            "REMAININGAMOUNT": SalePurchaseview.variables.txtRemainingAmount.option().value,
            XMLPARAM: escape(xmlNodeList),
            "oper": SalePurchaseview.variables.Oper,
        }

        if (SalePurchaseview.variables.dx_txtRemarks.option().value)
            data.REMARK = SalePurchaseview.variables.dx_txtRemarks.option().value;

        SalePurchaseview.savedata(data);

    },

    savedata: function (data) {
        $.ajax({
            url: getDomain() + SalePurchaseview.variables.PerformMasterOperationUrl,
            data: data,
            async: true,
            cache: false,
            type: 'POST',
            beforeSend: function () {
                dx_LoaderTrinity.show();
            },
            complete: function () {
                dx_LoaderTrinity.hide();
                SalePurchaseview.variables.dx_btnSubmit.option({ disabled: false });
            },
            success: SalePurchaseview.btnMasterSubmitOnSuccess,
            error: OnError,
        });
    },

    btnMasterSubmitOnSuccess: function (data) {
        if ($(data).find('RESPONSECODE').text() == "0") {
            DevExVariables.Toaster("success", 'Record is Added successfully.');
            $("#frm_SalePurchaseJV").hide();
            $("#pnlView").show();
            DevExpress.validationEngine.resetGroup("SalePurchaseJV");
            SalePurchaseview.ClearValues();
            SalePurchaseview.variables.dx_dataGrid.refresh();
        }
        else {
            DevExVariables.InvalidResponseCode(data);
        }
    },

    deleteRow: function (id) {
        var rowData = SalePurchaseview.variables.dx_dataGrid.getVisibleRows()[SalePurchaseview.variables.dx_dataGrid.getRowIndexByKey(+id)].data;
        SalePurchaseview.variables.Masterid = id;
        SalePurchaseview.variables.DeleteDataObj = rowData;
        SalePurchaseview.variables.Oper = "Delete";

        if (SalePurchaseview.variables.dx_popupRecordDelete) {
            SalePurchaseview.variables.dx_popupRecordDelete.option("contentTemplate", SalePurchaseview.variables.DeletePopUpOptions.contentTemplate(SalePurchaseview.variables.DeleteDataObj).bind(this));
        }
        else {
            SalePurchaseview.variables.dx_popupRecordDelete = $("#dx_popupRecordDelete").dxPopup(SalePurchaseview.variables.DeletePopUpOptions).dxPopup("instance");
        }

        SalePurchaseview.variables.dx_popupRecordDelete.show();
    },

    EditFromGrid: function (val, id, type) {
        var data = {
            "JV_ID": id,
            "OPER_TYPE": "EditFromGrid",
            "oper": "Edit"
        }
        if (type == "Verify")
            data.ISVERIFY = val;
        $.ajax({
            url: getDomain() + SalePurchaseview.variables.PerformMasterOperationUrl,
            data: data,
            async: true,
            cache: false,
            type: 'POST',
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    DevExVariables.Toaster("success", 'Record is updated successfully.');
                    SalePurchaseview.variables.dx_dataGrid.refresh();
                }
            },
            error: OnError,
        });
    },

    BindAccountReceiveBalance: function () {
        var myfilter = { rules: [] };
        myfilter.rules.push({ field: "ACCID", op: "eq", data: SalePurchaseview.variables.dx_txtPartyName.option().selectedItem.accid });
        myfilter.rules.push({ field: "ASONDATE", op: "eq", data: SalePurchaseview.variables.dx_txtPaymentDate.option().text });

        $.ajax({
            url: getDomain() + SalePurchaseview.variables.BindAccountbalancelist + "&myfilters=" + JSON.stringify(myfilter),
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
    SalePurchaseview.FormInitialize();
    SalePurchaseview.initializeDevExgrid();
    SalePurchaseview.GetpaidAmount();
    SalePurchaseview.BindSubBookList();

    if (+$("#hdnSBOOKID").val()) {
        $("#pnlView").hide();
        $("#frm_SalePurchaseJV").show();
        SalePurchaseview.variables.Masterid = "";

        SalePurchaseview.variables.dx_ddlSubBookMaster.option({ value: +$("#hdnSBOOKID").val() });
        SalePurchaseview.variables.dx_ddlSubBookMaster.option({ disabled: true });
    }

});

