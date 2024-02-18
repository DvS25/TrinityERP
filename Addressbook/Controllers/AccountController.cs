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
    [AuthorizeUserAttribute]
    public class AccountController : Controller
    {
        // GET: Account
        public ActionResult EmployeeDetails()
        {
            return View(FormPermissionHelper.GetFormPermission("EmployeeDetails", "Account"));
        }
        public ActionResult UserGroup()
        {
            return View(FormPermissionHelper.GetFormPermission("UserGroup", "Account"));
        }
        public ActionResult UserList()
        {
            return View(FormPermissionHelper.GetFormPermission("UserList", "Account"));
        }

        public ActionResult CustomerList()
        {
            return View(FormPermissionHelper.GetFormPermission("CustomerList", "Account"));
        }
        public ActionResult LogOut()
        {
            SessionFacade.UserSession = null;
            return RedirectToAction("Login", "Login", new { Msg = "You logged out successfully." });
        }

        public ActionResult NewsLetter()
        {
            return View(FormPermissionHelper.GetFormPermission("NewsLetter", "Account"));
        }

        public ActionResult ChartFields()
        {
            return View(FormPermissionHelper.GetFormPermission("ChartFields", "Account"));
        }

        public ActionResult ChartDesigner()
        {
            return View(FormPermissionHelper.GetFormPermission("ChartDesigner", "Account"));
        }

        public string ImportExcel(string FilePath, string uniqename)
        {

            string InputXml = string.Empty;
            string Extension = string.Empty;
            string ResponseMessage = string.Empty;
            string conStr = string.Empty;

            Extension = Path.GetExtension(FilePath);
            FilePath = Server.MapPath(FilePath);
            string uniqenameext = uniqename.Substring(0, uniqename.Length - Extension.Length);
            // string result = FilePath.Substring(0, FilePath.Length - Extension.Length);
            switch (Extension)
            {
                case ".xls": //Excel 97-03
                    conStr = "Provider=Microsoft.Jet.OLEDB.4.0;Data Source={0};Extended Properties='Excel 8.0;HDR=Yes;IMEX=2'";
                    break;

                case ".xlsb": //Excel Binary WorkBook.
                    conStr = "Provider=Microsoft.ACE.OLEDB.12.0;Data Source={0};Extended Properties='Excel 12.0;HDR=YES;IMEX=2'";
                    break;

                case ".xlsx": //Excel 07
                    conStr = "Provider=Microsoft.ACE.OLEDB.12.0;Data Source={0};data source=" + FilePath + ";Extended Properties='Excel 8.0;HDR=Yes;IMEX=2'";
                    break;
            }


            //declare variables - edit these based on your particular situation   
            string ssqltable = "Contacts";
            // make sure your sheet name is correct, here sheet name is sheet1, 
            //so you can change your sheet name if have    different
            string myexceldataquery = "select * from[Sheet1$]";
            //string myexceldataquery = "select * from "+uniqenameext;
            try
            {
                //create our connection strings   
                //string sexcelconnectionstring = @"provider=microsoft.jet.oledb.4.0;data source=" + excelFilePath +";extended properties=" + "\"excel 8.0;hdr=yes;\"";
                string ssqlconnectionstring = ConfigurationManager.ConnectionStrings["ContactConnectionString"].ConnectionString;//"Data Source=DESKTOP-QO0AOUM/JAY;Initial Catalog=sample;Integrated Security=True";

                //series of commands to bulk copy data from the excel file into our sql table   
                OleDbConnection oledbconn = new OleDbConnection(conStr);
                OleDbCommand oledbcmd = new OleDbCommand(myexceldataquery, oledbconn);
                oledbconn.Open();
                OleDbDataReader dr = oledbcmd.ExecuteReader();
                SqlBulkCopy bulkcopy = new SqlBulkCopy(ssqlconnectionstring);
                bulkcopy.DestinationTableName = ssqltable;


                DataTable dt_sheet = null;
                dt_sheet = getSheetData(conStr);

                bulkcopy.ColumnMappings.Add("B_Salutation", "B_Salutation");
                bulkcopy.ColumnMappings.Add("B_FullName", "B_FullName");
                bulkcopy.ColumnMappings.Add("B_NickName", "B_NickName");
                bulkcopy.ColumnMappings.Add("B_Anry_Date", "B_Anry_Date");
                bulkcopy.ColumnMappings.Add("B_Birthdate", "B_Birthdate");
                bulkcopy.ColumnMappings.Add("B_Mobile_No_1", "B_Mobile_No_1");
                bulkcopy.ColumnMappings.Add("B_Mobile_No_2", "B_Mobile_No_2");
                bulkcopy.ColumnMappings.Add("B_Email_1", "B_Email_1");
                bulkcopy.ColumnMappings.Add("B_Email_2", "B_Email_2");
                bulkcopy.ColumnMappings.Add("B_GroupId", "B_GroupId");
                bulkcopy.ColumnMappings.Add("H_DistrictId", "H_DistrictId");
                bulkcopy.ColumnMappings.Add("H_CityId", "H_CityId");
                bulkcopy.ColumnMappings.Add("H_StateId", "H_StateId");
                bulkcopy.ColumnMappings.Add("H_CountryId", "H_CountryId");
                bulkcopy.ColumnMappings.Add("H_Address", "H_Address");
                bulkcopy.ColumnMappings.Add("H_Telephone_1", "H_Telephone_1");
                bulkcopy.ColumnMappings.Add("H_Telephone_2", "H_Telephone_2");
                bulkcopy.ColumnMappings.Add("H_Mobile_1", "H_Mobile_1");
                bulkcopy.ColumnMappings.Add("H_Mobile_2", "H_Mobile_2");
                bulkcopy.ColumnMappings.Add("H_ZipCode", "H_ZipCode");
                bulkcopy.ColumnMappings.Add("O_CompnyName", "O_CompnyName");
                bulkcopy.ColumnMappings.Add("O_Address", "O_Address");
                bulkcopy.ColumnMappings.Add("O_Telephone_1", "O_Telephone_1");
                bulkcopy.ColumnMappings.Add("O_Telephone_2", "O_Telephone_2");
                bulkcopy.ColumnMappings.Add("O_Fax", "O_Fax");
                bulkcopy.ColumnMappings.Add("O_Mobile", "O_Mobile");
                bulkcopy.ColumnMappings.Add("O_Post", "O_Post");
                bulkcopy.ColumnMappings.Add("O_Email", "O_Email");
                bulkcopy.ColumnMappings.Add("O_Contact_Person", "O_Contact_Person");
                bulkcopy.ColumnMappings.Add("O_Department", "O_Department");
                bulkcopy.ColumnMappings.Add("O_CP_Mo1", "O_CP_Mo1");
                bulkcopy.ColumnMappings.Add("O_CP_Mo2", "O_CP_Mo2");
                bulkcopy.ColumnMappings.Add("O_DistrictId", "O_DistrictId");
                bulkcopy.ColumnMappings.Add("O_CityId", "O_CityId");
                bulkcopy.ColumnMappings.Add("O_StateId", "O_StateId");
                bulkcopy.ColumnMappings.Add("O_CountryId", "O_CountryId");
                bulkcopy.ColumnMappings.Add("O_ZipCode", "O_ZipCode");
                bulkcopy.ColumnMappings.Add("B_Comments", "B_Comments");

                bulkcopy.WriteToServer(dr);
                dr.Close();

                oledbconn.Close();

                ResponseMessage = "success";

            }
            catch (Exception e)
            {
                ResponseMessage = e.Message.ToString() + "StackTrace: " + e.StackTrace.ToString();
            }
            return ResponseMessage;


        }

        private DataTable getSheetData(string strConn)
        {
            string query = "select * from [Sheet1$]";
            //string query = "select * from " + uniqenameext;
            OleDbConnection objConn;
            OleDbDataAdapter oleDA;
            DataTable dt = new DataTable();
            objConn = new OleDbConnection(strConn);
            objConn.Open();
            oleDA = new OleDbDataAdapter(query, objConn);
            oleDA.Fill(dt);
            objConn.Close();
            oleDA.Dispose();
            objConn.Dispose();
            return dt;
        }

        [HttpPost, ValidateInput(false)]
        public string SendMail(string Emailids, string subject, string body)
        {
            string eroorMessage = string.Empty;
            bool ssl;
            try
            {
                System.Net.Mail.MailMessage mail = new System.Net.Mail.MailMessage();
                SmtpClient client = new SmtpClient();
                ssl = Convert.ToBoolean(ConfigurationManager.AppSettings["contactSSl"]);
                client.Host = ConfigurationManager.AppSettings["contactHost"];
                client.Port = Convert.ToInt32(ConfigurationManager.AppSettings["contactPort"]);
                mail.From = new MailAddress(ConfigurationManager.AppSettings["contactMail"], "TrinityJewells.");

                mail.Subject = subject;

                mail.Body = body;

                mail.IsBodyHtml = true;
                mail.Priority = MailPriority.High;

                mail.To.Add(Emailids);

                client.UseDefaultCredentials = false;
                client.EnableSsl = ssl;
                client.DeliveryMethod = SmtpDeliveryMethod.Network;


                client.Credentials = new System.Net.NetworkCredential(ConfigurationManager.AppSettings["contactMail"], ConfigurationManager.AppSettings["contactPassword"]);
                client.Send(mail);

                return "success";
            }

            catch (Exception ex)
            {

                eroorMessage = ex.Message.ToString() + ex.StackTrace.ToString() + ex.InnerException;
                return eroorMessage;
            }

        }

        [HttpPost, ValidateInput(false)]
        public string SendSMS(string mobileNos, string lang, string body)
        {
            string status = "";
            string url = "";
            if (mobileNos != "" && mobileNos != null)
            {
                if (lang == "EN")
                {
                    url = "http://www.smsidea.co.in/SmsStatuswithId.aspx?mobile=9879147206&pass=9879147206&senderid=TRINIT&to=" + mobileNos + "&msg=" + body;

                }
                else
                {
                    url = "http://www.smsidea.co.in/SmsStatuswithId.aspx?mobile=9879147206&pass=9879147206&senderid=TRINIT&to=" + mobileNos + "&msg=" + body + "&msgtype=uc";

                }

                try
                {
                    HttpWebRequest request = WebRequest.Create(url) as HttpWebRequest;
                    HttpWebResponse response = request.GetResponse() as HttpWebResponse;
                    Stream stream = response.GetResponseStream();
                    // status = stream.ToString();
                    status = response.StatusCode.ToString();
                }
                catch (Exception e)
                {
                    status = e.Message.ToString();
                }
                return status;
            }
            return status;

        }
        
        /*
        public string SMSTemplatePublish(string ServiceName)
        {
            string XMLValue = string.Empty;
            try
            {
                string Language = string.Empty, SmsBody = string.Empty, MobileNo = string.Empty;
                bool Status = false;

                System.Collections.Specialized.NameValueCollection forms = new System.Collections.Specialized.NameValueCollection();
                forms.Add(Request.Unvalidated.Form);
                PerformCrudOperations performOper = new PerformCrudOperations();
                XMLValue = performOper.PerformOpeartions(forms, "SERVICEREQUEST", ServiceName);
                
                XmlDocument doc = new XmlDocument();
                doc.LoadXml(XMLValue);

                if (doc.SelectSingleNode("SERVICERESPONSE//RESPONSECODE").InnerText == "0") // USER AUTHENTICATION OK
                {
                    Language = Convert.ToString(doc.SelectSingleNode("SERVICERESPONSE//LANGUAGE").InnerText);
                    SmsBody = Convert.ToString(doc.SelectSingleNode("SERVICERESPONSE//SMSBODY").InnerText);
                    MobileNo = Convert.ToString(doc.SelectSingleNode("SERVICERESPONSE//MOBILENOS").InnerText);
                    Status = SendBulkSMS(MobileNo, Language, SmsBody);
                    if (Status == true)
                    {
                        XMLValue = "<SERVICERESPONSE><RESPONSECODE>0</RESPONSECODE><RESPONSEMESSAGE>"+ doc.SelectSingleNode("SERVICERESPONSE//RESPONSEMESSAGE").InnerText.ToString() + "</RESPONSEMESSAGE></SERVICERESPONSE>";
                    }
                    else
                    {
                        XMLValue = "<SERVICERESPONSE><RESPONSECODE>-1</RESPONSECODE><RESPONSEMESSAGE>SMS Send Fail.</RESPONSEMESSAGE></SERVICERESPONSE>";
                    }
                }
                else
                {
                    XMLValue = "<SERVICERESPONSE><RESPONSECODE>-1</RESPONSECODE><RESPONSEMESSAGE>" + doc.SelectSingleNode("SERVICERESPONSE//LANGUAGE").InnerText.ToString() + "</RESPONSEMESSAGE></SERVICERESPONSE>";
                }  
            }
            catch (Exception ex)
            {
                XMLValue = "<SERVICERESPONSE><RESPONSECODE>-1</RESPONSECODE><RESPONSEMESSAGE>" + ex.StackTrace.ToString() + "</RESPONSEMESSAGE></SERVICERESPONSE>";
                //return GenerateXml.GetExceptionXMLResponse(ex);
            }

            return XMLValue;
        }

        [HttpPost, ValidateInput(false)]
        public bool SendBulkSMS(string mobileNos, string lang, string body)
        {
            bool status = false;
            string url = "";
            if (mobileNos != "" && mobileNos != null)
            {
                if (lang == "EN")
                {
                    url = "http://www.smsidea.co.in/SmsStatuswithId.aspx?restype=xml/json&mobile=9979080491&pass=MIYJY&senderid=SMSBUZ&to=" + mobileNos + "&msg=" + body;
                }
                else
                {
                    url = "http://www.smsidea.co.in/SmsStatuswithId.aspx?restype=xml/json&mobile=9979080491&pass=MIYJY&senderid=SMSBUZ&to=" + mobileNos + "&msg=" + body + "&msgtype=uc";
                }

                try
                {
                    HttpWebRequest request = WebRequest.Create(url) as HttpWebRequest;
                    HttpWebResponse response = request.GetResponse() as HttpWebResponse;
                    Stream stream = response.GetResponseStream();
                    StreamReader sr = new StreamReader(stream);
                    string json = sr.ReadToEnd();
                    sr.Close();
                    SMSSendCrud(mobileNos, body, json, null);
                    status = true;
                }
                catch (Exception e)
                {
                    status = false;
                    SMSSendCrud(mobileNos, body, null, e.Message.ToString());
                }
            }
            else
            {
                status = false;
            }
            return status;
        }

        public bool SMSSendCrud(string mobileNos, string body, string responsemsg, string errormsg)
        {
            try
            {
                string XMLValue = string.Empty;
                PerformCrudOperations performOper = new PerformCrudOperations();
                XMLValue = "<SERVICEREQUEST><SERVICENAME>SMSSENT_RESPONSE_CRUD</SERVICENAME>";
                XMLValue += "<oper>add</oper>";
                XMLValue += "<SMSTO>" + mobileNos + "</SMSTO>";
                XMLValue += "<SMSBODY>" + body + "</SMSBODY>";
                XMLValue += "<RESPONSEMESSAGE>" + responsemsg + "</RESPONSEMESSAGE>";
                XMLValue += "<ERRORMESAAGE>" + errormsg + "</ERRORMESAAGE>";

                if (SessionFacade.UserSession != null)
                {
                    XMLValue += "<LOGINID>" + SessionFacade.UserSession.USERID + "</LOGINID>" +
                            "<USERTYPE>" + SessionFacade.UserSession.USERTYPE + "</USERTYPE>" +
                            "<SECUREKEY>" + SessionFacade.UserSession.TOKEN + "</SECUREKEY>";
                }
                XMLValue += "</SERVICEREQUEST>";
                ContactBook_InterfaceClient proxy = new ContactBook_InterfaceClient();
                XMLValue = proxy.PERFORM_ACTIONS(XMLValue);
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }
        */
    }
}