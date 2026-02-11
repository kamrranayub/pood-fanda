"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _foodController = require("../controllers/foodController.js");

var _multer = _interopRequireDefault(require("multer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var foodRouter = _express["default"].Router(); //Image Storage Engine


var storage = _multer["default"].diskStorage({
  destination: "uploads",
  filename: function filename(req, file, cb) {
    cb(null, "".concat(Date.now(), "_").concat(file.originalname));
  }
});

var upload = (0, _multer["default"])({
  storage: storage
});
foodRouter.post("/add", upload.single("image"), _foodController.addFood);
foodRouter.get("/list", _foodController.listFood);
foodRouter.post("/remove", _foodController.removeFood);
var _default = foodRouter;
exports["default"] = _default;