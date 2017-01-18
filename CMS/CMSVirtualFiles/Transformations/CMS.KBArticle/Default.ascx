﻿<%@ Control Language="C#" AutoEventWireup="true" Inherits="CMS.DocumentEngine.Web.UI.CMSTransformation" %><%@ Register TagPrefix="cms" Namespace="CMS.DocumentEngine.Web.UI" Assembly="CMS.DocumentEngine.Web.UI" %>
<%@ Register TagPrefix="cc1" Namespace="CMS.DocumentEngine.Web.UI" Assembly="CMS.DocumentEngine.Web.UI" %><table>
<tr>
<td colspan="2">
<h1>Article <%# Eval("ArticleIdentifier",true) %>: <%# Eval("ArticleName",true) %></h1>
</td>
</tr>
<tr valign="top">
<td width="80">
Summary:
</td>
<td>
<%# Eval("ArticleSummary") %>
</td>
</tr>
<tr valign="top">
<td width="80">
Applies to:
</td>
<td>
<%# Eval("ArticleAppliesTo") %>
</td>
</tr>
<tr valign="top">
<td width="80">
Text:
</td>
<td>
<%# Eval("ArticleText") %>
</td>
</tr>
<tr valign="top">
<td width="80">
See also:
</td>
<td>
<%# Eval("ArticleSeeAlso") %>
</td>
</tr>
</table>