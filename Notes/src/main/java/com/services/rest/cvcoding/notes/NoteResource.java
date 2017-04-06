/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.services.rest.cvcoding.notes;

import com.models.object.cvcoding.Note;

// standard java stuff
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.IOException;
import java.util.logging.Level;
import java.util.logging.Logger;

// jersey-bundle 
import javax.ws.rs.Path;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Produces;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.StreamingOutput;

// jackson-databind
import com.fasterxml.jackson.databind.ObjectMapper;

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
    
    private Note readNote(InputStream is) {
        Note newNote = null;
        ObjectMapper mapper = new ObjectMapper();
        
        try {
            newNote = mapper.readValue(is, Note.class);
        } catch (IOException ex) {
            Logger.getLogger(NoteResource.class.getName())
                    .log(Level.SEVERE, null, ex);
        }

        return newNote;
    }
    
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public StreamingOutput postNote(InputStream is) {
        final Note newNote;
        
        newNote = readNote(is);
        if (newNote != null) {
            newNote.setId(idCounter.incrementAndGet());
            noteDB.put(newNote.getId(), newNote);
        }
        return new StreamingOutput() {
            @Override
            public void write(OutputStream out) throws IOException, 
                            WebApplicationException {
                ObjectMapper mapper = new ObjectMapper();
                mapper.writerWithDefaultPrettyPrinter().writeValue(out, newNote); 
            }
        };
    }
}
