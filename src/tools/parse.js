const parseJsonAiOutput = (output) => {
    let start = 0
    for(let i = 0; i<output.length; i++){
        // if(output[i]=="`"){
        if(output[i]=="[" || output[i]=="{"){
            start = i
            break
        }
    }
    let end = 0
    for(let i = output.length-1; i>=0; i--){
        // if(output[i]=="`"){
        if(output[i]=="]" || output[i]=="}"){
            end = i
            break
        }
    }
    //return output.substring(start, end).replaceAll("```json","").replaceAll("`","").trim()
    return output.substring(start, end+1)
}

module.exports = { parseJsonAiOutput }