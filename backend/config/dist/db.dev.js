"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.connectDB = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var connectDB = function connectDB() {
  return regeneratorRuntime.async(function connectDB$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(_mongoose["default"].connect('mongodb://kami:kamran123@ac-kbdpk2t-shard-00-00.zror1yy.mongodb.net:27017,ac-kbdpk2t-shard-00-01.zror1yy.mongodb.net:27017,ac-kbdpk2t-shard-00-02.zror1yy.mongodb.net:27017/pood-fanda?ssl=true&replicaSet=atlas-eyv9xj-shard-0&authSource=admin&retryWrites=true&w=majority'));

        case 3:
          console.log("MongoDB Connected...");
          _context.next = 10;
          break;

        case 6:
          _context.prev = 6;
          _context.t0 = _context["catch"](0);
          console.error("MongoDB Connection Error:", _context.t0);
          process.exit(1); // Stop server if DB connection fails

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 6]]);
};

exports.connectDB = connectDB;