var VoucherView = {
    variables: {
        PerformMasterOperationUrl: "/Sharing/OpeartionsOnMaster?ServiceName=ACC_VOUCHER_SIGNATURE_CRUD",
    },

    savedata: function (data) {

        $.ajax({
            type: 'POST',
            async: false,
            cache: false,
            url: getDomain() + "/Sharing/SaveVoucherSignature",
            data: {
                VoucherId: $("#hdnVoucherId").val(),
                VoucherType: $("#hdnVoucherType").val(),
                base64String: $("#signature").jSignature('getData', 'default').replace("data:image/png;base64,", "")
            },
            success: function (result) {
                if ("success") {


                    $.ajax({
                        url: getDomain() + VoucherView.variables.PerformMasterOperationUrl,
                        data: data,
                        async: true,
                        cache: false,
                        type: 'POST',
                        beforeSend: function () {
                            dx_LoaderTrinity.show();
                        },
                        complete: function () {
                            dx_LoaderTrinity.hide();
                        },
                        success: function () {
                            $("#signaturemodal").modal('hide');
                            location.reload(true);
                        },
                        error: OnError,
                    });
                }
                else {
                    return;
                }

            },
            error: OnError
        });

    },

    btnMasterSubmit: function () {

        var data = {
            "VOUCHERID": $("#hdnVoucherId").val(),
            "VOUCHERTYPE": $("#hdnVoucherType").val(),
        }
        VoucherView.savedata(data);
    },

};

$(document).ready(function () {

    $('#Sign_Model').click(function () {
        $('#signaturemodal').modal('show');
    });

    $('#cancleModelButton').click(function () {
        $('#signaturemodal').modal('hide');
    });


    $('#signaturemodal').on('show.bs.modal', function () {
        $("#signature").jSignature({
            color: "#000",
            lineWidth: 2,
            width: 300,
            height: 150,
            "background-color": "#fff"
        });
    });

    $('#ResetButtonforModel').click(function () {
        $("#signature").jSignature('reset');
    });

    $('#SaveModelButton').click(function () {
        $("#signature").jSignature('getData', 'default');

        if ($("#signature").jSignature('getData', 'default') == 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASoAAABiCAYAAADnRp6aAAAAAXNSR0IArs4c6QAAAuZJREFUeF7t1EENAAAMArHh3/Rs3KNTQMrCzhEgQCAusHg+8QgQIHCGyhMQIJAXMFT5igQkQMBQ+QECBPIChipfkYAECBgqP0CAQF7AUOUrEpAAAUPlBwgQyAsYqnxFAhIgYKj8AAECeQFDla9IQAIEDJUfIEAgL2Co8hUJSICAofIDBAjkBQxVviIBCRAwVH6AAIG8gKHKVyQgAQKGyg8QIJAXMFT5igQkQMBQ+QECBPIChipfkYAECBgqP0CAQF7AUOUrEpAAAUPlBwgQyAsYqnxFAhIgYKj8AAECeQFDla9IQAIEDJUfIEAgL2Co8hUJSICAofIDBAjkBQxVviIBCRAwVH6AAIG8gKHKVyQgAQKGyg8QIJAXMFT5igQkQMBQ+QECBPIChipfkYAECBgqP0CAQF7AUOUrEpAAAUPlBwgQyAsYqnxFAhIgYKj8AAECeQFDla9IQAIEDJUfIEAgL2Co8hUJSICAofIDBAjkBQxVviIBCRAwVH6AAIG8gKHKVyQgAQKGyg8QIJAXMFT5igQkQMBQ+QECBPIChipfkYAECBgqP0CAQF7AUOUrEpAAAUPlBwgQyAsYqnxFAhIgYKj8AAECeQFDla9IQAIEDJUfIEAgL2Co8hUJSICAofIDBAjkBQxVviIBCRAwVH6AAIG8gKHKVyQgAQKGyg8QIJAXMFT5igQkQMBQ+QECBPIChipfkYAECBgqP0CAQF7AUOUrEpAAAUPlBwgQyAsYqnxFAhIgYKj8AAECeQFDla9IQAIEDJUfIEAgL2Co8hUJSICAofIDBAjkBQxVviIBCRAwVH6AAIG8gKHKVyQgAQKGyg8QIJAXMFT5igQkQMBQ+QECBPIChipfkYAECBgqP0CAQF7AUOUrEpAAAUPlBwgQyAsYqnxFAhIgYKj8AAECeQFDla9IQAIEDJUfIEAgL2Co8hUJSICAofIDBAjkBQxVviIBCRAwVH6AAIG8gKHKVyQgAQIPHGMAY5RpQogAAAAASUVORK5CYII=') {
            return;
        } else {
            VoucherView.btnMasterSubmit();
        }
    });

    $('#SharedBY').hide();

    $.ajax({
        type: 'POST',
        async: false,
        cache: false,
        url: getDomain() + "/Sharing/VoucherPrintGet",
        data: {
            VoucherId: $("#hdnVoucherId").val(),
            VoucherType: $("#hdnVoucherType").val(),
        },
        success: function (result) {
            if (result.indexOf('Error') > -1) {
                alert('Please Check VoucherID And VoucherType.');
            }
            else {
            $("#ReportPDF").attr("src", getDomain() + result + "?Code=" + Math.random());
            }
        },
        error: OnError
    });

});
