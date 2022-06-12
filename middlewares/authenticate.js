const jwt = require('jsonwebtoken');
const config = require('./../configs')
const UserModel = require('./../models/user.model')

module.exports = function (req, res, next) {

  let token;
  if (req.headers['authorization'])
    token = req.headers['authorization'];
  if (req.headers['x-access-token'])
    token = req.headers['x-access-token']
  if (req.query.token)
    token = req.query.token;

  token = (token || '').split(' ')[1];
  // console.log('token is >', token)
  if (!token) {
    return next({
      msg: "Authentication Failed, Token Not Provided",
      status: 403
    })
  }

  // token verification
  jwt.verify(token, config.JWT_SECRET, function (err, decoded) {
    if (err) {
      return next(err)
    }
    console.log('Token Verification successfull', decoded);
    UserModel.findById(decoded._id, { password: 0 }, function (err, user) {
      if (err) {
        return next(err);
      }
      if (!user) {
        return next({
          msg: 'User removed from system',
          status: 404
        })
      }
      req.user = user;
      return next();
    })

  })


}

// task to do 
// authorization==>


// problem  to be discussed
// 1. if user is removed from system what to do?
// 2. if data is udpated in database how to reflcet that is req.user;
// 1 

// client                                                //server

// request ==> POST/LOGIN[username/password] =========> validate 

 //                         user information with token    <====


//  request ==> headers token ===> validate token 
//                                   appropriate response  <=====