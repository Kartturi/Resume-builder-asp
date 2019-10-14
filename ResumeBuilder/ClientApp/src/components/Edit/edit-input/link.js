import React from "react";
import { useStateValue } from "../../../state";
import getActionType from "../../../utils/getActionType";

const Links = props => {
  const [state, dispatch] = useStateValue();
  //   const { useDispatch, saveResumeToLocalStorage } = props.use;
    

  const changeLinkValue = e => {
      const index = e.target.dataset.listId;
      const newArr = [...state.links];

      newArr[index].name = e.target.value;
      console.log(newArr[index].name, "changeArrValue");
      dispatch({
          type: getActionType(e.target.name),
          [e.target.name]: newArr
      });
    };


  

    const updateLink = e => {
        const linkId = e.target.dataset.linkId;
        const index = e.target.dataset.listId;
        const actionType = e.target.name;
        const updateLinkUrl = `https://localhost:44318/api/links/${state.resumeId}`;
        const linkData = { name: state.links[index].name, linkId };
        async function updateLink() {
            
            
            const response = await fetch(updateLinkUrl, {
                method: 'PUT',
                mode: 'cors', // no-cors, *cors, same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'same-origin', // include, *same-origin, omit
                headers: {
                    'Content-Type': 'application/json'
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify(linkData) // body data type must match "Content-Type" header
            })
            const resumeLinks = await response.json();

            dispatch({
                type: getActionType(actionType),
                [actionType]: resumeLinks
            });
        }
        updateLink()
    }
    const addLink = e => {
        console.log(e.target, "wht");
        const actionType = e.target.name;
        async function saveNewLink() {
            const linkUrl = `https://localhost:44318/api/links/${state.resumeId}`;
            const linkData = { name: "", resumeId: state.resumeId };
            const response = await fetch(linkUrl, {
                method: 'POST',
                mode: 'cors', // no-cors, *cors, same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'same-origin', // include, *same-origin, omit
                headers: {
                    'Content-Type': 'application/json'
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify(linkData) // body data type must match "Content-Type" header
            })
            const resumeLinks = await response.json();
            
            dispatch({
                type: getActionType(actionType),
                [actionType]: resumeLinks
            });
        }
        saveNewLink()
        
    };
    const deleteLink = e => {
        
        const actionType = e.target.name;
        const latestLinkId = state.links[state.links.length - 1].linkId;
        console.log(latestLinkId, actionType, "from delete");
        async function deleteLink() {
            const linkUrl = `https://localhost:44318/api/links/${latestLinkId}`;
            
            const response = await fetch(linkUrl, {
                method: 'DELETE',
                mode: 'cors', // no-cors, *cors, same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'same-origin', // include, *same-origin, omit
                headers: {
                    'Content-Type': 'application/json'
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                
            })
            const resumeLinks = await response.json();

            dispatch({
                type: getActionType(actionType),
                [actionType]: resumeLinks
            });
        }
        deleteLink()

    };
    const ListItem = state.links.map((item, index) => {
        return (
            <li key={index}>
                <label>
                    <input
                        type="text"
                        data-list-id={index}
                        data-link-id={item.linkId}
                        onChange={changeLinkValue}
                        onBlur={updateLink}
                        name="links"
                        placeholder="link"
                        value={item.name}
                    />
                </label>
            </li>
        );
    });

    console.log(state, "from links");
  return (
    <div className="edit-input__link">
      <label>
        <input
          
          type="text"
          name="linkTitle"
          className="edit-input__title"
          value={state.linkTitle}
        />
      </label>

      <ul>{ListItem}</ul>
          <button
              onClick={addLink}
        name="links"
        className="edit-input__button edit-input__button_add"
      >
        +
      </button>
          {state.links.length > 1 ? (
              <button
                  onClick={deleteLink}
          name="links"
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
