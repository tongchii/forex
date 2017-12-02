var db = require('./db');
var mongoose = require('mongoose');
var bCrypt = require('bcrypt')
var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var swig = require('swig');
var passport = require('passport');
var session = require('express-session');
var LocalStrategy = require('passport-local').Strategy;
var flash = require('connect-flash');
var bodyParser = require('body-parser')
var body = require('body-parser').urlencoded({
  extended: false
});
var valid = [];
var multer = require('multer');
var uploader = multer({
  dest: 'photo'
})
var ejs = require('ejs');
var cookie = require('cookie-parser')()
var alert =require('alert-node');




var app = express();

// all environments
app.set('port', process.env.PORT || 5000);
app.set('views', path.join(__dirname, 'views'));
app.engine('html', ejs.renderFile);
app.set('view engine', 'html');
app.use(flash());
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.methodOverride());

app.use(app.router);
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

var User = mongoose.model('User');

/* GET login page. */
app.get('/', cookie, function(req, res) {
  var card = -1
  if (req.cookies) {
    card = req.cookies.card
  }
  // Display the Login page with any flash message, if any
  res.render('index', {
    member: valid[card]
  });
});
app.get('/reward', cookie, function(req, res) {
  var card = -1
  if (req.cookies) {
    card = req.cookies.card
  }
  // Display the Login page with any flash message, if any
  res.render('reward', {
    member: valid[card]
  });
});

app.get('/redeem', cookie, function(req,res){
  var card = -1
  if (req.cookies) {
    card = req.cookies.card
  }
  alert('not enough points')

})




app.post('/signup',cookie, body, function(req, res) {

  var card = -1
  if (req.cookies) {
    card = req.cookies.card
  }

  var newUser = new User();
  newUser.email = req.body.signemail;
  newUser.password = req.body.signpassword;
  newUser.status1=1;
  newUser.status2=1;
  newUser.status3=1;
  newUser.status4=1;
  newUser.eurusdhigh=0;
  newUser.eurusdlow=0;
  newUser.usdjpyhigh=0;
  newUser.usdjpylow=0;
  newUser.gbpusdhigh=0;
  newUser.gbpusdlow=0;
  newUser.gbpjpyhigh=0;
  newUser.gbpjpylow=0;
  newUser.point=200;
  var email = req.body.signemail;
  var password = req.body.signpassword;

  User.findOne({
    email: email,
    password: password
  },function(err,user){
    if(user != null){
      res.render('index', {
        member: valid[card]
      })
      alert('this email has already use')

    }
    else{
      newUser.save(function(err, newUser, count) {
        if (err) return res.redirect('/');
        var email = req.body.signemail;
        var password = req.body.signpassword;
        User.findOne({
          email: email,
          password: password
        }, function(err, user) {
          if (user != null) {
            var card = parseInt(Math.random() * 100000)
            valid[card] = user
            res.set('Set-Cookie', 'card=' + card)
            res.render('index', {
              member: valid[card]
            })
          }
        });

      })

    }

  })




})





app.post('/signin', body, function(req, res) {

  var email = req.body.email;
  var password = req.body.password;

  User.findOne({
    email: email,
    password: password
  }, function(err, user) {
    if (user != null) {
      var card = parseInt(Math.random() * 100000)
      valid[card] = user

      res.set('Set-Cookie', 'card=' + card)
      res.render('index', {
        member: valid[card]
      })


    } else {

      res.render('index', {
        member: valid[card]
      })

    }


  })

})

app.post('/eurusd', cookie, body, function(req, res) {
  var card = -1
  if (req.cookies) {
    card = req.cookies.card
  }


  User.findOne({
      email: member.email,
      password: member.password
    }, function(err, user) {
      if (user.status1 == 1) {

        user.status1 = 0
        user.eurusdhigh = req.body.eurusdhigh
        user.eurusdlow = req.body.eurusdlow
        user.point= member.point + 20
        user.save()
        alert('submit successful')
        res.render('index', {
          member: valid[card]
        })
      }
      else{

        res.render('index', {
          member: valid[card]
        })
        alert('you can submit 1 answer/day')
      }
    }

  )
})

