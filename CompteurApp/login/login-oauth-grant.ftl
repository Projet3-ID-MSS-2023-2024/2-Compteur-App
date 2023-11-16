<#import "template.ftl" as layout>
<@layout.registrationLayout bodyClass="oauth"; section>
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
                            <h4 class="card-title">${msg("oauthGrantRequest")}</h4>
                            <#include "alert.ftl">
                            
                            <ul>
                                <#if oauth.claimsRequested??>
                                    <li>
                                        <span>
                                            ${msg("personalInfo")}&nbsp;
                                            <#list oauth.claimsRequested as claim>
                                                ${advancedMsg(claim)}
                                                <#if claim_has_next>,&nbsp;</#if>
                                            </#list>
                                        </span>
                                    </li>
                                </#if>
                                <#if oauth.accessRequestMessage??>
                                    <li>
                                        <span>
                                            ${oauth.accessRequestMessage}
                                        </span>
                                    </li>
                                </#if>
                                <#if oauth.realmRolesRequested??>
                                    <#list oauth.realmRolesRequested as role>
                                        <li>
                                            <span>
                                                <#if role.description??>${advancedMsg(role.description)}
                                                    <#else>${advancedMsg(role.name)}</#if>
                                            </span>
                                        </li>
                                    </#list>
                                </#if>
                                <#if oauth.resourceRolesRequested??>
                                    <#list oauth.resourceRolesRequested?keys as resource>
                                        <#list oauth.resourceRolesRequested[resource] as clientRole>
                                            <li>
                                                <span>
                                                    <#if clientRole.roleDescription??>${advancedMsg(clientRole.roleDescription)}
                                                        <#else>${advancedMsg(clientRole.roleName)}</#if>
                                                </span>
                                                <span>${msg("inResource")}
                                                    <strong>
                                                        <#if clientRole.clientName??>${advancedMsg(clientRole.clientName)}
                                                            <#else>${clientRole.clientId}</#if>
                                                    </strong>
                                                </span>
                                            </li>
                                        </#list>
                                    </#list>
                                </#if>
                            </ul>

                            <form class="form-actions" action="${url.oauthAction}" method="POST">
                                <input type="hidden" name="code" value="${oauth.code}">
                                <div class="${properties.kcFormGroupClass!}">
                                    <div id="kc-form-options" class="${properties.kcFormOptionsClass!}">
                                        <div class="${properties.kcFormOptionsWrapperClass!}">
                                        </div>
                                    </div>

                                    <div id="kc-form-buttons" class="${properties.kcFormButtonsClass!}">
                                        <div class="${properties.kcFormButtonsWrapperClass!}">
                                            <input class="btn btn-primary" name="accept" id="kc-login" type="submit" value="${msg("doYes")}"/>
                                            <input class="btn btn-secondary" name="cancel" id="kc-cancel" type="submit" value="${msg("doNo")}"/>
                                        </div>
                                    </div>
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