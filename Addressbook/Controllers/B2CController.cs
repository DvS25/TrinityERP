using Addressbook.CommonClasses;
using System;
using System.Collections.Generic;
using Addressbook.ServiceReference1;
using System.Linq;
using System.Net;
using System.Web;
using Razorpay.Api;
using System.Web.Mvc;
using System.Xml;

namespace Addressbook.Controllers
{
    public class B2CController : Controller
    {
        public ActionResult Collection()
        {
            return View(FormPermissionHelper.GetFormPermission("Collection", "B2C"));
        }
        public ActionResult FestivalCollection()
        {
            return View(FormPermissionHelper.GetFormPermission("FestivalCollection", "B2C"));
        }
        public ActionResult Offers()
        {
            return View(FormPermissionHelper.GetFormPermission("Offers", "B2C"));
        }
        public ActionResult ProductListAds()
        {
            return View(FormPermissionHelper.GetFormPermission("ProductListAds", "B2C"));
        }
        public ActionResult Testimonial()
        {
            return View(FormPermissionHelper.GetFormPermission("Testimonial", "B2C"));
        }
        public ActionResult OrderList()
        {
            return View(FormPermissionHelper.GetFormPermission("OrderList", "B2C"));
        }
        public ActionResult CustomerRefund()
        {
            return View(FormPermissionHelper.GetFormPermission("CustomerRefund", "B2C"));
        }
        public ActionResult Setting()
        {
            return View(FormPermissionHelper.GetFormPermission("Setting", "B2C"));
        }
        public ActionResult PaymentList()
        {
            return View(FormPermissionHelper.GetFormPermission("PaymentList", "B2C"));
        }
        public ActionResult Analysis()
        {
            ViewBag.PageType = "B2C";
            return View(FormPermissionHelper.GetFormPermission("Analysis", "B2C"));
        }
        public ActionResult CustomerList()
        {
            ViewBag.PageType = "B2C";
            return View(FormPermissionHelper.GetFormPermission("CustomerList", "B2C"));
        }
        public string PayRefundData(string PaymentId, int OrderId, string RazorPaymentId,int CustomerId, decimal RefundAmount, string RefundNote, string InvioceNo,int OrderActionMasId,string TypeAction)
        {
            string response = string.Empty;
            try
            {
                string XMLValue = string.Empty;
                string Key = System.Configuration.ConfigurationManager.AppSettings["RazorpayKey"];
                string Secret = System.Configuration.ConfigurationManager.AppSettings["RazorpaySecretKey"];
                try
                {
                    ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12;
                    RazorpayClient client = new RazorpayClient(Key, Secret);
                    Razorpay.Api.Payment payment = client.Payment.Fetch(RazorPaymentId);

                    Refund refund = null;

                    Dictionary<string, object> data = new Dictionary<string, object>();
                    data.Add("amount", Convert.ToString(Convert.ToInt32(RefundAmount * 100)));
                    refund = payment.Refund(data);

                    response = InsertRefundDetails(false, PaymentId, OrderId, CustomerId, RefundNote, RefundAmount, Convert.ToInt32(refund["amount"]), InvioceNo, RazorPaymentId, refund["id"].ToString(), null, null, OrderActionMasId,"success",TypeAction);
                }
                catch (Exception PaymentEx)
                {
                    response = InsertRefundDetails(true, PaymentId, OrderId, CustomerId, RefundNote, RefundAmount, 0, InvioceNo, RazorPaymentId, null, "205", PaymentEx.Message.ToString(), OrderActionMasId,"error", TypeAction);
                }
                
                return response;
            }
            catch (Exception ex)
            {
                return "<SERVICERESPONSE><RESPONSECODE>-1</RESPONSECODE><RESPONSEMESSAGE>" + ex.Message.ToString() + "</RESPONSEMESSAGE></SERVICERESPONSE>";
            }
        }

