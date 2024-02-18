var jewellerySalesView = {
    variables: {
        Bind_jewellerysaleitem_list: "/Common/BindMastersDetails?ServiceName=ACC_JEWELLERY_SALE_ITEM_GET",
        BindProductMasterListUrl: "/Common/BindMastersDetails?ServiceName=PRODUCT_MASTER_GET",
        BindDetailListUrl: "/Common/BindMastersDetails?ServiceName=PRD_PRODUCT_DETAIL_GET",
        PerformMasterOperationUrl: "/Common/OpeartionsOnMaster?ServiceName=ACC_JEWELLERY_SALE_CRUD",
        BindMainGridListUrl: "/Common/BindMastersDetails?ServiceName=ACC_JEWELLERY_SALE_GET",
        BindPartyList: "/Common/BindMastersDetails?ServiceName=ACCOUNTMASTER_GET",
        BindOrderByList: "/Common/BindMastersDetails?ServiceName=USERDETAILS_GET",
        Bind_HsncodeUrl: "/Common/BindMastersDetails?ServiceName=HSNCODEMASTER_GET",
        BindStaticDataUrl: "/Common/BindMastersDetails?ServiceName=STATIC_MASTER_GET&IsActive=true",
        PerformMasterOperationUrl_Party: "/Common/OpeartionsOnMaster?ServiceName=ACCOUNTMASTER_CRUD",
        GlobalTotal: [],
        dx_txtRemarks: '',
        ddlHsnCode: '',
        txtTotal: '',
        txtDiscount: '',
        txtTaxableAmount: '',
        txtCGST: '',
        txtSGST: '',
        txtIGST: '',
        txtOtherTax: '',
        txtAmount: '',
        txtRoundOff: '',
        txtTotalAmount:'',
        //UNUSE 
        //BindAccListUrl: "/Common/BindMastersDetails?ServiceName=ACCOUNTMASTER_GET",

        ////BindDesignListUrl: "/Common/BindMastersDetails?ServiceName=PRD_DESIGN_MASTER_GET",


        //BindGroupListUrl: "/Common/BindMastersDetails?ServiceName=SALES_WHOLESELLER_DETAILS_GET",
        //// PerformMasterOperationUrl: "/Common/OpeartionsOnMaster?ServiceName=SALES_WHOLESELLER_DETAILS_CRUD",
        

        





        //Bindingacc_quotation_item_details_get_List: "/Common/BindMastersDetails?ServiceName=ACC_QUOTATION_ITEM_DETAILS_GET",


        ///*-----------------------------------Type stock----------------------------------------*/
        //BindProductmasterList: "/Common/BindMastersDetails?ServiceName=PRODUCT_MASTER_GET",
        //BindProductMasterDeatilsList: "/Common/BindMastersDetails?ServiceName=PRD_PRODUCT_DETAIL_GET",
        ///*-----------------------------------Type stock----------------------------------------*/

        Oper: 'Add',
        addedit: "added",
        Masterid: "",
        DeleteDataObj: "",
        RowCount: 1,


        /*------------------------variables for main form Controls-----------------------*/
        dx_popupRecordDelete: "",
        DeletePopUpOptions: {
            width: 300,
            height: 200,
            contentTemplate: function () {
                return $("<div />").append(
                    $("<p>Voucher No: <span>" + jewellerySalesView.variables.DeleteDataObj.vchno + "</span></p>"),

                    $("<div style='float:right;' />").attr("id", "dx_btnDeleteConfirm").dxButton({
                        text: "Yes, Delete It!",
                        icon: "trash",
                        type: "danger",
                        onClick: function (e) {
                            var data = {
                                "OPER_TYPE": "Iteam_NEW",
                                "JS_ID": jewellerySalesView.variables.Masterid,
                                "oper": jewellerySalesView.variables.Oper,
                            }

                            jewellerySalesView.savedata(data);
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
        dx_txtVoucherDate: "",
        dx_txtVoucherNo: "",
        dx_ddlVoucherType: "",
        dx_ddlQuoMaster: "",
        dx_txtDueDays: "",
        dx_txtDueDate: "",
        dx_txtAutoComplite_PartyList: "",
        dx_txtCode: "",
        dx_txtMob: "",
        dx_TxtOrderby: "",
        dx_txtSearch: "",

        dx_BtnAdd: "",
        dx_btnAddNew: "",


        dx_txtAcc_Name: "",
        dx_txtshortname: "",

        dx_txtHeadName: "",
        dx_txtMobileNo: "",
        dx_ddlCountry: "",
        dx_ddlState: "",
        dx_ddlCity: "",

        dx_Party_btnSubmit: "",
        dx_Party_btnCancel: "",

        dx_btnSubmit: "",
        dx_btnCancel: "",

        dx_txtsize: "",
        dx_dataGrid: "",
        dx_dataGrid_IteamList: "",
        dx_dataGrid_Job_Detail: [],
        dx_dataGrid_Stock: "",
        dx_dataGrid_Stock_Deatil: [],
        selSortingColumn: "DESIGNCODE",
        selSortingOrder: "desc",
        MULTISEARCH: [],
        MULTISEARCH_STOCK: [],
        DataSoucres_Jobwork: "",

        /*------------------------variables for main form Controls-----------------------*/
        VoucherTypeList: ["Retails Invoice", "Tax Invoice"],
        PriorityList: ["High", "Low", "Medium"],
        SizeList: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
        PartyList_accid: '',
        Searchid: '',
        Searchid_Stock: '',
        JSI_ID: '',
        JS_ID: '',
        Deleteid: '',
    },
    triggerId: function (id) {

        var rowData = jewellerySalesView.variables.dx_dataGrid.getVisibleRows()[jewellerySalesView.variables.dx_dataGrid.getRowIndexByKey(+id)].data;
        jewellerySalesView.variables.dx_ddlVoucherType.option({ value: rowData.type });
        jewellerySalesView.variables.Masterid = id;
        jewellerySalesView.variables.Oper = 'Edit';

        jewellerySalesView.variables.dx_txtVoucherDate.option({ value: rowData.vchdate });
        jewellerySalesView.variables.dx_txtDueDays.option({ value: rowData.dueday });
        jewellerySalesView.variables.dx_txtRemarks.option({ value: rowData.remark });
        
        jewellerySalesView.variables.dx_txtVoucherNo.option({ value: rowData.vchno });
        jewellerySalesView.variables.dx_ddlVoucherType.option({ value: rowData.vchtype });



        if (rowData.accid) {
            jewellerySalesView.variables.dx_txtAutoComplite_PartyList.option({
                items: [{ accid: rowData.accid, accountname: rowData.accountname }],
                selectedItem: { accid: rowData.accid, accountname: rowData.accountname },
                value: rowData.accountname
            });
        }
        jewellerySalesView.variables.dx_txtCode.option({ value: rowData.accid });
        if (rowData.mobile != '[object Object]')
            jewellerySalesView.variables.dx_txtMob.option({ value: rowData.mobile });
        
        if (rowData.salesmanid) {
            jewellerySalesView.variables.dx_TxtOrderby.option({
                items: [{ userid: rowData.salesmanid, employee_name: rowData.salesmanname }],
                selectedItem: { userid: rowData.salesmanid, employee_name: rowData.salesmanname },
                value: rowData.salesmanname
            });
        }
        $("#hdn_statName_Party").attr("Stateid", rowData.stateid);
        $("#hdn_statName_Party").attr("StateName", rowData.statename);

        if ($("#hdn_statName_Party").find('StateName').text() == "Gujarat" && $("#hdn_BranchWise_stateName").val() == "Gujarat") {
            $(".showCgst").show();
            $(".showIgst").hide();
        }
        else {
            $(".showCgst").hide();
            $(".showIgst").show();
        }
        jewellerySalesView.Bind_Hsncode();
        jewellerySalesView.variables.ddlHsnCode.option({ value: rowData.hsn });
        //jewellerySalesView.variables.ddlHsnCode.option("value", rowData.hsn);
        if (rowData.discounttype == "Rs") {
            $("#rd_Rs").prop("cheked", true);
        }
        else {
            $("#rd_Per").prop("cheked", true);
        }
        $("#txtAdjustAmount").val(rowData.dicountrate);
        jewellerySalesView.variables.JS_ID = id;
        jewellerySalesView.variables.Oper = "edit"
        jewellerySalesView.InitializeDevExgrid_IteamList();
        
      






        $("#frm_Quotation_Master").show();
        $("#pnlView").hide();
        // jewellerySalesView.calAdjustAmount();
        if (isU()) {
            jewellerySalesView.variables.dx_btnSubmit.option({ visible: true });
        }
        else {
            jewellerySalesView.variables.dx_btnSubmit.option({ visible: false });
        }

    },
    FormInitialize: function () {
        jewellerySalesView.variables.ddlHsnCode = $("#ddlHsnCode").dxSelectBox({
               placeholder:"Select Hsn Code.",
               searchEnabled: true,
               onValueChanged: function (data) {
                       if ($("#hdn_statName_Party").attr("StateName")) {
                           jewellerySalesView.CalculateFinalTotal();
                       }
                       else
                       {
                   //        DevExVariables.Toaster("warning", "Party Name is required.");
                           jewellerySalesView.variables.ddlHsnCode.option({ value: "" });
                           return;
                       }
                   // QuotationMasterView.GetSubCategoryList(data.value);
                   
               }
           }).dxSelectBox("instance");

        jewellerySalesView.variables.dx_dataGrid = $("#dx_dataGrid").dxDataGrid({
            dataSource: new DevExpress.data.CustomStore({
                key: "js_id",
                load: function (loadOptions) {
                    var deferred = $.Deferred();

                    var result = DevExVariables.GetDataList(loadOptions, jewellerySalesView.variables.BindMainGridListUrl);

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
            columns: [{ dataField: "js_id", allowFiltering: false, allowSorting: true, visible: false },
                { dataField: "vchno", caption: "Voucher No", dataType: "string", allowSorting: true, allowFiltering: true, allowHeaderFiltering: false },
                { dataField: "accountname", caption: "Account Name", dataType: "string", allowSorting: true, allowFiltering: true, allowHeaderFiltering: false },
                { dataField: "vchtype", caption: "Voucher Type", dataType: "string", allowSorting: false, allowFiltering: false, allowHeaderFiltering: false },
                { dataField: "totalgrosswgt", caption: "Total Gross Wgt", dataType: "int", allowSorting: false, allowFiltering: false, allowHeaderFiltering: false },
                { dataField: "totalnetwgt", caption: "Total Net Wgt", dataType: "int", allowSorting: false, allowFiltering: false, allowHeaderFiltering: false },
                { dataField: "totaldiawgt", caption: "Total Dia Wgt", dataType: "int", allowSorting: false, allowFiltering: false, allowHeaderFiltering: false },
                { dataField: "totaldiapcs", caption: "Total Dia Pcs", dataType: "int", allowSorting: false, allowFiltering: false, allowHeaderFiltering: false },
                { dataField: "totalitem", caption: "Total Item", dataType: "int", allowSorting: false, allowFiltering: false, allowHeaderFiltering: false },
                { dataField: "finalamount", caption: "Final Amount", dataType: "int", allowSorting: false, allowFiltering: false, allowHeaderFiltering: false },
                 {
                     dataField: "status", caption: "Status", dataType: "string", allowSorting: false, allowFiltering: false, allowHeaderFiltering: false,
                     cellTemplate: function (container, options) {
                         if (options.displayValue == "SAVED") {
                             var temp = '<span class="label label-success" style="font-size: 100%; !important">' + options.displayValue + '</span>'
                         }
                         else {
                             var temp = '<span class="label label-danger" style="font-size: 100%; !important">' + options.displayValue + '</span>'
                         }

                         '<div>' + options.data.designcode + '</div>';

                         $(temp).appendTo(container);
                     }
                 },
                {
                    dataField: "Action", caption: "Action", alignment: "center", allowFiltering: false, allowSorting: false,
                    cellTemplate: function (container, options) {
                        DevExVariables.ActionTemplate(container, options, true, true, false, "jewellerySalesView");
                    }
                },
            ]
        }).dxDataGrid("instance");
        var now = new Date();
        jewellerySalesView.variables.dx_txtVoucherDate = $("#dx_txtVoucherDate").dxDateBox({
            type: "date",
            value: now,
            showClearButton: true,
            useMaskBehavior: true,
            displayFormat: "dd/M/yyyy",
        }).dxDateBox("instance");
        jewellerySalesView.variables.dx_txtVoucherNo = $("#dx_txtVoucherNo").dxTextBox({
            readOnly: true,
        }).dxTextBox("instance");
        jewellerySalesView.variables.txtTotal = $("#txtTotal").dxTextBox({
            readOnly: true,
        }).dxTextBox("instance");
        jewellerySalesView.variables.txtDiscount = $("#txtDiscount").dxTextBox({
            readOnly: true,
        }).dxTextBox("instance");
        jewellerySalesView.variables.txtTaxableAmount = $("#txtTaxableAmount").dxTextBox({
            readOnly: true,
        }).dxTextBox("instance");
        jewellerySalesView.variables.txtCGST = $("#txtCGST").dxTextBox({
            readOnly: true,
        }).dxTextBox("instance");
        jewellerySalesView.variables.txtSGST = $("#txtSGST").dxTextBox({
            readOnly: true,
        }).dxTextBox("instance");
        jewellerySalesView.variables.txtIGST = $("#txtIGST").dxTextBox({
            readOnly: true,
        }).dxTextBox("instance");
        jewellerySalesView.variables.txtOtherTax = $("#txtOtherTax").dxTextBox({
            readOnly: true,
        }).dxTextBox("instance");
        jewellerySalesView.variables.txtAmount = $("#txtAmount").dxTextBox({
            readOnly: true,
        }).dxTextBox("instance");
        jewellerySalesView.variables.txtRoundOff = $("#txtRoundOff").dxTextBox({
            readOnly: true,
        }).dxTextBox("instance");
        jewellerySalesView.variables.txtTotalAmount = $("#txtTotalAmount").dxTextBox({
            readOnly: true,
        }).dxTextBox("instance");
        jewellerySalesView.variables.dx_ddlVoucherType = $("#dx_ddlVoucherType").dxSelectBox({
            dataSource: jewellerySalesView.variables.VoucherTypeList,
            value: jewellerySalesView.variables.VoucherTypeList[0],
            searchEnabled: true,
            onValueChanged: function (data) {
                //if (data.value == 'Party') {
                //    $("#dx_txtSearch").show();
                //    $("#panel_DesignList").show();
                //    $("#dx_txtSearch_Stock").hide();
                //    $("#panel_DesignList_Stock").hide();
                //}
                //else if (data.value == 'Stock') {

                //    $("#dx_txtSearch").hide();
                //    $("#panel_DesignList").hide();
                //    $("#dx_txtSearch_Stock").show();
                //    $("#panel_DesignList_Stock").show();
                //}
            }
        }).dxSelectBox("instance");
        jewellerySalesView.variables.dx_ddlQuoMaster = $("#dx_ddlQuoMaster").dxSelectBox({
            placeholder: "Select SubCategory...",
        }).dxValidator({
            validationRules: [{
                type: "required",
                message: "Sub Category is required"
            }]
        }).dxSelectBox("instance");
        jewellerySalesView.variables.dx_txtDueDate = $("#dx_txtDueDate").dxDateBox({
            type: "date",
            value: now,
            showClearButton: true,
            useMaskBehavior: true,
            displayFormat: "dd/M/yyyy",
        }).dxDateBox("instance");
        jewellerySalesView.variables.dx_txtAutoComplite_PartyList = $("#dx_txtAutoComplite_PartyList").dxAutocomplete({
            placeholder: "Selection List ...",
            mode: "search",
            dataSource: new DevExpress.data.CustomStore({
                load: function (loadOptions) {
                    var deferred = $.Deferred();
                    var myfilter = { rules: [] };
                    myfilter.rules.push({ field: "GROUPNAME", op: "CN", data: 'BUYER' });
                    $.ajax({
                        url: getDomain() + jewellerySalesView.variables.BindPartyList + "&_search=true&searchField=ACCOUNTNAME&searchOper=cn&searchString=" + loadOptions.searchValue + "&myfilters=" + JSON.stringify(myfilter),

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
                //jewellerySalesView.variables.PartyList_accid = data.accid;
                //jewellerySalesView.variables.dx_txtCode.option({ value: data.accid });
                return $("<div>" + data.accountname + "</div>");
            },
            onSelectionChanged: function (data) {
                if (data.selectedItem) {
                    jewellerySalesView.variables.PartyList_accid = data.selectedItem.accid;
                    jewellerySalesView.variables.dx_txtCode.option({ value: data.selectedItem.accid });
                    jewellerySalesView.variables.dx_txtMob.option({ value: data.selectedItem.mobile1 });
                    $("#hdn_statName_Party").attr("StateName", data.selectedItem.statename);
                    $("#hdn_statName_Party").attr("Stateid", data.selectedItem.stateid);
                    if (data.selectedItem.statename == "Gujarat" && $("#hdn_BranchWise_stateName").val() == "Gujarat") {
                        $(".showCgst").show();
                        $(".showIgst").hide();
                    }
                    else {
                        $(".showIgst").show();
                        $(".showCgst").hide();
                    }
                }
                else {
                    jewellerySalesView.variables.dx_txtCode.option("value", "");
                    jewellerySalesView.variables.dx_txtMob.option("value", "");
                }
            }
        }).dxAutocomplete("instance");
        jewellerySalesView.variables.dx_txtCode = $("#dx_txtCode").dxTextBox({
            readOnly: true,
            width: 70
        }).dxTextBox("instance");
        jewellerySalesView.variables.dx_txtMob = $("#dx_txtMob").dxTextBox({
            placeholder: "Mobile No",
            readOnly: true,
        }).dxTextBox("instance");
        jewellerySalesView.variables.dx_TxtOrderby = $("#dx_TxtOrderby").dxAutocomplete({
            placeholder: "Order BY ...",
            mode: "search",
            dataSource: new DevExpress.data.CustomStore({
                load: function (loadOptions) {
                    var deferred = $.Deferred();
                    var myfilter = { rules: [] };
                    myfilter.rules.push({ field: "UNAME", op: "CN", data: loadOptions.searchValue });
                    $.ajax({
                        //url: getDomain() + jewellerySalesView.variables.BindOrderByList + "&_search=true&searchField=EMPLOYEE_NAME&searchOper=cn&searchString=" + loadOptions.searchValue,
                        url: getDomain() + jewellerySalesView.variables.BindOrderByList + "&myfilters=" + JSON.stringify(myfilter),
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
                key: "userid",
            }),
            valueExpr: "employee_name",
            displayExpr: "employee_name",
            onFocusOut: function (data) {
                if (!data.component.option().selectedItem) {
                    jewellerySalesView.variables.dx_TxtOrderby.option("value", "");
                }
            },
        }).dxAutocomplete("instance");
        jewellerySalesView.variables.dx_txtSearch = $("#dx_txtSearch").dxAutocomplete({
            placeholder: "Search Design Code And Bag No...",
            mode: "search",
            dataSource: new DevExpress.data.CustomStore({
                load: function (loadOptions) {

                    if (!jewellerySalesView.variables.dx_txtAutoComplite_PartyList.option().selectedItem) {
                        DevExVariables.Toaster("warning", "Party Name is required.");
                        return;
                    }

                    if (!jewellerySalesView.variables.dx_TxtOrderby.option().selectedItem) {
                        DevExVariables.Toaster("warning", "Order By is required.");
                        return;
                    }

                    if (!jewellerySalesView.variables.dx_txtVoucherDate.option().value) {
                        DevExVariables.Toaster("warning", "Voucher Date is required.");
                        return;
                    }

                    if (!jewellerySalesView.variables.dx_txtDueDate.option().value) {
                        DevExVariables.Toaster("warning", "Due Date is required.");
                        return;
                    }

                    if (!jewellerySalesView.variables.dx_txtDueDays.option().value != '') {
                        DevExVariables.Toaster("warning", "Due Days is required.");
                        return;
                    }

                    var deferred = $.Deferred();
                    var url;
                    var myfilter = { rules: [] };

                    myfilter.rules.push({ field: "SEARCH", op: "eq", data: loadOptions.searchValue });
                    myfilter.rules.push({ field: "FLAG", op: "ne", data: 'SOLD' });
                    //if (jewellerySalesView.variables.MULTISEARCH) {
                    //    myfilter.rules.push({ field: "MULTISEARCH_NOTIN", op: "eq", data: jewellerySalesView.variables.MULTISEARCH.toString() });
                    //}


                    var result;
                    $.ajax({
                        url: getDomain() + jewellerySalesView.variables.BindProductMasterListUrl + "&myfilters=" + JSON.stringify(myfilter),
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
                key: "pm_id",
            }),
            valueExpr: "bagno",
            onSelectionChanged: function (data) {
                if (data.selectedItem) {
                    jewellerySalesView.variables.Searchid = data.selectedItem.pm_id;
                    jewellerySalesView.variables.MULTISEARCH.push(data.selectedItem.designcode);
                    $("#panel_DesignList").show();
                    $("#panel_DesignList_Stock").hide();
                    /*-------------------------------------------- Party Grid Set Data ---------------------------------------------------*/

                    var myfilter = { rules: [] };
                    if (jewellerySalesView.variables.dx_txtSearch.option().value) {
                        myfilter.rules.push({ field: "MULTISEARCH_IN", op: "eq", data: jewellerySalesView.variables.dx_txtSearch.option().value });
                    }
                    myfilter.rules.push({ field: "CURRENCYCODE", op: "eq", data: getCurrencyCode() });

                    var rows = 30, page = 1;
                    $.ajax({
                        url: getDomain() + jewellerySalesView.variables.BindProductMasterListUrl + "&page=" + page + "&rows=" + rows + "&myfilters=" + JSON.stringify(myfilter) + "&sidx=" + jewellerySalesView.variables.selSortingColumn + "&sord=" + jewellerySalesView.variables.selSortingOrder,
                        async: true,
                        cache: false,
                        type: 'POST',
                        success: function (data) {
                            if ($(data).find('RESPONSECODE').text() == "0") {

                                var JsonObject = xml2json.parser(data);
                                var List = [];
                                if (JsonObject.serviceresponse.detailslist) {
                                    if (JsonObject.serviceresponse.detailslist.details) {
                                        List = JsonObject.serviceresponse.detailslist.details;



                                        //var dataSource = jewellerySalesView.variables.dx_dataGrid_JobWork.getDataSource();
                                        //dataSource.store().insert(List).then(function () {
                                        //    dataSource.reload();
                                        //})

                                        jewellerySalesView.CRUD_SingalEntry(List);



                                        jewellerySalesView.variables.dx_txtSearch.option({ value: "" })

                                    }
                                    else
                                        List.push(JsonObject.serviceresponse.detailslist.details);
                                }
                            }
                            else {
                                DevExVariables.InvalidResponseCode(data);
                                deferred.reject("Data Loading Error");
                            }
                        },
                        error: OnError
                    });


                    /*-------------------------------------------- Party Grid Set Data ---------------------------------------------------*/
                }
                else {
                    jewellerySalesView.variables.dx_txtSearch.option("value", "");
                    jewellerySalesView.variables.Searchid = '';
                }
            },
            onFocusOut: function (data) {
                if (!data.component.option().selectedItem) {
                    jewellerySalesView.variables.dx_txtSearch.option("value", "");
                }
            },
            itemTemplate: function (data) {
                return $("<div class='custom-item'>" +
                        "<img  src='" + getDesignImgVirtualPath() + "/" + data.desgcate + "/" + data.desgsubcate + "/thumb/" + data.imgpath + "' />" +
                        "<div pm_id=" + data.pm_id + " class='product-name'>" + data.bagno + "</div></div>");
            },
        }).dxAutocomplete("instance");
        jewellerySalesView.variables.dx_txtDueDays = $("#dx_txtDueDays").dxTextBox({
            mode: "number",
            value: 0,
            onValueChanged: function (data) {
                if (data.value)
                    jewellerySalesView.DueDate(data.value);
            }
        }).dxTextBox("instance");
        jewellerySalesView.variables.dx_txtRemarks = $("#dx_txtRemarks").dxTextArea({
            height: 110,
            placeholder:"Enter Remark"

        }).dxTextArea("instance");

        jewellerySalesView.variables.dx_txtAcc_Name = $("#dx_txtAcc_Name").dxTextBox({
            placeholder: "Enter Acc Name...",
            ShowModelErrors: true,
        }).dxTextBox("instance");

        jewellerySalesView.variables.dx_txtshortname = $("#dx_txtshortname").dxTextBox({
            placeholder: "Short Name...",
        }).dxTextBox("instance");

        jewellerySalesView.variables.dx_txtHead = $("#dx_txtHead").dxAutocomplete({
            placeholder: "Type Account Head...",
            dataSource: new DevExpress.data.CustomStore({
                load: function (loadOptions) {
                    var deferred = $.Deferred();

                    var myfilter = { rules: [] };
                    myfilter.rules.push({ field: "SEARCH", op: "eq", data: loadOptions.searchValue });
                    myfilter.rules.push({ field: "TYPE", op: "eq", data: "AccHead" });

                    var result;
                    $.ajax({
                        url: getDomain() + jewellerySalesView.variables.BindStaticDataUrl + "&myfilters=" + JSON.stringify(myfilter),
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
                    jewellerySalesView.variables.dx_txtHead.option("value", "");
                }
            }
        }).dxAutocomplete("instance");


        jewellerySalesView.variables.dx_txtMobileNo = $("#dx_txtMobileNo").dxTextBox({
            placeholder: "Enter Mobile No...",
        }).dxTextBox("instance");

        jewellerySalesView.variables.dx_ddlCountry = $("#dx_ddlCountry").dxSelectBox({
            placeholder: "Select Country...",
            searchEnabled: true,
            onValueChanged: function (data) {
                if (data.value)
                    jewellerySalesView.GetStatesList(data.value);
            }
        }).dxSelectBox("instance");

        jewellerySalesView.variables.dx_ddlState = $("#dx_ddlState").dxSelectBox({
            placeholder: "Select State...",
            searchEnabled: true,
            onValueChanged: function (data) {
                if (data.value)
                    jewellerySalesView.GetCityList(data.value);
            }
        }).dxSelectBox("instance");

        jewellerySalesView.variables.dx_ddlCity = $("#dx_ddlCity").dxSelectBox({
            placeholder: "Select City...",
            searchEnabled: true,
        }).dxSelectBox("instance");

        jewellerySalesView.variables.dx_BtnAdd = $("#dx_BtnAdd").dxButton({
            stylingMode: "outlined",
            type: "Primary",
            icon: "plus",
            onClick: function (e) {


                //jewellerySalesView.variables.dx_txtSearch_Stock.option({ value: "" });
                //jewellerySalesView.variables.dx_txtshortname.option({ value: "" });

                // jewellerySalesView.variables.dx_txtHead.option({ value: "" });
                //jewellerySalesView.variables.dx_txtMobileNo.option({ value: "" });
                //jewellerySalesView.variables.dx_ddlCountry.option({ value: "" });
                //jewellerySalesView.variables.dx_ddlState.option({ value: "" });
                //jewellerySalesView.variables.dx_ddlCity.option({ value: "" });


                $("#Modal_PartyMaster").modal("show");
            }
        }).dxButton("instance");

        jewellerySalesView.variables.dx_Party_btnSubmit = $("#dx_Party_btnSubmit").dxButton({
            icon: "check",
            text: "Submit",
            type: "success",
            onClick: function (e) {
                if (!jewellerySalesView.variables.dx_txtAcc_Name.option().value) {
                    DevExVariables.Toaster("warning", "Acoount Name is required.");
                    return;
                }

                if (!jewellerySalesView.variables.dx_txtshortname.option().value) {
                    DevExVariables.Toaster("warning", "Short Name is required.");
                    return;
                }

                if (!jewellerySalesView.variables.dx_txtHead.option().value) {
                    DevExVariables.Toaster("warning", "Head Name is required.");
                    return;
                }

                if (!jewellerySalesView.variables.dx_txtMobileNo.option().value) {
                    DevExVariables.Toaster("warning", "Mobile No is required.");
                    return;
                }
                if (!jewellerySalesView.variables.dx_ddlCountry.option().value) {
                    DevExVariables.Toaster("warning", "Country is required.");
                    return;
                }
                if (!jewellerySalesView.variables.dx_ddlState.option().value) {
                    DevExVariables.Toaster("warning", "State is required.");
                    return;
                }
                if (!jewellerySalesView.variables.dx_ddlCity.option().value) {
                    DevExVariables.Toaster("warning", "City is required.");
                    return;
                }

                jewellerySalesView.btnMasterSubmit_Party();


            }
        }).dxButton("instance");

        jewellerySalesView.variables.dx_Party_btnCancel = $("#dx_Party_btnCancel").dxButton({
            icon: "close",
            text: "Cancel",
            type: "danger",
            onClick: function (e) {
                $("#Modal_PartyMaster").modal("hide");
                //e.validationGroup.reset();
                jewellerySalesView.clearControlPopup();
            }
        }).dxButton("instance");

        jewellerySalesView.variables.dx_btnSubmit = $("#dx_btnSubmit").dxButton({
            icon: "check",
            text: "Submit",
            type: "success",
            //useSubmitBehavior: true,
            onClick: function (e) {
                var data = jewellerySalesView.variables.dx_dataGrid_IteamList.getVisibleRows()
                if (data.length == 0) {
                    //notificationMessage('Warning', 'Please select at list one Desgin', 'warning');
                    OperationMessage("", 'Please select at list one Desgin', 'warning');
                    return
                }

                if (!jewellerySalesView.variables.dx_txtAutoComplite_PartyList.option().selectedItem) {
                    DevExVariables.Toaster("warning", "Party Name is required.");
                    return;
                }

                if (!jewellerySalesView.variables.dx_TxtOrderby.option().selectedItem) {
                    DevExVariables.Toaster("warning", "Order By is required.");
                    return;
                }

                if (!jewellerySalesView.variables.dx_txtVoucherDate.option().value) {
                    DevExVariables.Toaster("warning", "Voucher Date is required.");
                    return;
                }

                if (!jewellerySalesView.variables.dx_txtDueDate.option().value) {
                    DevExVariables.Toaster("warning", "Due Date is required.");
                    return;
                }

                if (!jewellerySalesView.variables.dx_txtDueDays.option().value != '') {
                    DevExVariables.Toaster("warning", "Due Days is required.");
                    return;
                }

                if (!jewellerySalesView.variables.ddlHsnCode.option().value != '') {
                    DevExVariables.Toaster("warning", "Hsn Code is required.");
                    return;
                }


                var VoucherDate = jewellerySalesView.variables.dx_txtVoucherDate.option().text.split("/");
                VoucherDate = VoucherDate[2] + '-' + VoucherDate[1] + '-' + VoucherDate[0];

                var DueDays = jewellerySalesView.variables.dx_txtDueDate.option().text.split("/");
                DueDays = DueDays[2] + '-' + DueDays[1] + '-' + DueDays[0];

                var DiscountType = ''
                if ($("#rd_Rs").prop("checked")) {
                    DiscountType = 'Rs';
                }
                else {
                    DiscountType = 'Per';
                }
                if (jewellerySalesView.variables.Masterid) {
                    jewellerySalesView.variables.Oper = 'Edit';
                }
                else {
                    jewellerySalesView.variables.Oper = 'Add';
                }

                var data = {
                    "VOUCHERDATE": VoucherDate,
                    "OPER_TYPE": "ITEAM_SUBMIT",
                    "VCHTYPE": jewellerySalesView.variables.dx_ddlVoucherType.option().value,
                    "DUEDAY": jewellerySalesView.variables.dx_txtDueDays.option().value,
                    "DUEDATE": DueDays,
                    "STATUS": "SAVED",
                    "ACCID": jewellerySalesView.variables.dx_txtAutoComplite_PartyList.option().selectedItem.accid,
                    "SALESMANID": jewellerySalesView.variables.dx_TxtOrderby.option().selectedItem.userid,
                    "JS_ID": jewellerySalesView.variables.Masterid,
                    "oper": jewellerySalesView.variables.Oper,

                    "HSN": jewellerySalesView.variables.ddlHsnCode.option().value,
                    "TOTALGROSSAMT": jewellerySalesView.variables.txtTotal.option().value,
                    "DISCOUNT": jewellerySalesView.variables.txtDiscount.option().value,
                    "DISCOUNT": jewellerySalesView.variables.txtDiscount.option().value,
                    "TOTALTAXABLEAMT": jewellerySalesView.variables.txtTaxableAmount.option().value,
                    "CGSTPER": $("#cgstper").attr('cgst_per'),
                    "CGSTAMT": jewellerySalesView.variables.txtCGST.option().value,
                    "SGSTPER": $("#sgstper").attr('sgst_per'),
                    "SGSTAMT": jewellerySalesView.variables.txtSGST.option().value,
                    "IGSTPER": $("#igstper").attr('igst_per'),
                    "IGSTAMT": jewellerySalesView.variables.txtIGST.option().value,
                    "OTHERTAXPER": $("#etax").attr('etax'),
                    "OTHERTAXAMT": jewellerySalesView.variables.txtOtherTax.option().value,
                    "AMOUNTWITHTAX": jewellerySalesView.variables.txtAmount.option().value,
                    "ROUNDOFF": jewellerySalesView.variables.txtRoundOff.option().value,
                    "FINALAMOUNT": jewellerySalesView.variables.txtTotalAmount.option().value,
                    "DISCOUNTTYPE": DiscountType,

                }
                if ($("#txtAdjustAmount").val())
                {
                    data.DICOUNTRATE = $("#txtAdjustAmount").val()
                }
                if(jewellerySalesView.variables.dx_txtRemarks.option().value)
                {
                    data.REMARK = jewellerySalesView.variables.dx_txtRemarks.option().value;
                }

                $.ajax({
                    url: getDomain() + jewellerySalesView.variables.PerformMasterOperationUrl,
                    data: data,
                    async: true,
                    cache: false,
                    type: 'POST',
                    success: function (data) {
                        if ($(data).find('RESPONSECODE').text() == "0") {
                            jewellerySalesView.clearControls();
                            DevExVariables.Toaster("success", 'Record is Save successfully');
                            jewellerySalesView.variables.dx_dataGrid.refresh();
                        }
                    },
                    error: OnError,
                });




                jewellerySalesView.clearControls();
            }
        }).dxButton("instance");
        jewellerySalesView.variables.dx_btnUpdate = $("#dx_btnUpdate").dxButton({
            icon: "refresh",
            text: "Update",
            type: "success",
            //useSubmitBehavior: true,
            onClick: function (e) {
                jewellerySalesView.GridUpdate();

            }
        }).dxButton("instance");

        jewellerySalesView.variables.dx_btnCancel = $("#dx_btnCancel").dxButton({
            icon: "close",
            text: "Cancel",
            type: "danger",
            onClick: function (e) {
                jewellerySalesView.clearControls();
                e.validationGroup.reset();
            }
        }).dxButton("instance");
        jewellerySalesView.variables.dx_btnAddNew = $("#dx_btnAddNew").dxButton({
            stylingMode: "outlined",
            icon: "plus",
            text: "Add New",
            type: "default",
            onClick: function (e) {
                e.validationGroup.reset();

                $("#frm_Quotation_Master").show();
                $("#pnlView").hide();
                jewellerySalesView.InitializeDevExgrid_IteamList();
                jewellerySalesView.variables.Oper = "Add";

                jewellerySalesView.variables.dx_TxtOrderby.option({
                    items: [{ userid: $("#lblloginid").attr("userid"), employee_name: $("#lblloginid").html() }],
                    selectedItem: { userid: $("#lblloginid").attr("userid"), employee_name: $("#lblloginid").html() },
                    value: $("#lblloginid").html()
                });

                //jewellerySalesView.variables.dx_txtBranchName.focus();
            }
        }).dxButton("instance");
    },
    Bind_Hsncode: function () {
        
        var myfilter = { rules: [] };
        myfilter.rules.push({ field: "ISACTIVE", op: "eq", data: 1 });
        $.ajax({
            url: getDomain() + jewellerySalesView.variables.Bind_HsncodeUrl + "&myfilters=" + JSON.stringify(myfilter),
            async: true,
            cache: false,
            type: 'POST',
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    var JsonObject = xml2json.parser(data);
                    if (JsonObject.serviceresponse.detailslist) {
                        var List = []
                        if (JsonObject.serviceresponse.detailslist.details.length) {
                            List = JsonObject.serviceresponse.detailslist.details;
                        }
                        else
                        {
                            List.push(JsonObject.serviceresponse.detailslist.details)
                        }
                        jewellerySalesView.variables.ddlHsnCode.option({
                            dataSource: new DevExpress.data.ArrayStore({
                                data: List,
                                key: "hsncodeid"
                            }),
                            displayExpr: "hsncode",
                            valueExpr: "hsncodeid",
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
    CalculateFinalTotal: function () {
        if (jewellerySalesView.variables.GlobalTotal.total_price) {
            var myfilter = { rules: [] };
            myfilter.rules.push({ field: "HSNCODEID", op: "eq", data: jewellerySalesView.variables.ddlHsnCode.option().value });
            $.ajax({
                url: getDomain() + jewellerySalesView.variables.Bind_HsncodeUrl + "&myfilters=" + JSON.stringify(myfilter),
                async: false,
                cache: false,
                type: 'POST',
                success: function (data) {
                    if ($(data).find('RESPONSECODE').text() == "0") {
                        var JsonObject = xml2json.parser(data);
                        if (JsonObject.serviceresponse.detailslist.details.length) {

                            $("#cgstper").html("( 0 %)");
                            $("#cgstper").attr("cgst_per", 0);
                            $("#sgstper").html("( 0 %)");
                            $("#sgstper").attr("sgst_per", 0);
                            $("#igstper").html("( 0 %)");
                            $("#igstper").attr("igst_per", 0);
                            $("#etax").html("( 0 %)");
                            $("#etax").attr("etax", 0);
                        }
                        else {
                            $("#cgstper").html("( " + JsonObject.serviceresponse.detailslist.details.cgst + " %)");
                            $("#cgstper").attr("cgst_per", JsonObject.serviceresponse.detailslist.details.cgst);
                            $("#sgstper").html("( " + JsonObject.serviceresponse.detailslist.details.sgst + " %)");
                            $("#sgstper").attr("sgst_per", JsonObject.serviceresponse.detailslist.details.sgst);
                            $("#igstper").html("( " + JsonObject.serviceresponse.detailslist.details.igst + " %)");
                            $("#igstper").attr("igst_per", JsonObject.serviceresponse.detailslist.details.igst);
                            $("#etax").html("( " + JsonObject.serviceresponse.detailslist.details.etax + " %)");
                            $("#etax").attr("etax", JsonObject.serviceresponse.detailslist.details.etax);

                        }
                    }
                    else {
                        DevExVariables.InvalidResponseCode(data);
                    }
                },
                error: OnError
            });
            jewellerySalesView.variables.txtTotal.option({ value: jewellerySalesView.variables.GlobalTotal.total_price })
            var discount = jewellerySalesView.variables.txtDiscount.option().value || 0;
            jewellerySalesView.variables.txtTaxableAmount.option({ value: +jewellerySalesView.variables.GlobalTotal.total_price - +discount });
            var taxableamount = parseFloat(jewellerySalesView.variables.txtTaxableAmount.option().value).toFixed(2);

            if ($("#cgstper").attr("cgst_per")) {
                jewellerySalesView.variables.txtCGST.option({ value: parseFloat(+taxableamount * +$("#cgstper").attr("cgst_per") / 100).toFixed(2) });
            }
            else {
                jewellerySalesView.variables.txtCGST.option({ value: 0 })
            }
            if ($("#sgstper").attr("sgst_per")) {
                jewellerySalesView.variables.txtSGST.option({ value: parseFloat(+taxableamount * +$("#sgstper").attr("sgst_per") / 100).toFixed(2) });
            }
            else {
                jewellerySalesView.variables.txtSGST.option({ value: 0 })
            }
            if ($("#igstper").attr("igst_per")) {
                jewellerySalesView.variables.txtIGST.option({ value: parseFloat(+taxableamount * +$("#igstper").attr("igst_per") / 100).toFixed(2) });
            }
            else {
                jewellerySalesView.variables.txtIGST.option({ value: 0 })
            }
            if ($("#etax").attr("etax")) {
                jewellerySalesView.variables.txtOtherTax.option({ value: parseFloat(+taxableamount * +$("#etax").attr("etax") / 100).toFixed(2) });
            }
            else {
                jewellerySalesView.variables.txtOtherTax.option({ value: 0 })
            }
            var Amount = ''
            if ($("#hdn_statName_Party").attr("StateName") == "Gujarat" && $("#hdn_BranchWise_stateName").val() == "Gujarat") {
                Amount = +taxableamount + +jewellerySalesView.variables.txtCGST.option().value + +jewellerySalesView.variables.txtSGST.option().value + +jewellerySalesView.variables.txtOtherTax.option().value
            }
            else {
                Amount = +taxableamount + +jewellerySalesView.variables.txtIGST.option().value + +jewellerySalesView.variables.txtOtherTax.option().value
            }
            jewellerySalesView.variables.txtAmount.option({ value: parseFloat(Amount).toFixed(2) })
            var FinalTotal = parseFloat(Math.round(parseFloat(Amount))).toFixed(2);
            var RoundOff = parseFloat(parseFloat(FinalTotal) - parseFloat(Amount)).toFixed(2);
            jewellerySalesView.variables.txtRoundOff.option({ value: +RoundOff })
            jewellerySalesView.variables.txtTotalAmount.option({ value: +FinalTotal })
            if (FinalTotal)
                $("#NumberShow").html(convertNumberToWords(FinalTotal));
            else
                $("#NumberShow").html("");
        }
        else
        {
            //jewellerySalesView.variables.ddlHsnCode.option({ value: "" });
            //jewellerySalesView.variables.txtTotal.option({ value: "" });
            //jewellerySalesView.variables.txtDiscount.option({ value: "" });
            //jewellerySalesView.variables.txtTaxableAmount.option({ value: "" });
            //jewellerySalesView.variables.txtCGST.option({ value: "" });
            //jewellerySalesView.variables.txtSGST.option({ value: "" });
            //jewellerySalesView.variables.txtIGST.option({ value: "" });
            //jewellerySalesView.variables.txtOtherTax.option({ value: "" });
            //jewellerySalesView.variables.txtAmount.option({ value: "" });
            //jewellerySalesView.variables.txtRoundOff.option({ value: "" });
            //$("#txtAdjustAmount").val("");
            //jewellerySalesView.variables.txtTotalAmount.option({ value: "" });
            //$("#NumberShow").html("");
            //$("#rd_Rs").prop("checked", true);
            //$("#cgstper").attr("cgst_per", "");
            //$("#sgstper").attr("sgst_per", "");
            //$("#igstper").attr("igst_per", "");
            //$("#etax").attr("etax", "");
        }
    },
    calAdjustAmount: function () {
        if (parseFloat($("#txtAdjustAmount").val()) != 0 && $("#txtAdjustAmount").val()) {
            jewellerySalesView.variables.txtDiscount.option({ value: 0 })
            jewellerySalesView.variables.txtTotalAmount.option({ value: parseFloat(+jewellerySalesView.variables.txtTotal.option().value).toFixed(2) })
            jewellerySalesView.CalculateFinalTotal();


            var finaldisc, finalAmount, totalTax, taxableAmt, divfact;
            if ($("#rd_Rs").prop("checked")) {
                finaldisc = parseFloat($("#txtAdjustAmount").val());
            }
            else {
                finaldisc = parseFloat($("#txtAdjustAmount").val()) * parseFloat(jewellerySalesView.variables.txtTotalAmount.option().value) / 100;
            }
            //finaldisc = parseFloat($("#txtAdjustAmount").val()) || 0;
            finalAmount = parseFloat(jewellerySalesView.variables.txtTotalAmount.option().value) - finaldisc;
            totalTax = (+$('#cgstper').attr('cgst_per') || 0) + (+$('#sgstper').attr('sgst_per') || 0) + (+$('#etax').attr('etax') || 0);
            divfact = (100 + parseFloat(totalTax)) / 100;
            taxableAmt = finalAmount / divfact;
            jewellerySalesView.variables.txtTaxableAmount.option({ value: parseFloat(taxableAmt).toFixed(2) });
            jewellerySalesView.variables.txtDiscount.option({ value: parseFloat(parseFloat(jewellerySalesView.variables.txtTotal.option().value) - parseFloat(taxableAmt)).toFixed(2) });

            jewellerySalesView.CalculateFinalTotal();
        }
        else {
            jewellerySalesView.variables.txtDiscount.option({ value: 0 });
            jewellerySalesView.variables.txtTaxableAmount.option({ value: parseFloat(+jewellerySalesView.variables.txtTotal.option().value).toFixed(2) });
            jewellerySalesView.CalculateFinalTotal();
        }
    },
    /*--------------------------------------- Party Code -------------------------------------------------------*/
    InitializeDevExgrid_IteamList: function () {
        jewellerySalesView.variables.dx_dataGrid_IteamList = $("#dx_dataGrid_IteamList").dxDataGrid({
            dataSource: new DevExpress.data.CustomStore({
                key: "js_id",
                load: function (loadOptions) {
                    var deferred = $.Deferred();


                    var myfilter = { rules: [] };
                    myfilter.rules.push({ field: "TYPE", op: "eq", data: "ITEM_DETAILS" });
                    myfilter.rules.push({ field: "JS_ID", op: "eq", data: jewellerySalesView.variables.JS_ID });

                    $.ajax({
                        //url: getDomain() + jewellerySalesView.variables.Bindingacc_quotation_item_details_get_List + "&page=" + page + "&rows=" + rows + "&myfilters=" + JSON.stringify(myfilter) + "&sidx=" + jewellerySalesView.variables.selSortingColumn + "&sord=" + jewellerySalesView.variables.selSortingOrder,
                        url: getDomain() + jewellerySalesView.variables.Bind_jewellerysaleitem_list + "&myfilters=" + JSON.stringify(myfilter),
                        async: false,
                        cache: false,
                        type: 'POST',
                        success: function (data) {
                            if ($(data).find('RESPONSECODE').text() == "0") {
                                var JsonObject = xml2json.parser(data);

                                if (JsonObject.serviceresponse.detailslist_total) {
                                    jewellerySalesView.variables.GlobalTotal = JsonObject.serviceresponse.detailslist_total.details_total;
                                   
                                    jewellerySalesView.CalculateFinalTotal();

                                }
                                if (jewellerySalesView.variables.GlobalTotal.txtTotalAmount) {

                                }
                                else
                                {
                                    jewellerySalesView.variables.ddlHsnCode.option({ value: "" });
                                    jewellerySalesView.variables.txtTotal.option({ value: "" });
                                    jewellerySalesView.variables.txtDiscount.option({ value: "" });
                                    jewellerySalesView.variables.txtTaxableAmount.option({ value: "" });
                                    jewellerySalesView.variables.txtCGST.option({ value: "" });
                                    jewellerySalesView.variables.txtSGST.option({ value: "" });
                                    jewellerySalesView.variables.txtIGST.option({ value: "" });
                                    jewellerySalesView.variables.txtOtherTax.option({ value: "" });
                                    jewellerySalesView.variables.txtAmount.option({ value: "" });
                                    jewellerySalesView.variables.txtRoundOff.option({ value: "" });
                                    $("#txtAdjustAmount").val("");
                                    jewellerySalesView.variables.txtTotalAmount.option({ value: "" });
                                    $("#NumberShow").html("");
                                    $("#rd_Rs").prop("checked", true);
                                    $("#cgstper").attr("cgst_per", "");
                                    $("#sgstper").attr("sgst_per", "");
                                    $("#igstper").attr("igst_per", "");
                                    $("#etax").attr("etax", "");
                                }
                                var List = [];
                                if (JsonObject.serviceresponse.detailslist) {
                                    if (JsonObject.serviceresponse.detailslist.details.length)
                                        List = JsonObject.serviceresponse.detailslist.details;
                                    else
                                        List.push(JsonObject.serviceresponse.detailslist.details);
                                }
                                deferred.resolve(List, {
                                    totalCount: JsonObject.serviceresponse.totalrecords
                                });
                                jewellerySalesView.calAdjustAmount();
                            }
                        }
                    });


                    return deferred.promise();
                }
            }),
            loadPanel: {
                enabled: true,
                indicatorSrc: "../Content/images/trinityloaderwhite.gif",
            },
            selection: {
                mode: "single"
            },
            //editing: {
            //    mode: "cell",
            //    refreshMode: "reshape",
            //    allowUpdating: false,
            //    allowDeleting: false,
            //    allowAdding: false,
            //    useIcons: true
            //},
            showBorders: true,
            showColumnLines: true,
            showRowLines: true,
            remoteOperations: true,
            scrolling: {
                mode: 'infinite'
            },
            paging: {
                pageSize: 30
            },
            pager: {
                showPageSizeSelector: false,
                allowedPageSizes: [30, 50, 100]
            },
            columns: [{ dataField: "js_id", dataType: "number", allowFiltering: false, visible: false },
                 { dataField: 'rownum', caption: 'Sr No', width: 50, dataType: "int", allowFiltering: false },
                 {
                     dataField: "imgpath", caption: "Design", dataType: "string", alignment: "center", allowSorting: false,
                     cellTemplate: function (container, options) {
                         var temp = '<a data-fancybox="gallery" href="' + getDesignImgVirtualPath() + '/' + options.data.desgcate + '/' + options.data.desgsubcate + '/' + options.data.imgpath + '" data-fancybox="gallery">' +
                                         '<img class="imagepath" imagepath=' + options.data.imgpath + ' height="50" width="50" src="' + getDesignImgVirtualPath() + '/' + options.data.desgcate + '/' + options.data.desgsubcate + '/thumb/' + options.data.imgpath + '" />' +
                                     '</a>' +
                         '<div>' + options.data.designcode + '</div>';

                         $(temp).appendTo(container);
                     }

                 },
                 {
                     dataField: "bagno", caption: "Bag No", dataType: "string", alignment: "center", allowSorting: false,
                 },
                {
                    dataField: "desgcate", caption: "Category", dataType: "string", filterOperations: ["contains"], allowHeaderFiltering: false, allowSorting: false,
                    cellTemplate: function (container, options) {
                        var temp = '<div class="desgcateid" desgcateid=' + options.data.desgcateid + '>' + options.displayValue + '</div><hr style="margin:0;" /><div class="desgsubcateid" desgsubcateid=' + options.data.desgsubcateid + '>' + options.data.desgsubcate + '</div>';
                        $(temp).appendTo(container);
                    },

                },
                { dataField: "goodssize", caption: "size", dataType: "string", alignment: "center", allowSorting: false },
                {
                    dataField: "m_purity", caption: "M Purity", dataType: "string", alignment: "center", allowSorting: false,
                },
                {
                    dataField: "m_color", caption: "M Color", dataType: "string", alignment: "center", allowSorting: false,
                },
                {
                    dataField: "d_purity", caption: "D Purity", dataType: "string", alignment: "center", allowSorting: false,
                },
                {
                    dataField: "d_color", caption: "D Color", dataType: "string", alignment: "center", allowSorting: false,
                },
                {
                    dataField: "grossweight", caption: "Gross Wgt", dataType: "string", alignment: "right", allowSorting: false,
                    cellTemplate: function (container, options) {
                        var temp = '<div class="grossweight">' + options.displayValue + '</div>'
                        $(temp).appendTo(container);
                    }
                },
                {
                    dataField: "netweight", caption: "Net Wgt", dataType: "string", alignment: "right", allowSorting: false,
                    cellTemplate: function (container, options) {
                        var temp = '<div class="netweight">' + options.displayValue + '</div>'
                        $(temp).appendTo(container);
                    }
                },
               {
                   dataField: "diawgt", width: 100, caption: "Dia Pcs | Cts", dataType: "string", alignment: "right", allowSorting: false,
                   cellTemplate: function (container, options) {
                       var temp = '<div class="diacts">' + options.data.diapsc + ' pcs | ' + options.displayValue + ' cts</div>'
                       $(temp).appendTo(container);
                   }
               },
                {
                    dataField: "totalamount", caption: "Amount", dataType: "string", alignment: "right", allowSorting: false,
                    cellTemplate: function (container, options) {
                        var convertint = parseFloat(options.displayValue).toLocaleString(getDisLanguage(), {
                            style: 'currency', currency: getCurrencyCode(),
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                        });
                        var temp = '<div class="Amount" Amount=' + options.displayValue + '>' + convertint + '</div>';
                        $(temp).appendTo(container);
                    }
                },
                 {
                     dataField: "Action", caption: "Action", alignment: "center", allowFiltering: false, allowSorting: false,
                     cellTemplate: function (container, options) {
                         DevExVariables.ActionSubTemplate(container, options.data.jsi_id, false, true, false, "jewellerySalesView");
                     }
                 },
            ],
            summary: {
                totalItems: [
                         {
                             column: "rownum",
                             summaryType: "sum",
                             customizeText: function (data) {
                                 return "Total";
                             }
                         }
                        , {
                            column: "grossweight",
                            summaryType: "sum",
                            customizeText: function (data) {
                                return jewellerySalesView.variables.GlobalTotal.total_grossweight != '' ? jewellerySalesView.variables.GlobalTotal.total_grossweight : 0;
                            }
                        }
                         , {
                             column: "netweight",
                             summaryType: "sum",
                             customizeText: function (data) {
                                 return jewellerySalesView.variables.GlobalTotal.total_netweight != '' ? jewellerySalesView.variables.GlobalTotal.total_netweight : 0;
                             }
                         }
                         , {
                             column: "diawgt",
                             summaryType: "sum",
                             customizeText: function (data) {
                                 var tempdiacts = ''
                                 if (jewellerySalesView.variables.GlobalTotal.total_diacts) {
                                     tempdiacts = ((jewellerySalesView.variables.GlobalTotal.total_diacts != '' ? jewellerySalesView.variables.GlobalTotal.total_diapcs : 0) + "|" + (jewellerySalesView.variables.GlobalTotal.total_diacts != '' ? jewellerySalesView.variables.GlobalTotal.total_diacts : 0));
                                 }
                                 else {
                                     tempdiacts = '';
                                 }
                                 return tempdiacts;
                             }
                         }
                          , {
                              column: "totalamount",
                              summaryType: "sum",
                              customizeText: function (data) {
                                  var tempprice = '';
                                  if (jewellerySalesView.variables.GlobalTotal.total_price) {
                                      tempprice = "₹" + jewellerySalesView.variables.GlobalTotal.total_price;
                                  }
                                  else
                                  {
                                      tempprice = '';
                                  }

                                  return tempprice;
                              }
                          }
                ]
            },
        }).dxDataGrid("instance");

        //  jewellerySalesView.GetGridDetails();
    },
    GetJewSize: function (options) {
        var myfilter = { rules: [] };
        myfilter.rules.push({ field: "DESGCATID", op: "eq", data: options.data.desgcateid });
        myfilter.rules.push({ field: "TYPE", op: "eq", data: "JewellerySize" });
        $.ajax({
            url: getDomain() + jewellerySalesView.variables.BindStaticDataUrl + "&myfilters=" + JSON.stringify(myfilter),
            async: false,
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
                        return List;
                    }
                }
                else {
                    DevExVariables.InvalidResponseCode(data);
                    return [];
                }
            },
            error: OnError
        });
    },

    GridUpdate: function () {
        var List = jewellerySalesView.variables.dx_dataGrid_IteamList.option().selectedRowKeys
        if (List.length > 0) {
            var data = {
                "QI_ID": List.toString(),
                "OPER_TYPE": "Itemes_Update",
            }
            if (Mpurity) {
                data.MPURITYID = Mpurity
            }
            if (MColor) {
                data.MCOLORID = MColor
            }
            if (DQty) {
                data.DPURITYID = DQty
            }
            if (DColor) {
                data.DCOLORID = DColor
            }
            $.ajax({
                url: getDomain() + jewellerySalesView.variables.PerformMasterOperationUrl,
                async: true,
                data: data,
                cache: false,
                type: 'POST',
                success: function (data) {
                    if ($(data).find('RESPONSECODE').text() == "0") {

                        OperationMessage("", 'Record is update successfully', 'success');
                        jewellerySalesView.InitializeDevExgrid_IteamList();
                    }
                    else {
                        DevExVariables.InvalidResponseCode(data);
                    }
                },
                error: OnError
            });
        }
        else {
            //notificationMessage('Warning', 'Please select at list one Desgin', 'warning');
            OperationMessage("", 'Please select at list one Desgin', 'warning');
        }
    },
    CRUD_SingalEntry: function (List) {

        if (jewellerySalesView.variables.Masterid) {
            jewellerySalesView.variables.Oper = 'Edit';
        }
        var xmlsaveFiles = "<ITEAMDETAILLIST>";
        xmlsaveFiles += "<ITEAMDETAILS>";
        if (List.desgcateid)
            xmlsaveFiles += '<DESGCATEID>' + List.desgcateid + '</DESGCATEID>';

        if (List.desgsubcateid)
            xmlsaveFiles += '<DESGSUBCATEID>' + List.desgsubcateid + '</DESGSUBCATEID>';

        if (List.imgpath)
            xmlsaveFiles += '<IMGPATH>' + List.imgpath + '</IMGPATH>';

        if (List.designcode)
            xmlsaveFiles += '<DESIGNCODE>' + List.designcode + '</DESIGNCODE>';

        if (List.bagno)
            xmlsaveFiles += '<BAGNO>' + List.bagno + '</BAGNO>';

        //xmlsaveFiles += '<PRIORITY>High</PRIORITY>';
        //xmlsaveFiles += '<STATUS>Pending</STATUS>';

        if (List.size)
            xmlsaveFiles += '<GOODSSIZE>' + List.size + '</GOODSSIZE>';

        if (List.grossweight)
            xmlsaveFiles += '<GROSSWGT>' + List.grossweight + '</GROSSWGT>';

        if (List.netweight)
            xmlsaveFiles += '<MWGT>' + List.netweight + '</MWGT>';

        if (List.diawgt)
            xmlsaveFiles += '<DWGT>' + List.diawgt + '</DWGT>';

        if (List.diapsc)
            xmlsaveFiles += '<DPCS>' + List.diapsc + '</DPCS>';

        if (List.d_colorid)
            xmlsaveFiles += '<DCOLORID>' + List.d_colorid + '</DCOLORID>';

        if (List.d_purityid)
            xmlsaveFiles += '<DPURITYID>' + List.d_purityid + '</DPURITYID>';

        if (List.m_colorid)
            xmlsaveFiles += '<MCOLORID>' + List.m_colorid + '</MCOLORID>';

        if (List.m_purityid)
            xmlsaveFiles += '<MPURITYID>' + List.m_purityid + '</MPURITYID>';

        if (List.totalamount)
            xmlsaveFiles += '<AMOUNT>' + List.totalamount + '</AMOUNT>';


        var myfilter = { rules: [] };
        myfilter.rules.push({ field: "PM_ID", op: "eq", data: List.pm_id });
        myfilter.rules.push({ field: "TYPE", op: "eq", data: 'PRODUCT_MASTER' });


        $.ajax({
            url: getDomain() + jewellerySalesView.variables.BindDetailListUrl + "&myfilters=" + JSON.stringify(myfilter),
            async: false,
            cache: false,
            type: 'POST',
            //beforeSend: function () {
            //    dx_LoaderTrinity.show();
            //},
            //complete: function () {
            //    dx_LoaderTrinity.hide();
            //},
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    var JsonObject = xml2json.parser(data);
                    if (JsonObject.serviceresponse.detailslist) {
                        //if (JsonObject.serviceresponse.detailslist.details.length) {
                        //    List = JsonObject.serviceresponse.detailslist.details;
                        //}
                        //else {
                        //    List.push(JsonObject.serviceresponse.detailslist.details);
                        //}

                        var List1 = "";
                        if (Array.isArray(JsonObject.serviceresponse.detailslist.details))
                            List1 = JsonObject.serviceresponse.detailslist.details;
                        else
                            List1 = JsonObject.serviceresponse.detailslist;
                        xmlsaveFiles += '<OTHERDETAIL>';

                        $(List1).each(function (key1, obj1) {
                            xmlsaveFiles += '<DETAIL>';
                            if (obj1.rmcodeid)
                                xmlsaveFiles += '<RMCODEID>' + obj1.rmcodeid + '</RMCODEID>';

                            if (obj1.purityid)
                                xmlsaveFiles += '<PURITYID>' + obj1.purityid + '</PURITYID>';

                            if (obj1.colourid)
                                xmlsaveFiles += '<COLOURID>' + obj1.colourid + '</COLOURID>';

                            if (obj1.shapeid)
                                xmlsaveFiles += '<SHAPEID>' + obj1.shapeid + '</SHAPEID>';

                            if (obj1.charniid)
                                xmlsaveFiles += '<CHARNIID>' + obj1.charniid + '</CHARNIID>';

                            if (obj1.pieces)
                                xmlsaveFiles += '<PICES>' + obj1.pieces + '</PICES>';

                            if (obj1.weight)
                                xmlsaveFiles += '<WEIGHT>' + obj1.weight + '</WEIGHT>';

                            if (obj1.lenghtmmsize)
                                xmlsaveFiles += '<LENGTH>' + obj1.lenghtmmsize + '</LENGTH>';

                            if (obj1.widthmmsize)
                                xmlsaveFiles += '<WIDTH>' + obj1.widthmmsize + '</WIDTH>';
                            xmlsaveFiles += '</DETAIL>';
                        })

                        xmlsaveFiles += '</OTHERDETAIL>';
                    }
                }
                else {
                    DevExVariables.InvalidResponseCode(data);
                }
            },
            error: OnError
        });
        xmlsaveFiles += "</ITEAMDETAILS>";
        xmlsaveFiles += "</ITEAMDETAILLIST>";

        var VoucherDate = jewellerySalesView.variables.dx_txtVoucherDate.option().text.split("/");
        VoucherDate = VoucherDate[2] + '-' + VoucherDate[1] + '-' + VoucherDate[0];

        var DueDays = jewellerySalesView.variables.dx_txtDueDate.option().text.split("/");
        DueDays = DueDays[2] + '-' + DueDays[1] + '-' + DueDays[0];

        var data = {
            "VOUCHERDATE": VoucherDate,
            "VCHTYPE": jewellerySalesView.variables.dx_ddlVoucherType.option().value,
            "DUEDAY": jewellerySalesView.variables.dx_txtDueDays.option().value,
            "STATUS":"DRAFT",
            "DUEDATE": DueDays,
            "ACCID": jewellerySalesView.variables.dx_txtAutoComplite_PartyList.option().selectedItem.accid,
            "SALESMANID": jewellerySalesView.variables.dx_TxtOrderby.option().selectedItem.userid,
            "JS_ID": jewellerySalesView.variables.Masterid,
            "oper": jewellerySalesView.variables.Oper,
            "XMLPARAM": escape(xmlsaveFiles),
            "OPER_TYPE": "Iteam_NEW"
        }
        if (jewellerySalesView.variables.dx_txtRemarks.option().value) {
            data.REMARK = jewellerySalesView.variables.dx_txtRemarks.option().value;
        }


        jewellerySalesView.savedata(data);

    },
    //Bind_SingalEntry:function(id)
    //{
    //    var myfilter = { rules: [] };
    //    myfilter.rules.push({ field: "TYPE", op: "eq", data: "ITEM_DETAILS" });
    //    myfilter.rules.push({ field: "QI_ID", op: "eq", data: id });
    //    $.ajax({
    //        //url: getDomain() + jewellerySalesView.variables.Bindingacc_quotation_item_details_get_List + "&page=" + page + "&rows=" + rows + "&myfilters=" + JSON.stringify(myfilter) + "&sidx=" + jewellerySalesView.variables.selSortingColumn + "&sord=" + jewellerySalesView.variables.selSortingOrder,
    //        url: getDomain() + jewellerySalesView.variables.Bindingacc_quotation_item_details_get_List +"&myfilters=" + JSON.stringify(myfilter),
    //        async: false,
    //        cache: false,
    //        type: 'POST',
    //        success: function (data) {
    //            if ($(data).find('RESPONSECODE').text() == "0") {
    //                var JsonObject = xml2json.parser(data);
    //                if (JsonObject.serviceresponse.detailslist.details) {
    //                    var List = ""
    //                    List = JsonObject.serviceresponse.detailslist.details;
    //                    var dataSource = jewellerySalesView.variables.dx_dataGrid_JobWork.getDataSource();
    //                    dataSource.store().insert(List).then(function () {
    //                        dataSource.reload();
    //                   })
    //                    //dataSource: new DevExpress.data.ArrayStore({
    //                    //    data: JsonObject.serviceresponse.detailslist.details,
    //                    //    key: "purityid"
    //                    //})
    //                }
    //            }
    //        }
    //    });
    //},
    /*--------------------------------------- Party Code -------------------------------------------------------*/


    GetCountryList: function () {
        $.ajax({
            url: getDomain() + "/Common/BindMastersDetails?ServiceName=MASTER_COUNTRY_STATE_CITY_GET&ColumnRequested=COUNTRY&ISRECORDALL=true&sidx=COUNTRYNAME&sord=asc",
            async: true,
            cache: false,
            type: 'POST',
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    var JsonObject = xml2json.parser(data);
                    if (JsonObject.serviceresponse.detailslist) {
                        jewellerySalesView.variables.dx_ddlCountry.option({
                            dataSource: new DevExpress.data.ArrayStore({
                                data: JsonObject.serviceresponse.detailslist.details,
                                key: "countryid"
                            }),
                            displayExpr: "countryname",
                            valueExpr: "countryid",
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
    GetStatesList: function (countryid) {
        $.ajax({
            url: getDomain() + "/Common/BindMastersDetails?ServiceName=MASTER_COUNTRY_STATE_CITY_GET&ColumnRequested=STATE&ISRECORDALL=true&sidx=STATENAME&sord=asc&_search=true&searchField=COUNTRYID&searchOper=eq&searchString=" + countryid,
            async: true,
            cache: false,
            type: 'POST',
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    var JsonObject = xml2json.parser(data);
                    if (JsonObject.serviceresponse.detailslist) {
                        jewellerySalesView.variables.dx_ddlState.option({
                            dataSource: new DevExpress.data.ArrayStore({
                                data: JsonObject.serviceresponse.detailslist.details,
                                key: "stateid"
                            }),
                            displayExpr: "statename",
                            valueExpr: "stateid",
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
    GetCityList: function (stateid) {
        $.ajax({
            url: getDomain() + "/Common/BindMastersDetails?ServiceName=MASTER_COUNTRY_STATE_CITY_GET&ColumnRequested=CITY&ISRECORDALL=true&sidx=CITYNAME&sord=asc&_search=true&searchField=STATEID&searchOper=eq&searchString=" + stateid,
            async: true,
            cache: false,
            type: 'POST',
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    var JsonObject = xml2json.parser(data);
                    if (JsonObject.serviceresponse.detailslist) {
                        jewellerySalesView.variables.dx_ddlCity.option({
                            dataSource: new DevExpress.data.ArrayStore({
                                data: JsonObject.serviceresponse.detailslist.details,
                                key: "cityid"
                            }),
                            displayExpr: "cityname",
                            valueExpr: "cityid",
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

    /*--------------------------------------------------------- Save & delete data -------------------------------------------*/
    savedata: function (data) {
        $.ajax({
            url: getDomain() + jewellerySalesView.variables.PerformMasterOperationUrl,
            data: data,
            async: true,
            cache: false,
            type: 'POST',
            success: jewellerySalesView.btnMasterSubmitOnSuccess,
            error: OnError,
        });
    },
    btnMasterSubmitOnSuccess: function (data) {
        if ($(data).find('RESPONSECODE').text() == "0") {
            if (jewellerySalesView.variables.dx_popupRecordDelete) {
                jewellerySalesView.variables.dx_popupRecordDelete.hide();
            }
            
            // DevExVariables.Toaster("success", 'Record is Add successfully');
            jewellerySalesView.variables.Masterid = $(data).find('JS_ID').text();
            jewellerySalesView.variables.JS_ID = $(data).find('JS_ID').text();
            jewellerySalesView.variables.JSI_ID = $(data).find('JSI_ID').text();
            // jewellerySalesView.Bind_SingalEntry($(data).find('QI_ID').text());

            if (jewellerySalesView.variables.Oper == 'Delete') {
                jewellerySalesView.clearControls();
            }
            jewellerySalesView.InitializeDevExgrid_IteamList();
            jewellerySalesView.variables.dx_dataGrid.refresh();
            
        }
        else {
            InvalidResponseCode(data);
            jewellerySalesView.variables.dx_btnSubmit.option({ disabled: false });
        }

        jewellerySalesView.variables.dx_Party_btnSubmit.option({ disabled: false });


    },
    btnMasterSubmit_Party: function () {

        jewellerySalesView.variables.dx_Party_btnSubmit.option({ disabled: true });

        var data = {
            "ACCOUNTNAME": jewellerySalesView.variables.dx_txtAcc_Name.option().value,
            "SHORTNAME": jewellerySalesView.variables.dx_txtshortname.option().value,
            "GROUPNAME": 'BUYER',
            "HEADID": jewellerySalesView.variables.dx_txtHead.option().selectedItem.headid,
            "CITYID": jewellerySalesView.variables.dx_ddlCity.option().value,
            "STATEID": jewellerySalesView.variables.dx_ddlState.option().value,
            "COUNTRYID": jewellerySalesView.variables.dx_ddlCountry.option().value,
            "MOBILE1": jewellerySalesView.variables.dx_txtMobileNo.option().value,
            "oper": 'Add',
        }

        jewellerySalesView.savedata_Party(data);
    },
    savedata_Party: function (data) {
        $.ajax({
            url: getDomain() + jewellerySalesView.variables.PerformMasterOperationUrl_Party,
            data: data,
            async: true,
            cache: false,
            type: 'POST',
            //beforeSend: function () {
            //    dx_LoaderTrinity.show();
            //},
            //complete: function () {
            //    dx_LoaderTrinity.hide();
            //},
            success: jewellerySalesView.btnMasterSubmitOnSuccess_Party,
            error: OnError,
        });
    },
    btnMasterSubmitOnSuccess_Party: function (data) {
        if ($(data).find('RESPONSECODE').text() == "0") {
            DevExVariables.Toaster("success", 'Record is Add successfully');
            $("#Modal_PartyMaster").modal("hide");
            jewellerySalesView.clearControlPopup();

            jewellerySalesView.variables.dx_txtAutoComplite_PartyList.option({
                items: [{ accid: $(data).find('ACCOUNTID').text(), accountname: $(data).find('ACCOUNTNAME').text() }],
                selectedItem: { accid: $(data).find('ACCOUNTID').text(), accountname: $(data).find('ACCOUNTNAME').text() },
                value: $(data).find('ACCOUNTNAME').text()
            });
            jewellerySalesView.variables.dx_txtCode.option({ value: $(data).find('ACCOUNTID').text() });
            jewellerySalesView.variables.PartyList_accid = $(data).find('ACCOUNTID').text()
            jewellerySalesView.variables.dx_txtAutoComplite_PartyList.option({ value: $(data).find('ACCOUNTNAME').text() });
            jewellerySalesView.variables.dx_txtMob.option({ value: $(data).find('MOBILE').text() });

            jewellerySalesView.variables.dx_Party_btnSubmit.option({ disabled: false });

            $("#hdn_statName_Party").attr("StateName", $(data).find('STATENAME').text());
            $("#hdn_statName_Party").attr("Stateid", $(data).find('STATEID').text());

            if ($(data).find('STATENAME').text() == "Gujarat" && $("#hdn_BranchWise_stateName").val() == "Gujarat") {
                $(".showCgst").show();
                $(".showIgst").hide();
            }
            else
            {
                $(".showCgst").hide();
                $(".showIgst").show();
            }
        }

        else {
            InvalidResponseCode(data);
            jewellerySalesView.variables.dx_Party_btnSubmit.option({ disabled: false });
        }




    },
    deleteRow: function (id) {
        var rowData = jewellerySalesView.variables.dx_dataGrid.getVisibleRows()[jewellerySalesView.variables.dx_dataGrid.getRowIndexByKey(+id)].data;
        jewellerySalesView.variables.Masterid = id;
        jewellerySalesView.variables.DeleteDataObj = rowData;
        jewellerySalesView.variables.Oper = "Delete";

        //if (jewellerySalesView.variables.dx_popupRecordDelete) {
        //    jewellerySalesView.variables.dx_popupRecordDelete.option("contentTemplate", jewellerySalesView.variables.DeletePopUpOptions.contentTemplate(jewellerySalesView.variables.DeleteDataObj).bind(this));
        //}
        //else {
        jewellerySalesView.variables.dx_popupRecordDelete = $("#dx_popupRecordDelete").dxPopup(jewellerySalesView.variables.DeletePopUpOptions).dxPopup("instance");
        //}

        jewellerySalesView.variables.dx_popupRecordDelete.show();
    },
    SubdeleteRow: function (id) {
        $("#ActionModal_delete").modal("show");
        jewellerySalesView.variables.Deleteid = id;
    },
    /*--------------------------------------------------------- Save & delete data -------------------------------------------*/
    clearControls: function () {
        $("#hdn_statName_Party").attr("StateName", "");
        $("#hdn_statName_Party").attr("Stateid", "");
        jewellerySalesView.variables.GlobalTotal = [];
        jewellerySalesView.variables.JS_ID = '';
        jewellerySalesView.variables.JSI_ID = '';
        
        jewellerySalesView.variables.dx_btnSubmit.option({ disabled: false });

        jewellerySalesView.variables.Masterid = '',
        jewellerySalesView.variables.MULTISEARCH = [];
        jewellerySalesView.variables.dx_dataGrid_Job_Detail = [];
        jewellerySalesView.variables.dx_dataGrid_Stock_Deatil = [];
        jewellerySalesView.variables.MULTISEARCH_STOCK = [];
        jewellerySalesView.variables.Oper = 'Add';

        jewellerySalesView.variables.Searchid = '';
        jewellerySalesView.variables.PartyList_accid = '';
        jewellerySalesView.InitializeDevExgrid_IteamList();

        $("#Modal_PartyMaster").modal("hide");
        $("#frm_Quotation_Master").hide();
        $("#pnlView").show();
        
        jewellerySalesView.variables.txtTotal.option({ value: "" });
        jewellerySalesView.variables.txtDiscount.option({ value: "" });
        jewellerySalesView.variables.txtTaxableAmount.option({ value: "" });
        jewellerySalesView.variables.txtCGST.option({ value: "" });
        $("#cgstper").html("");
        $("#cgstper").attr("cgst_per", "");
        jewellerySalesView.variables.txtSGST.option({ value: "" });
        $("#sgstper").html("");
        $("#sgstper").attr("sgst_per", "");
        jewellerySalesView.variables.txtIGST.option({ value: "" });
        $("#igstper").html("");
        $("#igstper").attr("igst_per", "");
        jewellerySalesView.variables.txtOtherTax.option({ value: "" });
        $("#etax").html("");
        $("#etax").attr("etax", "");
        jewellerySalesView.variables.txtAmount.option({ value: "" });
        $("#rd_Rs").prop("checked", true);
        jewellerySalesView.variables.txtRoundOff.option({ value: "" });
        $("#txtAdjustAmount").val("");
        jewellerySalesView.variables.txtTotalAmount.option({ value: "" });
        $("#NumberShow").html("");
        

        /*------------------------- Main Page clear Control ------------------------------------*/
        jewellerySalesView.variables.ddlHsnCode.option({ value: "" });
        jewellerySalesView.variables.dx_txtVoucherDate.option({ value: new Date() });
        jewellerySalesView.variables.dx_txtDueDate.option({ value: new Date() });
        jewellerySalesView.variables.dx_txtDueDays.option({ value: 0 });
        jewellerySalesView.variables.dx_txtRemarks.option({ value: "" });
        jewellerySalesView.variables.dx_txtVoucherNo.option({ value: '' });
        jewellerySalesView.variables.dx_ddlVoucherType.option({ value: 'Retails Invoice' });

        jewellerySalesView.variables.dx_txtAutoComplite_PartyList.option({ "value": "" }, { "items": "" }, { "selectedItem": "" });
        jewellerySalesView.variables.dx_TxtOrderby.option({ "value": "" }, { "items": "" }, { "selectedItem": "" });
        jewellerySalesView.variables.dx_txtMob.option({ "value": "" });
        jewellerySalesView.variables.dx_txtCode.option({ "value": "" });
        jewellerySalesView.variables.dx_txtCode.option({ "value": "" });
        jewellerySalesView.variables.dx_dataGrid_IteamList = [];





    },
    DueDate: function (Days) {
        var DateTo = new Date(jewellerySalesView.variables.dx_txtVoucherDate.option().value);
        DateTo.setDate(DateTo.getDate() + +Days);
        jewellerySalesView.variables.dx_txtDueDate.option({ value: new Date(DateTo) });

    },
    clearControlPopup: function () {
        jewellerySalesView.variables.dx_txtAcc_Name.option({ 'value': "" });
        jewellerySalesView.variables.dx_txtshortname.option({ value: "" });
        jewellerySalesView.variables.dx_txtHead.option({ value: "" });
        jewellerySalesView.variables.dx_txtMobileNo.option({ value: "" });
        jewellerySalesView.variables.dx_ddlCountry.option({ value: "" });
        jewellerySalesView.variables.dx_ddlState.option({ value: "" });
        jewellerySalesView.variables.dx_ddlCity.option({ value: "" });
    },
};


$(document).ready(function () {
    jewellerySalesView.FormInitialize();
    jewellerySalesView.Bind_Hsncode();
    jewellerySalesView.GetCountryList();
    var hdn_txtQm_id = $("#hdn_txtQm_id").val();
    if (hdn_txtQm_id != '') {
        $("#pnlView").hide();
        $("#frm_Quotation_Master").show();
        jewellerySalesView.QutationBind_Hdnid(hdn_txtQm_id)
    }
    $("#btnSaveModal").click(function () {
        var data = {
            "JSI_ID": jewellerySalesView.variables.Deleteid,
            "JS_ID": jewellerySalesView.variables.Masterid,
            "OPER_TYPE": "Itemes_Delete"
        }
        $.ajax({
            url: getDomain() + jewellerySalesView.variables.PerformMasterOperationUrl,
            async: true,
            data: data,
            cache: false,
            type: 'POST',
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {

                    OperationMessage("", 'Record is Delete successfully', 'success');
                    jewellerySalesView.InitializeDevExgrid_IteamList();
                    $("#ActionModal_delete").modal("hide");
                    jewellerySalesView.variables.dx_dataGrid.refresh();
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

    $("#txtAdjustAmount").on('blur', function () {
        jewellerySalesView.calAdjustAmount();
    });
});
function makeFileXml() {
    try {
        var i = 1;
        var xmlsaveFiles = '';
        var gstno
        var maindata_list = []
        if (jewellerySalesView.variables.dx_dataGrid_IteamList.option().dataSource._array) {
            maindata_list = jewellerySalesView.variables.dx_dataGrid_IteamList.option().dataSource._array;
        }
        else {
            maindata_list = jewellerySalesView.variables.dx_dataGrid_JobWork.option().dataSource;
        }
        $(maindata_list).each(function (key, obj) {
            xmlsaveFiles += '<ITEAMDETAILS>';
            if (obj.desgcateid)
                xmlsaveFiles += '<DESGCATEID>' + obj.desgcateid + '</DESGCATEID>';

            if (obj.desgsubcateid)
                xmlsaveFiles += '<DESGSUBCATEID>' + obj.desgsubcateid + '</DESGSUBCATEID>';

            if (obj.imgvirtualname)
                xmlsaveFiles += '<IMGPATH>' + obj.imgvirtualname + '</IMGPATH>';

            if (obj.designcode)
                xmlsaveFiles += '<DESIGNCODE>' + obj.designcode + '</DESIGNCODE>';

            if (obj.goodssize)
                xmlsaveFiles += '<GOODSSIZE>' + obj.goodssize + '</GOODSSIZE>';

            if (obj.grossweight)
                xmlsaveFiles += '<GROSSWGT>' + obj.grossweight + '</GROSSWGT>';

            if (obj.netweight)
                xmlsaveFiles += '<MWGT>' + obj.netweight + '</MWGT>';

            if (obj.diacts)
                xmlsaveFiles += '<DWGT>' + obj.diacts + '</DWGT>';

            if (obj.diapcs)
                xmlsaveFiles += '<DPCS>' + obj.diapcs + '</DPCS>';

            if (obj.price)
                xmlsaveFiles += '<AMOUNT>' + obj.price + '</AMOUNT>';
            xmlsaveFiles += '<OTHERDETAIL>';
            $(jewellerySalesView.variables.dx_dataGrid_Job_Detail[obj.dm_id].getDataSource()._items).each(function (key1, obj1) {
                xmlsaveFiles += '<DETAIL>';
                if (obj1.rmcodeid)
                    xmlsaveFiles += '<RMCODEID>' + obj1.rmcodeid + '</RMCODEID>';

                if (obj1.purityid)
                    xmlsaveFiles += '<PURITYID>' + obj1.purityid + '</PURITYID>';

                if (obj1.colourid)
                    xmlsaveFiles += '<COLOURID>' + obj1.colourid + '</COLOURID>';

                if (obj1.shapeid)
                    xmlsaveFiles += '<SHAPEID>' + obj1.shapeid + '</SHAPEID>';

                if (obj1.charniid)
                    xmlsaveFiles += '<CHARNIID>' + obj1.charniid + '</CHARNIID>';

                if (obj1.pieces)
                    xmlsaveFiles += '<PICES>' + obj1.pieces + '</PICES>';

                if (obj1.weight)
                    xmlsaveFiles += '<WEIGHT>' + obj1.weight + '</WEIGHT>';

                if (obj1.lenghtmmsize)
                    xmlsaveFiles += '<LENGTH>' + obj1.lenghtmmsize + '</LENGTH>';

                if (obj1.widthmmsize)
                    xmlsaveFiles += '<WIDTH>' + obj1.widthmmsize + '</WIDTH>';

                xmlsaveFiles += '</DETAIL>';
            });
            xmlsaveFiles += '</OTHERDETAIL>';
            xmlsaveFiles += '</ITEAMDETAILS>';
            i++;
        });
        return {
            xmlsaveFiles: xmlsaveFiles
        };
    } catch (e) {
        ErrorDetails(e, SaleOrderView.variables.File);
    }
}
function makeFileXml_Stock() {
    try {
        var i = 1;
        var xmlsaveFiles = '';
        var gstno
        var maindata_list = []
        if (jewellerySalesView.variables.dx_dataGrid_Stock.option().dataSource._array) {
            maindata_list = jewellerySalesView.variables.dx_dataGrid_Stock.option().dataSource._array;
        }
        else {
            maindata_list = jewellerySalesView.variables.dx_dataGrid_Stock.option().dataSource;
        }
        $(maindata_list).each(function (key, obj) {
            xmlsaveFiles += '<ITEAMDETAILS>';
            if (obj.desgcateid)
                xmlsaveFiles += '<DESGCATEID>' + obj.desgcateid + '</DESGCATEID>';

            if (obj.desgsubcateid)
                xmlsaveFiles += '<DESGSUBCATEID>' + obj.desgsubcateid + '</DESGSUBCATEID>';


            if (obj.bagno)
                xmlsaveFiles += '<BAGNO>' + obj.bagno + '</BAGNO>';

            if (obj.imgpath)
                xmlsaveFiles += '<IMGPATH>' + obj.imgpath + '</IMGPATH>';

            if (obj.designcode)
                xmlsaveFiles += '<DESIGNCODE>' + obj.designcode + '</DESIGNCODE>';

            if (obj.size)
                xmlsaveFiles += '<GOODSSIZE>' + obj.size + '</GOODSSIZE>';

            if (obj.grossweight)
                xmlsaveFiles += '<GROSSWGT>' + obj.grossweight + '</GROSSWGT>';

            if (obj.netweight)
                xmlsaveFiles += '<MWGT>' + obj.netweight + '</MWGT>';

            if (obj.diawgt)
                xmlsaveFiles += '<DWGT>' + obj.diawgt + '</DWGT>';

            if (obj.diapsc)
                xmlsaveFiles += '<DPCS>' + obj.diapsc + '</DPCS>';

            if (obj.totalamount)
                xmlsaveFiles += '<AMOUNT>' + obj.totalamount + '</AMOUNT>';
            xmlsaveFiles += '<OTHERDETAIL>';
            if (jewellerySalesView.variables.dx_dataGrid_Stock_Deatil[obj.qi_id].getDataSource()._items) {
                $(jewellerySalesView.variables.dx_dataGrid_Stock_Deatil[obj.qi_id].getDataSource()._items).each(function (key1, obj1) {
                    xmlsaveFiles += '<DETAIL>';
                    if (obj1.rmcodeid)
                        xmlsaveFiles += '<RMCODEID>' + obj1.rmcodeid + '</RMCODEID>';

                    if (obj1.purityid)
                        xmlsaveFiles += '<PURITYID>' + obj1.purityid + '</PURITYID>';

                    if (obj1.colourid)
                        xmlsaveFiles += '<COLOURID>' + obj1.colourid + '</COLOURID>';

                    if (obj1.shapeid)
                        xmlsaveFiles += '<SHAPEID>' + obj1.shapeid + '</SHAPEID>';

                    if (obj1.charniid)
                        xmlsaveFiles += '<CHARNIID>' + obj1.charniid + '</CHARNIID>';

                    if (obj1.pieces)
                        xmlsaveFiles += '<PICES>' + obj1.pieces + '</PICES>';

                    if (obj1.weight)
                        xmlsaveFiles += '<WEIGHT>' + obj1.weight + '</WEIGHT>';

                    if (obj1.lenghtmmsize)
                        xmlsaveFiles += '<LENGTH>' + obj1.lenghtmmsize + '</LENGTH>';

                    if (obj1.widthmmsize)
                        xmlsaveFiles += '<WIDTH>' + obj1.widthmmsize + '</WIDTH>';

                    xmlsaveFiles += '</DETAIL>';
                });
            }
            xmlsaveFiles += '</OTHERDETAIL>';
            xmlsaveFiles += '</ITEAMDETAILS>';
            i++;
        });
        return {
            xmlsaveFiles: xmlsaveFiles
        };
    } catch (e) {
        ErrorDetails(e, SaleOrderView.variables.File);
    }
}
function convertNumberToWords(amount) {
    var words = new Array();
    words[0] = '';
    words[1] = 'One';
    words[2] = 'Two';
    words[3] = 'Three';
    words[4] = 'Four';
    words[5] = 'Five';
    words[6] = 'Six';
    words[7] = 'Seven';
    words[8] = 'Eight';
    words[9] = 'Nine';
    words[10] = 'Ten';
    words[11] = 'Eleven';
    words[12] = 'Twelve';
    words[13] = 'Thirteen';
    words[14] = 'Fourteen';
    words[15] = 'Fifteen';
    words[16] = 'Sixteen';
    words[17] = 'Seventeen';
    words[18] = 'Eighteen';
    words[19] = 'Nineteen';
    words[20] = 'Twenty';
    words[30] = 'Thirty';
    words[40] = 'Forty';
    words[50] = 'Fifty';
    words[60] = 'Sixty';
    words[70] = 'Seventy';
    words[80] = 'Eighty';
    words[90] = 'Ninety';
    amount = amount.toString();
    var atemp = amount.split(".");
    var number = atemp[0].split(",").join("");
    var n_length = number.length;
    var words_string = "";
    if (n_length <= 9) {
        var n_array = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0);
        var received_n_array = new Array();
        for (var i = 0; i < n_length; i++) {
            received_n_array[i] = number.substr(i, 1);
        }
        for (var i = 9 - n_length, j = 0; i < 9; i++, j++) {
            n_array[i] = received_n_array[j];
        }
        for (var i = 0, j = 1; i < 9; i++, j++) {
            if (i == 0 || i == 2 || i == 4 || i == 7) {
                if (n_array[i] == 1) {
                    n_array[j] = 10 + parseInt(n_array[j]);
                    n_array[i] = 0;
                }
            }
        }
        value = "";
        for (var i = 0; i < 9; i++) {
            if (i == 0 || i == 2 || i == 4 || i == 7) {
                value = n_array[i] * 10;
            } else {
                value = n_array[i];
            }
            if (value != 0) {
                words_string += words[value] + " ";
            }
            if ((i == 1 && value != 0) || (i == 0 && value != 0 && n_array[i + 1] == 0)) {
                words_string += "Crores ";
            }
            if ((i == 3 && value != 0) || (i == 2 && value != 0 && n_array[i + 1] == 0)) {
                words_string += "Lakhs ";
            }
            if ((i == 5 && value != 0) || (i == 4 && value != 0 && n_array[i + 1] == 0)) {
                words_string += "Thousand ";
            }
            if (i == 6 && value != 0 && (n_array[i + 1] != 0 && n_array[i + 2] != 0)) {
                words_string += "Hundred and ";
            } else if (i == 6 && value != 0) {
                words_string += "Hundred ";
            }
        }
        words_string = words_string.split("  ").join(" ");
    }
    return words_string;
}