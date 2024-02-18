var B2C_Order_Refund_DetailView = {
    variables: {
        BindMasterCancelUrl: "/Common/BindMastersDetails?ServiceName=B2C_ORDER_CANCEL_REFUND_MASTER_GET",
        BindMasterCancelDetailUrl: "/Common/BindMastersDetails?ServiceName=B2C_ORDER_CANCEL_REFUND_DETAIL_GET",
        BindMasterReturnUrl: "/Common/BindMastersDetails?ServiceName=B2C_ORDER_RETURN_REFUND_MASTER_GET",
        BindMasterreturnDetailUrl: "/Common/BindMastersDetails?ServiceName=B2C_ORDER_RETURN_REFUND_DETAIL_GET",
        ViewRefund: function (cellvalue, options, rowObject, view) {
            if (cellvalue == 'View')
                return '<span class="label label-success" style="font-size: 100%; !important;cursor:pointer;" onclick=\"' + view + '.Btnclickrefundview(' + options.rowId + ');\">View</span>';
            else if (cellvalue == 'Refund')
                return '<span class="label label-success" style="font-size: 100%; !important;cursor:pointer;" onclick=\"' + view + '.Btnclickrefundview(' + options.rowId + ');\">Refund</span>';
        },
        ReturnViewRefund: function (cellvalue, options, rowObject, view) {
            if (cellvalue == 'View')
                return '<span class="label label-success" style="font-size: 100%; !important;cursor:pointer;" onclick=\"' + view + '.Btnclickreturnrefundview(' + options.rowId + ');\">View</span>';
            else if (cellvalue == 'Refund')
                return '<span class="label label-success" style="font-size: 100%; !important;cursor:pointer;" onclick=\"' + view + '.Btnclickreturnrefundview(' + options.rowId + ');\">Refund</span>';
        },
        Isvieworrefund: "",
        OrderActionmasId: 0,
        MastId: 0,
        MastreturnId : 0,
    },
    initializeJqgrid: function () {
        var colNames = ['Orderactionmas Id','PaymentId', 'OrderId', 'CustomerId', 'Customer Name', 'InvoiceNo', 'Transcation Amount','Refund Amount', 'RazorPayment Id', 'RazorOrder Id', 'Payment Status', 'Captured', 'PayMent Method', 'CardId', 'Bank', 'Vpa', 'Wallet', 'Email', 'Contact', 'Fee', 'Tax', 'Error Code', 'Error Description', 'Payment Date', 'Status','Action','ISVIEWREFUNDLABEL'];
        var colModel = [ 
             { name: "ORDERACTIONMASID", index: "ORDERACTIONMASID", xmlmap: xmlvars.common_colmap + "ORDERACTIONMASID", stype: 'text', sortable: true, hidden: true, search: false },
             { name: "PAYMENTID", index: "PAYMENTID", xmlmap: xmlvars.common_colmap + "PAYMENTID", stype: 'text', sortable: true, hidden: true, search: false },
             { name: "ORDERID", index: "ORDERID", width: 10, xmlmap: xmlvars.common_colmap + "ORDERID", stype: 'text', hidden: false, sortable: true, search: true, searchoptions: jqGridVariables.stringSearchOption },
             { name: "CUSTOMERID", index: "CUSTOMERID", xmlmap: xmlvars.common_colmap + "CUSTOMERID", stype: 'int', sortable: true, search: false, hidden: true },
             { name: "CUSTOMERULLNAME", index: "CUSTOMERULLNAME", width: 10, xmlmap: xmlvars.common_colmap + "CUSTOMERULLNAME", stype: 'text', sortable: true, search: true, searchoptions: jqGridVariables.stringSearchOption },
             { name: "INVOICENO", index: "INVOICENO", width: 8, xmlmap: xmlvars.common_colmap + "INVOICENO", stype: 'text', sortable: true, searchoptions: jqGridVariables.stringSearchOption },
             { name: "TRANSCATIONAMOUNT", index: "TRANSCATIONAMOUNT", width: 15, xmlmap: xmlvars.common_colmap + "TRANSCATIONAMOUNT", stype: 'int', sortable: true, searchoptions: jqGridVariables.stringSearchOption },
             { name: "REFUNDAMOUNT", index: "REFUNDAMOUNT", width: 15, xmlmap: xmlvars.common_colmap + "REFUNDAMOUNT", stype: 'text', sortable: true, searchoptions: jqGridVariables.stringSearchOption },
             { name: "RAZORPAYMENTID", index: "RAZORPAYMENTID", width: 15, xmlmap: xmlvars.common_colmap + "RAZORPAYMENTID", stype: 'text', sortable: true, search: true, searchoptions: jqGridVariables.stringSearchOption },
             { name: "RAZORORDERID", index: "RAZORORDERID", width: 15, xmlmap: xmlvars.common_colmap + "RAZORORDERID", stype: 'text', sortable: true, searchoptions: jqGridVariables.stringSearchOption },
             { name: "PAYMENTSTATUS", index: "PAYMENTSTATUS", width: 10, xmlmap: xmlvars.common_colmap + "PAYMENTSTATUS", stype: 'text', sortable: false, search: false, hidden: true },
             { name: "CAPTURED", index: "CAPTURED", xmlmap: xmlvars.common_colmap + "CAPTURED", stype: 'text', hidden: true, sortable: false, search: false, searchoptions: jqGridVariables.ActiveSearchOption },
             { name: "PAYMENTMETHOD", index: "PAYMENTMETHOD", width: 10, xmlmap: xmlvars.common_colmap + "PAYMENTMETHOD", stype: 'text', sortable: true, search: false, hidden: true },
             { name: "CARDID", index: "CARDID", width: 8, xmlmap: xmlvars.common_colmap + "CARDID", stype: 'text', sortable: true, search: false, hidden: true },
             { name: "BANK", index: "BANK", width: 10, xmlmap: xmlvars.common_colmap + "BANK", stype: 'text', sortable: true, search: false, hidden: true },
             { name: "VPA", index: "VPA", width: 10, xmlmap: xmlvars.common_colmap + "VPA", stype: 'text', sortable: true, search: false, hidden: true },
             { name: "WALLET", index: "WALLET", xmlmap: xmlvars.common_colmap + "WALLET", stype: 'text', sortable: true, search: false, hidden: true },
             { name: "EMAIL", index: "EMAIL", width: 18, xmlmap: xmlvars.common_colmap + "EMAIL", stype: 'text', sortable: true, search: false, hidden: true, searchoptions: jqGridVariables.stringSearchOption },
             { name: "CONTACT", index: "CONTACT", width: 10, xmlmap: xmlvars.common_colmap + "CONTACT", stype: 'text', sortable: true, search: false, hidden: true, searchoptions: jqGridVariables.stringSearchOption },
             { name: "FEE", index: "FEE", width: 6, xmlmap: xmlvars.common_colmap + "FEE", stype: 'text', sortable: false, sortable: true, search: false, hidden: true },
             { name: "TAX", index: "TAX", width: 6, xmlmap: xmlvars.common_colmap + "TAX", stype: 'text', sortable: false, sortable: true, search: false, hidden: true },
             { name: "ERRORCODE", index: "ERRORCODE", width: 8, xmlmap: xmlvars.common_colmap + "ERRORCODE", stype: 'text', sortable: true, search: false, hidden: true },
             { name: "ERRORDESCRIPTION", index: "ERRORDESCRIPTION", width: 10, xmlmap: xmlvars.common_colmap + "ERRORDESCRIPTION", stype: 'text', sortable: true, search: false, hidden: true },
             { name: "ENTRYDATE", index: "ENTRYDATE", width: 15, xmlmap: xmlvars.common_colmap + "ENTRYDATE", stype: 'text', sortable: false, search: true, searchoptions: jqGridVariables.stringSearchOption},
             { name: "STATUS", index: "STATUS", width: 4, xmlmap: xmlvars.common_colmap + "STATUS", stype: 'text', sortable: true, search: false, hidden: true },
             { name: "ISVIEWREFUND", index: "ISVIEWREFUND", width: 8, xmlmap: xmlvars.common_colmap + "ISVIEWREFUND", stype: 'text', sortable: true, search: false, hidden: false, formatter: function (cv, op, ro) { return B2C_Order_Refund_DetailView.variables.ViewRefund(cv, op, ro, 'B2C_Order_Refund_DetailView') } },
             { name: "ISVIEWREFUNDLABEL", index: "ISVIEWREFUNDLABEL", width: 8, xmlmap: xmlvars.common_colmap + "ISVIEWREFUND", stype: 'text', sortable: false, search: false, hidden: true },
        ];
        $("#table_list_cancelrefund").GridUnload();
        $("#table_list_cancelrefund").jqGrid({
            url: getDomain() + B2C_Order_Refund_DetailView.variables.BindMasterCancelUrl,
            datatype: "xml",
            height: "100%",
            autowidth: true,
            shrinkToFit: true,
            rowNum: 25,
            rowList: [25, 50, 100],
            colNames: colNames,
            colModel: colModel,
            pager: "#pager_list_cancelrefund",
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
                $("#table_list_cancelrefund").jqGrid('setGridHeight', $(window).innerHeight() - 200 - ($("#gbox_table_list_cancelrefund").height() - $('#gbox_table_list_cancelrefund .ui-jqgrid-bdiv').height()));

                // Hide column headers and top pager if no records were returned
                if ($('#table_list_cancelrefund').getGridParam('records') === 0) {
                    $('.ui-jqgrid-htable').hide();
                }
                else
                    $('.ui-jqgrid-htable').show();
                var width = $('#jqGrid_cancelrefund').width();
                if (width <= 430) {
                    width = 595;
                }
                $('#table_list_cancelrefund').setGridWidth(width);
            },
            loadError: OnJqloadError,
            beforeProcessing: OnJqbeforeProcessingErrorcheck,
            viewrecords: true,
            sortname: 'ORDERACTIONMASID',
            sortorder: 'desc',
        });
        $("#table_list_cancelrefund").jqGrid('navGrid', '#pager_list_cancelrefund',
                { edit: false, add: false, del: false, search: true },
                { height: 200 }
        );
        $("#pager_list_cancelrefund_left").css("width", "");
        AlignJqGridHeader('table_list_cancelrefund', ['edit', 'delete']);
    },
    initializereturnJqgrid: function () {
        var colNames = ['Orderactionmas Id', 'PaymentId', 'OrderId', 'CustomerId', 'Customer Name', 'InvoiceNo', 'Transcation Amount', 'Refund Amount', 'RazorPayment Id', 'RazorOrder Id', 'Payment Status', 'Captured', 'PayMent Method', 'CardId', 'Bank', 'Vpa', 'Wallet', 'Email', 'Contact', 'Fee', 'Tax', 'Error Code', 'Error Description', 'Payment Date', 'Status', 'Action', 'ISVIEWREFUNDLABEL'];
        var colModel = [
             { name: "ORDERACTIONRETURNMASID", index: "ORDERACTIONRETURNMASID", xmlmap: xmlvars.common_colmap + "ORDERACTIONRETURNMASID", stype: 'text', sortable: true, hidden: true, search: false },
             { name: "PAYMENTID", index: "PAYMENTID", xmlmap: xmlvars.common_colmap + "PAYMENTID", stype: 'text', sortable: true, hidden: true, search: false },
             { name: "ORDERID", index: "ORDERID", width: 10, xmlmap: xmlvars.common_colmap + "ORDERID", stype: 'text', hidden: false, sortable: true, search: true, searchoptions: jqGridVariables.stringSearchOption },
             { name: "CUSTOMERID", index: "CUSTOMERID", xmlmap: xmlvars.common_colmap + "CUSTOMERID", stype: 'int', sortable: true, search: false, hidden: true },
             { name: "CUSTOMERULLNAME", index: "CUSTOMERULLNAME", width: 10, xmlmap: xmlvars.common_colmap + "CUSTOMERULLNAME", stype: 'text', sortable: true, search: true, searchoptions: jqGridVariables.stringSearchOption },
             { name: "INVOICENO", index: "INVOICENO", width: 8, xmlmap: xmlvars.common_colmap + "INVOICENO", stype: 'text', sortable: true, searchoptions: jqGridVariables.stringSearchOption },
             { name: "TRANSCATIONAMOUNT", index: "TRANSCATIONAMOUNT", width: 15, xmlmap: xmlvars.common_colmap + "TRANSCATIONAMOUNT", stype: 'int', sortable: true, searchoptions: jqGridVariables.stringSearchOption },
             { name: "REFUNDAMOUNT", index: "REFUNDAMOUNT", width: 15, xmlmap: xmlvars.common_colmap + "REFUNDAMOUNT", stype: 'text', sortable: true, searchoptions: jqGridVariables.stringSearchOption },
             { name: "RAZORPAYMENTID", index: "RAZORPAYMENTID", width: 15, xmlmap: xmlvars.common_colmap + "RAZORPAYMENTID", stype: 'text', sortable: true, search: true, searchoptions: jqGridVariables.stringSearchOption },
             { name: "RAZORORDERID", index: "RAZORORDERID", width: 15, xmlmap: xmlvars.common_colmap + "RAZORORDERID", stype: 'text', sortable: true, searchoptions: jqGridVariables.stringSearchOption },
             { name: "PAYMENTSTATUS", index: "PAYMENTSTATUS", width: 10, xmlmap: xmlvars.common_colmap + "PAYMENTSTATUS", stype: 'text', sortable: false, search: false, hidden: true },
             { name: "CAPTURED", index: "CAPTURED", xmlmap: xmlvars.common_colmap + "CAPTURED", stype: 'text', hidden: true, sortable: false, search: false, searchoptions: jqGridVariables.ActiveSearchOption },
             { name: "PAYMENTMETHOD", index: "PAYMENTMETHOD", width: 10, xmlmap: xmlvars.common_colmap + "PAYMENTMETHOD", stype: 'text', sortable: true, search: false, hidden: true },
             { name: "CARDID", index: "CARDID", width: 8, xmlmap: xmlvars.common_colmap + "CARDID", stype: 'text', sortable: true, search: false, hidden: true },
             { name: "BANK", index: "BANK", width: 10, xmlmap: xmlvars.common_colmap + "BANK", stype: 'text', sortable: true, search: false, hidden: true },
             { name: "VPA", index: "VPA", width: 10, xmlmap: xmlvars.common_colmap + "VPA", stype: 'text', sortable: true, search: false, hidden: true },
             { name: "WALLET", index: "WALLET", xmlmap: xmlvars.common_colmap + "WALLET", stype: 'text', sortable: true, search: false, hidden: true },
             { name: "EMAIL", index: "EMAIL", width: 18, xmlmap: xmlvars.common_colmap + "EMAIL", stype: 'text', sortable: true, search: false, hidden: true, searchoptions: jqGridVariables.stringSearchOption },
             { name: "CONTACT", index: "CONTACT", width: 10, xmlmap: xmlvars.common_colmap + "CONTACT", stype: 'text', sortable: true, search: false, hidden: true, searchoptions: jqGridVariables.stringSearchOption },
             { name: "FEE", index: "FEE", width: 6, xmlmap: xmlvars.common_colmap + "FEE", stype: 'text', sortable: false, sortable: true, search: false, hidden: true },
             { name: "TAX", index: "TAX", width: 6, xmlmap: xmlvars.common_colmap + "TAX", stype: 'text', sortable: false, sortable: true, search: false, hidden: true },
             { name: "ERRORCODE", index: "ERRORCODE", width: 8, xmlmap: xmlvars.common_colmap + "ERRORCODE", stype: 'text', sortable: true, search: false, hidden: true },
             { name: "ERRORDESCRIPTION", index: "ERRORDESCRIPTION", width: 10, xmlmap: xmlvars.common_colmap + "ERRORDESCRIPTION", stype: 'text', sortable: true, search: false, hidden: true },
             { name: "ENTRYDATE", index: "ENTRYDATE", width: 15, xmlmap: xmlvars.common_colmap + "ENTRYDATE", stype: 'text', sortable: false, search: true, searchoptions: jqGridVariables.stringSearchOption },
             { name: "STATUS", index: "STATUS", width: 4, xmlmap: xmlvars.common_colmap + "STATUS", stype: 'text', sortable: true, search: false, hidden: true },
             { name: "ISVIEWREFUND", index: "ISVIEWREFUND", width: 8, xmlmap: xmlvars.common_colmap + "ISVIEWREFUND", stype: 'text', sortable: true, search: false, hidden: false, formatter: function (cv, op, ro) { return B2C_Order_Refund_DetailView.variables.ReturnViewRefund(cv, op, ro, 'B2C_Order_Refund_DetailView') } },
             { name: "ISVIEWREFUNDLABEL", index: "ISVIEWREFUNDLABEL", width: 8, xmlmap: xmlvars.common_colmap + "ISVIEWREFUND", stype: 'text', sortable: false, search: false, hidden: true },
        ];
        $("#table_list_returnrefund").GridUnload();
        $("#table_list_returnrefund").jqGrid({
            url: getDomain() + B2C_Order_Refund_DetailView.variables.BindMasterReturnUrl,
            datatype: "xml",
            height: "100%",
            autowidth: true,
            shrinkToFit: true,
            rowNum: 25,
            rowList: [25, 50, 100],
            colNames: colNames,
            colModel: colModel,
            pager: "#pager_list_returnrefund",
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
                $("#table_list_returnrefund").jqGrid('setGridHeight', $(window).innerHeight() - 200 - ($("#gbox_table_list_returnrefund").height() - $('#gbox_table_list_returnrefund .ui-jqgrid-bdiv').height()));

                // Hide column headers and top pager if no records were returned
                //if ($('#table_list_returnrefund').getGridParam('records') === 0) {
                //    $('.ui-jqgrid-htable').hide();
                //}
                //else
                //    $('.ui-jqgrid-htable').show();

                var width = $('#jqGrid_returnrefund').width();
                if (width <= 430) {
                    width = 595;
                }
                $('#table_list_returnrefund').setGridWidth(width);
            },
            loadError: OnJqloadError,
            beforeProcessing: OnJqbeforeProcessingErrorcheck,
            viewrecords: true,
            hidegrid: false,
            sortname: 'ORDERACTIONRETURNMASID',
            sortorder: 'desc',
        });
        $("#table_list_returnrefund").jqGrid('navGrid', '#pager_list_returnrefund',
                { edit: false, add: false, del: false, search: true },
                { height: 200 }
        );
        $("#pager_list_returnrefund_left").css("width", "");
        AlignJqGridHeader('table_list_returnrefund', ['edit', 'delete']);
    },
    Btnclickrefundview: function (id) {
        B2C_Order_Refund_DetailView.variables.MastId = id;
        var rowData = jQuery("#table_list_cancelrefund").getRowData(id);
        B2C_Order_Refund_DetailView.variables.Isvieworrefund = rowData['ISVIEWREFUND'];
        $("#lbltransactionamount").html(rowData['TRANSCATIONAMOUNT']);
        $("#lbltransactionamount").html(parseInt($("#lbltransactionamount").html()).toLocaleString('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0, maximumFractionDigits: 0 }));
        var myfilter = { rules: [] };
        myfilter.rules.push({ field: "ORDERACTIONMASID", op: "eq", data: rowData['ORDERACTIONMASID'] });
        $.ajax({
            url: getDomain() + B2C_Order_Refund_DetailView.variables.BindMasterCancelDetailUrl + "&myfilters=" + JSON.stringify(myfilter),
            async: false,
            cache: false,
            type: 'GET',
            success: function (data) {
                $("#lblorderid").html("");
                $("#lblorderdate").html("");
                $("#lblcanceldate").html("");
                $("#lblrefundamount").html("");
                $("#custorderfinalamount").html("");
                $("#custorderfinalrefundamount").html("");
                if ($(data).find('RESPONSECODE').text() == "0") {
                    var JsonObject = xml2json.parser(data);
                    $('#designdetail').html("");
                    if (JsonObject.serviceresponse.detailslist != undefined) {
                        $("#lblorderid").html(JsonObject.serviceresponse.detailslist.details.orderid);
                        $("#lblorderdate").html(JsonObject.serviceresponse.detailslist.details.orderdate);
                        $("#lblcanceldate").html(JsonObject.serviceresponse.detailslist.details.canceldate);
                        $("#lblrefundamount").html(JsonObject.serviceresponse.detailslist.details.finalrefundamount.toLocaleString('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0, maximumFractionDigits: 0 }));
                        $("#custorderfinalamount").html(JsonObject.serviceresponse.detailslist.details.finalamount.toLocaleString('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0, maximumFractionDigits: 0 }));
                        $("#custorderfinalrefundamount").html(JsonObject.serviceresponse.detailslist.details.finalrefundamount.toLocaleString('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0, maximumFractionDigits: 0 }));
                        if (rowData['ISVIEWREFUNDLABEL'] == "View") {
                            $("#textareacanceldiv").html("");
                            $("#textareacanceldiv").html('<label id="txtrefundnotes" class="control-label" style="text-align: left;"></label>');
                            $("#txtrefundnotes").html(JsonObject.serviceresponse.detailslist.details.refundnote);
                        } else if (rowData['ISVIEWREFUNDLABEL'] == "Refund") {
                            $("#textareacanceldiv").html("");
                            $("#textareacanceldiv").html('<textarea id="txtrefundnotes" rows="4" class="form-control" style="text-align: left;"></textarea>');
                            $("#txtrefundnotes").val("");
                        }
                    }
                    if (JsonObject.serviceresponse.detailslist.details.orderlist != undefined) {
                        $("#designdetail").append($("#Ddldesigndetail").render(JsonObject.serviceresponse.detailslist.details.orderlist.orderdetails));
                        $(".indianprice").each(function () {
                            var id = $(this).attr('id');
                            var Rowid = id.split("indianprice");
                            var totalp = $("#ipr" + Rowid[1]).val();
                            var convertint = parseInt(totalp).toLocaleString('en-IN', {
                                style: 'currency', currency: 'INR',
                                minimumFractionDigits: 0,
                                maximumFractionDigits: 0,
                            });
                            $("#" + id).html(convertint);
                        });
                        $(".indianrefundprice").each(function () {
                            var id1 = $(this).attr('id');
                            var Rowid1 = id1.split("indianrefundprice");
                            var totalp1 = $("#iprrefund" + Rowid1[1]).val();
                            var convertint1 = parseInt(totalp1).toLocaleString('en-IN', {
                                style: 'currency', currency: 'INR',
                                minimumFractionDigits: 0,
                                maximumFractionDigits: 0,
                            });
                            $("#" + id1).html(convertint1);
                        });
                    }
                }
                else {
                    InvalidResponseCode(data);
                }
            },
            error: OnError
        });
        if (rowData['ISVIEWREFUNDLABEL'] == "View") {
            $("#btnsubmintrefund").hide();
        } else if (rowData['ISVIEWREFUNDLABEL'] == "Refund") {
            $("#btnsubmintrefund").show();
        }
        $("#modalrefundandview").modal("show");
    },
    Btnclickreturnrefundview:function(id){
        B2C_Order_Refund_DetailView.variables.MastreturnId = id;
        var rowData = jQuery("#table_list_returnrefund").getRowData(id);
        B2C_Order_Refund_DetailView.variables.Isvieworrefund = rowData['ISVIEWREFUND'];
        $("#lbltransactionreturnamount").html(rowData['TRANSCATIONAMOUNT']);
        $("#lbltransactionreturnamount").html(parseInt($("#lbltransactionreturnamount").html()).toLocaleString('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0, maximumFractionDigits: 0 }));

        var myfilter = { rules: [] };
        myfilter.rules.push({ field: "ORDERACTIONRETURNMASID", op: "eq", data: rowData['ORDERACTIONRETURNMASID'] });
        $.ajax({
            url: getDomain() + B2C_Order_Refund_DetailView.variables.BindMasterreturnDetailUrl + "&myfilters=" + JSON.stringify(myfilter),
            async: false,
            cache: false,
            type: 'GET',
            success: function (data) {
                $("#lblreturnorderid").html("");
                $("#lblreturnorderdate").html("");
                $("#lblreturndate").html("");
                $("#lblreturnamount").html("");
                $("#lblreturnchargeamount").html("");
                $("#custorderreturnfinalamount").html("");
                $("#custorderreturnfinalrefundamount").html("");
                $("#custorderreturnchargeamount").html("");
                if ($(data).find('RESPONSECODE').text() == "0") {
                    var JsonObject = xml2json.parser(data);
                    $('#returndesigndetail').html("");
                    if (JsonObject.serviceresponse.detailslist != undefined) {
                        $("#lblreturnorderid").html(JsonObject.serviceresponse.detailslist.details.orderid);
                        $("#lblreturnorderdate").html(JsonObject.serviceresponse.detailslist.details.orderdate);
                        $("#lblreturndate").html(JsonObject.serviceresponse.detailslist.details.canceldate);
                        $("#lblreturnamount").html(JsonObject.serviceresponse.detailslist.details.refundamount.toLocaleString('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0, maximumFractionDigits: 0 }));
                        $("#lblreturnchargeamount").html(JsonObject.serviceresponse.detailslist.details.returncharge.toLocaleString('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0, maximumFractionDigits: 0 }));
                        $("#custorderreturnfinalamount").html(JsonObject.serviceresponse.detailslist.details.finalamount.toLocaleString('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0, maximumFractionDigits: 0 }));
                        $("#custorderreturnfinalrefundamount").html(JsonObject.serviceresponse.detailslist.details.refundamount.toLocaleString('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0, maximumFractionDigits: 0 }));
                        $("#custorderreturnchargeamount").html(JsonObject.serviceresponse.detailslist.details.returncharge.toLocaleString('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0, maximumFractionDigits: 0 }));
                        if (rowData['ISVIEWREFUNDLABEL'] == "View") {
                            $("#textareareruendiv").html("");
                            $("#textareareruendiv").html('<label id="txtreturnrefundnotes" class="control-label" style="text-align: left;"></label>');
                            $("#txtreturnrefundnotes").html(JsonObject.serviceresponse.detailslist.details.refundnote);
                        } else if (rowData['ISVIEWREFUNDLABEL'] == "Refund") {
                            $("#textareareruendiv").html("");
                            $("#textareareruendiv").html('<textarea id="txtreturnrefundnotes" rows="4" class="form-control" style="text-align: left;"></textarea>');
                            $("#txtreturnrefundnotes").val("");
                        }
                    }
                    if (JsonObject.serviceresponse.detailslist.details.orderlist != undefined) {
                        $("#returndesigndetail").append($("#Ddlreturndesigndetail").render(JsonObject.serviceresponse.detailslist.details.orderlist.orderdetails));
                        $(".indianreturnprice").each(function () {
                            var id = $(this).attr('id');
                            var Rowid = id.split("indianreturnprice");
                            var totalp = $("#iprreturn" + Rowid[1]).val();
                            var convertint = parseInt(totalp).toLocaleString('en-IN', {
                                style: 'currency', currency: 'INR',
                                minimumFractionDigits: 0,
                                maximumFractionDigits: 0,
                            });
                            $("#" + id).html(convertint);
                        });
                        $(".indianreturnrefundprice").each(function () {
                            var id1 = $(this).attr('id');
                            var Rowid1 = id1.split("indianreturnrefundprice");
                            var totalp1 = $("#iprreturnrefund" + Rowid1[1]).val();
                            var convertint1 = parseInt(totalp1).toLocaleString('en-IN', {
                                style: 'currency', currency: 'INR',
                                minimumFractionDigits: 0,
                                maximumFractionDigits: 0,
                            });
                            $("#" + id1).html(convertint1);
                        });
                        $(".indianreturnchargerefundprice").each(function () {
                            var id2 = $(this).attr('id');
                            var Rowid2 = id2.split("indianreturnchargerefundprice");
                            var totalp2 = $("#iprreturnrefundcharge" + Rowid2[1]).val();
                            var convertint2 = parseInt(totalp2).toLocaleString('en-IN', {
                                style: 'currency', currency: 'INR',
                                minimumFractionDigits: 0,
                                maximumFractionDigits: 0,
                            });
                            $("#" + id2).html(convertint2);
                        });
                    }
                }
                else {
                    InvalidResponseCode(data);
                }
            },
            error: OnError
        });
        if (rowData['ISVIEWREFUNDLABEL'] == "View") {
            $("#btnsubmintreturnrefund").hide();
        } else if (rowData['ISVIEWREFUNDLABEL'] == "Refund") {
            $("#btnsubmintreturnrefund").show();
        }
        $("#modalreturnrefundandview").modal("show");
    },
    checktagclick: function (id) {
        var data = {
            "ORDERITEMID": id,
            "ACTIONFORTAG": "IsremoveTagorNot",
            "ISTAGREMOVED": $("#check" + id).is(":checked"),
        }
        $.ajax({
            url: getDomain() + "/Common/OpeartionsOnMaster?ServiceName=B2C_ORDER_RETURN_SUMMARY_CRUD",
            async: false,
            cache: false,
            data: data,
            type: 'POST',
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    B2C_Order_Refund_DetailView.Btnclickreturnrefundview(B2C_Order_Refund_DetailView.variables.MastreturnId);
                }
                else {
                    InvalidResponseCode(data);
                }
            },
            error: OnError
        });
    },
};
$(document).ready(function () {
    B2C_Order_Refund_DetailView.initializeJqgrid();
    $("#btnsubmintrefund").click(function () {
        var rowData = jQuery("#table_list_cancelrefund").getRowData(B2C_Order_Refund_DetailView.variables.MastId);
        $.ajax({
            url: getDomain() + "/B2C/PayRefundData",
            data: {
                PaymentId: rowData['PAYMENTID'],
                OrderId: rowData['ORDERID'],
                RazorPaymentId: rowData['RAZORPAYMENTID'],
                CustomerId: rowData['CUSTOMERID'],
                RefundAmount: rowData['REFUNDAMOUNT'],
                RefundNote: $("#txtrefundnotes").val(),
                InvioceNo: rowData['INVOICENO'],
                OrderActionMasId: rowData['ORDERACTIONMASID'],
                TypeAction: "Cancel",
            },
            async: true,
            cache: false,
            type: 'POST',
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    OperationMessage("", 'Refund Process successfully', 'success');
                    $("#table_list_cancelrefund").trigger("reloadGrid", [{ current: true }]);
                    $("#modalrefundandview").modal("hide");
                }
                else if ($(data).find('RESPONSECODE').text() == "-1") {
                    $("#modalrefundandview").modal("hide");
                    OperationMessage("", $(data).find('RESPONSEMESSAGE').text(), 'error');
                    
                }
                else {
                    InvalidResponseCode(data);
                }
            },
            error: OnError
        });
    });
    $("#btnsubmintreturnrefund").click(function () {
        var rowData = jQuery("#table_list_returnrefund").getRowData(B2C_Order_Refund_DetailView.variables.MastreturnId);
        $.ajax({
            url: getDomain() + "/B2C/PayRefundData",
            data: {
                PaymentId: rowData['PAYMENTID'],
                OrderId: rowData['ORDERID'],
                RazorPaymentId: rowData['RAZORPAYMENTID'],
                CustomerId: rowData['CUSTOMERID'],
                RefundAmount: rowData['REFUNDAMOUNT'],
                RefundNote: $("#txtreturnrefundnotes").val(),
                InvioceNo: rowData['INVOICENO'],
                OrderActionMasId: rowData['ORDERACTIONRETURNMASID'],
                TypeAction:"Return",
            },
            async: true,
            cache: false,
            type: 'POST',
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    OperationMessage("", 'Return Refund Process successfully', 'success');
                    $("#table_list_returnrefund").trigger("reloadGrid", [{ current: true }]);
                    $("#modalreturnrefundandview").modal("hide");
                }
                else if ($(data).find('RESPONSECODE').text() == "-1") {
                    OperationMessage("", $(data).find('RESPONSEMESSAGE').text(), 'error');
                    $("#modalreturnrefundandview").modal("hide");

                }
                else {
                    InvalidResponseCode(data);
                }
            },
            error: OnError
        });
    });
    $("#navtabcancelrefund").click(function () {
        $("#tabreturnrefund").hide();
        B2C_Order_Refund_DetailView.initializeJqgrid();

    });
    $("#navtabreturnrefund").click(function () {
        $("#tabreturnrefund").show();
        B2C_Order_Refund_DetailView.initializereturnJqgrid();
    });
});