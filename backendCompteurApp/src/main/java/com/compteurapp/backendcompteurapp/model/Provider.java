package com.compteurapp.backendcompteurapp.model;

public class Provider extends User{
    private String tva;
    private String idCategory;

    public Provider() {
        super();
    }

    public void setTva(String tva) {
        this.tva = tva;
    }


    public String getTva() {
        return tva;
    }


    public String getIdCategory() {
        return idCategory;
    }

    public void setIdCategory(String idCategory) {
        this.idCategory = idCategory;
    }

}
