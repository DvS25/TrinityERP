var QuotationMasterView = {
    variables: {
        BindAccListUrl: "/Common/BindMastersDetails?ServiceName=ACCOUNTMASTER_GET",
        BindDesignListUrl: "/Common/BindMastersDetails?ServiceName=PRD_DESIGN_MASTER_GET",
        BindStaticDataUrl: "/Common/BindMastersDetails?ServiceName=STATIC_MASTER_GET&IsActive=true",
        PerformMasterOperationUrl_Party: "/Common/OpeartionsOnMaster?ServiceName=ACCOUNTMASTER_CRUD",
        PerformMasterOperationUrl: "/Common/OpeartionsOnMaster?ServiceName=ACC_QUOTATION_MASTER_CRUD",
        BindMainGridListUrl: "/Common/BindMastersDetails?ServiceName=ACC_QUOTATION_MASTER_GET",
        BindQuotationItemDetailsUrl: "/Common/BindMastersDetails?ServiceName=ACC_QUOTATION_ITEM_DETAILS_GET",
        BindQuotationDesignDetailsUrl: "/Common/BindMastersDetails?ServiceName=ACC_QUOTATION_DESIGN_DETAILS_GET",
        BindQuotMaterialRateUrl: "/Common/BindMastersDetails?ServiceName=ACC_QUOTATION_MATERIAL_RATE_LIST_GET",
        Oper: 'Add',
        addedit: "added",
        Masterid: "",
        DeleteDataObj: "",
        RowCount: 1,
        ListId: 1,
        ImgRowCount: 1,
        ImageUploadType: "",

        /*------------------------variables for main form Controls-----------------------*/
        dx_btnAddNew: "",
        dx_dataGrid: "",
        dx_popupRecordDelete: "",
        DeletePopUpOptions: {
            width: 300,
            height: 200,
            contentTemplate: function () {
                return $("<div />").append(
                    $("<p>Quotation No: <span>" + QuotationMasterView.variables.DeleteDataObj.quotation_no + "</span></p>")
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
                            "QM_ID": QuotationMasterView.variables.Masterid,
                            "oper": QuotationMasterView.variables.Oper,
                        }

                        $.ajax({
                            url: getDomain() + QuotationMasterView.variables.PerformMasterOperationUrl,
                            data: data,
                            async: true,
                            cache: false,
                            type: 'POST',
                            success: function (data) {
                                if ($(data).find('RESPONSECODE').text() == "0") {
                                    DevExVariables.Toaster("success", 'Record is deleted successfully');

                                    QuotationMasterView.variables.dx_popupRecordDelete.hide();
                                    QuotationMasterView.variables.dx_dataGrid.refresh();
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
        dx_txtQuoDate: "",
        dx_txtQuoNo: "",
        dx_ddlQuoType: "",
        dx_txtDueDays: "",
        dx_ddlPriority: "",
        dx_txtPartyName: "",
        dx_txtPartyCode: "",
        dx_btnPartyAdd: "",
        dx_ddlOrderby: "",
        dx_txtSearch: "",
        dx_btnSubmit: "",
        dx_btnCancel: "",
        QuotationTypeList: ["Party", "Stock"],
        PriorityList: ["High", "Low", "Medium"],
        /*------------------------/variables for main form Controls-----------------------*/

        /*------------------------variables for Add new Party form Controls-----------------------*/
        dx_txtAcc_Name: "",
        dx_txtHeadName: "",
        dx_ddlSubHead: "",
        dx_txtMobileNo: "",
        dx_ddlCountry: "",
        dx_ddlState: "",
        dx_ddlCity: "",
        dx_ddlCurrency: "",
        dx_Party_btnSubmit: "",
        dx_Party_btnCancel: "",
        /*------------------------/variables for Add new Party form Controls-----------------------*/

        /*------------------------variables for update design details controls-----------------------*/
        dx_ddlMRmCode: "",
        dx_ddlMColor: "",
        dx_txtMRate: "",
        dx_ddlDRmCode: "",
        dx_ddlDPurity: "",
        dx_ddlDColor: "",
        dx_ddlSRmCode: "",
        dx_ddlSPurity: "",
        dx_ddlSColor: "",
        dx_ddlLab: "",
        dx_txtCertiCharge: "",
        dx_ddlLabourOn: "",
        dx_txtLabourRate: "",
        dx_txtHandlingRate: "",
        dx_txtQty: "",
        dx_dtPromiseDate: "",
        dx_txtRemark: "",
        dx_btnUpdatePara: "",
        dx_btnCancelPara: "",
        dx_btnUpdateItem: "",
        dx_btnRemoveItem: "",
        dx_popupItemRemove: "",
        dx_popupItemCopy: "",
        dx_txtNumOfCopy: "",
        /*------------------------variables for update design details controls-----------------------*/

        /*------------------------variables for update item details--------------------------*/
        dx_txtDiaPcs: "",
        dx_txtDiaCrt: "",
        dx_txtNetWgt: "",
        dx_txtGrossWgt: "",
        dx_txtFineWgt: "",
        dx_btnUpdateItemDetails: "",
        dx_btnCancelItemDetails: "",
        DetailsControlsList: [],
        /*------------------------variables for update item details--------------------------*/

        PartyList_accid: '',
        QI_ID: '',
        Deleteid: '',
        Delete_postfix: '',
        dx_dataGridItems: "",

        RmCodeList: [],
        RmShapeList: [],
        RmPurityList: [],
        RmColorList: [],
        LabList: [],
        JsizeList: [],
        DestinationPath: "",

        //------------------------------ share model tools---------------------------------
        dx_txtSharetoPartyList: "",
        dx_RadioSocial: "",
        dx_txtVoucherMobileNo: "",
        dx_txtShareMessage: "",
        dx_txtSharingEmailId: "",
        dx_txtSharingSubject: "",
        dx_txtSharingEmailBody: "",
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
    //------------------------------ /share model tools---------------------------------
    },

    FormInitialize: function () {
        QuotationMasterView.variables.dx_dataGrid = $("#dx_dataGrid").dxDataGrid({
            dataSource: new DevExpress.data.CustomStore({
                key: "qm_id",
                load: function (loadOptions) {
                    var deferred = $.Deferred();

                    var result = DevExVariables.GetDataList(loadOptions, QuotationMasterView.variables.BindMainGridListUrl);

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
            sorting: {
                mode: "single" // or "multiple" | "none"
            },
            columns: [{ dataField: "qm_id", allowFiltering: false, allowSorting: true, sortIndex: 1, sortOrder: "desc", visible: false },
                { dataField: "quotation_no", caption: "Quotation No", dataType: "string", allowSorting: true, allowFiltering: true, filterOperations: ["contains"], allowHeaderFiltering: false },
                { dataField: "quotation_date", caption: "Quotation Date", dataType: "date", format: 'dd MMM yyyy', allowSorting: true, allowFiltering: false, filterOperations: ["="], allowHeaderFiltering: false },
                { dataField: "type", caption: "Quotation Type", dataType: "string", allowSorting: true, allowFiltering: true, filterOperations: ["contains"], allowHeaderFiltering: false },
                { dataField: "accountname", caption: "Party Name", dataType: "string", allowSorting: true, allowFiltering: true, filterOperations: ["contains"], allowHeaderFiltering: false },
                { dataField: "grosswgt", caption: "Gross Wgt", dataType: "number", allowSorting: false, allowFiltering: false, allowHeaderFiltering: false },
                { dataField: "totalamount", caption: "Total Amount", dataType: "number", allowSorting: false, allowFiltering: false, allowHeaderFiltering: false },
                { dataField: "totalqty", caption: "Total Items", dataType: "number", allowSorting: false, allowFiltering: false, allowHeaderFiltering: false },
                { dataField: "orderitems", caption: "Order Items", dataType: "number", allowSorting: false, allowFiltering: false, allowHeaderFiltering: false },
                { dataField: "pendingitems", caption: "Pending Items", dataType: "number", allowSorting: false, allowFiltering: false, allowHeaderFiltering: false },
                {
                    dataField: "isverify", caption: "Is Verify", dataType: "string", alignment: "center", filterOperations: ["contains"],
                    allowSorting: false, allowFiltering: false, allowHeaderFiltering: true,
                    headerFilter: {
                        dataSource: [{
                            text: "Yes",
                            value: ["isverify", "equals", 1]
                        }, {
                            text: "No",
                            value: ["isverify", "equals", 0]
                        }]
                    },
                    cellTemplate: function (container, options) {
                        if (getIsAllowedVerify()) {
                            $("<div>").dxSwitch({
                                value: options.value,
                                switchedOnText: "Yes",
                                switchedOffText: "No",
                                onValueChanged: function (data) {
                                    QuotationMasterView.EditDesignFromGrid(data.value, options.key, 'Active');
                                }
                            }).appendTo(container);
                        }
                        else
                            DevExVariables.LabelTemplate(container, options);
                    }
                },
                {
                    dataField: "isfinalsubmit", caption: "Status", dataType: "string", alignment: "center", allowSorting: false, allowFiltering: false, allowHeaderFiltering: false,
                    cellTemplate: function (container, options) {
                        var temp;
                        if (options.displayValue == "1") {
                            temp = '<span class="label label-success">Saved</span>';
                        }
                        else {
                            temp = '<span class="label label-danger">Draft</span>';
                        }

                        $(temp).appendTo(container);
                    }
                },
                {
                    dataField: "issignatured", caption: "Sign", dataType: "string", alignment: "center", allowSorting: false, allowFiltering: false, allowHeaderFiltering: false,
                    cellTemplate: function (container, options) {
                        var temp = "";
                        if (options.displayValue == "1") {
                            temp = '<i class="icon-checkmark4" style="color: #4caf50;"></i>';
                        }

                        $(temp).appendTo(container);
                    }
                },
                {
                    dataField: "Action", caption: "Action", alignment: "center", allowFiltering: false, allowSorting: false, fixed: true, fixedPosition: "right",
                    cellTemplate: function (container, options) {
                        DevExVariables.ActionTemplate(container, options, true, true, "QuotationMasterView", "Share,Pdf,Xls");
                    }
                },
            ]
        }).dxDataGrid("instance");

        QuotationMasterView.variables.dx_txtQuoDate = $("#dx_txtQuoDate").dxDateBox({
            type: "date",
            value: new Date(),
            showClearButton: true,
            useMaskBehavior: true,
            displayFormat: "dd MMM yyyy",
        }).dxValidator({
            validationGroup: "QuotationMaster",
            validationRules: [{
                type: "required",
                message: "Date is required"
            }]
        }).dxDateBox("instance");

        QuotationMasterView.variables.dx_txtQuoNo = $("#dx_txtQuoNo").dxTextBox({
            readOnly: true,
        }).dxValidator({
            validationGroup: "QuotationMaster",
            validationRules: []
        }).dxTextBox("instance");

        QuotationMasterView.variables.dx_ddlQuoType = $("#dx_ddlQuoType").dxSelectBox({
            dataSource: QuotationMasterView.variables.QuotationTypeList,
            value: QuotationMasterView.variables.QuotationTypeList[0],
            searchEnabled: true,
            onValueChanged: function (data) {
            }
        }).dxValidator({
            validationGroup: "QuotationMaster",
            validationRules: [{
                type: "required",
                message: "Quotation Type is required"
            }]
        }).dxSelectBox("instance");

        QuotationMasterView.variables.dx_txtDueDays = $("#dx_txtDueDays").dxTextBox({
            mode: "number",
            value: 0
        }).dxValidator({
            validationGroup: "QuotationMaster",
            validationRules: [{
                type: "required",
                message: "Quotation Days is required"
            }]
        }).dxTextBox("instance");

        QuotationMasterView.variables.dx_ddlPriority = $("#dx_ddlPriority").dxSelectBox({
            dataSource: QuotationMasterView.variables.PriorityList,
            value: QuotationMasterView.variables.PriorityList[0],
            searchEnabled: true,
        }).dxValidator({
            validationGroup: "QuotationMaster",
            validationRules: [{
                type: "required",
                message: "Priority is required"
            }]
        }).dxSelectBox("instance");

        QuotationMasterView.variables.dx_txtPartyName = $("#dx_txtPartyName").dxAutocomplete({
            placeholder: "Selection List ...",
            mode: "search",
            dataSource: new DevExpress.data.CustomStore({
                load: function (loadOptions) {
                    var deferred = $.Deferred();

                    var myfilter = { rules: [] };
                    myfilter.rules.push({ field: "GROUPNAME", op: "eq", data: "Creditors/Debitors" });

                    $.ajax({
                        url: getDomain() + QuotationMasterView.variables.BindAccListUrl + "&_search=true&searchField=ACCOUNTNAME&searchOper=cn&searchString=" + loadOptions.searchValue + "&myfilters=" + JSON.stringify(myfilter),
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
                //QuotationMasterView.variables.PartyList_accid = data.accid;
                //QuotationMasterView.variables.dx_txtPartyCode.option({ value: data.accid });
                return $("<div>" + data.accountname + "</div>");
            },
            onSelectionChanged: function (data) {
                if (data.selectedItem) {
                    QuotationMasterView.variables.PartyList_accid = data.selectedItem.accid;
                    QuotationMasterView.variables.dx_txtPartyCode.option({ value: data.selectedItem.partycode });
                }
                else {
                    QuotationMasterView.variables.PartyList_accid = "";
                    QuotationMasterView.variables.dx_txtPartyCode.option("value", "");
                    QuotationMasterView.variables.dx_txtPartyName.option("value", "");
                }
            },
            onFocusOut: function (data) {
                if (!data.component.option().selectedItem) {
                    QuotationMasterView.variables.PartyList_accid = "";
                    QuotationMasterView.variables.dx_txtPartyCode.option("value", "");
                    QuotationMasterView.variables.dx_txtPartyName.option("value", "");
                }
            },
            itemTemplate: function (data) {
                return $("<div class='product-name'>" + "(" + data.partycode + ")&nbsp;" + data.accountname + "</div>");
            },
        }).dxValidator({
            validationGroup: "QuotationMaster",
            validationRules: [{
                type: "required",
                message: "Party is required"
            }]
        }).dxAutocomplete("instance");

        QuotationMasterView.variables.dx_txtPartyCode = $("#dx_txtPartyCode").dxTextBox({
            readOnly: true,
            width: 90
        }).dxValidator({
            validationGroup: "QuotationMaster",
            validationRules: []
        }).dxTextBox("instance");

        QuotationMasterView.variables.dx_ddlOrderby = $("#dx_ddlOrderby").dxSelectBox({
            placeholder: "Select User Name...",
            searchEnabled: true,
        }).dxValidator({
            validationGroup: "QuotationMaster",
            validationRules: [{
                type: "required",
                message: "Order by name is required"
            }]
        }).dxSelectBox("instance");

        QuotationMasterView.variables.dx_txtSearch = $("#dx_txtSearch").dxAutocomplete({
            placeholder: "Search Design Code, Category, Ref Code ...",
            mode: "search",
            dataSource: new DevExpress.data.CustomStore({
                load: function (loadOptions) {
                    var validation = DevExpress.validationEngine.validateGroup("QuotationMaster");
                    if (!validation.isValid) {
                        DevExVariables.Toaster("warning", "Please fill all required fields before add designs.");
                        return;
                    }

                    var deferred = $.Deferred();
                    var url;
                    var myfilter = { rules: [] };

                    myfilter.rules.push({ field: "SEARCH", op: "eq", data: loadOptions.searchValue });

                    var result;
                    $.ajax({
                        url: getDomain() + "/Common/BindMastersDetails?ServiceName=PRD_DESIGN_MASTER_GET&ColumnRequested=DM_ID,DESIGNCODE,IMGPATH_THUMB" + "&myfilters=" + JSON.stringify(myfilter),
                        //url: getDomain() + QuotationMasterView.variables.BindDesignListUrl + "&myfilters=" + JSON.stringify(myfilter),
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
                            if (result.serviceresponse.detailslist.details.length)
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
                    QuotationMasterView.AddNewItemToQuotation(data.selectedItem.dm_id);
                }
                else {
                    QuotationMasterView.variables.dx_txtSearch.option("value", "");
                }
            },
            onFocusOut: function (data) {
                if (!data.component.option().selectedItem) {
                    QuotationMasterView.variables.dx_txtSearch.option("value", "");
                }
            },
            itemTemplate: function (data) {
                return $("<div class='custom-item'>" +
                        "<img  src='" + data.imgpath_thumb + "' />" +
                        "<div class='product-name'>" + data.designcode + "</div></div>");
            },
        }).dxValidator({
            validationGroup: "QuotationMaster",
            validationRules: []
        }).dxAutocomplete("instance");

        /*----------------------Add New Account Entry---------------------*/
        QuotationMasterView.variables.dx_txtAcc_Name = $("#dx_txtAcc_Name").dxTextBox({
            placeholder: "Enter Acc Name...",
            ShowModelErrors: true,
        }).dxValidator({
            validationGroup: "PartyMaster",
            validationRules: [{
                type: "required",
                message: "Account name is required"
            }]
        }).dxTextBox("instance");

        QuotationMasterView.variables.dx_txtHeadName = $("#dx_txtHeadName").dxAutocomplete({
            placeholder: "Type Account Head...",
            dataSource: new DevExpress.data.CustomStore({
                load: function (loadOptions) {
                    var deferred = $.Deferred();

                    var myfilter = { rules: [] };
                    myfilter.rules.push({ field: "SEARCH", op: "eq", data: loadOptions.searchValue });
                    myfilter.rules.push({ field: "TYPE", op: "eq", data: "AccHead" });

                    var result;
                    $.ajax({
                        url: getDomain() + QuotationMasterView.variables.BindStaticDataUrl + "&myfilters=" + JSON.stringify(myfilter),
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
                if (data.selectedItem)
                    QuotationMasterView.GetSubHeadList(data.selectedItem.headid);
                else
                    QuotationMasterView.variables.dx_ddlSubHead.option({
                        dataSource: [],
                        displayExpr: "subhead",
                        valueExpr: "subheadid",
                    });
            },
            onFocusOut: function (data) {
                if (!data.component.option().selectedItem) {
                    QuotationMasterView.variables.dx_txtHeadName.option("value", "");
                }
            }
        }).dxValidator({
            validationGroup: "PartyMaster",
            validationRules: [{
                type: "required",
                message: "Head name is required"
            }]
        }).dxAutocomplete("instance");

        QuotationMasterView.variables.dx_ddlSubHead = $("#dx_ddlSubHead").dxSelectBox({
            placeholder: "Select Sub Head...",
            searchEnabled: true,
            onValueChanged: function (data) {
            }
        }).dxValidator({
            validationGroup: "PartyMaster",
            validationRules: [{
                type: "required",
                message: "Sub Head is required"
            }]
        }).dxSelectBox("instance");

        QuotationMasterView.variables.dx_txtMobileNo = $("#dx_txtMobileNo").dxTextBox({
            placeholder: "Enter Mobile No...",
        }).dxValidator({
            validationGroup: "PartyMaster",
            validationRules: [{
                type: "required",
                message: "Mobile number is required"
            }]
        }).dxTextBox("instance");

        QuotationMasterView.variables.dx_ddlCountry = $("#dx_ddlCountry").dxSelectBox({
            placeholder: "Select Country...",
            searchEnabled: true,
            onValueChanged: function (data) {
                if (data.value)
                    QuotationMasterView.GetStatesList(data.value);
            }
        }).dxValidator({
            validationGroup: "PartyMaster",
            validationRules: [{
                type: "required",
                message: "Country is required"
            }]
        }).dxSelectBox("instance");

        QuotationMasterView.variables.dx_ddlState = $("#dx_ddlState").dxSelectBox({
            placeholder: "Select State...",
            searchEnabled: true,
            onValueChanged: function (data) {
                if (data.value)
                    QuotationMasterView.GetCityList(data.value);
            }
        }).dxValidator({
            validationGroup: "PartyMaster",
            validationRules: [{
                type: "required",
                message: "State is required"
            }]
        }).dxSelectBox("instance");

        QuotationMasterView.variables.dx_ddlCity = $("#dx_ddlCity").dxSelectBox({
            placeholder: "Select City...",
            searchEnabled: true,
        }).dxValidator({
            validationGroup: "PartyMaster",
            validationRules: [{
                type: "required",
                message: "City is required"
            }]
        }).dxSelectBox("instance");

        QuotationMasterView.variables.dx_ddlCurrency = $("#dx_ddlCurrency").dxSelectBox({
            placeholder: "Select Currency...",
            searchEnabled: true,
        }).dxValidator({
            validationGroup: "PartyMaster",
            validationRules: [{
                type: "required",
                message: "Currency is required"
            }]
        }).dxSelectBox("instance");

        QuotationMasterView.variables.dx_btnPartyAdd = $("#dx_btnPartyAdd").dxButton({
            stylingMode: "outlined",
            type: "Primary",
            icon: "plus",
            validationGroup: "PartyMaster",
            onClick: function (e) {
                $("#Modal_PartyMaster").modal("show");
            }
        }).dxButton("instance");

        QuotationMasterView.variables.dx_Party_btnSubmit = $("#dx_Party_btnSubmit").dxButton({
            icon: "check",
            text: "Submit",
            type: "success",
            validationGroup: "PartyMaster",
            onClick: function (e) {
                var validation = DevExpress.validationEngine.validateGroup("PartyMaster");
                if (!validation.isValid) {
                    DevExVariables.Toaster("warning", "Please fill all required fields before submit.");
                    return;
                }

                QuotationMasterView.btnMasterSubmit_Party();


            }
        }).dxButton("instance");

        QuotationMasterView.variables.dx_Party_btnCancel = $("#dx_Party_btnCancel").dxButton({
            icon: "close",
            text: "Cancel",
            type: "danger",
            validationGroup: "PartyMaster",
            onClick: function (e) {
                $("#Modal_PartyMaster").modal("hide");
                //e.validationGroup.reset();
                DevExpress.validationEngine.resetGroup("PartyMaster");
            }
        }).dxButton("instance");
        /*----------------------/Add New Account Entry---------------------*/

        /*-----------------------fields for update design parameters------------------------*/
        QuotationMasterView.variables.dx_ddlMRmCode = $("#dx_ddlMRmCode").dxSelectBox({
            placeholder: "Select...",
            searchEnabled: true,
            onValueChanged(data) {
                if (data.component.option().selectedItem) {
                    QuotationMasterView.variables.dx_ddlMColor.option({
                        dataSource: new DevExpress.data.ArrayStore({
                            data: QuotationMasterView.variables.RmColorList.filter(function (x) { return x.rmcate == 'METAL' && x.rmsubcate == data.component.option().selectedItem.rmsubcate }),
                            key: 'colourid',
                        }),
                        displayExpr: 'colour',
                        valueExpr: 'colourid',
                        value: ""
                    });
                }
                else {
                    QuotationMasterView.variables.dx_ddlMColor.option({
                        dataSource: new DevExpress.data.ArrayStore({
                            data: [],
                            key: 'colourid',
                        }),
                        displayExpr: 'colour',
                        valueExpr: 'colourid',
                        value: ""
                    });
                }
            },
        }).dxValidator({
            validationGroup: "UpdateParameter",
            validationRules: []
        }).dxSelectBox("instance");

        QuotationMasterView.variables.dx_ddlMColor = $("#dx_ddlMColor").dxSelectBox({
            placeholder: "Select...",
            searchEnabled: true
        }).dxValidator({
            validationGroup: "UpdateParameter",
            validationRules: []
        }).dxSelectBox("instance");

        QuotationMasterView.variables.dx_txtMRate = $("#dx_txtMRate").dxNumberBox({
            placeholder: "Rate Per 10gram",
            min: 0,
            value: "",
        }).dxValidator({
            validationGroup: "UpdateParameter",
            validationRules: []
        }).dxNumberBox("instance");

        QuotationMasterView.variables.dx_ddlDRmCode = $("#dx_ddlDRmCode").dxSelectBox({
            placeholder: "Select...",
            searchEnabled: true,
            onValueChanged(data) {
                if (data.component.option().selectedItem) {
                    QuotationMasterView.variables.dx_ddlDPurity.option({
                        dataSource: new DevExpress.data.ArrayStore({
                            data: QuotationMasterView.variables.RmPurityList.filter(function (x) { return x.rmcate == 'GEMS' && x.rmsubcate == data.component.option().selectedItem.rmsubcate }),
                            key: 'purityid',
                        }),
                        displayExpr: 'purity',
                        valueExpr: 'purityid',
                        value: ""
                    });
                    QuotationMasterView.variables.dx_ddlDColor.option({
                        dataSource: new DevExpress.data.ArrayStore({
                            data: QuotationMasterView.variables.RmColorList.filter(function (x) { return x.rmcate == 'GEMS' && x.rmsubcate == data.component.option().selectedItem.rmsubcate }),
                            key: 'colourid',
                        }),
                        displayExpr: 'colour',
                        valueExpr: 'colourid',
                        value: ""
                    });
                }
                else {
                    QuotationMasterView.variables.dx_ddlDPurity.option({
                        dataSource: new DevExpress.data.ArrayStore({
                            data: [],
                            key: 'purityid',
                        }),
                        displayExpr: 'purity',
                        valueExpr: 'purityid',
                        value: ""
                    });
                    QuotationMasterView.variables.dx_ddlDColor.option({
                        dataSource: new DevExpress.data.ArrayStore({
                            data: [],
                            key: 'colourid',
                        }),
                        displayExpr: 'colour',
                        valueExpr: 'colourid',
                        value: ""
                    });
                }
            },
        }).dxValidator({
            validationGroup: "UpdateParameter",
            validationRules: []
        }).dxSelectBox("instance");

        QuotationMasterView.variables.dx_ddlDPurity = $("#dx_ddlDPurity").dxSelectBox({
            placeholder: "Select...",
            searchEnabled: true
        }).dxValidator({
            validationGroup: "UpdateParameter",
            validationRules: []
        }).dxSelectBox("instance");

        QuotationMasterView.variables.dx_ddlDColor = $("#dx_ddlDColor").dxSelectBox({
            placeholder: "Select...",
            searchEnabled: true
        }).dxValidator({
            validationGroup: "UpdateParameter",
            validationRules: []
        }).dxSelectBox("instance");

        QuotationMasterView.variables.dx_ddlSRmCode = $("#dx_ddlSRmCode").dxSelectBox({
            placeholder: "Select...",
            searchEnabled: true,
            onValueChanged(data) {
                if (data.component.option().selectedItem) {
                    QuotationMasterView.variables.dx_ddlSPurity.option({
                        dataSource: new DevExpress.data.ArrayStore({
                            data: QuotationMasterView.variables.RmPurityList.filter(function (x) { return x.rmcate == 'STONE' && x.rmsubcate == data.component.option().selectedItem.rmsubcate }),
                            key: 'purityid',
                        }),
                        displayExpr: 'purity',
                        valueExpr: 'purityid',
                        value: ""
                    });
                    QuotationMasterView.variables.dx_ddlSColor.option({
                        dataSource: new DevExpress.data.ArrayStore({
                            data: QuotationMasterView.variables.RmColorList.filter(function (x) { return x.rmcate == 'STONE' && x.rmsubcate == data.component.option().selectedItem.rmsubcate }),
                            key: 'colourid',
                        }),
                        displayExpr: 'colour',
                        valueExpr: 'colourid',
                        value: ""
                    });
                }
                else {
                    QuotationMasterView.variables.dx_ddlSPurity.option({
                        dataSource: new DevExpress.data.ArrayStore({
                            data: [],
                            key: 'purityid',
                        }),
                        displayExpr: 'purity',
                        valueExpr: 'purityid',
                        value: ""
                    });
                    QuotationMasterView.variables.dx_ddlSColor.option({
                        dataSource: new DevExpress.data.ArrayStore({
                            data: [],
                            key: 'colourid',
                        }),
                        displayExpr: 'colour',
                        valueExpr: 'colourid',
                        value: ""
                    });
                }
            },
        }).dxValidator({
            validationGroup: "UpdateParameter",
            validationRules: []
        }).dxSelectBox("instance");

        QuotationMasterView.variables.dx_ddlSPurity = $("#dx_ddlSPurity").dxSelectBox({
            placeholder: "Select...",
            searchEnabled: true
        }).dxValidator({
            validationGroup: "UpdateParameter",
            validationRules: []
        }).dxSelectBox("instance");

        QuotationMasterView.variables.dx_ddlSColor = $("#dx_ddlSColor").dxSelectBox({
            placeholder: "Select...",
            searchEnabled: true
        }).dxValidator({
            validationGroup: "UpdateParameter",
            validationRules: []
        }).dxSelectBox("instance");

        QuotationMasterView.variables.dx_ddlLabourOn = $("#dx_ddlLabourOn").dxSelectBox({
            placeholder: "Select...",
            searchEnabled: true,
            items: ["FIXED", "GROSS WEIGHT", "NET WEIGHT", "NET WEIGHT + GEMS WEIGHT"]
        }).dxValidator({
            validationGroup: "UpdateParameter",
            validationRules: []
        }).dxSelectBox("instance");

        QuotationMasterView.variables.dx_txtLabourRate = $("#dx_txtLabourRate").dxNumberBox({
            placeholder: "Labour Rate",
            min: 0,
            value: "",
        }).dxValidator({
            validationGroup: "UpdateParameter",
            validationRules: []
        }).dxNumberBox("instance");

        QuotationMasterView.variables.dx_txtHandlingRate = $("#dx_txtHandlingRate").dxNumberBox({
            placeholder: "Handling Rate",
            min: 0,
            value: "",
        }).dxValidator({
            validationGroup: "UpdateParameter",
            validationRules: []
        }).dxNumberBox("instance");

        QuotationMasterView.variables.dx_ddlLab = $("#dx_ddlLab").dxSelectBox({
            placeholder: "Select Lab...",
            searchEnabled: true
        }).dxValidator({
            validationGroup: "UpdateParameter",
            validationRules: []
        }).dxSelectBox("instance");

        QuotationMasterView.variables.dx_txtCertiCharge = $("#dx_txtCertiCharge").dxNumberBox({
            placeholder: "Certification Charge",
            min: 0,
            value: "",
        }).dxValidator({
            validationGroup: "UpdateParameter",
            validationRules: []
        }).dxNumberBox("instance");

        QuotationMasterView.variables.dx_txtQty = $("#dx_txtQty").dxNumberBox({
            placeholder: "Item Quantity",
            min: 0,
            value: "",
        }).dxValidator({
            validationGroup: "UpdateParameter",
            validationRules: []
        }).dxNumberBox("instance");

        QuotationMasterView.variables.dx_dtPromiseDate = $("#dx_dtPromiseDate").dxDateBox({
            type: "date",
            showClearButton: true,
            useMaskBehavior: true,
            displayFormat: "dd/MMM/yyyy",
        }).dxValidator({
            validationGroup: "UpdateParameter",
            validationRules: []
        }).dxDateBox("instance");

        QuotationMasterView.variables.dx_txtRemark = $("#dx_txtRemark").dxTextBox({
            placeholder: "Item Remark",
        }).dxValidator({
            validationGroup: "UpdateParameter",
            validationRules: []
        }).dxTextBox("instance");

        QuotationMasterView.variables.dx_btnUpdatePara = $("#dx_btnUpdatePara").dxButton({
            icon: "check",
            text: "Update",
            type: "success",
            validationGroup: "UpdateParameter",
            onClick: function (e) {
                var validation = DevExpress.validationEngine.validateGroup("UpdateParameter");
                if (!validation.isValid) {
                    DevExVariables.Toaster("warning", "Please fill all required fields before submit.");
                    return;
                }

                if (QuotationMasterView.variables.dx_ddlDRmCode.option().value
                        || QuotationMasterView.variables.dx_ddlDColor.option().value
                        || QuotationMasterView.variables.dx_ddlDPurity.option().value) {
                    if (!QuotationMasterView.variables.dx_ddlDRmCode.option().value
                        || !QuotationMasterView.variables.dx_ddlDColor.option().value
                        || !QuotationMasterView.variables.dx_ddlDPurity.option().value) {
                        DevExVariables.Toaster("warning", "Please fill all diamond fields together for submit.");
                        return;
                    }
                }

                if (QuotationMasterView.variables.dx_ddlSRmCode.option().value
                        || QuotationMasterView.variables.dx_ddlSColor.option().value
                        || QuotationMasterView.variables.dx_ddlSPurity.option().value) {
                    if (!QuotationMasterView.variables.dx_ddlSRmCode.option().value
                        || !QuotationMasterView.variables.dx_ddlSColor.option().value
                        || !QuotationMasterView.variables.dx_ddlSPurity.option().value) {
                        DevExVariables.Toaster("warning", "Please fill all stone fields together for submit.");
                        return;
                    }
                }

                if (QuotationMasterView.variables.dx_ddlMRmCode.option().value
                        || QuotationMasterView.variables.dx_ddlMColor.option().value) {
                    if (!QuotationMasterView.variables.dx_ddlMRmCode.option().value
                        || !QuotationMasterView.variables.dx_ddlMColor.option().value) {
                        DevExVariables.Toaster("warning", "Please fill Metal Code and Color together for submit.");
                        return;
                    }
                }


                if (QuotationMasterView.variables.Masterid > 0) {
                    QuotationMasterView.variables.Oper = 'Edit';
                }
                else {
                    QuotationMasterView.variables.Oper = 'Add';
                }

                var SelectedItemList = [];
                SelectedItemList = QuotationMasterView.variables.dx_dataGridItems.option().selectedRowKeys;

                var data = {
                    "SELECTEDQUOITEMS": SelectedItemList.toString(),
                    "QUOTATION_DATE": QuotationMasterView.variables.dx_txtQuoDate.option().text,
                    "TYPE": QuotationMasterView.variables.dx_ddlQuoType.option().value,
                    "DUEDAY": QuotationMasterView.variables.dx_txtDueDays.option().value,
                    "PRIORITY": QuotationMasterView.variables.dx_ddlPriority.option().value,
                    "ACCID": QuotationMasterView.variables.dx_txtPartyName.option().selectedItem.accid,
                    "SALESMANID": QuotationMasterView.variables.dx_ddlOrderby.option().value,
                    "ISFINALSUBMIT": 0,
                    "QM_ID": QuotationMasterView.variables.Masterid,
                    "oper": QuotationMasterView.variables.Oper,
                    "OPER_TYPE": "Item_Update_Parameter"
                }

                if (QuotationMasterView.variables.dx_ddlMRmCode.option().value)
                    data.MRMCODEID = QuotationMasterView.variables.dx_ddlMRmCode.option().value;

                if (QuotationMasterView.variables.dx_ddlMColor.option().value)
                    data.MRMCOLORID = QuotationMasterView.variables.dx_ddlMColor.option().value;

                if (QuotationMasterView.variables.dx_txtMRate.option().value)
                    data.MRATE = QuotationMasterView.variables.dx_txtMRate.option().value;

                if (QuotationMasterView.variables.dx_ddlDRmCode.option().value)
                    data.DRMCODEID = QuotationMasterView.variables.dx_ddlDRmCode.option().value;

                if (QuotationMasterView.variables.dx_ddlDColor.option().value)
                    data.DRMCOLORID = QuotationMasterView.variables.dx_ddlDColor.option().value;

                if (QuotationMasterView.variables.dx_ddlDPurity.option().value)
                    data.DRMPURITYID = QuotationMasterView.variables.dx_ddlDPurity.option().value;

                if (QuotationMasterView.variables.dx_ddlSRmCode.option().value)
                    data.SRMCODEID = QuotationMasterView.variables.dx_ddlSRmCode.option().value;

                if (QuotationMasterView.variables.dx_ddlSColor.option().value)
                    data.SRMCOLORID = QuotationMasterView.variables.dx_ddlSColor.option().value;

                if (QuotationMasterView.variables.dx_ddlSPurity.option().value)
                    data.SRMPURITYID = QuotationMasterView.variables.dx_ddlSPurity.option().value;

                if (QuotationMasterView.variables.dx_ddlLabourOn.option().value)
                    data.LABOURON = QuotationMasterView.variables.dx_ddlLabourOn.option().value;

                if (QuotationMasterView.variables.dx_txtLabourRate.option().value)
                    data.LABOURRATE = QuotationMasterView.variables.dx_txtLabourRate.option().value;

                if (QuotationMasterView.variables.dx_ddlLab.option().value)
                    data.LABID = QuotationMasterView.variables.dx_ddlLab.option().value;

                if (QuotationMasterView.variables.dx_txtCertiCharge.option().value)
                    data.CERTICHARGE = QuotationMasterView.variables.dx_txtCertiCharge.option().value;

                if (QuotationMasterView.variables.dx_txtHandlingRate.option().value)
                    data.HANDLINGRATE = QuotationMasterView.variables.dx_txtHandlingRate.option().value;

                if (QuotationMasterView.variables.dx_txtQty.option().value)
                    data.QTY = QuotationMasterView.variables.dx_txtQty.option().value;

                if (QuotationMasterView.variables.dx_dtPromiseDate.option().value)
                    data.PROMISEDATE = QuotationMasterView.variables.dx_dtPromiseDate.option().text;

                if (QuotationMasterView.variables.dx_txtRemark.option().value)
                    data.DESIGNREMARK = QuotationMasterView.variables.dx_txtRemark.option().value;

                $.ajax({
                    url: getDomain() + QuotationMasterView.variables.PerformMasterOperationUrl,
                    data: data,
                    async: true,
                    cache: false,
                    type: 'POST',
                    success: function (data) {
                        if ($(data).find('RESPONSECODE').text() == "0") {
                            DevExVariables.Toaster("success", 'Records are Updated successfully.');
                            QuotationMasterView.variables.dx_dataGridItems.refresh();
                            QuotationMasterView.variables.dx_dataGridItems.clearSelection();
                            DevExpress.validationEngine.resetGroup("UpdateParameter");
                            $("#Modal_UpdateItems").modal("hide");
                        }
                        else {
                            DevExVariables.InvalidResponseCode(data);
                        }
                    },
                    error: OnError,
                });

            }
        }).dxButton("instance");

        QuotationMasterView.variables.dx_btnCancelPara = $("#dx_btnCancelPara").dxButton({
            icon: "close",
            text: "Cancel",
            type: "danger",
            validationGroup: "UpdateParameter",
            onClick: function (e) {
                DevExpress.validationEngine.resetGroup("UpdateParameter");

                $("#Modal_UpdateItems").modal("hide");
            }
        }).dxButton("instance");

        /*-----------------------/fields for update design parameters------------------------*/

        QuotationMasterView.variables.dx_btnSubmit = $("#dx_btnSubmit").dxButton({
            icon: "check",
            text: "Submit",
            type: "success",
            //useSubmitBehavior: true,
            validationGroup: "QuotationMaster",
            onClick: function (e) {
                var validation = DevExpress.validationEngine.validateGroup("QuotationMaster");
                if (!validation.isValid) {
                    DevExVariables.Toaster("warning", "Please fill all required fields before submit.");
                    return;
                }

                if (QuotationMasterView.variables.dx_dataGridItems.getDataSource().items().length == 0) {
                    DevExVariables.Toaster("warning", "Please fill atleast one item before submit.");
                    return;
                }

                if (QuotationMasterView.variables.Masterid > 0) {
                    QuotationMasterView.variables.Oper = 'Edit';
                }
                else {
                    QuotationMasterView.variables.Oper = 'Add';
                }

                var data = {
                    "QUOTATION_DATE": QuotationMasterView.variables.dx_txtQuoDate.option().text,
                    "TYPE": QuotationMasterView.variables.dx_ddlQuoType.option().value,
                    "DUEDAY": QuotationMasterView.variables.dx_txtDueDays.option().value,
                    "PRIORITY": QuotationMasterView.variables.dx_ddlPriority.option().value,
                    "ACCID": QuotationMasterView.variables.dx_txtPartyName.option().selectedItem.accid,
                    "SALESMANID": QuotationMasterView.variables.dx_ddlOrderby.option().value,
                    "ISFINALSUBMIT": 1,
                    "QM_ID": QuotationMasterView.variables.Masterid,
                    "oper": QuotationMasterView.variables.Oper,
                }

                $.ajax({
                    url: getDomain() + QuotationMasterView.variables.PerformMasterOperationUrl,
                    data: data,
                    async: true,
                    cache: false,
                    type: 'POST',
                    success: function (data) {
                        if ($(data).find('RESPONSECODE').text() == "0") {
                            QuotationMasterView.clearControls();
                            DevExVariables.Toaster("success", 'Record is Saved successfully');
                        }
                        else {
                            DevExVariables.InvalidResponseCode(data);
                        }
                    },
                    error: OnError,
                });

            }
        }).dxButton("instance");

        QuotationMasterView.variables.dx_btnCancel = $("#dx_btnCancel").dxButton({
            icon: "close",
            text: "Cancel",
            type: "danger",
            validationGroup: "QuotationMaster",
            onClick: function (e) {
                QuotationMasterView.clearControls();
            }
        }).dxButton("instance");

        QuotationMasterView.variables.dx_btnAddNew = $("#dx_btnAddNew").dxButton({
            stylingMode: "outlined",
            icon: "plus",
            text: "Add New",
            type: "default",
            validationGroup: "QuotationMaster",
            onClick: function (e) {
                $("#frm_Quotation_Master").show();
                $("#pnlView").hide();
                QuotationMasterView.variables.Oper = "Add";
            }
        }).dxButton("instance");

        QuotationMasterView.variables.dx_btnRefreshGrid = $("#dx_btnRefreshGrid").dxButton({
            stylingMode: "outlined",
            icon: "refresh",
            //text: "Refresh",
            type: "default",
            validationGroup: "QuotationMaster",
            onClick: function (e) {
                QuotationMasterView.variables.dx_dataGrid.refresh();
            }
        }).dxButton("instance");

        QuotationMasterView.variables.dx_btnUpdateItem = $("#dx_btnUpdateItem").dxDropDownButton({
            icon: "refresh",
            text: "Update",
            type: "default",
            disabled: true,
            items: [{ id: 1, name: 'Design Parameters' }, { id: 2, name: 'Material Rate' }],
            displayExpr: 'name',
            keyExpr: 'id',
            onItemClick(e) {
                if (e.itemData.name == "Design Parameters")
                    $("#Modal_UpdateItems").modal("show");
                else
                    $("#Modal_UpdateMaterialRate").modal("show");

            },
        }).dxDropDownButton("instance");

        QuotationMasterView.variables.dx_btnRemoveItem = $("#dx_btnRemoveItem").dxButton({
            icon: "trash",
            text: "Remove",
            type: "danger",
            disabled: true,
            onClick: function (e) {

                QuotationMasterView.variables.dx_popupItemRemove.show();
            }
        }).dxButton("instance");

        QuotationMasterView.variables.dx_dataGridItems = $("#dx_dataGridItems").dxDataGrid({
            dataSource: new DevExpress.data.CustomStore({
                key: "qi_id",
                load: function (loadOptions) {
                    var deferred = $.Deferred();
                    if (QuotationMasterView.variables.Masterid) {
                        var myfilter = { rules: [] };
                        myfilter.rules.push({ field: "QM_ID", op: "eq", data: QuotationMasterView.variables.Masterid });
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
                            url: getDomain() + QuotationMasterView.variables.BindQuotationItemDetailsUrl + "&" + parameters.join("&") + "&myfilters=" + JSON.stringify(myfilter),
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

                            if (result.serviceresponse.totaldetails) {
                                $("#lbltotalGrossWgt").html(result.serviceresponse.totaldetails.totalgrosswgt || 0.00);
                                $("#lbltotalNetWgt").html(result.serviceresponse.totaldetails.totalnetwgt || 0.00);
                                $("#lbltotalDiapcs").html(result.serviceresponse.totaldetails.totaldiapcs || 0.00);
                                $("#lbltotalDiaCts").html(result.serviceresponse.totaldetails.totaldiawgt || 0.00);
                                $("#lbltotalAmount").html(result.serviceresponse.totaldetails.totalamt || 0.00);
                            }

                        }
                        else {
                            deferred.reject("Data Loading Error");
                        }
                    }
                    else {
                        deferred.resolve([], {
                            totalCount: 0
                        });
                    }

                    return deferred.promise();
                },
                update(key, values) {
                    var deferred = $.Deferred();
                    var result;
                    result = QuotationMasterView.UpdateSingleItem(key, values);

                    if (result != "Error") {
                        deferred.resolve();
                    }
                    else {
                        deferred.reject("Data Loading Error");
                    }
                },
            }),
            loadPanel: {
                enabled: true,
                indicatorSrc: "../Content/images/trinityloaderwhite.gif",
            },
            selection: {
                mode: "multiple",
                selectAllMode: 'page'
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
                visible: false
            },
            remoteOperations: true,
            paging: {
                pageSize: 10
            },
            pager: {
                visible: true,
                showInfo: true,
                showNavigationButtons: true,
                showPageSizeSelector: true,
                allowedPageSizes: [10, 30, 100]
            },
            editing: {
                mode: 'cell',
                allowUpdating: true,
                allowAdding: false,
                allowDeleting: false,
            },
            columnMinWidth: 70,
            columns: [{ dataField: "qi_id", allowSorting: true, sortIndex: 1, sortOrder: "desc", visible: false, allowEditing: false },
                { dataField: "qm_id", allowSorting: false, visible: false, allowEditing: false },
                {
                    caption: "Design", alignment: "center",
                    columns: [
                        {
                            dataField: "imgpath", caption: "Design", dataType: "string", allowSorting: false, allowFiltering: false, allowEditing: false,
                            cellTemplate: function (container, options) {
                                var temp = '<div style="position:relative;"><a href="' + options.displayValue + '" data-fancybox="gallery">' +
                                                '<img height="50" width="50" src="' + options.data.imgpath_thumb + '" />' +
                                            '</a></div>';
                                $(temp).appendTo(container);
                            }
                        },
                        {
                            dataField: "designcode", caption: "Code", dataType: "string", allowSorting: false, allowFiltering: true, filterOperations: ["contains"], allowHeaderFiltering: false, allowEditing: false,
                            cellTemplate: function (container, options) {
                                var temp = '<div>' + options.data.desgcate + '</div><hr style="margin:0;" /><div>' + options.displayValue + '</div>';
                                $(temp).appendTo(container);
                            }
                        },
                        {
                            dataField: "goodssize", caption: "Size", dataType: "string", minWidth: 100, allowSorting: false, allowFiltering: false, allowEditing: true,
                            lookup: {
                                dataSource(options) {
                                    return {
                                        store: QuotationMasterView.variables.JsizeList,
                                        filter: options.data ? ['desgcateid', '=', options.data.desgcateid] : null,
                                    };
                                },
                                displayExpr: 'size',
                                valueExpr: 'size',
                            },
                        },
                        { dataField: "qty", caption: "Qty", dataType: "number", allowSorting: false, allowFiltering: false, allowEditing: false },
                    ]
                },
                {
                    caption: "Metal", alignment: "center",
                    columns: [
                        { dataField: "msubcate", caption: "Sub Cate", dataType: "string", allowSorting: false, allowFiltering: true, filterOperations: ["contains"], allowEditing: false },
                        { dataField: "mquality", caption: "Quality", dataType: "string", allowSorting: false, allowFiltering: true, filterOperations: ["contains"], allowEditing: false },
                        { dataField: "mcolor", caption: "Color", dataType: "string", allowSorting: false, allowFiltering: true, filterOperations: ["contains"], allowEditing: false },
                        { dataField: "mwgt", caption: "Net Wgt", dataType: "number", allowSorting: false, allowFiltering: false, allowEditing: false },
                        //{ dataField: "mpwgt", caption: "Fine Wt", dataType: "number", allowSorting: false },
                        { dataField: "grosswgt", caption: "Gross Wt", dataType: "number", allowSorting: false, allowFiltering: false, allowEditing: false },
                        { dataField: "mamt", caption: "Amt", dataType: "number", allowSorting: false, allowFiltering: false, allowEditing: false }
                    ]
                },
                {
                    caption: "Diamond", alignment: "center",
                    columns: [
                        { dataField: "dsubcate", caption: "Sub Cate", dataType: "string", allowSorting: false, allowFiltering: true, filterOperations: ["contains"], allowEditing: false },
                        { dataField: "dpurity", caption: "Purity", dataType: "string", allowSorting: false, allowFiltering: true, filterOperations: ["contains"], allowEditing: false },
                        { dataField: "dcolor", caption: "Color", dataType: "string", allowSorting: false, allowFiltering: true, filterOperations: ["contains"], allowEditing: false },
                        { dataField: "dpcs", caption: "Pcs", dataType: "number", allowSorting: false, allowFiltering: false, allowEditing: false },
                        { dataField: "dwgt", caption: "Carat", dataType: "number", allowSorting: false, allowFiltering: false, allowEditing: false },
                        //{ dataField: "dgrm", caption: "Gram", dataType: "number", allowSorting: false, allowFiltering: false },
                        { dataField: "damt", caption: "Amt", dataType: "number", allowSorting: false, allowFiltering: false, allowEditing: false }
                    ],
                },
                {
                    caption: "Stone", alignment: "center",
                    columns: [
                        { dataField: "ssubcate", caption: "Sub Cate", dataType: "string", allowSorting: false, allowFiltering: true, filterOperations: ["contains"], allowEditing: false },
                        { dataField: "spurity", caption: "Purity", dataType: "string", allowSorting: false, allowFiltering: true, filterOperations: ["contains"], allowEditing: false },
                        { dataField: "scolor", caption: "Color", dataType: "string", allowSorting: false, allowFiltering: true, filterOperations: ["contains"], allowEditing: false },
                        { dataField: "spcs", caption: "Pcs", dataType: "number", allowSorting: false, allowFiltering: false, allowEditing: false },
                        { dataField: "swgt", caption: "Carat", dataType: "number", allowSorting: false, allowFiltering: false, allowEditing: false },
                        //{ dataField: "sgrm", caption: "Gram", dataType: "number", allowSorting: false, allowFiltering: false },
                        { dataField: "samt", caption: "Amt", dataType: "number", allowSorting: false, allowFiltering: false, allowEditing: false }
                    ],
                },
                {
                    caption: "Labour", alignment: "center",
                    columns: [
                        { dataField: "lab_shortname", caption: "Lab", dataType: "string", allowSorting: false, allowFiltering: false, allowEditing: false },
                        { dataField: "labourtype", caption: "Labour Type", dataType: "string", allowSorting: false, allowFiltering: false, allowEditing: false },
                        { dataField: "labouron", caption: "Labour On", dataType: "string", allowSorting: false, allowFiltering: false, allowEditing: false },
                        { dataField: "labourrate", caption: "Labour Rate", dataType: "number", allowSorting: false, allowFiltering: false, allowEditing: false },
                        { dataField: "labouramount", caption: "Labour Amt", dataType: "number", allowSorting: false, allowFiltering: false, allowEditing: false }
                    ]
                },
                {
                    caption: "General", alignment: "center",
                    columns: [
                        { dataField: "handlingrate", caption: "Handling Rate", dataType: "number", allowSorting: false, allowFiltering: false, allowEditing: false },
                        { dataField: "handlingamt", caption: "Handling Amt", dataType: "number", allowSorting: false, allowFiltering: false, allowEditing: false },
                        { dataField: "amount", caption: "Amt", dataType: "number", allowSorting: false, allowFiltering: false, allowEditing: false },
                        { dataField: "totalamt", caption: "Total Amt", dataType: "number", allowSorting: false, allowFiltering: false, allowEditing: false },
                        { dataField: "itemremark", caption: "Notes", dataType: "string", allowSorting: false, allowFiltering: false, allowEditing: false },
                        { dataField: "remark", caption: "Remark", dataType: "string", allowSorting: false, allowFiltering: false, allowEditing: false },
                        { dataField: "promisedate", caption: "Promise Date", dataType: "date", format: 'dd/MMM/yyyy', allowSorting: true, allowFiltering: false, allowEditing: false },
                        { dataField: "itemstatus", caption: "Status", dataType: "string", allowSorting: false, allowFiltering: false, allowEditing: false }
                    ]
                },
                {
                    caption: "Edit", alignment: "center", allowSorting: false, allowFiltering: false, allowEditing: false, fixed: true, fixedPosition: "right",
                    cellTemplate: function (container, options) {
                        var temp = '<span class="btn btn-primary" style="padding: 2px 6px !important;" title="Edit" onclick=\'QuotationMasterView.EditItemDetail("' + options.key + '");\'><i class="fa fa-pencil"></i></span>';
                        temp += '<span class="btn btn-success" style="padding: 2px 6px !important;margin-left:5px;" title="Copy" onclick=\'QuotationMasterView.CopyQuotItem("' + options.key + '");\'><i class="fa fa-plus"></i></span>';
                        if ((options.data.designcode).substring(3) == "0000")
                        temp += '<label class="btn btn-default" style="padding: 2px 6px !important; margin-left:5px;" title="Upload Image" for="btn_ImageUpload' + options.key + '" \'><input type="file" class="hide" accept="image/*" id="btn_ImageUpload' + options.key + '" /><i class="fa fa-upload"></i></label>';
                        $(temp).appendTo(container);
                        QuotationMasterView.RegisterItemImageUpload(options.key, "btn_ImageUpload" + options.key, "DesignMaster/" + options.data.desgcate + "/" + options.data.desgsubcate + "/" + options.data.designcode);
                    }
                },
            ],
            onSelectionChanged(selectedItems) {
                $("#SelectedItemCount").html(selectedItems.selectedRowsData.length);
                if (selectedItems.selectedRowKeys.length > 0) {
                    QuotationMasterView.variables.dx_btnUpdateItem.option({ disabled: false });
                    QuotationMasterView.variables.dx_btnRemoveItem.option({ disabled: false });
                }
                else {
                    QuotationMasterView.variables.dx_btnUpdateItem.option({ disabled: true });
                    QuotationMasterView.variables.dx_btnRemoveItem.option({ disabled: true });
                }
            },
            masterDetail: {
                enabled: true,
                template: QuotationMasterView.GetGridDetails,
            }
        }).dxDataGrid("instance");

        QuotationMasterView.variables.dx_btnUpdateMatRate = $("#dx_btnUpdateMatRate").dxButton({
            icon: "check",
            text: "Update",
            type: "success",
            disabled: true,
            onClick: function (e) {
                if (QuotationMasterView.variables.Masterid > 0) {
                    QuotationMasterView.variables.Oper = 'Edit';
                }
                else {
                    QuotationMasterView.variables.Oper = 'Add';
                }

                var SelectedItemList = [], SelectedRateList = [], xmlStringRateList = "<RATELIST>";
                SelectedItemList = QuotationMasterView.variables.dx_dataGridItems.option().selectedRowKeys;

                SelectedRateList = QuotationMasterView.variables.dx_dataGrid_MaterialRate.getVisibleRows().filter(function (x) { return x.isSelected == true });
                $.each(SelectedRateList, function (key, obj) {
                    xmlStringRateList += '<RATEDETAILS>';
                    xmlStringRateList += '<RMCATEID>' + obj.data.rmcateid + '</RMCATEID>';
                    xmlStringRateList += '<RMSUBCATEID>' + obj.data.subcateid + '</RMSUBCATEID>';
                    xmlStringRateList += '<SHAPEID>' + obj.data.shapeid + '</SHAPEID>';
                    xmlStringRateList += '<PURITYID>' + obj.data.purityid + '</PURITYID>';
                    xmlStringRateList += '<COLORID>' + obj.data.colorid + '</COLORID>';
                    xmlStringRateList += '<GROUPCHARNI>' + obj.data.groupcharni.replace("+", "%2b") + '</GROUPCHARNI>';
                    xmlStringRateList += '<RATE>' + obj.data.rate + '</RATE>';
                    xmlStringRateList += '</RATEDETAILS>';
                });
                xmlStringRateList += '</RATELIST>';

                var data = {
                    "XMLPARAM": escape(xmlStringRateList),
                    "SELECTEDQUOITEMS": SelectedItemList.toString(),
                    "QUOTATION_DATE": QuotationMasterView.variables.dx_txtQuoDate.option().text,
                    "TYPE": QuotationMasterView.variables.dx_ddlQuoType.option().value,
                    "DUEDAY": QuotationMasterView.variables.dx_txtDueDays.option().value,
                    "PRIORITY": QuotationMasterView.variables.dx_ddlPriority.option().value,
                    "ACCID": QuotationMasterView.variables.dx_txtPartyName.option().selectedItem.accid,
                    "SALESMANID": QuotationMasterView.variables.dx_ddlOrderby.option().value,
                    "ISFINALSUBMIT": 0,
                    "QM_ID": QuotationMasterView.variables.Masterid,
                    "oper": QuotationMasterView.variables.Oper,
                    "OPER_TYPE": "Item_Update_MaterialRate"
                }

                $.ajax({
                    url: getDomain() + QuotationMasterView.variables.PerformMasterOperationUrl,
                    data: data,
                    async: true,
                    cache: false,
                    type: 'POST',
                    success: function (data) {
                        if ($(data).find('RESPONSECODE').text() == "0") {
                            DevExVariables.Toaster("success", 'Records are Updated successfully.');
                            QuotationMasterView.variables.dx_dataGridItems.refresh();
                            QuotationMasterView.variables.dx_dataGridItems.clearSelection();
                            QuotationMasterView.variables.dx_dataGrid_MaterialRate.clearSelection();

                            $("#Modal_UpdateMaterialRate").modal("hide");
                        }
                        else {
                            DevExVariables.InvalidResponseCode(data);
                        }
                    },
                    error: OnError,
                });

            }
        }).dxButton("instance");

        QuotationMasterView.variables.dx_btnCancelMatRate = $("#dx_btnCancelMatRate").dxButton({
            icon: "close",
            text: "Cancel",
            type: "danger",
            onClick: function (e) {
                $("#Modal_UpdateMaterialRate").modal("hide");
            }
        }).dxButton("instance");

        /*------------------------Fields for update item details-----------------------*/
        QuotationMasterView.variables.dx_txtDiaPcs = $("#dx_txtDiaPcs").dxTextBox({
            readOnly: true,
            value: 0,
        }).dxValidator({
            validationGroup: "UpdateItemDetails",
            validationRules: []
        }).dxTextBox("instance");

        QuotationMasterView.variables.dx_txtDiaCrt = $("#dx_txtDiaCrt").dxTextBox({
            readOnly: true,
            value: 0,
        }).dxValidator({
            validationGroup: "UpdateItemDetails",
            validationRules: []
        }).dxTextBox("instance");

        QuotationMasterView.variables.dx_txtNetWgt = $("#dx_txtNetWgt").dxTextBox({
            readOnly: true,
            value: 0,
        }).dxValidator({
            validationGroup: "UpdateItemDetails",
            validationRules: []
        }).dxTextBox("instance");

        QuotationMasterView.variables.dx_txtGrossWgt = $("#dx_txtGrossWgt").dxTextBox({
            readOnly: true,
            value: 0,
        }).dxValidator({
            validationGroup: "UpdateItemDetails",
            validationRules: []
        }).dxTextBox("instance");

        QuotationMasterView.variables.dx_txtFineWgt = $("#dx_txtFineWgt").dxTextBox({
            readOnly: true,
            value: 0,
        }).dxValidator({
            validationGroup: "UpdateItemDetails",
            validationRules: []
        }).dxTextBox("instance");

        QuotationMasterView.variables.dx_btnUpdateItemDetails = $("#dx_btnUpdateItemDetails").dxButton({
            icon: "check",
            text: "Update",
            type: "success",
            onClick: function (e) {
                if (QuotationMasterView.variables.Masterid > 0) {
                    QuotationMasterView.variables.Oper = 'Edit';
                }
                else {
                    QuotationMasterView.variables.Oper = 'Add';
                }

                var xmlNodeList = '<DETAILSLIST>';
                $.each(QuotationMasterView.variables.DetailsControlsList, function (key, obj) {
                    if (obj) {
                        if (obj.dx_txtItemName.option().value) {
                            xmlNodeList += '<DETAILS>';
                            xmlNodeList += '<RMCODEID>' + obj.dx_txtItemName.option().selectedItem.rmcodeid + '</RMCODEID>';
                            xmlNodeList += '<RMCATEID>' + obj.dx_txtItemName.option().selectedItem.rmcateid + '</RMCATEID>';
                            xmlNodeList += '<RMSUBCATEID>' + obj.dx_txtItemName.option().selectedItem.rmsubcateid + '</RMSUBCATEID>';

                            if (obj.dx_ddlShape.option().value)
                                xmlNodeList += '<SHAPEID>' + obj.dx_ddlShape.option().value + '</SHAPEID>';

                            if (obj.dx_ddlQuality.option().value)
                                xmlNodeList += '<PURITYID>' + obj.dx_ddlQuality.option().value + '</PURITYID>';

                            if (obj.dx_ddlColor.option().value)
                                xmlNodeList += '<COLORID>' + obj.dx_ddlColor.option().value + '</COLORID>';

                            if (obj.dx_txtLength.option().value)
                                xmlNodeList += '<LENGTH>' + obj.dx_txtLength.option().value + '</LENGTH>';

                            if (obj.dx_txtWidth.option().value)
                                xmlNodeList += '<WIDTH>' + obj.dx_txtWidth.option().value + '</WIDTH>';

                            if (obj.dx_txtCharni.option().value)
                                xmlNodeList += '<CHARNIID>' + obj.dx_txtCharni.option().selectedItem.charniid + '</CHARNIID>';

                            if (obj.dx_txtPieces.option().value)
                                xmlNodeList += '<PCS>' + obj.dx_txtPieces.option().value + '</PCS>';

                            if (obj.dx_txtWeight.option().value)
                                xmlNodeList += '<WGT>' + obj.dx_txtWeight.option().value + '</WGT>';

                            xmlNodeList += '<RATE>' + obj.dx_txtRate.option().value + '</RATE>';
                            xmlNodeList += '<AMOUNT>' + obj.dx_txtAmt.option().value + '</AMOUNT>';


                            xmlNodeList += '</DETAILS>';
                        }
                    }

                });
                xmlNodeList += '</DETAILSLIST>';

                var data = {
                    "XMLPARAM": escape(xmlNodeList),
                    "QI_ID": QuotationMasterView.variables.QI_ID,
                    "QUOTATION_DATE": QuotationMasterView.variables.dx_txtQuoDate.option().text,
                    "TYPE": QuotationMasterView.variables.dx_ddlQuoType.option().value,
                    "DUEDAY": QuotationMasterView.variables.dx_txtDueDays.option().value,
                    "PRIORITY": QuotationMasterView.variables.dx_ddlPriority.option().value,
                    "ACCID": QuotationMasterView.variables.dx_txtPartyName.option().selectedItem.accid,
                    "SALESMANID": QuotationMasterView.variables.dx_ddlOrderby.option().value,
                    "ISFINALSUBMIT": 0,
                    "QM_ID": QuotationMasterView.variables.Masterid,
                    "oper": QuotationMasterView.variables.Oper,
                    "OPER_TYPE": "Item_Update_DesignDetails"
                }

                $.ajax({
                    url: getDomain() + QuotationMasterView.variables.PerformMasterOperationUrl,
                    data: data,
                    async: true,
                    cache: false,
                    type: 'POST',
                    success: function (data) {
                        if ($(data).find('RESPONSECODE').text() == "0") {
                            DevExVariables.Toaster("success", 'Records are Updated successfully.');

                            QuotationMasterView.clearControlsForItemDetails();
                            $("#Modal_ItemDetails").modal("hide");
                            QuotationMasterView.variables.dx_dataGridItems.refresh();
                        }
                        else {
                            DevExVariables.InvalidResponseCode(data);
                        }
                    },
                    error: OnError,
                });

            }
        }).dxButton("instance");

        QuotationMasterView.variables.dx_btnCancelItemDetails = $("#dx_btnCancelItemDetails").dxButton({
            icon: "close",
            text: "Cancel",
            type: "danger",
            onClick: function (e) {
                QuotationMasterView.clearControlsForItemDetails();
                $("#Modal_ItemDetails").modal("hide");
            }
        }).dxButton("instance");
        /*------------------------/Fields for update item details-----------------------*/

        /*----------------------------Sharing Modal--------------------------*/
        QuotationMasterView.variables.dx_txtSharetoPartyList = $("#dx_txtSharetoPartyList").dxAutocomplete({
            placeholder: "Select Party Name...",
            mode: "search",
            dataSource: new DevExpress.data.CustomStore({
                load: function (loadOptions) {
                    var deferred = $.Deferred();
                    $.ajax({
                        url: getDomain() + QuotationMasterView.variables.BindAccListUrl + "&_search=true&searchField=ACCOUNTNAME&searchOper=cn&searchString=" + loadOptions.searchValue,
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
                    QuotationMasterView.variables.dx_txtSharingEmailId.option({ value: data.selectedItem.emailid });
                    QuotationMasterView.variables.dx_txtVoucherMobileNo.option({ value: data.selectedItem.mobile1 });

                }
                else {
                    QuotationMasterView.variables.dx_txtSharingEmailId.option("value", "");
                    QuotationMasterView.variables.dx_txtVoucherMobileNo.option("value", "");
                }
            }
        }).dxAutocomplete("instance");

        QuotationMasterView.variables.dx_btnSubmitShare = $("#dx_btnSubmitShare").dxButton({
            stylingMode: "outlined",
            icon: "fa fa-paper-plane",
            text: "Send",
            type: "default",
            useSubmitBehavior: false,
            visible: true,
            onClick: function (e) {
                QuotationMasterView.SharingDetails();
            }
        }).dxButton("instance");

        QuotationMasterView.variables.dx_RadioSocial = $("#dx_RadioSocial").dxRadioGroup({
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

        QuotationMasterView.variables.dx_txtVoucherMobileNo = $("#dx_txtVoucherMobileNo").dxTextBox({ mode: "number" }).dxTextBox("instance");

        QuotationMasterView.variables.dx_txtShareMessage = $("#dx_txtShareMessage").dxTextArea({
            height: 90,
            value: 'Dear sir, Some Jewellery Designs are shared by Trinity Jewells with you. Kindly click on below URL to view shared Designs. {SHARE URL}',
        }).dxTextArea("instance");

        QuotationMasterView.variables.dx_txtSharingSubject = $("#dx_txtSharingSubject").dxTextBox({
            value: "Quotation shared by TrinityJewells"
        }).dxTextBox("instance");

        QuotationMasterView.variables.dx_txtSharingEmailId = $("#dx_txtSharingEmailId").dxTextBox({ placeholder: "Enter Email Id..." }).dxTextBox("instance");

        QuotationMasterView.variables.dx_txtSharingEmailBody = $("#dx_txtSharingEmailBody").dxHtmlEditor({
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
            value: QuotationMasterView.variables.content,
            onValueChanged: function (e) {
                //$(".value-content").text(e.component.option("value"));
            }
        }).dxHtmlEditor("instance");
        /*----------------------------/ Sharing Modal--------------------------*/
    },

    GetGridDetails: function (container, options) {
        var myfilter = { rules: [] };
        myfilter.rules.push({ field: "QI_ID", op: "eq", data: options.key });
        var List = [];

        $.ajax({
            url: getDomain() + QuotationMasterView.variables.BindQuotationDesignDetailsUrl + "&myfilters=" + JSON.stringify(myfilter),
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
                { dataField: "rate", caption: "Rate", alignment: "right" },
                { dataField: "amount", caption: "Amount", alignment: "right" },
            ],
        });
    },

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
                        QuotationMasterView.variables.dx_ddlCountry.option({
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
                        QuotationMasterView.variables.dx_ddlState.option({
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
                        QuotationMasterView.variables.dx_ddlCity.option({
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

    GetCurrencyList: function () {
        $.ajax({
            url: getDomain() + "/Common/BindMastersDetails?ServiceName=MASTER_COUNTRY_STATE_CITY_GET&ColumnRequested=CURRENCY&ISRECORDALL=true&sidx=CURRENCYNAME&sord=asc",
            async: true,
            cache: false,
            type: 'POST',
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    var JsonObject = xml2json.parser(data);
                    if (JsonObject.serviceresponse.detailslist) {
                        QuotationMasterView.variables.dx_ddlCurrency.option({
                            dataSource: new DevExpress.data.ArrayStore({
                                data: JsonObject.serviceresponse.detailslist.details,
                                key: "currencyid"
                            }),
                            displayExpr: "currencyname",
                            valueExpr: "currencyid",
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

    GetSubHeadList: function (HeadId) {
        var myfilter = { rules: [] };
        myfilter.rules.push({ field: "TYPE", op: "eq", data: "AccSubHead" });
        myfilter.rules.push({ field: "HEADID", op: "eq", data: HeadId });

        $.ajax({
            url: getDomain() + QuotationMasterView.variables.BindStaticDataUrl + "&myfilters=" + JSON.stringify(myfilter),
            async: true,
            cache: false,
            type: 'POST',
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    var JsonObject = xml2json.parser(data);
                    if (JsonObject.serviceresponse.detailslist) {
                        QuotationMasterView.variables.dx_ddlSubHead.option({
                            dataSource: new DevExpress.data.ArrayStore({
                                data: JsonObject.serviceresponse.detailslist.details,
                                key: "subheadid"
                            }),
                            displayExpr: "subhead",
                            valueExpr: "subheadid",
                        });
                    }
                    else {
                        QuotationMasterView.variables.dx_ddlSubHead.option({
                            dataSource: [],
                            displayExpr: "subhead",
                            valueExpr: "subheadid",
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

    GetUserName: function () {
        var myfilter = { rules: [] };
        myfilter.rules.push({ field: "ISACTIVE", op: "eq", data: true });
        myfilter.rules.push({ field: "SUBHEAD", op: "eq", data: "Employees" });

        $.ajax({
            url: getDomain() + QuotationMasterView.variables.BindAccListUrl + "&myfilters=" + JSON.stringify(myfilter),
            async: false,
            cache: false,
            type: 'POST',
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    var JsonObject = xml2json.parser(data);
                    if (JsonObject.serviceresponse.detailslist) {
                        var list = []
                        if (JsonObject.serviceresponse.detailslist.details.length)
                            list = JsonObject.serviceresponse.detailslist.details;
                        else
                            list.push(JsonObject.serviceresponse.detailslist.details);

                        QuotationMasterView.variables.dx_ddlOrderby.option({
                            dataSource: new DevExpress.data.ArrayStore({
                                data: list,
                                key: "accid"
                            }),
                            displayExpr: "accountname",
                            valueExpr: "accid",
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

    triggerId: function (id) {
        var rowData = QuotationMasterView.variables.dx_dataGrid.getVisibleRows()[QuotationMasterView.variables.dx_dataGrid.getRowIndexByKey(+id)].data;
        QuotationMasterView.variables.Masterid = id;
        QuotationMasterView.variables.Oper = 'Edit';

        QuotationMasterView.variables.dx_ddlQuoType.option({ value: rowData.type });
        QuotationMasterView.variables.dx_txtQuoDate.option({ value: rowData.quotation_date });
        QuotationMasterView.variables.dx_txtDueDays.option({ value: rowData.dueday });
        QuotationMasterView.variables.dx_txtQuoNo.option({ value: rowData.quotation_no });
        QuotationMasterView.variables.dx_ddlPriority.option({ value: rowData.priority });
        if (rowData.accid) {
            QuotationMasterView.variables.dx_txtPartyName.option({
                items: [{ accid: rowData.accid, accountname: rowData.accountname }],
                selectedItem: { accid: rowData.accid, accountname: rowData.accountname },
                value: rowData.accountname
            });
            QuotationMasterView.variables.dx_txtPartyCode.option({ value: rowData.partycode });
        }
        QuotationMasterView.variables.dx_ddlOrderby.option({ value: rowData.salesmanid });

        QuotationMasterView.variables.dx_dataGridItems.refresh();

        $("#frm_Quotation_Master").show();
        $("#pnlView").hide();

        if (isU()) {        // || rowData.isfinalsubmit == 0
            QuotationMasterView.variables.dx_btnSubmit.option({ visible: true });
            QuotationMasterView.variables.dx_btnUpdateItem.option({ visible: true });
            QuotationMasterView.variables.dx_btnRemoveItem.option({ visible: true });
            QuotationMasterView.variables.dx_txtSearch.option({ visible: true });
        }
        else {
            QuotationMasterView.variables.dx_btnSubmit.option({ visible: false });
            QuotationMasterView.variables.dx_btnUpdateItem.option({ visible: false });
            QuotationMasterView.variables.dx_btnRemoveItem.option({ visible: false });
            QuotationMasterView.variables.dx_txtSearch.option({ visible: false });
        }
        QuotationMasterView.variables.dx_ddlOrderby.option({ disabled: true });

    },

    EditDesignFromGrid: function (val, Qm_id, type) {
        var data = {
            "OPER_TYPE": "EditFromGrid",
            "QM_ID": Qm_id,
            "ISVERIFY": val
        }

        $.ajax({
            url: getDomain() + QuotationMasterView.variables.PerformMasterOperationUrl,
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
                    QuotationMasterView.clearControls();
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

    AddNewItemToQuotation: function (DM_ID) {
        if (QuotationMasterView.variables.Masterid > 0) {
            QuotationMasterView.variables.Oper = 'Edit';
        }
        else {
            QuotationMasterView.variables.Oper = 'Add';
        }

        var data = {
            "QUOTATION_DATE": QuotationMasterView.variables.dx_txtQuoDate.option().text,
            "TYPE": QuotationMasterView.variables.dx_ddlQuoType.option().value,
            "DUEDAY": QuotationMasterView.variables.dx_txtDueDays.option().value,
            "PRIORITY": QuotationMasterView.variables.dx_ddlPriority.option().value,
            "ACCID": QuotationMasterView.variables.dx_txtPartyName.option().selectedItem.accid,
            "SALESMANID": QuotationMasterView.variables.dx_ddlOrderby.option().value,
            "ISFINALSUBMIT": 0,
            "DESIGNCODEID": DM_ID,
            "QM_ID": QuotationMasterView.variables.Masterid,
            "oper": QuotationMasterView.variables.Oper,
            "OPER_TYPE": "Item_Add"
        }

        $.ajax({
            url: getDomain() + QuotationMasterView.variables.PerformMasterOperationUrl,
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
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    DevExVariables.Toaster("success", 'Item is Add successfully');
                    if (QuotationMasterView.variables.Oper == 'Add') {
                        QuotationMasterView.variables.Masterid = $(data).find('QM_ID').text();
                        QuotationMasterView.variables.dx_txtQuoNo.option({ value: $(data).find('QUOTATIONNO').text() });
                    }
                    QuotationMasterView.variables.dx_txtSearch.option({ value: "" });
                    QuotationMasterView.variables.dx_dataGridItems.refresh();
                }
                else {
                    DevExVariables.InvalidResponseCode(data);
                }
            },
            error: OnError,
        });
    },

    RemoveItemFromQuotation: function () {
        var SelectedItemList = [];
        SelectedItemList = QuotationMasterView.variables.dx_dataGridItems.option().selectedRowKeys;

        if (SelectedItemList.length == 0) {
            DevExVariables.Toaster("warning", "Please select atleast one item to remove.");
            return;
        }

        if (QuotationMasterView.variables.Masterid > 0) {
            QuotationMasterView.variables.Oper = 'Edit';
        }
        else {
            QuotationMasterView.variables.Oper = 'Add';
        }

        var data = {
            "QUOTATION_DATE": QuotationMasterView.variables.dx_txtQuoDate.option().text,
            "TYPE": QuotationMasterView.variables.dx_ddlQuoType.option().value,
            "DUEDAY": QuotationMasterView.variables.dx_txtDueDays.option().value,
            "PRIORITY": QuotationMasterView.variables.dx_ddlPriority.option().value,
            "ACCID": QuotationMasterView.variables.dx_txtPartyName.option().selectedItem.accid,
            "SALESMANID": QuotationMasterView.variables.dx_ddlOrderby.option().value,
            "ISFINALSUBMIT": 0,
            "SELECTEDQUOITEMS": SelectedItemList.toString(),
            "QM_ID": QuotationMasterView.variables.Masterid,
            "oper": QuotationMasterView.variables.Oper,
            "OPER_TYPE": "Item_Remove"
        }

        $.ajax({
            url: getDomain() + QuotationMasterView.variables.PerformMasterOperationUrl,
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
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    DevExVariables.Toaster("success", 'Item is removed successfully');
                    QuotationMasterView.variables.dx_popupItemRemove.hide();
                    QuotationMasterView.variables.dx_dataGridItems.clearSelection();
                    QuotationMasterView.variables.dx_dataGridItems.refresh();
                }
                else {
                    DevExVariables.InvalidResponseCode(data);
                }
            },
            error: OnError,
        });
    },

    UpdateSingleItem: function (qi_id, obj) {
        var data = {
            "QI_ID": qi_id,
            "GOODSSIZE": obj.goodssize,

            "QUOTATION_DATE": QuotationMasterView.variables.dx_txtQuoDate.option().text,
            "TYPE": QuotationMasterView.variables.dx_ddlQuoType.option().value,
            "DUEDAY": QuotationMasterView.variables.dx_txtDueDays.option().value,
            "PRIORITY": QuotationMasterView.variables.dx_ddlPriority.option().value,
            "ACCID": QuotationMasterView.variables.dx_txtPartyName.option().selectedItem.accid,
            "SALESMANID": QuotationMasterView.variables.dx_ddlOrderby.option().value,
            "ISFINALSUBMIT": 0,
            "QM_ID": QuotationMasterView.variables.Masterid,
            "oper": QuotationMasterView.variables.Oper,
            "OPER_TYPE": "Item_Update_Single"
        }

        $.ajax({
            url: getDomain() + QuotationMasterView.variables.PerformMasterOperationUrl,
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

    btnMasterSubmit_Party: function () {

        QuotationMasterView.variables.dx_Party_btnSubmit.option({ disabled: true });

        var data = {
            "ACCOUNTNAME": QuotationMasterView.variables.dx_txtAcc_Name.option().value,
            "SUBHEADID": QuotationMasterView.variables.dx_ddlSubHead.option().value,
            "HEADID": QuotationMasterView.variables.dx_txtHeadName.option().selectedItem.headid,
            "CURRENCYID": QuotationMasterView.variables.dx_ddlCurrency.option().value,
            "CITYID": QuotationMasterView.variables.dx_ddlCity.option().value,
            "STATEID": QuotationMasterView.variables.dx_ddlState.option().value,
            "COUNTRYID": QuotationMasterView.variables.dx_ddlCountry.option().value,
            "MOBILE1": QuotationMasterView.variables.dx_txtMobileNo.option().value,
            "TYPE": "AccountInfo",
            "oper": 'Add',
        }

        QuotationMasterView.savedata_Party(data);
    },

    savedata_Party: function (data) {
        $.ajax({
            url: getDomain() + QuotationMasterView.variables.PerformMasterOperationUrl_Party,
            data: data,
            async: true,
            cache: false,
            type: 'POST',
            beforeSend: function () {
                dx_LoaderTrinity.show();
            },
            complete: function () {
                dx_LoaderTrinity.hide();
                QuotationMasterView.variables.dx_Party_btnSubmit.option({ disabled: false });
            },
            success: QuotationMasterView.btnMasterSubmitOnSuccess_Party,
            error: OnError,
        });
    },

    btnMasterSubmitOnSuccess_Party: function (data) {
        if ($(data).find('RESPONSECODE').text() == "0") {
            DevExVariables.Toaster("success", 'Record is Added successfully.');
            $("#Modal_PartyMaster").modal("hide");
            DevExpress.validationEngine.resetGroup("PartyMaster");

            QuotationMasterView.variables.dx_txtPartyName.option({
                items: [{ accid: $(data).find('ACCOUNTID').text(), accountname: $(data).find('ACCOUNTNAME').text() }],
                selectedItem: { accid: $(data).find('ACCOUNTID').text(), accountname: $(data).find('ACCOUNTNAME').text() },
                value: $(data).find('ACCOUNTNAME').text()
            });
            QuotationMasterView.variables.dx_txtPartyCode.option({ value: $(data).find('ACCOUNTCODE').text() });
            QuotationMasterView.variables.PartyList_accid = $(data).find('ACCOUNTID').text()
            QuotationMasterView.variables.dx_txtPartyName.option({ value: $(data).find('ACCOUNTNAME').text() });

        }
        else {
            DevExVariables.InvalidResponseCode(data);
        }
    },

    deleteRow: function (id) {
        var rowData = QuotationMasterView.variables.dx_dataGrid.getVisibleRows()[QuotationMasterView.variables.dx_dataGrid.getRowIndexByKey(+id)].data;
        QuotationMasterView.variables.Masterid = id;
        QuotationMasterView.variables.DeleteDataObj = rowData;
        QuotationMasterView.variables.Oper = "Delete";

        if (QuotationMasterView.variables.dx_popupRecordDelete) {
            QuotationMasterView.variables.dx_popupRecordDelete.option("contentTemplate", QuotationMasterView.variables.DeletePopUpOptions.contentTemplate(QuotationMasterView.variables.DeleteDataObj).bind(this));
        }
        else {
            QuotationMasterView.variables.dx_popupRecordDelete = $("#dx_popupRecordDelete").dxPopup(QuotationMasterView.variables.DeletePopUpOptions).dxPopup("instance");
        }

        QuotationMasterView.variables.dx_popupRecordDelete.show();
    },

    clearControls: function () {
        QuotationMasterView.variables.Oper = 'add';
        $("#lbltotalGrossWgt").html(0.00);
        $("#lbltotalNetWgt").html(0.00);
        $("#lbltotalDiapcs").html(0.00);
        $("#lbltotalDiaCts").html(0.00);
        $("#lbltotalAmount").html(0.00);
        $("#SelectedItemCount").html(0);

        DevExpress.validationEngine.resetGroup("QuotationMaster");

        QuotationMasterView.variables.dx_txtQuoDate.option({ value: new Date() });
        QuotationMasterView.variables.dx_txtDueDays.option({ value: 0 });
        QuotationMasterView.variables.dx_ddlQuoType.option({ value: 'Party' });
        QuotationMasterView.variables.dx_ddlPriority.option({ value: 'High' });
        QuotationMasterView.variables.dx_ddlOrderby.option({ value: Number(getUserId()) });
        QuotationMasterView.variables.dx_btnSubmit.option({ disabled: false });
        QuotationMasterView.variables.dx_ddlOrderby.option({ disabled: false });

        QuotationMasterView.variables.dx_btnSubmit.option({ visible: true });
        QuotationMasterView.variables.dx_btnUpdateItem.option({ visible: true });
        QuotationMasterView.variables.dx_btnRemoveItem.option({ visible: true });
        QuotationMasterView.variables.dx_txtSearch.option({ visible: true });

        QuotationMasterView.variables.Masterid = '',
        QuotationMasterView.variables.Oper = 'Add';

        QuotationMasterView.variables.PartyList_accid = '';

        $("#frm_Quotation_Master").hide();
        $("#pnlView").show();
        QuotationMasterView.variables.dx_dataGridItems.refresh();
        QuotationMasterView.variables.dx_dataGrid.refresh();

    },

    GetRmCodeList: function () {
        var myfilter = { rules: [] };
        myfilter.rules.push({ field: "TYPE", op: "eq", data: "RmCode" });
        $.ajax({
            url: getDomain() + QuotationMasterView.variables.BindStaticDataUrl + "&myfilters=" + JSON.stringify(myfilter),
            async: true,
            cache: false,
            type: 'POST',
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    var JsonObject = xml2json.parser(data);
                    if (JsonObject.serviceresponse.detailslist) {
                        if (JsonObject.serviceresponse.detailslist.details.length) {
                            QuotationMasterView.variables.RmCodeList = JsonObject.serviceresponse.detailslist.details;
                        }
                        else {
                            QuotationMasterView.variables.RmCodeList.push(JsonObject.serviceresponse.detailslist.details);
                        }

                        QuotationMasterView.variables.dx_ddlMRmCode.option({
                            dataSource: new DevExpress.data.ArrayStore({
                                data: QuotationMasterView.variables.RmCodeList.filter(function (x) { return x.rmcate == 'METAL' }),
                                key: 'rmcodeid',
                            }),
                            displayExpr: 'rmcode',
                            valueExpr: 'rmcodeid',
                        });
                        QuotationMasterView.variables.dx_ddlDRmCode.option({
                            dataSource: new DevExpress.data.ArrayStore({
                                data: QuotationMasterView.variables.RmCodeList.filter(function (x) { return x.rmcate == 'GEMS' }),
                                key: 'rmcodeid',
                            }),
                            displayExpr: 'rmcode',
                            valueExpr: 'rmcodeid',
                        });
                        QuotationMasterView.variables.dx_ddlSRmCode.option({
                            dataSource: new DevExpress.data.ArrayStore({
                                data: QuotationMasterView.variables.RmCodeList.filter(function (x) { return x.rmcate == 'STONE' }),
                                key: 'rmcodeid',
                            }),
                            displayExpr: 'rmcode',
                            valueExpr: 'rmcodeid',
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

    GetRmShapeList: function () {
        var myfilter = { rules: [] };
        myfilter.rules.push({ field: "TYPE", op: "eq", data: "shape" });
        $.ajax({
            url: getDomain() + QuotationMasterView.variables.BindStaticDataUrl + "&myfilters=" + JSON.stringify(myfilter),
            async: true,
            cache: false,
            type: 'POST',
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    var JsonObject = xml2json.parser(data);
                    if (JsonObject.serviceresponse.detailslist) {
                        if (JsonObject.serviceresponse.detailslist.details.length) {
                            QuotationMasterView.variables.RmShapeList = JsonObject.serviceresponse.detailslist.details;
                        }
                        else {
                            QuotationMasterView.variables.RmShapeList.push(JsonObject.serviceresponse.detailslist.details);
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

    GetRmPurityList: function () {
        var myfilter = { rules: [] };
        myfilter.rules.push({ field: "TYPE", op: "eq", data: "Purity" });
        myfilter.rules.push({ field: "ISUSEINJEWELLERY", op: "eq", data: true });
        $.ajax({
            url: getDomain() + QuotationMasterView.variables.BindStaticDataUrl + "&myfilters=" + JSON.stringify(myfilter),
            async: true,
            cache: false,
            type: 'POST',
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    var JsonObject = xml2json.parser(data);
                    if (JsonObject.serviceresponse.detailslist) {
                        if (JsonObject.serviceresponse.detailslist.details.length) {
                            QuotationMasterView.variables.RmPurityList = JsonObject.serviceresponse.detailslist.details;
                        }
                        else {
                            QuotationMasterView.variables.RmPurityList.push(JsonObject.serviceresponse.detailslist.details);
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

    GetRmColorList: function () {
        var myfilter = { rules: [] };
        myfilter.rules.push({ field: "TYPE", op: "eq", data: "Colour" });
        myfilter.rules.push({ field: "ISUSEINJEWELLERY", op: "eq", data: true });
        $.ajax({
            url: getDomain() + QuotationMasterView.variables.BindStaticDataUrl + "&myfilters=" + JSON.stringify(myfilter),
            async: true,
            cache: false,
            type: 'POST',
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    var JsonObject = xml2json.parser(data);
                    if (JsonObject.serviceresponse.detailslist) {
                        if (JsonObject.serviceresponse.detailslist.details.length) {
                            QuotationMasterView.variables.RmColorList = JsonObject.serviceresponse.detailslist.details;
                        }
                        else {
                            QuotationMasterView.variables.RmColorList.push(JsonObject.serviceresponse.detailslist.details);
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

    GetLabList: function () {
        var myfilter = { rules: [] };
        myfilter.rules.push({ field: "TYPE", op: "eq", data: "Lab_Certificate" });
        $.ajax({
            url: getDomain() + QuotationMasterView.variables.BindStaticDataUrl + "&myfilters=" + JSON.stringify(myfilter),
            async: true,
            cache: false,
            type: 'POST',
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    var JsonObject = xml2json.parser(data);
                    if (JsonObject.serviceresponse.detailslist) {
                        if (JsonObject.serviceresponse.detailslist.details.length) {
                            QuotationMasterView.variables.LabList = JsonObject.serviceresponse.detailslist.details;
                        }
                        else {
                            QuotationMasterView.variables.LabList.push(JsonObject.serviceresponse.detailslist.details);
                        }

                        QuotationMasterView.variables.dx_ddlLab.option({
                            dataSource: new DevExpress.data.ArrayStore({
                                data: QuotationMasterView.variables.LabList,
                                key: 'labid',
                            }),
                            displayExpr: 'certificate_name',
                            valueExpr: 'labid',
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

    GetJewSize: function () {
        var myfilter = { rules: [] };
        myfilter.rules.push({ field: "TYPE", op: "eq", data: "JewellerySize" });
        $.ajax({
            url: getDomain() + QuotationMasterView.variables.BindStaticDataUrl + "&myfilters=" + JSON.stringify(myfilter),
            async: true,
            cache: false,
            type: 'POST',
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    var JsonObject = xml2json.parser(data);
                    if (JsonObject.serviceresponse.detailslist) {
                        if (JsonObject.serviceresponse.detailslist.details.length) {
                            QuotationMasterView.variables.JsizeList = JsonObject.serviceresponse.detailslist.details;
                        }
                        else {
                            QuotationMasterView.variables.JsizeList.push(JsonObject.serviceresponse.detailslist.details);
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

    EditItemDetail: function (qi_id) {
        if (QuotationMasterView.variables.Oper == "Edit" && !isU()) {
            DevExVariables.Toaster("warning", "You are not authorized for editing this form.");
            return;
        }

        $("#tbl_DesignDetails tbody").html("");
        QuotationMasterView.variables.QI_ID = qi_id;

        var myfilter = { rules: [] };
        myfilter.rules.push({ field: "QI_ID", op: "eq", data: qi_id });

        $.ajax({
            url: getDomain() + QuotationMasterView.variables.BindQuotationDesignDetailsUrl + "&myfilters=" + JSON.stringify(myfilter),
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
                            QuotationMasterView.AddNewLineDetails(obj);
                        });
                        QuotationMasterView.CalcTotalWgts();
                    }
                }
                else {
                    DevExVariables.InvalidResponseCode(data);
                }
            },
            error: OnError
        });

        $("#Modal_ItemDetails").modal("show");
    },

    AddNewLineDetails: function (obj) {
        var postfix = QuotationMasterView.variables.RowCount;

        $("#tbl_DesignDetails tbody").append(
                '<tr rowno="' + postfix + '">'
                    + '<td class="TableRowNo"></td>'
                    + '<td>'
                        + '<div id="dx_txtItemName' + postfix + '" ></div>'
                    + '</td>'
                    + '<td>'
                        + '<div id="dx_ddlShape' + postfix + '" ></div>'
                    + '</td>'
                    + '<td>'
                        + '<div id="dx_ddlQuality' + postfix + '" ></div>'
                    + '</td>'
                    + '<td>'
                        + '<div id="dx_ddlColor' + postfix + '" ></div>'
                    + '</td>'
                    + '<td>'
                        + '<div id="dx_txtLength' + postfix + '" ></div>'
                    + '</td>'
                    + '<td>'
                        + '<div id="dx_txtWidth' + postfix + '" ></div>'
                    + '</td>'
                    + '<td>'
                        + '<div id="dx_txtCharni' + postfix + '" ></div>'
                    + '</td>'
                    + '<td>'
                        + '<div id="dx_txtPieces' + postfix + '" ></div>'
                    + '</td>'
                    + '<td>'
                        + '<div id="dx_txtWeight' + postfix + '" ></div>'
                    + '</td>'
                    + '<td>'
                        + '<div id="dx_txtRate' + postfix + '" ></div>'
                    + '</td>'
                    + '<td>'
                        + '<div id="dx_txtAmt' + postfix + '" ></div>'
                    + '</td>'
                    + '<td class="text-center">'
                        + '<span class="btn btn-danger" onClick="QuotationMasterView.RemoveDetailRow(this)"><i class="fa fa-trash-o"></i></span>'
                    + '</td>'
                + '</tr>'
            );

        /*----------------------Registration of Detail table controls---------------------*/
        QuotationMasterView.DetailTableFormInit(postfix, obj);
        /*----------------------Registration of Detail table controls---------------------*/

        QuotationMasterView.variables.RowCount = postfix + 1;
    },

    DetailTableFormInit: function (postfix, obj) {
        /*----------------------Registration of Detail table controls---------------------*/
        var tmp = [];
        tmp[postfix] = { dx_txtItemName: "", dx_ddlShape: "", dx_ddlQuality: "", dx_ddlColor: "", dx_txtCharni: "", dx_txtLength: "", dx_txtWidth: "", dx_txtPieces: "", dx_txtWeight: "", dx_txtRate: "", dx_txtAmt: "" };

        QuotationMasterView.variables.DetailsControlsList = Object.assign(QuotationMasterView.variables.DetailsControlsList, tmp);

        QuotationMasterView.variables.DetailsControlsList[postfix].dx_txtItemName = $("#dx_txtItemName" + postfix).dxAutocomplete({
            dataSource: QuotationMasterView.variables.RmCodeList.filter(function (x) { return x.rmgroup == 'METAL' || x.rmgroup == 'MATERIAL' || x.rmgroup == 'LABOUR' || x.rmgroup == 'OTHER' }),
            placeholder: "Type RM Code...",
            valueExpr: "rmcode",
            onSelectionChanged: function (data) {
                if (data.selectedItem) {
                    if (data.selectedItem.rmgroup == "METAL") {
                        QuotationMasterView.variables.DetailsControlsList[postfix].dx_ddlShape.option({
                            dataSource: [{ shapeid: data.selectedItem.shapeid, shape: data.selectedItem.shape || "--" }],
                            displayExpr: "shape",
                            valueExpr: "shapeid",
                            value: data.selectedItem.shapeid,
                            disabled: true,
                        });
                        QuotationMasterView.variables.DetailsControlsList[postfix].dx_ddlQuality.option({
                            dataSource: [{ purityid: data.selectedItem.purityid, purity: data.selectedItem.purity || "--" }],
                            displayExpr: "purity",
                            valueExpr: "purityid",
                            value: data.selectedItem.purityid,
                            disabled: true,
                        });
                        QuotationMasterView.BindRmColor(postfix);
                        QuotationMasterView.variables.DetailsControlsList[postfix].dx_ddlColor.option({ value: data.selectedItem.colourid });

                        QuotationMasterView.variables.DetailsControlsList[postfix].dx_txtLength.option({ value: "", disabled: true });
                        QuotationMasterView.variables.DetailsControlsList[postfix].dx_txtWidth.option({ value: "", disabled: true });
                        QuotationMasterView.variables.DetailsControlsList[postfix].dx_txtPieces.option({ value: "" });
                        QuotationMasterView.variables.DetailsControlsList[postfix].dx_txtCharni.option({ value: "", disabled: true });
                    }
                    else {
                        QuotationMasterView.BindRmShape(postfix);
                        QuotationMasterView.variables.DetailsControlsList[postfix].dx_ddlShape.option({ value: data.selectedItem.shapeid });
                        QuotationMasterView.BindRmPurity(postfix);
                        QuotationMasterView.variables.DetailsControlsList[postfix].dx_ddlQuality.option({ value: data.selectedItem.purityid });
                        QuotationMasterView.BindRmColor(postfix);
                        QuotationMasterView.variables.DetailsControlsList[postfix].dx_ddlColor.option({ value: data.selectedItem.colourid });

                        if (data.selectedItem.rmgroup == "MATERIAL") {
                            QuotationMasterView.variables.DetailsControlsList[postfix].dx_txtPieces.option({ disabled: false });
                            QuotationMasterView.variables.DetailsControlsList[postfix].dx_txtWeight.option({ disabled: false });
                            QuotationMasterView.variables.DetailsControlsList[postfix].dx_txtCharni.option({ disabled: false });

                            QuotationMasterView.variables.DetailsControlsList[postfix].dx_txtPieces.option({ disabled: false });
                            QuotationMasterView.variables.DetailsControlsList[postfix].dx_txtCharni.option({ disabled: false });

                            if (QuotationMasterView.variables.DetailsControlsList[postfix].dx_ddlShape.option().selectedItem) {
                                var ShapeName = QuotationMasterView.variables.DetailsControlsList[postfix].dx_ddlShape.option().selectedItem.shape;
                                if (ShapeName == "RBC") {
                                    QuotationMasterView.variables.DetailsControlsList[postfix].dx_txtLength.option({ disabled: true, value: "" });
                                    QuotationMasterView.variables.DetailsControlsList[postfix].dx_txtWidth.option({ disabled: false });
                                }
                                else if (ShapeName == "PRINCESS") {
                                    QuotationMasterView.variables.DetailsControlsList[postfix].dx_txtLength.option({ disabled: false });
                                    QuotationMasterView.variables.DetailsControlsList[postfix].dx_txtWidth.option({ disabled: true });
                                }
                                else {
                                    QuotationMasterView.variables.DetailsControlsList[postfix].dx_txtLength.option({ disabled: false });
                                    QuotationMasterView.variables.DetailsControlsList[postfix].dx_txtWidth.option({ disabled: false });
                                }
                            }
                            else {
                                QuotationMasterView.variables.DetailsControlsList[postfix].dx_txtLength.option({ disabled: false });
                                QuotationMasterView.variables.DetailsControlsList[postfix].dx_txtWidth.option({ disabled: false });
                            }

                        }
                        else {
                            QuotationMasterView.variables.DetailsControlsList[postfix].dx_txtLength.option({ value: "", disabled: true });
                            QuotationMasterView.variables.DetailsControlsList[postfix].dx_txtWidth.option({ value: "", disabled: true });
                            QuotationMasterView.variables.DetailsControlsList[postfix].dx_txtPieces.option({ value: "", disabled: true });
                            QuotationMasterView.variables.DetailsControlsList[postfix].dx_txtCharni.option({ value: "", disabled: true });
                            QuotationMasterView.variables.DetailsControlsList[postfix].dx_txtWeight.option({ value: "", disabled: true });
                        }
                    }
                }
                else {
                    QuotationMasterView.variables.DetailsControlsList[postfix].dx_txtItemName.option("value", "");
                    QuotationMasterView.variables.DetailsControlsList[postfix].dx_ddlShape.option({
                        dataSource: new DevExpress.data.ArrayStore({ data: [] })
                    });
                    QuotationMasterView.variables.DetailsControlsList[postfix].dx_ddlQuality.option({
                        dataSource: new DevExpress.data.ArrayStore({ data: [] })
                    });
                    QuotationMasterView.variables.DetailsControlsList[postfix].dx_ddlColor.option({
                        dataSource: new DevExpress.data.ArrayStore({ data: [] })
                    });

                    QuotationMasterView.variables.DetailsControlsList[postfix].dx_txtItemName.focus();
                }
            },
            onFocusOut: function (data) {
                if (!data.component.option().selectedItem) {
                    QuotationMasterView.variables.DetailsControlsList[postfix].dx_txtItemName.option("value", "");
                    QuotationMasterView.variables.DetailsControlsList[postfix].dx_ddlShape.option({
                        dataSource: new DevExpress.data.ArrayStore({ data: [] })
                    });
                    QuotationMasterView.variables.DetailsControlsList[postfix].dx_ddlQuality.option({
                        dataSource: new DevExpress.data.ArrayStore({ data: [] })
                    });
                    QuotationMasterView.variables.DetailsControlsList[postfix].dx_ddlColor.option({
                        dataSource: new DevExpress.data.ArrayStore({ data: [] })
                    });

                    QuotationMasterView.variables.DetailsControlsList[postfix].dx_txtItemName.focus();
                }
            }
        }).dxValidator({
            validationGroup: "UpdateItemDetails",
            validationRules: [{
                type: "required",
                message: "Rm Code is required"
            }]
        }).dxAutocomplete("instance");

        QuotationMasterView.variables.DetailsControlsList[postfix].dx_ddlShape = $("#dx_ddlShape" + postfix).dxSelectBox({
            placeholder: "Select Shape...",
            searchEnabled: true,
            onValueChanged: function (data) {
                QuotationMasterView.variables.DetailsControlsList[postfix].dx_txtCharni.option({ value: "" });
                if (data.component.option().selectedItem) {
                    var ShapeName = data.component.option().selectedItem.shape;
                    if (ShapeName == "RBC") {
                        QuotationMasterView.variables.DetailsControlsList[postfix].dx_txtLength.option({ disabled: true });
                        QuotationMasterView.variables.DetailsControlsList[postfix].dx_txtWidth.option({ disabled: false });
                    }
                        //else if (ShapeName == "PRINCESS") {
                        //    QuotationMasterView.variables.DetailsControlsList[postfix].dx_txtLength.option({ disabled: false });
                        //    QuotationMasterView.variables.DetailsControlsList[postfix].dx_txtWidth.option({ disabled: true });
                        //}
                    else {
                        QuotationMasterView.variables.DetailsControlsList[postfix].dx_txtLength.option({ disabled: false });
                        QuotationMasterView.variables.DetailsControlsList[postfix].dx_txtWidth.option({ disabled: false });
                    }
                }

            },
            onFocusOut: function (data) {
                if (!data.component.option().selectedItem) {
                    QuotationMasterView.variables.DetailsControlsList[postfix].dx_ddlShape.focus();
                }
                else {
                    QuotationMasterView.CalcTotalWgts();
                }
            }
        }).dxValidator({
            validationGroup: "UpdateItemDetails",
            validationRules: [{
                type: "required",
                message: "Shape is required"
            }]
        }).dxSelectBox("instance");

        QuotationMasterView.variables.DetailsControlsList[postfix].dx_ddlQuality = $("#dx_ddlQuality" + postfix).dxSelectBox({
            placeholder: "Select Quality...",
            searchEnabled: true,
            onFocusOut: function (data) {
                if (!data.component.option().selectedItem) {
                    QuotationMasterView.variables.DetailsControlsList[postfix].dx_ddlQuality.focus();
                }
                else {
                    QuotationMasterView.CalcTotalWgts();
                }
            }
        }).dxValidator({
            validationGroup: "UpdateItemDetails",
            validationRules: [{
                type: "required",
                message: "Quality is required"
            }]
        }).dxSelectBox("instance");

        QuotationMasterView.variables.DetailsControlsList[postfix].dx_ddlColor = $("#dx_ddlColor" + postfix).dxSelectBox({
            placeholder: "Select Color...",
            searchEnabled: true,
            onFocusOut: function (data) {
                if (!data.component.option().selectedItem) {
                    QuotationMasterView.variables.DetailsControlsList[postfix].dx_ddlColor.focus();
                }
                else {
                    QuotationMasterView.CalcTotalWgts();
                }
            }
        }).dxValidator({
            validationGroup: "UpdateItemDetails",
            validationRules: [{
                type: "required",
                message: "Color is required"
            }]
        }).dxSelectBox("instance");

        QuotationMasterView.variables.DetailsControlsList[postfix].dx_txtCharni = $("#dx_txtCharni" + postfix).dxAutocomplete({
            dataSource: new DevExpress.data.CustomStore({
                load: function (loadOptions) {
                    var deferred = $.Deferred();

                    if (QuotationMasterView.variables.DetailsControlsList[postfix].dx_ddlShape.option().selectedItem) {
                        var myfilter = { rules: [] };
                        myfilter.rules.push({ field: "RMSHAPEID", op: "eq", data: QuotationMasterView.variables.DetailsControlsList[postfix].dx_ddlShape.option().selectedItem.shapeid });
                        myfilter.rules.push({ field: "SEARCH", op: "eq", data: loadOptions.searchValue });
                        myfilter.rules.push({ field: "TYPE", op: "eq", data: "Charni" });

                        if (QuotationMasterView.variables.DetailsControlsList[postfix].dx_txtLength.option().value && QuotationMasterView.variables.DetailsControlsList[postfix].dx_ddlShape.option().text != "RBC")
                            myfilter.rules.push({ field: "LENGTH", op: "eq", data: QuotationMasterView.variables.DetailsControlsList[postfix].dx_txtLength.option().value });
                        if (QuotationMasterView.variables.DetailsControlsList[postfix].dx_txtWidth.option().value)
                            myfilter.rules.push({ field: "WIDTH", op: "eq", data: QuotationMasterView.variables.DetailsControlsList[postfix].dx_txtWidth.option().value });

                        var result;
                        $.ajax({
                            url: getDomain() + QuotationMasterView.variables.BindStaticDataUrl + "&myfilters=" + JSON.stringify(myfilter),
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
                    }

                    return deferred.promise();
                },
                key: "charniid",
            }),
            valueExpr: "charni",
            placeholder: "Type Charni...",
            value: "",
            onSelectionChanged: function (data) {
                if (data.selectedItem) {
                    var pcs = QuotationMasterView.variables.DetailsControlsList[postfix].dx_txtPieces.option().value || 1;
                    //var ShapeName = QuotationMasterView.variables.DetailsControlsList[postfix].dx_ddlShape.option().text;

                    QuotationMasterView.variables.DetailsControlsList[postfix].dx_txtWeight.option({ value: parseFloat(data.selectedItem.weight * pcs).toFixed(3) });

                    //if (!QuotationMasterView.variables.DetailsControlsList[postfix].dx_txtLength.option().value && ShapeName != "RBC")
                    if (data.selectedItem.lenght)
                        QuotationMasterView.variables.DetailsControlsList[postfix].dx_txtLength.option({ value: data.selectedItem.lenght });

                    //if (!QuotationMasterView.variables.DetailsControlsList[postfix].dx_txtWidth.option().value)
                    if (data.selectedItem.width)
                        QuotationMasterView.variables.DetailsControlsList[postfix].dx_txtWidth.option({ value: data.selectedItem.width });
                }
            },
            onFocusOut: function (data) {
                if (!data.component.option().selectedItem) {
                    QuotationMasterView.variables.DetailsControlsList[postfix].dx_txtCharni.option("value", "");
                }
            }
        }).dxValidator({
            validationGroup: "UpdateItemDetails",
            validationRules: [{
                type: "required",
                message: "Charni is required",
            }]
        }).dxAutocomplete("instance");

        QuotationMasterView.variables.DetailsControlsList[postfix].dx_txtLength = $("#dx_txtLength" + postfix).dxTextBox({
            mode: "number",
            onKeyDown: function (e) {
                if (e.event.key == "-" || e.event.key == "+") {
                    e.event.preventDefault();
                }
            },
            onFocusOut: function (data) {
                var ShapeName = QuotationMasterView.variables.DetailsControlsList[postfix].dx_ddlShape.option().text;
                if (ShapeName == "PRINCESS" && data.component.option().value) {
                    QuotationMasterView.variables.DetailsControlsList[postfix].dx_txtWidth.option({ value: data.component.option().value });
                }
                if (data.component.option().value)
                    QuotationMasterView.GetCharniAutoSelected(postfix);
            },
        }).dxValidator({
            validationGroup: "UpdateItemDetails",
            validationRules: [{
                type: "required",
                message: "Length is required"
            }]
        }).dxTextBox("instance");

        QuotationMasterView.variables.DetailsControlsList[postfix].dx_txtWidth = $("#dx_txtWidth" + postfix).dxTextBox({
            mode: "number",
            onKeyDown: function (e) {
                if (e.event.key == "-" || e.event.key == "+") {
                    e.event.preventDefault();
                }
            },
            onFocusOut: function (data) {
                var ShapeName = QuotationMasterView.variables.DetailsControlsList[postfix].dx_ddlShape.option().text;
                if (ShapeName == "RBC") {
                    QuotationMasterView.variables.DetailsControlsList[postfix].dx_txtLength.option({ value: data.component.option().value });
                }
                if (data.component.option().value)
                    QuotationMasterView.GetCharniAutoSelected(postfix);
            },
        }).dxValidator({
            validationGroup: "UpdateItemDetails",
            validationRules: [{
                type: "required",
                message: "Width is required"
            }]
        }).dxTextBox("instance");

        QuotationMasterView.variables.DetailsControlsList[postfix].dx_txtPieces = $("#dx_txtPieces" + postfix).dxTextBox({
            mode: "number",
            min: 1,
            value: 1,
            onFocusOut: function (data) {
                if (QuotationMasterView.variables.DetailsControlsList[postfix].dx_txtCharni.option().selectedItem
                        && QuotationMasterView.variables.DetailsControlsList[postfix].dx_txtItemName.option().selectedItem.rmgroup == "MATERIAL") {
                    var wgt = QuotationMasterView.variables.DetailsControlsList[postfix].dx_txtCharni.option().selectedItem.weight || 0;
                    QuotationMasterView.variables.DetailsControlsList[postfix].dx_txtWeight.option({ value: parseFloat(wgt * (QuotationMasterView.variables.DetailsControlsList[postfix].dx_txtPieces.option().value || 1)).toFixed(3) });
                }
                QuotationMasterView.CalcTotalWgts();
            },
            onKeyDown: function (e) {
                if (e.event.key == "-" || e.event.key == "." || e.event.key == "+") {
                    e.event.preventDefault();
                }
            },
        }).dxValidator({
            validationGroup: "UpdateItemDetails",
            validationRules: [{
                type: "required",
                message: "Pcs is required"
            }]
        }).dxTextBox("instance");

        QuotationMasterView.variables.DetailsControlsList[postfix].dx_txtWeight = $("#dx_txtWeight" + postfix).dxTextBox({
            mode: "number",
            onFocusOut: function (data) {
                QuotationMasterView.CalcTotalWgts();
            },
            onKeyDown: function (e) {
                if (((e.event.key == "Tab" || e.event.key == "Enter") && e.event.shiftKey == false) && e.element.closest("tr").is(":last-child"))
                    QuotationMasterView.AddNewLineDetails();

                if (e.event.key == "-" || e.event.key == "+") {
                    e.event.preventDefault();
                }
            }
        }).dxValidator({
            validationGroup: "UpdateItemDetails",
            validationRules: [{
                type: "required",
                message: "Weight is required"
            }]
        }).dxTextBox("instance");

        QuotationMasterView.variables.DetailsControlsList[postfix].dx_txtRate = $("#dx_txtRate" + postfix).dxTextBox({
            mode: "number",
            onFocusOut: function (data) {
                if (QuotationMasterView.variables.DetailsControlsList[postfix].dx_txtItemName.option().selectedItem.rmgroup == 'METAL'
                        || QuotationMasterView.variables.DetailsControlsList[postfix].dx_txtItemName.option().selectedItem.rmgroup == 'MATERIAL') {
                    var val = QuotationMasterView.variables.DetailsControlsList[postfix].dx_txtWeight.option().value * QuotationMasterView.variables.DetailsControlsList[postfix].dx_txtRate.option().value;
                    QuotationMasterView.variables.DetailsControlsList[postfix].dx_txtAmt.option({ value: parseFloat(val).toFixed(2) });
                }
                else {
                    var Rate = +QuotationMasterView.variables.DetailsControlsList[postfix].dx_txtRate.option().value;
                    var Amt = 0;

                    if (QuotationMasterView.variables.DetailsControlsList[postfix].dx_txtItemName.option().selectedItem.rmcate == 'MAKING') {
                        var rowData = QuotationMasterView.variables.dx_dataGridItems.getVisibleRows()[QuotationMasterView.variables.dx_dataGridItems.getRowIndexByKey(+QuotationMasterView.variables.QI_ID)].data;

                        if (rowData.labouron == "FIXED") {
                            Amt = Rate;
                        }
                        else if (rowData.labouron == "GROSS WEIGHT") {
                            Amt = +QuotationMasterView.variables.dx_txtGrossWgt.option().value * Rate;
                        }
                        else if (rowData.labouron == "NET WEIGHT") {
                            Amt = +QuotationMasterView.variables.dx_txtNetWgt.option().value * Rate;
                        }
                        else if (rowData.labouron == "NET WEIGHT + GEMS WEIGHT") {
                            Amt = (+QuotationMasterView.variables.dx_txtNetWgt.option().value + (+QuotationMasterView.variables.dx_txtDiaCrt.option().value * 0.2)) * Rate;
                        }
                        else {
                            Amt = Rate;
                        }
                    }
                    else {
                        Amt = Rate;
                    }

                    QuotationMasterView.variables.DetailsControlsList[postfix].dx_txtAmt.option({ value: parseFloat(Amt).toFixed(2) });
                }
            },
            onKeyDown: function (e) {
                if (((e.event.key == "Tab" || e.event.key == "Enter") && e.event.shiftKey == false) && e.element.closest("tr").is(":last-child"))
                    QuotationMasterView.AddNewLineDetails();

                if (e.event.key == "-" || e.event.key == "+") {
                    e.event.preventDefault();
                }
            }
        }).dxValidator({
            validationGroup: "UpdateItemDetails",
            validationRules: [{
                type: "required",
                message: "Rate is required"
            }]
        }).dxTextBox("instance");

        QuotationMasterView.variables.DetailsControlsList[postfix].dx_txtAmt = $("#dx_txtAmt" + postfix).dxTextBox({
            mode: "number",
            readOnly: true
        }).dxValidator({
            validationGroup: "UpdateItemDetails",
            validationRules: [{
                type: "required",
                message: "Amount is required"
            }]
        }).dxTextBox("instance");

        /*----------------------Registration of Detail table controls---------------------*/

        /*----------------------Set Value of Detail table controls while Edit---------------------*/
        if (obj) {
            QuotationMasterView.variables.DetailsControlsList[postfix].dx_txtItemName.option({
                items: [{
                    rmcodeid: obj.rmcodeid,
                    rmcode: obj.rmcode,
                    rmcateid: obj.rmcateid,
                    rmcate: obj.rmcate,
                    rmsubcateid: obj.rmsubcateid,
                    rmsubcate: obj.rmsubcate,
                    rmgroup: obj.rmgroup,
                    shapeid: obj.shapeid,
                    shape: obj.shape,
                    purityid: obj.purityid,
                    purity: obj.purity,
                    colourid: obj.colourid,
                    colour: obj.colour,
                    purityper: obj.purityper,
                    melper: obj.melper
                }],
                selectedItem: {
                    rmcodeid: obj.rmcodeid,
                    rmcode: obj.rmcode,
                    rmcateid: obj.rmcateid,
                    rmcate: obj.rmcate,
                    rmsubcateid: obj.rmsubcateid,
                    rmsubcate: obj.rmsubcate,
                    rmgroup: obj.rmgroup,
                    shapeid: obj.shapeid,
                    shape: obj.shape,
                    purityid: obj.purityid,
                    purity: obj.purity,
                    colourid: obj.colourid,
                    colour: obj.colour,
                    purityper: obj.purityper,
                    melper: obj.melper
                },
                value: obj.rmcode
            });

            QuotationMasterView.variables.DetailsControlsList[postfix].dx_ddlShape.option({
                selectedItem: { shapeid: obj.shapeid, shape: (obj.shape || "--") },
                value: obj.shapeid,
            });
            QuotationMasterView.variables.DetailsControlsList[postfix].dx_ddlQuality.option({
                selectedItem: { purityid: obj.purityid, purity: obj.purity || "--" },
                value: obj.purityid,
            });
            QuotationMasterView.variables.DetailsControlsList[postfix].dx_ddlColor.option({
                selectedItem: { colourid: obj.colourid, colour: obj.colour || "--" },
                value: obj.colourid,
            });
            QuotationMasterView.variables.DetailsControlsList[postfix].dx_txtCharni.option({
                items: [{
                    charniid: obj.charniid,
                    charni: obj.charni,
                    groupcharni: obj.groupcharni,
                    weight: obj.charniweight,
                    lenght: obj.charnilenght,
                    width: obj.charniwidth,
                }],
                selectedItem: {
                    charniid: obj.charniid,
                    charni: obj.charni,
                    groupcharni: obj.groupcharni,
                    weight: obj.charniweight,
                    lenght: obj.charnilenght,
                    width: obj.charniwidth,
                },
                value: obj.charni
            });
            QuotationMasterView.variables.DetailsControlsList[postfix].dx_txtLength.option({ value: obj.lenghtmmsize });
            QuotationMasterView.variables.DetailsControlsList[postfix].dx_txtWidth.option({ value: obj.widthmmsize });
            QuotationMasterView.variables.DetailsControlsList[postfix].dx_txtPieces.option({ value: obj.pieces });
            QuotationMasterView.variables.DetailsControlsList[postfix].dx_txtWeight.option({ value: obj.weight });
            QuotationMasterView.variables.DetailsControlsList[postfix].dx_txtRate.option({ value: obj.rate });
            QuotationMasterView.variables.DetailsControlsList[postfix].dx_txtAmt.option({ value: obj.amount });
        }
        /*----------------------Set Value of Detail table controls while Edit---------------------*/

    },

    CalcTotalWgts: function () {
        var index,
            RmCode,
            RmGroup,
            touch,
            TotalDiaPcs = 0,
            TotalDiaCts = 0,
            TotalNetWgt = 0,
            TotalGrossWgt = 0,
            TotalFineWgt = 0;

        $("#tbl_DesignDetails tbody tr").each(function (key, obj) {
            index = $(obj).attr("rowno");
            if (QuotationMasterView.variables.DetailsControlsList[index].dx_txtItemName.option().selectedItem) {
                RmCate = QuotationMasterView.variables.DetailsControlsList[index].dx_txtItemName.option().selectedItem.rmcate;

                if (RmCate == "GEMS") {
                    TotalDiaPcs += +QuotationMasterView.variables.DetailsControlsList[index].dx_txtPieces.option().value;
                    TotalDiaCts += +QuotationMasterView.variables.DetailsControlsList[index].dx_txtWeight.option().value;
                }

                if (RmCate == "METAL") {
                    touch = +QuotationMasterView.variables.DetailsControlsList[index].dx_txtItemName.option().selectedItem.purityper;
                    TotalNetWgt += +QuotationMasterView.variables.DetailsControlsList[index].dx_txtWeight.option().value;
                    TotalFineWgt += (+QuotationMasterView.variables.DetailsControlsList[index].dx_txtWeight.option().value * touch / 100);
                }
            }
        });

        TotalGrossWgt = TotalNetWgt + (TotalDiaCts * 0.2);

        QuotationMasterView.variables.dx_txtDiaPcs.option("value", TotalDiaPcs);
        QuotationMasterView.variables.dx_txtDiaCrt.option("value", parseFloat(TotalDiaCts).toFixed(3));
        QuotationMasterView.variables.dx_txtNetWgt.option("value", parseFloat(TotalNetWgt).toFixed(3));
        QuotationMasterView.variables.dx_txtGrossWgt.option("value", parseFloat(TotalGrossWgt).toFixed(3));
        QuotationMasterView.variables.dx_txtFineWgt.option("value", parseFloat(TotalFineWgt).toFixed(3));
    },

    RemoveDetailRow: function (obj) {
        $(obj).closest("tr").remove();
        delete QuotationMasterView.variables.DetailsControlsList[$(obj).closest("tr").attr("rowno")];

        QuotationMasterView.CalcTotalWgts();
    },

    BindRmColor: function (postfix) {
        var List = QuotationMasterView.variables.RmColorList.filter(function (x) {
            return x.rmcateid == QuotationMasterView.variables.DetailsControlsList[postfix].dx_txtItemName.option().selectedItem.rmcateid
                && x.rmsubcateid == QuotationMasterView.variables.DetailsControlsList[postfix].dx_txtItemName.option().selectedItem.rmsubcateid;
        });
        QuotationMasterView.variables.DetailsControlsList[postfix].dx_ddlColor.option({
            dataSource: new DevExpress.data.ArrayStore({
                data: List,
                key: "colourid"
            }),
            disabled: false,
            displayExpr: "colour",
            valueExpr: "colourid",
            value: ""
        });
    },

    BindRmShape: function (postfix) {
        var List = QuotationMasterView.variables.RmShapeList.filter(function (x) {
            return x.rmcateid == QuotationMasterView.variables.DetailsControlsList[postfix].dx_txtItemName.option().selectedItem.rmcateid;
            //&& x.rmsubcateid == QuotationMasterView.variables.DetailsControlsList[postfix].dx_txtItemName.option().selectedItem.rmsubcateid;
        });
        QuotationMasterView.variables.DetailsControlsList[postfix].dx_ddlShape.option({
            dataSource: new DevExpress.data.ArrayStore({
                data: List,
                key: "shapeid"
            }),
            disabled: false,
            displayExpr: "shape",
            valueExpr: "shapeid",
            value: ""
        });
    },

    BindRmPurity: function (postfix) {
        var List = QuotationMasterView.variables.RmPurityList.filter(function (x) {
            return x.rmcateid == QuotationMasterView.variables.DetailsControlsList[postfix].dx_txtItemName.option().selectedItem.rmcateid
                && x.rmsubcateid == QuotationMasterView.variables.DetailsControlsList[postfix].dx_txtItemName.option().selectedItem.rmsubcateid;
        });
        QuotationMasterView.variables.DetailsControlsList[postfix].dx_ddlQuality.option({
            dataSource: new DevExpress.data.ArrayStore({
                data: List,
                key: "purityid"
            }),
            disabled: false,
            displayExpr: "purity",
            valueExpr: "purityid",
            value: ""
        });
    },

    GetCharniAutoSelected: function (postfix) {
        if (QuotationMasterView.variables.DetailsControlsList[postfix].dx_ddlShape.option().selectedItem) {
            var myfilter = { rules: [] };
            myfilter.rules.push({ field: "RMSHAPEID", op: "eq", data: QuotationMasterView.variables.DetailsControlsList[postfix].dx_ddlShape.option().selectedItem.shapeid });
            myfilter.rules.push({ field: "TYPE", op: "eq", data: "Charni" });

            if (QuotationMasterView.variables.DetailsControlsList[postfix].dx_txtLength.option().value && QuotationMasterView.variables.DetailsControlsList[postfix].dx_ddlShape.option().text != "RBC")
                myfilter.rules.push({ field: "LENGTH", op: "eq", data: QuotationMasterView.variables.DetailsControlsList[postfix].dx_txtLength.option().value });
            if (QuotationMasterView.variables.DetailsControlsList[postfix].dx_txtWidth.option().value)
                myfilter.rules.push({ field: "WIDTH", op: "eq", data: QuotationMasterView.variables.DetailsControlsList[postfix].dx_txtWidth.option().value });

            $.ajax({
                url: getDomain() + QuotationMasterView.variables.BindStaticDataUrl + "&myfilters=" + JSON.stringify(myfilter),
                async: false,
                cache: false,
                type: 'POST',
                success: function (data) {
                    if ($(data).find('RESPONSECODE').text() == "0") {
                        var JsonObject = xml2json.parser(data);
                        if (JsonObject.serviceresponse.detailslist) {
                            var list = [];
                            if (JsonObject.serviceresponse.detailslist.details.length)
                                list = JsonObject.serviceresponse.detailslist.details;
                            else
                                list.push(JsonObject.serviceresponse.detailslist.details);

                            QuotationMasterView.variables.DetailsControlsList[postfix].dx_txtCharni.option({
                                items: list,
                                selectedItem: list[0],
                                value: list[0].charni
                            });
                        }
                        else {
                            QuotationMasterView.variables.DetailsControlsList[postfix].dx_txtCharni.option({
                                items: [],
                                selectedItem: "",
                                value: ""
                            });
                        }
                    }
                    else {
                        DevExVariables.InvalidResponseCode(data);
                    }
                },
                error: OnError
            });
        }
    },

    clearControlsForItemDetails: function () {
        $("#tbl_DesignDetails tbody").html("");
        QuotationMasterView.variables.RowCount = 1;
        QuotationMasterView.variables.DetailsControlsList = [];
        QuotationMasterView.variables.QI_ID = "";
    },

    CopyQuotItem: function (qi_id) {
        QuotationMasterView.variables.QI_ID = qi_id;
        QuotationMasterView.variables.dx_popupItemCopy.show();
    },

    InsertItemCopies: function () {
        if (QuotationMasterView.variables.dx_txtNumOfCopy.option().value <= 0) {
            DevExVariables.Toaster("warning", "Please enter number greater than 0.");
            return;
        }


        var data = {
            "QI_ID": QuotationMasterView.variables.QI_ID,
            "COPYCOUNT": QuotationMasterView.variables.dx_txtNumOfCopy.option().value,

            "QUOTATION_DATE": QuotationMasterView.variables.dx_txtQuoDate.option().text,
            "TYPE": QuotationMasterView.variables.dx_ddlQuoType.option().value,
            "DUEDAY": QuotationMasterView.variables.dx_txtDueDays.option().value,
            "PRIORITY": QuotationMasterView.variables.dx_ddlPriority.option().value,
            "ACCID": QuotationMasterView.variables.dx_txtPartyName.option().selectedItem.accid,
            "SALESMANID": QuotationMasterView.variables.dx_ddlOrderby.option().value,
            "ISFINALSUBMIT": 0,
            "QM_ID": QuotationMasterView.variables.Masterid,
            "oper": QuotationMasterView.variables.Oper,
            "OPER_TYPE": "Item_Copy"
        }

        $.ajax({
            url: getDomain() + QuotationMasterView.variables.PerformMasterOperationUrl,
            data: data,
            async: false,
            cache: false,
            type: 'POST',
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    DevExVariables.Toaster("success", 'Item copied successfully.');

                    QuotationMasterView.variables.QI_ID = "";
                    QuotationMasterView.variables.dx_popupItemCopy.hide();
                    QuotationMasterView.variables.dx_dataGridItems.refresh();

                }
                else {
                    DevExVariables.InvalidResponseCode(data);
                }
            },
            error: OnError,
        });
    },

    RegisterItemImageUpload: function (key, btnUpload, DestinationPath) {
        //var oldfilePath = ($("#" + btnView).attr("src")).replace(getDomain(), "");

        $('#' + btnUpload).fileupload({
            url: getDomain() + '/Helpers/Handler/FileUploadHandler.ashx',
            add: function (e, data) {
                QuotationMasterView.variables.QI_ID = key;
                QuotationMasterView.variables.DestinationPath = DestinationPath;

                if (checkIsValidFile(e.target.accept, data.files[0].type))
                    data.submit();
                else
                    DevExVariables.Toaster('warning', 'Please select only ' + e.target.accept + ' files');
            },
            success: function (response, status) {
                //var FileName = response.substring(response.lastIndexOf("/") + 1);
                //QuotationMasterView.uploadItemImage(key, FileName);
                $('#ModelImageCropper').modal();
                $("#divCropCanvas").html('');
                $("#imgCropPreview").cropper("replace", response);
                $('#hdnCropperImgName').val($(this)[0].files[0].name);
            },
            error: OnError
        });
    },

    uploadItemImage: function (FileName) {
        var data = {
            "QM_ID": QuotationMasterView.variables.Masterid,
            "QI_ID": QuotationMasterView.variables.QI_ID,
            "oper": "Edit",
            "IMAGE": FileName,
            "OPER_TYPE": "Upload_Image"
        };

        $.ajax({
            url: getDomain() + QuotationMasterView.variables.PerformMasterOperationUrl,
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
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    DevExVariables.Toaster("success", 'Image uploaded successfully.');
                    QuotationMasterView.variables.QI_ID = "";
                    QuotationMasterView.variables.dx_dataGridItems.refresh();
                }
                else {
                    DevExVariables.InvalidResponseCode(data);
                }
            },
            error: OnError,
        });
    },

    ClearShareItemControlls: function () {
        QuotationMasterView.variables.dx_txtSharetoPartyList.option({ "value": "" }, { "items": "" }, { "selectedItem": "" });
        QuotationMasterView.variables.dx_RadioSocial.option({ value: "WhatsApp" });
        QuotationMasterView.variables.dx_txtVoucherMobileNo.option({ value: "" });
        QuotationMasterView.variables.dx_txtShareMessage.option({ value: 'Dear sir, Some Jewellery Designs are shared by Trinity Jewells with you. Kindly click on below URL to view shared Designs. {SHARE URL}' });
        QuotationMasterView.variables.dx_txtSharingSubject.option({ value: "Quotation shared by TrinityJewells" });
        QuotationMasterView.variables.dx_txtSharingEmailBody.option({ value: QuotationMasterView.variables.content });
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

    SharingDetails: function () {
        var Type = QuotationMasterView.variables.dx_RadioSocial.option().value;
        if (Type == "E-Mail") {
            if (!QuotationMasterView.variables.dx_txtSharingEmailId.option().value || !QuotationMasterView.variables.dx_txtSharingSubject.option().value || !QuotationMasterView.variables.dx_txtSharingEmailBody.option().value) {
                DevExVariables.Toaster("warning", "Email Id, Subject and Email Body are required.");
                return false;
            }
        }
        else if (Type == "SMS") {
            if (!QuotationMasterView.variables.dx_txtVoucherMobileNo.option().value || !QuotationMasterView.variables.dx_txtShareMessage.option().value) {
                DevExVariables.Toaster("warning", "Mobile No and Message are required.");
                return false;
            }
        }
        else {
            if (!QuotationMasterView.variables.dx_txtShareMessage.option().value) {
                DevExVariables.Toaster("warning", "Message is required.");
                return false;
            }
        }
        var MobileNo = "", MSG = "", Mailbody = "", MailId = "", Subject = "";

        if (Type == "E-Mail") {
            MailId = QuotationMasterView.variables.dx_txtSharingEmailId.option().value;
            Subject = QuotationMasterView.variables.dx_txtSharingSubject.option().value;
            Mailbody = QuotationMasterView.variables.dx_txtSharingEmailBody.option().value;
        }
        else if (Type == "SMS") {
            MobileNo = QuotationMasterView.variables.dx_txtVoucherMobileNo.option().value;
            MSG = QuotationMasterView.variables.dx_txtShareMessage.option().value;
        }
        else {
            MSG = QuotationMasterView.variables.dx_txtShareMessage.option().value;
        }

        var rowData = QuotationMasterView.variables.dx_dataGrid.getVisibleRows()[QuotationMasterView.variables.dx_dataGrid.getRowIndexByKey(+QuotationMasterView.variables.Masterid)].data;
        var ShareLink = getB2BDomain() + "/QuotationView?UNIQUEID=" + rowData.uniqueid;
        var message = "";
        if (Type == "E-Mail") {
            message = Mailbody.replace("{SHARE URL}", '<a href="' + ShareLink + '" target="_blank">Click here...</a>');
        }
        else {
            message = MSG.replace("{SHARE URL}", ShareLink);
        }
        var result = QuotationMasterView.ShareSocialMedia(Type, MobileNo, message, MailId, Subject);
        if (result == true) {
            $("#ModalSharing").modal("hide");
            if (QuotationMasterView.variables.IsfromCart == true) {
                QuotationMasterView.variables.dx_gridSelectionItem_CartList.clearSelection();
            }
            else {
                QuotationMasterView.variables.dx_dataGrid.clearSelection();
            }
        }
        QuotationMasterView.ClearShareItemControlls();
        $("#ModalSharing").modal("hide");
    },
};

$(document).ready(function () {
    QuotationMasterView.FormInitialize();
    QuotationMasterView.GetCountryList();
    QuotationMasterView.GetCurrencyList();
    QuotationMasterView.GetUserName();
    QuotationMasterView.variables.dx_ddlOrderby.option({ value: Number(getUserId()) });

    /*----------------------For bind data in Update parameter form controls----------------------*/
    QuotationMasterView.GetRmCodeList();
    QuotationMasterView.GetRmShapeList();
    QuotationMasterView.GetRmPurityList();
    QuotationMasterView.GetRmColorList();
    QuotationMasterView.GetLabList();
    /*----------------------/For bind data in Update parameter form controls----------------------*/
    QuotationMasterView.GetJewSize();

    QuotationMasterView.variables.dx_popupItemRemove = $('#dx_popupItemRemove').dxPopup({
        contentTemplate: function () {
            return $("<div>").append(
                $("<p>Are you sure to remove these selected items?</p>")
            );
        },
        width: 300,
        height: 200,
        showTitle: true,
        title: 'Remove Items',
        visible: false,
        dragEnabled: true,
        closeOnOutsideClick: true,
        showCloseButton: true,
        toolbarItems: [{
            widget: 'dxButton',
            toolbar: 'bottom',
            location: 'after',
            options: {
                icon: 'todo',
                text: 'Yes',
                type: 'success',
                onClick() {
                    QuotationMasterView.RemoveItemFromQuotation();
                },
            },
        }, {
            widget: 'dxButton',
            toolbar: 'bottom',
            location: 'before',
            options: {
                icon: 'remove',
                text: 'Close',
                type: "danger",
                onClick() {
                    QuotationMasterView.variables.dx_popupItemRemove.hide();
                },
            },
        }],
    }).dxPopup('instance');

    $("#Modal_UpdateMaterialRate").on("shown.bs.modal", function () {
        if (QuotationMasterView.variables.dx_dataGrid_MaterialRate) {
            QuotationMasterView.variables.dx_dataGrid_MaterialRate.refresh();
        }
        else {
            QuotationMasterView.variables.dx_dataGrid_MaterialRate = $("#dx_dataGrid_MaterialRate").dxDataGrid({
                dataSource: new DevExpress.data.CustomStore({
                    key: "rownum",
                    load: function (loadOptions) {
                        var deferred = $.Deferred();

                        var SelectedItemList = [];
                        SelectedItemList = QuotationMasterView.variables.dx_dataGridItems.option().selectedRowKeys;

                        var myfilter = { rules: [] };
                        myfilter.rules.push({ field: "QM_ID", op: "eq", data: QuotationMasterView.variables.Masterid });
                        myfilter.rules.push({ field: "SELECTED_QI_ID", op: "eq", data: SelectedItemList.toString() });
                        var result;

                        $.ajax({
                            url: getDomain() + QuotationMasterView.variables.BindQuotMaterialRateUrl + "&myfilters=" + JSON.stringify(myfilter),
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
                    },
                    update(key, values) {
                        var deferred = $.Deferred();
                        deferred.resolve();
                    },
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
                columnFixing: {
                    enabled: true,
                },
                filterRow: {
                    visible: false
                },
                headerFilter: {
                    visible: false
                },
                remoteOperations: true,
                paging: {
                    enabled: false,
                },
                editing: {
                    mode: 'cell',
                    allowUpdating: true,
                    allowAdding: false,
                    allowDeleting: false,
                    refreshMode: 'repaint',
                },
                columns: [{ dataField: "rownum", allowSorting: false, visible: true, allowEditing: false },
                    { dataField: "rmcateid", caption: "Category Id", dataType: "number", visible: false, allowSorting: false, allowEditing: false },
                    { dataField: "rmcate", caption: "Category", dataType: "string", allowSorting: false, allowEditing: false },
                    { dataField: "subcateid", caption: "Sub Category Id", dataType: "number", visible: false, allowSorting: false, allowEditing: false },
                    { dataField: "rmsubcate", caption: "Sub Category", dataType: "string", allowSorting: false, allowEditing: false },
                    { dataField: "shapeid", caption: "Shape Id", dataType: "number", visible: false, allowSorting: false, allowEditing: false },
                    { dataField: "shape", caption: "Shape", dataType: "string", allowSorting: false, allowEditing: false },
                    { dataField: "purityid", caption: "Purity Id", dataType: "number", visible: false, allowSorting: false, allowEditing: false },
                    { dataField: "purity", caption: "Purity", dataType: "string", allowSorting: false, allowEditing: false },
                    { dataField: "colorid", caption: "Color Id", dataType: "number", visible: false, allowSorting: false, allowEditing: false },
                    { dataField: "colour", caption: "Color", dataType: "string", allowSorting: false, allowEditing: false },
                    { dataField: "charniid", caption: "Charni Id", dataType: "number", visible: false, allowSorting: false, allowEditing: false },
                    { dataField: "groupcharni", caption: "Group Charni", dataType: "string", allowSorting: false, allowEditing: false },
                    { dataField: "rate", caption: "Rate", dataType: "number", allowSorting: false, allowEditing: true },
                ],
                onSelectionChanged(selectedItems) {
                    if (selectedItems.selectedRowKeys.length > 0) {
                        QuotationMasterView.variables.dx_btnUpdateMatRate.option({ disabled: false });
                    }
                    else {
                        QuotationMasterView.variables.dx_btnUpdateMatRate.option({ disabled: true });
                    }
                },
            }).dxDataGrid("instance");
        }

    });

    $("#lnk_AddNewRow").click(function () {
        QuotationMasterView.AddNewLineDetails();
    });

    QuotationMasterView.variables.dx_popupItemCopy = $('#dx_popupItemCopy').dxPopup({
        contentTemplate: function () {
            return $("<div>").append(
                $("<div id='dx_txtNumOfCopy'></div>")
            );
        },
        width: 300,
        height: 200,
        showTitle: true,
        title: 'Copy Item',
        visible: false,
        dragEnabled: true,
        closeOnOutsideClick: true,
        showCloseButton: true,
        onShown: function () {
            QuotationMasterView.variables.dx_txtNumOfCopy = $("#dx_txtNumOfCopy").dxNumberBox({
                placeholder: 'Enter the number of copies...',
                min: 0,
                value: 1,
            }).dxNumberBox('instance');
        },
        toolbarItems: [{
            widget: 'dxButton',
            toolbar: 'bottom',
            location: 'after',
            options: {
                icon: 'todo',
                text: 'Yes',
                type: 'success',
                onClick() {
                    QuotationMasterView.InsertItemCopies();
                },
            },
        }, {
            widget: 'dxButton',
            toolbar: 'bottom',
            location: 'before',
            options: {
                icon: 'remove',
                text: 'Close',
                type: "danger",
                onClick() {
                    QuotationMasterView.variables.dx_popupItemCopy.hide();
                    QuotationMasterView.variables.QI_ID = "";
                },
            },
        }],
    }).dxPopup('instance');

    $("#inputItemImage").click(function () {
        QuotationMasterView.variables.ImageUploadType = "Single";
    });

    $("#imgCropPreview").cropper({
        aspectRatio: 1,
        preview: ".preview",
        background: false,
        minContainerWidth: 250,
        minContainerHeight: 250,
        data: {
            x: 208,
            y: 22
        }
    });

    $('.docs-buttons1').on('click', '[data-method]', function () {
        var $this = $(this);
        var data = $this.data();
        var $target;
        var result;

        result = $("#imgCropPreview").cropper(data.method, data.option, data.secondOption);
        switch (data.method) {
            case 'scaleX':
            case 'scaleY':
                $(this).data('option', -data.option);
                break;
            case 'getCroppedCanvas':
                if (result) {
                    $('#ModelImageCropper').modal().find('#divCropCanvas').html(result);
                    $("canvas").hide();
                    $('#ModelImageCropper').modal('hide');
                    var c = $("#divCropCanvas").find('canvas')[0];
                    if (c != undefined) {
                        var ctx = c.getContext("2d");
                        var img = $("#imgCropPreview")[0];
                        ctx.drawImage(c, 0, 0);
                        img.setAttribute('crossOrigin', 'anonymous');

                        //Setting image quality
                        //var fullQuality = canvas.toDataURL('image/jpeg', 1.0);
                        //var mediumQuality = canvas.toDataURL('image/jpeg', 0.5);
                        //var lowQuality = canvas.toDataURL('image/jpeg', 0.1);
                        var mydataURL = c.toDataURL('image/png', 1.0);
                        if (mydataURL != '')
                            setTimeout(function () {
                                $.ajax({
                                    url: getDomain() + "/Common/convertstring",
                                    data: { imagestring: mydataURL },
                                    async: false,
                                    cache: false,
                                    type: 'POST',
                                    success: function (response) {
                                        $.ajax({
                                            type: 'POST',
                                            async: false,
                                            cache: false,
                                            url: getDomain() + "/Common/SaveSingleImage",
                                            data: {
                                                originalfile: "",
                                                newfile: response.replace(getDomain(), ""),
                                                oper: "Edit",
                                                isResize: true,
                                                //module: "QuotationMaster"
                                                module: QuotationMasterView.variables.DestinationPath
                                            },
                                            success: function (result) {
                                                var FileName = response.substring(response.lastIndexOf("/") + 1);
                                                QuotationMasterView.uploadItemImage(FileName);
                                            },
                                            error: OnError
                                        });
                                    },
                                    error: OnError
                                });
                            }, 10);
                    }
                }
                break;
        }
    });

    //---------------- Use in Share Model Print ---------------------------
    $.ajax({
        type: 'POST',
        async: false,
        cache: false,
        url: getDomain() + "/Sharing/VoucherPrintGet",
        data: {
            VoucherId: $("#hdnVoucherId").val(),
            VoucherType: $("#hdnVoucherType").val(),
        },
        success: function (result) {

            return "sucess";
        },
        error: OnError
    });
    //---------------- /Use in Share Model Print ---------------------------


});

function VoucherShare(id) {
    QuotationMasterView.variables.Masterid = id;
    QuotationMasterView.ClearShareItemControlls();
    $("#ModalSharing").modal('show');
}

function shareRow(id) {

}


function downloadXLS(id) {

}