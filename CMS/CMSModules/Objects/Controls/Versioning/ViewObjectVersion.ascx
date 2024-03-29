<%@ Control Language="C#" AutoEventWireup="true"  CodeFile="ViewObjectVersion.ascx.cs"
    Inherits="CMSModules_Objects_Controls_Versioning_ViewObjectVersion" %>
<%@ Register Src="~/CMSModules/Objects/Controls/ViewObjectDataSet.ascx" TagName="ViewDataSet"
    TagPrefix="cms" %>
<asp:Panel ID="pnlControl" runat="server">
    <asp:Panel ID="pnlAdditionalControls" runat="server" CssClass="header-panel">
        <div class="form-horizontal form-filter">
            <div class="form-group">
                <div class="filter-form-label-cell">
                    <cms:LocalizedLabel CssClass="control-label" ID="lblCompareTo" runat="server" ResourceString="content.compareto"
                        DisplayColon="true" EnableViewState="false" />
                </div>
                <div class="filter-form-value-cell">
                    <cms:CMSDropDownList ID="drpCompareTo" runat="server" AutoPostBack="true" />
                </div>
            </div>
            <div class="form-group">
                <div class="filter-form-label-cell">
                    <cms:LocalizedLabel CssClass="control-label" ID="lblDisplayAllData" runat="server" ResourceString="objectversioning.viewversion.displayalldata"
                        DisplayColon="true" EnableViewState="false" />
                </div>
                <div class="filter-form-value-cell">
                    <cms:CMSCheckBox ID="chkDisplayAllData" runat="server" AutoPostBack="true" />
                </div>
            </div>
        </div>
    </asp:Panel>
</asp:Panel>
<asp:Panel ID="pnlBody" runat="server" CssClass="PageContent">
    <asp:Label runat="server" ID="lblInfo" CssClass="InfoLabel" EnableViewState="false"
        Visible="false" />
    <asp:Label runat="server" ID="lblError" CssClass="ErrorLabel" EnableViewState="false"
        Visible="false" />
    <div class="ObjectVersioning">
        <cms:ViewDataSet ID="viewDataSet" runat="server" ShortID="vd" />
    </div>
</asp:Panel>
