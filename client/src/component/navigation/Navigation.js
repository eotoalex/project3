import React from "react";
import Maps from "../map/Maps";
import API from "../../utils/API";
import {Container} from 'reactstrap';
import '../map/Maps.css';
import "./Navigation.css";
import Destination from "../destination/Destination";

class Navigation extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            crimeLocations:[],
            usrLocation:[],
            crimeNews: [] || 'Loading...',
            destination: "",
            destinationLatLng:[]
        }
        this.loadCrimeDataInDB = this.loadCrimeDataInDB.bind(this)
        this.loadCrimeLocale = this.loadCrimeLocale.bind(this)
        this.grabCrimeData = this.grabCrimeData.bind(this)
        this.getUsrLocale = this.getUsrLocale.bind(this)
        this.showPosition = this.showPosition.bind(this)
    }

    async componentDidMount() {
        await this.loadCrimeDataInDB()
        await this.getUsrLocale(this.loadCrimeLocale)
        await this.grabCrimeData()
        await this.loadCrimeLocale(this.state.crimeLocations)
    }

    loadCrimeDataInDB() {
        API.loadCrimeDataToDB()
        .then((res) => {
            console.log("Loaded to DB...", res)
        })
        .catch((err) => {console.log(err)})
    }

    loadCrimeLocale(arr) {
        let locale = arr;
        return locale.map(function(item){
        return console.log(item)
        });   
    }
    grabCrimeData() {
        API.getLatLng()
        .then((res)  => {
            this.setState({crimeLocations:res.data})  
        })
        .catch((err) => {console.log(err)})
    }

    getUsrLocale = (callback) => {
        return( navigator.geolocation.getCurrentPosition(this.showPosition),
                callback(this.state.crimeLocations))
       
    }
    showPosition = (position) => {
        this.setState({usrLocation:{lat:position.coords.latitude,lng:position.coords.longitude}})
        return {lat:position.coords.latitude,lng:position.coords.longitude}
    }

    handleInputChange = event => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]: value
        });
    }

    handleFormSubmit = (event) => {
        event.preventDefault();
        const address = this.state.destination;
        API.convertAddToLatLng(address)
            .then((res) => { 
                let latitude = res.data.results[0].geometry.location.lat;
                let longitude = res.data.results[0].geometry.location.lng;
                this.setState({destinationLatLng:{latitude,longitude}},
                () => {console.log("Destination in STate!",this.state.destinationLatLng)}
                )
            })
            console.log("target ", event.target)
    }
    render() {
        return (
        <div className="container">
            <Container className="container2"> 
                <Destination className="destination" handleInputChange={this.handleInputChange} handleFormSubmit={this.handleFormSubmit} />
                <Maps 
                    className="mapper"
                    coor={
                    this.state.crimeLocations.map(function(item){
                    return {lat:item.latitude, lng:item.longitude}})}
                    usrLocale={this.state.usrLocation} 
                    google={this.props.google}
                    destination={this.state.destinationLatLng}
                    criminalLocales={this.state.crimeLocations}
                    usrCurrentLocation={this.state.usrLocation}
                > 
                </Maps> 
            </Container>          
        </div>
        );
    }
}

export default Navigation;
