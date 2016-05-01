
var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var schema = mongoose.Schema;

var artistSchema = new schema({
  'id' : String,
  'name' : String,
  'type': String
},{collection:'artist'});
artistSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('artist', artistSchema);