# This is a Systemic Functional Linguistics Class & Assignment Management tool created by Maynooth University.
## The web application itself was created using the MEAN stack.
##### Written by Seán Comerford   
This requires a good knowledge of Node.js , Angular.js, Express.js and MongoDB is required.
If you're reading this and you have little to no experience developing web applications using Node.js then I highly recommend watching these series on Youtube:
* [Building A MEAN App From Scratch](https://www.youtube.com/watch?v=PFP0oXNNveg&feature=youtu.be)
* [Node.js login System](https://www.youtube.com/watch?v=Z1ktxiqyiLA&t=321s) (This application was built up from this)

## Installation Guide

### Requires:
* Node.js
* MongoDB

### Replicating The Database:

MongoDB has very simple dump and store mechanisms. <br>
The database information is stored in the dump folder in this repository. In order to store the database on your machine you need to open the mongoshell and use this command:<br>
`
Mongorestore --db DataBaseName /path/to/DataBaseName 
` 
<br>
This should have copied and stored the database to your machine.

### Running The Web Application:
This is pretty easy, go to the base folder and use git bash to start the node app with: `node app` <br>
This should start the application on `localhost:3000` so open up chrome and type that in.

## To-Do List

### Authentication:

* When a new user registers (student or teacher), the system should check whether that their username is not already in the database.
    * All usernames in the system must be unique.
    * This just requires a quick MongoDB find for the username they want to use.
    * If it returns with a match, redirect back to the register page and tell them that their username is taken.
    
### Annotation Tool 

* Loading User Saved Attempts To Their Screen
    * This doesn't seem to be too difficult. It'll require a slight modification to **/public/anno/main.js** so rather than waiting for a file to be uploaded via the user, the files will be pulled down from MongoDB and displayed to the user.
    * A slight modification to this would be on the teachers end, they have a dropdown menu of all students. When a student is selected, it will load in their annotations to the screen in real time.
    * The student submissions are saved inside the classassignments mongo collection.
    
* Displaying SFL Trees and Boxes 
    * This also doesn't seem too difficult. Once the annotations are able to load onto the page, the **/public/anno/main.js** file should be able to do all the computation and drawing of these diagrams.
    * The work here will be creating a seperate box alongside the first modal box that'll display these diagrams.
    * Other than that it'll be making sure the javascript knows the dorrect div id's to put the content into.