import { useState, useEffect } from "react";
import useStore1 from "../store";
import { useChatContext } from "stream-chat-react";
import { createChannel } from "../utils/create-channel";
const GLOBAL_ID = "global";

export const Participants = () => {
  const userId = useStore1((state) => state.userId);

  const [participants, setParticipants] = useState([]);
  const { client } = useChatContext();
  const { setActiveChannel } = useChatContext();
  const setShowChannelList = useStore1((state) => state.setShowChannelList);
  const [messagingChannel, setMessagingChannel] = useState([]);
  // const [userInMessagingChannel,setUserInMessagingChannel ] = useState([])

  useEffect(() => {
    async function init() {
      const filter = {
        id: { $in: [GLOBAL_ID] },
        members: { $in: [client.user.id] },
      };
      const globalChannel = await client.queryChannels(filter);
      let participantData = Object.values(globalChannel[0]?.state?.members);
      participantData = participantData.filter(
        (data) => data.user.id !== client.user.id
      );
      let onlineParticipants = participantData.filter(
        (data) => data.user.online
      );
      let offlineParticipants = participantData.filter(
        (data) => !data.user.online
      );
      setParticipants([...onlineParticipants, ...offlineParticipants]);
      const filter1 = { type: "messaging", members: { $in: [client.user.id] } };
      const sort = [{ last_message_at: -1 }];
      const channels = await client.queryChannels(filter1, sort, {});
      setMessagingChannel(channels);
      //   let members = []
      //   channels.map((channel)=>{
      //     console.log("working")
      //     if(channel){
      //      let data = channel.state.members
      //      members.push((Object.values(data))[0].user.id)

      //     }
      //   }

      //   )
      //  setUserInMessagingChannel(members)
      // console.log(userInMessagingChannel,"found")
      //  userInMessagingChannel?.map((user)=>{
      //   let found = participants?.filter((data)=>data.user.id === user)

      //   console.log(found,"found")
      //  })
      // let foundData = []
      //    channels.map((channel) => {
      //     let membersInChannel  = Object.values(channel.state.members)
      //   // if(member.user.id !== membersInChannel[0].user.id){
      //   //  setParticipants(()=>[...participants,membersInChannel[0].user])
      //   //  }
      //   console.log(channel,"hello")

      //   let foundData1 = participantData.find((data)=>data.user.id !== membersInChannel[0].user.id);

      //   console.log(foundData1,"hello")
      // foundData.push(foundData1)
      //   console.log(foundData,"found")
      //   if(foundData){

      //     setParticipants(...participants,foundData)
      //   }
      //   else{
      //     console.log(foundData,"found")
      //     console.log(membersInChannel[0].user,"how")

      //   }

      //  })

      // console.log(participants,"hhh")

      // setParticipantToMap(newChannel)
      // console.log(finalParticipants,"hm")
      // setParticipantToMap((participanttomap)=>[participanttomap,...finalParticipants.user])
    }

    init();
  }, [client]);

  //   const filter1 = { type: 'messaging', members: { $in: ['shrinkhla'] } };
  //   const sort = [{ last_message_at: -1 }];
  //   const channels = await chatClient.queryChannels(filter, sort, {
  //     watch: true, // this is the default
  //     state: true,
  // });

  // console.log(messagingChannel,"channel")
  const handlePersonalMessaging = async (participant) => {
    const members = [userId, participant.user.id];
    try {
      const res = await createChannel(
        null,
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

  function handleChannelClickDiv(channel) {
    setActiveChannel(channel);
    setShowChannelList(false);
  }
  return (
    <div>
      <div className="channelMessageContainer">
        {messagingChannel
          ? messagingChannel?.map((channel) => (
              <div
                className="participants_info"
                key={channel.id}
                onClick={() => handleChannelClickDiv(channel)}
              >
                <img
                  src={
                    Object.values(channel.state.members)[0].user.image ||
                    "https://www.aurubis.com/.resources/aurubis-light-module/webresources/assets/img/image-avatar-avatar-fallback.svg"
                  }
                  alt="participant"
                  className="channel_image"
                />
                <div>
                  {Object.values(channel.state.members)[0].user.id ===
                  client.user.id
                    ? Object.values(channel.state.members)[1].user.id
                    : Object.values(channel.state.members)[0].user.id}
                </div>
              </div>
            ))
          : null}
      </div>

      <div className="channelTitle">{`all participants (${participants?.length})`}</div>
      <div className="channelMessageContainer">
        {participants?.map((participant) => (
          <div
            className="participants_info"
            key={participant.user.id}
            onClick={() => handlePersonalMessaging(participant)}
          >
            <img
              src={
                participant?.user?.image
                  ? participant?.user?.image
                  : "https://www.aurubis.com/.resources/aurubis-light-module/webresources/assets/img/image-avatar-avatar-fallback.svg"
              }
              alt="participant"
              className="channel_image"
            />
            <div>{participant.user.id}</div>
            <div style={{ color: "green" }}>
              {participant.user.online ? "online" : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
