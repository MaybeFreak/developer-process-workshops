const app = require("./src/server.js");
const port = 4000;

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
