const tripController = require("../controller/trip.controller")

module.exports = (fastify, _, done) => {
    fastify.post("/get/user", (req, res)=> {
        tripController.getUserTrip(req, res)
    })
    fastify.post("/delete", (req, res)=> {
        tripController.deleteUserTrip(req, res)
    })
    done()
} 