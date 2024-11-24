const express = require("express");
const cors = require("cors");
const dbConfig = require("./app/config/db.config");

const app = express();


var corsOptions = { origin: "http://localhost:8080"};
app.use(cors(corsOptions));


// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({
  extended: true
}));

const db = require("./app/models");
const Role = db.role;
console.log(Role)
console.log("Role")



db.mongoose
.connect('mongodb+srv://alex:alex@cluster0.zyelpcb.mongodb.net/authBez', {

  // .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("Successfully connect to MongoDB.");
  initial();
})
.catch(err => {
  console.error("Connection error", err);
  process.exit();
});

// simple route
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to bezkoder application."
  });
});

// routes
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is on port ${PORT}.`);
});





async function initial () {
  console.log("\n\n initial")

  try {
    const count = await Role.estimatedDocumentCount();
    console.log('count = ', count)
    if (!count) {
      console.log('\n   создание Ролей\n')
      const admin = new Role( {
        value: 'ADMIN'
      })
      await admin.save()
      const owner = new Role( {
        value: 'OWNER'
      })
      await owner.save()
      const renter = new Role( {
        value: 'RENTER'
      })
      await renter.save()
      console.log('\n    РолI срздана=\n')
    }
  }
  catch (e) {
    console.log("\n\neerror initial =\n", e)
  }
}