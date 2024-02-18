var RmColourMasterView = {
    variables: {
        BindGroupListUrl: "/Common/BindMastersDetails?ServiceName=PRD_RMCOLOUR_MASTER_GET",
        PerformMasterOperationUrl: "/Common/OpeartionsOnMaster?ServiceName=PRD_RMCOLOUR_MASTER_CRUD",
        BindStaticDataUrl: "/Common/BindMastersDetails?ServiceName=STATIC_MASTER_GET&IsActive=true",
        Oper: 'Add',
        addedit: "added",
        Masterid: "",
        dx_btnAddNew: "",
        dx_txtRMColour : "",
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
                    $("<p>RM Colour: <span>" + RmColourMasterView.variables.DeleteDataObj.colour + "</span></p>")
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
                            "COLOURID": RmColourMasterView.variables.Masterid,
                            "oper": RmColourMasterView.variables.Oper,
                        }

                        RmColourMasterView.savedata(data);
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
        RmColourMasterView.variables.dx_txtRMColour = $("#dx_txtRMColour").dxTextBox({
            placeholder: "Enter Colour...",
        }).dxValidator({
            validationGroup: "RmColourMaster",
            validationRules: [{
                type: "required",
                message: "RM Colour is required"
            }]
        }).dxTextBox("instance");

        RmColourMasterView.variables.dx_switchIsActive = $("#dx_switchIsActive").dxSwitch({
            value: true,
            switchedOnText: "Yes",
            switchedOffText: "No"
        }).dxValidator({
            validationGroup: "RmColourMaster",
            validationRules: []
        }).dxSwitch("instance");

        RmColourMasterView.variables.dx_switchIsActiveOnWeb = $("#dx_switchIsActiveOnWeb").dxSwitch({
            value: true,
            switchedOnText: "Yes",
            switchedOffText: "No"
        }).dxValidator({
            validationGroup: "RmColourMaster",
            validationRules: []
        }).dxSwitch("instance");

        RmColourMasterView.variables.dx_switchIsUseInJewellery = $("#dx_switchIsUseInJewellery").dxSwitch({
            value: true,
            switchedOnText: "Yes",
            switchedOffText: "No"
        }).dxValidator({
            validationGroup: "RmColourMaster",
            validationRules: []
        }).dxSwitch("instance");

        RmColourMasterView.variables.dx_ddlRMSubCate = $("#dx_ddlRMSubCate").dxSelectBox({
            placeholder: "Select Group...",
            searchEnabled: true,
        }).dxValidator({
            validationGroup: "RmColourMaster",
            validationRules: [{
                type: "required",
                message: "RM SubCategory is required"
            }]
        }).dxSelectBox("instance");

        RmColourMasterView.variables.dx_txtDescription = $("#dx_txtDescription").dxTextArea({
            height: 110
        }).dxTextArea("instance");

        RmColourMasterView.variables.dx_btnSubmit = $("#dx_btnSubmit").dxButton({
            icon: "check",
            text: "Submit",
            type: "success",
            validationGroup: "RmColourMaster",
            onClick: function (e) {
                var validation = DevExpress.validationEngine.validateGroup("RmColourMaster");
                if (!validation.isValid) {
                    DevExVariables.Toaster("warning", "Please fill all required fields before submit.");
                    return;
                }

                RmColourMasterView.btnMasterSubmit();

                //e.validationGroup.reset();
            }
        }).dxButton("instance");

        RmColourMasterView.variables.dx_btnCancel = $("#dx_btnCancel").dxButton({
            icon: "close",
            text: "Cancel",
            type: "danger",
            validationGroup: "RmColourMaster",
            onClick: function (e) {
                RmColourMasterView.ClearValues();
            }
        }).dxButton("instance");

        RmColourMasterView.variables.dx_btnAddNew = $("#dx_btnAddNew").dxButton({
            stylingMode: "outlined",
            icon: "plus",
            text: "Add New",
            type: "default",
            validationGroup: "RmColourMaster",
            onClick: function (e) {
                RmColourMasterView.variables.Masterid = "";

                $("#frm_RmColorMaster").show();
                $("#pnlView").hide();

                RmColourMasterView.variables.dx_txtRMColour.focus();
            }
        }).dxButton("instance");
    },

    initializeDevExgrid: function ()   {
        RmColourMasterView.variables.dx_dataGrid = $("#dx_dataGrid").dxDataGrid({
            dataSource: new DevExpress.data.CustomStore({
                key: "colourid",
                load: function (loadOptions) {
                    var deferred = $.Deferred();

                    var result = DevExVariables.GetDataList(loadOptions, RmColourMasterView.variables.BindGroupListUrl);

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
            columns: [{ dataField: "colourid", allowFiltering: false, allowSorting: true, sortIndex: 1, sortOrder: "desc", visible: false },
                { dataField: "colour", caption: "RM Colour", dataType: "string", filterOperations: ["contains"], allowSorting: true, allowFiltering: true, allowHeaderFiltering: false },
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
                        DevExVariables.ActionTemplate(container, options, true, true, "RmColourMasterView");
                    }
                },
            ]
        }).dxDataGrid("instance");
    },

    triggerId: function (id) {
        var rowData = RmColourMasterView.variables.dx_dataGrid.getVisibleRows()[RmColourMasterView.variables.dx_dataGrid.getRowIndexByKey(+id)].data;
        RmColourMasterView.variables.Masterid = id;
        RmColourMasterView.variables.dx_txtRMColour.option({ value: rowData.colour});
        RmColourMasterView.variables.dx_ddlRMSubCate.option({ value: rowData.rmsubcateid });
        RmColourMasterView.variables.dx_switchIsActive.option({ value: rowData.isactive });
        RmColourMasterView.variables.dx_switchIsActiveOnWeb.option({ value: rowData.isactiveonweb });
        RmColourMasterView.variables.dx_switchIsUseInJewellery.option({ value: rowData.isuseinjewellery });
        RmColourMasterView.variables.dx_txtDescription.option({ value: rowData.description });
        $("#frm_RmColorMaster").show();
        $("#pnlView").hide();

        if (isU()) {
            RmColourMasterView.variables.dx_btnSubmit.option({ visible: true });
        }
        else {
            RmColourMasterView.variables.dx_btnSubmit.option({ visible: false });
        }

    },

    ClearValues: function () {
        RmColourMasterView.variables.Masterid = "";
        RmColourMasterView.variables.Oper = 'Add';
        RmColourMasterView.variables.addedit = "added";
        RmColourMasterView.variables.DeleteDataObj = "";
        DevExpress.validationEngine.resetGroup("RmColourMaster");

        $('#frm_RmColorMaster').hide();
        $('#pnlView').show();
        RmColourMasterView.variables.dx_dataGrid.refresh();
    },

    btnMasterSubmit: function () {
        RmColourMasterView.variables.Oper = 'Add';
        RmColourMasterView.variables.addedit = "added";

        if (RmColourMasterView.variables.Masterid != "0" && parseInt(RmColourMasterView.variables.Masterid) > 0) {
            RmColourMasterView.variables.Oper = 'Edit';
            RmColourMasterView.variables.addedit = 'updated';
        }

        RmColourMasterView.variables.dx_btnSubmit.option({ disabled: true });

        var data = {
            "COLOURID": RmColourMasterView.variables.Masterid,
            "COLOUR": RmColourMasterView.variables.dx_txtRMColour.option().value,
            "RMSUBCATEID": RmColourMasterView.variables.dx_ddlRMSubCate.option().value,
            "RMCATEID": RmColourMasterView.variables.dx_ddlRMSubCate.option().selectedItem.rmcateid,
            "DESCRIPTION": RmColourMasterView.variables.dx_txtDescription.option().value,
            "ISACTIVE": RmColourMasterView.variables.dx_switchIsActive.option().value,
            "ISACTIVEONWEB": RmColourMasterView.variables.dx_switchIsActiveOnWeb.option().value,
            "ISUSEINJEWELLERY": RmColourMasterView.variables.dx_switchIsUseInJewellery.option().value,
            "oper": RmColourMasterView.variables.Oper,
        }

        RmColourMasterView.savedata(data);
    },

    savedata: function (data) {
        $.ajax({
            url: getDomain() + RmColourMasterView.variables.PerformMasterOperationUrl,
            data: data,
            async: true,
            cache: false,
            type: 'POST',
            beforeSend: function () {
                dx_LoaderTrinity.show();
            },
            complete: function () {
                dx_LoaderTrinity.hide();
                RmColourMasterView.variables.dx_btnSubmit.option({ disabled: false });
            },
            success: RmColourMasterView.btnMasterSubmitOnSuccess,
            error: OnError,
        });
    },

    btnMasterSubmitOnSuccess: function (data) {
        if ($(data).find('RESPONSECODE').text() == "0") {
            DevExVariables.Toaster("success", 'Record is ' + RmColourMasterView.variables.addedit + ' successfully');
            $('#frm_RmColourMaster').hide();
            $('#pnlView').show();
            if (RmColourMasterView.variables.dx_popupRecordDelete)
                RmColourMasterView.variables.dx_popupRecordDelete.hide();

            RmColourMasterView.ClearValues();
            RmColourMasterView.variables.dx_dataGrid.refresh();
        }
        else {
            DevExVariables.InvalidResponseCode(data);
        }
    },

    deleteRow: function (id) {
        var rowData = RmColourMasterView.variables.dx_dataGrid.getVisibleRows()[RmColourMasterView.variables.dx_dataGrid.getRowIndexByKey(+id)].data;
        RmColourMasterView.variables.Masterid = id;
        RmColourMasterView.variables.DeleteDataObj = rowData;
        RmColourMasterView.variables.Oper = "Delete";

        if (RmColourMasterView.variables.dx_popupRecordDelete) {
            RmColourMasterView.variables.dx_popupRecordDelete.option("contentTemplate", RmColourMasterView.variables.DeletePopUpOptions.contentTemplate(RmColourMasterView.variables.DeleteDataObj).bind(this));
        }
        else {
            RmColourMasterView.variables.dx_popupRecordDelete = $("#dx_popupRecordDelete").dxPopup(RmColourMasterView.variables.DeletePopUpOptions).dxPopup("instance");
        }

        RmColourMasterView.variables.dx_popupRecordDelete.show();
    },

    GetSubcateList: function () {
        var myfilter = { rules: [] };
        myfilter.rules.push({ field: "TYPE", op: "eq", data: "rmsubcate" });
        myfilter.rules.push({ field: "RMGROUP", op: "eq", data: "MATERIAL,METAL,LABOUR" });

        $.ajax({
            url: getDomain() + RmColourMasterView.variables.BindStaticDataUrl + "&myfilters=" + JSON.stringify(myfilter),
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

                        RmColourMasterView.variables.dx_ddlRMSubCate.option({
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
    RmColourMasterView.FormInitialize();

    RmColourMasterView.initializeDevExgrid();

    RmColourMasterView.GetSubcateList();
});