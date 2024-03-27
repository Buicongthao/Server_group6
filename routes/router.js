var express = require('express');
var router = express.Router();
var api_users = require('../controller/api/user.api.Controller')

router.get('/users',api_users.listUser);      
router.get('/user/:username',api_users.oneUser);      
router.post('/users',api_users.addUser);           
router.post('/userslogin',api_users.userLogin);           
router.put('/users/:idu',api_users.updateUser);    
router.delete('/users/:idu',api_users.deleteUser); 

// lấy ra 10 người dùng có điểm cao nhất
router.get('/top-users', api_users.getTopUsers);
module.exports = router;