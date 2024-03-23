import { PrettyChatWindow } from "react-chat-engine-pretty";

const DirectChatPage = (props) => {
  return (
    <div style={{ height: "100vh" }}>
      <PrettyChatWindow
        projectId={"edc2befa-d0a4-44b8-90e6-095e062e7608"}
        username={"bonda"} // adam
        secret={"password"} // pass1234
        style={{ height: "100%" }}
      />
    </div>
  );
};

export default DirectChatPage;

