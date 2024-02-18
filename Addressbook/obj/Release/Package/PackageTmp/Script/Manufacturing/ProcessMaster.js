var ProcessmasterView = {
    variables: {
        BindGroupListUrl: "/Common/BindMastersDetails?ServiceName=PRD_PROCESS_MASTER_GET",
        PerformMasterOperationUrl: "/Common/OpeartionsOnMaster?ServiceName=PRD_PROCESS_MASTER_CRUD",
        BindMainGridListUrl: "/Common/BindMastersDetails?ServiceName=PRD_PROCESS_MASTER_GET",
        //BindMainGridListDeatilsUrl: "/Common/BindMastersDetails?ServiceName=ACC_ORDER_ITEM_GET",
        BindStaticDataUrl: "/Common/BindMastersDetails?ServiceName=STATIC_MASTER_GET&IsActive=true",
        //BindQuotationMasterList: "/Common/BindMastersDetails?ServiceName=ACC_QUOTATION_MASTER_GET",
        //BindQutationDeatilsList: "/Common/BindMastersDetails?ServiceName=ACC_QUOTATION_ITEM_DETAILS_GET",
        //PerformMasterOperationUrl_Party: "/Common/OpeartionsOnMaster?ServiceName=ACCOUNTMASTER_CRUD",
        BindDesignListUrl: "/Common/BindMastersDetails?ServiceName=PRD_DESIGN_MASTER_GET",
        BindDetailListUrl: "/Common/BindMastersDetails?ServiceName=PRD_DESIGN_DETAIL_GET",
        BindPartyList: "/Common/BindMastersDetails?ServiceName=ACCOUNTMASTER_GET",
        BindOrderByList: "/Common/BindMastersDetails?ServiceName=USERDETAILS_GET",
        Oper: 'Add',
        addedit: "added",
        Masterid: "",
        RowCount: 1,
        /*------------------------variables for main form Controls-----------------------*/
        dx_txtDescription: "",
        dx_txtDepartmentName: "",
        dx_txtDisplayOrder: "",
        dx_txtProcessName : "",
        dx_btnSubmit: "",
        dx_btnCancel: "",
        dx_btnAddNew: "",
        dx_popupRecordDelete: "",
        DeleteDataObj: "",
        DeletePopUpOptions: {
            width: 300,
            height: 200,
            contentTemplate: function () {
                return $("<div />").append(
                    $("<p>ProcessId :<span>" + ProcessmasterView.variables.DeleteDataObj.processid + "</span></p>"),
                    $("<p>ProcessName :<span>" + ProcessmasterView.variables.DeleteDataObj.processname + "</span></p>")
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
                            "PROCESSID": ProcessmasterView.variables.Masterid,
                            "oper": ProcessmasterView.variables.Oper,
                        }

                        ProcessmasterView.savedata(data);
                    },
                }
            }],
            showTitle: true,
            title: "Delete Record?",
            visible: false,
            dragEnabled: false,
            closeOnOutsideClick: true
        }, 
        MULTISEARCH_PRODUCT: [],
        /*------------------------variables for main form Controls-----------------------*/

        /*---------------------- Modal Variable ----------------------------------*/

        /*---------------------- Modal Variable ----------------------------------*/
        dx_dataGrid_Order_Detail: [],
        MULTISEARCH: [],
        dx_dataGrid_Order: "",
        OrderTypeList: ["Stock", "Party"],
        PriorityList: ["High", "Low", "Medium"],
    },
    FormInitialize: function () {
        var now = new Date();

        ProcessmasterView.variables.dx_txtProcessName = $("#dx_txtProcessName").dxTextBox({
            placeholder: "Enter Process Name...",
        }).dxValidator({
            validationGroup: "Processmaster",
            validationRules: [{
                type: "required",
                message: "Process Name is required"
            }]
        }).dxTextBox("instance");

        ProcessmasterView.variables.dx_numDisplayOrder = $("#dx_numDisplayOrder").dxNumberBox({
            placeholder: "Enter Display Order...",
            min: 0,
        }).dxValidator({
            validationGroup: "Processmaster",
            validationRules: [{
                type: "required",
                message: "Display Order is required"
            }]
        }).dxNumberBox("instance");

        ProcessmasterView.variables.dx_switchIsActive = $("#dx_switchIsActive").dxSwitch({
            value: true,
            switchedOnText: "Yes",
            switchedOffText: "No"
        }).dxValidator({
            validationGroup: "Processmaster",
            validationRules: []
        }).dxSwitch("instance");

        ProcessmasterView.variables.dx_txtDescription = $("#dx_txtDescription").dxTextArea({
            height: 110
        }).dxValidator({
            validationGroup: "Processmaster",
            validationRules: []
        }).dxTextArea("instance");

        ProcessmasterView.variables.dx_btnSubmit = $("#dx_btnSubmit").dxButton({
            icon: "check",
            text: "Submit",
            type: "success",
            //useSubmitBehavior: true,
            validationGroup: "Processmaster",
            onClick: function (e) {
                var validation = DevExpress.validationEngine.validateGroup("Processmaster");
                if (!validation.isValid) {
                    DevExVariables.Toaster("warning", "Please fill all required fields before submit.");
                    return;
                }
       
                //if (!ProcessmasterView.variables.dx_txtParty.option().selectedItem) {
                //    DevExVariables.Toaster("warning", "Party Name is required.");
                //    return;
                //}

                //if (!ProcessmasterView.variables.dx_TxtOrderby.option().selectedItem) {
                //    DevExVariables.Toaster("warning", "Order By is required.");
                //    return;
                //}

                //if (!ProcessmasterView.variables.dx_txtOrderDate.option().value) {
                //    DevExVariables.Toaster("warning", "Quotation Date is required.");
                //    return;
                //}

                //if (!ProcessmasterView.variables.dx_txtDueDate.option().value) {
                //    DevExVariables.Toaster("warning", "Due Date is required.");
                //    return;
                //}

                //if (!ProcessmasterView.variables.dx_txtDueDays.option().value != '') {
                //    DevExVariables.Toaster("warning", "Due Days is required.");
                //    return;
                //}

                //if (!ProcessmasterView.variables.dx_ddlPriority.option().value) {
                //    DevExVariables.Toaster("warning", "Priority is required.");
                //    return;
                //}

                ProcessmasterView.btnMasterSubmit();
            }
        }).dxButton("instance");

        ProcessmasterView.variables.dx_btnCancel = $("#dx_btnCancel").dxButton({
            icon: "close",
            text: "Cancel",
            type: "danger",
            onClick: function (e) {
                ProcessmasterView.ClearValues();
                e.validationGroup.reset();
            }
        }).dxButton("instance");

        ProcessmasterView.variables.dx_btnAddNew = $("#dx_btnAddNew").dxButton({
            stylingMode: "outlined",
            icon: "plus",
            text: "Add New",
            type: "default",
            onClick: function (e) {
                e.validationGroup.reset();
                //ProcessmasterView.InitializeDevExgrid()
                $("#frm_OrderMaster").show();
                $("#pnlView").hide();

                ProcessmasterView.variables.dx_txtProcessName.focus();
            }
        }).dxButton("instance");
        /*--------------------------- Popup Initialize ------------------------------*/

        //ProcessmasterView.variables.dx_Party_btnSubmit = $("#dx_Party_btnSubmit").dxButton({
        //    icon: "check",
        //    text: "Submit",
        //    type: "success",
        //    onClick: function (e) {
        //        if (!ProcessmasterView.variables.dx_txtAcc_Name.option().value) {
        //            DevExVariables.Toaster("warning", "Acoount Name is required.");
        //            return;
        //        }

        //        if (!ProcessmasterView.variables.dx_txtshortname.option().value) {
        //            DevExVariables.Toaster("warning", "Short Name is required.");
        //            return;
        //        }



        //        if (!ProcessmasterView.variables.dx_txtHead.option().value) {
        //            DevExVariables.Toaster("warning", "Head Name is required.");
        //            return;
        //        }

        //        if (!ProcessmasterView.variables.dx_txtMobileNo.option().value) {
        //            DevExVariables.Toaster("warning", "Mobile No is required.");
        //            return;
        //        }
        //        if (!ProcessmasterView.variables.dx_ddlCountry.option().value) {
        //            DevExVariables.Toaster("warning", "Country is required.");
        //            return;
        //        }
        //        if (!ProcessmasterView.variables.dx_ddlState.option().value) {
        //            DevExVariables.Toaster("warning", "State is required.");
        //            return;
        //        }
        //        if (!ProcessmasterView.variables.dx_ddlCity.option().value) {
        //            DevExVariables.Toaster("warning", "City is required.");
        //            return;
        //        }

        //        ProcessmasterView.btnMasterSubmit_Party();


        //    }
        //}).dxButton("instance");

        //ProcessmasterView.variables.dx_Party_btnCancel = $("#dx_Party_btnCancel").dxButton({
        //    icon: "close",
        //    text: "Cancel",
        //    type: "danger",
        //    onClick: function (e) {
        //        $("#Modal_PartyMaster").modal("hide");
        //        e.validationGroup.reset();
        //    }
        //}).dxButton("instance");
        /*--------------------------- Popup Initialize ------------------------------*/

    },

    triggerId: function (id) {
        var rowData = ProcessmasterView.variables.dx_dataGrid.getVisibleRows()[ProcessmasterView.variables.dx_dataGrid.getRowIndexByKey(+id)].data;
        ProcessmasterView.variables.Masterid = id;
        ProcessmasterView.variables.dx_txtProcessName.option({ value: rowData.processname });
        ProcessmasterView.variables.dx_numDisplayOrder.option({ value: rowData.displayorder });
        ProcessmasterView.variables.dx_switchIsActive.option({ value: rowData.isactive });
        ProcessmasterView.variables.dx_txtDescription.option({ value: rowData.description });
        $("#frm_OrderMaster").show();
        $("#pnlView").hide();

        if (isU()) {
            ProcessmasterView.variables.dx_btnSubmit.option({ visible: true });
        }
        else {
            ProcessmasterView.variables.dx_btnSubmit.option({ visible: false });
        }
    },

    deleteRow: function (id) {
        var rowData = ProcessmasterView.variables.dx_dataGrid.getVisibleRows()[ProcessmasterView.variables.dx_dataGrid.getRowIndexByKey(+id)].data;
        ProcessmasterView.variables.Masterid = id;
        ProcessmasterView.variables.DeleteDataObj = rowData;
        ProcessmasterView.variables.Oper = "Delete";

        if (ProcessmasterView.variables.dx_popupRecordDelete) {
            ProcessmasterView.variables.dx_popupRecordDelete.option("contentTemplate", ProcessmasterView.variables.DeletePopUpOptions.contentTemplate(ProcessmasterView.variables.DeleteDataObj).bind(this));
        }
        else {
            ProcessmasterView.variables.dx_popupRecordDelete = $("#dx_popupRecordDelete").dxPopup(ProcessmasterView.variables.DeletePopUpOptions).dxPopup("instance");
        }

        ProcessmasterView.variables.dx_popupRecordDelete.show();
    },

    initializeDevExgrid: function () {
        ProcessmasterView.variables.dx_dataGrid = $("#dx_dataGrid").dxDataGrid({
            dataSource: new DevExpress.data.CustomStore({
                key: "processid",
                load: function (loadOptions) {
                    var deferred = $.Deferred();

                    var result = DevExVariables.GetDataList(loadOptions, ProcessmasterView.variables.BindGroupListUrl);

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
            columns: [{ dataField: "processid", allowFiltering: false, allowSorting: true, sortIndex: 1, sortOrder: "desc", visible: false },
                { dataField: "processname", caption: "Process Name", dataType: "string", filterOperations: ["contains"], allowSorting: true, allowFiltering: true, allowHeaderFiltering: false },
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
                        if (isU()) {
                            $("<div>").dxSwitch({
                                value: options.value,
                                switchedOnText: "Yes",
                                switchedOffText: "No",
                                onValueChanged: function (data) {
                                    ProcessmasterView.EditFromGrid(data.value, options.key, 'Active');
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
                        DevExVariables.ActionTemplate(container, options, true, true, "ProcessmasterView");
                    }
                },
            ]
        }).dxDataGrid("instance");
    },

    btnMasterSubmit: function () {
        ProcessmasterView.variables.Oper = 'Add';
        ProcessmasterView.variables.addedit = "added";

        if (ProcessmasterView.variables.Masterid != "0" && parseInt(ProcessmasterView.variables.Masterid) > 0) {
            ProcessmasterView.variables.Oper = 'Edit';
            ProcessmasterView.variables.addedit = 'updated';
        }

        ProcessmasterView.variables.dx_btnSubmit.option({ disabled: true });

        var data = {
            "PROCESSID": ProcessmasterView.variables.Masterid,
            "PROCESSNAME": ProcessmasterView.variables.dx_txtProcessName.option().value,
            "DISPLAYORDER": ProcessmasterView.variables.dx_numDisplayOrder.option().value,
            "DESCRIPTION": ProcessmasterView.variables.dx_txtDescription.option().value,
            "ISACTIVE": ProcessmasterView.variables.dx_switchIsActive.option().value,
            "oper": ProcessmasterView.variables.Oper,
        }

        if (ProcessmasterView.variables.dx_txtDescription.option().value)
            data.DESCRIPTION = ProcessmasterView.variables.dx_txtDescription.option().value;

        ProcessmasterView.savedata(data);
    },

    savedata: function (data) {
        $.ajax({
            url: getDomain() + ProcessmasterView.variables.PerformMasterOperationUrl,
            data: data,
            async: true,
            cache: false,
            type: 'POST',
            beforeSend: function () {
                dx_LoaderTrinity.show();
            },
            complete: function () {
                dx_LoaderTrinity.hide();
                ProcessmasterView.variables.dx_btnSubmit.option({ disabled: false });
            },
            success: ProcessmasterView.btnMasterSubmitOnSuccess,
            error: OnError,
        });
    },

    btnMasterSubmitOnSuccess: function (data) {
        if ($(data).find('RESPONSECODE').text() == "0") {
            DevExVariables.Toaster("success", 'Record is ' + ProcessmasterView.variables.addedit + ' successfully');
            $('#frm_OrderMaster').hide();
            $('#pnlView').show();
            if (ProcessmasterView.variables.dx_popupRecordDelete)
                ProcessmasterView.variables.dx_popupRecordDelete.hide();

            ProcessmasterView.ClearValues();
            ProcessmasterView.variables.dx_dataGrid.refresh();
        }
        else {
            DevExVariables.InvalidResponseCode(data);
        }
    },

    ClearValues: function () {
        ProcessmasterView.variables.Masterid = "";
        ProcessmasterView.variables.Oper = 'Add';
        ProcessmasterView.variables.addedit = "added";
        ProcessmasterView.variables.DeleteDataObj = "";
        DevExpress.validationEngine.resetGroup("Processmaster");
        ProcessmasterView.variables.dx_numDisplayOrder.option("value", 0);
        $('#frm_OrderMaster').hide();
        $('#pnlView').show();
    },

    EditFromGrid: function (val, id, type) {
        var data = {
            "PROCESSID": id,
            "OPER_TYPE": "EditFromGrid"
        }

        if (type == "Active")
            data.ISACTIVE = val;

        $.ajax({
            url: getDomain() + ProcessmasterView.variables.PerformMasterOperationUrl,
            data: data,
            async: true,
            cache: false,
            type: 'POST',
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    DevExVariables.Toaster("success", 'Record is updated successfully.');

                    ProcessmasterView.variables.dx_dataGrid.refresh();
                }
            },
            error: OnError,
        });
    },

};


$(document).ready(function () {
    ProcessmasterView.FormInitialize();
    ProcessmasterView.initializeDevExgrid();

});
