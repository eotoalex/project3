const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LocationCommentsSchema = new Schema({
  id: mongoose.Schema.Types.ObjectId,
   date:String,
   comment:String,
});

const LocationComments = mongoose.model("SubwayStations",LocationCommentsSchema);

module.exports = LocationComments;