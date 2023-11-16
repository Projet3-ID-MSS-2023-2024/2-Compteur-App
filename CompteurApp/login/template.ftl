<#macro registrationLayout bodyClass="" displayInfo=false displayMessage=true>
    <!doctype html>
    <html>

    <head>
        <meta charset="utf-8">
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta name="robots" content="noindex, nofollow">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

        <#if properties.meta?has_content>
            <#list properties.meta?split( ' ') as meta>
                <meta name="${meta?split('==')[0]}" content="${meta?split('==')[1]}" />
            </#list>
        </#if>
        <title>
            <#nested "title">
        </title>
        <link rel="icon" href="${url.resourcesPath}/img/favicon.ico" />
        <!-- Ajoutez le lien vers votre feuille de style CSS externe ci-dessous -->
        <link href="${url.resourcesPath}/resources/css/compteurapp.css" rel="stylesheet" />

        <#if properties.styles?has_content>
            <#list properties.styles?split( ' ') as style>
                <link href="${url.resourcesPath}/${style}" rel="stylesheet" />
            </#list>
        </#if>
    </head>

    <body class="main-page">

        <#nested "form">
        
    </body>

    <#if properties.scripts?has_content>
        <#list properties.scripts?split( ' ') as script>
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
