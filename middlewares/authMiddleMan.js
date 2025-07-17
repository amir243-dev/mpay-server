const jwt = require("jsonwebtoken");

const authMiddleMan = (req, res, next) => {
  // EXTRACT THE AUTHENTICATION HEADER FROM THE INCOMING REQUEST.

  const authHeader = req.headers.authorization;

  //   IF THE HEADER IS MISSING OR DOES'ST START WITH "BEARER", REJECT THE REQUEST.

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    // Pass a 401 UNauthorized Error to the next middleman

    return res.status(401).json({ message: "No Token Provided" });
  }

  //   SPLIT THE HEADER INTO ["BEARER", "TOKEN"]
  const token = authHeader.split(" ")[1];

  try {
    // Verify the token using the secret key: throw an error message if invalid or expired.
    const payload = jwt.verify(token, process.env.JWT_SECRETKey);

    // Attach the decoded userId to req.user

    req.user = { userId: payload.userId };
    return next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = authMiddleMan;
