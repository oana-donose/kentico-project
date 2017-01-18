<%@ Control Language="C#" AutoEventWireup="true" Inherits="CMS.DocumentEngine.Web.UI.CMSTransformation" %><%@ Register TagPrefix="cms" Namespace="CMS.DocumentEngine.Web.UI" Assembly="CMS.DocumentEngine.Web.UI" %>
<%@ Register TagPrefix="cc1" Namespace="CMS.DocumentEngine.Web.UI" Assembly="CMS.DocumentEngine.Web.UI" %><div class="blogsHome">
<h4>
<a href="<%# ForumFunctions.GetPostURL("/Groups/{%CommunityContext.CurrentGroup.GroupName|(user)administrator|(hash)b1a7337b8e30d76c82def87594bc5a6d218b49fbe21b2e7772260536c5afe09a%}/Forums",Eval("PostIDPath"), Eval("PostForumID")) %>"><%# Eval("PostSubject",true) %></a>
</h4>
<div>
<%# HTMLEncode(StripTags(LimitLength(RemoveDynamicControls(RemoveDiscussionMacros(Eval("PostText"))), 300, "..."))) %>
</div>
<div class="date">Posted on <strong><%# Eval("PostTime") %></strong></div>
</div>