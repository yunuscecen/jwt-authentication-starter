const router = require('express').Router();
const User = require('../model/User');
const jwt = require('jsonwebtoken');
const {registerValidation, loginValidation} = require('../helper/validation');
const bcrypt = require('bcrypt');

router.post('/register', async (req,res) => {
    // Validation Datas
    const { error } = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    // Check if the user is already in the database
    const emailExist = await User.findOne({ email : req.body.email });
    if(emailExist) return res.status(400).send("Email already exist.");
    // Hash Password
    const hashedPassword = await bcrypt.hash(req.body.password.trim(), 12);
    // Create a new user
    const user = new User({
        name : req.body.name,
        email : req.body.email,
        password : hashedPassword
    });
    try {
        savedUser = await user.save();
        res.redirect("/login");        
    }catch(err) {
        res.status(400).send(err);
    }

});

router.post("/login", async (req,res) => {
    
    const { error } = loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    // Check if user exist
    const user = await User.findOne({ email : req.body.email });
    if(!user) return res.status(400).send("Email or password is wrong.");

    // Password is correct
    const passwordValidation = await bcrypt.compare(req.body.password, user.password);
    if(!passwordValidation) return res.status(400).send("Email or password is wrong.");
    // Create and assign a token
    const token = jwt.sign({ _id : user._id }, process.env.TOKEN_SECRET, { expiresIn : '1d' });
    localStorage.authentication_token = token;
    res.send("You are in!")

});






























module.exports = router;