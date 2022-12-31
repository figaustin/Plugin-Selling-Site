const express = require('express');
const app = express();
const port = 8000;
const cors = require("cors");
const cookieParser = require('cookie-parser')
    

require("./server/config/mongoose.config");

app.use(express.json(), express.urlencoded({ extended: true }));
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(cookieParser());

const UserRoutes = require('./server/routes/user.routes')
UserRoutes(app);
const PluginRoutes = require('./server/routes/plugin.routes')
PluginRoutes(app)

app.listen(port, () => console.log(`Listening on port: ${port}`) );


