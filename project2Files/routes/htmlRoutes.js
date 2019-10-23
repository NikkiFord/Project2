var db = require("../models");

module.exports = function (app) {
  // Load index page
  app.get("/", function (req, res, next) {
    res.render("index", {
      pageTitle: "Home"
    });
  });

  app.get("/wizard-steps/:step", (req, res) => {
    const step = req.params.step;
    res.render(`wizard-steps/${step}`);
  })

  // Load example page and pass in an example by id
  // app.get("/example/:id", function(req, res) {
  //   db.Example.findOne({ where: { id: req.params.id } }).then(function(dbExample) {
  //     res.render("example", {
  //       example: dbExample
  //     });
  //   });
  // });

  // // Render 404 page for any unmatched routes
  // app.get("*", function(req, res) {
  //   res.render("404");
  // });
};
