const express = require("express");
const exphbs = require("express-handlebars");

const router = require("./routes");
const PORT = process.env.PORT || 3000

const app = express();

app.engine("hbs", exphbs.engine({ defaultLayout: "main", extname: ".hbs" }));
app.set("view engine", "hbs");

app.use(router);

app.listen(PORT, () => console.log(`Server is listening on http://localhost:${PORT}`));