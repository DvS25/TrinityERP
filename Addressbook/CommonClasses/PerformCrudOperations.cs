using Addressbook.ServiceReference1;
using Addressbook.CommonClasses;
using System.Collections.Specialized;

namespace Addressbook.CommonClasses
{
    public class PerformCrudOperations
    {
        public string PerformOpeartions(NameValueCollection forms, string MainXmlNodeName, string ServiceName)
        {
            string ResponseXml = string.Empty;
            GenerateXml xmlstring = new GenerateXml();
            string RequestXml = xmlstring.GenerateXmlString(forms, MainXmlNodeName, ServiceName);

            ContactBook_InterfaceClient proxy = new ContactBook_InterfaceClient();
            ResponseXml = proxy.PERFORM_ACTIONS(RequestXml);
            return ResponseXml;
        }
    }
}