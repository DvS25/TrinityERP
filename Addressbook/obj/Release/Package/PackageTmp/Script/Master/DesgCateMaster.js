var DesgCateMasterView = {
    variables: {
        BindGroupListUrl: "/Common/BindMastersDetails?ServiceName=PRD_DESGCATE_MASTER_GET",
        PerformMasterOperationUrl: "/Common/OpeartionsOnMaster?ServiceName=PRD_DESGCATE_MASTER_CRUD",
        BindStaticDataUrl: "/Common/BindMastersDetails?ServiceName=STATIC_MASTER_GET&IsActive=true",
        Oper: 'Add',
        addedit: "added",
        Masterid: "",
        dx_btnAddNew: "",
        dx_txtDesgCate: "",
        dx_numPurityPer: "",
        dx_switchIsActive: "",
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
                    $("<p>DesgCateId :<span>" + DesgCateMasterView.variables.DeleteDataObj.desgcateid + "</span></p>"),
                    $("<p>DesgCate :<span>" + DesgCateMasterView.variables.DeleteDataObj.desgcate + "</span></p>")
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
                            "DESGCATEID": DesgCateMasterView.variables.Masterid,
                            "oper": DesgCateMasterView.variables.Oper,
                        }

                        DesgCateMasterView.savedata(data);
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

    initializeDevExgrid: function () {
        DesgCateMasterView.variables.dx_dataGrid = $("#dx_dataGrid").dxDataGrid({
            dataSource: new DevExpress.data.CustomStore({
                key: "desgcateid",
                load: function (loadOptions) {
                    var deferred = $.Deferred();

                    var result = DevExVariables.GetDataList(loadOptions, DesgCateMasterView.variables.BindGroupListUrl);

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
            columns: [{ dataField: "desgcateid", allowFiltering: false, allowSorting: true, sortIndex: 1, sortOrder: "desc", visible: false },
                { dataField: "desgcate", caption: "Design Category", dataType: "string", filterOperations: ["contains"], allowSorting: true, allowFiltering: true, allowHeaderFiltering: false },
                { dataField: "displayorder", caption: "Display Order", dataType: "string", filterOperations: ["contains"], allowSorting: true, allowFiltering: false, allowHeaderFiltering: false },
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
                                    DesgCateMasterView.EditFromGrid(data.value, options.key, 'Active');
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
                        DevExVariables.ActionTemplate(container, options, true, true, "DesgCateMasterView");
                    }
                },
            ]
        }).dxDataGrid("instance");
    },

    triggerId: function (id) {
        var rowData = DesgCateMasterView.variables.dx_dataGrid.getVisibleRows()[DesgCateMasterView.variables.dx_dataGrid.getRowIndexByKey(+id)].data;
        DesgCateMasterView.variables.Masterid = id;
        DesgCateMasterView.variables.dx_txtDesgCate.option({ value: rowData.desgcate});
        DesgCateMasterView.variables.dx_numDisplayOrder.option({ value: rowData.displayorder });
        DesgCateMasterView.variables.dx_switchIsActive.option({ value: rowData.isactive });
        DesgCateMasterView.variables.dx_txtDescription.option({ value: rowData.description });
        $("#frm_DesgCateMaster").show();
        $("#pnlView").hide();

        if (isU()) {
            DesgCateMasterView.variables.dx_btnSubmit.option({ visible: true });
        }
        else {
            DesgCateMasterView.variables.dx_btnSubmit.option({ visible: false });
        }
    },

    deleteRow: function (id) {
        var rowData = DesgCateMasterView.variables.dx_dataGrid.getVisibleRows()[DesgCateMasterView.variables.dx_dataGrid.getRowIndexByKey(+id)].data;
        DesgCateMasterView.variables.Masterid = id;
        DesgCateMasterView.variables.DeleteDataObj = rowData;
        DesgCateMasterView.variables.Oper = "Delete";

        if (DesgCateMasterView.variables.dx_popupRecordDelete) {
            DesgCateMasterView.variables.dx_popupRecordDelete.option("contentTemplate", DesgCateMasterView.variables.DeletePopUpOptions.contentTemplate(DesgCateMasterView.variables.DeleteDataObj).bind(this));
        }
        else {
            DesgCateMasterView.variables.dx_popupRecordDelete = $("#dx_popupRecordDelete").dxPopup(DesgCateMasterView.variables.DeletePopUpOptions).dxPopup("instance");
        }

        DesgCateMasterView.variables.dx_popupRecordDelete.show();
    },

    btnMasterSubmit: function () {
        DesgCateMasterView.variables.Oper = 'Add';
        DesgCateMasterView.variables.addedit = "added";

        if (DesgCateMasterView.variables.Masterid != "0" && parseInt(DesgCateMasterView.variables.Masterid) > 0) {
            DesgCateMasterView.variables.Oper = 'Edit';
            DesgCateMasterView.variables.addedit = 'updated';
        }

        DesgCateMasterView.variables.dx_btnSubmit.option({ disabled: true });

        var data = {
            "DESGCATEID": DesgCateMasterView.variables.Masterid,
            "DESGCATE": DesgCateMasterView.variables.dx_txtDesgCate.option().value,
            "DISPLAYORDER": DesgCateMasterView.variables.dx_numDisplayOrder.option().value,
            "DESCRIPTION": DesgCateMasterView.variables.dx_txtDescription.option().value,
            "ISACTIVE": DesgCateMasterView.variables.dx_switchIsActive.option().value,
            "oper": DesgCateMasterView.variables.Oper,
        }

        if (DesgCateMasterView.variables.dx_txtDescription.option().value)
            data.DESCRIPTION = DesgCateMasterView.variables.dx_txtDescription.option().value;

        DesgCateMasterView.savedata(data);
    },

    savedata: function (data) {
        $.ajax({
            url: getDomain() + DesgCateMasterView.variables.PerformMasterOperationUrl,
            data: data,
            async: true,
            cache: false,
            type: 'POST',
            beforeSend: function () {
                dx_LoaderTrinity.show();
            },
            complete: function () {
                dx_LoaderTrinity.hide();
                DesgCateMasterView.variables.dx_btnSubmit.option({ disabled: false });
            },
            success: DesgCateMasterView.btnMasterSubmitOnSuccess,
            error: OnError,
        });
    },

    btnMasterSubmitOnSuccess: function (data) {
        if ($(data).find('RESPONSECODE').text() == "0") {
            DevExVariables.Toaster("success", 'Record is ' + DesgCateMasterView.variables.addedit + ' successfully');
            $('#frm_DesgCateMaster').hide();
            $('#pnlView').show();
            if (DesgCateMasterView.variables.dx_popupRecordDelete)
                DesgCateMasterView.variables.dx_popupRecordDelete.hide();

            DesgCateMasterView.ClearValues();
            DesgCateMasterView.variables.dx_dataGrid.refresh();
        }
        else {
            DevExVariables.InvalidResponseCode(data);
        }
    },

    ClearValues: function () {
        DesgCateMasterView.variables.Masterid = "";
        DesgCateMasterView.variables.Oper = 'Add';
        DesgCateMasterView.variables.addedit = "added";
        DesgCateMasterView.variables.DeleteDataObj = "";
        DevExpress.validationEngine.resetGroup("DesgCateMaster");
        DesgCateMasterView.variables.dx_txtDescription.option("value", "");
        DesgCateMasterView.variables.dx_numDisplayOrder.option("value", 0);

        $('#frm_DesgCateMaster').hide();
        $('#pnlView').show();
    },

    FormInitialize: function () {
        DesgCateMasterView.variables.dx_txtDesgCate = $("#dx_txtDesgCate").dxTextBox({
            placeholder: "Enter Design Category...",
        }).dxValidator({
            validationGroup: "DesgCateMaster",
            validationRules: [{
                type: "required",
                message: "Design Category is required"
            }]
        }).dxTextBox("instance");

        DesgCateMasterView.variables.dx_numDisplayOrder = $("#dx_numDisplayOrder").dxNumberBox({
            placeholder: "Enter Display Order...",
            min: 0,
        }).dxValidator({
            validationGroup: "DesgCateMaster",
            validationRules: [{
                type: "required",
                message: "Display Order is required"
            }]
        }).dxNumberBox("instance");

        DesgCateMasterView.variables.dx_switchIsActive = $("#dx_switchIsActive").dxSwitch({
            value: true,
            switchedOnText: "Yes",
            switchedOffText: "No"
        }).dxValidator({
            validationGroup: "DesgCateMaster",
            validationRules: []
        }).dxSwitch("instance");

        DesgCateMasterView.variables.dx_txtDescription = $("#dx_txtDescription").dxTextArea({
            height: 110
        }).dxTextArea("instance");

        DesgCateMasterView.variables.dx_btnSubmit = $("#dx_btnSubmit").dxButton({
            icon: "check",
            text: "Submit",
            type: "success",
            validationGroup: "DesgCateMaster",
            onClick: function (e) {
                var validation = DevExpress.validationEngine.validateGroup("DesgCateMaster");
                if (!validation.isValid) {
                    DevExVariables.Toaster("warning", "Please fill all required fields before submit.");
                    return;
                }

                DesgCateMasterView.btnMasterSubmit();

                //e.validationGroup.reset();
            }
        }).dxButton("instance");

        DesgCateMasterView.variables.dx_btnCancel = $("#dx_btnCancel").dxButton({
            icon: "close",
            text: "Cancel",
            type: "danger",
            validationGroup: "DesgCateMaster",
            onClick: function (e) {
                DesgCateMasterView.ClearValues();
            }
        }).dxButton("instance");

        DesgCateMasterView.variables.dx_btnAddNew = $("#dx_btnAddNew").dxButton({
            stylingMode: "outlined",
            icon: "plus",
            text: "Add New",
            type: "default",
            validationGroup: "DesgCateMaster",
            onClick: function (e) {
                DesgCateMasterView.variables.Masterid = "";

                $("#frm_DesgCateMaster").show();
                $("#pnlView").hide();

                DesgCateMasterView.variables.dx_txtDesgCate.focus();
            }
        }).dxButton("instance");
    },

    EditFromGrid: function (val, id, type) {
        var data = {
            "DESGCATEID": id,
            "OPER_TYPE": "EditFromGrid"
        }

        if (type == "Active")
            data.ISACTIVE = val;

        $.ajax({
            url: getDomain() + DesgCateMasterView.variables.PerformMasterOperationUrl,
            data: data,
            async: true,
            cache: false,
            type: 'POST',
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    DevExVariables.Toaster("success", 'Record is updated successfully.');

                    DesgCateMasterView.variables.dx_dataGrid.refresh();
                }
            },
            error: OnError,
        });
    },

};

$(document).ready(function () {
    DesgCateMasterView.FormInitialize();

    DesgCateMasterView.initializeDevExgrid();
});