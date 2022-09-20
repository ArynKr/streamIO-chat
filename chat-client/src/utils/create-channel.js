import axios from "axios";

export const createChannel = async (
  id,
  name,
  members,
  created_by_id,
  type,
  image
) => {
  console.log(name);
  console.log(created_by_id);
  try {
    const { data } = await axios.post("http://localhost:5173/chat/channel", {
      name,
      members,
      created_by_id,
      type,
      image,
      id,
    });
    return data.channelData;
  } catch (err) {
    throw err;
  }
};
