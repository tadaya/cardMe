var allGroups;
function addGroups() {
  $('#group_form').on("submit", function(e){
    e.preventDefault();
    input = $('input#group_group_name')
    $.ajax({
      url: '/users/' + localStorage["user_id"] + '/groups',
      // localStorage["user_id"] is a key for a special localstorage hash
      // that can be found in application.html.erb DmitryJ
      type: 'POST',
      data: {group_name: input.val()}
    });
    input.val("")
  showGroups()
  });
}
  

function showGroups() {
  $.getJSON("/users/" + localStorage["user_id"] + "/groups", function(response) {
    allGroups = response;
    $("ul.groups").empty();
    for(i = 0; i < allGroups.length; i++) {
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
    })// ends listener
  });// ends getJSON
}// ends showGroups


showGroups();
addGroups();