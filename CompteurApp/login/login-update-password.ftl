<#import "template.ftl" as layout>
<@layout.registrationLayout displayInfo=true; section>
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
                            <h4 class="card-title">${msg("updatePasswordTitle")}</h4>
                            <#include "alert.ftl">
                            
                            <form action="${url.loginAction}" method="post">

                                <div class="form-group">
                                    <label for="password-new">${msg("passwordNew")}</label>
                                    <input id="password-new" type="password" class="form-control" name="password-new" value="" required autofocus>
                                </div>

                                <div class="form-group">
                                    <label for="password-confirm">${msg("passwordConfirm")}</label>
                                    <input id="password-confirm" type="password" class="form-control" name="password-confirm" value="" required autofocus>
                                </div>

                                <div class="form-group no-margin">
                                    <button type="submit" class="btn btn-primary btn-block btn-main-action">
                                        ${msg("doSubmit")}
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
