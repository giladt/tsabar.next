const dark = [
  {
    "featureType": "all",
    "elementType": "geometry",
    "stylers": [
      {
        "visibility": "on"
      },
      {
        "color": "#00a895"
      }
    ]
  },
  {
    "featureType": "all",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "landscape",
    "elementType": "all",
    "stylers": [
      {
        "color": "#1f2937"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "all",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "all",
    "stylers": [
      {
        "visibility": "on"
      },
      {
        "color": "#a5f6e4"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.text",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  }
];

const light = [
  {
    "featureType": "all",
    "elementType": "geometry",
    "stylers": [
      {
        "visibility": "on"
      },
      {
        "color": "#00a895"
      }
    ]
  },
  {
    "featureType": "all",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "landscape",
    "elementType": "all",
    "stylers": [
      {
        "color": "#ffffff"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "all",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "all",
    "stylers": [
      {
        "visibility": "on"
      },
      {
        "color": "#a5f6e4"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.text",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  }
];

const MapThemes = { light, dark };

export default MapThemes;
