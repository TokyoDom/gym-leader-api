const express = require('express');
const router = express.Router();

const knexConfig = require("./knexfile");
const knex = require('knex')(knexConfig);

router.get("/leaders", async (req, res) => {
  let data = await knex.select().from("gym_leaders");

  try {
    const limit = parseInt(req.query.limit);
    data = data.slice(0, limit);
  } catch (err) {
    console.error(err);
    res.sendStatus(400);
    return;
  }
   
  res.json(data);
});

module.exports = router;