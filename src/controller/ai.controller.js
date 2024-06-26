const crypto = require("node:crypto")
const { aiModel, tripSystemPrompt, AIClient } = require("../constant/ai.const")
const { tripClientModel, clientModel } = require("../database/model.db")
const { parseJsonAiOutput } = require("../tools/parse")

const createTripFromAi = (req, res) => {
    const currentUser = {
        email: req.body.email ? req.body.email : "",
        password: req.body.password ? crypto.createHash('sha256').update(req.body.password).digest("base64") : ""
    }
    if (currentUser.email.trim() == "" || currentUser.password.trim() == "") {
        return res.send({ message : "incorrect format user" })
    }
    clientModel.findOne({ email: currentUser.email, password: currentUser.password }).then(client => {
        if (!client) {    
            return res.send({ message : "user not found" })
        }
        currentUser.about = client.about
        currentUser.destination = client.destination
        currentUser.clientId = client.id

        const userPrompt = `about user:${currentUser.about};destination:${currentUser.destination}`

        createAiResponse(tripSystemPrompt, userPrompt).then(data => {
            if(!data.choices[0].message){
                return res.send({message:"error on AI API Call"})
            }
            try{
                const answer = JSON.parse(parseJsonAiOutput(data.choices[0].message.content))
                req.log.ai("success")
                req.log.ai(`prompt tokens:${data.usage.prompt_tokens} | completion tokens:${data.usage.completion_tokens} | total tokens:${data.usage.total_tokens}`);
                tripClientModel.insertMany([{client:currentUser.clientId, trip:answer}]).then(()=>{
                    req.log.db("inserted successfully trip to database")
                    res.type('application/json')
                    return res.send(answer)
                })
            }catch(err){
                console.log(err)
                return res.send({message:"AI json error"})
            } 
        })
    })
}

module.exports = { createTripFromAi }

const createAiResponse = (systemPrompt, userPrompt) => {
    const message = [
        {
            "role": "system",
            "content": systemPrompt
        },{
            "role": "user",
            "content": userPrompt
        }
    ]
    return AIClient.chat.completions.create({ 
        model: aiModel,
        n:1,
        messages : message
    })
}
