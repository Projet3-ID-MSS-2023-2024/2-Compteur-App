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
                            <h4 class="card-title">${msg("confirmLinkIdpTitle")}</h4>
                            <#include "alert.ftl">
                                <form id="kc-register-form" action="${url.loginAction}" method="post">
                                    <button type="submit" class="btn btn-primary" name="submitAction" id="updateProfile" value="updateProfile">${msg("confirmLinkIdpReviewProfile")}</button>
                                    <button type="submit" class="btn btn-secondary" name="submitAction" id="linkAccount" value="linkAccount">${msg("confirmLinkIdpContinue", idpAlias)}</button>
                                </form>
                        </div>
                    </div>
                    <#include "footer.ftl">
                </div>
            </div>
        </div>
    </section>
</#if>
</@layout.registrationLayout>