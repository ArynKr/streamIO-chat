import { useEffect, useState } from "react";
import { useChatContext } from "stream-chat-react";
import { ChannelItem } from "./ChannelItem";
export const TeamChannelList = () => {
  const [channels, setChannels] = useState([]);
  const { client } = useChatContext();
  const {channel}=useChatContext();

  useEffect(() => {
    (async function () {
      console.log("this is client")
      console.log(client, "client");
      const userId = client.user.id;
      const filter = { type: "livestream", members: { $in: [userId] } };
      const options = { limit: 30}
      const channels = await client.queryChannels(filter,{},options);
      console.log(channel,"client")
      console.log(channels, "client");
      setChannels(channels);
    })();
  }, [client]);
  return (
    <div className="containerChannel">
      {channels?.map((channel) => (
        <ChannelItem channel={channel} key={channel?.id} />
      ))}
    </div>
  );
};
