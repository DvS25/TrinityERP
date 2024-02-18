var LockerView = {
    variables: {
        BindGroupListUrl: "/Common/BindMastersDetails?ServiceName=LOCKERMASTER_GET",
        PerformMasterOperationUrl: "/Common/OpeartionsOnMaster?ServiceName=LOCKERMASTER_CRUD",
        BindStaticDataUrl: "/Common/BindMastersDetails?ServiceName=STATIC_MASTER_GET&IsActive=true",
        Oper: 'Add',
        addedit: "added",
        Masterid: "",
        dx_btnAddNew: "",
        dx_txtLockerId: "",
        dx_txtLocker: "",
        dx_txtDescription: "",
        dx_switchIsActive: "",
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
                    $("<p>Locker name: <span>" + LockerView.variables.DeleteDataObj.lockermasterid + "</span></p>")
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
                            "LOCKERMASTERID": LockerView.variables.Masterid,
                            "oper": LockerView.variables.Oper,
                        }

                        LockerView.savedata(data);
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

        LockerView.variables.dx_txtLocker = $("#dx_txtLocker").dxTextBox({
            placeholder: "Enter Locker Name...",
        }).dxValidator({
            validationGroup: "LockerMaster",
            validationRules: [{
                type: "required",
                message: "Locker Name is required"
            }]
        }).dxTextBox("instance");

        LockerView.variables.dx_txtDescription = $("#dx_txtDescription").dxTextArea({
            height: 110
        }).dxTextArea("instance");

        LockerView.variables.dx_switchIsActive = $("#dx_switchIsActive").dxSwitch({
            value: true,
            switchedOnText: "Yes",
            switchedOffText: "No"
        }).dxValidator({
            validationGroup: "LockerMaster",
            validationRules: []
        }).dxSwitch("instance");

        LockerView.variables.dx_btnSubmit = $("#dx_btnSubmit").dxButton({
            icon: "check",
            text: "Submit",
            type: "success",
            validationGroup: "LockerMaster",
            onClick: function (e) {
                var validation = DevExpress.validationEngine.validateGroup("LockerMaster");
                if (!validation.isValid) {
                    DevExVariables.Toaster("warning", "Please fill all required fields before submit.");
                    return;
                }

                LockerView.btnMasterSubmit();

                e.validationGroup.reset();
            }
        }).dxButton("instance");

        LockerView.variables.dx_btnCancel = $("#dx_btnCancel").dxButton({
            icon: "close",
            text: "Cancel",
            type: "danger",
            validationGroup: "LockerMaster",
            onClick: function (e) {
                LockerView.ClearValues();
            }
        }).dxButton("instance");

        LockerView.variables.dx_btnAddNew = $("#dx_btnAddNew").dxButton({
            stylingMode: "outlined",
            icon: "plus",
            text: "Add New",
            type: "default",
            validationGroup: "LockerMaster",
            onClick: function (e) {
                LockerView.variables.Masterid = "";

                $("#frm_LockerMaster").show();
                $("#pnlView").hide();

                LockerView.variables.dx_txtLocker.focus();
            }
        }).dxButton("instance");

    },

    initializeDevExgrid: function () {
        LockerView.variables.dx_dataGrid = $("#dx_dataGrid").dxDataGrid({
            dataSource: new DevExpress.data.CustomStore({
                key: "lockermasterid",
                load: function (loadOptions) {
                    var deferred = $.Deferred();

                    var result = DevExVariables.GetDataList(loadOptions, LockerView.variables.BindGroupListUrl);

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
            columns: [
                { dataField: "lockermasterid", caption: "Locker Id", dataType: "string", filterOperations: ["contains"], visible: false, allowSorting: true, allowFiltering: true, allowHeaderFiltering: false },
                { dataField: "lockername", caption: "Locker Name", dataType: "string", filterOperations: ["contains"], allowSorting: true, allowFiltering: true, allowHeaderFiltering: false },
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
                        DevExVariables.LabelTemplate(container, options);
                    }
                },
                {
                    dataField: "Action", caption: "Action", alignment: "center", allowFiltering: false, allowSorting: false, fixed: true, fixedPosition: "right",
                    cellTemplate: function (container, options) {
                        DevExVariables.ActionTemplate(container, options, true, true, "LockerView");
                    }
                },
            ]
        }).dxDataGrid("instance");
    },

    triggerId: function (id) {
        var rowData = LockerView.variables.dx_dataGrid.getVisibleRows()[LockerView.variables.dx_dataGrid.getRowIndexByKey(+id)].data;
        LockerView.variables.Masterid = id;
        LockerView.variables.dx_txtLocker.option({ value: rowData.lockername });
        LockerView.variables.dx_switchIsActive.option({ value: rowData.isactive });
        LockerView.variables.dx_txtDescription.option({ value: rowData.description });
        $("#frm_LockerMaster").show();
        $("#pnlView").hide();

        if (isU()) {
            LockerView.variables.dx_btnSubmit.option({ visible: true });
        }
        else {
            LockerView.variables.dx_btnSubmit.option({ visible: false });
        }
    },

    btnMasterSubmit: function () {
            LockerView.variables.Oper = 'Add';
        LockerView.variables.addedit = "added";

        if (LockerView.variables.Masterid != "0" && parseInt(LockerView.variables.Masterid) > 0) {
            LockerView.variables.Oper = 'Edit';
            LockerView.variables.addedit = 'updated';
        }

        LockerView.variables.dx_btnSubmit.option({ disabled: true });

        var data = {
            "LOCKERMASTERID": LockerView.variables.Masterid,
            "LOCKERNAME": LockerView.variables.dx_txtLocker.option().value,
            "DESCRIPTION": LockerView.variables.dx_txtDescription.option().value,
            "ISACTIVE": LockerView.variables.dx_switchIsActive.option().value,
            "oper": LockerView.variables.Oper,
        }

        LockerView.savedata(data);
    },

    savedata: function (data) {
        $.ajax({
            url: getDomain() + LockerView.variables.PerformMasterOperationUrl,
            data: data,
            async: true,
            cache: false,
            type: 'POST',
            beforeSend: function () {
                dx_LoaderTrinity.show();
            },
            complete: function () {
                dx_LoaderTrinity.hide();
                LockerView.variables.dx_btnSubmit.option({ disabled: false });
            },
            success: LockerView.btnMasterSubmitOnSuccess,
            error: OnError,
        });
    },

    btnMasterSubmitOnSuccess: function (data) {
        if ($(data).find('RESPONSECODE').text() == "0") {
            DevExVariables.Toaster("success", 'Record is ' + LockerView.variables.addedit + ' successfully');
            $('#frm_LockerMaster').hide();
            $('#pnlView').show();
            if (LockerView.variables.dx_popupRecordDelete)
                LockerView.variables.dx_popupRecordDelete.hide();

            LockerView.ClearValues();
            LockerView.variables.dx_dataGrid.refresh();
        }
        else {
            DevExVariables.InvalidResponseCode(data);
        }
    },

    ClearValues: function () {
        LockerView.variables.Masterid = "";
        LockerView.variables.Oper = 'Add';
        LockerView.variables.addedit = "added";
        LockerView.variables.DeleteDataObj = "";
        DevExpress.validationEngine.resetGroup("LockerMaster");

        $('#frm_LockerMaster').hide();
        $('#pnlView').show();

    },

    deleteRow: function (id) {
        var rowData = LockerView.variables.dx_dataGrid.getVisibleRows()[LockerView.variables.dx_dataGrid.getRowIndexByKey(+id)].data;
        LockerView.variables.Masterid = id;
        LockerView.variables.DeleteDataObj = rowData;
        LockerView.variables.Oper = "Delete";

        if (LockerView.variables.dx_popupRecordDelete) {
            LockerView.variables.dx_popupRecordDelete.option("contentTemplate", LockerView.variables.DeletePopUpOptions.contentTemplate(LockerView.variables.DeleteDataObj).bind(this));
        }
        else {
            LockerView.variables.dx_popupRecordDelete = $("#dx_popupRecordDelete").dxPopup(LockerView.variables.DeletePopUpOptions).dxPopup("instance");
        }

        LockerView.variables.dx_popupRecordDelete.show();
    }

}




$(document).ready(function () {
    LockerView.FormInitialize();
    LockerView.initializeDevExgrid();
    //LockerView.GetRmCateList();
});