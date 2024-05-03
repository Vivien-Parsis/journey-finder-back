const { default: mongoose } = require("mongoose");
const { db_url } = require("./../const/config")

mongoose.connect(db_url)
        .then(() => console.log('Connecté avec succès à MongoDB'))
        .catch((err) => console.error('Erreur lors de la connexion à MongoDB :', err));

const userlist = mongoose.model('userlist',{
    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    photo: String,
    motDePasse: { type: String, required: true }
})
module.exports = { userlist }