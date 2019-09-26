import React, { useEffect } from "react";
import { useStateValue } from "../../state";
//components
import EditInput from "./edit-input";
import EditPreview from "./edit-preview";

const Edit = props => {
  const search = props.history.location.search;
  const index = Number(search.charAt(search.length - 1));
  const [state, dispatch] = useStateValue();
  useEffect(() => {
    //get the right resume from localstorage

    const resumes = JSON.parse(localStorage.getItem("resumes"));
    const resume = resumes[index];
    //add resume info to state
    dispatch({
      type: "CHANGE_RESUME",
      all: resume
    });
  }, []);

  return (
    <div className="edit-container">
      <EditInput index={index} />
      <EditPreview state={state} />
    </div>
  );
};

export default Edit;
