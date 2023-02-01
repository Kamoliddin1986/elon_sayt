let {read_file, write_file, get_token} = require('../api/api')
let uuid = require("uuid.v4")
let jwt = require('jsonwebtoken')
// const qwps = require('query-parser')

const Controller = {
    GET_COURSES_FOR_USERS: (_,res) => {
        let courses = read_file('courses.json')
        let accepted_courses = courses.filter(courses => courses.accepted == true)
        res.send(accepted_courses)
    },
    POST: (req,res) => {
       let  token = get_token(req.body).token

        if(token){
            res.send(token)
        }else{
            res.send('password or login is not correct!')
        }
        

    },
    CREATE_COURSE: (req,res) => {
        let courses = read_file('courses.json')

        let nwCourse = req.body.course_data
        nwCourse = JSON.parse(nwCourse)
        let {file} = req.files
        console.log(req.files);
        let {size, mimetype} = file
        
        let img_type = ['image/webp', 'image/jpg','image/png','application/octet-stream' ]
        let imgName = (Date.now()-1674906463165)+file.name
        console.log(file, nwCourse, "TRUE:",mimetype);
        if(size>(5*1024*1024)){
            return res.send('Limit of size img 5MB ')
        }
        if(!img_type.includes(mimetype)){
            return res.send("Img type must be : img, webp, jfif, png.")
        }
        courses.push({id:uuid(), ...nwCourse,img_name: imgName,accepted: false })
        write_file('courses.json', courses)
        file.mv(`./img/${imgName}`)
        res.send('Course was added!!!')

    },

    GET_COURSES_FOR_ADMIN: (req,res) => {
        let admin = read_file('admin.json')


        if(jwt.verify(req.headers.authorization,process.env.SECRET_KEY).name == admin[0].userName){
            let allCourses = read_file('courses.json')
            return res.send(allCourses)
        }else{
            return res.send('token is not actual!!!')
        }
    },

    ADMIN_CHECKING_COURSE: (req,res) => {
        let admin = read_file('admin.json')
        let courses = read_file('courses.json')
        let id = req.params.id
        let accepted_status = req.body.accepted
   
        let id_exists = false
        if(accepted_status != false && accepted_status !=true){
            return res.send('Accepted status is not correct, must be true or false!!!')
        }
        
        if(jwt.verify(req.headers.authorization,process.env.SECRET_KEY).name == admin[0].userName){
            courses.forEach(course => {
                if(course.id == id){
                    course.accepted = accepted_status
                    id_exists = true
                }
            })
            if(!id_exists){
                return res.send(`Course ID: "${id}" is not exists!!!`)
            }{
                write_file('courses.json', courses)
                return res.send(`Course ID: "${id}" is accepted!!!`)
            }
        }else{
            return res.send('token is not actual!!!')
        }
    },
    GET_COURSES_BY_FILTERS: (req,res) => {
        let values = req.query
        let filters = Object.keys(req.query)


        let courses =  read_file('courses.json')
        for (let key of filters){

            if(key == 'name'){
                courses = courses.filter(course => course.author[key]==values[key] && course.accepted == true )
            }else{
                courses = courses.filter(course => course[key]==values[key] && course.accepted == true)

            }
        }
              
        return res.send(courses)


        
    }
}

module.exports = Controller