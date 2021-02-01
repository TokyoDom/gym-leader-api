const express = require('express');
const router = express.Router();

const knexConfig = require("./knexfile");
const knex = require('knex')(knexConfig);

function updatePokeArr(data) {
  return data.map(leader => {
    if (leader.pokemon) leader.pokemon = leader.pokemon.split(",");
    return leader;
  });
}

router.route("/leaders")
  .get(async (req, res) => {
    let data = await knex("gym_leaders");
    data = updatePokeArr(data);
  
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
  })
  .post(async (req, res) => {
    try {
      await knex("gym-leaders").insert(req.body);
    } catch (err) {
      res.sendStatus(400);
      return;
    }
    res.status(201).send("Success");
  })
  .patch(async (req, res) => {

  });

module.exports = router;