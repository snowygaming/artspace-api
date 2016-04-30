
var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var schema = mongoose.Schema;

var artSchema = new schema({
  'id' : String,
  'name' : String,
  'type': String
},{collection:'art'});
artSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('art', artSchema);