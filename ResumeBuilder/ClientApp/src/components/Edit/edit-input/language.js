import React from "react";
import { useStateValue } from "../../../state";
import { isArray } from "util";

const Language = props => {
  const [state, dispatch] = useStateValue();

  const { useDispatch, saveResumeToLocalStorage } = props.func;

  const changeStateValue = e => {
    //make totally new array
    const newWorkStateCopy = state.language.concat();
    const currentResumeNum = e.target.dataset.listId;
    const currentResumeInput = e.target.name;
    const newInputValue = e.target.value;
    //changeValue
    newWorkStateCopy[currentResumeNum][currentResumeInput] = newInputValue;

    dispatch({
      type: "CHANGE_LANGUAGE",
      language: newWorkStateCopy
    });
  };

  const ListItem = state.language.map((item, index) => {
    return (
      <li key={index}>
        <h4>Language</h4>
        <input
          type="text"
          name="language"
          value={item.language}
          data-list-id={index}
          onChange={changeStateValue}
          onBlur={saveResumeToLocalStorage}
        />
        <h4>Level</h4>
        <input
          type="text"
          name="level"
          value={item.level}
          data-list-id={index}
          onChange={changeStateValue}
          onBlur={saveResumeToLocalStorage}
        />
      </li>
    );
  });

  const handleClick = e => {
    let newArray = state.language.concat();
    if (e.target.textContent === "+") {
      newArray.push({ language: "", level: "" });
    } else {
      newArray.pop();
    }

    dispatch({
      type: "CHANGE_LANGUAGE",
      language: newArray
    });
  };

  return (
    <div className="edit-input__language">
      <label>
        <input
          onChange={useDispatch}
          onBlur={saveResumeToLocalStorage}
          type="text"
          name="languageTitle"
          className="edit-input__title"
          value={state.languageTitle}
        />
      </label>

      <ul>{ListItem}</ul>
      <button
        onClick={handleClick}
        className="edit-input__button edit-input__button_add"
      >
        +
      </button>
      {state.language.length > 1 ? (
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

export default Language;
