
import axios from 'axios';

export default {
    loadCrimeDataToDB:function(){
        return axios.post("/api/crime");
    },

    getLatLng: function(){
        return axios.get("/api/crime");
    },

    convertAddToLatLng: function(address){
        const apiKey =process.env.REACT_APP_APIKEY;
        return axios.get("https://maps.googleapis.com/maps/api/geocode/json?address="+address+"&key="+apiKey);
    }
};