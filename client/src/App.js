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
import AddEvent from "demos/AddEvent";
import EventEdit from "demos/EventEdit";
import BlogView from "demos/BlogView";
import Blog from "demos/Blog";
// import AdminEvent from "demos/AdminEvent";
import BlogEdit from "demos/BlogEdit";
import AddBlog from "demos/AddBlog";

import ChatWindow from "demos/ChatWindow";
// import YourEvents from "demos/YourEvents";


export default function App() {

  return (
    <Router>
      <Switch>
       
      
        <UserRoute exact path="/questions" component={Event} />
        <UserRoute path="/question_edit" component={EventEdit} />
        <UserRoute path="/question" component={EventView} />
        <UserRoute path="/addquestions" component={AddEvent} />
        {/* <UserRoute path="/your_incidents" component={YourEvents} /> */}
        
        <UserRoute exact path="/blogs" component={Blog} />
        <UserRoute path="/blog_edit" component={BlogEdit} />
        <UserRoute path="/blog" component={BlogView} />
        <UserRoute path="/addblogs" component={AddBlog} />
        <UserRoute path="/chatWindow" component={ChatWindow}/>

        {/* <AdminRoute exact path="/admin_incidents" component={AdminEvent} />
        <AdminRoute path="/admin_incident" component={EventView} /> */}
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}
