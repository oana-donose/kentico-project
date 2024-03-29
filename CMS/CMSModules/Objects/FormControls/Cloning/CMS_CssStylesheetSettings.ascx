<%@ Control Language="C#" AutoEventWireup="true"  CodeFile="CMS_CssStylesheetSettings.ascx.cs"
    Inherits="CMSModules_Objects_FormControls_Cloning_CMS_CssStylesheetSettings" %>

<div class="form-horizontal">
    <div class="form-group">
        <div class="editing-form-label-cell">
            <cms:LocalizedLabel CssClass="control-label" runat="server" ID="lblFiles" ResourceString="clonning.settings.layouts.appthemesfolder"
                EnableViewState="false" DisplayColon="true" AssociatedControlID="chkFiles" />
        </div>
        <div class="editing-form-value-cell">
            <cms:CMSCheckBox runat="server" ID="chkFiles" Checked="true" />
        </div>
    </div>
</div>