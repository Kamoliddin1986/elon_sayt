let {read_file, write_file, get_token} = require('../api/api')


const Controller = {
    GET: (_,res) => {
        let courses = read_file('courses.json')
        res.send(courses)
    },
    POST: (req,res) => {
        token = get_token(req.body).token
        console.log(token);
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
        nwCourse.img_name = imgName
        nwCourse.accapted = false

        courses.push(nwCourse)
        write_file('courses.json', courses)
        file.mv(`./img/${imgName}`)

    }
}

module.exports = Controller