﻿<%@ Control Language="C#" AutoEventWireup="true" Inherits="CMS.DocumentEngine.Web.UI.CMSTransformation" %><%@ Register TagPrefix="cms" Namespace="CMS.DocumentEngine.Web.UI" Assembly="CMS.DocumentEngine.Web.UI" %>
<%@ Register TagPrefix="cc1" Namespace="CMS.DocumentEngine.Web.UI" Assembly="CMS.DocumentEngine.Web.UI" %><h2>

 <a href="<%# Eval("link")%>">

 <%# Eval("title") %>

 </a>

</h2>

<p>

 <strong>Published</strong>: <%# Eval("pubdate") %>

</p>

<p>

 <%# Eval("description") %>

</p>

<br/>