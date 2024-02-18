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

    public class SalesController : Controller
    {
        // GET: Sales
        public ActionResult PartyList()
        {
            return View(FormPermissionHelper.GetFormPermission("PartyList", "Sales"));
        }
       
        public ActionResult PartyStock()
        {
            return View(FormPermissionHelper.GetFormPermission("PartyStock", "Sales"));
        }
        public ActionResult QuotationList()
        {
            return View(FormPermissionHelper.GetFormPermission("QuotationList", "Sales"));
        }
        public ActionResult Feedback()
        {
            return View(FormPermissionHelper.GetFormPermission("Feedback", "Sales"));
        }


    }
}