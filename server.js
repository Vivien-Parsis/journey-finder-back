const dotenv = require("dotenv")
const { host, port } = require("./src/constant/config.const")

const fastify = require('fastify')({
    logger: {
        transport: {
            target: "@fastify/one-line-logger", 
            colors: {
                31: "yellow",
                32: "magenta"
            },
            options: {
                colorize: true,
            }
        },
        customLevels: {
            db: 31,
            ai: 32,
        },
    }})

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

fastify.register(require("./src/router/user.routing"), { prefix : "/user" })
fastify.register(require("./src/router/ai.routing"), { prefix : "/ai" })

fastify.listen({host: host, port: port }, (err, address) => {
    if (err) throw err
})