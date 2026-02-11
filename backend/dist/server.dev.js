"use strict";

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _db = require("./config/db.js");

var _foodRoute = _interopRequireDefault(require("./routes/foodRoute.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
var PORT = 4000;
app.use(_express["default"].json());
app.use((0, _cors["default"])());
(0, _db.connectDB)(); // Make sure DB connects before handling requests

app.use("/api/food", _foodRoute["default"]);
app.use("/images", _express["default"]["static"]("uploads"));
app.get("/", function (req, res) {
  res.send("API Working...");
});
app.listen(PORT, function () {
  return console.log("Server running on port ".concat(PORT));
}); //mongodb+srv://kami:<db_password>@cluster007.zror1yy.mongodb.net/?