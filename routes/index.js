/* GET home page. */
exports.index = function(req, res){
  res.render('index', { title: 'LazyEvent', loggedIn: (req.username != undefined) });
};
