const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  // Get the token from the Authorization header
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).send("Access Denied. No token provided.");
  }

  try {
    // Verify the token using the secret key
    const decoded = jwt.verify(token, "zvoosh-secrets"); // Replace with your secret key
    req.user = decoded; // Attach the decoded user data to the request object
    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    return res.status(401).send("Invalid token.");
  }
};

module.exports = authMiddleware;