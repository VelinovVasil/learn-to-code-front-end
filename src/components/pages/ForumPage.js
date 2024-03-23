import { useState, useEffect } from "react";
import Navbar from "../Navbar";
import "../styles/ForumPage.css";
import Footer from "../Footer";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import "react-quill/dist/quill.snow.css";
import { getQuestions } from "../../services/questionService";
import { getAllTags } from "../../services/tagService"; // Import Quill's snow theme CSS
import Question from "../shared/Question";

const ForumPage = () => {
  const [questions, setQuestions] = useState([]);
  const [allTags, setAllTags] = useState({});
  const [selectedTagIds, setSelectedTagIds] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { getAccessTokenSilently } = useAuth0();

  const handleCheckboxChange = (id) => {
    if (selectedTagIds.includes(id)) {
      setSelectedTagIds(selectedTagIds.filter(checkedId => checkedId !== id));
    } else {
      setSelectedTagIds([...selectedTagIds, id]);
    }
  };

  const handleFilter = async (e) => {
    e.preventDefault();
    getAccessTokenSilently().then((token) => {
      getQuestions(token, selectedTagIds).then((q) => setQuestions(q));
    });
  };

  const handleClearFilter = async () => {
    setSelectedTagIds([]);
    setIsLoading(true);
    getAccessTokenSilently().then((token) => {
      getQuestions(token).then((questions) => {
        setQuestions(questions);
        setIsLoading(false);
      });
    });
  };

  useEffect(() => {
    getAccessTokenSilently().then((token) => {
      getQuestions(token).then((questions) => {
        setQuestions(questions);
        setIsLoading(false);
      });
      getAllTags(token).then((tags) => {
        setAllTags(tags);
      });
    });
  }, [getAccessTokenSilently]);

  return (
    <div>
      <Navbar />
      <header id="forumHeader">
        <section className="headerAskBtn">
          <h2 id="forumTitle">Forum</h2>
          {isLoading && <div className="loading">Loading&#8230;</div>}
          <div id="askFilterContainer">
            <Link to="/ask-question">
              <button id="btnAddQuestion">Ask a question</button>
            </Link>

            <form onSubmit={(e) => handleFilter(e)}>
              {Object.values(allTags).map((tag) => (
                <div key={tag.id}>
                  <input
                    type="checkbox"
                    id={tag.id}
                    name="selectedTag"
                    value={tag.name}  
                    onChange={() => handleCheckboxChange(tag.id)}
                    checked={selectedTagIds.includes(tag.id)}
                  />
                  <label htmlFor={tag.id}>{tag.name}</label>
                </div>
              ))}
              <button type="submit">Filter</button>
            </form>

            <button onClick={handleClearFilter}>Clear Filter</button>
          </div>
        </section>
      </header>
      <ul>
        {questions.map((question) => (
          <Question key={question.id} question={question} />
        ))}
      </ul>
      <Footer />
    </div>
  );
};

export default ForumPage;
