const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SubwayStationSchema = new Schema({
  id: mongoose.Schema.Types.ObjectId,
    //   res.name
  station:String,
//   res.the_geom.coordinates[1]
  latitude:String,
  //   res.the_geom.coordinates[0]
  longitude: String,
// res.line
  line:String,
//   res.notes
 info: String,
});

const SubwayStations = mongoose.model("SubwayStations",SubwayStationSchema);

module.exports = SubwayStations;