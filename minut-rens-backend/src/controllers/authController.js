const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { findUserByEmail, createUser } = require('../models/userModel');

const register = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existing = await findUserByEmail(email);
    if (existing) return res.status(400).json({ error: 'Bruger findes allerede' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await createUser(email, hashedPassword);

    res.status(201).json({ message: 'Bruger oprettet', user: newUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Fejl ved oprettelse af bruger' });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await findUserByEmail(email);

    if (!user) return res.status(401).json({ error: 'Bruger ikke fundet' });

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) return res.status(401).json({ error: 'Forkert kodeord' });

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ message: 'Login succesfuldt', token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Login-fejl' });
  }
};

module.exports = {
  register,
  login
};