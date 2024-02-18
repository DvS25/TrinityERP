var Subcategoryview_View = {
    variables: {
        BindGroupListUrl: "/Common/BindMastersDetails?ServiceName=SUBCATEGORY_GET",
        PerformMasterOperationUrl: "/Common/OpeartionsOnMaster?ServiceName=SUBCATEGORY_CRUD",
        Oper: 'Add',
        addedit: "added",
        Subcategory_Id: "",
        b2bmenushow: "",
        b2cmenushow:"",
        Is_active: "",
        Is_Ipadactive: "",
        Is_B2BWebactive: "",
        Is_B2CAppactive: "",
        Is_B2CWebactive: "",
        JQGridDynamicWidth: function (jqid, tblid, jqwidth) {
            var width = $(jqid).width();
            if (width <= 630) {
                width = 630;
            }
            if ($(window).width() > $(window).height()) {
                width = jqwidth;
            } else {
                width = 630;
            }
            $(tblid).setGridWidth(width);
        },

    },
    initializeJqgrid: function () {

        colNames = ['ID', 'Category', 'SubCategory'],
        colModel = [
                    { name: "ID", width: 4, index: "ID", xmlmap: xmlvars.common_colmap + "ID", search: false, hidden: true },
                    { name: "CATEGORY", width: 5, index: "CATEGORY", xmlmap: xmlvars.common_colmap + "CATEGORY", search: true, searchoptions: jqGridVariables.stringSearchOption },
                    { name: "SUBCATEGORY", width: 5, index: "SUBCATEGORY", xmlmap: xmlvars.common_colmap + "SUBCATEGORY", search: true, searchoptions: jqGridVariables.stringSearchOption },
                   
        ];
        colNames.push('B2B Menu Show');
        colModel.push({ name: 'B2BMENUSHOW', index: 'B2BMENUSHOW', xmlmap: xmlvars.common_colmap + "B2BMENUSHOW", width: 5, sortable: false, align: "center", search: false, hidden: false, formatter: b2bmenushowBtnFmatter });
        colNames.push('B2C Menu Show');
        colModel.push({ name: 'B2CMENUSHOW', index: 'B2CMENUSHOW', xmlmap: xmlvars.common_colmap + "B2CMENUSHOW", width: 5, sortable: false, align: "center", search: false, hidden: false, formatter: b2cmenushowBtnFmatter });
        colNames.push('B2B Mobile');
        colModel.push({ name: 'DISPLAYFORMOBILE', index: 'DISPLAYFORMOBILE', xmlmap: xmlvars.common_colmap + "DISPLAYFORMOBILE", width: 5, sortable: false, align: "center", search: false, hidden: false, formatter: ApprovalBtnFmatter });
        colNames.push('B2B IPad');
        colModel.push({ name: 'DISPLAYFORIPAD', index: 'DISPLAYFORIPAD', xmlmap: xmlvars.common_colmap + "DISPLAYFORIPAD", width: 5, sortable: false, align: "center", search: false, hidden: false, formatter: IpadApprovalBtnFmatter });
        colNames.push('B2B Web');
        colModel.push({ name: 'DISPLAYFORB2BWEB', index: 'DISPLAYFORB2BWEB', xmlmap: xmlvars.common_colmap + "DISPLAYFORB2BWEB", width: 5, sortable: false, align: "center", search: false, hidden: false, formatter: B2BWebApprovalBtnFmatter });
        colNames.push('B2C App');
        colModel.push({ name: 'DISPLAYFORB2CAPP', index: 'DISPLAYFORB2CAPP', xmlmap: xmlvars.common_colmap + "DISPLAYFORB2CAPP", width: 5, sortable: false, align: "center", search: false, hidden: false, formatter: B2CAppApprovalBtnFmatter });
        colNames.push('B2C Web');
        colModel.push({ name: 'DISPLAYFORB2CWEB', index: 'DISPLAYFORB2CWEB', xmlmap: xmlvars.common_colmap + "DISPLAYFORB2CWEB", width: 5, sortable: false, align: "center", search: false, hidden: false, formatter: B2CWebApprovalBtnFmatter });
        colNames.push('Picture');
        colModel.push({ name: 'HOMECATEGORYIMAGE', index: 'HOMECATEGORYIMAGE', xmlmap: xmlvars.common_colmap + "HOMECATEGORYIMAGE", width: 5, sortable: false, align: "center", search: false, hidden: false, formatter: imageFormat, unformat: imageUnFormat, });
        
        if (isU() || isA()) {
            colNames.push('Action');
            colModel.push({ name: '', index: '', xmlmap: xmlvars.common_colmap + "", width: 5, sortable: false, align: "left", search: false, hidden: false, formatter: imageButtonFormat });
        }
        function imageButtonFormat(cellvalue, options, rowObject) {
            return '<span class="btn btn-primary btn-file" style="font-size:10px!important;letter-spacing:1px"><input type="file" accept="image/*" name="file" id="inputItemImage' + options.rowId + '" class="file-styled uploadsubcategory"/>Upload Photo</span>';
        }
        function imageFormat(cellvalue, options, rowObject) {
            return '<img id="imgpreview' + options.rowId + '" style="width:35px !important; height=35px !important;" src="' + getDomain() + '/UploadFiles/SubCategoryHomeImage/' + cellvalue + '" />';
        }
        function imageUnFormat(cellvalue, options, cell) {
            return $('img', cell).attr('#inputItemImage');
        }
        
        function b2bmenushowBtnFmatter(cellvalue, options, rowObject, view) {
            if (isU() || isA()) {
                if (cellvalue == 1) {
                    return '<div class="checkbox" style="margin-top:0px!important"><label class="form-control-label"><input type="checkbox" class="toggleswitch active_sw" data-on="Yes" data-off="No" data-toggle="toggle" value="' + options.rowId + '"  id="b2bmenushow' + options.rowId + '" onchange=\"Subcategoryview_View.b2bmenushowBtnFmatter(' + options.rowId + ');\" checked/></label></div>';
                }
                else {

                    return '<div class="checkbox" style="margin-top:0px!important"><label class="form-control-label"><input type="checkbox" class="toggleswitch deactive_sw" data-on="Yes" data-off="No" data-toggle="toggle" value="' + options.rowId + '"  id="b2bmenushow' + options.rowId + '" onchange=\"Subcategoryview_View.b2bmenushowBtnFmatter(' + options.rowId + ');\" /></label></div>';
                }
            }
            else {
                if (cellvalue == 'FALSE' || cellvalue == '0' || cellvalue == undefined)
                    return '<span class="label label-danger" style="font-size: 100%; !important">No</span>';
                else
                    return '<span class="label label-success" style="font-size: 100%; !important">Yes</span>';
            }

        }
        function b2cmenushowBtnFmatter(cellvalue, options, rowObject, view) {
            if (isU() || isA()) {
                if (cellvalue == 1) {
                    return '<div class="checkbox" style="margin-top:0px!important"><label class="form-control-label"><input type="checkbox" class="toggleswitch active_sw" data-on="Yes" data-off="No" data-toggle="toggle" value="' + options.rowId + '"  id="b2cmenushow' + options.rowId + '" onchange=\"Subcategoryview_View.b2cmenushowBtnFmatter(' + options.rowId + ');\" checked/></label></div>';
                }
                else {

                    return '<div class="checkbox" style="margin-top:0px!important"><label class="form-control-label"><input type="checkbox" class="toggleswitch deactive_sw" data-on="Yes" data-off="No" data-toggle="toggle" value="' + options.rowId + '"  id="b2cmenushow' + options.rowId + '" onchange=\"Subcategoryview_View.b2cmenushowBtnFmatter(' + options.rowId + ');\" /></label></div>';
                }
            }
            else {
                if (cellvalue == 'FALSE' || cellvalue == '0' || cellvalue == undefined)
                    return '<span class="label label-danger" style="font-size: 100%; !important">No</span>';
                else
                    return '<span class="label label-success" style="font-size: 100%; !important">Yes</span>';
            }
        }
        function ApprovalBtnFmatter(cellvalue, options, rowObject, view) {
            if (isU() || isA()) {
                if (cellvalue == 1) {
                    return '<div class="checkbox" style="margin-top:0px!important"><label class="form-control-label"><input type="checkbox" class="toggleswitch active_sw" data-on="Yes" data-off="No" data-toggle="toggle" value="' + options.rowId + '"  id="IsActiveSwitch' + options.rowId + '" onchange=\"Subcategoryview_View.ApproveId(' + options.rowId + ');\" checked/></label></div>';
                }
                else {

                    return '<div class="checkbox" style="margin-top:0px!important"><label class="form-control-label"><input type="checkbox" class="toggleswitch deactive_sw" data-on="Yes" data-off="No" data-toggle="toggle" value="' + options.rowId + '"  id="IsActiveSwitch' + options.rowId + '" onchange=\"Subcategoryview_View.ApproveId(' + options.rowId + ');\" /></label></div>';
                }
            }
            else {
               if (cellvalue == 'FALSE' || cellvalue == '0' || cellvalue == undefined)
                    return '<span class="label label-danger" style="font-size: 100%; !important">No</span>';
               else
                    return '<span class="label label-success" style="font-size: 100%; !important">Yes</span>';
            }
          
        }
        function IpadApprovalBtnFmatter(cellvalue, options, rowObject, view) {
            if (isU() || isA()) {
                if (cellvalue == 1) {
                    return '<div class="checkbox" style="margin-top:0px!important"><label class="form-control-label"><input type="checkbox" class="toggleswitch active_sw" data-on="Yes" data-off="No" data-toggle="toggle" value="' + options.rowId + '"  id="IsActiveIpadSwitch' + options.rowId + '" onchange=\"Subcategoryview_View.ApproveIpadId(' + options.rowId + ');\" checked/></label></div>';
                }
                else {

                    return '<div class="checkbox" style="margin-top:0px!important"><label class="form-control-label"><input type="checkbox" class="toggleswitch deactive_sw" data-on="Yes" data-off="No" data-toggle="toggle" value="' + options.rowId + '"  id="IsActiveIpadSwitch' + options.rowId + '" onchange=\"Subcategoryview_View.ApproveIpadId(' + options.rowId + ');\" /></label></div>';
                }
            }
            else {
                if (cellvalue == 'FALSE' || cellvalue == '0' || cellvalue == undefined)
                    return '<span class="label label-danger" style="font-size: 100%; !important">No</span>';
                else
                    return '<span class="label label-success" style="font-size: 100%; !important">Yes</span>';
            }
        }
        function B2BWebApprovalBtnFmatter(cellvalue, options, rowObject, view) {
            if (isU() || isA()) {
                if (cellvalue == 1) {
                    return '<div class="checkbox" style="margin-top:0px!important"><label class="form-control-label"><input type="checkbox" class="toggleswitch active_sw" data-on="Yes" data-off="No" data-toggle="toggle" value="' + options.rowId + '"  id="IsActiveB2BWebSwitch' + options.rowId + '" onchange=\"Subcategoryview_View.ApproveB2BWebId(' + options.rowId + ');\" checked/></label></div>';
                }
                else {

                    return '<div class="checkbox" style="margin-top:0px!important"><label class="form-control-label"><input type="checkbox" class="toggleswitch deactive_sw" data-on="Yes" data-off="No" data-toggle="toggle" value="' + options.rowId + '"  id="IsActiveB2BWebSwitch' + options.rowId + '" onchange=\"Subcategoryview_View.ApproveB2BWebId(' + options.rowId + ');\" /></label></div>';
                }
            }
            else {
                if (cellvalue == 'FALSE' || cellvalue == '0' || cellvalue == undefined)
                    return '<span class="label label-danger" style="font-size: 100%; !important">No</span>';
                else
                    return '<span class="label label-success" style="font-size: 100%; !important">Yes</span>';
            }
        }
        function B2CAppApprovalBtnFmatter(cellvalue, options, rowObject, view) {
            if (isU() || isA()) {
                if (cellvalue == 1) {
                    return '<div class="checkbox" style="margin-top:0px!important"><label class="form-control-label"><input type="checkbox" class="toggleswitch active_sw" data-on="Yes" data-off="No" data-toggle="toggle" value="' + options.rowId + '"  id="IsActiveB2CAppSwitch' + options.rowId + '" onchange=\"Subcategoryview_View.ApproveB2CAppId(' + options.rowId + ');\" checked/></label></div>';
                }
                else {

                    return '<div class="checkbox" style="margin-top:0px!important"><label class="form-control-label"><input type="checkbox" class="toggleswitch deactive_sw" data-on="Yes" data-off="No" data-toggle="toggle" value="' + options.rowId + '"  id="IsActiveB2CAppSwitch' + options.rowId + '" onchange=\"Subcategoryview_View.ApproveB2CAppId(' + options.rowId + ');\" /></label></div>';
                }
            }
            else {
                if (cellvalue == 'FALSE' || cellvalue == '0' || cellvalue == undefined)
                    return '<span class="label label-danger" style="font-size: 100%; !important">No</span>';
                else
                    return '<span class="label label-success" style="font-size: 100%; !important">Yes</span>';
            }
        }
        function B2CWebApprovalBtnFmatter(cellvalue, options, rowObject, view) {
            if (isU() || isA()) {
                if (cellvalue == 1) {
                    return '<div class="checkbox" style="margin-top:0px!important"><label class="form-control-label"><input type="checkbox" class="toggleswitch active_sw" data-on="Yes" data-off="No" data-toggle="toggle" value="' + options.rowId + '"  id="IsActiveB2CWebSwitch' + options.rowId + '" onchange=\"Subcategoryview_View.ApproveB2CWebId(' + options.rowId + ');\" checked/></label></div>';
                }
                else {

                    return '<div class="checkbox" style="margin-top:0px!important"><label class="form-control-label"><input type="checkbox" class="toggleswitch deactive_sw" data-on="Yes" data-off="No" data-toggle="toggle" value="' + options.rowId + '"  id="IsActiveB2CWebSwitch' + options.rowId + '" onchange=\"Subcategoryview_View.ApproveB2CWebId(' + options.rowId + ');\" /></label></div>';
                }
            }
            else {
                if (cellvalue == 'FALSE' || cellvalue == '0' || cellvalue == undefined)
                    return '<span class="label label-danger" style="font-size: 100%; !important">No</span>';
                else
                    return '<span class="label label-success" style="font-size: 100%; !important">Yes</span>';
            }
        }
        $("#table_list_Subcategory").jqGrid({

            url: getDomain() + Subcategoryview_View.variables.BindGroupListUrl,
            datatype: "xml",
            height: '100%',
            autowidth: true,
            shrinkToFit: true,
            rowNum: 50,
            rowList: [50, 70, 100],
            colNames: colNames,
            colModel: colModel,
            pager: "#pager_list_Subcategory",
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
                ///$("[name='active_deactive']").bootstrapSwitch();
                $('.toggleswitch').bootstrapToggle({
                    size: 'mini',
                });
                $("tr.jqgrow:even").addClass('myAltRowClass');

                var datadivid = '';
                var ImageId;
                var oldsrc;
                $('.uploadsubcategory').fileupload({
                    url: getDomain() + '/Helpers/Handler/FileUploadHandler.ashx',
                    add: function (e, data) {
                        var eleid = $(this).attr('id');
                        ImageId = eleid.split('inputItemImage');
                        oldsrc = $('#imgpreview' + ImageId[1]).attr('src');
                        if (checkIsValidFile(e.target.accept, data.files[0].type))
                            data.submit();
                        else
                            notificationMessage('Invalid File', 'Please select only ' + e.target.accept + ' files', 'warning');
                    },
                    success: function (response, status) {
                        $('#imgpreview' + ImageId[1]).attr('src', response);
                        Subcategoryview_View.saveimage(oldsrc,response, ImageId[1]);
                       
                        if ($(lblError).length > 0) {
                            $(lblError).hide();
                            $(lblError).html("");
                        }
                    },
                    error: OnError
                });

                $("#table_list_Subcategory").jqGrid('setGridHeight', $(window).innerHeight() - 80 - ($("#gbox_table_list_Subcategory").height() - $('#gbox_table_list_Subcategory .ui-jqgrid-bdiv').height()));

                // Hide column headers and top pager if no records were returned
                if ($('#table_list_Subcategory').getGridParam('records') == 0)
                    $('.ui-jqgrid-htable').hide();
                else
                    $('.ui-jqgrid-htable').show();
                Subcategoryview_View.variables.JQGridDynamicWidth("#jqgrid_Subcategory", "#table_list_Subcategory", $('#jqgrid_Subcategory').width());
            },

            loadError: OnJqloadError,
            beforeProcessing: OnJqbeforeProcessingErrorcheck,
            viewrecords: true,
            hidegrid: false,
            sortname: 'CATEGORY',
            sortorder: 'asc',
        });

        // Setup buttons
        $("#table_list_Subcategory").jqGrid('navGrid', '#pager_list_Subcategory',
            { edit: false, add: false, del: false, search: true },
            { height: 320 }
    );
        $(".s-ico").hide();
        $("#pager_list_Subcategory_left").css("width", "");
        AlignJqGridHeader('table_list_Subcategory', ['edit', 'DISPLAYFORMOBILE', 'DISPLAYFORIPAD', 'HOMECATEGORYIMAGE', 'DISPLAYFORB2BWEB', 'DISPLAYFORB2CAPP', 'DISPLAYFORB2CWEB']);
    },
    b2bmenushowBtnFmatter: function (id) {
        var IsActiveSwitch = "b2bmenushow" + id;
        if ($("#" + IsActiveSwitch).prop("checked") == false) {

            Subcategoryview_View.variables.b2bmenushow = 0
        } else {

            Subcategoryview_View.variables.b2bmenushow = 1

        }
        var rowData = jQuery("#table_list_Subcategory").getRowData(id);
        var Subcategory = rowData['SUBCATEGORY'];
        var data = {
            "SUBCATEGORY": Subcategory,
            "oper": 'edit',
            "B2BMENUSHOW": Subcategoryview_View.variables.b2bmenushow,
        }
        Subcategoryview_View.savedata(data, id);
    },
    b2cmenushowBtnFmatter:function(id){
        var IsActiveSwitch = "b2cmenushow" + id;
        if ($("#" + IsActiveSwitch).prop("checked") == false) {

            Subcategoryview_View.variables.b2cmenushow = 0
        } else {

            Subcategoryview_View.variables.b2cmenushow = 1

        }
        var rowData = jQuery("#table_list_Subcategory").getRowData(id);
        var Subcategory = rowData['SUBCATEGORY'];
        var data = {
            "SUBCATEGORY": Subcategory,
            "oper": 'edit',
            "B2CMENUSHOW": Subcategoryview_View.variables.b2cmenushow,
        }
        Subcategoryview_View.savedata(data, id);
    },
    ApproveId: function (id) {
        var IsActiveSwitch = "IsActiveSwitch" + id;
        if ($("#" + IsActiveSwitch).prop("checked") == false) {

            Subcategoryview_View.variables.Is_active = 0
        } else {

            Subcategoryview_View.variables.Is_active = 1

        }
        var rowData = jQuery("#table_list_Subcategory").getRowData(id);
        var Subcategory = rowData['SUBCATEGORY'];
            var data = {
                "SUBCATEGORY": Subcategory,
                "oper": 'edit',
                "DISPLAYFORMOBILE": Subcategoryview_View.variables.Is_active,
            }
            Subcategoryview_View.savedata(data, id);


    },
    ApproveIpadId: function (id) {
        var IsActiveSwitch = "IsActiveIpadSwitch" + id;
        if ($("#" + IsActiveSwitch).prop("checked") == false) {

            Subcategoryview_View.variables.Is_Ipadactive = 0
        } else {

            Subcategoryview_View.variables.Is_Ipadactive = 1

        }
        var rowData = jQuery("#table_list_Subcategory").getRowData(id);
        var Subcategory = rowData['SUBCATEGORY'];
        var data = {
            "SUBCATEGORY": Subcategory,
            "oper": 'edit',
            "DISPLAYFORIPAD": Subcategoryview_View.variables.Is_Ipadactive,
        }
        Subcategoryview_View.savedata(data, id);


    },
    ApproveB2BWebId: function (id) {
        var IsActiveSwitch = "IsActiveB2BWebSwitch" + id;
        if ($("#" + IsActiveSwitch).prop("checked") == false) {

            Subcategoryview_View.variables.Is_B2BWebactive = 0
        } else {

            Subcategoryview_View.variables.Is_B2BWebactive = 1

        }
        var rowData = jQuery("#table_list_Subcategory").getRowData(id);
        var Subcategory = rowData['SUBCATEGORY'];
        var data = {
            "SUBCATEGORY": Subcategory,
            "oper": 'edit',
            "DISPLAYFORB2BWEB": Subcategoryview_View.variables.Is_B2BWebactive,
        }
        Subcategoryview_View.savedata(data, id);


    },
    ApproveB2CAppId: function (id) {
        var IsActiveSwitch = "IsActiveB2CAppSwitch" + id;
        if ($("#" + IsActiveSwitch).prop("checked") == false) {

            Subcategoryview_View.variables.Is_B2CAppactive = 0
        } else {

            Subcategoryview_View.variables.Is_B2CAppactive = 1
        }
        var rowData = jQuery("#table_list_Subcategory").getRowData(id);
        var Subcategory = rowData['SUBCATEGORY'];
        var data = {
            "SUBCATEGORY": Subcategory,
            "oper": 'edit',
            "DISPLAYFORB2CAPP": Subcategoryview_View.variables.Is_B2CAppactive,
        }
        Subcategoryview_View.savedata(data, id);
    },
    ApproveB2CWebId: function (id) {
        var IsActiveSwitch = "IsActiveB2CWebSwitch" + id;
        if ($("#" + IsActiveSwitch).prop("checked") == false) {

            Subcategoryview_View.variables.Is_B2CWebactive = 0
        } else {

            Subcategoryview_View.variables.Is_B2CWebactive = 1

        }
        var rowData = jQuery("#table_list_Subcategory").getRowData(id);
        var Subcategory = rowData['SUBCATEGORY'];
        var data = {
            "SUBCATEGORY": Subcategory,
            "oper": 'edit',
            "DISPLAYFORB2CWEB": Subcategoryview_View.variables.Is_B2CWebactive,
        }
        Subcategoryview_View.savedata(data, id);
    },
    savedata: function (data, id) {

        $.ajax({
            type: 'POST',
            url: getDomain() + Subcategoryview_View.variables.PerformMasterOperationUrl,
            data: data,
            async: true,
            cache: false,
            success: function (data) {
                Subcategoryview_View.btnMasterSubmitOnSuccess(data, id);
            }
        });
    },
    saveimage: function (oldsrc, data, id) {
        var foldername = 'SubCategoryHomeImage';
        var originalfile = oldsrc;
        var newfile = $('#imgpreview' + id).attr('src');
        var rowData = jQuery("#table_list_Subcategory").getRowData(id);
        var Subcategory = rowData['SUBCATEGORY'];
        var data = {

            "SUBCATEGORY": Subcategory,
            "oper": "edit"
        }
        $.ajax({
            type: 'POST',
            async: false,
            cache: false,
            url: getDomain() + "/Common/SaveSingleImage",
            data: { originalfile: originalfile, newfile: newfile, oper: 'Edit', isResize: false, module: foldername },
            success: function (result) {
                data.HOMECATEGORYIMAGE = result;
                $.ajax({
                    url: getDomain() + Subcategoryview_View.variables.PerformMasterOperationUrl,
                    data: data,
                    async: true,
                    cache: false,
                    type: 'POST',
                    success: Subcategoryview_View.btnMasterSubmitOnSuccess,
                    error: OnError,
                });
            },
            error: OnError
        });
    },
    btnMasterSubmitOnSuccess: function (data, id) {
        if ($(data).find('RESPONSECODE').text() == "0") {
            OperationMessage("", 'Subcategory data change successfully', 'success');
            $("#table_list_Subcategory").trigger("reloadGrid", [{ current: true }]);
        }
        else {
            InvalidResponseCode(data);
        }

    },
}
$(document).ready(function () {
    Subcategoryview_View.initializeJqgrid();

    $(window).resize(function () {
        var outerwidth = $('#jqgrid_Subcategory').width();
        $('#table_list_Subcategory').setGridWidth(outerwidth); // setGridWidth method sets a new width to the grid dynamically
    });

})