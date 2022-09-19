import { useChatContext } from "stream-chat-react";
import useStore1 from "../store";
export const ChannelItem = ({ channel }) => {
  const setShowChannelList = useStore1((state) => state.setShowChannelList);
  const setActiveChannelLocalState = useStore1(
    (state) => state.setActiveChannel
  );
  const activeChannel = useStore1((state) => state.activeChannel);
  const {
    data: { image, name },
  } = channel;
  const { setActiveChannel } = useChatContext();

  return (
    <div
      style={{ cursor: "pointer" }}
      className="channelInfo"
      onClick={() => {
        setActiveChannel(channel);
        setActiveChannelLocalState(channel);
        setShowChannelList(false);
      }}
    >
      <img src={image} alt="info" className="channel_image" />
      <p className="channel_name">{name}</p>
    </div>
  );
};
