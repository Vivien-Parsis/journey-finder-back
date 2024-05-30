const aiController = require("../controller/ai.controller")

module.exports = (fastify, _, done) => {
    fastify.post("/trip", (req, res) => {
        aiController.createTripFromAi(req, res)
    })
    done()
}