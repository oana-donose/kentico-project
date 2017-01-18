﻿<%@ Control Language="C#" Inherits="CMS.PortalEngine.Web.UI.CMSAbstractLayout" %> 
<%@ Register TagPrefix="cc1" Namespace="CMS.DocumentEngine.Web.UI" Assembly="CMS.DocumentEngine.Web.UI" %>
<%@ Register TagPrefix="cc1" Namespace="CMS.PortalEngine.Web.UI" Assembly="CMS.PortalEngine.Web.UI" %>
<%@ Register TagPrefix="cc1" Namespace="CMS.DocumentEngine" Assembly="CMS.DocumentEngine" %>
<!-- Container -->
<div class="textHeader">
	<!-- Header zone -->
	<div class="zoneHeader">
		<cms:CMSWebPartZone ZoneID="zoneHeader" runat="server" />
	</div>
	<!-- Content -->
	<div class="zoneContent">
		<cms:CMSWebPartZone ZoneID="zoneContent" runat="server" />
	</div>
</div>
