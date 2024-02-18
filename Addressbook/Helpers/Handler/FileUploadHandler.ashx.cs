using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.OleDb;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Addressbook.CommonClasses;
using System.Web.SessionState;

namespace Addressbook.Handler.FileUpload
{
    /// <summary>
    /// Summary description for FileUploadHandler
    /// </summary>
    public class FileUploadHandler : IHttpHandler, IRequiresSessionState
    {

        public void ProcessRequest(HttpContext context)
        {
            try
            {
                string originalfile = context.Request.QueryString["originalfile"];
                if (originalfile != null && originalfile != "")
                {

                    if (System.IO.File.Exists(HttpContext.Current.Server.MapPath(originalfile)))
                        System.IO.File.Delete(HttpContext.Current.Server.MapPath(originalfile));
                }
                string path = "/UploadFiles/Temp/";
                string Folder = context.Request.QueryString["folder"];
                if (Folder != null && Folder != "")
                    path = "/UploadFiles/" + Folder + "/";

                string Serverpath = HttpContext.Current.Server.MapPath("~" + path);

                var postedFile = context.Request.Files[0];
                string file;

                //In case of IE
                if (HttpContext.Current.Request.Browser.Browser.ToUpper() == "IE")
                {
                    string[] files = postedFile.FileName.Split(new char[] { });
                    file = files[files.Length - 1];
                }
                else // In case of other browsers
                {
                    file = postedFile.FileName;
                }


                if (!Directory.Exists(Serverpath))
                    Directory.CreateDirectory(Serverpath);

                string fileDirectory = Serverpath;
                if (context.Request.QueryString["fileName"] != null)
                {
                    file = context.Request.QueryString["fileName"];
                    if (File.Exists(fileDirectory + "\\" + file))
                    {
                        File.Delete(fileDirectory + "\\" + file);
                    }
                }

                string ext = Path.GetExtension(fileDirectory + "\\" + file);
                file = Guid.NewGuid() + ext; // Creating a unique name for the file 

                fileDirectory = Serverpath + "\\" + file;

                postedFile.SaveAs(fileDirectory);

                /* // resize file+
                 Bitmap image = new Bitmap(postedFile.InputStream);
                 Bitmap resizedImage = new Bitmap(100, 100);
                 using (Graphics gfx = Graphics.FromImage(resizedImage))
                 {
                     gfx.CompositingQuality = CompositingQuality.HighQuality;
                     gfx.InterpolationMode = InterpolationMode.Bicubic;
                     gfx.SmoothingMode = SmoothingMode.HighQuality;
                     gfx.PixelOffsetMode = PixelOffsetMode.HighQuality;
                     using (var wrapMode = new ImageAttributes())
                     {
                         wrapMode.SetWrapMode(WrapMode.TileFlipXY);
                         gfx.DrawImage(image, new Rectangle(0, 0, 100, 100), 0, 0, image.Width, image.Height, GraphicsUnit.Pixel, wrapMode);
                     }
                 }
                 resizedImage.Save(fileDirectory); */
                context.Response.Write(System.Configuration.ConfigurationManager.AppSettings["domainPath"] + path + file);
            }
            catch (Exception exp)
            {
                context.Response.Write(exp.Message);
            }
        }

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }

    }
}