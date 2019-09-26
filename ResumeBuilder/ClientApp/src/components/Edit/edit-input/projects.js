import React from "react";
import { useStateValue } from "../../../state";

const Projects = props => {
  const [state, dispatch] = useStateValue();

  const { useDispatch, saveResumeToLocalStorage } = props.func;

  const changeStateValue = e => {
    //make totally new array
    const newWorkStateCopy = state.projects.concat();
    const currentResumeNum = e.target.dataset.listId;
    const currentResumeInput = e.target.name;
    const newInputValue = e.target.value;
    //changeValue
    newWorkStateCopy[currentResumeNum][currentResumeInput] = newInputValue;

    dispatch({
      type: "CHANGE_PROJECTS",
      projects: newWorkStateCopy
    });
  };

  const ListItem = state.projects.map((item, index) => {
    return (
      <li key={index}>
        <h4>Name</h4>
        <input
          type="text"
          name="name"
          value={item.name}
          data-list-id={index}
          onChange={changeStateValue}
          onBlur={saveResumeToLocalStorage}
        />
        <h4>Time</h4>
        <input
          type="text"
          name="time"
          value={item.time}
          data-list-id={index}
          onChange={changeStateValue}
          onBlur={saveResumeToLocalStorage}
        />
        <h4>Description</h4>
        <textarea
          type="text"
          name="desc"
          value={item.desc}
          data-list-id={index}
          onChange={changeStateValue}
          onBlur={saveResumeToLocalStorage}
        />
      </li>
    );
  });

  const handleClick = e => {
    let newArray = state.projects.concat();
    if (e.target.textContent === "+") {
      newArray.push({ project: "", time: "", desc: "" });
    } else {
      newArray.pop();
    }

    dispatch({
      type: "CHANGE_PROJECTS",
      projects: newArray
    });
  };

  return (
    <div className="edit-input__projects">
      <label>
        <input
          onChange={useDispatch}
          onBlur={saveResumeToLocalStorage}
          type="text"
          name="projectsTitle"
          className="edit-input__title"
          value={state.projectsTitle}
        />
      </label>

      <ul>{ListItem}</ul>
      <button
        onClick={handleClick}
        className="edit-input__button edit-input__button_add"
      >
        +
      </button>
      {state.projects.length > 1 ? (
        <button
          onClick={handleClick}
          name="link"
          className="edit-input__button edit-input__button_minus"
        >
          -
        </button>
      ) : (
        ""
      )}
    </div>
  );
};

export default Projects;
