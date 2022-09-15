import React, { useContext, useEffect } from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import Hero from "components/hero/BackgroundAsImageWithCenteredContent.js";
// import HeroAdmin from "components/hero/NoOfUsers.js";
import LetUsTalk from "components/LetsTalk";

import tw from "twin.macro";
import MainFeature1 from "components/features/TwoColWithButton.js";
import img from "images/labour.svg";
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

  const unauthenticatedLP = () => {
    return (
      <>
        <AnimationRevealPage>
          <Hero getstarted="#login" />
          <div id="about">
            <MainFeature1
              subheading={<Subheading>Let every child fly :)</Subheading>}
              heading="Stop Child Labour!"
              buttonRounded={false}
              imageSrc={img}
            />
          </div>
          {/* <div id="login">
          <LoginSignup />
        </div> */}
          <div id="letstalk">
            <LetUsTalk />
          </div>
        </AnimationRevealPage>
        <Footer />
      </>
    );
  };

  const page = () => {
    return unauthenticatedLP();
  };
  return <>{page()}</>;
};
