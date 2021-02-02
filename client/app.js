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
      <p>${leader.city ? leader.city : "N/A"}</p>
      <p>${leader.badge ? leader.badge : "N/A"} Badge</p>
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
  console.log(data);
  return data;
}

async function renderData() {
  const data = await getData();
  const root = document.getElementById("root");
  if (data.length === 0) {
    root.innerHTML = "<p>No results found.</p>"
  } else {
    root.innerHTML = `${data.map(leader => GymLeader(leader)).join("")}`
  }
}


document.querySelector(".endpoint-input input").addEventListener("keyup", (e) => {
  if (e.key === "Enter") renderData();
});

document.querySelector(".btn").addEventListener("click", renderData);

renderData();