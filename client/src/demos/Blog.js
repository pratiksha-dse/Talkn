import React, { useContext, useEffect } from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import Hero from "components/hero/BackgroundAsImageWithCenteredContent.js";
import UserBlogDetails from "components/cards/UserBlogDetails.js";
import Footer from "components/footers/MiniCenteredFooter.js";
import { AuthContext } from "../Context/AuthContext";

export default () => {
  const {
    isAuthenticated,
    isAdmin,
  } = useContext(AuthContext);
  const userLP = () => {
      return (
        <>
          {/* <AnimationRevealPage> */}
            <Hero getstarted="#bookaslot" />
            <div id="blogs">
              <UserBlogDetails />
            </div>
          {/* </AnimationRevealPage> */}
           <Footer />
        </>)
};
const page = () => {
  if (isAuthenticated && !isAdmin) return userLP();
};
return <>{page()}</>;
};
