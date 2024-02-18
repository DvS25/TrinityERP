var TaxProfileView = {
    variables: {
        BindGroupListUrl: "/Common/BindMastersDetails?ServiceName=ACC_TAXPROFILE_GET",
        PerformMasterOperationUrl: "/Common/OpeartionsOnMaster?ServiceName=ACC_TAXPROFILE_CRUD",
        BindTaxListUrl: "/Common/BindMastersDetails?ServiceName=ACC_TAX_MASTER_GET",
        BindDetailListUrl: "/Common/BindMastersDetails?ServiceName=ACC_TAXPROFILE_DETAIL_GET",
        Oper: 'Add',
        addedit: "added",
        Masterid: "",
        RowCount: 1,
        dx_btnAddNew: "",
        dx_txtTaxProfileName: "",
        dx_txtDescription: "",
        dx_switchIsActive: "",
        dx_btnSubmit: "",
        dx_btnCancel: "",
        dx_dataGrid: "",
        DetailsControlsList: [],
        TaxNameList: [],

        dx_popupRecordDelete: "",
        DeleteDataObj: "",
        DeletePopUpOptions: {
            width: 300,
            height: 200,
            contentTemplate: function () {
                return $("<div />").append(
                    $("<p>Tax Profile Name: <span>" + TaxProfileView.variables.DeleteDataObj.taxprofilename + "</span></p>")
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
                            "TAXPROFILEID": TaxProfileView.variables.Masterid,
                            "oper": TaxProfileView.variables.Oper,
                        }

                        TaxProfileView.savedata(data);
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
        TaxProfileView.variables.dx_dataGrid = $("#dx_dataGrid").dxDataGrid({
            dataSource: new DevExpress.data.CustomStore({
                key: "taxprofileid",
                load: function (loadOptions) {
                    var deferred = $.Deferred();

                    var result = DevExVariables.GetDataList(loadOptions, TaxProfileView.variables.BindGroupListUrl);

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
            columns: [{ dataField: "taxprofileid", allowFiltering: false, allowSorting: true, sortIndex: 1, sortOrder: "desc", visible: false },
                { dataField: "taxprofilename", caption: "Tax Profile Name", dataType: "string", filterOperations: ["contains"], allowSorting: true, allowFiltering: true, allowHeaderFiltering: false },
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
                    dataField: "isdefault", caption: "Default", dataType: "string", alignment: "center", filterOperations: ["contains"],
                    allowSorting: false, allowFiltering: false, allowHeaderFiltering: false,
                    cellTemplate: function (container, options) {
                        if (isU()) {
                            $("<div>").dxSwitch({
                                value: options.value,
                                switchedOnText: "Yes",
                                switchedOffText: "No",
                                disabled: options.value == 1 ? true : false,
                                onValueChanged: function (data) {
                                    TaxProfileView.EditFromGrid(data.value, options.key, 'Default');
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
                        DevExVariables.ActionTemplate(container, options, true, true, "TaxProfileView");
                    }
                },
            ]
        }).dxDataGrid("instance");
    },

    triggerId: function (id) {
        var rowData = TaxProfileView.variables.dx_dataGrid.getVisibleRows()[TaxProfileView.variables.dx_dataGrid.getRowIndexByKey(+id)].data;
        TaxProfileView.variables.Masterid = id;
        TaxProfileView.variables.dx_txtTaxProfileName.option({ value: rowData.taxprofilename });
        TaxProfileView.variables.dx_txtDescription.option({ value: rowData.description });
        TaxProfileView.variables.dx_switchIsActive.option({ value: rowData.isactive });
        $("#frm_TaxProfile").show();
        $("#pnlView").hide();

        if (isU()) {
            TaxProfileView.variables.dx_btnSubmit.option({ visible: true });
        }
        else {
            TaxProfileView.variables.dx_btnSubmit.option({ visible: false });
        }

        var myfilter = { rules: [] };
        myfilter.rules.push({ field: "TAXPROFILEID", op: "eq", data: id });
        $.ajax({
            url: getDomain() + TaxProfileView.variables.BindDetailListUrl + "&myfilters=" + JSON.stringify(myfilter),
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
                            TaxProfileView.AddNewLineDetails(obj);
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
        var rowData = TaxProfileView.variables.dx_dataGrid.getVisibleRows()[TaxProfileView.variables.dx_dataGrid.getRowIndexByKey(+id)].data;
        TaxProfileView.variables.Masterid = id;
        TaxProfileView.variables.DeleteDataObj = rowData;
        TaxProfileView.variables.Oper = "Delete";
        TaxProfileView.variables.addedit = "Deleted";
        if (TaxProfileView.variables.dx_popupRecordDelete) {
            TaxProfileView.variables.dx_popupRecordDelete.option("contentTemplate", TaxProfileView.variables.DeletePopUpOptions.contentTemplate(TaxProfileView.variables.DeleteDataObj).bind(this));
        }
        else {
            TaxProfileView.variables.dx_popupRecordDelete = $("#dx_popupRecordDelete").dxPopup(TaxProfileView.variables.DeletePopUpOptions).dxPopup("instance");
        }

        TaxProfileView.variables.dx_popupRecordDelete.show();
    },

    btnMasterSubmit: function () {
        TaxProfileView.variables.Oper = 'Add';
        TaxProfileView.variables.addedit = "added";

        if (TaxProfileView.variables.Masterid != "0" && parseInt(TaxProfileView.variables.Masterid) > 0) {
            TaxProfileView.variables.Oper = 'Edit';
            TaxProfileView.variables.addedit = 'updated';
        }

        TaxProfileView.variables.dx_btnSubmit.option({ disabled: true });

        var DetailsNodeList = TaxProfileView.makeDetailsXmlNodes();

        var data = {
            "TAXPROFILEID": TaxProfileView.variables.Masterid,
            "TAXPROFILENAME": TaxProfileView.variables.dx_txtTaxProfileName.option().value,
            "DESCRIPTION": TaxProfileView.variables.dx_txtDescription.option().value,
            "ISACTIVE": TaxProfileView.variables.dx_switchIsActive.option().value,
            "XMLPARAM": escape(DetailsNodeList),
            "oper": TaxProfileView.variables.Oper,
        }
        TaxProfileView.savedata(data);
    },

    savedata: function (data) {
        $.ajax({
            url: getDomain() + TaxProfileView.variables.PerformMasterOperationUrl,
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
            success: TaxProfileView.btnMasterSubmitOnSuccess,
            error: OnError,
        });
    },

    btnMasterSubmitOnSuccess: function (data) {
        if ($(data).find('RESPONSECODE').text() == "0") {
            DevExVariables.Toaster("success", 'Record is ' + TaxProfileView.variables.addedit + ' successfully');
            $('#frm_TaxProfile').hide();
            $('#pnlView').show();

            TaxProfileView.ClearValues();
        }
        else {
            InvalidResponseCode(data);
        }

        TaxProfileView.variables.dx_btnSubmit.option({ disabled: false });

    },

    ClearValues: function () {
        TaxProfileView.variables.Masterid = "";
        TaxProfileView.variables.Oper = "Add";
        TaxProfileView.variables.addedit = "added";
        TaxProfileView.variables.dx_txtTaxProfileName.option({ value: "" });
        TaxProfileView.variables.dx_txtDescription.option({ value: "" });
        TaxProfileView.variables.dx_switchIsActive.option({ value: true });
        TaxProfileView.variables.DetailsControlsList = [];
        TaxProfileView.variables.RowCount = 1;
        TaxProfileView.variables.DeleteDataObj = "";
        TaxProfileView.variables.dx_btnSubmit.option({ visible: true });

        if (TaxProfileView.variables.dx_popupRecordDelete)
            TaxProfileView.variables.dx_popupRecordDelete.hide();

        $("#tbl_TaxDetails tbody").html("");
        $('#frm_TaxProfile').hide();
        $('#pnlView').show();
        TaxProfileView.variables.dx_dataGrid.refresh();
    },

    FormInitialize: function () {

        TaxProfileView.variables.dx_txtTaxProfileName = $("#dx_txtTaxProfileName").dxTextBox().dxValidator({
            validationRules: [{
                type: "required",
                message: "Tax Profile Name is required"
            }]
        }).dxTextBox("instance");

        TaxProfileView.variables.dx_txtDescription = $("#dx_txtDescription").dxTextArea({
            height: 110
        }).dxTextArea("instance");

        TaxProfileView.variables.dx_switchIsActive = $("#dx_switchIsActive").dxSwitch({
            value: true,
            switchedOnText: "Yes",
            switchedOffText: "No"
        }).dxSwitch("instance");

        TaxProfileView.variables.dx_btnSubmit = $("#dx_btnSubmit").dxButton({
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

                TaxProfileView.btnMasterSubmit();

                //e.validationGroup.reset();
            }
        }).dxButton("instance");

        TaxProfileView.variables.dx_btnCancel = $("#dx_btnCancel").dxButton({
            icon: "close",
            text: "Cancel",
            type: "danger",
            onClick: function (e) {
                TaxProfileView.ClearValues();
                e.validationGroup.reset();
            }
        }).dxButton("instance");

        TaxProfileView.variables.dx_btnAddNew = $("#dx_btnAddNew").dxButton({
            stylingMode: "outlined",
            icon: "plus",
            text: "Add New",
            type: "default",
            onClick: function (e) {
                e.validationGroup.reset();

                $("#frm_TaxProfile").show();
                $("#pnlView").hide();
                TaxProfileView.AddNewLineDetails();

                TaxProfileView.variables.dx_txtTaxProfileName.focus();
            }
        }).dxButton("instance");

        TaxProfileView.variables.dx_TaxCalc_btnSubmit = $("#dx_TaxCalc_btnSubmit").dxButton({
            icon: "check",
            text: "Submit",
            type: "success",
            onClick: function () {
                var TaxLabels = "", TaxIds = "";
                $("#txttaxname input[type='checkbox']").each(function (key, obj) {
                    if ($(obj).prop("checked")) {
                        TaxLabels += "+" + $(obj).parent().find(".TaxLabel").html();
                        TaxIds += "+" + $(obj).val();
                    }
                });

                if (!TaxLabels) {
                    DevExVariables.Toaster("warning", "Please select atleast one.");
                    return;
                }

                $("#tbl_TaxDetails tr[rowno='" + $("#hdnrowid").val() + "']").find(".TaxCalcOnLabel").html(TaxLabels.substring(1));
                $("#tbl_TaxDetails tr[rowno='" + $("#hdnrowid").val() + "']").find(".TaxCalcOnIds").val(TaxIds.substring(1));

                $("#hdnrowid").val("");
                $("#txttaxname input[type='checkbox']").prop("checked", false);
                $("#Modal_TaxCalc").modal("hide");
            }
        }).dxButton("instance");

        TaxProfileView.variables.dx_TaxCalc_btnCancel = $("#dx_TaxCalc_btnCancel").dxButton({
            icon: "close",
            text: "Cancel",
            type: "danger",
            onClick: function () {
                $("#hdnrowid").val("");
                $("#txttaxname input[type='checkbox']").prop("checked", false);
                $("#Modal_TaxCalc").modal("hide");
            }
        }).dxButton("instance");
    },

    AddNewLineDetails: function (obj) {
        var postfix = TaxProfileView.variables.RowCount;

        $("#tbl_TaxDetails tbody").append(
                '<tr rowno="' + postfix + '">'
                    + '<td class="TableRowNo"></td>'
                    + '<td>'
                        + '<div id="dx_ddlTaxName' + postfix + '" ></div>'
                    + '</td>'
                    + '<td>'
                        + '<span class="TaxCalcOnLabel">Taxable Amount</span>'
                        + '<input type="hidden" class="TaxCalcOnIds" value="0" />'
                        + '<span class="btn btn-primary" style="float:right;" onClick=\"TaxProfileView.TaxCalculate(' + postfix + ');\"><i class="fa fa-pencil"></i></span>'
                    + '</td>'
                    + '<td class="text-center">'
                        + '<span class="btn btn-danger" onClick="TaxProfileView.RemoveDetailRow(this)"><i class="fa fa-trash-o"></i></span>'
                    + '</td>'
                + '</tr>'
            );

        /*----------------------Registration of Detail table controls---------------------*/
        TaxProfileView.DetailTableFormInit(postfix, obj);
        /*----------------------Registration of Detail table controls---------------------*/

        TaxProfileView.variables.RowCount = postfix + 1;
    },

    DetailTableFormInit: function (postfix, obj) {
        /*----------------------Registration of Detail table controls---------------------*/
        var tmp = [];
        tmp[postfix] = { rowno: postfix, dx_ddlTaxName: "" };

        TaxProfileView.variables.DetailsControlsList = Object.assign(TaxProfileView.variables.DetailsControlsList, tmp);

        TaxProfileView.variables.DetailsControlsList[postfix].dx_ddlTaxName = $("#dx_ddlTaxName" + postfix).dxSelectBox({
            dataSource: new DevExpress.data.ArrayStore({
                data: TaxProfileView.variables.TaxNameList,
                key: "taxid"
            }),
            displayExpr: "taxname",
            valueExpr: "taxid",
            value: "",
            placeholder: "Select Tax Name...",
            searchEnabled: true,
            onFocusOut: function (data) {
                if (!data.component.option().selectedItem) {
                    TaxProfileView.variables.DetailsControlsList[postfix].dx_ddlTaxName.focus();
                }
            }
        }).dxValidator({
            validationRules: [{
                type: "required",
                message: "Tax Name is required"
            }]
        }).dxSelectBox("instance");

        /*----------------------Registration of Detail table controls---------------------*/

        /*----------------------Set Value of Detail table controls while Edit---------------------*/
        if (obj) {
            TaxProfileView.variables.DetailsControlsList[postfix].dx_ddlTaxName.option({
                selectedItem: { taxid: obj.taxid, taxname: obj.taxname },
                value: obj.taxid,
            });

            $("#tbl_TaxDetails tr[rowno='" + postfix + "']").find(".TaxCalcOnIds").val(obj.calculationon);
            $("#tbl_TaxDetails tr[rowno='" + postfix + "']").find(".TaxCalcOnLabel").html(obj.calculationonlabels);
        }
        /*----------------------Set Value of Detail table controls while Edit---------------------*/

    },

    RemoveDetailRow: function (obj) {
        $(obj).closest("tr").remove();
        delete TaxProfileView.variables.DetailsControlsList[$(obj).closest("tr").attr("rowno")];
    },

    GetTaxMasList: function () {
        $.ajax({
            url: getDomain() + TaxProfileView.variables.BindTaxListUrl + "&IsRecordAll=true",
            async: false,
            cache: false,
            type: 'POST',
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    var JsonObject = xml2json.parser(data);
                    if (JsonObject.serviceresponse.detailslist) {
                        if (JsonObject.serviceresponse.detailslist.details.length > 0)
                            TaxProfileView.variables.TaxNameList = JsonObject.serviceresponse.detailslist.details;
                        else
                            TaxProfileView.variables.TaxNameList.push(JsonObject.serviceresponse.detailslist.details);

                        $("#txttaxname").html('<li style="width:225px;">' +
                                                    '<div style="display:flex;width:210px;">' +
                                                        '<input type="checkbox" value="0" />' +
                                                        '<div class="TaxLabel">Taxable Amount</div>' +
                                                    '</div>' +
                                                '</li>');
                        $("#txttaxname").append($("#renderTaxList").render(JsonObject.serviceresponse.detailslist.details));
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
        $.each(TaxProfileView.variables.DetailsControlsList, function (key, obj) {
            if (obj) {
                if (obj.dx_ddlTaxName.option().value) {
                    xmlNodeList += '<DETAILS>';
                    xmlNodeList += '<TAXID>' + obj.dx_ddlTaxName.option().value + '</TAXID>';
                    xmlNodeList += '<CALCULATIONON>' + $("#tbl_TaxDetails tr[rowno='" + obj.rowno + "']").find(".TaxCalcOnIds").val().replaceAll('+',"%2b") + '</CALCULATIONON>';
                    xmlNodeList += '</DETAILS>';
                }
            }

        });
        xmlNodeList += '</DETAILSLIST>';

        return xmlNodeList;
    },

    EditFromGrid: function (val, id, type) {
        var data = {
            oper: "EditFromGrid",
            "TAXPROFILEID": id
        }

        if (type == "Default")
            data.ISDEFAULT = val;

        $.ajax({
            url: getDomain() + TaxProfileView.variables.PerformMasterOperationUrl,
            data: data,
            async: false,
            cache: false,
            type: 'POST',
            beforeSend: function () {
                dx_LoaderTrinity.show();
            },
            success: function (data) {
                if ($(data).find("RESPONSECODE").text() == 0) {
                    DevExVariables.Toaster("success", 'Record is Updated successfully.');
                    TaxProfileView.ClearValues();
                }
                else {
                    DevExVariables.InvalidResponseCode(data);
                }
            },
            complete: function () {
                dx_LoaderTrinity.hide();
            },
            error: OnError
        });
    },

    TaxCalculate: function (rowid) {
        $("#hdnrowid").val(rowid);

        var TaxIds = $("#tbl_TaxDetails tr[rowno='" + rowid + "']").find(".TaxCalcOnIds").val();
        var TaxIdList = TaxIds.split("+");

        $.each(TaxIdList, function (key, obj) {
            $("#txttaxname input[type='checkbox'][value='" + obj + "']").prop("checked", true);
        })

        $("#Modal_TaxCalc").modal("show");
    },

};

$(document).ready(function () {
    TaxProfileView.FormInitialize();
    TaxProfileView.initializeDevExgrid();
    TaxProfileView.GetTaxMasList();

    $("#lnk_AddNewRow").click(function () {
        TaxProfileView.AddNewLineDetails();
    });

});

