<#import "template.ftl" as layout>
<@layout.registrationLayout; section>
<#if section="form">
    <section>
        <div class="container h-100">
            <div class="row justify-content-md-center h-100">
                <div class="card-wrapper">
                    <div class="text-center margin-bottom-30 margin-top-80">
                        <img src="${url.resourcesPath}/img/fairlogin.svg">
                    </div>
                    <div class="card fat">
                        <div class="card-body">
                            <h4 class="card-title">${msg("loginProfileTitle")}</h4>
                            <#include "alert.ftl">
                            
                            <form action="${url.loginAction}" method="post">

                                <div class="form-group">
                                    <label for="firstName" class="required">${msg("firstName")}</label>
                                    <input id="firstName" type="text" class="form-control" name="firstName" value="${(user.firstName!'')}" required autofocus>
                                </div>

                                <div class="form-group">
                                    <label for="lastName" class="required">${msg("lastName")}</label>
                                    <input id="lastName" type="text" class="form-control" name="lastName" value="${(user.lastName!'')}" required>
                                </div>

                                <div class="form-group">
                                    <label for="email" class="required">${msg("email")}</label>
                                    <input id="email" type="email" class="form-control" name="email" value="${(user.email!'')}" required>
                                </div>

                                <div class="form-group no-margin">
                                    <button id="registerBtn" type="submit" class="btn btn-primary btn-block btn-main-action">
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