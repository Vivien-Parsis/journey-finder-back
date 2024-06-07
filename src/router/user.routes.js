const userController = require("../controller/user.controller")

module.exports = (fastify, _, done) => {
    //fastify.get("/get/:id?", (req, res)=>{
    //    userController.getUser(req, res)
    //})

    fastify.post("/sign-up", (req, res) => {
        userController.signUp(req, res)
    })

    fastify.post("/sign-in", (req, res) => {
        userController.signIn(req, res)
    })

    fastify.post("/delete", (req, res) => {
        userController.deleteUser(req, res)
    })

    fastify.post("/forget-password", (req, res) => {
        userController.forgetPassword(req, res)
    })

    fastify.post("/new-password", (req, res) => {
        userController.newPassword(req, res)
    })

    fastify.post("/new-preference", (req, res) => {
        userController.newPreference(req, res)
    })

    done()
} 