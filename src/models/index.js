const express = require("express");
const bodyParser = require("body-parser");
const CryptoJS = require("crypto-js");
const bodyParserErrorHandler = require("express-body-parser-error-handler");
const path = require("path");
require("../db/conn");
const Sch = require("../db/sch");
const app = express();
const port = process.env.PORT || 3000;

const pat = path.join(path.join(__dirname, "../public"));
// console.log(pat);
const viewpat = path.join(path.join(__dirname, "../views"));

//to show the json format data
app.use(express.json());
//to get the form data
app.use(express.urlencoded({ extended: false }));
//middleware to get the form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(pat));
app.set("view engine", "hbs");
app.set("views", viewpat);

app.get("/", (req, res) => {
  res.render("index");
});
app.get("/register", (req, res) => {
  res.render("register");
});
app.get("/login", (req, res) => {
  res.render("login");
});
//add data on database
app.post("/register", async (req, res) => {
  try {
    //console.log(req.body.username)
    //    res.send(req.body.username)
    const password = req.body.password;
   // const hash = CryptoJS.SHA1(password);
   // const result = CryptoJS.enc.Hex.stringify(hash);
    // console.log(result);
    const confirmpassword = req.body.confirmpassword;
    //const hash2 = CryptoJS.SHA1(confirmpassword);
    //const result2 = CryptoJS.enc.Hex.stringify(hash2);
    // console.log(result2);
    if (password == confirmpassword) {
      const registerdata = new Sch({
        username: req.body.username,
        mobno: req.body.mobno,
        password: password,
        confirmpassword: confirmpassword,
      });
      console.log(registerdata);
      try{const registered = await registerdata.save();
      }catch(e){
        console.log(e)
      }
            res.status(201).json({ data: registered });
    } else {
      res.send("password and confirm password does not match");
    }
  } catch (error) {
    res.status(400);
    res.send(error);
  }
});

//for log in password
app.post("/login", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const use = await Sch.findOne({ username: username });
  if (use.password === password) {
    res.status(201).send("you have entered in data base");
  } else {
    res.status(400).send("opps something went wrong");
  }
});

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
