<%@ Page Title="" Language="C#" Theme="Default" MasterPageFile="~/CMSMasterPages/UI/Dialogs/ModalSimplePage.master"
    AutoEventWireup="true" EnableEventValidation="false" Inherits="CMSFormControls_Selectors_InsertYouTubeVideo_Content"
     CodeFile="Content.aspx.cs" %>

<%@ Register Src="~/CMSModules/Content/Controls/Dialogs/YouTube/YouTubeProperties.ascx"
    TagName="YouTubeProperties" TagPrefix="cms" %>

<asp:Content ID="Content3" ContentPlaceHolderID="plcContent" runat="Server">
    <div class="PageContent">
        <cms:YouTubeProperties ID="youTubeProp" runat="server" />
    </div>
</asp:Content>