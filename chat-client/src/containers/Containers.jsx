import { ChannelContainer } from "./ChannelContainer";
import useStore1 from "../store";
import { ChannelList, useChatContext } from "stream-chat-react";
import { useEffect } from "react";
import { TeamChannelList } from "./TeamChannelList";
import { ChannelItem } from "./ChannelItem";

export const Containers = () => {
  const showChannelList = useStore1((state) => state.showChannelList);
  const { client } = useChatContext();
  const userId = client.user.id;

  const CustomListContainer = (props) => {
    console.log(props, "llkll");
    return <></>;
  };
  const CustomListItem = (props) => {
    // console.log(props, "llkll123");
    return <></>;
  };

  return (
    <div>
      {showChannelList ? (
        <ChannelList
          Preview={ChannelItem}
          filters={{ type: "livestream", members: { $in: [userId] } }}
          // List={CustomListContainer}
          // Preview={CustomListItem}
        />
      ) : (
        <ChannelContainer />
      )}
    </div>
  );
};
