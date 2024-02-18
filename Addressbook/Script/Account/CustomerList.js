var Master_ContactView = {
    variables: {
        BindGroupListUrl: "/Common/BindMastersDetails?ServiceName=CONTACT_GET",
        BindstickListUrl: "/Common/BindMastersDetails?ServiceName=STICKEY_GET",
        PerformMasterOperationUrl: "/Common/OpeartionsOnMaster?ServiceName=CONTACT_CRUD",
        GetSateIdFromCityIdUrl: "/Common/BindMastersDetails?ServiceName=MASTER_COUNTRY_STATE_CITY_GET&ColumnRequested=ID",
        ExportURL: "/Common/ExportFromGrid?ServiceName=CONTACT_GET&IsRecordAll=true&FileName=COntact_",
        Oper: 'Add',
        addedit: "added",
        Masterid: ""
    },
    //custom validation
    isEmailId: function (email) {
        var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return regex.test(email);
    },
    validateMobileNo: function (phone) {
        var filter = /^\d{10}$/;
        return filter.test(phone);
    },

    //====Bind PartnerProfile on pageload===========================================================//    
    initializeJqgrid: function () {
        colNames = ['Letter', 'Edit', 'Delete', 'CONTACTID', 'Full Name', 'Nick Name', 'Company Name', 'Group Name', 'GROUPID', 'B_ANRY_DATE', 'B_BIRTHDATE', 'Mobile no1', 'Mobile no2', 'Email 1', 'Email 2', 'H_ADDRESS', 'H_TELEPHONE_1', 'H_TELEPHONE_2', 'H_MOBILE_1', 'H_MOBILE_2', 'H_ZIPCODE', 'O_COMPNYNAME', 'O_ADDRESS', 'O_TELEPHONE_1', 'O_TELEPHONE_2', 'O_FAX', 'O_MOBILE', 'O_POST', 'O_EMAIL', 'O_CONTACT_PERSON', 'O_DEPARTMENT', 'O_CP_MO1', 'O_CP_MO2', 'O_CITYID', 'O_STATEID', 'O_COUNTRYID', 'O_ZIPCODE', 'O_WEBSITE', 'O_DISTRICTID', 'Country', 'State', 'City', 'District', 'B_SALUTATION', 'B_Comments', 'R_REVIEW', 'R_REFERENCEBY_1', 'R_REFERENCEBY_2', 'R_REFERENCEBY_3', 'R_COMPANYNAME_1', 'R_COMPANYNAME_2', 'R_COMPANYNAME_3', 'R_FAVOURITE'],
        colModel = [
                    { name: 'letter', index: 'letter', width: 2, sortable: false, align: "center", search: false, formatter: function (cv, op, ro) { return jqGridVariables.LetterBtnFmatter(cv, op, ro, 'Master_ContactView') } },
                    { name: 'edit', index: 'edit', width: 1, sortable: false, align: "center", search: false, formatter: function (cv, op, ro) { return jqGridVariables.editBtnFmatter(cv, op, ro, 'Master_ContactView', 'edit') } },
                    { name: 'act', index: 'act', width: 2, sortable: false, align: "center", search: false, formatter: function (cv, op, ro) { return jqGridVariables.deleteBtnFmatter(cv, op, ro, 'Master_ContactView') } },
                    { name: "CONTACTID", index: "CONTACTID", xmlmap: xmlvars.common_colmap + "CONTACTID", search: false, hidden: true },
                    { name: "B_FULLNAME", width: 3, index: "B_FULLNAME", xmlmap: xmlvars.common_colmap + "B_FULLNAME", search: true, searchoptions: jqGridVariables.stringSearchOption },
                    { name: "B_NICKNAME", width: 2, index: "B_NICKNAME", xmlmap: xmlvars.common_colmap + "B_NICKNAME", search: true, searchoptions: jqGridVariables.stringSearchOption },
                    { name: "O_COMPNYNAME", width: 4, index: "O_COMPNYNAME", xmlmap: xmlvars.common_colmap + "O_COMPNYNAME", search: true, searchoptions: jqGridVariables.stringSearchOption },
                    { name: "GROUPNAME", width: 3, index: "GROUPNAME", xmlmap: xmlvars.common_colmap + "GROUPNAME", search: true, searchoptions: jqGridVariables.stringSearchOption },
                    { name: "B_GROUPID", index: "B_GROUPID", xmlmap: xmlvars.common_colmap + "B_GROUPID", hidden: true },
                    { name: "B_ANRY_DATE", index: "B_ANRY_DATE", xmlmap: xmlvars.common_colmap + "B_ANRY_DATE", hidden: true },
                    { name: "B_BIRTHDATE", index: "B_BIRTHDATE", xmlmap: xmlvars.common_colmap + "B_BIRTHDATE", hidden: true },
                    { name: "B_MOBILE_NO_1", width: 3, index: "B_MOBILE_NO_1", xmlmap: xmlvars.common_colmap + "B_MOBILE_NO_1", search: true, searchoptions: jqGridVariables.stringSearchOption },
                    { name: "B_MOBILE_NO_2", width:3, index: "B_MOBILE_NO_2", xmlmap: xmlvars.common_colmap + "B_MOBILE_NO_2", search: false,hidden:true  },
                    { name: "B_EMAIL_1", width: 5, index: "B_EMAIL_1", xmlmap: xmlvars.common_colmap + "B_EMAIL_1", search: true, searchoptions: jqGridVariables.stringSearchOption },
                    { name: "B_EMAIL_2", width: 5, index: "B_EMAIL_2", xmlmap: xmlvars.common_colmap + "B_EMAIL_2", search: false,hidden:true},
                    { name: "H_ADDRESS", index: "H_ADDRESS", xmlmap: xmlvars.common_colmap + "H_ADDRESS", hidden: true },
                    { name: "H_TELEPHONE_1", index: "H_TELEPHONE_1", xmlmap: xmlvars.common_colmap + "H_TELEPHONE_1", hidden: true },
                    { name: "H_TELEPHONE_2", index: "H_TELEPHONE_2", xmlmap: xmlvars.common_colmap + "H_TELEPHONE_2", hidden: true },
                    { name: "H_MOBILE_1", index: "H_MOBILE_1", xmlmap: xmlvars.common_colmap + "H_MOBILE_1", hidden: true },
                    { name: "H_MOBILE_2", index: "H_MOBILE_2", xmlmap: xmlvars.common_colmap + "H_MOBILE_2", hidden: true },
                    { name: "H_ZIPCODE", index: "H_ZIPCODE", xmlmap: xmlvars.common_colmap + "H_ZIPCODE", hidden: true },
                    { name: "O_COMPNYNAME", index: "O_COMPNYNAME", xmlmap: xmlvars.common_colmap + "O_COMPNYNAME", hidden: true },
                    { name: "O_ADDRESS", index: "O_ADDRESS", xmlmap: xmlvars.common_colmap + "O_ADDRESS", hidden: true },
                    { name: "O_TELEPHONE_1", index: "O_TELEPHONE_1", xmlmap: xmlvars.common_colmap + "O_TELEPHONE_1", hidden: true },
                    { name: "O_TELEPHONE_2", index: "O_TELEPHONE_2", xmlmap: xmlvars.common_colmap + "O_TELEPHONE_2", hidden: true },
                    { name: "O_FAX", index: "O_FAX", xmlmap: xmlvars.common_colmap + "O_FAX", hidden: true },
                    { name: "O_MOBILE", index: "O_MOBILE", xmlmap: xmlvars.common_colmap + "O_MOBILE", hidden: true },
                    { name: "O_POST", index: "O_POST", xmlmap: xmlvars.common_colmap + "O_POST", hidden: true },
                    { name: "O_EMAIL", index: "O_EMAIL", xmlmap: xmlvars.common_colmap + "O_EMAIL", hidden: true },
                    { name: "O_CONTACT_PERSON", index: "O_CONTACT_PERSON", xmlmap: xmlvars.common_colmap + "O_CONTACT_PERSON", hidden: true },
                    { name: "O_DEPARTMENT", index: "O_DEPARTMENT", xmlmap: xmlvars.common_colmap + "O_DEPARTMENT", hidden: true },
                    { name: "O_CP_MO1", index: "O_CP_MO1", xmlmap: xmlvars.common_colmap + "O_CP_MO1", hidden: true },
                    { name: "O_CP_MO2", index: "O_CP_MO2", xmlmap: xmlvars.common_colmap + "O_CP_MO2", hidden: true },
                    { name: "O_CITYID", index: "O_CITYID", xmlmap: xmlvars.common_colmap + "O_CITYID", hidden: true },
                    { name: "O_STATEID", index: "O_STATEID", xmlmap: xmlvars.common_colmap + "O_STATEID", hidden: true },
                    { name: "O_COUNTRYID", index: "O_COUNTRYID", xmlmap: xmlvars.common_colmap + "O_COUNTRYID", hidden: true },
                    { name: "O_ZIPCODE", index: "O_ZIPCODE", xmlmap: xmlvars.common_colmap + "O_ZIPCODE", hidden: true },
                    { name: "O_WEBSITE", index: "O_WEBSITE", xmlmap: xmlvars.common_colmap + "O_WEBSITE", hidden: true },

                    //{ name: "H_DISTRICTID", index: "H_DISTRICTID", xmlmap: xmlvars.common_colmap + "H_DISTRICTID", search: false, hidden: true },
                    { name: "O_DISTRICTID", index: "O_DISTRICTID", xmlmap: xmlvars.common_colmap + "O_DISTRICTID", search: false, hidden: true },
                    { name: "O_COUNTRYNAME", width: 2, index: "O_COUNTRYNAME", xmlmap: xmlvars.common_colmap + "O_COUNTRYNAME", search: true, searchoptions: jqGridVariables.stringSearchOption },
                    { name: "O_STATENAME", width: 2, index: "O_STATENAME", xmlmap: xmlvars.common_colmap + "O_STATENAME", search: true, searchoptions: jqGridVariables.stringSearchOption },
                    { name: "O_CITYNAME", width: 2, index: "O_CITYNAME", xmlmap: xmlvars.common_colmap + "O_CITYNAME", search: true, searchoptions: jqGridVariables.stringSearchOption },
                    { name: "O_DISTRICTNAME", width: 2, index: "O_DISTRICTNAME", xmlmap: xmlvars.common_colmap + "O_DISTRICTNAME", search: true, searchoptions: jqGridVariables.stringSearchOption, hidden: true },
                    { name: "B_SALUTATION", index: "B_SALUTATION", xmlmap: xmlvars.common_colmap + "B_SALUTATION", search: false, hidden: true },
                    { name: "B_COMMENTS", index: "B_COMMENTS", xmlmap: xmlvars.common_colmap + "B_COMMENTS", search: false, hidden: true },
                    { name: "R_REVIEW", index: "R_REVIEW", xmlmap: xmlvars.common_colmap + "R_REVIEW", search: false, hidden: true },
                    { name: "R_REFERENCEBY_1", index: "R_REFERENCEBY_1", xmlmap: xmlvars.common_colmap + "R_REFERENCEBY_1", search: false, hidden: true },
                    { name: "R_REFERENCEBY_2", index: "R_REFERENCEBY_2", xmlmap: xmlvars.common_colmap + "R_REFERENCEBY_2", search: false, hidden: true },
                    { name: "R_REFERENCEBY_3", index: "R_REFERENCEBY_3", xmlmap: xmlvars.common_colmap + "R_REFERENCEBY_3", search: false, hidden: true },
                    { name: "R_COMPANYNAME_1", index: "R_COMPANYNAME_1", xmlmap: xmlvars.common_colmap + "R_COMPANYNAME_1", search: false, hidden: true },
                    { name: "R_COMPANYNAME_2", index: "R_COMPANYNAME_2", xmlmap: xmlvars.common_colmap + "R_COMPANYNAME_2", search: false, hidden: true },
                    { name: "R_COMPANYNAME_3", index: "R_COMPANYNAME_3", xmlmap: xmlvars.common_colmap + "R_COMPANYNAME_3", search: false, hidden: true },
                    { name: "R_FAVOURITE", width: 3, index: "R_FAVOURITE", xmlmap: xmlvars.common_colmap + "R_FAVOURITE", formatter: function (cv, op, ro) { return jqGridVariables.chkFmatter(cv, op, ro, 'Master_ContactView') }, search: false },
                   
        ];
       
        var myfilter = { groupOp: "AND", rules: [] };
        myfilter.rules.push({ field: "TERMS", op: "eq", data: $("#btnaddon3").val() });

        $("#table_list_Contact").GridUnload();
        $("#table_list_Contact").jqGrid({
            url: getDomain() + Master_ContactView.variables.BindGroupListUrl + "&myfilters=" + JSON.stringify(myfilter),
            datatype: "xml",
            height: '100%',
            autowidth: true,
            shrinkToFit: true,
            multiselect: true,
            rowNum: 25,
            rowList: [25, 50, 100 ,200 ,300 ,400 ,500],
            colNames: colNames,
            colModel: colModel,
            pager: "#pager_list_Contact",
            xmlReader: {
                root: xmlvars.common_root,
                row: xmlvars.common_row,
                page: xmlvars.common_response + "CURRENTPAGE",
                total: xmlvars.common_response + "TOTALPAGES",
                records: xmlvars.common_response + "TOTALRECORDS",
                repeatitems: false,
                id: "CONTACTID"
            },
            loadComplete: function () {
                $("tr.jqgrow:even").addClass('myAltRowClass');
                $("#table_list_Contact").jqGrid('setGridHeight', $(window).innerHeight() - 160 - ($("#gbox_table_list_Contact").height() - $('#gbox_table_list_Contact .ui-jqgrid-bdiv').height()));

                // Hide column headers and top pager if no records were returned
                if ($('#table_list_Contact').getGridParam('records') == 0)
                    $('.ui-jqgrid-htable').hide();
                else
                    $('.ui-jqgrid-htable').show();

                var width = $('.jqGrid_wrapper').width();
                if (width <= 1000) {
                    width = 1000;
                }
                $('#table_list_Contact').setGridWidth(width);

                $(".cbox").change(function (e) {
                    var $grid = $("#table_list_Contact"), selIds = $grid.jqGrid("getGridParam", "selarrrow"), i, n, cellmob = [];
                    if (e.target.checked == true) {
                        $("#dropdown4").attr('disabled', false);
                    }
                    else {
                        if (selIds.length == 0) {
                            $("#dropdown4").attr('disabled', true);
                        }                        
                    }
                });               
                $('#table_list_Contact').on('rowselect', function (event) {                    
                    var rowBoundIndex = event.args.rowindex;
                    var rowVal = $('#table_list_Contact').jqxGrid('getrowdata', rowBoundIndex);

                    if (!rowVal.hasAccess) {
                        $('#table_list_Contact').jqxGrid('unselectrow', rowBoundIndex);
                    } else if (typeof rowBoundIndex === 'object') {
                        if (!rowVal.hasAccess) {
                            $('#table_list_Contact').jqxGrid('unselectrow', rowBoundIndex);
                        }
                    }
                });
            },
            loadError: OnJqloadError,
            beforeProcessing: OnJqbeforeProcessingErrorcheck,
            viewrecords: true,
            hidegrid: false,
            sortname: 'CONTACTID',
            sortorder: 'desc',
            onSelectRow: function (rowid, status) {    
                var anycheck = 0;
                $("#table_list_Contact .cbox").each(function () {
                    if($(this).is(":checked"))
                    {
                        $("#dropdown4").attr('disabled', false);
                        anycheck = 1;
                    }
                });
                if(anycheck == 1)
                {
                    $("#dropdown4").attr('disabled', false);
                }
                else
                {
                    $("#dropdown4").attr('disabled', true);
                }
               
            }
            //beforeSelectRow: function (rowid, e) {
            //    return false;
            //}
        });
        $("#table_list_Contact").jqGrid('navGrid', '#pager_list_Contact',
            { edit: false, add: false, del: false, search: true },
            { height: 320 }
           
    );
        $("#pager_list_Contact_left").css("width", "");
        AlignJqGridHeader('table_list_Contact', ['edit', 'letter', 'act']);

    },
    CityChange: function (val) {
       
        var myfilter = { groupOp: "AND", rules: [] };
        myfilter.rules.push({ field: "CITYID", op: "eq", data: val})
        $.ajax({
            url: getDomain() + Master_ContactView.variables.GetSateIdFromCityIdUrl + "&myfilters=" + JSON.stringify(myfilter),
            async: true,
            cache: false,
            type: 'POST',
            success: function (data) {
                
                $("#txt_O_state").val($(data).find('STATEID').text());
                $("#txt_O_Country").val($(data).find('COUNTRYID').text());
                $("#text_O_District").val($(data).find('DISTRICTID').text());
            },
            error: OnError,
        });
    },    
    triggerId: function (id, oper) {        
        $("#btn_b_Csave").html("Submit");
        $("#btn_H_Csave").html("Submit");
        $("#btn_O_Csave").html("Submit");

        if ($('#text_B_Groupname > option').length == 0 && $('#text_O_District > option').length == 0 && $('#txt_O_Country > option').length == 0 && $('#txt_O_state > option').length == 0) {
            BindDropdownGroupName('text_B_Groupname', 'ddlGroupList', "/Common/BindMastersDetails?ServiceName=GROUP_GET&ISRECORDALL=true", 'Select Group');
            BindDropdownState('txt_O_state', 'DdlStateList', "/Common/BindMastersDetails?ServiceName=MASTER_COUNTRY_STATE_CITY_GET&ColumnRequested=STATE&ISRECORDALL=true", 'Select State');
            BindDropdownCountry('txt_O_Country', 'DdlCountryList', "/Common/BindMastersDetails?ServiceName=MASTER_COUNTRY_STATE_CITY_GET&ColumnRequested=COUNTRY&ISRECORDALL=true", 'Select Country');
            BindDropdownCountry('text_O_District', 'ddlDistrictList', "/Common/BindMastersDetails?ServiceName=MASTER_COUNTRY_STATE_CITY_GET&ColumnRequested=DISTRICT&ISRECORDALL=true", 'Select District');
        }
        var rowData = jQuery("#table_list_Contact").getRowData(id);
        $("#hdnContact").val(id);
        $("#text_b_salutation").val(rowData['B_SALUTATION']);
        $("#txt_B_Comments").val(rowData['B_COMMENTS']);
        $("#text_B_fullname").val(rowData['B_FULLNAME']);
        $("#text_B_nickname").val(rowData['B_NICKNAME']);
        $("#text_B_Groupname").val(rowData['B_GROUPID']);
        $("#txt_b_bridthdate").val(rowData['B_BIRTHDATE']);
        $("#txt_b_Anrydate").val(rowData['B_ANRY_DATE']);
        $("#txt_b_mobile1").val(rowData['B_MOBILE_NO_1']);
        $("#txt_b_mobile2").val(rowData['B_MOBILE_NO_2']);
        $("#txt_b_Email1").val(rowData['B_EMAIL_1']);
        $("#txt_b_Email2").val(rowData['B_EMAIL_2']);
        $("#txt_h_address").val(rowData['H_ADDRESS']);
        $("#txt_b_telep1").val(rowData['H_TELEPHONE_1']);
        $("#txt_b_telep2").val(rowData['H_TELEPHONE_2']);
        $("#txt_H_mobile1").val(rowData['H_MOBILE_1']);
        $("#txt_H_mobile2").val(rowData['H_MOBILE_2']);
        $("#txt_H_Zipcode").val(rowData['H_ZIPCODE']);
        $("#txt_O_Comapnyname").val(rowData['O_COMPNYNAME']);
        $("#txt_O_address").val(rowData['O_ADDRESS']);
        $("#txt_O_tele1").val(rowData['O_TELEPHONE_1']);
        $("#txt_O_tele2").val(rowData['O_TELEPHONE_2']);
        $("#txt_O_fax").val(rowData['O_FAX']);
        $("#txt_O_Mobile").val(rowData['O_MOBILE']);
        $("#txt_O_post").val(rowData['O_POST']);
        $("#txt_O_Email").val(rowData['O_EMAIL']);
        $("#txt_O_contactperson").val(rowData['O_CONTACT_PERSON']);
        $("#txt_O_Department").val(rowData['O_DEPARTMENT']);
        $("#txt_O_cmobile1").val(rowData['O_CP_MO1']);
        $("#txt_O_cmobile2").val(rowData['O_CP_MO2']);
        $("#txt_O_zipcode").val(rowData['O_ZIPCODE']);
        $("#txt_O_Website").val(rowData['O_WEBSITE']);
        
        $('#txt_O_city').html("<option value='" + rowData['O_CITYID'] + "'>" + rowData['O_CITYNAME'] + "</option>");
        $("#txt_O_city").val(rowData['O_CITYID']);
        $("#txt_O_state").val(rowData['O_STATEID']);
        $("#text_O_District").val(rowData['O_DISTRICTID']);
        $("#txt_O_Country").val(rowData['O_COUNTRYID']);
        $("#Referecebyone").val(rowData['R_REFERENCEBY_1']);
        $("#Referecebytwo").val(rowData['R_REFERENCEBY_2']);
        $("#Referecebythree").val(rowData['R_REFERENCEBY_3']);
        $("#Companynameone").val(rowData['R_COMPANYNAME_1']);
        $("#Companynametwo").val(rowData['R_COMPANYNAME_2']);
        $("#Companynamethree").val(rowData['R_COMPANYNAME_3']);
        if (rowData['R_REVIEW'] == "Good") {

            var reviewname = $("input[name=radio-group][value=" + rowData['R_REVIEW'] + "]").prop('checked', true);
        }
        else if (rowData['R_REVIEW'] == "Best") {
            reviewname = $("input[name=radio-group][value=" + rowData['R_REVIEW'] + "]").prop('checked', true);

        } else if (rowData['R_REVIEW'] == "Great") {
            reviewname = $("input[name=radio-group][value=" + rowData['R_REVIEW'] + "]").prop('checked', true);
        }
        $("#reviewid").val(reviewname);
        if ($(rowData['R_FAVOURITE']).html() == 'Yes') {
            $('#Favactiveonoff').bootstrapToggle('on');
        } else {
            $('#Favactiveonoff').bootstrapToggle('off');
        }
        $("#Addcontactfrom").show();
        $("#viewcontactform").hide();
        Master_ContactView.showTitlePermissionWise(oper);
    },
    Letterhead: function (id) {
       // $("#mainheaderdiv").hide();
        $("#mainbodydiv").hide();
         $("#contact_view").hide();
         $("#finalpdf_view").show();
         $("#pdf_div").hide();
         $("#pdf_button").hide();

        $("#letter_div").show();
        $("#frmletter_body").show();
        $("#letter_bodytext").hide();
        $("#letter_button").show();
        $("#default_tr").show();
        
        var rowData = jQuery("#table_list_Contact").getRowData(id);
        $("#lt_fullname").html(rowData['B_FULLNAME']);
        $("#lt_companyname").html(rowData['O_COMPNYNAME']);
        $("#lt_address").html(rowData['O_ADDRESS']);
        $("#lt_email").html(rowData['B_EMAIL_1']);
        $("#lt_mobile").html(rowData['B_MOBILE_NO_1']);
    },
    deleteRow: function (id) {
        $("#hdnContact").val(id);
        //$('#Contcat-Modal').modal('hide');
        $("#Contact_del_modal").modal('show');
        Master_ContactView.variables.Oper = 'Delete';
    },
    btnMasterSubmit: function (data) {
       
        var B_name = $('#text_B_fullname').val();
        var isvalid = 1;

        var isvalid = 0;
        if (B_name != "" && B_name != null ) {
            isvalid = 1;
        }
        if (isvalid != 0) {
            Master_ContactView.savedata(data);
        }
        else {
            OperationMessage("", 'Atleast add full name.', 'warning');
            return;
        }
    },
    savedata: function (data) {
        $.ajax({
            url: getDomain() + Master_ContactView.variables.PerformMasterOperationUrl,
            data: data,
            async: true,
            cache: false,
            type: 'POST',
            success: Master_ContactView.btnMasterSubmitOnSuccess,
            error: OnError,
        });
    },
    btnMasterSubmitOnSuccess: function (data) {
        if ($(data).find('RESPONSECODE').text() == "0") {
            if (Master_ContactView.variables.Oper == 'Delete') {
                OperationMessage("", 'Contact deleted successfully', 'success');
                $('#btn_contactdel').attr('disabled', false);
                $("#Contact_del_modal").modal('hide');
            } else {
                OperationMessage("", 'Contact detail saved successfully', 'success');
            }
            Master_ContactView.ClearValues();
            $("#Addcontactfrom").hide();
            $("#viewcontactform").show();
            //$('#Contcat-Modal').modal('hide');
            $("#table_list_Contact").trigger("reloadGrid", [{ current: true }]);
        }
        else {
            InvalidResponseCode(data);
        }
    },
    btnMasterDelete: function () {
        $('#btn_contactdel').attr('disabled', true);
        var data = {
            "oper": Master_ContactView.variables.Oper,
            "CONTACTID": $("#hdnContact").val()
        }
        Master_ContactView.savedata(data);
    },
    ClearValues: function () {
        $("#hdnContact").val("");
        $("#text_B_fullname").val("");
        $("#txt_B_Comments").val("");
        $("#text_B_nickname").val("");
        $("#text_B_Groupname").val("");
        $("#txt_b_bridthdate").val("");
        $("#txt_b_Anrydate").val("");
        $("#txt_b_mobile1").val("");
        $("#txt_b_mobile2").val("");
        $("#txt_b_Email1").val("");
        $("#txt_b_Email2").val("");

        $("#txt_h_address").val("");
        $("#txt_b_telep1").val("");
        $("#txt_b_telep2").val("");
        $("#txt_H_mobile1").val("");
        $("#txt_H_mobile2").val("");
        $("#txt_H_Zipcode").val("");

        //$("#txt_H_city").val("");
        //$("#txt_H_state").val("");
        //$("#txt_H_state").val("");
        //$("#text_H_District").val("");

        $("#txt_O_Comapnyname").val("");
        $("#txt_O_address").val("");
        $("#txt_O_tele1").val("");
        $("#txt_O_tele2").val("");
        $("#txt_O_fax").val("");
        $("#txt_O_Mobile").val("");
        $("#txt_O_post").val("");
        $("#txt_O_Email").val("");
        $("#txt_O_contactperson").val("");
        $("#txt_O_Department").val("");
        $("#txt_O_cmobile1").val("");
        $("#txt_O_cmobile2").val("");
        $("#txt_O_zipcode").val("");
        $("#txt_O_Website").val("");
        $("#Referecebyone").val("");
        $("#Referecebytwo").val("");
        $("#Referecebythree").val("");
        $("#Companynameone").val("");
        $("#Companynametwo").val("");
        $("#Companynamethree").val("");
        $("#Good").prop('checked', true);
        $('#Favactiveonoff').bootstrapToggle('off');
        //$("#txt_O_city").select2("val", "");
        //$("#txt_O_city").val("");
        $("#txt_O_state").val("");
        $("#txt_O_Country").val("");
        $("#text_O_District").val("");


    },
    ContactSelect: function (obj) {
        
        var type = obj.dataset.type;
        var col = '';
        if (type == 'mobile_1') {
            col = 'B_MOBILE_NO_1';
            $("#smsdemotab").click();
        }
        else if (type == 'mobile_2') {
            col = 'B_MOBILE_NO_2';
            $("#smsdemotab").click();
        }
        else if (type == 'Email_1') {
            col = 'B_EMAIL_1';
            $("#emaildemotab").click();
            
        }
        else if (type == 'Email_2') {
            col = 'B_EMAIL_2';
            $("#emaildemotab").click();
        }
        var $grid = $("#table_list_Contact"), selIds = $grid.jqGrid("getGridParam", "selarrrow"), i, n, cellValues = [];
        for (i = 0, n = selIds.length; i < n; i++) {
            if ($grid.jqGrid("getCell", selIds[i], col) != null && $grid.jqGrid("getCell", selIds[i], col) != "" && $grid.jqGrid("getCell", selIds[i], col) != undefined)
            {
                cellValues.push($grid.jqGrid("getCell", selIds[i], col));
            }
                
            }
            $("#hdnBEmail1").val(cellValues.join(","));

        if (cellValues.length == 0) {
            OperationMessage("", 'you have not select any record(s)', 'warning');
        }

    },

    Stickey: function (obj) {
        
        var type = obj.dataset.type;
        var $grid = $("#table_list_Contact"), selIds = $grid.jqGrid("getGridParam", "selarrrow"), i, n, cellmob = []; //cellemail = []; celladd = [];
        $("#test").html("");
        
        if (selIds.length > 10) {
            OperationMessage("", 'you can select minimum 10 records', 'warning');
        }
        else {
            
           $("#mainbodydiv").hide();
            $("#contact_view").hide();
            $("#finalpdf_view").show();
            $("#pdf_div").show();
            $("#pdf_button").show();

            for (i = 0, n = selIds.length; i < n; i++) {
                cellmob.push($grid.jqGrid("getCell", selIds[i], 'CONTACTID'));
                //cellmob.push($grid.jqGrid("getCell", selIds[i], 'B_EMAIL_1'));
                //cellmob.push($grid.jqGrid("getCell", selIds[i], 'H_ADDRESS'));
            }
            $("#hdnBEmail1").val(cellmob.join(","));
            var myfilter = { groupOp: "AND", rules: [] };
            myfilter.rules.push({ field: "IDS", op: "eq", data: $("#hdnBEmail1").val() });
            $.ajax({
                url: getDomain() + Master_ContactView.variables.BindstickListUrl + "&myfilters=" + JSON.stringify(myfilter),
                async: true,
                cache: false,
                type: 'POST',
                success: function (data) {
                    var JsonObject = xml2json.parser(data);
                    if (JsonObject.serviceresponse.detailslist != undefined) {
                        $("#test").append($("#stickeyList").render(JsonObject.serviceresponse.detailslist.details));
                    }
                },
                error: OnError,
            });
            if (cellmob.length == 0) {
                OperationMessage("", 'you have not select any record(s)', 'warning');
            }
        }
    },
    Bindkeycity: function () {     
        $('#txt_O_city').select2({
           
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
           
            Master_ContactView.CityChange(this.value);
        });
    },

    showTitlePermissionWise: function (oper) {
        if (oper == 'edit' || oper == 'add') {
            $("#btn_b_Csave").show();
            $("#btn_H_Csave").show();
            $("#btn_O_Csave").show();
            $("#btn_R_Csave").show();
        }
        else {
            if ($("#btn_b_Csave").length > 0) {
                $("#btn_b_Csave").hide();
            }
            if ($("#btn_H_Csave").length > 0) {
                $("#btn_H_Csave").hide();
            }
            if ($("#btn_O_Csave").length > 0) {
                $("#btn_O_Csave").hide();
            }
            if ($("#btn_R_Csave").length > 0) {
                $("#btn_R_Csave").hide();
            }
        }
    },
};

