var OutStandingReportView = {
    variables: {
        BindGroupListUrl: "/Common/BindMastersDetails?ServiceName=ACC_OUTSTANDING_REPORT_GET",
        BindDetailsGroupListUrl: "/Common/BindMastersDetails?ServiceName=ACC_OUTSTANDING_REPORT_DETAILS_GET",
        BindCashBankDetailsGroupListUrl: "/Common/BindMastersDetails?ServiceName=ACC_OUTSTANDING_REPORT_CASHBANK_DETAILS_GET",
        BindRemarkDetailsGroupListUrl: "/Common/BindMastersDetails?ServiceName=ACC_PARTYCOMMITMENTDETAILS_GET",
        BindDateGroupListUrl: "/Common/BindMastersDetails?ServiceName=OUTLET_ACCOUNT_YEAR_MASTER_GET",
        PerformMasterOperationUrl: "/Common/OpeartionsOnMaster?ServiceName=ACC_PARTYCOMMITMENTDETAILS_CRUD",
        Oper: 'Add',
        addedit: "added",
        Masterid: "",
        accountid : "",
        RowCount: 1,
        dx_remarksdataGrid:"",
        dx_ddlTransactionType: "",
        TransactionList: ["Receive", "Payment"],
        dx_btnreSubmit: "",
        dx_btnreCancel: "",
        dx_dataGrid: "",
        dx_popupRecordDelete: "",
        DeleteDataObj: "",
        DeletePopUpOptions: {
            width: 300,
            height: 200,
            contentTemplate: function () {
                return $("<div />").append(
                    $("<p>AccId: <span>" + OutStandingReportView.variables.DeleteDataObj.accid + "</span></p>"),
                    $("<p>Remark: <span>" + OutStandingReportView.variables.DeleteDataObj.remark + "</span></p>")
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
                            "PCD_ID": OutStandingReportView.variables.Masterid,
                            "oper": OutStandingReportView.variables.Oper,
                        }

                        OutStandingReportView.savedata(data);
                        OutStandingReportView.variables.dx_remarksdataGrid.refresh();

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

        var now = new Date;

        OutStandingReportView.variables.dx_datefrom = $("#dx_datefrom").dxDateBox({
            type: "date",
            value : now,
            showClearButton: true,
            useMaskBehavior: true,
            displayFormat: "dd MMM yyyy",
        }).dxDateBox("instance");

        OutStandingReportView.variables.dx_ddlTransactionType = $("#dx_ddlTransactionType").dxSelectBox({
            placeholder: "Select Type...",
            dataSource: OutStandingReportView.variables.TransactionList,
            value: OutStandingReportView.variables.TransactionList[0],
            searchEnabled: true,
        }).dxSelectBox("instance");

        OutStandingReportView.variables.dx_txtfrom = $("#dx_txtfrom").dxNumberBox({
            placeholder: "Enter From Days...",
            min : 0,
            searchEnabled: true,
            value: '',
        }).dxValidator({
        }).dxNumberBox("instance");

        OutStandingReportView.variables.dx_txtto = $("#dx_txtto").dxNumberBox({
            placeholder: "Enter To Days...",
            min: 0,
            searchEnabled: true,
            value : '',
        }).dxValidator({
        }).dxNumberBox("instance");

        OutStandingReportView.variables.dx_btnSubmit = $("#dx_btnSubmit").dxButton({
            stylingMode: "outlined",
            icon: "check",
            text: "Apply",
            type: "success",
            onClick: function () {

                if (OutStandingReportView.variables.dx_txtfrom > OutStandingReportView.variables.dx_txtto) {
                    DevExVariables.Toaster("warning", "From Due Days Is Not Greater Than To Due Days");
                }
                OutStandingReportView.variables.dx_dataGrid.refresh();
            }
        }).dxButton("instance");

        OutStandingReportView.variables.dx_Remarks = $("#dx_Remarks").dxTextArea({
            height: 40,
             width: 330,
            placeholder: "Enter Remark"
        }).dxValidator({
            validationGroup: "OutStandingReport",
            validationRules: [{
            type: "required",
            message: "Remark is required"
        }]
        }).dxTextArea("instance");

        OutStandingReportView.variables.dx_btnreSubmit = $("#dx_btnreSubmit").dxButton({
            icon: "check",
            text: "Submit",
            type: "success",
            validationGroup: " OutStandingReport",
            onClick: function (e) {
                var validation = DevExpress.validationEngine.validateGroup("OutStandingReport");
                if (!validation.isValid) {
                    DevExVariables.Toaster("warning", "Please fill all required fields before submit.");
                    return;
                }

                OutStandingReportView.btnMasterSubmit();
                OutStandingReportView.variables.dx_remarksdataGrid.refresh();
                //e.validationGroup.reset();
            }
        }).dxButton("instance");

        OutStandingReportView.variables.dx_btnreCancel = $("#dx_btnreCancel").dxButton({
            icon: "close",
            text: "Cancel",
            type: "danger",
            validationGroup: " OutStandingReport",
            onClick: function (e) {
                OutStandingReportView.ClearValues();
            }
        }).dxButton("instance");
    },

    initializeDevExgrid: function () {
        OutStandingReportView.variables.dx_dataGrid = $("#dx_dataGrid").dxDataGrid({
            dataSource: new DevExpress.data.CustomStore({
                key: "accid",
                load: function (loadOptions) {
                    var deferred = $.Deferred();

                    var myfilter = { rules: [] };
                    myfilter.rules.push({ field: "TRANSACTION", op: "eq", data: OutStandingReportView.variables.dx_ddlTransactionType.option().selectedItem});
                    myfilter.rules.push({ field: "ASONDATE", op: "eq", data: OutStandingReportView.variables.dx_datefrom.option().text });
                    if (OutStandingReportView.variables.dx_txtfrom.option().value >= 0 && OutStandingReportView.variables.dx_txtfrom.option().value != '')
                        myfilter.rules.push({ field: "FROMDAYS", op: "eq", data: OutStandingReportView.variables.dx_txtfrom.option().value });

                    if (OutStandingReportView.variables.dx_txtto.option().value >= 0 && OutStandingReportView.variables.dx_txtto.option().value != '')
                    myfilter.rules.push({ field: "TODAYS", op: "eq", data: OutStandingReportView.variables.dx_txtto.option().value });

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
                        url: getDomain() + OutStandingReportView.variables.BindGroupListUrl + "&" + parameters.join("&") + "&myfilters=" + JSON.stringify(myfilter),
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
            columnFixing: {
                enabled: true,
            },
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
            columns: [{ dataField: "accid", allowFiltering: false, allowSorting: true, visible: false, sortIndex: 0, sortOrder: "desc", allowGrouping: false },
                { dataField: "partycode", caption: "Acc Code", dataType: "string", filterOperations: ["contains"], allowSorting: true, allowFiltering: true, allowHeaderFiltering: false, allowGrouping: false },
               {
                   dataField: "accountname", caption: "Account Name", dataType: "string", filterOperations: ["contains"], allowSorting: true, allowFiltering: true, allowHeaderFiltering: false,
                   cellTemplate: function (container, options) {
                       var temp = '<div>' + htmlDecode(options.value) + '</div>';
                       $(temp).appendTo(container);
                   }
               },
                {
                    dataField: "headname", caption: "Head", dataType: "string", filterOperations: ["contains"], allowSorting: true, allowFiltering: true, allowHeaderFiltering: false, allowGrouping: true
                },
                { dataField: "subhead", caption: "Sub Head", dataType: "string", filterOperations: ["contains"], allowSorting: true, allowFiltering: true, allowHeaderFiltering: false, allowGrouping: true },
                { dataField: "mobile1", caption: "Mobile No", dataType: "string", filterOperations: ["contains"], allowSorting: true, allowFiltering: true, allowHeaderFiltering: false, allowGrouping: true },
                { dataField: "bill_amt", caption: "Bill Amount", dataType: "string", filterOperations: ["contains"], allowSorting: false, allowFiltering: false, allowHeaderFiltering: false, allowGrouping: false },
                { dataField: "paid_amt", caption: "Paid Amount", dataType: "string", filterOperations: ["contains"], allowSorting: false, allowFiltering: false, allowHeaderFiltering: false, allowGrouping: false },
                { dataField: "pending_amt", caption: "Pending Amount", dataType: "string", filterOperations: ["contains"], allowSorting: false, allowFiltering: false, allowHeaderFiltering: false, allowGrouping: false },
                { dataField: "over_dueamt", caption: "Over Due Amount", dataType: "string", filterOperations: ["contains"], allowSorting: false, allowFiltering: false, allowHeaderFiltering: false, allowGrouping: false },
                 
            ],
            masterDetail: {
                enabled: true,
                template: OutStandingReportView.GetGridDetails,

            }
        }).dxDataGrid("instance");
    },

    RemarkGrid: function (vid,accid, id) {
        OutStandingReportView.variables.dx_remarksdataGrid = $("#dx_remarksdataGrid").dxDataGrid({
            dataSource: new DevExpress.data.CustomStore({
                key: "pcd_id",
                load: function (loadOptions) {
                    var deferred = $.Deferred();

                    var myfilter = { rules: [] };
                    myfilter.rules.push({ field: "ACCID", op: "eq", data: accid });
                    myfilter.rules.push({ field: "SBOOKID", op: "eq", data: id });
                    myfilter.rules.push({ field: "VOUCHERID", op: "eq", data: vid });

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
                        url: getDomain() + OutStandingReportView.variables.BindRemarkDetailsGroupListUrl + "&myfilters=" + JSON.stringify(myfilter),
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
            allowColumnResizing: true,
            columnResizingMode: "widget",
            columnAutoWidth: true,
            showBorders: true,
            showColumnLines: true,
            showRowLines: true,
            columnFixing: {
                enabled: true,
            },
            filterRow: {
                visible: false,
                applyFilter: "auto"
            },
            remoteOperations: true,
            paging: {
                pageSize: 10
            },
            pager: {
                visible: true,
                showInfo: true,
                showNavigationButtons: true,
                showPageSizeSelector: true,
                allowedPageSizes: [10, 20, 50]
            },
            columns: [{ dataField: "pcd_id", caption: "Voucher Date", visible: false },
                { dataField: "entrydate", caption: "Entry Date" },
                { dataField: "remark", caption: "Remark" },
                  {
                      dataField: "Action", caption: "Action", alignment: "center", allowFiltering: false, allowSorting: false, fixed: true, fixedPosition: "right",
                      cellTemplate: function (container, options) {
                          DevExVariables.ActionTemplate(container, options,false, true, "OutStandingReportView");
                      }
                  },
            ],
        }).dxDataGrid("instance");

    },

    GetGridDetails: function (container, options) {
        var myfilter = { rules: [] };
        myfilter.rules.push({ field: "ACCID", op: "eq", data: options.key });
        myfilter.rules.push({ field: "TRANSACTION", op: "eq", data: OutStandingReportView.variables.dx_ddlTransactionType.option().selectedItem });
        myfilter.rules.push({ field: "ASONDATE", op: "eq", data: OutStandingReportView.variables.dx_datefrom.option().text });
        if (OutStandingReportView.variables.dx_txtfrom.option().value >= 0 && OutStandingReportView.variables.dx_txtfrom.option().value != '')
            myfilter.rules.push({ field: "FROMDAYS", op: "eq", data: OutStandingReportView.variables.dx_txtfrom.option().value });

        if (OutStandingReportView.variables.dx_txtto.option().value >= 0 && OutStandingReportView.variables.dx_txtto.option().value != '')
            myfilter.rules.push({ field: "TODAYS", op: "eq", data: OutStandingReportView.variables.dx_txtto.option().value });

        var List = [];

        $.ajax({
            url: getDomain() + OutStandingReportView.variables.BindDetailsGroupListUrl + "&myfilters=" + JSON.stringify(myfilter),
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
                        if (JsonObject.serviceresponse.detailslist.details.length) {
                            List = JsonObject.serviceresponse.detailslist.details;
                        }
                        else {
                            List.push(JsonObject.serviceresponse.detailslist.details);
                        }
                    }
                }
                else {
                    DevExVariables.InvalidResponseCode(data);
                }
            },
            error: OnError
        });

        return  $("<div>").dxDataGrid({
            onInitialized: List,
            dataSource: new DevExpress.data.CustomStore({
                key: "voucherid",
                load: function (loadOptions) {
                    var deferred = $.Deferred();

                    deferred.resolve(List, {
                        totalCount: List.length
                    });

                    return deferred.promise();
                }
            }),
            showRowLines: true,
            paging: false,
            showBorders: true,
            columns: [{ dataField: "voucherdate", caption: "Voucher Date" },
                { dataField: "subbook", caption: "Sub Book " },
                { dataField: "sbookid", caption: "Sub Book ", visible: false },
                { dataField: "voucherid", caption: "Sub Book ", visible: false },
                { dataField: "vouchertype", caption: "Voucher Type" },
                { dataField: "voucherno", caption: "Voucher No" },
                { dataField: "brokername", caption: "Broker Name" },
                {
                    dataField: "isverify", caption: "Verify", dataType: "string", alignment: "center",
                    cellTemplate: function (container, options) {
                        var temp = "";
                        if (options.displayValue == "1") {
                            temp = '<i class="icon-checkmark4" style="color: #4caf50;"></i>';
                        }
                        $(temp).appendTo(container);
                     }   
                },
                { dataField: "duedays", caption: "Due Days" },
                { dataField: "duedate", caption: "Due Date" },
                { dataField: "overduedays", caption: "Over Due Days" },
                { dataField: "bill_amt", caption: "Bill Amount" },    
                { dataField: "paid_amt", caption: "Paid Amount" },
                { dataField: "pending_amt", caption: "Pending Amount",
                cellTemplate: function (container, options) {
                    var temp = "";
                    if (options.data.redcolor == "1") {
                        temp = '<div style="color:red;">' + options.data.pending_amt  + '</div>';
                    }
                    else {
                        temp = '<div>' + options.data.pending_amt + '</div>';
                    }

                    $(temp).appendTo(container);
                }
                },
                   {
                       dataField: "Action", caption: "Remarks", alignment: "center", allowFiltering: false, allowSorting: false, fixed: true, fixedPosition: "right",
                       cellTemplate: function (container, options) {
                           var temp;
                           temp = '<button class="btn btn-primary" style="padding: 2px 5px !important;"  onClick="OutStandingReportView.OpenRemark(' + options.key + ',' + options.data.accid + ',' + options.data.sbookid + ')"><i class="fa fa-history"></i></button>';
                           $(temp).appendTo(container);
                       }

                   },
            ],
            masterDetail: {
                enabled: true,
                template: OutStandingReportView.GetCashBankDetails,

            }
        });
    },

    btnMasterSubmit: function () {
        OutStandingReportView.variables.Oper = 'Add';
        OutStandingReportView.variables.addedit = "added";

        if (OutStandingReportView.variables.Masterid != "0" && parseInt(OutStandingReportView.variables.Masterid) > 0) {
            OutStandingReportView.variables.Oper = 'Edit';
            OutStandingReportView.variables.addedit = 'updated';
        }

        OutStandingReportView.variables.dx_btnreSubmit.option({ disabled: true });
        var data = {
            "PCD_ID": OutStandingReportView.variables.Masterid,
            "ACCID": OutStandingReportView.variables.accountid,
            "SBOOKID": OutStandingReportView.variables.subbookid,
            "VOUCHERID": OutStandingReportView.variables.voucherid,
            "REMARK": OutStandingReportView.variables.dx_Remarks.option().value,
            "oper": OutStandingReportView.variables.Oper,
        }
    
        OutStandingReportView.savedata(data);
    },

    savedata: function (data) {
        $.ajax({
            url: getDomain() + OutStandingReportView.variables.PerformMasterOperationUrl,
            data: data,
            async: false,
            cache: false,
            type: 'POST',
            beforeSend: function () {
                dx_LoaderTrinity.show();
            },
            complete: function () {
                dx_LoaderTrinity.hide();
                OutStandingReportView.variables.dx_btnreSubmit.option({ disabled: false });
            },
            success: OutStandingReportView.btnMasterSubmitOnSuccess,
            error: OnError,
        });

    },

    btnMasterSubmitOnSuccess: function (data) {
        if ($(data).find('RESPONSECODE').text() == "0") {
            DevExVariables.Toaster("success", 'Record is ' + OutStandingReportView.variables.addedit + ' successfully');
            if (OutStandingReportView.variables.dx_popupRecordDelete)
                OutStandingReportView.variables.dx_popupRecordDelete.hide();

            OutStandingReportView.ClearValues();
        }
        else {
            DevExVariables.InvalidResponseCode(data);
        }
    },

    ClearValues: function () {
        OutStandingReportView.variables.Masterid = "";
        OutStandingReportView.variables.Oper = 'Add';
        OutStandingReportView.variables.addedit = "added";
        OutStandingReportView.variables.DeleteDataObj = "";
        DevExpress.validationEngine.resetGroup("OutStandingReport");

    },

    OpenRemark: function (vid, accid, id) {
        OutStandingReportView.variables.accountid = accid
        OutStandingReportView.variables.subbookid = id
        OutStandingReportView.variables.voucherid = vid
        $('#exampleModal').modal('toggle');
        $('#exampleModal').modal('show');

        OutStandingReportView.RemarkGrid(vid, accid, id);

    },

    deleteRow: function (id) {
        var rowData = OutStandingReportView.variables.dx_remarksdataGrid.getVisibleRows()[OutStandingReportView.variables.dx_remarksdataGrid.getRowIndexByKey(+id)].data;
        OutStandingReportView.variables.Masterid = id;
        OutStandingReportView.variables.DeleteDataObj = rowData;
        OutStandingReportView.variables.Oper = "Delete";

        if (OutStandingReportView.variables.dx_popupRecordDelete) {
            OutStandingReportView.variables.dx_popupRecordDelete.option("contentTemplate", OutStandingReportView.variables.DeletePopUpOptions.contentTemplate(OutStandingReportView.variables.DeleteDataObj).bind(this));
        }
        else {
            OutStandingReportView.variables.dx_popupRecordDelete = $("#dx_popupRecordDelete").dxPopup(OutStandingReportView.variables.DeletePopUpOptions).dxPopup("instance");
        }

        OutStandingReportView.variables.dx_popupRecordDelete.show();
    },

    GetCashBankDetails: function (container,options) {
        var myfilter = { rules: [] };
        myfilter.rules.push({ field: "VOUCHERID", op: "eq", data: options.data.voucherid });
        myfilter.rules.push({ field: "VOUCHERNO", op: "eq", data: options.data.voucherno });

        var List = [];

        $.ajax({
            url: getDomain() + OutStandingReportView.variables.BindCashBankDetailsGroupListUrl + "&myfilters=" + JSON.stringify(myfilter),
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
                        if (JsonObject.serviceresponse.detailslist.details.length) {
                            List = JsonObject.serviceresponse.detailslist.details;
                        }
                        else {
                            List.push(JsonObject.serviceresponse.detailslist.details);
                        }
                    }
                }
                else {
                    DevExVariables.InvalidResponseCode(data);
                }
            },
            error: OnError
        });

        return $("<div>").dxDataGrid({
            onInitialized: List,
            dataSource: new DevExpress.data.CustomStore({
                key: "voucherno",
                load: function (loadOptions) {
                    var deferred = $.Deferred();

                    deferred.resolve(List, {
                        totalCount: List.length
                    });

                    return deferred.promise();
                }
            }),
            showRowLines: true,
            paging: false,
            showBorders: true,
            columns: [{ dataField: "paymentdate", caption: "Payment Date" },
                { dataField: "cashbankname", caption: "Cash/Bank Name" },
                { dataField: "voucherno", caption: "Voucher No" },
                { dataField: "paymentamt", caption: "Payment Amount" },
            ],
        });
    },

}

$(document).ready(function () {
    OutStandingReportView.initializeDevExgrid();
    OutStandingReportView.FormInitialize();
});