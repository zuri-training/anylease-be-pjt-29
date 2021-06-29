// Mongoose model imports
const User = require('../../models/User');

// Module export
module.exports = (req, res) => {
  const { email, phone, password } = req.body;
  const response = { data: null, message: '', error: false };

  if ((!email && !phone) || !password)
    return res.status(400).send({
      data: null,
      message: 'email or phone and password are required',
      error: true,
    });

  const logic = email
    ? User.findOne({ email, isDeleted: false })
    : User.findOne({ phone, isDeleted: false });

  return logic.then((user) => {
    if (!user)
      return res.status(404).send({
        data: null,
        message: 'User not found',
        error: true,
      });

    const { id, token } = user.toAuthJSON();

    return user.validatePassword(password)
      ? res.status(200).send({
          data: { id, token },
          message: 'User authenticated successfully',
          error: false,
        })
      : res.status(401).send({
          data: null,
          message: 'email or password is incorrect',
          error: true,
        });
  });
};
