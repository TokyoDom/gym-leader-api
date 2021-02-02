const root = document.getElementById("root");

function GymLeader(leader) {
  //edge case
  if(leader.name === "Tate&Liza") {
    leader.name = "Tate & Liza",
    leader.sprite = "https://play.pokemonshowdown.com/sprites/trainers/tateandliza-gen3.png"
  }

  return `
  <div class="gym-leader-card">
    <div class="gym-leader-info">
      <img src=${leader.sprite} />
      <h1>${leader.name}</h1>
      <p>Location: ${leader.city ? leader.city : "N/A"}</p>
      <p>Badge: ${leader.badge ? leader.badge : "N/A"}</p>
      <p>Type: ${leader.type ? leader.type : "N/A"}</p>
      <p>Gym: ${leader.gym ? leader.gym : "N/A"}</p>
      <p>Generation: ${leader.gen ? leader.gen : "N/A"}</p>
    </div>
    <div class="gym-leader-team">
      ${leader.pokemon.map(poke => Pokemon(poke)).join("")}
    </div>
  </div>`;
}

function Pokemon(pokemon) {
  const spriteName = pokemon.toLowerCase().replace(". ", "");
  return `
  <div class="pokemon">
    <img src=https://play.pokemonshowdown.com/sprites/dex/${spriteName}.png />
    <p>${pokemon}</p>
  </div>`
}

async function getData() {
  const URL = "/api/" + document.querySelector(".endpoint-input input").value;
  const res = await fetch(URL);
  const data = await res.json();
  if (data.length === 0) {
    root.innerHTML = "<p>No results found.</p>"
  } else {
    root.innerHTML = `${data.map(leader => GymLeader(leader)).join("")}`
  }
}

async function postData() {
  const fakeLeader = {
    name: "Dom",
    gen: 1,
    gym: 9,
    city: "Tokyo",
    type: "Water",
    badge: "CC17",
    sprite: "https://play.pokemonshowdown.com/sprites/trainers/backpacker.png",
    pokemon: ["Swampert", "Slowbro", "Gyarados"]
  }
  const URL = "/api/leaders";

  const res = await fetch(URL, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(fakeLeader)
  });

  if (res.status === 400) {
    root.innerHTML = '<p>400 Bad Request</p>'
  } else {
    root.innerHTML = 
    `<div>
      <p>Resource Created</p>
      ${JSON.stringify(fakeLeader)}
    <div>`;
  }
}

async function patchData() {
  const newPokemon = { pokemon: ["Starmie", "Feraligatr", "Ludicolo"] }
  const URL = "/api/leaders/dom";

  const res = await fetch(URL, {
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newPokemon)
  });

  if (res.status === 400) {
    root.innerHTML = '<p>400 Bad Request</p>'
  } else {
    root.innerHTML = 
    `<div>
      <p>Resource Updated</p>
      ${JSON.stringify(newPokemon)}
    <div>`;
  }
}


document.querySelector(".endpoint-input input").addEventListener("keyup", (e) => {
  if (e.key === "Enter") renderData();
});

document.querySelector(".get-button").addEventListener("click", getData);
document.querySelector(".post-button").addEventListener("click", postData);
document.querySelector(".patch-button").addEventListener("click", patchData);

getData();