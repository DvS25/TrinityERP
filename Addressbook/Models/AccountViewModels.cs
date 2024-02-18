using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Addressbook.Models
{
    public class ExternalLoginConfirmationViewModel
    {
        [Required]
        [Display(Name = "Email")]
        public string Email { get; set; }
    }

    public class ExternalLoginListViewModel
    {
        public string ReturnUrl { get; set; }
    }

    public class SendCodeViewModel
    {
        public string SelectedProvider { get; set; }
        public ICollection<System.Web.Mvc.SelectListItem> Providers { get; set; }
        public string ReturnUrl { get; set; }
        public bool RememberMe { get; set; }
    }

    public class VerifyCodeViewModel
    {
        [Required]
        public string Provider { get; set; }

        [Required]
        [Display(Name = "Code")]
        public string Code { get; set; }
        public string ReturnUrl { get; set; }

        [Display(Name = "Remember this browser?")]
        public bool RememberBrowser { get; set; }

        public bool RememberMe { get; set; }
    }

    public class ForgotViewModel
    {
        [Required]
        [Display(Name = "Email")]
        public string Email { get; set; }
    }

    public class LoginViewModel
    {
        [Required]
        [Display(Name = "Email")]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [DataType(DataType.Password)]
        [Display(Name = "Password")]
        public string Password { get; set; }

        
        //[Display(Name = "UserType")]
        //public string UserType { get; set; }

        [Display(Name = "Remember me?")]
        public bool RememberMe { get; set; }
    }
    public class UserDetails
    {
        public string BRANCHWISESTATEID { get; set; }
        public string BRANCHWISESTATENAME { get; set; }

        public int USERID { get; set; }
        public string EMAIL { get; set; }
        public string PASSWORD { get; set; }
        public string EMPLOYEE_NAME { get; set; }
        public string USERNAME { get; set; }
        public bool ISADMIN { get; set; }
        public int ISALLOWEDVERIFY { get; set; }
        public bool ISLOGIN { get; set; }
        public string ISVIEW { get; set; }
        public string IPINDIVISUAL { get; set; }
        public string IPTO { get; set; }
        public string IPFROM { get; set; }
        public string USERTYPE { get; set; }
        public string TOKEN { get; set; }
        public int ACCOUNTYEARID { get; set; }        
        public int EMPBRANCHID { get; set; }        
        public string PUBLICIP { get; set; }
        public string EMPBRANCHNAME { get; set; }        
        public int COMPANYID { get; set; }        
        public string COUNTRYNAME { get; set; }
        public string FLAGIMG { get; set; }
        public string CURRENCYCODE { get; set; }
        public string LANGUAGE { get; set; }
    }
    //public class MenuDetails
    //{
    //    public int MODULEID { get; set; }
    //    public string MODULETEXT { get; set; }
    //}

    public class PagePermission
    {
        public int LOGINID { get; set; }
        public int ID { get; set; }
        public string MODULE { get; set; }
        public string MODULEICON { get; set; }
        public string SUBMODULE { get; set; }
        public string SUBMODULEICON { get; set; }
        public string NAME { get; set; }       
        public string ICON { get; set; }
        public string CONTROLLER { get; set; }
        public string ACTION { get; set; }
        public int ISVIEW { get; set; }
        public int ISADD { get; set; }
        public int ISUPDATE { get; set; }
        public int ALLOWDAYS { get; set; }
        public int ISDELETE { get; set; }
        public int AUTHORIZE { get; set; }
     
        public int ISDOWNLOAD { get; set; }

        
    }

    public class RegisterViewModel
    {
        [Required]
        [EmailAddress]
        [Display(Name = "Email")]
        public string Email { get; set; }

        [Required]
        [StringLength(100, ErrorMessage = "The {0} must be at least {2} characters long.", MinimumLength = 6)]
        [DataType(DataType.Password)]
        [Display(Name = "Password")]
        public string Password { get; set; }

        [DataType(DataType.Password)]
        [Display(Name = "Confirm password")]
        [Compare("Password", ErrorMessage = "The password and confirmation password do not match.")]
        public string ConfirmPassword { get; set; }
    }

    public class ResetPasswordViewModel
    {
        [Required]
        [EmailAddress]
        [Display(Name = "Email")]
        public string Email { get; set; }

        [Required]
        [StringLength(100, ErrorMessage = "The {0} must be at least {2} characters long.", MinimumLength = 6)]
        [DataType(DataType.Password)]
        [Display(Name = "Password")]
        public string Password { get; set; }

        [DataType(DataType.Password)]
        [Display(Name = "Confirm password")]
        [Compare("Password", ErrorMessage = "The password and confirmation password do not match.")]
        public string ConfirmPassword { get; set; }

        public string Code { get; set; }
    }

    public class ForgotPasswordViewModel
    {
        [Required]
        [EmailAddress]
        [Display(Name = "Email")]
        public string Email { get; set; }
    }

    //public class ImportData
    //{
    //    public string FILEPATH { get; set; }
    //    public string B_FULLNAME { get; set; }
    //    public string B_NICKNAME { get; set; }
    //    public string GROUPNAME { get; set; }
    //    public string B_BIRTHDATE { get; set; }
    //    public string B_ANRY_DATE { get; set; }
    //    public string B_MOBILE_NO_1 { get; set; }
    //    public string B_MOBILE_NO_2 { get; set; }
    //    public string B_EMAIL_1 { get; set; }
    //    public string B_EMAIL_2 { get; set; }
    //    public string H_ADDRESS { get; set; }
    //    public string H_TELEPHONE_1 { get; set; }
    //    public string H_TELEPHONE_2 { get; set; }
    //    public string H_MOBILE_1 { get; set; }
    //    public string H_MOBILE_2 { get; set; }
    //    public string H_ZIPCODE { get; set; }
    //    public string H_CITYNAME { get; set; }
    //    public string H_STATENAME { get; set; }
    //    public string H_COUNTRYNAME { get; set; }
    //    public string O_COMPNYNAME { get; set; }
    //    public string O_ADDRESS { get; set; }
    //    public string O_TELEPHONE_1 { get; set; }
    //    public string O_TELEPHONE_2 { get; set; }
    //    public string O_FAX { get; set; }
    //    public string O_MOBILE { get; set; }
    //    public string O_POST { get; set; }
    //    public string O_EMAIL { get; set; }
    //    public string O_CONTACT_PERSON { get; set; }
    //    public string O_DEPARTMENT { get; set; }
    //    public string O_CP_MO1 { get; set; }
    //    public string O_CP_MO2 { get; set; }
    //    public string O_ZipCode { get; set; }
    //    public string O_CITYNAME { get; set; }
    //    public string O_STATENAME { get; set; }
    //    public string O_COUNTRYNAME { get; set; }
    //}
}
