import { useState, useEffect } from "react";
import useStore1 from "../store";
import { useChatContext } from "stream-chat-react";
import { createChannel } from "../utils/create-channel";
const GLOBAL_ID = "global";

export const Participants = () => {
  const userId = useStore1((state) => state.userId);
  const [channels, setChannels] = useState([]);
  const [participants, setParticipants] = useState([]);
  const hello = useChatContext();
  const { client } = hello;
  const { setActiveChannel } = useChatContext();
  const setShowChannelList = useStore1((state) => state.setShowChannelList);

  useEffect(() => {
    async function init() {
      const channels = await client.queryChannels();
      setChannels(channels);
      const filter = { id: { $in: [GLOBAL_ID] } };
      const globalChannel = await client.queryChannels(filter);
      setParticipants(Object.values(globalChannel[0]?.state?.members));
    }

    init();
  }, []);

  const handlePersonalMessaging = async (participant) => {
    // console.log(participant);
    const members = [userId, participant.user.id];
    try {
      const res = await createChannel(
        `${userId}_${participant.user.id}`,
        members,
        userId,
        "messaging"
      );
      console.log(res, "ARYN");
      const filter = {
        type: "messaging",
        members: { $eq: members },
      };
      const [channel] = await client.queryChannels(filter);
      console.log(channel);
      setActiveChannel(channel);
      setShowChannelList(false);
    } catch (err) {
      console.log(err.response);
    }
  };

  return (
    <div>
      {participants?.map((participant) => (
        <div
          className="participants_info"
          key={participant.user.id}
          onClick={() => handlePersonalMessaging(participant)}
        >
          <img
            src={
              participant.user.image
                ? participant.user.image
                : "https://www.aurubis.com/.resources/aurubis-light-module/webresources/assets/img/image-avatar-avatar-fallback.svg"
            }
            alt="participant"
            className="channel_image"
          />
          <div>{participant.user.id}</div>
        </div>
      ))}
    </div>
  );
};
