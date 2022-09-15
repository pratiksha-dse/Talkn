import React, { useState } from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import {
  SectionHeading,
  Subheading as SubheadingBase,
} from "components/misc/Headings.js";
import { PrimaryButton as PrimaryButtonBase } from "components/misc/Buttons.js";
import EmailIllustrationSrc from "images/Envelope-amico.svg";
import ContactService from "../Services/ContactService";
import ReactDOM from "react-dom";

const Container = tw.div`relative m-8`;
const TwoColumn = tw.div`flex flex-col md:flex-row justify-between max-w-screen-xl mx-auto py-4 md:py-4`;
const Column = tw.div`w-full max-w-md mx-auto md:max-w-none md:mx-0`;
const ImageColumn = tw(Column)`md:w-5/12 flex-shrink-0 h-80 md:h-auto`;
const TextColumn = styled(Column)((props) => [
  tw`md:w-7/12 mt-16 md:mt-0`,
  props.textOnLeft
    ? tw`md:ml-12 lg:ml-16 md:order-last`
    : tw`md:mr-12 lg:mr-16 md:order-first`,
]);

const Image = styled.div((props) => [
  `background-image: url("${props.imageSrc}");`,
  tw`rounded bg-contain bg-no-repeat bg-center h-full`,
]);
const TextContent = tw.div`lg:py-8 text-center md:text-left`;

const Subheading = tw(SubheadingBase)`text-center md:text-left`;
const Heading = tw(
  SectionHeading
)`mt-4 font-black text-left text-3xl sm:text-4xl lg:text-5xl text-center md:text-left leading-tight`;
const Description = tw.p`mt-4 text-center md:text-left text-sm md:text-base lg:text-lg font-medium leading-relaxed text-secondary-100`;

const Form = tw.form`mt-8 md:mt-10 text-sm flex flex-col max-w-sm mx-auto md:mx-0`;
const Input = tw.input`mt-6 first:mt-0 border-b-2 py-3 focus:outline-none font-medium transition duration-300 hocus:border-primary-500`;
const Textarea = styled(Input).attrs({ as: "textarea" })`
  ${tw`h-24`}
`;

const SubmitButton = tw(PrimaryButtonBase)`rounded-full inline-block mt-8`;

export default ({
  subheading = "Contact Us",
  heading = (
    <>
      <span tw="text-primary-500">Want to </span>
      <wbr />give feedback/ Suggestions?
    </>
  ),
  description = "Send a mail directly to the Us!",
  submitButtonText = "Send",
  formAction = "#",
  formMethod = "get",
  textOnLeft = true,
}) => {
  var check = true;
  const nameEr = <h1>Name can not be empty.</h1>;
  const emailEr = <h1>Please enter a valid email.</h1>;
  const subEr = <h1>Subject can not be empty.</h1>;
  const msgEr = <h1>Message can not be empty.</h1>;
  const phEr = <h1>Phone can not be empty.</h1>;
  const gen = <h1></h1>;
  function ValidateEmail(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      return true;
    }

    return false;
  }

  // The textOnLeft boolean prop can be used to display either the text on left or right side of the image.
  const [status, setStatus] = useState("Submit");
  const handleSubmit = async (e) => {
    e.preventDefault();
    check = true;
    const { email, name, message, subject, phone } = e.target.elements;
    let details = {
      email: email.value,
      name: name.value,
      phone: phone.value,
      message: message.value,
      subject: subject.value,
    };
    console.log(details.name);
    const validate = () => {
      if (!ValidateEmail(details.email)) {
        check = false;
        ReactDOM.render(emailEr, document.getElementById("emailE"));
      }
      if (ValidateEmail(details.email)) {
        ReactDOM.render(gen, document.getElementById("emailE"));
      }
      if (!details.name) {
        check = false;
        ReactDOM.render(nameEr, document.getElementById("nameE"));
      }
      if (details.name) {
        ReactDOM.render(gen, document.getElementById("nameE"));
      }
      if (!details.subject) {
        check = false;
        ReactDOM.render(subEr, document.getElementById("subE"));
      }
      if (details.subject) {
        ReactDOM.render(gen, document.getElementById("subE"));
      }
      if (!details.message) {
        check = false;
        ReactDOM.render(msgEr, document.getElementById("msgE"));
      }
      if (details.message) {
        ReactDOM.render(gen, document.getElementById("msgE"));
      }
      if (!details.phone) {
        check = false;
        ReactDOM.render(phEr, document.getElementById("phE"));
      }
      if (details.phone) {
        ReactDOM.render(gen, document.getElementById("phE"));
      }
    };

    validate();
    if (check) {
      setStatus("Sending...");
      let response = await ContactService.submit(details);
      setStatus("Submit");
      let result = await response.json();
      alert(result.status);
      e.target.elements.email = "";
    }
  };

  return (
    <Container>
      <TwoColumn>
        <ImageColumn>
          <Image imageSrc={EmailIllustrationSrc} />
        </ImageColumn>
        <TextColumn textOnLeft={textOnLeft}>
          <TextContent>
            {subheading && <Subheading>{subheading}</Subheading>}
            <Heading>{heading}</Heading>
            {description && <Description>{description}</Description>}
            <Form onSubmit={handleSubmit}>
              <Input
                type="email"
                name="email"
                placeholder="Your Email Address"
              />
              <div id="emailE" style={{ fontSize: 12, color: "red" }}></div>
              <Input type="text" name="name" placeholder="Full Name" />
              <div id="nameE" style={{ fontSize: 12, color: "red" }}></div>
              <Input type="text" name="subject" placeholder="Subject" />
              <div id="subE" style={{ fontSize: 12, color: "red" }}></div>
              <Input type="text" name="phone" placeholder="Phone Number" />
              <div id="phE" style={{ fontSize: 12, color: "red" }}></div>
              <Textarea name="message" placeholder="Your Message Here" />
              <div id="msgE" style={{ fontSize: 12, color: "red" }}></div>
              <SubmitButton type="submit">{status}</SubmitButton>
            </Form>
          </TextContent>
        </TextColumn>
      </TwoColumn>
    </Container>
  );
};
