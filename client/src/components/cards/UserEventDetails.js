
import React, { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import Slider from "react-slick";
import tw from "twin.macro";
import styled from "styled-components";
import {
  SectionHeading,
  Subheading as SubheadingBase,
} from "components/misc/Headings.js";

import EventService from "../../Services/EventService";
import { ReactComponent as PriceIcon } from "feather-icons/dist/icons/dollar-sign.svg";
import { ReactComponent as LocationIcon } from "feather-icons/dist/icons/map-pin.svg";
import { ReactComponent as TimeIcon } from "feather-icons/dist/icons/clock.svg";
import { ReactComponent as DateIcon } from "feather-icons/dist/icons/calendar.svg";
import { ReactComponent as RegIcon } from "feather-icons/dist/icons/user-plus.svg";
import { ReactComponent as StarIcon } from "feather-icons/dist/icons/star.svg";
import { PrimaryButton as PrimaryButtonBase } from "components/misc/Buttons";
import { ReactComponent as PhoneIcon } from "feather-icons/dist/icons/phone.svg";
import { ReactComponent as UserIcon } from "feather-icons/dist/icons/user.svg";
import { ReactComponent as AwardIcon } from "feather-icons/dist/icons/award.svg";
import { ReactComponent as ChevronLeftIcon } from "feather-icons/dist/icons/chevron-left.svg";
import { ReactComponent as ChevronRightIcon } from "feather-icons/dist/icons/chevron-right.svg";
import { ReactComponent as SearchIcon } from "feather-icons/dist/icons/search.svg";
import { ReactComponent as MailIcon } from "feather-icons/dist/icons/mail.svg";
import { AuthContext } from "../../Context/AuthContext";

import { ReactComponent as SvgDecoratorBlob1 } from "images/svg-decorator-blob-2.svg";
import { ReactComponent as SvgDecoratorBlob2 } from "images/svg-decorator-blob-5.svg";

const Container = tw.div`relative`;
const Content = tw.div`max-w-screen-xl mx-auto py-16 lg:py-16`;
const TabContent = tw(
  motion.div
)`grid grid-cols-1 gap-3 lg:grid-cols-2 grid-flow-row mt-6 rounded-b mx-auto sm:max-w-none sm:mx-0 items-center`;
const FormContainer = tw.div`w-full mt-8`;
const Form = tw.form`mx-auto max-w-xs`;
const Input = tw.input`w-full px-4 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5 first:mt-0`;
const SubmitButton = styled.button`
  ${tw`mt-5 tracking-wide font-semibold bg-primary-500 text-gray-100 w-full py-4 rounded-lg hover:bg-primary-900 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none`}
  .icon {
    ${tw`w-6 h-6 -ml-2`}
  }
  .text {
    ${tw`ml-3`}
  }
`;
const logocss = tw`w-4 h-4`;
// const HeadingWithControl = tw(SectionHeading)`flex flex-col items-center sm:flex-row place-self-center w-full`;
const HeaderContent = tw.div``;
const Subheading = tw(SubheadingBase)`mb-4 text-center`;
const Heading = tw(SectionHeading)`w-full`;
const Controls = tw.div`flex items-center`;
const ControlButton = styled(PrimaryButtonBase)`
  ${tw`mt-4 sm:mt-0 first:ml-0 ml-6 rounded-full p-2`}
  svg {
    ${tw`w-6 h-6`}
  }
`;
// const PrevButton = tw(ControlButton)``;
// const NextButton = tw(ControlButton)``;

// const CardSlider = styled(Slider)`
//   ${tw`mt-16`}
//   .slick-track {
//     ${tw`flex`}
//   }
//   .slick-slide {
//     ${tw`h-auto flex justify-center mb-1`}
//   }
// `;
const Card = tw.div`border border-gray-400 rounded-tl-2xl rounded-br-2xl rounded-tr-2xl rounded-bl-2xl focus:outline-none mx-8 my-8 bg-gray-100`;

const DecoratorBlob1 = styled(SvgDecoratorBlob1)`
  ${tw`pointer-events-none -z-20 absolute right-0 top-0 h-72 w-72 opacity-15 transform translate-x-2/3 -translate-y-12 text-primary-500`}
`;
const DecoratorBlob2 = styled(SvgDecoratorBlob2)`
  ${tw`pointer-events-none -z-20 absolute left-0 bottom-0 h-72 w-72 opacity-15 transform -translate-x-2/3 text-primary-500`}
`;

const CardImage = styled.div((props) => [
  `background-image: url("${props.imageSrc}");`,
  tw`w-full h-56 sm:h-64 bg-cover bg-center rounded sm:rounded-none sm:rounded-tl-2xl sm:rounded-tr-2xl`,
]);

const TextInfo = tw.div`py-6 px-10 py-6`;
const TitleReviewContainer = tw.div`flex flex-col sm:flex-row sm:justify-between sm:items-center`;
const Title = tw.h5`text-2xl font-bold`;

const RatingsInfo = styled.div`
  ${tw`flex items-center sm:ml-4 mt-2 sm:mt-0`}
  svg {
    ${tw`w-6 h-6 text-yellow-500 fill-current`}
  }
`;
const Rating = tw.span`ml-2 font-bold`;

const Description = tw.p`text-sm leading-loose mt-2 sm:mt-4`;

const SecondaryInfoContainer = tw.div`flex flex-col sm:flex-row mt-2 sm:mt-4`;
const IconWithText = tw.div`flex items-center mr-6 my-2 sm:my-0`;
const IconContainer = styled.div`
  ${tw`inline-block rounded-full p-2 bg-gray-700 text-gray-100`}
  svg {
    ${tw`w-3 h-3`}
  }
`;
const Text = tw.div`ml-2 text-sm font-semibold text-gray-800`;

const PrimaryButton = tw(
  PrimaryButtonBase
)`mt-auto sm:text-lg rounded-none w-full rounded sm:rounded-none sm:rounded-br-2xl sm:rounded-bl-2xl py-3 sm:py-6`;

export default () => {
  // useState is used instead of useRef below because we want to re-render when sliderRef becomes available (not null)
  const [query1, setQuery1] = useState("");
  const onChange1 = (e) => {
    setQuery1(e.target.value);
  };
  const [query2, setQuery2] = useState("");
  const onChange2 = (e) => {
    setQuery2(e.target.value);
  };
  const [query3, setQuery3] = useState("");
  const onChange3 = (e) => {
    setQuery3(e.target.value);
  };
  const {
    user,
    setUser,
    isAuthenticated,
    setIsAuthenticated,
    isAdmin,
    setIsAdmin,
  } = useContext(AuthContext);
// console.log(user.email);
  // const query3= user.email;
  
  const [sliderRef, setSliderRef] = useState(null);
  const sliderSettings = {
    arrows: false,
    slidesToShow: 3,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 2,
        },
      },

      {
        breakpoint: 900,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };


  const [events, setEvents] = useState([]);
  useEffect(() => {
   EventService.getEvents().then((data) => {
      setEvents(data.events.reverse());
      console.log(events);
    });
  }, []);
  const onSubmit = (e) => {
    e.preventDefault();
  };
  const searchByTag = () => {
    return (
      <FormContainer>
        <Form onSubmit={onSubmit}>
          <Input
            type="search"
            name="search"
            onChange={onChange1}
            value={query1}
            placeholder="Search by Tag"
          />
        </Form>
      </FormContainer>
      
    );
  };
 const searchByName= () => {
    return (
      <FormContainer>
        <Form onSubmit={onSubmit}>
           <Input
            type="search"
            name="searchbyname"
            onChange={onChange2}
            value={query2}
            placeholder="Search by UserName"
          />
        </Form>
      </FormContainer>
      
    );
  };
  const searchByEmail = () => {
    return (
      <FormContainer>
        <Form onSubmit={onSubmit}>
          <Input
            type="search"
            name="searchbyemail"
            onChange={onChange3}
            value={query3}
            placeholder="Search by User Email"
          />
        </Form>
      </FormContainer>

    );
  };

  
  return (
    <Container>
      <Content>
        <HeaderContent>
          <Subheading>Talkn</Subheading>
          <Heading>Questions</Heading>
        </HeaderContent>
        {searchByTag()}
        {searchByName()}
        {searchByEmail()}
        <TabContent>
          <DecoratorBlob1 />
          <DecoratorBlob2 />

           {events.map((event, index)=> {
            console.log(user.email);
              if ((query1 == "" && query2 == "" && query3== "") || (query1 != "" && event.tag.toLowerCase().match(query1.toLowerCase())) || (query2 != "" && event.name.toLowerCase().match(query2.toLowerCase())) || (query3!="" && event.email.toLowerCase().match(query3.toLowerCase()))) {
              return (
                <Card key={index}>
           <CardImage imageSrc={event.img} />
                <TextInfo>
                  <TitleReviewContainer>
                    <Title>{event.description}</Title>
                  </TitleReviewContainer>
                  <SecondaryInfoContainer>
                  <IconWithText>
                      {/* <IconContainer> */}
                      <img width="25" height="25" border-radius="4px" src={event.picture} alt="user" css={logocss} />
                      {/* </IconContainer> */}
                      <Text>{event.name}</Text>
                    </IconWithText>
                  <IconWithText>
                      <IconContainer>
                        <MailIcon />
                      </IconContainer>
                      <Text>{event.email}</Text>
                    </IconWithText>
             </SecondaryInfoContainer>
             
                  <SecondaryInfoContainer>
                    <IconWithText>
                      <IconContainer>
                        <DateIcon />
                      </IconContainer>
                      <Text>Date:{event.date}</Text>
                    </IconWithText>
                    <IconWithText>
                      <IconContainer>
                        <TimeIcon />
                      </IconContainer>
                      <Text>Time:{event.time}</Text>
                    </IconWithText>
                  </SecondaryInfoContainer>
                  <SecondaryInfoContainer>
                  <IconWithText>
                      <IconContainer>
                      <MailIcon /> 
                      </IconContainer>
                      <Text>Topic Tag: {event.tag}</Text>
                    </IconWithText>
                 
             </SecondaryInfoContainer>
                 
                  
                  {/* <Description>{event.description}</Description> */}
                </TextInfo>
                <a href={event.email===user.email?("#/question_edit?" + event._id):("#/question?"+event._id)}>
              {  event.email===user.email?
                    (<PrimaryButton>Update Question Details</PrimaryButton>):
                    (<PrimaryButton>Answer the question</PrimaryButton>)
              }
                  </a>
              </Card>
              );
            } else {
              return <></>;
            }
           })}
     
        </TabContent>
      </Content>
    </Container>
  );
};