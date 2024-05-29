const { mongoose } = require("mongoose")

const clientSchema = new mongoose.Schema({
    lastName: { type: String, required: true },
    firstName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    about : {
        myCountry:{ type: String, default: "France"},
        myBudget:{ type: String, default: "Normal"},
        visitedCountries:{ type: String, default: "Italy"},
        transportationMod:{ type: String, default: "Train"},
    }
})

const tripClientSchema = new mongoose.Schema({
    client : { type : mongoose.Schema.Types.ObjectId, require : true},
    trip : { type : Object, require : true },
    createdDate : { type : Date, default: Date }
})

module.exports = { clientSchema, tripClientSchema }