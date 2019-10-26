var db = require("../models");

module.exports = function(app) {

  app.get("/api/user", (req, res) => {
    res.json(req.user);
  });

  // Get packing items by category
  app.get("/api/packingItems/:category", (req, res, next) => {
    db.PackingItem.findAll({
      where: {
        category: req.params.category
      }
    }).then((items) => {
      res.json(items);
    }).catch(next);
  });

  // Save user's trip to database.
  app.post("/api/save-trip", (req, res) => {
    db.UserList.create({

    });
    res.status(200).send();
  });

  // Create a new example
  // app.post("/api/examples", function(req, res) {
  //   db.Example.create(req.body).then(function(dbExample) {
  //     res.json(dbExample);
  //   });
  // });

  // Delete an example by id
  // app.delete("/api/examples/:id", function(req, res) {
  //   db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
  //     res.json(dbExample);
  //   });
  // });
};
