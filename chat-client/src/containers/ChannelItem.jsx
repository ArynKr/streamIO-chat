import { useChatContext } from "stream-chat-react";
import useStore1 from "../store";
export const ChannelItem = ({channel,setShow})=>{
    const setShowChannelList = useStore1((state)=>state.setShowChannelList)
    const setActiveChannelLocalState = useStore1((state)=>state.setActiveChannel)
    const activeChannel= useStore1((state)=>state.activeChannel)
    const {data:{image,name}} = channel;
    const {setActiveChannel}=useChatContext()
 
 
    return (
        <div className="channelInfo" >
            <img src={image} className="channel_image" onClick={()=>{
                setActiveChannel(channel)
                setActiveChannelLocalState(channel)
                setShowChannelList(false)}}/>
            <p className="channel_name">{name}</p>
        </div>
    )
}