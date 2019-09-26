import React from "react";
import { useStateValue } from "../../../state";
import { isArray } from "util";

const Recommends = props => {
  const [state, dispatch] = useStateValue();

  const { useDispatch, saveResumeToLocalStorage } = props.func;

  const changeStateValue = e => {
    //make totally new array
    const newWorkStateCopy = state.recommends.concat();
    const currentResumeNum = e.target.dataset.listId;
    const currentResumeInput = e.target.name;
    const newInputValue = e.target.value;
    //changeValue
    newWorkStateCopy[currentResumeNum][currentResumeInput] = newInputValue;

    dispatch({
      type: "CHANGE_RECOMMENDS",
      recommends: newWorkStateCopy
    });
  };

  const ListItem = state.recommends.map((item, index) => {
    return (
      <li key={index}>
        <h4>Name and company</h4>
        <input
          type="text"
          name="nameRecommends"
          value={item.nameRecommends}
          data-list-id={index}
          onChange={changeStateValue}
          onBlur={saveResumeToLocalStorage}
        />
        <h4>Phone</h4>
        <input
          type="text"
          name="phoneRecommends"
          value={item.phoneRecommends}
          data-list-id={index}
          onChange={changeStateValue}
          onBlur={saveResumeToLocalStorage}
        />
        <h4>Email</h4>
        <input
          type="text"
          name="email"
          value={item.email}
          data-list-id={index}
          onChange={changeStateValue}
          onBlur={saveResumeToLocalStorage}
        />
      </li>
    );
  });

  const handleClick = e => {
    let newArray = state.recommends.concat();
    if (e.target.textContent === "+") {
      newArray.push({ nameRecommends: "", phoneRecommends: "" });
    } else {
      newArray.pop();
    }

    dispatch({
      type: "CHANGE_RECOMMENDS",
      recommends: newArray
    });
  };

  return (
    <div className="edit-input__recommends">
      <label>
        <input
          onChange={useDispatch}
          onBlur={saveResumeToLocalStorage}
          type="text"
          name="recommendsTitle"
          className="edit-input__title"
          value={state.recommendsTitle}
        />
      </label>

      <ul>{ListItem}</ul>
      <button
        onClick={handleClick}
        className="edit-input__button edit-input__button_add"
      >
        +
      </button>
      {state.recommends.length > 1 ? (
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

export default Recommends;
