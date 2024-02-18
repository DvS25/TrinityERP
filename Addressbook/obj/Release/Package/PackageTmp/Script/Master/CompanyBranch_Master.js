var BranchMasterView = {
    variables: {
        BindGroupListUrl: "/Common/BindMastersDetails?ServiceName=COMPANY_BRANCH_MASTER_GET",
        PerformMasterOperationUrl: "/Common/OpeartionsOnMaster?ServiceName=COMPANY_BRANCH_MASTER_CRUD",
        BindAccListUrl: "/Common/BindMastersDetails?ServiceName=ACCOUNTMASTER_GET",
        BindDocumentType: "/Common/BindMastersDetails?ServiceName=STATIC_MASTER_GET",

        Oper: 'Add',
        addedit: "added",
        Masterid: "",
        dx_btnAddNew: "",

        dx_txtBranchName: "",
        dx_txtBranchCode: "",
        dx_ddlComapny: "",
        dx_txtaddress: "",
        //dx_txtGstNo: "",
        dx_ddlcountry: "",
        dx_ddlState: "",
        dx_ddlCity: "",
        dx_switchIsActive: "",

        dx_txtMobileNo: "",
        dx_txtEmailId: "",

        dx_ExpiryDate: "",
        dx_Description: "",
        dx_DocumentType: "",
        dx_DocumentNo: "",
        DocumentType: [],
        DocumentTypeList: [],
        RowCount: 1,
        deletedFiles: "",

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
                    $("<p>Branch Name: <span>" + BranchMasterView.variables.DeleteDataObj.branchname + "</span></p>"),
                    $("<p>Company Name: <span>" + BranchMasterView.variables.DeleteDataObj.companyname + "</span></p>"),
                    $("<div style='float:right;' />").attr("id", "dx_btnDeleteConfirm").dxButton({
                        text: "Yes, Delete It!",
                        icon: "trash",
                        type: "danger",
                        onClick: function (e) {
                            var data = {
                                "BRANCHMASID": BranchMasterView.variables.Masterid,
                                "oper": BranchMasterView.variables.Oper,
                            }

                            BranchMasterView.savedata(data);
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
    },

    initializeDevExgrid: function ()     {
        BranchMasterView.variables.dx_dataGrid = $("#dx_dataGrid").dxDataGrid({
            dataSource: new DevExpress.data.CustomStore({
                key: "branchid",
                load: function (loadOptions) {
                    var deferred = $.Deferred();

                    var result = DevExVariables.GetDataList(loadOptions, BranchMasterView.variables.BindGroupListUrl);

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
            columns: [{ dataField: "branchid", allowFiltering: false, allowSorting: true, sortIndex: 1, sortOrder: "desc", visible: false },
                { dataField: "companyname", caption: "Company Name", dataType: "string", allowSorting: true, allowFiltering: true, allowHeaderFiltering: false },
                { dataField: "branchname", caption: "Branch Name", dataType: "string", allowSorting: true, allowFiltering: true, allowHeaderFiltering: false },
                { dataField: "branchcode", caption: "Branch Code", dataType: "string", allowSorting: true, allowFiltering: false, allowHeaderFiltering: false },
                { dataField: "mobileno", caption: "Mobile No", dataType: "string", allowSorting: true, allowFiltering: false, allowHeaderFiltering: false },
                { dataField: "emailid", caption: "Email Id", dataType: "string", allowSorting: true, allowFiltering: false, allowHeaderFiltering: false },
                { dataField: "address", caption: "Address", dataType: "string", filterOperations: ["contains"], allowSorting: true, allowFiltering: true, allowHeaderFiltering: false },
                { dataField: "countryname", caption: "Country", dataType: "string", filterOperations: ["contains"], allowSorting: true, allowFiltering: true, allowHeaderFiltering: false },
                { dataField: "statename", caption: "State", dataType: "string", filterOperations: ["contains"], allowSorting: true, allowFiltering: true, allowHeaderFiltering: false },
                { dataField: "cityname", caption: "City", dataType: "string", filterOperations: ["contains"], allowSorting: true, allowFiltering: true, allowHeaderFiltering: false },
                {
                    dataField: "Action", caption: "Action", alignment: "center", allowFiltering: false, allowSorting: false, fixed: true, fixedPosition: "right",
                    cellTemplate: function (container, options) {
                        DevExVariables.ActionTemplate(container, options, true, true, "BranchMasterView");
                    }
                },
            ]
        }).dxDataGrid("instance");
    },

    triggerId: function (id) {
        var rowData = BranchMasterView.variables.dx_dataGrid.getVisibleRows()[BranchMasterView.variables.dx_dataGrid.getRowIndexByKey(+id)].data;
        BranchMasterView.variables.Masterid = id;
        BranchMasterView.variables.dx_txtBankName.option({
            items: [{ accid: rowData.accid, accountname: rowData.accountname}],
            selectedItem: { accid: rowData.accid, accountname: rowData.accountname},
            value: rowData.accountname
        });
        //BranchMasterView.variables.dx_txtBankName.option({ value: rowData.bankaccid });
        BranchMasterView.variables.dx_txtBranchName.option({ value: rowData.branchname });
        BranchMasterView.variables.dx_txtBranchCode.option({ value: rowData.branchcode });
        BranchMasterView.variables.dx_ddlComapny.option("value", rowData.companyid);
        BranchMasterView.variables.dx_txtMobileNo.option({ value: rowData.mobileno });
        BranchMasterView.variables.dx_txtEmailId.option({ value: rowData.emailid });
        //BranchMasterView.variables.dx_txtGstNo.option({ value: rowData.gstno });
        BranchMasterView.variables.dx_txtaddress.option({ value: rowData.address });
        BranchMasterView.variables.dx_ddlcountry.option("value", rowData.countryid);
        BranchMasterView.variables.dx_ddlState.option("value", rowData.stateid);
        BranchMasterView.variables.dx_ddlCity.option("value", rowData.cityid);
        BranchMasterView.variables.dx_switchIsActive.option({ value: rowData.isactive });
        $("#frm_CompanyMaster").show();
        $("#pnlView").hide();

        //--------------------------------------------Get Attachment----------------------------------------------
        $("#AttachmentsList").show();
        $('#tbody_AttachmentsList').html("");
        var myfilter = { rules: [] };
        myfilter.rules.push({ field: "BranchId", op: "eq", data: id });
        $.ajax({
            url: getDomain() + "/Common/BindMastersDetails?ServiceName=BRANCHMASTER_FILES_GET&myfilters=" + JSON.stringify(myfilter),
            async: true,
            cache: false,
            type: 'POST',
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    var JsonObject = xml2json.parser(data);
                    if (JsonObject.serviceresponse.detailslist) {
                        var List = [];
                        if (JsonObject.serviceresponse.detailslist.details.length > 0)
                            List = JsonObject.serviceresponse.detailslist.details;
                        else
                            List.push(JsonObject.serviceresponse.detailslist.details);

                        $.each(List, function (key, obj) {
                            var postfix = BranchMasterView.variables.RowCount;
                            var file = (obj.filename).split(".")[0];
                            $('#tbody_AttachmentsList').append('<tr id="' + file + '" fileid="' + obj.fileid + '" rowno="' + postfix + '">' +
                              '<td class="FilePath text-center">' +
                              '<a class="btn btn-info" href="' + getDomain() + '/UploadFiles/BranchMaster/' + obj.filename + '" target="blank"><i class="fa fa-eye"></i></a>' +
                               '</td>' +
                               '<td class="Description">' +
                                   '<div id="dx_Description' + postfix + '"></div>' +
                               '</td>' +
                                '<td class="IssueDate">' +
                                   '<div id="dx_IssueDate' + postfix + '"></div>' +
                               '</td>' +
                               '<td class="ExpiryDate">' +
                                   '<div id="dx_ExpiryDate' + postfix + '"></div>' +
                               '</td>' +
                               '<td class="DocumentType">' +
                                   '<div id="dx_DocumentType' + postfix + '"></div>' +
                               '</td>' +
                               '<td class="DocumentNo">' +
                                   '<div id="dx_DocumentNo' + postfix + '"></div>' +
                               '</td>' +
                               '<td class="text-center">' +
                                 '<a href="javascript:void(0);" onclick="BranchMasterView.deleteAttachment(this);" class="btn btn-danger"><i class="fa fa-trash"></i></a>' +
                               '</td>' +
                            '</tr>');

                            BranchMasterView.DetailTableFormInit(postfix, obj);
                            BranchMasterView.variables.RowCount = postfix + 1;
                        });
                    }
                }
                else {
                    DevExVariables.InvalidResponseCode(data);
                }
            },
            error: OnError
        });
        //--------------------------------------------/Get Attachment----------------------------------------------

        if (isU()) {
            BranchMasterView.variables.dx_btnSubmit.option({ visible: true });
        }
        else {
            BranchMasterView.variables.dx_btnSubmit.option({ visible: false });
        }
    },

    deleteRow: function (id) {
        var rowData = BranchMasterView.variables.dx_dataGrid.getVisibleRows()[BranchMasterView.variables.dx_dataGrid.getRowIndexByKey(+id)].data;
        BranchMasterView.variables.Masterid = id;
        BranchMasterView.variables.DeleteDataObj = rowData;
        BranchMasterView.variables.Oper = "Delete";

        //if (BranchMasterView.variables.dx_popupRecordDelete) {
        //    BranchMasterView.variables.dx_popupRecordDelete.option("contentTemplate", BranchMasterView.variables.DeletePopUpOptions.contentTemplate(BranchMasterView.variables.DeleteDataObj).bind(this));
        //}
        //else {
        BranchMasterView.variables.dx_popupRecordDelete = $("#dx_popupRecordDelete").dxPopup(BranchMasterView.variables.DeletePopUpOptions).dxPopup("instance");
        //}

        BranchMasterView.variables.dx_popupRecordDelete.show();
    },

    btnMasterSubmit: function () {
        BranchMasterView.variables.Oper = 'Add';
        BranchMasterView.variables.addedit = "added";

        if (BranchMasterView.variables.Masterid != "0" && parseInt(BranchMasterView.variables.Masterid) > 0) {
            BranchMasterView.variables.Oper = 'Edit';
            BranchMasterView.variables.addedit = 'updated';
        }

        BranchMasterView.variables.dx_btnSubmit.option({ disabled: true });

        var xmlNodeList = "<FILELIST>";
        var saveFiles = "";
        $.each(BranchMasterView.variables.DocumentTypeList, function (key, obj) {
            if (obj) {
                xmlNodeList += '<FILE>';
                var FilePath = $("[rowno='" + obj.rowno + "']").find(".FilePath a").attr("href");
                saveFiles += FilePath + ",";
                xmlNodeList += '<FILENAME>' + obj.Filename + '</FILENAME>';

                if (obj.dx_Description.option().value)
                    xmlNodeList += '<DESCRIPTION>' + obj.dx_Description.option().value + '</DESCRIPTION>';

                if (obj.dx_IssueDate.option().value)
                    xmlNodeList += '<ISSUEDATE>' + obj.dx_IssueDate.option().text + '</ISSUEDATE>';

                if (obj.dx_ExpiryDate.option().value)
                    xmlNodeList += '<EXPIRYDATE>' + obj.dx_ExpiryDate.option().text + '</EXPIRYDATE>';

                if (obj.dx_DocumentType.option().value)
                    xmlNodeList += '<DOCUMENTTYPE>' + obj.dx_DocumentType.option().value + '</DOCUMENTTYPE>';

                if (obj.dx_DocumentNo.option().value)
                    xmlNodeList += '<DOCUMENTNO>' + obj.dx_DocumentNo.option().value + '</DOCUMENTNO>';

                xmlNodeList += '</FILE>';
            }
        });
        xmlNodeList += "</FILELIST>";

        var data = {
            "BRANCHMASID": BranchMasterView.variables.Masterid,
            "BANKACCID": BranchMasterView.variables.dx_txtBankName.option().selectedItem.accid,
            "BRANCHMASNAME": BranchMasterView.variables.dx_txtBranchName.option().value,
            "BRANCHMASCODE": BranchMasterView.variables.dx_txtBranchCode.option().value,
            "COMPANYMASID": BranchMasterView.variables.dx_ddlComapny.option().value,
            //"MOBILENO": BranchMasterView.variables.dx_txtMobileNo.option().value,
            "EMAILID": BranchMasterView.variables.dx_txtEmailId.option().value,
            //"ADDRESS": BranchMasterView.variables.dx_txtaddress.option().value,
            //"GSTNO": BranchMasterView.variables.dx_txtGstNo.option().value,
            "CITYID": BranchMasterView.variables.dx_ddlCity.option().value,
            "STATEID": BranchMasterView.variables.dx_ddlState.option().value,
            "COUNTRYID": BranchMasterView.variables.dx_ddlcountry.option().value,
            "ISACTIVE": BranchMasterView.variables.dx_switchIsActive.option().value,
            XMLPARAM: escape(xmlNodeList),
            "oper": BranchMasterView.variables.Oper,
        }
        if (BranchMasterView.variables.dx_txtMobileNo.option().value)
            data.MOBILENO = BranchMasterView.variables.dx_txtMobileNo.option().value;

        if (BranchMasterView.variables.dx_txtaddress.option().value)
            data.ADDRESS = BranchMasterView.variables.dx_txtaddress.option().value;

        //-----------------------save attachment-------------------------

        $.ajax({
            type: 'POST',
            async: false,
            cache: false,
            url: getDomain() + "/Common/SaveImage",
            data: {
                category: "BranchMaster",
                deletedfiles: BranchMasterView.variables.deletedFiles,
                savefiles: saveFiles
            },
            success: function (result) {
            },
            error: OnError
        });

        //-----------------------/save attachment-------------------------

        BranchMasterView.savedata(data);
    },

    savedata: function (data) {
        $.ajax({
            url: getDomain() + BranchMasterView.variables.PerformMasterOperationUrl,
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
            success: BranchMasterView.btnMasterSubmitOnSuccess,
            error: OnError,
        });
    },

    btnMasterSubmitOnSuccess: function (data) {
        if ($(data).find('RESPONSECODE').text() == "0") {
            if (BranchMasterView.variables.dx_popupRecordDelete) {
                BranchMasterView.variables.dx_popupRecordDelete.hide();
            }
            DevExVariables.Toaster("success", 'Record is ' + BranchMasterView.variables.addedit + ' successfully');
            $('#frm_CompanyMaster').hide();
            $('#pnlView').show();

            BranchMasterView.ClearValues();
            BranchMasterView.variables.dx_dataGrid.refresh();
            // BranchMasterView.variables.dx_popupRecordDelete.hide();
        }
        else {
            InvalidResponseCode(data);
        }

        BranchMasterView.variables.dx_btnSubmit.option({ disabled: false });

    },

    btnMasterDelete: function () {
        $('#btnDelete').attr('disabled', true);
        var data = {
            "oper": BranchMasterView.variables.Oper,
            "GROUPID": $("#hdngroup").val()
        }
        BranchMasterView.savedata(data);
    },

    ClearValues: function () {
        BranchMasterView.variables.dx_txtBranchName.option({ value: "" });
        BranchMasterView.variables.dx_txtBranchCode.option({ value: "" });
        BranchMasterView.variables.dx_ddlComapny.option({ value: "" });
        //BranchMasterView.variables.dx_txtGstNo.option({ value: "" });
        BranchMasterView.variables.dx_txtMobileNo.option({ value: "" });
        BranchMasterView.variables.dx_txtEmailId.option({ value: "" });
        BranchMasterView.variables.dx_txtaddress.option({ value: "" });
        BranchMasterView.variables.dx_ddlcountry.option({ value: "" });
        BranchMasterView.variables.dx_ddlState.option({ value: "" });
        BranchMasterView.variables.dx_ddlCity.option({ value: "" });
        BranchMasterView.variables.dx_switchIsActive.option({ value: true });

        BranchMasterView.variables.DocumentTypeList = [],
        BranchMasterView.variables.RowCount = 1;
        BranchMasterView.variables.deletedFiles = "";
        BranchMasterView.variables.dx_dataGrid.refresh();

        BranchMasterView.variables.Oper = 'Add';
        BranchMasterView.variables.Masterid = '';
        $("#tbody_AttachmentsList").html("");
        $('#frm_CompanyMaster').hide();
        $('#pnlView').show();

        // BranchMasterView.variables.dx_popupRecordDelete.hide();
    },

    FormInitialize: function () {
        BranchMasterView.variables.dx_txtBranchName = $("#dx_txtBranchName").dxTextBox({
            placeholder: "Enter Branch Name...",
        }).dxValidator({
            validationRules: [{
                type: "required",
                message: "Branch Name is required"
            }]
        }).dxTextBox("instance");

        BranchMasterView.variables.dx_txtBankName = $("#dx_txtBankName").dxAutocomplete({
            placeholder: "Enter Bank Name...",
            mode: "search",
            dataSource: new DevExpress.data.CustomStore({
                load: function (loadOptions) {
                    var deferred = $.Deferred();

                    var myfilter = { rules: [] };
                    myfilter.rules.push({ field: "HEADNAME", op: "eq", data: "Bank Account" });

                    $.ajax({
                        url: getDomain() + BranchMasterView.variables.BindAccListUrl+ "&_search=true&searchField=ACCOUNTNAME&searchOper=cn&searchString=" + loadOptions.searchValue + "&myfilters=" + JSON.stringify(myfilter),
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
        }).dxValidator({
            //validationRules: [{
            //    type: "required",
            //    message: "Bank Name is required"
            //}]
        }).dxAutocomplete("instance");

        BranchMasterView.variables.dx_txtBranchCode = $("#dx_txtBranchCode").dxTextBox({
            placeholder: "Br Code...",
        }).dxTextBox("instance");

        BranchMasterView.variables.dx_ddlComapny = $("#dx_ddlComapny").dxSelectBox({
            dataSource: ["1"],
            placeholder: "Select Company...",
            searchEnabled: true
            //,onValueChanged: function (data) {
            //    BranchMasterView.GetSubCategoryList(data.value);
            //    BranchMasterView.GetJewSizeList(data.value);
            //}
        }).dxValidator({
            validationRules: [{
                type: "required",
                message: "Company is required"
            }]
        }).dxSelectBox("instance");

        //BranchMasterView.variables.dx_txtGstNo = $("#dx_txtGstNo").dxTextBox({
        //    placeholder: "Enter GST NO...",
        //}).dxTextBox("instance"); 
        BranchMasterView.variables.dx_txtMobileNo = $("#dx_txtMobileNo").dxTextBox({
            mode: "number",
            placeholder: "Enter Mobile No...",
        }).dxTextBox("instance");

        BranchMasterView.variables.dx_txtEmailId = $("#dx_txtEmailId").dxTextBox({
            placeholder: "Enter Email Id...",
        }).dxTextBox("instance");

        BranchMasterView.variables.dx_txtaddress = $("#dx_txtaddress").dxTextArea({
            height: 60,
            placeholder: "Enter Address...",
        }).dxTextArea("instance");

        BranchMasterView.variables.dx_ddlcountry = $("#dx_ddlcountry").dxSelectBox({
            placeholder: "Select Country...",
            searchEnabled: true
            , onValueChanged: function (data) {
                if (data.value)
                    BranchMasterView.GetStateList(data.value);
            }
        }).dxValidator({
            validationRules: [{
                type: "required",
                message: "Country is required"
            }]
        }).dxSelectBox("instance");

        BranchMasterView.variables.dx_ddlState = $("#dx_ddlState").dxSelectBox({
            placeholder: "Select State...",
            searchEnabled: true
            , onValueChanged: function (data) {
                BranchMasterView.GetCityList(data.value);
            }
        }).dxValidator({
            validationRules: [{
                type: "required",
                message: "State is required"
            }]
        }).dxSelectBox("instance");

        BranchMasterView.variables.dx_ddlCity = $("#dx_ddlCity").dxSelectBox({
            placeholder: "Select City...",
            searchEnabled: true
        }).dxValidator({
            validationRules: [{
                type: "required",
                message: "City is required"
            }]
        }).dxSelectBox("instance");

        BranchMasterView.variables.dx_switchIsActive = $("#dx_switchIsActive").dxSwitch({
            value: true,
            switchedOnText: "Yes",
            switchedOffText: "No"
        }).dxSwitch("instance");

        BranchMasterView.variables.dx_btnSubmit = $("#dx_btnSubmit").dxButton({
            icon: "check",
            text: "Submit",
            type: "success",
            onClick: function (e) {
                var validation = e.validationGroup.validate();
                if (!validation.isValid) {
                    DevExVariables.Toaster("warning", "Please fill all required fields before submit.");
                    return;
                }
                BranchMasterView.btnMasterSubmit();
                e.validationGroup.reset();
            }
        }).dxButton("instance");

        BranchMasterView.variables.dx_btnCancel = $("#dx_btnCancel").dxButton({
            icon: "close",
            text: "Cancel",
            type: "danger",
            onClick: function (e) {
                BranchMasterView.ClearValues();
                e.validationGroup.reset();
            }
        }).dxButton("instance");

        BranchMasterView.variables.dx_btnAddNew = $("#dx_btnAddNew").dxButton({
            stylingMode: "outlined",
            icon: "plus",
            text: "Add New",
            type: "default",
            onClick: function (e) {
                e.validationGroup.reset();

                $("#frm_CompanyMaster").show();
                $("#pnlView").hide();

                BranchMasterView.variables.dx_txtBranchName.focus();
            }
        }).dxButton("instance");

        BranchMasterView.RegisterFileUpload('inputCADFile', 'lnkCADFilePreview', "#ItemimgError");
    },

    GetCompanyList: function () {
        //var myfilter = { rules: [] };
        //myfilter.rules.push({ field: "TYPE", op: "eq", data: "DesgCate" });

        $.ajax({
            url: getDomain() + "/Common/BindMastersDetails?ServiceName=COMPANYMASTER_GET", //+ "&myfilters=" + JSON.stringify(myfilter),
            async: true,
            cache: false,
            type: 'POST',
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    var JsonObject = xml2json.parser(data);
                    if (JsonObject.serviceresponse.detailslist) {
                        BranchMasterView.variables.dx_ddlComapny.option({
                            dataSource: new DevExpress.data.ArrayStore({
                                data: JsonObject.serviceresponse.detailslist.details,
                                key: "companyid"
                            }),
                            displayExpr: "companyname",
                            valueExpr: "companyid",
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

    GetCoutryList: function () {
        //var myfilter = { rules: [] };
        //myfilter.rules.push({ field: "TYPE", op: "eq", data: "DesgCate" });

        $.ajax({
            url: getDomain() + "/Common/BindMastersDetails?ServiceName=MASTER_COUNTRY_STATE_CITY_GET&ColumnRequested=COUNTRY&ISRECORDALL=true", //+ "&myfilters=" + JSON.stringify(myfilter),
            async: true,
            cache: false,
            type: 'POST',
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    var JsonObject = xml2json.parser(data);
                    if (JsonObject.serviceresponse.detailslist) {
                        BranchMasterView.variables.dx_ddlcountry.option({
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

    GetStateList: function (CityId) {
        $.ajax({
            url: getDomain() + "/Common/BindMastersDetails?ServiceName=MASTER_COUNTRY_STATE_CITY_GET&ColumnRequested=STATE&ISRECORDALL=true&_search=true&searchField=COUNTRYID&searchOper=eq&searchString=" + CityId, //+ "&myfilters=" + JSON.stringify(myfilter),
            async: true,
            cache: false,
            type: 'POST',
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    var JsonObject = xml2json.parser(data);
                    if (JsonObject.serviceresponse.detailslist) {
                        BranchMasterView.variables.dx_ddlState.option({
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

    GetCityList: function (Stateid) {
        $.ajax({
            url: getDomain() + "/Common/BindMastersDetails?ServiceName=MASTER_COUNTRY_STATE_CITY_GET&ColumnRequested=CITY&ISRECORDALL=true&_search=true&searchField=STATEID&searchOper=eq&searchString=" + Stateid, //+ "&myfilters=" + JSON.stringify(myfilter),
            async: true,
            cache: false,
            type: 'POST',
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    var JsonObject = xml2json.parser(data);
                    if (JsonObject.serviceresponse.detailslist) {
                        BranchMasterView.variables.dx_ddlCity.option({
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

    DetailTableFormInit: function (postfix, obj) {
        /*----------------------Registration of Files Table controls---------------------*/
        var temp = $("[rowno='" + postfix + "'] .FilePath a").attr("href");
        temp = temp.substr(temp.lastIndexOf("/") + 1);

        var tmp = [];
        tmp[postfix] = { rowno: postfix, Filename: temp, dx_Description: "", dx_IssueDate: "", dx_ExpiryDate: "", dx_DocumentType: "", dx_DocumentNo: "" };

        BranchMasterView.variables.DocumentTypeList = Object.assign(BranchMasterView.variables.DocumentTypeList, tmp);

        BranchMasterView.variables.DocumentTypeList[postfix].dx_Description = $("#dx_Description" + postfix).dxTextBox({
            mode: "text",
            placeholder: "Enter File Description",
            onKeyDown: function (e) {
            },
            onFocusOut: function (data) {
            },
        }).dxValidator({
            validationRules: [{
                type: "required",
                message: "FileDescription is required"
            }]
        }).dxTextBox("instance");

        BranchMasterView.variables.DocumentTypeList[postfix].dx_IssueDate = $("#dx_IssueDate" + postfix).dxDateBox({
            type: "date",
            //value: now,
            showClearButton: true,
            useMaskBehavior: true,
            displayFormat: "dd MMM yyyy",
        }).dxDateBox("instance");

        BranchMasterView.variables.DocumentTypeList[postfix].dx_ExpiryDate = $("#dx_ExpiryDate" + postfix).dxDateBox({
            type: "date",
            //value: now,
            showClearButton: true,
            useMaskBehavior: true,
            displayFormat: "dd MMM yyyy",
        }).dxDateBox("instance");

        BranchMasterView.variables.DocumentTypeList[postfix].dx_DocumentType = $("#dx_DocumentType" + postfix).dxSelectBox({
            dataSource: BranchMasterView.variables.DocumentType,
            valueExpr: "id",
            displayExpr: "name",
            placeholder: "Select Documenttype...",
            searchEnabled: true,
            onItemClick: function (data) {
            },
            onFocusOut: function (data) {
            },
        }).dxValidator({
            validationRules: [{
                type: "required",
                message: "DocumentType is required"
            }]
        }).dxSelectBox("instance");

        BranchMasterView.variables.DocumentTypeList[postfix].dx_DocumentNo = $("#dx_DocumentNo" + postfix).dxTextBox({
            mode: "text",
            onKeyDown: function (e) {
            },
            onFocusOut: function (data) {
            },
        }).dxTextBox("instance");

        /*----------------------Set Value of Detail table controls while Edit---------------------*/
        if (obj) {
            BranchMasterView.variables.DocumentTypeList[postfix].dx_Description.option({ value: obj.description })
            BranchMasterView.variables.DocumentTypeList[postfix].dx_IssueDate.option({ value: obj.issuedate })
            BranchMasterView.variables.DocumentTypeList[postfix].dx_ExpiryDate.option({ value: obj.expirydate })
            BranchMasterView.variables.DocumentTypeList[postfix].dx_DocumentType.option({ value: obj.documenttype });
            BranchMasterView.variables.DocumentTypeList[postfix].dx_DocumentNo.option({ value: obj.documentno });
        }
        /*----------------------Set Value of Detail table controls while Edit---------------------*/

    },

    deleteAttachment: function (obj) {
        var file = BranchMasterView.variables.DocumentTypeList[$(obj).closest("tr").attr("rowno")].Filename;
        delete BranchMasterView.variables.DocumentTypeList[$(obj).closest("tr").attr("rowno")];
        $(obj).closest("tr").remove();
        BranchMasterView.variables.deletedFiles += file + ',';
    },

    GetDocumentType: function () {
        var myfilter = { rules: [] };
        myfilter.rules.push({ field: "TYPE", op: "eq", data: 'DOCTYPE' });
        $.ajax({
            url: getDomain() + BranchMasterView.variables.BindDocumentType + "&myfilters=" + JSON.stringify(myfilter),
            async: true,
            cache: false,
            type: 'POST',
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    var JsonObject = xml2json.parser(data);
                    if (JsonObject.serviceresponse.detailslist) {
                        if (JsonObject.serviceresponse.detailslist.details.length) {
                            BranchMasterView.variables.DocumentType = JsonObject.serviceresponse.detailslist.details;
                        }
                        else {
                            BranchMasterView.variables.DocumentType.push(JsonObject.serviceresponse.detailslist.details);
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

};

$(document).ready(function () {
    BranchMasterView.FormInitialize();
    BranchMasterView.initializeDevExgrid();
    $("#btnAddNew").click(function () {
        $('#frm_CompanyMaster').show();
        $('#pnlView').hide();
    });
    BranchMasterView.GetCompanyList();
    BranchMasterView.GetCoutryList();
    BranchMasterView.GetDocumentType();

    BranchMasterView.RegisterFileUpload('inputCADFile', 'lnkCADFilePreview', "#ItemimgError");

    $("#lnkCADFilePreview").click(function () {
        var url = $("#lnkCADFilePreview").attr("FileName")
        if (isDW())
            window.open(url);
    });

    $('#modalUpload').on('show.bs.modal', function (e) {
        $('#hdnPreviewUploader').val(e.relatedTarget.dataset.preview);
        $('#hdnExtUploader').val(e.relatedTarget.dataset.ext);
        RegisterMultipleFileUpload('#imgUploader', e.relatedTarget.dataset.ext);
        $("#spExtension").html(e.relatedTarget.dataset.ext);
    });

    $('#btnAddFile').click(function () {
        var strHref = '', file = '', fileid = '00000000-0000-0000-0000-000000000000', displayFile = '';
        $('#imgUploader .plupload_filelist').find('li').each(function (key, obj) {
            if ($(obj).find('.plupload_file_name a').length > 0) {
                strHref = $(obj).find('.plupload_file_name a').attr('href');
                file = strHref.substr(strHref.lastIndexOf('/') + 1).split('.')[0];
                displayFile = $(obj).find('.plupload_file_name a').html();

                var postfix = BranchMasterView.variables.RowCount;

                $('#' + $('#hdnPreviewUploader').val()).append('<tr id="' + file + '" fileid="' + fileid + '" rowno="' + postfix + '">' +
                    '<td class="FilePath text-center">' +
                        '<a class="btn btn-info" href="' + strHref + '" target="blank"><i class="fa fa-eye"></i></a>' +
                    '</td>' +
                    '<td class="Description">' +
                        '<div id="dx_Description' + postfix + '"></div>' +
                    '</td>' +
                    '<td class="IssueDate">' +
                        '<div id="dx_IssueDate' + postfix + '"></div>' +
                    '</td>' +
                     '<td class="ExpiryDate">' +
                        '<div id="dx_ExpiryDate' + postfix + '"></div>' +
                    '</td>' +
                    '<td class="DocumentType">' +
                        '<div id="dx_DocumentType' + postfix + '"></div>' +
                    '</td>' +
                    '<td class="DocumentNo">' +
                        '<div id="dx_DocumentNo' + postfix + '"></div>' +

                    '</td>' +
                    '<td class="text-center">' +
                        '<a href="javascript:void(0);" onclick="BranchMasterView.deleteAttachment(this);" class="btn btn-danger"><i class="fa fa-trash"></i></a>' +
                    '</td>' +
                '</tr>');
                BranchMasterView.DetailTableFormInit(postfix);

                BranchMasterView.variables.RowCount = postfix + 1;

            }
        });

        $('#modalUpload').modal('hide');
    });

});