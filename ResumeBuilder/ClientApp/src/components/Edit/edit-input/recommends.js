import React from "react";
import { useStateValue } from "../../../state";
import getActionType from "../../../utils/getActionType";
import { isArray } from "util";

const Recommends = props => {
    const [state, dispatch] = useStateValue();
    const { useDispatch, saveResumeToDb } = props.func;

    const changeRecommendsStateValue = e => {
        const actionType = e.target.name;
        const newStateValue = [...state.recommends];

        const index = e.target.dataset.listId;
        newStateValue[index][actionType] = e.target.value;
        console.log(newStateValue, "newstate");
        dispatch({
            type: "CHANGE_RECOMMENDS",
            recommends: newStateValue
        })
    };

    const updateRecommends = e => {
        const recommendsId = e.target.dataset.recommendsId;
        const index = e.target.dataset.listId;
        const resumeId = state.resumeId;
        const updateRecommendsUrl = `https://localhost:44318/api/recommends/${resumeId}`;
        const currentRecommendsData = state.recommends[index];
        const recommendsData = {
            nameRecommends: currentRecommendsData.nameRecommends,
            phoneRecommends: currentRecommendsData.phoneRecommends,
            email: currentRecommendsData.email, resumeId: state.resumeId,
            recommendsId
        };
        async function updateRecommendsData() {
            const response = await fetch(updateRecommendsUrl, {
                method: 'PUT',
                mode: 'cors', // no-cors, *cors, same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'same-origin', // include, *same-origin, omit
                headers: {
                    'Content-Type': 'application/json'
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify(recommendsData) // body data type must match "Content-Type" header
            })
            const data = await response
            console.log(data);
        }
        updateRecommendsData()

    }
    const ListItem = state.recommends.map((item, index) => {
        return (
            <li key={index}>
                <h4>Name</h4>
                <input
                    type="text"
                    name="nameRecommends"
                    value={item.nameRecommends}
                    data-list-id={index}
                    data-recommends-id={item.recommendsId}
                    onChange={changeRecommendsStateValue}
                    onBlur={updateRecommends}
                />
                <h4>Phone</h4>
                <input
                    type="text"
                    name="phoneRecommends"
                    value={item.phoneRecommends}
                    data-list-id={index}
                    data-recommends-id={item.recommendsId}
                    onChange={changeRecommendsStateValue}
                    onBlur={updateRecommends}
                />
                <h4>Email</h4>
                <textarea
                    rows="10"
                    type="text"
                    name="email"
                    value={item.email}
                    data-list-id={index}
                    data-recommends-id={item.recommendsId}
                    onChange={changeRecommendsStateValue}
                    onBlur={updateRecommends}
                />
            </li>
        );
    });

    const addRecommendsData = e => {

        const actionType = e.target.name;
        async function addRecommends() {
            const recommendsUrl = `https://localhost:44318/api/recommends/${state.resumeId}`;
            const recommendsData = {
                nameRecommends: "",
                phoneRecommends: "",
                email: "", resumeId: state.resumeId

            };
            const response = await fetch(recommendsUrl, {
                method: 'POST',
                mode: 'cors', // no-cors, *cors, same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'same-origin', // include, *same-origin, omit
                headers: {
                    'Content-Type': 'application/json'
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify(recommendsData) // body data type must match "Content-Type" header
            })
            const newRecommendsData = await response.json();

            dispatch({
                type: "CHANGE_RECOMMENDS",
                [actionType]: newRecommendsData
            });
        }
        addRecommends()

    };
    const deleteRecommendsData = e => {
        const actionType = e.target.name;

        const latestRecommendsDataId = state.recommends[state.recommends.length - 1].recommendsId;
        async function deleteRecommends() {
            const recommendsUrl = `https://localhost:44318/api/recommends/${latestRecommendsDataId}`;
            const response = await fetch(recommendsUrl, {
                method: 'DELETE',
                mode: 'cors', // no-cors, *cors, same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'same-origin', // include, *same-origin, omit
                headers: {
                    'Content-Type': 'application/json'
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },

            })
            const recommendsData = await response.json();

            dispatch({
                type: "CHANGE_RECOMMENDS",
                [actionType]: recommendsData
            });
        }
        deleteRecommends();

    };

    return (
        <div className="edit-input__work">
            <label>
                <input
                    onChange={useDispatch}
                    onBlur={saveResumeToDb}
                    type="text"
                    name="recommendsTitle"
                    className="edit-input__title"
                    value={state.recommendsTitle}
                />
            </label>

            <ul>{ListItem}</ul>
            <button
                onClick={addRecommendsData}
                name="recommends"
                className="edit-input__button edit-input__button_add"
            >
                +
      </button>
            {state.recommends.length > 1 ? (
                <button
                    onClick={deleteRecommendsData}
                    name="recommends"
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
