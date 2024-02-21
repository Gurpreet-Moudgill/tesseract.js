const {createWorker} = require("tesseract.js");
const express = require("express")
const app = express();
const port = 5000;


app.get('/api/health', async (req, res) => {
    res.json({
      success: true,
      message: 'Server is healthy',
    })
  })

app.post("/api/OCR", async(req, res)=>{
    const worker = await createWorker('eng');
    const ret = await worker.recognize('./1333.jpg');
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