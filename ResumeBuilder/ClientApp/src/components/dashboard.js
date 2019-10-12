import React, { useState, useEffect } from "react";
import { useStateValue } from "../state";
import { Link } from "react-router-dom";
import initialState from "../initialState";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


//utils
import { getResumesLS, setResumesLS } from "../utils/getSetResumes";

const Dashboard = () => {
    const [resumes, setResumes] = useState([]);
    const [userId, setUserId] = useState(0);
    const [state, dispatch] = useStateValue();
  //localstorage resumes

    useEffect(() => {
        async function fetchData() {
            const usrID = initialState.userId;
            setUserId(usrID);
            const getResumeQuery = `https://localhost:44318/api/userdatas/${usrID}`;
         //get resumenames and id-s from database
            const response = await fetch(getResumeQuery);
            const resumeIds = await response.json();
            console.log(resumeIds, "response");
         setResumes(resumeIds);
         
        }
        fetchData();
        
  }, []);

    const changeResumeName = e => {
        const resumeIndex = e.target.dataset.resumeIndex;
        let resumesCopy = [...resumes];
        resumesCopy[resumeIndex].resumeName = e.target.value;
        setResumes(resumesCopy);
        console.log(e.target);
    };
    const saveResumeNameToDb = async (e) => {
        const resumeId = resumes[e.target.dataset.resumeIndex].resumeId;
        const changeResumeUrl = `https://localhost:44318/api/resumedatas/${resumeId}`;
        const resumeNameValue = JSON.stringify({ resumeName: e.target.value, userId });
        const response = await fetch(changeResumeUrl, {
            method: 'PUT',
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: resumeNameValue // body data type must match "Content-Type" header
        })
        const resumeIds = await response.json();
        setResumes(resumeIds);
        

    }

  const changeLayout = e => {
      const resumeId = Number(e.target.dataset.resumeIndex);
      
      async function changeLayout() {
          const changeLayoutUrl = `https://localhost:44318/api/resumedatas/${resumeId}`;
          const layoutValue = JSON.stringify({ layout: e.target.value, userId });
          const response = await fetch(changeLayoutUrl, {
              method: 'PUT',
              mode: 'cors', // no-cors, *cors, same-origin
              cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
              credentials: 'same-origin', // include, *same-origin, omit
              headers: {
                  'Content-Type': 'application/json'
                  // 'Content-Type': 'application/x-www-form-urlencoded',
              },
              
              
              body: layoutValue // body data type must match "Content-Type" header
          })
          const resumeIds = await response.json();
          setResumes(resumeIds);
          console.log(resumeIds, "layout");
      }
      changeLayout()
      
  };

  const deleteResume = e => {
      const resumeIndex = e.target.dataset.resumeIndex;
      async function deleteResumeFromDb() {
          const deleteResumeUrl = `https://localhost:44318/api/resumedatas/${resumeIndex}`;
          const response = await fetch(deleteResumeUrl, {
              method: "DELETE"
          });
          const resumeIds = await response.json();
          setResumes(resumeIds);
          
      }
      deleteResumeFromDb();
      

    
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
            <Link to={`/preview/${item.resumeId}`} 
                
            
            >Preview</Link>
        <button onClick={deleteResume} data-resume-index={item.resumeId}>
          Delete
        </button>
        <button onClick={duplicateResume} data-resume-index={index}>
          Duplicate
        </button>
        <select
          name="layout"
                onChange={changeLayout}
                data-resume-index={item.resumeId}
          value={item.layout}
        >
          <option value="resume1">Turku</option>
          <option value="resume2">Vaasa</option>
          <option value="resume3">Rauma</option>
          <option value="resume4">Pori</option>
        </select>
        <input
                onChange={changeResumeName}
                onBlur={saveResumeNameToDb}
          data-resume-index={index}
          className="dashboard-resumes__section_name"
          value={item.resumeName}
        />
      </div>
    );
  });

    const createNewResume = () => {
        async function SaveNewResumeToDB() {
            
            const initResumeTemplate = JSON.stringify(initialState);
            const postResumeUrl = `https://localhost:44318/api/resumedatas`;
            const response = await fetch(postResumeUrl, {
                method: "POST",
                mode: "cors",
                cache: "no-cache",
                headers: {
                    "content-Type": "application/json",
                    "accept": "*/*",
                    
                },
                
                body: initResumeTemplate
            })
            const resumeIds = await response.json();
            setResumes(resumeIds);
            
        }
        SaveNewResumeToDB();
      

      
  };
  console.log(resumes);
  return (
    <div className="dashboard">
          <h1>Resume Builder</h1>
          

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
