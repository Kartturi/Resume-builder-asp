import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
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
  faBullhorn
} from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";

library.add(
  faPlus,
  faArrowLeft,
  faUser,
  faSuitcase,
  faDesktop,
  faGraduationCap,
  faBullhorn
);
function App() {
  return (
    <Router>
      <StateProvider initialState={initialState} reducer={Reducer}>
        <div className="App">
          <Route exact path="/" component={Dashboard} />
          <Route exact path="/edit" component={Edit} />
          <Route exact path="/preview" component={Preview} />
        </div>
      </StateProvider>
    </Router>
  );
}

export default App;
