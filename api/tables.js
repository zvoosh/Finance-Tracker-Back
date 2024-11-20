// const express = require("express");
const { Router } = require("express");
const Table = require("../models/tableModel");

var router = Router();

router.get("/", (req, res) => {
  Table.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(`${err} : GetAllTables`);
    });
});
// get table by id
router.get("/:id", async (req, res) => {
  try {
    const result = await Table.findById(req.params.id);
    if (!result) {
      return res.status(404).send("Table not found");
    }
    if (result) {
      res.send(result);
    }
  } catch (err) {
    console.log(`${err} : GetOneTable`);
    res.status(500).send("Error getting table");
  }
});

// get row by id
router.get("/:id/:rowId", async (req, res) => {
  try {
    const result = await Table.findById(req.params.id);
    if (!result) {
      return res.status(404).send("Table not found");
    }
    if (result) {
      const row = result.values.find((item) => {
        return item._id == req.params.rowId;
      });

      console.log("row", row);
      res.send(row);
    }
  } catch (err) {
    console.log(`${err} : GetOneTable`);
    res.status(500).send("Error getting table");
  }
});
//new TABLE
router.post("", (req, res) => {
  const table = new Table({
    tableName: req.body.tableName,
    values: req.body.values || [],
  });
  table
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(`${err} : PostTable`);
    });
});
//add row
router.put("/:id/", async (req, res) => {
  try {
    const result = await Table.findById(req.params.id);
    if (!result) {
      return res.status(404).send("Table not found");
    }

    if (req.body.tableName) {
      result.tableName = req.body.tableName;
    }

    // Create the new requested object
    const requestedObj = {
      novac: req.body.novac || null,
      ulaz: req.body.ulaz || null,
      izlaz: req.body.izlaz || null,
      noci: req.body.noci || null,
      odrasli: req.body.odrasli || null,
      deca: req.body.deca || null,
      ljubimac: req.body.ljubimac || null,
      zaNaplatu: req.body.zaNaplatu || null,
      ruza: req.body.ruza || null,
      nama: req.body.nama || null,
      otkazano: req.body.otkazano || null,
      gost: req.body.gost || null,
      telefon: req.body.telefon || null,
      rezervacija: req.body.rezervacija || null,
      struja: req.body.struja || null,
      voda: req.body.voda || null,
      kucniSavet: req.body.kucniSavet || null,
      investicija: req.body.investicija || null,
      porez: req.body.porez || null,
    };

    // Push the new entry to the values array
    result.values.push(requestedObj);
    await result.save();
    res.send("success");
  } catch (err) {
    console.log(`${err} : EditOneTable`);
    res.status(500).send("Error updating table");
  }
});
//edit row
router.put("/:id/:rowId", async (req, res) => {
  try {
    const result = await Table.findById(req.params.id);
    if (!result) {
      return res.status(404).send("Table not found");
    }
    if (result) {
      const row = result.values.find((item) => {
        return item._id == req.params.rowId;
      });

      console.log("row", row);

      row.novac = req.body.novac || row.novac;
      row.ulaz = req.body.ulaz || row.ulaz;
      row.izlaz = req.body.izlaz || row.izlaz;
      row.noci = req.body.noci || row.noci;
      row.odrasli = req.body.odrasli || row.odrasli;
      row.deca = req.body.deca || row.deca;
      row.ljubimac = req.body.ljubimac || row.ljubimac;
      row.zaNaplatu = req.body.zaNaplatu || row.zaNaplatu;
      row.ruza = req.body.ruza || row.ruza;
      row.nama = req.body.nama || row.nama;
      row.otkazano = req.body.otkazano || row.otkazano;
      row.gost = req.body.gost || row.gost;
      row.telefon = req.body.telefon || row.telefon;
      row.rezervacija = req.body.rezervacija || row.rezervacija;
      row.struja = req.body.struja || row.struja;
      row.voda = req.body.voda || row.voda;
      row.kucniSavet = req.body.kucniSavet || row.kucniSavet;
      row.investicija = req.body.investicija || row.investicija;
      row.porez = req.body.porez || row.porez;

      console.log("row 2", row);

      // Push the new entry to the values array
      await result.save();
      res.send("success");
    }
  } catch (err) {
    console.log(`${err} : EditOneTable`);
    res.status(500).send("Error updating table");
  }
});

//delete one row
router.delete("/:id/:elementId", async (req, res) => {
  try {
    // Find the table by ID
    const table = await Table.findById(req.params.id);

    if (!table) {
      return res.status(404).send("Table not found");
    }

    // Find the index of the element to delete
    const index = table.values.findIndex(
      (item) => item._id == req.params.elementId
    );

    if (index !== -1) {
      table.values.splice(index, 1); // Remove the element
      await table.save(); // Save the updated document
      return res.status(200).send("Element deleted successfully");
    } else {
      return res.status(404).send("Element not found");
    }
  } catch (err) {
    console.error(`${err} : DeleteOneRow`);
    res.status(500).send("Internal Server Error");
  }
});

router.delete("/:id", async (req, res) => {
  try {
    // Find and delete the table by ID
    const deletedTable = await Table.findByIdAndDelete(req.params.id);

    if (!deletedTable) {
      // If no table was found with the provided ID
      return res.status(404).send("Table not found");
    }

    // Success response if the table was deleted
    res.status(200).send("Table deleted successfully");
  } catch (err) {
    // Log the error and send a 500 response
    console.error(`${err} : DeleteOneTable`);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
