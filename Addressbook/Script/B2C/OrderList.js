var MainOrderList = {
    variables : {
        BindstatusListUrl: "/Common/BindMastersDetails?ServiceName=B2C_ALL_ORDER_LIST_GET",
        TrackingCrud: "/Common/OpeartionsOnMaster?ServiceName=B2C_ORDER_TRACKING_CRUD",
        Masterid: "0",
        activeactionname: "",
        Cancelval:"",
        randomNumber: 0,
        alreadystatus:"",
    },
    initializestatusJqgrid: function (url) {

        colNames = ['custordermasterid', 'Order Id', 'Customer Name','City','Email Id','Mobile No', 'Order Date','Customer Id'],
            colModel = [
                        { name: "CUSTORDERMASTERID", index: "CUSTORDERMASTERID", width: 5, xmlmap: xmlvars.common_colmap + "CUSTORDERMASTERID", search: false, hidden: true, searchoptions: jqGridVariables.stringSearchOption },
                        { name: "ORDERID", index: "ORDERID", width: 4, xmlmap: xmlvars.common_colmap + "ORDERID", align: "left", search: true, hidden: false, searchoptions: jqGridVariables.stringSearchOption },
                        { name: "CUSTOMERNAME", index: "CUSTOMERNAME", align: "left", width: 8, xmlmap: xmlvars.common_colmap + "CUSTOMERNAME", sortable: true, search: true, searchoptions: jqGridVariables.stringSearchOption },
                        { name: "CITYNAME", index: "CITYNAME", align: "left", width: 5, xmlmap: xmlvars.common_colmap + "CITYNAME", sortable: true, search: true, searchoptions: jqGridVariables.stringSearchOption },
                        { name: "EMAILID", index: "EMAILID", align: "left", width: 8, xmlmap: xmlvars.common_colmap + "EMAILID", sortable: false, search: false },
                        { name: "MOBILENO", index: "MOBILENO", align: "left", width: 8, xmlmap: xmlvars.common_colmap + "MOBILENO", sortable: false, search: false},
                        { name: "ORDERDATE", width: 10, index: "ORDERDATE", align: "left", xmlmap: xmlvars.common_colmap + "ORDERDATE", search: true, searchoptions: jqGridVariables.stringSearchOption },
                        { name: "CUSTOMERID", width: 10, index: "CUSTOMERID", align: "left", xmlmap: xmlvars.common_colmap + "CUSTOMERID", hidden:true },
                        
            ];
            colNames.push('View');
            colModel.push({ name: 'edit', index: 'edit', width: 3, sortable: false, align: "center", search: false, formatter: function (cv, op, ro) { return jqGridVariables.ViewBtnFmatter(cv, op, ro, 'MainOrderList', 'view') } });
            $("#table_list_status").GridUnload();
            $("#table_list_status").jqGrid({
                url: getDomain() + url,
                datatype: "xml",
                height: '100%',
                autowidth: true,
                shrinkToFit: true,
                rowNum: 25,
                rowList: [25, 50, 100],
                colNames: colNames,
                colModel: colModel,
                pager: "#pager_list_status",
                xmlReader: {
                    root: xmlvars.common_root,
                    row: xmlvars.common_row,
                    page: xmlvars.common_response + "CURRENTPAGE",
                    total: xmlvars.common_response + "TOTALPAGES",
                    records: xmlvars.common_response + "TOTALRECORDS",
                    repeatitems: false,
                    id: "CUSTORDERMASTERID"
                },
                loadComplete: function () {
                    $("tr.jqgrow:even").addClass('myAltRowClass');
                    $("#table_list_status").jqGrid('setGridHeight', $(window).innerHeight() - 220 - ($("#gbox_table_list_status").height() - $('#gbox_table_list_status .ui-jqgrid-bdiv').height()));

                    //if ($('#table_list_status').getGridParam('records') == 0)
                    //    $('.ui-jqgrid-htable').hide();
                    //else
                    //    $('.ui-jqgrid-htable').show();

                    var width = $('#jqgrid_status').width();
                    if (width <= 430) {
                        width = 595;
                    }
                    $('#table_list_status').setGridWidth(width);

                },
                loadError: OnJqloadError,
                beforeProcessing: OnJqbeforeProcessingErrorcheck,
                viewrecords: true,
                hidegrid: false,
                sortname: 'ORDERDATE',
                sortorder: 'desc',
            });
            $("#table_list_status").jqGrid('navGrid', '#pager_list_status',
                { edit: false, add: false, del: false, search: true },
                { height: 320 }
        );
            $("#pager_list_status").css("width", "");
            AlignJqGridHeader('table_list_status', ['edit']);

    },
    initializestatusCancelJqgrid: function (url) {

        colNames = ['OrderActionMasId', 'Order Id', 'Customer Name','Cancel Reason', 'Order Date','Cancel Date','Customer Id'],
            colModel = [
                        { name: "ORDERACTIONMASID", index: "ORDERACTIONMASID", width: 5, xmlmap: xmlvars.common_colmap + "ORDERACTIONMASID", search: false, hidden: true, searchoptions: jqGridVariables.stringSearchOption },
                        { name: "ORDERID", index: "ORDERID", width: 4, xmlmap: xmlvars.common_colmap + "ORDERID", align: "left", search: true, hidden: false, searchoptions: jqGridVariables.stringSearchOption },
                        { name: "CUSTOMERNAME", index: "CUSTOMERNAME", align: "left", width: 8, xmlmap: xmlvars.common_colmap + "CUSTOMERNAME", sortable: false, search: true, searchoptions: jqGridVariables.stringSearchOption },
                        { name: "CANCELREASON", index: "CANCELREASON", align: "left", width: 8, xmlmap: xmlvars.common_colmap + "CANCELREASON", sortable: true, search: true, searchoptions: jqGridVariables.stringSearchOption },
                        { name: "ORDERDATE", width: 10, index: "ORDERDATE", align: "left", xmlmap: xmlvars.common_colmap + "ORDERDATE", search: true, searchoptions: jqGridVariables.stringSearchOption },
                        { name: "CANCELDATE", width: 10, index: "CANCELDATE", align: "left", xmlmap: xmlvars.common_colmap + "CANCELDATE", sortable: true, search: true, searchoptions: jqGridVariables.stringSearchOption },
                        { name: "CUSTOMERID", width: 10, index: "CUSTOMERID", align: "left", xmlmap: xmlvars.common_colmap + "CUSTOMERID", hidden: true },
            ];
        colNames.push('View');
        colModel.push({ name: 'edit', index: 'edit', width: 3, sortable: false, align: "center", search: false, formatter: function (cv, op, ro) { return jqGridVariables.ViewBtnFmatter(cv, op, ro, 'MainOrderList', 'view') } });
        $("#table_list_status").GridUnload();
        $("#table_list_status").jqGrid({
            url: getDomain() + url,
            datatype: "xml",
            height: '100%',
            autowidth: true,
            shrinkToFit: true,
            rowNum: 25,
            rowList: [25, 50, 100],
            colNames: colNames,
            colModel: colModel,
            pager: "#pager_list_status",
            xmlReader: {
                root: xmlvars.common_root,
                row: xmlvars.common_row,
                page: xmlvars.common_response + "CURRENTPAGE",
                total: xmlvars.common_response + "TOTALPAGES",
                records: xmlvars.common_response + "TOTALRECORDS",
                repeatitems: false,
                id: "ORDERACTIONMASID"
            },
            loadComplete: function () {
                $("tr.jqgrow:even").addClass('myAltRowClass');
                $("#table_list_status").jqGrid('setGridHeight', $(window).innerHeight() - 220 - ($("#gbox_table_list_status").height() - $('#gbox_table_list_status .ui-jqgrid-bdiv').height()));

                //if ($('#table_list_status').getGridParam('records') == 0)
                //    $('.ui-jqgrid-htable').hide();
                //else
                //    $('.ui-jqgrid-htable').show();

                var width = $('#jqgrid_status').width();
                if (width <= 430) {
                    width = 595;
                }
                $('#table_list_status').setGridWidth(width);

            },
            loadError: OnJqloadError,
            beforeProcessing: OnJqbeforeProcessingErrorcheck,
            viewrecords: true,
            hidegrid: false,
            sortname: 'ORDERDATE',
            sortorder: 'desc',
        });

        $("#table_list_status").jqGrid('navGrid', '#pager_list_status',
            { edit: false, add: false, del: false, search: true },
            { height: 320 }
    );
        $("#pager_list_status").css("width", "");
        AlignJqGridHeader('table_list_status', ['edit']);

    },
    initializestatusReturnJqgrid: function (url) {

        colNames = ['ORDERACTIONRETURNMASID', 'Order Id', 'Customer Name', 'Return Reason', 'Order Date', 'Return Date','Customer id'],
            colModel = [
                        { name: "ORDERACTIONRETURNMASID", index: "ORDERACTIONRETURNMASID", width: 5, xmlmap: xmlvars.common_colmap + "ORDERACTIONRETURNMASID", search: false, hidden: true, searchoptions: jqGridVariables.stringSearchOption },
                        { name: "ORDERID", index: "ORDERID", width: 4, xmlmap: xmlvars.common_colmap + "ORDERID", align: "left", search: true, hidden: false, searchoptions: jqGridVariables.stringSearchOption },
                        { name: "CUSTOMERNAME", index: "CUSTOMERNAME", align: "left", width: 8, xmlmap: xmlvars.common_colmap + "CUSTOMERNAME", sortable: false, search: true, searchoptions: jqGridVariables.stringSearchOption },
                        { name: "RETURNREASON", index: "RETURNREASON", align: "left", width: 8, xmlmap: xmlvars.common_colmap + "RETURNREASON", sortable: true, search: true, searchoptions: jqGridVariables.stringSearchOption },
                        { name: "ORDERDATE", width: 10, index: "ORDERDATE", align: "left", xmlmap: xmlvars.common_colmap + "ORDERDATE", search: true, searchoptions: jqGridVariables.stringSearchOption },
                        { name: "RETURNDATE", width: 10, index: "RETURNDATE", align: "left", xmlmap: xmlvars.common_colmap + "RETURNDATE", sortable: true, search: true, searchoptions: jqGridVariables.stringSearchOption },
                        { name: "CUSTOMERID", width: 10, index: "CUSTOMERID", align: "left", xmlmap: xmlvars.common_colmap + "CUSTOMERID", hidden: true },
            ];
        colNames.push('View');
        colModel.push({ name: 'edit', index: 'edit', width: 3, sortable: false, align: "center", search: false, formatter: function (cv, op, ro) { return jqGridVariables.ViewBtnFmatter(cv, op, ro, 'MainOrderList', 'view') } });
        $("#table_list_status").GridUnload();
        $("#table_list_status").jqGrid({
            url: getDomain() + url,
            datatype: "xml",
            height: '100%',
            autowidth: true,
            shrinkToFit: true,
            rowNum: 25,
            rowList: [25, 50, 100],
            colNames: colNames,
            colModel: colModel,
            pager: "#pager_list_status",
            xmlReader: {
                root: xmlvars.common_root,
                row: xmlvars.common_row,
                page: xmlvars.common_response + "CURRENTPAGE",
                total: xmlvars.common_response + "TOTALPAGES",
                records: xmlvars.common_response + "TOTALRECORDS",
                repeatitems: false,
                id: "ORDERACTIONRETURNMASID"
            },
            loadComplete: function () {
                $("tr.jqgrow:even").addClass('myAltRowClass');
                $("#table_list_status").jqGrid('setGridHeight', $(window).innerHeight() - 220 - ($("#gbox_table_list_status").height() - $('#gbox_table_list_status .ui-jqgrid-bdiv').height()));

                //if ($('#table_list_status').getGridParam('records') == 0)
                //    $('.ui-jqgrid-htable').hide();
                //else
                //    $('.ui-jqgrid-htable').show();

                var width = $('#jqgrid_status').width();
                if (width <= 430) {
                    width = 595;
                }
                $('#table_list_status').setGridWidth(width);

            },
            loadError: OnJqloadError,
            beforeProcessing: OnJqbeforeProcessingErrorcheck,
            viewrecords: true,
            hidegrid: false,
            sortname: 'ORDERDATE',
            sortorder: 'desc',
        });

        $("#table_list_status").jqGrid('navGrid', '#pager_list_status',
            { edit: false, add: false, del: false, search: true },
            { height: 320 }
    );
        $("#pager_list_status").css("width", "");
        AlignJqGridHeader('table_list_status', ['edit']);

    },
    ViewId: function (id) {
        var rowData = jQuery("#table_list_status").getRowData(id);
        MainOrderList.variables.Masterid = id;
        $("#hiddencustomerid").val(rowData['CUSTOMERID']);
        var myfilter = { rules: [] };
        if ($("#txtgeneralstatus").val() == 'General')
        {
            myfilter.rules.push({ field: "CUSTORDERMASTERID", op: "eq", data: id });
        }
        else if ($("#txtgeneralstatus").val() == 'Cancel')
        {
            myfilter.rules.push({ field: "ORDERACTIONMASID", op: "eq", data: id });
        } 
        else if ($("#txtgeneralstatus").val() == 'Return')
        {
            myfilter.rules.push({ field: "ORDERACTIONRETURNMASID", op: "eq", data: id });
        }
        myfilter.rules.push({ field: "TYPENAME", op: "eq", data: $("#txtgeneralstatus").val() });
        myfilter.rules.push({ field: "STATUSORDER", op: "eq", data: $('#txtactionstatus li.liactiveclass p').html() });
        myfilter.rules.push({ field: "STATICSTATUSNAME", op: "eq", data: $('#txtactionstatus li.liactiveclass label').html() });
        $.ajax({
            url: getDomain() + "/Common/BindMastersDetails?ServiceName=B2C_ORDER_DETAIL_GET&myfilters=" + JSON.stringify(myfilter),
            async: false,
            cache: false,
            type: 'GET',
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    var JsonObject = xml2json.parser(data);
                    $("#ordertabgrid").hide();
                    $("#showstatusdetail").show();
                    $("#customerdetail").html("");
                    $("#shippingdetail").html("");
                    $("#ordertracking").html("");
                    $("#txtpayamount").html("");
                    $("#txtdeliverycharge").html("");
                    $("#txtgiftwrapperamt").html("");
                    $("#txtpayfinalamount").html("");
                    $("#designdetail").html("");
                    $("#divpaymentdetail").hide();
                    $("#divshippingdetail").hide();
                    if (JsonObject.serviceresponse.customerlist != undefined) {
                        $("#customerdetail").append($("#Ddlcustomerdetail").render(JsonObject.serviceresponse.customerlist.customerdetails));
                    }
                    if (JsonObject.serviceresponse.detailslist != undefined) {
                        $("#divcancelorderdetail").hide();
                        $("#divreturnorderdetail").hide();
                        $("#custorderid").html(JsonObject.serviceresponse.detailslist.details.orderid);
                        $("#custorderdate").html(JsonObject.serviceresponse.detailslist.details.orderdate);
                        var CurrencyCode = JsonObject.serviceresponse.detailslist.details.currencytype || "INR";
                        $("#custorderfinalamount").html(JsonObject.serviceresponse.detailslist.details.finalamount.toLocaleString(undefined, { style: 'currency', currency: CurrencyCode, minimumFractionDigits: 0, maximumFractionDigits: 0 }));
                        if ($("#txtgeneralstatus").val() == 'Cancel') {
                            $("#divcancelorderdetail").show();
                            $("#txtcanceldate").html(JsonObject.serviceresponse.detailslist.details.canceldate);
                            $("#txtcancelreason").html(rowData['CANCELREASON']);
                            $("#txtcancelremark").html(JsonObject.serviceresponse.detailslist.details.cancelremark);
                        }
                        else if ($("#txtgeneralstatus").val() == 'Return') {
                            $("#divreturnorderdetail").show();
                            if (JsonObject.serviceresponse.detailslist.details.returnauthenticationcode != undefined) {
                                $("#divreauthenticationcode").show();
                                $("#txtreturnauthcodep").html(JsonObject.serviceresponse.detailslist.details.returnauthenticationcode);
                            } else {
                                $("#divreauthenticationcode").hide();
                                $("#txtreturnauthcodep").html("");
                            }
                            $("#txtreturndate").html(JsonObject.serviceresponse.detailslist.details.returndate);
                            $("#txtreturnreason").html(rowData['RETURNREASON']);
                            $("#txtreturnremark").html(JsonObject.serviceresponse.detailslist.details.returnremark);
                        }
                    }
                    if (JsonObject.serviceresponse.shippinglist != undefined) {
                        $("#divshippingdetail").show();
                        $("#shippingdetail").append($("#Ddlshippingdetail").render(JsonObject.serviceresponse.shippinglist.shippingdetails));
                    }
                    if (JsonObject.serviceresponse.paymentlist != undefined) {
                        $("#divpaymentdetail").show();
                        $("#txtCurrencyType").html(CurrencyCode);
                        $("#txtpayamount").html(JsonObject.serviceresponse.paymentlist.paymentdetails.amount.toLocaleString(undefined, { style: 'currency', currency: CurrencyCode, minimumFractionDigits: 0, maximumFractionDigits: 0 }));
                        $("#txtdeliverycharge").html(JsonObject.serviceresponse.paymentlist.paymentdetails.deliverycharge.toLocaleString(undefined, { style: 'currency', currency: CurrencyCode, minimumFractionDigits: 0, maximumFractionDigits: 0 }));
                        $("#txtgiftwrapperamt").html(JsonObject.serviceresponse.paymentlist.paymentdetails.giftwrapperamt.toLocaleString(undefined, { style: 'currency', currency: CurrencyCode, minimumFractionDigits: 0, maximumFractionDigits: 0 }));
                        $("#txtpayfinalamount").html(JsonObject.serviceresponse.paymentlist.paymentdetails.finalamount.toLocaleString(undefined, { style: 'currency', currency: CurrencyCode, minimumFractionDigits: 0, maximumFractionDigits: 0 }));
                    }
                    if (JsonObject.serviceresponse.tracklist != undefined) {
                        $("#ordertracking").append($("#DDLordertracking").render(JsonObject.serviceresponse.tracklist.trackdetails));
                    }
                    if (JsonObject.serviceresponse.detailslist.details.orderlist != undefined) {
                       
                        $("#designdetail").append($("#Ddldesigndetail").render(JsonObject.serviceresponse.detailslist.details.orderlist.orderdetails));
                        $(".indianprice").each(function () {
                            var id = $(this).attr('id');
                            var Rowid = id.split("indianprice");
                            var totalp = $("#ipr" + Rowid[1]).val();
                            var convertint = parseInt(totalp).toLocaleString(undefined, {
                                style: 'currency', currency: CurrencyCode,
                                minimumFractionDigits: 0,
                                maximumFractionDigits: 0,
                            });
                            $("#" + id).html(convertint);
                        });
                    }
                    if (JsonObject.serviceresponse.statuslist != undefined) {
                        $("#orderstaticdetail").html("");
                        $("#orderstaticdetail").append($("#ddlorderstaticdetail").render(JsonObject.serviceresponse.statuslist.statusdetail));
                    }
                    if ($("#txtgeneralstatus").val() == 'General') {
                        $(".cancelcheckdiv").css("display", "block");
                    }
                    else {
                        $(".cancelcheckdiv").css("display", "none");
                    }
                }
                else {
                    InvalidResponseCode(data);
                }
            },
            error: OnError
        });
        
    },
    SelectStatus: function (id) {
        if ($("#txtgeneralstatus").val() != "")
        {
            $("#showstatusdetail").hide();
            $("#ordertabgrid").show();
            $("#txtactionstatus").show();
            MainOrderList.Insidestatus(id);
            //$('#txtactionstatus li:first-child a').addClass("active");
            //$('#txtactionstatus li:first-child').addClass("liactiveclass");
            //MainOrderList.variables.activeactionname = $("#inputhidden" + $('#txtactionstatus li:first-child span').html()).val();
            $('#txtactionstatus li:first-child a').trigger("click");
        }
        else {
            MainOrderList.variables.activeactionname = "";
            $("#showstatusdetail").hide();
            $("#ordertabgrid").hide();
            $("#txtactionstatus").hide();
        }
    },
    Insidestatus:function(id){
        var myfilter = { rules: [] };
        myfilter.rules.push({ field: "ACTIONTYPE", op: "eq", data: 'Action' });
        myfilter.rules.push({ field: "TYPENAME", op: "eq", data: $("#" + id).val() });
        $.ajax({
            url: getDomain() + "/Common/BindMastersDetails?ServiceName=B2C_ALL_ORDER_LIST_GET&myfilters=" + JSON.stringify(myfilter),
            async: false,
            cache: false,
            type: 'GET',
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    var JsonObject = xml2json.parser(data);
                    $("#actionnavbar").show();
                    $('#txtactionstatus').html("");
                    if (JsonObject.serviceresponse.detailslist != undefined) {
                        $("#txtactionstatus").append($("#DdlactionStatus").render(JsonObject.serviceresponse.detailslist.details));
                        var myfilter1 = { rules: [] }, url;
                        myfilter1.rules.push({ field: "ACTIONID", op: "eq", data: $('#txtactionstatus #' + MainOrderList.variables.activeactionname + ' span').html() });
                        myfilter1.rules.push({ field: "TYPENAME", op: "eq", data: $("#txtgeneralstatus").val() });
                        myfilter1.rules.push({ field: "FROMDATE", op: "eq", data: $("#txt_fromdate").val() });
                        myfilter1.rules.push({ field: "TODATE", op: "eq", data: $("#txt_todate").val() });
                        myfilter1.rules.push({ field: "SEARCHKEYWORD", op: "eq", data: $("#searchdata").val() });

                        if ($("#txtgeneralstatus").val() == 'General') {
                            url = MainOrderList.variables.BindstatusListUrl + "&myfilters=" + JSON.stringify(myfilter1);
                            MainOrderList.initializestatusJqgrid(url);
                        }
                        else if ($("#txtgeneralstatus").val() == 'Cancel') {
                            url = MainOrderList.variables.BindstatusListUrl + "&myfilters=" + JSON.stringify(myfilter1);
                            MainOrderList.initializestatusCancelJqgrid(url);
                        }
                        else if ($("#txtgeneralstatus").val() == 'Return') {
                            url = MainOrderList.variables.BindstatusListUrl + "&myfilters=" + JSON.stringify(myfilter1);
                            MainOrderList.initializestatusReturnJqgrid(url);
                        }
                    }
                }
                else {
                    InvalidResponseCode(data);
                }
            },
            error: OnError
        });
    },
    ChangeStatus: function () {
        if ($("#orderstaticdetail option:selected").attr("sttype") == "Return Confirmed") {
            MainOrderList.variables.randomNumber = getRandomInt(100000000, 999999999);
            $("#labelretuenauthentication").html(MainOrderList.variables.randomNumber);
            $("#modalreturnauthentication").modal("show");
        }
        else {
            if (MainOrderList.variables.alreadystatus == $("#orderstaticdetail option:selected").html())
            {
                OperationMessage("", 'Please Select Other Status', 'warning');
            }
            else {
                MainOrderList.savealldata();
            }
            
        }
    },
    savealldata: function () {
        var data = {
            "ORDERID": $("#custorderid").html(),
            "ACTIONID": $("#orderstaticdetail").val(),
            "TYPENAME": $("#txtgeneralstatus").val(),
            "CUSTOMERID": $("#hiddencustomerid").val(),
            "STATICSTATUSNAME": $("#orderstaticdetail option:selected").attr("sttype"),
        }
        if (($("#orderstaticdetail option:selected").attr("sttype") == "Cancelled and Refund Process") && $("#txtgeneralstatus").val() == 'General') {
            if ($('.checkboxdata :checkbox:checked').length < 1) {
                OperationMessage("", 'Please select at least one Canceled Item', 'warning');
                $(".checkboxdata label::before").css("border", "1px solid #d00a0a;");
                return false;
            }
            else {
                $(".checkboxdata label::before").css("border", "1px solid #cccccc;");
                data.CANCELITEM = MainOrderList.variables.Cancelval;
            }

        }
        if ($("#orderstaticdetail option:selected").attr("sttype") == "Return Confirmed") {
           
            data.RETURNAUTHORIZATIONCODE = MainOrderList.variables.randomNumber;
        }
        if ($("#txtgeneralstatus").val() == 'Cancel') {
            data.ORDERACTIONMASID = MainOrderList.variables.Masterid;
        }
        else if ($("#txtgeneralstatus").val() == 'Return') {
            data.ORDERACTIONRETURNMASID = MainOrderList.variables.Masterid;
        }
        $.ajax({
            url: getDomain() + MainOrderList.variables.TrackingCrud,
            data: data,
            async: true,
            cache: false,
            type: 'POST',
            success: MainOrderList.btnMasterSubmitOnSuccess,
            error: OnError,
        });
    },
    btnMasterSubmitOnSuccess: function (data) {
        if ($(data).find('RESPONSECODE').text() == "0") {
            $("#ordertabgrid").show();
            $("#showstatusdetail").hide();
            $("#table_list_status").trigger("reloadGrid", [{ current: true }]);
            MainOrderList.Insidestatus("txtgeneralstatus");
            MainOrderList.variables.randomNumber = 0;
            $("#modalreturnauthentication").modal("hide");
            $("#labelretuenauthentication").html("");
            $('#txtactionstatus #' + MainOrderList.variables.activeactionname + ' a').addClass("active");
            $('#txtactionstatus #' + MainOrderList.variables.activeactionname).addClass("liactiveclass");
        }
        else {
            InvalidResponseCode(data);
        }
    },
    BtnCancel: function () {
        MainOrderList.variables.Masterid = "0";
        $("#ordertabgrid").show();
        $("#showstatusdetail").hide();
    },
    ChangeDate: function () {
        if ($("#txtgeneralstatus").val() != "") {
            //MainOrderList.Insidestatus("txtgeneralstatus");
            //if (MainOrderList.variables.activeactionname != "") {
            //    $('#txtactionstatus #' + MainOrderList.variables.activeactionname + ' a').addClass("active");
            //    $('#txtactionstatus #' + MainOrderList.variables.activeactionname).addClass("active");
            //}
            var myfilter1 = { rules: [] }, url;
            myfilter1.rules.push({ field: "ACTIONID", op: "eq", data: $('#txtactionstatus li a.active').attr("href") });
            myfilter1.rules.push({ field: "TYPENAME", op: "eq", data: $("#txtgeneralstatus").val() });
            myfilter1.rules.push({ field: "FROMDATE", op: "eq", data: $("#txt_fromdate").val() });
            myfilter1.rules.push({ field: "TODATE", op: "eq", data: $("#txt_todate").val() });
            myfilter1.rules.push({ field: "SEARCHKEYWORD", op: "eq", data: $("#searchdata").val() });
            
            if ($("#txtgeneralstatus").val() == 'General') {
                url = MainOrderList.variables.BindstatusListUrl + "&myfilters=" + JSON.stringify(myfilter1);
                MainOrderList.initializestatusJqgrid(url);
            }
            else if ($("#txtgeneralstatus").val() == 'Cancel') {
                url = MainOrderList.variables.BindstatusListUrl + "&myfilters=" + JSON.stringify(myfilter1);
                MainOrderList.initializestatusCancelJqgrid(url);
            }
            else if ($("#txtgeneralstatus").val() == 'Return') {
                url = MainOrderList.variables.BindstatusListUrl + "&myfilters=" + JSON.stringify(myfilter1);
                MainOrderList.initializestatusReturnJqgrid(url);
            }
        }
    },
    checkcancelclick: function (id) {
        var iscancel="";
        iscancel += id + ',';
        var strVal = $.trim(iscancel);
        var lastChar = strVal.slice(-1);
        if (lastChar == ',') {
            strVal = strVal.slice(0, -1);
        }
        MainOrderList.variables.Cancelval = strVal;
    }
}
function BindAction(id,active) {
    MainOrderList.variables.activeactionname = $("#inputhidden" + id).val();
    $("#ordertabgrid").show();
    $("#showstatusdetail").hide();
    
    $('#txtactionstatus li a').removeClass("active");
    $('#txtactionstatus li').removeClass("liactiveclass");
    
    var myfilter1 = { rules: [] };
    myfilter1.rules.push({ field: "ACTIONID", op: "eq", data: id });
    myfilter1.rules.push({ field: "TYPENAME", op: "eq", data: $("#txtgeneralstatus").val() });
    myfilter1.rules.push({ field: "FROMDATE", op: "eq", data: $("#txt_fromdate").val() });
    myfilter1.rules.push({ field: "TODATE", op: "eq", data: $("#txt_todate").val() });
    myfilter1.rules.push({ field: "SEARCHKEYWORD", op: "eq", data: $("#searchdata").val() });
    
    if ($("#txtgeneralstatus").val() == 'General') {
        url = MainOrderList.variables.BindstatusListUrl + "&myfilters=" + JSON.stringify(myfilter1);
        MainOrderList.initializestatusJqgrid(url);
    }
    else if ($("#txtgeneralstatus").val() == 'Cancel') {
        url = MainOrderList.variables.BindstatusListUrl + "&myfilters=" + JSON.stringify(myfilter1);
        MainOrderList.initializestatusCancelJqgrid(url);
    }
    else if ($("#txtgeneralstatus").val() == 'Return') {
        url = MainOrderList.variables.BindstatusListUrl + "&myfilters=" + JSON.stringify(myfilter1);
        MainOrderList.initializestatusReturnJqgrid(url);
    }
    $(active).addClass("liactiveclass");
    MainOrderList.variables.alreadystatus = $(active).attr('id');

}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
$(document).ready(function () {
   
    /*------------start date----------*/
    var d, firstDay;
    d = new Date();
    var lastWeekDate = new Date(d.setDate(d.getDate() - 30));
    $('#txt_fromdate').datepicker({
        format: 'dd M yyyy',
        endDate: "today"
    }).datepicker("setDate", lastWeekDate);
  
    //var newDate = addDays(new Date(), 7);
   
    $("#txt_todate").datepicker({
        format: 'dd M yyyy',
    }).datepicker("setDate", "0");
    /*------------End date----------*/

    var myfilter = { rules: [] };
    myfilter.rules.push({ field: "ACTIONTYPE", op: "eq", data: 'MainStatusType' });
    BindDropdownCountry('txtgeneralstatus', 'DdlGeneralStatus', "/Common/BindMastersDetails?ServiceName=B2C_ALL_ORDER_LIST_GET&myfilters=" + JSON.stringify(myfilter), 'Select Status')
    //$(".statustimeline li").click(function () {
    //    $(".statustimeline li").removeClass("active");
    //    $(this).addClass("active");
    //});
   
   
});
function addDays(theDate, days) {
    return new Date(theDate.getTime() + days * 24 * 60 * 60 * 1000);
}