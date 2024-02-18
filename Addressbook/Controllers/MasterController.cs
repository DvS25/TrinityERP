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
    public class MasterController : Controller
    {
        // GET: Master
        public ActionResult CustomerGroup()
        {
            return View(FormPermissionHelper.GetFormPermission("CustomerGroup", "Master"));
        }
        public ActionResult CountryCityState()
        {
            return View(FormPermissionHelper.GetFormPermission("CountryCityState", "Master"));
        }
        public ActionResult EmailServer()
        {
            return View(FormPermissionHelper.GetFormPermission("EmailServer", "Master"));
        }
        public ActionResult CompanyMaster()
        {
            return View(FormPermissionHelper.GetFormPermission("CompanyMaster", "Master"));
        }
        public ActionResult CompanyBranch_Master()
        {
            return View(FormPermissionHelper.GetFormPermission("CompanyBranch_Master", "Master"));
        }
        public ActionResult ItemMaster()
        {
            return View(FormPermissionHelper.GetFormPermission("ItemMaster", "Master"));
        }
        public ActionResult TaxMaster()
        {
            return View(FormPermissionHelper.GetFormPermission("TaxMaster", "Master"));
        }
        public ActionResult RmCodeMaster()
        {
            return View(FormPermissionHelper.GetFormPermission("RmCodeMaster", "Master"));
        }
        public ActionResult RmCateMaster()
        {
            return View(FormPermissionHelper.GetFormPermission("RmCateMaster", "Master"));
        }
        public ActionResult RmSubCateMaster()
        {
            return View(FormPermissionHelper.GetFormPermission("RmSubCateMaster", "Master"));
        }
        public ActionResult RMShapeMaster()
        {
            return View(FormPermissionHelper.GetFormPermission("RMShapeMaster", "Master"));
        }
        public ActionResult RMCutMaster()
        {
            return View(FormPermissionHelper.GetFormPermission("RMCutMaster", "Master"));
        }
        public ActionResult RMColorMaster()
        {
            return View(FormPermissionHelper.GetFormPermission("RMColorMaster", "Master"));
        }
        public ActionResult RMPurityMaster()
        {
            return View(FormPermissionHelper.GetFormPermission("RMPurityMaster", "Master"));
        }
        public ActionResult LockerMaster()
        {
            return View(FormPermissionHelper.GetFormPermission("LockerMaster", "Master"));
        }
        public ActionResult DesgCateMaster()
        {
            return View(FormPermissionHelper.GetFormPermission("DesgCateMaster", "Master"));
        }

        public ActionResult DesgSubCateMaster()
        {
            return View(FormPermissionHelper.GetFormPermission("DesgSubCateMaster", "Master"));
        }

        public ActionResult AccHeadMaster()
        {
            return View(FormPermissionHelper.GetFormPermission("AccHeadMaster", "Master"));
        }

        public ActionResult AccSubHeadMaster()
        {
            return View(FormPermissionHelper.GetFormPermission("AccSubHeadMaster", "Master"));
        }
        public ActionResult MaterialPriceMaster()
        {
            return View(FormPermissionHelper.GetFormPermission("MaterialPriceMaster", "Master"));
        }
        public ActionResult LabourPriceMaster()
        {
            return View(FormPermissionHelper.GetFormPermission("LabourPriceMaster", "Master"));
        }
    }
}