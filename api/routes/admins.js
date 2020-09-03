var express = require('express');
var router = express.Router();
var Admin = require('../../model/Admin');
var jwt = require('jsonwebtoken');

router.post('/signup',function (req,res) {
  var admin = new Admin();
  admin.name = req.body.name;
  admin.email = req.body.email;
  admin.password = req.body.password;
  admin.save(function (err,rtn) {
    if(err){
      res.status(500).json({
        message:"Internal server error",
        error:err,
      })
    }else {
      res.status(201).json({
        message:"Admin account create success",
        data:rtn
      })
    }
  })
})

router.post('/signin',function (req,res) {
  Admin.findOne({email:req.body.email},function (err,rtn) {
    if(err){
      res.status(500).json({
        message:"Internal server error",
        error:err
      })
    }else {
      if(rtn != null && Admin.compare(req.body.password,rtn.password)){
        var token = jwt.sign({
          email:rtn.email,
          name:rtn.name,
          id:rtn._id
        },
          'techapi008',
          { expiresIn: '2h' }
        );
        res.status(200).json({
          message:"Sign In success",
          token:token
        })
      }else {
        res.status(404).json({
          message:"Email not found or password not match"
        })
      }
    }
  })
})

module.exports = router;
