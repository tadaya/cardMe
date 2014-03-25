var allCards = [];
var allGroups = [];
var allConnections =[];
var allGroupsConnections = [];
var allChecks = [];


// CARD FACTORY
function Card(card) {
  this.user = localStorage["user_id"];
  this.card = card;
  this.displayCard = function() {
    var cards = $("<div class='card'>");
    var cardmenu = $("<div class='cardmenu'></div>")
    var cardContainer = $("<div class='cardContainer'id="+ this.card.id + "></div>")
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

function GroupsConnections(groupsconnection){
  this.group = groupsconnection.group_id;
  this.connection = groupsconnection.connection_id;
  allGroupsConnections.push(this);
}

function CheckBox(check, connection, group){
  this.connection = connection;
  this.group = group;
  this.check = check;
  allChecks.push(this);
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
      $.getJSON("/cards/" +connections[i].card_id, function(cardFound){
        var card = new Card(cardFound);
        card.displayCard();
      });
    };
  });
};

function getGroupsConnections(){
  for(var i=0; i < allConnections.length; i++){
    $.getJSON("/connections/" + allConnections[i].connection.id + "/groupsconnections", function(groupsconnections) {
      allGroupsConnections = [];
      for(var j=0; j<groupsconnections.length; j++){
        var cg = new GroupsConnections(groupsconnections[j]);
      };
    })
  };
};

function addCardToGroup(){
  $("ul.groups_popup").remove();
  $("<ul class='groups_popup'>").appendTo($(this).parent());
  cardID = $(this).parent().parent().attr("id");



  allChecks=[];


  for(var i=0; i<allConnections.length;i++){
    for(var j =0; j<allGroups.length; j++){
      var check = false
      var check = new CheckBox(check, allConnections[i].connection.id, allGroups[j].group.id);
    };
  };

  for(var k =0; k<allChecks.length; k++) {
    for(var l=0; l<allGroupsConnections.length; l++){
      if(allGroupsConnections[l].group === allChecks[k].group && allGroupsConnections[l].connection === allChecks[l].connection) {
        allChecks[k].check = true;
      }
    };
  };


  for(var t=0; t<allConnections.length; t++){
    if(allConnections[t].card_id === cardID){
        connectionID = connection[t];
      for(var s=0; t<allChecks.length; s++){
        if(allchecks[s].connection === connectionID){
          for(var j=0; j<allGroups.length; j++){
            var grouplisting = $("<li>" + allGroups[j].group.group_name + "</li>");
            grouplisting.appendTo('.groups_popup');
            var checkbox = $("<input type='checkbox'>");
            checkbox.prop("checekd", allchecks[s].check)
            checkbox.appendTo(grouplisting);
            checkbox.on("change",)
          }
        }
      }
    };
  };
};


function selectGroup() {
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
getGroupsConnections();
showGroups();
addGroups();


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