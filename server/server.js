const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const records = require("./routes/records");
// connect to db
const URI =
  "mongodb+srv://will:CB27d277@dbc-g3n5u.mongodb.net/track?retryWrites=true&w=majority";
mongoose.set("useFindAndModify", false);
mongoose.set("useNewUrlParser", true);
mongoose
  .connect(URI)
  .then(() => console.log("Connected to database."))
  .catch(err => console.log(err));

// Express app
const app = express();
app.use(bodyParser.json());
app.use("/track/api", records);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on ${port}`));
