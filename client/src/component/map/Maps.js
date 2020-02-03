import './Maps.css';
import React from 'react';
import axios from "axios";
import Slider from "../slider/Slider";
import { Map, GoogleApiWrapper, Marker} from 'google-maps-react';
import trainIcon from "../../icons/icons8-train-50.png";
import crimeIcon from "../../icons/crimeImg.png";
import destinationIcon from "../../icons/flag-checkered-solid.svg";
import API from "../../utils/API";
import {Modal,Button} from "react-bootstrap";
 
class Maps extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      routeSet:this.props.route,
      modalShow:false,
      mainPolyPath:[],
      crimePathPoly:[],
      currentPolyline:[],
      crimeNearBy:false,
      trainNearBy:false,
      trainsNearByMarkers:[],
      crimeNearByMarkers:[],
      trainPolyOpen:false,
      crimePolyOpen:false,
      crimePulled:[],
      distanceCalc:this.distance,
      map:[],
      userGeoLocation:[],
      usrLocale:[],
      marker:[], 
      trainMarkers:[],
      isInfoWindowOpen:false,
      currentInfoWindow:[null],
      crimeNews:[] || 'Loading...',
      crimeData: [],
      trainData: this.props.trainStationData,
      trainIcon: {
        url:trainIcon,
        scaledSize: new this.props.google.maps.Size(40, 40), 
      },
      crimeIcon:{
        url:crimeIcon,
        scaledSize: new this.props.google.maps.Size(30, 30),
      },
      destinationIcon:{
        url:destinationIcon,
        scaledSize: new this.props.google.maps.Size(40,40),
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
      } else{
        this.state.currentInfoWindow =[];
        let content = marker.content;
        let googleObj = this.props.google.maps;
        let infoWindow = new googleObj.InfoWindow({
          content:content,
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
    this.handleCrimesNearby = this.handleCrimesNearby.bind(this)
    this.crimeDataCollection = this.crimeDataCollection.bind(this)
    this.loadUsrLocation = this.loadUsrLocation.bind(this)
    this.showPosition = this.showPosition.bind(this)
  }
 
  markerIcon = {
    url:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvFiVpCGq6a1uRuvpBvmybCdTrbu-LzbRQyLMF7JR_JUudoEb8FQ&s",
    scaledSize: new this.props.google.maps.Size(40, 40)
  }

  async componentDidMount () {
    await this.loadUsrLocation(this.crimeDataCollection); 
    // await this.setState({userGeoLocation:this.getUsrLocale()})
   await this.crimeDataCollection(this.state.crimeData);
  
    const crimeNews = await axios.get("/scrapeNews");
        this.setState({
            crimeNews : crimeNews.data
        });   
  }

  crimeDataCollection = () => {
    API.getLatLng()
    .then((res) => {
    this.setState({crimePulled:res.data})
    })
  }

  loadUsrLocation = (callback) => {
    return( navigator.geolocation.getCurrentPosition(this.showPosition),
    callback(this.crimeDataCollection))
     
  }

  showPosition = (position) => {
      this.setState({userGeoLocation:{lat:position.coords.latitude,lng:position.coords.longitude}})
      return {lat:position.coords.latitude,lng:position.coords.longitude}
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
      this.calcRoutes(mapObj,usrLocation,lat,lng,"blue","route");
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
  
  handleTrainsNearby() {
    if(this.state.trainNearBy === false){
      
      let usrLocation = this.props.usrCurrentLocation;
      let trainLocations = this.props.trainStationData;
      let userLat = usrLocation.lat;
      let userLng = usrLocation.lng;
      let distancesCollected = [];
      let distancesLatLng = [];
      let idArr = [];
      let map = this.state.map;
      let infoWindow = this.state.onMouseOver;
      console.log("user location " ,usrLocation)
      let markersNearMe = [];

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
    
    console.log("distances to be mapped => ",distancesCollected)
    console.log("array of distances tobe compared => " ,this.quickSort(distancesLatLng))

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
            '<button id= "veiw_crime_btn">'+ "View Crime Nearby: " + "Coming Soon..."+'</button>'+
          '</ul>'+
        '</div>',
      icon:this.state.trainIcon,
      // onClick:infoWindow(map),
    });
    this.state.trainsNearByMarkers.push(marker)
    marker.setMap(map)
    marker.addListener('click', function() {
      // map.setZoom(8);
      // map.setCenter(marker.getPosition());
      infoWindow(map,marker)
    });
    console.log("usrLocation ",usrLocation)
    // Add another parameter which is the color of the polyline. Green for this one.
    this.calcRoutes (map,usrLocation,swStationsLat,swStationsLng,"#006eff")
  })

  this.setState({trainNearBy:true})

    } else if (this.state.trainNearBy === true) {
    let currentPoly = this.state.mainPolyPath;
    for(let i = 0; i<this.state.trainsNearByMarkers.length; i++){
      this.state.trainsNearByMarkers[i].setMap(null);
    }
    //  console.log("current poly ",this.state.currentPolyline)
    for(let i = 0; i < currentPoly.length; i++ ){
    this.state.mainPolyPath[i].setMap(null);
    }
    this.state.mainPolyPath = [];
    this.state.trainsNearByMarkers = [];
    this.state.trainNearBy =false;
    }

  } 

  markersAlongPolyPath = () => {
   let polyArray = [];
   let polyPath = this.state.currentPolyline[0];
   let isDestinationSet = this.props.destination;
   console.log("isDestinationSet => ", isDestinationSet )
   
   if (isDestinationSet.length === [0]){
    let crimeDistanceCalc = [];
    let sortedCrimeDistances = [];
  let polyPathRoute = this.state.currentPolyline[0].path;
  // console.log("props => ",this.props)
  // console.log("PolyPath length => ", polyPathRoute)
  // // These are all the latitudes and longitudes of the polyline.


  polyPathRoute.map((item) => {
    
    polyArray.push({lat:item.lat(),lng:item.lng()})
    crimeDistanceCalc.push({lat:item.lat(),lng:item.lng()})
  })

  // console.log("crimeDistanceCalc => ", crimeDistanceCalc)
  // crimeDistanceCalc.map((latLng) => {
  //   let closestCrime = this.handleCrimeOnPoly(latLng)
  //   sortedCrimeDistances.push(closestCrime)
  // })
  this.handleCrimeOnPoly(crimeDistanceCalc[0])

  console.log("sortedCrimeDistances => ", sortedCrimeDistances)
  
 }
//  Maybe you do not have to do extra work in the function and instead you just have the markers render.

 
  // This function handles crimes near by, but what does it return and how can I use this with the polyline lat and lngs.
  // I can literally use this function but I would need to refine it to allow for any other function to use it, but as it stands it can only be used for crime near the user.
  // This should take a parameter, an array of locations from the poly.
  // For each lat and lng from the polyline there should be two to three crime markers rendered.
  // If there are no crimes in less than five miles then it does not render.
  // If a crime location is on the exact path then it will be recognized in the crime report.
  // this.handleCrimeOnPoly(polyArray)

  // Begin looking to render alternate paths.
  // Re-zooming the map as well.
  // Developing a crime report modal of sorts. (Have it lift up from the bottom of the map, looks cooler that way.)
  // Getting two more api marker datasets rendering. (School Violence and Stabbings)
  // Might want straight polylines rendering to each point along path with a distance indicate in info currentInfoWindow
  // Crime report should have Number of over all crimes of either sort, Each individual crime listed, distance, time and day committed,

  // Distnace on line 462 needs to translate to polyLat, polyLng
  // then the distance needs to be checked from 0-2 miles from poly.
  // If so then markers are pushed to state and rendered at the end of poly array map.
  // If crime is more than this then the markers will not render.
  // Need to put more crime data in the database.
  }

  handleCrimeOnPoly (polyLatLng) {
    console.log("Poly latlng => " ,  polyLatLng)

    let crimeData = this.state.crimePulled;
    let polyLat = polyLatLng.lat;
    let polyLng = polyLatLng.lng;
    let CrimeDistanceArr = [];
    let crimeObjDistances = [];
    let sortedDistances = [];
    let closestCrimes =[];
    // let polyLatLng = {lat:poly.lat,lng:poly.lng}
    // let crimeInMiles = [];
    // let crimeDistanceCalc = [];
    // let sortedCrimeLocations = [];
    // let crimesNearMe =[];
    // let map = this.state.map;
    // let infoWindow = this.state.onMouseOver;

    
      
      crimeData.map((crime) => {
        let crimeLat = parseFloat(crime.latitude);
        let crimeLng = parseFloat(crime.longitude);
        

        CrimeDistanceArr.push({
        id : crime._id,
        crime: crime.offence,
        lat : crime.latitude,
        lng : crime.longitude,
        age : crime.age_group,
        sex : crime.sex,
        race : crime.race,
        levelOfOffence : crime.law_cat_cd,
        distance: this.distance(polyLat,polyLng,crimeLat,crimeLng),
      })
      // crimeDistanceCalc.push(tempCrimeDistanceArr[0]);
      // console.log("crimeDistanceCalc length => ", crimeDistanceCalc.length)
      // console.log("Should grow => ", crimeDistanceCalc)
      
    })

    console.log(CrimeDistanceArr[0])
    console.log(CrimeDistanceArr)
    CrimeDistanceArr.map((crimeObj)=> {
      // The distance will be sorted, but how do I keep the object???
      // Reference sort function.
      crimeObjDistances.push(crimeObj.distance)


    })

    sortedDistances.push(this.quickSort(crimeObjDistances))

    console.log("sortedDistances => ", sortedDistances)

    CrimeDistanceArr.map((crimeObj) => {

      if(crimeObj.distance === sortedDistances[0][0]){
        
        closestCrimes.push(crimeObj)

      }
    })
    // The closest crime will render if the marker is created, but there needs to be a way to limit the amount of operations because it is not logical to have almost 300,000 operations occur to get all the nearest markers rendering.
    // Unless there was a way to determine which lat lng coordinates were in manhattan and isolate only those lat lng coords.
    // And to have those lat lngs that are just super far away to be excluded from the following searches. (Could limit searches by half.)
    console.log("closestCrimes => ", closestCrimes)

    

    

    


  
  //     crimeInMiles.push(this.distance(polyLat,polyLng,crimeLat,crimeLng))
  
      
  //     sortedCrimeLocations.push(this.quickSort(crimeInMiles))
  //     console.log("crimeDistanceCalc ",crimeDistanceCalc)
  //     crimeDistanceCalc.map((item) => {
        
  //     for(let i = 0; i < 6; i++){
      
  //       //  crimesNearMe.push(sortedCrimeLocations[0][i]);
  //       console.log("sortedCrimeLocations[0][i] => ", sortedCrimeLocations[0][i])
  //       if(item.distance === sortedCrimeLocations[0][i]){
  //         let result = {}
  //         result.id = item.id;
  //         result.crime = item.crime;
  //         result.age = item.age;
  //         result.sex = item.sex;
  //         result.race = item.race;
  //         result.levelOfOffence = item.levelOfOffence;
  //         result.lat = item.lat;
  //         result.lng = item.lng;
  //         result.distance = item.distance;
  //         crimesNearMe.push(result);
  //         } 
  //     }
  //   })
  //   // console.log("crimeDistanceCalc ", crimeDistanceCalc);
  //   // console.log("sortedCrimeLocations ", sortedCrimeLocations)
  //   // console.log("crimeInMiles ", crimeInMiles)
    
  
  
  //       crimesNearMe.map((nearestCrime) => {
  //         // console.log("crimesNearMe ", crimesNearMe)
  //       let crimeLat = parseFloat(nearestCrime.lat);
  //       let crimeLng = parseFloat(nearestCrime.lng);
  //       let position = {lat:crimeLat, lng:crimeLng};
  //       let crime = nearestCrime.crime;
  //       // let age = nearestCrime.age;
  //       // let sex = nearestCrime.sex;
  //       let race =  nearestCrime.race;
  //       let levelOfOffence = nearestCrime.levelOfOffence;
  //       let distance = nearestCrime.distance;
  //       const validateCrimeLevel = (crimeLevel) => {
  //         switch(crimeLevel){
  //           case "F":
  //             return "Felony";
  //             case "M":
  //             return "Misdemeanor";
  //             case "V":
  //             return "Violation";
  //         }
  //       }
      
  //     let marker = new this.props.google.maps.Marker({
  //       position:position,
  //       content:
  //         '<div id="content">'+
  //           '<ul id="ul" style="list-style-type:none;">'+
  //           '<li>'+ "Crime " + crime +'</li>'+
  //           // '<li>'+ "Age Range: " + age +'</li>'+
  //           //   '<li>'+ "Sex: " + sex +'</li>'+
  //             '<li>'+ "Race: " + race +'</li>'+
  //             '<li>'+ "Level Of Offence: " + validateCrimeLevel(levelOfOffence)+'</li>'+
  //             '<li>'+ "Distance: " + distance + ' miles'+'</li>'+
  //             '<button>'+ "Do you have additional info on this crime?"+'</button>'+
      
  //           '</ul>'+
  //         '</div>',
        
  //       icon:this.state.crimeIcon,
  //       // onClick:infoWindow(map),
  //     });
  //     this.state.crimeNearByMarkers.push(marker)
  //     marker.setMap(map)
  //     marker.addListener('click', function() {
  //     // map.setZoom(8);
  //     // map.setCenter(marker.getPosition());
  //     infoWindow(map,marker)
  //   });
  
  //   // Add another parameter which is the color of the polyline. Green for this one.
    
  //   this.calcRoutes (map,polyLatLng,crimeLat,crimeLng)
  //   this.state.crimeNearBy = true
  
  //   })
    
  //   this.state.routeSet = true;
  // } 
  
  // else if (this.state.crimeNearBy === true) {
  
  //   let currentPoly = this.state.mainPolyPath;
  //   for(let i = 0; i<this.state.crimeNearByMarkers.length; i++){
  //     this.state.crimeNearByMarkers[i].setMap(null);
  //   }
  //   //  console.log("current poly ",this.state.currentPolyline)
  //   for(let i = 0; i < currentPoly.length; i++ ){
  //   this.state.mainPolyPath[i].setMap(null);
  //   }
  //   this.state.mainPolyPath = [];
  //   this.state.crimeNearByMarkers = [];
  //   this.state.crimeNearBy =false;
  }

  handleTrainBtnClick () {
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

  calcRoutes = (map,usrLocale,lat,lng,color,type) => {
    let polylineOptions = [];
    let directionsService = new this.props.google.maps.DirectionsService();
    let start = usrLocale;
    let end = new this.props.google.maps.LatLng(lat,lng);
    let desIcon = this.state.destinationIcon;
    let marker = new this.props.google.maps.Marker({
      position:end,
      title:"Destination",
      icon:desIcon,
    })
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
          strokeColor: color ||'#FF0000',
          strokeOpacity: 1.0,
          strokeWeight: 4,
          map:map
        })
    } else {
        console.log("error ", status)
    }

   this.polyLineClosure(polylineOptions,map)
    if(type === "route"){
      marker.setMap(map)
      this.markersAlongPolyPath();
    }
    });
  }

  polyLineClosure = (polylineOptions,map) => {
    let poly;
    if(!this.state.trainPolyOpen){
      poly = new this.props.google.maps.Polyline(polylineOptions[0]);
      poly.setMap(map);
      this.state.currentPolyline.push(polylineOptions[0])
      this.state.mainPolyPath.push(poly)
    } 
  }

  handleCrimesNearby () {
   
  if(!this.state.crimeNearBy){
    let crimeData = this.state.crimePulled;
    let usrLocated = this.props.usrCurrentLocation;
    let userLat = usrLocated.lat;
    let userLng = usrLocated.lng;
    let crimeInMiles = [];
    let crimeDistanceCalc = [];
    let sortedCrimeLocations = [];
    let crimesNearMe =[];
    let map = this.state.map;
    let infoWindow = this.state.onMouseOver;


    crimeData.map((crime) => {
    let id = crime._id;
    let crimeLat = parseFloat(crime.latitude);
    let crimeLng = parseFloat(crime.longitude);
  
    crimeDistanceCalc.push({
    id : crime._id,
    crime: crime.offence,
    lat : crime.latitude,
    lng : crime.longitude,
    age : crime.age_group,
    sex : crime.sex,
    race : crime.race,
    levelOfOffence : crime.law_cat_cd,
    distance: this.distance(userLat,userLng,crimeLat,crimeLng),
    })

    crimeInMiles.push(this.distance(userLat,userLng,crimeLat,crimeLng))

    })
    sortedCrimeLocations.push(this.quickSort(crimeInMiles))

    crimeDistanceCalc.map((item) => {
      
    for(let i = 0; i < 6; i++){
    
      // crimesNearMe.push(sortedCrimeLocations[0][i]);

      if(item.distance === sortedCrimeLocations[0][i]){
        let result = {}
        result.id = item.id;
        result.crime = item.crime;
        result.age = item.age;
        result.sex = item.sex;
        result.race = item.race;
        result.levelOfOffence = item.levelOfOffence;
        result.lat = item.lat;
        result.lng = item.lng;
        result.distance = item.distance;
        crimesNearMe.push(result);
        } 
    }
  })


      crimesNearMe.map((nearestCrime) => {
        
      let crimeLat = parseFloat(nearestCrime.lat);
      let crimeLng = parseFloat(nearestCrime.lng);
      let position = {lat:crimeLat, lng:crimeLng};
      let crime = nearestCrime.crime;
      let age = nearestCrime.age;
      let sex = nearestCrime.sex;
      let race =  nearestCrime.race;
      let levelOfOffence = nearestCrime.levelOfOffence;
      let distance = nearestCrime.distance;
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
    
    let marker = new this.props.google.maps.Marker({
      position:position,
      content:
        '<div id="content">'+
          '<ul id="ul" style="list-style-type:none;">'+
          '<li>'+ "Crime " + crime +'</li>'+
          // '<li>'+ "Age Range: " + age +'</li>'+
          //   '<li>'+ "Sex: " + sex +'</li>'+
            '<li>'+ "Race: " + race +'</li>'+
            '<li>'+ "Level Of Offence: " + validateCrimeLevel(levelOfOffence)+'</li>'+
            '<li>'+ "Distance: " + distance + ' miles'+'</li>'+
            '<button>'+ "Do you have additional info on this crime?"+'</button>'+
    
          '</ul>'+
        '</div>',
      
      icon:this.state.crimeIcon,
      // onClick:infoWindow(map),
    });
    this.state.crimeNearByMarkers.push(marker)
    marker.setMap(map)
    marker.addListener('click', function() {
    // map.setZoom(8);
    // map.setCenter(marker.getPosition());
    infoWindow(map,marker)
  });

  // Add another parameter which is the color of the polyline. Green for this one.
  
  this.calcRoutes (map,usrLocated,crimeLat,crimeLng)
  this.state.crimeNearBy = true


  })
} 

else if (this.state.crimeNearBy === true) {

  let currentPoly = this.state.mainPolyPath;
  for(let i = 0; i<this.state.crimeNearByMarkers.length; i++){
    this.state.crimeNearByMarkers[i].setMap(null);
  }
 //  console.log("current poly ",this.state.currentPolyline)
 for(let i = 0; i < currentPoly.length; i++ ){
 this.state.mainPolyPath[i].setMap(null);
 }
 this.state.mainPolyPath = [];
  this.state.crimeNearByMarkers = [];
  this.state.crimeNearBy =false;
 }




  }

  render(){
    const openInfoWindow = this.state.onMouseOver;
    const offIcon = this.state.onMouseOff
    const lat = this.state.userGeoLocation.lat;
    const lng = this.state.userGeoLocation.lng;

    if(this.props.destination){
    } else {console.log("Unavailable Destination!!")}

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
          // filler={console.log("userGeo ",this.state.userGeoLocation)}
          // It is very strange that userGeoLocation does not render the map when it works perfectly as it should.
           initialCenter={{lat: 40.8551424, lng: -73.92460799999999}}
          //  initialCenter={this.state.userGeoLocation}
          // initialCenter={console.log("Loading") || this.props.usrLocale ||this.state.userGeoLocation || {lat: 40.8551424, lng: -73.92460799999999}}
          onReady={this.setsRoute}
          >
          {this.setsRoute()}
          {crimeMarkers}
          {/* {this.setDestinationMarker} */}
          {this.props.dragMarker}
          <Marker
            // position={this.props.usrLocale}
            position={{lat: 40.8551424, lng: -73.92460799999999}}
            // position={this.props.userGeoLocation}
            icon={this.markerIcon}
            onClick={this.openInfoWindow}
          />
          <div className="button" id="button-container">
            <button
              className="button"
              id="train-Button" 
              onClick={this.handleTrainBtnClick}
              >TrainBtn
            </button>
            <button 
              className="button"
              id="trains-nearby"
              onClick={this.handleTrainsNearby}>
              Trains Near Me
            </button>
            <button 
              className="button"
              id="crime-nearby"
              onClick={this.handleCrimesNearby}>
              Arrests Near Me
            </button>
          </div>

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