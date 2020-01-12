const CrimeLocations = require ('../model/CrimeLocations');

module.exports = {
    getCrimeData: function (req, res) {
        CrimeLocations.find({}).then((result) => {
            res.json(result);
        });
    },

    addCrimeDataToDB:(req, res) => {
        const CrimeLocation = new CrimeLocations({
            id: new mongoose.Types.ObjectId(),
            latitude: req.body.latitude,
            longitude: req.body.longitude,
        })
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


                results.latitude = latitude;
                results.longitude = longitude;
                results.date = date;
                results.ageGroup = ageGroup;
                results.sex = sex;
                results.race = race;
                results.offence = offence;

                CrimeLocation.create(results).then(function(dbCrime){
                    console.log(dbCrime);
                }).catch(function(err){
                    console.log(err);
                })
                
            }
            
        }).catch(function(err){
            if (err) throw err;
        })
        
    }


}