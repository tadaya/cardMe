function Card(cardName, userId, card) {
 this.cardName = cardName;
 this.userId = userId;
 this.card = card;
 this.updateConnected();
}

ConnectionGroup.prototype.updateConnected = function(){
 //ajax call that sets the connected status to what is in the database

// }


Group.getGroups = function(){
  $.getJSON("/cards", function(cards){
    for(var i=0; i < cards.length; i++){
      var card = new Card(cards[i].card_name, cards[i].user_id, card[i]);
    }
  }
}