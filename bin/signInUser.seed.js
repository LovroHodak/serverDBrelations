const mongoose = require("mongoose");
require("../config/db.config");
let signInUserModel = require("../models/signInUser.model");

signInUserModel
  .create({username: 'Lovro', email: 'lovro@gmail.com', password: '#Lovro0000'})
  .then(() => {
    console.log("signInUsers inserted!");
    mongoose.connection.close();
  })
  .catch((err) => {
    console.log("signInUsers insertion error: ", err);
});
