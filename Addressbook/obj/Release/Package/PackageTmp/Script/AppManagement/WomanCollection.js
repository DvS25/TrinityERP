//===============================Woman's collection===================================================
var WomanCollectionView = {
    variables: {
        BindGroupListUrl: "/Common/BindMastersDetails?ServiceName=APP_WOMAN_COLLECTION_GET",
        PerformMasterOperationUrl: "/Common/OpeartionsOnMaster?ServiceName=APP_WOMAN_COLLECTION_CRUD",
        Oper: 'Add',
        addedit: "added",
        WomanId: ""
    },
   
    //====Bind PartnerProfile on pageload===========================================================//    
    initializeJqgrid: function () {

        colNames = ['Woman Id', 'Collection Name', 'Collection Keyword', 'Picture', 'Design No', 'Sub CategoryID', 'Sub Category', 'Display Order', 'Is Active', 'Ipad Picture','B2B Web'],
        colModel = [
                    { name: "WOMAN_COLLECTION_ID", index: "WOMAN_COLLECTION_ID", xmlmap: xmlvars.common_colmap + "WOMAN_COLLECTION_ID", search: false, searchoptions: jqGridVariables.stringSearchOption, hidden: true },
                    { name: "COLLECTION_NAME", index: "COLLECTION_NAME", width: 12, xmlmap: xmlvars.common_colmap + "COLLECTION_NAME", search: true, searchoptions: jqGridVariables.stringSearchOption, hidden: false },
                    { name: "COLLECTIONKEYWORD", index: "COLLECTIONKEYWORD", xmlmap: xmlvars.common_colmap + "COLLECTIONKEYWORD", width: 12, search: false, hidden: false },
                    { name: "PICTURE", width: 8, index: "PICTURE", xmlmap: xmlvars.common_colmap + "PICTURE", sortable: false, search: false,align: "center", formatter: imageFormat, unformat: imageUnFormat},
                    { name: "DESIGNCODE", width: 15, index: "DESIGNCODE", xmlmap: xmlvars.common_colmap + "DESIGNCODE", search: true, searchoptions: jqGridVariables.stringSearchOption, hidden: false },
                    { name: "SUBCATEGORYID", index: "SUBCATEGORYID", xmlmap: xmlvars.common_colmap + "SUBCATEGORYID", search: false, hidden: true },
                    { name: "SUBCATEGORYNAME", width: 28, index: "SUBCATEGORYNAME", xmlmap: xmlvars.common_colmap + "SUBCATEGORYNAME", hidden: false, search: false, searchoptions: jqGridVariables.stringSearchOption },
                    { name: "DISPLAY_ORDER", index: "DISPLAY_ORDER", xmlmap: xmlvars.common_colmap + "DISPLAY_ORDER", width: 10, align: "center", search: false, hidden: false },
                    { name: "ISACTIVE", index: "ISACTIVE", xmlmap: xmlvars.common_colmap + "ISACTIVE", width: 10, align: "center", formatter: function (cv, op, ro) { return jqGridVariables.chkFmatter(cv, op, ro, 'WomanCollectionView') }, search: false },
                    { name: "IPADPICTURE", index: "IPADPICTURE", xmlmap: xmlvars.common_colmap + "IPADPICTURE", search: false, formatter: imageIpadFormat, unformat: imageIpadUnFormat, hidden: true },
                    { name: "B2BWEBPICTURE", index: "B2BWEBPICTURE", xmlmap: xmlvars.common_colmap + "B2BWEBPICTURE", search: false, formatter: imageB2BWebFormat, unformat: imageB2BWebUnFormat, hidden: true },
                    
        ];
        if (isU()) {
            colNames.push('Edit');
            colModel.push({ name: 'edit', index: 'edit', width: 5, sortable: false, align: "center", search: false, formatter: function (cv, op, ro) { return jqGridVariables.editBtnFmatter(cv, op, ro, 'WomanCollectionView', 'edit') } });
        } else if (isV()) {
            colNames.push('Edit');
            colModel.push({ name: 'edit', index: 'edit', width: 5, sortable: false, align: "center", search: false, formatter: function (cv, op, ro) { return jqGridVariables.editBtnFmatter(cv, op, ro, 'WomanCollectionView', 'view') } });
        }
        if (isD()) {
            colNames.push('Delete');
            colModel.push({ name: 'act', index: 'act', width: 5, sortable: false, align: "center", search: false, formatter: function (cv, op, ro) { return jqGridVariables.deleteBtnFmatter(cv, op, ro, 'WomanCollectionView') } });
        }
        function imageFormat(cellvalue, options, rowObject) {
            return '<img style="width:25px !important; height=35px !important;" src="' + getDomain() + '/UploadFiles/WomanCollection/MobileImage/' + cellvalue + '" />';
        }
        function imageUnFormat(cellvalue, options, cell) {
            return $('img', cell).attr('#inputItemImage');
        }
        function imageIpadFormat(cellvalue, options, rowObject) {
            return '<img style="width:25px !important; height=35px !important;" src="' + getDomain() + '/UploadFiles/WomanCollection/IpadImage/' + cellvalue + '" />';
        }
        function imageIpadUnFormat(cellvalue, options, cell) {
            return $('img', cell).attr('#inputItemImage');
        }
        function imageB2BWebFormat(cellvalue, options, rowObject) {
            return '<img style="width:25px !important; height=35px !important;" src="' + getDomain() + '/UploadFiles/WomanCollection/B2BWebImage/' + cellvalue + '" />';
        }
        function imageB2BWebUnFormat(cellvalue, options, cell) {
            return $('img', cell).attr('#inputItemImage');
        }

        $("#table_list_Womandetails").jqGrid({

            url: getDomain() + WomanCollectionView.variables.BindGroupListUrl,
            datatype: "xml",
            height: '100%',
            autowidth: true,
            shrinkToFit: true,
            rowNum: 25,
            rowList: [25, 50, 100],
            colNames: colNames,
            colModel: colModel,
            pager: "#pager_list_Womandetails",
            xmlReader: {
                root: xmlvars.common_root,
                row: xmlvars.common_row,
                page: xmlvars.common_response + "CURRENTPAGE",
                total: xmlvars.common_response + "TOTALPAGES",
                records: xmlvars.common_response + "TOTALRECORDS",
                repeatitems: false,
                id: "WOMAN_COLLECTION_ID"
            },
            loadComplete: function () {
                $("tr.jqgrow:even").addClass('myAltRowClass');
                $("#table_list_Womandetails").jqGrid('setGridHeight', $(window).innerHeight() - 230 - ($("#gbox_table_list_Womandetails").height() - $('#gbox_table_list_Womandetails .ui-jqgrid-bdiv').height()));

                // Hide column headers and top pager if no records were returned
                if ($('#table_list_Womandetails').getGridParam('records') == 0)
                    $('.ui-jqgrid-htable').hide();
                else
                    $('.ui-jqgrid-htable').show();

                var width = $('#jqGrid_Womanndetails').width();
                if (width <= 430) {
                    width = 595;
                }
                $('#table_list_Womandetails').setGridWidth(width);

            },
            loadError: OnJqloadError,
            beforeProcessing: OnJqbeforeProcessingErrorcheck,
            viewrecords: true,
            hidegrid: false,
            sortname: 'DISPLAY_ORDER',
            sortorder: 'desc',
        });

        // Setup buttons
        $("#table_list_Womandetails").jqGrid('navGrid', '#pager_list_Womandetails',
            { edit: false, add: false, del: false, search: true },
            { height: 320 }
    );
        $("#pager_list_Womandetails_left").css("width", "");
        AlignJqGridHeader('table_list_Womandetails', ['edit', 'act', 'DISPLAY_ORDER', 'ISACTIVE','PICTURE']);

    },

    triggerId: function (id, oper) {
        var rowData = jQuery("#table_list_Womandetails").getRowData(id);
        $("#hdnwomancollectdetails").val(id);
        $('#editwomandetails').show();
        $('#viewwomandetails').hide();
        BindDropdown('text_subcategory', 'SubCategoryDropdownList', "/Common/BindMastersDetails?ServiceName=SUBCATEGORY_GET&ColumnRequested=CATSUBCATEGORY,ID&sidx=CATEGORY&sord=asc&IsRecordAll=true", '');
        $("#text_designno").val(rowData['DESIGNCODE']);
        $('#ItemimgPreview').attr('src', $(rowData['PICTURE']).attr('src'))
        $('#ItemimgPreview').data('oldurl', $(rowData['PICTURE']).attr('src'));
        $('#ItemimgIpadPreview').attr('src', $(rowData['IPADPICTURE']).attr('src'))
        $('#ItemimgIpadPreview').data('oldurl', $(rowData['IPADPICTURE']).attr('src')); 
        $('#ItemimgB2BWebPreview').attr('src', $(rowData['B2BWEBPICTURE']).attr('src'))
        $('#ItemimgB2BWebPreview').data('oldurl', $(rowData['B2BWEBPICTURE']).attr('src'));
        $("#text_displayorder").val(rowData['DISPLAY_ORDER']);
        $("#text_collectionname").val(rowData['COLLECTION_NAME']); 
        $("#text_collectionkeyword").val(rowData['COLLECTIONKEYWORD']);
        var selectedValuesSubTest = rowData["SUBCATEGORYID"].split(',');
        $('#text_subcategory').val(selectedValuesSubTest).trigger("change");
        $('#activeswichonoff').prop('checked', ($(rowData['ISACTIVE']).html() == 'Yes') ? $('#activeswichonoff').bootstrapToggle('on') : $('#activeswichonoff').bootstrapToggle('off'));
        WomanCollectionView.showTitlePermissionWise(oper);
    },
    showTitlePermissionWise: function (oper) {

        if (oper == 'edit' || oper == 'add') {
            $("#btn_collection_Csave").show();
            $("#inputItemImage").show();
            $("#inputItemIpadImage").show();
            $("#inputItemB2BWebImage").show();
            
        }
        else {
            if ($("#btn_collection_Csave").length > 0) {
                $("#btn_collection_Csave").hide();
            }
            if ($("#inputItemImage").length > 0) {
                $("#inputItemImage").hide();
            }
            if ($("#inputItemIpadImage").length > 0) {
                $("#inputItemIpadImage").hide();
            }
            if ($("#inputItemB2BWebImage").length > 0) {
                $("#inputItemB2BWebImage").hide();
            }
        }
    },
    btnMasterSubmit: function () {
        
        var isValid = $("#formwomancollectione").valid();
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
        if ($('#ItemimgIpadPreview').attr('src') == '/Content/images/upimg.png') {
            $('#ItemimgIpadError').show();
            $('#ItemimgIpadError').html("This field is required.");
            isValid = false;
        }
        if ($('#ItemimgB2BWebPreview').attr('src') == '/Content/images/upimg.png') {
            $('#ItemimgB2BWebError').show();
            $('#ItemimgB2BWebError').html("This field is required.");
            isValid = false;
        }
        if (!isValid)
            return;
        WomanCollectionView.variables.Oper = 'Add';
        WomanCollectionView.variables.addedit = "added";
        WomanCollectionView.variables.WomanId = $("#hdnwomancollectdetails").val();

        if (WomanCollectionView.variables.WomanId != "0" && parseInt(WomanCollectionView.variables.WomanId) > 0) {
            WomanCollectionView.variables.Oper = 'Edit';
            WomanCollectionView.variables.addedit = 'updated';
        }

        if ($("#activeswichonoff").prop("checked") == true) {

            activetoggle = "1";

        } else {
            activetoggle = "0";
        }
        var subcategorymulti = [];
        $.each($(".mutisubcategory option:selected"), function () {            
            subcategorymulti.push($(this).val());
        });


        var data = {

            "WOMAN_COLLECTION_ID": WomanCollectionView.variables.WomanId,
            "oper": WomanCollectionView.variables.Oper,
            "DESIGNCODE": $("#text_designno").val(),
            "COLLECTION_NAME": $("#text_collectionname").val(),
            "COLLECTIONKEYWORD" : $("#text_collectionkeyword").val(),
            "DISPLAY_ORDER": $("#text_displayorder").val(),
            "SUBCATEGORYID": subcategorymulti.join(","),
            "ISACTIVE": activetoggle,

        }
       
        WomanCollectionView.savedata(data, WomanCollectionView.variables.Oper);
    },

    savedata: function (data, oper) {

        //$.ajax({

        //    type: 'POST',
        //    async: false,
        //    cache: false,
        //    url: getDomain() + "/Common/SaveImage",
        //    data: {
        //        category: 'WomanCollection',
        //        deletedfiles: '',
        //        savefiles: ServiceImage
        //    },
        //    success: function (result) {

                //$.ajax({

                //    url: getDomain() + WomanCollectionView.variables.PerformMasterOperationUrl,
                //    data: data,
                //    async: true,
                //    cache: false,
                //    type: 'POST',
                //    success: WomanCollectionView.btnMasterSubmitOnSuccess,
                //    error: OnError,
                //});

        //    },
        //    error: OnError
        //});

        var originalfile = '';
        var newfile = '';
        var originalipad = '';
        var newipad = '';
        var originalb2bweb = '';
        var newb2bweb = '';
        var foldername = 'WomanCollection/MobileImage';
        var folderIpadname = 'WomanCollection/IpadImage';
        var folderB2BWebname = 'WomanCollection/B2BWebImage';

        if (oper == 'Delete') {
            originalfile = $('#hdnImagePath').data('oldurl');
            newfile = $("#hdnImagePath").val();
            originalipad = $("#hdnIpadPath").data('oldurl');
            newipad = $("#hdnIpadPath").val();
            originalb2bweb = $("#hdnB2BWebPath").data('oldurl');
            newb2bweb = $("#hdnB2BWebPath").val();
        }
        else {
            originalfile = $('#ItemimgPreview').data('oldurl');
            newfile = $('#ItemimgPreview').attr('src');
            originalipad = $("#ItemimgIpadPreview").data('oldurl');
            newipad = $("#ItemimgIpadPreview").attr('src');
            originalb2bweb = $("#ItemimgB2BWebPreview").data('oldurl');
            newb2bweb = $("#ItemimgB2BWebPreview").attr('src');
        }
        $.ajax({
            type: 'POST',
            async: false,
            cache: false,
            url: getDomain() + "/Common/SaveSingleImage",
            data: { originalfile: originalfile, newfile: newfile, oper: WomanCollectionView.variables.Oper, isResize: false, module: foldername },
            success: function (result) {
                data.PICTURE = result;
                $.ajax({
                    type: 'POST',
                    async: false,
                    cache: false,
                    url: getDomain() + "/Common/SaveSingleImage",
                    data: { originalfile: originalipad, newfile: newipad, oper: WomanCollectionView.variables.Oper, isResize: false, module: folderIpadname },
                    success: function (result) {
                        data.IPADPICTURE = result;
                                $.ajax({
                                    type: 'POST',
                                    async: false,
                                    cache: false,
                                    url: getDomain() + "/Common/SaveSingleImage",
                                    data: { originalfile: originalb2bweb, newfile: newb2bweb, oper: WomanCollectionView.variables.Oper, isResize: false, module: folderB2BWebname },
                                    success:function (result) {
                                        data.B2BWEBPICTURE = result;
                                        $.ajax({
                                            url: getDomain() + WomanCollectionView.variables.PerformMasterOperationUrl,
                                            data: data,
                                            async: true,
                                            cache: false,
                                            type: 'POST',
                                            success: WomanCollectionView.btnMasterSubmitOnSuccess,
                                            error: OnError,
                                        });
                                    },
                                });
                                error: OnError
                            },
                    error: OnError
                });
            },
            error: OnError
        });
    },
    deleteRow: function (id) {
        var rowData = jQuery("#table_list_Womandetails").getRowData(id);
        var originalfile = getDomain() + $(rowData['PICTURE']).attr('src');
        var ipadfile = getDomain() + $(rowData['IPADPICTURE']).attr('src');
        var b2bwebfile = getDomain() + $(rowData['B2BWEBPICTURE']).attr('src');
        $.confirm({
            'title': 'Delete Party Details',
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
                            data: { originalfile: originalfile, newfile: originalfile, oper: 'Delete', isResize: false, module: 'HomeBottomSlide/MobileImage' },
                            success: function (result) {
                                $.ajax({
                                    type: 'POST',
                                    async: false,
                                    cache: false,
                                    url: getDomain() + "/Common/SaveSingleImage",
                                    data: { originalfile: ipadfile, newfile: ipadfile, oper: 'Delete', isResize: false, module: 'HomeBottomSlide/IpadImage' },
                                    success: function (result) {
                                        $.ajax({
                                            type: 'POST',
                                            async: false,
                                            cache: false,
                                            url: getDomain() + "/Common/SaveSingleImage",
                                            data: { originalfile: b2bwebfile, newfile: b2bwebfile, oper: 'Delete', isResize: false, module: 'HomeBottomSlide/B2BWebImage' },
                                            success: function (result) {
                                                $.ajax({
                                                    url: getDomain() + WomanCollectionView.variables.PerformMasterOperationUrl,
                                                    data: {
                                                        WOMAN_COLLECTION_ID: id,
                                                        oper: 'delete'
                                                    },
                                                    async: true,
                                                    cache: false,
                                                    type: 'POST',
                                                    success: function (result) {
                                                        if ($(result).find('RESPONSECODE').text() == "0") {
                                                            notificationMessage('Delete Operation', 'Record is deleted successfully', 'success');
                                                            $("#table_list_Womandetails").trigger("reloadGrid", [{ current: true }]);
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
            if (WomanCollectionView.variables.Oper == 'Delete') {
                OperationMessage("", 'Collection deleted successfully', 'success');
            } else {
                OperationMessage("", 'Collection Details saved successfully', 'success');
                $('#editwomandetails').hide();
                $('#viewwomandetails').show();

            }
            WomanCollectionView.ClearValues();
            $("#table_list_Womandetails").trigger("reloadGrid", [{ current: true }]);
        }
        else {
            InvalidResponseCode(data);
        }
        
    },

    ClearValues: function () {
        $("#hdnwomancollectdetails").val("");
        $("#text_designno").val("");
        $("#text_collectionimg").val("");
        $("#text_displayorder").val("");
        $("#text_collectionname").val("");
        $("#text_collectionkeyword").val("");
        $("#text_subcategory").val("");
        $('#ItemimgPreview').attr('src', '/Content/images/upimg.png');
        $('#ItemimgPreview').data('oldurl', '');
        $('#ItemimgIpadPreview').attr('src', '/Content/images/upimg.png');
        $('#ItemimgB2BWebPreview').data('oldurl', '');
        $('#ItemimgB2BWebPreview').attr('src', '/Content/images/upimg.png');
        $('#ItemimgIpadPreview').data('oldurl', '');
        $('#activeswichonoff').bootstrapToggle('off');
        $("#text_displayorder-error").hide();
        $("#ItemimgIpadError").hide();
        $("#ItemimgError").hide();
        $('#editwomandetails').hide();
        $('#viewwomandetails').show();

    },
}

//==============================Home Bottom Slider =================================

var HomeSliderView = {
    variables: {
        BindGroupListUrl: "/Common/BindMastersDetails?ServiceName=HOMEBOTTOMSLIDER_GET",
        PerformMasterOperationUrl: "/Common/OpeartionsOnMaster?ServiceName=HOMEBOTTOMSLIDER_CRUD",
        Oper: 'Add',
        addedit: "added",
        HomeId: ""
    },

    //====Bind PartnerProfile on pageload===========================================================//    
    initializeJqgrid: function () {

        colNames = ['Slider Id', 'Mobile Image', 'Ipad Image','B2BWeb Image'],
        colModel = [
                    { name: "HOMEID", index: "HOMEID", xmlmap: xmlvars.common_colmap + "HOMEID", search: false, searchoptions: jqGridVariables.stringSearchOption, hidden: true },
                    { name: "MOBILEIMAGE", width: 20, index: "MOBILEIMAGE", xmlmap: xmlvars.common_colmap + "MOBILEIMAGE", sortable: false, search: false, formatter: imageFormat, unformat: imageUnFormat, hidden: false },
                    { name: "IPADIMAGE", width: 20, index: "IPADIMAGE", xmlmap: xmlvars.common_colmap + "IPADIMAGE", sortable: false, search: false, formatter: imageIpadFormat, unformat: imageIpadUnFormat },
                    { name: "B2BWEBIMAGE", width: 45, index: "B2BWEBIMAGE", xmlmap: xmlvars.common_colmap + "B2BWEBIMAGE", search: false, formatter: imageB2BWebFormat, unformat: imageB2BWebUnFormat, hidden: false },
        ];
        if (isU()) {
            colNames.push('Edit');
            colModel.push({ name: 'edit', index: 'edit', width: 5, sortable: false, align: "center", search: false, formatter: function (cv, op, ro) { return jqGridVariables.editBtnFmatter(cv, op, ro, 'HomeSliderView', 'edit') } });
        } else if (isV()) {
            colNames.push('Edit');
            colModel.push({ name: 'edit', index: 'edit', width: 5, sortable: false, align: "center", search: false, formatter: function (cv, op, ro) { return jqGridVariables.editBtnFmatter(cv, op, ro, 'HomeSliderView', 'view') } });
        }
        if (isD()) {
            colNames.push('Delete');
            colModel.push({ name: 'act', index: 'act', width: 10, sortable: false, align: "center", search: false, formatter: function (cv, op, ro) { return jqGridVariables.deleteBtnFmatter(cv, op, ro, 'HomeSliderView') } });
        }
        function imageFormat(cellvalue, options, rowObject) {
            return '<img style="width:35px !important; height=35px !important;" src="' + getDomain() + '/UploadFiles/HomeBottomSlide/MobileImage/' + cellvalue + '" />';
        }
        function imageUnFormat(cellvalue, options, cell) {
            return $('img', cell).attr('#inputItemhomeImage');
        }
        function imageIpadFormat(cellvalue, options, rowObject) {
            return '<img style="width:30px !important; height=30px !important;" src="' + getDomain() + '/UploadFiles/HomeBottomSlide/IpadImage/' + cellvalue + '" />';
        }
        function imageIpadUnFormat(cellvalue, options, cell) {
            return $('img', cell).attr('#inputItemhomeImage');
        }
        function imageB2BWebFormat(cellvalue, options, rowObject) {
            return '<img style="width:30px !important; height=30px !important;" src="' + getDomain() + '/UploadFiles/HomeBottomSlide/B2BWebImage/' + cellvalue + '" />';
        }
        function imageB2BWebUnFormat(cellvalue, options, cell) {
            return $('img', cell).attr('#inputItemImage');
        }
        $("#table_list_Homeslider").jqGrid({
            url: getDomain() + HomeSliderView.variables.BindGroupListUrl,
            datatype: "xml",
            height: '100%',
            autowidth: true,
            shrinkToFit: true,
            rowNum: 25,
            rowList: [25, 50, 100],
            colNames: colNames,
            colModel: colModel,
            pager: "#pager_list_Homeslider",
            xmlReader: {
                root: xmlvars.common_root,
                row: xmlvars.common_row,
                page: xmlvars.common_response + "CURRENTPAGE",
                total: xmlvars.common_response + "TOTALPAGES",
                records: xmlvars.common_response + "TOTALRECORDS",
                repeatitems: false,
                id: "HOMEID"
            },
            loadComplete: function () {
                $("tr.jqgrow:even").addClass('myAltRowClass');
                $("#table_list_Homeslider").jqGrid('setGridHeight', $(window).innerHeight() - 230 - ($("#gbox_table_list_Homeslider").height() - $('#gbox_table_list_Homeslider .ui-jqgrid-bdiv').height()));

                // Hide column headers and top pager if no records were returned
                if ($('#table_list_Homeslider').getGridParam('records') == 0)
                    $('.ui-jqgrid-htable').hide();
                else
                    $('.ui-jqgrid-htable').show();

                var width = $('#jqGrid_Homeslider').width();
                if (width <= 430) {
                    width = 595;
                }
                $('#table_list_Homeslider').setGridWidth(width);

            },
            loadError: OnJqloadError,
            beforeProcessing: OnJqbeforeProcessingErrorcheck,
            viewrecords: true,
            hidegrid: false,
            sortname: 'HOMEID',
            sortorder: 'desc',
        });

        // Setup buttons
        $("#table_list_Homeslider").jqGrid('navGrid', '#pager_list_Homeslider',
            { edit: false, add: false, del: false, search: false },
            { height: 320 }
    );
        $("#pager_list_Homeslider_left").css("width", "");
        AlignJqGridHeader('table_list_Homeslider', ['edit', 'act']);

    },

    triggerId: function (id, oper) {
        var rowData = jQuery("#table_list_Homeslider").getRowData(id);
        $("#hdnhomedetails").val(id);
        $('#edithomedetails').show();
        $('#viewhomedetails').hide();
        $('#ItemimgHomePreview').attr('src', $(rowData['MOBILEIMAGE']).attr('src'))
        $('#ItemimgHomePreview').data('oldurl', $(rowData['MOBILEIMAGE']).attr('src'));
        $('#ItemimgHomeIpadPreview').attr('src', $(rowData['IPADIMAGE']).attr('src'))
        $('#ItemimgHomeIpadPreview').data('oldurl', $(rowData['IPADIMAGE']).attr('src'));
        $('#ItemimgHomeB2BWebPreview').attr('src', $(rowData['B2BWEBIMAGE']).attr('src'))
        $('#ItemimgHomeB2BWebPreview').data('oldurl', $(rowData['B2BWEBIMAGE']).attr('src'));
        HomeSliderView.showTitlePermissionWise(oper);
    },
    showTitlePermissionWise: function (oper) {

        if (oper == 'edit' || oper == 'add') {
            $("#btn_home_Csave").show();
            $("#inputItemhomeImage").show();
            $("#inputItemhomeIpadImage").show();
            $("#inputItemHomeB2BWebImage").show();
        }
        else {
            if ($("#btn_home_Csave").length > 0) {
                $("#btn_home_Csave").hide();
            }
            if ($("#inputItemhomeImage").length > 0) {
                $("#inputItemhomeImage").hide();
            }
            if ($("#inputItemhomeIpadImage").length > 0) {
                $("#inputItemhomeIpadImage").hide();
            }
            if ($("#inputItemHomeB2BWebImage").length > 0) {
                $("#inputItemHomeB2BWebImage").hide();
            }
        }
    },
    btnMasterSubmit: function () {

        var isValid = $("#formhomeslider").valid();
        if ($('#ItemimgHomePreview').attr('src') == '/Content/images/upimg.png') {
            $('#ItemimghomeError').show();
            $('#ItemimghomeError').html("This field is required.");
            isValid = false;
        }
        if ($('#ItemimgHomeIpadPreview').attr('src') == '/Content/images/upimg.png') {
            $('#ItemimgIpadhomeError').show();
            $('#ItemimgIpadhomeError').html("This field is required.");
            isValid = false;
        }
        if ($('#ItemimgHomeB2BWebPreview').attr('src') == '/Content/images/upimg.png') {
            $('#ItemimgB2BWebHomeError').show();
            $('#ItemimgB2BWebHomeError').html("This field is required.");
            isValid = false;
        }
        if (!isValid)
            return;
        HomeSliderView.variables.Oper = 'Add';
        HomeSliderView.variables.addedit = "added";
        HomeSliderView.variables.HomeId = $("#hdnhomedetails").val();

        if (HomeSliderView.variables.HomeId != "0" && parseInt(HomeSliderView.variables.HomeId) > 0) {
            HomeSliderView.variables.Oper = 'Edit';
            HomeSliderView.variables.addedit = 'updated';
        }
        var data = {

            "HOMEID": HomeSliderView.variables.HomeId,
            "oper": HomeSliderView.variables.Oper,
        }

        HomeSliderView.savedata(data, HomeSliderView.variables.Oper);
    },

    savedata: function (data, oper) {
        var originalfile = '';
        var newfile = '';
        var originalipad = '';
        var newipad = '';
        var originalb2bweb = '';
        var newb2bweb = '';
        var foldername = 'HomeBottomSlide/MobileImage';
        var folderIpadname = 'HomeBottomSlide/IpadImage';
        var folderB2BWebname = 'HomeBottomSlide/B2BWebImage';

        if (oper == 'Delete') {
            originalfile = $('#hdnhomeImagePath').data('oldurl');
            newfile = $("#hdnhomeImagePath").val();
            originalipad = $("#hdnhomeIpadPath").data('oldurl');
            newipad = $("#hdnhomeIpadPath").val();
            originalb2bweb = $("#hdnhomeB2BWebPath").data('oldurl');
            newb2bweb = $("#hdnhomeB2BWebPath").val();
        }
        else {
            originalfile = $('#ItemimgHomePreview').data('oldurl');
            newfile = $('#ItemimgHomePreview').attr('src');
            originalipad = $("#ItemimgHomeIpadPreview").data('oldurl');
            newipad = $("#ItemimgHomeIpadPreview").attr('src');
            originalb2bweb = $("#ItemimgHomeB2BWebPreview").data('oldurl');
            newb2bweb = $("#ItemimgHomeB2BWebPreview").attr('src');
        }
        $.ajax({
            type: 'POST',
            async: false,
            cache: false,
            url: getDomain() + "/Common/SaveSingleImage",
            data: { originalfile: originalfile, newfile: newfile, oper: HomeSliderView.variables.Oper, isResize: false, module: foldername },
            success: function (result) {
                data.MOBILEIMAGE = result;
                $.ajax({
                    type: 'POST',
                    async: false,
                    cache: false,
                    url: getDomain() + "/Common/SaveSingleImage",
                    data: { originalfile: originalipad, newfile: newipad, oper: HomeSliderView.variables.Oper, isResize: false, module: folderIpadname },
                    success: function (result) {
                        data.IPADIMAGE = result;
                        $.ajax({
                            type: 'POST',
                            async: false,
                            cache: false,
                            url: getDomain() + "/Common/SaveSingleImage",
                            data: { originalfile: originalb2bweb, newfile: newb2bweb, oper: HomeSliderView.variables.Oper, isResize: false, module: folderB2BWebname },
                            success: function (result) {
                                data.B2BWEBIMAGE = result;
                                $.ajax({
                                    url: getDomain() + HomeSliderView.variables.PerformMasterOperationUrl,
                                    data: data,
                                    async: true,
                                    cache: false,
                                    type: 'POST',
                                    success: HomeSliderView.btnMasterSubmitOnSuccess,
                                    error: OnError,
                                });
                            },
                        });
                        error: OnError
                    },
                    error: OnError
                });
            },
            error: OnError
        });
    },
    deleteRow: function (id) {
        var rowData = jQuery("#table_list_Homeslider").getRowData(id);
        var originalfile = getDomain() + $(rowData['MOBILEIMAGE']).attr('src');
        var ipadfile = getDomain() + $(rowData['IPADIMAGE']).attr('src');
        var b2bwebfile = getDomain() + $(rowData['B2BWEBIMAGE']).attr('src');
        $.confirm({
            'title': 'Delete Home Slider Details',
            'message': 'You are about to delete this Home Slider Detail. It can not be restored at a later time! Continue? ',
            'buttons': {
                'Yes': {
                    'class': 'yes',
                    'action': function () {
                        $.ajax({
                            type: 'POST',
                            async: false,
                            cache: false,
                            url: getDomain() + "/Common/SaveSingleImage",
                            data: { originalfile: originalfile, newfile: originalfile, oper: 'Delete', isResize: false, module: 'HomeBottomSlide/MobileImage' },
                            success: function (result) {
                                $.ajax({
                                    type: 'POST',
                                    async: false,
                                    cache: false,
                                    url: getDomain() + "/Common/SaveSingleImage",
                                    data: { originalfile: ipadfile, newfile: ipadfile, oper: 'Delete', isResize: false, module: 'HomeBottomSlide/IpadImage' },
                                    success: function (result) {
                                        $.ajax({
                                            type: 'POST',
                                            async: false,
                                            cache: false,
                                            url: getDomain() + "/Common/SaveSingleImage",
                                            data: { originalfile: b2bwebfile, newfile: b2bwebfile, oper: 'Delete', isResize: false, module: 'HomeBottomSlide/B2BWebImage' },
                                            success: function (result) {
                                                $.ajax({
                                                    url: getDomain() + HomeSliderView.variables.PerformMasterOperationUrl,
                                                    data: {
                                                        HOMEID: id,
                                                        oper: 'delete'
                                                    },
                                                    async: true,
                                                    cache: false,
                                                    type: 'POST',
                                                    success: function (result) {
                                                        if ($(result).find('RESPONSECODE').text() == "0") {
                                                            notificationMessage('Delete Operation', 'Record is deleted successfully', 'success');
                                                            $("#table_list_Homeslider").trigger("reloadGrid", [{ current: true }]);
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
            if (HomeSliderView.variables.Oper == 'Delete') {
                OperationMessage("", 'Slider data deleted successfully', 'success');
            } else {
                OperationMessage("", 'Slider data saved successfully', 'success');
                $('#edithomedetails').hide();
                $('#viewhomedetails').show();

            }
            HomeSliderView.ClearValues();
            $("#table_list_Homeslider").trigger("reloadGrid", [{ current: true }]);
        }
        else {
            InvalidResponseCode(data);
        }

    },

    ClearValues: function () {
        $("#hdnhomedetails").val("");
        $('#ItemimgHomePreview').attr('src', '/Content/images/upimg.png');
        $('#ItemimgHomePreview').data('oldurl', '');
        $('#ItemimgHomeIpadPreview').attr('src', '/Content/images/upimg.png');
        $('#ItemimgHomeIpadPreview').data('oldurl', '');
        $('#ItemimgHomeB2BWebPreview').attr('src', '/Content/images/upimg.png');
        $('#ItemimgHomeB2BWebPreview').data('oldurl', '');
        $("#ItemimghomeError").hide();
        $("#ItemimgIpadhomeError").hide();
        $('#edithomedetails').hide();
        $('#viewhomedetails').show();

    },
}
//=============================== Annoucement ===================================================
var AnnouncementView = {
    variables: {
        BindGroupListUrl: "/Common/BindMastersDetails?ServiceName=ANNOUNCEMENT_GET",
        PerformMasterOperationUrl: "/Common/OpeartionsOnMaster?ServiceName=ANNOUNCEMENT_CRUD",
        Oper: 'Add',
        addedit: "added",
        AnnoucementId: ""
    },

    //====Bind PartnerProfile on pageload===========================================================//    
    initializeJqgrid: function () {

        colNames = ['Annoucement Id', 'Annoucement Title', 'Description', 'From Date', 'To Date'],
        colModel = [
                    { name: "ANNOUNCEMENTID", index: "ANNOUNCEMENTID",xmlmap: xmlvars.common_colmap + "ANNOUNCEMENTID", search: false, searchoptions: jqGridVariables.stringSearchOption, hidden: true },
                    { name: "ANNOUNCEMENTTITLE", index: "ANNOUNCEMENTTITLE", width: 20, xmlmap: xmlvars.common_colmap + "ANNOUNCEMENTTITLE",search: true, searchoptions: jqGridVariables.stringSearchOption, hidden: false },
                    { name: "DESCRIPTION", index: "DESCRIPTION", xmlmap: xmlvars.common_colmap + "DESCRIPTION", sortable: false, width: 60, search: false, hidden: false },
                    { name: "FROMDATE", width: 15, index: "FROMDATE", xmlmap: xmlvars.common_colmap + "FROMDATE", search: false },
                    { name: "TODATE", width: 15, index: "TODATE", xmlmap: xmlvars.common_colmap + "TODATE", search: false, searchoptions: jqGridVariables.stringSearchOption, hidden: false },
                   
        ];
        if (isU()) {
            colNames.push('Edit');
            colModel.push({ name: 'edit', index: 'edit', width: 5, sortable: false, align: "center", search: false, formatter: function (cv, op, ro) { return jqGridVariables.editBtnFmatter(cv, op, ro, 'AnnouncementView', 'edit') } });
        } else if (isV()) {
            colNames.push('Edit');
            colModel.push({ name: 'edit', index: 'edit', width: 5, sortable: false, align: "center", search: false, formatter: function (cv, op, ro) { return jqGridVariables.editBtnFmatter(cv, op, ro, 'AnnouncementView', 'view') } });
        }
        if (isD()) {
            colNames.push('Delete');
            colModel.push({ name: 'act', index: 'act', width: 5, sortable: false, align: "center", search: false, formatter: function (cv, op, ro) { return jqGridVariables.deleteBtnFmatter(cv, op, ro, 'AnnouncementView') } });
        }
       
        $("#table_list_Announcement").jqGrid({
            url: getDomain() + AnnouncementView.variables.BindGroupListUrl,
            datatype: "xml",
            height: '100%',
            autowidth: true,
            shrinkToFit: true,
            rowNum: 25,
            rowList: [25, 50, 100],
            colNames: colNames,
            colModel: colModel,
            pager: "#pager_list_Announcement",
            xmlReader: {
                root: xmlvars.common_root,
                row: xmlvars.common_row,
                page: xmlvars.common_response + "CURRENTPAGE",
                total: xmlvars.common_response + "TOTALPAGES",
                records: xmlvars.common_response + "TOTALRECORDS",
                repeatitems: false,
                id: "ANNOUNCEMENTID"
            },
            loadComplete: function () {
                $("tr.jqgrow:even").addClass('myAltRowClass');
                $("#table_list_Announcement").jqGrid('setGridHeight', $(window).innerHeight() - 230 - ($("#gbox_table_list_Announcement").height() - $('#gbox_table_list_Announcement .ui-jqgrid-bdiv').height()));

                // Hide column headers and top pager if no records were returned
                if ($('#table_list_Announcement').getGridParam('records') == 0)
                    $('.ui-jqgrid-htable').hide();
                else
                    $('.ui-jqgrid-htable').show();

                var width = $('#jqGrid_Announcementdetails').width();
                if (width <= 430) {
                    width = 595;
                }
                $('#table_list_Announcement').setGridWidth(width);

            },
            loadError: OnJqloadError,
            beforeProcessing: OnJqbeforeProcessingErrorcheck,
            viewrecords: true,
            hidegrid: false,
            sortname: 'ANNOUNCEMENTID',
            sortorder: 'desc',
        });

        // Setup buttons
        $("#table_list_Announcement").jqGrid('navGrid', '#pager_list_Announcement',
            { edit: false, add: false, del: false, search: true },
            { height: 320 }
    );
        $("#pager_list_Announcement_left").css("width", "");
        AlignJqGridHeader('table_list_Announcement', ['edit', 'act']);

    },

    triggerId: function (id, oper) {
        var rowData = jQuery("#table_list_Announcement").getRowData(id);
        $("#hdnannouncemet").val(id);
        $('#editannouncemet').show();
        $('#viewannouncemet').hide();
        $("#text_anouncetitle").val(rowData['ANNOUNCEMENTTITLE']);
        $("#text_announcedesription").val(rowData['DESCRIPTION']);
        $("#txt_fromdate").datepicker('setDate', rowData['FROMDATE']);
        $("#txt_todate").datepicker('setDate', rowData['TODATE']);
        AnnouncementView.showTitlePermissionWise(oper);
    },
    showTitlePermissionWise: function (oper) {

        if (oper == 'edit' || oper == 'add') {
            $("#btn_announcemet_Csave").show();
        }
        else {
            if ($("#btn_announcemet_Csave").length > 0) {
                $("#btn_announcemet_Csave").hide();
            }
        }
    },
    btnMasterSubmit: function () {

        var isValid = $("#formanouncement").valid();
     
        if (!isValid)
            return;
        AnnouncementView.variables.Oper = 'Add';
        AnnouncementView.variables.addedit = "added";
        AnnouncementView.variables.AnnoucementId = $("#hdnannouncemet").val();

        if (AnnouncementView.variables.AnnoucementId != "0" && parseInt(AnnouncementView.variables.AnnoucementId) > 0) {
            AnnouncementView.variables.Oper = 'Edit';
            AnnouncementView.variables.addedit = 'updated';
        }

        var data = {

            "ANNOUNCEMENTID": AnnouncementView.variables.AnnoucementId,
            "oper": AnnouncementView.variables.Oper,
            "ANNOUNCEMENTTITLE": $("#text_anouncetitle").val(),
            "DESCRIPTION": $("#text_announcedesription").val(),
            "FROMDATE": $("#txt_fromdate").val(),
            "TODATE": $("#txt_todate").val(),
        }
        AnnouncementView.savedata(data, AnnouncementView.variables.Oper);
    },

    savedata: function (data, oper) {
        $.ajax({
            url: getDomain() + AnnouncementView.variables.PerformMasterOperationUrl,
            data: data,
            async: true,
            cache: false,
            type: 'POST',
            success: AnnouncementView.btnMasterSubmitOnSuccess,
            error: OnError,
        });
    },
    deleteRow: function (id) {
        $.confirm({
            'title': 'Delete Announcement Detail',
            'message': 'You are about to delete this Announcement  Detail. It can not be restored at a later time! Continue? ',
            'buttons': {
                'Yes': {
                    'class': 'yes',
                    'action': function () {
                        $.ajax({
                            url: getDomain() + AnnouncementView.variables.PerformMasterOperationUrl,
                            data: {
                                ANNOUNCEMENTID: id,
                                oper: 'delete'
                            },
                            async: true,
                            cache: false,
                            type: 'POST',
                            success: function (result) {
                                if ($(result).find('RESPONSECODE').text() == "0") {
                                    notificationMessage('Delete Operation', 'Record is deleted successfully', 'success');
                                    $("#table_list_Announcement").trigger("reloadGrid", [{ current: true }]);
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
            if (AnnouncementView.variables.Oper == 'Delete') {
                OperationMessage("", 'Announcement deleted successfully', 'success');
            } else {
                OperationMessage("", 'Announcement Details saved successfully', 'success');
                $('#editannouncemet').hide();
                $('#viewannouncemet').show();
            }
            AnnouncementView.ClearValues();
            $("#table_list_Announcement").trigger("reloadGrid", [{ current: true }]);
        }
        if ($(data).find('RESPONSECODE').text() == "-4") {
            msg = "<div><b>Response Code:</b>-4</div>";
            msg += "<div><br /><b>Response Message:</b> " + $(data).find('RESPONSEMESSAGE').text() + "</div>";
            OperationMessage("DB Warning", msg, 'warning');
        }
        else {
            InvalidResponseCode(data);
        }
    },

    ClearValues: function () {
        $("#hdnannouncemet").val("");
        $("#text_anouncetitle").val("");
        $("#text_announcedesription").val("");
        $("#txt_fromdate").val("");
        $("#txt_todate").val("");
        $("#errortitle").hide();
        $("#errordescription").hide();
        $("#errorfromdate").hide();
        $("#errortodate").hide();
        $('#editannouncemet').hide();
        $('#viewannouncemet').show();
    },
}
$(document).ready(function () {
    //============================ Announcement ======================================================
    $("#litabannounce").click(function () {
        $("#editannouncemet").hide();
        $("#viewannouncemet").show();
        AnnouncementView.initializeJqgrid();
    });
    //$("#txt_fromdate").datepicker('setDate', "0");
    $('#txt_fromdate').datepicker({ format: 'dd M yyyy' });
    $('#txt_fromdate').on('change', function () {
        $('.datepicker').hide();
    });
  //  $("#txt_todate").datepicker('setDate', "0");
    $('#txt_todate').datepicker({ format: 'dd M yyyy' });
    $('#txt_todate').on('change', function () {
        $('.datepicker').hide();
    });
    $("#btnAddNewannouncemet").click(function () {
        AnnouncementView.ClearValues();
        $('#editannouncemet').show();
        $('#viewannouncemet').hide();
    });
    $("#btn_announcemet_cancle").click(function () {
        AnnouncementView.ClearValues();
    });
    $("#btn_announcemet_Csave").click(function () {
        if ($("#text_anouncetitle").val() == "" || $("#text_anouncetitle").val() == null) {
            $("#errortitle").show();
        }
        if ($("#text_announcedesription").val() == "" || $("#text_announcedesription").val() == null) {
            $("#errordescription").show();
        }
        if ($("#txt_fromdate").val() == "" || $("#txt_fromdate").val() == null) {
            $("#errorfromdate").show();
        }
        if ($("#txt_todate").val() == "" || $("#txt_todate").val() == null) {
            $("#errortodate").show();
        }
        if ($("#text_anouncetitle").val() != "" && $("#text_announcedesription").val() != "" && $("#txt_fromdate").val() != "" && $("#txt_todate").val() != "") {
            AnnouncementView.btnMasterSubmit();
            $("#errortitle").hide();
            $("#errordescription").hide();
            $("#errorfromdate").hide();
            $("#errortodate").hide();
        }
      
    });
    //============================Womans's Collection=================================================
    WomanCollectionView.initializeJqgrid();
    $("#litabwomans").click(function () {
        $("#editwomandetails").hide();
        $("#viewwomandetails").show();
        WomanCollectionView.initializeJqgrid();
       
    });
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
        WomanCollectionView.ClearValues();
        $('#editwomandetails').show();
        $('#viewwomandetails').hide();
        BindDropdown('text_subcategory', 'SubCategoryDropdownList', "/Common/BindMastersDetails?ServiceName=SUBCATEGORY_GET&ColumnRequested=CATSUBCATEGORY,ID&sidx=CATEGORY&sord=asc&IsRecordAll=true", '');
    });
    $("#btn_woman_cancle").click(function () {

        WomanCollectionView.ClearValues();
    });
    $("#btn_collection_Csave").click(function () {
        if ($("#text_designno").val() == "" && $("#text_subcategory").val() == "" && $("#text_collectionkeyword").val() == "") {
            notificationMessage('Please Enter Design No, Subcategory or Keyword', '', 'warning');
        } else {
            WomanCollectionView.btnMasterSubmit();
        }
    });
    RegisterFileUpload('inputItemImage', 'ItemimgPreview', "#ItemimgError");
    RegisterFileUpload('inputItemIpadImage', 'ItemimgIpadPreview', "#ItemimgIpadError");
    RegisterFileUpload('inputItemB2BWebImage', 'ItemimgB2BWebPreview', "#ItemimgB2BWebError");
    //==========================Home bottom slider=======================================

    
    $("#lithomeslider").click(function () {
        $("#edithomedetails").hide();
        $("#viewhomedetails").show();
        HomeSliderView.initializeJqgrid();
    });
    $("#btnAddNewslider").click(function () {
        HomeSliderView.ClearValues();
        $('#edithomedetails').show();
        $('#viewhomedetails').hide();

    });
    $("#btn_home_cancle").click(function () {
        HomeSliderView.ClearValues();
    })
    $("#btn_home_Csave").click(function () {

        HomeSliderView.btnMasterSubmit();
    });

    RegisterFileUpload('inputItemhomeImage', 'ItemimgHomePreview', "#ItemimghomeError");
    RegisterFileUpload('inputItemhomeIpadImage', 'ItemimgHomeIpadPreview', "#ItemimgIpadhomeError");
    RegisterFileUpload('inputItemHomeB2BWebImage', 'ItemimgHomeB2BWebPreview', "#ItemimgB2BWebHomeError");
});