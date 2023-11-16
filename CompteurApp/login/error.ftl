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
                            <h4 class="card-title">${msg("errorTitleHtml")?no_esc}</h4>
                            <#include "alert.ftl">
                            
                            <ul>
                                <div id="kc-error-message">

                                    <#if client?? && client.baseUrl?has_content>
                                        <p>
                                            <a id="backToApplication" href="${client.baseUrl}">${msg("backToApplication")?no_esc}</a>
                                        </p>
                                    </#if>
                                </div>
                            </ul>
                        </div>
                    </div>
                    <#include "footer.ftl">
                </div>
            </div>
        </div>
    </section>
</#if>
</@layout.registrationLayout>