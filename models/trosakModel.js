const { Schema, model } = require("mongoose");

const tableObjectSchema = new Schema({
  entitet: {
    type: String,
  },
  predmet: {
    type: String,
  },
  maj: {
    type: Number, 
  },
  jun: {
    type: Number,
  },
  jul: {
    type: Number,
  },
  avgust: {
    type: Number, 
  },
  septembar: {
    type: Number,
  },
  oktobar: {
    type: Number,
  },
  novembar: {
    type: Number,
  },
  decembar: {
    type: Number, 
  },
  ukupnoZaGod: {
    type: Number,
  },
  ukupnoEu: {
    type: Number,
  },
  prodato: {
    type: Number,
  },
  zaradjeno: {
    type: Number,
  },
  ostaje: {
    type: Number,
  },
});

const tableNameSchema = new Schema({
  tableName: {
      type: String,
      required: true,
  },
  values: {
      type: [tableObjectSchema],
      required: true,
  }
}, { collection: 'troskovi' });


const TrosakTable = model("TrosakTable", tableNameSchema);

module.exports = TrosakTable;
