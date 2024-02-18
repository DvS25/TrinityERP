using Addressbook.CommonClasses;
using Addressbook.Models;
using Addressbook.ServiceReference1;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Text.RegularExpressions;
using System.Web;
using System.Web.Mvc;
using System.Xml;

namespace Addressbook.Controllers
{
    public class LoginController : Controller
    {
        // GET: Login
        public ActionResult Login(String msg)
        {
            ViewBag.Message = msg;
            return View();
        }
        public ActionResult LogOut()
        {
            SessionFacade.UserSession = null;
            return RedirectToAction("Login", "Login", new { Msg = "You logged out successfully." });
        }

        public ActionResult DoLogin(LoginViewModel model, string returnUrl)
        {
            try
            {
                string XMLValue = string.Empty;
                string XMLMenuValue = string.Empty;
                string DecryptPass = string.Empty;

                string publicip = GetClientIpAddress();

                if (publicip == "::1")
                {
                    publicip = GetLocalIPAddress();
                }

                PerformCrudOperations performOper = new PerformCrudOperations();
                XMLValue = "<SERVICEREQUEST><SERVICENAME>LOGIN_AUTHENTICATION</SERVICENAME>" +
                            "<EMAIL>" + model.Email + "</EMAIL>" +
                            "<USERNAME>" + model.Email + "</USERNAME>" +
                            "<USERTYPE>SalesExecutive</USERTYPE>" +
                            "<LOGINIPADDRESS>" + publicip + "</LOGINIPADDRESS>" +
                            "<PASSWORD>" + model.Password + "</PASSWORD>" +
                            "</SERVICEREQUEST>";

                ContactBook_InterfaceClient proxy = new ContactBook_InterfaceClient();
                XMLValue = proxy.PERFORM_ACTIONS(XMLValue);
                XmlDocument doc = new XmlDocument();
                doc.LoadXml(XMLValue);

                if (doc.SelectSingleNode("SERVICERESPONSE//RESPONSECODE").InnerText == "0") // USER AUTHENTICATION OK
                {
                    UserDetails objUser = new UserDetails();
                    objUser.USERID = Convert.ToInt32(doc.SelectSingleNode("SERVICERESPONSE//DETAILSLIST//DETAILS//USERID").InnerText);
                    objUser.EMAIL = doc.SelectSingleNode("SERVICERESPONSE//DETAILSLIST//DETAILS//EMAIL").InnerText;
                    objUser.PASSWORD = doc.SelectSingleNode("SERVICERESPONSE//DETAILSLIST//DETAILS//PASSWORD").InnerText;
                    objUser.EMPLOYEE_NAME = doc.SelectSingleNode("SERVICERESPONSE//DETAILSLIST//DETAILS//EMPLOYEE_NAME").InnerText;
                    objUser.USERNAME = doc.SelectSingleNode("SERVICERESPONSE//DETAILSLIST//DETAILS//USERNAME").InnerText;
                    objUser.ISADMIN = doc.SelectSingleNode("SERVICERESPONSE//DETAILSLIST//DETAILS//ISADMIN").InnerText.Equals("1") ? true : false;
                    objUser.ISALLOWEDVERIFY = Convert.ToInt32(doc.SelectSingleNode("SERVICERESPONSE//DETAILSLIST//DETAILS//ISALLOWEDVERIFY").InnerText);
                    objUser.USERTYPE = "SalesExecutive";
                    objUser.TOKEN = doc.SelectSingleNode("SERVICERESPONSE//DETAILSLIST//DETAILS//TOKEN").InnerText;
                    objUser.ISLOGIN = true;
                    objUser.BRANCHWISESTATENAME = doc.SelectSingleNode("SERVICERESPONSE//DETAILSLIST//DETAILS//STATENAME").InnerText;
                    objUser.BRANCHWISESTATEID = doc.SelectSingleNode("SERVICERESPONSE//DETAILSLIST//DETAILS//STATEID").InnerText;
                    if (doc.SelectSingleNode("SERVICERESPONSE//DETAILSLIST//DETAILS//ACCOUNTYEARID") != null)
                    {
                        if (Convert.ToInt32(doc.SelectSingleNode("SERVICERESPONSE//DETAILSLIST//DETAILS//ACCOUNTYEARID").InnerText) > 0)
                        {
                            objUser.ACCOUNTYEARID = Convert.ToInt32(doc.SelectSingleNode("SERVICERESPONSE//DETAILSLIST//DETAILS//ACCOUNTYEARID").InnerText);
                        }
                    }
                    if (doc.SelectSingleNode("SERVICERESPONSE//DETAILSLIST//DETAILS//BRANCHID") != null)
                    {
                        if (Convert.ToInt32(doc.SelectSingleNode("SERVICERESPONSE//DETAILSLIST//DETAILS//BRANCHID").InnerText) > 0)
                        {
                            objUser.EMPBRANCHID = Convert.ToInt32(doc.SelectSingleNode("SERVICERESPONSE//DETAILSLIST//DETAILS//BRANCHID").InnerText);
                            objUser.EMPBRANCHNAME = doc.SelectSingleNode("SERVICERESPONSE//DETAILSLIST//DETAILS//BRANCHNAME").InnerText;
                            objUser.COUNTRYNAME = doc.SelectSingleNode("SERVICERESPONSE//DETAILSLIST//DETAILS//COUNTRYNAME").InnerText;
                            objUser.FLAGIMG = doc.SelectSingleNode("SERVICERESPONSE//DETAILSLIST//DETAILS//FLAGIMG").InnerText;
                            objUser.CURRENCYCODE = doc.SelectSingleNode("SERVICERESPONSE//DETAILSLIST//DETAILS//CURRENCYCODE").InnerText;
                            objUser.LANGUAGE = doc.SelectSingleNode("SERVICERESPONSE//DETAILSLIST//DETAILS//LANGUAGE").InnerText;
                        }
                    }
                    if (doc.SelectSingleNode("SERVICERESPONSE//DETAILSLIST//DETAILS//COMPANYID") != null)
                    {
                        if (Convert.ToInt32(doc.SelectSingleNode("SERVICERESPONSE//DETAILSLIST//DETAILS//COMPANYID").InnerText) > 0)
                        {
                            objUser.COMPANYID = Convert.ToInt32(doc.SelectSingleNode("SERVICERESPONSE//DETAILSLIST//DETAILS//COMPANYID").InnerText);
                        }
                    }

                    if (objUser.ISADMIN == true)
                    {
                        objUser.ISVIEW = "0";
                    }
                    else
                    {
                        objUser.ISVIEW = "1";
                    }

                    SessionFacade.UserSession = objUser;

                    /*--Geting page permision and setting it to PagePermissionList and create dynamic menu------------------------------------*/
                    List<PagePermission> Pagelist = new List<PagePermission>();
                    StringBuilder ModuleStr = new StringBuilder("");
                    StringBuilder ModuleStrOld = new StringBuilder("");
                    StringBuilder BranchStr = new StringBuilder("");
                    XmlDocument xd = new XmlDocument();
                    XmlNodeList xmlNodeList;
                    string DomainPath = System.Configuration.ConfigurationManager.AppSettings["domainPath"];

                    XmlNodeList module_nodes = doc.SelectNodes("SERVICERESPONSE//MODULELIST//MODULE");

                    if (module_nodes.Count > 0)
                    {
                        ModuleStrOld.Append("<ul class='nav navbar-nav' style='margin-left:100px'><li><a href='" + DomainPath + "/Home/Index'><i class='fa fa-home'></i>  Home</a></li>");

                        ModuleStr.Append("<ul class='nav navbar-nav'><li><a id='Dashboard' href='" + DomainPath + "/Home/Index'><i class='icon-display4 position-left'></i> Dashboard</a></li>");

                        foreach (XmlNode node in module_nodes)
                        {
                            ModuleStrOld.Append("<li class='dropdown'><a href='javascript: void(0)' data-toggle='dropdown' role='button' aria-haspopup='true' aria-expanded='false' class='dropdown-toggle drop icon-circle drop-image'><i class='" + node["MODULEICON"].InnerText + "'></i>  " + node["MODULENAME"].InnerText + "</a>");
                            ModuleStrOld.Append("<ul class='dropdown-menu settings-menu'>");

                            if (node["ISMEGAMENU"].InnerText == "1")
                            {
                                ModuleStr.Append("<li class='dropdown mega-menu mega-menu-wide '>" +
                                "<a href=\"javascript: void(0)\" class='dropdown-toggle' data-toggle='dropdown'><i class='" + node["MODULEICON"].InnerText + " position-left'></i>" + node["MODULENAME"].InnerText
                                + "&nbsp; <span class='caret'></span></a>");

                                ModuleStr.Append("<div class='dropdown-menu dropdown-content'><div class='dropdown-content-body'><div class='row'>");

                                xmlNodeList = node["SUBMODULELIST"].SelectNodes("SUBMODULE"); //node.SelectNodes("SUBMENULIST");

                                foreach (XmlNode SubMenunode in xmlNodeList)
                                {
                                    ModuleStr.Append("<div class='col-md-3'><span class='menu-heading underlined'>" + SubMenunode["SUBMODULENAME"].InnerText + "</span><ul class='menu-list'>");

                                    XmlNodeList xmlnodelist1 = SubMenunode["MENULIST"].SelectNodes("MENU");
                                    foreach (XmlNode subnode in xmlnodelist1)
                                    {
                                        // SAVING PAGE DETAILS IN SESSION
                                        var page = new PagePermission();
                                        page.ID = Convert.ToInt32(subnode["MENUID"].InnerText);
                                        page.MODULE = node["MODULENAME"].InnerText;
                                        page.MODULEICON = node["MODULEICON"].InnerText;
                                        page.SUBMODULE = SubMenunode["SUBMODULENAME"].InnerText;
                                        page.SUBMODULEICON = SubMenunode["SUBMODULEICON"].InnerText;
                                        page.NAME = subnode["MENUNAME"].InnerText;
                                        page.ICON = subnode["ICON"].InnerText;
                                        page.CONTROLLER = (subnode["CONTROLLER"] == null) ? string.Empty : subnode["CONTROLLER"].InnerText;
                                        page.ACTION = (subnode["ACTION"] == null) ? string.Empty : subnode["ACTION"].InnerText;
                                        page.ISVIEW = Convert.ToInt32(subnode["ISVIEW"].InnerText);
                                        page.ISADD = Convert.ToInt32(subnode["ISADD"].InnerText);
                                        page.ISUPDATE = Convert.ToInt32(subnode["ISUPDATE"].InnerText);
                                        page.ALLOWDAYS = Convert.ToInt32(subnode["ALLOWDAYS"].InnerText);
                                        page.AUTHORIZE = Convert.ToInt32(subnode["AUTHORIZE"].InnerText);
                                        page.ISDELETE = Convert.ToInt32(subnode["ISDELETE"].InnerText);
                                        page.ISDOWNLOAD = Convert.ToInt32(subnode["ISDOWNLOAD"].InnerText);
                                        Pagelist.Add(page);

                                        ModuleStrOld.Append("<li><a href='" + DomainPath + "/" + subnode["CONTROLLER"].InnerText + "/" + subnode["ACTION"].InnerText + "'>" +
                                                            "<span class='imamenu-icon'>" +
                                                            "<i class='iconimg " + subnode["ICON"].InnerText + "'aria-hidden='true'></i>" +
                                                            "</span><span class='imamenu-text'>" + subnode["MENUNAME"].InnerText + "</span></a></li>");

                                        ModuleStr.Append("<li><a href=\"" + System.Configuration.ConfigurationManager.AppSettings["domainPath"] + "/" + subnode["CONTROLLER"].InnerText + "/" + subnode["ACTION"].InnerText + "\"><i class=\"" + subnode["ICON"].InnerText + "\"></i> " + subnode["MENUNAME"].InnerText + "</a></li>");
                                    }

                                    ModuleStr.Append("</ul></div>");
                                }

                                ModuleStr.Append("</div></div></div></li>");
                            }
                            else
                            {
                                ModuleStr.Append("<li class='dropdown'>" +
                                "<a href=\"javascript: void(0)\" class='dropdown-toggle' data-toggle='dropdown'><i class='" + node["MODULEICON"].InnerText + " position-left'></i>" + node["MODULENAME"].InnerText
                                + "&nbsp; <span class='caret'></span></a>");

                                ModuleStr.Append("<ul class='dropdown-menu width-250'>");

                                xmlNodeList = node["SUBMODULELIST"].SelectNodes("SUBMODULE"); //node.SelectNodes("SUBMENULIST");

                                foreach (XmlNode SubMenunode in xmlNodeList)
                                {
                                    ModuleStr.Append("<li class='dropdown-header'>" + SubMenunode["SUBMODULENAME"].InnerText + "</li>");
                                    XmlNodeList xmlnodelist1 = SubMenunode["MENULIST"].SelectNodes("MENU");
                                    foreach (XmlNode subnode in xmlnodelist1)
                                    {
                                        // SAVING PAGE DETAILS IN SESSION
                                        var page = new PagePermission();
                                        page.ID = Convert.ToInt32(subnode["MENUID"].InnerText);
                                        page.MODULE = node["MODULENAME"].InnerText;
                                        page.MODULEICON = node["MODULEICON"].InnerText;
                                        page.SUBMODULE = SubMenunode["SUBMODULENAME"].InnerText;
                                        page.SUBMODULEICON = SubMenunode["SUBMODULEICON"].InnerText;
                                        page.NAME = subnode["MENUNAME"].InnerText;
                                        page.ICON = subnode["ICON"].InnerText;
                                        page.CONTROLLER = (subnode["CONTROLLER"] == null) ? string.Empty : subnode["CONTROLLER"].InnerText;
                                        page.ACTION = (subnode["ACTION"] == null) ? string.Empty : subnode["ACTION"].InnerText;
                                        page.ISVIEW = Convert.ToInt32(subnode["ISVIEW"].InnerText);
                                        page.ISADD = Convert.ToInt32(subnode["ISADD"].InnerText);
                                        page.ISUPDATE = Convert.ToInt32(subnode["ISUPDATE"].InnerText);
                                        page.ALLOWDAYS = Convert.ToInt32(subnode["ALLOWDAYS"].InnerText);
                                        page.AUTHORIZE = Convert.ToInt32(subnode["AUTHORIZE"].InnerText);
                                        page.ISDELETE = Convert.ToInt32(subnode["ISDELETE"].InnerText);
                                        page.ISDOWNLOAD = Convert.ToInt32(subnode["ISDOWNLOAD"].InnerText);
                                        Pagelist.Add(page);

                                        ModuleStrOld.Append("<li><a href='" + DomainPath + "/" + subnode["CONTROLLER"].InnerText + "/" + subnode["ACTION"].InnerText + "'>" +
                                                            "<span class='imamenu-icon'>" +
                                                            "<i class='iconimg " + subnode["ICON"].InnerText + "'aria-hidden='true'></i>" +
                                                            "</span><span class='imamenu-text'>" + subnode["MENUNAME"].InnerText + "</span></a></li>");

                                        ModuleStr.Append("<li><a href=\"" + System.Configuration.ConfigurationManager.AppSettings["domainPath"] + "/" + subnode["CONTROLLER"].InnerText + "/" + subnode["ACTION"].InnerText + "\"><i class=\"" + subnode["ICON"].InnerText + "\"></i> " + subnode["MENUNAME"].InnerText + "</a></li>");
                                    }
                                }

                                ModuleStr.Append("</ul></li>");
                            }

                            ModuleStrOld.Append("</ul></li>");

                        }

                        ModuleStrOld.Append("</ul>");

                        ModuleStr.Append("</ul>");
                    }


                    XmlNodeList BranchListNodes = doc.SelectNodes("SERVICERESPONSE//DETAILSLIST//DETAILS//BRANCHLIST//BRANCH");

                    if (BranchListNodes.Count > 0)
                    {
                        foreach (XmlNode node in BranchListNodes)
                        {
                            BranchStr.Append("<option value='" + node["BRANCHID"].InnerText + "' CompanyId='" + node["COMPANYID"].InnerText + "'>" + node["BRANCHNAME"].InnerText + "</option>");
                        }
                    }


                    SessionFacade.PagePermission = Pagelist;
                    SessionFacade.MenuListstrOld = ModuleStrOld.ToString();
                    SessionFacade.MenuListstr = ModuleStr.ToString();
                    SessionFacade.BranchListstr = BranchStr.ToString();
                    /*-------------------------------------------------------------------------------------*/
                    return RedirectToAction("Index", "Home");
                }
                else // AUTHENTICATION FAILED
                {
                    return RedirectToAction("Login", "Login", new { Msg = doc.SelectSingleNode("SERVICERESPONSE//RESPONSEMESSAGE").InnerText });
                }
            }
            catch (Exception ex)
            {
                return RedirectToAction("Login", "Login", new { Msg = ex.StackTrace.ToString() });
            }
        }
        public static string GetClientIpAddress()
        {
            HttpRequest request = System.Web.HttpContext.Current.Request;
            try
            {
                var userHostAddress = request.UserHostAddress;
                IPAddress.Parse(userHostAddress);

                var xForwardedFor = request.ServerVariables["X_FORWARDED_FOR"];

                if (string.IsNullOrEmpty(xForwardedFor))
                    return userHostAddress;

                var publicForwardingIps = xForwardedFor.Split(',').Where(ip => !IsPrivateIpAddress(ip)).ToList();

                return publicForwardingIps.Any() ? publicForwardingIps.Last() : userHostAddress;
            }
            catch (Exception)
            {
                return "0.0.0.0";
            }
        }
        public static bool IsPrivateIpAddress(string ipAddress)
        {
            var ip = IPAddress.Parse(ipAddress);
            var octets = ip.GetAddressBytes();

            var is24BitBlock = octets[0] == 10;
            if (is24BitBlock) return true;

            var is20BitBlock = octets[0] == 172 && octets[1] >= 16 && octets[1] <= 31;
            if (is20BitBlock) return true;

            var is16BitBlock = octets[0] == 192 && octets[1] == 168;
            if (is16BitBlock) return true;

            var isLinkLocalAddress = octets[0] == 169 && octets[1] == 254;
            return isLinkLocalAddress;
        }

