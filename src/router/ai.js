const openai = require("openai")
const { apiKeyTogether } = require("../const/config")
const { tripClientModel, clientModel } = require("../config/db")
const { cleanJsonAiOutput } = require("../controller/clean")

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

        if(!user.clientId){
            return res.send({message:"missing clientid"})
        }
        clientModel.findOne({ _id: user.clientId }).then(data => {
            if (!data) {    
                return res.send({ message : "user not found" })
            }
            AIClient.chat.completions.create({  
                messages :
                [
                    {
                        "role": "system",
                        "content": "You will be provided with by user preference."
                        +"Your task is to generate trip from user preferences."
                        +"Generate multiple place at least 5."
                        +"format your answer in JSON valid format like :"
                        +"[{"
                        +"\"description\": \"insert trip description...\","
                        +"\"location\":\"insert city plus the country\","
                        +"\"places\": ["
                            +"{"
                                +"\"place\": \"insert name of place...\","
                                +"\"description\": \"insert description of place...\","
                                +"\"what_to_do\": \"insert what to do of place...\""
                            +"},{"
                                +"\"place\": \"insert name of place...\","
                                +"\"description\": \"insert description of place...\","
                                +"\"what_to_do\": \"insert what to do of place...\""
                            +"},...]}]"
                        
                    },{
                        "role": "user",
                        "content": `user preference:${user.preference}`
                    }
                ],
                model:"google/gemma-7b-it",
                n:1
            }).then(data => {
                if(data.choices[0].message){
                    console.log(data.choices[0].message.content)
                    try{
                        const answer = JSON.parse(cleanJsonAiOutput(data.choices[0].message.content))
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
                }else{
                    return res.send({message:"error on AI API Call"})
                }
                
            })
        })
    })
    done()
} 