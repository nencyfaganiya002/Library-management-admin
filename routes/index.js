/*
* GET home page.
*/
 
exports.index = function(req, res){
    var message = '';
  res.render('index',{message: message});
 
};

exports.login = function(req, res){
    var message = '';
    res.render('signin.ejs',{message: message});
}