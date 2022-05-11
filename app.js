const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("KCOMA Remote Book Club");
});

console.log(`Server listening on localhost:${port}`);
app.listen(port);
