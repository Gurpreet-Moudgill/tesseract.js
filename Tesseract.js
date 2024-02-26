const {createWorker} = require("tesseract.js");
const express = require("express")
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const cors = require("cors");

const app = express();
const port = 5000;
app.use(cors())

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/'); // specify the upload directory
    },
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, file.fieldname + '-' + uniqueSuffix + ext);
    },
  });

const upload = multer({ storage: storage });

app.get('/api/health', async (req, res) => {
    res.json({
      success: true,
      message: 'Server is healthy',
    })
  })

app.post("/api/OCR", upload.single('image'), async(req, res)=>{

    const file = req.file;

    if (!file) {
        return res.status(400).send('No file uploaded.');
    }
    const imagePath = path.join(__dirname, file.path);

    const worker = await createWorker('eng');
    const ret = await worker.recognize(imagePath);
    console.log(ret.data.text);
    await worker.terminate();
    res.json({
        success: true,
        message: 'Server is healthy',
        data: ret.data.text
    })
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });