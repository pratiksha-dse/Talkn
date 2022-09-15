import React, { useState, useRef, useEffect, useContext } from "react";
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
import ResourceService from "../../Services/ResourceService";
import { ReactComponent as SignUpIcon } from "feather-icons/dist/icons/log-in.svg";
import { ReactComponent as ChevronDownIcon } from "feather-icons/dist/icons/chevron-down.svg";
import { ReactComponent as SvgDecoratorBlob1 } from "images/svg-decorator-blob-7.svg";
import { ReactComponent as SvgDecoratorBlob2 } from "images/svg-decorator-blob-8.svg";
import { PrimaryButton as PrimaryButtonBase } from "components/misc/Buttons.js";
import Logopdf from "../../images/icons8-financial-64.png";
import { AuthContext } from "../../Context/AuthContext";

const logocss = tw`w-8 h-8`;

const Subheading = tw(SubheadingBase)`mb-4 text-center`;
const Heading = tw(SectionHeading)`w-full`;

const Description = tw(SectionDescription)`items-center w-full text-center`;

const Column = tw.div`flex flex-col items-center -mt-32`;
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
const Answer = motion(tw.dd`text-sm sm:text-base leading-relaxed`);

const DecoratorBlob1 = styled(SvgDecoratorBlob1)`
  ${tw`pointer-events-none -z-20 absolute right-0 top-0 h-56 w-56 opacity-15 transform translate-x-2/3 -translate-y-12 text-teal-400`}
`;
const DecoratorBlob2 = styled(SvgDecoratorBlob2)`
  ${tw`pointer-events-none -z-20 absolute left-0 bottom-0 h-64 w-64 opacity-15 transform -translate-x-2/3 text-primary-500`}
`;

const AddResources = ({
  subheading = "CapiBull",
  heading = "Resources and References",
  description = "Here are some resources and tools which will help you to manage and understand your finances easily.",

  primaryButtonText = "Learn More",
  primaryButtonUrl = "https://timerse.com",
  SEID = "",
}) => {
  const {
    user,
    setUser,
    isAuthenticated,
    setIsAuthenticated,
    isAdmin,
    setIsAdmin,
  } = useContext(AuthContext);
  const [resource, setResource] = useState({
    title: "",
    description: "",
    media: "",
    SEID: SEID,
  });
  const [message, setMessage] = useState(null);
  let timerID = useRef(null);

  useEffect(() => {
    return () => {
      clearTimeout(timerID);
    };
  }, []);

  const onChange = (e) => {
    setResource({ ...resource, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setResource({
      title: "",
      description: "",
      media: "",
      SEID: "",
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const tmpResources = [...resources, resource];
    ResourceService.postResource(resource).then((data) => {
      const { message } = data;
      setMessage(message);
      resetForm();
      if (!message.msgError) {
        timerID = setTimeout(() => {
          //   props.history.push("/#/add");
        }, 2000);
      }
    });
    setResources(tmpResources);
  };
  const inputRef = useRef();
  useEffect(() => {
    ResourceService.getResources(SEID).then((data) => {
      setResources(data.resources);
      console.log(resources);
    });
  }, [inputRef]);

  function removeItemOnce(arr, value) {
    var index = arr.indexOf(value);
    if (index > -1) {
      arr.splice(index, 1);
    }
    return arr;
  }
  const deleteResource = (resource) => {
    const tmpResources = [...resources];
    ResourceService.delResource(resource).then((data) => {
      const { message } = data;
      setMessage(message);
    });
    setResources(removeItemOnce(tmpResources, resource));
  };
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(null);

  const toggleQuestion = (questionIndex) => {
    if (activeQuestionIndex === questionIndex) setActiveQuestionIndex(null);
    else setActiveQuestionIndex(questionIndex);
  };
  const [resources, setResources] = useState([]);
  return (
    // <AnimationRevealPage>
    <Container tw="m-8">
      <ContentWithPaddingXl>
        <Column>
          {isAdmin ? (
            <>
              <HeaderContent>
                {/* <Subheading>CapiBull</Subheading> */}
                <Heading>Add Resources and References</Heading>
                <p align="center">
                  <Description>
                    Add title, description and link to resources through this
                    page.
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
                  value={resource.title}
                  onChange={onChange}
                  placeholder="Title"
                />
                <Input
                  type="text"
                  name="description"
                  value={resource.description}
                  onChange={onChange}
                  placeholder="Description"
                />
                <Input
                  type="url"
                  name="media"
                  value={resource.media}
                  onChange={onChange}
                  placeholder="File Link"
                />

                <p align="right">
                  <SubmitButton type="submit">
                    <SignUpIcon className="icon" />
                    <span className="text">Add</span>
                  </SubmitButton>
                </p>
              </Form>
            </>
          ) : (  <HeaderContent>
            {/* <Subheading>ClubNation</Subheading> */}
                <Heading>Resources</Heading>
                <p align="center">
               <Description>Here are some resources and tools which will help you.</Description> 
                </p>
              </HeaderContent>)}
          <FAQSContainer>
            {resources.map((resource, index) => (
              <FAQ>
                <Question
                  key={index}
                  onClick={() => {
                    toggleQuestion(index);
                  }}
                  className="group"
                >
                  <img src={Logopdf} alt="logo" css={logocss} />
                  <QuestionText>{resource.title}</QuestionText>
                  <QuestionToggleIcon
                    variants={{
                      collapsed: { rotate: 0 },
                      open: { rotate: -180 },
                    }}
                    initial="collapsed"
                    animate={
                      activeQuestionIndex === index ? "open" : "collapsed"
                    }
                    transition={{
                      duration: 0.02,
                      ease: [0.04, 0.62, 0.23, 0.98],
                    }}
                  >
                    <ChevronDownIcon />
                  </QuestionToggleIcon>
                </Question>
                <Answer
                  variants={{
                    open: { opacity: 1, height: "auto", marginTop: "16px" },
                    collapsed: { opacity: 0, height: 0, marginTop: "0px" },
                  }}
                  initial="collapsed"
                  animate={activeQuestionIndex === index ? "open" : "collapsed"}
                  transition={{
                    duration: 0.3,
                    ease: [0.04, 0.62, 0.23, 0.98],
                  }}
                >
                  <p
                    key={index}
                    onClick={() => {
                      toggleQuestion(index);
                    }}
                    className="group"
                  >
                    {resource.description}
                    <br />
                    <br />
                  </p>
                  <p align="right">
                    {/* <NewPrimaryButton as="a"> */}
                    {isAdmin ? (
                      <NewPrimaryButton
                        as="a"
                        ref={inputRef}
                        onClick={() => deleteResource(resource)}
                      >
                        {(primaryButtonText = "Delete")}
                      </NewPrimaryButton>
                    ) : (
                      <NewPrimaryButton
                        as="a"
                        target="_blank"
                        href={resource.media}
                      >
                        {(primaryButtonText = "View")}
                      </NewPrimaryButton>
                    )}
                  </p>
                </Answer>
              </FAQ>
            ))}
          </FAQSContainer>
        </Column>
      </ContentWithPaddingXl>
      <DecoratorBlob1 />
      <DecoratorBlob2 />
    </Container>
    // </AnimationRevealPage>
  );
};

export default AddResources;
