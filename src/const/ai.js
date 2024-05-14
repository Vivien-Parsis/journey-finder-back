const dotenv = require("dotenv")
dotenv.config()

const aiModel = process.env.AI_MODEL ? process.env.AI_MODEL : "google/gemma-7b-it"
const systemPrompt = "You will be provided with by user preference."
                    +"Your task is to generate trip from user preferences."
                    +"Generate multiple place at least 5."
                    +"format your answer in JSON valid format like :"
                    +"[{"
                    +"\"description\": \"insert trip description...\","
                    +"\"location\":\"insert city plus the country\","
                    +"\"places\":"
                    +"["
                        +"{"
                            +"\"place\": \"insert name of place...\","
                            +"\"description\": \"insert description of place...\","
                            +"\"what_to_do\": \"insert what to do of place...\""
                        +"},{"
                            +"\"place\": \"insert name of place...\","
                            +"\"description\": \"insert description of place...\","
                            +"\"what_to_do\": \"insert what to do of place...\""
                        +"},...]}"
                    +"]"

module.exports = { aiModel, systemPrompt }