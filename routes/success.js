/* GET success page */
exports.program = function(req, res){
  console.log(req);
  res.render('success', { title: 'LazyEvent - Success' });
};
