package com.compteurapp.backendcompteurapp.services;

import com.compteurapp.backendcompteurapp.model.UserDB;
import com.compteurapp.backendcompteurapp.repository.UserDBRepository;
import com.compteurapp.backendcompteurapp.security.JwtUserSyncFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserDBService {

    private final UserDBRepository userDBRepository;

    public List<UserDB> getAllUsers() {
        return userDBRepository.findAll();
    }

    public UserDB getUserById(String id) {
        Optional<UserDB> userDBOptional = userDBRepository.findById(id);
        return userDBOptional.orElse(null);
    }

    public List<UserDB> getProviders() {
        return userDBRepository.findAll().stream()
                .filter(user -> user.getRole() != null && user.getRole().equals("fournisseur"))
                .collect(Collectors.toList());
    }

    public UserDB getUserByName(String username) {
        return userDBRepository.findByUsername(username);
    }


    public void syncUser(UserDB user) {
        userDBRepository.save(user);
    }
    public void jwtAuthUserFilterBean() {
        new JwtUserSyncFilter();
    }


}
