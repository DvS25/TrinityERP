//===============================Woman's collection===================================================
var ProductListAdsView = {
    variables: {
        BindGroupListUrl: "/Common/BindMastersDetails?ServiceName=B2C_PRODUCT_LISTING_ADS_GET",
        PerformMasterOperationUrl: "/Common/OpeartionsOnMaster?ServiceName=B2C_PRODUCT_LISTING_ADS_CRUD",
        Oper: 'Add',
        addedit: "added",
        ProductList: ""
    },

    //====Bind PartnerProfile on pageload===========================================================//    
    initializeJqgrid: function () {

        colNames = ['Product Id', 'Title', 'Picture', 'Ratio', 'IsActive',],
        colModel = [
                    { name: "PLISTID", index: "PLISTID", xmlmap: xmlvars.common_colmap + "PLISTID", search: false, searchoptions: jqGridVariables.stringSearchOption, hidden: true },
                    { name: "TITLE", index: "TITLE", width: 20, xmlmap: xmlvars.common_colmap + "TITLE", search: true, searchoptions: jqGridVariables.stringSearchOption, hidden: false },
                    { name: "WEBPICTURE", index: "WEBPICTURE", width: 12,align: "center", xmlmap: xmlvars.common_colmap + "WEBPICTURE", search: false, sortable: false, formatter: imageWebFormat, unformat: imageWebUnFormat, hidden: false },
                    { name: "RATIO", width: 10, index: "RATIO", xmlmap: xmlvars.common_colmap + "RATIO", align: "center", search: true, sortable: false, searchoptions: jqGridVariables.stringSearchOption, hidden: false },
                    { name: "ISACTIVE", index: "ISACTIVE", xmlmap: xmlvars.common_colmap + "ISACTIVE", width: 20,sortable: true, align: "center", formatter: function (cv, op, ro) { return jqGridVariables.chkFmatter(cv, op, ro, 'ProductListAdsView') }, search: false },
        ];
        if (isU()) {
            colNames.push('Edit');
            colModel.push({ name: 'edit', index: 'edit', width: 5, sortable: false, align: "center", search: false, formatter: function (cv, op, ro) { return jqGridVariables.editBtnFmatter(cv, op, ro, 'ProductListAdsView', 'edit') } });
        } else if (isV()) {
            colNames.push('Edit');
            colModel.push({ name: 'edit', index: 'edit', width: 5, sortable: false, align: "center", search: false, formatter: function (cv, op, ro) { return jqGridVariables.editBtnFmatter(cv, op, ro, 'ProductListAdsView', 'view') } });
        }
        if (isD()) {
            colNames.push('Delete');
            colModel.push({ name: 'act', index: 'act', width: 5, sortable: false, align: "center", search: false, formatter: function (cv, op, ro) { return jqGridVariables.deleteBtnFmatter(cv, op, ro, 'ProductListAdsView') } });
        }
        function imageWebFormat(cellvalue, options, rowObject) {
            return '<img style="width:35px !important; height:35px !important;" src="' + getDomain() + '/UploadFiles/B2CProductAds/WebImage/' + cellvalue + '" />';
        }
        function imageWebUnFormat(cellvalue, options, cell) {
            return $('img', cell).attr('#inputItemImage');
        }

        $("#table_list_productlistads").jqGrid({

            url: getDomain() + ProductListAdsView.variables.BindGroupListUrl,
            datatype: "xml",
            height: '100%',
            autowidth: true,
            shrinkToFit: true,
            rowNum: 25,
            rowList: [25, 50, 100],
            colNames: colNames,
            colModel: colModel,
            pager: "#pager_list_productlistads",
            xmlReader: {
                root: xmlvars.common_root,
                row: xmlvars.common_row,
                page: xmlvars.common_response + "CURRENTPAGE",
                total: xmlvars.common_response + "TOTALPAGES",
                records: xmlvars.common_response + "TOTALRECORDS",
                repeatitems: false,
                id: "PLISTID"
            },
            loadComplete: function () {
                $("tr.jqgrow:even").addClass('myAltRowClass');
                $("#table_list_productlistads").jqGrid('setGridHeight', $(window).innerHeight() - 190 - ($("#gbox_table_list_productlistads").height() - $('#gbox_table_list_productlistads .ui-jqgrid-bdiv').height()));

                // Hide column headers and top pager if no records were returned
                if ($('#table_list_productlistads').getGridParam('records') == 0)
                    $('.ui-jqgrid-htable').hide();
                else
                    $('.ui-jqgrid-htable').show();

                var width = $('#jqGrid_productlistads').width();
                if (width <= 430) {
                    width = 595;
                }
                $('#table_list_productlistads').setGridWidth(width);

            },
            loadError: OnJqloadError,
            beforeProcessing: OnJqbeforeProcessingErrorcheck,
            viewrecords: true,
            hidegrid: false,
            sortname: 'PLISTID',
            sortorder: 'desc',
        });

        // Setup buttons
        $("#table_list_productlistads").jqGrid('navGrid', '#pager_list_productlistads',
            { edit: false, add: false, del: false, search: true },
            { height: 320 }
    );
        $("#pager_list_productlistads_left").css("width", "");
        AlignJqGridHeader('table_list_productlistads', ['edit', 'act', 'ISACTIVE', 'WEBPICTURE','RATIO']);

    },

    triggerId: function (id, oper) {
        var rowData = jQuery("#table_list_productlistads").getRowData(id);
        $("#hdnproductlistads").val(id);
        $('#editproductlistads').show();
        $('#viewproductlistads').hide();
        $("#text_producttitlename").val(rowData['TITLE']);
        $('#ItemimgWebPreview').attr('src', $(rowData['WEBPICTURE']).attr('src'))
        $('#ItemimgWebPreview').data('oldurl', $(rowData['WEBPICTURE']).attr('src'));
        $("#text_ratio").val(rowData['RATIO']);
        $('#activeswichonoff').prop('checked', ($(rowData['ISACTIVE']).html() == 'Yes') ? $('#activeswichonoff').bootstrapToggle('on') : $('#activeswichonoff').bootstrapToggle('off'));
        ProductListAdsView.showTitlePermissionWise(oper);
    },
    showTitlePermissionWise: function (oper) {

        if (oper == 'edit' || oper == 'add') {
            $("#btn_productads_Csave").show();
            $("#inputItemWebImage").show();
        }
        else {
            if ($("#btn_productads_Csave").length > 0) {
                $("#btn_productads_Csave").hide();
            }
            if ($("#inputItemWebImage").length > 0) {
                $("#inputItemWebImage").hide();
            }
        }
    },
    btnMasterSubmit: function () {

        var isValid = $("#fromproduct").valid();
        var activetoggle;
       
        if ($('#ItemimgWebPreview').attr('src') == '/Content/images/upimg.png') {
            $('#ItemimgWebError').show();
            $('#ItemimgWebError').html("This field is required.");
            isValid = false;
        }
        if (!isValid)
            return;

        ProductListAdsView.variables.Oper = 'Add';
        ProductListAdsView.variables.addedit = "added";
        ProductListAdsView.variables.ProductList = $("#hdnproductlistads").val();

        if (ProductListAdsView.variables.ProductList != "0" && parseInt(ProductListAdsView.variables.ProductList) > 0) {
            ProductListAdsView.variables.Oper = 'Edit';
            ProductListAdsView.variables.addedit = 'updated';
        }

        if ($("#activeswichonoff").prop("checked") == true) {

            activetoggle = "1";

        } else {
            activetoggle = "0";
        }
        var data = {

            "PLISTID": ProductListAdsView.variables.ProductList,
            "oper": ProductListAdsView.variables.Oper,
            "TITLE": $("#text_producttitlename").val(),
            "RATIO": $("#text_ratio").val(),
            "ISACTIVE": activetoggle,

        }
        ProductListAdsView.savedata(data, ProductListAdsView.variables.Oper);
    },
    savedata: function (data, oper) {
        var originalweb = '';
        var newweb = '';
        var folderWebname = 'B2CProductAds/WebImage';

        if (oper == 'Delete') {
            originalweb = $("#hdnWebPath").data('oldurl');
            newweb = $("#hdnWebPath").val();
        }
        else {
            originalweb = $("#ItemimgWebPreview").data('oldurl');
            newweb = $("#ItemimgWebPreview").attr('src');
        }
        $.ajax({
            type: 'POST',
            async: false,
            cache: false,
            url: getDomain() + "/Common/SaveSingleImage",
            data: { originalfile: originalweb, newfile: newweb, oper: ProductListAdsView.variables.Oper, isResize: false, module: folderWebname },
            success: function (result) {
                data.WEBPICTURE = result;
                $.ajax({
                    url: getDomain() + ProductListAdsView.variables.PerformMasterOperationUrl,
                    data: data,
                    async: true,
                    cache: false,
                    type: 'POST',
                    success: ProductListAdsView.btnMasterSubmitOnSuccess,
                    error: OnError,
                });

            },
            error: OnError
        });
    },
    deleteRow: function (id) {
        var rowData = jQuery("#table_list_productlistads").getRowData(id);
        var webfile = getDomain() + $(rowData['WEBPICTURE']).attr('src');
        $.confirm({
            'title': 'Delete Product Ads Details',
            'message': 'You are about to delete this Product Ads Detail. It can not be restored at a later time! Continue? ',
            'buttons': {
                'Yes': {
                    'class': 'yes',
                    'action': function () {
                        $.ajax({
                            type: 'POST',
                            async: false,
                            cache: false,
                            url: getDomain() + "/Common/SaveSingleImage",
                            data: { originalfile: webfile, newfile: webfile, oper: 'Delete', isResize: false, module: 'B2CProductAds/WebImage' },
                            success: function (result) {
                                $.ajax({
                                    url: getDomain() + ProductListAdsView.variables.PerformMasterOperationUrl,
                                    data: {
                                        PLISTID: id,
                                        oper: 'delete'
                                    },
                                    async: true,
                                    cache: false,
                                    type: 'POST',
                                    success: function (result) {
                                        if ($(result).find('RESPONSECODE').text() == "0") {
                                            notificationMessage('Delete Operation', 'Record is deleted successfully', 'success');
                                            $("#table_list_productlistads").trigger("reloadGrid", [{ current: true }]);
                                        }
                                        else
                                            notificationMessage('Error', $(result).find('RESPONSEMESSAGE').text(), 'error');
                                    },
                                    error: OnError,
                                });
                            },
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
            if (ProductListAdsView.variables.Oper == 'Delete') {
                OperationMessage("", 'Product Ads deleted successfully', 'success');
            } else {
                OperationMessage("", 'Product Ads saved successfully', 'success');
                $('#editproductlistads').hide();
                $('#viewproductlistads').show();

            }
            ProductListAdsView.ClearValues();
            $("#table_list_productlistads").trigger("reloadGrid", [{ current: true }]);
        }
        else {
            InvalidResponseCode(data);
        }

    },

    ClearValues: function () {
        $("#hdnproductlistads").val("");
        $("#text_producttitlename").val("");
        $("#text_ratio").val("");
        $('#ItemimgWebPreview').attr('src', '/Content/images/upimg.png');
        $('#ItemimgWebPreview').data('oldurl', '');
        $('#activeswichonoff').bootstrapToggle('off');
        $("#fromproduct").validate().resetForm();
        $("#ItemimgWebError").hide();
        $('#editproductlistads').hide();
        $('#viewproductlistads').show();
    },
}

$(document).ready(function () {
    ProductListAdsView.initializeJqgrid();
    $("#btnAddNewbestselling").click(function () {
        ProductListAdsView.ClearValues();
        $('#editproductlistads').show();
        $('#viewproductlistads').hide();
    });
    $("#btn_bestcategory_cancle").click(function () {
        ProductListAdsView.ClearValues();
    });
    $("#btn_productads_Csave").click(function () {
        ProductListAdsView.btnMasterSubmit();
    });
    RegisterFileUpload('inputItemWebImage', 'ItemimgWebPreview', "#ItemimgWebError");

});