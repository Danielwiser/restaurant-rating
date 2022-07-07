
// this is a middleware that ensure users login before entering the dashboard

module.exports = {
    ensureAuth: function (req, res, next) {
      if (req.isAuthenticated()) {
        return next()
      } else {
        res.redirect('/')
      }
    },
    ensureGuest: function (req, res, next) {
      if (!req.isAuthenticated()) {
        return next();
      } else {
        res.redirect('/dashboard');
      }
    },
  }