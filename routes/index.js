/* GET home page. */
exports.index = function(req, res){
  db.User.findAll().success(function(users) {
    res.render('index', { title: 'LazyEvent', users: users, loggedIn: true; });
  })
};
