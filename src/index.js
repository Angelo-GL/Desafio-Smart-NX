const app = require('express')()
const consign = require('consign')
const bodyParser = require('body-parser')
const routes = require('./config/routes')
require('./database')


app.use(bodyParser.json())
app.use(routes)


app.listen(4000, () => {
    console.log("Back-end Executando na porta 4000");
})