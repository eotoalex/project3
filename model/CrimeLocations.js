const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CrimeLocationsSchema = new Schema({
  id: mongoose.Schema.Types.ObjectId,
  date:String,
  latitude:String,
  longitude: String,
  age_group:String,
  sex: String,
  race: String,
  offence: String,
  arrest_key: String,
  // law_cat_cd:String,
  // law_code:String

  
});

const CrimeLocations = mongoose.model("CrimeLocations",CrimeLocationsSchema);

module.exports = CrimeLocations;