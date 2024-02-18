var CreditDebitNoteView = {

    variables: {
        BindAccListUrl: "/Common/BindMastersDetails?ServiceName=ACCOUNTMASTER_GET",
        BindStaticDataUrl: "/Common/BindMastersDetails?ServiceName=STATIC_MASTER_GET&IsActive=true",
        GetJewelleryDataUrl: "/Common/BindMastersDetails?ServiceName=ACC_JEWELLERYTRANSACTION_MASTER_GET",
        GetMaterialDataUrl: "/Common/BindMastersDetails?ServiceName=ACC_MATERIALTRANSACTION_GET",
        GetGeneralExpenseDataUrl: "/Common/BindMastersDetails?ServiceName=ACC_GENERALEXPENSE_GET",
        BindMainGridListUrl: "/Common/BindMastersDetails?ServiceName=ACC_CREDITDEBITNOTE_GET",
        PerformMasterOperationUrl: "/Common/OpeartionsOnMaster?ServiceName=ACC_CREDITDEBITNOTE_CRUD",
        BindTaxProfile: "/Common/BindMastersDetails?ServiceName=ACC_TAXPROFILE_GET",
        BindItemMaster: "/Common/BindMastersDetails?ServiceName=ACC_ITEMMASTER_GET",


        VoucherTypeList: ["Retails Invoice", "Tax Invoice"],
        EditFlag: 0,
        Oper: 'Add',
        addedit: "added",
        Masterid: "",
        DeleteDataObj: "",
        RowCount: 1,
        ListId: 1,
        ImgRowCount: 1,
        ImageUploadType: "",
        dx_dataGrid: "",
        dx_dataGridItems: "",
        dx_popupRecordDelete: "",
        Subbook: [],
        DeletePopUpOptions: {
            width: 300,
            height: 200,
            contentTemplate: function () {
                return $("<div />").append(
                    $("<p>Voucher No: <span>" + CreditDebitNoteView.variables.DeleteDataObj.voucherno + "</span></p>")
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
                            "CDN_ID": CreditDebitNoteView.variables.Masterid,
                            "oper": CreditDebitNoteView.variables.Oper,
                        }

                        $.ajax({
                            url: getDomain() + CreditDebitNoteView.variables.PerformMasterOperationUrl,
                            data: data,
                            async: true,
                            cache: false,
                            type: 'POST',
                            success: function (data) {
                                if ($(data).find('RESPONSECODE').text() == "0") {
                                    DevExVariables.Toaster("success", 'Record is deleted successfully');

                                    CreditDebitNoteView.variables.dx_popupRecordDelete.hide();
                                    CreditDebitNoteView.variables.dx_dataGrid.refresh();
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

        dx_ddlBookType: "",
        dx_txtVoucherDate: "",
        dx_txtVoucherNo: "",
        dx_txtTransactionNo: "",
        dx_ddlVoucherType: "",
        dx_txtTransactionType: "",
        dx_txtExchangeRate: "",
        CreditDebitNoteView: "",
        dx_txtpartyName: "",
        dx_btnAddNew: "",
        dx_btnSubmit: "",
        dx_btnCancel: "",
        dx_ItemName: "",
        dx_txtamt: "",
        txtTotalAmountInRs: "",
        dx_txtTotalTax: "",
        txtAmtWithTax: "",
        txtAmtWithTaxinRs: "",

        txtRoundOff: '',
        txtFinalAmount: '',
        txtFinalAmtInRs: '',

        dx_txtRemarks: '',
        ItemList: "",
        taxlist: [],
    },

    FormInitialize: function () {

        /*-----------------------fields for update design parameters------------------------*/

        CreditDebitNoteView.variables.dx_btnAddNew = $("#dx_btnAddNew").dxButton({
            stylingMode: "outlined",
            icon: "plus",
            text: "Add New",
            type: "default",
            validationGroup: "CreditDebitNote",
            onClick: function (e) {
                $("#pnlView").hide();
                $("#frm_CreditDebitNote").show();
                CreditDebitNoteView.variables.Masterid = "";
            }
        }).dxButton("instance");

        CreditDebitNoteView.variables.dx_btnSubmit = $("#dx_btnSubmit").dxButton({
            icon: "check",
            text: "Submit",
            type: "success",
            validationGroup: "CreditDebitNote",
            onClick: function (e) {
                var validation = DevExpress.validationEngine.validateGroup("CreditDebitNote");
                if (!validation.isValid) {
                    DevExVariables.Toaster("warning", "Please fill all required fields before submit.");
                    return;
                }
                CreditDebitNoteView.btnMasterSubmit();
            }
        }).dxButton("instance");

        CreditDebitNoteView.variables.dx_btnCancel = $("#dx_btnCancel").dxButton({
            icon: "close",
            text: "Cancel",
            type: "danger",
            validationGroup: "CreditDebitNote",
            onClick: function (e) {
                CreditDebitNoteView.ClearValues();
            }
        }).dxButton("instance");

        CreditDebitNoteView.variables.dx_ddlBookType = $("#dx_ddlBookType").dxSelectBox({
            placeholder: "Select Sub Book...",
            searchEnabled: true,
            onItemClick: function (e) {
                if (e.component.option().selectedItem.subbook == 'Credit Note') {
                    CreditDebitNoteView.variables.dx_txtTransactionType.option({
                        dataSource: new DevExpress.data.ArrayStore({
                            data: CreditDebitNoteView.variables.Subbook.filter(function (x) { return x.subbooktype != 'CREDIT/DEBIT NOTE' && x.masterbook == 'Sale book' }),
                            key: "sbookid"
                        }),
                        displayExpr: "subbook",
                        valueExpr: "sbookid"
                    });
                }
                else if (e.component.option().selectedItem.subbook == 'Debit Note') {
                    CreditDebitNoteView.variables.dx_txtTransactionType.option({
                        dataSource: new DevExpress.data.ArrayStore({
                            data: CreditDebitNoteView.variables.Subbook.filter(function (x) { return x.subbooktype != 'CREDIT/DEBIT NOTE' && x.masterbook == 'Purchase Book' }),
                            key: "sbookid"
                        }),
                        displayExpr: "subbook",
                        valueExpr: "sbookid"
                    });
                }
            }
        }).dxValidator({
            validationGroup: "CreditDebitNote",
            validationRules: [{
                type: "required",
                message: "Voucher Type is required"
            }]
        }).dxSelectBox("instance");

        CreditDebitNoteView.variables.dx_txtTransactionType = $("#dx_txtTransactionType").dxSelectBox({
            placeholder: "Select Ttransaction Type...",
            searchEnabled: true,
            onValueChanged: function (data) {
                CreditDebitNoteView.variables.dx_txtTransactionNo.option("value", "");
                CreditDebitNoteView.variables.dx_txtpartyName.option("value", "");
                $("#spanpartycurrency").html('');
                $("#spanVoucherType").html('');
            },
        }).dxValidator({
            validationGroup: "CreditDebitNote",
            validationRules: [{
                type: "required",
                message: "Transaction Type is required"
            }]
        }).dxSelectBox("instance");

        CreditDebitNoteView.variables.dx_txtVoucherDate = $("#dx_txtVoucherDate").dxDateBox({
            type: "date",
            value: new Date(),
            showClearButton: true,
            useMaskBehavior: true,
            displayFormat: "dd MMM yyyy",
        }).dxValidator({
            validationGroup: "CreditDebitNote",
            validationRules: [{
                type: "required",
                message: "Voucher Date is required"
            }]
        }).dxDateBox("instance");

        CreditDebitNoteView.variables.dx_txtVoucherNo = $("#dx_txtVoucherNo").dxTextBox({
            readOnly: true,
        }).dxTextBox("instance");

        CreditDebitNoteView.variables.dx_txtTransactionNo = $("#dx_txtTransactionNo").dxAutocomplete({
            placeholder: "Select Transaction No...",
            mode: "search",
            dataSource: new DevExpress.data.CustomStore({
                load: function (loadOptions) {
                    var deferred = $.Deferred();

                    if (CreditDebitNoteView.variables.dx_txtTransactionType.option().value == null) {
                        DevExVariables.Toaster("warning", "Select First Transaction Type.");
                        return;
                    }

                    if (CreditDebitNoteView.variables.dx_txtpartyName.option().value == null) {
                        DevExVariables.Toaster("warning", "Select First Party Name.");
                        return;
                    }

                    var myfilter = { rules: [] };

                    myfilter.rules.push({ field: "VOUCHERNO", op: "cn", data: loadOptions.searchValue });
                    myfilter.rules.push({ field: "SBOOKID", op: "eq", data: CreditDebitNoteView.variables.dx_txtTransactionType.option().selectedItem.sbookid });
                    myfilter.rules.push({ field: "ACCID", op: "eq", data: CreditDebitNoteView.variables.dx_txtpartyName.option().selectedItem.accid });

                    var url = '';
                    if (CreditDebitNoteView.variables.dx_txtTransactionType.option().selectedItem.subbooktype == 'FINISHED') {
                        url = CreditDebitNoteView.variables.GetJewelleryDataUrl;
                    }
                    else if (CreditDebitNoteView.variables.dx_txtTransactionType.option().selectedItem.subbooktype == 'MATERIAL') {
                        url = CreditDebitNoteView.variables.GetMaterialDataUrl;
                    }
                    else if (CreditDebitNoteView.variables.dx_txtTransactionType.option().selectedItem.subbooktype == 'GENERAL') {
                        url = CreditDebitNoteView.variables.GetGeneralExpenseDataUrl;
                    }

                    $.ajax({
                        url: getDomain() + url + "&myfilters=" + JSON.stringify(myfilter),
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
                key: "rownum",
            }),
            displayExpr: "voucherno",
            valueExpr: "voucherno",
            onItemClick: function (e) {
                if (e.component.option().selectedItem) {
                    if (e.component.option().selectedItem) {
                        $("#spanVoucherType").html(e.component.option().selectedItem.vouchertype);
                        $("#spanpartycurrency").html(e.component.option().selectedItem.currencycode);
                        CreditDebitNoteView.variables.dx_taxProfile.option({ value: e.component.option().selectedItem.taxprofileid });
                        //CreditDebitNoteView.variables.dx_txtExchangeRate.option({ value: e.component.option().selectedItem.exchangerate });
                    }
                    else {
                        $("#spanVoucherType").html('');
                        $("#spanpartycurrency").html('');
                        CreditDebitNoteView.variables.dx_taxProfile.option("value", "");
                        //CreditDebitNoteView.variables.dx_txtExchangeRate.option("value", "");
                    }
                }
            },
        }).dxValidator({
            validationGroup: "CreditDebitNote",
            validationRules: [{
                type: "required",
                message: "Transaction No is required"
            }]
        }).dxAutocomplete("instance");

        CreditDebitNoteView.variables.dx_ddlVoucherType = $("#dx_ddlVoucherType").dxSelectBox({
            placeholder: "Select Voucher Type...",
            searchEnabled: true,
        }).dxValidator({
            validationGroup: "CreditDebitNote",
            validationRules: [{
                type: "required",
                message: "Voucher Type is required"
            }]
        }).dxSelectBox("instance");

        CreditDebitNoteView.variables.dx_txtExchangeRate = $("#dx_txtExchangeRate").dxNumberBox({
            value: 1,
            min: 1,
            onFocusOut: function (data) {
                CreditDebitNoteView.GetTaxProfileValues();
            },
        }).dxValidator({
            validationGroup: "CreditDebitNote",
            validationRules: [{
                type: "required",
                message: "Exchange rate is required"
            }]
        }).dxNumberBox("instance");

        CreditDebitNoteView.variables.dx_txtamt = $("#dx_txtamt").dxTextBox({
            mode: "text",

            onItemClick: function (e) {

            },
            onFocusOut: function (data) {
                CreditDebitNoteView.GetTaxProfileValues();
            },
            placeholder: "Enter Amount...",
        }).dxValidator({
            validationGroup: "CreditDebitNote",
            validationRules: [{
                type: "required",
                message: "Add Bill Total Amount."
            }]
        }).dxTextBox("instance");

        CreditDebitNoteView.variables.txtTotalAmountInRs = $("#txtTotalAmountInRs").dxNumberBox({
            readOnly: true,
            inputAttr: {
                class: "text-right"
            },
        }).dxValidator({
            validationGroup: "CreditDebitNote",
            validationRules: []
        }).dxNumberBox("instance");

        CreditDebitNoteView.variables.txtAmtWithTax = $("#txtAmtWithTax").dxNumberBox({
            readOnly: true,
            inputAttr: {
                class: "text-right"
            },
        }).dxValidator({
            validationGroup: "CreditDebitNote",
            validationRules: []
        }).dxNumberBox("instance");

        CreditDebitNoteView.variables.txtAmtWithTaxinRs = $("#txtAmtWithTaxinRs").dxNumberBox({
            readOnly: true,
            inputAttr: {
                class: "text-right"
            },
        }).dxValidator({
            validationGroup: "CreditDebitNote",
            validationRules: []
        }).dxNumberBox("instance");

        CreditDebitNoteView.variables.dx_taxProfile = $("#dx_taxProfile").dxSelectBox({
            placeholder: "Select Tax Profile...",
            searchEnabled: true,
            onItemClick: function (data) {
                CreditDebitNoteView.GetTaxProfileValues();
            },
        }).dxValidator({
            validationGroup: "CreditDebitNote",
            validationRules: [{
                type: "required",
                message: "Select tax Profile Type"
            }]
        }).dxSelectBox("instance");

        CreditDebitNoteView.variables.dx_ItemName = $("#dx_ItemName").dxAutocomplete({
            placeholder: "Select HSN Code...",
            mode: "search",
            onItemClick: function (e) {
                if (e.component.option().selectedItem) {
                    if (e.component.option().selectedItem) {
                        $("#spanhsncode").html(e.component.option().selectedItem.hsncode);
                    }
                    else {
                        $("#spanhsncode").html('');
                    }
                }
                CreditDebitNoteView.GetTaxProfileValues();
            },
            onValueChanged: function (data) {
                $("#spanhsncode").html('');

            },
            dataSource: new DevExpress.data.CustomStore({
                load: function (loadOptions) {
                    var deferred = $.Deferred();
                    var myfilter = { rules: [] };
                    myfilter.rules.push({ field: "ISACTIVE", op: "eq", data: true });
                    myfilter.rules.push({ field: "ITEMNAME", op: "cn", data: loadOptions.searchValue });

                    $.ajax({
                        url: getDomain() + CreditDebitNoteView.variables.BindItemMaster + "&myfilters=" + JSON.stringify(myfilter),
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
                key: "itemid",
            }),
            valueExpr: "itemname",

        }).dxValidator({
            validationGroup: "CreditDebitNote",
            validationRules: [{
                type: "required",
                message: "Hsn Code Is Required."
            }]
        }).dxAutocomplete("instance");

        CreditDebitNoteView.variables.dx_txtRemarks = $("#dx_txtRemarks").dxTextArea({
            height: 200,
            placeholder: "Enter Remark"

        }).dxTextArea("instance");

        CreditDebitNoteView.variables.dx_txtpartyName = $("#dx_txtpartyName").dxAutocomplete({
            placeholder: "Select Account...",
            mode: "search",
            dataSource: new DevExpress.data.CustomStore({
                load: function (loadOptions) {
                    var deferred = $.Deferred();
                    var myfilter = { rules: [] };
                    myfilter.rules.push({ field: "ACCOUNTNAME", op: "eq", data: loadOptions.searchValue });

                    $.ajax({
                        url: getDomain() + CreditDebitNoteView.variables.BindAccListUrl + "&_search=true&searchField=ACCOUNTNAME&searchOper=cn&searchString=" + loadOptions.searchValue + "&myfilters=" + JSON.stringify(myfilter),
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
                        $("#spanpartycurrency").html(e.component.option().selectedItem.currencycode);
                        CreditDebitNoteView.variables.dx_taxProfile.option({ value: e.component.option().selectedItem.taxprofileid });
                        CreditDebitNoteView.variables.dx_txtExchangeRate.option({ value: e.component.option().selectedItem.exchangerate });
                    }
                    else {
                        $("#spanpartycurrency").html('');
                        CreditDebitNoteView.variables.dx_taxProfile.option("value", "");
                        CreditDebitNoteView.variables.dx_txtExchangeRate.option("value", "");
                    }
                }
            },
            onValueChanged: function (data) {
                CreditDebitNoteView.variables.dx_txtTransactionNo.option("value", "");
                $("#spanpartycurrency").html('');
                $("#spanVoucherType").html('');
            },
            valueExpr: "accountname",
            itemTemplate: function (data) {
                return $("<div class='product-name'>" + "(" + data.partycode + ")&nbsp;" + data.accountname + "</div>");
            },
        }).dxValidator({
            validationGroup: "CreditDebitNote",
            validationRules: [{
                type: "required",
                message: "Party Account is required"
            }]
        }).dxAutocomplete("instance");

        CreditDebitNoteView.variables.txtRoundOff = $("#txtRoundOff").dxNumberBox({
            readOnly: true,
            inputAttr: {
                class: "text-right"
            }
        }).dxNumberBox("instance");

        CreditDebitNoteView.variables.txtFinalAmount = $("#txtFinalAmount").dxNumberBox({
            readOnly: true,
            inputAttr: {
                class: "text-right"
            }
        }).dxNumberBox("instance");

        CreditDebitNoteView.variables.txtFinalAmtInRs = $("#txtFinalAmtInRs").dxNumberBox({
            readOnly: true,
            inputAttr: {
                class: "text-right"
            }
        }).dxNumberBox("instance");
    },

    initializeDevExgrid: function () {
        CreditDebitNoteView.variables.dx_dataGrid = $("#dx_dataGrid").dxDataGrid({
            dataSource: new DevExpress.data.CustomStore({
                key: "cdn_id",
                load: function (loadOptions) {
                    var deferred = $.Deferred();

                    var result = DevExVariables.GetDataList(loadOptions, CreditDebitNoteView.variables.BindMainGridListUrl);

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
            columns: [{ dataField: "cdn_id", allowFiltering: false, allowSorting: true, sortIndex: 1, sortOrder: "desc", visible: false },
                { dataField: "voucherno", caption: "Voucher No", dataType: "string", filterOperations: ["contains"], allowSorting: true, allowFiltering: true, allowHeaderFiltering: false },
                { dataField: "voucherdate", caption: "Voucher Date", dataType: "string", filterOperations: ["contains"], allowSorting: true, allowFiltering: true, allowHeaderFiltering: false },
                {
                    dataField: "subbook", caption: "Book Type", dataType: "string", filterOperations: ["contains"],
                    allowSorting: false, allowFiltering: false, allowHeaderFiltering: true,
                    headerFilter: {
                        dataSource: [{
                            text: "CREDIT NOTE",
                            value: ["SUBBOOK", "equals", "CREDIT NOTE"]
                        }, {
                            text: "DEBIT NOTE",
                            value: ["SUBBOOK", "equals", "DEBIT NOTE"]
                        }]
                    },
                },
                { dataField: "transactionname", caption: "Tran Type", dataType: "string", filterOperations: ["contains"], allowSorting: false, allowFiltering: true, allowHeaderFiltering: false },
                { dataField: "transactionno", caption: "Tran No", dataType: "string", filterOperations: ["contains"], allowSorting: false, allowFiltering: true, allowHeaderFiltering: false },
                { dataField: "partyname", caption: "Party Name", dataType: "string", filterOperations: ["contains"], allowSorting: false, allowFiltering: true, allowHeaderFiltering: false },
                { dataField: "currencycode", caption: "Currency", dataType: "string", filterOperations: ["contains"], allowSorting: false, allowFiltering: true, allowHeaderFiltering: false },
                { dataField: "itemname", caption: "Item Name", dataType: "string", filterOperations: ["contains"], allowSorting: false, allowFiltering: true, allowHeaderFiltering: false },
                { dataField: "itemhsncode", caption: "HSN Code", dataType: "string", filterOperations: ["contains"], allowSorting: false, allowFiltering: true, allowHeaderFiltering: false },
                { dataField: "exchangerate", caption: "Ex Rate", dataType: "number", filterOperations: ["contains"], allowSorting: false, allowFiltering: true, allowHeaderFiltering: false },
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
                                    CreditDebitNoteView.EditFromGrid(data.value, options.key, 'Verify');
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
                        DevExVariables.ActionTemplate(container, options, true, true, "CreditDebitNoteView");
                    }
                },
            ]
        }).dxDataGrid("instance");
    },

    btnMasterSubmit: function () {

        CreditDebitNoteView.variables.dx_btnSubmit.option({ disabled: true });

        CreditDebitNoteView.variables.Oper = 'Add';
        CreditDebitNoteView.variables.addedit = "added";
        if (CreditDebitNoteView.variables.Masterid != "0" && parseInt(CreditDebitNoteView.variables.Masterid) > 0) {
            CreditDebitNoteView.variables.Oper = 'Edit';
            CreditDebitNoteView.variables.addedit = 'updated';
        }


        var xmlNodeList = '<TAXDETAILLIST>';
        $.each(CreditDebitNoteView.variables.taxlist, function (key, obj) {
            if (obj) {
                xmlNodeList += '<TAXDETAILS>';

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
            "CDN_ID": CreditDebitNoteView.variables.Masterid,
            "SBOOKID": CreditDebitNoteView.variables.dx_ddlBookType.option().selectedItem.sbookid,
            "VOUCHERNO": CreditDebitNoteView.variables.dx_txtVoucherNo.option().value,
            "TRANSACTIONID": CreditDebitNoteView.variables.dx_txtTransactionType.option().selectedItem.sbookid,
            "VOUCHERDATE": CreditDebitNoteView.variables.dx_txtVoucherDate.option().text,
            "VOUCHERTYPE": CreditDebitNoteView.variables.dx_txtTransactionNo.option().selectedItem.vouchertype,
            "TRANSACTIONNO": CreditDebitNoteView.variables.dx_txtTransactionNo.option().selectedItem.voucherno,
            "PARTYID": CreditDebitNoteView.variables.dx_txtpartyName.option().selectedItem.accid,
            "PARTYCURRENCYID": CreditDebitNoteView.variables.dx_txtpartyName.option().selectedItem.currencyid,
            "EXCHANGERATE": CreditDebitNoteView.variables.dx_txtExchangeRate.option().value,
            "TAXPROFILEID": CreditDebitNoteView.variables.dx_taxProfile.option().value,
            "ITEMID": CreditDebitNoteView.variables.dx_ItemName.option().selectedItem.itemid,
            "ITEMHSNCODE": CreditDebitNoteView.variables.dx_ItemName.option().selectedItem.hsncode,
            "TAXPROFILEID": CreditDebitNoteView.variables.dx_taxProfile.option().value,
            "AMOUNT": CreditDebitNoteView.variables.dx_txtamt.option().value,
            "AMOUNTINRS": CreditDebitNoteView.variables.txtTotalAmountInRs.option().value,
            "TOTALTAXAMT": CreditDebitNoteView.variables.txtAmtWithTax.option().value - CreditDebitNoteView.variables.dx_txtamt.option().value,
            "AMTWITHTAX": CreditDebitNoteView.variables.txtAmtWithTax.option().value,
            "AMTWITHTAXINRS": CreditDebitNoteView.variables.txtAmtWithTaxinRs.option().value,
            "ROUNDOFFTYPE": $("[name='rd_RoundOff']:checked").val(),
            "ROUNDOFFVALUE": CreditDebitNoteView.variables.txtRoundOff.option().value,
            "FINALAMOUNT": CreditDebitNoteView.variables.txtFinalAmount.option().value,
            "FINALAMTINRS": CreditDebitNoteView.variables.txtFinalAmtInRs.option().value,
            XMLPARAM: escape(xmlNodeList),
            "oper": CreditDebitNoteView.variables.Oper,
        }

        if (CreditDebitNoteView.variables.dx_txtRemarks.option().value)
            data.REMARK = CreditDebitNoteView.variables.dx_txtRemarks.option().value;

        CreditDebitNoteView.savedata(data);

    },

    savedata: function (data) {
        $.ajax({
            url: getDomain() + CreditDebitNoteView.variables.PerformMasterOperationUrl,
            data: data,
            async: true,
            cache: false,
            type: 'POST',
            beforeSend: function () {
                dx_LoaderTrinity.show();
            },
            complete: function () {
                dx_LoaderTrinity.hide();
                CreditDebitNoteView.variables.dx_btnSubmit.option({ disabled: false });
            },
            success: CreditDebitNoteView.btnMasterSubmitOnSuccess,
            error: OnError,
        });
    },

    btnMasterSubmitOnSuccess: function (data) {
        if ($(data).find('RESPONSECODE').text() == "0") {
            DevExVariables.Toaster("success", 'Record is Added successfully.');
            $("#frm_CreditDebitNote").hide();
            $("#pnlView").show();
            DevExpress.validationEngine.resetGroup("CreditDebitNote");
            CreditDebitNoteView.ClearValues();
            CreditDebitNoteView.variables.dx_dataGrid.refresh();
        }
        else {
            DevExVariables.InvalidResponseCode(data);
        }
    },

    BindSubBookList: function () {
        var myfilter = { rules: [] };
        myfilter.rules.push({ field: "TYPE", op: "eq", data: "AccSubBook" });
        myfilter.rules.push({ field: "ONLYALLOWED", op: "eq", data: true });
        var List = [];

        $.ajax({
            url: getDomain() + CreditDebitNoteView.variables.BindStaticDataUrl + "&myfilters=" + JSON.stringify(myfilter),
            async: false,
            cache: false,
            type: 'POST',
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    var JsonObject = xml2json.parser(data);
                    if (JsonObject.serviceresponse.detailslist) {

                        if (JsonObject.serviceresponse.detailslist.details.length) {
                            CreditDebitNoteView.variables.Subbook = JsonObject.serviceresponse.detailslist.details;
                        }
                        else {
                            CreditDebitNoteView.variables.Subbook.push(JsonObject.serviceresponse.detailslist.details);
                        }

                        CreditDebitNoteView.variables.dx_ddlBookType.option({
                            dataSource: new DevExpress.data.ArrayStore({
                                data: CreditDebitNoteView.variables.Subbook.filter(function (x) { return x.subbooktype == "CREDIT/DEBIT NOTE" }),
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

    BindTaxProfile: function () {
        var myfilter = { rules: [] };
        myfilter.rules.push({ field: "ISACTIVE", op: "eq", data: true });

        $.ajax({
            url: getDomain() + CreditDebitNoteView.variables.BindTaxProfile + "&IsRecordAll=true&myfilters=" + JSON.stringify(myfilter),
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

                        CreditDebitNoteView.variables.dx_taxProfile.option({
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

    GetTaxProfileValues: function () {
        $(".divTax").remove();
        var TotalTax = 0;
        if (CreditDebitNoteView.variables.dx_ItemName.option().selectedItem.taxdetaillist) {
            var List = [];
            CreditDebitNoteView.variables.taxlist = [];
            if (CreditDebitNoteView.variables.dx_ItemName.option().selectedItem.taxdetaillist) {
                if (CreditDebitNoteView.variables.dx_ItemName.option().selectedItem.taxdetaillist.taxdetails.length > 0)
                    List = CreditDebitNoteView.variables.dx_ItemName.option().selectedItem.taxdetaillist.taxdetails;
                else
                    List.push(CreditDebitNoteView.variables.dx_ItemName.option().selectedItem.taxdetaillist.taxdetails);
            }
            $.each(List, function (key, obj) {
                if (CreditDebitNoteView.variables.dx_taxProfile.option().selectedItem) {
                    if (CreditDebitNoteView.variables.dx_taxProfile.option().selectedItem.taxdetaillist) {
                        temptax = 0;
                        if (CreditDebitNoteView.variables.dx_taxProfile.option().selectedItem.taxdetaillist.taxdetails.filter(function (x) { return x.taxid == obj.taxid }).length > 0) {
                            if (obj.taxvaluein == "Percentage(%)") {
                                temptax = (+CreditDebitNoteView.variables.dx_txtamt.option().value * obj.taxvalue / 100);
                                TotalTax += temptax;
                            }
                            else {
                                temptax = obj.taxvalue;
                                TotalTax += temptax;
                            }
                            CreditDebitNoteView.variables.taxlist.push({
                                rownum: key + 1,
                                HSNCodeId: CreditDebitNoteView.variables.dx_ItemName.option().selectedItem.itemid,
                                HSNCode: CreditDebitNoteView.variables.dx_ItemName.option().selectedItem.hsncode,
                                TaxableAmt: CreditDebitNoteView.variables.dx_txtamt.option().value,
                                TaxId: obj.taxid,
                                TaxName: obj.taxname,
                                TaxValue: obj.taxvalue,
                                TaxValueIn: obj.taxvaluein,
                                TaxAmt: temptax
                            });
                        }
                        else {
                            CreditDebitNoteView.variables.taxlist.push({
                                rownum: key + 1,
                                HSNCodeId: CreditDebitNoteView.variables.dx_ItemName.option().selectedItem.itemid,
                                HSNCode: CreditDebitNoteView.variables.dx_ItemName.option().selectedItem.hsncode,
                                TaxableAmt: CreditDebitNoteView.variables.dx_txtamt.option().value,
                                TaxId: obj.taxid,
                                TaxName: obj.taxname,
                                TaxValue: obj.taxvalue,
                                TaxValueIn: obj.taxvaluein,
                                TaxAmt: temptax
                            });
                        }
                    }
                }
            });
        }
        CreditDebitNoteView.EndingTotalAmount();

        CreditDebitNoteView.variables.txtAmtWithTax.option({ value: (+CreditDebitNoteView.variables.dx_txtamt.option().value + TotalTax).toFixed(2) });
        CreditDebitNoteView.variables.txtAmtWithTaxinRs.option({ value: (CreditDebitNoteView.variables.txtAmtWithTax.option().value * CreditDebitNoteView.variables.dx_txtExchangeRate.option().value).toFixed(2) });

        CreditDebitNoteView.calcRoundOff();

    },

    EndingTotalAmount: function () {

        CreditDebitNoteView.variables.txtTotalAmountInRs.option({ value: (CreditDebitNoteView.variables.dx_txtamt.option().value * CreditDebitNoteView.variables.dx_txtExchangeRate.option().value).toFixed(2) });

        $(".divTax").remove();
        if (CreditDebitNoteView.variables.taxlist) {
            var tempTaxList = "";
            var temparray = [];
            var index = 0;
            $.each(CreditDebitNoteView.variables.taxlist, function (key, obj) {
                if (temparray.filter(function (x) { return x.taxname == obj.TaxName }).length == 0) {
                    temparray.push({ taxname: obj.TaxName, taxamt: 0 });
                }
                index = temparray.findIndex(function (x) { return x.taxname == obj.TaxName });
                temparray[index].taxamt = temparray[index].taxamt + obj.TaxAmt;
            });

            $.each(temparray, function (key, obj) {
                tempTaxList += '<div class="form-group divTax">'
                                + '<label class="col-md-9 control-label">' + obj.taxname + '</label>'
                                + '<div class="col-md-3">'
                                    + '<input type="text" class="form-control text-right" name="txt_' + obj.taxname + '" id="txt_' + obj.taxname + '" value="' + obj.taxamt.toFixed(2) + '" readonly />'
                                + '</div>'
                            + '</div>';
            });

            $(tempTaxList).insertBefore("#div_AmtWithTax");
        }

    },

    triggerId: function (id) {
        var rowData = CreditDebitNoteView.variables.dx_dataGrid.getVisibleRows()[CreditDebitNoteView.variables.dx_dataGrid.getRowIndexByKey(+id)].data;
        CreditDebitNoteView.variables.Masterid = id;
        CreditDebitNoteView.variables.dx_txtVoucherDate.option({ value: rowData.voucherdate });
        CreditDebitNoteView.variables.dx_txtVoucherNo.option({ value: rowData.voucherno });
        CreditDebitNoteView.variables.dx_ddlBookType.option({ value: rowData.sbookid });

        if (CreditDebitNoteView.variables.dx_ddlBookType.option().selectedItem.subbook == 'CREDIT NOTE') {
            CreditDebitNoteView.variables.dx_txtTransactionType.option({
                dataSource: new DevExpress.data.ArrayStore({
                    data: CreditDebitNoteView.variables.Subbook.filter(function (x) { return x.subbooktype != 'CREDIT/DEBIT NOTE' && x.masterbook == 'Sale book' }),
                    key: "sbookid"
                }),
                displayExpr: "subbook",
                valueExpr: "sbookid"
            });
        }
        else if (CreditDebitNoteView.variables.dx_ddlBookType.option().selectedItem.subbook == 'DEBIT NOTE') {
            CreditDebitNoteView.variables.dx_txtTransactionType.option({
                dataSource: new DevExpress.data.ArrayStore({
                    data: CreditDebitNoteView.variables.Subbook.filter(function (x) { return x.subbooktype != 'CREDIT/DEBIT NOTE' && x.masterbook == 'Purchase Book' }),
                    key: "sbookid"
                }),
                displayExpr: "subbook",
                valueExpr: "sbookid"
            });
        }

        CreditDebitNoteView.variables.dx_txtTransactionType.option({ value: rowData.transactionid });
        CreditDebitNoteView.variables.dx_txtpartyName.option({
            items: [{ accid: rowData.partyid, accountname: rowData.partyname, currencycode: rowData.currencycode, currencyid: rowData.partycurrencyid, taxprofileid: rowData.taxprofileid }],
            selectedItem: { accid: rowData.partyid, accountname: rowData.partyname, currencycode: rowData.currencycode, currencyid: rowData.partycurrencyid, taxprofileid: rowData.taxprofileid },
            value: rowData.partyname
        });
        CreditDebitNoteView.variables.dx_txtTransactionNo.option({
            items: [{ voucherno: rowData.transactionno, vouchertype: rowData.vouchertype }],
            selectedItem: { voucherno: rowData.transactionno, vouchertype: rowData.vouchertype },
            value: rowData.transactionno
        });
        CreditDebitNoteView.variables.dx_taxProfile.option({ value: rowData.taxprofileid });
        CreditDebitNoteView.variables.dx_ItemName.option({
            items: [{ itemid: rowData.itemid, itemname: rowData.itemname, hsncode: rowData.itemhsncode, taxdetaillist: rowData.taxdetaillist }],
            selectedItem: { itemid: rowData.itemid, itemname: rowData.itemname, hsncode: rowData.itemhsncode, taxdetaillist: rowData.taxdetaillist },
            value: rowData.itemname
        });
        CreditDebitNoteView.variables.dx_txtExchangeRate.option({ value: rowData.exchangerate });
        CreditDebitNoteView.variables.dx_txtamt.option({ value: rowData.amount });
        CreditDebitNoteView.variables.txtTotalAmountInRs.option({ value: rowData.amountinrs });
        CreditDebitNoteView.variables.txtAmtWithTax.option({ value: rowData.amtwithtax });
        CreditDebitNoteView.variables.txtAmtWithTaxinRs.option({ value: rowData.amtwithtaxinrs });
        CreditDebitNoteView.variables.dx_txtRemarks.option({ value: rowData.remark });
        CreditDebitNoteView.variables.txtRoundOff.option({ value: rowData.roundoffvalue });
        CreditDebitNoteView.variables.txtFinalAmount.option({ value: rowData.finalamount });
        CreditDebitNoteView.variables.txtFinalAmtInRs.option({ value: rowData.finalamtinrs });

        $("#spanpartycurrency").html(CreditDebitNoteView.variables.dx_txtpartyName.option().selectedItem.currencycode);
        $("#spanVoucherType").html(rowData.vouchertype);
        $("#spanhsncode").html(rowData.itemhsncode);

        if (rowData.roundofftype == "Add")
            $("#rd_Add").prop("checked", true);
        else
            $("#rd_Less").prop("checked", true);

        CreditDebitNoteView.GetTaxProfileValues();
        CreditDebitNoteView.variables.dx_ddlBookType.option({ disabled: true });
        $("#frm_CreditDebitNote").show();
        $("#pnlView").hide();
        if (isU()) {
            CreditDebitNoteView.variables.dx_btnSubmit.option({ visible: true });
        }
        else {
            CreditDebitNoteView.variables.dx_btnSubmit.option({ visible: false });
        }
    },

    ClearValues: function () {
        CreditDebitNoteView.variables.Masterid = "";
        CreditDebitNoteView.variables.Oper = 'Add';
        CreditDebitNoteView.variables.addedit = "added";
        CreditDebitNoteView.variables.DeleteDataObj = "";
        DevExpress.validationEngine.resetGroup("CreditDebitNote");
        CreditDebitNoteView.variables.dx_txtVoucherDate.option({ value: new Date() });
        CreditDebitNoteView.variables.dx_txtExchangeRate.option("value", 1);
        CreditDebitNoteView.variables.dx_txtVoucherNo.option("value", "");
        CreditDebitNoteView.variables.txtTotalAmountInRs.option("value", "");
        CreditDebitNoteView.variables.txtAmtWithTax.option("value", "");
        CreditDebitNoteView.variables.txtAmtWithTaxinRs.option("value", "");
        CreditDebitNoteView.variables.dx_btnSubmit.option({ disabled: false });
        CreditDebitNoteView.variables.dx_ddlBookType.option({ disabled: false });
        CreditDebitNoteView.variables.txtRoundOff.option("value", "");
        CreditDebitNoteView.variables.txtFinalAmount.option("value", "");
        CreditDebitNoteView.variables.txtFinalAmtInRs.option("value", "");
        $("#rd_Less").prop("checked", true);
        CreditDebitNoteView.variables.taxlist = [];

        CreditDebitNoteView.variables.dx_btnSubmit.option({ visible: true });
        $("#spanpartycurrency").html("");
        $("#spanVoucherType").html("");
        $("#spanhsncode").html("");
        $(".divTax").remove();
        $("#frm_CreditDebitNote").hide();
        $("#pnlView").show();
        CreditDebitNoteView.variables.dx_dataGrid.refresh();
    },

    deleteRow: function (id) {
        var rowData = CreditDebitNoteView.variables.dx_dataGrid.getVisibleRows()[CreditDebitNoteView.variables.dx_dataGrid.getRowIndexByKey(+id)].data;
        CreditDebitNoteView.variables.Masterid = id;
        CreditDebitNoteView.variables.DeleteDataObj = rowData;
        CreditDebitNoteView.variables.Oper = "Delete";

        if (CreditDebitNoteView.variables.dx_popupRecordDelete) {
            CreditDebitNoteView.variables.dx_popupRecordDelete.option("contentTemplate", CreditDebitNoteView.variables.DeletePopUpOptions.contentTemplate(CreditDebitNoteView.variables.DeleteDataObj).bind(this));
        }
        else {
            CreditDebitNoteView.variables.dx_popupRecordDelete = $("#dx_popupRecordDelete").dxPopup(CreditDebitNoteView.variables.DeletePopUpOptions).dxPopup("instance");
        }

        CreditDebitNoteView.variables.dx_popupRecordDelete.show();
    },

    EditFromGrid: function (val, id, type) {
        var data = {
            "CDN_ID": id,
            "OPER_TYPE": "EditFromGrid",
            "oper": "Edit"
        }
        if (type == "Verify")
            data.ISVERIFY = val;
        $.ajax({
            url: getDomain() + CreditDebitNoteView.variables.PerformMasterOperationUrl,
            data: data,
            async: true,
            cache: false,
            type: 'POST',
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    DevExVariables.Toaster("success", 'Record is updated successfully.');
                    CreditDebitNoteView.variables.dx_dataGrid.refresh();
                }
            },
            error: OnError,
        });
    },

    calcRoundOff: function () {
        var Amt = CreditDebitNoteView.variables.txtAmtWithTax.option().value;
        var FinalAmt = 0, RoundOff = 0, ExRate = 1;;
        if ($("[name='rd_RoundOff']:checked").val() == "Add") {
            FinalAmt = Math.ceil(Amt);
        }
        else {
            FinalAmt = Math.floor(Amt);
        }

        RoundOff = Math.abs(Amt - FinalAmt);

        CreditDebitNoteView.variables.txtRoundOff.option({ value: RoundOff.toFixed(2) });
        CreditDebitNoteView.variables.txtFinalAmount.option({ value: FinalAmt.toFixed(2) });
        //CreditDebitNoteView.variables.txtFinalAmtInRs.option({ value: (FinalAmt * CreditDebitNoteView.variables.dx_txtExchangeRate.option.value()).toFixed(2) });

        CreditDebitNoteView.OnChangeExchangeRate();
    },

    OnChangeExchangeRate: function () {
        var ExRate = CreditDebitNoteView.variables.dx_txtExchangeRate.option().value;
        var FinalAmt = CreditDebitNoteView.variables.txtFinalAmount.option().value || 0;
        CreditDebitNoteView.variables.txtFinalAmtInRs.option({ value: (FinalAmt * ExRate).toFixed(2) });
    },

}

$(document).ready(function () {
    CreditDebitNoteView.FormInitialize();
    CreditDebitNoteView.BindSubBookList();
    CreditDebitNoteView.BindTaxProfile();
    CreditDebitNoteView.initializeDevExgrid();

    $("[name='rd_RoundOff']").change(function () {
        CreditDebitNoteView.calcRoundOff();
    });

    if (+$("#hdnSBOOKID").val()) {
        $("#pnlView").hide();
        $("#frm_CreditDebitNote").show();
        CreditDebitNoteView.variables.Masterid = "";

        CreditDebitNoteView.variables.dx_ddlBookType.option({ value: +$("#hdnSBOOKID").val() });
        CreditDebitNoteView.variables.dx_ddlBookType.option({ disabled: true });

        if (CreditDebitNoteView.variables.dx_ddlBookType.option().selectedItem.subbook == 'Credit Note') {
            CreditDebitNoteView.variables.dx_txtTransactionType.option({
                dataSource: new DevExpress.data.ArrayStore({
                    data: CreditDebitNoteView.variables.Subbook.filter(function (x) { return x.subbooktype != 'CREDIT/DEBIT NOTE' && x.masterbook == 'Sale book' }),
                    key: "sbookid"
                }),
                displayExpr: "subbook",
                valueExpr: "sbookid"
            });
        }
        else if (CreditDebitNoteView.variables.dx_ddlBookType.option().selectedItem.subbook == 'Debit Note') {
            CreditDebitNoteView.variables.dx_txtTransactionType.option({
                dataSource: new DevExpress.data.ArrayStore({
                    data: CreditDebitNoteView.variables.Subbook.filter(function (x) { return x.subbooktype != 'CREDIT/DEBIT NOTE' && x.masterbook == 'Purchase Book' }),
                    key: "sbookid"
                }),
                displayExpr: "subbook",
                valueExpr: "sbookid"
            });
        }
    }
});