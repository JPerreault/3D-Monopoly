Author: Jason Perreault

For the 3D engine, we used a javascript 3D graphics engine called three.js. Three.js is a
library that I (Jason) had been exposed to over the summer, and was excited to apply in
additional projects. It works by having underlying geometries for your shapes, a mesh which
consists of that geometry and the material, a scene where everything is rendered and a camera
to view it all through. In addition to the default locked camera, I created an unlocked camera
which you can spin the board and pieces and move everything wherever you want. I suggest you
try it (by clicking the camera button in the top right), it's quite fun.

A note about three.js: it uses WebGL, and heavily. We noted that the project worked far better 
in Google Chrome than in other browsers, as it has the best WebGL support. To get the best
experience from our game, we recommend you run it in Chrome.

camera.js: Done by Jason, this class manages the camera functionality. The camera has two modes:
locked and unlocked. Locked camera follows the user's piece as it moves around the board, and
the unlocked version can be moved around by clicking and dragging.

cards.js: Done by Max, this class manages the chance and community chest cards and their related
functionality. The majority of these cards are implemented.

chat.js: Done by Ricky, handles the chat in between players. This is implemented using sockets,
so the chat messages load instantly. 

controller.js: Contributions by everybody, but especially Philip and Jason. This class drives the 
game itself. It initializes all of the 2D and 3D graphics components, as well as the underlying 
game logic pieces. Included in this class is the logic for hotels, monopolies and drawing these
hotels on the map.

deeds.js: Completed by Ricky, this class initializes the information about each property in the game
and updates the display for the properties when it is necessary. 

movement.js: Done by Philip and Jason, this class has both the logic and graphical components required
to get the monopoly pieces to move on the board, and doing what they should do when the piece lands such
as buying the property, paying rent, etc.

pieceloader.js: Done by Jason, this loads in the external STL file pieces and keeps track of the original 
geometries. Some modifications were needed to be done in order to get them to display correctly, and those
modifications are done here. 

player.js: Done by Philip, this class just defines the Player object and the fields it should have.

sidebar.js: Done by Ricky, handles the 2D money.

stlLoader.js: Part of three.js.

sync.js: Done by Ricky, handles both the initial connection and keeping the players in sync.

tiles.js: Done by Philip, manages the activation logic for many of the board squares.

lib folder: Contains the external libraries (jQuery and three.js) that were used in this project.