const router = require('express').Router();
const { request } = require('express');
const UserModel = require('./../models/user.model')
const Uploader = require('./../middlewares/uploader')
const Authorize = require('./../middlewares/authorize')

const mapUserReq = require('./../helpers/mapUserReq')

router.route('/')
  .get(function (req, res, next) {
    UserModel
      .find({}, { password: 0 })
      .sort({
        _id: -1
      })
      // .limit(2)
      // .skip(1)
      .exec(function (err, users) {
        if (err) {
          return next(err)
        }
        res.json(users)
      })
  })
  .post(function (req, res, next) {
    // similar to regiser
  });


router.route('/search')
  .get(function (req, res, next) {
    res.send('from  user search endpoint')
  })
  .post(function (req, res, next) {

  });

router.route('/:id')
  .get(function (req, res, next) {
    UserModel.findById(req.params.id)
      .then(function (user) {
        res.json(user)
      })
      .catch(function (err) {
        next(err)
      })
  })
  .put(Uploader.single('image'), function (req, res, next) {

    UserModel.findById(req.params.id, function (err, user) {
      if (err) {
        return next(err);
      }
      if (!user) {
        return next({
          msg: 'User Not Found',
          status: 404
        })
      }
      if (req.fileTypeErr) {
        return next({
          msg: 'Invalid File Format',
          status: 400
        })
      }
      // console.log('req.files >>>', req.files);
      // fileter file type [NOTE ==>server ma upload vaye pachi]
      let oldImage;
      if (req.file) {
        req.body.image = req.file.filename;
        oldImage = user.image;
      }
      // user found and is mongoose object
      const updatedMapUser = mapUserReq(req.body, user)

      user.save(function (err, done) {
        if (err) {
          return next(err)
        }
        if (req.file) {
          // old image
          require('fs').unlink(process.cwd(), 'uploads/images/' + oldImage, function (err, done) {
            if (!err) {
              console.log('file removed')
            }
          })
        }
        //  OPTIONAL TODO  ==> clean up server when updated file is present
        res.json(done)
      })

    })
  })
  .delete(Authorize, function (req, res, next) {
    UserModel.findById(req.params.id, function (err, user) {
      if (err) {
        return next(err);
      }
      if (!user) {
        return next({
          msg: 'User Not Found',
          status: 404
        })
      }
      user.remove(function (err, done) {
        if (err) {
          return next(err)
        }
        res.json(done);
      })
    })
  });




module.exports = router;


// lesson ==> always put static handler at top