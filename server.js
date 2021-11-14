const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
const MongoClient = require("mongodb").MongoClient;
let db;
app.set("view engine", "ejs");
MongoClient.connect(
  "mongodb+srv://pyoo:12345@cluster0.341jx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  (err, client) => {
    if (err) {
      return console.log(err);
    }
    db = client.db("todoapp");

    // db.collection("post").insertOne(
    //   { name: "phillip", age: 25 },
    //   (err, result) => {
    //     console.log("done");
    //   }
    // );
    app.listen(8080, () => {
      console.log("listening on port 8080");
    });
  }
);
// app.get("/", (req, res) => {
//   res.send("hellooooo");
// });

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./index.html"));
});

app.get("/write", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./write.html"));
});

app.post("/add", (req, res) => {
  res.send("done");
  db.collection("counter").findOne(
    { name: "totalCount" },
    function (err, result) {
      console.log(result.totalPost);
      let totalPost = result.totalPost;
      db.collection("post").insertOne(
        {
          _id: totalPost + 1,
          title: req.body.title,
          date: req.body.date,
        },
        (err, result) => {
          console.log("data saved");
          db.collection("counter").updateOne(
            { name: "totalCount" },
            { $inc: { totalPost: 1 } },
            function (err, result) {
              if (err) {
                return console.log(err);
              }
            }
          );
        }
      );
    }
  );
});

app.get("/list", (req, res) => {
  db.collection("post")
    .find()
    .toArray(function (err, result) {
      console.log(result);
      res.render("list.ejs", { posts: result });
    });
});
