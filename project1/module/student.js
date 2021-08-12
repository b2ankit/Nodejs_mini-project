var mongoose = require('mongoose');
var dbUrl = "mongodb://localhost:27017/Test";

mongoose.connect(dbUrl,{useNewUrlParser:true,useUnifiedTopology:true});
var dbtest = mongoose.connection;

var StudentSchema = new mongoose.Schema({
    name : String,
    age : Number,
    email : String,
    address : String,
    roll : Number,
})


var student_obj = mongoose.model('Student',StudentSchema);

module.exports = student_obj;