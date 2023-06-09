const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const { subscribe } = require("diagnostics_channel");
const https = require("https");

const app = express();

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", (req, res) => {
  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;

  var data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        },
      },
    ],
  };

  var jsonData = JSON.stringify(data);

  const url = "https://us21.api.mailchimp.com/3.0/lists/0b54840401";

  const options = {
    method: "POST",
    auth: "navaneeth:6d32845fc89589235feb5b6b1d603c28-us21",
  };

  const request = https.request(url, options, (response) => {
    if (response.statusCode === 200) {
      res.sendFile(__dirname + "/intro.html");
    } else {
      res.sendFile(__dirname + "/failure.html");
    }
  });

  request.write(jsonData);
  request.end();
});

app.post("/failure", (req, res) => {
  res.redirect("/");
});

app.post("/rent", (req, res) => {
  res.sendFile(__dirname + "/success.html");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

// 6d32845fc89589235feb5b6b1d603c28-us21

//au-0b54840401
