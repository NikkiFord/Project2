require('dotenv').config();
const express = require("express");
const path = require("path");
const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;


passport.use(new FacebookStrategy({
  clientID: "2140354492935364",
  clientSecret: "8bc3886bc55f326e798bd109ca767bc5",
  callbackURL: "http://localhost:3000/return"
  // callbackURL: "https://pack-it-now.herokuapp.com/return"
},
  function (accessToken, refreshToken, profile, cb) {
    return cb(null, profile);
  }
));

passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});

let db = require("./models");

let app = express();
let PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.url);
  next();
});
app.use(express.static(path.join(__dirname, "public")));
app.use(require("express-session")({ secret: "bitches!", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.get("/login/facebook",
  passport.authenticate("facebook"));

app.get("/return",
  passport.authenticate("facebook", { failureRedirect: "/" }),
  function (req, res) {
    res.redirect("/home");
  });


//pug
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

// Routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

app.use((req, res, next) => {
  res.status(404).send("<h1>404</h1>");
});

app.use((err, req, res, next) => {
  res.status(500).send(err.stack);
});

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync({ force: false }).then(function () {
  app.listen(PORT, function () {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});


module.exports = app;
