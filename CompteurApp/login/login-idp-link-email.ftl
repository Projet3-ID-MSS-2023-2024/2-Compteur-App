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
                            <h4 class="card-title">${msg("emailLinkIdpTitle", idpAlias)}</h4>
                            <#include "alert.ftl">
                                <p id="instruction1" class="instruction">
                                    ${msg("emailLinkIdp1", idpAlias, brokerContext.username, realm.displayName)}
                                </p>
                                <p id="instruction2" class="instruction">
                                    ${msg("emailLinkIdp2")}
                                    <a href="${url.loginAction}">${msg("doClickHere")}</a> ${msg("emailLinkIdp3")}
                                </p>
                                <p id="instruction3" class="instruction">
                                    ${msg("emailLinkIdp4")}
                                    <a href="${url.loginAction}">${msg("doClickHere")}</a> ${msg("emailLinkIdp5")}
                                </p>
                        </div>
                    </div>
                    <#include "footer.ftl">
                </div>
            </div>
        </div>
    </section>
</#if>
</@layout.registrationLayout>