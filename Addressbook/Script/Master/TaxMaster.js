var TaxMasterView = {
    variables: {
        BindGroupListUrl: "/Common/BindMastersDetails?ServiceName=ACC_TAX_MASTER_GET",
        PerformMasterOperationUrl: "/Common/OpeartionsOnMaster?ServiceName=ACC_TAX_MASTER_CRUD",
        BindAccListUrl: "/Common/BindMastersDetails?ServiceName=ACCOUNTMASTER_GET",
        Oper: 'Add',
        addedit: "added",
        Masterid: "",
        dx_btnAddNew: "",
        dx_txtTaxName: "",
        dx_txtAccountName:"",
        dx_txtDescription: "",
        dx_txtDisplayOrder: "",
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
                    $("<p>Tax Name: <span>" + TaxMasterView.variables.DeleteDataObj.taxname + "</span></p>"),
                    $("<p>Description: <span>" + (TaxMasterView.variables.DeleteDataObj.description || "") + "</span></p>")
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
                            "TAXID": TaxMasterView.variables.Masterid,
                            "oper": TaxMasterView.variables.Oper,
                        }

                        TaxMasterView.savedata(data);
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
        TaxMasterView.variables.dx_dataGrid = $("#dx_dataGrid").dxDataGrid({
            dataSource: new DevExpress.data.CustomStore({
                key: "taxid",
                load: function (loadOptions) {
                    var deferred = $.Deferred();

                    var result = DevExVariables.GetDataList(loadOptions, TaxMasterView.variables.BindGroupListUrl);

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
            columns: [{ dataField: "taxid", allowFiltering: false, allowSorting: true, sortIndex: 1, sortOrder: "desc", visible: false },
                { dataField: "taxname", caption: "Tax Name", dataType: "string", filterOperations: ["contains"], allowSorting: true, allowFiltering: true, allowHeaderFiltering: false },
                //{ dataField: "accountname", caption: "Account Name", dataType: "string", filterOperations: ["contains"], allowSorting: true, allowFiltering: true, allowHeaderFiltering: false },
                { dataField: "description", caption: "Description", dataType: "string", allowSorting: true, allowFiltering: false, allowHeaderFiltering: false },
                { dataField: "displayorder", caption: "Display Order", dataType: "string", allowSorting: true, allowFiltering: false, allowHeaderFiltering: false },
                {
                    dataField: "Action", caption: "Action", alignment: "center", allowFiltering: false, allowSorting: false, fixed: true, fixedPosition: "right",
                    cellTemplate: function (container, options) {
                        DevExVariables.ActionTemplate(container, options, true, true, "TaxMasterView");
                    }
                },
            ]
        }).dxDataGrid("instance");
    },

    triggerId: function (id) {
        var rowData = TaxMasterView.variables.dx_dataGrid.getVisibleRows()[TaxMasterView.variables.dx_dataGrid.getRowIndexByKey(+id)].data;
        TaxMasterView.variables.Masterid = id;
        TaxMasterView.variables.dx_txtTaxName.option({ value: rowData.taxname });
        TaxMasterView.variables.dx_txtAccountName.option({
            items: [{ accid: rowData.accid, accountname: rowData.accountname }],
            selectedItem: { accid: rowData.accid, accountname: rowData.accountname },
            value: rowData.accountname
        });
        TaxMasterView.variables.dx_txtDescription.option({ value: rowData.description });
        TaxMasterView.variables.dx_txtDisplayOrder.option({ value: rowData.displayorder });
        $("#frm_TaxMaster").show();
        $("#pnlView").hide();

        if (isU()) {
            TaxMasterView.variables.dx_btnSubmit.option({ visible: true });
        }
        else {
            TaxMasterView.variables.dx_btnSubmit.option({ visible: false });
        }
    },

    deleteRow: function (id) {
        var rowData = TaxMasterView.variables.dx_dataGrid.getVisibleRows()[TaxMasterView.variables.dx_dataGrid.getRowIndexByKey(+id)].data;
        TaxMasterView.variables.Masterid = id;
        TaxMasterView.variables.DeleteDataObj = rowData;
        TaxMasterView.variables.Oper = "Delete";

        if (TaxMasterView.variables.dx_popupRecordDelete) {
            TaxMasterView.variables.dx_popupRecordDelete.option("contentTemplate", TaxMasterView.variables.DeletePopUpOptions.contentTemplate(TaxMasterView.variables.DeleteDataObj).bind(this));
        }
        else {
            TaxMasterView.variables.dx_popupRecordDelete = $("#dx_popupRecordDelete").dxPopup(TaxMasterView.variables.DeletePopUpOptions).dxPopup("instance");
        }

        TaxMasterView.variables.dx_popupRecordDelete.show();
    },

    btnMasterSubmit: function () {
        TaxMasterView.variables.Oper = 'Add';
        TaxMasterView.variables.addedit = "added";

        if (TaxMasterView.variables.Masterid != "0" && parseInt(TaxMasterView.variables.Masterid) > 0) {
            TaxMasterView.variables.Oper = 'Edit';
            TaxMasterView.variables.addedit = 'updated';
        }

        TaxMasterView.variables.dx_btnSubmit.option({ disabled: true });

        var data = {
            "TAXID": TaxMasterView.variables.Masterid,
            "TAXNAME": TaxMasterView.variables.dx_txtTaxName.option().value,
            "ACCID": TaxMasterView.variables.dx_txtAccountName.option().selectedItem.accid,
            "DESCRIPTION": TaxMasterView.variables.dx_txtDescription.option().value,
            "DISPLAYORDER": TaxMasterView.variables.dx_txtDisplayOrder.option().value,
            "oper": TaxMasterView.variables.Oper,
        }
        TaxMasterView.savedata(data);
    },

    savedata: function (data) {
        $.ajax({
            url: getDomain() + TaxMasterView.variables.PerformMasterOperationUrl,
            data: data,
            async: true,
            cache: false,
            type: 'POST',
            beforeSend: function () {
                dx_LoaderTrinity.show();
            },
            complete: function () {
                dx_LoaderTrinity.hide();
            },
            success: TaxMasterView.btnMasterSubmitOnSuccess,
            error: OnError,
        });
    },

    btnMasterSubmitOnSuccess: function (data) {
        if ($(data).find('RESPONSECODE').text() == "0") {
            DevExVariables.Toaster("success", 'Record is ' + TaxMasterView.variables.addedit + ' successfully');
            $('#frm_TaxMaster').hide();
            $('#pnlView').show();
            if (TaxMasterView.variables.dx_popupRecordDelete)
                TaxMasterView.variables.dx_popupRecordDelete.hide();

            TaxMasterView.ClearValues();
            TaxMasterView.variables.dx_dataGrid.refresh();
        }
        else {
            InvalidResponseCode(data);
        }

        TaxMasterView.variables.dx_btnSubmit.option({ disabled: false });

    },

    ClearValues: function () {
        TaxMasterView.variables.Masterid = "";
        TaxMasterView.variables.Oper = 'Add';
        TaxMasterView.variables.addedit = "added";
        TaxMasterView.variables.DeleteDataObj = "";
        TaxMasterView.variables.dx_txtTaxName.option({ value: "" }); 
        TaxMasterView.variables.dx_txtAccountName.option({ value: "" });
        TaxMasterView.variables.dx_txtDescription.option({ value: "" });
        TaxMasterView.variables.dx_txtDisplayOrder.option({ value: "" });
        if (TaxMasterView.variables.dx_popupRecordDelete)
            TaxMasterView.variables.dx_popupRecordDelete.hide();

        $('#frm_TaxMaster').hide();
        $('#pnlView').show();
        TaxMasterView.variables.dx_dataGrid.refresh();
    },

    FormInitialize: function () {
        TaxMasterView.variables.dx_txtTaxName = $("#dx_txtTaxName").dxTextBox({
            placeholder: "Enter Tax Name...",
        }).dxValidator({
            validationRules: [{
                type: "required",
                message: "Tax Name is required"
            }]
        }).dxTextBox("instance");

        TaxMasterView.variables.dx_txtAccountName = $("#dx_txtAccountName").dxAutocomplete({
            placeholder: "Enter Account Name...",
            mode: "search",
            dataSource: new DevExpress.data.CustomStore({
                load: function (loadOptions) {
                    var deferred = $.Deferred();

                    var myfilter = { rules: [] };
                    myfilter.rules.push({ field: "GROUPNAME", op: "eq", data: "Duties And Taxes" });

                    $.ajax({
                        url: getDomain() + TaxMasterView.variables.BindAccListUrl + "&_search=true&searchField=ACCOUNTNAME&searchOper=cn&searchString=" + loadOptions.searchValue + "&myfilters=" + JSON.stringify(myfilter),
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
                key: "accid",
            }),
            valueExpr: "accountname",
            displayExpr: "accountname",
            itemTemplate: function (data) {
                return $("<div class='product-name'>" + "(" + data.partycode + ")&nbsp;" + data.accountname + "</div>");
            },
        }).dxValidator({
            validationRules: [{
                type: "required",
                message: "Account Name is required"
            }]
        }).dxAutocomplete("instance");

        TaxMasterView.variables.dx_txtDescription = $("#dx_txtDescription").dxTextArea({
            height: 110
        }).dxTextArea("instance");

        TaxMasterView.variables.dx_txtDisplayOrder = $("#dx_txtDisplayOrder").dxTextBox({
            mode: "number",
        }).dxTextBox("instance");

        TaxMasterView.variables.dx_btnSubmit = $("#dx_btnSubmit").dxButton({
            icon: "check",
            text: "Submit",
            type: "success",
            //useSubmitBehavior: true,
            onClick: function (e) {
                //DevExVariables.Toaster("success", "The Submit button was clicked");
                var validation = e.validationGroup.validate();
                if (!validation.isValid) {
                    DevExVariables.Toaster("warning", "Please fill all required fields before submit.");
                    return;
                }

                TaxMasterView.btnMasterSubmit();

                //e.validationGroup.reset();
            }
        }).dxButton("instance");

        TaxMasterView.variables.dx_btnCancel = $("#dx_btnCancel").dxButton({
            icon: "close",
            text: "Cancel",
            type: "danger",
            onClick: function (e) {
                TaxMasterView.ClearValues();
                e.validationGroup.reset();
            }
        }).dxButton("instance");

        TaxMasterView.variables.dx_btnAddNew = $("#dx_btnAddNew").dxButton({
            stylingMode: "outlined",
            icon: "plus",
            text: "Add New",
            type: "default",
            onClick: function (e) {
                e.validationGroup.reset();

                $("#frm_TaxMaster").show();
                $("#pnlView").hide();

                TaxMasterView.variables.dx_txtTaxName.focus();
            }
        }).dxButton("instance");
    },

};

$(document).ready(function () {
    TaxMasterView.FormInitialize();

    TaxMasterView.initializeDevExgrid();

    $("#btnAddNew").click(function () {
        $('#frm_TaxMaster').show();
        $('#pnlView').hide();
    });

});