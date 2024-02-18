var Master_PartyView = {
    variables: {
        BindGroupListUrl: "/Common/BindMastersDetails?ServiceName=SALES_WHOLESELLER_DETAILS_GET",
        PerformMasterOperationUrl: "/Common/OpeartionsOnMaster?ServiceName=SALES_WHOLESELLER_DETAILS_CRUD",
        GetSateIdFromCityIdUrl: "/Common/BindMastersDetails?ServiceName=MASTER_COUNTRY_STATE_CITY_GET&ColumnRequested=ID",
        Oper: 'Add',
        addedit: "added",
        Masterid: "",
        chkFmatter: function (cellvalue, options, rowObject) {
            if (cellvalue == 'FALSE' || cellvalue == '0' || cellvalue == undefined)
                return '<span class="label label-danger" style="font-size: 100%; !important">Disabled</span>';
            else
                return '<span class="label label-success" style="font-size: 100%; !important">Enabled</span>';
        },
        chkStausFmatter: function (cellvalue, options, rowObject) {
            if (cellvalue == 'Expired' || cellvalue == '0' || cellvalue == undefined)
                return '<span class="label label-danger" style="font-size: 100%; !important">' + cellvalue + '</span>';
            else if (cellvalue == 'Active')
                return '<span class="label label-success" style="font-size: 100%; !important">' + cellvalue + '</span>';
        },
    },
    //====Bind PartnerProfile on pageload===========================================================//    
    initializeJqgrid: function () {

        colNames = ['WSID', 'Party Code', 'Party Code Hide', 'Party Sname', 'Company Name', 'Account Status', 'App Status', 'Web Status', 'ERP Party code', 'Person Name', 'User Name', 'Password', 'Email Id', 'Contact No', 'Mobile no', 'CityId', 'City', 'DistrictId'
            , 'District', 'StateId', 'State', 'ContryId', 'Contry', 'GST No', 'PAN No', 'Address', 'Month from', 'Month to', 'Party Type', 'Account Active Till Date', 'Account Active Till Time', 'Default Diamond Color', 'Default Diamond Purity', 'DEFAULTCONCEPT_OF', 'Consider in Gross Wtg', 'WebActiveTillDate', 'WebActiveTillTime', 'POLICY'],
        colModel = [
                    { name: "WSID", index: "WSID", xmlmap: xmlvars.common_colmap + "WSID", search: false, hidden: true },
                    {
                        name: "PARTYCODE", index: "PARTYCODE", width: 30, xmlmap: xmlvars.common_colmap + "PARTYCODE", search: true, hidden: false,
                        formatter: function (cv, op, ro) {
                            return '<a href="javascript:void(0);" onclick="Master_PartyView.triggerId(\'' + $(ro).find('WSID').text() + '\',\'edit\');">' + cv + '</a>';
                        }, searchoptions: jqGridVariables.stringSearchOption
                    },
                    { name: "PARTYHIDECODE", index: "PARTYHIDECODE", xmlmap: xmlvars.common_colmap + "PARTYCODE", search: true, hidden: true, searchoptions: jqGridVariables.stringSearchOption },
                    { name: "SNAME", index: "SNAME", xmlmap: xmlvars.common_colmap + "SNAME", search: false, hidden: true },
                    { name: "COMPANY", width: 60, index: "COMPANY", xmlmap: xmlvars.common_colmap + "COMPANY", search: true, searchoptions: jqGridVariables.stringSearchOption },
                    { name: "ACCOUNT_STATUS", index: "ACCOUNT_STATUS", align: "center", width: 30, xmlmap: xmlvars.common_colmap + "ACCOUNT_STATUS", sortable: false, search: false, formatter: function (cv, op, ro) { return Master_PartyView.variables.chkFmatter(cv, op, ro, 'Master_PartyView') } },
                    { name: "APPSTATUS", index: "APPSTATUS", align: "center", width: 30, xmlmap: xmlvars.common_colmap + "APPSTATUS", sortable: false, search: false, formatter: function (cv, op, ro) { return Master_PartyView.variables.chkStausFmatter(cv, op, ro, 'Master_PartyView') } },
                    { name: "WEBSTATUS", index: "WEBSTATUS", align: "center", width: 30, xmlmap: xmlvars.common_colmap + "WEBSTATUS", sortable: false, search: false, formatter: function (cv, op, ro) { return Master_PartyView.variables.chkStausFmatter(cv, op, ro, 'Master_PartyView') } },
                    { name: "ERPPARTYCODE", index: "ERPPARTYCODE", width: 35, align: "center", xmlmap: xmlvars.common_colmap + "ERPPARTYCODE", search: true, sortable: false, searchoptions: jqGridVariables.stringSearchOption },
                    { name: "CONTACTPERSONNAME", index: "CONTACTPERSONNAME", xmlmap: xmlvars.common_colmap + "CONTACTPERSONNAME", search: true, searchoptions: jqGridVariables.stringSearchOption, hidden: true },
                    { name: "USERNAME", index: "USERNAME", width: 35, xmlmap: xmlvars.common_colmap + "USERNAME", search: true, hidden: false, searchoptions: jqGridVariables.stringSearchOption },
                    { name: "PASSWORD", index: "PASSWORD", xmlmap: xmlvars.common_colmap + "PASSWORD", search: false, hidden: true },
                    { name: "EMAILID", index: "EMAILID", hidden: true, xmlmap: xmlvars.common_colmap + "EMAILID", search: false },
                    { name: "CONTACTNO", width: 35, index: "CONTACTNO", xmlmap: xmlvars.common_colmap + "CONTACTNO", search: false, sortable: false },
                    { name: "MOBILE", index: "MOBILE", width: 35, xmlmap: xmlvars.common_colmap + "MOBILE", search: false, sortable: false },
                    { name: "CITY", index: "CITY", xmlmap: xmlvars.common_colmap + "CITY", search: false, hidden: true },
                    { name: "CITYNAME", width: 25, index: "CITYNAME", xmlmap: xmlvars.common_colmap + "CITYNAME", search: true, hidden: false, searchoptions: jqGridVariables.stringSearchOption },
                    { name: "DISTRICT", index: "DISTRICT", xmlmap: xmlvars.common_colmap + "DISTRICT", search: false, hidden: true },
                    { name: "DISTRICTNAME", index: "DISTRICTNAME", xmlmap: xmlvars.common_colmap + "DISTRICTNAME", search: true, hidden: true, searchoptions: jqGridVariables.stringSearchOption },
                    { name: "STATE", index: "STATE", xmlmap: xmlvars.common_colmap + "STATE", search: false, hidden: true },
                    { name: "STATENAME", index: "STATENAME", width: 25, xmlmap: xmlvars.common_colmap + "STATENAME", search: true, searchoptions: jqGridVariables.stringSearchOption },
                    { name: "COUNTRY", index: "COUNTRY", xmlmap: xmlvars.common_colmap + "COUNTRY", search: false, hidden: true },
                    { name: "CONTRYNAME", index: "CONTRYNAME", xmlmap: xmlvars.common_colmap + "CONTRYNAME", search: false, hidden: true },
                    { name: "GSTNO", index: "GSTNO", hidden: true, xmlmap: xmlvars.common_colmap + "GSTNO", search: false, sortable: false },
                    { name: "PANNO", hidden: true, index: "PANNO", xmlmap: xmlvars.common_colmap + "PANNO", search: false, sortable: false },
                    { name: "ADDRESS", index: "ADDRESS", xmlmap: xmlvars.common_colmap + "ADDRESS", search: false, hidden: true },
                    { name: "MONTH_FROM", index: "MONTH_FROM", xmlmap: xmlvars.common_colmap + "MONTH_FROM", search: false, hidden: true },
                    { name: "MONTH_TO", index: "MONTH_TO", xmlmap: xmlvars.common_colmap + "MONTH_TO", search: false, hidden: true },
                    { name: "PARTYTYPE", index: "PARTYTYPE", xmlmap: xmlvars.common_colmap + "PARTYTYPE", search: false, hidden: true },
                    { name: "LOGINTIMEDURATION", index: "LOGINTIMEDURATION", width: 3, xmlmap: xmlvars.common_colmap + "LOGINTIMEDURATION", search: false, hidden: true },
                    { name: "LOGINTIME", index: "LOGINTIME", xmlmap: xmlvars.common_colmap + "LOGINTIME", search: false, hidden: true },
                    { name: "DEFAULTDIAMONDCOLOR", index: "DEFAULTDIAMONDCOLOR", xmlmap: xmlvars.common_colmap + "DEFAULTDIAMONDCOLOR", search: false, hidden: true },
                    { name: "DEFAULTDIAMONDPURITY", index: "DEFAULTDIAMONDPURITY", xmlmap: xmlvars.common_colmap + "DEFAULTDIAMONDPURITY", search: false, hidden: true },
                    { name: "DEFAULTCONCEPT_OF", index: "DEFAULTCONCEPT_OF", xmlmap: xmlvars.common_colmap + "DEFAULTCONCEPT_OF", search: false, hidden: true },
                    { name: "CONSIDERINGROSSWGT", index: "CONSIDERINGROSSWGT", xmlmap: xmlvars.common_colmap + "CONSIDERINGROSSWGT", search: false, hidden: true },
                    { name: "WEBACTIVETILLDATE", index: "WEBACTIVETILLDATE", xmlmap: xmlvars.common_colmap + "WEBACTIVETILLDATE", search: false, hidden: true },
                    { name: "WEBACTIVETILLTIME", index: "WEBACTIVETILLTIME", xmlmap: xmlvars.common_colmap + "WEBACTIVETILLTIME", search: false, hidden: true },
                    { name: "POLICY", index: "POLICY", xmlmap: xmlvars.common_colmap + "POLICY", search: false, hidden: true },
        ];
        if (isU()) {
            colNames.push('Edit');
            colModel.push({ name: 'edit', index: 'edit', width: 10, sortable: false, align: "center", search: false, formatter: function (cv, op, ro) { return jqGridVariables.editBtnFmatter(cv, op, ro, 'Master_PartyView', 'edit') } });
        } else if (isV()) {
            colNames.push('Edit');
            colModel.push({ name: 'edit', index: 'edit', width: 25, sortable: false, align: "center", search: false, formatter: function (cv, op, ro) { return jqGridVariables.editBtnFmatter(cv, op, ro, 'Master_PartyView', 'view') } });
        }
        if (isD()) {
            colNames.push('Delete');
            colModel.push({ name: 'act', index: 'act', width: 25, sortable: false, align: "center", search: false, formatter: function (cv, op, ro) { return jqGridVariables.deleteBtnFmatter(cv, op, ro, 'Master_PartyView') } });
        }
        $("#table_list_PartyDetails").jqGrid({

            url: getDomain() + Master_PartyView.variables.BindGroupListUrl,
            datatype: "xml",
            height: '100%',
            autowidth: true,
            shrinkToFit: true,
            rowNum: 25,
            rowList: [25, 50, 100],
            colNames: colNames,
            colModel: colModel,
            pager: "#pager_list_PartyDetails",
            xmlReader: {
                root: xmlvars.common_root,
                row: xmlvars.common_row,
                page: xmlvars.common_response + "CURRENTPAGE",
                total: xmlvars.common_response + "TOTALPAGES",
                records: xmlvars.common_response + "TOTALRECORDS",
                repeatitems: false,
                id: "WSID"
            },
            loadComplete: function () {
                $("tr.jqgrow:even").addClass('myAltRowClass');
                $("#table_list_PartyDetails").jqGrid('setGridHeight', $(window).innerHeight() - 170 - ($("#gbox_table_list_PartyDetails").height() - $('#gbox_table_list_PartyDetails .ui-jqgrid-bdiv').height()));

                // Hide column headers and top pager if no records were returned
                if ($('#table_list_PartyDetails').getGridParam('records') == 0)
                    $('.ui-jqgrid-htable').hide();
                else
                    $('.ui-jqgrid-htable').show();

                var width = $('#jqgrid_party').width();
                if (width <= 430) {
                    width = 595;
                }
                $('#table_list_PartyDetails').setGridWidth(width);

            },
            loadError: OnJqloadError,
            beforeProcessing: OnJqbeforeProcessingErrorcheck,
            viewrecords: true,
            hidegrid: false,
            sortname: 'WSID',
            sortorder: 'desc',
        });

        // Setup buttons
        $("#table_list_PartyDetails").jqGrid('navGrid', '#pager_list_PartyDetails',
            { edit: false, add: false, del: false, search: true },
            { height: 320 }
    );
        $("#pager_list_PartyDetails").css("width", "");
        AlignJqGridHeader('table_list_PartyDetails', ['edit', 'ACCOUNT_STATUS', 'act', 'ERPPARTYCODE', 'APPSTATUS', 'WEBSTATUS']);

    },

    triggerId: function (id, oper) {
        BindDropdownState('txtstatename', 'DdlStateList', "/Common/BindMastersDetails?ServiceName=MASTER_COUNTRY_STATE_CITY_GET&ColumnRequested=STATE&ISRECORDALL=true&sidx=STATENAME&sord=asc", 'Select State');
        BindDropdownCountry('txtcontryname', 'DdlCountryList', "/Common/BindMastersDetails?ServiceName=MASTER_COUNTRY_STATE_CITY_GET&ColumnRequested=COUNTRY&ISRECORDALL=true&sidx=COUNTRYNAME&sord=asc", 'Select Country');
        //BindDropdown('ddldiamoncolor', 'DataDiamondcolor', "/Common/BindMastersDetails?ServiceName=APP_CUSTOMIZE_MASTER_GET", 'Select Diamond Color', true);
        //BindDropdown('ddldiamondpurity', 'DataDiamondPurity', "/Common/BindMastersDetails?ServiceName=APP_CUSTOMIZE_MASTER_GET", 'Select Diamond Purity', true);
        // Master_PartyView.BindDiamondatalist();
        Master_PartyView.BindRmCode();
        var rowData = jQuery("#table_list_PartyDetails").getRowData(id);
        if (rowData['PARTYTYPE'] == "Party") {
            var partytypename = $("input[name=radioparty][value=" + rowData['PARTYTYPE'] + "]").prop('checked', true);
        }
        else {
            partytypename = $("input[name=radioparty][value=" + rowData['PARTYTYPE'] + "]").prop('checked', true);
        }
        $(".shell span").hide();
        $("#hdnpartydetaisid").val(id);
        $("#txtpartycode").val(rowData['PARTYHIDECODE']);
        $("#txtPartysname").val(rowData['SNAME']);
        $("#txtPersonname").val(rowData['CONTACTPERSONNAME']);
        $("#text_username").val(rowData['USERNAME']);
        $("#text_Userpassword").val(rowData['PASSWORD']);
        $("#txtemailid").val(rowData['EMAILID']);
        $("#txtCompanyName").val(rowData['COMPANY']);
        $("#txtcontactno").val(rowData['CONTACTNO']);
        $("#txtmobileno").val(rowData['MOBILE']);
        $("#txtgstno").val(rowData['GSTNO']);
        $("#txtcityname").val(rowData['CITY']);
        if (rowData['CITY'])
            $('#txtcityname').html("<option value='" + rowData['CITY'] + "'>" + rowData['CITYNAME'] + "</option>");

        $("#txtpanno").val(rowData['PANNO']);
        $("#typeofparty").val(partytypename);
        $("#txtstatename").val(rowData['STATE']);
        $("#txterpcode").val(rowData['ERPPARTYCODE']);
        $('#activeonoff').prop('checked', ($(rowData['ACCOUNT_STATUS']).html() == 'Enabled') ? $('#activeonoff').bootstrapToggle('on') : $('#activeonoff').bootstrapToggle('off'));
        //$("#txtdistrictname").val(rowData['DISTRICT']);
        $("#txtcontryname").val(rowData['COUNTRY']);
        $("#textaddress").val(rowData['ADDRESS']);
        $("#txtmonthfrom").val(rowData['MONTH_FROM']);
        $("#txtmonthto").val(rowData['MONTH_TO']);
        $("#ddlPartyConceptOf").val(rowData['DEFAULTCONCEPT_OF'].split(",")).change();
        $("#ddlDisplayPolicy").val(rowData['POLICY'].split(",")).change();
        /*---Active Till Date---------------------------------------------*/
        $('#txtAppActiveTillDate').datepicker('setDate', rowData['LOGINTIMEDURATION']);
        $("#txtAppActiveTillTime").val(rowData['LOGINTIME']);

        $('#txtWebActiveTillDate').datepicker('setDate', rowData['WEBACTIVETILLDATE']);
        $("#txtWebActiveTillTime").val(rowData['WEBACTIVETILLTIME']);
        /*----------------------------------------------------------------*/
        var selectedValuesTest = rowData["CONSIDERINGROSSWGT"].split(',');
        $('#droprmcode').val(selectedValuesTest).trigger("change");
        if (rowData['CONTRYNAME'] != 'India' || !rowData['CONTRYNAME']) {
            $("#txtstatename").attr('disabled', true);
            $("#txtcityname").attr('disabled', true);
            $("#txtstatename").html("Select State");
            $("#txtcityname").val("");
            $("#txtcityname").select2({
                placeholder: "Search using city name"
            });
        }
        var myfilter = { rules: [] };
        myfilter.rules.push({ field: "WSID", op: "eq", data: id });
        $.ajax({
            url: getDomain() + "/Common/BindMastersDetails?ServiceName=SALES_WHOLESELLER_FILES_GET&myfilters=" + JSON.stringify(myfilter),
            async: false,
            cache: false,
            type: 'GET',
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
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

                    window.domain = getDomain();
                    var JsonObject = xml2json.parser(data);
                    $('#imgPreviewTechnicalData').html("");
                    if (JsonObject.serviceresponse.detailslist != undefined) {

                        window.extension = 'jpg,jpeg,gif,png,pdf';
                        $("#imgPreviewTechnicalData").html($("#FileList").render(JsonObject.serviceresponse.detailslist.details));
                    }

                }
                else {
                    InvalidResponseCode(data);
                }
            },
            error: OnError
        });
        $("#ddldiamoncolor").val(rowData['DEFAULTDIAMONDCOLOR']);
        $("#ddldiamondpurity").val(rowData['DEFAULTDIAMONDPURITY']);
        Master_PartyView.GetMacAddress(id);
        $("#panelEdit").show();
        $("#panelView").hide();
        Master_PartyView.showTitlePermissionWise(oper);
    },
    GetMacAddress: function (id) {
        var myfilter = { rules: [] };
        myfilter.rules.push({ field: "MACTYPE", op: "eq", data: 'MacAddress' });
        myfilter.rules.push({ field: "WSID", op: "eq", data: id });
        $.ajax({
            url: getDomain() + Master_PartyView.variables.BindGroupListUrl + "&myfilters=" + JSON.stringify(myfilter),
            async: false,
            cache: false,
            type: 'GET',
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    var JsonObject = xml2json.parser(data);
                    $("#allowmacipdata").html("");
                    if (JsonObject.serviceresponse.macdetailslist != undefined) {
                        $("#macaddressdiv").show();
                        $("#allowmacipdata").html($("#allowipList").render(JsonObject.serviceresponse.macdetailslist.macdetails));
                    }
                    else {
                        $("#macaddressdiv").hide();
                    }
                }
                else {
                    InvalidResponseCode(data);
                }
            },
            error: OnError
        });
    },
    showTitlePermissionWise: function (oper) {

        if (oper == 'edit' || oper == 'add') {
            $("#partynewaddfilebtn").show();
            $("#btnsavendnext").show();
            $(".permissiondltbtn").show();
            $(".permissincheckbtn").show();
            $(".permissiondltmacbtn").show();
        }
        else {
            if ($("#partynewaddfilebtn").length > 0) {
                $("#partynewaddfilebtn").hide();
            }
            if ($("#btnsavendnext").length > 0) {
                $("#btnsavendnext").hide();
            }
            if ($(".permissiondltbtn").length > 0) {
                $(".permissiondltbtn").hide();
            }
            if ($(".permissincheckbtn").length > 0) {
                $(".permissincheckbtn").hide();
            }
            if ($(".permissiondltmacbtn").length > 0) {
                $(".permissiondltmacbtn").hide();
            }
        }
    },
    deleteRow: function (id) {
        $.confirm({
            'title': 'Delete Party Details',
            'message': 'You are about to delete this Party Detail. It can not be restored at a later time! Continue? ',
            'buttons': {
                'Yes': {
                    'class': 'yes',
                    'action': function () {
                        // delete data to DB
                        var dataP = {
                            WSID: id,
                            oper: 'delete'
                        };
                        $.ajax({
                            url: getDomain() + "/Common/OpeartionsOnMaster?ServiceName=SALES_WHOLESELLER_DETAILS_CRUD",
                            type: "POST",
                            data: dataP,
                            async: false,
                            cache: false,
                            success: function (result) {
                                if ($(result).find('RESPONSECODE').text() == "0") {
                                    notificationMessage('Save Operation', 'Record is deleted successfully', 'success');
                                    $("#table_list_PartyDetails").trigger("reloadGrid", [{ current: true }]);
                                }
                                else
                                    notificationMessage('Error', $(result).find('RESPONSEMESSAGE').text(), 'error');
                            },
                            error: OnError
                        });
                    }
                },
                'No': {
                    'class': 'no',
                    'action': function () {

                    }
                }
            }
        });
    },

    btnMasterSubmit: function () {

        var isValid = $("#frmpartyDetails").valid();

        if ($("#txtAppActiveTillDate").val() == "" || $("#txtAppActiveTillTime").val() == "") {
            isValid = false;
            $("#errortxtAppActiveTillDate").show();
            $("#errortxtAppActiveTillDate").html("This field is required.");
            return;
        }

        if ($("#txtWebActiveTillDate").val() == "" || $("#txtWebActiveTillDate").val() == "") {
            isValid = false;
            $("#errortxtWebActiveTillDate").show();
            $("#errortxtWebActiveTillDate").html("This field is required.");
            return;
        }

        if (!isValid)
            return;
        Master_PartyView.variables.Oper = 'Add';
        Master_PartyView.variables.addedit = "added";
        Master_PartyView.variables.Masterid = $("#hdnpartydetaisid").val();

        if (Master_PartyView.variables.Masterid != "0" && parseInt(Master_PartyView.variables.Masterid) > 0) {
            Master_PartyView.variables.Oper = 'Edit';
            Master_PartyView.variables.addedit = 'updated';
        }

        $('#btnSave').attr('disabled', true);
        Master_PartyView.savedata(Master_PartyView.variables.Oper);
    },

    savedata: function (oper) {
        var bannerImage = $('#imgBanner').attr('src');
        if (bannerImage.indexOf('noImage.png') > -1)
            bannerImage = '';
        var xmlsaveFiles = "<WHOLESELLERFILES>", saveFiles = bannerImage + ',', refrenceFiles = '', priceFiles = '';


        resultXml = makeFileXml('#imgPreviewTechnicalData', 'Picture');
        xmlsaveFiles += resultXml.xmlsaveFiles;
        saveFiles += resultXml.saveFiles;


        xmlsaveFiles += "</WHOLESELLERFILES>";

        if (bannerImage != '')
            bannerImage = bannerImage.substr(bannerImage.lastIndexOf('/') + 1);
        var dataP;

        if ($("#activeonoff").prop("checked") == true) {

            activetoggle = "1";

        } else {
            activetoggle = "0";
        }

        var rmcodes = [];
        $.each($(".assigngrprm option:selected"), function () {
            rmcodes.push($(this).val());
        });

        dataP = {

            XMLPARAM: escape(xmlsaveFiles),
            "oper": oper,
            "WSID": $("#hdnpartydetaisid").val(),
            "SNAME": $("#txtPartysname").val(),
            "CONTACTPERSONNAME": $("#txtPersonname").val(),
            "USERNAME": $("#text_username").val(),
            "PASSWORD": $("#text_Userpassword").val(),
            "COMPANY": $("#txtCompanyName").val(),
            "EMAILID": $("#txtemailid").val(),
            "CONTACTNO": $("#txtcontactno").val(),
            "MOBILE": $("#txtmobileno").val(),
            "GSTNO": $("#txtgstno").val().toUpperCase(),
            "PANNO": $("#txtpanno").val().toUpperCase(),
            "ERPPARTYCODE": $("#txterpcode").val(),
            "ACCOUNT_STATUS": activetoggle,
            "ADDRESS": $("#textaddress").val(),
            "MONTH_FROM": $("#txtmonthfrom").val(),
            "MONTH_TO": $("#txtmonthto").val(),
            "PARTYTYPE": $('input[name=radioparty]:checked').val(),
            "LOGINTIMEDURATION": $('#txtAppActiveTillDate').val(),
            "LOGINTIME": $('#txtAppActiveTillTime').val(),
            "WEBACTIVETILLDATE": $('#txtWebActiveTillDate').val(),
            "WEBACTIVETILLTIME": $('#txtWebActiveTillTime').val(),
            "DEFAULTDIAMONDCOLOR": $('#ddldiamoncolor').val(),
            "DEFAULTDIAMONDPURITY": $('#ddldiamondpurity').val(),
            "DEFAULTCONCEPTOF": $("#ddlPartyConceptOf").val().toString(),
            "CONSIDERINGROSSWGT": rmcodes.join(","),
            "POLICY": $("#ddlDisplayPolicy").val().toString(),
            "ENTRYFROM": "Web"
        };

        dataP.CITY = $('#txtcityname').select2('val');
        //dataP.DISTRICT = $("#txtdistrictname").val();
        dataP.STATE = $("#txtstatename").val();
        dataP.COUNTRY = $("#txtcontryname").val();

        $.ajax({
            type: 'POST',
            async: false,
            cache: false,
            url: getDomain() + "/Common/SaveImage",
            data: {
                category: 'PartyFile',
                deletedfiles: deletedFiles,
                savefiles: saveFiles
            },
            success: function (result) {
                //data.dataP = result;
                //data.UPLOADIMG = result;
                $.ajax({

                    url: getDomain() + Master_PartyView.variables.PerformMasterOperationUrl,
                    data: dataP,
                    async: true,
                    cache: false,
                    type: 'POST',
                    success: Master_PartyView.btnMasterSubmitOnSuccess,
                    error: OnError,
                });

            },
            error: OnError
        });
    },


    btnMasterSubmitOnSuccess: function (data) {
        if ($(data).find('RESPONSECODE').text() == "0") {
            if (Master_PartyView.variables.Oper == 'Delete') {
                OperationMessage("", 'Party deleted successfully', 'success');
            } else {
                OperationMessage("", 'Party detail saved successfully', 'success');
                $('#panelEdit').hide();
                $('#panelView').show();
            }
            Master_PartyView.ClearValues();
            $("#txtcityname").select2({
                placeholder: "Select a City"
            });
            $("#table_list_PartyDetails").trigger("reloadGrid", [{ current: true }]);
        }
        else {
            InvalidResponseCode(data);
        }
        //$('#btnSave').attr('disabled', false);
        //$('#btnDelete').attr('disabled', false);

    },

    ClearValues: function () {
        $("#hdnpartydetaisid").val("");
        $("#droprmcode").html("");
        $("#txtpartycode").val("");
        $("#txtPartysname").val("");
        $("#txtPersonname").val(""),
        $("#text_username").val(""),
        $("#text_Userpassword").val(""),
        $("#txtemailid").val(""),
        $("#txtCompanyName").val(""),
        $("#txtcontactno").val(""),
        $("#txtmobileno").val(""),
        $("#txtgstno").val(""),
        $("#txtcityname").val("");
        $("#txtcityname").val("");
        $("#typeoutlet").prop('checked', true);
        $("#imgPreviewTechnicalData").html("");
        $("#txtpanno").val(""),
        $("#txtstatename").val(""),
        $("#txterpcode").val(""),
        $("#txtcontryname").val(""),
        $("#textaddress").val(""),
        $('#activeonoff').bootstrapToggle('off');
        $("#txtmonthfrom").val(""),
        $("#txtmonthto").val(""),
        $("#allowmacipdata").html("");
        $("#txtAppActiveTillDate").val("");
        $("#txtAppActiveTillTime").val("");
        $("#ddldiamoncolor").val("");
        $("#ddldiamondpurity").val("");
        $("#txtstatename").attr('disabled', false);
        $("#txtcityname").attr('disabled', false);
        $("#txtWebActiveTillDate").val("");
        $("#txtWebActiveTillTime").val("");
        $("#errortxtAppActiveTillDate").hide();
        $("#errortxtWebActiveTillDate").hide();
        $("#macaddressdiv").hide();
        $("#eroor_lablegst").hide();
        $("#eroor_lablepan").hide();
        $('#panelEdit').hide();
        $('#panelView').show();
    },

    CityChange: function (val) {
        var myfilter = { groupOp: "AND", rules: [] };
        myfilter.rules.push({ field: "CITYID", op: "eq", data: val })
        $.ajax({
            url: getDomain() + Master_PartyView.variables.GetSateIdFromCityIdUrl + "&myfilters=" + JSON.stringify(myfilter),
            async: true,
            cache: false,
            type: 'POST',
            success: function (data) {
                $("#txtstatename").val($(data).find('STATEID').text());
                $("#txtcontryname").val($(data).find('COUNTRYID').text());
                //$("#txtdistrictname").val($(data).find('DISTRICTID').text());
            },
            error: OnError,
        });
    },
    BindDiamondatalist: function () {
        url = "/Common/BindMastersDetails?ServiceName=APP_CUSTOMIZE_MASTER_GET";
        $.ajax({
            url: getDomain() + url,
            async: false,
            cache: false,
            type: 'POST',
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    var JsonObject = xml2json.parser(data);
                    if (JsonObject.serviceresponse.diamondcolorlist != undefined) {
                        $("#ddldiamoncolor").html("<option value='' selected disabled hidden >Select Diamond Color</option>");
                        $("#ddldiamoncolor").append($("#DataDiamondcolor").render(JsonObject.serviceresponse.diamondcolorlist.diamondcolor));
                    }
                    if (JsonObject.serviceresponse.diamondqualitylist != undefined) {
                        $("#ddldiamondpurity").html("<option value='' selected disabled hidden >Select Diamond Purity</option>");
                        $("#ddldiamondpurity").append($("#DataDiamondPurity").render(JsonObject.serviceresponse.diamondqualitylist.diamondquality));
                    }
                }
                else {
                    InvalidResponseCode(data);
                }
            },
            error: OnError
        });
        Master_PartyView.BindRmCode();

    },
    BindRmCode: function () {
        var myfilter = { groupOp: "AND", rules: [] };
        myfilter.rules.push({ field: "FLAG", op: "eq", data: 'RMCODE' })
        $("#droprmcode").html("");
        $.ajax({
            url: getDomain() + "/Common/BindMastersDetails?ServiceName=APP_CUSTOMIZE_MASTER_GET&myfilters=" + JSON.stringify(myfilter),
            async: false,
            cache: false,
            type: 'POST',
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    var JsonObject = xml2json.parser(data);
                    if (JsonObject.serviceresponse.rmcodedetailslist != undefined) {
                        $("#droprmcode").append($("#RMcodeDropdownList").render(JsonObject.serviceresponse.rmcodedetailslist.rmcodedetails));
                    }
                }
                else {
                    InvalidResponseCode(data);
                }
            },
            error: OnError
        });
    }
};

