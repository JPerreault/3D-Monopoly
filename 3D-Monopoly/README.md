3D Monopoly
=======

How to run
-----------
To view the game navigate to the gamefiles directory then open monopoly.html.
To run the server(requires nodejs), type node monopolyserver.js in the terminal while in the 3D-Monopoly directory. Then you can access the server pages by typing localhost:3000/home/ (for example) in your browser. The play now button on the home page also accesses the game currently. The server requires a running instance of MongoDB to function(it wouldn't do much without it since you can't store user information or authenticate).

Technologies
-----------
  * Three.js
  * Nodejs
  * Socket.io
  * JQuery
  * MongoDB(and Mongoose)
  * Express-Partials(with EJS as view engine)
  * Passport
  * Bcrypt
  
  
Features
-----------
  * Fully rendered in *luscious* 3D
  * Nothing to install! Runs in the browser
  * Realtime updating of player moves
  * Challenge friends or play randoms
  * Suspend and resume long Monopoly games!
  * Banking is handled auto-magically
  

