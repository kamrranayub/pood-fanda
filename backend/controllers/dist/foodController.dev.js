"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeFood = exports.listFood = exports.addFood = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _foodModels = _interopRequireDefault(require("../models/foodModels.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// foodController.js
var SERVER_URL = "http://localhost:4000"; // Change if deployed
// Add Food

var addFood = function addFood(req, res) {
  var image_filename, food;
  return regeneratorRuntime.async(function addFood$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (req.file) {
            _context.next = 2;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            message: "Image file is required"
          }));

        case 2:
          image_filename = req.file.filename;
          food = new _foodModels["default"]({
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            category: req.body.category,
            image: image_filename
          });
          _context.prev = 4;
          _context.next = 7;
          return regeneratorRuntime.awrap(food.save());

        case 7:
          res.status(200).json({
            message: "Food Item Added Successfully",
            food: food
          });
          _context.next = 14;
          break;

        case 10:
          _context.prev = 10;
          _context.t0 = _context["catch"](4);
          console.error("Error Adding Food Item:", _context.t0);
          res.status(500).json({
            message: "Error Adding Food Item",
            error: _context.t0.message
          });

        case 14:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[4, 10]]);
}; // List all food items with full image URL


exports.addFood = addFood;

var listFood = function listFood(req, res) {
  var foodList, foodsWithImageURL;
  return regeneratorRuntime.async(function listFood$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(_foodModels["default"].find({}));

        case 3:
          foodList = _context2.sent;
          foodsWithImageURL = foodList.map(function (food) {
            return {
              _id: food._id,
              name: food.name,
              description: food.description,
              price: food.price,
              category: food.category,
              image: "".concat(SERVER_URL, "/images/").concat(food.image)
            };
          });
          res.status(200).json(foodsWithImageURL);
          _context2.next = 12;
          break;

        case 8:
          _context2.prev = 8;
          _context2.t0 = _context2["catch"](0);
          console.error("Error Fetching Food List:", _context2.t0);
          res.status(500).json({
            message: "Error Fetching Food List",
            error: _context2.t0.message
          });

        case 12:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 8]]);
}; // Remove Food


exports.listFood = listFood;

var removeFood = function removeFood(req, res) {
  var id, food, filePath;
  return regeneratorRuntime.async(function removeFood$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          id = req.body.id;

          if (id) {
            _context3.next = 3;
            break;
          }

          return _context3.abrupt("return", res.status(400).json({
            success: false,
            message: "ID is required"
          }));

        case 3:
          if (_mongoose["default"].Types.ObjectId.isValid(id)) {
            _context3.next = 5;
            break;
          }

          return _context3.abrupt("return", res.status(400).json({
            success: false,
            message: "Invalid ID format"
          }));

        case 5:
          _context3.prev = 5;
          _context3.next = 8;
          return regeneratorRuntime.awrap(_foodModels["default"].findById(id));

        case 8:
          food = _context3.sent;

          if (food) {
            _context3.next = 11;
            break;
          }

          return _context3.abrupt("return", res.status(404).json({
            success: false,
            message: "Food item not found"
          }));

        case 11:
          filePath = "uploads/".concat(food.image);

          if (_fs["default"].existsSync(filePath)) {
            _fs["default"].unlinkSync(filePath);
          }

          _context3.next = 15;
          return regeneratorRuntime.awrap(_foodModels["default"].findByIdAndDelete(id));

        case 15:
          res.status(200).json({
            success: true,
            message: "Food Item Removed Successfully"
          });
          _context3.next = 22;
          break;

        case 18:
          _context3.prev = 18;
          _context3.t0 = _context3["catch"](5);
          console.error("Error Removing Food Item:", _context3.t0);
          res.status(500).json({
            success: false,
            message: "Error Removing Food Item",
            error: _context3.t0.message
          });

        case 22:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[5, 18]]);
};

exports.removeFood = removeFood;