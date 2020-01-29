var express = require('express');
var router = express.Router();
var User = require('../model/User');
var bcrypt = require('bcryptjs');

/* GET users listing. */


router.get('/useradd', function (req,res) {
  res.render('user/user-add');
});

router.post('/useradd',function (req,res) {
  var user = new User();
  user.name = req.body.username;
  user.email = req.body.useremail;
  user.password = req.body.pwd;

  user.save(function (err,rtn) {
    if(err) throw err;
    console.log(rtn);
    res.redirect('/users/userlist');
  })
})

router.get('/userlist',function (req,res) {
  User.find(function (err,rtn) {
    if(err) throw err;
    res.render('user/user-list',{users:rtn});
  })
})

router.get('/userdetail/:uid',function (req,res) {
  User.findById(req.params.uid,function (err,rtn) {
    if(err) throw err;
    console.log(rtn);
    res.render('user/user-detail',{user:rtn})
  })
})

router.get('/userupdate/:id',function (req,res) {
  User.findById(req.params.id,function (err,rtn) {
    if(err) throw err;
    res.render('user/user-update',{user:rtn});
  })
})

router.post('/userupdate',function (req,res) {
  var update={
    name:req.body.username,
    email:req.body.useremail,
    password:bcrypt.hashSync(req.body.pwd,bcrypt.genSaltSync(8),null)
  }
  User.findByIdAndUpdate(req.body.id,{$set:update},function (err,rtn) {
    if(err) throw err;
    res.redirect('/users/userlist');
  })
})

router.get('/userdelete/:id',function (req,res) {
  User.findByIdAndRemove(req.params.id,function (err,rtn) {
    if(err) throw err;
    res.redirect('/users/userlist');
  })
});

module.exports = router;
