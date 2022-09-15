import { useEffect, useState } from 'react';
import { ChannelList, useChatContext } from 'stream-chat-react';
import { ChannelItem } from './ChannelItem';
export const TeamChannelList = ({children})=>{
    const [channels,setChannels] = useState([])
    const { client } = useChatContext();
    // const channels = await client.queryChannels();
    useEffect(()=>{
        (async function(){
            const channels = await client.queryChannels();
            setChannels(channels)
        })()
    },[])
    // (async function(){
    //     const channels = await client.queryChannels();
    //     setChannel(channels)
    // })()
    console.log(channels,"channels")
    return (
    <div>
    {channels?.map((channel)=>
        <ChannelItem channel={channel} key={channel?.id}/>
    )}
    </div>
    )
}