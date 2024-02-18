var CompanyMasterView = {
    variables: {
        BindGroupListUrl: "/Common/BindMastersDetails?ServiceName=COMPANYMASTER_GET",
        PerformMasterOperationUrl: "/Common/OpeartionsOnMaster?ServiceName=COMPANYMASTER_CRUD",
        BindDocumentType: "/Common/BindMastersDetails?ServiceName=STATIC_MASTER_GET",
        Oper: 'Add',
        addedit: "added",
        Masterid: "",
        dx_btnAddNew: "",
        dx_txtCompanyName: "",
        dx_txtCompanyCode: "",
        dx_switchIsActive: "",
        dx_btnSubmit: "",
        dx_btnCancel: "",
        dx_dataGrid: "",

        dx_txtMobileNo: "",
        dx_txtEmailId: "",
        dx_txtaddress: "",
        dx_ddlcountry: "",
        dx_ddlState: "",
        dx_ddlCity: "",

        dx_ExpiryDate: "",
        dx_Description: "",
        dx_DocumentType: "",
        dx_DocumentNo: "",
        DocumentType: [],
        DocumentTypeList: [],
        RowCount: 1,
        deletedFiles:"",




        dx_popupRecordDelete: "",
        DeleteDataObj: "",
        DeletePopUpOptions: {
            width: 300,
            height: 200,
            contentTemplate: function () {
                return $("<div />").append(
                    $("<p>Company Code: <span>" + CompanyMasterView.variables.DeleteDataObj.companycode + "</span></p>"),
                    $("<p>Company Name: <span>" + CompanyMasterView.variables.DeleteDataObj.companyname + "</span></p>")
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
                            "COMPANYMASID": CompanyMasterView.variables.Masterid,
                            "oper": CompanyMasterView.variables.Oper,
                        }

                        CompanyMasterView.savedata(data);
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
        CompanyMasterView.variables.dx_dataGrid = $("#dx_dataGrid").dxDataGrid({
            dataSource: new DevExpress.data.CustomStore({
                key: "companyid",
                load: function (loadOptions) {
                    var deferred = $.Deferred();

                    var result = DevExVariables.GetDataList(loadOptions, CompanyMasterView.variables.BindGroupListUrl);

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
            columns: [{ dataField: "companyid", allowFiltering: false, allowSorting: true, sortIndex: 1, sortOrder: "desc", visible: false },
                { dataField: "companycode", caption: "Company Code", dataType: "string", filterOperations: ["contains"], allowSorting: true, allowFiltering: true, allowHeaderFiltering: false },
                { dataField: "companyname", caption: "Company Name", dataType: "string", filterOperations: ["contains"], allowSorting: true, allowFiltering: true, allowHeaderFiltering: false },
                { dataField: "mobileno", caption: "Mobile No", dataType: "string", filterOperations: ["contains"], allowSorting: true, allowFiltering: true, allowHeaderFiltering: false },
                { dataField: "emailid", caption: "Email Id", dataType: "string", filterOperations: ["contains"], allowSorting: true, allowFiltering: true, allowHeaderFiltering: false },
                { dataField: "address", caption: "Address", dataType: "string", filterOperations: ["contains"], allowSorting: true, allowFiltering: true, allowHeaderFiltering: false },
                { dataField: "countryname", caption: "Country", dataType: "string", filterOperations: ["contains"], allowSorting: true, allowFiltering: true, allowHeaderFiltering: false },
                { dataField: "statename", caption: "State", dataType: "string", filterOperations: ["contains"], allowSorting: true, allowFiltering: true, allowHeaderFiltering: false },
                { dataField: "cityname", caption: "City", dataType: "string", filterOperations: ["contains"], allowSorting: true, allowFiltering: true, allowHeaderFiltering: false },
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
                        DevExVariables.ActionTemplate(container, options, true, true, "CompanyMasterView");
                    }
                },
            ]
        }).dxDataGrid("instance");
    },

    triggerId: function (id) {
        var rowData = CompanyMasterView.variables.dx_dataGrid.getVisibleRows()[CompanyMasterView.variables.dx_dataGrid.getRowIndexByKey(+id)].data;
        CompanyMasterView.variables.Masterid = id;
        CompanyMasterView.variables.dx_txtCompanyName.option({ value: rowData.companyname });
        CompanyMasterView.variables.dx_txtCompanyCode.option({ value: rowData.companycode });
        CompanyMasterView.variables.dx_txtMobileNo.option({ value: rowData.mobileno });
        CompanyMasterView.variables.dx_txtEmailId.option({ value: rowData.emailid });
        CompanyMasterView.variables.dx_txtaddress.option({ value: rowData.address });
        CompanyMasterView.variables.dx_ddlCity.option({ value: rowData.cityid });
        CompanyMasterView.variables.dx_ddlState.option({ value: rowData.stateid });
        CompanyMasterView.variables.dx_ddlcountry.option({ value: rowData.countryid });
        CompanyMasterView.variables.dx_switchIsActive.option({ value: rowData.isactive });
        $("#frm_CompanyMaster").show();
        $("#pnlView").hide();

        //--------------------------------------------Get Attachment----------------------------------------------
        $("#AttachmentsList").show();
        $('#tbody_AttachmentsList').html("");
        var myfilter = { rules: [] };
        myfilter.rules.push({ field: "CompanyId", op: "eq", data: id });
        $.ajax({
            url: getDomain() + "/Common/BindMastersDetails?ServiceName=COMPANYMASTER_FILES_GET&myfilters=" + JSON.stringify(myfilter),
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
                            //    CompanyMasterView.AddNewLineDetails(obj);
                            var postfix = CompanyMasterView.variables.RowCount;
                            var file = (obj.filename).split(".")[0];
                            $('#tbody_AttachmentsList').append('<tr id="' + file + '" fileid="' + obj.fileid + '" rowno="' + postfix + '">' +
                              '<td class="FilePath text-center">' +
                              '<a class="btn btn-info" href="' + getDomain() + '/UploadFiles/CompanyMaster/' + obj.filename + '" target="blank"><i class="fa fa-eye"></i></a>' +
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
                                 '<a href="javascript:void(0);" onclick="CompanyMasterView.deleteAttachment(this);" class="btn btn-danger"><i class="fa fa-trash"></i></a>' +
                               '</td>' +
                            '</tr>');

                            CompanyMasterView.DetailTableFormInit(postfix, obj);
                            CompanyMasterView.variables.RowCount = postfix + 1;
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
            CompanyMasterView.variables.dx_btnSubmit.option({ visible: true });
        }
        else {
            CompanyMasterView.variables.dx_btnSubmit.option({ visible: false });
        }
    },

    deleteRow: function (id) {
        var rowData = CompanyMasterView.variables.dx_dataGrid.getVisibleRows()[CompanyMasterView.variables.dx_dataGrid.getRowIndexByKey(+id)].data;
        CompanyMasterView.variables.Masterid = id;
        CompanyMasterView.variables.DeleteDataObj = rowData;
        CompanyMasterView.variables.Oper = "Delete";

        if (CompanyMasterView.variables.dx_popupRecordDelete) {
            CompanyMasterView.variables.dx_popupRecordDelete.option("contentTemplate", CompanyMasterView.variables.DeletePopUpOptions.contentTemplate(CompanyMasterView.variables.DeleteDataObj).bind(this));
        }
        else {
            CompanyMasterView.variables.dx_popupRecordDelete = $("#dx_popupRecordDelete").dxPopup(CompanyMasterView.variables.DeletePopUpOptions).dxPopup("instance");
        }

        CompanyMasterView.variables.dx_popupRecordDelete.show();
    },

    btnMasterSubmit: function () {
        CompanyMasterView.variables.Oper = 'Add';
        CompanyMasterView.variables.addedit = "added";

        if (CompanyMasterView.variables.Masterid != "0" && parseInt(CompanyMasterView.variables.Masterid) > 0) {
            CompanyMasterView.variables.Oper = 'Edit';
            CompanyMasterView.variables.addedit = 'updated';
        }

        CompanyMasterView.variables.dx_btnSubmit.option({ disabled: true });

        var xmlNodeList = "<FILELIST>";
        var saveFiles = "";
        $.each(CompanyMasterView.variables.DocumentTypeList, function (key, obj) {
            if (obj) {
                xmlNodeList += '<FILE>';
                var FilePath = $("[rowno='"+obj.rowno+"']").find(".FilePath a").attr("href");
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
            "COMPANYMASID": CompanyMasterView.variables.Masterid,
            "COMPANYMASNAME": CompanyMasterView.variables.dx_txtCompanyName.option().value,
            "COMPANYMASCODE": CompanyMasterView.variables.dx_txtCompanyCode.option().value,
            //"MOBILENO": CompanyMasterView.variables.dx_txtMobileNo.option().value,
            //"EMAILID": CompanyMasterView.variables.dx_txtEmailId.option().value,
            //"ADDRESS": CompanyMasterView.variables.dx_txtaddress.option().value,
            "CITYID": CompanyMasterView.variables.dx_ddlCity.option().value,
            "STATEID": CompanyMasterView.variables.dx_ddlState.option().value,
            "COUNTRYID": CompanyMasterView.variables.dx_ddlcountry.option().value,
            "ISACTIVE": CompanyMasterView.variables.dx_switchIsActive.option().value,
            XMLPARAM: escape(xmlNodeList),
            "oper": CompanyMasterView.variables.Oper,
        }

        if (CompanyMasterView.variables.dx_txtMobileNo.option().value)
            data.MOBILENO = CompanyMasterView.variables.dx_txtMobileNo.option().value;

        if (CompanyMasterView.variables.dx_txtEmailId.option().value)
            data.EMAILID = CompanyMasterView.variables.dx_txtEmailId.option().value;

        if (CompanyMasterView.variables.dx_txtaddress.option().value)
            data.ADDRESS = CompanyMasterView.variables.dx_txtaddress.option().value;
        //-----------------------save attachment-------------------------
        
            $.ajax({
                type: 'POST',
                async: false,
                cache: false,
                url: getDomain() + "/Common/SaveImage",
                data: {
                    category: "CompanyMaster",
                    deletedfiles: CompanyMasterView.variables.deletedFiles,
                    savefiles: saveFiles
                },
                success: function (result) {
                },
                error: OnError
            });
        
        //-----------------------/save attachment-------------------------

        CompanyMasterView.savedata(data);
    },

    savedata: function (data) {
        $.ajax({
            url: getDomain() + CompanyMasterView.variables.PerformMasterOperationUrl,
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
            success: CompanyMasterView.btnMasterSubmitOnSuccess,
            error: OnError,
        });
    },

    btnMasterSubmitOnSuccess: function (data) {
        if ($(data).find('RESPONSECODE').text() == "0") {
            DevExVariables.Toaster("success", 'Record is ' + CompanyMasterView.variables.addedit + ' successfully');
            $('#frm_CompanyMaster').hide();
            $('#pnlView').show();

            CompanyMasterView.ClearValues();
        }
        else {
            InvalidResponseCode(data);
        }

        CompanyMasterView.variables.dx_btnSubmit.option({ disabled: false });

    },

    ClearValues: function () {
        CompanyMasterView.variables.Masterid = "";
        CompanyMasterView.variables.Oper = 'Add';
        CompanyMasterView.variables.addedit = "added";
        CompanyMasterView.variables.DeleteDataObj = "";
        //CompanyMasterView.variables.DocumentType = [],
        
        CompanyMasterView.variables.DocumentTypeList = [],
        CompanyMasterView.variables.RowCount = 1;
        CompanyMasterView.variables.dx_txtCompanyName.option({ value: "" });
        CompanyMasterView.variables.dx_txtCompanyCode.option({ value: "" });
        CompanyMasterView.variables.dx_txtMobileNo.option({ value: "" });
        CompanyMasterView.variables.dx_txtEmailId.option({ value: "" });
        CompanyMasterView.variables.dx_txtaddress.option({ value: "" });
        CompanyMasterView.variables.dx_ddlCity.option({ value: "" });
        CompanyMasterView.variables.dx_ddlState.option({ value: "" });
        CompanyMasterView.variables.dx_ddlcountry.option({ value: "" });
        CompanyMasterView.variables.deletedFiles = "";
        CompanyMasterView.variables.dx_switchIsActive.option({ value: true });
        if (CompanyMasterView.variables.dx_popupRecordDelete)
            CompanyMasterView.variables.dx_popupRecordDelete.hide();
        $("#tbody_AttachmentsList").html("");
        $('#frm_CompanyMaster').hide();
        $('#pnlView').show();
        CompanyMasterView.variables.dx_dataGrid.refresh();

    },

    FormInitialize: function () {
        CompanyMasterView.variables.dx_txtCompanyName = $("#dx_txtCompanyName").dxTextBox({
            placeholder: "Enter Company Name...",
        }).dxValidator({
            validationRules: [{
                type: "required",
                message: "Company Name is required"
            }]
        }).dxTextBox("instance");

        CompanyMasterView.variables.dx_txtCompanyCode = $("#dx_txtCompanyCode").dxTextBox({
            placeholder: "Enter Code...",
        }).dxValidator({
            validationRules: [{
                type: "required",
                message: "Company Code is required"
            }]
        }).dxTextBox("instance");

        CompanyMasterView.variables.dx_txtMobileNo = $("#dx_txtMobileNo").dxTextBox({
            placeholder: "Enter Mobile No...",
        }).dxTextBox("instance");

        CompanyMasterView.variables.dx_txtEmailId = $("#dx_txtEmailId").dxTextBox({
            placeholder: "Enter Email Id...",
        }).dxTextBox("instance");

        CompanyMasterView.variables.dx_txtaddress = $("#dx_txtaddress").dxTextArea({
            height: 60,
            placeholder: "Enter Address...",
        }).dxTextArea("instance");

        CompanyMasterView.variables.dx_ddlcountry = $("#dx_ddlcountry").dxSelectBox({
            placeholder: "Select Country...",
            searchEnabled: true
            , onValueChanged: function (data) {
                if (data.value)
                    CompanyMasterView.GetStateList(data.value);
            }
        }).dxValidator({
            validationRules: [{
                type: "required",
                message: "Country is required"
            }]
        }).dxSelectBox("instance");

        CompanyMasterView.variables.dx_ddlState = $("#dx_ddlState").dxSelectBox({
            placeholder: "Select State...",
            searchEnabled: true
            , onValueChanged: function (data) {
                CompanyMasterView.GetCityList(data.value);
            }
        }).dxValidator({
            validationRules: [{
                type: "required",
                message: "State is required"
            }]
        }).dxSelectBox("instance");

        CompanyMasterView.variables.dx_ddlCity = $("#dx_ddlCity").dxSelectBox({
            placeholder: "Select City...",
            searchEnabled: true
        }).dxValidator({
            validationRules: [{
                type: "required",
                message: "City is required"
            }]
        }).dxSelectBox("instance");

        CompanyMasterView.variables.dx_switchIsActive = $("#dx_switchIsActive").dxSwitch({
            value: true,
            switchedOnText: "Yes",
            switchedOffText: "No"
        }).dxSwitch("instance");

        CompanyMasterView.variables.dx_btnSubmit = $("#dx_btnSubmit").dxButton({
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

                CompanyMasterView.btnMasterSubmit();

                //e.validationGroup.reset();
            }
        }).dxButton("instance");

        CompanyMasterView.variables.dx_btnCancel = $("#dx_btnCancel").dxButton({
            icon: "close",
            text: "Cancel",
            type: "danger",
            onClick: function (e) {
                CompanyMasterView.ClearValues();
                e.validationGroup.reset();
            }
        }).dxButton("instance");

        CompanyMasterView.variables.dx_btnAddNew = $("#dx_btnAddNew").dxButton({
            stylingMode: "outlined",
            icon: "plus",
            text: "Add New",
            type: "default",
            onClick: function (e) {
                e.validationGroup.reset();

                $("#frm_CompanyMaster").show();
                $("#pnlView").hide();

                CompanyMasterView.variables.dx_txtCompanyName.focus();
            }
        }).dxButton("instance");

        CompanyMasterView.RegisterFileUpload('inputCADFile', 'lnkCADFilePreview', "#ItemimgError");

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
                        CompanyMasterView.variables.dx_ddlcountry.option({
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
                        CompanyMasterView.variables.dx_ddlState.option({
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
                        CompanyMasterView.variables.dx_ddlCity.option({
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

    GetDocumentType: function () {
        var myfilter = { rules: [] };
        myfilter.rules.push({ field: "TYPE", op: "eq", data: 'DOCTYPE' });
        $.ajax({
            url: getDomain() + CompanyMasterView.variables.BindDocumentType + "&myfilters=" + JSON.stringify(myfilter),
            async: true,
            cache: false,
            type: 'POST',
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    var JsonObject = xml2json.parser(data);
                    if (JsonObject.serviceresponse.detailslist) {
                        if (JsonObject.serviceresponse.detailslist.details.length) {
                            CompanyMasterView.variables.DocumentType = JsonObject.serviceresponse.detailslist.details;
                        }
                        else {
                            CompanyMasterView.variables.DocumentType.push(JsonObject.serviceresponse.detailslist.details);
                        }
                    }
                }
                else {
                    DevExVariables.InvalidResponseCode(data);
                }
            },
            //success: function (data) {
            //    if ($(data).find('RESPONSECODE').text() == "0") {
            //        var JsonObject = xml2json.parser(data);
            //        if (JsonObject.serviceresponse.detailslist) {
            //            CompanyMasterView.variables.dx_DocumentType.option({
            //                dataSource: new DevExpress.data.ArrayStore({
            //                    data: JsonObject.serviceresponse.detailslist.details,
            //                    key: "id"
            //                }),
            //                displayExpr: "name",
            //                valueExpr: "id",
            //            });
            //        }
            //    }
            //    else {
            //        DevExVariables.InvalidResponseCode(data);
            //    }
            //},
            error: OnError
        });
    },

    deleteAttachment: function (obj) {
        var file = CompanyMasterView.variables.DocumentTypeList[$(obj).closest("tr").attr("rowno")].Filename;
        delete CompanyMasterView.variables.DocumentTypeList[$(obj).closest("tr").attr("rowno")];
        $(obj).closest("tr").remove();
        CompanyMasterView.variables.deletedFiles += file + ',';
    },

    DetailTableFormInit: function (postfix, obj) {
        /*----------------------Registration of Files Table controls---------------------*/
        var temp = $("[rowno='" + postfix + "'] .FilePath a").attr("href");
        temp = temp.substr(temp.lastIndexOf("/") + 1);

        var tmp = [];
        tmp[postfix] = { rowno: postfix, Filename: temp, dx_Description: "", dx_IssueDate: "", dx_ExpiryDate: "", dx_DocumentType: "", dx_DocumentNo: "" };

        CompanyMasterView.variables.DocumentTypeList = Object.assign(CompanyMasterView.variables.DocumentTypeList, tmp);

        CompanyMasterView.variables.DocumentTypeList[postfix].dx_Description = $("#dx_Description" + postfix).dxTextBox({
            mode: "text",
            placeholder: "Enter File Description",
            onKeyDown: function (e) {
            },
            onFocusOut: function (data) {
            },
        }).dxValidator({
            validationRules: [{
                type: "required",
                message: "Unit is required"
            }]
        }).dxTextBox("instance");

        CompanyMasterView.variables.DocumentTypeList[postfix].dx_IssueDate = $("#dx_IssueDate" + postfix).dxDateBox({
            type: "date",
            //value: now,
            showClearButton: true,
            useMaskBehavior: true,
            displayFormat: "dd MMM yyyy",
        }).dxDateBox("instance");

        CompanyMasterView.variables.DocumentTypeList[postfix].dx_ExpiryDate = $("#dx_ExpiryDate" + postfix).dxDateBox({
            type: "date",
            //value: now,
            showClearButton: true,
            useMaskBehavior: true,
            displayFormat: "dd MMM yyyy",
        }).dxDateBox("instance");

        CompanyMasterView.variables.DocumentTypeList[postfix].dx_DocumentType = $("#dx_DocumentType" + postfix).dxSelectBox({
            dataSource: CompanyMasterView.variables.DocumentType,
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
                message: "Unit is required"
            }]
        }).dxSelectBox("instance");

        CompanyMasterView.variables.DocumentTypeList[postfix].dx_DocumentNo = $("#dx_DocumentNo" + postfix).dxTextBox({
            mode: "text",
            onKeyDown: function (e) {
            },
            onFocusOut: function (data) {
            },
        }).dxTextBox("instance");

        /*----------------------Set Value of Detail table controls while Edit---------------------*/
        if (obj) {
            CompanyMasterView.variables.DocumentTypeList[postfix].dx_Description.option({ value: obj.description })
            CompanyMasterView.variables.DocumentTypeList[postfix].dx_IssueDate.option({ value: obj.issuedate })
            CompanyMasterView.variables.DocumentTypeList[postfix].dx_ExpiryDate.option({ value: obj.expirydate })
            CompanyMasterView.variables.DocumentTypeList[postfix].dx_DocumentType.option({ value: obj.documenttype });
            CompanyMasterView.variables.DocumentTypeList[postfix].dx_DocumentNo.option({ value: obj.documentno });
        }
        /*----------------------Set Value of Detail table controls while Edit---------------------*/

    },


};

$(document).ready(function () {
    CompanyMasterView.FormInitialize();
    CompanyMasterView.initializeDevExgrid();
    CompanyMasterView.GetDocumentType();
    //CompanyMasterView.DetailTableFormInit();


    $("#btnAddNew").click(function () {
        $('#frm_CompanyMaster').show();
        $('#pnlView').hide();
    });

    CompanyMasterView.GetCoutryList();

    //----------------------------attachment--------------------------------------------
    CompanyMasterView.RegisterFileUpload('inputCADFile', 'lnkCADFilePreview', "#ItemimgError");

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

                var postfix = CompanyMasterView.variables.RowCount;


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
                        '<a href="javascript:void(0);" onclick="CompanyMasterView.deleteAttachment(this);" class="btn btn-danger"><i class="fa fa-trash"></i></a>' +
                    '</td>' +
                '</tr>');
                CompanyMasterView.DetailTableFormInit(postfix);

                CompanyMasterView.variables.RowCount = postfix + 1;

            }
        });

        $('#modalUpload').modal('hide');
    });
    //----------------------------/attachment--------------------------------------------
});