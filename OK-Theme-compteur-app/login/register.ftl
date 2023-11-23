<#import "template.ftl" as layout>
<@layout.registrationLayout; section>
    <#if section = "header">
        ${msg("registerTitle")}
    <#elseif section = "form">
    <div id="custom-popup">
        <div id="custom-popup-content">
            <p id="popup-message"></p>
            <button id="popup-btn" onclick="closePopup()">Fermer</button>
        </div>
    </div>
  <div id="overlay"></div>
        <form id="formRegister" class="${properties.kcFormClass!}" action="${url.registrationAction}" method="post" onsubmit="return validateForm()">
            <span class="error"></span>
            <div id="kc-register-form">    
                <div class="page" id="page1">
                    <div class="labelInputRegister ${properties.kcFormGroupClass!} ${messagesPerField.printIfExists('firstName',properties.kcFormGroupErrorClass!)}">
                        <label for="firstName" class="${properties.kcLabelClass!}">${msg("firstName")}</label>
                        <input type="text" id="firstName" class="${properties.kcInputClass!}" name="firstName" value="${(register.formData.firstName!'')}" placeholder="John" />
                    </div>

                    <div class="labelInputRegister ${properties.kcFormGroupClass!} ${messagesPerField.printIfExists('lastName',properties.kcFormGroupErrorClass!)}">
                        <label for="lastName" class="${properties.kcLabelClass!}">${msg("lastName")}</label>
                        <input type="text" id="lastName" class="${properties.kcInputClass!}" name="lastName" value="${(register.formData.lastName!'')}" placeholder="Doe"/>
                    </div>

                    <div class="labelInputRegister ${properties.kcFormGroupClass!} ${messagesPerField.printIfExists('email',properties.kcFormGroupErrorClass!)}">
                        <label for="email" class="${properties.kcLabelClass!}">${msg("email")}</label>
                        <input type="text" id="email" class="${properties.kcInputClass!}" name="email" value="${(register.formData.email!'')}" autocomplete="email" placeholder="johndoe@email.com"/>
                    </div>

                    <#if !realm.registrationEmailAsUsername>
                    <div class="labelInputRegister ${properties.kcFormGroupClass!} ${messagesPerField.printIfExists('username',properties.kcFormGroupErrorClass!)}">
                        <label for="username" class="${properties.kcLabelClass!}">${msg("username")}</label>
                        <input type="text" id="username" class="${properties.kcInputClass!}" name="username" value="${(register.formData.username!'')}" autocomplete="username" placeholder="johndoe20"/>
                    </div>
                    </#if>

                    <i class="fas fa-arrow-right next"></i>
                </div>

                <div class="page" id="page2">
                    <#if passwordRequired>
                    <div class="labelInputRegister ${properties.kcFormGroupClass!} ${messagesPerField.printIfExists('password',properties.kcFormGroupErrorClass!)}">
                        <label for="password" class="${properties.kcLabelClass!}">${msg("password")}</label>
                        <input type="password" id="password" class="${properties.kcInputClass!}" name="password" autocomplete="new-password" placeholder="Exemple@20"/>
                    </div>

                    <div class="labelInputRegister ${properties.kcFormGroupClass!} ${messagesPerField.printIfExists('password-confirm',properties.kcFormGroupErrorClass!)}">
                        <label for="password-confirm" class="${properties.kcLabelClass!}">${msg("passwordConfirm")}</label>
                        <input type="password" id="password-confirm" class="${properties.kcInputClass!}" name="password-confirm" placeholder="Exemple@20"/>
                    </div>
                    </#if>

                    <div class="labelInputRegister ">
                        <label for="mobile">${msg("phoneNumber")}</label>
                        <input id="mobile" type="text" class="form-control" name="user.attributes.phoneNumber" placeholder="+32495214785">
                    </div>

                    <#if recaptchaRequired??>
                    <div class="form-group">
                        <div class="${properties.kcInputWrapperClass!}">
                            <div class="g-recaptcha" data-size="compact" data-sitekey="${recaptchaSiteKey}"></div>
                        </div>
                    </div>
                    </#if>
                    <i class="fas fa-arrow-left prev"></i>

                    <div id="kc-form-buttons" class="${properties.kcFormButtonsClass!}">
                        <input class="${properties.kcButtonClass!} ${properties.kcButtonPrimaryClass!} ${properties.kcButtonBlockClass!} ${properties.kcButtonLargeClass!}" type="submit" value="${msg("doRegister")}"/>
                    </div>
                </div>

                <div class=" submitReturnregister ${properties.kcFormGroupClass!}">
                    <div id="kc-form-options" class="${properties.kcFormOptionsClass!}">
                            <div class="${properties.kcFormOptionsWrapperClass!}">
                                <span><a href="${url.loginUrl}">${kcSanitize(msg("backToLogin"))?no_esc}</a></span>
                            </div>
                        </div>
                    </div>
            </div>
        </form>
        <script>
            document.addEventListener("DOMContentLoaded", function () {
                // Récupérer les éléments du DOM
                var page1 = document.getElementById("page1");
                var page2 = document.getElementById("page2");
                var nextButton = document.querySelector(".next");
                var prevButton = document.querySelector(".prev");

                // Masquer la page 2 au chargement de la page
                page2.style.display = "none";

                // Gérer le clic sur le bouton "Suivant"
                nextButton.addEventListener("click", function () {
                    // Masquer la page 1
                    page1.style.display = "none";
                    // Afficher la page 2
                    page2.style.display = "flex";
                });

                // Gérer le clic sur le bouton "Précédent"
                prevButton.addEventListener("click", function () {
                    // Masquer la page 2
                    page2.style.display = "none";
                    // Afficher la page 1
                    page1.style.display = "flex";
                });
            });
        </script>
    </#if>
</@layout.registrationLayout>
