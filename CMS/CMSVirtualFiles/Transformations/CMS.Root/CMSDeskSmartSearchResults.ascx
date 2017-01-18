<%@ Control Language="C#" AutoEventWireup="true" Inherits="CMS.DocumentEngine.Web.UI.CMSTransformation" %><%@ Register TagPrefix="cms" Namespace="CMS.DocumentEngine.Web.UI" Assembly="CMS.DocumentEngine.Web.UI" %>
<%@ Register TagPrefix="cc1" Namespace="CMS.DocumentEngine.Web.UI" Assembly="CMS.DocumentEngine.Web.UI" %><div class="smart-search">
  <div class="title">
    <strong>
      <a href="<%# "javascript:SelectItem(" + CMS.Base.Web.UI.ControlsHelper.RemoveDynamicControls(ValidationHelper.GetString(GetSearchValue("nodeId"), "")) + ", '"+ ValidationHelper.GetString(GetSearchValue("DocumentCulture"), "") + "')" %>">
        <%#SearchHighlight(HTMLHelper.HTMLEncode(DataHelper.GetNotEmpty(Eval("Title"), "/")), "<span class=\"highlight\">", "</span>")%> (<%#ValidationHelper.GetString(GetSearchValue("DocumentCulture"), "")%>)
      </a>
    </strong>
  </div>
  <div class="text">
    <%#SearchHighlight(HTMLHelper.HTMLEncode(TextHelper.LimitLength(HttpUtility.HtmlDecode(HTMLHelper.StripTags(CMS.Base.Web.UI.ControlsHelper.RemoveDynamicControls(GetSearchedContent(DataHelper.GetNotEmpty(Eval("Content"), ""))), false, true, " ", "@", "")), 280, "...")), "<span class=\"highlight\">", "</span>")%>
  </div>
  <div class="footer">
    <span class="url">
      <%# SearchHighlight(SearchResultUrl(true),"<span class=\"highlight\">","</span>") %>
    </span>
    <span class="date">
      <%# GetDateTimeString(ValidationHelper.GetDateTime(Eval("Created"), DateTimeHelper.ZERO_TIME), true) %>
    </span>
  </div>
</div>