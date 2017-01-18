<%@ Control Language="C#" AutoEventWireup="true" Inherits="CMS.DocumentEngine.Web.UI.CMSTransformation" %><%@ Register TagPrefix="cms" Namespace="CMS.DocumentEngine.Web.UI" Assembly="CMS.DocumentEngine.Web.UI" %>
<%@ Register TagPrefix="cc1" Namespace="CMS.DocumentEngine.Web.UI" Assembly="CMS.DocumentEngine.Web.UI" %><div class="sql-search">
  <div class="title">
    <strong>
      <a href="<%# "javascript:SelectItem(" + Eval("NodeID") + ", \'" + Eval("DocumentCulture") + "\')" %>"><%# IfEmpty(Eval("NodeName"), "/", HTMLHelper.HTMLEncode(ValidationHelper.GetString(Eval("DocumentName"), null))) %> (<%# Eval("DocumentCulture") %>)</a>
    </strong>
  </div>
  <div class="footer">
    <span class="url"><%# GetAbsoluteUrl(GetDocumentUrl()) %></span>
    <span class="date">
      <%# GetDateTimeString(ValidationHelper.GetDateTime(Eval("DocumentCreatedWhen"), DateTimeHelper.ZERO_TIME), true) %>
    </span>
  </div>
</div>