// Connections
const express = require("express");

const router = express.Router();

// Imports burger.js
const burger = require("../models/burger.js");

// Creates the routes
// Routes data to handlebar index files
router.get("/", (req, res) => {
  burger.all((data) => {
    const burgerObject = {
      burgers: data,
    };
    console.log(burgerObject);
    res.render("index", burgerObject);
  });
});

// Route client input into database
router.post("/api/burgers", (req, res) => {
  burger.create(
    ["burger_name", "devoured"],
    [req.body.name, req.body.devoured],
    (result) => {
      // Send back the ID of the new quote
      res.json({ id: result.insertId });
    }
  );
});

// Routes data depending on if burger has been eaten or not"
router.put("/api/burgers/:id", (req, res) => {
  const condition = `id = ${req.params.id}`;

  console.log("*****req.body.devoured", req.body.devoured);

  let devouredState;
  if (req.body.devoured === "0") {
    devouredState = 1;
  } else {
    devouredState = 0;
  }

  burger.update(
    {
      devoured: devouredState,
    },
    condition,
    (result) => {
      console.log("******result", result);
      if (result.changedRows === 0) {
        // If no rows were changed, then the ID must not exist, so 404
        return res.sendStatus(404);
      }
      res.status(200).end();
    }
  );
});

router.delete("/api/burgers/:id", (req, res) => {
  const condition = `id = ${req.params.id}`;

  burger.delete(condition, (result) => {
    if (result.affectedRows === 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    }
    res.status(200).end();
  });
});

// Export routes for server.js to use.
module.exports = router;
