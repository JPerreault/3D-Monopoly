3D Monopoly
=======

Live Demo
-----------
A live demo of 3D-Monopoly is available [here](http://monopoly.rickyayoub.com), and is fully functional! You are able to chat with and challenge friends after registering for a (free) account.

How to run
-----------
1) First have a running instance of MongoDB before launching the server.
2) If you want to configure the db/pw/etc the server uses, modify the URI string in /model/User.js
3) Type node monopolyserver.js to run the server(in the right directory of course)
4) At this point the server should successfully connect to the DB and you can access the pages by going to http://localhost:3000/ (or a different port if you change the settings in monopolyserver.js)
5) Playing the game requires registration. Username is alphanumeric characters only or you'll get an error. Password must be at least 6 characters with at least one uppercase letter, one lower case and 1 number. Emails are not validated at all(I didn't get to to sending validation emails in time). 
6) After registration you should be able to login and access the different pages of the hub/game

Technologies
-----------
  * Express
  * Three.js
  * Nodejs
  * Socket.io
  * JQuery
  * Ajax
  * MongoDB(and Mongoose)
  * Express-Partials(with EJS as view engine)
  * Passport
  * Bcrypt
  * Nodemailer
  * Handlebars
  
Features
-----------
  * Fully rendered in *luscious* 3D
  * Nothing to install! Runs in the browser
  * Realtime updating of player moves
  * Challenge friends or play randoms
  * Suspend and resume long Monopoly games!
  * Banking is handled auto-magically
  

