var allGroups;
var allCards;

function addGroups() {
  $('#group_form').on("submit", function(e){
    e.preventDefault();
    input = $('input#group_group_name');
    $.ajax({
      url: '/users/' + localStorage["user_id"] + '/groups',
      // localStorage["user_id"] is a key for a special localstorage hash
      // that can be found in application.html.erb DmitryJ
      type: 'POST',
      data: {group_name: input.val()}
    });
    input.val("");
  showGroups();
  });
}


function getConnections(){
  $.getJSON("/connections", function(response){
    allConnections = response;
    $("ul.connection-cards").empty();
    for(var i = 0; i < allConnections.length; i++){
      if(allConnections[i].user_id == localStorage["user_id"]) {
        makeCards(i);
      }
    }
  });
}

function makeCards(i){
  $.getJSON("/cards/" + allConnections[i].card_id, function(cardFound) {
    var cards = $("<div class='card' id='" + cardFound.id + "' data-connection='" + allConnections[i].id + "'>");
    $(cards).appendTo("ul.connection-cards");
    $("<li>" + cardFound.email + "</li>").appendTo(cards);
    $("<li>" + cardFound.phone_number + "</li>").appendTo(cards);
    $("<li>" + cardFound.organization + "</li>").appendTo(cards);
    $("<li>" + cardFound.position + "</li>").appendTo(cards);
    $("<button> + </button>").appendTo(cards).on("click", addCardToGroup);
  });
}


function addCardToGroup(){
  $('ul.groups_popup').remove();
  $("<ul class='groups_popup'>").appendTo($(this).parent());

  var connection_id = ($(this).parent().attr("data-connection"));
  // Making ajax request to get all the groups
  $.getJSON("/users/" + localStorage["user_id"] + "/groups", function(response){
    allGroups = response;
    // Get all of the connections that are already grouped together
    $.getJSON("/connections/" + connection_id + "/groupsconnections", function(response) {
      var current_connections = response;

      // Iterate through the groups and make a new li and checkbox for the user to make a choice
      for(var i = 0; i < allGroups.length; i++) {
        var checkbox = $("<input type='checkbox'>");

        // Iterate through the table that has the information about which cards have already been connected to a specific group, and if they have been connected previously, check the checkbox true. Otherwise leave it blank.
        for(var j = 0; j < current_connections.length; j++){
          if((current_connections[j].connection_id === parseInt(connection_id)) && (current_connections[j].group_id === allGroups[i].id)){
            $(checkbox).prop('checked', true);
          }
        }
        // Append the li and the checkbox(including it's value) to the popup div called groups_popup
        groupNames = $("<li id=" + allGroups[i].id + ">" + allGroups[i].group_name + "</li>").appendTo("ul.groups_popup").append(checkbox);
        $(checkbox).on("change", selectGroup);
      }
    });
    // This button closes the popup box and refreshes all of the connections 
    $("<button>Add To Groups</button>").appendTo("ul.groups_popup").on("click", getConnections);
  
  });
}

function selectGroup() {
  var group_id = $(this).parent().attr('id');
  var connection_id = $(this).parent().parent().parent().attr("data-connection");
  // This posts the connection to whatever group is checked
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



function showGroups() {
  $.getJSON("/users/" + localStorage["user_id"] + "/groups", function(response) {
    allGroups = response;
    $("ul.groups").empty();
    for(var i = 0; i < allGroups.length; i++) {
      ($("<li>" + allGroups[i].group_name + "</li>").append("<span id="+ allGroups[i].id + ">" + ' X ' + "</span>")).appendTo("ul.groups");
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


// function newStories(){
// $(".connection-cards").on("click","div", function(){
//   $(".showcard div").remove();
//   $(this).clone().appendTo(".showcard");
//   cardId = $(".showcard .card").attr("id");
//   $(".articles li").remove();
//   news = $.get("/card_news/"+cardId, {card_id: cardId}, function(){
//       for (var i = 0; i < 4; i++){
//         newsResponse = news.responseJSON[i]
//         $(".articles").append($("<a href=" + newsResponse["Url"] + "><li>" + newsResponse["Title"] + "</li></a>"))
//       }
//     })
//   });
// };

// newStories();
getConnections();
showGroups();
addGroups();