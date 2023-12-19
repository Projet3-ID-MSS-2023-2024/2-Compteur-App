package com.compteurapp.backendcompteurapp.DTO;

public class ProviderDTO extends UserDTO {
    private String tva;
    private String idCategory;

    public ProviderDTO() {
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
