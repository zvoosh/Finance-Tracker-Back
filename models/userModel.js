const { Schema, model } = require("mongoose");

const tableObjectSchema = new Schema({
  username: {
    type: String,
    unique: true
  },
  password: {
    type: String,
  },
}, { collection: 'users' });


const UserTable = model("UserTable", tableObjectSchema);

module.exports = UserTable;
