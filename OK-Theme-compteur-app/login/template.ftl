<#macro registrationLayout bodyClass="" displayInfo=false displayMessage=true displayWide=false>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"  "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" class="${properties.kcHtmlClass!}">

<head>
    <meta charset="utf-8">
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="robots" content="noindex, nofollow">

    <#if properties.meta?has_content>
        <#list properties.meta?split(' ') as meta>
            <meta name="${meta?split('==')[0]}" content="${meta?split('==')[1]}"/>
        </#list>
    </#if>
    <title>${msg("loginTitle",(realm.displayName!''))}</title>
    <link rel="icon" href="${url.resourcesPath}/img/favicon.ico" />
    <link href="https://fonts.googleapis.com/css2?family=Poppins&display=swap" rel="stylesheet">
    <#if properties.styles?has_content>
        <#list properties.styles?split(' ') as style>
            <link href="${url.resourcesPath}/${style}" rel="stylesheet" />
        </#list>
    </#if>
</head>

<body class="${properties.kcBodyClass!}">
    <section class="waves">
        <div class='air air1'></div>
        <div class='air air2'></div>
        <div class='air air3'></div>

        <div class='airReverse air1'></div>
        <div class='airReverse air2'></div>
        <div class='airReverse air3'></div>
    </section>

  <div class="${properties.kcLoginClass!} containeur">
    <div class="containeur-info">
        <div id="kc-header" class="${properties.kcHeaderClass!} left">
            <div id="kc-header-wrapper" class="${properties.kcHeaderWrapperClass!}">
                 <img src="${url.resourcesPath}/img/logo.svg" alt="" style="width: 100%;">
                <h1 class="title-app">CompteurApp</h1>
            </div>
        </div>
        <div class="${properties.kcFormCardClass!} <#if displayWide>${properties.kcFormCardAccountClass!}</#if> right">
            
            <div id="kc-content">
                <div id="kc-header-wrapper" class="${properties.kcHeaderWrapperClass!} title-app-responsive">
                    <h1 class="title-app">CompteurApp</h1>
                </div>
                <div id="mdpOublie" class="${properties.kcFormHeaderClass!}">
                    <h1 id="kc-page-title"><#nested "header"></h1>
                </div>
                <div id="kc-content-wrapper">
                <#if displayMessage && message?has_content>
                    <script>
                        window.messageType = '${message.type}';
                        window.messageText = '${kcSanitize(message.summary)?no_esc}';
                    </script>
                 </#if>

                <#nested "form">
                </div>
            </div>
            <#if realm.internationalizationEnabled  && locale.supported?size gt 1>

            <#if displayInfo>   
            <div id="kc-info" class="${properties.kcSignUpClass!}">
                <div id="kc-info-wrapper" class="${properties.kcInfoAreaWrapperClass!}">
                    <#nested "info">
                </div>
            </div>
            </#if>

            <#--  <div id="kc-locale"> 	
                <input class="dropdown" type="checkbox" id="kc-locale-dropdown" name="kc-locale-dropdown"/>
                <label class="for-dropdown" for="kc-locale-dropdown">${locale.current} <i class="uil uil-arrow-down"></i></label>
                <div class="section-dropdown"> 
                    <#list locale.supported as l>
                        <a href="${l.url}">${l.label} <i class="uil uil-arrow-right"></i></a>
                    </#list>
                </div>
            </div>  -->
            </#if>
        </div>
    </div>
  </div>
</body>

        <#if properties.scripts?has_content>
        <#list properties.scripts?split(' ') as script>
            <script src="${url.resourcesPath}/${script}" type="text/javascript"></script>
        </#list>
    </#if>
    <#if scripts??>
        <#list scripts as script>
            <script src="${script}" type="text/javascript"></script>
        </#list>
    </#if>

</html>
</#macro>