import React from "react";
import { useStateValue } from "../../../state";
import getActionType from "../../../utils/getActionType";
import { isArray } from "util";

const Education = props => {
    const [state, dispatch] = useStateValue();
    const { useDispatch, saveResumeToDb } = props.func;

    const changeEducationStateValue = e => {
        const actionType = e.target.name;
        const newStateValue = [...state.education];
        
        const index = e.target.dataset.listId;
        newStateValue[index][actionType] = e.target.value;
        console.log(newStateValue, "newstate");
        dispatch({
            type: "CHANGE_EDUCATION",
            education: newStateValue
        })
    };

    const updateEducation = e => {

        const educationId = e.target.dataset.educationId;
        const index = e.target.dataset.listId;
        const resumeId = state.resumeId;
        console.log(e.target.dataset.educationId);
        const updateEducationUrl = `https://localhost:44318/api/educations/${resumeId}`;
        const currentEducationData = state.education[index];
        const educationData = {
            school: currentEducationData.school,
            time: currentEducationData.time,
            description: currentEducationData.description, resumeId: state.resumeId,
            educationId
        };
        async function updateEducationData() {
           const response = await fetch(updateEducationUrl, {
                method: 'PUT',
                mode: 'cors', // no-cors, *cors, same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'same-origin', // include, *same-origin, omit
                headers: {
                   'Content-Type': 'application/json'
                   // 'Content-Type': 'application/x-www-form-urlencoded',
               },
                body: JSON.stringify(educationData) // body data type must match "Content-Type" header
           })
            const data = await response
            console.log(data);
        }
        updateEducationData()

    }
    const ListItem = state.education.map((item, index) => {
        return (
            <li key={index}>
                <h4>School</h4>
                <input
                    type="text"
                    name="school"
                    value={item.school}
                    data-list-id={index}
                    data-education-id={item.educationId}
                    onChange={changeEducationStateValue}
                    onBlur={updateEducation}
                />
                <h4>Time</h4>
                <input
                    type="text"
                    name="time"
                    value={item.time}
                    data-list-id={index}
                    data-education-id={item.educationId}
                    onChange={changeEducationStateValue}
                    onBlur={updateEducation}
                />
                <h4>Description</h4>
                <textarea
                    rows="10"
                    type="text"
                    name="description"
                    value={item.description}
                    data-list-id={index}
                    data-education-id={item.educationId}
                    onChange={changeEducationStateValue}
                    onBlur={updateEducation}
                />
            </li>
        );
    });

    const addEducationData = e => {

        const actionType = e.target.name;
        async function addEducation() {
            const educationUrl = `https://localhost:44318/api/educations/${state.resumeId}`;
            const educationData = {
                school: "",
                time: "",
                description: "", resumeId: state.resumeId
                
            };
            const response = await fetch(educationUrl, {
                method: 'POST',
                mode: 'cors', // no-cors, *cors, same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'same-origin', // include, *same-origin, omit
                headers: {
                    'Content-Type': 'application/json'
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify(educationData) // body data type must match "Content-Type" header
            })
            const newEducationData = await response.json();

            dispatch({
                type: "CHANGE_EDUCATION",
                [actionType]: newEducationData
            });
        }
        addEducation()

    };
    const deleteEducationData = e => {
        const actionType = e.target.name;

        const latestEducationDataId = state.education[state.education.length - 1].educationId;
        async function deleteEducation() {
            const educationUrl = `https://localhost:44318/api/educations/${latestEducationDataId}`;
            const response = await fetch(educationUrl, {
                method: 'DELETE',
                mode: 'cors', // no-cors, *cors, same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'same-origin', // include, *same-origin, omit
                headers: {
                    'Content-Type': 'application/json'
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },

            })
            const educationData = await response.json();

            dispatch({
                type: "CHANGE_EDUCATION",
                [actionType]: educationData
            });
        }
        deleteEducation();

    };

    return (
        <div className="edit-input__work">
            <label>
                <input

                    onChange={useDispatch}
                    onBlur={saveResumeToDb}
                    type="text"
                    name="educationTitle"
                    className="edit-input__title"
                    value={state.educationTitle}
                />
            </label>

            <ul>{ListItem}</ul>
            <button
                onClick={addEducationData}
                name="education"
                className="edit-input__button edit-input__button_add"
            >
                +
      </button>
            {state.education.length > 1 ? (
                <button
                    onClick={deleteEducationData}
                    name="education"
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
