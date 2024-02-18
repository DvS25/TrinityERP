var RmCateMasterView = {
    variables: {
        BindGroupListUrl: "/Common/BindMastersDetails?ServiceName=PRD_RMCATE_MASTER_GET",
        PerformMasterOperationUrl: "/Common/OpeartionsOnMaster?ServiceName=PRD_RMCATE_MASTER_CRUD",
        BindStaticDataUrl: "/Common/BindMastersDetails?ServiceName=STATIC_MASTER_GET&IsActive=true",
        Oper: 'Add',
        addedit: "added",
        Masterid: "",
        dx_btnAddNew: "",
        dx_txtRMCate: "",
        dx_ddlRMGroup: "",
        dx_ddlRMType: "",
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
                    $("<p>RM Cate: <span>" + RmCateMasterView.variables.DeleteDataObj.rmcate + "</span></p>")
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
                            "RMCATEID": RmCateMasterView.variables.Masterid,
                            "oper": RmCateMasterView.variables.Oper,
                        }

                        RmCateMasterView.savedata(data);
                    },
                }
            }],
            showTitle: true,
            title: "Delete Record?",
            visible: false,
            dragEnabled: false,
            closeOnOutsideClick: true
        },

        RmGroupidList: [],
        RmTypeidList: [],
    },

    FormInitialize: function () {
        RmCateMasterView.variables.dx_txtRMCate = $("#dx_txtRMCate").dxTextBox({
            placeholder: "Enter RM Category...",
        }).dxValidator({
            validationGroup: "RmCateMaster",
            validationRules: [{
                type: "required",
                message: "RM Category is required"
            }]
        }).dxTextBox("instance");

        RmCateMasterView.variables.dx_switchIsActive = $("#dx_switchIsActive").dxSwitch({
            value: true,
            switchedOnText: "Yes",
            switchedOffText: "No"
        }).dxValidator({
            validationGroup: "RmCateMaster",
            validationRules: []
        }).dxSwitch("instance");

        RmCateMasterView.variables.dx_ddlRMGroup = $("#dx_ddlRMGroup").dxSelectBox({
            placeholder: "Select Group...",
            searchEnabled: true,
        }).dxValidator({
            validationGroup: "RmCateMaster",
            validationRules: [{
                type: "required",
                message: "RM Group is required"
            }]
        }).dxSelectBox("instance");

        RmCateMasterView.variables.dx_ddlRMType = $("#dx_ddlRMType").dxSelectBox({
            placeholder: "Select Type...",
            searchEnabled: true,
        }).dxValidator({
            validationGroup: "RmCateMaster",
            validationRules: [{
                type: "required",
                message: "RM Type is required"
            }]
        }).dxSelectBox("instance");

        RmCateMasterView.variables.dx_txtDescription = $("#dx_txtDescription").dxTextArea({
            height: 110
        }).dxTextArea("instance");

        RmCateMasterView.variables.dx_btnSubmit = $("#dx_btnSubmit").dxButton({
            icon: "check",
            text: "Submit",
            type: "success",
            validationGroup: "RmCateMaster",
            onClick: function (e) {
                var validation = DevExpress.validationEngine.validateGroup("RmCateMaster");
                if (!validation.isValid) {
                    DevExVariables.Toaster("warning", "Please fill all required fields before submit.");
                    return;
                }

                RmCateMasterView.btnMasterSubmit();

                //e.validationGroup.reset();
            }
        }).dxButton("instance");

        RmCateMasterView.variables.dx_btnCancel = $("#dx_btnCancel").dxButton({
            icon: "close",
            text: "Cancel",
            type: "danger",
            validationGroup: "RmCateMaster",
            onClick: function (e) {
                RmCateMasterView.ClearValues();
            }
        }).dxButton("instance");

        RmCateMasterView.variables.dx_btnAddNew = $("#dx_btnAddNew").dxButton({
            stylingMode: "outlined",
            icon: "plus",
            text: "Add New",
            type: "default",
            validationGroup: "RmCateMaster",
            onClick: function (e) {
                RmCateMasterView.variables.Masterid = "";

                $("#frm_RmCateMaster").show();
                $("#pnlView").hide();

                RmCateMasterView.variables.dx_txtRMCate.focus();
            }
        }).dxButton("instance");
    },

    initializeDevExgrid: function ()   {
        RmCateMasterView.variables.dx_dataGrid = $("#dx_dataGrid").dxDataGrid({
            dataSource: new DevExpress.data.CustomStore({
                key: "rmcateid",
                load: function (loadOptions) {
                    var deferred = $.Deferred();

                    var result = DevExVariables.GetDataList(loadOptions, RmCateMasterView.variables.BindGroupListUrl);

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
            columns: [{ dataField: "rmcateid", allowFiltering: false, allowSorting: true, sortIndex: 1, sortOrder: "desc", visible: false },
                { dataField: "rmcate", caption: "RM Cate", dataType: "string", filterOperations: ["contains"], allowSorting: true, allowFiltering: true, allowHeaderFiltering: false },
                { dataField: "rmgroup", caption: "RM Group", dataType: "string", filterOperations: ["contains"], allowSorting: true, allowFiltering: true, allowHeaderFiltering: false },
                { dataField: "rmtype", caption: "RM Type", dataType: "string", filterOperations: ["contains"], allowSorting: true, allowFiltering: true, allowHeaderFiltering: false },
                { dataField: "description", caption: "Description", dataType: "string", filterOperations: ["contains"], allowSorting: true, allowFiltering: true, allowHeaderFiltering: false },
                //{ dataField: "rmgroup", caption: "Group", dataType: "string", filterOperations: ["contains"], allowSorting: true, allowFiltering: true, allowHeaderFiltering: false },
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
                        DevExVariables.ActionTemplate(container, options, true, true, "RmCateMasterView");
                    }
                },
            ]
        }).dxDataGrid("instance");
    },


    triggerId: function (id) {
        var rowData = RmCateMasterView.variables.dx_dataGrid.getVisibleRows()[RmCateMasterView.variables.dx_dataGrid.getRowIndexByKey(+id)].data;
        RmCateMasterView.variables.Masterid = id;
        RmCateMasterView.variables.dx_txtRMCate.option({ value: rowData.rmcate });
        RmCateMasterView.variables.dx_ddlRMGroup.option({ value: rowData.rmgroupid });
        RmCateMasterView.variables.dx_ddlRMType.option({ value: rowData.rmtypeid });
        RmCateMasterView.variables.dx_switchIsActive.option({ value: rowData.isactive });
        RmCateMasterView.variables.dx_txtDescription.option({ value: rowData.description });
        $("#frm_RmCateMaster").show();
        $("#pnlView").hide();

        if (isU()) {
            RmCateMasterView.variables.dx_btnSubmit.option({ visible: true });
        }
        else {
            RmCateMasterView.variables.dx_btnSubmit.option({ visible: false });
        }

    },


    ClearValues: function () {
        RmCateMasterView.variables.Masterid = "";
        RmCateMasterView.variables.Oper = 'Add';
        RmCateMasterView.variables.addedit = "added";
        RmCateMasterView.variables.DeleteDataObj = "";
        DevExpress.validationEngine.resetGroup("RmCateMaster");

        $('#frm_RmCateMaster').hide();
        $('#pnlView').show();
        RmCateMasterView.variables.dx_dataGrid.refresh();
    },


    btnMasterSubmit: function () {
        RmCateMasterView.variables.Oper = 'Add';
        RmCateMasterView.variables.addedit = "added";

        if (RmCateMasterView.variables.Masterid != "0" && parseInt(RmCateMasterView.variables.Masterid) > 0) {
            RmCateMasterView.variables.Oper = 'Edit';
            RmCateMasterView.variables.addedit = 'updated';
        }

        RmCateMasterView.variables.dx_btnSubmit.option({ disabled: true });

        var data = {
            "RMCATEID": RmCateMasterView.variables.Masterid,
            "RMCATE": RmCateMasterView.variables.dx_txtRMCate.option().value,
            "RMGROUPID": RmCateMasterView.variables.dx_ddlRMGroup.option().value,
            "RMTYPEID": RmCateMasterView.variables.dx_ddlRMType.option().value,
            "DESCRIPTION": RmCateMasterView.variables.dx_txtDescription.option().value,
            "ISACTIVE": RmCateMasterView.variables.dx_switchIsActive.option().value,
            "oper": RmCateMasterView.variables.Oper,
        }

        if (RmCateMasterView.variables.dx_ddlRMGroup.option().value)
            data.GROUPID = RmCateMasterView.variables.dx_ddlRMGroup.option().value;

        if (RmCateMasterView.variables.dx_ddlRMType.option().value)
            data.TYPEID = RmCateMasterView.variables.dx_ddlRMType.option().value;

        RmCateMasterView.savedata(data);
    },

    savedata: function (data) {
        $.ajax({
            url: getDomain() + RmCateMasterView.variables.PerformMasterOperationUrl,
            data: data,
            async: true,
            cache: false,
            type: 'POST',
            beforeSend: function () {
                dx_LoaderTrinity.show();
            },
            complete: function () {
                dx_LoaderTrinity.hide();
                RmCateMasterView.variables.dx_btnSubmit.option({ disabled: false });
            },
            success: RmCateMasterView.btnMasterSubmitOnSuccess,
            error: OnError,
        });
    },

    btnMasterSubmitOnSuccess: function (data) {
        if ($(data).find('RESPONSECODE').text() == "0") {
            DevExVariables.Toaster("success", 'Record is ' + RmCateMasterView.variables.addedit + ' successfully');
            $('#frm_RmCateMaster').hide();
            $('#pnlView').show();
            if (RmCateMasterView.variables.dx_popupRecordDelete)
                RmCateMasterView.variables.dx_popupRecordDelete.hide();

            RmCateMasterView.ClearValues();
            RmCateMasterView.variables.dx_dataGrid.refresh();
        }
        else {
            DevExVariables.InvalidResponseCode(data);
        }
    },

    GetRmGroupList: function () {
        var myfilter = { rules: [] };
        myfilter.rules.push({ field: "TYPE", op: "eq", data: "RmGroup" });
        $.ajax({
            url: getDomain() + RmCateMasterView.variables.BindStaticDataUrl + "&myfilters=" + JSON.stringify(myfilter),
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

                        RmCateMasterView.variables.dx_ddlRMGroup.option({
                            dataSource: new DevExpress.data.ArrayStore({
                                data: List,
                                key: 'rmgroupid',
                            }),
                            displayExpr: 'rmgroup',
                            valueExpr: 'rmgroupid',
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


    GetRmTypeList: function () {
        var myfilter = { rules: [] };
        myfilter.rules.push({ field: "TYPE", op: "eq", data: "RmType" });
        $.ajax({
            url: getDomain() + RmCateMasterView.variables.BindStaticDataUrl + "&myfilters=" + JSON.stringify(myfilter),
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

                        RmCateMasterView.variables.dx_ddlRMType .option({
                            dataSource: new DevExpress.data.ArrayStore({
                                data: List,
                                key: 'rmgtypeid',
                            }),
                            displayExpr: 'rmtype',
                            valueExpr: 'rmtypeid',
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

    deleteRow: function (id) {
        var rowData = RmCateMasterView.variables.dx_dataGrid.getVisibleRows()[RmCateMasterView.variables.dx_dataGrid.getRowIndexByKey(+id)].data;
        RmCateMasterView.variables.Masterid = id;
        RmCateMasterView.variables.DeleteDataObj = rowData;
        RmCateMasterView.variables.Oper = "Delete";

        if (RmCateMasterView.variables.dx_popupRecordDelete) {
            RmCateMasterView.variables.dx_popupRecordDelete.option("contentTemplate", RmCateMasterView.variables.DeletePopUpOptions.contentTemplate(RmCateMasterView.variables.DeleteDataObj).bind(this));
        }
        else {
            RmCateMasterView.variables.dx_popupRecordDelete = $("#dx_popupRecordDelete").dxPopup(RmCateMasterView.variables.DeletePopUpOptions).dxPopup("instance");
        }

        RmCateMasterView.variables.dx_popupRecordDelete.show();
    },
};

$(document).ready(function () {
    RmCateMasterView.FormInitialize();

    RmCateMasterView.initializeDevExgrid();

    RmCateMasterView.GetRmGroupList();
    RmCateMasterView.GetRmTypeList();

   
});