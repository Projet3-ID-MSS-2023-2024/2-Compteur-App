package com.compteurapp.backendcompteurapp.services;

import com.compteurapp.backendcompteurapp.model.UserDB;
import com.compteurapp.backendcompteurapp.repository.UserRepository;
import com.compteurapp.backendcompteurapp.security.JwtUserSyncFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SyncService {

    private final UserRepository userRepository;

    public List<UserDB> getAllUsers() {
        return userRepository.findAll();
    }

    public UserDB getUserById(String id) {
        return userRepository.findById(id);
    }

    public void syncUser(UserDB user) {
        userRepository.save(user);
    }

    public JwtUserSyncFilter jwtAuthUserFilterBean() {
        return new JwtUserSyncFilter();
    }
}
