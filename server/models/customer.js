const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const record = new Schema({
  latitud: Number,
  longitud: Number,
  date: Date,
  rpm: Number
});
const car = new Schema({
  plate: String,
  brand: String,
  model: String,
  records: [record]
});
const customerSchema = new Schema({
  name: String,
  lastname: String,
  ic: Number,
  email: String,
  password: String,
  department: String,
  city: String,
  carsAmount: Number,
  cars: [car]
});

const Customer = mongoose.model("customers", customerSchema);
const Car = mongoose.model("customers.cars", car);
const Record = mongoose.model("customers.cars.records", record);
module.exports = { Customer, Car, Record };
