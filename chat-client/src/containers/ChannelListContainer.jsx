import { useState } from "react";
import axios from "axios";
import useStore1 from "../store";
import { ModalWrapper } from "../components/ModalWrapper";
import { Participants } from "./Participants";
import { TeamChannelList } from "./TeamChannelList";
import styles from "./ChannelListContainer.module.css";
import { ChatParticipants } from "./ChatParticipants";
import { createChannel } from "../utils/create-channel";

export const Search = () => {
  return (
    <div>
      <input className="channelSearch" placeholder="Search" />
    </div>
  );
};

export const ChannelListContainer = () => {
  const userId = useStore1((state) => state.userId);
  const showChatModal = useStore1((state) => state.showChatModal);
  const setShowChatModal = useStore1((state) => state.setShowChatModal);
  const [channelName, setChannelName] = useState("");
  const [members, setMembers] = useState([userId]);

  const handleCreateNewChannel = async (e) => {
    e.preventDefault();
    try {
      createChannel(channelName, channelName, members, userId, "livestream");
      setChannelName("");
      setShowChatModal(false);
      setMembers([userId]);
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
                <ChatParticipants members={members} setMembers={setMembers} />
                <button
                  className={styles.btn}
                  type="submit"
                  disabled={!members.length || !channelName}
                >
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
        <div className="channelTitle">recent chats</div>
        <Participants />
      </div>
    </div>
  );
};
