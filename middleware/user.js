module.exports = function user(req, res, next) {
  console.log('holiiiiii acaaa');
  res.locals.user = {
    id: 1,
    name: 'Nicolas',
    admin: false,
  }
  next();
}