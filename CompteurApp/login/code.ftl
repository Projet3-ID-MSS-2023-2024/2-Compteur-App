<#import "template.ftl" as layout>
<@layout.registrationLayout; section>
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
                            <h4 class="card-title">
                                <#if code.success>
                                    ${msg("codeSuccessTitle")}
                                    <#else>
                                        ${msg("codeErrorTitle", code.error)}
                                </#if>
                            </h4>
                            <#include "alert.ftl">
                                <div id="kc-code">
                                    <#if code.success>
                                        <p>${msg("copyCodeInstruction")}</p>
                                        <input id="code" class="${properties.kcTextareaClass!}" value="${code.code}" />
                                        <#else>
                                            <p id="error">${code.error}</p>
                                    </#if>
                                </div>
                        </div>
                    </div>
                    <#include "footer.ftl">
                </div>
            </div>
        </div>
    </section>
</#if>
</@layout.registrationLayout>
