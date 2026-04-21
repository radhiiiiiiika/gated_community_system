const jwt = require('jsonwebtoken');
const { User } = require('../db');
const dotenv = require('dotenv');
dotenv.config();


const authMiddleware = async (req, res, next) => {
const auth = req.headers.authorization;
if (!auth || !auth.startsWith('Bearer ')) return res.status(401).json({ message: 'No token' });
const token = auth.split(' ')[1];
try {
const payload = jwt.verify(token, process.env.JWT_SECRET);
const user = await User.findByPk(payload.id);
if (!user) return res.status(401).json({ message: 'User not found' });
req.user = { id: user.id, name: user.name, role: user.role };
next();
} catch (err) {
return res.status(401).json({ message: 'Invalid token', error: err.message });
}
};


module.exports = authMiddleware;