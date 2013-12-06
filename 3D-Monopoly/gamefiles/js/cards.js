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

}

function drawCard(type){
if(type === "comchest"){
 setTimeout(function(){
 community_chest_cards[0].behavior(players[currentPlayer]);updateDisplay();},4000);
 styleCard(community_chest_cards[0].message,"comchest");
}
else if(type === "chance"){
 setTimeout(function(){
 chance_cards[0].behavior(players[currentPlayer]);updateDisplay();},4000);
 styleCard(chance_cards[0].message,"chance");
}
    
    

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