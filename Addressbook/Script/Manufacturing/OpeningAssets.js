var OpeningAssetsView = {
    variables: {
        BindAccListUrl: "/Common/BindMastersDetails?ServiceName=ACCOUNTMASTER_GET",
        BindAccountbalancelist: "/Common/BindMastersDetails?ServiceName=ACC_BALANCE_GET",
        BindExpenseACCListUrl: "/Common/BindMastersDetails?ServiceName=ACC_SUBHEAD_MASTER_GET",
        BindTaxProfile: "/Common/BindMastersDetails?ServiceName=ACC_TAXPROFILE_GET",
        BindItemMaster: "/Common/BindMastersDetails?ServiceName=ACC_ITEMMASTER_GET",
        PerformMasterOperationUrl: "/Common/OpeartionsOnMaster?ServiceName=ACC_OPENINGASSETS_CRUD",
        BindStaticDataUrl: "/Common/BindMastersDetails?ServiceName=STATIC_MASTER_GET&IsActive=true",
        BindMainGridListUrl: "/Common/BindMastersDetails?ServiceName=ACC_OPENINGASSETS_GET",
        BindDetailListUrl: "/Common/BindMastersDetails?ServiceName=ACC_OPENINGASSETS_DETAIL_GET",

        GlobalTotal: [],
        VoucherTypeList: ["Retails Invoice", "Tax Invoice"],

        dx_bookType: '',
        dx_VchrNo: '',
        dx_txtVoucherDate: '',
        dx_txtPurchaseDate: '',
        dx_ddlVoucherType: '',
        dx_txtDueDays: '',
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
                    $("<p>Voucher No: <span>" + OpeningAssetsView.variables.DeleteDataObj.voucherno + "</span></p>"
                     + "<p>Voucher Type: <span>" + OpeningAssetsView.variables.DeleteDataObj.vouchertype + "</span></p>"
                     + "<p>Amount: <span>" + OpeningAssetsView.variables.DeleteDataObj.totaltaxableamt + "</span></p>"
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
                            "OA_ID": OpeningAssetsView.variables.Masterid,
                            "oper": OpeningAssetsView.variables.Oper,
                        }
                        $.ajax({
                            url: getDomain() + OpeningAssetsView.variables.PerformMasterOperationUrl,
                            data: data,
                            async: true,
                            cache: false,
                            type: 'POST',
                            success: function (data) {
                                if ($(data).find('RESPONSECODE').text() == "0") {
                                    DevExVariables.Toaster("success", 'Record is deleted successfully');

                                    OpeningAssetsView.variables.dx_popupRecordDelete.hide();
                                    OpeningAssetsView.variables.dx_dataGrid.refresh();
                                }
                                else {
                                    DevExVariables.InvalidResponseCode(data);
                                }
                            },
                            error: OnError,
                        });

                        //OpeningAssetsView.savedata(data);
                        //OpeningAssetsView.variables.dx_popupRecordDelete.hide();
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
        dx_txtSharingEmailBody: ""

    },

    FormInitialize: function () {
        //--------------------------------------- Add New button---------------------------------------

        OpeningAssetsView.variables.dx_btnAddNew = $("#dx_btnAddNew").dxButton({
            stylingMode: "outlined",
            icon: "plus",
            text: "Add New",
            type: "default",
            validationGroup: "OpeningAssets",
            onClick: function (e) {
                OpeningAssetsView.AddNewLineDetails();
                $("#frm_Purchase_Expence").show();
                $("#pnlView").hide();
                OpeningAssetsView.variables.Masterid = "";
            }
        }).dxButton("instance");

        //--------------------------------------- Start Top Left Content---------------------------------------
        OpeningAssetsView.variables.dx_bookType = $("#dx_bookType").dxSelectBox({
            placeholder: "Select Book Type...",
            searchEnabled: true,
        }).dxValidator({
            validationGroup: "OpeningAssets",
            validationRules: [{
                type: "required",
                message: "Select Book Type"
            }]
        }).dxSelectBox("instance");

        OpeningAssetsView.variables.dx_VchrNo = $("#dx_VchrNo").dxTextBox({
            readOnly: true,
        }).dxValidator({
            validationGroup: "OpeningAssets",
            validationRules: []
        }).dxTextBox("instance");

        var now = new Date();
        OpeningAssetsView.variables.dx_txtVoucherDate = $("#dx_txtVoucherDate").dxDateBox({
            type: "date",
            value: now,
            showClearButton: true,
            useMaskBehavior: true,
            displayFormat: "dd MMM yyyy",
        }).dxDateBox("instance");

        OpeningAssetsView.variables.dx_txtPurchaseDate = $("#dx_txtPurchaseDate").dxDateBox({
            type: "date",
            value: now,
            showClearButton: true,
            useMaskBehavior: true,
            displayFormat: "dd MMM yyyy",
        }).dxDateBox("instance");

        OpeningAssetsView.variables.dx_ddlVoucherType = $("#dx_ddlVoucherType").dxSelectBox({
            dataSource: OpeningAssetsView.variables.VoucherTypeList,
            value: OpeningAssetsView.variables.VoucherTypeList[1],
            placeholder: "Select Voucher Type...",
            searchEnabled: true,
        }).dxValidator({
            validationGroup: "OpeningAssets",
            validationRules: [{
                type: "required",
                message: "Select Voucher Type"
            }]
        }).dxSelectBox("instance");

        OpeningAssetsView.variables.dx_txtDueDays = $("#dx_txtDueDays").dxNumberBox({
            placeholder: "Enter Due Days...",
            searchEnabled: true,
        }).dxValidator({
        }).dxNumberBox("instance");

        //var now = new Date();
        //OpeningAssetsView.variables.dx_txtDueDate = $("#dx_txtDueDate").dxDateBox({
        //    type: "date",
        //    value: now,
        //    showClearButton: true,
        //    useMaskBehavior: true,
        //    displayFormat: "dd MMM yyyy",
        //}).dxDateBox("instance");

        OpeningAssetsView.variables.dx_ExpenseAcc = $("#dx_ExpenseAcc").dxAutocomplete({
            placeholder: "Select Account...",
            mode: "search",
            dataSource: new DevExpress.data.CustomStore({
                load: function (loadOptions) {
                    var deferred = $.Deferred();

                    var myfilter = { rules: [] };
                    myfilter.rules.push({ field: "GROUPNAME", op: "eq", data: "Fixed Assets" });

                    $.ajax({
                        url: getDomain() + OpeningAssetsView.variables.BindAccListUrl + "&_search=true&searchField=ACCOUNTNAME&searchOper=cn&searchString=" + loadOptions.searchValue + "&myfilters=" + JSON.stringify(myfilter),
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
                        OpeningAssetsView.BindAccountBalance();

                        OpeningAssetsView.variables.dx_ExpenseAcc.option().selectedItem.accid;
                        $("#spanExpenseCurr").html(e.component.option().selectedItem.currencycode);
                    }
                    else {
                        OpeningAssetsView.variables.dx_ExpenseAcc = "";
                        $("#spanExpenseCurr").html('');
                    }
                }
            },
            valueExpr: "accountname",
        }).dxValidator({
            validationGroup: "OpeningAssets",
            validationRules: [{
                type: "required",
                message: "Select Cash/Bank Account"
            }]
        }).dxAutocomplete("instance");

        OpeningAssetsView.variables.dx_PartyAcc = $("#dx_PartyAcc").dxAutocomplete({
            placeholder: "Select Account...",
            mode: "search",
            dataSource: new DevExpress.data.CustomStore({
                load: function (loadOptions) {
                    var deferred = $.Deferred();

                    var myfilter = { rules: [] };
                    myfilter.rules.push({ field: "GROUPNAME", op: "eq", data: "Creditors/Debitors" });

                    $.ajax({
                        url: getDomain() + OpeningAssetsView.variables.BindAccListUrl + "&_search=true&searchField=ACCOUNTNAME&searchOper=cn&searchString=" + loadOptions.searchValue + "&myfilters=" + JSON.stringify(myfilter),
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
                        OpeningAssetsView.BindAccountReceiveBalance();

                        OpeningAssetsView.variables.dx_PartyAcc.option().selectedItem.accid;
                        $("#spanReceiveCurr").html(e.component.option().selectedItem.currencycode);
                        OpeningAssetsView.variables.dx_taxProfile.option({ value: e.component.option().selectedItem.taxprofileid });
                        OpeningAssetsView.variables.dx_txtDueDays.option({ value: e.component.option().selectedItem.creditdays });
                        OpeningAssetsView.variables.dx_txtExchangeRate.option({ value: e.component.option().selectedItem.exchangerate });

                    }
                    else {
                        OpeningAssetsView.variables.dx_PartyAcc = "";
                        $("#spanReceiveCurr").html('');
                        OpeningAssetsView.variables.dx_taxProfile.option("value", "");
                        OpeningAssetsView.variables.dx_txtDueDays.option("value", "");
                        OpeningAssetsView.variables.dx_txtExchangeRate.option("value", "");

                    }

                }
            },
            itemTemplate: function (data) {
                return $("<div class='product-name'>" + "(" + data.partycode + ")&nbsp;" + data.accountname + "</div>");
            },
        }).dxValidator({
            validationGroup: "OpeningAssets",
            validationRules: [{
                type: "required",
                message: "Select Receive Account"
            }]
        }).dxAutocomplete("instance");

        OpeningAssetsView.variables.dx_txtRemarks = $("#dx_txtRemarks").dxTextArea({
            height: 110,
            placeholder: "Enter Remark"

        }).dxTextArea("instance");

        OpeningAssetsView.variables.dx_taxProfile = $("#dx_taxProfile").dxSelectBox({
            placeholder: "Select Tax Profile...",
            searchEnabled: true,
            onValueChanged: function (data) {
                //if (data.value && OpeningAssetsView.variables.Masterid > 0) {
                //    OpeningAssetsView.updateTaxProfile();
                //}
            },
            onItemClick: function (e) {
                //if (e.component.option().value && OpeningAssetsView.variables.Masterid > 0) {
                //    OpeningAssetsView.BindTaxProfile();
                //}
            },
        }).dxValidator({
            validationGroup: "OpeningAssets",
            validationRules: [{
                type: "required",
                message: "Select tax Profile Type"
            }]
        }).dxSelectBox("instance");

        OpeningAssetsView.variables.dx_txtBillNo = $("#dx_txtBillNo").dxTextBox({
            mode: "text",
            placeholder: "Enter Bill No...",
        }).dxTextBox("instance");

        OpeningAssetsView.variables.dx_txtExchangeRate = $("#dx_txtExchangeRate").dxNumberBox({
            value: 1,
            min: 1,
            onValueChanged: function (data) {
                OpeningAssetsView.OnChangeExchangeRate();
            },
            //onFocusOut: function (data) {
            //    var TotalAmountInRs = 0;
            //    TotalAmountInRs += +OpeningAssetsView.variables.dx_txtamt.option().value * OpeningAssetsView.variables.dx_txtExchangeRate.option().value;
            //    OpeningAssetsView.variables.txtTotalAmountInRs.option({ value: (TotalAmountInRs.toFixed(2)) });
            //},
        }).dxValidator({
            validationGroup: "OpeningAssets",
            validationRules: [{
                type: "required",
                message: "Exchange rate is required"
            }]
        }).dxNumberBox("instance");

        //--------------------------------------- End Top Left Content---------------------------------------

        //--------------------------------------- Start Bottom Right Content---------------------------------------
        OpeningAssetsView.variables.txtTaxableAmount = $("#txtTaxableAmount").dxNumberBox({
            readOnly: true,
            inputAttr: {
                class: "text-right"
            }
        }).dxNumberBox("instance");

        //OpeningAssetsView.variables.txtAmountWithTax = $("#txtAmountWithTax").dxNumberBox({
        //    readOnly: true,
        //    inputAttr: {
        //        class: "text-right"
        //    }
        //}).dxNumberBox("instance");

        OpeningAssetsView.variables.txtRoundOff = $("#txtRoundOff").dxNumberBox({
            readOnly: true,
            inputAttr: {
                class: "text-right"
            }
        }).dxNumberBox("instance");

        OpeningAssetsView.variables.txtTotalAmount = $("#txtTotalAmount").dxNumberBox({
            readOnly: true,
            inputAttr: {
                class: "text-right"
            }
        }).dxNumberBox("instance");

        OpeningAssetsView.variables.txtTotalAmountinRs = $("#txtTotalAmountinRs").dxNumberBox({
            readOnly: true,
            inputAttr: {
                class: "text-right"
            }
        }).dxNumberBox("instance");
        //--------------------------------------- Start Bottom Left Content---------------------------------------

        /*-------Start Bottom Left controls-------------------------------------*/

        //OpeningAssetsView.RegisterFileUpload('inputCADFile', 'lnkCADFilePreview', "#ItemimgError");

        //--------------------------------------- Submit button---------------------------------------

        OpeningAssetsView.variables.dx_btnSubmit = $("#dx_btnSubmit").dxButton({
            icon: "check",
            text: "Submit",
            type: "success",
            onClick: function (e) {
                var validation = DevExpress.validationEngine.validateGroup("OpeningAssets");
                if (!validation.isValid) {
                    DevExVariables.Toaster("warning", "Please fill all required fields before submit.");
                    return;
                }
                OpeningAssetsView.btnMasterSubmit();
            }

        }).dxButton("instance");

        //--------------------------------------- Cancle button---------------------------------------

        OpeningAssetsView.variables.dx_btnCancel = $("#dx_btnCancel").dxButton({
            icon: "close",
            text: "Cancel",
            type: "danger",
            onClick: function (e) {
                OpeningAssetsView.ClearValues();
            }
        }).dxButton("instance");


        /*----------------------------Sharing Modal--------------------------*/
        OpeningAssetsView.variables.dx_txtSharetoPartyList = $("#dx_txtSharetoPartyList").dxAutocomplete({
            placeholder: "Select Party Name...",
            mode: "search",
            dataSource: new DevExpress.data.CustomStore({
                load: function (loadOptions) {
                    var deferred = $.Deferred();
                    $.ajax({
                        url: getDomain() + OpeningAssetsView.variables.BindAccListUrl + "&_search=true&searchField=ACCOUNTNAME&searchOper=cn&searchString=" + loadOptions.searchValue,
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
                    OpeningAssetsView.variables.dx_txtSharingEmailId.option({ value: data.selectedItem.emailid });
                    OpeningAssetsView.variables.dx_txtMobileNo.option({ value: data.selectedItem.mobile1 });

                }
                else {
                    OpeningAssetsView.variables.dx_txtSharingEmailId.option("value", "");
                    OpeningAssetsView.variables.dx_txtMobileNo.option("value", "");
                }
            }
        }).dxAutocomplete("instance");
        OpeningAssetsView.variables.dx_btnSubmitShare = $("#dx_btnSubmitShare").dxButton({
            stylingMode: "outlined",
            icon: "fa fa-paper-plane",
            text: "Send",
            type: "default",
            useSubmitBehavior: false,
            visible: true,
            onClick: function (e) {
                OpeningAssetsView.SharingDetails();
            }
        }).dxButton("instance");
        OpeningAssetsView.variables.dx_RadioSocial = $("#dx_RadioSocial").dxRadioGroup({
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
        OpeningAssetsView.variables.dx_txtMobileNo = $("#dx_txtMobileNo").dxTextBox({ mode: "number" }).dxTextBox("instance");
        OpeningAssetsView.variables.dx_txtShareMessage = $("#dx_txtShareMessage").dxTextArea({
            height: 90,
            value: 'Dear Sir, ' + $("#hdn_UserName").val() + ' shared a design from TrinityJewells with you. Kindly click on below URL to view shared Design. {SHARE URL}',
        }).dxTextArea("instance");
        OpeningAssetsView.variables.dx_txtSharingSubject = $("#dx_txtSharingSubject").dxTextBox({
            value: "Jewellery Designs shared by TrinityJewells"
        }).dxTextBox("instance");
        OpeningAssetsView.variables.dx_txtSharingEmailId = $("#dx_txtSharingEmailId").dxTextBox({ placeholder: "Enter Email Id..." }).dxTextBox("instance");
        OpeningAssetsView.variables.dx_txtSharingEmailBody = $("#dx_txtSharingEmailBody").dxHtmlEditor({
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
            value: OpeningAssetsView.variables.content,
            onValueChanged: function (e) {
                //$(".value-content").text(e.component.option("value"));
            }
        }).dxHtmlEditor("instance");
        /*----------------------------/ Sharing Modal--------------------------*/
    },

    initializeDevExgrid: function () {
        OpeningAssetsView.variables.dx_dataGrid = $("#dx_dataGrid").dxDataGrid({
            dataSource: new DevExpress.data.CustomStore({
                key: "oa_id",
                load: function (loadOptions) {
                    var deferred = $.Deferred();

                    var result = DevExVariables.GetDataList(loadOptions, OpeningAssetsView.variables.BindMainGridListUrl);

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
            columns: [{ dataField: "oa_id", allowFiltering: false, allowSorting: true, sortIndex: 1, sortOrder: "desc", visible: false },
                { dataField: "voucherno", caption: "Voucher No", dataType: "string", filterOperations: ["contains"], allowSorting: true, allowFiltering: true, allowHeaderFiltering: false },
                { dataField: "vouchertype", caption: "Voucher Type", dataType: "string", filterOperations: ["contains"], allowSorting: true, allowFiltering: true, allowHeaderFiltering: false },
                { dataField: "voucherdate", caption: "Voucher Date", dataType: "string", filterOperations: ["contains"], allowSorting: true, allowFiltering: true, allowHeaderFiltering: false },
                { dataField: "purchasedate", caption: "Purchase Date", dataType: "string", filterOperations: ["contains"], allowSorting: false, allowFiltering: true, allowHeaderFiltering: false },
                { dataField: "accountname", caption: "Asset Acc", dataType: "string", filterOperations: ["contains"], allowSorting: true, allowFiltering: true, allowHeaderFiltering: false },
                { dataField: "partyaccname", caption: "Party Acc", dataType: "string", filterOperations: ["contains"], allowSorting: true, allowFiltering: true, allowHeaderFiltering: false },
                { dataField: "partybillno", caption: "PartyBill No", dataType: "string", filterOperations: ["contains"], allowSorting: true, allowFiltering: true, allowHeaderFiltering: false },
                { dataField: "partycurcode", caption: "AssetAcc Cur", dataType: "string", filterOperations: ["contains"], allowSorting: true, allowFiltering: true, allowHeaderFiltering: false },
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
                                    OpeningAssetsView.EditFromGrid(data.value, options.key, 'Verify');
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
                        DevExVariables.ActionTemplate(container, options, true, true, "OpeningAssetsView", "Attachments,Share,Pdf");
                    }
                },
            ]
        }).dxDataGrid("instance");
    },

    triggerId: function (id) {
        var rowData = OpeningAssetsView.variables.dx_dataGrid.getVisibleRows()[OpeningAssetsView.variables.dx_dataGrid.getRowIndexByKey(+id)].data;

        OpeningAssetsView.variables.Masterid = id;
        OpeningAssetsView.variables.dx_bookType.option({ value: rowData.sbookid });
        OpeningAssetsView.variables.dx_txtVoucherDate.option({ value: rowData.voucherdate });
        OpeningAssetsView.variables.dx_txtPurchaseDate.option({ value: rowData.purchasedate });
        OpeningAssetsView.variables.dx_VchrNo.option({ value: rowData.voucherno });
        OpeningAssetsView.variables.dx_ddlVoucherType.option({ value: rowData.vouchertype });
        OpeningAssetsView.variables.dx_ddlVoucherType.option({ disabled: true });
        OpeningAssetsView.variables.dx_txtDueDays.option({ value: rowData.duedays });
        OpeningAssetsView.variables.dx_ExpenseAcc.option({
            items: [{ accid: rowData.assetaccid, accountname: rowData.accountname, currencycode: rowData.assetcurcode, currencyid: rowData.assetcurrenyid }],
            selectedItem: { accid: rowData.assetaccid, accountname: rowData.accountname, currencycode: rowData.assetcurcode, currencyid: rowData.assetcurrenyid },
            value: rowData.accountname
        });
        OpeningAssetsView.variables.dx_PartyAcc.option({
            items: [{ accid: rowData.partyaccid, accountname: rowData.partyaccname, currencycode: rowData.partycurcode, currencyid: rowData.partycurrencyid }],
            selectedItem: { accid: rowData.partyaccid, accountname: rowData.partyaccname, currencycode: rowData.partycurcode, currencyid: rowData.partycurrencyid },
            value: rowData.partyaccname
        });
        OpeningAssetsView.BindAccountBalance();
        OpeningAssetsView.BindAccountReceiveBalance();
        $("#spanExpenseCurr").html(OpeningAssetsView.variables.dx_ExpenseAcc.option().selectedItem.currencycode);
        $("#spanReceiveCurr").html(OpeningAssetsView.variables.dx_PartyAcc.option().selectedItem.currencycode);
        OpeningAssetsView.variables.dx_txtExchangeRate.option({ value: rowData.exchangerate });
        OpeningAssetsView.variables.dx_taxProfile.option({ value: rowData.taxprofileid });
        OpeningAssetsView.variables.dx_txtBillNo.option({ value: rowData.partybillno });
        OpeningAssetsView.variables.dx_txtRemarks.option({ value: rowData.remark });
        OpeningAssetsView.variables.txtTaxableAmount.option({ value: rowData.totaltaxableamt.toFixed(2) });
        //OpeningAssetsView.variables.txtAmountWithTax.option({ value: rowData.totalamtwithtax.toFixed(2) });
        OpeningAssetsView.variables.txtRoundOff.option({ value: rowData.roundoffvalue.toFixed(2) });
        OpeningAssetsView.variables.txtTotalAmount.option({ value: rowData.totalbillamt.toFixed(2) });
        OpeningAssetsView.variables.txtTotalAmountinRs.option({ value: rowData.totalbillamt.toFixed(2) });
        //if (rowData.virtualfilename) {
        //    $("#lnkAttachFilePreview").attr("FileName", "/UploadFiles/GeneralExpense/" + rowData.virtualfilename);
        //    $("#lnkAttachFilePreview").html(rowData.actualfilename);
        //    $("#hdnOldAttachFile").val("/UploadFiles/GeneralExpense/" + rowData.virtualfilename);
        //}

        if (OpeningAssetsView.variables.dx_PartyAcc.option().selectedItem.currencycode == "INR")
            OpeningAssetsView.variables.dx_txtExchangeRate.option({ disabled: true });
        if (rowData.roundofftype == "Add")
            $("#rd_Add").prop("checked", true);
        else

            $("#rd_Less").prop("checked", true);
        OpeningAssetsView.variables.dx_bookType.option({ disabled: true });


        //---------------------------------------------Get OPeningAssets Details----------------------------------------------------

        var myfilter = { rules: [] };
        myfilter.rules.push({ field: "OA_Id", op: "eq", data: id });
        $.ajax({
            url: getDomain() + "/Common/BindMastersDetails?ServiceName=ACC_OPENINGASSETS_DETAIL_GET&myfilters=" + JSON.stringify(myfilter),
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
                            OpeningAssetsView.AddNewLineDetails(obj);
                            if (obj.taxdetaillist) {
                                var tempTaxList = [];
                                if (obj.taxdetaillist.taxdetails.length) {
                                    tempTaxList = obj.taxdetaillist.taxdetails;
                                }
                                else {
                                    tempTaxList.push(obj.taxdetaillist.taxdetails);
                                }

                                $.each(tempTaxList, function (key1, obj1) {
                                    OpeningAssetsView.variables.taxlist.push({
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
                        //OpeningAssetsView.variables.txtTotalBillAmount.option({ value: TotalBillAmt.toFixed(2) });
                        //OpeningAssetsView.variables.txtPaidAmount.option({ value: TotalPaidAmt.toFixed(2) });
                        //OpeningAssetsView.variables.txtPandingAmount.option({ value: TotalPendingAmt.toFixed(2) });

                        //OpeningAssetsView.GetpaidAmount();
                    }
                }
                else {
                    DevExVariables.InvalidResponseCode(data);
                }
            },
            error: OnError
        });
        //---------------------------------------------/Get OPeningAssetss Details----------------------------------------------------

        OpeningAssetsView.EndingTotalAmount();
        //OpeningAssetsView.CalcItemwiseAmt();

        //----------------------------------------------Get Attachment in Edit Time-------------------------------------------------
        $("#AttachmentsList").show();
        $('#tbody_AttachmentsList').html("");
        var myfilter = { rules: [] };
        myfilter.rules.push({ field: "OA_Id", op: "eq", data: id });
        $.ajax({
            url: getDomain() + "/Common/BindMastersDetails?ServiceName=ACC_OPENINGASSETS_FILES_GET&myfilters=" + JSON.stringify(myfilter),
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
                                    '<a class="btn btn-info" href="' + getDomain() + '/UploadFiles/OpeningAssets/' + obj.filename + '" target="blank"><i class="fa fa-eye"></i></a>' +
                                '</td>' +
                                '<td class="Description">' +
                                    '<input type="text" class="form-control" value="' + obj.description + '" placeholder="Description">' +
                                '</td>' +
                                '<td class="text-center">' +
                                    '<a href="javascript:void(0);" onclick="OpeningAssetsView.deleteAttachment(\'' + file + '\',\'' + obj.filename + '\');" class="btn btn-danger"><i class="fa fa-trash"></i></a>' +
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
            OpeningAssetsView.variables.dx_btnSubmit.option({ visible: true });
        }
        else {
            OpeningAssetsView.variables.dx_btnSubmit.option({ visible: false });
        }

    },

    AddNewLineDetails: function (obj) {
        var postfix = OpeningAssetsView.variables.RowCount;

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
                    //+ '<td>'
                    //    + '<div id="dx_TotalTax' + postfix + '" ></div>'
                    //+ '</td>'
                    //+ '<td>'
                    //    + '<div id="dx_AmtWithTax' + postfix + '" ></div>'
                    //+ '</td>'
                    + '<td class="text-center">'
                        + '<span class="btn btn-danger" onClick="OpeningAssetsView.RemoveDetailRow(this)"><i class="fa fa-trash-o"></i></span>'
                    + '</td>'
                + '</tr>'
            );

        /*----------------------Registration of Detail table controls---------------------*/
        OpeningAssetsView.DetailTableFormInit(postfix, obj);
        /*----------------------Registration of Detail table controls---------------------*/

        OpeningAssetsView.variables.RowCount = postfix + 1  
    },

    DetailTableFormInit: function (postfix, obj) {
        /*----------------------Registration of Detail table controls---------------------*/
        var tmp = [];
        tmp[postfix] = { srno: postfix, dx_txtItemName: "", dx_ddlUnit: "", dx_WarrantyDate: "", dx_Quantity: "", dx_Weight: "", dx_Rate: "", dx_Discount: "", dx_TotalAmt: "", dx_TotalTax: "", dx_AmtWithTax: "" };

        OpeningAssetsView.variables.DetailsControlsList = Object.assign(OpeningAssetsView.variables.DetailsControlsList, tmp);

        OpeningAssetsView.variables.DetailsControlsList[postfix].dx_txtItemName = $("#dx_txtItemName" + postfix).dxAutocomplete({
            dataSource: OpeningAssetsView.variables.ItemList,
            placeholder: "Item Name...",
            valueExpr: "itemname",
            onItemClick: function (data) {
                //OpeningAssetsView.ToasterSelectTaxProfile();
                if (data.component.option().selectedItem) {
                    $("[rowno='" + postfix + "']").find('.ItemType').html(data.component.option().selectedItem.rmsubcate)
                    $("[rowno='" + postfix + "']").find('.HSNCode').html(data.component.option().selectedItem.hsncode)
                }
                OpeningAssetsView.CalcItemwiseAmt(postfix);
            },
        }).dxValidator({
            validationGroup: "OpeningAssets",
            validationRules: [{
                type: "required",
                message: "Category is required"
            }]
        }).dxAutocomplete("instance");

        OpeningAssetsView.variables.DetailsControlsList[postfix].dx_ddlUnit = $("#dx_ddlUnit" + postfix).dxSelectBox({
            dataSource: ['Kg', 'Gram', 'Meter', 'Feet', 'Pices', 'Dozen', 'Fix'],
            placeholder: "Select Unit...",
            searchEnabled: true,
            onItemClick: function (data) {
                OpeningAssetsView.CalcItemwiseAmt(postfix);
            },
            onFocusOut: function (data) {
            },
        }).dxValidator({
            validationGroup: "OpeningAssets",
            validationRules: [{
                type: "required",
                message: "Unit is required"
            }]
        }).dxSelectBox("instance");

        OpeningAssetsView.variables.DetailsControlsList[postfix].dx_WarrantyDate = $("#dx_WarrantyDate" + postfix).dxDateBox({
            type: "date",
            //value: now,
            showClearButton: true,
            useMaskBehavior: true,
            displayFormat: "dd MMM yyyy"
        }).dxDateBox("instance");

        OpeningAssetsView.variables.DetailsControlsList[postfix].dx_Quantity = $("#dx_Quantity" + postfix).dxTextBox({
            mode: "number",
            onKeyDown: function (e) {
            },
            onFocusOut: function (data) {
                OpeningAssetsView.CalcItemwiseAmt(postfix);
            },
        }).dxValidator({
            validationRules: [{
                type: "required",
                message: "Width is required"
            }]
        }).dxTextBox("instance");

        OpeningAssetsView.variables.DetailsControlsList[postfix].dx_Weight = $("#dx_Weight" + postfix).dxTextBox({
            mode: "number",
            onKeyDown: function (e) {
            },
            onFocusOut: function (data) {
                OpeningAssetsView.CalcItemwiseAmt(postfix);
            },
        }).dxTextBox("instance");

        OpeningAssetsView.variables.DetailsControlsList[postfix].dx_Rate = $("#dx_Rate" + postfix).dxTextBox({
            mode: "number",
            onKeyDown: function (e) {
            },
            onFocusOut: function (data) {
                OpeningAssetsView.CalcItemwiseAmt(postfix);
            },
        }).dxValidator({
            validationGroup: "OpeningAssets",   
            validationRules: [{
                type: "required",
                message: "Width is required"
            }]
        }).dxTextBox("instance");

        OpeningAssetsView.variables.DetailsControlsList[postfix].dx_Discount = $("#dx_Discount" + postfix).dxTextBox({
            mode: "number",
            onKeyDown: function (e) {
            },
            onFocusOut: function (data) {
                OpeningAssetsView.CalcItemwiseAmt(postfix);
            },
        }).dxTextBox("instance");

        OpeningAssetsView.variables.DetailsControlsList[postfix].dx_TotalAmt = $("#dx_TotalAmt" + postfix).dxTextBox({
            readOnly: true,
            mode: "number",
        }).dxValidator({
            validationRules: [{
                type: "required",
                message: "Pcs is required"
            }]
        }).dxTextBox("instance");

        //OpeningAssetsView.variables.DetailsControlsList[postfix].dx_TotalTax = $("#dx_TotalTax" + postfix).dxTextBox({
        //    readOnly: true,
        //    mode: "number",
        //    onKeyDown: function (e) {
        //    },
        //    onFocusOut: function (data) {
        //    },
        //}).dxValidator({
        //    validationRules: [{
        //        type: "required",
        //        message: "Width is required"
        //    }]
        //}).dxTextBox("instance");

        //OpeningAssetsView.variables.DetailsControlsList[postfix].dx_AmtWithTax = $("#dx_AmtWithTax" + postfix).dxTextBox({
        //    readOnly: true,
        //    mode: "number",
        //    onKeyDown: function (e) {
        //    },
        //    onFocusOut: function (data) {
        //    },
        //}).dxValidator({
        //    validationRules: [{
        //        type: "required",
        //        message: "Width is required"
        //    }]
        //}).dxTextBox("instance");

        /*----------------------Registration of Detail table controls---------------------*/

        /*----------------------Set Value of Detail table controls while Edit---------------------*/
        if (obj) {
            OpeningAssetsView.variables.DetailsControlsList[postfix].dx_txtItemName.option({
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
            OpeningAssetsView.variables.DetailsControlsList[postfix].dx_ddlUnit.option({ value: obj.unit })
            OpeningAssetsView.variables.DetailsControlsList[postfix].dx_WarrantyDate.option({ value: obj.warrantydate })
            OpeningAssetsView.variables.DetailsControlsList[postfix].dx_Quantity.option({ value: obj.quantity });
            OpeningAssetsView.variables.DetailsControlsList[postfix].dx_Weight.option({ value: obj.weight });
            OpeningAssetsView.variables.DetailsControlsList[postfix].dx_Rate.option({ value: obj.rate });
            OpeningAssetsView.variables.DetailsControlsList[postfix].dx_Discount.option({ value: obj.discount });
            OpeningAssetsView.variables.DetailsControlsList[postfix].dx_TotalAmt.option({ value: obj.totaltaxable });
            //OpeningAssetsView.variables.DetailsControlsList[postfix].dx_TotalTax.option({ value: obj.totaltax });
            //OpeningAssetsView.variables.DetailsControlsList[postfix].dx_AmtWithTax.option({ value: obj.totalamtwithtax });
        }
        /*----------------------Set Value of Detail table controls while Edit---------------------*/

    },

    RemoveDetailRow: function (obj) {
        $(obj).closest("tr").remove();
        delete OpeningAssetsView.variables.DetailsControlsList[$(obj).closest("tr").attr("rowno")];
        OpeningAssetsView.variables.taxlist = OpeningAssetsView.variables.taxlist.filter(function (x) { return x.rownum != $(obj).closest("tr").attr("rowno") });
        OpeningAssetsView.EndingTotalAmount();
        OpeningAssetsView.calcRoundOff();
    },

    deleteRow: function (id) {
        var rowData = OpeningAssetsView.variables.dx_dataGrid.getVisibleRows()[OpeningAssetsView.variables.dx_dataGrid.getRowIndexByKey(+id)].data;
        OpeningAssetsView.variables.Masterid = id;
        OpeningAssetsView.variables.DeleteDataObj = rowData;
        OpeningAssetsView.variables.Oper = "Delete";

        if (OpeningAssetsView.variables.dx_popupRecordDelete) {
            OpeningAssetsView.variables.dx_popupRecordDelete.option("contentTemplate", OpeningAssetsView.variables.DeletePopUpOptions.contentTemplate(OpeningAssetsView.variables.DeleteDataObj).bind(this));
        }
        else {
            OpeningAssetsView.variables.dx_popupRecordDelete = $("#dx_popupRecordDelete").dxPopup(OpeningAssetsView.variables.DeletePopUpOptions).dxPopup("instance");
        }

        OpeningAssetsView.variables.dx_popupRecordDelete.show();
    },

    btnMasterSubmit: function () {

        //---------------------- Cashbank Currency And Expense Acc Currency Same Condition-----------------------------------------------------
        //if (OpeningAssetsView.variables.dx_PartyAcc.option().selectedItem.currencyid != OpeningAssetsView.variables.dx_ExpenseAcc.option().selectedItem.currencyid) {
        //    DevExVariables.Toaster("warning", "cash/bank account currency and Expense account currency is not same.");
        //    return;
        //}
        //---------------------- /Cashbank Currency And Expense Acc Currency Same Condition-----------------------------------------------------


        OpeningAssetsView.variables.dx_btnSubmit.option({ disabled: true });

        OpeningAssetsView.variables.Oper = 'Add';
        OpeningAssetsView.variables.addedit = "added";
        if (OpeningAssetsView.variables.Masterid != "0" && parseInt(OpeningAssetsView.variables.Masterid) > 0) {
            OpeningAssetsView.variables.Oper = 'Edit';
            OpeningAssetsView.variables.addedit = 'updated';
        }

        var xmlNodeList = '<DETAILSLIST>';
        $.each(OpeningAssetsView.variables.DetailsControlsList, function (key, obj) {
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

                    xmlNodeList += '</DETAILS>';
                }
            }
        });
        xmlNodeList += '</DETAILSLIST>';


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
            "OA_ID": OpeningAssetsView.variables.Masterid,
            "SBOOKID": OpeningAssetsView.variables.dx_bookType.option().selectedItem.sbookid,
            "VOUCHERNO": OpeningAssetsView.variables.dx_VchrNo.option().value,
            "VOUCHERDATE": OpeningAssetsView.variables.dx_txtVoucherDate.option().text,
            "PURCHASEDATE": OpeningAssetsView.variables.dx_txtPurchaseDate.option().text,
            "VOUCHERTYPE": OpeningAssetsView.variables.dx_ddlVoucherType.option().value,
            "DUEDAYS": OpeningAssetsView.variables.dx_txtDueDays.option().value,
            "ASSETACCID": OpeningAssetsView.variables.dx_ExpenseAcc.option().selectedItem.accid,
            "ASSETCURRENYID": OpeningAssetsView.variables.dx_ExpenseAcc.option().selectedItem.currencyid,
            "PARTYACCID": OpeningAssetsView.variables.dx_PartyAcc.option().selectedItem.accid,
            "PARTYCURRENCYID": OpeningAssetsView.variables.dx_PartyAcc.option().selectedItem.currencyid,
            "EXCHANGERATE": OpeningAssetsView.variables.dx_txtExchangeRate.option().value,
            "TAXPROFILEID": OpeningAssetsView.variables.dx_taxProfile.option().value,
            //"PARTYBILLNO": OpeningAssetsView.variables.dx_txtBillNo.option().value,
            "TOTALTAXABLEAMT": OpeningAssetsView.variables.txtTaxableAmount.option().value,
            "TOTALTAXABLEAMTINRS": (OpeningAssetsView.variables.txtTaxableAmount.option().value * OpeningAssetsView.variables.dx_txtExchangeRate.option().value).toFixed(2),
            //"TOTALTAXAMT": OpeningAssetsView.variables.txtTotalAmount.option().value - OpeningAssetsView.variables.txtTaxableAmount.option().value,
            //"TOTALAMTWITHTAX": OpeningAssetsView.variables.txtTotalAmount.option().value,
            //"TOTALAMTWITHTAXINRS": (OpeningAssetsView.variables.txtTotalAmount.option().value * OpeningAssetsView.variables.dx_txtExchangeRate.option().value).toFixed(2),
            "ROUNDOFFTYPE": $("[name='rd_RoundOff']:checked").val(),
            "ROUNDOFFVALUE": OpeningAssetsView.variables.txtRoundOff.option().value,
            "TOTALBILLAMT": OpeningAssetsView.variables.txtTotalAmount.option().value,
            "TOTALBILLAMTINRS": OpeningAssetsView.variables.txtTotalAmountinRs.option().value,
            XMLPARAM: escape(xmlNodeList),
            "oper": OpeningAssetsView.variables.Oper,
        }

        $.ajax({
            type: 'POST',
            async: false,
            cache: false,
            url: getDomain() + "/Common/SaveImage",
            data: {
                category: "OpeningAssets",
                deletedfiles: OpeningAssetsView.variables.deletedFiles,
                savefiles: saveFiles
            },
            success: function (result) {
            },
            error: OnError
        });
        //-----------------------/save attachment-------------------------

        if (OpeningAssetsView.variables.dx_txtBillNo.option().value)
            data.PARTYBILLNO = OpeningAssetsView.variables.dx_txtBillNo.option().value;

        if (OpeningAssetsView.variables.dx_txtRemarks.option().value)
            data.REMARK = OpeningAssetsView.variables.dx_txtRemarks.option().value;

        OpeningAssetsView.savedata(data);

    },

    savedata: function (data) {
        $.ajax({
            url: getDomain() + OpeningAssetsView.variables.PerformMasterOperationUrl,
            data: data,
            async: true,
            cache: false,
            type: 'POST',
            beforeSend: function () {
                dx_LoaderTrinity.show();
            },
            complete: function () {
                dx_LoaderTrinity.hide();
                OpeningAssetsView.variables.dx_btnSubmit.option({ disabled: false });
            },
            success: OpeningAssetsView.btnMasterSubmitOnSuccess,
            error: OnError,
        });
    },

    BindSubBookList: function () {
        var myfilter = { rules: [] };
        myfilter.rules.push({ field: "TYPE", op: "eq", data: "AccSubBook" });
        myfilter.rules.push({ field: "SUBBOOK", op: "eq", data: 'Opning Assets' });
        myfilter.rules.push({ field: "ONLYALLOWED", op: "eq", data: true });

        $.ajax({
            url: getDomain() + OpeningAssetsView.variables.BindStaticDataUrl + "&myfilters=" + JSON.stringify(myfilter),
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

                        OpeningAssetsView.variables.dx_bookType.option({
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

    BindTaxProfile: function () {
        var myfilter = { rules: [] };
        myfilter.rules.push({ field: "ISACTIVE", op: "eq", data: true });

        $.ajax({
            url: getDomain() + OpeningAssetsView.variables.BindTaxProfile + "&IsRecordAll=true&myfilters=" + JSON.stringify(myfilter),
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

                        OpeningAssetsView.variables.dx_taxProfile.option({
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

    GetItemList: function () {
        var myfilter = { rules: [] };
        myfilter.rules.push({ field: "RMSUBCATE", op: "eq", data: "ASSETS"});
        $.ajax({
            url: getDomain() + OpeningAssetsView.variables.BindItemMaster + "&myfilters=" + JSON.stringify(myfilter),
            async: true,
            cache: false,
            type: 'POST',
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    var JsonObject = xml2json.parser(data);

                    if (JsonObject.serviceresponse.detailslist) {
                        if (JsonObject.serviceresponse.detailslist.details.length) {
                            OpeningAssetsView.variables.ItemList = JsonObject.serviceresponse.detailslist.details;
                        }
                        else {
                            OpeningAssetsView.variables.ItemList.push(JsonObject.serviceresponse.detailslist.details);
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

    btnMasterSubmitOnSuccess: function (data) {
        if ($(data).find('RESPONSECODE').text() == "0") {
            DevExVariables.Toaster("success", 'Record is Added successfully.');
            $("#frm_Purchase_Expence").hide();
            $("#pnlView").show();
            DevExpress.validationEngine.resetGroup("OpeningAssets");
            OpeningAssetsView.ClearValues();
            OpeningAssetsView.variables.dx_dataGrid.refresh();
        }
        else {
            DevExVariables.InvalidResponseCode(data);
        }
    },

    CalcItemwiseAmt: function (postfix) {

        var Rate = 0, Qty = 0, Weight = 0, Disc = 0, TotalTaxableAmt = 0, TotalTax = 0, AmtWithTax = 0, temptax = 0;
        Rate = +OpeningAssetsView.variables.DetailsControlsList[postfix].dx_Rate.option().value;
        Qty = +OpeningAssetsView.variables.DetailsControlsList[postfix].dx_Quantity.option().value;
        Weight = +OpeningAssetsView.variables.DetailsControlsList[postfix].dx_Weight.option().value;
        Disc = +OpeningAssetsView.variables.DetailsControlsList[postfix].dx_Discount.option().value;

        if (['Kg', 'Gram'].indexOf(OpeningAssetsView.variables.DetailsControlsList[postfix].dx_ddlUnit.option().value) !== -1) {

            TotalTaxableAmt = (Rate * Weight) - Disc;
            OpeningAssetsView.variables.DetailsControlsList[postfix].dx_TotalAmt.option({ value: (TotalTaxableAmt.toFixed(2)) });

        }
        else if (['Fix'].indexOf(OpeningAssetsView.variables.DetailsControlsList[postfix].dx_ddlUnit.option().value) !== -1) {

            TotalTaxableAmt = Rate - Disc;
            OpeningAssetsView.variables.DetailsControlsList[postfix].dx_TotalAmt.option({ value: (TotalTaxableAmt.toFixed(2)) });

        }
        else {

            TotalTaxableAmt = (Rate * Qty) - Disc;
            OpeningAssetsView.variables.DetailsControlsList[postfix].dx_TotalAmt.option({ value: (TotalTaxableAmt.toFixed(2)) });

        }

        OpeningAssetsView.variables.taxlist = OpeningAssetsView.variables.taxlist.filter(function (x) { return x.rownum != postfix });

        if (OpeningAssetsView.variables.DetailsControlsList[postfix].dx_txtItemName.option().selectedItem.taxdetaillist) {
            var List = [];
            if (OpeningAssetsView.variables.DetailsControlsList[postfix].dx_txtItemName.option().selectedItem.taxdetaillist) {
                if (OpeningAssetsView.variables.DetailsControlsList[postfix].dx_txtItemName.option().selectedItem.taxdetaillist.taxdetails.length > 0)
                    List = OpeningAssetsView.variables.DetailsControlsList[postfix].dx_txtItemName.option().selectedItem.taxdetaillist.taxdetails;
                else
                    List.push(OpeningAssetsView.variables.DetailsControlsList[postfix].dx_txtItemName.option().selectedItem.taxdetaillist.taxdetails);
            }

            $.each(List, function (key, obj) {
                if (OpeningAssetsView.variables.dx_taxProfile.option().selectedItem) {
                    if (OpeningAssetsView.variables.dx_taxProfile.option().selectedItem.taxdetaillist) {
                        temptax = 0;

                        if (OpeningAssetsView.variables.dx_taxProfile.option().selectedItem.taxdetaillist.taxdetails.filter(function (x) { return x.taxid == obj.taxid }).length > 0) {
                            if (obj.taxvaluein == "Percentage(%)") {
                                temptax = (TotalTaxableAmt * obj.taxvalue / 100);
                                TotalTax += temptax;
                            }
                            else {
                                temptax = obj.taxvalue;
                                TotalTax += temptax;
                            }
                            OpeningAssetsView.variables.taxlist.push({
                                rownum: postfix,
                                HSNCodeId: OpeningAssetsView.variables.DetailsControlsList[postfix].dx_txtItemName.option().selectedItem.itemid,
                                HSNCode: OpeningAssetsView.variables.DetailsControlsList[postfix].dx_txtItemName.option().selectedItem.hsncode,
                                TaxableAmt: TotalTaxableAmt,
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
        OpeningAssetsView.variables.txtTaxableAmount.option({ value: (TotalTaxableAmt).toFixed(2) });
        //OpeningAssetsView.variables.DetailsControlsList[postfix].dx_TotalTax.option({ value: (TotalTax).toFixed(2) });
        //AmtWithTax = TotalTaxableAmt + TotalTax;
        //OpeningAssetsView.variables.DetailsControlsList[postfix].dx_AmtWithTax.option({ value: (AmtWithTax.toFixed(2)) });
        OpeningAssetsView.EndingTotalAmount();
        OpeningAssetsView.calcRoundOff();

    },

    EndingTotalAmount: function () {
        var TaxableAmt = 0, TotalTaxAmt = 0, TotalTaxWithAmt = 0;
        $.each(OpeningAssetsView.variables.DetailsControlsList, function (key, obj) {
            if (OpeningAssetsView.variables.DetailsControlsList[key]) {
                TaxableAmt += +OpeningAssetsView.variables.DetailsControlsList[key].dx_TotalAmt.option().value;
                //TotalTaxAmt += +OpeningAssetsView.variables.DetailsControlsList[key].dx_TotalTax.option().value;
                //TotalTaxWithAmt += +OpeningAssetsView.variables.DetailsControlsList[key].dx_AmtWithTax.option().value;
            }
        });

        OpeningAssetsView.variables.txtTaxableAmount.option({ value: TaxableAmt.toFixed(2) });
        //OpeningAssetsView.variables.DetailsControlsList[postfix].option({ value: TotalTaxAmt.toFixed(2) });
        //OpeningAssetsView.variables.txtAmountWithTax.option({ value: TotalTaxWithAmt.toFixed(2) });

        //$(".divTax").remove();
        //if (OpeningAssetsView.variables.taxlist) {
        //    var tempTaxList = "";
        //    var temparray = [];
        //    var index = 0;
        //    $.each(OpeningAssetsView.variables.taxlist, function (key, obj) {
        //        if (temparray.filter(function (x) { return x.taxname == obj.TaxName }).length == 0) {
        //            //temparray [obj.TaxName] = 0;
        //            temparray.push({ taxname: obj.TaxName, taxamt: 0 });
        //        }
        //        index = temparray.findIndex(function (x) { return x.taxname == obj.TaxName });
        //        temparray[index].taxamt = temparray[index].taxamt + obj.TaxAmt;
        //    });

        //    $.each(temparray, function (key, obj) {
        //        tempTaxList += '<div class="form-group divTax">'
        //                        + '<label class="control-label col-lg-3 col-lg-offset-7">' + obj.taxname + '</label>'
        //                        + '<div class="col-lg-2">'
        //                            + '<input type="text" class="form-control text-right" name="txt_' + obj.taxname + '" id="txt_' + obj.taxname + '" value="' + obj.taxamt.toFixed(2) + '" readonly />'
        //                        + '</div>'
        //                    + '</div>';
        //    });

        //    $(tempTaxList).insertBefore("#div_AmountWithTax");
        OpeningAssetsView.variables.txtTotalAmountinRs.option({ value: (OpeningAssetsView.variables.txtTotalAmount.option().value * OpeningAssetsView.variables.dx_txtExchangeRate.option().value).toFixed(2) });
            $("#dx_FooterTotalTaxable").html(TaxableAmt.toFixed(2));
        //    $("#dx_FooterTotaltax").html(TotalTaxAmt.toFixed(2));
        //    $("#dx_FooterTotalAmtWithtax").html(TotalTaxWithAmt.toFixed(2));
        //}
    },

    calcRoundOff: function () {
        var Amt = OpeningAssetsView.variables.txtTaxableAmount.option().value;
        var FinalAmt = 0, RoundOff = 0, ExRate = 1;;
        if ($("[name='rd_RoundOff']:checked").val() == "Add") {
            FinalAmt = Math.ceil(Amt);
        }
        else {
            FinalAmt = Math.floor(Amt);
        }

        RoundOff = Math.abs(Amt - FinalAmt);

        OpeningAssetsView.variables.txtRoundOff.option({ value: RoundOff.toFixed(2) });
        OpeningAssetsView.variables.txtTotalAmount.option({ value: FinalAmt.toFixed(2) });
        OpeningAssetsView.variables.txtTotalAmountinRs.option({ value: (FinalAmt * OpeningAssetsView.variables.dx_txtExchangeRate.option().value).toFixed(2) });

        OpeningAssetsView.OnChangeExchangeRate();
    },

    OnChangeExchangeRate: function () {
        var ExRate = OpeningAssetsView.variables.dx_txtExchangeRate.option().value;
        var FinalAmt = OpeningAssetsView.variables.txtTotalAmount.option().value || 0;
        OpeningAssetsView.variables.txtTotalAmountinRs.option({ value: (FinalAmt * ExRate).toFixed(2) });
    },

    ClearValues: function ()     {
        OpeningAssetsView.variables.Masterid = "";
        OpeningAssetsView.variables.Oper = 'Add';
        OpeningAssetsView.variables.addedit = "added";
        OpeningAssetsView.variables.DeleteDataObj = "";
        OpeningAssetsView.variables.dx_bookType.option("value", "");
        DevExpress.validationEngine.resetGroup("OpeningAssets");
        OpeningAssetsView.variables.dx_bookType.option({ disabled: false });
        OpeningAssetsView.variables.dx_txtVoucherDate.option({ value: new Date() });
        OpeningAssetsView.variables.dx_txtPurchaseDate.option({ value: new Date() });
        OpeningAssetsView.variables.dx_VchrNo.option("value", "");
        //OpeningAssetsView.variables.dx_ddlVoucherType.option("value", "");
        OpeningAssetsView.variables.dx_txtDueDays.option("value", "");
        //OpeningAssetsView.variables.dx_txtDueDate.option("value", "");
        OpeningAssetsView.variables.dx_ExpenseAcc.option("value", "");
        OpeningAssetsView.variables.dx_PartyAcc.option("value", "");
        OpeningAssetsView.variables.dx_txtRemarks.option("value", "");
        OpeningAssetsView.variables.dx_taxProfile.option("value", "");
        OpeningAssetsView.variables.dx_txtBillNo.option("value", "");
        OpeningAssetsView.variables.dx_txtExchangeRate.option("value", "");
        OpeningAssetsView.variables.txtTaxableAmount.option("value", "");
        //OpeningAssetsView.variables.txtAmountWithTax.option("value", "");
        OpeningAssetsView.variables.txtRoundOff.option("value", "");
        OpeningAssetsView.variables.txtTotalAmount.option("value", "");
        OpeningAssetsView.variables.txtTotalAmountinRs.option("value", "");
        OpeningAssetsView.variables.dx_btnSubmit.option({ visible: true });
        OpeningAssetsView.variables.dx_txtExchangeRate.option({ disabled: false });



        $("#spanExpenseCurr").html("");
        $("#spanReceiveCurr").html("");
        $("#dx_FooterTotalTaxable").html("");
        $("#dx_FooterTotaltax").html("");
        $("#dx_FooterTotalAmtWithtax").html("");

        OpeningAssetsView.variables.taxlist = [];
        OpeningAssetsView.variables.taxprofilelist = [];
        OpeningAssetsView.variables.DetailsControlsList = [],
        OpeningAssetsView.variables.RowCount = 1;
        OpeningAssetsView.variables.deletedFiles = "";
        $(".divTax").remove();
        $("#frm_Purchase_Expence").hide();
        $("#pnlView").show();
        $("#tbl_DesignDetails tbody").html("");
        $("#tbody_AttachmentsList").html("");
        OpeningAssetsView.variables.dx_ddlVoucherType.option({ value: OpeningAssetsView.variables.VoucherTypeList[1] });
        OpeningAssetsView.variables.dx_ddlVoucherType.option({ disabled: false });
        $("#btnAddSelectionList").html("0.00");
        $("#btnAddSelectionRecieveList").html("0.00");

        OpeningAssetsView.variables.dx_dataGrid.refresh();

    },

    EditFromGrid: function (val, id, type) {
        var data = {
            "OA_ID": id,
            "OPER_TYPE": "EditFromGrid",
            "oper": "Edit"
        }
        if (type == "Verify")
            data.ISVERIFY = val;
        $.ajax({
            url: getDomain() + OpeningAssetsView.variables.PerformMasterOperationUrl,
            data: data,
            async: true,
            cache: false,
            type: 'POST',
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    DevExVariables.Toaster("success", 'Record is updated successfully.');
                    OpeningAssetsView.variables.dx_dataGrid.refresh();
                }
            },
            error: OnError,
        });
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
        OpeningAssetsView.variables.deletedFiles += file + ',';
        $('#' + rid).remove();
        $('.tooltip').remove();
    },

    ClearShareItemControlls: function () {
        OpeningAssetsView.variables.dx_txtSharetoPartyList.option({ "value": "" }, { "items": "" }, { "selectedItem": "" });
        OpeningAssetsView.variables.dx_RadioSocial.option({ value: "WhatsApp" });
        OpeningAssetsView.variables.dx_txtShareMessage.option({ value: 'Dear Sir, ' + $("#hdn_UserName").val() + ' shared a design from TrinityJewells with you. Kindly click on below URL to view shared Design. {SHARE URL}' });
        OpeningAssetsView.variables.dx_txtSharingSubject.option({ value: "Jewellery Designs shared by TrinityJewells" });
        OpeningAssetsView.variables.dx_txtSharingEmailBody.option({ value: OpeningAssetsView.variables.content });
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
        var Type = OpeningAssetsView.variables.dx_RadioSocial.option().value;
        if (Type == "E-Mail") {
            if (!OpeningAssetsView.variables.dx_txtSharingEmailId.option().value || !OpeningAssetsView.variables.dx_txtSharingSubject.option().value || !OpeningAssetsView.variables.dx_txtSharingEmailBody.option().value) {
                DevExVariables.Toaster("warning", "Email Id, Subject and Email Body are required.");
                return false;
            }
        }
        else {
            if (!OpeningAssetsView.variables.dx_txtMobileNo.option().value || !OpeningAssetsView.variables.dx_txtShareMessage.option().value) {
                DevExVariables.Toaster("warning", "Mobile No and Message are required.");
                return false;
            }
        }
        var SelectedDesignList = [], MobileNo = "", MSG = "", Mailbody = "", MailId = "", Suject = "";

        if (Type == "E-Mail") {
            MailId = OpeningAssetsView.variables.dx_txtSharingEmailId.option().value;
            Suject = OpeningAssetsView.variables.dx_txtSharingSubject.option().value;
            Mailbody = OpeningAssetsView.variables.dx_txtSharingEmailBody.option().value;
        }
        else if (Type == "SMS") {
            MobileNo = OpeningAssetsView.variables.dx_txtMobileNo.option().value;
            MSG = OpeningAssetsView.variables.dx_txtShareMessage.option().value;
        }
        else {
            MSG = OpeningAssetsView.variables.dx_txtShareMessage.option().value;
        }

        var ShareLink = getDomain() + "/Sharing/VoucherView?VoucherId=" + OpeningAssetsView.variables.Masterid + "/VoucherType=OpeningAssets";
        var message = "";
        if (Type == "E-Mail") {
            message = Mailbody.replace("{SHARE URL}", '<a href="' + ShareLink + '" target="_blank">Click here...</a>');
        }
        else {
            message = MSG.replace("{SHARE URL}", ShareLink);
        }
        var result = OpeningAssetsView.ShareSocialMedia(Type, MobileNo, message, MailId, Suject);

        $("#ModalSharing").modal("hide");
    },

    BindAccountBalance: function () {
        var myfilter = { rules: [] };
        myfilter.rules.push({ field: "ACCID", op: "eq", data: OpeningAssetsView.variables.dx_ExpenseAcc.option().selectedItem.accid });
        myfilter.rules.push({ field: "ASONDATE", op: "eq", data: OpeningAssetsView.variables.dx_txtVoucherDate.option().text });

        $.ajax({
            url: getDomain() + OpeningAssetsView.variables.BindAccountbalancelist + "&myfilters=" + JSON.stringify(myfilter),
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
        myfilter.rules.push({ field: "ACCID", op: "eq", data: OpeningAssetsView.variables.dx_PartyAcc.option().selectedItem.accid });
        myfilter.rules.push({ field: "ASONDATE", op: "eq", data: OpeningAssetsView.variables.dx_txtVoucherDate.option().text });

        $.ajax({
            url: getDomain() + OpeningAssetsView.variables.BindAccountbalancelist + "&myfilters=" + JSON.stringify(myfilter),
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
    OpeningAssetsView.FormInitialize();
    OpeningAssetsView.initializeDevExgrid();
    OpeningAssetsView.BindTaxProfile();
    OpeningAssetsView.BindSubBookList();
    OpeningAssetsView.GetItemList();

    $("#lnk_AddNewRow").click(function () {
        OpeningAssetsView.AddNewLineDetails();
    });

    $("[name='rd_RoundOff']").change(function () {
        OpeningAssetsView.calcRoundOff();
    });
    //----------------------------attachment--------------------------------------------
    OpeningAssetsView.RegisterFileUpload('inputCADFile', 'lnkCADFilePreview', "#ItemimgError");

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
                        '<a href="javascript:void(0);" onclick="OpeningAssetsView.deleteAttachment(\'' + file + '\',\'' + strHref + '\');" class="btn btn-danger"><i class="fa fa-trash"></i></a>' +
                    '</td>' +
                '</tr>');
            }
        });

        $('#modalUpload').modal('hide');
    });

    if (+$("#hdnSBOOKID").val()) {
        $("#pnlView").hide();
        $("#frm_Purchase_Expence").show();
        OpeningAssetsView.variables.Masterid = "";

        OpeningAssetsView.variables.dx_bookType.option({ value: +$("#hdnSBOOKID").val() });
        OpeningAssetsView.variables.dx_bookType.option({ disabled: true });
    }

});

function VoucherShare(id) {

    OpeningAssetsView.variables.Masterid = id;
    $("#ModalSharing").modal('show');
} 