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
import java.util.ArrayList;
import java.util.List;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.IOException;
import java.util.logging.Level;
import java.util.logging.Logger;

// jersey-bundle 
import javax.ws.rs.Path;
import javax.ws.rs.GET;
import javax.ws.rs.Produces;
import javax.ws.rs.PathParam;
import javax.ws.rs.POST;
import javax.ws.rs.Consumes;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.StreamingOutput;
import javax.ws.rs.core.Response;
import javax.ws.rs.DELETE;
import javax.ws.rs.PUT;

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

    // helper methods for writing out note entities in JSON
    // format. the methods below handle writing out a single
    // Note or an array of Notes.
    // we always return an array even if there is a single item.

    private StreamingOutput streamOutNotesArr(final List<Note> notes) {
        return new StreamingOutput() {
            @Override
            public void write(OutputStream os) throws IOException, 
                        WebApplicationException {
                ObjectMapper mapper = new ObjectMapper();
                mapper.writerWithDefaultPrettyPrinter().writeValue(os, notes); 
            }
        };        
    }
    private StreamingOutput streamOutNotesArr(final Note note) {
        List<Note> notes = new ArrayList<>();
        notes.add(note);
        return streamOutNotesArr(notes);
    }
    
    private StreamingOutput streamOutNotesSingle(final Note note) {
        return new StreamingOutput() {
            @Override
            public void write(OutputStream os) throws IOException, 
                            WebApplicationException {
                ObjectMapper mapper = new ObjectMapper();
                mapper.writerWithDefaultPrettyPrinter().writeValue(os, note); 
            }
        };
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public StreamingOutput getAllNotes() {
        final List<Note> allNotes;
        allNotes = new ArrayList<>();
        
        for (Integer kk : noteDB.keySet()) {
            allNotes.add(noteDB.get(kk));
        }
        return streamOutNotesArr(allNotes);
    }

    @GET @Path("{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public StreamingOutput getNoteById(@PathParam("id") int id) {
        final Note resNote = noteDB.get(id);
        if (resNote == null)
            throw new WebApplicationException(Response.Status.NOT_FOUND);
        return streamOutNotesArr(resNote);
    }

    // helper routine for reading in JSON spec (POST) for a single note.
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
    @Consumes(MediaType.APPLICATION_JSON)
    public StreamingOutput postNote(InputStream is) {
        final Note newNote = readNote(is);
        if (newNote == null) 
            throw new WebApplicationException(Response.Status.BAD_REQUEST);

        newNote.setId(idCounter.incrementAndGet());
        noteDB.put(newNote.getId(), newNote);
        return streamOutNotesSingle(newNote);
    }
    
    @PUT @Path("{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public StreamingOutput updateTaskbyId(@PathParam("id") int id, InputStream is) {
        final Note editNote = noteDB.get(id);
        if (editNote == null)
            throw new WebApplicationException(Response.Status.NOT_FOUND);
        
        final Note qNote = readNote(is);
        if (qNote == null) 
            throw new WebApplicationException(Response.Status.BAD_REQUEST);
        
        editNote.setBody(qNote.getBody());
        return streamOutNotesSingle(editNote);
    }
    
    @DELETE
    @Produces(MediaType.APPLICATION_JSON)
    public StreamingOutput removeAllNotes() {
        final List<Note> allNotes = new ArrayList<>();
        
        for (Integer kk : noteDB.keySet()) {
            allNotes.add(noteDB.get(kk));
            noteDB.remove(kk);
        }
        return streamOutNotesArr(allNotes);
    }
    
    @DELETE
    @Path("{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public StreamingOutput removeNoteById(@PathParam("id") int id) {      
        final Note delNote = noteDB.get(id);
        if (delNote != null)
            noteDB.remove(id);
        return streamOutNotesArr(delNote);
    }
}
