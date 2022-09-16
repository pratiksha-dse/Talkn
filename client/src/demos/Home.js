import React, { useContext, useEffect } from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import Hero from "components/hero/BackgroundAsImageWithCenteredContent.js";
// import HeroAdmin from "components/hero/NoOfUsers.js";
import LetUsTalk from "components/LetsTalk";
import PricingPage from "pages/Pricing.js";
import FeatureWithSteps from "components/features/TwoColWithSteps.js";
import macHeroScreenshotImageSrc from "images/hero-screenshot-2.png";
import ques from "images/ques.png";
import comm from "images/comm.png";
import blog from "images/blog.png";

import tw from "twin.macro";
import MainFeature1 from "components/features/TwoColWithButton.js";
import img from "images/people.png";
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
    const HighlightedText = tw.span`text-primary-500`;
    const qSteps = [
      {
        heading: "Post your question",
        description: "Use the option on home page to post your question. Add a topic tag if you wish to."
      },
      {
        heading: "Edit the question",
        description: "You can also edit your questions if you feel the need to change it."
      },
      {
        heading: "Get the answer!",
        description: "This is how you can post your questions and get it answered by an expert quickly! :)"
      }
    ];
    const pSteps = [
      {
        heading: "Post your blogs",
        description: "Use the option on home page to post your blogs. Add a topic tag if you wish to."
      },
      {
        heading: "Edit your blogs",
        description: "You can also edit your blogs if you feel the need to change it."
      },
      {
        heading: "Read and comment on others' blogs",
        description: "You can go through others' blogs that people have posted."
      },
      {
        heading: "Spread your knowledge",
        description: "This is how you can post anything and share your knowledge, experiences to the world! :)"
      }
    ];
    const cSteps = [
      {
        heading: "Explore communities",
        description: "Follow comunities of your interest and become a part of them."
      },
      {
        heading: "Make your own community",
        description: "You can make your own community and invite others to join it."
      },
      {
        heading: "Interact, discuss and share",
        description: "You can post questions, organize meets, and interact with others in a community."
      },
      {
        heading: "Discuss and grow together",
        description: "This is how you can grow your own community and spread knowledge to the world! :)"
      }
    ];
    return (
      <>
        <AnimationRevealPage>
          <Hero getstarted="#login" /><br></br>
          <div id="about">
            <MainFeature1
              subheading={<Subheading><br></br></Subheading>}
              heading={<>Want to <HighlightedText>learn</HighlightedText> together?</>}
              buttonRounded={false}
              imageSrc={img}
            />

            <PricingPage />
            <FeatureWithSteps
              subheading={<Subheading>Have Questions?</Subheading>}
              heading={
                <>
                  Get <HighlightedText>Answers.</HighlightedText>
                </>
              }
              textOnLeft={false}
              imageSrc={ques}
              imageDecoratorBlob={true}
              decoratorBlobCss={tw`xl:w-40 xl:h-40 opacity-15 -translate-x-1/2 left-1/2`}
              steps={qSteps}
            />
            <FeatureWithSteps
              subheading={<Subheading>Blogs?</Subheading>}
              heading={
                <>
                  Post, <HighlightedText>Read</HighlightedText>, & Comment.
                </>
              }
              textOnLeft={true}
              imageSrc={blog}
              imageDecoratorBlob={true}
              decoratorBlobCss={tw`xl:w-40 xl:h-40 opacity-15 -translate-x-1/2 left-1/2`}
              steps={pSteps}
            />
            <FeatureWithSteps
              subheading={<Subheading>Community Building?</Subheading>}
              heading={
                <>
                  Grow your <HighlightedText>Network.</HighlightedText>
                </>
              }
              textOnLeft={false}
              imageSrc={comm}
              imageDecoratorBlob={true}
              decoratorBlobCss={tw`xl:w-40 xl:h-40 opacity-15 -translate-x-1/2 left-1/2`}
              steps={cSteps}
            />
          </div>
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
