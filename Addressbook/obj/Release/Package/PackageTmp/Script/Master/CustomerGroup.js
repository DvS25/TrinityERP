var Master_GroupView = {
    variables: {
        BindGroupListUrl: "/Common/BindMastersDetails?ServiceName=GROUP_GET",
        PerformMasterOperationUrl: "/Common/OpeartionsOnMaster?ServiceName=GROUP_CRUD",
        Oper: 'Add',
        addedit: "added",
        Masterid: ""
    },

    //====Bind PartnerProfile on pageload===========================================================//    
    initializeJqgrid: function () {
        
        colNames = ['GROUPID', 'GROUP NAME'],
        colModel = [
                    { name: "GROUPID", index: "GROUPID", width: 3, xmlmap: xmlvars.common_colmap + "GROUPID", search: false, searchoptions: jqGridVariables.stringSearchOption, hidden: false },
                    { name: "GROUPNAME", width: 5, index: "GROUPNAME", xmlmap: xmlvars.common_colmap + "GROUPNAME", search: true, searchoptions: jqGridVariables.stringSearchOption }
        ];
        if (isU()) {
            colNames.push('Edit');
            colModel.push({ name: 'edit', index: 'edit', width: 2, sortable: false, align: "center", search: false, formatter: function (cv, op, ro) { return jqGridVariables.editBtnFmatter(cv, op, ro, 'Master_GroupView', 'edit') } });
        } else if (isV()) {
            colNames.push('Edit');
            colModel.push({ name: 'edit', index: 'edit', width: 2, sortable: false, align: "center", search: false, formatter: function (cv, op, ro) { return jqGridVariables.editBtnFmatter(cv, op, ro, 'Master_GroupView', 'view') } });
        }
        if (isD()) {
            colNames.push('Delete');
            colModel.push({ name: 'act', index: 'act', width: 2, sortable: false, align: "left", search: false, formatter: function (cv, op, ro) { return jqGridVariables.deleteBtnFmatter(cv, op, ro, 'Master_GroupView') } });
        }
        
        $("#table_list_Group").jqGrid({
            url:getDomain() + Master_GroupView.variables.BindGroupListUrl,
            datatype: "xml",
            height: '100%',
            autowidth: true,
            shrinkToFit: true,
            rowNum: 25,
            rowList: [25, 50, 100],
            colNames: colNames,
            colModel: colModel,
            pager: "#pager_list_Group",
            xmlReader: {
                root: xmlvars.common_root,
                row: xmlvars.common_row,
                page: xmlvars.common_response + "CURRENTPAGE",
                total: xmlvars.common_response + "TOTALPAGES",
                records: xmlvars.common_response + "TOTALRECORDS",
                repeatitems: false,
                id: "GROUPID"
            },
            loadComplete: function () {
                $("tr.jqgrow:even").addClass('myAltRowClass');
                $("#table_list_Group").jqGrid('setGridHeight', $(window).innerHeight() - 180 - ($("#gbox_table_list_Group").height() - $('#gbox_table_list_Group .ui-jqgrid-bdiv').height()));

                // Hide column headers and top pager if no records were returned
                if ($('#table_list_Group').getGridParam('records') == 0)
                    $('.ui-jqgrid-htable').hide();
                else
                    $('.ui-jqgrid-htable').show();

                var width = $('#jqgrid_group').width();
                if (width <= 430) {
                    width = 595;
                }
                $('#table_list_Group').setGridWidth(width);

            },
            loadError: OnJqloadError,
            beforeProcessing: OnJqbeforeProcessingErrorcheck,
            viewrecords: true,
            hidegrid: false,
            sortname: 'GROUPID',
            sortorder: 'desc',
        });

        // Setup buttons
        $("#table_list_Group").jqGrid('navGrid', '#pager_list_Group',
            { edit: false, add: false, del: false, search: false },
            { height: 320 }
    );
        $("#pager_list_Group_left").css("width", "");
        AlignJqGridHeader('table_list_Group', ['edit']);
       
    },

    triggerId: function (id, oper) {
        var rowData = jQuery("#table_list_Group").getRowData(id);
        $("#hdngroup").val(id);
        $("#txtGroup").val(rowData['GROUPNAME']);
        $("#pnlEdit").show();
        $("#pnlView").hide();
        Master_GroupView.showTitlePermissionWise(oper);
    },
    showTitlePermissionWise: function (oper) {
        
        if (oper == 'edit' || oper == 'add') {
            $("#btnSave").show();
        }
        else {
            if ($("#btnSave").length > 0) {
                $("#btnSave").hide();
            }
        }
    },

    deleteRow: function (id) {
        $("#hdngroup").val(id);
        $("#pnlEdit").hide();
        //$("#pnlView").hide();
        $("#paneldelete").modal("show");
        var rowData = jQuery("#table_list_Group").getRowData(id);
        $("#delGroupname").html(rowData['GROUPNAME']);
        Master_GroupView.variables.Oper = 'Delete';
    },

    btnMasterSubmit: function () {
        
        var isValid = $("#frmgroup").valid();
        if (!isValid)
            return;
        Master_GroupView.variables.Oper = 'Add';
        Master_GroupView.variables.addedit = "added";
        Master_GroupView.variables.Masterid = $("#hdngroup").val();

        if (Master_GroupView.variables.Masterid != "0" && parseInt(Master_GroupView.variables.Masterid) > 0) {
            Master_GroupView.variables.Oper = 'Edit';
            Master_GroupView.variables.addedit = 'updated';
        }

        $('#btnSave').attr('disabled', true);

        var data = {
            "GROUPID": Master_GroupView.variables.Masterid,
            "oper": Master_GroupView.variables.Oper,
            "GROUPNAME": $("#txtGroup").val()

        }
        Master_GroupView.savedata(data);
    },

    savedata: function (data) {
        $.ajax({
         
            url: getDomain() + Master_GroupView.variables.PerformMasterOperationUrl,
            data: data,
            async: true,
            cache: false,
            type: 'POST',
            success: Master_GroupView.btnMasterSubmitOnSuccess,
            error: OnError,
        });
    },

    btnMasterSubmitOnSuccess: function (data) {
        if ($(data).find('RESPONSECODE').text() == "0") {
            if (Master_GroupView.variables.Oper == 'Delete') {
                OperationMessage("", 'Group deleted successfully', 'success');
            } else {
                OperationMessage("", 'Group detail saved successfully', 'success');
                $('#pnlEdit').hide();
                $('#pnlView').show();
                $("#paneldelete").modal("hide");

            }
            Master_GroupView.ClearValues();
            $("#table_list_Group").trigger("reloadGrid", [{ current: true }]);
        }
        else {
            InvalidResponseCode(data);
        }
        $('#btnSave').attr('disabled', false);
        $('#btnDelete').attr('disabled', false);

    },
    btnMasterDelete: function () {
        $('#btnDelete').attr('disabled', true);
        var data = {
            "oper": Master_GroupView.variables.Oper,
            "GROUPID": $("#hdngroup").val()
        }
        Master_GroupView.savedata(data);
    },
    ClearValues: function () {
        $("#hdngroup").val("");
        $("#txtGroup").val("");
        $('#pnlEdit').hide();
        $('#pnlView').show();
        $("#paneldelete").modal("hide");
    },
};

$(document).ready(function () {

        Master_GroupView.initializeJqgrid();
        Master_GroupView.ClearValues();
   
    $("#btnAddNew").click(function () {
        Master_GroupView.ClearValues();
        $('#pnlEdit').show();
        $('#pnlView').hide();
        $("#paneldelete").modal("hide");

    });
    $("#btnSave").click(function () {
        Master_GroupView.btnMasterSubmit();
    });

    $("#btnDelete").click(function () {
        Master_GroupView.btnMasterDelete();
    });
    $("#delcancel").click(function () {
        Master_GroupView.ClearValues(); 
    });
    $("#btn_grp_cancle").click(function () {
        Master_GroupView.ClearValues();
       
    });
});