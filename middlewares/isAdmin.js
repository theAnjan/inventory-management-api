module.exports = function (req, res, next) {
  if (req.query.role === 'admin') {
    next();
  } else {
    next({
      msg: 'You dont have access',
      status: 403
    })
  }
}