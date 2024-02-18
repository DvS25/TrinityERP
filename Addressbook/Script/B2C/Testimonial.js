var TestimonialView = {
    variables: {
        BindGroupListUrl: "/Common/BindMastersDetails?ServiceName=B2C_TESTIMONIAL_GET",
        PerformMasterOperationUrl: "/Common/OpeartionsOnMaster?ServiceName=B2C_TESTIMONIAL_CRUD",
        Oper: 'Add',
        addedit: "added",
        Testimonial_Id: "",
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
        colNames = ['Index', 'TestimonialId', 'Rating', 'Comment', 'Created Date'],
        colModel = [
                    { name: "ROWNUM", width: 3, index: "ROWNUM", xmlmap: xmlvars.common_colmap + "ROWNUM", hidden: false, search: false, hidden: false },
                    { name: "TESTIMONIALID", width: 4, index: "TESTIMONIALID", xmlmap: xmlvars.common_colmap + "TESTIMONIALID", search: false, hidden: true },
                    { name: "RATING", width: 4, index: "RATING", xmlmap: xmlvars.common_colmap + "RATING", search: true, searchoptions: jqGridVariables.stringSearchOption, sortable: false },
                    { name: "COMMENT", width: 20, index: "COMMENT", xmlmap: xmlvars.common_colmap + "COMMENT", search: false },
                    { name: "CREATEDDATE", width: 5, index: "CREATEDDATE", xmlmap: xmlvars.common_colmap + "CREATEDDATE", search: true, searchoptions: jqGridVariables.stringSearchOption }
        ];
        colNames.push('Approval');
        colModel.push({ name: 'ISACTIVE', index: 'ISACTIVE', xmlmap: xmlvars.common_colmap + "ISACTIVE", width: 6, sortable: false, align: "center", search: false, hidden: false, formatter: ApprovalBtnFmatter });
        colNames.push('Delete');
        colModel.push({ name: 'act', index: 'act', width: 2, sortable: false, align: "center", search: false, formatter: DeleteBtnFmatter });

        function ApprovalBtnFmatter(cellvalue, options, rowObject, view) {
            if (isU() || isA()) {
                if (cellvalue == 1) {
                    return '<div class="checkbox" style="margin-top:0px!important"><label class="form-control-label"><input type="checkbox" class="toggleswitch active_sw" data-on="Yes" data-off="No" data-toggle="toggle" value="' + options.rowId + '"  id="IsActiveSwitch' + options.rowId + '" onchange=\"TestimonialView.ApproveId(' + options.rowId + ');\" checked/></label></div>';
                }
                else {

                    return '<div class="checkbox" style="margin-top:0px!important"><label class="form-control-label"><input type="checkbox" class="toggleswitch deactive_sw" data-on="Yes" data-off="No" data-toggle="toggle" value="' + options.rowId + '"  id="IsActiveSwitch' + options.rowId + '" onchange=\"TestimonialView.ApproveId(' + options.rowId + ');\" /></label></div>';
                }
            }
            else {
                if (cellvalue == 'FALSE' || cellvalue == '0' || cellvalue == undefined)
                    return '<span class="label label-danger" style="font-size: 100%; !important">No</span>';
                else
                    return '<span class="label label-success" style="font-size: 100%; !important">Yes</span>';
            }

        }
        function DeleteBtnFmatter(cellvalue, options, rowObject, view) {
            if (isD()) {
                return "<div  onclick=\"TestimonialView.deleteRow('" + options.rowId + "');\"><i style=\"cursor:pointer; color:red;\" title=\"Delete\" class=\"fa fa-trash-o fa-lg\"></i></div>";
            }
            else {
                return '';
            }

        }
        $("#table_list_Testimonial").jqGrid({

            url: getDomain() + TestimonialView.variables.BindGroupListUrl,
            datatype: "xml",
            height: '100%',
            autowidth: true,
            shrinkToFit: true,
            rowNum: 25,
            rowList: [25, 50, 100],
            colNames: colNames,
            colModel: colModel,
            pager: "#pager_list_Testimonial",
            xmlReader: {
                root: xmlvars.common_root,
                row: xmlvars.common_row,
                page: xmlvars.common_response + "CURRENTPAGE",
                total: xmlvars.common_response + "TOTALPAGES",
                records: xmlvars.common_response + "TOTALRECORDS",
                repeatitems: false,
                id: "TESTIMONIALID"
            },
            loadComplete: function () {
                ///$("[name='active_deactive']").bootstrapSwitch();
                $('.toggleswitch').bootstrapToggle({
                    size: 'mini',
                });
                $("tr.jqgrow:even").addClass('myAltRowClass');
                $("#table_list_Testimonial").jqGrid('setGridHeight', $(window).innerHeight() - 100 - ($("#gbox_table_list_Testimonial").height() - $('#gbox_table_list_Testimonial .ui-jqgrid-bdiv').height()));

                // Hide column headers and top pager if no records were returned
                if ($('#table_list_Testimonial').getGridParam('records') == 0)
                    $('.ui-jqgrid-htable').hide();
                else
                    $('.ui-jqgrid-htable').show();
                TestimonialView.variables.JQGridDynamicWidth("#jqgrid_Testimonial", "#table_list_Testimonial", $('#jqgrid_Testimonial').width());
            },

            loadError: OnJqloadError,
            beforeProcessing: OnJqbeforeProcessingErrorcheck,
            viewrecords: true,
            hidegrid: false,
            sortname: 'CREATEDDATE',
            sortorder: 'desc',
        });

        // Setup buttons
        $("#table_list_Testimonial").jqGrid('navGrid', '#pager_list_Testimonial',
            { edit: false, add: false, del: false, search: true },
            { height: 320 }
    );
        $(".s-ico").hide();
        $("#pager_list_Testimonial_left").css("width", "");
        AlignJqGridHeader('table_list_Testimonial', ['act','ISACTIVE']);
    },

    ApproveId: function (id) {
        $.ajax({
            url: getDomain() + TestimonialView.variables.BindGroupListUrl + "&ColumnRequested=TOTALRECORDS&searchString=1&searchField=ISACTIVE&searchOper=eq&_search=true",
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
            TestimonialView.variables.Oper = 'Active';
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
                    TestimonialView.variables.Is_active = 0;
                    var data = {
                        "TESTIMONIALID": id,
                        "oper": TestimonialView.variables.Oper,
                        "ISACTIVE": TestimonialView.variables.Is_active,
                    }
                    TestimonialView.savedata(TestimonialView.variables.Oper, data, id);
                    switchelse = 0;
                }
            }
            // one switch off and one off
            if (switchelse == 1) {
                var lastee = selectedswitch[selectedswitch.length - 1];
                var IsActiveSwitch2 = "IsActiveSwitch" + lastee;
                for (var i = 0; i < 2; i++) {
                    if (i == 0) {
                        TestimonialView.variables.Is_active = 0;
                        TestimonialView.variables.Oper = 'Deactive'
                        var data = {
                            "TESTIMONIALID": "",
                            "oper": TestimonialView.variables.Oper,
                            "ISACTIVE": TestimonialView.variables.Is_active,
                        }
                    }
                    else {
                        id = id;
                        TestimonialView.variables.Is_active = 1;
                        TestimonialView.variables.Oper = 'Active'
                        var data = {
                            "TESTIMONIALID": id,
                            "oper": TestimonialView.variables.Oper,
                            "ISACTIVE": TestimonialView.variables.Is_active,
                        }
                    }
                    TestimonialView.savedata(TestimonialView.variables.Oper, data, id);
                }
            }
            // on switch > 5
        }
        else {
            if ($("#" + IsActiveSwitch).prop("checked") == false) {
                TestimonialView.variables.Is_active = 0
            } else {
                TestimonialView.variables.Is_active = 1
            }
            var data = {
                "TESTIMONIALID": id,
                "oper": TestimonialView.variables.Oper,
                "ISACTIVE": TestimonialView.variables.Is_active,
            }
            TestimonialView.savedata(TestimonialView.variables.Oper, data, id);
        }
    },
    savedata: function (oper, data, id) {
        $.ajax({

            type: 'POST',
            url: getDomain() + TestimonialView.variables.PerformMasterOperationUrl,
            data: data,
            async: true,
            cache: false,
            success: function (data) {
                TestimonialView.btnMasterSubmitOnSuccess(data, id);
            }
        });
    },
    btnMasterSubmitOnSuccess: function (data, id) {
        if ($(data).find('RESPONSECODE').text() == "0") {
            OperationMessage("", 'Testimonial data change successfully', 'success');
            $("#table_list_Testimonial").trigger("reloadGrid", [{ current: true }]);
        }
        else {
            InvalidResponseCode(data);
        }
    },
    deleteRow: function (id) {
        debugger
        $.confirm({
            'title': 'Delete Testimonial Details',
            'message': 'You are about to delete this Testimonial Detail. It can not be restored at a later time! Continue? ',
            'buttons': {
                'Yes': {
                    'class': 'yes',
                    'action': function () {
                        $.ajax({
                            url: getDomain() + TestimonialView.variables.PerformMasterOperationUrl,
                            data: {
                                TESTIMONIALID: id,
                                oper: 'delete'
                            },
                            async: true,
                            cache: false,
                            type: 'POST',
                            success: function (data) {
                                if ($(data).find('RESPONSECODE').text() == "0") {
                                    OperationMessage("", 'Testimonial data delete successfully', 'success');
                                    $("#table_list_Testimonial").trigger("reloadGrid", [{ current: true }]);
                                }
                                else {
                                    InvalidResponseCode(data);
                                }
                            },
                            error: OnError,
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
}
$(document).ready(function () {
    TestimonialView.initializeJqgrid();
    $(window).resize(function () {
        var outerwidth = $('#jqgrid_Testimonial').width();
        $('#table_list_Testimonial').setGridWidth(outerwidth); // setGridWidth method sets a new width to the grid dynamically
    });

})