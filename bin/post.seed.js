
const mongoose = require("mongoose");
require("../config/db.config");
let postModel = require("../models/post.model");

postModel
  .create({body: 'Targetin Lovro ID which I hardcoded in postModel.create', user: '5fd627eb573c3338e0db896f'} )
  .then(() => {
    console.log("posts inserted!");
    mongoose.connection.close();
  })
  .catch((err) => {
    console.log("posts insertion error: ", err);
});
