const { Schema, model } = require("mongoose");

const tableObjectSchema = new Schema({
      novac: {
        type: String,
      },
      ulaz: {
        type: String,
      },
      izlaz: {
        type: String, 
      },
      noci: {
        type: Number,
      },
      odrasli: {
        type: Number,
      },
      deca: {
        type: Number,
      },
      ljubimac: {
        type: Number,
      },
      zaNaplatu: {
        type: Number,
      },
      ruza: {
        type: Number,
      },
      nama: {
        type: Number,
      },
      otkazano: {
        type: Boolean,
      },
      gost: {
        type: String,
      },
      telefon: {
        type: String,
      },
      rezervacija: {
        type: String,
      },
      struja: {
        type: String,
      },
      voda: {
        type: String,
      },
      kucniSavet: {
        type: String,
      },
      investicija: {
        type: String,
      },
      porez: {
        type: String,
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
}, { collection: 'tables' });


const Table = model("table", tableNameSchema);

module.exports = Table;
