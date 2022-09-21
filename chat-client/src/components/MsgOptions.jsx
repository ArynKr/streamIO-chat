import styles from "./MsgOptions.module.css";

export const MsgOptions = () => {
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
          <button className={`${styles.btn} ${styles.menu}`}>Reply</button>
        </div>
        {/* Copy */}
        <div>
          <button className={`${styles.btn} ${styles.menu}`}>Copy</button>
        </div>
        {/* Delete */}
        <div>
          <button className={`${styles.btn} ${styles.menu}`}>Delete</button>
        </div>
      </div>
    </div>
  );
};
