import React from "react";

//components
import Resume1 from "../components/cvLayouts/resume1";
import Resume2 from "../components/cvLayouts/resume2";
import Resume3 from "../components/cvLayouts/resume3";
import Resume4 from "../components/cvLayouts/resume4";

const SelectLayout = layout => {
  switch (layout) {
    case "resume1":
      return <Resume1 />;

      case "resume2":
      return <Resume2 />;

      case "resume3":
      return <Resume3 />;
      case "resume4":
      return <Resume4 />;

    default:
      return <Resume1 />;
  }
};

export default SelectLayout;
