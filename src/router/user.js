const { getUser, signUp, signIn, deleteUser, forgetPassword, getUserTrip } = require("../controller/user")

module.exports = (fastify, _, done) => {
    // fastify.get("/get/:id?", (req, res)=>{
    //     getUser(req, res)
    // })

    fastify.post("/sign-up", (req, res) => {
        signUp(req, res)
    })

    fastify.post("/sign-in", (req, res) => {
        signIn(req, res)
    })

    fastify.post("/delete", (req, res) => {
        deleteUser(req, res)
    })

    fastify.post("/forget-password", (req, res) => {
        forgetPassword(req, res)
    })

    fastify.post("/trip", (req, res)=> {
        getUserTrip(req, res)
    })

    done()
} 