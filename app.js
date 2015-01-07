var express = require("express"),
  bodyParser = require("body-parser"),
  app = express();
  bodyParser = require("body-parser"),
  db = require("./models/index"),
  methodOverride = require("method-override"),
  morgan = require("morgan"),
  locus = require("locus"),
  lodash = require("lodash"),
  pg = require("pg"),
  ejs = require("ejs"),
  trianglify = require("trianglify"),
  request = require("request"),
  mysql = require("mysql"),
  nodemon = require("nodemon"),
  cheerio = require("cheerio"),

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}) );
app.use(methodOverride('_method'));

db.connect = function(buzzer) {
  pg.connect(db.config, function(err, client, done){
      if (err) {
           console.error("OOOPS!!! SOMETHING WENT WRONG!", err);
      }
      buzzer(client);
      done();
  });
};

db.query = function(statement, params, anotherBuzzer){
  db.connect(function(client){
    client.query(statement, params, anotherBuzzer);
  });
};

app.get('/', function(req,res){
    res.render('index');
});


// //SIMPLE ROUTE TO NEW PAGE
// app.get('/new', function(req,res){
//     res.render('new', {name:"",capital:"",info:""});
// });

// // THIS POSTS IT TO THE SHOW PAGE.
// app.post('/show', function(req,res){
//   var name = req.body.flag.name;
//   var capital = req.body.flag.capital;
//   var info = req.body.flag.info;

//   db.Flag.create({
//     name:name,
//     capital:capital,
//     info:info
//   }).success(function(){
//     res.redirect('/new');
//   });
// });

//DISPLAY ALL THE FLAGS
// app.get('/show', function(req,res){
//   db.Flag.findAll().done(function(err, flag){
//     res.render('show', {allFlags: flag});
//   });
// });

app.get('/contact', function(req,res){
    res.render('contact');
});

app.get('/about', function(req,res){
    res.render('about');
});

//SHOW THE FLAG PAGES AS SEPARATE DOMAINS
app.get('/:continent/:country', function(req,res){
  var continent = req.params.continent;
  var country = req.params.country;
  var asyncTotal = country.length;
  var asyncLoser = 0;
  console.log(asyncTotal);
  db.Flag.find({where: {continent: continent, country: country}}).done(function(err, flag){
    // console.log("this is the country information:", flag);
    asyncLoser++;
    console.log(asyncLoser);
    if (asyncTotal > asyncLoser) {
    res.render('country', {flag:flag});
    }
  });
});



app.get('*', function(req,res){
  res.status(404);
  res.render('404');
});

app.listen(process.env.PORT || 3000, function(){
  console.log("get this party started on port 3000");
});









