var OrderMasterView = {
    variables: {
        BindGroupListUrl: "/Common/BindMastersDetails?ServiceName=SALES_WHOLESELLER_DETAILS_GET",
        PerformMasterOperationUrl: "/Common/OpeartionsOnMaster?ServiceName=ACC_ORDER_MASTER_CRUD",
        BindMainGridListUrl: "/Common/BindMastersDetails?ServiceName=ACC_ORDER_MASTER_GET",
        BindMainGridListDeatilsUrl: "/Common/BindMastersDetails?ServiceName=ACC_ORDER_ITEM_GET",
        BindStaticDataUrl: "/Common/BindMastersDetails?ServiceName=STATIC_MASTER_GET&IsActive=true",
        BindQuotationMasterList: "/Common/BindMastersDetails?ServiceName=ACC_QUOTATION_MASTER_GET",
        BindQutationDeatilsList: "/Common/BindMastersDetails?ServiceName=ACC_QUOTATION_ITEM_DETAILS_GET",
        PerformMasterOperationUrl_Party: "/Common/OpeartionsOnMaster?ServiceName=ACCOUNTMASTER_CRUD",
        BindDesignListUrl: "/Common/BindMastersDetails?ServiceName=PRD_DESIGN_MASTER_GET",
        BindDetailListUrl: "/Common/BindMastersDetails?ServiceName=PRD_DESIGN_DETAIL_GET",
        BindPartyList: "/Common/BindMastersDetails?ServiceName=ACCOUNTMASTER_GET",
        BindOrderByList: "/Common/BindMastersDetails?ServiceName=USERDETAILS_GET",
        Oper: 'Add',
        addedit: "added",
        Masterid: "",
        RowCount: 1,
        /*------------------------variables for main form Controls-----------------------*/
        dx_ddlMpurity: "",
        dx_ddlMColor: "",
        dx_ddlDQty: "",
        dx_ddlDColor: "",
        dx_btnUpdate: "",
        Deleteid: "",
        QM_Id: "",
        dx_popupRecordDelete: "",
        dx_Datagrid_QuoSelect: "",
        DeletePopUpOptions: {
            width: 300,
            height: 200,
            contentTemplate: function () {
                return $("<div />").append(
                    $("<p>Order No: <span>" + OrderMasterView.variables.DeleteDataObj.orderno + "</span></p>"),

                    $("<div style='float:right;' />").attr("id", "dx_btnDeleteConfirm").dxButton({
                        text: "Yes, Delete It!",
                        icon: "trash",
                        type: "danger",
                        onClick: function (e) {
                            var data = {
                                "OM_ID": OrderMasterView.variables.Masterid,
                                "QM_ID": OrderMasterView.variables.DeleteDataObj.quono,
                                "oper": OrderMasterView.variables.Oper,
                            }

                            OrderMasterView.savedata(data);
                        }
                    })
                );
            },
            showTitle: true,
            title: "Delete Record?",
            visible: false,
            dragEnabled: false,
            closeOnOutsideClick: true
        },
        Quotation_Id: "",
        dx_btnCancel_Quotation: "",
        dx_btnSave_Quotation: "",
        dx_txtVoucherDate: "",
        dx_txtVoucherNo: "",
        dx_ddlVoucherType: "",
        dx_txtDueDays: "",
        dx_txtDueDate: "",
        dx_txtParty: "",
        dx_txtPartyCode: "",
        dx_txtMob: "",
        dx_TxtOrderby: "",
        dx_txtSearch: "",
        dx_txtRemarks: "",
        dx_BtnPartyAdd: "",
        dx_txtOrderQuo: "",
        dx_btnSubmit: "",
        dx_btnCancel: "",
        dx_btnAddNew: "",
        dx_BtnVoucherAdd: "",
        dx_ddlHsnCode: "",
        dx_txtTotal: "",
        dx_txtSgst: "",
        dx_txtCgst: "",
        dx_txtIgst:"",
        dx_txtOtherTax: "",
        dx_txtAmount:"",
        dx_txtRoundOff:"",
        dx_txtTotlAmt:"",
        dx_txtRemarksvoucher: "",

        MULTISEARCH_PRODUCT: [],
        /*------------------------variables for main form Controls-----------------------*/

        /*---------------------- Modal Variable ----------------------------------*/

        dx_txtAcc_Name: "",
        dx_txtshortname: "",
        dx_txtHead: "",
        dx_txtMobileNo: "",
        dx_ddlCountry: "",
        dx_ddlState: "",
        dx_ddlCity: "",
        dx_Party_btnSubmit: "",
        dx_Party_btnCancel: "",
        /*---------------------- Modal Variable ----------------------------------*/
        dx_dataGrid_Order_Detail: [],
        MULTISEARCH: [],
        dx_dataGrid_Order: "",
        OrderTypeList: ["Stock", "Party"],
        PriorityList: ["High", "Low", "Medium"],
    },
    FormInitialize: function () {
        var now = new Date();

        OrderMasterView.variables.dx_btnUpdate = $("#dx_btnUpdate").dxButton({
            icon: "refresh",
            text: "Update",
            type: "success",
            //useSubmitBehavior: true,
            onClick: function (e) {
                OrderMasterView.GridUpdate();
            }
        }).dxButton("instance");

        OrderMasterView.variables.dx_ddlMpurity = $("#dx_ddlMpurity").dxSelectBox(
         {
             placeholder: "Select M Purity...",
             searchEnabled: true,
         }).dxSelectBox("instance");


        OrderMasterView.variables.dx_ddlMColor = $("#dx_ddlMColor").dxSelectBox(
          {
              placeholder: "Select M Color...",
              searchEnabled: true,
          }).dxSelectBox("instance");


        OrderMasterView.variables.dx_ddlDQty = $("#dx_ddlDQty").dxSelectBox(
            {
                placeholder: "Select D Qty...",
                searchEnabled: true,
            }).dxSelectBox("instance");

        OrderMasterView.variables.dx_ddlDColor = $("#dx_ddlDColor").dxSelectBox(
          {
              placeholder: "Select D Color...",
              searchEnabled: true,
          }).dxSelectBox("instance");

        OrderMasterView.variables.dx_dataGrid_Main = $("#dx_dataGrid_Main").dxDataGrid({
            dataSource: new DevExpress.data.CustomStore({
                key: "om_id",
                load: function (loadOptions) {
                    var deferred = $.Deferred();

                    var result = DevExVariables.GetDataList(loadOptions, OrderMasterView.variables.BindMainGridListUrl);

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
            showBorders: true,
            showColumnLines: true,
            showRowLines: true,
            rowAlternationEnabled: true,
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
                showPageSizeSelector: true,
                allowedPageSizes: [15, 30, 100]
            },
            columns: [{ dataField: "om_id", allowFiltering: false, allowSorting: true, visible: false },
                { dataField: "orderno", caption: "Order No", dataType: "string", allowSorting: true, allowFiltering: true, allowHeaderFiltering: false },
                { dataField: "priority", caption: "Priority", dataType: "string", allowSorting: true, allowFiltering: true, allowHeaderFiltering: false },
                { dataField: "type", caption: "Type", dataType: "string", allowSorting: false, allowFiltering: false, allowHeaderFiltering: false },
                
                { dataField: "total_grosswgt", caption: "Total Gross Wgt", dataType: "int", allowSorting: false, allowFiltering: false, allowHeaderFiltering: false },
                { dataField: "total_netwgt", caption: "Total Net Wgt", dataType: "int", allowSorting: false, allowFiltering: false, allowHeaderFiltering: false },
                { dataField: "total_diawgt", caption: "Total Dia Wgt", dataType: "int", allowSorting: false, allowFiltering: false, allowHeaderFiltering: false },
                { dataField: "total_dpcs", caption: "Total Dia Pcs", dataType: "int", allowSorting: false, allowFiltering: false, allowHeaderFiltering: false },
                { dataField: "totalamount", caption: "Total Amount", dataType: "int", allowSorting: false, allowFiltering: false, allowHeaderFiltering: false },
                {
                    dataField: "status", caption: "Status", dataType: "string", allowSorting: false, allowFiltering: false, allowHeaderFiltering: false,
                    cellTemplate: function (container, options) {
                        if (options.displayValue == "Saved")
                        {
                            var temp = '<span class="label label-success" style="font-size: 100%; !important">' + options.displayValue + '</span>'
                        }
                        else
                        {
                            var temp = '<span class="label label-danger" style="font-size: 100%; !important">' + options.displayValue + '</span>'
                        }
                        
                        '<div>' + options.data.designcode + '</div>';

                        $(temp).appendTo(container);
                    }
                },
                {
                    dataField: "Action", caption: "Action", alignment: "center", allowFiltering: false, allowSorting: false,
                    cellTemplate: function (container, options) {
                        DevExVariables.ActionTemplate(container, options, true, true, false, "OrderMasterView");
                    }
                },
            ]
        }).dxDataGrid("instance");

        OrderMasterView.variables.dx_btnSave_Quotation = $("#dx_btnSave_Quotation").dxButton({
            icon: "check",
            text: "Submit",
            type: "success",
            //useSubmitBehavior: true,
            onClick: function (e) {
                var List = [];
                List = OrderMasterView.variables.dx_Datagrid_QuoSelect.option().selectedRowKeys

                if (List.length > 0) {

                    var OrderDate = OrderMasterView.variables.dx_txtVoucherDate.option().text.split("/");
                    OrderDate = OrderDate[2] + '-' + OrderDate[1] + '-' + OrderDate[0];

                    var DueDays = OrderMasterView.variables.dx_txtDueDate.option().text.split("/");
                    DueDays = DueDays[2] + '-' + DueDays[1] + '-' + DueDays[0];

                    var data = {
                        "ORDERDATE": OrderDate,
                        "QM_ID": OrderMasterView.variables.Quotation_Id,
                        "TYPE": OrderMasterView.variables.dx_ddlVoucherType.option().value,
                        "DUEDAY": OrderMasterView.variables.dx_txtDueDays.option().value,
                        "DUEDATE": DueDays,
                        "PRIORITY": OrderMasterView.variables.dx_ddlPriority.option().value,
                        "ACCID": OrderMasterView.variables.dx_txtParty.option().selectedItem.accid,
                        "SALESMANID": OrderMasterView.variables.dx_TxtOrderby.option().selectedItem.userid,
                        "OM_ID": OrderMasterView.variables.Masterid,
                        "QI_IDLIST": List.toString(),
                        "OPER_TYPE": "ADD_ORDER"
                    }
                    //var myfilter = { rules: [] };
                    //myfilter.rules.push({ field: "QM_ID", op: "eq", data: List.toString() });
                    //myfilter.rules.push({ field: "TYPE", op: "eq", data: 'ADD_ORDER' });


                    $.ajax({
                        url: getDomain() + OrderMasterView.variables.PerformMasterOperationUrl,
                        async: true,
                        cache: false,
                        data: data,
                        type: 'POST',
                        success: function (data) {
                            if ($(data).find('RESPONSECODE').text() == "0") {

                                //$("#ModalQuotation").modal("hide");
                                OrderMasterView.variables.Masterid = $(data).find('OM_ID').text()
                                var myfilter = { rules: [] };
                                myfilter.rules.push({ field: "OM_ID", op: "eq", data: $(data).find('OM_ID').text() });
                                myfilter.rules.push({ field: "TYPE", op: "eq", data: 'ORDER_ITEAM_DEATILS' });

                                $.ajax({
                                    url: getDomain() + OrderMasterView.variables.BindMainGridListDeatilsUrl + "&myfilters=" + JSON.stringify(myfilter),
                                    async: true,
                                    cache: false,
                                    data: data,
                                    type: 'POST',
                                    success: function (data) {
                                        if ($(data).find('RESPONSECODE').text() == "0") {
                                            var JsonObject = xml2json.parser(data);
                                            if (JsonObject.serviceresponse.detailslist_total) {
                                                $("#lbltotalGrossWgt").html(JsonObject.serviceresponse.detailslist_total.details_total.total_grossweight);
                                                $("#lbltotalNetWgt").html(JsonObject.serviceresponse.detailslist_total.details_total.total_netweight);
                                                $("#lbltotalDiapcs").html(JsonObject.serviceresponse.detailslist_total.details_total.total_diapcs);
                                                $("#lbltotalDiaCts").html(JsonObject.serviceresponse.detailslist_total.details_total.total_diawgt);
                                                $("#lbltotalAmount").html(JsonObject.serviceresponse.detailslist_total.details_total.totalamount);
                                            }
                                            var List = [];
                                            if (JsonObject.serviceresponse.detailslist) {
                                                if (JsonObject.serviceresponse.detailslist.details.length)
                                                    List = JsonObject.serviceresponse.detailslist.details;
                                                else
                                                    List.push(JsonObject.serviceresponse.detailslist.details);

                                                OrderMasterView.variables.dx_dataGrid_Order.option({
                                                    dataSource: new DevExpress.data.ArrayStore({
                                                        data: List,
                                                        key: "qi_id"
                                                    }),
                                                });

                                                $("#ModalQuotation").modal("hide");

                                            }

                                            OrderMasterView.variables.dx_Datagrid_QuoSelect.option().selectedRowKeys = ''
                                        }
                                    }
                                });


                            }
                            else {
                                DevExVariables.InvalidResponseCode(data);
                                deferred.reject("Data Loading Error");
                            }
                        },
                        error: OnError
                    });

                }
            }
        }).dxButton("instance");

        OrderMasterView.variables.dx_btnCancel_Quotation = $("#dx_btnCancel_Quotation").dxButton({
            icon: "close",
            text: "Cancel",
            type: "danger",
            onClick: function (e) {
                $("#ModalQuotation").modal("hide");
                //OrderMasterView.variables.dx_txtQuotationNo.option({ "value": "" }, { "items": "" }, { "selectedItem": "" });
                $("#QuotationMasterBody").html("");

                OrderMasterView.variables.Quotation_Id = "";

                //OrderMasterView.variables.dx_ddlOrderType.option({ value: 'Stock' })

                OrderMasterView.variables.dx_ddlVoucherType.option({ readOnly: false })

                OrderMasterView.variables.dx_txtDueDays.option({ value: '' })

                /*------------------------------- Due Days Wise Binding Date --------------------------------------*/
                OrderMasterView.variables.dx_txtDueDate.option({ value: '' });
                /*------------------------------- Due Days Wise Binding Date --------------------------------------*/

                // OrderMasterView.variables.dx_ddlPriority.option({ value: '' })


                OrderMasterView.variables.dx_txtParty.option({
                    items: '',
                    selectedItem: '',
                    value: ''
                });
                OrderMasterView.variables.dx_txtPartyCode.option({ value: '' });

                OrderMasterView.variables.dx_txtMob.option({ value: '' });

                OrderMasterView.variables.dx_TxtOrderby.option({
                    items: '',
                    selectedItem: '',
                    value: ''
                });

                //OrderMasterView.variables.dx_txtQuotationNo.option({ readOnly: false })

                $("#dx_txtSearch").hide();

            }
        }).dxButton("instance");


        OrderMasterView.variables.dx_txtVoucherDate = $("#dx_txtVoucherDate").dxDateBox({
            type: "date",
            value: now,
            showClearButton: true,
            useMaskBehavior: true,
            displayFormat: "dd/M/yyyy",
        }).dxDateBox("instance");

        OrderMasterView.variables.dx_txtVoucherNo = $("#dx_txtVoucherNo").dxTextBox({
            readOnly: true,
        }).dxTextBox("instance");
        OrderMasterView.variables.dx_txtTotal = $("#dx_txtTotal").dxTextBox({
            readOnly: true,
        }).dxTextBox("instance");
        OrderMasterView.variables.dx_txtSgst = $("#dx_txtSgst").dxTextBox({
            readOnly: true,
        }).dxTextBox("instance");
        OrderMasterView.variables.dx_txtCgst = $("#dx_txtCgst").dxTextBox({
            readOnly: true,
        }).dxTextBox("instance");
        OrderMasterView.variables.dx_txtIgst = $("#dx_txtIgst").dxTextBox({
            readOnly: true,
        }).dxTextBox("instance");
        OrderMasterView.variables.dx_txtOtherTax = $("#dx_txtOtherTax").dxTextBox({
            readOnly: true,
        }).dxTextBox("instance");
        OrderMasterView.variables.dx_txtAmount = $("#dx_txtAmount").dxTextBox({
            readOnly: true,
        }).dxTextBox("instance");
        OrderMasterView.variables.dx_txtRoundOff = $("#dx_txtRoundOff").dxTextBox({
            readOnly: true,
        }).dxTextBox("instance");
        OrderMasterView.variables.dx_txtTotlAmt = $("#dx_txtTotlAmt").dxTextBox({
            readOnly: true,
        }).dxTextBox("instance");

        //OrderMasterView.variables.dx_txtQuotationNo1 = $("#dx_txtQuotationNo1").dxTextBox({
        //    readOnly: true,
        //}).dxTextBox("instance");

        //OrderMasterView.variables.dx_ddlOrderType = $("#dx_ddlOrderType").dxSelectBox({
        //    dataSource: OrderMasterView.variables.OrderTypeList,
        //    value: '',
        //    searchEnabled: true,

        //}).dxValidator({
        //    validationRules: [{
        //        type: "required",
        //        message: "Sub Category is required"
        //    }]
        //}).dxSelectBox("instance");

        OrderMasterView.variables.dx_ddlVoucherType = $("#dx_ddlVoucherType").dxSelectBox({
            dataSource: OrderMasterView.variables.OrderTypeList,
            value: OrderMasterView.variables.OrderTypeList[0],
            searchEnabled: true,
        }).dxSelectBox("instance");


        

        OrderMasterView.variables.dx_txtSearch = $("#dx_txtSearch").dxAutocomplete({
            placeholder: "Search Design Code, Category, Ref Code ...",
            mode: "search",
            readOnly: false,
            dataSource: new DevExpress.data.CustomStore({
                load: function (loadOptions) {

                    if (!OrderMasterView.variables.dx_txtParty.option().selectedItem) {
                        DevExVariables.Toaster("warning", "Party Name is required.");
                        return;
                    }

                    if (!OrderMasterView.variables.dx_TxtOrderby.option().selectedItem) {
                        DevExVariables.Toaster("warning", "Order By is required.");
                        return;
                    }

                    if (!OrderMasterView.variables.dx_txtVoucherDate.option().value) {
                        DevExVariables.Toaster("warning", "Quotation Date is required.");
                        return;
                    }

                    if (!OrderMasterView.variables.dx_txtDueDate.option().value) {
                        DevExVariables.Toaster("warning", "Due Date is required.");
                        return;
                    }

                    if (!OrderMasterView.variables.dx_txtDueDays.option().value != '') {
                        DevExVariables.Toaster("warning", "Due Days is required.");
                        return;
                    }

                    //if (!OrderMasterView.variables.dx_ddlPriority.option().value) {
                    //    DevExVariables.Toaster("warning", "Priority is required.");
                    //    return;
                    //}

                    var deferred = $.Deferred();
                    var url;
                    var myfilter = { rules: [] };

                    myfilter.rules.push({ field: "SEARCH", op: "eq", data: loadOptions.searchValue });
                    var result;
                    $.ajax({
                        url: getDomain() + OrderMasterView.variables.BindDesignListUrl + "&myfilters=" + JSON.stringify(myfilter),
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

                    if (result != "Error") {
                        if (result.serviceresponse.detailslist) {
                            var chklength = result.serviceresponse.detailslist.details.length
                            if (chklength)
                                deferred.resolve(result.serviceresponse.detailslist.details);
                            else
                                deferred.resolve([result.serviceresponse.detailslist.details]);
                        }
                        else
                            deferred.reject("No Records Found");
                    }
                    else {
                        deferred.reject("Data Loading Error");
                    }

                    return deferred.promise();
                },
                key: "dm_id",
            }),
            valueExpr: "designcode",
            onSelectionChanged: function (data) {
                if (data.selectedItem) {
                    OrderMasterView.variables.Searchid = data.selectedItem.dm_id;

                    OrderMasterView.variables.MULTISEARCH_PRODUCT.push(data.selectedItem.designcode);

                    /*-------------------------------------------- Job Work Grid Set Data ---------------------------------------------------*/

                    var myfilter = { rules: [] };
                    if (OrderMasterView.variables.dx_txtSearch.option().value) {
                        myfilter.rules.push({ field: "MULTISEARCH_IN", op: "eq", data: OrderMasterView.variables.dx_txtSearch.option().value });
                    }
                    myfilter.rules.push({ field: "CURRENCYCODE", op: "eq", data: getCurrencyCode() });

                    var rows = 30, page = 1;
                    $.ajax({
                        url: getDomain() + OrderMasterView.variables.BindDesignListUrl + "&myfilters=" + JSON.stringify(myfilter),
                        async: true,
                        cache: false,
                        type: 'POST',
                        success: function (data) {
                            if ($(data).find('RESPONSECODE').text() == "0") {

                                var JsonObject = xml2json.parser(data);
                                var List = [];
                                if (JsonObject.serviceresponse.detailslist) {

                                    List = JsonObject.serviceresponse.detailslist.details;
                                    //var dataSource = OrderMasterView.variables.dx_dataGrid_Order.getDataSource();
                                    //dataSource.store().insert(List).then(function () {
                                    //    dataSource.reload();
                                    //})

                                    OrderMasterView.CRUD_SingalEntry(List);

                                    OrderMasterView.variables.dx_txtSearch.option({ value: "" })
                                }
                            }
                            else {
                                DevExVariables.InvalidResponseCode(data);
                                deferred.reject("Data Loading Error");
                            }
                        },
                        error: OnError
                    });


                    /*-------------------------------------------- Job Work Grid Set Data ---------------------------------------------------*/
                }
                else {
                    OrderMasterView.variables.dx_txtSearch.option("value", "");
                    OrderMasterView.variables.Searchid = '';
                }
            },
            onFocusOut: function (data) {
                if (!data.component.option().selectedItem) {
                    OrderMasterView.variables.dx_txtSearch.option("value", "");
                }
            },
            itemTemplate: function (data) {
                return $("<div class='custom-item'>" +
                        "<img   src='" + getDesignImgVirtualPath() + "/" + data.desgcate + "/" + data.desgsubcate + "/thumb/" + data.imgpath + "' />" +
                        "<div class='product-name'>" + data.designcode + "</div></div>");
            },
        }).dxAutocomplete("instance");
        OrderMasterView.variables.dx_txtDueDays = $("#dx_txtDueDays").dxTextBox({
            mode: "number",
            value: 0,
            onValueChanged: function (data) {
                if (data.value)
                    OrderMasterView.DueDate(data.value);
            }
        }).dxTextBox("instance");

        OrderMasterView.variables.dx_txtDueDate = $("#dx_txtDueDate").dxDateBox({
            type: "date",
            value: now,
            showClearButton: true,
            useMaskBehavior: true,
            displayFormat: "dd/M/yyyy",
        }).dxDateBox("instance");

        OrderMasterView.variables.dx_ddlPriority = $("#dx_ddlPriority").dxSelectBox({
            placeholder: "Select Priority of Order...",
            items: OrderMasterView.variables.PriorityList,
            value: OrderMasterView.variables.PriorityList[0],
            searchEnabled: true,
        }).dxSelectBox("instance");

        //OrderMasterView.variables.dx_txtParty = $("#dx_txtParty").dxAutocomplete({
        //    placeholder: "Search Party Name...",
        //    mode: "search",
        //    onValueChanged: function (data) {
        //    }
        //}).dxAutocomplete("instance");


        OrderMasterView.variables.dx_txtParty = $("#dx_txtParty").dxAutocomplete({
            placeholder: "Selection List ...",
            mode: "search",
            dataSource: new DevExpress.data.CustomStore({
                load: function (loadOptions) {
                    var deferred = $.Deferred();

                    $.ajax({
                        url: getDomain() + OrderMasterView.variables.BindPartyList + "&_search=true&searchField=ACCOUNTNAME&searchOper=cn&searchString=" + loadOptions.searchValue,

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
            itemTemplate: function (data) {
                //OrderMasterView.variables.PartyList_accid = data.accid;
                //OrderMasterView.variables.dx_txtCode.option({ value: data.accid });
                return $("<div>" + data.accountname + "</div>");
            },
            onSelectionChanged: function (data) {
                if (data.selectedItem) {
                    //OrderMasterView.variables.PartyList_accid = data.selectedItem.accid;
                    OrderMasterView.variables.dx_txtPartyCode.option({ value: data.selectedItem.accid });
                    OrderMasterView.variables.dx_txtMob.option({ value: data.selectedItem.mobile1 });
                }
                else {
                    OrderMasterView.variables.dx_txtPartyCode.option("value", "");
                    OrderMasterView.variables.dx_txtMob.option("value", "");
                }
            }
        }).dxAutocomplete("instance");

        OrderMasterView.variables.dx_txtOrderQuo = $("#dx_txtOrderQuo").dxTextBox({
            placeholder: "Important Quo",
        }).dxTextBox("instance");

        OrderMasterView.variables.dx_txtPartyCode = $("#dx_txtPartyCode").dxTextBox({
            readOnly: true,
        }).dxTextBox("instance");

        OrderMasterView.variables.dx_txtMob = $("#dx_txtMob").dxTextBox({
            readOnly: true,
            placeholder: "Mobile No",
        }).dxTextBox("instance");

        OrderMasterView.variables.dx_TxtOrderby = $("#dx_TxtOrderby").dxAutocomplete({
            placeholder: "Purchase By...",
            dataSource: new DevExpress.data.CustomStore({
                load: function (loadOptions) {
                    var deferred = $.Deferred();


                    var myfilter = { rules: [] };
                    myfilter.rules.push({ field: "UNAME", op: "CN", data: loadOptions.searchValue });
                    var result;
                    $.ajax({
                        // url: getDomain() + OrderMasterView.variables.BindOrderByList + "&_search=true&searchField=UNAME&searchOper=cn&searchString=" + loadOptions.searchValue,
                        url: getDomain() + OrderMasterView.variables.BindOrderByList + "&myfilters=" + JSON.stringify(myfilter),
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

                    if (result != "Error") {
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
                key: "userid"
            }),
            valueExpr: "employee_name",
            displayExpr: "employee_name",
            onFocusOut: function (data) {
                if (!data.component.option().selectedItem) {
                    OrderMasterView.variables.dx_TxtOrderby.option("value", "");
                }
            },
        }).dxAutocomplete("instance");

        OrderMasterView.variables.dx_ddlHsnCode = $("#dx_ddlHsnCode").dxSelectBox(
      {
          placeholder: "Select HSN Code...",
          searchEnabled: true,
      }).dxSelectBox("instance");



        OrderMasterView.variables.dx_txtRemarks = $("#dx_txtRemarks").dxTextArea({
            height: 90
        }).dxTextArea("instance");
        OrderMasterView.variables.dx_txtRemarksvoucher = $("#dx_txtRemarksvoucher").dxTextArea({
            height: 90
        }).dxTextArea("instance");

        OrderMasterView.variables.dx_BtnPartyAdd = $("#dx_BtnPartyAdd").dxButton({
            stylingMode: "outlined",
            type: "Primary",
            icon: "plus",
            onClick: function (e) {
                //OrderMasterView.variables.dx_txtSearch_Stock.option({ value: "" });
                //OrderMasterView.variables.dx_txtshortname.option({ value: "" });
                //// OrderMasterView.variables.dx_txtHead.option({ value: "" });
                //OrderMasterView.variables.dx_txtMobileNo.option({ value: "" });
                //OrderMasterView.variables.dx_ddlCountry.option({ value: "" });
                //OrderMasterView.variables.dx_ddlState.option({ value: "" });
                //OrderMasterView.variables.dx_ddlCity.option({ value: "" });
                $("#Modal_PartyMaster").modal("show");
            }
        });
        OrderMasterView.variables.dx_BtnVoucherAdd = $("#dx_BtnVoucherAdd").dxButton({
            stylingMode: "outlined",
            type: "Primary",
            icon: "plus",
            onClick: function (e) {
                //OrderMasterView.variables.dx_txtSearch_Stock.option({ value: "" });
                //OrderMasterView.variables.dx_txtshortname.option({ value: "" });
                //// OrderMasterView.variables.dx_txtHead.option({ value: "" });
                //OrderMasterView.variables.dx_txtMobileNo.option({ value: "" });
                //OrderMasterView.variables.dx_ddlCountry.option({ value: "" });
                //OrderMasterView.variables.dx_ddlState.option({ value: "" });
                //OrderMasterView.variables.dx_ddlCity.option({ value: "" });
                $("#Modal_PartyMaster").modal("show");
            }
        });

        OrderMasterView.variables.dx_btnSubmit = $("#dx_btnSubmit").dxButton({
            icon: "check",
            text: "Submit",
            type: "success",
            //useSubmitBehavior: true,
            onClick: function (e) {
                if (!OrderMasterView.variables.dx_txtParty.option().selectedItem) {
                    DevExVariables.Toaster("warning", "Party Name is required.");
                    return;
                }

                if (!OrderMasterView.variables.dx_TxtOrderby.option().selectedItem) {
                    DevExVariables.Toaster("warning", "Order By is required.");
                    return;
                }

                if (!OrderMasterView.variables.dx_txtVoucherDate.option().value) {
                    DevExVariables.Toaster("warning", "Quotation Date is required.");
                    return;
                }

                if (!OrderMasterView.variables.dx_txtDueDate.option().value) {
                    DevExVariables.Toaster("warning", "Due Date is required.");
                    return;
                }

                if (!OrderMasterView.variables.dx_txtDueDays.option().value != '') {
                    DevExVariables.Toaster("warning", "Due Days is required.");
                    return;
                }

                if (!OrderMasterView.variables.dx_ddlPriority.option().value) {
                    DevExVariables.Toaster("warning", "Priority is required.");
                    return;
                }

                OrderMasterView.btnMasterSubmit();
            }
        }).dxButton("instance");

        OrderMasterView.variables.dx_btnCancel = $("#dx_btnCancel").dxButton({
            icon: "close",
            text: "Cancel",
            type: "danger",
            onClick: function (e) {
                OrderMasterView.clearControls();
                e.validationGroup.reset();
            }
        }).dxButton("instance");

        OrderMasterView.variables.dx_btnAddNew = $("#dx_btnAddNew").dxButton({
            stylingMode: "outlined",
            icon: "plus",
            text: "Add New",
            type: "default",
            onClick: function (e) {
                e.validationGroup.reset();
                OrderMasterView.InitializeDevExgrid()
                $("#frm_OrderMaster").show();
                $("#pnlView").hide();

                OrderMasterView.variables.dx_txtVoucherDate.focus();
            }
        }).dxButton("instance");
        /*--------------------------- Popup Initialize ------------------------------*/
        OrderMasterView.variables.dx_txtAcc_Name = $("#dx_txtAcc_Name").dxTextBox({
            placeholder: "Enter Acc Name...",
            ShowModelErrors: true,
        }).dxTextBox("instance");

        OrderMasterView.variables.dx_txtshortname = $("#dx_txtshortname").dxTextBox({
            placeholder: "Short Name...",
        }).dxTextBox("instance");

        OrderMasterView.variables.dx_txtHead = $("#dx_txtHead").dxAutocomplete({
            placeholder: "Type Account Head...",
            dataSource: new DevExpress.data.CustomStore({
                load: function (loadOptions) {
                    var deferred = $.Deferred();

                    var myfilter = { rules: [] };
                    myfilter.rules.push({ field: "SEARCH", op: "eq", data: loadOptions.searchValue });
                    myfilter.rules.push({ field: "TYPE", op: "eq", data: "AccHead" });

                    var result;
                    $.ajax({
                        url: getDomain() + OrderMasterView.variables.BindStaticDataUrl + "&myfilters=" + JSON.stringify(myfilter),
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

                    if (result != "Error") {
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
            onSelectionChanged: function (data) {

            },
            onFocusOut: function (data) {
                if (!data.component.option().selectedItem) {
                    OrderMasterView.variables.dx_txtHead.option("value", "");
                }
            }
        }).dxAutocomplete("instance");


        OrderMasterView.variables.dx_txtMobileNo = $("#dx_txtMobileNo").dxTextBox({
            placeholder: "Enter Mobile No...",
        }).dxTextBox("instance");


        OrderMasterView.variables.dx_ddlCountry = $("#dx_ddlCountry").dxSelectBox({
            placeholder: "Select Country...",
            searchEnabled: true,
            onValueChanged: function (data) {
                if (data.value)
                    OrderMasterView.GetStatesList(data.value);
            }
        }).dxSelectBox("instance");

        OrderMasterView.variables.dx_ddlState = $("#dx_ddlState").dxSelectBox({
            placeholder: "Select State...",
            searchEnabled: true,
            onValueChanged: function (data) {
                if (data.value)
                    OrderMasterView.GetCityList(data.value);
            }
        }).dxSelectBox("instance");

        OrderMasterView.variables.dx_ddlCity = $("#dx_ddlCity").dxSelectBox({
            placeholder: "Select City...",
            searchEnabled: true,
        }).dxSelectBox("instance");

        OrderMasterView.variables.dx_Party_btnSubmit = $("#dx_Party_btnSubmit").dxButton({
            icon: "check",
            text: "Submit",
            type: "success",
            onClick: function (e) {
                if (!OrderMasterView.variables.dx_txtAcc_Name.option().value) {
                    DevExVariables.Toaster("warning", "Acoount Name is required.");
                    return;
                }

                if (!OrderMasterView.variables.dx_txtshortname.option().value) {
                    DevExVariables.Toaster("warning", "Short Name is required.");
                    return;
                }



                if (!OrderMasterView.variables.dx_txtHead.option().value) {
                    DevExVariables.Toaster("warning", "Head Name is required.");
                    return;
                }

                if (!OrderMasterView.variables.dx_txtMobileNo.option().value) {
                    DevExVariables.Toaster("warning", "Mobile No is required.");
                    return;
                }
                if (!OrderMasterView.variables.dx_ddlCountry.option().value) {
                    DevExVariables.Toaster("warning", "Country is required.");
                    return;
                }
                if (!OrderMasterView.variables.dx_ddlState.option().value) {
                    DevExVariables.Toaster("warning", "State is required.");
                    return;
                }
                if (!OrderMasterView.variables.dx_ddlCity.option().value) {
                    DevExVariables.Toaster("warning", "City is required.");
                    return;
                }

                OrderMasterView.btnMasterSubmit_Party();


            }
        }).dxButton("instance");

        OrderMasterView.variables.dx_Party_btnCancel = $("#dx_Party_btnCancel").dxButton({
            icon: "close",
            text: "Cancel",
            type: "danger",
            onClick: function (e) {
                $("#Modal_PartyMaster").modal("hide");
                e.validationGroup.reset();
            }
        }).dxButton("instance");
        /*--------------------------- Popup Initialize ------------------------------*/

    },
};


$(document).ready(function () {
    OrderMasterView.FormInitialize();
   
    OrderMasterView.InitializeDevExgrid();
    $("#btnSaveModal").click(function () {
        var data = {
            "OI_ID": OrderMasterView.variables.Deleteid,
            "OPER_TYPE": "Itemes_Delete"
        }
        $.ajax({
            url: getDomain() + OrderMasterView.variables.PerformMasterOperationUrl,
            async: true,
            data: data,
            cache: false,
            type: 'POST',
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {

                    OperationMessage("", 'Record is Delete successfully', 'success');
                    OrderMasterView.InitializeDevExgrid();
                    $("#ActionModal_delete").modal("hide");
                }
                else {
                    DevExVariables.InvalidResponseCode(data);
                }
            },
            error: OnError
        });
    });
    $("#btnCancelModal").click(function () {
        $("#ActionModal_delete").modal("hide");
    });
});