        public static string GetLocalIPAddress()
        {
            var host = Dns.GetHostEntry(Dns.GetHostName());
            foreach (var ip in host.AddressList)
            {
                if (ip.AddressFamily == System.Net.Sockets.AddressFamily.InterNetwork)
                {
                    return ip.ToString();
                }
            }
            throw new Exception("Local IP Address Not Found!");//output 192.168.0.120
        }

        public string ForgetPasswordOTP(string UserName)
        {
            string XMLValue = string.Empty;
            try
            {

                PerformCrudOperations performOper = new PerformCrudOperations();
                XMLValue = "<SERVICEREQUEST><SERVICENAME>ACC_FORGOTPASSWORD_OTP_GET</SERVICENAME>" +
                            "<USERNAME>" + UserName + "</USERNAME>" +
                            "</SERVICEREQUEST>";

                ContactBook_InterfaceClient proxy = new ContactBook_InterfaceClient();
                XMLValue = proxy.PERFORM_ACTIONS(XMLValue);
                XmlDocument doc = new XmlDocument();
                doc.LoadXml(XMLValue);

                if (doc.SelectSingleNode("SERVICERESPONSE//RESPONSECODE").InnerText == "0") // USER AUTHENTICATION OK
                {

                    string emailResult = "";
                    AccountController ac = new AccountController();
                    emailResult = ac.SendMail(doc.SelectSingleNode("SERVICERESPONSE//EMAILID").InnerText, doc.SelectSingleNode("SERVICERESPONSE//EMAILSUBJECT").InnerText, doc.SelectSingleNode("SERVICERESPONSE//EMAILBODY").InnerText);
                    if (emailResult == "success")
                    {
                        XMLValue = "<SERVICERESPONSE><RESPONSECODE>0</RESPONSECODE><RESPONSEMESSAGE>SUCCESS</RESPONSEMESSAGE></SERVICERESPONSE>";
                    }
                    else
                    {
                        XMLValue = "<SERVICERESPONSE><RESPONSECODE>-1</RESPONSECODE><RESPONSEMESSAGE>Error in email sent.</RESPONSEMESSAGE></SERVICERESPONSE>";
                    }
                }

            }
            catch (Exception ex)
            {
                XMLValue = "<SERVICERESPONSE><RESPONSECODE>-1</RESPONSECODE><RESPONSEMESSAGE>"+ex.Message+"</RESPONSEMESSAGE></SERVICERESPONSE>";
            }
            return XMLValue;
        }