app.post('/usdjpy', cookie, body, function(req, res) {
  var card = -1
  if (req.cookies) {
    card = req.cookies.card
  }
  member = valid[card]

  User.findOne({
      email: member.email,
      password: member.password
    }, function(err, user) {
      if (user.status2 == 1) {

        user.status2 = 0
        user.usdjpyhigh = req.body.usdjpyhigh
        user.usdjpylow = req.body.usdjpylow
        user.save()
        alert('submit successful')
        res.render('index', {
          member: valid[card]
        })
      }
      else{
        res.render('index', {
          member: valid[card]
        })
      }
    }

  )
})


app.post('/gbpusd', cookie, body, function(req, res) {
  var card = -1
  if (req.cookies) {
    card = req.cookies.card
  }
  member = valid[card]

  User.findOne({
      email: member.email,
      password: member.password
    }, function(err, user) {
      if (user.status3 == 1) {

        user.status3 = 0
        user.gbpusdhigh = req.body.gbpusdhigh
        user.gbpusdlow = req.body.gbpusdlow
        user.save()
        alert('submit successful')
        res.render('index', {
          member: valid[card]
        })
      }
      else{
        res.render('index', {
          member: valid[card]
        })
      }
    }

  )
})


app.post('/gbpjpy', cookie, body, function(req, res) {
  var card = -1
  if (req.cookies) {
    card = req.cookies.card
  }
  member = valid[card]

  User.findOne({
      email: member.email,
      password: member.password
    }, function(err, user) {
      if (user.status4 == 1) {

        user.status4 = 0
        user.gbpjpyhigh = req.body.gbpjpyhigh
        user.gbpjpylow = req.body.gbpjpylow
        user.save()
        alert('submit successful')
        res.render('index', {
          member: valid[card]
        })
      }
      else{
        res.render('index', {
          member: valid[card]
        })
      }
    }

  )
})










app.get('/userlogin', cookie, routes.userlogin);
app.get('/usersignup', cookie, routes.usersignup);
/*app.post('/signup', body ,createMember);
 */

/*function createMember(req,res){
  var newUser = new User();
  newUser.username = req.body.username;
  newUser.password = req.body.password;

  newUser.save(function (err, newUser, count) {
           if (err) return res.redirect('/');
           res.redirect('/userlogin');
       });

}
*/






/* Handle Login POST */







/* app.use(session({
    secret: '2C44-4D44-WppQ38S',
    resave: true,
    saveUninitialized: true
}));

*/



// Login endpoint
/*app.get('/login', function (req, res) {
  if (!req.query.username || !req.query.password) {
    res.render('/');
  } else if(req.query.username === "amy" || req.query.password === "amyspassword") {
    req.session.user = "amy";
    req.session.admin = true;
    res.render("/map");
  }
});*/

app.post('/login', body, function(req, res) {
  var username = req.body.username;
  var password = req.body.password;

  User.findOne({
    username: username,
    password: password
  }, function(err, user) {
    if (user != null) {
      var card = parseInt(Math.random() * 100000)
      valid[card] = user
      res.set('Set-Cookie', 'card=' + card)
      res.render('index', {
        member: valid[card]
      })
    } else {
      res.redirect('/usersignup')

    }


  })
})



app.get('/orlogin', cookie, function(req, res) {
  var card = -1
  if (req.cookies) {
    card = req.cookies.card
  }
  // Display the Login page with any flash message, if any
  res.render('orlogin', {
    member: valid[card]
  });
})

