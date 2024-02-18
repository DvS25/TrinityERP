using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Addressbook.Models;

namespace Addressbook.CommonClasses
{
    public class SessionFacade
    {
        private const string UserDetails = "UserDetails";
        private const string PagePermissionlist = "PagePermissionlist";
        private const string MenuStr = "MenuStr";
        private const string MenuStrOld = "MenuStrOld";
        private const string BranchStr = "BranchStr";
        private const string ModuleName = "ModuleName";
        public static UserDetails UserSession
        {
            get
            {
                return (UserDetails)HttpContext.Current.Session[UserDetails];
            }
            set
            {
                HttpContext.Current.Session[UserDetails] = value;
            }
        }

        public static List<PagePermission> PagePermission
        {
            get
            {
                return (List<PagePermission>)HttpContext.Current.Session[PagePermissionlist];
            }
            set
            {
                HttpContext.Current.Session[PagePermissionlist] = value;
            }
        }

        public static string MenuListstr
        {
            get
            {
                return (string)HttpContext.Current.Session[MenuStr];
            }
            set
            {
                HttpContext.Current.Session[MenuStr] = value;
            }
        }

        public static string MenuListstrOld
        {
            get
            {
                return (string)HttpContext.Current.Session[MenuStrOld];
            }
            set
            {
                HttpContext.Current.Session[MenuStrOld] = value;
            }
        }

        public static string BranchListstr
        {
            get
            {
                return (string)HttpContext.Current.Session[BranchStr];
            }
            set
            {
                HttpContext.Current.Session[BranchStr] = value;
            }
        }

        public static string SelectedModuleName
        {
            get
            {
                return (string)HttpContext.Current.Session[ModuleName];
            }
            set
            {
                HttpContext.Current.Session[ModuleName] = value;
            }
        }
    }
}