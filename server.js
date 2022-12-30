const express = require('express');
const app = express();
const port = 8000;
const cors = require("cors");
    

require("./server/config/mongoose.config");

app.use(express.json(), express.urlencoded({ extended: true }));
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));

app.listen(port, () => console.log(`Listening on port: ${port}`) );