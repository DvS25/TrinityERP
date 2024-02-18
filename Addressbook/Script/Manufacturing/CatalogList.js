var CataloglistView = {
    variables: {
        BindSelectionListUrl: "/Common/BindMastersDetails?ServiceName=PRD_SELECTIONLIST_GET",
        BindSelectionListItemsUrl: "/Common/BindMastersDetails?ServiceName=PRD_SELECTIONLIST_ITEMS_GET",
        BindAccListUrl: "/Common/BindMastersDetails?ServiceName=ACCOUNTMASTER_GET",
        PerformMasterelctionCRUD: "/Common/OpeartionsOnMaster?ServiceName=ACC_CATALOG_TO_QUOTATION_CRUD",
        PerformOrderMasterCRUD: "/Common/OpeartionsOnMaster?ServiceName=ACC_CATALOG_TO_ORDER_CRUD",
        PerformDesignSharingurl: "/Common/OpeartionsOnMaster?ServiceName=PRD_DESIGNSHARING_CRUD",
        dx_gridSelectionList: "",
        dx_dataGrid: "",
        dx_txtAutoComplite_PartyList: "",
        dx_catalogtool: "",
        dx_txtCatalogSharingEmailId: "",
        dx_txtCatalogMobileNo: "",
        dx_gridSelectionItemList: "",
        dx_CatalogRadioSocial: "",
        dx_txtCatalogShareMessage: "",
        dx_txtCatalogSharingSubject: "",
        dx_txtCatalogSharingEmailBody: "",
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

    initDevExgridSelList: function () {
        CataloglistView.variables.dx_gridSelectionList = $("#dx_gridSelectionList").dxDataGrid({
            dataSource: new DevExpress.data.CustomStore({
                key: "listid",
                load: function (loadOptions) {
                    var deferred = $.Deferred();

                    var result = DevExVariables.GetDataList(loadOptions, CataloglistView.variables.BindSelectionListUrl);

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
                mode: 'infinite'
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
                         temp += '<span class="btn btn-default" style="padding: 2px 6px;" onclick=\'CataloglistView.ViewSelListItems("' + options.key + '");\'><i class="fa fa-list"></i></span>';

                         //if (isU())
                         //    temp += '<span class="btn btn-primary" style="padding: 2px 6px;margin-left:5px;" onclick=\'CataloglistView.SelListTriggerId("' + options.key + '");\'><i class="fa fa-pencil"></i></span>';

                         //if (isD())
                         //    temp += '<span class="btn btn-danger" style="padding: 2px 6px;margin-left:5px;" onclick=\'CataloglistView.SelListDeleteRow("' + options.key + '");\'><i class="fa fa-trash-o"></i></span>';

                         $(temp).appendTo(container);
                     }
                 },
            ],
        }).dxDataGrid("instance");
    },

    ViewSelListItems: function (id) {
        CataloglistView.variables.Golabal_QoutationList = "";
        $("#panel_CatalogList").hide();
        $("#panel_CatalogItemList").show();
        CataloglistView.variables.dx_txtAutoComplite_PartyList.option({ "value": "" }, { "items": "" }, { "selectedItem": "" });
        CataloglistView.initDevExgridSelItemList(id);
        CataloglistView.variables.dx_gridSelectionItemList.clearSelection();
    },

    initDevExgridSelItemList: function (ListId) {
        CataloglistView.variables.dx_gridSelectionItemList = $("#dx_gridSelectionItemList").dxDataGrid({
            dataSource: new DevExpress.data.CustomStore({
                key: "listitemid",
                load: function (loadOptions) {
                    var deferred = $.Deferred();

                    var url = CataloglistView.variables.BindSelectionListItemsUrl + "&_search=true&searchField=LISTID&searchOper=eq&searchString=" + ListId;
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
                mode: 'infinite'
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

    FormInitialize: function () {
        /*------------------------------Catalog options----------------------------*/
        CataloglistView.variables.dx_txtAutoComplite_PartyList = $("#dx_txtAutoComplite_PartyList").dxAutocomplete({
            placeholder: "Select Party Name...",
            mode: "search",
            dataSource: new DevExpress.data.CustomStore({
                load: function (loadOptions) {
                    var deferred = $.Deferred();
                    $.ajax({
                        url: getDomain() + CataloglistView.variables.BindAccListUrl + "&_search=true&searchField=ACCOUNTNAME&searchOper=cn&searchString=" + loadOptions.searchValue,
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
                    CataloglistView.variables.dx_txtCatalogSharingEmailId.option({ value: data.selectedItem.emailid });
                    CataloglistView.variables.dx_txtCatalogMobileNo.option({ value: data.selectedItem.mobile1 });
                }
                else {
                    CataloglistView.variables.dx_txtCatalogSharingEmailId.option("value", "");
                    CataloglistView.variables.dx_txtCatalogMobileNo.option("value", "");
                }
            },
        }).dxAutocomplete("instance");
        CataloglistView.variables.dx_catalogtool = $("#dx_catalogtool").dxToolbar({
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
                            if (CataloglistView.variables.dx_gridSelectionItemList.option().selectedRowKeys.length > 0) {

                                if (!CataloglistView.variables.dx_txtAutoComplite_PartyList.option().selectedItem) {
                                    DevExVariables.Toaster("warning", "Party Name is required.");
                                    return;
                                }

                                var DesignIdList = [];
                                $(CataloglistView.variables.dx_gridSelectionItemList.getSelectedRowsData()).each(function (key, obj) {
                                    DesignIdList.push(obj.dm_id);
                                });

                                data = {
                                    "oper": "add",
                                    "ACCID": CataloglistView.variables.dx_txtAutoComplite_PartyList.option().selectedItem.accid,
                                    "DM_ID_LIST": DesignIdList.toString(),
                                }

                                $.ajax({
                                    url: getDomain() + CataloglistView.variables.PerformMasterelctionCRUD,
                                    data: data,
                                    async: false,
                                    cache: false,
                                    type: 'POST',
                                    success: function (data) {
                                        if ($(data).find('RESPONSECODE').text() == "0") {
                                            DevExVariables.Toaster("success", 'Quotation: ' + $(data).find('QUOTATIONCODE').text() + ' Generated Successfully.');
                                            CataloglistView.variables.dx_gridSelectionItemList.clearSelection();
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
                            if (CataloglistView.variables.dx_gridSelectionItemList.option().selectedRowKeys.length > 0) {
                                if (!CataloglistView.variables.dx_txtAutoComplite_PartyList.option().selectedItem) {
                                    DevExVariables.Toaster("warning", "Party Name is required.");
                                    return;
                                }

                                var DesignIdList = [];
                                $(CataloglistView.variables.dx_gridSelectionItemList.getSelectedRowsData()).each(function (key, obj) {
                                    DesignIdList.push(obj.dm_id);
                                });

                                data = {
                                    "oper": "add",
                                    "ACCID": CataloglistView.variables.dx_txtAutoComplite_PartyList.option().selectedItem.accid,
                                    "DM_ID_LIST": DesignIdList.toString(),
                                }

                                $.ajax({
                                    url: getDomain() + CataloglistView.variables.PerformOrderMasterCRUD,
                                    data: data,
                                    async: false,
                                    cache: false,
                                    type: 'POST',
                                    success: function (data) {
                                        if ($(data).find('RESPONSECODE').text() == "0") {
                                            DevExVariables.Toaster("success", 'Order: ' + $(data).find('ORDERCODE').text() + ' Generated Successfully.');
                                            CataloglistView.variables.dx_gridSelectionItemList.clearSelection();
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
                            if (!CataloglistView.variables.dx_txtAutoComplite_PartyList.option().selectedItem) {
                                DevExVariables.Toaster("warning", "Party Name is required.");
                                return;
                            }

                            if (CataloglistView.variables.dx_gridSelectionItemList.option().selectedRowKeys.length > 0) {
                         
                                $("#ModalSelectionList").modal("show");
                                CataloglistView.ClearShareCatalogControlls();
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
                            if (CataloglistView.variables.dx_gridSelectionItemList.option().selectedRowKeys.length > 0) {
                                CataloglistView.variables.SelListSelectedItems = CataloglistView.variables.dx_gridSelectionItemList.option().selectedRowKeys;
                                CataloglistView.variables.dx_popupSelListItemsDelete = $("#dx_popupSelListDelete").dxPopup(CataloglistView.variables.DeleteSelListItemsOptions).dxPopup("instance");
                                CataloglistView.variables.dx_popupSelListItemsDelete.show();
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
                            $("#panel_CatalogList").show();
                            $("#panel_CatalogItemList").hide();
                            CataloglistView.variables.dx_gridSelectionList.refresh();
                        }
                    }
                },
            ]
        }).dxToolbar("instance");
        CataloglistView.variables.dx_txtCatalogSharingEmailId = $("#dx_txtCatalogSharingEmailId").dxTextBox({ placeholder: "Enter Email Id..." }).dxTextBox("instance");
        CataloglistView.variables.dx_txtCatalogMobileNo = $("#dx_txtCatalogMobileNo").dxTextBox({ mode: "number" }).dxTextBox("instance");
        CataloglistView.variables.dx_CatalogRadioSocial = $("#dx_CatalogRadioSocial").dxRadioGroup({
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
        CataloglistView.variables.dx_txtCatalogShareMessage = $("#dx_txtCatalogShareMessage").dxTextArea({
            height: 90,
            value: 'Dear Sir, ' + $("#hdn_UserName").val() + ' shared a design from TrinityJewells with you. Kindly click on below URL to view shared Design. {SHARE URL}',
        }).dxTextArea("instance");
        CataloglistView.variables.dx_txtCatalogSharingSubject = $("#dx_txtCatalogSharingSubject").dxTextBox({
            value: "Jewellery Designs shared by TrinityJewells"
        }).dxTextBox("instance");
        CataloglistView.variables.dx_txtCatalogSharingEmailBody = $("#dx_txtCatalogSharingEmailBody").dxHtmlEditor({
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
            value: CataloglistView.variables.content,
            onValueChanged: function (e) {
                //$(".value-content").text(e.component.option("value"));
            }
        }).dxHtmlEditor("instance");
        CataloglistView.variables.dx_btnCatalogSubmitShare = $("#dx_btnCatalogSubmitShare").dxButton({
            stylingMode: "outlined",
            icon: "fa fa-paper-plane",
            text: "Send",
            type: "default",
            useSubmitBehavior: false,
            visible: true,
            onClick: function (e) {
                CataloglistView.SaveCatalogSharingDetails();
            }
        }).dxButton("instance");
        CataloglistView.variables.dx_btnCancel = $("#dx_btnCancel").dxButton({
            stylingMode: "outlined",
            icon: "close",
            text: "Cancel",
            type: "danger",
            useSubmitBehavior: false,
            visible: true,
            onClick: function (e) {
                $("#ModalSelectionList").modal("hide");
            }
        }).dxButton("instance");
        /*------------------------------/ Catalog options----------------------------*/

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

    SaveCatalogSharingDetails: function () {
        var Type = CataloglistView.variables.dx_CatalogRadioSocial.option().value;
        if (Type == "E-Mail") {
            if (!CataloglistView.variables.dx_txtCatalogSharingEmailId.option().value || !CataloglistView.variables.dx_txtCatalogSharingSubject.option().value || !CataloglistView.variables.dx_txtCatalogSharingEmailBody.option().value) {
                DevExVariables.Toaster("warning", "Email Id, Subject and Email Body are required.");
                return false;
            }
        }
        else {
            if (!CataloglistView.variables.dx_txtCatalogMobileNo.option().value || !CataloglistView.variables.dx_txtCatalogShareMessage.option().value) {
                DevExVariables.Toaster("warning", "Mobile No and Message are required.");
                return false;
            }
        }

        var SelectedDesignList = [], MobileNo = "", MSG = "", Mailbody = "", MailId = "", Suject = "";
        SelectedDesignList = CataloglistView.variables.dx_gridSelectionItemList.option().selectedRowKeys;
        var data = {
            "SHARETYPE": Type,
            "PARTYACCID": CataloglistView.variables.dx_txtAutoComplite_PartyList.option().selectedItem.accid,
            "DESIGNIDS": SelectedDesignList.toString(),
            "oper": "add",
        }
        if (Type == "E-Mail") {
            Mailbody = CataloglistView.variables.dx_txtCatalogSharingEmailBody.option().value;
            MailId = CataloglistView.variables.dx_txtCatalogSharingEmailId.option().value;
            Suject = CataloglistView.variables.dx_txtCatalogSharingSubject.option().value;
            data.EMAILID = MailId;
            data.EMAILSUBJECT = Suject;
            data.EMAILBODY = Mailbody;
        }
        else if (Type == "SMS") {
            MobileNo = CataloglistView.variables.dx_txtCatalogMobileNo.option().value;
            MSG = CataloglistView.variables.dx_txtCatalogShareMessage.option().value;
            data.MOBILENO = MobileNo;
            data.MESSAGE = MSG;
        }
        else {
            MSG = CataloglistView.variables.dx_txtCatalogShareMessage.option().value;
            data.MESSAGE = MSG;
        }

        $.ajax({
            url: getDomain() + CataloglistView.variables.PerformDesignSharingurl,
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
                    var result = CataloglistView.ShareSocialMedia(Type, MobileNo, message, MailId, Suject);
                    if (result == true) {
                        $("#ModalSelectionList").modal("hide");
                        CataloglistView.variables.dx_gridSelectionItemList.clearSelection();
                    }
                }
                else {
                    DevExVariables.Toaster("error", $(data).find("RESPONSEMESSAGE").text());
                }
            },
            error: OnError
        });
    },

    ClearShareCatalogControlls: function () {
        CataloglistView.variables.dx_CatalogRadioSocial.option({ value: "WhatsApp" });
        CataloglistView.variables.dx_txtCatalogShareMessage.option({ value: 'Dear Sir, ' + $("#hdn_UserName").val() + ' shared a design from TrinityJewells with you. Kindly click on below URL to view shared Design. {SHARE URL}' });
        CataloglistView.variables.dx_txtCatalogSharingSubject.option({ value: "Jewellery Designs shared by TrinityJewells" });
        CataloglistView.variables.dx_txtCatalogSharingEmailBody.option({ value: CataloglistView.variables.content });
    },

    
}

$(document).ready(function () {
    CataloglistView.FormInitialize();
    CataloglistView.initDevExgridSelList();
});