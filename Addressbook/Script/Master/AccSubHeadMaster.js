var AccSubHeadMasterView = {
    variables: {
        BindMainGridListUrl: "/Common/BindMastersDetails?ServiceName=ACC_SUBHEAD_MASTER_GET",
        PerformMasterOperationUrl: "/Common/OpeartionsOnMaster?ServiceName=ACC_SUBHEAD_MASTER_CRUD",
        BindHeadNameUrl: "/Common/BindMastersDetails?ServiceName=ACC_HEAD_MASTER_GET",
        Oper: 'Add',
        addedit: "added",
        Masterid: "",
        dx_btnAddNew: "",
        dx_SubHeadName: "",
        dx_SubHeadCode: "",
        dx_txtHeadname: "",
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
                    $("<p>Sub Head Name: <span>" + AccSubHeadMasterView.variables.DeleteDataObj.subhead + "</span></p>"
                     )
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
                            "SUBHEADID": AccSubHeadMasterView.variables.Masterid,
                            "oper": AccSubHeadMasterView.variables.Oper,
                        }
                        $.ajax({
                            url: getDomain() + AccSubHeadMasterView.variables.PerformMasterOperationUrl,
                            data: data,
                            async: true,
                            cache: false,
                            type: 'POST',
                            success: function (data) {
                                if ($(data).find('RESPONSECODE').text() == "0") {
                                    DevExVariables.Toaster("success", 'Record is deleted successfully');

                                    AccSubHeadMasterView.variables.dx_popupRecordDelete.hide();
                                    AccSubHeadMasterView.variables.dx_dataGrid.refresh();
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

        AccSubHeadMasterView.variables.dx_SubHeadName = $("#dx_SubHeadName").dxTextBox({
            placeholder: "Enter Sub Head Name...",
        }).dxValidator({
            validationGroup: "AccSubHeadMaster",
            validationRules: [{
                type: "required",
                message: "Account Sub Head Name is required"
            }]
        }).dxTextBox("instance");

        AccSubHeadMasterView.variables.dx_SubHeadCode = $("#dx_SubHeadCode").dxTextBox({
            placeholder: "Enter Sub Head Code...",
        }).dxValidator({
            validationGroup: "AccSubHeadMaster",
            validationRules: [{
                type: "required",
                message: "Account Sub Head Name is required"
            }]
        }).dxTextBox("instance");

        AccSubHeadMasterView.variables.dx_txtHeadname = $("#dx_txtHeadname").dxAutocomplete({
            placeholder: "Select Head Name...",
            mode: "search",
            dataSource: new DevExpress.data.CustomStore({
                load: function (loadOptions) {
                    var deferred = $.Deferred();
                    $.ajax({
                        url: getDomain() + AccSubHeadMasterView.variables.BindHeadNameUrl + "&_search=true&searchField=HEADNAME&searchOper=cn&searchString=" + loadOptions.searchValue,
                        async: false,
                        cache: false,
                        type: 'POST',
                        success: function (data) {
                            if ($(data).find('RESPONSECODE').text() == "0") {
                                result = xml2json.parser(data);
                            }
                            else {
                                DevExVariables.InvalidResponseCode(data);
                            }
                        },
                        error: OnError
                    });

                    if (result != "Error" && result) {
                        if (result.serviceresponse.detailslist)
                            deferred.resolve(result.serviceresponse.detailslist.details);
                        else
                            deferred.reject("No Records Found");
                    }
                    else {
                        deferred.reject("Data Loading Error");
                    }

                    return deferred.promise();
                },
                key: "headid",
            }),
            valueExpr: "headname",
            itemTemplate: function (data) {
                return $("<div>" + data.headname + "</div>");
            },
        }).dxValidator({
            validationGroup: "AccSubHeadMaster",
            validationRules: [{
                type: "required",
                message: "Select Head Name"
            }]
        }).dxAutocomplete("instance");

        AccSubHeadMasterView.variables.dx_numDisplayOrder = $("#dx_numDisplayOrder").dxNumberBox({
            placeholder: "Enter Display Order...",
            min: 0,
        }).dxValidator({
            validationGroup: "AccSubHeadMaster",
            validationRules: [{
                type: "required",
                message: "Display Order is required"
            }]
        }).dxNumberBox("instance");

        AccSubHeadMasterView.variables.dx_switchIsActive = $("#dx_switchIsActive").dxSwitch({
            value: true,
            switchedOnText: "Yes",
            switchedOffText: "No"
        }).dxValidator({
            validationGroup: "AccSubHeadMaster",
            validationRules: []
        }).dxSwitch("instance");

        AccSubHeadMasterView.variables.dx_txtDescription = $("#dx_txtDescription").dxTextArea({
            height: 110,
            placeholder: "Enter Description"

        }).dxTextArea("instance");

        //--------------------------------------- Submit button---------------------------------------

        AccSubHeadMasterView.variables.dx_btnSubmit = $("#dx_btnSubmit").dxButton({
            icon: "check",
            text: "Submit",
            type: "success",
            //useSubmitBehavior: true,
            onClick: function (e) {
                var validation = DevExpress.validationEngine.validateGroup("AccSubHeadMaster");
                if (!validation.isValid) {
                    DevExVariables.Toaster("warning", "Please fill all required fields before submit.");
                    return;
                }
                AccSubHeadMasterView.btnMasterSubmit();
            }
        }).dxButton("instance");

        //--------------------------------------- Cancle button---------------------------------------

        AccSubHeadMasterView.variables.dx_btnCancel = $("#dx_btnCancel").dxButton({
            icon: "close",
            text: "Cancel",
            type: "danger",
            onClick: function (e) {
                AccSubHeadMasterView.ClearValues();
            }
        }).dxButton("instance");

        AccSubHeadMasterView.variables.dx_btnAddNew = $("#dx_btnAddNew").dxButton({
            stylingMode: "outlined",
            icon: "plus",
            text: "Add New",
            type: "default",
            validationGroup: "AccSubHeadMaster",
            onClick: function (e) {
                AccSubHeadMasterView.variables.Masterid = "";
                $("#frm_AccSubheadMaster").show();
                $("#pnlView").hide();
            }
        }).dxButton("instance");

    },

    initializeDevExgrid: function () {
        AccSubHeadMasterView.variables.dx_dataGrid = $("#dx_dataGrid").dxDataGrid({
            dataSource: new DevExpress.data.CustomStore({
                key: "subheadid",
                load: function (loadOptions) {
                    var deferred = $.Deferred();

                    var result = DevExVariables.GetDataList(loadOptions, AccSubHeadMasterView.variables.BindMainGridListUrl);

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
            columns: [{ dataField: "subheadid", allowFiltering: false, allowSorting: true, sortIndex: 1, sortOrder: "desc", visible: false },
                { dataField: "subhead", caption: "SubHead Name", dataType: "string", filterOperations: ["contains"], allowSorting: true, allowFiltering: true, allowHeaderFiltering: false },
                { dataField: "subheadcode", caption: "SubHead Code", dataType: "string", filterOperations: ["contains"], allowSorting: true, allowFiltering: true, allowHeaderFiltering: false },
                { dataField: "headname", caption: "Head Name", dataType: "string", filterOperations: ["contains"], allowSorting: true, allowFiltering: true, allowHeaderFiltering: false },
                { dataField: "displayorder", caption: "Display Order", dataType: "string", filterOperations: ["contains"], allowSorting: true, allowFiltering: true, allowHeaderFiltering: false },
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
                        DevExVariables.ActionTemplate(container, options, true, true, "AccSubHeadMasterView");
                    }
                },
            ]
        }).dxDataGrid("instance");
    },

    btnMasterSubmit: function () {
        AccSubHeadMasterView.variables.dx_btnSubmit.option({ disabled: true });
        AccSubHeadMasterView.variables.Oper = 'Add';
        AccSubHeadMasterView.variables.addedit = "added";
        if (AccSubHeadMasterView.variables.Masterid != "0" && parseInt(AccSubHeadMasterView.variables.Masterid) > 0) {
            AccSubHeadMasterView.variables.Oper = 'Edit';
            AccSubHeadMasterView.variables.addedit = 'updated';
        }
        var data = {
            "SUBHEADID": AccSubHeadMasterView.variables.Masterid,
            "SUBHEAD": AccSubHeadMasterView.variables.dx_SubHeadName.option().value,
            "SUBHEADCODE": AccSubHeadMasterView.variables.dx_SubHeadCode.option().value,
            "HEADID": AccSubHeadMasterView.variables.dx_txtHeadname.option().selectedItem.headid,
            "DESCRIPTION": AccSubHeadMasterView.variables.dx_txtDescription.option().value,
            "DISPLAYORDER": AccSubHeadMasterView.variables.dx_numDisplayOrder.option().value,
            "ISACTIVE": AccSubHeadMasterView.variables.dx_switchIsActive.option().value,
            "oper": AccSubHeadMasterView.variables.Oper,
        }

        AccSubHeadMasterView.savedata(data);
    },

    savedata: function (data) {
        $.ajax({
            url: getDomain() + AccSubHeadMasterView.variables.PerformMasterOperationUrl,
            data: data,
            async: true,
            cache: false,
            type: 'POST',
            beforeSend: function () {
                dx_LoaderTrinity.show();
            },
            complete: function () {
                dx_LoaderTrinity.hide();
                AccSubHeadMasterView.variables.dx_btnSubmit.option({ disabled: false });
            },
            success: AccSubHeadMasterView.btnMasterSubmitOnSuccess,
            error: OnError,
        });
    },

    btnMasterSubmitOnSuccess: function (data) {
        if ($(data).find('RESPONSECODE').text() == "0") {
            DevExVariables.Toaster("success", 'Record is ' + AccSubHeadMasterView.variables.addedit + ' successfully');
            $('#frm_AccSubheadMaster').hide();
            $('#pnlView').show();
            if (AccSubHeadMasterView.variables.dx_popupRecordDelete)
                AccSubHeadMasterView.variables.dx_popupRecordDelete.hide();
            AccSubHeadMasterView.variables.dx_dataGrid.refresh();
            AccSubHeadMasterView.ClearValues();
        }
        else {
            DevExVariables.InvalidResponseCode(data);
        }
    },

    triggerId: function (id) {
        var rowData = AccSubHeadMasterView.variables.dx_dataGrid.getVisibleRows()[AccSubHeadMasterView.variables.dx_dataGrid.getRowIndexByKey(+id)].data;
        AccSubHeadMasterView.variables.Masterid = id;
        AccSubHeadMasterView.variables.dx_SubHeadName.option({ value: rowData.subhead });
        AccSubHeadMasterView.variables.dx_SubHeadCode.option({ value: rowData.subheadcode });
        AccSubHeadMasterView.variables.dx_txtHeadname.option({
            items: [{ headid: rowData.headid, headname: rowData.headname }],
            selectedItem: { headid: rowData.headid, headname: rowData.headname },
            value: rowData.headname 
        });
        AccSubHeadMasterView.variables.dx_txtDescription.option({ value: rowData.description });
        AccSubHeadMasterView.variables.dx_numDisplayOrder.option({ value: rowData.displayorder });
        AccSubHeadMasterView.variables.dx_switchIsActive.option({ value: rowData.isactive });
        $("#frm_AccSubheadMaster").show();
        $("#pnlView").hide();

        if (isU()) {
            AccSubHeadMasterView.variables.dx_btnSubmit.option({ visible: true });
        }
        else {
            AccSubHeadMasterView.variables.dx_btnSubmit.option({ visible: false });
        }

    },

    ClearValues: function () {
        AccSubHeadMasterView.variables.Masterid = "";
        AccSubHeadMasterView.variables.Oper = 'Add';
        AccSubHeadMasterView.variables.addedit = "added";
        AccSubHeadMasterView.variables.DeleteDataObj = "";
        DevExpress.validationEngine.resetGroup("AccSubHeadMaster");
        AccSubHeadMasterView.variables.dx_txtDescription.option("value", "");
        AccSubHeadMasterView.variables.dx_numDisplayOrder.option("value", 0);
        $('#frm_AccSubheadMaster').hide();
        $('#pnlView').show();
        AccSubHeadMasterView.variables.dx_dataGrid.refresh();
    },

    deleteRow: function (id) {
        var rowData = AccSubHeadMasterView.variables.dx_dataGrid.getVisibleRows()[AccSubHeadMasterView.variables.dx_dataGrid.getRowIndexByKey(+id)].data;
        AccSubHeadMasterView.variables.Masterid = id;
        AccSubHeadMasterView.variables.DeleteDataObj = rowData;
        AccSubHeadMasterView.variables.Oper = "Delete";

        if (AccSubHeadMasterView.variables.dx_popupRecordDelete) {
            AccSubHeadMasterView.variables.dx_popupRecordDelete.option("contentTemplate", AccSubHeadMasterView.variables.DeletePopUpOptions.contentTemplate(AccSubHeadMasterView.variables.DeleteDataObj).bind(this));
        }
        else {
            AccSubHeadMasterView.variables.dx_popupRecordDelete = $("#dx_popupRecordDelete").dxPopup(AccSubHeadMasterView.variables.DeletePopUpOptions).dxPopup("instance");
        }

        AccSubHeadMasterView.variables.dx_popupRecordDelete.show();
    },
}


$(document).ready(function () {
    AccSubHeadMasterView.FormInitialize();
    AccSubHeadMasterView.initializeDevExgrid();

});