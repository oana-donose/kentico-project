﻿<%@ Control Language="C#" AutoEventWireup="true" Inherits="CMS.DocumentEngine.Web.UI.CMSTransformation" %><%@ Register TagPrefix="cms" Namespace="CMS.DocumentEngine.Web.UI" Assembly="CMS.DocumentEngine.Web.UI" %>
<%@ Register TagPrefix="cc1" Namespace="CMS.DocumentEngine.Web.UI" Assembly="CMS.DocumentEngine.Web.UI" %><div class="Office">
<div class="Header TextContent">
  <a href="<%# GetDocumentUrl() %>"><%# Eval("OfficeName",true) %></a>
</div>
<div class="Body">
  <table>
  <tr>
    <td style="vertical-align: top;">
      <%#IfEmpty(Eval("OfficePhoto"), "", "<img src='" + GetFileUrl("OfficePhoto") + "?height=50' alt='" + Eval("OfficeName") + "' />")%>
    </td>
    <td class="Address TextContent" style="vertical-align: top;width:100%">
    <%# IfEmpty(Eval("OfficeAddress1"),"", Eval("OfficeAddress1",true)+"<br />") %>
    <%# IfEmpty(Eval("OfficeAddress2"),"", Eval("OfficeAddress2",true)+"<br />") %>
    <%# Eval("OfficeCity",true) %>, <%# Eval("OfficeState",true) %> <%# Eval("OfficeZIP",true) %>
    </td>
  </tr>
  </table>
</div>
</div>
<br />