var LayoutView = {
    variables: {
        BindMasterUrl: "/Common/BindMastersDetails?ServiceName=ANNI_BDAY_NOTIFICATION_GET",
        AdminBindMasterUrl: "/Common/BindMastersDetails?ServiceName=ADMINNOTIFICATION_MASTER_GET",
        PerformMasterOperationUrl: "/Common/OpeartionsOnMaster?ServiceName=ADMINNOTIFICATION_MASTER_CRUD",
        PerformCurrentAccYearUrl: "/Common/SetAccountYearSession",
        ChangeModuleUrl: "/Common/SetModuleSession",
        Notificationid: '',
        Oper: 'Edit',
        pageindex: 1,
        TotalRecords: 0,

        dx_tabPanel: "",
        MenuTabList: [],
    },

    BindNotification: function () {
        $.ajax({
            url: getDomain() + LayoutView.variables.BindMasterUrl,
            async: false,
            cache: false,
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    $("#ddlNotification").html("");
                    $("#spanNumOfNotifi").html("0");
                    $("#mobileddlNotification").html("");
                    $("#mobilespanNumOfNotifi").html("0");
                    if ($(data).find(xmlvars.common_root).text() != '') {
                        var JsonObject = xml2json.parser(data);
                        var list;
                        if (JsonObject.serviceresponse.detailslist.details.totalrecords == 1) {
                            list = JsonObject.serviceresponse.detailslist.details.totalrecords;
                        } else {
                            list = JsonObject.serviceresponse.detailslist.details[0].totalrecords;
                        }
                        $("#spanNumOfNotifi").html(list);
                        $("#ddlNotification").append($("#NotificationList").render(JsonObject.serviceresponse.detailslist.details));
                        $("#mobilespanNumOfNotifi").html(list);
                        $("#mobileddlNotification").append($("#NotificationList").render(JsonObject.serviceresponse.detailslist.details));
                    }
                }
                else {
                    InvalidResponseCode(data);
                }
            },
            error: OnError
        });
    },

    AdminBindNotification: function () {

        $.ajax({
            url: getDomain() + "/Common/BindMastersDetails?ServiceName=ADMINNOTIFICATION_MASTER_GET&page=" + LayoutView.variables.pageindex + "&rows=10",
            async: false,
            cache: false,
            success: function (data) {
                var JsonObject = xml2json.parser(data);
                LayoutView.variables.Notificationid = '';
                if ($("#viewmorerecordid").length > 0) {
                    $("#viewmorerecordid").remove();
                }
                $("#AdminddlNotification").append($("#NotificationList1").render(JsonObject.serviceresponse.masterlist.masterdetail));
                LayoutView.variables.TotalRecords = JsonObject.serviceresponse.totalrecords;

                $('#clickNotification li').each(function (key, obj) {
                    LayoutView.variables.Notificationid += $(obj).attr("id") + ",";
                });
                LayoutView.btnMasterSubmit();

                $("#AdminddlNotification").append("<li class='bell-notification' id='viewmorerecordid' style='display: block;text-align: center;'><a href='javascript:void(0);' style='font-size: 14px;'>View More Records... (" + $("#AdminddlNotification li").length + "/" + LayoutView.variables.TotalRecords + ")</a></li>");
                $('#viewmorerecordid a').click(function () {
                    LayoutView.AdminBindNotification();
                });
                LayoutView.variables.pageindex++;

            },
            error: OnError
        });
    },

    btnMasterSubmit: function () {
        var data = {
            "oper": LayoutView.variables.Oper,
            "WHERE_EQ_VIEWID": LayoutView.variables.Notificationid
        }
        LayoutView.savedata(data, LayoutView.variables.Oper);
    },

    savedata: function (data, oper) {
        $.ajax({
            url: getDomain() + LayoutView.variables.PerformMasterOperationUrl,
            data: data,
            async: true,
            cache: false,
            type: 'POST',
            error: OnError,
        });
        AdminBindNotificationCount();
    },

    SubmitEmpAccountYear: function () {
        var data = {
            "AccountYearId": $("#ddlheaderAccountYear").val(),
            "BranchId": $("#ddlCompany").val()
        }
        $.ajax({

            url: getDomain() + LayoutView.variables.PerformCurrentAccYearUrl,
            data: data,
            async: true,
            cache: false,
            type: 'POST',
            success: function (result) {
                if ($(result).find('RESPONSECODE').text() == "0") {
                    location.reload();
                }
                else
                    notificationMessage('Error', $(result).find('RESPONSEMESSAGE').text(), 'error');
            },
            error: OnError,
        });
    },

    ChangeModule: function (ModuleName) {
        var data = {
            "ModuleName": ModuleName
        }
        $.ajax({
            url: getDomain() + LayoutView.variables.ChangeModuleUrl,
            data: data,
            async: true,
            cache: false,
            type: 'POST',
            success: function (result) {
                if ($(result).find('RESPONSECODE').text() == "0") {
                    location.reload();
                }
                else
                    notificationMessage('Error', $(result).find('RESPONSEMESSAGE').text(), 'error');
            },
            error: OnError,
        });
    },

    RegisterTabPanel: function () {
        LayoutView.variables.dx_tabPanel = $('#dx_tabPanel').dxTabPanel({
            dataSource: LayoutView.variables.MenuTabList,
            itemTitleTemplate: LayoutView.titleTemplate,
            itemTemplate: LayoutView.itemTemplate,
            height: $(document).height() - 61,
            deferRendering: false,
            showNavButtons: true,
            repaintChangesOnly: true,
        }).dxTabPanel('instance');

        $('#dx_tabPanel').dxSortable({
            moveItemOnDrop: true,
            filter: '.dx-tab',
            itemOrientation: 'horizontal',
            dragDirection: 'horizontal',
            onReorder(e) {
                const tabPanelItems = LayoutView.variables.dx_tabPanel.option('dataSource');
                const itemData = tabPanelItems.splice(e.fromIndex, 1)[0];

                tabPanelItems.splice(e.toIndex, 0, itemData);
                LayoutView.variables.dx_tabPanel.option('dataSource', tabPanelItems);
                LayoutView.variables.dx_tabPanel.option('selectedIndex', e.toIndex);
            },
        });
    },

    titleTemplate: function (itemData, itemIndex, itemElement) {
        itemElement.append($('<span>').text(`${itemData.NAME}`));

        if (!itemData.isLast) {
            itemElement.append(
                $('<i>')
                  .addClass('dx-icon')
                  .addClass('dx-icon-close')
                  .css('font-size', "15px")
                  .css('margin-left', "7px")
                  .css('margin-right', "0px")
                  .css('line-height', "1")
                  .css('color', "#7d7d7d")
                  .click(() => { LayoutView.MenuTabCloseButtonHandler(itemData); })
              );
        }
    },

    itemTemplate: function (itemData, itemIndex, itemElement) {
        $('<iframe id="' + itemData.CONTROLLER + '_' + itemData.ACTION + '">')
          .attr('src', getDomain() + '/' + itemData.CONTROLLER + '/' + itemData.ACTION + '?SBOOKID=' + itemData.SBOOKID)
          .attr('title', itemData.NAME)
          .attr('width', "100%")
          .attr('height', "100%")
          .css('border', "none")
          .appendTo(itemElement);
    },

    MenuTabAddButtonHandler: function (MenuName, Icon, Controller, Action, SBookId) {
        var menu = { NAME: MenuName, ICON: Icon, CONTROLLER: Controller, ACTION: Action, SBOOKID: SBookId };

        const tabPanelItems = LayoutView.variables.dx_tabPanel.option('dataSource');
        const newItem = menu;

        var TempIndex = tabPanelItems.findIndex(x=>x.NAME == MenuName);
        if (TempIndex < 0) {
            tabPanelItems.push(newItem);

            LayoutView.TabPanelHideShow();

            LayoutView.variables.dx_tabPanel.option('dataSource', tabPanelItems);
            LayoutView.variables.dx_tabPanel.option('selectedIndex', tabPanelItems.length - 1);
        }
        else {
            LayoutView.variables.dx_tabPanel.option('selectedIndex', TempIndex);
            $('#' + Controller + '_' + Action).attr("src", getDomain() + '/' + Controller + '/' + Action + '?SBOOKID=' + SBookId)
        }

        $("#modal_subbook").modal("hide");
    },

    MenuTabCloseButtonHandler: function (itemData) {
        const index = LayoutView.variables.dx_tabPanel.option('dataSource').indexOf(itemData);
        const tabPanelItems = LayoutView.variables.dx_tabPanel.option('dataSource');
        tabPanelItems.splice(index, 1);
        LayoutView.TabPanelHideShow();

        LayoutView.variables.dx_tabPanel.option('dataSource', tabPanelItems);
        if (index >= tabPanelItems.length && index > 0)
            LayoutView.variables.dx_tabPanel.option('selectedIndex', index - 1);
    },

    TabPanelHideShow: function () {
        if (LayoutView.variables.MenuTabList.length == 0) {
            $('#dx_tabPanel').hide();
        }
        else {
            $('#dx_tabPanel').show();
        }
    }
};

