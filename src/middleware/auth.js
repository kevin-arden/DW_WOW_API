const jwt = require("jsonwebtoken");



exports.authenticated = (req, res, next) => {
  let header, token;

  if (
    !(header = req.header("Authorization")) ||
    !(token = header.replace("Bearer ", ""))
  )
    return res.status(400).send({
      message: "Access Denied",
    });
  try {
    const secretKey = "secret-key";
    const verified = jwt.verify(token, secretKey);

    req.user = verified;
    next();
  } catch (err) {
    return res.status(400).send({
      message: "Invalid Token",
    });
  }
};
