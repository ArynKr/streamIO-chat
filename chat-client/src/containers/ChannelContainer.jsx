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
import { useState,useEffect, useRef} from "react";

import threedot from "../assets/three-dots.svg";
import { useEmojiContext, useMessageInputContext} from "stream-chat-react";
import { Suspense } from "react";
import { MsgOptions } from "../components/MsgOptions";
  
// export const CustomEmojiPicker = () => {
//   const { Emoji, emojiConfig } = useEmojiContext
//   const { onSelectEmoji } = useMessageInputContext();

//   const { emojiData } = emojiConfig || {};
//   const customEmojis = ['fried_egg', 'croissant', 'bacon', 'waffle', 'pancakes', 'doughnut'];

//   return (
//     <div className='wrapper'>
//       {customEmojis.map((emoji,i) => (
//         <Suspense fallback={null} key={i}>
//           <Emoji onClick={onSelectEmoji} emoji={emoji} size={40} data={emojiData} />
//         </Suspense>
//       ))}
//     </div>
//   );
// };
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

const CustomMessage = (props) => {
    
const {client,channel}=useChatContext()
  const {message}=useMessageContext();
  const [showMsgOptions, setShowMsgOptions] = useState(false);
  const [loadMore,setLoadMore] = useState(1);
  const [replyArr,setReplyArr] = useState([])
  let messageByLoginUser = message.user.id === client.user.id;
  const ref = useRef()
  


  async function getReplies(){
 
  const reply = await channel.getReplies(message.id, {limit:loadMore});
  setReplyArr(reply)
  console.log(replyArr,"rep")
  setLoadMore((loadMore)=>loadMore+1)
  
  }

  function hideReply(){
    setReplyArr([])
  }
  

  // function hideReply(){
  //   setReplyArr([])
  //   setLoadMore(1)
  // }
  
  // let flagToDisplayImage = true;

  // let userOfMessage = message.user.id;
  
  // console.log(me,userOfMessage,"what")
  // if(me === userOfMessage){
  //    if(!arr.includes(message)){
  //     arr.push(message)
  //    }

  // }else{
  //   messageArray.push(arr)
  //   arr = [];
  //   arr.push(message)
  // }
  // me = message.user.id
  // let flag = true
  // console.log(flagToDisplayImage,"what")
  // console.log(messageArray,"arr")


    useEffect(() => {
      const closeModal = (e) => {
        if (ref.current && !ref.current.contains(e.target)) {
          setShowMsgOptions(false);
        }
      };
      document.addEventListener("mousedown", closeModal);
      return () => document.removeEventListener("mousedown", closeModal);
    }, [ref, setShowMsgOptions]);
  
  return(
  //  <div>
  //  {
  //   messageArray?.map((singleMessageArray)=>{
  //     let length = singleMessageArray.length;
  //     for(let i = 0 ; i<length;i++){
  //       let message = singleMessageArray[i];
  //       console.log(message,"mmmm")
  //       if(i===0){
  //         return (
  //           <div>
  //         <div style={{display:"flex",flexDirection:"row",gap:"0 10px",marginBottom:"10px",alignItems:"center"}} >
  //  <img src={message.user.image?message.user.image :"https://www.aurubis.com/.resources/aurubis-light-module/webresources/assets/img/image-avatar-avatar-fallback.svg"} style={{width:"20px",height:"20px",borderRadius:"50%"}}/>
  //   <div>{message.user.id}</div></div>
  //   <div style={{marginBottom:"0px",backgroundColor: "grey",width:"90%",borderRadius:'8px',height:"fit-content",color:"white",wordBreak:"break-all",padding:"10px",marginLeft:"1.5rem",backgroundColor:messageByLoginUser?"black":"grey"}}>{message.text}</div>
  //   </div>)
  //       }
  //       else{
  //         <div style={{marginBottom:"0px",backgroundColor: "grey",width:"90%",borderRadius:'8px',height:"fit-content",color:"white",wordBreak:"break-all",padding:"10px",marginLeft:"1.5rem",backgroundColor:messageByLoginUser?"black":"grey"}}>{message.text}</div>
  //       }

  //     }
  //   })
  // }
  //  </div>


  //TRIED OF SHOWING A SINGLE LOGO ON MESSAGE BY SAME USER AT SAME TIME
     <div style={ {marginLeft:messageByLoginUser ?"1.5rem":"0",marginRight:messageByLoginUser?"0":"1.5rem",width:"90%"} } ref={ref}>
    
   <div style={{display:"flex",flexDirection:"row",gap:"0 10px",marginBottom:"10px",alignItems:"center",justifyContent:"space-between",marginTop:"1rem"}} >
   <div style={{display:"flex",alignItems:"center",gap:"0.5rem"}}>
    { !messageByLoginUser && <img src={message.user.image?message.user.image :"https://www.aurubis.com/.resources/aurubis-light-module/webresources/assets/img/image-avatar-avatar-fallback.svg"} style={{width:"20px",height:"20px",borderRadius:"50%"}}/>}
    <div style={{fontSize:"0.7rem",marginLeft: messageByLoginUser&&"1.6rem"}}>{message.user.id}</div>
    </div>
  
    <div onClick={()=>setShowMsgOptions(!showMsgOptions)}> <img src={threedot} style={{cursor:'pointer'}}/></div>
  </div>
  {showMsgOptions && <MsgOptions message={message} setShowMsgOptions={setShowMsgOptions}/>}
     
    
   <div style={{marginBottom:"0px",backgroundColor: "grey",width:"90%",borderRadius:'8px',height:"fit-content",color:"white",wordBreak:"break-all",padding:"10px",marginLeft:"1.5rem",backgroundColor:messageByLoginUser?"black":"grey"}}>{message.type === "deleted"?"Message is deleated":message.text}</div>

   { replyArr?.messages?.map((reply,i)=>
    <div key={i} style={{marginBottom:"0px",backgroundColor: "grey",width:"85%",borderRadius:'8px',height:"fit-content",color:"white",wordBreak:"break-all",padding:"10px",marginLeft:"2.4rem",backgroundColor:messageByLoginUser?"black":"grey",marginTop:"0.2rem"}}>{reply.text}</div>
   )}
   {loadMore <= message.reply_count && <div style={{color:"red",fontSize:"0.6rem",cursor:"pointer",background:"black",width:"95%",height:"1.5rem",display:"flex",alignItems:"center",marginTop:"1rem",paddingInline:"1rem"}} onClick={()=>getReplies()}>View Reply</div>}

  {loadMore === replyArr?.messages?.length && <div style={{color:"red",fontSize:"0.6rem",cursor:"pointer"}} onClick={()=>hideReply()}>Hide Reply</div>}


   </div>
    
   
    
  )
};

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
    <Channel channel={channel} Message={CustomMessage} >
      <Window>
        <CustomChannelHeader />
        
        <MessageList />
        <MessageInput />
      </Window>
      <Thread />
    </Channel>
  );
};

