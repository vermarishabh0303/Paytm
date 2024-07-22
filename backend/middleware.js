const jwt = require("jsonwebtoken");
const {JWT_SECRET} = require("./config");

const authMiddleware = (req, res, next)=>{
    const authHeader = req.headers.authorisation;
    console.log(authHeader);
    if(!authHeader || !authHeader.startsWith('Bearer')){
        return res.status(403).json({
            message: "No auth header found"
        });

    }
    const token = authHeader.split(' ')[1];

    try{
        const decoded = jwt.verify(token, JWT_SECRET);

        if(decoded.userId){
            req.userId = decoded.userId;
            next();
        }
        else{
            return res.status(403).json({
                message: "Unauthorized Access"
            });
        }
    }
    catch{
        return res.status(403).json({
            message: "Unauthorized Access"
        });
    }
}

module.exports  = {
    authMiddleware
}