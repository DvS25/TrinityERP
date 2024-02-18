var MaterialTransactionView = {
    variables: {
        BindStaticDataUrl: "/Common/BindMastersDetails?ServiceName=STATIC_MASTER_GET&IsActive=true",
        BindAccListUrl: "/Common/BindMastersDetails?ServiceName=ACCOUNTMASTER_GET",
        PerformMasterOperationUrl_Party: "/Common/OpeartionsOnMaster?ServiceName=ACCOUNTMASTER_CRUD",
        BindPartyAddress: "/Common/BindMastersDetails?ServiceName=ACCOUNTMASTER_SHIPINGINFO_GET",
        BindTaxProfile: "/Common/BindMastersDetails?ServiceName=ACC_TAXPROFILE_GET",
        BindLockerList: "/Common/BindMastersDetails?ServiceName=LOCKERMASTER_GET",
        BindCurrencyList: "/Common/BindMastersDetails?ServiceName=CURRENCY_EXCHANGERATE_DETAILS_GET",

        BindMainGridListUrl: "/Common/BindMastersDetails?ServiceName=ACC_MATERIALTRANSACTION_GET",
        BindDetailListUrl: "/Common/BindMastersDetails?ServiceName=ACC_MATERIALTRANSACTION_DETAIL_GET",
        PerformMasterOperationUrl: "/Common/OpeartionsOnMaster?ServiceName=ACC_MATERIALTRANSACTION_CRUD",
        BindReturnItemsUrl: "/Common/BindMastersDetails?ServiceName=ACC_MATERIALTRANSACTION_RETURN_DETAIL_GET",
        BindFreight_Deatils: "/Common/BindMastersDetails?ServiceName=ACC_MATERIALTRANSACTION_FREIGHTDEATIL_GET",
        BindStockUrl: "/Common/BindMastersDetails?ServiceName=ACC_MATERIAL_STOCK_GET",
        CreateEinvoice: "/Common/BindMastersDetails?ServiceName=MATERIAL_EINVOICEBILL_CRUD",
        CancleEinvoiceBill: "/Common/BindMastersDetails?ServiceName=MATERIAL_EINVOICEBILL_CANCLE_CRUD",


        VoucherTypeList: ["Retails Invoice", "Tax Invoice"],
        EditFlag: 0,
        Oper: 'Add',
        addedit: "added",
        Masterid: "",
        DeleteDataObj: "",
        RowCount: 1,
        dx_dataGrid: "",
        dx_popupRecordDelete: "",
        DeletePopUpOptions: {
            width: 300,
            height: 200,
            contentTemplate: function () {
                return $("<div />").append(
                    $("<p>Voucher No: <span>" + MaterialTransactionView.variables.DeleteDataObj.voucherno + "</span></p>")
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
                            "MT_ID": MaterialTransactionView.variables.Masterid,
                            "oper": MaterialTransactionView.variables.Oper,
                        }

                        $.ajax({
                            url: getDomain() + MaterialTransactionView.variables.PerformMasterOperationUrl,
                            data: data,
                            async: true,
                            cache: false,
                            type: 'POST',
                            success: function (data) {
                                if ($(data).find('RESPONSECODE').text() == "0") {
                                    DevExVariables.Toaster("success", 'Record is deleted successfully');

                                    MaterialTransactionView.variables.dx_popupRecordDelete.hide();
                                    MaterialTransactionView.variables.dx_dataGrid.refresh();
                                    MaterialTransactionView.variables.Masterid = "";
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

        dx_ddlSubBookMaster: "",
        dx_txtVoucherDate: "",
        dx_txtVoucherNo: "",
        dx_ddlVoucherType: "",
        dx_txtVoucherReturn: "",
        dx_txtDueDays: "",
        dx_ddllocker: "",
        dx_txtPartyName: "",
        dx_txtPartyCode: "",
        dx_ddlOrderby: "",
        dx_TaxProfile: "",
        dx_txtPartyBillNo: "",
        dx_ddlCurrencyName: "",
        dx_txtExchangeRate: "",
        dx_ddlBillingAddress: "",
        dx_ddlShippingAddress: "",
        dx_btnPartyAdd: "",
        dx_btnAddNew: "",
        dx_btnSubmit: "",
        dx_btnCancel: "",
        PartyList_accid: "",
        dx_txtAcc_Name: "",
        dx_txtHeadName: "",
        dx_txtMobileNo: "",
        dx_ddlCountry: "",
        dx_ddlState: "",
        dx_ddlCity: "",
        dx_Party_btnSubmit: "",
        dx_Party_btnCancel: "",
        dx_btnAddDetailItem: "",
        dx_btnRemoveItem: "",
        dx_popupItemRemove: "",

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

        dx_ddlBroker: '',
        dx_txtBrokerage: '',
        dx_ddlcourier: "",
        dx_txtRemarks: '',
        txtFreightCharges: "",
        txtTaxableAmount: '',
        txtAmount: '',
        txtRoundOff: '',
        txtTotalAmount: '',
        txtTotalAmountInRs: '',

        RmCodeList: [],
        RmShapeList: [],
        RmPurityList: [],
        RmColorList: [],
        deletedFiles: "",

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
    },

    InitializeMainGridView: function () {
        MaterialTransactionView.variables.dx_dataGrid = $("#dx_dataGrid").dxDataGrid({
            dataSource: new DevExpress.data.CustomStore({
                key: "mt_id",
                load: function (loadOptions) {
                    var deferred = $.Deferred();
                    var result = DevExVariables.GetDataList(loadOptions, MaterialTransactionView.variables.BindMainGridListUrl);
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
            columns: [{ dataField: "mt_id", allowFiltering: false, allowSorting: true, sortIndex: 1, sortOrder: "desc", visible: false },
                { dataField: "subbook", caption: "Sub Book", dataType: "string", allowSorting: true, allowFiltering: true, filterOperations: ["contains"], allowHeaderFiltering: false },
                { dataField: "voucherno", caption: "Voucher No", dataType: "string", allowSorting: true, allowFiltering: true, allowHeaderFiltering: false },
                { dataField: "voucherdate", caption: "Voucher Date", dataType: "string", allowSorting: true, allowFiltering: true, filterOperations: ["contains"], allowHeaderFiltering: false },
                { dataField: "vouchertype", caption: "Voucher type", dataType: "string", allowSorting: true, allowFiltering: true, filterOperations: ["contains"], allowHeaderFiltering: false },
                { dataField: "accountname", caption: "Party Name", dataType: "string", allowSorting: true, allowFiltering: true, filterOperations: ["contains"], allowHeaderFiltering: false },
                { dataField: "currencycode", caption: "Currency", dataType: "string", allowSorting: false, allowFiltering: false, allowHeaderFiltering: false },
                { dataField: "finalbillamount", caption: "Bill Amt", dataType: "number", alignment: "right", allowSorting: false, allowFiltering: false, allowHeaderFiltering: false },
                { dataField: "paidamt", caption: "Paid Amt", dataType: "number", alignment: "right", allowSorting: false, allowFiltering: false, allowHeaderFiltering: false },
                {
                    dataField: "isverify", caption: "Is Verify", dataType: "string", alignment: "center", filterOperations: ["contains"],
                    allowSorting: false, allowFiltering: false, allowHeaderFiltering: true,
                    headerFilter: {
                        dataSource: [{
                            text: "Verified",
                            value: ["isverify", "equals", 1]
                        }, {
                            text: "Declined",
                            value: ["isverify", "equals", 0]
                        }]
                    },
                    cellTemplate: function (container, options) {
                        if (getIsAllowedVerify()) {
                            $("<div>").dxSwitch({
                                value: options.value,
                                switchedOnText: "Verified",
                                switchedOffText: "Declined",
                                width: '60px',
                                onValueChanged: function (data) {
                                    MaterialTransactionView.EditFromGrid(data.value, options.key, 'Verify');
                                }
                            }).appendTo(container);
                        }
                        else
                            DevExVariables.LabelTemplate(container, options);
                    }
                },
                {
                    dataField: "isdispatch", caption: "Is Dispatch", dataType: "string", alignment: "center", filterOperations: ["contains"],
                    allowSorting: false, allowFiltering: false, allowHeaderFiltering: true,
                    headerFilter: {
                        dataSource: [{
                            text: "Yes",
                            value: ["isdispatch", "equals", 1]
                        }, {
                            text: "No",
                            value: ["isdispatch", "equals", 0]
                        }]
                    },
                    cellTemplate: function (container, options) {
                        var temp;
                        if (isU()) {
                            $("<div>").dxSwitch({
                                value: options.value,
                                switchedOnText: "Yes",
                                switchedOffText: "No",
                                onValueChanged: function (data) {
                                    MaterialTransactionView.EditFromGrid(data.value, options.key, 'Dispatch');
                                }
                            }).appendTo(container);

                            if (options.value) {
                                temp = '<label class="btn btn-info" style="padding: 2px 6px !important;margin-left: 5px;" title="Shipping Info" onclick=\'MaterialTransactionView.openShipInfo("' + options.key + '"); \'><i class="fa fa-truck"></i></label>';
                                $(temp).appendTo(container);
                            }
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
                     dataField: "irnno", caption: "E - Invoice", dataType: "string", alignment: "center", allowSorting: false, allowFiltering: false, allowHeaderFiltering: false,
                     cellTemplate: function (container, options) {
                         var temp = "";
                         if (options.data.subbook == "Material Sale") {
                             if (options.displayValue == null && options.data.cancelirn == null) {
                                 temp = '<span class="btn btn-primary" style="padding: 2px 6px !important;" title="Generate Invoice" onclick=\'MaterialTransactionView.GenerateEinvoice("' + options.key + '"); \'>Generate</span>';
                             }
                             else if (options.displayValue != null && options.data.cancelirn != null) {
                                 temp = '<span class="btn" style="padding: 2px 4px !important; background-color:#ffa604;" title="E-Invoice is Cancelled" disabled>Cancelled</span>';
                             }
                             else {
                                 if (options.data.iscancleableeinvoice == 1) {
                                     temp = '<span class="btn btn-danger" style="padding: 2px 13px !important; " title="You can not Cancel This Invoice" disabled>Cancel</span>';
                                 }
                                 else {
                                     temp = '<span class="btn btn-danger" style="padding: 2px 13px !important;" title="Cancel Invoice"  onclick=\'MaterialTransactionView.CancleEinvoice("' + options.key + '"); \'>Cancle</span>';
                                 }
                             }
                         }
                         $(temp).appendTo(container);
                     }
                 },
                 {
                     dataField: "subbook", caption: "Action", alignment: "center", allowFiltering: false, allowSorting: false, fixed: true, fixedPosition: "right",
                     cellTemplate: function (container, options) {
                         if ((options.value == "Material Sale") || (options.value == "Material Export")) {
                             DevExVariables.ActionTemplate(container, options, true, true, "MaterialTransactionView", "Attachments,Share,Pdf", options.value);
                         }
                         else {
                             DevExVariables.ActionTemplate(container, options, true, true, "MaterialTransactionView", "Attachments", options.value);
                         }
                     }
                 },
            ]
        }).dxDataGrid("instance");
    },

    triggerId: function (id) {
        var rowData = MaterialTransactionView.variables.dx_dataGrid.getVisibleRows()[MaterialTransactionView.variables.dx_dataGrid.getRowIndexByKey(+id)].data;
        MaterialTransactionView.variables.Masterid = id;
        MaterialTransactionView.variables.Oper = 'Edit';

        MaterialTransactionView.variables.dx_ddlSubBookMaster.option({ value: rowData.sbookid });
        MaterialTransactionView.variables.dx_txtVoucherNo.option({ value: rowData.voucherno });
        if (rowData.returnfrommt_id) {
            MaterialTransactionView.variables.dx_txtVoucherReturn.option({
                items: [{ mt_id: rowData.returnfrommt_id, voucherno: rowData.returnfromvoucherno }],
                selectedItem: { mt_id: rowData.returnfrommt_id, voucherno: rowData.returnfromvoucherno },
                value: rowData.returnfromvoucherno,
                disabled: true
            });
            //MaterialTransactionView.variables.dx_btnAddDetailItem.option({ visible: false });
        }
        MaterialTransactionView.variables.dx_txtDueDays.option({ value: rowData.duedays });
        MaterialTransactionView.variables.dx_ddlVoucherType.option({ value: rowData.vouchertype });
        MaterialTransactionView.variables.dx_txtVoucherDate.option({ value: rowData.voucherdate });
        MaterialTransactionView.variables.dx_ddlOrderby.option({ value: rowData.salesmanid });
        MaterialTransactionView.variables.dx_TaxProfile.option({ value: rowData.taxprofileid });
        MaterialTransactionView.variables.dx_ddllocker.option({ value: rowData.lockermasterid });
        MaterialTransactionView.variables.dx_txtPartyName.option({
            items: [{ accid: rowData.accid, accountname: rowData.accountname, partycode: rowData.partycode, currencyid: rowData.currencyid, taxprofileid: rowData.taxprofileid, creditdays: rowData.duedays }],
            selectedItem: { accid: rowData.accid, accountname: rowData.accountname, partycode: rowData.partycode, currencyid: rowData.currencyid, taxprofileid: rowData.taxprofileid, creditdays: rowData.duedays },
            value: rowData.accountname
        });
        //MaterialTransactionView.variables.dx_txtPartyCode.option({ value: rowData.partycode });
        MaterialTransactionView.variables.dx_txtPartyBillNo.option({ value: rowData.partybillno });
        MaterialTransactionView.variables.dx_ddlCurrencyName.option({ value: rowData.currencyid });
        MaterialTransactionView.variables.dx_txtExchangeRate.option({ value: rowData.exchangerate });
        MaterialTransactionView.variables.dx_ddlBillingAddress.option({ value: rowData.billingaddressid });
        MaterialTransactionView.variables.dx_ddlShippingAddress.option({ value: rowData.shippingaddressid });
        MaterialTransactionView.variables.dx_ddlBroker.option({ value: rowData.brokerid });
        MaterialTransactionView.variables.dx_txtBrokerage.option({ value: rowData.brokerage });
        MaterialTransactionView.variables.dx_txtRemarks.option({ value: rowData.remark });
        MaterialTransactionView.variables.txtFreightCharges.option({ value: rowData.freightcharges });
        MaterialTransactionView.variables.dx_ddlCurrencyName.option({ disabled: true });
        if (MaterialTransactionView.variables.dx_ddlCurrencyName.option().value == 2)
            MaterialTransactionView.variables.dx_txtExchangeRate.option({ disabled: true });
        if (rowData.roundofftype == "Add")
            $("#rd_Add").prop("checked", true);
        else
            $("#rd_Less").prop("checked", true);


        MaterialTransactionView.variables.dx_dataGridItems.refresh();

        $('#tbody_AttachmentsList').html("");
        var myfilter = { rules: [] };
        myfilter.rules.push({ field: "MT_ID", op: "eq", data: id });
        $.ajax({
            url: getDomain() + "/Common/BindMastersDetails?ServiceName=ACC_MATERIALTRANSACTION_FILESLIST_GET&myfilters=" + JSON.stringify(myfilter),
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
                            var file = (obj.filename).split(".")[0];
                            $('#tbody_AttachmentsList').append('<tr id="' + file + '" fileid="' + obj.fileid + '" >' +
                                '<td class="FilePath text-center">' +
                                    '<a class="btn btn-info" href="' + getDomain() + '/UploadFiles/MaterialTransaction/' + obj.filename + '" target="blank"><i class="fa fa-eye"></i></a>' +
                                '</td>' +
                                '<td class="Description">' +
                                    '<input type="text" class="form-control" value="' + obj.description + '" placeholder="Description">' +
                                '</td>' +
                                '<td class="text-center">' +
                                    '<a href="javascript:void(0);" onclick="MaterialTransactionView.deleteAttachment(\'' + file + '\',\'' + obj.filename + '\');" class="btn btn-danger"><i class="fa fa-trash"></i></a>' +
                                '</td>' +
                            '</tr>');
                        });
                    }
                }
                else {
                    DevExVariables.InvalidResponseCode(data);
                }
            },
            error: OnError
        });

        $("#frm_MaterialTransaction").show();
        $("#pnlView").hide();
        $("#AttachmentsList").show();

        if (isU()) {        // || rowData.isfinalsubmit == 0
            MaterialTransactionView.variables.dx_btnSubmit.option({ visible: true });
            MaterialTransactionView.variables.dx_btnAddDetailItem.option({ visible: true });
            MaterialTransactionView.variables.dx_btnRemoveItem.option({ visible: true });
        }
        else {
            MaterialTransactionView.variables.dx_btnSubmit.option({ visible: false });
            MaterialTransactionView.variables.dx_btnAddDetailItem.option({ visible: false });
            MaterialTransactionView.variables.dx_btnRemoveItem.option({ visible: false });
        }

        if (rowData.returnfrommt_id) {
            MaterialTransactionView.variables.dx_btnAddDetailItem.option({ visible: false });
        }

        MaterialTransactionView.variables.dx_ddlOrderby.option({ disabled: true });
        MaterialTransactionView.variables.dx_ddlSubBookMaster.option({ disabled: true });

    },

    deleteRow: function (id) {
        var rowData = MaterialTransactionView.variables.dx_dataGrid.getVisibleRows()[MaterialTransactionView.variables.dx_dataGrid.getRowIndexByKey(+id)].data;
        MaterialTransactionView.variables.Masterid = id;
        MaterialTransactionView.variables.DeleteDataObj = rowData;
        MaterialTransactionView.variables.Oper = "Delete";

        if (MaterialTransactionView.variables.dx_popupRecordDelete) {
            MaterialTransactionView.variables.dx_popupRecordDelete.option("contentTemplate", MaterialTransactionView.variables.DeletePopUpOptions.contentTemplate(MaterialTransactionView.variables.DeleteDataObj).bind(this));
        }
        else {
            MaterialTransactionView.variables.dx_popupRecordDelete = $("#dx_popupRecordDelete").dxPopup(MaterialTransactionView.variables.DeletePopUpOptions).dxPopup("instance");
        }

        MaterialTransactionView.variables.dx_popupRecordDelete.show();
    },

    EditFromGrid: function (val, id, type) {
        var data = {
            "MT_ID": id,
            "OPER_TYPE": "EditFromGrid",
            "oper": "Edit"
        }

        if (type == "Verify")
            data.ISVERIFY = val;
        else if (type == "Dispatch")
            data.ISDISPATCH = val;

        $.ajax({
            url: getDomain() + MaterialTransactionView.variables.PerformMasterOperationUrl,
            data: data,
            async: true,
            cache: false,
            type: 'POST',
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    DevExVariables.Toaster("success", 'Record is updated successfully.');

                    MaterialTransactionView.variables.dx_dataGrid.refresh();
                }
            },
            error: OnError,
        });
    },

    FormInitialize: function () {
        MaterialTransactionView.variables.dx_btnAddNew = $("#dx_btnAddNew").dxButton({
            stylingMode: "outlined",
            icon: "plus",
            text: "Add New",
            type: "default",
            validationGroup: "MaterialTransaction",
            onClick: function (e) {
                $("#pnlView").hide();
                $("#frm_MaterialTransaction").show();
                MaterialTransactionView.variables.Masterid = "";
            }
        }).dxButton("instance");

        MaterialTransactionView.variables.dx_btnSubmit = $("#dx_btnSubmit").dxButton({
            icon: "check",
            text: "Submit",
            type: "success",
            validationGroup: "MaterialTransaction",
            onClick: function (e) {
                var validation = DevExpress.validationEngine.validateGroup("MaterialTransaction");
                if (!validation.isValid) {
                    DevExVariables.Toaster("warning", "Please fill all required fields before submit.");
                    return;
                }

                if (MaterialTransactionView.variables.dx_dataGridItems.getDataSource().items().length == 0) {
                    DevExVariables.Toaster("warning", "Please fill atleast one item before submit.");
                    return;
                }

                if (MaterialTransactionView.variables.Masterid > 0) {
                    MaterialTransactionView.variables.Oper = 'Edit';
                }
                else {
                    MaterialTransactionView.variables.Oper = 'Add';
                }

                var xmlsaveFiles = "<FILELIST>";
                var saveFiles = "";
                $("#tbody_AttachmentsList tr").each(function (key, obj) {
                    xmlsaveFiles += '<FILE>';
                    var FilePath = $(obj).find(".FilePath a").attr("href");
                    saveFiles += FilePath + ",";
                    xmlsaveFiles += '<FILENAME>' + FilePath.substring(FilePath.lastIndexOf("/") + 1) + '</FILENAME>';
                    xmlsaveFiles += '<DESCRIPTION>' + $(obj).find(".Description input").val() + '</DESCRIPTION>';
                    xmlsaveFiles += '</FILE>';
                });
                xmlsaveFiles += "</FILELIST>";

                var data = {
                    "SBOOKID": MaterialTransactionView.variables.dx_ddlSubBookMaster.option().value,
                    "VOUCHERDATE": MaterialTransactionView.variables.dx_txtVoucherDate.option().text,
                    //"LOCKERID": MaterialTransactionView.variables.dx_ddllocker.option().value,
                    "VOUCHERTYPE": MaterialTransactionView.variables.dx_ddlVoucherType.option().value,
                    "ACCID": MaterialTransactionView.variables.dx_txtPartyName.option().selectedItem.accid,
                    "PARTYBILLNO": MaterialTransactionView.variables.dx_txtPartyBillNo.option().value,
                    "SALESMANID": MaterialTransactionView.variables.dx_ddlOrderby.option().value,
                    "DUEDAY": MaterialTransactionView.variables.dx_txtDueDays.option().value,
                    "TAXPROFILEID": MaterialTransactionView.variables.dx_TaxProfile.option().value,
                    "CURRENCYID": MaterialTransactionView.variables.dx_ddlCurrencyName.option().value,
                    "EXCHANGERATE": MaterialTransactionView.variables.dx_txtExchangeRate.option().value,
                    //"BILLINGADDRESSID": MaterialTransactionView.variables.dx_ddlBillingAddress.option().value,
                    //"BILLADDR_NAME": MaterialTransactionView.variables.dx_ddlBillingAddress.option().selectedItem.shipname,
                    //"BILLADDR_MOBNO": MaterialTransactionView.variables.dx_ddlBillingAddress.option().selectedItem.shipmobileno,
                    //"BILLADDR_COUNTRY": MaterialTransactionView.variables.dx_ddlBillingAddress.option().selectedItem.shipcountry,
                    //"BILLADDR_STATE": MaterialTransactionView.variables.dx_ddlBillingAddress.option().selectedItem.shipstate,
                    //"BILLADDR_CITY": MaterialTransactionView.variables.dx_ddlBillingAddress.option().selectedItem.shipcity,
                    //"BILLADDR_PINCODE": MaterialTransactionView.variables.dx_ddlBillingAddress.option().selectedItem.shipzipecode,
                    //"BILLADDR_ADDRESS": MaterialTransactionView.variables.dx_ddlBillingAddress.option().selectedItem.shipaddress,
                    //"BILLADDR_TYPE": MaterialTransactionView.variables.dx_ddlBillingAddress.option().selectedItem.address_type_id,
                    //"BILLADDR_GSTNO": MaterialTransactionView.variables.dx_ddlBillingAddress.option().selectedItem.gstno,
                    //"BILLADDR_PANNO": MaterialTransactionView.variables.dx_ddlBillingAddress.option().selectedItem.panno,
                    //"SHIPPINGADDRESSID": MaterialTransactionView.variables.dx_ddlShippingAddress.option().value,
                    //"SHIPADDR_NAME": MaterialTransactionView.variables.dx_ddlShippingAddress.option().selectedItem.shipname,
                    //"SHIPADDR_MOBNO": MaterialTransactionView.variables.dx_ddlShippingAddress.option().selectedItem.shipmobileno,
                    //"SHIPADDR_COUNTRY": MaterialTransactionView.variables.dx_ddlShippingAddress.option().selectedItem.shipcountry,
                    //"SHIPADDR_STATE": MaterialTransactionView.variables.dx_ddlShippingAddress.option().selectedItem.shipstate,
                    //"SHIPADDR_CITY": MaterialTransactionView.variables.dx_ddlShippingAddress.option().selectedItem.shipcity,
                    //"SHIPADDR_PINCODE": MaterialTransactionView.variables.dx_ddlShippingAddress.option().selectedItem.shipzipecode,
                    //"SHIPADDR_ADDRESS": MaterialTransactionView.variables.dx_ddlShippingAddress.option().selectedItem.shipaddress,
                    //"SHIPADDR_TYPE": MaterialTransactionView.variables.dx_ddlShippingAddress.option().selectedItem.address_type_id,
                    //"SHIPADDR_GSTNO": MaterialTransactionView.variables.dx_ddlShippingAddress.option().selectedItem.gstno,
                    //"SHIPADDR_PANNO": MaterialTransactionView.variables.dx_ddlShippingAddress.option().selectedItem.panno,
                    "ROUNDOFF": MaterialTransactionView.variables.txtRoundOff.option().value || 0,
                    "ROUNDOFFTYPE": $("[name='rd_RoundOff']:checked").val(),
                    "FREIGHTCHARGES": MaterialTransactionView.variables.txtFreightCharges.option().value || 0,
                    "REMARKS": MaterialTransactionView.variables.dx_txtRemarks.option().value,
                    //"BROKERID": MaterialTransactionView.variables.dx_ddlBroker.option().value,
                    "BROKERAGE": MaterialTransactionView.variables.dx_txtBrokerage.option().value || 0,
                    //"COURIERID": MaterialTransactionView.variables.dx_ddlcourier.option().value,
                    "ISFINALSUBMIT": 1,
                    "MT_ID": MaterialTransactionView.variables.Masterid,
                    "oper": MaterialTransactionView.variables.Oper,
                    "XMLPARAM": escape(xmlsaveFiles)
                }

                if (MaterialTransactionView.variables.dx_txtVoucherReturn.option().selectedItem) {
                    data.RETURNFROMMT_ID = MaterialTransactionView.variables.dx_txtVoucherReturn.option().selectedItem.mt_id;
                    data.RETURNFROMVOUCHERNO = MaterialTransactionView.variables.dx_txtVoucherReturn.option().selectedItem.voucherno;
                }

                if (MaterialTransactionView.variables.dx_ddllocker.option().value)
                    data.LOCKERID = MaterialTransactionView.variables.dx_ddllocker.option().value;

                if (MaterialTransactionView.variables.dx_ddlBillingAddress.option().value) {
                    data.BILLINGADDRESSID = MaterialTransactionView.variables.dx_ddlBillingAddress.option().value;
                }

                if (MaterialTransactionView.variables.dx_ddlShippingAddress.option().value) {
                    data.SHIPPINGADDRESSID = MaterialTransactionView.variables.dx_ddlShippingAddress.option().value;
                }

                if (MaterialTransactionView.variables.dx_ddlBroker.option().value)
                    data.BROKERID = MaterialTransactionView.variables.dx_ddlBroker.option().value;

                $.ajax({
                    type: 'POST',
                    async: false,
                    cache: false,
                    url: getDomain() + "/Common/SaveImage",
                    data: {
                        category: 'MaterialTransaction',
                        deletedfiles: MaterialTransactionView.variables.deletedFiles,
                        savefiles: saveFiles
                    },
                    success: function (result) {
                    },
                    error: OnError
                });

                $.ajax({
                    url: getDomain() + MaterialTransactionView.variables.PerformMasterOperationUrl,
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
                            MaterialTransactionView.clearControls();
                            DevExVariables.Toaster("success", 'Record is Saved successfully.');
                        }
                        else {
                            DevExVariables.InvalidResponseCode(data);
                        }
                    },
                    error: OnError,
                });
            }
        }).dxButton("instance");

        MaterialTransactionView.variables.dx_btnCancel = $("#dx_btnCancel").dxButton({
            icon: "close",
            text: "Cancel",
            type: "danger",
            validationGroup: "MaterialTransaction",
            onClick: function (e) {
                MaterialTransactionView.clearControls();
                //e.validationGroup.reset();
            }
        }).dxButton("instance");

        MaterialTransactionView.variables.dx_btnRefreshGrid = $("#dx_btnRefreshGrid").dxButton({
            stylingMode: "outlined",
            icon: "refresh",
            //text: "Refresh",
            type: "default",
            validationGroup: "MaterialTransaction",
            onClick: function (e) {
                MaterialTransactionView.variables.dx_dataGrid.refresh();
            }
        }).dxButton("instance");

        MaterialTransactionView.variables.dx_ddlSubBookMaster = $("#dx_ddlSubBookMaster").dxSelectBox({
            placeholder: "Select Sub Book...",
            searchEnabled: true,
            onValueChanged: function (data) {
                if (MaterialTransactionView.variables.dx_ddlSubBookMaster.option().selectedItem) {
                    if (['Material Sale return', 'Material Purchase Return', 'Material Approval Return'].indexOf(MaterialTransactionView.variables.dx_ddlSubBookMaster.option().selectedItem.subbook) !== -1) {
                        MaterialTransactionView.variables.dx_txtVoucherReturn.option({ disabled: false });
                        MaterialTransactionView.variables.dx_btnAddDetailItem.option({ visible: false });
                    }
                    else {
                        MaterialTransactionView.variables.dx_txtVoucherReturn.option({ disabled: true });
                        MaterialTransactionView.variables.dx_btnAddDetailItem.option({ visible: true });
                    }

                    if (['Material Purchase', 'Material Import', 'Material Purchase Return'].indexOf(MaterialTransactionView.variables.dx_ddlSubBookMaster.option().selectedItem.subbook) !== -1) {
                        MaterialTransactionView.variables.dx_ddlBillingAddress.option({ disabled: true });
                        MaterialTransactionView.variables.dx_ddlShippingAddress.option({ disabled: true });
                        //MaterialTransactionView.variables.dx_ddllocker.option({ disabled: false });
                    }
                    else {
                        MaterialTransactionView.variables.dx_ddlBillingAddress.option({ disabled: false });
                        MaterialTransactionView.variables.dx_ddlShippingAddress.option({ disabled: false });
                        //MaterialTransactionView.variables.dx_ddllocker.option({ disabled: true });
                    }
                }
            }
        }).dxValidator({
            validationGroup: "MaterialTransaction",
            validationRules: [{
                type: "required",
                message: "Sub Book is required"
            }]
        }).dxSelectBox("instance");

        MaterialTransactionView.variables.dx_ddlVoucherType = $("#dx_ddlVoucherType").dxSelectBox({
            dataSource: MaterialTransactionView.variables.VoucherTypeList,
            value: MaterialTransactionView.variables.VoucherTypeList[1],
            searchEnabled: true,
            onValueChanged: function (data) {
            }
        }).dxValidator({
            validationGroup: "MaterialTransaction",
            validationRules: [{
                type: "required",
                message: "Voucher Type is required"
            }]
        }).dxSelectBox("instance");

        MaterialTransactionView.variables.dx_txtVoucherReturn = $("#dx_txtVoucherReturn").dxAutocomplete({
            placeholder: "Search Voucher No...",
            mode: "search",
            dataSource: new DevExpress.data.CustomStore({
                load: function (loadOptions) {
                    if (MaterialTransactionView.variables.dx_ddlSubBookMaster.option().value) {
                        var deferred = $.Deferred();
                        var url;
                        var myfilter = { rules: [] };
                        myfilter.rules.push({ field: "VOUCHERNO", op: "eq", data: loadOptions.searchValue });
                        var temp_subbook = ''
                        if (MaterialTransactionView.variables.dx_ddlSubBookMaster.option().selectedItem.subbook == "Material Sale return") {
                            temp_subbook = "Material Sale"
                        }
                        else if (MaterialTransactionView.variables.dx_ddlSubBookMaster.option().selectedItem.subbook == "Material Purchase Return") {
                            temp_subbook = "Material Purchase"
                        }
                        else if (MaterialTransactionView.variables.dx_ddlSubBookMaster.option().selectedItem.subbook == "Material Approval Return") {
                            temp_subbook = "MATERIAL APPROVAL"
                        }
                        else {
                            temp_subbook = "";
                        }
                        if (temp_subbook) {
                            myfilter.rules.push({ field: "SUBBOOK", op: "eq", data: temp_subbook });
                        }

                        var result;
                        $.ajax({
                            url: getDomain() + MaterialTransactionView.variables.BindMainGridListUrl + "&myfilters=" + JSON.stringify(myfilter),
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
                    }
                    else {
                        notificationMessage('Warning', 'Please first select Book Type', 'warning');
                    }
                },
                key: "mt_id",
            }),
            valueExpr: "voucherno",
            //onSelectionChanged: function (data) {
            //    if (MaterialTransactionView.variables.EditFlag == 0) {
            //        if (data.selectedItem) {
            //        }
            //    }
            //}
            onItemClick: function (e) {
                if (e.component.option().selectedItem) {
                    MaterialTransactionView.OnSelectVoucherReturn(e.component.option().selectedItem);
                }
            }
        }).dxValidator({
            validationGroup: "MaterialTransaction",
            validationRules: []
        }).dxAutocomplete("instance");

        MaterialTransactionView.variables.dx_TaxProfile = $("#dx_TaxProfile").dxSelectBox({
            placeholder: "Select Tax Profile...",
            searchEnabled: true,
            //onValueChanged: function (data) {
            //    if (data.value && MaterialTransactionView.variables.Masterid > 0) {
            //        MaterialTransactionView.updateTaxProfile();
            //    }
            //}
            onItemClick: function (e) {
                if (e.component.option().value && MaterialTransactionView.variables.Masterid > 0) {
                    MaterialTransactionView.updateTaxProfile();
                }
            }
        }).dxValidator({
            validationGroup: "MaterialTransaction",
            validationRules: [{
                type: "required",
                message: "Tax Profile is required"
            }]
        }).dxSelectBox("instance");

        MaterialTransactionView.variables.dx_txtVoucherDate = $("#dx_txtVoucherDate").dxDateBox({
            type: "date",
            value: new Date(),
            showClearButton: true,
            useMaskBehavior: true,
            displayFormat: "dd MMM yyyy",
        }).dxValidator({
            validationGroup: "MaterialTransaction",
            validationRules: [{
                type: "required",
                message: "Voucher Date is required"
            }]
        }).dxDateBox("instance");

        MaterialTransactionView.variables.dx_txtVoucherNo = $("#dx_txtVoucherNo").dxTextBox({
            readOnly: true,
        }).dxValidator({
            validationGroup: "MaterialTransaction",
            validationRules: []
        }).dxTextBox("instance");

        MaterialTransactionView.variables.dx_txtPartyName = $("#dx_txtPartyName").dxAutocomplete({
            placeholder: "Select Account...",
            mode: "search",
            dataSource: new DevExpress.data.CustomStore({
                load: function (loadOptions) {
                    var deferred = $.Deferred();

                    var myfilter = { rules: [] };
                    //if (MaterialTransactionView.variables.dx_ddlSubBookMaster.option().text == "Material Purchase") {
                    //    myfilter.rules.push({ field: "HEADNAME", op: "eq", data: "Sundry Creditors" });
                    //}
                    //else if (MaterialTransactionView.variables.dx_ddlSubBookMaster.option().text == "Material Sale") {
                    //    myfilter.rules.push({ field: "HEADNAME", op: "eq", data: "Sundry Debitors" });
                    //}
                    //else {
                    myfilter.rules.push({ field: "GROUPNAME", op: "eq", data: "Creditors/Debitors" });
                    //}

                    $.ajax({
                        url: getDomain() + MaterialTransactionView.variables.BindAccListUrl + "&_search=true&searchField=ACCOUNTNAME&searchOper=cn&searchString=" + loadOptions.searchValue + "&myfilters=" + JSON.stringify(myfilter),
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
            onSelectionChanged: function (data) {
                if (data.selectedItem) {
                    MaterialTransactionView.variables.PartyList_accid = data.selectedItem.accid;
                    MaterialTransactionView.variables.dx_txtPartyCode.option({ value: data.selectedItem.partycode });
                    //MaterialTransactionView.variables.dx_ddllocker.option({ value: data.selectedItem.lockermasterid });
                    MaterialTransactionView.variables.dx_ddlCurrencyName.option({ value: data.selectedItem.currencyid });
                    MaterialTransactionView.variables.dx_TaxProfile.option({ value: data.selectedItem.taxprofileid });
                    MaterialTransactionView.variables.dx_txtDueDays.option({ value: data.selectedItem.creditdays });
                    MaterialTransactionView.BindAddressDetails(data.selectedItem.accid);
                }
                else {
                    MaterialTransactionView.variables.PartyList_accid = "";
                    MaterialTransactionView.variables.dx_txtPartyCode.option("value", "");
                    MaterialTransactionView.variables.dx_ddlCurrencyName.option("value", "");
                }
            },
            itemTemplate: function (data) {
                return $("<div class='product-name'>" + "(" + data.partycode + ")&nbsp;" + data.accountname + "</div>");
            },
        }).dxValidator({
            validationGroup: "MaterialTransaction",
            validationRules: [{
                type: "required",
                message: "Party Name is required"
            }]
        }).dxAutocomplete("instance");

        MaterialTransactionView.variables.dx_txtPartyCode = $("#dx_txtPartyCode").dxTextBox({
            readOnly: true,
            width: 90
        }).dxValidator({
            validationGroup: "MaterialTransaction",
            validationRules: []
        }).dxTextBox("instance");

        MaterialTransactionView.variables.dx_txtPartyBillNo = $("#dx_txtPartyBillNo").dxTextBox({
            mode: "text",
            placeholder: "Enter Party Bill No...",
        }).dxValidator({
            validationGroup: "MaterialTransaction",
            validationRules: []
        }).dxTextBox("instance");

        MaterialTransactionView.variables.dx_txtDueDays = $("#dx_txtDueDays").dxTextBox({
            mode: "number",
            value: 0,
            onValueChanged: function (data) {
                //if (data.value)
                //    MaterialTransactionView.GetDueDate(data.value);
            }
        }).dxValidator({
            validationGroup: "MaterialTransaction",
            validationRules: [{
                type: "required",
                message: "DueDays is required"
            }]
        }).dxTextBox("instance");

        MaterialTransactionView.variables.dx_ddllocker = $("#dx_ddllocker").dxSelectBox({
            placeholder: "Select Locker...",
            searchEnabled: true,
            onValueChanged: function (data) {

            }
        }).dxValidator({
            validationGroup: "MaterialTransaction",
            validationRules: [{
                type: "required",
                message: "Locker is required"
            }]
        }).dxSelectBox("instance");

        MaterialTransactionView.variables.dx_ddlCurrencyName = $("#dx_ddlCurrencyName").dxSelectBox({
            placeholder: "Select Currency...",
            searchEnabled: true,
            disabled: true,
            onValueChanged: function (data) {
                if (MaterialTransactionView.variables.dx_ddlCurrencyName.option().selectedItem) {
                    MaterialTransactionView.variables.dx_txtExchangeRate.option({ value: MaterialTransactionView.variables.dx_ddlCurrencyName.option().selectedItem.exchangerate });
                }
            }
        }).dxValidator({
            validationGroup: "MaterialTransaction",
            validationRules: [{
                type: "required",
                message: "Currency is required"
            }]
        }).dxSelectBox("instance");

        MaterialTransactionView.variables.dx_txtExchangeRate = $("#dx_txtExchangeRate").dxNumberBox({
            disabled: true,
            value: 1,
            min: 1,
            onValueChanged: function (data) {
                MaterialTransactionView.OnChangeExchangeRate();
            }
        }).dxValidator({
            validationGroup: "MaterialTransaction",
            validationRules: [{
                type: "required",
                message: "Exchange rate is required"
            }]
        }).dxNumberBox("instance");

        MaterialTransactionView.variables.dx_ddlOrderby = $("#dx_ddlOrderby").dxSelectBox({
            placeholder: "Select User Name...",
            searchEnabled: true,
        }).dxValidator({
            validationGroup: "MaterialTransaction",
            validationRules: [{
                type: "required",
                message: "Entry by name is required"
            }]
        }).dxSelectBox("instance");

        MaterialTransactionView.variables.dx_ddlShippingAddress = $("#dx_ddlShippingAddress").dxSelectBox({
            placeholder: "Select Shipping Address...",
            searchEnabled: true,
            onValueChanged: function (data) {
                if (MaterialTransactionView.variables.dx_ddlShippingAddress.option().selectedItem) {
                    //$("#lblSA_address").text(MaterialTransactionView.variables.dx_ddlShippingAddress.option().selectedItem.shipaddress);
                    //$("#lblSA_country").text(MaterialTransactionView.variables.dx_ddlShippingAddress.option().selectedItem.countryname);
                    //$("#lblSA_state").text(MaterialTransactionView.variables.dx_ddlShippingAddress.option().selectedItem.statename);
                    //$("#lblSA_city").text(MaterialTransactionView.variables.dx_ddlShippingAddress.option().selectedItem.cityname);
                }
            }
        }).dxValidator({
            validationGroup: "MaterialTransaction",
            validationRules: [{
                type: "required",
                message: "Shipping Address is required"
            }]
        }).dxSelectBox("instance");

        MaterialTransactionView.variables.dx_ddlBillingAddress = $("#dx_ddlBillingAddress").dxSelectBox({
            placeholder: "Select Billing Address...",
            searchEnabled: true,
            onValueChanged: function (data) {
                if (MaterialTransactionView.variables.dx_ddlBillingAddress.option().selectedItem) {
                    //$("#lblBA_address").text(MaterialTransactionView.variables.dx_ddlBillingAddress.option().selectedItem.shipaddress);
                    //$("#lblBA_country").text(MaterialTransactionView.variables.dx_ddlBillingAddress.option().selectedItem.countryname);
                    //$("#lblBA_state").text(MaterialTransactionView.variables.dx_ddlBillingAddress.option().selectedItem.statename);
                    //$("#lblBA_city").text(MaterialTransactionView.variables.dx_ddlBillingAddress.option().selectedItem.cityname);
                }
            }
        }).dxValidator({
            validationGroup: "MaterialTransaction",
            validationRules: [{
                type: "required",
                message: "Billing Address is required"
            }]
        }).dxSelectBox("instance");

        /*----------------------Add New Account Entry---------------------*/
        MaterialTransactionView.variables.dx_txtAcc_Name = $("#dx_txtAcc_Name").dxTextBox({
            placeholder: "Enter Acc Name...",
            ShowModelErrors: true,
        }).dxValidator({
            validationGroup: "PartyMaster",
            validationRules: [{
                type: "required",
                message: "Account name is required"
            }]
        }).dxTextBox("instance");

        MaterialTransactionView.variables.dx_txtHeadName = $("#dx_txtHeadName").dxAutocomplete({
            placeholder: "Type Account Head...",
            dataSource: new DevExpress.data.CustomStore({
                load: function (loadOptions) {
                    var deferred = $.Deferred();

                    var myfilter = { rules: [] };
                    myfilter.rules.push({ field: "SEARCH", op: "eq", data: loadOptions.searchValue });
                    myfilter.rules.push({ field: "TYPE", op: "eq", data: "AccHead" });

                    var result;
                    $.ajax({
                        url: getDomain() + MaterialTransactionView.variables.BindStaticDataUrl + "&myfilters=" + JSON.stringify(myfilter),
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
                    MaterialTransactionView.GetSubHeadList(data.selectedItem.headid);
                else
                    MaterialTransactionView.variables.dx_ddlSubHead.option({
                        dataSource: [],
                        displayExpr: "subhead",
                        valueExpr: "subheadid",
                    });
            },
            onFocusOut: function (data) {
                if (!data.component.option().selectedItem) {
                    MaterialTransactionView.variables.dx_txtHeadName.option("value", "");
                }
            }
        }).dxValidator({
            validationGroup: "PartyMaster",
            validationRules: [{
                type: "required",
                message: "Head name is required"
            }]
        }).dxAutocomplete("instance");

        MaterialTransactionView.variables.dx_ddlSubHead = $("#dx_ddlSubHead").dxSelectBox({
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

        MaterialTransactionView.variables.dx_txtMobileNo = $("#dx_txtMobileNo").dxTextBox({
            placeholder: "Enter Mobile No...",
        }).dxValidator({
            validationGroup: "PartyMaster",
            validationRules: [{
                type: "required",
                message: "Mobile number is required"
            }]
        }).dxTextBox("instance");

        MaterialTransactionView.variables.dx_ddlCountry = $("#dx_ddlCountry").dxSelectBox({
            placeholder: "Select Country...",
            searchEnabled: true,
            onValueChanged: function (data) {
                if (data.value)
                    MaterialTransactionView.GetStatesList(data.value);
            }
        }).dxValidator({
            validationGroup: "PartyMaster",
            validationRules: [{
                type: "required",
                message: "Country is required"
            }]
        }).dxSelectBox("instance");

        MaterialTransactionView.variables.dx_ddlState = $("#dx_ddlState").dxSelectBox({
            placeholder: "Select State...",
            searchEnabled: true,
            onValueChanged: function (data) {
                if (data.value)
                    MaterialTransactionView.GetCityList(data.value);
            }
        }).dxValidator({
            validationGroup: "PartyMaster",
            validationRules: [{
                type: "required",
                message: "State is required"
            }]
        }).dxSelectBox("instance");

        MaterialTransactionView.variables.dx_ddlCity = $("#dx_ddlCity").dxSelectBox({
            placeholder: "Select City...",
            searchEnabled: true,
        }).dxValidator({
            validationGroup: "PartyMaster",
            validationRules: [{
                type: "required",
                message: "City is required"
            }]
        }).dxSelectBox("instance");

        MaterialTransactionView.variables.dx_ddlCurrency = $("#dx_ddlCurrency").dxSelectBox({
            placeholder: "Select Currency...",
            searchEnabled: true,
        }).dxValidator({
            validationGroup: "PartyMaster",
            validationRules: [{
                type: "required",
                message: "Currency is required"
            }]
        }).dxSelectBox("instance");

        MaterialTransactionView.variables.dx_btnPartyAdd = $("#dx_btnPartyAdd").dxButton({
            stylingMode: "outlined",
            type: "Primary",
            icon: "plus",
            validationGroup: "PartyMaster",
            onClick: function (e) {
                $("#Modal_PartyMaster").modal("show");
            }
        }).dxButton("instance");

        MaterialTransactionView.variables.dx_Party_btnSubmit = $("#dx_Party_btnSubmit").dxButton({
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

                MaterialTransactionView.btnMasterSubmit_Party();
            }
        }).dxButton("instance");

        MaterialTransactionView.variables.dx_Party_btnCancel = $("#dx_Party_btnCancel").dxButton({
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

        /*------------------------Fields for Add items-----------------------*/
        MaterialTransactionView.variables.dx_txtDiaPcs = $("#dx_txtDiaPcs").dxTextBox({
            readOnly: true,
            value: 0,
        }).dxValidator({
            validationGroup: "AddItems",
            validationRules: []
        }).dxTextBox("instance");

        MaterialTransactionView.variables.dx_txtDiaCrt = $("#dx_txtDiaCrt").dxTextBox({
            readOnly: true,
            value: 0,
        }).dxValidator({
            validationGroup: "AddItems",
            validationRules: []
        }).dxTextBox("instance");

        MaterialTransactionView.variables.dx_txtNetWgt = $("#dx_txtNetWgt").dxTextBox({
            readOnly: true,
            value: 0,
        }).dxValidator({
            validationGroup: "AddItems",
            validationRules: []
        }).dxTextBox("instance");

        MaterialTransactionView.variables.dx_txtGrossWgt = $("#dx_txtGrossWgt").dxTextBox({
            readOnly: true,
            value: 0,
        }).dxValidator({
            validationGroup: "AddItems",
            validationRules: []
        }).dxTextBox("instance");

        MaterialTransactionView.variables.dx_txtFineWgt = $("#dx_txtFineWgt").dxTextBox({
            readOnly: true,
            value: 0,
        }).dxValidator({
            validationGroup: "AddItems",
            validationRules: []
        }).dxTextBox("instance");

        MaterialTransactionView.variables.dx_btnSaveAddItems = $("#dx_btnSaveAddItems").dxButton({
            icon: "check",
            text: "Add",
            type: "success",
            validationGroup: "AddItems",
            onClick: function (e) {
                var validation = DevExpress.validationEngine.validateGroup("AddItems");
                if (!validation.isValid) {
                    DevExVariables.Toaster("warning", "Please fill all required fields before submit.");
                    return;
                }

                if (MaterialTransactionView.variables.Masterid > 0) {
                    MaterialTransactionView.variables.Oper = 'Edit';
                }
                else {
                    MaterialTransactionView.variables.Oper = 'Add';
                }

                var xmlNodeList = '<DETAILSLIST>';
                $.each(MaterialTransactionView.variables.DetailsControlsList, function (key, obj) {
                    if (obj) {
                        if (obj.dx_txtItemName.option().selectedItem) {
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

                            if (obj.dx_purityPer.option().value)
                                xmlNodeList += '<PURITYPER>' + obj.dx_purityPer.option().value + '</PURITYPER>';

                            if (obj.dx_txtLength.option().value)
                                xmlNodeList += '<LENGTH>' + obj.dx_txtLength.option().value + '</LENGTH>';

                            if (obj.dx_txtWidth.option().value)
                                xmlNodeList += '<WIDTH>' + obj.dx_txtWidth.option().value + '</WIDTH>';

                            if (obj.dx_txtCharni.option().selectedItem)
                                xmlNodeList += '<CHARNIID>' + obj.dx_txtCharni.option().selectedItem.charniid + '</CHARNIID>';

                            if (obj.dx_switchIsExportType.option().value)
                                xmlNodeList += '<ISEXPORTTYPE>' + obj.dx_switchIsExportType.option().value + '</ISEXPORTTYPE>';

                            if (obj.dx_switchIsPktId.option().value)
                                xmlNodeList += '<ISPKTID>' + obj.dx_switchIsPktId.option().value + '</ISPKTID>';

                            if (obj.dx_txtPieces.option().value)
                                xmlNodeList += '<PCS>' + obj.dx_txtPieces.option().value + '</PCS>';

                            if (obj.dx_txtWeight.option().value)
                                xmlNodeList += '<WGT>' + obj.dx_txtWeight.option().value + '</WGT>';

                            xmlNodeList += '<RATE>' + obj.dx_txtRate.option().value + '</RATE>';
                            xmlNodeList += '<AMOUNT>' + obj.dx_txtAmt.option().value + '</AMOUNT>';
                            xmlNodeList += '<LESSPER>' + (obj.dx_txtLess.option().value || 0) + '</LESSPER>';

                            xmlNodeList += '</DETAILS>';
                        }
                    }

                });
                xmlNodeList += '</DETAILSLIST>';

                var data = {
                    "XMLPARAM": escape(xmlNodeList),
                    "SBOOKID": MaterialTransactionView.variables.dx_ddlSubBookMaster.option().value,
                    "VOUCHERDATE": MaterialTransactionView.variables.dx_txtVoucherDate.option().text,
                    //"LOCKERID": MaterialTransactionView.variables.dx_ddllocker.option().value,
                    "VOUCHERTYPE": MaterialTransactionView.variables.dx_ddlVoucherType.option().value,
                    "ACCID": MaterialTransactionView.variables.dx_txtPartyName.option().selectedItem.accid,
                    "PARTYBILLNO": MaterialTransactionView.variables.dx_txtPartyBillNo.option().value,
                    "SALESMANID": MaterialTransactionView.variables.dx_ddlOrderby.option().value,
                    "DUEDAY": MaterialTransactionView.variables.dx_txtDueDays.option().value,
                    "TAXPROFILEID": MaterialTransactionView.variables.dx_TaxProfile.option().value,
                    "CURRENCYID": MaterialTransactionView.variables.dx_ddlCurrencyName.option().value,
                    "EXCHANGERATE": MaterialTransactionView.variables.dx_txtExchangeRate.option().value,
                    //"BILLINGADDRESSID": MaterialTransactionView.variables.dx_ddlBillingAddress.option().value,
                    //"BILLADDR_NAME": MaterialTransactionView.variables.dx_ddlBillingAddress.option().selectedItem.shipname,
                    //"BILLADDR_MOBNO": MaterialTransactionView.variables.dx_ddlBillingAddress.option().selectedItem.shipmobileno,
                    //"BILLADDR_COUNTRY": MaterialTransactionView.variables.dx_ddlBillingAddress.option().selectedItem.shipcountry,
                    //"BILLADDR_STATE": MaterialTransactionView.variables.dx_ddlBillingAddress.option().selectedItem.shipstate,
                    //"BILLADDR_CITY": MaterialTransactionView.variables.dx_ddlBillingAddress.option().selectedItem.shipcity,
                    //"BILLADDR_PINCODE": MaterialTransactionView.variables.dx_ddlBillingAddress.option().selectedItem.shipzipecode,
                    //"BILLADDR_ADDRESS": MaterialTransactionView.variables.dx_ddlBillingAddress.option().selectedItem.shipaddress,
                    //"BILLADDR_TYPE": MaterialTransactionView.variables.dx_ddlBillingAddress.option().selectedItem.address_type_id,
                    //"BILLADDR_GSTNO": MaterialTransactionView.variables.dx_ddlBillingAddress.option().selectedItem.gstno,
                    //"BILLADDR_PANNO": MaterialTransactionView.variables.dx_ddlBillingAddress.option().selectedItem.panno,
                    //"SHIPPINGADDRESSID": MaterialTransactionView.variables.dx_ddlShippingAddress.option().value,
                    //"SHIPADDR_NAME": MaterialTransactionView.variables.dx_ddlShippingAddress.option().selectedItem.shipname,
                    //"SHIPADDR_MOBNO": MaterialTransactionView.variables.dx_ddlShippingAddress.option().selectedItem.shipmobileno,
                    //"SHIPADDR_COUNTRY": MaterialTransactionView.variables.dx_ddlShippingAddress.option().selectedItem.shipcountry,
                    //"SHIPADDR_STATE": MaterialTransactionView.variables.dx_ddlShippingAddress.option().selectedItem.shipstate,
                    //"SHIPADDR_CITY": MaterialTransactionView.variables.dx_ddlShippingAddress.option().selectedItem.shipcity,
                    //"SHIPADDR_PINCODE": MaterialTransactionView.variables.dx_ddlShippingAddress.option().selectedItem.shipzipecode,
                    //"SHIPADDR_ADDRESS": MaterialTransactionView.variables.dx_ddlShippingAddress.option().selectedItem.shipaddress,
                    //"SHIPADDR_TYPE": MaterialTransactionView.variables.dx_ddlShippingAddress.option().selectedItem.address_type_id,
                    //"SHIPADDR_GSTNO": MaterialTransactionView.variables.dx_ddlShippingAddress.option().selectedItem.gstno,
                    //"SHIPADDR_PANNO": MaterialTransactionView.variables.dx_ddlShippingAddress.option().selectedItem.panno,
                    "ROUNDOFF": MaterialTransactionView.variables.txtRoundOff.option().value || 0,
                    "ROUNDOFFTYPE": $("[name='rd_RoundOff']:checked").val(),
                    "FREIGHTCHARGES": MaterialTransactionView.variables.txtFreightCharges.option().value || 0,
                    "REMARKS": MaterialTransactionView.variables.dx_txtRemarks.option().value,
                    //"BROKERID": MaterialTransactionView.variables.dx_ddlBroker.option().value,
                    "BROKERAGE": MaterialTransactionView.variables.dx_txtBrokerage.option().value || 0,
                    //"COURIERID": MaterialTransactionView.variables.dx_ddlcourier.option().value,
                    "ISFINALSUBMIT": 0,
                    "MT_ID": MaterialTransactionView.variables.Masterid,
                    "oper": MaterialTransactionView.variables.Oper,
                    "OPER_TYPE": "Item_Add"
                }

                if (MaterialTransactionView.variables.dx_ddllocker.option().value)
                    data.LOCKERID = MaterialTransactionView.variables.dx_ddllocker.option().value;

                if (MaterialTransactionView.variables.dx_ddlBillingAddress.option().value) {
                    data.BILLINGADDRESSID = MaterialTransactionView.variables.dx_ddlBillingAddress.option().value;
                }

                if (MaterialTransactionView.variables.dx_ddlShippingAddress.option().value) {
                    data.SHIPPINGADDRESSID = MaterialTransactionView.variables.dx_ddlShippingAddress.option().value;
                }

                if (MaterialTransactionView.variables.dx_ddlBroker.option().value)
                    data.BROKERID = MaterialTransactionView.variables.dx_ddlBroker.option().value;

                $.ajax({
                    url: getDomain() + MaterialTransactionView.variables.PerformMasterOperationUrl,
                    data: data,
                    async: true,
                    cache: false,
                    type: 'POST',
                    success: function (data) {
                        if ($(data).find('RESPONSECODE').text() == "0") {
                            DevExVariables.Toaster("success", 'Records are Added successfully.');

                            MaterialTransactionView.clearControlsForAddItems();
                            $("#Modal_AddItems").modal("hide");
                            MaterialTransactionView.variables.dx_dataGridItems.refresh();

                            if (MaterialTransactionView.variables.Oper == 'Add') {
                                MaterialTransactionView.variables.Masterid = $(data).find('MT_ID').text();
                                MaterialTransactionView.variables.dx_txtVoucherNo.option({ value: $(data).find('VOUCHERNO').text() });
                                MaterialTransactionView.variables.dx_ddlSubBookMaster.option({ disabled: true });
                                $("#AttachmentsList").show();
                            }
                        }
                        else {
                            DevExVariables.InvalidResponseCode(data);
                        }
                    },
                    error: OnError,
                });

            }
        }).dxButton("instance");

        MaterialTransactionView.variables.dx_btnCancelAddItems = $("#dx_btnCancelAddItems").dxButton({
            icon: "close",
            text: "Cancel",
            type: "danger",
            onClick: function (e) {
                MaterialTransactionView.clearControlsForAddItems();
                $("#Modal_AddItems").modal("hide");
            }
        }).dxButton("instance");

        MaterialTransactionView.variables.dx_btnAddDetailItem = $("#dx_btnAddDetailItem").dxButton({
            stylingMode: "outlined",
            icon: "plus",
            text: "Add Item",
            type: "default",
            validationGroup: "MaterialTransaction",
            onClick: function (e) {
                var validation = DevExpress.validationEngine.validateGroup("MaterialTransaction");
                if (!validation.isValid) {
                    DevExVariables.Toaster("warning", "Please fill all required fields before submit.");
                    return;
                }

                if (MaterialTransactionView.variables.dx_ddlSubBookMaster.option().displayValue == "Material Purchase" || MaterialTransactionView.variables.dx_ddlSubBookMaster.option().displayValue == "Material Import") {
                    $("#Modal_AddItems").modal("show");
                }
                else {
                    $("#modal_StockItems").modal("show");
                }
            }
        }).dxButton("instance");

        MaterialTransactionView.variables.dx_btnRemoveItem = $("#dx_btnRemoveItem").dxButton({
            icon: "trash",
            text: "Remove",
            type: "danger",
            disabled: true,
            onClick: function (e) {
                MaterialTransactionView.variables.dx_popupItemRemove.show();
            }
        }).dxButton("instance");

        MaterialTransactionView.variables.dx_btnSaveStockItems = $("#dx_btnSaveStockItems").dxButton({
            icon: "check",
            text: "Add",
            type: "success",
            onClick: function (e) {
                var SelectedItemList = [];
                SelectedItemList = MaterialTransactionView.variables.dx_dataGridStockItems.getSelectedRowsData();
                if (SelectedItemList.length == 0) {
                    DevExVariables.Toaster("warning", "Please select atleast one item to Add.");
                    return;
                }

                var IsValid = true;
                $.each(SelectedItemList, function (key, obj) {
                    if (!obj.inspcs || !obj.inswgt || !obj.rate)
                        IsValid = false;
                });
                if (!IsValid) {
                    DevExVariables.Toaster("warning", "Pcs,Wgt and Rate should not be blank or 0.");
                    return;
                }


                if (MaterialTransactionView.variables.Masterid > 0) {
                    MaterialTransactionView.variables.Oper = 'Edit';
                }
                else {
                    MaterialTransactionView.variables.Oper = 'Add';
                }

                var xmlNodeList = '<DETAILSLIST>';
                $.each(SelectedItemList, function (key, obj) {
                    xmlNodeList += '<DETAILS>';
                    xmlNodeList += '<RMCODEID>' + obj.rmcodeid + '</RMCODEID>';
                    xmlNodeList += '<RMCATEID>' + obj.rmcateid + '</RMCATEID>';
                    xmlNodeList += '<RMSUBCATEID>' + obj.rmsubcateid + '</RMSUBCATEID>';

                    if (obj.shapeid)
                        xmlNodeList += '<SHAPEID>' + obj.shapeid + '</SHAPEID>';

                    if (obj.purityid)
                        xmlNodeList += '<PURITYID>' + obj.purityid + '</PURITYID>';

                    if (obj.colorid)
                        xmlNodeList += '<COLORID>' + obj.colorid + '</COLORID>';

                    if (obj.purityper)
                        xmlNodeList += '<PURITYPER>' + obj.purityper + '</PURITYPER>';

                    if (obj.isexporttype)
                        xmlNodeList += '<ISEXPORTTYPE>' + obj.isexporttype + '</ISEXPORTTYPE>';

                    if (obj.packetid)
                        xmlNodeList += '<PACKETID>' + obj.packetid + '</PACKETID>';

                    if (obj.length)
                        xmlNodeList += '<LENGTH>' + obj.length + '</LENGTH>';

                    if (obj.width)
                        xmlNodeList += '<WIDTH>' + obj.width + '</WIDTH>';

                    if (obj.charniid)
                        xmlNodeList += '<CHARNIID>' + obj.charniid + '</CHARNIID>';

                    xmlNodeList += '<PCS>' + obj.inspcs + '</PCS>';
                    xmlNodeList += '<WGT>' + obj.inswgt + '</WGT>';
                    xmlNodeList += '<RATE>' + obj.rate + '</RATE>';
                    xmlNodeList += '<AMOUNT>' + obj.amt + '</AMOUNT>';
                    xmlNodeList += '<LESSPER>' + (obj.less || 0) + '</LESSPER>';

                    xmlNodeList += '</DETAILS>';
                });
                xmlNodeList += '</DETAILSLIST>';

                var data = {
                    "XMLPARAM": escape(xmlNodeList),
                    "SBOOKID": MaterialTransactionView.variables.dx_ddlSubBookMaster.option().value,
                    "VOUCHERDATE": MaterialTransactionView.variables.dx_txtVoucherDate.option().text,
                    //"LOCKERID": MaterialTransactionView.variables.dx_ddllocker.option().value,
                    "VOUCHERTYPE": MaterialTransactionView.variables.dx_ddlVoucherType.option().value,
                    "ACCID": MaterialTransactionView.variables.dx_txtPartyName.option().selectedItem.accid,
                    "PARTYBILLNO": MaterialTransactionView.variables.dx_txtPartyBillNo.option().value,
                    "SALESMANID": MaterialTransactionView.variables.dx_ddlOrderby.option().value,
                    "DUEDAY": MaterialTransactionView.variables.dx_txtDueDays.option().value,
                    "TAXPROFILEID": MaterialTransactionView.variables.dx_TaxProfile.option().value,
                    "CURRENCYID": MaterialTransactionView.variables.dx_ddlCurrencyName.option().value,
                    "EXCHANGERATE": MaterialTransactionView.variables.dx_txtExchangeRate.option().value,
                    //"BILLINGADDRESSID": MaterialTransactionView.variables.dx_ddlBillingAddress.option().value,
                    //"BILLADDR_NAME": MaterialTransactionView.variables.dx_ddlBillingAddress.option().selectedItem.shipname,
                    //"BILLADDR_MOBNO": MaterialTransactionView.variables.dx_ddlBillingAddress.option().selectedItem.shipmobileno,
                    //"BILLADDR_COUNTRY": MaterialTransactionView.variables.dx_ddlBillingAddress.option().selectedItem.shipcountry,
                    //"BILLADDR_STATE": MaterialTransactionView.variables.dx_ddlBillingAddress.option().selectedItem.shipstate,
                    //"BILLADDR_CITY": MaterialTransactionView.variables.dx_ddlBillingAddress.option().selectedItem.shipcity,
                    //"BILLADDR_PINCODE": MaterialTransactionView.variables.dx_ddlBillingAddress.option().selectedItem.shipzipecode,
                    //"BILLADDR_ADDRESS": MaterialTransactionView.variables.dx_ddlBillingAddress.option().selectedItem.shipaddress,
                    //"BILLADDR_TYPE": MaterialTransactionView.variables.dx_ddlBillingAddress.option().selectedItem.address_type_id,
                    //"BILLADDR_GSTNO": MaterialTransactionView.variables.dx_ddlBillingAddress.option().selectedItem.gstno,
                    //"BILLADDR_PANNO": MaterialTransactionView.variables.dx_ddlBillingAddress.option().selectedItem.panno,
                    //"SHIPPINGADDRESSID": MaterialTransactionView.variables.dx_ddlShippingAddress.option().value,
                    //"SHIPADDR_NAME": MaterialTransactionView.variables.dx_ddlShippingAddress.option().selectedItem.shipname,
                    //"SHIPADDR_MOBNO": MaterialTransactionView.variables.dx_ddlShippingAddress.option().selectedItem.shipmobileno,
                    //"SHIPADDR_COUNTRY": MaterialTransactionView.variables.dx_ddlShippingAddress.option().selectedItem.shipcountry,
                    //"SHIPADDR_STATE": MaterialTransactionView.variables.dx_ddlShippingAddress.option().selectedItem.shipstate,
                    //"SHIPADDR_CITY": MaterialTransactionView.variables.dx_ddlShippingAddress.option().selectedItem.shipcity,
                    //"SHIPADDR_PINCODE": MaterialTransactionView.variables.dx_ddlShippingAddress.option().selectedItem.shipzipecode,
                    //"SHIPADDR_ADDRESS": MaterialTransactionView.variables.dx_ddlShippingAddress.option().selectedItem.shipaddress,
                    //"SHIPADDR_TYPE": MaterialTransactionView.variables.dx_ddlShippingAddress.option().selectedItem.address_type_id,
                    //"SHIPADDR_GSTNO": MaterialTransactionView.variables.dx_ddlShippingAddress.option().selectedItem.gstno,
                    //"SHIPADDR_PANNO": MaterialTransactionView.variables.dx_ddlShippingAddress.option().selectedItem.panno,
                    "ROUNDOFF": MaterialTransactionView.variables.txtRoundOff.option().value || 0,
                    "ROUNDOFFTYPE": $("[name='rd_RoundOff']:checked").val(),
                    "FREIGHTCHARGES": MaterialTransactionView.variables.txtFreightCharges.option().value || 0,
                    "REMARKS": MaterialTransactionView.variables.dx_txtRemarks.option().value,
                    //"BROKERID": MaterialTransactionView.variables.dx_ddlBroker.option().value,
                    "BROKERAGE": MaterialTransactionView.variables.dx_txtBrokerage.option().value || 0,
                    //"COURIERID": MaterialTransactionView.variables.dx_ddlcourier.option().value,
                    "ISFINALSUBMIT": 0,
                    "MT_ID": MaterialTransactionView.variables.Masterid,
                    "oper": MaterialTransactionView.variables.Oper,
                    "OPER_TYPE": "Item_Add"
                }

                if (MaterialTransactionView.variables.dx_ddllocker.option().value)
                    data.LOCKERID = MaterialTransactionView.variables.dx_ddllocker.option().value;

                if (MaterialTransactionView.variables.dx_ddlBillingAddress.option().value) {
                    data.BILLINGADDRESSID = MaterialTransactionView.variables.dx_ddlBillingAddress.option().value;
                }

                if (MaterialTransactionView.variables.dx_ddlShippingAddress.option().value) {
                    data.SHIPPINGADDRESSID = MaterialTransactionView.variables.dx_ddlShippingAddress.option().value;
                }

                if (MaterialTransactionView.variables.dx_ddlBroker.option().value)
                    data.BROKERID = MaterialTransactionView.variables.dx_ddlBroker.option().value;

                $.ajax({
                    url: getDomain() + MaterialTransactionView.variables.PerformMasterOperationUrl,
                    data: data,
                    async: true,
                    cache: false,
                    type: 'POST',
                    success: function (data) {
                        if ($(data).find('RESPONSECODE').text() == "0") {
                            DevExVariables.Toaster("success", 'Records are Added successfully.');

                            MaterialTransactionView.variables.dx_dataGridStockItems.clearSelection();
                            $("#modal_StockItems").modal("hide");
                            MaterialTransactionView.variables.dx_dataGridItems.refresh();

                            if (MaterialTransactionView.variables.Oper == 'Add') {
                                MaterialTransactionView.variables.Masterid = $(data).find('MT_ID').text();
                                MaterialTransactionView.variables.dx_txtVoucherNo.option({ value: $(data).find('VOUCHERNO').text() });
                                MaterialTransactionView.variables.dx_ddlSubBookMaster.option({ disabled: true });
                                $("#AttachmentsList").show();
                            }
                        }
                        else {
                            DevExVariables.InvalidResponseCode(data);
                        }
                    },
                    error: OnError,
                });

            }
        }).dxButton("instance");

        MaterialTransactionView.variables.dx_btnCancelStockItems = $("#dx_btnCancelStockItems").dxButton({
            icon: "close",
            text: "Cancel",
            type: "danger",
            onClick: function (e) {
                MaterialTransactionView.variables.dx_dataGridStockItems.clearSelection();
                $("#modal_StockItems").modal("hide");
            }
        }).dxButton("instance");

        MaterialTransactionView.variables.dx_btnSaveReturnItems = $("#dx_btnSaveReturnItems").dxButton({
            icon: "check",
            text: "Add",
            type: "success",
            onClick: function (e) {
                var SelectedItemList = [];
                SelectedItemList = MaterialTransactionView.variables.dx_dataGridReturnItems.getSelectedRowsData();
                if (SelectedItemList.length == 0) {
                    DevExVariables.Toaster("warning", "Please select atleast one item to Add.");
                    return;
                }

                var IsValid = true;
                $.each(SelectedItemList, function (key, obj) {
                    if (!obj.inspcs || !obj.inswgt || !obj.rate)
                        IsValid = false;
                });
                if (!IsValid) {
                    DevExVariables.Toaster("warning", "Pcs,Wgt and Rate should not be blank or 0.");
                    return;
                }


                if (MaterialTransactionView.variables.Masterid > 0) {
                    MaterialTransactionView.variables.Oper = 'Edit';
                }
                else {
                    MaterialTransactionView.variables.Oper = 'Add';
                }

                var xmlNodeList = '<DETAILSLIST>';
                $.each(SelectedItemList, function (key, obj) {
                    xmlNodeList += '<DETAILS>';
                    xmlNodeList += '<RMCODEID>' + obj.rmcodeid + '</RMCODEID>';
                    xmlNodeList += '<RMCATEID>' + obj.rmcateid + '</RMCATEID>';
                    xmlNodeList += '<RMSUBCATEID>' + obj.rmsubcateid + '</RMSUBCATEID>';

                    if (obj.shapeid)
                        xmlNodeList += '<SHAPEID>' + obj.shapeid + '</SHAPEID>';

                    if (obj.purityid)
                        xmlNodeList += '<PURITYID>' + obj.purityid + '</PURITYID>';

                    if (obj.colorid)
                        xmlNodeList += '<COLORID>' + obj.colorid + '</COLORID>';

                    if (obj.purityper)
                        xmlNodeList += '<PURITYPER>' + obj.purityper + '</PURITYPER>';

                    if (obj.isexporttype)
                        xmlNodeList += '<ISEXPORTTYPE>' + obj.isexporttype + '</ISEXPORTTYPE>';

                    if (obj.packetid)
                        xmlNodeList += '<PACKETID>' + obj.packetid + '</PACKETID>';

                    if (obj.length)
                        xmlNodeList += '<LENGTH>' + obj.length + '</LENGTH>';

                    if (obj.width)
                        xmlNodeList += '<WIDTH>' + obj.width + '</WIDTH>';

                    if (obj.charniid)
                        xmlNodeList += '<CHARNIID>' + obj.charniid + '</CHARNIID>';

                    xmlNodeList += '<PCS>' + obj.inspcs + '</PCS>';
                    xmlNodeList += '<WGT>' + obj.inswgt + '</WGT>';
                    xmlNodeList += '<RATE>' + obj.rate + '</RATE>';
                    xmlNodeList += '<AMOUNT>' + obj.amt + '</AMOUNT>';
                    xmlNodeList += '<LESSPER>' + (obj.less || 0) + '</LESSPER>';

                    xmlNodeList += '</DETAILS>';
                });
                xmlNodeList += '</DETAILSLIST>';

                var data = {
                    "XMLPARAM": escape(xmlNodeList),
                    "SBOOKID": MaterialTransactionView.variables.dx_ddlSubBookMaster.option().value,
                    "VOUCHERDATE": MaterialTransactionView.variables.dx_txtVoucherDate.option().text,
                    //"LOCKERID": MaterialTransactionView.variables.dx_ddllocker.option().value,
                    "VOUCHERTYPE": MaterialTransactionView.variables.dx_ddlVoucherType.option().value,
                    "RETURNFROMMT_ID": MaterialTransactionView.variables.dx_txtVoucherReturn.option().selectedItem.mt_id,
                    "RETURNFROMVOUCHERNO": MaterialTransactionView.variables.dx_txtVoucherReturn.option().selectedItem.voucherno,
                    "ACCID": MaterialTransactionView.variables.dx_txtPartyName.option().selectedItem.accid,
                    "PARTYBILLNO": MaterialTransactionView.variables.dx_txtPartyBillNo.option().value,
                    "SALESMANID": MaterialTransactionView.variables.dx_ddlOrderby.option().value,
                    "DUEDAY": MaterialTransactionView.variables.dx_txtDueDays.option().value,
                    "TAXPROFILEID": MaterialTransactionView.variables.dx_TaxProfile.option().value,
                    "CURRENCYID": MaterialTransactionView.variables.dx_ddlCurrencyName.option().value,
                    "EXCHANGERATE": MaterialTransactionView.variables.dx_txtExchangeRate.option().value,
                    //"BILLINGADDRESSID": MaterialTransactionView.variables.dx_ddlBillingAddress.option().value,
                    //"BILLADDR_NAME": MaterialTransactionView.variables.dx_ddlBillingAddress.option().selectedItem.shipname,
                    //"BILLADDR_MOBNO": MaterialTransactionView.variables.dx_ddlBillingAddress.option().selectedItem.shipmobileno,
                    //"BILLADDR_COUNTRY": MaterialTransactionView.variables.dx_ddlBillingAddress.option().selectedItem.shipcountry,
                    //"BILLADDR_STATE": MaterialTransactionView.variables.dx_ddlBillingAddress.option().selectedItem.shipstate,
                    //"BILLADDR_CITY": MaterialTransactionView.variables.dx_ddlBillingAddress.option().selectedItem.shipcity,
                    //"BILLADDR_PINCODE": MaterialTransactionView.variables.dx_ddlBillingAddress.option().selectedItem.shipzipecode,
                    //"BILLADDR_ADDRESS": MaterialTransactionView.variables.dx_ddlBillingAddress.option().selectedItem.shipaddress,
                    //"BILLADDR_TYPE": MaterialTransactionView.variables.dx_ddlBillingAddress.option().selectedItem.address_type_id,
                    //"BILLADDR_GSTNO": MaterialTransactionView.variables.dx_ddlBillingAddress.option().selectedItem.gstno,
                    //"BILLADDR_PANNO": MaterialTransactionView.variables.dx_ddlBillingAddress.option().selectedItem.panno,
                    //"SHIPPINGADDRESSID": MaterialTransactionView.variables.dx_ddlShippingAddress.option().value,
                    //"SHIPADDR_NAME": MaterialTransactionView.variables.dx_ddlShippingAddress.option().selectedItem.shipname,
                    //"SHIPADDR_MOBNO": MaterialTransactionView.variables.dx_ddlShippingAddress.option().selectedItem.shipmobileno,
                    //"SHIPADDR_COUNTRY": MaterialTransactionView.variables.dx_ddlShippingAddress.option().selectedItem.shipcountry,
                    //"SHIPADDR_STATE": MaterialTransactionView.variables.dx_ddlShippingAddress.option().selectedItem.shipstate,
                    //"SHIPADDR_CITY": MaterialTransactionView.variables.dx_ddlShippingAddress.option().selectedItem.shipcity,
                    //"SHIPADDR_PINCODE": MaterialTransactionView.variables.dx_ddlShippingAddress.option().selectedItem.shipzipecode,
                    //"SHIPADDR_ADDRESS": MaterialTransactionView.variables.dx_ddlShippingAddress.option().selectedItem.shipaddress,
                    //"SHIPADDR_TYPE": MaterialTransactionView.variables.dx_ddlShippingAddress.option().selectedItem.address_type_id,
                    //"SHIPADDR_GSTNO": MaterialTransactionView.variables.dx_ddlShippingAddress.option().selectedItem.gstno,
                    //"SHIPADDR_PANNO": MaterialTransactionView.variables.dx_ddlShippingAddress.option().selectedItem.panno,
                    "ROUNDOFF": MaterialTransactionView.variables.txtRoundOff.option().value || 0,
                    "ROUNDOFFTYPE": $("[name='rd_RoundOff']:checked").val(),
                    "FREIGHTCHARGES": MaterialTransactionView.variables.txtFreightCharges.option().value || 0,
                    "REMARKS": MaterialTransactionView.variables.dx_txtRemarks.option().value,
                    //"BROKERID": MaterialTransactionView.variables.dx_ddlBroker.option().value,
                    "BROKERAGE": MaterialTransactionView.variables.dx_txtBrokerage.option().value || 0,
                    //"COURIERID": MaterialTransactionView.variables.dx_ddlcourier.option().value,
                    "ISFINALSUBMIT": 0,
                    "MT_ID": MaterialTransactionView.variables.Masterid,
                    "oper": MaterialTransactionView.variables.Oper,
                    "OPER_TYPE": "Item_Add"
                }

                if (MaterialTransactionView.variables.dx_ddllocker.option().value)
                    data.LOCKERID = MaterialTransactionView.variables.dx_ddllocker.option().value;

                if (MaterialTransactionView.variables.dx_ddlBillingAddress.option().value) {
                    data.BILLINGADDRESSID = MaterialTransactionView.variables.dx_ddlBillingAddress.option().value;
                }

                if (MaterialTransactionView.variables.dx_ddlShippingAddress.option().value) {
                    data.SHIPPINGADDRESSID = MaterialTransactionView.variables.dx_ddlShippingAddress.option().value;
                }

                if (MaterialTransactionView.variables.dx_ddlBroker.option().value)
                    data.BROKERID = MaterialTransactionView.variables.dx_ddlBroker.option().value;

                $.ajax({
                    url: getDomain() + MaterialTransactionView.variables.PerformMasterOperationUrl,
                    data: data,
                    async: true,
                    cache: false,
                    type: 'POST',
                    success: function (data) {
                        if ($(data).find('RESPONSECODE').text() == "0") {
                            DevExVariables.Toaster("success", 'Records are Added successfully.');

                            MaterialTransactionView.variables.dx_dataGridReturnItems.clearSelection();
                            $("#modal_ReturnItems").modal("hide");
                            MaterialTransactionView.variables.dx_dataGridItems.refresh();

                            if (MaterialTransactionView.variables.Oper == 'Add') {
                                MaterialTransactionView.variables.Masterid = $(data).find('MT_ID').text();
                                MaterialTransactionView.variables.dx_txtVoucherNo.option({ value: $(data).find('VOUCHERNO').text() });
                                MaterialTransactionView.variables.dx_ddlSubBookMaster.option({ disabled: true });
                                MaterialTransactionView.variables.dx_txtVoucherReturn.option({ disabled: true });
                                $("#AttachmentsList").show();
                            }
                        }
                        else {
                            DevExVariables.InvalidResponseCode(data);
                        }
                    },
                    error: OnError,
                });

            }
        }).dxButton("instance");

        MaterialTransactionView.variables.dx_btnCancelReturnItems = $("#dx_btnCancelReturnItems").dxButton({
            icon: "close",
            text: "Cancel",
            type: "danger",
            onClick: function (e) {
                MaterialTransactionView.variables.dx_dataGridReturnItems.clearSelection();
                $("#modal_ReturnItems").modal("hide");
            }
        }).dxButton("instance");
        /*------------------------/Fields for Add items-----------------------*/

        MaterialTransactionView.variables.dx_dataGridItems = $("#dx_dataGridItems").dxDataGrid({
            dataSource: new DevExpress.data.CustomStore({
                key: "mtd_id",
                load: function (loadOptions) {
                    var deferred = $.Deferred();
                    if (MaterialTransactionView.variables.Masterid) {
                        var myfilter = { rules: [] };
                        myfilter.rules.push({ field: "MT_ID", op: "eq", data: MaterialTransactionView.variables.Masterid });
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
                            url: getDomain() + MaterialTransactionView.variables.BindDetailListUrl + "&" + parameters.join("&") + "&myfilters=" + JSON.stringify(myfilter),
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
                                MaterialTransactionView.variables.txtTaxableAmount.option({ value: (result.serviceresponse.totaldetails.taxableamt).toFixed(2) || 0.00 });
                                MaterialTransactionView.variables.txtAmount.option({ value: (result.serviceresponse.totaldetails.amountwithtax).toFixed(2) || 0.00 });
                                MaterialTransactionView.variables.txtRoundOff.option({ value: (result.serviceresponse.totaldetails.roundoff).toFixed(2) || 0.00 });
                                MaterialTransactionView.variables.txtTotalAmount.option({ value: (result.serviceresponse.totaldetails.finalbillamount).toFixed(2) || 0.00 });
                                MaterialTransactionView.variables.txtTotalAmountInRs.option({ value: (result.serviceresponse.totaldetails.finalamtinrs).toFixed(2) || 0.00 });
                                $(".divTax").remove();

                                if (result.serviceresponse.totaldetails.taxlist) {
                                    var tempTaxList = "", list = [];
                                    if (result.serviceresponse.totaldetails.taxlist.tax.length)
                                        list = result.serviceresponse.totaldetails.taxlist.tax;
                                    else
                                        list.push(result.serviceresponse.totaldetails.taxlist.tax);

                                    $.each(list, function (key, obj) {
                                        tempTaxList += '<div class="form-group divTax">'
                                                        + '<label class="control-label col-lg-3 col-lg-offset-7">' + obj.taxname + '</label>'
                                                        + '<div class="col-lg-2">'
                                                            + '<input type="text" class="form-control text-right" name="txt_' + obj.taxname + '" id="txt_' + obj.taxname + '" value="' + obj.totaltaxamt.toFixed(2) + '" readonly />'
                                                        + '</div>'
                                                    + '</div>';
                                    });

                                    $(tempTaxList).insertBefore("#div_AmountWithTax");
                                }
                            }
                            else {
                                MaterialTransactionView.variables.txtTaxableAmount.option({ value: 0.00 });
                                MaterialTransactionView.variables.txtAmount.option({ value: 0.00 });
                                MaterialTransactionView.variables.txtRoundOff.option({ value: 0.00 });
                                MaterialTransactionView.variables.txtTotalAmount.option({ value: 0.00 });
                                MaterialTransactionView.variables.txtTotalAmountInRs.option({ value: 0.00 });
                                $(".divTax").remove();
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
                    //var deferred = $.Deferred();
                    //var result;
                    //result = MaterialTransactionView.UpdateSingleItem(key, values);

                    //if (result != "Error") {
                    //    deferred.resolve();
                    //}
                    //else {
                    //    deferred.reject("Data Loading Error");
                    //}
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
                visible: true
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
            columns: [{ dataField: "mtd_id", allowSorting: true, sortIndex: 1, sortOrder: "desc", visible: false, allowEditing: false },
                { dataField: "mt_id", allowSorting: false, visible: false, allowEditing: false },
                { dataField: "rownum", caption: "No.", dataType: "number", allowSorting: false, allowFiltering: false, allowHeaderFiltering: false, allowEditing: false },
                { dataField: "packetid", caption: "Pkt Id", dataType: "string", allowSorting: false, allowFiltering: true, filterOperations: ["contains"], allowHeaderFiltering: false, allowEditing: false },
                { dataField: "rmcode", caption: "Code", dataType: "string", allowSorting: false, allowFiltering: true, filterOperations: ["contains"], allowHeaderFiltering: false, allowEditing: false },
                { dataField: "shape", caption: "Shape", dataType: "string", allowSorting: false, allowFiltering: true, filterOperations: ["contains"], allowHeaderFiltering: false, allowEditing: false },
                { dataField: "purity", caption: "Purity", dataType: "string", allowSorting: false, allowFiltering: true, filterOperations: ["contains"], allowHeaderFiltering: false, allowEditing: false },
                { dataField: "colour", caption: "Color", dataType: "string", allowSorting: false, allowFiltering: true, filterOperations: ["contains"], allowHeaderFiltering: false, allowEditing: false },
                { dataField: "cut", caption: "Cut", dataType: "string", allowSorting: false, allowFiltering: true, filterOperations: ["contains"], allowHeaderFiltering: false, allowEditing: false },
                { dataField: "length", caption: "Length", dataType: "number", allowSorting: false, allowFiltering: false, allowHeaderFiltering: false, allowEditing: false },
                { dataField: "width", caption: "Width", dataType: "number", allowSorting: false, allowFiltering: false, allowHeaderFiltering: false, allowEditing: false },
                { dataField: "charni", caption: "Charni", dataType: "string", allowSorting: false, allowFiltering: true, filterOperations: ["contains"], allowHeaderFiltering: false, allowEditing: false },
                { dataField: "purityper", caption: "Purity Per", dataType: "number", allowSorting: false, allowFiltering: false, allowHeaderFiltering: false, allowEditing: false },
                {
                    dataField: "isexporttype", caption: "Is Export", dataType: "string", alignment: "center", allowSorting: false, allowFiltering: false, filterOperations: ["contains"], allowHeaderFiltering: true, allowEditing: false,
                    headerFilter: {
                        dataSource: [{
                            text: "Yes",
                            value: ["isexporttype", "equals", 1]
                        }, {
                            text: "No",
                            value: ["isexporttype", "equals", 0]
                        }]
                    },
                    cellTemplate: function (container, options) {
                        var temp;
                        if (options.displayValue == "1") {
                            temp = '<span class="label label-success" style="font-size: 100%; !important">Yes</span>';
                        }
                        else {
                            temp = '<span class="label label-danger" style="font-size: 100%; !important">No</span>';
                        }

                        $(temp).appendTo(container);
                    }
                },
                { dataField: "pcs", caption: "Pcs", dataType: "number", allowSorting: false, allowFiltering: false, allowHeaderFiltering: false, allowEditing: false },
                { dataField: "wgt", caption: "Wgt", dataType: "number", allowSorting: false, allowFiltering: false, allowHeaderFiltering: false, allowEditing: false },
                { dataField: "rate", caption: "Rate", dataType: "number", allowSorting: false, allowFiltering: false, allowHeaderFiltering: false, allowEditing: false },
                { dataField: "amt", caption: "Amt", dataType: "number", visible: false, allowSorting: false, allowFiltering: false, allowHeaderFiltering: false, allowEditing: false },
                { dataField: "lessper", caption: "Less(%)", dataType: "number", allowSorting: false, allowFiltering: false, allowHeaderFiltering: false, allowEditing: false },
                { dataField: "lessamt", caption: "Less Amt", dataType: "number", visible: false, allowSorting: false, allowFiltering: false, allowHeaderFiltering: false, allowEditing: false },
                { dataField: "taxableamt", caption: "Taxable Amt", dataType: "number", allowSorting: false, allowFiltering: false, allowHeaderFiltering: false, allowEditing: false },
                { dataField: "hsncodename", caption: "HSN Code", dataType: "string", visible: false, allowSorting: false, allowFiltering: false, allowHeaderFiltering: false, allowEditing: false },
                { dataField: "tax", caption: "Tax", dataType: "number", visible: false, allowSorting: false, allowFiltering: false, allowHeaderFiltering: false, allowEditing: false },
                { dataField: "amountwithtax", caption: "Amt With Tax", visible: false, dataType: "number", allowSorting: false, allowFiltering: false, allowHeaderFiltering: false, allowEditing: false },
                {
                    dataField: "video", caption: "Video", dataType: "string", alignment: "center", allowSorting: false, allowFiltering: false, allowHeaderFiltering: false, allowEditing: false,
                    cellTemplate: function (container, options) {
                        var temp = "";
                        temp += '<label class="btn btn-default" style="padding: 2px 6px !important;" title="Upload Video" for="btn_VideoUpload' + options.key + '" \'><input type="file" class="hide" accept="mp4" id="btn_VideoUpload' + options.key + '" /><i class="fa fa-upload"></i></label>';
                        if (options.displayValue)
                            temp += '<a href="' + getDomain() + '/UploadFiles/MaterialTransaction/' + options.displayValue + '" target="_blank" class="btn btn-info" style="padding: 2px 6px !important;margin-left:5px;" title="View Video" id="btn_VideoView' + options.key + '" \'><i class="fa fa-play"></i></a>';
                        else
                            temp += '<a href="" target="_blank" class="btn btn-info" style="padding: 2px 6px !important;margin-left:5px;display:none;" title="View Video" id="btn_VideoView' + options.key + '" \'><i class="fa fa-play"></i></a>';

                        $(temp).appendTo(container);

                        MaterialTransactionView.RegisterItemDocsUpload(options.key, "btn_VideoUpload" + options.key, "btn_VideoView" + options.key, "Video");
                    }
                },
                {
                    dataField: "certificate", caption: "Certificate", dataType: "string", alignment: "center", allowSorting: false, allowFiltering: false, allowHeaderFiltering: false, allowEditing: false,
                    cellTemplate: function (container, options) {
                        var temp = "";
                        temp += '<label class="btn btn-default" style="padding: 2px 6px !important;" title="Upload Certificate" for="btn_CertiUpload' + options.key + '" \'><input type="file" class="hide" accept="image/*,application/pdf" id="btn_CertiUpload' + options.key + '" /><i class="fa fa-upload"></i></label>';
                        if (options.displayValue)
                            temp += '<a href="' + getDomain() + '/UploadFiles/MaterialTransaction/' + options.displayValue + '" target="_blank" class="btn btn-info" style="padding: 2px 6px !important;margin-left:5px;" title="View Certificate" id="btn_CertiView' + options.key + '" \'><i class="fa fa-file-image-o"></i></a>';
                        else
                            temp += '<a href="" target="_blank" class="btn btn-info" style="padding: 2px 6px !important;margin-left:5px;display:none;" title="View Certificate" id="btn_CertiView' + options.key + '" \'><i class="fa fa-file-image-o"></i></a>';

                        $(temp).appendTo(container);

                        MaterialTransactionView.RegisterItemDocsUpload(options.key, "btn_CertiUpload" + options.key, "btn_CertiView" + options.key, "Certi");
                    }
                },
            ],
            onSelectionChanged(selectedItems) {
                $("#SelectedItemCount").html(selectedItems.selectedRowsData.length);
                if (selectedItems.selectedRowKeys.length > 0) {
                    MaterialTransactionView.variables.dx_btnRemoveItem.option({ disabled: false });
                }
                else {
                    MaterialTransactionView.variables.dx_btnRemoveItem.option({ disabled: true });
                }
            },
        }).dxDataGrid("instance");

        /*-------Start Bottom Left controls-------------------------------------*/
        MaterialTransactionView.variables.dx_ddlBroker = $("#dx_ddlBroker").dxSelectBox({
            placeholder: "Select Broker Name...",
            searchEnabled: true,
        }).dxValidator({
            validationGroup: "MaterialTransaction",
            validationRules: [{
                type: "required",
                message: "Broker is required"
            }]
        }).dxSelectBox("instance");

        MaterialTransactionView.variables.dx_txtBrokerage = $("#dx_txtBrokerage").dxNumberBox({
            min: 0,
        }).dxValidator({
            validationGroup: "MaterialTransaction",
            validationRules: []
        }).dxNumberBox("instance");

        MaterialTransactionView.variables.dx_txtRemarks = $("#dx_txtRemarks").dxTextArea({
            height: 160,
            placeholder: "Enter Note"
        }).dxValidator({
            validationGroup: "MaterialTransaction",
            validationRules: []
        }).dxTextArea("instance");
        /*-------End Bottom Left controls-------------------------------------*/

        /*-------Start Bottom Right controls-------------------------------------*/
        MaterialTransactionView.variables.txtFreightCharges = $("#txtFreightCharges").dxNumberBox({
            min: 0,
            inputAttr: {
                class: "text-right"
            },
            onValueChanged: function (data) {
                //if (data.value)
                //    MaterialTransactionView.CalcTotalWgts();
            }
        }).dxValidator({
            validationGroup: "MaterialTransaction",
            validationRules: []
        }).dxNumberBox("instance");

        MaterialTransactionView.variables.txtTaxableAmount = $("#txtTaxableAmount").dxNumberBox({
            readOnly: true,
            inputAttr: {
                class: "text-right"
            },
        }).dxValidator({
            validationGroup: "MaterialTransaction",
            validationRules: []
        }).dxNumberBox("instance");

        MaterialTransactionView.variables.txtAmount = $("#txtAmount").dxNumberBox({
            readOnly: true,
            inputAttr: {
                class: "text-right"
            },
        }).dxValidator({
            validationGroup: "MaterialTransaction",
            validationRules: []
        }).dxNumberBox("instance");

        MaterialTransactionView.variables.txtRoundOff = $("#txtRoundOff").dxNumberBox({
            readOnly: true,
            inputAttr: {
                class: "text-right"
            },
        }).dxValidator({
            validationGroup: "MaterialTransaction",
            validationRules: []
        }).dxNumberBox("instance");

        MaterialTransactionView.variables.txtTotalAmount = $("#txtTotalAmount").dxNumberBox({
            readOnly: true,
            inputAttr: {
                class: "text-right"
            },
        }).dxValidator({
            validationGroup: "MaterialTransaction",
            validationRules: []
        }).dxNumberBox("instance");

        MaterialTransactionView.variables.txtTotalAmountInRs = $("#txtTotalAmountInRs").dxNumberBox({
            readOnly: true,
            inputAttr: {
                class: "text-right"
            },
        }).dxValidator({
            validationGroup: "MaterialTransaction",
            validationRules: []
        }).dxNumberBox("instance");
        /*-------End Bottom Right controls-------------------------------------*/


        /*-------Start Shippiong info controls-------------------------------------*/
        MaterialTransactionView.variables.dx_ddlcourier = $("#dx_ddlcourier").dxSelectBox({
            placeholder: "Select Courier...",
            searchEnabled: true,
        }).dxValidator({
            validationGroup: "ShipInfo",
            validationRules: [{
                type: "required",
                message: "Courier Name is required"
            }]
        }).dxSelectBox("instance");

        MaterialTransactionView.variables.dx_txtPortCode = $("#dx_txtPortCode").dxTextBox({
            placeholder: "Enter Port Code...",
        }).dxValidator({
            validationGroup: "ShipInfo",
            validationRules: [{
                type: "required",
                message: "Port Code is required"
            }]
        }).dxTextBox("instance");

        MaterialTransactionView.variables.dx_txtShipBillNo = $("#dx_txtShipBillNo").dxTextBox({
            placeholder: "Enter Shipping Bill No...",
        }).dxValidator({
            validationGroup: "ShipInfo",
            validationRules: [{
                type: "required",
                message: "Shipping Bill No is required"
            }]
        }).dxTextBox("instance");

        MaterialTransactionView.variables.dx_dtShipDate = $("#dx_dtShipDate").dxDateBox({
            type: "date",
            value: new Date(),
            showClearButton: true,
            useMaskBehavior: true,
            displayFormat: "dd MMM yyyy",
        }).dxValidator({
            validationGroup: "ShipInfo",
            validationRules: [{
                type: "required",
                message: "Shipping Date is required"
            }]
        }).dxDateBox("instance");

        MaterialTransactionView.variables.dx_Ship_btnSubmit = $("#dx_Ship_btnSubmit").dxButton({
            icon: "check",
            text: "Submit",
            type: "success",
            validationGroup: "ShipInfo",
            onClick: function (e) {
                var validation = DevExpress.validationEngine.validateGroup("ShipInfo");
                if (!validation.isValid) {
                    DevExVariables.Toaster("warning", "Please fill all required fields before submit.");
                    return;
                }

                MaterialTransactionView.btnMasterSubmit_Shipping();
            }
        }).dxButton("instance");

        MaterialTransactionView.variables.dx_Ship_btnCancel = $("#dx_Ship_btnCancel").dxButton({
            icon: "close",
            text: "Cancel",
            type: "danger",
            validationGroup: "ShipInfo",
            onClick: function (e) {
                $("#Modal_ShipInfo").modal("hide");
                //e.validationGroup.reset();
                DevExpress.validationEngine.resetGroup("ShipInfo");
                MaterialTransactionView.variables.dx_dtShipDate.option({ value: new Date() });

            }
        }).dxButton("instance");

        MaterialTransactionView.variables.dx_txtTrackingNo = $("#dx_txtTrackingNo").dxTextBox({
            placeholder: "Enter Tracking no...",
            ShowModelErrors: true,
        }).dxValidator({
            validationGroup: "ShipInfo",
            validationRules: [{
                type: "required",
                message: "Tracking no is required"
            }]
        }).dxTextBox("instance");

        MaterialTransactionView.variables.dx_txtTrackingLink = $("#dx_txtTrackingLink").dxTextBox({
            placeholder: "Enter Tracking Link...",
            ShowModelErrors: true,
        }).dxValidator({
            validationGroup: "ShipInfo",
            validationRules: [{
                type: "required",
                message: "Tracking Link is required"
            }]
        }).dxTextBox("instance");

        /*-------End Shippiong info controls-------------------------------------*/

        //----------------Start Share Model Controls------------------------------------
        MaterialTransactionView.variables.dx_txtSharetoPartyList = $("#dx_txtSharetoPartyList").dxAutocomplete({
            placeholder: "Select Party Name...",
            mode: "search",
            dataSource: new DevExpress.data.CustomStore({
                load: function (loadOptions) {
                    var deferred = $.Deferred();
                    $.ajax({
                        url: getDomain() + MaterialTransactionView.variables.BindAccListUrl + "&_search=true&searchField=ACCOUNTNAME&searchOper=cn&searchString=" + loadOptions.searchValue,
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
                    MaterialTransactionView.variables.dx_txtSharingEmailId.option({ value: data.selectedItem.emailid });
                    MaterialTransactionView.variables.dx_txtVoucherMobileNo.option({ value: data.selectedItem.mobile1 });

                }
                else {
                    MaterialTransactionView.variables.dx_txtSharingEmailId.option("value", "");
                    MaterialTransactionView.variables.dx_txtVoucherMobileNo.option("value", "");
                }
            }
        }).dxAutocomplete("instance");

        MaterialTransactionView.variables.dx_btnSubmitShare = $("#dx_btnSubmitShare").dxButton({
            stylingMode: "outlined",
            icon: "fa fa-paper-plane",
            text: "Send",
            type: "default",
            useSubmitBehavior: false,
            visible: true,
            onClick: function (e) {
                MaterialTransactionView.SharingDetails();
            }
        }).dxButton("instance");

        MaterialTransactionView.variables.dx_RadioSocial = $("#dx_RadioSocial").dxRadioGroup({
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

        MaterialTransactionView.variables.dx_txtVoucherMobileNo = $("#dx_txtVoucherMobileNo").dxTextBox({ mode: "number" }).dxTextBox("instance");

        MaterialTransactionView.variables.dx_txtShareMessage = $("#dx_txtShareMessage").dxTextArea({
            height: 90,
            value: 'Dear sir, Some Jewellery Designs are shared by Trinity Jewells with you. Kindly click on below URL to view shared Designs. {SHARE URL}',
        }).dxTextArea("instance");

        MaterialTransactionView.variables.dx_txtSharingSubject = $("#dx_txtSharingSubject").dxTextBox({
            value: "Material Details shared by TrinityJewells"
        }).dxTextBox("instance");

        MaterialTransactionView.variables.dx_txtSharingEmailId = $("#dx_txtSharingEmailId").dxTextBox({ placeholder: "Enter Email Id..." }).dxTextBox("instance");

        MaterialTransactionView.variables.dx_txtSharingEmailBody = $("#dx_txtSharingEmailBody").dxHtmlEditor({
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
            value: MaterialTransactionView.variables.content,
            onValueChanged: function (e) {
                //$(".value-content").text(e.component.option("value"));
            }
        }).dxHtmlEditor("instance");
        //----------------End Share Model Controls--------------------------------------


    },

    AddNewLineDetails: function () {
        var postfix = MaterialTransactionView.variables.RowCount;

        $("#tbl_AddItems tbody").append(
                '<tr rowno="' + postfix + '">'
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
                        + '<div id="dx_purityPer' + postfix + '" ></div>'
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
                        + '<div id="dx_switchIsExportType' + postfix + '" ></div>'
                    + '</td>'
                    + '<td>'
                        + '<div id="dx_switchIsPktId' + postfix + '" ></div>'
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
                    + '<td>'
                        + '<div id="dx_txtLess' + postfix + '" ></div>'
                    + '</td>'
                    + '<td class="text-center">'
                        + '<span class="btn btn-danger" onClick="MaterialTransactionView.RemoveDetailRow(this)"><i class="fa fa-trash-o"></i></span>'
                    + '</td>'
                + '</tr>'
            );

        /*----------------------Registration of Detail table controls---------------------*/
        MaterialTransactionView.DetailTableFormInit(postfix);
        /*----------------------Registration of Detail table controls---------------------*/

        MaterialTransactionView.variables.RowCount = postfix + 1;
    },

    DetailTableFormInit: function (postfix) {
        /*----------------------Registration of Detail table controls---------------------*/
        var tmp = [];
        tmp[postfix] = { dx_txtItemName: "", dx_ddlShape: "", dx_ddlQuality: "", dx_ddlColor: "", dx_purityPer: "", dx_txtCharni: "", dx_txtLength: "", dx_txtWidth: "", dx_switchIsExportType: "", dx_switchIsPktId: "", dx_txtPieces: "", dx_txtWeight: "", dx_txtRate: "", dx_txtAmt: "", dx_txtLess: "" };

        MaterialTransactionView.variables.DetailsControlsList = Object.assign(MaterialTransactionView.variables.DetailsControlsList, tmp);

        MaterialTransactionView.variables.DetailsControlsList[postfix].dx_txtItemName = $("#dx_txtItemName" + postfix).dxAutocomplete({
            dataSource: (MaterialTransactionView.variables.RmCodeList).filter(function (x) { return (x.rmgroup == "METAL" || x.rmgroup == "MATERIAL") }),
            placeholder: "Type RM Code...",
            valueExpr: "rmcode",
            onSelectionChanged: function (data) {
                if (data.selectedItem) {
                    if (data.selectedItem.rmgroup == "METAL") {
                        MaterialTransactionView.variables.DetailsControlsList[postfix].dx_ddlShape.option({
                            dataSource: [{ shapeid: data.selectedItem.shapeid, shape: data.selectedItem.shape || "--" }],
                            displayExpr: "shape",
                            valueExpr: "shapeid",
                            value: data.selectedItem.shapeid,
                            disabled: true,
                        });
                        MaterialTransactionView.variables.DetailsControlsList[postfix].dx_ddlQuality.option({
                            dataSource: [{ purityid: data.selectedItem.purityid, purity: data.selectedItem.purity || "--" }],
                            displayExpr: "purity",
                            valueExpr: "purityid",
                            value: data.selectedItem.purityid,
                            disabled: true,
                        });
                        MaterialTransactionView.variables.DetailsControlsList[postfix].dx_purityPer.option({ value: data.selectedItem.purityper, disabled: false });

                        MaterialTransactionView.BindRmColor(postfix);
                        MaterialTransactionView.variables.DetailsControlsList[postfix].dx_ddlColor.option({ value: data.selectedItem.colourid });

                        MaterialTransactionView.variables.DetailsControlsList[postfix].dx_txtLength.option({ value: "", disabled: true });
                        MaterialTransactionView.variables.DetailsControlsList[postfix].dx_txtWidth.option({ value: "", disabled: true });
                        MaterialTransactionView.variables.DetailsControlsList[postfix].dx_txtPieces.option({ value: "" });
                        MaterialTransactionView.variables.DetailsControlsList[postfix].dx_txtCharni.option({ value: "", disabled: true });
                    }
                    else {
                        MaterialTransactionView.BindRmShape(postfix);
                        MaterialTransactionView.variables.DetailsControlsList[postfix].dx_ddlShape.option({ value: data.selectedItem.shapeid });
                        MaterialTransactionView.BindRmPurity(postfix);
                        MaterialTransactionView.variables.DetailsControlsList[postfix].dx_ddlQuality.option({ value: data.selectedItem.purityid });
                        MaterialTransactionView.BindRmColor(postfix);
                        MaterialTransactionView.variables.DetailsControlsList[postfix].dx_ddlColor.option({ value: data.selectedItem.colourid });


                        MaterialTransactionView.variables.DetailsControlsList[postfix].dx_purityPer.option({ value: "", disabled: true });
                        MaterialTransactionView.variables.DetailsControlsList[postfix].dx_txtPieces.option({ disabled: false });
                        MaterialTransactionView.variables.DetailsControlsList[postfix].dx_txtCharni.option({ disabled: false });

                        if (MaterialTransactionView.variables.DetailsControlsList[postfix].dx_ddlShape.option().selectedItem) {
                            var ShapeName = MaterialTransactionView.variables.DetailsControlsList[postfix].dx_ddlShape.option().selectedItem.shape;
                            if (ShapeName == "RBC") {
                                MaterialTransactionView.variables.DetailsControlsList[postfix].dx_txtLength.option({ disabled: true, value: "" });
                                MaterialTransactionView.variables.DetailsControlsList[postfix].dx_txtWidth.option({ disabled: false });
                            }
                            else if (ShapeName == "PRINCESS") {
                                MaterialTransactionView.variables.DetailsControlsList[postfix].dx_txtLength.option({ disabled: false });
                                MaterialTransactionView.variables.DetailsControlsList[postfix].dx_txtWidth.option({ disabled: true });
                            }
                            else {
                                MaterialTransactionView.variables.DetailsControlsList[postfix].dx_txtLength.option({ disabled: false });
                                MaterialTransactionView.variables.DetailsControlsList[postfix].dx_txtWidth.option({ disabled: false });
                            }
                        }
                        else {
                            MaterialTransactionView.variables.DetailsControlsList[postfix].dx_txtLength.option({ disabled: false });
                            MaterialTransactionView.variables.DetailsControlsList[postfix].dx_txtWidth.option({ disabled: false });
                        }
                    }
                }
                else {
                    MaterialTransactionView.variables.DetailsControlsList[postfix].dx_txtItemName.option("value", "");
                    MaterialTransactionView.variables.DetailsControlsList[postfix].dx_ddlShape.option({
                        dataSource: new DevExpress.data.ArrayStore({ data: [] })
                    });
                    MaterialTransactionView.variables.DetailsControlsList[postfix].dx_ddlQuality.option({
                        dataSource: new DevExpress.data.ArrayStore({ data: [] })
                    });
                    MaterialTransactionView.variables.DetailsControlsList[postfix].dx_ddlColor.option({
                        dataSource: new DevExpress.data.ArrayStore({ data: [] })
                    });
                    MaterialTransactionView.variables.DetailsControlsList[postfix].dx_purityPer.option({ value: "" });

                    MaterialTransactionView.variables.DetailsControlsList[postfix].dx_txtItemName.focus();
                }
            },
            onFocusOut: function (data) {
                if (!data.component.option().selectedItem) {
                    MaterialTransactionView.variables.DetailsControlsList[postfix].dx_txtItemName.option("value", "");
                    MaterialTransactionView.variables.DetailsControlsList[postfix].dx_ddlShape.option({
                        dataSource: new DevExpress.data.ArrayStore({ data: [] })
                    });
                    MaterialTransactionView.variables.DetailsControlsList[postfix].dx_ddlQuality.option({
                        dataSource: new DevExpress.data.ArrayStore({ data: [] })
                    });
                    MaterialTransactionView.variables.DetailsControlsList[postfix].dx_ddlColor.option({
                        dataSource: new DevExpress.data.ArrayStore({ data: [] })
                    });
                    MaterialTransactionView.variables.DetailsControlsList[postfix].dx_purityPer.option({ value: "" });

                    MaterialTransactionView.variables.DetailsControlsList[postfix].dx_txtItemName.focus();
                }
            }
        }).dxValidator({
            validationGroup: "AddItems",
            validationRules: [{
                type: "required",
                message: "Rm Code is required"
            }]
        }).dxAutocomplete("instance");

        MaterialTransactionView.variables.DetailsControlsList[postfix].dx_ddlShape = $("#dx_ddlShape" + postfix).dxSelectBox({
            placeholder: "Select Shape...",
            searchEnabled: true,
            onValueChanged: function (data) {
                MaterialTransactionView.variables.DetailsControlsList[postfix].dx_txtCharni.option({ value: "" });
                if (data.component.option().selectedItem) {
                    var ShapeName = data.component.option().selectedItem.shape;
                    if (ShapeName == "RBC") {
                        MaterialTransactionView.variables.DetailsControlsList[postfix].dx_txtLength.option({ disabled: true });
                        MaterialTransactionView.variables.DetailsControlsList[postfix].dx_txtWidth.option({ disabled: false });
                    }
                        //else if (ShapeName == "PRINCESS") {
                        //    MaterialTransactionView.variables.DetailsControlsList[postfix].dx_txtLength.option({ disabled: false });
                        //    MaterialTransactionView.variables.DetailsControlsList[postfix].dx_txtWidth.option({ disabled: true });
                        //}
                    else {
                        MaterialTransactionView.variables.DetailsControlsList[postfix].dx_txtLength.option({ disabled: false });
                        MaterialTransactionView.variables.DetailsControlsList[postfix].dx_txtWidth.option({ disabled: false });
                    }
                }

            },
            onFocusOut: function (data) {
                if (!data.component.option().selectedItem) {
                    MaterialTransactionView.variables.DetailsControlsList[postfix].dx_ddlShape.focus();
                }
                else {
                    MaterialTransactionView.CalcTotalWgts();
                }
            }
        }).dxValidator({
            validationGroup: "AddItems",
            validationRules: [{
                type: "required",
                message: "Shape is required"
            }]
        }).dxSelectBox("instance");

        MaterialTransactionView.variables.DetailsControlsList[postfix].dx_ddlQuality = $("#dx_ddlQuality" + postfix).dxSelectBox({
            placeholder: "Select Quality...",
            searchEnabled: true,
            onFocusOut: function (data) {
                if (!data.component.option().selectedItem) {
                    MaterialTransactionView.variables.DetailsControlsList[postfix].dx_ddlQuality.focus();
                }
                else {
                    MaterialTransactionView.CalcTotalWgts();
                }
            }
        }).dxValidator({
            validationGroup: "AddItems",
            validationRules: [{
                type: "required",
                message: "Quality is required"
            }]
        }).dxSelectBox("instance");

        MaterialTransactionView.variables.DetailsControlsList[postfix].dx_ddlColor = $("#dx_ddlColor" + postfix).dxSelectBox({
            placeholder: "Select Color...",
            searchEnabled: true,
            onFocusOut: function (data) {
                if (!data.component.option().selectedItem) {
                    MaterialTransactionView.variables.DetailsControlsList[postfix].dx_ddlColor.focus();
                }
                else {
                    MaterialTransactionView.CalcTotalWgts();
                }
            }
        }).dxValidator({
            validationGroup: "AddItems",
            validationRules: [{
                type: "required",
                message: "Color is required"
            }]
        }).dxSelectBox("instance");

        MaterialTransactionView.variables.DetailsControlsList[postfix].dx_purityPer = $("#dx_purityPer" + postfix).dxNumberBox({
            placeholder: "Purity Percentage...",
        }).dxValidator({
            validationGroup: "AddItems",
            validationRules: []
        }).dxNumberBox("instance");

        MaterialTransactionView.variables.DetailsControlsList[postfix].dx_txtCharni = $("#dx_txtCharni" + postfix).dxAutocomplete({
            dataSource: new DevExpress.data.CustomStore({
                load: function (loadOptions) {
                    var deferred = $.Deferred();

                    if (MaterialTransactionView.variables.DetailsControlsList[postfix].dx_ddlShape.option().selectedItem) {
                        var myfilter = { rules: [] };
                        myfilter.rules.push({ field: "RMSHAPEID", op: "eq", data: MaterialTransactionView.variables.DetailsControlsList[postfix].dx_ddlShape.option().selectedItem.shapeid });
                        myfilter.rules.push({ field: "SEARCH", op: "eq", data: loadOptions.searchValue });
                        myfilter.rules.push({ field: "TYPE", op: "eq", data: "Charni" });

                        if (MaterialTransactionView.variables.DetailsControlsList[postfix].dx_txtLength.option().value && MaterialTransactionView.variables.DetailsControlsList[postfix].dx_ddlShape.option().text != "RBC")
                            myfilter.rules.push({ field: "LENGTH", op: "eq", data: MaterialTransactionView.variables.DetailsControlsList[postfix].dx_txtLength.option().value });
                        if (MaterialTransactionView.variables.DetailsControlsList[postfix].dx_txtWidth.option().value)
                            myfilter.rules.push({ field: "WIDTH", op: "eq", data: MaterialTransactionView.variables.DetailsControlsList[postfix].dx_txtWidth.option().value });

                        var result;
                        $.ajax({
                            url: getDomain() + MaterialTransactionView.variables.BindStaticDataUrl + "&myfilters=" + JSON.stringify(myfilter),
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
                    var pcs = MaterialTransactionView.variables.DetailsControlsList[postfix].dx_txtPieces.option().value || 1;
                    //var ShapeName = MaterialTransactionView.variables.DetailsControlsList[postfix].dx_ddlShape.option().text;

                    MaterialTransactionView.variables.DetailsControlsList[postfix].dx_txtWeight.option({ value: parseFloat(data.selectedItem.weight * pcs).toFixed(3) });

                    //if (!MaterialTransactionView.variables.DetailsControlsList[postfix].dx_txtLength.option().value && ShapeName != "RBC")
                    if (data.selectedItem.lenght)
                        MaterialTransactionView.variables.DetailsControlsList[postfix].dx_txtLength.option({ value: data.selectedItem.lenght });

                    //if (!MaterialTransactionView.variables.DetailsControlsList[postfix].dx_txtWidth.option().value)
                    if (data.selectedItem.width)
                        MaterialTransactionView.variables.DetailsControlsList[postfix].dx_txtWidth.option({ value: data.selectedItem.width });
                }
            },
            onFocusOut: function (data) {
                if (!data.component.option().selectedItem) {
                    MaterialTransactionView.variables.DetailsControlsList[postfix].dx_txtCharni.option("value", "");
                }
            }
        }).dxValidator({
            validationGroup: "AddItems",
            validationRules: [{
                type: "required",
                message: "Charni is required",
            }]
        }).dxAutocomplete("instance");

        MaterialTransactionView.variables.DetailsControlsList[postfix].dx_txtLength = $("#dx_txtLength" + postfix).dxNumberBox({
            onKeyDown: function (e) {
                if (e.event.key == "-" || e.event.key == "+") {
                    e.event.preventDefault();
                }
            },
            onFocusOut: function (data) {
                var ShapeName = MaterialTransactionView.variables.DetailsControlsList[postfix].dx_ddlShape.option().text;
                if (ShapeName == "PRINCESS" && data.component.option().value) {
                    MaterialTransactionView.variables.DetailsControlsList[postfix].dx_txtWidth.option({ value: data.component.option().value });
                }
                if (data.component.option().value)
                    MaterialTransactionView.GetCharniAutoSelected(postfix);
            },
        }).dxValidator({
            validationGroup: "AddItems",
            validationRules: [{
                type: "required",
                message: "Length is required"
            }]
        }).dxNumberBox("instance");

        MaterialTransactionView.variables.DetailsControlsList[postfix].dx_txtWidth = $("#dx_txtWidth" + postfix).dxNumberBox({
            onKeyDown: function (e) {
                if (e.event.key == "-" || e.event.key == "+") {
                    e.event.preventDefault();
                }
            },
            onFocusOut: function (data) {
                var ShapeName = MaterialTransactionView.variables.DetailsControlsList[postfix].dx_ddlShape.option().text;
                if (ShapeName == "RBC") {
                    MaterialTransactionView.variables.DetailsControlsList[postfix].dx_txtLength.option({ value: data.component.option().value });
                }
                if (data.component.option().value)
                    MaterialTransactionView.GetCharniAutoSelected(postfix);
            },
        }).dxValidator({
            validationGroup: "AddItems",
            validationRules: [{
                type: "required",
                message: "Width is required"
            }]
        }).dxNumberBox("instance");

        MaterialTransactionView.variables.DetailsControlsList[postfix].dx_switchIsExportType = $("#dx_switchIsExportType" + postfix).dxSwitch({
            value: false,
            switchedOnText: "Yes",
            switchedOffText: "No"
        }).dxValidator({
            validationGroup: "AddItems",
            validationRules: []
        }).dxSwitch("instance");

        MaterialTransactionView.variables.DetailsControlsList[postfix].dx_switchIsPktId = $("#dx_switchIsPktId" + postfix).dxSwitch({
            value: false,
            switchedOnText: "Yes",
            switchedOffText: "No"
        }).dxValidator({
            validationGroup: "AddItems",
            validationRules: []
        }).dxSwitch("instance");

        MaterialTransactionView.variables.DetailsControlsList[postfix].dx_txtPieces = $("#dx_txtPieces" + postfix).dxNumberBox({
            min: 1,
            value: 1,
            onFocusOut: function (data) {
                if (MaterialTransactionView.variables.DetailsControlsList[postfix].dx_txtCharni.option().selectedItem
                        && MaterialTransactionView.variables.DetailsControlsList[postfix].dx_txtItemName.option().selectedItem.rmgroup == "MATERIAL") {
                    var wgt = MaterialTransactionView.variables.DetailsControlsList[postfix].dx_txtCharni.option().selectedItem.weight || 0;
                    MaterialTransactionView.variables.DetailsControlsList[postfix].dx_txtWeight.option({ value: parseFloat(wgt * (MaterialTransactionView.variables.DetailsControlsList[postfix].dx_txtPieces.option().value || 1)).toFixed(3) });
                }
                MaterialTransactionView.CalcTotalWgts();
            },
            onKeyDown: function (e) {
                if (e.event.key == "-" || e.event.key == "." || e.event.key == "+") {
                    e.event.preventDefault();
                }
            },
        }).dxValidator({
            validationGroup: "AddItems",
            validationRules: [{
                type: "required",
                message: "Pcs is required"
            }]
        }).dxNumberBox("instance");

        MaterialTransactionView.variables.DetailsControlsList[postfix].dx_txtWeight = $("#dx_txtWeight" + postfix).dxNumberBox({
            onFocusOut: function (data) {
                MaterialTransactionView.CalcTotalWgts();
            },
            onKeyDown: function (e) {
                if (e.event.key == "-" || e.event.key == "+") {
                    e.event.preventDefault();
                }
            }
        }).dxValidator({
            validationGroup: "AddItems",
            validationRules: [{
                type: "required",
                message: "Weight is required"
            }]
        }).dxNumberBox("instance");

        MaterialTransactionView.variables.DetailsControlsList[postfix].dx_txtRate = $("#dx_txtRate" + postfix).dxNumberBox({
            onFocusOut: function (data) {
                var val = MaterialTransactionView.variables.DetailsControlsList[postfix].dx_txtWeight.option().value * MaterialTransactionView.variables.DetailsControlsList[postfix].dx_txtRate.option().value;
                MaterialTransactionView.variables.DetailsControlsList[postfix].dx_txtAmt.option({ value: val.toFixed(2) });
            },
            onKeyDown: function (e) {
                if (e.event.key == "-" || e.event.key == "+") {
                    e.event.preventDefault();
                }
            }
        }).dxValidator({
            validationGroup: "AddItems",
            validationRules: [{
                type: "required",
                message: "Rate is required"
            }]
        }).dxNumberBox("instance");

        MaterialTransactionView.variables.DetailsControlsList[postfix].dx_txtAmt = $("#dx_txtAmt" + postfix).dxNumberBox({
            readOnly: true
        }).dxValidator({
            validationGroup: "AddItems",
            validationRules: [{
                type: "required",
                message: "Amount is required"
            }]
        }).dxNumberBox("instance");

        MaterialTransactionView.variables.DetailsControlsList[postfix].dx_txtLess = $("#dx_txtLess" + postfix).dxNumberBox({
            min: 0,
            onKeyDown: function (e) {
                if (((e.event.key == "Tab" || e.event.key == "Enter") && e.event.shiftKey == false) && e.element.closest("tr").is(":last-child"))
                    MaterialTransactionView.AddNewLineDetails();
            }
        }).dxValidator({
            validationGroup: "AddItems",
            validationRules: []
        }).dxNumberBox("instance");
        /*----------------------Registration of Detail table controls---------------------*/
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

        $("#tbl_AddItems tbody tr").each(function (key, obj) {
            index = $(obj).attr("rowno");
            if (MaterialTransactionView.variables.DetailsControlsList[index].dx_txtItemName.option().selectedItem) {
                RmCate = MaterialTransactionView.variables.DetailsControlsList[index].dx_txtItemName.option().selectedItem.rmcate;

                if (RmCate == "GEMS") {
                    TotalDiaPcs += +MaterialTransactionView.variables.DetailsControlsList[index].dx_txtPieces.option().value;
                    TotalDiaCts += +MaterialTransactionView.variables.DetailsControlsList[index].dx_txtWeight.option().value;
                }

                if (RmCate == "METAL") {
                    touch = +MaterialTransactionView.variables.DetailsControlsList[index].dx_purityPer.option().value;
                    TotalNetWgt += +MaterialTransactionView.variables.DetailsControlsList[index].dx_txtWeight.option().value;
                    TotalFineWgt += (+MaterialTransactionView.variables.DetailsControlsList[index].dx_txtWeight.option().value * touch / 100);
                }
            }
        });

        TotalGrossWgt = TotalNetWgt + (TotalDiaCts * 0.2);

        MaterialTransactionView.variables.dx_txtDiaPcs.option("value", TotalDiaPcs);
        MaterialTransactionView.variables.dx_txtDiaCrt.option("value", parseFloat(TotalDiaCts).toFixed(3));
        MaterialTransactionView.variables.dx_txtNetWgt.option("value", parseFloat(TotalNetWgt).toFixed(3));
        MaterialTransactionView.variables.dx_txtGrossWgt.option("value", parseFloat(TotalGrossWgt).toFixed(3));
        MaterialTransactionView.variables.dx_txtFineWgt.option("value", parseFloat(TotalFineWgt).toFixed(3));
    },

    RemoveDetailRow: function (obj) {
        $(obj).closest("tr").remove();
        delete MaterialTransactionView.variables.DetailsControlsList[$(obj).closest("tr").attr("rowno")];

        MaterialTransactionView.CalcTotalWgts();
    },

    BindSubBookList: function () {
        var myfilter = { rules: [] };
        myfilter.rules.push({ field: "TYPE", op: "eq", data: "AccSubBook" });
        myfilter.rules.push({ field: "SUBBOOKTYPE", op: "eq", data: "MATERIAL" });
        myfilter.rules.push({ field: "ONLYALLOWED", op: "eq", data: true });
        $.ajax({
            url: getDomain() + MaterialTransactionView.variables.BindStaticDataUrl + "&myfilters=" + JSON.stringify(myfilter),
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

                        MaterialTransactionView.variables.dx_ddlSubBookMaster.option({
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

    BindLockerList: function () {
        var myfilter = { rules: [] };
        myfilter.rules.push({ field: "ONLYALLOWED", op: "eq", data: true });

        $.ajax({
            url: getDomain() + MaterialTransactionView.variables.BindLockerList + "&IsRecordAll=true&myfilters=" + JSON.stringify(myfilter),
            async: true,
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

                        MaterialTransactionView.variables.dx_ddllocker.option({
                            dataSource: new DevExpress.data.ArrayStore({
                                data: List,
                                key: "lockermasterid"
                            }),
                            displayExpr: "lockername",
                            valueExpr: "lockermasterid"
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

    BindTaxProfile: function () {
        var myfilter = { rules: [] };
        myfilter.rules.push({ field: "ISACTIVE", op: "eq", data: true });

        $.ajax({
            url: getDomain() + MaterialTransactionView.variables.BindTaxProfile + "&IsRecordAll=true&myfilters=" + JSON.stringify(myfilter),
            async: true,
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

                        MaterialTransactionView.variables.dx_TaxProfile.option({
                            dataSource: new DevExpress.data.ArrayStore({
                                data: List,
                                key: "taxprofileid"
                            }),
                            displayExpr: "taxprofilename",
                            valueExpr: "taxprofileid",
                            value: List.filter(function (x) { return x.isdefault == 1 })
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

    BindCurrencyList: function () {
        $.ajax({
            url: getDomain() + MaterialTransactionView.variables.BindCurrencyList,
            async: true,
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

                        MaterialTransactionView.variables.dx_ddlCurrencyName.option({
                            dataSource: new DevExpress.data.ArrayStore({
                                data: List,
                                key: "currencyid"
                            }),
                            displayExpr: "currencycode",
                            valueExpr: "currencyid"
                        });

                        MaterialTransactionView.variables.dx_ddlCurrency.option({
                            dataSource: new DevExpress.data.ArrayStore({
                                data: List,
                                key: "currencyid"
                            }),
                            displayExpr: "currencycode",
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

    GetUserName: function () {
        var myfilter = { rules: [] };
        myfilter.rules.push({ field: "ISACTIVE", op: "eq", data: true });
        myfilter.rules.push({ field: "SUBHEAD", op: "eq", data: "Employees" });

        $.ajax({
            url: getDomain() + MaterialTransactionView.variables.BindAccListUrl + "&myfilters=" + JSON.stringify(myfilter),
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

                        MaterialTransactionView.variables.dx_ddlOrderby.option({
                            dataSource: new DevExpress.data.ArrayStore({
                                data: List,
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

    BindAddressDetails: function (AccId) {
        var myfilter = { rules: [] };
        myfilter.rules.push({ field: "ACCID", op: "eq", data: AccId });

        $.ajax({
            url: getDomain() + MaterialTransactionView.variables.BindPartyAddress + "&IsRecordAll=true&myfilters=" + JSON.stringify(myfilter),
            async: true,
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

                        MaterialTransactionView.variables.dx_ddlBillingAddress.option({
                            dataSource: new DevExpress.data.ArrayStore({
                                data: List,
                                key: "accountmaster_shipinginfoid"
                            }),
                            displayExpr: "shipaddress",
                            valueExpr: "accountmaster_shipinginfoid"
                        });
                        MaterialTransactionView.variables.dx_ddlShippingAddress.option({
                            dataSource: new DevExpress.data.ArrayStore({
                                data: List,
                                key: "accountmaster_shipinginfoid"
                            }),
                            displayExpr: "shipaddress",
                            valueExpr: "accountmaster_shipinginfoid"
                        });
                    }
                    else {
                        MaterialTransactionView.variables.dx_ddlBillingAddress.option({
                            dataSource: new DevExpress.data.ArrayStore({
                                data: [],
                                key: "accountmaster_shipinginfoid"
                            }),
                            displayExpr: "shipaddress",
                            valueExpr: "accountmaster_shipinginfoid"
                        });
                        MaterialTransactionView.variables.dx_ddlShippingAddress.option({
                            dataSource: new DevExpress.data.ArrayStore({
                                data: [],
                                key: "accountmaster_shipinginfoid"
                            }),
                            displayExpr: "shipaddress",
                            valueExpr: "accountmaster_shipinginfoid"
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
            url: getDomain() + MaterialTransactionView.variables.BindStaticDataUrl + "&myfilters=" + JSON.stringify(myfilter),
            async: true,
            cache: false,
            type: 'POST',
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    var JsonObject = xml2json.parser(data);
                    if (JsonObject.serviceresponse.detailslist) {
                        MaterialTransactionView.variables.dx_ddlSubHead.option({
                            dataSource: new DevExpress.data.ArrayStore({
                                data: JsonObject.serviceresponse.detailslist.details,
                                key: "subheadid"
                            }),
                            displayExpr: "subhead",
                            valueExpr: "subheadid",
                        });
                    }
                    else {
                        MaterialTransactionView.variables.dx_ddlSubHead.option({
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
                        MaterialTransactionView.variables.dx_ddlCountry.option({
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
                        MaterialTransactionView.variables.dx_ddlState.option({
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
                        MaterialTransactionView.variables.dx_ddlCity.option({
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

    btnMasterSubmit_Party: function () {
        MaterialTransactionView.variables.dx_Party_btnSubmit.option({ disabled: true });

        var data = {
            "ACCOUNTNAME": MaterialTransactionView.variables.dx_txtAcc_Name.option().value,
            "SUBHEADID": MaterialTransactionView.variables.dx_ddlSubHead.option().value,
            "HEADID": MaterialTransactionView.variables.dx_txtHeadName.option().selectedItem.headid,
            "CURRENCYID": MaterialTransactionView.variables.dx_ddlCurrency.option().value,
            "CITYID": MaterialTransactionView.variables.dx_ddlCity.option().value,
            "STATEID": MaterialTransactionView.variables.dx_ddlState.option().value,
            "COUNTRYID": MaterialTransactionView.variables.dx_ddlCountry.option().value,
            "MOBILE1": MaterialTransactionView.variables.dx_txtMobileNo.option().value,
            "TYPE": "AccountInfo",
            "oper": 'Add',
        }

        MaterialTransactionView.savedata_Party(data);
    },

    savedata_Party: function (data) {
        $.ajax({
            url: getDomain() + MaterialTransactionView.variables.PerformMasterOperationUrl_Party,
            data: data,
            async: true,
            cache: false,
            type: 'POST',
            beforeSend: function () {
                dx_LoaderTrinity.show();
            },
            complete: function () {
                dx_LoaderTrinity.hide();
                MaterialTransactionView.variables.dx_Party_btnSubmit.option({ disabled: false });
            },
            success: MaterialTransactionView.btnMasterSubmitOnSuccess_Party,
            error: OnError,
        });
    },

    btnMasterSubmitOnSuccess_Party: function (data) {
        if ($(data).find('RESPONSECODE').text() == "0") {
            DevExVariables.Toaster("success", 'Record is Added successfully.');
            $("#Modal_PartyMaster").modal("hide");
            DevExpress.validationEngine.resetGroup("PartyMaster");

            MaterialTransactionView.variables.dx_txtPartyName.option({
                items: [{ accid: $(data).find('ACCOUNTID').text(), accountname: $(data).find('ACCOUNTNAME').text() }],
                selectedItem: { accid: $(data).find('ACCOUNTID').text(), accountname: $(data).find('ACCOUNTNAME').text() },
                value: $(data).find('ACCOUNTNAME').text()
            });
            MaterialTransactionView.variables.dx_txtPartyCode.option({ value: $(data).find('ACCOUNTCODE').text() });
            MaterialTransactionView.variables.PartyList_accid = $(data).find('ACCOUNTID').text()
            MaterialTransactionView.variables.dx_txtPartyName.option({ value: $(data).find('ACCOUNTNAME').text() });

        }
        else {
            DevExVariables.InvalidResponseCode(data);
        }
    },

    GetRmCodeList: function () {
        var myfilter = { rules: [] };
        myfilter.rules.push({ field: "TYPE", op: "eq", data: "RmCode" });
        myfilter.rules.push({ field: "USESALEPUR", op: "eq", data: true });
        $.ajax({
            url: getDomain() + MaterialTransactionView.variables.BindStaticDataUrl + "&myfilters=" + JSON.stringify(myfilter),
            async: true,
            cache: false,
            type: 'POST',
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    var JsonObject = xml2json.parser(data);
                    if (JsonObject.serviceresponse.detailslist) {
                        if (JsonObject.serviceresponse.detailslist.details.length) {
                            MaterialTransactionView.variables.RmCodeList = JsonObject.serviceresponse.detailslist.details;
                        }
                        else {
                            MaterialTransactionView.variables.RmCodeList.push(JsonObject.serviceresponse.detailslist.details);
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

    GetRmShapeList: function () {
        var myfilter = { rules: [] };
        myfilter.rules.push({ field: "TYPE", op: "eq", data: "shape" });
        $.ajax({
            url: getDomain() + MaterialTransactionView.variables.BindStaticDataUrl + "&myfilters=" + JSON.stringify(myfilter),
            async: true,
            cache: false,
            type: 'POST',
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    var JsonObject = xml2json.parser(data);
                    if (JsonObject.serviceresponse.detailslist) {
                        if (JsonObject.serviceresponse.detailslist.details.length) {
                            MaterialTransactionView.variables.RmShapeList = JsonObject.serviceresponse.detailslist.details;
                        }
                        else {
                            MaterialTransactionView.variables.RmShapeList.push(JsonObject.serviceresponse.detailslist.details);
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
        //myfilter.rules.push({ field: "ISUSEINJEWELLERY", op: "eq", data: true });
        $.ajax({
            url: getDomain() + MaterialTransactionView.variables.BindStaticDataUrl + "&myfilters=" + JSON.stringify(myfilter),
            async: true,
            cache: false,
            type: 'POST',
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    var JsonObject = xml2json.parser(data);
                    if (JsonObject.serviceresponse.detailslist) {
                        if (JsonObject.serviceresponse.detailslist.details.length) {
                            MaterialTransactionView.variables.RmPurityList = JsonObject.serviceresponse.detailslist.details;
                        }
                        else {
                            MaterialTransactionView.variables.RmPurityList.push(JsonObject.serviceresponse.detailslist.details);
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
        //myfilter.rules.push({ field: "ISUSEINJEWELLERY", op: "eq", data: true });
        $.ajax({
            url: getDomain() + MaterialTransactionView.variables.BindStaticDataUrl + "&myfilters=" + JSON.stringify(myfilter),
            async: true,
            cache: false,
            type: 'POST',
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    var JsonObject = xml2json.parser(data);
                    if (JsonObject.serviceresponse.detailslist) {
                        if (JsonObject.serviceresponse.detailslist.details.length) {
                            MaterialTransactionView.variables.RmColorList = JsonObject.serviceresponse.detailslist.details;
                        }
                        else {
                            MaterialTransactionView.variables.RmColorList.push(JsonObject.serviceresponse.detailslist.details);
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

    BindRmColor: function (postfix) {
        var List = MaterialTransactionView.variables.RmColorList.filter(function (x) {
            return x.rmcateid == MaterialTransactionView.variables.DetailsControlsList[postfix].dx_txtItemName.option().selectedItem.rmcateid
                && x.rmsubcateid == MaterialTransactionView.variables.DetailsControlsList[postfix].dx_txtItemName.option().selectedItem.rmsubcateid;
        });
        MaterialTransactionView.variables.DetailsControlsList[postfix].dx_ddlColor.option({
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
        var List = MaterialTransactionView.variables.RmShapeList.filter(function (x) {
            return x.rmcateid == MaterialTransactionView.variables.DetailsControlsList[postfix].dx_txtItemName.option().selectedItem.rmcateid;
            //&& x.rmsubcateid == MaterialTransactionView.variables.DetailsControlsList[postfix].dx_txtItemName.option().selectedItem.rmsubcateid;
        });
        MaterialTransactionView.variables.DetailsControlsList[postfix].dx_ddlShape.option({
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
        var List = MaterialTransactionView.variables.RmPurityList.filter(function (x) {
            return x.rmcateid == MaterialTransactionView.variables.DetailsControlsList[postfix].dx_txtItemName.option().selectedItem.rmcateid
                && x.rmsubcateid == MaterialTransactionView.variables.DetailsControlsList[postfix].dx_txtItemName.option().selectedItem.rmsubcateid;
        });
        MaterialTransactionView.variables.DetailsControlsList[postfix].dx_ddlQuality.option({
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
        if (MaterialTransactionView.variables.DetailsControlsList[postfix].dx_ddlShape.option().selectedItem) {
            var myfilter = { rules: [] };
            myfilter.rules.push({ field: "RMSHAPEID", op: "eq", data: MaterialTransactionView.variables.DetailsControlsList[postfix].dx_ddlShape.option().selectedItem.shapeid });
            myfilter.rules.push({ field: "TYPE", op: "eq", data: "Charni" });

            if (MaterialTransactionView.variables.DetailsControlsList[postfix].dx_txtLength.option().value && MaterialTransactionView.variables.DetailsControlsList[postfix].dx_ddlShape.option().text != "RBC")
                myfilter.rules.push({ field: "LENGTH", op: "eq", data: MaterialTransactionView.variables.DetailsControlsList[postfix].dx_txtLength.option().value });
            if (MaterialTransactionView.variables.DetailsControlsList[postfix].dx_txtWidth.option().value)
                myfilter.rules.push({ field: "WIDTH", op: "eq", data: MaterialTransactionView.variables.DetailsControlsList[postfix].dx_txtWidth.option().value });

            $.ajax({
                url: getDomain() + MaterialTransactionView.variables.BindStaticDataUrl + "&myfilters=" + JSON.stringify(myfilter),
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

                            MaterialTransactionView.variables.DetailsControlsList[postfix].dx_txtCharni.option({
                                items: list,
                                selectedItem: list[0],
                                value: list[0].charni
                            });
                        }
                        else {
                            MaterialTransactionView.variables.DetailsControlsList[postfix].dx_txtCharni.option({
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

    clearControlsForAddItems: function () {
        $("#tbl_AddItems tbody").html("");
        MaterialTransactionView.variables.RowCount = 1;
        MaterialTransactionView.variables.DetailsControlsList = [];
        MaterialTransactionView.variables.OI_ID = "";
    },

    clearControls: function () {
        DevExpress.validationEngine.resetGroup("MaterialTransaction");

        MaterialTransactionView.variables.Masterid = '',
        MaterialTransactionView.variables.Oper = 'Add';
        MaterialTransactionView.variables.PartyList_accid = '';

        $(".divTax").remove();

        MaterialTransactionView.variables.dx_txtVoucherDate.option({ value: new Date() });
        MaterialTransactionView.variables.dx_txtDueDays.option({ value: 0 });
        MaterialTransactionView.variables.dx_ddlOrderby.option({ value: Number(getUserId()) });
        MaterialTransactionView.variables.dx_btnSubmit.option({ disabled: false });
        MaterialTransactionView.variables.dx_ddlOrderby.option({ disabled: false });
        MaterialTransactionView.variables.dx_txtVoucherNo.option({ disabled: false });
        MaterialTransactionView.variables.dx_ddlSubBookMaster.option({ disabled: false });
        MaterialTransactionView.variables.dx_ddlVoucherType.option({ value: MaterialTransactionView.variables.VoucherTypeList[1] });
        MaterialTransactionView.variables.dx_txtVoucherReturn.option({ disabled: false });
        MaterialTransactionView.variables.dx_ddlBillingAddress.option({ disabled: false });
        MaterialTransactionView.variables.dx_ddlShippingAddress.option({ disabled: false });
        MaterialTransactionView.variables.dx_btnSubmit.option({ visible: true });
        MaterialTransactionView.variables.dx_btnAddDetailItem.option({ visible: true });
        MaterialTransactionView.variables.dx_btnRemoveItem.option({ visible: true });


        $("#frm_MaterialTransaction").hide();
        $("#pnlView").show();
        MaterialTransactionView.variables.dx_dataGridItems.refresh();
        MaterialTransactionView.variables.dx_dataGrid.refresh();
        $("#AttachmentsList").hide();
        $("#tbody_AttachmentsList").html("");

    },

    RemoveItemFromList: function () {
        var SelectedItemList = [];
        SelectedItemList = MaterialTransactionView.variables.dx_dataGridItems.option().selectedRowKeys;

        if (SelectedItemList.length == 0) {
            DevExVariables.Toaster("warning", "Please select atleast one item to remove.");
            return;
        }

        if (MaterialTransactionView.variables.Masterid > 0) {
            MaterialTransactionView.variables.Oper = 'Edit';
        }
        else {
            MaterialTransactionView.variables.Oper = 'Add';
        }

        var data = {
            "SBOOKID": MaterialTransactionView.variables.dx_ddlSubBookMaster.option().value,
            "VOUCHERDATE": MaterialTransactionView.variables.dx_txtVoucherDate.option().text,
            //"LOCKERID": MaterialTransactionView.variables.dx_ddllocker.option().value,
            "VOUCHERTYPE": MaterialTransactionView.variables.dx_ddlVoucherType.option().value,
            "ACCID": MaterialTransactionView.variables.dx_txtPartyName.option().selectedItem.accid,
            "PARTYBILLNO": MaterialTransactionView.variables.dx_txtPartyBillNo.option().value,
            "SALESMANID": MaterialTransactionView.variables.dx_ddlOrderby.option().value,
            "DUEDAY": MaterialTransactionView.variables.dx_txtDueDays.option().value,
            "TAXPROFILEID": MaterialTransactionView.variables.dx_TaxProfile.option().value,
            "CURRENCYID": MaterialTransactionView.variables.dx_ddlCurrencyName.option().value,
            "EXCHANGERATE": MaterialTransactionView.variables.dx_txtExchangeRate.option().value,
            //"BILLINGADDRESSID": MaterialTransactionView.variables.dx_ddlBillingAddress.option().value,
            //"BILLADDR_NAME": MaterialTransactionView.variables.dx_ddlBillingAddress.option().selectedItem.shipname,
            //"BILLADDR_MOBNO": MaterialTransactionView.variables.dx_ddlBillingAddress.option().selectedItem.shipmobileno,
            //"BILLADDR_COUNTRY": MaterialTransactionView.variables.dx_ddlBillingAddress.option().selectedItem.shipcountry,
            //"BILLADDR_STATE": MaterialTransactionView.variables.dx_ddlBillingAddress.option().selectedItem.shipstate,
            //"BILLADDR_CITY": MaterialTransactionView.variables.dx_ddlBillingAddress.option().selectedItem.shipcity,
            //"BILLADDR_PINCODE": MaterialTransactionView.variables.dx_ddlBillingAddress.option().selectedItem.shipzipecode,
            //"BILLADDR_ADDRESS": MaterialTransactionView.variables.dx_ddlBillingAddress.option().selectedItem.shipaddress,
            //"BILLADDR_TYPE": MaterialTransactionView.variables.dx_ddlBillingAddress.option().selectedItem.address_type_id,
            //"BILLADDR_GSTNO": MaterialTransactionView.variables.dx_ddlBillingAddress.option().selectedItem.gstno,
            //"BILLADDR_PANNO": MaterialTransactionView.variables.dx_ddlBillingAddress.option().selectedItem.panno,
            //"SHIPPINGADDRESSID": MaterialTransactionView.variables.dx_ddlShippingAddress.option().value,
            //"SHIPADDR_NAME": MaterialTransactionView.variables.dx_ddlShippingAddress.option().selectedItem.shipname,
            //"SHIPADDR_MOBNO": MaterialTransactionView.variables.dx_ddlShippingAddress.option().selectedItem.shipmobileno,
            //"SHIPADDR_COUNTRY": MaterialTransactionView.variables.dx_ddlShippingAddress.option().selectedItem.shipcountry,
            //"SHIPADDR_STATE": MaterialTransactionView.variables.dx_ddlShippingAddress.option().selectedItem.shipstate,
            //"SHIPADDR_CITY": MaterialTransactionView.variables.dx_ddlShippingAddress.option().selectedItem.shipcity,
            //"SHIPADDR_PINCODE": MaterialTransactionView.variables.dx_ddlShippingAddress.option().selectedItem.shipzipecode,
            //"SHIPADDR_ADDRESS": MaterialTransactionView.variables.dx_ddlShippingAddress.option().selectedItem.shipaddress,
            //"SHIPADDR_TYPE": MaterialTransactionView.variables.dx_ddlShippingAddress.option().selectedItem.address_type_id,
            //"SHIPADDR_GSTNO": MaterialTransactionView.variables.dx_ddlShippingAddress.option().selectedItem.gstno,
            //"SHIPADDR_PANNO": MaterialTransactionView.variables.dx_ddlShippingAddress.option().selectedItem.panno,
            "ROUNDOFF": MaterialTransactionView.variables.txtRoundOff.option().value || 0,
            "ROUNDOFFTYPE": $("[name='rd_RoundOff']:checked").val(),
            "FREIGHTCHARGES": MaterialTransactionView.variables.txtFreightCharges.option().value || 0,
            "REMARKS": MaterialTransactionView.variables.dx_txtRemarks.option().value,
            //"BROKERID": MaterialTransactionView.variables.dx_ddlBroker.option().value,
            "BROKERAGE": MaterialTransactionView.variables.dx_txtBrokerage.option().value || 0,
            //"COURIERID": MaterialTransactionView.variables.dx_ddlcourier.option().value,
            "VIRTUALFILENAME": $("#lnkCADFilePreview").attr("href"),
            "ACTUALFILENAME": $("#lnkCADFilePreview").html(),
            "ISFINALSUBMIT": 0,
            "SELECTEDITEMS": SelectedItemList.toString(),
            "MT_ID": MaterialTransactionView.variables.Masterid,
            "oper": MaterialTransactionView.variables.Oper,
            "OPER_TYPE": "Item_Remove"
        }

        if (MaterialTransactionView.variables.dx_ddllocker.option().value)
            data.LOCKERID = MaterialTransactionView.variables.dx_ddllocker.option().value;

        if (MaterialTransactionView.variables.dx_ddlBillingAddress.option().value) {
            data.BILLINGADDRESSID = MaterialTransactionView.variables.dx_ddlBillingAddress.option().value;
        }

        if (MaterialTransactionView.variables.dx_ddlShippingAddress.option().value) {
            data.SHIPPINGADDRESSID = MaterialTransactionView.variables.dx_ddlShippingAddress.option().value;
        }

        if (MaterialTransactionView.variables.dx_ddlBroker.option().value)
            data.BROKERID = MaterialTransactionView.variables.dx_ddlBroker.option().value;

        //if (MaterialTransactionView.variables.dx_ddlcourier.option().value)
        //    data.COURIERID = MaterialTransactionView.variables.dx_ddlcourier.option().value;

        $.ajax({
            url: getDomain() + MaterialTransactionView.variables.PerformMasterOperationUrl,
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
                    MaterialTransactionView.variables.dx_popupItemRemove.hide();
                    MaterialTransactionView.variables.dx_dataGridItems.clearSelection();
                    MaterialTransactionView.variables.dx_dataGridItems.refresh();
                }
                else {
                    DevExVariables.InvalidResponseCode(data);
                }
            },
            error: OnError,
        });
    },

    calcRoundOff: function () {
        var Amt = MaterialTransactionView.variables.txtAmount.option().value;
        var FinalAmt = 0, RoundOff = 0, ExRate = 1;;
        if ($("[name='rd_RoundOff']:checked").val() == "Add") {
            FinalAmt = Math.ceil(Amt);
        }
        else {
            FinalAmt = Math.floor(Amt);
        }

        RoundOff = Math.abs(Amt - FinalAmt);

        MaterialTransactionView.variables.txtRoundOff.option({ value: RoundOff.toFixed(2) });
        MaterialTransactionView.variables.txtTotalAmount.option({ value: FinalAmt.toFixed(2) });

        MaterialTransactionView.OnChangeExchangeRate();
    },

    RegisterFileUpload: function (btn, anchor) {
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
            },
            error: OnError
        });
    },

    GetBrokerAndCourierList: function () {
        var myfilter = { rules: [] };
        myfilter.rules.push({ field: "ISACTIVE", op: "eq", data: true });
        myfilter.rules.push({ field: "SUBHEAD", op: "eq", data: "Broker,Courier" });
        $.ajax({
            url: getDomain() + MaterialTransactionView.variables.BindAccListUrl + "&ColumnRequested=ACCID,ACCOUNTNAME,PARTYCODE,SUBHEAD&myfilters=" + JSON.stringify(myfilter),
            async: true,
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

                        MaterialTransactionView.variables.dx_ddlBroker.option({
                            dataSource: new DevExpress.data.ArrayStore({
                                data: List.filter(function (x) { return x.subhead == "Broker"; }),
                                key: "accid"
                            }),
                            displayExpr: "accountname",
                            valueExpr: "accid"
                        });

                        MaterialTransactionView.variables.dx_ddlcourier.option({
                            dataSource: new DevExpress.data.ArrayStore({
                                data: List.filter(function (x) { return x.subhead == "Courier"; }),
                                key: "accid"
                            }),
                            displayExpr: "accountname",
                            valueExpr: "accid"
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

    updateTaxProfile: function () {
        var validation = DevExpress.validationEngine.validateGroup("MaterialTransaction");
        if (!validation.isValid) {
            DevExVariables.Toaster("warning", "Please fill all required fields before submit.");
            return;
        }

        if (MaterialTransactionView.variables.Masterid > 0) {
            MaterialTransactionView.variables.Oper = 'Edit';
        }
        else {
            MaterialTransactionView.variables.Oper = 'Add';
        }

        var data = {
            "SBOOKID": MaterialTransactionView.variables.dx_ddlSubBookMaster.option().value,
            "VOUCHERDATE": MaterialTransactionView.variables.dx_txtVoucherDate.option().text,
            //"LOCKERID": MaterialTransactionView.variables.dx_ddllocker.option().value,
            "VOUCHERTYPE": MaterialTransactionView.variables.dx_ddlVoucherType.option().value,
            "ACCID": MaterialTransactionView.variables.dx_txtPartyName.option().selectedItem.accid,
            "PARTYBILLNO": MaterialTransactionView.variables.dx_txtPartyBillNo.option().value,
            "SALESMANID": MaterialTransactionView.variables.dx_ddlOrderby.option().value,
            "DUEDAY": MaterialTransactionView.variables.dx_txtDueDays.option().value,
            "TAXPROFILEID": MaterialTransactionView.variables.dx_TaxProfile.option().value,
            "CURRENCYID": MaterialTransactionView.variables.dx_ddlCurrencyName.option().value,
            "EXCHANGERATE": MaterialTransactionView.variables.dx_txtExchangeRate.option().value,
            //"BILLINGADDRESSID": MaterialTransactionView.variables.dx_ddlBillingAddress.option().value,
            //"BILLADDR_NAME": MaterialTransactionView.variables.dx_ddlBillingAddress.option().selectedItem.shipname,
            //"BILLADDR_MOBNO": MaterialTransactionView.variables.dx_ddlBillingAddress.option().selectedItem.shipmobileno,
            //"BILLADDR_COUNTRY": MaterialTransactionView.variables.dx_ddlBillingAddress.option().selectedItem.shipcountry,
            //"BILLADDR_STATE": MaterialTransactionView.variables.dx_ddlBillingAddress.option().selectedItem.shipstate,
            //"BILLADDR_CITY": MaterialTransactionView.variables.dx_ddlBillingAddress.option().selectedItem.shipcity,
            //"BILLADDR_PINCODE": MaterialTransactionView.variables.dx_ddlBillingAddress.option().selectedItem.shipzipecode,
            //"BILLADDR_ADDRESS": MaterialTransactionView.variables.dx_ddlBillingAddress.option().selectedItem.shipaddress,
            //"BILLADDR_TYPE": MaterialTransactionView.variables.dx_ddlBillingAddress.option().selectedItem.address_type_id,
            //"BILLADDR_GSTNO": MaterialTransactionView.variables.dx_ddlBillingAddress.option().selectedItem.gstno,
            //"BILLADDR_PANNO": MaterialTransactionView.variables.dx_ddlBillingAddress.option().selectedItem.panno,
            //"SHIPPINGADDRESSID": MaterialTransactionView.variables.dx_ddlShippingAddress.option().value,
            //"SHIPADDR_NAME": MaterialTransactionView.variables.dx_ddlShippingAddress.option().selectedItem.shipname,
            //"SHIPADDR_MOBNO": MaterialTransactionView.variables.dx_ddlShippingAddress.option().selectedItem.shipmobileno,
            //"SHIPADDR_COUNTRY": MaterialTransactionView.variables.dx_ddlShippingAddress.option().selectedItem.shipcountry,
            //"SHIPADDR_STATE": MaterialTransactionView.variables.dx_ddlShippingAddress.option().selectedItem.shipstate,
            //"SHIPADDR_CITY": MaterialTransactionView.variables.dx_ddlShippingAddress.option().selectedItem.shipcity,
            //"SHIPADDR_PINCODE": MaterialTransactionView.variables.dx_ddlShippingAddress.option().selectedItem.shipzipecode,
            //"SHIPADDR_ADDRESS": MaterialTransactionView.variables.dx_ddlShippingAddress.option().selectedItem.shipaddress,
            //"SHIPADDR_TYPE": MaterialTransactionView.variables.dx_ddlShippingAddress.option().selectedItem.address_type_id,
            //"SHIPADDR_GSTNO": MaterialTransactionView.variables.dx_ddlShippingAddress.option().selectedItem.gstno,
            //"SHIPADDR_PANNO": MaterialTransactionView.variables.dx_ddlShippingAddress.option().selectedItem.panno,
            "ROUNDOFF": MaterialTransactionView.variables.txtRoundOff.option().value || 0,
            "ROUNDOFFTYPE": $("[name='rd_RoundOff']:checked").val(),
            "FREIGHTCHARGES": MaterialTransactionView.variables.txtFreightCharges.option().value || 0,
            "REMARKS": MaterialTransactionView.variables.dx_txtRemarks.option().value,
            //"BROKERID": MaterialTransactionView.variables.dx_ddlBroker.option().value,
            "BROKERAGE": MaterialTransactionView.variables.dx_txtBrokerage.option().value || 0,
            //"COURIERID": MaterialTransactionView.variables.dx_ddlcourier.option().value,
            "ISFINALSUBMIT": 0,
            "MT_ID": MaterialTransactionView.variables.Masterid,
            "oper": MaterialTransactionView.variables.Oper,
            "OPER_TYPE": "Change_Tax"
        }

        if (MaterialTransactionView.variables.dx_ddllocker.option().value)
            data.LOCKERID = MaterialTransactionView.variables.dx_ddllocker.option().value;

        if (MaterialTransactionView.variables.dx_ddlBillingAddress.option().value) {
            data.BILLINGADDRESSID = MaterialTransactionView.variables.dx_ddlBillingAddress.option().value;
        }

        if (MaterialTransactionView.variables.dx_ddlShippingAddress.option().value) {
            data.SHIPPINGADDRESSID = MaterialTransactionView.variables.dx_ddlShippingAddress.option().value;
        }

        if (MaterialTransactionView.variables.dx_ddlBroker.option().value)
            data.BROKERID = MaterialTransactionView.variables.dx_ddlBroker.option().value;

        $.ajax({
            url: getDomain() + MaterialTransactionView.variables.PerformMasterOperationUrl,
            data: data,
            async: true,
            cache: false,
            type: 'POST',
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    DevExVariables.Toaster("success", 'Tax is Updated successfully.');
                    MaterialTransactionView.variables.dx_dataGridItems.refresh();
                }
                else {
                    DevExVariables.Toaster("warning", $(data).find('RESPONSEMESSAGE').text());
                }
            },
            error: OnError,
        });
    },

    OnChangeExchangeRate: function () {
        var ExRate = MaterialTransactionView.variables.dx_txtExchangeRate.option().value;
        var FinalAmt = MaterialTransactionView.variables.txtTotalAmount.option().value || 0;
        MaterialTransactionView.variables.txtTotalAmountInRs.option({ value: (FinalAmt * ExRate).toFixed(2) });
    },

    validatePcsWithStock: function (e) {
        return e.value > 0 && e.value <= e.data.pcs;
    },

    validateWgtWithStock: function (e) {
        return e.value > 0 && e.value <= e.data.wgt;
    },

    OnSelectVoucherReturn: function (obj) {
        MaterialTransactionView.variables.dx_txtDueDays.option({ value: obj.duedays });
        MaterialTransactionView.variables.dx_ddlVoucherType.option({ value: obj.vouchertype });
        MaterialTransactionView.variables.dx_TaxProfile.option({ value: obj.taxprofileid });
        MaterialTransactionView.variables.dx_ddllocker.option({ value: obj.lockermasterid });
        MaterialTransactionView.variables.dx_txtPartyName.option({
            items: [{ accid: obj.accid, accountname: obj.accountname, partycode: obj.partycode, currencyid: obj.currencyid }],
            selectedItem: { accid: obj.accid, accountname: obj.accountname, partycode: obj.partycode, currencyid: obj.currencyid },
            value: obj.accountname
        });
        //MaterialTransactionView.variables.dx_txtPartyCode.option({ value: obj.partycode });
        MaterialTransactionView.variables.dx_txtPartyBillNo.option({ value: obj.partybillno });
        MaterialTransactionView.variables.dx_ddlCurrencyName.option({ value: obj.currencyid });
        MaterialTransactionView.variables.dx_txtExchangeRate.option({ value: obj.exchangerate });
        MaterialTransactionView.variables.dx_ddlBillingAddress.option({ value: obj.billingaddressid });
        MaterialTransactionView.variables.dx_ddlShippingAddress.option({ value: obj.shippingaddressid });
        MaterialTransactionView.variables.dx_ddlBroker.option({ value: obj.brokerid });
        MaterialTransactionView.variables.dx_txtBrokerage.option({ value: obj.brokerage });
        MaterialTransactionView.variables.dx_ddlcourier.option({ value: obj.courierid });

        MaterialTransactionView.variables.txtFreightCharges.option({ value: obj.freightcharges });
        if (obj.roundofftype == "Add")
            $("#rd_Add").prop("checked", true);
        else
            $("#rd_Less").prop("checked", true);

        $("#modal_ReturnItems").modal("show");
    },

    RegisterItemDocsUpload: function (key, btnUpload, btnView, type) {
        var oldfilePath = ($("#" + btnView).attr("href")).replace(getDomain(), "");

        $('#' + btnUpload).fileupload({
            url: getDomain() + '/Helpers/Handler/FileUploadHandler.ashx?originalfile=' + oldfilePath + '&folder=MaterialTransaction',
            add: function (e, data) {
                if (checkIsValidFile(e.target.accept, data.files[0].type))
                    data.submit();
                else
                    DevExVariables.Toaster('warning', 'Please select only ' + e.target.accept + ' files');
            },
            success: function (response, status) {
                var FileName = response.substring(response.lastIndexOf("/") + 1);
                MaterialTransactionView.uploadItemDocs(key, FileName, type);
            },
            error: OnError
        });
    },

    uploadItemDocs: function (MTD_ID, FileName, Type) {
        var data = {
            "MT_ID": MaterialTransactionView.variables.Masterid,
            "MTD_ID": MTD_ID,
            "oper": "Edit",
            "OPER_TYPE": "Upload_Docs"
        };

        if (Type == "Video")
            data.VIDEO = FileName;
        else if (Type == "Certi")
            data.CERTIFICATE = FileName;

        $.ajax({
            url: getDomain() + MaterialTransactionView.variables.PerformMasterOperationUrl,
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
                    DevExVariables.Toaster("success", 'Document uploaded successfully.');
                    MaterialTransactionView.variables.dx_dataGridItems.refresh();
                }
                else {
                    DevExVariables.InvalidResponseCode(data);
                }
            },
            error: OnError,
        });
    },

    openShipInfo: function (id) {
        var rowData = MaterialTransactionView.variables.dx_dataGrid.getVisibleRows()[MaterialTransactionView.variables.dx_dataGrid.getRowIndexByKey(+id)].data;
        MaterialTransactionView.variables.Masterid = id;
        if (rowData.courierid) {
            MaterialTransactionView.variables.dx_ddlcourier.option({ value: rowData.courierid });
            MaterialTransactionView.variables.dx_txtPortCode.option({ value: rowData.portcode });
            MaterialTransactionView.variables.dx_txtShipBillNo.option({ value: rowData.shippingbillno });
            MaterialTransactionView.variables.dx_dtShipDate.option({ value: rowData.shippingdate });
            MaterialTransactionView.variables.dx_txtTrackingNo.option({ value: rowData.trackingno });
            MaterialTransactionView.variables.dx_txtTrackingLink.option({ value: rowData.trackinglink });
        }

        if (isU()) {
            MaterialTransactionView.variables.dx_Ship_btnSubmit.option({ visible: true });
        }
        else {
            MaterialTransactionView.variables.dx_Ship_btnSubmit.option({ visible: false });
        }

        $("#Modal_ShipInfo").modal("show");
    },

    GenerateEinvoice: function (id) {
        var rowData = MaterialTransactionView.variables.dx_dataGrid.getVisibleRows()[MaterialTransactionView.variables.dx_dataGrid.getRowIndexByKey(+id)].data;
        MaterialTransactionView.variables.Masterid = id;

        var myfilter = { rules: [] };
        myfilter.rules.push({ field: "SALESINVOICEID", op: "eq", data: MaterialTransactionView.variables.Masterid });

        $.ajax({
            url: getDomain() + MaterialTransactionView.variables.CreateEinvoice + "&myfilters=" + JSON.stringify(myfilter),
            //data: data,
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
                    DevExVariables.Toaster("success", 'Record is updated successfully.');
                    MaterialTransactionView.variables.dx_dataGrid.refresh();
                }
                else {
                    DevExVariables.InvalidResponseCode(data);
                }
            },
            error: OnError,
        });

    },

    CancleEinvoice: function (id) {
        var rowData = MaterialTransactionView.variables.dx_dataGrid.getVisibleRows()[MaterialTransactionView.variables.dx_dataGrid.getRowIndexByKey(+id)].data;
        MaterialTransactionView.variables.Masterid = id;

        var myfilter = { rules: [] };
        myfilter.rules.push({ field: "SALESINVOICEID", op: "eq", data: MaterialTransactionView.variables.Masterid });

        $.ajax({
            url: getDomain() + MaterialTransactionView.variables.CancleEinvoiceBill + "&myfilters=" + JSON.stringify(myfilter),
            //data: data,
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

                    DevExVariables.Toaster("success", 'E-Invoice Cancled successfully.');
                    MaterialTransactionView.variables.dx_dataGrid.refresh();
                }
                else {
                    DevExVariables.InvalidResponseCode(data);
                    //MaterialTransactionView.variables.dx_dataGrid.refresh();
                }
            },
            error: OnError,
        });

    },

    btnMasterSubmit_Shipping: function () {
        MaterialTransactionView.variables.dx_Ship_btnSubmit.option({ disabled: true });

        var data = {
            "COURIERID": MaterialTransactionView.variables.dx_ddlcourier.option().value,
            "PORTCODE": MaterialTransactionView.variables.dx_txtPortCode.option().value,
            "SHIPPINGBILLNO": MaterialTransactionView.variables.dx_txtShipBillNo.option().value,
            "TRACKINGNO": MaterialTransactionView.variables.dx_txtTrackingNo.option().value,
            "TRACKINGLINK": MaterialTransactionView.variables.dx_txtTrackingLink.option().value,
            "SHIPPINGDATE": MaterialTransactionView.variables.dx_dtShipDate.option().text,
            "OPER_TYPE": "Shipping_Info",
            "oper": 'Edit',
            "MT_ID": MaterialTransactionView.variables.Masterid
        }

        $.ajax({
            url: getDomain() + MaterialTransactionView.variables.PerformMasterOperationUrl,
            data: data,
            async: true,
            cache: false,
            type: 'POST',
            beforeSend: function () {
                dx_LoaderTrinity.show();
            },
            complete: function () {
                dx_LoaderTrinity.hide();
                MaterialTransactionView.variables.dx_Ship_btnSubmit.option({ disabled: false });
            },
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    DevExVariables.Toaster("success", 'Record is updated successfully.');
                    $("#Modal_ShipInfo").modal("hide");
                    DevExpress.validationEngine.resetGroup("ShipInfo");

                    MaterialTransactionView.variables.Masterid = "";
                    MaterialTransactionView.variables.dx_dtShipDate.option({ value: new Date() });

                    MaterialTransactionView.variables.dx_dataGrid.refresh();
                }
                else {
                    DevExVariables.InvalidResponseCode(data);
                }
            },
            error: OnError,
        });
    },

    deleteAttachment: function (rid, file) {
        MaterialTransactionView.variables.deletedFiles += file + ',';
        $('#' + rid).remove();
        $('.tooltip').remove();
    },

    ClearShareItemControlls: function () {
        MaterialTransactionView.variables.dx_txtSharetoPartyList.option({ "value": "" }, { "items": "" }, { "selectedItem": "" });
        MaterialTransactionView.variables.dx_RadioSocial.option({ value: "WhatsApp" });
        MaterialTransactionView.variables.dx_txtVoucherMobileNo.option({ value: "" });
        MaterialTransactionView.variables.dx_txtShareMessage.option({ value: 'Dear sir, Some Jewellery Designs are shared by Trinity Jewells with you. Kindly click on below URL to view shared Designs. {SHARE URL}' });
        MaterialTransactionView.variables.dx_txtSharingSubject.option({ value: "Material Details shared by TrinityJewells" });
        MaterialTransactionView.variables.dx_txtSharingEmailBody.option({ value: MaterialTransactionView.variables.content });
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
        var Type = MaterialTransactionView.variables.dx_RadioSocial.option().value;
        if (Type == "E-Mail") {
            if (!MaterialTransactionView.variables.dx_txtSharingEmailId.option().value || !MaterialTransactionView.variables.dx_txtSharingSubject.option().value || !MaterialTransactionView.variables.dx_txtSharingEmailBody.option().value) {
                DevExVariables.Toaster("warning", "Email Id, Subject and Email Body are required.");
                return false;
            }
        }
        else {
            if (!MaterialTransactionView.variables.dx_txtVoucherMobileNo.option().value || !MaterialTransactionView.variables.dx_txtShareMessage.option().value) {
                DevExVariables.Toaster("warning", "Mobile No and Message are required.");
                return false;
            }
        }
        var MobileNo = "", MSG = "", Mailbody = "", MailId = "", Subject = "";

        if (Type == "E-Mail") {
            MailId = MaterialTransactionView.variables.dx_txtSharingEmailId.option().value;
            Subject = MaterialTransactionView.variables.dx_txtSharingSubject.option().value;
            Mailbody = MaterialTransactionView.variables.dx_txtSharingEmailBody.option().value;
        }
        else if (Type == "SMS") {
            MobileNo = MaterialTransactionView.variables.dx_txtVoucherMobileNo.option().value;
            MSG = MaterialTransactionView.variables.dx_txtShareMessage.option().value;
        }
        else {
            MSG = MaterialTransactionView.variables.dx_txtShareMessage.option().value;
        }

        var ShareLink = getERPDomain() + "/Sharing/VoucherView?VoucherId=" + MaterialTransactionView.variables.Masterid + "/VoucherType=MaterialTransaction";
        var message = "";
        if (Type == "E-Mail") {
            message = Mailbody.replace("{SHARE URL}", '<a href="' + ShareLink + '" target="_blank">Click here...</a>');
        }
        else {
            message = MSG.replace("{SHARE URL}", ShareLink);
        }
        var result = MaterialTransactionView.ShareSocialMedia(Type, MobileNo, message, MailId, Subject);
        if (result == true) {
            $("#ModalSharing").modal("hide");
            if (MaterialTransactionView.variables.IsfromCart == true) {
                MaterialTransactionView.variables.dx_gridSelectionItem_CartList.clearSelection();
            }
            else {
                MaterialTransactionView.variables.dx_dataGrid.clearSelection();
            }
        }
        MaterialTransactionView.ClearShareItemControlls();
        $("#ModalSharing").modal("hide");
    },
};

$(document).ready(function () {
    MaterialTransactionView.InitializeMainGridView();
    MaterialTransactionView.FormInitialize();

    MaterialTransactionView.BindSubBookList();
    MaterialTransactionView.BindLockerList();
    MaterialTransactionView.BindTaxProfile();
    MaterialTransactionView.BindCurrencyList();
    MaterialTransactionView.GetBrokerAndCourierList();
    MaterialTransactionView.GetCountryList();

    MaterialTransactionView.GetUserName();
    MaterialTransactionView.variables.dx_ddlOrderby.option({ value: Number(getUserId()) });

    MaterialTransactionView.GetRmCodeList();
    MaterialTransactionView.GetRmShapeList();
    MaterialTransactionView.GetRmPurityList();
    MaterialTransactionView.GetRmColorList();

    MaterialTransactionView.variables.dx_popupItemRemove = $('#dx_popupItemRemove').dxPopup({
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
                    MaterialTransactionView.RemoveItemFromList();
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
                    MaterialTransactionView.variables.dx_popupItemRemove.hide();
                },
            },
        }],
    }).dxPopup('instance');

    $("#lnk_AddNewRow").click(function () {
        MaterialTransactionView.AddNewLineDetails();
    });

    $("#Modal_AddItems").on("shown.bs.modal", function () {
        MaterialTransactionView.AddNewLineDetails();
    });

    $("#modal_StockItems").on("shown.bs.modal", function () {
        if (MaterialTransactionView.variables.dx_dataGridStockItems) {
            MaterialTransactionView.variables.dx_dataGridStockItems.refresh();
        }
        else {
            MaterialTransactionView.variables.dx_dataGridStockItems = $("#dx_dataGridStockItems").dxDataGrid({
                dataSource: new DevExpress.data.CustomStore({
                    key: "rownum",
                    load: function (loadOptions) {
                        var deferred = $.Deferred();

                        var myfilter = { rules: [] };
                        myfilter.rules.push({ field: "LOCKERID", op: "eq", data: MaterialTransactionView.variables.dx_ddllocker.option().selectedItem.lockermasterid });

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
                            url: getDomain() + MaterialTransactionView.variables.BindStockUrl + "&" + parameters.join("&") + "&myfilters=" + JSON.stringify(myfilter),
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
                        var rowData = MaterialTransactionView.variables.dx_dataGridStockItems.getVisibleRows()[MaterialTransactionView.variables.dx_dataGridStockItems.getRowIndexByKey(key)].data;
                        if (values.inspcs) {
                            if (values.inspcs > rowData.pcs) {
                                deferred.reject("You can not insert pcs more than stock.");
                                //DevExVariables.Toaster("warning", "You can not insert pcs more than stock.");
                            }
                            else {
                                deferred.resolve();
                            }
                        }
                        else if (values.inswgt) {
                            if (values.inswgt > rowData.wgt) {
                                deferred.reject("You can not insert weight more than stock.");
                                //DevExVariables.Toaster("warning", "You can not insert weight more than stock.");
                            }
                            else {
                                deferred.resolve();
                            }
                        }
                        else if (values.rate) {
                            var amt = parseFloat(values.rate * (+rowData.inswgt || 0)).toFixed(2);
                            deferred.resolve();
                            //MaterialTransactionView.variables.dx_dataGridStockItems.cellValue(MaterialTransactionView.variables.dx_dataGridStockItems.getRowIndexByKey(key), "amt", amt);
                        }
                        else {
                            deferred.resolve();
                        }
                        return deferred.promise();
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
                    visible: true
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
                    refreshMode: 'repaint',
                },
                columnMinWidth: 70,
                columns: [{ dataField: "rownum", allowSorting: false, visible: false, allowEditing: false },
                        { dataField: "rmcode", caption: "RM Code", dataType: "string", allowSorting: false, allowFiltering: true, filterOperations: ["contains"], allowHeaderFiltering: false, allowEditing: false },
                        { dataField: "rmcate", caption: "Category", dataType: "string", allowSorting: false, allowFiltering: true, filterOperations: ["contains"], allowHeaderFiltering: false, allowEditing: false, visible: false },
                        { dataField: "rmsubcate", caption: "Sub Category", dataType: "string", allowSorting: false, allowFiltering: true, filterOperations: ["contains"], allowHeaderFiltering: false, allowEditing: false, visible: false },
                        { dataField: "shape", caption: "Shape", dataType: "string", allowSorting: false, allowFiltering: true, filterOperations: ["contains"], allowHeaderFiltering: false, allowEditing: false },
                        { dataField: "purity", caption: "Purity", dataType: "string", allowSorting: false, allowFiltering: true, filterOperations: ["contains"], allowHeaderFiltering: false, allowEditing: false },
                        { dataField: "colour", caption: "Color", dataType: "string", allowSorting: false, allowFiltering: true, filterOperations: ["contains"], allowHeaderFiltering: false, allowEditing: false },
                        { dataField: "cut", caption: "Cut", dataType: "string", allowSorting: false, allowFiltering: true, filterOperations: ["contains"], allowHeaderFiltering: false, allowEditing: false },
                        { dataField: "length", visible: false, caption: "Length", dataType: "string", allowSorting: false, allowFiltering: false, filterOperations: ["contains"], allowHeaderFiltering: false, allowEditing: false },
                        { dataField: "width", visible: false, caption: "Width", dataType: "string", allowSorting: false, allowFiltering: false, filterOperations: ["contains"], allowHeaderFiltering: false, allowEditing: false },
                        { dataField: "charni", caption: "Charni", dataType: "string", allowSorting: false, allowFiltering: true, filterOperations: ["contains"], allowHeaderFiltering: false, allowEditing: false },
                        { dataField: "purityper", caption: "Purity Per", dataType: "number", allowSorting: false, allowFiltering: false, filterOperations: ["contains"], allowHeaderFiltering: false, allowEditing: false },
                        {
                            dataField: "isexporttype", caption: "Is Export", dataType: "string", alignment: "center", allowSorting: false, allowFiltering: false, filterOperations: ["contains"], allowHeaderFiltering: true, allowEditing: false,
                            headerFilter: {
                                dataSource: [{
                                    text: "Yes",
                                    value: ["isexporttype", "equals", 1]
                                }, {
                                    text: "No",
                                    value: ["isexporttype", "equals", 0]
                                }]
                            },
                            cellTemplate: function (container, options) {
                                var temp;
                                if (options.displayValue == "1") {
                                    temp = '<span class="label label-success" style="font-size: 100%; !important">Yes</span>';
                                }
                                else {
                                    temp = '<span class="label label-danger" style="font-size: 100%; !important">No</span>';
                                }

                                $(temp).appendTo(container);
                            }
                        },
                        { dataField: "packetid", caption: "Pkt Id", dataType: "string", allowSorting: false, allowFiltering: true, filterOperations: ["contains"], allowHeaderFiltering: false, allowEditing: false },
                        { dataField: "pcs", caption: "Stock Pcs", dataType: "number", allowSorting: false, allowFiltering: false, allowHeaderFiltering: false, allowEditing: false },
                        { dataField: "wgt", caption: "Stock Wgt", dataType: "number", allowSorting: false, allowFiltering: false, allowHeaderFiltering: false, allowEditing: false },
                        {
                            dataField: "inspcs", caption: "Pcs", dataType: "number", allowSorting: false, allowFiltering: false, allowHeaderFiltering: false, allowEditing: true,
                            validationRules: [{
                                type: "required",
                                message: "Pcs is required."
                            }, {
                                type: "custom",
                                validationCallback: MaterialTransactionView.validatePcsWithStock,
                                message: "value should neither be less than 0 nor be greater than Stock Pcs."
                            }]
                        },
                        {
                            dataField: "inswgt", caption: "Wgt", dataType: "number", allowSorting: false, allowFiltering: false, allowHeaderFiltering: false, allowEditing: true,
                            validationRules: [{
                                type: "required",
                                message: "Wgt is required."
                            }, {
                                type: "custom",
                                validationCallback: MaterialTransactionView.validateWgtWithStock,
                                message: "value should neither be less than 0 nor be greater than Stock Wgt."
                            }],
                            setCellValue: function (newData, value, currentRowData) {
                                newData.inswgt = value;
                                newData.amt = ((currentRowData.rate || 0) * (value || 0)).toFixed(2);
                            }
                        },
                        {
                            dataField: "rate", caption: "Rate", dataType: "number", allowSorting: false, allowFiltering: false, allowHeaderFiltering: false, allowEditing: true,
                            validationRules: [{
                                type: "required",
                                message: "Rate is required."
                            }, {
                                type: "range",
                                min: 0,
                                message: "Rate should be greater than 0."
                            }],
                            setCellValue: function (newData, value, currentRowData) {
                                newData.rate = value;
                                newData.amt = ((currentRowData.inswgt || 0) * (value || 0)).toFixed(2);
                            }
                        },
                        { dataField: "amt", caption: "Amt", dataType: "number", allowSorting: false, allowFiltering: false, allowHeaderFiltering: false, allowEditing: false },
                        {
                            dataField: "less", caption: "Less", dataType: "number", allowSorting: false, allowFiltering: false, allowHeaderFiltering: false, allowEditing: true,
                            validationRules: [{
                                type: "range",
                                min: 0,
                                message: "Less should be greater than 0."
                            }]
                        },
                ],
                onSelectionChanged(selectedItems) {
                    if (selectedItems.selectedRowKeys.length > 0) {
                        //MaterialTransactionView.variables.dx_btnPrintItem.option({ disabled: false });
                    }
                    else {
                        //MaterialTransactionView.variables.dx_btnPrintItem.option({ disabled: true });
                    }
                },
            }).dxDataGrid("instance");
        }
    });

    $("#modal_ReturnItems").on("shown.bs.modal", function () {
        if (MaterialTransactionView.variables.dx_dataGridReturnItems) {
            MaterialTransactionView.variables.dx_dataGridReturnItems.refresh();
        }
        else {
            MaterialTransactionView.variables.dx_dataGridReturnItems = $("#dx_dataGridReturnItems").dxDataGrid({
                dataSource: new DevExpress.data.CustomStore({
                    key: "rownum",
                    load: function (loadOptions) {
                        var deferred = $.Deferred();

                        var myfilter = { rules: [] };
                        myfilter.rules.push({ field: "MT_ID", op: "eq", data: MaterialTransactionView.variables.dx_txtVoucherReturn.option().selectedItem.mt_id });

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
                            url: getDomain() + MaterialTransactionView.variables.BindReturnItemsUrl + "&" + parameters.join("&") + "&myfilters=" + JSON.stringify(myfilter),
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
                        var rowData = MaterialTransactionView.variables.dx_dataGridReturnItems.getVisibleRows()[MaterialTransactionView.variables.dx_dataGridReturnItems.getRowIndexByKey(key)].data;
                        if (values.inspcs) {
                            if (values.inspcs > rowData.pcs) {
                                deferred.reject("You can not insert pcs more than pending.");
                                //DevExVariables.Toaster("warning", "You can not insert pcs more than stock.");
                            }
                            else {
                                deferred.resolve();
                            }
                        }
                        else if (values.inswgt) {
                            if (values.inswgt > rowData.wgt) {
                                deferred.reject("You can not insert weight more than pending.");
                            }
                            else {
                                deferred.resolve();
                            }
                        }
                        else {
                            deferred.resolve();
                        }
                        return deferred.promise();
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
                    visible: true
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
                    refreshMode: 'repaint',
                },
                columnMinWidth: 70,
                columns: [{ dataField: "rownum", allowSorting: false, visible: false, allowEditing: false },
                        { dataField: "rmcode", caption: "RM Code", dataType: "number", allowSorting: false, allowFiltering: true, filterOperations: ["contains"], allowHeaderFiltering: false, allowEditing: false },
                        { dataField: "rmcate", caption: "Category", dataType: "string", allowSorting: false, allowFiltering: true, filterOperations: ["contains"], allowHeaderFiltering: false, allowEditing: false },
                        { dataField: "rmsubcate", caption: "Sub Category", dataType: "string", allowSorting: false, allowFiltering: true, filterOperations: ["contains"], allowHeaderFiltering: false, allowEditing: false },
                        { dataField: "shape", caption: "Shape", dataType: "string", allowSorting: false, allowFiltering: true, filterOperations: ["contains"], allowHeaderFiltering: false, allowEditing: false },
                        { dataField: "purity", caption: "Purity", dataType: "string", allowSorting: false, allowFiltering: true, filterOperations: ["contains"], allowHeaderFiltering: false, allowEditing: false },
                        { dataField: "colour", caption: "Color", dataType: "string", allowSorting: false, allowFiltering: true, filterOperations: ["contains"], allowHeaderFiltering: false, allowEditing: false },
                        { dataField: "cut", caption: "Cut", dataType: "string", allowSorting: false, allowFiltering: true, filterOperations: ["contains"], allowHeaderFiltering: false, allowEditing: false },
                        { dataField: "length", caption: "Length", dataType: "string", allowSorting: false, allowFiltering: false, filterOperations: ["contains"], allowHeaderFiltering: false, allowEditing: false, visible: false },
                        { dataField: "width", caption: "Width", dataType: "string", allowSorting: false, allowFiltering: false, filterOperations: ["contains"], allowHeaderFiltering: false, allowEditing: false, visible: false },
                        { dataField: "charni", caption: "Charni", dataType: "string", allowSorting: false, allowFiltering: true, filterOperations: ["contains"], allowHeaderFiltering: false, allowEditing: false },
                        { dataField: "purityper", caption: "Purity Per", dataType: "number", allowSorting: false, allowFiltering: false, filterOperations: ["contains"], allowHeaderFiltering: false, allowEditing: false },
                        {
                            dataField: "isexporttype", caption: "Is Export", dataType: "string", alignment: "center", allowSorting: false, allowFiltering: false, filterOperations: ["contains"], allowHeaderFiltering: true, allowEditing: false,
                            headerFilter: {
                                dataSource: [{
                                    text: "Yes",
                                    value: ["isexporttype", "equals", 1]
                                }, {
                                    text: "No",
                                    value: ["isexporttype", "equals", 0]
                                }]
                            },
                            cellTemplate: function (container, options) {
                                var temp;
                                if (options.displayValue == "1") {
                                    temp = '<span class="label label-success" style="font-size: 100%; !important">Yes</span>';
                                }
                                else {
                                    temp = '<span class="label label-danger" style="font-size: 100%; !important">No</span>';
                                }

                                $(temp).appendTo(container);
                            }
                        },
                        { dataField: "packetid", caption: "Pkt Id", dataType: "string", allowSorting: false, allowFiltering: true, filterOperations: ["contains"], allowHeaderFiltering: false, allowEditing: false },

                        { dataField: "pcs", caption: "Pending Pcs", dataType: "number", allowSorting: false, allowFiltering: false, allowHeaderFiltering: false, allowEditing: false },
                        { dataField: "wgt", caption: "Pending Wgt", dataType: "number", allowSorting: false, allowFiltering: false, allowHeaderFiltering: false, allowEditing: false },
                        {
                            dataField: "inspcs", caption: "Pcs", dataType: "number", allowSorting: false, allowFiltering: false, allowHeaderFiltering: false, allowEditing: true,
                            validationRules: [{
                                type: "required",
                                message: "Pcs is required."
                            }, {
                                type: "custom",
                                validationCallback: MaterialTransactionView.validatePcsWithStock,
                                message: "value should neither be less than 0 nor be greater than Pending Pcs."
                            }]
                        },
                        {
                            dataField: "inswgt", caption: "Wgt", dataType: "number", allowSorting: false, allowFiltering: false, allowHeaderFiltering: false, allowEditing: true,
                            validationRules: [{
                                type: "required",
                                message: "Wgt is required."
                            }, {
                                type: "custom",
                                validationCallback: MaterialTransactionView.validateWgtWithStock,
                                message: "value should neither be less than 0 nor be greater than Pending Wgt."
                            }],
                            setCellValue: function (newData, value, currentRowData) {
                                newData.inswgt = value;
                                newData.amt = ((currentRowData.rate || 0) * (value || 0)).toFixed(2);
                            }
                        },
                        {
                            dataField: "rate", caption: "Rate", dataType: "number", allowSorting: false, allowFiltering: false, allowHeaderFiltering: false, allowEditing: true,
                            validationRules: [{
                                type: "required",
                                message: "Rate is required."
                            }, {
                                type: "range",
                                min: 0,
                                message: "Rate should be greater than 0."
                            }],
                            setCellValue: function (newData, value, currentRowData) {
                                newData.rate = value;
                                newData.amt = ((currentRowData.inswgt || 0) * (value || 0)).toFixed(2);
                            }
                        },
                        { dataField: "amt", caption: "Amt", dataType: "number", allowSorting: false, allowFiltering: false, allowHeaderFiltering: false, allowEditing: false },
                        {
                            dataField: "less", caption: "Less", dataType: "number", allowSorting: false, allowFiltering: false, allowHeaderFiltering: false, allowEditing: true,
                            validationRules: [{
                                type: "range",
                                min: 0,
                                message: "Less should be greater than 0."
                            }]
                        },
                ],
            }).dxDataGrid("instance");
        }
    });

    $("[name='rd_RoundOff']").change(function () {
        MaterialTransactionView.calcRoundOff();
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
                //var x = displayFile;
                //var f = x.substr(0, x.lastIndexOf('.'));
                $('#' + $('#hdnPreviewUploader').val()).append('<tr id="' + file + '" fileid="' + fileid + '" >' +
                    '<td class="FilePath text-center">' +
                        '<a class="btn btn-info" href="' + strHref + '" target="blank"><i class="fa fa-eye"></i></a>' +
                    '</td>' +
                    '<td class="Description">' +
                        '<input type="text" class="form-control" value="' + displayFile.split('.')[0] + '" placeholder="Description">' +
                    '</td>' +
                    '<td class="text-center">' +
                        '<a href="javascript:void(0);" onclick="MaterialTransactionView.deleteAttachment(\'' + file + '\',\'' + strHref + '\');" class="btn btn-danger"><i class="fa fa-trash"></i></a>' +
                    '</td>' +
                '</tr>');
            }
        });

        $('#modalUpload').modal('hide');
    });

    if (+$("#hdnSBOOKID").val()) {
        $("#pnlView").hide();
        $("#frm_MaterialTransaction").show();
        MaterialTransactionView.variables.Masterid = "";

        MaterialTransactionView.variables.dx_ddlSubBookMaster.option({ value: +$("#hdnSBOOKID").val() });

        if (MaterialTransactionView.variables.dx_ddlSubBookMaster.option().selectedItem) {
            if (['Material Sale return', 'Material Purchase Return', 'Material Approval Return'].indexOf(MaterialTransactionView.variables.dx_ddlSubBookMaster.option().selectedItem.subbook) !== -1) {
                MaterialTransactionView.variables.dx_txtVoucherReturn.option({ disabled: false });
                MaterialTransactionView.variables.dx_btnAddDetailItem.option({ visible: false });
            }
            else {
                MaterialTransactionView.variables.dx_txtVoucherReturn.option({ disabled: true });
                MaterialTransactionView.variables.dx_btnAddDetailItem.option({ visible: true });
            }

            if (['Material Purchase', 'Material Import', 'Material Purchase Return'].indexOf(MaterialTransactionView.variables.dx_ddlSubBookMaster.option().selectedItem.subbook) !== -1) {
                MaterialTransactionView.variables.dx_ddlBillingAddress.option({ disabled: true });
                MaterialTransactionView.variables.dx_ddlShippingAddress.option({ disabled: true });
            }
            else {
                MaterialTransactionView.variables.dx_ddlBillingAddress.option({ disabled: false });
                MaterialTransactionView.variables.dx_ddlShippingAddress.option({ disabled: false });
            }
        }

        MaterialTransactionView.variables.dx_ddlSubBookMaster.option({ disabled: true });

    }

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

function viewAttachment(id) {
    var rowData = MaterialTransactionView.variables.dx_dataGrid.getVisibleRows()[MaterialTransactionView.variables.dx_dataGrid.getRowIndexByKey(+id)].data;
    if (rowData.virtualfilename)
        window.open("/UploadFiles/MaterialTransaction/" + rowData.virtualfilename);
    else
        DevExVariables.Toaster("warning", "No attachment uploaded.");
}

function VoucherShare(id) {
    MaterialTransactionView.variables.Masterid = id;
    MaterialTransactionView.ClearShareItemControlls();
    $("#ModalSharing").modal('show');

}


