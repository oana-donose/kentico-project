﻿using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web.UI.WebControls;

using CMS.Base;
using CMS.Base.Web.UI;
using CMS.DataEngine;
using CMS.DocumentEngine;
using CMS.Helpers;
using CMS.Localization;
using CMS.Membership;
using CMS.PortalEngine;
using CMS.SiteProvider;
using CMS.UIControls;

using MenuItem = CMS.UIControls.UniMenuConfig.Item;
using SubMenuItem = CMS.UIControls.UniMenuConfig.SubItem;

public partial class CMSAdminControls_UI_UniMenu_OnSiteEdit_CultureMenu : CMSUserControl
{
    #region "Private variables"

    private Dictionary<string, string> mNodeCultures;
    private PageInfo pi;

    #endregion


    #region "Private properties"

    /// <summary>
    /// Gets all the cultures of the current node.
    /// </summary>
    private Dictionary<string, string> NodeCultures
    {
        get
        {
            if (mNodeCultures == null)
            {
                // Get all language versions
                var culturesDs = GetNodeCultures();
                mNodeCultures = new Dictionary<string, string>();

                // Create culture/UrlPath collection
                if (!DataHelper.DataSourceIsEmpty(culturesDs))
                {
                    foreach (DataRow dr in culturesDs.Tables[0].Rows)
                    {
                        string docCulture = ValidationHelper.GetString(dr["DocumentCulture"], String.Empty);
                        string urlPath = ValidationHelper.GetString(dr["DocumentUrlPath"], String.Empty);
                        mNodeCultures.Add(docCulture, urlPath);
                    }
                }
            }

            return mNodeCultures;
        }
    }

    #endregion


    #region "Methods"

    /// <summary>
    /// Returns the localized string of the control's hierarchically highest parent that has the <see cref="ResourcePrefix"/> property and its translation defined. 
    /// </summary>
    /// <remarks>
    /// <para>
    /// If no parent but the control has the property defined, returns the control's localized string.
    /// </para>
    /// <para>
    /// If none of them have the <see cref="ResourcePrefix"/> property defined, returns the default resource string translation.
    /// </para>
    /// </remarks>
    /// <param name="stringName">String to localize.</param>
    /// <param name="culture">Culture to be used for localization.</param>
    /// <seealso cref="ResourcePrefix"/>
    public override string GetString(string stringName, string culture = null)
    {
        string cultureCode = culture ?? (PortalContext.ViewMode.IsEditLive() ? MembershipContext.AuthenticatedUser.PreferredUICultureCode : null);

        return base.GetString(stringName, cultureCode);
    }


    /// <summary>
    /// Handles the Load event of the Page control.
    /// </summary>
    protected void Page_Load(object sender, EventArgs e)
    {
        string preferredCultureCode = LocalizationContext.PreferredCultureCode;
        InfoDataSet<CultureInfo> siteCultures = CultureSiteInfoProvider.GetSiteCultures(SiteContext.CurrentSiteName);
        pi = DocumentContext.CurrentPageInfo ?? DocumentContext.CurrentCultureInvariantPageInfo ?? new PageInfo();

        // Cultures button
        MenuItem cultureItem = new MenuItem();
        cultureItem.CssClass = "BigButton";
        cultureItem.ImageAlign = ImageAlign.Top;
        cultureItem.ImagePath = URLHelper.UnResolveUrl(UIHelper.GetFlagIconUrl(Page, preferredCultureCode, "16x16"), SystemContext.ApplicationPath);
        cultureItem.Text = GetString("general.cultures");
        cultureItem.Tooltip = GetString("onsiteedit.languageselector");
        cultureItem.ImageAltText = GetString("general.cultures");

        // Add all cultures to the sub menu
        foreach (CultureInfo culture in siteCultures)
        {
            string iconUrl = UIHelper.GetFlagIconUrl(Page, culture.CultureCode, "16x16");
            string cultureName = culture.CultureName;
            string cultureCode = culture.CultureCode;

            if (cultureCode != preferredCultureCode)
            {
                SubMenuItem menuItem = new SubMenuItem
                {
                    Text = cultureName,
                    Tooltip = cultureName,
                    ImagePath = iconUrl,
                    ImageAltText = cultureName
                };

                // Build the web part image html
                bool translationExists = NodeCultures.ContainsKey(cultureCode);

                if (translationExists)
                {
                    // Assign click action which changes the document culture
                    menuItem.OnClientClick = "document.location.replace(" + ScriptHelper.GetString(URLHelper.UpdateParameterInUrl(RequestContext.CurrentURL, URLHelper.LanguageParameterName, cultureCode)) + ");";
                }
                else
                {
                    // Display the "Not translated" image
                    menuItem.RightImageIconClass = "icon-ban-sign";
                    menuItem.RightImageAltText = GetString("onsitedit.culturenotavailable");

                    // Assign click action -> Create new document culture
                    menuItem.OnClientClick = "NewDocumentCulture(" + pi.NodeID + ",'" + cultureCode + "');";
                }

                cultureItem.SubItems.Add(menuItem);
            }
            else
            {
                // Current culture
                cultureItem.Text = culture.CultureShortName;
                cultureItem.Tooltip = cultureName;
                cultureItem.ImagePath = iconUrl;
                cultureItem.ImageAltText = cultureName;
            }
        }

        btnCulture.Buttons.Add(cultureItem);
    }


    /// <summary>
    /// Returns all culture nodes
    /// </summary>
    protected DataSet GetNodeCultures()
    {
        // Get all language versions
        TreeProvider tp = new TreeProvider(MembershipContext.AuthenticatedUser);
        return tp.SelectNodes(SiteContext.CurrentSiteName, TreeProvider.ALL_DOCUMENTS, TreeProvider.ALL_CULTURES, false, null, "NodeID = " + pi.NodeID, "DocumentCulture", -1, false, 0, "DocumentCulture, DocumentUrlPath");
    }

    #endregion
}
