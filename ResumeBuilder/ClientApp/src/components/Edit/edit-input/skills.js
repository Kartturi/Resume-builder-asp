import React from "react";
import { useStateValue } from "../../../state";
import getActionType from "../../../utils/getActionType";


const Skills = props => {
    const [state, dispatch] = useStateValue();
    const { useDispatch, saveResumeToDb } = props.func;

    const changeSkillsStateValue = e => {
        const actionType = e.target.name;
        const newStateValue = [...state.skills];

        const index = e.target.dataset.listId;
        newStateValue[index][actionType] = e.target.value;
        console.log(newStateValue, "newstate");
        dispatch({
            type: "CHANGE_SKILLS",
            skills: newStateValue
        })
    };

    const updateSkills = e => {

        const skillsId = e.target.dataset.skillsId;
        const index = e.target.dataset.listId;
        const resumeId = state.resumeId;
        console.log(e.target.dataset.skillsId);
        const updateSkillsUrl = `https://localhost:44318/api/skills/${resumeId}`;
        const currentSkillsData = state.skills[index];
        const skillsData = {
            
            name: currentSkillsData.name,
            level: currentSkillsData.level, resumeId: state.resumeId,
            skillsId
        };
        async function updateSkillsData() {
            const response = await fetch(updateSkillsUrl, {
                method: 'PUT',
                mode: 'cors', // no-cors, *cors, same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'same-origin', // include, *same-origin, omit
                headers: {
                    'Content-Type': 'application/json'
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify(skillsData) // body data type must match "Content-Type" header
            })
            const data = await response
            console.log(data);
        }
        updateSkillsData()

    }
    const ListItem = state.skills.map((item, index) => {
        return (
            <li key={index}>
                <h4>Skill</h4>
                <input
                    type="text"
                    name="name"
                    value={item.name}
                    data-list-id={index}
                    data-skills-id={item.skillsId}
                    onChange={changeSkillsStateValue}
                    onBlur={updateSkills}
                />
                <h4>Level</h4>
                
                <select
                    name="level"
                    onChange={changeSkillsStateValue}
                    onBlur={updateSkills}
                    value={item.level}
                    data-skills-id={item.skillsId}
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

    const addSkillsData = e => {

        const actionType = e.target.name;
        async function addSkills() {
            const skillsUrl = `https://localhost:44318/api/skills/${state.resumeId}`;
            const skillsData = {
                name: "",
                level: 0,
                resumeId: state.resumeId

            };
            const response = await fetch(skillsUrl, {
                method: 'POST',
                mode: 'cors', // no-cors, *cors, same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'same-origin', // include, *same-origin, omit
                headers: {
                    'Content-Type': 'application/json'
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify(skillsData) // body data type must match "Content-Type" header
            })
            const newskillsData = await response.json();

            dispatch({
                type: "CHANGE_SKILLS",
                [actionType]: newskillsData
            });
        }
        addSkills()

    };
    const deleteSkillsData = e => {
        const actionType = e.target.name;

        const latestSkillsDataId = state.skills[state.skills.length - 1].skillsId;
        async function deleteSkills() {
            const skillsUrl = `https://localhost:44318/api/skills/${latestSkillsDataId}`;
            const response = await fetch(skillsUrl, {
                method: 'DELETE',
                mode: 'cors', // no-cors, *cors, same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'same-origin', // include, *same-origin, omit
                headers: {
                    'Content-Type': 'application/json'
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },

            })
            const skillsData = await response.json();

            dispatch({
                type: "CHANGE_SKILLS",
                [actionType]: skillsData
            });
        }
        deleteSkills();

    };

    return (
        <div className="edit-input__work">
            <label>
                <input

                    onChange={useDispatch}
                    onBlur={saveResumeToDb}
                    type="text"
                    name="skillsTitle"
                    className="edit-input__title"
                    value={state.skillsTitle}
                />
            </label>

            <ul>{ListItem}</ul>
            <button
                onClick={addSkillsData}
                name="skills"
                className="edit-input__button edit-input__button_add"
            >
                +
      </button>
            {state.skills.length > 1 ? (
                <button
                    onClick={deleteSkillsData}
                    name="skills"
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
