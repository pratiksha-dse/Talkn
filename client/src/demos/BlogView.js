import React, { useContext, useEffect, useState } from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import Hero from "components/hero/BackgroundAsImageWithCenteredContent.js";

import AddComments from "components/features/AddComment.js";

import BlogService from "../Services/BlogService";

import tw from "twin.macro";
import MainFeature1 from "components/features/TwoColWithButton.js";
// import Features from "components/features/VerticalWithAlternateImageAndText.js";
// import Blog from "components/blogs/ThreeColSimpleWithImage.js";
// import Testimonial from "components/testimonials/TwoColumnWithImage.js";
// import ContactUsForm from "components/forms/SimpleContactUs.js";
import Footer from "components/footers/MiniCenteredFooter.js";
import { AuthContext } from "../Context/AuthContext";
import BlogDedicated from "components/features/BlogDedicated";

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
  const blogID = props.location.search.slice(1);
  const [blog, setBlog] = useState(null);
  useEffect(() => {
    BlogService.getBlogByID(blogID).then((data) => {
      setBlog(data.blog);
      console.log(blog);
    });
  }, []);

  console.log(blogID);
  console.log(blog);
  const authLP = () => {
    return (
      <>
        {/* <AnimationRevealPage> */}
          <Hero getstarted="#bookaslot" />
        
          <div id="blogdedicated">
            <BlogDedicated blog={blog} BID={blogID}/>
          </div>
          <div id="addanswers">
            <AddComments BID={blogID} email={user.email}/>
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
