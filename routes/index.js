var mongoose = require('mongoose');



var User = mongoose.model('User');

var valid=[];

exports.index = function (req, res) {
    Product.find(function (err, products) {
        if (!err) {
            Category.find(function (err, categories) {
                if (!err) {
                    res.render('index', {
                        title : 'Clean Code Lab with Mongoose and Node',
                        year: new Date().getFullYear(),
                        products : products,
                        categories: categories
                    });
                } else {
                    console.log(err);
                };
            });
        } else {
            console.log(err);
        }
    });
};

exports.map = function (req, res) {
  var card = -1
	if (req.cookies) {
		card = req.cookies.card
	}
  Box.find(function (err, box) {
      if (!err) {
        res.render('map',{data:box,member: valid[card]})


      } else {
          console.log(err);
      };
  });

}
exports.userlogin = function (req, res) {
  var card = -1
	if (req.cookies) {
		card = req.cookies.card
	}
  res.render('userlogin',{member: valid[card]})
}
exports.usersignup = function (req, res) {
  var card = -1
  if (req.cookies) {
    card = req.cookies.card
  }
  res.render('usersignup',{member: valid[card]})
}



exports.edit = function (req, res) {
    Product.findById(req.body.productId, function (err, product) {
        console.log('body: ' + JSON.stringify(product));
        res.send(JSON.stringify(product));
    });
};

exports.update = function(req, res,next){
  console.log('Post a video');
  var newUser = new User();
  newUser.username = req.body.username;
  newUser.password = req.body.password;

  newUser.save(function (err, newUser, count) {
           if (err) return next(err);
           res.redirect('/');
       });


  /*newUser.save(function(err, insertedUser){
    if(err){
      console.log('error saving video');
    }else{
      res.json(insertedUser);

    }

  });*/

};


exports.delete = function (req, res) {
    Product.findById(req.body.productId, function (err, product) {
        product.remove(function (err, product) {
            res.send('The data saved successfully.');
        });
    });
};
