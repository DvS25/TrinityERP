using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Addressbook.Models;
using Addressbook.CommonClasses;
using Addressbook.ServiceReference1;
using System.Xml;
using System.IO;
using System.Data;
using System.Text;
using System.Data.OleDb;
using System.Data.SqlClient;
using System.Configuration;
using System.Net.Mail;
using System.Net;
using Addressbook.Filters;

namespace Addressbook.Controllers
{
    [SessionExpireFilterAttribute]

    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View(FormPermissionHelper.GetFormPermission("Index", "Home"));
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";
            return View();
        }
        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";
            return View();
        }


    }
}