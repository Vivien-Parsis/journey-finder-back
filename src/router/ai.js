const openai = require("openai")
const { apiKeyTogether } = require("../const/config")
const { aiModel, systemPrompt } = require("../const/ai")
const { tripClientModel, clientModel } = require("../config/db")
const { parseJsonAiOutput } = require("../controller/parse")

const AIClient = new openai.OpenAI({
    apiKey: apiKeyTogether,
    baseURL: 'https://api.together.xyz/v1',
})
module.exports = (fastify, _, done) => {
    fastify.post("/trip", (req, res) => {
        const user = {
            clientId : req.body.clientid ? req.body.clientid : null,
            preference : req.body.preference ? req.body.preference : "museum, cold temperature"
        }

        if(!user.clientId) return res.send({message:"missing clientid"})
        
        clientModel.findOne({ _id: user.clientId }).then(data => {
            if(!data) return res.send({ message : "user not found" })
            
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
        })
    })
    done()
} 