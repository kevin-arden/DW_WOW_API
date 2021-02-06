const { User } = require("../../models");

exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll();

    res.send({
      messages: "User Successfully Retrieved",
      data: {
        users,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(400).send({
      message: "User Unsuccessfully Retrieved",
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    await User.destroy({
      where: { id },
    });

    res.send({
      messages: "User Successfully Deleted",
    });
  } catch (err) {
    console.log(err);
    res.status(400).send({
      message: "User Unsuccessfully Deleted",
    });
  }
};
