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
     
        
   
    
} 

from "stream-chat-react";
import useStore1 from "../store";
const EmptyState = () => (
    <div className="channel-empty__container">
        <p className="channel-empty__first">This is the beginning of your chat history.</p>
        <p className="channel-empty__second">Send messages, attachments, links, emojis, and more!</p>
    </div>
)
export const ChannelContainer = ()=>{
  const {channel} =useChatContext()
//   console.log(hello.setActiveChannel,"comign")

  const { message, threadList } = useMessageContext();
  console.log(message,threadList,"comingg")
  const { channel:channel1, watchers } = useChannelStateContext();
  console.log(channel1,"hii")

//   const channel = useStore1((state)=>state.activeChannel)
 


    return(
     
        <Channel
             channel={channel}  
            >
              <Window>
                <ChannelHeader />
                <MessageList />
                <MessageInput />
              </Window>
              <Thread />
                
            </Channel>
           
     
       
    )
}
 //   <Window>
            //     <ChannelHeader />
            //     <MessageList />
            //     <MessageInput />
            //   </Window>
            //   <Thread />