import './Maps.css';
import React from 'react';
import axios from "axios";
import Slider from "../slider/Slider";
import { Map, GoogleApiWrapper, Marker} from 'google-maps-react';

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
      marker:[], 
      isInfoWindowOpen:false,
      currentInfoWindow:[],
      crimeNews:[] || 'Loading...',
      crimeData: this.props.crimeData,
      openInfoWindow : (map,marker,googleObj) =>{
        console.log("MAP ", map)
        console.log("MARKER ", marker)
        console.log("GOOGLE OBJ ", googleObj)
        return 0;
      },
      onMouseOver:(map,marker) => {
        let content = map.content;
        let googleObj = this.props.google.maps;
        let infoWindow = new googleObj.InfoWindow({
          content:content
        });
        this.state.currentInfoWindow =[];
        this.state.currentInfoWindow.push(infoWindow);
        this.isInfoWindowOpen = true;
        infoWindow.open(map,marker);
      },
      onMouseOff:() => {
        let infoWindow = this.state.currentInfoWindow[0];
        this.isInfoWindowOpen = false;
        if (!this.isInfoWindowOpen){
          infoWindow.close()
        }
      }
    }
  }
 
  // User icon image, sized for the map.
  markerIcon = {
    url:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvFiVpCGq6a1uRuvpBvmybCdTrbu-LzbRQyLMF7JR_JUudoEb8FQ&s",
    scaledSize: new this.props.google.maps.Size(40, 40)
  }

  async componentDidMount () {
    const crimeNews = await axios.get("/scrapeNews");
    // await crimeDataSet = () => {console.log("hello")}
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
    }
    let mapObj = this.state.map;
    if(this.props.destination.length !== 0){
      this.calcRoutes(mapObj,usrLocation,lat,lng);
      console.log("We have an address", lat,lng);
    }  
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
    };
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
    });
  }

  onMouseover = (props, marker, e) => {
  // console.log("mouse over ", props, marker, e);
  marker.addListener('click', function(){
    console.log("MOUSE OVER WORKS",props);
    console.log(e.target);
  });
  }

  render(){
    const clickEvent = this.state.openInfoWindow;
    const openInfoWindow = this.state.onMouseOver;
    const hover = this.state.onMouseOver;
    const offIcon = this.state.onMouseOff

    // This variable holds the crime icon, sized for the map when rendered.
    const crimeIcon = {
    url:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXL8dMbULRMR3YVcdoZKDvHAKDEnyRIqnPx-llmYVULI5oTCTd&s",
    scaledSize: new this.props.google.maps.Size(40, 40)
    }
    const crimeMarkers = this.props.coor.map(function(item){
      return(
        <Marker 
        title={'CrimeLocale'}
        position={{lat: item.lat, lng: item.lng}}
        icon={crimeIcon}
        content={
          '<div id="content">'+
            '<ul style="list-style-type:none;">'+
              '<li>'+ "Offence: " + item.crime +'</li>'+
              '<li>'+ "Date: " + item.date +'</li>'+
              '<li>'+ "Sex: " + item.sex +'</li>'+
              '<li>'+ "Race: " + item.race +'</li>'+
            '</ul>'+
          '</div>'
        }
        // onMouseover={hover}
        onMouseout= {offIcon}
         onClick={openInfoWindow}
        >
        </Marker>
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
          {crimeMarkers}
          {this.setDestinationMarker}
          <Marker
            position={this.props.usrLocale}
            icon={this.markerIcon}
            onMouseover={this.onMouseover}
          />
          <Slider 
            className="slider" 
            crimeNews={this.state.crimeNews} />
        </Map>
      </div>
    );
  };
};
export default GoogleApiWrapper({
apiKey:process.env.REACT_APP_APIKEY
})(Maps);