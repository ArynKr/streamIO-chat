import {
  Channel,
  Window,
  MessageList,
  MessageInput,
  Thread,
  useChatContext,
  useChannelStateContext,
  useMessageContext,
} from "stream-chat-react";
import useStore1 from "../store";
import back from "../assets/back-icon.png";
import { useState, useEffect, useRef } from "react";

import threedot from "../assets/three-dots.svg";

import { MsgOptions } from "../components/MsgOptions";
import Reactions from "../components/Reactions";
import { ReplyContainer } from "./ReplyContainer";
import { CustomInput } from "./CustomInput";



const CustomMessage = () => {
  const { client, channel } = useChatContext();
  const { message } = useMessageContext();
  const [showMsgOptions, setShowMsgOptions] = useState(false);
  const [loadMore, setLoadMore] = useState(1);
  const [replyArr, setReplyArr] = useState([]);
  const messageByLoginUser = message.user.id === client.user.id;
  const ref = useRef();
  const [replied,setReplied] = useState(false)
  const [showReplyModal,setShowReplyModal] = useState(false)
  
  async function getReplies() {
    const reply = await channel.getReplies(message.id, { limit: loadMore });
    setReplyArr(reply);
    setLoadMore((loadMore) => loadMore + 1);
  }
 function hideReply() {
    setReplyArr([])
    setLoadMore(1)
  }

  useEffect(() => {
    const closeModal = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setShowMsgOptions(false);
      }
    };
    document.addEventListener("mousedown", closeModal);
    return () => document.removeEventListener("mousedown", closeModal);
  }, [ref, setShowMsgOptions]);
  
  const hasReactions = message?.reaction_counts && (Object.values(message?.reaction_counts )).length > 0;
  
  return (
    <div
      style={{
        marginLeft: messageByLoginUser ? "1.3rem" : "0",
        marginRight: messageByLoginUser ? "0" : "1.3rem",
        width: "90%",
      }}
      ref={ref}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "0 10px",
          marginBottom: "10px",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: "1rem",
          
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          {!messageByLoginUser && (
            <img
              src={
                message.user.image
                  ? message.user.image
                  : "https://www.aurubis.com/.resources/aurubis-light-module/webresources/assets/img/image-avatar-avatar-fallback.svg"
              }
              style={{ width: "20px", height: "20px", borderRadius: "50%", marginLeft: "5px"}}
              alt="display pic"
            />
          )}
          <div
            style={{
              fontSize: "0.7rem",
              marginLeft: messageByLoginUser && "1.6rem",
             
            }}
          >
            {message.user.id}
          </div>
        </div>

        <div onClick={() => setShowMsgOptions(!showMsgOptions)}>
          {" "}
          <img src={threedot} style={{ cursor: "pointer" }} alt="more" />
        </div>
      </div>
      {showMsgOptions && (
        <MsgOptions message={message} setShowMsgOptions={setShowMsgOptions} setReplied={setReplied} setShowReplyModal={setShowReplyModal} />
      )}

      

      <div
        style={{
          marginBottom: hasReactions?"19px":"0px",
          width: "90%",
          borderRadius: "8px",
          height: "fit-content",
          color: "white",
          wordBreak: "break-all",
          padding: "10px",
          marginLeft: "1.5rem",
          position:"relative",
          backgroundColor: messageByLoginUser ? "black" : "grey",

        }}
      >
        {message.type === "deleted" ? "Message is deleated" : message.text}
        {message?.attachments.length > 0 && message?.attachments?.map((attachment)=>
          <img src={attachment.image_url} style={{height:"10rem",width:'100%'}}/>
          )
        }
        <Reactions message={message} />
      </div>

      {replyArr?.messages?.map((reply, i) => (
        <div
          key={i}
          style={{
            marginBottom: "0px",
            width: "85%",
            borderRadius: "8px",
            height: "fit-content",
            color: "white",
            wordBreak: "break-all",
            padding: "10px",
            marginLeft: "2.4rem",
            backgroundColor: messageByLoginUser ? "black" : "grey",
            marginTop: "0.2rem",
          }}
        >
          {reply.text}
        </div>
      ))}
    
      { replied ? 
        
        (
        message?.reply_count !== replyArr?.messages?.length ? (
        <div
          style={{
            color: "red",
            fontSize: "0.6rem",
            cursor: "pointer",
            background: "black",
            width: "95%",
            height: "1.5rem",
            display: "flex",
            alignItems: "center",
            marginTop: "1rem",
            paddingInline: "1rem",
            marginLeft: messageByLoginUser?"12px":"2px",
          }}
          onClick={() => getReplies()}
        >
         {replyArr?.messages?.length > 0  ? "Load More Replies":"View Reply"}
        </div>
      ) :

(
        <div
        style={{
          color: "red",
          fontSize: "0.6rem",
          cursor: "pointer",
          background: "black",
          width: "95%",
          height: "1.5rem",
          display: "flex",
          alignItems: "center",
          marginTop: "1rem",
          paddingInline: "1rem",
          marginLeft: messageByLoginUser?"12px":"2px",
        }}
          onClick={() => hideReply()}
        >
          Hide Reply
        </div>
      )
      ):null
    }

    </div>
  );
};

export const ChannelContainer = () => {
  const { channel, client } = useChatContext();
  const isReplying = useStore1(state=>state.isReplying);

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
    <Channel channel={channel} Message={CustomMessage} Input={CustomInput}>
      <Window>
        <CustomChannelHeader />
        <MessageList />
        
       {!isReplying ?<MessageInput placeholder="Type Message..." />:null}
      </Window>
  </Channel>
  );
};
