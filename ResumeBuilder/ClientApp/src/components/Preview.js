import React, { useEffect, useState } from "react";
import { getResumesLS } from "../utils/getSetResumes";
import { useStateValue } from "../state";
import { useParams } from "react-router-dom";
import SelectLayout from "../utils/selectLayout";
import getActionType from "../utils/getActionType";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

//components

const Preview = props => {
  
    const [state, dispatch] = useStateValue();
    const { resumeId } = useParams();
    console.log(resumeId, "get param");

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

  const donwloadResume = e => {
    window.print();

    // const filename = "resume.pdf";
    // html2canvas(document.querySelector(".cv"), { scale: 1 }).then(canvas => {
    //   let pdf = new jsPDF("p", "mm", "a4");
    //   pdf.addImage(canvas.toDataURL("image/png"), "PNG", 0, 0, 211, 298);
    //   pdf.save(filename);
    // });
  };

    const changeLayout = e => {
        dispatch({
            type: "CHANGE_LAYOUT",
            layout: e.target.value
        })
    };
    console.log(state, "from state");

  return (
    <div className="preview">
      <div className="preview__download">
        <style>{`@media print {.preview__download{display: none; padding-top:0px;} .preview {background:white;} .preview-container {
          paddig-top:0px; padding-bottom:0px;
        }}`}</style>
        <Link to="/">
          <FontAwesomeIcon
            className="edit-input__head_icon"
            icon="arrow-left"
          />
        </Link>
        <select name="layout" onChange={changeLayout} value={state.layout}>
          <option value="resume1">Turku</option>
          <option value="resume2">Vaasa</option>
          <option value="resume3">Rauma</option>
          <option value="resume4">Pori</option>
        </select>
        <button onClick={donwloadResume}>Download Pdf</button>
          </div>
          {state.resumeId == resumeId ? <div className="preview-container">{SelectLayout(state.layout)}</div> : "" }
     
    </div>
  );
};

export default Preview;
