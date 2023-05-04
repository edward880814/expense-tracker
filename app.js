const express = require("express");
const exphbs = require("express-handlebars");

const router = require("./routes");

//connect database
require("./config/mongoose");
const methodOverride = require("method-override");
const session = require("express-session")
const usePassport = require("./config/passport");
const flash = require("connect-flash");


const PORT = process.env.PORT || 3000

const app = express();

app.engine("hbs", exphbs.engine({
  defaultLayout: "main",
  extname: ".hbs",
  helpers: {
    match: (a,b) => a === b,
  },
})
);

app.set("view engine", "hbs");
app.use(express.static("public"));


//解析這些表單資料，並將其轉換成JavaScript物件
app.use(express.urlencoded({
  extended: true
}));

app.use(methodOverride("_method"));

app.use(
  session({
    secret: 'MY_SECRET',
    resave: false,
    saveUninitialized: true,
  })
);


usePassport(app);
app.use(flash());

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated();
  res.locals.user = req.user;
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg").length
    ? req.flash("error_msg")
    : req.flash("error");
  next();
});

app.use(router);

app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`)
});