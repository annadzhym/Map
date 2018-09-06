'use strict';
(function ($) {
    var elMap = $('.maps')[0];

    var che = {lat: 51.4909998, lng: 31.2964407};
    var mymap = new google.maps.Map(elMap, {
        zoom: 12,
        center: che,
        styles: [{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#444444"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#46bcec"},{"visibility":"on"}]}]
    });

    var mymarker = new google.maps.Marker({
        position: che,
        map: mymap,
        title: 'Cherhihiv',
        icon: './img/icon.png'
    });


    var geocoder = new google.maps.Geocoder();


    function createRoute() {
        var origin = $('.origin').val();
        geocoder.geocode( { 'address': origin}, function(results, status) {
            if (status === 'OK') {
                mymap.setCenter(results[0].geometry.location);
                var markerOrigin = new google.maps.Marker({
                    map: mymap,
                    position: results[0].geometry.location
                });
            } else {
                alert('Что-то не сработало ' + status);
            }
        });
        var destination = $('.destination').val();
        geocoder.geocode( { 'address': destination}, function(results, status) {
            if (status === 'OK') {
                mymap.setCenter(results[0].geometry.location);
                var markerDestination = new google.maps.Marker({
                    map: mymap,
                    position: results[0].geometry.locagtion
                });
            } else {
                alert('Что-то не сработало ' + status);
            }
        });

        var directionsDisplay = new google.maps.DirectionsRenderer();
        var request = {
            origin: origin,
            destination: destination,
            travelMode: google.maps.DirectionsTravelMode.DRIVING
        };
        var directionsService = new google.maps.DirectionsService();
        directionsService.route(request, function(response, status) {
            if (status === google.maps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(response);
            }
        });

        directionsDisplay.setMap(mymap);
    }
    $('.route').click(createRoute());

})(jQuery);