const { mongoose } = require("mongoose")

const clientSchema = new mongoose.Schema({
    lastName: { type: String, required: true },
    firstName: { type: String, required: true },
    email: { type: String, required: true, match:/[a-zA-Z0-9._\-]{1,30}[@][a-zA-Z0-9._\-]{4,12}[.]{1}[a-zA-Z]{2,4}/gm },
    password: { type: String, required: true},
    about: {
        myCountry: { type: String, default: "France" },
        myBudget: { type: String, default: "Normal" },
        visitedCountries: { type: String, default: "Italy" },
        transportationMod: { type: String, default: "Train" },
    },
    destination: {
        type: { type: String, default: "Mountains" },
        continent: { type: String, default: "Europe" },
        climate: { type: String, default: "Tempered" },
        citySize: { type: String, default: "middle;small" },
        activities: { type: String, default: "hiking" },
    }
}, { versionKey: false })

const tripClientSchema = new mongoose.Schema({
    client: { type : mongoose.Schema.Types.ObjectId, require : true },
    trip: { type : Object, require : true },
    createdDate: { type : Date, default: Date }
}, { versionKey: false })

module.exports = { clientSchema, tripClientSchema }