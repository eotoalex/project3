import React from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import Slider from "../slider/Slider";
import axios from "axios"
import './Maps.css';

const mapStyles = {
  width:"100vw",
  height:"100vh",
  // pointerEvents:"none",
};
 
class Maps extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
        map:[],
        coords:[],   
        crimeNews:[] || 'Loading...' 
    }
  }
  // User icon image, sized for the map.
  markerIcon = {
    url:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvFiVpCGq6a1uRuvpBvmybCdTrbu-LzbRQyLMF7JR_JUudoEb8FQ&s",
    scaledSize: new this.props.google.maps.Size(40, 40)
  }

  async componentDidMount () {
    const crimeNews = await axios.get("/scrapeNews")
        this.setState({
            crimeNews : crimeNews.data
        });   
  }

  setsRoute = (mapProps, map) => {
    let lat = this.props.destination.latitude;
    let lng = this.props.destination.longitude;
    let usrLocation = this.props.usrCurrentLocation;
    
    // set the state to retain the instance of the map we have rendered.
    if(map !== undefined){
    this.setState({map:map})
    console.log(map)
    }
    let mapObj = this.state.map;
    if(this.props.destination.length !== 0){
    this.calcRoutes(mapObj,usrLocation,lat,lng)
    console.log("We have an address", lat,lng)
    } else {console.log("There is nothing in the props for destination!")}
    console.log("map OUTSIDE STATE",map)
  }
  
   polyLineClosure = (polylineOptions,map) => {
    let safePath;
    safePath = new this.props.google.maps.Polyline(polylineOptions[0]);
    safePath.setMap(map);
   }

    calcRoutes = (map,usrLocale,lat,lng) => {
      let polylineOptions = [];
      let directionsService = new this.props.google.maps.DirectionsService();
      let start = usrLocale;
      let end = new this.props.google.maps.LatLng(lat,lng);
      let request = {
        origin:start,
        destination: end,
        optimizeWaypoints:true,
        travelMode: 'WALKING',
        provideRouteAlternatives:true
      }
      directionsService.route(request, (res, status) => {
        let points = []
        if (status === 'OK'){
          points = res.routes[0].overview_path;
           polylineOptions.push( {
            path: points,
            geodesic: true,
            strokeColor: '#FF0000',
            strokeOpacity: 1.0,
            strokeWeight: 2,
            map:map
          })
      } else {
        console.log("error ", status)
      }
      this.polyLineClosure(polylineOptions,map)
    })
  }
    render(){
    // This variable holds the crime icon, sized for the map when rendered.
    const crimeIcon = {
      url:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXL8dMbULRMR3YVcdoZKDvHAKDEnyRIqnPx-llmYVULI5oTCTd&s",
      scaledSize: new this.props.google.maps.Size(40, 40)
      }
    // This variable holds the locations of most current crime locations and renders them to the map as markers.
    const crimeLocales = this.props.coor.map(function(item){
          return(
          <Marker 
          position={item}
          icon={crimeIcon}
          />
        );
      });
      return(
        <div>   
          <Map
            className="google-map"
            google={this.props.google}
            zoom={11}
            disableDefaultUI= {true}
            styles={[
              {
                "featureType": "road.arterial",
                "elementType": "geometry.stroke",
                "stylers": [
                  {
                    "color": "#7cff78"
                  },
                  {
                    "weight": 2
                  }
                ]
              }
            ]}
            initialCenter={{lat: 40.7128, lng: -74.0060}}
            onReady={this.setsRoute}
            >
              {this.setsRoute()}
              {crimeLocales}
              {this.setDestinationMarker}
              <Marker
              position={this.props.usrLocale}
              icon={this.markerIcon}
              />
              <Slider className="slider" crimeNews={this.state.crimeNews} />
          </Map>
        </div>
      );
    };
  };

export default GoogleApiWrapper({
    apiKey:process.env.REACT_APP_APIKEY
  })(Maps);