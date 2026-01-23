import express from "express";
import { pokemonName } from "/var/static/secrets.js";

const app = express();
const PORT = 8080;

app.get("/", async (req, res) => {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
  );
  const result = await response.json();
  res.type("json").send(result);
});

app.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}`);
});
