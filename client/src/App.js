import "tailwindcss/dist/base.css";
import "styles/globalStyles.css";
import React from "react";
import { css } from "styled-components/macro"; //eslint-disable-line
import UserRoute from "./hocs/UserRoute";
import AdminRoute from "./hocs/AdminRoute";
import Home from "demos/Home.js";
import { HashRouter as Router, Switch, Route } from "react-router-dom";

import EventView from "demos/EventView";
import Event from "demos/Event";
import AdminEvent from "demos/AdminEvent";
import EventEdit from "demos/EventEdit";
import AddEvent from "demos/AddEvent";
// import YourEvents from "demos/YourEvents";


export default function App() {

  return (
    <Router>
      <Switch>
       
      
        <UserRoute exact path="/incidents" component={Event} />
        <UserRoute path="/incident_edit" component={EventEdit} />
        <UserRoute path="/addincidents" component={AddEvent} />
        {/* <UserRoute path="/your_incidents" component={YourEvents} /> */}

        <AdminRoute exact path="/admin_incidents" component={AdminEvent} />
        <AdminRoute path="/admin_incident" component={EventView} />
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}
