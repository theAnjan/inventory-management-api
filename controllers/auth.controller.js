const express = require('express');
const router = express.Router();
const UserModel = require('./../models/user.model')
const uploader = require('./../middlewares/uploader')
const passwordHash = require('password-hash')
const jwt = require('jsonwebtoken');
const config = require('./../configs')

function getToken(data) {
  return jwt.sign({
    username: data.username,
    role: data.role,
    _id: data._id
  }, config.JWT_SECRET)
}

const MapUserReq = require('./../helpers/mapUserReq')
router.post('/login', function (req, res, next) {
  if (!req.body.username) {
    return next({
      msg: 'please provide username to continue'
    })
  }
  UserModel
    .findOne({
      username: req.body.username.trim().toLowerCase()
    })
    .then(function (user) {
      if (!user) {
        return next({
          msg: 'Invalid Username',
          status: 400
        })
      }
      // password verification
      let isMatched = passwordHash.verify(req.body.password, user.password);
      if (!isMatched) {
        return next({
          msg: 'Invalid Password',
          status: 400
        })
      }
      // token generation
      let token = getToken(user)
      res.json({
        token,
        user
      })
    })
    .catch(err => {
      next(err)
    })
})

router.post('/register', uploader.single('image'), function (req, res, next) {
  // if i have req.file or req.files I am certain that file is already uploaded
  console.log('req.body...', req.body)
  console.log('req.file >>>', req.file);
  if (req.fileTypeErr) {
    return next({
      msg: 'Invalid File Format',
      status: 400
    })
  }
  // console.log('req.files >>>', req.files);
  // fileter file type [NOTE ==>server ma upload vaye pachi]
  if (req.file) {
    req.body.image = req.file.filename;
  }

  const newUser = new UserModel({});
  // newUser mongoose object
  const newMappedUser = MapUserReq(req.body, newUser)
  newUser.password = passwordHash.generate(req.body.password)

  newUser.save(function (err, done) {
    if (err) {
      return next(err)
    }
    res.json(done)
  })

})


module.exports = router;