const { User } = require("../../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Joi = require("joi");

exports.register = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    const schema = Joi.object({
      fullName: Joi.string().min(3).required(),
      email: Joi.string().email().min(6).required(),
      password: Joi.string().min(6).required(),
    });

    const { error } = schema.validate(req.body);

    if (error)
      return res.status(400).send({
        error: error.details[0].message,
      });

    const hashedStrength = 10;
    const hashedPassword = await bcrypt.hash(password, hashedStrength);

    const user = await User.create({
      ...req.body,
      password: hashedPassword,
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
      message: "User successfully Registered",
      data: {
        user: {
          fullName,
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
