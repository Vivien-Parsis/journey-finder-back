const openai = require("openai")
const { apiKeyTogether } = require("../const/config")
const AIClient = new openai.OpenAI({
    apiKey: apiKeyTogether,
    baseURL: 'https://api.together.xyz/v1',
})
module.exports = (fastify, _, done) => {
    fastify.get("/", (req, res) => {
        const input = req.query.city ? req.query.city : "Paris"
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
		}).then(data=> {
            if(data.choices[0].message){
				//console.log(data.choices[0].message.content)
                res.type('application/json')
				return res.send(data.choices[0].message.content.replaceAll("```","").trim())
            }
            //console.log(data)
            return res.send({message:"error on AI API Call"})
          })
    })
    done()
} 