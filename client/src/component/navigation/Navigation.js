import React from "react";
import Maps from "../map/Maps";
import API from "../../utils/API";
import {Container} from 'reactstrap';
import "./Navigation.css";
import Destination from "../destination/Destination";
import {Link} from "react-router-dom";
import Button from '../button/Button';

class Navigation extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            crimeLocations:[],
            usrLocation:[],
            crimeNews: [] || 'Loading...',
            destination: "",
            destinationLatLng:[],
            trainInfo:[]
        }
        this.loadCrimeDataInDB = this.loadCrimeDataInDB.bind(this)
        this.loadTrainDataToDB = this.loadTrainDataToDB.bind(this)
        this.loadCrimeLocale = this.loadCrimeLocale.bind(this)
        this.grabCrimeData = this.grabCrimeData.bind(this)
        this.grabTrainDataDB = this.grabTrainDataDB.bind(this)
        this.getUsrLocale = this.getUsrLocale.bind(this)
        this.showPosition = this.showPosition.bind(this)
        this.handleBtnClick = this.handleBtnClick.bind(this)
        this.handleCommentBtn = this.handleCommentBtn.bind(this)
        // this.handleTrainBtnClick = this.handleTrainBtnClick.bind(this)
        
    }

    async componentDidMount() {
        //  await this.resetDB()
        // await this.loadCrimeDataInDB()
        // await this.loadTrainDataToDB()
        await this.getUsrLocale(this.loadCrimeLocale)
        // await this.grabCrimeData()
        await this.loadCrimeLocale(this.state.crimeLocations)
        await this.grabTrainDataDB()
    }

    resetDB(){
        API.resetAllInDB()
    }

    loadTrainDataToDB() {
        API.trainStationLatLng()
        .then((res) => {
            console.log("Train data loaded to DB...",res)
            
        })
        .catch((err)=>{console.log(err)})
    }

    loadCrimeDataInDB() {
        API.loadCrimeDataToDB()
        .then((res) => {
            console.log("Loaded to DB...", res)
        })
        .catch((err) => {console.log(err)})
    }

    grabTrainDataDB() {
        API.getTrainDataDB()
        .then((res) => {
            this.setState({trainInfo:res.data})
        })
        .catch((err) => {console.log(err)})
    }

    proximityLatLng() {
        // This will determine which latlng is close to the main latlng
        // The 3 closests latlng will be pushed to the closestLocations array 
        // Then only those markers will be pushed to be rendered.

    
    }

    // handleTrainBtnClick () {
    //     console.log("Train Button => ", this.props.trainStationData);
    //     // return(
    //     //     <Marker
    //     //     title={'Train Station'}
    //     //     position={{lat: "40.741039999802105", lng: "-73.99787100060406"}}
    //     //     icon={'train Icon'}
    //     //     content={"Info"}
    //     //     map={}
    //     //     ></Marker>
    //     // )

    // }

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

    handleCommentBtn (e) {
        // The article url passed to the value attribute will go into the <iframe>
        console.log("Comment Btn works!", e.target.value)
       
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
        console.log("In navigation => ", this.state.usrLocation)
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
                    trainStationData={this.state.trainInfo}
                > 
                
                </Maps> 
                <button id="f-Button" onClick={this.handleBtnClick}>Felonys</button>
                <button id="m-Button" onClick={this.handleBtnClick}>Misdemeanors</button>
                <button id="v-Button" onClick={this.handleBtnClick}>Violations</button>
                {/* <Button onClick={this.handleTrainBtnClick}>Train</Button> */}
                <Link to="/news_review"><button id="article-comment" onClick={this.handleCommentBtn} value='Article URL'>Article Comment</button></Link>
            </Container>          
        </div>
        );
    }
}

export default Navigation;
