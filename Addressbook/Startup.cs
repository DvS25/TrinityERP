using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(Addressbook.Startup))]
namespace Addressbook
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
