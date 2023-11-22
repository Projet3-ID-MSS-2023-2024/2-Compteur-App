package com.compteurapp.backendcompteurapp.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


public class MailStructure {
    public String getObject() {
        return object;
    }

    public void setObject(String object) {
        this.object = object;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    private String object;
    private String message;
}
