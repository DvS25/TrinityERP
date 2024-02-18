var Master_QuotationLisView = {
    variables: {
        BindQuotationListUrl: "/Common/BindMastersDetails?ServiceName=SALES_QUOTATION_LIST_GET",
        Masterquotationid: "",
        Masterpartyid :"",
    },
  
    initializeJqgrid: function (strurl) {
        colNames = ['ID', 'Order No', 'ERP Quo. No', 'Company', 'Order Date', 'Status', 'Sales Name', 'Process Type', 'Order Type', 'Qty', 'Metal Wgt', 'Diamond Wgt', 'Gross Wgt', 'Diamond Pcs', 'Labour Charge', 'Amount', 'Computer Name'],
        colModel = [
                    { name: "QUOTATION_ID", index: "QUOTATION_ID", xmlmap: xmlvars.common_colmap + "QUOTATION_ID", search: false, hidden: true },
                    //{ name: "QUOTATION_NO", index: "QUOTATION_NO", width: 8, xmlmap: xmlvars.common_colmap + "QUOTATION_NO", search: true, searchoptions: jqGridVariables.stringSearchOption, sortable: false },
                    {
                        name: "QUOTATION_NO", index: "QUOTATION_NO", width: 10, xmlmap: xmlvars.common_colmap + "QUOTATION_NO", search: true, hidden: false,
                        formatter: function (cv, op, ro) {
                            return '<a href="javascript:void(0);" onclick="Master_QuotationLisView.ViewId(\'' + $(ro).find('ERPQUOTATION_NO').text() + '\');">' + cv + '</a>';
                        }, searchoptions: jqGridVariables.stringSearchOption
                    },
                    { name: "ERPQUOTATION_NO", width: 8, index: "ERPQUOTATION_NO", xmlmap: xmlvars.common_colmap + "ERPQUOTATION_NO", align: "center", search: false, sortable: false },
                    { name: "COMPANY", index: "COMPANY", width: 20, xmlmap: xmlvars.common_colmap + "COMPANY", search: true, searchoptions: jqGridVariables.stringSearchOption, sortable: false },
                    { name: "QUOTATIONDATE", width: 10, index: "QUOTATIONDATE", xmlmap: xmlvars.common_colmap + "QUOTATIONDATE", search: false, sortable: false, align: "center" },
                    { name: "QUATATIONSTATUS", width: 5, index: "QUATATIONSTATUS", xmlmap: xmlvars.common_colmap + "QUATATIONSTATUS", search: false, sortable: false, align: "center" },
                    { name: "SALESPERSON", width: 10, index: "SALESPERSON", xmlmap: xmlvars.common_colmap + "SALESPERSON", search: false, sortable: false, align: "center" },
                    { name: "PROCESSTYPE", index: "PROCESSTYPE", width: 8, xmlmap: xmlvars.common_colmap + "PROCESSTYPE", align: "center", search: true, searchoptions: jqGridVariables.stringSearchOption, sortable: false },
                    { name: "QUOTATIONTYPE", width: 10, index: "QUOTATIONTYPE", xmlmap: xmlvars.common_colmap + "QUOTATIONTYPE", search: true, searchoptions: jqGridVariables.stringSearchOption, sortable: false, align: "center" },
                    { name: "TOTALPCS", width: 4, index: "TOTALPCS", xmlmap: xmlvars.common_colmap + "TOTALPCS", search: false, sortable: false, align: "center" },
                    { name: "TOTAL_MWGT", width: 7, index: "TOTAL_MWGT", xmlmap: xmlvars.common_colmap + "TOTAL_MWGT", align: "center", search: false, sortable: false, align: "center" },
                    { name: "TOTAL_DWTG", index: "TOTAL_DWTG", width: 10, xmlmap: xmlvars.common_colmap + "TOTAL_DWTG", search: false, sortable: false, align: "center" },
                    { name: "GROSS_WTG", index: "GROSS_WTG", width: 7, xmlmap: xmlvars.common_colmap + "GROSS_WTG", search: false, sortable: false, align: "center" },
                    { name: "TOTAL_DPCS", width: 10, index: "TOTAL_DPCS", xmlmap: xmlvars.common_colmap + "TOTAL_DPCS", search: false, sortable: false, align: "center" },
                    { name: "TOTAL_LBR", width: 9, index: "TOTAL_LBR", xmlmap: xmlvars.common_colmap + "TOTAL_LBR", search: false, sortable: false, align: "center" },
                    { name: "TOTAL_AMT", width: 7, index: "TOTAL_AMT", xmlmap: xmlvars.common_colmap + "TOTAL_AMT", search: false, sortable: false, align: "center" },
                    { name: "MODULENAME", width: 10, index: "MODULENAME", xmlmap: xmlvars.common_colmap + "MODULENAME", search: false, sortable: false, align: "center" },

        ];
      
        colNames.push('Edit');
        colModel.push({ name: 'edit', index: 'edit', width: 3, sortable: false, align: "center", search: false, formatter: function (cv, op, ro) { return jqGridVariables.ViewBtnFmatter(cv, op, ro, 'Master_QuotationLisView', 'view') } });

        $("#table_list_Quotationlist").GridUnload();
        $("#table_list_Quotationlist").jqGrid({
            url: getDomain() + strurl,
            datatype: "xml",
            height: '100%',
            autowidth: true,
            shrinkToFit: true,
            rowNum: 25,
            rowList: [25, 50, 100],
            colNames: colNames,
            colModel: colModel,
            pager: "#pager_list_Quotationlist",
            xmlReader: {
                root: xmlvars.common_root,
                row: xmlvars.common_row,
                page: xmlvars.common_response + "CURRENTPAGE",
                total: xmlvars.common_response + "TOTALPAGES",
                records: xmlvars.common_response + "TOTALRECORDS",
                repeatitems: false,
                id: "ERPQUOTATION_NO"
            },
            loadComplete: function () {
                $("tr.jqgrow:even").addClass('myAltRowClass');
                $("#table_list_Quotationlist").jqGrid('setGridHeight', $(window).innerHeight() - 150 - ($("#gbox_table_list_Quotationlist").height() - $('#gbox_table_list_Quotationlist .ui-jqgrid-bdiv').height()));

                // Hide column headers and top pager if no records were returned
                if ($('#table_list_Quotationlist').getGridParam('records') == 0)
                    $('.ui-jqgrid-htable').hide();
                else
                    $('.ui-jqgrid-htable').show();

                var width = $('#jqgrid_Quotationlist').width();
                if (width <= 1800) {
                    width = 1800;
                }
                $('#table_list_Quotationlist').setGridWidth(width);

            },
            loadError: OnJqloadError,
            beforeProcessing: OnJqbeforeProcessingErrorcheck,
            viewrecords: true,
            hidegrid: false,
            sortname: 'QUOTATION_NO',
            sortorder: 'desc',
        });

        // Setup buttons
        $("#table_list_Quotationlist").jqGrid('navGrid', '#pager_list_Quotationlist',
            { edit: false, add: false, del: false, search: true },
            { height: 320 }
        );
        $("#pager_list_Quotationlist_left").css("width", "");
        $("#refresh_table_list_Quotationlist").click(function () {
            $('#txt_fromdate').val("");
            $('#txt_todate').val("");
            $("#partyinput").val("");
            var strurl = Master_QuotationLisView.variables.BindQuotationListUrl;
            Master_QuotationLisView.initializeJqgrid(strurl);
        })
        AlignJqGridHeader('table_list_Quotationlist', ['edit', 'ERPQUOTATION_NO', 'SALESPERSON', 'PROCESSTYPE', 'Process Type', 'TOTALPCS', 'TOTAL_MWGT', 'TOTAL_DWTG', 'Gross Wgt', 'TOTAL_DPCS', 'Labour Charge', 'TOTAL_AMT', 'QUATATIONSTATUS', 'QUOTATIONDATE', 'MODULENAME']);
    },

    ViewId: function (id) {
        $("#GridViewQuotationlist").hide();
        $("#Desinglist").show();
        var myfilter = { rules: [] };
        myfilter.rules.push({ field: "ERPQUOTATION_NO", op: "eq", data: id });
        myfilter.rules.push({ field: "DESING", op: "eq", data: 'DesignList' });
            $.ajax({
                url: getDomain() + "/Common/BindMastersDetails?ServiceName=SALES_QUOTATION_DESIGN_ITEM_GET&myfilters=" + JSON.stringify(myfilter),
                async: false,
                cache: false,
                type: 'GET',
                success: function (data) {
                    if ($(data).find('RESPONSECODE').text() == "0") {
                        var JsonObject = xml2json.parser(data);
                        $("#quotationdesign").html("");
                        if (JsonObject.serviceresponse.designlist != undefined) {
                            $("#quotationdesign").html($("#Quotationdesigndata").render(JsonObject.serviceresponse.designlist.design));

                        }
                    }
                    else {
                        InvalidResponseCode(data);
                    }
                },
                error: OnError
            });
       
    },
}
function desingdetaild(btnid) {
    $("#modalopendesigndetails").modal("show");
    $("#txt_desing").html($("#txtdesigncode" + btnid).html());
    var Imagepath = $("#categoryimage" + btnid).attr('src');
    $("#categoryimage").attr('src', Imagepath);
    var itemno = $("#itemno" + btnid).val();
    var myfilter = { rules: [] };
    myfilter.rules.push({ field: "QUOTATION_ITEMNO", op: "eq", data: btnid });
    myfilter.rules.push({ field: "DESING", op: "eq", data: 'DesignDetail' });
    myfilter.rules.push({ field: "QUO_NO", op: "eq", data: itemno });
    $.ajax({
        url: getDomain() + "/Common/BindMastersDetails?ServiceName=SALES_QUOTATION_DESIGN_ITEM_GET&myfilters=" + JSON.stringify(myfilter),
        async: false,
        cache: false,
        type: 'GET',
        success: function (data) {
            if ($(data).find('RESPONSECODE').text() == "0") {
                var JsonObject = xml2json.parser(data);
                $("#golddetails").html("");
                $("#diamonddetails").html("");
                $("#colorstonedetails").html("");
                if (JsonObject.serviceresponse.goldlist != undefined) {
                   
                    $("#golddetails").html($("#GoldDetailsdata").render(JsonObject.serviceresponse.goldlist.golddetail));
                }
                else {

                }
                if (JsonObject.serviceresponse.diamondlist != undefined) {
                   
                    $("#diamonddetails").html($("#DiamondDetailsdata").render(JsonObject.serviceresponse.diamondlist.diamonddetail));
                }
                else {

                }
                if (JsonObject.serviceresponse.colorstonelist != undefined) {
                    $(".colorstoneheader").show();
                    $("#colorstonedetails").html($("#ColorstoneDetailsdata").render(JsonObject.serviceresponse.colorstonelist.colorstonedetail));
                }
                else {
                    $(".colorstoneheader").hide();
                }

            }
            else {
                InvalidResponseCode(data);
            }
        },
        error: OnError
    });
}
function BindAutocomplete(autocompleteId) {
    $("." + autocompleteId).autocomplete({
        source: function (request, response) {
            $.ajax({
                url: getDomain() + '/Common/BindMastersDetails?ServiceName=SALES_WHOLESELLER_DETAILS_GET&sord=asc&ColumnRequested=WSID,PARTYCODE,CONTACTPERSONNAME,PARTYCODENAME&_search=true&searchField=PARTYCODE&searchOper=cn&searchString=' + request.term,
                type: "POST",
                async: false,
                cache: false,
                success: function (data) {
                    if ($(data).find('RESPONSECODE').text() == "0") {
                        var JsonObject = xml2json.parser(data);
                        if (JsonObject.serviceresponse.detailslist != undefined) {
                            var List = [];
                            var datalist;
                            List.push({
                                contactpersonname: "",
                                partycode: "",
                                partycodename: "All",
                                rownum: 0,
                                wsid: ""
                            });
                            //$("#hdnemrpcode").val(JsonObject.serviceresponse.detailslist.details.erppartycode);
                            if (JsonObject.serviceresponse.detailslist.details.length > 1) {
                                datalist = JsonObject.serviceresponse.detailslist;
                               

                                for (var j = 0; j < datalist.details.length; j++) {
                                    List.push({
                                        contactpersonname: datalist.details[j].contactpersonname,
                                        partycode: datalist.details[j].partycode,
                                        partycodename: datalist.details[j].partycodename,
                                        rownum: datalist.details[j].rownum,
                                        wsid: datalist.details[j].wsid,
                                    });
                                }

                              //  List = JsonObject.serviceresponse.detailslist.details;
                                

                            }

                            else {

                                
                                datalist = JsonObject.serviceresponse.detailslist;
                                List.push({
                                    contactpersonname: datalist.details.contactpersonname,
                                    partycode: datalist.details.partycode,
                                    partycodename: datalist.details.partycodename,
                                    rownum: datalist.details.rownum,
                                    wsid: datalist.details.wsid,
                                });
                            }

                            response(
                               $.map(List, function (item) {

                                   if (jQuery.type(item) == "object") {
                                       return {
                                           id: item.wsid,
                                           label: item.partycodename,
                                           value: item.partycodename
                                       }
                                   }
                               }));
                        }
                        else {
                            response([{ label: 'No Records Found', value: '' }]);
                        }
                    }
                    else {
                        response([{ label: 'No Records Found', value: '' }]);
                    }
                }
            })
        },
        messages: {
            noResults: '',
            results: function (resultsCount) { }
        },
        focus: function (event, ui) {
            event.preventDefault();
        },
        select: function (event, ui) {
            Master_QuotationLisView.variables.Masterpartyid = "";
            Master_QuotationLisView.variables.Masterpartyid = ui.item.id;
           // $("#partyinput").val(ui.item.value);
          
        },
       
        minLength: 1,

    })
    .data("ui-autocomplete")._renderItem = function (ul, item) {
        // Master_QuotationLisView.variables.Masterpartyid = item.id;
        var inner_html = '<div class="list_item_container"><div class="autodescription"><p><span >' + item.label + '</span><span style="display:none">' + item.id + '</span><br/></p></div>';
        var listItem = $("<li></li>").data("item.autocomplete", item) 
        .append(inner_html)
        .appendTo(ul);
        return listItem;

    }

    $(".ui-helper-hidden-accessible").css("display", "none");
    $(".ui-autocomplete").css({ top: 103, left: 971.75, position: 'absolute' });
    $(".ui-autocomplete").css("background-color", "white");

}
$(document).ready(function () {
    //var strurl = Master_QuotationLisView.variables.BindQuotationListUrl;
    //Master_QuotationLisView.initializeJqgrid(strurl);
    var myDate = new Date();
    var newDate = new Date(myDate.getTime() - (60*60*24*7*1000));
    $('#txt_fromdate').datepicker({
        format: 'dd M yyyy',
        endDate: "today"
    }).datepicker("setDate", newDate);
    $('#txt_fromdate').on('change', function () {
        $('.datepicker').hide();
    });
   
    $('#txt_todate').datepicker({
        format: 'dd M yyyy',
        endDate: "today"
    }).datepicker("setDate", "0");
    $('#txt_todate').on('change', function () {
        $('.datepicker').hide();
    });
    $("#btnquotdesingback").click(function () {
        $("#GridViewQuotationlist").show();
        $("#Desinglist").hide();
    });
    $("#partyinput").click(function () {
        $("#ui-id-1").hide();
    });
    $("#btnmodalclose").click(function () {
        //$(".itemnovalue").val("");
    });
    $("#searchparty").click(function () {
        var partyid, fromdate, todate, myfilter;
        if ($("#partyinput").val() != "") {

            if ($("#partyinput").val() == "All") {
                var strurl = Master_QuotationLisView.variables.BindQuotationListUrl;
                Master_QuotationLisView.initializeJqgrid(strurl);
                Master_QuotationLisView.variables.Masterpartyid = "";
            }
            else
            {
                partyid = Master_QuotationLisView.variables.Masterpartyid;
                fromdate = $('#txt_fromdate').val();
                todate = $('#txt_todate').val();
                myfilter = { rules: [] };
                myfilter.rules.push({ field: "PARTYID", op: "eq", data: partyid });
                myfilter.rules.push({ field: "FROMDATE", op: "eq", data: fromdate });
                myfilter.rules.push({ field: "TODATE", op: "eq", data: todate });
                strurl = "/Common/BindMastersDetails?ServiceName=SALES_QUOTATION_LIST_GET&myfilters=" + JSON.stringify(myfilter);
                Master_QuotationLisView.initializeJqgrid(strurl);
            }
         
        }
        else {
            var strurl = Master_QuotationLisView.variables.BindQuotationListUrl;
            Master_QuotationLisView.initializeJqgrid(strurl);
            Master_QuotationLisView.variables.Masterpartyid = "";
            notificationMessage('', 'Please Select Party Name', 'warning');
        }


    });

});