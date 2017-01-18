<%@ Page Language="C#" AutoEventWireup="true" Inherits="CMSModules_MessageBoards_CMSPages_Message_Edit"
    Theme="Default" MasterPageFile="~/CMSMasterPages/LiveSite/Dialogs/ModalSimplePage.master"
    Title="Message - Edit"  CodeFile="Message_Edit.aspx.cs" %>

<%@ Register Src="~/CMSModules/MessageBoards/Controls/Messages/MessageEdit.ascx"
    TagName="MessageEdit" TagPrefix="cms" %>
<asp:Content ID="cntBody" runat="server" ContentPlaceHolderID="plcContent">
    <div class="PageContent">
        <cms:MessageEdit ID="messageEditElem" runat="server" IsLiveSite="true" ModalMode="true" />
        <asp:Literal ID="ltlScript" runat="server" EnableViewState="false" />
    </div>
</asp:Content>
