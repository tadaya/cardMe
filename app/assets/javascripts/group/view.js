function renderGroupsPopup(){

  var popup = $("<ul class ='groups_popup'>")
  popup.appendTo($(this).parent());
  for(var i=0; i < CardMe.groups.length; i++ ){
    var group = $("<li data-connection=" + CardMe.groups[i].id + ">" + CardMe.groups[i].name + "</li>")
    group.appendTo(popup);
    var checkbox = $("<input type='checkbox'>");
    var checked = false;
    isCheckboxChecked(checked);
    console.log(checked)
    checkbox.prop("checked", checked);
    console.log(checked)
    checkbox.appendTo(group);

    var groupId = checkbox.parent().attr("data-connection");
    console.log(groupId)
    var connectionId = checkbox.parent().parent().parent().find(".add").attr("data-connection");
    console.log(connectionId)

    checkbox.on("change", function() {
      if(this.checked === false) {
         deleteGroupConnection(connectionId, groupId)
      } else {
        postGroupConnection(connectionId, groupId)
    }
  })

}

  $("<button class='popup_save'> Close </button>").appendTo(popup);
}


function postGroupConnection(connectionId, groupId) {
    $.ajax({
    url: "/groupsconnections",
    data: {connection: connectionId, group: groupId},
    type: "POST"
  });
};

function deleteGroupConnection(connectionId, groupId) {
   $.ajax({
    url: "/groupsconnections",
    data: {connection: connectionId, group: groupId},
    type: "DELETE"
  });
};

function isCheckboxChecked(checked){
  var connectionId = $(this).parent().parent().parent().find(".add").attr("data-connection");
  var groupId = $(this).parent().attr("data-connection");

  for(var i = 0; i < CardMe.groupsconnections.length; i++){
    if((CardMe.groupsconnections[i].connectionId == connectionId ) && (CardMe.groupsconnections[i].groupId == groupId )){
        checked = true;
    }
  }
}



// CardMe.groupsconnections 

 // $("ul.groups_popup").remove();
//   popup = $("<ul class='groups_popup'>");
//   popup.appendTo($(this).parent());
//   cardID = $(this).parent().parent().attr("id");
//   var connectionID;

//   // match connection to card ID
//   for(var x=0; x<allConnections.length; x++){
//       if(allConnections[x].connection.card_id === cardID){
//       connectionID = allConnections[x].connection.id;
//     }
//   }