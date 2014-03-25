function Connection(userId, cardId) {
 this.userId = userId
 this.cardId = cardId
 this.updateConnected();
}

ConnectionGroup.prototype.updateConnected = function(){
 //ajax call that sets the connected status to what is in the database

// }


Group.getGroups = function(){
  $.getJSON("/connections", function(allConnections){
    for(var i=0; i < allConnections.length; i++){
      var connection = new Connection(allConnections[i].user_id, allConnections[i].card_id);
    }
  }
}