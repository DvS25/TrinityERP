var Master_PartyStockView = {
    variables: {
        BindGroupListUrl: "/Common/BindMastersDetails?ServiceName=DESIGN_MASTER_GET",
        BindLabourListUrl: "/Common/BindMastersDetails?ServiceName=MAKING_PRICELIST_GET",
        BinddiamonondtabListUrl: "/Common/BindMastersDetails?ServiceName=PRICELIST_GET",
        Masterpartyid:"",
    },
    
    //====Bind PartnerProfile on pageload===========================================================//    
   
    initializeJqgrid: function (stringurl) {
        colNames = ['ID', 'Design Code','Bag No', 'PSize', 'Length', 'Width', 'Height', 'Category', 'SubCategory', 'Labour Type', 'Diamond Pcs', 'Diamond Weight', 'Gold Weight', 'Gold Color', 'Issue_Date', 'ImagePath'],
        colModel = [
                    { name: "ID", index: "ID", width: 3, xmlmap: xmlvars.common_colmap + "ID", search: false, hidden: true },
                    { name: "DESIGNCODE", index: "DESIGNCODE", width: 4, xmlmap: xmlvars.common_colmap + "DESIGNCODE", search: true, searchoptions: jqGridVariables.stringSearchOption, sortable: true },
                    { name: "BAG_NO",index: "BAG_NO", xmlmap: xmlvars.common_colmap + "BAG_NO", search: false, sortable: false, hidden: true },
                    { name: "PSIZE", width: 2, index: "PSIZE", xmlmap: xmlvars.common_colmap + "PSIZE", search: false, sortable: false },
                    { name: "LENTH", index: "LENTH", width: 2, xmlmap: xmlvars.common_colmap + "LENTH", search: false, sortable: false },
                    { name: "WIDTH", width: 2, index: "WIDTH", xmlmap: xmlvars.common_colmap + "WIDTH", search: false, sortable: false },
                    { name: "HEIGHT", index: "HEIGHT", width: 2, xmlmap: xmlvars.common_colmap + "HEIGHT", search: false, sortable: false },
                    { name: "CATEGORY", width: 4, index: "CATEGORY", xmlmap: xmlvars.common_colmap + "CATEGORY", search: true, searchoptions: jqGridVariables.stringSearchOption, sortable: true },
                    { name: "SUBCATEGORY", width: 5, index: "SUBCATEGORY", xmlmap: xmlvars.common_colmap + "SUBCATEGORY", search: true, searchoptions: jqGridVariables.stringSearchOption, sortable: true },
                    { name: "LABOUR_TYPE", width: 3, index: "LABOUR_TYPE", xmlmap: xmlvars.common_colmap + "LABOUR_TYPE", search: true, searchoptions: jqGridVariables.stringSearchOption, sortable: true },
                    { name: "D_PICES", index: "D_PICES", width: 3, xmlmap: xmlvars.common_colmap + "D_PICES", search: false, sortable: false },
                    { name: "D_WEIGHT", index: "D_WEIGHT", width: 4, xmlmap: xmlvars.common_colmap + "D_WEIGHT", search: false, sortable: false },
                    { name: "G_WEIGHT", width: 3, index: "G_WEIGHT", xmlmap: xmlvars.common_colmap + "G_WEIGHT", search: false, sortable: false },
                    { name: "GCOLOR", width: 3, index: "GCOLOR", xmlmap: xmlvars.common_colmap + "GCOLOR", search: true, searchoptions: jqGridVariables.stringSearchOption, sortable: true },
                    { name: "ISSUE_DT", width: 3, index: "ISSUE_DT", xmlmap: xmlvars.common_colmap + "ISSUE_DT", search: false, sortable: true },
                    { name: "IMAGEPATH", width: 3, index: "IMAGEPATH", xmlmap: xmlvars.common_colmap + "IMAGEPATH", search: false, sortable: true, hidden: true },

        ];
        colNames.push('Edit');
        colModel.push({ name: 'edit', index: 'edit', width: 2, sortable: false, align: "center", search: false, formatter: function (cv, op, ro) { return jqGridVariables.ViewBtnFmatter(cv, op, ro, 'Master_PartyStockView', 'view') } });

        $("#table_list_PartyStock").GridUnload();
        $("#table_list_PartyStock").jqGrid({
            url: getDomain() + stringurl,
            datatype: "xml",
            height: '100%',
            autowidth: true,
            shrinkToFit: true,
            rowNum: 25,
            rowList: [25, 50, 100],
            colNames: colNames,
            colModel: colModel,
            pager: "#pager_list_PartyStock",
            xmlReader: {
                root: xmlvars.common_root,
                row: xmlvars.common_row,
                page: xmlvars.common_response + "CURRENTPAGE",
                total: xmlvars.common_response + "TOTALPAGES",
                records: xmlvars.common_response + "TOTALRECORDS",
                repeatitems: false,
                id: "ID"
            },
            loadComplete: function () {
                $("tr.jqgrow:even").addClass('myAltRowClass');
                $("#table_list_PartyStock").jqGrid('setGridHeight', $(window).innerHeight() - 140 - ($("#gbox_table_list_PartyStock").height() - $('#gbox_table_list_PartyStock .ui-jqgrid-bdiv').height()));

                // Hide column headers and top pager if no records were returned
                if ($('#table_list_PartyStock').getGridParam('records') == 0)
                    $('.ui-jqgrid-htable').hide();
                else
                    $('.ui-jqgrid-htable').show();

                var width = $('#jqgrid_partystock').width();
                if (width <= 430) {
                    width = 595;
                }
                $('#table_list_PartyStock').setGridWidth(width);

            },
            loadError: OnJqloadError,
            beforeProcessing: OnJqbeforeProcessingErrorcheck,
            viewrecords: true,
            hidegrid: false,
            sortname: 'ISSUE_DT',
            sortorder: 'desc',
        });

        // Setup buttons
        $("#table_list_PartyStock").jqGrid('navGrid', '#pager_list_PartyStock',
            { edit: false, add: false, del: false, search: true },
            { height: 320 }
        );
        $("#pager_list_PartyStock").css("width", "");
        AlignJqGridHeader('table_list_PartyStock', ['edit']);
    },
   
    ViewId: function (id) {
        var rowData = jQuery("#table_list_PartyStock").getRowData(id);
        var catefoldername = rowData['CATEGORY'];
        var subcatefoldername = rowData['SUBCATEGORY'];
        var designno = rowData['DESIGNCODE'];
        var designimagepath = rowData['IMAGEPATH'];
        var bagno = rowData['BAG_NO'];
        $("#viewpartystock").show();
        $("#gridviewpartystock").hide();
        $("#txtdesigncode").html(rowData['DESIGNCODE']);
        $("#txtpsize").html(rowData['PSIZE']);
        $("#txtdesignlength").html(rowData['LENTH']);
        $("#txtdesignwidth").html(rowData['WIDTH']);
        $("#txtdesignheight").html(rowData['HEIGHT']);
        $("#txtcategory").html(rowData['CATEGORY']);
        $("#txtsubcategory").html(rowData['SUBCATEGORY']);
        $("#txtlabourtype").html(rowData['LABOUR_TYPE']);
        $("#txtgoldcolor").html(rowData['GCOLOR']);
        $("#categoryimage").attr('src', getDomain() + designimagepath);
        var myfilter = { rules: [] };
        myfilter.rules.push({ field: "DESIGNCODE", op: "eq", data: rowData['DESIGNCODE'] });        
        myfilter.rules.push({ field: "PARTYNO", op: "eq", data: Master_PartyStockView.variables.Masterpartyid });

        if ($("#virtualstock").is(":checked") && $("#partyinput").val() != '') { /*--------Virtual Stock-------------*/
            myfilter.rules.push({ field: "DESIGNID", op: "eq", data: "Virtual" });
            $.ajax({
                url: getDomain() + "/Common/BindMastersDetails?ServiceName=DESIGNDETAIL_GET&myfilters=" + JSON.stringify(myfilter),
                async: false,
                cache: false,
                type: 'GET',
                success: function (data) {
                    if ($(data).find('RESPONSECODE').text() == "0") {
                        var JsonObject = xml2json.parser(data);
                        $("#textgemsdetails").html("");
                        $("#textotherdetails").html("");
                        $("#otherdetailstitle").hide();
                        $("#textotherdetails").hide();
                        if (JsonObject.serviceresponse.detailslist != undefined) {
                            $("#textgemsdetails").html($("#Gemsdetailsdata").render(JsonObject.serviceresponse.detailslist.details));

                        }
                        if (JsonObject.serviceresponse.detailslistmetal != undefined) {
                            $("#txtquality").html(JsonObject.serviceresponse.detailslistmetal.detailsmetal.quality);
                            $("#txtgoldprice").html(JsonObject.serviceresponse.detailslistmetal.detailsmetal.goldprice); 
                            $("#txtwgt").html(JsonObject.serviceresponse.detailslistmetal.detailsmetal.goldweight);
                        }

                        if (JsonObject.serviceresponse.detailslistother != undefined) {
                            $("#otherdetailstitle").show();
                            $("#textotherdetails").show();
                            $("#textotherdetails").html($("#Otherdetailsdata").render(JsonObject.serviceresponse.detailslistother.detailsother));

                        }
                        //$(".txtdiamondpcs").html(rowData['D_PICES']);
                        //$(".txtdiamongweight").html(rowData['D_WEIGHT']);

                    }
                    else {
                        InvalidResponseCode(data);
                    }
                },
                error: OnError
            });
        }        
        else if ($("#physicalstock").is(":checked") && $("#partyinput").val() != '') { /*--------Physical Stock-------------*/
            myfilter.rules.push({ field: "DESIGNID", op: "eq", data: "Physical" }); 
            myfilter.rules.push({ field: "BAG_NO", op: "eq", data: bagno });
            $.ajax({
                url: getDomain() + "/Common/BindMastersDetails?ServiceName=DESIGNDETAIL_GET&myfilters=" + JSON.stringify(myfilter),
                async: false,
                cache: false,
                type: 'GET',
                success: function (data) {
                    if ($(data).find('RESPONSECODE').text() == "0") {
                        var JsonObject = xml2json.parser(data);
                        $("#textgemsdetails").html("");
                        $("#textotherdetails").html("");
                        $("#otherdetailstitle").hide();
                        $("#textotherdetails").hide();
                        if (JsonObject.serviceresponse.detailslist != undefined) {
                            $("#textgemsdetails").html($("#Gemsdetailsdata").render(JsonObject.serviceresponse.detailslist.details));
                        }
                        if (JsonObject.serviceresponse.detailslistmetal != undefined) {
                            $("#txtgoldcolor").html(JsonObject.serviceresponse.detailslistmetal.detailsmetal.color);
                            $("#txtquality").html(JsonObject.serviceresponse.detailslistmetal.detailsmetal.kt);
                            $("#txtwgt").html(JsonObject.serviceresponse.detailslistmetal.detailsmetal.wgt);
                            $("#txtgoldprice").html(JsonObject.serviceresponse.detailslistmetal.detailsmetal.goldprice);
                        }

                        if (JsonObject.serviceresponse.detailslistother != undefined) {
                            $("#otherdetailstitle").show();
                            $("#textotherdetails").show();
                            $("#textotherdetails").html($("#Otherdetailsdata").render(JsonObject.serviceresponse.detailslistother.detailsother));

                        }
                        //$(".txtdiamondpcs").html(rowData['D_PICES']);
                        //$(".txtdiamongweight").html(rowData['D_WEIGHT']);

                    }
                    else {
                        InvalidResponseCode(data);
                    }
                },
                error: OnError
            });
        }
    },
    
    /***Bind data Labour ****/

    initializeLabourJqgrid: function () {


        colNames = ['Index','ID', 'Gold Weight', 'Regular', 'Micropave', 'Designer', 'Italian', 'Plain Gold', 'HandMade'],
        colModel = [
                    { name: "ROWNUM", index: "ROWNUM", width: 3, xmlmap: xmlvars.common_colmap + "ROWNUM", search: false, sortable: false , hidden: false },
                    { name: "PRICELIST_ID", index: "PRICELIST_ID", width: 4, xmlmap: xmlvars.common_colmap + "PRICELIST_ID", search: false, hidden: true },
                    { name: "GOLDGRAM", index: "GOLDGRAM", width: 4, xmlmap: xmlvars.common_colmap + "GOLDGRAM", search: true, searchoptions: jqGridVariables.stringSearchOption, hidden: false },
                    { name: "REGULAR", width: 3, index: "REGULAR", xmlmap: xmlvars.common_colmap + "REGULAR", search: false, sortable: false },
                    { name: "MICROPAVE", index: "MICROPAVE", width: 4, xmlmap: xmlvars.common_colmap + "MICROPAVE", search: false, hidden: false, sortable: false },
                    { name: "DESIGNER", width: 3, index: "DESIGNER", xmlmap: xmlvars.common_colmap + "DESIGNER", search: false, sortable: false, hidden: true },
                    { name: "ITALIAN", index: "ITALIAN", width: 4, xmlmap: xmlvars.common_colmap + "ITALIAN", search: false, sortable: false },
                    { name: "PLAIN_GOLD", width: 4, index: "PLAIN_GOLD", xmlmap: xmlvars.common_colmap + "PLAIN_GOLD", search: false, hidden: true },
                    { name: "HANDMADE", width: 5, index: "HANDMADE", xmlmap: xmlvars.common_colmap + "HANDMADE", search: false, hidden: true }
                    
        ];

        var myfilter = { groupOp: "AND", rules: [] };
        myfilter.rules.push({ field: "PARTYCODE", op: "eq", data: Master_PartyStockView.variables.Masterpartyid });
       
        $("#table_list_rowgold").GridUnload();
        $("#table_list_rowgold").jqGrid({

            url: getDomain() + Master_PartyStockView.variables.BindLabourListUrl + "&myfilters=" + JSON.stringify(myfilter),
            datatype: "xml",
            height: '100%',
            autowidth: true,
            shrinkToFit: true,
            rowNum: 20,
            rowList: [20, 50, 100],
            colNames: colNames,
            colModel: colModel,
            pager: "#pager_list_rowgold",
            xmlReader: {
                root: xmlvars.common_root,
                row: xmlvars.common_row,
                page: xmlvars.common_response + "CURRENTPAGE",
                total: xmlvars.common_response + "TOTALPAGES",
                records: xmlvars.common_response + "TOTALRECORDS",
                repeatitems: false,
                id: "PRICELIST_ID"
            },
            loadComplete: function () {
                $("tr.jqgrow:even").addClass('myAltRowClass');

                // Hide column headers and top pager if no records were returned
                if ($('#table_list_rowgold').getGridParam('records') == 0)
                    $('.ui-jqgrid-htable').hide();
                else
                    $('.ui-jqgrid-htable').show();
                
                var width = $('#jqgrid_rowgold').width();
                if (width <= 430) {
                    width = 595;
                }
                $('#table_list_rowgold').setGridWidth(width);

            },
            loadError: OnJqloadError,
            beforeProcessing: OnJqbeforeProcessingErrorcheck,
            viewrecords: true,
            hidegrid: false,
            sortname: 'PRICELIST_ID',
            sortorder: 'asc',
        });

        // Setup buttons
        $("#table_list_rowgold").jqGrid('navGrid', '#pager_list_rowgold',
            { edit: false, add: false, del: false, search: false },
            { height: 320 }
    );
        $("#pager_list_rowgold_left").css("width", "");
        AlignJqGridHeader('table_list_rowgold', ['edit']);


    },

    /***Bind data Row Material Diamond****/

    initializediamondtabJqgrid: function () {


        colNames = ['Index', 'ID', 'Shape', 'Size', 'Color', 'VVS1', 'VVS2', 'VS1', 'VS2', 'SI1', 'SI3', 'VVS', 'VVS_VS','VS','SI'],
        colModel = [
                    { name: "ROWNUM", index: "ROWNUM", width: 3, xmlmap: xmlvars.common_colmap + "ROWNUM", search: false, sortable: false, hidden: false },
                    { name: "ID", index: "ID", width: 4, xmlmap: xmlvars.common_colmap + "ID", search: false, hidden: true },
                    { name: "SHAPE", index: "SHAPE", width: 4, xmlmap: xmlvars.common_colmap + "SHAPE", search: true, searchoptions: jqGridVariables.stringSearchOption, hidden: false },
                    { name: "D_SIZE", width: 3, index: "D_SIZE", xmlmap: xmlvars.common_colmap + "D_SIZE", search: false, sortable: false },
                    { name: "COLOUR", index: "COLOUR", width: 4, xmlmap: xmlvars.common_colmap + "COLOUR", search: false, hidden: false, sortable: false },
                    { name: "VVS1", width: 3, index: "VVS1", xmlmap: xmlvars.common_colmap + "VVS1", search: false, sortable: false,hidden: true  },
                    { name: "VVS2", index: "VVS2", width: 4, xmlmap: xmlvars.common_colmap + "VVS2", search: false, sortable: false, hidden: true },
                    { name: "VS1", width: 4, index: "VS1", xmlmap: xmlvars.common_colmap + "VS1", search: false, hidden: true },
                    { name: "VS2", width: 5, index: "VS2", xmlmap: xmlvars.common_colmap + "VS2", search: false, hidden: true },
                    { name: "SI1", width: 5, index: "SI1", xmlmap: xmlvars.common_colmap + "SI1", search: false, hidden: true },
                    { name: "SI3", width: 5, index: "SI3", xmlmap: xmlvars.common_colmap + "SI3", search: false, hidden: true },
                    { name: "VVS", width: 5, index: "VVS", xmlmap: xmlvars.common_colmap + "VVS", search: false },
                    { name: "VVS_VS", width: 5, index: "VVS_VS", xmlmap: xmlvars.common_colmap + "VVS_VS", search: false, hidden: true },
                    { name: "VS", width: 5, index: "VS", xmlmap: xmlvars.common_colmap + "VS", search: false },
                    { name: "SI", width: 5, index: "SI", xmlmap: xmlvars.common_colmap + "SI", search: false}

        ];

        var myfilter = { groupOp: "AND", rules: [] };
        myfilter.rules.push({ field: "PARTYCODE", op: "eq", data: Master_PartyStockView.variables.Masterpartyid });

        $("#table_list_rowdiamond").GridUnload();
        $("#table_list_rowdiamond").jqGrid({

            url: getDomain() + Master_PartyStockView.variables.BinddiamonondtabListUrl + "&myfilters=" + JSON.stringify(myfilter),
            datatype: "xml",
            height: '100%',
            autowidth: true,
            shrinkToFit: true,
            rowNum: 20,
            rowList: [20, 50, 100],
            colNames: colNames,
            colModel: colModel,
            pager: "#pager_list_rowdiamond",
            xmlReader: {
                root: xmlvars.common_root,
                row: xmlvars.common_row,
                page: xmlvars.common_response + "CURRENTPAGE",
                total: xmlvars.common_response + "TOTALPAGES",
                records: xmlvars.common_response + "TOTALRECORDS",
                repeatitems: false,
                id: "ID"
            },
            loadComplete: function () {
                $("tr.jqgrow:even").addClass('myAltRowClass');

                // Hide column headers and top pager if no records were returned
                if ($('#jqgrid_rowdiamond').getGridParam('records') == 0)
                    $('.ui-jqgrid-htable').hide();
                else
                    $('.ui-jqgrid-htable').show();
                
                var width = $('#jqgrid_rowdiamond').width();
                if (width <= 430) {
                    width = 595;
                }
                $('#table_list_rowdiamond').setGridWidth(width);

            },
            loadError: OnJqloadError,
            beforeProcessing: OnJqbeforeProcessingErrorcheck,
            viewrecords: true,
            hidegrid: false,
            sortname: 'ID',
            sortorder: 'asc',
        });

        // Setup buttons
        $("#table_list_rowdiamond").jqGrid('navGrid', '#pager_list_rowdiamond',
            { edit: false, add: false, del: false, search: false },
            { height: 320 }
    );
        $("#pager_list_rowdiamond_left").css("width", "");
        AlignJqGridHeader('table_list_rowdiamond', ['edit']);


    },

    /***Bind data Row Material Colorstone****/

    initializecolorstonetabJqgrid: function () {


        colNames = ['Index', 'ID', 'Shape', 'Size', 'Color', 'Sygnety', 'Synthetic'],
        colModel = [
                    { name: "ROWNUM", index: "ROWNUM", width: 3, xmlmap: xmlvars.common_colmap + "ROWNUM", search: false, sortable: false, hidden: false },
                    { name: "ID", index: "ID", width: 4, xmlmap: xmlvars.common_colmap + "ID", search: false, hidden: true },
                    { name: "SHAPE", index: "SHAPE", width: 4, xmlmap: xmlvars.common_colmap + "SHAPE", search: true, searchoptions: jqGridVariables.stringSearchOption, hidden: false },
                    { name: "D_SIZE", width: 3, index: "D_SIZE", xmlmap: xmlvars.common_colmap + "D_SIZE", search: false, sortable: false },
                    { name: "COLOUR", index: "COLOUR", width: 4, xmlmap: xmlvars.common_colmap + "COLOUR", search: false, hidden: false, sortable: false },
                    { name: "SYGNETY", width: 3, index: "SYGNETY", xmlmap: xmlvars.common_colmap + "SYGNETY", search: false, sortable: false, hidden: false },
                    { name: "SYNTHETIC", index: "SYNTHETIC", width: 4, xmlmap: xmlvars.common_colmap + "SYNTHETIC", search: false, sortable: false, hidden: false }
                   
        ];

        var myfilter = { groupOp: "AND", rules: [] };
        myfilter.rules.push({ field: "PARTYCODE", op: "eq", data: Master_PartyStockView.variables.Masterpartyid });

        $("#table_list_colorstone").GridUnload();
        $("#table_list_colorstone").jqGrid({

            url: getDomain() + Master_PartyStockView.variables.BinddiamonondtabListUrl + "&myfilters=" + JSON.stringify(myfilter),
            datatype: "xml",
            height: '100%',
            autowidth: true,
            shrinkToFit: true,
            rowNum: 20,
            rowList: [20, 50, 100],
            colNames: colNames,
            colModel: colModel,
            pager: "#pager_list_colorstone",
            xmlReader: {
                root: xmlvars.common_root,
                row: xmlvars.common_row,
                page: xmlvars.common_response + "CURRENTPAGE",
                total: xmlvars.common_response + "TOTALPAGES",
                records: xmlvars.common_response + "TOTALRECORDS",
                repeatitems: false,
                id: "ID"
            },
            loadComplete: function () {
                $("tr.jqgrow:even").addClass('myAltRowClass');

                // Hide column headers and top pager if no records were returned
                if ($('#jqgrid_colorstone').getGridParam('records') == 0)
                    $('.ui-jqgrid-htable').hide();
                else
                    $('.ui-jqgrid-htable').show();

                var width = $('#jqgrid_colorstone').width();
                if (width <= 430) {
                    width = 595;
                }
                $('#table_list_colorstone').setGridWidth(width);

            },
            loadError: OnJqloadError,
            beforeProcessing: OnJqbeforeProcessingErrorcheck,
            viewrecords: true,
            hidegrid: false,
            sortname: 'ID',
            sortorder: 'asc',
        });

        // Setup buttons
        $("#table_list_colorstone").jqGrid('navGrid', '#pager_list_colorstone',
            { edit: false, add: false, del: false, search: false },
            { height: 320 }
    );
        $("#pager_list_colorstone_left").css("width", "");
        AlignJqGridHeader('table_list_colorstone', ['edit']);


    },
    Bindjobpolicy: function (myfilter, res) {

        $.ajax({
            url: getDomain() + "/Common/BindMastersDetails?ServiceName=BUSINESS_POLICY_GET&myfilters=" + JSON.stringify(myfilter),
            async: false,
            cache: false,
            type: 'GET',
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    var JsonObject = xml2json.parser(data);
                  if (JsonObject.serviceresponse.detailslist != undefined) {
                      $("#text_bindjobwork").html("");
                      $("#text_bindbusinessdetails").html("");
                      if (res == 'JOB WORK POLICY') {
                          $("#text_bindjobwork").append($("#Bindjobworkdata").render(JsonObject.serviceresponse.detailslist.details));
                      }
                      else {
                          $("#text_bindbusinessdetails").append($("#Bindjobworkdata").render(JsonObject.serviceresponse.detailslist.details));
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
                            var List;
                            
                            //$("#hdnemrpcode").val(JsonObject.serviceresponse.detailslist.details.erppartycode);
                            if (JsonObject.serviceresponse.detailslist.details.length > 1)
                                
                                List = JsonObject.serviceresponse.detailslist.details;
                                
                            else
                                List = JsonObject.serviceresponse.detailslist;
                            response(
                               
                           $.map(List, function (item) {
                               if (jQuery.type(item) == "object") {
                                  
                                   return {
                                       id: item.partycode,
                                       label: item.partycodename,
                                       value: item.partycodename
                                       
                                   }
                               }
                              
                           }))
                            
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
        messages : {
            noResults : '',
            results : function(resultsCount) {}
        },
        focus: function (event, ui) {
            event.preventDefault();
        },
        select: function (event, ui) {
            Master_PartyStockView.variables.Masterpartyid = ui.item.id;
        },
        

        minLength: 0,
       
    })
    .data("ui-autocomplete")._renderItem = function (ul, item) {
        
       // Master_PartyStockView.variables.Masterpartyid = item.id;
        var inner_html = '<div class="list_item_container"><div class="autodescription"><p><span >' + item.label + '</span><br/></p></div>';
        var listItem = $("<li></li>")
        .data("item.autocomplete", item)
        .append(inner_html)
        .appendTo(ul);
        return listItem;
        
    }
    
    $(".ui-helper-hidden-accessible").css("display","none");
    $(".ui-autocomplete").css({ top: 103, left: 971.75, position: 'absolute' });
    $(".ui-autocomplete").css("background-color", "white");
   
}

function Getgoldata() {
    $.ajax({
        url: getDomain() + "/Common/BindMastersDetails?ServiceName=LATEST_GOLDRATE_GET",
        async: false,
        cache: false,
        type: 'GET',
        success: function (data) {
            var JsonObject = xml2json.parser(data);
            if ($(data).find('RESPONSECODE').text() == "0") {
                if (JsonObject.serviceresponse != undefined) {
                    $("#textgoldrate").html(JsonObject.serviceresponse.goldrate + " Rs/10gm");
                }
            }
            else {
                InvalidResponseCode(data);
            }
        },
        error: OnError
    });
}
$(document).ready(function () {
    $("#btnpartypolicy").attr("disabled", true);
    $("#btnstockback").click(function () {
        $("#textgemsdetails").html("");
        $("#textotherdetails").html("");
        $("#viewpartystock").hide();
        $("#gridviewpartystock").show();
    });

    $("#owl-demo").owlCarousel({
        navigation: false, 
        slideSpeed: 300,
        paginationSpeed: 400,
        singleItem: true
    });
    $("#partyinput").click(function () {
        $("#ui-id-1").hide();
    })
    $("#searchparty").click(function () {
        /*------------------*/
        if ($("#partyinput").val() != "") {
            $("#jqgrid_partystock").show();
            var myfilter = { groupOp: "AND", rules: [] };
            myfilter.rules.push({ field: "PARTYCODE", op: "eq", data: Master_PartyStockView.variables.Masterpartyid });
            if ($("#virtualstock").is(":checked") && $("#partyinput").val() != '') { //virtual
                $("#btnpartypolicy").attr("disabled", false);
                myfilter.rules.push({ field: "DESIGNID", op: "eq", data: "Virtual" });
                stringurl = "/Common/BindMastersDetails?ServiceName=DESIGN_MASTER_GET&myfilters=" + JSON.stringify(myfilter);
                $("#table_list_PartyStock").GridUnload();
                Master_PartyStockView.initializeJqgrid(stringurl);
            }
            if ($("#physicalstock").is(":checked") && $("#partyinput").val() != '') { // Physical
                $("#btnpartypolicy").attr("disabled", false);
                myfilter.rules.push({ field: "DESIGNID", op: "eq", data: "Physical" });
                stringurl = "/Common/BindMastersDetails?ServiceName=DESIGN_MASTER_GET&myfilters=" + JSON.stringify(myfilter),
                $("#table_list_PartyStock").GridUnload();
                Master_PartyStockView.initializeJqgrid(stringurl);
            }
        }
        else {
            $("#jqgrid_partystock").hide();
            notificationMessage('', 'Please Select Party Name', 'warning');
        }
    })

    $("#partyinput").change(function () {
        $("#btnpartypolicy").attr("disabled", true);
    })

    /*************My Policy Modal****************/
   
    $("#btnpartypolicy").click(function () {

        $("#modalopenpolicy").modal("show");
        Getgoldata();
    });

    $("#btnmodalclose").click(function () {

        /***Main Tab****/

        $("#tablabour a").removeClass("active"); 
        $("#tabother a").removeClass("active");
        $("#tabrawmaterial").addClass("active");
        $("#tab-1").addClass("active");
        $("#tab-2").removeClass("active");
        $("#tab-3").removeClass("active");

        /***Sub Tab****/

        $("#rowcolorstone a").removeClass("active");
        $("#rowdiamondtab a").removeClass("active");
        $("#rowgoldtab a").addClass("active");
        $("#businesspolicyli a").removeClass("active");
        $("#jobpolicyli a").addClass("active");
        $("#tab-4").addClass("active");
        $("#tab-5").removeClass("active");
        $("#tab-6").removeClass("active");
        $("#tabjobwork").addClass("active");
        $("#tabbusinesspolicy").removeClass("active");
    });

    $("#tablabour").click(function () {
        Master_PartyStockView.initializeLabourJqgrid();
    });

    /****************Row Material Gold Tab***********************************/

    $("#rowgoldtab").click(function () {

        Getgoldata();

    });

    /****************Row Material Diamond Tab***********************************/

    $("#rowdiamondtab").click(function () {

        Master_PartyStockView.initializediamondtabJqgrid();
    });

    /****************Row Material Colourstone Tab***********************************/

    $("#rowcolorstone").click(function () {
        Master_PartyStockView.initializecolorstonetabJqgrid();
    });

    /****************Other Tab***********************************/

    $("#tabother").click(function () {
        var res = 'JOB WORK POLICY'
        var myfilter = { rules: [] };
        myfilter.rules.push({ field: "POLICY_GRUP", op: "eq", data: res });
        myfilter.rules.push({ field: "PARTY_CODE", op: "eq", data: Master_PartyStockView.variables.Masterpartyid });

        Master_PartyStockView.Bindjobpolicy(myfilter, res);
    });
    $("#jobpolicyli").click(function () {

        var res = 'JOB WORK POLICY'
        var myfilter = { rules: [] };
        myfilter.rules.push({ field: "POLICY_GRUP", op: "eq", data: res });
        myfilter.rules.push({ field: "PARTY_CODE", op: "eq", data: Master_PartyStockView.variables.Masterpartyid });

        Master_PartyStockView.Bindjobpolicy(myfilter, res);
    });
    $("#businesspolicyli").click(function () {

        var res = 'BUSINESS POLICY'
        var myfilter = { rules: [] };
        myfilter.rules.push({ field: "POLICY_GRUP", op: "eq", data: res });
        myfilter.rules.push({ field: "PARTY_CODE", op: "eq", data: Master_PartyStockView.variables.Masterpartyid });

        Master_PartyStockView.Bindjobpolicy(myfilter, res);
      
        //Master_PartyStockView.Bindbusinesspolicypolicy();
    });

   
});