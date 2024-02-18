var AccHeadMasterView = {
    variables: {
        BindMainGridListUrl: "/Common/BindMastersDetails?ServiceName=ACC_HEAD_MASTER_GET",
        PerformMasterOperationUrl: "/Common/OpeartionsOnMaster?ServiceName=ACC_HEAD_MASTER_CRUD",
        Oper: 'Add',
        addedit: "added",
        Masterid: "",
        dx_btnAddNew: "",
        dx_txtHeadname: "",
        dx_GroupName: "",
        dx_FinalAccount: "",
        dx_numDisplayOrder: "",
        dx_ShowAs: "",
        dx_switchIsActive: "",
        dx_switchGroupActive: "",
        dx_txtDescription: "",
        dx_btnSubmit: "",
        dx_btnCancel: "",
        dx_dataGrid: "",

        dx_popupRecordDelete: "",
        DeleteDataObj: "",
        DeletePopUpOptions: {
            width: 300,
            height: 200,
            contentTemplate: function () {
                return $("<div />").append(
                    $("<p>Head Name: <span>" + AccHeadMasterView.variables.DeleteDataObj.headname + "</span></p>"
                     )
                    );
            },
            toolbarItems: [{
                widget: "dxButton",
                toolbar: "bottom",
                location: "after",
                options: {
                    icon: "trash",
                    text: "Yes, Delete It!",
                    type: "danger",

                    onClick: function (e) {
                        var data = {
                            "HEADID": AccHeadMasterView.variables.Masterid,
                            "oper": AccHeadMasterView.variables.Oper,
                        }
                        $.ajax({
                            url: getDomain() + AccHeadMasterView.variables.PerformMasterOperationUrl,
                            data: data,
                            async: true,
                            cache: false,
                            type: 'POST',
                            success: function (data) {
                                if ($(data).find('RESPONSECODE').text() == "0") {
                                    DevExVariables.Toaster("success", 'Record is deleted successfully');

                                    AccHeadMasterView.variables.dx_popupRecordDelete.hide();
                                    AccHeadMasterView.variables.dx_dataGrid.refresh();
                                }
                                else {
                                    DevExVariables.InvalidResponseCode(data);
                                }
                            },
                            error: OnError,
                        });
                    },

                }
            }],
            showTitle: true,
            title: "Delete Record?",
            visible: false,
            dragEnabled: false,
            closeOnOutsideClick: true
        },
    },

    FormInitialize: function () {

        AccHeadMasterView.variables.dx_txtHeadname = $("#dx_txtHeadname").dxTextBox({
            placeholder: "Enter Head Name...",
        }).dxValidator({
            validationGroup: "AccHeadMaster",
            validationRules: [{
                type: "required",
                message: "Account Head Name is required"
            }]
        }).dxTextBox("instance");

        AccHeadMasterView.variables.dx_GroupName = $("#dx_GroupName").dxSelectBox({
            dataSource: ["Creditors/Debitors", "Current Liabilities", "Direct Expense", "Indirect Expense", "Indirect Income", "Current Assets", "Capital Account", "Fixed Assets", "Loans & Advances", "Duties & Taxes", "Investments", "Loans & Liabilities", "Sale Account", "Purchase Account", "Stock Account", "System"],
            placeholder: "Select Payment Type...",
            searchEnabled: true,
        }).dxValidator({
            validationGroup: "AccHeadMaster",
            validationRules: [{
                type: "required",
                message: "Select Group Name"
            }]
        }).dxSelectBox("instance");

        AccHeadMasterView.variables.dx_FinalAccount = $("#dx_FinalAccount").dxSelectBox({
            dataSource: ["Balancesheet", "Profit & Loss", "Trading Account", "system"],
            placeholder: "Select Payment Type...",
            searchEnabled: true,
        }).dxValidator({
            validationGroup: "AccHeadMaster",
            validationRules: [{
                type: "required",
                message: "Select Group Name"
            }]
        }).dxSelectBox("instance");

        AccHeadMasterView.variables.dx_ShowAs = $("#dx_ShowAs").dxSelectBox({
            dataSource: ["Credit", "Debit"],
            placeholder: "Select Payment Type...",
            searchEnabled: true,
        }).dxValidator({
            validationGroup: "AccHeadMaster",
            validationRules: [{
                type: "required",
                message: "Select Group Name"
            }]
        }).dxSelectBox("instance");

        AccHeadMasterView.variables.dx_numDisplayOrder = $("#dx_numDisplayOrder").dxNumberBox({
            placeholder: "Enter Display Order...",
            min: 0,
        }).dxValidator({
            validationGroup: "AccHeadMaster",
            validationRules: [{
                type: "required",
                message: "Display Order is required"
            }]
        }).dxNumberBox("instance");

        AccHeadMasterView.variables.dx_switchGroupActive = $("#dx_switchGroupActive").dxSwitch({
            value: true,
            switchedOnText: "Yes",
            switchedOffText: "No"
        }).dxValidator({
            validationGroup: "AccHeadMaster",
            validationRules: []
        }).dxSwitch("instance");

        AccHeadMasterView.variables.dx_switchIsActive = $("#dx_switchIsActive").dxSwitch({
            value: true,
            switchedOnText: "Yes",
            switchedOffText: "No"
        }).dxValidator({
            validationGroup: "AccHeadMaster",
            validationRules: []
        }).dxSwitch("instance");

        AccHeadMasterView.variables.dx_txtDescription = $("#dx_txtDescription").dxTextArea({
            height: 110,
            placeholder: "Enter Description"

        }).dxTextArea("instance");

        //--------------------------------------- Submit button---------------------------------------

        AccHeadMasterView.variables.dx_btnSubmit = $("#dx_btnSubmit").dxButton({
            icon: "check",
            text: "Submit",
            type: "success",
            //useSubmitBehavior: true,
            onClick: function (e) {
                var validation = DevExpress.validationEngine.validateGroup("AccHeadMaster");
                if (!validation.isValid) {
                    DevExVariables.Toaster("warning", "Please fill all required fields before submit.");
                    return;
                }
                AccHeadMasterView.btnMasterSubmit();
            }
        }).dxButton("instance");

        //--------------------------------------- Cancle button---------------------------------------

        AccHeadMasterView.variables.dx_btnCancel = $("#dx_btnCancel").dxButton({
            icon: "close",
            text: "Cancel",
            type: "danger",
            onClick: function (e) {
                AccHeadMasterView.ClearValues();
            }
        }).dxButton("instance");

        AccHeadMasterView.variables.dx_btnAddNew = $("#dx_btnAddNew").dxButton({
            stylingMode: "outlined",
            icon: "plus",
            text: "Add New",
            type: "default",
            validationGroup: "AccHeadMaster",
            onClick: function (e) {
                AccHeadMasterView.variables.Masterid = "";
                $("#frm_AccHeadMaster").show();
                $("#pnlView").hide();
            }
        }).dxButton("instance");
    },

    initializeDevExgrid: function () {
        AccHeadMasterView.variables.dx_dataGrid = $("#dx_dataGrid").dxDataGrid({
            dataSource: new DevExpress.data.CustomStore({
                key: "headid",
                load: function (loadOptions) {
                    var deferred = $.Deferred();

                    var result = DevExVariables.GetDataList(loadOptions, AccHeadMasterView.variables.BindMainGridListUrl);

                    if (result != "Error") {
                        var List = [];
                        if (result.serviceresponse.detailslist) {
                            if (result.serviceresponse.detailslist.details.length)
                                List = result.serviceresponse.detailslist.details;
                            else
                                List.push(result.serviceresponse.detailslist.details);
                        }

                        deferred.resolve(List, {
                            totalCount: result.serviceresponse.totalrecords
                        });
                    }
                    else {
                        deferred.reject("Data Loading Error");
                    }

                    return deferred.promise();
                }
            }),
            loadPanel: {
                enabled: true,
                indicatorSrc: "../Content/images/trinityloaderwhite.gif",
            },
            allowColumnResizing: true,
            columnResizingMode: "widget",
            columnAutoWidth: true,
            showBorders: true,
            showColumnLines: true,
            showRowLines: true,
            filterRow: {
                visible: true,
                applyFilter: "auto"
            },
            headerFilter: {
                visible: true
            },
            remoteOperations: true,
            paging: {
                pageSize: 15
            },
            pager: {
                visible: true,
                showInfo: true,
                showNavigationButtons: true,
                showPageSizeSelector: true,
                allowedPageSizes: [15, 30, 100]
            },
            columns: [{ dataField: "headid", allowFiltering: false, allowSorting: true, sortIndex: 1, sortOrder: "desc", visible: false },
                {
                    dataField: "headname", caption: "HeadName", dataType: "string", filterOperations: ["contains"], allowSorting: true, allowFiltering: true, allowHeaderFiltering: false
                },
                {
                    dataField: "groupname", caption: "Group Name", dataType: "string", filterOperations: ["contains"], allowSorting: true, allowFiltering: true, allowHeaderFiltering: false,
                    cellTemplate: function (container, options) {
                        var temp = '<div>' + (options.displayValue).replace("&amp;", "&") + '</div>';
                        $(temp).appendTo(container);
                    }
                },
                {
                    dataField: "finelaccount", caption: "FinalAccount", dataType: "string", filterOperations: ["contains"], allowSorting: true, allowFiltering: true, allowHeaderFiltering: false,

                },
                { dataField: "displayorder", caption: "Display Order", dataType: "string", filterOperations: ["contains"], allowSorting: true, allowFiltering: true, allowHeaderFiltering: false },
                { dataField: "description", caption: "Description", dataType: "string", filterOperations: ["contains"], allowSorting: true, allowFiltering: false, allowHeaderFiltering: false },

                { dataField: "showas", caption: "Show As", dataType: "string", filterOperations: ["contains"], allowSorting: true, allowFiltering: true, allowHeaderFiltering: false },
                {
                    dataField: "groupactive", caption: "Group Active", dataType: "string", alignment: "center", filterOperations: ["contains"],
                    allowSorting: false, allowFiltering: false, allowHeaderFiltering: true,
                    headerFilter: {
                        dataSource: [{
                            text: "Yes",
                            value: ["groupactive", "equals", 1]
                        }, {

                            text: "No",
                            value: ["groupactive", "equals", 0]
                        }]
                    },
                    cellTemplate: function (container, options) {
                        DevExVariables.LabelTemplate(container, options);
                    }
                },
                {
                    dataField: "isactive", caption: "Active", dataType: "string", alignment: "center", filterOperations: ["contains"],
                    allowSorting: false, allowFiltering: false, allowHeaderFiltering: true,
                    headerFilter: {
                        dataSource: [{
                            text: "Yes",
                            value: ["isactive", "equals", 1]
                        }, {

                            text: "No",
                            value: ["isactive", "equals", 0]
                        }]
                    },
                    cellTemplate: function (container, options) {
                        DevExVariables.LabelTemplate(container, options);
                    }
                },
                {
                    dataField: "Action", caption: "Action", alignment: "center", allowFiltering: false, allowSorting: false, fixed: true, fixedPosition: "right",
                    cellTemplate: function (container, options) {
                        DevExVariables.ActionTemplate(container, options, true, true, "AccHeadMasterView");
                    }
                },
            ]
        }).dxDataGrid("instance");
    },

    btnMasterSubmit: function () {
        AccHeadMasterView.variables.dx_btnSubmit.option({ disabled: true });
        AccHeadMasterView.variables.Oper = 'Add';
        AccHeadMasterView.variables.addedit = "added";
        if (AccHeadMasterView.variables.Masterid != "0" && parseInt(AccHeadMasterView.variables.Masterid) > 0) {
            AccHeadMasterView.variables.Oper = 'Edit';
            AccHeadMasterView.variables.addedit = 'updated';
        }
        var data = {
            "HEADID": AccHeadMasterView.variables.Masterid,
            "HEADNAME": AccHeadMasterView.variables.dx_txtHeadname.option().value,
            "GROUPNAME": AccHeadMasterView.variables.dx_GroupName.option().value,
            "FINELACCOUNT": AccHeadMasterView.variables.dx_FinalAccount.option().value,
            "DESCRIPTION": AccHeadMasterView.variables.dx_txtDescription.option().value,
            //"SHOWAS": AccHeadMasterView.variables.dx_ShowAs.option().value,
            "DISPLAYORDER": AccHeadMasterView.variables.dx_numDisplayOrder.option().value,
            "GROUPACTIVE": AccHeadMasterView.variables.dx_switchGroupActive.option().value,
            "ISACTIVE": AccHeadMasterView.variables.dx_switchIsActive.option().value,
            "oper": AccHeadMasterView.variables.Oper,
        }

        if (AccHeadMasterView.variables.dx_ShowAs.option().value)
            data.SHOWAS = AccHeadMasterView.variables.dx_ShowAs.option().value;

        AccHeadMasterView.savedata(data);
    },

    savedata: function (data) {
        $.ajax({
            url: getDomain() + AccHeadMasterView.variables.PerformMasterOperationUrl,
            data: data,
            async: true,
            cache: false,
            type: 'POST',
            beforeSend: function () {
                dx_LoaderTrinity.show();
            },
            complete: function () {
                dx_LoaderTrinity.hide();
                AccHeadMasterView.variables.dx_btnSubmit.option({ disabled: false });
            },
            success: AccHeadMasterView.btnMasterSubmitOnSuccess,
            error: OnError,
        });
    },

    btnMasterSubmitOnSuccess: function (data) {
        if ($(data).find('RESPONSECODE').text() == "0") {
            DevExVariables.Toaster("success", 'Record is ' + AccHeadMasterView.variables.addedit + ' successfully');
            $('#frm_AccHeadMaster').hide();
            $('#pnlView').show();
            if (AccHeadMasterView.variables.dx_popupRecordDelete)
                AccHeadMasterView.variables.dx_popupRecordDelete.hide();
            AccHeadMasterView.variables.dx_dataGrid.refresh();
            AccHeadMasterView.ClearValues();
        }
        else {
            DevExVariables.InvalidResponseCode(data);
        }
    },

    triggerId: function (id) {
        var rowData = AccHeadMasterView.variables.dx_dataGrid.getVisibleRows()[AccHeadMasterView.variables.dx_dataGrid.getRowIndexByKey(+id)].data;
        AccHeadMasterView.variables.Masterid = id;
        AccHeadMasterView.variables.dx_txtHeadname.option({ value: rowData.headname });
        AccHeadMasterView.variables.dx_GroupName.option({ value: rowData.groupname.replace("&amp;", "&") });
        AccHeadMasterView.variables.dx_txtDescription.option({ value: rowData.description });
        AccHeadMasterView.variables.dx_numDisplayOrder.option({ value: rowData.displayorder });
        AccHeadMasterView.variables.dx_ShowAs.option({ value: rowData.showas });
        AccHeadMasterView.variables.dx_switchGroupActive.option({ value: rowData.groupactive });
        AccHeadMasterView.variables.dx_FinalAccount.option({ value: rowData.finelaccount.replace("&amp;", "&") });
        AccHeadMasterView.variables.dx_switchIsActive.option({ value: rowData.isactive });
        AccHeadMasterView.variables.dx_txtDescription.option({ value: rowData.description });
        $("#frm_AccHeadMaster").show();
        $("#pnlView").hide();

        if (isU()) {
            AccHeadMasterView.variables.dx_btnSubmit.option({ visible: true });
        }
        else {
            AccHeadMasterView.variables.dx_btnSubmit.option({ visible: false });
        }

    },

    ClearValues: function () {
        AccHeadMasterView.variables.Masterid = "";
        AccHeadMasterView.variables.Oper = 'Add';
        AccHeadMasterView.variables.addedit = "added";
        AccHeadMasterView.variables.DeleteDataObj = "";
        DevExpress.validationEngine.resetGroup("AccHeadMaster");
        AccHeadMasterView.variables.dx_txtDescription.option("value", "");
        AccHeadMasterView.variables.dx_numDisplayOrder.option("value", 0);

        $('#frm_AccHeadMaster').hide();
        $('#pnlView').show();
        AccHeadMasterView.variables.dx_dataGrid.refresh();
    },

    deleteRow: function (id) {
        var rowData = AccHeadMasterView.variables.dx_dataGrid.getVisibleRows()[AccHeadMasterView.variables.dx_dataGrid.getRowIndexByKey(+id)].data;
        AccHeadMasterView.variables.Masterid = id;
        AccHeadMasterView.variables.DeleteDataObj = rowData;
        AccHeadMasterView.variables.Oper = "Delete";

        if (AccHeadMasterView.variables.dx_popupRecordDelete) {
            AccHeadMasterView.variables.dx_popupRecordDelete.option("contentTemplate", AccHeadMasterView.variables.DeletePopUpOptions.contentTemplate(AccHeadMasterView.variables.DeleteDataObj).bind(this));
        }
        else {
            AccHeadMasterView.variables.dx_popupRecordDelete = $("#dx_popupRecordDelete").dxPopup(AccHeadMasterView.variables.DeletePopUpOptions).dxPopup("instance");
        }

        AccHeadMasterView.variables.dx_popupRecordDelete.show();
    },
}

$(document).ready(function () {
    AccHeadMasterView.FormInitialize();
    AccHeadMasterView.initializeDevExgrid();
});