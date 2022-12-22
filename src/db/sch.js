const mongoose = require("mongoose");

//define schema
const da = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  mobno: {
    type: Number,
    require: true,
  },
  password: {
    type: String,
    required: true,
  },
  confirmpassword: {
    type: String,
    required: true,
  },
});

//How to has password in sha256 enceryption (bcrypt) https://stackoverflow.com/questions/11624372/best-practice-for-hashing-passwords-sha256-or-sha512
//Indexing in DB
// Pre and post hook in moongosse   https://stackoverflow.com/questions/54579752/using-mongoose-pre-hook-to-get-document-before-findoneandupdate

var sch = mongoose.model("Dataone", da);

module.exports = sch;
