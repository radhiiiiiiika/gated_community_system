const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../db');
const dotenv = require('dotenv');
dotenv.config();


// register
router.post('/register', async (req, res) => {
try {
const { name, email, password, role } = req.body;
if (!name || !email || !password) return res.status(400).json({ message: 'Missing fields' });
const existing = await User.findOne({ where: { email } });
if (existing) return res.status(400).json({ message: 'Email already in use' });
const passwordHash = await bcrypt.hash(password, 10);
const user = await User.create({ name, email, passwordHash, role: role || 'guard' });
return res.json({ id: user.id, name: user.name, email: user.email, role: user.role });
} catch (err) {
console.error(err);
res.status(500).json({ message: 'Server error' });
}
});


// login
router.post('/login', async (req, res) => {
try {
const { email, password } = req.body;
if (!email || !password) return res.status(400).json({ message: 'Missing fields' });
const user = await User.findOne({ where: { email } });
if (!user) return res.status(400).json({ message: 'Invalid credentials' });
const ok = await bcrypt.compare(password, user.passwordHash);
if (!ok) return res.status(400).json({ message: 'Invalid credentials' });
const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });
return res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
} catch (err) {
console.error(err);
res.status(500).json({ message: 'Server error' });
}
});


module.exports = router;