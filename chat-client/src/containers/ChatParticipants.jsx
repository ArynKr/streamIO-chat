import { useState, useEffect } from "react";
import { useChatContext } from "stream-chat-react";
import styles from "./ChatParticipants.module.css";
import useStore1 from "../store";

const GLOBAL_ID = "global";

const Participants = ({ participant, members, setMembers }) => {
  const [checked, setChecked] = useState(false);
  const changeHandler = () => {
    if (!checked) {
      setMembers([...members, participant.user.id]);
    } else {
      let filterMember = members.filter(
        (member) => member !== participant.user.id
      );
      setMembers(filterMember);
    }
    setChecked(!checked);
  };
  return (
    <>
      <input
        type="checkbox"
        id={participant.user.id}
        checked={checked}
        onChange={(e) => {
          changeHandler(e);
        }}
      />
      <p>
        {participant.user.name ? participant.user.name : participant.user.id}
      </p>
    </>
  );
};

export const ChatParticipants = ({ members, setMembers }) => {
  const userId = useStore1((state) => state.userId);
  const [participants, setParticipants] = useState([]);
  const { client } = useChatContext();
  useEffect(() => {
    async function init() {
      const filter = {
        id: { $in: [GLOBAL_ID] },
        members: { $in: [client.user.id] },
      };
      const globalChannel = await client.queryChannels(filter);
      setParticipants(
        Object.values(globalChannel[0]?.state?.members).filter(
          (participant) => participant.user.id !== client.user.id
        )
      );
    }

    init();
  }, [client]);

  return (
    <div className={styles.chatParticipants}>
      {participants?.map((participant) => (
        <div key={participant.user.id} className={styles.chatParticipants_info}>
          <Participants
            participant={participant}
            members={members}
            setMembers={setMembers}
          />
        </div>
      ))}
    </div>
  );
};
