/* GET success page */
exports.program = function(req, res){
  console.log(req);
  res.render('dashboard', { title: 'LazyEvent - Dashboard' });
};
