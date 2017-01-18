<%@ Control Language="C#" Inherits="CMS.PortalEngine.Web.UI.CMSAbstractLayout" %> 
<%@ Register TagPrefix="cc1" Namespace="CMS.DocumentEngine.Web.UI" Assembly="CMS.DocumentEngine.Web.UI" %>
<%@ Register TagPrefix="cc1" Namespace="CMS.PortalEngine.Web.UI" Assembly="CMS.PortalEngine.Web.UI" %>
<%@ Register TagPrefix="cc1" Namespace="CMS.DocumentEngine" Assembly="CMS.DocumentEngine" %>
<cms:CMSWebPartZone ZoneID="zoneTop" runat="server" />      
<div style="width: 100%">
<table border="0" width="100%">
  <tr valign="top">
    <td width="20%">
      <cms:CMSWebPartZone ZoneID="zoneLeft" runat="server" />      
    </td>
    <td width="80%">
      <cms:CMSWebPartZone ZoneID="zoneRight" runat="server" />      
    </td>
  </tr>
</table>
</div>
<cms:CMSWebPartZone ZoneID="zoneBottom" runat="server" />      
