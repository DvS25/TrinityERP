
var RmCutMasterView = {

    variables: {
        BindGroupListUrl: "/Common/BindMastersDetails?ServiceName=PRD_RMCUT_MASTER_GET",
        PerformMasterOperationUrl: "/Common/OpeartionsOnMaster?ServiceName=PRD_RMCUT_MASTER_CRUD",
        BindStaticDataUrl: "/Common/BindMastersDetails?ServiceName=STATIC_MASTER_GET&IsActive=true",
        Oper: 'Add',
        addedit: "added",
        Masterid: "",
        dx_btnAddNew: "",
        dx_txtRMCut: "",
        dx_ddlRMSubCate: "",
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
                    $("<p>RM Cut: <span>" + RmCutMasterView.variables.DeleteDataObj.cut + "</span></p>")
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
                            "CUTID": RmCutMasterView.variables.Masterid,
                            "oper": RmCutMasterView.variables.Oper,
                        }

                        RmCutMasterView.savedata(data);
                    },
                }
            }],
            showTitle: true,
            title: "Delete Record?",
            visible: false,
            dragEnabled: false,
            closeOnOutsideClick: true
        },

        SubCateList: [],
    },

    FormInitialize: function () {
        RmCutMasterView.variables.dx_txtRMCut = $("#dx_txtRMCut").dxTextBox({
            placeholder: "Enter Purity...",
        }).dxValidator({
            validationGroup: "RmCutMaster",
            validationRules: [{
                type: "required",
                message: "RM Cut is required"
            }]
        }).dxTextBox("instance");

        RmCutMasterView.variables.dx_switchIsActive = $("#dx_switchIsActive").dxSwitch({
            value: true,
            switchedOnText: "Yes",
            switchedOffText: "No"
        }).dxValidator({
            validationGroup: "RmCutMaster",
            validationRules: []
        }).dxSwitch("instance");

        RmCutMasterView.variables.dx_ddlRMSubCate = $("#dx_ddlRMSubCate").dxSelectBox({
            placeholder: "Select Group...",
            searchEnabled: true,
        }).dxValidator({
            validationGroup: "RmCutMaster",
            validationRules: [{
                type: "required",
                message: "RM SubCategory is required"
            }]
        }).dxSelectBox("instance");

        RmCutMasterView.variables.dx_txtDescription = $("#dx_txtDescription").dxTextArea({
            height: 110
        }).dxTextArea("instance");

        RmCutMasterView.variables.dx_btnSubmit = $("#dx_btnSubmit").dxButton({
            icon: "check",
            text: "Submit",
            type: "success",
            validationGroup: "RmCutMaster",
            onClick: function (e) {
                var validation = DevExpress.validationEngine.validateGroup("RmCutMaster");
                if (!validation.isValid) {
                    DevExVariables.Toaster("warning", "Please fill all required fields before submit.");
                    return;
                }

                RmCutMasterView.btnMasterSubmit();

                //e.validationGroup.reset();
            }
        }).dxButton("instance");

        RmCutMasterView.variables.dx_btnCancel = $("#dx_btnCancel").dxButton({
            icon: "close",
            text: "Cancel",
            type: "danger",
            validationGroup: "RmCutMaster",
            onClick: function (e) {
                RmCutMasterView.ClearValues();
            }
        }).dxButton("instance");

        RmCutMasterView.variables.dx_btnAddNew = $("#dx_btnAddNew").dxButton({
            stylingMode: "outlined",
            icon: "plus",
            text: "Add New",
            type: "default",
            validationGroup: "RmCutMaster",
            onClick: function (e) {
                RmCutMasterView.variables.Masterid = "";

                $("#frm_RmCutMaster").show();
                $("#pnlView").hide();

                RmCutMasterView.variables.dx_txtRMCut.focus();
            }
        }).dxButton("instance");
    },

    initializeDevExgrid: function () {
        RmCutMasterView.variables.dx_dataGrid = $("#dx_dataGrid").dxDataGrid({
            dataSource: new DevExpress.data.CustomStore({
                key: "cutid",
                load: function (loadOptions) {
                    var deferred = $.Deferred();

                    var result = DevExVariables.GetDataList(loadOptions, RmCutMasterView.variables.BindGroupListUrl);

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
            columns: [{ dataField: "cutid", allowFiltering: false, allowSorting: true, sortIndex: 1, sortOrder: "desc", visible: false },
                { dataField: "cut", caption: "RM Cut", dataType: "string", filterOperations: ["contains"], allowSorting: true, allowFiltering: true, allowHeaderFiltering: false },
                { dataField: "rmsubcate", caption: "RM Subcate", dataType: "string", filterOperations: ["contains"], allowSorting: true, allowFiltering: true, allowHeaderFiltering: false },
                { dataField: "rmcate", caption: "RM Cate", dataType: "string", filterOperations: ["contains"], allowSorting: true, allowFiltering: true, allowHeaderFiltering: false },
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
                        DevExVariables.ActionTemplate(container, options, true, true,"RmCutMasterView");
                    }
                },
            ]
        }).dxDataGrid("instance");
    },

    triggerId: function (id) {
        var rowData = RmCutMasterView.variables.dx_dataGrid.getVisibleRows()[RmCutMasterView.variables.dx_dataGrid.getRowIndexByKey(+id)].data;
        RmCutMasterView.variables.Masterid = id;
        RmCutMasterView.variables.dx_txtRMCut.option({ value: rowData.cut });
        RmCutMasterView.variables.dx_ddlRMSubCate.option({ value: rowData.rmsubcateid });
        RmCutMasterView.variables.dx_switchIsActive.option({ value: rowData.isactive });
        RmCutMasterView.variables.dx_txtDescription.option({ value: rowData.description });
        $("#frm_RmCutMaster").show();
        $("#pnlView").hide();

        if (isU()) {
            RmCutMasterView.variables.dx_btnSubmit.option({ visible: true });
        }
        else {
            RmCutMasterView.variables.dx_btnSubmit.option({ visible: false });
        }

    },

    ClearValues: function () {
        RmCutMasterView.variables.Masterid = "";
        RmCutMasterView.variables.Oper = 'Add';
        RmCutMasterView.variables.addedit = "added";
        RmCutMasterView.variables.DeleteDataObj = "";
        DevExpress.validationEngine.resetGroup("RmCutMaster");

        $('#frm_RmCutMaster').hide();
        $('#pnlView').show();
        RmCutMasterView.variables.dx_dataGrid.refresh();
    },

    btnMasterSubmit: function () {
        RmCutMasterView.variables.Oper = 'Add';
        RmCutMasterView.variables.addedit = "added";

        if (RmCutMasterView.variables.Masterid != "0" && parseInt(RmCutMasterView.variables.Masterid) > 0) {
            RmCutMasterView.variables.Oper = 'Edit';
            RmCutMasterView.variables.addedit = 'updated';
        }

        RmCutMasterView.variables.dx_btnSubmit.option({ disabled: true });

        var data = {
            "CUTID": RmCutMasterView.variables.Masterid,
            "CUT": RmCutMasterView.variables.dx_txtRMCut.option().value,
            "RMSUBCATEID": RmCutMasterView.variables.dx_ddlRMSubCate.option().value,
            "RMCATEID": RmCutMasterView.variables.dx_ddlRMSubCate.option().selectedItem.rmcateid,
            "DESCRIPTION": RmCutMasterView.variables.dx_txtDescription.option().value,
            "ISACTIVE": RmCutMasterView.variables.dx_switchIsActive.option().value,
            "oper": RmCutMasterView.variables.Oper,
        }

        RmCutMasterView.savedata(data);
    },

    savedata: function (data) {
        $.ajax({
            url: getDomain() + RmCutMasterView.variables.PerformMasterOperationUrl,
            data: data,
            async: true,
            cache: false,
            type: 'POST',
            beforeSend: function () {
                dx_LoaderTrinity.show();
            },
            complete: function () {
                dx_LoaderTrinity.hide();
                RmCutMasterView.variables.dx_btnSubmit.option({ disabled: false });
            },
            success: RmCutMasterView.btnMasterSubmitOnSuccess,
            error: OnError,
        });
    },

    btnMasterSubmitOnSuccess: function (data) {
        if ($(data).find('RESPONSECODE').text() == "0") {
            DevExVariables.Toaster("success", 'Record is ' + RmCutMasterView.variables.addedit + ' successfully');
            $('#frm_RmCutMaster').hide();
            $('#pnlView').show();
            if (RmCutMasterView.variables.dx_popupRecordDelete)
                RmCutMasterView.variables.dx_popupRecordDelete.hide();

            RmCutMasterView.ClearValues();
            RmCutMasterView.variables.dx_dataGrid.refresh();
        }
        else {
            DevExVariables.InvalidResponseCode(data);
        }
    },

    deleteRow: function (id) {
        var rowData = RmCutMasterView.variables.dx_dataGrid.getVisibleRows()[RmCutMasterView.variables.dx_dataGrid.getRowIndexByKey(+id)].data;
        RmCutMasterView.variables.Masterid = id;
        RmCutMasterView.variables.DeleteDataObj = rowData;
        RmCutMasterView.variables.Oper = "Delete";

        if (RmCutMasterView.variables.dx_popupRecordDelete) {
            RmCutMasterView.variables.dx_popupRecordDelete.option("contentTemplate", RmCutMasterView.variables.DeletePopUpOptions.contentTemplate(RmCutMasterView.variables.DeleteDataObj).bind(this));
        }
        else {
            RmCutMasterView.variables.dx_popupRecordDelete = $("#dx_popupRecordDelete").dxPopup(RmCutMasterView.variables.DeletePopUpOptions).dxPopup("instance");
        }

        RmCutMasterView.variables.dx_popupRecordDelete.show();
    },

    GetSubcateList: function () {
        var myfilter = { rules: [] };
        myfilter.rules.push({ field: "TYPE", op: "eq", data: "rmsubcate" });
        myfilter.rules.push({ field: "RMGROUP", op: "eq", data: "MATERIAL" });

        $.ajax({
            url: getDomain() + RmCutMasterView.variables.BindStaticDataUrl + "&myfilters=" + JSON.stringify(myfilter),
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

                        RmCutMasterView.variables.dx_ddlRMSubCate.option({
                            dataSource: new DevExpress.data.ArrayStore({
                                data: List,
                                key: 'rmsubcateid',
                            }),
                            displayExpr: 'rmsubcate',
                            valueExpr: 'rmsubcateid',
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

};


$(document).ready(function () {
    RmCutMasterView.FormInitialize();

    RmCutMasterView.initializeDevExgrid();

    RmCutMasterView.GetSubcateList();
});