package com.compteurapp.backendcompteurapp.dto;

public class Provider extends User{
    private String tva;
    private String phoneNumber;

    public void setTva(String tva) {
        this.tva = tva;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getTva() {
        return tva;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }
}
