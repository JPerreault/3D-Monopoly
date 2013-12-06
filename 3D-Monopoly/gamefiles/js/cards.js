function Card(type, number, message, behavior){
 this.type=type;
 this.number=number;
 this.message=message;
 this.behavior=behavior;

}

function initialize_community_chest_cards(){
 community_chest_cards = new Array();
 
 community_chest_cards.push(new Card("comchest",0,
 "<p>Advance to Go.<br> Collect $200</p>",
 function(player){
  move(player.piece, 0, 0);
  player.money = player.money + 200;
 }
 ));
 
 community_chest_cards.push(new Card("comchest",1,
 "<p>Bank error in your favor. <br>Collect $75.</p>",
 function(player){
   player.money = player.money + 75;
   document.getElementById("money").value = players[currentPlayer].money;
 }
 
 ));
 
 community_chest_cards.push(new Card("comchest",2,
 "<p>Doctor's fees.<br>Pay $50.</p>",
 function(player){
  player.money = player.money - 50;
 }
 
 ));
 
 community_chest_cards.push(new Card("comchest",3,
 "<p>Get out of jail free.<br> This card may be kept unitl needed, or sold.</p>",
 function(player){
  player.cardsHeld.push(this);
  //add code later to remove this card from the com_chest_deck
 }));
 
 community_chest_cards.push(new Card("comchest",4,
 "<p>Go to jail.<br>Go directly to jail.<br>Do not pass Go.<br> Do not collect $200.</p>",
 function(player){
  move(player.piece,0,10);
  player.jailed = true;
 }
 ));
 
community_chest_cards.push(new Card("comchest",5,
"<p>It's your birthday.<br>Collect $10 from each player.</p>",
function(player){
 for(var i=0; i < players.length; i++){
  if(i !== currentPlayer){
   players[i].money = players[i].money - 10;
   player.money = player.money + 10;
  }
 }
}

));

community_chest_cards.push(new Card("comchest",6,
"<p>Grand Opera Night. <br> Collect $50 from every player<br> for opening night seats.</p>",
function(player){
 for(var i=0; i < players.length; i++){
  if(i !== currentPlayer){
   players[i].money = players[i].money - 50;
   player.money = player.money + 50;
  }
 }
}));

community_chest_cards.push(new Card("comchest",7,
"<p>Income Tax refund.<br>Collect $20.</p>",
function(player){
 player.money = player.money + 20;
}

));

community_chest_cards.push(new Card("comchest",8,
"<p>Life Insurance Matures.<br> Collect $100.</p>",
function(player){
player.money = player.money + 100;
}
));

community_chest_cards.push(new Card("comchest",9,
"<p>Pay Hospital Fees of $100.</p>",
function(player){
 player.money = player.money - 100;
}
));

community_chest_cards.push(new Card("comchest",10,
"<p>Pay School Fess of $50.</p>",
function(player){
 player.money = player.money - 50;
}
));

community_chest_cards.push(new Card("comchest",11,
"<p>Receive $25 Consultancy Fee.</p>",
function(player){
 player.money = player.money + 25;
}
));

community_chest_cards.push(new Card("comchest",12,
"<p>You are assessed for street repairs.<br>$40 per house.<br>$115 per hotel.</p>",
function(player){
//I'll write code for this later.
}
));

community_chest_cards.push(new Card("comchest",13,
"<p>You have won second prize in a beauty contest. Collect $10.</p>",
function(player){
 player.money = player.money+10;
}
));

community_chest_cards.push(new Card("comchest",14,
"<p>You inherit $100.</p>",
function(player){
 player.money = player.money+100;
}
));

community_chest_cards.push(new Card("comchest",15,
"<p>From sale of stock you get $50.</p>",
function(player){
 player.money = player.money + 50;
}
));

community_chest_cards.push(new Card("comchest",16,
"<p>Holiday Fund matures. Receive $100.</p>",
function(player){
 player.money = player.money + 100;
}
));
}

