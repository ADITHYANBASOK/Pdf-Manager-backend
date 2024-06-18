const express = require('express')
const UploadModel = require('../Models/FileuploadModel')
const multer = require("multer");




const UploadRouter = express.Router()

// Configuring multer for file upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      // Specify the destination directory for storing uploaded files
      cb(null, "./files");
    },
    filename: function (req, file, cb) {
      // Generate a unique filename using the current timestamp and the original filename
      const uniqueSuffix = Date.now();
      cb(null, uniqueSuffix + file.originalname);
    },
  });


  const upload = multer({ storage: storage });  // Configuring multer with the specified storage options



UploadRouter.post("/upload-files/:token/:id", upload.single("file"), async (req, res) => {
    console.log(req.file);
    const title = req.body.title;
    const fileName = req.file.filename;
    const token=req.params.token;
    const loginid=req.params.id;
    try {
      await UploadModel.create({ title: title, pdf: fileName,loginid:loginid,token:token });
      res.send({ status: "ok" });
    } catch (error) {
      res.json({ status: error });
    }
  });

  UploadRouter.get("/get-files/:token", async (req, res) => {
    try {
        UploadModel.find({token:req.params.token}).then((data) => {
        res.send({ status: "ok", data: data });
      });
    } catch (error) {}
  });


  UploadRouter.get("/get-Allfiles/:id", async (req, res) => {
    try {
        UploadModel.find({loginid:req.params.id}).then((data) => {
        res.send({ status: "ok", data: data });
      });
    } catch (error) {}
  });












module.exports = UploadRouter