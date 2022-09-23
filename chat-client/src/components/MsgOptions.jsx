import { useChatContext } from "stream-chat-react";
import styles from "./MsgOptions.module.css";

export const MsgOptions = ({ message, setShowMsgOptions }) => {
  const { client, channel } = useChatContext();
  let messageID = message.id;
  const messageByLoginUser = message.user.id === client.user.id;
  const deleteMessage = () => {
    (async function () {
      setShowMsgOptions(false);
      await client.deleteMessage(messageID, true);

      // await client.deleteMessage(messageID, true);
    })();
  };

  const messageReply = async () => {
    const replyMessage = await channel.sendMessage({
      text: "this is a reply",
      parent_id: messageID,
      show_in_channel: false,
    });

    //    const replyMessage = await channel.sendMessage({
    //     text: 'Hey, I am replying to a message!',
    //     parent_id: parentID,
    //     show_in_channel: false,
    // });
  };

  const emojis = {
    heart: "❤️",
    smile: "😀",
    congrats: "🎉",
    wow: "😲",
    thumbsUp: "👍",
    clap: "👏",
  };

  async function addReaction(reaction) {
    console.log(message);
    await channel.sendReaction(messageID, {
      type: reaction,
    });
  }

  return (
    <div className={styles.container}>
      {/* Emojis */}
      <div className={styles.emojis}>
        <button
          onClick={() => addReaction("heart")}
          className={`${styles.btn} ${styles.emoji}`}
        >
          {emojis.heart}
        </button>
        <button
          onClick={() => addReaction("smile")}
          className={`${styles.btn} ${styles.emoji}`}
        >
          {emojis.smile}
        </button>
        <button
          onClick={() => addReaction("congrats")}
          className={`${styles.btn} ${styles.emoji}`}
        >
          {emojis.congrats}
        </button>
        <button
          onClick={() => addReaction("wow")}
          className={`${styles.btn} ${styles.emoji}`}
        >
          {emojis.wow}
        </button>
        <button
          onClick={() => addReaction("thumbsUp")}
          className={`${styles.btn} ${styles.emoji}`}
        >
          {emojis.thumbsUp}
        </button>
        <button
          onClick={() => addReaction("clap")}
          className={`${styles.btn} ${styles.emoji}`}
        >
          {emojis.clap}
        </button>
      </div>

      {/* Buttons */}
      <div className={styles.btns}>
        {/* Star */}
        <div>
          <button className={`${styles.btn} ${styles.menu}`}>Star</button>
        </div>
        {/* Reply */}
        <div>
          <button
            onClick={() => messageReply()}
            className={`${styles.btn} ${styles.menu}`}
          >
            Reply
          </button>
        </div>
        {/* Copy */}
        <div>
          <button className={`${styles.btn} ${styles.menu}`}>Copy</button>
        </div>
        {/* Delete */}
        <div>
          <button
            disabled={!messageByLoginUser}
            onClick={() => deleteMessage()}
            className={`${styles.btn} ${styles.menu}`}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
