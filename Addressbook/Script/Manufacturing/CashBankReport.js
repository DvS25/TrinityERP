var CashBankReportView = {
    variables: {
        BindMainGridBankAccount: "/Common/BindMastersDetails?ServiceName=ACC_CASHBANK_BANK_REPORT_GET",
        BindMainGridCashAccount: "/Common/BindMastersDetails?ServiceName=ACC_CASHBANK_CASH_REPORT_GET",
        BindDetailsGroupListUrl: "/Common/BindMastersDetails?ServiceName=ACC_CASHBANK_REPORT_DETAILS_GET",
        dx_dataGridCashAccount: "",
        dx_dataGridBankAccount: "",
    },

    initializeDevExgrid1: function (Name) {
        CashBankReportView.variables.dx_dataGridCashAccount = $("#dx_dataGridCashAccount").dxDataGrid({
            dataSource: new DevExpress.data.CustomStore({
                key: "accid",
                load: function (loadOptions) {
                    var deferred = $.Deferred();

                    if (Name == "Today") {
                        var startDate = moment();
                        var endDate = moment();
                    }
                    else if (Name == "Yesterday") {
                        var startDate = moment().subtract(1, 'days');
                        var endDate = moment().subtract(1, 'days');
                    }
                    else if (Name == "Last 7 Days") {
                        var startDate = moment().subtract(6, 'days');
                        var endDate = moment();
                    }
                    else if (Name == "Last 30 Days") {
                        var startDate = moment().subtract(29, 'days');
                        var endDate = moment();
                    }
                    else if (Name == "This Month") {
                        var startDate = moment().startOf('month').add(1, 'days');
                        var endDate = moment().endOf('month');
                    }
                    else if (Name == "Last Month") {
                        var startDate = moment().subtract(1, 'month').startOf('month').add(1, 'days');
                        var endDate = moment().subtract(1, 'month').endOf('month');
                    }
                    else if (Name == "Custom Range") {
                        var startDate = $(".drp-buttons span").html().substring(0, 10);
                        var endDate = $(".drp-buttons span").html().substring(13, 23);
                    }

                    var myfilter = { rules: [] };
                    myfilter.rules.push({ field: "STARTDATE", op: "eq", data: startDate });
                    myfilter.rules.push({ field: "ENDDATE", op: "eq", data: endDate });

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
                        url: getDomain() + CashBankReportView.variables.BindMainGridCashAccount + "&" + parameters.join("&") + "&myfilters=" + JSON.stringify(myfilter),
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
                        if (result.serviceresponse.detailslistcash) {
                            var List = [];
                            if (result.serviceresponse.detailslistcash.details.length)
                                List = result.serviceresponse.detailslistcash.details;
                            else
                                List.push(result.serviceresponse.detailslistcash.details);
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
            columns: [{ dataField: "accid", allowFiltering: false, allowSorting: true, sortIndex: 1, sortOrder: "desc", visible: false },
               { dataField: "partycode", caption: "Account Code", dataType: "string", filterOperations: ["contains"], allowSorting: true, allowFiltering: true, allowHeaderFiltering: false },
               { dataField: "accountname", caption: "Account Name", dataType: "string", filterOperations: ["contains"], allowSorting: true, allowFiltering: true, allowHeaderFiltering: false },
               //{ dataField: "accountno", caption: "Account No", dataType: "string", filterOperations: ["contains"], allowSorting: true, allowFiltering: true, allowHeaderFiltering: false },
               //{ dataField: "headname", caption: "Account Type", dataType: "string", filterOperations: ["contains"], allowSorting: true, allowFiltering: true, allowHeaderFiltering: false },
               { dataField: "openingamt", caption: "Opening Amount", dataType: "number", filterOperations: ["contains"], allowSorting: true, allowFiltering: true, allowHeaderFiltering: false },
               { dataField: "totalcreditamt", caption: "Credit Amount", dataType: "number", filterOperations: ["contains"], allowSorting: true, allowFiltering: true, allowHeaderFiltering: false },
               { dataField: "totaldebitamt", caption: "Debit Amount", dataType: "number", filterOperations: ["contains"], allowSorting: true, allowFiltering: true, allowHeaderFiltering: false },
               { dataField: "totalamount", caption: "Account Balance", dataType: "number", filterOperations: ["contains"], allowSorting: true, allowFiltering: true, allowHeaderFiltering: false },
            ],
            masterDetail: {
                enabled: true,
                template: CashBankReportView.GetGridDetails,
            }
        }).dxDataGrid("instance");
    },
    initializeDevExgrid2: function (Name) {
        CashBankReportView.variables.dx_dataGridCashAccount = $("#dx_dataGridBankAccount").dxDataGrid({
            dataSource: new DevExpress.data.CustomStore({
                key: "accid",
                load: function (loadOptions) {
                    var deferred = $.Deferred();

                    if (Name == "Today") {
                        var startDate = moment();
                        var endDate = moment();
                    }
                    else if (Name == "Yesterday") {
                        var startDate = moment().subtract(1, 'days');
                        var endDate = moment().subtract(1, 'days');
                    }
                    else if (Name == "Last 7 Days") {
                        var startDate = moment().subtract(6, 'days');
                        var endDate = moment();
                    }
                    else if (Name == "Last 30 Days") {
                        var startDate = moment().subtract(29, 'days');
                        var endDate = moment();
                    }
                    else if (Name == "This Month") {
                        var startDate = moment().startOf('month').add(1, 'days');
                        var endDate = moment().endOf('month');
                    }
                    else if (Name == "Last Month") {
                        var startDate = moment().subtract(1, 'month').startOf('month').add(1, 'days');
                        var endDate = moment().subtract(1, 'month').endOf('month');
                    }
                    else if (Name == "Custom Range") {
                        var startDate = $(".drp-buttons span").html().substring(0, 10);
                        var endDate = $(".drp-buttons span").html().substring(13, 23);
                    }

                    var myfilter = { rules: [] };
                    myfilter.rules.push({ field: "STARTDATE", op: "eq", data: startDate });
                    myfilter.rules.push({ field: "ENDDATE", op: "eq", data: endDate });

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
                        url: getDomain() + CashBankReportView.variables.BindMainGridBankAccount + "&" + parameters.join("&") + "&myfilters=" + JSON.stringify(myfilter),
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
                        if (result.serviceresponse.detailslistbank) {
                            var List = [];
                            if (result.serviceresponse.detailslistbank.details.length)
                                List = result.serviceresponse.detailslistbank.details;
                            else
                                List.push(result.serviceresponse.detailslistbank.details);
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
            columns: [{ dataField: "accid", allowFiltering: false, allowSorting: true, sortIndex: 1, sortOrder: "desc", visible: false },
                { dataField: "partycode", caption: "Account Code", dataType: "string", filterOperations: ["contains"], allowSorting: true, allowFiltering: true, allowHeaderFiltering: false },
                { dataField: "accountname", caption: "Account Name", dataType: "string", filterOperations: ["contains"], allowSorting: true, allowFiltering: true, allowHeaderFiltering: false },
                { dataField: "accountno", caption: "Account No", dataType: "string", filterOperations: ["contains"], allowSorting: true, allowFiltering: true, allowHeaderFiltering: false },
                //{ dataField: "headname", caption: "Account Type", dataType: "string", filterOperations: ["contains"], allowSorting: true, allowFiltering: true, allowHeaderFiltering: false },
                { dataField: "openingamt", caption: "Opening Amount", dataType: "number", filterOperations: ["contains"], allowSorting: true, allowFiltering: true, allowHeaderFiltering: false },
                { dataField: "totalcreditamt", caption: "Credit Amount", dataType: "number", filterOperations: ["contains"], allowSorting: false, allowFiltering: false, allowHeaderFiltering: false },
                { dataField: "totaldebitamt", caption: "Debit Amount", dataType: "number", filterOperations: ["contains"], allowSorting: false, allowFiltering: false, allowHeaderFiltering: false },
                { dataField: "totalamount", caption: "Account Balance", dataType: "number", filterOperations: ["contains"], allowSorting: false, allowFiltering: false, allowHeaderFiltering: false },
            ],
            masterDetail: {
                enabled: true,
                template: CashBankReportView.GetGridDetails,
            }
        }).dxDataGrid("instance");
    },

    GetGridDetails: function (container, options) {
        //var List = [];

        return $("<div>").dxDataGrid({
            //onInitialized: List,
            dataSource: new DevExpress.data.CustomStore({
                key: "accid",
                load: function (loadOptions) {
                    var deferred = $.Deferred();

                    //----------------------- CONVERT DATE FORMAT----------------------------
                    var startDateString = $("#reportrange span").html().substring(0, 10);
                    var dateStart = startDateString.split("/");
                    var Startdate = dateStart[1] + '/' + dateStart[0] + '/' + dateStart[2];

                    var endDateString = $("#reportrange span").html().substring(13, 23);
                    var dateEnd = endDateString.split("/");
                    var Enddate = dateEnd[1] + '/' + dateEnd[0] + '/' + dateEnd[2];

                    var myfilter = { rules: [] };
                    myfilter.rules.push({ field: "ACCID", op: "eq", data: options.key });
                    myfilter.rules.push({ field: "STARTDATE", op: "eq", data: Startdate });
                    myfilter.rules.push({ field: "ENDDATE", op: "eq", data: Enddate });

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
                        url: getDomain() + CashBankReportView.variables.BindDetailsGroupListUrl + "&" + parameters.join("&") + "&myfilters=" + JSON.stringify(myfilter),
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
                pageSize: 10
            },
            pager: {
                visible: true,
                showInfo: true,
                showNavigationButtons: true,
                showPageSizeSelector: true,
                allowedPageSizes: [10, 20, 100]
            },
            columns:
                [{ dataField: "voucherno", caption: "Voucher No", dataType: "string", filterOperations: ["contains"], allowSorting: true, allowFiltering: true, allowHeaderFiltering: false },
                { dataField: "accountname", caption: "Account Name", dataType: "string", filterOperations: ["contains"], allowSorting: true, allowFiltering: true, allowHeaderFiltering: false },
                { dataField: "voucherdate", caption: "Voucher Date", dataType: "string", filterOperations: ["contains"], allowSorting: true, allowFiltering: true, allowHeaderFiltering: false, sortIndex: 1, sortOrder: "desc", },
                { dataField: "totalcreditamt", caption: "Credit Amount", dataType: "number", filterOperations: ["contains"], allowSorting: false, allowFiltering: false, allowHeaderFiltering: false },
                { dataField: "totaldebitamt", caption: "Debit Amount", dataType: "number", filterOperations: ["contains"], allowSorting: false, allowFiltering: false, allowHeaderFiltering: false },
                ],
        });
    },

    HeadTotals: function (Name) {

        if (Name == "Today") {
            var startDate = moment();
            var endDate = moment();
        }
        else if (Name == "Yesterday") {
            var startDate = moment().subtract(1, 'days');
            var endDate = moment().subtract(1, 'days');
        }
        else if (Name == "Last 7 Days") {
            var startDate = moment().subtract(6, 'days');
            var endDate = moment();
        }
        else if (Name == "Last 30 Days") {
            var startDate = moment().subtract(29, 'days');
            var endDate = moment();
        }
        else if (Name == "This Month") {
            var startDate = moment().startOf('month').add(1, 'days');
            var endDate = moment().endOf('month');
        }
        else if (Name == "Last Month") {
            var startDate = moment().subtract(1, 'month').startOf('month').add(1, 'days');
            var endDate = moment().subtract(1, 'month').endOf('month');
        }
        else if (Name == "Custom Range") {
            var startDate = $(".drp-buttons span").html().substring(0, 10);
            var endDate = $(".drp-buttons span").html().substring(13, 23);
        }

        var myfilter;
        myfilter = { rules: [] };
        myfilter.rules.push({ field: "STARTDATE", op: "eq", data: startDate });
        myfilter.rules.push({ field: "ENDDATE", op: "eq", data: endDate });


        var CashAccountHead = 0, bankAccountHead = 0, TotalAccountHead = 0;

        //----------------------------------get bank accounts details------------------------------------------------

        $.ajax({
            url: getDomain() + "/Common/BindMastersDetails?ServiceName=ACC_CASHBANK_BANK_REPORT_GET&myfilters=" + JSON.stringify(myfilter),
            async: false,
            cache: false,
            type: 'POST',
            success: function (data) {
                if ($(data).find("RESPONSECODE").text() == 0) {
                    result = xml2json.parser(data);
                    $.each(result, function (key, obj) {
                        if (result.serviceresponse.detailslistbank) {
                            if (result.serviceresponse.detailslistbank.details.length > 0) {
                                $.each(result.serviceresponse.detailslistbank.details, function (key, obj) {
                                    bankAccountHead += result.serviceresponse.detailslistbank.details[key].totalamount;
                                });
                            } else {
                                bankAccountHead += result.serviceresponse.detailslistbank.details.totalamount;
                            }
                            $('#BankHeadAmt').html(bankAccountHead);
                            if ($('#BankHeadAmt').html().includes('-') == true) {
                                document.getElementById("BankHeadAmt").style.color = "red";
                            }
                            else {
                                document.getElementById("BankHeadAmt").style.color = "#3c3b3b";
                            }
                        }
                    });
                }
                else {
                    result = "Error";
                }
            },
            error: function () {
                result = "Error";
            }
        });
        //----------------------------------get cash accounts details------------------------------------------------

        $.ajax({
            url: getDomain() + "/Common/BindMastersDetails?ServiceName=ACC_CASHBANK_CASH_REPORT_GET&myfilters=" + JSON.stringify(myfilter),
            async: false,
            cache: false,
            type: 'POST',
            success: function (data) {
                if ($(data).find("RESPONSECODE").text() == 0) {
                    result = xml2json.parser(data);
                    $.each(result, function (key, obj) {
                        if (result.serviceresponse.detailslistcash) {
                            if (result.serviceresponse.detailslistcash.details.length > 0) {
                                $.each(result.serviceresponse.detailslistcash.details, function (key, obj) {
                                    CashAccountHead += result.serviceresponse.detailslistcash.details[key].totalamount;
                                });
                            } else {
                                CashAccountHead += result.serviceresponse.detailslistcash.details.totalamount;
                            }
                        }
                        $('#CashHeadAmt').html(CashAccountHead);
                        if ($('#CashHeadAmt').html().includes('-') == true) {
                            document.getElementById("CashHeadAmt").style.color = "red";
                        }
                        else {
                            document.getElementById("CashHeadAmt").style.color = "#3c3b3b";
                        }
                    });
                }
                else {
                    result = "Error";
                }
            },
            error: function () {
                result = "Error";
            }
        });

        //----------------------------------Total Cash Accounts And Bank Accounts------------------------------------------------

        TotalAccountHead = CashAccountHead + bankAccountHead;
        $('#TotalHeadAmt').html(TotalAccountHead);
        if ($('#TotalHeadAmt').html().includes('-') == true)
        {
            document.getElementById("TotalHeadAmt").style.color = "red";
        }
        else {
            document.getElementById("TotalHeadAmt").style.color = "#3c3b3b";
        }
       
    },


};

$(document).ready(function () {
    CashBankReportView.initializeDevExgrid1('Last 30 Days');
    CashBankReportView.initializeDevExgrid2('Last 30 Days');
    CashBankReportView.HeadTotals('Last 30 Days');

    $(function () {

        var start = moment().subtract(29, 'days');
        var end = moment();

        function cb(start, end) {
            $('#reportrange span').html(start.format('DD/MM/YYYY') + ' - ' + end.format('DD/MM/YYYY'));
        }

        $('#reportrange').daterangepicker({
            startDate: start,
            endDate: end,
            ranges: {
                'Today': [moment(), moment()],
                'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                'Last 7 Days': [moment().subtract(6, 'days'), moment()],
                'Last 30 Days': [moment().subtract(29, 'days'), moment()],
                'This Month': [moment().startOf('month'), moment().endOf('month')],
                'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
            },
            //opens: 'left',
            ////startDate: moment().subtract('days', 29),
            ////startDate: moment().subtract('days', 6),
            //startDate: moment().startOf('month'),
            //endDate: moment().endOf('month'),
            //format: 'DD/MM/YYYY',
        }, cb);


        $('.drp-buttons .applyBtn').click(function () {
            var Name = 'Custom Range';
            CashBankReportView.initializeDevExgrid1(Name);
            CashBankReportView.initializeDevExgrid2(Name);
            CashBankReportView.HeadTotals(Name);
        });

        $('.ranges ul li').click(function () {
            var Name = $(this).html();
            if (Name != 'Custom Range') {
                CashBankReportView.initializeDevExgrid1(Name);
                CashBankReportView.initializeDevExgrid2(Name);
                CashBankReportView.HeadTotals(Name);
            }
        });
        cb(start, end);
    });

});