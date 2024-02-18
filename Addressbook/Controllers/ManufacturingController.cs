using Addressbook.CommonClasses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Addressbook.Filters;

namespace Addressbook.Controllers
{
    [SessionExpireFilterAttribute]
    [AuthorizeUserAttribute]
    public class ManufacturingController : Controller
    {
        // GET: Manufacturing
        public ActionResult DesignMaster()
        {
            return View(FormPermissionHelper.GetFormPermission("DesignMaster", "Manufacturing"));
        }
        public ActionResult DesignTree()
        {
            return View(FormPermissionHelper.GetFormPermission("DesignTree", "Manufacturing"));
        }
        public ActionResult OrderMaster()
        {

            return View(FormPermissionHelper.GetFormPermission("OrderMaster", "Manufacturing"));
        }
        public ActionResult QuotationMaster()
        {
            return View(FormPermissionHelper.GetFormPermission("QuotationMaster", "Manufacturing"));
        }
        public ActionResult PartyMaster()
        {
            return View(FormPermissionHelper.GetFormPermission("PartyMaster", "Manufacturing"));
        }
        public ActionResult SharedHistory()
        {
            return View(FormPermissionHelper.GetFormPermission("SharedHistory", "Manufacturing"));
        }
        public ActionResult JewelleryPurchase()
        {
            return View(FormPermissionHelper.GetFormPermission("JewelleryPurchase", "Manufacturing"));
        }
        public ActionResult JewellerySales()
        {
            return View(FormPermissionHelper.GetFormPermission("JewellerySales", "Manufacturing"));
        }

        public ActionResult Departmentmaster()
        {
            return View(FormPermissionHelper.GetFormPermission("Departmentmaster", "Manufacturing"));
        }
        public ActionResult ProcessMaster()
        {
            return View(FormPermissionHelper.GetFormPermission("ProcessMaster", "Manufacturing"));
        }
        public ActionResult TaxProfile()
        {
            return View(FormPermissionHelper.GetFormPermission("TaxProfile", "Manufacturing"));
        }
        public ActionResult MaterialTransaction(string SBOOKID)
        {
            ViewBag.SBOOKID = SBOOKID;
            return View(FormPermissionHelper.GetFormPermission("MaterialTransaction", "Manufacturing"));
        }
        public ActionResult CashBankBook(string SBOOKID)
        {
            ViewBag.SBOOKID = SBOOKID;
            return View(FormPermissionHelper.GetFormPermission("CashBankBook", "Manufacturing"));
        }
        public ActionResult jewellerytransaction(string SBOOKID)
        {
            ViewBag.SBOOKID = SBOOKID;
            return View(FormPermissionHelper.GetFormPermission("jewellerytransaction", "Manufacturing"));
        }
        public ActionResult GeneralExpense(string SBOOKID)
        {
            ViewBag.SBOOKID = SBOOKID;
            return View(FormPermissionHelper.GetFormPermission("GeneralExpense", "Manufacturing"));
        }
        public ActionResult ContraEntry()
        {
            return View(FormPermissionHelper.GetFormPermission("ContraEntry", "Manufacturing"));
        }
        public ActionResult SalePurchaseJV(string SBOOKID)
        {
            ViewBag.SBOOKID = SBOOKID;
            return View(FormPermissionHelper.GetFormPermission("SalePurchaseJV", "Manufacturing"));
        }
        public ActionResult CreditDebit(string SBOOKID)
        {
            ViewBag.SBOOKID = SBOOKID;
            return View(FormPermissionHelper.GetFormPermission("CreditDebit", "Manufacturing"));
        }
        public ActionResult AccountOpeningBalance()
        {
            return View(FormPermissionHelper.GetFormPermission("AccountOpeningBalance", "Manufacturing"));
        }
        public ActionResult JournalMaster()
        {
            return View(FormPermissionHelper.GetFormPermission("JournalMaster", "Manufacturing"));
        }
        public ActionResult CurrencyRateDifference()
        {
            return View(FormPermissionHelper.GetFormPermission("CurrencyRateDifference", "Manufacturing"));
        }
        public ActionResult OpeningAssets(string SBOOKID)
        {
            ViewBag.SBOOKID = SBOOKID;
            return View(FormPermissionHelper.GetFormPermission("OpeningAssets", "Manufacturing"));
        }
        public ActionResult CreditDebitNote(string SBOOKID)
        {
            ViewBag.SBOOKID = SBOOKID;
            return View(FormPermissionHelper.GetFormPermission("CreditDebitNote", "Manufacturing"));
        }
        public ActionResult SalaryMaster(string SBOOKID)
        {
            ViewBag.SBOOKID = SBOOKID;
            return View(FormPermissionHelper.GetFormPermission("SalaryMaster", "Manufacturing"));
        }
        public ActionResult CatalogList()
        {
            return View(FormPermissionHelper.GetFormPermission("CatalogList", "Manufacturing"));
        }
        public ActionResult LedgerReport()
        {
            return View(FormPermissionHelper.GetFormPermission("LedgerReport", "Manufacturing"));
        }
        public ActionResult OutStandingReport()
        {
            return View(FormPermissionHelper.GetFormPermission("OutStandingReport", "Manufacturing"));
        }
        public ActionResult BalanceSheetReport()
        {
            return View(FormPermissionHelper.GetFormPermission("BalanceSheetReport", "Manufacturing"));
        }
        public ActionResult YearEndProcess()
        {
            return View(FormPermissionHelper.GetFormPermission("YearEndProcess", "Manufacturing"));
        }
        public ActionResult ProfitAndLossReport()
        {
            return View(FormPermissionHelper.GetFormPermission("ProfitAndLossReport", "Manufacturing"));
        }
        public ActionResult TrialBalanceReport()
        {
            return View(FormPermissionHelper.GetFormPermission("TrialBalanceReport", "Manufacturing"));
        }
        public ActionResult TradingReport()
        {
            return View(FormPermissionHelper.GetFormPermission("TradingReport", "Manufacturing"));
        }
        public ActionResult CashBankReport()
        {
            return View(FormPermissionHelper.GetFormPermission("CashBankReport", "Manufacturing"));
        }
    }
}