var allCards = [];
var allGroups = [];
var allConnections =[];


function addGroups() {
  $('#group_form').on("submit", function(e){
    e.preventDefault();
    input = $('input#group_group_name');
    $.ajax({
      url: '/users/' + localStorage["user_id"] + '/groups',
      type: 'POST',
      data: {group_name: input.val()}
    });
    input.val("");
  showGroups();
  });
}

function showGroups() {
  $.getJSON("/users/" + localStorage["user_id"] + "/groups", function(groups) {
    $("ul.groups").empty();
    for(var i = 0; i < groups.length; i++) {
      allGroups = [];
      var group = new Group(groups[i]);
      ($("<li>" + groups[i].group_name + "</li>").append("<span id="+ groups[i].id + ">" + ' X ' + "</span>")).appendTo("ul.groups");
    }// for loop ends
    $("span").on("click", function(e){
      var groupId = e.target.id;
      $.ajax({
        url: '/users/' + localStorage["user_id"] + '/groups/' + groupId,
        type: "DELETE",
        success: function(){
          e.target.parentElement.remove();
        }//ends removing element from dom
      });
      //ajax closed
    });// ends listener
  });// ends getJSON
}// ends showGroups


// CARD FACTORY
function Card(card) {
  this.user = localStorage["user_id"];
  this.card = card;
  this.displayCard = function() {
    var cards = $("<div class='card'>");
    var cardmenu = $("<div class='cardmenu'></div>")
    var cardContainer = $("<div class='cardContainer'></div>")
    cardContainer.appendTo("ul.connection-cards");
    cardmenu.appendTo(cardContainer);
    cards.appendTo(cardContainer);
    $("<li>" + "Email: " + this.card.email + "</li>").appendTo(cards);
    $("<li>" + "Phone Number: " + this.card.phone_number + "</li>").appendTo(cards);
    $("<li>" + "Organization: " + this.card.organization + "</li>").appendTo(cards);
    $("<li>" + "Position: " + this.card.position + "</li>").appendTo(cards);
    $("<button class='add'> + </button>").appendTo(cardmenu).on("click", addCardToGroup);
    $("<button class='arrow'> > </button>").appendTo(cardmenu).on("click", cardDashboard);
  }
  allCards.push(this);
};

function Connection(connection) {
  this.connection = connection;
  allConnections.push(this);
}

function Group(group) {
  this.group = group;
  allGroups.push(this);
}

function getUserConnections(){
  $.getJSON("/users/" + localStorage["user_id"] + "/connections", function(connections){
    for(var i=0; i< connections.length; i++){
      allConnections = [];
      var connection = new Connection(connection);
      $.getJSON("/cards/" +connections[i].card_id, function(cardFound){
        console.log(connections[i]);
        var card = new Card(cardFound);
        card.displayCard();
      });
    };
  });
};


function addCardToGroup(){
    $("ul.groups_popup").remove();
    console.log(this);
    $("<ul class='groups_popup'>").appendTo($(this).parent());
    $.getJSON("/users/" + localStorage["user_id"] + "/groups", function(groups){
      for(var i=0; i < groups.length; i++){
        var grouplisting = $("<li>" + groups[i].group_name + "</li>")
        var checkbox = $("<input type='checkbox'>");
        checkbox.appendTo(grouplisting);
        grouplisting.appendTo('ul.groups_popup');

        for(var i=0; i<allConnections.length; i++){
          $.getJSON("/connections/" + allConnections[i].connection.id + "/groupsconnections", function(groupsconnections) {

          });
        }



        $(checkbox).on("change", selectGroup);
      };
  });
}


function selectGroup(group_id, connection_id) {
  if(this.checked === true){
    $.ajax({
      url: "/groupsconnections",
      data: {connection: connection_id, group: group_id},
      type: "POST"
    });
  } else {
    // This deletes the connection from a group
    $.ajax({
      url: "/groupsconnections",
      data: {connection: connection_id, group: group_id},
      type: "DELETE"
    });
  }
}

getUserConnections();
showGroups();
addGroups();







// function addCardToGroup(){
//   $('#add-group').remove();
//   

//   var connection_id = $(this).parent().parent().find(".card").attr("data-connection");
//   // Making ajax request to get all the groups
//     // Get all of the connections that are already grouped together
//     

//       // Iterate through the groups and make a new li and checkbox for the user to make a choice
//       for(var i = 0; i < allGroups.length; i++) {
//         var checkbox = $("<input type='checkbox'>");

//         // Iterate through the table that has the information about which cards have already been connected to a specific group, and if they have been connected previously, check the checkbox true. Otherwise leave it blank.
//         for(var j = 0; j < current_connections.length; j++){
//           if((current_connections[j].connection_id === parseInt(connection_id)) && (current_connections[j].group_id === allGroups[i].id)){
//             $(checkbox).prop('checked', true);
//           }
//         }
//         // Append the li and the checkbox(including it's value) to the popup div called groups_popup
//         groupNames = $("<li id=" + allGroups[i].id + ">" + allGroups[i].group_name + "</li>").appendTo("ul.groups_popup").append(checkbox);
//         $(checkbox).on("change", selectGroup);
//       }
//     });
//     // This button closes the popup box and refreshes all of the connections 
//     $("<button>Add To Groups</button>").appendTo("ul.groups_popup").on("click", getConnections);
//   });
// }





// function cardDashboard(){
//   $(".showcard div").remove();
//   $(this).parent().parent().find(".card").clone().appendTo(".showcard");
//   $(".showcard .cardmenu").remove();
//   cardId = $(".showcard .card").attr("id");
//   console.log(cardId);
//   $(".articles li").remove();
//   $.get("/card_dashboard/"+cardId, {card_id: cardId}, function(response){
//       companySummary = response[0]["company_summary"];
//       $("<div class=company_summary> Summary:" + companySummary + "</div>").appendTo(".showcard");
//       companyNews = response[0].news;
//       for (var i = 0; i < 4; i++){
//         newsResponse = companyNews[i];
//         $(".articles").append($("<a href=" + newsResponse["Url"] + "><li>" + newsResponse["Title"] + "</li></a>"));
//       }
//     });
// }