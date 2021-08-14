var mongoose = require('mongoose');
var dbUrl  = "mongodb://localhost:27017/Test";

mongoose.connect(dbUrl,{useNewUrlParser:true,useUnifiedTopology:true});
var dbtest = mongoose.connection;

var img_schema = new mongoose.Schema({
    name : String,
    imgname : String,
});

var img_model = mongoose.model('upload_imgs',img_schema)

module.exports = img_model;