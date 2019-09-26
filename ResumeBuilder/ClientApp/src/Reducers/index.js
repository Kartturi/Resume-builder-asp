const reducer = (state, action) => {
  console.log(state, action.education, "reducer in aciton");
  switch (action.type) {
    case "CHANGE_RESUME":
      return Object.assign({}, action.all);

    case "CHANGE_LAYOUT":
      return {
        ...state,
        layout: action.layout
      };

    case "CHANGE_NAME":
      return {
        ...state,
        name: action.name
      };
    case "CHANGE_TITLE":
      return {
        ...state,
        title: action.title
      };

    case "CHANGE_PERSONAL":
      return {
        ...state,
        personal: action.personal
      };

    case "CHANGE_PHONE":
      return {
        ...state,
        phone: action.phone
      };

    case "CHANGE_EMAIL":
      return {
        ...state,
        email: action.email
      };

    case "CHANGE_ADDRESS":
      return {
        ...state,
        address: action.address
      };
    case "CHANGE_PROFILETITLE":
      return {
        ...state,
        profileTitle: action.profileTitle
      };

    case "CHANGE_PROFILE":
      return {
        ...state,
        profile: action.profile
      };

    case "CHANGE_LINKTITLE":
      return {
        ...state,
        linkTitle: action.linkTitle
      };
    case "CHANGE_LINK":
      return {
        ...state,
        link: action.link
      };

    case "CHANGE_HOBBIESTITLE":
      return {
        ...state,
        hobbiesTitle: action.hobbiesTitle
      };

    case "CHANGE_HOBBIES":
      return {
        ...state,
        hobbies: action.hobbies
      };

    case "CHANGE_WORKTITLE":
      return {
        ...state,
        workTitle: action.workTitle
      };

    case "CHANGE_WORK":
      return {
        ...state,
        work: action.work
      };

    case "CHANGE_EDUCATIONTITLE":
      return {
        ...state,
        educationTitle: action.educationTitle
      };

    case "CHANGE_EDUCATION":
      return {
        ...state,
        education: action.education
      };

    case "CHANGE_RECOMMENDSTITLE":
      return {
        ...state,
        recommendsTitle: action.recommendsTitle
      };

    case "CHANGE_RECOMMENDS":
      return {
        ...state,
        recommends: action.recommends
      };

    case "CHANGE_PROJECTSTITLE":
      return {
        ...state,
        projectsTitle: action.projectsTitle
      };

    case "CHANGE_PROJECTS":
      return {
        ...state,
        projects: action.projects
      };

    case "CHANGE_LANGUAGETITLE":
      return {
        ...state,
        languageTitle: action.languageTitle
      };

    case "CHANGE_LANGUAGE":
      return {
        ...state,
        language: action.language
      };

    case "CHANGE_SKILLSTITLE":
      return {
        ...state,
        skillsTitle: action.skillsTitle
      };

    case "CHANGE_SKILLS":
      return {
        ...state,
        skills: action.skills
      };

    default:
      return state;
  }
};

export default reducer;
