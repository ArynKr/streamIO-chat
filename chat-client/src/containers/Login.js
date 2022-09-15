import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useStore1 from "../store";
import { useUserData } from "../store/slice/globalStates";
import axios from "axios";
import Storage from "../utils/storage";
import { StreamChat } from "stream-chat";

export const Login = () => {
  const [id, setId] = useState("");
  const [userName, setUserName] = useState("");
  const setUserId = useStore1((state) => state.setUserId);
  const navigate = useNavigate();
  const storage = new Storage();

  const loginHandler = async () => {
    storage.delete("chatToken");
    try {
      const { data } = await axios.post("http://localhost:5173/chat/login", {
        userId: id,
      });
      console.log(data);
      storage.save("chatToken", data.token);
      setUserId(id);
      navigate("/chat");
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: "2rem",
      }}
    >
      <h2>Please Login to Continue</h2>
      <div>
        <input
          type="text"
          placeholder="UserName"
          onChange={(e) => setUserName(e.target.value)}
          value={userName}
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="UserId"
          onChange={(e) => setId(e.target.value)}
          value={id}
        />
      </div>
      <div style={{ display: "flex" }}>
        <button disabled={id === ""} onClick={loginHandler}>
          Continue
        </button>
        <button onClick={() => navigate("/signup")}>Sign Up</button>
      </div>
    </div>
  );
};
