package com.compteurapp.backendcompteurapp.security;

import com.compteurapp.backendcompteurapp.model.UserDB;
import com.compteurapp.backendcompteurapp.services.SyncService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;

public class JwtUserSyncFilter extends OncePerRequestFilter {

    @Autowired
    private SyncService syncService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        try {
            JwtAuthenticationToken token = (JwtAuthenticationToken) SecurityContextHolder.getContext().getAuthentication();
            String id = String.valueOf(token.getTokenAttributes().get("sub"));

            // Vérifiez si l'utilisateur existe déjà
            UserDB user = syncService.getUserById(id);
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
                user.setCategoryId(String.valueOf(token.getTokenAttributes().get("idCategory")));

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
                if (syncService.getAllUsers().isEmpty()) {
                    user.setRole("admin");
                }
                syncService.syncUser(user);
            }
        } catch (Exception e) {
            throw new IllegalArgumentException("Unable to auth user", e);
        }

        filterChain.doFilter(request, response);
    }
}
