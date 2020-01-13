const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CrimeLocationsSchema = new Schema({
  id: mongoose.Schema.Types.ObjectId,
  date:String,
  latitude:String,
  longitude: String,
  
});

const CrimeLocations = mongoose.model("CrimeLocations",CrimeLocationsSchema);

module.exports = CrimeLocations;