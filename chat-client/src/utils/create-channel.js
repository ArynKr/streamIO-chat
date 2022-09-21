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
    const { data } = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/chat/channel`,
      {
        name,
        members,
        created_by_id,
        type,
        image,
        id,
      }
    );
    return data.channelData;
  } catch (err) {
    throw err;
  }
};
