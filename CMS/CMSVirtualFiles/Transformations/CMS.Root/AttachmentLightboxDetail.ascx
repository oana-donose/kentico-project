﻿<%@ Control Language="C#" AutoEventWireup="true" Inherits="CMS.DocumentEngine.Web.UI.CMSTransformation" %><%@ Register TagPrefix="cms" Namespace="CMS.DocumentEngine.Web.UI" Assembly="CMS.DocumentEngine.Web.UI" %>
<%@ Register TagPrefix="cc1" Namespace="CMS.DocumentEngine.Web.UI" Assembly="CMS.DocumentEngine.Web.UI" %><%# IfCompare(ImageHelper.IsImage((string)Eval("AttachmentExtension")), true,

"<div style=\"text-align:center;width: 350px;\"><div style=\"position:relative;z-index:1000;margin:16px;width:32px;height:32px\"><a target=\"_blank\" href=\"" + GetAbsoluteUrl(GetAttachmentUrl(Eval("AttachmentName"), Eval("NodeAliasPath")), Eval<int>("AttachmentSiteID")) + "\">" + GetAttachmentIcon("AttachmentGUID") + "</a></div></div>",

"<img src=\"" + GetAbsoluteUrl(GetAttachmentUrl(Eval("AttachmentName"), Eval("NodeAliasPath")), Eval<int>("AttachmentSiteID")) + "?maxsidesize=1000\" alt=\"" + Eval("AttachmentTitle", true) + "\" title=\"" + Eval("AttachmentDescription", true) + "\" />") %>