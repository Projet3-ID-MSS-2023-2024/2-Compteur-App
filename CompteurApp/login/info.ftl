<#import "template.ftl" as layout>
<@layout.registrationLayout displayMessage=false; section>
<#if section="form">
    <section>
        <div class="container h-100">
            <div class="row justify-content-md-center align-items-center h-100">
                <div class="card-wrapper">
                    <div class="text-center margin-bottom-30 margin-top-80">
                        <img src="${url.resourcesPath}/img/fairlogin.svg">
                    </div>
                    <div class="card fat">
                        <div class="card-body">
                            <#include "alert.ftl">

                                <p class="instruction">${message.summary}
                                    <#if requiredActions??>
                                        <#list requiredActions>:
                                            <b>
                                                <#items as reqActionItem>${msg("requiredAction.${reqActionItem}")}
                                                    <#sep>, </#items>
                                            </b>
                                        </#list>
                                        <#else>
                                    </#if>
                                </p>
                                <#if skipLink??>
                                    <#else>
                                        <#if pageRedirectUri??>
                                            <p>
                                                <a href="${pageRedirectUri}">${msg("backToApplication")?no_esc}</a>
                                            </p>
                                            <#elseif actionUri??>
                                                <p>
                                                    <a href="${actionUri}">${msg("proceedWithAction")?no_esc}</a>
                                                </p>
                                                <#elseif client.baseUrl??>
                                                    <p>
                                                        <a href="${client.baseUrl}">${msg("backToApplication")?no_esc}</a>
                                                    </p>
                                        </#if>
                                </#if>
                        </div>
                    </div>
                    <#include "footer.ftl">
                </div>
            </div>
        </div>
    </section>
</#if>
</@layout.registrationLayout>