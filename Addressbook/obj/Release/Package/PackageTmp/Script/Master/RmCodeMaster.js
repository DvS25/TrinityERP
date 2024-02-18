var RmCodeMasterView = {
    variables: {
        BindGroupListUrl: "/Common/BindMastersDetails?ServiceName=PRD_RMCODE_MASTER_GET",
        PerformMasterOperationUrl: "/Common/OpeartionsOnMaster?ServiceName=PRD_RMCODE_MASTER_CRUD",
        BindStaticDataUrl: "/Common/BindMastersDetails?ServiceName=STATIC_MASTER_GET&IsActive=true",
        Oper: 'Add',
        addedit: "added",
        Masterid: "",
        dx_btnAddNew: "",
        dx_txtRMCode: "",
        dx_txtRMName: "",
        dx_ddlRMSubCat: "",
        dx_ddlRMShape: "",
        dx_ddlRMPurity: "",
        dx_ddlRMColor: "",
        dx_numPurityPer: "",
        dx_numMelPer: "",
        dx_numProdMelPer: "",
        dx_switchUseSalePurchase: "",
        dx_switchUseBagFinish: "",
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
                    $("<p>RM Code: <span>" + RmCodeMasterView.variables.DeleteDataObj.rmcode + "</span></p>"),
                    $("<p>RM Name: <span>" + RmCodeMasterView.variables.DeleteDataObj.rmname + "</span></p>")
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
                            "RMCODEID": RmCodeMasterView.variables.Masterid,
                            "oper": RmCodeMasterView.variables.Oper,
                        }

                        RmCodeMasterView.savedata(data);
                    },
                }
            }],
            showTitle: true,
            title: "Delete Record?",
            visible: false,
            dragEnabled: false,
            closeOnOutsideClick: true
        },

        RmSubCateList: [],
        RmShapeList: [],
        RmPurityList: [],
        RmColorList: [],
    },

    initializeDevExgrid: function () {
        RmCodeMasterView.variables.dx_dataGrid = $("#dx_dataGrid").dxDataGrid({
            dataSource: new DevExpress.data.CustomStore({
                key: "rmcodeid",
                load: function (loadOptions) {
                    var deferred = $.Deferred();

                    var result = DevExVariables.GetDataList(loadOptions, RmCodeMasterView.variables.BindGroupListUrl);

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
            columns: [{ dataField: "rmcodeid", allowFiltering: false, allowSorting: true, sortIndex: 1, sortOrder: "desc", visible: false },
                { dataField: "rmcode", caption: "RM Code", dataType: "string", filterOperations: ["contains"], allowSorting: true, allowFiltering: true, allowHeaderFiltering: false },
                { dataField: "rmname", caption: "RM Name", dataType: "string", filterOperations: ["contains"], allowSorting: true, allowFiltering: true, allowHeaderFiltering: false },
                { dataField: "rmsubcate", caption: "Sub Category", dataType: "string", filterOperations: ["contains"], allowSorting: true, allowFiltering: true, allowHeaderFiltering: false },
                { dataField: "rmcate", caption: "Category", dataType: "string", filterOperations: ["contains"], allowSorting: true, allowFiltering: true, allowHeaderFiltering: false },
                { dataField: "rmgroup", caption: "Group", dataType: "string", filterOperations: ["contains"], allowSorting: true, allowFiltering: true, allowHeaderFiltering: false },
                { dataField: "shape", caption: "Shape", dataType: "string", filterOperations: ["contains"], allowSorting: true, allowFiltering: true, allowHeaderFiltering: false },
                { dataField: "purity", caption: "Purity", dataType: "string", filterOperations: ["contains"], allowSorting: true, allowFiltering: true, allowHeaderFiltering: false },
                { dataField: "colour", caption: "Colour", dataType: "string", filterOperations: ["contains"], allowSorting: true, allowFiltering: true, allowHeaderFiltering: false },
                { dataField: "purityper", caption: "PurityPer", dataType: "string", filterOperations: ["contains"], allowSorting: true, allowFiltering: true, allowHeaderFiltering: false },
                { dataField: "melper", caption: "MelPer", dataType: "string", filterOperations: ["contains"], allowSorting: true, allowFiltering: true, allowHeaderFiltering: false },
                { dataField: "prodmelper", caption: "ProdMelPer", dataType: "string", filterOperations: ["contains"], allowSorting: true, allowFiltering: true, allowHeaderFiltering: false },
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
                     dataField: "usesalepur", caption: "UseSalePur", dataType: "string", alignment: "center", filterOperations: ["contains"],
                     allowSorting: false, allowFiltering: false, allowHeaderFiltering: true,
                     headerFilter: {
                         dataSource: [{
                             text: "Yes",
                             value: ["usesalepur", "equals", 1]
                         }, {

                             text: "No",
                             value: ["usesalepur", "equals", 0]
                         }]
                     },
                     cellTemplate: function (container, options) {
                         DevExVariables.LabelTemplate(container, options);
                     }
                 },
                  {
                      dataField: "usebagfinish", caption: "UseBagFinish", dataType: "string", alignment: "center", filterOperations: ["contains"],
                      allowSorting: false, allowFiltering: false, allowHeaderFiltering: true,
                      headerFilter: {
                          dataSource: [{
                              text: "Yes",
                              value: ["usebagfinish", "equals", 1]
                          }, {

                              text: "No",
                              value: ["usebagfinish", "equals", 0]
                          }]
                      },
                      cellTemplate: function (container, options) {
                          DevExVariables.LabelTemplate(container, options);
                      }
                  },
                {
                    dataField: "Action", caption: "Action", alignment: "center", allowFiltering: false, allowSorting: false, fixed: true, fixedPosition: "right",
                    cellTemplate: function (container, options) {
                        DevExVariables.ActionTemplate(container, options, true, true, "RmCodeMasterView");
                    }
                },
            ]
        }).dxDataGrid("instance");
    },

    triggerId: function (id) {
        var rowData = RmCodeMasterView.variables.dx_dataGrid.getVisibleRows()[RmCodeMasterView.variables.dx_dataGrid.getRowIndexByKey(+id)].data;
        RmCodeMasterView.variables.Masterid = id;
        RmCodeMasterView.variables.dx_txtRMCode.option({ value: rowData.rmcode });
        RmCodeMasterView.variables.dx_txtRMName.option({ value: rowData.rmname });
        RmCodeMasterView.variables.dx_ddlRMSubCat.option({ value: rowData.rmsubcateid });
        RmCodeMasterView.variables.dx_ddlRMShape.option({ value: rowData.shapeid });
        RmCodeMasterView.variables.dx_ddlRMPurity.option({ value: rowData.purityid });
        RmCodeMasterView.variables.dx_ddlRMColor.option({ value: rowData.colourid });
        RmCodeMasterView.variables.dx_numPurityPer.option({ value: rowData.purityper });
        RmCodeMasterView.variables.dx_numMelPer.option({ value: rowData.melper });
        RmCodeMasterView.variables.dx_numProdMelPer.option({ value: rowData.prodmelper });
        RmCodeMasterView.variables.dx_switchUseSalePurchase.option({ value: rowData.usesalepur });
        RmCodeMasterView.variables.dx_switchUseBagFinish.option({ value: rowData.usebagfinish });
        RmCodeMasterView.variables.dx_switchIsActive.option({ value: rowData.isactive });
        RmCodeMasterView.variables.dx_txtDescription.option({ value: rowData.description });
        $("#frm_RmCodeMaster").show();
        $("#pnlView").hide();

        if (isU()) {
            RmCodeMasterView.variables.dx_btnSubmit.option({ visible: true });
        }
        else {
            RmCodeMasterView.variables.dx_btnSubmit.option({ visible: false });
        }
    },

    deleteRow: function (id) {
        var rowData = RmCodeMasterView.variables.dx_dataGrid.getVisibleRows()[RmCodeMasterView.variables.dx_dataGrid.getRowIndexByKey(+id)].data;
        RmCodeMasterView.variables.Masterid = id;
        RmCodeMasterView.variables.DeleteDataObj = rowData;
        RmCodeMasterView.variables.Oper = "Delete";

        if (RmCodeMasterView.variables.dx_popupRecordDelete) {
            RmCodeMasterView.variables.dx_popupRecordDelete.option("contentTemplate", RmCodeMasterView.variables.DeletePopUpOptions.contentTemplate(RmCodeMasterView.variables.DeleteDataObj).bind(this));
        }
        else {
            RmCodeMasterView.variables.dx_popupRecordDelete = $("#dx_popupRecordDelete").dxPopup(RmCodeMasterView.variables.DeletePopUpOptions).dxPopup("instance");
        }

        RmCodeMasterView.variables.dx_popupRecordDelete.show();
    },

    btnMasterSubmit: function () {
        RmCodeMasterView.variables.Oper = 'Add';
        RmCodeMasterView.variables.addedit = "added";

        if (RmCodeMasterView.variables.Masterid != "0" && parseInt(RmCodeMasterView.variables.Masterid) > 0) {
            RmCodeMasterView.variables.Oper = 'Edit';
            RmCodeMasterView.variables.addedit = 'updated';
        }

        RmCodeMasterView.variables.dx_btnSubmit.option({ disabled: true });

        var data = {
            "RMCODEID": RmCodeMasterView.variables.Masterid,
            "RMCODE": RmCodeMasterView.variables.dx_txtRMCode.option().value,
            "RMNAME": RmCodeMasterView.variables.dx_txtRMName.option().value,
            "RMSUBCATEID": RmCodeMasterView.variables.dx_ddlRMSubCat.option().selectedItem.rmsubcateid,
            "RMCATEID": RmCodeMasterView.variables.dx_ddlRMSubCat.option().selectedItem.rmcateid,
            "RMGROUPID": RmCodeMasterView.variables.dx_ddlRMSubCat.option().selectedItem.rmgroupid,
            //"SHAPEID": RmCodeMasterView.variables.dx_ddlRMShape.option().value,
            //"PURITYID": RmCodeMasterView.variables.dx_ddlRMPurity.option().value,
            //"COLOURID": RmCodeMasterView.variables.dx_ddlRMColor.option().value,
            "PURITYPER": RmCodeMasterView.variables.dx_numPurityPer.option().value,
            "MELPER": RmCodeMasterView.variables.dx_numMelPer.option().value,
            "PRODMELPER": RmCodeMasterView.variables.dx_numProdMelPer.option().value,
            "USESALEPUR": RmCodeMasterView.variables.dx_switchUseSalePurchase.option().value,
            "USEBAGFINISH": RmCodeMasterView.variables.dx_switchUseBagFinish.option().value,
            //"DESCRIPTION": RmCodeMasterView.variables.dx_txtDescription.option().value,
            "ISACTIVE": RmCodeMasterView.variables.dx_switchIsActive.option().value,
            "oper": RmCodeMasterView.variables.Oper,
        }

        if (RmCodeMasterView.variables.dx_ddlRMShape.option().value)
            data.SHAPEID = RmCodeMasterView.variables.dx_ddlRMShape.option().value;

        if (RmCodeMasterView.variables.dx_ddlRMPurity.option().value)
            data.PURITYID = RmCodeMasterView.variables.dx_ddlRMPurity.option().value;

        if (RmCodeMasterView.variables.dx_ddlRMColor.option().value)
            data.COLOURID = RmCodeMasterView.variables.dx_ddlRMColor.option().value;

        if (RmCodeMasterView.variables.dx_txtDescription.option().value)
            data.DESCRIPTION = RmCodeMasterView.variables.dx_txtDescription.option().value;

        RmCodeMasterView.savedata(data);
    },

    savedata: function (data) {
        $.ajax({
            url: getDomain() + RmCodeMasterView.variables.PerformMasterOperationUrl,
            data: data,
            async: true,
            cache: false,
            type: 'POST',
            beforeSend: function () {
                dx_LoaderTrinity.show();
            },
            complete: function () {
                dx_LoaderTrinity.hide();
                RmCodeMasterView.variables.dx_btnSubmit.option({ disabled: false });
            },
            success: RmCodeMasterView.btnMasterSubmitOnSuccess,
            error: OnError,
        });
    },

    btnMasterSubmitOnSuccess: function (data) {
        if ($(data).find('RESPONSECODE').text() == "0") {
            DevExVariables.Toaster("success", 'Record is ' + RmCodeMasterView.variables.addedit + ' successfully');
            $('#frm_RmCodeMaster').hide();
            $('#pnlView').show();
            if (RmCodeMasterView.variables.dx_popupRecordDelete)
                RmCodeMasterView.variables.dx_popupRecordDelete.hide();

            RmCodeMasterView.ClearValues();
            RmCodeMasterView.variables.dx_dataGrid.refresh();
        }
        else {
            DevExVariables.InvalidResponseCode(data);
        }
    },

    ClearValues: function () {
        RmCodeMasterView.variables.Masterid = "";
        RmCodeMasterView.variables.Oper = 'Add';
        RmCodeMasterView.variables.addedit = "added";
        RmCodeMasterView.variables.DeleteDataObj = "";
        DevExpress.validationEngine.resetGroup("RmCodeMaster");

        $('#frm_RmCodeMaster').hide();
        $('#pnlView').show();
    },

    FormInitialize: function () {
        RmCodeMasterView.variables.dx_txtRMCode = $("#dx_txtRMCode").dxTextBox({
            placeholder: "Enter RM Code...",
        }).dxValidator({
            validationGroup: "RmCodeMaster",
            validationRules: [{
                type: "required",
                message: "RM Code is required"
            }]
        }).dxTextBox("instance");

        RmCodeMasterView.variables.dx_txtRMName = $("#dx_txtRMName").dxTextBox({
            placeholder: "Enter RM Name...",
        }).dxValidator({
            validationGroup: "RmCodeMaster",
            validationRules: [{
                type: "required",
                message: "RM Name is required"
            }]
        }).dxTextBox("instance");

        RmCodeMasterView.variables.dx_ddlRMSubCat = $("#dx_ddlRMSubCat").dxSelectBox({
            placeholder: "Select Sub Category...",
            searchEnabled: true,
            onValueChanged(data) {
                if (data.component.option().selectedItem) {
                    RmCodeMasterView.variables.dx_ddlRMShape.option({
                        dataSource: new DevExpress.data.ArrayStore({
                            data: RmCodeMasterView.variables.RmShapeList.filter(function (x) { return x.rmcateid == data.component.option().selectedItem.rmcateid }),
                            key: 'shapeid',
                        }),
                    });

                    RmCodeMasterView.variables.dx_ddlRMPurity.option({
                        dataSource: new DevExpress.data.ArrayStore({
                            data: RmCodeMasterView.variables.RmPurityList.filter(function (x) { return x.rmsubcateid == data.component.option().selectedItem.rmsubcateid }),
                            key: 'purityid',
                        }),
                    });

                    RmCodeMasterView.variables.dx_ddlRMColor.option({
                        dataSource: new DevExpress.data.ArrayStore({
                            data: RmCodeMasterView.variables.RmColorList.filter(function (x) { return x.rmsubcateid == data.component.option().selectedItem.rmsubcateid }),
                            key: 'colourid',
                        }),
                    });
                }
                else {
                    RmCodeMasterView.variables.dx_ddlRMShape.option({
                        dataSource: new DevExpress.data.ArrayStore({
                            data: [],
                            key: 'shapeid',
                        }),
                    });

                    RmCodeMasterView.variables.dx_ddlRMPurity.option({
                        dataSource: new DevExpress.data.ArrayStore({
                            data: [],
                            key: 'purityid',
                        }),
                    });

                    RmCodeMasterView.variables.dx_ddlRMColor.option({
                        dataSource: new DevExpress.data.ArrayStore({
                            data: [],
                            key: 'colourid',
                        }),
                    });
                }
            },
        }).dxValidator({
            validationGroup: "RmCodeMaster",
            validationRules: [{
                type: "required",
                message: "RM Sub Category is required"
            }]
        }).dxSelectBox("instance");

        RmCodeMasterView.variables.dx_ddlRMShape = $("#dx_ddlRMShape").dxSelectBox({
            placeholder: "Select Shape...",
            searchEnabled: true,
            displayExpr: 'shape',
            valueExpr: 'shapeid',
            value: ""
        }).dxValidator({
            validationGroup: "RmCodeMaster",
            validationRules: []
        }).dxSelectBox("instance");

        RmCodeMasterView.variables.dx_ddlRMPurity = $("#dx_ddlRMPurity").dxSelectBox({
            placeholder: "Select Purity...",
            searchEnabled: true,
            displayExpr: 'purity',
            valueExpr: 'purityid',
            value: ""
        }).dxValidator({
            validationGroup: "RmCodeMaster",
            validationRules: []
        }).dxSelectBox("instance");

        RmCodeMasterView.variables.dx_ddlRMColor = $("#dx_ddlRMColor").dxSelectBox({
            placeholder: "Select Color...",
            searchEnabled: true,
            displayExpr: 'colour',
            valueExpr: 'colourid',
            value: ""
        }).dxValidator({
            validationGroup: "RmCodeMaster",
            validationRules: []
        }).dxSelectBox("instance");

        RmCodeMasterView.variables.dx_numPurityPer = $("#dx_numPurityPer").dxNumberBox({
            placeholder: "Enter Purity Per...",
            min: 0,
        }).dxValidator({
            validationGroup: "RmCodeMaster",
            validationRules: []
        }).dxNumberBox("instance");

        RmCodeMasterView.variables.dx_numMelPer = $("#dx_numMelPer").dxNumberBox({
            placeholder: "Enter Melting Per...",
            min: 0,
        }).dxValidator({
            validationGroup: "RmCodeMaster",
            validationRules: []
        }).dxNumberBox("instance");

        RmCodeMasterView.variables.dx_numProdMelPer = $("#dx_numProdMelPer").dxNumberBox({
            placeholder: "Enter Prod Melting Per...",
            min: 0,
        }).dxValidator({
            validationGroup: "RmCodeMaster",
            validationRules: []
        }).dxNumberBox("instance");

        RmCodeMasterView.variables.dx_switchUseSalePurchase = $("#dx_switchUseSalePurchase").dxSwitch({
            value: false,
            switchedOnText: "Yes",
            switchedOffText: "No"
        }).dxValidator({
            validationGroup: "RmCodeMaster",
            validationRules: []
        }).dxSwitch("instance");

        RmCodeMasterView.variables.dx_switchUseBagFinish = $("#dx_switchUseBagFinish").dxSwitch({
            value: false,
            switchedOnText: "Yes",
            switchedOffText: "No"
        }).dxValidator({
            validationGroup: "RmCodeMaster",
            validationRules: []
        }).dxSwitch("instance");

        RmCodeMasterView.variables.dx_switchIsActive = $("#dx_switchIsActive").dxSwitch({
            value: true,
            switchedOnText: "Yes",
            switchedOffText: "No"
        }).dxValidator({
            validationGroup: "RmCodeMaster",
            validationRules: []
        }).dxSwitch("instance");

        RmCodeMasterView.variables.dx_txtDescription = $("#dx_txtDescription").dxTextArea({
            height: 110
        }).dxTextArea("instance");

        RmCodeMasterView.variables.dx_btnSubmit = $("#dx_btnSubmit").dxButton({
            icon: "check",
            text: "Submit",
            type: "success",
            validationGroup: "RmCodeMaster",
            onClick: function (e) {
                var validation = DevExpress.validationEngine.validateGroup("RmCodeMaster");
                if (!validation.isValid) {
                    DevExVariables.Toaster("warning", "Please fill all required fields before submit.");
                    return;
                }

                RmCodeMasterView.btnMasterSubmit();

                //e.validationGroup.reset();
            }
        }).dxButton("instance");

        RmCodeMasterView.variables.dx_btnCancel = $("#dx_btnCancel").dxButton({
            icon: "close",
            text: "Cancel",
            type: "danger",
            validationGroup: "RmCodeMaster",
            onClick: function (e) {
                RmCodeMasterView.ClearValues();
            }
        }).dxButton("instance");

        RmCodeMasterView.variables.dx_btnAddNew = $("#dx_btnAddNew").dxButton({
            stylingMode: "outlined",
            icon: "plus",
            text: "Add New",
            type: "default",
            validationGroup: "RmCodeMaster",
            onClick: function (e) {
                RmCodeMasterView.variables.Masterid = "";

                $("#frm_RmCodeMaster").show();
                $("#pnlView").hide();

                RmCodeMasterView.variables.dx_txtRMCode.focus();
            }
        }).dxButton("instance");
    },

    GetRmSubCateList: function () {
        var myfilter = { rules: [] };
        myfilter.rules.push({ field: "TYPE", op: "eq", data: "RmSubcate" });
        myfilter.rules.push({ field: "RMGROUP", op: "eq", data: "MATERIAL,METAL,LABOUR" });
        $.ajax({
            url: getDomain() + RmCodeMasterView.variables.BindStaticDataUrl + "&myfilters=" + JSON.stringify(myfilter),
            async: true,
            cache: false,
            type: 'POST',
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    var JsonObject = xml2json.parser(data);
                    if (JsonObject.serviceresponse.detailslist) {
                        if (JsonObject.serviceresponse.detailslist.details.length) {
                            RmCodeMasterView.variables.RmSubCateList = JsonObject.serviceresponse.detailslist.details;
                        }
                        else {
                            RmCodeMasterView.variables.RmSubCateList.push(JsonObject.serviceresponse.detailslist.details);
                        }

                        RmCodeMasterView.variables.dx_ddlRMSubCat.option({
                            dataSource: new DevExpress.data.ArrayStore({
                                data: RmCodeMasterView.variables.RmSubCateList,
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

    GetRmShapeList: function () {
        var myfilter = { rules: [] };
        myfilter.rules.push({ field: "TYPE", op: "eq", data: "shape" });
        $.ajax({
            url: getDomain() + RmCodeMasterView.variables.BindStaticDataUrl + "&myfilters=" + JSON.stringify(myfilter),
            async: true,
            cache: false,
            type: 'POST',
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    var JsonObject = xml2json.parser(data);
                    if (JsonObject.serviceresponse.detailslist) {
                        if (JsonObject.serviceresponse.detailslist.details.length) {
                            RmCodeMasterView.variables.RmShapeList = JsonObject.serviceresponse.detailslist.details;
                        }
                        else {
                            RmCodeMasterView.variables.RmShapeList.push(JsonObject.serviceresponse.detailslist.details);
                        }
                    }
                }
                else {
                    DevExVariables.InvalidResponseCode(data);
                }
            },
            error: OnError
        });
    },

    GetRmPurityList: function () {
        var myfilter = { rules: [] };
        myfilter.rules.push({ field: "TYPE", op: "eq", data: "Purity" });
        $.ajax({
            url: getDomain() + RmCodeMasterView.variables.BindStaticDataUrl + "&myfilters=" + JSON.stringify(myfilter),
            async: true,
            cache: false,
            type: 'POST',
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    var JsonObject = xml2json.parser(data);
                    if (JsonObject.serviceresponse.detailslist) {
                        if (JsonObject.serviceresponse.detailslist.details.length) {
                            RmCodeMasterView.variables.RmPurityList = JsonObject.serviceresponse.detailslist.details;
                        }
                        else {
                            RmCodeMasterView.variables.RmPurityList.push(JsonObject.serviceresponse.detailslist.details);
                        }
                    }
                }
                else {
                    DevExVariables.InvalidResponseCode(data);
                }
            },
            error: OnError
        });
    },

    GetRmColorList: function () {
        var myfilter = { rules: [] };
        myfilter.rules.push({ field: "TYPE", op: "eq", data: "Colour" });
        $.ajax({
            url: getDomain() + RmCodeMasterView.variables.BindStaticDataUrl + "&myfilters=" + JSON.stringify(myfilter),
            async: true,
            cache: false,
            type: 'POST',
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    var JsonObject = xml2json.parser(data);
                    if (JsonObject.serviceresponse.detailslist) {
                        if (JsonObject.serviceresponse.detailslist.details.length) {
                            RmCodeMasterView.variables.RmColorList = JsonObject.serviceresponse.detailslist.details;
                        }
                        else {
                            RmCodeMasterView.variables.RmColorList.push(JsonObject.serviceresponse.detailslist.details);
                        }
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
    RmCodeMasterView.FormInitialize();

    RmCodeMasterView.initializeDevExgrid();

    RmCodeMasterView.GetRmSubCateList();
    RmCodeMasterView.GetRmShapeList();
    RmCodeMasterView.GetRmPurityList();
    RmCodeMasterView.GetRmColorList();
});