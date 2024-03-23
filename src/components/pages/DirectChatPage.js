import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { getOneUser } from "../../services/userService";

import { ChatEngine, getOrCreateChat } from "react-chat-engine";

const DirectChatPage = () => {
  const [username, setUsername] = useState("");
  const { getAccessTokenSilently } = useAuth0();

  function createDirectChat(creds) {
    getOrCreateChat(
      creds,
      { is_direct_chat: true, usernames: [username] },
      () => setUsername("")
    );
  }

  useEffect(() => {
    getAccessTokenSilently().then((token) => {
      getOneUser(token, localStorage.getItem("userId")).then((user) =>
        setUsername(user.nickname)
      );
    });
  }, [getAccessTokenSilently]);

  function renderChatForm(creds) {
    return (
      <div>
        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button onClick={() => createDirectChat(creds)}>Create</button>
      </div>
    );
  }

  return (
    <ChatEngine
      height="100vh"
      userName={username}
      userSecret="password"
      projectID="edc2befa-d0a4-44b8-90e6-095e062e7608"
      renderNewChatForm={(creds) => renderChatForm(creds)}
    />
  );
};

export default DirectChatPage;
