const express = require('express');

const router = express.Router();

const generateToken = require('../utils/generateToken');
const validateLogin = require('../middlewares/loginValidate');

router.post('/', validateLogin, (_req, res) => {
    res.status(200).json({ token: generateToken() });
  });

module.exports = router;