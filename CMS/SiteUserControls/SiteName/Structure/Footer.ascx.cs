using CMS.MacroEngine;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class SiteUserControls_SiteName_Structure_Footer : System.Web.UI.UserControl
{
    public void SetupControls()
    {
        litYear.Text = DateTime.Now.Year.ToString();
    }

    protected void Page_Load(object sender, EventArgs e)
    {
        SetupControls();
    }
}