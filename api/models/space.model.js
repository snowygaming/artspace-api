
var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var schema = mongoose.Schema;

var spaceSchema = new schema({
  'id' : String,
  'name' : String,
  'type': String
},{collection:'space'});
spaceSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('space', spaceSchema);