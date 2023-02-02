const app = require('express')()
const consign = require('consign')

consign()
    .then('/src/config/middlewares.js')
    .into(app)

app.listen(4000, () => {
    console.log("Back-end Executando na porta 4000");
})