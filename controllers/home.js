var Item = require('../models/Item');

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
	Item.find({},function(err, result){
		res.render('list', {
		    title: 'Home',
		    items: result
		})
	});
}

/**
 * Item /
 * create page.
 */
exports.new = function(req, res) {
	res.render('new', {
	    title: 'New Item',
	})
};

/**
 * Item /
 * create page.
 */
exports.create = function(req, res) {
	var item = new Item(req.body);

	item.user=req.user;
	item.save(function(err){
		if (err){ next(err)} ///make bettet error tracking here Jeff.
		res.redirect('/item/'+item.id);
	});
};

/**
 * Show /
 * create page.
 */
exports.show = function(req, res) {
	res.render('show', {
	    title: 'New Item',
	    item: req.item
	})
};

/**
 * Param lookup for item ID /
 * create page.
 */

exports.id = function(req, res, next, id) {
	//res.send('next')
	console.log(req.user)
	Item.findOne({_id:id})
	 .populate('user', 'email name')
	 .exec(function(err, result){
    	if (!result) return next(new Error('not found'));
		if (result){
			req.item=result;
		}
		next();
	});
	
	// var item = new Item(req.body);
	// item.save(function(err){
	// 	if (err){ next(err)} ///make bettet error tracking here Jeff.
	// 	res.redirect('/item/'+item.id);
	// });

};

