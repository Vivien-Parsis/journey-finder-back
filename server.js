const dotenv = require("dotenv")
const { host, port, logger, rateLimit, cors } = require("./src/constant/config.const")

const fastify = require('fastify')(logger)

dotenv.config()
fastify.register(require("@fastify/cors"), cors)
fastify.register(require("@fastify/rate-limit"), rateLimit)

fastify.get("/", (req, res) => {
    res.send("Journey Finder Back")
})

fastify.register(require("./src/router/user.routing"), { prefix : "/user" })
fastify.register(require("./src/router/ai.routing"), { prefix : "/ai" })

fastify.listen({host: host, port: port }, (err, address) => {
    if (err) throw err
})