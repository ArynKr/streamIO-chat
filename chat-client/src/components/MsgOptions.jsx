import { useChatContext } from "stream-chat-react";
import useStore1 from "../store";
import styles from "./MsgOptions.module.css";

export const MsgOptions = ({ message, setShowMsgOptions,setReplied,setShowReplyModal}) => {
  const { client, channel } = useChatContext();
  let messageID = message.id;
  const setIsReplying = useStore1(state=>state.setIsReplying);
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
    setReplied(true)

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
    victory:"✌️",
    amazing:"🤩",
    sad:"😢"
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
        <button
          onClick={() => addReaction("victory")}
          className={`${styles.btn} ${styles.emoji}`}
        >
          {emojis.victory}
        </button>

        <button
          onClick={() => addReaction("amazing")}
          className={`${styles.btn} ${styles.emoji}`}
        >
          {emojis.amazing}
        </button>
        <button
          onClick={() => addReaction("sad")}
          className={`${styles.btn} ${styles.emoji}`}
        >
          {emojis.sad}
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
            onClick={() => {
              setIsReplying(true)
              setShowReplyModal(true)
              setShowMsgOptions(false)
              messageReply()}}
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
            onClick={() => {
              setShowMsgOptions(false)
              deleteMessage()}}
            className={`${styles.btn} ${styles.menu}`}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
