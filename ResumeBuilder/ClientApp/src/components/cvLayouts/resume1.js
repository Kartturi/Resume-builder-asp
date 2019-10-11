import React from "react";
import { useStateValue } from "../../state";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ProfilePicture from "../../img/artturi19.png";

const Resume1 = props => {
  const [state] = useStateValue();

  const ListItem = state.link.map((item, index) => {
    return <li key={index}>{item}</li>;
  });

  const WorkListItem = state.work.map((item, index) => {
    return (
      <li key={index}>
        <h4>{item.position}</h4>
        <p>{item.time}</p>
        <p className="resume1-text">{item.desc}</p>
      </li>
    );
  });

  const EducationListItem = state.education.map((item, index) => {
    return (
      <li key={index}>
        <h4>{item.school}</h4>
        <p>{item.time}</p>
        <p className="resume1-text">{item.desc}</p>
      </li>
    );
  });

  const LanguageListItem = state.language.map((item, index) => {
    return (
      <li key={index}>
        <p>{item.language}</p>
        <p>{item.level}</p>
      </li>
    );
  });

  const recommendsListItem = state.recommends.map((item, index) => {
    return (
      <li key={index}>
        <h4>{item.nameRecommends}</h4>
        <p>{item.phoneRecommends}</p>
        <p>{item.email}</p>
      </li>
    );
  });
  const projectsListItem = state.projects.map((item, index) => {
    return (
      <li key={index}>
        <h4>{item.name}</h4>
        <p>{item.time}</p>
        <p className="resume1-text">{item.desc}</p>
      </li>
    );
  });

  const skillsListItem = state.skills.map((item, index) => {
    return (
      <li key={index}>
        <h4>{item.name}</h4>
        <div className="resume1-bar">
          <div className={`resume1-bar-inner level-${item.level}`}></div>
        </div>
      </li>
    );
  });
  return (
    <div className="cv resume1">
      <style>
        @import
        url('https://fonts.googleapis.com/css?family=Open+Sans:400,700|Raleway:400,700&display=swap');
      </style>
      <div className="resume1-indent">
        <div className="resume1-head">
          <img className="resume1-head__img" src={ProfilePicture}></img>
          <h1>{state.name}</h1>
          <p>{state.title}</p>
        </div>
        <div className="resume1-lower-container">
          <div className="resume1-left">
            {state.profile ? (
              <div className="resume1-profile">
                <FontAwesomeIcon className="resume1-icons" icon="user" />
                <h2>{state.profileTitle}</h2>
                <p>{state.profile}</p>
              </div>
            ) : (
              ""
            )}
            {state.work[0].position ? (
              <div className="resume1-experience ">
                <FontAwesomeIcon className="resume1-icons" icon="suitcase" />
                <h2>{state.workTitle}</h2>
                <ul>{WorkListItem}</ul>
              </div>
            ) : (
              ""
            )}
            {state.education[0].school ? (
              <div className="resume1-education ">
                <FontAwesomeIcon
                  className="resume1-icons"
                  icon="graduation-cap"
                />
                <h2>{state.educationTitle}</h2>
                <ul>{EducationListItem}</ul>
              </div>
            ) : (
              ""
            )}

            {state.projects[0].name ? (
              <div className="resume1-projects ">
                <FontAwesomeIcon className="resume1-icons" icon="desktop" />
                <h2>{state.projectsTitle}</h2>
                <ul>{projectsListItem}</ul>
              </div>
            ) : (
              ""
            )}

            {state.recommends[0].nameRecommends ? (
              <div className="resume1-recommends ">
                <FontAwesomeIcon className="resume1-icons" icon="bullhorn" />
                <h2>{state.recommendsTitle}</h2>
                <ul>{recommendsListItem}</ul>
              </div>
            ) : (
              ""
            )}
          </div>

          <div className="resume1-right">
            {state.email || state.phone ? (
              <div className="resume1-personalInfo">
                <h2>{state.personal}</h2>
                <p>{state.email}</p>
                <p>{state.phone}</p>
                <p>{state.address}</p>
                <p></p>
              </div>
            ) : (
              ""
            )}
            {state.link[0].length > 0 ? (
              <div className="resume1-links">
                <h2>{state.linkTitle}</h2>
                <ul>{ListItem}</ul>
                <p></p>
              </div>
            ) : (
              ""
            )}

            {state.skills[0].name ? (
              <div className="resume1-skills">
                <h2>{state.skillsTitle}</h2>
                <ul>{skillsListItem}</ul>
                <p></p>
              </div>
            ) : (
              ""
            )}
            {state.hobbies ? (
              <div className="resume1-hobbies">
                <h2>{state.hobbiesTitle}</h2>
                <p>{state.hobbies}</p>
                <p></p>
              </div>
            ) : (
              ""
            )}

            {state.language[0].language ? (
              <div className="resume1-language">
                <h2>{state.languageTitle}</h2>
                <ul>{LanguageListItem}</ul>
                <p></p>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resume1;
