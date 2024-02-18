var MaterialPriceMasterView = {
    variables: {
        BindGroupListUrl: "/Common/BindMastersDetails?ServiceName=ACC_MATERIAL_PRICEMASTER_GET",
        PerformMasterOperationUrl: "/Common/OpeartionsOnMaster?ServiceName=ACC_MATERIAL_PRICEMASTER_CRUD",
        BindLabourMasterDetailsListUrl: "/Common/BindMastersDetails?ServiceName=ACC_MATERIAL_PRICELIST_GET",
        PerformMasterDetailsOperationUrl: "/Common/OpeartionsOnMaster?ServiceName=ACC_MATERIAL_PRICELIST_CRUD",
        BindSubCategoryUrl: "/Common/BindMastersDetails?ServiceName=PRD_RMSUBCATE_MASTER_GET",
        BindShapeUrl: "/Common/BindMastersDetails?ServiceName=PRD_RMSHAPE_MASTER_GET",
        BindColourUrl: "/Common/BindMastersDetails?ServiceName=PRD_RMCOLOUR_MASTER_GET",
        BindStaticDataUrl: "/Common/BindMastersDetails?ServiceName=STATIC_MASTER_GET&IsActive=true",
        Oper: 'Add',
        addedit: "added",
        Masterid: "",
        RowCount: 1,
        dx_btnAddNew: "",
        dx_txtrmpricelist: "",
        dx_txtDescription: "",
        dx_txtDisplayOrder: "",
        dx_switchIsActive: "",
        dx_btnSubmit: "",
        dx_btnCancel: "",
        dx_dataGrid: "",
        dx_dataDetailsGrid:"",
        RMCateList: [],
        RMSubCateList: [],
        ShapeList: [],
        ColourList: [],
        dx_popupRecordDelete: "",
        DeleteDataObj: "",
        DeletePopUpOptions: {
            width: 300,
            height: 200,
            contentTemplate: function () {
                return $("<div />").append(
                    $("<p>Material Price Name: <span>" + MaterialPriceMasterView.variables.DeleteDataObj.rmpricelist + "</span></p>")
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
                            "RMPLID": MaterialPriceMasterView.variables.Masterid,
                            "oper": MaterialPriceMasterView.variables.Oper,
                        }
                        $.ajax({
                            url: getDomain() + MaterialPriceMasterView.variables.PerformMasterOperationUrl,
                            data: data,
                            async: true,
                            cache: false,
                            type: 'POST',
                            success: function (data) {
                                if ($(data).find('RESPONSECODE').text() == "0") {
                                    DevExVariables.Toaster("success", 'Record is deleted successfully');

                                    MaterialPriceMasterView.variables.dx_popupRecordDelete.hide();
                                    MaterialPriceMasterView.variables.dx_dataGrid.refresh();
                                }
                                else {
                                    DevExVariables.InvalidResponseCode(data);
                                }
                            },
                            error: OnError,
                        });
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
        MaterialPriceMasterView.variables.dx_btnAddNew = $("#dx_btnAddNew").dxButton({
            stylingMode: "outlined",
            icon: "plus",
            text: "Add New",
            type: "default",
            validationGroup: "materialPriceMaster",
            onClick: function (e) {
                $("#frm_MaterialPriceMaster").show();
                $("#pnlView").hide();
                MaterialPriceMasterView.variables.Masterid = "";
            }
        }).dxButton("instance");

        MaterialPriceMasterView.variables.dx_txtrmpricelist = $("#dx_txtrmpricelist").dxTextBox({
            mode: "text",
            placeholder: "Enter Price List Name..."
        }).dxValidator({
            validationGroup: "materialPriceMaster",
            validationRules: [{
                type: "required",
                message: "Material Price List is required"
            }]
        }).dxTextBox("instance");

        MaterialPriceMasterView.variables.dx_txtDescription = $("#dx_txtDescription").dxTextArea({
            height: 110
        }).dxTextArea("instance");

        MaterialPriceMasterView.variables.dx_switchIsActive = $("#dx_switchIsActive").dxSwitch({
            value: true,
            switchedOnText: "Yes",
            switchedOffText: "No"
        }).dxValidator({
            validationGroup: "materialPriceMaster",
            validationRules: []
        }).dxSwitch("instance");

        MaterialPriceMasterView.variables.dx_txtDisplayOrder = $("#dx_txtDisplayOrder").dxTextBox({
            mode: "number",
            value: 0,
        }).dxValidator({
            validationGroup: "materialPriceMaster",
            validationRules: [{
                type: "required",
                message: "Display Order is required"
            }]
        }).dxTextBox("instance");

        //--------------------------------------- Submit button---------------------------------------

        MaterialPriceMasterView.variables.dx_btnSubmit = $("#dx_btnSubmit").dxButton({
            icon: "check",
            text: "Submit",
            type: "success",
            //useSubmitBehavior: true,
            onClick: function (e) {
                var validation = DevExpress.validationEngine.validateGroup("materialPriceMaster");
                if (!validation.isValid) {
                    DevExVariables.Toaster("warning", "Please fill all required fields before submit.");
                    return;
                }
                MaterialPriceMasterView.btnMasterSubmit();
            }
        }).dxButton("instance");

        //--------------------------------------- Cancle button---------------------------------------

        MaterialPriceMasterView.variables.dx_btnCancel = $("#dx_btnCancel").dxButton({
            icon: "close",
            text: "Cancel",
            type: "danger",
            onClick: function (e) {
                $("#frm_MaterialPriceMaster").hide();
                $("#pnlView").show();
                MaterialPriceMasterView.variables.dx_dataGrid.refresh();
                MaterialPriceMasterView.ClearValues();
            }
        }).dxButton("instance");
    },

    initializeDevExgrid: function () {
        MaterialPriceMasterView.variables.dx_dataGrid = $("#dx_dataGrid").dxDataGrid({
            dataSource: new DevExpress.data.CustomStore({
                key: "rmplid",
                load: function (loadOptions) {
                    var deferred = $.Deferred();

                    var result = DevExVariables.GetDataList(loadOptions, MaterialPriceMasterView.variables.BindGroupListUrl);

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
            columnFixing: {
                enabled: true,
            },
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
            columns: [{ dataField: "rmplid", allowFiltering: false, allowSorting: true, sortIndex: 1, sortOrder: "desc", visible: false },
                { dataField: "rmpricelist", caption: "Material Price List", dataType: "string", filterOperations: ["contains"], allowSorting: true, allowFiltering: true, allowHeaderFiltering: false },
                { dataField: "displayorder", caption: "Display Order", dataType: "string", filterOperations: ["contains"], allowSorting: false, allowFiltering: true, allowHeaderFiltering: false },
                { dataField: "description", caption: "Description", dataType: "string", filterOperations: ["contains"], allowSorting: false, allowFiltering: false, allowHeaderFiltering: false },
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
                        DevExVariables.ActionTemplate(container, options, true, true, "MaterialPriceMasterView");
                    }
                },
            ]
        }).dxDataGrid("instance");
    },

    DetailsDevExgrid: function () {

        function logEvent(eventName) {
            const logList = $('#events ul');
            const newItem = $('<li>', { text: eventName });

            logList.prepend(newItem);
        }

        MaterialPriceMasterView.variables.dx_dataDetailsGrid = $("#dx_dataDetailsGrid").dxDataGrid({
            dataSource: new DevExpress.data.CustomStore({
                key: "id",
                load: function (loadOptions) {
                    var deferred = $.Deferred();

                    var myfilter = { rules: [] };
                    myfilter.rules.push({ field: "RMPLID", op: "eq", data: MaterialPriceMasterView.variables.Masterid });

                    var result, parameters = [];

                    if (isNotEmpty(loadOptions["take"])) {
                        parameters.push("rows=" + loadOptions["take"]);
                    }
                    if (isNotEmpty(loadOptions["skip"])) {
                        parameters.push("page=" + ((loadOptions["skip"] / loadOptions["take"]) + 1));
                    }
                    if (isNotEmpty(loadOptions["sort"])) {
                        parameters.push("sidx=" + loadOptions["sort"][0].selector);
                        parameters.push("sord=" + (loadOptions["sort"][0].desc ? "desc" : "asc"));
                    }
                    if (isNotEmpty(loadOptions["filter"])) {
                        if (loadOptions["filter"].columnIndex >= 0) {
                            filterField = loadOptions["filter"][0].toUpperCase();
                            filterOp = GetOperationShortName(loadOptions["filter"][1]);
                            filterData = loadOptions["filter"][2];
                            myfilter.rules.push({ field: filterField, op: filterOp, data: filterData });
                        }
                        else {
                            $.each(loadOptions["filter"], function (key, obj) {
                                if (obj.length && obj != "!") {
                                    filterField = obj[0].toUpperCase();
                                    filterOp = GetOperationShortName(obj[1]);
                                    filterData = obj[2];
                                    myfilter.rules.push({ field: filterField, op: filterOp, data: filterData });
                                }
                            });
                        }
                    }

                    $.ajax({
                        url: getDomain() + MaterialPriceMasterView.variables.BindLabourMasterDetailsListUrl + "&" + parameters.join("&") + "&myfilters=" + JSON.stringify(myfilter),
                        async: false,
                        cache: false,
                        type: 'POST',
                        success: function (data) {
                            if ($(data).find("RESPONSECODE").text() == 0) {
                                result = xml2json.parser(data);
                            }
                            else {
                                result = "Error";
                            }
                        },
                        error: function () {
                            result = "Error";
                        }
                    });

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
                },
                insert: function (values) {

                    var deferred = $.Deferred();
                    var result;
                    result = MaterialPriceMasterView.AddSubCatePriceList(values);

                    if (result != "Error") {
                        deferred.resolve();
                    }
                    else {
                        deferred.reject("Data Loading Error");
                    }
                },
                update(key, values) {
                    var deferred = $.Deferred();
                    var result;
                    result = MaterialPriceMasterView.UpdateSubCatePriceList(key, values);

                    if (result != "Error") {
                        deferred.resolve();
                    }
                    else {
                        deferred.reject("Data Loading Error");
                    }
                },
                remove: function (key) {

                    var deferred = $.Deferred();
                    var result;
                    result = MaterialPriceMasterView.RemoveSubCatePriceList(key);

                    if (result != "Error") {
                        deferred.resolve();
                    }
                    else {
                        deferred.reject("Data Loading Error");
                    }
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
            columnFixing: {
                enabled: true,
            },
            filterRow: {
                visible: true,
                applyFilter: "auto",
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
            editing: {
                mode: 'row',
                allowUpdating: true,
                allowDeleting: true,
                allowAdding: true,
            },
            columns: [{ dataField: "id", allowFiltering: false, allowSorting: true, sortIndex: 1, sortOrder: "desc", visible: false },
                {
                    dataField: "rmsubcateid", caption: "Sub Category", dataType: "string", filterOperations: ["equal"], allowSorting: true, allowFiltering: true, allowHeaderFiltering: false, allowEditing: true,
                    lookup: {
                        dataSource(options) {
                            return {
                                store: MaterialPriceMasterView.variables.RMSubCateList,
                            };
                        },
                        displayExpr: 'rmsubcate',
                        valueExpr: 'rmsubcateid',
                    },
                },
                {
                    dataField: "shapeid", caption: "Shape", dataType: "string", filterOperations: ["equal"], allowSorting: true, allowFiltering: true, allowHeaderFiltering: false, allowEditing: true,
                    lookup: {
                        dataSource(options) {
                            return {
                                store: MaterialPriceMasterView.variables.ShapeList,
                            };
                        },
                        displayExpr: 'shape',
                        valueExpr: 'shapeid',
                    },
                },
                { dataField: "groupcharni", caption: "Group Charni", dataType: "string", filterOperations: ["contains"], allowSorting: false, allowFiltering: false, allowHeaderFiltering: false, allowEditing: true },
                { dataField: "sentsize", caption: "Sent Size", dataType: "string", filterOperations: ["contains"], allowSorting: false, allowFiltering: false, allowHeaderFiltering: false, allowEditing: true },
                {
                    dataField: "colourid", caption: "Colour", dataType: "string", filterOperations: ["equal"], allowSorting: true, allowFiltering: true, allowHeaderFiltering: false, allowEditing: true,
                    lookup: {
                        dataSource(options) {
                            return {
                                store: MaterialPriceMasterView.variables.ColourList,
                            };
                        },
                        displayExpr: 'colour',
                        valueExpr: 'colourid',
                    },
                },
                { dataField: "vvs1", caption: "Regular", dataType: "string", filterOperations: ["contains"], allowSorting: false, allowFiltering: false, allowHeaderFiltering: false, allowEditing: true },
                { dataField: "vvs2", caption: "Micropave", dataType: "string", filterOperations: ["contains"], allowSorting: false, allowFiltering: false, allowHeaderFiltering: false, allowEditing: true },
                { dataField: "vs1", caption: "VS1", dataType: "string", filterOperations: ["contains"], allowSorting: false, allowFiltering: false, allowHeaderFiltering: false, allowEditing: true },
                { dataField: "vs2", caption: "VS2", dataType: "string", filterOperations: ["contains"], allowSorting: false, allowFiltering: false, allowHeaderFiltering: false, allowEditing: true },
                { dataField: "si1", caption: "SI1", dataType: "string", filterOperations: ["contains"], allowSorting: false, allowFiltering: false, allowHeaderFiltering: false, allowEditing: true },
                { dataField: "si2", caption: "SI2", dataType: "string", filterOperations: ["contains"], allowSorting: false, allowFiltering: false, allowHeaderFiltering: false, allowEditing: true },
                { dataField: "si3", caption: "SI3", dataType: "string", filterOperations: ["contains"], allowSorting: false, allowFiltering: false, allowHeaderFiltering: false, allowEditing: true },
                { dataField: "i1", caption: "I1", dataType: "string", filterOperations: ["contains"], allowSorting: false, allowFiltering: false, allowHeaderFiltering: false, allowEditing: true },
                { dataField: "i2", caption: "I2", dataType: "string", filterOperations: ["contains"], allowSorting: false, allowFiltering: false, allowHeaderFiltering: false, allowEditing: true },
                { dataField: "vvs", caption: "VVS", dataType: "string", filterOperations: ["contains"], allowSorting: false, allowFiltering: false, allowHeaderFiltering: false, allowEditing: true },
                { dataField: "vs", caption: "VS", dataType: "string", filterOperations: ["contains"], allowSorting: false, allowFiltering: false, allowHeaderFiltering: false, allowEditing: true },
                { dataField: "si", caption: "SI", dataType: "string", filterOperations: ["contains"], allowSorting: false, allowFiltering: false, allowHeaderFiltering: false, allowEditing: true },
                { dataField: "i", caption: "I", dataType: "string", filterOperations: ["contains"], allowSorting: false, allowFiltering: false, allowHeaderFiltering: false, allowEditing: true },
                { dataField: "vvs_vs", caption: "VVS_VS", dataType: "string", filterOperations: ["contains"], allowSorting: false, allowFiltering: false, allowHeaderFiltering: false, allowEditing: true },
                { dataField: "vs_si", caption: "VS_SI", dataType: "string", filterOperations: ["contains"], allowSorting: false, allowFiltering: false, allowHeaderFiltering: false, allowEditing: true },
                { dataField: "si_i", caption: "SI_I", dataType: "string", filterOperations: ["contains"], allowSorting: false, allowFiltering: false, allowHeaderFiltering: false, allowEditing: true },
                { dataField: "sygnety", caption: "SYGNETY", dataType: "string", filterOperations: ["contains"], allowSorting: false, allowFiltering: false, allowHeaderFiltering: false, allowEditing: true },
                { dataField: "synthetic", caption: "SYNTHETIC", dataType: "string", filterOperations: ["contains"], allowSorting: false, allowFiltering: false, allowHeaderFiltering: false, allowEditing: true },
                { dataField: "precious", caption: "PRECIOUS", dataType: "string", filterOperations: ["contains"], allowSorting: false, allowFiltering: false, allowHeaderFiltering: false, allowEditing: true },
                { dataField: "none", caption: "NONE", dataType: "string", filterOperations: ["contains"], allowSorting: false, allowFiltering: false, allowHeaderFiltering: false, allowEditing: true },
                { dataField: "calcunit", caption: "CALCUNIT", dataType: "string", filterOperations: ["contains"], allowSorting: false, allowFiltering: false, allowHeaderFiltering: false, allowEditing: true },
                { dataField: "currate", caption: "CURRATE", dataType: "string", filterOperations: ["contains"], allowSorting: false, allowFiltering: false, allowHeaderFiltering: false, allowEditing: true },
            ],
            onEditingStart() {
                logEvent('EditingStart');
            },
            onInitNewRow() {
                logEvent('InitNewRow');
            },
            onRowInserting() {
                logEvent('RowInserting');
            },
            onRowInserted() {
                logEvent('RowInserted');
            },
            onRowUpdating() {
                logEvent('RowUpdating');
            },
            onRowUpdated() {
                logEvent('RowUpdated');
            },
            onRowRemoving() {
                logEvent('RowRemoving');
            },
            onRowRemoved() {
                logEvent('RowRemoved');
            },
            onSaving() {
                logEvent('Saving');
            },
            onSaved() {
                logEvent('Saved');
            },
            onEditCanceling() {
                logEvent('EditCanceling');
            },
            onEditCanceled() {
                logEvent('EditCanceled');
            },
        }).dxDataGrid("instance");
    },

    triggerId: function (id) {
        var rowData = MaterialPriceMasterView.variables.dx_dataGrid.getVisibleRows()[MaterialPriceMasterView.variables.dx_dataGrid.getRowIndexByKey(+id)].data;
        $("#dx_dataDetailsGrid").show();
        MaterialPriceMasterView.variables.Masterid = id;
        MaterialPriceMasterView.variables.dx_txtrmpricelist.option({ value: rowData.rmpricelist });
        MaterialPriceMasterView.variables.dx_txtDisplayOrder.option({ value: rowData.displayorder });
        MaterialPriceMasterView.variables.dx_txtDescription.option({ value: rowData.description });
        MaterialPriceMasterView.variables.dx_switchIsActive.option({ value: rowData.isactive });

        MaterialPriceMasterView.DetailsDevExgrid();

        $("#frm_MaterialPriceMaster").show();
        $("#pnlView").hide();
        if (isU()) {
            MaterialPriceMasterView.variables.dx_btnSubmit.option({ visible: true });
        }
        else {
            MaterialPriceMasterView.variables.dx_btnSubmit.option({ visible: false });
        }
    },

    btnMasterSubmit: function () {
        MaterialPriceMasterView.variables.Oper = 'Add';
        MaterialPriceMasterView.variables.addedit = "added";

        if (MaterialPriceMasterView.variables.Masterid != "0" && parseInt(MaterialPriceMasterView.variables.Masterid) > 0) {
            MaterialPriceMasterView.variables.Oper = 'Edit';
            MaterialPriceMasterView.variables.addedit = 'updated';
        }
        MaterialPriceMasterView.variables.dx_btnSubmit.option({ disabled: true });

        var data = {
            "RMPLID": MaterialPriceMasterView.variables.Masterid,
            "RMPRICELIST": MaterialPriceMasterView.variables.dx_txtrmpricelist.option().value,
            "DISPLAYORDER": MaterialPriceMasterView.variables.dx_txtDisplayOrder.option().value,
            "ISACTIVE": MaterialPriceMasterView.variables.dx_switchIsActive.option().value,
            "oper": MaterialPriceMasterView.variables.Oper,
        }

        if (MaterialPriceMasterView.variables.dx_txtDescription.option().value)
            data.DESCRIPTION = MaterialPriceMasterView.variables.dx_txtDescription.option().value;

        MaterialPriceMasterView.savedata(data);
    },

    savedata: function (data) {
        $.ajax({
            url: getDomain() + MaterialPriceMasterView.variables.PerformMasterOperationUrl,
            data: data,
            async: true,
            cache: false,
            type: 'POST',
            beforeSend: function () {
                dx_LoaderTrinity.show();
            },
            complete: function () {
                dx_LoaderTrinity.hide();
                MaterialPriceMasterView.variables.dx_btnSubmit.option({ disabled: false });
            },
            success: MaterialPriceMasterView.btnMasterSubmitOnSuccess,
            error: OnError,
        });
    },

    btnMasterSubmitOnSuccess: function (data) {
        if ($(data).find('RESPONSECODE').text() == "0") {
            DevExVariables.Toaster("success", 'Record is ' + MaterialPriceMasterView.variables.addedit + ' successfully');
            var JsonObject = xml2json.parser(data);
            if (JsonObject.serviceresponse) {
                MaterialPriceMasterView.variables.Masterid = JsonObject.serviceresponse.masterid;
            }
            $("#dx_dataDetailsGrid").show();
            MaterialPriceMasterView.DetailsDevExgrid();

        }
        else {
            InvalidResponseCode(data);
        }
    },

    deleteRow: function (id) {
        var rowData = MaterialPriceMasterView.variables.dx_dataGrid.getVisibleRows()[MaterialPriceMasterView.variables.dx_dataGrid.getRowIndexByKey(+id)].data;
        MaterialPriceMasterView.variables.Masterid = id;
        MaterialPriceMasterView.variables.DeleteDataObj = rowData;
        MaterialPriceMasterView.variables.Oper = "Delete";

        if (MaterialPriceMasterView.variables.dx_popupRecordDelete) {
            MaterialPriceMasterView.variables.dx_popupRecordDelete.option("contentTemplate", MaterialPriceMasterView.variables.DeletePopUpOptions.contentTemplate(MaterialPriceMasterView.variables.DeleteDataObj).bind(this));
        }
        else {
            MaterialPriceMasterView.variables.dx_popupRecordDelete = $("#dx_popupRecordDelete").dxPopup(MaterialPriceMasterView.variables.DeletePopUpOptions).dxPopup("instance");
        }

        MaterialPriceMasterView.variables.dx_popupRecordDelete.show();
    },

    ClearValues: function () {
        MaterialPriceMasterView.variables.Masterid = "";
        MaterialPriceMasterView.variables.Oper = 'Add';
        MaterialPriceMasterView.variables.addedit = "added";
        MaterialPriceMasterView.variables.DeleteDataObj = "";
        DevExpress.validationEngine.resetGroup("materialPriceMaster");
        MaterialPriceMasterView.variables.dx_switchIsActive.option("value", true);
        MaterialPriceMasterView.variables.dx_txtDescription.option("value", "");
        MaterialPriceMasterView.variables.dx_txtDisplayOrder.option("value", 0);
        MaterialPriceMasterView.variables.dx_btnSubmit.option({ visible: true });
        MaterialPriceMasterView.variables.dx_dataGrid.refresh();
        $("#dx_dataDetailsGrid").hide();
        $("#frm_MaterialPriceMaster").hide();
        $("#pnlView").show();
    },

    AddSubCatePriceList: function (obj) {
        var data = {
            "RMSUBCATEID": obj.rmsubcateid,
            "SHAPEID": obj.shapeid,
            "GROUPCHARNI": obj.groupcharni ? obj.groupcharni.replace("+", "%2b") : obj.groupcharni,
            "SENTSIZE": obj.sentsize ? obj.sentsize.replace("+", "%2b") : obj.sentsize,
            "COLOURID": obj.colourid,
            "VVS1": obj.vvs1,
            "VVS2": obj.vvs2,
            "VS1": obj.vs1,
            "VS2": obj.vs2,
            "SI1": obj.si1,
            "SI2": obj.si2,
            "SI3": obj.si3,
            "I1": obj.i1,
            "I2": obj.i2,
            "VVS": obj.vvs,
            "VS": obj.vs,
            "SI": obj.si,
            "I": obj.i,
            "VVS_VS": obj.vvs_vs,
            "VS_SI": obj.vs_si,
            "SI_I": obj.si_i,
            "SYGNETY": obj.sygnety,
            "SYNTHETIC": obj.synthetic,
            "PRECIOUS": obj.precious,
            "NONE": obj.none,
            "CALCUNIT": obj.calcunit,
            "CURRATE": obj.currate,
            "RMPLID": MaterialPriceMasterView.variables.Masterid,
            "oper": "Add",
        }

        $.ajax({
            url: getDomain() + MaterialPriceMasterView.variables.PerformMasterDetailsOperationUrl,
            data: data,
            async: false,
            cache: false,
            type: 'POST',
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    DevExVariables.Toaster("success", 'Record Added successfully.');
                }
                else {
                    DevExVariables.InvalidResponseCode(data);
                }
            },
            error: OnError,
        });
    },

    UpdateSubCatePriceList: function (rowId, obj) {

        var rowData = MaterialPriceMasterView.variables.dx_dataDetailsGrid.getVisibleRows()[MaterialPriceMasterView.variables.dx_dataDetailsGrid.getRowIndexByKey(+rowId)].data;

        var data = {
            "ID": rowId,
            "RMSUBCATEID": obj.rmsubcateid ? obj.rmsubcateid : rowData.rmsubcateid,
            "SHAPEID": obj.shapeid ? obj.shapeid : rowData.shapeid,
            "GROUPCHARNI": obj.groupcharni ? obj.groupcharni.replace("+", "%2b") : rowData.groupcharni,
            "SENTSIZE": obj.sentsize ? obj.sentsize.replace("+", "%2b") : rowData.sentsize,
            "COLOURID": obj.colourid ? obj.colourid : rowData.colourid,
            "VVS1": obj.vvs1 ? obj.vvs1 : rowData.vvs1,
            "VVS2": obj.vvs2 ? obj.vvs2 : rowData.vvs2,
            "VS1": obj.vs1 ? obj.vs1 : rowData.vs1,
            "VS2": obj.vs2 ? obj.vs2 : rowData.vs2,
            "SI1": obj.si1 ? obj.si1 : rowData.si1,
            "SI2": obj.si2 ? obj.si2 : rowData.si2,
            "SI3": obj.si3 ? obj.si3 : rowData.si3,
            "I1": obj.i1 ? obj.i1 : rowData.i1,
            "I2": obj.i2 ? obj.i2 : rowData.i2,
            "VVS": obj.vvs ? obj.vvs : rowData.vvs,
            "VS": obj.vs ? obj.vs : rowData.vs,
            "SI": obj.si ? obj.si : rowData.si,
            "I": obj.i ? obj.i : rowData.i,
            "VVS_VS": obj.vvs_vs ? obj.vvs_vs : rowData.vvs_vs,
            "VS_SI": obj.vs_si ? obj.vs_si : rowData.vs_si,
            "SI_I": obj.si_i ? obj.si_i : rowData.si_i,
            "SYGNETY": obj.sygnety ? obj.sygnety : rowData.sygnety,
            "SYNTHETIC": obj.synthetic ? obj.synthetic : rowData.synthetic,
            "PRECIOUS": obj.precious ? obj.precious : rowData.precious,
            "NONE": obj.none ? obj.none : rowData.none,
            "CALCUNIT": obj.calcunit ? obj.calcunit : rowData.calcunit,
            "CURRATE": obj.currate ? obj.currate : rowData.currate,
            "RMPLID": MaterialPriceMasterView.variables.Masterid,
            "oper": "Edit",
        }

        $.ajax({
            url: getDomain() + MaterialPriceMasterView.variables.PerformMasterDetailsOperationUrl,
            data: data,
            async: false,
            cache: false,
            type: 'POST',
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    DevExVariables.Toaster("success", 'Record Updated successfully.');
                }
                else {
                    DevExVariables.InvalidResponseCode(data);
                }
            },
            error: OnError,
        });
    },

    RemoveSubCatePriceList: function (rowId, obj) {
        var data = {
            "ID": rowId,
            "oper": "Delete",
        }

        $.ajax({
            url: getDomain() + MaterialPriceMasterView.variables.PerformMasterDetailsOperationUrl,
            data: data,
            async: true,
            cache: false,
            type: 'POST',
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    DevExVariables.Toaster("success", 'Record is deleted successfully');
                    MaterialPriceMasterView.variables.dx_dataDetailsGrid.refresh();
                }
                else {
                    DevExVariables.InvalidResponseCode(data);
                }
            },
            error: OnError,
        });
    },

    GetRmSubCategory: function () {
        $.ajax({
            url: getDomain() + MaterialPriceMasterView.variables.BindSubCategoryUrl,
            async: true,
            cache: false,
            type: 'POST',
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    var JsonObject = xml2json.parser(data);
                    if (JsonObject.serviceresponse.detailslist) {
                        if (JsonObject.serviceresponse.detailslist.details.length) {
                            MaterialPriceMasterView.variables.RMSubCateList = JsonObject.serviceresponse.detailslist.details;
                        }
                        else {
                            MaterialPriceMasterView.variables.RMSubCateList.push(JsonObject.serviceresponse.detailslist.details);
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

    GetShape: function () {
        $.ajax({
            url: getDomain() + MaterialPriceMasterView.variables.BindShapeUrl,
            async: true,
            cache: false,
            type: 'POST',
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    var JsonObject = xml2json.parser(data);
                    if (JsonObject.serviceresponse.detailslist) {
                        if (JsonObject.serviceresponse.detailslist.details.length) {
                            MaterialPriceMasterView.variables.ShapeList = JsonObject.serviceresponse.detailslist.details;
                        }
                        else {
                            MaterialPriceMasterView.variables.ShapeList.push(JsonObject.serviceresponse.detailslist.details);
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

    GetColour: function () {
        $.ajax({
            url: getDomain() + MaterialPriceMasterView.variables.BindColourUrl,
            async: true,
            cache: false,
            type: 'POST',
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    var JsonObject = xml2json.parser(data);
                    if (JsonObject.serviceresponse.detailslist) {
                        if (JsonObject.serviceresponse.detailslist.details.length) {
                            MaterialPriceMasterView.variables.ColourList = JsonObject.serviceresponse.detailslist.details;
                        }
                        else {
                            MaterialPriceMasterView.variables.ColourList.push(JsonObject.serviceresponse.detailslist.details);
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
    MaterialPriceMasterView.FormInitialize();
    MaterialPriceMasterView.GetRmSubCategory();
    MaterialPriceMasterView.GetShape();
    MaterialPriceMasterView.GetColour();
    MaterialPriceMasterView.initializeDevExgrid();
});