import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../styles/AskQuestionPage.css";
import NotLoggedIn from "../NotLoggedIn";
import { getAllTags } from "../../services/tagService";
import { questionSubmit } from "../../services/openaiService";
import { publishQuestion } from "../../services/questionService";

const AskQuestionPage = () => {
  const [questionText, setQuestionText] = useState("");
  const [conversationLog, setConversationLog] = useState([]);
  const [isPublished, setIsPublished] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);
  const [allTags, setAllTags] = useState([]);
  const [conversationContext, setConversationContext] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [questionTitle, setQuestionTitle] = useState("");
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();

  // Get userId from localstorage
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await getAccessTokenSilently();
        const fetchedTags = await getAllTags(token);
        setAllTags(fetchedTags);
      } catch (error) {
        console.error("Error fetching tags:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  function formatText(text) {
    const hasCodeBlock = text.includes("```");
    let formattedContent = text;

    if (hasCodeBlock) {
      // If the content has code block, wrap it in a <pre><code> element
      formattedContent = text.replace(
        /```([\s\S]+?)```/g,
        "</p><pre><code>$1</code></pre><p>"
      );
    }

    return formattedContent;
  }

  const handleQuestionSubmit = async () => {
    setIsLoading(true);

    try {
      const token = await getAccessTokenSilently();
      const obj = JSON.stringify({
        content: questionText,
        userId: userId,
        role: "USER",
      });

      const answerData = await questionSubmit(token, obj);
      const content = answerData.response.content;

      // Session id:
      localStorage.setItem("sessionId", answerData.input.sessionId);

      const updatedLog = [
        ...conversationLog,
        { sender: "User", message: questionText },
        {
          sender: "Chatbot",
          message: formatText(content),
        },
      ];
      setConversationLog(updatedLog);
      setConversationContext(answerData.context); // Save the context for continuing conversation
      setIsSubmitted(true);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleContinueConversation = async () => {
    setIsLoading(true);

    try {
      const token = await getAccessTokenSilently();
      const obj = JSON.stringify({
        content: questionText,
        userId: userId,
        role: "USER",
        sessionId: localStorage.getItem("sessionId"),
      });

      const answerData = await questionSubmit(token, obj);
      const content = answerData.response.content;

      const updatedLog = [
        ...conversationLog,
        { sender: "User", message: questionText },
        { sender: "Chatbot", message: formatText(content) },
      ];
      setConversationLog(updatedLog);
      setConversationContext(answerData.context); // Update the context for future continuation
    } catch (error) {
      console.error("Error continuing conversation:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePublish = async () => {
    if (selectedTags.length === 0) {
      window.alert("Please select tags for the question.");
      return;
    }

    try {
      const token = await getAccessTokenSilently();

      const publishObj = JSON.stringify({
        title: questionTitle,
        text: questionText,
        authorId: userId,
        tagIds: selectedTags,
        imageUrls: [],
      });

      await publishQuestion(token, publishObj);

      setIsPublished(true);
      navigate("/forum");
    } catch (error) {
      console.error("Error publishing question:", error);
    }
  };

  const handleTagClick = (tagId) => {
    setSelectedTags((prevTags) => {
      // Toggle the tag selection
      if (prevTags.includes(tagId)) {
        return prevTags.filter((id) => id !== tagId);
      } else {
        return [...prevTags, tagId];
      }
    });
  };

  if (!isAuthenticated) {
    return <NotLoggedIn />;
  }

  return (
    <div id={"askQuestionPage"}>
      <h2>Ask a Question</h2>
      {isLoading && <div className="loading">Loading&#8230;</div>}
      <section id="askQuestionSection">
        <input
          type="text"
          id="questionNameInput"
          value={questionTitle}
          onChange={(e) => setQuestionTitle(e.target.value)}
          placeholder="Enter your question title" // Placeholder for title input
        />
        <ReactQuill
          id={"askQuestionArea"}
          value={questionText}
          onChange={(value) => setQuestionText(value)}
          placeholder="Type your question here"
        />
        <div>
          <h3>Tags:</h3>
          <div className="tags-container">
            {allTags.map((tag) => (
              <button
                key={tag.id}
                className={selectedTags.includes(tag.id) ? "selected" : ""}
                onClick={() => handleTagClick(tag.id)}
              >
                {tag.name}
              </button>
            ))}
          </div>
        </div>
        <div className={"btnContainer"}>
          {!isSubmitted && (
            <button
              id={"btnSubmitQuestion"}
              className={"btnSubmit"}
              onClick={handleQuestionSubmit}
            >
              Submit Question
            </button>
          )}
          {/*<button id={'btnSubmitQuestion'} onClick={handleQuestionSubmit}>Submit Question</button>*/}
          {isSubmitted && (
            <button
              className={"btnSubmit"}
              onClick={handleContinueConversation}
            >
              Continue Conversation
            </button>
          )}
          {isSubmitted && (
            <Link to={"/forum"}>
              <button>My question is answered</button>
            </Link>
          )}
        </div>
      </section>
      {conversationLog.map((entry, index) => (
        // <div key={index}>
        //     <p>{entry.sender}: {entry.message}</p>
        // </div>
        <div
          key={index}
          className={
            entry.sender == "Chatbot" ? "chatbot-message" : "user-message"
          }
        >
          <p dangerouslySetInnerHTML={{ __html: entry.message }} />
        </div>
      ))}
      {/*<button onClick={handleContinueConversation}>Continue Conversation</button>*/}
      {isPublished && (
        <div>
          <h3>Question Published!</h3>
        </div>
      )}
      {isSubmitted && <button onClick={handlePublish}>Publish Question</button>}
    </div>
  );
};

export default AskQuestionPage;
