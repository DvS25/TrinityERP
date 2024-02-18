using Addressbook.CommonClasses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Addressbook.Controllers
{
    public class OutletController : Controller
    {
        // GET: Outlet
        public ActionResult OutletEntry()
        {
            return View(FormPermissionHelper.GetFormPermission("OutletEntry", "Outlet"));
        }
        public ActionResult HeadMas()
        {
            return View(FormPermissionHelper.GetFormPermission("HeadMas", "Outlet"));
        }
        public ActionResult AccountYearMaster()
        {
            return View(FormPermissionHelper.GetFormPermission("AccountYearMaster", "Outlet"));
        }
    }
}