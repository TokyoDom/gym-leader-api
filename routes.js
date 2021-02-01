const express = require('express');
const router = express.Router();

const knexConfig = require("./knexfile");
const knex = require('knex')(knexConfig);

router.get("/leaders", async (req, res) => {
  let data = await knex.select().from("gym_leaders");

  let limit = req.query.limit;
  if (typeof limit !== "undefined") {
    limit = parseInt(limit);

    if(Number.isNaN(limit)) {
      res.sendStatus(400);
      return;
    } else {
      data = data.slice(0, limit);
    }
  }
  
  res.json(data);
});

module.exports = router;