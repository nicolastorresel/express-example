module.exports = function auth(req, res, next) {
  const { admin, name } = res.locals.user;

  if(admin) {
    console.log(`El usuario ${name} es admin`);
  }else {
    console.log(`El usuario ${name} no es admin`);
  }
  next();
}