function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 37.7749,
            lng: -122.4194
        },
        zoom: 14
    });
    var card = document.getElementById('pac-card');
    var input = document.getElementById('pac-input');
    var types = document.getElementById('type-selector');
    var strictBounds = document.getElementById('strict-bounds-selector');

    map.controls[google.maps.ControlPosition.TOP_RIGHT].push(card);

    var autocomplete = new google.maps.places.Autocomplete(input);

    // Bind the map's bounds (viewport) property to the autocomplete object,
    // so that the autocomplete requests use the current map bounds for the
    // bounds option in the request.
    autocomplete.bindTo('bounds', map);

    var infowindow = new google.maps.InfoWindow();
    var infowindowContent = document.getElementById('infowindow-content');
    infowindow.setContent(infowindowContent);
    var marker = new google.maps.Marker({
        map: map,
        anchorPoint: new google.maps.Point(0, -29)
    });

    autocomplete.addListener('place_changed', function() {
        infowindow.close();
        marker.setVisible(false);
        var place = autocomplete.getPlace();
        if (!place.geometry) {
            // User entered the name of a Place that was not suggested and
            // pressed the Enter key, or the Place Details request failed.
            window.alert("No details available for input: '" + place.name + "'");
            return;
        }

        // If the place has a geometry, then present it on a map.
        if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
        } else {
            map.setCenter(place.geometry.location);
            map.setZoom(14); // Why 14? Because it looks good.
        }
        marker.setPosition(place.geometry.location);
        marker.setVisible(true);

        var address = '';
        if (place.address_components) {
            address = [
                (place.address_components[0] && place.address_components[0].short_name || ''),
                (place.address_components[1] && place.address_components[1].short_name || ''),
                (place.address_components[2] && place.address_components[2].short_name || '')
            ].join(' ');
        }

        infowindowContent.children['place-icon'].src = place.icon;
        infowindowContent.children['place-name'].textContent = place.name;
        infowindowContent.children['place-address'].textContent = address;
        infowindow.open(map, marker);
    });


    var icons = {
        grooming: {
            name: 'Grooming',
            icon: 'assets/images/g.png'
        },
        vet: {
            name: 'Vet',
            icon: 'assets/images/v.png'
        },
        store: {
            name: 'Pet Store',
            icon: 'assets/images/s.png'
        },
        hospital: {
            name: 'Pet Hospital',
            icon: 'assets/images/h.png'
        }
    };

    // Store pins you want to display as object with a position and type - where type is the object name of the icon

    var features = [{
        position: new google.maps.LatLng(37.7749, -122.4194),
        type: 'store'
    }, {
        position: new google.maps.LatLng(37.7749, -122.4294),
        type: 'store'
    }, {
        position: new google.maps.LatLng(37.7749, -122.4094),
        type: 'store'
    }, {
        position: new google.maps.LatLng(37.7649, -122.4194),
        type: 'hospital'
    }, {
        position: new google.maps.LatLng(37.7749, -122.4157),
        type: 'hospital'
    }, {
        position: new google.maps.LatLng(37.7749, -122.4194),
        type: 'hospital'
    }, {
        position: new google.maps.LatLng(37.7849, -122.4194),
        type: 'vet'
    }, {
        position: new google.maps.LatLng(37.7749, -122.4194),
        type: 'vet'
    }, {
        position: new google.maps.LatLng(37.7749, -122.4250),
        type: 'grooming'
    }];

    // for each of the objects in the features list create a marker with the objects position and icon

    features.forEach(function(feature) {
        var newmarker = new google.maps.Marker({
            position: feature.position,
            icon: icons[feature.type].icon,
            map: map
        });

        newmarker.addListener('click', function() {
            console.log("clicked a markr");
            $("#icon-info").text("Info of this marker");
            $("#icon-info").css("font-size", "20px");


        });

    });
    // This creates the legend

    var legend = document.getElementById("legend");
    for (var key in icons) {
        var type = icons[key];
        var name = type.name;
        var icon = type.icon;
        var div = document.createElement('div');
        div.innerHTML = '<img src="' + icon + '"> ' + name;
        legend.appendChild(div);
    }

    map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(legend);


    // If the place has a geometry, then present it on a map.
    if (place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport);
    } else {
      map.setCenter(place.geometry.location);
      map.setZoom(14); // Why 14? Because it looks good.
    }
    marker.setPosition(place.geometry.location);
    marker.setVisible(true);

    var address = '';
    if (place.address_components) {
      address = [
        (place.address_components[0] && place.address_components[0].short_name || ''),
        (place.address_components[1] && place.address_components[1].short_name || ''),
        (place.address_components[2] && place.address_components[2].short_name || '')
      ].join(' ');
    }

    infowindowContent.children['place-icon'].src = place.icon;
    infowindowContent.children['place-name'].textContent = place.name;
    infowindowContent.children['place-address'].textContent = address;
    infowindow.open(map, marker);


  var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
  var icons = {
    parking: {
      name: 'Parking',
      icon: iconBase + 'parking_lot_maps.png'
    },
    library: {
      name: 'Library',
      icon: iconBase + 'library_maps.png'
    },
    info: {
      name: 'Info',
      icon: iconBase + 'info-i_maps.png'
    }
  };

  // Store pins you want to display as object with a position and type - where type is the object name of the icon

  var features = [{
      position: new google.maps.LatLng(37.7749, -122.4194),
      type: 'info'
  }, {
      position: new google.maps.LatLng(37.7749, -122.4294),
      type: 'info'
  }, {
      position: new google.maps.LatLng(37.7749, -122.4094),
      type: 'info'
  }, {
      position: new google.maps.LatLng(37.7649, -122.4194),
      type: 'parking'
  }, {
      position: new google.maps.LatLng(37.7749, -122.4157),
      type: 'parking'
  }, {
      position: new google.maps.LatLng(37.7749, -122.4194),
      type: 'parking'
  }, {
      position: new google.maps.LatLng(37.7849, -122.4194),
      type: 'library'
  }, {
      position: new google.maps.LatLng(37.7749, -122.4194),
      type: 'library'
  }, {
      position: new google.maps.LatLng(37.7749, -122.4250),
      type: 'library'
  }];

  // for each of the objects in the features list create a marker with the objects position and icon

  features.forEach(function(feature) {
  var newmarker = new google.maps.Marker({
    position: feature.position,
    icon: icons[feature.type].icon,
    map: map
  });

  newmarker.addListener('click', function() {
    console.log("clicked a markr");
    $("#icon-info").text("Info of this marker");
    $("#icon-info").css("font-size", "20px");
  });

  });
  // This creates the legend

  var legend = document.getElementById("legend");
  for (var key in icons) {
    var type = icons[key];
    var name = type.name;
    var icon = type.icon;
    var div = document.createElement('div');
    div.innerHTML = '<img src="' + icon + '"> ' + name;
    legend.appendChild(div);
  }
  map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(legend);

}


