const openai = require("openai")
const { apiKeyTogether } = require("../const/config")
const { tripClientModel, clientModel } = require("../config/db")

const AIClient = new openai.OpenAI({
    apiKey: apiKeyTogether,
    baseURL: 'https://api.together.xyz/v1',
})
module.exports = (fastify, _, done) => {
    fastify.get("/trip", (req, res) => {
        const input = req.query.city ? req.query.city : "Paris"
        const ClientId = req.query.clientid ? req.query.clientid : null
        if(!ClientId){
            return res.send({message:"missing clientid"})
        }
        clientModel.findOne({ _id: ClientId }).then(data => {
            if (!data) {    
                return res.send({ message : "user not found" })
            }
            AIClient.chat.completions.create({  
                messages : 
                [
                    {
                        "role": "system",
                        "content": "You will be provided with a city, and your task is to generate trip from this city."
                        +"Answer in JSON valid format like '[{\"place\":\"monument or place\", \"description\":\"description\",\"what_to_do\":\"...\"},{\"place\":\"monument or place\", \"description\":\"description\",\"what_to_do\":\"...\"},...]'"
                    },{
                        "role": "user",
                        "content": `city: ${input}`
                      }
                ],
                model:"google/gemma-2b-it",
                n:1
            }).then(data => {
                if(data.choices[0].message){
                    const answer = JSON.parse(data.choices[0].message.content.replaceAll("```","").trim())
                    req.log.ai("success")
                    req.log.ai(`prompt tokens:${data.usage.prompt_tokens} | completion tokens:${data.usage.completion_tokens} | total tokens:${data.usage.total_tokens}`);
                    tripClientModel.insertMany([{client:ClientId, trip:answer}]).then(()=>{
                        req.log.db("inserted successfully trip to database")
                        res.type('application/json')
                        return res.send(answer)
                    })
                }else{
                    return res.send({message:"error on AI API Call"})
                }
                
            })
        })
    })
    done()
} 