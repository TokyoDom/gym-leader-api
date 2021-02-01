const path = require("path");
const routes = require("./routes");
const express = require('express');
const app = express();

app.use(express.json());
app.use("/api", routes);

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "index.html"));
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});