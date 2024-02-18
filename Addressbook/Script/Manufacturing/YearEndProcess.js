var YearEndProcess = {
    variables: {
        BindMasterUrl: "/Common/BindMastersDetails?ServiceName=OUTLET_ACCOUNT_YEAR_MASTER_GET",
        //YearEndProcessUrl: "/Common/OpeartionsOnMaster?ServiceName=OUTLET_YEARENDPROCESS",
        BindYearEndProcessUrl: "/Common/BindMastersDetails?ServiceName=ACC_YEARENDPROCESS_GET",
        jqGridFlag: false,
        ProcessVar: [],
        TimerCounterVar: [],
        TotalRec: 0,
        IsAnyRunning: 0,
        processclicks: 1,
        DetailsControlsList:[],
        dx_switchAccyearOpening: "",
        dx_switchPeriodclose: "",
        RowCount:1,
    },

    FormInitialize: function () {
        YearEndProcess.variables.dx_switchAccyearOpening = $("#dx_switchAccyearOpening").dxSwitch({  
            value: true,
            switchedOnText: "Yes",
            switchedOffText: "No"
        }).dxSwitch("instance");


        YearEndProcess.variables.dx_switchPeriodclose = $("#dx_switchPeriodclose").dxSwitch({
                value: true,
        switchedOnText: "Yes",
        switchedOffText: "No"
        }).dxSwitch("instance");

        //$("#dx_switchAccyearOpening") = $("#dx_switchAccyearOpening").dxSwitch({
        //        value: true,
        //        switchedOnText: "Yes",
        //        switchedOffText: "No"
        //    }).dxSwitch("instance");


    },

    BindYearEndProcessList: function () {
        var status = '';
        YearEndProcess.variables.IsAnyRunning = 0;
        if ($('#rbtnPCDAll').prop("checked"))
            status = 'ALL';
        else if ($('#rbtnPCDRunning').prop("checked"))
            status = 'Running';
        else if ($('#rbtnPCDCompleted').prop("checked"))
            status = 'Completed';
        else if ($('#rbtnPCDStopped').prop("checked"))
            status = 'Stopped';
        $("#tbodyYearEndProcess").html("");
        var myfilter = { rules: [] };
        myfilter.rules.push({ field: "STATUS", op: "eq", data: status });

        $.ajax({
            url: getDomain() + YearEndProcess.variables.BindYearEndProcessUrl, // + "&rows=10&myfilters=" + JSON.stringify(myfilter) // + "&sidx=STARTDATE&sord=desc", //+ "&_search=true&searchField=NEWSLETTERSMSID&searchOper=eq&searchString=" + ID,   // + "&page=" + YearEndProcess.variables.processclicks +
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

                        $.each(List, function (key, obj) {
                            YearEndProcess.AddNewLineMainDetails(key, obj);
                        });
                    }
                }
                else {
                    DevExVariables.InvalidResponseCode(data);
                }
                //if ($(data).find('RESPONSECODE').text() == "0") {
                //    var JsonObject = xml2json.parser(data);
                //    if (JsonObject.serviceresponse.detailslist != undefined) {
                //        $("#tbodyYearEndProcess").html($("#YearEndProcessDetail").render(JsonObject.serviceresponse.detailslist.details));
                //    }

                //    /* For pagination */
                //    var view, totRecords = (JsonObject.serviceresponse != undefined) ? parseInt(JsonObject.serviceresponse.totalrecords) : 0,
                //    pageSize = 10;
                //    totPages = (JsonObject.serviceresponse != undefined) ? parseInt(JsonObject.serviceresponse.totalpages) : 0;

                //    if (totRecords <= pageSize) {
                //        $("#backwardProcessDetail").attr('disabled', true);
                //        $("#forwardProcessDetail").attr('disabled', true);
                //        $("#backwardProcessDetail").hide();
                //        $("#forwardProcessDetail").hide();
                //    }
                //    else if (YearEndProcess.variables.processclicks == totPages) {
                //        $("#backwardProcessDetail").attr('disabled', false);
                //        $("#forwardProcessDetail").attr('disabled', true);
                //        $("#backwardProcessDetail").show();
                //        $("#forwardProcessDetail").show();
                //    }
                //    else if (YearEndProcess.variables.processclicks > 1 && YearEndProcess.variables.processclicks < totPages) {
                //        $("#backwardProcessDetail").attr('disabled', false);
                //        $("#forwardProcessDetail").attr('disabled', false);
                //        $("#backwardProcessDetail").show();
                //        $("#forwardProcessDetail").show();
                //    }
                //    else {
                //        $("#backwardProcessDetail").attr('disabled', true);
                //        $("#forwardProcessDetail").attr('disabled', false);
                //        $("#backwardProcessDetail").show();
                //        $("#forwardProcessDetail").show();
                //    }

                //    if (totRecords < (pageSize * YearEndProcess.variables.processclicks))
                //        view = (parseInt(pageSize * (YearEndProcess.variables.processclicks - 1)) + 1) + ' - ' + totRecords;
                //    else
                //        view = (parseInt(pageSize * (YearEndProcess.variables.processclicks - 1)) + 1) + ' - ' + (pageSize * YearEndProcess.variables.processclicks);

                //    $("#RecordsProcessDetail").html(view);
                //    $("#TotalRecordProcessDetail").html(totRecords);
                //    /***********************/
                //    if (JsonObject.serviceresponse.isrunning == undefined || JsonObject.serviceresponse.isrunning == '1')
                //        YearEndProcess.variables.IsAnyRunning = 1;
                //    else
                //        YearEndProcess.variables.IsAnyRunning = 0;
                //}
                //else {
                //    InvalidResponseCode(data);
                //}
            },
            error: OnError
        });

        if ($("#tbodyYearEndProcess").html() == "") {
            $("#tbodyYearEndProcess").hide();
            $("#ProcessDetailPager").hide();
            $("#lblPCDGridMsg").show();
        }
        else {
            $("#tbodyYearEndProcess").show();
            $("#ProcessDetailPager").show();
            $("#lblPCDGridMsg").hide();
        }

        if (YearEndProcess.variables.IsAnyRunning == 1)
            $('#chkAutoRefresh').iCheck('enable');
        else {
            $('#chkAutoRefresh').iCheck('disable');
        }
    },

    StartYearEndProces: function (AccountYearId) {
        if ($("#divProcessDetail").css('display') == 'none') {
            $("#iProcessDetail").removeClass("fa-caret-down");
            $("#iProcessDetail").addClass("fa-caret-up");
            $("#spProcessDetail").html("Hide Process Detail");
            $("#divProcessDetail").show();
        }

        var data = {
            "YEARENDACCOUNTYEARID": AccountYearId,//$("#ddlAccountYear").val(),
            "FLAG": "CheckProcessDone",
            "oper": 'add'
        }

        $.ajax({
            url: getDomain() + YearEndProcess.variables.YearEndProcessUrl,
            data: data,
            async: true,
            cache: false,
            type: 'POST',
            success: function (result) {
                if ($(result).find('RESPONSECODE').text() == "0") {
                    OperationMessage("", "Year End Process Start Successfully", 'success');
                    YearEndProcess.variables.processclicks = 1;
                    $("#lblTimerCounter").html('10');
                    $('#rbtnPCDRunning').iCheck('check');
                    $("#chkAutoRefresh").prop('checked', true);
                    var ProcessVar = setInterval(function () {
                        YearEndProcess.BindYearEndProcessList();
                        $("#lblTimerCounter").html('10');
                        if (YearEndProcess.variables.IsAnyRunning == 0) {
                            YearEndProcess.clearProcess();
                        }
                    }, 10000);

                    var TimerCounterVar = setInterval(function () {
                        var counter = parseInt($("#lblTimerCounter").html());
                        if (counter > 0) { counter = counter - 1; };
                        $("#lblTimerCounter").html(counter);
                    }, 900);

                    if ($.inArray(ProcessVar, YearEndProcess.variables.ProcessVar) == -1)
                        YearEndProcess.variables.ProcessVar.push(ProcessVar);

                    if ($.inArray(TimerCounterVar, YearEndProcess.variables.TimerCounterVar) == -1)
                        YearEndProcess.variables.TimerCounterVar.push(TimerCounterVar);

                }
                else
                    notificationMessage('Error', $(result).find('RESPONSEMESSAGE').text(), 'error');
            },
            error: OnError,
        });
    },

    ViewError: function (ErrorDetail) {
        $("#TxtErrorDetail").text("");
        $("#TxtErrorDetail").text(ErrorDetail);
        $("#modalError").modal('show');
    },

    clearProcess: function () {
        var totProcessVar = YearEndProcess.variables.ProcessVar.length, totTimerCounterVar = YearEndProcess.variables.TimerCounterVar.length;
        if (totProcessVar > 0 && totTimerCounterVar > 0) {
            var i;
            for (i = 0; i < totProcessVar; i++) {
                clearInterval(YearEndProcess.variables.ProcessVar[i]);
            }

            for (i = 0; i < totTimerCounterVar; i++) {
                clearInterval(YearEndProcess.variables.TimerCounterVar[i]);
            }

            YearEndProcess.variables.ProcessVar = [];
            YearEndProcess.variables.TimerCounterVar = [];

            $("#lblTimerCounter").html('');
            $("#chkAutoRefresh").prop('checked', false);
        }
    },

    ShowProcessDetail: function () {
        if ($("#divProcessDetail").css('display') == 'block') {
            $("#divProcessDetail").hide();
            $("#iProcessDetail").removeClass("fa-caret-up");
            $("#iProcessDetail").addClass("fa-caret-down");
            $("#spProcessDetail").html("Show Process Detail");
        }
        else {
            $("#iProcessDetail").removeClass("fa-caret-down");
            $("#iProcessDetail").addClass("fa-caret-up");
            $("#spProcessDetail").html("Hide Process Detail");
            $("#divProcessDetail").show();
        }
    },

    //BindAccountYearCloseDetail: function () {
    //    $.ajax({
    //        url: getDomain() + "/Common/BindMastersDetails?ServiceName=ACC_ACCOUNTYEAR_CLOSEPERIOD_GET",   //&sidx=FROMDATE&sord=ASC
    //        async: true,
    //        cache: false,
    //        type: 'POST',
    //        success: function (result) {
    //            if ($(result).find('RESPONSECODE').text() == "0") {
    //                var JsonObject = xml2json.parser(result);
    //                if (JsonObject.serviceresponse.detailslist != undefined) {

    //                    //YearEndProcess.AddNewLineDetails(obj);
    //                    //$("#tbodyAccountYearPeriod").html($("#AccountYearPeriodList").render(JsonObject.serviceresponse.detailslist.details));
    //                    //$("#tbodyAccountYearPeriod .Myswitch").bootstrapSwitch();
    //                    //$('.Myswitch').on('switchChange.bootstrapSwitch', function (event, state) {
    //                    //    var chkId = $(this).attr('id');
    //                    //    var Id = chkId.split('ChkIsClose');
    //                    //    YearEndProcess.AccountYearPeriodClose(Id[1], state);
    //                    //});
    //                }
    //            }
    //            else
    //                notificationMessage('Error', $(result).find('RESPONSEMESSAGE').text(), 'error');
    //        },
    //        error: OnError,
    //    });
    //},

    AccountYearPeriodClose: function (AccountYearId, state) {
        var data = {
            "CLOSEDACCOUNTYEARID": AccountYearId,
            "ISCLOSED": state
        }
        $.ajax({
            url: getDomain() + "/Common/OpeartionsOnMaster?ServiceName=ACC_ACCOUNTYEAR_CLOSEPERIOD_CRUD",
            data: data,
            async: true,
            cache: false,
            type: 'POST',
            success: function (result) {
                if ($(result).find('RESPONSECODE').text() == "0") {
                    OperationMessage("", $(result).find('RESPONSEMESSAGE').text(), 'success');
                }
                else {
                    notificationMessage('Error', $(result).find('RESPONSEMESSAGE').text(), 'error');
                }
                YearEndProcess.BindAccountYearCloseDetail();
            },
            error: OnError,
        });
    },

    BindAccountYearCloseDetail: function () {

            $.ajax({
                url: getDomain() + "/Common/BindMastersDetails?ServiceName=ACC_ACCOUNTYEAR_CLOSEPERIOD_GET&sidx=FROMDATE&sord=ASC",
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

                            $.each(List, function (key, obj) {
                                YearEndProcess.AddNewLineDetails(key, obj);
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

    AddNewLineDetails: function (key, obj) {

        var postfix = YearEndProcess.variables.RowCount;

        $("#TableAccountYearPeriod tbody").append(
            '<tr>'
                + '<td class="accountname" style="text-align:center; line-height: 35px; text-align: center;">' + obj.accountyearname + '</td>'
                + '<td class="statusswitch" style="text-align:center;"><div id="dx_switchAccyearOpening' + postfix + '"></div></td>'
                + '<td class="periodcloseswitch" style="text-align:center;"><div id="dx_switchPeriodclose' + postfix + '"></div></td>'
                + '<td class="Kasar" style="text-align:center;"><input type="button" style="text-align:right;" class="btn btn-success" value="Run Year End Process" /></td>'
            + '</tr>'
        );

        YearEndProcess.DetailTableFormInit(postfix, obj);

        YearEndProcess.variables.RowCount = postfix + 1;
    },

    AddNewLineMainDetails: function (key, obj) {

        //var postfix = YearEndProcess.variables.RowCount;

        $("#TableYearEndProcess tbody").append(
            '<tr>'
                + '<td class="FromAccYear" style="text-align:center; line-height: 50px; text-align: center;">' + obj.currentaccyearname + '</td>'
                + '<td class="ToAccYear" style="text-align:center;">' + obj.nextaccyearname + '</td>'
                + '<td class="StartDate" style="text-align:center;">' + obj.startdate + '</td>'
                + '<td class="EndDate" style="text-align:center;">' + obj.enddate + '</td>'
                + '<td class="TotalAccounts" style="text-align:center;">' + obj.totalaccounts + '</td>'
                + '<td class="CompeleteAccounts" style="text-align:center;">' + obj.completeaccounts + '</td>'
                + '<td class="Status" style="text-align:center;">' + obj.status + '</td>'
                + '<td class="Error" style="text-align:center;">' + obj.errormessage + '</td>'
            + '</tr>'
        );

        //YearEndProcess.DetailTableFormInit(postfix, obj);
        //YearEndProcess.variables.RowCount = postfix + 1;
    },

    DetailTableFormInit: function (postfix, obj) {
        /*----------------------Registration of Detail table controls---------------------*/
        var tmp = [];
        tmp[postfix] = { srno: postfix, dx_switchAccyearOpening: "", dx_switchPeriodclose: ""};

        YearEndProcess.variables.DetailsControlsList = Object.assign(YearEndProcess.variables.DetailsControlsList, tmp);

        YearEndProcess.variables.DetailsControlsList[postfix].dx_switchAccyearOpening = $("#dx_switchAccyearOpening" + postfix).dxSwitch({
            value: false,
            switchedOnText: "Yes",
            switchedOffText: "No"
        }).dxSwitch("instance");

        YearEndProcess.variables.DetailsControlsList[postfix].dx_switchPeriodclose = $("#dx_switchPeriodclose" + postfix).dxSwitch({
            value: false,
            switchedOnText: "Yes",
            switchedOffText: "No",
        }).dxSwitch("instance");

    },
}

$(document).ready(function () {
    YearEndProcess.FormInitialize();
    YearEndProcess.BindAccountYearCloseDetail();
    YearEndProcess.BindYearEndProcessList();

    $("#chkAutoRefresh").on('ifChanged', function (event) {
        if ($(this).is(":checked")) {
            YearEndProcess.clearProcess();
        }
        else {
            YearEndProcess.BindYearEndProcessList();
        }
    });

    /* ProcessDetail pager */
    $("#backwardProcessDetail").click(function () {
        YearEndProcess.variables.processclicks -= 1;
        YearEndProcess.BindYearEndProcessList();
    });
    $("#forwardProcessDetail").click(function () {
        YearEndProcess.variables.processclicks += 1;
        YearEndProcess.BindYearEndProcessList();
    });

    $('input[type=radio][name=PCDRadio]').on('ifChanged', function (event) {
        if ($(event.target).prop("checked")) {
            $("#tbodyYearEndProcess").html("");
            YearEndProcess.variables.processclicks = 1;
            YearEndProcess.BindYearEndProcessList();
        }
    });


});