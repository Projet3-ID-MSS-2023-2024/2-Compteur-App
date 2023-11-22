package com.compteurapp.backendcompteurapp.security;

import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.KeycloakBuilder;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class KeycloakSecurityUtilTest {
    Keycloak keycloak;

    @Value("http://localhost:8082")
    private String serverUrl;

    @Value("compteurapptest")
    private String realm;

    @Value("admin-cli")
    private String clientId;

    @Value("password")
    private String grantType;

    @Value("admin")
    private String username;

    @Value("Testmdp@01")
    private String password;

    public Keycloak getKeycloakInstance() {
        if(keycloak == null) {
            keycloak = KeycloakBuilder
                    .builder().serverUrl(serverUrl).realm(realm)
                    .clientId(clientId).grantType(grantType)
                    .username(username).password(password).build();
        }
        return keycloak;
    }
}
