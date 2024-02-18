var RmShapeMasterView = {
    variables: {
        BindGroupListUrl: "/Common/BindMastersDetails?ServiceName=PRD_RMSHAPE_MASTER_GET",
        PerformMasterOperationUrl: "/Common/OpeartionsOnMaster?ServiceName=PRD_RMSHAPE_MASTER_CRUD",
        BindStaticDataUrl: "/Common/BindMastersDetails?ServiceName=STATIC_MASTER_GET&IsActive=true",
        Oper: 'Add',
        addedit: "added",
        Masterid: "",
        dx_btnAddNew: "",
        dx_txtRMShapeId: "",
        dx_txtRMShape: "",
        dx_txtRMCateId: "",
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
                    $("<p>RM Shape: <span>" + RmShapeMasterView.variables.DeleteDataObj.shape + "</span></p>")
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
                            "SHAPEID": RmShapeMasterView.variables.Masterid,
                            "oper": RmShapeMasterView.variables.Oper,
                        }

                        RmShapeMasterView.savedata(data);
                    },
                }
            }],
            showTitle: true,
            title: "Delete Record?",
            visible: false,
            dragEnabled: false,
            closeOnOutsideClick: true
        },
        RmCateList: [],
    },

    FormInitialize: function () {

        RmShapeMasterView.variables.dx_txtRMShape = $("#dx_txtRMShape").dxTextBox({
            placeholder: "Enter RM Shape Name...",
        }).dxValidator({
            validationGroup: "RmShapeMaster",
            validationRules: [{
                type: "required",
                message: "RM Shape Name is required"
            }]
        }).dxTextBox("instance");

        RmShapeMasterView.variables.dx_txtDescription = $("#dx_txtDescription").dxTextArea({
            height: 110
        }).dxTextArea("instance");

        RmShapeMasterView.variables.dx_txtRMCateId = $("#dx_txtRMCateId").dxSelectBox({
            placeholder: "Select Rm Category Id...",
            searchEnabled: true,
        }).dxValidator({
            validationGroup: "RmShapeMaster",
            validationRules: [{
                type: "required",
                message: "RM Category required"
            }]
        }).dxSelectBox("instance");


        RmShapeMasterView.variables.dx_switchIsActive = $("#dx_switchIsActive").dxSwitch({
            value: true,
            switchedOnText: "Yes",
            switchedOffText: "No"
        }).dxValidator({
            validationGroup: "RmShapeMaster",
            validationRules: []
        }).dxSwitch("instance");

        RmShapeMasterView.variables.dx_btnSubmit = $("#dx_btnSubmit").dxButton({
            icon: "check",
            text: "Submit",
            type: "success",
            validationGroup: "RmShapeMaster",
            onClick: function (e) {
                var validation = DevExpress.validationEngine.validateGroup("RmShapeMaster");
                if (!validation.isValid) {
                    DevExVariables.Toaster("warning", "Please fill all required fields before submit.");
                    return;
                }

                RmShapeMasterView.btnMasterSubmit();

                e.validationGroup.reset();
            }
        }).dxButton("instance");

        RmShapeMasterView.variables.dx_btnCancel = $("#dx_btnCancel").dxButton({
            icon: "close",
            text: "Cancel",
            type: "danger",
            validationGroup: "RmShapeMaster",
            onClick: function (e) {
                RmShapeMasterView.ClearValues();
            }
        }).dxButton("instance");

        RmShapeMasterView.variables.dx_btnAddNew = $("#dx_btnAddNew").dxButton({
            stylingMode: "outlined",
            icon: "plus",
            text: "Add New",
            type: "default",
            validationGroup: "RmShapeMaster",
            onClick: function (e) {
                RmShapeMasterView.variables.Masterid = "";

                $("#frm_RmShapeMaster").show();
                $("#pnlView").hide();

                RmShapeMasterView.variables.dx_txtRMShape.focus();
            }
        }).dxButton("instance");

    },

    initializeDevExgrid: function () {
        RmShapeMasterView.variables.dx_dataGrid = $("#dx_dataGrid").dxDataGrid({
            dataSource: new DevExpress.data.CustomStore({
                key: "shapeid",
                load: function (loadOptions) {
                    var deferred = $.Deferred();

                    var result = DevExVariables.GetDataList(loadOptions, RmShapeMasterView.variables.BindGroupListUrl);

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
                { dataField: "shapeid", allowFiltering: false, allowSorting: true, sortIndex: 1, sortOrder: "desc", visible: false },
                { dataField: "shape", caption: "RM Shape", dataType: "string", filterOperations: ["contains"], allowSorting: true, allowFiltering: true, allowHeaderFiltering: false },
                { dataField: "rmcate", caption: "RM Category", dataType: "string", filterOperations: ["contains"], allowSorting: true, allowFiltering: true, allowHeaderFiltering: false },
                { dataField: "description", caption: "Description", dataType: "string", filterOperations: ["contains"], allowSorting: true, allowFiltering: false, allowHeaderFiltering: false },
                //{ dataField: "rmcateid", caption: "Rm Catagory Id", dataType: "string", filterOperations: ["contains"], allowSorting: true, allowFiltering: true, allowHeaderFiltering: false },
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
                        DevExVariables.ActionTemplate(container, options, true, true, "RmShapeMasterView");
                    }
                },
            ]
        }).dxDataGrid("instance");
    },

    GetRmCateList: function () {
        var myfilter = { rules: [] };
        myfilter.rules.push({ field: "TYPE", op: "eq", data: "rmcate" });
        myfilter.rules.push({ field: "RMGROUP", op: "eq", data: "MATERIAL,METAL,LABOUR" });
        $.ajax({
            url: getDomain() + RmShapeMasterView.variables.BindStaticDataUrl + "&myfilters=" + JSON.stringify(myfilter),
            async: true,
            cache: false,
            type: 'POST',
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    var JsonObject = xml2json.parser(data);
                    if (JsonObject.serviceresponse.detailslist) {
                        var List = [];
                        if (JsonObject.serviceresponse.detailslist.details.length) {
                            List = JsonObject.serviceresponse.detailslist.details;
                        }
                        else {
                            List.push(JsonObject.serviceresponse.detailslist.details);
                        }

                        RmShapeMasterView.variables.dx_txtRMCateId.option({
                            dataSource: new DevExpress.data.ArrayStore({
                                data: List,
                                key: 'rmcateid',
                            }),
                            displayExpr: 'rmcate',
                            valueExpr: 'rmcateid',
                        });
                    }
                }
                else {
                    DevExVariables.InvalidResponseCode(data);
                }
            },
            error: OnError
        });
    },

    triggerId: function (id) {
        var rowData = RmShapeMasterView.variables.dx_dataGrid.getVisibleRows()[RmShapeMasterView.variables.dx_dataGrid.getRowIndexByKey(+id)].data;
        RmShapeMasterView.variables.Masterid = id;
        RmShapeMasterView.variables.dx_txtRMShape.option({ value: rowData.shape });
        RmShapeMasterView.variables.dx_txtRMCateId.option({ value: rowData.rmcateid });
        RmShapeMasterView.variables.dx_switchIsActive.option({ value: rowData.isactive });
        RmShapeMasterView.variables.dx_txtDescription.option({ value: rowData.description });
        $("#frm_RmShapeMaster").show();
        $("#pnlView").hide();

        if (isU()) {
            RmShapeMasterView.variables.dx_btnSubmit.option({ visible: true });
        }
        else {
            RmShapeMasterView.variables.dx_btnSubmit.option({ visible: false });
        }
    },

    btnMasterSubmit: function () {
        RmShapeMasterView.variables.Oper = 'Add';
        RmShapeMasterView.variables.addedit = "added";

        if (RmShapeMasterView.variables.Masterid != "0" && parseInt(RmShapeMasterView.variables.Masterid) > 0) {
            RmShapeMasterView.variables.Oper = 'Edit';
            RmShapeMasterView.variables.addedit = 'updated';
        }

        RmShapeMasterView.variables.dx_btnSubmit.option({ disabled: true });

        var data = {
            "SHAPEID": RmShapeMasterView.variables.Masterid,
            "SHAPE": RmShapeMasterView.variables.dx_txtRMShape.option().value,
            "RMCATEID": RmShapeMasterView.variables.dx_txtRMCateId.option().value,
            "DESCRIPTION": RmShapeMasterView.variables.dx_txtDescription.option().value,
            "ISACTIVE": RmShapeMasterView.variables.dx_switchIsActive.option().value,
            "oper": RmShapeMasterView.variables.Oper,
        }

        if (RmShapeMasterView.variables.dx_txtRMCateId.option().value)
            data.CATEID = RmShapeMasterView.variables.dx_txtRMCateId.option().value;

        RmShapeMasterView.savedata(data);
    },

    savedata: function (data) {
        $.ajax({
            url: getDomain() + RmShapeMasterView.variables.PerformMasterOperationUrl,
            data: data,
            async: true,
            cache: false,
            type: 'POST',
            beforeSend: function () {
                dx_LoaderTrinity.show();
            },
            complete: function () {
                dx_LoaderTrinity.hide();
                RmShapeMasterView.variables.dx_btnSubmit.option({ disabled: false });
            },
            success: RmShapeMasterView.btnMasterSubmitOnSuccess,
            error: OnError,
        });
    },

    btnMasterSubmitOnSuccess: function (data) {
        if ($(data).find('RESPONSECODE').text() == "0") {
            DevExVariables.Toaster("success", 'Record is ' + RmShapeMasterView.variables.addedit + ' successfully');
            $('#frm_RmShapeMaster').hide();
            $('#pnlView').show();
            if (RmShapeMasterView.variables.dx_popupRecordDelete)
                RmShapeMasterView.variables.dx_popupRecordDelete.hide();

            RmShapeMasterView.ClearValues();
            RmShapeMasterView.variables.dx_dataGrid.refresh();
        }
        else {
            DevExVariables.InvalidResponseCode(data);
        }
    },

    ClearValues: function () {
        RmShapeMasterView.variables.Masterid = "";
        RmShapeMasterView.variables.Oper = 'Add';
        RmShapeMasterView.variables.addedit = "added";
        RmShapeMasterView.variables.DeleteDataObj = "";
        DevExpress.validationEngine.resetGroup("RmShapeMaster");

        $('#frm_RmShapeMaster').hide();
        $('#pnlView').show();

    },

    deleteRow: function (id) {
        var rowData = RmShapeMasterView.variables.dx_dataGrid.getVisibleRows()[RmShapeMasterView.variables.dx_dataGrid.getRowIndexByKey(+id)].data;
        RmShapeMasterView.variables.Masterid = id;
        RmShapeMasterView.variables.DeleteDataObj = rowData;
        RmShapeMasterView.variables.Oper = "Delete";

        if (RmShapeMasterView.variables.dx_popupRecordDelete) {
            RmShapeMasterView.variables.dx_popupRecordDelete.option("contentTemplate", RmShapeMasterView.variables.DeletePopUpOptions.contentTemplate(RmShapeMasterView.variables.DeleteDataObj).bind(this));
        }
        else {
            RmShapeMasterView.variables.dx_popupRecordDelete = $("#dx_popupRecordDelete").dxPopup(RmShapeMasterView.variables.DeletePopUpOptions).dxPopup("instance");
        }

        RmShapeMasterView.variables.dx_popupRecordDelete.show();
    }

}

$(document).ready(function () {
    RmShapeMasterView.FormInitialize();
    RmShapeMasterView.initializeDevExgrid();
    RmShapeMasterView.GetRmCateList();
});