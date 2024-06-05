const dotenv = require("dotenv")
dotenv.config()

const db_url = process.env.DB_URL ? process.env.DB_URL : ""

const host = ("RENDER" in process.env || process.env.ISDOCKER=="true") ? `0.0.0.0` : `localhost`

const port = process.env.PORT ? process.env.PORT : 4000

const apiKeyTogether = process.env.API_KEY_TOGETHER ? process.env.API_KEY_TOGETHER : ""

const logger = {
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
    }
}

const cors = { 
    origin:"*"
}

const rateLimit = {
    max: 10,
    timeWindow: 60000
}

module.exports = {
    host,
    port,
    cors,
    db_url,
    logger,
    rateLimit,
    apiKeyTogether,
}