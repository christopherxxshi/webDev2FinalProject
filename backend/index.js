"use strict";
const express = require('express');
const PORT = process.env.PORT || 3001;
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const configRouters = require("./routes");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/../client/dist`));

configRouters(app);

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}!`);
});