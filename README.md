# webdev-demo-rest_notes

17 April 2017 

<< This repo is under current development and this README is subject to change.>>

OVERVIEW

This is a basic back-end application with a RESTful JSON interface. The application
manages note entities with the following JSON model:
{
   id: <unique integer>,
   body: <text body>
}

The back-end interfaces with unix curl to accept/exectute the following RESTful
commands:
  - GET
  - GET/{id}
  - POST
  - PUT/{id}
  - DELETE
  - DELETE/{id}

Examples

% curl -i -H "Content-Type: application/json" -X GET http://localhost:8080/Note/api/notes
% curl -i -H "Content-Type: application/json" -X POST -d '{"body" : "Pick up biscuits."}' http://localhost:8080/Note/api/notes
% curl -i -H "Content-Type: application/json" -X PUT -d '{"body" : "Mow the lawn."}' http://localhost:8080/Note/api/notes/10
% curl -i -H "Content-Type: application/json" -X DELETE http://localhost:8080/Note/api/notes/3

This demonstrates the following technologies
  - RESTful JSON API using java & jersey
  - Front end interface to RESTful service using HTML/JS
    * Bootstrap styling
    * Google fonts
  - Interaction with backend web app via jQuery & AJAX.
  - Build and dependencies managed by Maven
    * Deployment and undeployment to Apache Tomacat via Maven
  - items left to do:
    * improve error handling
    * add in apache logging using log4j or equivalent
    * JUNIT validation
    * write better installation instructions

INSTALLATION

To build & deploy to Tomcat:
   mvn tomcat7:undeploy clean package tomcat7:deploy

This application is run as a WAR deployed on Apached Tomcat. The URL for get/post operations
is http://localhost:8080/Note/api/notes/

Validation
Validation was done using Postman.

