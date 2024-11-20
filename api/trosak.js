// const express = require("express");
const { Router } = require("express");
const TrosakTable = require("../models/trosakModel");

var router = Router();

router.get("/", (req, res) => {
  TrosakTable.find()
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
    const result = await TrosakTable.findById(req.params.id);
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
    const result = await TrosakTable.findById(req.params.id);
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
  const table = new TrosakTable({
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
    const result = await TrosakTable.findById(req.params.id);
    if (!result) {
      return res.status(404).send("Table not found");
    }

    if (req.body.tableName) {
      result.tableName = req.body.tableName;
    }

    // Create the new requested object
    const requestedObj = {
      entitet: req.body.entitet || null,
      predmet: req.body.predmet || null,
      maj: req.body.maj || null,
      jun: req.body.jun || null,
      jul: req.body.jul || null,
      avgust: req.body.avgust || null,
      septembar: req.body.septembar || null,
      oktobar: req.body.oktobar || null,
      novembar: req.body.novembar || null,
      decembar: req.body.decembar || null,
      ukupnoZaGod: req.body.ukupnoZaGod || null,
      ukupnoEu: req.body.ukupnoEu || null,
      prodato: req.body.prodato || null,
      zaradjeno: req.body.zaradjeno || null,
      ostaje: req.body.ostaje || null,
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
    const result = await TrosakTable.findById(req.params.id);
    if (!result) {
      return res.status(404).send("Table not found");
    }
    if (result) {
      const row = result.values.find((item) => {
        return item._id == req.params.rowId;
      });

      console.log("row", row);

      row.entitet = req.body.entitet || row.entitet;
      row.predmet = req.body.predmet || row.predmet;
      row.maj = req.body.maj || row.maj;
      row.jun = req.body.jun || row.jun;
      row.jul = req.body.jul || row.jul;
      row.avgust = req.body.avgust || row.avgust;
      row.septembar = req.body.septembar || row.septembar;
      row.oktobar = req.body.oktobar || row.oktobar;
      row.novembar = req.body.novembar || row.novembar;
      row.decembar = req.body.decembar || row.decembar;
      row.ukupnoZaGod = req.body.ukupnoZaGod || row.ukupnoZaGod;
      row.ukupnoEu = req.body.ukupnoEu || row.ukupnoEu;
      row.prodato = req.body.prodato || row.prodato;
      row.zaradjeno = req.body.zaradjeno || row.zaradjeno;
      row.ostaje = req.body.ostaje || row.ostaje;

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
    const table = await TrosakTable.findById(req.params.id);

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
    const deletedTable = await TrosakTable.findByIdAndDelete(req.params.id);

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
