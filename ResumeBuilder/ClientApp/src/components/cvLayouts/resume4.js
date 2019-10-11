import React from "react";
import { useStateValue } from "../../state";
import "./styles/resume4.css";
import ProfilePicture from "../../img/artturi_lead.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Resume4 = props => {
  const [state] = useStateValue();

  const WorkListItem = state.work.map((item, index) => {
    return (
      <li key={index}>
        <h3>
          {item.position} <span>{item.time}</span>
        </h3>
        <h3> {item.company}</h3>
        <p className="resume3-text">{item.desc}</p>
      </li>
    );
  });

  const EducationListItem = state.education.map((item, index) => {
    return (
      <li key={index}>
        <h3>{item.school + " "}</h3>
        <p>{item.time}</p>
        <p className="resume3-text">{item.desc}</p>
      </li>
    );
  });

  const LanguageListItem = state.language.map((item, index) => {
    return (
      <li key={index}>
        <p>
          {item.language} <span>{item.level}</span>
        </p>
      </li>
    );
  });

  const recommendsListItem = state.recommends.map((item, index) => {
    return (
      <li key={index}>
        <h2>{item.nameRecommends}</h2>
        <p>{item.phoneRecommends}</p>
        <p>{item.email}</p>
      </li>
    );
  });
  const projectsListItem = state.projects.map((item, index) => {
    return (
      <li key={index}>
        <h3>
          {item.name}, <span>{item.time}</span>
        </h3>

        <p className="resume3-text">{item.desc}</p>
      </li>
    );
  });

  const linkListItem = state.link.map((item, index) => {
    return (
      <p key={index}>
        <span>
          <FontAwesomeIcon icon="link" />
        </span>
        {item}
      </p>
    );
  });

  const skillsListItem = state.skills.map((item, index) => {
    return (
      <li key={index}>
        <p>{item.name}</p>
      </li>
    );
  });
  return (
    <div className="cv resume4">
      <style>
        @import
        url('https://fonts.googleapis.com/css?family=Roboto:300i,400,700i&display=swap');
      </style>

      <div className="resume4__left"></div>
      <div className="resume4__right">
        <div className="resume4__img_container">
          <img src={ProfilePicture} alt="" />
        </div>
        <div className="resume4__name">
          <h1>{state.name}</h1>
          <p>{state.title}</p>
        </div>
        <div className="resume4__profile">
          <h2>
            <span>
              <FontAwesomeIcon icon="user" />
            </span>
            {state.profileTitle}
          </h2>
          <p>{state.profile}</p>
        </div>
      </div>
    </div>
  );
};

export default Resume4;
