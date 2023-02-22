const express = require("express")
const bodyParser = require("body-parser")

const app = express()

app.use(bodyParser.json({limit: "200mb"}))
app.use(bodyParser.urlencoded({limit: "200mb", extended: true}))

const routes = require('./Routes/Route')
app.use('/', routes)


app.listen(3000, ()=>{
    console.log("3000")
}) 