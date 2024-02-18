var DepartmentMasterView = {

    variables: {
        BindGroupListUrl: "/Common/BindMastersDetails?ServiceName=PRD_DEPARTMENT_MASTER_GET",
        PerformMasterOperationUrl: "/Common/OpeartionsOnMaster?ServiceName=PRD_DEPARTMENT_MASTER_CRUD",
        BindStaticDataUrl: "/Common/BindMastersDetails?ServiceName=STATIC_MASTER_GET&IsActive=true",
        Oper: 'Add',
        addedit: "added",
        Masterid: "",
        dx_btnAddNew: "",
        dx_txtDept: "",
        dx_ddlBranch: "",
        dx_ddlCompany: "",
        dx_switchIsActiveOnWeb: "",
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
                    $("<p>Department: <span>" + DepartmentMasterView.variables.DeleteDataObj.department + "</span></p>")
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
                            "DEPARTMENTID": DepartmentMasterView.variables.Masterid,
                            "oper": DepartmentMasterView.variables.Oper,
                        }

                        DepartmentMasterView.savedata(data);
                    },
                }
            }],
            showTitle: true,
            title: "Delete Record?",
            visible: false,
            dragEnabled: false,
            closeOnOutsideClick: true
        },

        BranchList: [],
        CompanyList: [],
    },

    FormInitialize: function () {
        DepartmentMasterView.variables.dx_txtDept = $("#dx_txtDept").dxTextBox({
            placeholder: "Enter Department...",
        }).dxValidator({
            validationGroup: "RmDepartmentMaster",
            validationRules: [{
                type: "required",
                message: "Department is required"
            }]
        }).dxTextBox("instance");

        DepartmentMasterView.variables.dx_switchIsActive = $("#dx_switchIsActive").dxSwitch({
            value: true,
            switchedOnText: "Yes",
            switchedOffText: "No"
        }).dxValidator({
            validationGroup: "RmDepartmentMaster",
            validationRules: []
        }).dxSwitch("instance");

        DepartmentMasterView.variables.dx_txtDescription = $("#dx_txtDescription").dxTextArea({
            height: 110
        }).dxValidator({
            validationGroup: "RmDepartmentMaster",
            validationRules: []
        }).dxTextArea("instance");

        DepartmentMasterView.variables.dx_btnSubmit = $("#dx_btnSubmit").dxButton({
            icon: "check",
            text: "Submit",
            type: "success",
            validationGroup: "RmDepartmentMaster",
            onClick: function (e) {
                var validation = DevExpress.validationEngine.validateGroup("RmDepartmentMaster");
                if (!validation.isValid) {
                    DevExVariables.Toaster("warning", "Please fill all required fields before submit.");
                    return;
                }

                DepartmentMasterView.btnMasterSubmit();

                //e.validationGroup.reset();
            }
        }).dxButton("instance");

        DepartmentMasterView.variables.dx_btnCancel = $("#dx_btnCancel").dxButton({
            icon: "close",
            text: "Cancel",
            type: "danger",
            validationGroup: "RmDepartmentMaster",
            onClick: function (e) {
                DepartmentMasterView.ClearValues();
            }
        }).dxButton("instance");

        DepartmentMasterView.variables.dx_btnAddNew = $("#dx_btnAddNew").dxButton({
            stylingMode: "outlined",
            icon: "plus",
            text: "Add New",
            type: "default",
            validationGroup: "RmDepartmentMaster",
            onClick: function (e) {
                DepartmentMasterView.variables.Masterid = "";

                $("#frm_DepartmentMaster").show();
                $("#pnlView").hide();

                DepartmentMasterView.variables.dx_txtDept.focus();
            }
        }).dxButton("instance");
    },

    initializeDevExgrid: function () {
        DepartmentMasterView.variables.dx_dataGrid = $("#dx_dataGrid").dxDataGrid({
            dataSource: new DevExpress.data.CustomStore({
                key: "departmentid",
                load: function (loadOptions) {
                    var deferred = $.Deferred();

                    var result = DevExVariables.GetDataList(loadOptions, DepartmentMasterView.variables.BindGroupListUrl);

                    if (result != "Error") {
                        if (result.serviceresponse.detailslist) {
                            var List = [];
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
            columns: [{ dataField: "departmentid", allowFiltering: false, allowSorting: true, sortIndex: 1, sortOrder: "desc", visible: false },
                { dataField: "department", caption: "Department", dataType: "string", filterOperations: ["contains"], allowSorting: true, allowFiltering: true, allowHeaderFiltering: false },
                { dataField: "companyname", caption: "Company", dataType: "string", filterOperations: ["contains"], allowSorting: true, allowFiltering: true, allowHeaderFiltering: false },
                { dataField: "branchname", caption: "Branch", dataType: "string", filterOperations: ["contains"], allowSorting: true, allowFiltering: true, allowHeaderFiltering: false },
                { dataField: "description", caption: "Description", dataType: "string", filterOperations: ["contains"], allowSorting: true, allowFiltering: false, allowHeaderFiltering: false },
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
                        if (isU()) {
                            $("<div>").dxSwitch({
                                value: options.value,
                                switchedOnText: "Yes",
                                switchedOffText: "No",
                                onValueChanged: function (data) {
                                    DepartmentMasterView.EditFromGrid(data.value, options.key, 'Active');
                                }
                            }).appendTo(container);
                        }
                        else
                            DevExVariables.LabelTemplate(container, options);
                    }
                },
               
                {
                    dataField: "Action", caption: "Action", alignment: "center", allowFiltering: false, allowSorting: false, fixed: true, fixedPosition: "right",
                    cellTemplate: function (container, options) {
                        DevExVariables.ActionTemplate(container, options, true, true, "DepartmentMasterView");
                    }
                },
            ]
        }).dxDataGrid("instance");
    },

    triggerId: function (id) {
        var rowData = DepartmentMasterView.variables.dx_dataGrid.getVisibleRows()[DepartmentMasterView.variables.dx_dataGrid.getRowIndexByKey(+id)].data;
        DepartmentMasterView.variables.Masterid = id;
        DepartmentMasterView.variables.dx_txtDept.option({ value: rowData.department });
        DepartmentMasterView.variables.dx_switchIsActive.option({ value: rowData.isactive });
        DepartmentMasterView.variables.dx_txtDescription.option({ value: rowData.description });
        $("#frm_DepartmentMaster").show();
        $("#pnlView").hide();

        if (isU()) {
            DepartmentMasterView.variables.dx_btnSubmit.option({ visible: true });
        }
        else {
            DepartmentMasterView.variables.dx_btnSubmit.option({ visible: false });
        }

    },

    ClearValues: function () {
        DepartmentMasterView.variables.Masterid = "";
        DepartmentMasterView.variables.Oper = 'Add';
        DepartmentMasterView.variables.addedit = "added";
        DepartmentMasterView.variables.DeleteDataObj = "";
        DevExpress.validationEngine.resetGroup("RmDepartmentMaster");

        $('#frm_DepartmentMaster').hide();
        $('#pnlView').show();
        DepartmentMasterView.variables.dx_dataGrid.refresh();
    },

    btnMasterSubmit: function () {
        DepartmentMasterView.variables.Oper = 'Add';
        DepartmentMasterView.variables.addedit = "added";

        if (DepartmentMasterView.variables.Masterid != "0" && parseInt(DepartmentMasterView.variables.Masterid) > 0) {
            DepartmentMasterView.variables.Oper = 'Edit';
            DepartmentMasterView.variables.addedit = 'updated';
        }

        DepartmentMasterView.variables.dx_btnSubmit.option({ disabled: true });

        var data = {
            "DEPARTMENTID": DepartmentMasterView.variables.Masterid,
            "DEPARTMENT": DepartmentMasterView.variables.dx_txtDept.option().value,
            "DESCRIPTION": DepartmentMasterView.variables.dx_txtDescription.option().value,
            "ISACTIVE": DepartmentMasterView.variables.dx_switchIsActive.option().value,
            "oper": DepartmentMasterView.variables.Oper,
        }

        DepartmentMasterView.savedata(data);
    },

    savedata: function (data) {
        $.ajax({
            url: getDomain() + DepartmentMasterView.variables.PerformMasterOperationUrl,
            data: data,
            async: true,
            cache: false,
            type: 'POST',
            beforeSend: function () {
                dx_LoaderTrinity.show();
            },
            complete: function () {
                dx_LoaderTrinity.hide();
                DepartmentMasterView.variables.dx_btnSubmit.option({ disabled: false });
            },
            success: DepartmentMasterView.btnMasterSubmitOnSuccess,
            error: OnError,
        });
    },

    btnMasterSubmitOnSuccess: function (data) {
        if ($(data).find('RESPONSECODE').text() == "0") {
            DevExVariables.Toaster("success", 'Record is ' + DepartmentMasterView.variables.addedit + ' successfully');
            $('#frm_DepartmentMaster').hide();
            $('#pnlView').show();
            if (DepartmentMasterView.variables.dx_popupRecordDelete)
                DepartmentMasterView.variables.dx_popupRecordDelete.hide();

            DepartmentMasterView.ClearValues();
            DepartmentMasterView.variables.dx_dataGrid.refresh();
        }
        else {
            DevExVariables.InvalidResponseCode(data);
        }
    },

    deleteRow: function (id) {
        var rowData = DepartmentMasterView.variables.dx_dataGrid.getVisibleRows()[DepartmentMasterView.variables.dx_dataGrid.getRowIndexByKey(+id)].data;
        DepartmentMasterView.variables.Masterid = id;
        DepartmentMasterView.variables.DeleteDataObj = rowData;
        DepartmentMasterView.variables.Oper = "Delete";

        if (DepartmentMasterView.variables.dx_popupRecordDelete) {
            DepartmentMasterView.variables.dx_popupRecordDelete.option("contentTemplate", DepartmentMasterView.variables.DeletePopUpOptions.contentTemplate(DepartmentMasterView.variables.DeleteDataObj).bind(this));
        }
        else {
            DepartmentMasterView.variables.dx_popupRecordDelete = $("#dx_popupRecordDelete").dxPopup(DepartmentMasterView.variables.DeletePopUpOptions).dxPopup("instance");
        }

        DepartmentMasterView.variables.dx_popupRecordDelete.show();
    },

    EditFromGrid: function (val, id, type) {
        var data = {
            "DEPARTMENTID": id,
            "OPER_TYPE": "EditFromGrid"
        }

        if (type == "Active")
            data.ISACTIVE = val;

        $.ajax({
            url: getDomain() + DepartmentMasterView.variables.PerformMasterOperationUrl,
            data: data,
            async: true,
            cache: false,
            type: 'POST',
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    DevExVariables.Toaster("success", 'Record is updated successfully.');

                    DepartmentMasterView.variables.dx_dataGrid.refresh();
                }
            },
            error: OnError,
        });
    },

};


$(document).ready(function () {
    DepartmentMasterView.FormInitialize();

    DepartmentMasterView.initializeDevExgrid();

});