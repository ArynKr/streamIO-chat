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
};

const Reactions = ({ message }) => {
  const { client, channel } = useChatContext();
  const messageByLoginUser = message.user.id === client.user.id;
  const reactions = message.reaction_counts;
  const emojiKeys = Object.keys(reactions);
  const emojiValues = Object.values(reactions);

  const deleteReaction = async (em) => {
    if (message.own_reactions.find((reaction) => reaction.type === em)) {
      await channel.deleteReaction(message.id, em);
    }
  };

  return (
    <div className={styles.emojiContainer}>
      {emojiKeys.map((em, i) => (
        <div
          key={i}
          onClick={() => deleteReaction(em)}
          className={styles.singleEmoji}
        >
          <span>{emojis[em]}</span>
          <span>{emojiValues[i]}</span>
        </div>
      ))}
    </div>
  );
};

export default Reactions;