var deletedFiles = '';
function deleteFile(rid, fileid, file) {
    $.confirm({
        'title': 'Delete Record',
        'message': 'Are you sure about to delete this ' + $('#' + rid).find('.title').val() + ' file. It can not be restored at a later time! Continue? ',
        'buttons': {
            'Yes': {
                'class': 'yes',
                'action': function () {
                    deletedFiles += file + ',';
                    //$("#hdnpartyimage").val(file);
                    $('#' + rid).remove();
                    $('.tooltip').remove();
                }
            },
            'No': {
                'class': 'no',
                'action': function () {

                }
            }
        }
    });
}
function getFileNameWithoutExt(file) {
    return file.split('.')[0];
}
function makeFileXml(saveDiv, type) {

    var xmlsaveFiles = '', saveFiles = '', strHref = '';
    $(saveDiv).find('tr').each(function (key, obj) {
        strHref = $(obj).find('.label-click').attr('href');
        saveFiles += strHref + ',';
        xmlsaveFiles += '<DETAILS>';
        //xmlsaveFiles += '<FILEID>' + $(obj).find('.fileid').val() + '</FILEID>';
        xmlsaveFiles += '<ACTUALFILENAME><![CDATA[' + $.trim($(obj).find('.title').val()) + ']]></ACTUALFILENAME>';
        xmlsaveFiles += '<VIRTUALFILENAME><![CDATA[' + strHref.substr(strHref.lastIndexOf('/') + 1) + ']]></VIRTUALFILENAME>';
        xmlsaveFiles += '</DETAILS>';
        //xmlsaveFiles += '<SECTIONTYPE><![CDATA[' + type + ']]></SECTIONTYPE></DETAILS>';
    });

    return { xmlsaveFiles: xmlsaveFiles, saveFiles: saveFiles };
}
function registerSingleFileUpload(uploader) {
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
}
function BindDropdownState(ddl, optionList, url, selectText) {
    $.ajax({
        url: getDomain() + url,
        async: false,
        cache: false,
        type: 'POST',
        success: function (data) {

            if ($(data).find('RESPONSECODE').text() == "0") {
                if (selectText != '')
                    $("#" + ddl).html("<option value=''>" + selectText + "</option>");
                else
                    $("#" + ddl).html("");
                var JsonObject = xml2json.parser(data);
                if (JsonObject.serviceresponse.detailslist != undefined) {
                    $.each(JsonObject.serviceresponse.detailslist, function (key, innerjsonDetails) {
                        $("#" + ddl).append($("#" + optionList).render(innerjsonDetails));
                    });
                }
            }
            else {
                InvalidResponseCode(data);
            }
        },
        error: OnError
    });
}
function BindDropdownCountry(ddl, optionList, url, selectText) {

    $.ajax({
        url: getDomain() + url,
        async: false,
        cache: false,
        type: 'POST',
        success: function (data) {

            if ($(data).find('RESPONSECODE').text() == "0") {
                if (selectText != '')
                    $("#" + ddl).html("<option value=''>" + selectText + "</option>");
                else
                    $("#" + ddl).html("");
                var JsonObject = xml2json.parser(data);
                if (JsonObject.serviceresponse.detailslist != undefined) {
                    $.each(JsonObject.serviceresponse.detailslist, function (key, innerjsonDetails) {
                        $("#" + ddl).append($("#" + optionList).render(innerjsonDetails));
                    });
                }
            }
            else {
                InvalidResponseCode(data);
            }
        },
        error: OnError
    });
}
function checkclick(id) {

    $.confirm({
        'title': 'Mac Address Allowance',
        'message': 'You are about to change mac address allowance. Continue? ',
        'buttons': {
            'Yes': {
                'class': 'yes',
                'action': function () {
                    var data = {
                        "MACID": id,
                        "oper": 'editmacaddress',
                        "ISACTIVE": $("#check" + id).is(":checked"),
                    }
                    $.ajax({
                        type: 'POST',
                        url: getDomain() + "/Common/OpeartionsOnMaster?ServiceName=SALES_WHOLESELLER_DETAILS_CRUD",
                        data: data,
                        async: true,
                        cache: false,
                        success: function (data) {
                            if ($(data).find('RESPONSECODE').text() == "0") {
                                OperationMessage("", 'Approval data change successfully', 'success');
                                $("#table_list_MacAddress").trigger("reloadGrid", [{ current: true }]);
                            }
                            else {
                                InvalidResponseCode(data);
                            }
                        }
                    });
                }
            },
            'No': {
                'class': 'no',
                'action': function () {
                    if ($("#check" + id).is(":checked")) {
                        $("#check" + id).prop('checked', false);
                    }
                    else {
                        $("#check" + id).prop('checked', true);
                    }
                }
            }
        }
    });
}
function deletemacaddress(id) {

    $.confirm({
        'title': 'Delete Mac Address',
        'message': 'You are delete this mac address. Continue? ',
        'buttons': {
            'Yes': {
                'class': 'yes',
                'action': function () {
                    var data = {
                        "MACID": id,
                        "oper": 'deletemacaddress',
                    }
                    $.ajax({
                        type: 'POST',
                        url: getDomain() + "/Common/OpeartionsOnMaster?ServiceName=SALES_WHOLESELLER_DETAILS_CRUD",
                        data: data,
                        async: true,
                        cache: false,
                        success: function (data) {
                            if ($(data).find('RESPONSECODE').text() == "0") {
                                OperationMessage("", 'Data Delete successfully', 'success');
                                $('#' + id).remove();
                            }
                            else {
                                InvalidResponseCode(data);
                            }
                        }
                    });
                }
            },
            'No': {
                'class': 'no',
                'action': function () {
                }
            }
        }
    });
}
function BindConceptOf() {
    $.ajax({
        url: getDomain() + "/Common/BindMastersDetails?ServiceName=STATIC_CONCEPTOF_MAS_GET",
        async: false,
        cache: false,
        type: 'POST',
        success: function (data) {
            if ($(data).find('RESPONSECODE').text() == "0") {
                $("#ddlPartyConceptOf").html("");
                var JsonObject = xml2json.parser(data);
                if (JsonObject.serviceresponse.detaillist != undefined) {
                    $("#ddlPartyConceptOf").append($("#DdlConceptOfList").render(JsonObject.serviceresponse.detaillist.detail));
                }
            }
            else {
                InvalidResponseCode(data);
            }
        },
        error: OnError
    });
}
$(document).ready(function () {
    $('.clockpicker').clockpicker();
    $("#txtstatename").attr('disabled', false);
    $("#txtcityname").attr('disabled', false);
    $('#txtcityname').select2();
    $("#txtcityname").select2({
        placeholder: "Select a City"
    });
    $('#droprmcode').select2({
        multiple: true,
    });
    BindConceptOf();
    $('#ddlPartyConceptOf').select2();

    $('#txtcityname').select2({

        placeholder: 'Search using city name',
        minimumInputLength: 2,
        width: "100%",
        ajax: {
            url: getDomain() + "/Common/BindMastersDetails?ServiceName=MASTER_COUNTRY_STATE_CITY_GET&ColumnRequested=CITY",
            dataType: 'xml',
            type: "GET",
            data: function (term, page) {

                var sfilter = { rules: [] };
                if (term.term != undefined) {
                    sfilter.rules.push({ field: "CITY", op: "eq", data: term.term });
                }
                else {
                    sfilter.rules.push({ field: "CITY", op: "eq", data: '' });
                }
                return { myfilters: JSON.stringify(sfilter) };
            },

            processResults: function (data) {

                var push = [];
                if ($(data).find(xmlvars.common_root).text() != '') {
                    var list = $(data).find(xmlvars.common_root).find(xmlvars.common_row);
                    $.each(list, function (index, obj) {
                        push.push({
                            id: $(obj).find('CITYID').text(),
                            text: $(obj).find('CITYNAME').text(),
                        });
                    });
                }
                return { results: push };
            }

        }

    }).on("change", function (e) {

        Master_PartyView.CityChange(this.value);
    });

    $('#txtAppActiveTillDate').datepicker({ format: 'dd M yyyy' });
    $('#txtAppActiveTillDate').datepicker('setDate', 'now');
    $('#txtAppActiveTillDate').on('change', function () {
        $('.datepicker').hide();
        $("#errortxtWebActiveTillDate").hide();
    });

    $('#txtWebActiveTillDate').datepicker({ format: 'dd M yyyy' });
    $('#txtWebActiveTillDate').datepicker('setDate', 'now');
    $('#txtWebActiveTillDate').on('change', function () {
        $('.datepicker').hide();
        $("#errortxtWebActiveTillDate").hide();
    });

    $("#txtpartycode").attr("disabled", true);
    $("#showpasscheck").click(function () {
        if ($(this).is(":checked")) {
            $('#text_Userpassword').attr('type', 'text');
        }
        else {
            $('#text_Userpassword').attr('type', 'password');
        }
    });
    $('#activeonoff').bootstrapToggle({
        on: 'Enabled',
        off: 'Disabled'
    });
    /********** mobile ******************/
    $('.mobilevalidation').keypress(function (event) {
        return numbersOnly(this, event, false, false);
    });
    $('.mobilevalidation').on('copy paste cut', function (e) {
        e.preventDefault(); //disable cut,copy,paste
        return false;
    });

    Master_PartyView.initializeJqgrid();
    Master_PartyView.BindDiamondatalist();
    //
    BindDropdownState('txtstatename', 'DdlStateList', "/Common/BindMastersDetails?ServiceName=MASTER_COUNTRY_STATE_CITY_GET&ColumnRequested=STATE&ISRECORDALL=true&sidx=STATENAME&sord=asc", 'Select State');
    BindDropdownCountry('txtcontryname', 'DdlCountryList', "/Common/BindMastersDetails?ServiceName=MASTER_COUNTRY_STATE_CITY_GET&ColumnRequested=COUNTRY&ISRECORDALL=true&sidx=COUNTRYNAME&sord=asc", 'Select Country');

    //BindDropdownCountry('txtdistrictname', 'DdlDistrictList', "/Common/BindMastersDetails?ServiceName=MASTER_COUNTRY_STATE_CITY_GET&ColumnRequested=DISTRICT&ISRECORDALL=true", 'Select District');

    $("#txtcontryname").on('change', function () {
        $("#txtstatename").attr('disabled', false);
        $("#txtcityname").attr('disabled', false);
        $("#txtstatename").html("Select State");
        BindDropdownState('txtstatename', 'DdlStateList', "/Common/BindMastersDetails?ServiceName=MASTER_COUNTRY_STATE_CITY_GET&ColumnRequested=STATE&ISRECORDALL=true&sidx=STATENAME&sord=asc", 'Select State');
        $("#txtcityname").val("");
        $("#txtcityname").select2({
            placeholder: "Search using city name"
        });
        $('#txtcityname').select2({

            placeholder: 'Search using city name',
            minimumInputLength: 2,
            width: "100%",
            ajax: {
                url: getDomain() + "/Common/BindMastersDetails?ServiceName=MASTER_COUNTRY_STATE_CITY_GET&ColumnRequested=CITY",
                dataType: 'xml',
                type: "GET",
                data: function (term, page) {

                    var sfilter = { rules: [] };
                    if (term.term != undefined) {
                        sfilter.rules.push({ field: "CITY", op: "eq", data: term.term });
                    }
                    else {
                        sfilter.rules.push({ field: "CITY", op: "eq", data: '' });
                    }
                    return { myfilters: JSON.stringify(sfilter) };
                },

                processResults: function (data) {

                    var push = [];
                    if ($(data).find(xmlvars.common_root).text() != '') {
                        var list = $(data).find(xmlvars.common_root).find(xmlvars.common_row);
                        $.each(list, function (index, obj) {
                            push.push({
                                id: $(obj).find('CITYID').text(),
                                text: $(obj).find('CITYNAME').text(),
                            });
                        });
                    }
                    return { results: push };
                }

            }

        }).on("change", function (e) {

            Master_PartyView.CityChange(this.value);
        });
        if ($("#txtcontryname option:selected").text() != 'India' || !$("#txtcontryname option:selected").text()) {
            $("#txtstatename").attr('disabled', true);
            $("#txtcityname").attr('disabled', true);
        }
    });
    $("#txtstatename").on('change', function () {
        $("#txtcontryname").html("Select Country");
        BindDropdownCountry('txtcontryname', 'DdlCountryList', "/Common/BindMastersDetails?ServiceName=MASTER_COUNTRY_STATE_CITY_GET&ColumnRequested=COUNTRY&ISRECORDALL=true&sidx=COUNTRYNAME&sord=asc", 'Select Country')
        $("#txtcityname").val("");
        $("#txtcityname").select2({
            placeholder: "Search using city name"
        });
    });

    $('button[name="CancelUserGroup"]').click(function () {
        Master_PartyView.ClearValues();
        $("#frmpartyDetails").validate().resetForm();
        $("#txtcityname").select2({
            placeholder: "Search using city name"
        });
        $('#txtcityname').select2({

            placeholder: 'Search using city name',
            minimumInputLength: 2,
            width: "100%",
            ajax: {
                url: getDomain() + "/Common/BindMastersDetails?ServiceName=MASTER_COUNTRY_STATE_CITY_GET&ColumnRequested=CITY",
                dataType: 'xml',
                type: "GET",
                data: function (term, page) {

                    var sfilter = { rules: [] };
                    if (term.term != undefined) {
                        sfilter.rules.push({ field: "CITY", op: "eq", data: term.term });
                    }
                    else {
                        sfilter.rules.push({ field: "CITY", op: "eq", data: '' });
                    }
                    return { myfilters: JSON.stringify(sfilter) };
                },

                processResults: function (data) {

                    var push = [];
                    if ($(data).find(xmlvars.common_root).text() != '') {
                        var list = $(data).find(xmlvars.common_root).find(xmlvars.common_row);
                        $.each(list, function (index, obj) {
                            push.push({
                                id: $(obj).find('CITYID').text(),
                                text: $(obj).find('CITYNAME').text(),
                            });
                        });
                    }
                    return { results: push };
                }

            }

        }).on("change", function (e) {

            Master_PartyView.CityChange(this.value);
        });
        $('#panelEdit').hide();
        $('#panelView').show();
    });
    $("#btnAdd").click(function () {
        Master_PartyView.ClearValues();
        //Master_PartyView.Bindkeycity();
        Master_PartyView.BindRmCode();
        $('#panelEdit').show();
        $('#panelView').hide();
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
                $('#' + $('#hdnPreviewUploader').val()).append('<tr id="' + file + '">' +
                '<td class="col-sm-3">' +
                '<label class="btn btn-quaternary uploadlink tooltip1" data-original-title="change file" for="btn' + file + '"><i class="fa fa-upload"></i>' +
                '<input type="file" accept="' + $('#hdnExtUploader').val() + '" name="file" id="btn' + file + '" class="hide"></label>&nbsp;' +
                '<a class="label-click" href="' + strHref + '" target="blank">' + displayFile + '</a>' +
                '<input type="hidden" class="fileid" value="' + fileid + '" /></td>' +
                '<td class="col-sm-2">' +
                '<input type="text" class="form-control title" value="' + displayFile.split('.')[0] + '" placeholder="Title"></td>' +

                '<td class="col-sm-1">' +

                '<a href="javascript:void(0);" onclick="deleteFile(\'' + file + '\', ' + fileid + ',\'' + strHref + '\');" data-original-title="delete record" class="btn btn-danger tooltip1"><i class="fa fa-trash"></i></a>' +
                '</td></tr>');
            }

            $('.tooltip1').tooltip({
                html: true,
                container: 'body',
                placement: 'right',
                template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'
            });
            registerSingleFileUpload('.uploadlink');

            $('#modalUpload').modal('hide');
        });
    });
    $("#btnsavendnext").click(function () {

        $('#frmpartyDetails').validate({

            rules: {
                monthto: "required",
                cityvalue: "required",
                username: "required",
                userpassword: "required",

                messages: {
                    monthto: "Please enter you month..!",
                    cityvalue: "Please enter city value..!",

                },
                email: {
                    required: true,
                    email: true
                },

            },

            errorPlacement: function (error, element) {
                if (element.parent('.input-group').length) {
                    error.insertAfter(element.parent());      // radio/checkbox?
                } else if (element.hasClass('select2-hidden-accessible')) {
                    error.insertAfter(element.next('span'));  // select2
                    element.next('span').addClass('error').removeClass('valid');
                } else {
                    error.insertAfter(element);               // default
                }
            },
            onError: function () {
                $('.input-group.error-class').find('.help-block.form-error').each(function () {
                    $(this).closest('.form-group').addClass('error-class').append($(this));
                });
            },


        }),
        $('.select2-hidden-accessible').on('change', function () {

            if ($(this).valid()) {
                $(this).next('span').removeClass('error').addClass('valid');
                $('#txtstatename-error').hide();
                $('#txtcontryname-error').hide();
                //$('#txtdistrictname-error').hide();
            }
        });

        Master_PartyView.btnMasterSubmit();
    });
    $('.numbersonly').keypress(function (event) {
        return numbersOnly(this, event, false, false);
    });

    $('#ddlDisplayPolicy').select2();

});