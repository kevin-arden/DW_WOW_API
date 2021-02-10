const { Transaction, User } = require("../../models");

exports.addTransaction = async (req, res) => {
  const { files } = req;
  const { usersId } = req.body;

  try {
    const transaction = await Transaction.create({
      usersId: req.body.usersId,
      transferProof: files.transferProof[0].filename,
    });

    const transaction2 = await Transaction.findOne({
      where: { id: transaction.id },
      include: {
        model: User,
        as: "user",
      },
    });

    res.send({
      status: "Success",
      data: {
        transaction2,
        transferProof: files.transferProof,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Server Error",
      response: files,
    });
  }
};

exports.editTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const { paymentStatus } = req.body;

    const transaction = await Transaction.findOne({
      where: { id },
    });

    if (!transaction) {
      return res.status(400).send({
        status: "Server Error",
        error: {
          message: "Data Transaction Not Found",
        },
      });
    }

    await Transaction.update(
      {
        paymentStatus,
        userStatus: "Active",
        remainingActive: 30,
      },
      {
        where: { id },
      }
    );

    const editTransaction = await Transaction.findOne({
      where: { id },
    });

    if (!editTransaction) {
      return res.status(400).send({
        status: "Server Error",
        error: {
          message: "Data Transaction Not Found",
        },
      });
    }

    res.send({
      messages: "Transaction Successfully Edited",
      data: {
        editTransaction,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Server Error",
    });
  }
};

exports.getTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const transaction = await Transaction.findOne({
      where: { id },
      include: {
        model: User,
        as: "user",
      },
    });

    if (!transaction) {
      return res.status(400).send({
        status: "Server Error",
        error: {
          message: "Data Transaction Not Found",
        },
      });
    }

    res.send({
      messages: "Transaction Successfully Retrieved",
      data: {
        transaction,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Server Error",
    });
  }
};

exports.getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.findAll({
      include: {
        model: User,
        as: "user",
      },
    });

    if (!transactions) {
      return res.status(400).send({
        status: "Server Error",
        error: {
          message: "Data Transaction Not Found",
        },
      });
    }

    res.send({
      messages: "Transaction Successfully Retrieved",
      data: {
        transactions,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Server Error",
    });
  }
};
