const StreamChat = require("stream-chat").StreamChat;
const apiSecret = process.env["CHAT_SECRET"];
const apiKey = process.env["CHAT_KEY"];

const { addToGlobalChannel } = require("../utils/userActions");

const signup = async (req, res) => {
  try {
    const { userName, userId, email } = req.body;
    const ServerClient = StreamChat.getInstance(apiKey, apiSecret);
    const token = ServerClient.createToken(userId);
    addToGlobalChannel(userId);
    res.json({ token, userName, userId, email });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "Some error encountered while signing up", err });
  }
};

const login = async (req, res) => {
  try {
    const { userId } = req.body;
    const ServerClient = StreamChat.getInstance(apiKey, apiSecret);
    const { users } = await ServerClient.queryUsers({ id: userId });

    if (!users.length)
      return res.status(400).json({ message: "User not found" });
    const token = ServerClient.createToken(users[0].id);

    return res.json({ token, userName: users[0].name, userId: users[0].id });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Unable to login", err });
  }
};

module.exports = { signup, login };
