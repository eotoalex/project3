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
        this.handleBtnClick = this.handleBtnClick.bind(this)
    }

    async componentDidMount() {
        await this.loadCrimeDataInDB()
        await this.getUsrLocale(this.loadCrimeLocale)
        // await this.grabCrimeData()
        await this.loadCrimeLocale(this.state.crimeLocations)
    }

    loadCrimeDataInDB() {
        API.loadCrimeDataToDB()
        .then((res) => {
            console.log("Loaded to DB...", res)
        })
        .catch((err) => {console.log(err)})
    }

    async handleBtnClick(e){
        let buttonId = e.target.id;
        switch(buttonId){
            case "f-Button":
                await this.grabCrimeData("F");
                break;
            case 'm-Button':
                await this.grabCrimeData(null,"M",null);
                break;
            case 'v-Button':
                await this.grabCrimeData(null,null,"V");
                break;
        }
    }

    loadCrimeLocale(arr) {
        let locale = arr;
        return locale.map(function(item){
        return console.log("In function ",item)
        });   
    }
    grabCrimeData(felony,misdemeanor,violation) {
        API.getLatLng()
        .then((res)  => {
            let crimeLevelArr = [];
            res.data.map((item) => {  
                switch(item.law_cat_cd){
                    case felony:
                    console.log("FELONY => ", crimeLevelArr.push(item))
                    break;
                    case misdemeanor:
                    console.log("MISDEMEANOR => ", crimeLevelArr.push(item))
                    break;
                    case violation:
                    console.log("VIOLATION => ", crimeLevelArr.push(item))
                    break;
                }
            }) 
            this.setState({crimeLocations:crimeLevelArr})  
            console.log(" STATE => ",this.state.crimeLocations)  
            // this.setState({crimeLocations:res.data})  
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
                    return {lat:item.latitude, 
                            lng:item.longitude,
                            crime: item.offence,
                            date: item.date,
                            sex: item.sex,
                            race: item.race,
                            arrestKey: item.arrest_key, 
                            levelOfOffense:item.law_cat_cd
                        }})}
                    usrLocale={this.state.usrLocation} 
                    google={this.props.google}
                    destination={this.state.destinationLatLng}
                    criminalLocales={this.state.crimeLocations}
                    usrCurrentLocation={this.state.usrLocation}
                > 
                
                </Maps> 
                <button id="f-Button" onClick={this.handleBtnClick}>Felonys</button>
                <button id="m-Button" onClick={this.handleBtnClick}>Misdemeanors</button>
                <button id="v-Button" onClick={this.handleBtnClick}>Violations</button>
            </Container>          
        </div>
        );
    }
}

export default Navigation;
