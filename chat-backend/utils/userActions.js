const StreamChat = require("stream-chat").StreamChat;
const apiSecret = process.env["CHAT_SECRET"];
const apiKey = process.env["CHAT_KEY"];

const addToGlobalChannel = async (userId) => {
  try {
    const serverClient = StreamChat.getInstance(apiKey, apiSecret);
    serverClient.upsertUser({
      id: userId,
      role: "user",
    });
    const channel = await serverClient.queryChannels({
      id: { $in: ["global"] },
    });
    console.log(channel);
    const data = await channel[0].addMembers([userId]);
    return data;
  } catch (err) {
    throw err;
  }
};

module.exports = { addToGlobalChannel };
