$(document).ready(function () {
    $("#ChangePasswordModel").click(function () {
        $("#modal_ChangePasswoprd").modal("show");
    });
    $("#btnChangePassword").click(function () {
        AccChangePasswordView.btnMasterSubmit();
    });
});


var AccChangePasswordView = { 
    variables: {
        PerformMasterOperationUrl: "/Common/OpeartionsOnMaster?ServiceName=ACC_Change_Password_CRUD",
    },

    btnMasterSubmit: function () {
        var valid = $("#ChangePasswordForm").valid();
        if (!valid)
            return;

        var newpassword = $("#newpass").val();
        var confirmpassword = $("#confirmpass").val();
        if (newpassword != confirmpassword) {
            DevExVariables.Toaster("warning", "New Password and Confirm Password does not match!");
            return;
        }
        
        var data = {
            "Oper": "edit",
            "OLDPASSWORD": $("#currentpass").val(),
            "NEWPASSWORD": $("#newpass").val(),
        }
        AccChangePasswordView.savedata(data);
    },

    savedata: function (data) {
        $.ajax({
            url: getDomain() + AccChangePasswordView.variables.PerformMasterOperationUrl,
            async: false,
            cache: false,
            type: 'POST',
            data:data,
            success: AccChangePasswordView.btnMasterSubmitOnSuccess,
            error:OnError,
        })
    },

    btnMasterSubmitOnSuccess: function (data) {
        if ($(data).find('RESPONSECODE').text() == 0) {
            DevExVariables.Toaster("success", $(data).find('RESPONSEMASSAGE').text());

            window.location.replace(getDomain() + "/login/LogOut");
        }
        else {
            DevExVariables.InvalidResponseCode(data);
        }
    },
}