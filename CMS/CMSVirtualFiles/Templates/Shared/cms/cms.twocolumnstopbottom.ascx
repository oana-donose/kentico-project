<%@ Control Language="C#" Inherits="CMS.PortalEngine.Web.UI.CMSAbstractLayout" %> 
<%@ Register TagPrefix="cc1" Namespace="CMS.DocumentEngine.Web.UI" Assembly="CMS.DocumentEngine.Web.UI" %>
<%@ Register TagPrefix="cc1" Namespace="CMS.PortalEngine.Web.UI" Assembly="CMS.PortalEngine.Web.UI" %>
<%@ Register TagPrefix="cc1" Namespace="CMS.DocumentEngine" Assembly="CMS.DocumentEngine" %>
<div style="width: 100%">
<table border="0" width="100%">
  <tr>
    <td colspan="2">
      <cms:CMSWebPartZone ZoneID="zoneTop" runat="server" />      
    </td>
  </tr>
  <tr valign="top">
    <td>
      <cms:CMSWebPartZone ZoneID="zoneLeft" runat="server" />      
    </td>
    <td>
      <cms:CMSWebPartZone ZoneID="zoneRight" runat="server" />      
    </td>
  </tr>
  <tr>
    <td colspan="2">
      <cms:CMSWebPartZone ZoneID="zoneBottom" runat="server" />      
    </td>
  </tr>
</table>
</div>