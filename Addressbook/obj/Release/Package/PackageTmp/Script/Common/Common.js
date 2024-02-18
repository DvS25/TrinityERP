$(document).ready(function () {

    $('#btn_genpdf').click(function () {
        var pdf = new jsPDF('p', 'pt', 'letter');
        var canvas = pdf.canvas;

        html2canvas($("#test"), {
            canvas: canvas,
            onrendered: function (canvas) {
                var iframe = document.createElement('iframe');
                iframe.setAttribute('style', 'position:absolute;top:0;right:0;height:100%; width:600px; z-index: 1040;');
                iframe.setAttribute('id', 'pdf_iframe');
                iframe.setAttribute('src', '');
                document.body.appendChild(iframe);
                iframe.src = pdf.output('datauristring');
            }
        });
    });
    $('#btnbackpdf').click(function () {
        $("#mainheaderdiv").show();
        $("#mainbodydiv").show();
        $("#contact_view").show();
        $("#finalpdf_view").hide();
        $("#pdf_div").hide();
        $("#pdf_button").hide();

        $("#pdf_iframe").remove();
    });
    $('#btnSaveletter').click(function () {
        var lettertext = $("#txtletterBody").val();
        $("#letter_body").html(lettertext);

        $("#frmletter_body").hide();
        $("#letter_bodytext").show();
        $("#letter_button").show();
        $("#default_tr").show();
    });
    $('#btnbactrinty').click(function () {
        $("#mainheaderdiv").show();
        $("#contact_view").show();
        $("#letter_div").hide();
        $("#frmletter_body").hide();
        $("#letter_bodytext").hide();
        $("#letter_button").hide();
        $("#default_tr").hide();



        $("#letterpdf_iframe").remove();
    });
    $('#btn_letterpdf').click(function () {

        //var lettertext = $("txtletterBody").val();

        var lpdf = new jsPDF('p', 'pt', 'letter');
        var lcanvas = lpdf.canvas;
        lcanvas.height = 800;
        lcanvas.width = 650;
        html2canvas($("#letterprint"), {
            canvas: lcanvas,
            onrendered: function (lcanvas) {
                var iframe = document.createElement('iframe');
                iframe.setAttribute('style', 'position:absolute;top:0;right:0;height:100%; width:600px; z-index: 1040;');
                iframe.setAttribute('id', 'letterpdf_iframe');
                iframe.setAttribute('src', '');
                document.body.appendChild(iframe);
                iframe.src = lpdf.output('datauristring');
            }
        });
    });
    $('#btnbackletterpdf').click(function () {
        $("#mainheaderdiv").show();
        $("#mainbodydiv").show();
        $("#contact_view").show();
        $("#letter_div").hide();
        $("#frmletter_body").hide();
        $("#letter_bodytext").hide();
        $("#letter_button").hide();
        $("#default_tr").hide();

        $("#letterpdf_iframe").remove();
    });

    $('.toggleSwitch').bootstrapToggle();

    window.setInterval(function () {
        AdminBindNotificationCount();
    }, 20000);
});
function numbersOnly(Sender, evt, isFloat, isNegative) {
    if (Sender.readOnly) return false;

    var key = evt.which || !window.event ? evt.which : event.keyCode;
    var value = Sender.value;

    if ((key == 46 || key == 44) && isFloat) {
        var selected = document.selection ? document.selection.createRange().text : "";
        if (selected.length == 0 && value.indexOf(".") == -1 && value.length > 0) Sender.value += ".";
        return false;
    }
    if (key == 45) { // minus sign '-'
        if (!isNegative) return false;
        if (value.indexOf('-') == -1) Sender.value = '-' + value; else Sender.value = value.substring(1);
        if (Sender.onchange != null) {
            if (Sender.fireEvent) {
                Sender.fireEvent('onchange');
            } else {
                var e = document.createEvent('HTMLEvents');
                e.initEvent('change', false, false);
                Sender.dispatchEvent(e);
            }
        }
        var begin = Sender.value.indexOf('-') > -1 ? 1 : 0;
        if (Sender.setSelectionRange) {
            Sender.setSelectionRange(begin, Sender.value.length);
        } else {
            var range = Sender.createTextRange();
            range.moveStart('character', begin);
            range.select();
        }

        return false;
    }
    if (key > 31 && (key < 48 || key > 57)) return false;
}
function OperationMessage(title, message, type) {
    var timeout = 3000;
    if (type == 'warning') {
        timeout = 4000;
    }
    else if (type == 'info') {
        timeout = 10000;
    }
    var positionClass = "toast-top-center";
    if (message.length > 50)
        positionClass = "toast-top-full-width";
    toastr.options = {
        "closeButton": true,
        "debug": false,
        "newestOnTop": true,
        "progressBar": true,
        "positionClass": positionClass,
        "onclick": null,
        "showDuration": "400",
        "hideDuration": "1000",
        "timeOut": timeout,
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    }
    toastr[type](message, title);
}
function checkIsValidFile(accept, type) {
    var isValid = false;
    if (accept.indexOf('image/') > -1) {
        if (type.indexOf('image/') > -1) {
            isValid = true;
        }
    }
    if (accept.indexOf('mp4') > -1) {
        if (type.indexOf('mp4') > -1) {
            isValid = true;
        }
    }
    if (accept.indexOf('text/') > -1) {
        if (type.indexOf('text/') > -1) {
            isValid = true;
        }
    }
    if (accept.indexOf('application/vnd.ms-xpsdocument') > -1) {
        if (type.indexOf('application/vnd.ms-xpsdocument') > -1) {
            isValid = true;
        }
    }
    if (accept.indexOf('application/pdf') > -1) {
        if (type.indexOf('application/pdf') > -1) {
            isValid = true;
        }
    }
    if (accept.indexOf('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') > -1) {
        if (type.indexOf('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') > -1) {
            isValid = true;
        }
    }
    if (accept.indexOf('application/vnd.ms-excel') > -1) {
        if (type.indexOf('application/vnd.ms-excel') > -1) {
            isValid = true;
        }
    }

    if (accept.indexOf('application/vnd.ms-excel.sheet.binary.macroEnabled.12') > -1) {
        if (type.indexOf('application/vnd.ms-excel.sheet.binary.macroEnabled.12') > -1) {
            isValid = true;
        }
    }

    if (accept.indexOf('csv/') > -1) {
        if (type.indexOf('csv/') > -1) {
            isValid = true;
        }
    }
    if (accept.indexOf('application/zip/') > -1) {
        if (type.indexOf('application/zip/') > -1) {
            isValid = true;
        }
    }

    if (accept.indexOf('application/x-zip-compressed') > -1) {
        if (type.indexOf('application/x-zip-compressed') > -1) {
            isValid = true;
        }
    }
    return isValid;
}
function AlignJqGridHeader(tableId, columns) {
    var i = 0;
    for (; i < columns.length; i++) {
        $('#' + tableId + '_' + columns[i]).each(function () { this.style.setProperty('text-align', 'center', 'important'); });
    }
}
var xmlvars = {};
Object.defineProperty(xmlvars, 'common_colmap', {
    get: function () {
        return 'DETAILSLIST>DETAILS>';
    },
});
Object.defineProperty(xmlvars, 'common_root', {
    get: function () {
        return 'DETAILSLIST';
    },
});
Object.defineProperty(xmlvars, 'common_row', {
    get: function () {
        return 'DETAILS';
    },
});
Object.defineProperty(xmlvars, 'common_response', {
    get: function () {
        return 'SERVICERESPONSE>';
    },
});
var jqGridVariables = {
    stringSearchOption: { sopt: ['cn', 'eq', 'ne'] },
    ApprovalBtnFmatter: function (cellvalue, options, rowObject, view) {
        if (cellvalue == 1) {
            return '<div class="checkbox" style="margin-top:0px!important"><label class="form-control-label"><input type="checkbox" class="toggleswitch active_sw" data-on="Yes" data-off="No" data-toggle="toggle" value="' + options.rowId + '"  id="IsActiveSwitch' + options.rowId + '" onchange=\"' + view + '.ApproveId(' + options.rowId + ');\" checked/></label></div>';
        }
        else {

            return '<div class="checkbox" style="margin-top:0px!important"><label class="form-control-label"><input type="checkbox" class="toggleswitch deactive_sw" data-on="Yes" data-off="No" data-toggle="toggle" value="' + options.rowId + '"  id="IsActiveSwitch' + options.rowId + '" onchange=\"' + view + '.ApproveId(' + options.rowId + ');\" /></label></div>';
        }

    },
    chkFmatter: function (cellvalue, options, rowObject) {
        if (cellvalue == 'FALSE' || cellvalue == '0' || cellvalue == undefined)
            return '<span class="label label-danger" style="font-size: 100%; !important">No</span>';
        else
            return '<span class="label label-success" style="font-size: 100%; !important">Yes</span>';
    },
    //StatusFmatter: function (cv, op, ro,view)
    //{
    //    if (cv == 'Saved')
    //        return '<span class="label label-success" style="font-size: 100%; !important">' + cv + '</span>';
    //    else
    //        return '<span class="label label-danger" style="font-size: 100%; !important">' + cv + '</span>';
    //},
    dateFmatter: function (cv, op, ro) {
        if (cv == '01/01/1900' || cv == '')
            return "";
        else
            return cv;
    },
    ImagesFmatter: function (cellvalue, options, rowobject, path) {
        return "<img width=\"15\" height=\"15\" src=\"" + getDomain() + path + cellvalue + "\">";
    },
    editBtnFmatter: function (cellvalue, options, rowObject, view, oper) {
        if (isU()) {
            return "<div onclick=\"" + view + ".triggerId('" + options.rowId + "','edit');\"><i  style=\"cursor:pointer;  color:#1cbac8;\" title=\"Edit\" class=\"fa fa-pencil fa-lg\"></i></div>";
        }
        else {
            return "<div  onclick=\"" + view + ".triggerId('" + options.rowId + "','view');\"><i style=\"cursor:pointer\" title=\"View\" class=\"hr-font-green fa fa-eye\"></i></div>";
        }
    },
    ViewBtnFmatter: function (cellvalue, options, rowObject, view, oper) {
        return "<div  onclick=\"" + view + ".ViewId('" + options.rowId + "','view');\"><i style=\"cursor:pointer\" title=\"View\" class=\"hr-font-green fa fa-eye\"></i></div>";
    },
    deleteBtnFmatter: function (cellvalue, options, rowObject, view) {
        if (isD()) {
            return "<div  onclick=\"" + view + ".deleteRow('" + options.rowId + "');\"><i style=\"cursor:pointer; color:red;\" title=\"Delete\" class=\"fa fa-trash-o fa-lg\"></i></div>";
        }
        else {
            return '';
        }
    },
    PublishBTnFmatter: function (cellvalue, options, rowObject, view) {
        return "<div  onclick=\"" + view + ".Publishsmsoremail('" + options.rowId + "');\"><i style=\"cursor:pointer; color:royalblue;\" title=\"Delete\" class=\"fa fa-paper-plane fa-lg\"></i></div>";
    },
    LetterBtnFmatter: function (cellvalue, options, rowObject, view) {
        return "<div  onclick=\"" + view + ".Letterhead('" + options.rowId + "');\"><i style=\"cursor:pointer; color:royalblue;\" title=\"letter head\" class=\"fa fa-file-text-o fa-lg\"></i></div>";
    },

    //-------For Distributor Order-----------------------------------
    Search_City_Option: {
        sopt: ['eq'],
        value: '1:Yes;0:No'
    },
}
function InvalidResponseCode(data) {
    var code = $(data).find('RESPONSECODE').text();
    var msg = '';

    if (code == "-405") {
        window.location.href = getDomain() + "/Login/LogOut?code=-405";
    }
    else if (code == "-406") {
        window.location.href = getDomain() + "/Login/LogOut";
    }
    else if (code != "0") {
        msg = "<div><b>Response Code:</b> " + code + "</div>";
        msg += "<div><br /><b>Response Message:</b> " + $(data).find('RESPONSEMESSAGE').text() + "</div>";

        OperationMessage('VALIDATION RESPONSECODE', msg, 'error');
    }
}
function OnError(xhr, errorType, exception) {
    var responseText;
    var ErrorDetail = "";

    try {
        responseText = jQuery.parseJSON(xhr.responseText);

        ErrorDetail = "<div><b>" + errorType + " " + exception + "</b></div>";
        ErrorDetail += "<div><b>Exception</b>: " + responseText.ExceptionType + "</div>";
        ErrorDetail += "<div><b>StackTrace</b>: " + responseText.StackTrace + "</div>";
        ErrorDetail += "<div><b>Message</b>: " + responseText.Message + "</div>";
    } catch (e) {
        ErrorDetail = "<div><b>Error Message</b>: " + xhr.responseText + "</div>";
    }

    if (ErrorDetail.indexOf('-405') > 0) {
        //window.location.href = getDomain() + "/Login/LogOut?code=-405";
    }
    else {
        //notificationMessage 
        OperationMessage('AJAX ERROR RESPONSE', ErrorDetail, 'error');
    }
}
function OnJqloadError(jqXHR, textStatus, errorThrown) {
    var responseText;
    var ErrorDetail = "";

    try {

        if (jqXHR.responseText.indexOf("404") > 0) {
            ErrorDetail = "<div><b>StatusCode</b>: 404</div>";
            ErrorDetail += "<div><b>Message</b>: Method not found.</div>";
        }
        else {
            responseText = jQuery.parseJSON(jqXHR.responseText);

            ErrorDetail = "<div><b>" + textStatus + " " + errorThrown + "</b></div>";
            ErrorDetail += "<div><b>Exception</b>:" + responseText.ExceptionType + "</div>";
            ErrorDetail += "<div><b>StackTrace</b>:" + responseText.StackTrace + "</div>";
            ErrorDetail += "<div><b>Message</b>:" + responseText.Message + "</div>";
        }

    } catch (e) {
        ErrorDetail = "<div><b>Error: " + errorThrown + "</b></div>";

        ErrorDetail += "<div><b>StatusCode</b>:" + jqXHR.status + "</div>";
        ErrorDetail += "<div><b>Status</b>:" + textStatus + "</div>";
        ErrorDetail += "<div><b>Message</b>:" + jqXHR.responseText + "</div>";
    }

    if (ErrorDetail.indexOf('-405') > 0) {
        window.location.href = getDomain() + "/Login/AdminLogin?code=-405";
    }
    else {
        notificationMessage('JQ ERROR RESPONSE', ErrorDetail, 'error');
    }

}
function OnJqbeforeProcessingErrorcheck(data, status, xhr) {
    var code = $(data).find('RESPONSECODE').text();
    if (code == "-405") {
        //window.location.href = "/Login/LogOut?code=-405";
        window.location.href = getDomain() + "/Login/LogOut?code=-405";
    }
    else if (code != "0") {
        var msg = '';

        msg = "<div><b>Response Code:</b> " + code + "</div>";
        msg += "<div><b>Response Message:</b> " + $(data).find('RESPONSEMESSAGE').text() + "</div>";

        OperationMessage('JQ CHECK RESPONSECODE', msg, 'error');
    }
}
function BindDropdown(ddl, optionList, url, selectText) {
    $.ajax({
        url: getDomain() + url,
        async: false,
        cache: false,
        type: 'POST',
        success: function (data) {

            if ($(data).find('RESPONSECODE').text() == "0") {

                if (selectText != '')
                    $("#" + ddl).html("<option value='' selected disabled hidden >" + selectText + "</option>");
                else
                    $("#" + ddl).html("");
                var JsonObject = xml2json.parser(data);
                if (JsonObject.serviceresponse.detailslist != undefined) {
                    $("#" + ddl).append($("#" + optionList).render(JsonObject.serviceresponse.detailslist.details));
                }
            }
            else {
                InvalidResponseCode(data);
            }
        },
        error: OnError
    });
}
function RegisterFileUploadToLinkForExcelImport(btn, anchor) {

    $("#" + btn).fileupload({
        url: getDomain() + '/Helpers/Handler/FileUploadHandler.ashx',
        add: function (e, data) {
            if (checkIsValidFile(e.target.accept, data.files[0].type)) {
                data.submit();
            }
            else
                notificationMessage('Invalid File', 'Please select only ' + e.target.accept + ' files', 'warning');
        },
        success: function (response, status) {

            response = response.substr(response.lastIndexOf('/') + 1);
            var displayFile = $(this)[0].files[0].name;
            //$("#" + anchor).attr("href", "/Clientfiles/Temp/" + response);
            $("#hdnex").val(getDomain() + "/UploadFiles/Temp/" + response);
            var uniqename;
            $("#" + anchor).html(displayFile);
            var ImportUrl = "/Account/ImportExcel";
            $(".cd-overlay").toggleClass("show-loder");
            $("#loder").toggleClass("show-loder");
            $.ajax({
                url: getDomain() + ImportUrl,
                data: { FilePath: $("#hdnex").val(), uniqename: response },
                async: true,
                cache: false,
                type: 'POST',
                success: function (data) {

                    $(".cd-overlay").toggleClass("show-loder");
                    $("#loder").toggleClass("show-loder");
                    if (data == "success") {
                        $("#table_list_Contact").trigger("reloadGrid", [{ current: true }]);
                        OperationMessage("", 'Contacts Imported successfully', 'success');
                    }
                    else {
                        OperationMessage("", data, 'warning');
                    }
                },
                error: OnError,
            });
            //ExcelFileUploadCallback(response, displayFile);
        },
        error: OnError
    });
}
function DateValidation(element) {
    var dateformat = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
    var Val_date = $('#' + element).val();
    if (Val_date.match(dateformat)) {
        var seperator1 = Val_date.split('/');
        var seperator2 = Val_date.split('-');

        if (seperator1.length > 1) {
            var splitdate = Val_date.split('/');
        }
        else if (seperator2.length > 1) {
            var splitdate = Val_date.split('-');
        }
        var dd = parseInt(splitdate[0]);
        var mm = parseInt(splitdate[1]);
        var yy = parseInt(splitdate[2]);
        var ListofDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        if (mm == 1 || mm > 2) {
            if (dd > ListofDays[mm - 1]) {
                return false;
            }
        }
        if (mm == 2) {
            var lyear = false;
            if ((!(yy % 4) && yy % 100) || !(yy % 400)) {
                lyear = true;
            }
            if ((lyear == false) && (dd >= 29)) {
                return false;
            }
            if ((lyear == true) && (dd > 29)) {
                return false;
            }
        }
    }
    else {
        return false;
    }
}
function RegisterFileUpload(btn, img, lblError) {
    $('#' + btn).fileupload({
        url: getDomain() + '/Helpers/Handler/FileUploadHandler.ashx',
        add: function (e, data) {

            if (checkIsValidFile(e.target.accept, data.files[0].type))
                data.submit();
            else
                notificationMessage('Invalid File', 'Please select only ' + e.target.accept + ' files', 'warning');
        },
        success: function (response, status) {

            $('#' + img).attr('src', response);
            if ($(lblError).length > 0) {
                $(lblError).hide();
                $(lblError).html("");
            }
        },
        error: OnError
    });
}
//multiple file upload control
var liImgArr = [];
var uploader;
function RegisterMultipleFileUpload(uploaderDiv, extension) {
    var uploadUrl = getDomain() + "/Helpers/Handler/FileUploadHandler.ashx";
    $(uploaderDiv).pluploadQueue({
        // General settings
        url: uploadUrl,
        // Maximum file size1
        //upload_max_filesize: '500mb',
        //chunk_size: '1mb',
        // Specify what files to browse for
        filters: [
            { title: "files type", extensions: extension },
        ],

        // Rename files by clicking on their titles
        rename: false,
        // Sort files
        sortable: true,
        // Enable ability to drag'n'drop files onto the widget (currently only HTML5 supports that)
        dragdrop: true,

        init: {
            FileUploaded: function (up, file, info) {
                if (info.response.indexOf('error') >= 0) {
                    //notificationMessage('File Attachment Error', info.response, 'error');
                    return;
                }
                liImgArr[file.id] = info.response;
            },
            UploadComplete: function (up, files) {
                var i = 0, displayFile;
                for (; i < files.length; i++) {
                    displayFile = $('#' + files[i].id).find('.plupload_file_name span').html();
                    strHtml = '<a href="' + liImgArr[files[i].id] + '" style="background:none;cursor: pointer;" target="_blank">' + displayFile + '</a>';
                    $('#' + files[i].id).find('.plupload_file_name').html(strHtml);
                }
                liImgArr = [];
            },
            Error: function (up, err) {
                //notificationMessage('File Attachment Error', err.message + (err.file ? ", File: " + err.file.name : ""), 'error');
            }
        },
        // Flash settings
        flash_swf_url: getDomain() + '/Content/plugin/plupload/Moxie.swf',
        // Silverlight settings
        silverlight_xap_url: getDomain() + '/Content/plugin/plupload/Moxie.xap'
    });
}
function convertUStoAUSDate(dateStr, separator) {
    var separator = (typeof (separator) == undefined) ? '-' : separator;
    var re = new RegExp('([0-9]{2})/([0-9]{2})/([0-9]{4})', 'm');
    var matches = re.exec(dateStr);
    return matches[2] + separator + matches[1] + separator + matches[3];
}
var remove_empty = function (target) {
    Object.keys(target).map(function (key) {
        if (target[key] instanceof Object) {
            if (!Object.keys(target[key]).length && typeof target[key].getMonth !== 'function') {
                delete target[key];
            } else {
                remove_empty(target[key]);
            }
        } else if (target[key] === null) {
            delete target[key];
        }
    });
    return target;
};
function notificationMessage(title, message, type) {
    var timeout = 100000;
    if (type == 'success')
        timeout = 3000;
    var positionClass = "toast-top-right";
    if (message.length > 50)
        positionClass = "toast-top-full-width";
    toastr.options = {
        "closeButton": true,
        "debug": false,
        "progressBar": true,
        "positionClass": positionClass,
        "onclick": null,
        "showDuration": "400",
        "hideDuration": "1000",
        "timeOut": timeout,
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "preventDuplicates": true,
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    }

    if (type != 'success') {
        var $toast = toastr[type](message, title); // Wire up an event handler to a button in the toast, if it exists
    }
    else {
        var $toast = toastr[type](message, title);
    }
}
function BindDropdownCity(ddl, optionList, url, selectText) {
    $.ajax({
        url: getDomain() + url,
        async: false,
        cache: false,
        type: 'POST',
        success: function (data) {
            if ($(data).find('RESPONSECODE').text() == "0") {
                if (selectText != '')
                    $("#" + ddl).html("<option value=''>" + selectText + "</option>");
                else
                    $("#" + ddl).html("");
                var JsonObject = xml2json.parser(data);
                if (JsonObject.serviceresponse.detailslist != undefined) {
                    $.each(JsonObject.serviceresponse.detailslist, function (key, innerjsonDetails) {
                        $("#" + ddl).append($("#" + optionList).render(innerjsonDetails));
                    });
                }
            }
            else {
                InvalidResponseCode(data);
            }
        },
        error: OnError
    });
}
function BindDropdownState(ddl, optionList, url, selectText) {
    $.ajax({
        url: getDomain() + url,
        async: false,
        cache: false,
        type: 'POST',
        success: function (data) {

            if ($(data).find('RESPONSECODE').text() == "0") {
                if (selectText != '')
                    $("#" + ddl).html("<option value=''>" + selectText + "</option>");
                else
                    $("#" + ddl).html("");
                var JsonObject = xml2json.parser(data);
                if (JsonObject.serviceresponse.detailslist != undefined) {
                    $.each(JsonObject.serviceresponse.detailslist, function (key, innerjsonDetails) {
                        $("#" + ddl).append($("#" + optionList).render(innerjsonDetails));
                    });
                }
            }
            else {
                InvalidResponseCode(data);
            }
        },
        error: OnError
    });
}
function BindDropdownCountry(ddl, optionList, url, selectText) {

    $.ajax({
        url: getDomain() + url,
        async: false,
        cache: false,
        type: 'POST',
        success: function (data) {

            if ($(data).find('RESPONSECODE').text() == "0") {
                if (selectText != '')
                    $("#" + ddl).html("<option value=''>" + selectText + "</option>");
                else
                    $("#" + ddl).html("");
                var JsonObject = xml2json.parser(data);
                if (JsonObject.serviceresponse.detailslist != undefined) {
                    $.each(JsonObject.serviceresponse.detailslist, function (key, innerjsonDetails) {
                        $("#" + ddl).append($("#" + optionList).render(innerjsonDetails));
                    });
                }
            }
            else {
                InvalidResponseCode(data);
            }
        },
        error: OnError
    });
}
function BindDropdownGroupName(ddl, optionList, url, selectText) {
    $.ajax({
        url: getDomain() + url,
        async: false,
        cache: false,
        type: 'POST',
        success: function (data) {
            if ($(data).find('RESPONSECODE').text() == "0") {
                if (selectText != '')
                    $("#" + ddl).html("<option value=''>" + selectText + "</option>");
                else
                    $("#" + ddl).html("");
                var JsonObject = xml2json.parser(data);
                if (JsonObject.serviceresponse.detailslist != undefined) {
                    $.each(JsonObject.serviceresponse.detailslist, function (key, innerjsonDetails) {
                        $("#" + ddl).append($("#" + optionList).render(innerjsonDetails));
                    });
                }
            }
            else {
                InvalidResponseCode(data);
            }
        },
        error: OnError
    });
}
function RegisterFileUploadwed(btn, preview, hdnDelete, width, height, lblError) {

    var uploadUrl = getDomain() + "/Helpers/Handler/FileUploadHandler.ashx";
    if (width != undefined && height != undefined)
        uploadUrl += "?width=" + width + "&height=" + height;
    $(btn).fileupload({
        url: uploadUrl,
        add: function (e, data) {

            //  var ext = data.files[0].name.split('.')[1].toLowerCase();   //comment by rajeshri for 'img.123.png' not supported
            var ext = data.files[0].name.substr((data.files[0].name.lastIndexOf('.') + 1));//change by rajeshri for 'img.123.png' supported
            var accept = e.target.accept;
            if (accept.indexOf(ext) > -1) {
                $(preview).parent().append('<img width="16" height="16" src="' + getDomain() + '/Images/loader.gif">');
                data.submit();
            }
            else {
                notificationMessage('File Attachment', 'Please select only ' + accept + ' files', 'warning');
            }
        },
        success: function (response, status) {
            if (response == 'Maximum request length exceeded.') {
                notificationMessage('File Attachment Error', response, 'error');
                $(preview).siblings('img').remove();
                return;
            }
            if (response.indexOf('error') >= 0) {
                notificationMessage('File Attachment Error', response, 'error');
                $(preview).siblings('img').remove();
                return;
            }
            var displayFile = $(this)[0].files[0].name;

            if ($(preview).attr('src').length > 0 && $(preview).attr('src').indexOf('/Temp/') > -1) {
                var strDeletedFile = $(hdnDelete).val() + $(preview).attr('src') + ',';
                $(hdnDelete).val(strDeletedFile);
            }
            $(preview).attr('src', response);
            $(preview).siblings('img').remove();
            if ($(lblError).length > 0) {
                $(lblError).hide();
                $(lblError).html("");
            }
        },
        error: function (xhr, errorType, exception) {
            notificationMessage('File Attachment Error', xhr.responseText, 'error');
            $(preview).siblings('img').remove();
        }
    });
}
function AdminBindNotificationCount() {
    var sfilter = { rules: [] };
    sfilter.rules.push({ field: "NOTIFICATIONCOUNT", op: "eq", data: 1 });
    $.ajax({
        url: getDomain() + "/Common/BindMastersDetails?ServiceName=ADMINNOTIFICATION_MASTER_GET&myfilters=" + JSON.stringify(sfilter),
        async: false,
        cache: false,
        success: function (data) {
            $("#AdminNotification").html("");
            var JsonObject = xml2json.parser(data);
            var list;
            list = JsonObject.serviceresponse.notificationlist.notificationdetail.totalrecords;
            $("#AdminNotification").html(list);
        },
        error: OnError
    });
}
function isNotEmpty(value) {
    return value !== undefined && value !== null && value !== "";
}
function GetOperationShortName(operation) {
    if (operation == "contains")
        return "cn";
    else if (operation == "=")
        return "eq";
    else if (operation == "<>")
        return "ne";
}
function imgError(image) {
    image.onerror = "";
    image.src = getDomain() + "/Content/images/upimg.png";
    if (image.parentElement.hasAttribute("data-fancybox")) {
        image.parentElement.href = getDomain() + "/Content/images/upimg.png";
    }
    return true;
}
function RegisterFileUploadWithCropper(btnId, CanvasId, CropPreviewId, CropperModalId) {
    $('#' + btnId).fileupload({
        url: getDomain() + '/Helpers/Handler/FileUploadHandler.ashx',
        add: function (e, data) {
            data.submit();
        },
        success: function (response, status) {
            //$("#CustomerimgCrop").cropper('clear');
            $('#' + CropperModalId).modal();
            $("#" + CanvasId).html('');
            $("#" + CropPreviewId).cropper("replace", response);
            $('#hdnCropperImgName').val($(this)[0].files[0].name);
        },
        error: OnError
    });
}
function htmlEncode(value) {
    return $('<div/>').text(value).html();
}
// To decode HTML text format tag to actual tag. like &lt; to <
function htmlDecode(value) {
    return $('<div/>').html(value).text();
}
function convertNumberToWords(amount) {
    var words = new Array();
    words[0] = '';
    words[1] = 'One';
    words[2] = 'Two';
    words[3] = 'Three';
    words[4] = 'Four';
    words[5] = 'Five';
    words[6] = 'Six';
    words[7] = 'Seven';
    words[8] = 'Eight';
    words[9] = 'Nine';
    words[10] = 'Ten';
    words[11] = 'Eleven';
    words[12] = 'Twelve';
    words[13] = 'Thirteen';
    words[14] = 'Fourteen';
    words[15] = 'Fifteen';
    words[16] = 'Sixteen';
    words[17] = 'Seventeen';
    words[18] = 'Eighteen';
    words[19] = 'Nineteen';
    words[20] = 'Twenty';
    words[30] = 'Thirty';
    words[40] = 'Forty';
    words[50] = 'Fifty';
    words[60] = 'Sixty';
    words[70] = 'Seventy';
    words[80] = 'Eighty';
    words[90] = 'Ninety';
    amount = amount.toString();
    var atemp = amount.split(".");
    var number = atemp[0].split(",").join("");
    var n_length = number.length;
    var words_string = "";
    if (n_length <= 9) {
        var n_array = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0);
        var received_n_array = new Array();
        for (var i = 0; i < n_length; i++) {
            received_n_array[i] = number.substr(i, 1);
        }
        for (var i = 9 - n_length, j = 0; i < 9; i++, j++) {
            n_array[i] = received_n_array[j];
        }
        for (var i = 0, j = 1; i < 9; i++, j++) {
            if (i == 0 || i == 2 || i == 4 || i == 7) {
                if (n_array[i] == 1) {
                    n_array[j] = 10 + parseInt(n_array[j]);
                    n_array[i] = 0;
                }
            }
        }
        value = "";
        for (var i = 0; i < 9; i++) {
            if (i == 0 || i == 2 || i == 4 || i == 7) {
                value = n_array[i] * 10;
            } else {
                value = n_array[i];
            }
            if (value != 0) {
                words_string += words[value] + " ";
            }
            if ((i == 1 && value != 0) || (i == 0 && value != 0 && n_array[i + 1] == 0)) {
                words_string += "Crores ";
            }
            if ((i == 3 && value != 0) || (i == 2 && value != 0 && n_array[i + 1] == 0)) {
                words_string += "Lakhs ";
            }
            if ((i == 5 && value != 0) || (i == 4 && value != 0 && n_array[i + 1] == 0)) {
                words_string += "Thousand ";
            }
            if (i == 6 && value != 0 && (n_array[i + 1] != 0 && n_array[i + 2] != 0)) {
                words_string += "Hundred and ";
            } else if (i == 6 && value != 0) {
                words_string += "Hundred ";
            }
        }
        words_string = words_string.split("  ").join(" ");
    }
    return words_string;
}
var DevExVariables = {
    GetDataList: function (loadOptions, url) {
        var result, parameters = [], myfilter = { rules: [] };
        var filterField, filterOp, filterData;

        if (isNotEmpty(loadOptions["take"])) {
            parameters.push("rows=" + loadOptions["take"]);
        }
        if (isNotEmpty(loadOptions["skip"])) {
            parameters.push("page=" + ((loadOptions["skip"] / loadOptions["take"]) + 1));
        }
        if (isNotEmpty(loadOptions["sort"])) {
            parameters.push("sidx=" + loadOptions["sort"][0].selector);
            parameters.push("sord=" + (loadOptions["sort"][0].desc ? "desc" : "asc"));
        }
        if (isNotEmpty(loadOptions["filter"])) {
            if (loadOptions["filter"].columnIndex >= 0) {
                filterField = loadOptions["filter"][0].toUpperCase();
                filterOp = GetOperationShortName(loadOptions["filter"][1]);
                filterData = loadOptions["filter"][2];
                myfilter.rules.push({ field: filterField, op: filterOp, data: filterData });
            }
            else {
                $.each(loadOptions["filter"], function (key, obj) {
                    if (obj.length && obj != "!") {
                        filterField = obj[0].toUpperCase();
                        filterOp = GetOperationShortName(obj[1]);
                        filterData = obj[2];
                        myfilter.rules.push({ field: filterField, op: filterOp, data: filterData });
                    }
                });
            }
        }

        $.ajax({
            url: getDomain() + url + "&" + parameters.join("&") + "&myfilters=" + JSON.stringify(myfilter),
            async: false,
            cache: false,
            type: 'POST',
            success: function (data) {
                if ($(data).find("RESPONSECODE").text() == 0) {
                    result = xml2json.parser(data);
                }
                else {
                    result = "Error";
                }
            },
            error: function () {
                result = "Error";
            }
        });

        return result;
    },

    Toaster: function (Type, Message) {
        DevExpress.ui.notify(Message, Type, 3000);
    },

    LabelTemplate: function (container, options) {
        var temp = "";
        if (options.value == 1 || options.value == true)
            temp = '<span class="label label-success" style="font-size: 100%; !important">Yes</span>';
        else
            temp = '<span class="label label-danger" style="font-size: 100%; !important">No</span>';

        $(temp).appendTo(container);
    },

    ActionTemplate: function (container, options, IsEdit, IsDelete, view, other ,VoucherType) {
        var temp = "";
        if (isU() && IsEdit)
            temp += '<span class="btn btn-primary" style="padding: 2px 6px !important;" title="Edit" onclick=\'' + view + '.triggerId("' + options.key + '");\'><i class="fa fa-pencil"></i></span>';

        if (isD() && IsDelete)
            temp += '<span class="btn btn-danger" style="padding: 2px 6px !important;margin-left:5px;" title="Delete" onclick=\'' + view + '.deleteRow("' + options.key + '");\'><i class="fa fa-trash-o"></i></span>';
       

        $(temp).appendTo(container);



        //if (isDW() && IsDownload)
        //    temp += '<span class="btn btn-info" style="padding: 2px 6px !important;margin-left:5px;" title="Download" onclick=\'' + view + '.downloadRow("' + options.key + '");\'><i class="fa fa-download"></i></span>';

        //if (isDW() && other) {
        //    if (other.indexOf("Attachments") >= 0)
        //        temp += '<span class="btn btn-success" style="padding: 2px 6px !important;margin-left:5px;" title="Attachments" onclick=\'' + view + '.viewAttachment("' + options.key + '");\'><i class="fa fa-paperclip"></i></span>';

        //    if (other.indexOf("Share") >= 0)
        //        temp += '<span class="btn btn-default" style="padding: 2px 6px !important;margin-left:5px;" title="Share" onclick=\'' + view + '.shareRow("' + options.key + '");\'><i class="fa fa-paper-plane-o"></i></span>';

        //    if (other.indexOf("Pdf") >= 0)
        //        temp += '<span class="btn btn-warning" style="padding: 2px 6px !important;margin-left:5px;" title="Pdf" onclick=\'' + view + '.downloadPDF("' + options.key + '");\'><i class="fa fa-file-pdf-o"></i></span>';

        //    if (other.indexOf("Xls") >= 0)
        //        temp += '<span class="btn btn-success" style="padding: 2px 6px !important;margin-left:5px;" title="Xls" onclick=\'' + view + '.downloadXLS("' + options.key + '");\'><i class="fa fa-file-excel-o"></i></span>';
        //} 

        //if (isDW() && other) {
        //    temp += '<div class="dropdown"><button type="button" class="btn btn-light" data-toggle="dropdown"><span class="bi bi-three-dots-vertical"></span></button>';
        //    temp += '<ul class="dropdown-menu" style="padding:4px 0px; min-width:auto;">';
        //    if (other.indexOf("Attachments") >= 0)
        //        temp += '<li><button type="button" class="btn btn-success" style="margin:2px 4px" title="Attachments" onclick=\'' + view + '.viewAttachment("' + options.key + '");\'><i class="fa fa-paperclip"></i></button></li>';
        //    if (other.indexOf("Share") >= 0)
        //        temp += '<li><button type="button" class="btn btn-default" style="margin:2px 4px" title="Share" onclick=\'' + view + '.shareRow("' + options.key + '");\'><i class="fa fa-paper-plane-o"></i></button></li>';
        //    if (other.indexOf("Pdf") >= 0)
        //        temp += '<li><button type="button" class="btn btn-warning" style="margin:2px 4px" title="Pdf" onclick=\'' + view + '.downloadPDF("' + options.key + '");\'><i class="fa fa-file-pdf-o"></i></button></li>';
        //    if (other.indexOf("Xls") >= 0)
        //        temp += '<li><button type="button" class="btn btn-success" style="margin:2px 4px" title="Xls" onclick=\'' + view + '.downloadXLS("' + options.key + '");\'><i class="fa fa-file-excel-o"></i></button></li>';
        //    temp += '</ul>';
        //    temp += '</div>';
        //}

        if (isDW() && other) {
            $("<div style='margin-left: 5px; display: inline-block; width: 26px;'>").dxToolbar({
                items: [
                    {
                        locateInMenu: 'always',
                        widget: 'dxButton',
                        options: {
                            text: 'Attachments',
                            icon: "link",
                            visible: other.indexOf("Attachments") >= 0 ? true : false
                        },
                        onClick: function () {
                            viewAttachment(options.key);
                        }
                    },
                    {
                        locateInMenu: 'always',
                        widget: 'dxButton',
                        options: {
                            text: 'Share',
                            icon: "share",
                            visible: other.indexOf("Share") >= 0 ? true : false
                        },
                        onClick: function () {
                            VoucherShare(options.key);
                        }
                    },
                    {
                        locateInMenu: 'always',
                        widget: 'dxButton',
                        options: {
                            text: 'PDF',
                            icon: "pdffile",
                            visible: other.indexOf("Pdf") >= 0 ? true : false
                        },
                        onClick: function () {
                            DevExVariables.downloadPDF(options.key, VoucherType);
                        }
                    },
                    {
                        locateInMenu: 'always',
                        widget: 'dxButton',
                        options: {
                            text: 'Excel',
                            icon: "xlsfile",
                            visible: other.indexOf("Xls") >= 0 ? true : false
                        },
                        onClick: function () {

                        }
                    }
                ]
            }).appendTo(container);
        }
    },

    //ActionSubTemplate: function (container, options, IsEdit, IsDelete, IsDownload, view) {
    //    var temp = "";
    //    if (isU() && IsEdit)
    //        temp += '<span class="btn btn-primary" style="padding: 2px 6px;" onclick=\'' + view + '.SubtriggerId("' + options + '");\'><i class="fa fa-save"></i></span>';

    //    if (isD() && IsDelete)
    //        temp += '<span class="btn btn-danger" style="padding: 2px 6px;margin-left:5px;" onclick=\'' + view + '.SubdeleteRow("' + options + '");\'><i class="fa fa-trash-o"></i></span>';

    //    if (isDW() && IsDownload)
    //        temp += '<span class="btn btn-info" style="padding: 2px 6px;margin-left:5px;" onclick=\'' + view + '.SubdownloadRow("' + options + '");\'><i class="fa fa-download"></i></span>';

    //    $(temp).appendTo(container);
    //},

    RemoveClosestRow: function (obj) {
        $(obj).closest("tr").remove();
    },

    InvalidResponseCode: function (data) {
        var code = $(data).find('RESPONSECODE').text();
        var msg = '';

        if (code == "-405") {
            window.location.href = getDomain() + "/Login/LogOut?code=-405";
        }
        else if (code == "-406") {
            window.location.href = getDomain() + "/Login/LogOut";
        }
        else if (code != "0") {
            msg = "Response Code: " + code;
            msg += "    Response Message:" + $(data).find('RESPONSEMESSAGE').text();

            DevExVariables.Toaster('error', msg);
        }
    },

    downloadPDF: function (id,VoucherType) {
        $.ajax({
            type: 'POST',
            async: false,
            cache: false,
            url: getDomain() + "/Sharing/VoucherPrintGet",
            data: {
                VoucherId: id,
                VoucherType: VoucherType,
            },
            success: function (result) {

                return "sucess";
            },
            error: OnError
        });
   }
    
}
$(window).keydown(function (event) {
    if (event.which === 13) {
        if (event.shiftKey) {
            $.tabPrev();
        }
        else {
            $.tabNext();
        }

        return false;
    }
});