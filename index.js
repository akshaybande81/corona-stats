
const express = require("express");
const routes = require("./routers");

const app = express();

const port = process.env.PORT || 3000;
app.use(express.json());
app.use(routes);

app.listen(port, () => {
    console.log("listening on port " + port);
})