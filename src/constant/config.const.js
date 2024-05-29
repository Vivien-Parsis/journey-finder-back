const dotenv = require("dotenv")
dotenv.config()

const db_url = process.env.DB_URL ? process.env.DB_URL : ""
const host = ("RENDER" in process.env || process.env.ISDOCKER=="true") ? `0.0.0.0` : `localhost`
const port = process.env.PORT ? process.env.PORT : 4000
const apiKeyTogether = process.env.API_KEY_TOGETHER ? process.env.API_KEY_TOGETHER : ""

module.exports = {
    host,
    port,
    db_url,
    apiKeyTogether
}