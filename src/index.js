const app = require("./app");
require('./database');

const init = async () => {
  await app.listen(3001);
  console.log("Server running on port 3001");
};

init();
