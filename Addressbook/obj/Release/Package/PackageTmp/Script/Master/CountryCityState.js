var MasterView = {
    variables: {
        BindMasterUrl: "/Common/BindMastersDetails?ServiceName=MASTER_COUNTRY_STATE_CITY_GET",
        PerformMasterOperationUrl: "/Common/OpeartionsOnMaster?ServiceName=MASTER_CITY_STATE_COUNTRY_CRUDOPERATIONS",
        Oper: 'Add',
        addedit: "added",
        Masterid: "",
        Masterhiddenid: 0,
        Page: "",
        deleteCurrencyFmatter: function (cellvalue, options, rowObject, view) {
            return "<div  onclick=\"MasterView.deleteRow('" + options.rowId + "','Currency');\"><i style=\"cursor:pointer; color:red;\" title=\"Delete\" class=\"fa fa-trash-o fa-lg\"></i></div>";
        },
        deleteCountryFmatter: function (cellvalue, options, rowObject, view) {
            return "<div  onclick=\"MasterView.deleteRow('" + options.rowId + "','Country');\"><i style=\"cursor:pointer; color:red;\" title=\"Delete\" class=\"fa fa-trash-o fa-lg\"></i></div>";
        },
        deleteStateFmatter: function (cellvalue, options, rowObject, view) {
            return "<div  onclick=\"MasterView.deleteRow('" + options.rowId + "','State');\"><i style=\"cursor:pointer; color:red;\" title=\"Delete\" class=\"fa fa-trash-o fa-lg\"></i></div>";
        },
        deleteCityFmatter: function (cellvalue, options, rowObject, view) {
            return "<div  onclick=\"MasterView.deleteRow('" + options.rowId + "','City');\"><i style=\"cursor:pointer; color:red;\" title=\"Delete\" class=\"fa fa-trash-o fa-lg\"></i></div>";
        },
        deleteDistrictFmatter: function (cellvalue, options, rowObject, view) {
            return "<div  onclick=\"MasterView.deleteRow('" + options.rowId + "','District');\"><i style=\"cursor:pointer; color:red;\" title=\"Delete\" class=\"fa fa-trash-o fa-lg\"></i></div>";
        },
        editDistrictBtnFmatter: function (cellvalue, options, rowObject, view, oper) {
            if (isU()) {
                return "<div onclick=\"MasterView.DistricttriggerId('" + options.rowId + "','District');\"><i  style=\"cursor:pointer;  color:#1cbac8;\" title=\"Edit\" class=\"fa fa-pencil fa-lg\"></i></div>";
            }
            else {
                return "<div  onclick=\"MasterView.DistricttriggerId('" + options.rowId + "','District');\"><i style=\"cursor:pointer\" title=\"View\" class=\"hr-font-green fa fa-eye\"></i></div>";
            }
        },
        editCityBtnFmatter: function (cellvalue, options, rowObject, view, oper) {
            if (isU()) {
                return "<div onclick=\"MasterView.CitytriggerId('" + options.rowId + "','City');\"><i  style=\"cursor:pointer;  color:#1cbac8;\" title=\"Edit\" class=\"fa fa-pencil fa-lg\"></i></div>";
            }
            else {
                return "<div  onclick=\"MasterView.CitytriggerId('" + options.rowId + "','City');\"><i style=\"cursor:pointer\" title=\"View\" class=\"hr-font-green fa fa-eye\"></i></div>";
            }
        },
        editStateBtnFmatter: function (cellvalue, options, rowObject, view, oper) {
            if (isU()) {
                return "<div onclick=\"MasterView.StatetriggerId('" + options.rowId + "','State');\"><i  style=\"cursor:pointer;  color:#1cbac8;\" title=\"Edit\" class=\"fa fa-pencil fa-lg\"></i></div>";
            }
            else {
                return "<div  onclick=\"MasterView.StatetriggerId('" + options.rowId + "','State');\"><i style=\"cursor:pointer\" title=\"View\" class=\"hr-font-green fa fa-eye\"></i></div>";
            }
        },
        editCountryBtnFmatter: function (cellvalue, options, rowObject, view, oper) {
            if (isU()) {
                return "<div onclick=\"MasterView.CountrytriggerId('" + options.rowId + "','Country');\"><i  style=\"cursor:pointer;  color:#1cbac8;\" title=\"Edit\" class=\"fa fa-pencil fa-lg\"></i></div>";
            }
            else {
                return "<div  onclick=\"MasterView.CountrytriggerId('" + options.rowId + "','Country');\"><i style=\"cursor:pointer\" title=\"View\" class=\"hr-font-green fa fa-eye\"></i></div>";
            }
        },
        editCurrencyBtnFmatter: function (cellvalue, options, rowObject, view, oper) {
            if (isU()) {
                return "<div onclick=\"MasterView.CurrencytriggerId('" + options.rowId + "','Currency');\"><i  style=\"cursor:pointer;  color:#1cbac8;\" title=\"Edit\" class=\"fa fa-pencil fa-lg\"></i></div>";
            }
            else {
                return "<div  onclick=\"MasterView.CurrencytriggerId('" + options.rowId + "','Currency');\"><i style=\"cursor:pointer\" title=\"View\" class=\"hr-font-green fa fa-eye\"></i></div>";
            }
        },

    },
    initializeJqgridCurrency: function () {
        var colNames = ['Currency Id', 'Currency Name', 'Currency Code', 'Language', 'Symbol'];
        var colModel = [
                { name: "CURRENCYID", index: "CURRENCYID", xmlmap: xmlvars.common_colmap + "CURRENCYID", hidden: true },
                { name: "CURRENCYNAME", index: "CURRENCYNAME", width: 25, xmlmap: xmlvars.common_colmap + "CURRENCYNAME", stype: "text", sortable: true, search: true, searchoptions: jqGridVariables.stringSearchOption },
                { name: "CURRENCYCODE", index: "CURRENCYCODE", width: 15, xmlmap: xmlvars.common_colmap + "CURRENCYCODE", sortable: false, search: false },
                { name: "LANGUAGE", index: "LANGUAGE", width: 15, xmlmap: xmlvars.common_colmap + "LANGUAGE", sortable: false, search: false },
                { name: "SYMBOL", index: "SYMBOL", width: 15, xmlmap: xmlvars.common_colmap + "SYMBOL", sortable: false, search: false },
        ];
        if (isU()) {
            colNames.push('Edit');
            colModel.push({ name: 'edit', index: 'edit', width: 5, sortable: false, align: "center", search: false, formatter: function (cv, op, ro) { return MasterView.variables.editCurrencyBtnFmatter(cv, op, ro, 'MasterView', 'edit') } });
        } else if (isV()) {
            colNames.push('Edit');
            colModel.push({ name: 'edit', index: 'edit', width: 5, sortable: false, align: "center", search: false, formatter: function (cv, op, ro) { return MasterView.variables.editCurrencyBtnFmatter(cv, op, ro, 'MasterView', 'view') } });
        }
        if (isD()) {
            colNames.push('Delete');
            colModel.push({ name: 'act', index: 'act', width: 10, sortable: false, align: "center", search: false, formatter: function (cv, op, ro) { return MasterView.variables.deleteCurrencyFmatter(cv, op, ro) } });
        }
        $("#table_list_Currency").jqGrid({
            url: getDomain() + MasterView.variables.BindMasterUrl + "&ColumnRequested=CURRENCY",
            datatype: "xml",
            height: '100%',
            autowidth: true,
            shrinkToFit: true,
            rowNum: 25,
            rowList: [25, 50, 100],
            colNames: colNames,
            colModel: colModel,
            pager: "#pager_list_Currency",
            xmlReader: {
                root: xmlvars.common_root,
                row: xmlvars.common_row,
                page: xmlvars.common_response + "CURRENTPAGE",
                total: xmlvars.common_response + "TOTALPAGES",
                records: xmlvars.common_response + "TOTALRECORDS",
                repeatitems: false,
                id: "CURRENCYID"
            },
            loadComplete: function () {
                $("tr.jqgrow:even").addClass('myAltRowClass');
                $("#table_list_Currency").jqGrid('setGridHeight', $(window).innerHeight() - 350 - ($("#gbox_table_list_Currency").height() - $('#gbox_table_list_Currency .ui-jqgrid-bdiv').height()));

                if ($('#table_list_Currency').getGridParam('records') === 0)
                    $('.ui-jqgrid-htable').hide();
                else
                    $('.ui-jqgrid-htable').show();

                var width = $('#jqGrid_Currency').width();
                if (width <= 430) {
                    width = 700;
                }
                $('#table_list_Currency').setGridWidth(width);
            },
            loadError: OnJqloadError,
            beforeProcessing: OnJqbeforeProcessingErrorcheck,
            viewrecords: true,
            sortname: 'CURRENCYID',
            sortorder: 'asc',

        });

        // Setup buttons
        $("#table_list_Currency").jqGrid('navGrid', '#pager_list_Currency',
                { edit: false, add: false, del: false, search: false },
                { height: 200, reloadAfterSubmit: true }
        );
        AlignJqGridHeader('table_list_Currency', ['act', 'edit']);

    },
    initializeJqgridCountry: function () {
        var colNames = ['Country Id', 'Country Name', 'CurrencyId', 'Currency', 'FLAGIMG', 'Flag'];
        var colModel = [
                { name: "COUNTRYID", index: "COUNTRYID", width: 20, xmlmap: xmlvars.common_colmap + "COUNTRYID", stype: 'int', sortable: true },
                { name: "COUNTRYNAME", index: "COUNTRYNAME", width: 25, xmlmap: xmlvars.common_colmap + "COUNTRYNAME", stype: "text", sortable: true, search: true, searchoptions: jqGridVariables.stringSearchOption },
                { name: "CURRENCYID", index: "CURRENCYID", xmlmap: xmlvars.common_colmap + "CURRENCYID", hidden: true },
                { name: "CURRENCYNAME", index: "CURRENCYNAME", width: 15, xmlmap: xmlvars.common_colmap + "CURRENCYNAME", sortable: false, search: false },
                { name: "FLAGIMG", index: "FLAGIMG", xmlmap: xmlvars.common_colmap + "FLAGIMG", sortable: false, search: false, hidden: true },
                {
                    name: "FLAG", index: "FLAGIMG", width: 10, xmlmap: xmlvars.common_colmap + "FLAGIMG", sortable: false, search: false,
                    formatter: function (cv, op, ro) {
                        return "<img width=\"30\" height=\"30\" src=\"" + getDomain() + "/UploadFiles/Country/" + cv + "\">";
                    }
                },
        ];
        if (isU()) {
            colNames.push('Edit');
            colModel.push({ name: 'edit', index: 'edit', width: 5, sortable: false, align: "center", search: false, formatter: function (cv, op, ro) { return MasterView.variables.editCountryBtnFmatter(cv, op, ro, 'MasterView', 'edit') } });
        } else if (isV()) {
            colNames.push('Edit');
            colModel.push({ name: 'edit', index: 'edit', width: 5, sortable: false, align: "center", search: false, formatter: function (cv, op, ro) { return MasterView.variables.editCountryBtnFmatter(cv, op, ro, 'MasterView', 'view') } });
        }
        if (isD()) {
            colNames.push('Delete');
            colModel.push({ name: 'act', index: 'act', width: 10, sortable: false, align: "center", search: false, formatter: function (cv, op, ro) { return MasterView.variables.deleteCountryFmatter(cv, op, ro) } });
        }
        $("#table_list_Country").jqGrid({
            url: getDomain() + MasterView.variables.BindMasterUrl + "&ColumnRequested=COUNTRY",
            datatype: "xml",
            height: '100%',
            autowidth: true,
            shrinkToFit: true,
            rowNum: 25,
            rowList: [25, 50, 100],
            colNames: colNames,
            colModel: colModel,
            pager: "#pager_list_Country",
            xmlReader: {
                root: xmlvars.common_root,
                row: xmlvars.common_row,
                page: xmlvars.common_response + "CURRENTPAGE",
                total: xmlvars.common_response + "TOTALPAGES",
                records: xmlvars.common_response + "TOTALRECORDS",
                repeatitems: false,
                id: "COUNTRYID"
            },
            loadComplete: function () {
                $("tr.jqgrow:even").addClass('myAltRowClass');
                $("#table_list_Country").jqGrid('setGridHeight', $(window).innerHeight() - 310 - ($("#gbox_table_list_Country").height() - $('#gbox_table_list_Country .ui-jqgrid-bdiv').height()));

                if ($('#table_list_Country').getGridParam('records') === 0)
                    $('.ui-jqgrid-htable').hide();
                else
                    $('.ui-jqgrid-htable').show();

                var width = $('#jqGrid_Country').width();
                if (width <= 430) {
                    width = 700;
                }
                $('#table_list_Country').setGridWidth(width);
            },
            loadError: OnJqloadError,
            beforeProcessing: OnJqbeforeProcessingErrorcheck,
            viewrecords: true,
            sortname: 'COUNTRYID',
            sortorder: 'asc',

        });

        // Setup buttons
        $("#table_list_Country").jqGrid('navGrid', '#pager_list_Country',
                { edit: false, add: false, del: false, search: false },
                { height: 200, reloadAfterSubmit: true }
        );
        AlignJqGridHeader('table_list_Country', ['act', 'edit']);

    },
    initializeJqgridState: function () {
        var colNames = ['State Id', 'Country Code', 'Contry Name', 'State Name', 'State Code'];
        var colModel = [
                { name: "STATEID", index: "STATEID", width: 20, xmlmap: xmlvars.common_colmap + "STATEID", stype: 'int', sortable: true, search: false },
                { name: "COUNTRYID", index: "COUNTRYID", width: 20, xmlmap: xmlvars.common_colmap + "COUNTRYID", stype: 'int', sortable: true, search: false, hidden: true },
                { name: "COUNTRYNAME", index: "COUNTRYNAME", width: 35, xmlmap: xmlvars.common_colmap + "COUNTRYNAME", stype: "text", sortable: true, search: true, searchoptions: jqGridVariables.stringSearchOption },
                { name: "STATENAME", index: "STATENAME", width: 35, xmlmap: xmlvars.common_colmap + "STATENAME", stype: "text", sortable: true, search: true, searchoptions: jqGridVariables.stringSearchOption },
                { name: "STATECODE", index: "STATECODE", width: 15, xmlmap: xmlvars.common_colmap + "STATECODE", stype: "text", sortable: true, search: true, searchoptions: jqGridVariables.stringSearchOption },
        ];
        if (isU()) {
            colNames.push('Edit');
            colModel.push({ name: 'edit', index: 'edit', width: 5, sortable: false, align: "center", search: false, formatter: function (cv, op, ro) { return MasterView.variables.editStateBtnFmatter(cv, op, ro, 'MasterView', 'edit') } });
        } else if (isV()) {
            colNames.push('Edit');
            colModel.push({ name: 'edit', index: 'edit', width: 5, sortable: false, align: "center", search: false, formatter: function (cv, op, ro) { return MasterView.variables.editStateBtnFmatter(cv, op, ro, 'MasterView', 'view') } });
        }
        if (isD()) {
            colNames.push('Delete');
            colModel.push({ name: 'act', index: 'act', width: 10, sortable: false, align: "center", search: false, formatter: function (cv, op, ro) { return MasterView.variables.deleteStateFmatter(cv, op, ro) } });
        }

        $("#table_list_State").jqGrid({
            url: getDomain() + MasterView.variables.BindMasterUrl + "&ColumnRequested=STATE",
            datatype: "xml",
            height: '100%',
            autowidth: true,
            shrinkToFit: true,
            rowNum: 25,
            rowList: [25, 50, 100],
            colNames: colNames,
            colModel: colModel,
            pager: "#pager_list_State",
            xmlReader: {
                root: xmlvars.common_root,
                row: xmlvars.common_row,
                page: xmlvars.common_response + "CURRENTPAGE",
                total: xmlvars.common_response + "TOTALPAGES",
                records: xmlvars.common_response + "TOTALRECORDS",
                repeatitems: false,
                id: "STATEID"
            },
            loadComplete: function () {
                $("tr.jqgrow:even").addClass('myAltRowClass');
                $("#table_list_State").jqGrid('setGridHeight', $(window).innerHeight() - 350 - ($("#gbox_table_list_State").height() - $('#gbox_table_list_State .ui-jqgrid-bdiv').height()));

                if ($('#table_list_State').getGridParam('records') === 0)
                    $('.ui-jqgrid-htable').hide();
                else
                    $('.ui-jqgrid-htable').show();
                var width = $('#jqGrid_State').width();
                if (width <= 430) {
                    width = 700;
                }
                //var width = 578;
                $('#table_list_State').setGridWidth(width);
            },
            loadError: OnJqloadError,
            beforeProcessing: OnJqbeforeProcessingErrorcheck,
            viewrecords: true,
            sortname: 'STATEID',
            sortorder: 'asc',

        });

        // Setup buttons
        $("#table_list_State").jqGrid('navGrid', '#pager_list_State',
                { edit: false, add: false, del: false, search: false },
                { height: 200, reloadAfterSubmit: true }
        );
        $("#pager_list_State_left").css("width", "");
        AlignJqGridHeader('table_list_State', ['act', 'edit']);
    },
    initializeJqgridCity: function () {
        var colNames = ['City Id', 'District Name', 'Distict Id', 'City Name'];
        var colModel = [
                { name: "CITYID", index: "CITYID", width: 20, xmlmap: xmlvars.common_colmap + "CITYID", stype: 'int', sortable: true, search: false },
                { name: "DISTRICTNAME", index: "DISTRICTNAME", width: 35, xmlmap: xmlvars.common_colmap + "DISTRICTNAME", stype: "text", sortable: true, search: true, searchoptions: jqGridVariables.stringSearchOption },
                { name: "DISTRICTID", index: "DISTRICTID", width: 20, xmlmap: xmlvars.common_colmap + "DISTRICTID", stype: 'int', sortable: true, search: false, hidden: true },
                { name: "CITYNAME", index: "CITYNAME", width: 35, xmlmap: xmlvars.common_colmap + "CITYNAME", stype: "text", sortable: true, search: true, searchoptions: jqGridVariables.stringSearchOption },
        ];
        if (isU()) {
            colNames.push('Edit');
            colModel.push({ name: 'edit', index: 'edit', width: 5, sortable: false, align: "center", search: false, formatter: function (cv, op, ro) { return MasterView.variables.editCityBtnFmatter(cv, op, ro, 'MasterView', 'edit') } });
        } else if (isV()) {
            colNames.push('Edit');
            colModel.push({ name: 'edit', index: 'edit', width: 5, sortable: false, align: "center", search: false, formatter: function (cv, op, ro) { return MasterView.variables.editCityBtnFmatter(cv, op, ro, 'MasterView', 'view') } });
        }
        if (isD()) {
            colNames.push('Delete');
            colModel.push({ name: 'act', index: 'act', width: 10, sortable: false, align: "center", search: false, formatter: function (cv, op, ro) { return MasterView.variables.deleteCityFmatter(cv, op, ro) } });
        }
        var sfilter = { rules: [] };
        sfilter.rules.push({ field: "CITY", op: "eq", data: '' });

        $("#table_list_City").jqGrid({
            url: getDomain() + MasterView.variables.BindMasterUrl + "&ColumnRequested=CITY&myfilters=" + JSON.stringify(sfilter),
            datatype: "xml",
            height: '100%',
            autowidth: true,
            shrinkToFit: true,
            rowNum: 25,
            rowList: [25, 50, 100],
            colNames: colNames,
            colModel: colModel,
            pager: "#pager_list_City",
            xmlReader: {
                root: xmlvars.common_root,
                row: xmlvars.common_row,
                page: xmlvars.common_response + "CURRENTPAGE",
                total: xmlvars.common_response + "TOTALPAGES",
                records: xmlvars.common_response + "TOTALRECORDS",
                repeatitems: false,
                id: "CITYID"
            },
            loadComplete: function () {
                $("tr.jqgrow:even").addClass('myAltRowClass');
                $("#table_list_City").jqGrid('setGridHeight', $(window).innerHeight() - 310 - ($("#gbox_table_list_City").height() - $('#gbox_table_list_City .ui-jqgrid-bdiv').height()));

                if ($('#table_list_City').getGridParam('records') === 0)
                    $('.ui-jqgrid-htable').hide();
                else
                    $('.ui-jqgrid-htable').show();
                var width = $('#jqGrid_City').width();
                if (width <= 430) {
                    width = 700;
                }
                //var width = 578;
                $('#table_list_City').setGridWidth(width);
            },
            loadError: OnJqloadError,
            beforeProcessing: OnJqbeforeProcessingErrorcheck,
            viewrecords: true,
            sortname: 'CITYID',
            sortorder: 'asc',

        });

        // Setup buttons
        $("#table_list_City").jqGrid('navGrid', '#pager_list_City',
                { edit: false, add: false, del: false, search: false },
                { height: 200, reloadAfterSubmit: true }
        );
        $("#pager_list_City_left").css("width", "");
        AlignJqGridHeader('table_list_City', ['act', 'edit']);
    },
    initializeJqgridDistrict: function () {
        var colNames = ['District Id', 'StateId', 'State Name', 'District Name'];
        var colModel = [
                { name: "DISTRICTID", index: "DISTRICTID", width: 20, xmlmap: xmlvars.common_colmap + "DISTRICTID", stype: 'int', sortable: true, search: false },
                { name: "STATEID1", index: "STATEID1", width: 20, xmlmap: xmlvars.common_colmap + "STATEID1", sortable: true, search: false, hidden: true },
                { name: "STATENAME", index: "STATENAME", width: 35, xmlmap: xmlvars.common_colmap + "STATENAME", stype: "text", sortable: true, search: true, searchoptions: jqGridVariables.stringSearchOption },
                { name: "DISTRICTNAME", index: "DISTRICTNAME", width: 35, xmlmap: xmlvars.common_colmap + "DISTRICTNAME", stype: "text", sortable: true, search: true, searchoptions: jqGridVariables.stringSearchOption },
        ];
        if (isU()) {
            colNames.push('Edit');
            colModel.push({ name: 'edit', index: 'edit', width: 5, sortable: false, align: "center", search: false, formatter: function (cv, op, ro) { return MasterView.variables.editDistrictBtnFmatter(cv, op, ro, 'MasterView', 'edit') } });
        } else if (isV()) {
            colNames.push('Edit');
            colModel.push({ name: 'edit', index: 'edit', width: 5, sortable: false, align: "center", search: false, formatter: function (cv, op, ro) { return MasterView.variables.editDistrictBtnFmatter(cv, op, ro, 'MasterView', 'view') } });
        }
        if (isD()) {
            colNames.push('Delete');
            colModel.push({ name: 'act', index: 'act', width: 10, sortable: false, align: "center", search: false, formatter: function (cv, op, ro) { return MasterView.variables.deleteDistrictFmatter(cv, op, ro) } });
        }
        $("#table_list_District").jqGrid({
            url: getDomain() + MasterView.variables.BindMasterUrl + "&ColumnRequested=DISTRICT",
            datatype: "xml",
            height: '100%',
            autowidth: true,
            shrinkToFit: true,
            rowNum: 25,
            rowList: [25, 50, 100],
            colNames: colNames,
            colModel: colModel,
            pager: "#pager_list_District",
            xmlReader: {
                root: xmlvars.common_root,
                row: xmlvars.common_row,
                page: xmlvars.common_response + "CURRENTPAGE",
                total: xmlvars.common_response + "TOTALPAGES",
                records: xmlvars.common_response + "TOTALRECORDS",
                repeatitems: false,
                id: "DISTRICTID"
            },
            loadComplete: function () {
                $("tr.jqgrow:even").addClass('myAltRowClass');
                $("#table_list_District").jqGrid('setGridHeight', $(window).innerHeight() - 310 - ($("#gbox_table_list_District").height() - $('#gbox_table_list_District .ui-jqgrid-bdiv').height()));

                if ($('#table_list_District').getGridParam('records') === 0)
                    $('.ui-jqgrid-htable').hide();
                else
                    $('.ui-jqgrid-htable').show();

                //var width = 578;
                var width = $('#jqGrid_District').width();
                if (width <= 430) {
                    width = 700;
                }
                $('#table_list_District').setGridWidth(width);
            },
            loadError: OnJqloadError,
            beforeProcessing: OnJqbeforeProcessingErrorcheck,
            viewrecords: true,
            sortname: 'DISTRICTID',
            sortorder: 'asc',

        });

        // Setup buttons
        $("#table_list_District").jqGrid('navGrid', '#pager_list_District',
                { edit: false, add: false, del: false, search: false },
                { height: 200, reloadAfterSubmit: true }
        );
        $("#pager_list_District_left").css("width", "");
        AlignJqGridHeader('table_list_District', ['act', 'edit']);
    },
    BindCurrencyDropdown: function () {
        $.ajax({
            url: getDomain() + MasterView.variables.BindMasterUrl + "&ColumnRequested=CURRENCY&ISRECORDALL=true",
            async: false,
            cache: false,
            type: 'POST',
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    $("#ddlCurrency").html("<option value=''>Select Currency</option>");
                    var JsonObject = xml2json.parser(data);
                    if (JsonObject.serviceresponse.detailslist != undefined) {
                        $.each(JsonObject.serviceresponse.detailslist, function (key, innerjsonDetails) {
                            $("#ddlCurrency").append($("#CurrencyDropdownList").render(innerjsonDetails));
                        });
                    }
                }
                else {
                    InvalidResponseCode(data);
                }
            },
            error: OnError
        });
    },
    BindCountryDropdown: function () {
        $.ajax({
            url: getDomain() + MasterView.variables.BindMasterUrl + "&ColumnRequested=COUNTRY&ISRECORDALL=true",
            async: false,
            cache: false,
            type: 'POST',
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    $("#ddlCountry").html("<option value=''>Select Country</option>");
                    var JsonObject = xml2json.parser(data);
                    if (JsonObject.serviceresponse.detailslist != undefined) {
                        $.each(JsonObject.serviceresponse.detailslist, function (key, innerjsonDetails) {
                            $("#ddlCountry").append($("#CountryDropdownList").render(innerjsonDetails));
                        });
                    }
                }
                else {
                    InvalidResponseCode(data);
                }
            },
            error: OnError
        });
    },
    BindStateDropdown: function () {
        $.ajax({
            url: getDomain() + MasterView.variables.BindMasterUrl + "&ColumnRequested=STATE&ISRECORDALL=true",
            async: false,
            cache: false,
            type: 'POST',
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    $("#ddlState").html("<option value=''>Select State</option>");
                    var JsonObject = xml2json.parser(data);
                    if (JsonObject.serviceresponse.detailslist != undefined) {
                        $.each(JsonObject.serviceresponse.detailslist, function (key, innerjsonDetails) {
                            $("#ddlState").append($("#StateDropdownList").render(innerjsonDetails));
                        });
                    }
                }
                else {
                    InvalidResponseCode(data);
                }
            },
            error: OnError
        });
    },
    BindDistrictDropdown: function () {
        $.ajax({
            url: getDomain() + MasterView.variables.BindMasterUrl + "&ColumnRequested=DISTRICT&ISRECORDALL=true",
            async: false,
            cache: false,
            type: 'POST',
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    $("#ddlDistrict").html("<option value=''>Select District</option>");
                    var JsonObject = xml2json.parser(data);
                    if (JsonObject.serviceresponse.detailslist != undefined) {
                        $.each(JsonObject.serviceresponse.detailslist, function (key, innerjsonDetails) {
                            $("#ddlDistrict").append($("#DistrictDropdownList").render(innerjsonDetails));
                        });
                    }
                }
                else {
                    InvalidResponseCode(data);
                }
            },
            error: OnError
        });
    },
    deleteRow: function (id, page) {
        MasterView.variables.Oper = "delete";
        MasterView.variables.addedit = "deleted";
        MasterView.variables.Page = page;
        var data = {
            "PAGENAME": MasterView.variables.Page,
            "oper": MasterView.variables.Oper,
            "ID": id
        }
        MasterView.savedata(data);
    },
    btnMasterSubmit: function () {

        MasterView.variables.Oper = "add";
        MasterView.variables.addedit = "added";

        if (MasterView.variables.Masterhiddenid != "0" && parseInt(MasterView.variables.Masterhiddenid) > 0) {
            MasterView.variables.Oper = 'edit';
            MasterView.variables.addedit = 'updated';
        }

        if (MasterView.variables.Page == 'Currency') {
            var isValid = $("#frmCurrency").valid();
            if (!isValid)
                return;
            $('#btnCurrency').attr('disabled', true);

            var data = {
                "PAGENAME": MasterView.variables.Page,
                "ID": MasterView.variables.Masterhiddenid,
                "CURRENCYNAME": $("#txtCurrency").val(),
                "CURRENCYCODE": $("#txtCurrencyCode").val(),
                "LANGUAGE": $("#txtLanguage").val(),
                "SYMBOL": $("#txtSymbol").val(),
                "oper": MasterView.variables.Oper,
            }
        }
        else if (MasterView.variables.Page == 'Country') {
            var isValid = $("#frmCountry").valid();
            if (!isValid)
                return;
            $('#btnCountry').attr('disabled', true);

            var FlagImage = $('#img_CountryFlag').attr('src');

            if (FlagImage.indexOf('noImage.png') > -1)
                FlagImage = '';


            if (FlagImage == '') {
                $("FlagimgError").show();
                return;
            }
            else {
                $("FlagimgError").hide();
            }


            FlagImageTitle = FlagImage.substr(FlagImage.lastIndexOf('/') + 1);

            $.ajax({
                type: 'POST',
                async: false,
                cache: false,
                url: getDomain() + "/Common/SaveImage",
                data: {
                    category: 'Country',
                    deletedfiles: '',
                    savefiles: FlagImage
                },
                success: function (result) {
                    if (result == "success")
                        isValid = true;
                    else
                        isValid = false;
                },
                error: OnError
            });

            if (!isValid) {
                notificationMessage('', 'Error in upload image.', 'error');
                return;
            }

            var data = {
                "PAGENAME": MasterView.variables.Page,
                "ID": MasterView.variables.Masterhiddenid,
                "COUNTRYNAME": $("#txtcountry").val(),
                "CURRENCYID": $("#ddlCurrency").val(),
                "FLAGIMG": FlagImageTitle,
                "oper": MasterView.variables.Oper,
            }
        }
        else if (MasterView.variables.Page == 'State') {
            var isValid = $("#frmState").valid();
            if (!isValid)
                return;
            $('#btnState').attr('disabled', true);

            var data = {
                "PAGENAME": MasterView.variables.Page,
                "COUNTRYID": $("#ddlCountry").val(),
                "STATENAME": $("#txtState").val(),
                "STATECODE": $("#txtStatecode").val(),
                "ID": MasterView.variables.Masterhiddenid,
                "oper": MasterView.variables.Oper,
            }
        }
        else if (MasterView.variables.Page == 'District') {
            var isValid = $("#frmDistrict").valid();
            if (!isValid)
                return;
            $('#btnDistrict').attr('disabled', true);

            var data = {
                "PAGENAME": MasterView.variables.Page,
                "STATEID": $("#ddlState").val(),
                "DISTRICTNAME": $("#txtDistrict").val(),
                "ID": MasterView.variables.Masterhiddenid,
                "oper": MasterView.variables.Oper,
            }
        }
        else if (MasterView.variables.Page == 'City') {
            var isValid = $("#frmCity").valid();
            if (!isValid)
                return;
            $('#btnCity').attr('disabled', true);

            var data = {
                "PAGENAME": MasterView.variables.Page,
                "DISTRICTID": $("#ddlDistrict").val(),
                "CITYNAME": $("#txtCity").val(),
                "ID": MasterView.variables.Masterhiddenid,
                "oper": MasterView.variables.Oper,
            }
        }
        MasterView.savedata(data);
    },

    btnMasterSubmitOnSuccess: function (data) {
        $('#btnCurrency').attr('disabled', false);
        $('#btnCountry').attr('disabled', false);
        $('#btnState').attr('disabled', false);
        $('#btnDistrict').attr('disabled', false);
        $('#btnCity').attr('disabled', false);
        if ($(data).find('RESPONSECODE').text() == "0") {
            notificationMessage(MasterView.variables.Oper + ' Operation', 'Record is ' + MasterView.variables.addedit + ' successfully', 'success');

            if (MasterView.variables.Page == 'Currency') {
                $("#table_list_Currency").trigger("reloadGrid", [{ current: true }]);
                MasterView.BindCurrencyDropdown();
            }
            else if (MasterView.variables.Page == 'Country') {
                $("#table_list_Country").trigger("reloadGrid", [{ current: true }]);
                MasterView.BindCountryDropdown();
                BindDropdownCountry('txt_o_Country', 'DdlCountryList', "/Common/BindMastersDetails?ServiceName=MASTER_COUNTRY_STATE_CITY_GET&ColumnRequested=COUNTRY&ISRECORDALL=true", 'Select Country');
            }
            else if (MasterView.variables.Page == 'State') {
                $("#table_list_State").trigger("reloadGrid", [{ current: true }]);
                BindDropdownState('txt_o_state', 'DdlStateList', "/Common/BindMastersDetails?ServiceName=MASTER_COUNTRY_STATE_CITY_GET&ColumnRequested=STATE&ISRECORDALL=true", 'Select State');
                MasterView.BindStateDropdown();
            }
            else if (MasterView.variables.Page == 'District') {
                $("#table_list_District").trigger("reloadGrid", [{ current: true }]);
                MasterView.BindDistrictDropdown();
                BindDropdownCountry('text_O_District', 'ddlDistrictList', "/Common/BindMastersDetails?ServiceName=MASTER_COUNTRY_STATE_CITY_GET&ColumnRequested=DISTRICT&ISRECORDALL=true", 'Select District');
            }
            else if (MasterView.variables.Page == 'City') {
                $("#table_list_City").trigger("reloadGrid", [{ current: true }]);
            }
            MasterView.clearControls();
        }
        else {
            InvalidResponseCode(data);
        }
    },
    savedata: function (data) {
        $.ajax({
            url: getDomain() + MasterView.variables.PerformMasterOperationUrl,
            data: data,
            async: true,
            cache: false,
            type: 'POST',
            success: MasterView.btnMasterSubmitOnSuccess,
            error: OnError
        });
    },
    clearControls: function () {
        $("#txtcountry").val("");
        $("#ddlCurrency").val("");
        $("#ddlCountry").val("");
        $("#txtState").val("");
        $("#txtStatecode").val("");
        $("#ddlState").val("");
        $("#txtCity").val("");
        $("#txtDistrict").val("");
        $("#ddlDistrict").val("");
        $("#txtCurrencyCode").val("");
        $("#txtSymbol").val("");
        $("#txtLanguage").val("");
        $("#txtCurrency").val("");
        $('#img_CountryFlag').attr('src', '');
        MasterView.variables.Page = '';
        MasterView.variables.Masterhiddenid = '';
        MasterView.variables.Oper = '';
    },
    DistricttriggerId: function (id, page) {
        MasterView.variables.Oper = "edit";
        MasterView.variables.Page = page;
        var rowData = jQuery("#table_list_District").getRowData(id);
        MasterView.variables.Masterhiddenid = id;
        $("#txtDistrict").val(rowData['DISTRICTNAME']);
        $("#ddlState").val(rowData['STATEID1']);
    },
    CitytriggerId: function (id, page) {
        MasterView.variables.Oper = "edit";
        MasterView.variables.Page = page;
        var rowData = jQuery("#table_list_City").getRowData(id);
        MasterView.variables.Masterhiddenid = id;
        $("#txtCity").val(rowData['CITYNAME']);
        $("#ddlDistrict").val(rowData['DISTRICTID']);
    },
    StatetriggerId: function (id, page) {
        MasterView.variables.Oper = "edit";
        MasterView.variables.Page = page;
        var rowData = jQuery("#table_list_State").getRowData(id);
        MasterView.variables.Masterhiddenid = id;
        $("#txtState").val(rowData['STATENAME']);
        $("#ddlCountry").val(rowData['COUNTRYID']);
        $("#txtStatecode").val(rowData['STATECODE']);
    },
    CountrytriggerId: function (id, page) {
        MasterView.variables.Oper = "edit";
        MasterView.variables.Page = page;
        var rowData = jQuery("#table_list_Country").getRowData(id);
        MasterView.variables.Masterhiddenid = id;
        $("#txtcountry").val(rowData['COUNTRYNAME']);
        $("#ddlCurrency").val(rowData['CURRENCYID']);
        $('#img_CountryFlag').attr('src', getDomain() + "/UploadFiles/Country/" + rowData['FLAGIMG']);
        $('#img_CountryFlag').data('oldurl', getDomain() + "/UploadFiles/Country/" + rowData['FLAGIMG']);
    },
    CurrencytriggerId: function (id, page) {
        MasterView.variables.Oper = "edit";
        MasterView.variables.Page = page;
        var rowData = jQuery("#table_list_Currency").getRowData(id);
        MasterView.variables.Masterhiddenid = id;
        $("#txtCurrency").val(rowData['CURRENCYNAME']);
        $("#txtCurrencyCode").val(rowData['CURRENCYCODE']);
        $("#txtLanguage").val(rowData['LANGUAGE']);
        $("#txtSymbol").val(rowData['SYMBOL']);
    },
};

