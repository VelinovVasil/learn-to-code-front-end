import { useNavigate } from "react-router-dom";
import "../styles/Question.css";
import { useAuth0 } from "@auth0/auth0-react";
import { getOneUser } from "../../services/userService";
import { getOneTag } from "../../services/tagService";
import { useEffect, useState } from "react";

const Question = (params) => {
  const question = params.question;

  const { getAccessTokenSilently } = useAuth0();
  const [author, setAuthor] = useState("");
  const [tags, setTags] = useState([]);
  const navigate = useNavigate();

  let tagsElements = "No tags";
  if (tags.length > 0) {
    tagsElements = tags
      .map((tag) => {
        return tag.name || "";
      })
      .join(", ");
  }

  const navigateToQuestion = (question, tags) => {
    localStorage.setItem("question", JSON.stringify(question));
    localStorage.setItem("tags", JSON.stringify(tags));
    localStorage.setItem("authorName", author.nickname);
    navigate(`/question/${question.id}`);
  };

  const formatDate = (dateTimeString) => {
    const date = new Date(dateTimeString);
    return date.toLocaleDateString() + " " + date.toLocaleTimeString();
  };

  useEffect(() => {
    getAccessTokenSilently().then((token) => {
      getOneUser(token, question.authorId).then((authorInfo) =>
        setAuthor(authorInfo)
      );

      let tagsTemp = [];
      for(let tagId of question.tagIds) {
        getOneTag(token, tagId).then(data => {
            tagsTemp.push(data);
            setTags(tagsTemp);
        })
      }
    });
  }, [getAccessTokenSilently, question]);

  return (
    <li key={question.id} className={"questionLi"}>
      {question && question.id ? (
        <div
          onClick={() => navigateToQuestion(question, tags)}
          className={"questionContainer"}
        >
          <p>Title: {question.title}</p>
          {author && <p className={"authorName"}>Author: {author.nickname}</p>}
          <p>Tags: {tagsElements}</p>
          <p>
            Date Published:{" "}
            {question.datePublished && formatDate(question.datePublished)}
          </p>
        </div>
      ) : null}
    </li>
  );
};

export default Question;
