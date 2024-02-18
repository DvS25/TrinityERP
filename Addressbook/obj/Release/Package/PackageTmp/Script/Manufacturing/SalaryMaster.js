var SalaryMasterView = {

    variables: {
        BindAccListUrl: "/Common/BindMastersDetails?ServiceName=ACCOUNTMASTER_GET",
        PerformMasterOperationUrl: "/Common/OpeartionsOnMaster?ServiceName=ACC_SALARY_MASTER_CRUD",
        BindTaxProfile: "/Common/BindMastersDetails?ServiceName=ACC_TAXPROFILE_GET",
        BindJewelleryItemDetailsUrl: "/Common/BindMastersDetails?ServiceName=ACC_JEWELLERYTRANSACTION_ITEMS_LIST_GET",
        BindMainGridListUrl: "/Common/BindMastersDetails?ServiceName=ACC_SALARY_MASTER_GET",
        BindStaticDataUrl: "/Common/BindMastersDetails?ServiceName=STATIC_MASTER_GET&IsActive=true",
        BindItemMaster: "/Common/BindMastersDetails?ServiceName=ACC_ITEMMASTER_GET",
        BindDetailListUrl: "/Common/BindMastersDetails?ServiceName=ACC_SALARYDETAILS_GET",

        Oper: 'Add',
        addedit: "added",
        Masterid: "",
        DeleteDataObj: "",
        RowCount: 1,
        DetailsControlsList: [],
        taxlist: [],
        dx_txtItemName: '',
        taxprofilelist: [],
        ItemList :[],

        /*------------------------variables for main form Controls-----------------------*/
        dx_popupRecordDelete: "",
        DeleteDataObj: "",
        DeletePopUpOptions: {
            width: 300,
            height: 200,
            contentTemplate: function () {
                return $("<div />").append(
                    $("<p>Voucher No: <span>" + SalaryMasterView.variables.DeleteDataObj.voucherno + "</span></p>"
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
                            "SM_ID": SalaryMasterView.variables.Masterid,
                            "oper": SalaryMasterView.variables.Oper,
                        }
                        $.ajax({
                            url: getDomain() + SalaryMasterView.variables.PerformMasterOperationUrl,
                            data: data,
                            async: true,
                            cache: false,
                            type: 'POST',
                            success: function (data) {
                                if ($(data).find('RESPONSECODE').text() == "0") {
                                    DevExVariables.Toaster("success", 'Record is deleted successfully');

                                    SalaryMasterView.variables.dx_popupRecordDelete.hide();
                                    SalaryMasterView.variables.dx_dataGrid.refresh();
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
        MonthList: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        MonthDaysList: [28, 29, 30, 31],
        dx_bookType: "",
        dx_VoucherNo: "",
        dx_txtVoucherDate: "",
        dx_txtCreditorAcc: "",
        dx_txtDueDays: "",
        dx_Month: "",
        dx_MonthDays: "",
        dx_txtTotalAmount: "",
        dx_txtRemarks: "",
        dx_taxProfile: "",
        dx_btnAddNew: "",
        dx_dataGridItems: "",
        dx_btnSubmit: "",
        dx_btnCancel: "",
        dx_txtSearch: "",
        /*------------------------/variables for main form Controls-----------------------*/

    },

    FormInitialize: function () {

        SalaryMasterView.variables.dx_bookType = $("#dx_bookType").dxSelectBox({
            placeholder: "Select Book Type...",
            searchEnabled: true,
        }).dxValidator({
            validationGroup: "SalaryMaster",
            validationRules: [{
                type: "required",
                message: "Select Book Type"
            }]
        }).dxSelectBox("instance");

        SalaryMasterView.variables.dx_VoucherNo = $("#dx_VoucherNo").dxTextBox({
            readOnly: true,
        }).dxValidator({
            validationGroup: "SalaryMaster",
            validationRules: []
        }).dxTextBox("instance");

        var now = new Date();
        SalaryMasterView.variables.dx_txtVoucherDate = $("#dx_txtVoucherDate").dxDateBox({
            type: "date",
            value: now,
            showClearButton: true,
            useMaskBehavior: true,
            displayFormat: "dd MMM yyyy",
        }).dxDateBox("instance");

        SalaryMasterView.variables.dx_txtCreditorAcc = $("#dx_txtCreditorAcc").dxAutocomplete({
            placeholder: "Select Creditor Account...",
            mode: "search",
            dataSource: new DevExpress.data.CustomStore({
                load: function (loadOptions) {
                    var deferred = $.Deferred();
                    var myfilter = { rules: [] };
                    myfilter.rules.push({ field: "HEADNAME", op: "eq", data: "Administrative Exp" });
                    $.ajax({
                        url: getDomain() + SalaryMasterView.variables.BindAccListUrl + "&_search=true&searchField=ACCOUNTNAME&searchOper=cn&searchString=" + loadOptions.searchValue + "&myfilters=" + JSON.stringify(myfilter),
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
            },
            itemTemplate: function (data) {
                return $("<div class='product-name'>" + "(" + data.partycode + ")&nbsp;" + data.accountname + "</div>");
            },
        }).dxValidator({
            validationGroup: "SalaryMaster",
            validationRules: [{
                type: "required",
                message: "Cashbank Account is required"
            }]
        }).dxAutocomplete("instance");

        SalaryMasterView.variables.dx_txtDueDays = $("#dx_txtDueDays").dxNumberBox({
            placeholder: "Enter Due Days...",
            searchEnabled: true,
        }).dxValidator({
        }).dxNumberBox("instance");

        SalaryMasterView.variables.dx_Month = $("#dx_Month").dxSelectBox({
            dataSource: SalaryMasterView.variables.MonthList,
            value: SalaryMasterView.variables.MonthList[0],
            placeholder: "Select Month ...",
            searchEnabled: true,
        }).dxValidator({
            validationGroup: "SalaryMaster",
            validationRules: [{
                type: "required",
                message: "Select Voucher Type"
            }]
        }).dxSelectBox("instance");

        SalaryMasterView.variables.dx_MonthDays = $("#dx_MonthDays").dxSelectBox({
            dataSource: SalaryMasterView.variables.MonthDaysList,
            value: SalaryMasterView.variables.MonthDaysList[3],
            placeholder: "Select Month Days...",
            searchEnabled: true,
        }).dxValidator({
            validationGroup: "SalaryMaster",
            validationRules: [{
                type: "required",
                message: "Select Voucher Type"
            }]
        }).dxSelectBox("instance");

        SalaryMasterView.variables.dx_taxProfile = $("#dx_taxProfile").dxSelectBox({
            placeholder: "Select Tax Profile...",
            searchEnabled: true,
            onValueChanged: function (data) {
            },
            onItemClick: function (e) {
            },
        }).dxValidator({
            validationGroup: "SalaryMaster",
            validationRules: [{
                type: "required",
                message: "Select tax Profile Type"
            }]
        }).dxSelectBox("instance");

        SalaryMasterView.variables.dx_txtRemarks = $("#dx_txtRemarks").dxTextArea({
            height: 110,
            placeholder: "Enter Remark"

        }).dxTextArea("instance");

        //--------------------------------------- Submit button---------------------------------------

        SalaryMasterView.variables.dx_btnSubmit = $("#dx_btnSubmit").dxButton({
            icon: "check",
            text: "Submit",
            type: "success",
            //useSubmitBehavior: true,
            onClick: function (e) {
                var validation = DevExpress.validationEngine.validateGroup("SalaryMaster");
                if (!validation.isValid) {
                    DevExVariables.Toaster("warning", "Please fill all required fields before submit.");
                    return;
                }
                SalaryMasterView.btnMasterSubmit();
            }
        }).dxButton("instance");

        //--------------------------------------- Cancle button---------------------------------------

        SalaryMasterView.variables.dx_btnCancel = $("#dx_btnCancel").dxButton({
            icon: "close",
            text: "Cancel",
            type: "danger",
            onClick: function (e) {
                $("#frm_Salary_Master").hide();
                $("#pnlView").show();
                SalaryMasterView.variables.dx_dataGrid.refresh();
                SalaryMasterView.ClearValues();
            }
        }).dxButton("instance");

        SalaryMasterView.variables.dx_btnAddNew = $("#dx_btnAddNew").dxButton({
            stylingMode: "outlined",
            icon: "plus",
            text: "Add New",
            type: "default",
            validationGroup: "SalaryMaster",
            onClick: function (e) {
                $("#frm_Salary_Master").show();
                $("#pnlView").hide();
                SalaryMasterView.variables.Masterid = "";
            }
        }).dxButton("instance");

        SalaryMasterView.variables.dx_txtSearch = $("#dx_txtSearch").dxAutocomplete({
            placeholder: "Search Creditor Account...",
            mode: "search",
            dataSource: new DevExpress.data.CustomStore({
                load: function (loadOptions) {
                    var deferred = $.Deferred();

                    var myfilter = { rules: [] };
                    myfilter.rules.push({ field: "SUBHEAD", op: "eq", data: "Employees" });

                    $.ajax({
                        url: getDomain() + SalaryMasterView.variables.BindAccListUrl + "&myfilters=" + JSON.stringify(myfilter),
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
                var valid = true;
                $("#tbl_SalaryDetails tbody tr").each(function (key, obj) {
                    if (SalaryMasterView.variables.dx_txtSearch.option().selectedItem.accid == $(obj).find('#CreditorAccId').text()) {
                        valid = false;
                        return;
                    }
                    if (SalaryMasterView.variables.dx_txtSearch.option().selectedItem.accountname == $(obj).find('#CreditorAcc').text()) {
                        valid = false;
                        return;
                    }
                });

                if (!valid) {
                    DevExVariables.Toaster("warning", "Creditor Name is Already Exist.");
                    return;
                }

                SalaryMasterView.AddNewLineDetails(SalaryMasterView.variables.dx_txtSearch.option().selectedItem.accid, SalaryMasterView.variables.dx_txtSearch.option().selectedItem.accountname);
                SalaryMasterView.variables.dx_txtSearch.option("value", "");
            },
            valueExpr: "accountname",
            itemTemplate: function (data) {
                return $("<div class='product-name'>" + "(" + data.partycode + ")&nbsp;" + data.accountname + "</div>");
            },
        }).dxAutocomplete("instance");

        //-----------------------------/End top left controls---------------------------------
        SalaryMasterView.variables.totalamt = $("#totalamt").dxTextBox({
            readOnly: true,
            inputAttr: {
                class: "text-right"
            },
        }).dxValidator({
            validationGroup: "SalaryMaster",
            validationRules: []
        }).dxTextBox("instance");

        SalaryMasterView.variables.salaryamt = $("#salaryamt").dxTextBox({
            readOnly: true,
            inputAttr: {
                class: "text-right"
            },
        }).dxValidator({
            validationGroup: "SalaryMaster",
            validationRules: []
        }).dxTextBox("instance");

        SalaryMasterView.variables.tds = $("#tds").dxTextBox({
            readOnly: true,
            inputAttr: {
                class: "text-right"
            },
        }).dxValidator({
            validationGroup: "SalaryMaster",
            validationRules: []
        }).dxTextBox("instance");

        SalaryMasterView.variables.totalpayamt = $("#totalpayamt").dxTextBox({
            readOnly: true,
            inputAttr: {
                class: "text-right"
            },
        }).dxValidator({
            validationGroup: "SalaryMaster",
            validationRules: []
        }).dxTextBox("instance");

    },

    initializeDevExgrid: function () {
        SalaryMasterView.variables.dx_dataGrid = $("#dx_dataGrid").dxDataGrid({
            dataSource: new DevExpress.data.CustomStore({
                key: "sm_id",
                load: function (loadOptions) {
                    var deferred = $.Deferred();

                    var myfilter = { rules: [] };

                    var result = DevExVariables.GetDataList(loadOptions, SalaryMasterView.variables.BindMainGridListUrl);

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
            columns: [{ dataField: "sm_id", allowFiltering: false, allowSorting: true, sortIndex: 1, sortOrder: "desc", visible: false },
                { dataField: "voucherno", caption: "Voucher No", dataType: "string", filterOperations: ["contains"], allowSorting: true, allowFiltering: true, allowHeaderFiltering: false },
                { dataField: "subbook", caption: "Book Type", dataType: "string", filterOperations: ["contains"], allowSorting: true, allowFiltering: true, allowHeaderFiltering: false },
                { dataField: "voucherdate", caption: "Voucher Date", dataType: "string", filterOperations: ["contains"], allowSorting: true, allowFiltering: true, allowHeaderFiltering: false },
                { dataField: "creditorname", caption: "Creditor Acc", dataType: "string", filterOperations: ["contains"], allowSorting: false, allowFiltering: true, allowHeaderFiltering: false },
                { dataField: "month", caption: "Month", dataType: "string", filterOperations: ["contains"], allowSorting: false, allowFiltering: true, allowHeaderFiltering: false },
                { dataField: "monthdays", caption: "Month Days", dataType: "number", filterOperations: ["contains"], allowSorting: false, allowFiltering: true, allowHeaderFiltering: false },
                { dataField: "duedays", caption: "Due Days", dataType: "number", filterOperations: ["contains"], allowSorting: false, allowFiltering: true, allowHeaderFiltering: false },
                { dataField: "remark", caption: "Remark", dataType: "number", filterOperations: ["contains"], allowSorting: false, allowFiltering: false, allowHeaderFiltering: false },
                { dataField: "totalamt", caption: "Total Amount", dataType: "number", filterOperations: ["contains"], allowSorting: false, allowFiltering: false, allowHeaderFiltering: false },
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
                                    SalaryMasterView.EditFromGrid(data.value, options.key, 'Verify');
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
                        DevExVariables.ActionTemplate(container, options, true, true, "SalaryMasterView");
                    }
                },
            ]
        }).dxDataGrid("instance");
    },

    btnMasterSubmit: function () {
        SalaryMasterView.variables.Oper = 'Add';
        SalaryMasterView.variables.addedit = "added";

        if (SalaryMasterView.variables.Masterid != "0" && parseInt(SalaryMasterView.variables.Masterid) > 0) {
            SalaryMasterView.variables.Oper = 'Edit';
            SalaryMasterView.variables.addedit = 'updated';
        }

        SalaryMasterView.variables.dx_btnSubmit.option({ disabled: true });

        var xmlNodeList = '<DETAILSLIST>';
        $.each(SalaryMasterView.variables.DetailsControlsList, function (key, obj) {
            if (obj) {
                //if (accid) {
                    xmlNodeList += '<DETAILS>';
                    xmlNodeList += '<SRNO>' + obj.srno + '</SRNO>';

                    xmlNodeList += '<CREDITORACCID>' + obj.CreditorAccId + '</CREDITORACCID>';

                    if (obj.dx_txtItemName.option().value) 
                    xmlNodeList += '<ITEMID>' + obj.dx_txtItemName.option().selectedItem.itemid + '</ITEMID>';
                    xmlNodeList += '<HSNCODE>' + obj.dx_txtItemName.option().selectedItem.hsncode + '</HSNCODE>';

                    //if (obj.SalaryAmt.option().value)
                        xmlNodeList += '<SALARYAMT>' + obj.SalaryAmt.option().value + '</SALARYAMT>';

                    if (obj.WorkingDays.option().value)
                        xmlNodeList += '<WORKINGDAYS>' + obj.WorkingDays.option().value + '</WORKINGDAYS>';

                    //if (obj.AbsentDays.option().value)
                        xmlNodeList += '<ABSENTDAYS>' + obj.AbsentDays.option().value + '</ABSENTDAYS>';

                    if (obj.Amount.option().value)
                        xmlNodeList += '<AMOUNT>' + obj.Amount.option().value + '</AMOUNT>';

                    if (obj.TotalTax.option().value)
                        xmlNodeList += '<TOTALTAX>' + obj.TotalTax.option().value + '</TOTALTAX>';

                    if (obj.PayableAmt.option().value)
                        xmlNodeList += '<PAYABLEAMT>' + obj.PayableAmt.option().value + '</PAYABLEAMT>';

                    xmlNodeList += '</DETAILS>';
                //}
            }
        }
        )
        xmlNodeList += '</DETAILSLIST>';

        xmlNodeList += '<TAXDETAILLIST>';
        $.each(SalaryMasterView.variables.taxlist, function (key, obj) {
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
            "SM_ID": SalaryMasterView.variables.Masterid,
            "SBOOKID": SalaryMasterView.variables.dx_bookType.option().selectedItem.sbookid,
            "VOUCHERDATE": SalaryMasterView.variables.dx_txtVoucherDate.option().text,
            "CREDITORACCID": SalaryMasterView.variables.dx_txtCreditorAcc.option().selectedItem.accid,
            "MONTH": SalaryMasterView.variables.dx_Month.option().value,
            "MONTHDAYS": SalaryMasterView.variables.dx_MonthDays.option().value,
            "DUEDAYS": SalaryMasterView.variables.dx_txtDueDays.option().value,
            "TAXPROFILEID": SalaryMasterView.variables.dx_taxProfile.option().value,
            "TOTALAMT": SalaryMasterView.variables.totalpayamt.option().value,
            XMLPARAM: escape(xmlNodeList),
            "oper": SalaryMasterView.variables.Oper,
        }

        if (SalaryMasterView.variables.dx_txtRemarks.option().value)
            data.REMARK = SalaryMasterView.variables.dx_txtRemarks.option().value;

        SalaryMasterView.savedata(data);
    },

    savedata: function (data) {
        $.ajax({
            url: getDomain() + SalaryMasterView.variables.PerformMasterOperationUrl,
            data: data,
            async: true,
            cache: false,
            type: 'POST',
            beforeSend: function () {
                dx_LoaderTrinity.show();
            },
            complete: function () {
                dx_LoaderTrinity.hide();
            },
            success: SalaryMasterView.btnMasterSubmitOnSuccess,
            error: OnError,
        });
    },

    btnMasterSubmitOnSuccess: function (data) {
        if ($(data).find('RESPONSECODE').text() == "0") {
            DevExVariables.Toaster("success", 'Record is ' + SalaryMasterView.variables.addedit + ' successfully');
            $('#frm_Salary_Master').hide();
            $('#pnlView').show();
            SalaryMasterView.ClearValues();
        }
        else {
            InvalidResponseCode(data);
        }
        SalaryMasterView.variables.dx_btnSubmit.option({ disabled: false });
    },

    triggerId: function (id) {
        var rowData = SalaryMasterView.variables.dx_dataGrid.getVisibleRows()[SalaryMasterView.variables.dx_dataGrid.getRowIndexByKey(+id)].data;
        SalaryMasterView.variables.Masterid = id;
        SalaryMasterView.variables.EditDataList = rowData;
        SalaryMasterView.variables.dx_bookType.option({ value: rowData.sbookid });
        SalaryMasterView.variables.dx_VoucherNo.option({ value: rowData.voucherno });
        SalaryMasterView.variables.dx_txtVoucherDate.option({ value: rowData.voucherdate });
        SalaryMasterView.variables.dx_txtCreditorAcc.option({
            items: [{ accid: rowData.creditoraccid, accountname: rowData.creditorname }],
            selectedItem: { accid: rowData.creditoraccid, accountname: rowData.creditorname },
            value: rowData.creditorname
        });
        SalaryMasterView.variables.dx_txtDueDays.option({ value: rowData.duedays });
        SalaryMasterView.variables.dx_Month.option({ value: rowData.month });
        SalaryMasterView.variables.dx_MonthDays.option({ value: rowData.monthdays });
        SalaryMasterView.variables.dx_taxProfile.option({ value: rowData.taxprofileid });
        SalaryMasterView.variables.dx_txtRemarks.option({ value: rowData.remark });
        SalaryMasterView.variables.dx_bookType.option({ disabled: true });

        SalaryMasterView.GetItemDetails(id);
        //SalaryMasterView.CalcItemwiseAmt();
        SalaryMasterView.CalcAmount();

        //----------------------------------- Get Details Table Controls ------------------------------------------------------

        //var myfilter = { rules: [] };
        //myfilter.rules.push({ field: "SM_ID", op: "eq", data: id });
        //$.ajax({
        //    url: getDomain() + "/Common/BindMastersDetails?ServiceName=ACC_SALARYDETAILS_GET&myfilters=" + JSON.stringify(myfilter),
        //    async: false,
        //    cache: false,
        //    type: 'POST',
        //    success: function (data) {
        //        if ($(data).find('RESPONSECODE').text() == "0") {
        //            var JsonObject = xml2json.parser(data);
        //            if (JsonObject.serviceresponse.detailslist) {
        //                var List = [];
        //                if (JsonObject.serviceresponse.detailslist.details.length > 0)
        //                    List = JsonObject.serviceresponse.detailslist.details;
        //                else
        //                    List.push(JsonObject.serviceresponse.detailslist.details);
        //                var TotalAmount = 0;
        //                $.each(List, function (key, obj) {
        //                    $("#tbl_SalaryDetails tbody").append(
        //                     '<tr rowno="' + key + '" CreditorAccId="' + obj.creditoraccid + '">'
        //                         + '<td class="CreditorAcc">' + obj.creditorname + '</td>'
        //                         + '<td class="SalaryAmt"><input type="number" style="text-align:right;" class="form-control" id="dx_numAmt' + key + '" value="' + obj.salaryamt.toFixed(2) + '"/></td>'
        //                         + '<td class="WorkingDays"><input type="number" style="text-align:right;" class="form-control" id="dx_numAmt' + key + '" value="' + obj.workingdays + '"/></td>'
        //                         + '<td class="AbsentDays"><input type="number" style="text-align:right;" class="form-control" id="dx_numAmt' + key + '" value="' + obj.absentdays + '"/></td>'
        //                         + '<td class="Amount"><input type="number" style="text-align:right;" class="form-control" onFocusOut="SalaryMasterView.FooterTotal(); SalaryMasterView.WrongAmountToster();" id="dx_numAmt' + key + '" value="' + obj.amount.toFixed(2) + '"/></td>'
        //                         + '<td class="PaidAmount"><input type="number" style="text-align:right;" class="form-control" onFocusOut="SalaryMasterView.WrongAmountToster();" id="dx_numAmt' + key + '" value="' + obj.paidamount.toFixed(2) + '"/></td>'
        //                          + '<td class="text-center">' + '<span class="btn btn-danger" onClick="SalaryMasterView.RemoveDetailRow(this)"><i class="fa fa-trash-o"></i></span>' + '</td>'
        //                     + '</tr>'
        //                    );
        //                    TotalAmount += obj.amount;
        //                });

        //                $("#dx_FooterTotalAmt").html(TotalAmount.toFixed(2));

        //            }
        //        }
        //        else {
        //            DevExVariables.InvalidResponseCode(data);
        //        }
        //    },
        //    error: OnError
        //});

        //----------------------------------- /Get Details Table Controls ------------------------------------------------------

        //SalaryMasterView.FooterTotal();

        $("#frm_Salary_Master").show();
        $("#pnlView").hide();

        if (isU()) {
            SalaryMasterView.variables.dx_btnSubmit.option({ visible: true });
        }
        else {
            SalaryMasterView.variables.dx_btnSubmit.option({ visible: false });
        }
    },

    deleteRow: function (id) {
        var rowData = SalaryMasterView.variables.dx_dataGrid.getVisibleRows()[SalaryMasterView.variables.dx_dataGrid.getRowIndexByKey(+id)].data;
        SalaryMasterView.variables.Masterid = id;
        SalaryMasterView.variables.DeleteDataObj = rowData;
        SalaryMasterView.variables.Oper = "Delete";

        if (SalaryMasterView.variables.dx_popupRecordDelete) {
            SalaryMasterView.variables.dx_popupRecordDelete.option("contentTemplate", SalaryMasterView.variables.DeletePopUpOptions.contentTemplate(SalaryMasterView.variables.DeleteDataObj).bind(this));
        }
        else {
            SalaryMasterView.variables.dx_popupRecordDelete = $("#dx_popupRecordDelete").dxPopup(SalaryMasterView.variables.DeletePopUpOptions).dxPopup("instance");
        }

        SalaryMasterView.variables.dx_popupRecordDelete.show();
    },

    ClearValues: function () {
        SalaryMasterView.variables.Masterid = "";
        SalaryMasterView.variables.Oper = 'Add';
        SalaryMasterView.variables.addedit = "added";
        SalaryMasterView.variables.DeleteDataObj = "";
        DevExpress.validationEngine.resetGroup("SalaryMaster");
        SalaryMasterView.variables.dx_VoucherNo.option("value", ""); 
        SalaryMasterView.variables.dx_Month.option("value", SalaryMasterView.variables.MonthList[0]);
        SalaryMasterView.variables.dx_MonthDays.option("value", SalaryMasterView.variables.MonthDaysList[3]);
        SalaryMasterView.variables.dx_txtVoucherDate.option({ value: new Date() });
        SalaryMasterView.variables.dx_txtDueDays.option("value", 0);
        SalaryMasterView.variables.dx_btnSubmit.option({ disabled: false });
        SalaryMasterView.variables.dx_bookType.option({ disabled: false });
        SalaryMasterView.variables.dx_btnSubmit.option({ visible: true });
        SalaryMasterView.variables.taxlist = [];
        SalaryMasterView.variables.RowCount = 1;
        $("#tbl_SalaryDetails tbody").html("");
        $("#dx_FooterTotalAmt").html("");
        $("#frm_Salary_Master").hide();
        $("#pnlView").show();
        SalaryMasterView.variables.dx_dataGrid.refresh();
    },

    AddNewLineDetails: function (accid,accountname,obj) {
        var postfix = SalaryMasterView.variables.RowCount;
        $("#tbl_SalaryDetails tbody").append(
            '<tr rowno="' + postfix + '" CreditorAccId="' + accid + '">'
                //+ '<td class="TableRowNo"></td>'
                + '<td id="CreditorAcc">' + accountname + '</td>'
                + '<td>'
                  + '<div id="dx_txtItemName' + postfix + '" ></div>'
                + '</td>'
                + '<td class="HSNCode">' + (obj ? obj.hsncode : "") + '</td>'
                + '<td>'
                  + '<div id="SalaryAmt' + postfix + '" ></div>'
                + '</td>'
                + '<td>'
                  + '<div id="WorkingDays' + postfix + '" ></div>'
                + '</td>'
                 + '<td>'
                  + '<div id="AbsentDays' + postfix + '" ></div>'
                + '</td>'
                 + '<td>'
                  + '<div id="Amount' + postfix + '" ></div>'
                + '</td>'
                + '<td>'
                  + '<div id="TotalTax' + postfix + '" ></div>'
                + '</td>'
                + '<td>'
                  + '<div id="PayableAmt' + postfix + '" ></div>'
                + '</td>'
                 + '<td class="text-center">' + '<span class="btn btn-danger" onClick="SalaryMasterView.RemoveDetailRow(this)"><i class="fa fa-trash-o"></i></span>' + '</td>'
            + '</tr>'
        );

        /*----------------------Registration of Detail table controls---------------------*/
        SalaryMasterView.DetailTableFormInit(accid,accountname,postfix,obj);
        /*----------------------Registration of Detail table controls---------------------*/

        SalaryMasterView.variables.RowCount = postfix + 1;



    },

    DetailTableFormInit: function (accid,accountname,postfix, obj) {
        /*----------------------Registration of Detail table controls---------------------*/
        var tmp = [];
        tmp[postfix] = { srno: postfix, CreditorAccId: accid, CreditorAcc: accountname, dx_txtItemName: "", SalaryAmt: "", WorkingDays: "", AbsentDays: "", Amount: "", PaidAmount: "", TotalTax: "", PayableAmt: "" };

        SalaryMasterView.variables.DetailsControlsList = Object.assign(SalaryMasterView.variables.DetailsControlsList, tmp);

        SalaryMasterView.variables.DetailsControlsList[postfix].dx_txtItemName = $("#dx_txtItemName" + postfix).dxAutocomplete({
            dataSource: SalaryMasterView.variables.ItemList,
            placeholder: "Select Item Name...",
            valueExpr: "itemname",
            onItemClick: function (data) {
                if (data.component.option().selectedItem) {
                    $("[rowno='" + postfix + "']").find('.HSNCode').html(data.component.option().selectedItem.hsncode);
                    SalaryMasterView.CalcItemwiseAmt(postfix);
                    SalaryMasterView.CalcAmount();
                }
            },
            //onFocusOut: function (data) {
            //    SalaryMasterView.CalcItemwiseAmt(postfix);
            //},
        }).dxValidator({
            validationGroup: "SalaryMaster",
            validationRules: [{
                type: "required",
                message: "Category is required"
            }]
        }).dxAutocomplete("instance");

        SalaryMasterView.variables.DetailsControlsList[postfix].SalaryAmt = $("#SalaryAmt" + postfix).dxTextBox({
            mode: "text",
            onKeyDown: function (e) {
            },
            onFocusOut: function (data) {
                SalaryMasterView.CalcItemwiseAmt(postfix);
            },
            onValueChanged: function (data) {
            },
            onItemClick: function (data) {
            },
            inputAttr: {
                class: "text-right"
            },
        }).dxValidator({
            validationGroup: "SalaryMaster",
            validationRules: [{
                type: "required",
                message: "Salary Amount is required"
            }]
        }).dxTextBox("instance");

        SalaryMasterView.variables.DetailsControlsList[postfix].WorkingDays = $("#WorkingDays" + postfix).dxTextBox({
            mode: "text",
            onKeyDown: function (e) {
            },
            onFocusOut: function (data) {
                //SalaryMasterView.CalcItemwiseAmt(postfix);
            },
            onValueChanged: function (data) {
            },
            onItemClick: function (data) {
            },
            inputAttr: {
                class: "text-right"
            },
        }).dxValidator({
            validationGroup: "SalaryMaster",
            validationRules: [{
                type: "required",
                message: "WorkingDays is required"
            }]
        }).dxTextBox("instance");

        SalaryMasterView.variables.DetailsControlsList[postfix].AbsentDays = $("#AbsentDays" + postfix).dxTextBox({
            mode: "text",
            onKeyDown: function (e) {
            },
            onFocusOut: function (data) {
                //SalaryMasterView.CalcItemwiseAmt(postfix);
            },
            onValueChanged: function (data) {
            },
            onItemClick: function (data) {
            },
            inputAttr: {
                class: "text-right"
            },
        }).dxValidator({
            validationGroup: "SalaryMaster",
            validationRules: [{
                type: "required",
                message: "AbsentDays is required"
            }]
        }).dxTextBox("instance");

        SalaryMasterView.variables.DetailsControlsList[postfix].Amount = $("#Amount" + postfix).dxTextBox({
            mode: "text",
            onKeyDown: function (e) {
            },
            onFocusOut: function (data) {
                SalaryMasterView.CalcItemwiseAmt(postfix);
                SalaryMasterView.WrongAmountToster();
            },
            onValueChanged: function (data) {
            },
            onItemClick: function (data) {
            },
            inputAttr: {
                class: "text-right"
            },
        }).dxValidator({
            validationGroup: "SalaryMaster",
            validationRules: [{
                type: "required",
                message: "Amount is required"
            }]
        }).dxTextBox("instance");

        SalaryMasterView.variables.DetailsControlsList[postfix].TotalTax = $("#TotalTax" + postfix).dxTextBox({
            readOnly:true,
            mode: "text",
            onKeyDown: function (e) {
            },
            onFocusOut: function (data) {
                //SalaryMasterView.CalcItemwiseAmt(postfix);
            },
            onValueChanged: function (data) {
            },
            onItemClick: function (data) {
            },
            inputAttr: {
                class: "text-right"
            },
        }).dxValidator({
            validationRules: []
        }).dxTextBox("instance");

        SalaryMasterView.variables.DetailsControlsList[postfix].PayableAmt = $("#PayableAmt" + postfix).dxTextBox({
            readOnly: true,
            mode: "text",
            onKeyDown: function (e) {
            },
            onFocusOut: function (data) {
                //SalaryMasterView.CalcItemwiseAmt(postfix);
            },
            onValueChanged: function (data) {
            },
            onItemClick: function (data) {
            },
            inputAttr: {
                class: "text-right"
            },
        }).dxValidator({
            validationRules: []
        }).dxTextBox("instance");

        /*----------------------Registration of Detail table controls---------------------*/

        /*----------------------Set Value of Detail table controls while Edit---------------------*/
        if (obj) {
            SalaryMasterView.variables.DetailsControlsList[postfix].dx_txtItemName.option({
                items: [{
                    itemid: obj.itemid,
                    itemname: obj.itemname,
                    hsncode: obj.hsncode,
                    taxdetaillist: obj.taxdetaillist
                }],
                selectedItem: {
                    itemid: obj.itemid,
                    itemname: obj.itemname,
                    hsncode: obj.hsncode,
                    taxdetaillist: obj.taxdetaillist
                },
                value: obj.itemname
            });
            SalaryMasterView.variables.DetailsControlsList[postfix].SalaryAmt.option({ value: obj.salaryamt });
            SalaryMasterView.variables.DetailsControlsList[postfix].WorkingDays.option({ value: obj.workingdays });
            SalaryMasterView.variables.DetailsControlsList[postfix].AbsentDays.option({ value: obj.absentdays });
            SalaryMasterView.variables.DetailsControlsList[postfix].Amount.option({ value: obj.amount });
            SalaryMasterView.variables.DetailsControlsList[postfix].TotalTax.option({ value: obj.totaltax });
            SalaryMasterView.variables.DetailsControlsList[postfix].PayableAmt.option({ value: obj.payableamt });
        }
        /*----------------------Set Value of Detail table controls while Edit---------------------*/

    },

    WrongAmountToster: function (key, obj) {
        $("#tbl_SalaryDetails tbody tr").each(function (key, obj) {
            if ((+$(obj).find('.Amount input').val() + +$(obj).find('.PaidAmount input').val()) > +$(obj).find('.SalaryAmt input').val()) {
                DevExVariables.Toaster("warning", "You not Deposit Amount more than Salary Amount.");
                $(obj).find('.Amount input').val('0.00');
                $(obj).find('.PaidAmount input').val('0.00');
                SalaryMasterView.FooterTotal();
                return;
            }
        })
    },

    RemoveDetailRow: function (obj) {

        $(obj).closest("tr").remove();
        delete SalaryMasterView.variables.DetailsControlsList[$(obj).closest("tr").attr("rowno")];
        SalaryMasterView.CalcAmount();
    },

    EditFromGrid: function (val, id, type) {
        var data = {
            "SM_ID": id,
            "OPER_TYPE": "EditFromGrid",
            "oper": "Edit"
        }
        if (type == "Verify")
            data.ISVERIFY = val;

        $.ajax({
            url: getDomain() + SalaryMasterView.variables.PerformMasterOperationUrl,
            data: data,
            async: true,
            cache: false,
            type: 'POST',
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    DevExVariables.Toaster("success", 'Record is updated successfully.');
                    SalaryMasterView.variables.dx_dataGrid.refresh();
                }
            },
            error: OnError,
        });

    },

    BindSubBookList: function () {
        var myfilter = { rules: [] };
        myfilter.rules.push({ field: "TYPE", op: "eq", data: "AccSubBook" });
        myfilter.rules.push({ field: "SUBBOOKTYPE", op: "eq", data: 'SALARY' });

        $.ajax({
            url: getDomain() + SalaryMasterView.variables.BindStaticDataUrl + "&myfilters=" + JSON.stringify(myfilter),
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

                        SalaryMasterView.variables.dx_bookType.option({
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
            url: getDomain() + SalaryMasterView.variables.BindTaxProfile + "&IsRecordAll=true&myfilters=" + JSON.stringify(myfilter),
            async: true,
            cache: false,
            type: 'POST',
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    var JsonObject = xml2json.parser(data);
                    if (JsonObject.serviceresponse.detailslist) {
                        var List = [];
                        if (JsonObject.serviceresponse.detailslist.details.length > 0) {
                            List = JsonObject.serviceresponse.detailslist.details;
                        }
                        else {
                            List.push(JsonObject.serviceresponse.detailslist.details);
                        }

                        SalaryMasterView.variables.dx_taxProfile.option({
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
        myfilter.rules.push({ field: "GROUPNAME", op: "eq", data: 'GENERAL' });
        //myfilter.rules.push({ field: "RMSUBCATE", op: "eq", data: "FINANCIAL CHARGES" });
        myfilter.rules.push({ field: "RMSUBCATE", op: "eq", data: "SALARY" });
        $.ajax({
            url: getDomain() + SalaryMasterView.variables.BindItemMaster + "&myfilters=" + JSON.stringify(myfilter),
            async: true,
            cache: false,
            type: 'POST',
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    var JsonObject = xml2json.parser(data);
                    if (JsonObject.serviceresponse.detailslist) {
                        if (JsonObject.serviceresponse.detailslist.details.length) {
                            SalaryMasterView.variables.ItemList = JsonObject.serviceresponse.detailslist.details;
                        }
                        else {
                            SalaryMasterView.variables.ItemList.push(JsonObject.serviceresponse.detailslist.details);
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

    GetItemDetails: function (SM_ID) {
        var myfilter = { rules: [] };
        myfilter.rules.push({ field: "SM_ID", op: "eq", data:SM_ID });

        $.ajax({
            url: getDomain() + SalaryMasterView.variables.BindDetailListUrl + "&myfilters=" + JSON.stringify(myfilter),
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
                            SalaryMasterView.AddNewLineDetails(obj.accid, obj.creditorname, obj);

                            //$("#tbl_SalaryDetails tbody").append(
                            //    '<tr rowno="' + key + '" CreditorAccId="' + obj.accid + '">'
                            //        + '<td id="CreditorAcc">' + obj.creditorname + '</td>'
                            //        + '<td>'
                            //            + '<div id="dx_txtItemName">' + obj.item_name + '</div>'
                            //        + '</td>'
                            //        + '<td class="HSNCode">' + (obj ? obj.hsncode : "") + '</td>'
                            //        + '<td>'
                            //            + '<div id="SalaryAmt" > ' + obj.salaryamt + '</div>'
                            //        + '</td>'
                            //        + '<td>'
                            //            + '<div id="WorkingDays"> ' + obj.workingdays + '</div>'
                            //        + '</td>'
                            //        + '<td>'
                            //            + '<div id="AbsentDays">' + obj.absentdays + '</div>'
                            //        + '</td>'
                            //        + '<td>'
                            //            + '<div id="Amount">' + obj.amount + '</div>'
                            //        + '</td>'
                            //        + '<td>'
                            //            + '<div id="TotalTax">' + (obj ? obj.totaltax : "") + '</div>'
                            //        + '</td>'
                            //        + '<td>'
                            //            + '<div id="PayableAmt">' + obj.payableamt + '</div>'
                            //        + '</td>'
                            //        + '<td>'
                            //            + '<div id="PaidAmount">' + obj.paidamount + '</div>'
                            //        + '</td>'
                            //        + '<td class="text-center">' + '<span class="btn btn-danger" onClick="SalaryMasterView.RemoveDetailRow(this)"><i class="fa fa-trash-o"></i></span>' + '</td>'
                            //    + '</tr>'
                            //);

                            if (obj.taxdetaillist) {
                                var tempTaxLists = [];
                                if (obj.taxdetaillist.taxdetails.length) {
                                    tempTaxLists = obj.taxdetaillist.taxdetails;
                                }
                                else {
                                    tempTaxLists.push(obj.taxdetaillist.taxdetails);
                                }

                                $.each(tempTaxLists, function (key1, obj1) {
                                    SalaryMasterView.variables.taxlist.push({
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

    CalcItemwiseAmt: function (postfix) {

        var TotalTaxableAmt = 0, TotalTax = 0, AmtWithTax = 0, Amt = 0, Tds = 0;

        TotalTaxableAmt = +SalaryMasterView.variables.DetailsControlsList[postfix].SalaryAmt.option().value;

        SalaryMasterView.variables.taxlist = SalaryMasterView.variables.taxlist.filter(function (x) { return x.rownum != postfix });
        
        var tempTaxProfileList = [];
        if (SalaryMasterView.variables.dx_taxProfile.option().selectedItem.taxdetaillist.taxdetails.length > 0) {
            tempTaxProfileList = SalaryMasterView.variables.dx_taxProfile.option().selectedItem.taxdetaillist.taxdetails;
        }
        else {
            tempTaxProfileList.push(SalaryMasterView.variables.dx_taxProfile.option().selectedItem.taxdetaillist.taxdetails);
        }

        $.each(tempTaxProfileList, function (key, obj) {
            var temptax = 0;

            var ItemTaxList = [];
            if (SalaryMasterView.variables.DetailsControlsList[postfix].dx_txtItemName.option().selectedItem.taxdetaillist.taxdetails.length > 0) {
                   ItemTaxList = SalaryMasterView.variables.DetailsControlsList[postfix].dx_txtItemName.option().selectedItem.taxdetaillist.taxdetails;
                }
                else {
                    ItemTaxList.push(SalaryMasterView.variables.DetailsControlsList[postfix].dx_txtItemName.option().selectedItem.taxdetaillist.taxdetails);
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

                    var temptaxlist = SalaryMasterView.variables.taxlist.filter(function (x) { return calcOnList.indexOf(x.TaxId.toString()) !== -1 && x.rownum == postfix; });
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
                DevExVariables.Toaster("warning", "Item Name: " + SalaryMasterView.variables.DetailsControlsList[postfix].dx_txtItemName.option().selectedItem.itemname + " Tax Name: " + obj.taxname + " Is Not Added Properly");
                SalaryMasterView.variables.DetailsControlsList[postfix].dx_txtItemName.option("value", "");
                return;
            }

            SalaryMasterView.variables.taxlist.push({
                rownum: postfix,
                HSNCodeId: SalaryMasterView.variables.DetailsControlsList[postfix].dx_txtItemName.option().selectedItem.itemid,
                HSNCode: SalaryMasterView.variables.DetailsControlsList[postfix].dx_txtItemName.option().selectedItem.hsncode,
                TaxableAmt: TotalTaxableAmt,
                TaxId: obj.taxid,
                TaxName: obj.taxname,
                TaxValue: List[0].taxvalue,
                TaxValueIn: List[0].taxvaluein,
                TaxAmt: temptax
            });
        });

        SalaryMasterView.variables.DetailsControlsList[postfix].TotalTax.option({ value: (TotalTax).toFixed(2) });

        AmtWithTax = TotalTaxableAmt - TotalTax;
        SalaryMasterView.variables.DetailsControlsList[postfix].PayableAmt.option({ value: (AmtWithTax.toFixed(2)) });

        SalaryMasterView.CalcAmount();

    },

    CalcAmount: function () {
        var SalaryAmt = 0,TotalAmt = 0, Tds = 0, TotalPayableAmt = 0;
        $.each(SalaryMasterView.variables.DetailsControlsList, function (key, obj) {
            if (SalaryMasterView.variables.DetailsControlsList[key]) {
                SalaryAmt += +SalaryMasterView.variables.DetailsControlsList[key].SalaryAmt.option().value;
                TotalAmt += +SalaryMasterView.variables.DetailsControlsList[key].Amount.option().value;
                Tds += +SalaryMasterView.variables.DetailsControlsList[key].TotalTax.option().value;
                TotalPayableAmt += +SalaryMasterView.variables.DetailsControlsList[key].PayableAmt.option().value;
            }
        });

        SalaryMasterView.variables.salaryamt.option({ value: (SalaryAmt.toFixed(2)) });
        SalaryMasterView.variables.totalamt.option({ value: (TotalAmt.toFixed(2)) });
        SalaryMasterView.variables.tds.option({ value: (Tds.toFixed(2)) });
        SalaryMasterView.variables.totalpayamt.option({ value: (TotalPayableAmt.toFixed(2)) });
    },

}

$(document).ready(function () {
    SalaryMasterView.FormInitialize();
    SalaryMasterView.initializeDevExgrid();
    SalaryMasterView.BindSubBookList();
    SalaryMasterView.BindTaxProfile();
    SalaryMasterView.GetItemList();

    if (+$("#hdnSBOOKID").val()) {
        $("#pnlView").hide();
        $("#frm_Salary_Master").show();
        SalaryMasterView.variables.Masterid = "";

        SalaryMasterView.variables.dx_bookType.option({ value: +$("#hdnSBOOKID").val() });
        SalaryMasterView.variables.dx_bookType.option({ disabled: true });
    }
});