/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.services.rest.cvcoding.notes;

// jersey-bundle 
//   +-- jersey-server
import javax.ws.rs.core.Application;

// jersey-bundle 
//   +-- jersey-server
//     +-- jersey-core
import javax.ws.rs.ApplicationPath;

// standard JAVA objects
import java.util.Set;
import java.util.HashSet;

/**
 *
 * @author johnr
 */

// Creating an Application allows me to skip putting all of this servlet 
// configuration stuff in my web.xml.
// Apache Tomcat implements a Servlet 3.0 container, so a web.xml is not
// required (although, I have one anyway but for other reasons)
@ApplicationPath("/api")
public class NoteApp extends Application {

    Set<Object> singletons;

    public NoteApp() {
        this.singletons = new HashSet<>();
        singletons.add(new NoteResource());
        
    }
    
    @Override
    public Set<Object> getSingletons() {
       return singletons;
    }

    @Override    
    public Set<Class<?>> getClasses() { return null; }
   
}
