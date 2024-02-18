var contactusview = {
    initializedataJqgrid: function () {
        var colNames = ['COntact Id', 'Person Name', 'Email Id', 'Mobile No', 'Message','Contact Date'];
        var colModel = [
                { name: "CONTACTUSID", index: "CONTACTUSID", xmlmap: xmlvars.common_colmap + "CONTACTUSID", stype: 'int', sortable: false, hidden: true, search: false },
                { name: "FULLNAME", index: "FULLNAME", width: 20, xmlmap: xmlvars.common_colmap + "FULLNAME", stype: "text", sortable: true, search: true, searchoptions: jqGridVariables.stringSearchOption },
                { name: "EMAILID", index: "EMAILID", width: 18, xmlmap: xmlvars.common_colmap + "EMAILID", sortable: true, search: true, searchoptions: jqGridVariables.stringSearchOption },
                { name: "MOBILENO", index: "MOBILENO", width: 15, xmlmap: xmlvars.common_colmap + "MOBILENO", sortable: true, search: true, searchoptions: jqGridVariables.stringSearchOption },
                { name: "MESSAGE", index: "MESSAGE", width: 50, xmlmap: xmlvars.common_colmap + "MESSAGE", sortable: false, search: false },
                { name: "CREATEDDATE", index: "CREATEDDATE", width: 10, xmlmap: xmlvars.common_colmap + "CREATEDDATE", sortable: true, search: true, searchoptions: jqGridVariables.stringSearchOption },
        ];

        $("#table_list_contactus").jqGrid({
            url: getDomain() + "/Common/BindMastersDetails?ServiceName=CONTACTUS_GET",
            datatype: "xml",
            height: '100%',
            autowidth: true,
            shrinkToFit: true,
            rowNum: 25,
            rowList: [25, 50, 100],
            colNames: colNames,
            colModel: colModel,
            pager: "#pager_list_contactus",
            xmlReader: {
                root: xmlvars.common_root,
                row: xmlvars.common_row,
                page: xmlvars.common_response + "CURRENTPAGE",
                total: xmlvars.common_response + "TOTALPAGES",
                records: xmlvars.common_response + "TOTALRECORDS",
                repeatitems: false,
                id: "CONTACTUSID"
            },
            loadComplete: function () {
                $("#table_list_contactus").jqGrid('setGridHeight', $(window).innerHeight() - 150 - ($("#gbox_table_list_contactus").height() - $('#gbox_table_list_contactus .ui-jqgrid-bdiv').height()));
                $("tr.jqgrow:even").addClass('myAltRowClass');
                if ($('#table_list_contactus').getGridParam('records') === 0)
                    $('.ui-jqgrid-htable').hide();
                else
                    $('.ui-jqgrid-htable').show();


                var width = $('#jqGrid_contactus').width();

                if (width <= 430) {
                    width = 900;
                }
                $('#table_list_contactus').setGridWidth(width);
            },
            loadError: OnJqloadError,
            beforeProcessing: OnJqbeforeProcessingErrorcheck,
            viewrecords: true,
            sortname: 'CONTACTUSID',
            sortorder: 'desc',

        });

        // Setup buttons
        $("#table_list_contactus").jqGrid('navGrid', '#pager_list_contactus',
                { edit: false, add: false, del: false, search: true },
                { height: 200, reloadAfterSubmit: true }
        );
        $("#table_list_contactus_left").css("width", "");
        AlignJqGridHeader('table_list_contactus', ['edit', 'ERRORMESSAGE']);

    },
}
$(document).ready(function () {
    contactusview.initializedataJqgrid();
});
