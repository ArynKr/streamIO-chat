import { useState,useEffect } from "react"

import { useChatContext } from 'stream-chat-react';
const GLOBAL_ID = "global"

export const Participants = ()=>{
    const [channels,setChannels] = useState([])
    const [participants, setParticipants] = useState([])
    const hello= useChatContext();
    const {client,setActiveChannel} = hello;


    useEffect(() => {
        async function init(){
            const channels = await client.queryChannels();
            setChannels(channels)
            const filter = {id: {$in: [GLOBAL_ID]}}
            const globalChannel = await client.queryChannels(filter);
            setParticipants(Object.values(globalChannel[0]?.state?.members))
            setActiveChannel(globalChannel)
           
        }

        init();}, [])
        
    console.log(hello,client,"hello")

   
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