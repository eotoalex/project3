const CrimeLocations = require ('../model/CrimeLocations');
const axios = require('axios')
// Need to devine mongoose some where.

module.exports = {

    getCrimeData: function (req, res) {
        CrimeLocations.find({})
        .then((result) => {
            console.log("result length ", result.length)
            res.json(result);
        });
    },

    addCrimeDataToDB: function(req, res) {
        // // This variable stops the database from creating copies of already existing data. I will id the data then use that id later to distinguish betweenw what goes into the database in the future.

        // const CrimeLocation = new CrimeLocations({
        //     id: new mongoose.Types.ObjectId(),
        //     latitude: req.body.latitude,
        //     longitude: req.body.longitude,
        //     date:req.body.date,
        //     ageGroup:req.body.ageGroup
        // })
        axios.get("https://data.cityofnewyork.us/resource/uip8-fykc.json")
        .then(function(response){
        
            for (let i = 0; i < 10; i++){
                let results = {};
                let latitude = response.data[i].latitude;
                let longitude = response.data[i].longitude;
                let date = response.data[i].arrest_date;
                let ageGroup = response.data[i].age_group;
                let sex = response.data[i].perp_sex;
                let race = response.data[i].perp_race;
                let offence = response.data[i].ofns_desc;
                let arrestKey = response.data[i].arrest_key;

                // Here the data from the crime data set are seperated by type and put into the results object to be sent through to database.
                results.latitude = latitude;
                results.longitude = longitude;
                results.date = date;
                results.age_group = ageGroup;
                results.sex = sex;
                results.race = race;
                results.offence = offence;
                results.arrest_key = arrestKey;

                CrimeLocations.create(results).then(function(dbCrime){
                    console.log(dbCrime);
                }).catch(function(err){
                    console.log(err);
                }) 
            };   
        });  
    }
};