import { ChannelContainer } from "./ChannelContainer";
import { ChannelListContainer } from "./ChannelListContainer";
import useStore1 from "../store";
import { useState } from "react";

export const Conatiners = () => {
  const showChannelList = useStore1((state) => state.showChannelList);
  return (
    <div>
      {showChannelList ? <ChannelListContainer /> : <ChannelContainer />}
    </div>
  );
};