app.post('/orlogin', cookie, body, function(req, res) {
  var username = req.body.username;
  var password = req.body.password;

  Organizer.findOne({
    username: username,
    password: password
  }, function(err, user) {
    if (user != null) {
      var card = parseInt(Math.random() * 100000)
      valid[card] = user
      res.set('Set-Cookie', 'card=' + card)
      Reserve.find({
        or_name: username
      }, function(err, or) {
        res.render('orbooking', {
          member: valid[card],
          data: or
        })
      })


    } else {
      res.redirect('/usersignup')

    }
  })
})

app.post('/accept', cookie, body, function(req, res) {
  var card = -1
  if (req.cookies) {
    card = req.cookies.card
  }
  var newReserved = new Reserved();
  newReserved.event_name = "test";
  newReserved.or_name = "john";
  newReserved.booth_name = req.body.booth_name;
  newReserved.vendername = req.body.vendername;
  newReserved.user_detail = req.body.des;
  newReserved.status = "not";
  newReserved.save(function(err, newReserved, count) {
    if (err) return res.redirect('/map');

  });


  Box.findOne({
    event_name: req.body.event_name,
    booth_name: req.body.booth_name
  }, function(err, box) {

    box.status = "red";
    box.save()


  })

  Reserve.deleteOne({
    event_name: req.body.event_name,
    booth_name: req.body.booth_name
  }, function(err, decision) {

    if (err) return res.redirect('/map');
  })
  Reserve.find({
    event_name: req.body.event_name
  }, function(err, decision) {
    res.render('orbooking', {
      member: valid[card],
      data: decision
    });

  })

})


app.post('/deny', cookie, body, function(req, res) {
  var card = -1
  if (req.cookies) {
    card = req.cookies.card
  }

  Box.findOne({
    event_name: req.body.event_name,
    booth_name: req.body.booth_name
  }, function(err, box) {

    box.status = "green";
    box.save()


  })

  Reserve.deleteOne({
    event_name: req.body.event_name,
    booth_name: req.body.booth_name
  }, function(err, decision) {

    if (err) return res.redirect('/map');
  })
  Reserve.find({
    event_name: req.body.event_name
  }, function(err, decision) {
    res.render('orbooking', {
      member: valid[card],
      data: decision
    });

  })



})




app.get('/profile', cookie, showProfile)
// cookie เป็น middleware ที่อ่าน cookie มาจาก header ของ HTTP ให้ function ถัดไป
function showProfile(req, res) {
  var card = -1
  if (req.cookies != null) {
    card = req.cookies.card
  }
  if (valid[card]) {
    res.render('profile', {
      member: valid[card]
    })
  } else {
    res.redirect('/userlogin')
  }


}


app.get('/map', cookie, showMap);

function showMap(req, res) {
  var card = -1
  if (req.cookies) {
    card = req.cookies.card
  }
  Box.find(function(err, box) {
    if (!err) {
      res.render('map', {
        data: box,
        member: valid[card]
      })


    } else {
      console.log(err);
    };
  });

}


// Logout endpoint
app.get(['/logout', '/signout'], cookie, showLogOut)

function showLogOut(req, res) {
  var card = -1
  if (req.cookies) {
    card = req.cookies.card
  }
  delete valid[card]
  res.redirect('/')
}

app.post(['/book'], cookie, body, book)

function book(req, res) {
  var card = -1
  if (req.cookies) {
    card = req.cookies.card
  }

  Box.findOne({
    event_name: "test",
    booth_name: req.body.booth_name
  }, function(err, box) {

    box.status = "yellow";
    box.save()


  })

  var newReserve = new Reserve();
  newReserve.event_name = "test";
  newReserve.or_name = "john";
  newReserve.booth_name = req.body.booth_name;
  newReserve.vendername = req.body.vendername;
  newReserve.user_detail = req.body.des;
  newReserve.status = "not";

  newReserve.save(function(err, newReserve, count) {
    if (err) return res.redirect('/map');
    res.redirect('/');
  });



}


http.createServer(app).listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
