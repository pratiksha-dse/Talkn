import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import { motion } from "framer-motion";
import { css } from "styled-components/macro"; //eslint-disable-line
import {
  SectionHeading,
  Subheading as SubheadingBase,
} from "components/misc/Headings.js";
import { SectionDescription } from "components/misc/Typography.js";
import { Container, ContentWithPaddingXl } from "components/misc/Layouts.js";
import BlogService from "../../Services/BlogService";
import { ReactComponent as SignUpIcon } from "feather-icons/dist/icons/log-in.svg";
import { ReactComponent as ChevronDownIcon } from "feather-icons/dist/icons/chevron-down.svg";
import { ReactComponent as SvgDecoratorBlob1 } from "images/svg-decorator-blob-7.svg";
import { ReactComponent as SvgDecoratorBlob2 } from "images/svg-decorator-blob-8.svg";
import { PrimaryButton as PrimaryButtonBase } from "components/misc/Buttons.js";
import Logopdf from "../../images/icons8-financial-64.png";

const logocss = tw`w-8 h-8`;

const Subheading = tw(SubheadingBase)`mb-4 text-center`;
const Heading = tw(SectionHeading)`w-full`;

const Description = tw(SectionDescription)`items-center w-full text-center`;

const Column = tw.div`flex flex-col items-center `;
const HeaderContent = tw.div``;

const Form = tw.form`mx-auto max-w-3xl`;
const Input = tw.input`w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-600 placeholder-gray-600 text-sm focus:outline-none focus:border-gray-500 focus:bg-white mt-5 focus:placeholder-gray-500 first:mt-0`;

const SubmitButton = styled.button`
  ${tw`mt-5 px-5 tracking-wide font-semibold bg-primary-600 text-gray-100 w-2/6 py-3 rounded-lg hover:bg-primary-900 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none`}
  .icon {
    ${tw`w-6 h-6 -ml-2`}
  }
  .text {
    ${tw`ml-3`}
  }
`;

const NewPrimaryButton = tw(
  PrimaryButtonBase
)`bg-transparent hover:bg-red-600 text-red-600 font-semibold hover:text-white py-1 px-3 border-2 border-red-600 hover:border-transparent rounded`;

const FAQSContainer = tw.dl`mt-12 max-w-4xl w-full relative`;
const FAQ = tw.div`cursor-pointer select-none mt-5 px-8 sm:px-10 py-5 sm:py-4 rounded-lg text-gray-800 hover:text-gray-900 bg-gray-200 hover:bg-gray-300 transition duration-300`;
const Question = tw.dt`flex justify-between items-center`;
const QuestionText = tw.span`mx-6 text-lg lg:text-xl font-semibold`;
const QuestionToggleIcon = motion(styled.span`
  ${tw`ml-2 transition duration-300`}
  svg {
    ${tw`w-6 h-6`}
  }
`);

const DecoratorBlob1 = styled(SvgDecoratorBlob1)`
  ${tw`pointer-events-none -z-20 absolute right-0 top-0 h-56 w-56 opacity-15 transform translate-x-2/3 -translate-y-12 text-teal-400`}
`;
const DecoratorBlob2 = styled(SvgDecoratorBlob2)`
  ${tw`pointer-events-none -z-20 absolute left-0 bottom-0 h-64 w-64 opacity-15 transform -translate-x-2/3 text-primary-500`}
`;

const BlogEdit = ({
  BID = "",
  blogOld={}
}) => {
  const [blog, setBlog] = useState({
    title:"",
    tag: "",
    img: "",
    date: "",
    time: "",   
    description: "",
    email:"",
    name:"",
    picture:"",
    upvote:0,
    downvote:0,
 
  });
  const [message, setMessage] = useState(blogOld);
  let timerID = useRef(blogOld);

  useEffect(() => {
    return () => {
      clearTimeout(timerID);
    };
  }, []);

  const onChange = (e) => {
    setBlog({ ...blog, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setBlog({
      title:"",
      tag: "",
      img: "",
      date: "",
      time: "",
      description: "",
      email:"",
      name:"",
      picture:"",
      upvote:0,
      downvote:0,
    
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const tmpBlogs = [...blogs, blog];
    console.log(blog);
    const newBlog = {
      title: blog.title === "" ? blogOld.title : blog.title,
      tag: blog.tag === "" ? blogOld.tag : blog.tag,
      img: blog.img === "" ? blogOld.img : blog.img,
      date:blogOld.date,
      time:blogOld.time ,
      description: blog.description === "" ? blogOld.description : blog.description,
      email:blogOld.email,
      name:blogOld.name,
      picture:blogOld.picture,
      upvote:blogOld.upvote,
      downvote:blogOld.downvote,
    };

    BlogService.editBlog(newBlog, BID).then((data) => {
      const { message } = data;
      setMessage(message);
      resetForm();
      if (!message.msgError) {
        timerID = setTimeout(() => {
          //   props.history.push("/#/add");
        }, 2000);
      }
    });
    setBlog(tmpBlogs);
  };

  function removeItemOnce(arr, value) {
    var index = arr.indexOf(value);
    if (index > -1) {
      arr.splice(index, 1);
    }
    return arr
  }
  const deleteBlog = (blog) => {
   const tmpBlogs = [...blogs];
   BlogService.delBlog(blog).then((data) => {
      const { message } = data;
      setMessage(message);
    });
    setBlog(removeItemOnce(tmpBlogs, blog));
  }; 
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(blogOld);

  const toggleQuestion = (questionIndex) => {
    if (activeQuestionIndex === questionIndex) setActiveQuestionIndex(blogOld);
    else setActiveQuestionIndex(questionIndex);
  };
  const [blogs, setBlogs] = useState([]);
  return (
    // <AnimationRevealPage>
    <Container tw="m-8 -mt-32">
      <ContentWithPaddingXl>
        <Column>
          <HeaderContent>
            {/* <Subheading>ClubNation</Subheading> */}
            <Heading>Update Blog</Heading>
            <p align="center">
              <Description>
                Update title, tag, description of the blog.
              </Description>
            </p>
          </HeaderContent>
          <br />
          <br />
          <br />
          <Form onSubmit={onSubmit}>
          <Input
              type="text"
              name="title"
              value={blog.title}
              onChange={onChange}
              placeholder="Title"
            />
            <Input
              type="text"
              name="tag"
              value={blog.tag}
              onChange={onChange}
              placeholder="Tag"
            />
            <Input
              type="url"
              name="img"
              value={blog.img}
              onChange={onChange}
              placeholder="Image Link"
            />
            
            <Input
              type="text"
              name="description"
              value={blog.description}
              onChange={onChange}
              placeholder="Your Blog"
            />
             
            <p align="right">
              <SubmitButton type="submit">
                <SignUpIcon className="icon" />
                <span className="text">Update</span>
              </SubmitButton>
            </p>
          </Form>
        </Column>
      </ContentWithPaddingXl>
      <DecoratorBlob1 />
      <DecoratorBlob2 />
    </Container>
    // </AnimationRevealPage>
  );
};

export default BlogEdit;
