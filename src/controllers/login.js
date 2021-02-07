const { User } = require("../../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Joi = require("joi");

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const schema = Joi.object({
      email: Joi.string().email().min(6).required(),
      password: Joi.string().min(6).required(),
    });

    const { error } = schema.validate(req.body);

    if (error)
      return res.status(400).send({
        error: error.details[0].message,
      });

    const user = await User.findOne({
      where: { email },
    });

    if (!user)
      return res.status(400).send({
        message: "Email not registered",
      });

    const validPass = await bcrypt.compare(password, user.password);

    if (!validPass)
      return res.status(400).send({
        message: "Password Incorrect",
      });

    const secretKey = "secret-key";
    const token = jwt.sign(
      {
        id: user.id,
      },
      secretKey
    );

    res.send({
      status: "success",
      message: "User successfully Login",
      data: {
        user: {
          email,
          token,
        },
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Server Error",
    });
  }
};
