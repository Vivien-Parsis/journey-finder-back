const openai = require("openai")
const { apiKeyTogether } = require("../const/config")
const AIClient = new openai.OpenAI({
    apiKey: apiKeyTogether,
    baseURL: 'https://api.together.xyz/v1',
})
module.exports = (fastify, _, done) => {
    fastify.get("/", (req, res) => {
        AIClient.chat.completions.create({  
            messages: [
                {
					"role": "system",
					"content": "You will be provided with a product description and seed words, and your task is to generate product names. Answer in JSON valid format like '[{name:\"generate name\"},{name:\"generate name\"}]'"
              	},{
                	"role": "user",
                	"content": "Product description: A home milkshake maker\nSeed words: fast, healthy, compact."
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