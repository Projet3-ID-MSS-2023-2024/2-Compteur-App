package com.compteurapp.backendcompteurapp.services;

import com.compteurapp.backendcompteurapp.model.UserDB;
import com.compteurapp.backendcompteurapp.repository.UserDBRepository;
import com.compteurapp.backendcompteurapp.security.JwtUserSyncFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserDBService {

    private final UserDBRepository userDBRepository;

    public List<UserDB> getAllUsers() {
        return userDBRepository.findAll();
    }

    public UserDB getUserById(String id) {
        return userDBRepository.findById(id);
    }

    public void syncUser(UserDB user) {
        userDBRepository.save(user);
    }



    public void jwtAuthUserFilterBean() {
        new JwtUserSyncFilter();
    }

    public void deleteUser(String id) {
        userDBRepository.deleteById(id);
    }
}
