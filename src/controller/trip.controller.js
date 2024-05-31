const crypto = require("node:crypto")
const { clientModel, tripClientModel } = require("../database/model.db")

const getUserTrip = (req, res) => {
    const currentUser = {
        email: req.body.email ? req.body.email : "",
        password: req.body.password ? crypto.createHash('sha256').update(req.body.password).digest("base64") : ""
    }
    if (currentUser.email.trim() == "" || currentUser.password.trim() == "") {
        return res.send({ message: "missing email or/and password" })
    }
    clientModel.findOne({email:currentUser.email,password:currentUser.password}).then(client => {
        if(!client){
            return res.send({ message : "user not found" })
        }
        tripClientModel.find({client:client.id}).then(trip => {
            if(trip.length==0){
                return res.send({ message : "no trip found" })
            }
            return res.send(trip)
        })
    })
}

const deleteUserTrip = (req, res) => {
    const currentUser = {
        email: req.body.email ? req.body.email : "",
        password: req.body.password ? crypto.createHash('sha256').update(req.body.password).digest("base64") : "",
        tripId : req.body.tripId ? req.body.tripId : "",
    }
    if (currentUser.email.trim() == "" || currentUser.password.trim() == "" || currentUser.tripId.trim() == "") {
        return res.send({ message: "missing email or/and password or/and tripId" })
    }
    clientModel.findOne({email:currentUser.email,password:currentUser.password}).then(client => {
        if(!client){
            return res.send({ message : "user not found" })
        }
        tripClientModel.findOne({_id:currentUser.tripId}).then(trip => {
            if(!trip){
                return res.send({ message : "no trip found" })
            }
            if(trip.clientId != client.id){
                return res.send({ message : "is trip it not yours" })
            }
            tripClientModel.deleteOne({_id:currentUser.tripId}).then(()=>{
                return res.send({ message : "trip deleted" })
            })
        })
    })
}

module.exports = { 
    getUserTrip,
    deleteUserTrip
}