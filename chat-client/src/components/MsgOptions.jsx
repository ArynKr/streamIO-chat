import { useChatContext } from "stream-chat-react";
import styles from "./MsgOptions.module.css";

export const MsgOptions = ({message,setShowMsgOptions}) => {
  const {client,channel}=useChatContext();
  let messageID = message.id;
  const deleteMessage = ()=>{
   (async function(){
    setShowMsgOptions(false)
   await client.deleteMessage(messageID);
  

    // await client.deleteMessage(messageID, true);
   })()
  }

   const messageReply = async()=>{
    const replyMessage = await channel.sendMessage({
         text: 'this is a reply',
         parent_id: messageID,
         show_in_channel:false,
   });

  
//    const replyMessage = await channel.sendMessage({
//     text: 'Hey, I am replying to a message!',
//     parent_id: parentID,
//     show_in_channel: false,
// });

  }
  return (
    <div className={styles.container}>
      {/* Emojis */}
      <div className={styles.emojis}>
        <button className={`${styles.btn} ${styles.emoji}`}></button>
        <button className={`${styles.btn} ${styles.emoji}`}></button>
        <button className={`${styles.btn} ${styles.emoji}`}></button>
        <button className={`${styles.btn} ${styles.emoji}`}></button>
        <button className={`${styles.btn} ${styles.emoji}`}></button>
        <button className={`${styles.btn} ${styles.emoji}`}></button>
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
          onClick={()=>messageReply()}
          className={`${styles.btn} ${styles.menu}`}>Reply</button>
        </div>
        {/* Copy */}
        <div>
          <button className={`${styles.btn} ${styles.menu}`}>Copy</button>
        </div>
        {/* Delete */}
        <div>
          <button 
          onClick={()=>deleteMessage()}
          className={`${styles.btn} ${styles.menu}`}>Delete</button>
        </div>
      </div>
    </div>
  );
};
