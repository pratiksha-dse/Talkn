import React, { useContext, useEffect } from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import Hero from "components/hero/BackgroundAsImageWithCenteredContent.js";

import AddEvents from "components/features/AddEvents.js";
import EventDetails from "components/cards/EventDetails.js";
import UserEventDetails from "components/cards/UserEventDetails.js";

import tw from "twin.macro";
// import Features from "components/features/VerticalWithAlternateImageAndText.js";
// import Blog from "components/blogs/ThreeColSimpleWithImage.js";
// import Testimonial from "components/testimonials/TwoColumnWithImage.js";
// import ContactUsForm from "components/forms/SimpleContactUs.js";
import Footer from "components/footers/MiniCenteredFooter.js";
import { AuthContext } from "../Context/AuthContext";

const Subheading = tw.span`uppercase tracking-wider text-sm`;

export default () => {
  const {
    user,
    setUser,
    isAuthenticated,
    setIsAuthenticated,
    isAdmin,
    setIsAdmin,
  } = useContext(AuthContext);
  // console.log(isAdmin, user)

  const userLP = () => {
    if (isAdmin) {
      return (
        <>
          {/* <AnimationRevealPage> */}
            <Hero getstarted="#bookaslot" />
            <div id="admin_incidents">
              <EventDetails />
            </div>

          {/* </AnimationRevealPage> */}
          <Footer />
        </>
      );
    }
    else {
      return (
        <>
          <AnimationRevealPage>
            <Hero getstarted="#bookaslot" />
            <div id="questions">
              <UserEventDetails />
            </div>
          </AnimationRevealPage>
          <Footer />
        </>
      );
  }
};
const page = () => {
  if (isAuthenticated && !isAdmin) return userLP();
};
return <>{page()}</>;
};
