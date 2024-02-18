var DesignSharedView = {
    variables: {
        BindDesignListUrl: "/Sharing/BindMastersDetails?ServiceName=PRD_SHARED_DESIGNS_GET",
        Bind_desginIteam_get: "/Sharing/BindMastersDetails?ServiceName=PRD_DESIGNSHARING_ITEAM_GET",
        PerformMasterOperationurl: "/Sharing/OpeartionsOnMaster?ServiceName=PRD_DESIGNSHARING_ITEAM_CRUD",
        CurrencyCode: "INR",
        Language: "en-IN",
        PageIndex: 1,
        rows: 1,
        Selectgoldpurity: "",
        SelectGpurity: "",
        SelectDcolor: "",
        activediamondquality: "",
        SelectDpurity: "",
        dm_id: "",
        listitem_id: "",
        total_recored: ""
    },


    GetDesignList: function (onchange) {

        if (onchange == false) {
            $(".removegoldpurity").removeClass('activegoldpurity');
            $(".removediamonquality").removeClass('activediamondquality');
            $(".removediamondcolor").removeClass('activediamondcolor');
            $(".removegoldcolor").removeClass('activegoldcolor');
            $(".removeSize").removeClass('activesize');
        }

        var myfilter = { rules: [] };
        myfilter.rules.push({ field: "SHAREID", op: "eq", data: $("#hdnShareId").val() });
        if (onchange == true) {
            myfilter.rules.push({ field: "METALPURITY", op: "eq", data: $(".activegoldpurity").attr('id') });
            myfilter.rules.push({ field: "METALCOLOR", op: "eq", data: $(".activegoldcolor").attr('id') });
            myfilter.rules.push({ field: "DIACOLOR", op: "eq", data: $(".activediamondcolor").attr('id') });
            myfilter.rules.push({ field: "DIAPURITY", op: "eq", data: $(".activediamondquality").attr('id') });
        }

        $.ajax({
            url: getDomain() + DesignSharedView.variables.BindDesignListUrl + "&page=" + DesignSharedView.variables.PageIndex +
                 "&rows=" + DesignSharedView.variables.rows + "&sord=ASC&sidx=DM_ID&myfilters=" + JSON.stringify(myfilter),
            async: false,
            cache: false,
            type: 'POST',
            beforeSend: function () {
                dx_LoaderTrinity.show();
            },
            complete: function () {
                dx_LoaderTrinity.hide();
            },
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    $("#lbl_MainImage_a").show();
                    $("#lbl_MainImage_a_video").hide();
                    var JsonObject = xml2json.parser(data);
                    if (JsonObject.serviceresponse.detailslist) {
                        DesignSharedView.variables.total_recored = '';
                        DesignSharedView.variables.total_recored = JsonObject.serviceresponse.totalrecords;
                        $("#lbltotal").html(JsonObject.serviceresponse.totalrecords)
                        if (+DesignSharedView.variables.total_recored > +DesignSharedView.variables.PageIndex) {
                            document.getElementById("btnnext").style['pointer-events'] = 'auto';
                            document.getElementById("btnPrevious").style['pointer-events'] = 'none';

                        }
                        else {
                            document.getElementById("btnnext").style['pointer-events'] = 'none';
                            document.getElementById("btnPrevious").style['pointer-events'] = 'none';
                        }

                        var BindData = JsonObject.serviceresponse.detailslist.details

                        DesignSharedView.variables.dm_id = BindData.dm_id;
                        DesignSharedView.variables.listitem_id = BindData.listitemid;
                        $("#lblDesignHeader").html(BindData.designcode)
                        $("#lblshareing").html(BindData.employee_name)
                        $("#lblGrossWgt").html(BindData.grossweight + " gm");
                        //$("#lblNetWgt").html(BindData.netweight + " gm");
                        //$("#lblDiaPcs").html(BindData.diapcs);
                        $("#lblDiaWgt").html(BindData.diacts + " cts");
                        $("#finalgoldpurityName").html("&nbsp &nbsp" + BindData.purity);
                        $("#finaldiamonqualityName").html(BindData.dipurity);
                        $("#finaldiamondcolorName").html(BindData.dicolour);
                        $("#finalgoldcolorName").html(BindData.color);
                        $("#finalSize").html(BindData.size);
                        $("#" + BindData.purity).removeClass('scrlhover');
                        $("#" + BindData.purity).addClass('activegoldpurity');
                        $("#" + BindData.dipurity).removeClass('scrlhover');
                        $("#" + BindData.dipurity).addClass('activediamondquality');
                        $("#" + BindData.dicolour).removeClass('scrlhover');
                        $("#" + BindData.dicolour).addClass('activediamondcolor');
                        $("#" + BindData.color).removeClass('scrlhover');
                        $("#" + BindData.color).addClass('activegoldcolor');
                        $("#" + BindData.size).removeClass('scrlhover');
                        $("#" + BindData.size).addClass('activesize');
                        $("#lblGoldPrice").html(BindData.currencycode + " " + BindData.price);
                        var Datadecode = htmlDecode(BindData.ratestar1)
                        $("#lblGoldRateing").html(Datadecode);
                        $("#lbl_MainImage").attr("alt", BindData.designcode);
                        var TempUrl = BindData.imgpath;
                        $("#lbl_MainImage").attr("data-image", TempUrl);

                        document.getElementById('lbl_MainImage').style.backgroundImage = "url('" + TempUrl + "')";

                        $("#lbl_MainImage_a").attr("href", BindData.imgpath);


                        var myfilter;
                        myfilter = { rules: [] };
                        myfilter.rules.push({ field: "DM_ID", op: "eq", data: BindData.dm_id });
                        myfilter.rules.push({ field: "COLORTYPE", op: "eq", data: $(".activegoldcolor").attr('id') });
                        $.ajax({
                            url: getDomain() + "/Sharing/BindMastersDetails?ServiceName=PRD_DESIGN_IMAGES_GET&myfilters=" + JSON.stringify(myfilter),
                            async: false,
                            cache: false,
                            type: 'POST',
                            success: function (data) {
                                if ($(data).find('RESPONSECODE').text() == "0") {
                                    var JsonObject = xml2json.parser(data);
                                    if (JsonObject.serviceresponse.detailslist) {

                                        $('#slidertopview').owlCarousel('destroy');

                                        $("#slidertopview").html($("#Render_Subimage").render(JsonObject.serviceresponse.detailslist.details));

                                        $('.owl-carousel').owlCarousel({
                                            loop: false,
                                            margin: 10,
                                            nav: true,
                                            responsive: {
                                                0: {
                                                    items: 3
                                                },
                                                600: {
                                                    items: 3
                                                },
                                                1000: {
                                                    items: 5
                                                }
                                            }
                                        })
                                    }
                                    else
                                        $("#slidertopview").html("");
                                }
                            }
                        });



                        var data1 =
                        {
                            "LISTITEM_ID": BindData.listitemid,
                            "SHAREDID": $("#hdnShareId").val(),
                            "TYPE": "ISVIEW"
                        }

                        $.ajax({
                            url: getDomain() + DesignSharedView.variables.PerformMasterOperationurl,
                            data: data1,
                            async: false,
                            cache: false,
                            type: 'POST',
                            success: function (data) {
                                if ($(data).find('RESPONSECODE').text() == "0") {

                                }
                            }
                        });
                        DesignSharedView.LikeCHK(DesignSharedView.variables.dm_id);
                        //$("#lblGoldRateing").html(BindData.grossweight);
                    }
                }
                else {
                    InvalidResponseCode(data);
                }
            },
            error: OnError
        });
    },

    LikeCHK: function (dm_id) {
        var myfilter = { rules: [] };
        myfilter.rules.push({ field: "DM_ID", op: "eq", data: dm_id });
        myfilter.rules.push({ field: "SHAREDID", op: "eq", data: $("#hdnShareId").val() });
        $.ajax({
            url: getDomain() + DesignSharedView.variables.Bind_desginIteam_get + "&myfilters=" + JSON.stringify(myfilter),
            async: false,
            cache: false,
            type: 'POST',
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    var JsonObject = xml2json.parser(data);
                    if (JsonObject.serviceresponse.detailslist) {
                        if (JsonObject.serviceresponse.detailslist.details.islike == 1) {
                            $("#btnheart_fa").removeClass("icon-heart6");
                            $("#btnheart_fa").addClass("icon-heart5")
                            document.getElementById('btnheart_fa').style.color = 'red';
                        }
                        else {
                            $("#btnheart_fa").removeClass("icon-heart5");
                            $("#btnheart_fa").addClass("icon-heart-broken2");
                            setTimeout(function () {
                                $("#btnheart_fa").removeClass("icon-heart-broken2");
                                $("#btnheart_fa").addClass("icon-heart6");
                                document.getElementById('btnheart_fa').style.color = 'black';
                            }, 1);
                        }
                    }
                }
            }
        });

    },
    GetFormatedCurrency: function (price) {
        var convertint = parseFloat(price).toLocaleString(DesignSharedView.variables.Language, {
            style: 'currency', currency: DesignSharedView.variables.CurrencyCode,
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });

        return convertint;
    },

    btn_nextClick: function () {
        DesignSharedView.variables.PageIndex = +DesignSharedView.variables.PageIndex + 1;
        DesignSharedView.GetDesignList(false);
    },
    btn_Previous: function () {
        DesignSharedView.variables.PageIndex = +DesignSharedView.variables.PageIndex - 1;
        DesignSharedView.GetDesignList(false);
    },
    Color_Onchnage: function () {

        var myfilter;
        myfilter = { rules: [] };
        myfilter.rules.push({ field: "DM_ID", op: "eq", data: DesignSharedView.variables.dm_id });
        myfilter.rules.push({ field: "COLORTYPE", op: "eq", data: $("#ddlColorType").val() });
        $.ajax({
            url: getDomain() + "/Sharing/BindMastersDetails?ServiceName=PRD_DESIGN_IMAGES_GET&myfilters=" + JSON.stringify(myfilter),
            async: false,
            cache: false,
            type: 'POST',
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    var JsonObject = xml2json.parser(data);
                    if (JsonObject.serviceresponse.detailslist) {
                        $('#slidertopview').owlCarousel('destroy');

                        $("#slidertopview").html($("#Render_Subimage").render(JsonObject.serviceresponse.detailslist.details));

                        $('.owl-carousel').owlCarousel({
                            loop: false,
                            margin: 10,
                            nav: true,
                            responsive: {
                                0: {
                                    items: 3
                                },
                                600: {
                                    items: 3
                                },
                                1000: {
                                    items: 5
                                }
                            }
                        })

                    }
                    else {
                        $("#slidertopview").html("");
                    }
                }
            }
        });


    },
    imageadditionalouter: function (thiscal) {
        var smallImage = $(thiscal).attr('data-image');

        if ($(thiscal).attr("filetype") == "IMG") {
            $("#lbl_MainImage_a").show();
            $("#lbl_MainImage_a_video").hide();
            var largeImage = $("#lbl_MainImage").attr('data-image');
            //var ez = $('#lbl_MainImage').data('elevateZoom');
            //$('#lbl_MainImage_a').attr('data-image', largeImage);
            $('#lbl_MainImage_a').attr('href', smallImage);
            document.getElementById('lbl_MainImage').style.backgroundImage = "url('" + smallImage + "')";

            //$("#lbl_MainImage").attr("src", smallImage);
            //$("#lbl_MainImage").attr("data-zoom-image", smallImage);
            //$("#lbl_MainImage").attr("data-zoom-image", largeImage);

            //$("#setcaroselimage").attr("href", largeImage);
            //ez.swaptheimage(smallImage, largeImage);
            z_index = $(thiscal).index('.image_additional_outer a') + 0;
            //$('#div_selectedImage').magnificPopup('close', 1);
        }
        else {
            $("#lbl_MainImage_a").hide();
            $("#lbl_MainImage_a_video").show();
            $("#lbl_MainImage_a_video").attr("src", smallImage);
        }

        return false;
    },

    Bindcustomizedata: function () {
        var myfilter, url;
        myfilter = { rules: [] };
        myfilter.rules.push({ field: "TYPE", op: "eq", data: "Purity,Colour" });
        myfilter.rules.push({ field: "ONLYALLOWED", op: "eq", data: true });
        myfilter.rules.push({ field: "ISUSEINJEWELLERY", op: "eq", data: true });
        myfilter.rules.push({ field: "ISSHOWINCUSTOMIZE", op: "eq", data: true });
        $.ajax({
            url: getDomain() + "/Sharing/BindMastersDetails?ServiceName=STATIC_MASTER_MULTIPLE_GET&myfilters=" + JSON.stringify(myfilter),
            async: false,
            cache: false,
            type: 'POST',
            success: function (data) {
                $("#txtgoldpurity").html("");
                if ($(data).find('RESPONSECODE').text() == "0") {
                    var JsonObject = xml2json.parser(data);
                    if (JsonObject.serviceresponse.detailslist_purity.details) {
                        $("#txtgoldpurity").append($("#Datagoldpurity").render(JsonObject.serviceresponse.detailslist_purity.details.filter(function (x) { return x.rmcate == 'METAL' && x.rmsubcate == 'GOLD' })));
                    }

                    if (JsonObject.serviceresponse.detailslist_purity.details) {
                        $("#txtDiamondClarity").append($("#Datatxtdiamonclarity").render(JsonObject.serviceresponse.detailslist_purity.details.filter(function (x) { return x.rmcate == 'GEMS' && x.rmsubcate == 'NATURAL' })));
                    }

                    if (JsonObject.serviceresponse.detailslist_colour.details) {
                        $("#txtDiamondColor").append($("#Datatxtdiamoncolor").render(JsonObject.serviceresponse.detailslist_colour.details.filter(function (x) { return x.rmcate == 'GEMS' && x.rmsubcate == 'NATURAL' })));
                    }

                    if (JsonObject.serviceresponse.detailslist_colour.details) {
                        $("#txtGoldColor").append($("#Datatxtgoldcolor").render(JsonObject.serviceresponse.detailslist_colour.details.filter(function (x) { return x.rmcate == 'METAL' && x.rmsubcate == 'GOLD' })));
                    }

                    $(".loadingtrinity").hide();
                }
                else {
                    $(".loadingtrinity").hide();
                    InvalidResponseCode(data);
                }
            },
            error: OnError
        });
    },

    BindSize: function () {
        var myfilter, url;
        myfilter = { rules: [] };

        $.ajax({
            url: getDomain() + "/Sharing/BindMastersDetails?ServiceName=PRD_SHARED_DESIGNS_GET&myfilters=",
            async: false,
            cache: false,
            type: 'POST',
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    var JsonObject = xml2json.parser(data);
                    if (JsonObject.serviceresponse.detailslist.details.size) {
                        $("#lblSize").html('Size:');
                        if (JsonObject.serviceresponse.partyjewellerysize.details) {
                            $("#txtSize").append($("#DataSize").render(JsonObject.serviceresponse.partyjewellerysize.details));
                        }
                    }
                    $(".loadingtrinity").hide();
                }
                else {
                    $(".loadingtrinity").hide();
                    InvalidResponseCode(data);
                }
            },
            error: OnError
        });
    },

    Selectgoldpurity: function (id) {
        $(".activegoldpurity").addClass('scrlhover');
        $(".activegoldpurity").removeClass('activegoldpurity');
        $("#" + id).addClass('activegoldpurity');
        $("#" + id).removeClass('scrlhover');
        $("#finalgoldpurityName").html("&nbsp &nbsp" + id);
        DesignSharedView.variables.SelectGpurity = id;
        DesignSharedView.GetDesignList(true);
    },
    SeletedGoldcolor: function (id) {
        $(".activegoldcolor").addClass('scrlhover');
        $(".activegoldcolor").removeClass('activegoldcolor');
        $("#" + id).addClass('activegoldcolor');
        $("#" + id).removeClass('scrlhover');
        $("#finalgoldcolorName").html(id);
        DesignSharedView.variables.SelectDcolor = id;
        DesignSharedView.GetDesignList(true);
    },
    Selectdiamondquality: function (id) {
        $(".activediamondquality").addClass('scrlhover');
        $(".activediamondquality").removeClass('activediamondquality');
        $("#" + id).addClass('activediamondquality');
        $("#" + id).removeClass('scrlhover');
        $("#finaldiamonqualityName").html(id);
        DesignSharedView.variables.SelectDpurity = id;
        DesignSharedView.GetDesignList(true);
    },
    SeletedDiamoncolor: function (id) {
        $(".activediamondcolor").addClass('scrlhover');
        $(".activediamondcolor").removeClass('activediamondcolor');
        $("#" + id).addClass('activediamondcolor');
        $("#" + id).removeClass('scrlhover');
        $("#finaldiamondcolorName").html(id);
        DesignSharedView.variables.SelectDcolor = id;
        DesignSharedView.GetDesignList(true);
    },
    SelectSize: function (id) {
        $(".activesize").addClass('scrlhover');
        $(".activesize").removeClass('activesize');
        $("#" + id).addClass('activesize');
        $("#" + id).removeClass('scrlhover');
        $("#finalSize").html(id);
        DesignSharedView.variables.SelectJSize = id;
        DesignSharedView.GetDesignList(true);
    }
};

