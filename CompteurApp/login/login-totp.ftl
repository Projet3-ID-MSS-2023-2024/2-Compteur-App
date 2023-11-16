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
                            <h4 class="card-title">${msg("loginOtpTitle")}</h4>
                            <#include "alert.ftl">
                            
                            <form action="${url.loginAction}" method="post">

                                <div class="form-group">
                                    <label for="totp">${msg("loginTotpTitle")}</label>
                                    <input id="totp" name="totp" autocomplete="off" type="text" class="form-control" value="" required autofocus>
                                    <div class="form-text text-muted">
                                        ${msg("loginOtpDescription")}
                                    </div>
                                </div>

                                <div class="form-group no-margin">
                                    <button type="submit" class="btn btn-primary btn-block btn-main-action">
                                        ${msg("doLogIn")}
                                    </button>
                                </div>
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