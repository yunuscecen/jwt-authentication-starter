const jwt = require('jsonwebtoken');

const verifyToken = (req,res,next) => {
    const token = localStorage.getItem("authentication_token");
    if(!token) return next();
    try {
        const verifiedUser = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verifiedUser;
        req.isAuthenticated = true;
        next();
    }catch(err) {
        next();
    }
}

const isAuthenticated = (req,res,next) => {
    if(!req.isAuthenticated) return res.redirect("/login");
}


module.exports.verifyToken = verifyToken;
module.exports.isAuthenticated = isAuthenticated;