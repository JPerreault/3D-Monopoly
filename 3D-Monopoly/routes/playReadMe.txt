Author: Ricky Ayoub

Inside of play.js is where payloads are received from clients and also where
update events are sent out to clients. The GameID is loaded from the database
for the game from that session. This GameID is then also used as the room ID.

When the players connect to a room, play ensures that messages/moves received from
a specific client upon receiving the payload are delegated to the appropriate
room for the gameID. It then writes the data to the database using functions 
in api.js. This way, even if the other clients that are supposed to be in 
the room aren't present, they will automatically be loaded from the database
and the new moves should be present. This allows for a words with friends style
gameplay where you can come and go as you please.

socket.broadcast.to(data.id).emit('update', {game: data.gamestate, firstTime: false});});

Here is an example of broadcasting to a room. data.id contains the gameID, and 
then data.gamestate contains the received gamestate from the client's payload.
This will only go to the proper clients that are actually in the room, not 
including the sender.

api.saveGame(data.id, data.gamestate, theAboveFunction)

This is the call to saveGame. Like the above function, it passes
the appropriate gameID in data.id so that the database knows which
game to update. The callback is also the above function, so that after
the moves are saved to the database, the clients are updated to stay in
sync. This may bog down the database a little with our current system, but
with not many users it is acceptable.