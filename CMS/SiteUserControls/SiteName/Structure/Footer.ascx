<%@ Control Language="C#" AutoEventWireup="true" CodeFile="Footer.ascx.cs" Inherits="SiteUserControls_SiteName_Structure_Footer" %>

<footer>
  <div class="footer-wrapper">
    <div class="copyright-wrapper">
      <p>&#9400; <asp:Literal ID="litYear" runat="server" EnableViewState="false"></asp:Literal> 
          <cms:LocalizedLiteral runat="server" ResourceString="SiteName.Footer.CopyrightText"/></p>
    </div>  
  </div>
</footer>