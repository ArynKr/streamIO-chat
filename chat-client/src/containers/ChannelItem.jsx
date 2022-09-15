export const ChannelItem = ({channel})=>{
    console.log(channel.data.name, 'ARY');
    const {data:{image,name}} = channel;
    console.log(name)
    return (
        <div className="channelInfo">
            <img src={image} className="channel_image"/>
            <p className="channel_name">{name}</p>
        </div>
    )
}