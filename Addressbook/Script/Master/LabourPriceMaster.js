var labourPriceMasterView = {
    variables: {
        BindGroupListUrl: "/Common/BindMastersDetails?ServiceName=ACC_LABOUR_PRICEMASTER_GET",
        PerformMasterOperationUrl: "/Common/OpeartionsOnMaster?ServiceName=ACC_LABOUR_PRICEMASTER_CRUD",
        PerformMasterDetailsOperationUrl: "/Common/OpeartionsOnMaster?ServiceName=ACC_LABOUR_PRICELIST_CRUD",
        BindLabourMasterDetailsListUrl: "/Common/BindMastersDetails?ServiceName=ACC_LABOUR_PRICELIST_GET",
        BindStaticDataUrl: "/Common/BindMastersDetails?ServiceName=STATIC_MASTER_GET&IsActive=true",
        BindSubCategoryUrl: "/Common/BindMastersDetails?ServiceName=PRD_RMSUBCATE_MASTER_GET",
        Oper: 'Add',
        addedit: "added",
        Masterid: "",
        RowCount: 1,
        dx_btnAddNew: "",
        dx_txtlppricelist: "",
        dx_txtDescription: "",
        dx_txtDisplayOrder: "",
        dx_switchIsActive: "",
        dx_btnSubmit: "",
        dx_btnCancel: "",
        dx_dataGrid: "",
        dx_dataDetailsGrid: "",
        RMSubCateList: [],
        dx_popupRecordDelete: "",
        DeleteDataObj: "",
        DeletePopUpOptions: {
            width: 300,
            height: 200,
            contentTemplate: function () {
                return $("<div />").append(
                    $("<p>Labour Price Name: <span>" + labourPriceMasterView.variables.DeleteDataObj.lppricelist + "</span></p>")
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
                            "LPID": labourPriceMasterView.variables.Masterid,
                            "oper": labourPriceMasterView.variables.Oper,
                        }
                        $.ajax({
                            url: getDomain() + labourPriceMasterView.variables.PerformMasterOperationUrl,
                            data: data,
                            async: true,
                            cache: false,
                            type: 'POST',
                            success: function (data) {
                                if ($(data).find('RESPONSECODE').text() == "0") {
                                    DevExVariables.Toaster("success", 'Record is deleted successfully');

                                    labourPriceMasterView.variables.dx_popupRecordDelete.hide();
                                    labourPriceMasterView.variables.dx_dataGrid.refresh();
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
        labourPriceMasterView.variables.dx_btnAddNew = $("#dx_btnAddNew").dxButton({
            stylingMode: "outlined",
            icon: "plus",
            text: "Add New",
            type: "default",
            validationGroup: "labourPriceMaster",
            onClick: function (e) {
                $("#frm_LabourPriceMaster").show();
                $("#pnlView").hide();
                labourPriceMasterView.variables.Masterid = "";
            }
        }).dxButton("instance");

        labourPriceMasterView.variables.dx_txtlppricelist = $("#dx_txtlppricelist").dxTextBox({
            mode: "text",
            placeholder: "Enter Price List Name..."
        }).dxValidator({
            validationGroup: "labourPriceMaster",
            validationRules: [{
                type: "required",
                message: "labour Price List is required"
            }]
        }).dxTextBox("instance");

        labourPriceMasterView.variables.dx_txtDescription = $("#dx_txtDescription").dxTextArea({
            height: 110
        }).dxTextArea("instance");

        labourPriceMasterView.variables.dx_switchIsActive = $("#dx_switchIsActive").dxSwitch({
            value: true,
            switchedOnText: "Yes",
            switchedOffText: "No"
        }).dxValidator({
            validationGroup: "labourPriceMaster",
            validationRules: []
        }).dxSwitch("instance");

        labourPriceMasterView.variables.dx_txtDisplayOrder = $("#dx_txtDisplayOrder").dxTextBox({
            mode: "number",
            value: 0,
        }).dxValidator({
            validationGroup: "labourPriceMaster",
            validationRules: [{
                type: "required",
                message: "Display Order is required"
            }]
        }).dxTextBox("instance");

        //--------------------------------------- Submit button---------------------------------------

        labourPriceMasterView.variables.dx_btnSubmit = $("#dx_btnSubmit").dxButton({
            icon: "check",
            text: "Submit",
            type: "success",
            //useSubmitBehavior: true,
            onClick: function (e) {
                var validation = DevExpress.validationEngine.validateGroup("labourPriceMaster");
                if (!validation.isValid) {
                    DevExVariables.Toaster("warning", "Please fill all required fields before submit.");
                    return;
                }
                labourPriceMasterView.btnMasterSubmit();
                //labourPriceMasterView.triggerId();
            }
        }).dxButton("instance");

        //--------------------------------------- Cancle button---------------------------------------

        labourPriceMasterView.variables.dx_btnCancel = $("#dx_btnCancel").dxButton({
            icon: "close",
            text: "Cancel",
            type: "danger",
            onClick: function (e) {
                $("#frm_LabourPriceMaster").hide();
                $("#pnlView").show();
                labourPriceMasterView.variables.dx_dataGrid.refresh();
                labourPriceMasterView.ClearValues();
            }
        }).dxButton("instance");


    },

    initializeDevExgrid: function () {
        labourPriceMasterView.variables.dx_dataGrid = $("#dx_dataGrid").dxDataGrid({
            dataSource: new DevExpress.data.CustomStore({
                key: "lpid",
                load: function (loadOptions) {
                    var deferred = $.Deferred();

                    var result = DevExVariables.GetDataList(loadOptions, labourPriceMasterView.variables.BindGroupListUrl);

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
            columns: [{ dataField: "lpid", allowFiltering: false, allowSorting: true, sortIndex: 1, sortOrder: "desc", visible: false },
                { dataField: "lppricelist", caption: "Labour Price List", dataType: "string", filterOperations: ["contains"], allowSorting: true, allowFiltering: true, allowHeaderFiltering: false },
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
                        DevExVariables.ActionTemplate(container, options, true, true, "labourPriceMasterView");
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

        labourPriceMasterView.variables.dx_dataDetailsGrid = $("#dx_dataDetailsGrid").dxDataGrid({
            dataSource: new DevExpress.data.CustomStore({
                key: "id",
                load: function (loadOptions) {
                    var deferred = $.Deferred();

                    var myfilter = { rules: [] };
                    myfilter.rules.push({ field: "LPID", op: "eq", data: labourPriceMasterView.variables.Masterid });

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
                        url: getDomain() + labourPriceMasterView.variables.BindLabourMasterDetailsListUrl + "&" + parameters.join("&") + "&myfilters=" + JSON.stringify(myfilter),
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
                    result = labourPriceMasterView.AddSubCatePriceList(values);

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
                    result = labourPriceMasterView.UpdateSubCatePriceList(key, values);

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
                    result = labourPriceMasterView.RemoveSubCatePriceList(key);

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
                                store: labourPriceMasterView.variables.RMSubCateList,
                            };
                        },
                        displayExpr: 'rmsubcate',
                        valueExpr: 'rmsubcateid',
                    },
                },
                { dataField: "grmfrom", caption: "Gram From", dataType: "string", filterOperations: ["contains"], allowSorting: false, allowFiltering: true, allowHeaderFiltering: false, allowEditing: true },
                { dataField: "grmto", caption: "Gram To", dataType: "string", filterOperations: ["contains"], allowSorting: false, allowFiltering: true, allowHeaderFiltering: false, allowEditing: true },
                { dataField: "regular", caption: "Regular", dataType: "string", filterOperations: ["contains"], allowSorting: false, allowFiltering: true, allowHeaderFiltering: false, allowEditing: true },
                { dataField: "micropave", caption: "Micropave", dataType: "string", filterOperations: ["contains"], allowSorting: false, allowFiltering: true, allowHeaderFiltering: false, allowEditing: true },
                { dataField: "designer", caption: "Designer", dataType: "string", filterOperations: ["contains"], allowSorting: false, allowFiltering: true, allowHeaderFiltering: false, allowEditing: true },
                { dataField: "italian", caption: "Italian", dataType: "string", filterOperations: ["contains"], allowSorting: false, allowFiltering: true, allowHeaderFiltering: false, allowEditing: true },
                { dataField: "plaingold", caption: "Plain Gold", dataType: "string", filterOperations: ["contains"], allowSorting: false, allowFiltering: true, allowHeaderFiltering: false, allowEditing: true },
                { dataField: "handmade", caption: "Hand Made", dataType: "string", filterOperations: ["contains"], allowSorting: false, allowFiltering: true, allowHeaderFiltering: false, allowEditing: true },
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

        //$('#clear').dxButton({
        //    text: 'Clear',
        //    onClick() {
        //        $('#events ul').empty();
        //    },
        //});

    },

    triggerId: function (id) {
        var rowData = labourPriceMasterView.variables.dx_dataGrid.getVisibleRows()[labourPriceMasterView.variables.dx_dataGrid.getRowIndexByKey(+id)].data;
        $("#dx_dataDetailsGrid").show();
        labourPriceMasterView.variables.Masterid = id;
        labourPriceMasterView.variables.dx_txtlppricelist.option({ value: rowData.lppricelist });
        labourPriceMasterView.variables.dx_txtDisplayOrder.option({ value: rowData.displayorder });
        labourPriceMasterView.variables.dx_txtDescription.option({ value: rowData.description });
        labourPriceMasterView.variables.dx_switchIsActive.option({ value: rowData.isactive });

        labourPriceMasterView.DetailsDevExgrid();

        $("#frm_LabourPriceMaster").show();
        $("#pnlView").hide();
        if (isU()) {
            labourPriceMasterView.variables.dx_btnSubmit.option({ visible: true });
        }
        else {
            labourPriceMasterView.variables.dx_btnSubmit.option({ visible: false });
        }
    },

    btnMasterSubmit: function () {
        labourPriceMasterView.variables.Oper = 'Add';
        labourPriceMasterView.variables.addedit = "added";

        if (labourPriceMasterView.variables.Masterid != "0" && parseInt(labourPriceMasterView.variables.Masterid) > 0) {
            labourPriceMasterView.variables.Oper = 'Edit';
            labourPriceMasterView.variables.addedit = 'updated';
        }
        labourPriceMasterView.variables.dx_btnSubmit.option({ disabled: true });

        var data = {
            "LPID": labourPriceMasterView.variables.Masterid,
            "LPPRICELIST": labourPriceMasterView.variables.dx_txtlppricelist.option().value,
            "DISPLAYORDER": labourPriceMasterView.variables.dx_txtDisplayOrder.option().value,
            "ISACTIVE": labourPriceMasterView.variables.dx_switchIsActive.option().value,
            "oper": labourPriceMasterView.variables.Oper,
        }

        if (labourPriceMasterView.variables.dx_txtDescription.option().value)
            data.DESCRIPTION = labourPriceMasterView.variables.dx_txtDescription.option().value;

        labourPriceMasterView.savedata(data);
    },

    savedata: function (data) {
        $.ajax({
            url: getDomain() + labourPriceMasterView.variables.PerformMasterOperationUrl,
            data: data,
            async: true,
            cache: false,
            type: 'POST',
            beforeSend: function () {
                dx_LoaderTrinity.show();
            },
            complete: function () {
                dx_LoaderTrinity.hide();
                labourPriceMasterView.variables.dx_btnSubmit.option({ disabled: false });
            },
            success: labourPriceMasterView.btnMasterSubmitOnSuccess,
            error: OnError,
        });
    },

    AddSubCatePriceList: function (obj) {
        var data = {
            "RMSUBCATEID": obj.rmsubcateid,
            "GRMFROM": obj.grmfrom,
            "GRMTO": obj.grmto,
            "REGULAR": obj.regular,
            "MICROPAVE": obj.micropave,
            "DESIGNER": obj.designer,
            "ITALIAN": obj.italian,
            "PLAINGOLD": obj.plaingold,
            "HANDMADE": obj.handmade,
            "LPID": labourPriceMasterView.variables.Masterid,
            "oper": "Add",
        }

        $.ajax({
            url: getDomain() + labourPriceMasterView.variables.PerformMasterDetailsOperationUrl,
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

        var rowData = labourPriceMasterView.variables.dx_dataDetailsGrid.getVisibleRows()[labourPriceMasterView.variables.dx_dataDetailsGrid.getRowIndexByKey(+rowId)].data;

        var data = {
            "ID": rowId,
            "RMSUBCATEID": obj.rmsubcateid ? obj.rmsubcateid : rowData.rmsubcateid,
            "GRMFROM": obj.grmfrom ? obj.grmfrom : rowData.grmfrom,
            "GRMTO": obj.grmto ? obj.grmto : rowData.grmto,
            "REGULAR": obj.regular ? obj.regular : rowData.regular,
            "MICROPAVE": obj.micropave ? obj.micropave : rowData.micropave,
            "DESIGNER": obj.designer ? obj.designer : rowData.designer,
            "ITALIAN": obj.italian ? obj.italian : rowData.italian,
            "PLAINGOLD": obj.plaingold ? obj.plaingold : rowData.plaingold,
            "HANDMADE": obj.handmade ? obj.handmade : rowData.handmade,
            "LPID": labourPriceMasterView.variables.Masterid,
            "oper": "Edit",
        }

        $.ajax({
            url: getDomain() + labourPriceMasterView.variables.PerformMasterDetailsOperationUrl,
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
            url: getDomain() + labourPriceMasterView.variables.PerformMasterDetailsOperationUrl,
            data: data,
            async: true,
            cache: false,
            type: 'POST',
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    DevExVariables.Toaster("success", 'Record is deleted successfully');
                    labourPriceMasterView.variables.dx_dataDetailsGrid.refresh();
                }
                else {
                    DevExVariables.InvalidResponseCode(data);
                }
            },
            error: OnError,
        });
    },

    btnMasterSubmitOnSuccess: function (data) {
        if ($(data).find('RESPONSECODE').text() == "0") {
            DevExVariables.Toaster("success", 'Record is ' + labourPriceMasterView.variables.addedit + ' successfully');
            var JsonObject = xml2json.parser(data);
            if (JsonObject.serviceresponse) {
                    labourPriceMasterView.variables.Masterid = JsonObject.serviceresponse.masterid;
            }
            $("#dx_dataDetailsGrid").show();
            labourPriceMasterView.DetailsDevExgrid();

        }
        else {
            InvalidResponseCode(data);
        }
    },

    deleteRow: function (id) {
        var rowData = labourPriceMasterView.variables.dx_dataGrid.getVisibleRows()[labourPriceMasterView.variables.dx_dataGrid.getRowIndexByKey(+id)].data;
        labourPriceMasterView.variables.Masterid = id;
        labourPriceMasterView.variables.DeleteDataObj = rowData;
        labourPriceMasterView.variables.Oper = "Delete";

        if (labourPriceMasterView.variables.dx_popupRecordDelete) {
            labourPriceMasterView.variables.dx_popupRecordDelete.option("contentTemplate", labourPriceMasterView.variables.DeletePopUpOptions.contentTemplate(labourPriceMasterView.variables.DeleteDataObj).bind(this));
        }
        else {
            labourPriceMasterView.variables.dx_popupRecordDelete = $("#dx_popupRecordDelete").dxPopup(labourPriceMasterView.variables.DeletePopUpOptions).dxPopup("instance");
        }

        labourPriceMasterView.variables.dx_popupRecordDelete.show();
    },

    ClearValues: function () {
        labourPriceMasterView.variables.Masterid = "";
        labourPriceMasterView.variables.Oper = 'Add';
        labourPriceMasterView.variables.addedit = "added";
        labourPriceMasterView.variables.DeleteDataObj = "";
        DevExpress.validationEngine.resetGroup("labourPriceMaster");
        labourPriceMasterView.variables.dx_switchIsActive.option("value", true);
        labourPriceMasterView.variables.dx_txtDescription.option("value", "");
        labourPriceMasterView.variables.dx_txtDisplayOrder.option("value", 0);
        labourPriceMasterView.variables.dx_btnSubmit.option({ visible: true });
        labourPriceMasterView.variables.dx_dataGrid.refresh();
        $("#dx_dataDetailsGrid").hide();
        $("#frm_LabourPriceMaster").hide();
        $("#pnlView").show();
    },

    GetRmSubCategory: function () {

        $.ajax({
            url: getDomain() + labourPriceMasterView.variables.BindSubCategoryUrl,
            async: true,
            cache: false,
            type: 'POST',
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    var JsonObject = xml2json.parser(data);
                    if (JsonObject.serviceresponse.detailslist) {
                        if (JsonObject.serviceresponse.detailslist.details.length) {
                            labourPriceMasterView.variables.RMSubCateList = JsonObject.serviceresponse.detailslist.details;
                        }
                        else {
                            labourPriceMasterView.variables.RMSubCateList.push(JsonObject.serviceresponse.detailslist.details);
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
    labourPriceMasterView.FormInitialize();
    labourPriceMasterView.GetRmSubCategory();
    labourPriceMasterView.initializeDevExgrid();
});