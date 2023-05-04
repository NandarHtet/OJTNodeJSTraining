import express from "express";
import fileUpload from "express-fileupload";
import path from 'path';


const app = express();
app.use(express.json());
app.set('view engine','ejs');

app.use(fileUpload({
  limits: {
      fileSize: 1024 * 1024 // 1 MB
  },
  abortOnLimit: true
}));

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/upload", (req, res) => {
  if (!req.files) {
    return res.status(400).send("No files were uploaded.");
  }

  const file = req.files.myFile;
  const path = `images/${file.name}`;
  
  file.mv(path, (err) => {
    if (err) {
      return res.status(500).send(err);
    }
    return res.send({ status: "success", path: path });
  });
});

app.listen(3000,()=>console.log("Server is running at port 3000"));