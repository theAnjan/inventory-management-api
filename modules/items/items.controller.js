const ItemQuery = require('./items.query');

function getAllItem(req, res, next) {
  let condition = {};
  if (req.user.role !== 1) {
    condition.vendor = req.user._id;
  }
  ItemQuery
    .find(condition)
    .then(function (item) {
      res.json(item);
    })
    .catch(function (err) {
      next(err);
    })

}

function insert(req, res, next) {
  const data = req.body;
  // todo prepare data
  // eg .images, vendor
  console.log('req.user is >.>', req.user)
  data.vendor = req.user._id;

  ItemQuery
    .insert(data)
    .then(function (response) {
      res.json(response);
    })
    .catch(function (err) {
      next(err);
    })
}

function getById(req, res, next) {
  let condition = {
    _id: req.params.id
  }
  ItemQuery
    .find(condition)
    .then(function (item) {
      if (item && item.length) {
        return res.json(item[0])
      }
      next({
        msg: 'Item Not Found',
        status: 404
      })
    })
    .catch(function (err) {
      next(err);
    })
}

function search(req, res, next) {
  let searchCondition = {}
  ItemQuery
    .find(searchCondition)
    .then(function (item) {
      res.json(item);
    })
    .catch(function (err) {
      next(err);
    })
}

function update(req, res, next) {
  const data = req.body;
  // todo append information indata
  ItemQuery
    .update(data, req.params.id)
    .then(function (item) {
      res.json(item);
    })
    .catch(function (err) {
      next(err);
    })
}


function remove(req, res, next) {
  // todo append information indata
  ItemQuery
    .remove(req.params.id)
    .then(function (item) {
      if (item) {
        return res.json(item);
      }
      next({
        msg: 'Item not found',
        status: 404
      })


    })
    .catch(function (err) {
      next(err);
    })
}

function addRatings(req, res, next) {
  const data = req.body;
  if (!(req.body.message && req.body.point)) {
    return next({
      msg: 'Please provide message and point',
      status: 400
    })
  }
  // append user in data
  data.user = req.user._id;
  ItemQuery
    .addRatings(data, req.params.item_id)
    .then(function (item) {
      res.json(item);
    })
    .catch(function (err) {
      next(err);
    })
}

module.exports = {
  getAllItem,
  getById,
  search,
  insert,
  update,
  remove,
  addRatings
}