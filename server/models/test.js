const mongoose = require("mongoose");

const URITEST =
  "mongodb+srv://will:CB27d277@dbc-g3n5u.mongodb.net/test?retryWrites=true&w=majority";

const URI =
  "mongodb+srv://will:CB27d277@dbc-g3n5u.mongodb.net/track?retryWrites=true&w=majority";
mongoose.set("useNewUrlParser", true);
mongoose
  .connect(URI)
  .then(() => console.log("Connected to database."))
  .catch(err => console.log(err));

const Schema = mongoose.Schema;
const testSchema = new Schema({
  name: String,
  lastname: String,
  ic: Number,
  email: String,
  password: String,
  department: String,
  city: String,
  carsAmount: Number,
});

var Test = mongoose.model("customers", testSchema);
Test.find((err, items) => {
  if (err) throw err;
  console.log(items);
});

/*
const mongoose = require("mongoose");
const URI =
  "mongodb+srv://will:CB27d277@dbc-g3n5u.mongodb.net/track?retryWrites=true&w=majority";

mongoose.set("useNewUrlParser", true);
mongoose
  .connect(URI)
  .then(() => console.log("Connected to database."))
  .catch(err => console.log(err));

const Schema = mongoose.Schema;
const record = new Schema({
  latitud: Number,
  longitud: Number,
  date: Date,
  rpm: Number
})

const car = new Schema({
  plate:{
    type: String,
    brand: String,
    model: String,
    record: [record]
  }
})
const costumerSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  lastname: { type: String },
  ic: {
    type: Number
  },
  email: {
    type: String
  },
  password: {
    type: String
  },
  department: {
    type: String
  },
  city: {
    type: String
  },
  carsAmount: {
    type: Number
  },
  cars: [car]
});
const ItemSchema = new Schema({
  name: { type: String },
  date: { type: Date }
});
const Costumer = mongoose.model("costumers", costumerSchema);
var Item = mongoose.model("item", ItemSchema);

Costumer.find((err, costumers) => {
  if (err) throw err;
  console.log(costumers);
});

// var me = new costumer({ name: "Wilmer" });

*/
