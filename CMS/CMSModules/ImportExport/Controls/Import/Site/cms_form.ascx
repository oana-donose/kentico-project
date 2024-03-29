<%@ Control Language="C#" AutoEventWireup="true" Inherits="CMSModules_ImportExport_Controls_Import_Site_cms_form"
     CodeFile="cms_form.ascx.cs" %>

<script type="text/javascript">
    //<![CDATA[
    function bizCheckChange() {
        bizChck2.disabled = !bizChck1.checked;
        bizChck2.checked = false;
    }

    function bizInitCheckboxes() {
        if (!bizChck1.checked) {
            bizChck2.disabled = true;
        }
    }
    //]]>
</script>

<asp:Panel runat="server" ID="pnlCheck" CssClass="wizard-section">
    <div class="checkbox-list-vertical content-block-50">
        <cms:CMSCheckBox ID="chkObject" runat="server" Visible="false" />
        <cms:CMSCheckBox ID="chkPhysicalFiles" runat="server" />
    </div>
    <asp:Label ID="lblInfo" runat="server" CssClass="form-group" />
</asp:Panel>
<asp:Literal ID="ltlScript" EnableViewState="false" runat="Server" />