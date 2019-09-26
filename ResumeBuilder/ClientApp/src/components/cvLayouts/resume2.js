import React from "react";
import { useStateValue } from "../../state";
const Resume2 = props => {
  const [state] = useStateValue();

  const ListItem = state.link.map((item, index) => {
    return (
      <li key={index}>
        <p>{item}</p>
      </li>
    );
  });

  const WorkListItem = state.work.map((item, index) => {
    return (
      <li key={index}>
        <h3>
          {item.position} <span>{item.time}</span>
        </h3>
        <h3> {item.company}</h3>
        <p className="resume2-text">{item.desc}</p>
      </li>
    );
  });

  const EducationListItem = state.education.map((item, index) => {
    return (
      <li key={index}>
        <h3>
          {item.school + " "}
          <span>{item.time}</span>
        </h3>

        <p className="resume2-text">{item.desc}</p>
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
          {item.name} <span>{item.time}</span>
        </h3>

        <p className="resume2-text">{item.desc}</p>
      </li>
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
    <div className="cv resume2">
      <div className="resume2__content">
        <div className="resume2__head">
          <div className="resume2__head__content">
            <div className="resume2__head__content_links">
              <ul>{ListItem}</ul>
            </div>
            <h1>{state.name}</h1>
          </div>
        </div>
        <div className="resume2__profile">
          <h2>{state.profileTitle}</h2>
          <p>{state.profile}</p>
        </div>
        <div className="resume2__skills">
          <h2>{state.skillsTitle}</h2>
          <ul>
            {skillsListItem} <li></li>
          </ul>
        </div>

        <div className="resume2__work">
          <h2>{state.workTitle}</h2>
          <ul>{WorkListItem}</ul>
        </div>
        <div className="resume2__education">
          <h2>{state.educationTitle}</h2>
          <ul>{EducationListItem}</ul>
        </div>
        <div className="resume2__projects">
          <h2>{state.projectsTitle}</h2>
          <ul>{projectsListItem}</ul>
        </div>
      </div>
    </div>
  );
};

export default Resume2;
