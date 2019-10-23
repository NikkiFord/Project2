var db = require("../models");

module.exports = function(app) {

  // Get packing items by category
  app.get("/api/packingItems/:category", (req, res) => {
    db.PackingItem.findAll({
      where: {
        category: "essentials"
      }
    }).then((essentialItems) => {
      res.json(essentialItems);
    }).catch((err) => res.status(500).send(err.stack));
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
