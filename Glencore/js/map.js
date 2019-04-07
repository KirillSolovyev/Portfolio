        var map;
        function initMap() {
            if(document.getElementById('map') != null){
                var coordinates = {lat: 55.757580, lng: 37.584681};
                if(screen.width <= 500){
                    coordinates = {lat: 55.756666,  lng: 37.582999};
                }
                map = new google.maps.Map(document.getElementById('map'), {
                    center: coordinates,
                    zoom: 17,
                    disableDefaultUI: true
                });

                marker = new google.maps.Marker({
                    position: {lat: 55.757743, lng: 37.583082},
                    map: map,
                    icon: 'img/icon_map.png'
                });

                $.getJSON("js/json/map-style.json", function(data) {
                    map.setOptions({styles: data});
                });
            }
        }