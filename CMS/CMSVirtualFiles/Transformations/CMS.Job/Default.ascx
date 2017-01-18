﻿<%@ Control Language="C#" AutoEventWireup="true" Inherits="CMS.DocumentEngine.Web.UI.CMSTransformation" %><%@ Register TagPrefix="cms" Namespace="CMS.DocumentEngine.Web.UI" Assembly="CMS.DocumentEngine.Web.UI" %>
<%@ Register TagPrefix="cc1" Namespace="CMS.DocumentEngine.Web.UI" Assembly="CMS.DocumentEngine.Web.UI" %><div class="TextContent">
<h1><%# Eval("JobName",true) %></h1>
<p>
<%# Eval("JobDescription") %>
</p>
</div>
<table class="TextContent">
<tr valign="top">
<td>
Location:
</td>
<td>
<%# Eval("JobLocation") %>
</td>
</tr>
<tr valign="top">
<td>
Compensation:
</td>
<td>
<%# Eval("JobCompensation") %>
</td>
</tr>
<tr valign="top">
<td>
Contact:
</td>
<td>
<%# Eval("JobContact") %>
</td>
</tr>
<tr valign="top">
<td>
Attachment:
</td>
<td>
<%#IfEmpty(Eval("JobAttachment"), "N/A", "<a href='" + GetFileUrl("JobAttachment") + "' >Download document</a>")%>
</td>
</tr>
</table>