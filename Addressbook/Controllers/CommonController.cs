using System;
using Addressbook.CommonClasses;
using System.Linq;
using Addressbook.ServiceReference1;
using System.Web.Mvc;
using MyExcel = Microsoft.Office.Interop.Excel;
using System.Data;
using System.IO.Compression;
using System.Xml;
using System.IO;
using System.Web;
using System.Collections.Generic;
using Addressbook.Filters;
using System.Net.Mail;
using System.Net;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Drawing.Imaging;
using System.Text;
using System.Data.SqlClient;
using RestSharp;

namespace Addressbook.Controllers
{
    [SessionExpireFilterAttribute]
    [AuthorizeUserAttribute]

    public class CommonController : Controller
    {
        public string BindMastersDetails()
        {
            try
            {
                string XMLValue = string.Empty;
                int Mid = 0;
                Mid = FormPermissionHelper.GetFormMID(HttpContext);

                CommonGridParams parms = new CommonGridParams();
                parms.Mid = Mid.ToString();
                parms.PageIndex = Convert.ToString(Request.QueryString["page"]);
                parms.PageSize = Convert.ToString(Request.QueryString["rows"]);
                parms.SortColumn = Convert.ToString(Request.QueryString["sidx"]);
                parms.SortOrder = Convert.ToString(Request.QueryString["sord"]);
                parms.ColumnRequested = Request.QueryString["ColumnRequested"];
                parms.ServiceName = Request.QueryString["ServiceName"];

                if (Request.Form["XMLPARAM"] != null)
                    parms.XmlParam = Request.Form["XMLPARAM"];

                if (Request.QueryString["IsRecordAll"] != null && Request.QueryString["IsRecordAll"] != "")
                {
                    parms.IsRecordAll = Convert.ToString(Request.QueryString["IsRecordAll"]);
                }

                if (Request.QueryString["IsActive"] != null && Request.QueryString["IsActive"] != "")
                {
                    parms.IsActive = Convert.ToString(Request.QueryString["IsActive"]);
                }

                if (Request.QueryString["_search"] != null && Request.QueryString["_search"] != "")
                {
                    bool search = Convert.ToBoolean(Request.QueryString["_search"].ToString());
                    if (search == true)
                    {
                        if (Request.QueryString["searchString"] != null)
                        {
                            string searchString = Request.QueryString["searchString"].ToString();
                            searchString = searchString.Replace("<", "&lt;");
                            searchString = searchString.Replace("&", "&amp;");
                            parms.SearchKeyword = searchString;
                        }

                        if (Request.QueryString["searchField"] != null)
                            parms.SearchColumn = Request.QueryString["searchField"].ToString();

                        if (Request.QueryString["searchOper"] != null)
                            parms.SearchOper = Request.QueryString["searchOper"].ToString();

                        if (Request.QueryString["filters"] != null)
                            parms.Filters = Request.QueryString["filters"].ToString();
                    }
                }


                if (Request.QueryString["_gridsearch"] != null && Request.QueryString["_gridsearch"] != "")
                {
                    bool search = Convert.ToBoolean(Request.QueryString["_gridsearch"].ToString());
                    if (search == true)
                    {
                        if (Request.QueryString["searchString"] != null)
                            parms.SearchKeyword = Request.QueryString["searchString"].ToString();

                        if (Request.QueryString["searchField"] != null)
                            parms.SearchColumn = Request.QueryString["searchField"].ToString();

                        if (Request.QueryString["searchOper"] != null)
                            parms.SearchOper = Request.QueryString["searchOper"].ToString();

                        if (Request.QueryString["filters"] != null)
                            parms.Filters = Request.QueryString["filters"].ToString();
                    }
                }

                if (Request.QueryString["myfilters"] != null)
                    parms.MyFilters = Request.QueryString["myfilters"].ToString();

                GenerateXml xmlGenerator = new GenerateXml();
                string ChildNodes = xmlGenerator.GenerateCommonRequestNodes(parms);
                string RequestNodes = xmlGenerator.FinalXml("SERVICEREQUEST", ChildNodes);

                ContactBook_InterfaceClient client = new ContactBook_InterfaceClient();
                XMLValue = client.PERFORM_ACTIONS(RequestNodes);
                client.Close();

                XmlDocument doc = new XmlDocument();
                doc.LoadXml(XMLValue);
                //if (doc.SelectSingleNode("SERVICERESPONSE//RESPONSECODE").InnerText == "-10") // USER AUTHENTICATION OK
                //{
                //     RedirectToAction("LogOut", "Login");
                //}

                return XMLValue;

            }
            catch (Exception ex)
            {
                return GenerateXml.GetExceptionXMLResponse(ex);
            }
        }

