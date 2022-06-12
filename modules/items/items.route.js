const router = require('express').Router();
const ItemCtrl = require('./items.controller');
// const authenticate = require('./../../middlewares/authenticate')

router.route('/')
  .get(ItemCtrl.getAllItem)
  .post(ItemCtrl.insert);

router.route('/add_ratings/:item_id')
  .post(ItemCtrl.addRatings)

router.route('/:id')
  .get(ItemCtrl.getById)
  .put(ItemCtrl.update)
  .delete(ItemCtrl.remove);

router.route('/search')
  .get(ItemCtrl.search)
  .post(ItemCtrl.search)


module.exports = router;
