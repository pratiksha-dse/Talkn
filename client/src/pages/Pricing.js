import React from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import Header from "components/headers/light.js";
import Pricing from "components/pricing/TwoPlansWithDurationSwitcher.js";
import Testimonial from "components/testimonials/ThreeColumnWithProfileImage.js";
import FAQ from "components/faqs/SingleCol.js";

export default () => {
  return (
    <>
      {/* <Header /> */}
      {/* <Pricing /> */}
      <Testimonial
        heading="Popular Tags"
      />
      {/* <FAQ /> */}
    </>
  );
};
