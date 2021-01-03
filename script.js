// navigate through the app with event listener
function navigationListener() {
    $("#map-link").on('click', function(event) {
        $(".map").fadeIn().removeClass("hidden"); 
        $(".intro").hide(); 
      });
  

  }