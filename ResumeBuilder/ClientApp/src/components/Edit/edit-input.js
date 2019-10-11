import React, { useEffect } from "react";
import { useStateValue } from "../../state";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

//util
import getActionType from "../../utils/getActionType";

//components
import Links from "./edit-input/link";
import Work from "./edit-input/work";
import Education from "./edit-input/education";
import Recommends from "./edit-input/recommends";
import Projects from "./edit-input/projects";
import Language from "./edit-input/language";
import Skills from "./edit-input/skills";

const EditInput = props => {
  const [state, dispatch] = useStateValue();

  function useDispatch(e) {
    dispatch({
      type: getActionType(e.target.name),
      [e.target.name]: e.target.value
    });
  }

  function saveResumeToLocalStorage() {
    const resumes = JSON.parse(localStorage.getItem("resumes"));
    resumes[props.index] = state;
    localStorage.setItem("resumes", JSON.stringify(resumes));
  }

  return (
    <div className="edit-input">
      <div className="edit-input__head">
        <Link to="/">
          <FontAwesomeIcon
            className="edit-input__head_icon"
            icon="arrow-left"
          />
        </Link>

        <h1>Edit resume</h1>
      </div>
      <div className="edit-input__section">
        <label>
          <h4>Layout</h4>
          <select
            name="layout"
            onChange={useDispatch}
            onBlur={saveResumeToLocalStorage}
            value={state.layout}
          >
            <option value="Turku">Turku</option>
            <option value="Vaasa">Vaasa</option>
            <option value="Rauma">Rauma</option>
            <option value="Pori">Pori</option>
          </select>
        </label>
        <label>
          <h4>Name</h4>
          <input
            onChange={useDispatch}
            onBlur={saveResumeToLocalStorage}
            type="text"
            name="name"
            className=""
            value={state.name}
          />
        </label>
        <label>
          <h4>Title</h4>
          <input
            onChange={useDispatch}
            onBlur={saveResumeToLocalStorage}
            type="text"
            name="title"
            className=""
            value={state.title}
          />
        </label>
      </div>
      <div className="edit-input__section">
        <label>
          <input
            onChange={useDispatch}
            onBlur={saveResumeToLocalStorage}
            type="text"
            name="personal"
            className="edit-input__title"
            value={state.personal}
          />
        </label>
        <label>
          <h4>Phone</h4>
          <input
            onChange={useDispatch}
            onBlur={saveResumeToLocalStorage}
            type="phone"
            name="phone"
            className=""
            placeholder="phone"
            value={state.phone}
          />
        </label>

        <label>
          <h4>Email</h4>

          <input
            onChange={useDispatch}
            onBlur={saveResumeToLocalStorage}
            type="email"
            name="email"
            className=""
            placeholder="email"
            value={state.email}
          />
        </label>
        <label>
          <h4>Address</h4>

          <input
            onChange={useDispatch}
            onBlur={saveResumeToLocalStorage}
            type="address"
            name="address"
            className=""
            placeholder="address"
            value={state.address}
          />
        </label>
      </div>
      <div className="edit-input__section">
        <label>
          <input
            className="edit-input__title"
            onChange={useDispatch}
            onBlur={saveResumeToLocalStorage}
            type="text"
            name="profileTitle"
            value={state.profileTitle}
          />
        </label>
        <label>
          <textarea
            rows="10"
            onChange={useDispatch}
            onBlur={saveResumeToLocalStorage}
            type="text"
            name="profile"
            value={state.profile}
          />
        </label>
      </div>
      <div className="edit-input__section">
        <Links func={{ useDispatch, saveResumeToLocalStorage }} />
      </div>
      <div className="edit-input__section">
        <Work func={{ useDispatch, saveResumeToLocalStorage }} />
      </div>
      <div className="edit-input__section">
        <Education func={{ useDispatch, saveResumeToLocalStorage }} />
      </div>
      <div className="edit-input__section">
        <Projects func={{ useDispatch, saveResumeToLocalStorage }} />
      </div>
      <div className="edit-input__section">
        <Skills func={{ useDispatch, saveResumeToLocalStorage }} />
      </div>
      <div className="edit-input__section">
        <Language func={{ useDispatch, saveResumeToLocalStorage }} />
      </div>

      <label>
        <input
          onChange={useDispatch}
          onBlur={saveResumeToLocalStorage}
          type="text"
          name="hobbiesTitle"
          className="edit-input__title"
          value={state.hobbiesTitle}
        />
      </label>
      <label>
        <textarea
          rows="10"
          onChange={useDispatch}
          onBlur={saveResumeToLocalStorage}
          type="text"
          name="hobbies"
          value={state.hobbies}
        />
      </label>
      <Recommends func={{ useDispatch, saveResumeToLocalStorage }} />
    </div>
  );
};

export default EditInput;
