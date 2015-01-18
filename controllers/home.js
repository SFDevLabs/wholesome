/**
 * Front /
 * Home page.
 */
exports.frontpage = function(req, res) {

	if (req.isAuthenticated()){
		index(req, res)
	}else{
		home(req, res)
	}

};

/**
 * GET /
 * Home page.
 */
var home = function(req, res) {
 res.render('home', {
    title: 'Home'
  });
};


/**
 * GET /
 * Home page.
 */
var index = function(req, res) {
  res.render('list', {
    title: 'Home',
    items: [1,2,3]
  });
};