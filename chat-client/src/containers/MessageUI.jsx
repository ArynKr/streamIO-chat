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
        Message,
     
        
   
    
} from "stream-chat-react";
import { SingleMessage } from "./SingleMessage";

export const MessageUI = ()=>{

  
    
    return(
        <>
        <Window>
        <ChannelHeader />
 
        <MessageList>
        
        <SingleMessage/>
        </MessageList>
    
       
       
        <MessageInput/>

      
      
      
    
      </Window>
      <Thread />
        </>
    )
}