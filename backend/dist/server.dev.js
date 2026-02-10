"use strict";

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//app Config
var app = (0, _express["default"])();
var PORT = 4000; // middleware

app.use(_express["default"].json());
app.use((0, _cors["default"])());
app.get("/", function (req, res) {
  res.send("API Working...");
});
app.listen(PORT, function () {
  console.log("Server is running on port ".concat(PORT));
});