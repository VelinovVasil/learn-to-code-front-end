import React from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import "../styles/RoadmapStyle.css";
// import '../styles/RoadmapStyle.scss';

const JavaScriptPage = (props) => {
  const title = props.data.title;
  const content = props.data.content;
  const data = props.data.data;

  console.log(data);
  const elements = data.map((block) => {
    const links = block.links.map((link) => {
      return (
        <li>
          <a href={link.href} className="resource-link">
            {link.title}
          </a>
        </li>
      );
    });

    return (
      <div className="timeline__event  animated fadeInUp delay-3s timeline__event--type1">
        <div className="timeline__event__icon ">
          <i className="lni-cake"></i>
        </div>
        <div className="timeline__event__date">&lt;{block.title}/&gt;</div>
        <div className="timeline__event__content ">
          <div className="timeline__event__title">{block.title}</div>
          <div className="timeline__event__description">
            <ul>
              {links}
            </ul>
          </div>
        </div>
      </div>
    );
  });
  // TODO: Populate the roadmap with the given resources in the comments

  return (
    <div>
      <Navbar />
      <main className={"roadmapPageMain"}>
        <h1>{title}</h1>
        <p>{content}</p>

        <div className="timeline">
          {elements}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default JavaScriptPage;
