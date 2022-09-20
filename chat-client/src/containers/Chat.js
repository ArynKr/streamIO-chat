import { useCallback } from "react";
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
import { Containers } from "./Containers";

export const RevirtChat = () => {
  const setUserId = useStore1((state) => state.setUserId);
  const [client, setClient] = useState(null);
  const navigate = useNavigate();
  const storage = new Storage();

  const parseJwt = useCallback((token) => {
    if (!token) {
      return;
    }
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace("-", "+").replace("_", "/");
    return JSON.parse(window.atob(base64));
  }, []);

  const [user, setUser] = useState({
    id: parseJwt(storage.get("chatToken")).user_id,
  });

  const handleLogout = () => {
    storage.delete("chatToken");
    navigate("/");
  };

  useEffect(() => {
    async function init() {
      console.log(user);
      if (!user.id) {
        navigate("/");
        return;
      }
      setUserId(user.id);

      const chatClient = StreamChat.getInstance(process.env.REACT_APP_API_KEY);
      await chatClient.connectUser(user, storage.get("chatToken"));
      const filters = { type: "livestream", members: { $in: [user.id] } };
      const channels = await chatClient.queryChannels(filters);

      channels.forEach(async (channel) => {
        await channel.watch();
        channel?.on("message.new", (e) => {
          if (e.message.user.id === user.id) return;
          const audio = new Audio(process.env.REACT_APP_TEST_AUDIO_URL);
          audio.play();
        });
      });

      setClient(chatClient);
    }
    init();

    return () => {
      if (client) {
        const chatClient = StreamChat.getInstance(
          process.env.REACT_APP_API_KEY
        );
        console.log("disconnecting");
        chatClient.disconnectUser();
        console.log("disconnected");
      }
    };
  }, [client]);

  if (!client) return <LoadingIndicator />;
  return (
    <div className="chatContainer-main">
      <Chat client={client} darkMode={darkModeTheme}>
        <Containers />
      </Chat>
    </div>
  );
};
