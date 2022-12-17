import React, { useContext, useState } from "react";
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
import BlogService from "../../Services/BlogService";
import Logopdf from "../../images/icons8-financial-64.png";
import { AuthContext } from "../../Context/AuthContext";
import Header, {
  PrimaryLink as PrimaryLinkBase,
} from "../headers/light.js";
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
const PrimaryLink = tw(PrimaryLinkBase)`rounded-full`;
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
  blog = {},
}) => {
  const {
    user,
    isAdmin,
  } = useContext(AuthContext);
  const [likes, setLikes] = useState(0);
  const [isClicked, setIsClicked] = useState(false);
  const [dislikes, setDisLikes] = useState(0);
  const [isClicked1, setIsClicked1] = useState(false);
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
  const [message, setMessage] = useState(null);

  const upvoteBlog = (blog, BID) => {
    if (isClicked) {
      setLikes(likes - 1);
      blog.upvote = likes - 1;
      BlogService.editBlog(blog, BID).then((data) => {
        const { message } = data;
        setMessage(message);
      });
    } else {
      setLikes(blog.upvote + 1);
      blog.upvote = blog.upvote + 1;
      BlogService.editBlog(blog, BID).then((data) => {
        const { message } = data;
        setMessage(message);
      });
    }
    setIsClicked(!isClicked);
    // alert("Blog upvoted")
  };

  const downvoteBlog = (blog, BID) => {
    if (isClicked1) {
      setDisLikes(dislikes - 1);
      blog.downvote = dislikes-1;
      BlogService.editBlog(blog, BID).then((data) => {
        const { message } = data;
        setMessage(message);
      });
    } else {
      setDisLikes(blog.downvote + 1);
      blog.downvote = blog.downvote + 1;
      BlogService.editBlog(blog, BID).then((data) => {
        const { message } = data;
        setMessage(message);
      });
    }
    setIsClicked1(!isClicked1);
   
    // alert("Blog downvoted") 
  }

  if (!statistics) statistics = defaultStatistics;
  const d = async () => {
    await blog;
  };
  d();
  imageSrc = (blog ? blog.img : null)
    ? blog
      ? blog.img
      : null
    : imageSrc;

  const taG = (blog ? blog.tag : null)
    ? blog
      ? blog.tag
      : null
    : null;
  const datE = (blog ? blog.date : null)
    ? blog
      ? blog.date
      : null
    : null;
  const timE = (blog ? blog.time : null)
    ? blog
      ? blog.time
      : null
    : null;

  const emaiL = (blog ? blog.email : null)
    ? blog
      ? blog.email
      : null
    : null;
  const namE = (blog ? blog.name : null)
    ? blog
      ? blog.name
      : null
    : null;
  const picturE = (blog ? blog.picture : null)
    ? blog
      ? blog.picture
      : null
    : null;
  const upvotE = (blog ? blog.upvote : 0)
    ? blog
      ? blog.upvote
      : 0
    : 0;
  const downvotE = (blog ? blog.downvote : 0)
    ? blog
      ? blog.downvote
      : 0
    : 0;

  console.log(blog);
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
              {(blog ? blog.title : null)
                ? blog
                  ? blog.title
                  : null
                : heading}
            </Heading>
            <Description>
              {(blog ? blog.description : null)
                ? blog
                  ? blog.description
                  : null
                : description}
            </Description>
            <Description>
              Tag: {taG}
            </Description>

            <Statistics>
              <Statistic key={1}>
                <Key>Date: {datE}&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;</Key>
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
            {/* <Statistics>
              <Statistic key={1}>
                <Key>Upvotes: {upvotE}&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;</Key>
              </Statistic>
              <Statistic key={2}>
                <Key>Downvotes: {downvotE}</Key>
              </Statistic>
            </Statistics> */}
            <Statistics>
              <Statistic key={1}>
                <Key>
                  <button>
                    <PrimaryLink
                      onClick={() => upvoteBlog(blog, blog._id)}
                    >
                      <span className="likes-counter">{`Like | ${upvotE}`}</span>
                    </PrimaryLink>
                  </button></Key>


              </Statistic>
              <Statistic key={2}>
                <Key>  <button>
                  <PrimaryLink
                    onClick={() => downvoteBlog(blog, blog._id)}
                  >
                    <span className="dislikes-counter">{`Dislike | ${downvotE}`}</span>
                  </PrimaryLink>
                </button></Key>
              </Statistic>
            </Statistics>

          </TextContent>
        </TextColumn>
      </TwoColumn>
    </Container>
  );
};
