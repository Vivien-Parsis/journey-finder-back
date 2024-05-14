const crypto = require("node:crypto")
const { clientModel, tripClientModel } = require("../config/db")
const { default: mongoose } = require("mongoose")
const { isValidEmail } = require("../controller/validator")

const signUp = (req, res) => {
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
    clientModel.find({ email: currentUser.email }).then(users => {
        if (users.length != 0) {
            return res.send({ message : "already exist" })
        }
        clientModel.insertMany([currentUser]).then(data => {
                return res.send(data)
            }
        )
    })
}

const signIn = (req, res) => {
    const currentUser = {
        email: req.body.email ? req.body.email : "",
        password: req.body.password ? crypto.createHash('sha256').update(req.body.password).digest("base64") : ""
    }
    if (currentUser.email.trim() == "" || currentUser.password.trim() == "") {
        return res.send({ message : "incorrect format user" })
    }
    clientModel.findOne({ email: currentUser.email, password: currentUser.password }).then(data => {
        console.log(data)
        if (!data) {    
            return res.send({ message : "user not found" })
        }
        return res.send(data)
    })
}

const deleteUser = (req, res) => {
    const currentUser = {
        email: req.body.email ? req.body.email : "",
        password: req.body.password ? crypto.createHash('sha256').update(req.body.password).digest("base64") : ""
    }
    if (currentUser.email.trim() == "" || currentUser.password.trim() == "") {
        return res.send({ message: "incorrect format user" })
    }
    clientModel.find({email:currentUser.email,password:currentUser.password}).then(data => {
        if(data.length==0){
            return res.send({ message : "user not found" })
        }
        clientModel.deleteOne({email:currentUser.email,password:currentUser.password}).then(data => {
            return res.send({ message : "user deleted" })
        })
    })
}

const getUser = (req, res) => {
    const id = req.params.id ? req.params.id : ""
    if(!mongoose.isValidObjectId(id) && id.trim()!=""){
        return res.send({message:"invalid id format"})
    }
    clientModel.find(id ? {_id:id} : {}).then(data => {
            return res.send(data)
        }
    )
}

const getUserTrip = (req, res) => {
    const currentUser = {
        email: req.body.email ? req.body.email : "",
        password: req.body.password ? crypto.createHash('sha256').update(req.body.password).digest("base64") : ""
    }
    if (currentUser.email.trim() == "" || currentUser.password.trim() == "") {
        return res.send({ message: "incorrect format user" })
    }
    clientModel.find({email:currentUser.email,password:currentUser.password}).then(data => {
        if(data.length==0){
            return res.send({ message : "user not found" })
        }
        console.log(data[0].id)
        tripClientModel.find({client:data[0].id}).then(trip => {
            if(trip.length==0){
                return res.send({ message : "no trip found" })
            }
            return res.send(trip)
        })
    })
}

const forgetPassword = (req, res) => {
    const body = req.body
    res.send("/forgetpswd")
}

module.exports = { signIn, signUp, deleteUser, forgetPassword, getUser, getUserTrip }