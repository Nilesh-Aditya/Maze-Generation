const express = require('express');
const app = express();

app.use(express.static(__dirname));

const PORT = process.env.PORT || 4000;
const server = app.listen(PORT, ()=> console.log('server started on port '+ PORT));

app.get('/', (req, res) => {
    res.sendFile('./index.html');
});

