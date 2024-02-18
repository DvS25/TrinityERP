//===============================Woman's collection===================================================
var CollectionView = {
    variables: {
        BindGroupListUrl: "/Common/BindMastersDetails?ServiceName=B2C_COLLECTION_GET",
        PerformMasterOperationUrl: "/Common/OpeartionsOnMaster?ServiceName=B2C_COLLECTION_CRUD",
        Oper: 'Add',
        addedit: "added",
        CollectionId: ""
    },

    //====Bind PartnerProfile on pageload===========================================================//    
    initializeJqgrid: function () {

        colNames = ['Collection Id', 'Collection Name', 'Collection Keyword', 'Picture', 'Design No', 'Sub CategoryID', 'Sub Category', 'Display Order', 'Is Active', ' Web','description'],
        colModel = [
                    { name: "COLLECTION_ID", index: "COLLECTION_ID", xmlmap: xmlvars.common_colmap + "COLLECTION_ID", search: false, searchoptions: jqGridVariables.stringSearchOption, hidden: true },
                    { name: "COLLECTION_NAME", index: "COLLECTION_NAME", width: 12, xmlmap: xmlvars.common_colmap + "COLLECTION_NAME", search: true, searchoptions: jqGridVariables.stringSearchOption, hidden: false },
                    { name: "COLLECTIONKEYWORD", index: "COLLECTIONKEYWORD", xmlmap: xmlvars.common_colmap + "COLLECTIONKEYWORD", width: 12, search: true, searchoptions: jqGridVariables.stringSearchOption, hidden: false },
                    { name: "MOBILEPICTURE", width: 8, index: "MOBILEPICTURE", xmlmap: xmlvars.common_colmap + "MOBILEPICTURE", sortable: false, search: false, align: "center", formatter: imageFormat, unformat: imageUnFormat },
                    { name: "DESIGNCODE", width: 15, index: "DESIGNCODE", xmlmap: xmlvars.common_colmap + "DESIGNCODE", search: true, searchoptions: jqGridVariables.stringSearchOption, hidden: false },
                    { name: "SUBCATEGORY", index: "SUBCATEGORY", xmlmap: xmlvars.common_colmap + "SUBCATEGORY", search: false, hidden: true },
                    { name: "SUBCATEGORYNAME", width: 28, index: "SUBCATEGORYNAME", xmlmap: xmlvars.common_colmap + "SUBCATEGORYNAME", hidden: false, search: false, searchoptions: jqGridVariables.stringSearchOption },
                    { name: "DISPLAY_ORDER", index: "DISPLAY_ORDER", xmlmap: xmlvars.common_colmap + "DISPLAY_ORDER", width: 10, align: "center", search: false, hidden: false },
                    { name: "ISACTIVE", index: "ISACTIVE", xmlmap: xmlvars.common_colmap + "ISACTIVE", width: 10, align: "center", formatter: function (cv, op, ro) { return jqGridVariables.chkFmatter(cv, op, ro, 'CollectionView') }, search: false },
                    { name: "WEBPICTURE", index: "WEBPICTURE", xmlmap: xmlvars.common_colmap + "WEBPICTURE", search: false, formatter: imageWebFormat, unformat: imageWebUnFormat, hidden: true },
                    { name: "DESCRIPTION", index: "DESCRIPTION", xmlmap: xmlvars.common_colmap + "DESCRIPTION", search: false, hidden: true },
        ];
        if (isU()) {
            colNames.push('Edit');
            colModel.push({ name: 'edit', index: 'edit', width: 5, sortable: false, align: "center", search: false, formatter: function (cv, op, ro) { return jqGridVariables.editBtnFmatter(cv, op, ro, 'CollectionView', 'edit') } });
        } else if (isV()) {
            colNames.push('Edit');
            colModel.push({ name: 'edit', index: 'edit', width: 5, sortable: false, align: "center", search: false, formatter: function (cv, op, ro) { return jqGridVariables.editBtnFmatter(cv, op, ro, 'CollectionView', 'view') } });
        }
        if (isD()) {
            colNames.push('Delete');
            colModel.push({ name: 'act', index: 'act', width: 5, sortable: false, align: "center", search: false, formatter: function (cv, op, ro) { return jqGridVariables.deleteBtnFmatter(cv, op, ro, 'CollectionView') } });
        }
        function imageFormat(cellvalue, options, rowObject) {
            return '<img style="width:35px !important; height:35px !important;" src="' + getDomain() + '/UploadFiles/B2CCollection/MobileImage/' + cellvalue + '" />';
        }
        function imageUnFormat(cellvalue, options, cell) {
            return $('img', cell).attr('#inputItemImage');
        }
        function imageWebFormat(cellvalue, options, rowObject) {
            return '<img style="width:35px !important; height:35px !important;" src="' + getDomain() + '/UploadFiles/B2CCollection/WebImage/' + cellvalue + '" />';
        }
        function imageWebUnFormat(cellvalue, options, cell) {
            return $('img', cell).attr('#inputItemImage');
        }

        $("#table_list_collectiondetails").jqGrid({

            url: getDomain() + CollectionView.variables.BindGroupListUrl,
            datatype: "xml",
            height: '100%',
            autowidth: true,
            shrinkToFit: true,
            rowNum: 25,
            rowList: [25, 50, 100],
            colNames: colNames,
            colModel: colModel,
            pager: "#pager_list_collectiondetails",
            xmlReader: {
                root: xmlvars.common_root,
                row: xmlvars.common_row,
                page: xmlvars.common_response + "CURRENTPAGE",
                total: xmlvars.common_response + "TOTALPAGES",
                records: xmlvars.common_response + "TOTALRECORDS",
                repeatitems: false,
                id: "COLLECTION_ID"
            },
            loadComplete: function () {
                $("tr.jqgrow:even").addClass('myAltRowClass');
                $("#table_list_collectiondetails").jqGrid('setGridHeight', $(window).innerHeight() - 190 - ($("#gbox_table_list_collectiondetails").height() - $('#gbox_table_list_collectiondetails .ui-jqgrid-bdiv').height()));

                // Hide column headers and top pager if no records were returned
                if ($('#table_list_collectiondetails').getGridParam('records') == 0)
                    $('.ui-jqgrid-htable').hide();
                else
                    $('.ui-jqgrid-htable').show();

                var width = $('#jqGrid_collectiondetails').width();
                if (width <= 430) {
                    width = 595;
                }
                $('#table_list_collectiondetails').setGridWidth(width);

            },
            loadError: OnJqloadError,
            beforeProcessing: OnJqbeforeProcessingErrorcheck,
            viewrecords: true,
            hidegrid: false,
            sortname: 'DISPLAY_ORDER',
            sortorder: 'desc',
        });

        // Setup buttons
        $("#table_list_collectiondetails").jqGrid('navGrid', '#pager_list_collectiondetails',
            { edit: false, add: false, del: false, search: true },
            { height: 320 }
    );
        $("#pager_list_collectiondetails_left").css("width", "");
        AlignJqGridHeader('table_list_collectiondetails', ['edit', 'act', 'DISPLAY_ORDER', 'ISACTIVE', 'MOBILEPICTURE']);

    },

    triggerId: function (id, oper) {
        var rowData = jQuery("#table_list_collectiondetails").getRowData(id);
        $("#hdncollectdetails").val(id);
        $('#editcollectiondetails').show();
        $('#viewcollectiondetails').hide();
        BindDropdown('text_subcategory', 'SubCategoryDropdownList', "/Common/BindMastersDetails?ServiceName=SUBCATEGORY_GET&ColumnRequested=CATSUBCATEGORY,ID&sidx=CATEGORY&sord=asc&IsRecordAll=true", '');
        $("#text_designno").val(rowData['DESIGNCODE']);
        $('#ItemimgPreview').attr('src', $(rowData['MOBILEPICTURE']).attr('src'))
        $('#ItemimgPreview').data('oldurl', $(rowData['MOBILEPICTURE']).attr('src'));
        $('#ItemimgWebPreview').attr('src', $(rowData['WEBPICTURE']).attr('src'))
        $('#ItemimgWebPreview').data('oldurl', $(rowData['WEBPICTURE']).attr('src'));
        $("#text_displayorder").val(rowData['DISPLAY_ORDER']);
        $("#text_collectionname").val(rowData['COLLECTION_NAME']);
        $("#text_collectionkeyword").val(rowData['COLLECTIONKEYWORD']);
        $("#text_description").val(rowData['DESCRIPTION']);
        var selectedValuesSubTest = rowData["SUBCATEGORY"].split(',');
        $('#text_subcategory').val(selectedValuesSubTest).trigger("change");
        $('#activeswichonoff').prop('checked', ($(rowData['ISACTIVE']).html() == 'Yes') ? $('#activeswichonoff').bootstrapToggle('on') : $('#activeswichonoff').bootstrapToggle('off'));
        CollectionView.showTitlePermissionWise(oper);
    },
    showTitlePermissionWise: function (oper) {

        if (oper == 'edit' || oper == 'add') {
            $("#btn_collection_Csave").show();
            $("#inputItemImage").show();
            $("#inputItemWebImage").show();

        }
        else {
            if ($("#btn_collection_Csave").length > 0) {
                $("#btn_collection_Csave").hide();
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
        //$('#ItemimgError').hide();
        //$('#ItemimgError').html("");

        //if ($('#imgcollectionimg').attr('src') == '') {
        //    $('#ItemimgError').show();
        //    $('#ItemimgError').html("This field is required.");
        //    isValid = false;

        //}
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
        CollectionView.variables.Oper = 'Add';
        CollectionView.variables.addedit = "added";
        CollectionView.variables.CollectionId = $("#hdncollectdetails").val();

        if (CollectionView.variables.CollectionId != "0" && parseInt(CollectionView.variables.CollectionId) > 0) {
            CollectionView.variables.Oper = 'Edit';
            CollectionView.variables.addedit = 'updated';
        }

        if ($(".collectionswitch > div").hasClass('off')) {
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

            "COLLECTION_ID": CollectionView.variables.CollectionId,
            "oper": CollectionView.variables.Oper,
            "DESIGNCODE": $("#text_designno").val(),
            "COLLECTION_NAME": $("#text_collectionname").val(),
            "COLLECTIONKEYWORD": $("#text_collectionkeyword").val(),
            "DISPLAY_ORDER": $("#text_displayorder").val(),
            "SUBCATEGORYID": subcategorymulti.join(","),
            "ISACTIVE": activetoggle,
            "DESCRIPTION": $("#text_description").val(),

        }

        CollectionView.savedata(data, CollectionView.variables.Oper);
    },

    savedata: function (data, oper) {

        var originalfile = '';
        var newfile = '';
        var originalipad = '';
        var newipad = '';
        var originalweb = '';
        var newweb = '';
        var foldername = 'B2CCollection/MobileImage';
        var folderWebname = 'B2CCollection/WebImage';

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
            data: { originalfile: originalfile, newfile: newfile, oper: CollectionView.variables.Oper, isResize: false, module: foldername },
            success: function (result) {
                data.MOBILEPICTURE = result;
                $.ajax({
                    type: 'POST',
                    async: false,
                    cache: false,
                    url: getDomain() + "/Common/SaveSingleImage",
                    data: { originalfile: originalweb, newfile: newweb, oper: CollectionView.variables.Oper, isResize: false, module: folderWebname },
                    success: function (result) {
                                data.WEBPICTURE = result;
                                $.ajax({
                                    url: getDomain() + CollectionView.variables.PerformMasterOperationUrl,
                                    data: data,
                                    async: true,
                                    cache: false,
                                    type: 'POST',
                                    success: CollectionView.btnMasterSubmitOnSuccess,
                                    error: OnError,
                                });
                          
                    },
                    error: OnError
                });
            },
        });
    },
    deleteRow: function (id) {
        var rowData = jQuery("#table_list_collectiondetails").getRowData(id);
        var originalfile = getDomain() + $(rowData['MOBILEPICTURE']).attr('src');
        var webfile = getDomain() + $(rowData['WEBPICTURE']).attr('src');
        $.confirm({
            'title': 'Delete Collection Details',
            'message': 'You are about to delete this Collection Detail. It can not be restored at a later time! Continue? ',
            'buttons': {
                'Yes': {
                    'class': 'yes',
                    'action': function () {
                        $.ajax({
                            type: 'POST',
                            async: false,
                            cache: false,
                            url: getDomain() + "/Common/SaveSingleImage",
                            data: { originalfile: originalfile, newfile: originalfile, oper: 'Delete', isResize: false, module: 'B2CCollection/MobileImage' },
                            success: function (result) {
                                $.ajax({
                                    type: 'POST',
                                    async: false,
                                    cache: false,
                                    url: getDomain() + "/Common/SaveSingleImage",
                                    data: { originalfile: webfile, newfile: webfile, oper: 'Delete', isResize: false, module: 'B2CCollection/WebImage' },
                                    success: function (result) {
                                        $.ajax({
                                            url: getDomain() + CollectionView.variables.PerformMasterOperationUrl,
                                            data: {
                                                COLLECTION_ID: id,
                                                oper: 'delete'
                                            },
                                            async: true,
                                            cache: false,
                                            type: 'POST',
                                            success: function (result) {
                                                if ($(result).find('RESPONSECODE').text() == "0") {
                                                    notificationMessage('Delete Operation', 'Record is deleted successfully', 'success');
                                                    $("#table_list_collectiondetails").trigger("reloadGrid", [{ current: true }]);
                                                }
                                                else
                                                    notificationMessage('Error', $(result).find('RESPONSEMESSAGE').text(), 'error');
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
            if (CollectionView.variables.Oper == 'Delete') {
                OperationMessage("", 'Collection deleted successfully', 'success');
            } else {
                OperationMessage("", 'Collection Details saved successfully', 'success');
                $('#editcollectiondetails').hide();
                $('#viewcollectiondetails').show();

            }
            CollectionView.ClearValues();
            $("#table_list_collectiondetails").trigger("reloadGrid", [{ current: true }]);
        }
        else {
            InvalidResponseCode(data);
        }

    },

    ClearValues: function () {
        $("#hdncollectdetails").val("");
        $("#text_designno").val("");
        $("#text_collectionimg").val("");
        $("#text_displayorder").val("");
        $("#text_collectionname").val("");
        $("#text_collectionkeyword").val("");
        $("#text_description").val("");
        $("#text_subcategory").val("");
        $('#ItemimgPreview').attr('src', '/Content/images/upimg.png');
        $('#ItemimgPreview').data('oldurl', '');
        $('#ItemimgWebPreview').attr('src', '/Content/images/upimg.png');
        $('#ItemimgWebPreview').data('oldurl', '');
        $('#activeswichonoff').bootstrapToggle('off');
        $("#text_displayorder-error").hide();
        $("#formcollectione").validate().resetForm();
        $("#ItemimgError").hide();
        $('#editcollectiondetails').hide();
        $('#viewcollectiondetails').show();

    },
}

$(document).ready(function () {
    CollectionView.initializeJqgrid();
   
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
    $("#btnAddNewcollecion").click(function () {
        CollectionView.ClearValues();
        $('#editcollectiondetails').show();
        $('#viewcollectiondetails').hide();
        BindDropdown('text_subcategory', 'SubCategoryDropdownList', "/Common/BindMastersDetails?ServiceName=SUBCATEGORY_GET&ColumnRequested=CATSUBCATEGORY,ID&sidx=CATEGORY&sord=asc&IsRecordAll=true", '');
    });
    $("#btn_woman_cancle").click(function () {

        CollectionView.ClearValues();
    });
    $("#btn_collection_Csave").click(function () {
        if ($("#text_designno").val() == "" && $("#text_subcategory").val() == "" && $("#text_collectionkeyword").val() == "") {
            notificationMessage('Please Enter Design No, Subcategory or Keyword', '', 'warning');
        } else {
            CollectionView.btnMasterSubmit();
        }
    });
    RegisterFileUpload('inputItemImage', 'ItemimgPreview', "#ItemimgError");
    RegisterFileUpload('inputItemWebImage', 'ItemimgWebPreview', "#ItemimgWebError");
  
});