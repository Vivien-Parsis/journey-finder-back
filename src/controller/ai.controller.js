const { aiModel, systemPrompt, AIClient } = require("../const/ai.const")
const { tripClientModel, clientModel } = require("../config/db")
const { parseJsonAiOutput } = require("../tools/parse")

const createTripFromAi = (req, res) => {
    const user = {
        clientId : req.body.clientid ? req.body.clientid : null,
        preference : req.body.preference ? req.body.preference : "museum, cold temperature"
    }

    if(!user.clientId) return res.send({message:"missing clientid"})
    
    clientModel.findOne({ _id: user.clientId }).then(data => {
        if(!data) return res.send({ message : "user not found" })
            createAiResponse(req, res, user)
        })
}

module.exports = { createTripFromAi }

const createAiResponse = (req, res, user) => {
    AIClient.chat.completions.create({ 
        model: aiModel,
        n:1,
        messages : [
            {
                "role": "system",
                "content": systemPrompt
            },{
                "role": "user",
                "content": `user preference:${user.preference}`
            }
        ]
    }).then(data => {
        if(!data.choices[0].message){
            return res.send({message:"error on AI API Call"})
        }
        try{
            const answer = JSON.parse(parseJsonAiOutput(data.choices[0].message.content))
            req.log.ai("success")
            req.log.ai(`prompt tokens:${data.usage.prompt_tokens} | completion tokens:${data.usage.completion_tokens} | total tokens:${data.usage.total_tokens}`);
            tripClientModel.insertMany([{client:user.clientId, trip:answer}]).then(()=>{
                req.log.db("inserted successfully trip to database")
                res.type('application/json')
                return res.send(answer)
            })
        }catch(err){
            console.log(err)
            return res.send({message:"AI json error"})
        } 
    })
}
