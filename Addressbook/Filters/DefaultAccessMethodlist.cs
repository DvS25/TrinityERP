using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Addressbook.Filters
{
    public class DefaultAccessMethodlist
    {
        static Dictionary<string, bool> Allowlist;
        static Dictionary<string, bool> BeforeLoginMenulist;

        static DefaultAccessMethodlist()
        {
            Allowlist = new Dictionary<string, bool>();
            Allowlist.Add("login_login", true);
            Allowlist.Add("login_dologin",true);
            Allowlist.Add("login_logout", true);
            Allowlist.Add("home_index", true);
            Allowlist.Add("home_about", true);
            Allowlist.Add("home_contact", true);
            Allowlist.Add("common_testemail",true);
            Allowlist.Add("common_saveimage",true);
            Allowlist.Add("common_bindmastersdetails", true);
            Allowlist.Add("common_opeartionsonmaster", true);
            Allowlist.Add("home_changepassword", true);

        }

        public static bool CheckIsDefaultAccess(string controller, string action) {
            try
            {
                bool IsAllow = false;

                Allowlist.TryGetValue((controller + '_' + action).ToLower(), out IsAllow);
                return IsAllow;
            }
            catch
            {
                return false;
            }
        }

        public static bool CheckIsBeforeLoginAccess(string controller, string action)  {
            try
            {
                bool IsAllow = false;

                BeforeLoginMenulist.TryGetValue((controller + '_' + action).ToLower(), out IsAllow);
                return IsAllow;
            }
            catch
            {
                return false;
            }
        }
    }
}