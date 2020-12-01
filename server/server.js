let express = require('express');
const path = require("path");
require('dotenv').config();

let app = express();

app.use(express.static('public'));

app.use(express.urlencoded({extended: true}));
app.use(express.json());

let PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "index.html"));
});

app.listen(PORT, function() {
  console.log(`Server listening on ${PORT}`);
});