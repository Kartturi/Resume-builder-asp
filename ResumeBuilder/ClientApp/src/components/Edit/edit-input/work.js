import React from "react";
import { useStateValue } from "../../../state";
import getActionType from "../../../utils/getActionType";
import { isArray } from "util";

const Work = props => {
  const [state, dispatch] = useStateValue();
  const { useDispatch, saveResumeToDb } = props.func;
  
    const changeStateValue = e => {
        const NewWorkState = [...state.workData];
        const currentInput = e.target.name;
        const index = e.target.dataset.listId;
        NewWorkState[index][currentInput] = e.target.value;
        console.log(NewWorkState, "newstate");
        dispatch({
            type: "CHANGE_WORK",
            workData: NewWorkState
        })
    };

  const updateWorkData = e => {

      const workId = e.target.dataset.workId;
      const index = e.target.dataset.listId;
      const resumeId = state.resumeId;
      
      const updateWorkDataUrl = `https://localhost:44318/api/workdatas/${resumeId}`;
      const currentWorkData = state.workData[index];
      const workData = {
          company: currentWorkData.company,
          position: currentWorkData.position,
          time: currentWorkData.time,
          description: currentWorkData.description, resumeId: state.resumeId,
          workId
      };
      async function updateWork() {
           const response = await fetch(updateWorkDataUrl, {
              method: 'PUT',
              mode: 'cors', // no-cors, *cors, same-origin
              cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
              credentials: 'same-origin', // include, *same-origin, omit
              headers: {
                   'Content-Type': 'application/json'
                   // 'Content-Type': 'application/x-www-form-urlencoded',
               },
              body: JSON.stringify(workData) // body data type must match "Content-Type" header
           })
          const data = await response
          console.log(data);
          
      }
      updateWork()

  }
  const ListItem = state.workData.map((item, index) => {
    return (
      <li key={index}>
        <h4>company</h4>
        <input
          type="text"
          name="company"
          value={item.company}
                data-list-id={index}
                data-work-id={item.workId}
          onChange={changeStateValue}
                onBlur={updateWorkData}
        />
        <h4>Position</h4>
        <input
          type="text"
          name="position"
          value={item.position}
                data-list-id={index}
                data-work-id={item.workId}
          onChange={changeStateValue}
                onBlur={updateWorkData}
        />
        <h4>Time</h4>
        <input
          type="text"
          name="time"
          value={item.time}
                data-list-id={index}
                data-work-id={item.workId}
          onChange={changeStateValue}
                onBlur={updateWorkData}
        />
        <h4>Description</h4>
        <textarea
          rows="10"
          type="text"
          name="description"
          value={item.description}
                data-list-id={index}
                data-work-id={item.workId}
          onChange={changeStateValue}
                onBlur={updateWorkData}
        />
      </li>
    );
  });
    
    const addWorkData = e => {
        
        const actionType = e.target.name;
        async function saveWorkData() {
            const workDataUrl = `https://localhost:44318/api/workDatas/${state.resumeId}`;
            const workData = { company: "", position: "",time: "",description: "", resumeId: state.resumeId };
            const response = await fetch(workDataUrl, {
                method: 'POST',
                mode: 'cors', // no-cors, *cors, same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'same-origin', // include, *same-origin, omit
                headers: {
                    'Content-Type': 'application/json'
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify(workData) // body data type must match "Content-Type" header
            })
            const resumeWorkdata = await response.json();

            dispatch({
                type: "CHANGE_WORK",
                [actionType]: resumeWorkdata
            });
        }
        saveWorkData()

    };
    const deleteWorkData = e => {
        const actionType = e.target.name;
        
        const latestWorkDataId = state.workData[state.workData.length - 1].workId;
        console.log(actionType, getActionType(actionType), "what is this");
        async function deleteWork() {
            const workDataUrl = `https://localhost:44318/api/workDatas/${latestWorkDataId}`;
            const response = await fetch(workDataUrl, {
                method: 'DELETE',
                mode: 'cors', // no-cors, *cors, same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'same-origin', // include, *same-origin, omit
                headers: {
                    'Content-Type': 'application/json'
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },

            })
            const resumeWorkdata = await response.json();
            
            dispatch({
                type: "CHANGE_WORK",
                [actionType]: resumeWorkdata
            });
        }
        deleteWork();

    };

  return (
    <div className="edit-input__work">
      <label>
        <input
          
        onChange={useDispatch}
        onBlur={saveResumeToDb}
          type="text"
          name="workTitle"
          className="edit-input__title"
          value={state.workTitle}
        />
      </label>

      <ul>{ListItem}</ul>
      <button
              onClick={addWorkData}
        name="workData"
        className="edit-input__button edit-input__button_add"
      >
        +
      </button>
      {state.workData.length > 1 ? (
        <button
          onClick={deleteWorkData}
                  name="workData"
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
