import jwt from 'jsonwebtoken';

const authenticate = (req,res, next) => {
  console.log("authenticating");
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized!!!' });
    }
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET) ;
      req.user = decoded;
      next();
    } catch (error) {
      console.log("error: ", error);
      return res.status(401).json({ message: 'Invalid token' });
    }
  };


export default authenticate;