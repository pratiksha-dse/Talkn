import React, { useContext, useEffect } from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import Hero from "components/hero/BackgroundAsImageWithCenteredContent.js";

import AddBlogs from "components/features/AddBlogs.js";

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

  const userLP = () => {
    return (
      <>
        {/* <AnimationRevealPage> */}
          <Hero getstarted="#bookaslot" />
        
          <div id="addblogs">
            <AddBlogs user={user}/>
          </div>
         
        {/* </AnimationRevealPage> */}
        <Footer />
      </>
    );
  };
  const page = () => {
    if (isAuthenticated && !isAdmin) return userLP();
  };
  return <>{page()}</>;
};
