const isValidEmail = (email) => {
    const pattern = /[a-zA-Z0-9._\-]{1,30}[@][a-zA-Z0-9._\-]{4,12}[.]{1}[a-zA-Z]{2,4}/gm
    const match = email.match(pattern) ? email.match(pattern) : undefined
    if(match==undefined){
        return false
    }
    return match.length == 1 && match[0].length == email.length
}

const isValidPassword = (password) => {
    return password.length >= 6 && password.length <= 30 //is the password length is between 6 to 30
        && /[A-Z]/.test(password) //is the password contain at least one capital letter
        && /[a-z]/.test(password) //is the password contain at least one lowercase letter
        && /\d/.test(password) //is the password contain at least one number

}

module.exports = { isValidEmail, isValidPassword }