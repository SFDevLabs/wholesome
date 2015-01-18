/**
 * GET /
 * Home page.
 */
exports.home = function(req, res) {
 res.render('home', {
    title: 'Home'
  });
};


/**
 * GET /
 * Home page.
 */
exports.index = function(req, res) {
  res.send('list')
  // res.render('home', {
  //   title: 'Home'
  // });
};