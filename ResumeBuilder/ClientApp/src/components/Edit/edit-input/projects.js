import React from "react";
import { useStateValue } from "../../../state";
import getActionType from "../../../utils/getActionType";
import { isArray } from "util";

const Projects = props => {
    const [state, dispatch] = useStateValue();
    const { useDispatch, saveResumeToDb } = props.func;

    const changeProjectsStateValue = e => {
        const actionType = e.target.name;
        const newStateValue = [...state.projects];

        const index = e.target.dataset.listId;
        newStateValue[index][actionType] = e.target.value;
        console.log(newStateValue, "newstate");
        dispatch({
            type: "CHANGE_PROJECTS",
            projects: newStateValue
        })
    };

    const updateProjects = e => {

        const projectsId = e.target.dataset.projectsId;
        const index = e.target.dataset.listId;
        const resumeId = state.resumeId;
        console.log(e.target.dataset.projectsId);
        const updateProjectsUrl = `https://localhost:44318/api/projects/${projectsId}`;
        const currentProjectsData = state.projects[index];
        const projectsData = {
            name: currentProjectsData.name,
            time: currentProjectsData.time,
            description: currentProjectsData.description, resumeId: state.resumeId,
            projectsId
        };
        async function updateProjectsData() {
            const response = await fetch(updateProjectsUrl, {
                method: 'PUT',
                mode: 'cors', // no-cors, *cors, same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'same-origin', // include, *same-origin, omit
                headers: {
                    'Content-Type': 'application/json'
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify(projectsData) // body data type must match "Content-Type" header
            })
            const data = await response
            console.log(data);
        }
        updateProjectsData()

    }
    const ListItem = state.projects.map((item, index) => {
        return (
            <li key={index}>
                <h4>Name</h4>
                <input
                    type="text"
                    name="name"
                    value={item.name}
                    data-list-id={index}
                    data-projects-id={item.projectsId}
                    onChange={changeProjectsStateValue}
                    onBlur={updateProjects}
                />
                <h4>Time</h4>
                <input
                    type="text"
                    name="time"
                    value={item.time}
                    data-list-id={index}
                    data-projects-id={item.projectsId}
                    onChange={changeProjectsStateValue}
                    onBlur={updateProjects}
                />
                <h4>Description</h4>
                <textarea
                    rows="10"
                    type="text"
                    name="description"
                    value={item.description}
                    data-list-id={index}
                    data-projects-id={item.projectsId}
                    onChange={changeProjectsStateValue}
                    onBlur={updateProjects}
                />
            </li>
        );
    });

    const addProjectsData = e => {

        const actionType = e.target.name;
        async function addProjects() {
            const projectsUrl= `https://localhost:44318/api/projects/${state.resumeId}`;
            const projectData = {
                name: "",
                time: "",
                description: "", resumeId: state.resumeId

            };
            const response = await fetch(projectsUrl, {
                method: 'POST',
                mode: 'cors', // no-cors, *cors, same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'same-origin', // include, *same-origin, omit
                headers: {
                    'Content-Type': 'application/json'
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify(projectData) // body data type must match "Content-Type" header
            })
            const newProjectsData = await response.json();

            dispatch({
                type: "CHANGE_PROJECTS",
                [actionType]: newProjectsData
            });
        }
        addProjects()

    };
    const deleteProjectsData = e => {
        const actionType = e.target.name;

        const latestProjectsId = state.projects[state.projects.length - 1].projectsId;
        async function deleteProjects() {
            const projectsUrl = `https://localhost:44318/api/projects/${latestProjectsId}`;
            const response = await fetch(projectsUrl, {
                method: 'DELETE',
                mode: 'cors', // no-cors, *cors, same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'same-origin', // include, *same-origin, omit
                headers: {
                    'Content-Type': 'application/json'
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },

            })
            const projectsdata = await response.json();

            dispatch({
                type: "CHANGE_PROJECTS",
                [actionType]: projectsdata
            });
        }
        deleteProjects();

    };

    return (
        <div className="edit-input__work">
            <label>
                <input

                    onChange={useDispatch}
                    onBlur={saveResumeToDb}
                    type="text"
                    name="projectsTitle"
                    className="edit-input__title"
                    value={state.projectsTitle}
                />
            </label>

            <ul>{ListItem}</ul>
            <button
                onClick={addProjectsData}
                name="projects"
                className="edit-input__button edit-input__button_add"
            >
                +
      </button>
            {state.projects.length > 1 ? (
                <button
                    onClick={deleteProjectsData}
                    name="projects"
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

export default Projects;
