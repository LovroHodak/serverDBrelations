const mongoose = require("mongoose");
require("../config/db.config");
let userModel = require("../models/user.model");

userModel
  .insertMany([{name: 'Lovro', email: 'lovro@gmail.com', phone: '031545100'}, {name: 'Jan', email: 'jan@gmail.com', phone: '031386342'}])
  .then(() => {
    console.log("users inserted!");
    mongoose.connection.close();
  })
  .catch((err) => {
    console.log("Users insertion error: ", err);
});
