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
  $('#add-group').remove();
  $("<ul class='groups_popup'>").appendTo($(this).parent());
  $.getJSON("/users/" + localStorage["user_id"] + "/groups", function(response){
  allGroups = response;

    for(var i = 0; i < allGroups.length; i++) {
      var connection_id = $(this).parent().parent().parent().parent().attr("data-connection");
      checkbox = $("<input type='checkbox'>");
      $("<li id=" + allGroups[i].id + ">" + allGroups[i].group_name + "</li>").appendTo("ul.groups_popup").append(checkbox);
      checkbox.on("change", selectGroup);
      //card_id
    }

    $("<button>Add To Groups</button>").appendTo("ul.groups_popup").on("click", getConnections);
  });
}

function selectGroup() {
  var group_id = $(this).parent().attr('id');
  var connection_id = $(this).parent().parent().parent().attr("data-connection");

  if(this.checked === true){
    $.ajax({
      url: "/groupsconnections",
      data: {connection: connection_id, group: group_id},
      type: "POST"
    });
  } else {
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

getConnections();
showGroups();
addGroups();