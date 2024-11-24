const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));



/* connect() DataBase  */
const db = require("./models");
db.mongoose
  .connect(db.url, {  })
  .then(() => {
    
    
    console.log("--->-->>OK - DB Connected!");
    console.log("Role.estimatedDocumentCount=")
       console.log(Role.estimatedDocumentCount)
    
  })
  .catch(err => {
    console.log("Err! \n Cannot connect to the database!", err);
    process.exit();
  });


  require("./routes/user.routes")(app);




// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});





// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
