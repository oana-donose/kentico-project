<%@ Page Language="C#" AutoEventWireup="true" MasterPageFile="~/CMSMasterPages/UI/Dashboard.master" CodeFile="Dashboard.aspx.cs" Inherits="CMSModules_Ecommerce_Pages_Tools_Dashboard_Dashboard"
    Theme="Default" EnableEventValidation="false" %>

<%@ Register Src="~/CMSModules/Widgets/Controls/Dashboard.ascx" TagName="Dashboard" TagPrefix="cms" %>

<asp:Content runat="server" ID="cplcContent" ContentPlaceHolderID="plcContent">
    <cms:Dashboard ID="cmsDashboard" runat="server" ShortID="d" />
</asp:Content>
