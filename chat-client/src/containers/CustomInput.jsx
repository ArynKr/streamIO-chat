import {
  useEmojiContext,
  EmojiPicker,
  UploadsPreview,
  QuotedMessagePreview,
  ChatAutoComplete,
  SendButton,
  useMessageInputContext,
  useTranslationContext,
  Tooltip,
  EmojiIconLarge,
  useChannelActionContext,
  AttachmentActions,
  useChatContext,
} from "stream-chat-react";
import { ImageDropzone, FileUploadButton } from "react-file-utils";
import sendbtn from "../assets/senbtn.svg";
import { useEffect, useRef, useState } from "react";

export const CustomInput = () => {
  const { channel } = useChatContext();
  const { sendMessage } = useChannelActionContext();
  const [mediaFormat, setMediaFormat] = useState({});
  const [inputMessage, setInputMessage] = useState({
    text: "",
    attachments: [],
  });
  const fileInput = useRef(null);
  const {
    closeEmojiPicker,
    emojiPickerIsOpen,
    handleEmojiKeyDown,
    handleSubmit,
    openEmojiPicker,
  } = useMessageInputContext();

  const SubmitMessage = async (e) => {
    e.preventDefault();
    await channel.sendMessage(inputMessage);
    setInputMessage({ text: "", attachments: [] });
  };

  const handleFileInput = (e) => {
    console.log(e.target.files, "hello");

    setInputMessage({
      ...inputMessage,
      attachments: [...inputMessage.attachments, e.target.files[0]],
    });
  };
  //ARYAN VO EMOJI K DEKH LENA EK BAAR AT ANY PLACE IN INPUT...
  return (
    <form
      onSubmit={SubmitMessage}
      className="str-chat__input-flat str-chat__input-flat--send-button-active"
      style={{ display: "flex", alignItems: "center", gap: "10px" }}
    >
      <div>
        <label
          htmlFor="file"
          style={{
            background: "grey",
            width: "70px",
            height: "20px",
            borderRadius: "14px",
            padding: "4px 9px 5px",
            cursor: "pointer",
          }}
          onClick={(e) => fileInput.current && fileInput.current.click()}
        >
          +
          <input
            type="file"
            style={{ display: "none" }}
            id="file"
            //  value={inputMessage.attachments}
            onChange={handleFileInput}
            // onChange={(e)=>setInputMessage({...inputMessage,attachments:e.target.files[0]})}
          />
        </label>
      </div>

      <div
        className="str-chat__input-flat--textarea-wrapper"
        style={{ positon: "relative" }}
      >
        <input
          type="text"
          placeholder="Send Message..."
          className="messageInput"
          value={inputMessage.text}
          onChange={(e) =>
            setInputMessage({ ...inputMessage, text: e.target.value })
          }
        />
        <span
          className="str-chat__input-flat-emojiselect"
          onClick={emojiPickerIsOpen ? closeEmojiPicker : openEmojiPicker}
          onKeyDown={handleEmojiKeyDown}
          role="button"
          tabIndex={0}
          style={{
            position: "absolute",
            top: "4px",
            left: "189px",
            zIndex: "999",
          }}
        >
          <EmojiIconLarge />
        </span>

        <div
          onClick={(e) =>
            setInputMessage({
              ...inputMessage,
              text: inputMessage.text + e.target.innerText,
            })
          }
        >
          {" "}
          <EmojiPicker />
        </div>
      </div>
      <button
        style={{
          width: "30px",
          height: "30px",
          padding: "4px 9px 5px",
          background: "#007AFF",
          borderRadius: "14px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          border: "none",
        }}
        type="submit"
      >
        <img src={sendbtn} alt="sendIcon" height="14px" />
      </button>
    </form>
  );
};

export const ReplyForm = ({ message }) => {
  return <div></div>;
};
