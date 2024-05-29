const crypto = require("node:crypto")
const { clientModel, tripClientModel } = require("../database/model.db")
const { default: mongoose } = require("mongoose")
const { isValidEmail, isValidPassword } = require("../tools/validator")

const signUp = (req, res) => {
    const currentUser = {
        firstName : req.body.firstName ? req.body.firstName : "",
        lastName : req.body.lastName ? req.body.lastName : "",
        email : req.body.email ? req.body.email : "",
        password : req.body.password ? crypto.createHash('sha256').update(req.body.password).digest("base64") : "",
        about : {}
    }
    if (currentUser.email.trim() == "" || currentUser.password.trim() == "" || currentUser.firstName.trim() == "" || currentUser.lastName.trim() == "") {
        return res.send({ message: "incorrect format user" })
    }
    if(!isValidEmail(currentUser.email)){
        return res.send({message:"invalid email format"})
    }
    if(!isValidPassword(req.body.password)){
        return res.send({message:"invalid password format. Password must containt a least one number, one capital letter and one lowercase letter"})
    }
    if(req.body.about.myCountry){
        currentUser.about.myCountry = req.body.about.myCountry
    }
    if(req.body.about.myBudget){
        currentUser.about.myBudget = req.body.about.myBudget
    }
    if(req.body.about.visitedCountries){
        currentUser.about.visitedCountries = req.body.about.visitedCountries
    }
    if(req.body.about.transportationMod){
        currentUser.about.transportationMod = req.body.about.transportationMod
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
        tripClientModel.find({client:data[0].id}).then(trip => {
            if(trip.length==0){
                return res.send({ message : "no trip found" })
            }
            return res.send(trip)
        })
    })
}

const newPassword = (req, res) => {
    const currentUser = {
        email: req.body.email ? req.body.email : "",
        password: req.body.password ? crypto.createHash('sha256').update(req.body.password).digest("base64") : "",
        newPassword: req.body.newPassword ? crypto.createHash('sha256').update(req.body.newPassword).digest("base64") : "",
    }
    if (currentUser.email.trim() == "" || currentUser.password.trim() == "" || currentUser.newPassword.trim() == "") {
        return res.send({ message: "incorrect format user" })
    }
    if(currentUser.newPassword==currentUser.password){
        return res.send({ message: "must put a new password" })
    }
    if(!isValidPassword(req.body.newPassword)){
        return res.send({message:"invalid password format. Password must containt a least one number, one capital letter and one lowercase letter"})
    }
    clientModel.find({email:currentUser.email,password:currentUser.password}).then(data => {
        if(data.length==0){
            return res.send({ message : "user not found" })
        }
        clientModel.findOneAndUpdate({email:currentUser.email,password:currentUser.password},{password:currentUser.newPassword},{new:true}).then(response=>{
            return res.send(response)
        })
    })
}

const newAbout = (req, res) => {
    const currentUser = {
        email: req.body.email ? req.body.email : "",
        password: req.body.password ? crypto.createHash('sha256').update(req.body.password).digest("base64") : "",
        about : {}
    }
    if (currentUser.email.trim() == "" || currentUser.password.trim() == "") {
        return res.send({ message: "incorrect format user" })
    }
    if(req.body.about.myCountry){
        currentUser.about.myCountry = req.body.about.myCountry
    }
    if(req.body.about.myBudget){
        currentUser.about.myBudget = req.body.about.myBudget
    }
    if(req.body.about.visitedCountries){
        currentUser.about.visitedCountries = req.body.about.visitedCountries
    }
    if(req.body.about.transportationMod){
        currentUser.about.transportationMod = req.body.about.transportationMod
    }
    clientModel.find({email:currentUser.email,password:currentUser.password}).then(data => {
        if(data.length==0){
            return res.send({ message : "user not found" })
        }
        clientModel.findOneAndUpdate({email:currentUser.email,password:currentUser.password},{about : currentUser.about},{new:true}).then(response=>{
            console.log(response)
            return res.send(response)
        })
    })
}

const forgetPassword = (req, res) => {
    const body = req.body
    res.send("/forgetpswd")
}

module.exports = { 
    signIn,
    signUp,
    deleteUser,
    forgetPassword,
    getUser,
    getUserTrip,
    newPassword,
    newAbout
}