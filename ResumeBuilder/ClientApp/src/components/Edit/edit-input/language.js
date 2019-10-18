import React from "react";
import { useStateValue } from "../../../state";
import getActionType from "../../../utils/getActionType";
import { isArray } from "util";

const Language = props => {
    const [state, dispatch] = useStateValue();
    const { useDispatch, saveResumeToDb } = props.func;

    const changeLanguageStateValue = e => {
        const actionType = e.target.name;
       const newStateValue = [...state.language];
        console.log("happening");
        const index = e.target.dataset.listId;
        newStateValue[index][actionType] = e.target.value;
        console.log(newStateValue, "newstate");
        dispatch({
            type: "CHANGE_LANGUAGE",
            language: newStateValue
        })
    };

    const updateLanguage = e => {

        const languageId = e.target.dataset.languageId;
        const index = e.target.dataset.listId;
        const resumeId = state.resumeId;
        const updateLanguageUrl = `https://localhost:44318/api/languages/${resumeId}`;
        const currentLanguageData = state.language[index];
        const languageData = {
            name: currentLanguageData.name, level: currentLanguageData.level, resumeId: state.resumeId,
            languageId
        };
        async function updatelanguageData() {
            const response = await fetch(updateLanguageUrl, {
                method: 'PUT',
                mode: 'cors', // no-cors, *cors, same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'same-origin', // include, *same-origin, omit
                headers: {
                    'Content-Type': 'application/json'
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify(languageData) // body data type must match "Content-Type" header
            })
            const data = await response
            console.log(data);
        }
        updatelanguageData()

    }
    const ListItem = state.language.map((item, index) => {
        return (
            <li key={index}>
                <h4>Language</h4>
                <input
                    type="text"
                    name="name"
                    value={item.name}
                    data-list-id={index}
                    data-language-id={item.languageId}
                    onChange={changeLanguageStateValue}
                    onBlur={updateLanguage}
                />
                <h4>Level</h4>
                <input
                    type="text"
                    name="level"
                    value={item.level}
                    data-list-id={index}
                    data-language-id={item.languageId}
                    onChange={changeLanguageStateValue}
                    onBlur={updateLanguage}
                />
            </li>
    );
    });

    const addLanguageData = e => {

        const actionType = e.target.name;
        async function addLanguage() {
            const languageUrl = `https://localhost:44318/api/languages/${state.resumeId}`;
            const languageData = {
                name: "",
                level: "",
                resumeId: state.resumeId

            };
            const response = await fetch(languageUrl, {
                method: 'POST',
                mode: 'cors', // no-cors, *cors, same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'same-origin', // include, *same-origin, omit
                headers: {
                    'Content-Type': 'application/json'
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify(languageData) // body data type must match "Content-Type" header
            })
            const newlanguageData = await response.json();

            dispatch({
                type: "CHANGE_LANGUAGE",
                [actionType]: newlanguageData
            });
        }
        addLanguage()

    };
    const deleteLanguageData = e => {
        const actionType = e.target.name;

        const latestLanguageDataId = state.language[state.language.length - 1].languageId;
        async function deleteLanguage() {
            const languageUrl = `https://localhost:44318/api/languages/${latestLanguageDataId}`;
            const response = await fetch(languageUrl, {
                method: 'DELETE',
                mode: 'cors', // no-cors, *cors, same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'same-origin', // include, *same-origin, omit
                headers: {
                    'Content-Type': 'application/json'
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },

            })
            const languageData = await response.json();

            dispatch({
                type: "CHANGE_LANGUAGE",
                [actionType]: languageData
            });
        }
        deleteLanguage();

    };

    return (
        <div className="edit-input__work">
            <label>
                <input

                    onChange={useDispatch}
                    onBlur={saveResumeToDb}
                    type="text"
                    name="languageTitle"
                    className="edit-input__title"
                    value={state.languageTitle}
                />
            </label>

            <ul>{ListItem}</ul>
            <button
                onClick={addLanguageData}
                name="language"
                className="edit-input__button edit-input__button_add"
            >
                +
      </button>
            {state.language.length > 1 ? (
                <button
                    onClick={deleteLanguageData}
                    name="language"
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
