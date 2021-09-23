const jwt = require('jsonwebtoken');

const verifyUser = async (req, res, next) => {
    const jwtCookie = req.cookies.jwt || '';
    try {
      if (!jwtCookie) {
        return res.status(401).json('You need to register')
      }
      const decrypt = await jwt.verify(jwtCookie, process.env.JWT_TOKEN_SECRET);
      req.user = {
        id: decrypt.id,
        nick_name: decrypt.nick_name,
      };
      next();
    } catch (err) {
      return res.status(500).json(err.toString());
    }
  };
  
  module.exports = verifyUser;
  