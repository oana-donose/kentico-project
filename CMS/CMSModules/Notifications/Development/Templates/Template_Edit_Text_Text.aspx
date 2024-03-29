<%@ Page Language="C#" AutoEventWireup="true" Inherits="CMSModules_Notifications_Development_Templates_Template_Edit_Text_Text"
    Theme="Default" MasterPageFile="~/CMSMasterPages/UI/SimplePage.master" Title="Templates edit - text"
     CodeFile="Template_Edit_Text_Text.aspx.cs" %>

<%@ Register Src="~/CMSModules/Notifications/Controls/TemplateTextEdit.ascx" TagName="TemplateTextEdit"
    TagPrefix="cms" %>

<asp:Content ID="cntBody" runat="server" ContentPlaceHolderID="plcContent">
    <a href="#" onclick="$cmsj('#macrosHelp').toggleClass('hidden');">
        <asp:Label ID="lnkMoreMacros" runat="server" CssClass="InfoLabel" EnableViewState="false" /></a>
    <div class="content-block-50 hidden" id="macrosHelp">
        <strong>
            <cms:LocalizedLabel ID="lblHelpHeader" runat="server" CssClass="InfoLabel" DisplayColon="true"
                EnableViewState="false" />
        </strong>
        <asp:Table ID="tblHelp" runat="server" EnableViewState="false" GridLines="Horizontal"
            CellPadding="3" CellSpacing="0" Width="100%">
        </asp:Table>
    </div>
    <cms:TemplateTextEdit runat="server" ID="templateTextElem" />
</asp:Content>