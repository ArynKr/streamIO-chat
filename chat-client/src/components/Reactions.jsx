import React from "react";

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
  const reactions = message.reaction_counts;
  const emojiKeys = Object.keys(reactions);
  const emojiValues = Object.values(reactions);
  // console.log(x, y, "dfsdfds");
  return (
    <div className={styles.emojiContainer}>
      {emojiKeys.map((em, i) => (
        <div className={styles.singleEmoji}>
          <span>{emojis[em]}</span>
          <span>{emojiValues[i]}</span>
        </div>
      ))}
    </div>
  );
};

export default Reactions;
