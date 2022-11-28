//Imports dependecies being used
const express = require("express");
const cors = require("cors");

//declares an express app
const app = express();

const db = require("./dbUtils/DbConn");

const webUserRoutes = require("./webAPIs/webUserAPI");
app.use("/api", webUserRoutes);

app.get("/", (req, res) => {
  if(db.state === 'disconnected'){
    return respond(null, { status: 'fail', message: 'server down'});
  } else {
    console.log("Homepage");
    res.send("web user crud");
  }

  res.send("Hello from backend");
  
});

app.listen(process.env.PORT || 5000, () => {
  console.log("Listening...");
});