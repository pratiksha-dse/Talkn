import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom"
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import Hero from "components/hero/BackgroundAsImageWithCenteredContent.js";

import tw from "twin.macro";
import Footer from "components/footers/MiniCenteredFooter.js";
import { StreamChat } from 'stream-chat';
import { Chat, Channel, Window, ChannelHeader, MessageInput, MessageList, ChannelList } from 'stream-chat-react';
// import './App.css';
import CustomChannelList from '../components/chatWindow/customChannelList';
import ChannelBody from '../components/chatWindow/channelBody';
import AddingChannel from '../components/addingChannel/addingChannel';
import 'stream-chat-react/dist/css/v2/index.css';
import styled from 'styled-components';
import { AuthContext } from "../Context/AuthContext";
import img from "../images/globe.png";
import Loader from "react-js-loader";
const Subheading = tw.span`uppercase tracking-wider text-sm`;

const Container = styled.div`
    display: flex;
    .left-column{
      width: 300px;
    }
    .right-column{
      flex: 1;
    }
`;

const API_KEY = "v246ajm6p5d5";

function ChatWindow() {

  const {
    user,
    setUser,
    isAuthenticated,
    setIsAuthenticated,
    isAdmin,
    setIsAdmin,
  } = useContext(AuthContext);
  const navigate = useHistory();

  const [chatClient, setChatClient] = useState(null);
  const [channel, setChannel] = useState(null);

  const [addingTeamChannel, setAddingTeamChannel] = useState(false);

  function getHash(input) {
    var hash = 0, len = input.length;
    for (var i = 0; i < len; i++) {
      hash = ((hash << 5) - hash) + input.charCodeAt(i);
      hash |= 0; // to 32bit integer
    }
    return hash.toString();
  }

  const USER = {
    id: getHash(user.email),
    name: user.name,
    image: user.picture
  };

  useEffect(() => {
    async function initChat() {
      const client = StreamChat.getInstance(API_KEY);

      client.connectUser(USER, client.devToken(USER.id));

      const channel = client.channel("team", "general", {
        name: "General",
        image: img
      });

      await channel.create();
      channel.addMembers([USER.id]);

      setChannel(channel);
      setChatClient(client);

    }

    initChat();

    return () => {
      if (chatClient) { chatClient.disconnectUser(); }
    };

  }, []);

  if (!chatClient || !channel) {
    return (
      <>
        <div style={{height:"40vh"}}><br></br></div>
        <Loader  type="spinner-cub" bgColor={"#402596"} title={"Loading Chats"} color={"#402596"} size={100} />
      </>

    );
  }

  return (
    <div>
      <Chat client={chatClient} theme={'messaging light'}>
        <Container>
          <div className='left-column'>
            <CustomChannelList onClickAdd={() => setAddingTeamChannel(true)} onClickExit={() => {
              if (chatClient) {
                chatClient.disconnectUser();
              }
              navigate.push('/');
            }} />
          </div>
          <div className='right-column'>
            <Channel>
              {addingTeamChannel ? <AddingChannel onClose={() => setAddingTeamChannel(false)} /> : <ChannelBody />}
            </Channel>
          </div>
        </Container>
      </Chat>
    </div>
  );
}

export default ChatWindow;
