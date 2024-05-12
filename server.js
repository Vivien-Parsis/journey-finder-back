const fastify = require('fastify')({logger: true})
const dotenv = require("dotenv")
const { host, port } = require("./src/const/config")

dotenv.config()

fastify.register(require("@fastify/cors"), { 
    origin:"*"
})
fastify.register(require("@fastify/rate-limit"), {
    max: 10,
    timeWindow: 60000
})

fastify.get("/", (req, res) => {
    res.send("Journey Finder Back")
})

fastify.register(require("./src/router/user"), { prefix : "/user" })
fastify.register(require("./src/router/ai"), { prefix : "/ai" })

fastify.listen({host: host, port: port }, (err, address) => {
    if (err) throw err
    console.log(`listening to ${address}`)
})