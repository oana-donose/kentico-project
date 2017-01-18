<%@ Control Language="C#" AutoEventWireup="true" Inherits="CMS.DocumentEngine.Web.UI.CMSTransformation" %><%@ Register TagPrefix="cms" Namespace="CMS.DocumentEngine.Web.UI" Assembly="CMS.DocumentEngine.Web.UI" %>
<%@ Register TagPrefix="cc1" Namespace="CMS.DocumentEngine.Web.UI" Assembly="CMS.DocumentEngine.Web.UI" %><h2><%# Eval("DocumentName") %></h2>
<p>
 <cms:ObjectTransformation ID="ucUsr" runat="server" ObjectType='<%# CMS.DataEngine.PredefinedObjectType.USER %>' ObjectID='<%# Eval<int>("NodeOwner") %>' Transformation = "This page is owned by {% FullName %}." NoDataTransformation = "This page has no owner." />  
</p>