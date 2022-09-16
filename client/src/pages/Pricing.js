import React from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import Header from "components/headers/light.js";
import Pricing from "components/pricing/TwoPlansWithDurationSwitcher.js";
import Testimonial from "components/testimonials/ThreeColumnWithProfileImage.js";
import FAQ from "components/faqs/SingleCol.js";
import tw from "twin.macro";
const HighlightedText = tw.span`text-primary-500`;
export default () => {
  return (
    <>
      {/* <Header /> */}
      {/* <Pricing /> */}
      <Testimonial
        heading={<><HighlightedText>Popular </HighlightedText>Tags</>}
      />
      {/* <FAQ /> */}
    </>
  );
};
