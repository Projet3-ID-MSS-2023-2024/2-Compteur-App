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
                            <h4 class="card-title">${msg("emailVerifyTitle")}</h4>
                            <#include "alert.ftl">

                            <p class="instruction">
                                ${msg("emailVerifyInstruction1")}
                            </p>
                            <p class="instruction">
                                ${msg("emailVerifyInstruction2")}
                                <a href="${url.loginAction}">${msg("doClickHere")}</a> 
                                ${msg("emailVerifyInstruction3")}
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