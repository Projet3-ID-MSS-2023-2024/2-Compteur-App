package com.compteurapp.backendcompteurapp.model;

public class Provider extends User{
    private String tva;
    private String phoneNumber;
    private String logo;

    public Provider() {
        super();
    }

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

    public String getLogo() {
        return logo;
    }

    public void setLogo(String logo) {
        this.logo = logo;
    }
}
