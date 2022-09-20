import {
  Channel,
  Window,
  MessageList,
  MessageInput,
  Thread,
  useChatContext,
  useChannelStateContext,
} from "stream-chat-react";
import useStore1 from "../store";
import back from "../assets/back-icon.png";

const EmptyState = () => (
  <div className="channel-empty__container">
    <p className="channel-empty__first">
      This is the beginning of your chat history.
    </p>
    <p className="channel-empty__second">
      Send messages, attachments, links, emojis, and more!
    </p>
  </div>
);

export const ChannelContainer = () => {
  const { channel, client } = useChatContext();

  const CustomChannelHeader = () => {
    const { channel } = useChannelStateContext();
    const { image, member_count } = channel.data || {};
    let { name } = channel.data || {};
    if (channel.type === "messaging") {
      const users = name.split("_");
      name = users.find((user) => user !== client.user.id);
    }
    const { watcher_count: online } = channel.state;
    const setShowChannelList = useStore1((state) => state.setShowChannelList);

    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "#070A0D",
          padding: "1rem",
          gap: "1rem",
        }}
      >
        {/* Back Icon */}
        <button
          onClick={() => setShowChannelList(true)}
          style={{
            marginRight: "0.25rem",
            textDecoration: "none",
            backgroundColor: "inherit",
            border: "none",
            outline: "none",
            cursor: "pointer",
          }}
        >
          <img src={back} width={30} height={30} alt="back" />
        </button>
        {/* Image */}
        <img
          style={{
            width: "2.5rem",
            height: "2.5rem",
            borderRadius: "0.25rem",
            objectFit: "cover",
          }}
          src={image}
          alt="Channel"
        />

        {/* Content */}
        <div>
          <div style={{ fontWeight: "600" }}>{name}</div>

          <div style={{ fontSize: "0.85rem" }}>
            {" "}
            <span>{member_count} members, </span> <span>{online} online</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Channel channel={channel}>
      <Window>
        <CustomChannelHeader />
        <MessageList />
        <MessageInput />
      </Window>
      <Thread />
    </Channel>
  );
};
