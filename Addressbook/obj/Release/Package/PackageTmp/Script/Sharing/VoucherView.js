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
                        success: VoucherView.btnMasterSubmitOnSuccess,
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

    btnMasterSubmitOnSuccess: function (data) {
        if ($(data).find('RESPONSECODE').text() == "0") {
            $('#signatureparent').modal('hide');
        }
        //else {
        //    //DevExVariables.InvalidResponseCode(data);
        //}
    },
};

$(document).ready(function () {

    $('#Sign_Model').click(function () {
        $('#signatureparent').modal('show');
    });

    $('#cancleModelButton').click(function () {
        $('#signatureparent').modal('hide');
    });

    $("#signature").jSignature({
        color: "#000",
        lineWidth: 1,
        width: 300,
        height: 100,
    });


    $('#ResetButtonforModel').click(function () {
        $("#signature").jSignature('reset');
    });

    $('#SaveModelButton').click(function () {
        $("#signature").jSignature('getData', 'default');
        VoucherView.btnMasterSubmit();
    });
});