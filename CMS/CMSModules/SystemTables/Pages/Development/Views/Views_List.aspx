<%@ Page Language="C#" MasterPageFile="~/CMSMasterPages/UI/SimplePage.master" AutoEventWireup="true"
    Inherits="CMSModules_SystemTables_Pages_Development_Views_Views_List" Title="Views - List" Theme="Default"
     CodeFile="Views_List.aspx.cs" %>

<%@ Register Src="~/CMSModules/SystemTables/Controls/Views/SQLList.ascx" TagName="SQLList" TagPrefix="cms" %>
    
<asp:Content ID="Content1" ContentPlaceHolderID="plcContent" runat="Server">
    <cms:SQLList ID="lstSQL" runat="server" IsLiveSite="false" />
</asp:Content>
