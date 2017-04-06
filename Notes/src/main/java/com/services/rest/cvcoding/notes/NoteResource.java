/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.services.rest.cvcoding.notes;

import com.models.object.cvcoding.Note;

// standard java objects
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;
import javax.ws.rs.GET;

// jersey-bundle 
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

/**
 *
 * @author johnr
 */
@Path("/notes")
public class NoteResource {
    private final Map<Integer, Note> noteDB;
    private final AtomicInteger idCounter;
    
    public NoteResource() {
        this.idCounter = new AtomicInteger();
        this.noteDB = new ConcurrentHashMap<>();
    }

    @GET
    @Produces(MediaType.TEXT_PLAIN)
    public String hello() {
        return "Hello World!!\n";
    }
}
