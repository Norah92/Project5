// locations array
var locations = [
    { title: 'Kaya Ramada Plaza', location: { lat: 41.023046, lng: 28.627094 }, venID: "4bd324e9caff95212019d4f0", category: 'Hotel', show: ko.observable(true) },
    { title: 'Perlavista', location: { lat: 41.016396, lng: 28.6274 }, venID: "4cc6d8c8d43ba1433b5c76f8", category: 'Mall', show: ko.observable(true) },
    { title: 'Starbucks', location: { lat: 40.996779, lng: 28.627213 }, venID: "5860c501f595726398268d19", category: 'Coffee Shop', show: ko.observable(true) },
    { title: 'Lochka', location: { lat: 41.004464, lng: 28.636989 }, venID: "57358755498e7caf6f5aff66", category: 'Restaurant', show: ko.observable(true) },
    { title: 'Aruna', location: { lat: 41.000273, lng: 28.598587 }, venID: "556eb8c1498e5fc6fe5442c0", category: 'Restaurant', show: ko.observable(true) }
];

// Creates the map           
function initMap() {
    var markers = [];
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 40.9910381, lng: 28.6498144 },
        zoom: 14
    });
    // Creates the infoWindow
    var largeInfoWindow = new google.maps.InfoWindow();
    var bounds = new google.maps.LatLngBounds();

    for (var i = 0; i < locations.length; i++) {
        var position = locations[i].location;
        var title = locations[i].title;
        var venID = locations[i].venID;
        // Creates the markers
        var marker = new google.maps.Marker({
            map: map,
            position: position,
            title: title,
            show: true,
            animation: google.maps.Animation.DROP,
            venID: venID
        });
        // Attaches marker to locations []
        locations[i].marker = marker;
        locations[i].largeInfoWindow = largeInfoWindow;
        markers.push(marker);
        bounds.extend(marker.position);
        // Adds click listener to the marker, if the marker is clicked it will bounce and the infoWindow will appear
        marker.addListener('click', function () {
            bouncingMarker(this);
            populateInfoWindow(this, largeInfoWindow);
        });

        locations[i].showInfo = function () {
            bouncingMarker(this.marker);
            populateInfoWindow(this.marker, this.largeInfoWindow);
        }


    }

    function populateInfoWindow(marker, infowindow) {

        if (infowindow.marker != marker) {
            infowindow.marker = marker;
            var clientID = "HQBB51IZ0GLHSB4UQYXCEHLMFP0KZ0V4JDQQ5MNN3CEHAFS2";
            var clientSecret = "J4YLF1LPXAV4IUM5XVZU2BRS4G4LWZVUSB25FJ4PVD2BMOTI";
            var version = "20170101";
            var apiURL = 'https://api.foursquare.com/v2/venues/' + marker.venID + '?client_id=' + clientID + '&client_secret=' + clientSecret + '&v=' + version;
            $.ajax({
                url: apiURL
            }).done(function (data) {
                infowindow.setContent('<div>' + marker.title + '<br>' + data.response.venue.location.formattedAddress + '<br>' + '</div>');
                infowindow.open(map, marker);
            }).fail(function (x, status, error) {
                alert("ERROR");
                console.log("Error:" + error);
                console.log("Status:" + status);
                console.dir(x);
            })

            infowindow.addListener('closeclick', function () {
                infowindow.setMarker(null);
            });
        }
    }

    map.fitBounds(bounds);

    function bouncingMarker(marker) {
        for (var i = 0; i < locations.length; i++) {
            locations[i].marker.setAnimation(google.maps.Animation.DROP);
        }
        marker.setAnimation(google.maps.Animation.BOUNCE);
    }
    ko.applyBindings(new ViewModel());
}
// ViewModel function
function ViewModel() {
    var map;
    var marker;
    var self = this;
    self.categories = ko.observableArray(["All", "Coffee Shop", "Pharmacy", "Mall", "Supermarket", "Hotel"]);
    self.selectedCategory = ko.observable('');
    self.selectLocation = ko.observableArray(locations);
    self.locations = ko.observableArray([]);
    // Filter function    
    self.filteredItems = ko.computed(function () {
        for (var i = 0; i < self.selectLocation().length; i++) {
            if (self.selectedCategory() === "All" || !self.selectedCategory()) {
                self.selectLocation()[i].show(true);
                self.selectLocation()[i].marker.setVisible(true);
            } else if (self.selectedCategory() === self.selectLocation()[i].category) {
                self.selectLocation()[i].show(true);
                self.selectLocation()[i].marker.setVisible(true);
            } else {
                self.selectLocation()[i].show(false);
                self.selectLocation()[i].marker.setVisible(false);
            }
        }
    });
};
// If an error occured, this message will appear 
function mapError() {
    alert("Map didnt load");
}
