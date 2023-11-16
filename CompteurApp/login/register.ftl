<#import "template.ftl" as layout>
<@layout.registrationLayout; section>
 <#if section="form">
  <section>

    <div class='air air1'></div>
  <div class='air air2'></div>
  <div class='air air3'></div>
  <div class='air air4'></div>

    <div class="background-container">
        <div class="background-animation">
    </div>

    <div class="container h-100 d-flex justify-content-center">
        <div class="row d-flex justify-content-center justify-content-md-center h-100 w-100">
            <div class="w-50">
                <div class="text-center mt-5 mb-5">
                    <h1 class="title-app font-weight-bold">Compteur'App</h1>
                </div>
                <div class="card" style="border: 1px solid white; border-radius: 5%; box-shadow: 10px 5px 5px #8431bd;">
                    
                        <div style="display: flex; width: 100%; align-items: center; justify-content: space-around;border-bottom: solid 1px darkgrey;" id="loginRegisterTab" role="tablist">
                            <div class="nav-item" style="width: 50%; border-right: 1px solid #ccc;">
                                <a style="text-align: center; display: block; padding: 10px; text-decoration: none; color: #0bbff;" class="nav-link" id="login-tab" href="${url.loginUrl}" aria-controls="login" aria-selected="false">${msg("doLogIn")}</a>
                            </div>
                            <div class="nav-item" style="width: 50%; border-left: 1px solid #ccc;">
                                <a style="text-align: center; display: block; padding: 10px; text-decoration: none; color: #007bff;" class="nav-link active" id="register-tab" data-toggle="tab" href="#register" role="tab" aria-controls="register" aria-selected="true">${msg("doRegister")}</a>
                            </div>
                        </div>

                    
                    <div class="card-body fat">
                        <#include "alert.ftl">
                            <div class="tab-content" id="registerTabContent">
                                <div class="tab-pane fade show active" id="register" role="tabpanel" aria-labelledby="register-tab">
                                    <form action="${url.registrationAction}" method="post" onsubmit="return checkAnswer()">

                                        
                                        <div class="container">
                                            <div class="row">
                                                <div class="col-md-6">
                                                    <#if !realm.registrationEmailAsUsername>
                                                        <div class="form-group">
                                                            <div class="${properties.kcLabelWrapperClass!}">
                                                                <label for="username" class="${properties.kcLabelClass!}">${msg("username")}</label>
                                                            </div>
                                                            <div class="${properties.kcInputWrapperClass!}">
                                                                <input type="text" id="username" class="form-control" name="username" value="${(register.formData.username!'')}" autocomplete="username" autofocus/>
                                                            </div>
                                                        </div>
                                                    </#if>

                                                    <div class="form-group">
                                                        <label for="firstName">${msg("firstName")}</label>
                                                        <input id="firstName" type="text" class="form-control" name="firstName">
                                                    </div>

                                                    <div class="form-group">
                                                        <label for="lastName">${msg("lastName")}</label>
                                                        <input id="lastName" type="text" class="form-control" name="lastName">
                                                    </div>

                                                    <div class="form-group">
                                                        <label for="mobile">${msg("phoneNumber")}</label>
                                                        <input id="mobile" type="text" class="form-control" name="user.attributes.phoneNumber">
                                                    </div>
                                                </div>

                                                <div class="col-md-6">
                                                    <div class="form-group">
                                                        <label for="email" class="required">${msg("email")}</label>
                                                        <input id="email" type="email" class="form-control" name="email" required>
                                                    </div>

                                                    <div class="form-group">
                                                        <label for="password" class="required">${msg("password")}</label>
                                                        <input id="password" type="password" class="form-control" name="password" required>
                                                        <div class="invalid-feedback">${msg("errorNotValidPassword")}</div>
                                                    </div>

                                                    <div class="form-group">
                                                        <label for="password-confirm" class="required">${msg("passwordConfirm")}</label>
                                                        <input id="password-confirm" type="password" class="form-control" name="password-confirm" required>
                                                        <div class="invalid-feedback">${msg("errorNotSamePassword")}</div>
                                                    </div>

                                                    <div class="form-group">
                                                        <label for="selection" id="selectionLabel" class="required">Genre</label>
                                                        <select class="form-control" id="selection" onchange="checkAnswer()" required>
                                                            <option value="homme">Homme</option>
                                                            <option value="femme">Femme</option>
                                                            <option value="autre">Autre</option>
                                                        </select>
                                                        <div class="invalid-feedback">${msg("errorWrongAnswer")}</div>
                                                        <div class="valid-feedback">${msg("correctAnswer")}</div>
                                                    </div>

                                                    <input id="gender" type="hidden" class="form-control" name="user.attributes.gender">

                                                </div>
                                            </div>
                                        </div>


                                        <div class="btnLogin form-group mt-4">
                                            <button id="registerBtn" type="submit" class="btn btn-primary btn-block btn-main-action">
                                                ${msg("doRegister")}
                                            </button>
                                        </div>
                                    </form>
                                </div>
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