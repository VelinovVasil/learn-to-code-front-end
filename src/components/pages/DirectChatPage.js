import { PrettyChatWindow } from "react-chat-engine-pretty";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { getOneUser } from "../../services/userService";
import '../styles/DirectChatPage.css';

const DirectChatsPage = () => {
  const { getAccessTokenSilently } = useAuth0();
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAccessTokenSilently()
      .then((token) => {
        return getOneUser(token, localStorage.getItem("userId"));
      })
      .then((user) => {
        setUsername(user.nickname);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
        setLoading(false);
      });
  }, [getAccessTokenSilently]);


  if (loading) {
    return <div className="loading">Loading&#8230;</div>;
  }

  return (
    <div style={{height: "100vh", maxWidth: '100%'}}>
      {username && (
        <PrettyChatWindow
          projectId={'edc2befa-d0a4-44b8-90e6-095e062e7608'}
          username={username}
          secret={'password'}
          style={{ height: "100%"}}
        />
      )}
    </div>
  );
};

export default DirectChatsPage;
