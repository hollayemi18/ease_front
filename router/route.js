const express = require('express');
const route = express.Router();
const cntrl = require('../controllers/authCntrl');
const verifyToken = require('../middleware/auth');

route.post('/register', cntrl.register);
route.post('/login', cntrl.login);
route.get('/logout', cntrl.logout);
route.get('/user', verifyToken, cntrl.getuser);
module.exports = route;
