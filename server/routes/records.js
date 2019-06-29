const express = require("express");
const router = express.Router();

const models = require("../models/customer");
const { Customer, Car, Record } = models;

/**
 * @route Get all the of all docs/users from db
 */
router.get("/", (req, res) => {
  Customer.find()
    .then(doc => res.json(doc))
    .catch(err => console.log(err));
});

/**
 * @route Get last position
 */
router.post("/lastPos", (req, res) => {
  const { email, plate } = req.body;
  const query = { email: email };
  let status = false;
  Customer.findOne(query)
    .then(doc => {
      doc.cars.forEach(car => {
        if (car.plate === plate) {
          res.json(car.records[car.records.length - 1]);
          status = true;
        }
      });
      if (!status) {
        res.status(404).json("Not found");
      }
    })
    .catch(err => console.log(err));
});

/**
 * @route Get all records of one car
 */
router.post("/getAll", (req, res) => {
  const { email, plate } = req.body;
  const query = { email: email };
  let status = false;
  Customer.findOne(query)
    .then(doc => {
      doc.cars.forEach(car => {
        if (car.plate === plate) {
          res.json(car.records);
          status = true;
        }
      });
      if (!status) {
        res.status(404).json("Not found");
      }
    })
    .catch(err => console.log(err));
});

/**
 * @route Add one record to records vector
 */
router.post("/rec", (req, res) => {
  const { email, plate, lat, lon, rpm } = req.body;
  var pos = new Record({
    latitud: lat,
    longitud: lon,
    date: Date.now(),
    rpm: rpm
  });
  const query = { email: email, "cars.plate": plate };
  Customer.findOneAndUpdate(query, { $push: { "cars.$.records": pos } })
    .then(doc => {
      if (doc) {
        res.json(`position \n ${pos} \n added to car ${plate} records`);
      } else {
        res.json("not found");
      }
    })
    .catch(err => console.log(err));
});

module.exports = router;
