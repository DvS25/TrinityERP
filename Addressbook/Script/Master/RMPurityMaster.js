var RmPurityMasterView = {

    variables: {
        BindGroupListUrl: "/Common/BindMastersDetails?ServiceName=PRD_RMPURITY_MASTER_GET",
        PerformMasterOperationUrl: "/Common/OpeartionsOnMaster?ServiceName=PRD_RMPURITY_MASTER_CRUD",
        BindStaticDataUrl: "/Common/BindMastersDetails?ServiceName=STATIC_MASTER_GET&IsActive=true",
        Oper: 'Add',
        addedit: "added",
        Masterid: "",
        dx_btnAddNew: "",
        dx_txtRMPurity: "",
        dx_ddlRMSubCate: "",
        dx_switchIsActiveOnWeb: "",
        dx_switchIsUseInJewellery: "",
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
                    $("<p>RM Purity: <span>" + RmPurityMasterView.variables.DeleteDataObj.purity + "</span></p>")
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
                            "PURITYID": RmPurityMasterView.variables.Masterid,
                            "oper": RmPurityMasterView.variables.Oper,
                        }

                        RmPurityMasterView.savedata(data);
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
        RmPurityMasterView.variables.dx_txtRMPurity = $("#dx_txtRMPurity").dxTextBox({
            placeholder: "Enter Purity...",
        }).dxValidator({
            validationGroup: "RmPurityMaster",
            validationRules: [{
                type: "required",
                message: "RM Purity is required"
            }]
        }).dxTextBox("instance");

        RmPurityMasterView.variables.dx_switchIsActive = $("#dx_switchIsActive").dxSwitch({
            value: true,
            switchedOnText: "Yes",
            switchedOffText: "No"
        }).dxValidator({
            validationGroup: "RmPurityMaster",
            validationRules: []
        }).dxSwitch("instance");

        RmPurityMasterView.variables.dx_switchIsActiveOnWeb = $("#dx_switchIsActiveOnWeb").dxSwitch({
            value: true,
            switchedOnText: "Yes",
            switchedOffText: "No"
        }).dxValidator({
            validationGroup: "RmPurityMaster",
            validationRules: []
        }).dxSwitch("instance");

        RmPurityMasterView.variables.dx_switchIsUseInJewellery = $("#dx_switchIsUseInJewellery").dxSwitch({
            value: true,
            switchedOnText: "Yes",
            switchedOffText: "No"
        }).dxValidator({
            validationGroup: "RmPurityMaster",
            validationRules: []
        }).dxSwitch("instance");

        RmPurityMasterView.variables.dx_ddlRMSubCate = $("#dx_ddlRMSubCate").dxSelectBox({
            placeholder: "Select Group...",
            searchEnabled: true,
        }).dxValidator({
            validationGroup: "RmPurityMaster",
            validationRules: [{
                type: "required",
                message: "RM SubCategory is required"
            }]
        }).dxSelectBox("instance");

        RmPurityMasterView.variables.dx_txtDescription = $("#dx_txtDescription").dxTextArea({
            height: 110
        }).dxTextArea("instance");

        RmPurityMasterView.variables.dx_btnSubmit = $("#dx_btnSubmit").dxButton({
            icon: "check",
            text: "Submit",
            type: "success",
            validationGroup: "RmPurityMaster",
            onClick: function (e) {
                var validation = DevExpress.validationEngine.validateGroup("RmPurityMaster");
                if (!validation.isValid) {
                    DevExVariables.Toaster("warning", "Please fill all required fields before submit.");
                    return;
                }

                RmPurityMasterView.btnMasterSubmit();

                //e.validationGroup.reset();
            }
        }).dxButton("instance");

        RmPurityMasterView.variables.dx_btnCancel = $("#dx_btnCancel").dxButton({
            icon: "close",
            text: "Cancel",
            type: "danger",
            validationGroup: "RmPurityMaster",
            onClick: function (e) {
                RmPurityMasterView.ClearValues();
            }
        }).dxButton("instance");

        RmPurityMasterView.variables.dx_btnAddNew = $("#dx_btnAddNew").dxButton({
            stylingMode: "outlined",
            icon: "plus",
            text: "Add New",
            type: "default",
            validationGroup: "RmPurityMaster",
            onClick: function (e) {
                RmPurityMasterView.variables.Masterid = "";

                $("#frm_RmPurityMaster").show();
                $("#pnlView").hide();

                RmPurityMasterView.variables.dx_txtRMPurity.focus();
            }
        }).dxButton("instance");
    },

    initializeDevExgrid: function () {
        RmPurityMasterView.variables.dx_dataGrid = $("#dx_dataGrid").dxDataGrid({
            dataSource: new DevExpress.data.CustomStore({
                key: "purityid",
                load: function (loadOptions) {
                    var deferred = $.Deferred();

                    var result = DevExVariables.GetDataList(loadOptions, RmPurityMasterView.variables.BindGroupListUrl);

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
            columns: [{ dataField: "purityid", allowFiltering: false, allowSorting: true, sortIndex: 1, sortOrder: "desc", visible: false },
                { dataField: "purity", caption: "RM Purity", dataType: "string", filterOperations: ["contains"], allowSorting: true, allowFiltering: true, allowHeaderFiltering: false },
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
                     dataField: "isactiveonweb", caption: "IsActiveOnWeb", dataType: "string", alignment: "center", filterOperations: ["contains"],
                     allowSorting: false, allowFiltering: false, allowHeaderFiltering: true,
                     headerFilter: {
                         dataSource: [{
                             text: "Yes",
                             value: ["isactiveonweb", "equals", 1]
                         }, {

                             text: "No",
                             value: ["isactiveonweb", "equals", 0]
                         }]
                     },
                     cellTemplate: function (container, options) {
                         DevExVariables.LabelTemplate(container, options);
                     }
                 },
                  {
                      dataField: "isuseinjewellery", caption: "IsUseInJewellery", dataType: "string", alignment: "center", filterOperations: ["contains"],
                      allowSorting: false, allowFiltering: false, allowHeaderFiltering: true,
                      headerFilter: {
                          dataSource: [{
                              text: "Yes",
                              value: ["isuseinjewellery", "equals", 1]
                          }, {

                              text: "No",
                              value: ["isuseinjewellery", "equals", 0]
                          }]
                      },
                      cellTemplate: function (container, options) {
                          DevExVariables.LabelTemplate(container, options);
                      }
                  },
                {
                    dataField: "Action", caption: "Action", alignment: "center", allowFiltering: false, allowSorting: false, fixed: true, fixedPosition: "right",
                    cellTemplate: function (container, options) {
                        DevExVariables.ActionTemplate(container, options, true, true, "RmPurityMasterView");
                    }
                },
            ]
        }).dxDataGrid("instance");
    },

    triggerId: function (id) {
        var rowData = RmPurityMasterView.variables.dx_dataGrid.getVisibleRows()[RmPurityMasterView.variables.dx_dataGrid.getRowIndexByKey(+id)].data;
        RmPurityMasterView.variables.Masterid = id;
        RmPurityMasterView.variables.dx_txtRMPurity.option({ value: rowData.purity });
        RmPurityMasterView.variables.dx_ddlRMSubCate.option({ value: rowData.rmsubcateid });
        RmPurityMasterView.variables.dx_switchIsActive.option({ value: rowData.isactive });
        RmPurityMasterView.variables.dx_switchIsActiveOnWeb.option({ value: rowData.isactiveonweb });
        RmPurityMasterView.variables.dx_switchIsUseInJewellery.option({ value: rowData.isuseinjewellery });
        RmPurityMasterView.variables.dx_txtDescription.option({ value: rowData.description });
        $("#frm_RmPurityMaster").show();
        $("#pnlView").hide();

        if (isU()) {
            RmPurityMasterView.variables.dx_btnSubmit.option({ visible: true });
        }
        else {
            RmPurityMasterView.variables.dx_btnSubmit.option({ visible: false });
        }

    },

    ClearValues: function () {
        RmPurityMasterView.variables.Masterid = "";
        RmPurityMasterView.variables.Oper = 'Add';
        RmPurityMasterView.variables.addedit = "added";
        RmPurityMasterView.variables.DeleteDataObj = "";
        DevExpress.validationEngine.resetGroup("RmPurityMaster");

        $('#frm_RmPurityMaster').hide();
        $('#pnlView').show();
        RmPurityMasterView.variables.dx_dataGrid.refresh();
    },

    btnMasterSubmit: function () {
        RmPurityMasterView.variables.Oper = 'Add';
        RmPurityMasterView.variables.addedit = "added";

        if (RmPurityMasterView.variables.Masterid != "0" && parseInt(RmPurityMasterView.variables.Masterid) > 0) {
            RmPurityMasterView.variables.Oper = 'Edit';
            RmPurityMasterView.variables.addedit = 'updated';
        }

        RmPurityMasterView.variables.dx_btnSubmit.option({ disabled: true });

        var data = {
            "PURITYID": RmPurityMasterView.variables.Masterid,
            "PURITY": RmPurityMasterView.variables.dx_txtRMPurity.option().value,
            "RMSUBCATEID": RmPurityMasterView.variables.dx_ddlRMSubCate.option().value,
            "RMCATEID": RmPurityMasterView.variables.dx_ddlRMSubCate.option().selectedItem.rmcateid,
            "DESCRIPTION": RmPurityMasterView.variables.dx_txtDescription.option().value,
            "ISACTIVE": RmPurityMasterView.variables.dx_switchIsActive.option().value,
            "ISACTIVEONWEB": RmPurityMasterView.variables.dx_switchIsActiveOnWeb.option().value,
            "ISUSEINJEWELLERY": RmPurityMasterView.variables.dx_switchIsUseInJewellery.option().value,
            "oper": RmPurityMasterView.variables.Oper,
        }

        RmPurityMasterView.savedata(data);
    },
    
    savedata: function (data) {
        $.ajax({
            url: getDomain() + RmPurityMasterView.variables.PerformMasterOperationUrl,
            data: data,
            async: true,
            cache: false,
            type: 'POST',
            beforeSend: function () {
                dx_LoaderTrinity.show();
            },
            complete: function () {
                dx_LoaderTrinity.hide();
                RmPurityMasterView.variables.dx_btnSubmit.option({ disabled: false });
            },
            success: RmPurityMasterView.btnMasterSubmitOnSuccess,
            error: OnError,
        });
    },

    btnMasterSubmitOnSuccess: function (data) {
        if ($(data).find('RESPONSECODE').text() == "0") {
            DevExVariables.Toaster("success", 'Record is ' + RmPurityMasterView.variables.addedit + ' successfully');
            $('#frm_RmPurityMaster').hide();
            $('#pnlView').show();
            if (RmPurityMasterView.variables.dx_popupRecordDelete)
                RmPurityMasterView.variables.dx_popupRecordDelete.hide();

            RmPurityMasterView.ClearValues();
            RmPurityMasterView.variables.dx_dataGrid.refresh();
        }
        else {
            DevExVariables.InvalidResponseCode(data);
        }
    },

    deleteRow: function (id) {
        var rowData = RmPurityMasterView.variables.dx_dataGrid.getVisibleRows()[RmPurityMasterView.variables.dx_dataGrid.getRowIndexByKey(+id)].data;
        RmPurityMasterView.variables.Masterid = id;
        RmPurityMasterView.variables.DeleteDataObj = rowData;
        RmPurityMasterView.variables.Oper = "Delete";

        if (RmPurityMasterView.variables.dx_popupRecordDelete) {
            RmPurityMasterView.variables.dx_popupRecordDelete.option("contentTemplate", RmPurityMasterView.variables.DeletePopUpOptions.contentTemplate(RmPurityMasterView.variables.DeleteDataObj).bind(this));
        }
        else {
            RmPurityMasterView.variables.dx_popupRecordDelete = $("#dx_popupRecordDelete").dxPopup(RmPurityMasterView.variables.DeletePopUpOptions).dxPopup("instance");
        }

        RmPurityMasterView.variables.dx_popupRecordDelete.show();
    },

    GetRmSubCateList: function () {
        var myfilter = { rules: [] };
        myfilter.rules.push({ field: "TYPE", op: "eq", data: "RmSubcate" });
        myfilter.rules.push({ field: "RMGROUP", op: "eq", data: "MATERIAL,METAL,LABOUR" });
        $.ajax({
            url: getDomain() + RmPurityMasterView.variables.BindStaticDataUrl + "&myfilters=" + JSON.stringify(myfilter),
            async: true,
            cache: false,
            type: 'POST',
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    var JsonObject = xml2json.parser(data);
                    if (JsonObject.serviceresponse.detailslist) {
                        if (JsonObject.serviceresponse.detailslist.details.length) {
                            RmPurityMasterView.variables.RmSubCateList = JsonObject.serviceresponse.detailslist.details;
                        }
                        else {
                            RmPurityMasterView.variables.RmSubCateList.push(JsonObject.serviceresponse.detailslist.details);
                        }

                        RmPurityMasterView.variables.dx_ddlRMSubCate.option({
                            dataSource: new DevExpress.data.ArrayStore({
                                data: RmPurityMasterView.variables.RmSubCateList,
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
    RmPurityMasterView.FormInitialize();

    RmPurityMasterView.initializeDevExgrid();

    RmPurityMasterView.GetRmSubCateList();

});