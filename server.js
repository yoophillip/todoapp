const express = require("express");
const app = express();
const path = require("path");

// app.get("/", (req, res) => {
//   res.send("hellooooo");
// });

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./index.html"));
});

app.get("/write", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./write.html"));
});

app.listen(8080, () => {
  console.log("listening on port 8080");
});
