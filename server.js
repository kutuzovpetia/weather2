const express = require('express');
const path = require('path')
const app = express();

const _PORT = process.env.PORT || 8000;
app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.urlencoded({extended: true}));


app.use('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})


app.listen(_PORT, ()=>{
    console.log(`Sevrver started on ${_PORT}`);
});