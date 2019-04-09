const express = require('express');
const router = express.Router();
const User = require('../../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const config = require('config')
const { encryptString, decryptString } = require('../../helpers/rsa')

const jwtConfig = config.get('jwtConfig')

router.post('/login', (req, res) => {
    var email = req.body.email;
    var password = req.body.password;
    if (!email || !password)
        return res.status(401).json({
            "error": "Please fill all the login fields"
        })
    User.findOne({ email }).then(user => {
        if (user == null)
            return res.status(404).json({ "error": "User not found" })
        bcrypt.compare(password, user.password, (err, match) => {
            if (err) throw err;
            if (!match)
                return res.status(401).json({
                    "error": "Wrong credentials"
                })
            if (!user.canLogin)
                return res.status(403).json({ "error": "You are not allowed to login" })
            jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: jwtConfig.expiration }, (err, token) => {
                if (err) throw err;
                return res.json({ token: encryptString(token) })
            })
        })
    })
});

router.post('/register', (req, res) => {
    var email = req.body.email;
    var password = req.body.password;
    if (!email || !password)
        return res.status(401).json({
            "error": "Please fill all the registration fields"
        })
    User.findOne({ email }).then(user => {
        if (user != null)
            return res.status(400).json({
                "error": "User already exists"
            })
        bcrypt.genSalt(10, function (err, salt) {
            if (err) throw err;
            bcrypt.hash(password, salt, function (err, hash) {
                if (err) throw err;
                var user = new User({ email, password: hash })
                user.save().then(user => {
                    jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: jwtConfig.expiration }, (err, token) => {
                        if (err) throw err;
                        res.json({ token: encryptString(token) });
                    })
                })
            });
        });
    })
});

router.get('/user', (req, res) => {
    var token = req.headers['x-access-token'];
    if (!token)
        return res.status(401).json({ "error": "No access token provided" })
    var decrypted
    try {
        decrypted = decryptString(token)
    } catch (error) {
        return res.status(401).json({ "error": "Invalid token" })
    }
    jwt.verify(decrypted, process.env.JWT_SECRET, (err, data) => {
        if (err) return res.status(401).json({ "error": "Invalid token" })
        const id = data.id
        User.findOne({ _id: id }).select(['-password']).then(user => {
            if (!user)
                return res.status(404).json({ "error": "User not found" })
            if (!user.canLogin)
                return res.status(403).json({ "error": "You are not allowed to login" })
            var clean = JSON.parse(JSON.stringify(user));
            delete clean['canLogin'];
            return res.json({ clean });
        })
    })

});

module.exports = router;