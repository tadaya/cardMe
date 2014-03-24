var allGroups;
var allCards;
var allConnections;


function Card(user, connection){

}

// // CREATE NEW GROUPS
// function addGroups() {
//   $('#group_form').on("submit", function(e){
//     e.preventDefault();
//     input = $('input#group_group_name');
//     $.ajax({
//       url: '/users/' + localStorage["user_id"] + '/groups',
//       // localStorage["user_id"] is a key for a special localstorage hash
//       // that can be found in application.html.erb DmitryJ
//       type: 'POST',
//       data: {group_name: input.val()}
//     });
//     input.val("");
//   showGroups();
//   });
// }

// // GET ALL CONNECTIONS and MATCH WHICH ONES ARE USERS OWN
// function getConnections(){
//   $.getJSON("/connections", function(response){
//     allConnections = response;
//     $("ul.connection-cards").empty();
//     for(var i = 0; i < allConnections.length; i++){
//       if(allConnections[i].user_id == localStorage["user_id"]) {
//         makeCards(i);
//       }
//     }
//   });
// }

// // MAKE CARDS
// function makeCards(i){
//   $.getJSON("/cards/" + allConnections[i].card_id, function(cardFound) {
//     var cards = $("<div class='card' id='" + cardFound.id + "' data-connection='" + allConnections[i].id + "'>");
//     var cardmenu = $("<div class='cardmenu'></div>")
//     var cardContainer = $("<div class='cardContainer'></div>")
//     $(cards).appendTo("ul.connection-cards");
//     $("<li>" + cardFound.email + "</li>").appendTo(cards);
//     $("<li>" + cardFound.phone_number + "</li>").appendTo(cards);
//     $("<li>" + cardFound.organization + "</li>").appendTo(cards);
//     $("<li>" + cardFound.position + "</li>").appendTo(cards);
//     $("<button class='add'> + </button>").appendTo(cardmenu).on("click", addCardToGroup);
//     $("<button class='arrow'> > </button>").appendTo(cardmenu).on("click", console.log("Dashboard"));
//     $(cardmenu).insertAfter(cards)
//     $(cardmenu).appendTo(cardContainer)
//     $(cards).appendTo(cardContainer)
//     $(cardContainer).appendTo($(".connection-cards"))
//   });
// }


// function Check(connection_id){
//   this.connection_id = connection_id
//   this.resonse = 
//         for(var i = 0; i < current_connections.length; i++){
//           if((current_connections[i].connection_id === parseInt(connection_id)) && (current_connections[i].group_id === allGroups[index].id)){
//             return true;
//           } else {
//             return false;
//           }
//         };
//   })};
// };

// // ADD CARD TO GROUP 
// function addCardToGroup(){
//   $('#add-group').remove();
//   $("ul.groups_popup").detach();
//   $("<ul class='groups_popup'>").appendTo($(this).parent());
//   groupsResponse =  $.getJSON("/users/" + localStorage["user_id"] + "/groups");
//   connectionsResponse = $.getJSON("/connections/" + connection_id + "/groupsconnections");
//   function(response){
//     allGroups = response;
//     connectionsResponse = 
//     for(var i = 0; i < allGroups.length; i++) {
//       var connection_id = $(this).parent().parent().parent().parent().attr("data-connection");
//       checkbox = $("<input type ='checkbox'>");
//       check = new Check(connection_id);
//       checkbox.prop("checked", check.checked());
//       $("ul.groups_popup").append(checkbox);
//       $("<li id=" + allGroups[i].id + ">" + allGroups[i].group_name + "</li>").appendTo("ul.groups_popup").append(checkbox);
//       checkbox.on("change", selectGroup);
//     }
//     $("<button class='addGroupButton'>Add To Groups</button>").appendTo("ul.groups_popup").on("click", getConnections);
//   });
// }

// getConnectionGroupInfo = function(index, connection_id, checkbox){
//     $.getJSON("/connections/" + connection_id + "/groupsconnections", function(response) {
//         current_connections = response;
//         for(var i = 0; i < current_connections.length; i++){
//           if((current_connections[i].connection_id === parseInt(connection_id)) && (current_connections[i].group_id === allGroups[index].id)){
//             checkbox.checked = true;
//           } else {
//             checkbox.checked = false;
//           }
//         }
//     });
//   };



// function selectGroup() {
//   var group_id = $(this).parent().attr('id');
//   var connection_id = $(this).parent().parent().parent().attr("data-connection");

//   if(this.checked === true){
//     $.ajax({
//       url: "/groupsconnections",
//       data: {connection: connection_id, group: group_id},
//       type: "POST"
//     });
//   } else {
//     $.ajax({
//       url: "/groupsconnections",
//       data: {connection: connection_id, group: group_id},
//       type: "DELETE"
//     });
//   }
// }



// function showGroups() {
//   $.getJSON("/users/" + localStorage["user_id"] + "/groups", function(response) {
//     allGroups = response;
//     $("ul.groups").empty();
//     for(var i = 0; i < allGroups.length; i++) {
//       ($("<li>" + allGroups[i].group_name + "</li>").append("<span id="+ allGroups[i].id + ">" + ' X ' + "</span>")).appendTo("ul.groups");
//     }// for loop ends
//     $("span").on("click", function(e){
//       var groupId = e.target.id;
//       $.ajax({
//         url: '/users/' + localStorage["user_id"] + '/groups/' + groupId,
//         type: "DELETE",
//         success: function(){
//           e.target.parentElement.remove();
//         }//ends removing element from dom
//       });
//       //ajax closed
//     });// ends listener
//   });// ends getJSON
// }// ends showGroups


// function cardDashboard(){
//   $(".showcard div").remove();
//   $(this).parent().parent().find(".card").clone().appendTo(".showcard");
//   $(".showcard .cardmenu").remove();
//   cardId = $(".showcard .card").attr("id");
//   $(".articles li").remove();
//   $.get("/card_dashboard/"+cardId, {card_id: cardId}, function(response){
//       companySummary = response[0]["company_summary"];
//       // logo = response[0]["logo"];
//       $("<div class=company_summary> Summary:" + companySummary + "</div>").appendTo(".showcard");
//       // $("<div class=company_logo><img src=" + logo + "/></div>").appendTo(".showcard");
//       companyNews = response[0].news;
//       for (var i = 0; i < 4; i++){
//         newsResponse = companyNews[i];
//         $(".articles").append($("<a href=" + newsResponse["Url"] + "><li>" + newsResponse["Title"] + "</li></a>"))
//       }
//     })
// };

// //cardDashboard();
// getConnections();
// showGroups();
// addGroups();

