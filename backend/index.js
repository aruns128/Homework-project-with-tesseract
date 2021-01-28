const express = require("express");
// Import Body parser
var bodyParser = require("body-parser");
const handwritten = require("handwritten.js");
const fs = require("fs");
// create express app
const app = express();
var cors = require("cors");

app.use(cors());

// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(bodyParser.json());

//To perform validations
// var expressValidator = require("express-validator");
// app.use(expressValidator());
// define a simple route
app.post("/output", (req, res) => {
  // res.json({
  //   message: "Welcome to Chat App"
  // });
  console.log("req...........", req.body);

  handwritten(req.body.text).then(async converted => {
    // console.log("converted", converted);
    await converted.pipe(fs.createWriteStream("samplecheck.pdf"));
    // res.send( converted );
    // res.download('./output.pdf', 'sivasakthi.pdf')
    var data = fs.readFile("./samplecheck.pdf", "base64", data => {
      console.log("blob data",data);
      res.send(data);
    });
    // fs.writeFileSync('./some.pdf', data)
    // res.contentType("application/pdf");
    // res.download('./samplecheck.pdf', 'samplecheck.pdf');
  });
});

// listen for requests
const server = app.listen(4000, () => {
  console.log("Server is listening on port 4000");
});
