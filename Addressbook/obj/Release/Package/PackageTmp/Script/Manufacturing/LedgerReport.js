var LedgerReportView = {
    variables: {
        BindGroupListUrl: "/Common/BindMastersDetails?ServiceName=ACC_LEDGER_REPORT_GET",
        BindDetailsGroupListUrl: "/Common/BindMastersDetails?ServiceName=ACC_LEDGER_REPORT_DETAILS_GET",
        BindDateGroupListUrl: "/Common/BindMastersDetails?ServiceName=OUTLET_ACCOUNT_YEAR_MASTER_GET",
        Oper: 'Add',
        addedit: "added",
        Masterid: "",
        RowCount: 1,
    },
    FormInitialize: function () {

        LedgerReportView.variables.dx_datefrom = $("#dx_datefrom").dxDateBox({
            type: "date",
            showClearButton: true,
            useMaskBehavior: true,
            displayFormat: "dd MMM yyyy",
        }).dxDateBox("instance");

        LedgerReportView.variables.dx_dateto = $("#dx_dateto").dxDateBox({
            type: "date",
            showClearButton: true,
            useMaskBehavior: true,
            displayFormat: "dd MMM yyyy",
        }).dxDateBox("instance");

        LedgerReportView.variables.dx_btnSubmit = $("#dx_btnSubmit").dxButton({
            stylingMode: "outlined",
            icon: "check",
            text: "Apply",
            type: "success",
            onClick: function () {
                LedgerReportView.variables.dx_dataGrid.refresh();
            }
        }).dxButton("instance");
    },  

    initializeDevExgrid: function () {
        LedgerReportView.variables.dx_dataGrid = $("#dx_dataGrid").dxDataGrid({
            dataSource: new DevExpress.data.CustomStore({
                key: "accid",
                load: function (loadOptions) {
                    var deferred = $.Deferred();

                    var myfilter = { rules: [] };
                    myfilter.rules.push({ field: "GROUPNAME", op: "eq", data: "Current Assets" });
                    myfilter.rules.push({ field: "FROMDATE", op: "eq", data: LedgerReportView.variables.dx_datefrom.option().text });
                    myfilter.rules.push({ field: "TODATE", op: "eq", data: LedgerReportView.variables.dx_dateto.option().text });

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
                        url: getDomain() + LedgerReportView.variables.BindGroupListUrl + "&" + parameters.join("&") + "&myfilters=" + JSON.stringify(myfilter),
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
            grouping: {
                autoExpandAll: false,
            },
            allowColumnReordering: true,
            rowAlternationEnabled: true,
            wordWrapEnabled: true,
            allowColumnResizing: true,
            columnResizingMode: "widget",
            columnAutoWidth: true,
            showBorders: true,
            showColumnLines: true,
            showRowLines: true,
            groupPanel: {
                visible: true,
            },
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
            remoteOperations: { groupPaging: true },
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
                { dataField: "mobile1", caption: "Mobile", dataType: "string", filterOperations: ["contains"], allowSorting: true, allowFiltering: true, allowHeaderFiltering: false, allowGrouping: false },
            //{
                //caption: "Amount", alignment: "center",
                //columns: [
                     { dataField: "opening_amt", caption: "Opening Amount", dataType: "string", filterOperations: ["contains"], allowSorting: false, allowFiltering: false, allowHeaderFiltering: false, allowGrouping: false },
                    { dataField: "credit_amt", caption: "Credit Amount", dataType: "string", filterOperations: ["contains"], allowSorting: false, allowFiltering: false, allowHeaderFiltering: false, allowGrouping: false },
                    { dataField: "debit_amt", caption: "Debit Amount", dataType: "string", filterOperations: ["contains"], allowSorting: false, allowFiltering: false, allowHeaderFiltering: false, allowGrouping: false },
                    { dataField: "balance_amt", caption: "Balance", dataType: "string", filterOperations: ["contains"], allowSorting: false, allowFiltering: false, allowHeaderFiltering: false, allowGrouping: false },
                //]
            //},
              //{
              //    caption: "Metal", alignment: "center",
              //    columns: [
              //         { dataField: "opening_amt", caption: "Opening Amount", dataType: "string", filterOperations: ["contains"], allowSorting: false, allowFiltering: true, allowHeaderFiltering: false, allowGrouping: false },
              //        { dataField: "credit_amt", caption: "Credit Amount", dataType: "string", filterOperations: ["contains"], allowSorting: false, allowFiltering: true, allowHeaderFiltering: false, allowGrouping: false },
              //        { dataField: "debit_amt", caption: "Debit Amount", dataType: "string", filterOperations: ["contains"], allowSorting: false, allowFiltering: true, allowHeaderFiltering: false, allowGrouping: false },
              //        { dataField: "balance_amt", caption: "Balance", dataType: "string", filterOperations: ["contains"], allowSorting: false, allowFiltering: true, allowHeaderFiltering: false, allowGrouping: false },
              //    ]
              //},
              //  {
              //      caption: "Diamond", alignment: "center",
              //      columns: [
              //           { dataField: "opening_amt", caption: "Opening Amount", dataType: "string", filterOperations: ["contains"], allowSorting: false, allowFiltering: true, allowHeaderFiltering: false, allowGrouping: false },
              //          { dataField: "credit_amt", caption: "Credit Amount", dataType: "string", filterOperations: ["contains"], allowSorting: false, allowFiltering: true, allowHeaderFiltering: false, allowGrouping: false },
              //          { dataField: "debit_amt", caption: "Debit Amount", dataType: "string", filterOperations: ["contains"], allowSorting: false, allowFiltering: true, allowHeaderFiltering: false, allowGrouping: false },
              //          { dataField: "balance_amt", caption: "Balance", dataType: "string", filterOperations: ["contains"], allowSorting: false, allowFiltering: true, allowHeaderFiltering: false, allowGrouping: false },
              //      ]
              //  },
              //    {
              //        caption: "Stone", alignment: "center",
              //        columns: [
              //             { dataField: "opening_amt", caption: "Opening Amount", dataType: "string", filterOperations: ["contains"], allowSorting: false, allowFiltering: true, allowHeaderFiltering: false, allowGrouping: false },
              //            { dataField: "credit_amt", caption: "Credit Amount", dataType: "string", filterOperations: ["contains"], allowSorting: false, allowFiltering: true, allowHeaderFiltering: false, allowGrouping: false },
              //            { dataField: "debit_amt", caption: "Debit Amount", dataType: "string", filterOperations: ["contains"], allowSorting: false, allowFiltering: true, allowHeaderFiltering: false, allowGrouping: false },
              //            { dataField: "balance_amt", caption: "Balance", dataType: "string", filterOperations: ["contains"], allowSorting: false, allowFiltering: true, allowHeaderFiltering: false, allowGrouping: false },
              //        ]
              //    }
           
               
            ],
            summary: {
                groupItems: [{
                    column: 'accountname',
                    summaryType: 'count',
                }],
            },
            masterDetail: {
            enabled: true,
            template: LedgerReportView.GetGridDetails,
            }
        }).dxDataGrid("instance");
    },
    
    GetGridDetails: function (container, options) {
        var myfilter = { rules: [] };
        myfilter.rules.push({ field: "ACCID", op: "eq", data: options.key });
        myfilter.rules.push({ field: "FROMDATE", op: "eq", data: LedgerReportView.variables.dx_datefrom.option().text });
        myfilter.rules.push({ field: "TODATE", op: "eq", data: LedgerReportView.variables.dx_dateto.option().text });

        var List = [];

        $.ajax({
            url: getDomain() + LedgerReportView.variables.BindDetailsGroupListUrl + "&myfilters=" + JSON.stringify(myfilter),
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
            columns: [{ dataField: "voucherdate", caption: "Voucher Date" },
                { dataField: "subbook", caption: "Sub Book " },
                { dataField: "vouchertype", caption: "Voucher Type" },
                { dataField: "voucherno", caption: "Voucher No" },
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
                { dataField: "credit_amt", caption: "Credit Amount" },
                { dataField: "debit_amt", caption: "Debit Amount" },
            ],
        });
    },

    GetDateInfo: function () {
        $.ajax({
            url: getDomain() + LedgerReportView.variables.BindDateGroupListUrl + "&_search=true&searchField=ACCOUNTYEARID&searchOper=eq&searchString=" + getAccountYearId(),
            async: false,
            cache: false,
            type: 'POST',
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
               
                    $(data).find('TODATE').text()
                    var now = new Date;

                    LedgerReportView.variables.dx_datefrom.option({ value: $(data).find('FROMDATE').text() });
                    LedgerReportView.variables.dx_dateto.option({ value: $(data).find('TODATE').text() })
                   



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
    LedgerReportView.initializeDevExgrid();
    LedgerReportView.FormInitialize();
    LedgerReportView.GetDateInfo();
});