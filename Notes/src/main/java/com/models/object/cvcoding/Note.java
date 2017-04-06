/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.models.object.cvcoding;

/**
 *
 * @author johnr
 */
public class Note {
    private int _id;
    private String _body;
    
    public Note() {
        this._id = -1;
        this._body = "";
    }

    public int getId() {
        return _id;
    }

    public String getBody() {
        return _body;
    }

    public void setId(int id) {
        this._id = id;
    }

    public void setBody(String body) {
        this._body = body;
    }    
}
