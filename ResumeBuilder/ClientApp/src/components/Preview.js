import React, { useEffect, useState } from "react";
import { getResumesLS } from "../utils/getSetResumes";
import { useStateValue } from "../state";
import { useParams } from "react-router-dom";
import SelectLayout from "../utils/selectLayout";
import getActionType from "../utils/getActionType";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import ReactDOMServer from "react-dom/server";
import jsPDF from "jspdf";
import Resume1 from "./cvLayouts/test";
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
    getResumeData();
  }, []);

  const donwloadResume = e => {
    const html = ReactDOMServer.renderToString(<Resume1 st={state} />);
    console.log(html);
    //window.print();

    // const filename = "resume.pdf";
    // html2canvas(document.querySelector(".cv"), { scale: 1 }).then(canvas => {
    //   let pdf = new jsPDF("p", "mm", "a4");
    //   pdf.addImage(canvas.toDataURL("image/png"), "PNG", 0, 0, 211, 298);
    //   pdf.save(filename);
    // });
    async function downloadData() {
      const downloadUrl = `https://localhost:44318/api/download/${resumeId}`;
      const response = await fetch(downloadUrl, {
        method: "POST",
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "html"
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: { html } // body data type must match "Content-Type" header
      });
      const downloadData = await response;
      console.log(downloadData, "from preview");
    }
    downloadData();
  };

  const getFile = () => {
    return {
      getUrl: `https://localhost:44318/api/resumedatas/getresumedata/${resumeId}`,
      saveAsFileName: "newFile"
    };
  };

  const changeLayout = e => {
    dispatch({
      type: "CHANGE_LAYOUT",
      layout: e.target.value
    });
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
        <a href={`https://localhost:44318/api/download/${resumeId}`} download>
          Download from server
        </a>
      </div>
      {state.resumeId == resumeId ? (
        <div className="preview-container">{SelectLayout(state.layout)}</div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Preview;
