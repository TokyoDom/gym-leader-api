const data = require('../data/gymLeaders.json');
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  return knex('gym_leaders').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('gym_leaders').insert(data.map(leader => {
        leader.pokemon = leader.pokemon.join()
        return leader;
      }));
    });
};
