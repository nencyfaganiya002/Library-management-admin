exports.signup = function(req, res){
   message = '';
   if(req.method == "POST"){
      var post  = req.body;
      var username = post.username;
      var password = post.password;
      var fname= post.first_name;
      var lname= post.last_name;
      var mobile= post.mobile;
	  if(username !='' && password!='') {
		  var sql = "INSERT INTO `admin`(`first_name`,`last_name`,`mobile`,`username`, `password`) VALUES ('" + fname + "','" + lname + "','" + mobile + "','" + username + "','" + password + "')";

		  var query = db.query(sql, function(err, result) {
			 message = "Your account has been created succesfully.";
			 res.render('signup.ejs',{message: message});
		  });
	  } else {
		  message = "Username and password is mandatory field.";
		  res.render('signup.ejs',{message: message});
	  }

   } else {
      res.render('signup');
   }
};
 
exports.login = function(req, res){
   var message = '';
   var sess = req.session; 

   if(req.method == "POST"){
      var post  = req.body;
      var username = post.username;
      var password= post.password;
     
      var sql="SELECT id, first_name, last_name, username FROM `admin` WHERE `username`='"+username+"' and password = '"+password+"'";                           
      db.query(sql, function(err, results){       
         if(results.length){
            req.session.userId = results[0].id;
            req.session.user = results[0];
            console.log(results[0].id);
            res.redirect('/home/dashboard');
         }
         else{
            message = 'You have entered invalid username or password.';
            res.render('signin.ejs',{message: message});
         }
                 
      });
   } else {
      res.render('index.ejs',{message: message});
   }
           
};

           
exports.dashboard = function(req, res, next){
           
   var user =  req.session.user,
   userId = req.session.userId;
   console.log('ddd='+userId);
   if(userId == null){
      res.redirect("/login");
      return;
   }

   var sql="SELECT * FROM `admin` WHERE `id`='"+userId+"'";

   db.query(sql, function(err, results){
      res.render('dashboard.ejs', {data:results});    
   });       
};

exports.profile = function(req, res){

   var userId = req.session.userId;
   if(userId == null){
      res.redirect("/login");
      return;
   }

   var sql="SELECT * FROM `admin` WHERE `id`='"+userId+"'";          
   db.query(sql, function(err, result){  
      res.render('profile.ejs',{data:result});
   });
};

exports.logout=function(req,res){
   req.session.destroy(function(err) {
      res.redirect("/login");
   })
};

exports.booklist = function(req, res){
    var userId = req.session.userId;
   if(userId == null){
      res.redirect("/login");
      return;
   }

   var sql="SELECT * FROM `books` ";          
   db.query(sql, function(err, result){  
      res.render('book-list.ejs',{data:result});
   });
};

exports.authorlist = function(req, res){
   var userId = req.session.userId;
  if(userId == null){
     res.redirect("/login");
     return;
  }

  var sql="SELECT * FROM `authors` ";          
  db.query(sql, function(err, result){  
     res.render('author-list.ejs',{data:result});
  });
};

exports.userlist = function(req, res){
   var userId = req.session.userId;
  if(userId == null){
     res.redirect("/login");
     return;
  }

  var sql="SELECT * FROM `users` ";          
  db.query(sql, function(err, result){  
     res.render('user-list.ejs',{data:result});
  });
};

exports.addauthor = function(req, res){
   message = '';
   if(req.method == "POST"){
      var post  = req.body;
      var authorname = post.authorname;
	  if(authorname !='' ) {
		  var sql = "INSERT INTO `authors`(`authorname`) VALUES ('" + authorname + "')";

		  var query = db.query(sql, function(err, result) {
			 message = "Author has been succesfully added.";
			 res.render('add-author.ejs',{message: message});
		  });
	  } else {
		  message = "Author name  is mandatory field.";
		  res.render('add-author.ejs',{message: message});
	  }

   } else {
      res.render('add-author');
   }
};

exports.addbook = function(req, res){
   message = '';
   if(req.method == "POST"){
      var post  = req.body;
      var bookname = post.bookname;
      var authorname = post.authorname;
      var ISBN = post.ISBN;
      var price = post.price;
	  if(bookname !='' && ISBN !='') {
		  var sql = "INSERT INTO `books`(`bookname`, `authorname`, `ISBN`, `price`) VALUES ('" + bookname + "' ,'" + authorname + "', '" + ISBN + "', '" + price + "')";

		  var query = db.query(sql, function(err, result) {
			 message = "Boook has been succesfully added.";
			 res.render('add-book.ejs',{message: message});
		  });
	  } else {
		  message = "Book name and ISBN is mandatory field.";
		  res.render('add-book.ejs',{message: message});
	  }

   } else {
      res.render('add-book');
   }
};

exports.issuebook = function(req, res){
   message = '';
   if(req.method == "POST"){
      var post  = req.body;
      var userid = post.userid;
      var username = post.username;
      var bookname = post.bookname;
      var ISBN= post.ISBN;
	  if(userid !='' && bookname!='') {
		  var sql = "INSERT INTO `issuebook`(`user_id`,`username`,`bookname`,`ISBN`) VALUES ('" + userid + "','" + username + "','" + bookname + "','" + ISBN + "')";

		  var query = db.query(sql, function(err, result) {
			 message = "Book has been issued succesfully.";
			 res.render('issue-book.ejs',{message: message});
		  });
	  } else {
		  message = "Userid and bookname is mandatory field.";
		  res.render('issue-book.ejs',{message: message});
	  }

   } else {
      res.render('issue-book');
   }
};