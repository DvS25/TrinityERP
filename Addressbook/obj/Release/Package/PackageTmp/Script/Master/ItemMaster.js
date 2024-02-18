var ItemMasterView = {
    variables: {
        BindGroupListUrl: "/Common/BindMastersDetails?ServiceName=ACC_ITEMMASTER_GET",
        PerformMasterOperationUrl: "/Common/OpeartionsOnMaster?ServiceName=ACC_ITEMMASTER_CRUD",
        BindTaxListUrl: "/Common/BindMastersDetails?ServiceName=ACC_TAX_MASTER_GET",
        BindDetailListUrl: "/Common/BindMastersDetails?ServiceName=ACC_ITEMDETAIL_GET",
        BindStaticDataUrl: "/Common/BindMastersDetails?ServiceName=STATIC_MASTER_GET&IsActive=true",
        Oper: 'Add',
        addedit: "added",
        Masterid: "",
        RowCount: 1,
        dx_btnAddNew: "",
        dx_txtItemName: "",
        dx_txtHSNCODE: "",
        dx_txtDescription: "",
        dx_ddlSubCategory: "",
        dx_switchIsActive: "",
        dx_btnSubmit: "",
        dx_btnCancel: "",
        dx_dataGrid: "",
        SubCategoryList: [],
        DetailsControlsList: [],
        TaxValueInList: ["Percentage(%)", "Rs(₹)"],
        TaxNameList: [],

        dx_popupRecordDelete: "",
        DeleteDataObj: "",
        DeletePopUpOptions: {
            width: 300,
            height: 200,
            contentTemplate: function () {
                return $("<div />").append(
                    $("<p>Item Name: <span>" + ItemMasterView.variables.DeleteDataObj.itemname + "</span></p>")
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
                            "ITEMID": ItemMasterView.variables.Masterid,
                            "oper": ItemMasterView.variables.Oper,
                        }

                        ItemMasterView.savedata(data);
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
        ItemMasterView.variables.dx_dataGrid = $("#dx_dataGrid").dxDataGrid({
            dataSource: new DevExpress.data.CustomStore({
                key: "itemid",
                load: function (loadOptions) {
                    var deferred = $.Deferred();

                    var result = DevExVariables.GetDataList(loadOptions, ItemMasterView.variables.BindGroupListUrl);

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
            columns: [{ dataField: "itemid", allowFiltering: false, allowSorting: true, sortIndex: 1, sortOrder: "desc", visible: false },
                { dataField: "itemname", caption: "Item Name", dataType: "string", filterOperations: ["contains"], allowSorting: true, allowFiltering: true, allowHeaderFiltering: false },
                { dataField: "hsncode", caption: "HSN Code", dataType: "string", filterOperations: ["contains"], allowSorting: false, allowFiltering: true, allowHeaderFiltering: false },
                { dataField: "description", caption: "Description", dataType: "string", filterOperations: ["contains"], allowSorting: false, allowFiltering: true, allowHeaderFiltering: false },
                { dataField: "rmsubcate", caption: "Sub Category", dataType: "string", filterOperations: ["contains"], allowSorting: false, allowFiltering: true, allowHeaderFiltering: false },
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
                        DevExVariables.ActionTemplate(container, options, true, true, "ItemMasterView");
                    }
                },
            ]
        }).dxDataGrid("instance");
    },

    triggerId: function (id) {
        var rowData = ItemMasterView.variables.dx_dataGrid.getVisibleRows()[ItemMasterView.variables.dx_dataGrid.getRowIndexByKey(+id)].data;
        ItemMasterView.variables.Masterid = id;
        ItemMasterView.variables.dx_txtItemName.option({ value: rowData.itemname });
        ItemMasterView.variables.dx_txtHSNCODE.option({ value: rowData.hsncode });
        ItemMasterView.variables.dx_txtDescription.option({ value: rowData.description });

        ItemMasterView.variables.dx_switchIsActive.option({ value: rowData.isactive });
        $("#frm_HSNCodeMaster").show();
        $("#pnlView").hide();

        var List = [];
        if (rowData.rmcodeid) {
            ItemMasterView.variables.dx_txtItemName.option({ readOnly: true });
            ItemMasterView.variables.dx_ddlSubCategory.option({ readOnly: true });
            ItemMasterView.variables.dx_switchIsActive.option({ disabled: true });
            List = ItemMasterView.variables.SubCategoryList.filter(x=> x.rmtype == "STOCK" && ["MATERIAL", "METAL", "LABOUR"].includes(x.rmgroup));
        }
        else {
            ItemMasterView.variables.dx_txtItemName.option({ readOnly: false });
            ItemMasterView.variables.dx_ddlSubCategory.option({ readOnly: false });
            ItemMasterView.variables.dx_switchIsActive.option({ disabled: false });
            List = ItemMasterView.variables.SubCategoryList.filter(x=> x.rmtype == "STOCK" && ["GENERAL", "FINISHED"].includes(x.rmgroup));
        }

        ItemMasterView.variables.dx_ddlSubCategory.option({
            dataSource: new DevExpress.data.ArrayStore({
                data: List,
                key: "rmsubcateid"
            }),
            displayExpr: "rmsubcate",
            valueExpr: "rmsubcateid",
        });

        ItemMasterView.variables.dx_ddlSubCategory.option({ value: rowData.rmsubcateid });


        if (isU()) {
            ItemMasterView.variables.dx_btnSubmit.option({ visible: true });
        }
        else {
            ItemMasterView.variables.dx_btnSubmit.option({ visible: false });
        }

        var myfilter = { rules: [] };
        myfilter.rules.push({ field: "ITEMID", op: "eq", data: id });
        $.ajax({
            url: getDomain() + ItemMasterView.variables.BindDetailListUrl + "&myfilters=" + JSON.stringify(myfilter),
            async: true,
            cache: false,
            type: 'POST',
            beforeSend: function () {
                dx_LoaderTrinity.show();
            },
            complete: function () {
                dx_LoaderTrinity.hide();
            },
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    var JsonObject = xml2json.parser(data);
                    if (JsonObject.serviceresponse.detailslist) {
                        var List = [];
                        if (JsonObject.serviceresponse.detailslist.details.length) {
                            List = JsonObject.serviceresponse.detailslist.details;
                        }
                        else {
                            List = JsonObject.serviceresponse.detailslist;
                        }

                        $.each(List, function (key, obj) {
                            ItemMasterView.AddNewLineDetails(obj);
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
        var rowData = ItemMasterView.variables.dx_dataGrid.getVisibleRows()[ItemMasterView.variables.dx_dataGrid.getRowIndexByKey(+id)].data;
        ItemMasterView.variables.Masterid = id;
        ItemMasterView.variables.DeleteDataObj = rowData;
        ItemMasterView.variables.Oper = "Delete";
        ItemMasterView.variables.addedit = "Deleted";
        if (ItemMasterView.variables.dx_popupRecordDelete) {
            ItemMasterView.variables.dx_popupRecordDelete.option("contentTemplate", ItemMasterView.variables.DeletePopUpOptions.contentTemplate(ItemMasterView.variables.DeleteDataObj).bind(this));
        }
        else {
            ItemMasterView.variables.dx_popupRecordDelete = $("#dx_popupRecordDelete").dxPopup(ItemMasterView.variables.DeletePopUpOptions).dxPopup("instance");
        }

        ItemMasterView.variables.dx_popupRecordDelete.show();
    },

    btnMasterSubmit: function () {
        ItemMasterView.variables.Oper = 'Add';
        ItemMasterView.variables.addedit = "added";

        if (ItemMasterView.variables.Masterid != "0" && parseInt(ItemMasterView.variables.Masterid) > 0) {
            ItemMasterView.variables.Oper = 'Edit';
            ItemMasterView.variables.addedit = 'updated';
        }

        ItemMasterView.variables.dx_btnSubmit.option({ disabled: true });

        var DetailsNodeList = ItemMasterView.makeDetailsXmlNodes();

        var data = {
            "ITEMID": ItemMasterView.variables.Masterid,
            "ITEMNAME": ItemMasterView.variables.dx_txtItemName.option().value,
            "HSNCODE": ItemMasterView.variables.dx_txtHSNCODE.option().value,
            "ISACTIVE": ItemMasterView.variables.dx_switchIsActive.option().value,
            "XMLPARAM": escape(DetailsNodeList),
            "oper": ItemMasterView.variables.Oper,
        }

        if (ItemMasterView.variables.dx_txtDescription.option().value)
            data.DESCRIPTION = ItemMasterView.variables.dx_txtDescription.option().value;

        if (ItemMasterView.variables.dx_ddlSubCategory.option().value)
            data.RMSUBCATEID = ItemMasterView.variables.dx_ddlSubCategory.option().value;


        ItemMasterView.savedata(data);
    },

    savedata: function (data) {
        $.ajax({
            url: getDomain() + ItemMasterView.variables.PerformMasterOperationUrl,
            data: data,
            async: true,
            cache: false,
            type: 'POST',
            beforeSend: function () {
                dx_LoaderTrinity.show();
            },
            complete: function () {
                dx_LoaderTrinity.hide();
                ItemMasterView.variables.dx_btnSubmit.option({ disabled: false });
            },
            success: ItemMasterView.btnMasterSubmitOnSuccess,
            error: OnError,
        });
    },

    btnMasterSubmitOnSuccess: function (data) {
        if ($(data).find('RESPONSECODE').text() == "0") {
            DevExVariables.Toaster("success", 'Record is ' + ItemMasterView.variables.addedit + ' successfully');
            $('#frm_HSNCodeMaster').hide();
            $('#pnlView').show();

            ItemMasterView.ClearValues();
        }
        else {
            InvalidResponseCode(data);
        }
    },

    btnMasterDelete: function () {
        $('#btnDelete').attr('disabled', true);
        var data = {
            "oper": ItemMasterView.variables.Oper,
            "GROUPID": $("#hdngroup").val()
        }
        ItemMasterView.savedata(data);
    },

    ClearValues: function () {
        ItemMasterView.variables.Masterid = "";
        ItemMasterView.variables.Oper = "Add";
        ItemMasterView.variables.addedit = "added";
        ItemMasterView.variables.DetailsControlsList = [];
        ItemMasterView.variables.RowCount = 1;
        ItemMasterView.variables.DeleteDataObj = "";
        ItemMasterView.variables.dx_btnSubmit.option({ visible: true });
        ItemMasterView.variables.dx_txtItemName.option({ readOnly: false });
        ItemMasterView.variables.dx_ddlSubCategory.option({ readOnly: false });
        ItemMasterView.variables.dx_switchIsActive.option({ disabled: false });

        if (ItemMasterView.variables.dx_popupRecordDelete)
            ItemMasterView.variables.dx_popupRecordDelete.hide();

        $("#tbody_HSNDetails").html("");
        $('#frm_HSNCodeMaster').hide();
        $('#pnlView').show();
        ItemMasterView.variables.dx_dataGrid.refresh();
    },

    FormInitialize: function () {
        ItemMasterView.variables.dx_txtItemName = $("#dx_txtItemName").dxTextBox().dxValidator({
            validationGroup: "ItemMaster",
            validationRules: [{
                type: "required",
                message: "Item Name is required"
            }]
        }).dxTextBox("instance");

        ItemMasterView.variables.dx_txtHSNCODE = $("#dx_txtHSNCODE").dxTextBox().dxValidator({
            validationGroup: "ItemMaster",
            validationRules: [{
                type: "required",
                message: "HSN code is required"
            }]
        }).dxTextBox("instance");

        ItemMasterView.variables.dx_txtDescription = $("#dx_txtDescription").dxTextArea({
            height: 110
        }).dxValidator({
            validationGroup: "ItemMaster",
            validationRules: []
        }).dxTextArea("instance");

        ItemMasterView.variables.dx_ddlSubCategory = $("#dx_ddlSubCategory").dxSelectBox({
            placeholder: "Select Sub Category...",
            searchEnabled: true
        }).dxValidator({
            validationGroup: "ItemMaster",
            validationRules: []
        }).dxSelectBox("instance");

        ItemMasterView.variables.dx_switchIsActive = $("#dx_switchIsActive").dxSwitch({
            value: true,
            switchedOnText: "Yes",
            switchedOffText: "No"
        }).dxValidator({
            validationGroup: "ItemMaster",
            validationRules: []
        }).dxSwitch("instance");

        ItemMasterView.variables.dx_btnSubmit = $("#dx_btnSubmit").dxButton({
            icon: "check",
            text: "Submit",
            type: "success",
            //useSubmitBehavior: true,
            validationGroup: "ItemMaster",
            onClick: function (e) {
                //DevExVariables.Toaster("success", "The Submit button was clicked");
                var validation = DevExpress.validationEngine.validateGroup("ItemMaster");
                if (!validation.isValid) {
                    DevExVariables.Toaster("warning", "Please fill all required fields before submit.");
                    return;
                }

                ItemMasterView.btnMasterSubmit();

                //e.validationGroup.reset();
            }
        }).dxButton("instance");

        ItemMasterView.variables.dx_btnCancel = $("#dx_btnCancel").dxButton({
            icon: "close",
            text: "Cancel",
            type: "danger",
            validationGroup: "ItemMaster",
            onClick: function (e) {
                ItemMasterView.ClearValues();
                DevExpress.validationEngine.resetGroup("ItemMaster");
            }
        }).dxButton("instance");

        ItemMasterView.variables.dx_btnAddNew = $("#dx_btnAddNew").dxButton({
            stylingMode: "outlined",
            icon: "plus",
            text: "Add New",
            type: "default",
            validationGroup: "ItemMaster",
            onClick: function (e) {
                //e.validationGroup.reset();
                DevExpress.validationEngine.resetGroup("ItemMaster");

                $("#frm_HSNCodeMaster").show();
                $("#pnlView").hide();

                ItemMasterView.AddNewLineDetails();
                ItemMasterView.variables.dx_txtItemName.focus();

                var List = ItemMasterView.variables.SubCategoryList.filter(x=> x.rmtype == "STOCK" && ["GENERAL","FINISHED"].includes(x.rmgroup));
                ItemMasterView.variables.dx_ddlSubCategory.option({
                    dataSource: new DevExpress.data.ArrayStore({
                        data: List,
                        key: "rmsubcateid"
                    }),
                    displayExpr: "rmsubcate",
                    valueExpr: "rmsubcateid",
                });
            }
        }).dxButton("instance");
    },

    AddNewLineDetails: function (obj) {
        var postfix = ItemMasterView.variables.RowCount;

        $("#tbody_HSNDetails").append(
                '<tr rowno="' + postfix + '">'
                    + '<td class="TableRowNo"></td>'
                    + '<td>'
                        + '<div id="dx_ddlTaxName' + postfix + '" ></div>'
                    + '</td>'
                    + '<td>'
                        + '<div id="dx_txtTaxValue' + postfix + '" ></div>'
                    + '</td>'
                    + '<td>'
                        + '<div id="dx_ddlTaxValueIn' + postfix + '" ></div>'
                    + '</td>'
                    + '<td>'
                        + '<div id="dx_dtEffectiveDate' + postfix + '" ></div>'
                    + '</td>'
                    + '<td class="text-center">'
                        + '<span class="btn btn-danger" onClick="ItemMasterView.RemoveDetailRow(this)"><i class="fa fa-trash-o"></i></span>'
                    + '</td>'
                + '</tr>'
            );

        /*----------------------Registration of Detail table controls---------------------*/
        ItemMasterView.DetailTableFormInit(postfix, obj);
        /*----------------------Registration of Detail table controls---------------------*/

        ItemMasterView.variables.RowCount = postfix + 1;
    },

    DetailTableFormInit: function (postfix, obj) {
        /*----------------------Registration of Detail table controls---------------------*/
        var tmp = [];
        tmp[postfix] = { dx_ddlTaxName: "", dx_txtTaxValue: "", dx_ddlTaxValueIn: "", dx_dtEffectiveDate: "" };

        ItemMasterView.variables.DetailsControlsList = Object.assign(ItemMasterView.variables.DetailsControlsList, tmp);

        ItemMasterView.variables.DetailsControlsList[postfix].dx_ddlTaxName = $("#dx_ddlTaxName" + postfix).dxSelectBox({
            dataSource: new DevExpress.data.ArrayStore({
                data: ItemMasterView.variables.TaxNameList,
                key: "taxid"
            }),
            displayExpr: "taxname",
            valueExpr: "taxid",
            value: "",
            placeholder: "Select Tax Name...",
            searchEnabled: true,
            onFocusOut: function (data) {
                if (!data.component.option().selectedItem) {
                    ItemMasterView.variables.DetailsControlsList[postfix].dx_ddlTaxName.focus();
                }
            }
        }).dxValidator({
            validationGroup: "ItemMaster",
            validationRules: [{
                type: "required",
                message: "Tax Name is required"
            }]
        }).dxSelectBox("instance");

        ItemMasterView.variables.DetailsControlsList[postfix].dx_txtTaxValue = $("#dx_txtTaxValue" + postfix).dxTextBox({
            mode: "number",
            onKeyDown: function (e) {
                if (e.event.key == "-" || e.event.key == "+") {
                    e.event.preventDefault();
                }
            }
        }).dxValidator({
            validationGroup: "ItemMaster",
            validationRules: [{
                type: "required",
                message: "Tax Value is required"
            }]
        }).dxTextBox("instance");

        ItemMasterView.variables.DetailsControlsList[postfix].dx_ddlTaxValueIn = $("#dx_ddlTaxValueIn" + postfix).dxSelectBox({
            dataSource: ItemMasterView.variables.TaxValueInList,
            searchEnabled: true,
            value: ItemMasterView.variables.TaxValueInList[0],
        }).dxValidator({
            validationGroup: "ItemMaster",
            validationRules: [{
                type: "required",
                message: "Tax Value In  is required"
            }]
        }).dxSelectBox("instance");

        ItemMasterView.variables.DetailsControlsList[postfix].dx_dtEffectiveDate = $("#dx_dtEffectiveDate" + postfix).dxDateBox({
            type: "date",
            value: new Date(),
            showClearButton: true,
            useMaskBehavior: true,
            displayFormat: "dd/M/yyyy",
            onKeyDown: function (e) {
                if ((e.event.key == "Tab" || e.event.key == "Enter") && e.element.closest("tr").is(":last-child"))
                    ItemMasterView.AddNewLineDetails();
            }
        }).dxValidator({
            validationGroup: "ItemMaster",
            validationGroup: "ItemMaster",
            validationRules: [{
                type: "required",
                message: "Effective Date is required"
            }]
        }).dxDateBox("instance");

        /*----------------------Registration of Detail table controls---------------------*/

        /*----------------------Set Value of Detail table controls while Edit---------------------*/
        if (obj) {
            ItemMasterView.variables.DetailsControlsList[postfix].ItemDetailId = obj.itemdetailid;

            ItemMasterView.variables.DetailsControlsList[postfix].dx_ddlTaxName.option({
                selectedItem: { taxid: obj.taxid, taxname: obj.taxname },
                value: obj.taxid,
            });
            ItemMasterView.variables.DetailsControlsList[postfix].dx_txtTaxValue.option({
                value: obj.taxvalue,
            });
            ItemMasterView.variables.DetailsControlsList[postfix].dx_ddlTaxValueIn.option({
                value: obj.taxvaluein,
            });
            ItemMasterView.variables.DetailsControlsList[postfix].dx_dtEffectiveDate.option({
                value: obj.effectivedate,
            });
        }
        /*----------------------Set Value of Detail table controls while Edit---------------------*/

    },

    RemoveDetailRow: function (obj) {
        $(obj).closest("tr").remove();
        delete ItemMasterView.variables.DetailsControlsList[$(obj).closest("tr").attr("rowno")];
    },

    GetTaxMasList: function (postfix) {
        $.ajax({
            url: getDomain() + ItemMasterView.variables.BindTaxListUrl + "&IsRecordAll=true",
            async: false,
            cache: false,
            type: 'POST',
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    var JsonObject = xml2json.parser(data);
                    if (JsonObject.serviceresponse.detailslist) {
                        ItemMasterView.variables.TaxNameList = JsonObject.serviceresponse.detailslist.details;
                    }
                    else {
                        DevExVariables.Toaster("error", "There is no entry in TaxMaster, Please enter Tax Names in Tax Master.");
                    }
                }
                else {
                    DevExVariables.InvalidResponseCode(data);
                }
            },
            error: OnError
        });
    },

    makeDetailsXmlNodes: function () {
        var xmlNodeList = '<DETAILSLIST>';
        $.each(ItemMasterView.variables.DetailsControlsList, function (key, obj) {
            if (obj) {
                if (obj.dx_ddlTaxName.option().value) {
                    xmlNodeList += '<DETAILS>';
                    if (obj.ItemDetailId)
                        xmlNodeList += '<ITEMDETAILID>' + obj.ItemDetailId + '</ITEMDETAILID>';

                    xmlNodeList += '<TAXID>' + obj.dx_ddlTaxName.option().value + '</TAXID>';
                    xmlNodeList += '<TAXVALUE>' + obj.dx_txtTaxValue.option().value + '</TAXVALUE>';
                    xmlNodeList += '<TAXVALUEIN>' + obj.dx_ddlTaxValueIn.option().value + '</TAXVALUEIN>';

                    if (obj.dx_dtEffectiveDate.option().value) {
                        Date1 = obj.dx_dtEffectiveDate.option().text.split("/");
                        Date1 = Date1[2] + '-' + Date1[1] + '-' + Date1[0];
                        xmlNodeList += '<EFFECTIVEDATE>' + Date1 + '</EFFECTIVEDATE>';
                    }

                    xmlNodeList += '</DETAILS>';
                }
            }

        });
        xmlNodeList += '</DETAILSLIST>';

        return xmlNodeList;
    },

    GetSubBookList: function () {
        var myfilter = { rules: [] };
        myfilter.rules.push({ field: "TYPE", op: "eq", data: "AccSubBook" });

        $.ajax({
            url: getDomain() + ItemMasterView.variables.BindStaticDataUrl + "&myfilters=" + JSON.stringify(myfilter),
            async: true,
            cache: false,
            type: 'POST',
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    var JsonObject = xml2json.parser(data);
                    if (JsonObject.serviceresponse.detailslist) {
                        ItemMasterView.variables.dx_ddlSubBook.option({
                            dataSource: new DevExpress.data.ArrayStore({
                                data: JsonObject.serviceresponse.detailslist.details,
                                key: "sbookid"
                            }),
                            displayExpr: "subbook",
                            valueExpr: "sbookid",
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

    GetSubCategoryList: function () {
        ItemMasterView.variables.SubCategoryList = [];

        var myfilter = { rules: [] };
        myfilter.rules.push({ field: "TYPE", op: "eq", data: "rmsubcate" });

        $.ajax({
            url: getDomain() + ItemMasterView.variables.BindStaticDataUrl + "&myfilters=" + JSON.stringify(myfilter),
            async: true,
            cache: false,
            type: 'POST',
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    var JsonObject = xml2json.parser(data);
                    if (JsonObject.serviceresponse.detailslist) {
                        if (JsonObject.serviceresponse.detailslist.details.length > 0) {
                            ItemMasterView.variables.SubCategoryList = JsonObject.serviceresponse.detailslist.details;
                        }
                        else {
                            ItemMasterView.variables.SubCategoryList.push(JsonObject.serviceresponse.detailslist.details);
                        }
                        //ItemMasterView.variables.dx_ddlSubCategory.option({
                        //    dataSource: new DevExpress.data.ArrayStore({
                        //        data: ItemMasterView.variables.SubCategoryList,
                        //        key: "rmsubcateid"
                        //    }),
                        //    displayExpr: "rmsubcate",
                        //    valueExpr: "rmsubcateid",
                        //});
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
    ItemMasterView.FormInitialize();
    ItemMasterView.initializeDevExgrid();
    ItemMasterView.GetTaxMasList();
    ItemMasterView.GetSubCategoryList();

    $("#lnk_AddNewRow").click(function () {
        ItemMasterView.AddNewLineDetails();
    });
});