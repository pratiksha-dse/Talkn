import React from "react";
// import Web3 from 'web3';
import  { useState, useRef, useEffect } from "react";
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
import EventService from "../../Services/EventService";
import Header, {
    NavLink,
    NavLinks,
    LogoLink,
    NavToggle,
    DesktopNavLinks,
    PrimaryLink as PrimaryLinkBase,
  } from "../headers/light.js";

// require('dotenv').config();
// const Account = "0x99eacbe096E181c3Df36EbcAa5471c79821A67c1";
// const PrivateKey = "d7679870d99b9a72d6e7b4984ddf8e33f238dd7d50b0fdf2d51875f41ec2c34d";
// const RcpHttpUrl = "HTTP://127.0.0.1:7545";
// const web3 = new Web3(new Web3.providers.HttpProvider(RcpHttpUrl));
// const transferAmount = "5";
// const acc = "0x7F142cE8b9f25981fCFF8dF09291F00500C23DFA";
// const value = Web3.utils.toWei(transferAmount.toString(), 'Ether');
// async function transfer(){
//   console.log("pay")
//   const nonce = await web3.eth.getTransactionCount(Account, "latest");
//   console.log("pay1")
//   const transaction = {
//     'to': acc,
//     'value': value,
//     'gasLimit': 6721975,
//     'gasPrice': 20000000000,
//     'nonce': nonce
//   }
//   console.log("pay2")
//   console.log(Account)
//   const signTrx = await web3.eth.accounts.signTransaction(transaction, PrivateKey);
//   console.log("pay3")
//   console.log(signTrx.rawTransaction)
//    await Web3.eth.sendSignedTransaction(signTrx.rawTransaction, function(error, hash){
//     if(error){
//       console.log('Something went wrong', error);
//     }else{
//       console.log('transaction submitted', hash);
//       window.alert('Transaction submitted. Hash: ' + hash);
//     }
//   })
//   console.log("pay4")
// }


const PrimaryLink = tw(PrimaryLinkBase)`rounded-full`;
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
const TextContent = tw.div`lg:py-8 text-center md:text-left`;

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
  SEID="",
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
    // {
    //   key: "Recording Link",
    //   value: "1000+",
    // },
  ];

  const [message, setMessage] = useState(event);
  const [network, setNetwork] = useState('');
  const [currentAccount, setCurrentAccount] = useState('');
  let timerID = useRef(event);
  useEffect(() => {
    return () => {
      clearTimeout(timerID);
    };
  }, []);
  

const connectWallet = async () => {
  try {
    const { ethereum } = window;

    if(!ethereum){
      alert("Get MetaMask -> https://metamask.io/");
      return;
    }

    const accounts = await ethereum.request({method: "eth_requestAccounts"});
    alert("Wallet connected successfully")
    console.log("Connected, ", accounts[0]);
    setCurrentAccount(accounts[0]);
  } catch (error) {
    console.log(error);
  }
}
const approve=()=>{
  const newEvent = {
    title:  event.title ,
    img:  event.img,
    date: event.date ,
    time: event.time,
    description: event.description,
    contact: event.contact,
    status:"Appoved",
    email: event.email,
    account:event.account
  };
EventService.editEvent(newEvent, SEID).then((data) => {
const { message } = data;
setMessage(message);
console.log("updated status")
console.log(data);
console.log("updated data")
if (!message.msgError) {
  timerID = setTimeout(() => {
    //   props.history.push("/#/add");
  }, 2000);
}
});
}
const transfer = async () => {
  const price = 500000000000000000;
  try {
    const { ethereum } = window;
    if(ethereum) {
   

      const provider = window.ethereum;
      const signer = currentAccount;

      console.log("Popping metamask to transfer funds.")
    
      const tx = {
        from: currentAccount,
        // to: '0x2A3a6eB82C5f831C1928993eb0FD0FCE75e32cdc',
        to:event.account,
        value: '6F05B59D3B20000',
        gas: '0x5208'
      }
      let txx = await ethereum.request({
        method: 'eth_sendTransaction',
        params: [tx]
    })
    console.log("Transaction completed with hash: ", txx);
    }
    approve()
  } catch (error) {
    console.log(error);
  }
}
  
  const reject = () => {
    const newEvent = {
        title:  event.title ,
        img:  event.img,
        date: event.date ,
        time: event.time,
        description: event.description,
        contact: event.contact,
        status:"rejected",
        email: event.email,
        account:event.account,

      };
      alert("Rejected")
      // const pay = () => {
      //   const newEvent = {
      //       title:  event.title ,
      //       img:  event.img,
      //       date: event.date ,
      //       time: event.time,
      //       description: event.description,
      //       contact: event.contact,
      //       status:"paid",
      //       email: event.email,
    
      //     };
  EventService.editEvent(newEvent, SEID).then((data) => {
    const { message } = data;
    setMessage(message);
    console.log("updated status")
    console.log(data);
    console.log("updated data")
    if (!message.msgError) {
      timerID = setTimeout(() => {
        //   props.history.push("/#/add");
      }, 2000);
    }
  });
  }

  

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
    const contacT = (event ? event.contact : null)
    ? event
      ? event.contact
      : null
    : null;  
    const statuS = (event ? event.status : null)
    ? event
      ? event.status
      : null
    : null;  
    const emaiL = (event ? event.email : null)
    ? event
      ? event.email
      : null
    : null; 
    const accounT = (event ? event.account : null)
    ? event
      ? event.account
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
              {(event ? event.title : null)
                ? event
                  ? event.title
                  : null
                : heading}
            </Heading>
           
            <Description>
              {" "}
              {(event ? event.description : null)
                ? event
                  ? event.description
                  : null
                : description}
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
       
              <Statistic key={1}>
                <Key>Contact: {contacT}</Key>
              </Statistic>
              <Statistic key={2}>
                <Key>Status: {statuS}</Key>
              </Statistic>
            </Statistics>
            
            <Statistics>
              <Statistic key={1}>
                <Key>Email: {emaiL}</Key>
              </Statistic>
            </Statistics>

            <Statistics>
              <Statistic key={1}>
                <Key>Account Address: {accounT}</Key>
              </Statistic>
            </Statistics>

            <Statistics>
            <Statistic key={1}>
                <Key>  <button>
              <PrimaryLink
                // onClick={connectWallet}
              >
              Connect Wallet
              </PrimaryLink>
            </button></Key>
            
            
              </Statistic>
            <Statistic key={2}>
            <Key>  <button>
              <PrimaryLink
              // type = "submit"
                // onClick = {transfer}
              >
               Pay Now
              </PrimaryLink>
            </button></Key>
              </Statistic>
              <Statistic key={3}>
                <Key>  <button>
              <PrimaryLink
                onClick={reject}
              >
               Reject
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
