

<#import "template.ftl" as layout>
<@layout.registrationLayout displayInfo=social.displayInfo; section>
<#if section = "form">
  <section>

  <div class='air air1'></div>
  <div class='air air2'></div>
  <div class='air air3'></div>
  <div class='air air4'></div>

    <div class="background-container">
        <div class="background-animation">
    </div>
<div>
    <div class="container h-100">
        <div class="row justify-content-md-center h-100">
            
            <div class="w-50">
                <div class="text-center mt-5 mb-5">
                    <h1 class="title-app font-weight-bold">Compteur'App</h1>
                </div>
                <div class="card" style="border: 1px solid white; border-radius: 5%; box-shadow: 10px 5px 5px #8431bd;">
                    <div style="display: flex; width: 100%; align-items: center; justify-content: space-around;border-bottom: solid 1px darkgrey;" id="loginRegisterTab" role="tablist">
                      <div class="nav-item" style="width: 50%; border-right: 1px solid #ccc;">
                          <a style="text-align: center; display: block; padding: 10px; text-decoration: none; color: #007bff; transition: .1s ease-in-out 0s;" class="nav-link active" id="login-tab" data-toggle="tab" href="#login" role="tab" aria-controls="login" aria-selected="true">${msg("doLogIn")}</a>
                      </div>
                      <#if realm.registrationAllowed>
                      <div class="nav-item" style="width: 50%; border-left: 1px solid #ccc;">
                          <a style="text-align: center; display: block; padding: 10px; text-decoration: none; color: #0bbff; transition: .1s ease-in-out 0s;" class="nav-link" id="register-tab" href="${url.registrationUrl}" aria-controls="register" aria-selected="false">${msg("doRegister")}</a>
                      </div>
                      </#if>
                  </div>




                    <div class="card-body fat">
                        <#include "alert.ftl">
                            <div class="tab-content" id="loginTabContent">
                                <div class="tab-pane fade show active" id="login" role="tabpanel" aria-labelledby="login-tab">
                                    <form action="${url.loginAction}" method="post">

                                        <div class="form-group">
                                            <label for="username">${msg("email")}</label>

                                            <input id="username" type="text" class="form-control" name="username" value="" required autofocus tabindex="1">
                                        </div>

                                        <div class="form-group">
                                            <label for="password">${msg("password")}
                                                <#if realm.resetPasswordAllowed>
                                                    <a href="${url.loginResetCredentialsUrl}" class="float-right" tabindex="5">
                                                        ${msg("doForgotPassword")}
                                                    </a>
                                                </#if>
                                            </label>
                                            <input id="password" type="password" class="form-control" name="password" required tabindex="2">
                                        </div>

                                        <#if realm.rememberMe && !usernameEditDisabled??>
                                            <div class="form-group">
                                                <label>
                                                    <input type="checkbox" name="rememberMe">&nbsp;&nbsp;${msg("rememberMe")}
                                                </label>
                                            </div>
                                        </#if>

                                        <div class="btnLogin form-group">
                                            <button type="submit" class="btn btn-primary btn-block btn-main-action" name="login" tabindex="3">
                                                ${msg("doLogIn")}
                                            </button>
                                        </div>

                                    </form>

                                    <#if realm.password && social.providers??>
                                        <hr class="separator" />
                                        <p>${msg("getFairloginIdIdpDescription")}</p>
                                        
                                        <div class="text-center">
                                            <a class="btn btn-primary" data-toggle="collapse" href="#socialProviders" role="button" aria-expanded="false" aria-controls="social.providers" tabindex="4">
                                                ${msg("moreSocialIdentityProviders")}
                                            </a>
                                        </div>
                                        
                                        <div class="collapse" id="socialProviders">
                                        <div class="social-provider margin-top-20">
                                            <#list social.providers as p>
                                                <a href="${p.loginUrl}" id="zocial-${p.alias}" class="btn btn-block btn-social btn-${p.providerId}" style="margin-bottom: 5px">
                                                    <i class="fa fa-${p.providerId}"></i> Sign in with ${p.displayName}
                                                </a>
                                            </#list>
                                        </div>
                                        </div>
                                    </#if>
                                </div>
                            </div>
                    </div>
                </div>
                <#include "footer.ftl">
            </div>
        </div>
        </div>
    </div>
</section>
</#if>
</@layout.registrationLayout>
