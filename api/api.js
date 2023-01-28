let fs = require('fs')
let jwt = require('jsonwebtoken')
// import express from 'express'
let dotenv = require('dotenv')

dotenv.config()

const read_file = (file_name) =>{
    return JSON.parse(fs.readFileSync(`./data/${file_name}`, 'utf8'))
}


const write_file = (file_name, data) => {
    return fs.writeFile(`./data/${file_name}`, JSON.stringify(data, null, 4), (err) => {
        if(err) throw err;
        console.log('Created!');
    })

} 

function get_token(logData){
    let user = read_file('admin.json')

    if(user[0].userName == logData.userName && user[0].password == logData.password){
        let token = jwt.sign({name: `${user[0].userName}`},process.env.SECRET_KEY, {
            expiresIn: "2h",
        })
        return {token}
    }else{
        return {
            token: false
        }
    }

}



module.exports = {
    read_file,
    write_file,
    get_token
}