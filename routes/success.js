/* GET success page */
exports.program = function(req, res){
  res.render('success', { title: 'LazyEvent - Success' });
};
