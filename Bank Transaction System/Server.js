require("dotenv").config();
const app = require("./src/app");
const connectToDB = require("./src/config/db");

connectToDB();

const port = 4000;
const hostname = "127.0.0.1";
app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
