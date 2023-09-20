const express = require('express');
const route = express.Router();
const cntrl = require('../controllers/authCntrl');
const verifyToken = require('../middleware/authMiddleWare');
const auth = require('../validation/auth');

route.post('/register', auth, cntrl.register);
route.post('/login', cntrl.login);
route.get('/logout', cntrl.logout);
route.get('/user', verifyToken, cntrl.getuser);
module.exports = route;
