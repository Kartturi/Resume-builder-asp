function getResumesLS() {
    const resumes = JSON.parse(localStorage.getItem("resumes"));
    console.log(resumes, "from util");
    return resumes;
}

function setResumesLS(resumes) {
    localStorage.setItem("resumes", JSON.stringify(resumes));
}

export  {getResumesLS, setResumesLS};