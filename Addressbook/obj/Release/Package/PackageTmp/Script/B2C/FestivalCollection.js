//===============================Woman's collection===================================================
var BestSellingCategoryView = {
    variables: {
        BindGroupListUrl: "/Common/BindMastersDetails?ServiceName=B2C_FESTIVALCOLLECTION_GET",
        PerformMasterOperationUrl: "/Common/OpeartionsOnMaster?ServiceName=B2C_FESTIVAL_COLLECTION_CRUD",
        Oper: 'Add',
        addedit: "added",
        Bestcategoty: ""
    },

    //====Bind PartnerProfile on pageload===========================================================//    
    initializeJqgrid: function () {

        colNames = ['Festival Collection Id', 'Title', 'Picture', 'Design No', 'Sub CategoryID', 'Sub Category', 'Is Active', ' Web','Description'],
        colModel = [
                    { name: "FESTIVALCOLLECTION_ID", index: "FESTIVALCOLLECTION_ID", xmlmap: xmlvars.common_colmap + "FESTIVALCOLLECTION_ID", search: false, searchoptions: jqGridVariables.stringSearchOption, hidden: true },
                    { name: "SELLING_CATEGORY_NAME", index: "SELLING_CATEGORY_NAME", width: 12, xmlmap: xmlvars.common_colmap + "SELLING_CATEGORY_NAME", search: true, searchoptions: jqGridVariables.stringSearchOption, hidden: false },
                    { name: "MOBILEPICTURE", width: 8, index: "MOBILEPICTURE", xmlmap: xmlvars.common_colmap + "MOBILEPICTURE", sortable: false, search: false, align: "center", formatter: imageFormat, unformat: imageUnFormat },
                    { name: "DESIGNCODE", width: 15, index: "DESIGNCODE", xmlmap: xmlvars.common_colmap + "DESIGNCODE", search: true, searchoptions: jqGridVariables.stringSearchOption, hidden: false },
                    { name: "SUBCATEGORYID", index: "SUBCATEGORYID", xmlmap: xmlvars.common_colmap + "SUBCATEGORYID", search: false, hidden: true },
                    { name: "SUBCATEGORYNAME", width: 28, index: "SUBCATEGORYNAME", xmlmap: xmlvars.common_colmap + "SUBCATEGORYNAME", hidden: false, search: false, searchoptions: jqGridVariables.stringSearchOption },
                    { name: "ISACTIVE", index: "ISACTIVE", xmlmap: xmlvars.common_colmap + "ISACTIVE", width: 10, align: "center", formatter: function (cv, op, ro) { return jqGridVariables.chkFmatter(cv, op, ro, 'BestSellingCategoryView') }, search: false },
                    { name: "WEBPICTURE", index: "WEBPICTURE", xmlmap: xmlvars.common_colmap + "WEBPICTURE", search: false, formatter: imageWebFormat, unformat: imageWebUnFormat, hidden: true },
                    { name: "DESCRIPTION", index: "DESCRIPTION", xmlmap: xmlvars.common_colmap + "DESCRIPTION", search: false, hidden: true },

        ];
        if (isU()) {
            colNames.push('Edit');
            colModel.push({ name: 'edit', index: 'edit', width: 5, sortable: false, align: "center", search: false, formatter: function (cv, op, ro) { return jqGridVariables.editBtnFmatter(cv, op, ro, 'BestSellingCategoryView', 'edit') } });
        } else if (isV()) {
            colNames.push('Edit');
            colModel.push({ name: 'edit', index: 'edit', width: 5, sortable: false, align: "center", search: false, formatter: function (cv, op, ro) { return jqGridVariables.editBtnFmatter(cv, op, ro, 'BestSellingCategoryView', 'view') } });
        }
        if (isD()) {
            colNames.push('Delete');
            colModel.push({ name: 'act', index: 'act', width: 5, sortable: false, align: "center", search: false, formatter: function (cv, op, ro) { return jqGridVariables.deleteBtnFmatter(cv, op, ro, 'BestSellingCategoryView') } });
        }
        function imageFormat(cellvalue, options, rowObject) {
            return '<img style="width:35px !important; height:35px !important;" src="' + getDomain() + '/UploadFiles/B2CFestivalCollection/MobileImage/' + cellvalue + '" />';
        }
        function imageUnFormat(cellvalue, options, cell) {
            return $('img', cell).attr('#inputItemImage');
        }
        function imageWebFormat(cellvalue, options, rowObject) {
            return '<img style="width:35px !important; height:35px !important;" src="' + getDomain() + '/UploadFiles/B2CFestivalCollection/WebImage/' + cellvalue + '" />';
        }
        function imageWebUnFormat(cellvalue, options, cell) {
            return $('img', cell).attr('#inputItemImage');
        }

        $("#table_list_bestsellingdetails").jqGrid({

            url: getDomain() + BestSellingCategoryView.variables.BindGroupListUrl,
            datatype: "xml",
            height: '100%',
            autowidth: true,
            shrinkToFit: true,
            rowNum: 25,
            rowList: [25, 50, 100],
            colNames: colNames,
            colModel: colModel,
            pager: "#pager_list_bestsellingdetails",
            xmlReader: {
                root: xmlvars.common_root,
                row: xmlvars.common_row,
                page: xmlvars.common_response + "CURRENTPAGE",
                total: xmlvars.common_response + "TOTALPAGES",
                records: xmlvars.common_response + "TOTALRECORDS",
                repeatitems: false,
                id: "FESTIVALCOLLECTION_ID"
            },
            loadComplete: function () {
                $("tr.jqgrow:even").addClass('myAltRowClass');
                $("#table_list_bestsellingdetails").jqGrid('setGridHeight', $(window).innerHeight() - 190 - ($("#gbox_table_list_bestsellingdetails").height() - $('#gbox_table_list_bestsellingdetails .ui-jqgrid-bdiv').height()));

                // Hide column headers and top pager if no records were returned
                if ($('#table_list_bestsellingdetails').getGridParam('records') == 0)
                    $('.ui-jqgrid-htable').hide();
                else
                    $('.ui-jqgrid-htable').show();

                var width = $('#jqGrid_bestsellingdetails').width();
                if (width <= 430) {
                    width = 595;
                }
                $('#table_list_bestsellingdetails').setGridWidth(width);

            },
            loadError: OnJqloadError,
            beforeProcessing: OnJqbeforeProcessingErrorcheck,
            viewrecords: true,
            hidegrid: false,
            sortname: 'FESTIVALCOLLECTION_ID',
            sortorder: 'desc',
        });

        // Setup buttons
        $("#table_list_bestsellingdetails").jqGrid('navGrid', '#pager_list_bestsellingdetails',
            { edit: false, add: false, del: false, search: true },
            { height: 320 }
    );
        $("#pager_list_bestsellingdetails_left").css("width", "");
        AlignJqGridHeader('table_list_bestsellingdetails', ['edit', 'act', 'DISPLAY_ORDER', 'ISACTIVE', 'MOBILEPICTURE']);

    },

    triggerId: function (id, oper) {
        var rowData = jQuery("#table_list_bestsellingdetails").getRowData(id);
        $("#hdnbestsellingdetails").val(id);
        $('#editbestsellingdetails').show();
        $('#viewbestsellingdetails').hide();
        BindDropdown('text_subcategory', 'SubCategoryDropdownList', "/Common/BindMastersDetails?ServiceName=SUBCATEGORY_GET&ColumnRequested=CATSUBCATEGORY,ID&sidx=CATEGORY&sord=asc&IsRecordAll=true", '');
        $("#text_designno").val(rowData['DESIGNCODE']);
        $('#ItemimgPreview').attr('src', $(rowData['MOBILEPICTURE']).attr('src'))
        $('#ItemimgPreview').data('oldurl', $(rowData['MOBILEPICTURE']).attr('src'));
        $('#ItemimgWebPreview').attr('src', $(rowData['WEBPICTURE']).attr('src'))
        $('#ItemimgWebPreview').data('oldurl', $(rowData['WEBPICTURE']).attr('src'));
        $("#text_besttitlename").val(rowData['SELLING_CATEGORY_NAME']);
        $("#text_description").val(rowData['DESCRIPTION']);
        var selectedValuesSubTest = rowData["SUBCATEGORYID"].split(',');
        $('#text_subcategory').val(selectedValuesSubTest).trigger("change");
        $('#activeswichonoff').prop('checked', ($(rowData['ISACTIVE']).html() == 'Yes') ? $('#activeswichonoff').bootstrapToggle('on') : $('#activeswichonoff').bootstrapToggle('off'));
        BestSellingCategoryView.showTitlePermissionWise(oper);
    },
    showTitlePermissionWise: function (oper) {

        if (oper == 'edit' || oper == 'add') {
            $("#btn_bestcategory_Csave").show();
            $("#inputItemImage").show();
            $("#inputItemWebImage").show();

        }
        else {
            if ($("#btn_bestcategory_Csave").length > 0) {
                $("#btn_bestcategory_Csave").hide();
            }
            if ($("#inputItemImage").length > 0) {
                $("#inputItemImage").hide();
            }
            if ($("#inputItemWebImage").length > 0) {
                $("#inputItemWebImage").hide();
            }
        }
    },
    btnMasterSubmit: function () {
        
        var isValid = $("#formcollectione").valid();
        var activetoggle;
        if ($('#ItemimgPreview').attr('src') == '/Content/images/upimg.png') {
            $('#ItemimgError').show();
            $('#ItemimgError').html("This field is required.");
            isValid = false;
        }
        if ($('#ItemimgWebPreview').attr('src') == '/Content/images/upimg.png') {
            $('#ItemimgWebError').show();
            $('#ItemimgWebError').html("This field is required.");
            isValid = false;
        }
        if (!isValid)
            return;
        BestSellingCategoryView.variables.Oper = 'Add';
        BestSellingCategoryView.variables.addedit = "added";
        BestSellingCategoryView.variables.Bestcategoty = $("#hdnbestsellingdetails").val();

        if (BestSellingCategoryView.variables.Bestcategoty != "0" && parseInt(BestSellingCategoryView.variables.Bestcategoty) > 0) {
            BestSellingCategoryView.variables.Oper = 'Edit';
            BestSellingCategoryView.variables.addedit = 'updated';
        }
        if ($(".collectionswitch > div").hasClass('off'))
        {
            activetoggle = "0";
        }
        else {
            activetoggle = "1";
        }
        var subcategorymulti = [];
        $.each($(".mutisubcategory option:selected"), function () {
            subcategorymulti.push($(this).val());
        });


        var data = {

            "FESTIVALCOLLECTION_ID": BestSellingCategoryView.variables.Bestcategoty,
            "oper": BestSellingCategoryView.variables.Oper,
            "DESIGNCODE": $("#text_designno").val(),
            "SELLING_CATEGORY_NAME": $("#text_besttitlename").val(),
            "SUBCATEGORY": subcategorymulti.join(","),
            "DESCRIPTION":$("#text_description").val(),
            "ISACTIVE": activetoggle,

        }

        BestSellingCategoryView.savedata(data, BestSellingCategoryView.variables.Oper);
    },

    savedata: function (data, oper) {

        var originalfile = '';
        var newfile = '';
        var originalweb = '';
        var newweb = '';
        var foldername = 'B2CFestivalCollection/MobileImage';
        var folderWebname = 'B2CFestivalCollection/WebImage';

        if (oper == 'Delete') {
            originalfile = $('#hdnImagePath').data('oldurl');
            newfile = $("#hdnImagePath").val();
            originalweb = $("#hdnWebPath").data('oldurl');
            newweb = $("#hdnWebPath").val();
        }
        else {
            originalfile = $('#ItemimgPreview').data('oldurl');
            newfile = $('#ItemimgPreview').attr('src');
            originalweb = $("#ItemimgWebPreview").data('oldurl');
            newweb = $("#ItemimgWebPreview").attr('src');
        }
        $.ajax({
            type: 'POST',
            async: false,
            cache: false,
            url: getDomain() + "/Common/SaveSingleImage",
            data: { originalfile: originalfile, newfile: newfile, oper: BestSellingCategoryView.variables.Oper, isResize: false, module: foldername },
            success: function (result) {
                data.MOBILEPICTURE = result;
                $.ajax({
                    type: 'POST',
                    async: false,
                    cache: false,
                    url: getDomain() + "/Common/SaveSingleImage",
                    data: { originalfile: originalweb, newfile: newweb, oper: BestSellingCategoryView.variables.Oper, isResize: false, module: folderWebname },
                    success: function (result) {
                        data.WEBPICTURE = result;
                        $.ajax({
                            url: getDomain() + BestSellingCategoryView.variables.PerformMasterOperationUrl,
                            data: data,
                            async: true,
                            cache: false,
                            type: 'POST',
                            success: BestSellingCategoryView.btnMasterSubmitOnSuccess,
                            error: OnError,
                        });

                    },
                    error: OnError
                });
            },
        });
    },
    deleteRow: function (id) {
        var rowData = jQuery("#table_list_bestsellingdetails").getRowData(id);
        var originalfile = getDomain() + $(rowData['MOBILEPICTURE']).attr('src');
        var webfile = getDomain() + $(rowData['WEBPICTURE']).attr('src');
        $.confirm({
            'title': 'Delete Best Selling Category',
            'message': 'You are about to delete this Best Selling Category Detail. It can not be restored at a later time! Continue? ',
            'buttons': {
                'Yes': {
                    'class': 'yes',
                    'action': function () {
                        $.ajax({
                            type: 'POST',
                            async: false,
                            cache: false,
                            url: getDomain() + "/Common/SaveSingleImage",
                            data: { originalfile: originalfile, newfile: originalfile, oper: 'Delete', isResize: false, module: 'B2CFestivalCollection/MobileImage' },
                            success: function (data) {
                                $.ajax({
                                    type: 'POST',
                                    async: false,
                                    cache: false,
                                    url: getDomain() + "/Common/SaveSingleImage",
                                    data: { originalfile: webfile, newfile: webfile, oper: 'Delete', isResize: false, module: 'B2CFestivalCollection/WebImage' },
                                    success: function (data) {
                                        $.ajax({
                                            url: getDomain() + BestSellingCategoryView.variables.PerformMasterOperationUrl,
                                            data: {
                                                FESTIVALCOLLECTION_ID: id,
                                                oper: 'delete'
                                            },
                                            async: true,
                                            cache: false,
                                            type: 'POST',
                                            success: function (data) {
                                                if ($(data).find('RESPONSECODE').text() == "0") {
                                                    notificationMessage('Delete Operation', 'Record is deleted successfully', 'success');
                                                    $("#table_list_bestsellingdetails").trigger("reloadGrid", [{ current: true }]);
                                                }
                                                else
                                                    notificationMessage('Error', $(data).find('RESPONSEMESSAGE').text(), 'error');
                                            },
                                            error: OnError,
                                        });
                                    },
                                });
                            },
                            error: OnError
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
            if (BestSellingCategoryView.variables.Oper == 'Delete') {
                OperationMessage("", 'Festival Collection Details deleted successfully', 'success');
            } else {
                OperationMessage("", 'Festival Collection Details saved successfully', 'success');
                $('#editbestsellingdetails').hide();
                $('#viewbestsellingdetails').show();

            }
            BestSellingCategoryView.ClearValues();
            $("#table_list_bestsellingdetails").trigger("reloadGrid", [{ current: true }]);
        }
        else {
            InvalidResponseCode(data);
        }

    },

    ClearValues: function () {
        $("#hdnbestsellingdetails").val("");
        $("#text_designno").val("");
        $("#text_collectionimg").val("");
        $("#text_displayorder").val("");
        $("#text_besttitlename").val("");
        $("#text_collectionkeyword").val("");
        $("#text_subcategory").val("");
        $("#text_description").val("");
        $('#ItemimgPreview').attr('src', '/Content/images/upimg.png');
        $('#ItemimgPreview').data('oldurl', '');
        $('#ItemimgWebPreview').attr('src', '/Content/images/upimg.png');
        $('#ItemimgWebPreview').data('oldurl', '');
        $('#activeswichonoff').bootstrapToggle('off');
        $("#formcollectione").validate().resetForm();
        $("#text_displayorder-error").hide();
        $("#ItemimgWebError").hide();
        $("#ItemimgError").hide();
        $('#editbestsellingdetails').hide();
        $('#viewbestsellingdetails').show();

    },
}

$(document).ready(function () {
    //============================ Collection =================================================
    BestSellingCategoryView.initializeJqgrid();
    
    $("#text_designno").change(function () {
        if ($("#text_designno").val().length > 0) {
            $("#designerror").hide();
            $("#designerror").html("");
        }
    });
    $('#text_subcategory').select2({
        multiple: true,
    });
    $("#text_designno").keyup(function () {
        var dest = $(this);
        var space = dest.val().replace(/(\r\n|\n|\r)/gm, ',')
        dest.val(space.split(" ").join(","));
    });
    $("#btnAddNewbestselling").click(function () {
        BestSellingCategoryView.ClearValues();
        $('#editbestsellingdetails').show();
        $('#viewbestsellingdetails').hide();
        BindDropdown('text_subcategory', 'SubCategoryDropdownList', "/Common/BindMastersDetails?ServiceName=SUBCATEGORY_GET&ColumnRequested=CATSUBCATEGORY,ID&sidx=CATEGORY&sord=asc&IsRecordAll=true", '');
    });
    $("#btn_bestcategory_cancle").click(function () {

        BestSellingCategoryView.ClearValues();
    });
    $("#btn_bestcategory_Csave").click(function () {
        if ($("#text_designno").val() == "" && $("#text_subcategory").val() == "") {
            notificationMessage('Please Enter Design No Or SubCategory', '', 'warning');
        } else {
            BestSellingCategoryView.btnMasterSubmit();
        }
    });
    RegisterFileUpload('inputItemImage', 'ItemimgPreview', "#ItemimgError");
    RegisterFileUpload('inputItemWebImage', 'ItemimgWebPreview', "#ItemimgWebError");

});