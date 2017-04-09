# webdev-demo-rest_notes

9 April 2017 

<< This repo is under current development and this README is subject to change.>>

Installation instructions at the end of this description

Basic note taker application written using NetBeans.

This demonstrates the following technologies
  - RESTful JSON API using java & jersey
  - front end interface to RESTful service using HTML.
  - note editing & deleting from front end done using jQuery & AJAX.
  - deployment and undeployment to Apache Tomacat using maven plugin
  - build and dependencies managed by Maven
  - items left to do:
    * add in additional REST routes (get with query param, for example)
    * improve error handling
    * add in apache logging using log4j or equivalent
    * JUNIT validation
    * write better installation instructions

Installation
To build:
   mvn clean package

This application is run as a WAR deployed on Apached Tomcat. The URL for get/post operations
is http://localhost:8080/Note/api/notes/

Currently, this project only generates a WAR file. You will have to deploy the Note.war to
Apache Tomcat yourself.

Validation
Validation was done using Postman.

