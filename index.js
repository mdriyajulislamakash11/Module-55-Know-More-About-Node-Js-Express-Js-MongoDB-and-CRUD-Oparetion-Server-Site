const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 5000;
const app = express();

// MiddleWare
app.use(cors())
app.use(express.json())



app.get("/", (rec, res) => {
    rex.send("Server is running")
});



app.listen(port, () => {
    console.log(`CURD id running Port: ${port}`)
})

