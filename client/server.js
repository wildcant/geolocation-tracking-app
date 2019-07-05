var express = require("express");
// Debugging : logger
var morgan = require("morgan");
// Performance: reduce size
var compression = require('compression');
// Security
var helmet = require('helmet');

var app = express();
app.use(helmet());
app.use(compression()); 
app.use(morgan("combined"));

// Serve the static files from the build folder
app.use(express.static( __dirname + "/build"));
//app.use('/material-dashboard-react', express.static(__dirname + "/build"));
// Redirect all traffic to the index
app.get("*", function(req, res){
  res.sendFile(__dirname + "/build/index.html");
});
// Listen to port 3000
app.listen(process.env.PORT || 3000);
