const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CrimeLocationsSchema = new Schema({
  id: mongoose.Schema.Types.ObjectId,
  latitude:String,
  longitude: String,
  date:String,
});

const CrimeLocations = mongoose.model("CrimeLocations",CrimeLocationsSchema);

module.exports = CrimeLocations;