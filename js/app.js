// locations array
var locations = [
	   {title: 'Kaya Ramada Plaza', location: {lat:41.023046, lng:28.627094}, category: 'Hotel', placeid: 'ChIJ5zo1gAJftRQRGBwRuGdD1eE', show: ko.observable(true)},
	   {title: 'Perlavista', location: {lat: 41.016396, lng:28.6274} , category: 'Mall', placeid: 'ChIJlT27DgBftRQRpEX7eg-WgkM', show: ko.observable(true)},
	   {title: 'Starbucks', location: {lat: 41.003917, lng:28.687966} , category: 'Coffee Shop', placeid: 'ChIJATulU4ugyhQRotaCYEtq1TQ', show: ko.observable(true)},
	   {title: 'Kipa', location: {lat: 41.01580269999999, lng:28.6262481} , category: 'Supermarket', placeid:'ChIJdwNYa0letRQR4Fm4mpkdS9Y', show: ko.observable(true)},
	   {title: 'Gratis', location: {lat: 41.0098014, lng:28.6252695} , category: 'Pharmacy', placeid: 'ChIJo6B8TFNetRQR8BPgv09NlAQ', show: ko.observable(true)}
	   ];

// Creates the map	       
   function initMap() {
   var markers =[]; 
   map = new google.maps.Map(document.getElementById('map') , {
	   center: {lat:40.9910381, lng:28.6498144}, 
	   zoom: 14});
	   // Creates the infoWindow
	   var largeInfoWindow = new google.maps.InfoWindow();
	   var bounds = new google.maps.LatLngBounds();
	   
	   for (var i = 0; i <locations.length; i++) {
	         var position = locations[i].location;
		 var title = locations[i].title;
		 var placeid = locations[i].placeid;
		 // Creates the markers
		 var marker = new google.maps.Marker({
		   map:map,
		   position:position,
		   title:title,
		   show: true,
		   animation: google.maps.Animation.DROP,
		   id: i		   
		 });
		 // Attaches marker to locations []
		 locations[i].marker = marker;
		 locations[i].largeInfoWindow = largeInfoWindow;
		 markers.push(marker);
		 bounds.extend(marker.position);
		 // Adds click listener to the marker, if the marker is clicked it will bounce and the infoWindow will appear
		 marker.addListener('click',function() {
		 bouncingMarker(this);
		 populateInfoWindow(this, largeInfoWindow );
		 });
		 
		 locations[i].showInfo = function() {
		 bouncingMarker(this.marker);
		 populateInfoWindow(this.marker, this.largeInfoWindow);
	 }
		 
		 
	   }
	   
	   function populateInfoWindow(marker, infowindow) {
	     if(infowindow.marker != marker) {
		     infowindow.marker = marker;
			 infowindow.setContent('<div>' +marker.title + '</div>');
			 infowindow.open(map, marker);
			 infowindow.addListener('closeclick', function() {
			 //infowindow.setMarker(null);
			   });
		 }
	   } 
	   
	   map.fitBounds(bounds);
	   
	    function bouncingMarker(marker) {
		 for(var i =0; i<locations.length; i++) {
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
	 self.filteredItems = ko.computed(function() {
		 for (var i =0; i < self.selectLocation().length; i++) {
			 if (self.selectedCategory() === "All" || !self.selectedCategory()) {
				 self.selectLocation()[i].show(true);
				 self.selectLocation()[i].marker.setVisible(true);
			 }else if (self.selectedCategory() === self.selectLocation()[i].category) {
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
