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
  // TODO: Populate the roadmap with the given resources in the comments

  return (
    <div>
      <Navbar />
      <main className={"roadmapPageMain"}>
        <h1>{title}</h1>
        <p>{content}</p>

        <div className="timeline">{elements}</div>
      </main>
      <Footer />
    </div>
  );
};

export default RoadmapPage;
