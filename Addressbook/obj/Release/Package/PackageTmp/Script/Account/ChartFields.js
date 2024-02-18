var ChartFieldsView = {
    variables: {
        BindMasterurl: "/Common/BindMastersDetails?ServiceName=COMMON_CHARTQUERY_GET",
        PerformMasterurl: "/Common/OpeartionsOnMaster?ServiceName=COMMON_CHARTQUERY_CRUD",
        PerformFieldcrudurl: "/Common/OpeartionsOnMaster?ServiceName=COMMON_CHARTFIELDLIST_CRUD",
        BindFieldurl: "/Common/BindMastersDetails?ServiceName=COMMON_CHARTFIELDLIST_GET",
        Oper: 'Add',       
        addedit: "added",
        Masterid: "",
        FieldJQGrid: false,
        FOper: 'Add',
        Faddedit: "added",
        FMasterid: "",
    },
    initializeJqgrid: function () {
        var colNames = ['CHARTQUERYID', 'Chart Query Title', 'UseFor', 'DbQuery', 'Display Order'];
        var colModel = [
                        { name: "CHARTQUERYID", index: "CHARTQUERYID", xmlmap: xmlvars.common_colmap + "CHARTQUERYID", stype: 'text', sortable: false, hidden: true },
                        { name: "CHARTQUERYTITLE", index: "CHARTQUERYTITLE", width: 15, xmlmap: xmlvars.common_colmap + "CHARTQUERYTITLE", stype: "text", sortable: true },
                        { name: "USEFOR", index: "USEFOR", width: 10, xmlmap: xmlvars.common_colmap + "USEFOR", align: "center", search: false, stype: "text", sortable: true },
                        { name: "DBQUERY", index: "DBQUERY", width: 55, xmlmap: xmlvars.common_colmap + "DBQUERY", search: false, stype: "text", sortable: true },
                        { name: "DISPLAYORDER", index: "DISPLAYORDER", width: 10, xmlmap: xmlvars.common_colmap + "DISPLAYORDER", align: "center", search: false, stype: "text", sortable: true },
        ];
        if (isU()) {
            colNames.push('Edit');
            colModel.push({ name: 'edit', index: 'edit', width: 5, sortable: false, align: "center", search: false, formatter: function (cv, op, ro) { return jqGridVariables.editBtnFmatter(cv, op, ro, 'ChartFieldsView', 'edit') } });
        }

        //colNames.push('Delete');
        //colModel.push({ name: 'act', index: 'act', width: 5, sortable: false, align: "center", search: false, formatter: function (cv, op, ro) { return jqGridVariables.deleteBtnFmatter(cv, op, ro, 'ChartFieldsView') } });

        $("#table_Query_list").jqGrid({
            url: getDomain() + ChartFieldsView.variables.BindMasterurl,
            datatype: "xml",
            height: '100%',
            autowidth: true,
            shrinkToFit: true,
            rowNum: 25,
            rowList: [25, 50, 100],
            colNames: colNames,
            colModel: colModel,
            pager: "#pager_Query_list",
            xmlReader: {
                root: xmlvars.common_root,
                row: xmlvars.common_row,
                page: xmlvars.common_response + "CURRENTPAGE",
                total: xmlvars.common_response + "TOTALPAGES",
                records: xmlvars.common_response + "TOTALRECORDS",
                repeatitems: false,
                id: "CHARTQUERYID"
            },
            loadComplete: function () {
                $("tr.jqgrow:even").addClass('myAltRowClass');
                $("#table_Query_list").jqGrid('setGridHeight', $(window).innerHeight() - 270 - ($("#gbox_table_Query_list").height() - $('#gbox_table_Query_list .ui-jqgrid-bdiv').height()));

                if ($('#table_Query_list').getGridParam('records') === 0)
                    $('.ui-jqgrid-htable').hide();
                else
                    $('.ui-jqgrid-htable').show();

                var width = $('#jqGrid_Query_list').width();

                if (width <= 430) {
                    width = 900;
                }
                $('#table_Query_list').setGridWidth(width);
            },
            loadError: OnJqloadError,
            beforeProcessing: OnJqbeforeProcessingErrorcheck,
            viewrecords: true,
            sortname: 'DISPLAYORDER',
            sortorder: 'asc',
        });

        // Setup buttons
        $("#table_Query_list").jqGrid('navGrid', '#pager_Query_list',
                { edit: false, add: false, del: false, search: false },
                { height: 200, reloadAfterSubmit: true }
        );
        $("#pager_Query_list").css("width", "");
        AlignJqGridHeader('table_Query_list', ['edit', 'act', 'DISPLAYORDER', 'USEFOR']);
    },
    triggerInitialClick: function () {
        ChartFieldsView.clearControls();
        ChartFieldsView.initializeJqgrid();
    },
    triggerId: function (id, oper) {
        ChartFieldsView.clearControls();
        var rowData = jQuery("#table_Query_list").getRowData(id);
        ChartFieldsView.variables.Masterid = id;
        $("#txtQueryTitle").val(rowData['CHARTQUERYTITLE']);
        if (rowData['USEFOR'] == 'B2B')
        {
            $('#rdB2B').prop("checked", true);
        }
        else if (rowData['USEFOR'] == 'B2C') {
            $('#rdB2C').prop("checked", true);
        }
        else if (rowData['USEFOR'] == 'Outlet') {
            $('#rdOutlet').prop("checked", true);
        }
        $("#txtDBQuery").val(rowData['DBQUERY']);
        $("#txtDisplayOrder").val(rowData['DISPLAYORDER']);
        $("#hdnChartQueryId").val(id);
        $("#PanelEditQuery").show();
        $("#PanelQueryList").hide();
        ChartFieldsView.showTitlePermissionWise(oper);
    },
    btnMasterSubmit: function (successFun) {
        var isValid = $("#FrmChartQuery").valid();
        if (!isValid)
            return;

        ChartFieldsView.variables.Oper = 'Add';
        ChartFieldsView.variables.addedit = "added";
        ChartFieldsView.variables.Masterid = $("#hdnChartQueryId").val();

        if (ChartFieldsView.variables.Masterid != "00000000-0000-0000-0000-000000000000" && ChartFieldsView.variables.Masterid != '') {
            ChartFieldsView.variables.Oper = 'Edit';
            ChartFieldsView.variables.addedit = 'updated';
        }

        $('#btnSaveQuery').attr('disabled', true);

        var UseFor = '';
        if ($('#rdB2B').prop("checked"))
            UseFor = 'B2B';
        else if ($('#rdB2C').prop("checked"))
            UseFor = 'B2C';
        else if ($('#rdOutlet').prop("checked"))
            UseFor = 'Outlet';

        var data = {
            "oper": ChartFieldsView.variables.Oper,
            "CHARTQUERYTITLE": $("#txtQueryTitle").val(),
            "USEFOR": UseFor,
            "DBQUERY": $("#txtDBQuery").val(),
            "DISPLAYORDER": $("#txtDisplayOrder").val(),
            "CHARTQUERYID": ChartFieldsView.variables.Masterid
        }

        ChartFieldsView.savedata(ChartFieldsView.variables.Oper, data);
    },
    btnMasterSubmitOnSuccess: function (data) {
        if (ChartFieldsView.variables.Oper == 'Delete')
            $('#btnDeleteEmail').attr('disabled', false);
        else
            $('#btnSaveQuery').attr('disabled', false);

        if ($(data).find('RESPONSECODE').text() == "0") {
            notificationMessage(ChartFieldsView.variables.Oper + ' Operation', 'Record is ' + ChartFieldsView.variables.addedit + ' successfully', 'success');
            $("#hdnChartQueryId").val($(data).find('CHARTQUERYID').text());
            $('#tabChartFields').tab('show');
            ChartFieldsView.FieldclearControls();
            ChartFieldsView.initializeFieldJqgrid();
            $("#PanelEditField").hide();
            $("#PanelFieldList").show();
        }
        else {
            InvalidResponseCode(data);
        }
    },
    btnMasterShowAddPanel: function () {
        ChartFieldsView.clearControls();
        ChartFieldsView.variables.Masterid = 0;
        $("#PanelEditQuery").show();
        $("#PanelQueryList").hide();
    },
    btnMasterCancel: function () {
        ChartFieldsView.clearControls();
        ChartFieldsView.FieldclearControls();
        jQuery("#table_Query_list").jqGrid('resetSelection');
        $("#PanelEditQuery").hide();
        $("#PanelQueryList").show();
    },
    clearControls: function () {
        $("#PanelEditQuery").hide();
        $("#PanelQueryList").show();
        $("#txtQueryTitle").val("");
        $('#rdB2B').prop("checked", true);
        $("#txtDBQuery").val("");
        $("#txtDisplayOrder").val("");
        $("#hdnChartQueryId").val("");
        $("#FrmChartQuery").validate().resetForm();
        ChartFieldsView.variables.Oper = 'Add';
        ChartFieldsView.variables.addedit = "added";
        ChartFieldsView.variables.Masterid = "";
    },
    savedata: function (oper, data) {
        $.ajax({
            url: getDomain() + ChartFieldsView.variables.PerformMasterurl,
            data: data,
            async: true,
            cache: false,
            type: 'POST',
            success: ChartFieldsView.btnMasterSubmitOnSuccess,
            error: OnError
        });
    },
    showTitlePermissionWise: function (oper) {
        if (oper == 'edit' || oper == 'add') {
            $("#btnSaveQuery").show();
        }
        else {
            if ($("#btnSaveQuery").length > 0) {
                $("#btnSaveQuery").hide();
            }
        }
    }, 
   /* deleteRow: function (id) {
        ChartFieldsView.variables.addedit = "deleted";
        ChartFieldsView.variables.Oper = "Delete";
        if (id > 0) {
            $.confirm({
                'title': 'Delete Party Details',
                'message': 'You are about to delete this Collection Detail. It can not be restored at a later time! Continue? ',
                'buttons': {
                    'Yes': {
                        'class': 'yes',
                        'action': function () {
                           
                        }
                    },
                    'No': {
                        'class': 'no',
                        'action': function () {

                        }
                    }
                }
            });
        }
    },    
    btnMasterDelete: function () {
        $('#btnDeleteEmail').attr('disabled', true);
        var data = {
            "oper": ChartFieldsView.variables.Oper,
            "CHARTQUERYID": $("#hdnChartQueryId").val()
        }
        ChartFieldsView.savedata(ChartFieldsView.variables.Oper, data);
    },*/
    initializeFieldJqgrid: function () {
        var URL = getDomain() + ChartFieldsView.variables.BindFieldurl + "&_gridsearch=true&searchField=CHARTQUERYID&searchOper=eq&searchString=" + $("#hdnChartQueryId").val();
        var colNames = ['CHARTFIELDID', 'CHARTQUERYID', 'Field Name', 'DB Column', 'Data Type', 'Query For Collection'];
        var colModel = [
                        { name: "CHARTFIELDID", index: "CHARTFIELDID", xmlmap: xmlvars.common_colmap + "CHARTFIELDID", stype: 'text', sortable: false, hidden: true },
                        { name: "CHARTQUERYID", index: "CHARTQUERYID", xmlmap: xmlvars.common_colmap + "CHARTQUERYID", stype: 'text', sortable: false, hidden: true },
                        { name: "FIELDNAME", index: "FIELDNAME", width: 15, xmlmap: xmlvars.common_colmap + "FIELDNAME", stype: "text", sortable: true },
                        { name: "DBCOLUMN", index: "DBCOLUMN", width: 15, xmlmap: xmlvars.common_colmap + "DBCOLUMN", search: false, stype: "text", sortable: true },
                        { name: "DATATYPE", index: "DATATYPE", width: 15, xmlmap: xmlvars.common_colmap + "DATATYPE", search: false, stype: "text", sortable: true },
                        { name: "QUERYFORCOLLECTION", index: "QUERYFORCOLLECTION", width: 45, xmlmap: xmlvars.common_colmap + "QUERYFORCOLLECTION", search: false, stype: "text", sortable: true },
        ];

        if (isU()) {
            colNames.push('Edit');
            colModel.push({
                name: 'edit', index: 'edit', width: 5, sortable: false, align: "center", search: false,
                formatter: function (cv, op, ro) {
                    return "<div onclick=\"ChartFieldsView.FieldtriggerId('" + op.rowId + "','edit');\"><i  style=\"cursor:pointer;  color:#1cbac8;\" title=\"Edit\" class=\"fa fa-pencil fa-lg\"></i></div>";
                }
            });
        }
        else if (isV()) {
            colNames.push('View');
            colModel.push({
                name: 'view', index: 'view', width: 5, sortable: false, align: "center", search: false,
                formatter: function (cv, op, ro) {
                    return "<div  onclick=\"ChartFieldsView.FieldtriggerId('" + op.rowId + "','view');\"><i style=\"cursor:pointer\" title=\"View\" class=\"hr-font-green fa fa-eye\"></i></div>";
                }
            });
        }
        if (isD()) {
            colNames.push('Delete');
            colModel.push({
                name: 'delete', index: 'delete', width: 5, sortable: false, align: "center", search: false,
                formatter: function (cv, op, ro) {
                    return "<div  onclick=\"ChartFieldsView.FieldDelete('" + op.rowId + "');\"><i style=\"cursor:pointer; color:red;\" title=\"Delete\" class=\"fa fa-trash-o fa-lg\"></i></div>";
                }
            });
        }
        if (ChartFieldsView.variables.FieldJQGrid == false) {
            $("#table_Field_list").jqGrid({
                url: URL,
                datatype: "xml",
                height: '100%',
                autowidth: true,
                shrinkToFit: true,
                rowNum: 10,
                rowList: [10, 20, 30],
                colNames: colNames,
                colModel: colModel,
                pager: "#pager_Field_list",
                xmlReader: {
                    root: xmlvars.common_root,
                    row: xmlvars.common_row,
                    page: xmlvars.common_response + "CURRENTPAGE",
                    total: xmlvars.common_response + "TOTALPAGES",
                    records: xmlvars.common_response + "TOTALRECORDS",
                    repeatitems: false,
                    id: "CHARTFIELDID"
                },
                loadComplete: function () {
                    $("tr.jqgrow:even").addClass('myAltRowClass');
                    if ($('#table_Field_list').getGridParam('records') === 0)
                        $('.ui-jqgrid-htable').hide();
                    else
                        $('.ui-jqgrid-htable').show();

                    var width = $('#jqGrid_Field_list').width();

                    if (width <= 430) {
                        width = 900;
                    }
                    $('#table_Field_list').setGridWidth(width);
                },
                loadError: OnJqloadError,
                beforeProcessing: OnJqbeforeProcessingErrorcheck,
                viewrecords: true,
                sortname: 'FIELDNAME',
                sortorder: 'asc',
            });

            // Setup buttons
            $("#table_Field_list").jqGrid('navGrid', '#pager_Field_list',
                    { edit: false, add: false, del: false, search: false },
                    { height: 200, reloadAfterSubmit: true }
            );
            $("#pager_Field_list").css("width", "");
            AlignJqGridHeader('table_Field_list', ['edit', 'act']);
            ChartFieldsView.variables.FieldJQGrid = true;
        }
        else {
            $("#table_Field_list").jqGrid('setGridParam', { url: URL, page: 1 }).trigger("reloadGrid");
        }
    },
    FieldclearControls: function () {
        $("#txtFieldName").val("");
        $("#txtDBColumn").val("");
        $("#ddlDataType").val("");
        $("#txtCollectionQuery").val("");
        $("#DivCollectionQuery").hide();
        $("#hdnChartFieldId").val("");
        $("#FrmChartField").validate().resetForm();
        ChartFieldsView.variables.FOper = 'Add';
        ChartFieldsView.variables.Faddedit = "added";
        ChartFieldsView.variables.FMasterid = "";
    },
    OndropDownChange: function () {
        $("#txtCollectionQuery").val("");
        if ($("#ddlDataType").val() == 'Combobox' || $("#ddlDataType").val() == 'AutoSuggest') {
            $("#DivCollectionQuery").show();
        }
        else {
            $("#DivCollectionQuery").hide();
        }
    },
    FieldtriggerId: function (id, oper) {        
        ChartFieldsView.FieldclearControls();
        var rowData = jQuery("#table_Field_list").getRowData(id);
        ChartFieldsView.variables.FMasterid = id;
        $("#txtFieldName").val(rowData['FIELDNAME']);
        $("#txtDBColumn").val(rowData['DBCOLUMN']);
        $("#ddlDataType").val(rowData['DATATYPE']);
        ChartFieldsView.OndropDownChange();
        $('#txtCollectionQuery').val(rowData["QUERYFORCOLLECTION"]);
        $("#hdnChartFieldId").val(id);        
        $("#PanelEditField").show();
        $("#PanelFieldList").hide();
    },
    FieldbtnMasterSubmit: function (successFun) {
        var isValid = $("#FrmChartField").valid();
        if (!isValid)
            return;

        ChartFieldsView.variables.FOper = 'Add';
        ChartFieldsView.variables.Faddedit = "added";
        ChartFieldsView.variables.FMasterid = $("#hdnChartFieldId").val();

        if (ChartFieldsView.variables.FMasterid != "00000000-0000-0000-0000-000000000000" && ChartFieldsView.variables.FMasterid != '') {
            ChartFieldsView.variables.FOper = 'Edit';
            ChartFieldsView.variables.Faddedit = 'updated';
        }

        $('#btnSaveField').attr('disabled', true);
      
        var data = {
            "oper": ChartFieldsView.variables.FOper,
            "FIELDNAME": $("#txtFieldName").val(),
            "DBCOLUMN": $("#txtDBColumn").val(),
            "DATATYPE": $("#ddlDataType").val(),
            "QUERYFORCOLLECTION": $("#txtCollectionQuery").val(),
            "CHARTQUERYID": $("#hdnChartQueryId").val(),
            "CHARTFIELDID": ChartFieldsView.variables.FMasterid
        }        
        ChartFieldsView.FieldSaveData(data);        
    },
    FieldSaveData: function (data)
    {
        $.ajax({
            url: getDomain() + ChartFieldsView.variables.PerformFieldcrudurl,
            data: data,
            async: true,
            cache: false,
            type: 'POST',
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    if (ChartFieldsView.variables.FOper == 'Delete')
                        $('#btnDeleteEmail').attr('disabled', false);
                    else
                        $('#btnSaveQuery').attr('disabled', false);

                    notificationMessage(ChartFieldsView.variables.FOper + ' Operation', 'Record is ' + ChartFieldsView.variables.Faddedit + ' successfully', 'success');
                    $("#PanelEditField").hide();
                    $("#PanelFieldList").show();
                    ChartFieldsView.FieldclearControls();
                    $("#table_Field_list").trigger("reloadGrid", [{ current: true }]);
                }
                else {
                    InvalidResponseCode(data);
                }
                $('#btnSaveField').attr('disabled', false);
            },
            error: OnError
        });
    },
    FieldDelete:function(Id)
    {
        $.confirm({
            'title': 'Delete Field',
            'message': 'You are about to delete this Field. It can not be restored at a later time! Continue? ',
            'buttons': {
                'Yes': {
                    'class': 'yes',
                    'action': function () {                        
                        ChartFieldsView.variables.FOper = 'delete';
                        ChartFieldsView.variables.Faddedit = 'deleted';
                        var data = {
                            "oper": ChartFieldsView.variables.FOper,
                            "CHARTFIELDID": Id
                        }
                        ChartFieldsView.FieldSaveData(data);
                    }
                },
                'No': {
                    'class': 'no',
                    'action': function () {

                    }
                }
            }
        });
    }
}

$(document).ready(function () {
    ChartFieldsView.triggerInitialClick();

    $("#btnAddNewQuery").click(function () {
        ChartFieldsView.clearControls();
        ChartFieldsView.btnMasterShowAddPanel();
    });

    $("#btnSaveQuery").click(function () {
        ChartFieldsView.btnMasterSubmit();
    });

    $("#btnDeleteEmail").click(function () {
        ChartFieldsView.btnMasterDelete();
        jQuery("#table_Query_list").jqGrid('resetSelection');
    });

    $('#btncancel').click(function () {
        ChartFieldsView.btnMasterCancel();
    });

    $("#btnSaveField").click(function () {
        ChartFieldsView.FieldbtnMasterSubmit();
    });

    $("#btnAddNewField").click(function () {        
        $("#PanelEditField").show();
        $("#PanelFieldList").hide();
        ChartFieldsView.FieldclearControls();
    });
    $("#tabs > li").click(function () {
        if ($(this).hasClass("disabled"))
            return false;
    });
    $('#btnFieldcancel').click(function () {
        $("#PanelEditField").hide();
        $("#PanelFieldList").show();
        ChartFieldsView.FieldclearControls();
    });
});