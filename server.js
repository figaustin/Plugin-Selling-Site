const express = require('express');
const app = express();
const port = 8000;
const cors = require("cors");
const cookieParser = require('cookie-parser');

global.__basedir = __dirname;    

require("./server/config/mongoose.config");

app.use(express.json(), express.urlencoded({ extended: true }));
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(cookieParser());


const UserRoutes = require('./server/routes/user.routes');
UserRoutes(app);
const PluginRoutes = require('./server/routes/plugin.routes');
PluginRoutes(app);
const TagRoutes = require('./server/routes/tag.routes');
TagRoutes(app);
const RatingRoutes = require('./server/routes/rating.routes');
RatingRoutes(app);

app.listen(port, () => console.log(`Listening on port: ${port}`));


