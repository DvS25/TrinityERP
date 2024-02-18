$(document).ready(function () {
    $("#OTPLink").click(function () {
        AccForgotPasswordView.SendOTP();
    });

    $("#btnOTP").click(function () {
        AccForgotPasswordView.btnMasterSubmitOTP();
    });

    $("#btnForgotPassword").click(function () {
        AccForgotPasswordView.btnMasterSubmitPassword();
    });
})

var AccForgotPasswordView = {
    variables: {
        SendOTPUrl: "/Login/ForgetPasswordOTP",
        VerifyOTPUrl: "/Login/VerifyOTP",
        ResetPasswordUrl: "/Login/ResetPassword",
    },

    SendOTP: function (data) {
        $.ajax({
            url: getDomain() + AccForgotPasswordView.variables.SendOTPUrl + "?USERNAME=" + $("#Email").val(),
            async: false,
            cache: false,
            type: 'POST',
            data: data,
            success: function (data) {
                if ($(data).find("RESPONSECODE").text() == "0") {
                    $("#errormsgotp").html("Please check your Mail for OTP.");
                        $("#otpPanel").show();
                        $("#loginPanel").hide();
                        $("#forgotPasswordPanel").hide();
                }
                else {
                    $("#errormsg").html($(data).find("RESPONSEMESSAGE").text());
                }
            },
            error: function (ex) {
                $("#errormsg").html(ex);
            }
        });
    },

    btnMasterSubmitOTP: function () {
        $.ajax({
            url: getDomain() + AccForgotPasswordView.variables.VerifyOTPUrl + "?RESETPASSWORDOTP=" + $("#otp").val() + "&USERNAME=" + $("#Email").val(),
            async: false,
            cache: false,
            type: 'POST',
            success: function (data) {
                if ($(data).find("RESPONSECODE").text() == "0") {
                    $("#forgotPasswordPanel").show();
                    $("#otpPanel").hide();
                    $("#loginPanel").hide();
                }
                else {
                    $("#errormsgotp").html($(data).find("RESPONSEMESSAGE").text());
                }
            },
            error: function (ex) {
                $("#errormsgotp").html(ex);
            }
        });
    },

    btnMasterSubmitPassword: function () {
        var newpassword = $("#newpass").val();
        var confirmpassword = $("#confirmpass").val();
        if (newpassword != confirmpassword) {
            $("#errormsgpassword").html("New Password and Confirm Password does not match!");
            return;
        }

        $.ajax({
            url: getDomain() + AccForgotPasswordView.variables.ResetPasswordUrl + "?NEWPASSWORD=" + $("#newpass").val() + "&USERNAME=" + $("#Email").val(),
            async: false,
            cache: false,
            type: 'POST',
            success: function (data) {
                if ($(data).find("RESPONSECODE").text() == "0") {
                    $("#errormsg").html("Password updated successfully.");
                    $("#forgotPasswordPanel").hide();
                    $("#otpPanel").hide();
                    $("#loginPanel").show();
                }
                else {
                    $("#errormsgpassword").html($(data).find("RESPONSEMESSAGE").text());
                }
            },
            error: function (ex) {
                $("#errormsgpassword").html(ex);
            }
        })
    },
}