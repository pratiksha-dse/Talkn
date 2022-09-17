import React, { useContext, useEffect, useState } from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import Hero from "components/hero/BackgroundAsImageWithCenteredContent.js";

import AddAnswers from "components/features/AddAnswer.js";

import EventService from "../Services/EventService";

import tw from "twin.macro";
import MainFeature1 from "components/features/TwoColWithButton.js";
// import Features from "components/features/VerticalWithAlternateImageAndText.js";
// import Blog from "components/blogs/ThreeColSimpleWithImage.js";
// import Testimonial from "components/testimonials/TwoColumnWithImage.js";
// import ContactUsForm from "components/forms/SimpleContactUs.js";
import Footer from "components/footers/MiniCenteredFooter.js";
import { AuthContext } from "../Context/AuthContext";
import EventDedicated from "components/features/EventDedicated";

const Subheading = tw.span`uppercase tracking-wider text-sm`;

export default (props) => {
  const {
    user,
    setUser,
    isAuthenticated,
    setIsAuthenticated,
    isAdmin,
    setIsAdmin,
  } = useContext(AuthContext);
  const eventID = props.location.search.slice(1);
  const [event, setEvent] = useState(null);
  useEffect(() => {
    EventService.getEventByID(eventID).then((data) => {
      setEvent(data.event);
      console.log(event);
    });
  }, []);

  console.log(eventID);
  console.log(event);
  const authLP = () => {
    return (
      <>
        {/* <AnimationRevealPage> */}
          <Hero getstarted="#bookaslot" />
        
          <div id="eventdedicated">
            <EventDedicated event={event} SEID={eventID}/>
          </div>
          <div id="addanswers">
            <AddAnswers SEID={eventID} email={user.email}/>
          </div>
        {/* </AnimationRevealPage> */}
        <Footer />
      </>
    );
  };
  const page = () => {
    if (isAuthenticated && !isAdmin) return authLP();
  };
  return <>{page()}</>;
};
