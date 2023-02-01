const express = require ('express')
const Controller = require('../controller/controller')
let router  = express.Router()

router
      .get('/user/courses', Controller.GET_COURSES_FOR_USERS)
      .post('/login', Controller.POST)
      .post('/create_course', Controller.CREATE_COURSE)
      .post('/admin/courses', Controller.GET_COURSES_FOR_ADMIN)
      .post('/admin/checking_course/:id', Controller.ADMIN_CHECKING_COURSE)
      .get('/filter/', Controller.GET_COURSES_BY_FILTERS)





      module.exports = router