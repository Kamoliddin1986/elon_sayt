const express = require ('express')
const Controller = require('../controller/controller')
let router  = express.Router()

router
      .get('/user/courses', Controller.GET_COURSES_FOR_USERS)
      .post('/login', Controller.POST)
      .post('/create_course', Controller.CREATE_COURSE)





      module.exports = router