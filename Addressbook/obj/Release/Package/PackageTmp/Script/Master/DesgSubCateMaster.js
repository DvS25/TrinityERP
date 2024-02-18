var DesgSubCateMasterView =     {
    variables: {
        BindGroupListUrl: "/Common/BindMastersDetails?ServiceName=PRD_DESGSUBCATE_MASTER_GET",
        PerformMasterOperationUrl: "/Common/OpeartionsOnMaster?ServiceName=PRD_DESGSUBCATE_MASTER_CRUD",
        BindStaticDataUrl: "/Common/BindMastersDetails?ServiceName=STATIC_MASTER_GET&IsActive=true",
        Oper: 'Add',
        addedit: "added",
        Masterid: "",
        dx_btnAddNew: "",
        dx_txtDesgCode: "",
        dx_txtCollName: "",
        dx_txtDesgSubCateName: "",
        dx_txtDesgCate: "",
        dx_numDisplayOrder: "",
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
                    $("<p>DesgSubCateId :<span>" + DesgSubCateMasterView.variables.DeleteDataObj.desgsubcateid + "</span></p>"),
                    $("<p>DesgSubCate :<span>" + DesgSubCateMasterView.variables.DeleteDataObj.desgsubcate + "</span></p>")
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
                            "DESGSUBCATEID": DesgSubCateMasterView.variables.Masterid,
                            "oper": DesgSubCateMasterView.variables.Oper,
                        }

                        DesgSubCateMasterView.savedata(data);
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
        DesgSubCateMasterView.variables.dx_dataGrid = $("#dx_dataGrid").dxDataGrid({
            dataSource: new DevExpress.data.CustomStore({
                key: "desgsubcateid",
                load: function (loadOptions) {
                    var deferred = $.Deferred();

                    var result = DevExVariables.GetDataList(loadOptions, DesgSubCateMasterView.variables.BindGroupListUrl);

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
            columns: [{ dataField: "desgsubcateid", allowFiltering: false, allowSorting: true, sortIndex: 1, sortOrder: "desc", visible: false },
                { dataField: "code", caption: "Design Code", dataType: "string", filterOperations: ["contains"], allowSorting: true, allowFiltering: false, allowHeaderFiltering: false },
                { dataField: "desgsubcate", caption: "Design Sub Category Name", dataType: "string", filterOperations: ["contains"], allowSorting: true, allowFiltering: true, allowHeaderFiltering: false },
                { dataField: "desgcate", caption: "Design Category", dataType: "string", filterOperations: ["contains"], allowSorting: true, allowFiltering: false, allowHeaderFiltering: false },
                { dataField: "collectionname", caption: "Collection Name", dataType: "string", filterOperations: ["contains"], allowSorting: true, allowFiltering: false, allowHeaderFiltering: false },
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
                                      DesgSubCateMasterView.EditFromGrid(data.value, options.key, 'Active');
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
                        DevExVariables.ActionTemplate(container, options, true, true, "DesgSubCateMasterView");
                    }
                },
            ]
        }).dxDataGrid("instance");
    },

    triggerId: function (id) {
        var rowData = DesgSubCateMasterView.variables.dx_dataGrid.getVisibleRows()[DesgSubCateMasterView.variables.dx_dataGrid.getRowIndexByKey(+id)].data;
        DesgSubCateMasterView.variables.Masterid = id;
        DesgSubCateMasterView.variables.dx_txtDesgCode.option({ value: rowData.code });
        DesgSubCateMasterView.variables.dx_txtDesgSubCateName.option({ value: rowData.desgsubcate });
        DesgSubCateMasterView.variables.dx_txtDesgCate.option({ value: rowData.desgcateid });
        DesgSubCateMasterView.variables.dx_txtCollName.option({ value: rowData.collectionid });
        DesgSubCateMasterView.variables.dx_numDisplayOrder.option({ value: rowData.displayorder });
        DesgSubCateMasterView.variables.dx_switchIsActive.option({ value: rowData.isactive });
        DesgSubCateMasterView.variables.dx_txtDescription.option({ value: rowData.description });
        $("#frm_DesgSubCateMaster").show();
        $("#pnlView").hide();

        if (isU()) {
            DesgSubCateMasterView.variables.dx_btnSubmit.option({ visible: true });
        }
        else {
            DesgSubCateMasterView.variables.dx_btnSubmit.option({ visible: false });
        }
    },

    deleteRow: function (id) {
        var rowData = DesgSubCateMasterView.variables.dx_dataGrid.getVisibleRows()[DesgSubCateMasterView.variables.dx_dataGrid.getRowIndexByKey(+id)].data;
        DesgSubCateMasterView.variables.Masterid = id;
        DesgSubCateMasterView.variables.DeleteDataObj = rowData;
        DesgSubCateMasterView.variables.Oper = "Delete";

        if (DesgSubCateMasterView.variables.dx_popupRecordDelete) {
            DesgSubCateMasterView.variables.dx_popupRecordDelete.option("contentTemplate", DesgSubCateMasterView.variables.DeletePopUpOptions.contentTemplate(DesgSubCateMasterView.variables.DeleteDataObj).bind(this));
        }
        else {
            DesgSubCateMasterView.variables.dx_popupRecordDelete = $("#dx_popupRecordDelete").dxPopup(DesgSubCateMasterView.variables.DeletePopUpOptions).dxPopup("instance");
        }

        DesgSubCateMasterView.variables.dx_popupRecordDelete.show();
    },

    btnMasterSubmit: function () {
        DesgSubCateMasterView.variables.Oper = 'Add';
        DesgSubCateMasterView.variables.addedit = "added";

        if (DesgSubCateMasterView.variables.Masterid != "0" && parseInt(DesgSubCateMasterView.variables.Masterid) > 0) {
            DesgSubCateMasterView.variables.Oper = 'Edit';
            DesgSubCateMasterView.variables.addedit = 'updated';
        }

        DesgSubCateMasterView.variables.dx_btnSubmit.option({ disabled: true });

        var data = {
            "DESGSUBCATEID": DesgSubCateMasterView.variables.Masterid,
            "CODE": DesgSubCateMasterView.variables.dx_txtDesgCode.option().value,
            "DESGSUBCATE": DesgSubCateMasterView.variables.dx_txtDesgSubCateName.option().value,
            "DESGCATEID": DesgSubCateMasterView.variables.dx_txtDesgCate.option().value,
            "COLLECTIONID": DesgSubCateMasterView.variables.dx_txtCollName.option().value,
            "DESCRIPTION": DesgSubCateMasterView.variables.dx_txtDescription.option().value,
            "ISACTIVE": DesgSubCateMasterView.variables.dx_switchIsActive.option().value,
            "DISPLAYORDER": DesgSubCateMasterView.variables.dx_numDisplayOrder.option().value,
            "oper": DesgSubCateMasterView.variables.Oper,
        }

        if (DesgSubCateMasterView.variables.dx_txtDescription.option().value)
            data.DESCRIPTION = DesgSubCateMasterView.variables.dx_txtDescription.option().value;

        DesgSubCateMasterView.savedata(data);
    },

    savedata: function (data) {
        $.ajax({
            url: getDomain() + DesgSubCateMasterView.variables.PerformMasterOperationUrl,
            data: data,
            async: true,
            cache: false,
            type: 'POST',
            beforeSend: function () {
                dx_LoaderTrinity.show();
            },
            complete: function () {
                dx_LoaderTrinity.hide();
                DesgSubCateMasterView.variables.dx_btnSubmit.option({ disabled: false });
            },
            success: DesgSubCateMasterView.btnMasterSubmitOnSuccess,
            error: OnError,
        });
    },

    btnMasterSubmitOnSuccess: function (data) {
        if ($(data).find('RESPONSECODE').text() == "0") {
            DevExVariables.Toaster("success", 'Record is ' + DesgSubCateMasterView.variables.addedit + ' successfully');
            $('#frm_DesgSubCateMaster').hide();
            $('#pnlView').show();
            if (DesgSubCateMasterView.variables.dx_popupRecordDelete)
                DesgSubCateMasterView.variables.dx_popupRecordDelete.hide();

            DesgSubCateMasterView.ClearValues();
            DesgSubCateMasterView.variables.dx_dataGrid.refresh();
        }
        else {
            DevExVariables.InvalidResponseCode(data);
        }
    },

    ClearValues: function () {
        DesgSubCateMasterView.variables.Masterid = "";
        DesgSubCateMasterView.variables.Oper = 'Add';
        DesgSubCateMasterView.variables.addedit = "added";
        DesgSubCateMasterView.variables.DeleteDataObj = "";
        DevExpress.validationEngine.resetGroup("DesgSubCateMaster");
        DesgSubCateMasterView.variables.dx_txtDescription.option("value", "");
        DesgSubCateMasterView.variables.dx_numDisplayOrder.option("value", 0);

        $('#frm_DesgSubCateMaster').hide();
        $('#pnlView').show();
    },

    FormInitialize: function () {

        DesgSubCateMasterView.variables.dx_txtDesgCode = $("#dx_txtDesgCode").dxTextBox({
            placeholder: "Enter Design Code...",
        }).dxValidator({
            validationGroup: "DesgSubCateMaster",
            validationRules: [{
                type: "required",
                message: "Design Code is required"
            }]
        }).dxTextBox("instance");

        DesgSubCateMasterView.variables.dx_txtDesgSubCateName = $("#dx_txtDesgSubCateName").dxTextBox({
            placeholder: "Enter Design Sub Category Name...",
        }).dxValidator({
            validationGroup: "DesgSubCateMaster",
            validationRules: [{
                type: "required",
                message: "Design Sub Category Name is required"
            }]
        }).dxTextBox("instance");       
      
        DesgSubCateMasterView.variables.dx_txtDesgCate = $("#dx_txtDesgCate").dxSelectBox({
            placeholder: "Select Design Category...",
            searchEnabled: true,
        }).dxValidator({
            validationGroup: "DesgSubCateMaster",
            validationRules: [{
                type: "required",
                message: "Design Category is required"
            }]
        }).dxSelectBox("instance");

        DesgSubCateMasterView.variables.dx_txtCollName = $("#dx_txtCollName").dxSelectBox({
            placeholder: "Select Collection Name...",
            searchEnabled: true,
        }).dxSelectBox("instance");

        DesgSubCateMasterView.variables.dx_numDisplayOrder = $("#dx_numDisplayOrder").dxNumberBox({
            placeholder: "Enter Display Order...",
            min: 0,
        }).dxValidator({
            validationGroup: "DesgSubCateMaster",
            validationRules: [{
                type: "required",
                message: "Display Order is required"
            }]
        }).dxNumberBox("instance");

        DesgSubCateMasterView.variables.dx_switchIsActive = $("#dx_switchIsActive").dxSwitch({
            value: true,
            switchedOnText: "Yes",
            switchedOffText: "No"
        }).dxValidator({
            validationGroup: "DesgSubCateMaster",
            validationRules: []
        }).dxSwitch("instance");

        DesgSubCateMasterView.variables.dx_txtDescription = $("#dx_txtDescription").dxTextArea({
            height: 110
        }).dxTextArea("instance");

        DesgSubCateMasterView.variables.dx_btnSubmit = $("#dx_btnSubmit").dxButton({
            icon: "check",
            text: "Submit",
            type: "success",
            validationGroup: "DesgSubCateMaster",
            onClick: function (e) {
                var validation = DevExpress.validationEngine.validateGroup("DesgSubCateMaster");
                if (!validation.isValid) {
                    DevExVariables.Toaster("warning", "Please fill all required fields before submit.");
                    return;
                }

                DesgSubCateMasterView.btnMasterSubmit();

                //e.validationGroup.reset();
            }
        }).dxButton("instance");

        DesgSubCateMasterView.variables.dx_btnCancel = $("#dx_btnCancel").dxButton({
            icon: "close",
            text: "Cancel",
            type: "danger",
            validationGroup: "DesgSubCateMaster",
            onClick: function (e) {
                DesgSubCateMasterView.ClearValues();
            }
        }).dxButton("instance");

        DesgSubCateMasterView.variables.dx_btnAddNew = $("#dx_btnAddNew").dxButton({
            stylingMode: "outlined",
            icon: "plus",
            text: "Add New",
            type: "default",
            validationGroup: "DesgSubCateMaster",
            onClick: function (e) {
                DesgSubCateMasterView.variables.Masterid = "";

                $("#frm_DesgSubCateMaster").show();
                $("#pnlView").hide();

                DesgSubCateMasterView.variables.dx_txtDesgCode.focus();
            }
        }).dxButton("instance");
    },

    GetDesgCateList: function () {
        var myfilter = { rules: [] };
        myfilter.rules.push({ field: "TYPE", op: "eq", data: "desgcate" });
        $.ajax({
            url: getDomain() + DesgSubCateMasterView.variables.BindStaticDataUrl + "&myfilters=" + JSON.stringify(myfilter),
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

                        DesgSubCateMasterView.variables.dx_txtDesgCate.option({
                            dataSource: new DevExpress.data.ArrayStore({
                                data: List,
                                key: 'desgcateid',
                            }),
                            displayExpr: 'desgcate',
                            valueExpr: 'desgcateid',
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

    GetCollectionList: function () {
        var myfilter = { rules: [] };
        myfilter.rules.push({ field: "TYPE", op: "eq", data: "Collection" });
        $.ajax({
            url: getDomain() + DesgSubCateMasterView.variables.BindStaticDataUrl + "&myfilters=" + JSON.stringify(myfilter),
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

                        DesgSubCateMasterView.variables.dx_txtCollName.option({
                            dataSource: new DevExpress.data.ArrayStore({
                                data: List,
                                key: 'collectionid',
                            }),
                            displayExpr: 'collectionname',
                            valueExpr: 'collectionid',
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
    
    EditFromGrid: function (val, id, type) {
        var data = {
            "DESGSUBCATEID": id,
            "OPER_TYPE": "EditFromGrid"
        }

        if (type == "Active")
            data.ISACTIVE = val;

        $.ajax({
            url: getDomain() + DesgSubCateMasterView.variables.PerformMasterOperationUrl,
            data: data,
            async: true,
            cache: false,
            type: 'POST',
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    DevExVariables.Toaster("success", 'Record is updated successfully.');

                    DesgSubCateMasterView.variables.dx_dataGrid.refresh();
                }
            },
            error: OnError,
        });
    },

}

$(document).ready(function () {
    DesgSubCateMasterView.FormInitialize();

    DesgSubCateMasterView.initializeDevExgrid();

    DesgSubCateMasterView.GetDesgCateList();

    DesgSubCateMasterView.GetCollectionList();
});