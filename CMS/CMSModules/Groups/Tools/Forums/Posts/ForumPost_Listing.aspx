<%@ Page Language="C#" AutoEventWireup="true" Inherits="CMSModules_Groups_Tools_Forums_Posts_ForumPost_Listing"
    Theme="Default" MasterPageFile="~/CMSMasterPages/UI/SimplePage.master" ValidateRequest="false"  CodeFile="ForumPost_Listing.aspx.cs" %>

<%@ Register Src="~/CMSModules/Forums/Controls/Posts/PostListing.ascx" TagName="PostListing"
    TagPrefix="cms" %>
<asp:Content ContentPlaceHolderID="plcContent" ID="content" runat="server">
    <cms:PostListing ID="postListing" runat="server" />
    <asp:Literal ID="ltlScript" runat="server" />
</asp:Content>
