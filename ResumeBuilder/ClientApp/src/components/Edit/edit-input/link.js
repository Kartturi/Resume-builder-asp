import React from "react";
import { useStateValue } from "../../../state";
import getActionType from "../../../utils/getActionType";

const Links = props => {
  const [state, dispatch] = useStateValue();
  //   const { useDispatch, saveResumeToLocalStorage } = props.use;
  const { useDispatch, saveResumeToLocalStorage } = props.func;

  const changeArrValue = e => {
    const currentLink = e.target.dataset.listId;
    const newArr = state.link.concat();
    newArr[currentLink] = e.target.value;
    dispatch({
      type: getActionType(e.target.name),
      [e.target.name]: newArr
    });
  };
  const ListItem = state.link.map((item, index) => {
    return (
      <li key={index}>
        <label>
          <input
            type="text"
            data-list-id={index}
            onChange={changeArrValue}
            onBlur={saveResumeToLocalStorage}
            name="link"
            placeholder="link"
            value={item}
          />
        </label>
      </li>
    );
  });

  const handleClick = e => {
    let newArray = state.link.concat();
    if (e.target.textContent === "+") {
      newArray.push("");
    } else {
      newArray.pop();
    }

    dispatch({
      type: getActionType(e.target.name),
      [e.target.name]: newArray
    });
  };

  return (
    <div className="edit-input__link">
      <label>
        <input
          onChange={useDispatch}
          onBlur={saveResumeToLocalStorage}
          type="text"
          name="linkTitle"
          className="edit-input__title"
          value={state.linkTitle}
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
      {state.link.length > 1 ? (
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

export default Links;
