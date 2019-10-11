import React, { useState, useEffect } from "react";
import { useStateValue } from "../state";
import { Link } from "react-router-dom";
import initialState from "../initialState";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//utils
import { getResumesLS, setResumesLS } from "../utils/getSetResumes";

const Dashboard = () => {
  const [resumes, setResumes] = useState([]);
  //localstorage resumes

  useEffect(() => {
    const resumesLS = JSON.parse(localStorage.getItem("resumes"));
    if (resumesLS) {
      setResumes(resumesLS);
    }
  }, []);

  const changeResumeName = e => {
    const resumeIndex = Number(e.target.dataset.resumeIndex);
    const resumesLS = JSON.parse(localStorage.getItem("resumes"));

    resumesLS[resumeIndex].resumeName = e.target.value;

    //save to localhost and component state
    localStorage.setItem("resumes", JSON.stringify(resumesLS));
    setResumes(resumesLS);
    console.log(resumesLS, "from changeResume");
  };

  const changeLayout = e => {
    const resumeIndex = Number(e.target.dataset.resumeIndex);
    const resumesLS = JSON.parse(localStorage.getItem("resumes"));

    resumesLS[resumeIndex].layout = e.target.value;

    //save to localhost and component state
    localStorage.setItem("resumes", JSON.stringify(resumesLS));
    setResumes(resumesLS);
    console.log(resumesLS, "from changeResume");
  };

  const deleteResume = e => {
    const resumeIndex = e.target.dataset.resumeIndex;
    const resumeLS = getResumesLS();

    resumeLS.splice(resumeIndex, 1);
    //save to localstorage
    setResumesLS(resumeLS);
    setResumes(resumeLS);
    console.log(resumeLS, "from delete");
  };

  const duplicateResume = e => {
    //get resume from ls
    const resumeIndex = e.target.dataset.resumeIndex;
    const resumesLS = getResumesLS();
    const newResume = Object.assign({}, resumesLS[resumeIndex]);

    //make new name for new copy
    newResume.resumeName = newResume.resumeName + "-copy";

    resumesLS.splice(resumeIndex, 0, newResume);
    setResumesLS(resumesLS);
    setResumes(resumesLS);
    console.log(resumesLS, "from duplicate");

    //make new copy of it

    //add new copy to resumes

    //add to localstorage and component state
  };

  const resumeListItem = resumes.map((item, index) => {
    return (
      <div
        className="dashboard-resumes__section"
        key={index}
        data-resume-index={index}
      >
        <Link to={`/edit?index=${index}`}>Edit</Link>
        <Link to={`/preview?index=${index}`}>Preview</Link>
        <button onClick={deleteResume} data-resume-index={index}>
          Delete
        </button>
        <button onClick={duplicateResume} data-resume-index={index}>
          Duplicate
        </button>
        <select
          name="layout"
          onChange={changeLayout}
          data-resume-index={index}
          value={item.layout}
        >
          <option value="resume1">Turku</option>
          <option value="resume2">Vaasa</option>
          <option value="resume3">Rauma</option>
          <option value="resume4">Pori</option>
        </select>
        <input
          onChange={changeResumeName}
          data-resume-index={index}
          className="dashboard-resumes__section_name"
          value={item.resumeName}
        />
      </div>
    );
  });

  const createNewResume = () => {
    const resumesLS = JSON.parse(localStorage.getItem("resumes"));
    if (!resumesLS) {
      //create new resume storage to localhost
      const newResumeArr = [initialState];
      localStorage.setItem("resumes", JSON.stringify(newResumeArr));
      setResumes(newResumeArr);
    } else {
      const newResumeList = JSON.parse(localStorage.getItem("resumes"));
      newResumeList.unshift(initialState);
      localStorage.setItem("resumes", [JSON.stringify(newResumeList)]);
      setResumes(newResumeList);
    }
  };
  console.log(resumes);
  return (
    <div className="dashboard">
      <h1>Dashboard</h1>

      <div className="dashboard-resumes">
        <div className="dashboard-resumes__container">
          <div className="dashboard-resumes__add_container">
            {resumes.length === 0 ? <h1>Make new Resume</h1> : ""}
            <FontAwesomeIcon
              className="dashboard-resumes__add"
              icon="plus"
              onClick={createNewResume}
              className="dashboard-resumes__add"
            />
          </div>
          <div className="dashboard-resumes__section_container">
            {resumeListItem}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
