import React from "react";
import { useStateValue } from "../../../state";
import { isArray } from "util";

const Skills = props => {
  const [state, dispatch] = useStateValue();

  const { useDispatch, saveResumeToLocalStorage } = props.func;

  const changeStateValue = e => {
    //make totally new array
    const newWorkStateCopy = state.skills.concat();
    const currentResumeNum = e.target.dataset.listId;
    const currentResumeInput = e.target.name;
    const newInputValue = e.target.value;
    //changeValue
    newWorkStateCopy[currentResumeNum][currentResumeInput] = newInputValue;
    dispatch({
      type: "CHANGE_SKILLS",
      skills: newWorkStateCopy
    });
  };

  const ListItem = state.skills.map((item, index) => {
    return (
      <li key={index}>
        <h4>Skill</h4>
        <input
          type="text"
          name="name"
          value={item.name}
          data-list-id={index}
          onChange={changeStateValue}
          onBlur={saveResumeToLocalStorage}
        />
        <h4>Level</h4>
        {/* <input
          type="text"
          name="level"
          value={item.level}
          data-list-id={index}
          onChange={changeStateValue}
          onBlur={saveResumeToLocalStorage}
        /> */}
        <select
          name="level"
          onChange={changeStateValue}
          onBlur={saveResumeToLocalStorage}
          value={item.level}
          data-list-id={index}
        >
          <option value="0">Empty</option>
          <option value="1">Beginner</option>
          <option value="2">Fair</option>
          <option value="3">Good</option>
          <option value="4">very good</option>
          <option value="5">Pro</option>
        </select>
      </li>
    );
  });

  const handleClick = e => {
    let newArray = state.skills.concat();
    if (e.target.textContent === "+") {
      newArray.push({ name: "", level: "" });
    } else {
      newArray.pop();
    }

    dispatch({
      type: "CHANGE_SKILLS",
      skills: newArray
    });
  };

  return (
    <div className="edit-input__skills">
      <label>
        <input
          onChange={useDispatch}
          onBlur={saveResumeToLocalStorage}
          type="text"
          name="skillsTitle"
          className="edit-input__title"
          value={state.skillsTitle}
        />
      </label>

      <ul>{ListItem}</ul>
      <button
        onClick={handleClick}
        className="edit-input__button edit-input__button_add"
      >
        +
      </button>
      {state.skills.length > 1 ? (
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

export default Skills;
