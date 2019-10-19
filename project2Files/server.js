require('dotenv').config();
const express = require("express");
const path = require("path");
const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;


passport.use(new FacebookStrategy({
  clientID: "2140354492935364",
  clientSecret: "8bc3886bc55f326e798bd109ca767bc5",
  callbackURL: "/return"
},
  function (accessToken, refreshToken, profile, cb) {
    return cb(null, profile)
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
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));
app.use(passport.initialize());
app.use(passport.session());

app.get("/login/facebook",
  passport.authenticate("facebook"));

app.get("/return",
  passport.authenticate("facebook", { failureRedirect: "/fail" }),
  function (req, res) {
    console.log("success, bitches");
    res.redirect("/");
  })

// Handlebars
// app.engine(
//   "handlebars",
//   exphbs({
//     defaultLayout: "main"
//   })
// );
// app.set("view engine", "handlebars");


//pug
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

// Routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

let syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function () {
  app.listen(PORT, function () {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports = app;
