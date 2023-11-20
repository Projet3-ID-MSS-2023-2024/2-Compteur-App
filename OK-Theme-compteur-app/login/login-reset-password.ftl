<#import "template.ftl" as layout>
<@layout.registrationLayout displayInfo=true; section>
    <#if section = "header">
        ${msg("emailForgotTitle")}
    <#elseif section = "form">
    <p >${msg("emailInstruction")}</p>
    <div id="custom-popup">
        <div id="custom-popup-content">
            <p id="popup-message"></p>
            <button id="popup-btn" onclick="closePopup()">Fermer</button>
        </div>
    </div>
    <div id="overlay"></div>
        <form id="kc-reset-password-form" class="${properties.kcFormClass!}" action="${url.loginAction}" method="post" onsubmit="return validateResetPassword()">
            <div class="labelInput ${properties.kcLabelWrapperClass!}">
                <label for="username" class="${properties.kcLabelClass!}"><#if !realm.loginWithEmailAllowed>${msg("username")}<#elseif !realm.registrationEmailAsUsername>${msg("usernameOrEmail")}<#else>${msg("email")}</#if></label>
                <input type="text" id="username" name="username" class="${properties.kcInputClass!}" autofocus/>
            </div>
            <div class="submitReturnLogin">
                <div id="kc-form-buttons-password" class="${properties.kcFormButtonsClass!}">
                    <input class="${properties.kcButtonClass!} ${properties.kcButtonPrimaryClass!} ${properties.kcButtonBlockClass!} ${properties.kcButtonLargeClass!}" type="submit" value="${msg("doSubmit")}"/>
                </div>

                <div id="kc-form-options" class="${properties.kcFormOptionsClass!}">
                    <div class="${properties.kcFormOptionsWrapperClass!}">
                        <span><a href="${url.loginUrl}">${kcSanitize(msg("backToLogin"))?no_esc}</a></span>
                    </div>
                </div>
            </div>
        </form>       
    </#if>
</@layout.registrationLayout>
