var allCards = [];
var allConnections =[];

var allGroups = [];

var allGroupsConnections = [];
var allChecks = [];

// CARD FACTORY
function Card(card) {
  this.user = localStorage["user_id"];
  this.card = card;
  allCards.push(this);
};

function displayCards() {
  for(var i=0;i<allCards.length;i++) {
    card = allCards[i];
    var cards = $("<div class='card'>");
    var cardmenu = $("<div class='cardmenu'></div>");
    var cardContainer = $("<div class='cardContainer'id="+ this.card.id + "></div>")
    cardContainer.appendTo("ul.connection-cards");
    cardmenu.appendTo(cardContainer);
    cards.appendTo(cardContainer);
    $("<li>" + "Email: " + card.email + "</li>").appendTo(cards);
    $("<li>" + "Phone Number: " + card.phone_number + "</li>").appendTo(cards);
    $("<li>" + "Organization: " + card.organization + "</li>").appendTo(cards);
    $("<li>" + "Position: " + card.position + "</li>").appendTo(cards);
    $("<button class='add'> + </button>").appendTo(cardmenu).on("click", addCardToGroup);
    $("<button class='arrow'> > </button>").appendTo(cardmenu).on("click", console.log("DASH"));
  };
};

function Connection(connection) {
  this.connection = connection;
  allConnections.push(this);
  this.card = allCards.indexOf(this);
}

function Group(group) {
  this.group = group;
  allGroups.push(this);
}

function GroupsConnections(groupsconnection){
  this.group = groupsconnection.group_id;
  this.connection = groupsconnection.connection_id;
  allGroupsConnections.push(this);
}



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
    allGroups = [];
    for(var i = 0; i < groups.length; i++) {
      var group = new Group(groups[i]);
      ($("<li>" + groups[i].group_name + "</li>").append("<span id="+ groups[i].id + ">" + ' X ' + "</span>")).appendTo("ul.groups");
    }// for loop ends
    $("span").on("click", function(e){
      var groupId = e.target.id;
      $.ajax({
        url: '/users/' + localStorage["user_id"] + '/groups/' + groupId,
        type: "DELETE",
        success: function(){
          for(var i=0; i<allGroups.length; i++) {
            if(allGroups[i].group.id==groupId){
             allGroups.splice(i, 1); 
            }
          }
          e.target.parentElement.remove();
        }//ends removing element from dom
      });
      //ajax closed
    });// ends listener
  });// ends getJSON
}// ends showGroups


function getUserConnections(){
  $.getJSON("/users/" + localStorage["user_id"] + "/connections", function(connections){
    allConnections = [];
    for(var i=0; i < connections.length; i++){
      var connection = new Connection(connections[i]);
      $.getJSON("/cards/" + connections[i].card_id, function(cardFound){
        var card = new Card(cardFound);
      });
    };
  });
};

function getGroupsConnections(){
  for(var i=0; i < allConnections.length; i++){
    $.getJSON("/connections/" + allConnections[i].connection.id + "/groupsconnections", function(groupsconnections) {
      for(var j=0; j<groupsconnections.length; j++){
        var cg = new GroupsConnections(groupsconnections[j]);
      };
    })
  };
};

function addCardToGroup(){
  $("ul.groups_popup").remove();
  popup = $("<ul class='groups_popup'>");
  popup.appendTo($(this).parent());
  cardID = $(this).parent().parent().attr("id");
  var connectionID;

  // match connection to card ID
  for(var x=0; x<allConnections.length; x++){
      if(allConnections[x].connection.card_id === cardID){
      connectionID = allConnections[x].connection.id;
    }
  }

  allChecks=[];

  for(var i=0; i<allConnections.length;i++){
    for(var j =0; j<allGroups.length; j++){
      var checkbox = $("<input type='checkbox' data-connection=" + allConnections[i].connection.id + " data-group=" + allGroups[j].group.id +">");
      allChecks.push(checkbox);
    };
  };

  for(var k =0; k<allChecks.length; k++) {
    for(var l=0; l<allGroupsConnections.length; l++){
      if( (allGroupsConnections[l].group === allChecks[k].attr("data-group")) && (allGroupsConnections[l].connection === allChecks[l].attr("data-connection"))) {
        allChecks[k].prop("checked", true);
      }
    };
  };

  for(var t=0; t<allGroups.length; t++){
    for(var s=0; s<allChecks.length; s++){
      if(allChecks[s].attr("data-connection") === connectionID) {
        allchecks[s].appendTo(popup);
        allchecks[s].on("change", selectGroup);
      }
    }
  }
};

function selectGroup() {
  if(this.checked === true){
    $.ajax({
      url: "/groupsconnections",
      data: {connection: this.attr('data-connection'), group: this.attr('data-group')},
      type: "POST"
    });
  } else {
    // This deletes the connection from a group
    $.ajax({
      url: "/groupsconnections",
      data: {connection: this.attr('data-connection'), group: this.attr('data-group')},
      type: "DELETE"
    });
  }
}




addGroups();
showGroups();

displayCards();
getUserConnections();
getGroupsConnections();
displayCards();


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