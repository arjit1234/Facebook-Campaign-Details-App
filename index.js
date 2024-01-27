const express = require('express');
const router = require('./routes/api.js')
// import router from './routes/api.js'
// const auth = require("./routes/auth")
const app = express()
const port = 4000

app.set('views','views')
app.set('view engine','ejs')
app.get('/', (req, res) => {
  res.render('home');
});

app.use("/api/",router);
app.use("/",require("./routes/auth.js"))

app.listen(port, () => {
  console.log(`Facebook Campaign Details App listening on port ${port}`)
})