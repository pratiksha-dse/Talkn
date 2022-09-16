import React from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import {
  SectionHeading,
  Subheading as SubheadingBase,
} from "components/misc/Headings.js";
import { PrimaryButton as PrimaryButtonBase } from "components/misc/Buttons.js";
import StatsIllustrationSrc from "images/stats-illustration.svg";
import { ReactComponent as SvgDotPattern } from "images/dot-pattern.svg";



const Container = tw.div`relative`;
const TwoColumn = tw.div`flex flex-col md:flex-row justify-between max-w-screen-xl mx-auto py-20 md:py-24`;
const Column = tw.div`w-full max-w-md mx-auto md:max-w-none md:mx-0`;
const ImageColumn = tw(Column)`md:w-5/12 flex-shrink-0 h-80 md:h-auto relative`;
const TextColumn = styled(Column)((props) => [
  tw`md:w-7/12 mt-5 md:mt-0`,
  props.textOnLeft
    ? tw`md:mr-12 lg:mr-16 md:order-first`
    : tw`md:ml-12 lg:ml-16 md:order-last`,
]);

const Image = styled.div((props) => [
  `background-image: url("${props.imageSrc}");`,
  tw`rounded bg-contain bg-no-repeat bg-center h-full rounded sm:rounded-none sm:rounded-tl-2xl sm:rounded-tr-2xl sm:rounded-bl-2xl sm:rounded-br-2xl`,
]);
const TextContent = tw.div` text-primary-800 lg:py-8 text-center md:text-left`;

const Subheading = tw(SubheadingBase)`text-center md:text-left`;
const Heading = tw(
  SectionHeading
)`mt-4 font-black text-left text-3xl sm:text-4xl lg:text-5xl text-center md:text-left leading-tight`;
const Description = tw.p`mt-4 text-center md:text-left text-sm md:text-base lg:text-lg font-medium leading-relaxed text-secondary-100`;

const Statistics = tw.div`flex flex-col items-center sm:block text-center md:text-left mt-4`;
const Statistic = tw.div`text-left sm:inline-block sm:mr-12 last:mr-0 mt-0`;
const Value = tw.div`font-bold text-lg sm:text-xl lg:text-2xl text-secondary-500 tracking-wide`;
const Key = tw.div`font-medium text-gray-700`;

const PrimaryButton = tw(
  PrimaryButtonBase
)`mt-8 md:mt-5 text-sm inline-block mx-auto md:mx-0 rounded sm:rounded-none sm:rounded-br-4xl sm:rounded-tl-4xl sm:rounded-bl-4xl sm:rounded-tr-4xl`;

const DecoratorBlob = styled(SvgDotPattern)((props) => [
  tw`w-20 h-20 absolute right-0 bottom-0 transform translate-x-1/2 translate-y-1/2 fill-current text-primary-500 -z-10`,
]);

export default ({
  subheading = "Date",
  heading = <>Title</>,
  description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  primaryButtonText = "Learn More",
  primaryButtonUrl = "https://timerse.com",
  imageSrc = StatsIllustrationSrc,
  imageCss = null,
  imageContainerCss = null,
  imageDecoratorBlob = false,
  imageDecoratorBlobCss = null,
  imageInsideDiv = true,
  statistics = null,
  textOnLeft = false,
  event = {},
}) => {
  // The textOnLeft boolean prop can be used to display either the text on left or right side of the image.
  //Change the statistics variable as you like, add or delete objects
  const defaultStatistics = [
    {
      key: "Date",
      value: "01/01/3000",
    },
    {
      key: "Time",
      value: "00:00",
    },
  ];

  if (!statistics) statistics = defaultStatistics;
  const d = async () => {
    await event;
  };
  d();
  imageSrc = (event ? event.img : null)
    ? event
      ? event.img
      : null
    : imageSrc;


  const datE = (event ? event.date : null)
    ? event
      ? event.date
      : null
    : null;
  const timE = (event ? event.time : null)
    ? event
      ? event.time
      : null
    : null;
  const emaiL = (event ? event.email : null)
    ? event
      ? event.email
      : null
    : null;
  const namE = (event ? event.name : null)
    ? event
      ? event.name
      : null
    : null;
  const picturE = (event ? event.picture : null)
    ? event
      ? event.picture
      : null
    : null;
    const taG = (event? event.tag : null)
    ? event
      ? event.tag
      : null
    : null;

  console.log(event);
  return (
    <Container>
      <TwoColumn css={!imageInsideDiv && tw`md:items-center`}>
        <ImageColumn css={imageContainerCss}>
          {imageInsideDiv ? (
            <Image imageSrc={imageSrc} css={imageCss} />
          ) : (
            <img src={imageSrc} css={imageCss} alt="" />
          )}
          {imageDecoratorBlob && <DecoratorBlob css={imageDecoratorBlobCss} />}
        </ImageColumn>
        <TextColumn textOnLeft={textOnLeft}>
          <TextContent>
            {/* {subheading && <Subheading>{datE}</Subheading>} */}
            <Heading>
              {(event ? event.description: null)
                ? event
                  ? event.description
                  : null
                : heading}
            </Heading>

            <Description>
              Tag: {taG}
            </Description>
            <Statistics>
              <Statistic key={1}>
                <Key>Date: {datE}</Key>
              </Statistic>
              <Statistic key={2}>
                <Key>Time: {timE}</Key>
              </Statistic>
            </Statistics>
            <Statistics>


            </Statistics>
            <Statistics>
              <Statistic key={1}>
                <Key>Name: {namE}</Key>
              </Statistic>
              <Statistic key={2}>
                <Key>Email: {emaiL}</Key>
              </Statistic>
            </Statistics>
          </TextContent>
        </TextColumn>
      </TwoColumn>
    </Container>
  );
};
