const { Router } = require('express');
const router = Router(); 
const User = require('../models/User');
const config = require('../config');
const verifyToken = require('./verifyToken');

const jwt = require('jsonwebtoken');

router.post('/signup', async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = new User({
    username: name,
    email: email,
    password: password,
  });

  user.password = await user.encriptPassword(user.password);
  await user.save();

  const token = jwt.sign({ id: user._id }, config.secret, { expiresIn: 60 * 60 * 24 });

  res.json({ auth: true, token });
});

router.get('/me', verifyToken, async (req, res, next) => {
  if (req.userId) {
    const userInfo = await User.findById(req.userId, { password: 0, _id: 0 });

    if (!userInfo) {
      return res.status(404).json({ error: 'Not found user' });
    }

    return res.send(userInfo);
  }

  res.status(404).json({ error: 'invalid userId'});
});

router.post('/signin', async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email });
    
  if (!user) {
    return res.status(404).json({ error: `Not found user with email ${email}` });
  }

  const validPassword = await user.validatePass(password);

  if (!validPassword) {
    return res.status(401).json({ error: 'Invalid user password', token: null });
  }

  const token = jwt.sign({ id: user._id }, config.secret, { expiresIn: 60 * 60 * 24 });
  
  res.json({ auth: true, token });
});

module.exports = router;