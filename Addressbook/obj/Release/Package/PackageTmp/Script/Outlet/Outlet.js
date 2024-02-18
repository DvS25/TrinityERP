var Master_PartyView = {
    variables: {
        BindGroupListUrl: "/Common/BindMastersDetails?ServiceName=OUTLET_MASTER_DETAILS_GET",
        PerformMasterOperationUrl: "/Common/OpeartionsOnMaster?ServiceName=OUTLET_MASTER_DETAILS_CRUD",
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
        Flag: false
    },
    //====Bind PartnerProfile on pageload===========================================================//    
    initializeJqgrid: function () {

        colNames = ['OUTLETID', 'Party Code', 'Party Code Hide', 'Party Sname', 'Company Name', 'ERP Party code', 'Person Name', 'User Name', 'Password', 'Email Id', 'Contact No', 'Mobile no', 'CityId', 'City', 'DistrictId', 'District', 'StateId', 'State', 'ContryId', 'Contry', 'GST No', 'PAN No', 'Account Status', 'Address', 'Month from', 'Month to', 'Party Type'],
        colModel = [
                    { name: "OUTLETID", index: "OUTLETID", xmlmap: xmlvars.common_colmap + "OUTLETID", search: false, hidden: true },
                    {
                        name: "OUTLETCODE", index: "OUTLETCODE", width: 5, xmlmap: xmlvars.common_colmap + "OUTLETCODE", search: true, hidden: false,
                        formatter: function (cv, op, ro) {
                            return '<a href="javascript:void(0);" onclick="Master_PartyView.triggerId(\'' + $(ro).find('OUTLETID').text() + '\',\'edit\');">' + cv + '</a>';
                        }, searchoptions: jqGridVariables.stringSearchOption
                    },
                    { name: "OUTLETHIDECODE", index: "OUTLETHIDECODE", width: 5, xmlmap: xmlvars.common_colmap + "OUTLETCODE", search: true, hidden: true, searchoptions: jqGridVariables.stringSearchOption },
                    { name: "SNAME", index: "SNAME", width: 4, xmlmap: xmlvars.common_colmap + "SNAME", search: false, hidden: true },
                    { name: "COMPANY", width: 10, index: "COMPANY", xmlmap: xmlvars.common_colmap + "COMPANY", search: true, searchoptions: jqGridVariables.stringSearchOption },
                    { name: "ERPPARTYCODE", index: "ERPPARTYCODE", width: 8, align: "center", xmlmap: xmlvars.common_colmap + "ERPPARTYCODE", search: true, sortable: false, searchoptions: jqGridVariables.stringSearchOption },
                    { name: "CONTACTPERSONNAME", index: "CONTACTPERSONNAME", width: 7, xmlmap: xmlvars.common_colmap + "CONTACTPERSONNAME", search: true, searchoptions: jqGridVariables.stringSearchOption, hidden: false },
                    { name: "USERNAME", index: "USERNAME", width: 7, xmlmap: xmlvars.common_colmap + "USERNAME", search: true, hidden: false, searchoptions: jqGridVariables.stringSearchOption },
                    { name: "PASSWORD", index: "PASSWORD", xmlmap: xmlvars.common_colmap + "PASSWORD", search: false, hidden: true },
                    { name: "EMAILID", index: "EMAILID", width: 12, xmlmap: xmlvars.common_colmap + "EMAILID", search: false },
                    { name: "CONTACTNO", width: 7, index: "CONTACTNO", xmlmap: xmlvars.common_colmap + "CONTACTNO", search: false, sortable: false },
                    { name: "MOBILE", index: "MOBILE", width: 7, xmlmap: xmlvars.common_colmap + "MOBILE", search: false, sortable: false },
                    { name: "CITY", index: "CITY", xmlmap: xmlvars.common_colmap + "CITY", search: false, hidden: true },
                    { name: "CITYNAME", width: 5, index: "CITYNAME", xmlmap: xmlvars.common_colmap + "CITYNAME", search: true, hidden: false, searchoptions: jqGridVariables.stringSearchOption },
                    { name: "DISTRICT", index: "DISTRICT", xmlmap: xmlvars.common_colmap + "DISTRICT", search: false, hidden: true },
                    { name: "DISTRICTNAME", width: 5, index: "DISTRICTNAME", xmlmap: xmlvars.common_colmap + "DISTRICTNAME", search: true, hidden: true, searchoptions: jqGridVariables.stringSearchOption },
                    { name: "STATE", index: "STATE", xmlmap: xmlvars.common_colmap + "STATE", search: false, hidden: true },
                    { name: "STATENAME", index: "STATENAME", width: 5, xmlmap: xmlvars.common_colmap + "STATENAME", search: true, searchoptions: jqGridVariables.stringSearchOption },
                    { name: "COUNTRY", index: "COUNTRY", xmlmap: xmlvars.common_colmap + "COUNTRY", search: false, hidden: true },
                    { name: "CONTRYNAME", width: 3, index: "CONTRYNAME", xmlmap: xmlvars.common_colmap + "CONTRYNAME", search: false, hidden: true },
                    { name: "GSTNO", index: "GSTNO", width: 8, xmlmap: xmlvars.common_colmap + "GSTNO", search: false, sortable: false },
                    { name: "PANNO", width: 5, index: "PANNO", xmlmap: xmlvars.common_colmap + "PANNO", search: false, sortable: false },
                    { name: "ACCOUNT_STATUS", index: "ACCOUNT_STATUS", align: "center", width: 8, xmlmap: xmlvars.common_colmap + "ACCOUNT_STATUS", sortable: false, search: false, formatter: function (cv, op, ro) { return Master_PartyView.variables.chkFmatter(cv, op, ro, 'Master_PartyView') } },
                    { name: "ADDRESS", width: 5, index: "ADDRESS", xmlmap: xmlvars.common_colmap + "ADDRESS", search: false, hidden: true },
                    { name: "MONTH_FROM", index: "MONTH_FROM", xmlmap: xmlvars.common_colmap + "MONTH_FROM", search: false, hidden: true },
                    { name: "MONTH_TO", index: "MONTH_TO", xmlmap: xmlvars.common_colmap + "MONTH_TO", search: false, hidden: true },
                    { name: "PARTYTYPE", index: "PARTYTYPE", xmlmap: xmlvars.common_colmap + "PARTYTYPE", search: false, hidden: true }
        ];
        if (isU()) {
            colNames.push('Edit');
            colModel.push({ name: 'edit', index: 'edit', width: 3, sortable: false, align: "center", search: false, formatter: function (cv, op, ro) { return jqGridVariables.editBtnFmatter(cv, op, ro, 'Master_PartyView', 'edit') } });
        } else if (isV()) {
            colNames.push('Edit');
            colModel.push({ name: 'edit', index: 'edit', width: 3, sortable: false, align: "center", search: false, formatter: function (cv, op, ro) { return jqGridVariables.editBtnFmatter(cv, op, ro, 'Master_PartyView', 'view') } });
        }
        if (isD()) {
            colNames.push('Delete');
            colModel.push({ name: 'act', index: 'act', width: 3, sortable: false, align: "center", search: false, formatter: function (cv, op, ro) { return jqGridVariables.deleteBtnFmatter(cv, op, ro, 'Master_PartyView') } });
        }
        var myfilter = { groupOp: "AND", rules: [] };
        myfilter.rules.push({ field: "SUPERADMINID", op: "eq", data: $("#hdnemployeedetails").val() });

        if (Master_PartyView.variables.Flag == false) {
            $("#table_list_OutletDetails").jqGrid({

                url: getDomain() + Master_PartyView.variables.BindGroupListUrl + "&myfilters=" + JSON.stringify(myfilter),
                datatype: "xml",
                height: '100%',
                autowidth: true,
                shrinkToFit: true,
                rowNum: 20,
                rowList: [20, 50, 100],
                colNames: colNames,
                colModel: colModel,
                pager: "#pager_list_OutletDetails",
                xmlReader: {
                    root: xmlvars.common_root,
                    row: xmlvars.common_row,
                    page: xmlvars.common_response + "CURRENTPAGE",
                    total: xmlvars.common_response + "TOTALPAGES",
                    records: xmlvars.common_response + "TOTALRECORDS",
                    repeatitems: false,
                    id: "OUTLETID"
                },
                loadComplete: function () {
                    $("tr.jqgrow:even").addClass('myAltRowClass');

                    // Hide column headers and top pager if no records were returned
                    if ($('#table_list_OutletDetails').getGridParam('records') == 0)
                        $('.ui-jqgrid-htable').hide();
                    else
                        $('.ui-jqgrid-htable').show();

                    var width = $('#jqgrid_party').width();
                    if (width <= 430) {
                        width = 595;
                    }
                    $('#table_list_OutletDetails').setGridWidth(2000);

                },
                loadError: OnJqloadError,
                beforeProcessing: OnJqbeforeProcessingErrorcheck,
                viewrecords: true,
                hidegrid: false,
                sortname: 'OUTLETCODE',
                sortorder: 'desc',
            });

            // Setup buttons
            $("#table_list_OutletDetails").jqGrid('navGrid', '#pager_list_OutletDetails',
                { edit: false, add: false, del: false, search: true },
                { height: 320 }
        );
            $("#pager_list_OutletDetails").css("width", "");
            AlignJqGridHeader('table_list_OutletDetails', ['edit', 'ACCOUNT_STATUS', 'act', 'ERPPARTYCODE']);
            Master_PartyView.variables.Flag = true;
        } else {
            $("#table_list_OutletDetails").jqGrid('setGridParam', { url: getDomain() + Master_PartyView.variables.BindGroupListUrl + "&myfilters=" + JSON.stringify(myfilter), page: 1 }).trigger("reloadGrid");
        }
    },

    triggerId: function (id, oper) {
        BindDropdownState('txtstatename', 'DdlStateList', "/Common/BindMastersDetails?ServiceName=MASTER_COUNTRY_STATE_CITY_GET&ColumnRequested=STATE&ISRECORDALL=true&sidx=STATENAME&sord=asc", 'Select State');
        BindDropdownCountry('txtcontryname', 'DdlCountryList', "/Common/BindMastersDetails?ServiceName=MASTER_COUNTRY_STATE_CITY_GET&ColumnRequested=COUNTRY&ISRECORDALL=true&sidx=COUNTRYNAME&sord=asc", 'Select Country');
        var rowData = jQuery("#table_list_OutletDetails").getRowData(id);
        if (rowData['PARTYTYPE'] == "Party") {
            var partytypename = $("input[name=radioparty][value=" + rowData['PARTYTYPE'] + "]").prop('checked', true);
        }
        else {
            partytypename = $("input[name=radioparty][value=" + rowData['PARTYTYPE'] + "]").prop('checked', true);
        }
        $(".shell span").hide();
        $("#hdnpartydetaisid").val(id);
        $("#lblOutletCode").text(rowData['OUTLETHIDECODE']);
        $("#txtPartysname").val(rowData['SNAME']);
        $("#txtPersonname").val(rowData['CONTACTPERSONNAME']);
        $("#text_ousername").val(rowData['USERNAME']);
        $("#text_oUserpassword").val(rowData['PASSWORD']);
        $("#txtemailid").val(rowData['EMAILID']);
        $("#txtCompanyName").val(rowData['COMPANY']);
        $("#txtcontactno").val(rowData['CONTACTNO']);
        $("#txtmobileno").val(rowData['MOBILE']);
        $("#txtgstno").val(rowData['GSTNO']);
        $("#txtcityname").val(rowData['CITY']);
        $('#txtcityname').html("<option value='" + rowData['CITY'] + "'>" + rowData['CITYNAME'] + "</option>");
        $("#txtpanno").val(rowData['PANNO']);
        $("#typeofparty").val(partytypename);
        $("#txtstatename").val(rowData['STATE']);
        $("#txterpcode").val(rowData['ERPPARTYCODE']);
        $('#oactiveonoff').prop('checked', ($(rowData['ACCOUNT_STATUS']).html() == 'Enabled') ? $('#oactiveonoff').bootstrapToggle('on') : $('#oactiveonoff').bootstrapToggle('off'));
        $("#txtcontryname").val(rowData['COUNTRY']);
        $("#textaddress").val(rowData['ADDRESS']);
        $("#txtmonthfrom").val(rowData['MONTH_FROM']);
        $("#txtmonthto").val(rowData['MONTH_TO']);

        $("#panelEdit").show();
        $("#panelView").hide();
    },
    deleteRow: function (id) {
        $.confirm({
            'title': 'Delete Party Details',
            'message': 'You are about to delete this Outlet Detail. It can not be restored at a later time! Continue? ',
            'buttons': {
                'Yes': {
                    'class': 'yes',
                    'action': function () {
                        // delete data to DB
                        var dataP = {
                            OUTLETID: id,
                            oper: 'delete'
                        };
                        $.ajax({
                            url: getDomain() + "/Common/OpeartionsOnMaster?ServiceName=OUTLET_MASTER_DETAILS_CRUD",
                            type: "POST",
                            data: dataP,
                            async: false,
                            cache: false,
                            success: function (result) {
                                if ($(result).find('RESPONSECODE').text() == "0") {
                                    notificationMessage('Save Operation', 'Record is deleted successfully', 'success');
                                    $("#table_list_OutletDetails").trigger("reloadGrid", [{ current: true }]);
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

        //var data = {


        //}
        Master_PartyView.savedata(Master_PartyView.variables.Oper);
    },

    savedata: function (oper) {

        var dataP;

        if ($("#oactiveonoff").prop("checked") == true) {

            activetoggle = "1";

        } else {
            activetoggle = "0";
        }
        dataP = {
            "oper": oper,
            "OUTLETID": $("#hdnpartydetaisid").val(),
            "SNAME": $("#txtPartysname").val(),
            "CONTACTPERSONNAME": $("#txtPersonname").val(),
            "USERNAME": $("#text_ousername").val(),
            "PASSWORD": $("#text_oUserpassword").val(),
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
            "ENTRYFROM": "Web",
            "SUPERADMINID": $("#hdnemployeedetails").val()
        };
        if ($("#txtcityname").val() != null && $("#txtcityname").val() != "") {
            dataP.CITY = $('#txtcityname').select2('val');
            //dataP.DISTRICT = $("#txtdistrictname").val();
            dataP.STATE = $("#txtstatename").val();
            dataP.COUNTRY = $("#txtcontryname").val();
        }

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
    btnMasterSubmitOnSuccess: function (data) {
        if ($(data).find('RESPONSECODE').text() == "0") {
            if (Master_PartyView.variables.Oper == 'Delete') {
                OperationMessage("", 'Outlet deleted successfully', 'success');
            } else {
                OperationMessage("", 'Outlet detail saved successfully', 'success');
                $('#panelEdit').hide();
                $('#panelView').show();
            }
            Master_PartyView.ClearValues();
            $("#txtcityname").select2({
                placeholder: "Select a City"
            });
            $("#table_list_OutletDetails").trigger("reloadGrid", [{ current: true }]);
        }
        else {
            InvalidResponseCode(data);
        }
        //$('#btnSave').attr('disabled', false);
        //$('#btnDelete').attr('disabled', false);

    },

    ClearValues: function () {
        $("#hdnpartydetaisid").val("");
        $("#lblOutletCode").text("");
        $("#txtPartysname").val("");
        $("#txtPersonname").val(""),
        $("#text_ousername").val(""),
        $("#text_oUserpassword").val(""),
        $("#txtemailid").val(""),
        $("#txtCompanyName").val(""),
        $("#txtcontactno").val(""),
        $("#txtmobileno").val(""),
        $("#txtgstno").val(""),
        $("#txtcityname").val("");
        $("#txtcityname").val("");
        $("#typeoutlet").prop('checked', true);
        //$('#txtcityname').val([]);
        //$("#txtcityname").select2(""),
        $("#imgPreviewTechnicalData").html("");
        $("#txtpanno").val(""),
        $("#txtstatename").val(""),
        $("#txterpcode").val(""),
        $("#txtcontryname").val(""),
        $("#textaddress").val(""),
        $('#oactiveonoff').bootstrapToggle('on');
        $("#txtmonthfrom").val(""),
        $("#txtmonthto").val(""),
        $("#allowmacipdata").html("");
        $("#macaddressdiv").hide();
        $("#eroor_lablegst").hide();
        $("#eroor_lablepan").hide();
        $('#panelEdit').hide();
        $('#panelView').show();
    },
    Bindkeycity: function () {

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
};

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
$(document).ready(function () {
    BindDropdownState('txtstatename', 'DdlStateList', "/Common/BindMastersDetails?ServiceName=MASTER_COUNTRY_STATE_CITY_GET&ColumnRequested=STATE&ISRECORDALL=true&sidx=STATENAME&sord=asc", 'Select State');
    BindDropdownCountry('txtcontryname', 'DdlCountryList', "/Common/BindMastersDetails?ServiceName=MASTER_COUNTRY_STATE_CITY_GET&ColumnRequested=COUNTRY&ISRECORDALL=true&sidx=COUNTRYNAME&sord=asc", 'Select Country');
    $('#txtcityname').select2();
    $("#txtcityname").select2({
        placeholder: "Select a City"
    });
    $("#oshowpasscheck").click(function () {
        if ($(this).is(":checked")) {
            $('#text_oUserpassword').attr('type', 'text');
        }
        else {
            $('#text_oUserpassword').attr('type', 'password');
        }
    })

    $('#oactiveonoff').bootstrapToggle({
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


    Master_PartyView.Bindkeycity();
    //
    //BindDropdownState('txtstatename', 'DdlStateList', "/Common/BindMastersDetails?ServiceName=MASTER_COUNTRY_STATE_CITY_GET&ColumnRequested=STATE&ISRECORDALL=true&sidx=STATENAME&sord=asc", 'Select State');
    //BindDropdownCountry('txtcontryname', 'DdlCountryList', "/Common/BindMastersDetails?ServiceName=MASTER_COUNTRY_STATE_CITY_GET&ColumnRequested=COUNTRY&ISRECORDALL=true&sidx=COUNTRYNAME&sord=asc", 'Select Country');
    //BindDropdownCountry('txtdistrictname', 'DdlDistrictList', "/Common/BindMastersDetails?ServiceName=MASTER_COUNTRY_STATE_CITY_GET&ColumnRequested=DISTRICT&ISRECORDALL=true", 'Select District');

    $("#txtcontryname").on('change', function () {
        $("#txtstatename").html("Select State");
        BindDropdownState('txtstatename', 'DdlStateList', "/Common/BindMastersDetails?ServiceName=MASTER_COUNTRY_STATE_CITY_GET&ColumnRequested=STATE&ISRECORDALL=true&sidx=STATENAME&sord=asc", 'Select State');
        $("#txtcityname").val("");
        $("#txtcityname").select2({
            placeholder: "Search using city name"
        });
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
        Master_PartyView.Bindkeycity();
        $('#panelEdit').hide();
        $('#panelView').show();
    });
    $("#btnAdd").click(function () {
        Master_PartyView.ClearValues();
        Master_PartyView.Bindkeycity();
        $('#panelEdit').show();
        $('#panelView').hide();
    });

    $('#modalUpload').on('show.bs.modal', function (e) {
        $('#hdnPreviewUploader').val(e.relatedTarget.dataset.preview);
        $('#hdnExtUploader').val(e.relatedTarget.dataset.ext);
        RegisterMultipleFileUpload('#imgUploader', e.relatedTarget.dataset.ext);
        $("#spExtension").html(e.relatedTarget.dataset.ext);
    });

    $("#btnSaveOutletDtl").click(function () {
        Master_PartyView.btnMasterSubmit();
    });



});