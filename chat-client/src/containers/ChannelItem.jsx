import useStore1 from "../store";
export const ChannelItem = ({channel,setShow})=>{
    const setShowChannelList = useStore1((state)=>state.setShowChannelList)
    const {data:{image,name}} = channel;
    console.log(name)
    return (
        <div className="channelInfo" >
            <img src={image} className="channel_image" onClick={()=>setShowChannelList(false)}/>
            <p className="channel_name">{name}</p>
        </div>
    )
}