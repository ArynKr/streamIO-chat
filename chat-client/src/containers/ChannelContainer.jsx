import {
    Channel,
     Window,
    ChannelHeader,
    MessageList,
    MessageInput,
    Thread,
    useChatContext,
    
} 
from "stream-chat-react";
const EmptyState = () => (
    <div className="channel-empty__container">
        <p className="channel-empty__first">This is the beginning of your chat history.</p>
        <p className="channel-empty__second">Send messages, attachments, links, emojis, and more!</p>
    </div>
)
export const ChannelContainer = ()=>{
  const hello=useChatContext()
  console.log(hello,"from channel")
    return(
     
        <Channel
               
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