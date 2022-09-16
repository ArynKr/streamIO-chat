import {
    Channel,
     Window,
    ChannelHeader,
    MessageList,
    MessageInput,
    Thread,
    useChatContext,
    useMessageContext,
   
        Attachment,
        Avatar,
        messageHasReactions,
        MessageOptions,
        MessageRepliesCountButton,
        MessageStatus,
        MessageText,
        MessageTimestamp,
        ReactionSelector,
        SimpleReactionsList,
        useChannelStateContext,
        ReactionsList,
        MML,
        ChannelActionContext,
        useChannelActionContext,
     
        
   
    
} 

from "stream-chat-react";
import "./Messages.css"
import useStore1 from "../store";
import { MessageUI } from "./MessageUI";
const EmptyState = () => (
    <div className="channel-empty__container">
        <p className="channel-empty__first">This is the beginning of your chat history.</p>
        <p className="channel-empty__second">Send messages, attachments, links, emojis, and more!</p>
    </div>
)
const CustomMessage = (props) =>{
    const { closeThread, loadMoreThread } = useChannelActionContext();
    const user = useStore1((state)=>state.userId)
    console.log(closeThread,"free")
    console.log(props,"props")
    const { message, threadList } = useMessageContext();
    console.log(message,"shrinkhla")
    const { messages } = useChannelStateContext();
    console.log(messages,"comingg")
    console.log(threadList,"HAHA")
   // <MessageStatus />
        // <Avatar />
        // <div>
        //   <MessageOptions />
        //   <div>
          
        
        //   </div>
        //   <div>
      
        //     <MessageText />
        //     <MML />
          
        //   </div>
        // </div>
        // <MessageRepliesCountButton />
        // <div>
        //   <MessageTimestamp />
        // </div>
    
    // const presentUserID=parseJwt(storage.get("chatToken")).user_id
    console.log(message?.user?.id === user,"isYes")
    console.log(message.user.id,"..........",user)
    return(
        <div className={`message_container ${message?.user?.id === user ? "message_container-right" :"message_container-left"}`}>
         <Avatar />
        {message.text}
      </div>
    )
}
export const ChannelContainer = ()=>{
  const {channel} =useChatContext()
//   console.log(hello.setActiveChannel,"comign")


//   const channel = useStore1((state)=>state.activeChannel)
 


    return(
     
        <Channel
             channel={channel}  
             Message={CustomMessage}
            >
           <MessageUI/>
                
            </Channel>
           
     
       
    )
}
 //   <Window>
            //     <ChannelHeader />
            //     <MessageList />
            //     <MessageInput />
            //   </Window>
            //   <Thread />