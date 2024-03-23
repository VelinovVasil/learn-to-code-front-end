function RoadmapBlock(props) {
  const title = props.data.title;
  const links = props.data.links;

  const linksElement = links.map((link) => {
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
      <div className="timeline__event__date">&lt;{title}/&gt;</div>
      <div className="timeline__event__content ">
        <div className="timeline__event__title">{title}</div>
        <div className="timeline__event__description">
          <ul>{linksElement}</ul>
        </div>
      </div>
    </div>
  );
}

export default RoadmapBlock;
