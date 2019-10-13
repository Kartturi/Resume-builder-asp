import React, { useEffect } from "react";
import { useStateValue } from "../../state";
import { useParams } from "react-router-dom";
//components
import EditInput from "./edit-input";
import EditPreview from "./edit-preview";

const Edit = props => {
  
   const { resumeId } = useParams();
  const [state, dispatch] = useStateValue();
    useEffect(() => {
        async function getResumeData() {

            console.log(resumeId, "preview started");
            const getResumeUrl = `https://localhost:44318/api/resumedatas/getresumedata/${resumeId}`;

            const response = await fetch(getResumeUrl);
            const resumeData = await response.json();
            console.log(resumeData, "from preview");
            //add resume info to state
            dispatch({
                type: "CHANGE_RESUME",
                all: resumeData
            });

        }
        getResumeData()


    }, []);

  return (
      <div className="edit-container">
          <EditInput id={resumeId} />
      <EditPreview state={state} />
    </div>
  );
};

export default Edit;
