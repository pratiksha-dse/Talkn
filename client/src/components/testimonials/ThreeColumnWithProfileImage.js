import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { css } from "styled-components/macro"; //eslint-disable-line
import { ContentWithPaddingXl, Container } from "components/misc/Layouts.js";
import { SectionHeading as Heading, Subheading as SubheadingBase } from "components/misc/Headings.js";
import { ReactComponent as SvgDecoratorBlob1 } from "images/svg-decorator-blob-7.svg";
import { ReactComponent as SvgDecoratorBlob2 } from "images/svg-decorator-blob-8.svg";
import science from "images/science.png";
import math from "images/math.png";
import dev from "images/dev.png";
import market from "images/market.png";

const Subheading = tw(SubheadingBase)`text-center`;
const Testimonials = tw.div`flex flex-col lg:flex-row items-center lg:items-stretch`;
const TestimonialContainer = tw.div`mt-16 lg:w-1/3`;
const Testimonial = tw.div`px-4 pb-8 text-center max-w-xs h-128 mx-2 flex flex-col items-center border-4 shadow-xl`;
const Image = tw.img`w-48 h-48 rounded-2xl`;
const Quote = tw.blockquote`mt-5 text-gray-600 font-medium leading-loose`;
const CustomerName = tw.p`mt-5 p-4 text-gray-900 font-semibold uppercase text-xl tracking-wide`;

const DecoratorBlob1 = styled(SvgDecoratorBlob1)`
  ${tw`pointer-events-none -z-20 absolute left-0 top-0 h-56 w-56 opacity-15 transform -translate-x-2/3 -translate-y-12 text-teal-400`}
`;
const DecoratorBlob2 = styled(SvgDecoratorBlob2)`
  ${tw`pointer-events-none -z-20 absolute right-0 bottom-0 h-64 w-64 opacity-15 transform translate-x-2/3 text-yellow-500`}
`;

export default ({
  // subheading = "Testimonials",
  heading = "Customer's Review",
  testimonials = [
    {
      imageSrc: science,
      quote:
        "This is the place where you can find all science-related questions-answers and posts. You can explore new scientific-related things here.",
      customerName: "Science"
    },
    {
      imageSrc:
        math,
      quote:
        "This is the place where you can find all maths-related question-answers and posts. You can explore new mathematical concepts and theorems here.",
      customerName: "Maths"
    },
    {
      imageSrc: dev,
      quote:
        "This is the place where you can find all software development related question-answers and posts. You can explore new tech-stacks and new projects here.",
      customerName: "Software"
    }
    ,
    {
      imageSrc:
        market,
      quote:
        "This is the place where you can find all finance-related question-answers and posts. You can explore new marketing skills, budget management, etc here.",
      customerName: "Marketing"
    }
  ]
}) => {
  return (
    <Container>
      {/* <ContentWithPaddingXl> */}
      {/* {subheading && <Subheading>{subheading}</Subheading>} */}
      <Heading>{heading}</Heading>
      <Testimonials>
        {testimonials.map((testimonial, index) => (
          <TestimonialContainer key={index}>
            <Testimonial>
              <CustomerName>{testimonial.customerName}</CustomerName>
              <Image src={testimonial.imageSrc} />
              <Quote>{testimonial.quote}</Quote>
            </Testimonial>
          </TestimonialContainer>
        ))}
      </Testimonials>
      {/* </ContentWithPaddingXl> */}

      <DecoratorBlob1 />
      <DecoratorBlob2 />
    </Container>
  );
};