function initialize_chance_cards(){
 chance_cards = new Array();
 
 chance_cards.push(new Card("chance",0,
  "<p> Advance to Go.<br>Collect $200.</p>",
  function(player){
   move(player.piece, 0, 0);
   player.money = player.money + 200;
  }
 ));
 
 chance_cards.push(new Card("chance",1,
 "<p>Advance to Trafalgar Square</p>",
 function(player){
  move(player.piece,0,24);
 }));
 
 chance_cards.push(new Card("chance",2,
  "<p>Advance token to nearest Utility. If unowned, you may buy it from the Bank. If owned, throw dice and pay owner a total ten times the amount thrown.</p>",
 function(player){
 var die1 = Math.floor((Math.random()*6)+1);
 var die2 = Math.floor((Math.random()*6)+1);
 
 function lookUp(dest){
  for(var x=0; x<players.length; x++)
    {
        for(var y=0; y<players[x].properties.length; y++){
            
            if(players[x].properties[y] == lookUps[dest]){
                if(players[x].piece.id !== player.piece.id){
                 loss = 10*(die1+die2);
                 player.money = money - loss;
                 players[x].money = players[x].money + loss;
                }
            }
        }
    }
 }
 
 var currPosition = player.playerPosition;
 
 if(currPosition === 7 || currPosition === 36){
  if(!alreadyOwned(12)){
   move(player.piece,0,12);
  }
  else{
   money = player.money;
   move(player.piece,0,12);
   lookUp(12);
  
  }
 }
 else if(currPosition === 22){
  if(!alreadyOwned(28)){
  move(player.piece,0,28);
  }
  else{
   money = player.money;
   move(player.piece,0,28);
   lookUp(28);
  }
 }

  
}));
 
chance_cards.push(new Card("chance",3,
"<p>Advance token to nearest Railroad and pay owner twice the rental which he/she is otherwise entitled. If Railroad is unowned, you may buy it from the Bank.</p>",
function(player){}));

chance_cards.push(new Card("chance",4,
"<p>Advance token to nearest Railroad and pay owner twice the rental which he/she is otherwise entitled. If Railroad is unowned, you may buy it from the Bank.</p>",
function(player){}));

chance_cards.push(new Card("chance",5,
"<p>Advance to Pall Mall - if you pass Go, collect $200.</p>",
function(player){
 if(player.playerPosition > 11){
  player.money = player.money + 200;
  move(player.piece,0,11);
 }
 else{
  move(player.piece,0,11);
 }
}));

chance_cards.push(new Card("chance",6,
"<p>Bank pays you dividend of $50.</p>",
function(player){
 player.money = player.money + 50;
}));

chance_cards.push(new Card("chance",7,
"<p>Get out of Jail free - this card may be kep until needed, or traded/sold.</p>",
function(player){}));

chance_cards.push(new Card("chance",8,
"<p>Go back 3 spaces</p>",
function(player){
if(player.playerPosition - 3 < 0){
 move(player.piece,0,40+(player.playerPosition - 3));
}
else{
move(player.piece,0,player.playerPosition - 3);
}
}));

chance_cards.push(new Card("chance",9,
"<p>Go directly to Jail - do not pass Go, do not collect $200.</p>",
function(player){
getJailed();
}));

chance_cards.push(new Card("chance",10,
"<p>Make general repairs on all your property - for each house pay $25 - for each hotel $100.</p>",
function(player){

}));

chance_cards.push(new Card("chance", 11,
"<p>Pay poor tax of $15.</p>",
function(player){
player.money = player.money - 15;
}));

chance_cards.push(new Card("chance",12,
"<p>Take a trip to Reading Railroad - if you pass Go collect $200.</p>",
function(player){
if(player.playerPosition < 5){
 move(player.piece,0,5);
}
else{
player.money = player.money + 200;
move(player.piece,0,5);
}
}));

chance_cards.push(new Card("chance",13,
"<p>Take a walk on the Boardwalk - advance token to Boardwalk</p>",
function(player){
move(player.piece,0,39);
}));

chance_cards.push(new Card("chance",14,
"<p>You have been elected chairman of the board - pay each player $50</p>",
function(player){
 for(var i=0; i < players.length; i++){
  if(i !== currentPlayer){
   players[i].money = players[i].money + 50;
   player.money = player.money - 50;
  }
 }
}));

chance_cards.push(new Card("chance",15,
"<p>Your building loan matures - collect $150.</p>",
function(player){
 player.money = player.money + 150;
}));

chance_cards.push(new Card("chance",16,
"<p>You have won a crossword competition - collect $100</p>",
function(player){
player.money = player.money + 100;
}));
}

function drawCard(type){
if(type === "comchest"){
 setTimeout(function(){
 community_chest_cards[0].behavior(players[currentPlayer]);updateDisplay();},4000);
 styleCard(community_chest_cards[0].message,"comchest");
}
else if(type === "chance"){
 /*setTimeout(function(){
 chance_cards[16].behavior(players[currentPlayer]);updateDisplay();},4000);*/
 chance_cards[chance_pos].behavior(players[currentPlayer]);
 updateDisplay();
 styleCard(chance_cards[chance_pos].message,"chance");
 socket.emit('chance_pos',{chance:(chance_pos+1)%chance_cards.length});
}
    
    

 /*setTimeout(function(){
 community_chest_cards[0].behavior(players[currentPlayer]);updateDisplay();},4000);*/
 community_chest_cards[community_chest_pos].behavior(players[currentPlayer]);
 updateDisplay();
 styleCard(community_chest_cards[community_chest_pos].message,"comchest");
 socket.emit('com_chest_pos',{com_chest:(community_chest_pos+1)%community_chest_cards.length});
}


function styleCard(message,type){
    if(type === "comchest"){
     var output = "<div class='com_chest_display'>";
     output = output+message;
     output = output+"</div>";
     document.getElementById("community_chest_card_display").innerHTML = output;
     setTimeout(function(){
                   $(".com_chest_display").remove();					
                                                 },5000);
    
    }
    else if(type === "chance"){
     var output = "<div class='chance_display'>";
     output = output + message;
     output = output+"</div>";
     document.getElementById("chance_card_display").innerHTML = output;
        setTimeout(function(){
                   $(".chance_display").remove();
                                            },5000);
    
    }
    


}