$(document).ready(function () {
    $("#dropdown4").attr('disabled', true);
    $('#txt_O_city').select2();
    Master_ContactView.initializeJqgrid();
    $("#homedemotab").click(function () {
        $(".cbox").prop("checked", false);
        $(".demodrop").removeClass("active");
    })
   
    Master_ContactView.Bindkeycity();
    $("#btn_b_Csave").html("Next");
    $("#btn_H_Csave").html("Next");
    $("#btn_O_Csave").html("Next");
    Master_ContactView.ClearValues();

    if ($('#text_B_Groupname > option').length == 0 && $('#text_O_District > option').length == 0 && $('#txt_O_Country > option').length == 0 && $('#txt_O_state > option').length == 0) {
        BindDropdownGroupName('text_B_Groupname', 'ddlGroupList', "/Common/BindMastersDetails?ServiceName=GROUP_GET&ISRECORDALL=true", 'Select Group');
        BindDropdownState('txt_O_state', 'DdlStateList', "/Common/BindMastersDetails?ServiceName=MASTER_COUNTRY_STATE_CITY_GET&ColumnRequested=STATE&ISRECORDALL=true", 'Select State');
        BindDropdownCountry('txt_O_Country', 'DdlCountryList', "/Common/BindMastersDetails?ServiceName=MASTER_COUNTRY_STATE_CITY_GET&ColumnRequested=COUNTRY&ISRECORDALL=true", 'Select Country');
        BindDropdownCountry('text_O_District', 'ddlDistrictList', "/Common/BindMastersDetails?ServiceName=MASTER_COUNTRY_STATE_CITY_GET&ColumnRequested=DISTRICT&ISRECORDALL=true", 'Select District');
    }
    
        //if (e.target.dataset.add == "add") {
            
        //    //BindDropdownGroupName('text_B_Groupname', 'ddlGroupList', "/Common/BindMastersDetails?ServiceName=GROUP_GET&ISRECORDALL=true", 'Select Group');
        //    //BindDropdownState('txt_O_state', 'DdlStateList', "/Common/BindMastersDetails?ServiceName=MASTER_COUNTRY_STATE_CITY_GET&ColumnRequested=STATE&ISRECORDALL=true", 'Select State');
        //    //BindDropdownCountry('txt_O_Country', 'DdlCountryList', "/Common/BindMastersDetails?ServiceName=MASTER_COUNTRY_STATE_CITY_GET&ColumnRequested=COUNTRY&ISRECORDALL=true", 'Select Country');
        //    //BindDropdownCountry('text_O_District', 'ddlDistrictList', "/Common/BindMastersDetails?ServiceName=MASTER_COUNTRY_STATE_CITY_GET&ColumnRequested=DISTRICT&ISRECORDALL=true", 'Select District');
        //}
    
    $('#SMS-modal').on('shown.bs.modal', function (e) {
        // if (e.target.dataset.add == "add") {
        // Master_ContactView.ContactSelect();
        // }
    })
    $('#Email-Modal').on('shown.bs.modal', function (e) {

        if (e.target.dataset.add == "add") {
            // Master_ContactView.ContactSelect();
        }
    })
    
    $("#btn_b_Csave").click(function () {

        var B_name = $('#text_B_fullname').val();
        var B_email1 = $('#txt_b_Email1').val();
        var B_email2 = $('#txt_b_Email2').val();
        var B_mobile1 = $('#txt_b_mobile1').val();
        var B_mobile2 = $('#txt_b_mobile2').val();
        var isvalid = 1;

        //Name--------------------------------------------------        
        if (B_name.length == 0) {
            $("#lbltext_B_fullname").show();
            isvalid = 0;
        }
        else {
            $("#lbltext_B_fullname").hide();
        }
        //Email Id 1------------------------------------------------
        if (B_email1.length != 0 && !Master_ContactView.isEmailId(B_email1)) {
            $("#lbltxt_b_Email1").show();
            isvalid = 0;
        }
        else {
            $("#lbltxt_b_Email1").hide();
        }
        //Email Id 2------------------------------------------------
        if (B_email2.length != 0 && !Master_ContactView.isEmailId(B_email2)) {
            $("#lbltxt_b_Email2").show();
            isvalid = 0;
        }
        else {
            $("#lbltxt_b_Email2").hide();
        }
        //Mobile No1.--------------------------------------------   
        if (B_mobile1.length != 0 && !Master_ContactView.validateMobileNo(B_mobile1)) {
            $("#lbltxt_b_mobile1").show();
            isvalid = 0;
        }
        else {
            $("#lbltxt_b_mobile1").hide();
        }

        //Mobile No2.--------------------------------------------   
        if (B_mobile2.length != 0 && !Master_ContactView.validateMobileNo(B_mobile2)) {
            $("#lbltxt_b_mobile2").show();
            isvalid = 0;
        }
        else {
            $("#lbltxt_b_mobile2").hide();
        }

        if (isvalid == 1) {
            Master_ContactView.variables.Oper = 'Add';
            Master_ContactView.variables.addedit = "added";
            Master_ContactView.variables.Masterid = $("#hdnContact").val();

            if (Master_ContactView.variables.Masterid != "0" && parseInt(Master_ContactView.variables.Masterid) > 0) {
                Master_ContactView.variables.Oper = 'Edit';
                Master_ContactView.variables.addedit = 'updated';
            }
            var data = {
                "CONTACTID": Master_ContactView.variables.Masterid,
                "oper": Master_ContactView.variables.Oper,
                "B_SALUTATION": $("#text_b_salutation").val(),
                "B_COMMENTS": $("#txt_B_Comments").val(),
                "B_FULLNAME": $("#text_B_fullname").val(),
                "B_NICKNAME": $("#text_B_nickname").val(),
                "B_BIRTHDATE": $("#txt_b_bridthdate").val(),
                "B_ANRY_DATE": $("#txt_b_Anrydate").val(),
                "B_MOBILE_NO_1": $("#txt_b_mobile1").val(),
                "B_MOBILE_NO_2": $("#txt_b_mobile2").val(),
                "B_EMAIL_1": $("#txt_b_Email1").val(),
                "B_EMAIL_2": $("#txt_b_Email2").val()
            }
            if ($("#text_B_Groupname").val() != null && $("#text_B_Groupname").val() != "") {
                data.B_GROUPID = $("#text_B_Groupname").val();
            }
            if (Master_ContactView.variables.Oper == 'Add') {
                $("#Basictab").removeClass('active');
                $("#OfficeTab").removeClass('active');
                $("#HomeTab").addClass('active');
                $("#tab1").removeClass('active');
                $("#tab3").removeClass('active');
                $("#tab2").addClass('active');
            } else {
                Master_ContactView.btnMasterSubmit(data);
            }
        }
        else {
            return
        }

    });
    $("#btn_H_Csave").click(function () {

        var H_mobile1 = $('#txt_H_mobile1').val();
        var H_mobile2 = $('#txt_H_mobile2').val();
        var isvalid = 1;

        //Mobile No1.--------------------------------------------   
        if (H_mobile1.length != 0 && !Master_ContactView.validateMobileNo(H_mobile1)) {
            $("#lbltxt_H_mobile1").show();
            isvalid = 0;
        }
        else {
            $("#lbltxt_H_mobile1").hide();
        }
        //Mobile No2.--------------------------------------------   
        if (H_mobile2.length != 0 && !Master_ContactView.validateMobileNo(H_mobile2)) {
            $("#lbltxt_H_mobile2").show();
            isvalid = 0;
        }
        else {
            $("#lbltxt_H_mobile2").hide();
        }

        if (isvalid == 1) {
            Master_ContactView.variables.Oper = 'Add';
            Master_ContactView.variables.addedit = "added";
            Master_ContactView.variables.Masterid = $("#hdnContact").val();

            if (Master_ContactView.variables.Masterid != "0" && parseInt(Master_ContactView.variables.Masterid) > 0) {
                Master_ContactView.variables.Oper = 'Edit';
                Master_ContactView.variables.addedit = 'updated';
            }
            var data = {
                "CONTACTID": Master_ContactView.variables.Masterid,
                "oper": Master_ContactView.variables.Oper,
                "H_ADDRESS": $("#txt_h_address").val(),
                "H_TELEPHONE_1": $("#txt_b_telep1").val(),
                "H_TELEPHONE_2": $("#txt_b_telep2").val(),
                "H_MOBILE_1": $("#txt_H_mobile1").val(),
                "H_MOBILE_2": $("#txt_H_mobile2").val(),
                "H_ZIPCODE": $("#txt_H_Zipcode").val()
                //"H_CITYID": $("#txt_H_city").val(),
                //"H_STATEID": $("#txt_H_state").val(),
                //"H_COUNTRYID": $("#txt_H_Country").val()
            };
            //if ($("#txt_H_city").val() != null && $("#txt_H_city").val() != "") {
            //    data.H_CITYID = $("#txt_H_city").val();
            //    data.H_STATEID = $("#txt_H_state").val();
            //    data.H_COUNTRYID = $("#txt_H_Country").val();
            //    data.H_DISTRICTID = $("#text_H_District").val();
            //}
            if (Master_ContactView.variables.Oper == 'Add') {
                $("#Basictab").removeClass('active');
                $("#HomeTab").removeClass('active');
                $("#OfficeTab").addClass('active');
                $("#tab1").removeClass('active');
                $("#tab2").removeClass('active');
                $("#tab3").addClass('active');
            } else {
                Master_ContactView.btnMasterSubmit(data);
            }
        }
        else {
            return
        }

    });
    $("#btn_O_Csave").click(function () {

        var o_mobile = $('#txt_O_Mobile').val();
        var o_Email = $('#txt_O_Email').val();
        var C_mobile1 = $('#txt_O_cmobile1').val();
        var C_mobile2 = $('#txt_O_cmobile2').val();

        var isvalid = 1;

        //Mobile No.--------------------------------------------   
        if (o_mobile.length != 0 && !Master_ContactView.validateMobileNo(o_mobile)) {
            $("#lbltxt_O_Mobile").show();
            isvalid = 0;
        }
        else {
            $("#lbltxt_O_Mobile").hide();
        }

        //C_Mobile No1.--------------------------------------------   
        if (C_mobile1.length != 0 && !Master_ContactView.validateMobileNo(C_mobile1)) {
            $("#lbltxt_O_cmobile1").show();
            isvalid = 0;
        }
        else {
            $("#lbltxt_O_cmobile1").hide();
        }

        //C_Mobile No2.--------------------------------------------   
        if (C_mobile2.length != 0 && !Master_ContactView.validateMobileNo(C_mobile2)) {
            $("#lbltxt_O_cmobile2").show();
            isvalid = 0;
        }
        else {
            $("#lbltxt_O_cmobile2").hide();
        }

        //Email Id 1------------------------------------------------
        if (o_Email.length != 0 && !Master_ContactView.isEmailId(o_Email)) {
            $("#lbltxt_O_Email").show();
            isvalid = 0;
        }
        else {
            $("#lbltxt_O_Email").hide();
        }


        if (isvalid == 1) {
            Master_ContactView.variables.Oper = 'Add';
            Master_ContactView.variables.addedit = "added";
            Master_ContactView.variables.Masterid = $("#hdnContact").val();

            if (Master_ContactView.variables.Masterid != "0" && parseInt(Master_ContactView.variables.Masterid) > 0) {
                Master_ContactView.variables.Oper = 'Edit';
                Master_ContactView.variables.addedit = 'updated';
            }
            if (Master_ContactView.variables.Oper == 'Add') {
                var data = {
                    "CONTACTID": Master_ContactView.variables.Masterid,
                    "oper": Master_ContactView.variables.Oper,
                    "B_SALUTATION": $("#text_b_salutation").val(),
                    "B_COMMENTS": $("#txt_B_Comments").val(),

                    "B_FULLNAME": $("#text_B_fullname").val(),
                    "B_NICKNAME": $("#text_B_nickname").val(),
                    "B_BIRTHDATE": $("#txt_b_bridthdate").val(),
                    "B_ANRY_DATE": $("#txt_b_Anrydate").val(),
                    "B_MOBILE_NO_1": $("#txt_b_mobile1").val(),
                    "B_MOBILE_NO_2": $("#txt_b_mobile2").val(),
                    "B_EMAIL_1": $("#txt_b_Email1").val(),
                    "B_EMAIL_2": $("#txt_b_Email2").val(),

                    "H_ADDRESS": $("#txt_h_address").val(),
                    "H_TELEPHONE_1": $("#txt_b_telep1").val(),
                    "H_TELEPHONE_2": $("#txt_b_telep2").val(),
                    "H_MOBILE_1": $("#txt_H_mobile1").val(),
                    "H_MOBILE_2": $("#txt_H_mobile2").val(),
                    "H_ZIPCODE": $("#txt_H_Zipcode").val(),
                    //"H_CITYID": $("#txt_H_city").val(),
                    //"H_STATEID": $("#txt_H_state").val(),
                    //"H_COUNTRYID": $("#txt_H_Country").val(),

                    "O_COMPNYNAME": $("#txt_O_Comapnyname").val(),
                    "O_ADDRESS": $("#txt_O_address").val(),
                    "O_TELEPHONE_1": $("#txt_O_tele1").val(),
                    "O_TELEPHONE_2": $("#txt_O_tele2").val(),
                    "O_FAX": $("#txt_O_fax").val(),
                    "O_MOBILE": $("#txt_O_Mobile").val(),
                    "O_POST": $("#txt_O_post").val(),
                    "O_EMAIL": $("#txt_O_Email").val(),
                    "O_CONTACT_PERSON": $("#txt_O_contactperson").val(),
                    "O_DEPARTMENT": $("#txt_O_Department").val(),
                    "O_CP_MO1": $("#txt_O_cmobile1").val(),
                    "O_CP_MO2": $("#txt_O_cmobile2").val(),
                    "O_ZIPCODE": $("#txt_O_zipcode").val(),
                    "O_WEBSITE": $("#txt_O_Website").val(),
                    //"O_CITYID": $("#txt_O_city").val(),
                    //"O_STATEID": $("#txt_O_state").val(),
                    //"O_COUNTRYID": $("#txt_O_Country").val(),

                }
                //if ($("#txt_H_city").val() != null && $("#txt_H_city").val() != "") {
                //    data.H_CITYID = $("#txt_H_city").val();
                //    data.H_STATEID = $("#txt_H_state").val();
                //    data.H_COUNTRYID = $("#txt_H_Country").val();
                //    data.H_DISTRICTID = $("#text_H_District").val();
                //}
            } else {
                var data = {
                    "CONTACTID": Master_ContactView.variables.Masterid,
                    "oper": Master_ContactView.variables.Oper,
                    "O_COMPNYNAME": $("#txt_O_Comapnyname").val(),
                    "O_ADDRESS": $("#txt_O_address").val(),
                    "O_TELEPHONE_1": $("#txt_O_tele1").val(),
                    "O_TELEPHONE_2": $("#txt_O_tele2").val(),
                    "O_FAX": $("#txt_O_fax").val(),
                    "O_MOBILE": $("#txt_O_Mobile").val(),
                    "O_POST": $("#txt_O_post").val(),
                    "O_EMAIL": $("#txt_O_Email").val(),
                    "O_CONTACT_PERSON": $("#txt_O_contactperson").val(),
                    "O_DEPARTMENT": $("#txt_O_Department").val(),
                    "O_CP_MO1": $("#txt_O_cmobile1").val(),
                    "O_CP_MO2": $("#txt_O_cmobile2").val(),
                    "O_ZIPCODE": $("#txt_O_zipcode").val(),
                    "O_WEBSITE": $("#txt_O_Website").val(),
                    //"O_CITYID": $("#txt_O_city").val(),
                    //"O_STATEID": $("#txt_O_state").val(),
                    //"O_COUNTRYID": $("#txt_O_Country").val(),
                }
            }

            if ($("#txt_O_city").val() != null && $("#txt_O_city").val() != "") {
                data.O_CITYID = $('#txt_O_city').select2('val');
                data.O_STATEID = $("#txt_O_state").val();
                data.O_COUNTRYID = $("#txt_O_Country").val();
                data.O_DISTRICTID = $("#text_O_District").val();

            }
            if ($("#text_B_Groupname").val() != null && $("#text_B_Groupname").val() != "") {
                data.B_GROUPID = $("#text_B_Groupname").val();
            }
            if (Master_ContactView.variables.Oper == 'Add') {
                $("#Basictab").removeClass('active');
                $("#HomeTab").removeClass('active');
                $("#OfficeTab").removeClass('active');
                $("#ReferenceBy").addClass('active');
                $("#tab1").removeClass('active');
                $("#tab2").removeClass('active');
                $("#tab3").removeClass('active');
                $("#tab4").addClass('active');
            } else {
                Master_ContactView.btnMasterSubmit(data);
            }
          
        }
        else {
            return
        }

    });
    $("#btn_R_Csave").click(function () {


        
            Master_ContactView.variables.Oper = 'Add';
            Master_ContactView.variables.addedit = "added";
            Master_ContactView.variables.Masterid = $("#hdnContact").val();

            if (Master_ContactView.variables.Masterid != "0" && parseInt(Master_ContactView.variables.Masterid) > 0) {
                Master_ContactView.variables.Oper = 'Edit';
                Master_ContactView.variables.addedit = 'updated';
            }
        
            //var values = [];
            //$("input[name='checkboxval']:checked").each(function () {
            //    values.push($(this).val());
            //});
            //var str = values.join(",");        
             if ($("#Favactiveonoff").prop("checked") == true) {

                favactivetoggle = "1";

            } else {
                favactivetoggle = "0";
            }
            if (Master_ContactView.variables.Oper == 'Add') {
               
                var data = {
                    "CONTACTID": Master_ContactView.variables.Masterid,
                    "oper": Master_ContactView.variables.Oper,
                    "B_SALUTATION": $("#text_b_salutation").val(),
                    "B_COMMENTS": $("#txt_B_Comments").val(),

                    "B_FULLNAME": $("#text_B_fullname").val(),
                    "B_NICKNAME": $("#text_B_nickname").val(),
                    "B_BIRTHDATE": $("#txt_b_bridthdate").val(),
                    "B_ANRY_DATE": $("#txt_b_Anrydate").val(),
                    "B_MOBILE_NO_1": $("#txt_b_mobile1").val(),
                    "B_MOBILE_NO_2": $("#txt_b_mobile2").val(),
                    "B_EMAIL_1": $("#txt_b_Email1").val(),
                    "B_EMAIL_2": $("#txt_b_Email2").val(),

                    "H_ADDRESS": $("#txt_h_address").val(),
                    "H_TELEPHONE_1": $("#txt_b_telep1").val(),
                    "H_TELEPHONE_2": $("#txt_b_telep2").val(),
                    "H_MOBILE_1": $("#txt_H_mobile1").val(),
                    "H_MOBILE_2": $("#txt_H_mobile2").val(),
                    "H_ZIPCODE": $("#txt_H_Zipcode").val(),
                    //"H_CITYID": $("#txt_H_city").val(),
                    //"H_STATEID": $("#txt_H_state").val(),
                    //"H_COUNTRYID": $("#txt_H_Country").val(),

                    "O_COMPNYNAME": $("#txt_O_Comapnyname").val(),
                    "O_ADDRESS": $("#txt_O_address").val(),
                    "O_TELEPHONE_1": $("#txt_O_tele1").val(),
                    "O_TELEPHONE_2": $("#txt_O_tele2").val(),
                    "O_FAX": $("#txt_O_fax").val(),
                    "O_MOBILE": $("#txt_O_Mobile").val(),
                    "O_POST": $("#txt_O_post").val(),
                    "O_EMAIL": $("#txt_O_Email").val(),
                    "O_CONTACT_PERSON": $("#txt_O_contactperson").val(),
                    "O_DEPARTMENT": $("#txt_O_Department").val(),
                    "O_CP_MO1": $("#txt_O_cmobile1").val(),
                    "O_CP_MO2": $("#txt_O_cmobile2").val(),
                    "O_ZIPCODE": $("#txt_O_zipcode").val(),
                    "O_WEBSITE": $("#txt_O_Website").val(),
                    //"B_SALUTATION": $("#good").val(),
                    //"B_COMMENTS": $("#Referecebyone").val(),
                    //"B_FULLNAME": $("#Companynameone").val(),
                    //"B_NICKNAME": $("#Referecebytwo").val(),
                    //"B_BIRTHDATE": $("#Companynametwo").val(),
        
                    "R_REVIEW": $('input[name=radio-group]:checked').val(),
                    "R_REFERENCEBY_1": $("#Referecebyone").val(),
                    "R_REFERENCEBY_2": $("#Referecebytwo").val(),
                    "R_REFERENCEBY_3": $("#Referecebythree").val(),
                    "R_COMPANYNAME_1": $("#Companynameone").val(),
                    "R_COMPANYNAME_2": $("#Companynametwo").val(),
                    "R_COMPANYNAME_3": $("#Companynamethree").val(),
                    "R_FAVOURITE": favactivetoggle
                }
                if ($("#txt_O_city").val() != null && $("#txt_O_city").val() != "") {
                    data.O_CITYID = $('#txt_O_city').select2('val');
                    data.O_STATEID = $("#txt_O_state").val();
                    data.O_COUNTRYID = $("#txt_O_Country").val();
                    data.O_DISTRICTID = $("#text_O_District").val();

                }
                if ($("#text_B_Groupname").val() != null && $("#text_B_Groupname").val() != "") {
                    data.B_GROUPID = $("#text_B_Groupname").val();
                }
            } else {
                var data = {
                    "CONTACTID": Master_ContactView.variables.Masterid,
                    "oper": Master_ContactView.variables.Oper,
                    "R_REVIEW":$('input[name=radio-group]:checked').val(),
                    "R_REFERENCEBY_1": $("#Referecebyone").val(),
                    "R_REFERENCEBY_2": $("#Referecebytwo").val(),
                    "R_REFERENCEBY_3": $("#Referecebythree").val(),
                    "R_COMPANYNAME_1": $("#Companynameone").val(),
                    "R_COMPANYNAME_2": $("#Companynametwo").val(),
                    "R_COMPANYNAME_3": $("#Companynamethree").val(),
                    "R_FAVOURITE": favactivetoggle
                }
            }
            Master_ContactView.btnMasterSubmit(data);
            $("#homedemotab").click();
       
      

    });
    $("#btnAddNewcontact").click(function () {
        $("#Addcontactfrom").show();
        $("#viewcontactform").hide();
        
        //$("#contactdemotab").addClass("active");
        //$("#Contact").addClass('active');
        //$("#homedemotab").removeClass('active');
        //$("#Hometab").removeClass('active');
        $("#btn_b_Csave").html("Next");
        $("#btn_H_Csave").html("Next");
        $("#btn_O_Csave").html("Next");

        Master_ContactView.ClearValues();
    });
    $("#backtocontactview").click(function () {
        $("#Addcontactfrom").hide();
        $("#viewcontactform").show();
    });
    $("#btnaddon3").keyup(function () {

        Master_ContactView.initializeJqgrid();
    });
    $("#btn_contactdel").click(function () {
        Master_ContactView.btnMasterDelete();

    });

    // Import/Export

    var data = RegisterFileUploadToLinkForExcelImport('inputImage', 'inputImage');
    //export
    $("#liExport").click(function () {
        var temp = "";
        $("#table_list_Contact .cbox").each(function () {
            if ($(this).is(":checked")) {
                temp += $(this).closest("tr").attr("id") + ",";
            }
        });
        if (temp.length > 0) {
            temp = temp.substring(0, temp.length - 1);
        }
        
        var ExportURL = getDomain() + "/Common/ExportFromGrid?ServiceName=CONTACT_GET&IsRecordAll=true&FileName=Contacts_";
        var myfilter = { groupOp: "AND", rules: [] };
        myfilter.rules.push({ field: "TERMS", op: "eq", data: $("#btnaddon3").val() }, { field: "CONTACTLIST", op: "eq", data: temp });
        $(".cd-overlay").toggleClass("show-loder");
        $("#loder").toggleClass("show-loder");

        $.ajax({
            url: ExportURL + "&myfilters=" + JSON.stringify(myfilter),
            data: { FilePath: "~/Book1.xlsx" },
            async: true,
            cache: false,
            type: 'POST',
            success: function (data) {
                var Epath = getDomain() + data;
                $(".cd-overlay").toggleClass("show-loder");
                $("#loder").toggleClass("show-loder");
                window.open(Epath, '_blank');
            },
            error: OnError,
        });
    });
});