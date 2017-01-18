<%@ Control Language="C#" AutoEventWireup="true" Inherits="CMS.DocumentEngine.Web.UI.CMSTransformation" %><%@ Register TagPrefix="cms" Namespace="CMS.DocumentEngine.Web.UI" Assembly="CMS.DocumentEngine.Web.UI" %>
<%@ Register TagPrefix="cc1" Namespace="CMS.DocumentEngine.Web.UI" Assembly="CMS.DocumentEngine.Web.UI" %><entry>
  <title><%# EvalCDATA("NewsTitle") %></title>
  <link href="<%# GetAbsoluteUrl(GetDocumentUrlForFeed(), Eval<int>("NodeSiteID")) %>"/>
  <id>urn:uuid:<%# Eval("NodeGUID") %></id>
  <published><%# GetAtomDateTime(Eval("NewsReleaseDate")) %></published>
  <updated><%# GetAtomDateTime(Eval("DocumentModifiedWhen")) %></updated>
  <author>
    <name><cms:ObjectTransformation runat="server" ObjectType="<%# CMS.DataEngine.PredefinedObjectType.USER %>" ObjectID='<%# Eval<int>("NodeOwner") %>' Transformation="{% FullName %}" NoDataTransformation="N/A" /></name>
  </author>
  <summary type="html"><%# EvalCDATA("NewsSummary") %></summary>
</entry>