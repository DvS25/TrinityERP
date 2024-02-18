using System.Web;
using System.Web.Optimization;

namespace Addressbook
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Content/plugin/jquery-ui/jquery-3.2.1.js",
                        "~/Content/plugin/Jquery/dist/jquery-confirm.min.js",
                        "~/Content/plugin/jquery-ui/jquery-ui.js",
                        "~/Content/js/tether.min.js",
                        "~/Content/plugin/bootstrap/js/bootstrap.min.js",
                        "~/Content/plugin/wave/waves.min.js",
                        "~/Content/plugin/jquery-slimscroll/jquery.slimscroll.js",
                        "~/Content/plugin/jquery.nicescroll/jquery.nicescroll.min.js",
                        "~/Content/plugin/bootstapwizard/jquery.bootstrap.wizard.js",
                        "~/Content/js/classie.js",
                        "~/Content/js/main.min.js",
                        "~/Content/plugin/jquery-validation/validator.js",
                        "~/Content/plugin/JqGrid/js/i18n/grid.locale-en.js",
                        "~/Content/plugin/JqGrid/js/jquery.jqGrid.min.js",
                        "~/Content/plugin/JSRender/jsrender.min.js",
                        "~/Content/plugin/JSRender/Xml2Json.js",
                        "~/Content/plugin/Toster/toastr.min.js",
                        "~/Content/plugin/filupload/jquery.fileupload.js",
                        "~/Content/js/jquery.validate.min.js",
                        "~/Content/plugin/summernote-master/summernote.js",
                        "~/Content/plugin/Select2/js/select2.full.min.js",
                        "~/Content/plugin/Select2/js/select2.min.js",
                        "~/Content/plugin/bootstraptoggle/js/bootstrap-toggle.min.js",
                        "~/Content/plugin/clockpicker/clockpicker.js", 
                        "~/Content/plugin/pupload/js/jquery.ui.plupload.js",
                        "~/Content/plugin/plupload/plupload.full.min.js",
                        "~/Content/plugin/plupload/jquery.plupload.queue/jquery.plupload.queue.min.js",
                        "~/Content/plugin/jquery-mask/jquery.mask.js",
                        "~/Content/plugin/DatePicker/js/bootstrap-datepicker.min.js",
                        "~/Script/Common/Common.js"
                        ));
            
            //bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
            //            "~/Scripts/modernizr-*"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                         //"~/Content/plugin/bootstrap/css/bootstrap.min.css",
                    
                      "~/Content/plugin/newbootstrap/bootstrap.min.css",
                      "~/Content/plugin/Jquery/dist/jquery-confirm.min.css",
                      //"~/Content/css/core.css",
                      "~/Content/css/main.css",
                    
                      "~/Content/css/responsive.css",
                      "~/Content/css/menu.css",
                        //"~/Content/css/custom.css",
                      "~/Content/css/generic-class.css",
                      "~/Content/plugin/clockpicker/clockpicker.css",
                      "~/Content/plugin/DatePicker/css/datepicker.css",
                      "~/Content/plugin/DatePicker/css/bootstrap-datetimepicker.css",
                      "~/Content/icon/font-awesome/css/font-awesome.css",
                      "~/Content/css/color-1.min.css",
                      "~/Content/plugin/summernote-master/summernote.css",
                      "~/Content/plugin/Select2/css/select2.min.css",
                      "~/Content/plugin/print/print.min.css",
                      "~/Content/plugin/JqGrid/css/ui.jqgrid.css",
                      "~/Content/plugin/JqGrid/css/Layout-jqgrid.css",
                      "~/Content/plugin/Toster/toastr.min.css",
                      "~/Content/plugin/bootstraptoggle/css/bootstrap-toggle.min.css",
                      "~/Content/plugin/pupload/css/jquery.ui.plupload.css",
                      "~/Content/plugin/filupload/jquery.fileupload.css",
                      "~/Content/plugin/owl-carousel/owl.carousel.min.css",
                      "~/Content/plugin/owl-carousel/owl.theme.min.css",
                      "~/Content/plugin/DatePicker/css/datepicker.css",                   
                      "~/Content/plugin/plupload/jquery.plupload.queue/css/jquery.plupload.queue.css"
                        ));

            bundles.Add(new ScriptBundle("~/amcharts/js").Include(
                        "~/Content/plugin/amcharts/amcharts.js",
                        "~/Content/plugin/amcharts/serial.js",
                        "~/Content/plugin/amcharts/pie.js",
                        "~/Content/plugin/amcharts/light.js"
                         ));


            /*--------------------------for new Layout------------------------*/
            bundles.Add(new StyleBundle("~/Content/New/css").Include(
                "~/Content/New/bootstrap.css",
                "~/Content/New/core.css",
                "~/Content/New/components.css",
                "~/Content/New/colors.css",
                "~/Content/New/icons/fontawesome/styles.min.css",
                "~/Content/New/icons/icomoon/styles.css",
                "~/Content/plugin/bootstraptoggle/css/bootstrap-toggle.min.css",
                "~/Content/DevExpress/Lib/css/dx.common.css",
                "~/Content/DevExpress/Lib/css/dx.light.css",
                //"~/Content/DevExpress/Lib/css/dx.generic.custom-scheme.css",
                "~/Content/plugin/pupload/css/jquery.ui.plupload.css",
                "~/Content/plugin/filupload/jquery.fileupload.css",
                "~/Content/plugin/plupload/jquery.plupload.queue/css/jquery.plupload.queue.css",
                "~/Content/plugin/Toster/toastr.min.css",
                "~/Content/css/custom.css"
            ));

            bundles.Add(new ScriptBundle("~/Content/New/js").Include(
                "~/Content/plugin/Jquery/dist/jquery-confirm.min.js",
                "~/Content/plugin/jquery-ui/jquery-ui.js",
                "~/Content/js/tether.min.js",
                //"~/Content/plugin/bootstrap/js/bootstrap.min.js",
                "~/Content/js/core/libraries/bootstrap.min.js",
                "~/Content/plugin/bootstraptoggle/js/bootstrap-toggle.min.js",
                "~/Content/js/jquery.validate.min.js",
                "~/Content/DevExpress/Lib/js/dx-quill.min.js",
                "~/Content/DevExpress/Lib/js/dx.all.js",
                "~/Content/plugin/JSRender/jsrender.min.js",
                "~/Content/plugin/JSRender/Xml2Json.js",
                "~/Content/plugin/filupload/jquery.fileupload.js",
                "~/Content/plugin/pupload/js/jquery.ui.plupload.js",
                "~/Content/plugin/plupload/plupload.full.min.js",
                "~/Content/plugin/plupload/jquery.plupload.queue/jquery.plupload.queue.min.js",
                "~/Content/plugin/JqueryTabbable/jquery.tabbable.min.js",
                "~/Content/plugin/Toster/toastr.min.js",
                "~/Content/js/plugins/ui/nicescroll.min.js",
                "~/Content/js/plugins/ui/drilldown.js",
                "~/Content/js/core/app.js",
                "~/Script/Common/Common.js"
            ));
            /*--------------------------for new Layout------------------------*/

            /*--------------------------for Shared Layout------------------------*/
            bundles.Add(new StyleBundle("~/Content/Shared/css").Include(
                "~/Content/New/bootstrap.css",
                "~/Content/New/core.css",
                "~/Content/New/components.css",
                "~/Content/New/colors.css",
                "~/Content/New/icons/fontawesome/styles.min.css",
                "~/Content/New/icons/icomoon/styles.css",
                "~/Content/plugin/bootstraptoggle/css/bootstrap-toggle.min.css",
                "~/Content/DevExpress/Lib/css/dx.common.css",
                "~/Content/DevExpress/Lib/css/dx.light.css",
                //"~/Content/DevExpress/Lib/css/dx.generic.custom-scheme.css",
                "~/Content/plugin/Toster/toastr.min.css",
                "~/Content/css/custom.css"
            ));

            bundles.Add(new ScriptBundle("~/Content/Shared/js").Include(
                "~/Content/plugin/Jquery/dist/jquery-confirm.min.js",
                "~/Content/plugin/jquery-ui/jquery-ui.js",
                "~/Content/js/tether.min.js",
                "~/Content/plugin/bootstrap/js/bootstrap.min.js",
                "~/Content/plugin/bootstraptoggle/js/bootstrap-toggle.min.js",
                "~/Content/DevExpress/Lib/js/dx-quill.min.js",
                "~/Content/DevExpress/Lib/js/dx.all.js",
                "~/Content/plugin/JSRender/jsrender.min.js",
                "~/Content/plugin/JSRender/Xml2Json.js",
                "~/Content/plugin/JqueryTabbable/jquery.tabbable.min.js",
                "~/Content/plugin/Toster/toastr.min.js"
            ));
            /*--------------------------for Shared Layout------------------------*/

            BundleTable.EnableOptimizations = false;
        }
    }
}
