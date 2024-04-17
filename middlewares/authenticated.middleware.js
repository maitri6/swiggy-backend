const { verifyToken } = require("../helpers/jwt.helper");

const authenticated = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.status(401).json({
        status: false,
        statusCode: 401,
        statusMessage: "Access token not found",
      });
    }

    const token = req.headers.authorization.split(" ");
    req.user = await verifyToken(token[1].trim());
    next();
  } catch (error) {
    next(error);
  }
};

const adminAuthenticated = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.status(401).json({
        status: false,
        statusCode: 401,
        statusMessage: "Access token not found",
      });
    }

    const token = req.headers.authorization.split(" ");
    req.user = await verifyToken(token[1].trim());
    if(req.user.role != 'admin'){
      return res.status(401).json({
        status: false,
        statusCode: 401,
        statusMessage: "Access Denied",
      });
    }

    next();
  } catch (error) {
    next(error);
  }
};

// Grant access to specific roles
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(401).json({
        status: false,
        statusCode: 401,
        statusMessage: "Access Denied",
      });
    }
    next();
  };
};

module.exports = {
  authenticated,
  adminAuthenticated,
  authorize,
};