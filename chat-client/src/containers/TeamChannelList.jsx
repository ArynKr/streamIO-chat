import { useEffect, useState } from "react";
import { useChatContext } from "stream-chat-react";
import { ChannelItem } from "./ChannelItem";
export const TeamChannelList = () => {
  const [channels, setChannels] = useState([]);
  const { client } = useChatContext();

  useEffect(() => {
    (async function () {
      client.on("channel.");
      console.log(client, "client");
      const userId = client.user.id;
      const filter = { type: "livestream", members: { $in: [userId] } };
      const channels = await client.queryChannels(filter);
      console.log(channels, "client");
      setChannels(channels);
    })();
  }, [client]);
  return (
    <div>
      {channels?.map((channel) => (
        <ChannelItem channel={channel} key={channel?.id} />
      ))}
    </div>
  );
};