$(document).ready(function () {
    DesignSharedView.Bindcustomizedata();
    DesignSharedView.BindSize();

    //$('#MoreinfoDetails').modal('show');
    //$('#MoreinfoDetails').modal({ backdrop: 'static', keyboard: false })
    $('#slidertopview').owlCarousel({
        loop: false,
        margin: 10,
        nav: true,
        responsive: {
            0: {
                items: 3
            },
            600: {
                items: 3
            },
            1000: {
                items: 5
            }
        }
    });
    //$("#sliderbotom").owlCarousel({
    //    loop: false,
    //    margin: 10,
    //    nav: true,
    //    responsive: {
    //        0: {
    //            items: 1
    //        },
    //        600: {
    //            items: 5
    //        },
    //        1200: {
    //            items: 6
    //        },
    //        1300: {
    //            items: 7
    //        }
    //    }
    //});

    $("#lblindex").html(DesignSharedView.variables.PageIndex);
    DesignSharedView.GetDesignList(false);

    $("#btnnext").click(function () {
        DesignSharedView.btn_nextClick();
        if (+DesignSharedView.variables.total_recored == +DesignSharedView.variables.PageIndex) {
            document.getElementById("btnnext").style['pointer-events'] = 'none';
            document.getElementById("btnPrevious").style['pointer-events'] = 'auto';
        }
        else {
            document.getElementById("btnnext").style['pointer-events'] = 'auto';
            document.getElementById("btnPrevious").style['pointer-events'] = 'auto';
        }

        $("#lblindex").html(DesignSharedView.variables.PageIndex);
    });
    $("#btnPrevious").click(function () {
        DesignSharedView.btn_Previous();
        if (1 == +DesignSharedView.variables.PageIndex) {
            document.getElementById("btnPrevious").style['pointer-events'] = 'none';
        }
        else {
            document.getElementById("btnPrevious").style['pointer-events'] = 'auto';
        }
        $("#lblindex").html(DesignSharedView.variables.PageIndex);
    });

    $("#ddlColorType").change(function () {
        DesignSharedView.GetDesignList(true);
        DesignSharedView.Color_Onchnage();
    });

    $("#btnheart_fa").click(function () {
        if ($("#btnheart_fa").hasClass("icon-heart6")) {    //Like
            $("#btnheart_fa").removeClass("icon-heart6");
            $("#btnheart_fa").addClass("icon-heart5")

            var data =
                     {
                         "LISTITEM_ID": DesignSharedView.variables.listitem_id,
                         "SHAREDID": $("#hdnShareId").val(),
                         "ISLIKE": 1,
                         "TYPE": "ISLIKE"
                     }

            $.ajax({
                url: getDomain() + DesignSharedView.variables.PerformMasterOperationurl,
                data: data,
                async: false,
                cache: false,
                type: 'POST',
                success: function (data) {
                    if ($(data).find('RESPONSECODE').text() == "0") {
                        if ($(data).find('ISLIKE').text() == "0") {
                            $("#btnlike").attr("chkclick", "0")
                            document.getElementById("btnheart_fa").style.color = "black";
                        }
                        else {
                            $("#btnlike").attr("chkclick", "1")
                            document.getElementById("btnheart_fa").style.color = "red";
                        }
                    }
                }
            });
        }
        else {  //Dislike
            $("#btnheart_fa").removeClass("icon-heart5");
            $("#btnheart_fa").addClass("icon-heart-broken2");
            setTimeout(function () {
                $("#btnheart_fa").removeClass("icon-heart-broken2");
                $("#btnheart_fa").addClass("icon-heart6");
            }, 500);

            var data =
                     {
                         "LISTITEM_ID": DesignSharedView.variables.listitem_id,
                         "SHAREDID": $("#hdnShareId").val(),
                         "ISLIKE": 0,
                         "TYPE": "ISLIKE"
                     }

            $.ajax({
                url: getDomain() + DesignSharedView.variables.PerformMasterOperationurl,
                data: data,
                async: false,
                cache: false,
                type: 'POST',
                success: function (data) {
                    if ($(data).find('RESPONSECODE').text() == "0") {
                        if ($(data).find('ISLIKE').text() == "0") {
                            $("#btnlike").attr("chkclick", "0")
                            document.getElementById("btnheart_fa").style.color = "black";
                        }
                        else {
                            $("#btnlike").attr("chkclick", "1")
                            document.getElementById("btnheart_fa").style.color = "red";
                        }
                    }
                }
            });
        }
    });


    document.getElementById("btnPrevious").style['pointer-events'] = 'none';
});

