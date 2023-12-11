var map;
var marker;
var street = $("#street");
var city = $("#city");
var country = $("#country");

//Inicjalni prikaz mape i dodavanje dogadjaja poljima forme
function initMap() {
  var DefaultLatLng = { lat: 44.81742010282862, lng: 20.460180257727675 }; 

  map = new google.maps.Map(document.getElementById('map'), {
    center: DefaultLatLng,
    zoom: 15
  });

  marker = new google.maps.Marker({
    position: DefaultLatLng,
    map: map,
    title: 'Belgrade!'
  });

  street.keyup(()=>{ markerUpdate()});
  city.keyup(()=>{markerUpdate()});
  country.keyup(()=>{markerUpdate()});
}

//Azuriranje markera na mapi u zavisnosti od toga sta je sve uneto u poljima forme
function markerUpdate() {
  if (street && city && country) {
    var destination = street.val() + ", " + city.val() + ", " + country.val();
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: destination }, function(results, status) {
      if (status === google.maps.GeocoderStatus.OK) {
        var latlng = results[0].geometry.location;
        map.setCenter(latlng);
        marker.setPosition(latlng);
      }
    });
  }
}