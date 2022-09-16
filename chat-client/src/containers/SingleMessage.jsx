import { MessageInput ,useMessageContext,useChannelStateContext} from "stream-chat-react"



export const SingleMessage = ({})=>{
    const { message, threadList } = useMessageContext();
  console.log(message,threadList,"comingg")
  const { channel:channel1, watchers } = useChannelStateContext();
  console.log(channel1,"hii")
    return(
  
    <>
   Hello</>
    )
}