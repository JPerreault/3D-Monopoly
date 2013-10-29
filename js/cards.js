card_position = -1;

function examineCards(delta){
 var cards = new Array("Card 1","Card 2","Card 3");
 
 if(delta === 1){
  if(card_position < cards.length-1){
   card_position = card_position + 1;
   return cards[card_position];
  }
  else{
   return cards[card_position];
  }
 }
 else if(delta === -1){
  if(card_position > 0){
   card_position = card_position - 1;
   return cards[card_position];
  }
  else{
   return cards[card_position];
  }
 }
 
}