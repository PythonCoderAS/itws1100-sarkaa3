function validate(formObj) {
  
  if (formObj.title.value == "") {
    alert("Please enter a first name");
    formObj.title.focus();
    return false;
  }
  
  if (formObj.lastName.value == "") {
    alert("Please enter a last name");
    formObj.lastName.focus();
    return false;
  }
  
  if (formObj.dob.value == "") {
    alert("Please enter a date of birth");
    formObj.dob.focus();
    return false;
  }
    
  return true;
}


function moviesOnLoad() {
  
  // focus the name field on first load of the page
  $("#title").focus();
     
  $(".deleteMovie").click(function() {
    if(confirm("Remove movie? (This action cannot be undone.)")) {
      
      // get the id of the clicked element's row
      var curId = $(this).closest("tr").attr("id");
      // Extract the db id of the movie from the dom id of the clicked element
      var movieId = curId.substr(curId.indexOf("-")+1);
      // Build the data to send. 
      var postData = "id=" + movieId;
      // we could also format this as json ... jQuery will (by default) 
      // convert it into a query string anyway, e.g. 
      // var postData = { "id" : movieId };
      
      $.ajax({
        type: "post",
        url: "movie-delete.php",
        dataType: "json",
        data: postData,
        success: function(responseData, status){
          if (responseData.errors) {
            alert(responseData.errno + " " + responseData.error);
          } else {
            // Uncomment the following line to see the repsonse message from the server
            // alert(responseData.message);
            
            // remove the table row in which the image was clicked
            $("#" + curId).closest("tr").remove();
            
            // if a php generated message box is up, hide it:
            $(".messages").hide();
            
            // populate the js message box and show it:
            $("#jsMessages").html("<h4>Movie deleted</h4>").show();
            
            // re-zebra the table
            $("#movieTable tr").each(function(i){
              if (i % 2 == 0) {
                // we must compensate for the header row...
                $(this).addClass("odd"); 
              } else {
                $(this).removeClass("odd");
              }
            });
          }
        },
        error: function(msg) {
          // there was a problem
          alert(msg.status + " " + msg.statusText);
        }
      });
      
    }
  });
}

function moviesOnLoad() {
  
  // focus the name field on first load of the page
  $("#title").focus();
     
  $(".deleteMovie").click(function() {
    if(confirm("Remove movie? (This action cannot be undone.)")) {
      
      // get the id of the clicked element's row
      var curId = $(this).closest("tr").attr("id");
      // Extract the db id of the movie from the dom id of the clicked element
      var movieId = curId.substr(curId.indexOf("-")+1);
      // Build the data to send. 
      var postData = "id=" + movieId;
      // we could also format this as json ... jQuery will (by default) 
      // convert it into a query string anyway, e.g. 
      // var postData = { "id" : movieId };
      
      $.ajax({
        type: "post",
        url: "movie-delete.php",
        dataType: "json",
        data: postData,
        success: function(responseData, status){
          if (responseData.errors) {
            alert(responseData.errno + " " + responseData.error);
          } else {
            // Uncomment the following line to see the repsonse message from the server
            // alert(responseData.message);
            
            // remove the table row in which the image was clicked
            $("#" + curId).closest("tr").remove();
            
            // if a php generated message box is up, hide it:
            $(".messages").hide();
            
            // populate the js message box and show it:
            $("#jsMessages").html("<h4>Movie deleted</h4>").show();
            
            // re-zebra the table
            $("#movieTable tr").each(function(i){
              if (i % 2 == 0) {
                // we must compensate for the header row...
                $(this).addClass("odd"); 
              } else {
                $(this).removeClass("odd");
              }
            });
          }
        },
        error: function(msg) {
          // there was a problem
          alert(msg.status + " " + msg.statusText);
        }
      });
      
    }
  });
}

$(document).ready(function () {
  if (location.href.endsWith("movies.php")){
    moviesOnLoad();
  } else {
    moviesOnLoad()
  }
});
