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
    }).then(items => {
      res.json(items);
    }).catch(next);
  });

  app.get("/api/trips", (req, res) => {
    db.UserList.findAll().then(trips => {
      res.json(trips.map(trip => {
        trip.items = JSON.parse(trip.items);
        return trip;
      }));
    });
  });

  // Save user's trip to database.
  app.post("/api/save-trip", (req, res) => {
    db.UserList.create({
      userId: req.user.id,
      location: req.body.location,
      items: req.body.packingItems
    }).then(() => res.status(200).send());
  });

};
