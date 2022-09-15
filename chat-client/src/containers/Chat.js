import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { StreamChat } from "stream-chat";
import {
  Channel,
  Chat,
  Window,
  ChannelHeader,
  MessageList,
  MessageInput,
  Thread,
  LoadingIndicator,
  ChannelList,
  darkModeTheme,
} from "stream-chat-react";
import "stream-chat-react/dist/css/index.css";
import useStore1 from "../store";
import Storage from "../utils/storage";
import { ChannelContainer } from "./ChannelContainer";
import { ChannelListContainer } from "./ChannelListContainer";

export const RevirtChat = () => {
  const [client, setClient] = useState(null);
  const navigate = useNavigate();
  const storage = new Storage();

  const user = {
    id: useStore1((state) => state.userId),
  };

  const handleLogout = () => {
    storage.delete("chatToken");
    navigate("/");
  };

  useEffect(() => {
    async function init() {
      if (!user.id) {
        navigate("/");
        return;
      }
      const chatClient = StreamChat.getInstance(process.env.REACT_APP_API_KEY);
      await chatClient.connectUser(user, storage.get("chatToken"));
      const filters = { type: "livestream", members: { $in: [user.id] } };
      const channel = await chatClient.queryChannels(filters);
      channel[0]?.on("message.new", (e) => {
        if (e.message.user.id === user.id) return;
        const audio = new Audio(process.env.REACT_APP_TEST_AUDIO_URL);
        audio.play();
      });

      setClient(chatClient);
    }
    init();

    return () => {
      console.log(client);
      if (client) {
        console.log(client);
        const chatClient = StreamChat.getInstance(
          process.env.REACT_APP_API_KEY
        );
        console.log("disconnecting");
        chatClient.disconnectUser();
        console.log("disconnected");
      }
    };
  }, [client]);
//  <button onClick={handleLogout}>Logout</button>
  const filters = { type: "livestream", members: { $in: [user.id] } };
  if (!client) return <LoadingIndicator />;
  return (
    <Chat client={client} darkMode={darkModeTheme}>
    <ChannelListContainer
    // isCreating={isCreating}
    // setIsCreating={setIsCreating}
    // setCreateType={setCreateType}
    // setIsEditing={setIsEditing}
/>
<Channel>
        <Window>
          <ChannelHeader />
          <MessageList />
          <MessageInput />
        </Window>
        <Thread />
      </Channel>

    </Chat>
  );
};

