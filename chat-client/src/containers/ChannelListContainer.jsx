import { useState } from "react";
import { ChannelList } from "stream-chat-react";
import axios from "axios";
import useStore1 from "../store";
import { ModalWrapper } from "../component/ModalWrapper";
import { Participants } from "./Participants";
import { TeamChannelList } from "./TeamChannelList";
import styles from "./ChannelListContainer.module.css";

export const Search = () => {
  return (
    <div>
      <input className="channelSearch" placeholder="Search" />
    </div>
  );
};

export const ChannelListContainer = () => {
  const showChatModal = useStore1((state) => state.showChatModal);
  const setShowChatModal = useStore1((state) => state.setShowChatModal);
  const [channelName, setChannelName] = useState("");

  const handleCreateNewChannel = async (e) => {
    e.preventDefault();
    try {
      const { data } = axios.post("http://localhost:5173/chat/channel", {
        channelName,
      });
      console.log(data);
      setChannelName("");
      setShowChatModal(false);
    } catch (err) {
      console.log(err.response);
    }
  };

  return (
    <div style={{ position: "relative" }}>
      {showChatModal && (
        <ModalWrapper>
          <div>
            <div className={styles.modalHeader}>
              <span>Create a new channel</span>
              <button
                className={styles.closeBtn}
                onClick={() => setShowChatModal(false)}
              >
                x
              </button>
            </div>
            <div>
              <form
                action=""
                className={styles.form}
                onSubmit={handleCreateNewChannel}
              >
                <input
                  type="text"
                  placeholder="Enter channel name"
                  value={channelName}
                  onChange={(e) => setChannelName(e.target.value)}
                />
                <button className={styles.btn} type="submit">
                  Create Channel
                </button>
              </form>
            </div>
          </div>
        </ModalWrapper>
      )}
      <div className="channelListContainer">
        <div>Inbox</div>
        <Search />
        <div className="channelTitle">channels</div>

        <button
          className="channelCreateButton"
          onClick={() => setShowChatModal(true)}
        >
          Create New Channel
        </button>

        <TeamChannelList />
        <div className="channelTitle">all participants</div>
        <Participants />
      </div>
    </div>
  );
};
