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
                            <h4 class="card-title"></h4>
                            <#include "alert.ftl">
                            
                            <p id="instruction1" class="instruction">
                                ${msg("pageExpiredMsg1")}
                                <a id="loginRestartLink" href="${url.loginRestartFlowUrl}">${msg("doClickHere")}</a> . ${msg("pageExpiredMsg2")}
                                <a id="loginContinueLink" href="${url.loginAction}">${msg("doClickHere")}</a> .
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