using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Addressbook.CommonClasses;
using Addressbook.Filters;

namespace Addressbook.Controllers
{
    [SessionExpireFilterAttribute]
    [AuthorizeUserAttribute]

    public class AppManagementController : Controller
    {
        public ActionResult Setting()
        {
            return View(FormPermissionHelper.GetFormPermission("Setting", "AppManagement"));           
        }
        public ActionResult WomansCollections()
        {
            return View(FormPermissionHelper.GetFormPermission("WomansCollections", "AppManagement"));
        }
        public ActionResult UserActivity()
        {
            return View(FormPermissionHelper.GetFormPermission("UserActivity", "AppManagement"));
        }
        //public ActionResult HomeBottomSlider()
        //{
        //    return View(FormPermissionHelper.GetFormPermission("HomeBottomSlider", "AppManagement"));
        //}
        public ActionResult LetterTemplate()
        {
            return View(FormPermissionHelper.GetFormPermission("LetterTemplate", "AppManagement"));
        }
        public ActionResult SubCategory()
        {
            return View(FormPermissionHelper.GetFormPermission("SubCategory", "AppManagement"));
        }
        public ActionResult ContactUs()
        {
            return View(FormPermissionHelper.GetFormPermission("ContactUs", "AppManagement"));
        }
        public ActionResult Analysis()
        {
            ViewBag.PageType = "B2B";
            return View(FormPermissionHelper.GetFormPermission("Analysis", "AppManagement"));
        }
    }
}