import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Link, useParams } from "react-router-dom";
import { StateProvider } from "./state";
import Reducer from "./Reducers/index";
import initialState from "./initialState";
//components
import Dashboard from "./components/dashboard";
import Edit from "./components/Edit/edit";
import Preview from "./components/Preview";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faArrowLeft,
  faUser,
  faSuitcase,
  faDesktop,
  faGraduationCap,
  faBullhorn,
  faPhoneAlt,
  faEnvelope,
  faLink,
  faMapMarkerAlt
} from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";

library.add(
  faPlus,
  faArrowLeft,
  faUser,
  faSuitcase,
  faDesktop,
  faGraduationCap,
  faBullhorn,
  faPhoneAlt,
  faEnvelope,
  faLink,
  faMapMarkerAlt
);
function App() {
  return (
    <Router>
      <StateProvider initialState={initialState} reducer={Reducer}>
        <div className="App">
          <Route exact path="/" component={Dashboard} />
          <Route exact path="/edit/:resumeId" component={Edit} />
          <Route exact path="/preview/:resumeId" component={Preview} />
        </div>
      </StateProvider>
    </Router>
  );
}

export default App;