$(document).ready(function () {
    var AccountYearUrl = '/Common/BindMastersDetails?ServiceName=OUTLET_ACCOUNT_YEAR_MASTER_GET&IsRecordAll=true';
    BindDropdown('ddlheaderAccountYear', 'HearderAccountYearList', AccountYearUrl, '');

    var myfilter = { rules: [] };
    myfilter.rules.push({ field: "TYPE", op: "eq", data: "AccSubBook" });
    myfilter.rules.push({ field: "ONLYALLOWED", op: "eq", data: true });

    var SubbookList = '/Common/BindMastersDetails?ServiceName=STATIC_MASTER_GET&IsRecordAll=true' + "&myfilters=" + JSON.stringify(myfilter);
    BindDropdown('HeaderSubbook', 'HeaderSubbookList', SubbookList, '');

    LayoutView.BindNotification();
    AdminBindNotificationCount();
    LayoutView.RegisterTabPanel();
    $('#dx_tabPanel').hide();

    $("#ddlCompany").val(getBranchId());
    $("#ddlheaderAccountYear").val(getAccountYearId());

    $('#notification_icon').click(function () {
        if ($('#AdminddlNotification').hasClass("dp_none")) {
            $('#AdminddlNotification').removeClass("dp_none");
            LayoutView.variables.pageindex = 1;
            LayoutView.variables.TotalRecords = 0;
            $("#AdminddlNotification").html("");
            LayoutView.AdminBindNotification();
        }
        else {
            $('#AdminddlNotification').addClass("dp_none");
        }
    });

    $("#modules_container .btn").click(function () {
        var ModuleName = $(this).find("span").html();

        LayoutView.ChangeModule(ModuleName);
    });
    $("#btn_dashboard").click(function () {
        LayoutView.ChangeModule("");
    });


    $(".sidebar-content").css("min-height", $(document).height() - 61);
    $("#modal_subbook .modal-dialog").css("height", $(document).height() - 61);

    window.addEventListener('resize', function (event) {
        $(".sidebar-content").css("min-height", window.innerHeight - 61);
        $("#modal_subbook .modal-dialog").css("height", window.innerHeight - 61);
        LayoutView.variables.dx_tabPanel.option({ height: window.innerHeight - 61 });
    });

    //const sidebarMainElement = $('.sidebar-main'),
    //    foldClass = 'sidebar-xs';

    //// Define variables
    //const unfoldDelay = 150;
    //let timerStart,
    //    timerFinish;

    //// Add class on mouse enter
    //sidebarMainElement.on('mouseenter', function () {
    //    clearTimeout(timerFinish);
    //    timerStart = setTimeout(function () {
    //        $("body").removeClass(foldClass);
    //    }, unfoldDelay);
    //});

    //// Remove class on mouse leave
    //sidebarMainElement.on('mouseleave', function () {
    //    clearTimeout(timerStart);
    //    timerFinish = setTimeout(function () {
    //        $("body").addClass(foldClass);
    //    }, unfoldDelay);
    //});
});