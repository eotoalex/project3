const CrimeLocations = require ('../model/CrimeLocations');
const axios = require('axios');
const moment = require('moment');

module.exports = {

    getCrimeData: function (req, res) {
        CrimeLocations.find({})
        .then((result) => {
            console.log("result length ", result.length)
            res.json(result);
        });
    },

    addCrimeDataToDB: function(req, res) {
       
        axios.get("https://data.cityofnewyork.us/resource/uip8-fykc.json")
        .then(function(response){
        
            for (let i = 0; i < 100000; i++){
                let results = {};
                let latitude = response.data[i].latitude;
                let longitude = response.data[i].longitude;
                let date = response.data[i].arrest_date;
                let ageGroup = response.data[i].age_group;
                let sex = response.data[i].perp_sex;
                let race = response.data[i].perp_race;
                let offence = response.data[i].ofns_desc;
                let arrestKey = response.data[i].arrest_key;
                let levelOfOffence = response.data[i].law_cat_cd;
                // let lawCode = response.data[i].law_code;

                // Here the data from the crime data set are seperated by type and put into the results object to be sent through to database.
                results.latitude = latitude;
                results.longitude = longitude;
                results.date = moment(date).format('MMMM Do YYYY, h:mm:ss a');
                results.age_group = ageGroup;
                results.sex = sex;
                results.race = race;
                results.offence = offence;
                results.arrest_key = arrestKey;
                results.law_cat_cd = levelOfOffence;
                // resulsts.law_code = lawCode;

                CrimeLocations.create(results).then(function(dbCrime){
                    // console.log(dbCrime);
                }).catch(function(err){
                    console.log(err);
                }) 
            };   
        });  
    }
};