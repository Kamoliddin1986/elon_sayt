import fs from 'fs'
import jwt from 'jsonwebtoken'
import express from 'express'
import dotenv from 'dotenv'

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

function get_token(login,pass){
    let user = read_file('user.json')
    if(user.userName == login && user.password == pass){
        let token = jwt.sign({name: `${login}`},process.env.SECRET_KEY, {
            expiresIn: "2h",
        })
        resizeBy.sen
    }

}



export {
    read_file,
    write_file
}