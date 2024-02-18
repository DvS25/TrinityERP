var TrialBalanceView = {
    variables: {
        BindTrailBalanceReportUrl: "/Common/BindMastersDetails?ServiceName=ACC_TRAILBALANCE_REPORT_GET",
        BindDateGroupListUrl: "/Common/BindMastersDetails?ServiceName=OUTLET_ACCOUNT_YEAR_MASTER_GET",
        dx_datefrom: "",
        dx_dateto: "",
        dx_btnSubmit: "",
    },

    FormInitialize: function () {

        TrialBalanceView.variables.dx_datefrom = $("#dx_datefrom").dxDateBox({
            type: "date",
            showClearButton: true,
            useMaskBehavior: true,
            displayFormat: "dd MMM yyyy",
        }).dxDateBox("instance");

        TrialBalanceView.variables.dx_dateto = $("#dx_dateto").dxDateBox({
            type: "date",
            showClearButton: true,
            useMaskBehavior: true,
            displayFormat: "dd MMM yyyy",
        }).dxDateBox("instance");

        TrialBalanceView.variables.dx_btnSubmit = $("#dx_btnSubmit").dxButton({
            stylingMode: "outlined",
            icon: "check",
            text: "Apply",
            type: "success",
            onClick: function () {
                $("#BalanceDetails").load();
                TrialBalanceView.GetReport();

            }
        }).dxButton("instance");

        TrialBalanceView.variables.dx_btnprint = $("#dx_btnprint").dxButton({
            stylingMode: "outlined",
            icon: "file",
            text: "Print",
            type: "danger",

        }).dxButton("instance");

    },

    GetReport: function () {
        var myfilter, AccHeadList;
        myfilter = { rules: [] };
        myfilter.rules.push({ field: "FROMDATE", op: "eq", data: TrialBalanceView.variables.dx_datefrom.option().text });
        myfilter.rules.push({ field: "TODATE", op: "eq", data: TrialBalanceView.variables.dx_dateto.option().text });

        $.ajax({
            url: getDomain() + TrialBalanceView.variables.BindTrailBalanceReportUrl + "&myfilters=" + JSON.stringify(myfilter),
            type: "POST",
            async: false,
            cache: false,
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    var JsonObject = xml2json.parser(data);
                    if (JsonObject.serviceresponse.liabilities) {
                        $("#tbl_income tbody").html($("#liabilities").render(JsonObject.serviceresponse.liabilities.details));
                        $("#total_income").html(JsonObject.serviceresponse.totalincome.totalincome);
                    }
                    else {
                        $("#tbl_income tbody").html("<tr><td colspan='2'>No Income found.</td></tr>");
                        $("#total_income").html(0.00);
                    }

                    if (JsonObject.serviceresponse.assets) {
                        $("#tbl_expense tbody").html($("#assets").render(JsonObject.serviceresponse.assets.details));
                        $("#total_expense").html(JsonObject.serviceresponse.totalexpence.totalexpense);
                    }
                    else {
                        $("#tbl_expense tbody").html("<tr><td colspan='2'>No Expense found.</td></tr>");
                        $("#total_expense").html(0.00);
                    }
                }
                else {
                    notificationMessage('Head Name', $(data).find('RESPONSEMESSAGE').text(), 'error');
                }
            }
        })
    },

    GetDateInfo: function () {
        $.ajax({
            url: getDomain() + TrialBalanceView.variables.BindDateGroupListUrl + "&_search=true&searchField=ACCOUNTYEARID&searchOper=eq&searchString=" + getAccountYearId(),
            async: false,
            cache: false,
            type: 'POST',
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {

                    $(data).find('TODATE').text()
                    var now = new Date;

                    TrialBalanceView.variables.dx_datefrom.option({ value: $(data).find('FROMDATE').text() });
                    TrialBalanceView.variables.dx_dateto.option({ value: $(data).find('TODATE').text() })

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
    TrialBalanceView.FormInitialize();
    TrialBalanceView.GetDateInfo();
    TrialBalanceView.GetReport();
});