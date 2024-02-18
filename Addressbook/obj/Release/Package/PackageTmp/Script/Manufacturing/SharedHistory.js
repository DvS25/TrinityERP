var SharedhistoryView = {
    variables: {
        BindGroupListUrl: "/Common/BindMastersDetails?ServiceName=PRD_SHARINGHISTORY_GET",
        Oper: 'Add',
        addedit: "added",
        Masterid: "",
        EditDataList: [],
        RowCount: 1,
        ImgRowCount: 1,
        ImageUploadType: "",
        dx_dataGrid: ""
     
    },
    initializeDevExgrid: function () {
        SharedhistoryView.variables.dx_dataGrid = $("#dx_dataGrid").dxDataGrid({
            dataSource: new DevExpress.data.CustomStore({
                key: "shareid",
                load: function (loadOptions) {
                    var deferred = $.Deferred();

                    var result = DevExVariables.GetDataList(loadOptions, SharedhistoryView.variables.BindGroupListUrl);

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
            columns: [{ dataField: "shareid", dataType: "string", allowFiltering: false, visible: false },
                {
                    dataField: "sharetype", caption: "Share Type", dataType: "string", alignment: "center", filterOperations: ["contains"],
                    allowSorting: false, allowFiltering: false, allowHeaderFiltering: true,
                    headerFilter: {
                        dataSource: [{
                            text: "E-Mail",
                            value: ["sharetype_mail", "equals", "E-Mail"]
                        }, {
                            text: "Whats Aspp",
                            value: ["sharetype_whatsapp", "equals", "WhatsApp"]
                        }, {
                            text: "SMS",
                            value: ["sharetype_sms", "equals", "SMS"]
                        }
                        ]
                    },
                    cellTemplate: function (container, options) {
                        if (isU()) {
                            var temp = '<div>' + options.displayValue + '</div>';
                            $(temp).appendTo(container);
                        }
                        else
                            DevExVariables.LabelTemplate(container, options);
                    }
                    
                },
                { dataField: "mobileno", caption: "Mobile No", dataType: "string", alignment: "center", allowFiltering: true, allowHeaderFiltering:false, allowSorting: false },
                { dataField: "emailid", caption: "Email", dataType: "string", alignment: "center", allowFiltering: true, allowHeaderFiltering :false, allowSorting: false },
                {
                    dataField: "totalrecords_iteam", caption: "Total Records", dataType: "string", alignment: "center", allowFiltering: false, allowSorting: false,
                    cellTemplate: function (container, options) {
                        var temp =  '<div>' + options.displayValue + '</div>';
                        $(temp).appendTo(container);
                    }

                },
                {
                    dataField: "islike", caption: "Like", dataType: "string", alignment: "center", allowFiltering: false, allowSorting: false,
                    cellTemplate: function (container, options) {
                        var temp = '<div>' + options.displayValue + '</div>';
                        $(temp).appendTo(container);
                    }

                },
                {
                    dataField: "isview", caption: "View", dataType: "string", alignment: "center", allowFiltering: false, allowSorting: false,
                    cellTemplate: function (container, options) {
                        var temp = '<div>' + options.displayValue + '</div>';
                        $(temp).appendTo(container);
                    }

                },
                {
                    dataField: "employee_name", caption: "Shared By", dataType: "string", alignment: "center", allowFiltering: false, allowSorting: false,
                    cellTemplate: function (container, options) {
                        var str = options.data.shareddate;
                        var res = str.substring(1, 17);
                        var temp = '<div><lable style="border-bottom:1px solid black">' + options.displayValue + '</lable><br/><lable>' + res + '</div>';
                        $(temp).appendTo(container);
                    }

                }
              
            ]
        }).dxDataGrid("instance");
    },
};

$(document).ready(function () {
    SharedhistoryView.initializeDevExgrid();
});

