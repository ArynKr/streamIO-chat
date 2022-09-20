const StreamChat = require("stream-chat").StreamChat;
const apiSecret = process.env["CHAT_SECRET"];
const apiKey = process.env["CHAT_KEY"];

const createChannel = async (req, res) => {
  try {
    const { name, created_by_id, members, type, image, id } = req.body;
    console.log(req.body);
    const ServerClient = StreamChat.getInstance(apiKey, apiSecret);
    const channel = ServerClient.channel(type, id, {
      name,
      members,
      created_by_id,
      image:
        image ||
        "https://images.unsplash.com/photo-1577563908411-5077b6dc7624?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    });
    const { channel: channelData } = await channel.create();
    res.json({ channelData });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Some error encountered while creating channel", err });
  }
};

module.exports = { createChannel };
