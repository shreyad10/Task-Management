const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const isValidId = function (id) {
  return mongoose.Types.ObjectId.isValid(id);
};

module.exports = { isValidId };