        public string InsertRefundDetails(Boolean IsFail, string PaymentId, int OrderId, int CustomerId, string RefundNote, decimal RefundAmount, int TranscationAmount, string InvoiceNo, string RazorPaymentId, string RazorRefundId, string ErrorCode, string ErrorDescription,int OrderActionMasId,string status,string TypeAction)
        {
            string FinalXml = string.Empty, xmlnodes = string.Empty, XMLValue = string.Empty, Result = "false";
            try
            {
                if (SessionFacade.UserSession != null)
                {
                    if (SessionFacade.UserSession.USERID > 0)
                    {
                        xmlnodes += "<LOGINID>" + SessionFacade.UserSession.USERID + "</LOGINID>";
                    }
                    if (SessionFacade.UserSession.TOKEN != null)
                    {
                        xmlnodes += "<SECUREKEY>" + SessionFacade.UserSession.TOKEN + "</SECUREKEY>";
                    }
                    if (SessionFacade.UserSession.USERTYPE != null)
                    {
                        xmlnodes += "<USERTYPE>" + SessionFacade.UserSession.USERTYPE + "</USERTYPE>";
                    }

                    xmlnodes += "<ISFAIL>" + IsFail + "</ISFAIL>";
                    xmlnodes += "<ORDERACTIONMASID>" + OrderActionMasId + "</ORDERACTIONMASID>";
                    xmlnodes += "<PAYMENTID>" + PaymentId + "</PAYMENTID>";
                    xmlnodes += "<ORDERID>" + OrderId + "</ORDERID>";
                    xmlnodes += "<CUSTOMERID>" + CustomerId + "</CUSTOMERID>";
                    xmlnodes += "<REFUNDNOTE>" + RefundNote + "</REFUNDNOTE>";
                    xmlnodes += "<TRANSCATIONAMOUNT>" + TranscationAmount + "</TRANSCATIONAMOUNT>";
                    xmlnodes += "<INVOICENO>" + InvoiceNo + "</INVOICENO>";
                    xmlnodes += "<REFUNDAMOUNT>" + RefundAmount + "</REFUNDAMOUNT>";
                    xmlnodes += "<RAZORPAYMENTID>" + RazorPaymentId + "</RAZORPAYMENTID>";
                    xmlnodes += "<RAZORREFUNDID>" + RazorRefundId + "</RAZORREFUNDID>";
                    xmlnodes += "<PERRORCODE>" + ErrorCode + "</PERRORCODE>";
                    xmlnodes += "<STATUS>" + status + "</STATUS>";
                    xmlnodes += "<ERRORDESCRIPTION>" + ErrorDescription + "</ERRORDESCRIPTION>";
                    if(TypeAction == "Cancel")
                    {
                        FinalXml = "<SERVICEREQUEST>" + xmlnodes + "<oper>Refund</oper><SERVICENAME>B2C_ORDER_CANCEL_REFUND_DETAIL_CRUD</SERVICENAME></SERVICEREQUEST>";
                    }
                    else if (TypeAction == "Return")
                    {
                        FinalXml = "<SERVICEREQUEST>" + xmlnodes + "<oper>Refund</oper><SERVICENAME>B2C_ORDER_RETURN_REFUND_DETAIL_CRUD</SERVICENAME></SERVICEREQUEST>";
                    }
                    
                    ContactBook_InterfaceClient proxy = new ContactBook_InterfaceClient();
                    XMLValue = proxy.PERFORM_ACTIONS(FinalXml);

                    XmlDocument doc = new XmlDocument();
                    doc.LoadXml(XMLValue);

                    if (doc.SelectSingleNode("SERVICERESPONSE//RESPONSECODE").InnerText == "0")
                    {
                        //if (doc.SelectSingleNode("SERVICERESPONSE//SMSLIST") != null)
                        //{
                        //    XmlNodeList nodes;
                        //    nodes = doc.SelectNodes("SERVICERESPONSE//SMSLIST//SMS");
                        //    int TotalItem = nodes.Count;

                        //    foreach (XmlNode node in nodes)
                        //    {
                        //        if (node["TO"].InnerText != null && node["BODY"].InnerText != null)
                        //        {
                        //            SendSMS.SMSSend(node["TO"].InnerText, node["BODY"].InnerText, Convert.ToInt32(node["ID"].InnerText));
                        //        }
                        //    }
                        //}
                        Result = "<SERVICERESPONSE><RESPONSECODE>0</RESPONSECODE><RESPONSEMESSAGE>Success</RESPONSEMESSAGE></SERVICERESPONSE>";
                    }
                    else
                    {
                        Result = XMLValue;
                    }

                }
                else
                {
                    Result = "<SERVICERESPONSE><RESPONSECODE>-1</RESPONSECODE><RESPONSEMESSAGE>User Session is null.</RESPONSEMESSAGE></SERVICERESPONSE>";
                }
            }
            catch (Exception ex)
            {
                Result = "<SERVICERESPONSE><RESPONSECODE>-1</RESPONSECODE><RESPONSEMESSAGE>" + ex.Message.ToString() + "</RESPONSEMESSAGE></SERVICERESPONSE>";
            }
            return Result;
        }
    }
}