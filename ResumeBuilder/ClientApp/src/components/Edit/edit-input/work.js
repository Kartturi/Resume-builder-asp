import React from "react";
import { useStateValue } from "../../../state";
import getActionType from "../../../utils/getActionType";
import { isArray } from "util";

const Work = props => {
  const [state, dispatch] = useStateValue();

  const { useDispatch, saveResumeToLocalStorage } = props.func;
  const changeStateValue = e => {
    //make totally new array
    const newWorkStateCopy = state.work.concat();
    const currentResumeNum = e.target.dataset.listId;
    const currentResumeInput = e.target.name;
    const newInputValue = e.target.value;
    //changeValue
    newWorkStateCopy[currentResumeNum][currentResumeInput] = newInputValue;

    dispatch({
      type: "CHANGE_WORK",
      work: newWorkStateCopy
    });
  };
  const ListItem = state.work.map((item, index) => {
    return (
      <li key={index}>
        <h4>company</h4>
        <input
          type="text"
          name="company"
          value={item.company}
          data-list-id={index}
          onChange={changeStateValue}
          onBlur={saveResumeToLocalStorage}
        />
        <h4>Position</h4>
        <input
          type="text"
          name="position"
          value={item.position}
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
          rows="10"
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
    let newArray = state.work.concat();
    if (e.target.textContent === "+") {
      newArray.push({ position: "", time: "", desc: "" });
    } else {
      newArray.pop();
    }

    dispatch({
      type: "CHANGE_WORK",
      work: newArray
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
          value={state.workTitle}
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
      {state.work.length > 1 ? (
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

export default Work;
