const mongoose = require("mongoose");
/*
mongoose.set('useFindAndModify', false);
const URI =
  "mongodb+srv://will:CB27d277@dbc-g3n5u.mongodb.net/track?retryWrites=true&w=majority";

mongoose.set("useNewUrlParser", true);
mongoose
  .connect(URI)
  .then(() => console.log("Connected to database."))
  .catch(err => console.log(err));
*/

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
/*
// Add record to the car of a user
var pos = new Record({
  latitud: 11.19364209556525,
  longitud: -74.22813892364502,
  date: Date.now(),
  rpm: 110
});

var query = { email: "will.canti2697@gmail.com", "cars.plate": "CKN-363" };
Customer.findOneAndUpdate(query, { $push: { 'cars.$.records': pos } }, (err, doc, res) => {
  if (err) throw err;
  console.log(doc.cars[1].records);
});
*/

/*
// Get last record
Customer.find((err, customers) => {
  if (err) throw err;
  const records = customers[0].cars[0].records;
  console.log(records[records.length-1]);
  console.log(customers)
});
*/

/* 
// Add new user
var partner = new Customer({
  name: "Juanse",
  lastname: "Cantillo",
  ic: 2031061212,
  email: "juanse@gmail.com",
  password: "123",
  department: "Atlantico",
  city: "Barranquilla",
  carsAmount: 1,
  cars: [
    {
      plate: "PHA-846",
      brand: "Ferrari",
      model: "90",
      records: [
        {
          latitud: 11.011549292840128,
          longitud: -74.84024047851562,
          date: Date.now(),
          rpm: 120
        }
      ]
    }
  ]
});
partner.save();
console.log(partner);
*/
