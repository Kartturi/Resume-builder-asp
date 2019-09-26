import React from "react";
import { useStateValue } from "../../../state";

const Education = props => {
  const [state, dispatch] = useStateValue();

  const { useDispatch, saveResumeToLocalStorage } = props.func;
  const changeStateValue = e => {
    //make totally new array
    const newWorkStateCopy = state.education.concat();
    const currentResumeNum = e.target.dataset.listId;
    const currentResumeInput = e.target.name;
    const newInputValue = e.target.value;
    //changeValue
    newWorkStateCopy[currentResumeNum][currentResumeInput] = newInputValue;

    dispatch({
      type: "CHANGE_EDUCATION",
      education: newWorkStateCopy
    });
  };
  const ListItem = state.education.map((item, index) => {
    return (
      <li key={index}>
        <h4>School</h4>
        <input
          type="text"
          name="school"
          value={item.school}
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
    let newArray = state.education.concat();
    if (e.target.textContent === "+") {
      newArray.push({ school: "", time: "", desc: "" });
    } else {
      newArray.pop();
    }

    dispatch({
      type: "CHANGE_EDUCATION",
      education: newArray
    });
  };

  return (
    <div className="edit-input__work">
      <label>
        <input
          onChange={useDispatch}
          onBlur={saveResumeToLocalStorage}
          type="text"
          name="workTitle"
          className="edit-input__title"
          value={state.educationTitle}
        />
      </label>

      <ul>{ListItem}</ul>
      <button
        onClick={handleClick}
        name="link"
        className="edit-input__button edit-input__button_add"
      >
        +
      </button>
      {state.education.length > 1 ? (
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

export default Education;