$(document).ready(function () {

    MasterView.initializeJqgridCurrency();
    //MasterView.initializeJqgridCountry();
    //MasterView.initializeJqgridState();
    //MasterView.initializeJqgridCity();
    //MasterView.initializeJqgridDistrict();
    MasterView.BindCurrencyDropdown();
    MasterView.BindCountryDropdown();
    MasterView.BindStateDropdown();
    MasterView.BindDistrictDropdown();

    $("#contryslidetab").click(function () {
        MasterView.clearControls();
        MasterView.initializeJqgridCountry();
    });
    $("#stateslidetab").click(function () {
        MasterView.clearControls();
        MasterView.initializeJqgridState();
    });
    $("#districtslidetab").click(function () {
        MasterView.clearControls();
        MasterView.initializeJqgridDistrict();
    });
    $("#cityslidetab").click(function () {
        MasterView.clearControls();
        MasterView.initializeJqgridCity();
    });
    $("#btnCurrency").click(function () {
        MasterView.variables.Page = 'Currency';
        MasterView.btnMasterSubmit();
    });
    $("#btnCountry").click(function () {
        MasterView.variables.Page = 'Country';
        MasterView.btnMasterSubmit();
    });
    $("#btnState").click(function () {
        MasterView.variables.Page = 'State';
        MasterView.btnMasterSubmit();
    });
    $("#btnCity").click(function () {
        MasterView.variables.Page = 'City';
        MasterView.btnMasterSubmit();
    });
    $("#btnDistrict").click(function () {
        MasterView.variables.Page = 'District';
        MasterView.btnMasterSubmit();
    });

    $(".number").keypress(function () {
        return numbersOnly(this, event, true, false);
    })

    RegisterFileUploadwed("#btnFlagUpload", "#img_CountryFlag", "#hdnDeletedImg");
});