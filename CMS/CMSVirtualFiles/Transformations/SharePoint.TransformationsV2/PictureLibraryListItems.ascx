﻿<%@ Control Language="C#" AutoEventWireup="true" Inherits="CMS.DocumentEngine.Web.UI.CMSTransformation" %><%@ Register TagPrefix="cms" Namespace="CMS.DocumentEngine.Web.UI" Assembly="CMS.DocumentEngine.Web.UI" %>
<%@ Register TagPrefix="cc1" Namespace="CMS.DocumentEngine.Web.UI" Assembly="CMS.DocumentEngine.Web.UI" %><h2><%# Eval("Title") %></h2>
<p><%# Eval("Description") %></p>
<%-- The Author is a lookup field containing ID and value separated by semicolon --%>
Author: <%# Eval("Author").ToString().Split(new[]{';'})[1] %><br />
(Created on: <%# Eval("Created") %>)<br />
<a href="?pictureId=<%# Eval("ID") %>" title="See original size">
<img src="<%# GetSharePointImageUrl("FileRef", null, 150) %>" />
</a>
<h5>Keywords</h5>
<%# Eval("Keywords") %>