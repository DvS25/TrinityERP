function BindAutocomplete(autocompleteId) {
    $("." + autocompleteId).autocomplete({
        source: function (request, response) {
            $.ajax({
                url: getDomain() + '/Common/BindMastersDetails?ServiceName=USERDETAILS_GET&sord=asc&ColumnRequested=USERID,SAL_EMPFULLNAME&_search=true&searchField=SAL_EMPFULLNAME&searchOper=cn&searchString=' + request.term,
                type: "POST",
                async: false,
                cache: false,
                success: function (data) {
                    if ($(data).find('RESPONSECODE').text() == "0") {
                        var JsonObject = xml2json.parser(data);
                        if (JsonObject.serviceresponse.detailslist != undefined) {
                            var List;
                            if (JsonObject.serviceresponse.detailslist.details.length > 1)

                                List = JsonObject.serviceresponse.detailslist.details;

                            else
                                List = JsonObject.serviceresponse.detailslist;
                            response(

                           $.map(List, function (item) {
                               if (jQuery.type(item) == "object") {

                                   return {
                                       id: item.userid,
                                       label: item.sal_empfullname,
                                       value: item.sal_empfullname
                                   }
                               }
                           }))
                        }
                        else {
                            response([{ label: 'No Records Found', value: '' }]);
                        }
                    }
                    else {
                        response([{ label: 'No Records Found', value: '' }]);
                    }
                }
            })
        },
        messages: {
            noResults: '',
            results: function (resultsCount) { }
        },
        focus: function (event, ui) {
            event.preventDefault();
        },
        select: function (event, ui) {
            $("#hidesalesid").val("");
            $("#hidesalesid").val(ui.item.id);
        },

        minLength: 0,

    })
    .data("ui-autocomplete")._renderItem = function (ul, item) {
        // Master_QuotationLisView.variables.Masterpartyid = item.id;
        var inner_html = '<div class="list_item_container"><div class="autodescription"><p><span >' + item.label + '</span><span style="display:none">' + item.id + '</span><br/></p></div>';
        var listItem = $("<li></li>")
        .data("item.autocomplete", item)
        .append(inner_html)
        .appendTo(ul);
        return listItem;

    }

    $(".ui-helper-hidden-accessible").css("display", "none");
    $(".ui-autocomplete").css({ top: 103, left: 971.75, position: 'absolute' });
    $(".ui-autocomplete").css("background-color", "white");

}
function lanlongmap(salesid, fromdate, todate) {
    var myfilter = { rules: [] };
    myfilter.rules.push({ field: "SALESID", op: "eq", data: salesid });
    myfilter.rules.push({ field: "FROMDATE", op: "eq", data: fromdate });
    myfilter.rules.push({ field: "TODATE", op: "eq", data: todate });
    $.ajax({
        url: getDomain() + "/Common/BindMastersDetails?ServiceName=ACTIVITYLOCATIONDETAIL_GET&myfilters=" + JSON.stringify(myfilter),
        async: false,
        cache: false,
        type: 'GET',
        success: function (data) {
            if ($(data).find('RESPONSECODE').text() == "0") {
                var JsonObject = xml2json.parser(data);
                if (JsonObject.serviceresponse.detailslist != undefined) {
                    $("#mapdiv").show();
                    $("#usernorecord").hide();
                    var userLat, userLng, activitytype, acivitydate, row;
                    var lantitude = [];
                    var longitude = [];
                    var activitytooltip = [];
                    var activitytooltipdate = [];
                    var activityrowno = [];
                    for (var i = 0; i < JsonObject.serviceresponse.detailslist.details.length; i++) {
                        userLat = JsonObject.serviceresponse.detailslist.details[i].latitude;
                        userLng = JsonObject.serviceresponse.detailslist.details[i].longitude;
                        activitytype = JsonObject.serviceresponse.detailslist.details[i].activitytype;
                        acivitydate = JsonObject.serviceresponse.detailslist.details[i].activitydate;
                        row = JsonObject.serviceresponse.detailslist.details[i].rownum;


                        lantitude.push(userLat);
                        longitude.push(userLng);
                        activitytooltip.push(activitytype)
                        activitytooltipdate.push(acivitydate);
                        activityrowno.push(row);

                    }
                    initMap(lantitude, longitude, activitytooltip, activitytooltipdate, activityrowno);
                    google.maps.event.addDomListener(window, 'load', initMap);

                }
                else {
                    $("#mapdiv").hide();
                    $("#usernorecord").show();

                }
            }
            else {
                notificationMessage('', $(data).find('RESPONSEMESSAGE').text(), 'warning');
            }
        },
        error: OnError
    });
}
function initMap(userLat, userLng, activitytooltip, activitytooltipdate, activityrowno) {
    var j, broadway, locations = [], a = [];
    for (j = 0; j < userLat.length; j++) {
        broadway = {
            info: '<strong><p class="rownucolor" style="display:inline;margin-right:3px">' + activityrowno[j] + '.</p>' +
                '<p class="maptexttype" style="display:inline">' + activitytooltip[j] + '</p>' +
                '<p class="maptext" style="margin-left: 16px;">' + activitytooltipdate[j] + '</p>',
            lat: userLat[j],
            long: userLng[j],
            a: j
        }
        locations.push({ 0: broadway.info, 1: broadway.lat, 2: broadway.long, 3: broadway.a });
    }

    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: new google.maps.LatLng(21.148485, 72.765476),
        mapTypeId: google.maps.MapTypeId.roadmap
    });

    var infowindow = new google.maps.InfoWindow({
        content: broadway.info
    });
    var marker, i;
    for (i = 0; i < locations.length; i++) {
        marker = new google.maps.Marker({
            position: new google.maps.LatLng(locations[i][1], locations[i][2]),
            map: map
        });

        google.maps.event.addListener(marker, 'click', (function (marker, i) {
            return function () {
                infowindow.setContent(locations[i][0]);
                infowindow.open(map, marker);
            }
        })(marker, i));
    }
}
$(document).ready(function () {
    var d,firstDay;
    d = new Date();
    firstDay = new Date(d.getFullYear(), d.getMonth(), 1);
    $('#txt_fromdate').datepicker({
        format: 'dd M yyyy',
        endDate: "today"
    }).datepicker("setDate", firstDay);
    $('#txt_todate').datepicker({
        format: 'dd M yyyy',
        endDate: "today"
    }).datepicker("setDate", "0");
    $('#txt_fromdate').on('change', function () {
        $('.datepicker').hide();
    });
    $('#txt_todate').on('change', function () {
        $('.datepicker').hide();
    });
    $("#salespersoninput").click(function () {
        $("#ui-id-1").hide();
    })
    $("#searchsales").click(function () {
        var salesid, fromdate, todate;
        if ($("#salespersoninput").val()!="") {
            salesid = $("#hidesalesid").val();
            fromdate = $('#txt_fromdate').val();
            todate = $('#txt_todate').val();
            lanlongmap(salesid, fromdate, todate);
        }
        else {
            salesid = $("#hidesalesid").val("");
            $("#mapdiv").hide();
            notificationMessage('', 'Please Select Sales Person Name', 'warning');
        }
      
    });
});