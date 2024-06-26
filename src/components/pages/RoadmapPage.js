import React from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import "../styles/RoadmapStyle.css";
import RoadmapBlock from "../shared/RoadmapBlock";
// import '../styles/RoadmapStyle.scss';

const RoadmapPage = (props) => {
  const title = props.data.title;
  const content = props.data.content;
  const data = props.data.data;

  const elements = data.map((block) => {
    return <RoadmapBlock data={block} />;
  });

  return (
    <div>
      <main className={"roadmapPageMain"}>
        <h1>{title}</h1>
        <p>{content}</p>

        <div className="timeline">{elements}</div>
      </main>
    </div>
  );
};

export default RoadmapPage;
