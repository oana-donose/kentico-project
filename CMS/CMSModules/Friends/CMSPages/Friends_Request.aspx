<%@ Page Language="C#" AutoEventWireup="true"
    Title="Add a new friend" Inherits="CMSModules_Friends_CMSPages_Friends_Request"
    Theme="Default" MasterPageFile="~/CMSMasterPages/LiveSite/Dialogs/ModalSimplePage.master"  CodeFile="Friends_Request.aspx.cs" %>

<%@ Register Src="~/CMSModules/Friends/Controls/Friends_Request.ascx" TagName="FriendsRequest"
    TagPrefix="cms" %>
<asp:Content ID="cntBody" runat="server" ContentPlaceHolderID="plcContent">
    <div class="PageContent">
        <cms:FriendsRequest ID="FriendsRequest" runat="server" Visible="true" />
    </div>
</asp:Content>
