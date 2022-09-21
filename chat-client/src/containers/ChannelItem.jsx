import { useChatContext } from "stream-chat-react";
import useStore1 from "../store";
import bin from "../assets/bin.svg";

export const ChannelItem = ({ channel }) => {
  const setShowChannelList = useStore1((state) => state.setShowChannelList);
  const setActiveChannelLocalState = useStore1(
    (state) => state.setActiveChannel
  );
  const activeChannel = useStore1((state) => state.activeChannel);
  const {
    data: { image, name },
  } = channel;
  const { setActiveChannel, client } = useChatContext();

  const handleChannelDelete = async (e) => {
    await channel.delete();
  };

  return (
    <div
      style={{
        cursor: "pointer",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
      className="channelInfo"
    >
      <div
        style={{
          display: "flex",
          flexGrow: "1",
          gap: "1rem",
          alignItems: "center",
        }}
        onClick={() => {
          setActiveChannel(channel);
          setActiveChannelLocalState(channel);
          setShowChannelList(false);
        }}
      >
        <img src={image} alt="info" className="channel_image" />
        <p className="channel_name">{name}</p>
      </div>
      {name !== "global" && (
        <div className="deleteBtn" onClick={handleChannelDelete}>
          <img src={bin} alt="delete channel button" />
        </div>
      )}
    </div>
  );
};
