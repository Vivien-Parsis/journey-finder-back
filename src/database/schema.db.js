const { mongoose } = require("mongoose");

const clientSchema = new mongoose.Schema({
    lastName: { type: String, required: true },
    firstName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true }
})

const tripClientSchema = new mongoose.Schema({
    client : { type : mongoose.Schema.Types.ObjectId, require : true},
    trip : { type : Object, require : true },
    createdDate : { type : Date, default: Date }
})

module.exports = { clientSchema, tripClientSchema }