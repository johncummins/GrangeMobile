src = "https://code.jquery.com/jquery-3.6.0.min.js";
integrity = "sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=";
crossorigin = "anonymous";

// getting the location stored in local memory
var locationVar = window.localStorage.getItem("location");

$(function getLocation() {
	$.getJSON("http://127.0.0.1:8888/php/json-data-modules.php", function (data) {
		$.each(data.modules, function (index, module) {
			// This function gets called once the location has been shown on the map
			// the location shown on the map is passed into this function via the var "modLocation"
			// all modules that are located at this location are outputted to the screen
			function getModulesLocatedHere(modLoc) {
				if (modLoc == module.location) {
					$("#otherModules").append(module.moduleName + "<br>");
				}
			}

			// if (passedInLoc) {
			// 	LocationVar = passedInLoc;
			// }

			if (module.location == locationVar) {
				// showing the locaiton on the map, based off the lat and long coordinates
				var urlbeg = "https://www.google.com/maps/embed/v1/place?key=AIzaSyCtWWW1dJaKuydA632_rukTrh0Z6kx7vls&q=";
				var urlend = "&zoom=18&maptype=roadmap";
				var lat = module.lat;
				var lng = module.long;
				$("iframe").attr("src", urlbeg + lat + "," + lng + urlend); //compiling lat + long to show on map
				var modLoc = module.location;
				getModulesLocatedHere(modLoc); //function to display other modules lcoated here
				specificModuleInfo(modLoc, lat, lng); //function to display module info
			}
		}); //End of Loop
	}); //End of JSON Call
}); //End of document ready function

// function to ouput the modules detials
function specificModuleInfo(modLoc, lat, lng) {
	$("#location_title").text(modLoc);
	$("#location_title1").text("Course lectures located at " + modLoc);
	$("#location_info").text("Cordinates: " + lat + "," + lng);
}

function getNewLocation(passedInLoc) {
	window.localStorage.setItem("location", passedInLoc);
	// $(".map-iframe").load("/map.html .mod-info .maps-card .map-iframe");
}
