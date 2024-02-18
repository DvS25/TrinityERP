using Addressbook.CommonClasses;
using Addressbook.ServiceReference1;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Convert = System.Convert;
using MemoryStream = System.IO.MemoryStream;
using Image = System.Drawing.Image;
using System.Xml;
using CrystalDecisions.CrystalReports.Engine;
using System.Data;
using CrystalDecisions.Shared;

namespace Addressbook.Controllers
{
    public class SharingController : Controller
    {
        // GET: Sharing
        public ActionResult DesignShared(string ShareId)
        {
            ViewBag.ShareId = ShareId;
            return View();
        }

        public ActionResult VoucherView(string VoucherId, string VoucherType)
        {

            ViewBag.VoucherId = VoucherId;
            ViewBag.VoucherType = VoucherType;
            return View();
        }

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
                return XMLValue;
            }
            catch (Exception ex)
            {
                return GenerateXml.GetExceptionXMLResponse(ex);
            }
        }

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

                return XMLValue;
            }
            catch (Exception ex)
            {
                return GenerateXml.GetExceptionXMLResponse(ex);
            }


        }

        public string SaveVoucherSignature(string VoucherId, string VoucherType, string base64String)
        {
            try
            {
                String path = Server.MapPath("~/UploadFiles/Signature/"); //Path

                //Check if directory exist
                if (!System.IO.Directory.Exists(path))
                {
                    System.IO.Directory.CreateDirectory(path);   //Create directory if it doesn't exist
                }

                string imageName = VoucherType + "_" + VoucherId + ".png";

                //set the image path
                string imgPath = Path.Combine(path, imageName);

                byte[] imageBytes = Convert.FromBase64String(base64String);

                System.IO.File.WriteAllBytes(imgPath, imageBytes);

                Image img = Image.FromFile(imgPath);
                Bitmap bmp = new Bitmap(img.Width, img.Height, System.Drawing.Imaging.PixelFormat.Format32bppArgb);
                using (Graphics g = Graphics.FromImage(bmp))
                {
                    g.Clear(Color.White);
                    g.DrawImage(img, new Rectangle(new Point(), img.Size), new Rectangle(new Point(), img.Size), GraphicsUnit.Pixel);
                }
                bmp.Save(imgPath.Replace(".png", ".jpeg"), System.Drawing.Imaging.ImageFormat.Jpeg);
                img.Dispose();
                System.IO.File.Delete(imgPath);

                return "success";

            }
            catch (Exception ex)
            {
                return "Error : " + ex.Message;
            }
        }

        public string VoucherPrintGet(string VoucherId, string vouchertype)
        {
            try
            {
                string XMLValue = string.Empty;
                string Response = string.Empty;

                string ServiceName = "";

                if (vouchertype == "CashBankBook")
                {
                    ServiceName = "ACC_CASHBANKBOOK_PRINT_GET";
                }
                else if (vouchertype == "GeneralExpense")
                {
                    ServiceName = "ACC_GENERALEXPENSE_PRINT_GET";
                }
                else if (vouchertype == "Jewellery Sale")
                {
                    ServiceName = "ACC_JEWELLERYTRANSACTION_PRINT_GET";
                }
                else if (vouchertype == "Jewellery Export")
                {
                    ServiceName = "ACC_MIX_EXPORT_PRINT_GET";
                }
                else if (vouchertype == "Material Sale")
                {
                    ServiceName = "ACC_MATERIALTRANSACTION_PRINT_GET";
                }
                else if (vouchertype == "Material Export")
                {
                    ServiceName = "ACC_MATERIAL_EXPORT_PRINT_GET";
                }
                else if (vouchertype == "OrderMaster")
                {
                    ServiceName = "ACC_ORDERMASTER_PRINT_GET";
                }
                else if (vouchertype == "QuatationMaster")
                {
                    ServiceName = "ACC_QUOTATIONMASTER_PRINT_GET";
                }

                XMLValue = "<SERVICEREQUEST><SERVICENAME>" + ServiceName + "</SERVICENAME>" +
                            "<VOUCHERID>" + VoucherId + "</VOUCHERID>" +
                            "<VOUCHERTYPE>" + vouchertype + "</VOUCHERTYPE>" +
                            "</SERVICEREQUEST>";

                ContactBook_InterfaceClient proxy = new ContactBook_InterfaceClient();
                XMLValue = proxy.PERFORM_ACTIONS(XMLValue);
                XmlDocument doc = new XmlDocument();
                doc.LoadXml(XMLValue);

                if (doc.SelectSingleNode("SERVICERESPONSE//RESPONSECODE").InnerText == "0")
                {

                    if (doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//SUBBOOK").InnerText == "Jewellery Sale")
                    {
                        Response = JewellerySaleVoucherPrint(doc);
                    }
                    else if (doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//SUBBOOK").InnerText == "Material Sale")
                    {
                        Response = MaterialVoucherPrint(doc);
                    }
                    else if (doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//SUBBOOK").InnerText == "Jewellery Export")
                    {
                        Response = ExportVoucherPrint(doc);
                    }
                    else if (doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//SUBBOOK").InnerText == "Material Export")
                    {
                        Response = MaterialExportVoucherPrint(doc);
                    }
                    return Response;
                }
                else
                {
                    return "Error : " + doc.SelectSingleNode("SERVICERESPONSE//RESPONSEMESSAGE").InnerText;
                }
            }
            catch (Exception ex)
            {
                return "Error : " + ex.Message;
            }
        }

        public string MaterialVoucherPrint(XmlDocument doc)
        {
            string path1 = "";

            try
            {

                ReportDocument cryRpt = new ReportDocument();

                path1 = "/CrystalReports/MaterialSale.rpt";
                string path = Server.MapPath("~" + path1);
                cryRpt.Load(path);

                if (doc.SelectSingleNode("SERVICERESPONSE//RESPONSECODE").InnerText == "0")
                {
                    DataTable MaterialSale = new DataTable();
                    MaterialSale.Columns.Add("DescriptionOfGoods", typeof(string));
                    MaterialSale.Columns.Add("HSN", typeof(string));
                    MaterialSale.Columns.Add("Shape", typeof(string));
                    MaterialSale.Columns.Add("Size", typeof(string));
                    MaterialSale.Columns.Add("Purity", typeof(string));
                    MaterialSale.Columns.Add("Color", typeof(string));
                    MaterialSale.Columns.Add("Weight", typeof(decimal));
                    MaterialSale.Columns.Add("Rate", typeof(decimal));
                    MaterialSale.Columns.Add("Amount", typeof(decimal));

                    if (doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST") != null)
                    {
                        if (doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//VOUCHERDETAILS") != null)
                        {
                            XmlNodeList Items = doc.SelectNodes("SERVICERESPONSE//VOUCHERLIST//VOUCHERDETAILS");
                            foreach (XmlNode node in Items)
                            {
                                MaterialSale.Rows.Add(node["RMNAME"].InnerText,
                                                          node["HSNCODENAME"].InnerText,
                                                          node["SHAPE"].InnerText,
                                                          node["CHARNI"].InnerText,
                                                          node["PURITY"].InnerText,
                                                          node["COLOUR"].InnerText,
                                                          node["WGT"].InnerText,
                                                          node["RATE"].InnerText,
                                                          node["AMOUNT"].InnerText);
                            }
                        }
                        cryRpt.OpenSubreport("SubReport_MaterialItems").SetDataSource(MaterialSale);
                    }
                    if (doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST") != null)
                    {
                        /* Company Details */
                        if (doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//COMPANYNAME") != null)
                            cryRpt.SetParameterValue("CompanyName", doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//COMPANYNAME").InnerText);

                        if (doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//ADDRESS") != null)
                            cryRpt.SetParameterValue("BranchAddress", doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//ADDRESS").InnerText);
                        else
                            cryRpt.SetParameterValue("BranchAddress", "");

                        if (doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//MOBILENO") != null)
                            cryRpt.SetParameterValue("BranchContactNo", doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//MOBILENO").InnerText);
                        else
                            cryRpt.SetParameterValue("BranchContactNo", "");

                        if (doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//EMAILID") != null)
                            cryRpt.SetParameterValue("BranchEmailId", doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//EMAILID").InnerText);
                        else
                            cryRpt.SetParameterValue("BranchEmailId", "");

                        /* Invoice Details */
                        if (doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//VOUCHERNO") != null)
                            cryRpt.SetParameterValue("InvoiceNo", doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//VOUCHERNO").InnerText);

                        if (doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//VOUCHERDATE") != null)
                            cryRpt.SetParameterValue("Date", doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//VOUCHERDATE").InnerText);

                        if (doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//SHIPPINGADDRESS") != null)
                            cryRpt.SetParameterValue("ShippingAddress", doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//SHIPPINGADDRESS").InnerText);
                        else
                            cryRpt.SetParameterValue("ShippingAddress", "");

                        /* Saler's Ref Details */
                        if (doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//ACKNO") != null)
                            cryRpt.SetParameterValue("AckNo", doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//ACKNO").InnerText);
                        else
                            cryRpt.SetParameterValue("AckNo", "");

                        if (doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//ACKDATE") != null)
                            cryRpt.SetParameterValue("AckDate", doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//ACKDATE").InnerText);
                        else
                            cryRpt.SetParameterValue("AckDate", "");

                        if (doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//IRNNO") != null)
                            cryRpt.SetParameterValue("IRNNo", doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//IRNNO").InnerText);
                        else
                            cryRpt.SetParameterValue("IRNNo", "");

                        if (doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//EWBNO") != null)
                            cryRpt.SetParameterValue("EWBNo", doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//EWBNO").InnerText);
                        else
                            cryRpt.SetParameterValue("EWBNo", "");

                        if (doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//EWBDATE") != null)
                            cryRpt.SetParameterValue("EWBDate", doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//EWBDATE").InnerText);
                        else
                            cryRpt.SetParameterValue("EWBDate", "");

                        if (doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//DUEDAYS") != null)
                            cryRpt.SetParameterValue("Duedays", doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//DUEDAYS").InnerText);
                        else
                            cryRpt.SetParameterValue("Duedays", "");

                        if (doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//BROKER") != null)
                            cryRpt.SetParameterValue("SuppeliersRef", doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//BROKER").InnerText);
                        else
                            cryRpt.SetParameterValue("SuppeliersRef", "");

                        if (doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//REMARK") != null)
                            cryRpt.SetParameterValue("Remark", doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//REMARK").InnerText);
                        else
                            cryRpt.SetParameterValue("Remark", "");

                        if (doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//STATECODE") != null)
                            cryRpt.SetParameterValue("PartyStateCode", doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//STATECODE").InnerText);
                        else
                            cryRpt.SetParameterValue("PartyStateCode", "");

                        if (doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//GSTNO") != null)
                            cryRpt.SetParameterValue("CompanyGstIn", doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//GSTNO").InnerText);
                        else
                            cryRpt.SetParameterValue("CompanyGstIn", "");

                        if (doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//PANNO") != null)
                            cryRpt.SetParameterValue("CompanyPAN", doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//PANNO").InnerText);
                        else
                            cryRpt.SetParameterValue("CompanyPAN", "");

                        if (doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//STATENAME") != null)
                            cryRpt.SetParameterValue("Destination", doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//STATENAME").InnerText);
                        else
                            cryRpt.SetParameterValue("Destination", "");

                        if (doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//DOCNO") != null)
                            cryRpt.SetParameterValue("DispatchDocNo", doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//DOCNO").InnerText);
                        else
                            cryRpt.SetParameterValue("DispatchDocNo", "");

                        if (doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//STATECODE") != null)
                            cryRpt.SetParameterValue("StateCode", doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//STATECODE").InnerText);
                        else
                            cryRpt.SetParameterValue("StateCode", "");

                        /* Bank Details */

                        if (doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//BANKNAME") != null)
                            cryRpt.SetParameterValue("Bank", doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//BANKNAME").InnerText);
                        else
                            cryRpt.SetParameterValue("Bank", "");

                        if (doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//BRANCHNAME") != null)
                            cryRpt.SetParameterValue("BankBranch", doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//BRANCHNAME").InnerText);
                        else
                            cryRpt.SetParameterValue("BankBranch", "");

                        if (doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//ACCNO") != null)
                            cryRpt.SetParameterValue("AccountNo", doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//ACCNO").InnerText);
                        else
                            cryRpt.SetParameterValue("AccountNo", "");

                        if (doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//IFSC") != null)
                            cryRpt.SetParameterValue("IFSCCode", doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//IFSC").InnerText);
                        else
                            cryRpt.SetParameterValue("IFSCCode", "");

                        /* Buyer Details */

                        if (doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//ACCOUNTNAME") != null)
                            cryRpt.SetParameterValue("PartyCompanyName", doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//ACCOUNTNAME").InnerText);

                        if (doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//PARTY_ADDRESS") != null)
                            cryRpt.SetParameterValue("PartyAddress", doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//PARTY_ADDRESS").InnerText);
                        else
                            cryRpt.SetParameterValue("PartyAddress", "");

                        if (doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//GSTNUM") != null)
                            cryRpt.SetParameterValue("buyersgst", doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//GSTNUM").InnerText);
                        else
                            cryRpt.SetParameterValue("buyersgst", "");

                        if (doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//PERSONNAME") != null)
                            cryRpt.SetParameterValue("ContactPerson", doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//PERSONNAME").InnerText);
                        else
                            cryRpt.SetParameterValue("ContactPerson", "");

                        if (doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//CONTACTNO") != null)
                            cryRpt.SetParameterValue("ContactNo", doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//CONTACTNO").InnerText);
                        else
                            cryRpt.SetParameterValue("ContactNo", "");

                        /* tbl Footer Details */

                        if (doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//FREIGHTCHARGES") != null)
                            cryRpt.SetParameterValue("FreightCharges", doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//FREIGHTCHARGES").InnerText);
                        else
                            cryRpt.SetParameterValue("FreightCharges", "");

                        if (doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//TAXABLEAMT") != null)
                            cryRpt.SetParameterValue("TaxableAmt", doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//TAXABLEAMT").InnerText);

                        if (doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//CGST_AMT") != null)
                            cryRpt.SetParameterValue("CGST", doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//CGST_AMT").InnerText);
                        else
                            cryRpt.SetParameterValue("CGST", 0);

                        if (doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//SGST_AMT") != null)
                            cryRpt.SetParameterValue("SGST", doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//SGST_AMT").InnerText);
                        else
                            cryRpt.SetParameterValue("SGST", 0);

                        if (doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//IGST_AMT") != null)
                            cryRpt.SetParameterValue("IGST", doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//IGST_AMT").InnerText);
                        else
                            cryRpt.SetParameterValue("IGST", 0);

                        if (doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//ROUNDOFF") != null)
                            cryRpt.SetParameterValue("RoundOff", doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//ROUNDOFF").InnerText);
                        else
                            cryRpt.SetParameterValue("RoundOff", "");

                        if (doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//FINALAMTINRS") != null)
                            cryRpt.SetParameterValue("AmtInRs", doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//FINALAMTINRS").InnerText);
                        else
                            cryRpt.SetParameterValue("AmtInRs", "");

                        if (doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//FINALAMTINRS") != null)
                            cryRpt.SetParameterValue("AmtInWords", doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//FINALAMTINRS").InnerText);
                        else
                            cryRpt.SetParameterValue("AmtInWords", "");

                        cryRpt.SetParameterValue("Buyersorderno", "");

                        /* SubReport_Items Footer Details */
                        if (doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//TOTALWGT") != null)
                            cryRpt.SetParameterValue("TWgt", doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//TOTALWGT").InnerText);
                        else
                            cryRpt.SetParameterValue("TWgt", "");

                        if (doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//SIGNEDQRCODE") != null)
                            cryRpt.SetParameterValue("QRCode", @System.Configuration.ConfigurationManager.AppSettings["ERPdomainPath"] + "UploadFiles/QrCode/" + doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//SIGNEDQRCODE").InnerText);
                        else
                            cryRpt.SetParameterValue("QRCode", "");

                        cryRpt.SetParameterValue("Sign", @System.Configuration.ConfigurationManager.AppSettings["ERPdomainPath"] + "UploadFiles/Signature/Material%20Sale_" + doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//MT_ID").InnerText + ".jpeg");
                        //cryRpt.SetParameterValue("QRCode", @System.Configuration.ConfigurationManager.AppSettings["ERPdomainPath"] + "UploadFiles/QrCode/" + doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//SIGNEDQRCODE").InnerText);

                    }
                    else
                    {
                        return "No data Found.";
                    }

                    string destFile = "/UploadFiles/Reports/";
                    string destServerpath = Server.MapPath("~" + destFile);
                    if (!Directory.Exists(destServerpath))
                    {
                        Directory.CreateDirectory(destServerpath);
                    }

                    string exportPath = destServerpath + "MaterialSale" + doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//MT_ID").InnerText + ".pdf";
                    cryRpt.ExportToDisk(ExportFormatType.PortableDocFormat, exportPath);
                    return destFile + "MaterialSale" + doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//MT_ID").InnerText + ".pdf";
                }
                else
                {
                    return "No data Found.";
                }
                //return "";
            }
            catch (Exception ex)
            {
                return "Error :" + ex.Message;
            }
        }

        public string JewellerySaleVoucherPrint(XmlDocument doc)
        {
            string path1 = "";

            try
            {
                ReportDocument cryRpt = new ReportDocument();

                path1 = "/CrystalReports/JewellerySale.rpt";
                string path = Server.MapPath("~" + path1);
                cryRpt.Load(path);

                if (doc.SelectSingleNode("SERVICERESPONSE//RESPONSECODE").InnerText == "0")
                {
                    DataTable JewellerySale = new DataTable();
                    JewellerySale.Columns.Add("DescOfGoods", typeof(string));
                    JewellerySale.Columns.Add("Quantity", typeof(string));
                    JewellerySale.Columns.Add("PurityKT", typeof(string));
                    JewellerySale.Columns.Add("GrossWgtGm", typeof(decimal));
                    JewellerySale.Columns.Add("NetWgt", typeof(decimal));
                    JewellerySale.Columns.Add("DiaWgtCt", typeof(decimal));
                    JewellerySale.Columns.Add("HSN", typeof(string));
                    JewellerySale.Columns.Add("Amount", typeof(decimal));

                    if (doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST") != null)
                    {
                        if (doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//VOUCHERDETAILS") != null)
                        {
                            XmlNodeList Items = doc.SelectNodes("SERVICERESPONSE//VOUCHERLIST//VOUCHERDETAILS");
                            foreach (XmlNode node in Items)
                            {
                                JewellerySale.Rows.Add(node["DESGCATE"].InnerText,
                                                          node["QTY"].InnerText,
                                                          node["PURITY"].InnerText,
                                                          node["GROSSWGT"].InnerText,
                                                          node["NETWGT"].InnerText,
                                                          node["TOTALDWGT"].InnerText,
                                                          node["HSNCODE"].InnerText,
                                                          node["TOTALAMOUNT"].InnerText);
                            }
                        }
                        cryRpt.OpenSubreport("SubReport_Items").SetDataSource(JewellerySale);
                    }
                    if (doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST") != null)
                    {
                        /* Company Details */
                        if (doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//COMPANYNAME") != null)
                            cryRpt.SetParameterValue("CompanyName", doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//COMPANYNAME").InnerText);

                        if (doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//ADDRESS") != null)
                            cryRpt.SetParameterValue("BranchAddress", doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//ADDRESS").InnerText);
                        else
                            cryRpt.SetParameterValue("BranchAddress", "");

                        if (doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//MOBILENO") != null)
                            cryRpt.SetParameterValue("BranchContactNo", doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//MOBILENO").InnerText);
                        else
                            cryRpt.SetParameterValue("BranchContactNo", "");

                        if (doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//EMAILID") != null)
                            cryRpt.SetParameterValue("BranchEmailId", doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//EMAILID").InnerText);
                        else
                            cryRpt.SetParameterValue("BranchEmailId", "");

                        /* Invoice Details */
                        if (doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//VOUCHERNO") != null)
                            cryRpt.SetParameterValue("InvoiceDate", doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//VOUCHERNO").InnerText);

                        if (doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//VOUCHERDATE") != null)
                            cryRpt.SetParameterValue("InvoiceNo", doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//VOUCHERDATE").InnerText);

                        if (doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//DUEDAYS") != null)
                            cryRpt.SetParameterValue("DueDays", doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//DUEDAYS").InnerText);
                        else
                            cryRpt.SetParameterValue("DueDays", "");

                        if (doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//BROKER") != null)
                            cryRpt.SetParameterValue("SuppRef", doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//BROKER").InnerText);
                        else
                            cryRpt.SetParameterValue("SuppRef", "");

                        cryRpt.SetParameterValue("BuyerOrderNo", "");
                        cryRpt.SetParameterValue("DispatchedPerson", "");
                        cryRpt.SetParameterValue("DispatchedAddress", "");

                        /* Saler's Ref Details */
                        if (doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//ACKNO") != null)
                            cryRpt.SetParameterValue("AckNo", doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//ACKNO").InnerText);
                        else
                            cryRpt.SetParameterValue("AckNo", "");

                        if (doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//ACKDATE") != null)
                            cryRpt.SetParameterValue("AckDate", doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//ACKDATE").InnerText);
                        else
                            cryRpt.SetParameterValue("AckDate", "");

                        if (doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//IRNNO") != null)
                            cryRpt.SetParameterValue("IRNNo", doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//IRNNO").InnerText);
                        else
                            cryRpt.SetParameterValue("IRNNo", "");

                        if (doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//EWBNO") != null)
                            cryRpt.SetParameterValue("EWBNo", doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//EWBNO").InnerText);
                        else
                            cryRpt.SetParameterValue("EWBNo", "");

                        if (doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//EWBDATE") != null)
                            cryRpt.SetParameterValue("EWBDate", doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//EWBDATE").InnerText);
                        else
                            cryRpt.SetParameterValue("EWBDate", "");

                        if (doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//GSTNO") != null)
                            cryRpt.SetParameterValue("GSTNo", doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//GSTNO").InnerText);
                        else
                            cryRpt.SetParameterValue("GSTNo", "");

                        if (doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//PANNO") != null)
                            cryRpt.SetParameterValue("PANNo", doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//PANNO").InnerText);
                        else
                            cryRpt.SetParameterValue("PANNo", "");

                        if (doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//STATENAME") != null)
                            cryRpt.SetParameterValue("StateName", doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//STATENAME").InnerText);
                        else
                            cryRpt.SetParameterValue("StateName", "");

                        if (doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//STATECODE") != null)
                            cryRpt.SetParameterValue("StateCode", doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//STATECODE").InnerText);
                        else
                            cryRpt.SetParameterValue("StateCode", "");

                        /* Bank Details */

                        if (doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//BANKNAME") != null)
                            cryRpt.SetParameterValue("BankName", doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//BANKNAME").InnerText);
                        else
                            cryRpt.SetParameterValue("BankName", "");

                        if (doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//BRANCHNAME") != null)
                            cryRpt.SetParameterValue("Branch", doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//BRANCHNAME").InnerText);
                        else
                            cryRpt.SetParameterValue("Branch", "");

                        if (doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//ACCNO") != null)
                            cryRpt.SetParameterValue("AccountNo", doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//ACCNO").InnerText);
                        else
                            cryRpt.SetParameterValue("AccountNo", "");

                        if (doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//IFSC") != null)
                            cryRpt.SetParameterValue("IFSC", doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//IFSC").InnerText);
                        else
                            cryRpt.SetParameterValue("IFSC", "");

                        /* Buyer Details */

                        if (doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//ACCOUNTNAME") != null)
                            cryRpt.SetParameterValue("PartyName", doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//ACCOUNTNAME").InnerText);

                        if (doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//PARTY_ADDRESS") != null)
                            cryRpt.SetParameterValue("PartyAddress", doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//PARTY_ADDRESS").InnerText);
                        else
                            cryRpt.SetParameterValue("PartyAddress", "");

                        if (doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//GSTNO") != null)
                            cryRpt.SetParameterValue("BuyerGST", doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//GSTNUM").InnerText);
                        else
                            cryRpt.SetParameterValue("BuyerGST", "");

                        if (doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//PERSONNAME") != null)
                            cryRpt.SetParameterValue("ContactPerson", doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//PERSONNAME").InnerText);
                        else
                            cryRpt.SetParameterValue("ContactPerson", "");

                        if (doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//CONTACTNO") != null)
                            cryRpt.SetParameterValue("ContactNo", doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//CONTACTNO").InnerText);
                        else
                            cryRpt.SetParameterValue("ContactNo", "");

                        /* tbl Footer Details */

                        if (doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//FREIGHTCHARGES") != null)
                            cryRpt.SetParameterValue("FreightCharges", doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//FREIGHTCHARGES").InnerText);
                        else
                            cryRpt.SetParameterValue("FreightCharges", "0.00");

                        if (doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//TAXABLEAMT") != null)
                            cryRpt.SetParameterValue("TaxableAmount", doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//TAXABLEAMT").InnerText);

                        if (doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//CGST_AMT") != null)
                            cryRpt.SetParameterValue("CGST", doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//CGST_AMT").InnerText);
                        else
                            cryRpt.SetParameterValue("CGST", 0.00);

                        if (doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//SGST_AMT") != null)
                            cryRpt.SetParameterValue("SGST", doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//SGST_AMT").InnerText);
                        else
                            cryRpt.SetParameterValue("SGST", 0.00);

                        if (doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//IGST_AMT") != null)
                            cryRpt.SetParameterValue("IGST", doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//IGST_AMT").InnerText);
                        else
                            cryRpt.SetParameterValue("IGST", 0.00);

                        if (doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//ROUNDOFF") != null)
                            cryRpt.SetParameterValue("RoundOff", doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//ROUNDOFF").InnerText);
                        else
                            cryRpt.SetParameterValue("RoundOff", "");

                        if (doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//FINALAMTINRS") != null)
                            cryRpt.SetParameterValue("AmountInRs", doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//FINALAMTINRS").InnerText);
                        else
                            cryRpt.SetParameterValue("AmountInRs", "");

                        if (doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//FINALAMTINRS") != null)
                            cryRpt.SetParameterValue("AmountInWords", doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//FINALAMTINRS").InnerText);
                        else
                            cryRpt.SetParameterValue("AmountInWords", "");

                        /* SubReport_Items Footer Details */

                        if (doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//GWGT_AMT") != null)
                            cryRpt.SetParameterValue("GWgtAmt", doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//GWGT_AMT").InnerText);
                        else
                            cryRpt.SetParameterValue("GWgtAmt", "");

                        if (doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//NWGT_AMT") != null)
                            cryRpt.SetParameterValue("NWgtAmt", doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//NWGT_AMT").InnerText);
                        else
                            cryRpt.SetParameterValue("NWgtAmt", "");

                        if (doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//DWGT_AMT") != null)
                            cryRpt.SetParameterValue("DWgtAmt", doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//DWGT_AMT").InnerText);
                        else
                            cryRpt.SetParameterValue("DWgtAmt", "");

                        if (doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//TOTALQTY") != null)
                            cryRpt.SetParameterValue("TotalQty", doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//TOTALQTY").InnerText);
                        else
                            cryRpt.SetParameterValue("TotalQty", "");


                        if (doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//SIGNEDQRCODE") != null)
                            cryRpt.SetParameterValue("QRCode", @System.Configuration.ConfigurationManager.AppSettings["ERPdomainPath"] + "UploadFiles/QrCode/" + doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//SIGNEDQRCODE").InnerText);
                        else
                            cryRpt.SetParameterValue("QRCode", "");

                        cryRpt.SetParameterValue("Sign", @System.Configuration.ConfigurationManager.AppSettings["ERPdomainPath"] + "UploadFiles/Signature/Jewellery%20Sale_" + doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//JT_ID").InnerText + ".jpeg");
                        //cryRpt.SetParameterValue("QRCode", @System.Configuration.ConfigurationManager.AppSettings["ERPdomainPath"] + "UploadFiles/QrCode/" + doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//SIGNEDQRCODE").InnerText);
                    }
                    else
                    {
                        return "No data Found.";
                    }

                    string destFile = "/UploadFiles/Reports/";
                    string destServerpath = Server.MapPath("~" + destFile);
                    if (!Directory.Exists(destServerpath))
                    {
                        Directory.CreateDirectory(destServerpath);
                    }

                    string exportPath = destServerpath + "JewellerySale" + doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//JT_ID").InnerText + ".pdf";
                    cryRpt.ExportToDisk(ExportFormatType.PortableDocFormat, exportPath);
                    return destFile + "JewellerySale" + doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//JT_ID").InnerText + ".pdf";
                }
                else
                {
                    return "Error : No data Found.";
                }
            }
            catch (Exception ex)
            {
                return "Error :" + ex.Message;
            }
        }

        public string ExportVoucherPrint(XmlDocument doc)
        {
            string path1 = "";

            try
            {
                ReportDocument cryRpt = new ReportDocument();

                path1 = "/CrystalReports/JewelleryExport.rpt";
                string path = Server.MapPath("~" + path1);
                cryRpt.Load(path);

                if (doc.SelectSingleNode("SERVICERESPONSE//RESPONSECODE").InnerText == "0")
                {
                    DataTable DataTable1 = new DataTable();
                    DataTable1.Columns.Add("NtWgtGm", typeof(decimal));
                    DataTable1.Columns.Add("WstGrm", typeof(decimal));
                    DataTable1.Columns.Add("Rate", typeof(decimal));
                    DataTable1.Columns.Add("Value", typeof(decimal));
                    DataTable1.Columns.Add("PureWgt", typeof(decimal));
                    DataTable1.Columns.Add("Wgt", typeof(decimal));
                    DataTable1.Columns.Add("VA", typeof(decimal));
                    DataTable1.Columns.Add("Charge", typeof(decimal));
                    DataTable1.Columns.Add("Type", typeof(string));
                    DataTable1.Columns.Add("Pcs", typeof(string));
                    DataTable1.Columns.Add("WgtCts", typeof(decimal));
                    DataTable1.Columns.Add("RBCval", typeof(decimal));
                    DataTable1.Columns.Add("FancyVal", typeof(decimal));
                    DataTable1.Columns.Add("FOBval", typeof(decimal));
                    DataTable1.Columns.Add("KTS", typeof(string));

                    DataTable DataTable2 = new DataTable();
                    DataTable2.Columns.Add("Carat", typeof(decimal));
                    DataTable2.Columns.Add("PCS", typeof(string));
                    DataTable2.Columns.Add("NetWgt", typeof(decimal));
                    DataTable2.Columns.Add("GrossWgt", typeof(decimal));
                    DataTable2.Columns.Add("DescOfGoods", typeof(string));
                    DataTable2.Columns.Add("Rate", typeof(decimal));
                    DataTable2.Columns.Add("Amount", typeof(decimal));
                    DataTable2.Columns.Add("WastAmt", typeof(decimal));
                    DataTable2.Columns.Add("WastGrm", typeof(decimal));

                    if (doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST") != null)
                    {
                        if (doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//VOUCHERDETAILS") != null)
                        {
                            XmlNodeList Items = doc.SelectNodes("SERVICERESPONSE//VOUCHERLIST//VOUCHERDETAILS");
                            foreach (XmlNode node in Items)
                            {
                                DataTable1.Rows.Add(node["NETWGT"].InnerText,
                                                          node["WASTGRM"].InnerText,
                                                          node["RATE"].InnerText,
                                                          node["VAL"].InnerText,
                                                          node["PUREWGT"].InnerText,
                                                          node["WGT"].InnerText,
                                                          node["VA"].InnerText,
                                                          node["CHARGE"].InnerText,
                                                          node["CPDTYPE"].InnerText,
                                                          node["PCS"].InnerText,
                                                          node["CTSWGT"].InnerText,
                                                          node["RBCVAL"].InnerText,
                                                          node["FANCYVAL"].InnerText,
                                                          node["FOBVAL"].InnerText,
                                                          node["PURITY"].InnerText);

                                DataTable2.Rows.Add(node["CARAT"].InnerText,
                                                         node["PCS"].InnerText,
                                                         node["NETWGT"].InnerText,
                                                         node["GROSSWGT"].InnerText,
                                                         node["DESCRIPTION"].InnerText,
                                                         node["RATE"].InnerText,
                                                         node["AMOUNT"].InnerText,
                                                         node["WASTAMT"].InnerText,
                                                         node["WASTGRM"].InnerText);
                            }
                        }
                        cryRpt.OpenSubreport("SubReports_Items").SetDataSource(DataTable1);
                        cryRpt.OpenSubreport("SubReport_ItemDetails").SetDataSource(DataTable2);
                    }

                    if (doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST") != null)
                    {
                        /* Company Details */
                        if (doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//COMPANYNAME") != null)
                            cryRpt.SetParameterValue("CompanyName", doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//COMPANYNAME").InnerText);

                        if (doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//ADDRESS") != null)
                            cryRpt.SetParameterValue("CompanyAddress", doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//ADDRESS").InnerText);
                        else
                            cryRpt.SetParameterValue("CompanyAddress", "");

                        if (doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//MOBILENO") != null)
                            cryRpt.SetParameterValue("CompanyContact", doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//MOBILENO").InnerText);
                        else
                            cryRpt.SetParameterValue("CompanyContact", "");

                        if (doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//EMAILID") != null)
                            cryRpt.SetParameterValue("CompanyEmail", doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//EMAILID").InnerText);
                        else
                            cryRpt.SetParameterValue("CompanyEmail", "");

                        /* Invoice Details */

                        if (doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//VOUCHERDATE") != null)
                            cryRpt.SetParameterValue("InvoiceDate", doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//VOUCHERDATE").InnerText);

                        if (doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//VOUCHERNO") != null)
                            cryRpt.SetParameterValue("InvoiceNo", doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//VOUCHERNO").InnerText);

                        /* Invoice Details */

                        if (doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//IECCODE") != null)
                            cryRpt.SetParameterValue("IECcode", doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//IECCODE").InnerText);
                        else
                            cryRpt.SetParameterValue("IECcode", "");

                        if (doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//PANNO") != null)
                            cryRpt.SetParameterValue("PANNo", doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//PANNO").InnerText);
                        else
                            cryRpt.SetParameterValue("PANNo", "");

                        if (doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//GSTNO") != null)
                            cryRpt.SetParameterValue("GSTNo", doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//GSTNO").InnerText);
                        else
                            cryRpt.SetParameterValue("GSTNo", "");

                        /* Company Details */
                        if (doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//ACCOUNTNAME") != null)
                            cryRpt.SetParameterValue("Consignee", doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//ACCOUNTNAME").InnerText);

                        if (doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//PARTY_ADDRESS") != null)
                            cryRpt.SetParameterValue("ConsigneeAddress", doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//PARTY_ADDRESS").InnerText);
                        else
                            cryRpt.SetParameterValue("ConsigneeAddress", "");

                        if (doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//PERSONNAME") != null)
                            cryRpt.SetParameterValue("ContactPerson", doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//PERSONNAME").InnerText);
                        else
                            cryRpt.SetParameterValue("ContactPerson", "");

                        if (doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//CONTACTNO") != null)
                            cryRpt.SetParameterValue("ContactNo", doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//CONTACTNO").InnerText);
                        else
                            cryRpt.SetParameterValue("ContactNo", "");

                        /* Buyer (If Other than consignee): Details */

                        if (doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//PARCEL_COMPANY") != null)
                            cryRpt.SetParameterValue("ParcelCompany", doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//PARCEL_COMPANY").InnerText);
                        else
                            cryRpt.SetParameterValue("ParcelCompany", "");

                        if (doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//COUNTRY_OF_ORIGIN_GOODS") != null)
                            cryRpt.SetParameterValue("CountryOfOriginGoods", doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//COUNTRY_OF_ORIGIN_GOODS").InnerText);
                        else
                            cryRpt.SetParameterValue("CountryOfOriginGoods", "");

                        if (doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//COUNTRY_OF_FINAL_DESTINATION") != null)
                            cryRpt.SetParameterValue("CountryOfFinalDestination", doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//COUNTRY_OF_FINAL_DESTINATION").InnerText);
                        else
                            cryRpt.SetParameterValue("CountryOfFinalDestination", "");

                        if (doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//BOX_DIM") != null)
                            cryRpt.SetParameterValue("BoxDim", doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//BOX_DIM").InnerText);
                        else
                            cryRpt.SetParameterValue("BoxDim", "");

                        if (doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//STATECODE") != null)
                            cryRpt.SetParameterValue("StateCode", doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//STATECODE").InnerText);
                        else
                            cryRpt.SetParameterValue("StateCode", "");

                        if (doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//DISTRICT_CODE") != null)
                            cryRpt.SetParameterValue("DistCode", doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//DISTRICT_CODE").InnerText);
                        else
                            cryRpt.SetParameterValue("DistCode", "");


                        /* Export's Details */

                        if (doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//PRE_CARRIAGE_BY") != null)
                            cryRpt.SetParameterValue("PreCarriageBy", doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//PRE_CARRIAGE_BY").InnerText);
                        else
                            cryRpt.SetParameterValue("PreCarriageBy", "");

                        if (doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//PLACE_OF_RECEIPT") != null)
                            cryRpt.SetParameterValue("ReceiptByPreCarrier", doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//PLACE_OF_RECEIPT").InnerText);
                        else
                            cryRpt.SetParameterValue("ReceiptByPreCarrier", "");

                        if (doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//FLIGHT_NO") != null)
                            cryRpt.SetParameterValue("FlightNo", doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//FLIGHT_NO").InnerText);
                        else
                            cryRpt.SetParameterValue("FlightNo", "");

                        if (doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//PORT_OF_LOADING") != null)
                            cryRpt.SetParameterValue("PortOfLanding", doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//PORT_OF_LOADING").InnerText);
                        else
                            cryRpt.SetParameterValue("PortOfLanding", "");

                        if (doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//PORT_OF_DISCHARGE") != null)
                            cryRpt.SetParameterValue("PortOfDischarge", doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//PORT_OF_DISCHARGE").InnerText);
                        else
                            cryRpt.SetParameterValue("PortOfDischarge", "");

                        if (doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//FINAL_DESTINATION") != null)
                            cryRpt.SetParameterValue("FinalDestination", doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//FINAL_DESTINATION").InnerText);
                        else
                            cryRpt.SetParameterValue("FinalDestination", "");

                        /* Gold Purchase Detail */

                        if (doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//SELLER") != null)
                            cryRpt.SetParameterValue("Seller", doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//SELLER").InnerText);
                        else
                            cryRpt.SetParameterValue("Seller", "");

                        if (doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//DATE") != null)
                            cryRpt.SetParameterValue("Date", doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//DATE").InnerText);
                        else
                            cryRpt.SetParameterValue("Date", "");

                        if (doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//WEIGHT_IN_GRM") != null)
                            cryRpt.SetParameterValue("Weight", doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//WEIGHT_IN_GRM").InnerText);
                        else
                            cryRpt.SetParameterValue("Weight", "");

                        if (doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//BILL_NO") != null)
                            cryRpt.SetParameterValue("BillNo", doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//BILL_NO").InnerText);
                        else
                            cryRpt.SetParameterValue("BillNo", "");

                        if (doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//CERTIFIED_PCS") != null)
                            cryRpt.SetParameterValue("CertifiedPcs", doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//CERTIFIED_PCS").InnerText);
                        else
                            cryRpt.SetParameterValue("CertifiedPcs", "");

                        cryRpt.SetParameterValue("AmtInWords", "");

                        /* Bank Detail */

                        if (doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//BANKNAME") != null)
                            cryRpt.SetParameterValue("BANKName", doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//BANKNAME").InnerText);
                        else
                            cryRpt.SetParameterValue("BANKName", "");

                        if (doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//BRANCHNAME") != null)
                            cryRpt.SetParameterValue("BankAddress", doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//BRANCHNAME").InnerText);
                        else
                            cryRpt.SetParameterValue("BankAddress", "");

                        /* Footer Total Detail */

                        if (doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//GWGT_AMT") != null)
                            cryRpt.SetParameterValue("GWgt", doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//GWGT_AMT").InnerText);
                        else
                            cryRpt.SetParameterValue("GWgt", "");

                        if (doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//TOTALQTY") != null)
                            cryRpt.SetParameterValue("Qty", doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//TOTALQTY").InnerText);
                        else
                            cryRpt.SetParameterValue("Qty", "");

                        if (doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//NWGT_AMT") != null)
                            cryRpt.SetParameterValue("NWgt", doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//NWGT_AMT").InnerText);
                        else
                            cryRpt.SetParameterValue("NWgt", "");

                        if (doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//METALVAL") != null)
                            cryRpt.SetParameterValue("MetalVal", doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//METALVAL").InnerText);
                        else
                            cryRpt.SetParameterValue("MetalVal", "0.00");

                        if (doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//CURR") != null)
                            cryRpt.SetParameterValue("CurrRate", doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//CURR").InnerText);
                        else
                            cryRpt.SetParameterValue("CurrRate", "0.00");

                        if (doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//GD") != null)
                            cryRpt.SetParameterValue("PERToz", doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//GD").InnerText);
                        else
                            cryRpt.SetParameterValue("PERToz", "0.00");

                        cryRpt.SetParameterValue("OrderNo", "21");
                        //cryRpt.SetParameterValue("MetalVal", "680.00");
                        cryRpt.SetParameterValue("StuddingVal", "170.00");
                        cryRpt.SetParameterValue("MakingVal", "260.00");
                        cryRpt.SetParameterValue("CutAndPolishedDia", "600.00");
                        cryRpt.SetParameterValue("ShippingCharges", "50.00");
                        cryRpt.SetParameterValue("FOB", "350.00");
                        cryRpt.SetParameterValue("CF", "1550.00");

                        //cryRpt.SetParameterValue("Sign", @System.Configuration.ConfigurationManager.AppSettings["ERPdomainPath"] + "UploadFiles/Signature/JewelleryTransaction_" + doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//JT_ID").InnerText + ".jpeg");
                        //+"_" + doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//MT_ID").InnerText
                    }
                    else
                    {
                        return "No data Found.";
                    }

                    string destFile = "/UploadFiles/Reports/";
                    string destServerpath = Server.MapPath("~" + destFile);
                    if (!Directory.Exists(destServerpath))
                    {
                        Directory.CreateDirectory(destServerpath);
                    }

                    string exportPath = destServerpath + "ExportInvoice" + doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//JT_ID").InnerText + ".pdf";
                    cryRpt.ExportToDisk(ExportFormatType.PortableDocFormat, exportPath);
                    return destFile + "ExportInvoice" + doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//JT_ID").InnerText + ".pdf";
                }
                else
                {
                    return "Error : No data Found.";
                }
            }
            catch (Exception ex)
            {
                return "Error :" + ex.Message;
            }
        }

        public string MaterialExportVoucherPrint(XmlDocument doc)
        {
            string path1 = "";

            try
            {
                ReportDocument cryRpt = new ReportDocument();

                path1 = "/CrystalReports/MaterialExport.rpt";
                string path = Server.MapPath("~" + path1);
                cryRpt.Load(path);

                if (doc.SelectSingleNode("SERVICERESPONSE//RESPONSECODE").InnerText == "0")
                {
                    DataTable DataTable1 = new DataTable();
                    DataTable1.Columns.Add("DescOfGoods", typeof(string));
                    DataTable1.Columns.Add("HSN", typeof(string));
                    DataTable1.Columns.Add("Pcs", typeof(string));
                    DataTable1.Columns.Add("Carat", typeof(decimal));
                    DataTable1.Columns.Add("Rate", typeof(decimal));
                    DataTable1.Columns.Add("Amount", typeof(decimal));

                    if (doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST") != null)
                    {
                        if (doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//VOUCHERDETAILS") != null)
                        {
                            XmlNodeList Items = doc.SelectNodes("SERVICERESPONSE//VOUCHERLIST//VOUCHERDETAILS");
                            foreach (XmlNode node in Items)
                            {
                                DataTable1.Rows.Add(node["DESCRIPTION"].InnerText,
                                                          node["HSN"].InnerText,
                                                          node["PCS"].InnerText,
                                                          node["CARAT"].InnerText,
                                                          node["RATE"].InnerText,
                                                          node["AMOUNT"].InnerText);
                            }
                        }
                        cryRpt.OpenSubreport("SubReport_Detail").SetDataSource(DataTable1);
                    }

                    if (doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST") != null)
                    {
                        /* Company Details */
                        if (doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//COMPANYNAME") != null)
                            cryRpt.SetParameterValue("CompanyName", doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//COMPANYNAME").InnerText);

                        if (doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//ADDRESS") != null)
                            cryRpt.SetParameterValue("CompanyAddress", doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//ADDRESS").InnerText);
                        else
                            cryRpt.SetParameterValue("CompanyAddress", "");

                        if (doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//MOBILENO") != null)
                            cryRpt.SetParameterValue("CompanyContact", doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//MOBILENO").InnerText);
                        else
                            cryRpt.SetParameterValue("CompanyContact", "");

                        if (doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//EMAILID") != null)
                            cryRpt.SetParameterValue("CompanyEmail", doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//EMAILID").InnerText);
                        else
                            cryRpt.SetParameterValue("CompanyEmail", "");

                        /* Invoice Details */

                        if (doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//VOUCHERDATE") != null)
                            cryRpt.SetParameterValue("InvoiceDate", doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//VOUCHERDATE").InnerText);

                        if (doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//VOUCHERNO") != null)
                            cryRpt.SetParameterValue("InvoiceNo", doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//VOUCHERNO").InnerText);

                        /* Invoice Details */

                        if (doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//IECCODE") != null)
                            cryRpt.SetParameterValue("IECcode", doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//IECCODE").InnerText);
                        else
                            cryRpt.SetParameterValue("IECcode", "");

                        if (doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//PANNO") != null)
                            cryRpt.SetParameterValue("PANNo", doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//PANNO").InnerText);
                        else
                            cryRpt.SetParameterValue("PANNo", "");

                        if (doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//GSTNO") != null)
                            cryRpt.SetParameterValue("GSTNo", doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//GSTNO").InnerText);
                        else
                            cryRpt.SetParameterValue("GSTNo", "");

                        /* Company Details */
                        if (doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//ACCOUNTNAME") != null)
                            cryRpt.SetParameterValue("Consignee", doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//ACCOUNTNAME").InnerText);

                        if (doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//PARTY_ADDRESS") != null)
                            cryRpt.SetParameterValue("ConsigneeAddress", doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//PARTY_ADDRESS").InnerText);
                        else
                            cryRpt.SetParameterValue("ConsigneeAddress", "");

                        if (doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//PERSONNAME") != null)
                            cryRpt.SetParameterValue("ContactPerson", doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//PERSONNAME").InnerText);
                        else
                            cryRpt.SetParameterValue("ContactPerson", "");

                        if (doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//CONTACTNO") != null)
                            cryRpt.SetParameterValue("ContactNo", doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//CONTACTNO").InnerText);
                        else
                            cryRpt.SetParameterValue("ContactNo", "");

                        /* Buyer (If Other than consignee): Details */

                        if (doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//PARCEL_COMPANY") != null)
                            cryRpt.SetParameterValue("ParcelCompany", doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//PARCEL_COMPANY").InnerText);
                        else
                            cryRpt.SetParameterValue("ParcelCompany", "");

                        if (doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//COUNTRY_OF_ORIGIN_GOODS") != null)
                            cryRpt.SetParameterValue("CountryOfOriginGoods", doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//COUNTRY_OF_ORIGIN_GOODS").InnerText);
                        else
                            cryRpt.SetParameterValue("CountryOfOriginGoods", "");

                        if (doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//COUNTRY_OF_FINAL_DESTINATION") != null)
                            cryRpt.SetParameterValue("CntryOfFinalDest", doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//COUNTRY_OF_FINAL_DESTINATION").InnerText);
                        else
                            cryRpt.SetParameterValue("CntryOfFinalDest", "");

                        if (doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//BOX_DIM") != null)
                            cryRpt.SetParameterValue("BoxDim", doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//BOX_DIM").InnerText);
                        else
                            cryRpt.SetParameterValue("BoxDim", "");

                        if (doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//STATECODE") != null)
                            cryRpt.SetParameterValue("StateCode", doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//STATECODE").InnerText);
                        else
                            cryRpt.SetParameterValue("StateCode", "");

                        if (doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//DISTRICT_CODE") != null)
                            cryRpt.SetParameterValue("DistCode", doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//DISTRICT_CODE").InnerText);
                        else
                            cryRpt.SetParameterValue("DistCode", "");


                        /* Export's Details */

                        if (doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//PRE_CARRIAGE_BY") != null)
                            cryRpt.SetParameterValue("PreCarriageBy", doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//PRE_CARRIAGE_BY").InnerText);
                        else
                            cryRpt.SetParameterValue("PreCarriageBy", "");

                        if (doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//PLACE_OF_RECEIPT") != null)
                            cryRpt.SetParameterValue("PlaceOfReceiptByPreCarrier", doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//PLACE_OF_RECEIPT").InnerText);
                        else
                            cryRpt.SetParameterValue("PlaceOfReceiptByPreCarrier", "");

                        if (doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//FLIGHT_NO") != null)
                            cryRpt.SetParameterValue("FlightNo", doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//FLIGHT_NO").InnerText);
                        else
                            cryRpt.SetParameterValue("FlightNo", "");

                        if (doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//PORT_OF_LOADING") != null)
                            cryRpt.SetParameterValue("PortOfLoading", doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//PORT_OF_LOADING").InnerText);
                        else
                            cryRpt.SetParameterValue("PortOfLoading", "");

                        if (doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//PORT_OF_DISCHARGE") != null)
                            cryRpt.SetParameterValue("PortOfDischarge", doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//PORT_OF_DISCHARGE").InnerText);
                        else
                            cryRpt.SetParameterValue("PortOfDischarge", "");

                        if (doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//FINAL_DESTINATION") != null)
                            cryRpt.SetParameterValue("FinalDestination", doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//FINAL_DESTINATION").InnerText);
                        else
                            cryRpt.SetParameterValue("FinalDestination", "");

                        //cryRpt.SetParameterValue("AmtInWords", "");

                        /* Bank Detail */

                        if (doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//BANKNAME") != null)
                            cryRpt.SetParameterValue("BANKName", doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//BANKNAME").InnerText);
                        else
                            cryRpt.SetParameterValue("BANKName", "");

                        if (doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//BRANCHNAME") != null)
                            cryRpt.SetParameterValue("BankAddress", doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//BRANCHNAME").InnerText);
                        else
                            cryRpt.SetParameterValue("BankAddress", "");

                        /* Footer Total Detail */

                        if (doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//TAXABLEAMT") != null)
                            cryRpt.SetParameterValue("Amt", doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//TAXABLEAMT").InnerText);
                        else
                            cryRpt.SetParameterValue("Amt", "");

                        if (doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//SHIPPINGCHARGE") != null)
                            cryRpt.SetParameterValue("ShippingCharges", doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//SHIPPINGCHARGE").InnerText);
                        else
                            cryRpt.SetParameterValue("ShippingCharges", "");

                        if (doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//CF") != null)
                            cryRpt.SetParameterValue("CF", doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//CF").InnerText);
                        else
                            cryRpt.SetParameterValue("CF", "");

                        cryRpt.SetParameterValue("OrderNo", "21");

                        //cryRpt.SetParameterValue("Sign", @System.Configuration.ConfigurationManager.AppSettings["ERPdomainPath"] + "UploadFiles/Signature/JewelleryTransaction_" + doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//JT_ID").InnerText + ".jpeg");
                        //+"_" + doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//MT_ID").InnerText
                    }
                    if (doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//VOUCHERDETAILS") != null)
                    {
                        if (doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//CARAT") != null)
                            cryRpt.SetParameterValue("Carat", doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//CARAT").InnerText);
                        else
                            cryRpt.SetParameterValue("Carat", "");

                        if (doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//PCS") != null)
                            cryRpt.SetParameterValue("Pcs", doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//PCS").InnerText);
                        else
                            cryRpt.SetParameterValue("Pcs", "");
                    }
                    else
                    {
                        return "No data Found.";
                    }

                    string destFile = "/UploadFiles/Reports/";
                    string destServerpath = Server.MapPath("~" + destFile);
                    if (!Directory.Exists(destServerpath))
                    {
                        Directory.CreateDirectory(destServerpath);
                    }

                    string exportPath = destServerpath + "MaterialExport" + doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//MT_ID").InnerText + ".pdf";
                    cryRpt.ExportToDisk(ExportFormatType.PortableDocFormat, exportPath);
                    return destFile + "MaterialExport" + doc.SelectSingleNode("SERVICERESPONSE//VOUCHERLIST//MT_ID").InnerText + ".pdf";
                }
                else
                {
                    return "Error : No data Found.";
                }
            }
            catch (Exception ex)
            {
                return "Error :" + ex.Message;
            }
        }
    }
}