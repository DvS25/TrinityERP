var OffersView = {
    variables: {
        BindGroupListUrl: "/Common/BindMastersDetails?ServiceName=B2C_OFFERS_GET",
        PerformMasterOperationUrl: "/Common/OpeartionsOnMaster?ServiceName=B2C_OFFERS_CRUD",
        Oper: 'Add',
        addedit: "added",
        OffersId: ""
    },

    //====Bind PartnerProfile on pageload===========================================================//    
    initializeJqgrid: function () {

        colNames = ['Offers Id', 'Offers Name','Category Id','Category Name','SubcategoryId','Subcategory Name','Design Code', 'Price Add On Diamond', 'Dis. On Diamond', 'Dis. On Labour','From Date','To Date','Terms & Conditions'],
        colModel = [
                    { name: "OFFERSID", index: "OFFERSID", xmlmap: xmlvars.common_colmap + "OFFERSID", align: "center", search: false, searchoptions: jqGridVariables.stringSearchOption, hidden: true },
                    { name: "OFFERSNAME", index: "OFFERSNAME", width: 15, xmlmap: xmlvars.common_colmap + "OFFERSNAME", search: true, searchoptions: jqGridVariables.stringSearchOption, hidden: false },
                    { name: "CATEGORYID", index: "CATEGORYID", xmlmap: xmlvars.common_colmap + "CATEGORYID", search: false, hidden: true },
                    { name: "CATEGORYNAME", width: 28, index: "CATEGORYNAME", xmlmap: xmlvars.common_colmap + "CATEGORYNAME", hidden: true, search: false, searchoptions: jqGridVariables.stringSearchOption },
                    { name: "SUBCATEGORYID", index: "SUBCATEGORYID", xmlmap: xmlvars.common_colmap + "SUBCATEGORYID", search: false, hidden: true },
                    { name: "SUBCATEGORYNAME", width: 28, index: "SUBCATEGORYNAME", xmlmap: xmlvars.common_colmap + "SUBCATEGORYNAME", hidden: true, search: false, searchoptions: jqGridVariables.stringSearchOption },
                    { name: "DESIGNCODE", width: 15, index: "DESIGNCODE", xmlmap: xmlvars.common_colmap + "DESIGNCODE", search: true, searchoptions: jqGridVariables.stringSearchOption, hidden: true, sortable: false },
                    { name: "PRICEADDONDIAMOND", index: "PRICEADDONDIAMOND", align: "center", xmlmap: xmlvars.common_colmap + "PRICEADDONDIAMOND", sortable: true, width: 15, search: true, searchoptions: jqGridVariables.stringSearchOption, hidden: false },
                    { name: "DISCOUNTONDIAMOND", index: "DISCOUNTONDIAMOND", align: "center", xmlmap: xmlvars.common_colmap + "DISCOUNTONDIAMOND", sortable: true, width: 15, search: true, searchoptions: jqGridVariables.stringSearchOption, hidden: false },
                    { name: "DISCOUNTONLABOUR", index: "DISCOUNTONLABOUR", align: "center", xmlmap: xmlvars.common_colmap + "DISCOUNTONLABOUR", sortable: true, width: 15, search: true, searchoptions: jqGridVariables.stringSearchOption, hidden: false },
                    { name: "FROMDATE", width: 15, index: "FROMDATE", xmlmap: xmlvars.common_colmap + "FROMDATE", search: true, searchoptions: jqGridVariables.stringSearchOption, sortable: true },
                    { name: "TODATE", width: 15, index: "TODATE", xmlmap: xmlvars.common_colmap + "TODATE", search: true, searchoptions: jqGridVariables.stringSearchOption, hidden: false, sortable: true },
                    { name: "TERMSANDCONDITION", index: "TERMSANDCONDITION", xmlmap: xmlvars.common_colmap + "TERMSANDCONDITION", sortable: false, width: 20, search: false, hidden: false },
                    
        ];
        if (isU()) {
            colNames.push('Edit');
            colModel.push({ name: 'edit', index: 'edit', width: 5, sortable: false, align: "center", search: false, formatter: function (cv, op, ro) { return jqGridVariables.editBtnFmatter(cv, op, ro, 'OffersView', 'edit') } });
        } else if (isV()) {
            colNames.push('Edit');
            colModel.push({ name: 'edit', index: 'edit', width: 5, sortable: false, align: "center", search: false, formatter: function (cv, op, ro) { return jqGridVariables.editBtnFmatter(cv, op, ro, 'OffersView', 'view') } });
        }
        if (isD()) {
            colNames.push('Delete');
            colModel.push({ name: 'act', index: 'act', width: 5, sortable: false, align: "center", search: false, formatter: function (cv, op, ro) { return jqGridVariables.deleteBtnFmatter(cv, op, ro, 'OffersView') } });
        }

        $("#table_list_Offers").jqGrid({
            url: getDomain() + OffersView.variables.BindGroupListUrl,
            datatype: "xml",
            height: '100%',
            autowidth: true,
            shrinkToFit: true,
            rowNum: 25,
            rowList: [25, 50, 100],
            colNames: colNames,
            colModel: colModel,
            pager: "#pager_list_Offers",
            xmlReader: {
                root: xmlvars.common_root,
                row: xmlvars.common_row,
                page: xmlvars.common_response + "CURRENTPAGE",
                total: xmlvars.common_response + "TOTALPAGES",
                records: xmlvars.common_response + "TOTALRECORDS",
                repeatitems: false,
                id: "OFFERSID"
            },
            loadComplete: function () {
                $("tr.jqgrow:even").addClass('myAltRowClass');
                $("#table_list_Offers").jqGrid('setGridHeight', $(window).innerHeight() - 190 - ($("#gbox_table_list_Offers").height() - $('#gbox_table_list_Offers .ui-jqgrid-bdiv').height()));

                // Hide column headers and top pager if no records were returned
                if ($('#table_list_Offers').getGridParam('records') == 0)
                    $('.ui-jqgrid-htable').hide();
                else
                    $('.ui-jqgrid-htable').show();

                var width = $('#jqGrid_Offersdetails').width();
                if (width <= 430) {
                    width = 595;
                }
                $('#table_list_Offers').setGridWidth(width);

            },
            loadError: OnJqloadError,
            beforeProcessing: OnJqbeforeProcessingErrorcheck,
            viewrecords: true,
            hidegrid: false,
            sortname: 'OFFERSID',
            sortorder: 'desc',
        });

        // Setup buttons
        $("#table_list_Offers").jqGrid('navGrid', '#pager_list_Offers',
            { edit: false, add: false, del: false, search: true },
            { height: 320 }
    );
        $("#pager_list_Offers_left").css("width", "");
        AlignJqGridHeader('table_list_Offers', ['edit', 'act', 'PRICEADDONDIAMOND', 'DISCOUNTONDIAMOND', 'DISCOUNTONLABOUR']);

    },

    triggerId: function (id, oper) {
        var rowData = jQuery("#table_list_Offers").getRowData(id);
        BindDropdown('text_subcategory', 'SubCategoryDropdownList', "/Common/BindMastersDetails?ServiceName=SUBCATEGORY_GET&ColumnRequested=SUBCATEGORY,ID&sidx=SUBCATEGORY&sord=asc&IsRecordAll=true", '');
        var selectedValuesSubTest = rowData["SUBCATEGORYID"].split(',');
        $('#text_subcategory').val(selectedValuesSubTest).trigger("change");
        BindDropdown('text_category', 'CategoryDropdownList', "/Common/BindMastersDetails?ServiceName=CATEGORY_GET&ColumnRequested=CATEGORYNAME,CATEGORYID&sidx=CATEGORYNAME&sord=asc&IsRecordAll=true", '');
        var selectedValuesCatTest = rowData["CATEGORYID"].split(',');
        $('#text_category').val(selectedValuesCatTest).trigger("change");
        $("#text_designno").val(rowData['DESIGNCODE']);
        $("#hdnoffername").val(id);
        $('#editOffers').show();
        $('#viewOffers').hide();
        $("#text_offername").val(rowData['OFFERSNAME']);
        $("#txt_priceaddondiamd").val(rowData['PRICEADDONDIAMOND']);
        $("#txt_discountondiamond").val(rowData['DISCOUNTONDIAMOND']);
        $("#txt_discountonlabour").val(rowData['DISCOUNTONLABOUR']); 
        $("#text_termsandcondition").val(rowData['TERMSANDCONDITION']);
        $("#txt_fromdate").datepicker('setDate', rowData['FROMDATE']);
        $("#txt_todate").datepicker('setDate', rowData['TODATE']);
        OffersView.showTitlePermissionWise(oper);
    },
    showTitlePermissionWise: function (oper) {

        if (oper == 'edit' || oper == 'add') {
            $("#btn_Offers_Csave").show();
        }
        else {
            if ($("#btn_Offers_Csave").length > 0) {
                $("#btn_Offers_Csave").hide();
            }
        }
    },
    btnMasterSubmit: function () {
       
        OffersView.variables.Oper = 'Add';
        OffersView.variables.addedit = "added";
        OffersView.variables.OffersId = $("#hdnoffername").val();

        if (OffersView.variables.OffersId != "0" && parseInt(OffersView.variables.OffersId) > 0) {
            OffersView.variables.Oper = 'Edit';
            OffersView.variables.addedit = 'updated';
        }

        var categorymulti = [];
        $.each($(".muticategory option:selected"), function () {
            categorymulti.push($(this).val());
        });

        var subcategorymulti = [];
        $.each($(".mutisubcategory option:selected"), function () {
            subcategorymulti.push($(this).val());
        });

        var data = {

            "OFFERSID": OffersView.variables.OffersId,
            "oper": OffersView.variables.Oper,
            "OFFERSNAME": $("#text_offername").val(),
            "PRICEADDONDIAMOND": $("#txt_priceaddondiamd").val(),
            "DISCOUNTONDIAMOND": $("#txt_discountondiamond").val(),
            "DISCOUNTONLABOUR": $("#txt_discountonlabour").val(),
            "TERMSANDCONDITION": $("#text_termsandcondition").val(),
            "FROMDATE": $("#txt_fromdate").val(),
            "TODATE": $("#txt_todate").val(),
            "DESIGNCODE": $("#text_designno").val(),
            "CATEGORY": categorymulti.join(","),
            "SUBCATEGORY": subcategorymulti.join(","),
        }
        OffersView.savedata(data, OffersView.variables.Oper);
    },

    savedata: function (data, oper) {
        $.ajax({
            url: getDomain() + OffersView.variables.PerformMasterOperationUrl,
            data: data,
            async: true,
            cache: false,
            type: 'POST',
            success: OffersView.btnMasterSubmitOnSuccess,
            error: OnError,
        });
    },
    deleteRow: function (id) {
        $.confirm({
            'title': 'Delete Offers Detail',
            'message': 'You are about to delete this Offers Detail. It can not be restored at a later time! Continue? ',
            'buttons': {
                'Yes': {
                    'class': 'yes',
                    'action': function () {
                        $.ajax({
                            url: getDomain() + OffersView.variables.PerformMasterOperationUrl,
                            data: {
                                OFFERSID: id,
                                oper: 'delete'
                            },
                            async: true,
                            cache: false,
                            type: 'POST',
                            success: function (result) {
                                if ($(result).find('RESPONSECODE').text() == "0") {
                                    notificationMessage('Delete Operation', 'Record is deleted successfully', 'success');
                                    $("#table_list_Offers").trigger("reloadGrid", [{ current: true }]);
                                }
                                else
                                    notificationMessage('Error', $(result).find('RESPONSEMESSAGE').text(), 'error');
                            },
                            error: OnError,
                        });
                    }
                },
                'No': {
                    'class': 'no',
                    'action': function () {

                    }
                }
            }
        });
    },
    btnMasterSubmitOnSuccess: function (data) {
        if ($(data).find('RESPONSECODE').text() == "0") {
            if (OffersView.variables.Oper == 'Delete') {
                OperationMessage("", 'Offers deleted successfully', 'success');
            } else {
                OperationMessage("", 'Offers Details saved successfully', 'success');
                $('#editOffers').hide();
                $('#viewOffers').show();
            }
            OffersView.ClearValues();
            $("#table_list_Offers").trigger("reloadGrid", [{ current: true }]);
        } else if ($(data).find('RESPONSECODE').text() == "-4") {
            msg = "<div><b>Response Code:</b>-4</div>";
            msg += "<div><br /><b>Response Message:</b> " + $(data).find('RESPONSEMESSAGE').text() + "</div>";
            OperationMessage("DB Warning", msg, 'warning');
        }
        else {
            InvalidResponseCode(data);
        }
    },

    ClearValues: function () {
        $("#hdnoffername").val("");
        $("#text_offername").val("");
        $("#text_designno").val("");
        $("#text_category").val("");
        $("#text_subcategory").val("");
        $("#txt_priceaddondiamd").val("");
        $("#txt_discountondiamond").val("");
        $("#txt_discountonlabour").val("");
        $("#txt_fromdate").val("");
        $("#txt_todate").val("");
        $("#text_termsandcondition").val("");
        $("#formofferdetails").validate().resetForm();
        $('#editOffers').hide();
        $('#viewOffers').show();
    },
}
$(document).ready(function () {
    OffersView.initializeJqgrid();
    $('#text_category').select2({
        multiple: true,
    });
    $("#text_designno").keyup(function () {
        var dest = $(this);
        var space = dest.val().replace(/(\r\n|\n|\r)/gm, ',')
        dest.val(space.split(" ").join(","));
    });
    $('#text_subcategory').select2({
        multiple: true,
    });
    $('#txt_fromdate').datepicker({ format: 'dd M yyyy' });
    $('#txt_fromdate').on('change', function () {
        if ($("#txt_fromdate").val().length > 0) {
            $("#txt_fromdate-error").hide();
        }
        $('.datepicker').hide();
    });
   
    $('#txt_todate').datepicker({ format: 'dd M yyyy' });
    $('#txt_todate').on('change', function () {
        if ($("#txt_todate").val().length > 0) {
            $("#txt_todate-error").hide();
        }
        $('.datepicker').hide();
    });
    $("#btnAddNewOffers").click(function () {
        OffersView.ClearValues();
        BindDropdown('text_category', 'CategoryDropdownList', "/Common/BindMastersDetails?ServiceName=CATEGORY_GET&ColumnRequested=CATEGORYNAME,CATEGORYID&sidx=CATEGORYNAME&sord=asc&IsRecordAll=true", '');
        BindDropdown('text_subcategory', 'SubCategoryDropdownList', "/Common/BindMastersDetails?ServiceName=SUBCATEGORY_GET&ColumnRequested=SUBCATEGORY,ID&sidx=SUBCATEGORY&sord=asc&IsRecordAll=true", '');
        $('#editOffers').show();
        $('#viewOffers').hide();
    });
    $("#btn_Offers_cancle").click(function () {
        OffersView.ClearValues();
    });
   
    $("#btn_Offers_Csave").click(function () {
        var isValid = $("#formofferdetails").valid();
        if (!isValid)
        {
            if ($("#txt_fromdate").val().length == 0) {
                $("#txt_fromdate-error").insertAfter($("#txt_fromdate").parent());
            }
            if ($("#txt_todate").val().length == 0) {
                $("#txt_todate-error").insertAfter($("#txt_todate").parent());
            }
            if ($("#txt_priceaddondiamd").val().length == 0) {
                $("#txt_priceaddondiamd-error").insertAfter($("#txt_priceaddondiamd").parent());
            }
            return;
        }
        if ($("#text_designno").val() == "" && $("#text_subcategory").val() == "" && $("#text_category").val() == "") {
            notificationMessage('Please Enter Design No, Category Or SubCategory', '', 'warning');
        } 
        else if ($("#txt_discountondiamond").val() == "" && $("#txt_discountonlabour").val() == "") {
            notificationMessage('Please Enter Discount On Diamond OR Discount On Labour', '', 'warning');
        } else {
            OffersView.btnMasterSubmit();
        }
    });
});