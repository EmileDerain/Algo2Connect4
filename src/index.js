const http = require('http');
const express = require('express')
const app = express()
const port=8000

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/emile/',(req,res)=>{
    res.send("emile ca marche")
})

app.listen(port, () => {
    console.log("Server is listening on port 8000");
});
