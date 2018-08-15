/* map */

///////////////

var config = {
    apiKey: "AIzaSyD7SxusedMqWMEMSF6-nPQf_5JvcoMlD_k",
    authDomain: "project1-ffdfe.firebaseapp.com",
    databaseURL: "https://project1-ffdfe.firebaseio.com",
    projectId: "project1-ffdfe",
    storageBucket: "project1-ffdfe.appspot.com",
    messagingSenderId: "177189113878"
  };
  
  firebase.initializeApp(config);
  
  var database = firebase.database();
  
  
  
  // This example adds a search box to a map, using the Google Place Autocomplete
  // feature. People can enter geographical searches. The search box will return a
  // pick list containing a mix of places and predicted search terms.
  // This example requires the Places library. Include the libraries=places
  // parameter when you first load the API. For example:
  // <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">
  function initAutocomplete() {
    var map = new google.maps.Map(document.getElementById('map'), {
      center: { lat: 30.267153, lng: -97.7430608 },
      zoom: 15,
      mapTypeId: 'roadmap',
      styles: [
        {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
        {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
        {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
        {
          featureType: 'administrative.locality',
          elementType: 'labels.text.fill',
          stylers: [{color: '#d59563'}]
        },
        {
          featureType: 'poi',
          elementType: 'labels.text.fill',
          stylers: [{color: '#d59563'}]
        },
        {
          featureType: 'poi.park',
          elementType: 'geometry',
          stylers: [{color: '#263c3f'}]
        },
        {
          featureType: 'poi.park',
          elementType: 'labels.text.fill',
          stylers: [{color: '#6b9a76'}]
        },
        {
          featureType: 'road',
          elementType: 'geometry',
          stylers: [{color: '#38414e'}]
        },
        {
          featureType: 'road',
          elementType: 'geometry.stroke',
          stylers: [{color: '#212a37'}]
        },
        {
          featureType: 'road',
          elementType: 'labels.text.fill',
          stylers: [{color: '#9ca5b3'}]
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry',
          stylers: [{color: '#746855'}]
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry.stroke',
          stylers: [{color: '#1f2835'}]
        },
        {
          featureType: 'road.highway',
          elementType: 'labels.text.fill',
          stylers: [{color: '#f3d19c'}]
        },
        {
          featureType: 'transit',
          elementType: 'geometry',
          stylers: [{color: '#2f3948'}]
        },
        {
          featureType: 'transit.station',
          elementType: 'labels.text.fill',
          stylers: [{color: '#d59563'}]
        },
        {
          featureType: 'water',
          elementType: 'geometry',
          stylers: [{color: '#17263c'}]
        },
        {
          featureType: 'water',
          elementType: 'labels.text.fill',
          stylers: [{color: '#515c6d'}]
        },
        {
          featureType: 'water',
          elementType: 'labels.text.stroke',
          stylers: [{color: '#17263c'}]
        }
      ]
    });
  
  // parking icon
  
  var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
  var icons = {
    parking: {
      icon: iconBase + 'assets/images/parking.png'
    },
  }
  
  // var clickHandler = new ClickEventHandler(map, center);
  // new AutocompleteDirectionsHandler(map);
  
    // Create the search box and link it to the UI element.
    var input = document.getElementById('search-input');
    var searchBox = new google.maps.places.SearchBox(input);
    //map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
    // Bias the SearchBox results towards current map's viewport.
    map.addListener('bounds_changed', function () {
      searchBox.setBounds(map.getBounds());
    });
    var markers = [];
    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
  
    // $("#infoTable").empty();
    $(".btn-submit").on('click', function () {
      $("panel.panel-default").show();
      var places = searchBox.getPlaces();
  
      console.log("places");
      console.log(places);
      console.log("places");
  
      // for loop through places.length
  
      for (var i = 0; i < places.length; i++) {
  
        var objectIWantToSendUp = {
          "formatted_address": places[i].formatted_address,
          "name": places[i].name,
          "likes": 0,
          "rating": places[i].rating
        }
  
        database.ref().push(objectIWantToSendUp);
      
      }
  
  
  
        database.ref().on("child_added", function (snapshot) {
          var name = snapshot.val().name;
          var addresses = snapshot.val().formatted_address;
          var likes = 0;
          var rating = snapshot.val().rating;
  
          $(".clicks").on("click", function(){
            likes++
    
            console.log("likes");
            console.log(likes);
            console.log("likes");
    
            database.ref().set({
              clickCount: likes
            });
          });
  
              database.ref().on("value", function (snapshot) {
  
  
              console.log(snapshot.val());
  
  
              $(".clicks").text(snapshot.val().clickCount);
  
  
              likesCounter = snapshot.val().clickCount;
  
              });
  
  
  
  
          // likes = snapshot.val().likes;
  
  
          $("#infoTable > tBody").append("<tr><td> " + name + "</td><td> " + addresses + " </td><td> " + rating + "☆"+ "</td> <td class='myLikes' value='"+name+"'><button class='clicks'> " + likes + " </button></td></tr>");
    
          
  
        })
  
     
  
      if (places.length == 0) {
        return;
      }
      
  //     infoWindow = new google.maps.InfoWindow;
  // // pop up details 
  // var service = new google.maps.places.PlacesService(map);
  
  // service.getDetails({
  //   placeId: []
  // }, function(place, status) {
  //   if (status === google.maps.places.PlacesServiceStatus.OK) {
  //     var marker = new google.maps.Marker({
  //       map: map,
  //       position: place.geometry.location
        
  //     });
  //     google.maps.event.addListener(marker, 'click', function() {
  //       infowindow.setContent('<div><strong>' + place.name + '</strong><br>' +
  //         'Place ID: ' + place.place_id + '<br>' +
  //         place.formatted_address + '</div>');
  //       infowindow.open(map, this);
  //     });
  //   }
  // });
      // Clear out the old markers.
      markers.forEach(function (marker) {
        marker.setMap(null);
      });
      markers = [];
      // For each place, get the icon, name and location.
      var bounds = new google.maps.LatLngBounds();
      places.forEach(function (place) {
        if (!place.geometry) {
          console.log("Returned place contains no geometry");
          return;
        }
        var icon = {
          url: place.icon,
          size: new google.maps.Size(71, 71),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(17, 34),
          scaledSize: new google.maps.Size(25, 25)
        };
        // Create a marker for each place.
        markers.push(new google.maps.Marker({
          map: map,
          icon: {
            url: "assets/images/parking.png",
          scaledSize: new google.maps.Size(40, 40)},
          title: place.name,
          position: place.geometry.location
        }));
  
        if (place.geometry.viewport) {
          // Only geocodes have viewport.
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }
      });
      map.fitBounds(bounds);
    });
  }
  
  
  
   // geolocation 
  //  if (navigator.geolocation) {
  //   navigator.geolocation.getCurrentPosition(function(position) {
  //     var pos = {
  //       lat: position.coords.latitude,
  //       lng: position.coords.longitude
  //     };
  
  //     infoWindow.setPosition(pos);
  //     infoWindow.setContent('Location found.');
  //     infoWindow.open(map);
  //     map.setCenter(pos);
  //   }, function() {
  //     handleLocationError(true, infoWindow, map.getCenter());
  //   });
  // } else {
    // Browser doesn't support Geolocation
  //   handleLocationError(false, infoWindow, map.getCenter());
  // }
  // }
  
  // function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  // infoWindow.setPosition(pos);
  // infoWindow.setContent(browserHasGeolocation ?
  //                       'Error: The Geolocation service failed.' :
  //                       'Error: Your browser doesn\'t support geolocation.');
  // infoWindow.open(map);
  // }
  
  
  
  
  
  // //When user clicks on likes 
  // grab value of the name, find the value of the name in the databass and update that like by like++
  
  // update likes++, update firebase, get snapshot
  
        // *****New Stuff*****
        
      
        
          // $(".clicks").text(snapshot.val().clickCount);
  
        //*****New Stuff*****
  
        // var likes = 0;
  
  
          // $("#click-button").on("click", function () {
  
          //     likes++;
  
          //     database.ref().set({
          //         clickCount: likesCounter
          //     });
          // });
  
  
        //   database.ref().on("value", function (snapshot) {
  
  
        //       console.log(snapshot.val());
  
  
        //       $("#click-value").text(snapshot.val().clickCount);
  
  
        //       likesCounter = snapshot.val().clickCount;
  