// THE CODE BELOW IS COMMENTED OUT BECAUSE IT MAKES THE CODE ABOVE MOT WORK
// ALSO PLEASE REMEMBER THE GOOGLE MAPS CODE HAS TO BE OUTSIDE OF THE DOCUMENT.READY OR ELSE IT DOESNT WORK

$(document).ready(function() {
  //   var config = {
  //   apiKey: "AIzaSyCQ__vhHShTpCE-GENvH5K9jv8bX4iUdXg",
  //   authDomain: "marksinsaneasylum.firebaseapp.com",
  //   databaseURL: "https://marksinsaneasylum.firebaseio.com",
  //   projectId: "marksinsaneasylum",
  //   storageBucket: "marksinsaneasylum.appspot.com",
  //   messagingSenderId: "587854779697"
  // }
  //   firebase.initializeApp(config);
  //   // setting variables
  //   var database = firebase.database();

  // this retrieves business data
  function getBizData() {
    var search = $("#selection-input").val();
    var location = $("#address-input").val();
    var distance = $("#distance-input").val();
    var queryURL = "http://api.sandbox.yellowapi.com/FindBusiness/?"
      + "what=" + search
      + "&where=" + location
      + "&dist=" + distance
      + "&fmt=JSON&pgLen=5&UID=127.0.0.1"
      + "&apikey=8v2eyjyx79f4m3zcctsyqmxd";

    $.ajax({
      type: "GET",
      url: queryURL,
    }).done(function(response) {
      var dataSize = response.listings.length
      for (var i = 0; i < dataSize; i++) {
        var name = response.listings[i].name;
        var address = response.listings[i].address.street
          + response.listings[i].address.city
          + response.listings[i].address.pcode
          + response.listings[i].address.prov;
        var resultUrl = response.listings[i].merchantUrl;
        var phone = response.listings[i].phone.dispNum;
        var geoCode = response.listings[i].geoCode.latitude
          + response.listings[i].geoCode.longitude;
        var result = $("<p>")
          .html(name + "<br>" + "Address: " + address + "<br>" + "Phone: " + phone + "<br>" + "Website: " + resultUrl)
          .appendTo($("#displayAPI"));
      }
    });

  };
//   var config = {
//   apiKey: "AIzaSyCQ__vhHShTpCE-GENvH5K9jv8bX4iUdXg",
//   authDomain: "marksinsaneasylum.firebaseapp.com",
//   databaseURL: "https://marksinsaneasylum.firebaseio.com",
//   projectId: "marksinsaneasylum",
//   storageBucket: "marksinsaneasylum.appspot.com",
//   messagingSenderId: "587854779697"
// }
//   firebase.initializeApp(config);
//   // setting variables
//   var database = firebase.database();
  var inputSelection = '';
  var inputAddress = '';
  var inputDistance = '';
  var animal = ['pug', 'cat', 'bunny', 'hamster', 'bird'];

  function shuffleAnimal(animal) {
    var j = animal.length - 1;
    var k = Math.floor(Math.random() * (j + 1));
    return animal[k];
  }

  function getGiphy() {
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + shuffleAnimal(animal) + "&limit=100&api_key=dc6zaTOxFJmzC";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function(response) {
      $('#displayGifs').prepend(JSON.stringify(response));
      var selectionDiv = $('<div id="selectionData">');
      var i = Math.floor(Math.random() * 100);
      var gif = response.data[i].images.fixed_height.url;
      var displayGiffy = $('<img>')
          .attr('src', gif)
          .addClass('gifImage');
      selectionDiv.append(displayGiffy);
      $('#displayGif').prepend(selectionDiv);
    })
  }
  function alertModal() {
    // Get the modal
    var modal = document.getElementById('myModal');

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // sets display to block, showing the modal
    modal.style.display = "block";

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
      modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
      if (event.target == modal) {
          modal.style.display = "none";
      }
    }
  }
  function numberModal() {
    var modal = document.getElementById('numberModal');

    // Get the <span> element that closes the modal
    var button = document.getElementsByClassName("close2")[0];

    // sets display to block, showing the modal
    modal.style.display = "block";

    // When the user clicks on button ok, close the modal
    button.onclick = function() {
      modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }
  }

  $('#submit-Info').on('click', function(event) {
      event.preventDefault();
      inputSelection = $('#selection-input').val();
      inputAddress = $('#pac-input').val();
      inputDistance = $('#distance-input').val();
      getGiphy(inputSelection);
      getBizData();
      // clears form fields after hitting submit, selection is reset to 'void' status
      $('#selection-input').val('void');
      $('#address-input').val('');
      $('#distance-input').val('');
  })

  $('#submit-Info').on('click', function(event) {
    event.preventDefault();
    inputSelection = $('#selection-input').val();
    if (inputSelection === 'void') {
      alertModal();
      return false;
    };
    inputAddress = $('#address-input').val().trim();
    if (inputAddress === '') {
      alertModal();
      return false;
    };
    inputDistance = $('#pac-input').val().trim();
    for (var i = 0; i < inputDistance.length; i++) {
      // converts input value to an int
      var number = parseInt(inputDistance[i]);
      // checking to see if input is a number
      if (isNaN(number)) {
        numberModal();
        return false;
      }
    }
    if (inputDistance === '') {
      alertModal();
      return false;
    };

    getGiphy(inputSelection);
    // clears form fields after hitting submit, selection is reset to 'void' status
    $('#selection-input').val('void');
    $('#address-input').val('');
    $('#distance-input').val('');
  })

});
