const fastify = require('fastify')({logger: true})
const cors = require("@fastify/cors")
const dotenv = require("dotenv")
const user = require("./src/router/user")
const { host, port } = require("./src/const/config")
const { userlist } = require("./src/controller/db")

dotenv.config()

fastify.register(cors, { 
    origin:"*"
})

fastify.get("/", (req, res) => {
    res.send("Journey Finder Back")
})
fastify.register(user, { prefix : "/user" })

fastify.listen({host: host, port: port }, (err, address) => {
    if (err) throw err
    console.log(`listening to ${address}`)
})