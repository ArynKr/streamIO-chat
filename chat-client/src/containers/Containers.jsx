import { ChannelContainer } from "./ChannelContainer"
import { ChannelListContainer } from "./ChannelListContainer"
import useStore1 from "../store";
import { useState } from "react";

export const Conatiners = ()=>{
    const showChannelList = useStore1((state)=>state.showChannelList)
    const [show,setShow] = useState(true)
    return(
        <div>

        {showChannelList ?<ChannelListContainer
            setShow={setShow}
            // isCreating={isCreating}
            // setIsCreating={setIsCreating}
            // setCreateType={setCreateType}
            // setIsEditing={setIsEditing}
            />
            :
            <ChannelContainer/>
            // <Channel>
            //   <Window>
            //     <ChannelHeader />
            //     <MessageList />
            //     <MessageInput />
            //   </Window>
            //   <Thread />
            // </Channel>
            }
        </div>
    )
}