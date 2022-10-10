//Imports dependecies being used
const express = require("express");
const cors = require("cors");


//declares an express app
const app = express();
app.use(cors());
 
//web user routing
const webUserRoutes = require("./webAPIs/webUserAPI")
app.use("/api/webUser", webUserRoutes)


app.get("/", (req, res) => {
  res.send("Homepage");
});


app.listen(process.env.PORT || 5050, () => {
  console.log("Listening...");
});
