<footer class="footer">
    <div class="container">
        <#if realm.internationalizationEnabled>
            <div id="language-picker" class="row justify-content-center">
                <div class="form-inline">
                    <div class="form-group">
                        <select id="language-picker-dropdown" class="menu-language form-control form-control-sm">
                            <option>${locale.current}</option>
                            <#list locale.supported as l>
                                <option value="${l.url}">${l.label}</option>
                            </#list>
                        </select>
                    </div>
                </div>
            </div>
        </#if>
    </div>
</footer>