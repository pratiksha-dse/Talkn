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
import EventService from "../../Services/EventService";
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
const Answer = motion(tw.dd`text-sm sm:text-base leading-relaxed`);

const DecoratorBlob1 = styled(SvgDecoratorBlob1)`
  ${tw`pointer-events-none -z-20 absolute right-0 top-0 h-56 w-56 opacity-15 transform translate-x-2/3 -translate-y-12 text-teal-400`}
`;
const DecoratorBlob2 = styled(SvgDecoratorBlob2)`
  ${tw`pointer-events-none -z-20 absolute left-0 bottom-0 h-64 w-64 opacity-15 transform -translate-x-2/3 text-primary-500`}
`;

const EventEdit = ({
  SEID = "",
  eventOld={}
}) => {
  const [event, setEvent] = useState({
    title: "",
    img: "",
    date: "",
    time: "",   
    description: "",
    account:"",
    contact:"",
    email:"",
    status:"pending"
 
  });
  const [message, setMessage] = useState(eventOld);
  let timerID = useRef(eventOld);

  useEffect(() => {
    return () => {
      clearTimeout(timerID);
    };
  }, []);

  const onChange = (e) => {
    setEvent({ ...event, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setEvent({
      title: "",
      img: "",
      date: "",
      time: "",
      description: "",
      contact:"",
      account:"",
      email:"",
      status:"pending",
    
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const tmpEvents = [...events, event];
    console.log(event);
    const newEvent = {
      title: event.title === "" ? eventOld.title : event.title,
      img: event.img === "" ? eventOld.img : event.img,
      date: event.date === "" ? eventOld.date : event.date,
      time: event.time === "" ? eventOld.time : event.time,
      description: event.description === "" ? eventOld.description : event.description,
      contact:event.contact===""? eventOld.contact:event.contact,
      account:event.account===""? eventOld.account:event.account,
      email:event.email===""? eventOld.email:event.email,
      status:event.status===""?eventOld.status:event.status,
    };

    EventService.editEvent(newEvent, SEID).then((data) => {
      const { message } = data;
      setMessage(message);
      resetForm();
      if (!message.msgError) {
        timerID = setTimeout(() => {
          //   props.history.push("/#/add");
        }, 2000);
      }
    });
    setEvent(tmpEvents);
  };

  function removeItemOnce(arr, value) {
    var index = arr.indexOf(value);
    if (index > -1) {
      arr.splice(index, 1);
    }
    return arr;
  }
  const deleteEvent = (event) => {
    const tmpEvents = [...events];
    EventService.delEvent(event).then((data) => {
      const { message } = data;
      setMessage(message);
    });
    setEvent(removeItemOnce(tmpEvents, event));
  };
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(eventOld);

  const toggleQuestion = (questionIndex) => {
    if (activeQuestionIndex === questionIndex) setActiveQuestionIndex(eventOld);
    else setActiveQuestionIndex(questionIndex);
  };
  const [events, setEvents] = useState([]);
  return (
    // <AnimationRevealPage>
    <Container tw="m-8 -mt-32">
      <ContentWithPaddingXl>
        <Column>
          <HeaderContent>
            {/* <Subheading>ClubNation</Subheading> */}
            <Heading>Update Incident</Heading>
            <p align="center">
              <Description>
                Update title, date, time, Contact, description, Mail Id or Account Address for transactions 
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
              value={event.title}
              onChange={onChange}
              placeholder="Place"
            />
            <Input
              type="url"
              name="img"
              value={event.img}
              onChange={onChange}
              placeholder="Image Link"
            />
            <Input
              type="text"
              name="date"
              value={event.date}
              onChange={onChange}
              placeholder="Date"
            />{" "}
            <Input
              type="text"
              name="time"
              value={event.time}
              onChange={onChange}
              placeholder="Time"
            />{" "}
              <Input
              type="text"
              name="contact"
              value={event.contact}
              onChange={onChange}
              placeholder="Contact No"
            />
             <Input
              type="text"
              name="email"
              value={event.email}
              onChange={onChange}
              placeholder="Email"
            />
              <Input
              type="text"
              name="account"
              value={event.account}
              onChange={onChange}
              placeholder="Account Address"
            />
            <Input
              type="text"
              name="description"
              value={event.description}
              onChange={onChange}
              placeholder="Description of seen Incident"
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

export default EventEdit;
