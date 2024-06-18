const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require("cors");

const UploadRouter = require('./Src/Routers/FileuploadRouter');
const ExtractRouter = require('./Src/Routers/ExtractFileRouter');
const SignUpRouter = require('./Src/Routers/SignUpRouter');
const LoginRouter = require('./Src/Routers/LoginRouter');



// Creating an Express app
const app = express()

// Enable CORS and serve files from the 'files' directory
app.use(cors());
app.use("/files", express.static("files"));


app.use(express.urlencoded({extended:true}))
app.use(bodyParser())

// CORS headers middleware to handle CORS headers
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader( 
      "Access-Control-Allow-Methods",
      "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    next();
  });




// Using routers for specific paths

app.use('/upload',UploadRouter)
app.use('/extract',ExtractRouter)
app.use('/Signup',SignUpRouter)
app.use('/login',LoginRouter)


// MongoDB connection URL
const mongoDBurl = "mongodb+srv://adithyanbasok:12345@pdf.huhtp9n.mongodb.net/"

// Connecting to MongoDB and starting the server
mongoose.connect(mongoDBurl).then(() => {
    app.listen(4000, () => { console.log("server started at http://localhost:4000"); })
}).catch((error) => {
    console.log(error);
})