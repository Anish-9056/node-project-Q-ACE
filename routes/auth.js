const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt =require('jsonwebtoken')
const User = require('../models/User');
const { registerValidation, loginValidation } = require('../validation')
router.post('/register', async (req, res) => {
    // Lets validate the data before we a user
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message)

    // checking if user alresady exist in the database
    const emaiExist = await User.findOne({ email: req.body.email })
    if (emaiExist) return res.status(400).send('email already exist')

    // hash password 
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(req.body.password, salt)
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword
    })
    try {
        const savedUser = await user.save()
        // res.send(savedUser)
        res.send({ user: user._id })
    }
    catch (err) {
        res.status(400).send(err)
    }
})

// login

router.post('/login', async (req, res) => {
    // Lets validate the data before we a user
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message)

    // checking if user alresady exist in the database
    const user = await User.findOne({ email: req.body.email })
    if (!user) return res.status(400).send('email or password is wrong')

    // validate password is correct
    const validPass = await bcrypt.compare(req.body.password, user.password)
    if (!validPass) return res.status(400).send('Invalid password')

    // create and assign a token
    const token = jwt.sign({_id:user._id},process.env.TOKEN_SECRET);
    res.header('auth-token',token).send(token)
})


module.exports = router