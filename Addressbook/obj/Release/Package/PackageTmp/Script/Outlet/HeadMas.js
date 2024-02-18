var Master_Head = {
    variables: {
        BindGroupListUrl: "/Common/BindMastersDetails?ServiceName=OUTLET_HEAD_DATA_GET",
        PerformMasterOperationUrl: "/Common/OpeartionsOnMaster?ServiceName=OUTLET_HEAD_MASTER_CRUD",
        Oper: 'Add',
        addedit: "added",
        Masterid: "",

        chkFmatter: function (cellvalue, options, rowObject) {
            if (cellvalue == 'FALSE' || cellvalue == '0' || cellvalue == undefined)
                return '<span class="label label-danger" style="font-size: 100%; !important">Disabled</span>';
            else
                return '<span class="label label-success" style="font-size: 100%; !important">Enabled</span>';
        },
    },
    //====Bind PartnerProfile on pageload===========================================================//    
    initializeJqgrid: function () {
        colNames = ['HEADID', 'Head Name','Group Head Name', 'Description', 'Sort Order', 'Is Active'],
        colModel = [
                    { name: "HEADID", index: "HEADID", xmlmap: xmlvars.common_colmap + "HEADID", search: false, hidden: true },
                    { name: "HEADNAME", index: "HEADNAME", width: 10, xmlmap: xmlvars.common_colmap + "HEADNAME", search: true, searchoptions: jqGridVariables.stringSearchOption },
                    { name: "GROUPHEADNAME", index: "GROUPHEADNAME", width: 10, xmlmap: xmlvars.common_colmap + "GROUPHEADNAME", search: true, searchoptions: jqGridVariables.stringSearchOption },
                    { name: "DESCRIPTION", width: 10, index: "DESCRIPTION", xmlmap: xmlvars.common_colmap + "DESCRIPTION", search: true, searchoptions: jqGridVariables.stringSearchOption },
                    { name: "SORTORDER", index: "SORTORDER", width: 8, xmlmap: xmlvars.common_colmap + "SORTORDER", search: true, sortable: false, searchoptions: jqGridVariables.stringSearchOption },
                    { name: "ISACTIVE", width: 3, index: "ISACTIVE", xmlmap: xmlvars.common_colmap + "ISACTIVE", formatter: function (cv, op, ro) { return jqGridVariables.chkFmatter(cv, op, ro, 'Master_Head') }, search: false, sortable: true },
        ];
        if (isU()) {
            colNames.push('Edit');
            colModel.push({ name: 'edit', index: 'edit', width: 3, sortable: false, align: "center", search: false, formatter: function (cv, op, ro) { return jqGridVariables.editBtnFmatter(cv, op, ro, 'Master_Head', 'edit') } });
        } else if (isV()) {
            colNames.push('Edit');
            colModel.push({ name: 'edit', index: 'edit', width: 3, sortable: false, align: "center", search: false, formatter: function (cv, op, ro) { return jqGridVariables.editBtnFmatter(cv, op, ro, 'Master_Head', 'view') } });
        }
        if (isD()) {
            colNames.push('Delete');
            colModel.push({ name: 'act', index: 'act', width: 3, sortable: false, align: "center", search: false, formatter: function (cv, op, ro) { return jqGridVariables.deleteBtnFmatter(cv, op, ro, 'Master_Head') } });
        }

        $("#table_list_HeadDtl").jqGrid({
            url: getDomain() + Master_Head.variables.BindGroupListUrl,
            datatype: "xml",
            height: '100%',
            autowidth: true,
            shrinkToFit: true,
            rowNum: 25,
            rowList: [25, 50, 100],
            colNames: colNames,
            colModel: colModel,
            pager: "#pager_list_HeadDtl",
            xmlReader: {
                root: xmlvars.common_root,
                row: xmlvars.common_row,
                page: xmlvars.common_response + "CURRENTPAGE",
                total: xmlvars.common_response + "TOTALPAGES",
                records: xmlvars.common_response + "TOTALRECORDS",
                repeatitems: false,
                id: "HEADID"
            },
            loadComplete: function () {
                $("tr.jqgrow:even").addClass('myAltRowClass');
                $("#table_list_HeadDtl").jqGrid('setGridHeight', $(window).innerHeight() - 172 - ($("#gbox_table_list_HeadDtl").height() - $('#gbox_table_list_HeadDtl .ui-jqgrid-bdiv').height()));

                // Hide column headers and top pager if no records were returned
                if ($('#table_list_HeadDtl').getGridParam('records') == 0)
                    $('.ui-jqgrid-htable').hide();
                else
                    $('.ui-jqgrid-htable').show();

                var width = $('#jqgrid_ExpenseDtl').width();
                if (width <= 1300) {
                    width = 1300;
                }
                $('#table_list_HeadDtl').setGridWidth(width);

            },
            loadError: OnJqloadError,
            beforeProcessing: OnJqbeforeProcessingErrorcheck,
            viewrecords: true,
            hidegrid: false,
            sortname: 'HEADID',
            sortorder: 'asc',
        });

        // Setup buttons
        $("#table_list_HeadDtl").jqGrid('navGrid', '#pager_list_HeadDtl',
            { edit: false, add: false, del: false, search: true },
            { height: 320 }
    );
        $("#pager_list_HeadDtl").css("width", "");
        AlignJqGridHeader('table_list_HeadDtl', ['edit', 'ACCOUNT_STATUS', 'act', 'ERPPARTYCODE']);

    },

    triggerId: function (id, oper) {
        var rowData = jQuery("#table_list_HeadDtl").getRowData(id);
        $("#txtHeadName").val(rowData['HEADNAME']);
        $("#txtDescription").val(rowData['DESCRIPTION']);
        $("#txtSortOrder").val(rowData['SORTORDER']);
        $("#ddlGroupHead").val(rowData['GROUPHEADNAME']);
        $('#activeonoff').prop('checked', ($(rowData['ISACTIVE']).html() == 'Yes') ? $('#activeonoff').bootstrapToggle('on') : $('#activeonoff').bootstrapToggle('off'));
        
        $("#hdnHeadId").val(rowData['HEADID']);
        $("#panelEdit").show();
        $("#panelView").hide();
    },
    deleteRow: function (id) {
        $.confirm({
            'title': 'Delete Head Details',
            'message': 'You are about to delete this Head Master Detail. It can not be restored at a later time! Continue? ',
            'buttons': {
                'Yes': {
                    'class': 'yes',
                    'action': function () {
                        // delete data to DB
                        var dataP = {
                            HEADID: id,
                            oper: 'delete'
                        };
                        $.ajax({
                            url: getDomain() + "/Common/OpeartionsOnMaster?ServiceName=OUTLET_HEAD_MASTER_CRUD",
                            type: "POST",
                            data: dataP,
                            async: false,
                            cache: false,
                            success: function (result) {
                                if ($(result).find('RESPONSECODE').text() == "0") {
                                    notificationMessage('Save Operation', 'Record is deleted successfully', 'success');
                                    $("#table_list_HeadDtl").trigger("reloadGrid", [{ current: true }]);
                                }
                                else
                                    notificationMessage('Error', $(result).find('RESPONSEMESSAGE').text(), 'error');
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

    btnMasterSubmit: function () {

        var isValid = $("#frmAccYearDetails").valid();
        if (!isValid)
            return;
        Master_Head.variables.Oper = 'Add';
        Master_Head.variables.addedit = "added";
        Master_Head.variables.Masterid = $("#hdnHeadId").val();

        if (Master_Head.variables.Masterid != "0" && parseInt(Master_Head.variables.Masterid) > 0) {
            Master_Head.variables.Oper = 'Edit';
            Master_Head.variables.addedit = 'updated';
        }

        $('#btnSaveExpenseDtl').attr('disabled', true);

        //var data = {


        //}
        Master_Head.savedata(Master_Head.variables.Oper);
    },

    savedata: function (oper) {

        var dataP;
        var activetoggle;
        if ($("#activeonoff").prop("checked") == true) {

            activetoggle = "1";

        } else {
            activetoggle = "0";
        }
        dataP = {
            "oper": oper,
            "HEADID": $("#hdnHeadId").val(),
            "GROUPHEADNAME":$("#ddlGroupHead").val(),
            "DESCRIPTION": $("#txtDescription").val(),
            "SORTORDER": $("#txtSortOrder").val(),
            "HEADNAME": $("#txtHeadName").val(),
            "ISACTIVE": activetoggle
        };

        $.ajax({

            url: getDomain() + Master_Head.variables.PerformMasterOperationUrl,
            data: dataP,
            async: true,
            cache: false,
            type: 'POST',
            success: Master_Head.btnMasterSubmitOnSuccess,
            error: OnError,
        });
    },
    btnMasterSubmitOnSuccess: function (data) {
        if ($(data).find('RESPONSECODE').text() == "0") {
            if (Master_Head.variables.Oper == 'Delete') {
                OperationMessage("", 'Outlet deleted successfully', 'success');
            } else {
                OperationMessage("", 'Outlet detail saved successfully', 'success');
                $('#panelEdit').hide();
                $('#panelView').show();
            }
            Master_Head.ClearValues();
            $("#table_list_HeadDtl").trigger("reloadGrid", [{ current: true }]);
        }
        else {
            InvalidResponseCode(data);
        }
        $('#btnSaveExpenseDtl').attr('disabled', false);

    },

    ClearValues: function () {
        $("#txtHeadName").val("");
        $("#txtDescription").val("");
        $("#ddlGroupHead").val("");
        $("#txtSortOrder").val("");
        $("#hdnHeadId").val("");
        $('#activeonoff').bootstrapToggle('off');
        $('#panelEdit').hide();
        $('#panelView').show();
    }
};
$(document).ready(function () {
    Master_Head.initializeJqgrid();
    $("#btnAdd").click(function () {
        Master_Head.ClearValues();
        $('#panelEdit').show();
        $('#panelView').hide();
    });

    $("#btnCancelExpenseDtl").click(function () {
        Master_Head.ClearValues();
        $('#panelEdit').hide();
        $('#panelView').show();
    });
    $("#btnSaveExpenseDtl").click(function () {
        Master_Head.btnMasterSubmit();
    });



});