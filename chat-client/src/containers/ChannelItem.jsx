import useStore1 from "../store";
export const ChannelItem = ({channel,setShow})=>{
    const setShowChannelList = useStore1((state)=>state.setShowChannelList)
    const setActiveChannel = useStore1((state)=>state.setActiveChannel)
    const activeChannel= useStore1((state)=>state.activeChannel)
    const {data:{image,name}} = channel;
 
    return (
        <div className="channelInfo" >
            <img src={image} className="channel_image" onClick={()=>{
                setActiveChannel(channel)
                setShowChannelList(false)}}/>
            <p className="channel_name">{name}</p>
        </div>
    )
}