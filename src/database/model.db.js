const { default: mongoose } = require("mongoose")
const { db_url } = require("../constant/config.const")
const { clientSchema, tripClientSchema } = require("./schema.db")

mongoose.connect(db_url)
        .then(() => console.log('Connecté avec succès à MongoDB'))
        .catch((err) => console.error('Erreur lors de la connexion à MongoDB :', err));

const clientModel = mongoose.model("client",clientSchema,"client")

const tripClientModel = mongoose.model("tripclient",tripClientSchema,"tripclient")

module.exports = { clientModel, tripClientModel }