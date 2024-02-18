using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;




namespace Addressbook.CommonClasses
{
    public class CommonGridParams
    {

        public string PageIndex { get; set; }

        public string PageSize { get; set; }

        public string SortColumn { get; set; }

        public string SortOrder { get; set; }

        public string SearchOper { get; set; }

        public string SearchColumn { get; set; }

        public string SearchKeyword { get; set; }

        public string ServiceName { get; set; }

        public string IsRecordAll { get; set; }

        public string IsActive { get; set; }

        public string IsLoginAllowed { get; set; }

        public string ColumnRequested { get; set; }

        public string Filters { get; set; }

        public string MyFilters { get; set; }

        public string Mid { get; set; }
        public string DesignId { get; set; }
        public string Partyno { get; set; }
        public string XmlParam { get; internal set; }
    }

    public class JqGridFilter
    {
        public GroupOp groupOp { get; set; }
        public List<JqGridRule> rules { get; set; }
    }

    public class JqGridRule
    {
        public string field { get; set; }
        public Operations op { get; set; }
        public string data { get; set; }
    }

    public enum GroupOp
    {
        AND,
        OR
    }

    public enum Operations
    {
        eq, // "equal"
        ne, // "not equal"
        lt, // "less"
        le, // "less or equal"
        gt, // "greater"
        ge, // "greater or equal"
        bw, // "begins with"
        bn, // "does not begin with"
        ew, // "ends with"
        en, // "does not end with"
        cn, // "contains"
        nc  // "does not contain"
        //in, // "in"
        //ni // "not in"
    }

    /*
    public class Formulafields {
        public string RESPONSECODE { get; set; }
        public string RESPONSEMESSAGE { get; set; }
        public string CURRENTPAGE { get; set; }
        public string TOTALPAGES { get; set; }
        public string TOTALRECORDS { get; set; }
        public string DETAILSLIST { get; set; }
        public string DETAILS { get; set; }
    }*/

    public class FormulaDetailfields
    {
        public FDetails[] DETAILS { get; set; }
    }

    public class FDetails
    {
        public string id { get; set; }
        public string text { get; set; }
        public bool children { get; set; }
        public string type { get; set; }
    }

}