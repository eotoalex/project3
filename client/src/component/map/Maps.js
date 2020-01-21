import './Maps.css';
import React from 'react';
import axios from "axios";
import Slider from "../slider/Slider";
import { Map, GoogleApiWrapper, Marker} from 'google-maps-react';
import trainIcon from "../../icons/icons8-train-50.png"
 
class Maps extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      map:[],
      marker:[], 
      trainMarkers:[],
      isInfoWindowOpen:false,
      currentInfoWindow:[null],
      crimeNews:[] || 'Loading...',
      crimeData: this.props.crimeData,
      trainData: this.props.trainStationData,
      trainIcon: {
        url:trainIcon,
        scaledSize: new this.props.google.maps.Size(30, 30), 
      },
      clickedTrainBtn: false,
      openInfoWindow : (map,marker,googleObj) =>{
        console.log("MAP ", map)
        console.log("MARKER ", marker)
        console.log("GOOGLE OBJ ", googleObj)
        return 0;
      },
      onMouseOver:(map,marker) => {
        console.log("MAP ", map)
        console.log("MARKER ", marker)
        if(this.isInfoWindowOpen === true){
        this.state.currentInfoWindow[0].close()
        this.isInfoWindowOpen = false;
      }else{
        this.state.currentInfoWindow =[];
        
        let content = marker.content;
        let googleObj = this.props.google.maps;
        let infoWindow = new googleObj.InfoWindow({
          content:content
        });
        this.state.currentInfoWindow.push(infoWindow);
        this.isInfoWindowOpen = true;
        infoWindow.open(map,marker);
        }
      },
      onMouseOff:() => {
        let infoWindow = this.state.currentInfoWindow[0];
        this.isInfoWindowOpen = false;
        if (!this.isInfoWindowOpen && infoWindow){
          infoWindow.close()
          
        }
        
      }
    }
    this.handleTrainBtnClick = this.handleTrainBtnClick.bind(this)
    this.handleTrainsNearby = this.handleTrainsNearby.bind(this)
  }
 
  markerIcon = {
    url:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvFiVpCGq6a1uRuvpBvmybCdTrbu-LzbRQyLMF7JR_JUudoEb8FQ&s",
    scaledSize: new this.props.google.maps.Size(40, 40)
  }

  async componentDidMount () {
    const crimeNews = await axios.get("/scrapeNews");
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
  deg2rad(deg) {
    return deg * Math.PI / 180
  }

  distance(lat1, lon1, lat2, lon2) {
    var R = 3958.8; // Radius of the earth in miles
    var dLat = this.deg2rad(lat2 - lat1); // deg2rad below
    var dLon = this.deg2rad(lon2 - lon1);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
  
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in miles
    return Math.round(100 * d)/100;
  }
  
   
   quickSort = nums => {
     
    const sortedArray = [...nums]
    
    if (sortedArray.length <= 1) {
      return sortedArray;
    }
    
    const pivot = sortedArray[sortedArray.length-1];
    const left = [];
    const right = [];
    
    for (let i = 0; i < sortedArray.length-1; i++) {
      if (sortedArray[i] < pivot) {
        left.push(sortedArray[i]);
      }
      else {
        right.push(sortedArray[i]);
      }
    }
    return [...this.quickSort(left), pivot, ...this.quickSort(right)];
  };
  
  handleCrimesNearby () {
    console.log("Crime button works!")
  }

 handleTrainsNearby() {
  let usrLocation = this.props.usrCurrentLocation;
  let trainLocations = this.props.trainStationData;
  let userLat = usrLocation.lat;
  let userLng = usrLocation.lng;
  let distancesCollected = [];
  let distancesLatLng = [];
  let idArr = [];
  let map = this.state.map;
  let infoWindow = this.state.onMouseOver;

 trainLocations.map((station) => {
  let trainSLat = parseFloat(station.latitude);
  let trainSLng = parseFloat(station.longitude);
  let id = station._id;
  let track = station.station;
  let line = station.line;
  let info = station.info;
  let lat = station.latitude;
  let lng = station.longitude;
  
  distancesCollected.push({
    id:id,
    track:track,
    line:line,
    info:info,
    lat:lat,
    lng:lng,
    distance:this.distance(userLat,userLng,trainSLat,trainSLng)
  });

  distancesLatLng.push(this.distance(userLat,userLng,trainSLat,trainSLng))

  
 })
 
//  console.log(distancesCollected)
//  console.log(this.quickSort(distancesLatLng))

distancesCollected.map((item) => {

  for(let i = 0; i < 3; i++){ 
    
    if(item.distance === this.quickSort(distancesLatLng)[i]){
    let result = {}
    result.id = item.id;
    result.station = item.track;
    result.line = item.line;
    result.info = item.info;
    result.lat = item.lat;
    result.lng = item.lng;
    result.distance = item.distance;
    idArr.push(result)
    } 
  }
}) 
console.log("IDArray =>  ",idArr)

idArr.map((nearestStation) => {
  let swStationsLat = parseFloat(nearestStation.lat);
  let swStationsLng = parseFloat(nearestStation.lng);
  let position = {lat:swStationsLat,lng:swStationsLng};
  let station = nearestStation.station;
  let lines =  nearestStation.line;
  let distance = nearestStation.distance;

let marker = new this.props.google.maps.Marker({
  position:position,
  content:
    '<div id="content">'+
      '<ul style="list-style-type:none;">'+
      '<li>'+ "Trains: " + lines +'</li>'+
        '<li>'+ "Station: " + station +'</li>'+
        '<li>'+ "Distance: " + distance+ " miles away" +'</li>'+
        '<li>'+ "Arrives: " + "Coming Soon..."+'</li>'+
        '<button>'+ "Check Area: " + "Coming Soon..."+'</button>'+

      '</ul>'+
    '</div>',
  
  icon:this.state.trainIcon,
  // onClick:infoWindow(map),
});

marker.setMap(map)
marker.addListener('click', function() {
  // map.setZoom(8);
  // map.setCenter(marker.getPosition());
  infoWindow(map,marker)
});

this.calcRoutes (map,usrLocation,swStationsLat,swStationsLng)

})









// this.distance (requires latlng1 to be user and latlng2 to be trainstation pushing three closest to an array.)
// the three latlng in the array are put into the calcRoutes with a for loop that displays all three polylines.
// An info box should appear to show the distance, recent incidents nearest the routes and the train.

  //  console.log(this.distance())
  //  Get the users location and the nearest trains location and output the result.
  // Distance will calculate the nearest train station.
  // Disance can also calculate the nearest precinct.
  // Distance can also get the nearest hospital.(Address will be in this.)
  // calcRoutes function will be used where parameters are map, userlocation and lat lng of trainStation, 


     
//  })
  
  // console.log(trainLocations)
  
  // console.log("DistancesCollected ARR ",distancesCollected)


// When I get the distances in the distancesCollected array, I have to do a quick sort to get it ready for the calcRoutes function.
// After this we can render the polylines, with the info box indicating how far is the nearest train, 
// then render the crimedata points by doing it all over again but this time with the crimedata to see which are closest to the latlngs of the polyline.
// It would be most effective to find the two closest crime locations to the polylines, with an info bar also indicating the amount of Violations, Felonys and Misdemeanors have occured enroute.
// The work on comment feature that renders a marker with an infoWindow to the map as well.
  

 } 

 trainInfoWindow (map, trainMarker){
   console.log("Info window is active!");
  //  let infoWindow = new googleObj.InfoWindow({
  //   content:content
  // });
  // this.state.currentInfoWindow.push(infoWindow);
  // this.isInfoWindowOpen = true;
  // infoWindow.open(map,trainMarker);
  // }
   
 }

 handleTrainBtnClick () {
  // console.log("Map => ", this.state.map);
  let stationLocations = this.props.trainStationData;
  let map = this.state.map;
  let markersArr = [];
  let infoWindow = this.state.onMouseOver;
  
if (this.state.clickedTrainBtn === false){
  this.state.clickedTrainBtn = true
  stationLocations.map((stationCoords) => {
    let latitude = parseFloat(stationCoords.latitude);
    let longitude = parseFloat(stationCoords.longitude);
    let position = {lat:latitude,lng:longitude};
    let lines = stationCoords.line;
    let info = stationCoords.info;
   
    let name = stationCoords.station;
    
    let marker = new this.props.google.maps.Marker({
      position:position,
      title:name,
      content:
        '<div id="content">'+
          '<ul style="list-style-type:none;">'+
            '<li>'+ "Trains: " + info +'</li>'+
            '<li>'+ "Station: " + name +'</li>'+
            '<li>'+ "Position " + position.lat +' '+ position.lng +'</li>'+
            '<li>'+ "Arrives " + "Coming Soon..."+'</li>'+
          '</ul>'+
        '</div>',
      lines:lines,
      icon:this.state.trainIcon,
      // onClick:infoWindow(map),
    });
    markersArr.push(marker)
    marker.setMap(map)
    marker.addListener('click', function() {
      // map.setZoom(8);
      // map.setCenter(marker.getPosition());
      infoWindow(map,marker)
    });
  })
  this.setState({trainMarkers:markersArr})
  

 } else if (this.state.clickedTrainBtn === true) {
   
   this.state.clickedTrainBtn = false;
  for(let i = 0; i<this.state.trainMarkers.length; i++){
    this.state.trainMarkers[i].setMap(null);
  }
   
    
    
   
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

  // onMouseover = (props, marker, e) => {
  // // console.log("mouse over ", props, marker, e);
  // marker.addListener('click', function(){
  //   console.log("MOUSE OVER WORKS",props);
  //   console.log(e.target);
  // });
  // }

  render(){
    const openInfoWindow = this.state.onMouseOver;
    const offIcon = this.state.onMouseOff

    // This variable holds the crime icon, sized for the map when rendered.
    const crimeIcon = {
    url:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXL8dMbULRMR3YVcdoZKDvHAKDEnyRIqnPx-llmYVULI5oTCTd&s",
    scaledSize: new this.props.google.maps.Size(40, 40)
    }
    const crimeMarkers = this.props.coor.map(function(item){
    const validateCrimeLevel = (crimeLevel) => {
      switch(crimeLevel){
        case "F":
          return "Felony";
          case "M":
          return "Misdemeanor";
          case "V":
          return "Violation";
      }
    }
      return(
        <Marker 
        title={'CrimeLocale'}
        position={{lat: item.lat, lng: item.lng}}
        icon={crimeIcon}
        content={
          '<div id="content">'+
            '<ul style="list-style-type:none;">'+
              '<li>'+ "Crime: " + item.crime +'</li>'+
              '<li>'+ "Date: " + item.date +'</li>'+
              '<li>'+ "Race: " + item.race +'</li>'+
              '<li>'+ "Crime Level: " + validateCrimeLevel(item.levelOfOffense) +'</li>'+
              '<li>'+ "Sex: " + item.sex +'</li>'+
            '</ul>'+
          '</div>'
        }
        // onMouseover={hover}
        // onMouseout= {offIcon}
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
          zoom={15}
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
          initialCenter={this.props.usrCurrentLocation}
          onReady={this.setsRoute}
          >
          {this.setsRoute()}
          {crimeMarkers}
          {this.setDestinationMarker}
          <Marker
            position={this.props.usrLocale}
            icon={this.markerIcon}
            onClick={this.openInfoWindow}
          />
          <button
            id="train-Button" 
            onClick={this.handleTrainBtnClick}
            >TrainBtn
          </button>
          <button id="trains-nearby"
            onClick={this.handleTrainsNearby}>
            Trains Near Me
          </button>
          <button id="crime-nearby"
            onClick={this.handleCrimesNearby}>
            Arrests Near Me
          </button>
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