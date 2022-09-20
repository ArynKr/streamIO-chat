import { ChannelContainer } from "./ChannelContainer";
import { ChannelListContainer } from "./ChannelListContainer";
import useStore1 from "../store";

export const Containers = () => {
  const showChannelList = useStore1((state) => state.showChannelList);
  return (
    <div>
      {showChannelList ? <ChannelListContainer /> : <ChannelContainer />}
    </div>
  );
};
