var B2C_Order_Payment_DetailView = {
    variables: {
        BindMasterUrl: "/Common/BindMastersDetails?ServiceName=B2C_ORDER_PAYMENT_DETAIL_GET",
    },
    initializeJqgrid: function () {
        var colNames = ['PaymentId', 'OrderId', 'CustomerId','Customer Name', 'InvoiceNo', 'Transcation Amount', 'RazorPayment Id', 'RazorOrder Id', 'Payment Status', 'Captured', 'PayMent Method', 'CardId', 'Bank', 'Vpa', 'Wallet', 'Email', 'Contact', 'Fee', 'Tax', 'Error Code', 'Error Description', 'Payment Date', 'Status'];
           var colModel= [
                { name: "PAYMENTID", index: "PAYMENTID", xmlmap: xmlvars.common_colmap + "PAYMENTID", stype: 'text' , sortable: true, hidden: true,search :false},
                { name: "ORDERID", index: "ORDERID",width: 10, xmlmap: xmlvars.common_colmap + "ORDERID", stype: 'text',hidden:false, sortable: true, search: true, searchoptions: jqGridVariables.stringSearchOption },
                { name: "CUSTOMERID", index: "CUSTOMERID", xmlmap: xmlvars.common_colmap + "CUSTOMERID", stype: 'int', sortable: true, search: false,hidden:true },
                { name: "CUSTOMERULLNAME", index: "CUSTOMERULLNAME", width: 15, xmlmap: xmlvars.common_colmap + "CUSTOMERULLNAME", stype: 'text', sortable: true, search: true, searchoptions: jqGridVariables.stringSearchOption },
                { name: "INVOICENO", index: "INVOICENO", width: 8, xmlmap: xmlvars.common_colmap + "INVOICENO", stype: 'text', sortable: true, searchoptions: jqGridVariables.stringSearchOption },
                { name: "TRANSCATIONAMOUNT", index: "TRANSCATIONAMOUNT", width: 15, xmlmap: xmlvars.common_colmap + "TRANSCATIONAMOUNT", stype: 'text', sortable: true, searchoptions: jqGridVariables.stringSearchOption },
                { name: "RAZORPAYMENTID", index: "RAZORPAYMENTID", width: 15, xmlmap: xmlvars.common_colmap + "RAZORPAYMENTID", stype: 'text', sortable: true, search: true, searchoptions: jqGridVariables.stringSearchOption },
                { name: "RAZORORDERID", index: "RAZORORDERID", width: 15, xmlmap: xmlvars.common_colmap + "RAZORORDERID", stype: 'text', sortable: true, searchoptions: jqGridVariables.stringSearchOption },
                { name: "PAYMENTSTATUS", index: "PAYMENTSTATUS", width: 10, xmlmap: xmlvars.common_colmap + "PAYMENTSTATUS", stype: 'text', sortable: false, search: false },
                { name: "CAPTURED", index: "CAPTURED", xmlmap: xmlvars.common_colmap + "CAPTURED", stype: 'text' ,hidden:true, sortable: false,search:false, searchoptions: jqGridVariables.ActiveSearchOption, formatter: jqGridVariables.chkFmatter},
                { name: "PAYMENTMETHOD", index: "PAYMENTMETHOD", width: 10, xmlmap: xmlvars.common_colmap + "PAYMENTMETHOD", stype: 'text', sortable: false, search: false },
                { name: "CARDID", index: "CARDID", width: 8, xmlmap: xmlvars.common_colmap + "CARDID", stype: 'text', sortable: false, searchoptions: jqGridVariables.stringSearchOption },
                { name: "BANK", index: "BANK", width: 10, xmlmap: xmlvars.common_colmap + "BANK", stype: 'text', sortable: true, searchoptions: jqGridVariables.stringSearchOption },
                { name: "VPA", index: "VPA", width: 10, xmlmap: xmlvars.common_colmap + "VPA", stype: 'text', sortable: false, searchoptions: jqGridVariables.stringSearchOption },
                { name: "WALLET", index: "WALLET", xmlmap: xmlvars.common_colmap + "WALLET", stype: 'text' , sortable: false, searchoptions: jqGridVariables.stringSearchOption,hidden:true},
                { name: "EMAIL", index: "EMAIL", width: 18, xmlmap: xmlvars.common_colmap + "EMAIL", stype: 'text', sortable: false, searchoptions: jqGridVariables.stringSearchOption },
                { name: "CONTACT", index: "CONTACT", width: 10, xmlmap: xmlvars.common_colmap + "CONTACT", stype: 'text', sortable: false, searchoptions: jqGridVariables.stringSearchOption },
                { name: "FEE", index: "FEE", width: 6, xmlmap: xmlvars.common_colmap + "FEE", stype: 'text', sortable: false, search: false },
                { name: "TAX", index: "TAX", width: 6, xmlmap: xmlvars.common_colmap + "TAX", stype: 'text', sortable: false, search: false },
                { name: "ERRORCODE", index: "ERRORCODE", width: 8, xmlmap: xmlvars.common_colmap + "ERRORCODE", stype: 'text', sortable: false, search: false, hidden: false },
                { name: "ERRORDESCRIPTION", index: "ERRORDESCRIPTION", width: 10, xmlmap: xmlvars.common_colmap + "ERRORDESCRIPTION", stype: 'text', sortable: false, search: false, hidden: false },
                { name: "ENTRYDATE", index: "ENTRYDATE", width: 15, xmlmap: xmlvars.common_colmap + "ENTRYDATE", stype: 'text', sortable: false, search: true, searchoptions: jqGridVariables.stringSearchOption },
                { name: "STATUS", index: "STATUS", width: 4, xmlmap: xmlvars.common_colmap + "STATUS", stype: 'text', sortable: false, searchoptions: jqGridVariables.stringSearchOption },
            ];
            
        $("#table_B2C_Order_Payment_Detail").jqGrid({
            url: getDomain() +  B2C_Order_Payment_DetailView.variables.BindMasterUrl,
            datatype: "xml",
            height: "100%",
            autowidth: true,
            shrinkToFit: true,
            rowNum: 25,
            rowList: [25, 50, 100],
            colNames: colNames,
            colModel: colModel,
            pager: "#pager_B2C_Order_Payment_Detail",
            xmlReader: {
                root: xmlvars.common_root,
                row: xmlvars.common_row,
                page: xmlvars.common_response + "CURRENTPAGE",
                total: xmlvars.common_response + "TOTALPAGES",
                records: xmlvars.common_response + "TOTALRECORDS",
                repeatitems: false,
                id: "PAYMENTID"
            },
            loadComplete: function () {
                $("tr.jqgrow:even").addClass('myAltRowClass');
                $("#table_B2C_Order_Payment_Detail").jqGrid('setGridHeight', $(window).innerHeight() - 160 - ($("#gbox_table_B2C_Order_Payment_Detail").height() - $('#gbox_table_B2C_Order_Payment_Detail .ui-jqgrid-bdiv').height()));

                // Hide column headers and top pager if no records were returned
                if ($('#table_B2C_Order_Payment_Detail').getGridParam('records') === 0) {
                    $('.ui-jqgrid-htable').hide();
                }
                else
                    $('.ui-jqgrid-htable').show();
                var width = $('#jqGrid_B2C_Order_Payment_Detail').width();
                if (width <= 430) {
                    width = 595;
                }
                $('#table_B2C_Order_Payment_Detail').setGridWidth(2500);
            },
            loadError: OnJqloadError,
            beforeProcessing: OnJqbeforeProcessingErrorcheck,
            viewrecords: true,
            hidegrid: false,
            sortname: 'PAYMENTID',
            sortorder:'desc',
        });

        $("#table_B2C_Order_Payment_Detail").jqGrid('navGrid', '#pager_B2C_Order_Payment_Detail',
                { edit: false, add: false, del: false, search: true },
                { height: 200}
        );

        $("#pager_B2C_Order_Payment_Detail_left").css("width", "");
        AlignJqGridHeader('table_B2C_Order_Payment_Detail', ['edit', 'delete']);
    },
   };

$(document).ready(function () {
    B2C_Order_Payment_DetailView.initializeJqgrid();
});