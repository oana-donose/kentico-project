﻿<%@ Control Language="C#" AutoEventWireup="true" Inherits="CMS.DocumentEngine.Web.UI.CMSTransformation" %><%@ Register TagPrefix="cms" Namespace="CMS.DocumentEngine.Web.UI" Assembly="CMS.DocumentEngine.Web.UI" %>
<%@ Register TagPrefix="cc1" Namespace="CMS.DocumentEngine.Web.UI" Assembly="CMS.DocumentEngine.Web.UI" %><div style="margin-bottom: 30px;">
  <%-- Search result image --%>
        <div style="float: left; border: solid 1px #eeeeee; width: 90px; height:90px; margin-right: 5px;">
           <img src="<%# GetSearchImageUrl("/CMSModules/CMS_SmartSearch/no_image.gif",90) %>" alt="" />
        </div>
        <div style="float: left">
            <%-- Search result title --%>
            <div>
                <a style="font-weight: bold" href='<%# SearchResultUrl() %>'>
                    <%#SearchHighlight(HTMLHelper.HTMLEncode(CMS.Base.Web.UI.ControlsHelper.RemoveDynamicControls(DataHelper.GetNotEmpty(Eval("Title"), "/"))), "<span style='font-weight:bold;'>", "</span>")%>
                </a>
            </div>
            <%-- Search result content --%>
            <div style="margin-top: 5px; width: 590px;min-height:40px">
                <%#SearchHighlight(HTMLHelper.HTMLEncode(TextHelper.LimitLength(HttpUtility.HtmlDecode(HTMLHelper.StripTags(CMS.Base.Web.UI.ControlsHelper.RemoveDynamicControls(GetSearchedContent(DataHelper.GetNotEmpty(Eval("Content"), ""))), false, true, " ", "@", "")), 280, "...")), "<span style='background-color: #FEFF8F'>", "</span>")%><br />
            </div>
            <%-- Relevance, URL, Creattion --%>
            <div style="margin-top: 5px;">
                <%-- Relevance --%>
                <div title="Relevance: <%# Convert.ToInt32(ValidationHelper.GetDouble(Eval("Score"), 0) * 100) %>%"
                    style="width: 50px; border: solid 1px #aaaaaa; margin-top: 7px; margin-right: 6px;
                    float: left; color: #0000ff; font-size: 2pt; line-height: 4px; height: 4px;">
                    <div style="<%# "background-color:#a7d3a7;width:" + Convert.ToString(Convert.ToInt32(ValidationHelper.GetDouble(Eval("Score"), 0) * 50)) + "px;height:4px;line-height: 4px;" %>">
                    </div>
                </div>
                <%-- URL --%>
                <span style="color: #008000">
                    <%# TextHelper.BreakLine(SearchHighlight(SearchResultUrl(),"<strong>","</strong>"),75,"<br />") %>
                </span>
                <%-- Creation --%>
                <span style="padding-left:5px;color: #888888; font-size: 9pt">
                    <%# GetDateTimeString(ValidationHelper.GetDateTime(Eval("Created"), DateTimeHelper.ZERO_TIME), true) %>
                </span>
            </div>
        </div>
        <div style="clear: both">
        </div>
    </div>