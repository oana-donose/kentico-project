<%@ Control Language="C#" Inherits="CMS.PortalEngine.Web.UI.CMSAbstractLayout" %> 
<%@ Register TagPrefix="cc1" Namespace="CMS.DocumentEngine.Web.UI" Assembly="CMS.DocumentEngine.Web.UI" %>
<%@ Register TagPrefix="cc1" Namespace="CMS.PortalEngine.Web.UI" Assembly="CMS.PortalEngine.Web.UI" %>
<%@ Register TagPrefix="cc1" Namespace="CMS.DocumentEngine" Assembly="CMS.DocumentEngine" %>
<!-- Container -->
<div class="blogDetail">
	<!-- Top zone -->
	<div class="zoneTop">
		<cms:CMSWebPartZone ZoneID="zoneTop" runat="server" />      
	</div>
	<!-- Left zone -->
	<div class="zoneLeft" style="float: left;">
		<cms:CMSWebPartZone ZoneID="zoneLeft" runat="server" />      
	</div>
	<!-- Right zone -->
	<div class="zoneRight">
		<cms:CMSWebPartZone ZoneID="zoneRight" runat="server" />      
	</div>
</div>
