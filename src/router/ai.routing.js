const { createTripFromAi } = require("../controller/ai.controller")

module.exports = (fastify, _, done) => {
    fastify.post("/trip", (req, res) => {
        createTripFromAi(req, res)
    })
    done()
} 