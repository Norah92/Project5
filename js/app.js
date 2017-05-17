
// Model
var locations = [
	   {title: 'Kaya Ramada Plaza', location: {lat:41.023046, lng:28.627094}, category: 'Hotel', id: 'ChIJ5zo1gAJftRQRGBwRuGdD1eE' },
	   {title: 'Perlavista', location: {lat: 41.016396, lng:28.6274} , category: 'Mall', id: 'ChIJlT27DgBftRQRpEX7eg-WgkM' },
	   {title: 'Starbucks', location: {lat: 41.003917, lng:28.687966} , category: 'Coffee Shop', id: 'ChIJATulU4ugyhQRotaCYEtq1TQ' },
	   {title: 'Kipa', location: {lat: 41.01580269999999, lng:28.6262481} , category: 'Supermarket', id:'ChIJdwNYa0letRQR4Fm4mpkdS9Y' },
	   {title: 'Gratis', location: {lat: 41.0098014, lng:28.6252695} , category: 'Pharmacy', id: 'ChIJo6B8TFNetRQR8BPgv09NlAQ' }
	   ];
	   
	   

// ViewModel	   
  var ViewModel = function () {
  var map;
  var markers =[]; 
	var self = this;
	var currentMarker;
	
	
	
	this.locations = ko.observableArray([]);

	
	
	  this.locationsList = ko.observableArray([]);
	  locations.forEach(function(loc) {
		self.locationsList().push(new Location(loc));
	});
};
   
   this.categories =["All","Coffee Shop", "Pharmacy", "Mall", "Supermarket", "Hotel"];
	
	// filter locations[] array
	self.filter = ko.observable('');
	
	self.filteredItems = ko.computed(function() {
		var filter = self.filter();
		if (!filter) {
			return self.locations;
		} else {
			return ko.utils.arrayFilter(self.locations, function(loc) {
				return loc.category == filter;
			});
		}
	});

function mapError() {
	alert("Map didnt load");
}

var Location = function(data) {
    this.title = ko.observable(data.title);
    this.markerIndex = data.value;
    this.category = ko.observable(data.category);
}

ko.applyBindings(new ViewModel());
