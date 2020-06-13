const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./user-model');
 
const trailSchema = new Schema({
  name: String,
  summary: String,
  imgSmall: String, // still working on implementing files now
  difficulty: String,
  latitude: Number,
  longitude: Number,
  owner: {type: Schema.Types.ObjectId, ref: 'User'}
});

const Trail = mongoose.model('Trail', trailSchema);

module.exports = Trail;
