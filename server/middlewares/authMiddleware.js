const jwt = require("jsonwebtoken");

/* 
verifying valid token from client header whether user is logged In or not 

The token is verified using a secret key (process.env.secret_key_jwt). 
If the token is valid, it returns the decoded token & allows the request to proceed to the protected route.

The userId from the verified token is attached to the req.body, making it accessible in subsequent middleware or route handlers.
*/
const auth = (req, res, next) => {
  try {
    console.log(req.headers);
    console.log("req headers", req.headers.authorization);
    const token = req.headers.authorization.split(" ")[1];
    console.log("token", token);
    const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);
    console.log("verified token", verifiedToken);
    req.body.userId = verifiedToken.userId; 
    next();
  } catch (err) {
    res.status(401).json({ success: false, message: "Token Invalid" });
  }
};

module.exports = auth;