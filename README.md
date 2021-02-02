This was created during my time as a student at Code Chrysalis

# Pokemon Gym Leader API

- This is an API to get information about Pokemon Gym Leaders from red/blue to x/y from a postgres database.

- Comes with a simple client side to visualize the data.

- Data and seed are available in their respective folders but there are no migrations so you'll have to setup the database/environment on your own if you wish to use the repo.

### Getting Started
- Clone to your local machine
```
 git clone https://github.com/TokyoDom/gym-leader-api.git
```
- Go to the clone directory and install dependencies
```
npm install
```
- Make sure your environment is setup correctly! The database and table will need to be made beforehand. Environment variables must be defined as well in a .env file. My table schema is below.

`
CREATE TABLE gym_leaders (
	id serial PRIMARY KEY,
	name VARCHAR ( 50 ) UNIQUE NOT NULL,
	gen INT,
	gym INT,
	city VARCHAR ( 50 ),
	type VARCHAR ( 50 ),
	badge VARCHAR ( 50 ),
	sprite VARCHAR ( 255 ),
	pokemon VARCHAR ( 255 )
);
`
- Seed your table with gym leader data
```
npm run seed
```

- Start the server!
```
npm start
```

- Development mode
```
npm run dev
```

### Endpoint Examples

- GET /api/leaders/brock - gets Gym Leader with name Brock.

  ```
  [{
    "name": "Brock",
    "gen": 1,
    "gym": 1,
    "city": "Pewter City",
    "type": "Rock",
    "badge": "Boulder",
    "sprite": "https://play.pokemonshowdown.com/sprites/trainers/brock.png",
    "pokemon": ["Geodude", "Onix"]
  }]
  ```

- GET /api/pokemon/onix/leaders - gets all Gym Leaders that have Onix.
- GET /api/type/rock/leaders - gets all rock type Gym Leaders.
- GET /api/leaders - will return all leaders, can accept a ?limit query to return a set amount of leaders
- POST /api/leaders - creates new record if valid values are passed and returns new record, returns 400 status otherwise
- PATCH /api/leaders/:name - updates record if valid values are passed and returns updated record, returns 400 status otherwise
- DELETE /api/leaders/:name - deletes record if it exists, returns 204
