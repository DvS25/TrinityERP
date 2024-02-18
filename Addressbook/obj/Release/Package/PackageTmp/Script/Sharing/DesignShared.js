var DesignSharedView = {
    variables: {
        BindDesignListUrl: "/Sharing/BindMastersDetails?ServiceName=PRD_SHARED_DESIGNS_GET",
        Bind_desginIteam_get: "/Sharing/BindMastersDetails?ServiceName=PRD_DESIGNSHARING_ITEAM_GET",
        PerformMasterOperationurl: "/Sharing/OpeartionsOnMaster?ServiceName=PRD_DESIGNSHARING_ITEAM_CRUD",
        CurrencyCode: "INR",
        Language: "en-IN",
        PageIndex: 1,
        rows: 1,
        dm_id: "",
        total_recored: ""
    },

    GetDesignList: function () {
        var myfilter = { rules: [] };
        myfilter.rules.push({ field: "SHAREID", op: "eq", data: $("#hdnShareId").val() });

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
                        DesignSharedView.variables.total_recored = JsonObject.serviceresponse.total_recored.totalrecord;
                        $("#lbltotal").html(JsonObject.serviceresponse.total_recored.totalrecord)
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
                        $("#lblDesignHeader").html(BindData.designcode)
                        $("#lblshareing").html(BindData.employee_name)
                        $("#lblGrossWgt").html(BindData.grossweight+" gm");
                        $("#lblNetWgt").html(BindData.netweight + " gm");
                        $("#lblDiaPcs").html(BindData.diapcs);
                        $("#lblDiaWgt").html(BindData.diacts + " cts");
                        $("#lblpurity").html(BindData.purity);
                        $("#lblGoldPrice").html("₹ " +BindData.price);
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
                                    else
                                        $("#slidertopview").html("");
                                }
                            }
                        });

                       

                        var data1 =
                        {
                            "DM_ID": BindData.dm_id,
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
    LikeCHK: function (Dm_id) {
        var myfilter = { rules: [] };
        myfilter.rules.push({ field: "DM_ID", op: "eq", data: Dm_id });
        myfilter.rules.push({ field: "SHAREDID", op: "eq", data: $("#hdnShareId").val() });
        $.ajax({
            url: getDomain() + DesignSharedView.variables.Bind_desginIteam_get +"&myfilters=" + JSON.stringify(myfilter),
            async: false,
            cache: false,
            type: 'POST',
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    var JsonObject = xml2json.parser(data);
                    if (JsonObject.serviceresponse.detailslist) { 
                        if (JsonObject.serviceresponse.detailslist.details.islike == 1)
                        {
                            $("#btnheart_fa").removeClass("icon-heart6");
                            $("#btnheart_fa").addClass("icon-heart5")
                            document.getElementById('btnheart_fa').style.color = 'red';
                        }
                        else
                        {
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
        DesignSharedView.GetDesignList();
    },
    btn_Previous: function () {
        DesignSharedView.variables.PageIndex = +DesignSharedView.variables.PageIndex - 1;
        DesignSharedView.GetDesignList();
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
    imageadditionalouter: function (thiscal)
    {
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
};

$(document).ready(function () {
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
    DesignSharedView.GetDesignList();
  
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
        DesignSharedView.Color_Onchnage();
    });

    $("#btnheart_fa").click(function () {
        if ($("#btnheart_fa").hasClass("icon-heart6")) {    //Like
            $("#btnheart_fa").removeClass("icon-heart6");
            $("#btnheart_fa").addClass("icon-heart5")

            var data =
                     {
                         "DM_ID": DesignSharedView.variables.dm_id,
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
                         "DM_ID": DesignSharedView.variables.dm_id,
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

