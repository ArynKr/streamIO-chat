import React from "react";
import { useChatContext } from "stream-chat-react";

import styles from "./Reactions.module.css";

// const emojisArr = [
//   "heart",
//   "smile",
//   "congrats",
//   "wow",
//   "thumbsUp",
//   "clap",
// ]

const emojis = {
  heart: "❤️",
  smile: "😀",
  congrats: "🎉",
  wow: "😲",
  thumbsUp: "👍",
  clap: "👏",
  victory:"✌️",
  amazing:"🤩",
  sad:"😢"
};

const Reactions = ({ message }) => {
  const { channel } = useChatContext();
 
  const reactions = message?.reaction_counts;

 
  const emojiKeys = reactions && Object.keys(reactions);
  const emojiValues = reactions && Object?.values(reactions);
  
  

  const isCurrentUsersEmoji = (em) => {
    if (message.own_reactions.find((reaction) => reaction.type === em)) {
      return true;
    }
    return false;
  };
  async function addReaction(reaction) {
    console.log(message);
    await channel.sendReaction(message.id, {
      type: reaction,
    });
  }
  const deleteReaction = async (em) => {
    if (isCurrentUsersEmoji(em)) {
      await channel.deleteReaction(message.id, em);
    }
    else{
      addReaction(em)
    }
  };

  return (
    <div className={styles.emojiContainer}>
      {emojiKeys?.map((em, i) => (
        <div
          key={i}
          onClick={() => {
            deleteReaction(em)}}
          className={styles.singleEmoji}
          style={{
            backgroundColor: isCurrentUsersEmoji(em)
              ? "rgba(30, 30, 30, 0.8)"
              : "rgba(64, 64, 64, 0.843)",
          }}
        >
          <span>{emojis[em]}</span>
          <span>{emojiValues[i]}</span>
        </div>
      ))}
    </div>
  );
};

export default Reactions;
