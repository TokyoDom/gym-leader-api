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
    const data = await knex("gym_leaders");
  
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
    
    res.json(updatePokeArr(data));
  })
  .post(async (req, res) => {
    try {
      req.body.name = req.body.name.charAt(0).toUpperCase() + req.body.name.slice(1);
      if (req.body.pokemon) req.body.pokemon = req.body.pokemon.join();
      await knex("gym_leaders").insert(req.body);
    } catch (err) {
      res.sendStatus(400);
      return;
    }

    const newRecord = await knex("gym_leaders").where({ name: req.body.name });
    res.status(201).json(updatePokeArr(newRecord));
  });

router.route("/leaders/:name")
  .get(async (req, res) => {
    const name = req.params.name.charAt(0).toUpperCase() + req.params.name.slice(1);
    const data = await knex("gym_leaders").where({ name });
  
    res.json(updatePokeArr(data));
  })
  .patch(async (req, res) => {
    const name = req.params.name.charAt(0).toUpperCase() + req.params.name.slice(1);
    try {
      if (req.body.name) throw err;
      if (req.body.pokemon) req.body.pokemon = req.body.pokemon.join();
      await knex("gym_leaders").where({ name }).update(req.body);
    } catch (err) {
      res.sendStatus(400);
      return;
    }

    const updatedRecord = await knex("gym_leaders").where({ name });

    res.status(200).json(updatePokeArr(updatedRecord));
  })
  .delete(async (req, res) => {
    const name = req.params.name.charAt(0).toUpperCase() + req.params.name.slice(1);
    try {
      await knex("gym_leaders").where({ name }).del();
    } catch (err) {
      res.sendStatus(400);
      return;
    }

    res.status(204).send("Delete successful");
  });

router.get("/gens/:gen/leaders", async (req, res) => {
  const data = await knex("gym_leaders").where({ gen: req.params.gen });
  res.json(updatePokeArr(data));
});

router.get("/types/:type/leaders", async (req, res) => {
  const type = req.params.type.charAt(0).toUpperCase() + req.params.type.slice(1);

  const data = await knex("gym_leaders").where({ type });
  res.json(updatePokeArr(data));
});

router.get("/pokemon/:poke/leaders", async (req, res) => {
  const poke = req.params.poke.charAt(0).toUpperCase() + req.params.poke.slice(1);

  const data = await knex("gym_leaders").where("pokemon", "like", `%${poke}%`);
  res.json(updatePokeArr(data));
});

module.exports = router;