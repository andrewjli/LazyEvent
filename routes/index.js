/* GET home page. */
exports.index = function(req, res){
  //console.log(req.account);
  res.render('index', { title: 'LazyEvent', loggedIn: (req.account != undefined) });
};
