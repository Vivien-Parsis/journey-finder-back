const cleanJsonAiOutput = (output) => {
    let start = 0; let end = 0
    for(let i = 0; i<output.length; i++){
        if(output[i]=="`"){
            start = i
            break
        }
    }
    for(let i = output.length-1; i>=0; i--){
        if(output[i]=="`"){
            end = i
            break
        }
    }
    return output.substring(start, end).replaceAll("```json","").replaceAll("`","").trim()
}

module.exports = { cleanJsonAiOutput }