<#if message?has_content>
    <#if message.type='success'>
        <div class="alert alert-success" role="alert">
            ${message.summary?no_esc}
        </div>
    </#if>
    <#if message.type='warning'>
        <div class="alert alert-warning" role="alert">
            ${message.summary?no_esc}
        </div>
    </#if>
    <#if message.type='error'>
        <div class="alert alert-danger" role="alert">
            ${message.summary?no_esc}
        </div>
    </#if>
    <#if message.type='info'>
        <div class="alert alert-info" role="alert">
            ${message.summary?no_esc}
        </div>
    </#if>
</#if>