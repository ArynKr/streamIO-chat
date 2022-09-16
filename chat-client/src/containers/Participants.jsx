import { useState,useEffect } from "react"

import { useChatContext } from 'stream-chat-react';
const GLOBAL_ID = "global"

export const Participants = ()=>{
    const [channels,setChannels] = useState([])
    const [participants, setParticipants] = useState([])
    const hello= useChatContext();
    const {client} = hello;


    useEffect(() => {
        async function init(){
            const channels = await client.queryChannels();
            setChannels(channels)
            const filter = {id: {$in: [GLOBAL_ID]}}
            console.log(filter,"filter")
            const globalChannel = await client.queryChannels(filter);
            console.log(globalChannel[0]?.state?.members,"hello")
            setParticipants(Object.values(globalChannel[0]?.state?.members))
            console.log(globalChannel, "GC")
        }

        init();}, [])
        


   
    return(
    <div>
    {participants?.map((participant)=>
        <div className="participants_info" key={participant.user.id}>
        <img src={participant.user.image?participant.user.image:"https://www.aurubis.com/.resources/aurubis-light-module/webresources/assets/img/image-avatar-avatar-fallback.svg"} className="channel_image"/>
        <div>{participant.user.id}</div>
         
        </div>   
    )}
    </div>   
    
    )
}