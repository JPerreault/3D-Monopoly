Author: Scott Hoffman

This directory contains the model of the data as its stored on the db. For this project I used MongoDB as database and Mongoose as an object oriented library to interact with MongoDB. In this project we have two types of data stored in the db, users and games. In User.js the model of a User is defined, a username, password, etc, and then a pre-save hashing is done using a bcrypt implementation for node along with a salt. This is how we provide some password security on the db, as simply stealing the hashed password off the db won't be enough to login. 

Game.js contains the model for each game. Basically on every turn these db entries will be updated and allow a user to reload a game later. 

The strength of this approach is that not only can I export these files wherever I need to create/update the db but I can also use object oriented programming with Mongoose which is something that made this a lot easier to work with. See api.js in the /controllers directory for examples of this.