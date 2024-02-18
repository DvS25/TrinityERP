var Master_AccYearView = {
    variables: {
        BindGroupListUrl: "/Common/BindMastersDetails?ServiceName=OUTLET_ACCOUNT_YEAR_MASTER_GET",
        PerformMasterOperationUrl: "/Common/OpeartionsOnMaster?ServiceName=OUTLET_ACCOUNT_YEAR_MASTER_CRUD",
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
        colNames = ['ACCOUNTYEARID', 'Account Year Name', 'From Date', 'To Date', 'Account DB', 'Production DB'],
        colModel = [
                    { name: "ACCOUNTYEARID", index: "ACCOUNTYEARID", xmlmap: xmlvars.common_colmap + "ACCOUNTYEARID", search: false, hidden: true },
                    { name: "ACCOUNTYEARNAME", index: "ACCOUNTYEARNAME", width: 10, xmlmap: xmlvars.common_colmap + "ACCOUNTYEARNAME", search: true, searchoptions: jqGridVariables.stringSearchOption },
                    { name: "FROMDATE", width: 10, index: "FROMDATE", xmlmap: xmlvars.common_colmap + "FROMDATE", search: true, searchoptions: jqGridVariables.stringSearchOption },
                    { name: "TODATE", index: "TODATE", width: 8, xmlmap: xmlvars.common_colmap + "TODATE", search: true, sortable: false, searchoptions: jqGridVariables.stringSearchOption },
                    { name: "ACCOUNTDB", index: "ACCOUNTDB", width: 7, xmlmap: xmlvars.common_colmap + "ACCOUNTDB", search: true, searchoptions: jqGridVariables.stringSearchOption },
                    { name: "PRODUCTIONDB", index: "PRODUCTIONDB", width: 7, xmlmap: xmlvars.common_colmap + "PRODUCTIONDB", search: true, hidden: false, searchoptions: jqGridVariables.stringSearchOption }
        ];
        if (isU()) {
            colNames.push('Edit');
            colModel.push({ name: 'edit', index: 'edit', width: 3, sortable: false, align: "center", search: false, formatter: function (cv, op, ro) { return jqGridVariables.editBtnFmatter(cv, op, ro, 'Master_AccYearView', 'edit') } });
        } else if (isV()) {
            colNames.push('Edit');
            colModel.push({ name: 'edit', index: 'edit', width: 3, sortable: false, align: "center", search: false, formatter: function (cv, op, ro) { return jqGridVariables.editBtnFmatter(cv, op, ro, 'Master_AccYearView', 'view') } });
        }
        if (isD()) {
            colNames.push('Delete');
            colModel.push({ name: 'act', index: 'act', width: 3, sortable: false, align: "center", search: false, formatter: function (cv, op, ro) { return jqGridVariables.deleteBtnFmatter(cv, op, ro, 'Master_AccYearView') } });
        }

        $("#table_list_AccountYearDtls").jqGrid({
            url: getDomain() + Master_AccYearView.variables.BindGroupListUrl,
            datatype: "xml",
            height: '100%',
            autowidth: true,
            shrinkToFit: true,
            rowNum: 25,
            rowList: [25, 50, 100],
            colNames: colNames,
            colModel: colModel,
            pager: "#pager_list_AccountYearDtls",
            xmlReader: {
                root: xmlvars.common_root,
                row: xmlvars.common_row,
                page: xmlvars.common_response + "CURRENTPAGE",
                total: xmlvars.common_response + "TOTALPAGES",
                records: xmlvars.common_response + "TOTALRECORDS",
                repeatitems: false,
                id: "ACCOUNTYEARID"
            },
            loadComplete: function () {
                $("tr.jqgrow:even").addClass('myAltRowClass');
                $("#table_list_AccountYearDtls").jqGrid('setGridHeight', $(window).innerHeight() - 172 - ($("#gbox_table_list_AccountYearDtls").height() - $('#gbox_table_list_AccountYearDtls .ui-jqgrid-bdiv').height()));

                // Hide column headers and top pager if no records were returned
                if ($('#table_list_AccountYearDtls').getGridParam('records') == 0)
                    $('.ui-jqgrid-htable').hide();
                else
                    $('.ui-jqgrid-htable').show();

                var width = $('#jqgrid_party').width();
                if (width <= 1300) {
                    width = 1300;
                }
                $('#table_list_AccountYearDtls').setGridWidth(width);

            },
            loadError: OnJqloadError,
            beforeProcessing: OnJqbeforeProcessingErrorcheck,
            viewrecords: true,
            hidegrid: false,
            sortname: 'ACCOUNTYEARNAME',
            sortorder: 'asc',
        });

        // Setup buttons
        $("#table_list_AccountYearDtls").jqGrid('navGrid', '#pager_list_AccountYearDtls',
            { edit: false, add: false, del: false, search: true },
            { height: 320 }
    );
        $("#pager_list_AccountYearDtls").css("width", "");
        AlignJqGridHeader('table_list_AccountYearDtls', ['edit', 'ACCOUNT_STATUS', 'act', 'ERPPARTYCODE']);

    },

    triggerId: function (id, oper) {
        var rowData = jQuery("#table_list_AccountYearDtls").getRowData(id);
        $("#txtAccYearName").val(rowData['ACCOUNTYEARNAME']);
        $("#txtFromDate").val(rowData['FROMDATE']);
        $("#txtToDate").val(rowData['TODATE']);
        $("#txtAccDB").val(rowData['ACCOUNTDB']);
        $("#txtProductionDB").val(rowData['PRODUCTIONDB']);
        $("#hdnAccountYearId").val(rowData['ACCOUNTYEARID']);
        $("#panelEdit").show();
        $("#panelView").hide();
    },
    deleteRow: function (id) {
        $.confirm({
            'title': 'Delete Account Year Details',
            'message': 'You are about to delete this Account Year Detail. It can not be restored at a later time! Continue? ',
            'buttons': {
                'Yes': {
                    'class': 'yes',
                    'action': function () {
                        // delete data to DB
                        var dataP = {
                            ACCOUNTYEARID: id,
                            oper: 'delete'
                        };
                        $.ajax({
                            url: getDomain() + "/Common/OpeartionsOnMaster?ServiceName=OUTLET_ACCOUNT_YEAR_MASTER_CRUD",
                            type: "POST",
                            data: dataP,
                            async: false,
                            cache: false,
                            success: function (result) {
                                if ($(result).find('RESPONSECODE').text() == "0") {
                                    notificationMessage('Save Operation', 'Record is deleted successfully', 'success');
                                    $("#table_list_AccountYearDtls").trigger("reloadGrid", [{ current: true }]);
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
        Master_AccYearView.variables.Oper = 'Add';
        Master_AccYearView.variables.addedit = "added";
        Master_AccYearView.variables.Masterid = $("#hdnAccountYearId").val();

        if (Master_AccYearView.variables.Masterid != "0" && parseInt(Master_AccYearView.variables.Masterid) > 0) {
            Master_AccYearView.variables.Oper = 'Edit';
            Master_AccYearView.variables.addedit = 'updated';
        }

        $('#btnSaveAccYearDtl').attr('disabled', true);

        //var data = {


        //}
        Master_AccYearView.savedata(Master_AccYearView.variables.Oper);
    },

    savedata: function (oper) {

        var dataP;

        if ($("#oactiveonoff").prop("checked") == true) {

            activetoggle = "1";

        } else {
            activetoggle = "0";
        }
        dataP = {
            "oper": oper,
            "ACCOUNTYEARID": $("#hdnAccountYearId").val(),
            "FROMDATE": $("#txtFromDate").val(),
            "TODATE": $("#txtToDate").val(),
            "ACCOUNTYEARNAME": $("#txtAccYearName").val(),
            "ACCOUNTDB": $("#txtAccDB").val(),
            "PRODUCTIONDB": $("#txtProductionDB").val()
        };

        $.ajax({

            url: getDomain() + Master_AccYearView.variables.PerformMasterOperationUrl,
            data: dataP,
            async: true,
            cache: false,
            type: 'POST',
            success: Master_AccYearView.btnMasterSubmitOnSuccess,
            error: OnError,
        });
    },
    btnMasterSubmitOnSuccess: function (data) {
        if ($(data).find('RESPONSECODE').text() == "0") {
            if (Master_AccYearView.variables.Oper == 'Delete') {
                OperationMessage("", 'Outlet deleted successfully', 'success');
            } else {
                OperationMessage("", 'Outlet detail saved successfully', 'success');
                $('#panelEdit').hide();
                $('#panelView').show();
            }
            Master_AccYearView.ClearValues();
           $("#table_list_AccountYearDtls").trigger("reloadGrid", [{ current: true }]);
        }
        else {
            InvalidResponseCode(data);
        }
        $('#btnSaveAccYearDtl').attr('disabled', false);

    },

    ClearValues: function () {
        $("#txtAccYearName").val("");
        $("#txtFromDate").val("");
        $("#txtToDate").val("");
        $("#txtAccDB").val("");
        $("#txtProductionDB").val("");
        $("#hdnAccountYearId").val("");
        $('#panelEdit').hide();
        $('#panelView').show();
    }
};
$(document).ready(function () {
    Master_AccYearView.initializeJqgrid();

    $('#txtFromDate').datepicker({ format: 'dd/M/yyyy' });
    $('#txtFromDate').on('change', function () {
        $('.datepicker').hide();
    });

    $('#txtToDate').datepicker({ format: 'dd/M/yyyy' });
    $('#txtToDate').on('change', function () {
        $('.datepicker').hide();
    });

    $("#btnAdd").click(function () {
        Master_AccYearView.ClearValues();
        $('#panelEdit').show();
        $('#panelView').hide();
    });

    $("#btnCancelAccountYear").click(function () {
        Master_AccYearView.ClearValues();
        $('#panelEdit').hide();
        $('#panelView').show();
    });
        
    $("#btnSaveAccYearDtl").click(function () {
        Master_AccYearView.btnMasterSubmit();
    });
});