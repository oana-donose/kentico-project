<%@ Control Language="C#" Inherits="CMS.PortalEngine.Web.UI.CMSAbstractLayout" %> 
<%@ Register TagPrefix="cc1" Namespace="CMS.DocumentEngine.Web.UI" Assembly="CMS.DocumentEngine.Web.UI" %>
<%@ Register TagPrefix="cc1" Namespace="CMS.PortalEngine.Web.UI" Assembly="CMS.PortalEngine.Web.UI" %>
<%@ Register TagPrefix="cc1" Namespace="CMS.DocumentEngine" Assembly="CMS.DocumentEngine" %>
<div>
  <cms:CMSWebPartZone ZoneID="zoneA" runat="server" />      
</div>
<div class="twoColumnsLeft innerContent">
  <div style="width: 20%; float: left;">
    <cms:CMSWebPartZone ZoneID="zoneB" runat="server" />      
  </div>
  <div style="width: 80%; float: right;">
    <cms:CMSWebPartZone ZoneID="zoneC" runat="server" />      
  </div>
</div>
<div style="clear: both">
  <cms:CMSWebPartZone ZoneID="zoneD" runat="server" />
</div>