var RmSubCateMasterView = {
    variables: {
        BindGroupListUrl: "/Common/BindMastersDetails?ServiceName=PRD_RMSUBCATE_MASTER_GET",
        PerformMasterOperationUrl: "/Common/OpeartionsOnMaster?ServiceName=PRD_RMSUBCATE_MASTER_CRUD",
        BindStaticDataUrl: "/Common/BindMastersDetails?ServiceName=STATIC_MASTER_GET&IsActive=true",
        Oper: 'Add',
        addedit: "added",
        Masterid: "",
        dx_btnAddNew: "",
        dx_txtRMSubCateId: "",
        dx_txtRMSubCate: "",
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
                    $("<p>RM Subcate: <span>" + RmSubCateMasterView.variables.DeleteDataObj.rmsubcateid + "</span></p>"),
                    $("<p>RM SubCateName: <span>" + RmSubCateMasterView.variables.DeleteDataObj.rmsubcate + "</span></p>")
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
                            "RMSUBCATEID": RmSubCateMasterView.variables.Masterid,
                            "oper": RmSubCateMasterView.variables.Oper,
                        }

                        RmSubCateMasterView.savedata(data);
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
        //RmSubCateList: []
    },

    FormInitialize: function () {

        RmSubCateMasterView.variables.dx_txtRMSubCate = $("#dx_txtRMSubCate").dxTextBox({
            placeholder: "Enter RM Sub Category Name...",
        }).dxValidator({
            validationGroup: "RmSubCateMaster",
            validationRules: [{
                type: "required",
                message: "RM Sub Category Name is required"
            }]
        }).dxTextBox("instance");

        RmSubCateMasterView.variables.dx_txtDescription = $("#dx_txtDescription").dxTextArea({
            height: 110
        }).dxTextArea("instance");

        RmSubCateMasterView.variables.dx_txtRMCateId = $("#dx_txtRMCateId").dxSelectBox({
            placeholder: "Select Rm Category Id...",
            searchEnabled: true,
        }).dxValidator({
            validationGroup: "RmSubCateMaster",
            validationRules: [{
                type: "required",
                message: "RM Group is required"
            }]
        }).dxSelectBox("instance");


        RmSubCateMasterView.variables.dx_switchIsActive = $("#dx_switchIsActive").dxSwitch({
            value: true,
            switchedOnText: "Yes",
            switchedOffText: "No"
        }).dxValidator({
            validationGroup: "RmSubCateMaster",
            validationRules: []
        }).dxSwitch("instance");

        RmSubCateMasterView.variables.dx_btnSubmit = $("#dx_btnSubmit").dxButton({
            icon: "check",
            text: "Submit",
            type: "success",
            validationGroup: "RmSubCateMaster",
            onClick: function (e) {
                var validation = DevExpress.validationEngine.validateGroup("RmSubCateMaster");
                if (!validation.isValid) {
                    DevExVariables.Toaster("warning", "Please fill all required fields before submit.");
                    return;
                }

                RmSubCateMasterView.btnMasterSubmit();

                e.validationGroup.reset();
            }
        }).dxButton("instance");

        RmSubCateMasterView.variables.dx_btnCancel = $("#dx_btnCancel").dxButton({
            icon: "close",
            text: "Cancel",
            type: "danger",
            validationGroup: "RmSubCateMaster",
            onClick: function (e) {
                RmSubCateMasterView.ClearValues();
            }
        }).dxButton("instance");

        RmSubCateMasterView.variables.dx_btnAddNew = $("#dx_btnAddNew").dxButton({
            stylingMode: "outlined",
            icon: "plus",
            text: "Add New",
            type: "default",
            validationGroup: "RmSubCateMaster",
            onClick: function (e) {
                RmSubCateMasterView.variables.Masterid = "";

                $("#frm_RmSubCateMaster").show();
                $("#pnlView").hide();

                RmSubCateMasterView.variables.dx_txtRMSubCate.focus();
            }
        }).dxButton("instance");

    },

    initializeDevExgrid: function () {
        RmSubCateMasterView.variables.dx_dataGrid = $("#dx_dataGrid").dxDataGrid({
            dataSource: new DevExpress.data.CustomStore({
                key: "rmsubcateid",
                load: function (loadOptions) {
                    var deferred = $.Deferred();

                    var result = DevExVariables.GetDataList(loadOptions, RmSubCateMasterView.variables.BindGroupListUrl);

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
                { dataField: "rmsubcateid", caption: "RmSub Category Id", dataType: "string", filterOperations: ["contains"],visible:false, allowSorting: true, allowFiltering: true, allowHeaderFiltering: false },
                { dataField: "rmsubcate", caption: "RM SubCatagory", dataType: "string", filterOperations: ["contains"], allowSorting: true, allowFiltering: true, allowHeaderFiltering: false },
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
                        DevExVariables.ActionTemplate(container, options, true, true, "RmSubCateMasterView");
                    }
                },
            ]
        }).dxDataGrid("instance");
    },

    triggerId: function (id) {
        var rowData = RmSubCateMasterView.variables.dx_dataGrid.getVisibleRows()[RmSubCateMasterView.variables.dx_dataGrid.getRowIndexByKey(+id)].data;
        RmSubCateMasterView.variables.Masterid = id;
        RmSubCateMasterView.variables.dx_txtRMSubCate.option({ value: rowData.rmsubcate});
        RmSubCateMasterView.variables.dx_txtRMCateId.option({ value: rowData.rmcateid });
        RmSubCateMasterView.variables.dx_switchIsActive.option({ value: rowData.isactive });
        RmSubCateMasterView.variables.dx_txtDescription.option({ value: rowData.description });
        $("#frm_RmSubCateMaster").show();
        $("#pnlView").hide();

        if (isU()) {
            RmSubCateMasterView.variables.dx_btnSubmit.option({ visible: true });
        }
        else {
            RmSubCateMasterView.variables.dx_btnSubmit.option({ visible: false });
        }
    },

    btnMasterSubmit: function () {
        RmSubCateMasterView.variables.Oper = 'Add';
        RmSubCateMasterView.variables.addedit = "added";

        if (RmSubCateMasterView.variables.Masterid != "0" && parseInt(RmSubCateMasterView.variables.Masterid) > 0) {
            RmSubCateMasterView.variables.Oper = 'Edit';
            RmSubCateMasterView.variables.addedit = 'updated';
        }

        RmSubCateMasterView.variables.dx_btnSubmit.option({ disabled: true });

        var data = {
            "RMSUBCATEID": RmSubCateMasterView.variables.Masterid,
            "RMSUBCATE": RmSubCateMasterView.variables.dx_txtRMSubCate.option().value,
            "RMCATEID": RmSubCateMasterView.variables.dx_txtRMCateId.option().value,
            "DESCRIPTION": RmSubCateMasterView.variables.dx_txtDescription.option().value,
            "ISACTIVE": RmSubCateMasterView.variables.dx_switchIsActive.option().value,
            "oper": RmSubCateMasterView.variables.Oper,
        }

        if (RmSubCateMasterView.variables.dx_txtRMCateId.option().value)
            data.CATEID = RmSubCateMasterView.variables.dx_txtRMCateId.option().value;

        RmSubCateMasterView.savedata(data);
    },

    savedata: function (data) {
        $.ajax({
            url: getDomain() + RmSubCateMasterView.variables.PerformMasterOperationUrl,
            data: data,
            async: true,
            cache: false,
            type: 'POST',
            beforeSend: function () {
                dx_LoaderTrinity.show();
            },
            complete: function () {
                dx_LoaderTrinity.hide();
                RmSubCateMasterView.variables.dx_btnSubmit.option({ disabled: false });
            },
            success: RmSubCateMasterView.btnMasterSubmitOnSuccess,
            error: OnError,
        });
    },

    btnMasterSubmitOnSuccess: function (data) {
        if ($(data).find('RESPONSECODE').text() == "0") {
            DevExVariables.Toaster("success", 'Record is ' + RmSubCateMasterView.variables.addedit + ' successfully');
            $('#frm_RmSubCateMaster').hide();
            $('#pnlView').show();
            if (RmSubCateMasterView.variables.dx_popupRecordDelete)
                RmSubCateMasterView.variables.dx_popupRecordDelete.hide();

            RmSubCateMasterView.ClearValues();
            RmSubCateMasterView.variables.dx_dataGrid.refresh();
        }
        else {
            DevExVariables.InvalidResponseCode(data);
        }
    },

    GetRmCateList: function () {
        var myfilter = { rules: [] };
        myfilter.rules.push({ field: "TYPE", op: "eq", data: "rmcate" });
        $.ajax({
            url: getDomain() + RmSubCateMasterView.variables.BindStaticDataUrl + "&myfilters=" + JSON.stringify(myfilter),
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

                        RmSubCateMasterView.variables.dx_txtRMCateId.option({
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

    ClearValues: function () {
        RmSubCateMasterView.variables.Masterid = "";
        RmSubCateMasterView.variables.Oper = 'Add';
        RmSubCateMasterView.variables.addedit = "added";
        RmSubCateMasterView.variables.DeleteDataObj = "";
        DevExpress.validationEngine.resetGroup("RmSubCateMaster");

        $('#frm_RmSubCateMaster').hide();
        $('#pnlView').show();
    },

    deleteRow: function (id) {
        var rowData = RmSubCateMasterView.variables.dx_dataGrid.getVisibleRows()[RmSubCateMasterView.variables.dx_dataGrid.getRowIndexByKey(+id)].data;
        RmSubCateMasterView.variables.Masterid = id;
        RmSubCateMasterView.variables.DeleteDataObj = rowData;
        RmSubCateMasterView.variables.Oper = "Delete";

        if (RmSubCateMasterView.variables.dx_popupRecordDelete) {
            RmSubCateMasterView.variables.dx_popupRecordDelete.option("contentTemplate", RmSubCateMasterView.variables.DeletePopUpOptions.contentTemplate(RmSubCateMasterView.variables.DeleteDataObj).bind(this));
        }
        else {
            RmSubCateMasterView.variables.dx_popupRecordDelete = $("#dx_popupRecordDelete").dxPopup(RmSubCateMasterView.variables.DeletePopUpOptions).dxPopup("instance");
        }

        RmSubCateMasterView.variables.dx_popupRecordDelete.show();
    }
}

$(document).ready(function () {
    RmSubCateMasterView.FormInitialize();
    RmSubCateMasterView.initializeDevExgrid();
    RmSubCateMasterView.GetRmCateList();
});