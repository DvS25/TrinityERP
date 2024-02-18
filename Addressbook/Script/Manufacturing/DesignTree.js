var PageIndex = 1, PageRecords = 30, TotalRecords = 0;
var DesignTreeView = {
    variables: {
        BindDesignListUrl: "/Common/BindMastersDetails?ServiceName=PRD_DESIGNTREE_MASTER_GET",
        BindProductListUrl: "/Common/BindMastersDetails?ServiceName=PRD_PRODUCT_MASTER_GET",
        BindStaticMultipleDataUrl: "/Common/BindMastersDetails?ServiceName=STATIC_MASTER_MULTIPLE_GET&IsActive=true",
        BindStaticDataUrl: "/Common/BindMastersDetails?ServiceName=STATIC_MASTER_GET&IsActive=true",
        BindDetailListUrl: "/Common/BindMastersDetails?ServiceName=PRD_DESIGN_DETAIL_GET",
        BindProDetailListUrl: "/Common/BindMastersDetails?ServiceName=PRD_PRODUCT_DETAIL_GET",
        BindImgsListUrl: "/Common/BindMastersDetails?ServiceName=PRD_DESIGN_IMAGES_GET",
        BindRelatedDesignUrl: "/Common/BindMastersDetails?ServiceName=PRD_RELATED_DESIGNS_GET",
        PerformMasterOperationurl: "/Common/OpeartionsOnMaster?ServiceName=PRD_DESIGN_MASTER_CRUD",
        PerformMasterelctionCRUD: "/Common/OpeartionsOnMaster?ServiceName=ACC_CATALOG_TO_QUOTATION_CRUD",
        PerformSaleMasterCRUD: "/Common/OpeartionsOnMaster?ServiceName=ACC_CATALOG_TO_SALE_CRUD",
        PerformOrderMasterCRUD: "/Common/OpeartionsOnMaster?ServiceName=ACC_CATALOG_TO_ORDER_CRUD",
        BindSelectionListUrl: "/Common/BindMastersDetails?ServiceName=PRD_SELECTIONLIST_GET",
        BindSelectionListItemsUrl: "/Common/BindMastersDetails?ServiceName=PRD_SELECTIONLIST_ITEMS_GET",
        PerformSelectionListurl: "/Common/OpeartionsOnMaster?ServiceName=PRD_SELECTIONLIST_CRUD",
        PerformSelectionList_CartList: "/Common/OpeartionsOnMaster?ServiceName=PRD_SELECTIONLISTITEMS_CART_CRUD",
        BindSelectionList_CartUrl: "/Common/BindMastersDetails?ServiceName=PRD_SELECTIONLISTITEMS_CART_GET",
        BindDesignMaster_GetUrl: "/Common/BindMastersDetails?ServiceName=PRD_DESIGN_MASTER_GET",
        PerformDesignSharingurl: "/Common/OpeartionsOnMaster?ServiceName=PRD_DESIGNSHARING_CRUD",
        BindAccListUrl: "/Common/BindMastersDetails?ServiceName=ACCOUNTMASTER_GET",
        Oper: 'Add',
        addedit: "added",
        Masterid: "",
        ViewType: "Tiles",
        StockType: "Virtual Stock",
        CartStockType: "Virtual Stock",
        /*------------------------variables for main form Controls-----------------------*/
        dx_StockTypes: "",
        Golabal_QoutationList: "",
        Qm_Id: '',
        dx_txtSharetoPartyList: "",
        dx_txtAutoComplite_PartyList: "",
        dx_txtAutoComplite_PartyList_Cart: "",
        dx_ddlCategory: "",
        dx_ddlSubCategory: "",
        dx_txtSearch: "",
        dx_txtbagNo: "",
        dx_tlbTools: "",
        dx_txtFromDate: "",
        dx_txtToDate: "",
        dx_ddlIsActive: "",
        dx_ddlDisWebB2B: "",
        dx_ddlDisAppB2B: "",
        dx_ddlDisWebB2C: "",
        dx_ddlDisAppB2C: "",
        dx_ddlDisOutlet: "",
        dx_txtDiaWtFrom: "",
        dx_txtDiaWtTo: "",
        dx_rngDiaWgt: "",
        dx_txtGoldWtFrom: "",
        dx_txtGoldWtTo: "",
        dx_rngGoldWgt: "",
        dx_txtPriceFrom: "",
        dx_txtPriceTo: "",
        dx_rngPrice: "",
        dx_tagCharniGroup: "",
        dx_tagCharni: "",
        dx_tagConcept: "",
        dx_tagStockType: "",
        dx_tagStockStatus: "",
        dx_tagMetalType: "",
        dx_tagPurity: "",
        dx_tagColor: "",
        dx_tagDiaPurity: "",
        dx_tagDiaColour: "",
        dx_btnApply: "",
        dx_btnReset: "",
        dx_chngIsActive: "",
        dx_chngDisWebB2B: "",
        dx_chngDisAppB2B: "",
        dx_chngDisOutlet: "",
        dx_chngDisWebB2C: "",
        dx_chngDisAppB2C: "",
        IsGenerateOrder: [
        { name: "Order" },
        { name: "Quotation" },
        { name: "Jewellery Transaction" }],
        dx_btnSave_Quoation: "",
        dx_btnSave_GenerateCatalog: "",
        dx_Carttool: "",
        IsfromCart: false,
        dx_txtAutoSelecList_Cart: "",
        dx_btnAddCatalog_Cart: "",
        dx_txtCatalogName_Cart: "",
        dx_txtCatalogRemark_Cart: "",
        dx_btnSaveCatalog_Cart: "",
        dx_btnSubmitShare: "",
        dx_RadioSocial: "",
        dx_txtMobileNo: "",
        dx_txtShareMessage: "",
        dx_txtSharingEmailId: "",
        dx_txtSharingSubject: "",
        dx_txtSharingEmailBody: "",
        /*------------------------variables for Catalog modal Controls-----------------------*/
        SelListMasId: "",
        dx_gridSelectionList: "",
        dx_gridSelectionItemList: "",
        CatalogOpr: "Edit",
        dx_btnViewSelectionList: "",
        dx_btnAddSelectionList: "",
        dx_btnCancel: "",
        dx_btnDeleteSelListItems: "",
        dx_catalogtool: "",
        dx_txtAutoSelecList: "",
        dx_txtSelectionListName: "",
        dx_txtSelectionListRemark: "",
        dx_btnBackFromList: "",
        dx_btnBacktoList: "",
        dx_btnSaveSelectionList: "",
        dx_CatalogRadioSocial: "",
        dx_txtCatalogMobileNo: "",
        dx_txtCatalogShareMessage: "",
        dx_txtCatalogSharingEmailId: "",
        dx_txtCatalogSharingSubject: "",
        dx_txtCatalogSharingEmailBody: "",
        dx_ddlSubBookMaster: "",
        /*------------------------variables for main form Controls-----------------------*/
        dx_dataGrid: "",
        CloudFilterValueList: [
            { id: "", name: "All" },
            { id: "1", name: "Yes" },
            { id: "0", name: "No" },
        ],
        CloudValueUpdateList: [
            { id: "", name: "" },
            { id: "1", name: "Yes" },
            { id: "0", name: "No" },
        ],
        StockTypeList: [
            { id: "0", name: "JEWELLERY OPENING" },
            { id: "1", name: "JEWELLERY PURCHASE" },
            { id: "2", name: "JEWELLERY MFG" },
            { id: "3", name: "JEWELLERY SALE RETURN" },
        ],
        StockStatusList: [
           { id: "0", name: "AVAILABLE" },
           { id: "1", name: "SOLD" },
           { id: "2", name: "TRASFERED" },
           { id: "3", name: "ON APPROVAL" },
        ],
        /*------------------------variables for Selected Values in Filter-----------------------*/
        IsFilterApplied: false,
        selSortingColumn: "DESIGNCODE",
        selSortingOrder: "desc",
        selFromDate: "",
        selToDate: "",
        selIsActive: "1",
        selDisOnOutlet: "",
        selDisOnB2BWeb: "",
        selDisOnB2BApp: "",
        selDisOnB2CWeb: "",
        selDisOnB2CApp: "",
        selDiaFromWgt: "",
        selDiaToWgt: "",
        selGoldFromWgt: "",
        selGoldToWgt: "",
        selPriceFrom: "",
        selPriceTo: "",
        selDiaShape: "",
        selCharniGroups: "",
        selCharni: "",
        selConcept: "",
        selStockType: "",
        selStockStatus: "",
        selMetalType: "",
        selPurity: "",
        selColor: "",
        selDiaColour: "",
        selDiaPurity: "",
        /*------------------------/variables for Selected Values in Filter-----------------------*/
       
        /*------------------------variables for Price Setting-----------------------*/
        dx_txtPriceAcc: "",
        dx_ddlPriceDiaPurity: "",
        dx_ddlPriceDiaColor: "",
        selPriceAccId: "",
        selPriceAccName: "",
        selPriceDiaPurity: "",
        selPriceDiaColor: "",
        dx_btnSavePriceSetting: "",
        /*------------------------/variables for Price Setting-----------------------*/

        /*------------------------variables for Delete Selection List Popup Controls-----------------------*/
        dx_popupSelListDelete: "",
        dx_popupSelListDelete_Cart: "",
        DeleteDataObj: "",
        DeleteDataObj_Cart: "",
        DeletePopUpOptions: {
            width: 300,
            height: 270,
            contentTemplate: function () {
                return $("<div />").append(
                    $("<p>List Name: <span><b>" + DesignTreeView.variables.DeleteDataObj.listname + "</b></span></p>"),
                    $("<p>Total Items: <span>" + (DesignTreeView.variables.DeleteDataObj.total_items || 0) + "</span></p>"),
                    $("<p>Remark: <span>" + (DesignTreeView.variables.DeleteDataObj.remark || "") + "</span></p>"),

                    $("<div style='float:right;' />").attr("id", "dx_btnDeleteListConfirm").dxButton({
                        text: "Yes, Delete It!",
                        icon: "trash",
                        type: "danger",
                        onClick: function (e) {
                            var data = {
                                "LISTID": DesignTreeView.variables.DeleteDataObj.listid,
                                "oper": "delete",
                            }
                            $.ajax({
                                url: getDomain() + DesignTreeView.variables.PerformSelectionListurl,
                                data: data,
                                async: false,
                                cache: false,
                                type: 'POST',
                                success: function (data) {
                                    if ($(data).find("RESPONSECODE").text() == 0) {
                                        DevExVariables.Toaster("success", 'Selection List is deleted successfully.');

                                        DesignTreeView.variables.DeleteDataObj = "";
                                        if (DesignTreeView.variables.dx_popupSelListDelete)
                                            DesignTreeView.variables.dx_popupSelListDelete.hide();

                                        DesignTreeView.variables.dx_gridSelectionList.refresh();
                                    }
                                    else {
                                        DevExVariables.Toaster("error", $(data).find("RESPONSEMESSAGE").text());
                                    }
                                },
                                error: OnError
                            });
                        }
                    })
                );
            },
            showTitle: true,
            title: "Delete Selection List",
            visible: false,
            dragEnabled: false,
            closeOnOutsideClick: true
        },
        dx_popupSelListItemsDelete: "",
        dx_popupSelListItemsDelete_Cart: "",
        SelListSelectedItems: [],
        SelListSelectedItems_Cart: [],
        OrderListSelectedItems: [],
        OrderListSelectedItems_Cart: [],
        DeleteSelListItemsOptions: {
            width: 300,
            height: 170,
            contentTemplate: function () {
                return $("<div />").append(
                    $("<p>Are you sure to remove selected <b>" + DesignTreeView.variables.SelListSelectedItems.length + "</b> item(s) from the List?</p>"),
                    $("<div style='float:right;' />").attr("id", "dx_btnDeleteListConfirm").dxButton({
                        text: "Yes, Delete It!",
                        icon: "trash",
                        type: "danger",
                        onClick: function (e) {
                            var data = {
                                "DESIGNIDLIST": DesignTreeView.variables.SelListSelectedItems.toString(),
                                "oper": "deleteMultiItem",
                            }

                            $.ajax({
                                url: getDomain() + DesignTreeView.variables.PerformSelectionListurl,
                                data: data,
                                async: false,
                                cache: false,
                                type: 'POST',
                                success: function (data) {
                                    if ($(data).find("RESPONSECODE").text() == 0) {
                                        DevExVariables.Toaster("success", 'Items are deleted successfully.');

                                        DesignTreeView.variables.SelListSelectedItems = [];
                                        if (DesignTreeView.variables.dx_popupSelListItemsDelete)
                                            DesignTreeView.variables.dx_popupSelListItemsDelete.hide();

                                        DesignTreeView.variables.dx_gridSelectionItemList.deselectAll();
                                        DesignTreeView.variables.dx_gridSelectionItemList.refresh();
                                    }
                                    else {
                                        DevExVariables.Toaster("error", $(data).find("RESPONSEMESSAGE").text());
                                    }
                                },
                                error: OnError
                            });
                        }
                    })
                );
            },
            showTitle: true,
            title: "Delete Selected Item(s)",
            visible: false,
            dragEnabled: false,
            closeOnOutsideClick: true
        },
        DeleteSelListItemsOptions_Cart: {
            width: 300,
            height: 170,
            contentTemplate: function () {
                return $("<div />").append(
                    $("<p>Are you sure to remove selected <b>" + DesignTreeView.variables.SelListSelectedItems_Cart.length + "</b> item(s) from the List?</p>"),
                    $("<div style='float:right;' />").attr("id", "dx_btnDeleteListConfirm").dxButton({
                        text: "Yes, Delete It!",
                        icon: "trash",
                        type: "danger",
                        onClick: function (e) {
                            var data = {
                                //"DESIGNIDLIST": DesignTreeView.variables.SelListSelectedItems_Cart.toString(),
                                "oper": "delete",
                            }
                            if (DesignTreeView.variables.CartStockType == "Virtual Stock") {
                                data.DESIGNIDLIST = DesignTreeView.variables.SelListSelectedItems_Cart.toString();
                            }
                            else{
                                data.PRODUCTLIST = DesignTreeView.variables.SelListSelectedItems_Cart.toString();
                            }
                            $.ajax({
                                url: getDomain() + DesignTreeView.variables.PerformSelectionList_CartList,
                                data: data,
                                async: false,
                                cache: false,
                                type: 'POST',
                                success: function (data) {
                                    if ($(data).find("RESPONSECODE").text() == 0) {
                                        DevExVariables.Toaster("success", 'Items are deleted successfully.');

                                        DesignTreeView.variables.SelListSelectedItems_Cart = [];
                                        if (DesignTreeView.variables.dx_popupSelListItemsDelete_Cart)
                                            DesignTreeView.variables.dx_popupSelListItemsDelete_Cart.hide();

                                        DesignTreeView.variables.dx_gridSelectionItem_CartList.deselectAll();
                                        DesignTreeView.variables.dx_gridSelectionItem_CartList.refresh();

                                        DesignTreeView.BindSelectionList_CartCounting();
                                    }
                                    else {
                                        DevExVariables.Toaster("error", $(data).find("RESPONSEMESSAGE").text());
                                    }
                                },
                                error: OnError
                            });
                        }
                    })
                );
            },
            showTitle: true,
            title: "Delete Selected Item(s)",
            visible: false,
            dragEnabled: false,
            closeOnOutsideClick: true
        },
        content: '<p>Dear Sir,</p>' +
                '<p>Kindly click on below URL to view shared Design.</p>' +
                '<p>{SHARE URL}</p>' +
                '<p>Kind Regards,<br/>' + $("#hdn_UserName").val() + '<br/>' +
                '<img src="https://docs.google.com/uc?id=174UudfEtxLzq6mnwIHcJNySMPRy6RnYg&revid=0B23A25FsmJHbeW1VdFQ5cWNDOFgwS05yTFdrL3phaFoyUHFNPQ" width="90" /><br/>' +
                '<span style="font-size:18px;"><strong>Trinity Jewells</strong></span><br/>' +
                '405, Princess Plaza,<br/>' +
                'Near Sardar Chowk,<br/>' +
                'Mini Bazar,<br/>' +
                'Varachha Road,<br/>' +
                'Surat. (Gujarat)India<br/>' +
                '0261-4000800<br/></p>',
        /*------------------------variables for Delete Selection List Popup Controls-----------------------*/

        DesignListArray: []
    },

    FormInitialize: function () {
        /*------------------------------categroy,subcategory,DesignCode filter----------------------------*/
        DesignTreeView.variables.dx_ddlSubBookMaster = $("#dx_ddlSubBookMaster").dxSelectBox({
            visible:false,
            placeholder: "Select Sub Book...",
            searchEnabled: true,
            onValueChanged: function (data) {
            }
        }).dxValidator({
            validationGroup: "DesignTreeView",
            validationRules: [{
                type: "required",
                message: "Sub Book is required"
            }]
        }).dxSelectBox("instance");
        DesignTreeView.variables.dx_ddlCategory = $("#dx_ddlCategory").dxSelectBox({
            searchEnabled: true,
            placeholder: "Category...",
            onItemClick: function (data) {
                DesignTreeView.variables.dx_tlbTools.option({ disabled: false });
            },
            onValueChanged: function (data) {
                $("#cart_panel").hide();
                $("#desgin_panel").show();
                if (DesignTreeView.variables.dx_ddlCategory.option().value) {
                    DesignTreeView.GetSubCategoryList(data.value);

                    if (DesignTreeView.variables.ViewType == "Tiles") {
                        $("#div_DesignList").html("");
                        DesignTreeView.variables.DesignListArray = [];
                        PageIndex = 1;
                        if (DesignTreeView.variables.dx_ddlSubCategory.option().value != 0){
                            DesignTreeView.GetDesignList(PageIndex, PageRecords);
                        }
                    }
                    else {
                        DesignTreeView.variables.dx_dataGrid.refresh();
                    }
                }

            }
        }).dxSelectBox("instance");
        DesignTreeView.variables.dx_ddlSubCategory = $("#dx_ddlSubCategory").dxTagBox({
            searchEnabled: true,
            placeholder: "Sub Category...",
            multiline: false,
            showSelectionControls: true,
            onValueChanged: function (data) {
                $("#cart_panel").hide();
                $("#desgin_panel").show();
                if (data.value) {
                    if (DesignTreeView.variables.ViewType == "Tiles") {
                        $("#div_DesignList").html("");
                        DesignTreeView.variables.DesignListArray = [];
                        PageIndex = 1;
                        DesignTreeView.GetDesignList(PageIndex, PageRecords);
                    }
                    else {
                        DesignTreeView.variables.dx_dataGrid.refresh();
                    }
                }
            }
        }).dxTagBox("instance");
        DesignTreeView.variables.dx_txtSearch = $("#dx_txtSearch").dxAutocomplete({
            placeholder: "Search Design Code, Category, Ref Code, Keywords ...",
            mode: "search",
            dataSource: new DevExpress.data.CustomStore({
                load: function (loadOptions) {
                    var deferred = $.Deferred();

                    var myfilter = { rules: [] };
                    myfilter.rules.push({ field: "SEARCH", op: "eq", data:loadOptions.searchValue });

                    var result;
                    $.ajax({
                        url: getDomain() + DesignTreeView.variables.BindDesignMaster_GetUrl + "&myfilters=" + JSON.stringify(myfilter),
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
                key: "dm_id",
            }),
            valueExpr: "designcode",
            onSelectionChanged: function (data) {
                $("#cart_panel").hide();
                $("#desgin_panel").show();
                //if (data.selectedItem) {
                //    DesignTreeView.variables.dx_ddlCategory.option({ value: "" });
                //    DesignTreeView.variables.dx_ddlSubCategory.option({ value: "" });
                //}
                //else {
                //    DesignTreeView.variables.dx_txtSearch.option("value", "");
                //}

                if (DesignTreeView.variables.ViewType == "Tiles") {
                    $("#div_DesignList").html("");
                    DesignTreeView.variables.DesignListArray = [];
                    PageIndex = 1;
                    DesignTreeView.GetDesignList(PageIndex, PageRecords);


                }
                else {
                    DesignTreeView.variables.dx_dataGrid.refresh();
                }
            },
            onFocusOut: function (data) {
                if (!data.component.option().selectedItem) {
                    DesignTreeView.variables.dx_txtSearch.option("value", "");
                }

            },
            itemTemplate: function (data) {
                return $("<div class='custom-item'>" +
                        "<img src='" + data.imgpath_thumb + "' />" +
                        "<div class='product-name'>" + data.designcode + "</div></div>");
            },
            visible:true
        }).dxAutocomplete("instance");
        DesignTreeView.variables.dx_txtbagNo = $("#dx_txtbagNo").dxAutocomplete({
            placeholder: "Search Bag No, Design Code, Category, Ref Code, Keywords ...",    
            mode: "search",
            dataSource: new DevExpress.data.CustomStore({   
                load: function (loadOptions) {
                    var deferred = $.Deferred();

                    var myfilter = { rules: [] };
                    myfilter.rules.push({ field: "SEARCH", op: "eq", data: loadOptions.searchValue });

                    var result;
                    $.ajax({
                        url: getDomain() + DesignTreeView.variables.BindProductListUrl + "&myfilters=" + JSON.stringify(myfilter),
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
                key:"pm_id",
            }),
            valueExpr: "bagno",
            onSelectionChanged: function (data) {
                $("#cart_panel").hide();
                $("#desgin_panel").show();
                if (data.selectedItem) {
                    DesignTreeView.variables.dx_ddlCategory.option({ value: "" });
                    DesignTreeView.variables.dx_ddlSubCategory.option({ value: "" });
                }
                else {
                    DesignTreeView.variables.dx_txtbagNo.option("value", "");
                }

                if (DesignTreeView.variables.ViewType == "Tiles") {
                    $("#div_DesignList").html("");
                    DesignTreeView.variables.DesignListArray = [];
                    PageIndex = 1;
                    DesignTreeView.GetDesignList(PageIndex, PageRecords);


                }
                else {
                    DesignTreeView.variables.dx_dataGrid.refresh();
                }
            },
            onFocusOut: function (data) {
                if (!data.component.option().selectedItem) {
                    DesignTreeView.variables.dx_txtbagNo.option("value", "");
                }
            },
            itemTemplate: function (data) {
                return $("<div class='custom-item'>" +
                        "<img src='" + data.imgpath_thumb + "' />" +
                        "<div class='product-name'>" + data.bagno + "</div></div>");
            },
            visible:false
        }).dxAutocomplete("instance");

        /*------------------------------/ categroy,subcategory,DesignCode filter----------------------------*/

        /*------------------------------sorting and view type options----------------------------*/
        DesignTreeView.variables.dx_tlbTools = $("#dx_tlbTools").dxToolbar({
            items: [
                 {
                     location: "after",
                     widget: "dxDropDownButton",
                     options: {
                         width: 135,
                         stylingMode: "",
                         displayExpr: "name",
                         keyExpr: "name",
                         useSelectMode: true,
                         selectedItemKey: "Virtual Stock",
                         onSelectionChanged: function (e) {
                             DesignTreeView.variables.StockType = e.item.name;
                  

                             if (DesignTreeView.variables.StockType == "Physical Stock") {
                                 DesignTreeView.variables.dx_txtbagNo.option({ visible: true });
                                 DesignTreeView.variables.dx_txtSearch.option({ visible: false });
                                 $(".physical").show();
                             }
                             else {
                                 DesignTreeView.variables.dx_txtbagNo.option({ visible: false });
                                 DesignTreeView.variables.dx_txtSearch.option({ visible: true });
                                 $(".physical").hide();
                             }

                             if (DesignTreeView.variables.ViewType == "Tiles") {
                                 $("#div_DesignList").html("");
                                 DesignTreeView.variables.DesignListArray = [];
                                 PageIndex = 1;
                                 DesignTreeView.GetDesignList(PageIndex, PageRecords);
                             }
                             else {
                               
                                 DesignTreeView.variables.dx_dataGrid.refresh();
                             }

                             if (DesignTreeView.variables.StockType == "Physical Stock") {
                                 $(".chkSelectDesign").hide();
                             }
                             

                             DesignTreeView.initializeDevExgrid();
                         },
                         items: [
                             { name: "Virtual Stock", icon: "" },
                             { name: "Physical Stock", icon: "" },
                         ],
                     }
                 },
                {
                    location: "after",
                    widget: "dxDropDownButton",
                    options: {
                        displayExpr: "name",
                        keyExpr: "id",
                        selectedItemKey: 1,
                        width: 150,
                        stylingMode: "icon",
                        useSelectMode: true,
                        onSelectionChanged: function (e) {
                            $("#cart_panel").hide();
                            $("#desgin_panel").show();
                            DesignTreeView.variables.selSortingColumn = e.item.column;
                            DesignTreeView.variables.selSortingOrder = e.item.order;

                            if (DesignTreeView.variables.ViewType == "Tiles") {
                                $("#div_DesignList").html("");
                                DesignTreeView.variables.DesignListArray = [];
                                PageIndex = 1;
                                DesignTreeView.GetDesignList(PageIndex, PageRecords);

                            }
                            else {
                                DesignTreeView.variables.dx_dataGrid.refresh();
                            }
                        },
                        items: [
                            { id: 1, name: "What's New", icon: " icon-new", column: "DESIGNCODE", order: "desc" },
                            { id: 2, name: "Design Code", icon: " icon-barcode2", column: "DESIGNCODE", order: "asc" },
                            { id: 3, name: "Popular", icon: " icon-stars", column: "MAXSOLD", order: "desc" },
                            { id: 4, name: "Price Low > High", icon: " icon-arrow-up16", column: "PRICE", order: "asc" },
                            { id: 5, name: "Price High > Low", icon: " icon-arrow-down16", column: "PRICE", order: "desc" },
                        ],
                    }
                },
                {
                    location: "after",
                    widget: "dxDropDownButton",
                    options: {
                        width: 100,
                        stylingMode: "icon",
                        displayExpr: "name",
                        keyExpr: "id",
                        useSelectMode: true,
                        selectedItemKey: 1,
                        onSelectionChanged: function (e) {
                            if (DesignTreeView.variables.dx_ddlCategory == "")
                                DesignTreeView.variables.dx_tlbTools.option({ disabled: true });
                            $("#cart_panel").hide();
                            $("#desgin_panel").show();
                            DesignTreeView.ChangeView(e.item.name);

                        
                        },
                        items: [
                            { id: 1, name: "Tiles", icon: " icon-images2" },
                            { id: 2, name: "Grid", icon: " icon-table2" },
                        ],
                    }
                },
                {
                    locateInMenu: 'always',
                    text: 'Price Setting',
                    onClick: function () {
                        $("#cart_panel").hide();
                        $("#desgin_panel").show();
                        $("#ModalPriceSetting").modal("show");
                    }
                },
                {
                    locateInMenu: 'always',
                    text: 'Share',
                    onClick: function () {
                        if (DesignTreeView.variables.StockType == "Physical Stock") {
                            DevExVariables.Toaster("warning", "You can not Share Physical Stock");
                            return;
                        }
                        $("#cart_panel").hide();
                        $("#desgin_panel").show();

                        if (DesignTreeView.variables.ViewType == "Tiles") {
                            if ($(".chkSelectDesign:checked").length > 0) {
                                DesignTreeView.ClearShareItemControlls();
                                $("#ModalSharing").modal('show');
                            }
                            else
                                DevExVariables.Toaster("warning", "Please select at least one design.");
                        }
                        else {
                            if (DesignTreeView.variables.dx_dataGrid.option().selectedRowKeys.length > 0) {
                                DesignTreeView.ClearShareItemControlls();
                                $("#ModalSharing").modal('show');
                            }
                            else
                                DevExVariables.Toaster("warning", "Please select at least one design.");
                        }
                    }
                },
                {
                    locateInMenu: 'always',
                    text: 'Web & App',
                    onClick: function () {
                        $("#cart_panel").hide();
                        $("#desgin_panel").show();
                        if (DesignTreeView.variables.StockType == "Physical Stock") {
                            DevExVariables.Toaster("warning", "You can not View Physical Stock");
                            return;
                        }
                        if (DesignTreeView.variables.ViewType == "Tiles") {
                            if ($(".chkSelectDesign:checked").length > 0)
                                $("#ModalCloudfilter").modal('show');
                            else
                                DevExVariables.Toaster("warning", "Please select atleast one design.");
                        }
                        else {
                            if (DesignTreeView.variables.dx_dataGrid.option().selectedRowKeys.length > 0)
                                $("#ModalCloudfilter").modal('show');
                            else
                                DevExVariables.Toaster("warning", "Please select atleast one design.");
                        }
                    }
                },
                {
                    locateInMenu: 'always',
                    text: 'Catalog',
                    onClick: function () {
                        if (DesignTreeView.variables.StockType == "Physical Stock") {
                            DevExVariables.Toaster("warning", "You can not Catalog Physical Stock");
                            return;
                        }
                        $("#cart_panel").hide();
                        $("#desgin_panel").show();
                        $("#ModalSelectionList").modal('show');
                    }
                },
            ]
        }).dxToolbar("instance");
        /*------------------------------/ sorting and view type options----------------------------*/

        /*------------------------------Date Filter----------------------------*/
        DesignTreeView.variables.dx_txtFromDate = $("#dx_txtFromDate").dxDateBox({
            type: "date",
            showClearButton: true,
            useMaskBehavior: true,
            displayFormat: "dd/M/yyyy",
        }).dxDateBox("instance");
        DesignTreeView.variables.dx_txtToDate = $("#dx_txtToDate").dxDateBox({
            type: "date",
            showClearButton: true,
            useMaskBehavior: true,
            displayFormat: "dd/M/yyyy",
        }).dxDateBox("instance");
        /*------------------------------/ Date Filter----------------------------*/

        /*------------------------------websites filter----------------------------*/
        DesignTreeView.variables.dx_ddlIsActive = $("#dx_ddlIsActive").dxSelectBox({
            items: DesignTreeView.variables.CloudFilterValueList,
            value: "1",
            displayExpr: "name",
            valueExpr: "id",
        }).dxSelectBox("instance");
        DesignTreeView.variables.dx_ddlDisWebB2B = $("#dx_ddlDisWebB2B").dxSelectBox({
            items: DesignTreeView.variables.CloudFilterValueList,
            value: "",
            displayExpr: "name",
            valueExpr: "id",
        }).dxSelectBox("instance");
        DesignTreeView.variables.dx_ddlDisAppB2B = $("#dx_ddlDisAppB2B").dxSelectBox({
            items: DesignTreeView.variables.CloudFilterValueList,
            value: "",
            displayExpr: "name",
            valueExpr: "id",
        }).dxSelectBox("instance");
        DesignTreeView.variables.dx_ddlDisWebB2C = $("#dx_ddlDisWebB2C").dxSelectBox({
            items: DesignTreeView.variables.CloudFilterValueList,
            value: "",
            displayExpr: "name",
            valueExpr: "id",
        }).dxSelectBox("instance");
        DesignTreeView.variables.dx_ddlDisAppB2C = $("#dx_ddlDisAppB2C").dxSelectBox({
            items: DesignTreeView.variables.CloudFilterValueList,
            value: "",
            displayExpr: "name",
            valueExpr: "id",
        }).dxSelectBox("instance");
        DesignTreeView.variables.dx_ddlDisOutlet = $("#dx_ddlDisOutlet").dxSelectBox({
            items: DesignTreeView.variables.CloudFilterValueList,
            value: "",
            displayExpr: "name",
            valueExpr: "id",
        }).dxSelectBox("instance");
        /*------------------------------/ websites filter----------------------------*/

        /*------------------------------Dia Wgt filter----------------------------*/
        DesignTreeView.variables.dx_rngDiaWgt = $("#dx_rngDiaWgt").dxRangeSlider({
            min: 0,
            max: 10,
            start: 0,
            end: 10,
            onValueChanged: function (data) {
                DesignTreeView.variables.dx_txtDiaWtFrom.option("value", data.start);
                DesignTreeView.variables.dx_txtDiaWtTo.option("value", data.end);
            }
        }).dxRangeSlider("instance");
        DesignTreeView.variables.dx_txtDiaWtFrom = $("#dx_txtDiaWtFrom").dxNumberBox({
            value: 0,
            min: 0,
            max: 10,
            showSpinButtons: false,
            onValueChanged: function (data) {
                DesignTreeView.variables.dx_rngDiaWgt.option("start", data.value);
            }
        }).dxNumberBox("instance");
        DesignTreeView.variables.dx_txtDiaWtTo = $("#dx_txtDiaWtTo").dxNumberBox({
            value: 10,
            min: 0,
            max: 10,
            showSpinButtons: false,
            onValueChanged: function (data) {
                DesignTreeView.variables.dx_rngDiaWgt.option("end", data.value);
            }
        }).dxNumberBox("instance");
        /*------------------------------/Dia Wgt filter----------------------------*/

        /*------------------------------Gold Wgt filter----------------------------*/
        DesignTreeView.variables.dx_rngGoldWgt = $("#dx_rngGoldWgt").dxRangeSlider({
            min: 0,
            max: 100,
            start: 0,
            end: 100,
            onValueChanged: function (data) {
                DesignTreeView.variables.dx_txtGoldWtFrom.option("value", data.start);
                DesignTreeView.variables.dx_txtGoldWtTo.option("value", data.end);
            }
        }).dxRangeSlider("instance");
        DesignTreeView.variables.dx_txtGoldWtFrom = $("#dx_txtGoldWtFrom").dxNumberBox({
            value: 0,
            min: 0,
            max: 100,
            showSpinButtons: false,
            onValueChanged: function (data) {
                DesignTreeView.variables.dx_rngGoldWgt.option("start", data.value);
            }
        }).dxNumberBox("instance");
        DesignTreeView.variables.dx_txtGoldWtTo = $("#dx_txtGoldWtTo").dxNumberBox({
            value: 100,
            min: 0,
            max: 100,
            showSpinButtons: false,
            onValueChanged: function (data) {
                DesignTreeView.variables.dx_rngGoldWgt.option("end", data.value);
            }
        }).dxNumberBox("instance");
        /*------------------------------/Gold Wgt filter----------------------------*/

        /*------------------------------Price filter----------------------------*/
        DesignTreeView.variables.dx_rngPrice = $("#dx_rngPrice").dxRangeSlider({
            min: 0,
            max: 9999999,
            start: 0,
            end: 9999999,
            onValueChanged: function (data) {
                DesignTreeView.variables.dx_txtPriceFrom.option("value", data.start);
                DesignTreeView.variables.dx_txtPriceTo.option("value", data.end);
            }
        }).dxRangeSlider("instance");
        DesignTreeView.variables.dx_txtPriceFrom = $("#dx_txtPriceFrom").dxNumberBox({
            value: 0,
            min: 0,
            max: 9999999,
            showSpinButtons: false,
            onValueChanged: function (data) {
                DesignTreeView.variables.dx_rngPrice.option("start", data.value);
            }
        }).dxNumberBox("instance");
        DesignTreeView.variables.dx_txtPriceTo = $("#dx_txtPriceTo").dxNumberBox({
            value: 9999999,
            min: 0,
            max: 9999999,
            showSpinButtons: false,
            onValueChanged: function (data) {
                DesignTreeView.variables.dx_rngPrice.option("end", data.value);
            }
        }).dxNumberBox("instance");
        /*------------------------------/Price filter----------------------------*/

        /*------------------------------Shape,Charni filter----------------------------*/
        DesignTreeView.variables.dx_tagCharniGroup = $("#dx_tagCharniGroup").dxTagBox({
            searchEnabled: true,
            placeholder: "Select Charni Group...",
            onValueChanged: function (data) {
                DesignTreeView.variables.dx_tagCharni.option({
                    items: [],
                    value: "",
                });
                if (data.component.option().value.length > 0) {
                    var shape = $(".shapeactive").attr("id");
                    if (shape != 'RBC' || shape != 'ASSCHER' || shape != 'PRINCESS' || shape != 'CHOKI' || shape != 'PEAR' || shape != 'PIE') {
                        DesignTreeView.GetDiamondCharni(shape, data.component.option().value.toString());
                    }
                }
            }
        }).dxTagBox("instance");
        DesignTreeView.variables.dx_tagCharni = $("#dx_tagCharni").dxTagBox({
            searchEnabled: true,
            placeholder: "Select Charni...",
            onValueChanged: function (data) {

            }
        }).dxTagBox("instance");
        DesignTreeView.variables.dx_tagConcept = $("#dx_tagConcept").dxTagBox({
            searchEnabled: true,
            placeholder: "Select Concept...",
        }).dxTagBox("instance");
        DesignTreeView.variables.dx_tagStockType = $("#dx_tagStockType").dxTagBox({
          
            items: DesignTreeView.variables.StockTypeList,
            displayExpr: "name",
            valueExpr: "name",
            searchEnabled: true,
            placeholder: "Select Stock Type...",
        }).dxTagBox("instance");
        DesignTreeView.variables.dx_tagStockStatus = $("#dx_tagStockStatus").dxTagBox({
            items: DesignTreeView.variables.StockStatusList,
            displayExpr: "name",
            valueExpr: "name",
            searchEnabled: true,
            placeholder: "Select Stock Status...",
        }).dxTagBox("instance");
        DesignTreeView.variables.dx_tagMetalType = $("#dx_tagMetalType").dxTagBox({
            valueExpr: "name",
            searchEnabled: true,
            placeholder: "Select Metal Type...",
        }).dxTagBox("instance");
        DesignTreeView.variables.dx_tagPurity = $("#dx_tagPurity").dxTagBox({
            valueExpr: "name",
            searchEnabled: true,
            placeholder: "Select Metal Purity...",
        }).dxTagBox("instance");
        DesignTreeView.variables.dx_tagColor = $("#dx_tagColor").dxTagBox({
            valueExpr: "name",
            searchEnabled: true,
            placeholder: "Select Metal Color...",
        }).dxTagBox("instance");
        DesignTreeView.variables.dx_tagDiaPurity = $("#dx_tagDiaPurity").dxTagBox({
            valueExpr: "name",
            searchEnabled: true,
            placeholder: "Select Diamond Purity...",
        }).dxTagBox("instance");
        DesignTreeView.variables.dx_tagDiaColour = $("#dx_tagDiaColour").dxTagBox({
            valueExpr: "name",
            searchEnabled: true,
            placeholder: "Select Diamond Color...",
        }).dxTagBox("instance");
        /*------------------------------/Shape,Charni filter----------------------------*/

        DesignTreeView.variables.dx_btnApply = $("#dx_btnApply").dxButton({
            icon: "check",
            text: "Apply",
            type: "success",
            useSubmitBehavior: false,
            onClick: function (e) {
                DesignTreeView.ApplyFilter();
            }
        }).dxButton("instance");
        DesignTreeView.variables.dx_btnReset = $("#dx_btnReset").dxButton({
            icon: "undo",
            stylingMode: "outlined",
            text: "Reset",
            type: "default",
            useSubmitBehavior: false,
            onClick: function (e) {
                DesignTreeView.ResetFilter();
                $(".chkSelectDesign").hide();
            }
        }).dxButton("instance");

        /*------------------------------websites filter----------------------------*/
        DesignTreeView.variables.dx_chngIsActive = $("#dx_chngIsActive").dxSelectBox({
            items: DesignTreeView.variables.CloudValueUpdateList,
            value: "",
            displayExpr: "name",
            valueExpr: "id",
        }).dxSelectBox("instance");
        DesignTreeView.variables.dx_chngDisWebB2B = $("#dx_chngDisWebB2B").dxSelectBox({
            items: DesignTreeView.variables.CloudValueUpdateList,
            value: "",
            displayExpr: "name",
            valueExpr: "id",
        }).dxSelectBox("instance");
        DesignTreeView.variables.dx_chngDisAppB2B = $("#dx_chngDisAppB2B").dxSelectBox({
            items: DesignTreeView.variables.CloudValueUpdateList,
            value: "",
            displayExpr: "name",
            valueExpr: "id",
        }).dxSelectBox("instance");
        DesignTreeView.variables.dx_chngDisOutlet = $("#dx_chngDisOutlet").dxSelectBox({
            items: DesignTreeView.variables.CloudValueUpdateList,
            value: "",
            displayExpr: "name",
            valueExpr: "id",
        }).dxSelectBox("instance");
        DesignTreeView.variables.dx_chngDisWebB2C = $("#dx_chngDisWebB2C").dxSelectBox({
            items: DesignTreeView.variables.CloudValueUpdateList,
            value: "",
            displayExpr: "name",
            valueExpr: "id",
        }).dxSelectBox("instance");
        DesignTreeView.variables.dx_chngDisAppB2C = $("#dx_chngDisAppB2C").dxSelectBox({
            items: DesignTreeView.variables.CloudValueUpdateList,
            value: "",
            displayExpr: "name",
            valueExpr: "id",
        }).dxSelectBox("instance");
        /*------------------------------/ websites filter----------------------------*/

        /*----------------------------Price setting--------------------------*/
        DesignTreeView.variables.dx_txtPriceAcc = $("#dx_txtPriceAcc").dxAutocomplete({
            placeholder: "Search Account ...",
            mode: "search",
            dataSource: new DevExpress.data.CustomStore({
                load: function (loadOptions) {
                    var deferred = $.Deferred();

                    var myfilter = { rules: [] };
                    myfilter.rules.push({ field: "ACCOUNTNAME", op: "cn", data: loadOptions.searchValue });

                    var result;
                    $.ajax({
                        url: getDomain() + DesignTreeView.variables.BindAccListUrl + "&myfilters=" + JSON.stringify(myfilter),
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
                key: "accid",
            }),
            valueExpr: "accountname",
            onSelectionChanged: function (data) {
                DesignTreeView.variables.selPriceAccId = data.component.option().selectedItem.accid;
                DesignTreeView.variables.selPriceAccName = data.component.option().selectedItem.accountname;
            },
            onFocusOut: function (data) {
                if (!data.component.option().selectedItem) {
                    DesignTreeView.variables.dx_txtPriceAcc.option("value", "");
                    DesignTreeView.variables.selPriceAccId = "";
                    DesignTreeView.variables.selPriceAccName = "";
                }
            },
        }).dxAutocomplete("instance");
        DesignTreeView.variables.dx_ddlPriceDiaPurity = $("#dx_ddlPriceDiaPurity").dxSelectBox({
            searchEnabled: true,
            placeholder: "Select Purity...",
        }).dxSelectBox("instance");
        DesignTreeView.variables.dx_ddlPriceDiaColor = $("#dx_ddlPriceDiaColor").dxSelectBox({
            searchEnabled: true,
            placeholder: "Select Color...",
        }).dxSelectBox("instance");
        DesignTreeView.variables.dx_btnSavePriceSetting = $("#dx_btnSavePriceSetting").dxButton({
            stylingMode: "outlined",
            icon: "",
            text: "ok",
            type: "default",
            useSubmitBehavior: false,
            visible: true,
            onClick: function (e) {
                DesignTreeView.SavePriceSetting();
            }
        }).dxButton("instance");
        /*----------------------------/ Price setting--------------------------*/

        /*------------------------------Catalog options----------------------------*/
        DesignTreeView.variables.dx_StockType = $("#dx_StockType").dxToolbar({
            visible: true,
            items: [
               {
                     location: "after",
                     widget: "dxDropDownButton",
                     options: {
                         width: 135,
                         stylingMode: "outlined",
                         displayExpr: "name",
                         keyExpr: "name",
                         useSelectMode: true,
                         selectedItemKey: "Virtual Stock",
                         onSelectionChanged: function (e) {
                             DesignTreeView.variables.CartStockType = e.item.name;
                             //DesignTreeView.variables.dx_gridSelectionItem_CartList.clearSelection();

                             if (e.item.name == "Virtual Stock") {
                                 DesignTreeView.variables.dx_Carttool.option().items[0].options.visible = false;
                                 DesignTreeView.variables.dx_Carttool.option().items[1].options.visible = true;
                                 DesignTreeView.variables.dx_Carttool.option().items[2].options.visible = true;
                                 DesignTreeView.variables.dx_Carttool.option().items[3].options.visible = true;
                                 DesignTreeView.variables.dx_Carttool.option().items[4].options.visible = true;
                                 //DesignTreeView.variables.dx_gridSelectionItem_CartList.columnOption("Bag No", "visible", false);
                                 DesignTreeView.variables.dx_ddlSubBookMaster.option({ visible: false });
                                 $(".subbook").hide();
                             }
                             else {
                                 DesignTreeView.variables.dx_Carttool.option().items[0].options.visible = true;
                                 DesignTreeView.variables.dx_Carttool.option().items[1].options.visible = false;
                                 DesignTreeView.variables.dx_Carttool.option().items[2].options.visible = false;
                                 DesignTreeView.variables.dx_Carttool.option().items[3].options.visible = false;
                                 DesignTreeView.variables.dx_Carttool.option().items[4].options.visible = false;
                                 //DesignTreeView.variables.dx_gridSelectionItem_CartList.columnOption("Bag No", "visible", true);
                                 DesignTreeView.variables.dx_ddlSubBookMaster.option({ visible: true });
                                 $(".subbook").show();
                             }

                             DesignTreeView.variables.dx_Carttool.repaint();
                             DesignTreeView.initDevExgridSelItem_CartList();
                         },
                         items: [
                             { name: "Virtual Stock" },
                             { name: "Physical Stock" },
                         ],
                     }
                 },
            ]
        }).dxToolbar("instance");
        DesignTreeView.variables.dx_btnViewSelectionList = $("#dx_btnViewSelectionList").dxButton({
            stylingMode: "outlined",
            icon: "bulletlist",
            text: "View List",
            type: "default",
            visible: true,
            useSubmitBehavior: false,
            onClick: function (e) {
                DesignTreeView.ClearSelListMas();
            }
        }).dxButton("instance");
        DesignTreeView.variables.dx_btnCancel = $("#dx_btnCancel").dxButton({
            icon: "close",
            text: "Cancel",
            type: "danger",
            visible: false,
            useSubmitBehavior: false,
            onClick: function (e) {
                if (DesignTreeView.variables.CatalogOpr == "Add") {
                    DesignTreeView.ClearCatalogControls();
                }
                else {
                    DesignTreeView.ClearSelListMas();
                }
            }
        }).dxButton("instance");
        DesignTreeView.variables.dx_btnAddSelectionList = $("#dx_btnAddSelectionList").dxButton({
            stylingMode: "outlined",
            icon: "plus",
            text: "Add New",
            type: "default",
            useSubmitBehavior: false,
            visible: true,
            onClick: function (e) {
                DesignTreeView.variables.CatalogOpr = "Add";
                DesignTreeView.variables.dx_txtSelectionListName.option({ value: DesignTreeView.GetCatalogName() });
                DesignTreeView.variables.dx_txtSelectionListRemark.option({ value: "" });
                $(".Addcatalog").show();
                $(".Editcatalog").hide();
                $("#FrmCatalogList").hide();
                $("#FrmCatalogItemList").hide();
                $("#FrmShareCatalog").hide();
                $("#FrmCatalogEntry").show();
                DesignTreeView.variables.dx_btnAddSelectionList.option({ visible: false });
                DesignTreeView.variables.dx_btnViewSelectionList.option({ visible: false });
                DesignTreeView.variables.dx_btnCancel.option({ visible: true });
                DesignTreeView.variables.dx_btnSaveSelectionList.option({ visible: true });
            }
        }).dxButton("instance");
        DesignTreeView.variables.dx_txtAutoComplite_PartyList = $("#dx_txtAutoComplite_PartyList").dxAutocomplete({
            placeholder: "Select Party Name...",
            mode: "search",
            visible: false,
            dataSource: new DevExpress.data.CustomStore({
                load: function (loadOptions) {
                    var deferred = $.Deferred();
                    $.ajax({
                        url: getDomain() + DesignTreeView.variables.BindAccListUrl + "&_search=true&searchField=ACCOUNTNAME&searchOper=cn&searchString=" + loadOptions.searchValue,
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
                return $("<div>" + data.accountname + "</div>");
            },
            onSelectionChanged: function (data) {
                if (data.selectedItem) {
                    DesignTreeView.variables.dx_txtCatalogSharingEmailId.option({ value: data.selectedItem.emailid });
                    DesignTreeView.variables.dx_txtCatalogMobileNo.option({ value: data.selectedItem.mobile1 });
                }
                else {
                    DesignTreeView.variables.dx_txtCatalogSharingEmailId.option("value", "");
                    DesignTreeView.variables.dx_txtCatalogMobileNo.option("value", "");
                }
            },
        }).dxAutocomplete("instance");
        DesignTreeView.variables.dx_catalogtool = $("#dx_catalogtool").dxToolbar({
            visible: false,
            items: [
                {
                    location: "after",
                    widget: "dxButton",
                    options: {
                        stylingMode: "outlined",
                        icon: "bulletlist",
                        text: "Quotation",
                        type: "normal",
                        useSubmitBehavior: false,
                        onClick: function (e) {
                            if (DesignTreeView.variables.dx_gridSelectionItemList.option().selectedRowKeys.length > 0) {

                                if (!DesignTreeView.variables.dx_txtAutoComplite_PartyList.option().selectedItem) {
                                    DevExVariables.Toaster("warning", "Party Name is required.");
                                    return;
                                }

                                var DesignIdList = [];
                                $(DesignTreeView.variables.dx_gridSelectionItemList.getSelectedRowsData()).each(function (key, obj) {
                                    DesignIdList.push(obj.dm_id);
                                });

                                data = {
                                    "oper": "add",
                                    "ACCID": DesignTreeView.variables.dx_txtAutoComplite_PartyList.option().selectedItem.accid,
                                    "DM_ID_LIST": DesignIdList.toString(),
                                }

                                $.ajax({
                                    url: getDomain() + DesignTreeView.variables.PerformMasterelctionCRUD,
                                    data: data,
                                    async: false,
                                    cache: false,
                                    type: 'POST',
                                    success: function (data) {
                                        if ($(data).find('RESPONSECODE').text() == "0") {
                                            DevExVariables.Toaster("success", 'Quotation: ' + $(data).find('QUOTATIONCODE').text() + ' Generated Successfully.');
                                            DesignTreeView.variables.dx_gridSelectionItemList.clearSelection();
                                        }
                                    },
                                    error: OnError,
                                });
                            }
                            else {
                                DevExVariables.Toaster("warning", "Please select at least one item.");
                            }
                        }
                    }
                },
                {
                    location: "after",
                    widget: "dxButton",
                    options: {
                        stylingMode: "outlined",
                        icon: "bulletlist",
                        text: "Order",
                        type: "success",
                        useSubmitBehavior: false,
                        onClick: function (e) {
                            if (DesignTreeView.variables.dx_gridSelectionItemList.option().selectedRowKeys.length > 0) {
                                if (!DesignTreeView.variables.dx_txtAutoComplite_PartyList.option().selectedItem) {
                                    DevExVariables.Toaster("warning", "Party Name is required.");
                                    return;
                                }

                                var DesignIdList = [];
                                $(DesignTreeView.variables.dx_gridSelectionItemList.getSelectedRowsData()).each(function (key, obj) {
                                    DesignIdList.push(obj.dm_id);
                                });

                                data = {
                                    "oper": "add",
                                    "ACCID": DesignTreeView.variables.dx_txtAutoComplite_PartyList.option().selectedItem.accid,
                                    "DM_ID_LIST": DesignIdList.toString(),
                                }

                                $.ajax({
                                    url: getDomain() + DesignTreeView.variables.PerformOrderMasterCRUD,
                                    data: data,
                                    async: false,
                                    cache: false,
                                    type: 'POST',
                                    success: function (data) {
                                        if ($(data).find('RESPONSECODE').text() == "0") {
                                            DevExVariables.Toaster("success", 'Order: ' + $(data).find('ORDERCODE').text() + ' Generated Successfully.');
                                            DesignTreeView.variables.dx_gridSelectionItemList.clearSelection();
                                        }
                                    },
                                    error: OnError,
                                });
                            }
                            else {
                                DevExVariables.Toaster("warning", "Please select at least one item.");
                            }
                        }
                    }
                },
                {
                    location: "after",
                    widget: "dxButton",
                    options: {
                        stylingMode: "outlined",
                        icon: "share",
                        text: "Share",
                        type: "default",
                        useSubmitBehavior: false,
                        onClick: function (e) {
                            if (!DesignTreeView.variables.dx_txtAutoComplite_PartyList.option().selectedItem) {
                                DevExVariables.Toaster("warning", "Party Name is required.");
                                return;
                            }

                            if (DesignTreeView.variables.dx_gridSelectionItemList.option().selectedRowKeys.length > 0) {
                                $("#FrmCatalogEntry").hide();
                                $("#FrmCatalogItemList").hide();
                                $("#FrmCatalogList").hide();
                                $("#FrmShareCatalog").show();
                                DesignTreeView.ClearShareCatalogControlls();
                            }
                            else {
                                DevExVariables.Toaster("warning", "Please select at least one item.");
                            }
                        }
                    }
                },
                {
                    location: "after",
                    widget: "dxButton",
                    options: {
                        stylingMode: "outlined",
                        icon: "trash",
                        text: "Delete",
                        type: "danger",
                        useSubmitBehavior: false,
                        onClick: function (e) {
                            debugger;
                            if (DesignTreeView.variables.dx_gridSelectionItemList.option().selectedRowKeys.length > 0) {
                                DesignTreeView.variables.SelListSelectedItems = DesignTreeView.variables.dx_gridSelectionItemList.option().selectedRowKeys;
                                DesignTreeView.variables.dx_popupSelListItemsDelete = $("#dx_popupSelListDelete").dxPopup(DesignTreeView.variables.DeleteSelListItemsOptions).dxPopup("instance");
                                DesignTreeView.variables.dx_popupSelListItemsDelete.show();
                            }
                            else {
                                DevExVariables.Toaster("warning", "Please select at least one item.");
                            }
                        }
                    }
                },
                {
                    location: "after",
                    widget: "dxButton",
                    options: {
                        stylingMode: "outlined",
                        icon: "back",
                        text: "Back",
                        type: "default",
                        useSubmitBehavior: false,
                        onClick: function (e) {
                            $("#FrmCatalogList").show();
                            $("#FrmCatalogEntry").hide();
                            $("#FrmCatalogItemList").hide();
                            DesignTreeView.variables.dx_btnViewSelectionList.option({ visible: false });
                            DesignTreeView.variables.dx_btnAddSelectionList.option({ visible: true });
                            DesignTreeView.variables.dx_btnSaveSelectionList.option({ visible: false });
                            DesignTreeView.variables.dx_btnBackFromList.option({ visible: true });
                            DesignTreeView.variables.dx_txtAutoComplite_PartyList.option({ visible: false });
                            DesignTreeView.variables.dx_catalogtool.option({ visible: false });
                            DesignTreeView.variables.dx_gridSelectionList.refresh();
                        }
                    }
                },
            ]
        }).dxToolbar("instance");
        DesignTreeView.variables.dx_txtSelectionListName = $("#dx_txtSelectionListName").dxTextBox({
            placeholder: "Enter Selection List Name ...",
        }).dxTextBox("instance");
        DesignTreeView.variables.dx_txtAutoSelecList = $("#dx_txtAutoSelecList").dxAutocomplete({
            placeholder: "Selection List ...",
            mode: "search",
            dataSource: new DevExpress.data.CustomStore({
                load: function (loadOptions) {
                    var deferred = $.Deferred();

                    var result;
                    $.ajax({
                        url: getDomain() + DesignTreeView.variables.BindSelectionListUrl + "&_search=true&searchField=LISTNAME&searchOper=cn&searchString=" + loadOptions.searchValue,
                        async: false,
                        cache: false,
                        type: 'POST',
                        success: function (data) {
                            //$("#cart_panel").hide();
                            //$("#desgin_panel").show();
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
                key: "listid",
            }),
            valueExpr: "listname",
            itemTemplate: function (data) {
                return $("<div>" + data.listname + " (items: " + (data.total_items || 0) + ")</div>");
            },
        }).dxAutocomplete("instance");
        DesignTreeView.variables.dx_txtSelectionListRemark = $("#dx_txtSelectionListRemark").dxTextArea({
            height: 90
        }).dxTextArea("instance");
        DesignTreeView.variables.dx_btnSaveSelectionList = $("#dx_btnSaveSelectionList").dxButton({
            icon: "fa fa-save",
            text: "Save",
            type: "success",
            useSubmitBehavior: false,
            visible: true,
            onClick: function (e) {
                DesignTreeView.SaveSelectionList();
            }
        }).dxButton("instance");
        DesignTreeView.variables.dx_btnBackFromList = $("#dx_btnBackFromList").dxButton({
            stylingMode: "outlined",
            icon: "back",
            text: "Back",
            type: "default",
            useSubmitBehavior: false,
            visible: true,
            onClick: function (e) {
                DesignTreeView.ClearCatalogControls();
            }
        }).dxButton("instance");
        DesignTreeView.variables.dx_CatalogRadioSocial = $("#dx_CatalogRadioSocial").dxRadioGroup({
            items: ["WhatsApp", "SMS", "E-Mail"],
            layout: "horizontal",
            value: "WhatsApp",
            onValueChanged: function (e) {
                if (e.value == "E-Mail") {
                    $(".CatalogMobileShare").hide();
                    $(".CatalogEmailSharing").show();
                }
                else {
                    $(".CatalogEmailSharing").hide();
                    $(".CatalogMobileShare").show();
                }
            }
        }).dxRadioGroup("instance");
        DesignTreeView.variables.dx_txtCatalogMobileNo = $("#dx_txtCatalogMobileNo").dxTextBox({ mode: "number" }).dxTextBox("instance");
        DesignTreeView.variables.dx_txtCatalogShareMessage = $("#dx_txtCatalogShareMessage").dxTextArea({
            height: 90,
            value: 'Dear Sir, ' + $("#hdn_UserName").val() + ' shared a design from TrinityJewells with you. Kindly click on below URL to view shared Design. {SHARE URL}',
        }).dxTextArea("instance");
        DesignTreeView.variables.dx_txtCatalogSharingSubject = $("#dx_txtCatalogSharingSubject").dxTextBox({
            value: "Jewellery Designs shared by TrinityJewells"
        }).dxTextBox("instance");
        DesignTreeView.variables.dx_txtCatalogSharingEmailId = $("#dx_txtCatalogSharingEmailId").dxTextBox({ placeholder: "Enter Email Id..." }).dxTextBox("instance");
        DesignTreeView.variables.dx_txtCatalogSharingEmailBody = $("#dx_txtCatalogSharingEmailBody").dxHtmlEditor({
            height: 350,
            toolbar: {
                items: [
                    "undo", "redo", "separator",
                    {
                        formatName: "size",
                        formatValues: ["8pt", "10pt", "12pt", "14pt", "18pt", "24pt", "36pt"]
                    },
                    {
                        formatName: "font",
                        formatValues: ["Arial", "Courier New", "Georgia", "Impact", "Lucida Console", "Tahoma", "Times New Roman", "Verdana"]
                    },
                    "separator",
                    "bold", "italic", "strike", "underline", "separator",
                    "alignLeft", "alignCenter", "alignRight", "alignJustify", "separator",
                    "color", "background"
                ]
            },
            mediaResizing: {
                enabled: true
            },
            value: DesignTreeView.variables.content,
            onValueChanged: function (e) {
                //$(".value-content").text(e.component.option("value"));
            }
        }).dxHtmlEditor("instance");
        DesignTreeView.variables.dx_btnCatalogSubmitShare = $("#dx_btnCatalogSubmitShare").dxButton({
            stylingMode: "outlined",
            icon: "fa fa-paper-plane",
            text: "Send",
            type: "default",
            useSubmitBehavior: false,
            visible: true,
            onClick: function (e) {
                DesignTreeView.SaveCatalogSharingDetails();
            }
        }).dxButton("instance");
        DesignTreeView.variables.dx_btnBacktoList = $("#dx_btnBacktoList").dxButton({
            stylingMode: "outlined",
            icon: "back",
            text: "Back",
            type: "normal",
            useSubmitBehavior: false,
            visible: true,
            onClick: function (e) {
                DesignTreeView.ViewCatalogItemList();
            }
        }).dxButton("instance");
        /*------------------------------/Catalog options----------------------------*/

        /*------------------------------Cart Catalog options----------------------------*/
        DesignTreeView.variables.dx_txtAutoComplite_PartyList_Cart = $("#dx_txtAutoComplite_PartyList_Cart").dxAutocomplete({
            placeholder: "Select Party Name...",
            mode: "search",
            visible: true,
            dataSource: new DevExpress.data.CustomStore({
                load: function (loadOptions) {
                    var deferred = $.Deferred();

                    $.ajax({
                        url: getDomain() + DesignTreeView.variables.BindAccListUrl + "&_search=true&searchField=ACCOUNTNAME&searchOper=cn&searchString=" + loadOptions.searchValue,

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
                return $("<div>" + data.accountname + "</div>");
            },
        }).dxAutocomplete("instance");
        DesignTreeView.variables.dx_Carttool = $("#dx_Carttool").dxToolbar({
            visible: true,
            items: [
                
                {
                    location: "after",
                    widget: "dxButton",
                    options: {
                        stylingMode: "outlined",
                        icon: "",
                        text: "Jewellery Transaction",
                        type: "default",
                        useSubmitBehavior: false,
                        visible: false,
                        onClick: function (e) {
                            if (DesignTreeView.variables.dx_gridSelectionItem_CartList.option().selectedRowKeys.length > 0) {
                                DesignTreeView.variables.dx_txtAutoComplite_PartyList_Cart.option({ "value": "" }, { "items": "" }, { "selectedItem": "" });
                                DesignTreeView.variables.IsGenerateOrder = "Jewellery Transaction";
                                $("#modalQuotation .modal-title").text("Generate Jewellery Transaction");
                                $("#modalQuotation").modal("show");
                            }
                            else {
                                DevExVariables.Toaster("warning", "Please select at least one item.");
                            }
                        }
                    }
                },
                {
                    location: "after",
                    widget: "dxButton",
                    options: {
                        stylingMode: "outlined",
                        icon: "fa fa-book",
                        text: "Catalog",
                        type: "default",
                        useSubmitBehavior: false,
                        visible: true,
                        onClick: function (e) {
                            if (DesignTreeView.variables.dx_gridSelectionItem_CartList.option().selectedRowKeys.length > 0) {
                                $("#ModalSelectionList").modal("show");
                            }
                            else {
                                DevExVariables.Toaster("warning", "Please select at least one item.");
                            }
                        }
                    }
                },
                { 
                    location: "after",
                    widget: "dxButton",
                    options: {
                        stylingMode: "outlined",
                        icon: "bulletlist",
                        text: "Quotation",
                        type: "normal",
                        useSubmitBehavior: false,
                        onClick: function (e) {
                            if (DesignTreeView.variables.dx_gridSelectionItem_CartList.option().selectedRowKeys.length > 0) {
                                DesignTreeView.variables.dx_txtAutoComplite_PartyList_Cart.option({ "value": "" }, { "items": "" }, { "selectedItem": "" });
                                DesignTreeView.variables.IsGenerateOrder = "Quotation";
                                $("#modalQuotation .modal-title").text("Generate Quotation");
                                $("#modalQuotation").modal("show");
                            }
                            else {
                                DevExVariables.Toaster("warning", "Please select at least one item.");
                            }
                        }
                    }
                },
                {
                    location: "after",
                    widget: "dxButton",
                    options: {
                        stylingMode: "outlined",
                        icon: "bulletlist",
                        displayExpr: "name",
                        valueExpr: "name",
                        text: "Order",
                        type: "success",
                        useSubmitBehavior: false,
                        onClick: function (e) {
                            if (DesignTreeView.variables.dx_gridSelectionItem_CartList.option().selectedRowKeys.length > 0) {
                                DesignTreeView.variables.dx_txtAutoComplite_PartyList_Cart.option({ "value": "" }, { "items": "" }, { "selectedItem": "" });
                                DesignTreeView.variables.IsGenerateOrder = "Order";
                                $("#modalQuotation .modal-title").text("Generate Order");
                                $("#modalQuotation").modal("show");
                            }
                            else {
                                DevExVariables.Toaster("warning", "Please select at least one item.");
                            }
                        }
                    }
                },
                {
                    location: "after",
                    widget: "dxButton",
                    options: {
                        stylingMode: "outlined",
                        icon: "share",
                        text: "Share",
                        type: "default",
                        useSubmitBehavior: false,
                        onClick: function (e) {
                            if (DesignTreeView.variables.dx_gridSelectionItem_CartList.option().selectedRowKeys.length > 0) {
                                DesignTreeView.ClearShareItemControlls();
                                $("#ModalSharing").modal("show");
                            }
                            else {
                                DevExVariables.Toaster("warning", "Please select at least one item.");
                            }
                        }
                    }
                },
                {
                    location: "after",
                    widget: "dxButton",
                    options: {
                        stylingMode: "outlined",
                        icon: "trash",
                        text: "Delete",
                        type: "danger",
                        useSubmitBehavior: false,
                        onClick: function (e) {
                            DesignTreeView.variables.SelListSelectedItems_Cart = [];
                            if (DesignTreeView.variables.dx_gridSelectionItem_CartList.option().selectedRowKeys.length > 0) {
                                DesignTreeView.variables.SelListSelectedItems_Cart = DesignTreeView.variables.dx_gridSelectionItem_CartList.option().selectedRowKeys;
                                DesignTreeView.variables.dx_popupSelListItemsDelete_Cart = $("#dx_popupSelListDelete_Cart").dxPopup(DesignTreeView.variables.DeleteSelListItemsOptions_Cart).dxPopup("instance");
                                DesignTreeView.variables.dx_popupSelListItemsDelete_Cart.show();
                            }
                            else {
                                DevExVariables.Toaster("warning", "Please select atleast one item.");
                            }
                        }
                    }
                },
                {
                    location: "after",
                    widget: "dxButton",
                    options: {
                        stylingMode: "outlined",
                        icon: "back",
                        text: "Back",
                        type: "default",
                        useSubmitBehavior: false,
                        onClick: function (e) {
                            $("#cart_panel").hide();
                            $("#desgin_panel").show();
                            DesignTreeView.variables.IsfromCart = false;
                        }
                    }
                },
            ]
        }).dxToolbar("instance");
        DesignTreeView.variables.dx_btnAddCatalog_Cart = $("#dx_btnAddCatalog_Cart").dxButton({
            stylingMode: "outlined",
            icon: "fa fa-plus",
            text: "Add New",
            type: "normal",
            useSubmitBehavior: false,
            visible: true,
            onClick: function (e) {

            }
        }).dxButton("instance");
        DesignTreeView.variables.dx_txtAutoSelecList_Cart = $("#dx_txtAutoSelecList_Cart").dxAutocomplete({
            placeholder: "Selection List ...",
            mode: "search",
            dataSource: new DevExpress.data.CustomStore({
                load: function (loadOptions) {
                    var deferred = $.Deferred();

                    var result;
                    $.ajax({
                        url: getDomain() + DesignTreeView.variables.BindSelectionListUrl + "&_search=true&searchField=LISTNAME&searchOper=cn&searchString=" + loadOptions.searchValue,
                        async: false,
                        cache: false,
                        type: 'POST',
                        success: function (data) {
                            $("#cart_panel").show();
                            $("#desgin_panel").hide();
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
                key: "listid",
            }),
            valueExpr: "listname",
            itemTemplate: function (data) {
                return $("<div>" + data.listname + " (items: " + (data.total_items || 0) + ")</div>");
            },
        }).dxAutocomplete("instance")
        DesignTreeView.variables.dx_txtCatalogName_Cart = $("#dx_txtCatalogName_Cart").dxTextBox({
            placeholder: "Enter Selection List Name ...",
        }).dxTextBox("instance");
        DesignTreeView.variables.dx_txtCatalogRemark_Cart = $("#dx_txtCatalogRemark_Cart").dxTextArea({
            height: 90
        }).dxTextArea("instance");
        DesignTreeView.variables.dx_btnSave_GenerateCatalog = $("#dx_btnSave_GenerateCatalog").dxButton({
            stylingMode: "outlined",
            icon: "fa fa-save",
            text: "Save",
            type: "default",
            useSubmitBehavior: false,
            visible: false,
            onClick: function (e) {

                if (!DesignTreeView.variables.dx_txtAutoSelecList_Cart.option().selectedItem) {
                    DevExVariables.Toaster("warning", 'Please select any Selection List.');
                    return;
                }

                var data = {
                    "LISTID": DesignTreeView.variables.dx_txtAutoSelecList_Cart.option().selectedItem.listid,
                    "DM_ID": DesignTreeView.variables.dx_gridSelectionItem_CartList.option().selectedRowKeys.toString(),
                    "oper": "addSingleItem",
                }

                $.ajax({
                    url: getDomain() + DesignTreeView.variables.PerformSelectionListurl,
                    data: data,
                    async: false,
                    cache: false,
                    type: 'POST',
                    success: function (data) {
                        if ($(data).find("RESPONSECODE").text() == 0) {
                            DevExVariables.Toaster("success", 'Design added successfully to the selected list.');
                            $("#modalGeneratecatalog").modal("hide");

                            /*------------------------- Remove Cart --------------------------------------*/
                            var data =
                                {
                                    "DESIGNIDLIST": DesignTreeView.variables.dx_gridSelectionItem_CartList.option().selectedRowKeys.toString(),
                                    "oper": "delete",
                                }

                            $.ajax({
                                url: getDomain() + DesignTreeView.variables.PerformSelectionList_CartList,
                                data: data,
                                async: false,
                                cache: false,
                                type: 'POST',
                                success: function (data) {
                                    if ($(data).find("RESPONSECODE").text() == 0) {
                                        DevExVariables.Toaster("success", 'Items are deleted successfully.');
                                        DesignTreeView.variables.dx_gridSelectionItem_CartList.deselectAll();
                                        DesignTreeView.variables.dx_gridSelectionItem_CartList.refresh();

                                        DesignTreeView.BindSelectionList_CartCounting();

                                        $("#cart_panel").show();
                                        $("#desgin_panel").hide();
                                    }
                                    else {
                                        DevExVariables.Toaster("error", $(data).find("RESPONSEMESSAGE").text());
                                    }
                                },
                                error: OnError
                            });

                            /*------------------------- Remove Cart --------------------------------------*/

                        }
                        else {
                            DevExVariables.Toaster("error", $(data).find("RESPONSEMESSAGE").text());
                        }
                    },
                    error: OnError
                });
            }
        }).dxButton("instance");
        DesignTreeView.variables.dx_btnSave_Quoation = $("#dx_btnSave_Quoation").dxButton({
            displayExpr: "name",
            valueExpr: "name",
            icon: "fa fa-save",
            text: "Save",
            type: "success",
            useSubmitBehavior: false,
            visible: true,
            onClick: function (e) {
                if (!DesignTreeView.variables.dx_txtAutoComplite_PartyList_Cart.option().selectedItem) {
                    DevExVariables.Toaster("warning", "Party Name is required.");
                    return;
                }
                var data = {
                    "oper": "add",
                    "ACCID": DesignTreeView.variables.dx_txtAutoComplite_PartyList_Cart.option().selectedItem.accid,
                    //"DM_ID_LIST": DesignTreeView.variables.dx_gridSelectionItem_CartList.option().selectedRowKeys.toString(),
                }
                if (DesignTreeView.variables.IsGenerateOrder == "Order") { //Order
                    Url = getDomain() + DesignTreeView.variables.PerformOrderMasterCRUD;
                    data.DM_ID_LIST = DesignTreeView.variables.dx_gridSelectionItem_CartList.option().selectedRowKeys.toString();
                } else if (DesignTreeView.variables.IsGenerateOrder == "Quotation") { //Quotation
                    Url = getDomain() + DesignTreeView.variables.PerformMasterelctionCRUD;
                    data.DM_ID_LIST = DesignTreeView.variables.dx_gridSelectionItem_CartList.option().selectedRowKeys.toString();
                }
                else {
                    Url = getDomain() + DesignTreeView.variables.PerformSaleMasterCRUD;
                    data.PM_ID = DesignTreeView.variables.dx_gridSelectionItem_CartList.option().selectedRowKeys.toString();
                    data.SBOOKID = DesignTreeView.variables.dx_ddlSubBookMaster.option().value;
                }

                $.ajax({
                    url: Url,
                    data: data,
                    async: false,
                    cache: false,
                    type: 'POST',
                    success: function (data) {
                        if ($(data).find('RESPONSECODE').text() == "0") {
                            if (DesignTreeView.variables.IsGenerateOrder == "Order") { //Order
                                DevExVariables.Toaster("success", 'Order: ' + $(data).find('ORDERCODE').text() + ' Generated Successfully.');
                            }
                            else if (DesignTreeView.variables.IsGenerateOrder == "Quotation") {//Quotation
                                DevExVariables.Toaster("success", 'Quotation: ' + $(data).find('QUOTATIONCODE').text() + ' Generated Successfully.');
                            }
                            else {
                                DevExVariables.Toaster("success", 'Jewellery Transaction: ' + $(data).find('JEWELLERYTRANSACTIONCODE').text() + ' Generated Successfully.');
                            }

                            var datadelete = {
                                //"DESIGNIDLIST": DesignTreeView.variables.dx_gridSelectionItem_CartList.option().selectedRowKeys.toString(),
                                "oper": "delete",
                            }
                            if (DesignTreeView.variables.IsGenerateOrder == "Order") { //Order
                                datadelete.DESIGNIDLIST = DesignTreeView.variables.dx_gridSelectionItem_CartList.option().selectedRowKeys.toString();
                            } else if (DesignTreeView.variables.IsGenerateOrder == "Quotation") { //Quotation
                                datadelete.DESIGNIDLIST = DesignTreeView.variables.dx_gridSelectionItem_CartList.option().selectedRowKeys.toString();
                            }
                            else {
                                datadelete.PRODUCTLIST = DesignTreeView.variables.dx_gridSelectionItem_CartList.option().selectedRowKeys.toString();
                            }

                            $.ajax({
                                url: getDomain() + DesignTreeView.variables.PerformSelectionList_CartList,
                                data: datadelete,
                                async: false,
                                cache: false,
                                type: 'POST',
                                success: function (data) {
                                    if ($(data).find("RESPONSECODE").text() == 0) {
                                        DesignTreeView.BindSelectionList_CartCounting();
                                        DesignTreeView.variables.dx_gridSelectionItem_CartList.clearSelection();
                                        DesignTreeView.variables.dx_gridSelectionItem_CartList.refresh();
                                        $("#modalQuotation").modal("hide");
                                    }
                                    else {
                                        DevExVariables.Toaster("error", $(data).find("RESPONSEMESSAGE").text());
                                    }
                                },
                                error: OnError
                            });
                        }

                    },
                    error: OnError,
                });
            }
        }).dxButton("instance");
        /*------------------------------/Cart Catalog options----------------------------*/

        /*----------------------------Sharing Modal--------------------------*/
        DesignTreeView.variables.dx_txtSharetoPartyList = $("#dx_txtSharetoPartyList").dxAutocomplete({
            placeholder: "Select Party Name...",
            mode: "search",
            dataSource: new DevExpress.data.CustomStore({
                load: function (loadOptions) {
                    var deferred = $.Deferred();
                    $.ajax({
                        url: getDomain() + DesignTreeView.variables.BindAccListUrl + "&_search=true&searchField=ACCOUNTNAME&searchOper=cn&searchString=" + loadOptions.searchValue,
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
                return $("<div>" + data.accountname + "</div>");
            },
            onSelectionChanged: function (data) {
                if (data.selectedItem) {
                    DesignTreeView.variables.dx_txtSharingEmailId.option({ value: data.selectedItem.emailid });
                    DesignTreeView.variables.dx_txtMobileNo.option({ value: data.selectedItem.mobile1 });

                }
                else {
                    DesignTreeView.variables.dx_txtSharingEmailId.option("value", "");
                    DesignTreeView.variables.dx_txtMobileNo.option("value", "");
                }
            }
        }).dxAutocomplete("instance");
        DesignTreeView.variables.dx_btnSubmitShare = $("#dx_btnSubmitShare").dxButton({
            stylingMode: "outlined",
            icon: "fa fa-paper-plane",
            text: "Send",
            type: "default",
            useSubmitBehavior: false,
            visible: true,
            onClick: function (e) {
                DesignTreeView.SaveSharingDetails();
            }
        }).dxButton("instance");
        DesignTreeView.variables.dx_RadioSocial = $("#dx_RadioSocial").dxRadioGroup({
            items: ["WhatsApp", "SMS", "E-Mail"],
            layout: "horizontal",
            value: "WhatsApp",
            onValueChanged: function (e) {
                if (e.value == "E-Mail") {
                    $(".MobileShare").hide();
                    $(".EmailSharing").show();
                }
                else {
                    $(".EmailSharing").hide();
                    $(".MobileShare").show();
                }
            }
        }).dxRadioGroup("instance");
        DesignTreeView.variables.dx_txtMobileNo = $("#dx_txtMobileNo").dxTextBox({ mode: "number" }).dxTextBox("instance");
        DesignTreeView.variables.dx_txtShareMessage = $("#dx_txtShareMessage").dxTextArea({
            height: 90,
            value: 'Dear Sir, ' + $("#hdn_UserName").val() + ' shared a design from TrinityJewells with you. Kindly click on below URL to view shared Design. {SHARE URL}',
        }).dxTextArea("instance");
        DesignTreeView.variables.dx_txtSharingSubject = $("#dx_txtSharingSubject").dxTextBox({
            value: "Jewellery Designs shared by TrinityJewells"
        }).dxTextBox("instance");
        DesignTreeView.variables.dx_txtSharingEmailId = $("#dx_txtSharingEmailId").dxTextBox({ placeholder: "Enter Email Id..." }).dxTextBox("instance");
        DesignTreeView.variables.dx_txtSharingEmailBody = $("#dx_txtSharingEmailBody").dxHtmlEditor({
            height: 350,
            toolbar: {
                items: [
                    "undo", "redo", "separator",
                    {
                        formatName: "size",
                        formatValues: ["8pt", "10pt", "12pt", "14pt", "18pt", "24pt", "36pt"]
                    },
                    {
                        formatName: "font",
                        formatValues: ["Arial", "Courier New", "Georgia", "Impact", "Lucida Console", "Tahoma", "Times New Roman", "Verdana"]
                    },
                    "separator",
                    "bold", "italic", "strike", "underline", "separator",
                    "alignLeft", "alignCenter", "alignRight", "alignJustify", "separator",
                    "color", "background"
                ]
            },
            mediaResizing: {
                enabled: true
            },
            value: DesignTreeView.variables.content,
            onValueChanged: function (e) {
                //$(".value-content").text(e.component.option("value"));
            }
        }).dxHtmlEditor("instance");
        /*----------------------------/ Sharing Modal--------------------------*/
    },

    GetDesignList: function (page_index, page_records) {
        var FilterString = DesignTreeView.MakeFilterString();

        var spname = "";
        if (DesignTreeView.variables.StockType == "Virtual Stock")
            spname = DesignTreeView.variables.BindDesignListUrl;
        else
            spname = DesignTreeView.variables.BindProductListUrl;

        $.ajax({
            url: getDomain() + spname + "&page=" + page_index + "&rows=" + page_records + "&myfilters=" + FilterString + "&sidx=" + DesignTreeView.variables.selSortingColumn + "&sord=" + DesignTreeView.variables.selSortingOrder,
            async: true,
            cache: false,
            type: 'POST',
            beforeSend: function () {
                //dx_LoaderTrinity.show();
                $("#customLoader").show();

            },
            complete: function () {
                //dx_LoaderTrinity.hide();
                //$("#loaderdefault").hide();
                $("#customLoader").hide();

            },
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    var JsonObject = xml2json.parser(data);
                    if (JsonObject.serviceresponse.detailslist) {
                        var vars = {};
                        $.views.helpers({
                            getvar: function (key) {
                                return vars[key];
                            }
                        });
                        $.views.tags({
                            setvar: function (key, value) {
                                vars[key] = value;
                            }
                        });
                        $.views.settings.allowCode = true;

                        $("#div_DesignList").append($("#renderDesignList").render(JsonObject.serviceresponse.detailslist.details));
                        DesignTreeView.variables.DesignListArray = DesignTreeView.variables.DesignListArray.concat(JsonObject.serviceresponse.detailslist.details);

                        //$(".indianprice").each(function (key, obj) {
                        //    var convertint = parseFloat($(obj).attr("data")).toLocaleString(getDisLanguage(), {
                        //        style: 'currency', currency: getCurrencyCode(),
                        //        minimumFractionDigits: 2,
                        //        maximumFractionDigits: 2,
                        //    });
                        //    $(obj).html(convertint);
                        //});
                    }

                    var currRecords = 0;
                    TotalRecords = +JsonObject.serviceresponse.totalrecords; 3
                    PageIndex = +JsonObject.serviceresponse.currentpage;
                    if ((PageIndex * PageRecords) > TotalRecords) {
                        currRecords = TotalRecords;
                        $("#btnViewMore").hide();
                    }
                    else {
                        currRecords = (PageIndex * PageRecords);
                        $("#btnViewMore").show();
                    }

                    PageIndex++;
                    $("#currentRecords").html(currRecords);
                    $("#totalRecords").html(TotalRecords);
                }
                else {
                    DevExVariables.InvalidResponseCode(data);
                }
            },
            error: OnError
        });
    },

    //GetCategoryList: function () {
    //    var myfilter = { rules: [] };
    //    myfilter.rules.push({ field: "TYPE", op: "eq", data: "DesgCate" });

    //    $.ajax({
    //        url: getDomain() + DesignTreeView.variables.BindStaticDataUrl + "&myfilters=" + JSON.stringify(myfilter),
    //        async: true,
    //        cache: false,
    //        type: 'POST',
    //        success: function (data) {
    //            if ($(data).find('RESPONSECODE').text() == "0") {
    //                var JsonObject = xml2json.parser(data);
    //                if (JsonObject.serviceresponse.detailslist) {
    //                    var firstcat = "", DS = [];
    //                    if (JsonObject.serviceresponse.detailslist.details.length > 1) {
    //                        firstcat = JsonObject.serviceresponse.detailslist.details[0].desgcateid;
    //                        DS = JsonObject.serviceresponse.detailslist.details;
    //                    }
    //                    else {
    //                        firstcat = JsonObject.serviceresponse.detailslist.details.desgcateid;
    //                        DS = [{ desgcateid: JsonObject.serviceresponse.detailslist.details.desgcateid, desgcate: JsonObject.serviceresponse.detailslist.details.desgcate }];
    //                    }

    //                    DesignTreeView.variables.dx_ddlCategory.option({
    //                        dataSource: new DevExpress.data.ArrayStore({
    //                            data: DS,
    //                            key: "desgcateid"
    //                        }),
    //                        displayExpr: "desgcate",
    //                        valueExpr: "desgcateid",
    //                        value: firstcat,
    //                    });
    //                }
    //            }
    //            else {
    //                DevExVariables.InvalidResponseCode(data);
    //            }
    //        },
    //        error: OnError
    //    });
    //},

    GetSubCategoryList: function (CatId) {
        var myfilter = { rules: [] };
        myfilter.rules.push({ field: "DESGCATID", op: "eq", data: CatId });
        myfilter.rules.push({ field: "TYPE", op: "eq", data: "DesgSubcate" });

        $.ajax({
            url: getDomain() + DesignTreeView.variables.BindStaticDataUrl + "&myfilters=" + JSON.stringify(myfilter),
            async: true,
            cache: false,
            type: 'POST',
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    var JsonObject = xml2json.parser(data);
                    if (JsonObject.serviceresponse.detailslist) {
                        var List = [];

                        if (JsonObject.serviceresponse.detailslist.details.length)
                            List = JsonObject.serviceresponse.detailslist.details;
                        else
                            List.push(JsonObject.serviceresponse.detailslist.details);

                        DesignTreeView.variables.dx_ddlSubCategory.option({
                            dataSource: new DevExpress.data.ArrayStore({
                                data: List,
                                key: "desgsubcateid"
                            }),
                            displayExpr: "desgsubcate",
                            valueExpr: "desgsubcateid",
                        });

                    }
                    else {
                        DesignTreeView.variables.dx_ddlSubCategory.option({
                            dataSource: new DevExpress.data.ArrayStore({ data: [] })
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

    ChangeView: function (view) {
        DesignTreeView.variables.ViewType = view;
        if (view == "Tiles") {
            $("#content").show();
            $("#panel_DesignList").hide();
            $("#div_DesignList").html("");
            DesignTreeView.variables.DesignListArray = [];
            PageIndex = 1;
            DesignTreeView.GetDesignList(PageIndex, PageRecords);
        }
        else {
            $("#content").hide();
            $("#panel_DesignList").show();
            DesignTreeView.initializeDevExgrid();
        }
    },

    initializeDevExgrid: function () {
      
            //if (DesignTreeView.variables.dx_dataGrid) {
            //    DesignTreeView.variables.dx_dataGrid.refresh();
            //}
            //else {
                DesignTreeView.variables.dx_dataGrid = $("#dx_dataGrid").dxDataGrid({
                    dataSource: new DevExpress.data.CustomStore({
                        key: DesignTreeView.variables.StockType == "Virtual Stock" ? "dm_id" : "pm_id",
                        load: function (loadOptions) {
                            var deferred = $.Deferred();

                            var FilterString = DesignTreeView.MakeFilterString();
                            var rows = 30, page = 1;
                            if (isNotEmpty(loadOptions["take"])) {
                                rows = loadOptions["take"];
                            }
                            if (isNotEmpty(loadOptions["skip"])) {
                                page = ((loadOptions["skip"] / loadOptions["take"]) + 1);
                            }

                            var spname = "";
                            if (DesignTreeView.variables.StockType == "Virtual Stock")
                                spname = DesignTreeView.variables.BindDesignListUrl;
                            else
                                spname = DesignTreeView.variables.BindProductListUrl;

                            $.ajax({
                                url: getDomain() + spname + "&page=" + page + "&rows=" + rows + "&myfilters=" + FilterString + "&sidx=" + DesignTreeView.variables.selSortingColumn + "&sord=" + DesignTreeView.variables.selSortingOrder,
                                async: false,
                                cache: false,
                                type: 'POST',
                                success: function (data) {
                                    if ($(data).find('RESPONSECODE').text() == "0") {
                                        var JsonObject = xml2json.parser(data);
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
                                    }
                                    else {
                                        DevExVariables.InvalidResponseCode(data);
                                        deferred.reject("Data Loading Error");
                                    }
                                },
                                error: OnError
                            });

                            return deferred.promise();
                        }
                    }),
                    loadPanel: {
                        enabled: true,
                        indicatorSrc: "../Content/images/trinityloaderwhite.gif",
                    },
                    selection: {
                        mode: "multiple"
                    },
                    allowColumnResizing: true,
                    columnResizingMode: "widget",
                    columnAutoWidth: true,
                    showBorders: true,
                    showColumnLines: true,
                    showRowLines: true,
                    remoteOperations: true,
                    scrolling: {
                        mode: 'virtual',
                        rowRenderingMode: 'virtual',
                    },
                    paging: {
                        pageSize: 30
                    },
                    pager: {
                        showPageSizeSelector: false,
                        allowedPageSizes: [30, 50, 100]
                    },
                    sorting: {
                        mode: "single" // or "multiple" | "none"
                    },
                    columns: [{ dataField: "dm_id", dataType: "number", allowFiltering: false, visible: false },
                        {
                            dataField: "designcode", caption: "Design Code", dataType: "string", alignment: "center",
                            cellTemplate: function (container, options) {
                                var temp = '<div style="position:relative;"><a href="' + options.data.imgpath + '" data-fancybox="gallery">' +
                                                '<img height="50" width="50" src="' + options.data.imgpath_thumb + '" />' +
                                            '</a>' +
                                            '<div>' + options.displayValue + '</div>';

                                if (options.data.newdesign)
                                    temp += '<div style="position: absolute;top: -7px;right: -7px;"><img src="' + getDomain() + '/Content/images/new.png" /></div>';

                                temp += '</div>';

                                $(temp).appendTo(container);
                            }
                        },
                         { dataField: "bagno", caption: "Bag No", dataType: "string", alignment: "center", filterOperations: ["contains"], visible: DesignTreeView.variables.StockType == "Virtual Stock" ? false : true },
                        {
                            dataField: "desgcate", caption: "Category", dataType: "string", filterOperations: ["contains"], allowSorting: false,
                            cellTemplate: function (container, options) {
                                var temp = '<div>' + options.displayValue + '</div><hr style="margin:0;" /><div>' + options.data.desgsubcate + '</div>';
                                temp += '<div title="' + options.data.maxsold + '">' + htmlDecode(options.data.ratestar1) + '</div>';
                                $(temp).appendTo(container);
                            }
                        },
                        {
                            dataField: "jew_length", caption: "Dimensions (mm)", dataType: "string", filterOperations: ["contains"], allowSorting: false,
                            cellTemplate: function (container, options) {
                                var temp = '<div>' + options.displayValue + ' X ' + options.data.width + ' X ' + options.data.height + '</div>';
                                $(temp).appendTo(container);
                            }
                        },
                        { dataField: "grossweight", caption: "Gross Wgt", dataType: "string", alignment: "right", allowSorting: false },
                        { dataField: "netweight", caption: "Net Wgt", dataType: "string", alignment: "right", allowSorting: false },
                        {
                            dataField: "diacts", caption: "Dia Pcs | Cts", dataType: "string", alignment: "right", allowSorting: false,
                            cellTemplate: function (container, options) {
                                var temp = '<div>' + options.data.diapcs + ' <i>pcs</i> | ' + options.displayValue + ' <i>cts</i></div>';
                                $(temp).appendTo(container);
                            }
                        },
                        {
                            dataField: "otherwgt", caption: "Other Pcs | Wgt", dataType: "string", alignment: "right", allowSorting: false,
                            cellTemplate: function (container, options) {
                                var temp = '<div>' + (options.data.otherpcs || 0) + ' <i>pcs</i> | ' + (options.displayValue || 0.000) + ' <i>cts</i></div>';
                                $(temp).appendTo(container);
                            }
                        },
                        {
                            dataField: "price", caption: "Price", dataType: "string", alignment: "right", allowSorting: false,
                            cellTemplate: function (container, options) {
                                var convertint = parseFloat(options.displayValue).toLocaleString(getDisLanguage(), {
                                    style: 'currency', currency: getCurrencyCode(),
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                });
                                var temp = '<div>' + convertint + '</div>';
                                $(temp).appendTo(container);
                            }
                        },
                        { dataField: "ratio", caption: "Ratio", dataType: "string", alignment: "right", allowSorting: false },
                        { dataField: "stockpcs", caption: "Stock Pcs", dataType: "string", alignment: "right", allowSorting: false },
                        {
                            dataField: "Action", caption: "Action", alignment: "center", allowSorting: false,
                            cellTemplate: function (container, options) {
                                var temp = "";
                                temp += '<span style="padding: 2px 10px;" class="btnGridAction dx-selection-disabled"><i class="icon-cart-add" onClick="DesignTreeView.AddDesignToSelectionList(' + options.key + ');"></i></span>';

                                $(temp).appendTo(container);
                            }
                        },
                    ],
                    masterDetail: {
                        enabled: true,
                        template: DesignTreeView.GetGridDetails,
                    }
                }).dxDataGrid("instance");
            
        
    },

    GetGridDetails: function (container, options) {
        var myfilter = { rules: [] };
        if (DesignTreeView.variables.StockType == "Virtual Stock")
            myfilter.rules.push({ field: "DM_ID", op: "eq", data: options.key });
        else
        myfilter.rules.push({ field: "TYPE", op: "eq", data: "PRODUCT_MASTER" });
        myfilter.rules.push({ field: "PM_ID", op: "eq", data: options.key });

        var List = [];

        var spname = "";
        if (DesignTreeView.variables.StockType == "Virtual Stock")
            spname = DesignTreeView.variables.BindDetailListUrl;
        else
            spname = DesignTreeView.variables.BindProDetailListUrl;


        $.ajax({
            url: getDomain() + spname + "&myfilters=" + JSON.stringify(myfilter),
            async: false,
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
                        if (JsonObject.serviceresponse.detailslist.details.length) {
                            List = JsonObject.serviceresponse.detailslist.details;
                        }
                        else {
                            List.push(JsonObject.serviceresponse.detailslist.details);
                        }
                    }
                }
                else {
                    DevExVariables.InvalidResponseCode(data);
                }
            },
            error: OnError
        });

        return $("<div>").dxDataGrid({
            onInitialized: List,
            dataSource: new DevExpress.data.CustomStore({
                key: "rmcode",
                load: function (loadOptions) {
                    var deferred = $.Deferred();

                    deferred.resolve(List, {
                        totalCount: List.length
                    });

                    return deferred.promise();
                }
            }),
            showRowLines: true,
            paging: false,
            showBorders: true,
            columns: [{ dataField: "rmcode", caption: "Rm Code" },
                { dataField: "shape", caption: "Shape" },
                { dataField: "purity", caption: "Quality" },
                { dataField: "colour", caption: "Color" },
                { dataField: "lenghtmmsize", caption: "Length", alignment: "right" },
                { dataField: "widthmmsize", caption: "Width", alignment: "right" },
                { dataField: "charni", caption: "Charni" },
                { dataField: "pieces", caption: "Pcs", alignment: "right" },
                { dataField: "weight", caption: "Wgt", alignment: "right" },
            ],
        });
    },

    ResetFilter: function () {
        DesignTreeView.variables.dx_txtFromDate.option({ value: "" });
        DesignTreeView.variables.dx_txtToDate.option({ value: "" });
        DesignTreeView.variables.dx_ddlIsActive.option({ value: "" });
        DesignTreeView.variables.dx_ddlDisWebB2B.option({ value: "" });
        DesignTreeView.variables.dx_ddlDisAppB2B.option({ value: "" });
        DesignTreeView.variables.dx_ddlDisOutlet.option({ value: "" });
        DesignTreeView.variables.dx_ddlDisWebB2C.option({ value: "" });
        DesignTreeView.variables.dx_ddlDisAppB2C.option({ value: "" });
        DesignTreeView.variables.dx_txtDiaWtFrom.option({ value: 0 });
        DesignTreeView.variables.dx_txtDiaWtTo.option({ value: 10 });
        DesignTreeView.variables.dx_rngDiaWgt.option({ start: 0, end: 10 });
        DesignTreeView.variables.dx_txtGoldWtFrom.option({ value: 0 });
        DesignTreeView.variables.dx_txtGoldWtTo.option({ value: 100 });
        DesignTreeView.variables.dx_rngGoldWgt.option({ start: 0, end: 100 });
        DesignTreeView.variables.dx_txtPriceFrom.option({ value: 0 });
        DesignTreeView.variables.dx_txtPriceTo.option({ value: 9999999 });
        DesignTreeView.variables.dx_rngPrice.option({ start: 0, end: 9999999 });
        DesignTreeView.variables.dx_tagCharniGroup.option({ value: "" });
        DesignTreeView.variables.dx_tagCharni.option({ value: "" });
        DesignTreeView.variables.dx_tagConcept.option({ value: "" });
        DesignTreeView.variables.dx_tagStockType.option({ value: "" });
        DesignTreeView.variables.dx_tagStockStatus.option({ value: "" });
        DesignTreeView.variables.dx_tagMetalType.option({ value: "" });
        DesignTreeView.variables.dx_tagPurity.option({ value: "" });
        DesignTreeView.variables.dx_tagColor.option({ value: "" });
        DesignTreeView.variables.dx_tagDiaPurity.option({ value: "" });
        DesignTreeView.variables.dx_tagDiaColour.option({ value: "" });

        $("#diamondallshape .dvshape:first-child").trigger("click");


        DesignTreeView.variables.selFromDate = "";
        DesignTreeView.variables.selToDate = "";
        DesignTreeView.variables.selIsActive = "";
        DesignTreeView.variables.selDisOnOutlet = "";
        DesignTreeView.variables.selDisOnB2BWeb = "";
        DesignTreeView.variables.selDisOnB2BApp = "";
        DesignTreeView.variables.selDisOnB2CWeb = "";
        DesignTreeView.variables.selDisOnB2CApp = "";
        DesignTreeView.variables.selDiaFromWgt = "";
        DesignTreeView.variables.selDiaToWgt = "";
        DesignTreeView.variables.selGoldFromWgt = "";
        DesignTreeView.variables.selGoldToWgt = "";
        DesignTreeView.variables.selPriceFrom = "";
        DesignTreeView.variables.selPriceTo = "";
        DesignTreeView.variables.selDiaShape = "";
        DesignTreeView.variables.selCharniGroups = "";
        DesignTreeView.variables.selCharni = "";
        DesignTreeView.variables.selConcept = "";
        DesignTreeView.variables.selStockType = "";
        DesignTreeView.variables.selStockStatus = "";
        DesignTreeView.variables.selMetalType = "";
        DesignTreeView.variables.selPurity = "";
        DesignTreeView.variables.selColor = "";
        DesignTreeView.variables.selDiaPurity = "";
        DesignTreeView.variables.selDiaColour = "";
        DesignTreeView.variables.IsFilterApplied = false;

        $("#iconFilter").show();
        $("#iconSelFilter").hide();
        $("#FilterProductlistModal").modal("hide");
      

        if (DesignTreeView.variables.ViewType == "Tiles") {
            $("#div_DesignList").html("");
            DesignTreeView.variables.DesignListArray = [];

            PageIndex = 1;
            DesignTreeView.GetDesignList(PageIndex, PageRecords);
        }
        else {
            DesignTreeView.variables.dx_dataGrid.refresh();
        }
    },

    GetDiaShapeList: function () {
        var myfilter;
        myfilter = { rules: [] };
        myfilter.rules.push({ field: "SIZESHAPECHARNI", op: "eq", data: 'SHAPE' });
        $.ajax({
            url: getDomain() + "/Common/BindMastersDetails?ServiceName=CHARNI_MASTER_GET&myfilters=" + JSON.stringify(myfilter),
            async: false,
            cache: false,
            type: 'POST',
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    var JsonObject = xml2json.parser(data);
                    if (JsonObject.serviceresponse.detailslist != undefined) {
                        $("#diamondallshape").html("");
                        $("#diamondallshape").append($("#renderDiaShape").render(JsonObject.serviceresponse.detailslist.details));
                        $("#diamondallshape .dvshape:first-child").trigger("click");
                    }
                }
                else {
                    InvalidResponseCode(data);
                }
            },
            error: OnError
        });
    },

    Shapeclick: function (id) {
        $(".dvshape").removeClass('shapeactive');
        $("#" + id).addClass('shapeactive');
        DesignTreeView.variables.dx_tagCharniGroup.option({
            items: [],
            value: "",
            disabled: true
        });
        DesignTreeView.variables.dx_tagCharni.option({
            items: [],
            value: "",
            disabled: true
        });

        if (id == 'RBC' || id == 'ASSCHER' || id == 'PRINCESS' || id == 'CHOKI' || id == 'PEAR' || id == 'PIE') {
            var sizevalue = "";
            DesignTreeView.GetDiamondCharniGroup(id);
            DesignTreeView.GetDiamondCharni(id, sizevalue);
        }
        else {
            DesignTreeView.GetDiamondCharniGroup(id);
        }
    },

    GetDiamondCharniGroup: function (shape) {
        var myfilter;
        myfilter = { rules: [] };
        myfilter.rules.push({ field: "TYPE", op: "eq", data: 'GroupCharni' });
        myfilter.rules.push({ field: "RMSHAPE", op: "eq", data: shape });
        $.ajax({
            url: getDomain() + DesignTreeView.variables.BindStaticDataUrl + "&myfilters=" + JSON.stringify(myfilter),
            async: false,
            cache: false,
            type: 'POST',
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    var JsonObject = xml2json.parser(data);
                    var List = [];
                    if (JsonObject.serviceresponse.detailslist) {
                        if (JsonObject.serviceresponse.detailslist.details.length)
                            List = JsonObject.serviceresponse.detailslist.details;
                        else
                            List.push(JsonObject.serviceresponse.detailslist.details);
                    }

                    DesignTreeView.variables.dx_tagCharniGroup.option({
                        items: List,
                        displayExpr: "groupcharni",
                        valueExpr: "groupcharni",
                        disabled: false
                    });
                }
                else {
                    InvalidResponseCode(data);
                }
            },
            error: OnError
        });
    },

    GetDiamondCharni: function (shape, sizevalue) {
        var myfilter;
        myfilter = { rules: [] };
        myfilter.rules.push({ field: "TYPE", op: "eq", data: 'AllCharni' });
        myfilter.rules.push({ field: "RMSHAPE", op: "eq", data: shape });
        myfilter.rules.push({ field: "GROUPCHARNI", op: "eq", data: sizevalue.replaceAll("+", "%2B") });
        $.ajax({
            url: getDomain() + DesignTreeView.variables.BindStaticDataUrl + "&myfilters=" + JSON.stringify(myfilter),
            async: false,
            cache: false,
            type: 'POST',
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    var JsonObject = xml2json.parser(data);
                    var List = [];
                    if (JsonObject.serviceresponse.detailslist) {
                        if (JsonObject.serviceresponse.detailslist.details.length)
                            List = JsonObject.serviceresponse.detailslist.details;
                        else
                            List.push(JsonObject.serviceresponse.detailslist.details);

                        DesignTreeView.variables.dx_tagCharni.option({
                            items: List,
                            displayExpr: "charni",
                            valueExpr: "charniid",
                            disabled: false
                        });

                        if (JsonObject.serviceresponse.scharnilist) {
                            DesignTreeView.variables.dx_tagCharni.option({ value: JsonObject.serviceresponse.scharnilist.charniid });
                        }
                    }
                }
                else {
                    InvalidResponseCode(data);
                }
            },
            error: OnError
        });
    },

    //GetConceptOfList: function () {
    //    var myfilter = { rules: [] };
    //    myfilter.rules.push({ field: "TYPE", op: "eq", data: "ConceptOf" });

    //    $.ajax({
    //        url: getDomain() + DesignTreeView.variables.BindStaticDataUrl + "&myfilters=" + JSON.stringify(myfilter),
    //        async: true,
    //        cache: false,
    //        type: 'POST',
    //        success: function (data) {
    //            if ($(data).find('RESPONSECODE').text() == "0") {
    //                var JsonObject = xml2json.parser(data);
    //                if (JsonObject.serviceresponse.detailslist) {
    //                    DesignTreeView.variables.dx_tagConcept.option({
    //                        dataSource: new DevExpress.data.ArrayStore({
    //                            data: JsonObject.serviceresponse.detailslist.details,
    //                            key: "conceptofid"
    //                        }),
    //                        displayExpr: "conceptofname",
    //                        valueExpr: "conceptofid",
    //                    });
    //                }
    //            }
    //            else {
    //                DevExVariables.InvalidResponseCode(data);
    //            }
    //        },
    //        error: OnError
    //    });
    //},

    ApplyFilter: function () {
        DesignTreeView.variables.selFromDate = DesignTreeView.variables.dx_txtFromDate.option().value;
        DesignTreeView.variables.selToDate = DesignTreeView.variables.dx_txtToDate.option().value;
        DesignTreeView.variables.selIsActive = DesignTreeView.variables.dx_ddlIsActive.option().value;
        DesignTreeView.variables.selDisOnOutlet = DesignTreeView.variables.dx_ddlDisOutlet.option().value;
        DesignTreeView.variables.selDisOnB2BWeb = DesignTreeView.variables.dx_ddlDisWebB2B.option().value;
        DesignTreeView.variables.selDisOnB2BApp = DesignTreeView.variables.dx_ddlDisAppB2B.option().value;
        DesignTreeView.variables.selDisOnB2CWeb = DesignTreeView.variables.dx_ddlDisWebB2C.option().value;
        DesignTreeView.variables.selDisOnB2CApp = DesignTreeView.variables.dx_ddlDisAppB2C.option().value;
        DesignTreeView.variables.selDiaFromWgt = DesignTreeView.variables.dx_txtDiaWtFrom.option().value;
        DesignTreeView.variables.selDiaToWgt = DesignTreeView.variables.dx_txtDiaWtTo.option().value;
        DesignTreeView.variables.selGoldFromWgt = DesignTreeView.variables.dx_txtGoldWtFrom.option().value;
        DesignTreeView.variables.selGoldToWgt = DesignTreeView.variables.dx_txtGoldWtTo.option().value;
        DesignTreeView.variables.selPriceFrom = DesignTreeView.variables.dx_txtPriceFrom.option().value;
        DesignTreeView.variables.selPriceTo = DesignTreeView.variables.dx_txtPriceTo.option().value;
        DesignTreeView.variables.selDiaShape = $(".shapeactive").attr("id");
        DesignTreeView.variables.selCharniGroups = DesignTreeView.variables.dx_tagCharniGroup.option().value;
        DesignTreeView.variables.selCharni = DesignTreeView.variables.dx_tagCharni.option().value;
        DesignTreeView.variables.selConcept = DesignTreeView.variables.dx_tagConcept.option().value;
        DesignTreeView.variables.selStockType = DesignTreeView.variables.dx_tagStockType.option().value;
        DesignTreeView.variables.selStockStatus = DesignTreeView.variables.dx_tagStockStatus.option().value;
        DesignTreeView.variables.selMetalType = DesignTreeView.variables.dx_tagMetalType.option().value;
        DesignTreeView.variables.selPurity = DesignTreeView.variables.dx_tagPurity.option().value;
        DesignTreeView.variables.selColor = DesignTreeView.variables.dx_tagColor.option().value;
        DesignTreeView.variables.selDiaPurity = DesignTreeView.variables.dx_tagDiaPurity.option().value;
        DesignTreeView.variables.selDiaColour = DesignTreeView.variables.dx_tagDiaColour.option().value;
        DesignTreeView.variables.IsFilterApplied = true;

        $("#iconFilter").hide();
        $("#iconSelFilter").show();
        $("#FilterProductlistModal").modal("hide");

        if (DesignTreeView.variables.ViewType == "Tiles") {
            $("#div_DesignList").html("");
            DesignTreeView.variables.DesignListArray = [];
            PageIndex = 1;
            DesignTreeView.GetDesignList(PageIndex, PageRecords);
        }
        else {
            DesignTreeView.variables.dx_dataGrid.refresh();
        }
    },

    MakeFilterString: function () {
        var myfilter = { rules: [] };
        if (DesignTreeView.variables.dx_ddlCategory.option().text)
            myfilter.rules.push({ field: "CATEGORY", op: "eq", data: DesignTreeView.variables.dx_ddlCategory.option().text });

        if (DesignTreeView.variables.dx_ddlSubCategory.option().value.length)
            myfilter.rules.push({ field: "SUBCATEGORY", op: "eq", data: DesignTreeView.variables.dx_ddlSubCategory.option().value.toString() });

        if (DesignTreeView.variables.dx_txtSearch.option().value)
            myfilter.rules.push({ field: "DESIGNCODE", op: "eq", data: DesignTreeView.variables.dx_txtSearch.option().value });

        if (DesignTreeView.variables.dx_txtbagNo.option().value)
            myfilter.rules.push({ field: "BAGNO", op: "eq", data: DesignTreeView.variables.dx_txtbagNo.option().value });

        if (DesignTreeView.variables.selPriceAccId)
            myfilter.rules.push({ field: "PRICEACCID", op: "eq", data: DesignTreeView.variables.selPriceAccId });

        if (DesignTreeView.variables.selPriceDiaPurity)
            myfilter.rules.push({ field: "DIAPURITY", op: "eq", data: DesignTreeView.variables.selPriceDiaPurity });

        if (DesignTreeView.variables.selPriceDiaColor)
            myfilter.rules.push({ field: "DIACOLOR", op: "eq", data: DesignTreeView.variables.selPriceDiaColor });

        myfilter.rules.push({ field: "CURRENCYCODE", op: "eq", data: getCurrencyCode() });

        if (DesignTreeView.variables.IsFilterApplied) {
            if (DesignTreeView.variables.selFromDate)
                myfilter.rules.push({ field: "FROMDATE", op: "eq", data: DesignTreeView.variables.selFromDate });

            if (DesignTreeView.variables.selToDate)
                myfilter.rules.push({ field: "TODATE", op: "eq", data: DesignTreeView.variables.selToDate });

            if (DesignTreeView.variables.selIsActive)
                myfilter.rules.push({ field: "ISACTIVE", op: "eq", data: DesignTreeView.variables.selIsActive });

            if (DesignTreeView.variables.selDisOnOutlet)
                myfilter.rules.push({ field: "DISONOUTLET", op: "eq", data: DesignTreeView.variables.selDisOnOutlet });

            if (DesignTreeView.variables.selDisOnB2BWeb)
                myfilter.rules.push({ field: "DISONB2BWEB", op: "eq", data: DesignTreeView.variables.selDisOnB2BWeb });

            if (DesignTreeView.variables.selDisOnB2BApp)
                myfilter.rules.push({ field: "DISONB2BAPP", op: "eq", data: DesignTreeView.variables.selDisOnB2BApp });

            if (DesignTreeView.variables.selDisOnB2CWeb)
                myfilter.rules.push({ field: "DISONB2CWEB", op: "eq", data: DesignTreeView.variables.selDisOnB2CWeb });

            if (DesignTreeView.variables.selDisOnB2CApp)
                myfilter.rules.push({ field: "DISONB2CAPP", op: "eq", data: DesignTreeView.variables.selDisOnB2CApp });

            if (DesignTreeView.variables.selDiaFromWgt)
                myfilter.rules.push({ field: "DIAWGTFROM", op: "eq", data: DesignTreeView.variables.selDiaFromWgt });

            if (DesignTreeView.variables.selDiaToWgt)
                myfilter.rules.push({ field: "DIAWGTTO", op: "eq", data: DesignTreeView.variables.selDiaToWgt });

            if (DesignTreeView.variables.selGoldFromWgt)
                myfilter.rules.push({ field: "GOLDWGTFRO", op: "eq", data: DesignTreeView.variables.selGoldFromWgt });

            if (DesignTreeView.variables.selGoldToWgt)
                myfilter.rules.push({ field: "GOLDWGTTO", op: "eq", data: DesignTreeView.variables.selGoldToWgt });

            if (DesignTreeView.variables.selPriceFrom)
                myfilter.rules.push({ field: "PRICEFROM", op: "eq", data: DesignTreeView.variables.selPriceFrom });

            if (DesignTreeView.variables.selPriceTo)
                myfilter.rules.push({ field: "PRICETO", op: "eq", data: DesignTreeView.variables.selPriceTo });

            if (DesignTreeView.variables.selDiaShape)
                myfilter.rules.push({ field: "DIASHAPE", op: "eq", data: DesignTreeView.variables.selDiaShape });

            if (DesignTreeView.variables.selCharniGroups.length > 0)
                myfilter.rules.push({ field: "CHARNIGROUP", op: "eq", data: DesignTreeView.variables.selCharniGroups.toString().replaceAll("+", "%2B") });

            if (DesignTreeView.variables.selCharni.length > 0)
                myfilter.rules.push({ field: "CHARNI", op: "eq", data: DesignTreeView.variables.selCharni.toString() });

            if (DesignTreeView.variables.selConcept.length > 0)
                myfilter.rules.push({ field: "CONCEPT", op: "eq", data: DesignTreeView.variables.selConcept.toString() });

            if (DesignTreeView.variables.selStockType.length > 0)
                myfilter.rules.push({ field: "SOURCETYPE", op: "eq", data: DesignTreeView.variables.selStockType.toString() });

            if (DesignTreeView.variables.selStockStatus.length > 0)
                myfilter.rules.push({ field: "STATUS", op: "eq", data: DesignTreeView.variables.selStockStatus.toString() });

            if (DesignTreeView.variables.selMetalType.length > 0)
                myfilter.rules.push({ field: "METALTYPE", op: "eq", data: DesignTreeView.variables.selMetalType.toString() });

            if (DesignTreeView.variables.selPurity.length > 0)
                myfilter.rules.push({ field: "METALPURITY", op: "eq", data: DesignTreeView.variables.selPurity.toString() });

            if (DesignTreeView.variables.selColor.length > 0)
                myfilter.rules.push({ field: "METALCOLOUR", op: "eq", data: DesignTreeView.variables.selColor.toString() });

            if (DesignTreeView.variables.selDiaPurity.length > 0)
                myfilter.rules.push({ field: "DIAPURITY", op: "eq", data: DesignTreeView.variables.selDiaPurity.toString() });

            if (DesignTreeView.variables.selDiaColour.length > 0)
                myfilter.rules.push({ field: "DIACOLOR", op: "eq", data: DesignTreeView.variables.selDiaColour.toString() });

        }
        else {
            myfilter.rules.push({ field: "ISACTIVE", op: "eq", data: 1 });
        }

        return JSON.stringify(myfilter);
    },

    AddRemoveWishList: function (obj) {
        if ($(obj).hasClass("icon-heart6")) {
            $(obj).removeClass("icon-heart6");
            $(obj).addClass("icon-heart5");
        }
        else {
            $(obj).removeClass("icon-heart5");
            $(obj).addClass("icon-heart-broken2");
            setTimeout(function () {
                $(obj).removeClass("icon-heart-broken2");
                $(obj).addClass("icon-heart6");
            }, 200)
        }
    },

    AddRemoveCart: function (obj) {
        if ($(obj).hasClass("icon-cart2")) {
            $(obj).removeClass("icon-cart2");
            $(obj).addClass("icon-cart");
        }
        else {
            $(obj).removeClass("icon-cart");
            $(obj).addClass("icon-cart2");
        }
    },

    ChangeDisInWebsites: function () {
        var SelectedDesignList = [];
        if (DesignTreeView.variables.ViewType == "Tiles") {
            $(".chkSelectDesign:checked").each(function (key, obj) {
                SelectedDesignList.push($(obj).attr("designid"));
            });
        }
        else {
            SelectedDesignList = DesignTreeView.variables.dx_dataGrid.option().selectedRowKeys;
        }

        var data = {
            "oper": "MULTI_DESG_DIS_CHANGE",
            "SELECTEDDESIGNLIST": SelectedDesignList.toString(),
        };

        if (DesignTreeView.variables.dx_chngIsActive.option().value)
            data.ISACTIVE = DesignTreeView.variables.dx_chngIsActive.option().value;
        if (DesignTreeView.variables.dx_chngDisWebB2B.option().value)
            data.VISWEBB2B = DesignTreeView.variables.dx_chngDisWebB2B.option().value;
        if (DesignTreeView.variables.dx_chngDisWebB2C.option().value)
            data.VISWEBB2C = DesignTreeView.variables.dx_chngDisWebB2C.option().value;
        if (DesignTreeView.variables.dx_chngDisAppB2B.option().value)
            data.VISAPPB2B = DesignTreeView.variables.dx_chngDisAppB2B.option().value;
        if (DesignTreeView.variables.dx_chngDisAppB2C.option().value)
            data.VISAPPB2C = DesignTreeView.variables.dx_chngDisAppB2C.option().value;
        if (DesignTreeView.variables.dx_chngDisOutlet.option().value)
            data.VISOUTLET = DesignTreeView.variables.dx_chngDisOutlet.option().value;

        $.ajax({
            url: getDomain() + DesignTreeView.variables.PerformMasterOperationurl,
            data: data,
            async: false,
            cache: false,
            type: 'POST',
            beforeSend: function () {
                dx_LoaderTrinity.show();
            },
            success: function (data) {
                if ($(data).find("RESPONSECODE").text() == 0) {
                    DevExVariables.Toaster("success", $(data).find("RESPONSEMESSAGE").text());
                    $("#ModalCloudfilter").modal('hide');
                    if (DesignTreeView.variables.ViewType == "Tiles") {
                        $("#div_DesignList").html("");
                        DesignTreeView.variables.DesignListArray = [];
                        PageIndex = 1;
                        DesignTreeView.GetDesignList(PageIndex, PageRecords);
                    }
                    else {
                        DesignTreeView.variables.dx_dataGrid.refresh();
                    }
                }
                else {
                    DevExVariables.Toaster("error", $(data).find("RESPONSEMESSAGE").text());
                }
            },
            complete: function () {
                dx_LoaderTrinity.hide();
            },
            error: OnError
        });
    },

    SavePriceSetting: function () {
        DesignTreeView.variables.selPriceAccId = DesignTreeView.variables.dx_txtPriceAcc.option().selectedItem.accid;
        DesignTreeView.variables.selPriceAccName = DesignTreeView.variables.dx_txtPriceAcc.option().selectedItem.accountname;
        DesignTreeView.variables.selPriceDiaPurity = DesignTreeView.variables.dx_ddlPriceDiaPurity.option().text;
        DesignTreeView.variables.selPriceDiaColor = DesignTreeView.variables.dx_ddlPriceDiaColor.option().text;

        $("#ModalPriceSetting").modal("hide");
        if (DesignTreeView.variables.ViewType == "Tiles") {
            $("#div_DesignList").html("");
            DesignTreeView.variables.DesignListArray = [];
            PageIndex = 1;
            DesignTreeView.GetDesignList(PageIndex, PageRecords);
        }
        else {
            DesignTreeView.variables.dx_dataGrid.refresh();
        }
    },

    SaveSelectionList: function () {
        var data = {};
        var SelectedDesignList = [];

        if (DesignTreeView.variables.IsfromCart == true) {
            SelectedDesignList = DesignTreeView.variables.dx_gridSelectionItem_CartList.option().selectedRowKeys;
        }
        else {
            if (DesignTreeView.variables.ViewType == "Tiles") {
                $(".chkSelectDesign:checked").each(function (key, obj) {
                    SelectedDesignList.push($(obj).attr("designid"));
                });
            }
            else {
                SelectedDesignList = DesignTreeView.variables.dx_dataGrid.option().selectedRowKeys;
            }
        }

        if (DesignTreeView.variables.CatalogOpr == "Add") {
            if (!DesignTreeView.variables.dx_txtSelectionListName.option().value) {
                DevExVariables.Toaster("warning", "Catalog Name is required.");
                return false;
            }

            var IsValid = DesignTreeView.variables.dx_txtSelectionListName.option().isValid;
            if (!IsValid)
                return;

            if (SelectedDesignList.length <= 0) {
                DevExVariables.Toaster("warning", "Please select at least one design.");
                return;
            }
            data.oper = "add";
            data.LISTNAME = DesignTreeView.variables.dx_txtSelectionListName.option().value;
            data.REMARK = DesignTreeView.variables.dx_txtSelectionListRemark.option().value;
            data.DESIGNIDLIST = SelectedDesignList.toString();
        }
        else if (DesignTreeView.variables.CatalogOpr == "Edit") {
            if (!DesignTreeView.variables.dx_txtSelectionListName.option().value) {
                DevExVariables.Toaster("warning", "Catalog Name is required.");
                return false;
            }

            data.oper = "edit";
            data.LISTNAME = DesignTreeView.variables.dx_txtSelectionListName.option().value;
            data.REMARK = DesignTreeView.variables.dx_txtSelectionListRemark.option().value;
            data.LISTID = DesignTreeView.variables.SelListMasId;
        }
        else if (DesignTreeView.variables.CatalogOpr == "EditItems") {
            if (!DesignTreeView.variables.dx_txtAutoSelecList.option().selectedItem) {
                DevExVariables.Toaster("warning", 'Please select any Catalog.');
                return;
            }
            if (SelectedDesignList.length <= 0) {
                DevExVariables.Toaster("warning", "Please select at least one design.");
                return;
            }
            data.oper = "editdesignlist";
            data.LISTID = DesignTreeView.variables.dx_txtAutoSelecList.option().selectedItem.listid;
            data.DESIGNIDLIST = SelectedDesignList.toString();
        }

        $.ajax({
            url: getDomain() + DesignTreeView.variables.PerformSelectionListurl,
            data: data,
            async: false,
            cache: false,
            type: 'POST',
            success: function (data) {
                if ($(data).find("RESPONSECODE").text() == 0) {
                    DevExVariables.Toaster("success", 'Selection List is saved successfully.');
                    $("#ModalSelectionList").modal("hide");

                    if (DesignTreeView.variables.IsfromCart == true) {
                        var datadelete = {
                            "DESIGNIDLIST": DesignTreeView.variables.dx_gridSelectionItem_CartList.option().selectedRowKeys.toString(),
                            "oper": "delete",
                        }

                        $.ajax({
                            url: getDomain() + DesignTreeView.variables.PerformSelectionList_CartList,
                            data: datadelete,
                            async: false,
                            cache: false,
                            type: 'POST',
                            success: function (data) {
                                if ($(data).find("RESPONSECODE").text() == 0) {
                                    DesignTreeView.BindSelectionList_CartCounting();
                                    DesignTreeView.variables.dx_gridSelectionItem_CartList.clearSelection();
                                    DesignTreeView.variables.dx_gridSelectionItem_CartList.refresh();
                                }
                                else {
                                    DevExVariables.Toaster("error", $(data).find("RESPONSEMESSAGE").text());
                                }
                            },
                            error: OnError
                        });
                    }
                }
                else {
                    DevExVariables.Toaster("error", $(data).find("RESPONSEMESSAGE").text());
                }
            },
            error: OnError
        });
    },

    Bind_CartData: function () {
        DesignTreeView.variables.IsfromCart = true;
        $("#cart_panel").show();
        $("#desgin_panel").hide();
        DesignTreeView.initDevExgridSelItem_CartList();
    },

    BindSelectionList_CartCounting: function () {
        $.ajax({
            url: getDomain() + DesignTreeView.variables.BindSelectionList_CartUrl,
            async: false,
            cache: false,
            type: 'POST',
            success: function (data) {
                if ($(data).find("RESPONSECODE").text() == 0) {
                    var jsonObject = xml2json.parser(data);

                    if (jsonObject.serviceresponse.detailslist_cartcount) {
                        var obj = jsonObject.serviceresponse.detailslist_cartcount.details_cartcount;
                        if (+obj.cartcount > 0) {
                            $("#CartCounting").html(+obj.cartcount);
                            $("#MycartCounting").html(+obj.cartcount);
                        }
                        else {
                            $("#CartCounting").html(0);
                            $("#MycartCounting").html(0);
                        }


                    }
                }
                else {
                    DevExVariables.Toaster("error", $(data).find("RESPONSEMESSAGE").text());
                }
            },
            error: OnError
        });

    },

    AddDesignToSelectionList: function (dm_id, pm_id) {

        var data = {
            "DM_ID": dm_id,
            "PM_ID": pm_id,
            "STOCKTYPE": DesignTreeView.variables.StockType,
            "oper": "add",
        }

        $.ajax({
            url: getDomain() + DesignTreeView.variables.PerformSelectionList_CartList,
            data: data,
            async: false,
            cache: false,
            type: 'POST',
            success: function (result) {
                if ($(result).find("RESPONSECODE").text() == 0) {
                    DesignTreeView.BindSelectionList_CartCounting();
                    DevExVariables.Toaster("success", 'Add To Cart.');
                }
                else if ($(result).find("RESPONSECODE").text() == -1) {
                    DevExVariables.Toaster("warning", $(result).find("RESPONSEMESSAGE").text());
                }
            },
            error: OnError
        });
    },

    ShareSocialMedia: function (Type, Phone, msg, MailId, Subject) {
        var result = "";
        if (Type == "WhatsApp") {
            result = true;
            window.open('https://web.whatsapp.com/send?text=' + msg + '&phone=' + Phone, '_blank');
        }
        else if (Type == "SMS") {
            var data = {
                mobileNos: Phone,
                body: msg
            }
            $.ajax({
                url: getDomain() + "/Account/SendSMS",
                async: false,
                cache: false,
                type: 'POST',
                data: data,
                beforeSend: function () {
                    dx_LoaderTrinity.show();
                },
                success: function (data) {
                    if (data == "OK") {
                        result = true;
                        DevExVariables.Toaster("success", "SMS Send successfully.");
                    }
                    else {
                        result = false;
                        DevExVariables.Toaster("error", "Error to send SMS: " + data);
                    }
                },
                complete: function () {
                    dx_LoaderTrinity.hide();
                },
                error: OnError
            });
        }
        else if (Type == "E-Mail") {
            var data = {
                Emailids: MailId,
                subject: Subject,
                body: msg
            }
            $.ajax({
                url: getDomain() + "/Account/SendMail",
                async: false,
                cache: false,
                type: 'POST',
                data: data,
                beforeSend: function () {
                    dx_LoaderTrinity.show();
                },
                success: function (data) {
                    if (data == "success") {
                        result = true;
                        DevExVariables.Toaster("success", "Email Send successfully.");
                    }
                    else {
                        result = false;
                        DevExVariables.Toaster("error", "Error in send e-mail : " + data);
                    }
                },
                complete: function () {
                    dx_LoaderTrinity.hide();
                },
                error: OnError
            });
        }
        return result;
    },

    SaveSharingDetails: function () {
        var Type = DesignTreeView.variables.dx_RadioSocial.option().value;
        if (Type == "E-Mail") {
            if (!DesignTreeView.variables.dx_txtSharingEmailId.option().value || !DesignTreeView.variables.dx_txtSharingSubject.option().value || !DesignTreeView.variables.dx_txtSharingEmailBody.option().value) {
                DevExVariables.Toaster("warning", "Email Id, Subject and Email Body are required.");
                return false;
            }
        }
        else {
            if (!DesignTreeView.variables.dx_txtMobileNo.option().value || !DesignTreeView.variables.dx_txtShareMessage.option().value) {
                DevExVariables.Toaster("warning", "Mobile No and Message are required.");
                return false;
            }
        }
        var SelectedDesignList = [], MobileNo = "", MSG = "", Mailbody = "", MailId = "", Suject = "";
        if (DesignTreeView.variables.IsfromCart == true) {
            SelectedDesignList = DesignTreeView.variables.dx_gridSelectionItem_CartList.option().selectedRowKeys;
        }
        else {
            if (DesignTreeView.variables.ViewType == "Tiles") {
                $(".chkSelectDesign:checked").each(function (key, obj) {
                    SelectedDesignList.push($(obj).attr("designid"));
                });
            }
            else {
                SelectedDesignList = DesignTreeView.variables.dx_dataGrid.option().selectedRowKeys;
            }
        }
        var data = {
            "SHARETYPE": Type,
            "DESIGNIDS": SelectedDesignList.toString(),
            "oper": "add",
        }
        if (Type == "E-Mail") {
            MailId = DesignTreeView.variables.dx_txtSharingEmailId.option().value;
            Suject = DesignTreeView.variables.dx_txtSharingSubject.option().value;
            Mailbody = DesignTreeView.variables.dx_txtSharingEmailBody.option().value;
            data.EMAILID = MailId;
            data.EMAILSUBJECT = Suject;
            data.EMAILBODY = Mailbody;
        }
        else if (Type == "SMS") {
            MobileNo = DesignTreeView.variables.dx_txtMobileNo.option().value;
            MSG = DesignTreeView.variables.dx_txtShareMessage.option().value;
            data.MOBILENO = MobileNo;
            data.MESSAGE = MSG;
        }
        else {
            MSG = DesignTreeView.variables.dx_txtShareMessage.option().value;
            data.MESSAGE = MSG;
        }
        $.ajax({
            url: getDomain() + DesignTreeView.variables.PerformDesignSharingurl,
            data: data,
            async: false,
            cache: false,
            type: 'POST',
            success: function (data) {
                if ($(data).find("RESPONSECODE").text() == 0) {
                    var ShareLink = getERPDomain() + "/Sharing/DesignShared?ShareId=" + $(data).find("SHAREID").text();
                    var message = "";
                    if (Type == "E-Mail") {
                        message = Mailbody.replace("{SHARE URL}", '<a href="' + ShareLink + '" target="_blank">Click here...</a>');
                    }
                    else {
                        message = MSG.replace("{SHARE URL}", ShareLink);
                    }
                    var result = DesignTreeView.ShareSocialMedia(Type, MobileNo, message, MailId, Suject);
                    if (result == true) {
                        $("#ModalSharing").modal("hide");
                        if (DesignTreeView.variables.IsfromCart == true) {
                            DesignTreeView.variables.dx_gridSelectionItem_CartList.clearSelection();
                        }
                        else {
                            if (DesignTreeView.variables.ViewType == "Tiles") {
                                $(".chkSelectDesign:checked").prop("checked", false);
                            }
                            else {
                                DesignTreeView.variables.dx_dataGrid.clearSelection();
                            }
                        }
                    }
                }
                else {
                    DevExVariables.Toaster("error", $(data).find("RESPONSEMESSAGE").text());
                }
            },
            error: OnError
        });
    },

    SaveCatalogSharingDetails: function () {
        var Type = DesignTreeView.variables.dx_CatalogRadioSocial.option().value;
        if (Type == "E-Mail") {
            if (!DesignTreeView.variables.dx_txtCatalogSharingEmailId.option().value || !DesignTreeView.variables.dx_txtCatalogSharingSubject.option().value || !DesignTreeView.variables.dx_txtCatalogSharingEmailBody.option().value) {
                DevExVariables.Toaster("warning", "Email Id, Subject and Email Body are required.");
                return false;
            }
        }
        else {
            if (!DesignTreeView.variables.dx_txtCatalogMobileNo.option().value || !DesignTreeView.variables.dx_txtCatalogShareMessage.option().value) {
                DevExVariables.Toaster("warning", "Mobile No and Message are required.");
                return false;
            }
        }

        var SelectedDesignList = [], MobileNo = "", MSG = "", Mailbody = "", MailId = "", Suject = "";
        SelectedDesignList = DesignTreeView.variables.dx_gridSelectionItemList.option().selectedRowKeys;
        var data = {
            "SHARETYPE": Type,
            "PARTYACCID": DesignTreeView.variables.dx_txtAutoComplite_PartyList.option().selectedItem.accid,
            "DESIGNIDS": SelectedDesignList.toString(),
            "oper": "add",
        }
        if (Type == "E-Mail") {
            Mailbody = DesignTreeView.variables.dx_txtCatalogSharingEmailBody.option().value;
            MailId = DesignTreeView.variables.dx_txtCatalogSharingEmailId.option().value;
            Suject = DesignTreeView.variables.dx_txtCatalogSharingSubject.option().value;
            data.EMAILID = MailId;
            data.EMAILSUBJECT = Suject;
            data.EMAILBODY = Mailbody;
        }
        else if (Type == "SMS") {
            MobileNo = DesignTreeView.variables.dx_txtCatalogMobileNo.option().value;
            MSG = DesignTreeView.variables.dx_txtCatalogShareMessage.option().value;
            data.MOBILENO = MobileNo;
            data.MESSAGE = MSG;
        }
        else {
            MSG = DesignTreeView.variables.dx_txtCatalogShareMessage.option().value;
            data.MESSAGE = MSG;
        }

        $.ajax({
            url: getDomain() + DesignTreeView.variables.PerformDesignSharingurl,
            data: data,
            async: false,
            cache: false,
            type: 'POST',
            success: function (data) {
                if ($(data).find("RESPONSECODE").text() == 0) {
                    var ShareLink = getERPDomain() + "/Sharing/DesignShared?ShareId=" + $(data).find("SHAREID").text();
                    var message = "";
                    if (Type == "E-Mail") {
                        message = Mailbody.replace("{SHARE URL}", '<a href="' + ShareLink + '" target="_blank">Click here...</a>');
                    }
                    else {
                        message = MSG.replace("{SHARE URL}", ShareLink);
                    }
                    var result = DesignTreeView.ShareSocialMedia(Type, MobileNo, message, MailId, Suject);
                    if (result == true) {
                        DesignTreeView.ViewCatalogItemList();
                        DesignTreeView.variables.dx_gridSelectionItemList.clearSelection();
                    }
                }
                else {
                    DevExVariables.Toaster("error", $(data).find("RESPONSEMESSAGE").text());
                }
            },
            error: OnError
        });
    },

    ClearShareItemControlls: function () {
        DesignTreeView.variables.dx_txtSharetoPartyList.option({ "value": "" }, { "items": "" }, { "selectedItem": "" });
        DesignTreeView.variables.dx_RadioSocial.option({ value: "WhatsApp" });
        DesignTreeView.variables.dx_txtShareMessage.option({ value: 'Dear Sir, ' + $("#hdn_UserName").val() + ' shared a design from TrinityJewells with you. Kindly click on below URL to view shared Design. {SHARE URL}' });
        DesignTreeView.variables.dx_txtSharingSubject.option({ value: "Jewellery Designs shared by TrinityJewells" });
        DesignTreeView.variables.dx_txtSharingEmailBody.option({ value: DesignTreeView.variables.content });
    },

    ClearShareCatalogControlls: function () {
        DesignTreeView.variables.dx_CatalogRadioSocial.option({ value: "WhatsApp" });
        DesignTreeView.variables.dx_txtCatalogShareMessage.option({ value: 'Dear Sir, ' + $("#hdn_UserName").val() + ' shared a design from TrinityJewells with you. Kindly click on below URL to view shared Design. {SHARE URL}' });
        DesignTreeView.variables.dx_txtCatalogSharingSubject.option({ value: "Jewellery Designs shared by TrinityJewells" });
        DesignTreeView.variables.dx_txtCatalogSharingEmailBody.option({ value: DesignTreeView.variables.content });
    },

    OpenMoreDetails: function (dm_id, designcode) {
        $("#lblDesignHeader").html(designcode);

        var temp = DesignTreeView.variables.DesignListArray.filter(function (x) { return x.dm_id == dm_id })[0];
        $("#Dimensions").html(temp.jew_length + " * " + temp.width + " * " + temp.height);
        $("#Size").html(temp.goodssize);
        $("#Color").html(temp.color);
        $("#Purity").html(temp.purity);

        var myfilter = { rules: [] };
        myfilter.rules.push({ field: "DM_ID", op: "eq", data: dm_id });

        $('#ViewImgsList').owlCarousel('destroy');
        $("#ViewImgsList").html("");
        $.ajax({
            url: getDomain() + DesignTreeView.variables.BindImgsListUrl + "&myfilters=" + JSON.stringify(myfilter),
            async: false,
            cache: false,
            type: 'POST',
            beforeSend: function () {
                dx_LoaderTrinity.show();
            },
            complete: function () {
                dx_LoaderTrinity.hide();
            },
            success: function (data) {
                if ($(data).find("RESPONSECODE").text() == 0) {
                    var jsonObject = xml2json.parser(data);

                    if (jsonObject.serviceresponse.detailslist) {
                        var obj = jsonObject.serviceresponse.detailslist.details;
                        $("#ViewImgsList").html($("#renderDesignImgs").render(obj));

                        $('#ViewImgsList').owlCarousel({
                            loop: false,
                            margin: 10,
                            nav: true,
                            responsive: {
                                0: {
                                    items: 1
                                },
                                600: {
                                    items: 3
                                },
                                1000: {
                                    items: 5
                                }
                            }
                        });
                        $("#ViewImgsList img:first").trigger("click");

                    }
                }
                else {
                    DevExVariables.Toaster("error", $(data).find("RESPONSEMESSAGE").text());
                }
            },
            error: OnError
        });

        DesignTreeView.GetRelatedDesignsList(designcode);

        $("#DesignRelated").modal("show");

    },

    GetRelatedDesignsList: function (designcode) {
        $("#listRelatedDesigns").html("");

        var myfilter = { rules: [] };
        myfilter.rules.push({ field: "DESIGNCODE", op: "eq", data: designcode });
        myfilter.rules.push({ field: "CURRENCYCODE", op: "eq", data: getCurrencyCode() });

        if (DesignTreeView.variables.selPriceDiaColor)
            myfilter.rules.push({ field: "DIACOLOR", op: "eq", data: DesignTreeView.variables.selPriceDiaColor });
        if (DesignTreeView.variables.selPriceDiaPurity)
            myfilter.rules.push({ field: "DIAPURITY", op: "eq", data: DesignTreeView.variables.selPriceDiaPurity });
        if (DesignTreeView.variables.selPriceAccId)
            myfilter.rules.push({ field: "PRICEACCID", op: "eq", data: DesignTreeView.variables.selPriceAccId });

        $.ajax({
            url: getDomain() + DesignTreeView.variables.BindRelatedDesignUrl + "&myfilters=" + JSON.stringify(myfilter),
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
                        var vars = {};
                        $.views.helpers({
                            getvar: function (key) {
                                return vars[key];
                            }
                        });
                        $.views.tags({
                            setvar: function (key, value) {
                                vars[key] = value;
                            }
                        });
                        $.views.settings.allowCode = true;
                        $("#listRelatedDesigns").html($("#renderRelatedDesign").render(JsonObject.serviceresponse.detailslist.details));
                    }
                }
                else {
                    DevExVariables.InvalidResponseCode(data);
                }
            },
            error: OnError
        });

    },

    SelectImgFromSlider: function (org_path, type) {
        if (type == "VIDEO") {
            $("#selectedImgPreview").hide();
            $("#selectedVideoPreview").show();
            $('#selectedVideoPreview source').attr('src', org_path);
            $("#selectedVideoPreview")[0].load();
        }
        else {
            $("#selectedImgPreview").show();
            $("#selectedVideoPreview").hide();
            $("#selectedImgPreview").attr("src", org_path);
        }
    },

    GetFormatedCurrency: function (price) {
        var convertint = parseFloat(price).toLocaleString(getDisLanguage(), {
            style: 'currency', currency: getCurrencyCode(),
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });

        return convertint;
    },

    GetPriceDefaultAcc: function () {
        var myfilter = { rules: [] };
        myfilter.rules.push({ field: "ACCOUNTNAME", op: "cn", data: 'B2B Sale' });

        $.ajax({
            url: getDomain() + DesignTreeView.variables.BindAccListUrl + "&myfilters=" + JSON.stringify(myfilter),
            async: false,
            cache: false,
            type: 'POST',
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    var jsonObject = xml2json.parser(data);
                    if (jsonObject.serviceresponse.detailslist) {
                        var priceData;
                        if (jsonObject.serviceresponse.detailslist.details.length > 1)
                            priceData = jsonObject.serviceresponse.detailslist.details[0];
                        else
                            priceData = jsonObject.serviceresponse.detailslist.details;

                        DesignTreeView.variables.selPriceAccId = priceData.accid;
                        DesignTreeView.variables.selPriceAccName = priceData.accountname;
                    }
                }
                else {
                    DevExVariables.InvalidResponseCode(data);
                }
            },
            error: OnError
        });
    },

    initDevExgridSelItem_CartList: function () {
        //if (DesignTreeView.variables.dx_gridSelectionItem_CartList) {
        //    DesignTreeView.variables.dx_gridSelectionItem_CartList.refresh();
        //}
        //else {
            DesignTreeView.variables.dx_gridSelectionItem_CartList = $("#dx_gridSelectionItem_CartList").dxDataGrid({
                dataSource: new DevExpress.data.CustomStore({
                    key: DesignTreeView.variables.CartStockType == "Virtual Stock" ? "dm_id" : "pm_id",
                    load: function (loadOptions) {
                        var deferred = $.Deferred();
                        var myfilter = { rules: [] };
                        myfilter.rules.push({ field: "STOCKTYPE", op: "eq", data: DesignTreeView.variables.CartStockType });
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
                            url: getDomain() + DesignTreeView.variables.BindSelectionList_CartUrl + "&" + parameters.join("&") + "&myfilters=" + JSON.stringify(myfilter),
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
                            var List = [];
                            if (result.serviceresponse.detailslist) {
                                if (Array.isArray(result.serviceresponse.detailslist.details))
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
                selection: {
                    mode: "multiple"
                },
                filterRow: {
                    visible: true,
                    applyFilter: "auto"
                },
                remoteOperations: true,
                scrolling: {
                    mode: 'virtual',
                    rowRenderingMode: 'virtual',
                },
                paging: {
                    pageSize: 10
                },
                pager: {
                    showPageSizeSelector: false,
                    allowedPageSizes: [10, 30, 50]
                },
                height: 500,
                columns: [
                    {
                        dataField: "designcode", caption: "Design Code", dataType: "string", alignment: "center", filterOperations: ["contains"],
                        cellTemplate: function (container, options) {
                            var temp = '<div style="position:relative;"><a href="' + options.data.imgpath + '" data-fancybox="gallery">' +
                                            '<img height="50" width="50" src="' + options.data.imgpath_thumb + '" />' +
                                        '</a>' +
                                        '<div>' + options.displayValue + '</div>';

                            if (options.data.newdesign)
                                temp += '<div style="position: absolute;top: -7px;right: -7px;"><img src="' + getDomain() + '/Content/images/new.png" /></div>';

                            temp += '</div>';

                            $(temp).appendTo(container);
                        }
                    },
                    { dataField: "bagno", caption: "Bag No", dataType: "string", alignment: "center", filterOperations: ["contains"], visible: DesignTreeView.variables.CartStockType == "Virtual Stock" ? false : true },
                    {
                        dataField: "desgcate", caption: "Category", dataType: "string", allowSorting: false, filterOperations: ["contains"],
                        cellTemplate: function (container, options) {
                            var temp = '<div>' + options.displayValue + '</div><hr style="margin:0;" /><div>' + options.data.desgsubcate + '</div>';
                            temp += '<div title="' + options.data.maxsold + '">' + htmlDecode(options.data.ratestar1) + '</div>';
                            $(temp).appendTo(container);
                        }
                    },
                    { dataField: "grosswright", caption: "Gross Wgt", alignment: "right", allowSorting: false, allowFiltering: false },
                    { dataField: "netweight", caption: "Net Wgt", alignment: "right", allowSorting: false, allowFiltering: false },
                    {
                        dataField: "diacts", caption: "Dia Pcs | Cts", dataType: "string", alignment: "right", allowSorting: false, allowFiltering: false,
                        cellTemplate: function (container, options) {
                            var temp = '<div>' + options.data.diapcs + ' <i>pcs</i> | ' + options.displayValue + ' <i>cts</i></div>';
                            $(temp).appendTo(container);
                        }
                    },
                ],
            }).dxDataGrid("instance");
        //}
    },

    SelListDeleteRow_Cart: function (id) {
        var rowData = DesignTreeView.variables.dx_gridSelectionList.getVisibleRows()[DesignTreeView.variables.dx_gridSelectionList.getRowIndexByKey(+id)].data;
        DesignTreeView.variables.DeleteDataObj = rowData;

        if (DesignTreeView.variables.dx_popupSelListDelete) {
            DesignTreeView.variables.dx_popupSelListDelete.option("contentTemplate", DesignTreeView.variables.DeletePopUpOptions.contentTemplate(DesignTreeView.variables.DeleteDataObj).bind(this));
        } else {
            DesignTreeView.variables.dx_popupSelListDelete = $("#dx_popupSelListDelete").dxPopup(DesignTreeView.variables.DeletePopUpOptions).dxPopup("instance");
        }

        DesignTreeView.variables.dx_popupSelListDelete.show();
    },

    ClearCatalogControls: function () {
        DesignTreeView.variables.CatalogOpr = "EditItems";
        DesignTreeView.variables.SelListMasId = "";
        DesignTreeView.variables.dx_txtSelectionListName.option({ value: "" });
        DesignTreeView.variables.dx_txtSelectionListRemark.option({ value: "" });
        DesignTreeView.variables.dx_txtAutoSelecList.option({ "value": "" }, { "items": "" }, { "selectedItem": "" });
        $(".Addcatalog").hide();
        $(".Editcatalog").show();
        $("#FrmCatalogList").hide();
        $("#FrmCatalogItemList").hide();
        $("#FrmShareCatalog").hide();
        $("#FrmCatalogEntry").show();
        DesignTreeView.variables.dx_btnCancel.option({ visible: false });
        DesignTreeView.variables.dx_btnAddSelectionList.option({ visible: true });
        DesignTreeView.variables.dx_btnSaveSelectionList.option({ visible: true });
        DesignTreeView.variables.dx_btnViewSelectionList.option({ visible: true });
    },

    GetCatalogName: function () {
        var d = new Date();
        var month = d.getMonth() + 1;
        var day = d.getDate();
        var output = (day < 10 ? '0' : '') + day + '_' + (month < 10 ? '0' : '') + month + '_' + d.getFullYear();
        return 'Catalog_' + output;
    },

    ClearSelListMas: function () {
        DesignTreeView.variables.SelListMasId = "";
        $(".Addcatalog").hide();
        $(".Editcatalog").hide();
        $("#FrmCatalogItemList").hide();
        $("#FrmShareCatalog").hide();
        $("#FrmCatalogEntry").hide();
        $("#FrmCatalogList").show();
        DesignTreeView.variables.dx_txtAutoComplite_PartyList.option({ visible: false });
        DesignTreeView.variables.dx_catalogtool.option({ visible: false });
        DesignTreeView.variables.dx_btnViewSelectionList.option({ visible: false });
        DesignTreeView.variables.dx_btnAddSelectionList.option({ visible: false });
        DesignTreeView.variables.dx_btnSaveSelectionList.option({ visible: false });
        DesignTreeView.variables.dx_btnBackFromList.option({ visible: true });
        DesignTreeView.variables.dx_btnCancel.option({ visible: false });
        DesignTreeView.variables.dx_gridSelectionList.refresh();
    },

    initDevExgridSelList: function () {
        DesignTreeView.variables.dx_gridSelectionList = $("#dx_gridSelectionList").dxDataGrid({
            dataSource: new DevExpress.data.CustomStore({
                key: "listid",
                load: function (loadOptions) {
                    var deferred = $.Deferred();

                    var result = DevExVariables.GetDataList(loadOptions, DesignTreeView.variables.BindSelectionListUrl);

                    if (result != "Error") {
                        var List = [];
                        if (result.serviceresponse.detailslist) {
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
            filterRow: {
                visible: true,
                applyFilter: "auto"
            },
            remoteOperations: true,
            scrolling: {
                mode: 'virtual',
                rowRenderingMode: 'virtual',
            },
            paging: {
                pageSize: 10
            },
            pager: {
                showPageSizeSelector: false,
                allowedPageSizes: [10, 30, 50]
            },
            height: 400,
            columns: [{ dataField: "listid", dataType: "number", allowFiltering: false, visible: false },
                { dataField: "listname", caption: "List Name", dataType: "string", allowSorting: false, filterOperations: ["contains"] },
                { dataField: "total_items", caption: "Total Items", dataType: "string", alignment: "right", allowSorting: false, filterOperations: ["contains"] },
                { dataField: "remark", caption: "Remark", dataType: "string", allowSorting: false, filterOperations: ["contains"] },
                 {
                     dataField: "Action", caption: "Action", alignment: "center", allowFiltering: false, allowSorting: false,
                     cellTemplate: function (container, options) {
                         var temp = "";
                         temp += '<span class="btn btn-default" style="padding: 2px 6px;" onclick=\'DesignTreeView.ViewSelListItems("' + options.key + '");\'><i class="fa fa-list"></i></span>';

                         if (isU())
                             temp += '<span class="btn btn-primary" style="padding: 2px 6px;margin-left:5px;" onclick=\'DesignTreeView.SelListTriggerId("' + options.key + '");\'><i class="fa fa-pencil"></i></span>';

                         if (isD())
                             temp += '<span class="btn btn-danger" style="padding: 2px 6px;margin-left:5px;" onclick=\'DesignTreeView.SelListDeleteRow("' + options.key + '");\'><i class="fa fa-trash-o"></i></span>';

                         $(temp).appendTo(container);
                     }
                 },
            ],
        }).dxDataGrid("instance");
    },

    SelListTriggerId: function (id) {
        var rowData = DesignTreeView.variables.dx_gridSelectionList.getVisibleRows()[DesignTreeView.variables.dx_gridSelectionList.getRowIndexByKey(+id)].data;
        DesignTreeView.variables.SelListMasId = id;
        DesignTreeView.variables.CatalogOpr = "Edit";
        DesignTreeView.variables.dx_txtSelectionListName.option("value", rowData.listname);
        DesignTreeView.variables.dx_txtSelectionListRemark.option("value", rowData.remark);
        $(".Editcatalog").hide();
        $(".Addcatalog").show();
        $("#FrmCatalogList").hide();
        $("#FrmCatalogItemList").hide();
        $("#FrmShareCatalog").hide();
        $("#FrmCatalogEntry").show();
        DesignTreeView.variables.dx_btnAddSelectionList.option({ visible: false });
        DesignTreeView.variables.dx_btnViewSelectionList.option({ visible: false });
        DesignTreeView.variables.dx_btnSaveSelectionList.option({ visible: true });
        DesignTreeView.variables.dx_btnCancel.option({ visible: true });
    },

    SelListDeleteRow: function (id) {
        var rowData = DesignTreeView.variables.dx_gridSelectionList.getVisibleRows()[DesignTreeView.variables.dx_gridSelectionList.getRowIndexByKey(+id)].data;
        DesignTreeView.variables.DeleteDataObj = rowData;
        DesignTreeView.variables.dx_popupSelListDelete = "";
        DesignTreeView.variables.dx_popupSelListDelete = $("#dx_popupSelListDelete").dxPopup(DesignTreeView.variables.DeletePopUpOptions).dxPopup("instance");
        DesignTreeView.variables.dx_popupSelListDelete.show();
    },

    ViewSelListItems: function (id) {
        DesignTreeView.variables.Golabal_QoutationList = "";
        $("#FrmCatalogList").hide();
        $("#FrmCatalogEntry").hide();
        $("#FrmShareCatalog").hide();
        $("#FrmCatalogItemList").show();
        DesignTreeView.variables.dx_txtAutoComplite_PartyList.option({ "value": "" }, { "items": "" }, { "selectedItem": "" });
        DesignTreeView.variables.dx_catalogtool.option({ visible: true });
        DesignTreeView.variables.dx_txtAutoComplite_PartyList.option({ visible: true });
        DesignTreeView.initDevExgridSelItemList(id);
        DesignTreeView.variables.dx_gridSelectionItemList.clearSelection();
    },

    ViewCatalogItemList: function () {
        $("#FrmCatalogItemList").show();
        $("#FrmShareCatalog").hide();
        $("#FrmCatalogEntry").hide();
        $("#FrmCatalogList").hide();
        DesignTreeView.variables.dx_btnAddSelectionList.option({ visible: false });
        DesignTreeView.variables.dx_btnViewSelectionList.option({ visible: false });
        DesignTreeView.variables.dx_txtAutoComplite_PartyList.option({ visible: true });
        DesignTreeView.variables.dx_btnSaveSelectionList.option({ visible: false });
        DesignTreeView.variables.dx_btnBackFromList.option({ visible: false });
        DesignTreeView.variables.dx_catalogtool.option({ visible: true });
    },

    initDevExgridSelItemList: function (ListId) {
        DesignTreeView.variables.dx_gridSelectionItemList = $("#dx_gridSelectionItemList").dxDataGrid({
            dataSource: new DevExpress.data.CustomStore({
                key: "listitemid",
                load: function (loadOptions) {
                    var deferred = $.Deferred();

                    var url = DesignTreeView.variables.BindSelectionListItemsUrl + "&_search=true&searchField=LISTID&searchOper=eq&searchString=" + ListId;
                    var result = DevExVariables.GetDataList(loadOptions, url);
                    if (result != "Error") {
                        var List = [];
                        if (result.serviceresponse.detailslist) {
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
            columnAutoWidth: true,
            showBorders: true,
            showColumnLines: true,
            showRowLines: true,
            selection: {
                mode: "multiple"
            },
            filterRow: {
                visible: true,
                applyFilter: "auto"
            },
            remoteOperations: true,
            scrolling: {
                mode: 'virtual',
                rowRenderingMode: 'virtual',
            },
            paging: {
                pageSize: 10
            },
            pager: {
                showPageSizeSelector: false,
                allowedPageSizes: [10, 30, 50]
            },
            height: 500,
            columns: [
                {
                    dataField: "designcode", caption: "Design Code", dataType: "string", alignment: "center", filterOperations: ["contains"],
                    cellTemplate: function (container, options) {
                        var temp = '<div style="position:relative;"><a href="' + options.data.imgpath + '" data-fancybox="gallery">' +
                                        '<img height="50" width="50" src="' + options.data.imgpath_thumb + '" />' +
                                    '</a>' +
                                    '<div>' + options.displayValue + '</div>';

                        if (options.data.newdesign)
                            temp += '<div style="position: absolute;top: -7px;right: -7px;"><img src="' + getDomain() + '/Content/images/new.png" /></div>';

                        temp += '</div>';

                        $(temp).appendTo(container);
                    }
                },
                {
                    dataField: "desgcate", caption: "Category", dataType: "string", allowSorting: false, filterOperations: ["contains"],
                    cellTemplate: function (container, options) {
                        var temp = '<div>' + options.displayValue + '</div><hr style="margin:0;" /><div>' + options.data.desgsubcate + '</div>';
                        temp += '<div title="' + options.data.maxsold + '">' + htmlDecode(options.data.ratestar1) + '</div>';
                        $(temp).appendTo(container);
                    }
                },
                { dataField: "grosswright", caption: "Gross Wgt", alignment: "right", allowSorting: false, allowFiltering: false },
                { dataField: "netweight", caption: "Net Wgt", alignment: "right", allowSorting: false, allowFiltering: false },
                {
                    dataField: "diacts", caption: "Dia Pcs | Cts", dataType: "string", alignment: "right", allowSorting: false, allowFiltering: false,
                    cellTemplate: function (container, options) {
                        var temp = '<div>' + options.data.diapcs + ' <i>pcs</i> | ' + options.displayValue + ' <i>cts</i></div>';
                        $(temp).appendTo(container);
                    }
                },
            ],
        }).dxDataGrid("instance");
    },

    //GetColourList: function () {
    //    var myfilter = { rules: [] };
    //    myfilter.rules.push({ field: "RMCATENAME", op: "eq", data: "METAL" });
    //    myfilter.rules.push({ field: "TYPE", op: "eq", data: "Colour" });

    //    $.ajax({
    //        url: getDomain() + DesignTreeView.variables.BindStaticDataUrl + "&myfilters=" + JSON.stringify(myfilter),
    //        async: true,
    //        cache: false,
    //        type: 'POST',
    //        success: function (data) {
    //            if ($(data).find('RESPONSECODE').text() == "0") {
    //                var JsonObject = xml2json.parser(data);
    //                var List = [];
    //                if (JsonObject.serviceresponse.detailslist) {
    //                    if (JsonObject.serviceresponse.detailslist.details.length)
    //                        List = JsonObject.serviceresponse.detailslist.details;
    //                    else
    //                        List.push(JsonObject.serviceresponse.detailslist.details);
    //                    DesignTreeView.variables.dx_tagColor.option({
    //                        dataSource: new DevExpress.data.ArrayStore({
    //                            data: List,
    //                            key: "colourid"
    //                        }),
    //                        displayExpr: "colour",
    //                        valueExpr: "colourid",
    //                    });
    //                }
    //            }
    //            else {
    //                DevExVariables.InvalidResponseCode(data);
    //            }
    //        },
    //        error: OnError
    //    });
    //},

    //GetPurityList: function () {
    //    var myfilter = { rules: [] };
    //    myfilter.rules.push({ field: "RMCATENAME", op: "eq", data: "METAL" });
    //    myfilter.rules.push({ field: "TYPE", op: "eq", data: "Purity" });

    //    $.ajax({
    //        url: getDomain() + DesignTreeView.variables.BindStaticDataUrl + "&myfilters=" + JSON.stringify(myfilter),
    //        async: true,
    //        cache: false,
    //        type: 'POST',
    //        success: function (data) {
    //            if ($(data).find('RESPONSECODE').text() == "0") {
    //                var JsonObject = xml2json.parser(data);
    //                if (JsonObject.serviceresponse.detailslist) {
    //                    DesignTreeView.variables.dx_tagPurity.option({
    //                        dataSource: new DevExpress.data.ArrayStore({
    //                            data: JsonObject.serviceresponse.detailslist.details,
    //                            key: "purityid"
    //                        }),
    //                        displayExpr: "purity",
    //                        valueExpr: "purityid",
    //                    });
    //                }
    //            }
    //            else {
    //                DevExVariables.InvalidResponseCode(data);
    //            }
    //        },
    //        error: OnError
    //    });
    //},

    //GetMetalList: function () {
    //    var myfilter = { rules: [] };
    //    myfilter.rules.push({ field: "RMCATENAME", op: "eq", data: "Metal" });
    //    myfilter.rules.push({ field: "TYPE", op: "eq", data: "RmSubcate" });
    //    $.ajax({
    //        url: getDomain() + DesignTreeView.variables.BindStaticDataUrl + "&myfilters=" + JSON.stringify(myfilter),
    //        async: true,
    //        cache: false,
    //        type: 'POST',
    //        success: function (data) {
    //            if ($(data).find('RESPONSECODE').text() == "0") {
    //                var JsonObject = xml2json.parser(data);
    //                if (JsonObject.serviceresponse.detailslist) {
    //                    DesignTreeView.variables.dx_tagMetalType.option({
    //                        dataSource: new DevExpress.data.ArrayStore({
    //                            data: JsonObject.serviceresponse.detailslist.details,
    //                            key: "rmsubcateid"
    //                        }),
    //                        displayExpr: "rmsubcate",
    //                        valueExpr: "rmsubcateid",
    //                    });
    //                }
    //            }
    //            else {
    //                DevExVariables.InvalidResponseCode(data);
    //            }
    //        },
    //        error: OnError
    //    });
    //},

    GetDiaPurityList: function () {
        var myfilter = { rules: [] };
        myfilter.rules.push({ field: "RMCATENAME", op: "eq", data: "GEMS" });
        myfilter.rules.push({ field: "TYPE", op: "eq", data: "Purity" });
        myfilter.rules.push({ field: "ISUSEINJEWELLERY", op: "eq", data: true });

        $.ajax({
            url: getDomain() + DesignTreeView.variables.BindStaticDataUrl + "&myfilters=" + JSON.stringify(myfilter),
            async: true,
            cache: false,
            type: 'POST',
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    var JsonObject = xml2json.parser(data);
                    if (JsonObject.serviceresponse.detailslist) {
                        DesignTreeView.variables.dx_tagDiaPurity.option({
                            dataSource: new DevExpress.data.ArrayStore({
                                data: JsonObject.serviceresponse.detailslist.details,
                                key: "purityid"
                            }),
                            displayExpr: "purity",
                            valueExpr: "purity",
                        });

                        DesignTreeView.variables.dx_ddlPriceDiaPurity.option({
                            dataSource: new DevExpress.data.ArrayStore({
                                data: JsonObject.serviceresponse.detailslist.details,
                                key: "purityid"
                            }),
                            displayExpr: "purity",
                            valueExpr: "purityid",
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

    GetDiaColourList: function () {
        var myfilter = { rules: [] };
        myfilter.rules.push({ field: "RMCATENAME", op: "eq", data: "GEMS" });
        myfilter.rules.push({ field: "TYPE", op: "eq", data: "Colour" });
        myfilter.rules.push({ field: "ISUSEINJEWELLERY", op: "eq", data: true });

        $.ajax({
            url: getDomain() + DesignTreeView.variables.BindStaticDataUrl + "&myfilters=" + JSON.stringify(myfilter),
            async: true,
            cache: false,
            type: 'POST',
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    var JsonObject = xml2json.parser(data);
                    var List = [];
                    if (JsonObject.serviceresponse.detailslist) {
                        if (JsonObject.serviceresponse.detailslist.details.length)
                            List = JsonObject.serviceresponse.detailslist.details;
                        else
                            List.push(JsonObject.serviceresponse.detailslist.details);
                        DesignTreeView.variables.dx_tagDiaColour.option({
                            dataSource: new DevExpress.data.ArrayStore({
                                data: List,
                                key: "colourid"
                            }),
                            displayExpr: "colour",
                            valueExpr: "colour",
                        });

                        DesignTreeView.variables.dx_ddlPriceDiaColor.option({
                            dataSource: new DevExpress.data.ArrayStore({
                                data: List,
                                key: "colourid"
                            }),
                            displayExpr: "colour",
                            valueExpr: "colourid",
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

    //BindSubBookList: function () {
    //    var myfilter = { rules: [] };
    //    myfilter.rules.push({ field: "TYPE", op: "eq", data: "AccSubBook" });
    //    myfilter.rules.push({ field: "SUBBOOKTYPE", op: "eq", data: "FINISHED" });
    //    myfilter.rules.push({ field: "MASTERBOOK", op: "eq", data: 2 });

    //    $.ajax({
    //        url: getDomain() + DesignTreeView.variables.BindStaticDataUrl + "&myfilters=" + JSON.stringify(myfilter),
    //        async: true,
    //        cache: false,
    //        type: 'POST',
    //        success: function (data) {
    //            if ($(data).find('RESPONSECODE').text() == "0") {
    //                var JsonObject = xml2json.parser(data);
    //                if (JsonObject.serviceresponse.detailslist) {
    //                    var List = [];
    //                    if (JsonObject.serviceresponse.detailslist.details.length) {
    //                        List = JsonObject.serviceresponse.detailslist.details;
    //                    }
    //                    else {
    //                        List.push(JsonObject.serviceresponse.detailslist.details);
    //                    }

    //                    DesignTreeView.variables.dx_ddlSubBookMaster.option({
    //                        dataSource: new DevExpress.data.ArrayStore({
    //                            data: List,
    //                            key: "sbookid"
    //                        }),
    //                        displayExpr: "subbook",
    //                        valueExpr: "sbookid"
    //                    });
    //                }
    //            }
    //            else {
    //                DevExVariables.InvalidResponseCode(data);
    //            }
    //        },
    //        error: OnError
    //    });
    //},

    GetAllList: function () {
        var myfilter = { rules: [] };
        //myfilter.rules.push({ field: "DESGCATID", op: "eq", data: CatId });
        //myfilter.rules.push({ field: "RMCATENAME", op: "eq", data: "METAL" });
        myfilter.rules.push({ field: "SUBBOOKTYPE", op: "eq", data: "FINISHED" });
        myfilter.rules.push({ field: "ONLYALLOWED", op: "eq", data: true });
        myfilter.rules.push({ field: "MASTERBOOK", op: "eq", data: 2 });
        myfilter.rules.push({ field: "TYPE", op: "eq", data: "DesgCate,ConceptOf,Purity,Colour,RmSubcate,AccSubBook" });

        $.ajax({
            url: getDomain() + DesignTreeView.variables.BindStaticMultipleDataUrl + "&myfilters=" + JSON.stringify(myfilter),
            async: true,
            cache: false,
            type: 'POST',
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    var JsonObject = xml2json.parser(data);
                    if (JsonObject.serviceresponse.detailslist_desgcate) {
                        var firstcat = "", DS = [];
                        if (JsonObject.serviceresponse.detailslist_desgcate.details.length > 1) {
                            firstcat = JsonObject.serviceresponse.detailslist_desgcate.details[0].desgcateid;
                            DS = JsonObject.serviceresponse.detailslist_desgcate.details;
                        }
                        else {
                            firstcat = JsonObject.serviceresponse.detailslist_desgcate.details.desgcateid;
                            DS = [{ desgcateid: JsonObject.serviceresponse.detailslist_desgcate.details.desgcateid, desgcate: JsonObject.serviceresponse.detailslist_desgcate.details.desgcate }];
                        }

                        DesignTreeView.variables.dx_ddlCategory.option({
                            dataSource: new DevExpress.data.ArrayStore({
                                data: DS,
                                key: "desgcateid"
                            }),
                            displayExpr: "desgcate",
                            valueExpr: "desgcateid",
                            //value: firstcat,
                        });
                    }

                    if (JsonObject.serviceresponse.detailslist_conceptof) {
                        DesignTreeView.variables.dx_tagConcept.option({
                            dataSource: new DevExpress.data.ArrayStore({
                                data: JsonObject.serviceresponse.detailslist_conceptof.details,
                                key: "conceptofid"
                            }),
                            displayExpr: "conceptofname",
                            valueExpr: "conceptofid",
                        });
                    }


                    if (JsonObject.serviceresponse.detailslist_purity) {
                        var List = [];
                        if (JsonObject.serviceresponse.detailslist_purity.details.length)
                            List = JsonObject.serviceresponse.detailslist_purity.details;
                        else
                            List.push(JsonObject.serviceresponse.detailslist_purity.details);
                        DesignTreeView.variables.dx_tagPurity.option({
                            dataSource: new DevExpress.data.ArrayStore({
                                data: List.filter(function (x) { return x.rmcate == 'METAL' }),
                                key: "purityid"
                            }),
                            displayExpr: "purity",
                            valueExpr: "purityid",
                        });

                        //DesignTreeView.variables.dx_tagDiaPurity.option({
                        //    dataSource: new DevExpress.data.ArrayStore({
                        //        data: List.filter(function (x) { return x.rmcate == 'GEMS' && x.isuseinjewellery == true  }),
                        //        key: "purityid"
                        //    }),
                        //    displayExpr: "purity",
                        //    valueExpr: "purity",
                        //});

                        //DesignTreeView.variables.dx_ddlPriceDiaPurity.option({
                        //    dataSource: new DevExpress.data.ArrayStore({
                        //        data: List.filter(function (x) { return x.rmcate == 'GEMS' && x.isuseinjewellery == true  }),
                        //        key: "purityid"
                        //    }),
                        //    displayExpr: "purity",
                        //    valueExpr: "purityid",
                        //});

                    }

                    if (JsonObject.serviceresponse.detailslist_colour) {
                        var List = [];
                        if (JsonObject.serviceresponse.detailslist_colour.details.length)
                            List = JsonObject.serviceresponse.detailslist_colour.details;
                        else
                            List.push(JsonObject.serviceresponse.detailslist_colour.details);
                        DesignTreeView.variables.dx_tagColor.option({
                            dataSource: new DevExpress.data.ArrayStore({
                                data: List.filter(function (x) { return x.rmcate == 'METAL' }),
                                key: "colourid"
                            }),
                            displayExpr: "colour",
                            valueExpr: "colourid",
                        });


                        //DesignTreeView.variables.dx_tagDiaColour.option({
                        //    dataSource: new DevExpress.data.ArrayStore({
                        //        data: List.filter(function (x) { return x.rmcate == 'GEMS' && x.isuseinjewellery == true }),
                        //        key: "colourid"
                        //    }),
                        //    displayExpr: "colour",
                        //    valueExpr: "colour",
                        //});

                        //DesignTreeView.variables.dx_ddlPriceDiaColor.option({
                        //    dataSource: new DevExpress.data.ArrayStore({
                        //        data: List.filter(function (x) { return x.rmcate == 'GEMS' && x.isuseinjewellery == true }),
                        //        key: "colourid"
                        //    }),
                        //    displayExpr: "colour",
                        //    valueExpr: "colourid",
                        //});
                    }

                    if (JsonObject.serviceresponse.detailslist_rmsubcate) {
                        var List = [];
                        if (JsonObject.serviceresponse.detailslist_rmsubcate.details.length) {
                            List = JsonObject.serviceresponse.detailslist_rmsubcate.details;
                        }
                        else {
                            List.push(JsonObject.serviceresponse.detailslist_rmsubcate.details);
                        }
                                            DesignTreeView.variables.dx_tagMetalType.option({
                                                dataSource: new DevExpress.data.ArrayStore({
                                                    data: List.filter(function (x) { return x.rmcate == 'METAL' }),
                                                    key: "rmsubcateid"
                                                }),
                                                displayExpr: "rmsubcate",
                                                valueExpr: "rmsubcateid",
                                            });
                    }
                
                    if (JsonObject.serviceresponse.detailslist_accsubbook) {
                        var List = [];
                        if (JsonObject.serviceresponse.detailslist_accsubbook.details.length) {
                            List = JsonObject.serviceresponse.detailslist_accsubbook.details;
                        }
                        else {
                            List.push(JsonObject.serviceresponse.detailslist_accsubbook.details);
                        }

                        DesignTreeView.variables.dx_ddlSubBookMaster.option({
                            dataSource: new DevExpress.data.ArrayStore({
                                data: List,
                                key: "sbookid"
                            }),
                            displayExpr: "subbook",
                            valueExpr: "sbookid"
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

  };
$(document).ready(function () {
    DesignTreeView.FormInitialize();
    DesignTreeView.GetPriceDefaultAcc();
    DesignTreeView.GetAllList();

    //DesignTreeView.GetCategoryList();
    //DesignTreeView.GetColourList();
    //DesignTreeView.GetPurityList();
    DesignTreeView.GetDiaPurityList();
    DesignTreeView.GetDiaColourList();
    //DesignTreeView.GetMetalList();
    //DesignTreeView.BindSubBookList();
    DesignTreeView.variables.dx_ddlCategory.focus();
    DesignTreeView.BindSelectionList_CartCounting();
    $("#FilterProductlistModal").on("show.bs.modal", function () {
        if (!$("#diamondallshape").html().trim())
            DesignTreeView.GetDiaShapeList();

        if (DesignTreeView.variables.dx_tagConcept.option().items.length == 0)
            //DesignTreeView.GetConceptOfList();

        DesignTreeView.variables.dx_txtFromDate.option({ value: DesignTreeView.variables.selFromDate });
        DesignTreeView.variables.dx_txtToDate.option({ value: DesignTreeView.variables.selToDate });
        DesignTreeView.variables.dx_ddlIsActive.option({ value: DesignTreeView.variables.selIsActive });
        DesignTreeView.variables.dx_ddlDisWebB2B.option({ value: DesignTreeView.variables.selDisOnB2BWeb });
        DesignTreeView.variables.dx_ddlDisAppB2B.option({ value: DesignTreeView.variables.selDisOnB2BApp });
        DesignTreeView.variables.dx_ddlDisOutlet.option({ value: DesignTreeView.variables.selDisOnOutlet });
        DesignTreeView.variables.dx_ddlDisWebB2C.option({ value: DesignTreeView.variables.selDisOnB2CWeb });
        DesignTreeView.variables.dx_ddlDisAppB2C.option({ value: DesignTreeView.variables.selDisOnB2CApp });
        DesignTreeView.variables.dx_txtDiaWtFrom.option({ value: DesignTreeView.variables.selDiaFromWgt || 0 });
        DesignTreeView.variables.dx_txtDiaWtTo.option({ value: DesignTreeView.variables.selDiaToWgt || 10 });
        DesignTreeView.variables.dx_rngDiaWgt.option({ start: DesignTreeView.variables.selDiaFromWgt || 0, end: DesignTreeView.variables.selDiaToWgt || 10 });
        DesignTreeView.variables.dx_txtGoldWtFrom.option({ value: DesignTreeView.variables.selGoldFromWgt || 0 });
        DesignTreeView.variables.dx_txtGoldWtTo.option({ value: DesignTreeView.variables.selGoldToWgt || 100 });
        DesignTreeView.variables.dx_rngGoldWgt.option({ start: DesignTreeView.variables.selGoldFromWgt || 0, end: DesignTreeView.variables.selGoldToWgt || 100 });
        DesignTreeView.variables.dx_txtPriceFrom.option({ value: DesignTreeView.variables.selPriceFrom || 0 });
        DesignTreeView.variables.dx_txtPriceTo.option({ value: DesignTreeView.variables.selPriceTo || 9999999 });
        DesignTreeView.variables.dx_rngPrice.option({ start: DesignTreeView.variables.selPriceFrom || 0, end: DesignTreeView.variables.selPriceTo || 9999999 });

        if (DesignTreeView.variables.selDiaShape)
            $("#" + DesignTreeView.variables.selDiaShape).trigger("click");

        if (DesignTreeView.variables.selCharniGroups)
            DesignTreeView.variables.dx_tagCharniGroup.option({ value: DesignTreeView.variables.selCharniGroups });

        if (DesignTreeView.variables.selCharni)
            DesignTreeView.variables.dx_tagCharni.option({ value: DesignTreeView.variables.selCharni });

        if (DesignTreeView.variables.selConcept)
            DesignTreeView.variables.dx_tagConcept.option({ value: DesignTreeView.variables.selConcept });

        if (DesignTreeView.variables.selStockType)
            DesignTreeView.variables.dx_tagStockType.option({ value: DesignTreeView.variables.selStockType });

        if (DesignTreeView.variables.selStockStatus)
            DesignTreeView.variables.dx_tagStockStatus.option({ value: DesignTreeView.variables.selStockStatus });

        if (DesignTreeView.variables.selMetalType)
            DesignTreeView.variables.dx_tagMetalType.option({ value: DesignTreeView.variables.selMetalType });

        if (DesignTreeView.variables.selPurity)
            DesignTreeView.variables.dx_tagPurity.option({ value: DesignTreeView.variables.selPurity });

        if (DesignTreeView.variables.selColor)
            DesignTreeView.variables.dx_tagColor.option({ value: DesignTreeView.variables.selColor });

        if (DesignTreeView.variables.selDiaPurity)
            DesignTreeView.variables.dx_tagDiaPurity.option({ value: DesignTreeView.variables.selDiaPurity });

        if (DesignTreeView.variables.selDiaColour)
            DesignTreeView.variables.dx_tagDiaColour.option({ value: DesignTreeView.variables.selDiaColour });


    });

    $("#ModalPriceSetting").on("show.bs.modal", function () {
        if (DesignTreeView.variables.selPriceAccName)
            DesignTreeView.variables.dx_txtPriceAcc.option({
                items: [{
                    accid: DesignTreeView.variables.selPriceAccId,
                    accountname: DesignTreeView.variables.selPriceAccName
                }],
                selectedItem: {
                    accid: DesignTreeView.variables.selPriceAccId,
                    accountname: DesignTreeView.variables.selPriceAccName
                },
                value: DesignTreeView.variables.selPriceAccName
            });

        if (DesignTreeView.variables.selPriceDiaColor)
            DesignTreeView.variables.dx_ddlPriceDiaColor.option({ value: DesignTreeView.variables.selPriceDiaColor });

        if (DesignTreeView.variables.selPriceDiaPurity)
            DesignTreeView.variables.dx_ddlPriceDiaPurity.option({ value: DesignTreeView.variables.selPriceDiaPurity });

    });

    $("#btnSaveChangeDisModal").click(function () {
        DesignTreeView.ChangeDisInWebsites();
    });

    $("#DesignRelated").on("hide.bs.modal", function () {
        $("#selectedImgPreview").attr("src", "");
        $('#selectedVideoPreview source').attr('src', "");
        $("#selectedVideoPreview")[0].load();
        $("#selectedImgPreview").show();
        $("#selectedVideoPreview").hide();
    });

    $("#btnViewMore").click(function () {
        DesignTreeView.GetDesignList(PageIndex, PageRecords);

    });

    $("#ModalSelectionList").on("shown.bs.modal", function () {
        DesignTreeView.ClearCatalogControls();
        DesignTreeView.initDevExgridSelList();
    });

    $("#btnmodalfilter").click(function () {
        $("#cart_panel").hide();
        $("#desgin_panel").show();
    });

    DesignTreeView.variables.dx_tlbTools.option({ disabled: true });


});