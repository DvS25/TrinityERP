var Feedbackview_View = {
    variables: {
        BindGroupListUrl: "/Common/BindMastersDetails?ServiceName=FEEDBACK_GET",
        PerformMasterOperationUrl: "/Common/OpeartionsOnMaster?ServiceName=FEEDBACK_CRUD",
        Oper: 'Add',
        addedit: "added",
        Feedback_Id: "",
        Is_active: "",
        JQGridDynamicWidth: function (jqid, tblid, jqwidth) {
            var width = $(jqid).width();
            if (width <= 630) {
                width = 630;
            }
            if ($(window).width() > $(window).height()) {
                width = jqwidth;
            } else {
                width = 630;
            }
            $(tblid).setGridWidth(width);
        },

    },
    initializeJqgrid: function () {

        colNames = ['Index', 'FeedbackId', 'Party Name', 'Rating', 'Comment', 'Created Date'],
        colModel = [
                    { name: "ROWNUM", width: 3, index: "ROWNUM", xmlmap: xmlvars.common_colmap + "ROWNUM", hidden: false, search: false, hidden: false },
                    { name: "FEEDBACKID", width: 4, index: "FEEDBACKID", xmlmap: xmlvars.common_colmap + "FEEDBACKID", search: false, hidden: true },
                    { name: "PARTYNAME", width: 9, index: "PARTYNAME", xmlmap: xmlvars.common_colmap + "PARTYNAME", search: true, searchoptions: jqGridVariables.stringSearchOption },
                    { name: "RATING", width: 4, index: "RATING", xmlmap: xmlvars.common_colmap + "RATING", search: true, searchoptions: jqGridVariables.stringSearchOption },
                    { name: "COMMENT", width: 15, index: "COMMENT", xmlmap: xmlvars.common_colmap + "COMMENT", search: false},
                    { name: "CREATEDDATE", width: 5, index: "CREATEDDATE", xmlmap: xmlvars.common_colmap + "CREATEDDATE", search: false }

        ];
        colNames.push('Approval');
        colModel.push({ name: 'ISACTIVE', index: 'ISACTIVE', xmlmap: xmlvars.common_colmap + "ISACTIVE", width: 5, sortable: false, align: "left", search: false, hidden: false, formatter: ApprovalBtnFmatter });
       
        function ApprovalBtnFmatter(cellvalue, options, rowObject, view) {
            if (isU() || isA()) {
                if (cellvalue == 1) {
                    return '<div class="checkbox" style="margin-top:0px!important"><label class="form-control-label"><input type="checkbox" class="toggleswitch active_sw" data-on="Yes" data-off="No" data-toggle="toggle" value="' + options.rowId + '"  id="IsActiveSwitch' + options.rowId + '" onchange=\"Feedbackview_View.ApproveId(' + options.rowId + ');\" checked/></label></div>';
                }
                else {

                    return '<div class="checkbox" style="margin-top:0px!important"><label class="form-control-label"><input type="checkbox" class="toggleswitch deactive_sw" data-on="Yes" data-off="No" data-toggle="toggle" value="' + options.rowId + '"  id="IsActiveSwitch' + options.rowId + '" onchange=\"Feedbackview_View.ApproveId(' + options.rowId + ');\" /></label></div>';
                }
            }
            else {
                if (cellvalue == 'FALSE' || cellvalue == '0' || cellvalue == undefined)
                    return '<span class="label label-danger" style="font-size: 100%; !important">No</span>';
                else
                    return '<span class="label label-success" style="font-size: 100%; !important">Yes</span>';
            }

        }
        $("#table_list_Feedback").jqGrid({

            url: getDomain() + Feedbackview_View.variables.BindGroupListUrl,
            datatype: "xml",
            height: '100%',
            autowidth: true,
            shrinkToFit: true,
            rowNum: 25,
            rowList: [25, 50, 100],
            colNames: colNames,
            colModel: colModel,
            pager: "#pager_list_Feedback",
            xmlReader: {
                root: xmlvars.common_root,
                row: xmlvars.common_row,
                page: xmlvars.common_response + "CURRENTPAGE",
                total: xmlvars.common_response + "TOTALPAGES",
                records: xmlvars.common_response + "TOTALRECORDS",
                repeatitems: false,
                id: "FEEDBACKID"
            },
            loadComplete: function () {
                ///$("[name='active_deactive']").bootstrapSwitch();
                $('.toggleswitch').bootstrapToggle({
                    size: 'mini',
                });
                $("tr.jqgrow:even").addClass('myAltRowClass');

                $("#table_list_Feedback").jqGrid('setGridHeight', $(window).innerHeight() - 70 - ($("#gbox_table_list_Feedback").height() - $('#gbox_table_list_Feedback .ui-jqgrid-bdiv').height()));

                // Hide column headers and top pager if no records were returned
                if ($('#table_list_Feedback').getGridParam('records') == 0)
                    $('.ui-jqgrid-htable').hide();
                else
                    $('.ui-jqgrid-htable').show();
                Feedbackview_View.variables.JQGridDynamicWidth("#jqgrid_Feedback", "#table_list_Feedback", $('#jqgrid_Feedback').width());
            },

            loadError: OnJqloadError,
            beforeProcessing: OnJqbeforeProcessingErrorcheck,
            viewrecords: true,
            hidegrid: false,
            sortname: 'CREATEDDATE',
            sortorder: 'desc',
        });

        // Setup buttons
        $("#table_list_Feedback").jqGrid('navGrid', '#pager_list_Feedback',
            { edit: false, add: false, del: false, search: true },
            { height: 320 }
    );
        $(".s-ico").hide();
        $("#pager_list_Feedback_left").css("width", "");
        AlignJqGridHeader('table_list_Feedback', ['edit']);
    },

    ApproveId: function (id) {
        $.ajax({
            url: getDomain() + Feedbackview_View.variables.BindGroupListUrl + "&ColumnRequested=TOTALRECORDS&searchString=1&searchField=ISACTIVE&searchOper=eq&_search=true",
            async: false,
            cache: false,
            type: 'POST',
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    var JsonObject = xml2json.parser(data);
                    if (JsonObject.serviceresponse.detailslist != undefined) {
                        $("#approvalhidden").val(JsonObject.serviceresponse.detailslist.details[0].totalactiverecords);
                    }
                }
                else {
                    InvalidResponseCode(data);
                }
            },
            error: OnError
        });
        if (id != "0" && parseInt(id) > 0) {
            Feedbackview_View.variables.Oper = 'Active';
        }
        var IsActiveSwitch = "IsActiveSwitch" + id;
        if ($("#approvalhidden").val() >= 5) {
            var switchcheck = $('.active_sw');
            var selectedswitch = [];
            $(".active_sw").each(function () {
                selectedswitch.push($(this).val());
            });
            var switchelse = 1;
            // 5 switch on then off any one switch
            for (i = 0; i < selectedswitch.length; i++) {
                if (selectedswitch[i] == id) {
                    id = id;
                    Feedbackview_View.variables.Is_active = 0;
                    var data = {
                        "FEEDBACKID": id,
                        "oper": Feedbackview_View.variables.Oper,
                        "ISACTIVE": Feedbackview_View.variables.Is_active,
                    }
                    Feedbackview_View.savedata(Feedbackview_View.variables.Oper, data, id);
                    switchelse = 0;
                }
            }
            // one switch off and one off
            if (switchelse == 1) {
                var lastee = selectedswitch[selectedswitch.length - 1];
                var IsActiveSwitch2 = "IsActiveSwitch" + lastee;
                for (var i = 0; i < 2; i++) {
                    if (i == 0) {
                        Feedbackview_View.variables.Is_active = 0;
                        Feedbackview_View.variables.Oper = 'Deactive'
                        var data = {
                            "FEEDBACKID": "",
                            "oper": Feedbackview_View.variables.Oper,
                            "ISACTIVE": Feedbackview_View.variables.Is_active,
                        }
                    }
                    else {
                        id = id;
                        Feedbackview_View.variables.Is_active = 1;
                        Feedbackview_View.variables.Oper = 'Active'
                        var data = {
                            "FEEDBACKID": id,
                            "oper": Feedbackview_View.variables.Oper,
                            "ISACTIVE": Feedbackview_View.variables.Is_active,
                        }
                    }

                    Feedbackview_View.savedata(Feedbackview_View.variables.Oper, data, id);
                }
            }
            // on switch > 5
        }
        else {
            if ($("#" + IsActiveSwitch).prop("checked") == false) {

                Feedbackview_View.variables.Is_active = 0
            } else {

                Feedbackview_View.variables.Is_active = 1

            }
            var data = {
                "FEEDBACKID": id,
                "oper": Feedbackview_View.variables.Oper,
                "ISACTIVE": Feedbackview_View.variables.Is_active,
            }
            Feedbackview_View.savedata(Feedbackview_View.variables.Oper, data, id);

        }

    },
  
    savedata: function (oper, data, id) {

        $.ajax({

            type: 'POST',
            url: getDomain() + Feedbackview_View.variables.PerformMasterOperationUrl,
            data: data,
            async: true,
            cache: false,
            success: function (data) {
                Feedbackview_View.btnMasterSubmitOnSuccess(data, id);
            }


        });

    },
    btnMasterSubmitOnSuccess: function (data, id) {
        if ($(data).find('RESPONSECODE').text() == "0") {
                OperationMessage("", 'Approval data change successfully', 'success');
            $("#table_list_Feedback").trigger("reloadGrid", [{ current: true }]);
        }
        else {
            InvalidResponseCode(data);
        }

    },
}
$(document).ready(function () {
    Feedbackview_View.initializeJqgrid();

    $(window).resize(function () {
        var outerwidth = $('#jqgrid_Feedback').width();
        $('#table_list_Feedback').setGridWidth(outerwidth); // setGridWidth method sets a new width to the grid dynamically
    });
  
})