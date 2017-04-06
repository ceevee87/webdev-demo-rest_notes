# webdev-demo-rest_notes

6 April 2017 

<< This repo is under current development and this README is subject to change.>>

Installation instructions at the end of this description

Basic note taker application written using NetBeans.

This demonstrates the following technologies
  - RESTful JSON API using java & jersey
  - build and dependencies managed by Maven
  - items left to do:
    * add in additional REST routes (get with query param, for example)
    * improve error handling
    * refactor wide-spread usage of StreamingOutput code
    * add in a HTML front-end
    * JUNIT validation

Installation
To build:
   mvn clean package

This application is run as a WAR deployed on Apached Tomcat. The URL for get/post operations
is http://localhost:8080/Note/api/notes/

Currently, this project only generates a WAR file. You will have to deploy the Note.war to
Apache Tomcat yourself.

Validation
Validation was done using Postman.

