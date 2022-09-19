const StreamChat = require("stream-chat").StreamChat;
const apiSecret = process.env["CHAT_SECRET"];
const apiKey = process.env["CHAT_KEY"];

const createChannel = async (req, res) => {
  try {
    const { channelName } = req.body;
    const ServerClient = StreamChat.getInstance(apiKey, apiSecret);
    const channel = ServerClient.channel("livestream", {
      name: "channel4 name",
      members: ["rahul123"],
    });
    await channel.create();
    res.json({ channel });
  } catch (err) {
    res
      .status(401)
      .json({ message: "Some error encountered while creating channel", err });
  }
};

module.exports = { createChannel };
