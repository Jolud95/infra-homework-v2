import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.type("text").send("hello world");
});

app.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}`);
});
