const { default: mongoose } = require("mongoose");
const { db_url } = require("../const/config")

mongoose.connect(db_url)
        .then(() => console.log('Connecté avec succès à MongoDB'))
        .catch((err) => console.error('Erreur lors de la connexion à MongoDB :', err));

const clientSchema = new mongoose.Schema({
    lastName: { type: String, required: true },
    firstName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true }
})

const clientModel = mongoose.model("client",clientSchema,"client")

const tripClientSchema = new mongoose.Schema({
    client : { type : mongoose.Schema.Types.ObjectId, require : true},
    trip : { type : Object, require : true },
    createdDate : { type : Date, default: Date }
})

const tripClientModel = mongoose.model("tripclient",tripClientSchema,"tripclient")

module.exports = { clientModel, tripClientModel }