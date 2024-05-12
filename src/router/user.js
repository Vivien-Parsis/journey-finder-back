const crypto = require("node:crypto")
const { userlist } = require("../config/db")
const { default: mongoose } = require("mongoose")
const { isValidEmail } = require("../controller/validator")

module.exports = (fastify, _, done) => {
    fastify.get("/:id?", (req, res)=>{
        const id = req.params.id ? req.params.id : ""
        if(!mongoose.isValidObjectId(id) && id.trim()!=""){
            return res.send({message:"invalid id format"})
        }
        userlist.find(id ? {_id:id} : {}).then(data => {
                return res.send(data)
            }
        )
    })

    fastify.post("/signup", (req, res) => {
        const currentUser = {
            firstName : req.body.firstName ? req.body.firstName : "",
            lastName : req.body.lastName ? req.body.lastName : "",
            email : req.body.email ? req.body.email : "",
            password : req.body.password ? crypto.createHash('sha256').update(req.body.password).digest("base64") : ""
        }
        if (currentUser.email.trim() == "" || currentUser.password.trim() == "" || currentUser.firstName.trim() == "" || currentUser.lastName.trim() == "") {
            return res.send({ message: "incorrect format user" })
        }
        if(!isValidEmail(currentUser.email)){
            return res.send({message:"invalid email format"})
        }
        userlist.find({ email: currentUser.email }).then(users => {
            if (users.length == 0) {
                userlist.insertMany([currentUser]).then(data => {
                        return res.send(data)
                    }
                )
            } else {
                return res.send({ message : "already exist" })
            }
        })
    })

    fastify.post("/signin", (req, res) => {
        const currentUser = {
            email: req.body.email ? req.body.email : "",
            password: req.body.password ? crypto.createHash('sha256').update(req.body.password).digest("base64") : ""
        }
        if (currentUser.email.trim() == "" || currentUser.password.trim() == "") {
            return res.send({ message : "incorrect format user" })
        }
        userlist.findOne({ email: currentUser.email, motDePasse: currentUser.password }).then(data => {
            if (!data) {    
                return res.send({ message : "user not found" })
            }
            return res.send(data)
        })
    })

    fastify.post("/signout", (req, res) => {
        const currentUser = {
            email: req.body.email ? req.body.email : "",
            password: req.body.password ? crypto.createHash('sha256').update(req.body.password).digest("base64") : ""
        }
        if (currentUser.email.trim() == "" || currentUser.password.trim() == "") {
            return res.send({ message: "incorrect format user" })
        }
        userlist.find({email:currentUser.email,password:currentUser.password}).then(data => {
            if(data.length==0){
                return res.send({ message : "user not found" })
            }
            userlist.deleteOne({email:currentUser.email,password:currentUser.password}).then(data => {
                return res.send({ message : "user deleted" })
            })
        })
        
    })

    fastify.post("/forgetpswd", (req, res) => {
        const body = req.body
        res.send("/forgetpswd")
    })

    done()
} 