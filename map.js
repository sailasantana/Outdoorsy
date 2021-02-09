require([
  "esri/Map",
  "esri/views/MapView",
  "esri/tasks/Locator",
  "esri/Graphic"
], function(Map, MapView, Locator, Graphic) {

  var map = new Map({
    basemap: "topo-vector"
  });

  var view = new MapView({
    container: "viewDiv",
    map: map,
    center: [-118.80543,34.02700],
    zoom: 6
  });

  var places = ["Trail","Campground", "Beach","Ski Resort","Park"];

  var select = document.createElement("select","");
   select.setAttribute("class", "esri-widget esri-select");
   select.setAttribute("style", "width: 175px; font-family: Avenir Next W00; font-size: 1em");
  places.forEach(function(p){
    var option = document.createElement("option");
    option.value = p;
    option.innerHTML = p;
    select.appendChild(option);
  });

  view.ui.add(select, "top-right");

  var locator = new Locator({
     url: "http://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer"
  });

  // Find places and add them to the map
  function findPlaces(category, pt) {
    locator.addressToLocations({
      location: pt,
      categories: [category],
      maxLocations: 105,
      outFields: ["*"]
    })
    .then(function(results) {
      view.popup.close();
      view.graphics.removeAll();
      results.forEach(function(result){
        view.graphics.add(
          new Graphic({
            attributes: result.attributes,
            geometry: result.location,
            symbol: {
             type: "simple-marker",
             color: "#000000",
             size: "12px",
             outline: {
               color: "#ffffff",
               width: "2px"
             }
            },
            popupTemplate: {
              title: "{PlaceName}",
              content: "{Place_addr}"
            }
         }));
      });
    });
  }

  // Search for places in center of map
  // view.when(function() {
  //   findPlaces(select.value, view.center);
  // });

  view.watch("stationary", function(val) {
    if (val) {
      findPlaces(select.value, view.center);
    }
  });

  // Listen for category changes and find places
  select.addEventListener('change', function (event) {
    findPlaces(event.target.value, view.center);
  });

  // Listen for mouse clicks and find places
  view.on("click", function(event){
    view.hitTest(event.screenPoint)
      .then(function(response){
        if (response.results.length < 2) { // If graphic is not clicked, find places
findPlaces(select.options[select.selectedIndex].text, event.mapPoint);
        }
    })
  });

});

// navigate through the app with event listener
function navigationListener() {
  $("#map-link").on("click", function(event) {
    $(".map").fadeIn().removeClass(".hidden"); 
    $(".intro").hide(); 
  });

  $("#home-link").on('click', function(event) {
    $(".intro").fadeIn(); 
    $(".map").hide().addClass("hidden"); 
  });

  $('#form-link').on('click', function(event){
    $(".weatherPage").fadeIn().removeClass('.hidden')
    $(".form").fadeIn().removeClass('.hidden');
    $(".map").hide().addClass('hidden');
  });

  $('#search-link').on('click', function(event){
    $(".map").fadeIn().removeClass('.hidden');
    $(".weatherPage").hide().addClass('.hidden')
    $(".form").hide().addClass('hidden');
    
  })

}




$(navigationListener)