        public string VerifyOTP(string ResetPasswordOTP, string USERNAME)
        {
            string XMLValue = string.Empty;
            try 
            {
                PerformCrudOperations performOper = new PerformCrudOperations();
                XMLValue = "<SERVICEREQUEST><SERVICENAME>ACC_VERIFY_OTP</SERVICENAME>" +
                            "<RESETPASSWORDOTP>" + ResetPasswordOTP + "</RESETPASSWORDOTP>" +
                            "<USERNAME>" + USERNAME + "</USERNAME>" +
                            "</SERVICEREQUEST>";

                ContactBook_InterfaceClient proxy = new ContactBook_InterfaceClient();
                XMLValue = proxy.PERFORM_ACTIONS(XMLValue);
               
            }
            catch (Exception ex)
            {
                XMLValue = "<SERVICERESPONSE><RESPONSECODE>-1</RESPONSECODE><RESPONSEMESSAGE>" + ex.Message + "</RESPONSEMESSAGE></SERVICERESPONSE>";
            }
            return XMLValue;
        }

        public string ResetPassword(string NewPassword, string USERNAME)
        {
            string XMLValue = string.Empty;
            try
            {
                PerformCrudOperations performOper = new PerformCrudOperations();
                XMLValue = "<SERVICEREQUEST><SERVICENAME>ACC_RESET_PASSWORD</SERVICENAME>" +
                            "<USERNAME>" + USERNAME + "</USERNAME>" +
                            "<NEWPASSWORD>" + NewPassword + "</NEWPASSWORD>" +
                            "</SERVICEREQUEST>";

                ContactBook_InterfaceClient proxy = new ContactBook_InterfaceClient();
                XMLValue = proxy.PERFORM_ACTIONS(XMLValue);
                
            }
            catch (Exception ex)
            {
                XMLValue = "<SERVICERESPONSE><RESPONSECODE>-1</RESPONSECODE><RESPONSEMESSAGE>" + ex.Message + "</RESPONSEMESSAGE></SERVICERESPONSE>";
            }
            return XMLValue;
        }
    }
}