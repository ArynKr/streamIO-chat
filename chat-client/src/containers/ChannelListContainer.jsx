import { ChannelList } from "stream-chat-react"
import { Participants } from "./Participants"
import { TeamChannelList } from "./TeamChannelList"

export const Search = ()=>{
    return(
        <div>
        <input className="channelSearch" placeholder="Search"/>
        </div>
    )
}
export const ChannelListContainer = ()=>{
    return(
        <div className="channelListContainer">
          <div>Inbox</div>
          <Search/>
          <div className="channelTitle">channels</div>
         
          <button className="channelCreateButton">Create New Channel</button>
          <TeamChannelList/>
          <div className="channelTitle">all participants</div>
          <Participants/>
          </div>
        
    )
}