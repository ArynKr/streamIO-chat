import { useEffect, useState } from "react";
import { ChannelList, useChatContext } from "stream-chat-react";
import { ChannelItem } from "./ChannelItem";
export const TeamChannelList = ({ children }) => {
  const [channels, setChannels] = useState([]);
  const { client } = useChatContext();

  useEffect(() => {
    (async function () {
      const userId = client.user.id;
      const filter = { members: { $in: [userId] } };
      const channels = await client.queryChannels(filter);
      setChannels(channels);
    })();
  }, []);
  // (async function(){
  //     const channels = await client.queryChannels();
  //     setChannel(channels)
  // })()
  console.log(channels, "channels");
  return (
    <div>
      {channels?.map((channel) => (
        <ChannelItem channel={channel} key={channel?.id} />
      ))}
    </div>
  );
};
