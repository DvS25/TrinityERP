using System;
using System.Web;
using System.Collections.Specialized;
using System.Xml;
using System.Linq;
using System.Net;
using System.Text;
using System.Web.Script.Serialization;

namespace Addressbook.CommonClasses
{
    public class GenerateXml
    {
        public string GenerateXmlString(NameValueCollection forms, string MainRequestNode, string ServiceName)
           {
            string XMLRequestString = string.Empty;


            StringBuilder XmlChildNodes = new StringBuilder("");

            foreach (string key in forms)
            {
                XmlChildNodes.Append(GenerateNode(key, forms[key]));
            }

            if (ServiceName != "")
            {
                XmlChildNodes.Append(GenerateNode("SERVICENAME", ServiceName));
            }

            XMLRequestString = FinalXml(MainRequestNode, XmlChildNodes.ToString());
            return XMLRequestString;
        }

        // By  give EMPID and SECUREKEY from session.
        public string GetEmpSecurekeyXml()
        {
            string publicip = GetClientIpAddress();

            if (publicip == "::1")
            {
                publicip = GetLocalIPAddress();
            }

            if (SessionFacade.UserSession != null)
            {
                return "<LOGINID>" + SessionFacade.UserSession.USERID + "</LOGINID>" +
                        "<USERTYPE>" + SessionFacade.UserSession.USERTYPE + "</USERTYPE>" +
                        "<EMPID>" + SessionFacade.UserSession.USERID + "</EMPID>" +
                        "<EMPBRANCHID>" + SessionFacade.UserSession.EMPBRANCHID + "</EMPBRANCHID>" +
                        "<COMPANYID>" + SessionFacade.UserSession.COMPANYID + "</COMPANYID>" +
                        "<ACCOUNTYEARID>" + SessionFacade.UserSession.ACCOUNTYEARID + "</ACCOUNTYEARID>" +
                        "<SECUREKEY>" + SessionFacade.UserSession.TOKEN + "</SECUREKEY>" +
                       "<LOGINIPADDRESS>" +  publicip + "</LOGINIPADDRESS>"; 
            }
            else
            {
                return "";
            }
        }

        private string GenerateNode(string key, string value)
        {
            if (key == "XMLPARAM")
                return HttpUtility.UrlDecode(value);
            else
                return "<" + key + "><![CDATA[" + value + "]]></" + key + ">";
        }

        public string FinalXml(string MainNode, string childNodes)
        {
            return "<" + MainNode + ">" + GetEmpSecurekeyXml() + childNodes + "</" + MainNode + ">";
        }

        public string GenerateCommonRequestNodes(CommonGridParams commonparams)
        {
            StringBuilder RequstXml = new StringBuilder("");

            if (commonparams.ServiceName != null)
            {
                RequstXml.Append("<SERVICENAME>" + commonparams.ServiceName + "</SERVICENAME>");
            }
            if (commonparams.Mid != null)
            {
                RequstXml.Append("<MID>" + commonparams.Mid + "</MID>");
            }
            if (commonparams.PageIndex != null)
            {
                RequstXml.Append("<PAGEINDEX>" + commonparams.PageIndex + "</PAGEINDEX>");
            }

            if (commonparams.PageSize != null)
            {
                RequstXml.Append("<PAGECOUNT>" + commonparams.PageSize + "</PAGECOUNT>");
            }

            if (commonparams.SortColumn != null)
            {
                RequstXml.Append("<SORTCOLUMN>" + commonparams.SortColumn + "</SORTCOLUMN>");
            }

            if (commonparams.SortOrder != null)
            {
                RequstXml.Append("<SORTORDER>" + commonparams.SortOrder + "</SORTORDER>");
            }

            if (commonparams.SearchOper != null)
            {
                RequstXml.Append("<SEARCHOPERATION>" + commonparams.SearchOper + "</SEARCHOPERATION>");
            }

            if (commonparams.SearchColumn != null)
            {
                RequstXml.Append("<SEARCHCOLUMN>" + commonparams.SearchColumn + "</SEARCHCOLUMN>");
            }

            if (commonparams.SearchKeyword != null)
            {
                RequstXml.Append("<SEARCHKEYWORD>" + commonparams.SearchKeyword + "</SEARCHKEYWORD>");
            }
            if (commonparams.IsRecordAll != null)
            {
                RequstXml.Append("<ISRECORDALL>true</ISRECORDALL>");
            }
            if (commonparams.IsActive != null)
            {
                RequstXml.Append("<ISACTIVE>" + commonparams.IsActive + "</ISACTIVE>");
            }
            if (commonparams.ColumnRequested != null)
            {
                RequstXml.Append("<COLUMNREQUESTED>" + commonparams.ColumnRequested + "</COLUMNREQUESTED>");
            }            

            if (commonparams.Filters != null)
            {
                if (commonparams.Filters != "")
                {
                    RequstXml.Append(GetFilterXMLString(commonparams.Filters));
                }
            }

            if (commonparams.MyFilters != null)
            {
                if (commonparams.MyFilters != "")
                {
                    RequstXml.Append(GetFilterXMLString(commonparams.MyFilters));
                }
            }

            return RequstXml.ToString();
        }

        public string AddAdditionalNodesToXmlString(string currentXml, string AdditionalNodes)
        {
            string NodeAddedXml = string.Empty;
            XmlDocument xdoc = new XmlDocument();
            xdoc.LoadXml(currentXml);
            XmlDocumentFragment xfrag = xdoc.CreateDocumentFragment();
            xfrag.InnerXml = AdditionalNodes;
            xdoc.DocumentElement.AppendChild(xfrag);
            NodeAddedXml = xdoc.InnerXml.ToString();
            return NodeAddedXml;
        }

        //T GetObject<T>(Dictionary<string, object> dict)
        //{
        //    Type type = typeof(T);
        //    var obj = Activator.CreateInstance(type);

        //    foreach (var kv in dict)
        //    {
        //        type.GetProperty(kv.Key).SetValue(obj, kv.Value);
        //    }
        //    return (T)obj;
        //}

        public string GetFilterXMLString(string filters)
        {
            //Eg.	{"groupOp":"AND","rules":[{"field":"a.id","op":"eq","data":"3"},{"field":"b.name","op":"eq","data":"qwqw"}]}

            StringBuilder filterxml = new StringBuilder("");
            string nodename = string.Empty;

            JavaScriptSerializer json_serializer = new JavaScriptSerializer();
            JqGridFilter filterlist = json_serializer.Deserialize<JqGridFilter>(filters);

            filterxml.Append("<GROUPON>" +  filterlist.groupOp.ToString() + "</GROUPON>");

            foreach(JqGridRule rules in filterlist.rules)
            {
                nodename = "WHERE_" + rules.op.ToString().ToUpper() + "_" + rules.field;
                filterxml.Append("<" + nodename + ">" + rules.data + "</" + nodename + ">");
            }

            return filterxml.ToString();
        }

        public static string GetExceptionXMLResponse(Exception ex) {

            return "<SERVICERESPONSE>" +
                    "<RESPONSECODE>-500</RESPONSECODE>" +
                    "<RESPONSEMESSAGE>" +
                        "[Message]: " + ex.Message  +
                        "[Source]: " + ex.Source + 
                        "[StackTrace]: " + ex.StackTrace + 
                    "</RESPONSEMESSAGE>" +
                    "</SERVICERESPONSE>";
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

    }
}