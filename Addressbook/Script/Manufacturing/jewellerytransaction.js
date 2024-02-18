var JewelleryTranscationView = {

    variables: {
        BindStaticDataUrl: "/Common/BindMastersDetails?ServiceName=STATIC_MASTER_GET&IsActive=true",
        BindJewelleryDesignListUrl: "/Common/BindMastersDetails?ServiceName=JEWELLERY_TRAN_DESIGNLIST_GET",
        BindDesignListUrl: "/Common/BindMastersDetails?ServiceName=PRD_DESIGN_MASTER_GET",
        BindPrdListUrl: "/Common/BindMastersDetails?ServiceName=PRD_PRODUCT_MASTER_GET",
        BindPartyAddress: "/Common/BindMastersDetails?ServiceName=ACCOUNTMASTER_SHIPINGINFO_GET",
        PerformMasterOperationUrl_Party: "/Common/OpeartionsOnMaster?ServiceName=ACCOUNTMASTER_CRUD",
        PerformMasterOperationUrl: "/Common/OpeartionsOnMaster?ServiceName=ACC_JEWELLERYTRANSACTION_MASTER_CRUD",
        BindAccListUrl: "/Common/BindMastersDetails?ServiceName=ACCOUNTMASTER_GET",
        BindTaxProfile: "/Common/BindMastersDetails?ServiceName=ACC_TAXPROFILE_GET",
        BindLockerList: "/Common/BindMastersDetails?ServiceName=LOCKERMASTER_GET",
        BindCurrencyList: "/Common/BindMastersDetails?ServiceName=CURRENCY_EXCHANGERATE_DETAILS_GET",
        BindMainGridListUrl: "/Common/BindMastersDetails?ServiceName=ACC_JEWELLERYTRANSACTION_MASTER_GET",
        BindJewelleryItemDetailsUrl: "/Common/BindMastersDetails?ServiceName=ACC_JEWELLERYTRANSACTION_ITEMS_LIST_GET",
        BindDetailListUrl: "/Common/BindMastersDetails?ServiceName=ACC_MATERIALTRANSACTION_DETAIL_GET",
        BindFreight_Deatils: "/Common/BindMastersDetails?ServiceName=ACC_MATERIALTRANSACTION_FREIGHTDEATIL_GET",
        BindStockUrl: "/Common/BindMastersDetails?ServiceName=ACC_MATERIAL_STOCK_GET",
        BindJewelleryDesignDetailsUrl: "/Common/BindMastersDetails?ServiceName=ACC_JEWELLERYTRANSACTION_DESIGN_DETAILS_GET",
        BindJewelleryMaterialRateUrl: "/Common/BindMastersDetails?ServiceName=ACC_JEWELLERY_MATERIAL_RATE_LIST_GET",
        BindItemCateUrl: "/Common/BindMastersDetails?ServiceName=ACC_ITEMMASTER_GET",
        BindBranchUrl: "/Common/BindMastersDetails?ServiceName=COMPANY_BRANCH_MASTER_GET",
        CreateEinvoice: "/Common/BindMastersDetails?ServiceName=JEWELLERY_EINVOICEBILL_CRUD",
        CancleEinvoiceBill: "/Common/BindMastersDetails?ServiceName=JEWELLERY_EINVOICEBILL_CANCLE_CRUD",

        VoucherTypeList: ["Retails Invoice", "Tax Invoice"],
        EditFlag: 0,
        Oper: 'Add',
        addedit: "added",
        Masterid: "",
        DeleteDataObj: "",
        RowCount: 1,
        ListId: 1,
        ImgRowCount: 1,
        ImageUploadType: "",
        dx_dataGrid: "",
        dx_dataGridItems: "",
        dx_popupRecordDelete: "",
        DeletePopUpOptions: {
            width: 300,
            height: 200,
            contentTemplate: function () {
                return $("<div />").append(
                    $("<p>Voucher No: <span>" + JewelleryTranscationView.variables.DeleteDataObj.voucherno + "</span></p>")
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
                            "JT_ID": JewelleryTranscationView.variables.Masterid,
                            "oper": JewelleryTranscationView.variables.Oper,
                        }

                        $.ajax({
                            url: getDomain() + JewelleryTranscationView.variables.PerformMasterOperationUrl,
                            data: data,
                            async: true,
                            cache: false,
                            type: 'POST',
                            success: function (data) {
                                if ($(data).find('RESPONSECODE').text() == "0") {
                                    DevExVariables.Toaster("success", 'Record is deleted successfully');

                                    JewelleryTranscationView.variables.dx_popupRecordDelete.hide();
                                    JewelleryTranscationView.variables.dx_dataGrid.refresh();
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

        dx_dataGrid: "",
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
        //dx_btnAddDetailItem: "",
        dx_btnRemoveItem: "",
        dx_popupItemRemove: "",
        dx_popupItemCopy: "",
        dx_btnSaveReturnItems: "",
        dx_SwitchIsMixExport: "",
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
        //dx_txtQty: "",
        //dx_dtPromiseDate: "",
        dx_txtRemark: "",
        dx_txtItemCate: "",
        dx_btnUpdatePara: "",
        dx_btnCancelPara: "",
        dx_btnUpdateItem: "",
        dx_btnRemoveItem: "",
        dx_popupItemRemove: "",
        dx_popupItemCopy: "",
        dx_txtNumOfCopy: "",

        /*------------------------variables for update item details--------------------------*/

        JI_ID: '',
        PM_ID: '',

        dx_ddlBroker: '',
        dx_txtBrokerage: '',
        dx_txtRemarks: '',
        txtFreightCharges: "",
        txtTaxableAmount: '',
        txtAmount: '',
        txtRoundOff: '',
        txtTotalAmount: '',
        txtTotalAmountInRs: '',

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

        RmCodeList: [],
        RmShapeList: [],
        RmPurityList: [],
        RmColorList: [],
        LabList: [],
        JsizeList: [],
        deletedFiles: "",

        /*------------------------variables for Dispatch--------------------------*/

        dx_ddlcourier: "",
        dx_txtPortCode: "",
        dx_txtShipBillNo: "",
        dx_dtShipDate: "",

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
        JewelleryTranscationView.variables.dx_dataGrid = $("#dx_dataGrid").dxDataGrid({
            dataSource: new DevExpress.data.CustomStore({
                key: "jt_id",
                load: function (loadOptions) {
                    var deferred = $.Deferred();
                    var result = DevExVariables.GetDataList(loadOptions, JewelleryTranscationView.variables.BindMainGridListUrl);
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
            columns: [{ dataField: "jt_id", allowFiltering: false, allowSorting: true, sortIndex: 1, sortOrder: "desc", visible: false },
                  { dataField: "subbook", caption: "Sub Book", dataType: "string", allowSorting: true, allowFiltering: true, filterOperations: ["contains"], allowHeaderFiltering: false },
                { dataField: "voucherno", caption: "Voucher No", dataType: "string", allowSorting: true, allowFiltering: true, allowHeaderFiltering: false },
                { dataField: "voucherdate", caption: "Voucher Date", dataType: "string", allowSorting: true, allowFiltering: true, allowHeaderFiltering: false },
                  { dataField: "vouchertype", caption: "Voucher type", dataType: "string", allowSorting: true, allowFiltering: true, filterOperations: ["contains"], allowHeaderFiltering: false },
                { dataField: "accountname", caption: "Party Name", dataType: "string", allowSorting: true, allowFiltering: true, allowHeaderFiltering: false },
                { dataField: "currencycode", caption: "Currency", dataType: "string", allowSorting: false, allowFiltering: false, allowHeaderFiltering: false },
                 { dataField: "totalamount", caption: "Total Amount", dataType: "number", allowSorting: false, allowFiltering: false, allowHeaderFiltering: false },
                { dataField: "totalqty", caption: "Total Items", dataType: "number", allowSorting: false, allowFiltering: false, allowHeaderFiltering: false },
                { dataField: "finalbillamount", caption: "Bill Amt", dataType: "string", alignment: "right", allowSorting: true, allowFiltering: true, allowHeaderFiltering: false },
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
                                        JewelleryTranscationView.EditFromGrid(data.value, options.key, 'Verify');
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
                                       JewelleryTranscationView.EditFromGrid(data.value, options.key, 'Dispatch');
                                   }
                               }).appendTo(container);

                               if (options.value) {
                                   temp = '<label class="btn btn-info" style="padding: 2px 6px !important;margin-left: 5px;" title="Shipping Info" onclick=\'JewelleryTranscationView.openShipInfo("' + options.key + '"); \'><i class="fa fa-truck"></i></label>';
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
                         if (options.data.subbook == "Jewellery Sale") {
                             if (options.displayValue == null && options.data.cancelirn == null) {
                                 temp = '<span class="btn btn-primary" style="padding: 2px 6px !important;" title="Generate Invoice"  onclick=\'JewelleryTranscationView.GenerateEinvoice("' + options.key + '"); \'>Generate</span>';
                             }
                             else if (options.displayValue != null && options.data.cancelirn != null) {
                                 temp = '<span class="btn" style="padding: 2px 4px !important; background-color:#ffa604;" title="E-Invoice is Cancelled" disabled>Cancelled</span>';
                             }
                             else {
                                 if (options.data.iscancleableeinvoice == 1) {
                                     temp = '<span class="btn btn-danger" style="padding: 2px 13px !important; " title="You can not Cancel This Invoice" disabled>Cancel</span>';
                                 }
                                 else {
                                     temp = '<span class="btn btn-danger" style="padding: 2px 13px !important;" title="Cancel Invoice"  onclick=\'JewelleryTranscationView.CancleEinvoice("' + options.key + '"); \'>Cancle</span>';
                                 }
                             }
                         }
                         $(temp).appendTo(container);
                     }
                 },
                 {
                     dataField: "subbook", caption: "Action", alignment: "center", allowFiltering: false, allowSorting: false, fixed: true, fixedPosition: "right",
                     cellTemplate: function (container, options) {
                         if ((options.value == "Jewellery Sale") || (options.value == "Jewellery Export")) {
                             DevExVariables.ActionTemplate(container, options, true, true, "JewelleryTranscationView", "Attachments,Share,Pdf", options.value);
                         }
                         else {
                             DevExVariables.ActionTemplate(container, options, true, true, "JewelleryTranscationView", "Attachments", options.value);
                         }
                     }
                 },
            ]
        }).dxDataGrid("instance");
    },

    EditFromGrid: function (val, id, type) {
        var data = {
            "JT_ID": id,
            "OPER_TYPE": "EditFromGrid",
            "oper": "Edit"
        }

        if (type == "Verify")
            data.ISVERIFY = val;
        else if (type == "Dispatch")
            data.ISDISPATCH = val;

        $.ajax({
            url: getDomain() + JewelleryTranscationView.variables.PerformMasterOperationUrl,
            data: data,
            async: true,
            cache: false,
            type: 'POST',
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    DevExVariables.Toaster("success", 'Record is updated successfully.');

                    JewelleryTranscationView.variables.dx_dataGrid.refresh();
                }
            },
            error: OnError,
        });
    },

    triggerId: function (id) {
        var rowData = JewelleryTranscationView.variables.dx_dataGrid.getVisibleRows()[JewelleryTranscationView.variables.dx_dataGrid.getRowIndexByKey(+id)].data;
        JewelleryTranscationView.variables.Masterid = id;
        JewelleryTranscationView.variables.Oper = 'Edit';



        JewelleryTranscationView.variables.dx_ddlSubBookMaster.option({ value: rowData.sbookid });
        JewelleryTranscationView.variables.dx_txtVoucherNo.option({ value: rowData.voucherno });
        if (rowData.returnfromjt_id) {
            JewelleryTranscationView.variables.dx_txtVoucherReturn.option({
                items: [{ jt_id: rowData.returnfromjt_id, voucherno: rowData.returnfromvoucherno }],
                selectedItem: { jt_id: rowData.returnfromjt_id, voucherno: rowData.returnfromvoucherno },
                value: rowData.returnfromvoucherno
            });
            //JewelleryTranscationView.variables.dx_btnAddDetailItem.option({ visible: false });
        }
        JewelleryTranscationView.variables.dx_txtDueDays.option({ value: rowData.duedays });
        JewelleryTranscationView.variables.dx_ddlVoucherType.option({ value: rowData.vouchertype });
        JewelleryTranscationView.variables.dx_txtVoucherDate.option({ value: rowData.voucherdate });
        JewelleryTranscationView.variables.dx_ddlOrderby.option({ value: rowData.salesmanid });
        JewelleryTranscationView.variables.dx_TaxProfile.option({ value: rowData.taxprofileid });
        JewelleryTranscationView.variables.dx_ddllocker.option({ value: rowData.lockermasterid });
        JewelleryTranscationView.variables.dx_txtPartyName.option({
            items: [{ accid: rowData.accid, accountname: rowData.accountname, taxprofileid: rowData.taxprofileid, shippingid: rowData.shippingid, billingid: rowData.billingid, creditdays: rowData.duedays, partycode: rowData.partycode, currencyid: rowData.currencyid }],
            selectedItem: { accid: rowData.accid, accountname: rowData.accountname, taxprofileid: rowData.taxprofileid, shippingid: rowData.shippingid, billingid: rowData.billingid, creditdays: rowData.duedays, partycode: rowData.partycode, currencyid: rowData.currencyid },
            value: rowData.accountname
        });
        //JewelleryTranscationView.variables.dx_txtPartyCode.option({ value: rowData.partycode });
        JewelleryTranscationView.variables.dx_txtPartyBillNo.option({ value: rowData.partybillno });
        //JewelleryTranscationView.variables.dx_txtVoucherReturn.option({ value: rowData.VoucherReturn });
        JewelleryTranscationView.variables.dx_ddlCurrencyName.option({ value: rowData.currencyid });
        JewelleryTranscationView.variables.dx_txtExchangeRate.option({ value: rowData.exchangerate });
        JewelleryTranscationView.variables.dx_ddlBillingAddress.option({ value: rowData.billingaddressid });
        JewelleryTranscationView.variables.dx_ddlShippingAddress.option({ value: rowData.shippingaddressid });
        JewelleryTranscationView.variables.dx_ddlBroker.option({ value: rowData.brokerid });
        JewelleryTranscationView.variables.dx_txtBrokerage.option({ value: rowData.brokerage });
        JewelleryTranscationView.variables.dx_ddlcourier.option({ value: rowData.courierid });
        JewelleryTranscationView.variables.dx_txtRemarks.option({ value: rowData.remark });
        JewelleryTranscationView.variables.dx_SwitchIsMixExport.option({ value: rowData.ismixexport });

        JewelleryTranscationView.variables.dx_ddlCurrencyName.option({ disabled: true });
        if (JewelleryTranscationView.variables.dx_ddlCurrencyName.option().value == 2)
            JewelleryTranscationView.variables.dx_txtExchangeRate.option({ disabled: true });
        if (rowData.virtualfilename) {
            $("#lnkAttachFilePreview").attr("FileName", "/UploadFiles/JewelleryTransaction/" + rowData.virtualfilename);
            $("#lnkAttachFilePreview").html(rowData.actualfilename);
            $("#hdnOldAttachFile").val("/UploadFiles/JewelleryTransaction/" + rowData.virtualfilename);
        }
        JewelleryTranscationView.variables.txtFreightCharges.option({ value: rowData.freightcharges });
        if (rowData.roundofftype == "Add")
            $("#rd_Add").prop("checked", true);
        else
            $("#rd_Less").prop("checked", true);

        if (JewelleryTranscationView.variables.dx_ddlSubBookMaster.option().selectedItem) {
            if (JewelleryTranscationView.variables.dx_ddlSubBookMaster.option().selectedItem.subbook == "Jewellery Export") {
                JewelleryTranscationView.variables.dx_SwitchIsMixExport.option({ visible: true });
                $("#MixExportLabel").html('Mix Export?');
            }
            else {
                JewelleryTranscationView.variables.dx_SwitchIsMixExport.option({ visible: false });
                $("#MixExportLabel").html('');
            }
        }

        $("#AttachmentsList").show();
        $('#tbody_AttachmentsList').html("");
        var myfilter = { rules: [] };
        myfilter.rules.push({ field: "JT_ID", op: "eq", data: id });
        $.ajax({
            url: getDomain() + "/Common/BindMastersDetails?ServiceName=ACC_JEWELLERYTRANSACTION_FILESLIST_GET&myfilters=" + JSON.stringify(myfilter),
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
                                    '<a class="btn btn-info" href="' + getDomain() + '/UploadFiles/JewelleryTransaction/' + obj.filename + '" target="blank"><i class="fa fa-eye"></i></a>' +
                                '</td>' +
                                '<td class="Description">' +
                                    '<input type="text" class="form-control" value="' + obj.description + '" placeholder="Description">' +
                                '</td>' +
                                '<td class="text-center">' +
                                    '<a href="javascript:void(0);" onclick="JewelleryTranscationView.deleteAttachment(\'' + file + '\',\'' + obj.filename + '\');" class="btn btn-danger"><i class="fa fa-trash"></i></a>' +
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


        JewelleryTranscationView.variables.dx_dataGridItems.refresh();

        $("#frm_JewelleryTransaction").show();
        $("#pnlView").hide();

        if (isU()) {        // || rowData.isfinalsubmit == 0
            JewelleryTranscationView.variables.dx_btnSubmit.option({ visible: true });
            //JewelleryTranscationView.variables.dx_btnAddDetailItem.option({ visible: true });
            JewelleryTranscationView.variables.dx_btnRemoveItem.option({ visible: true });
        }
        else {
            JewelleryTranscationView.variables.dx_btnSubmit.option({ visible: false });
            //JewelleryTranscationView.variables.dx_btnAddDetailItem.option({ visible: false });
            JewelleryTranscationView.variables.dx_btnRemoveItem.option({ visible: false });
        }

        //if (rowData.returnfrommt_id) {
        //    //JewelleryTranscationView.variables.dx_btnAddDetailItem.option({ visible: false });
        //}

        JewelleryTranscationView.variables.dx_ddlOrderby.option({ disabled: true });
        JewelleryTranscationView.variables.dx_ddlSubBookMaster.option({ disabled: true });
        JewelleryTranscationView.variables.dx_txtVoucherReturn.option({ disabled: true });

    },

    FormInitialize: function () {


        /*-------Start Modal Design Controls-------------------------------------*/
        JewelleryTranscationView.variables.dx_txtCategory = $("#dx_txtCategory").dxTextBox({
            mode: "text",
            disabled: true,
        }).dxTextBox("instance");
        JewelleryTranscationView.variables.dx_txtSubCategory = $("#dx_txtSubCategory").dxTextBox({
            mode: "text",
            disabled: true,
        }).dxTextBox("instance");
        JewelleryTranscationView.variables.dx_txtDesignNo = $("#dx_txtDesignNo").dxTextBox({
            mode: "text",
            disabled: true,
        }).dxTextBox("instance");
        JewelleryTranscationView.variables.dx_txtDesignwidth = $("#dx_txtDesignwidth").dxTextBox({
            mode: "text",
            disabled: true,
        }).dxTextBox("instance");
        JewelleryTranscationView.variables.dx_txtDesignlength = $("#dx_txtDesignlength").dxTextBox({
            mode: "text",
            disabled: true,
        }).dxTextBox("instance");
        JewelleryTranscationView.variables.dx_txtDesignheight = $("#dx_txtDesignheight").dxTextBox({
            mode: "text",
            disabled: true,
        }).dxTextBox("instance");
        JewelleryTranscationView.variables.dx_txtDesignsize = $("#dx_txtDesignsize").dxTextBox({
            mode: "text",
            disabled: true,
        }).dxTextBox("instance");

        JewelleryTranscationView.variables.dx_dataGridItems = $("#dx_dataGridItems").dxDataGrid({
            dataSource: new DevExpress.data.CustomStore({
                key: 'ji_id',
                load: function (loadOptions) {
                    var deferred = $.Deferred();
                    if (JewelleryTranscationView.variables.Masterid) {
                        var myfilter = { rules: [] };
                        myfilter.rules.push({ field: "JT_ID", op: "eq", data: JewelleryTranscationView.variables.Masterid });
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
                            url: getDomain() + JewelleryTranscationView.variables.BindJewelleryItemDetailsUrl + "&" + parameters.join("&") + "&myfilters=" + JSON.stringify(myfilter),
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
                                JewelleryTranscationView.variables.txtTaxableAmount.option({ value: (result.serviceresponse.totaldetails.taxableamt).toFixed(2) || 0.00 });
                                JewelleryTranscationView.variables.txtAmount.option({ value: (result.serviceresponse.totaldetails.amountwithtax).toFixed(2) || 0.00 });
                                JewelleryTranscationView.variables.txtRoundOff.option({ value: (result.serviceresponse.totaldetails.roundoff).toFixed(2) || 0.00 });
                                JewelleryTranscationView.variables.txtTotalAmount.option({ value: (result.serviceresponse.totaldetails.finalbillamount).toFixed(2) || 0.00 });
                                JewelleryTranscationView.variables.txtTotalAmountInRs.option({ value: (result.serviceresponse.totaldetails.finalamtinrs).toFixed(2) || 0.00 });
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
                                JewelleryTranscationView.variables.txtTaxableAmount.option({ value: 0.00 });
                                JewelleryTranscationView.variables.txtAmount.option({ value: 0.00 });
                                JewelleryTranscationView.variables.txtRoundOff.option({ value: 0.00 });
                                JewelleryTranscationView.variables.txtTotalAmount.option({ value: 0.00 });
                                JewelleryTranscationView.variables.txtTotalAmountInRs.option({ value: 0.00 });
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
                    var deferred = $.Deferred();
                    var result;
                    result = JewelleryTranscationView.UpdateSingleItem(key, values);

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
            columns: [{ dataField: "ji_id", allowSorting: true, sortIndex: 1, sortOrder: "desc", visible: false, allowEditing: false },
                { dataField: "jt_id", allowSorting: false, visible: false, allowEditing: false },
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
                        { dataField: "bagno", caption: "BagNo", dataType: "string", allowSorting: false, allowFiltering: true, filterOperations: ["contains"], allowHeaderFiltering: false, allowEditing: false },
                        {
                            dataField: "goodssize", caption: "Size", dataType: "string", minWidth: 100, allowSorting: false, allowFiltering: false, allowEditing: true,
                            lookup: {
                                dataSource(options) {
                                    return {
                                        store: JewelleryTranscationView.variables.JsizeList,
                                        filter: options.data ? ['desgcateid', '=', options.data.desgcateid] : null,
                                    };
                                },
                                displayExpr: 'size',
                                valueExpr: 'size',
                            },
                        },
                        { dataField: "huid", caption: "HUId", dataType: "string", allowSorting: false, allowFiltering: false, allowEditing: false },
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
                        { dataField: "grosswgt", caption: "Gross Wgt", dataType: "number", allowSorting: false, allowFiltering: false, allowEditing: false },
                        { dataField: "mamt", caption: "Amt", dataType: "number", allowSorting: false, allowFiltering: false, allowEditing: false }
                    ],

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
                        //{ dataField: "totalamt", caption: "Total Amt", dataType: "number", allowSorting: false, allowFiltering: false, allowEditing: false },
                        { dataField: "itemremark", caption: "Notes", dataType: "string", allowSorting: false, allowFiltering: false, allowEditing: false },
                        { dataField: "remark", caption: "Remark", dataType: "string", allowSorting: false, allowFiltering: false, allowEditing: false },
                    ]
                },
                {
                    caption: "Edit", alignment: "center", allowSorting: false, allowFiltering: false, allowEditing: false, fixed: true, fixedPosition: "right",
                    cellTemplate: function (container, options) {
                        var temp = '<span class="btn btn-primary" style="padding: 2px 6px !important;" title="Edit" onclick=\'JewelleryTranscationView.EditItemDetail("' + options.key + '");\'><i class="fa fa-pencil"></i></span>';
                        temp += '<span class="btn btn-success" style="padding: 2px 6px !important; margin-left:5px;" title="Copy" onclick=\'JewelleryTranscationView.CopyJewelleryItem("' + options.key + '");\'><i class="fa fa-plus"></i></span>';
                        if ((options.data.designcode).substring(3) == "0000")
                            temp += '<label class="btn btn-default" style="padding: 2px 6px !important; margin-left:5px;" title="Upload Image" for="btn_ImageUpload' + options.key + '" \'><input type="file" class="hide" accept="image/*" id="btn_ImageUpload' + options.key + '" /><i class="fa fa-upload"></i></label>';
                        $(temp).appendTo(container);
                        JewelleryTranscationView.RegisterItemImageUpload(options.key, "btn_ImageUpload" + options.key, "DesignMaster/" + options.data.desgcate + "/" + options.data.desgsubcate + "/" + options.data.designcode);
                    },

                },
            ],
            onSelectionChanged(selectedItems) {
                $("#SelectedItemCount").html(selectedItems.selectedRowsData.length);

                if (selectedItems.selectedRowKeys.length > 0) {
                    JewelleryTranscationView.variables.dx_btnUpdateItem.option({ disabled: false });
                    JewelleryTranscationView.variables.dx_btnRemoveItem.option({ disabled: false });
                }
                else {
                    JewelleryTranscationView.variables.dx_btnUpdateItem.option({ disabled: true });
                    JewelleryTranscationView.variables.dx_btnRemoveItem.option({ disabled: true });
                }
            },
            masterDetail: {
                enabled: true,
                template: JewelleryTranscationView.GetGridDetails,
            },
        }).dxDataGrid("instance");

        JewelleryTranscationView.variables.dx_btnUpdateMatRate = $("#dx_btnUpdateMatRate").dxButton({
            icon: "check",
            text: "Update",
            type: "success",
            disabled: true,
            onClick: function (e) {
                if (JewelleryTranscationView.variables.Masterid > 0) {
                    JewelleryTranscationView.variables.Oper = 'Edit';
                }
                else {
                    JewelleryTranscationView.variables.Oper = 'Add';
                }

                var SelectedItemList = [], SelectedRateList = [], xmlStringRateList = "<RATELIST>";
                SelectedItemList = JewelleryTranscationView.variables.dx_dataGridItems.option().selectedRowKeys;

                SelectedRateList = JewelleryTranscationView.variables.dx_dataGrid_MaterialRate.getVisibleRows().filter(function (x) { return x.isSelected == true });
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
                    "SELECTEDITEMS": SelectedItemList.toString(),
                    "SBOOKID": JewelleryTranscationView.variables.dx_ddlSubBookMaster.option().value,
                    //"VOUCHERNO": JewelleryTranscationView.variables.dx_txtVoucherNo.option().text,
                    //"VOUCHERRETURN": JewelleryTranscationView.variables.dx_txtVoucherReturn.option().value,
                    "DUEDAY": JewelleryTranscationView.variables.dx_txtDueDays.option().value,
                    "VOUCHERTYPE": JewelleryTranscationView.variables.dx_ddlVoucherType.option().value,
                    "VOUCHERDATE": JewelleryTranscationView.variables.dx_txtVoucherDate.option().text,
                    "SALESMANID": JewelleryTranscationView.variables.dx_ddlOrderby.option().value,
                    "TAXPROFILEID": JewelleryTranscationView.variables.dx_TaxProfile.option().value,
                    //"LOCKERID": JewelleryTranscationView.variables.dx_ddllocker.option().value,
                    "ACCID": JewelleryTranscationView.variables.dx_txtPartyName.option().selectedItem.accid,
                    "PARTYBILLNO": JewelleryTranscationView.variables.dx_txtPartyBillNo.option().value,
                    "CURRENCYID": JewelleryTranscationView.variables.dx_ddlCurrencyName.option().value,
                    "EXCHANGERATE": JewelleryTranscationView.variables.dx_txtExchangeRate.option().value,
                    "BILLADDR_ADDRESS": JewelleryTranscationView.variables.dx_ddlBillingAddress.option().value,
                    "SHIPADDR_ADDRESS": JewelleryTranscationView.variables.dx_ddlShippingAddress.option().value,
                    "BROKERID": JewelleryTranscationView.variables.dx_ddlBroker.option().value,
                    "BROKERAGE": JewelleryTranscationView.variables.dx_txtBrokerage.option().value,
                    //"NOTES": JewelleryTranscationView.variables.dx_txtRemarks.option().value,
                    "ROUNDOFF": JewelleryTranscationView.variables.txtRoundOff.option().value || 0,
                    "ROUNDOFFTYPE": $("[name='rd_RoundOff']:checked").val(),
                    "FREIGHTCHARGES": JewelleryTranscationView.variables.txtFreightCharges.option().value,
                    "ISFINALSUBMIT": 0,
                    "JT_ID": JewelleryTranscationView.variables.Masterid,
                    "oper": JewelleryTranscationView.variables.Oper,
                    "OPER_TYPE": "Item_Update_MaterialRate"
                }

                if (JewelleryTranscationView.variables.dx_ddlSubBookMaster.option().selectedItem.subbook == "Jewellery Export")
                    data.ISMIXEXPORT = JewelleryTranscationView.variables.dx_SwitchIsMixExport.option().value;

                if (JewelleryTranscationView.variables.dx_txtRemarks.option().value)
                    data.NOTES = JewelleryTranscationView.variables.dx_txtRemarks.option().value;

                $.ajax({
                    url: getDomain() + JewelleryTranscationView.variables.PerformMasterOperationUrl,
                    data: data,
                    async: true,
                    cache: false,
                    type: 'POST',
                    success: function (data) {
                        if ($(data).find('RESPONSECODE').text() == "0") {
                            DevExVariables.Toaster("success", 'Records are Updated successfully.');
                            JewelleryTranscationView.variables.dx_dataGridItems.refresh();
                            JewelleryTranscationView.variables.dx_dataGridItems.clearSelection();
                            JewelleryTranscationView.variables.dx_dataGrid_MaterialRate.clearSelection();

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
        JewelleryTranscationView.variables.dx_btnCancelMatRate = $("#dx_btnCancelMatRate").dxButton({
            icon: "close",
            text: "Cancel",
            type: "danger",
            onClick: function (e) {
                $("#Modal_UpdateMaterialRate").modal("hide");
            }
        }).dxButton("instance");
        JewelleryTranscationView.variables.dx_btnUpdateItemDetails = $("#dx_btnUpdateItemDetails").dxButton({
            icon: "check",
            text: "Update",
            type: "success",
            onClick: function (e) {
                if (JewelleryTranscationView.variables.Masterid > 0) {
                    JewelleryTranscationView.variables.Oper = 'Edit';
                }
                else {
                    JewelleryTranscationView.variables.Oper = 'Add';
                }

                var xmlNodeList = '<DETAILSLIST>';
                $.each(JewelleryTranscationView.variables.DetailsControlsList, function (key, obj) {
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
                    "JI_ID": JewelleryTranscationView.variables.JI_ID,
                    "SBOOKID": JewelleryTranscationView.variables.dx_ddlSubBookMaster.option().value,
                    //"VOUCHERNO": JewelleryTranscationView.variables.dx_txtVoucherNo.option().text,
                    //"VOUCHERRETURN": JewelleryTranscationView.variables.dx_txtVoucherReturn.option().value,
                    "DUEDAY": JewelleryTranscationView.variables.dx_txtDueDays.option().value,
                    "VOUCHERTYPE": JewelleryTranscationView.variables.dx_ddlVoucherType.option().value,
                    "VOUCHERDATE": JewelleryTranscationView.variables.dx_txtVoucherDate.option().text,
                    "SALESMANID": JewelleryTranscationView.variables.dx_ddlOrderby.option().value,
                    "TAXPROFILEID": JewelleryTranscationView.variables.dx_TaxProfile.option().value,
                    //"LOCKERID": JewelleryTranscationView.variables.dx_ddllocker.option().value,
                    "ACCID": JewelleryTranscationView.variables.dx_txtPartyName.option().selectedItem.accid,
                    "PARTYBILLNO": JewelleryTranscationView.variables.dx_txtPartyBillNo.option().value,
                    "CURRENCYID": JewelleryTranscationView.variables.dx_ddlCurrencyName.option().value,
                    "EXCHANGERATE": JewelleryTranscationView.variables.dx_txtExchangeRate.option().value,
                    "BILLADDR_ADDRESS": JewelleryTranscationView.variables.dx_ddlBillingAddress.option().value,
                    "SHIPADDR_ADDRESS": JewelleryTranscationView.variables.dx_ddlShippingAddress.option().value,
                    "BROKERID": JewelleryTranscationView.variables.dx_ddlBroker.option().value,
                    "BROKERAGE": JewelleryTranscationView.variables.dx_txtBrokerage.option().value,
                    "NOTES": JewelleryTranscationView.variables.dx_txtRemarks.option().value,
                    "ROUNDOFF": JewelleryTranscationView.variables.txtRoundOff.option().value || 0,
                    "ROUNDOFFTYPE": $("[name='rd_RoundOff']:checked").val(),
                    "FREIGHTCHARGES": JewelleryTranscationView.variables.txtFreightCharges.option().value,
                    "ISFINALSUBMIT": 0,
                    //"DESIGNCODEID": JT_ID,
                    "JT_ID": JewelleryTranscationView.variables.Masterid,
                    "oper": JewelleryTranscationView.variables.Oper,
                    "OPER_TYPE": "Item_Update_DesignDetails"
                }

                if (JewelleryTranscationView.variables.dx_ddlSubBookMaster.option().selectedItem.subbook == "Jewellery Export")
                    data.ISMIXEXPORT = JewelleryTranscationView.variables.dx_SwitchIsMixExport.option().value;

                if (JewelleryTranscationView.variables.dx_ddllocker.option().value)
                    data.LOCKERID = JewelleryTranscationView.variables.dx_ddllocker.option().value;

                if (JewelleryTranscationView.variables.dx_ddlBillingAddress.option().value) {
                    data.BILLINGADDRESSID = JewelleryTranscationView.variables.dx_ddlBillingAddress.option().value;
                }

                if (JewelleryTranscationView.variables.dx_ddlShippingAddress.option().value) {
                    data.SHIPPINGADDRESSID = JewelleryTranscationView.variables.dx_ddlShippingAddress.option().value;
                }

                if (JewelleryTranscationView.variables.dx_ddlBroker.option().value)
                    data.BROKERID = JewelleryTranscationView.variables.dx_ddlBroker.option().value;

                $.ajax({
                    url: getDomain() + JewelleryTranscationView.variables.PerformMasterOperationUrl,
                    data: data,
                    async: true,
                    cache: false,
                    type: 'POST',
                    success: function (data) {
                        if ($(data).find('RESPONSECODE').text() == "0") {
                            DevExVariables.Toaster("success", 'Records are Updated successfully.');

                            JewelleryTranscationView.clearControlsForItemDetails();
                            $("#Modal_ItemDetails").modal("hide");
                            JewelleryTranscationView.variables.dx_dataGridItems.refresh();
                        }
                        else {
                            DevExVariables.InvalidResponseCode(data);
                        }
                    },
                    error: OnError,
                });

            }
        }).dxButton("instance");
        JewelleryTranscationView.variables.dx_btnCancelItemDetails = $("#dx_btnCancelItemDetails").dxButton({
            icon: "close",
            text: "Cancel",
            type: "danger",
            onClick: function (e) {
                JewelleryTranscationView.clearControlsForItemDetails();
                $("#Modal_ItemDetails").modal("hide");
            }
        }).dxButton("instance");

        /*-------End   Modal Design Controls-------------------------------------*/

        JewelleryTranscationView.variables.dx_txtDiaPcs = $("#dx_txtDiaPcs").dxTextBox({
            readOnly: true,
            value: 0,
        }).dxTextBox("instance");
        JewelleryTranscationView.variables.dx_txtDiaCrt = $("#dx_txtDiaCrt").dxTextBox({
            readOnly: true,
            value: 0,
        }).dxTextBox("instance");
        JewelleryTranscationView.variables.dx_txtNetWgt = $("#dx_txtNetWgt").dxTextBox({
            readOnly: true,
            value: 0,
        }).dxTextBox("instance");
        JewelleryTranscationView.variables.dx_txtGrossWgt = $("#dx_txtGrossWgt").dxTextBox({
            readOnly: true,
            value: 0,
        }).dxTextBox("instance");
        JewelleryTranscationView.variables.dx_txtFineWgt = $("#dx_txtFineWgt").dxTextBox({
            readOnly: true,
            value: 0,
        }).dxTextBox("instance");
        /*-------End Detailgrid textbox-------------------------------------*/

        /*-------Start Bottom Left controls-------------------------------------*/
        JewelleryTranscationView.RegisterFileUpload('inputCADFile', 'lnkCADFilePreview', "#ItemimgError");

        /*-----------------------fields for update design parameters------------------------*/
        JewelleryTranscationView.variables.dx_ddlMRmCode = $("#dx_ddlMRmCode").dxSelectBox({
            placeholder: "Select...",
            searchEnabled: true,
            onValueChanged(data) {
                if (data.component.option().selectedItem) {
                    JewelleryTranscationView.variables.dx_ddlMColor.option({
                        dataSource: new DevExpress.data.ArrayStore({
                            data: JewelleryTranscationView.variables.RmColorList.filter(function (x) { return x.rmcate == 'METAL' && x.rmsubcate == data.component.option().selectedItem.rmsubcate }),
                            key: 'colourid',
                        }),
                        displayExpr: 'colour',
                        valueExpr: 'colourid',
                        value: ""
                    });
                }
                else {
                    JewelleryTranscationView.variables.dx_ddlMColor.option({
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

        JewelleryTranscationView.variables.dx_ddlMColor = $("#dx_ddlMColor").dxSelectBox({
            placeholder: "Select...",
            searchEnabled: true
        }).dxValidator({
            validationGroup: "UpdateParameter",
            validationRules: []
        }).dxSelectBox("instance");

        JewelleryTranscationView.variables.dx_txtMRate = $("#dx_txtMRate").dxNumberBox({
            placeholder: "Rate Per 10gram",
            min: 0,
            value: "",
        }).dxValidator({
            validationGroup: "UpdateParameter",
            validationRules: []
        }).dxNumberBox("instance");

        JewelleryTranscationView.variables.dx_ddlDRmCode = $("#dx_ddlDRmCode").dxSelectBox({
            placeholder: "Select...",
            searchEnabled: true,
            onValueChanged(data) {
                if (data.component.option().selectedItem) {
                    JewelleryTranscationView.variables.dx_ddlDPurity.option({
                        dataSource: new DevExpress.data.ArrayStore({
                            data: JewelleryTranscationView.variables.RmPurityList.filter(function (x) { return x.rmcate == 'GEMS' && x.rmsubcate == data.component.option().selectedItem.rmsubcate }),
                            key: 'purityid',
                        }),
                        displayExpr: 'purity',
                        valueExpr: 'purityid',
                        value: ""
                    });
                    JewelleryTranscationView.variables.dx_ddlDColor.option({
                        dataSource: new DevExpress.data.ArrayStore({
                            data: JewelleryTranscationView.variables.RmColorList.filter(function (x) { return x.rmcate == 'GEMS' && x.rmsubcate == data.component.option().selectedItem.rmsubcate }),
                            key: 'colourid',
                        }),
                        displayExpr: 'colour',
                        valueExpr: 'colourid',
                        value: ""
                    });
                }
                else {
                    JewelleryTranscationView.variables.dx_ddlDPurity.option({
                        dataSource: new DevExpress.data.ArrayStore({
                            data: [],
                            key: 'purityid',
                        }),
                        displayExpr: 'purity',
                        valueExpr: 'purityid',
                        value: ""
                    });
                    JewelleryTranscationView.variables.dx_ddlDColor.option({
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

        JewelleryTranscationView.variables.dx_ddlDPurity = $("#dx_ddlDPurity").dxSelectBox({
            placeholder: "Select...",
            searchEnabled: true
        }).dxValidator({
            validationGroup: "UpdateParameter",
            validationRules: []
        }).dxSelectBox("instance");

        JewelleryTranscationView.variables.dx_ddlDColor = $("#dx_ddlDColor").dxSelectBox({
            placeholder: "Select...",
            searchEnabled: true
        }).dxValidator({
            validationGroup: "UpdateParameter",
            validationRules: []
        }).dxSelectBox("instance");

        JewelleryTranscationView.variables.dx_ddlSRmCode = $("#dx_ddlSRmCode").dxSelectBox({
            placeholder: "Select...",
            searchEnabled: true,
            onValueChanged(data) {
                if (data.component.option().selectedItem) {
                    JewelleryTranscationView.variables.dx_ddlSPurity.option({
                        dataSource: new DevExpress.data.ArrayStore({
                            data: JewelleryTranscationView.variables.RmPurityList.filter(function (x) { return x.rmcate == 'STONE' && x.rmsubcate == data.component.option().selectedItem.rmsubcate }),
                            key: 'purityid',
                        }),
                        displayExpr: 'purity',
                        valueExpr: 'purityid',
                        value: ""
                    });
                    JewelleryTranscationView.variables.dx_ddlSColor.option({
                        dataSource: new DevExpress.data.ArrayStore({
                            data: JewelleryTranscationView.variables.RmColorList.filter(function (x) { return x.rmcate == 'STONE' && x.rmsubcate == data.component.option().selectedItem.rmsubcate }),
                            key: 'colourid',
                        }),
                        displayExpr: 'colour',
                        valueExpr: 'colourid',
                        value: ""
                    });
                }
                else {
                    JewelleryTranscationView.variables.dx_ddlSPurity.option({
                        dataSource: new DevExpress.data.ArrayStore({
                            data: [],
                            key: 'purityid',
                        }),
                        displayExpr: 'purity',
                        valueExpr: 'purityid',
                        value: ""
                    });
                    JewelleryTranscationView.variables.dx_ddlSColor.option({
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

        JewelleryTranscationView.variables.dx_ddlSPurity = $("#dx_ddlSPurity").dxSelectBox({
            placeholder: "Select...",
            searchEnabled: true
        }).dxValidator({
            validationGroup: "UpdateParameter",
            validationRules: []
        }).dxSelectBox("instance");

        JewelleryTranscationView.variables.dx_ddlSColor = $("#dx_ddlSColor").dxSelectBox({
            placeholder: "Select...",
            searchEnabled: true
        }).dxValidator({
            validationGroup: "UpdateParameter",
            validationRules: []
        }).dxSelectBox("instance");

        JewelleryTranscationView.variables.dx_ddlLabourOn = $("#dx_ddlLabourOn").dxSelectBox({
            placeholder: "Select...",
            searchEnabled: true,
            items: ["FIXED", "GROSS WEIGHT", "NET WEIGHT", "NET WEIGHT + GEMS WEIGHT"]
        }).dxValidator({
            validationGroup: "UpdateParameter",
            validationRules: []
        }).dxSelectBox("instance");

        JewelleryTranscationView.variables.dx_txtLabourRate = $("#dx_txtLabourRate").dxNumberBox({
            placeholder: "Labour Rate",
            min: 0,
            value: "",
        }).dxValidator({
            validationGroup: "UpdateParameter",
            validationRules: []
        }).dxNumberBox("instance");

        JewelleryTranscationView.variables.dx_txtHandlingRate = $("#dx_txtHandlingRate").dxNumberBox({
            placeholder: "Handling Rate",
            min: 0,
            value: "",
        }).dxValidator({
            validationGroup: "UpdateParameter",
            validationRules: []
        }).dxNumberBox("instance");

        JewelleryTranscationView.variables.dx_ddlLab = $("#dx_ddlLab").dxSelectBox({
            placeholder: "Select Lab...",
            searchEnabled: true
        }).dxValidator({
            validationGroup: "UpdateParameter",
            validationRules: []
        }).dxSelectBox("instance");

        JewelleryTranscationView.variables.dx_txtCertiCharge = $("#dx_txtCertiCharge").dxNumberBox({
            placeholder: "Certification Charge",
            min: 0,
            value: "",
        }).dxValidator({
            validationGroup: "UpdateParameter",
            validationRules: []
        }).dxNumberBox("instance");

        JewelleryTranscationView.variables.dx_txtQty = $("#dx_txtQty").dxNumberBox({
            placeholder: "Item Quantity",
            min: 0,
            value: "",
        }).dxValidator({
            validationGroup: "UpdateParameter",
            validationRules: []
        }).dxNumberBox("instance");

        JewelleryTranscationView.variables.dx_txtRemark = $("#dx_txtRemark").dxTextBox({
            placeholder: "Item Remark",
        }).dxValidator({
            validationGroup: "UpdateParameter",
            validationRules: []
        }).dxTextBox("instance");

        JewelleryTranscationView.variables.dx_txtItemCate = $("#dx_txtItemCate").dxSelectBox({
            placeholder: "Select Item Category...",
            searchEnabled: true,
        }).dxValidator({
            validationGroup: "UpdateParameter",
            validationRules: []
        }).dxSelectBox("instance");

        JewelleryTranscationView.variables.dx_btnUpdatePara = $("#dx_btnUpdatePara").dxButton({
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

                if (JewelleryTranscationView.variables.dx_ddlDRmCode.option().value
                        || JewelleryTranscationView.variables.dx_ddlDColor.option().value
                        || JewelleryTranscationView.variables.dx_ddlDPurity.option().value) {
                    if (!JewelleryTranscationView.variables.dx_ddlDRmCode.option().value
                        || !JewelleryTranscationView.variables.dx_ddlDColor.option().value
                        || !JewelleryTranscationView.variables.dx_ddlDPurity.option().value) {
                        DevExVariables.Toaster("warning", "Please fill all diamond fields together for submit.");
                        return;
                    }
                }

                if (JewelleryTranscationView.variables.dx_ddlSRmCode.option().value
                        || JewelleryTranscationView.variables.dx_ddlSColor.option().value
                        || JewelleryTranscationView.variables.dx_ddlSPurity.option().value) {
                    if (!JewelleryTranscationView.variables.dx_ddlSRmCode.option().value
                        || !JewelleryTranscationView.variables.dx_ddlSColor.option().value
                        || !JewelleryTranscationView.variables.dx_ddlSPurity.option().value) {
                        DevExVariables.Toaster("warning", "Please fill all stone fields together for submit.");
                        return;
                    }
                }

                if (JewelleryTranscationView.variables.dx_ddlMRmCode.option().value
                        || JewelleryTranscationView.variables.dx_ddlMColor.option().value) {
                    if (!JewelleryTranscationView.variables.dx_ddlMRmCode.option().value
                        || !JewelleryTranscationView.variables.dx_ddlMColor.option().value) {
                        DevExVariables.Toaster("warning", "Please fill Metal Code and Color together for submit.");
                        return;
                    }
                }


                if (JewelleryTranscationView.variables.Masterid > 0) {
                    JewelleryTranscationView.variables.Oper = 'Edit';
                }
                else {
                    JewelleryTranscationView.variables.Oper = 'Add';
                }

                var SelectedItemList = [];
                SelectedItemList = JewelleryTranscationView.variables.dx_dataGridItems.option().selectedRowKeys;

                var data = {
                    //"XMLPARAM": escape(xmlStringRateList),
                    "SELECTEDITEMS": SelectedItemList.toString(),
                    "SBOOKID": JewelleryTranscationView.variables.dx_ddlSubBookMaster.option().value,
                    "HSNCODEID": JewelleryTranscationView.variables.dx_txtItemCate.option().value,
                    //"VOUCHERNO": JewelleryTranscationView.variables.dx_txtVoucherNo.option().text,
                    //"VOUCHERRETURN": JewelleryTranscationView.variables.dx_txtVoucherReturn.option().value,
                    "DUEDAY": JewelleryTranscationView.variables.dx_txtDueDays.option().value,
                    "VOUCHERTYPE": JewelleryTranscationView.variables.dx_ddlVoucherType.option().value,
                    "VOUCHERDATE": JewelleryTranscationView.variables.dx_txtVoucherDate.option().text,
                    "SALESMANID": JewelleryTranscationView.variables.dx_ddlOrderby.option().value,
                    "TAXPROFILEID": JewelleryTranscationView.variables.dx_TaxProfile.option().value,
                    //"LOCKERID": JewelleryTranscationView.variables.dx_ddllocker.option().value,
                    "ACCID": JewelleryTranscationView.variables.dx_txtPartyName.option().selectedItem.accid,
                    "PARTYBILLNO": JewelleryTranscationView.variables.dx_txtPartyBillNo.option().value,
                    "CURRENCYID": JewelleryTranscationView.variables.dx_ddlCurrencyName.option().value,
                    "EXCHANGERATE": JewelleryTranscationView.variables.dx_txtExchangeRate.option().value,
                    "BILLADDR_ADDRESS": JewelleryTranscationView.variables.dx_ddlBillingAddress.option().value,
                    "SHIPADDR_ADDRESS": JewelleryTranscationView.variables.dx_ddlShippingAddress.option().value,
                    "BROKERID": JewelleryTranscationView.variables.dx_ddlBroker.option().value,
                    "BROKERAGE": JewelleryTranscationView.variables.dx_txtBrokerage.option().value,
                    "NOTES": JewelleryTranscationView.variables.dx_txtRemarks.option().value,
                    "ROUNDOFF": JewelleryTranscationView.variables.txtRoundOff.option().value || 0,
                    "ROUNDOFFTYPE": $("[name='rd_RoundOff']:checked").val(),
                    "FREIGHTCHARGES": JewelleryTranscationView.variables.txtFreightCharges.option().value,
                    "ISFINALSUBMIT": 0,
                    "JT_ID": JewelleryTranscationView.variables.Masterid,
                    "oper": JewelleryTranscationView.variables.Oper,
                    "OPER_TYPE": "Item_Update_Parameter"
                }

                if (JewelleryTranscationView.variables.dx_ddlSubBookMaster.option().selectedItem.subbook == "Jewellery Export")
                    data.ISMIXEXPORT = JewelleryTranscationView.variables.dx_SwitchIsMixExport.option().value;

                if (JewelleryTranscationView.variables.dx_ddllocker.option().value)
                    data.LOCKERID = JewelleryTranscationView.variables.dx_ddllocker.option().value;

                if (JewelleryTranscationView.variables.dx_ddlBillingAddress.option().value) {
                    data.BILLINGADDRESSID = JewelleryTranscationView.variables.dx_ddlBillingAddress.option().value;
                }

                if (JewelleryTranscationView.variables.dx_ddlShippingAddress.option().value) {
                    data.SHIPPINGADDRESSID = JewelleryTranscationView.variables.dx_ddlShippingAddress.option().value;
                }

                if (JewelleryTranscationView.variables.dx_ddlBroker.option().value)
                    data.BROKERID = JewelleryTranscationView.variables.dx_ddlBroker.option().value;

                if (JewelleryTranscationView.variables.dx_ddlMRmCode.option().value)
                    data.MRMCODEID = JewelleryTranscationView.variables.dx_ddlMRmCode.option().value;

                if (JewelleryTranscationView.variables.dx_ddlMColor.option().value)
                    data.MRMCOLORID = JewelleryTranscationView.variables.dx_ddlMColor.option().value;

                if (JewelleryTranscationView.variables.dx_txtMRate.option().value)
                    data.MRATE = JewelleryTranscationView.variables.dx_txtMRate.option().value;

                if (JewelleryTranscationView.variables.dx_ddlDRmCode.option().value)
                    data.DRMCODEID = JewelleryTranscationView.variables.dx_ddlDRmCode.option().value;

                if (JewelleryTranscationView.variables.dx_ddlDColor.option().value)
                    data.DRMCOLORID = JewelleryTranscationView.variables.dx_ddlDColor.option().value;

                if (JewelleryTranscationView.variables.dx_ddlDPurity.option().value)
                    data.DRMPURITYID = JewelleryTranscationView.variables.dx_ddlDPurity.option().value;

                if (JewelleryTranscationView.variables.dx_ddlSRmCode.option().value)
                    data.SRMCODEID = JewelleryTranscationView.variables.dx_ddlSRmCode.option().value;

                if (JewelleryTranscationView.variables.dx_ddlSColor.option().value)
                    data.SRMCOLORID = JewelleryTranscationView.variables.dx_ddlSColor.option().value;

                if (JewelleryTranscationView.variables.dx_ddlSPurity.option().value)
                    data.SRMPURITYID = JewelleryTranscationView.variables.dx_ddlSPurity.option().value;

                if (JewelleryTranscationView.variables.dx_ddlLabourOn.option().value)
                    data.LABOURON = JewelleryTranscationView.variables.dx_ddlLabourOn.option().value;

                if (JewelleryTranscationView.variables.dx_txtLabourRate.option().value)
                    data.LABOURRATE = JewelleryTranscationView.variables.dx_txtLabourRate.option().value;

                if (JewelleryTranscationView.variables.dx_ddlLab.option().value)
                    data.LABID = JewelleryTranscationView.variables.dx_ddlLab.option().value;

                if (JewelleryTranscationView.variables.dx_txtCertiCharge.option().value)
                    data.CERTICHARGE = JewelleryTranscationView.variables.dx_txtCertiCharge.option().value;

                if (JewelleryTranscationView.variables.dx_txtHandlingRate.option().value)
                    data.HANDLINGRATE = JewelleryTranscationView.variables.dx_txtHandlingRate.option().value;

                if (JewelleryTranscationView.variables.dx_txtQty.option().value)
                    data.QTY = JewelleryTranscationView.variables.dx_txtQty.option().value;

                if (JewelleryTranscationView.variables.dx_txtRemark.option().value)
                    data.DESIGNREMARK = JewelleryTranscationView.variables.dx_txtRemark.option().value;

                if (JewelleryTranscationView.variables.dx_txtItemCate.option().value)
                    data.HSNCODEID = JewelleryTranscationView.variables.dx_txtItemCate.option().value;

                $.ajax({
                    url: getDomain() + JewelleryTranscationView.variables.PerformMasterOperationUrl,
                    data: data,
                    async: true,
                    cache: false,
                    type: 'POST',
                    success: function (data) {
                        if ($(data).find('RESPONSECODE').text() == "0") {
                            DevExVariables.Toaster("success", 'Records are Updated successfully.');
                            JewelleryTranscationView.variables.dx_dataGridItems.refresh();
                            JewelleryTranscationView.variables.dx_dataGridItems.clearSelection();
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

        JewelleryTranscationView.variables.dx_btnCancelPara = $("#dx_btnCancelPara").dxButton({
            icon: "close",
            text: "Cancel",
            type: "danger",
            validationGroup: "UpdateParameter",
            onClick: function (e) {
                DevExpress.validationEngine.resetGroup("UpdateParameter");

                $("#Modal_UpdateItems").modal("hide");
            }
        }).dxButton("instance");

        /*-----------------------fields for update design parameters------------------------*/

        JewelleryTranscationView.variables.dx_btnAddNew = $("#dx_btnAddNew").dxButton({
            stylingMode: "outlined",
            icon: "plus",
            text: "Add New",
            type: "default",
            validationGroup: "JewelleryTransaction",
            onClick: function (e) {
                $("#pnlView").hide();
                $("#frm_JewelleryTransaction").show();
                JewelleryTranscationView.variables.Masterid = "";
            }
        }).dxButton("instance");

        JewelleryTranscationView.variables.dx_btnSubmit = $("#dx_btnSubmit").dxButton({
            icon: "check",
            text: "Submit",
            type: "success",
            validationGroup: "JewelleryTransaction",
            onClick: function (e) {
                var validation = DevExpress.validationEngine.validateGroup("JewelleryTransaction");
                if (!validation.isValid) {
                    DevExVariables.Toaster("warning", "Please fill all required fields before submit.");
                    return;
                }

                if (JewelleryTranscationView.variables.dx_dataGridItems.getDataSource().items().length == 0) {
                    DevExVariables.Toaster("warning", "Please fill atleast one item before submit.");
                    return;
                }

                if (JewelleryTranscationView.variables.Masterid > 0) {
                    JewelleryTranscationView.variables.Oper = 'Edit';
                }
                else {
                    JewelleryTranscationView.variables.Oper = 'Add';
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
                    "SBOOKID": JewelleryTranscationView.variables.dx_ddlSubBookMaster.option().value,
                    "VOUCHERDATE": JewelleryTranscationView.variables.dx_txtVoucherDate.option().text,
                    //"LOCKERID": JewelleryTranscationView.variables.dx_ddllocker.option().value,
                    "VOUCHERTYPE": JewelleryTranscationView.variables.dx_ddlVoucherType.option().value,
                    "ACCID": JewelleryTranscationView.variables.dx_txtPartyName.option().selectedItem.accid,
                    "PARTYBILLNO": JewelleryTranscationView.variables.dx_txtPartyBillNo.option().value,
                    "SALESMANID": JewelleryTranscationView.variables.dx_ddlOrderby.option().value,
                    "DUEDAY": JewelleryTranscationView.variables.dx_txtDueDays.option().value,
                    "TAXPROFILEID": JewelleryTranscationView.variables.dx_TaxProfile.option().value,
                    "CURRENCYID": JewelleryTranscationView.variables.dx_ddlCurrencyName.option().value,
                    "EXCHANGERATE": JewelleryTranscationView.variables.dx_txtExchangeRate.option().value,
                    //"BILLINGADDRESSID": JewelleryTranscationView.variables.dx_ddlBillingAddress.option().value,
                    //"BILLADDR_NAME": JewelleryTranscationView.variables.dx_ddlBillingAddress.option().selectedItem.shipname,
                    //"BILLADDR_MOBNO": JewelleryTranscationView.variables.dx_ddlBillingAddress.option().selectedItem.shipmobileno,
                    //"BILLADDR_COUNTRY": JewelleryTranscationView.variables.dx_ddlBillingAddress.option().selectedItem.shipcountry,
                    //"BILLADDR_STATE": JewelleryTranscationView.variables.dx_ddlBillingAddress.option().selectedItem.shipstate,
                    //"BILLADDR_CITY": JewelleryTranscationView.variables.dx_ddlBillingAddress.option().selectedItem.shipcity,
                    //"BILLADDR_PINCODE": JewelleryTranscationView.variables.dx_ddlBillingAddress.option().selectedItem.shipzipecode,
                    //"BILLADDR_ADDRESS": JewelleryTranscationView.variables.dx_ddlBillingAddress.option().selectedItem.shipaddress,
                    //"BILLADDR_TYPE": JewelleryTranscationView.variables.dx_ddlBillingAddress.option().selectedItem.address_type_id,
                    //"BILLADDR_GSTNO": JewelleryTranscationView.variables.dx_ddlBillingAddress.option().selectedItem.gstno,
                    //"BILLADDR_PANNO": JewelleryTranscationView.variables.dx_ddlBillingAddress.option().selectedItem.panno,
                    //"SHIPPINGADDRESSID": JewelleryTranscationView.variables.dx_ddlShippingAddress.option().value,
                    //"SHIPADDR_NAME": JewelleryTranscationView.variables.dx_ddlShippingAddress.option().selectedItem.shipname,
                    //"SHIPADDR_MOBNO": JewelleryTranscationView.variables.dx_ddlShippingAddress.option().selectedItem.shipmobileno,
                    //"SHIPADDR_COUNTRY": JewelleryTranscationView.variables.dx_ddlShippingAddress.option().selectedItem.shipcountry,
                    //"SHIPADDR_STATE": JewelleryTranscationView.variables.dx_ddlShippingAddress.option().selectedItem.shipstate,
                    //"SHIPADDR_CITY": JewelleryTranscationView.variables.dx_ddlShippingAddress.option().selectedItem.shipcity,
                    //"SHIPADDR_PINCODE": JewelleryTranscationView.variables.dx_ddlShippingAddress.option().selectedItem.shipzipecode,
                    //"SHIPADDR_ADDRESS": JewelleryTranscationView.variables.dx_ddlShippingAddress.option().selectedItem.shipaddress,
                    //"SHIPADDR_TYPE": JewelleryTranscationView.variables.dx_ddlShippingAddress.option().selectedItem.address_type_id,
                    //"SHIPADDR_GSTNO": JewelleryTranscationView.variables.dx_ddlShippingAddress.option().selectedItem.gstno,
                    //"SHIPADDR_PANNO": JewelleryTranscationView.variables.dx_ddlShippingAddress.option().selectedItem.panno,

                    //"ISMIXEXPORT": JewelleryTranscationView.variables.dx_SwitchIsMixExport.option().value,
                    "ROUNDOFF": JewelleryTranscationView.variables.txtRoundOff.option().value || 0,
                    "ROUNDOFFTYPE": $("[name='rd_RoundOff']:checked").val(),
                    //"FREIGHTCHARGES": JewelleryTranscationView.variables.txtFreightCharges.option().value || 0,
                    "REMARKS": JewelleryTranscationView.variables.dx_txtRemarks.option().value,
                    //"BROKERID": JewelleryTranscationView.variables.dx_ddlBroker.option().value,
                    "BROKERAGE": JewelleryTranscationView.variables.dx_txtBrokerage.option().value || 0,
                    "ISFINALSUBMIT": 1,
                    "JT_ID": JewelleryTranscationView.variables.Masterid,
                    "oper": JewelleryTranscationView.variables.Oper,
                    "XMLPARAM": escape(xmlsaveFiles)
                }

                if (JewelleryTranscationView.variables.dx_ddlSubBookMaster.option().selectedItem.subbook == "Jewellery Export")
                    data.ISMIXEXPORT = JewelleryTranscationView.variables.dx_SwitchIsMixExport.option().value;

                if (JewelleryTranscationView.variables.dx_ddllocker.option().value)
                    data.LOCKERID = JewelleryTranscationView.variables.dx_ddllocker.option().value;

                if (JewelleryTranscationView.variables.dx_ddlBillingAddress.option().value) {
                    data.BILLINGADDRESSID = JewelleryTranscationView.variables.dx_ddlBillingAddress.option().value;
                }

                if (JewelleryTranscationView.variables.dx_ddlShippingAddress.option().value) {
                    data.SHIPPINGADDRESSID = JewelleryTranscationView.variables.dx_ddlShippingAddress.option().value;
                }

                if (JewelleryTranscationView.variables.dx_ddlBroker.option().value)
                    data.BROKERID = JewelleryTranscationView.variables.dx_ddlBroker.option().value;

                if (JewelleryTranscationView.variables.txtFreightCharges.option().value)
                    data.FREIGHTCHARGES = JewelleryTranscationView.variables.txtFreightCharges.option().value;

                $.ajax({
                    type: 'POST',
                    async: false,
                    cache: false,
                    url: getDomain() + "/Common/SaveImage",
                    data: {
                        category: 'JewelleryTransaction',
                        deletedfiles: JewelleryTranscationView.variables.deletedFiles,
                        savefiles: saveFiles
                    },
                    success: function (result) {
                    },
                    error: OnError
                });

                $.ajax({
                    url: getDomain() + JewelleryTranscationView.variables.PerformMasterOperationUrl,
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
                            JewelleryTranscationView.clearControls();
                            DevExVariables.Toaster("success", 'Record is Saved successfully.');
                        }
                        else {
                            DevExVariables.InvalidResponseCode(data);
                        }
                    },
                    error: OnError,
                });
            },
        }).dxButton("instance");

        JewelleryTranscationView.variables.dx_btnCancel = $("#dx_btnCancel").dxButton({
            icon: "close",
            text: "Cancel",
            type: "danger",
            validationGroup: "JewelleryTransaction",
            onClick: function (e) {
                JewelleryTranscationView.clearControls();
                //e.validationGroup.reset();
            }
        }).dxButton("instance");

        JewelleryTranscationView.variables.dx_btnRefreshGrid = $("#dx_btnRefreshGrid").dxButton({
            stylingMode: "outlined",
            icon: "refresh",
            //text: "Refresh",
            type: "default",
            validationGroup: "JewelleryTransaction",
            onClick: function (e) {
                JewelleryTranscationView.variables.dx_dataGrid.refresh();
            }
        }).dxButton("instance");

        JewelleryTranscationView.variables.dx_ddlSubBookMaster = $("#dx_ddlSubBookMaster").dxSelectBox({
            placeholder: "Select Sub Book...",
            searchEnabled: true,
            onItemClick: function (data) {
                if (JewelleryTranscationView.variables.dx_ddlSubBookMaster.option().selectedItem) {
                    if (['Jewellery Export'].indexOf(JewelleryTranscationView.variables.dx_ddlSubBookMaster.option().selectedItem.subbook) !== -1) {
                        JewelleryTranscationView.variables.dx_SwitchIsMixExport.option({ visible: true });
                        $("#MixExportLabel").html('Mix Export?');
                    }
                    else {
                        JewelleryTranscationView.variables.dx_SwitchIsMixExport.option({ visible: false });
                        $("#MixExportLabel").html('');
                    }
                }
            },
            onValueChanged: function (data) {
                if (JewelleryTranscationView.variables.dx_ddlSubBookMaster.option().selectedItem) {
                    if (['Jewellery Purchase', 'Jewellery Import'].indexOf(JewelleryTranscationView.variables.dx_ddlSubBookMaster.option().selectedItem.subbook) !== -1) {
                        JewelleryTranscationView.variables.dx_txtVoucherReturn.option({ disabled: true });
                        JewelleryTranscationView.variables.dx_ddlBillingAddress.option({ disabled: true });
                        JewelleryTranscationView.variables.dx_ddlShippingAddress.option({ disabled: true });
                        JewelleryTranscationView.variables.dx_ddlShippingAddress.option("value", "");
                        JewelleryTranscationView.variables.dx_ddlBillingAddress.option("value", "");
                        JewelleryTranscationView.variables.dx_ddllocker.option({ disabled: false });
                        JewelleryTranscationView.variables.dx_txtSearch.option({ visible: true });
                        JewelleryTranscationView.variables.dx_txtPrdSearch.option({ visible: false });
                        JewelleryTranscationView.variables.dx_btnUpdateItem.option({ visible: true });
                        JewelleryTranscationView.variables.dx_dataGridItems.columnOption("Size", "allowEditing", true);
                        JewelleryTranscationView.variables.dx_dataGridItems.columnOption("Edit", "visible", true);
                    }
                    else if (['Jewellery Sale', 'Jewellery Export', 'JEWELLERY APPROVAL'].indexOf(JewelleryTranscationView.variables.dx_ddlSubBookMaster.option().selectedItem.subbook) !== -1) {
                        JewelleryTranscationView.variables.dx_txtVoucherReturn.option({ disabled: true });
                        JewelleryTranscationView.variables.dx_dataGridItems.columnOption("Edit", "visible", false);
                        JewelleryTranscationView.variables.dx_dataGridItems.columnOption("Size", "allowEditing", false);
                        JewelleryTranscationView.variables.dx_txtPrdSearch.option({ visible: true });
                        JewelleryTranscationView.variables.dx_txtSearch.option({ visible: false });
                        JewelleryTranscationView.variables.dx_ddlBillingAddress.option({ disabled: false });
                        JewelleryTranscationView.variables.dx_ddlShippingAddress.option({ disabled: false });
                        JewelleryTranscationView.variables.dx_ddllocker.option({ disabled: true });
                    }
                    else if (['Jewellery Purchase Return'].indexOf(JewelleryTranscationView.variables.dx_ddlSubBookMaster.option().selectedItem.subbook) !== -1) {
                        JewelleryTranscationView.variables.dx_ddlBillingAddress.option({ disabled: true });
                        JewelleryTranscationView.variables.dx_ddlShippingAddress.option({ disabled: true });
                        JewelleryTranscationView.variables.dx_ddlShippingAddress.option("value", "");
                        JewelleryTranscationView.variables.dx_ddlBillingAddress.option("value", "");
                        JewelleryTranscationView.variables.dx_txtVoucherReturn.option({ disabled: false });
                        JewelleryTranscationView.variables.dx_dataGridItems.columnOption("Edit", "visible", false);
                        JewelleryTranscationView.variables.dx_dataGridItems.columnOption("Size", "allowEditing", false);
                        JewelleryTranscationView.variables.dx_ddllocker.option({ disabled: true });
                        JewelleryTranscationView.variables.dx_txtSearch.option({ visible: false });
                        JewelleryTranscationView.variables.dx_txtPrdSearch.option({ visible: false });
                        JewelleryTranscationView.variables.dx_btnUpdateItem.option({ visible: false });
                    }
                    else {
                        JewelleryTranscationView.variables.dx_txtVoucherReturn.option({ disabled: false });
                        JewelleryTranscationView.variables.dx_ddlBillingAddress.option({ disabled: false });
                        JewelleryTranscationView.variables.dx_ddlShippingAddress.option({ disabled: false });
                        JewelleryTranscationView.variables.dx_ddllocker.option({ disabled: true });
                        JewelleryTranscationView.variables.dx_txtSearch.option({ visible: false });
                        JewelleryTranscationView.variables.dx_txtPrdSearch.option({ visible: false });
                        JewelleryTranscationView.variables.dx_btnUpdateItem.option({ visible: false });
                        JewelleryTranscationView.variables.dx_dataGridItems.columnOption("Size", "allowEditing", false);
                        JewelleryTranscationView.variables.dx_dataGridItems.columnOption("Edit", "visible", false);
                    }
                }
            },
        }).dxValidator({
            validationGroup: "JewelleryTransaction",
            validationRules: [{
                type: "required",
                message: "Sub Book is required"
            }]
        }).dxSelectBox("instance");

        JewelleryTranscationView.variables.dx_ddlVoucherType = $("#dx_ddlVoucherType").dxSelectBox({
            dataSource: JewelleryTranscationView.variables.VoucherTypeList,
            value: JewelleryTranscationView.variables.VoucherTypeList[1],
            searchEnabled: true,
            onValueChanged: function (data) {
            }
        }).dxValidator({
            validationGroup: "JewelleryTransaction",
            validationRules: [{
                type: "required",
                message: "Voucher Type is required"
            }]
        }).dxSelectBox("instance");

        JewelleryTranscationView.variables.dx_txtVoucherReturn = $("#dx_txtVoucherReturn").dxAutocomplete({
            placeholder: "Search Voucher No...",
            mode: "search",
            dataSource: new DevExpress.data.CustomStore({
                load: function (loadOptions) {
                    if (JewelleryTranscationView.variables.dx_ddlSubBookMaster.option().value) {
                        var deferred = $.Deferred();
                        var url;
                        var myfilter = { rules: [] };
                        myfilter.rules.push({ field: "VOUCHERNO", op: "eq", data: loadOptions.searchValue });
                        var temp_subbook = ''
                        if (JewelleryTranscationView.variables.dx_ddlSubBookMaster.option().selectedItem.subbook == "Jewellery sale Return") {
                            temp_subbook = "Jewellery Sale"
                        }
                        else if (JewelleryTranscationView.variables.dx_ddlSubBookMaster.option().selectedItem.subbook == "Jewellery Purchase Return") {
                            temp_subbook = "Jewellery Purchase"
                        }
                        else if (JewelleryTranscationView.variables.dx_ddlSubBookMaster.option().selectedItem.subbook == "Jewellery Branch Transfer Return") {
                            temp_subbook = "Jewellery Branch Transfer"
                        }

                        if (temp_subbook) {
                            myfilter.rules.push({ field: "SUBBOOK", op: "eq", data: temp_subbook });
                        }

                        var result;
                        $.ajax({
                            url: getDomain() + JewelleryTranscationView.variables.BindMainGridListUrl + "&myfilters=" + JSON.stringify(myfilter),
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
                key: "jt_id",
            }),
            valueExpr: "voucherno",
            //onSelectionChanged: function (data) {
            //    if (JewelleryTranscationView.variables.EditFlag == 0) {
            //        if (data.selectedItem) {
            //        }
            //    }
            //}
            onItemClick: function (e) {
                if (e.component.option().selectedItem) {
                    JewelleryTranscationView.OnSelectVoucherReturn(e.component.option().selectedItem);
                }
            }
        }).dxValidator({
            validationGroup: "JewelleryTransaction",
            validationRules: []
        }).dxAutocomplete("instance");

        JewelleryTranscationView.variables.dx_TaxProfile = $("#dx_TaxProfile").dxSelectBox({
            placeholder: "Select Tax Profile...",
            searchEnabled: true,
            //onValueChanged: function (data) {
            //    if (data.value && JewelleryTranscationView.variables.Masterid > 0) {
            //        JewelleryTranscationView.updateTaxProfile();
            //    }
            //}
            onItemClick: function (e) {
                if (e.component.option().value && JewelleryTranscationView.variables.Masterid > 0) {
                    JewelleryTranscationView.updateTaxProfile();
                }
            }
        }).dxValidator({
            validationGroup: "JewelleryTransaction",
            validationRules: [{
                type: "required",
                message: "Tax Profile is required"
            }]
        }).dxSelectBox("instance");

        JewelleryTranscationView.variables.dx_txtVoucherDate = $("#dx_txtVoucherDate").dxDateBox({
            type: "date",
            value: new Date(),
            showClearButton: true,
            useMaskBehavior: true,
            displayFormat: "dd MMM yyyy",
        }).dxValidator({
            validationGroup: "JewelleryTransaction",
            validationRules: [{
                type: "required",
                message: "Voucher Date is required"
            }]
        }).dxDateBox("instance");

        JewelleryTranscationView.variables.dx_txtVoucherNo = $("#dx_txtVoucherNo").dxTextBox({
            readOnly: true,
        }).dxValidator({
            validationGroup: "JewelleryTransaction",
            validationRules: []
        }).dxTextBox("instance");

        JewelleryTranscationView.variables.dx_txtPartyName = $("#dx_txtPartyName").dxAutocomplete({
            placeholder: "Select Account...",
            mode: "search",
            dataSource: new DevExpress.data.CustomStore({
                load: function (loadOptions) {
                    var deferred = $.Deferred();

                    var myfilter = { rules: [] };
                    myfilter.rules.push({ field: "GROUPNAME", op: "eq", data: "Creditors/Debitors" });

                    $.ajax({
                        url: getDomain() + JewelleryTranscationView.variables.BindAccListUrl + "&_search=true&searchField=ACCOUNTNAME&searchOper=cn&searchString=" + loadOptions.searchValue + "&myfilters=" + JSON.stringify(myfilter),
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
                    JewelleryTranscationView.variables.PartyList_accid = data.selectedItem.accid;
                    JewelleryTranscationView.variables.dx_txtPartyCode.option({ value: data.selectedItem.partycode });
                    JewelleryTranscationView.variables.dx_TaxProfile.option({ value: data.selectedItem.taxprofileid });
                    JewelleryTranscationView.variables.dx_txtDueDays.option({ value: data.selectedItem.creditdays });
                    JewelleryTranscationView.variables.dx_ddlCurrencyName.option({ value: data.selectedItem.currencyid });
                    JewelleryTranscationView.BindAddressDetails(data.selectedItem.accid);
                    JewelleryTranscationView.variables.dx_ddlShippingAddress.option({ value: data.selectedItem.shippingid });
                    JewelleryTranscationView.variables.dx_ddlBillingAddress.option({ value: data.selectedItem.billingid });
                }
                else {
                    JewelleryTranscationView.variables.PartyList_accid = "";
                    JewelleryTranscationView.variables.dx_txtPartyCode.option("value", "");
                    JewelleryTranscationView.variables.dx_ddlCurrencyName.option("value", "");
                    JewelleryTranscationView.variables.dx_txtDueDays.option("value", "");
                    JewelleryTranscationView.variables.dx_TaxProfile.option("value", "");
                    JewelleryTranscationView.variables.dx_ddlShippingAddress.option("value", "");
                    JewelleryTranscationView.variables.dx_ddlBillingAddress.option("value", "");
                }

                if (JewelleryTranscationView.variables.dx_ddlSubBookMaster.option().selectedItem) {
                    if (['Jewellery Purchase'].indexOf(JewelleryTranscationView.variables.dx_ddlSubBookMaster.option().selectedItem.subbook) !== -1) {
                        JewelleryTranscationView.variables.dx_ddlShippingAddress.option("value", "");
                        JewelleryTranscationView.variables.dx_ddlBillingAddress.option("value", "");
                    }
                    else if (['Jewellery Purchase Return'].indexOf(JewelleryTranscationView.variables.dx_ddlSubBookMaster.option().selectedItem.subbook) !== -1) {
                        JewelleryTranscationView.variables.dx_ddlShippingAddress.option("value", "");
                        JewelleryTranscationView.variables.dx_ddlBillingAddress.option("value", "");
                    }
                    else {
                        JewelleryTranscationView.variables.dx_ddlBillingAddress.option({ disabled: false });
                        JewelleryTranscationView.variables.dx_ddlShippingAddress.option({ disabled: false });
                    }
                }
            },
            itemTemplate: function (data) {
                return $("<div class='product-name'>" + "(" + data.partycode + ")&nbsp;" + data.accountname + "</div>");
            },
        }).dxValidator({
            validationGroup: "JewelleryTransaction",
            validationRules: [{
                type: "required",
                message: "Party Name is required"
            }]
        }).dxAutocomplete("instance");

        JewelleryTranscationView.variables.dx_txtPartyCode = $("#dx_txtPartyCode").dxTextBox({
            readOnly: true,
            width: 90
        }).dxValidator({
            validationGroup: "JewelleryTransaction",
            validationRules: []
        }).dxTextBox("instance");

        JewelleryTranscationView.variables.dx_txtPartyBillNo = $("#dx_txtPartyBillNo").dxTextBox({
            mode: "text",
            placeholder: "Enter Party Bill No...",
        }).dxValidator({
            validationGroup: "JewelleryTransaction",
            validationRules: []
        }).dxTextBox("instance");

        JewelleryTranscationView.variables.dx_txtDueDays = $("#dx_txtDueDays").dxTextBox({
            mode: "number",
            value: 0,
            onValueChanged: function (data) {
                //if (data.value)
                //    JewelleryTranscationView.GetDueDate(data.value);
            }
        }).dxValidator({
            validationGroup: "JewelleryTransaction",
            validationRules: [{
                type: "required",
                message: "Due Days is required"
            }]
        }).dxTextBox("instance");

        JewelleryTranscationView.variables.dx_ddllocker = $("#dx_ddllocker").dxSelectBox({
            placeholder: "Select Locker...",
            searchEnabled: true,
            onValueChanged: function (data) {

            }
        }).dxValidator({
            validationGroup: "JewelleryTransaction",
            validationRules: [{
                type: "required",
                message: "Locker is required"
            }]
        }).dxSelectBox("instance");

        JewelleryTranscationView.variables.dx_SwitchIsMixExport = $("#dx_SwitchIsMixExport").dxSwitch({
            value: true,
            switchedOnText: "Yes",
            switchedOffText: "No"
        }).dxSwitch("instance");

        JewelleryTranscationView.variables.dx_ddlCurrencyName = $("#dx_ddlCurrencyName").dxSelectBox({
            disabled: true,
            placeholder: "Select Currency...",
            searchEnabled: true,
            onValueChanged: function (data) {
                if (JewelleryTranscationView.variables.dx_ddlCurrencyName.option().selectedItem) {
                    JewelleryTranscationView.variables.dx_txtExchangeRate.option({ value: JewelleryTranscationView.variables.dx_ddlCurrencyName.option().selectedItem.exchangerate });
                }
            }
        }).dxValidator({
            validationGroup: "JewelleryTransaction",
            validationRules: [{
                type: "required",
                message: "Currency is required"
            }]
        }).dxSelectBox("instance");

        JewelleryTranscationView.variables.dx_txtExchangeRate = $("#dx_txtExchangeRate").dxNumberBox({
            disabled: true,
            value: 1,
            min: 1,
            onValueChanged: function (data) {
                JewelleryTranscationView.OnChangeExchangeRate();
            }
        }).dxValidator({
            validationGroup: "JewelleryTransaction",
            validationRules: [{
                type: "required",
                message: "Exchange rate is required"
            }]
        }).dxNumberBox("instance");

        JewelleryTranscationView.variables.dx_ddlOrderby = $("#dx_ddlOrderby").dxSelectBox({
            placeholder: "Select User Name...",
            searchEnabled: true,
        }).dxValidator({
            validationGroup: "JewelleryTransaction",
            validationRules: [{
                type: "required",
                message: "Entry by name is required"
            }]
        }).dxSelectBox("instance");

        JewelleryTranscationView.variables.dx_ddlShippingAddress = $("#dx_ddlShippingAddress").dxSelectBox({
            placeholder: "Select Shipping Address...",
            searchEnabled: true,
            onValueChanged: function (data) {
                if (JewelleryTranscationView.variables.dx_ddlShippingAddress.option().selectedItem) {
                    //$("#lblSA_address").text(JewelleryTranscationView.variables.dx_ddlShippingAddress.option().selectedItem.shipaddress);
                    //$("#lblSA_country").text(JewelleryTranscationView.variables.dx_ddlShippingAddress.option().selectedItem.countryname);
                    //$("#lblSA_state").text(JewelleryTranscationView.variables.dx_ddlShippingAddress.option().selectedItem.statename);
                    //$("#lblSA_city").text(JewelleryTranscationView.variables.dx_ddlShippingAddress.option().selectedItem.cityname);
                }
            }
        }).dxValidator({
            //validationGroup: "JewelleryTransaction",
            validationRules: [{
                type: "required",
                message: "Shipping Address is required"
            }]
        }).dxSelectBox("instance");

        JewelleryTranscationView.variables.dx_ddlBillingAddress = $("#dx_ddlBillingAddress").dxSelectBox({
            placeholder: "Select Billing Address...",
            searchEnabled: true,
            onValueChanged: function (data) {
                if (JewelleryTranscationView.variables.dx_ddlBillingAddress.option().selectedItem) {
                    //$("#lblBA_address").text(JewelleryTranscationView.variables.dx_ddlBillingAddress.option().selectedItem.shipaddress);
                    //$("#lblBA_country").text(JewelleryTranscationView.variables.dx_ddlBillingAddress.option().selectedItem.countryname);
                    //$("#lblBA_state").text(JewelleryTranscationView.variables.dx_ddlBillingAddress.option().selectedItem.statename);
                    //$("#lblBA_city").text(JewelleryTranscationView.variables.dx_ddlBillingAddress.option().selectedItem.cityname);
                }
            }
        }).dxValidator({
            //validationGroup: "JewelleryTransaction",
            validationRules: [{
                type: "required",
                message: "Billing Address is required"
            }]
        }).dxSelectBox("instance");

        /*----------------------Add New Account Entry---------------------*/
        JewelleryTranscationView.variables.dx_txtAcc_Name = $("#dx_txtAcc_Name").dxTextBox({
            placeholder: "Enter Acc Name...",
            ShowModelErrors: true,
        }).dxValidator({
            validationGroup: "JewlleryTransaction",
            validationRules: [{
                type: "required",
                message: "Account name is required"
            }]
        }).dxTextBox("instance");

        JewelleryTranscationView.variables.dx_txtHeadName = $("#dx_txtHeadName").dxAutocomplete({
            placeholder: "Type Account Head...",
            dataSource: new DevExpress.data.CustomStore({
                load: function (loadOptions) {
                    var deferred = $.Deferred();

                    var myfilter = { rules: [] };
                    myfilter.rules.push({ field: "SEARCH", op: "eq", data: loadOptions.searchValue });
                    myfilter.rules.push({ field: "TYPE", op: "eq", data: "AccHead" });

                    var result;
                    $.ajax({
                        url: getDomain() + JewelleryTranscationView.variables.BindStaticDataUrl + "&myfilters=" + JSON.stringify(myfilter),
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
                    JewelleryTranscationView.GetSubHeadList(data.selectedItem.headid);
                else
                    JewelleryTranscationView.variables.dx_ddlSubHead.option({
                        dataSource: [],
                        displayExpr: "subhead",
                        valueExpr: "subheadid",
                    });
            },
            onFocusOut: function (data) {
                if (!data.component.option().selectedItem) {
                    JewelleryTranscationView.variables.dx_txtHeadName.option("value", "");
                }
            }
        }).dxValidator({
            validationGroup: "JewlleryTransaction",
            validationRules: [{
                type: "required",
                message: "Head name is required"
            }]
        }).dxAutocomplete("instance");

        JewelleryTranscationView.variables.dx_ddlSubHead = $("#dx_ddlSubHead").dxSelectBox({
            placeholder: "Select Sub Head...",
            searchEnabled: true,
            onValueChanged: function (data) {
            }
        }).dxValidator({
            validationGroup: "JewlleryTransaction",
            validationRules: [{
                type: "required",
                message: "Sub Head is required"
            }]
        }).dxSelectBox("instance");

        JewelleryTranscationView.variables.dx_txtMobileNo = $("#dx_txtMobileNo").dxTextBox({
            placeholder: "Enter Mobile No...",
        }).dxValidator({
            validationGroup: "JewlleryTransaction",
            validationRules: [{
                type: "required",
                message: "Mobile number is required"
            }]
        }).dxTextBox("instance");

        JewelleryTranscationView.variables.dx_ddlCountry = $("#dx_ddlCountry").dxSelectBox({
            placeholder: "Select Country...",
            searchEnabled: true,
            onValueChanged: function (data) {
                if (data.value)
                    JewelleryTranscationView.GetStatesList(data.value);
            }
        }).dxValidator({
            validationGroup: "JewlleryTransaction",
            validationRules: [{
                type: "required",
                message: "Country is required"
            }]
        }).dxSelectBox("instance");

        JewelleryTranscationView.variables.dx_ddlState = $("#dx_ddlState").dxSelectBox({
            placeholder: "Select State...",
            searchEnabled: true,
            onValueChanged: function (data) {
                if (data.value)
                    JewelleryTranscationView.GetCityList(data.value);
            }
        }).dxValidator({
            validationGroup: "JewlleryTransaction",
            validationRules: [{
                type: "required",
                message: "State is required"
            }]
        }).dxSelectBox("instance");

        JewelleryTranscationView.variables.dx_ddlCity = $("#dx_ddlCity").dxSelectBox({
            placeholder: "Select City...",
            searchEnabled: true,
        }).dxValidator({
            validationGroup: "JewlleryTransaction",
            validationRules: [{
                type: "required",
                message: "City is required"
            }]
        }).dxSelectBox("instance");

        JewelleryTranscationView.variables.dx_ddlCurrency = $("#dx_ddlCurrency").dxSelectBox({
            placeholder: "Select Currency...",
            searchEnabled: true,
        }).dxValidator({
            validationGroup: "JewlleryTransaction",
            validationRules: [{
                type: "required",
                message: "Currency is required"
            }]
        }).dxSelectBox("instance");

        JewelleryTranscationView.variables.dx_btnPartyAdd = $("#dx_btnPartyAdd").dxButton({
            stylingMode: "outlined",
            type: "Primary",
            icon: "plus",
            validationGroup: "JewlleryTransaction",
            onClick: function (e) {
                $("#Modal_PartyMaster").modal("show");
            }
        }).dxButton("instance");

        JewelleryTranscationView.variables.dx_Party_btnSubmit = $("#dx_Party_btnSubmit").dxButton({
            icon: "check",
            text: "Submit",
            type: "success",
            validationGroup: "JewlleryTransaction",
            onClick: function (e) {
                var validation = DevExpress.validationEngine.validateGroup("JewlleryTransaction");
                if (!validation.isValid) {
                    DevExVariables.Toaster("warning", "Please fill all required fields before submit.");
                    return;
                }
                JewelleryTranscationView.btnMasterSubmit_Party();
            }
        }).dxButton("instance");

        JewelleryTranscationView.variables.dx_Party_btnCancel = $("#dx_Party_btnCancel").dxButton({
            icon: "close",
            text: "Cancel",
            type: "danger",
            validationGroup: "JewlleryTransaction",
            onClick: function (e) {
                $("#Modal_PartyMaster").modal("hide");
                //e.validationGroup.reset();
                DevExpress.validationEngine.resetGroup("JewlleryTransaction");
            }
        }).dxButton("instance");

        /*-------Start Bottom Left controls-------------------------------------*/
        JewelleryTranscationView.variables.dx_ddlBroker = $("#dx_ddlBroker").dxSelectBox({
            placeholder: "Select Broker Name...",
            searchEnabled: true,
        }).dxValidator({
            validationGroup: "JewelleryTransaction",
            validationRules: [{
                type: "required",
                message: "Broker is required"
            }]
        }).dxSelectBox("instance");

        JewelleryTranscationView.variables.dx_txtBrokerage = $("#dx_txtBrokerage").dxNumberBox({
            min: 0,
        }).dxValidator({
            validationGroup: "JewelleryTransaction",
            validationRules: []
        }).dxNumberBox("instance");

        JewelleryTranscationView.variables.dx_txtRemarks = $("#dx_txtRemarks").dxTextArea({
            height: 160,
            placeholder: "Enter Note"
        }).dxValidator({
            validationGroup: "JewelleryTransaction",
            validationRules: []
        }).dxTextArea("instance");

        /*-------Start Bottom Right controls-------------------------------------*/
        JewelleryTranscationView.variables.txtFreightCharges = $("#txtFreightCharges").dxNumberBox({
            min: 0,
            value: 0,
            inputAttr: {
                class: "text-right"
            },
            onValueChanged: function (data) {
                //if (data.value)
                //    JewelleryTranscationView.CalcTotalWgts();
            }
        }).dxValidator({
            validationGroup: "JewelleryTransaction",
            validationRules: []
        }).dxNumberBox("instance");

        JewelleryTranscationView.variables.txtTaxableAmount = $("#txtTaxableAmount").dxNumberBox({
            readOnly: true,
            inputAttr: {
                class: "text-right"
            },
        }).dxValidator({
            validationGroup: "JewelleryTransaction",
            validationRules: []
        }).dxNumberBox("instance");

        JewelleryTranscationView.variables.txtAmount = $("#txtAmount").dxNumberBox({
            readOnly: true,
            inputAttr: {
                class: "text-right"
            },
        }).dxValidator({
            validationGroup: "JewelleryTransaction",
            validationRules: []
        }).dxNumberBox("instance");

        JewelleryTranscationView.variables.txtRoundOff = $("#txtRoundOff").dxNumberBox({
            readOnly: true,
            inputAttr: {
                class: "text-right"
            },
        }).dxValidator({
            validationGroup: "JewelleryTransaction",
            validationRules: []
        }).dxNumberBox("instance");

        JewelleryTranscationView.variables.txtTotalAmount = $("#txtTotalAmount").dxNumberBox({
            readOnly: true,
            inputAttr: {
                class: "text-right"
            },
        }).dxValidator({
            validationGroup: "JewelleryTransaction",
            validationRules: []
        }).dxNumberBox("instance");

        JewelleryTranscationView.variables.txtTotalAmountInRs = $("#txtTotalAmountInRs").dxNumberBox({
            readOnly: true,
            inputAttr: {
                class: "text-right"
            },
        }).dxValidator({
            validationGroup: "JewelleryTransaction",
            validationRules: []
        }).dxNumberBox("instance");
        /*-------End Bottom Right controls-------------------------------------*/

        JewelleryTranscationView.variables.dx_ddlcourier = $("#dx_ddlcourier").dxSelectBox({
            //dataSource: ['1', '2'],
            placeholder: "Select Courier...",
            searchEnabled: true,
        }).dxValidator({
            validationGroup: "ShipInfo",
            validationRules: []
        }).dxSelectBox("instance");

        JewelleryTranscationView.variables.dx_txtPortCode = $("#dx_txtPortCode").dxTextBox({
            placeholder: "Enter Port Code...",
            ShowModelErrors: true,
        }).dxValidator({
            validationGroup: "ShipInfo",
            validationRules: [{
                type: "required",
                message: "Port Code is required"
            }]
        }).dxTextBox("instance");

        JewelleryTranscationView.variables.dx_txtShipBillNo = $("#dx_txtShipBillNo").dxTextBox({
            placeholder: "Enter Shipping Bill no...",
            ShowModelErrors: true,
        }).dxValidator({
            validationGroup: "ShipInfo",
            validationRules: [{
                type: "required",
                message: "Shipping Bill no is required"
            }]
        }).dxTextBox("instance");

        JewelleryTranscationView.variables.dx_dtShipDate = $("#dx_dtShipDate").dxDateBox({
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

        JewelleryTranscationView.variables.dx_Ship_btnSubmit = $("#dx_Ship_btnSubmit").dxButton({
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

                JewelleryTranscationView.btnMasterSubmit_Shipping();
            }
        }).dxButton("instance");

        JewelleryTranscationView.variables.dx_Ship_btnCancel = $("#dx_Ship_btnCancel").dxButton({
            icon: "close",
            text: "Cancel",
            type: "danger",
            validationGroup: "ShipInfo",
            onClick: function (e) {
                $("#Modal_ShipInfo").modal("hide");
                //e.validationGroup.reset();
                DevExpress.validationEngine.resetGroup("ShipInfo");
                JewelleryTranscationView.variables.dx_dtShipDate.option({ value: new Date() });
            }
        }).dxButton("instance");

        JewelleryTranscationView.variables.dx_txtTrackingNo = $("#dx_txtTrackingNo").dxTextBox({
            placeholder: "Enter Tracking no...",
            ShowModelErrors: true,
        }).dxValidator({
            validationGroup: "ShipInfo",
            validationRules: [{
                type: "required",
                message: "Tracking no is required"
            }]
        }).dxTextBox("instance");

        JewelleryTranscationView.variables.dx_txtTrackingLink = $("#dx_txtTrackingLink").dxTextBox({
            placeholder: "Enter Tracking Link...",
            ShowModelErrors: true,
        }).dxValidator({
            validationGroup: "ShipInfo",
            validationRules: [{
                type: "required",
                message: "Tracking Link is required"
            }]
        }).dxTextBox("instance");

        /*-------Start Detailgrid textbox-------------------------------------*/
        JewelleryTranscationView.variables.dx_btnUpdateItem = $("#dx_btnUpdateItem").dxDropDownButton({
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
            visible: true
        }).dxDropDownButton("instance");

        JewelleryTranscationView.variables.dx_btnRemoveItem = $("#dx_btnRemoveItem").dxButton({
            icon: "trash",
            text: "Remove",
            type: "danger",
            disabled: true,
            onClick: function (e) {

                JewelleryTranscationView.variables.dx_popupItemRemove.show();
            }
        }).dxButton("instance");

        JewelleryTranscationView.variables.dx_txtSearch = $("#dx_txtSearch").dxAutocomplete({
            placeholder: "Search Design Code, Category, Ref Code ...",
            mode: "search",
            dataSource: new DevExpress.data.CustomStore({
                load: function (loadOptions) {
                    var validation = DevExpress.validationEngine.validateGroup("JewelleryTransaction");
                    if (!validation.isValid) {
                        DevExVariables.Toaster("warning", "Please fill all required fields before add designs.");
                        return;
                    }

                    var deferred = $.Deferred();
                    var url;
                    var myfilter = { rules: [] };

                    myfilter.rules.push({ field: "SEARCH", op: "eq", data: loadOptions.searchValue });
                    myfilter.rules.push({ field: "ISACTIVE", op: "eq", data: true });
                    myfilter.rules.push({ field: "STATUS", op: "eq", data: "AVAILABLE" });

                    var result;
                    $.ajax({
                        url: getDomain() + "/Common/BindMastersDetails?ServiceName=PRD_DESIGN_MASTER_GET&ColumnRequested=DM_ID,DESIGNCODE,IMGPATH_THUMB" + "&myfilters=" + JSON.stringify(myfilter),
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
                    JewelleryTranscationView.AddNewItemToJewellery(data.selectedItem.dm_id);
                }
                else {
                    JewelleryTranscationView.variables.dx_txtSearch.option("value", "");
                }
            },
            onFocusOut: function (data) {
                if (!data.component.option().selectedItem) {
                    JewelleryTranscationView.variables.dx_txtSearch.option("value", "");
                }
            },
            itemTemplate: function (data) {
                return $("<div class='custom-item'>" +
                        "<img  src='" + data.imgpath_thumb + "' />" +
                        "<div class='product-name'>" + data.designcode + "</div></div>");
            },
            visible: true
        }).dxValidator({
            validationGroup: "JewelleryTransaction",
            validationRules: []
        }).dxAutocomplete("instance");

        JewelleryTranscationView.variables.dx_txtPrdSearch = $("#dx_txtPrdSearch").dxAutocomplete({
            placeholder: "Search Bag Number...",
            mode: "search",
            dataSource: new DevExpress.data.CustomStore({
                load: function (loadOptions) {
                    var validation = DevExpress.validationEngine.validateGroup("JewelleryTransaction");
                    if (!validation.isValid) {
                        DevExVariables.Toaster("warning", "Please fill all required fields before add designs.");
                        return;
                    }

                    var deferred = $.Deferred();
                    var url;
                    var myfilter = { rules: [] };

                    myfilter.rules.push({ field: "SEARCH", op: "eq", data: loadOptions.searchValue });
                    myfilter.rules.push({ field: "STATUS", op: "eq", data: "AVAILABLE" });

                    var result;
                    $.ajax({
                        url: getDomain() + JewelleryTranscationView.variables.BindPrdListUrl + "&myfilters=" + JSON.stringify(myfilter),
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
                key: "pm_id",
            }),
            valueExpr: "bagno",
            onSelectionChanged: function (data) {
                if (data.selectedItem) {
                    JewelleryTranscationView.AddNewItemToJewellery(data.selectedItem.pm_id);
                }
                else {
                    JewelleryTranscationView.variables.dx_txtPrdSearch.option("value", "");
                }
            },
            onFocusOut: function (data) {
                if (!data.component.option().selectedItem) {
                    JewelleryTranscationView.variables.dx_txtPrdSearch.option("value", "");
                }
            },
            itemTemplate: function (data) {
                return $("<div class='custom-item'>" +
                        "<img  src='" + data.imgpath_thumb + "' />" +
                        "<div class='product-name'>" + data.bagno + "</div></div>");
            },
            visible: false
        }).dxValidator({
            validationGroup: "JewelleryTransaction",
            validationRules: []
        }).dxAutocomplete("instance");

        JewelleryTranscationView.variables.dx_btnSaveReturnItems = $("#dx_btnSaveReturnItems").dxButton({
            icon: "check",
            text: "Add",
            type: "success",
            onClick: function (e) {
                var SelectedItemList = [];
                SelectedItemList = JewelleryTranscationView.variables.dx_dataGridReturnItems.option().selectedRowKeys;

                if (SelectedItemList.length == 0) {
                    DevExVariables.Toaster("warning", "Please select atleast one item to Add.");
                    return;
                }

                if (JewelleryTranscationView.variables.Masterid > 0) {
                    JewelleryTranscationView.variables.Oper = 'Edit';
                }
                else {
                    JewelleryTranscationView.variables.Oper = 'Add';
                }

                var data = {
                    "SELECTEDRETURNITEMS": SelectedItemList.toString(),
                    "SBOOKID": JewelleryTranscationView.variables.dx_ddlSubBookMaster.option().value,
                    "VOUCHERDATE": JewelleryTranscationView.variables.dx_txtVoucherDate.option().text,
                    //"LOCKERID": JewelleryTranscationView.variables.dx_ddllocker.option().value,
                    "RETURNFROMJT_ID": JewelleryTranscationView.variables.dx_txtVoucherReturn.option().selectedItem.jt_id,
                    "RETURNFROMVOUCHERNO": JewelleryTranscationView.variables.dx_txtVoucherReturn.option().selectedItem.voucherno,
                    "VOUCHERTYPE": JewelleryTranscationView.variables.dx_ddlVoucherType.option().value,
                    "ACCID": JewelleryTranscationView.variables.dx_txtPartyName.option().selectedItem.accid,
                    "PARTYBILLNO": JewelleryTranscationView.variables.dx_txtPartyBillNo.option().value,
                    "SALESMANID": JewelleryTranscationView.variables.dx_ddlOrderby.option().value,
                    "DUEDAY": JewelleryTranscationView.variables.dx_txtDueDays.option().value,
                    "TAXPROFILEID": JewelleryTranscationView.variables.dx_TaxProfile.option().value,
                    "CURRENCYID": JewelleryTranscationView.variables.dx_ddlCurrencyName.option().value,
                    "EXCHANGERATE": JewelleryTranscationView.variables.dx_txtExchangeRate.option().value,
                    "ROUNDOFF": JewelleryTranscationView.variables.txtRoundOff.option().value || 0,
                    "ROUNDOFFTYPE": $("[name='rd_RoundOff']:checked").val(),
                    "FREIGHTCHARGES": JewelleryTranscationView.variables.txtFreightCharges.option().value || 0,
                    "REMARKS": JewelleryTranscationView.variables.dx_txtRemarks.option().value,
                    //"BROKERID": JewelleryTranscationView.variables.dx_ddlBroker.option().value,
                    "BROKERAGE": JewelleryTranscationView.variables.dx_txtBrokerage.option().value || 0,
                    "VIRTUALFILENAME": $("#lnkCADFilePreview").attr("href"),
                    "ACTUALFILENAME": $("#lnkCADFilePreview").html(),
                    "ISFINALSUBMIT": 0,
                    "JT_ID": JewelleryTranscationView.variables.Masterid,
                    "oper": JewelleryTranscationView.variables.Oper,
                    "OPER_TYPE": "Item_Add"
                }
                if (JewelleryTranscationView.variables.dx_ddlSubBookMaster.option().selectedItem.subbook == "Jewellery Export")
                    data.ISMIXEXPORT = JewelleryTranscationView.variables.dx_SwitchIsMixExport.option().value;

                if (JewelleryTranscationView.variables.dx_ddllocker.option().value)
                    data.LOCKERID = JewelleryTranscationView.variables.dx_ddllocker.option().value;

                if (JewelleryTranscationView.variables.dx_ddlBillingAddress.option().value) {
                    data.BILLINGADDRESSID = JewelleryTranscationView.variables.dx_ddlBillingAddress.option().value;
                }

                if (JewelleryTranscationView.variables.dx_ddlShippingAddress.option().value) {
                    data.SHIPPINGADDRESSID = JewelleryTranscationView.variables.dx_ddlShippingAddress.option().value;
                }

                if (JewelleryTranscationView.variables.dx_ddlBroker.option().value)
                    data.BROKERID = JewelleryTranscationView.variables.dx_ddlBroker.option().value;

                $.ajax({
                    url: getDomain() + JewelleryTranscationView.variables.PerformMasterOperationUrl,
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
                            DevExVariables.Toaster("success", 'Item is Addded successfully');
                            if (JewelleryTranscationView.variables.Oper == 'Add') {
                                JewelleryTranscationView.variables.Masterid = $(data).find('JT_ID').text();
                                JewelleryTranscationView.variables.dx_txtVoucherNo.option({ value: $(data).find('VOUCHERNO').text() });
                                $("#AttachmentsList").show();
                            }
                            $("#modal_ReturnItems").modal("hide");
                            JewelleryTranscationView.variables.dx_ddlSubBookMaster.option({ disabled: true });
                            JewelleryTranscationView.variables.dx_txtVoucherReturn.option({ disabled: true });
                            JewelleryTranscationView.variables.dx_dataGridReturnItems.clearSelection();
                            JewelleryTranscationView.variables.dx_dataGridItems.refresh();
                        }
                        else {
                            DevExVariables.InvalidResponseCode(data);
                        }
                    },
                    error: OnError,
                });
            }
        }).dxButton("instance");

        JewelleryTranscationView.variables.dx_btnCancelReturnItems = $("#dx_btnCancelReturnItems").dxButton({
            icon: "close",
            text: "Cancel",
            type: "danger",
            onClick: function (e) {
                JewelleryTranscationView.variables.dx_dataGridReturnItems.clearSelection();
                $("#modal_ReturnItems").modal("hide");
            }
        }).dxButton("instance");


        //----------------Start Share Model Controls------------------------------------
        JewelleryTranscationView.variables.dx_txtSharetoPartyList = $("#dx_txtSharetoPartyList").dxAutocomplete({
            placeholder: "Select Party Name...",
            mode: "search",
            dataSource: new DevExpress.data.CustomStore({
                load: function (loadOptions) {
                    var deferred = $.Deferred();
                    $.ajax({
                        url: getDomain() + JewelleryTranscationView.variables.BindAccListUrl + "&_search=true&searchField=ACCOUNTNAME&searchOper=cn&searchString=" + loadOptions.searchValue,
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
                    JewelleryTranscationView.variables.dx_txtSharingEmailId.option({ value: data.selectedItem.emailid });
                    JewelleryTranscationView.variables.dx_txtVoucherMobileNo.option({ value: data.selectedItem.mobile1 });

                }
                else {
                    JewelleryTranscationView.variables.dx_txtSharingEmailId.option("value", "");
                    JewelleryTranscationView.variables.dx_txtVoucherMobileNo.option("value", "");
                }
            }
        }).dxAutocomplete("instance");

        JewelleryTranscationView.variables.dx_btnSubmitShare = $("#dx_btnSubmitShare").dxButton({
            stylingMode: "outlined",
            icon: "fa fa-paper-plane",
            text: "Send",
            type: "default",
            useSubmitBehavior: false,
            visible: true,
            onClick: function (e) {
                JewelleryTranscationView.SharingDetails();
            }
        }).dxButton("instance");

        JewelleryTranscationView.variables.dx_RadioSocial = $("#dx_RadioSocial").dxRadioGroup({
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

        JewelleryTranscationView.variables.dx_txtVoucherMobileNo = $("#dx_txtVoucherMobileNo").dxTextBox({ mode: "number" }).dxTextBox("instance");

        JewelleryTranscationView.variables.dx_txtShareMessage = $("#dx_txtShareMessage").dxTextArea({
            height: 90,
            value: 'Dear sir, Some Jewellery Designs are shared by Trinity Jewells with you. Kindly click on below URL to view shared Designs. {SHARE URL}',
        }).dxTextArea("instance");

        JewelleryTranscationView.variables.dx_txtSharingSubject = $("#dx_txtSharingSubject").dxTextBox({
            value: "Jewellery Designs shared by TrinityJewells"
        }).dxTextBox("instance");

        JewelleryTranscationView.variables.dx_txtSharingEmailId = $("#dx_txtSharingEmailId").dxTextBox({ placeholder: "Enter Email Id..." }).dxTextBox("instance");

        JewelleryTranscationView.variables.dx_txtSharingEmailBody = $("#dx_txtSharingEmailBody").dxHtmlEditor({
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
            value: JewelleryTranscationView.variables.content,
            onValueChanged: function (e) {
                //$(".value-content").text(e.component.option("value"));
            }
        }).dxHtmlEditor("instance");
        //----------------End Share Model Controls--------------------------------------

    },

    GetGridDetails: function (container, options) {
        var myfilter = { rules: [] };
        myfilter.rules.push({ field: "JI_ID", op: "eq", data: options.key });
        var List = [];

        $.ajax({
            url: getDomain() + JewelleryTranscationView.variables.BindJewelleryDesignDetailsUrl + "&myfilters=" + JSON.stringify(myfilter),
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
                { dataField: "lenghtmmsize", caption: "Length", alignment: "right", visible: false },
                { dataField: "widthmmsize", caption: "Width", alignment: "right", visible: false },
                { dataField: "charni", caption: "Charni" },
                { dataField: "pieces", caption: "Pcs", alignment: "right" },
                { dataField: "weight", caption: "Wgt", alignment: "right" },
                { dataField: "rate", caption: "Rate", alignment: "right" },
                { dataField: "amount", caption: "Amount", alignment: "right" },
            ],
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

    AddNewLineDetails: function (obj) {
        var postfix = JewelleryTranscationView.variables.RowCount;

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
                        + '<span class="btn btn-danger" onClick="JewelleryTranscationView.RemoveDetailRow(this)"><i class="fa fa-trash-o"></i></span>'
                    + '</td>'
                + '</tr>'
            );

        /*----------------------Registration of Detail table controls---------------------*/
        JewelleryTranscationView.DetailTableFormInit(postfix, obj);
        /*----------------------Registration of Detail table controls---------------------*/

        JewelleryTranscationView.variables.RowCount = postfix + 1;
    },

    clearControlsForItemDetails: function () {
        $("#tbl_DesignDetails tbody").html("");
        JewelleryTranscationView.variables.RowCount = 1;
        JewelleryTranscationView.variables.DetailsControlsList = [];
        JewelleryTranscationView.variables.JI_ID = "";
    },

    AddNewItemToJewellery: function (key) {
        if (JewelleryTranscationView.variables.Masterid > 0) {
            JewelleryTranscationView.variables.Oper = 'Edit';
        }
        else {
            JewelleryTranscationView.variables.Oper = 'Add';
        }

        var data = {
            "SBOOKID": JewelleryTranscationView.variables.dx_ddlSubBookMaster.option().value,
            //"VOUCHERNO": JewelleryTranscationView.variables.dx_txtVoucherNo.option().text,
            //"VOUCHERRETURN": JewelleryTranscationView.variables.dx_txtVoucherReturn.option().value,
            "DUEDAY": JewelleryTranscationView.variables.dx_txtDueDays.option().value,
            "VOUCHERTYPE": JewelleryTranscationView.variables.dx_ddlVoucherType.option().value,
            "VOUCHERDATE": JewelleryTranscationView.variables.dx_txtVoucherDate.option().text,
            "SALESMANID": JewelleryTranscationView.variables.dx_ddlOrderby.option().value,
            "TAXPROFILEID": JewelleryTranscationView.variables.dx_TaxProfile.option().value,
            //"LOCKERID": JewelleryTranscationView.variables.dx_ddllocker.option().value,
            "ACCID": JewelleryTranscationView.variables.dx_txtPartyName.option().selectedItem.accid,
            "PARTYBILLNO": JewelleryTranscationView.variables.dx_txtPartyBillNo.option().value,
            "CURRENCYID": JewelleryTranscationView.variables.dx_ddlCurrencyName.option().value,
            "EXCHANGERATE": JewelleryTranscationView.variables.dx_txtExchangeRate.option().value,
            "BROKERAGE": JewelleryTranscationView.variables.dx_txtBrokerage.option().value || 0,
            "NOTES": JewelleryTranscationView.variables.dx_txtRemarks.option().value,
            "ROUNDOFF": JewelleryTranscationView.variables.txtRoundOff.option().value || 0,
            "ROUNDOFFTYPE": $("[name='rd_RoundOff']:checked").val(),
            "FREIGHTCHARGES": JewelleryTranscationView.variables.txtFreightCharges.option().value || 0,
            "ISFINALSUBMIT": 0,
            //"DESIGNCODEID": key,
            "JT_ID": JewelleryTranscationView.variables.Masterid,
            "oper": JewelleryTranscationView.variables.Oper,
            "OPER_TYPE": "Item_Add"
        }

        if (JewelleryTranscationView.variables.dx_ddlSubBookMaster.option().selectedItem.subbook == "Jewellery Export")
            data.ISMIXEXPORT = JewelleryTranscationView.variables.dx_SwitchIsMixExport.option().value;

        if (JewelleryTranscationView.variables.dx_ddlSubBookMaster.option().selectedItem.subbook == 'Jewellery Purchase')
            data.DESIGNCODEID = key;
        else
            data.PM_ID = key;

        if (JewelleryTranscationView.variables.dx_ddllocker.option().value)
            data.LOCKERID = JewelleryTranscationView.variables.dx_ddllocker.option().value;

        if (JewelleryTranscationView.variables.dx_ddlBillingAddress.option().value) {
            data.BILLINGADDRESSID = JewelleryTranscationView.variables.dx_ddlBillingAddress.option().value;
        }

        if (JewelleryTranscationView.variables.dx_ddlShippingAddress.option().value) {
            data.SHIPPINGADDRESSID = JewelleryTranscationView.variables.dx_ddlShippingAddress.option().value;
        }

        if (JewelleryTranscationView.variables.dx_ddlBroker.option().value)
            data.BROKERID = JewelleryTranscationView.variables.dx_ddlBroker.option().value;

        $.ajax({
            url: getDomain() + JewelleryTranscationView.variables.PerformMasterOperationUrl,
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
                    if (JewelleryTranscationView.variables.Oper == 'Add') {
                        JewelleryTranscationView.variables.Masterid = $(data).find('JT_ID').text();
                        JewelleryTranscationView.variables.dx_txtVoucherNo.option({ value: $(data).find('VOUCHERNO').text() });
                        $("#AttachmentsList").show();
                    }
                    JewelleryTranscationView.variables.dx_txtSearch.option({ value: "" });
                    JewelleryTranscationView.variables.dx_txtPrdSearch.option({ value: "" });
                    JewelleryTranscationView.variables.dx_dataGridItems.refresh();
                }
                else {
                    DevExVariables.InvalidResponseCode(data);
                }
            },
            error: OnError,
        });
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
            if (JewelleryTranscationView.variables.DetailsControlsList[index].dx_txtItemName.option().selectedItem) {
                RmCate = JewelleryTranscationView.variables.DetailsControlsList[index].dx_txtItemName.option().selectedItem.rmcate;

                if (RmCate == "GEMS") {
                    TotalDiaPcs += +JewelleryTranscationView.variables.DetailsControlsList[index].dx_txtPieces.option().value;
                    TotalDiaCts += +JewelleryTranscationView.variables.DetailsControlsList[index].dx_txtWeight.option().value;
                }

                if (RmCate == "METAL") {
                    touch = +JewelleryTranscationView.variables.DetailsControlsList[index].dx_txtItemName.option().selectedItem.purityper;
                    TotalNetWgt += +JewelleryTranscationView.variables.DetailsControlsList[index].dx_txtWeight.option().value;
                    TotalFineWgt += (+JewelleryTranscationView.variables.DetailsControlsList[index].dx_txtWeight.option().value * touch / 100);
                }
            }
        });

        TotalGrossWgt = TotalNetWgt + (TotalDiaCts * 0.2);

        JewelleryTranscationView.variables.dx_txtDiaPcs.option("value", TotalDiaPcs);
        JewelleryTranscationView.variables.dx_txtDiaCrt.option("value", parseFloat(TotalDiaCts).toFixed(3));
        JewelleryTranscationView.variables.dx_txtNetWgt.option("value", parseFloat(TotalNetWgt).toFixed(3));
        JewelleryTranscationView.variables.dx_txtGrossWgt.option("value", parseFloat(TotalGrossWgt).toFixed(3));
        JewelleryTranscationView.variables.dx_txtFineWgt.option("value", parseFloat(TotalFineWgt).toFixed(3));
    },

    RemoveDetailRow: function (obj) {
        $(obj).closest("tr").remove();
        delete JewelleryTranscationView.variables.DetailsControlsList[$(obj).closest("tr").attr("rowno")];

        JewelleryTranscationView.CalcTotalWgts();
    },

    BindSubBookList: function () {
        var myfilter = { rules: [] };
        myfilter.rules.push({ field: "TYPE", op: "eq", data: "AccSubBook" });
        myfilter.rules.push({ field: "SUBBOOKTYPE", op: "eq", data: "FINISHED" });
        myfilter.rules.push({ field: "ONLYALLOWED", op: "eq", data: true });

        $.ajax({
            url: getDomain() + JewelleryTranscationView.variables.BindStaticDataUrl + "&myfilters=" + JSON.stringify(myfilter),
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

                        JewelleryTranscationView.variables.dx_ddlSubBookMaster.option({
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
            url: getDomain() + JewelleryTranscationView.variables.BindLockerList + "&IsRecordAll=true&myfilters=" + JSON.stringify(myfilter),
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

                        JewelleryTranscationView.variables.dx_ddllocker.option({
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
            url: getDomain() + JewelleryTranscationView.variables.BindTaxProfile + "&IsRecordAll=true&myfilters=" + JSON.stringify(myfilter),
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

                        JewelleryTranscationView.variables.dx_TaxProfile.option({
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
            url: getDomain() + JewelleryTranscationView.variables.BindCurrencyList,
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

                        JewelleryTranscationView.variables.dx_ddlCurrencyName.option({
                            dataSource: new DevExpress.data.ArrayStore({
                                data: List,
                                key: "currencyid"
                            }),
                            displayExpr: "currencycode",
                            valueExpr: "currencyid"
                        });

                        JewelleryTranscationView.variables.dx_ddlCurrency.option({
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
            url: getDomain() + JewelleryTranscationView.variables.BindAccListUrl + "&myfilters=" + JSON.stringify(myfilter),
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

                        JewelleryTranscationView.variables.dx_ddlOrderby.option({
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
            url: getDomain() + JewelleryTranscationView.variables.BindPartyAddress + "&IsRecordAll=true&myfilters=" + JSON.stringify(myfilter),
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

                        JewelleryTranscationView.variables.dx_ddlBillingAddress.option({
                            dataSource: new DevExpress.data.ArrayStore({
                                data: List,
                                key: "accountmaster_shipinginfoid"
                            }),
                            displayExpr: "shipaddress",
                            valueExpr: "accountmaster_shipinginfoid"
                        });
                        JewelleryTranscationView.variables.dx_ddlShippingAddress.option({
                            dataSource: new DevExpress.data.ArrayStore({
                                data: List,
                                key: "accountmaster_shipinginfoid"
                            }),
                            displayExpr: "shipaddress",
                            valueExpr: "accountmaster_shipinginfoid"
                        });
                    }
                    else {
                        JewelleryTranscationView.variables.dx_ddlBillingAddress.option({
                            dataSource: new DevExpress.data.ArrayStore({
                                data: [],
                                key: "accountmaster_shipinginfoid"
                            }),
                            displayExpr: "shipaddress",
                            valueExpr: "accountmaster_shipinginfoid"
                        });
                        JewelleryTranscationView.variables.dx_ddlShippingAddress.option({
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
            url: getDomain() + JewelleryTranscationView.variables.BindStaticDataUrl + "&myfilters=" + JSON.stringify(myfilter),
            async: true,
            cache: false,
            type: 'POST',
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    var JsonObject = xml2json.parser(data);
                    if (JsonObject.serviceresponse.detailslist) {
                        JewelleryTranscationView.variables.dx_ddlSubHead.option({
                            dataSource: new DevExpress.data.ArrayStore({
                                data: JsonObject.serviceresponse.detailslist.details,
                                key: "subheadid"
                            }),
                            displayExpr: "subhead",
                            valueExpr: "subheadid",
                        });
                    }
                    else {
                        JewelleryTranscationView.variables.dx_ddlSubHead.option({
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
                        JewelleryTranscationView.variables.dx_ddlCountry.option({
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
                        JewelleryTranscationView.variables.dx_ddlState.option({
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
                        JewelleryTranscationView.variables.dx_ddlCity.option({
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

    btnMasterSubmitOnSuccess_Party: function (data) {
        if ($(data).find('RESPONSECODE').text() == "0") {
            DevExVariables.Toaster("success", 'Record is Added successfully.');
            $("#Modal_PartyMaster").modal("hide");
            DevExpress.validationEngine.resetGroup("JewlleryTransaction");

            JewelleryTranscationView.variables.dx_txtPartyName.option({
                items: [{ accid: $(data).find('ACCOUNTID').text(), accountname: $(data).find('ACCOUNTNAME').text() }],
                selectedItem: { accid: $(data).find('ACCOUNTID').text(), accountname: $(data).find('ACCOUNTNAME').text() },
                value: $(data).find('ACCOUNTNAME').text()
            });
            JewelleryTranscationView.variables.dx_txtPartyCode.option({ value: $(data).find('ACCOUNTCODE').text() });
            JewelleryTranscationView.variables.PartyList_accid = $(data).find('ACCOUNTID').text()
            JewelleryTranscationView.variables.dx_txtPartyName.option({ value: $(data).find('ACCOUNTNAME').text() });

        }
        else {
            DevExVariables.InvalidResponseCode(data);
        }
    },

    btnMasterSubmit_Party: function () {
        //JewelleryTranscationView.variables.dx_Party_btnSubmit.option({ disabled: true });

        var data = {
            "ACCOUNTNAME": JewelleryTranscationView.variables.dx_txtAcc_Name.option().value,
            "SUBHEADID": JewelleryTranscationView.variables.dx_ddlSubHead.option().value,
            "HEADID": JewelleryTranscationView.variables.dx_txtHeadName.option().selectedItem.headid,
            "CURRENCYID": JewelleryTranscationView.variables.dx_ddlCurrency.option().value,
            "CITYID": JewelleryTranscationView.variables.dx_ddlCity.option().value,
            "STATEID": JewelleryTranscationView.variables.dx_ddlState.option().value,
            "COUNTRYID": JewelleryTranscationView.variables.dx_ddlCountry.option().value,
            "MOBILE1": JewelleryTranscationView.variables.dx_txtMobileNo.option().value,
            "TYPE": "AccountInfo",
            "oper": 'Add',
        }

        JewelleryTranscationView.savedata_Party(data);
    },

    savedata_Party: function (data) {
        $.ajax({
            url: getDomain() + JewelleryTranscationView.variables.PerformMasterOperationUrl_Party,
            data: data,
            async: true,
            cache: false,
            type: 'POST',
            beforeSend: function () {
                dx_LoaderTrinity.show();
            },
            complete: function () {
                dx_LoaderTrinity.hide();
                JewelleryTranscationView.variables.dx_Party_btnSubmit.option({ disabled: false });
            },
            success: JewelleryTranscationView.btnMasterSubmitOnSuccess_Party,
            error: OnError,
        });
    },

    GetRmCodeList: function () {
        var myfilter = { rules: [] };
        myfilter.rules.push({ field: "TYPE", op: "eq", data: "RmCode" });
        myfilter.rules.push({ field: "USEBAGFINISH", op: "eq", data: true });
        $.ajax({
            url: getDomain() + JewelleryTranscationView.variables.BindStaticDataUrl + "&myfilters=" + JSON.stringify(myfilter),
            async: true,
            cache: false,
            type: 'POST',
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    var JsonObject = xml2json.parser(data);
                    if (JsonObject.serviceresponse.detailslist) {
                        if (JsonObject.serviceresponse.detailslist.details.length) {
                            JewelleryTranscationView.variables.RmCodeList = JsonObject.serviceresponse.detailslist.details;
                        }
                        else {
                            JewelleryTranscationView.variables.RmCodeList.push(JsonObject.serviceresponse.detailslist.details);
                        }

                        JewelleryTranscationView.variables.dx_ddlMRmCode.option({
                            dataSource: new DevExpress.data.ArrayStore({
                                data: JewelleryTranscationView.variables.RmCodeList.filter(function (x) { return x.rmcate == 'METAL' }),
                                key: 'rmcodeid',
                            }),
                            displayExpr: 'rmcode',
                            valueExpr: 'rmcodeid',
                        });
                        JewelleryTranscationView.variables.dx_ddlDRmCode.option({
                            dataSource: new DevExpress.data.ArrayStore({
                                data: JewelleryTranscationView.variables.RmCodeList.filter(function (x) { return x.rmcate == 'GEMS' }),
                                key: 'rmcodeid',
                            }),
                            displayExpr: 'rmcode',
                            valueExpr: 'rmcodeid',
                        });
                        JewelleryTranscationView.variables.dx_ddlSRmCode.option({
                            dataSource: new DevExpress.data.ArrayStore({
                                data: JewelleryTranscationView.variables.RmCodeList.filter(function (x) { return x.rmcate == 'STONE' }),
                                key: 'rmcodeid',
                            }),
                            displayExpr: 'rmcode',
                            valueExpr: 'rmcodeid',
                        });
                        //JewelleryTranscationView.variables.dx_ddlMRmCode.option({
                        //    dataSource: new DevExpress.data.ArrayStore({
                        //        data: JewelleryTranscationView.variables.RmCodeList.filter(function (x) { return x.rmcate == 'MAKING' }),
                        //        key: 'rmcodeid',
                        //    }),
                        //    displayExpr: 'rmcode',
                        //    valueExpr: 'rmcodeid',
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

    GetRmShapeList: function () {
        var myfilter = { rules: [] };
        myfilter.rules.push({ field: "TYPE", op: "eq", data: "shape" });
        $.ajax({
            url: getDomain() + JewelleryTranscationView.variables.BindStaticDataUrl + "&myfilters=" + JSON.stringify(myfilter),
            async: true,
            cache: false,
            type: 'POST',
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    var JsonObject = xml2json.parser(data);
                    if (JsonObject.serviceresponse.detailslist) {
                        if (JsonObject.serviceresponse.detailslist.details.length) {
                            JewelleryTranscationView.variables.RmShapeList = JsonObject.serviceresponse.detailslist.details;
                        }
                        else {
                            JewelleryTranscationView.variables.RmShapeList.push(JsonObject.serviceresponse.detailslist.details);
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
            url: getDomain() + JewelleryTranscationView.variables.BindStaticDataUrl + "&myfilters=" + JSON.stringify(myfilter),
            async: true,
            cache: false,
            type: 'POST',
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    var JsonObject = xml2json.parser(data);
                    if (JsonObject.serviceresponse.detailslist) {
                        if (JsonObject.serviceresponse.detailslist.details.length) {
                            JewelleryTranscationView.variables.RmPurityList = JsonObject.serviceresponse.detailslist.details;
                        }
                        else {
                            JewelleryTranscationView.variables.RmPurityList.push(JsonObject.serviceresponse.detailslist.details);
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
            url: getDomain() + JewelleryTranscationView.variables.BindStaticDataUrl + "&myfilters=" + JSON.stringify(myfilter),
            async: true,
            cache: false,
            type: 'POST',
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    var JsonObject = xml2json.parser(data);
                    if (JsonObject.serviceresponse.detailslist) {
                        if (JsonObject.serviceresponse.detailslist.details.length) {
                            JewelleryTranscationView.variables.RmColorList = JsonObject.serviceresponse.detailslist.details;
                        }
                        else {
                            JewelleryTranscationView.variables.RmColorList.push(JsonObject.serviceresponse.detailslist.details);
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
            url: getDomain() + JewelleryTranscationView.variables.BindStaticDataUrl + "&myfilters=" + JSON.stringify(myfilter),
            async: true,
            cache: false,
            type: 'POST',
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    var JsonObject = xml2json.parser(data);
                    if (JsonObject.serviceresponse.detailslist) {
                        if (JsonObject.serviceresponse.detailslist.details.length) {
                            JewelleryTranscationView.variables.LabList = JsonObject.serviceresponse.detailslist.details;
                        }
                        else {
                            JewelleryTranscationView.variables.LabList.push(JsonObject.serviceresponse.detailslist.details);
                        }

                        JewelleryTranscationView.variables.dx_ddlLab.option({
                            dataSource: new DevExpress.data.ArrayStore({
                                data: JewelleryTranscationView.variables.LabList,
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
            url: getDomain() + JewelleryTranscationView.variables.BindStaticDataUrl + "&myfilters=" + JSON.stringify(myfilter),
            async: true,
            cache: false,
            type: 'POST',
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    var JsonObject = xml2json.parser(data);
                    if (JsonObject.serviceresponse.detailslist) {
                        if (JsonObject.serviceresponse.detailslist.details.length) {
                            JewelleryTranscationView.variables.JsizeList = JsonObject.serviceresponse.detailslist.details;
                        }
                        else {
                            JewelleryTranscationView.variables.JsizeList.push(JsonObject.serviceresponse.detailslist.details);
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

    GetItemCategory: function () {
        var myfilter = { rules: [] };
        myfilter.rules.push({ field: "RMSUBCATE", op: "eq", data: "FINISHED" });

        $.ajax({
            url: getDomain() + JewelleryTranscationView.variables.BindItemCateUrl + "&myfilters=" + JSON.stringify(myfilter),
            async: true,
            cache: false,
            type: 'POST',
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    var JsonObject = xml2json.parser(data);
                    if (JsonObject.serviceresponse.detailslist) {
                        JewelleryTranscationView.variables.dx_txtItemCate.option({
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

    BindRmColor: function (postfix) {
        var List = JewelleryTranscationView.variables.RmColorList.filter(function (x) {
            return x.rmcateid == JewelleryTranscationView.variables.DetailsControlsList[postfix].dx_txtItemName.option().selectedItem.rmcateid
                && x.rmsubcateid == JewelleryTranscationView.variables.DetailsControlsList[postfix].dx_txtItemName.option().selectedItem.rmsubcateid;
        });
        JewelleryTranscationView.variables.DetailsControlsList[postfix].dx_ddlColor.option({
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
        var List = JewelleryTranscationView.variables.RmShapeList.filter(function (x) {
            return x.rmcateid == JewelleryTranscationView.variables.DetailsControlsList[postfix].dx_txtItemName.option().selectedItem.rmcateid;
            //&& x.rmsubcateid == JewelleryTranscationView.variables.DetailsControlsList[postfix].dx_txtItemName.option().selectedItem.rmsubcateid;
        });
        JewelleryTranscationView.variables.DetailsControlsList[postfix].dx_ddlShape.option({
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
        var List = JewelleryTranscationView.variables.RmPurityList.filter(function (x) {
            return x.rmcateid == JewelleryTranscationView.variables.DetailsControlsList[postfix].dx_txtItemName.option().selectedItem.rmcateid
                && x.rmsubcateid == JewelleryTranscationView.variables.DetailsControlsList[postfix].dx_txtItemName.option().selectedItem.rmsubcateid;
        });
        JewelleryTranscationView.variables.DetailsControlsList[postfix].dx_ddlQuality.option({
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
        if (JewelleryTranscationView.variables.DetailsControlsList[postfix].dx_ddlShape.option().selectedItem) {
            var myfilter = { rules: [] };
            myfilter.rules.push({ field: "RMSHAPEID", op: "eq", data: JewelleryTranscationView.variables.DetailsControlsList[postfix].dx_ddlShape.option().selectedItem.shapeid });
            myfilter.rules.push({ field: "TYPE", op: "eq", data: "Charni" });

            if (JewelleryTranscationView.variables.DetailsControlsList[postfix].dx_txtLength.option().value && JewelleryTranscationView.variables.DetailsControlsList[postfix].dx_ddlShape.option().text != "RBC")
                myfilter.rules.push({ field: "LENGTH", op: "eq", data: JewelleryTranscationView.variables.DetailsControlsList[postfix].dx_txtLength.option().value });
            if (JewelleryTranscationView.variables.DetailsControlsList[postfix].dx_txtWidth.option().value)
                myfilter.rules.push({ field: "WIDTH", op: "eq", data: JewelleryTranscationView.variables.DetailsControlsList[postfix].dx_txtWidth.option().value });

            $.ajax({
                url: getDomain() + JewelleryTranscationView.variables.BindStaticDataUrl + "&myfilters=" + JSON.stringify(myfilter),
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

                            JewelleryTranscationView.variables.DetailsControlsList[postfix].dx_txtCharni.option({
                                items: list,
                                selectedItem: list[0],
                                value: list[0].charni
                            });
                        }
                        else {
                            JewelleryTranscationView.variables.DetailsControlsList[postfix].dx_txtCharni.option({
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
        JewelleryTranscationView.variables.RowCount = 1;
        JewelleryTranscationView.variables.DetailsControlsList = [];
        JewelleryTranscationView.variables.JI_ID = "";
    },

    clearControls: function () {
        DevExpress.validationEngine.resetGroup("JewelleryTransaction");

        JewelleryTranscationView.variables.Masterid = '',
        JewelleryTranscationView.variables.Oper = 'Add';
        JewelleryTranscationView.variables.PartyList_accid = '';

        $("#lnkAttachFilePreview").attr("FileName", "");
        $("#lnkAttachFilePreview").html("");
        $("#hdnOldAttachFile").val("");
        $(".divTax").remove();

        JewelleryTranscationView.variables.dx_txtVoucherDate.option({ value: new Date() });
        JewelleryTranscationView.variables.dx_txtDueDays.option({ value: 0 });
        JewelleryTranscationView.variables.dx_ddlOrderby.option({ value: Number(getUserId()) });
        JewelleryTranscationView.variables.dx_ddlVoucherType.option({ value: JewelleryTranscationView.variables.VoucherTypeList[1] });
        JewelleryTranscationView.variables.dx_btnSubmit.option({ disabled: false });
        JewelleryTranscationView.variables.dx_ddlOrderby.option({ disabled: false });
        JewelleryTranscationView.variables.dx_txtVoucherNo.option({ disabled: false });
        JewelleryTranscationView.variables.dx_ddlSubBookMaster.option({ disabled: false });
        JewelleryTranscationView.variables.dx_btnSubmit.option({ visible: true });
        //JewelleryTranscationView.variables.dx_btnAddDetailItem.option({ visible: true });
        JewelleryTranscationView.variables.dx_btnRemoveItem.option({ visible: true });
        $("#MixExportLabel").html('');
        JewelleryTranscationView.variables.dx_SwitchIsMixExport.option({ visible: false });
        JewelleryTranscationView.variables.dx_SwitchIsMixExport.option({ value: true });
        $("#frm_JewelleryTransaction").hide();
        $("#AttachmentsList").hide();
        $("#tbody_AttachmentsList").html("");
        $("#pnlView").show();
        JewelleryTranscationView.variables.dx_dataGridItems.refresh();
        JewelleryTranscationView.variables.dx_dataGrid.refresh();
    },

    RemoveItemFromList: function () {
        var SelectedItemList = [];
        SelectedItemList = JewelleryTranscationView.variables.dx_dataGridItems.option().selectedRowKeys;

        if (SelectedItemList.length == 0) {
            DevExVariables.Toaster("warning", "Please select atleast one item to remove.");
            return;
        }

        if (JewelleryTranscationView.variables.Masterid > 0) {
            JewelleryTranscationView.variables.Oper = 'Edit';
        }
        else {
            JewelleryTranscationView.variables.Oper = 'Add';
        }

        var data = {
            "SBOOKID": JewelleryTranscationView.variables.dx_ddlSubBookMaster.option().value,
            "VOUCHERDATE": JewelleryTranscationView.variables.dx_txtVoucherDate.option().text,
            //"LOCKERID": JewelleryTranscationView.variables.dx_ddllocker.option().value,
            "VOUCHERTYPE": JewelleryTranscationView.variables.dx_ddlVoucherType.option().value,
            "ACCID": JewelleryTranscationView.variables.dx_txtPartyName.option().selectedItem.accid,
            "PARTYBILLNO": JewelleryTranscationView.variables.dx_txtPartyBillNo.option().value,
            "SALESMANID": JewelleryTranscationView.variables.dx_ddlOrderby.option().value,
            "DUEDAY": JewelleryTranscationView.variables.dx_txtDueDays.option().value,
            "TAXPROFILEID": JewelleryTranscationView.variables.dx_TaxProfile.option().value,
            "CURRENCYID": JewelleryTranscationView.variables.dx_ddlCurrencyName.option().value,
            "EXCHANGERATE": JewelleryTranscationView.variables.dx_txtExchangeRate.option().value,
            //"BILLINGADDRESSID": JewelleryTranscationView.variables.dx_ddlBillingAddress.option().value,
            //"BILLADDR_NAME": JewelleryTranscationView.variables.dx_ddlBillingAddress.option().selectedItem.shipname,
            //"BILLADDR_MOBNO": JewelleryTranscationView.variables.dx_ddlBillingAddress.option().selectedItem.shipmobileno,
            //"BILLADDR_COUNTRY": JewelleryTranscationView.variables.dx_ddlBillingAddress.option().selectedItem.shipcountry,
            //"BILLADDR_STATE": JewelleryTranscationView.variables.dx_ddlBillingAddress.option().selectedItem.shipstate,
            //"BILLADDR_CITY": JewelleryTranscationView.variables.dx_ddlBillingAddress.option().selectedItem.shipcity,
            //"BILLADDR_PINCODE": JewelleryTranscationView.variables.dx_ddlBillingAddress.option().selectedItem.shipzipecode,
            //"BILLADDR_ADDRESS": JewelleryTranscationView.variables.dx_ddlBillingAddress.option().selectedItem.shipaddress,
            //"BILLADDR_TYPE": JewelleryTranscationView.variables.dx_ddlBillingAddress.option().selectedItem.address_type_id,
            //"BILLADDR_GSTNO": JewelleryTranscationView.variables.dx_ddlBillingAddress.option().selectedItem.gstno,
            //"BILLADDR_PANNO": JewelleryTranscationView.variables.dx_ddlBillingAddress.option().selectedItem.panno,
            //"SHIPPINGADDRESSID": JewelleryTranscationView.variables.dx_ddlShippingAddress.option().value,
            //"SHIPADDR_NAME": JewelleryTranscationView.variables.dx_ddlShippingAddress.option().selectedItem.shipname,
            //"SHIPADDR_MOBNO": JewelleryTranscationView.variables.dx_ddlShippingAddress.option().selectedItem.shipmobileno,
            //"SHIPADDR_COUNTRY": JewelleryTranscationView.variables.dx_ddlShippingAddress.option().selectedItem.shipcountry,
            //"SHIPADDR_STATE": JewelleryTranscationView.variables.dx_ddlShippingAddress.option().selectedItem.shipstate,
            //"SHIPADDR_CITY": JewelleryTranscationView.variables.dx_ddlShippingAddress.option().selectedItem.shipcity,
            //"SHIPADDR_PINCODE": JewelleryTranscationView.variables.dx_ddlShippingAddress.option().selectedItem.shipzipecode,
            //"SHIPADDR_ADDRESS": JewelleryTranscationView.variables.dx_ddlShippingAddress.option().selectedItem.shipaddress,
            //"SHIPADDR_TYPE": JewelleryTranscationView.variables.dx_ddlShippingAddress.option().selectedItem.address_type_id,
            //"SHIPADDR_GSTNO": JewelleryTranscationView.variables.dx_ddlShippingAddress.option().selectedItem.gstno,
            //"SHIPADDR_PANNO": JewelleryTranscationView.variables.dx_ddlShippingAddress.option().selectedItem.panno,
            "ROUNDOFF": JewelleryTranscationView.variables.txtRoundOff.option().value || 0,
            "ROUNDOFFTYPE": $("[name='rd_RoundOff']:checked").val(),
            "FREIGHTCHARGES": JewelleryTranscationView.variables.txtFreightCharges.option().value || 0,
            "REMARKS": JewelleryTranscationView.variables.dx_txtRemarks.option().value,
            //"BROKERID": JewelleryTranscationView.variables.dx_ddlBroker.option().value,
            "BROKERAGE": JewelleryTranscationView.variables.dx_txtBrokerage.option().value || 0,
            "VIRTUALFILENAME": $("#lnkCADFilePreview").attr("href"),
            "ACTUALFILENAME": $("#lnkCADFilePreview").html(),
            "ISFINALSUBMIT": 0,
            "SELECTEDITEMS": SelectedItemList.toString(),
            "JT_ID": JewelleryTranscationView.variables.Masterid,
            "oper": JewelleryTranscationView.variables.Oper,
            "OPER_TYPE": "Item_Remove"
        }
        if (JewelleryTranscationView.variables.dx_ddlSubBookMaster.option().selectedItem.subbook == "Jewellery Export")
            data.ISMIXEXPORT = JewelleryTranscationView.variables.dx_SwitchIsMixExport.option().value;

        if (JewelleryTranscationView.variables.dx_ddllocker.option().value)
            data.LOCKERID = JewelleryTranscationView.variables.dx_ddllocker.option().value;

        if (JewelleryTranscationView.variables.dx_ddlBillingAddress.option().value) {
            data.BILLINGADDRESSID = JewelleryTranscationView.variables.dx_ddlBillingAddress.option().value;
        }

        if (JewelleryTranscationView.variables.dx_ddlShippingAddress.option().value) {
            data.SHIPPINGADDRESSID = JewelleryTranscationView.variables.dx_ddlShippingAddress.option().value;
        }

        if (JewelleryTranscationView.variables.dx_ddlBroker.option().value)
            data.BROKERID = JewelleryTranscationView.variables.dx_ddlBroker.option().value;

        $.ajax({
            url: getDomain() + JewelleryTranscationView.variables.PerformMasterOperationUrl,
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
                    JewelleryTranscationView.variables.dx_popupItemRemove.hide();
                    JewelleryTranscationView.variables.dx_dataGridItems.clearSelection();
                    JewelleryTranscationView.variables.dx_dataGridItems.refresh();
                }
                else {
                    DevExVariables.InvalidResponseCode(data);
                }
            },
            error: OnError,
        });
    },

    calcRoundOff: function () {
        var Amt = JewelleryTranscationView.variables.txtAmount.option().value;
        var FinalAmt = 0, RoundOff = 0, ExRate = 1;;
        if ($("[name='rd_RoundOff']:checked").val() == "Add") {
            FinalAmt = Math.ceil(Amt);
        }
        else {
            FinalAmt = Math.floor(Amt);
        }

        RoundOff = Math.abs(Amt - FinalAmt);

        JewelleryTranscationView.variables.txtRoundOff.option({ value: RoundOff.toFixed(2) });
        JewelleryTranscationView.variables.txtTotalAmount.option({ value: FinalAmt.toFixed(2) });

        JewelleryTranscationView.OnChangeExchangeRate();
    },

    GetBrokerAndCourierList: function () {
        var myfilter = { rules: [] };
        myfilter.rules.push({ field: "ISACTIVE", op: "eq", data: true });
        myfilter.rules.push({ field: "SUBHEAD", op: "eq", data: "Broker,Courier" });
        $.ajax({
            url: getDomain() + JewelleryTranscationView.variables.BindAccListUrl + "&ColumnRequested=ACCID,ACCOUNTNAME,PARTYCODE,SUBHEAD&myfilters=" + JSON.stringify(myfilter),
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

                        JewelleryTranscationView.variables.dx_ddlBroker.option({
                            dataSource: new DevExpress.data.ArrayStore({
                                data: List.filter(function (x) { return x.subhead == "Broker"; }),
                                key: "accid"
                            }),
                            displayExpr: "accountname",
                            valueExpr: "accid"
                        });

                        JewelleryTranscationView.variables.dx_ddlcourier.option({
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

    deleteRow: function (id) {
        var rowData = JewelleryTranscationView.variables.dx_dataGrid.getVisibleRows()[JewelleryTranscationView.variables.dx_dataGrid.getRowIndexByKey(+id)].data;
        JewelleryTranscationView.variables.Masterid = id;
        JewelleryTranscationView.variables.DeleteDataObj = rowData;
        JewelleryTranscationView.variables.Oper = "Delete";

        if (JewelleryTranscationView.variables.dx_popupRecordDelete) {
            JewelleryTranscationView.variables.dx_popupRecordDelete.option("contentTemplate", JewelleryTranscationView.variables.DeletePopUpOptions.contentTemplate(JewelleryTranscationView.variables.DeleteDataObj).bind(this));
        }
        else {
            JewelleryTranscationView.variables.dx_popupRecordDelete = $("#dx_popupRecordDelete").dxPopup(JewelleryTranscationView.variables.DeletePopUpOptions).dxPopup("instance");
        }

        JewelleryTranscationView.variables.dx_popupRecordDelete.show();
    },

    updateTaxProfile: function () {
        var validation = DevExpress.validationEngine.validateGroup("JewelleryTransaction");
        if (!validation.isValid) {
            DevExVariables.Toaster("warning", "Please fill all required fields before submit.");
            return;
        }

        if (JewelleryTranscationView.variables.Masterid > 0) {
            JewelleryTranscationView.variables.Oper = 'Edit';
        }
        else {
            JewelleryTranscationView.variables.Oper = 'Add';
        }

        var data = {
            "SBOOKID": JewelleryTranscationView.variables.dx_ddlSubBookMaster.option().value,
            "VOUCHERDATE": JewelleryTranscationView.variables.dx_txtVoucherDate.option().text,
            //"LOCKERID": JewelleryTranscationView.variables.dx_ddllocker.option().value,
            "VOUCHERTYPE": JewelleryTranscationView.variables.dx_ddlVoucherType.option().value,
            "ACCID": JewelleryTranscationView.variables.dx_txtPartyName.option().selectedItem.accid,
            "PARTYBILLNO": JewelleryTranscationView.variables.dx_txtPartyBillNo.option().value,
            "SALESMANID": JewelleryTranscationView.variables.dx_ddlOrderby.option().value,
            "DUEDAY": JewelleryTranscationView.variables.dx_txtDueDays.option().value,
            "TAXPROFILEID": JewelleryTranscationView.variables.dx_TaxProfile.option().value,
            "CURRENCYID": JewelleryTranscationView.variables.dx_ddlCurrencyName.option().value,
            "EXCHANGERATE": JewelleryTranscationView.variables.dx_txtExchangeRate.option().value,
            //"BILLINGADDRESSID": JewelleryTranscationView.variables.dx_ddlBillingAddress.option().value,
            //"BILLADDR_NAME": JewelleryTranscationView.variables.dx_ddlBillingAddress.option().selectedItem.shipname,
            //"BILLADDR_MOBNO": JewelleryTranscationView.variables.dx_ddlBillingAddress.option().selectedItem.shipmobileno,
            //"BILLADDR_COUNTRY": JewelleryTranscationView.variables.dx_ddlBillingAddress.option().selectedItem.shipcountry,
            //"BILLADDR_STATE": JewelleryTranscationView.variables.dx_ddlBillingAddress.option().selectedItem.shipstate,
            //"BILLADDR_CITY": JewelleryTranscationView.variables.dx_ddlBillingAddress.option().selectedItem.shipcity,
            //"BILLADDR_PINCODE": JewelleryTranscationView.variables.dx_ddlBillingAddress.option().selectedItem.shipzipecode,
            //"BILLADDR_ADDRESS": JewelleryTranscationView.variables.dx_ddlBillingAddress.option().selectedItem.shipaddress,
            //"BILLADDR_TYPE": JewelleryTranscationView.variables.dx_ddlBillingAddress.option().selectedItem.address_type_id,
            //"BILLADDR_GSTNO": JewelleryTranscationView.variables.dx_ddlBillingAddress.option().selectedItem.gstno,
            //"BILLADDR_PANNO": JewelleryTranscationView.variables.dx_ddlBillingAddress.option().selectedItem.panno,
            //"SHIPPINGADDRESSID": JewelleryTranscationView.variables.dx_ddlShippingAddress.option().value,
            //"SHIPADDR_NAME": JewelleryTranscationView.variables.dx_ddlShippingAddress.option().selectedItem.shipname,
            //"SHIPADDR_MOBNO": JewelleryTranscationView.variables.dx_ddlShippingAddress.option().selectedItem.shipmobileno,
            //"SHIPADDR_COUNTRY": JewelleryTranscationView.variables.dx_ddlShippingAddress.option().selectedItem.shipcountry,
            //"SHIPADDR_STATE": JewelleryTranscationView.variables.dx_ddlShippingAddress.option().selectedItem.shipstate,
            //"SHIPADDR_CITY": JewelleryTranscationView.variables.dx_ddlShippingAddress.option().selectedItem.shipcity,
            //"SHIPADDR_PINCODE": JewelleryTranscationView.variables.dx_ddlShippingAddress.option().selectedItem.shipzipecode,
            //"SHIPADDR_ADDRESS": JewelleryTranscationView.variables.dx_ddlShippingAddress.option().selectedItem.shipaddress,
            //"SHIPADDR_TYPE": JewelleryTranscationView.variables.dx_ddlShippingAddress.option().selectedItem.address_type_id,
            //"SHIPADDR_GSTNO": JewelleryTranscationView.variables.dx_ddlShippingAddress.option().selectedItem.gstno,
            //"SHIPADDR_PANNO": JewelleryTranscationView.variables.dx_ddlShippingAddress.option().selectedItem.panno,
            "ROUNDOFF": JewelleryTranscationView.variables.txtRoundOff.option().value || 0,
            "ROUNDOFFTYPE": $("[name='rd_RoundOff']:checked").val(),
            "FREIGHTCHARGES": JewelleryTranscationView.variables.txtFreightCharges.option().value || 0,
            "REMARKS": JewelleryTranscationView.variables.dx_txtRemarks.option().value,
            //"BROKERID": JewelleryTranscationView.variables.dx_ddlBroker.option().value,
            "BROKERAGE": JewelleryTranscationView.variables.dx_txtBrokerage.option().value || 0,
            "ISFINALSUBMIT": 0,
            "JT_ID": JewelleryTranscationView.variables.Masterid,
            "oper": JewelleryTranscationView.variables.Oper,
            "OPER_TYPE": "Change_Tax"
        }

        if (JewelleryTranscationView.variables.dx_ddlSubBookMaster.option().selectedItem.subbook == "Jewellery Export")
            data.ISMIXEXPORT = JewelleryTranscationView.variables.dx_SwitchIsMixExport.option().value;

        if (JewelleryTranscationView.variables.dx_ddllocker.option().value)
            data.LOCKERID = JewelleryTranscationView.variables.dx_ddllocker.option().value;

        if (JewelleryTranscationView.variables.dx_ddlBillingAddress.option().value) {
            data.BILLINGADDRESSID = JewelleryTranscationView.variables.dx_ddlBillingAddress.option().value;
        }

        if (JewelleryTranscationView.variables.dx_ddlShippingAddress.option().value) {
            data.SHIPPINGADDRESSID = JewelleryTranscationView.variables.dx_ddlShippingAddress.option().value;
        }

        if (JewelleryTranscationView.variables.dx_ddlBroker.option().value)
            data.BROKERID = JewelleryTranscationView.variables.dx_ddlBroker.option().value;



        $.ajax({
            url: getDomain() + JewelleryTranscationView.variables.PerformMasterOperationUrl,
            data: data,
            async: true,
            cache: false,
            type: 'POST',
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    DevExVariables.Toaster("success", 'Tax is Updated successfully.');
                    JewelleryTranscationView.variables.dx_dataGridItems.refresh();
                }
                else {
                    DevExVariables.Toaster("warning", $(data).find('RESPONSEMESSAGE').text());
                }
            },
            error: OnError,
        });
    },

    OnChangeExchangeRate: function () {
        var ExRate = JewelleryTranscationView.variables.dx_txtExchangeRate.option().value;
        var FinalAmt = JewelleryTranscationView.variables.txtTotalAmount.option().value || 0;
        JewelleryTranscationView.variables.txtTotalAmountInRs.option({ value: (FinalAmt * ExRate).toFixed(2) });
    },

    DetailTableFormInit: function (postfix, obj) {
        /*----------------------Registration of Detail table controls---------------------*/
        var tmp = [];
        tmp[postfix] = { dx_txtItemName: "", dx_ddlShape: "", dx_ddlQuality: "", dx_ddlColor: "", dx_txtCharni: "", dx_txtLength: "", dx_txtWidth: "", dx_txtPieces: "", dx_txtWeight: "", dx_txtRate: "", dx_txtAmt: "" };

        JewelleryTranscationView.variables.DetailsControlsList = Object.assign(JewelleryTranscationView.variables.DetailsControlsList, tmp);

        JewelleryTranscationView.variables.DetailsControlsList[postfix].dx_txtItemName = $("#dx_txtItemName" + postfix).dxAutocomplete({
            dataSource: JewelleryTranscationView.variables.RmCodeList.filter(function (x) { return x.rmgroup == 'METAL' || x.rmgroup == 'MATERIAL' || x.rmgroup == 'LABOUR' || x.rmgroup == 'OTHER' }),
            placeholder: "Type RM Code...",
            valueExpr: "rmcode",
            onSelectionChanged: function (data) {
                if (data.selectedItem) {
                    if (data.selectedItem.rmgroup == "METAL") {
                        JewelleryTranscationView.variables.DetailsControlsList[postfix].dx_ddlShape.option({
                            dataSource: [{ shapeid: data.selectedItem.shapeid, shape: data.selectedItem.shape || "--" }],
                            displayExpr: "shape",
                            valueExpr: "shapeid",
                            value: data.selectedItem.shapeid,
                            disabled: true,
                        });
                        JewelleryTranscationView.variables.DetailsControlsList[postfix].dx_ddlQuality.option({
                            dataSource: [{ purityid: data.selectedItem.purityid, purity: data.selectedItem.purity || "--" }],
                            displayExpr: "purity",
                            valueExpr: "purityid",
                            value: data.selectedItem.purityid,
                            disabled: true,
                        });
                        JewelleryTranscationView.BindRmColor(postfix);
                        JewelleryTranscationView.variables.DetailsControlsList[postfix].dx_ddlColor.option({ value: data.selectedItem.colourid });

                        JewelleryTranscationView.variables.DetailsControlsList[postfix].dx_txtLength.option({ value: "", disabled: true });
                        JewelleryTranscationView.variables.DetailsControlsList[postfix].dx_txtWidth.option({ value: "", disabled: true });
                        JewelleryTranscationView.variables.DetailsControlsList[postfix].dx_txtPieces.option({ value: 1, disabled: false });
                        JewelleryTranscationView.variables.DetailsControlsList[postfix].dx_txtWeight.option({ value: "", disabled: false });
                        JewelleryTranscationView.variables.DetailsControlsList[postfix].dx_txtCharni.option({ value: "", disabled: true });
                    }
                    else {
                        JewelleryTranscationView.BindRmShape(postfix);
                        JewelleryTranscationView.variables.DetailsControlsList[postfix].dx_ddlShape.option({ value: data.selectedItem.shapeid });
                        JewelleryTranscationView.BindRmPurity(postfix);
                        JewelleryTranscationView.variables.DetailsControlsList[postfix].dx_ddlQuality.option({ value: data.selectedItem.purityid });
                        JewelleryTranscationView.BindRmColor(postfix);
                        JewelleryTranscationView.variables.DetailsControlsList[postfix].dx_ddlColor.option({ value: data.selectedItem.colourid });

                        if (data.selectedItem.rmgroup == "MATERIAL") {
                            JewelleryTranscationView.variables.DetailsControlsList[postfix].dx_txtPieces.option({ disabled: false });
                            JewelleryTranscationView.variables.DetailsControlsList[postfix].dx_txtWeight.option({ disabled: false });
                            JewelleryTranscationView.variables.DetailsControlsList[postfix].dx_txtCharni.option({ disabled: false });

                            if (JewelleryTranscationView.variables.DetailsControlsList[postfix].dx_ddlShape.option().selectedItem) {
                                var ShapeName = JewelleryTranscationView.variables.DetailsControlsList[postfix].dx_ddlShape.option().selectedItem.shape;
                                if (ShapeName == "RBC") {
                                    JewelleryTranscationView.variables.DetailsControlsList[postfix].dx_txtLength.option({ disabled: true, value: "" });
                                    JewelleryTranscationView.variables.DetailsControlsList[postfix].dx_txtWidth.option({ disabled: false });
                                }
                                else if (ShapeName == "PRINCESS") {
                                    JewelleryTranscationView.variables.DetailsControlsList[postfix].dx_txtLength.option({ disabled: false });
                                    JewelleryTranscationView.variables.DetailsControlsList[postfix].dx_txtWidth.option({ disabled: true });
                                }
                                else {
                                    JewelleryTranscationView.variables.DetailsControlsList[postfix].dx_txtLength.option({ disabled: false });
                                    JewelleryTranscationView.variables.DetailsControlsList[postfix].dx_txtWidth.option({ disabled: false });
                                }
                            }
                            else {
                                JewelleryTranscationView.variables.DetailsControlsList[postfix].dx_txtLength.option({ disabled: false });
                                JewelleryTranscationView.variables.DetailsControlsList[postfix].dx_txtWidth.option({ disabled: false });
                            }
                        }
                        else {
                            JewelleryTranscationView.variables.DetailsControlsList[postfix].dx_txtLength.option({ value: "", disabled: true });
                            JewelleryTranscationView.variables.DetailsControlsList[postfix].dx_txtWidth.option({ value: "", disabled: true });
                            JewelleryTranscationView.variables.DetailsControlsList[postfix].dx_txtPieces.option({ value: "", disabled: true });
                            JewelleryTranscationView.variables.DetailsControlsList[postfix].dx_txtCharni.option({ value: "", disabled: true });
                            JewelleryTranscationView.variables.DetailsControlsList[postfix].dx_txtWeight.option({ value: "", disabled: true });
                        }
                    }
                }
                else {
                    JewelleryTranscationView.variables.DetailsControlsList[postfix].dx_txtItemName.option("value", "");
                    JewelleryTranscationView.variables.DetailsControlsList[postfix].dx_ddlShape.option({
                        dataSource: new DevExpress.data.ArrayStore({ data: [] })
                    });
                    JewelleryTranscationView.variables.DetailsControlsList[postfix].dx_ddlQuality.option({
                        dataSource: new DevExpress.data.ArrayStore({ data: [] })
                    });
                    JewelleryTranscationView.variables.DetailsControlsList[postfix].dx_ddlColor.option({
                        dataSource: new DevExpress.data.ArrayStore({ data: [] })
                    });

                    JewelleryTranscationView.variables.DetailsControlsList[postfix].dx_txtItemName.focus();
                }
            },
            onFocusOut: function (data) {
                if (!data.component.option().selectedItem) {
                    JewelleryTranscationView.variables.DetailsControlsList[postfix].dx_txtItemName.option("value", "");
                    JewelleryTranscationView.variables.DetailsControlsList[postfix].dx_ddlShape.option({
                        dataSource: new DevExpress.data.ArrayStore({ data: [] })
                    });
                    JewelleryTranscationView.variables.DetailsControlsList[postfix].dx_ddlQuality.option({
                        dataSource: new DevExpress.data.ArrayStore({ data: [] })
                    });
                    JewelleryTranscationView.variables.DetailsControlsList[postfix].dx_ddlColor.option({
                        dataSource: new DevExpress.data.ArrayStore({ data: [] })
                    });

                    JewelleryTranscationView.variables.DetailsControlsList[postfix].dx_txtItemName.focus();
                }
            }
        }).dxValidator({
            validationGroup: "UpdateItemDetails",
            validationRules: [{
                type: "required",
                message: "Rm Code is required"
            }]
        }).dxAutocomplete("instance");

        JewelleryTranscationView.variables.DetailsControlsList[postfix].dx_ddlShape = $("#dx_ddlShape" + postfix).dxSelectBox({
            placeholder: "Select Shape...",
            searchEnabled: true,
            onValueChanged: function (data) {
                JewelleryTranscationView.variables.DetailsControlsList[postfix].dx_txtCharni.option({ value: "" });
                if (data.component.option().selectedItem) {
                    var ShapeName = data.component.option().selectedItem.shape;
                    if (ShapeName == "RBC") {
                        JewelleryTranscationView.variables.DetailsControlsList[postfix].dx_txtLength.option({ disabled: true });
                        JewelleryTranscationView.variables.DetailsControlsList[postfix].dx_txtWidth.option({ disabled: false });
                    }
                        //else if (ShapeName == "PRINCESS") {
                        //    JewelleryTranscationView.variables.DetailsControlsList[postfix].dx_txtLength.option({ disabled: false });
                        //    JewelleryTranscationView.variables.DetailsControlsList[postfix].dx_txtWidth.option({ disabled: true });
                        //}
                    else {
                        JewelleryTranscationView.variables.DetailsControlsList[postfix].dx_txtLength.option({ disabled: false });
                        JewelleryTranscationView.variables.DetailsControlsList[postfix].dx_txtWidth.option({ disabled: false });
                    }
                }

            },
            onFocusOut: function (data) {
                if (!data.component.option().selectedItem) {
                    JewelleryTranscationView.variables.DetailsControlsList[postfix].dx_ddlShape.focus();
                }
                else {
                    JewelleryTranscationView.CalcTotalWgts();
                }
            }
        }).dxValidator({
            validationGroup: "UpdateItemDetails",
            validationRules: [{
                type: "required",
                message: "Shape is required"
            }]
        }).dxSelectBox("instance");

        JewelleryTranscationView.variables.DetailsControlsList[postfix].dx_ddlQuality = $("#dx_ddlQuality" + postfix).dxSelectBox({
            placeholder: "Select Quality...",
            searchEnabled: true,
            onFocusOut: function (data) {
                if (!data.component.option().selectedItem) {
                    JewelleryTranscationView.variables.DetailsControlsList[postfix].dx_ddlQuality.focus();
                }
                else {
                    JewelleryTranscationView.CalcTotalWgts();
                }
            }
        }).dxValidator({
            validationGroup: "UpdateItemDetails",
            validationRules: [{
                type: "required",
                message: "Quality is required"
            }]
        }).dxSelectBox("instance");

        JewelleryTranscationView.variables.DetailsControlsList[postfix].dx_ddlColor = $("#dx_ddlColor" + postfix).dxSelectBox({
            placeholder: "Select Color...",
            searchEnabled: true,
            onFocusOut: function (data) {
                if (!data.component.option().selectedItem) {
                    JewelleryTranscationView.variables.DetailsControlsList[postfix].dx_ddlColor.focus();
                }
                else {
                    JewelleryTranscationView.CalcTotalWgts();
                }
            }
        }).dxValidator({
            validationGroup: "UpdateItemDetails",
            validationRules: [{
                type: "required",
                message: "Color is required"
            }]
        }).dxSelectBox("instance");

        JewelleryTranscationView.variables.DetailsControlsList[postfix].dx_txtCharni = $("#dx_txtCharni" + postfix).dxAutocomplete({
            dataSource: new DevExpress.data.CustomStore({
                load: function (loadOptions) {
                    var deferred = $.Deferred();

                    if (JewelleryTranscationView.variables.DetailsControlsList[postfix].dx_ddlShape.option().selectedItem) {
                        var myfilter = { rules: [] };
                        myfilter.rules.push({ field: "RMSHAPEID", op: "eq", data: JewelleryTranscationView.variables.DetailsControlsList[postfix].dx_ddlShape.option().selectedItem.shapeid });
                        myfilter.rules.push({ field: "SEARCH", op: "eq", data: loadOptions.searchValue });
                        myfilter.rules.push({ field: "TYPE", op: "eq", data: "Charni" });

                        if (JewelleryTranscationView.variables.DetailsControlsList[postfix].dx_txtLength.option().value && JewelleryTranscationView.variables.DetailsControlsList[postfix].dx_ddlShape.option().text != "RBC")
                            myfilter.rules.push({ field: "LENGTH", op: "eq", data: JewelleryTranscationView.variables.DetailsControlsList[postfix].dx_txtLength.option().value });
                        if (JewelleryTranscationView.variables.DetailsControlsList[postfix].dx_txtWidth.option().value)
                            myfilter.rules.push({ field: "WIDTH", op: "eq", data: JewelleryTranscationView.variables.DetailsControlsList[postfix].dx_txtWidth.option().value });

                        var result;
                        $.ajax({
                            url: getDomain() + JewelleryTranscationView.variables.BindStaticDataUrl + "&myfilters=" + JSON.stringify(myfilter),
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
                    var pcs = JewelleryTranscationView.variables.DetailsControlsList[postfix].dx_txtPieces.option().value || 1;
                    //var ShapeName = JewelleryTranscationView.variables.DetailsControlsList[postfix].dx_ddlShape.option().text;

                    JewelleryTranscationView.variables.DetailsControlsList[postfix].dx_txtWeight.option({ value: parseFloat(data.selectedItem.weight * pcs).toFixed(3) });

                    //if (!JewelleryTranscationView.variables.DetailsControlsList[postfix].dx_txtLength.option().value && ShapeName != "RBC")
                    if (data.selectedItem.lenght)
                        JewelleryTranscationView.variables.DetailsControlsList[postfix].dx_txtLength.option({ value: data.selectedItem.lenght });

                    //if (!JewelleryTranscationView.variables.DetailsControlsList[postfix].dx_txtWidth.option().value)
                    if (data.selectedItem.width)
                        JewelleryTranscationView.variables.DetailsControlsList[postfix].dx_txtWidth.option({ value: data.selectedItem.width });
                }
            },
            onFocusOut: function (data) {
                if (!data.component.option().selectedItem) {
                    JewelleryTranscationView.variables.DetailsControlsList[postfix].dx_txtCharni.option("value", "");
                }
            }
        }).dxValidator({
            validationGroup: "UpdateItemDetails",
            validationRules: [{
                type: "required",
                message: "Charni is required",
            }]
        }).dxAutocomplete("instance");

        JewelleryTranscationView.variables.DetailsControlsList[postfix].dx_txtLength = $("#dx_txtLength" + postfix).dxTextBox({
            mode: "number",
            onKeyDown: function (e) {
                if (e.event.key == "-" || e.event.key == "+") {
                    e.event.preventDefault();
                }
            },
            onFocusOut: function (data) {
                var ShapeName = JewelleryTranscationView.variables.DetailsControlsList[postfix].dx_ddlShape.option().text;
                if (ShapeName == "PRINCESS" && data.component.option().value) {
                    JewelleryTranscationView.variables.DetailsControlsList[postfix].dx_txtWidth.option({ value: data.component.option().value });
                }
                if (data.component.option().value)
                    JewelleryTranscationView.GetCharniAutoSelected(postfix);
            },
        }).dxValidator({
            validationGroup: "UpdateItemDetails",
            validationRules: [{
                type: "required",
                message: "Length is required"
            }]
        }).dxTextBox("instance");

        JewelleryTranscationView.variables.DetailsControlsList[postfix].dx_txtWidth = $("#dx_txtWidth" + postfix).dxTextBox({
            mode: "number",
            onKeyDown: function (e) {
                if (e.event.key == "-" || e.event.key == "+") {
                    e.event.preventDefault();
                }
            },
            onFocusOut: function (data) {
                var ShapeName = JewelleryTranscationView.variables.DetailsControlsList[postfix].dx_ddlShape.option().text;
                if (ShapeName == "RBC") {
                    JewelleryTranscationView.variables.DetailsControlsList[postfix].dx_txtLength.option({ value: data.component.option().value });
                }
                if (data.component.option().value)
                    JewelleryTranscationView.GetCharniAutoSelected(postfix);
            },
        }).dxValidator({
            validationGroup: "UpdateItemDetails",
            validationRules: [{
                type: "required",
                message: "Width is required"
            }]
        }).dxTextBox("instance");

        JewelleryTranscationView.variables.DetailsControlsList[postfix].dx_txtPieces = $("#dx_txtPieces" + postfix).dxTextBox({
            mode: "number",
            min: 1,
            value: 1,
            onFocusOut: function (data) {
                if (JewelleryTranscationView.variables.DetailsControlsList[postfix].dx_txtCharni.option().selectedItem
                        && JewelleryTranscationView.variables.DetailsControlsList[postfix].dx_txtItemName.option().selectedItem.rmgroup == "MATERIAL") {
                    var wgt = JewelleryTranscationView.variables.DetailsControlsList[postfix].dx_txtCharni.option().selectedItem.weight || 0;
                    JewelleryTranscationView.variables.DetailsControlsList[postfix].dx_txtWeight.option({ value: parseFloat(wgt * (JewelleryTranscationView.variables.DetailsControlsList[postfix].dx_txtPieces.option().value || 1)).toFixed(3) });
                }
                JewelleryTranscationView.CalcTotalWgts();
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

        JewelleryTranscationView.variables.DetailsControlsList[postfix].dx_txtWeight = $("#dx_txtWeight" + postfix).dxTextBox({
            mode: "number",
            onFocusOut: function (data) {
                JewelleryTranscationView.CalcTotalWgts();
            },
            onKeyDown: function (e) {
                //if (((e.event.key == "Tab" || e.event.key == "Enter") && e.event.shiftKey == false) && e.element.closest("tr").is(":last-child"))
                //    JewelleryTranscationView.AddNewLineDetails();

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

        JewelleryTranscationView.variables.DetailsControlsList[postfix].dx_txtRate = $("#dx_txtRate" + postfix).dxTextBox({
            mode: "number",
            onFocusOut: function (data) {
                if (JewelleryTranscationView.variables.DetailsControlsList[postfix].dx_txtItemName.option().selectedItem.rmgroup == 'METAL'
                        || JewelleryTranscationView.variables.DetailsControlsList[postfix].dx_txtItemName.option().selectedItem.rmgroup == 'MATERIAL') {
                    var val = JewelleryTranscationView.variables.DetailsControlsList[postfix].dx_txtWeight.option().value * JewelleryTranscationView.variables.DetailsControlsList[postfix].dx_txtRate.option().value;
                    JewelleryTranscationView.variables.DetailsControlsList[postfix].dx_txtAmt.option({ value: parseFloat(val).toFixed(2) });
                }
                else {
                    var Rate = +JewelleryTranscationView.variables.DetailsControlsList[postfix].dx_txtRate.option().value;
                    var Amt = 0;

                    if (JewelleryTranscationView.variables.DetailsControlsList[postfix].dx_txtItemName.option().selectedItem.rmcate == 'MAKING') {
                        var rowData = JewelleryTranscationView.variables.dx_dataGridItems.getVisibleRows()[JewelleryTranscationView.variables.dx_dataGridItems.getRowIndexByKey(+JewelleryTranscationView.variables.JI_ID)].data;

                        if (rowData.labouron == "FIXED") {
                            Amt = Rate;
                        }
                        else if (rowData.labouron == "GROSS WEIGHT") {
                            Amt = +JewelleryTranscationView.variables.dx_txtGrossWgt.option().value * Rate;
                        }
                        else if (rowData.labouron == "NET WEIGHT") {
                            Amt = +JewelleryTranscationView.variables.dx_txtNetWgt.option().value * Rate;
                        }
                        else if (rowData.labouron == "NET WEIGHT + GEMS WEIGHT") {
                            Amt = (+JewelleryTranscationView.variables.dx_txtNetWgt.option().value + (+JewelleryTranscationView.variables.dx_txtDiaCrt.option().value * 0.2)) * Rate;
                        }
                        else {
                            Amt = Rate;
                        }
                    }
                    else {
                        Amt = Rate;
                    }

                    JewelleryTranscationView.variables.DetailsControlsList[postfix].dx_txtAmt.option({ value: parseFloat(Amt).toFixed(2) });
                }
            },
            onKeyDown: function (e) {
                if (((e.event.key == "Tab" || e.event.key == "Enter") && e.event.shiftKey == false) && e.element.closest("tr").is(":last-child"))
                    JewelleryTranscationView.AddNewLineDetails();

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

        JewelleryTranscationView.variables.DetailsControlsList[postfix].dx_txtAmt = $("#dx_txtAmt" + postfix).dxTextBox({
            mode: "number",
            readOnly: true,
            onFocusOut: function (data) {

            }
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
            JewelleryTranscationView.variables.DetailsControlsList[postfix].dx_txtItemName.option({
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

            JewelleryTranscationView.variables.DetailsControlsList[postfix].dx_ddlShape.option({
                selectedItem: { shapeid: obj.shapeid, shape: (obj.shape || "--") },
                value: obj.shapeid,
            });
            JewelleryTranscationView.variables.DetailsControlsList[postfix].dx_ddlQuality.option({
                selectedItem: { purityid: obj.purityid, purity: obj.purity || "--" },
                value: obj.purityid,
            });
            JewelleryTranscationView.variables.DetailsControlsList[postfix].dx_ddlColor.option({
                selectedItem: { colourid: obj.colourid, colour: obj.colour || "--" },
                value: obj.colourid,
            });
            JewelleryTranscationView.variables.DetailsControlsList[postfix].dx_txtCharni.option({
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
            JewelleryTranscationView.variables.DetailsControlsList[postfix].dx_txtLength.option({ value: obj.lenghtmmsize });
            JewelleryTranscationView.variables.DetailsControlsList[postfix].dx_txtWidth.option({ value: obj.widthmmsize });
            JewelleryTranscationView.variables.DetailsControlsList[postfix].dx_txtPieces.option({ value: obj.pieces });
            JewelleryTranscationView.variables.DetailsControlsList[postfix].dx_txtWeight.option({ value: obj.weight });
            JewelleryTranscationView.variables.DetailsControlsList[postfix].dx_txtRate.option({ value: obj.rate });
            JewelleryTranscationView.variables.DetailsControlsList[postfix].dx_txtAmt.option({ value: obj.amount });
        }
        /*----------------------Set Value of Detail table controls while Edit---------------------*/

    },

    EditItemDetail: function (ji_id) {
        if (JewelleryTranscationView.variables.Oper == "Edit" && !isU()) {
            DevExVariables.Toaster("warning", "You are not authorized for editing this form.");
            return;
        }

        $("#tbl_DesignDetails tbody").html("");
        JewelleryTranscationView.variables.JI_ID = ji_id;

        var myfilter = { rules: [] };
        myfilter.rules.push({ field: "JI_ID", op: "eq", data: ji_id });

        $.ajax({
            url: getDomain() + JewelleryTranscationView.variables.BindJewelleryDesignDetailsUrl + "&myfilters=" + JSON.stringify(myfilter),
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
                            JewelleryTranscationView.AddNewLineDetails(obj);
                        });
                        JewelleryTranscationView.CalcTotalWgts();
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

    CopyJewelleryItem: function (ji_id) {
        JewelleryTranscationView.variables.JI_ID = ji_id;
        JewelleryTranscationView.variables.dx_popupItemCopy.show();
    },

    InsertItemCopies: function () {
        if (JewelleryTranscationView.variables.dx_txtNumOfCopy.option().value <= 0) {
            DevExVariables.Toaster("warning", "Please enter number greater than 0.");
            return;
        }

        var data = {
            "JI_ID": JewelleryTranscationView.variables.JI_ID,
            "COPYCOUNT": JewelleryTranscationView.variables.dx_txtNumOfCopy.option().value,
            "SBOOKID": JewelleryTranscationView.variables.dx_ddlSubBookMaster.option().value,
            //"VOUCHERNO": JewelleryTranscationView.variables.dx_txtVoucherNo.option().text,
            //"VOUCHERRETURN": JewelleryTranscationView.variables.dx_txtVoucherReturn.option().value,
            "DUEDAY": JewelleryTranscationView.variables.dx_txtDueDays.option().value,
            "VOUCHERTYPE": JewelleryTranscationView.variables.dx_ddlVoucherType.option().value,
            "VOUCHERDATE": JewelleryTranscationView.variables.dx_txtVoucherDate.option().text,
            "SALESMANID": JewelleryTranscationView.variables.dx_ddlOrderby.option().value,
            "TAXPROFILEID": JewelleryTranscationView.variables.dx_TaxProfile.option().value,
            //"LOCKERID": JewelleryTranscationView.variables.dx_ddllocker.option().value,
            "ACCID": JewelleryTranscationView.variables.dx_txtPartyName.option().selectedItem.accid,
            "PARTYBILLNO": JewelleryTranscationView.variables.dx_txtPartyBillNo.option().value,
            "CURRENCYID": JewelleryTranscationView.variables.dx_ddlCurrencyName.option().value,
            "EXCHANGERATE": JewelleryTranscationView.variables.dx_txtExchangeRate.option().value,
            "BILLADDR_ADDRESS": JewelleryTranscationView.variables.dx_ddlBillingAddress.option().value,
            "SHIPADDR_ADDRESS": JewelleryTranscationView.variables.dx_ddlShippingAddress.option().value,
            //"BROKERID": JewelleryTranscationView.variables.dx_ddlBroker.option().value,
            "BROKERAGE": JewelleryTranscationView.variables.dx_txtBrokerage.option().value || 0,
            "NOTES": JewelleryTranscationView.variables.dx_txtRemarks.option().value,
            "ROUNDOFF": JewelleryTranscationView.variables.txtRoundOff.option().value || 0,
            "ROUNDOFFTYPE": $("[name='rd_RoundOff']:checked").val(),
            //"FREIGHTCHARGES": JewelleryTranscationView.variables.txtFreightCharges.option().value, 
            "ISFINALSUBMIT": 0,
            "JT_ID": JewelleryTranscationView.variables.Masterid,
            "oper": JewelleryTranscationView.variables.Oper,
            "OPER_TYPE": "Item_Copy"
        }

        if (JewelleryTranscationView.variables.dx_ddlSubBookMaster.option().selectedItem.subbook == "Jewellery Export")
            data.ISMIXEXPORT = JewelleryTranscationView.variables.dx_SwitchIsMixExport.option().value;

        if (JewelleryTranscationView.variables.dx_ddllocker.option().value)
            data.LOCKERID = JewelleryTranscationView.variables.dx_ddllocker.option().value;

        if (JewelleryTranscationView.variables.dx_ddlBillingAddress.option().value) {
            data.BILLINGADDRESSID = JewelleryTranscationView.variables.dx_ddlBillingAddress.option().value;
        }

        if (JewelleryTranscationView.variables.dx_ddlShippingAddress.option().value) {
            data.SHIPPINGADDRESSID = JewelleryTranscationView.variables.dx_ddlShippingAddress.option().value;
        }

        if (JewelleryTranscationView.variables.dx_ddlBroker.option().value)
            data.BROKERID = JewelleryTranscationView.variables.dx_ddlBroker.option().value;

        if (JewelleryTranscationView.variables.txtFreightCharges.option().value)
            data.FREIGHTCHARGES = JewelleryTranscationView.variables.txtFreightCharges.option().value;

        $.ajax({
            url: getDomain() + JewelleryTranscationView.variables.PerformMasterOperationUrl,
            data: data,
            async: false,
            cache: false,
            type: 'POST',
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    DevExVariables.Toaster("success", 'Item copied successfully.');

                    JewelleryTranscationView.variables.JI_ID = "";
                    JewelleryTranscationView.variables.dx_popupItemCopy.hide();
                    JewelleryTranscationView.variables.dx_dataGridItems.refresh();

                }
                else {
                    DevExVariables.InvalidResponseCode(data);
                }
            },
            error: OnError,
        });
    },

    UpdateSingleItem: function (ji_id, obj) {
        var data = {
            "JI_ID": ji_id,
            "GOODSSIZE": obj.goodssize,
            "SBOOKID": JewelleryTranscationView.variables.dx_ddlSubBookMaster.option().value,
            //"VOUCHERNO": JewelleryTranscationView.variables.dx_txtVoucherNo.option().text,
            //"VOUCHERRETURN": JewelleryTranscationView.variables.dx_txtVoucherReturn.option().value,
            "DUEDAY": JewelleryTranscationView.variables.dx_txtDueDays.option().value,
            "VOUCHERTYPE": JewelleryTranscationView.variables.dx_ddlVoucherType.option().value,
            "VOUCHERDATE": JewelleryTranscationView.variables.dx_txtVoucherDate.option().text,
            "SALESMANID": JewelleryTranscationView.variables.dx_ddlOrderby.option().value,
            "TAXPROFILEID": JewelleryTranscationView.variables.dx_TaxProfile.option().value,
            //"LOCKERID": JewelleryTranscationView.variables.dx_ddllocker.option().value,
            "ACCID": JewelleryTranscationView.variables.dx_txtPartyName.option().selectedItem.accid,
            "PARTYBILLNO": JewelleryTranscationView.variables.dx_txtPartyBillNo.option().value,
            "CURRENCYID": JewelleryTranscationView.variables.dx_ddlCurrencyName.option().value,
            "EXCHANGERATE": JewelleryTranscationView.variables.dx_txtExchangeRate.option().value,
            "BILLADDR_ADDRESS": JewelleryTranscationView.variables.dx_ddlBillingAddress.option().value,
            "SHIPADDR_ADDRESS": JewelleryTranscationView.variables.dx_ddlShippingAddress.option().value,
            "BROKERID": JewelleryTranscationView.variables.dx_ddlBroker.option().value,
            "BROKERAGE": JewelleryTranscationView.variables.dx_txtBrokerage.option().value,
            "NOTES": JewelleryTranscationView.variables.dx_txtRemarks.option().value,
            "ROUNDOFF": JewelleryTranscationView.variables.txtRoundOff.option().value || 0,
            "ROUNDOFFTYPE": $("[name='rd_RoundOff']:checked").val(),
            "FREIGHTCHARGES": JewelleryTranscationView.variables.txtFreightCharges.option().value,
            "ISFINALSUBMIT": 0,
            //"DESIGNCODEID": JT_ID,
            "JT_ID": JewelleryTranscationView.variables.Masterid,
            "oper": JewelleryTranscationView.variables.Oper,
            "OPER_TYPE": "Item_Update_Single"
        }

        if (JewelleryTranscationView.variables.dx_ddlSubBookMaster.option().selectedItem.subbook == "Jewellery Export")
            data.ISMIXEXPORT = JewelleryTranscationView.variables.dx_SwitchIsMixExport.option().value;

        if (JewelleryTranscationView.variables.dx_ddllocker.option().value)
            data.LOCKERID = JewelleryTranscationView.variables.dx_ddllocker.option().value;

        if (JewelleryTranscationView.variables.dx_ddlBillingAddress.option().value) {
            data.BILLINGADDRESSID = JewelleryTranscationView.variables.dx_ddlBillingAddress.option().value;
        }

        if (JewelleryTranscationView.variables.dx_ddlShippingAddress.option().value) {
            data.SHIPPINGADDRESSID = JewelleryTranscationView.variables.dx_ddlShippingAddress.option().value;
        }

        if (JewelleryTranscationView.variables.dx_ddlBroker.option().value)
            data.BROKERID = JewelleryTranscationView.variables.dx_ddlBroker.option().value;

        $.ajax({
            url: getDomain() + JewelleryTranscationView.variables.PerformMasterOperationUrl,
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

    RegisterItemImageUpload: function (key, btnUpload, DestinationPath) {
        //var oldfilePath = ($("#" + btnView).attr("src")).replace(getDomain(), "");

        $('#' + btnUpload).fileupload({
            url: getDomain() + '/Helpers/Handler/FileUploadHandler.ashx',
            add: function (e, data) {
                JewelleryTranscationView.variables.JI_ID = key;
                JewelleryTranscationView.variables.DestinationPath = DestinationPath;

                if (checkIsValidFile(e.target.accept, data.files[0].type))
                    data.submit();
                else
                    DevExVariables.Toaster('warning', 'Please select only ' + e.target.accept + ' files');
            },
            success: function (response, status) {
                //var FileName = response.substring(response.lastIndexOf("/") + 1);
                //JewelleryTranscationView.uploadItemImage(key, FileName);
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
            "JT_ID": JewelleryTranscationView.variables.Masterid,
            "JI_ID": JewelleryTranscationView.variables.JI_ID,
            "oper": "Edit",
            "IMAGE": FileName,
            "OPER_TYPE": "Upload_Image"
        };

        $.ajax({
            url: getDomain() + JewelleryTranscationView.variables.PerformMasterOperationUrl,
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
                    JewelleryTranscationView.variables.dx_dataGridItems.refresh();
                }
                else {
                    DevExVariables.InvalidResponseCode(data);
                }
            },
            error: OnError,
        });
    },

    openShipInfo: function (id) {
        var rowData = JewelleryTranscationView.variables.dx_dataGrid.getVisibleRows()[JewelleryTranscationView.variables.dx_dataGrid.getRowIndexByKey(+id)].data;
        JewelleryTranscationView.variables.Masterid = id;
        if (rowData.courierid) {
            JewelleryTranscationView.variables.dx_ddlcourier.option({ value: rowData.courierid });
            JewelleryTranscationView.variables.dx_txtPortCode.option({ value: rowData.portcode });
            JewelleryTranscationView.variables.dx_txtShipBillNo.option({ value: rowData.shippbillno });
            JewelleryTranscationView.variables.dx_dtShipDate.option({ value: rowData.shippingdate });
            JewelleryTranscationView.variables.dx_txtTrackingNo.option({ value: rowData.trackingno });
            JewelleryTranscationView.variables.dx_txtTrackingLink.option({ value: rowData.trackinglink });
        }

        if (isU()) {
            JewelleryTranscationView.variables.dx_Ship_btnSubmit.option({ visible: true });
        }
        else {
            JewelleryTranscationView.variables.dx_Ship_btnSubmit.option({ visible: false });
        }

        $("#Modal_ShipInfo").modal("show");
    },

    GenerateEinvoice: function (id) {
        var rowData = JewelleryTranscationView.variables.dx_dataGrid.getVisibleRows()[JewelleryTranscationView.variables.dx_dataGrid.getRowIndexByKey(+id)].data;
        JewelleryTranscationView.variables.Masterid = id;

        var myfilter = { rules: [] };
        myfilter.rules.push({ field: "SALESINVOICEID", op: "eq", data: JewelleryTranscationView.variables.Masterid });

        $.ajax({
            url: getDomain() + JewelleryTranscationView.variables.CreateEinvoice + "&myfilters=" + JSON.stringify(myfilter),
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

                    DevExVariables.Toaster("success", 'E-Invoice Generated successfully.');
                    JewelleryTranscationView.variables.dx_dataGrid.refresh();
                }
                else {
                    DevExVariables.InvalidResponseCode(data);
                    //JewelleryTranscationView.variables.dx_dataGrid.refresh();
                }
            },
            error: OnError,
        });

    },

    CancleEinvoice: function (id) {
        var rowData = JewelleryTranscationView.variables.dx_dataGrid.getVisibleRows()[JewelleryTranscationView.variables.dx_dataGrid.getRowIndexByKey(+id)].data;
        JewelleryTranscationView.variables.Masterid = id;

        var myfilter = { rules: [] };
        myfilter.rules.push({ field: "SALESINVOICEID", op: "eq", data: JewelleryTranscationView.variables.Masterid });

        $.ajax({
            url: getDomain() + JewelleryTranscationView.variables.CancleEinvoiceBill + "&myfilters=" + JSON.stringify(myfilter),
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
                    JewelleryTranscationView.variables.dx_dataGrid.refresh();
                }
                else {
                    DevExVariables.InvalidResponseCode(data);
                    //JewelleryTranscationView.variables.dx_dataGrid.refresh();
                }
            },
            error: OnError,
        });

    },

    btnMasterSubmit_Shipping: function () {
        JewelleryTranscationView.variables.dx_Ship_btnSubmit.option({ disabled: true });

        var data = {
            "COURIERID": JewelleryTranscationView.variables.dx_ddlcourier.option().value,
            "PORTCODE": JewelleryTranscationView.variables.dx_txtPortCode.option().value,
            "SHIPPBILLNO": JewelleryTranscationView.variables.dx_txtShipBillNo.option().value,
            "SHIPPINGDATE": JewelleryTranscationView.variables.dx_dtShipDate.option().text,
            "TRACKINGNO": JewelleryTranscationView.variables.dx_txtTrackingNo.option().value,
            "TRACKINGLINK": JewelleryTranscationView.variables.dx_txtTrackingLink.option().value,
            "OPER_TYPE": "Shipping_Info",
            "oper": 'Edit',
            "JT_ID": JewelleryTranscationView.variables.Masterid
        }

        $.ajax({
            url: getDomain() + JewelleryTranscationView.variables.PerformMasterOperationUrl,
            data: data,
            async: true,
            cache: false,
            type: 'POST',
            beforeSend: function () {
                dx_LoaderTrinity.show();
            },
            complete: function () {
                dx_LoaderTrinity.hide();
                JewelleryTranscationView.variables.dx_Ship_btnSubmit.option({ disabled: false });
            },
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    DevExVariables.Toaster("success", 'Record is updated successfully.');
                    $("#Modal_ShipInfo").modal("hide");
                    DevExpress.validationEngine.resetGroup("ShipInfo");

                    JewelleryTranscationView.variables.Masterid = "";
                    JewelleryTranscationView.variables.dx_dtShipDate.option({ value: new Date() });

                    JewelleryTranscationView.variables.dx_dataGrid.refresh();
                }
                else {
                    DevExVariables.InvalidResponseCode(data);
                }
            },
            error: OnError,
        });
    },

    deleteAttachment: function (rid, file) {
        JewelleryTranscationView.variables.deletedFiles += file + ',';
        $('#' + rid).remove();
        $('.tooltip').remove();
    },

    OnSelectVoucherReturn: function (obj) {
        JewelleryTranscationView.variables.dx_ddlVoucherType.option({ value: obj.vouchertype });
        JewelleryTranscationView.variables.dx_ddllocker.option({ value: obj.lockermasterid });
        JewelleryTranscationView.variables.dx_txtPartyName.option({
            items: [{ accid: obj.accid, accountname: obj.accountname, partycode: obj.partycode, currencyid: obj.currencyid }],
            selectedItem: { accid: obj.accid, accountname: obj.accountname, partycode: obj.partycode, currencyid: obj.currencyid },
            value: obj.accountname
        });
        //JewelleryTranscationView.variables.dx_txtPartyCode.option({ value: obj.partycode });
        JewelleryTranscationView.variables.dx_txtPartyBillNo.option({ value: obj.partybillno });
        JewelleryTranscationView.variables.dx_txtDueDays.option({ value: obj.duedays });
        JewelleryTranscationView.variables.dx_TaxProfile.option({ value: obj.taxprofileid });
        JewelleryTranscationView.variables.dx_ddlCurrencyName.option({ value: obj.currencyid });
        JewelleryTranscationView.variables.dx_txtExchangeRate.option({ value: obj.exchangerate });
        JewelleryTranscationView.variables.dx_ddlBillingAddress.option({ value: obj.billingaddressid });
        JewelleryTranscationView.variables.dx_ddlShippingAddress.option({ value: obj.shippingaddressid });
        JewelleryTranscationView.variables.dx_ddlBroker.option({ value: obj.brokerid });
        JewelleryTranscationView.variables.dx_txtBrokerage.option({ value: obj.brokerage });
        JewelleryTranscationView.variables.dx_ddlcourier.option({ value: obj.courierid });

        JewelleryTranscationView.variables.txtFreightCharges.option({ value: obj.freightcharges });
        if (obj.roundofftype == "Add")
            $("#rd_Add").prop("checked", true);
        else
            $("#rd_Less").prop("checked", true);

        $("#modal_ReturnItems").modal("show");
    },

    ClearShareItemControlls: function () {
        JewelleryTranscationView.variables.dx_txtSharetoPartyList.option({ "value": "" }, { "items": "" }, { "selectedItem": "" });
        JewelleryTranscationView.variables.dx_RadioSocial.option({ value: "WhatsApp" });
        JewelleryTranscationView.variables.dx_txtVoucherMobileNo.option({ value: "" });
        JewelleryTranscationView.variables.dx_txtShareMessage.option({ value: 'Dear sir, Some Jewellery Designs are shared by Trinity Jewells with you. Kindly click on below URL to view shared Designs. {SHARE URL}' });
        JewelleryTranscationView.variables.dx_txtSharingSubject.option({ value: "Jewellery Designs shared by TrinityJewells" });
        JewelleryTranscationView.variables.dx_txtSharingEmailBody.option({ value: JewelleryTranscationView.variables.content });
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
        var Type = JewelleryTranscationView.variables.dx_RadioSocial.option().value;
        if (Type == "E-Mail") {
            if (!JewelleryTranscationView.variables.dx_txtSharingEmailId.option().value || !JewelleryTranscationView.variables.dx_txtSharingSubject.option().value || !JewelleryTranscationView.variables.dx_txtSharingEmailBody.option().value) {
                DevExVariables.Toaster("warning", "Email Id, Subject and Email Body are required.");
                return false;
            }
        }
        else {
            if (!JewelleryTranscationView.variables.dx_txtVoucherMobileNo.option().value || !JewelleryTranscationView.variables.dx_txtShareMessage.option().value) {
                DevExVariables.Toaster("warning", "Mobile No and Message are required.");
                return false;
            }
        }
        var MobileNo = "", MSG = "", Mailbody = "", MailId = "", Subject = "";

        if (Type == "E-Mail") {
            MailId = JewelleryTranscationView.variables.dx_txtSharingEmailId.option().value;
            Subject = JewelleryTranscationView.variables.dx_txtSharingSubject.option().value;
            Mailbody = JewelleryTranscationView.variables.dx_txtSharingEmailBody.option().value;
        }
        else if (Type == "SMS") {
            MobileNo = JewelleryTranscationView.variables.dx_txtVoucherMobileNo.option().value;
            MSG = JewelleryTranscationView.variables.dx_txtShareMessage.option().value;
        }
        else {
            MSG = JewelleryTranscationView.variables.dx_txtShareMessage.option().value;
        }

        var ShareLink = getERPDomain() + "/Sharing/VoucherView?VoucherId=" + JewelleryTranscationView.variables.Masterid + "/VoucherType=JewelleryTransaction";
        var message = "";
        if (Type == "E-Mail") {
            message = Mailbody.replace("{SHARE URL}", '<a href="' + ShareLink + '" target="_blank">Click here...</a>');
        }
        else {
            message = MSG.replace("{SHARE URL}", ShareLink);
        }
        var result = JewelleryTranscationView.ShareSocialMedia(Type, MobileNo, message, MailId, Subject);
        if (result == true) {
            $("#ModalSharing").modal("hide");
            if (JewelleryTranscationView.variables.IsfromCart == true) {
                JewelleryTranscationView.variables.dx_gridSelectionItem_CartList.clearSelection();
            }
            else {
                JewelleryTranscationView.variables.dx_dataGrid.clearSelection();
            }
        }
        JewelleryTranscationView.ClearShareItemControlls();
        $("#ModalSharing").modal("hide");
    },

};

$(document).ready(function () {
    JewelleryTranscationView.InitializeMainGridView();
    JewelleryTranscationView.FormInitialize();

    JewelleryTranscationView.BindSubBookList();
    JewelleryTranscationView.BindLockerList();
    JewelleryTranscationView.BindTaxProfile();
    JewelleryTranscationView.BindCurrencyList();
    JewelleryTranscationView.GetBrokerAndCourierList();
    JewelleryTranscationView.GetCountryList();
    JewelleryTranscationView.GetItemCategory();

    JewelleryTranscationView.GetUserName();
    JewelleryTranscationView.variables.dx_ddlOrderby.option({ value: Number(getUserId()) });

    JewelleryTranscationView.GetRmCodeList();
    JewelleryTranscationView.GetRmShapeList();
    JewelleryTranscationView.GetRmPurityList();
    JewelleryTranscationView.GetRmColorList();
    JewelleryTranscationView.GetLabList();

    JewelleryTranscationView.GetJewSize();

    JewelleryTranscationView.variables.dx_popupItemRemove = $('#dx_popupItemRemove').dxPopup({
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
                    JewelleryTranscationView.RemoveItemFromList();
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
                    JewelleryTranscationView.variables.dx_popupItemRemove.hide();
                },
            },
        }],
    }).dxPopup('instance');

    JewelleryTranscationView.variables.dx_popupItemCopy = $('#dx_popupItemCopy').dxPopup({
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
            JewelleryTranscationView.variables.dx_txtNumOfCopy = $("#dx_txtNumOfCopy").dxNumberBox({
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
                    JewelleryTranscationView.InsertItemCopies();
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
                    JewelleryTranscationView.variables.dx_popupItemCopy.hide();
                    JewelleryTranscationView.variables.JI_ID = "";
                },
            },
        }],
    }).dxPopup('instance');

    $("#lnk_AddNewRow").click(function () {
        JewelleryTranscationView.AddNewLineDetails();
    });

    $("#Modal_AddItems").on("shown.bs.modal", function () {
        JewelleryTranscationView.AddNewLineDetails();
    });

    $("#modal_StockItems").on("shown.bs.modal", function () {
        if (JewelleryTranscationView.variables.dx_dataGridStockItems) {
            JewelleryTranscationView.variables.dx_dataGridStockItems.refresh();
        }
        else {
            JewelleryTranscationView.variables.dx_dataGridStockItems = $("#dx_dataGridStockItems").dxDataGrid({
                dataSource: new DevExpress.data.CustomStore({
                    key: "rownum",
                    load: function (loadOptions) {
                        var deferred = $.Deferred();

                        var myfilter = { rules: [] };
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
                            url: getDomain() + JewelleryTranscationView.variables.BindStockUrl + "&" + parameters.join("&") + "&myfilters=" + JSON.stringify(myfilter),
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
                        var rowData = JewelleryTranscationView.variables.dx_dataGridStockItems.getVisibleRows()[JewelleryTranscationView.variables.dx_dataGridStockItems.getRowIndexByKey(key)].data;
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
                            //JewelleryTranscationView.variables.dx_dataGridStockItems.cellValue(JewelleryTranscationView.variables.dx_dataGridStockItems.getRowIndexByKey(key), "amt", amt);
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
                    refreshMode: 'repaint',
                },
                columnMinWidth: 70,
                columns: [{ dataField: "rownum", allowSorting: false, visible: true, allowEditing: false },
                        { dataField: "rmcode", caption: "RM Code", dataType: "number", allowSorting: false, allowFiltering: true, filterOperations: ["contains"], allowEditing: false },
                        { dataField: "rmcate", caption: "Category", dataType: "string", allowSorting: false, allowFiltering: true, filterOperations: ["contains"], allowEditing: false },
                        { dataField: "rmsubcate", caption: "Sub Category", dataType: "string", allowSorting: false, allowFiltering: true, filterOperations: ["contains"], allowEditing: false },
                        { dataField: "shape", caption: "Shape", dataType: "string", allowSorting: false, allowFiltering: true, filterOperations: ["contains"], allowEditing: false },
                        { dataField: "purity", caption: "Purity", dataType: "string", allowSorting: false, allowFiltering: true, filterOperations: ["contains"], allowEditing: false },
                        { dataField: "colour", caption: "Color", dataType: "string", allowSorting: false, allowFiltering: true, filterOperations: ["contains"], allowEditing: false },
                        { dataField: "cut", caption: "Cut", dataType: "string", allowSorting: false, allowFiltering: true, filterOperations: ["contains"], allowEditing: false },
                        { dataField: "length", caption: "Length", dataType: "string", allowSorting: false, allowFiltering: true, filterOperations: ["contains"], allowEditing: false },
                        { dataField: "width", caption: "Width", dataType: "string", allowSorting: false, allowFiltering: true, filterOperations: ["contains"], allowEditing: false },
                        { dataField: "charni", caption: "Charni", dataType: "string", allowSorting: false, allowFiltering: true, filterOperations: ["contains"], allowEditing: false },
                        { dataField: "purityper", caption: "Purity Per", dataType: "number", allowSorting: false, allowFiltering: true, filterOperations: ["contains"], allowEditing: false },
                        { dataField: "pcs", caption: "Stock Pcs", dataType: "number", allowSorting: false, allowFiltering: false, allowEditing: false },
                        { dataField: "wgt", caption: "Stock Wgt", dataType: "number", allowSorting: false, allowFiltering: false, allowEditing: false },
                        {
                            dataField: "inspcs", caption: "Pcs", dataType: "number", allowSorting: false, allowFiltering: false, allowEditing: true,
                            validationRules: [{
                                type: "required",
                                message: "Pcs is required."
                            }, {
                                type: "custom",
                                validationCallback: JewelleryTranscationView.validatePcsWithStock,
                                message: "value should neither be less than 0 nor be greater than Stock Pcs."
                            }]
                        },
                        {
                            dataField: "inswgt", caption: "Wgt", dataType: "number", allowSorting: false, allowFiltering: false, allowEditing: true,
                            validationRules: [{
                                type: "required",
                                message: "Wgt is required."
                            }, {
                                type: "custom",
                                validationCallback: JewelleryTranscationView.validateWgtWithStock,
                                message: "value should neither be less than 0 nor be greater than Stock Wgt."
                            }],
                            setCellValue: function (newData, value, currentRowData) {
                                newData.inswgt = value;
                                newData.amt = ((currentRowData.rate || 0) * (value || 0)).toFixed(2);
                            }
                        },
                        {
                            dataField: "rate", caption: "Rate", dataType: "number", allowSorting: false, allowFiltering: false, allowEditing: true,
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
                        { dataField: "amt", caption: "Amt", dataType: "number", allowSorting: false, allowFiltering: false, allowEditing: false },
                        {
                            dataField: "less", caption: "Less", dataType: "number", allowSorting: false, allowFiltering: false, allowEditing: true,
                            validationRules: [{
                                type: "range",
                                min: 0,
                                message: "Less should be greater than 0."
                            }]
                        },
                ],
                onSelectionChanged(selectedItems) {
                    if (selectedItems.selectedRowKeys.length > 0) {
                        //JewelleryTranscationView.variables.dx_btnPrintItem.option({ disabled: false });
                    }
                    else {
                        //JewelleryTranscationView.variables.dx_btnPrintItem.option({ disabled: true });
                    }
                },
            }).dxDataGrid("instance");
        }
    });

    $("#modal_ReturnItems").on("shown.bs.modal", function () {
        if (JewelleryTranscationView.variables.dx_dataGridReturnItems) {
            JewelleryTranscationView.variables.dx_dataGridReturnItems.refresh();
        }
        else {
            JewelleryTranscationView.variables.dx_dataGridReturnItems = $("#dx_dataGridReturnItems").dxDataGrid({
                dataSource: new DevExpress.data.CustomStore({
                    key: "ji_id",
                    load: function (loadOptions) {
                        var deferred = $.Deferred();

                        var myfilter = { rules: [] };
                        myfilter.rules.push({ field: "JT_ID", op: "eq", data: JewelleryTranscationView.variables.dx_txtVoucherReturn.option().selectedItem.jt_id });
                        myfilter.rules.push({ field: "PENDINGRETURN", op: "eq", data: true });

                        if (JewelleryTranscationView.variables.dx_ddlSubBookMaster.option().selectedItem.subbook == "Jewellery Sale") {
                            myfilter.rules.push({ field: "STATUS", op: "eq", data: 'AVAILABLE' });
                        }
                        else if (JewelleryTranscationView.variables.dx_ddlSubBookMaster.option().selectedItem.subbook == "Jewellery Export") {
                            myfilter.rules.push({ field: "STATUS", op: "eq", data: 'AVAILABLE' });
                        }
                        else if (JewelleryTranscationView.variables.dx_ddlSubBookMaster.option().selectedItem.subbook == "Jewellery sale Return") {
                            myfilter.rules.push({ field: "STATUS", op: "eq", data: 'SOLD' });
                        }

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
                            url: getDomain() + JewelleryTranscationView.variables.BindJewelleryItemDetailsUrl + "&" + parameters.join("&") + "&myfilters=" + JSON.stringify(myfilter),
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
                    allowUpdating: false,
                    allowAdding: false,
                    allowDeleting: false,
                    refreshMode: 'repaint',
                },
                columnMinWidth: 70,
                columns: [{ dataField: "ji_id", allowSorting: false, visible: false, allowEditing: false },
                        { dataField: "jt_id", allowSorting: false, visible: false, allowEditing: false },
                        { dataField: "designcode", caption: "Code", dataType: "string", allowSorting: false, allowFiltering: true, filterOperations: ["contains"], allowEditing: false },
                        { dataField: "bagno", caption: "BagNo", dataType: "string", allowSorting: false, allowFiltering: true, filterOperations: ["contains"], allowEditing: false },
                        { dataField: "grosswgt", caption: "Gross Wt", dataType: "number", allowSorting: false, allowFiltering: true, filterOperations: ["contains"], allowEditing: false },
                        { dataField: "mwgt", caption: "Net Wgt", dataType: "number", allowSorting: false, allowFiltering: true, filterOperations: ["contains"], allowEditing: false },
                        { dataField: "dpcs", caption: "DPcs", dataType: "number", allowSorting: false, allowFiltering: false, allowEditing: false },
                        { dataField: "dwgt", caption: "DCarat", dataType: "number", allowSorting: false, allowFiltering: false, allowEditing: false },
                        { dataField: "amount", caption: "Amount", dataType: "number", allowSorting: false, allowFiltering: true, filterOperations: ["contains"], allowEditing: false },
                ],
            }).dxDataGrid("instance");
        }
    });

    $("#lnkAttachFilePreview").click(function () {
        var url = $("#lnkAttachFilePreview").attr("FileName");
        if (isDW())
            window.open(url);
        else
            DevExVariables.Toaster("warning", "You do not have permission to open the file, please contact to administrator.");
    });

    $("#Modal_UpdateMaterialRate").on("shown.bs.modal", function () {
        if (JewelleryTranscationView.variables.dx_dataGrid_MaterialRate) {
            JewelleryTranscationView.variables.dx_dataGrid_MaterialRate.refresh();
        }
        else {
            JewelleryTranscationView.variables.dx_dataGrid_MaterialRate = $("#dx_dataGrid_MaterialRate").dxDataGrid({
                dataSource: new DevExpress.data.CustomStore({
                    key: "rownum",
                    load: function (loadOptions) {
                        var deferred = $.Deferred();

                        var SelectedItemList = [];
                        SelectedItemList = JewelleryTranscationView.variables.dx_dataGridItems.option().selectedRowKeys;

                        var myfilter = { rules: [] };
                        myfilter.rules.push({ field: "JT_ID", op: "eq", data: JewelleryTranscationView.variables.Masterid });
                        myfilter.rules.push({ field: "SELECTED_JI_ID", op: "eq", data: SelectedItemList.toString() });
                        var result;

                        $.ajax({
                            url: getDomain() + JewelleryTranscationView.variables.BindJewelleryMaterialRateUrl + "&myfilters=" + JSON.stringify(myfilter),
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
                        JewelleryTranscationView.variables.dx_btnUpdateMatRate.option({ disabled: false });
                    }
                    else {
                        JewelleryTranscationView.variables.dx_btnUpdateMatRate.option({ disabled: true });
                    }
                },
            }).dxDataGrid("instance");
        }

    });

    $("[name='rd_RoundOff']").change(function () {
        JewelleryTranscationView.calcRoundOff();
    });

    JewelleryTranscationView.RegisterFileUpload('inputCADFile', 'lnkCADFilePreview', "#ItemimgError");

    $("#inputItemImage").click(function () {
        JewelleryTranscationView.variables.ImageUploadType = "Single";
    });

    $("#btnSave_VoucherReturn").click(function () {
        var temp = false;
        $("#tbl_Voucher_return_Body .chkReturn").each(function (key, obj) {
            if ($(obj).prop("checked")) {
                temp = true;
            }
        });
        if (temp) {
            var mtd_id = ''
            $("#tbl_Voucher_return_Body tr .chkReturn:checked").each(function (key, obj) {
                mtd_id += $(obj).closest("tr").find('.mtd_id').html() + ',';
            });
            var mtd_id1 = mtd_id.replace(/,\s*$/, "");
            $("#mtd_id1").html(mtd_id1);
            $("#modal_Voucher_Return2").modal('hide');
            var myfilter = { rules: [] };
            myfilter.rules.push({ field: "MTD_ID", op: "eq", data: mtd_id1 });
            $.ajax({
                url: getDomain() + JewelleryTranscationView.variables.BindDetailListUrl_Return + "&myfilters=" + JSON.stringify(myfilter),
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
                        $("#tbl_DesignList_tbody").html("");
                        JewelleryTranscationView.variables.DetailsControlsList = [];
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
                                JewelleryTranscationView.AddNewLineDetails(obj);
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
        else {
            notificationMessage('Warning', 'Please Select at list One Jewellery', 'warning');
        }
    });
    $("#txtAdjustAmount").on('blur', function () {
        JewelleryTranscationView.calAdjustAmount();
    });
    $("#lnkCADFilePreview").click(function () {
        var url = $("#lnkCADFilePreview").attr("FileName")
        if (isDW())
            window.open(url);
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
                                                module: JewelleryTranscationView.variables.DestinationPath
                                            },
                                            success: function (result) {
                                                var FileName = response.substring(response.lastIndexOf("/") + 1);
                                                JewelleryTranscationView.uploadItemImage(FileName);
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
                        '<a href="javascript:void(0);" onclick="JewelleryTranscationView.deleteAttachment(\'' + file + '\',\'' + strHref + '\');" class="btn btn-danger"><i class="fa fa-trash"></i></a>' +
                    '</td>' +
                '</tr>');
            }
        });

        $('#modalUpload').modal('hide');
    });

    $("#MixExportLabel").html('');
    JewelleryTranscationView.variables.dx_SwitchIsMixExport.option({ visible: false });

    if (+$("#hdnSBOOKID").val()) {
        $("#pnlView").hide();
        $("#frm_JewelleryTransaction").show();
        JewelleryTranscationView.variables.Masterid = "";

        JewelleryTranscationView.variables.dx_ddlSubBookMaster.option({ value: +$("#hdnSBOOKID").val() });
        JewelleryTranscationView.variables.dx_ddlSubBookMaster.option({ disabled: true });

        if (JewelleryTranscationView.variables.dx_ddlSubBookMaster.option().selectedItem) {
            if (['Jewellery Export'].indexOf(JewelleryTranscationView.variables.dx_ddlSubBookMaster.option().selectedItem.subbook) !== -1) {
                JewelleryTranscationView.variables.dx_SwitchIsMixExport.option({ visible: true });
                $("#MixExportLabel").html('Mix Export?');
            }
            else {
                JewelleryTranscationView.variables.dx_SwitchIsMixExport.option({ visible: false });
                $("#MixExportLabel").html('');
            }
        }

        if (JewelleryTranscationView.variables.dx_ddlSubBookMaster.option().selectedItem) {
            if (['Jewellery Purchase'].indexOf(JewelleryTranscationView.variables.dx_ddlSubBookMaster.option().selectedItem.subbook) !== -1) {
                JewelleryTranscationView.variables.dx_txtVoucherReturn.option({ disabled: true });
                JewelleryTranscationView.variables.dx_ddlBillingAddress.option({ disabled: true });
                JewelleryTranscationView.variables.dx_ddlShippingAddress.option({ disabled: true });
                JewelleryTranscationView.variables.dx_ddlShippingAddress.option("value", "");
                JewelleryTranscationView.variables.dx_ddlBillingAddress.option("value", "");
                JewelleryTranscationView.variables.dx_ddllocker.option({ disabled: false });
                JewelleryTranscationView.variables.dx_txtSearch.option({ visible: true });
                JewelleryTranscationView.variables.dx_txtPrdSearch.option({ visible: false });
                JewelleryTranscationView.variables.dx_btnUpdateItem.option({ visible: true });
                JewelleryTranscationView.variables.dx_dataGridItems.columnOption("Size", "allowEditing", true);
                JewelleryTranscationView.variables.dx_dataGridItems.columnOption("Edit", "visible", true);
            }
            else if (['Jewellery Sale', 'JEWELLERY APPROVAL'].indexOf(JewelleryTranscationView.variables.dx_ddlSubBookMaster.option().selectedItem.subbook) !== -1) {
                JewelleryTranscationView.variables.dx_txtVoucherReturn.option({ disabled: true });
                JewelleryTranscationView.variables.dx_dataGridItems.columnOption("Edit", "visible", false);
                JewelleryTranscationView.variables.dx_dataGridItems.columnOption("Size", "allowEditing", false);
                JewelleryTranscationView.variables.dx_txtPrdSearch.option({ visible: true });
                JewelleryTranscationView.variables.dx_txtSearch.option({ visible: false });
                JewelleryTranscationView.variables.dx_ddlBillingAddress.option({ disabled: false });
                JewelleryTranscationView.variables.dx_ddlShippingAddress.option({ disabled: false });
                JewelleryTranscationView.variables.dx_ddllocker.option({ disabled: true });
            }
            else if (['Jewellery Purchase Return'].indexOf(JewelleryTranscationView.variables.dx_ddlSubBookMaster.option().selectedItem.subbook) !== -1) {
                JewelleryTranscationView.variables.dx_ddlBillingAddress.option({ disabled: true });
                JewelleryTranscationView.variables.dx_ddlShippingAddress.option({ disabled: true });
                JewelleryTranscationView.variables.dx_ddlShippingAddress.option("value", "");
                JewelleryTranscationView.variables.dx_ddlBillingAddress.option("value", "");
                JewelleryTranscationView.variables.dx_txtVoucherReturn.option({ disabled: false });
                JewelleryTranscationView.variables.dx_dataGridItems.columnOption("Edit", "visible", false);
                JewelleryTranscationView.variables.dx_dataGridItems.columnOption("Size", "allowEditing", false);
                JewelleryTranscationView.variables.dx_ddllocker.option({ disabled: true });
                JewelleryTranscationView.variables.dx_txtSearch.option({ visible: false });
                JewelleryTranscationView.variables.dx_txtPrdSearch.option({ visible: false });
                JewelleryTranscationView.variables.dx_btnUpdateItem.option({ visible: false });
            }
            else {
                JewelleryTranscationView.variables.dx_txtVoucherReturn.option({ disabled: false });
                JewelleryTranscationView.variables.dx_ddlBillingAddress.option({ disabled: false });
                JewelleryTranscationView.variables.dx_ddlShippingAddress.option({ disabled: false });
                JewelleryTranscationView.variables.dx_ddllocker.option({ disabled: true });
                JewelleryTranscationView.variables.dx_txtSearch.option({ visible: false });
                JewelleryTranscationView.variables.dx_txtPrdSearch.option({ visible: false });
                JewelleryTranscationView.variables.dx_btnUpdateItem.option({ visible: false });
                JewelleryTranscationView.variables.dx_dataGridItems.columnOption("Size", "allowEditing", false);
                JewelleryTranscationView.variables.dx_dataGridItems.columnOption("Edit", "visible", false);
            }
        }
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

}

function VoucherShare(id) {
    JewelleryTranscationView.variables.Masterid = id;
    JewelleryTranscationView.ClearShareItemControlls();
    $("#ModalSharing").modal('show');
}