        [HttpPost]
        [ValidateInput(false)]
        public string OpeartionsOnMaster(string ServiceName)
        {
            try
            {
                string XMLValue = string.Empty;
                int Mid = 0;
                Mid = FormPermissionHelper.GetFormMID(HttpContext);

                System.Collections.Specialized.NameValueCollection forms = new System.Collections.Specialized.NameValueCollection();

                forms.Add("MID", Mid.ToString());
                forms.Add(Request.Unvalidated.Form);

                PerformCrudOperations performOper = new PerformCrudOperations();
                XMLValue = performOper.PerformOpeartions(forms, "SERVICEREQUEST", ServiceName);

                XmlDocument doc = new XmlDocument();
                doc.LoadXml(XMLValue);
                return XMLValue;
                //if (doc.SelectSingleNode("SERVICERESPONSE//RESPONSECODE").InnerText == "-10") // USER AUTHENTICATION OK
                //{
                //    RedirectToAction("LogOut", "Login");
                //}


            }
            catch (Exception ex)
            {
                return GenerateXml.GetExceptionXMLResponse(ex);
            }
        }

        public JsonResult SaveImage(string category, string deletedfiles, string savefiles)
        {
            try
            {
                string VirtualDirectory = System.Configuration.ConfigurationManager.AppSettings["domainPath"];

                if (VirtualDirectory != "")
                {
                    if (!string.IsNullOrEmpty(deletedfiles))
                    { deletedfiles = deletedfiles.Replace(VirtualDirectory, ""); }

                    if (!string.IsNullOrEmpty(savefiles))
                    { savefiles = savefiles.Replace(VirtualDirectory, ""); }
                }

                // delete files from directory
                if (deletedfiles != string.Empty)
                {
                    string[] deletedfilesArr = deletedfiles.Split(',');
                    if (deletedfilesArr.Length > 0)
                    {
                        int i = 0;
                        for (; i < deletedfilesArr.Length; i++)
                        {
                            if (deletedfilesArr[i] != string.Empty)
                            {
                                if (deletedfilesArr[i].Contains("/UploadFiles/Temp/"))
                                {
                                    string deleteFilePath = Server.MapPath("~" + deletedfilesArr[i]);
                                    if (System.IO.File.Exists(deleteFilePath))
                                        System.IO.File.Delete(deleteFilePath);
                                }
                                string destFile = "~/UploadFiles/" + "/" + category + "/";
                                string destServerpath = Server.MapPath(destFile + deletedfilesArr[i]);
                                //string deleteFilePath = Server.MapPath("~" + deletedfilesArr[i]);
                                if (System.IO.File.Exists(destServerpath))
                                    System.IO.File.Delete(destServerpath);
                            }
                        }
                    }
                }

                if (savefiles != string.Empty)
                {
                    string destFile = "~/UploadFiles/" + "/" + category + "/";
                    string destServerpath = Server.MapPath(destFile);

                    if (!System.IO.Directory.Exists(destServerpath))
                        System.IO.Directory.CreateDirectory(destServerpath);

                    // Save file to Original folder
                    string[] savefilesArr = savefiles.Split(',');
                    string savefilePath;
                    if (savefilesArr.Length > 0)
                    {
                        int i = 0;
                        for (; i < savefilesArr.Length; i++)
                        {
                            if (savefilesArr[i] != string.Empty)
                            {
                                if (savefilesArr[i].Contains("/UploadFiles/Temp/"))
                                {
                                    savefilePath = Server.MapPath("~" + savefilesArr[i]);
                                    if (System.IO.File.Exists(savefilePath))
                                    {
                                        if (System.IO.File.Exists(destServerpath + System.IO.Path.GetFileName(savefilesArr[i])) == false)
                                            System.IO.File.Copy(savefilePath, destServerpath + System.IO.Path.GetFileName(savefilesArr[i]));

                                        System.IO.File.Delete(savefilePath);
                                    }
                                }
                            }
                        }
                    }
                    return Json("success", JsonRequestBehavior.AllowGet);
                }
                else
                {
                    return Json("", JsonRequestBehavior.AllowGet);
                }
            }
            catch (Exception ex)
            {
                return Json("error: " + ex.Message, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult SaveSingleImage(string originalfile, string newfile, string oper, bool isResize, string module)
        {

            string VirtualDirectory = System.Configuration.ConfigurationManager.AppSettings["domainPath"];
            if (VirtualDirectory != "")
            {
                if (!string.IsNullOrEmpty(originalfile))
                { originalfile = originalfile.Replace(VirtualDirectory, ""); }

                if (!string.IsNullOrEmpty(newfile))
                { newfile = newfile.Replace(VirtualDirectory, ""); }
            }

            string newfilePath = Server.MapPath("~" + newfile);
            string originalfilePath = Server.MapPath("~" + originalfile);

            if (newfile != null && newfile.Contains("/UploadFiles/") && (oper == "Add" || oper == "Delete" || oper == "Edit"))
            {
                string destFile = "/UploadFiles/" + module + "/"; // /" + SessionFacade.Client + "
                string destServerpath = Server.MapPath("~" + destFile);
                try
                {
                    if (!Directory.Exists(destServerpath))
                    {
                        Directory.CreateDirectory(destServerpath);
                    }
                    if (System.IO.File.Exists(newfilePath))
                    {
                        if ((oper != "Delete" && oper != "Edit") || (oper == "Edit" && newfilePath != originalfilePath))
                            System.IO.File.Copy(newfilePath, destServerpath + Path.GetFileName(newfile));

                        if (isResize) {
                            ResizeImage(200, 200, destServerpath + Path.GetFileName(newfile), destServerpath);
                        }

                        if (oper == "Delete" || (oper == "Edit" && newfilePath != originalfilePath) || oper == "Add")
                        {
                            System.IO.File.Delete(newfilePath); // delete Temp file
                            if (System.IO.File.Exists(originalfilePath)) // delete old file
                                System.IO.File.Delete(originalfilePath);
                            string deleteFile = Path.GetDirectoryName(originalfilePath) + "\\Resize\\" + Path.GetFileName(originalfile);
                            if (System.IO.File.Exists(deleteFile)) // delete resized file
                                System.IO.File.Delete(deleteFile);
                        }
                    }
                }
                catch (Exception ex)
                {
                    return Json("error", JsonRequestBehavior.AllowGet);
                }
                return Json(System.IO.Path.GetFileName(newfile), JsonRequestBehavior.AllowGet);
            }
            else
            {
                if (newfile == null)
                    newfile = "";
                return Json(System.IO.Path.GetFileName(newfile), JsonRequestBehavior.AllowGet);
            }
        }
        public string ExportFromGrid()
        {
            string downloadpath = "";
            string XMLString;
            string FileName;
            string destFile = "/UploadFiles/Temp/";
            string destServerpath = Server.MapPath("~" + destFile);
            Random r = new Random();
            int random = r.Next(99);
            var Timeval = DateTime.Now.Year.ToString() + DateTime.Now.Month.ToString() + DateTime.Now.Day.ToString() + DateTime.Now.Hour.ToString() + DateTime.Now.Minute.ToString() + DateTime.Now.Second.ToString() + DateTime.Now.Millisecond.ToString();
            CommonGridParams parms = new CommonGridParams();
            try
            {
                parms.ColumnRequested = Request.QueryString["ColumnRequested"];
                parms.ServiceName = Request.QueryString["ServiceName"];
                parms.IsRecordAll = Convert.ToString(Request.QueryString["IsRecordAll"]);
                if (Request.QueryString["myfilters"] != null)
                    parms.MyFilters = Request.QueryString["myfilters"].ToString();

                FileName = Request.QueryString["FileName"];

                GenerateXml xmlGenerator = new GenerateXml();
                string ChildNodes = xmlGenerator.GenerateCommonRequestNodes(parms);
                string RequestNodes = xmlGenerator.FinalXml("SERVICEREQUEST", ChildNodes);

                ContactBook_InterfaceClient proxy = new ContactBook_InterfaceClient();
                XMLString = proxy.PERFORM_ACTIONS(RequestNodes);

                var FinalFilename = "";
                MyExcel.Application xlApp;
                MyExcel.Workbook xlWorkBook;
                MyExcel.Worksheet xlWorkSheet;
                object misValue = System.Reflection.Missing.Value;
                int i = 0;
                int j = 0;
                xlApp = new MyExcel.Application();
                xlWorkBook = xlApp.Workbooks.Add(misValue);
                xlWorkSheet = (MyExcel.Worksheet)xlWorkBook.Worksheets.get_Item(1);

                System.Data.DataSet ds = new System.Data.DataSet();
                ds.ReadXml(new XmlTextReader(new StringReader(XMLString)));

                for (i = 0; i <= ds.Tables[2].Rows.Count - 1; i++)
                {
                    for (j = 0; j <= ds.Tables[2].Columns.Count - 2; j++)
                    {
                        xlWorkSheet.Cells[1, j + 1] = ds.Tables[2].Columns[j].ToString();
                        xlWorkSheet.Cells[i + 2, j + 1] = ds.Tables[2].Rows[i].ItemArray[j].ToString();
                    }
                }
                FinalFilename = FileName + Timeval + random;
                xlWorkBook.SaveAs(destServerpath + FinalFilename + ".xls", MyExcel.XlFileFormat.xlWorkbookNormal, misValue, misValue, misValue, misValue, MyExcel.XlSaveAsAccessMode.xlExclusive, misValue, misValue, misValue, misValue, misValue);
                xlWorkBook.Close(true, misValue, misValue);
                xlApp.Quit();
                downloadpath = destFile + FinalFilename + ".xls";
                return downloadpath;
            }
            catch (Exception e)
            {
                downloadpath = e.Message.ToString();
            }
            return downloadpath;
        }

        public string TestEmail()
        {
            System.Collections.Specialized.NameValueCollection forms = Request.Form;

            try
            {
                /* smtp.gmail.com, 587 */
                System.Net.NetworkCredential loginInfo = new System.Net.NetworkCredential(forms["USERNAME"], forms["PASSWORD"]);
                MailMessage msg = new MailMessage();

                SmtpClient smtpClient = new SmtpClient(forms["SERVERNAME"], Int32.Parse(forms["PORTNO"]));
                smtpClient.EnableSsl = true;
                smtpClient.UseDefaultCredentials = false;
                smtpClient.Credentials = loginInfo;

                msg.From = new MailAddress(forms["DEFAULTMAIL"]);
                msg.To.Add(new MailAddress("chandnipatel1010@gmail.com"));//tlsoftemptwo@gmail.com
                msg.Subject = "Test Mail";
                msg.Body = "This is for testing";
                msg.IsBodyHtml = false;
                smtpClient.Send(msg);
            }
            catch (Exception ex)
            {
                return ex.ToString();
            }
            return "Mail sent";
        }

        public string SetAccountYearSession(int AccountYearId, int BranchId)
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
                XMLValue = "<SERVICEREQUEST><SERVICENAME>USER_CURRENTACCOUNTYEAR_CRUD</SERVICENAME>" +
                            "<EMPID>" + SessionFacade.UserSession.USERID + "</EMPID>" +
                            "<SECUREKEY>" + SessionFacade.UserSession.TOKEN + "</SECUREKEY>" +
                            "<ACCOUNTYEARID>" + AccountYearId + "</ACCOUNTYEARID>" +
                            "<EMPBRANCHID>" + BranchId + "</EMPBRANCHID>" +
                            "<USERTYPE>" + SessionFacade.UserSession.USERTYPE + "</USERTYPE>" +
                            "<LOGINID>" + SessionFacade.UserSession.USERID + "</LOGINID>" +
                            "<LOGINIPADDRESS>" + publicip + "</LOGINIPADDRESS>" +
                "</SERVICEREQUEST>";

                ContactBook_InterfaceClient proxy = new ContactBook_InterfaceClient();
                XMLValue = proxy.PERFORM_ACTIONS(XMLValue);
                XmlDocument doc = new XmlDocument();
                doc.LoadXml(XMLValue);

                if (doc.SelectSingleNode("SERVICERESPONSE//RESPONSECODE").InnerText == "0") // USER AUTHENTICATION OK
                {
                    SessionFacade.UserSession.ACCOUNTYEARID = AccountYearId;
                    SessionFacade.UserSession.EMPBRANCHID = BranchId;
                    SessionFacade.UserSession.PUBLICIP = publicip;
                    SessionFacade.UserSession.CURRENCYCODE = doc.SelectSingleNode("SERVICERESPONSE//CURRCODE").InnerText;
                    SessionFacade.UserSession.FLAGIMG = doc.SelectSingleNode("SERVICERESPONSE//CURRCODE").InnerText;
                    SessionFacade.UserSession.LANGUAGE = doc.SelectSingleNode("SERVICERESPONSE//LANGUAGE").InnerText;
                }
                return doc.InnerXml.ToString();
            }
            catch (Exception ex)
            {
                return GenerateXml.GetExceptionXMLResponse(ex);
            }
        }
        public string SetModuleSession(string ModuleName)
        {
            try
            {
                SessionFacade.SelectedModuleName = ModuleName;
                return "<SERVICERESPONSE><RESPONSECODE>0</RESPONSECODE><RESPONSEMESSAGE>success</RESPONSEMESSAGE></SERVICERESPONSE>";
            }
            catch (Exception ex)
            {
                return GenerateXml.GetExceptionXMLResponse(ex);
            }
        }

        public JsonResult SaveImageToPhysicalPath(string PhysicalPath, string deletedfiles, string savefiles)
        {
            try
            {
                string VirtualDirectory = System.Configuration.ConfigurationManager.AppSettings["domainPath"];

                if (VirtualDirectory != "")
                {
                    if (!string.IsNullOrEmpty(deletedfiles))
                    { deletedfiles = deletedfiles.Replace(VirtualDirectory, ""); }

                    if (!string.IsNullOrEmpty(savefiles))
                    { savefiles = savefiles.Replace(VirtualDirectory, ""); }
                }

                // delete files from directory
                if (deletedfiles != string.Empty)
                {
                    string[] deletedfilesArr = deletedfiles.Split(',');
                    if (deletedfilesArr.Length > 0)
                    {
                        int i = 0;
                        for (; i < deletedfilesArr.Length; i++)
                        {
                            if (deletedfilesArr[i] != string.Empty)
                            {
                                if (deletedfilesArr[i].Contains("/UploadFiles/Temp/"))
                                {
                                    string deleteFilePath = Server.MapPath("~" + deletedfilesArr[i]);
                                    if (System.IO.File.Exists(deleteFilePath))
                                        System.IO.File.Delete(deleteFilePath);
                                }
                                string destFile = PhysicalPath;
                                string destServerpath = destFile + deletedfilesArr[i];
                                //string deleteFilePath = Server.MapPath("~" + deletedfilesArr[i]);
                                if (System.IO.File.Exists(destServerpath))
                                    System.IO.File.Delete(destServerpath);
                            }
                        }
                    }
                }

                if (savefiles != string.Empty)
                {
                    string destFile = PhysicalPath;
                    string destServerpath = destFile;

                    if (!System.IO.Directory.Exists(destServerpath))
                        System.IO.Directory.CreateDirectory(destServerpath);

                    // Save file to Original folder
                    string[] savefilesArr = savefiles.Split(',');
                    string savefilePath;
                    if (savefilesArr.Length > 0)
                    {
                        int i = 0;
                        for (; i < savefilesArr.Length; i++)
                        {
                            if (savefilesArr[i] != string.Empty)
                            {
                                if (savefilesArr[i].Contains("/UploadFiles/Temp/"))
                                {
                                    savefilePath = Server.MapPath("~" + savefilesArr[i]);
                                    if (System.IO.File.Exists(savefilePath))
                                    {
                                        if (System.IO.File.Exists(destServerpath + System.IO.Path.GetFileName(savefilesArr[i])) == false)
                                            System.IO.File.Copy(savefilePath, destServerpath + System.IO.Path.GetFileName(savefilesArr[i]));

                                        System.IO.File.Delete(savefilePath);
                                    }
                                }
                            }
                        }
                    }
                    return Json("success", JsonRequestBehavior.AllowGet);
                }
                else
                {
                    return Json("", JsonRequestBehavior.AllowGet);
                }
            }
            catch (Exception ex)
            {
                return Json("error: " + ex.Message, JsonRequestBehavior.AllowGet);
            }
        }
        public JsonResult SaveImageWithThumb(string ImgPath, string deletedfiles, string savefiles, int width, int height)
        {
            try
            {
                string VirtualDirectory = System.Configuration.ConfigurationManager.AppSettings["domainPath"];

                if (VirtualDirectory != "")
                {
                    if (!string.IsNullOrEmpty(deletedfiles))
                    { deletedfiles = deletedfiles.Replace(VirtualDirectory, ""); }

                    if (!string.IsNullOrEmpty(savefiles))
                    { savefiles = savefiles.Replace(VirtualDirectory, ""); }
                }

                // delete files from directory
                if (deletedfiles != string.Empty)
                {
                    string[] deletedfilesArr = deletedfiles.Split(',');
                    if (deletedfilesArr.Length > 0)
                    {
                        int i = 0;
                        for (; i < deletedfilesArr.Length; i++)
                        {
                            if (deletedfilesArr[i] != string.Empty)
                            {
                                if (deletedfilesArr[i].Contains("/UploadFiles/Temp/"))
                                {
                                    string deleteFilePath = Server.MapPath("~" + deletedfilesArr[i]);
                                    if (System.IO.File.Exists(deleteFilePath))
                                        System.IO.File.Delete(deleteFilePath);
                                }
                                string destFile = ImgPath;
                                string destServerpath = destFile + deletedfilesArr[i];
                                //string deleteFilePath = Server.MapPath("~" + deletedfilesArr[i]);
                                if (System.IO.File.Exists(destServerpath))
                                    System.IO.File.Delete(destServerpath);

                                /*----------------------------delete thumnails--------------------------*/
                                destFile += "thumb/";
                                destServerpath = destFile + deletedfilesArr[i];
                                if (System.IO.File.Exists(destServerpath))
                                    System.IO.File.Delete(destServerpath);
                                /*----------------------------delete thumnails--------------------------*/
                            }
                        }
                    }
                }

                if (savefiles != string.Empty)
                {
                    string destFile = ImgPath;
                    string destServerpath = destFile;

                    if (!System.IO.Directory.Exists(destServerpath))
                        System.IO.Directory.CreateDirectory(destServerpath);

                    // Save file to Original folder
                    string[] savefilesArr = savefiles.Split(',');
                    string savefilePath;
                    if (savefilesArr.Length > 0)
                    {
                        int i = 0;
                        for (; i < savefilesArr.Length; i++)
                        {
                            if (savefilesArr[i] != string.Empty)
                            {
                                if (savefilesArr[i].Contains("/UploadFiles/Temp/"))
                                {
                                    savefilePath = Server.MapPath("~" + savefilesArr[i]);
                                    if (System.IO.File.Exists(savefilePath))
                                    {
                                        if (System.IO.File.Exists(destServerpath + System.IO.Path.GetFileName(savefilesArr[i])) == false)
                                        {
                                            System.IO.File.Copy(savefilePath, destServerpath + System.IO.Path.GetFileName(savefilesArr[i]));
                                            ResizeImage(width, height, savefilePath, destServerpath);
                                        }

                                        System.IO.File.Delete(savefilePath);
                                    }
                                }
                            }
                        }
                    }
                    return Json("success", JsonRequestBehavior.AllowGet);
                }
                else
                {
                    return Json("", JsonRequestBehavior.AllowGet);
                }
            }
            catch (Exception ex)
            {
                return Json("error: " + ex.Message, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult RenameDesignFiles(string ImgPath, string filenames, string designcode)
        {
            try
            {
                string[] filesArr = filenames.Split(',');
                if (filesArr.Length > 0)
                {
                    string fulloldfilePath, fullnewfilePath, oldfilename, newfilename;
                    string thumbFile = "thumb/", fulloldthumbfilePath, fullnewthumbfilePath;
                    int i = 0;
                    for (; i < filesArr.Length; i++)
                    {
                        if (filesArr[i] != string.Empty)
                        {
                            newfilename = System.IO.Path.GetFileName(filesArr[i]);
                            //if (filesArr[i].Contains(designcode + "_"))
                            //{
                            //    oldfilename = filesArr[i].Replace(designcode + "_", "");
                            //    fulloldfilePath = ImgPath + System.IO.Path.GetFileName(oldfilename);
                            //    fulloldthumbfilePath = ImgPath + thumbFile + System.IO.Path.GetFileName(oldfilename);
                            //    if (System.IO.File.Exists(fulloldfilePath))
                            //    {
                            //        fullnewfilePath = ImgPath + newfilename;
                            //        if (!System.IO.File.Exists(fullnewfilePath))
                            //        {
                            //            System.IO.File.Move(fulloldfilePath, fullnewfilePath);
                            //        }
                            //    }
                            //    if (System.IO.File.Exists(fulloldthumbfilePath))
                            //    {
                            //        fullnewthumbfilePath = ImgPath + thumbFile + newfilename;
                            //        if (!System.IO.File.Exists(fullnewthumbfilePath))
                            //        {
                            //            System.IO.File.Move(fulloldthumbfilePath, fullnewthumbfilePath);
                            //        }
                            //    }
                            //}

                            fulloldfilePath = ImgPath + System.IO.Path.GetFileName(filesArr[i]);
                            fulloldthumbfilePath = ImgPath + thumbFile + System.IO.Path.GetFileName(filesArr[i]);
                            if (System.IO.File.Exists(fulloldfilePath))
                            {
                                fullnewfilePath = ImgPath + designcode + "/" + newfilename;

                                if (!System.IO.Directory.Exists(ImgPath + designcode))
                                    System.IO.Directory.CreateDirectory(ImgPath + designcode);

                                if (!System.IO.File.Exists(fullnewfilePath))
                                {
                                    System.IO.File.Move(fulloldfilePath, fullnewfilePath);
                                }
                            }
                            if (System.IO.File.Exists(fulloldthumbfilePath))
                            {
                                fullnewthumbfilePath = ImgPath + designcode + "/" + thumbFile + newfilename;

                                if (!System.IO.Directory.Exists(ImgPath + designcode + "/" + thumbFile))
                                    System.IO.Directory.CreateDirectory(ImgPath + designcode + "/" + thumbFile);

                                if (!System.IO.File.Exists(fullnewthumbfilePath))
                                {
                                    System.IO.File.Move(fulloldthumbfilePath, fullnewthumbfilePath);
                                }
                            }
                        }
                    }
                }
                return Json("success", JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json("error: " + ex.Message, JsonRequestBehavior.AllowGet);
            }
        }

        public string DeleteDesignCodeFolder(string DesignCodePath)
        {
            try
            {
                if (System.IO.Directory.Exists(DesignCodePath))
                    System.IO.Directory.Delete(DesignCodePath, true);

                return "Success";
            }
            catch (Exception ex)
            {
                return "Error: " + ex.Message;
            }
        }

        public void ResizeImage(int width, int height, string filename, string destServerpath)
        {
            var ext = Path.GetFileName(filename);
            var ex2 = Path.GetExtension(ext);
            if (ex2 != ".mp4")
            {
                //string destPath = Path.GetDirectoryName(filename) + "\\Resize\\";
                string destPath = destServerpath + "thumb\\";
                if (!Directory.Exists(destPath))
                    Directory.CreateDirectory(destPath);
                destPath = destPath + Path.GetFileName(filename);


                FileStream fs = new FileStream(filename, FileMode.Open, FileAccess.Read, FileShare.Read);
                // resize file
                Bitmap image = new Bitmap(fs);
                fs.Close();
                Bitmap resizedImage = new Bitmap(width, height);
                using (Graphics gfx = Graphics.FromImage(resizedImage))
                {
                    gfx.CompositingQuality = CompositingQuality.HighQuality;
                    gfx.InterpolationMode = InterpolationMode.Bicubic;
                    gfx.SmoothingMode = SmoothingMode.HighQuality;
                    gfx.PixelOffsetMode = PixelOffsetMode.HighQuality;
                    using (var wrapMode = new ImageAttributes())
                    {
                        wrapMode.SetWrapMode(WrapMode.TileFlipXY);
                        gfx.DrawImage(image, new Rectangle(0, 0, width, height), 0, 0, image.Width, image.Height, GraphicsUnit.Pixel, wrapMode);
                    }
                }
                resizedImage.Save(destPath);
            }
        }
        public string convertstring(string imagestring)
        {
            string DomainPath = System.Configuration.ConfigurationManager.AppSettings["domainPath"];
            string destFile = "/UploadFiles/Temp/";
            string destServerpath = Server.MapPath("~" + destFile);
            int index = imagestring.IndexOf(',');
            string final = imagestring.Substring(index + 1);
            string imgname = Guid.NewGuid() + ".jpg".ToString();
            System.IO.File.WriteAllBytes(destServerpath + imgname, Convert.FromBase64String(final));
            return DomainPath + destFile + imgname;
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

        public string jsontest(string makeurl)
        {

            string key_value = System.Configuration.ConfigurationManager.AppSettings["access_key"];

            //var makeurl = ("http://api.coinlayer.com/exchangerates_data/latest" + "?symbols=" + currencies + "&base=" + source);
            try
            {
                var client = new RestClient(makeurl);
                client.Timeout = -1;

                var request = new RestRequest(Method.GET);
                request.AddHeader("apikey", "ZUiLaRzbhDwZZhhFNc9gvjATglQaGJaH");

                IRestResponse response = client.Execute(request);
                return (response.Content);
            }
            catch (Exception ex)
            {
                return "Error: " + ex.Message;
            }
        }
    }
}