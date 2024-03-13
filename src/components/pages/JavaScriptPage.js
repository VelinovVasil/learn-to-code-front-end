import React from 'react';
import Navbar from "../Navbar";
import Footer from "../Footer";
import '../styles/RoadmapStyle.css'
// import '../styles/RoadmapStyle.scss';

const JavaScriptPage = () => {
    return (
      <div>
          <Navbar/>
          <main className={'roadmapPageMain'}>
              <h1>JavaScript Learning Roadmap</h1>
              <p>
                  JavaScript is a dynamic scripting language used primarily for enhancing web pages with interactive and
                  responsive features. It enables developers to create engaging user experiences, handle user input,
                  manipulate HTML and CSS elements, and make asynchronous requests to servers. JavaScript is essential
                  for modern web development, allowing websites to offer dynamic content, real-time updates, and
                  interactive functionalities</p>
              {/*<div className="topicsContainer">*/}
              {/*    <div className="topic">*/}
              {/*        <h2 className={'topicTitle'}>Basic Syntax</h2>*/}
              {/*        <ul>*/}
              {/*            <li><a href="#" className="resource-link">Codecademy - JavaScript Syntax</a></li>*/}
              {/*            <li><a href="#" className="resource-link">MDN Web Docs - JavaScript Basics</a></li>*/}
              {/*            <li><a href="#" className="resource-link">FreeCodeCamp - JavaScript Algorithms and Data*/}
              {/*                Structures</a></li>*/}
              {/*            <li><a href="#" className="resource-link">W3Schools - JavaScript Tutorial</a></li>*/}
              {/*        </ul>*/}
              {/*    </div>*/}
              {/*    <div className="topic">*/}
              {/*        <h2 className={'topicTitle'}>Functions</h2>*/}
              {/*        <ul>*/}
              {/*            <li><a href="#" className="resource-link">MDN Web Docs - Functions</a></li>*/}
              {/*            <li><a href="#" className="resource-link">Eloquent JavaScript - Chapter on Functions</a></li>*/}
              {/*            <li><a href="#" className="resource-link">JavaScript.info - Functions</a></li>*/}
              {/*        </ul>*/}
              {/*    </div>*/}
              {/*    <div className="topic">*/}
              {/*        <h2 className={'topicTitle'}>Variables and Data Types</h2>*/}
              {/*        <ul>*/}
              {/*            <li><a href="#" className="resource-link">MDN Web Docs - Variables</a></li>*/}
              {/*            <li><a href="#" className="resource-link">Eloquent JavaScript - Data Structures</a></li>*/}
              {/*            <li><a href="#" className="resource-link">JavaScript.info - Data Types</a></li>*/}
              {/*        </ul>*/}
              {/*    </div>*/}
              {/*    <div className="topic">*/}
              {/*        <h2 className={'topicTitle'}>Operators</h2>*/}
              {/*        <ul>*/}
              {/*            <li><a href="#" className="resource-link">MDN Web Docs - Operators</a></li>*/}
              {/*            <li><a href="#" className="resource-link">Eloquent JavaScript - Expressions and Operators</a>*/}
              {/*            </li>*/}
              {/*            <li><a href="#" className="resource-link">JavaScript.info - Operators</a></li>*/}
              {/*        </ul>*/}
              {/*    </div>*/}
              {/*    <div className="topic">*/}
              {/*        <h2 className={'topicTitle'}>Control Flow</h2>*/}
              {/*        <ul>*/}
              {/*            <li><a href="#" className="resource-link">MDN Web Docs - Control Flow</a></li>*/}
              {/*            <li><a href="#" className="resource-link">Eloquent JavaScript - Control Structures</a></li>*/}
              {/*            <li><a href="#" className="resource-link">JavaScript.info - Conditional Operators</a></li>*/}
              {/*        </ul>*/}
              {/*    </div>*/}
              {/*    <div className="topic">*/}
              {/*        <h2 className={'topicTitle'}>Loops</h2>*/}
              {/*        <ul>*/}
              {/*            <li><a href="#" className="resource-link">MDN Web Docs - Loops</a></li>*/}
              {/*            <li><a href="#" className="resource-link">Eloquent JavaScript - Loops</a></li>*/}
              {/*            <li><a href="#" className="resource-link">JavaScript.info - Loops</a></li>*/}
              {/*        </ul>*/}
              {/*    </div>*/}
              {/*    <div className="topic">*/}
              {/*        <h2 className={'topicTitle'}>Arrays</h2>*/}
              {/*        <ul>*/}
              {/*            <li><a href="#" className="resource-link">MDN Web Docs - Arrays</a></li>*/}
              {/*            <li><a href="#" className="resource-link">Eloquent JavaScript - Arrays</a></li>*/}
              {/*            <li><a href="#" className="resource-link">JavaScript.info - Arrays</a></li>*/}
              {/*        </ul>*/}
              {/*    </div>*/}
              {/*    <div className="topic">*/}
              {/*        <h2 className={'topicTitle'}>Objects</h2>*/}
              {/*        <ul>*/}
              {/*            <li><a href="#" className="resource-link">MDN Web Docs - Objects</a></li>*/}
              {/*            <li><a href="#" className="resource-link">Eloquent JavaScript - Objects</a></li>*/}
              {/*            <li><a href="#" className="resource-link">JavaScript.info - Objects</a></li>*/}
              {/*        </ul>*/}
              {/*    </div>*/}
              {/*    <div className="topic">*/}
              {/*        <h2 className={'topicTitle'}>Strings</h2>*/}
              {/*        <ul>*/}
              {/*            <li><a href="#" className="resource-link">MDN Web Docs - Strings</a></li>*/}
              {/*            <li><a href="#" className="resource-link">Eloquent JavaScript - Strings</a></li>*/}
              {/*            <li><a href="#" className="resource-link">JavaScript.info - Strings</a></li>*/}
              {/*        </ul>*/}
              {/*    </div>*/}
              {/*    <div className="topic">*/}
              {/*        <h2 className={'topicTitle'}>Regular Expressions</h2>*/}
              {/*        <ul>*/}
              {/*            <li><a href="#" className="resource-link">MDN Web Docs - Regular Expressions</a></li>*/}
              {/*            <li><a href="#" className="resource-link">Eloquent JavaScript - Regular Expressions</a></li>*/}
              {/*            <li><a href="#" className="resource-link">JavaScript.info - Regular Expressions</a></li>*/}
              {/*        </ul>*/}
              {/*    </div>*/}
              {/*    <div className="topic">*/}
              {/*        <h2 className={'topicTitle'}>Scope and Closures</h2>*/}
              {/*        <ul>*/}
              {/*            <li><a href="#" className="resource-link">MDN Web Docs - Scope and Closures</a></li>*/}
              {/*            <li><a href="#" className="resource-link">Eloquent JavaScript - Scope and Closures</a></li>*/}
              {/*            <li><a href="#" className="resource-link">JavaScript.info - Scope and Closures</a></li>*/}
              {/*        </ul>*/}
              {/*    </div>*/}
              {/*    <div className="topic">*/}
              {/*        <h2 className={'topicTitle'}>DOM Manipulation</h2>*/}
              {/*        <ul>*/}
              {/*            <li><a href="#" className="resource-link">MDN Web Docs - DOM Manipulation</a></li>*/}
              {/*            <li><a href="#" className="resource-link">Eloquent JavaScript - The Document Object Model</a>*/}
              {/*            </li>*/}
              {/*            <li><a href="#" className="resource-link">JavaScript.info - DOM Manipulation</a></li>*/}
              {/*        </ul>*/}
              {/*    </div>*/}
              {/*    <div className="topic">*/}
              {/*        <h2 className={'topicTitle'}>Events</h2>*/}
              {/*        <ul>*/}
              {/*            <li><a href="#" className="resource-link">MDN Web Docs - Events</a></li>*/}
              {/*            <li><a href="#" className="resource-link">Eloquent JavaScript - Handling Events</a></li>*/}
              {/*            <li><a href="#" className="resource-link">JavaScript.info - Events</a></li>*/}
              {/*        </ul>*/}
              {/*    </div>*/}
              {/*    <div className="topic">*/}
              {/*        <h2 className={'topicTitle'}>AJAX and Fetch API</h2>*/}
              {/*        <ul>*/}
              {/*            <li><a href="#" className="resource-link">MDN Web Docs - AJAX</a></li>*/}
              {/*            <li><a href="#" className="resource-link">Eloquent JavaScript - AJAX and Fetch API</a></li>*/}
              {/*            <li><a href="#" className="resource-link">JavaScript.info - Fetch</a></li>*/}
              {/*        </ul>*/}
              {/*    </div>*/}
              {/*    <div className="topic">*/}
              {/*        <h2 className={'topicTitle'}>Asynchronous JavaScript</h2>*/}
              {/*        <ul>*/}
              {/*            <li><a href="#" className="resource-link">MDN Web Docs - Asynchronous JavaScript</a></li>*/}
              {/*            <li><a href="#" className="resource-link">Eloquent JavaScript - Asynchronous Programming</a>*/}
              {/*            </li>*/}
              {/*            <li><a href="#" className="resource-link">JavaScript.info - Asynchronous Programming</a></li>*/}
              {/*        </ul>*/}
              {/*    </div>*/}
              {/*    <div className="topic">*/}
              {/*        <h2 className={'topicTitle'}>ES6+ Features</h2>*/}
              {/*        <ul>*/}
              {/*            <li><a href="#" className="resource-link">MDN Web Docs - ECMAScript 6 Features</a></li>*/}
              {/*            <li><a href="#" className="resource-link">Eloquent JavaScript - ES6+ Features</a></li>*/}
              {/*            <li><a href="#" className="resource-link">JavaScript.info - ES6+ Features</a></li>*/}
              {/*        </ul>*/}
              {/*    </div>*/}
              {/*    <div className="topic">*/}
              {/*        <h2 className={'topicTitle'}>Module Bundlers (Webpack, Parcel)</h2>*/}
              {/*        <ul>*/}
              {/*            <li><a href="#" className="resource-link">Webpack Documentation</a></li>*/}
              {/*            <li><a href="#" className="resource-link">Parcel Documentation</a></li>*/}
              {/*            <li><a href="#" className="resource-link">YouTube Tutorials</a></li>*/}
              {/*        </ul>*/}
              {/*    </div>*/}
              {/*    <div className="topic">*/}
              {/*        <h2 className={'topicTitle'}>Testing (Jest, Mocha, Chai)</h2>*/}
              {/*        <ul>*/}
              {/*            <li><a href="#" className="resource-link">Jest Documentation</a></li>*/}
              {/*            <li><a href="#" className="resource-link">Mocha Documentation</a></li>*/}
              {/*            <li><a href="#" className="resource-link">Chai Documentation</a></li>*/}
              {/*        </ul>*/}
              {/*    </div>*/}
              {/*    <div className="topic">*/}
              {/*        <h2 className={'topicTitle'}>REST API</h2>*/}
              {/*        <ul>*/}
              {/*            <li><a href="#" className="resource-link">MDN Web Docs - REST API</a></li>*/}
              {/*            <li><a href="#" className="resource-link">RESTful API Design Best Practices</a></li>*/}
              {/*            <li><a href="#" className="resource-link">Node.js API Development</a></li>*/}
              {/*        </ul>*/}
              {/*    </div>*/}
              {/*</div>*/}
              <div className="timeline">
                  <div className="timeline__event  animated fadeInUp delay-3s timeline__event--type1">
                      <div className="timeline__event__icon ">
                          <i className="lni-cake"></i>

                      </div>
                      <div className="timeline__event__date">
                          &lt;Basic syntax/&gt;
                      </div>
                      <div className="timeline__event__content ">
                          <div className="timeline__event__title">
                              Basic Syntax
                          </div>
                          <div className="timeline__event__description">
                              <ul>
                                          <li><a href="#" className="resource-link">Codecademy - JavaScript Syntax</a></li>
                                          <li><a href="#" className="resource-link">MDN Web Docs - JavaScript Basics</a></li>
                                          <li><a href="#" className="resource-link">W3Schools - JavaScript Tutorial</a></li>
                              </ul>
                          </div>
                      </div>
                  </div>
                  <div className="timeline__event animated fadeInUp delay-2s timeline__event--type2">
                      <div className="timeline__event__icon">
                          <i className="lni-burger"></i>

                      </div>
                      <div className="timeline__event__date">
                          20-08-2019
                      </div>
                      <div className="timeline__event__content">
                          <div className="timeline__event__title">
                              Lunch
                          </div>
                          <div className="timeline__event__description">
                              <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vel, nam! Nam eveniet ut
                                  aliquam ab asperiores, accusamus iure veniam corporis incidunt reprehenderit
                                  accusantium id aut architecto harum quidem dolorem in!</p>
                          </div>
                      </div>
                  </div>
                  <div className="timeline__event animated fadeInUp delay-1s timeline__event--type3">
                      <div className="timeline__event__icon">
                          <i className="lni-slim"></i>

                      </div>
                      <div className="timeline__event__date">
                          20-08-2019
                      </div>
                      <div className="timeline__event__content">
                          <div className="timeline__event__title">
                              Exercise
                          </div>
                          <div className="timeline__event__description">
                              <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vel, nam! Nam eveniet ut
                                  aliquam ab asperiores, accusamus iure veniam corporis incidunt reprehenderit
                                  accusantium id aut architecto harum quidem dolorem in!</p>
                          </div>

                      </div>
                  </div>
                  <div className="timeline__event animated fadeInUp timeline__event--type1">
                      <div className="timeline__event__icon">
                          <i className="lni-cake"></i>

                      </div>
                      <div className="timeline__event__date">
                          20-08-2019
                      </div>
                      <div className="timeline__event__content">
                          <div className="timeline__event__title">
                              Birthday
                          </div>
                          <div className="timeline__event__description">
                              <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vel, nam! Nam eveniet ut
                                  aliquam ab asperiores, accusamus iure veniam corporis incidunt reprehenderit
                                  accusantium id aut architecto harum quidem dolorem in!</p>
                          </div>
                      </div>
                  </div>
                  <div className="timeline__event  animated fadeInUp delay-3s timeline__event--type1">
                      <div className="timeline__event__icon ">
                          <i className="lni-cake"></i>

                      </div>
                      <div className="timeline__event__date">
                          20-08-2019
                      </div>
                      <div className="timeline__event__content ">
                          <div className="timeline__event__title">
                              Birthday
                          </div>
                          <div className="timeline__event__description">
                              <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vel, nam! Nam eveniet ut
                                  aliquam ab asperiores, accusamus iure veniam corporis incidunt reprehenderit
                                  accusantium id aut architecto harum quidem dolorem in!</p>
                          </div>
                      </div>
                  </div>
                  <div className="timeline__event animated fadeInUp delay-2s timeline__event--type2">
                      <div className="timeline__event__icon">
                          <i className="lni-burger"></i>

                      </div>
                      <div className="timeline__event__date">
                          20-08-2019
                      </div>
                      <div className="timeline__event__content">
                          <div className="timeline__event__title">
                              Lunch
                          </div>
                          <div className="timeline__event__description">
                              <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vel, nam! Nam eveniet ut
                                  aliquam ab asperiores, accusamus iure veniam corporis incidunt reprehenderit
                                  accusantium id aut architecto harum quidem dolorem in!</p>
                          </div>
                      </div>
                  </div>
                  <div className="timeline__event animated fadeInUp delay-1s timeline__event--type3">
                      <div className="timeline__event__icon">
                          <i className="lni-slim"></i>

                      </div>
                      <div className="timeline__event__date">
                          20-08-2019
                      </div>
                      <div className="timeline__event__content">
                          <div className="timeline__event__title">
                              Exercise
                          </div>
                          <div className="timeline__event__description">
                              <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vel, nam! Nam eveniet ut
                                  aliquam ab asperiores, accusamus iure veniam corporis incidunt reprehenderit
                                  accusantium id aut architecto harum quidem dolorem in!</p>
                          </div>

                      </div>
                  </div>
                  <div className="timeline__event animated fadeInUp timeline__event--type1">
                      <div className="timeline__event__icon">
                          <i className="lni-cake"></i>

                      </div>
                      <div className="timeline__event__date">
                          20-08-2019
                      </div>
                      <div className="timeline__event__content">
                          <div className="timeline__event__title">
                              Birthday
                          </div>
                          <div className="timeline__event__description">
                              <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vel, nam! Nam eveniet ut
                                  aliquam ab asperiores, accusamus iure veniam corporis incidunt reprehenderit
                                  accusantium id aut architecto harum quidem dolorem in!</p>
                          </div>
                      </div>
                  </div>

              </div>
          </main>
          <Footer/>
      </div>
    );
}

export default JavaScriptPage;