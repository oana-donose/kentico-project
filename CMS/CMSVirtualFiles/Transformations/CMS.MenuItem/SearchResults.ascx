﻿<%@ Control Language="C#" AutoEventWireup="true" Inherits="CMS.DocumentEngine.Web.UI.CMSTransformation" %><%@ Register TagPrefix="cms" Namespace="CMS.DocumentEngine.Web.UI" Assembly="CMS.DocumentEngine.Web.UI" %>
<%@ Register TagPrefix="cc1" Namespace="CMS.DocumentEngine.Web.UI" Assembly="CMS.DocumentEngine.Web.UI" %> <a href=" <%# Eval("NodeAliasPath") %>"> <strong><%# Eval("SearchResultName",true) %><br /></strong></a>
Modified when: <%# Eval("DocumentModifiedWhen") %><br /><br /><br />