function getActionType(type) {
  switch (type) {
    case "layout":
      return "CHANGE_LAYOUT";

    case "name":
      return "CHANGE_NAME";

    case "title":
      return "CHANGE_TITLE";

    case "personal":
      return "CHANGE_PERSONAL";
    case "phone":
      return "CHANGE_PHONE";

    case "email":
      return "CHANGE_EMAIL";

    case "address":
      return "CHANGE_ADDRESS";

    case "profileTitle":
      return "CHANGE_PROFILETITLE";
    case "profile":
      return "CHANGE_PROFILE";

    case "linkTitle":
      return "CHANGE_LINKTITLE";

    case "link":
      return "CHANGE_LINK";

    case "hobbiesTitle":
      return "CHANGE_HOBBIESTITLE";

    case "hobbies":
      return "CHANGE_HOBBIES";

    case "workTitle":
      return "CHANGE_WORKTITLE";

    case "educationTitle":
      return "CHANGE_EDUCATIONTITLE";

    case "recommendsTitle":
      return "CHANGE_RECOMMENDSTITLE";

    case "projectsTitle":
      return "CHANGE_PROJECTSTITLE";

    case "languageTitle":
      return "CHANGE_LANGUAGETITLE";

    case "skillsTitle":
      return "CHANGE_SKILLSTITLE";

    default:
      return "";
  }
}

export default getActionType;
