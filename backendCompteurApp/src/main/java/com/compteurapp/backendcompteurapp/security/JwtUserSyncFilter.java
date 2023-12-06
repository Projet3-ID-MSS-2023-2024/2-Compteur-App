/*
package com.compteurapp.backendcompteurapp.security;

import com.compteurapp.backendcompteurapp.model.Category;
import com.compteurapp.backendcompteurapp.model.UserDB;
import com.compteurapp.backendcompteurapp.services.UserDBService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.representations.idm.RoleRepresentation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

public class JwtUserSyncFilter{

    @Autowired
    private UserDBService userDBService;

    @Autowired
    private KeycloakSecurityUtil keycloakUtil;

    @Value("${realm}")
    private String realm;


    public void doFilterInternal( ) throws ServletException, IOException {
        try {
            JwtAuthenticationToken token = (JwtAuthenticationToken) SecurityContextHolder.getContext().getAuthentication();
            String id = String.valueOf(token.getTokenAttributes().get("sub"));
            // Vérifiez si l'utilisateur existe déjà
            UserDB user = userDBService.getUserById(id);
            if (user == null) {
                // Si l'utilisateur n'existe pas, créez un nouvel utilisateur
                user = new UserDB();
                user.setId(id);
                user.setFirstname(String.valueOf(token.getTokenAttributes().get("given_name")));
                user.setLastname(String.valueOf(token.getTokenAttributes().get("family_name")));
                user.setUsername(String.valueOf(token.getTokenAttributes().get("preferred_username")));
                user.setEmail(String.valueOf(token.getTokenAttributes().get("email")));
                user.setTva(String.valueOf(token.getTokenAttributes().get("tva")));
                user.setPhoneNumber(String.valueOf(token.getTokenAttributes().get("phoneNumber")));
                Category category = new Category();
                if(token.getTokenAttributes().get("idCategory") != null)
                {
                    category.setId(Long.parseLong(String.valueOf(token.getTokenAttributes().get("idCategory"))));
                    user.setCategory(category);
                }

                String realm_access = String.valueOf(token.getTokenAttributes().get("realm_access"));
                List<String> rolesList = Arrays.stream(realm_access.substring(realm_access.indexOf("[") + 1, realm_access.indexOf("]")).split(",")).map(String::trim).toList();

                if(rolesList.contains("admin")) {
                    user.setRole("admin");
                } else if(rolesList.contains("fournisseur")){
                    user.setRole("fournisseur");
                }else {
                    user.setRole("client");
                }

                // Si la base de données est vide, attribuez le rôle d'administrateur à ce nouvel utilisateur
                if (userDBService.getAllUsers().isEmpty()) {
                    user.setRole("admin");


                    Keycloak keycloak = keycloakUtil.getKeycloakInstance();
                    RoleRepresentation providerRole = keycloak.realm(realm).roles().get("admin").toRepresentation();
                    keycloak.realm(realm).users().get(id).roles().realmLevel().add(Collections.singletonList(providerRole));
                }
                userDBService.syncUser(user);
            }
        } catch (Exception e) {
            throw new IllegalArgumentException("Unable to auth user", e);
        }
    }
}
*/
