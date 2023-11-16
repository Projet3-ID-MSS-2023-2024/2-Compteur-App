<#import "template.ftl" as layout>
<@layout.registrationLayout displayInfo=true; section>
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
                            <h4 class="card-title">${msg("loginTotpTitle")}</h4>
                            <#include "alert.ftl">
                            
                            <ol id="kc-totp-settings">
                                <li>
                                    <p>${msg("loginTotpStep1")}</p>
                                </li>

                                <#if mode?? && mode="manual">
                                    <li>
                                        <p>${msg("loginTotpManualStep2")}</p>
                                        <p>
                                            <span id="kc-totp-secret-key">${totp.totpSecretEncoded}</span>
                                        </p>
                                        <p>
                                            <a href="${totp.qrUrl}" id="mode-barcode">${msg("loginTotpScanBarcode")}</a>
                                        </p>
                                    </li>
                                    <li>
                                        <p>${msg("loginTotpManualStep3")}</p>
                                        <ul>
                                            <li id="kc-totp-type">${msg("loginTotpType")}: ${msg("loginTotp." + totp.policy.type)}</li>
                                            <li id="kc-totp-algorithm">${msg("loginTotpAlgorithm")}: ${totp.policy.algorithm}</li>
                                            <li id="kc-totp-digits">${msg("loginTotpDigits")}: ${totp.policy.digits}</li>
                                            <li id="kc-totp-period">${msg("loginTotpInterval")}: ${totp.policy.period}</li>
                                        </ul>
                                    </li>
                                    <#else>
                                        <li>
                                            <p>${msg("loginTotpStep2")}</p>
                                            <img id="kc-totp-secret-qr-code" src="data:image/png;base64, ${totp.totpSecretQrCode}" alt="Figure: Barcode">
                                            <br/>
                                            <p>
                                                <a href="${totp.manualUrl}" id="mode-manual">${msg("loginTotpUnableToScan")}</a>
                                            </p>
                                        </li>
                                </#if>
                                <li>
                                    <p>${msg("loginTotpStep3")}</p>
                                </li>
                            </ol>

                            <form action="${url.loginAction}" id="kc-totp-settings-form" method="post">
                                <div class="${properties.kcFormGroupClass!}">
                                    <div class="form-group">
                                        <label for="totp">${msg("loginTotpOneTime")}</label>
                                        <input type="text" id="totp" name="totp" autocomplete="off" class="form-control" />
                                    </div>
                                    <input type="hidden" id="totpSecret" name="totpSecret" value="${totp.totpSecret}" />
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
