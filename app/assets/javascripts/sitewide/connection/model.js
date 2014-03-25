function Connection(userId, cardId) {
 this.userId = userId;
 this.cardId = cardId;
 // this.updateConnected();
}

// ConnectionGroup.prototype.updateConnected = function(){
 //ajax call that sets the connected status to what is in the database

// }


Connection.getConnections = function(){
  $.getJSON("/connections", function(allConnections){
    for(var i=0; i < allConnections.length; i++){
      var connection = new Connection(allConnections.user_id, allConnections.card_id);
      CardMe.connections.push(connection);
    }
  });
}

// Connection.getConnectionsForUser = function(){
//   $.getJSON("/users/"+ localStorage["user_id"]+"/connections", function(allConnections){
//     for(var i=0; i < allConnections.length; i++){
//       var connection = new Connection(allConnections.user_id, allConnections.card_id);
//     }
//   });
// }

console.log("CONNECTION MODEL");

