var express = require('express');
var router = express.Router();
var student_record = require('../module/student');
var student = student_record.find({});

/* GET home page. */
router.get('/', function(req, res, next) {
  student.exec(function(err,data){
    if(err)
    throw error;
    res.render('index', { title: 'Student Records',records : data });
  });
  
});

router.post('/', function(req, res, next) {

  var student_insert = new student_record({
    name : req.body.name,
    age : req.body.age,
    email : req.body.email,
    address : req.body.address,
    roll:req.body.roll,
  })

    student_insert.save(function(err,res1){
      if(err)
        throw error;
        student.exec(function(err,data){
          if(err)
          throw error;
          res.render('index', { title: 'Student Records',records : data });
        });
    })
});


router.post('/search', function(req, res, next) {

      var sname = req.body.name;
      var sage = req.body.age;
      var semail = req.body.email;
      console.log("name : " + sname+ " Age : " + sage + "email : " + semail);
      if(sname != '' && sage != '' && semail !='')
        var filter_params = {$and:[{name:sname},{$and:[{email:semail},{age:sage}]}]};
      else if(sname != '' && sage != '' && semail =='')
        var filter_params = {$and:[{name:sname},{age:sage}]};
      else if(sname != '' && sage == '' && semail !='')
        var filter_params = {$and:[{name:sname},{email:semail}]};
      else if(sname == '' && sage != '' && semail !='')
        var filter_params = {$and:[{age:sage},{email:semail}]};  
      else if(sname != '' && sage == '' && semail =='')
        var filter_params = {name:sname};  
      else if(sname == '' && sage != '' && semail =='')
        var filter_params = {age:sage};  
      else if(sname == '' && sage == '' && semail !='')
        var filter_params = {email:semail};  
      else
      var filter_params = {};


      var filterstudent = student_record.find(filter_params);
      filterstudent.exec(function(err,data){
        if(err)
          throw error;
        res.render('index', { title: 'Student Records',records : data});
       });

});

router.get('/delete/:id', function(req, res, next) {

  var student_del = student_record.findByIdAndDelete(req.params.id);

  student_del.exec(function(err){
    if(err)
    throw error;
    
    student.exec(function(err,data){
      if(err)
      throw error;
      res.render('index', { title: 'Student Records',records : data });
    });

  });
  
});


router.get('/edit/:id', function(req, res, next) {

  var student_edit = student_record.findById(req.params.id);
    student_edit.exec(function(err,data){
      if(err)
      throw error;
      res.render('update', { title: 'Student Records',records : data });
    });

  });

  router.post('/update', function(req, res, next) {

    var student_edit = student_record.findByIdAndUpdate(req.body.id,{
      name : req.body.name,
      age:req.body.age,
      email:req.body.email,
      address:req.body.address,
      roll:req.body.roll
    });

    student_edit.exec(function(err){
        if(err)
          throw error;
              
        student.exec(function(err,data){
            if(err)
            throw error;
            res.render('index', { title: 'Student Records',records : data });
          });

      });
  
    });
  


module.exports = router;
