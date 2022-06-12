module.exports = function (req, res, next) {
  if (req.user.role === 1) {
    next();
  } else {
    next({
      msg: 'You don`t have access',
      status: 403
    })
  }
}