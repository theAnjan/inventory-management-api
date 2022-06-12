const router = require('express').Router();
const authRouter = require('./../controllers/auth.controller');
const userRouter = require('./../controllers/user.controller');
const itemRouter = require('./../modules/items/items.route');

// load middlewares
const authenticate = require('./../middlewares/authenticate')

router.use('/auth', authRouter)
router.use('/user', authenticate, userRouter)
router.use('/item', authenticate, itemRouter)

module.exports = router;