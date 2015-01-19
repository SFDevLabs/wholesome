var Item = require('../models/Item');
var cheerio = require('cheerio');
var request = require('request');

var Imager = require('imager');
    // See https://github.com/madhums/node-imager/blob/master/imager-config-example.js for example configuration
var imagerConfig = require('../config/imager')
var imager = new Imager(imagerConfig, 'S3'); // or 'S3' for amazon
var fs= require('fs');
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

	console.log(req.payload)
		console.log(req.files)

   var filePath ="./uploads/"+Math.random()+".png"

   var writable = fs.createWriteStream(filePath); //7
   req.pipe(writable); //8
   // req.on('end', function (){ //9
   //  console.log("end")
   //   res.send(201,{'_id':"2"});
   // }); 

	//var item = new Item(req.body);

   // var filePath ="./uploads/"+Math.random()+".png"
   // var writable = fs.createWriteStream(filePath); //7
   // req.file.pipe(writable); //8
   // req.on('end', function (){ //9
   //  console.log("end")
   //   res.send(201,{'_id':"2"});
   // }); 

	// item.save(function(err){
	// 	if (err){ next(err)} ///make bettet error tracking here Jeff.
	// 	res.redirect('/item/'+item.id);
	// });
};

/**
 * Show /
 * create page.
 */
exports.show = function(req, res) {
	res.send(req.item)
	// var item = new Item(req.body);
	// item.save(function(err){
	// 	if (err){ next(err)} ///make bettet error tracking here Jeff.
	// 	res.redirect('/item/'+item.id);
	// });
};


/**
 * Param lookup for item ID /
 * create page.
 */

exports.urlLookupAPI = function(req, res) {
	var srcs = [];
	request('http://www.bonnydoonfarm.com/catalog/page5.html', function (error, response, body) {
	  if (!error && response.statusCode == 200) {
	    
	    $ = cheerio.load(body);

	    $('img').each(function(i, elem) {
	    	var src = $(this).attr('src');
	    	if (src){srcs.push(src)};
		});

	    //console.log($('img'))

	    res.send(srcs)
	  }
	})



};

/**
 * Param lookup for item ID /
 * create page.
 */

exports.id = function(req, res, next, id) {
	//res.send('next')
	//
	Item.findOne({_id:id},function(err, result){
    	if (!result) return next(new Error('not found'));
		if (result){
			req.item=result;
		}
		next();
	});

};





