var DesignMasterView = {
    variables: {
        BindGroupListUrl: "/Common/BindMastersDetails?ServiceName=PRD_DESIGN_MASTER_GET",
        PerformMasterOperationurl: "/Common/OpeartionsOnMaster?ServiceName=PRD_DESIGN_MASTER_CRUD",
        BindStaticDataUrl: "/Common/BindMastersDetails?ServiceName=STATIC_MASTER_GET&IsActive=true",
        BindStaticMultipleDataUrl: "/Common/BindMastersDetails?ServiceName=STATIC_MASTER_MULTIPLE_GET&IsActive=true",
        BindDetailListUrl: "/Common/BindMastersDetails?ServiceName=PRD_DESIGN_DETAIL_GET",
        BindImgListUrl: "/Common/BindMastersDetails?ServiceName=PRD_DESIGN_IMAGES_GET",
        BindAccListUrl: "/Common/BindMastersDetails?ServiceName=ACCOUNTMASTER_GET",
        BindItemCateUrl: "/Common/BindMastersDetails?ServiceName=ACC_ITEMMASTER_GET",
        Oper: 'Add',
        addedit: "added",
        Masterid: "",
        EditDataList: [],
        RowCount: 1,
        ImgRowCount: 1,
        ImageUploadType: "",
        dx_dataGrid: "",
        DesignCode: "",
        /*------------------------variables for main form Controls-----------------------*/
        dx_ddlCategory: "",
        dx_ddlSubCategory: "",
        dx_txtCollName: "",
        dx_txtBrand: "",
        dx_txtOccasion: "",
        dx_txtDesignCode: "",
        dx_txtItemCate: "",
        dx_ddlSize: "",
        dx_txtLength: "",
        dx_txtWidth: "",
        dx_txtHeight: "",
        dx_ddlLbrType: "",
        dx_ddlSettingType: "",
        dx_txtDesigner: "",
        dx_txtDesignedDate: "",
        //dx_uploadCADFile: "",
        dx_ddlConceptOf: "",
        dx_txtRefCode: "",
        dx_SwitchSampleLinePcs: "",
        dx_SwitchMaster: "",
        dx_SwitchIsActive: "",
        dx_SwitchDisWebB2B: "",
        dx_SwitchDisWebB2C: "",
        dx_SwitchDisAppB2B: "",
        dx_SwitchDisAppB2C: "",
        dx_SwitchDisOutlet: "",
        dx_txtDiaPcs: "",
        dx_txtDiaCrt: "",
        dx_txtNetWgt: "",
        dx_txtGrossWgt: "",
        dx_txtFineWgt: "",
        dx_txtNotes: "",
        dx_txtKeywords: "",
        dx_txtRelatedProduct: "",
        dx_btnSubmit: "",
        dx_btnCancel: "",
        dx_btnAddNew: "",
        /*------------------------variables for main form Controls-----------------------*/

        /*------------------------variables for Detail Table Controls-----------------------*/
        DetailsControlsList: [],
        /*------------------------variables for Detail Table Controls-----------------------*/

        /*------------------------variables for Multiple Img Table Controls-----------------------*/
        MultiImgControlsList: [],
        ImgViewList: ["TOP", "FRONT", "RIGHT", "LEFT", "360"],
        ImgColorList: ["ROSE", "WHITE", "YELLOW"],
        deletedFiles: "",
        /*------------------------variables for Multiple Img Table Controls-----------------------*/

        /*------------------------variables for Delete Popup Controls-----------------------*/
        dx_popupRecordDelete: "",
        DeleteDataObj: "",
        DeletePopUpOptions: {
            width: 300,
            height: 270,
            contentTemplate: function () {
                return $("<div />").append(
                    $("<p>Design Code: <span><b>" + DesignMasterView.variables.DeleteDataObj.designcode + "</b></span></p>"),
                    $("<p>Category: <span>" + DesignMasterView.variables.DeleteDataObj.desgcate + "</span></p>"),
                    $("<p>Sub Category: <span>" + DesignMasterView.variables.DeleteDataObj.desgsubcate + "</span></p>"),
                    $("<p>Gross Wgt: <span>" + DesignMasterView.variables.DeleteDataObj.grossweight + "</span></p>"),
                    $("<p>Net Wgt: <span>" + DesignMasterView.variables.DeleteDataObj.netweight + "</span></p>")
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
                            "DM_ID": DesignMasterView.variables.Masterid,
                            "oper": DesignMasterView.variables.Oper,
                        }

                        $.ajax({
                            url: getDomain() + DesignMasterView.variables.PerformMasterOperationurl,
                            data: data,
                            async: true,
                            cache: false,
                            type: 'POST',
                            success: DesignMasterView.btnMasterSubmitOnSuccess,
                            error: OnError,
                        });
                    },
                }
            }],
            showTitle: true,
            title: "Delete Design",
            visible: false,
            dragEnabled: false,
            closeOnOutsideClick: true
        },
        /*------------------------variables for Delete Popup Controls-----------------------*/

        RmCodeList: [],
        RmShapeList: [],
        RmPurityList: [],
        RmColorList: [],
    },

    initializeDevExgrid: function () {
        DesignMasterView.variables.dx_dataGrid = $("#dx_dataGrid").dxDataGrid({
            dataSource: new DevExpress.data.CustomStore({
                key: "dm_id",
                load: function (loadOptions) {
                    var deferred = $.Deferred();

                    var result = DevExVariables.GetDataList(loadOptions, DesignMasterView.variables.BindGroupListUrl);

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
            columns: [{ dataField: "dm_id", dataType: "number", allowFiltering: false, allowSorting: true, sortIndex: 1, sortOrder: "desc", visible: false },
                {
                    dataField: "designcode", caption: "Design Code", dataType: "string", alignment: "center", filterOperations: ["contains"], allowHeaderFiltering: false,
                    cellTemplate: function (container, options) {
                        var temp = '<a href="' + getDesignImgVirtualPath() + '/' + options.data.desgcate + '/' + options.data.desgsubcate + '/' + options.displayValue + '/' + options.data.imgvirtualname + '" data-fancybox="gallery">' +
                                        '<img height="50" width="50" src="' + getDesignImgVirtualPath() + '/' + options.data.desgcate + '/' + options.data.desgsubcate + '/' + options.displayValue + '/' + '/thumb/' + options.data.imgvirtualname + '" />' +
                                    '</a>' +
                                    '<div>' + options.displayValue + '</div>';
                        $(temp).appendTo(container);
                    }
                },
                { dataField: "designerid", dataType: "number", visible: false },
                { dataField: "designername", dataType: "string", visible: false },
                { dataField: "designedondate", caption: "Design Date", dataType: "date", visible: false },
                { dataField: "goodssize", caption: "size", dataType: "string", visible: false },
                { dataField: "jew_length", caption: "Length", dataType: "string", visible: false },
                { dataField: "width", caption: "Width", dataType: "string", visible: false },
                { dataField: "height", caption: "Height", dataType: "string", visible: false },
                { dataField: "desgcateid", dataType: "number", visible: false },
                {
                    dataField: "desgcate", caption: "Category", dataType: "string", filterOperations: ["contains"], allowHeaderFiltering: false, allowSorting: false,
                    cellTemplate: function (container, options) {
                        var temp = '<div>' + options.displayValue + '</div><hr style="margin:0;" /><div>' + options.data.desgsubcate + '</div>';
                        $(temp).appendTo(container);
                    }
                },
                { dataField: "desgsubcateid", dataType: "number", visible: false },
                { dataField: "desgsubcate", caption: "Sub Category", dataType: "string", visible: false },
                { dataField: "grossweight", caption: "Gross Wgt", dataType: "string", alignment: "right", allowFiltering: false, allowSorting: false },
                { dataField: "netweight", caption: "Net Wgt", dataType: "string", alignment: "right", allowFiltering: false, allowSorting: false },
                { dataField: "fineweight", caption: "Fine Wgt", dataType: "string", visible: false },
                //{ dataField: "diacts", caption: "Dia Cts", dataType: "string", alignment: "right", allowFiltering: false, allowSorting: false },
                //{ dataField: "diapcs", caption: "Dia Pcs", dataType: "string", alignment: "right", allowFiltering: false, allowSorting: false },
                {
                    dataField: "diacts", caption: "Dia Pcs | Cts", dataType: "string", alignment: "right", allowFiltering: false, allowSorting: false,
                    cellTemplate: function (container, options) {
                        var temp = '<div>' + options.data.diapcs + ' <i>pcs</i> | ' + options.displayValue + ' <i>cts</i></div>';
                        $(temp).appendTo(container);
                    }
                },
                {
                    dataField: "otherwgt", caption: "Other Pcs | Wgt", dataType: "string", alignment: "right", allowFiltering: false, allowSorting: false,
                    cellTemplate: function (container, options) {
                        var temp = '<div>' + (options.data.otherpcs || 0) + ' <i>pcs</i> | ' + (options.displayValue || 0.000) + ' <i>cts</i></div>';
                        $(temp).appendTo(container);
                    }
                },
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
                                    DesignMasterView.EditDesignFromGrid(data.value, options.key, 'Active');
                                }
                            }).appendTo(container);
                        }
                        else
                            DevExVariables.LabelTemplate(container, options);
                    }
                },
                {
                    dataField: "mold", caption: "Master", dataType: "string", alignment: "center", filterOperations: ["contains"],
                    allowSorting: false, allowFiltering: false, allowHeaderFiltering: true,
                    headerFilter: {
                        dataSource: [{
                            text: "Yes",
                            value: ["mold", "equals", 1]
                        }, {
                            text: "No",
                            value: ["mold", "equals", 0]
                        }]
                    },
                    cellTemplate: function (container, options) {
                        if (isU()) {
                            $("<div>").dxSwitch({
                                value: options.value,
                                switchedOnText: "Yes",
                                switchedOffText: "No",
                                onValueChanged: function (data) {
                                    DesignMasterView.EditDesignFromGrid(data.value, options.key, 'Master');
                                }
                            }).appendTo(container);
                        }
                        else
                            DevExVariables.LabelTemplate(container, options);
                    }
                },
                { dataField: "viswebb2b", caption: "Web B2B", dataType: "string", visible: false },
                { dataField: "viswebb2c", caption: "Web B2C", dataType: "string", visible: false },
                { dataField: "visappb2b", caption: "App B2B", dataType: "string", visible: false },
                { dataField: "visappb2c", caption: "App B2C", dataType: "string", visible: false },
                { dataField: "visoutlet", caption: "Outlet", dataType: "string", visible: false },
                { dataField: "labourtypeid", visible: false },
                { dataField: "labourtype", caption: "Labour", dataType: "string", visible: false },
                { dataField: "imgactualname", dataType: "string", visible: false },
                { dataField: "imgvirtualname", dataType: "string", visible: false },
                { dataField: "refcode", caption: "Ref Code", dataType: "string", filterOperations: ["contains"], allowHeaderFiltering: false, allowSorting: false },
                { dataField: "cadfileactualname", dataType: "string", visible: false },
                {
                    dataField: "cadfilevirtualname", caption: "CAD File", dataType: "string", allowFiltering: false, allowSorting: false, visible: false,
                    cellTemplate: function (container, options) {
                        var temp = "";
                        if (isDW())
                            temp = '<a href="' + getDesignImgVirtualPath() + '/' + options.data.desgcate + '/' + options.data.desgsubcate + '/CAD/' + options.data.cadfilevirtualname + '">' + options.data.cadfileactualname + '</a>';
                        else
                            temp = '<a href="' + getDesignImgVirtualPath() + '/' + options.data.desgcate + '/' + options.data.desgsubcate + '/CAD/' + options.data.cadfilevirtualname + '" style="pointer-events:none;">' + options.data.cadfileactualname + '</a>';

                        $(temp).appendTo(container);
                    }
                },
               { dataField: "hsncodeid", dataType: "number", visible: false },
                { dataField: "itemname", dataType: "string", visible: false },
                { dataField: "keyword", caption: "Keywords", dataType: "string", visible: false },
                { dataField: "conseptof", caption: "Concept", dataType: "string", visible: false },
                { dataField: "history", caption: "History", dataType: "string", visible: false },
                {
                    dataField: "Action", caption: "Action", alignment: "center", allowFiltering: false, allowSorting: false,
                    cellTemplate: function (container, options) {
                        if (options.data.cadfilevirtualname)
                            DevExVariables.ActionTemplate(container, options, true, true, "DesignMasterView", "Attachments");
                        else
                            DevExVariables.ActionTemplate(container, options, true, true, "DesignMasterView");

                    }
                },
            ]
        }).dxDataGrid("instance");
    },

    FormInitialize: function () {
        DesignMasterView.variables.dx_ddlCategory = $("#dx_ddlCategory").dxSelectBox({
            placeholder: "Select Category...",
            searchEnabled: true,
            onValueChanged: function (data) {
                if (data.value) {
                    DesignMasterView.GetSubCategoryList(data.value);
                    DesignMasterView.GetJewSizeList(data.value);
                    DesignMasterView.GetSettingTypeList(data.value);
                }
                else {
                    DesignMasterView.variables.dx_ddlSubCategory.option({
                        dataSource: new DevExpress.data.ArrayStore({ data: [] })
                    });
                    DesignMasterView.variables.dx_ddlSettingType.option({
                        dataSource: new DevExpress.data.ArrayStore({ data: [] })
                    });
                    DesignMasterView.variables.dx_ddlSize.option({
                        dataSource: new DevExpress.data.ArrayStore({ data: [] })
                    });
                }
            }
        }).dxValidator({
            validationRules: [{
                type: "required",
                message: "Category is required"
            }]
        }).dxSelectBox("instance");

        DesignMasterView.variables.dx_ddlSubCategory = $("#dx_ddlSubCategory").dxSelectBox({
            placeholder: "Select SubCategory...",
            searchEnabled: true,
        }).dxValidator({
            validationRules: [{
                type: "required",
                message: "Sub Category is required"
            }]
        }).dxSelectBox("instance");

        DesignMasterView.variables.dx_txtCollName = $("#dx_txtCollName").dxSelectBox({
            placeholder: "Select Collection Name...",
            searchEnabled: true,
        }).dxSelectBox("instance");

        DesignMasterView.variables.dx_txtBrand = $("#dx_txtBrand").dxSelectBox({
            placeholder: "Select Brand...",
        }).dxSelectBox("instance");

        DesignMasterView.variables.dx_txtOccasion = $("#dx_txtOccasion").dxSelectBox({
            placeholder: "Select Occasion...",
        }).dxSelectBox("instance");

        DesignMasterView.variables.dx_txtDesignCode = $("#dx_txtDesignCode").dxTextBox({
            readOnly: true,
        }).dxTextBox("instance");

        DesignMasterView.variables.dx_ddlSize = $("#dx_ddlSize").dxSelectBox({
            placeholder: "Select Size...",
            searchEnabled: true,
        }).dxSelectBox("instance");

        DesignMasterView.variables.dx_txtLength = $("#dx_txtLength").dxTextBox({
            mode: "number",
            value: 0,
            alignment: "right"
        }).dxTextBox("instance");

        DesignMasterView.variables.dx_txtWidth = $("#dx_txtWidth").dxTextBox({
            mode: "number",
            value: 0,
            alignment: "right"
        }).dxTextBox("instance");

        DesignMasterView.variables.dx_txtHeight = $("#dx_txtHeight").dxTextBox({
            mode: "number",
            value: 0,
            alignment: "right"
        }).dxTextBox("instance");

        DesignMasterView.variables.dx_txtItemCate = $("#dx_txtItemCate").dxSelectBox({
            placeholder: "Select Item Category...",
            searchEnabled: true,
        }).dxValidator({
            validationRules: [{
                type: "required",
                message: "Item Category is required"
            }]
        }).dxSelectBox("instance");

        DesignMasterView.variables.dx_ddlLbrType = $("#dx_ddlLbrType").dxSelectBox({
            placeholder: "Select Labour Type...",
            searchEnabled: true,
        }).dxValidator({
            validationRules: [{
                type: "required",
                message: "Labour Type is required"
            }]
        }).dxSelectBox("instance");

        DesignMasterView.variables.dx_ddlSettingType = $("#dx_ddlSettingType").dxTagBox({
            placeholder: "Select Setting Type...",
            searchEnabled: true,
        }).dxTagBox("instance");

        DesignMasterView.variables.dx_txtDesigner = $("#dx_txtDesigner").dxAutocomplete({
            placeholder: "Type Designer Name...",
            mode: "search",
            dataSource: new DevExpress.data.CustomStore({
                load: function (loadOptions) {
                    var deferred = $.Deferred();

                    var myfilter = { rules: [] };
                    myfilter.rules.push({ field: "SUBHEAD", op: "eq", data: "Designer" });

                    var result;
                    $.ajax({
                        url: getDomain() + DesignMasterView.variables.BindAccListUrl + "&myfilters=" + JSON.stringify(myfilter),
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
                key: "accid"
            }),
            valueExpr: "accountname",
            displayExpr: "accountname",
            onFocusOut: function (data) {
                if (!data.component.option().selectedItem) {
                    DesignMasterView.variables.dx_txtDesigner.option("value", "");
                }
            },
        }).dxAutocomplete("instance");

        //var now = new Date();
        DesignMasterView.variables.dx_txtDesignedDate = $("#dx_txtDesignedDate").dxDateBox({
            type: "date",
            //value: now,
            showClearButton: true,
            useMaskBehavior: true,
            displayFormat: "dd/M/yyyy",
        }).dxDateBox("instance");

        //DesignMasterView.variables.dx_uploadCADFile = $("#dx_uploadCADFile").dxFileUploader({
        //    selectButtonText: "Upload File",
        //    labelText: "",
        //    accept: "*",
        //    uploadMode: "useForm"
        //}).dxFileUploader("instance");

        DesignMasterView.variables.dx_ddlConceptOf = $("#dx_ddlConceptOf").dxTagBox({
            placeholder: "Select Concepts...",
        }).dxTagBox("instance");

        DesignMasterView.variables.dx_txtRefCode = $("#dx_txtRefCode").dxTextBox().dxTextBox("instance");

        DesignMasterView.variables.dx_SwitchIsActive = $("#dx_SwitchIsActive").dxSwitch({
            value: true,
            switchedOnText: "Yes",
            switchedOffText: "No"
        }).dxSwitch("instance");

        DesignMasterView.variables.dx_SwitchMaster = $("#dx_SwitchMaster").dxSwitch({
            value: false,
            switchedOnText: "Yes",
            switchedOffText: "No"
        }).dxSwitch("instance");

        DesignMasterView.variables.dx_SwitchSampleLinePcs = $("#dx_SwitchSampleLinePcs").dxSwitch({
            value: false,
            switchedOnText: "Yes",
            switchedOffText: "No"
        }).dxSwitch("instance");

        DesignMasterView.variables.dx_SwitchDisWebB2B = $("#dx_SwitchDisWebB2B").dxSwitch({
            value: false,
            switchedOnText: "Yes",
            switchedOffText: "No"
        }).dxSwitch("instance");

        DesignMasterView.variables.dx_SwitchDisWebB2C = $("#dx_SwitchDisWebB2C").dxSwitch({
            value: false,
            switchedOnText: "Yes",
            switchedOffText: "No"
        }).dxSwitch("instance");

        DesignMasterView.variables.dx_SwitchDisAppB2B = $("#dx_SwitchDisAppB2B").dxSwitch({
            value: false,
            switchedOnText: "Yes",
            switchedOffText: "No"
        }).dxSwitch("instance");

        DesignMasterView.variables.dx_SwitchDisAppB2C = $("#dx_SwitchDisAppB2C").dxSwitch({
            value: false,
            switchedOnText: "Yes",
            switchedOffText: "No"
        }).dxSwitch("instance");

        DesignMasterView.variables.dx_SwitchDisOutlet = $("#dx_SwitchDisOutlet").dxSwitch({
            value: false,
            switchedOnText: "Yes",
            switchedOffText: "No"
        }).dxSwitch("instance");

        DesignMasterView.variables.dx_txtDiaPcs = $("#dx_txtDiaPcs").dxTextBox({
            readOnly: true,
            value: 0,
        }).dxTextBox("instance");

        DesignMasterView.variables.dx_txtDiaCrt = $("#dx_txtDiaCrt").dxTextBox({
            readOnly: true,
            value: 0,
        }).dxTextBox("instance");

        DesignMasterView.variables.dx_txtNetWgt = $("#dx_txtNetWgt").dxTextBox({
            readOnly: true,
            value: 0,
        }).dxTextBox("instance");

        DesignMasterView.variables.dx_txtGrossWgt = $("#dx_txtGrossWgt").dxTextBox({
            readOnly: true,
            value: 0,
        }).dxTextBox("instance");

        DesignMasterView.variables.dx_txtFineWgt = $("#dx_txtFineWgt").dxTextBox({
            readOnly: true,
            value: 0,
        }).dxTextBox("instance");

        DesignMasterView.variables.dx_txtNotes = $("#dx_txtNotes").dxTextArea({
            height: 110
        }).dxTextArea("instance");

        DesignMasterView.variables.dx_txtKeywords = $("#dx_txtKeywords").dxTextBox({
            placeholder: "Enter Keywords here..."
        }).dxTextBox("instance");

        DesignMasterView.variables.dx_txtRelatedProduct = $("#dx_txtRelatedProduct").dxTagBox({
            placeholder: "Select Related Products...",
            searchEnabled: true,
            dataSource: new DevExpress.data.CustomStore({
                load: function (loadOptions) {
                    var deferred = $.Deferred();

                    var myfilter = { rules: [] };
                    myfilter.rules.push({ field: "SEARCH", op: "eq", data: loadOptions.searchValue });

                    var result;
                    $.ajax({
                        url: getDomain() + DesignMasterView.variables.BindGroupListUrl + "&myfilters=" + JSON.stringify(myfilter),
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
                key: "dm_id"
            }),
            valueExpr: "designcode",
            displayExpr: "designcode",
        }).dxTagBox("instance");

        DesignMasterView.variables.dx_btnSubmit = $("#dx_btnSubmit").dxButton({
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

                DesignMasterView.btnMasterSubmit();

                //e.validationGroup.reset();
            }
        }).dxButton("instance");

        DesignMasterView.variables.dx_btnCancel = $("#dx_btnCancel").dxButton({
            icon: "close",
            text: "Cancel",
            type: "danger",
            onClick: function (e) {
                DesignMasterView.clearControls();
                e.validationGroup.reset();
            }
        }).dxButton("instance");

        DesignMasterView.variables.dx_btnAddNew = $("#dx_btnAddNew").dxButton({
            stylingMode: "outlined",
            icon: "plus",
            text: "Add New",
            type: "default",
            onClick: function (e) {
                e.validationGroup.reset();

                DesignMasterView.AddNewLineDetails();

                $("#frm_DesignMaster").show();
                $("#panel_DesignMasterList").hide();

                DesignMasterView.variables.dx_ddlCategory.focus();
            }
        }).dxButton("instance");
    },

    //GetCategoryList: function () {
    //    var myfilter = { rules: [] };
    //    myfilter.rules.push({ field: "TYPE", op: "eq", data: "DesgCate" });

    //    $.ajax({
    //        url: getDomain() + DesignMasterView.variables.BindStaticDataUrl + "&myfilters=" + JSON.stringify(myfilter),
    //        async: true,
    //        cache: false,
    //        type: 'POST',
    //        success: function (data) {
    //            if ($(data).find('RESPONSECODE').text() == "0") {   
    //                var JsonObject = xml2json.parser(data);
    //                if (JsonObject.serviceresponse.detailslist) {
    //                    DesignMasterView.variables.dx_ddlCategory.option({
    //                        dataSource: new DevExpress.data.ArrayStore({
    //                            data: JsonObject.serviceresponse.detailslist.details,
    //                            key: "desgcateid"
    //                        }),
    //                        displayExpr: "desgcate",
    //                        valueExpr: "desgcateid",
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

    GetItemCategory: function () {
        var myfilter = { rules: [] };
        myfilter.rules.push({ field: "RMSUBCATE", op: "eq", data: "FINISHED" });

        $.ajax({
            url: getDomain() + DesignMasterView.variables.BindItemCateUrl + "&myfilters=" + JSON.stringify(myfilter),
            async: true,
            cache: false,
            type: 'POST',
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    var JsonObject = xml2json.parser(data);
                    if (JsonObject.serviceresponse.detailslist) {
                        DesignMasterView.variables.dx_txtItemCate.option({
                            dataSource: new DevExpress.data.ArrayStore({
                                data: JsonObject.serviceresponse.detailslist.details,
                                key: "itemid"
                            }),
                            displayExpr: "itemname",
                            valueExpr: "itemid",
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

    GetSubCategoryList: function (CatId) {
        var myfilter = { rules: [] };
        myfilter.rules.push({ field: "DESGCATID", op: "eq", data: CatId });
        myfilter.rules.push({ field: "TYPE", op: "eq", data: "DesgSubcate" });

        $.ajax({
            url: getDomain() + DesignMasterView.variables.BindStaticDataUrl + "&myfilters=" + JSON.stringify(myfilter),
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

                        DesignMasterView.variables.dx_ddlSubCategory.option({
                            dataSource: new DevExpress.data.ArrayStore({
                                data: List,
                                key: "desgsubcateid"
                            }),
                            displayExpr: "desgsubcate",
                            valueExpr: "desgsubcateid",
                            value: DesignMasterView.variables.EditDataList.desgsubcateid,
                        });

                    }
                    else {
                        DesignMasterView.variables.dx_ddlSubCategory.option({
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

    //GetLabourTypeList: function () {
    //    var myfilter = { rules: [] };
    //    myfilter.rules.push({ field: "TYPE", op: "eq", data: "LabourType" });

    //    $.ajax({
    //        url: getDomain() + DesignMasterView.variables.BindStaticDataUrl + "&myfilters=" + JSON.stringify(myfilter),
    //        async: true,
    //        cache: false,
    //        type: 'POST',
    //        success: function (data) {
    //            if ($(data).find('RESPONSECODE').text() == "0") {
    //                var JsonObject = xml2json.parser(data);
    //                if (JsonObject.serviceresponse.detailslist) {
    //                    DesignMasterView.variables.dx_ddlLbrType.option({
    //                        dataSource: new DevExpress.data.ArrayStore({
    //                            data: JsonObject.serviceresponse.detailslist.details,
    //                            key: "labourtypeid"
    //                        }),
    //                        displayExpr: "labourtype",
    //                        valueExpr: "labourtypeid",
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

    GetSettingTypeList: function (CatId) {
        var myfilter = { rules: [] };
        myfilter.rules.push({ field: "DESGCATID", op: "eq", data: CatId });
        myfilter.rules.push({ field: "TYPE", op: "eq", data: "SettingType" });

        $.ajax({
            url: getDomain() + DesignMasterView.variables.BindStaticDataUrl + "&myfilters=" + JSON.stringify(myfilter),
            async: false,
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

                        DesignMasterView.variables.dx_ddlSettingType.option({
                            dataSource: new DevExpress.data.ArrayStore({
                                data: List,
                                key: "settingtypeid"
                            }),
                            displayExpr: "settingtypename",
                            valueExpr: "settingtypeid",
                        });

                        if (DesignMasterView.variables.EditDataList.settingtype)
                            DesignMasterView.variables.dx_ddlSettingType.option({ value: (DesignMasterView.variables.EditDataList.settingtype.toString()).split(",").map(Number) });

                    }
                    else {
                        DesignMasterView.variables.dx_ddlSettingType.option({
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

    GetJewSizeList: function (CatId) {
        var myfilter = { rules: [] };
        myfilter.rules.push({ field: "DESGCATID", op: "eq", data: CatId });
        myfilter.rules.push({ field: "TYPE", op: "eq", data: "JewellerySize" });

        $.ajax({
            url: getDomain() + DesignMasterView.variables.BindStaticDataUrl + "&myfilters=" + JSON.stringify(myfilter),
            async: true,
            cache: false,
            type: 'POST',
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    var JsonObject = xml2json.parser(data);
                    if (JsonObject.serviceresponse.detailslist) {
                        DesignMasterView.variables.dx_ddlSize.option({
                            dataSource: new DevExpress.data.ArrayStore({
                                data: JsonObject.serviceresponse.detailslist.details,
                                key: "size"
                            }),
                            displayExpr: "size",
                            valueExpr: "size",
                            value: DesignMasterView.variables.EditDataList.goodssize
                        });
                    }
                    else {
                        DesignMasterView.variables.dx_ddlSize.option({
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

    //GetConceptOfList: function () {
    //    var myfilter = { rules: [] };
    //    myfilter.rules.push({ field: "TYPE", op: "eq", data: "ConceptOf" });

    //    $.ajax({
    //        url: getDomain() + DesignMasterView.variables.BindStaticDataUrl + "&myfilters=" + JSON.stringify(myfilter),
    //        async: true,
    //        cache: false,
    //        type: 'POST',
    //        success: function (data) {
    //            if ($(data).find('RESPONSECODE').text() == "0") {
    //                var JsonObject = xml2json.parser(data);
    //                if (JsonObject.serviceresponse.detailslist) {
    //                    DesignMasterView.variables.dx_ddlConceptOf.option({
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

    //GetRmCodeList: function () {
    //    var myfilter = { rules: [] };
    //    myfilter.rules.push({ field: "TYPE", op: "eq", data: "RmCode" });
    //    myfilter.rules.push({ field: "USESALEPUR", op: "eq", data: true });
    //    $.ajax({
    //        url: getDomain() + DesignMasterView.variables.BindStaticDataUrl + "&myfilters=" + JSON.stringify(myfilter),
    //        async: true,
    //        cache: false,
    //        type: 'POST',
    //        success: function (data) {
    //            if ($(data).find('RESPONSECODE').text() == "0") {
    //                var JsonObject = xml2json.parser(data);
    //                if (JsonObject.serviceresponse.detailslist) {
    //                    if (JsonObject.serviceresponse.detailslist.details.length) {
    //                        DesignMasterView.variables.RmCodeList = JsonObject.serviceresponse.detailslist.details;
    //                    }
    //                    else {
    //                        DesignMasterView.variables.RmCodeList.push(JsonObject.serviceresponse.detailslist.details);
    //                    }
    //                }
    //            }
    //            else {
    //                DevExVariables.InvalidResponseCode(data);
    //            }
    //        },
    //        error: OnError
    //    });
    //},

    //GetRmShapeList: function () {
    //    var myfilter = { rules: [] };
    //    myfilter.rules.push({ field: "TYPE", op: "eq", data: "shape" });

    //    $.ajax({
    //        url: getDomain() + DesignMasterView.variables.BindStaticDataUrl + "&myfilters=" + JSON.stringify(myfilter),
    //        async: false,
    //        cache: false,
    //        type: 'POST',
    //        success: function (data) {
    //            if ($(data).find('RESPONSECODE').text() == "0") {
    //                var JsonObject = xml2json.parser(data);
    //                if (JsonObject.serviceresponse.detailslist) {
    //                    if (JsonObject.serviceresponse.detailslist.details.length) {
    //                        DesignMasterView.variables.RmShapeList = JsonObject.serviceresponse.detailslist.details;
    //                    }
    //                    else {
    //                        DesignMasterView.variables.RmShapeList.push(JsonObject.serviceresponse.detailslist.details);
    //                    }
    //                }
    //            }
    //            else {
    //                DevExVariables.InvalidResponseCode(data);
    //            }
    //        },
    //        error: OnError
    //    });
    //},

    BindRmShape: function (postfix) {
        var List = DesignMasterView.variables.RmShapeList.filter(function (x) {
            return x.rmcateid == DesignMasterView.variables.DetailsControlsList[postfix].dx_txtItemName.option().selectedItem.rmcateid;
                //&& x.rmsubcateid == DesignMasterView.variables.DetailsControlsList[postfix].dx_txtItemName.option().selectedItem.rmsubcateid;
        });
        DesignMasterView.variables.DetailsControlsList[postfix].dx_ddlShape.option({
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

    //GetRmPurityList: function () {
    //    var myfilter = { rules: [] };
    //    myfilter.rules.push({ field: "TYPE", op: "eq", data: "Purity" });
    //    myfilter.rules.push({ field: "ISUSEINJEWELLERY", op: "eq", data: true });

    //    $.ajax({
    //        url: getDomain() + DesignMasterView.variables.BindStaticDataUrl + "&myfilters=" + JSON.stringify(myfilter),
    //        async: false,
    //        cache: false,
    //        type: 'POST',
    //        success: function (data) {
    //            if ($(data).find('RESPONSECODE').text() == "0") {
    //                var JsonObject = xml2json.parser(data);
    //                if (JsonObject.serviceresponse.detailslist) {
    //                    if (JsonObject.serviceresponse.detailslist.details.length) {
    //                        DesignMasterView.variables.RmPurityList = JsonObject.serviceresponse.detailslist.details;
    //                    }
    //                    else {
    //                        DesignMasterView.variables.RmPurityList.push(JsonObject.serviceresponse.detailslist.details);
    //                    }
    //                }
    //            }
    //            else {
    //                DevExVariables.InvalidResponseCode(data);
    //            }
    //        },
    //        error: OnError
    //    });
    //},

    BindRmPurity: function (postfix) {
        var List = DesignMasterView.variables.RmPurityList.filter(function (x) {
            return x.rmcateid == DesignMasterView.variables.DetailsControlsList[postfix].dx_txtItemName.option().selectedItem.rmcateid
                && x.rmsubcateid == DesignMasterView.variables.DetailsControlsList[postfix].dx_txtItemName.option().selectedItem.rmsubcateid;
        });
        DesignMasterView.variables.DetailsControlsList[postfix].dx_ddlQuality.option({
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

    //GetRmColorList: function () {
    //    var myfilter = { rules: [] };
    //    myfilter.rules.push({ field: "TYPE", op: "eq", data: "Colour" });
    //    myfilter.rules.push({ field: "ISUSEINJEWELLERY", op: "eq", data: true });

    //    $.ajax({
    //        url: getDomain() + DesignMasterView.variables.BindStaticDataUrl + "&myfilters=" + JSON.stringify(myfilter),
    //        async: false,
    //        cache: false,
    //        type: 'POST',
    //        success: function (data) {
    //            if ($(data).find('RESPONSECODE').text() == "0") {
    //                var JsonObject = xml2json.parser(data);
    //                if (JsonObject.serviceresponse.detailslist) {
    //                    if (JsonObject.serviceresponse.detailslist.details.length) {
    //                        DesignMasterView.variables.RmColorList = JsonObject.serviceresponse.detailslist.details;
    //                    }
    //                    else {
    //                        DesignMasterView.variables.RmColorList.push(JsonObject.serviceresponse.detailslist.details);
    //                    }
    //                }
    //            }
    //            else {
    //                DevExVariables.InvalidResponseCode(data);
    //            }
    //        },
    //        error: OnError
    //    });
    //},

    BindRmColor: function (postfix) {
        var List = DesignMasterView.variables.RmColorList.filter(function (x) {
            return x.rmcateid == DesignMasterView.variables.DetailsControlsList[postfix].dx_txtItemName.option().selectedItem.rmcateid
                && x.rmsubcateid == DesignMasterView.variables.DetailsControlsList[postfix].dx_txtItemName.option().selectedItem.rmsubcateid;
        });
        DesignMasterView.variables.DetailsControlsList[postfix].dx_ddlColor.option({
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

    GetCharniAutoSelected: function (postfix) {
        if (DesignMasterView.variables.DetailsControlsList[postfix].dx_ddlShape.option().selectedItem) {
            var myfilter = { rules: [] };
            myfilter.rules.push({ field: "RMSHAPEID", op: "eq", data: DesignMasterView.variables.DetailsControlsList[postfix].dx_ddlShape.option().selectedItem.shapeid });
            myfilter.rules.push({ field: "TYPE", op: "eq", data: "Charni" });

            if (DesignMasterView.variables.DetailsControlsList[postfix].dx_txtLength.option().value && DesignMasterView.variables.DetailsControlsList[postfix].dx_ddlShape.option().text != "RBC")
                myfilter.rules.push({ field: "LENGTH", op: "eq", data: DesignMasterView.variables.DetailsControlsList[postfix].dx_txtLength.option().value });
            if (DesignMasterView.variables.DetailsControlsList[postfix].dx_txtWidth.option().value)
                myfilter.rules.push({ field: "WIDTH", op: "eq", data: DesignMasterView.variables.DetailsControlsList[postfix].dx_txtWidth.option().value });

            $.ajax({
                url: getDomain() + DesignMasterView.variables.BindStaticDataUrl + "&myfilters=" + JSON.stringify(myfilter),
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

                            DesignMasterView.variables.DetailsControlsList[postfix].dx_txtCharni.option({
                                items: list,
                                selectedItem: list[0],
                                value: list[0].charni
                            });
                        }
                        else {
                            DesignMasterView.variables.DetailsControlsList[postfix].dx_txtCharni.option({
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

    AddNewLineDetails: function (obj) {
        var postfix = DesignMasterView.variables.RowCount;

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
                    + '<td class="text-center">'
                        + '<span class="btn btn-danger" onClick="DesignMasterView.RemoveDetailRow(this)"><i class="fa fa-trash-o"></i></span>'
                    + '</td>'
                + '</tr>'
            );

        /*----------------------Registration of Detail table controls---------------------*/
        DesignMasterView.DetailTableFormInit(postfix, obj);
        /*----------------------Registration of Detail table controls---------------------*/

        DesignMasterView.variables.RowCount = postfix + 1;
    },

    DetailTableFormInit: function (postfix, obj) {
        /*----------------------Registration of Detail table controls---------------------*/
        var tmp = [];
        tmp[postfix] = { dx_txtItemName: "", dx_ddlShape: "", dx_ddlQuality: "", dx_ddlColor: "", dx_txtCharni: "", dx_txtLength: "", dx_txtWidth: "", dx_txtPieces: "", dx_txtWeight: "" };

        DesignMasterView.variables.DetailsControlsList = Object.assign(DesignMasterView.variables.DetailsControlsList, tmp);

        DesignMasterView.variables.DetailsControlsList[postfix].dx_txtItemName = $("#dx_txtItemName" + postfix).dxAutocomplete({
            dataSource: DesignMasterView.variables.RmCodeList.filter(function (x) { return x.rmgroup == 'METAL' || x.rmgroup == 'MATERIAL' }),
            placeholder: "Type RM Code...",
            valueExpr: "rmcode",
            onSelectionChanged: function (data) {
                if (data.selectedItem) {
                    if (data.selectedItem.rmgroup == "METAL") {
                        DesignMasterView.variables.DetailsControlsList[postfix].dx_ddlShape.option({
                            dataSource: [{ shapeid: data.selectedItem.shapeid, shape: data.selectedItem.shape || "--" }],
                            displayExpr: "shape",
                            valueExpr: "shapeid",
                            value: data.selectedItem.shapeid,
                            disabled: true,
                        });
                        DesignMasterView.variables.DetailsControlsList[postfix].dx_ddlQuality.option({
                            dataSource: [{ purityid: data.selectedItem.purityid, purity: data.selectedItem.purity || "--" }],
                            displayExpr: "purity",
                            valueExpr: "purityid",
                            value: data.selectedItem.purityid,
                            disabled: true,
                        });
                        //DesignMasterView.variables.DetailsControlsList[postfix].dx_ddlColor.option({
                        //    dataSource: [{ colourid: data.selectedItem.colourid, colour: data.selectedItem.colour || "--" }],
                        //    displayExpr: "colour",
                        //    valueExpr: "colourid",
                        //    value: data.selectedItem.colourid,
                        //    disabled: true,
                        //});
                        DesignMasterView.BindRmColor(postfix);
                        DesignMasterView.variables.DetailsControlsList[postfix].dx_ddlColor.option({ value: data.selectedItem.colourid });

                        DesignMasterView.variables.DetailsControlsList[postfix].dx_txtLength.option({ value: "", disabled: true });
                        DesignMasterView.variables.DetailsControlsList[postfix].dx_txtWidth.option({ value: "", disabled: true });
                        DesignMasterView.variables.DetailsControlsList[postfix].dx_txtPieces.option({ value: "", disabled: false });
                        DesignMasterView.variables.DetailsControlsList[postfix].dx_txtWeight.option({ value: "", disabled: false });
                        DesignMasterView.variables.DetailsControlsList[postfix].dx_txtCharni.option({ value: "", disabled: true });
                    }
                    else {
                        DesignMasterView.BindRmShape(postfix);
                        DesignMasterView.variables.DetailsControlsList[postfix].dx_ddlShape.option({ value: data.selectedItem.shapeid });
                        DesignMasterView.BindRmPurity(postfix);
                        DesignMasterView.variables.DetailsControlsList[postfix].dx_ddlQuality.option({ value: data.selectedItem.purityid });
                        DesignMasterView.BindRmColor(postfix);
                        DesignMasterView.variables.DetailsControlsList[postfix].dx_ddlColor.option({ value: data.selectedItem.colourid });

                        if (data.selectedItem.rmgroup == "MATERIAL") {
                            DesignMasterView.variables.DetailsControlsList[postfix].dx_txtPieces.option({ disabled: false });
                            DesignMasterView.variables.DetailsControlsList[postfix].dx_txtWeight.option({ disabled: false });
                            DesignMasterView.variables.DetailsControlsList[postfix].dx_txtCharni.option({ disabled: false });

                            if (DesignMasterView.variables.DetailsControlsList[postfix].dx_ddlShape.option().selectedItem) {
                                var ShapeName = DesignMasterView.variables.DetailsControlsList[postfix].dx_ddlShape.option().selectedItem.shape;
                                if (ShapeName == "RBC") {
                                    DesignMasterView.variables.DetailsControlsList[postfix].dx_txtLength.option({ disabled: true, value: "" });
                                    DesignMasterView.variables.DetailsControlsList[postfix].dx_txtWidth.option({ disabled: false });
                                }
                                else if (ShapeName == "PRINCESS") {
                                    DesignMasterView.variables.DetailsControlsList[postfix].dx_txtLength.option({ disabled: false });
                                    DesignMasterView.variables.DetailsControlsList[postfix].dx_txtWidth.option({ disabled: true });
                                }
                                else {
                                    DesignMasterView.variables.DetailsControlsList[postfix].dx_txtLength.option({ disabled: false });
                                    DesignMasterView.variables.DetailsControlsList[postfix].dx_txtWidth.option({ disabled: false });
                                }
                            }
                            else {
                                DesignMasterView.variables.DetailsControlsList[postfix].dx_txtLength.option({ disabled: false });
                                DesignMasterView.variables.DetailsControlsList[postfix].dx_txtWidth.option({ disabled: false });
                            }
                        }
                        else {
                            DesignMasterView.variables.DetailsControlsList[postfix].dx_txtLength.option({ value: "", disabled: true });
                            DesignMasterView.variables.DetailsControlsList[postfix].dx_txtWidth.option({ value: "", disabled: true });
                            DesignMasterView.variables.DetailsControlsList[postfix].dx_txtPieces.option({ value: "", disabled: true });
                            DesignMasterView.variables.DetailsControlsList[postfix].dx_txtCharni.option({ value: "", disabled: true });
                            DesignMasterView.variables.DetailsControlsList[postfix].dx_txtWeight.option({ value: "", disabled: true });
                        }
                    }
                }
                else {
                    DesignMasterView.variables.DetailsControlsList[postfix].dx_txtItemName.option("value", "");
                    DesignMasterView.variables.DetailsControlsList[postfix].dx_ddlShape.option({
                        dataSource: new DevExpress.data.ArrayStore({ data: [] })
                    });
                    DesignMasterView.variables.DetailsControlsList[postfix].dx_ddlQuality.option({
                        dataSource: new DevExpress.data.ArrayStore({ data: [] })
                    });
                    DesignMasterView.variables.DetailsControlsList[postfix].dx_ddlColor.option({
                        dataSource: new DevExpress.data.ArrayStore({ data: [] })
                    });

                    DesignMasterView.variables.DetailsControlsList[postfix].dx_txtItemName.focus();
                }
            },
            onFocusOut: function (data) {
                if (!data.component.option().selectedItem) {
                    DesignMasterView.variables.DetailsControlsList[postfix].dx_txtItemName.option("value", "");
                    DesignMasterView.variables.DetailsControlsList[postfix].dx_ddlShape.option({
                        dataSource: new DevExpress.data.ArrayStore({ data: [] })
                    });
                    DesignMasterView.variables.DetailsControlsList[postfix].dx_ddlQuality.option({
                        dataSource: new DevExpress.data.ArrayStore({ data: [] })
                    });
                    DesignMasterView.variables.DetailsControlsList[postfix].dx_ddlColor.option({
                        dataSource: new DevExpress.data.ArrayStore({ data: [] })
                    });

                    DesignMasterView.variables.DetailsControlsList[postfix].dx_txtItemName.focus();
                }
            }
        }).dxValidator({
            validationRules: [{
                type: "required",
                message: "Rm Code is required"
            }]
        }).dxAutocomplete("instance");

        DesignMasterView.variables.DetailsControlsList[postfix].dx_ddlShape = $("#dx_ddlShape" + postfix).dxSelectBox({
            placeholder: "Select Shape...",
            searchEnabled: true,
            onValueChanged: function (data) {
                DesignMasterView.variables.DetailsControlsList[postfix].dx_txtCharni.option({ value: "" });
                if (data.component.option().selectedItem) {
                    var ShapeName = data.component.option().selectedItem.shape;
                    if (ShapeName == "RBC") {
                        DesignMasterView.variables.DetailsControlsList[postfix].dx_txtLength.option({ disabled: true });
                        DesignMasterView.variables.DetailsControlsList[postfix].dx_txtWidth.option({ disabled: false });
                    }
                        //else if (ShapeName == "PRINCESS") {
                        //    DesignMasterView.variables.DetailsControlsList[postfix].dx_txtLength.option({ disabled: false });
                        //    DesignMasterView.variables.DetailsControlsList[postfix].dx_txtWidth.option({ disabled: true });
                        //}
                    else {
                        DesignMasterView.variables.DetailsControlsList[postfix].dx_txtLength.option({ disabled: false });
                        DesignMasterView.variables.DetailsControlsList[postfix].dx_txtWidth.option({ disabled: false });
                    }
                }

            },
            onFocusOut: function (data) {
                if (!data.component.option().selectedItem) {
                    DesignMasterView.variables.DetailsControlsList[postfix].dx_ddlShape.focus();
                }
                else {
                    DesignMasterView.CalcTotalWgts();
                }
            }
        }).dxValidator({
            validationRules: [{
                type: "required",
                message: "Shape is required"
            }]
        }).dxSelectBox("instance");

        DesignMasterView.variables.DetailsControlsList[postfix].dx_ddlQuality = $("#dx_ddlQuality" + postfix).dxSelectBox({
            placeholder: "Select Quality...",
            searchEnabled: true,
            onFocusOut: function (data) {
                if (!data.component.option().selectedItem) {
                    DesignMasterView.variables.DetailsControlsList[postfix].dx_ddlQuality.focus();
                }
                else {
                    DesignMasterView.CalcTotalWgts();
                }
            }
        }).dxValidator({
            validationRules: [{
                type: "required",
                message: "Quality is required"
            }]
        }).dxSelectBox("instance");

        DesignMasterView.variables.DetailsControlsList[postfix].dx_ddlColor = $("#dx_ddlColor" + postfix).dxSelectBox({
            placeholder: "Select Color...",
            searchEnabled: true,
            onFocusOut: function (data) {
                if (!data.component.option().selectedItem) {
                    DesignMasterView.variables.DetailsControlsList[postfix].dx_ddlColor.focus();
                }
                else {
                    DesignMasterView.CalcTotalWgts();
                }
            }
        }).dxValidator({
            validationRules: [{
                type: "required",
                message: "Color is required"
            }]
        }).dxSelectBox("instance");

        DesignMasterView.variables.DetailsControlsList[postfix].dx_txtCharni = $("#dx_txtCharni" + postfix).dxAutocomplete({
            dataSource: new DevExpress.data.CustomStore({
                load: function (loadOptions) {
                    var deferred = $.Deferred();

                    if (DesignMasterView.variables.DetailsControlsList[postfix].dx_ddlShape.option().selectedItem) {
                        var myfilter = { rules: [] };
                        myfilter.rules.push({ field: "RMSHAPEID", op: "eq", data: DesignMasterView.variables.DetailsControlsList[postfix].dx_ddlShape.option().selectedItem.shapeid });
                        myfilter.rules.push({ field: "SEARCH", op: "eq", data: loadOptions.searchValue });
                        myfilter.rules.push({ field: "TYPE", op: "eq", data: "Charni" });

                        if (DesignMasterView.variables.DetailsControlsList[postfix].dx_txtLength.option().value && DesignMasterView.variables.DetailsControlsList[postfix].dx_ddlShape.option().text != "RBC")
                            myfilter.rules.push({ field: "LENGTH", op: "eq", data: DesignMasterView.variables.DetailsControlsList[postfix].dx_txtLength.option().value });
                        if (DesignMasterView.variables.DetailsControlsList[postfix].dx_txtWidth.option().value)
                            myfilter.rules.push({ field: "WIDTH", op: "eq", data: DesignMasterView.variables.DetailsControlsList[postfix].dx_txtWidth.option().value });

                        var result;
                        $.ajax({
                            url: getDomain() + DesignMasterView.variables.BindStaticDataUrl + "&myfilters=" + JSON.stringify(myfilter),
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
            onItemClick: function (e) {
                if (e.component.option().selectedItem) {
                    if (e.component.option().selectedItem) {
                        DesignMasterView.variables.DetailsControlsList[postfix].dx_txtCharni.option().selectedItem.charniid;
                        if (DesignMasterView.variables.DetailsControlsList[postfix].dx_txtLength.option().value == "")
                            DesignMasterView.variables.DetailsControlsList[postfix].dx_txtLength.option({ value: e.component.option().selectedItem.lenght });

                        if (DesignMasterView.variables.DetailsControlsList[postfix].dx_txtWidth.option().value == "")
                        DesignMasterView.variables.DetailsControlsList[postfix].dx_txtWidth.option({ value: e.component.option().selectedItem.width });
                    }
                    else {
                        DesignMasterView.variables.DetailsControlsList[postfix].dx_txtCharni = "";
                        DesignMasterView.variables.DetailsControlsList[postfix].dx_txtLength.option("value", "");
                        DesignMasterView.variables.DetailsControlsList[postfix].dx_txtWidth.option("value", "");
                    }
                }
            },
            valueExpr: "charni",
            placeholder: "Type Charni...",
            value: "",
           
            onSelectionChanged: function (data) {
                if (data.selectedItem) {

                    var pcs = DesignMasterView.variables.DetailsControlsList[postfix].dx_txtPieces.option().value || 1;
                    //var ShapeName = DesignMasterView.variables.DetailsControlsList[postfix].dx_ddlShape.option().text;

                    DesignMasterView.variables.DetailsControlsList[postfix].dx_txtWeight.option({ value: parseFloat(data.selectedItem.weight * pcs).toFixed(3) });

                    //if (!DesignMasterView.variables.DetailsControlsList[postfix].dx_txtLength.option().value && ShapeName != "RBC")
                    if (data.selectedItem.lenght)
                        DesignMasterView.variables.DetailsControlsList[postfix].dx_txtLength.option({ value: data.selectedItem.lenght });

                    //if (!DesignMasterView.variables.DetailsControlsList[postfix].dx_txtWidth.option().value)
                    if (data.selectedItem.width)
                        DesignMasterView.variables.DetailsControlsList[postfix].dx_txtWidth.option({ value: data.selectedItem.width });
                }
            },
            onFocusOut: function (data) {
                if (!data.component.option().selectedItem) {
                    DesignMasterView.variables.DetailsControlsList[postfix].dx_txtCharni.option("value", "");
                }
            }
        }).dxValidator({
            validationRules: [{
                type: "required",
                message: "Charni is required",
            }]
        }).dxAutocomplete("instance");

        DesignMasterView.variables.DetailsControlsList[postfix].dx_txtLength = $("#dx_txtLength" + postfix).dxTextBox({
            mode: "number",
            onKeyDown: function (e) {
                if (e.event.key == "-" || e.event.key == "+") {
                    e.event.preventDefault();
                }
            },
            onFocusOut: function (data) {
                var ShapeName = DesignMasterView.variables.DetailsControlsList[postfix].dx_ddlShape.option().text;
                if (ShapeName == "PRINCESS" && data.component.option().value) {
                    DesignMasterView.variables.DetailsControlsList[postfix].dx_txtWidth.option({ value: data.component.option().value });
                }
                if (data.component.option().value)
                    DesignMasterView.GetCharniAutoSelected(postfix);
            },
        }).dxValidator({
            validationRules: [{
                type: "required",
                message: "Length is required"
            }]
        }).dxTextBox("instance");

        DesignMasterView.variables.DetailsControlsList[postfix].dx_txtWidth = $("#dx_txtWidth" + postfix).dxTextBox({
            mode: "number",
            onKeyDown: function (e) {
                if (e.event.key == "-" || e.event.key == "+") {
                    e.event.preventDefault();
                }
            },
            onFocusOut: function (data) {
                var ShapeName = DesignMasterView.variables.DetailsControlsList[postfix].dx_ddlShape.option().text;
                if (ShapeName == "RBC") {
                    DesignMasterView.variables.DetailsControlsList[postfix].dx_txtLength.option({ value: data.component.option().value });
                }
                if (data.component.option().value)
                    DesignMasterView.GetCharniAutoSelected(postfix);
            },
        }).dxValidator({
            validationRules: [{
                type: "required",
                message: "Width is required"
            }]
        }).dxTextBox("instance");

        DesignMasterView.variables.DetailsControlsList[postfix].dx_txtPieces = $("#dx_txtPieces" + postfix).dxTextBox({
            mode: "number",
            min: 1,
            value: 1,
            onFocusOut: function (data) {
                if (DesignMasterView.variables.DetailsControlsList[postfix].dx_txtCharni.option().selectedItem
                        && DesignMasterView.variables.DetailsControlsList[postfix].dx_txtItemName.option().selectedItem.rmgroup == "MATERIAL") {
                    var wgt = DesignMasterView.variables.DetailsControlsList[postfix].dx_txtCharni.option().selectedItem.weight || 0;
                    DesignMasterView.variables.DetailsControlsList[postfix].dx_txtWeight.option({ value: parseFloat(wgt * (DesignMasterView.variables.DetailsControlsList[postfix].dx_txtPieces.option().value || 1)).toFixed(3) });
                }
                DesignMasterView.CalcTotalWgts();
            },
            onKeyDown: function (e) {
                if (e.event.key == "-" || e.event.key == "." || e.event.key == "+") {
                    e.event.preventDefault();
                }
            },
        }).dxValidator({
            validationRules: [{
                type: "required",
                message: "Pcs is required"
            }]
        }).dxTextBox("instance");

        DesignMasterView.variables.DetailsControlsList[postfix].dx_txtWeight = $("#dx_txtWeight" + postfix).dxTextBox({
            mode: "number",
            onFocusOut: function (data) {
                DesignMasterView.CalcTotalWgts();
            },
            onKeyDown: function (e) {
                if (((e.event.key == "Tab" || e.event.key == "Enter") && e.event.shiftKey == false) && e.element.closest("tr").is(":last-child"))
                    DesignMasterView.AddNewLineDetails();

                if (e.event.key == "-" || e.event.key == "+") {
                    e.event.preventDefault();
                }
            }
        }).dxValidator({
            validationRules: [{
                type: "required",
                message: "Weight is required"
            }]
        }).dxTextBox("instance");
        /*----------------------Registration of Detail table controls---------------------*/

        /*----------------------Set Value of Detail table controls while Edit---------------------*/
        if (obj) {
            DesignMasterView.variables.DetailsControlsList[postfix].dx_txtItemName.option({
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
                    colourid: obj.colorid,
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
                    colourid: obj.colorid,
                    colour: obj.colour,
                    purityper: obj.purityper,
                    melper: obj.melper
                },
                value: obj.rmcode
            });

            DesignMasterView.variables.DetailsControlsList[postfix].dx_ddlShape.option({
                selectedItem: { shapeid: obj.shapeid, shape: (obj.shape || "--") },
                value: obj.shapeid,
            });
            DesignMasterView.variables.DetailsControlsList[postfix].dx_ddlQuality.option({
                selectedItem: { purityid: obj.purityid, purity: obj.purity || "--" },
                value: obj.purityid,
            });
            DesignMasterView.variables.DetailsControlsList[postfix].dx_ddlColor.option({
                selectedItem: { colourid: obj.colorid, colour: obj.colour || "--" },
                value: obj.colorid,
            });
            DesignMasterView.variables.DetailsControlsList[postfix].dx_txtCharni.option({
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
            DesignMasterView.variables.DetailsControlsList[postfix].dx_txtLength.option({ value: obj.lenghtmmsize });
            DesignMasterView.variables.DetailsControlsList[postfix].dx_txtWidth.option({ value: obj.widthmmsize });
            DesignMasterView.variables.DetailsControlsList[postfix].dx_txtPieces.option({ value: obj.pieces });
            DesignMasterView.variables.DetailsControlsList[postfix].dx_txtWeight.option({ value: obj.weight });
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
            if (DesignMasterView.variables.DetailsControlsList[index].dx_txtItemName.option().selectedItem) {
                RmCate = DesignMasterView.variables.DetailsControlsList[index].dx_txtItemName.option().selectedItem.rmcate;

                if (RmCate == "GEMS") {
                    TotalDiaPcs += +DesignMasterView.variables.DetailsControlsList[index].dx_txtPieces.option().value;
                    TotalDiaCts += +DesignMasterView.variables.DetailsControlsList[index].dx_txtWeight.option().value;
                }

                if (RmCate == "METAL") {
                    touch = +DesignMasterView.variables.DetailsControlsList[index].dx_txtItemName.option().selectedItem.purityper;
                    TotalNetWgt += +DesignMasterView.variables.DetailsControlsList[index].dx_txtWeight.option().value;
                    TotalFineWgt += (+DesignMasterView.variables.DetailsControlsList[index].dx_txtWeight.option().value * touch / 100);
                }
            }
        });

        TotalGrossWgt = TotalNetWgt + (TotalDiaCts * 0.2);

        DesignMasterView.variables.dx_txtDiaPcs.option("value", TotalDiaPcs);
        DesignMasterView.variables.dx_txtDiaCrt.option("value", parseFloat(TotalDiaCts).toFixed(3));
        DesignMasterView.variables.dx_txtNetWgt.option("value", parseFloat(TotalNetWgt).toFixed(3));
        DesignMasterView.variables.dx_txtGrossWgt.option("value", parseFloat(TotalGrossWgt).toFixed(3));
        DesignMasterView.variables.dx_txtFineWgt.option("value", parseFloat(TotalFineWgt).toFixed(3));
    },

    getFileNameWithoutExt: function (file) {
        return file.split('.')[0];
    },

    deleteFile: function (obj, file) {
        $(obj).closest("tr").remove();
        delete DesignMasterView.variables.MultiImgControlsList[$(obj).closest("tr").attr("rowid")];

        DesignMasterView.variables.deletedFiles += file + ',';
    },

    MultiImgListControl: function (postfix, ImgTitle, ImgPath, obj) {
        /*----------------------Registration of Multi Img table controls---------------------*/
        var tmp = [];
        tmp[postfix] = { imgPath: "", dx_txtImgTitle: "", dx_ddlDesignView: "", dx_ddlDesignColor: "" };
        DesignMasterView.variables.MultiImgControlsList = Object.assign(DesignMasterView.variables.MultiImgControlsList, tmp);

        DesignMasterView.variables.MultiImgControlsList[postfix].imgPath = ImgPath;

        DesignMasterView.variables.MultiImgControlsList[postfix].dx_txtImgTitle = $("#dx_txtImgTitle" + postfix).dxTextBox({
            value: ImgTitle
        }).dxTextBox("instance");

        DesignMasterView.variables.MultiImgControlsList[postfix].dx_ddlDesignView = $("#dx_ddlDesignView" + postfix).dxSelectBox({
            dataSource: DesignMasterView.variables.ImgViewList,
            value: DesignMasterView.variables.ImgViewList[0],
            searchEnabled: true,
        }).dxSelectBox("instance");

        DesignMasterView.variables.MultiImgControlsList[postfix].dx_ddlDesignColor = $("#dx_ddlDesignColor" + postfix).dxSelectBox({
            dataSource: DesignMasterView.variables.ImgColorList,
            value: DesignMasterView.variables.ImgColorList[0],
            searchEnabled: true,
        }).dxSelectBox("instance");
        /*----------------------Registration of Multi Img table controls---------------------*/

        /*----------------------Set Value of Multi Img table controls while Edit---------------------*/
        if (obj) {
            DesignMasterView.variables.MultiImgControlsList[postfix].dx_ddlDesignView.option({ value: obj.designview.toString() });

            DesignMasterView.variables.MultiImgControlsList[postfix].dx_ddlDesignColor.option({ value: obj.designcolor });
        }
        /*----------------------Set Value of Multi Img table controls while Edit---------------------*/
    },

    registerSingleFileUpload: function (uploader) {
        $(uploader).fileupload({
            url: getDomain() + "/Helpers/Handler/FileUploadHandler.ashx",
            add: function (e, data) {

                var rowId = $($(this).find('input')).attr('id').substr(3);
                var displayLink = $('#' + rowId).find('.label-click');

                var ext = data.files[0].name.split('.')[1].toLowerCase();
                var accept = $(e.target).find('input').attr('accept');
                if (accept.indexOf(ext) > -1) {
                    $(displayLink).parent().append('<img width="16" height="16" src="' + getDomain() + '/Images/loader.gif">');
                    data.submit();
                }
                else {
                    notificationMessage('File Attachment', 'Please select only ' + accept + ' files', 'warning');
                }
            },
            success: function (response, status) {
                if (response == 'Maximum request length exceeded.') {
                    notificationMessage('File Attachment Error', response, 'error');
                    $(displayLink).siblings('img').remove();
                    return;
                }
                if (response.indexOf('error') >= 0) {
                    notificationMessage('File Attachment Error', response, 'error');
                    $(displayLink).siblings('img').remove();
                    return;
                }
                var rowId = $($(this)[0].fileInput).attr('id').substr(3);
                var displayFile = $(this)[0].files[0].name;
                var displayLink = $('#' + rowId).find('.label-click');

                if ($(displayLink).attr('href').length > 0 && $(displayLink).attr('href').indexOf('/Temp/') > -1) {
                    var strDeletedFile = $('#hdnDeletedBanner').val() + $(displayLink).attr('href') + ',';
                    $('#hdnDeletedBanner').val(strDeletedFile);
                }
                $(displayLink).attr('href', response);
                $(displayLink).html(displayFile);
                $(displayLink).siblings('img').remove();
            },
            error: function (xhr, errorType, exception) {
                notificationMessage('File Attachment Error', xhr.responseText, 'error');
                var rowId = $($(this).find('input')).attr('id').substr(3);
                var displayLink = $('#' + rowId).find('.label-click');
                $(displayLink).siblings('img').remove();
            }
        });
    },

    btnMasterSubmit: function () {
        DesignMasterView.variables.Oper = 'Add';
        DesignMasterView.variables.addedit = "added";

        if (DesignMasterView.variables.Masterid != "0" && parseInt(DesignMasterView.variables.Masterid) > 0) {
            DesignMasterView.variables.Oper = 'Edit';
            DesignMasterView.variables.addedit = 'updated';
        }

        DesignMasterView.variables.dx_btnSubmit.option({ disabled: true });

        var bannerImage = $('#ItemimgPreview').attr('src');
        if (bannerImage.indexOf('upimg.png') > -1)
            bannerImage = '';

        var saveFiles = "";
        if (bannerImage && bannerImage != $("#hdnMainImg").val()) {
            saveFiles += bannerImage + ',';
            DesignMasterView.variables.deletedFiles += $("#hdnMainImg").val() + ',';
        }
        var DetailsNodeList = DesignMasterView.makeDetailsXmlNodes();
        if (DetailsNodeList == false) {
            DevExVariables.Toaster("error", 'Please select gold type.');
            DesignMasterView.variables.dx_btnSubmit.option({ disabled: false });
            return;
        }
        var result = DesignMasterView.makeMultiImgXmlNodes();

        DetailsNodeList += result.xmlsaveFiles;
        saveFiles += result.saveFiles;

        var CADFilePath = $("#lnkCADFilePreview").attr("FileName");
        var DesignRawFilePath = $("#lnkDesigenRaw").attr("FileName");

        var data = {
            //"DESIGNERID": DesignMasterView.variables.dx_txtDesigner.option().selectedItem.accid,
            //"DESIGNEDONDATE": Date,

            "GOODSSIZE": DesignMasterView.variables.dx_ddlSize.option().value,
            "COLLECTIONID": DesignMasterView.variables.dx_txtCollName.option().value,
            "BRAND": DesignMasterView.variables.dx_txtBrand.option().value,
            "OCCASION": DesignMasterView.variables.dx_txtOccasion.option().value,
            "LENGTH": DesignMasterView.variables.dx_txtLength.option().value || 0,
            "WIDTH": DesignMasterView.variables.dx_txtWidth.option().value || 0,
            "HEIGHT": DesignMasterView.variables.dx_txtHeight.option().value || 0,
            //"MASTERHOLD": 0,
            "SETTINGTYPE": DesignMasterView.variables.dx_ddlSettingType.option().value.toString(),
            "DESGCATEID": DesignMasterView.variables.dx_ddlCategory.option().value,
            "DESGSUBCATEID": DesignMasterView.variables.dx_ddlSubCategory.option().value,
            "DIAPCS": DesignMasterView.variables.dx_txtDiaPcs.option().value || 0,
            "DIACTS": DesignMasterView.variables.dx_txtDiaCrt.option().value || 0,
            "NETWEIGHT": DesignMasterView.variables.dx_txtNetWgt.option().value || 0,
            "GROSSWEIGHT": DesignMasterView.variables.dx_txtGrossWgt.option().value || 0,
            "FINEWEIGHT": DesignMasterView.variables.dx_txtFineWgt.option().value || 0,
            "SAMPLELINEPCS": DesignMasterView.variables.dx_SwitchSampleLinePcs.option().value,
            "MOLD": DesignMasterView.variables.dx_SwitchMaster.option().value,
            "ISACTIVE": DesignMasterView.variables.dx_SwitchIsActive.option().value,
            "VISWEBB2B": DesignMasterView.variables.dx_SwitchDisWebB2B.option().value,
            "VISWEBB2C": DesignMasterView.variables.dx_SwitchDisWebB2C.option().value,
            "VISAPPB2B": DesignMasterView.variables.dx_SwitchDisAppB2B.option().value,
            "VISAPPB2C": DesignMasterView.variables.dx_SwitchDisAppB2C.option().value,
            "VISOUTLET": DesignMasterView.variables.dx_SwitchDisOutlet.option().value,
            "LABOURTYPEID": DesignMasterView.variables.dx_ddlLbrType.option().value,
            "HSNCODEID": DesignMasterView.variables.dx_txtItemCate.option().value,
            //"IMGACTUALNAME": $("#txtImgActualName").val(),
            "IMGVIRTUALNAME": bannerImage.substring(bannerImage.lastIndexOf("/") + 1),
            //"MFGNAME": $("#txtMfgName").val(),
            //"MFGCODE": $("#txtMfgCode").val(),
            "REFCODE": DesignMasterView.variables.dx_txtRefCode.option().value,
            "KEYWORD": DesignMasterView.variables.dx_txtKeywords.option().value,
            "CONSEPTOF": DesignMasterView.variables.dx_ddlConceptOf.option().value == "" ? "" : DesignMasterView.variables.dx_ddlConceptOf.option().value.join(),
            //"RELATEDDESIGNS": DesignMasterView.variables.dx_txtRelatedProduct.option().value.join(),
            //"MAXSOLD": $("#txtMaxSold").val(),
            "HISTORY": DesignMasterView.variables.dx_txtNotes.option().value,
            XMLPARAM: escape(DetailsNodeList),
            "oper": DesignMasterView.variables.Oper,
            "DM_ID": DesignMasterView.variables.Masterid
        }

        if ($("#lnkCADFilePreview").html()) {
            data.CADFILEACTUALNAME = $("#lnkCADFilePreview").html();
            data.CADFILEVIRTUALNAME = CADFilePath.substring(CADFilePath.lastIndexOf("/") + 1);
        }
        if ($("#lnkDesigenRaw").html()) {
            data.DESIGNRAWFILEACTUALNAME = $("#lnkDesigenRaw").html();
            data.DESIGNRAWFILEVIRTUALNAME = DesignRawFilePath.substring(DesignRawFilePath.lastIndexOf("/") + 1);
        }

        if (DesignMasterView.variables.dx_txtDesigner.option().selectedItem)
            data.DESIGNERID = DesignMasterView.variables.dx_txtDesigner.option().selectedItem.accid;

        var Date = "";
        if (DesignMasterView.variables.dx_txtDesignedDate.option().text) {
            Date = DesignMasterView.variables.dx_txtDesignedDate.option().text.split("/");
            Date = Date[2] + '-' + Date[1] + '-' + Date[0];
            data.DESIGNEDONDATE = Date;
        }

        if (DesignMasterView.variables.dx_txtRelatedProduct.option().value.length > 0)
            data.RELATEDDESIGNS = DesignMasterView.variables.dx_txtRelatedProduct.option().value.join();

        var CADFile = $("#lnkCADFilePreview").attr("FileName");

        if (CADFile && CADFile != $("#hdnOldCADFile").val()) {
            $.ajax({
                type: 'POST',
                async: false,
                cache: false,
                url: getDomain() + "/Common/SaveImageToPhysicalPath",
                data: {
                    PhysicalPath: getDesignImgPhysicalPath() + "/" + DesignMasterView.variables.dx_ddlCategory.option().text + '/' + DesignMasterView.variables.dx_ddlSubCategory.option().text + '/CAD/',
                    deletedfiles: $("#hdnOldCADFile").val(),
                    savefiles: CADFile
                },
                success: function (result) {
                },
                error: OnError
            });
        }

        var DesigenRawFile = $("#lnkDesigenRaw").attr("FileName");
        if (DesigenRawFile && DesigenRawFile != $("#hdnDesigenRaw").val()) {
            $.ajax({
                type: 'POST',
                async: false,
                cache: false,
                url: getDomain() + "/Common/SaveImageToPhysicalPath",
                data: {
                    PhysicalPath: getDesignImgPhysicalPath() + "/" + DesignMasterView.variables.dx_ddlCategory.option().text + '/' + DesignMasterView.variables.dx_ddlSubCategory.option().text + '/CAD/',
                    deletedfiles: $("#hdnDesigenRaw").val(),
                    savefiles: DesigenRawFile
                },
                success: function (result) {
                },
                error: OnError
            });
        }

        var tempImgPath = "";
        if(DesignMasterView.variables.Oper = 'Edit')
            tempImgPath = getDesignImgPhysicalPath() + "/" + DesignMasterView.variables.dx_ddlCategory.option().text + '/' + DesignMasterView.variables.dx_ddlSubCategory.option().text + "/"+ DesignMasterView.variables.dx_txtDesignCode.option().text+"/" ;
        else
            tempImgPath = getDesignImgPhysicalPath() + "/" + DesignMasterView.variables.dx_ddlCategory.option().text + '/' + DesignMasterView.variables.dx_ddlSubCategory.option().text + "/";

        $.ajax({
            type: 'POST',
            async: false,
            cache: false,
            url: getDomain() + "/Common/SaveImageWithThumb",
            data: {
                ImgPath: tempImgPath,
                deletedfiles: DesignMasterView.variables.deletedFiles,
                savefiles: saveFiles,
                width: 200,
                height: 200
            },   
            success: function (result) {
                DesignMasterView.savedata(data);
            },
            error: OnError
        });
    },

    savedata: function (data) {
        $.ajax({
            url: getDomain() + DesignMasterView.variables.PerformMasterOperationurl,
            data: data,
            async: true,
            cache: false,
            type: 'POST',
            beforeSend: function () {
                dx_LoaderTrinity.show();
            },
            success: DesignMasterView.btnMasterSubmitOnSuccess,
            complete: function () {
                dx_LoaderTrinity.hide();
            },
            error: OnError
        });
    },

    btnMasterSubmitOnSuccess: function (data) {
        if (DesignMasterView.variables.Oper != 'Delete')
            DesignMasterView.variables.dx_btnSubmit.option({ disabled: false });

        if ($(data).find('RESPONSECODE').text() == "0") {
            if (DesignMasterView.variables.Oper == 'Add' || DesignMasterView.variables.Oper == 'Edit') {
                DesignMasterView.variables.DesignCode = $(data).find('DESIGNCODE').text();
                $.ajax({
                    type: 'POST',
                    async: false,
                    cache: false,
                    url: getDomain() + "/Common/RenameDesignFiles",
                    data: {
                        ImgPath: getDesignImgPhysicalPath() + "/" + DesignMasterView.variables.dx_ddlCategory.option().text + '/' + DesignMasterView.variables.dx_ddlSubCategory.option().text + "/",
                        designcode: DesignMasterView.variables.DesignCode,
                        filenames: $(data).find('ALLIMAGELIST').text()
                    },
                    success: function (result) {
                        if (result == "success") {
                            DevExVariables.Toaster("success", 'Record is ' + DesignMasterView.variables.addedit + ' successfully');
                            DesignMasterView.clearControls();
                        }
                        else {
                            DevExVariables.Toaster("error", result);
                        }
                    },
                    error: OnError
                });

            }
            else if (DesignMasterView.variables.Oper == 'Delete') {
                var rowData = DesignMasterView.variables.dx_dataGrid.getVisibleRows()[DesignMasterView.variables.dx_dataGrid.getRowIndexByKey(+DesignMasterView.variables.Masterid)].data;
                var Cat = rowData.desgcate;
                var SubCate = rowData.desgsubcate;
                var DesignCode = rowData.designcode;

                DesignMasterView.variables.DesignCode = $(data).find('DESIGNCODE').text();
                $.ajax({
                    type: 'POST',
                    async: false,
                    cache: false,
                    url: getDomain() + "/Common/DeleteDesignCodeFolder",
                    data: {
                        DesignCodePath: getDesignImgPhysicalPath() + "/" + Cat + '/' + SubCate + "/" + DesignCode,
                    },
                    success: function (result) {
                        if (result == "Success") {
                            DevExVariables.Toaster("success", 'Record is ' + DesignMasterView.variables.addedit + ' successfully');
                            DesignMasterView.clearControls();
                        }
                        else {
                            DevExVariables.Toaster("error", result);
                        }
                    },
                    error: OnError
                });

            }
            else {
                DevExVariables.Toaster("success", 'Record is ' + DesignMasterView.variables.addedit + ' successfully');
                DesignMasterView.clearControls();
            }
        }
        else if ($(data).find('RESPONSECODE').text() == "-3") {
            DevExVariables.Toaster("warning", $(data).find('RESPONSEMESSAGE').text());
        }
        else {
            DevExVariables.InvalidResponseCode(data);
        }
    },

    clearControls: function () {
        DesignMasterView.variables.dx_txtDesigner.option("value", "");
        DesignMasterView.variables.dx_txtDesignedDate.option("value", "");
        DesignMasterView.variables.dx_txtDesignCode.option("value", "");
        DesignMasterView.variables.dx_txtCollName.option("value", "");
        DesignMasterView.variables.dx_txtBrand.option("value", "");
        DesignMasterView.variables.dx_txtOccasion.option("value", "");
        DesignMasterView.variables.dx_ddlSize.option("value", "");
        DesignMasterView.variables.dx_txtLength.option("value", 0);
        DesignMasterView.variables.dx_txtWidth.option("value", 0);
        DesignMasterView.variables.dx_txtHeight.option("value", 0);
        DesignMasterView.variables.dx_SwitchMaster.option("value", false);
        DesignMasterView.variables.dx_ddlCategory.option({
            readOnly: false,
            value: ""
        });
        DesignMasterView.variables.dx_ddlSubCategory.option({
            readOnly: false,
            value: ""
        });
        DesignMasterView.variables.dx_txtDiaPcs.option("value", 0);
        DesignMasterView.variables.dx_txtDiaCrt.option("value", 0);
        DesignMasterView.variables.dx_txtNetWgt.option("value", 0);
        DesignMasterView.variables.dx_txtGrossWgt.option("value", 0);
        DesignMasterView.variables.dx_txtFineWgt.option("value", 0);
        DesignMasterView.variables.dx_SwitchSampleLinePcs.option("value", false);
        DesignMasterView.variables.dx_SwitchIsActive.option("value", true);
        DesignMasterView.variables.dx_SwitchDisWebB2B.option("value", false);
        DesignMasterView.variables.dx_SwitchDisWebB2C.option("value", false);
        DesignMasterView.variables.dx_SwitchDisAppB2B.option("value", false);
        DesignMasterView.variables.dx_SwitchDisAppB2C.option("value", false);
        DesignMasterView.variables.dx_SwitchDisOutlet.option("value", false);
        DesignMasterView.variables.dx_ddlLbrType.option("value", "");
        DesignMasterView.variables.dx_txtItemCate.option("value", "");
        DesignMasterView.variables.dx_ddlSettingType.option({ value: [] });
        DesignMasterView.variables.dx_txtRefCode.option("value", "");
        DesignMasterView.variables.dx_txtKeywords.option("value", "");
        DesignMasterView.variables.dx_ddlConceptOf.option("value", "");
        DesignMasterView.variables.dx_txtRelatedProduct.option({ value: [] });
        DesignMasterView.variables.dx_txtNotes.option("value", "");
        DesignMasterView.variables.dx_btnSubmit.option({ visible: true });


        $("#ItemimgPreview").attr("src", getDomain() + "/Content/images/upimg.png");
        $("#hdnMainImg").val("");
        $("#lnkCADFilePreview").attr("FileName", "");
        $("#lnkCADFilePreview").html("");
        $("#lnkDesigenRaw").attr("FileName", "");
        $("#lnkDesigenRaw").html("");
        $("#hdnOldCADFile").val("");

        $("#imgPreviewList").html("");
        $("#tbl_DesignDetails tbody").html("");

        DesignMasterView.variables.Oper = 'Add';
        DesignMasterView.variables.addedit = "added";
        DesignMasterView.variables.Masterid = "";
        DesignMasterView.variables.EditDataList = [];
        DesignMasterView.variables.deletedFiles = "";
        DesignMasterView.variables.RowCount = 1;
        DesignMasterView.variables.ImgRowCount = 1;
        DesignMasterView.variables.DetailsControlsList = [];
        DesignMasterView.variables.MultiImgControlsList = [];
        DesignMasterView.variables.DeleteDataObj = "";

        if (DesignMasterView.variables.dx_popupRecordDelete)
            DesignMasterView.variables.dx_popupRecordDelete.hide();

        $("#frm_DesignMaster").hide();
        $("#panel_DesignMasterList").show();
        DesignMasterView.variables.dx_dataGrid.refresh();
    },

    makeDetailsXmlNodes: function () {
        var IsMetalExists = false;
        $.each(DesignMasterView.variables.DetailsControlsList, function (key, obj) {
            if (obj) {
                if (obj.dx_txtItemName.option().value) {
                    if (obj.dx_txtItemName.option().selectedItem.rmgroup == 'METAL') {
                        IsMetalExists = true;
                    }
                }
            }
        });
        if (IsMetalExists == false) {
            return false;
        }
        else {
            var xmlNodeList = '<DETAILSLIST>';
            $.each(DesignMasterView.variables.DetailsControlsList, function (key, obj) {
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

                        xmlNodeList += '</DETAILS>';
                    }
                }

            });
            xmlNodeList += '</DETAILSLIST>';

            return xmlNodeList;
        }
    },

    makeMultiImgXmlNodes: function () {
        var xmlsaveFiles = '<IMGLIST>', saveFiles = '', strHref = [];

        $.each(DesignMasterView.variables.MultiImgControlsList, function (key, obj) {
            if (obj) {
                if (obj.imgPath) {
                    strHref.push(obj.imgPath);
                    var ext = obj.imgPath.substring((obj.imgPath).lastIndexOf(".") + 1).toLowerCase();
                    var ImgType = "";
                    if (ext == "png" || ext == "jpg" || ext == "jpeg")
                        ImgType = "IMG";
                    else if (ext == "mp4")
                        ImgType = "VIDEO";

                    xmlsaveFiles += '<IMG>';
                    xmlsaveFiles += '<TYPE>' + ImgType + '</TYPE>';
                    xmlsaveFiles += '<ACTUALNAME><![CDATA[' + obj.dx_txtImgTitle.option().value + ']]></ACTUALNAME>';
                    xmlsaveFiles += '<VIRTUALNAME><![CDATA[' + obj.imgPath.substr(obj.imgPath.lastIndexOf('/') + 1) + ']]></VIRTUALNAME>';
                    xmlsaveFiles += '<VIEW>' + obj.dx_ddlDesignView.option().value + '</VIEW>';
                    xmlsaveFiles += '<COLOR>' + obj.dx_ddlDesignColor.option().value + '</COLOR>';
                    xmlsaveFiles += '</IMG>';
                }
            }
        });

        xmlsaveFiles += '</IMGLIST>';
        saveFiles = strHref.join(",");

        return { xmlsaveFiles: xmlsaveFiles, saveFiles: saveFiles };
    },

    RemoveDetailRow: function (obj) {
        $(obj).closest("tr").remove();
        delete DesignMasterView.variables.DetailsControlsList[$(obj).closest("tr").attr("rowno")];

        DesignMasterView.CalcTotalWgts();
    },

    triggerId: function (id) {
        var rowData = DesignMasterView.variables.dx_dataGrid.getVisibleRows()[DesignMasterView.variables.dx_dataGrid.getRowIndexByKey(+id)].data;

        DesignMasterView.variables.Masterid = id;
        DesignMasterView.variables.EditDataList = rowData;

        DesignMasterView.variables.dx_ddlCategory.option({
            value: rowData.desgcateid,
            readOnly: true
        });
        DesignMasterView.variables.dx_ddlSubCategory.option({
            value: rowData.desgsubcateid,
            readOnly: true
        });
        DesignMasterView.variables.dx_txtDesignCode.option("value", rowData.designcode);
        DesignMasterView.variables.DesignCode = rowData.designcode;
        DesignMasterView.variables.dx_ddlSize.option("value", rowData.goodssize);
        DesignMasterView.variables.dx_txtLength.option("value", rowData.jew_length);
        DesignMasterView.variables.dx_txtWidth.option("value", rowData.width);
        DesignMasterView.variables.dx_txtHeight.option("value", rowData.height);
        DesignMasterView.variables.dx_ddlLbrType.option("value", rowData.labourtypeid);
        DesignMasterView.variables.dx_txtItemCate.option("value", rowData.hsncodeid);
        DesignMasterView.variables.dx_txtCollName.option("value", rowData.collectionid);
        DesignMasterView.variables.dx_txtBrand.option("value", rowData.brand);
        DesignMasterView.variables.dx_txtOccasion.option("value", rowData.occasion);
        if (rowData.settingtype)
        DesignMasterView.variables.dx_ddlSettingType.option({ value: (rowData.settingtype.toString()).split(",").map(Number) });


        if (rowData.designerid) {
            DesignMasterView.variables.dx_txtDesigner.option({
                items: [{ accid: rowData.designerid, accountname: rowData.designername }],
                selectedItem: { accid: rowData.designerid, accountname: rowData.designername },
                value: rowData.designername
            });
        }

        DesignMasterView.variables.dx_txtDesignedDate.option("value", rowData.designedondate);
        //DesignMasterView.variables.dx_uploadCADFile.option("value", rowData.desgcateid);

        if (rowData.conseptof)
            DesignMasterView.variables.dx_ddlConceptOf.option("value", rowData.conseptof.toString().split(",").map(Number));
        else
            DesignMasterView.variables.dx_ddlConceptOf.option("value", "");

        DesignMasterView.variables.dx_txtRefCode.option("value", rowData.refcode);
        DesignMasterView.variables.dx_SwitchSampleLinePcs.option("value", rowData.samplelinepcs)
        DesignMasterView.variables.dx_SwitchMaster.option("value", rowData.mold);
        DesignMasterView.variables.dx_SwitchIsActive.option("value", rowData.isactive);
        DesignMasterView.variables.dx_SwitchDisWebB2B.option("value", rowData.viswebb2b);
        DesignMasterView.variables.dx_SwitchDisWebB2C.option("value", rowData.viswebb2c);
        DesignMasterView.variables.dx_SwitchDisAppB2B.option("value", rowData.visappb2b);
        DesignMasterView.variables.dx_SwitchDisAppB2C.option("value", rowData.visappb2c);
        DesignMasterView.variables.dx_SwitchDisOutlet.option("value", rowData.visoutlet);
        DesignMasterView.variables.dx_txtDiaPcs.option("value", rowData.diapcs);
        DesignMasterView.variables.dx_txtDiaCrt.option("value", rowData.diacts);
        DesignMasterView.variables.dx_txtNetWgt.option("value", rowData.netweight);
        DesignMasterView.variables.dx_txtGrossWgt.option("value", rowData.grossweight);
        DesignMasterView.variables.dx_txtFineWgt.option("value", rowData.fineweight);
        DesignMasterView.variables.dx_txtNotes.option("value", rowData.history);
        DesignMasterView.variables.dx_txtKeywords.option("value", rowData.keyword);

        if (rowData.relateddesigns)
            DesignMasterView.variables.dx_txtRelatedProduct.option("value", rowData.relateddesigns.toString().split(","));
        else
            DesignMasterView.variables.dx_txtRelatedProduct.option("value", []);

        $("#ItemimgPreview").attr("src", getDesignImgVirtualPath() + "/" + rowData.desgcate + "/" + rowData.desgsubcate + "/" + rowData.designcode + "/" + rowData.imgvirtualname);
        $("#hdnMainImg").val(getDesignImgVirtualPath() + "/" + rowData.desgcate + "/" + rowData.desgsubcate + "/" + rowData.designcode + "/" + rowData.imgvirtualname);
        if (rowData.cadfilevirtualname) {
            $("#lnkCADFilePreview").attr("FileName", getDesignImgVirtualPath() + "/" + rowData.desgcate + "/" + rowData.desgsubcate + "/" + rowData.designcode + "/CAD/" + rowData.cadfilevirtualname);
            $("#lnkCADFilePreview").html(rowData.cadfileactualname);
            $("#hdnOldCADFile").val(getDesignImgVirtualPath() + "/" + rowData.desgcate + "/" + rowData.desgsubcate + "/" + rowData.designcode + "/CAD/thumb/" + rowData.cadfilevirtualname);
        }

        if (rowData.designrawfilevirtualname) {
            $("#lnkDesigenRaw").attr("FileName", getDesignImgVirtualPath() + "/" + rowData.desgcate + "/" + rowData.desgsubcate + "/" + rowData.designcode + "/CAD/" + rowData.designrawfilevirtualname);
            $("#lnkDesigenRaw").html(rowData.designrawfileactualname);
            $("#hdnDesigenRaw").val(getDesignImgVirtualPath() + "/" + rowData.desgcate + "/" + rowData.desgsubcate + "/" + rowData.designcode + "/CAD/thumb/" + rowData.designrawfilevirtualname);
        }


        DesignMasterView.GetDesignDetails(id);
        DesignMasterView.GetimagesDetails(id);

        $("#frm_DesignMaster").show();
        $("#panel_DesignMasterList").hide();

        DesignMasterView.variables.dx_ddlCategory.focus();

        if (isU()) {
            DesignMasterView.variables.dx_btnSubmit.option({ visible: true });
        }
        else {
            DesignMasterView.variables.dx_btnSubmit.option({ visible: false });
        }
        if (isDW()) {
            $("#lnkCADFilePreview").css("pointer-events", "");
        }
        else {
            $("#lnkCADFilePreview").css("pointer-events", "none");
        }
    },

    deleteRow: function (id) {
        var rowData = DesignMasterView.variables.dx_dataGrid.getVisibleRows()[DesignMasterView.variables.dx_dataGrid.getRowIndexByKey(+id)].data;
        DesignMasterView.variables.Masterid = id;
        DesignMasterView.variables.DeleteDataObj = rowData;
        DesignMasterView.variables.Oper = "Delete";

        if (DesignMasterView.variables.dx_popupRecordDelete) {
            DesignMasterView.variables.dx_popupRecordDelete.option("contentTemplate", DesignMasterView.variables.DeletePopUpOptions.contentTemplate(DesignMasterView.variables.DeleteDataObj).bind(this));
        } else {
            DesignMasterView.variables.dx_popupRecordDelete = $("#dx_popupRecordDelete").dxPopup(DesignMasterView.variables.DeletePopUpOptions).dxPopup("instance");
        }

        DesignMasterView.variables.dx_popupRecordDelete.show();
    },

    GetDesignDetails: function (DM_ID) {
        var myfilter = { rules: [] };
        myfilter.rules.push({ field: "DM_ID", op: "eq", data: DM_ID });

        $.ajax({
            url: getDomain() + DesignMasterView.variables.BindDetailListUrl + "&myfilters=" + JSON.stringify(myfilter),
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
                            DesignMasterView.AddNewLineDetails(obj);
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

    GetimagesDetails: function (DM_ID) {
        var myfilter = { rules: [] };
        myfilter.rules.push({ field: "DM_ID", op: "eq", data: DM_ID });

        $.ajax({
            url: getDomain() + DesignMasterView.variables.BindImgListUrl + "&myfilters=" + JSON.stringify(myfilter),
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

                        var DesignCode = DesignMasterView.variables.dx_txtDesignCode.option().value;
                        $.each(List, function (key, obj) {
                            var postfix = DesignMasterView.variables.ImgRowCount;

                            $('#imgPreviewList').append(
                                 '<tr rowid="' + postfix + '" id="' + obj.desgimgid + '">' +
                                     '<td class="text-center">' +
                                         '<a href="' + getDesignImgVirtualPath() + "/" + DesignMasterView.variables.EditDataList.desgcate + '/' + DesignMasterView.variables.EditDataList.desgsubcate + '/' + DesignCode + '/' + obj.virtualname + '" data-fancybox="gallery">' +
                                           (obj.imgtype == "IMG" ? ('<img width="50" height="50" alt="" class="DesignImg" src="' + getDesignImgVirtualPath() + "/" + DesignMasterView.variables.EditDataList.desgcate + '/' + DesignMasterView.variables.EditDataList.desgsubcate + '/' + DesignCode + '/thumb/' + obj.virtualname + '" style="cursor:pointer;padding: 3px;" title="Click here for zoom...">') : ('<img width="50" height="50" alt="" class="DesignImg" src="' + getDomain() + '/Content/images/play-button.png" style="cursor:pointer;padding: 3px;" title="Click here for zoom...">')) +
                                         '</a>' +
                                     '</td>' +
                                     '<td>' +
                                         '<div id="dx_txtImgTitle' + postfix + '"></div>' +
                                     '</td>' +
                                     '<td>' +
                                         '<div id="dx_ddlDesignView' + postfix + '"></div>' +
                                     '</td>' +
                                     '<td>' +
                                         '<div id="dx_ddlDesignColor' + postfix + '"></div>' +
                                     '</td>' +
                                     '<td class="text-center">' +
                                         '<span class="btn btn-danger" onclick="DesignMasterView.deleteFile(this, \'' + obj.actualname + '\')"><i class="fa fa-trash-o"></i></span>' +
                                     '</td>' +
                                 '</tr>'
                             );

                            DesignMasterView.MultiImgListControl(postfix, obj.actualname, getDesignImgVirtualPath() + "/" + DesignMasterView.variables.dx_ddlCategory.option().text + '/' + DesignMasterView.variables.dx_ddlSubCategory.option().text + '/' + DesignCode + '/' + obj.virtualname, obj);

                            DesignMasterView.variables.ImgRowCount = postfix + 1;
                        });

                        DesignMasterView.registerSingleFileUpload('.uploadlink');
                    }
                }
                else {
                    DevExVariables.InvalidResponseCode(data);
                }
            },
            error: OnError
        });
    },

    RegisterFileUpload: function (btn, anchor, lblError) {

        $('#' + btn).fileupload({
            url: getDomain() + '/Helpers/Handler/FileUploadHandler.ashx',
            add: function (e, data) {

                if (checkIsValidFile(e.target.accept, data.files[0].type))
                    data.submit();
                else
                    notificationMessage('Invalid File', 'Please select only ' + e.target.accept + ' files', 'warning');
            },
            success: function (response, status) {

                //$('#' + anchor).attr('href', response);
                $('#' + anchor).attr('FileName', response);
                $('#' + anchor).html($(this)[0].files[0].name);
                if ($(lblError).length > 0) {
                    $(lblError).hide();
                    $(lblError).html("");
                }
            },
            error: OnError
        });
    },

    RegisterFileUploadWithCropper: function (btnId, CanvasId, CropPreviewId, CropperModalId) {
        $('#' + btnId).fileupload({
            url: getDomain() + '/Helpers/Handler/FileUploadHandler.ashx',
            add: function (e, data) {
                if (checkIsValidFile(e.target.accept, data.files[0].type))
                    data.submit();
                else
                    notificationMessage('Invalid File', 'Please select only ' + e.target.accept + ' files', 'warning');
            },
            success: function (res, status) {
                var ext = $(this)[0].files[0].name.split(".")[1];
                if (ext.toLowerCase() != "mp4") {
                    //$("#CustomerimgCrop").cropper('clear');
                    $('#' + CropperModalId).modal();
                    $("#" + CanvasId).html('');
                    $("#" + CropPreviewId).cropper("replace", res);
                    $('#hdnCropperImgName').val($(this)[0].files[0].name);
                }
                else {
                    var file = res.substr(res.lastIndexOf('/') + 1).split('.')[0];
                    var displayFile = $(this)[0].files[0].name;
                    var postfix = DesignMasterView.variables.ImgRowCount;

                    $('#imgPreviewList').append(
                        '<tr rowid="' + postfix + '" id="' + file + '">' +
                            '<td class="text-center">' +
                                '<a href="' + res + '" data-fancybox="gallery">' +
                                    '<img width="50" height="50" alt="" class="DesignImg" src="' + getDomain() + '/Content/images/play-button.png" style="cursor:pointer;padding: 3px;" onerror="imgError(this);" title="Click here for zoom...">' +
                                '</a>' +
                            '</td>' +
                            '<td>' +
                                '<div id="dx_txtImgTitle' + postfix + '"></div>' +
                            '</td>' +
                            '<td>' +
                                '<div id="dx_ddlDesignView' + postfix + '"></div>' +
                            '</td>' +
                            '<td>' +
                                '<div id="dx_ddlDesignColor' + postfix + '"></div>' +
                            '</td>' +
                            '<td class="text-center">' +
                                '<span class="btn btn-danger" onclick="DesignMasterView.deleteFile(this, \'' + displayFile + '\')"><i class="fa fa-trash-o"></i></span>' +
                            '</td>' +
                        '</tr>'
                    );

                    DesignMasterView.MultiImgListControl(postfix, displayFile, res);

                    DesignMasterView.variables.ImgRowCount = postfix + 1;
                }
            },
            error: OnError
        });
    },

    EditDesignFromGrid: function (val, dm_id, type) {
        var data = {
            oper: "EditFromGrid",
            "DM_ID": dm_id
        }

        if (type == "Active")
            data.ISACTIVE = val;
        else
            data.MOLD = val;

        $.ajax({
            url: getDomain() + DesignMasterView.variables.PerformMasterOperationurl,
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
                    DesignMasterView.clearControls();
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

    //GetCollectionList: function () {
    //    var myfilter = { rules: [] };
    //    myfilter.rules.push({ field: "TYPE", op: "eq", data: "Collection" });
    //    $.ajax({
    //        url: getDomain() + DesignMasterView.variables.BindStaticDataUrl + "&myfilters=" + JSON.stringify(myfilter),
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

    //                    DesignMasterView.variables.dx_txtCollName.option({
    //                        dataSource: new DevExpress.data.ArrayStore({
    //                            data: List,
    //                            key: 'collectionid',
    //                        }),
    //                        displayExpr: 'collectionname',
    //                        valueExpr: 'collectionid',
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

    //GetBrandNameList: function () {
    //    var myfilter = { rules: [] };
    //    myfilter.rules.push({ field: "TYPE", op: "eq", data: "brand" });
    //    $.ajax({
    //        url: getDomain() + DesignMasterView.variables.BindStaticDataUrl + "&myfilters=" + JSON.stringify(myfilter),
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

    //                    DesignMasterView.variables.dx_txtBrand.option({
    //                        dataSource: new DevExpress.data.ArrayStore({
    //                            data: List,
    //                            key: 'brandid',
    //                        }),
    //                        displayExpr: 'brandname',
    //                        valueExpr: 'brandid',
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

    //GetOccasionList: function () {
    //    var myfilter = { rules: [] };
    //    myfilter.rules.push({ field: "TYPE", op: "eq", data: "Occasion" });
    //    $.ajax({
    //        url: getDomain() + DesignMasterView.variables.BindStaticDataUrl + "&myfilters=" + JSON.stringify(myfilter),
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

    //                    DesignMasterView.variables.dx_txtOccasion.option({
    //                        dataSource: new DevExpress.data.ArrayStore({
    //                            data: List,
    //                            key: 'occasionid',
    //                        }),
    //                        displayExpr: 'occasionname',
    //                        valueExpr: 'occasionid',
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
        myfilter.rules.push({ field: "USESALEPUR", op: "eq", data: true });
        myfilter.rules.push({ field: "ISUSEINJEWELLERY", op: "eq", data: true });
        myfilter.rules.push({ field: "TYPE", op: "eq", data: "DesgCate,LabourType,ConceptOf,RmCode,shape,Purity,Colour,Collection,brand,Occasion" });

        $.ajax({
            url: getDomain() + DesignMasterView.variables.BindStaticMultipleDataUrl + "&myfilters=" + JSON.stringify(myfilter),
            async: true,
            cache: false,
            type: 'POST',
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    var JsonObject = xml2json.parser(data);
                  
                        if (JsonObject.serviceresponse.detailslist_desgcate) {
                            DesignMasterView.variables.dx_ddlCategory.option({
                                dataSource: new DevExpress.data.ArrayStore({
                                    data: JsonObject.serviceresponse.detailslist_desgcate.details,
                                    key: "desgcateid"
                                }),
                                displayExpr: "desgcate",
                                valueExpr: "desgcateid",
                            });
                        }

                        if (JsonObject.serviceresponse.detailslist_labourtype) {
                            DesignMasterView.variables.dx_ddlLbrType.option({
                                dataSource: new DevExpress.data.ArrayStore({
                                    data: JsonObject.serviceresponse.detailslist_labourtype.details,
                                    key: "labourtypeid"
                                }),
                                displayExpr: "labourtype",
                                valueExpr: "labourtypeid",
                            });
                        }

                        if (JsonObject.serviceresponse.detailslist_conceptof) {
                                                DesignMasterView.variables.dx_ddlConceptOf.option({
                                                    dataSource: new DevExpress.data.ArrayStore({
                                                        data: JsonObject.serviceresponse.detailslist_conceptof.details,
                                                        key: "conceptofid"
                                                    }),
                                                    displayExpr: "conceptofname",
                                                    valueExpr: "conceptofid",
                                                });
                        }

                        if (JsonObject.serviceresponse.detailslist_rmcode) {
                            if (JsonObject.serviceresponse.detailslist_rmcode.details.length) {
                                DesignMasterView.variables.RmCodeList = JsonObject.serviceresponse.detailslist_rmcode.details;
                                }
                               else {
                                DesignMasterView.variables.RmCodeList.push(JsonObject.serviceresponse.detailslist_rmcode.details);
                                }
                        }

                        if (JsonObject.serviceresponse.detailslist_shape) {
                            if (JsonObject.serviceresponse.detailslist_shape.details.length) {
                                DesignMasterView.variables.RmShapeList = JsonObject.serviceresponse.detailslist_shape.details;
                            }
                            else {
                                DesignMasterView.variables.RmShapeList.push(JsonObject.serviceresponse.detailslist_shape.details);
                            }
                        }

                        if (JsonObject.serviceresponse.detailslist_purity) {
                            if (JsonObject.serviceresponse.detailslist_purity.details.length) {
                                DesignMasterView.variables.RmPurityList = JsonObject.serviceresponse.detailslist_purity.details;
                            }
                            else {
                                DesignMasterView.variables.RmPurityList.push(JsonObject.serviceresponse.detailslist_purity.details);
                            }
                        }

                        if (JsonObject.serviceresponse.detailslist_colour) {
                            if (JsonObject.serviceresponse.detailslist_colour.details.length) {
                                DesignMasterView.variables.RmColorList = JsonObject.serviceresponse.detailslist_colour.details;
                            }
                            else {
                                DesignMasterView.variables.RmColorList.push(JsonObject.serviceresponse.detailslist_colour.details);
                            }
                        }

                        if (JsonObject.serviceresponse.detailslist_collection) {
                            var List = [];
                            if (JsonObject.serviceresponse.detailslist_collection.details.length) {
                                List = JsonObject.serviceresponse.detailslist_collection.details;
                            }
                            else {
                                List.push(JsonObject.serviceresponse.detailslist_collection.details);
                            }

                            DesignMasterView.variables.dx_txtCollName.option({
                                dataSource: new DevExpress.data.ArrayStore({
                                    data: List,
                                    key: 'collectionid',
                                }),
                                displayExpr: 'collectionname',
                                valueExpr: 'collectionid',
                            });
                        }

                        if (JsonObject.serviceresponse.detailslist_brand) {
                            var List = [];
                            if (JsonObject.serviceresponse.detailslist_brand.details.length) {
                                List = JsonObject.serviceresponse.detailslist_brand.details;
                            }
                            else {
                                List.push(JsonObject.serviceresponse.detailslist_brand.details);
                            }

                            DesignMasterView.variables.dx_txtBrand.option({
                                dataSource: new DevExpress.data.ArrayStore({
                                    data: List,
                                    key: 'brandid',
                                }),
                                displayExpr: 'brandname',
                                valueExpr: 'brandid',
                            });
                        }

                        if (JsonObject.serviceresponse.detailslist_occasion) {
                            var List = [];
                            if (JsonObject.serviceresponse.detailslist_occasion.details.length) {
                                List = JsonObject.serviceresponse.detailslist_occasion.details;
                            }
                            else {
                                List.push(JsonObject.serviceresponse.detailslist_occasion.details);
                            }

                            DesignMasterView.variables.dx_txtOccasion.option({
                                dataSource: new DevExpress.data.ArrayStore({
                                    data: List,
                                    key: 'occasionid',
                                }),
                                displayExpr: 'occasionname',
                                valueExpr: 'occasionid',
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
    
};

$(document).ready(function () {
    DesignMasterView.initializeDevExgrid();
    DesignMasterView.FormInitialize();
    DesignMasterView.GetAllList();
    //DesignMasterView.GetCategoryList();
    DesignMasterView.GetItemCategory();
    //DesignMasterView.GetLabourTypeList();
    //DesignMasterView.GetConceptOfList();
    //DesignMasterView.GetBrandNameList();
    //DesignMasterView.GetOccasionList();

    //DesignMasterView.GetRmCodeList();
    //DesignMasterView.GetRmShapeList();
    //DesignMasterView.GetRmPurityList();
    //DesignMasterView.GetRmColorList();
    //DesignMasterView.GetCollectionList();

    $("#lnk_AddNewRow").click(function () {
        DesignMasterView.AddNewLineDetails();
    });

    //RegisterFileUpload('inputItemImage', 'ItemimgPreview', "#ItemimgError");
    DesignMasterView.RegisterFileUpload('inputCADFile', 'lnkCADFilePreview', "#ItemimgError");
    DesignMasterView.RegisterFileUpload('inputDesigneRaw', 'lnkDesigenRaw', "#ItemimgError");
    DesignMasterView.RegisterFileUploadWithCropper('inputItemImage,#btnAddNewImage', 'divCropCanvas', 'imgCropPreview', 'ModelImageCropper');

    $("#lnkDesigenRaw").click(function () {
        var url = $("#lnkDesigenRaw").attr("FileName")
        if (isDW())
            window.open(url, '_blank');
    });
    $("#lnkCADFilePreview").click(function () {
        var url = $("#lnkCADFilePreview").attr("FileName")
        if (isDW())
            window.open(url);
    });
    //$('#modalUpload').on('show.bs.modal', function (e) {
    //    $('#hdnPreviewUploader').val(e.relatedTarget.dataset.preview);
    //    $('#hdnExtUploader').val(e.relatedTarget.dataset.ext);
    //    RegisterMultipleFileUpload('#imgUploader', e.relatedTarget.dataset.ext);
    //    $("#spExtension").html(e.relatedTarget.dataset.ext);
    //});

    //$('#btnAddFile').click(function () {
    //    var strHref = '', file = '', fileid = '00000000-0000-0000-0000-000000000000', displayFile = '';
    //    var postfix;

    //    $('#imgUploader .plupload_filelist').find('li').each(function (key, obj) {
    //        if ($(obj).find('.plupload_file_name a').length > 0) {
    //            strHref = $(obj).find('.plupload_file_name a').attr('href');
    //            file = strHref.substr(strHref.lastIndexOf('/') + 1).split('.')[0];
    //            displayFile = $(obj).find('.plupload_file_name a').html();
    //            //var x = displayFile;
    //            //var f = x.substr(0, x.lastIndexOf('.'));
    //            postfix = DesignMasterView.variables.ImgRowCount;

    //            $('#' + $('#hdnPreviewUploader').val()).append(
    //                '<tr rowid="' + postfix + '" id="' + file + '">' +
    //                    '<td class="text-center">' +
    //                        '<a href="' + strHref + '" data-fancybox="gallery">' +
    //                            '<img width="50" height="50" alt="" class="DesignImg" src="' + strHref + '" style="cursor:pointer;padding: 3px;" onerror="imgError(this);" title="Click here for zoom...">' +
    //                        '</a>' +
    //                    '</td>' +
    //                    '<td>' +
    //                        '<div id="dx_txtImgTitle' + postfix + '"></div>' +
    //                    '</td>' +
    //                    '<td>' +
    //                        '<div id="dx_ddlDesignView' + postfix + '"></div>' +
    //                    '</td>' +
    //                    '<td>' +
    //                        '<div id="dx_ddlDesignColor' + postfix + '"></div>' +
    //                    '</td>' +
    //                    '<td class="text-center">' +
    //                        '<span class="btn btn-primary uploadlink" for="btnEditImg' + postfix + '" style="margin-right: 5px;">' +
    //                            '<i class="fa fa-upload"></i>' +
    //                            '<input type="file" accept="' + $('#hdnExtUploader').val() + '" name="file" id="btnEditImg' + postfix + '" class="hide">' +
    //                        '</span>' +
    //                        '<span class="btn btn-danger" onclick="DesignMasterView.deleteFile(this, \'' + displayFile + '\')"><i class="fa fa-trash-o"></i></span>' +
    //                    '</td>' +
    //                '</tr>'
    //            );

    //            DesignMasterView.MultiImgListControl(postfix, displayFile, strHref);

    //            DesignMasterView.variables.ImgRowCount = postfix + 1;
    //        }
    //    });

    //    DesignMasterView.registerSingleFileUpload('.uploadlink');

    //    $('#modalUpload').modal('hide');
    //});

    /*----------------------------Code for Image Cropper----------------------------*/
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
                                    success: function (res) {
                                        if (DesignMasterView.variables.ImageUploadType == "Single") {
                                            $('#ItemimgPreview').attr('src', res);
                                            //$('#profileimg').data('newurl', res);
                                        }
                                        else {
                                            var file = res.substr(res.lastIndexOf('/') + 1).split('.')[0];
                                            var displayFile = $('#hdnCropperImgName').val();
                                            var postfix = DesignMasterView.variables.ImgRowCount;

                                            $('#imgPreviewList').append(
                                                '<tr rowid="' + postfix + '" id="' + file + '">' +
                                                    '<td class="text-center">' +
                                                        '<a href="' + res + '" data-fancybox="gallery">' +
                                                            '<img width="50" height="50" alt="" class="DesignImg" src="' + res + '" style="cursor:pointer;padding: 3px;" onerror="imgError(this);" title="Click here for zoom...">' +
                                                        '</a>' +
                                                    '</td>' +
                                                    '<td>' +
                                                        '<div id="dx_txtImgTitle' + postfix + '"></div>' +
                                                    '</td>' +
                                                    '<td>' +
                                                        '<div id="dx_ddlDesignView' + postfix + '"></div>' +
                                                    '</td>' +
                                                    '<td>' +
                                                        '<div id="dx_ddlDesignColor' + postfix + '"></div>' +
                                                    '</td>' +
                                                    '<td class="text-center">' +
                                                        '<span class="btn btn-danger" onclick="DesignMasterView.deleteFile(this, \'' + displayFile + '\')"><i class="fa fa-trash-o"></i></span>' +
                                                    '</td>' +
                                                '</tr>'
                                            );

                                            DesignMasterView.MultiImgListControl(postfix, displayFile, res);

                                            DesignMasterView.variables.ImgRowCount = postfix + 1;
                                        }
                                    },
                                    error: OnError
                                });
                            }, 10);
                    }
                }
                break;
        }
    });
    /*----------------------------Code for Image Cropper----------------------------*/

    $("#btnAddNewImage").click(function () {
        DesignMasterView.variables.ImageUploadType = "Multi";
    });
    $("#inputItemImage").click(function () {
        DesignMasterView.variables.ImageUploadType = "Single";
    });
});

function viewAttachment(id) {
    var rowData = DesignMasterView.variables.dx_dataGrid.getVisibleRows()[DesignMasterView.variables.dx_dataGrid.getRowIndexByKey(+id)].data;

    window.open(getDesignImgVirtualPath() + '/' + rowData.desgcate + '/' + rowData.desgsubcate + '/CAD/' + rowData.cadfilevirtualname, "_blank");
}