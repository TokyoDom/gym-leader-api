const express = require('express');
const router = express.Router();

const knexConfig = require("./knexfile");
const knex = require('knex')(knexConfig);

router.get("/leaders", async (req, res) => {
  const data = await knex.select().from("gym_leaders");
  res.json(data);
});

module.exports = router;