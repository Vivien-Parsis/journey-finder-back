const fastify = require('fastify')({logger: true})
const cors = require("@fastify/cors")
const dotenv = require("dotenv")
const user = require("./src/router/user")

dotenv.config()

fastify.register(cors, { 
    origin:"*"
})

fastify.get("/", (req, res) => {
    res.send("Journey Finder Back")
})
fastify.register(user, { prefix : "/user" })

const host = ("RENDER" in process.env) ? `0.0.0.0` : `localhost`
const port = process.env.PORT || 3000

fastify.listen({host: host, port: port }, (err, address) => {
    if (err) throw err
    console.log(`listening to ${address}`)
})